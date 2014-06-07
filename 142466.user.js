// ==UserScript==
// @name       chat for ultra
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Chat for ULTRA & CDU of Universe Pegasus
// @match      *ogame*/game/index.php?page=messages*
// @copyright  2012+, katmai
// ==/UserScript==

(function(){
  var elemento = document.getElementById('planet');  //para ponerlo en la imagen
  var titulo = document.getElementsByTagName('h2');
  var p = document.createElement("p");
  var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEzNDYyNDg4OTE5MzAmcHQ9MTM*NjI*ODkzMTE5MyZwPTUzMTUxJmQ9Jmc9MSZvPTBjNTEzMDBjZTg*YzQ*MWJiM2Ji/Y2MzMTFjNTIwM2Ex.gif" /><embed src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" bgcolor="#000000" width="650" height="300" name="chat" FlashVars="id=181466905&gn=1ultra" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /><br><small><a target="_BLANK" href="http://xat.com/web_gear/chat/embed.php?id=181466905&GroupName=1ultra">Get 1ultra chat group</a> | <a target="_BLANK" href="http://xat.com/1ultra"> Goto 1ultra website</a></small><br>';
  elemento.setAttribute('style', 'height:346px;background-image:none;');
  p.setAttribute('style', 'margin:0px;');
  p.innerHTML = chat;
  elemento.appendChild(p);
})();