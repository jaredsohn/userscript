// -----------------------------------------------------
//
// Sven Wappler, WapplerSystems, http://www.wapplersystems.de
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
//
// -----------------------------------------------------


// ==UserScript==
// @name           Xing latest article filter
// @namespace      wapplersystems
// @description    Fuegt auf Xing einen visuellen Filter fuer die Uebericht der neusten Gruppenartikel hinzu
// @include        https://www.xing.com/app/network?op=latest_articles*
// ==/UserScript==


var host = window.location.host;
var url = window.location.protocol + '//' + host + '/';
var siteName = host.slice(host.indexOf('.')+1, host.length);

var s_prefix = "xing_";


var icon_active = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH0wQXDCskI1ntGwAAAhBJREFUeJzNlT+rGkEUxX8zUR5ERIK6vCCLEAKSD5AHKSKiBtKl0spCkBRp0tmks7H3A6RJafXSSaqIpWljSBAhjQju7mAiMYVPU7i7GV/W+OcVyYHLLvfeuWfOvbM78J9jvS9B3qD4+Q3WHoQ3QH5fUijAJzRDe+o4Bx4Ag2MJngGX+xa5sF0ivVUj4JuepM9AAJfdbpf5fM56vd5phmG8q9frL3Rfp9MBuPc3BRIgm80yGAyQUvomhPDfLctisVjETdN0JpOJH0un04EydQK/11JKptMpQgjC4fAW0Wg0IhqNfsrlcrbjOKRSKZbLJUIEjSp4yH7hZDK5pcCyLKrV6sdarfbWMAyklMRiMRzHQcrgEx/o9Yp65imYzWaEQqF5JpNRXo6efzSB3hohBK1Wi2Kx+LpUKtle3FN8lILrxaWU2LZNr9d7XygURnrsZAWr1WqLSCmFUuphuVy29dZ5Gzp6yPF4HNM0fV+j0aBSqbxMJBKBG9rVokACKSVnZ2eMx2P/9LTb7W6z2fyqlNo5o4MI+v0+y+WSSCTi72o4HKKUepzP523LsrYIvGe/3w8k0GlvAY+AXmAmPAc+7Ih5+AL82EUggNtsfl53gYjruwO8Ap4Akz0Ef0Bv0Rr46Rb5DoRd/wVw/5Ti1wkArthIXPBb3QXw9JTiEPwdrIGVS3bF5mL5fCrBIdh7sf9T/AJn3aslhX38FgAAAABJRU5ErkJggg==";


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('a.uninteresting {color: #ccc;}');
addGlobalStyle('.articletogglebutton { margin: 5px 0px 0px 5px;}');


function getStoredArticleIds() {
  return GM_getValue(s_prefix + 'articles', "").split('|');
}

function isArticleidInList(id) {
  var list = getStoredArticleIds();
  for (var n = 0; n < list.length; n++) {
    if (list[n] == id) return true;
  }
  return false;
}


function reloadList() {
  var table = document.getElementsByClassName('table-list')[0];
  var trs = table.getElementsByTagName('tr');

  for ( var i=1 ; i < trs.length; i++ ) {

    var articleid = trs[i].childNodes[1].childNodes[1].href.split(';')[1].split('=')[1];
    var isinlist = isArticleidInList(articleid);

    trs[i].childNodes[1].className = "";

    if (trs[i].childNodes[1].childNodes.length > 1 && trs[i].childNodes[1].childNodes[2]) {
      trs[i].childNodes[1].removeChild(trs[i].childNodes[1].childNodes[2]);
    }
    

    if (isinlist) {
      trs[i].childNodes[1].childNodes[1].className = "uninteresting";
    } else {
      trs[i].childNodes[1].childNodes[1].className = "";
    }
    

    var content = "<a href=\"#\" alt='"+articleid+"' onclick='return false;'><img src='"+icon_active+"' style='float: right;' class='articletogglebutton' title='Hide article' /></a>";
    
    trs[i].childNodes[1].innerHTML = trs[i].childNodes[1].innerHTML + content;

    trs[i].childNodes[1].childNodes[2].addEventListener('click', toggleArticle, true);
  }

}

function toggleArticle(evt) {
  var id = this.getAttribute('alt');
  if (isArticleidInList(id)) {
    removeArticleId(id);
  } else addArticleId(id);
  reloadList();
  return true;
}

function addArticleId(id) {
  GM_setValue(s_prefix + 'articles', GM_getValue(s_prefix + 'articles', "") + id + '|');
}

removeArticleId = function(id) {
  var list = getStoredArticleIds();
  
  for (var n = 0; n < list.length; n++) {
    if (list[n] == id) {
      list.splice(n,1);
      GM_setValue(s_prefix + 'articles', list.join('|'));
      return;
    }
  }
}


reloadList();

