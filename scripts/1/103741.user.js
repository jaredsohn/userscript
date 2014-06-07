// ==UserScript==
// @name           KofC AntiFALLIMENTO
// @namespace      Tiestoale[ITA]
// @include        http://*.kingdomsofcamelot.com/*main_src.php*
// @version        1.5
// ==/UserScript==


GM_log ('matFarieKiller (v1.5) Running');

window.setTimeout (checkStrangeMagic, 5000);

// disable faire popup ...
unsafeWindow.Modal.showModalUEP = eval ('function (a,b,c) {return;}');

function checkStrangeMagic (){
  if (!document.getElementById("kochead")){
    popup (100,100,500,275, "<BR><CENTER>KofC AntiFALLIMENTO dice...<BR><BR>KofC NON TROVATO<BR>Ricaricamento pagina in 15 secondi ...<BR><BR>");
    window.setTimeout ( function() { GM_log ("KofC AntiFALLIMENTO sta caricando..."); reloadKOC(); }, 15000);
  }  
}

function reloadKOC (){
	var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
	if (m == null){
  	history.go(0);
  	return;
	}
  var goto = 'http://apps.facebook.com/kingdomsofcamelot/?s='+m[1];
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxButReload type=submit value=RELOAD><input type=hidden name=s value="'+ m[1] +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxButReload').click();}, 0);
}


function popup (left, top, width, height, content){
   var div = document.createElement('div');
   if (width)
       div.style.width = width;
   if (height) 
       div.style.height = height;
   if (left || top) {
       div.style.position = "relative";
       if (left)
           div.style.left = left;
       if (top)
           div.style.top = top;
   }
   if (content)
       div.innerHTML = content;
       
  div.style.background = "#ffc";
  div.style.border = "2px solid #000";
  div.style.zIndex = "999999";        // KOC modal is 100210 ?
  div.style.display = 'block';
  window.document.body.insertBefore(div, window.document.body.childNodes[0]);
  return div;
}