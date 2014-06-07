// ==UserScript==
// @name           DMMGirl
// @namespace      null
// @description    DMM.R18/mono/dvd tweak for non-member: show big cover, preload sample picture, local wishlist, remove member functions...
// @version        1.1.1
// @updateURL      https://userscripts.org/scripts/source/123770.meta.js
// @include        http://www.dmm.co.jp/mono/dvd/-/list/*
// @include        http://www.dmm.co.jp/error/-/area/=/navi=none/*
// @include        http://www.dmm.co.jp/top/-/error/area/*
// @include        http://www.dmm.co.jp/mono/dvd/-/detail/=/cid=*
// ==/UserScript==
var detail = {
  videoEnable: false,
  init: function(c) {
    GM_addStyle(' \
      #mybox {font-size:1.2em; font-weight:bold; background-color:#F7FDFF; border:1px solid #CCCCCC; padding:5px 10px; margin-bottom:10px;} \
      #mybox a {display:block; color:#005FC0; cursor:pointer; text-decoration:none; padding-left:10px; \
        background:url("http://p.dmm.co.jp/p/common/arrow_common.gif") no-repeat scroll left center transparent} \
      #mybox a:active, #mybox a:hover {color:#EE2200 !important; text-decoration:underline !important;} \
      #mybox a:visited {color:#990099 !important;}');
    this.replaceRcolumn(c.comment);
    this.checkVideo();
    this.showCover();
    this.addPreloadRadio(c.preload);
  },
  //==Add preload radio button==
  addPreloadRadio: function(c) {
    var headline = document.getElementsByClassName('headline mg-b10 lh3')[0];
    var nosample = document.querySelectorAll('span.nw')[0];
    if(headline && !nosample) {
      var link = document.createElement('input');
      link.type = 'radio';
      link.id = 'prelink';
      link.addEventListener('click', this.onPreloadSample, false);
      headline.appendChild(link);
      headline.appendChild(document.createTextNode('Preload '));
      if(c) {
        link.click();
      }
    }
  },
  //==Preload previews==
  onPreloadSample: function() {
    this.removeEventListener('click', detail.onPreloadSample, false);
    var sample = document.getElementsByName('sample-image'); //
    var block = document.getElementById('sample-image-block');
    var newblock = document.createElement('div');
    for(var i = 0; i < sample.length; i++) {
      var pic = document.createElement('img');
      pic.src = sample[i].firstChild.src.replace('-', 'jp-');
      pic.height = 73;
      pic.className = 'galpic';
      pic.addEventListener('click', gal.onShowPic, false);
      newblock.appendChild(pic);
    }
    block.parentNode.replaceChild(newblock, block);
  },

  checkVideo: function() {
    var video = document.getElementById('sample-video');
    if(video.lastElementChild.tagName === 'NOSCRIPT') {
      this.videoEnable = true;
    }
  },
  //==Show big cover==
  showCover: function() {
    var sample = document.getElementsByClassName('float-l mg-b20 mg-r12')[0];
    var img = document.getElementsByClassName('tdmm')[0];
    img.src = img.src.replace('ps.jpg', 'pl.jpg');
    removeChildren(sample);
    sample.className = 'mg-b20 mg-r12';
    sample.appendChild(img);
  },
  replaceRcolumn: function(c) {
    var rcolumn = document.getElementsByClassName('vline')[0].nextElementSibling;
    var info = document.getElementsByClassName('mg-b20')[1];
    info.id = 'infot';
    var tbody = info.firstElementChild; //remove last 2 rows
    tbody.removeChild(tbody.lastElementChild);
    var review = document.getElementById('review');
    if(review) {
      var star = tbody.lastElementChild.lastElementChild;
      var vote = document.getElementsByClassName('overview')[0];
      if(vote && star.lastElementChild) {
        star.lastElementChild.innerHTML = '(' + vote.firstElementChild.lastElementChild.innerHTML + ')';
      } else {
        star.lastElementChild.innerHTML = '(0)';
      }
      if(c) {
        review.parentNode.removeChild(review);
      }
    }
    var box = document.getElementsByClassName('bx-option mg-t20')[0];
    if(box) {
      box.parentNode.removeChild(box);
    }
    var tag = document.getElementById('producttag');
    if(tag) {
      tag.parentNode.removeChild(tag);
    }
    var desc = info.nextElementSibling.nextElementSibling;
    var another = document.getElementsByClassName('another')[0];
    removeChildren(rcolumn);
    var div = document.createElement('div');
    div.id = 'mybox';
    var add = document.createElement('a');
    add.textContent = 'Add to Wishlist';
    add.addEventListener('click', this.onAddWish, false);
    var view = document.createElement('a');
    view.href = '/top/-/error/area/';
    view.textContent = 'View Wishlist';
    var search = document.createElement('a');
    search.href = 'https://www.google.com/#q=' + getCid(location.pathname, true)[0];
    search.target = '_blank';
    search.textContent = 'Google It';
    div.appendChild(add);
    div.appendChild(view);
    div.appendChild(search);
    rcolumn.appendChild(div);
    rcolumn.appendChild(info);
    rcolumn.appendChild(desc);
    if(another) {
      rcolumn.appendChild(another);
    }
    var ad = document.getElementsByClassName('mg-b12  center')[0];
    ad.parentNode.removeChild(ad);
  },
  //==Add to wishlist==
  onAddWish: function() {
    var tds = document.querySelectorAll('td.nw'); //[type,date,length,actress,director,series,maker,label,genre,cid]
    var date = tds[1].nextElementSibling;
    var actress = tds[3].nextElementSibling;
    var maker = tds[6].nextElementSibling;
    var cid = tds[9].nextElementSibling.innerHTML;
    var title = document.getElementById('title'); //get title
    var detail = date.innerHTML + '#' + actress.innerHTML + '#' + maker.innerHTML + '#' + title.innerHTML;
    localStorage.setItem(cid, detail);
  }


};
var list = {
  init: function() {
    var smallThumb = document.getElementsByClassName('img');
    for(var i = 0; i < smallThumb.length; i++) {
      smallThumb[i].firstElementChild.addEventListener('mouseover', this.onShowThumb, false);
    }
    var thumb = new Image();
    thumb.id = 'hoverpic';
    thumb.style.position = 'absolute';
    thumb.style.zIndex = 22;
    thumb.style.display = 'none';
    thumb.addEventListener('mouseout', this.onRemoveThumb, false);
    var a = document.createElement('a');
    a.appendChild(thumb);
    document.body.appendChild(a);
  },
  onShowThumb: function() {
    if(this.src.search('noimage') === -1) {
      var thumb = document.getElementById('hoverpic');
      thumb.src = this.src.replace('pt.jpg', 'ps.jpg');
      var pos = this.getBoundingClientRect();
      thumb.style.left = pos.left - 29 + window.pageXOffset + 'px'; //147*200,90*122
      thumb.style.top = pos.top - 39 + window.pageYOffset + 'px';
      thumb.width = 147;
      thumb.height = 200;
      thumb.style.display = 'block';
      thumb.parentNode.href = '/mono/dvd/-/detail/=/cid=' + getCid(this.src)[1] + '/';
    }
  },
  onRemoveThumb: function() {
    this.style.display = 'none';
    this.src = null;
    this.parentNode.href = null;
  }
};
var wish = {
  dvd: [],
  sortType: ['cid', 'date', 'actress', 'maker'],
  init: function() {
    document.title = 'Wishlist';
    GM_addStyle(' \
      body,table {color:#333333; font-size:12px; font-family:"MS PGothic","Osaka";} \
      a:link {color:#005FC0; text-decoration:none;} \
      a:visited {color:#005FC0; text-decoration:none;} \
      a:hover,a:active {color:#EE2200; text-decoration:underline;} \
      table {text-align:center; width:590px; border-collapse:separate; border-spacing:5px;} \
      table th {font-size:1.1em; padding:2px; background-color:#242424; color:#ffffff} \
      table th:hover {cursor:pointer} \
      table td {padding:2px; background-color:#F8F8F8; border:1px solid #CCCCCC;} \
      p {text-align:left}');
    document.body.innerHTML = ' \
      <table> \
        <thead> \
          <tr> \
            <th width="3%">#</th> \
            <th width=15%">Cover</th> \
            <th width="30%" id="cid">CID</th> \
            <th width="17%" id="actress">Actress</th> \
            <th width="17%" id="maker">Maker</th> \
            <th width="14%" id="date">Date</th> \
            <th width="4%">X</th> \
          </tr> \
        </thead> \
        <tbody id="wishlist"></tbody> \
      </table>';
    this.createObj();
    this.fillTable();
  },
  onSort: function() {
    for(var i = 0; i < 4; i++) {
      document.getElementById(wish.sortType[i]).style.backgroundColor = '#242424';
    }
    this.style.backgroundColor = '#C10000';
    wish.dvd.sort(wish.by(this.id));
    wish.fillTable();
  },
  by: function(type) {
    return function(a, b) {
      var c = a[type];
      var d = b[type];
      if(c === d) {
        return 0;
      }
      if(c < d) {
        return -1;
      } else {
        return 1;
      }
    };
  },
  createObj: function() {
    function Dvd(cid, date, actress, maker, title) {
      this.cid = cid;
      this.date = date;
      this.actress = actress;
      this.maker = maker;
      this.title = title;
    }
    for(var i = 0, j = 0; i < localStorage.length; i++) {
      var cid = localStorage.key(i);
      if(cid[0] !== '#' && cid[0] !== '_') {
        var info = localStorage[cid].split('#'); //Date[0]#Actress[1]#Maker[2]#Title[3]
        info[1] = info[1].replace(/></g, '><br /><');
        this.dvd[j] = new Dvd(cid, info[0], info[1], info[2], info[3]);
        j++;
      }
    }
    this.dvd.sort(this.by('date'));
  },
  fillTable: function() {
    for(var i = 0; i < 4; i++) {
      document.getElementById(this.sortType[i]).addEventListener('click', this.onSort, false);
    }
    var list = document.getElementById('wishlist');
    removeChildren(list);
    for(i = 0; i < this.dvd.length; i++) {
      var item = document.createElement('tr');
      item.innerHTML = ' \
        <td height="130">' + (i + 1) + '</td> \
        <td><img src="http://pics.dmm.co.jp/mono/movie/' + this.dvd[i].cid + '/' + this.dvd[i].cid + 'pt.jpg" /></td> \
        <td><a href="/mono/dvd/-/detail/=/cid=' + this.dvd[i].cid.replace(/so$/, '') + '/">' + this.dvd[i].cid + '<br /></a><p>' + this.dvd[i].title + '</p></td> \
        <td>' + this.dvd[i].actress + '</td> \
        <td name="maker">' + this.dvd[i].maker + '</td> \
        <td>' + this.dvd[i].date + '</td> \
        <td><a href="" onclick="localStorage.removeItem(\'' + this.dvd[i].cid + '\')">' + 'X' + '</a></td>';
      list.appendChild(item);
    }

  }
};
var fav = {
  menus: [],
  init: function() {
    GM_addStyle(' \
      #header .hd-lnav ul li ul li {float:none; margin:0; background-color:#242424; position:relative; z-index:99} \
      #header .hd-lnav ul li ul {display:none; position:absolute;} \
      #header .hd-lnav ul li>ul {top:auto; left:auto;} \
      #header .hd-lnav ul li:hover ul {display:block}');
    this.addLink();
    this.setMenu();
  },
  addLink: function() {
    var wishLink = document.createElement('a');
    wishLink.href = '/top/-/error/area/';
    wishLink.textContent = 'Wishlist';
    wishLink.style.marginLeft = '5px';
    var key = document.getElementsByClassName('popular-keyword')[0];
    key.appendChild(wishLink);
    key.style.right = '-3em';
  },
  setMenu: function() {
    function Menu(label, key) {
      this.label = label;
      this.key = key;
    }
    this.menus[0] = new Menu('Actress', 'actress');
    this.menus[1] = new Menu('Maker', 'maker');
    this.menus[2] = new Menu('Genre', 'keyword', '#GId', '#GName');
    for(var i = 0; i < this.menus.length; i++) {
      var type = this.menus[i].key[0];
      var id = '#' + type + 'ID';
      var name = '#' + type + 'NAME';
      var sid = localStorage.getItem(id);
      if(!sid) {
        localStorage.setItem(id, '[]');
        localStorage.setItem(name, '[]');
      } else {
        var idList = JSON.parse(sid);
        var nameList = JSON.parse(localStorage.getItem(name));
        this.createMenu(this.menus[i].label, this.menus[i].key, idList, nameList);
      }
    }
  },
  createMenu: function(label, key, id, name) {
    var navBar = document.getElementsByClassName('hd-lnav group')[0].firstElementChild;
    var liMenu = document.createElement('li');
    var aMenu = document.createElement('a');
    aMenu.href = '/mono/dvd/-/' + label.toLowerCase() + '/';
    aMenu.textContent = label;
    liMenu.appendChild(aMenu);
    var ulMenu = document.createElement('ul');
    liMenu.appendChild(ulMenu);
    navBar.appendChild(liMenu);
    for(var i = 0; i < id.length; i++) {
      var liSubmenu = document.createElement('li');
      var aSubmenu = document.createElement('a');
      aSubmenu.href = '/mono/dvd/-/list/=/article=' + key + '/id=' + id[i] + '/sort=date/';
      aSubmenu.textContent = name[i];
      liSubmenu.appendChild(aSubmenu);
      ulMenu.appendChild(liSubmenu);
    }
  }
};
var addfav = {
  init: function() {
    GM_addStyle(' \
      #dropzone {position:absolute; left:0; top:0; width:100%; height:100%;} \
      #dropbox {position:relative; font-size:1.2em; font-weight:bold; text-align:center; padding-top:10px; color:#005FC0; \
        height:30px; background-color:#F7FDFF; border:2px dashed #EE2200; margin-bottom:5px; display:none} \
      #dropbox.over {border:2px solid #005FC0;}');
    this.addFav();
  },
  addFav: function() {
    var actress = document.getElementById('performer');
    var performer = actress.querySelectorAll('a');
    for(var c = 0 ; c < performer.length; c++) {
      actress.parentNode.insertBefore(performer[c], actress);
    }
    actress.parentNode.removeChild(actress);
    var tds = document.getElementsByClassName('nw');
    var k = [3, 6, 8]; //3:actress, 6: maker, 8: genre
    for(var i = 0; i < k.length; i++) {
      var link = tds[k[i]].nextElementSibling.children;
      for(var j = 0; j < link.length; j++) {
        link[j].addEventListener('dragstart', this.onDragStart, false);
        link[j].addEventListener('dragend', this.onDragEnd, false);
      }
    }
    var info = document.getElementById('infot');
    var box = document.createElement('div');
    box.id = 'dropbox';
    var zone = document.createElement('div');
    zone.id = 'dropzone';
    box.appendChild(zone);
    box.appendChild(document.createTextNode('Drop Here'));
    info.parentNode.insertBefore(box, info);
    zone.addEventListener('dragenter', this.onDragEnter, false);
    zone.addEventListener('dragover', this.onDragOver, false);
    zone.addEventListener('dragleave', this.onDragLeave, false);
    zone.addEventListener('drop', this.onDrop, false);
  },
  onDragStart: function(e) {
    document.getElementById('dropbox').style.display = 'block';
    e.dataTransfer.effectAllowed = 'link';
    e.dataTransfer.setData('aName', this.text);
    e.dataTransfer.setData('aLink', this.href);
  },
  onDragOver: function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'link';
  },
  onDragEnter: function() {
    this.parentNode.classList.add('over');
  },
  onDragLeave: function() {
    this.parentNode.classList.remove('over');
  },
  onDrop: function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.classList.remove('over');
    var aName = e.dataTransfer.getData('aName');
    var aLink = e.dataTransfer.getData('aLink');
    var aId = aLink.match(/\d+/)[0];
    var aType = aLink.match(/article=([a-z])/)[1];
    var itemId = '#' + aType + 'ID';
    var itemName = '#' + aType + 'NAME';
    //this.innerHTML=aType + ':'aName + ',' + aId;
    var aIdList = JSON.parse(localStorage.getItem(itemId));
    if(aIdList) {
      if(aIdList.indexOf(aId) === -1) {
        aIdList.push(aId);
        var aNameList = JSON.parse(localStorage.getItem(itemName));
        aNameList.push(aName);
        localStorage.setItem(itemId, JSON.stringify(aIdList));
        localStorage.setItem(itemName, JSON.stringify(aNameList));
      }
    } else {
      aIdList = [];
      aNameList = [];
    }
  },
  onDragEnd: function() {
    document.getElementById('dropbox').style.display = 'none';
  }
};
var gal = {
  init: function(e, width, height) {
    var div = document.createElement('div');
    var background = document.createElement('div');
    background.setAttribute('style', 'position:fixed; height:100%; width:100%; left:0; top:0; background-color:black; opacity:0.8;z-index:20');
    background.addEventListener('click', function() {
      document.body.removeChild(div);
    }, true);
    var box = document.createElement('div');
    box.id = 'box';
    box.style.position = 'absolute';
    box.style.left = window.pageXOffset + (window.innerWidth - width) / 2 + 'px';
    box.style.top = window.pageYOffset + (window.innerHeight - height) / 2 + 'px';
    box.style.zIndex = 21;
    document.body.appendChild(div);
    div.appendChild(background);
    div.appendChild(box);
    box.appendChild(e);
  },
  //==Show preview gallery==
  onShowPic: function() {
    var origin = new Image();
    origin.src = this.src;
    var leftd = document.createElement('div');
    leftd.id = 'leftd';
    leftd.setAttribute('style', 'position:absolute; left:0; top:0; height:100%; width:50%');
    leftd.addEventListener('click', gal.onShowNext, true);
    var rightd = document.createElement('div');
    rightd.id = 'rightd';
    rightd.setAttribute('style', 'position:absolute; right:0; top:0; height:100%; width:50%');
    rightd.addEventListener('click', gal.onShowNext, true);
    var image = document.createElement('div');
    image.appendChild(origin);
    image.appendChild(leftd);
    image.appendChild(rightd);
    gal.init(image, origin.width, origin.height);
  },
  //==Show next preview==
  onShowNext: function() {
    var box = document.getElementById('box');
    var curpic = box.firstChild.firstChild;
    var gal = document.getElementsByClassName('galpic').length;
    var num = (this.id === 'leftd') ? -1 : 1;
    var patt = /\d+(?=\.jpg$)/;
    patt.compile(patt);
    var nextnum = parseInt(curpic.src.match(patt)[0], 10) + num;
    if(nextnum <= gal && nextnum > 0) {
      var nextpic = new Image();
      nextpic.src = curpic.src.replace(patt, nextnum);
      box.style.left = window.pageXOffset + (window.innerWidth - nextpic.width) / 2 + 'px';
      box.style.top = window.pageYOffset + (window.innerHeight - nextpic.height) / 2 + 'px';
      box.firstChild.insertBefore(nextpic, curpic);
      box.firstChild.removeChild(curpic);
    } else {
      document.body.removeChild(box.parentNode);
    }
  },
  onPlay: function() {
    var video = document.createElement('div');
    video.id = 'samplevideo';
    video.width = 560;
    video.height = 440;
    video.setAttribute('style', 'border:5px solid #FFFFFF; color: #F4F4F4; font-weight:bold;');
    video.textContent = 'Loading...';
    gal.init(video, video.width, video.height);
  }
};
var sample = {
  init: function() {
    if(detail.videoEnable) {
      this.createLink();
    }
  },
  createLink: function() {
    var mybox = document.getElementById('mybox');
    var play = document.createElement('a');
    play.textContent = 'Play Sample';
    play.addEventListener('click', gal.onPlay, false);
    play.addEventListener('click', sample.injectScript, false);
    mybox.appendChild(play);
  },
  injectScript: function() {
    function handelVideo() {
      $('#samplevideo').load(location.pathname + 'ajax=movie/');
    }

    function closePlayer() {
      $('#box').parent().remove();
    }
    var inject = document.createElement('script');
    inject.appendChild(document.createTextNode('(' + handelVideo + ')();'));
    inject.appendChild(document.createTextNode(closePlayer));
    var sample = document.getElementsByClassName('mg-b20 mg-r12')[0];
    sample.parentNode.insertBefore(inject, sample);
  }
};
//Get cid of the dvd: type ? realcid : dmmcid
//realcid[abcd123, abcd, 123] dmmcid[abcd123so, abcd123]


function getCid(str, type) {
  return type ? str.match(/([a-z]+)([0-9]+)/) : str.match(/(\w+\d+)(?:so)?/);
}

function removeChildren(e) {
  while(e.firstChild) {
    e.removeChild(e.firstChild);
  }
}

(function() {
  var page = /\/top\/-\/error\/area\/|\/detail\/|\/list\//.exec(location.pathname);
  var config = {
    comment: true,
    //remove comments
    preload: false //auto preload
  };
  switch(page[0]) {
  case '/list/':
    list.init();
    fav.init();
    break;
  case '/top/-/error/area/':
    wish.init();
    break;
  case '/detail/':
    detail.init(config);
    sample.init();
    fav.init();
    addfav.init();
    break;
  }
})();
