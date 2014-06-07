// ==UserScript==
// @name           SELECT ALL
// @namespace      SELECT ALL
// @include        http://www.facebook.com/*
// ==/UserScript==

inject();

function inject() {
  setTimeout(inject, 1000);
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
  aTag.setAttribute("onclick", "var elms = document.getElementById('friends').getElementsByTagName('li'); for (var fid in elms) { if (typeof elms[fid] === 'object' && elms[fid].getAttribute('class') != 'disabled') { fs.click(elms[fid]); }}; return false;");
  aTag.innerText = "ALL / TODOS";
  liTag.appendChild(aTag);
  ul.appendChild(liTag);
}

