// ==UserScript==
// @name           RenRenCat
// @namespace      null
// @description    Access a stranger's public album, status and share
// @version        1.0.5
// @updateURL      https://userscripts.org/scripts/source/140157.meta.js
// @include        http://*.renren.com/*
// ==/UserScript==

(function(){
  GM_addStyle(' \
    .friend-area {top: 10px;} \
    #navi {float:right; font-weight:bold;} \
    #navi li {float:left; margin-left:5px} \
    #navi li>a {background-color:#336699; color:#FFFFFF;  text-decoration:none; padding:0 7px; white-space:nowrap; display:block} \
    #navi li:hover>a {background-color:#FFFFFF; color:#336699} \
    #navi li ul li {float:none; position:relative; z-index:99; margin-left:0} \
    #navi li ul {display:none; position:absolute; top:auto; left:auto; border:1px solid #336699;} \
    #navi li:hover ul {display:block} \
    #navi span {float:left; padding:0 2px; color:#D2584D; cursor:crosshair}');

  function Link (label, url) {
    this.label = label;
    this.url = url;
  }
  var id = location.href.match(/\d{8,9}/);
  var boxOld = document.querySelector('.add-guide');
  var boxNew = document.querySelector('#operate_area');
  var box = boxOld || boxNew;
  var photo = document.querySelector('#photoListContainer>li');
  if (box) {
  var links = [];
    links[0] = new Link('Album', 'http://i.renren.com/hp/home?uid=');
    links[1] = new Link('Status', 'http://status.renren.com/status/');
    links[2] = new Link('Share', 'http://share.renren.com/share/ShareList.do?id=');
    links[3] = new Link('+Fav', '');
    var nav = document.createElement('ul');
    nav.id = 'navi';
    box.appendChild(nav);
    for (var i = 0; i<links.length; i++) {
      var liMenu = document.createElement('li');
      var aMenu = document.createElement('a');
      aMenu.href = links[i].url ? (links[i].url + id) : '#';
      aMenu.textContent = links[i].label;
      liMenu.appendChild(aMenu);
      nav.appendChild(liMenu);
    }
    var favLink = document.querySelector('#navi li:last-child a');
    favLink.addEventListener('click', addFav, false);
    var ulSubmenu = document.createElement('ul');
    favLink.parentNode.appendChild(ulSubmenu);
    for (var j = 0; j < localStorage.length; j++) {
      var sid = localStorage.key(j);
      if (/\d{8,9}/.test(sid)){
        var name = localStorage.getItem(sid);
        ulSubmenu.appendChild(createSubmenu(sid, name));
      }

    }
  } else if (photo) {
    var latest = document.createElement('a');
    //http://photo.renren.com/photo/<uid>/latest/photo-<pid>
    latest.href = 'http://photo.renren.com/photo/' + id + '/latest/' + photo.id.replace('_', '-');
    latest.textContent = 'Latest';
    document.querySelector('.ablum-infor>h1').appendChild(latest);
  }

  function createSubmenu (id, name) {
    var liSubmenu = document.createElement('li');
    var aSubmenu = document.createElement('a');
    aSubmenu.href = 'http://www.renren.com/' + id;
    aSubmenu.textContent = name;
    var del = document.createElement('span');
    del.textContent = 'x';
    del.className = 'del';
    del.id = id;
    del.addEventListener('click', delFav, false);
    liSubmenu.appendChild(del);
    liSubmenu.appendChild(aSubmenu);
    return liSubmenu;
  }

  function addFav () {
    localStorage.setItem(location.href.match(/\d{8,9}/), unsafeWindow.profileOwnerName);
  }

  function delFav() {
    localStorage.removeItem(this.id);
    this.parentNode.removeChild(this.nextElementSibling);
    this.parentNode.removeChild(this);
  }

})();