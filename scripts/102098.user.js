// ==UserScript==
// @name           Lageon stats invite button
// @description    Inserts a new button to the popup menu in statistics, which allows you to invite a player directly from there.
// @author         Petee, Taubda 
// @version        0.1

// @include        http://*.lageon.*/*
// ==/UserScript==

/* The injecting mechanism is a copyrighted work of Petee. Please, always include this line in any script that uses it. Thanks! */

function sU_Launch(){
 if(document.getElementById('sU_js') != null) alert('Err1 - script already loaded.');
 var jsapp = document.createElement('script');
 jsapp.setAttribute('type', 'text/javascript');
 jsapp.setAttribute('language', 'javascript'); 
 jsapp.setAttribute('id', 'sU_js'); 
 var FuncInj = "" + sU_Code + sU_Inject;
 FuncInj += "sU_Inject();";
 jsapp.innerHTML = FuncInj;
 document.getElementsByTagName('head')[0].appendChild(jsapp);
};

function sU_Code(username){
 if(!confirm('Do you really want to invite player '+username+' into your alliance?')) return false;
 try {
   xmlhttp = window.XMLHttpRequest?new XMLHttpRequest():
  		new ActiveXObject("Microsoft.XMLHTTP");
 } catch (e) { }
 xmlhttp.onreadystatechange = function(){
  if (xmlhttp.readyState == 4) if (xmlhttp.status == 200){
   eval(xmlhttp.responseText);
 }};
 xmlhttp.open("POST", "controllers/run.php?param=ally&method=invite_action", true);
 xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 xmlhttp.send("username="+username);
}

function sU_Inject(){
 AWS = (showUser+"").replace("+ user +", "+ (sUname=user.split('<h2>',2)[1].split('</h2>',1)[0], user.replace('</ul>','<li><a style=\"cursor:pointer;\"  onclick=\"$.fancybox.close();sU_Code(\\\''+sUname+'\\\');\">Invite</a></li></ul>')) +");
 showUser = eval("("+AWS+")");
 
}

if(document.readyState == "complete") sU_Launch();
else window.addEventListener("load", sU_Launch, false);