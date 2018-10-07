const Database = require('better-sqlite3');
const fs = require('fs');
const http = require('http');
const path = require('path');

if (process.argv.length < 4) {
  usage();
  process.exit();
}

const db = new Database(process.argv[2], { readonly: true });
const lang = process.argv[3];

const rows = db
  .prepare(
    `SELECT n.nid, t.title_field_value title, trans_t.title_field_value trans_title, trans_t.language trans_lang, n.created, b.body_value, n.status, u.name
    FROM node n
    INNER JOIN users u ON u.uid = n.uid
    INNER JOIN field_data_body b ON b.entity_id = n.nid AND b.language = ?
    INNER JOIN field_data_title_field t ON t.entity_id = n.nid AND t.language = b.language
    LEFT JOIN field_data_title_field trans_t ON trans_t.entity_id = n.nid AND trans_t.language != b.language
    WHERE n.type == 'project'`
  )
  .all(lang);
rows.forEach(row => {
  const slug = slugify(row.title);
  const transUrl = row.trans_title ? path.join(row.trans_lang, slugify(row.trans_title)) : undefined;
  const folder = row.status ? '/../cases/' : '/../../drafts/';
  const dirname = path.join(__dirname, folder, lang, slug);
  const date = new Date(row.created * 1000);

  const aliases = db
    .prepare(
      `SELECT alias FROM url_alias
      WHERE source = ? AND alias != ?`
    )
    .pluck()
    .all(`node/${row.nid}`, slug);

  const image = db
    .prepare(
      `SELECT filename, uri FROM field_data_field_featured_image i
      INNER JOIN file_managed f ON f.fid = i.field_featured_image_fid
      WHERE i.entity_id = ?`
    )
    .get(row.nid);
  if (image) {
    image.uri = image.uri.replace('public://', 'http://www.axai.com.mx/sites/default/files/');
  }

  const externalUrl = db
    .prepare(
      `SELECT field_site_s_url__url url FROM field_data_field_site_s_url_ u
      WHERE u.entity_id = ?`
    )
    .pluck()
    .get(row.nid);

  const type = db
    .prepare(
      `SELECT field_project_info_value type FROM field_data_field_project_info i
      WHERE i.entity_id = ? AND i.language = ?`
    )
    .pluck()
    .get(row.nid, lang);

  fs.mkdir(dirname, err => {
    if (err) {
      if (err.code !== 'EEXIST') {
        console.log(err);
        process.exit();
      }
    }
    const file = fs.createWriteStream(`${dirname}/index.md`, { flags: 'w' });
    // This is here incase any errors occur
    file.on('open', () => {
      file.write('---\n');
      file.write(`title: "${row.title}"\n`);
      file.write(`lang: "${lang}"\n`);
      file.write(`externalUrl: "${externalUrl}"\n`);
      file.write(`type: "${type}"\n`);
      file.write(`date: "${date.toISOString()}"\n`);
      file.write(`user: "${row.name}"\n`);
      file.write(`aliases: ${JSON.stringify(aliases)}\n`);
      if (image) {
        download(image.uri, path.join(dirname, image.filename));
        file.write(`image: "${image.filename}"\n`);
      }
      if (transUrl) {
        file.write(`translation: "${transUrl}"\n`);
      }
      file.write('---\n\n');
      file.write(row.body_value);
      file.end();
    });
  });
  console.log(date, slug, JSON.stringify(aliases));
});

db.close();

function usage() {
  const scriptName = path.basename(__filename);
  console.log(`node ${scriptName} <database.sqlite> <language:es|en>`);
}

function download(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  http
    .get(url, response => {
      response.pipe(file);
      // close() is async, call cb after close completes.
      file.on('finish', () => file.close(callback));
    })
    .on('error', err => {
      // Handle errors
      if (callback) callback(err.message);
    });
}

function slugify(string) {
  const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple — with single -
    .replace(/^-+/, ''); // Trim — from start of text .replace(/-+$/, '') // Trim — from end of text
}
