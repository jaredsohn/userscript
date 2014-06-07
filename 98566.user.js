// ==UserScript==
// @name           Thumb Opener All
// @description    Open all thumbs in new tabs (not only direct img links!)
// @include	  *
// @exclude	  about:
// @exclude	  chrome:
// ==/UserScript==

window.addEventListener("load",function(e){add_opa_div();},false);

function add_opa_div(){  if(document.location.href==top.location.href){
    var eDiv=document.createElement("DIV");
    var ecss = 'position:fixed; z-index:9999; bottom:0px; left:0px; border:0; margin:0; padding:0; overflow:hidden;';
    eDiv.setAttribute('style', ecss);
    eDiv.innerHTML="<input type='button' id='opa_button' value='Open all thumbs in tabs'>";
    document.body.appendChild(eDiv);
    var button = document.getElementById("opa_button");
    button.addEventListener('click',do_opa,true);
  }
}

GM_registerMenuCommand("Open all thumbs in tabs", do_opa);

function do_opa(){  var links = document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (!links) return;

  for (i = 0; i < links.snapshotLength; i++) {    var imgs = document.evaluate("img", links.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if(imgs.snapshotLength>0) for (j = 0; j < imgs.snapshotLength; j++) GM_openInTab(links.snapshotItem(i).href);
  }
}
