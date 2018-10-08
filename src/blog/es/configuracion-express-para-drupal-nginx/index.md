---
title: "Configuración express para Drupal nginx"
lang: "es"
tags: ["Planeta Drupal"]
date: "2015-11-13T18:27:00.000Z"
user: "elias"
aliases: ["blog/configuración-express-para-drupal-nginx","blog/configuración-express-para-nginx"]
---

Si ya tienes un ambiente funcional de desarrollo y ya descargaste los archivos de Drupal de tu sitio, así como instalada la base de datos, los únicos cambios que se requieren para tener un sitio corriendo localmente (es decir, sin usar el comando drush rs) son:

Crear un archivo llamado `/etc/nginx/sites-available/sitionuevo.conf` con el siguiente contenido:

    server {
      listen       80;
      server_name  sitionuevo
      root         /home/usuario/work/drupal-sites/sitionuevo/drupal;
      include      /home/usuario/work/simple-drupal-nginx/drupal.conf;
    }

Editar el archivo **/etc/hosts** y agregar esta línea:

    127.0.0.1 sitionuevo

El archivo de configuración de nginx que creamos está en la carpeta `sites-available`. Para habilitarlo hay que hacer dos cosas: 
1) crear un symlink a la carpeta `sites-enabled` 
2) reiniciar nginx:

    sudo ln -s /etc/nginx/sites-available/sitionuevo.conf /etc/nginx/sites-enabled/sitionuevo.conf
    sudo service nginx reload

<strong>No olvidar que el <em>sitionuevo</em> debe ser cambiado en todos los archivos donde se instancia.</strong>

Listo, ya puedes acceder al URL **sitionuevo** en tu explorador web.

El contenido de drupal.conf puede ser encontrado aquí: https://github.com/jackbravo/simple-drupal-nginx/blob/master/drupal.conf