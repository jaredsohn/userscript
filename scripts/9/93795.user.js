// ==UserScript==
// @name           bring back the eye sore
// @namespace      http://userscripts.org/users/257845
// @description    adds annoying yellow and red from /b/ to style toggel for all 4chan boards
// @include        *boards.4chan.org*
// ==/UserScript==

function addYR(){
	var link='<link rel="alternate stylesheet" type="text/css" href="http://images.4chan.org/b/junk/css/cej.css" title="Yellow & Red /b/">';
	var anchor=' | <a href="#" onclick="setActiveStyleSheet(\'Yellow & Red /b/\'); return false;">Yellow & Red /b/</a>]';
	var changer='<tr><td>Style [<a href="#" onclick="setActiveStyleSheet(\'Yotsuba\'); return false;">Yotsuba</a> | <a href="#" onclick="setActiveStyleSheet(\'Yotsuba B\'); return false;">Yotsuba B</a> | <a href="#" onclick="setActiveStyleSheet(\'Futaba\'); return false;">Futaba</a> | <a href="#" onclick="setActiveStyleSheet(\'Burichan\'); return false;">Burichan</a>]</td></tr>';
	if(document.getElementsByClassName('deletebuttons')[0].parentNode.parentNode.innerHTML.indexOf('setActiveStyleSheet')==-1)document.getElementsByClassName('deletebuttons')[0].parentNode.parentNode.innerHTML+=changer;
	var anchors=document.getElementsByClassName('deletebuttons')[0].parentNode.parentNode.children[1].children[0];
	document.getElementsByTagName('head')[0].innerHTML+=link;
	anchors.innerHTML=anchors.innerHTML.replace(/\]/,anchor);
}
addYR();

/*

this if for archiving purposes incase
http://images.4chan.org/b/junk/css/cej.css
is removed

css from http://images.4chan.org/b/junk/css/cej.css

body {
  font-size:12pt;
  background:#FFFF00;
  color:#00FFFF;
  background-image: url('http://img.4chan.org/b/junk/yellow.gif');
}
a {
  background:inherit;
  color:#0000EE;
  font-family:serif;
}
a:visited {
  background:inherit;
  color:#0000EE;
  font-family:serif;
}
a:hover {
  color:#DD0000;
  background:inherit;
  font-family:serif;
}
a.quotelink {
  background:inherit;
  color:#000080;
  font-family:serif;
}
.logo {
  clear:both;
  text-align:center;
  background:inherit;
  font-size:24pt;
  color:#00FFFF;
  width:100%;
}
.postarea {
  background:inherit;
}
.rules {
  font-size:10px;
  font-family:sans-serif;
}
.postblock {
  background:#FF0000;
  color:#00FFFF;
  font-weight:800;
}
.footer {
  text-align:center;
  font-size:12px;
  font-family:serif;
}
.unkfunc {
	background:inert;
	color:#789922;
}
.filesize {
	font-size:16px;
	font-family:serif;
	text-decoration:none;
}
.filetitle {
	background:inherit;
	font-size:18px;
	font-family:serif;
	color:#00FFFF;
	font-weight:800;
}
.postername {
	background:inherit;
	font-size:16px;
	font-family:serif;
	color:#00FFFF;
	font-weight:800;
}
.postertrip {
	background:inherit;
	font-size:16px;
	font-family:serif;
	color:#00FFFF;
}
.oldpost {
	background:inherit;
  font-family:serif;
  color:#f00000;
  font-weight:800;
}
.omittedposts {
	background:inherit;
  color:#707070;
}
.reply {
	background:#FF0000;
	color:#00FFFF;
	font-family:serif;
}
.replyhl {
	background:#FF0000;
	color:#00FFFF;
	font-family:serif;
}
.doubledash {
 	vertical-align:top;
	clear:both;
	float:left;
}
.replytitle {
	background:inherit;
	font-size:18px;
	font-family:serif;
  color:#00FFFF;
  font-weight:800;
}
.commentpostername {
	background:inherit;
  font-size:16px;
  font-family:serif;
  color:#00FFFF;
  font-weight:800;
}
a.quotejs:active,a.quotejs:link,a.quotejs:visited {
  color:#00FFFF;
	text-decoration: none;
}
a.quotejs:hover {
  font-weight:bold;
}
.tn_thread {
  width: 200px;
  height: 100px;
  margin: 0px 20px 20px 20px;
  float: left;
  background: #eed;
  border: #ea8 1px solid;
  text-align: center
}
.tn_reply {
  width: 100px;
  height: 100px;
  margin: 0px 20px 20px 20px;
  float: left;
  background: #eed;
  border: #ea8 1px solid;
  text-align: center
}
*/