// ==UserScript==
// @name           JavaScript
// @author         Cristhian Guedes
// @namespace      cristhianguedes' web page
// @include        http://uni103.ogame.com.br/game/index.php?page=alliance&session=*
// ==/UserScript==
// Versión 0.1


msg=window.open("exemplo.htm","","height=300,width=300,left=40,top=40");
msg.document.write("<html><title>Exemplo</title>");
msg.document.write("<body bgcolor='white'onblur=window.close()>");
msg.document.write("<center>Você coloca nessa janela a mensagem que quiser.</center>");
msg.document.write("</body></html><p>");
