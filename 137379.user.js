// ==UserScript==
// @name           DMMGirl mod
// @namespace      ...
// @description    DMM.R18/* tweak for non-member: show big cover, preload sample picture, local wishlist, remove member functions...
// @version        1.0.1
// @updateURL      https://userscripts.org/scripts/source/137379.meta.js
// @include        http://www.dmm.co.jp/error/-/area/=/navi=none/*
// @include        http://www.dmm.co.jp/mono/dvd/-/list/*
// @include        http://www.dmm.co.jp/rental/-/list/*
// @include        http://www.dmm.co.jp/digital/videoa/-/list/*
// @include        http://www.dmm.co.jp/mono/dvd/-/detail/=/cid=*
// @include        http://www.dmm.co.jp/digital/videoa/-/detail/=/cid=*
// @include        http://www.dmm.co.jp/rental/-/detail/=/cid=*
// ==/UserScript==
var detail = {
  init: function (c) {
    GM_addStyle(' \
      #mybox {font-size:1.2em; font-weight:bold; background-color:#F7FDFF; border:1px solid #CCCCCC; padding:5px 10px; margin-bottom:20px;} \
      #mybox a {display:block; color:#005FC0; cursor:pointer; text-decoration:none; padding-left:10px; \
        background:url("http://p.dmm.co.jp/p/common/arrow_common.gif") no-repeat scroll left center transparent} \
      #mybox a:active, #mybox a:hover {color:#EE2200 !important; text-decoration:underline !important;} \
      #mybox a:visited {color:#990099 !important;}');
    this.replaceRcolumn(c);
    this.showCover();
    this.addPreloadRadio();
  },
  //==Add preload radio button==
  addPreloadRadio: function () {
    var headline = getCn("headline mg-b10 lh3")[0];
    if (headline) {
      var link = document.createElement('input');
      link.type = "radio";
      link.id = "prelink";
      link.addEventListener("click", this.onPreloadSample, false);
      headline.appendChild(link);
      headline.appendChild(document.createTextNode("Preload "));
      link.checked = true;
      link.click();
    }
  },
  //==Preload previews==
  onPreloadSample: function () {
    this.removeEventListener('click', detail.onPreloadSample, false);
    var sample = getCn('crs_full');
    var block = getId("sample-image-block");
    var newblock = document.createElement('div');
    for (var i = 0; i < sample.length; i++) {
      var pic = document.createElement('img');
      pic.src = sample[i].firstChild.src.replace('-', 'jp-');
      pic.height = 73;
      pic.className = 'galpic';
      pic.addEventListener('click', gal.onShowPic, false);
      newblock.appendChild(pic);
    }
    block.parentNode.replaceChild(newblock, block);
  },

  //==Show big cover==
  showCover: function () {
    var sample = getCn('float-l mg-b20 mg-r12')[0];
    var img = getCn('tdmm')[0].cloneNode(true);
    var shiping_sample = getId('sample-video').cloneNode(true);
    removeChildren(sample);
    
    img.src = img.src.replace('ps.jpg', 'pl.jpg');
    sample.className = 'mg-b20 mg-r12';
    sample.appendChild(img);   
    
     
    var childs = shiping_sample.childNodes;
    var clone_node = '';
    //debugger;
    for (var i = 0; i < childs.length; i++) {
		if (childs[i].className == 'mg-t6')
		{
			clone_node = childs[i].cloneNode(true);
		}
    }
    removeChildren(shiping_sample);
    if(clone_node !== ''){
    	shiping_sample.appendChild(clone_node);
    }

    //alert("1111");
    shiping_sample.className="";
    
    sample.appendChild(shiping_sample);
  },
  replaceRcolumn: function (c) {
    var rcolumn = getCn('vline')[0].nextElementSibling;
    var info = getCn('mg-b20')[1];
    //debugger;

    var cid = QueryString("cid");
    
    var girlname = info.getElementsByTagName("a")[0].textContent;
    var tbody = info.firstElementChild; //remove last 2 rows
    tbody.removeChild(tbody.lastElementChild);
    var review = getId('review-list');
    if (review) {
      var star = tbody.lastElementChild.lastElementChild;
      var vote = getCn('count')[0];
      if (vote && star.lastElementChild) {
        star.lastElementChild.innerHTML = '(' + vote.innerHTML + ')';
      }
      else {
        star.lastElementChild.innerHTML = '(0)';
      }
      if (c) {
        review.parentNode.parentNode.removeChild(review.parentNode);
      }
    }
    var box = getCn('bx-option mg-t20')[0];
    if (box) {
      box.parentNode.removeChild(box);
    }
    var tag = getId('producttag');
    if (tag) {
      tag.parentNode.removeChild(tag);
    }
    var desc = info.nextElementSibling.nextElementSibling;
    var another = getCn('another')[0];
    removeChildren(rcolumn);
    var div = document.createElement('div');
    div.id = 'mybox';
    var add = document.createElement('a');
    add.appendChild(document.createTextNode('Add to Wishlist'));
    add.addEventListener("click", this.onAddWish, false);
    var view = document.createElement('a');
    view.href = 'http://www.dmm.co.jp/error/-/area/=/navi=none/';
    view.appendChild(document.createTextNode('View Wishlist'));
    
    var pcid = getCid(cid, true);
    var ncid = pcid[1] + '-' + pcid[2].substring(pcid[2].length-3,pcid[2].length);
    
    var search = document.createElement('a');
    //debugger;
    search.href = 'http://javblog.org/?s=' + ncid;
    search.target = '_blank';
    search.appendChild(document.createTextNode(ncid + ' in javblog.org')); 
    //search.charset = 'euc-jp';
    div.appendChild(search);
    
    var search = document.createElement('a');
    //debugger;
    search.href = 'http://sukebei.nyaa.eu/?page=search&cats=0_0&filter=0&term=' + ncid;
    search.target = '_blank';
    search.appendChild(document.createTextNode(ncid + ' in nyaa Torrent')); 
    //search.charset = 'euc-jp';
    div.appendChild(search);  
    
    var search = document.createElement('a');
    //debugger;
    search.href = 'http://bitsnoop.com/search/all/' + ncid;
    search.target = '_blank';
    search.appendChild(document.createTextNode(ncid + ' in bitsnoop Torrent')); 
    //search.charset = 'euc-jp';
    div.appendChild(search); 
    
    var search = document.createElement('a');
    search.href = 'http://www.baidu.com/s?wd=' + ncid;
    search.target = '_blank';
    search.appendChild(document.createTextNode(ncid + ' in baidu.com')); 
    //search.charset = 'euc-jp';
    div.appendChild(search);
    
    var search = document.createElement('a');
    search.href = 'http://www.google.co.jp/search?hl=ja&q=' + ncid;
    search.target = '_blank';
    search.appendChild(document.createTextNode(ncid + ' in google.jp')); 
    //search.charset = 'euc-jp';
    div.appendChild(search);
     
    //div.appendChild(add);
    //div.appendChild(view);
    
    rcolumn.appendChild(div);
    rcolumn.appendChild(info);
    rcolumn.appendChild(desc);
    if (another) {
      rcolumn.appendChild(another);
    }
  },
  //==Add to wishlist==
  onAddWish: function () {
    var tds = getCn('nw'); //[date,length,actress,director,series,maker,label,genre,cid]
    var date = tds[0].nextElementSibling;
    var actress = tds[2].nextElementSibling;
    var maker = tds[5].nextElementSibling;
    var cid = tds[8].nextElementSibling.innerHTML;
    var title = getId('title'); //get title
    var detail = date.innerHTML + '#' + actress.innerHTML + '#' + maker.innerHTML + '#' + title.innerHTML;
    localStorage.setItem(cid, detail);
  }


};
var list = {
  init: function () {
    var smallThumb = getCn("mg-r6");
    //debugger;
    if(smallThumb.length !== 0)
    {
	    for (var i = 0; i < smallThumb.length; i++) {
	      smallThumb[i].addEventListener("mouseover", this.onShowThumb, false);
	    }
	    var thumb = new Image();
	    thumb.id = 'hoverpic';
	    thumb.style.position = 'absolute';
	    thumb.style.zIndex = 22;
	    thumb.style.display = 'none';
	    thumb.addEventListener("mouseout", this.onRemoveThumb, false);
	    var a = document.createElement('a');
	    a.appendChild(thumb);
	    document.body.appendChild(a);
  	}
  	//debugger;
  	smallThumb = getCn("pack-bx");
  	if(smallThumb.length !== 0)
    {
    	for (var i = 0; i < smallThumb.length; i++) {
    		
    		var smallThumb_o = smallThumb[i].children[0].children[0].children[0].children[0].children[0].children[0];
    		//debugger;
	      smallThumb_o.addEventListener("mouseover", this.onShowThumb, false);
	      
	    }
	    var thumb = new Image();
	    thumb.id = 'hoverpic';
	    thumb.style.position = 'absolute';
	    thumb.style.zIndex = 22;
	    thumb.style.display = 'none';
	    thumb.addEventListener("mouseout", this.onRemoveThumb, false);
	    var a = document.createElement('a');
	    a.appendChild(thumb);
	    document.body.appendChild(a);
    }
    smallThumb = getCn("bx-cont");
  	if(smallThumb.length !== 0)
    {
    	for (var i = 0; i < smallThumb.length; i++) {
    		
    		var smallThumb_o = smallThumb[i].children[0].children[0].children[1].children[0].children[0].children[0];
    		//debugger;
	      smallThumb_o.addEventListener("mouseover", this.onShowThumb, false);
	      
	    }
	    var thumb = new Image();
	    thumb.id = 'hoverpic';
	    thumb.style.position = 'absolute';
	    thumb.style.zIndex = 22;
	    thumb.style.display = 'none';
	    thumb.addEventListener("mouseout", this.onRemoveThumb, false);
	    var a = document.createElement('a');
	    a.appendChild(thumb);
	    document.body.appendChild(a);
    }
  },
  onShowThumb: function () {
  	//debugger;
    if (this.src.search('noimage') === -1) {
      var thumb = getId('hoverpic');
      thumb.src = this.src.replace("pt.jpg", "ps.jpg");
      var pos = this.getBoundingClientRect();
      thumb.style.left = pos.left - 29 + window.pageXOffset + 'px'; //147*200,90*122
      thumb.style.top = pos.top - 39 + window.pageYOffset + 'px';
      thumb.width = 147;
      thumb.height = 200;
      thumb.style.display = 'block';
      //debugger;
      thumb.parentNode.href = this.parentNode.href;
      thumb.parentNode.target = '_blank';
    }
  },
  onRemoveThumb: function () {
    this.style.display = 'none';
    this.src = null;
    this.parentNode.href = null;
  }
};
var wish = {
  dvd: [],
  sortType: ['cid', 'date', 'actress', 'maker'],
  init: function () {
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
            <th width="15%">Cover</th> \
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
  onSort: function () {
    for (var i = 0; i < 4; i++) {
      getId(wish.sortType[i]).style.backgroundColor = '#242424';
    }
    this.style.backgroundColor = '#C10000';
    wish.dvd.sort(wish.by(this.id));
    wish.fillTable();
  },
  by: function (type) {
    return function (a, b) {
      var c = a[type];
      var d = b[type];
      if (c === d) {
        return 0;
      }
      if (c < d) {
        return -1;
      }
      else {
        return 1;
      }
    };
  },
  createObj: function () {
    function Dvd(cid, date, actress, maker, title) {
      this.cid = cid;
      this.date = date;
      this.actress = actress;
      this.maker = maker;
      this.title = title;
    }
    for (var i = 0; i < localStorage.length; i++) {
      var cid = localStorage.key(i);
      var info = localStorage[cid].split('#'); //Date[0]#Actress[1]#Maker[2]#Title[3]
      info[1] = info[1].replace(/></g, '><br /><');
      this.dvd[i] = new Dvd(cid, info[0], info[1], info[2], info[3]);
    }
    //this.dvd.sort(this.by('date'));
  },
  fillTable: function () {
    for (var i = 0; i < 4; i++) {
      getId(this.sortType[i]).addEventListener("click", this.onSort, false);
    }
    var list = getId('wishlist');
    removeChildren(list);
    for (i = 0; i < this.dvd.length; i++) {
      var item = document.createElement('tr');
      item.innerHTML = ' \
        <td height="130">' + (i + 1) + '</td> \
        <td><img src="http://pics.dmm.co.jp/mono/movie/' + this.dvd[i].cid + '/' + this.dvd[i].cid + 'pt.jpg" /></td> \
        <td><a href="http://www.dmm.co.jp/mono/dvd/-/detail/=/cid=' + this.dvd[i].cid.replace(/so$/, '') + '/">' + this.dvd[i].cid + '<br /></a><p>' + this.dvd[i].title + '</p></td> \
        <td>' + this.dvd[i].actress + '</td> \
        <td name="maker">' + this.dvd[i].maker + '</td> \
        <td>' + this.dvd[i].date + '</td> \
        <td><a href="" onclick="localStorage.removeItem(\'' + this.dvd[i].cid + '\')">' + 'X' + '</a></td>';
      list.appendChild(item);
    }

  }
};
var fav = {
  init: function () {
    GM_addStyle(' \
      #header .hd-lnav ul li ul li {position: relative;top:-4em;margin:0;background-color:#242424} \
      #header .hd-lnav ul li ul {display:none; position:absolute;} \
      #header .hd-lnav ul li>ul {top: auto;left: auto;} \
      #header .hd-lnav ul li:hover ul {display:block}');
    this.addMaker();
    this.addLink();
  },
  addMaker: function () {
    function Menu(name, id) {
      this.name = name;
      this.id = id;
    }
    var maker = [];
    maker[0] = new Menu('Moodyz', 1509);
    maker[1] = new Menu('SOD', 45276);
    maker[2] = new Menu('IP', 1219);
    maker[3] = new Menu('S1', 3152);
    maker[4] = new Menu('Prestige', 40136);
    maker[5] = new Menu('EBODY', 5032);
    createMenu('Maker', 'maker', maker);
    var genre = [];
    genre[0] = new Menu('Titjob', 5019);
    genre[1] = new Menu('Blowjob', 5002);
    genre[2] = new Menu('Handjob', 5004);
    genre[3] = new Menu('Cum inside', 5001);
    genre[4] = new Menu('Cum on face', 5023);
    createMenu('Genre', 'keyword', genre);

    function createMenu(menu, name, menuArr) {
      var navBar = getCn("hd-lnav group")[0].firstElementChild;
      var liMenu = document.createElement('li');
      var aMenu = document.createElement('a');
      aMenu.href = '/mono/dvd/-/' + menu.toLowerCase() + '/';
      aMenu.appendChild(document.createTextNode(menu));
      liMenu.appendChild(aMenu);
      var ulMenu = document.createElement('ul');
      liMenu.appendChild(ulMenu);
      navBar.appendChild(liMenu);
      for (var i = 0; i < menuArr.length; i++) {
        var liSubmenu = document.createElement('li');
        var aSubmenu = document.createElement('a');
        aSubmenu.href = '/mono/dvd/-/list/=/article=' + name + '/id=' + menuArr[i].id + '/sort=date/';
        aSubmenu.appendChild(document.createTextNode(menuArr[i].name));
        liSubmenu.appendChild(aSubmenu);
        ulMenu.appendChild(liSubmenu);
      }
    }
  },
  addLink: function () {
    var wishLink = document.createElement('a');
    wishLink.href = 'http://www.dmm.co.jp/error/-/area/=/navi=none/';
    wishLink.appendChild(document.createTextNode('Wishlist'));
    wishLink.style.marginLeft = '5px';
    var key = getCn('popular-keyword')[0];
    key.appendChild(wishLink);
    key.style.right = '-3em';
  }
};

var gal = {
  init: function (e, width, height) {
    var div = document.createElement('div');
    var background = document.createElement('div');
    background.setAttribute('style', 'position:fixed; height:100%; width:100%; left:0; top:0; background-color:black; opacity:0.8;z-index:20');
    background.addEventListener("click", function () {
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
  onShowPic: function () {
    var origin = new Image();
    origin.src = this.src;
    var leftd = document.createElement('div');
    leftd.id = 'leftd';
    leftd.setAttribute('style', 'position:absolute; left:0; top:0; height:100%; width:50%');
    leftd.addEventListener("click", gal.onShowNext, true);
    var rightd = document.createElement('div');
    rightd.id = 'rightd';
    rightd.setAttribute('style', 'position:absolute; right:0; top:0; height:100%; width:50%');
    rightd.addEventListener("click", gal.onShowNext, true);
    var image = document.createElement('div');
    image.appendChild(origin);
    image.appendChild(leftd);
    image.appendChild(rightd);
    gal.init(image, origin.width, origin.height);
  },
  //==Show next preview==
  onShowNext: function () {
    var box = getId('box');
    var curpic = box.firstChild.firstChild;
    var gal = getCn('galpic').length;
    var num = (this.id === 'leftd') ? -1 : 1;
    var patt = /\d+(?=\.jpg$)/;
    patt.compile(patt);
    var nextnum = parseInt(curpic.src.match(patt)[0], 10) + num;
    if (nextnum <= gal && nextnum > 0) {
      var nextpic = new Image();
      nextpic.src = curpic.src.replace(patt, nextnum);
      box.style.left = window.pageXOffset + (window.innerWidth - nextpic.width) / 2 + 'px';
      box.style.top = window.pageYOffset + (window.innerHeight - nextpic.height) / 2 + 'px';
      box.firstChild.insertBefore(nextpic, curpic);
      box.firstChild.removeChild(curpic);
    }
    else {
      document.body.removeChild(box.parentNode);
    }
  },
  onPlay: function () {
    var video = document.createElement('embed');
    video.width = 640;
    video.height = 480;
    video.src = sample.url;
    gal.init(video, video.width, video.height);
  }
};
var sample = {
  url: '',
  sods: [ //sod shop 640x480 http://str.sod.co.jp/201204/abcd_123/abcd_123_sample.wmv 
    'SODクリエイト', //SOD Create 45276
    'ディープス', //Deep's 40003
    'ナチュラルハイ', //Natural High 40001
    'アイエナジー', //IEnergy 40004
    'ヒビノ', //hibino & switch<97 45277
    'V＆Rプロダクツ', //V&R Products 45168
    'アキノリ', //AKNR 45289
    'DANDY', //DANDY 45286
    'LADY×LADY', //LADYxLADY 45460
    'Hunter', //Hunter 45287
    'GARCON', //GARCON 45504
    'サディスティックヴィレッジ', //Sadistic Village 45356
    'ROCKET', //ROCKET 45371
    'AROUND', //AROUND 45562
    'KEU', //45615
    'ATOM', //45758
    'SWITCH', //>96 45914
    'F＆A', //F&A 45831
    'new girl', //45887
    'SILK LABO', //45583
    'イフリート', //ifrit 45290
    'C＆H', //C&H 45429
    'ピュアネスプラネット', //pureness planet 45453
    '人間考察', //45455
    'シュガーワークス' //Sugar Works 40163
    ],
  kmps: [ //smm 320x240 http://st0.d-dx.jp/a5942/r1/unsecure/smm2012/0106/ABCD-123.wmv
    //2012/0106 2011/0712 2011/0106 10/0112 09/0112/ 08/0112
    'ケイ・エム・プロデュース', //K.M.Produce: million+おかず。 40071
    'スクープ', //Scoop 45837
    'S級素人', //45434
    '宇宙企画', //45858
    'バズーカ（BAZOOKA）', //BAZOOKA 45859
    'レアルワークス', //Real Works 40185
    'なでしこ', //Nadeshiko 45216
    //also in
    'センタービレッジ', //centervillage 45016
    'h.m.p', //40027
    'クリスタル映像', //40035
    'ワープエンタテインメント', //WAAP ent. 40005
    'ドリームチケット', //dream ticket 40025
    'マックスエー', //MAX-A 40046
    'アップス', //UP'S 45313
    'ブリット', //bullitt 45176
    'ホットエンターテイメント', //hot ent. 40045
    'マキシング', //maxing 45217 only mxgs
    'バルタン', //BALTAN 45700
    'ワンダフル（ONE DA FULL）', //45807
    'サムシング', //something 45489
    'ラマ', //lama 45416
    'HMJM' //45337
    ],
  pres: [ //500x376 http://download.prestige-av.com/sample_movie/ABC-123.wmv
    'プレステージ', //Prestige: Fullsail DOC shiroutoTV saikyo magic Zetton onemore avant opus yabusame yabustyle ase digista40136
    'MAD', //45490
    'ラストラス' //LUSTROUS 45039
    //'GALLOP', //GALLOP 45735 no video
    ],
  init: function () {
    var tds = getCn('nw');
    var maker = tds[5].nextElementSibling.firstChild.innerHTML;
    var date = tds[0].nextElementSibling.innerHTML;
    var cid = tds[8].nextElementSibling.innerHTML;
    var pcid = getCid(cid, true);
    var pdate = date.split('/');
    if (this.sods.indexOf(maker) !== -1) {
      this.url = 'http://str.sod.co.jp/' + pdate[0] + pdate[1] + '/' + pcid[1] + '_' + pcid[2] + '/' + pcid[1] + '_' + pcid[2] + '_sample.wmv';
      this.createLink();
    }
    else if (this.pres.indexOf(maker) !== -1) {
      this.url = 'http://download.prestige-av.com/sample_movie/' + pcid[1] + '-' + pcid[2] + '.wmv';
      this.createLink();
    }
    else if (this.kmps.indexOf(maker) !== -1) {
      var mon = '';
      if (pdate[0] === '2012' || pdate[0] === '2011') {
        mon = ((pdate[1] + pdate[2]) < '0701') ? '/0106/' : '/0712/';
      }
      else {
        mon = '/0112/';
      }
      this.url = 'http://st0.d-dx.jp/a5942/r1/unsecure/smm' + pdate[0] + mon + pcid[1].toUpperCase() + '-' + pcid[2] + '.wmv';
      this.createLink();
    }
  },
  createLink: function () {
    var mybox = getId('mybox');
    var play = document.createElement('a');
    play.href = this.url;
    play.target = '_blank';
    play.appendChild(document.createTextNode('Demo Movie Download'));
    //play.addEventListener("click", gal.onPlay, false);
    mybox.appendChild(play);
  }
};

(function(){
	//alert("111");
	//alert(_sc.products);
  var page = /\/error\/-\/area\/=|\/detail\/|\/list\//.exec(location.pathname);
  var config = {removeComment: true};
  switch (page[0]) {
  case '/list/':
    list.init();
    fav.init();
    break;
  case '/error/-/area/=':
    wish.init();
    break;
  case '/detail/':
    detail.init(config.removeComment);
    fav.init();
    sample.init();
    break;
  }
})();

//Get cid of the dvd: type ? realcid : dmmcid
//realcid[abcd123, abcd, 123] dmmcid[abcd123so, abcd123]
function getCid(str, type) {
  return type ? str.match(/([a-z]+)([0-9]+)/) : str.match(/(\w+\d+)(?:so)?/);
}

function removeChildren(e) {
  while (e.firstChild) {
    e.removeChild(e.firstChild);
  }
}

function getId(id) {
  return document.getElementById(id);
}

function getCn(cn) {
  return document.getElementsByClassName(cn);
}

function QueryString(item){
  var svalue = location.pathname.match(new RegExp("[/?/&]" + item + "=([^/&]*)(/&?)","i"));
  return svalue ? svalue[1] : svalue;
}
