// ==UserScript==
// @author         rikuo
// @name           filter for pixiv ranking
// @namespace      http://d.hatena.ne.jp/rikuo/
// @include        http://www.pixiv.net/ranking.php?mode=day*
// @include        http://www.pixiv.net/ranking.php?mode=week*
// @include        http://www.pixiv.net/ranking.php?mode=month*
// @include        http://www.pixiv.net/ranking_r18.php?mode=day*
// @include        http://www.pixiv.net/ranking_r18.php?mode=week*
// @include        http://www.pixiv.net/ranking_r18.php?mode=month*
// @include        http://www.pixiv.net/ranking_tag.php?type=detail&no=*
// ==/UserScript==



// set user number
// example:: '123 456 789'
var users = '';


// replace Lage images
var LargeImg = false;


//------------------------------------------------------------------------//

var alpha = '0.5';		// translucent

var _doc = document;
var df = _doc.createDocumentFragment();

users = users.split(/\s+/);

var btnText = [];

btnText[0] = ['\u975E\u8868\u793A','\u5E0C\u8584\u5316','\u5f37\u8abf'];
btnText[1] = ['hide','translucent','accent'];

var btnID = 'pixivshowhidebtn';
var l = 0;
var mode = 'pixivranking';
var showhide = GM_getValue(mode, 1);

function setBtn(){
	var body = _doc.body;
	GM_addStyle(
		'#'+btnID+'{position:fixed;top:0;left:0;background-color:#0098e0;-moz-border-radius:0 0 8px 0;display:block;width:5em;color:white;text-decoration:none;cursor:pointer;padding:5px 5px 5px 10px;opacity:0.8;-moz-opacity:0.8;font-weight:bold;}'+
		'#'+btnID+':link,'+'#'+btnID+':visited,'+'#'+btnID+':hover{color:white;text-decoration:none;}'
	);

	var btn = c('a');
	df.appendChild(btn);
	btn.id = btnID;
	btn.textContent = btnText[l][showhide];
	btn.addEventListener('click',chengeShowHide,false);
	var span = c('span');
	btn.appendChild(span);
	span.id = 'showhidenum';
	span.textContent = ':0';
	body.appendChild(df);
	addCss(showhide);
}
function chengeShowHide(){
	if(showhide == 2){
		showhide=0;
	}else if(showhide == 1){
		++showhide;
	}else{
		 ++showhide;
	}
	addCss(showhide);
	GM_setValue(mode, showhide);
	e(btnID).firstChild.nodeValue = btnText[l][showhide];
}

function addCss(num){
	if(num == 1){		// translucent
		GM_addStyle('.chkEntry td{display: table-cell; -moz-opacity:'+alpha+';opacity :'+alpha+';}');
	}else if(num == 2){	// accent
		GM_addStyle('.chkEntry td{display: table-cell; -moz-opacity: 1;opacity: 1; background-color: #fcfcba;}');
	}else{			// hide
		GM_addStyle('.chkEntry td{display: none;}');
	}
}

function filter(items){
	for(var i=0,ul=users.length;i<ul;++i){
		var entries = xpath(items, 'descendant::tr[child::td[position()=3 and descendant::a[@href="member.php?id=' + users[i] + '"]]]');

		if(entries.snapshotLength){
			for(var j=0,el=entries.snapshotLength;j<el;++j){
				var entry = entries.snapshotItem(j);
				var titleElm;
				var tag = entry.previousSibling.tagName;
				(entry.previousSibling.childNodes.length) ? titleElm = entry.previousSibling : titleElm = entry.previousSibling.previousSibling;

				titleElm.className += ' chkEntry';
				entry.className += ' chkEntry';
			}
		}
	}
}

function change_img(items){
	var imgs = xpath(items,'descendant::a[contains(@href,"mode=medium&illust_id=")]/img[contains(@src,"pixiv.net/img/")]');
	if(imgs.snapshotLength){
		for(var i=0,il=imgs.snapshotLength;i<il;++i){
			var img = imgs.snapshotItem(i);
			img.src = img.src.replace(/_s\.(jpg|jpeg|gif|png)$/i, '_m\.$1');
		}
	}
};

var make_list = function(doc){
	var div = xpath(doc,'descendant::div[contains(concat(" ",@class," "),"link_visited")]').snapshotItem(0);
	var ranking = xpath(div,'child::table').snapshotItem(0);
	ranking.style.cssText = 'border-collapse: collapse;';
	// remove ad
	var ad = xpath(ranking,'descendant::tr[child::td[@colspan=3]]');
	if(ad.snapshotLength){

	var tboby = ad.snapshotItem(0).parentNode;
		for(var i=0,al=ad.snapshotLength;i<al;++i){
			tboby.removeChild(ad.snapshotItem(i));
		}

	}

	if(LargeImg)change_img(ranking);
	if(users.length)filter(ranking);
	parentDiv.replaceChild(div,doc);

};

var parentDiv = e('content3');
var elm = xpath(parentDiv,'child::table');
var table = elm.snapshotItem(0);

make_list(table);
setBtn();
setCount();


function setCount(){
	var count = xpath(parentDiv,'descendant::tr[contains(concat(" ",@class," "), "chkEntry")]').snapshotLength;
	e('showhidenum').firstChild.nodeValue = ':' + count / 2;
}

function xpath(context, query){
	return _doc.evaluate(
		query, context, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
}
function e(id){
	return _doc.getElementById(id);
}
function c(tag_name){
	return _doc.createElement(tag_name);
}


if(window.AutoPagerize) {
	boot();
}else{
	window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
}

function boot(){
	window.AutoPagerize.addFilter(function(docs){
		docs.forEach(make_list);
		setCount();
	});
}

