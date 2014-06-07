// ==UserScript==
// @name          </a><span style="text-decoration: line-through; color: #aaa;">Greasemonkeyed.com Script Links</span> <a style="color:#f00; text-decoration: none;">deprecated
// @namespace     http://loucypher.cjb.net/
// @include       http://*greasemonkeyed.com/tag*/*
// @exclude       http://*greasemonkeyed.com/tag*/
// @description	  Adds links to the scripts in the taglist
// ==/UserScript==
// Changelog:
// 20050730
// - Added search link with the tag name as the keyword

(function() {

  function addStyle() {
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML =
      '.view-source {' +
      '  background-color: transparent;' +
      '  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAANBAMAAABFt2PeAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfVBx4ACDpXFWtKAAAAB3RJTUUH1QceABIdlzPHigAAAAlwSFlzAAAOwwAADsMBx2%2BoZAAAADBQTFRFAIj%2F%2FwCIwMDA%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAepaW%2BwAAAAN0Uk5T%2F%2F8A18oNQQAAAElJREFUeNqVzrENgEAMQ1HrMoFhgmQDy%2FvvxiU0CNGQ7uulMOp5eBWAVZUku8LeD2nr6EJsTFG8zavNGoPHTn1ZjPGfYcb0FtYF%2BewTNwcdgLsAAAAASUVORK5CYII%3D);' +
      '  background-repeat: no-repeat;' +
      '  background-position: top left;' +
      '  margin-left: .5em;' +
      '}' +
      '.view-source:hover {' +
      '  background-position: top right;' +
      '}';
    head.appendChild(style);
  }

  function addSearch() {
    var contenthead = document.getElementById('content').getElementsByTagName('div')[0];
    var tagname = contenthead.firstChild.nodeValue;
    var search = document.createElement('a');
        search.setAttribute('href', 'http://greasemonkeyed.com/home/boring_search?search=' + tagname);
        search.setAttribute('title', 'Search ' + tagname);

    contenthead.appendChild(search);
    search.appendChild(contenthead.firstChild);
}

  function addLink(source) {
    sLnk = document.createElement('a');
    sLnk.setAttribute('href', source);
    sLnk.setAttribute('class', 'view-source');

    sImg = document.createElement('img');
    sImg.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANAQMAAABIJXY%2FAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfVBx0XDColEqQxAAAAB3RJTUUH1QceAA8Ndei78gAAAAlwSFlzAAAOdAAADnQBaySz1gAAAAZQTFRFAAAA%2F%2F%2F%2Fpdmf3QAAAAJ0Uk5T%2FwDltzBKAAAADklEQVR42mP4%2F4OBCAQA8noZjCoa1TEAAAAASUVORK5CYII%3D');
    sImg.setAttribute('border', '0');
    sImg.setAttribute('alt', 'script');
    sImg.setAttribute('title', 'View script');

    sLnk.appendChild(sImg);
    showlink.parentNode.appendChild(sLnk);
  }

  addStyle();
  addSearch();

  var taglist = document.getElementById('taglist');
  var rows = taglist.getElementsByTagName('tr');

  for(i = 0; i < rows.length; i++) {
    showlink = rows[i].getElementsByTagName('a')[0];
    source = showlink.href.replace(/show/, 'source') + '.user.js';
    addLink(source);
  }

})();


