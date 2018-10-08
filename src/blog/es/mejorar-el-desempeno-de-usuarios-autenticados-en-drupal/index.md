---
title: "Mejorar el desempeño de usuarios autenticados en Drupal"
lang: "es"
tags: ["Drupal","Planeta Drupal"]
date: "2014-08-25T15:31:00.000Z"
user: "joaquin"
aliases: ["blog/mejorar-el-desempeño-de-usuarios-autenticados-en-drupal"]
---

<h3>Boost, Varnish y las optimizaciones de frontend</h3><p>Existen varias maneras de mejorar el desempeño de un sitio en Drupal. Las más efectivas son usar <strong><a href="https://drupal.org/project/boost">boost</a></strong> (cuando sólo tienes un servidor) o <strong><a href="https://www.drupal.org/project/varnish">varnish</a></strong> (cuando tu sitio es más grande y puedes usar más de un servidor). Pero estas soluciones son exclusivas para usuarios anónimos, porque lo que hacen es guardar el contenido generado por Drupal y servirlo directo al visitante sin ni siquiera pasar por PHP o la base de datos. Aún cuando tienes usuarios autenticados te conviene primero mejorar el rendimiento de los usuarios anónimos que seguramente son más numerosos y así reducir la carga sobre tu servidor.</p><p>Una vez que empiezas a tener usuarios la cosa se complica. Pero hay optimizaciones generales que ayudan tanto a usuarios autenticados como no autenticados.</p><p>Drupal por default tiene la capacidad de <strong>comprimir y agregar los archivos CSS y JS</strong>, así como asegurarte de estar usando siempre el <strong>sistema de imágenes</strong> (imagecache o image styles) de drupal para servir imágenes más pequeñas; esto reducirá el tamaño y el número de archivos que se tienen que descargar tus visitantes. Mientras más chica sea tu página (imagenes, html, archivos) más rápida será.</p><h3>Actualizar el software y usar el mejor stack de Drupal posible</h3><p>El software continuamente se está mejorando, así que tener la última versión de Drupal y los módulos que utilizas, además de todo tu stack (PHP, la base de datos, el servidor web) te ayudará al rendimiento. Por ejemplo</p><ul><li>Entre PHP 5.3 y 5.4 hubo una <a href="http://news.php.net/php.internals/57760">mejora en el rendimiento</a> del 7% en el CPU y del 50% en el uso de memoria, al usar Drupal</li><li>MySQL 5.5 es más eficiente que 5.0 (<a href="http://dba.stackexchange.com/questions/31412/which-mysql-version-to-use-5-1-or-5-5">con sus asegunes</a>), en particular el optimizador de queries es mucho mejor en 5.5 que en 5.0</li><li>En lo posible reemplazar <a href="http://www.axai.com.mx/es/blog/setup-de-ambiente-de-desarrollo-ubuntu-debian">Apache por nginx</a> es siempre una buena idea ya es más eficiente en memoria y procesador</li><li>Asegurarte de usar APC o algún OpCache (PHP 5.5 trae el Zend Optimizer incluído) y bien configurado, en particular la memoria disponible (apc.shm_size en apc y opcache.memory_consumption en Zend)</li><li>Usar <a href="http://pressflow.org/">pressflow</a> si usas drupal 6 (<a href="http://fourword.fourkitchens.com/article/what-makes-pressflow-scale-1-faster-core-queries">¿Por qué pressflow?</a>)</li><li>Busca un hosting que tenga disco duro de estado sólido. Eso ayuda muchísimo, sobre todo si estás usando boost, que sirve las páginas directo desde el sistema de archivos</li></ul><h3>Usar el cache de views, panels y blocks</h3><p>Aún cuando no puedes usar el cache de página completa con usuarios autenticados, de cualquier manera hay elementos de tu página que puedes guardar en cache para evitar consultas costosas en la BD.</p><p>En el caso de los bloques sólo se tiene que habilitar donde mismo que se habilita el caché de páginas. Cada módulo que define bloques es responsable de definir si el bloque se puede cachar o no. Por ejemplo, cuando defines un bloque usando views, puedes usar el cache de bloques (en la columna de opciones avanzadas):</p><p>[[{"fid":"499","view_mode":"default","fields":{"format":"default","field_file_image_alt_text[und][0][value]":"imagen de opciones avanzadas de un view","field_file_image_title_text[und][0][value]":"imagen de opciones avanzadas de un view"},"type":"media","attributes":{"alt":"imagen de opciones avanzadas de un view","title":"imagen de opciones avanzadas de un view","height":"360","width":"340","class":"media-element file-default"}}]] [[{"fid":"500","view_mode":"default","fields":{"format":"default","field_file_image_alt_text[und][0][value]":"opciones del cache de bloques","field_file_image_title_text[und][0][value]":"opciones del cache de bloques"},"type":"media","attributes":{"alt":"opciones del cache de bloques","title":"opciones del cache de bloques","height":"319","width":"274","class":"media-element file-default"}}]]</p><p>Hablando de vistas, el módulo views también tiene su propio método de caching que de hecho también se ve en la imágen de arriba. Son 2 métodos distintos, uno es inherente a views, y el otro es de bloques sólamente. El método normal de views de caching es muy bueno, porque toma en cuenta todos los argumentos y filtros expuestos. Y tu le dices cuánto tiempo quieres que guarde un resultado en cache. Mientras que con el cache de bloques no tienes mucho control sobre cuánto tiempo se va a guardar en cache.</p><p>Si estás usando panels para construir las páginas de tu sitio, también puedes usar el cache de panels para guardar elementos de tu página en el cache.</p><h3>APC, Memcache y Redis</h3><p>Una vez empiezas a guardar cosas en cache, o a tener usuarios anónimos, notarás como el estres sobre tu base de datos empieza a aumentar. Para ver este aumento en el estres puedes utilizar herramientas como&nbsp;<a href="https://www.drupal.org/project/XHProf">XHProf</a> (ampliamente recomendado), el MySQL Workbench, o simplemente habilitar el log de queries a la BD que viene con el módulo devel. Y mientras más utilices el cache de vistas, panels y bloques esto va a ir aumentando, porque ese cache se guarda en la base de datos. Al menos hasta que habilites otro método como APC, Memcache o Redis:</p><ul><li><a href="https://www.drupal.org/project/apc">APC.</a> Si sólo estás utilizando un servidor es lo mejor. Si usas drupal 6 usa <a href="https://www.drupal.org/project/cacherouter">Cache Router</a> para usar APC</li><li><a href="https://www.drupal.org/project/memcache">Memcache</a> y <a href="https://www.drupal.org/project/redis">Redis</a> si tu sitio es más grande y empiezas a usar más de un servidor. Ambos funcionan igual, y simplemente por su versatilidad creo que conviene más aprender a utilizar Redis</li></ul><p>Estos sistemas lo que hacen es guardar el cache fuera de la base de datos y directamente en memoria RAM. Conforme los utilices monitorea tu uso de memoria porque es posible que empieces a necesitar más.</p><h3>Miscelaneo</h3><p>Algunos métodos más que pueden o no ser relevantes para tu sitio son:</p><ul><li>Si tu sitio ofrece la opción de búscar notarás que la búsqueda nativa de Drupal no es muy eficiente. Por eso existen muchas opciones para cambiar el motor de búsqueda. Mis preferidas son usar <a href="https://drupal.org/project/search_api">search_api</a> con <a href="https://drupal.org/project/search_api_solr">solr</a> o <a href="https://www.drupal.org/project/elasticsearch_connector">elasticsearch</a>. Y reciéntemente usamos <a href="http://sphinxsearch.com/">Sphinx</a> para un sitio, pero esto era porque las búsquedas las hacíamos directo con SQL.</li><li>Optimizar tus queries. Si tienes vistas muy pesadas que no puedes guardar en cache tal vez te conviene considerar estas 3 opciones:</li><li><ul><li>Cambiar el display de "content" a fields. Esto es porque si usas el display de content (o de panels o de display suite), lo que la vista hace es hacer un query con tus filtros trayendo solo el ID de tus entidades, y luego hace otro query (o varios) por cada entidad que estás mostrando. Si cambias el display a fields sólamente hará un query para traer todos los campos.</li><li>Cambiar el paginador del completo, al lite. Esto es porque el paginador completo necesita hacer un count query para obtener el número total de elementos a mostrar (y poder decirte cual es la última página). Este query, cuando tienes muuuucho contenido, es muuuuuy pesado.</li><li>Dejar de usar views, y hacer el query a mano, para poder optimizarlo tú mismo.</li></ul><p>Monitorear el log de errores de drupal, muchos de estos errores pueden estar alentando tu sitio. Por ejemplo, si tienes muchos 404, corrígelos, y tal vez también considera usar un módulo como <a href="https://www.drupal.org/project/fast_404">fast404</a> porque en sitios grandes cada 404 es costoso.</p></li><li>Desinstala módulos. Tener muchos módulos equivale a mucho código que se tiene que cargar cada que un sitio no se sirve desde el cache. En particular los módulos de dblog y de statistics alentan mucho los sitios. Las alternativas son usar syslog y google analytics o <a href="http://drupal.org/project/piwik">piwik</a></li></ul><p>Y pues creo que es todo por ahora.</p><p>Otras buenas referencias en Internet para mejorar el rendimiento de drupal:</p><ul><li><a href="https://groups.drupal.org/node/25617">¿Cómo lograr un performance de 3000 request por segundo usando APC, Memcached y Varnish?</a>. Aunque lo interesante es que Drupal llega hasta 300 request por segundo. Ya después cuando usas varnish o boost pues es simplemente nginx o varnish el que llega a 3,000.</li><li><a href="https://www.drupal.org/node/627252">El manual de drupal.org sobre cómo mejorar el performance</a>. Es un wiki así que puedes ayudar a mantenerlo actualizado.</li><li><a href="https://groups.drupal.org/node/21897">Comparativo de módulos para mejorar el performance en groups.drupal.org</a>. También es un wiki.</li></ul>