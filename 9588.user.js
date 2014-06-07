// ==UserScript==
// @name          Photobucket Tree View and General Cleanup
// @author        Raffles
// @namespace     http://raffles.awardspace.com/
// @description   Removes advertisements and a list of all the albums in your account are shown as a tree next to the upload form. The tree updates automatically when albums are added/deleted. The script also adds single-click moving of files and fixes copying URL/IMG Code to clipboard.
// @include       http*://*.photobucket.com/*
// ==/UserScript==

Function.prototype.bind = function(thisObject) {
  var method = this;
  var oldargs = [].slice.call(arguments, 1);
  return function() {
    var newargs = [].slice.call(arguments);
    return method.apply(thisObject, oldargs.concat(newargs));
  };
}

function init() {
  addStyles();
  if (GM_setValue) {
    if (GM_getValue('root')  == undefined ||  GM_getValue('albumList') == undefined) {
      getAlbumInfo();
    }
    else {
      var cur = xpath('//a[@class="breadcrumbLinkCurrent"]');
      if (cur.snapshotLength != 1) return;
      currentAlbum = cur.snapshotItem(0).firstChild.nodeValue;
      
      // comment out any of these below if you don't like them and the rest will still function
      albumList = eval(GM_getValue('albumList'));
      albumUrl = GM_getValue('root');
      displayTree();
      updateMoveButton(); // Also changes the "move" links above each thumbnail (via updateMoveLinks)
      fixCopyToClipboard();
      GM_registerMenuCommand('Refresh tree', getAlbumInfo);
    }
  }
  else {
    showMessage('<p>You need at least Greasemonkey 0.3 for Photobucket Tree View to function. Please upgrade Greasemonkey or disable the script (otherwise it will probably annoy you with this bright green box).</p>');
  }
}

function displayTree() {
  var panel = document.getElementById('panelErrorMessage');
  if (panel.firstChild) {
    updateTree(panel.firstChild.nodeValue);
  }
  
  var cellUpload = document.getElementById('cellUpload');
  var tree = document.createElement('td'),
      treelist = document.createElement('ul'),
      treehead = document.createElement('h2');
  tree.id = 'subalbumstree';
  treelist.id = 'treelist';
  treehead.appendChild(document.createTextNode('album tree'));
  tree.appendChild(treehead);
  tree.appendChild(treelist);
  appendBranch.bind(albumList, albumUrl, treelist)();
  cellUpload.parentNode.insertBefore(tree, cellUpload.nextSibling);
  setTreeHeight();
  document.getElementById('linkAddMore_image').addEventListener('click', setTreeHeight, false);
}

function appendBranch(url, branch, newAlbum) {
  for (var item in this) {
    var li = document.createElement('li');
    var itemtext = document.createTextNode(item)
    if (item != currentAlbum) {
      var a = document.createElement('a');
      a.href = url + item + '/';
      a.appendChild(itemtext);
      li.appendChild(a);
    }
    else {
      li.appendChild(itemtext);
    }
    if (typeof(this[item]) == 'object' && !objEmpty(this[item])) {
      var ul = document.createElement('ul');
      li.appendChild(ul);
      appendBranch.bind(this[item], url + item + '/', ul, newAlbum)();
    }
    branch.appendChild(li);
  }
}

function updateTree(act) {
  var breadcrumbs = xpath('//div[@class="breadcrumb"]/a');
  var subalbums = document.getElementById('containerSubAlbums').getElementsByTagName('a');
  var albums = albumList;
  for (var i = 0; i < breadcrumbs.snapshotLength; i++) {
    albums = albums[breadcrumbs.snapshotItem(i).firstChild.nodeValue];
  }
  if (act == 'Album deleted') {
    for (var al in albums) {
      var found = false;
      for (var i = 0; i < subalbums.length; i++) {
        if (subalbums[i].firstChild.nodeValue == al) {
          found = true;
          break;
        }
      }
      if (!found) {
        delete albums[al];
        break;
      }
    }
  }
  else if (act == 'Album added') {
    var newAlbum = xpath('//table/tbody/tr/td[@class="highlight"]/a[@class="linkAlbum"]');
    if (newAlbum.snapshotLength == 1) {
      albums[newAlbum.snapshotItem(0).firstChild.nodeValue] = {};
    }
  }
  GM_setValue('albumList', albumList.toSource());
}
    

function setTreeHeight() {
  document.getElementById('treelist').style.height = 'auto';
  var cuh = parseInt(getComputedStyle(document.getElementById('cellUpload'), null).getPropertyValue('height'));
  var h2h = parseInt(getComputedStyle(document.getElementById('subalbumstree').getElementsByTagName('h2')[0], null).getPropertyValue('height'));
  document.getElementById('treelist').style.height = (cuh - h2h - 20) + 'px';
}

function updateMoveButton() {
  var move = document.getElementById('move_selected');
  if (!move) return;
  var moveform = document.getElementById('move_selected_form');
  if (!moveform) {
    var f = document.createElement('form');
    f.action = '';
    f.method = 'post';
    f.style.display = 'inline';
    move.parentNode.insertBefore(f, move);
    move.parentNode.removeChild(move);
  }
  else {
    var f = moveform;
    while (f.firstChild) f.removeChild(f.firstChild);
  }
  var sel = document.createElement('select');
  sel.name = 'newalbum';
  sel.id = 'move_selected';
  sel.disabled = true;
  var act = document.createElement('input');
  act.type = 'hidden';
  act.name = 'action';
  act.value = 'move';
  fillSelect.bind(albumList, sel)();
  f.appendChild(sel);
  f.appendChild(act);
  var checkedMedia = xpath('//span[@class="checkMedia"]/input'), thumbChecks = [], allMedia = [];
  for (var i = 0; i < checkedMedia.snapshotLength; i++) {
    var item = checkedMedia.snapshotItem(i);
    allMedia.push(item.id);
    item.addEventListener('change', function() {
      if (this.parentNode.parentNode.parentNode.className == 'selectedCell') {
        thumbChecks.push(this.id);
      }
      else {
        thumbChecks.splice(thumbChecks.indexOf(this.id), 1);
      }
    }, false);
  }
  document.getElementById('checkAll').addEventListener('change', function() {
    if (this.checked == true) thumbChecks = allMedia;
    else thumbChecks = [];
  }, false);
  sel.addEventListener('change', function() {
    thumbChecks.forEach(function(item) {
      var it = document.getElementById(item);
      var inp = it.cloneNode(true);
      inp.type = 'hidden';
      f.appendChild(inp);
    });
    this.parentNode.submit();
  } , false);
  updateMoveLinks(f);
}

function fillSelect(sel, par, parents) {
  var opt = document.createElement('option');
  if (!parents) {
    var t = opt.cloneNode(true), l = opt.cloneNode(true);
    t.appendChild(document.createTextNode('Move selected to...'));
    l.appendChild(document.createTextNode('----------'));
    l.disabled = true;
    sel.appendChild(t);
    sel.appendChild(l);
    var parents = [];
  }
  for (var al in this) {
    if (currentAlbum != al) {
      var o = opt.cloneNode(true);
      var val = '', txt = '';
      if (parents.length) {
        while (par != parents[parents.length-1]) parents.pop();
        for (var i = 0; i < parents.length; i++) {
          val += parents[i] + '/';
          if (parents[i] == GM_getValue('rootName')) continue;
          txt += parents[i] + ' > ';
        }
      }
      val += al;
      txt += al;
      o.value = val;
      o.appendChild(document.createTextNode(txt));
      sel.appendChild(o);
    }
    if (!objEmpty(this[al])) {
      parents.push(al)
      fillSelect.bind(this[al], sel, al, parents)();
    }
  }
}

function updateMoveLinks(frm) {
  var moveLinks = xpath('//ul[@id="containerThumbnails"]/li/p[@class="menuTools"]/a[starts-with(@id, "linkMove_")]');
  for (var i = 0; i < moveLinks.snapshotLength; i++) {
    var moveLink = moveLinks.snapshotItem(i), newMoveLink = moveLink.cloneNode(true);
    moveLink.parentNode.insertBefore(newMoveLink, moveLink);
    moveLink.parentNode.removeChild(moveLink); // need to do this to remove previous event listeners
    newMoveLink.removeAttribute('onclick');
    newMoveLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (this.className == 'active') {
        this.removeAttribute('class');
        this.parentNode.parentNode.removeChild(this.parentNode.nextSibling);
      }
      else {
        this.className = 'active';
        var ind = this.id.substr(this.id.indexOf('_') + 1);
        var inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = 'selectedmedia[]';
        inp.value = document.getElementById('chk_'+ind).value;
        var f = frm.cloneNode(true);
        f.firstChild.disabled = false;
        f.firstChild.firstChild.firstChild.nodeValue = 'Move this to...';
        f.firstChild.removeAttribute('id');
        this.parentNode.parentNode.insertBefore(f, this.parentNode.nextSibling);
        f.appendChild(inp);
        f.firstChild.addEventListener('change', function() {
          f.submit();
        }, false);
      }
    }, true);
  }
}

function fixCopyToClipboard() {
  var inps = xpath('//ul[@id="containerThumbnails"]/li/div/input[starts-with(@id, "urlcode")]|//ul[@id="containerThumbnails"]/li/div/input[starts-with(@id, "imgcode")]');
  for (var i = 0; i < inps.snapshotLength; i++) {
    var inp = inps.snapshotItem(i);
    inp.removeAttribute('onclick');
    inp.addEventListener('click', function() {
      var d = document.getElementById('clipboardholder');
      if (!d) {
        var d = document.createElement('div');
        d.id = 'clipboardholder';
        document.body.appendChild(d);
      }
      d.innerHTML = '<embed src="/include/swf/_clipboard.swf" FlashVars="clipboard='+escape(this.value)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
      var label = this.previousSibling.previousSibling;
      var labeltext = label.firstChild;
      label.removeChild(label.firstChild);
      label.appendChild(document.createTextNode('Copied'));
      label.style.color = 'red';
      setTimeout(function() {
        label.removeChild(label.firstChild);
        label.appendChild(labeltext)
        label.style.color = '';
      }, 1000);
    }, false);
  }
}

function getAlbumInfo() {
  var myalbum = document.getElementById('tab_myalbum');
  if (!myalbum) return;
  if (myalbum.firstChild.firstChild.nodeValue != 'my album') return;
  var rootUrlBits = myalbum.href.split('/');
  rootName = rootUrlBits.splice(rootUrlBits.length - 2, 1)[0];
  var root = rootUrlBits.join('/');
  GM_setValue('rootName', rootName);
  GM_setValue('root', root);
  showMessage('<h2>Finding albums and sub-albums</h2><p>This might take a while depending on the number of albums and how fast Photobucket currently is.</p><p>You will see a message telling you when it\'s finished.</p><p>If it gets stuck, shows an error or takes too long, reload the page and try again.</p><p>Albums found: </p><ul id="foundalbumslist></ul>', true);
  albums = {};
  count = '';
  albums[rootName] = {};
  makeTree.bind(albums, root)();
}

function makeTree(url) {
  if (typeof(count) == 'string') count = 0;
  else if (!count && objEmpty(this)) {
    findComplete();
    return;
  }
  for (var album in this) {
    count++;
    var u = url + album + '/';
    addToMessage('<li>' + album + '</li>', 'foundalbumslist');
    GM_xmlhttpRequest({
      'method': 'GET',
      'url' : u,
      'onload': addToList.bind(this[album], u),
      'onerror': function(response) {
        showMessage('<p>Error: ' + response.status + ' ' + response.statusText + '</p><p>Please reload the page and try again, or try at a time when Photobucket is more responsive.');
      }
    });
  }
}

function addToList(url, response) {
  count--;
  var subalbums = parseResponse(response.responseText);
  for (var subalbum in subalbums) {
    this[subalbum] = subalbums[subalbum];
  }
  makeTree.bind(this, url)();
}

function parseResponse(response) {
  var pattern=/<a id="linkSubAlbum[^>]+>([\w\s]+)<\/a>/g;
  var results = {}, temp;
  while((temp = pattern.exec(response)) != null) {
    if (typeof(temp[1]) == 'string') results[temp[1]] = {};
  }
  return results;
}

function findComplete() {
  var mess = '<p><span style="color:red; font-weight:bold">FINISHED</span> - ';
  if (objEmpty(albums[rootName])) {
    mess += 'You have no subalbums under your root album, ' + rootName;
  }
  else {
    mess += 'All albums have been found and you should see them in a tree to the right of the upload form when viewing an album. Click "Refresh Tree" at the bottom if you add new subalbums.';
  }
  mess += '</p><p>Click this box to close it.</p>';
  addToMessage(mess);
  GM_setValue('albumList', albums.toSource());
  var t = document.getElementById('subalbumstree');
  if (t) t.parentNode.removeChild(t);
  init();
  document.getElementById('ptvmsg').addEventListener('click', function() {
    this.parentNode.removeChild(this);
  }, false);
}

function showMessage(message, unkillable) {
  var d = document.createElement('div');
  d.id = 'ptvmsg';
  d.innerHTML = message;
  document.body.appendChild(d);
  if (!unkillable) {
    d.addEventListener('click', function() {
      this.parentNode.removeChild(this);
    }, false);
  }
}

function addToMessage(addition, i) {
  if (!i) i = 'ptvmsg';
  var m = document.getElementById(i);
  m.innerHTML += addition;
}

function objEmpty(obj) {
  if (typeof(obj) != 'object') return;
  var r = true;
  for (var o in obj) {
    r = false;
  }
  return r;
}

function xpath(expr, s) {
  var t = s ? XPathResult.ANY_TYPE : XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
  return document.evaluate(expr,document,null,t,null);
}

function addStyles() {
  GM_addStyle(
    "  #foundalbumsstyle li {               " +
    "    margin-left:2em;                   " +
    "  }                                    " +
    "  #cellAd,                             " +
    "  #advPanelContainer,                  " +
    "  #containerAlbumPromo {               " +
    "    display:none;                      " +
    "  }                                    " +
    "  #panel_image {                       " +
    "    width:428px;                       " +
    "  }                                    " +
    "  #subalbumstree {                     " +
    "    width:300px;                       " +
    "  }                                    " +
    "  #subalbumstree h2 {                  " +
    "    background:#C6D8ED;                " +
    "    text-align:center;                 " +
    "    padding:0.3em 0;                   " +
    "    margin:0 0 0.5em 0;                " +
    "  }                                    " +
    "  #subalbumstree ul {                  " +
    "    margin:0;                          " +
    "    padding:0 0 0 2em;                 " +
    "    list-style-type:square;            " +
    "  }                                    " +
    "  #subalbumstree > ul {                " +
    "    overflow:auto;                     " +
    "    padding-top:0.3em;                 " +
    "  }                                    " +
    "  #subalbumstree li {                  " +
    "    margin:0.2em 0 0 0;                " +
    "  }                                    " +
    "  #ptvmsg {                            " +
    "    position:absolute;                 " +
    "    top:8px;                           " +
    "    left:8px;                          " +
    "    border:2px solid black;            " +
    "    background-color:#44EE44;          " +
    "    color:black;                       " +
    "    padding:4px;                       " +
    "    width:20em;                        " +
    "  }                                    "
  );
}

init();