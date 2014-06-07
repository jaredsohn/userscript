// ==UserScript==
// @name           Student-Shortlinks
// @namespace      de.tu-dresden.shortlink
// @description    Fügt einen Button mit den Begriffen für Studenten
// @include        http://tu-dresden.de/*
// ==/UserScript==

// Hilfsfunktion von http://wiki.greasespot.net/Code_snippets#Embed_a_function_in_the_current_page
function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}


function showShortlinks() {
  document.getElementById('shortlink-container').style.display = 'inherit';
}

function hideShortlinks() {
  document.getElementById('shortlink-container').style.display = 'none';
}

function insertButton() {
  var menu = document.getElementById('portal-top-services');
  var newButton = document.createElement('a');
  newButton.href = "javascript:showShortlinks();";
  newButton.appendChild(document.createTextNode('Shortlinks'));

  menu.insertBefore(document.createTextNode(' | '), menu.firstChild);
  menu.insertBefore(newButton, menu.firstChild);
}

function insertDiv() {
  var aExit = document.createElement('a');
  aExit.style.position = 'absolute';
  aExit.style.right = '0px';
  aExit.style.top = '0px';
  aExit.innerHTML = 'X';
  aExit.style.border = '1px solid #000000';
  aExit.style.backgroundColor = '#FFFFFF';
  aExit.style.padding = '3px';
  aExit.style.fontWeight = 'bold';
  aExit.href = "javascript:hideShortlinks();";
  
  var dContent = document.createElement('div');
  dContent.id = 'shortlink-content';
  var dLink = document.createElement('div');
  dLink.style.position = 'relative';
  dLink.style.width = '50%';
  dLink.style.margin = 'auto';
  dLink.style.marginTop = '40px';
  dLink.style.border = '1px solid #000000';
  dLink.style.backgroundColor = '#FFFFFF';
  dLink.style.padding = '10px';
  dLink.appendChild(dContent);
  dLink.appendChild(aExit);
  
  var dOp = document.createElement('div');
  dOp.style.position = 'absolute';
  dOp.style.left = '0px';
  dOp.style.top = '0px';
  dOp.style.width = '100%';
  dOp.style.height = '100%';
  dOp.style.backgroundColor = '#000000';
  dOp.style.opacity = '0.4';
  
  var dCon = document.createElement('div')
  dCon.id = 'shortlink-container';;
  dCon.style.position = 'absolute';
  dCon.style.left = '0px';
  dCon.style.top = '0px';
  dCon.style.width = '100%';
  dCon.style.zIndex = '100';
  dCon.style.display = 'none';
  dCon.appendChild(dOp);
  dCon.appendChild(dLink);
  document.body.appendChild(dCon);
  
  var sl_content = GM_getValue("shortlink_content");
  var sl_date = GM_getValue("shortlink_date");
  if (sl_content == null || (new Date()).getTime() - sl_date > 1000*60*60*24) {
    GM_xmlhttpRequest({
      method:"GET",
      url:'http://tu-dresden.de/zielgruppen/studierende',
      onload:function(response) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(response.responseText, 'application/xml');
        var sl_content = dom.getElementById('portal-column-content').children[0].children[2].children[2].innerHTML;
        GM_setValue("shortlink_content", sl_content);
        GM_setValue("shortlink_date", (new Date()).getTime());
        document.getElementById('shortlink-content').innerHTML = sl_content;
      }
    });
	} else {
	  document.getElementById('shortlink-content').innerHTML = sl_content;
	}
}

function init() {
  embedFunction(showShortlinks);
  embedFunction(hideShortlinks);
  insertButton();
  insertDiv();
}
init();