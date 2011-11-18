# SolrGraphicsWebSocket 

## Description
English:
This project is just a proof of concept of a status page with some
metrics of a Solr server running. It is a mix of frameworks like 
NodeJS, Socket.io and Protovis or D3 for the presentation layer.

Español:
Este proyecto es sólo una prueba de concepto de una página de estatus
con distintas métricas de un servidor SOLR ejecutándose. Es una mezcla
de frameworks como NodeJS, Socket.io y Protovis o D3 en la capa de
presentación.

## Prerequisite
* [node.js](http://nodejs.org)
* OS with "[iostat](http://www.linuxcommand.org/man_pages/iostat1.html)".
* [Socket.io](http://socket.io/#home)

## Testing & Running

To generate numbers you can use this little script:

for i in {1..200} ; do valor=$[ ( $RANDOM % 100  ) + 1 ] ; echo $valor >> /tmp/pruebas ; sleep 1 ; done

## Todo

* Instead of iostat use a "tail -f" to a Solr server log file.
* Do the graphics...

## Thanks
* [node-websocket-activity-monitor](https://github.com/makoto/node-websocket-activity-monitor) I based my server.js on this server.

