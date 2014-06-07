// ==UserScript==
// @name	Instapaper Beyond
// @version	1.8
// @description	Adds fairly extensive keyboard navigation to an Instapaper Fluid SSB. Press h from any screen for a summary of available keys. Also adds target="_blank" to external links on read pages to allow opening originals in windows/tabs (depending on your settings)
// @include     http://www.instapaper.com*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// @require http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.2-min.js
// @copyright 	Extended: 2010, Brett Terpstra (http://brettterpstra.com) w/ code from: 2009+, ElasticThreads (http://elasticthreads.tumblr.com/)
// @license	(CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
var version = 1.8;
// var hdr = document.getElementById('header');
// var divs = hdr.getElementsByTagName('div');
// divs[1].innerHTML = "Instapaper Beyond is loading, please wait for the highlight to appear.";

GM_addStyle('div.bottom{padding-top:80px}' +
'.selected .starBox img{left:22px !important;}' +
'#story #logo{font-size:24px}' +
'#text_controls a {color:#555 !important;}' +
'#textArticle{z-index:10000;font-family:Georgia;font-size:14px;margin:0 0 0 -320px;left:50%;line-height:1.5em;width:500px;-webkit-text-size-adjust:none;word-wrap:break-word;}' +
'h1{font-size:1.3em;}' +
'h2{font-size:1.15em;}' +
'h3,h4,h5,h6,h7{font-size:1.0em;}' +
'#textArticle img{border:0;display:block;}' +
'pre,code{overflow:auto;}' +
'#story{clear:both;padding:0 10px;overflow:hidden;margin-bottom:40px;}' +
'.bar{color:#555;font-family:"Helvetica";font-size:11pt;margin:0 -20px;padding:10px 0;}' +
'.top{border-bottom:2px solid #000;}' +
'.top a{display:block;float:right;text-decoration:none;font-size:11px;background-color:#eee;-webkit-border-radius:8px;-moz-border-radius:8px;padding:2px 15px;}' +
'#story div{margin:1em 0;}' +
'.bottom{border-top:2px solid #000;color:#555;}' +
'.bar a{color:#444;}' +
'blockquote{border-top:1px solid #bbb;border-bottom:1px solid #bbb;margin:1.5em 0;padding:0.5em 0;}' +
'blockquote.short{font-style:italic;}' +
'pre{white-space:pre-wrap;}' +
'ul.bodytext,ol.bodytext{list-style:none;margin-left:0;padding-left:0em;}');

GM_addStyle('pre{white-space:pre;white-space:pre-wrap;white-space:pre-line;white-space:-pre-wrap;white-space:-o-pre-wrap;white-space:-moz-pre-wrap;white-space:-hp-pre-wrap;word-wrap:break-word;}' +
'#textArticle a.archiveButton{width:80px !important;}' +
'.tableViewCell{position:relative !important;}' +
'.selected,.highlight{position:relative !important;background:#f6ffcc !important;background-image:none !important;}' +
'#textArticle{display:none;background:rgb(254,255,254);width:100%;padding:20px 60px 0;margin:0;position:absolute;top:0 !important;}' +
'#newHelpHUD{display:none;background:#111;position:fixed;top:0;left:50px;opacity:.9;padding:20px;color:#ccc;-webkit-border-bottom-left-radius:25px;-webkit-border-bottom-right-radius:25px;z-index:99999;}' +
'#newHelpHUD li{margin:5px 0}' +
'#linkStyles strong,#newHelpHUD strong,#newFolderList strong{color:yellow}' +
'#newFolderList{display:none;color:white;position:absolute;top:-50px;padding-top:20px;width:300px;background:#111;overflow:auto;opacity:.9;line-height:2em;-webkit-border-radius:15px;-webkit-box-shadow:7px 7px 15px #333;z-index:100000;font-family:Helvetica,Arial,sans-serif !important;}' +
'#linkStyles a,#newFolderList a{color:white !important;text-decoration:none;padding:5px}' +
'#newFolderList .selected{background:#333 !important;color:yellow;width:80%;-webkit-border-radius:6px}' +
'#newFolderList p{text-align:center;font-size:.8em;padding:10px;color:#aaa}' +
'#newFolderList #filter{margin:0;padding:0;height:20px;width:100%;text-align:center;white-space:nowrap;overflow:hidden;}' +
'#linkStyles h2,#newFolderList h2{font-weight:normal;text-align:center;padding:10px 10px 20px 10px}' +
'#textMask{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#ececec;}' +
'#brettLoader{display:none;background:rgba(221, 221, 221, 0.85) url(images/loader-gray-big.gif) no-repeat center center;width:154px;height:155px;-moz-border-radius: 15px;-webkit-border-radius: 15px;border-radius: 15px;}' +
'#linkStyles ul{padding:0;margin:0}' +
'#text_controls{color:#555;text-align:center;font-size:16px;}' +
'#text_controls a{text-decoration:none;color:#555}' +
'h2#categoryHeader {float:left;clear:both;}' +
'#feature_column {clear:both;}' +
'#feature_column blockquote {border:none;}' +
'#scrollMeter {' +
'  width:15px;' +
'  height:93px;' +
'  background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAABbCAYAAADEOl2TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABa5JREFUeNrsnMlPI0cUxot9B7MKIcEgARKLRSxxILcYToCQsMQBbiG33MIxc0pym9tM/oIwt3DCXFjEAYMEChIgLLAEYvOwHNiM2cwOqa+myik87m4TjRIyeU+qadtd36v3e1XVM5pSP8b+xxZndKOrq+sVv7h4c/BWzpuftwXe3P39/R/MnHJtjqZFC2par1VQXN/BL06phXmeqXVIvdIucO2gJbwM/Gfeek3GeIc+3OFJFP0PUm8z0CIYl4G2Q/ouN9H2RksC136FBJloMXk9XDsRFV6Ce1TG6+rqWFlZGcvOzmbX19dsdXWV+Xw+1R0z6dQhuP43DIDPlZWVouXk5Ajt9vY2W1paEp/lSnDqEFz7Lb/04XNpaanQFhUViXtKe3p6aqlFrHa7XfiA7e/vC+3BwYHqjgS8jwY/gFkpLCxkbW1tDNfHx8e/lklcnAhgYGBAOfNwR01S+xNmPCUlhXV0dIQH1w3gg4ODAkZPnpxxzBprbW1ltbW1UaduZGREJR8JcGD7yRnHhNkaGhpYc3Mzy8/PZzbbx4V3dnbGjo6O2MzMDBsfH1euMO5Eggb+Db+8QfDd3d0sLy/vCbiy1NRUVlNTw7xeL7u/vy/nWfYg0yr4zs7OqOCwxMREVlFRwfx+PwuFQsX8pysOM8H1Iwi+qamJ1dfXG+41rAYkPRAIpKI/1w5y7e/8czVWKRJXXV0tJg1xomHl5ebmsqysLHZ7e6sS7+TaX8Pw3An2qaOxsVEMEg1ch+DgyhFSjGBaEACyb2bQZmRksJWVFXxF8rAXv8dybW9vt3xCl5SUsPn5eXx0cC0S/gZfMGGYlMzMTMMx09LS1NazQRuv9RFPx6qqKlNwGO7L2VY6l9qrsRiSK61caTV/poYkaeP0qnHV7BpZenq6WAWa1qXDi6ekeshYGRxJs+mBxWpaECLp2G6xmtbXqXyZgUcmQFn8C/i3hkg69mmspk1Q+K+1hISEZw/8EuD/NSN4gid4gid4gid4gid4gid4gid4gid4gid4gid4gn+xlvhSAsE5IP4/Pjk52bTf5eXllwcPKygoEMdRZiaPuWjZEzzBEzzBEzzBEzzBEzzBEzzBEzzBEzzBEzzBEzzBEzzBWxgOHv5L9tkPLfAqGt5lMbOdnZ0vEx6vcli98vF33oqgPU/wBE/wBE/wBE/wBE/wBE/wBE/wBE/wBE/wBE/wBE/wBP+PGMq7qTp5MdnJyckT7eeAD0Y4NrWrq6tPfgNALBDn5+eiSJ80D/7Ad1RaszL0kUUBn2hR987Kbm5unsSnwwtHKPNmdeaG+2tra7puQWlReM/MDg8PRbBaRUS30gaDQXZ3d2eoDYVC7Pj4WE9cn9IioWaJh1/439raUj8t6PAiiKmpKcvZAzz6aQGIIFBrbnd3l+3t7RkGj3M6TeuWLQgAJNToHA/Bo4jg3Nycis8ji3r68X12dpatr68bJg/a5eVlVcExCG340Mzn83ntdruLOyq+uLgQB44oohcJHR8fz4aGhlSQfu7kO67d41oHX5LVyCzekMISS0pKEq+LITjMFu6NjY3ppRy7uR5aFBN0Ar64uJg9PDyIsVHJEDCBQIBtbm4KcK2UYw/380EWE+wGHGriIUacBeIVNfjBFtnY2BDN7XarrfUj1848OTHkjv6AI56dVGRJlVLEqSsA8FoX6l9KcATfAnCpRSnHFpR3RIlIBI3nAgIH9OLiIhsdHRXZlwbwGZl4lIIs54E5cB8rBA2BYxVBOzk5yaanp8PgqpQr165wLWryfQ0txsO4aNAiZqy04eFhBd7Hta/FZEYuD1lQE8vYYbLyF2QA3ghtjtS6LJ7uLr0Eq6Z/y8xLzkLbq6qXRmhRcvadxTMP5Wp/Ca9ko16ynKpR0d/3ZiPIYqI9LErRX5n5ExPtK5kAJ4so+vsM7SdFf5GYyGLFfwowACUr1EjSjA0nAAAAAElFTkSuQmCC) no-repeat -2px 0;' +
'  position:fixed;' +
'  z-index:999999;' +
'  left:50%;' +
'  top:50px;' +
'  margin-left:-420px;' +
'  opacity:0.4;' +
'}' +
'#scrollMeter.meter1 {background-position:-17px 0;}' +
'#scrollMeter.meter2 {background-position:-32px 0;}' +
'#scrollMeter.meter3 {background-position:-47px 0;width:16px}');



var greyStyled = false;
var spans = document.getElementsByTagName('span');
for (i=0;i<spans.length;i++) { 
	if (/Greystyled/.test(spans[i].innerHTML)) {
		greyStyled = true;
	} 
}
var TextStyles = {
	_fontSize: false,
	_fontFamily: false,
	_lineHeight: false,
	_width: false,
    setup: function() {
        this.loadFont();
    },
	createCookie: function(name,value,days) {
		if(days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires="; expires="+date.toGMTString();
		} else { 
			var expires="";
		}
		document.cookie=name+"="+value+expires+"; path=/";
	},
   	readCookie: function(name) {
		var nameEQ=name+"=";
		var ca=document.cookie.split(';');
		for (var i=0;i<ca.length;i++) {
			var c=ca[i];
			while(c.charAt(0)==' ')
			c = c.substring(1,c.length);
			if (c.indexOf(nameEQ)==0)
				return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	loadDefaults: function() {
		this._fontSize=16;
		this._fontFamily="G";
		this._lineHeight=1.5;
		this._width=500;
	},
	saveFont: function() {
		this.applyFont();
		this.createCookie("fontMetrics",[this._fontSize,this._fontFamily,this._lineHeight,this._width].join("_"),365);
	},
	loadFont: function() {
		var cookieData=this.readCookie("fontMetrics");
		if (cookieData && (cookieData=cookieData.split("_")) && cookieData.length==4) {
			this._fontSize=parseInt(cookieData[0]);
			this._fontFamily=cookieData[1];
			this._lineHeight=parseFloat(cookieData[2]);
			this._width=parseInt(cookieData[3]);
		} else {
			this.loadDefaults();
		}
		this.applyFont();
	},
	applyFont: function() {
		if (this._fontSize<10)
			this._fontSize=10;
		else if (this._fontSize>48)
			this._fontSize=48;
		if (!greyStyled) {
			if (this._width<300)
				this._width=300;
			else if (this._width>document.body.clientWidth-80)
				this._width=document.body.clientWidth-80;
		}
		if (this._lineHeight>3.0)
			this._lineHeight=3.0;
		else if (this._lineHeight<1.1)
			this._lineHeight=1.1;
		var story=document.getElementById('story');
		story.style.fontSize=this._fontSize+"px";
		switch(this._fontFamily) {
			case"T": 
				story.style.fontFamily="Times, 'Times New Roman', serif";
				break;
			case"H": 
				story.style.fontFamily="Helvetica, Arial, sans-serif";
				break;
			case"V":
				story.style.fontFamily="Verdana, sans-serif";
				break;
			default:
				this._fontFamily="G";
				story.style.fontFamily="Georgia, serif";
				break;
		}
		if (!greyStyled) {
			$('#textArticle').css({
				width:this._width+'px',
				marginLeft:'-'+(this._width/2+(this._width/12))+'px',
				left:'50%'});
			$('#tempStar').css({
				marginLeft:'-'+(this._width/2+(this._width/12)-5)+'px',
				left:'50%'});
			story.style.lineHeight=this._lineHeight;
		}
	}
};

var y = String(window.location.href), 
hist = document.referrer,
validElements = ['P','DIV','UL','OL','DL','BLOCKQUOTE','H1','H2','H3','H4','H5','H6','PRE'],
textItemsCounter = 0;
var skipStr,starStr,delStr,articleLinks,folderLinks,textItems,hud,desc,deschtml,ENTitle,ENURL,ENDesc;
var formIsSetUp = false;
var atBottom = false;

// Add jQuery
function GM_wait() {
	if(typeof window.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = window.jQuery; letsJQuery(); }
}
GM_wait();

function bindEvent(target, event, handler) {
    $(target).unbind(event);
    if (handler) {
        $(target).bind(event, handler);
    }
}

function letsJQuery() {
	/* jQuery Sonar 2.0 */
	(function(e,h,l,c){e.fn.sonar=function(o,n){if(typeof o==="boolean"){n=o;o=c}return e.sonar(this[0],o,n)};var f=l.body,a="onscreen",m="offscreen",b=function(r,n,t){if(r){f||(f=l.body);var s=r,u=0,v=f.offsetHeight,o=h.innerHeight||l.documentElement.clientHeight||f.clientHeight||0,q=l.documentElement.scrollTop||h.pageYOffset||f.scrollTop||0,p=r.offsetHeight||0;if(!r.sonarElemTop||r.sonarBodyHeight!==v){if(s.offsetParent){do{u+=s.offsetTop}while(s=s.offsetParent)}r.sonarElemTop=u;r.sonarBodyHeight=v}n=n===c?0:n;return(!(r.sonarElemTop+(t?0:p)<q-n)&&!(r.sonarElemTop+(t?p:0)>q+o+n))}},d={},j=0,i=function(){setTimeout(function(){var s,o,t,q,p,r,n;for(t in d){o=d[t];for(r=0,n=o.length;r<n;r++){q=o[r];s=q.elem;p=b(s,q.px,q.full);if(t===m?!p:p){if(!q.tr){if(s[t]){e(s).trigger(t);q.tr=1}else{o.splice(r,1);r--;n--}}}else{q.tr=0}}}},25)},k=function(n,o){delete n[o]},g=function(r,p){var t=p.px,q=p.full,s=p.evt,o=b(r,t,q),n=0;r[s]=1;if(s===m?!o:o){setTimeout(function(){e(r).trigger(s===m?m:a)},0);n=1}d[s].push({elem:r,px:t,full:q,tr:n});if(!j){e(h).bind("scroll",i);j=1}};e.sonar=b;d[a]=[];e.event.special.onscreen={add:function(n){var p=n.data||{},o=this;if(!o[a]){g(this,{px:p.distance,full:p.full,evt:a})}},remove:function(n){k(this,a)}};d[m]=[],e.event.special.offscreen={add:function(n){var p=n.data||{},o=this;if(!o[m]){g(o,{px:p.distance,full:p.full,evt:m})}},remove:function(n){k(this,m)}}})(jQuery,window,document);

	if (y.indexOf('http://www.instapaper.com/user/login')==-1) {
	    bindEvent(document, "keyup", docOnKeyup);
	    bindEvent(document, "keydown", docOnKeyDown);
	}
	try {
		$('input,textarea').live('focus',function(){ 
            bindEvent(document, "keyup", null);
            bindEvent(document, "keydown", null);
		}).live('blur',function(){
            bindEvent(document, "keyup", docOnKeyup);
            bindEvent(document, "keydown", docOnKeyDown);
		});
		$('.tableViewCellFirst').addClass('selected');
	} catch(e) {
		//
	}
	$('.tableViewCell').live('click',function(){
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
	});
	$('.tableViewCellTitleLink').attr('target','_blank');
	$('#textArticle #story a').not('.notarget').live('click',function(){
		window.open(this.href);
		return false;
	});
	$('.actionButton.textButton').live('click',function () {
		scrollToTop();
		ajaxGetLink($(this).attr('href'));
		return false;
	});
	$('#folders div:last a:first').click(function(){
		addFolder();
		return false;
	});
	$('#header div:last').html('A simple tool to save web pages for reading later. <strong>Instapaper Beyond</strong> loaded <span style="font-size:2em;display:inline-block;position:relative;bottom:-4px;color:#79000e">&hearts;</span>.');
}

var hudTimer = 0;
function hudOnKeyUp(event) {
	event.preventDefault();
	var filter = $('#filter');
	var alphaNum = /[A-Z0-9]/i;
	if (event.ctrlKey) {
		switch (event.keyCode) {
			case 74: // j
			  HUDFilter.navDown();
			  break;
			case 75: // k
			  HUDFilter.navUp();
			  break;
			case 79: case 76: // o, l
			  HUDFilter.navOpen();
			  break;
	  }
	} else if (alphaNum.test(String.fromCharCode(event.keyCode))) {
		timeNow = new Date();
		if (timeNow - hudTimer > 1000)
			filter.text('');
		hudTimer = timeNow;
		filter.text(filter.text()+String.fromCharCode(event.keyCode));
		var search_text = $('#filter').text();
		var rg = new RegExp('^'+search_text,'i');
		quickcount = 0;
		$('#newFolderList ul li').each(function(){
 			if($.trim($(this).text()).search(rg) != -1) {
				$(this).parent('ul').find('li').removeClass('selected');
				$(this).addClass('selected');
				quickcount = 1;
				return false;
			}
		});
		if (quickcount == 0) {
			$('#newFolderList ul li').removeClass('selected');
			$('#newFolderList ul li:first').addClass('selected');		  
		}
	} else {
		switch (event.keyCode) {
			case 27: case 37: case 46: case 8: // escape, left arrow, del, backspace
        HUDFilter.navClose();
				break;
			case 13: case 39: // enter, right arrow?
				HUDFilter.navOpen();
				break;
			case 38: // up arrow
        HUDFilter.navUp();
				filter.text('');
				break;
			case 40: // down arrow
        HUDFilter.navDown();
				filter.text('');
				break;
		}
	}
	return false;
}

var HUDFilter = {
  navUp: function(){
    hudlist = document.getElementById('newFolderList');
		folderLinks = hudlist.getElementsByTagName('li');
		var folderIndex;
		for (i=0;i<folderLinks.length;i++) {
			if (isSelected(folderLinks[i])) {
				folderIndex = i;
				break;
			}
		}
		$('#newFolderList li.selected').removeClass('selected');
		if (folderIndex > 0)
			folderIndex--;
		else
			folderIndex = folderLinks.length;
		$(folderLinks[folderIndex]).addClass('selected');
	},
	navDown: function(){
	  hudlist = document.getElementById('newFolderList');
		folderLinks = hudlist.getElementsByTagName('li');
		var folderIndex;
		for (i=0;i<folderLinks.length;i++) {
			if (isSelected(folderLinks[i])) {
				folderIndex = i;
				break;
			}
		}
		$('#newFolderList li.selected').removeClass('selected');
		if (folderIndex + 1 < folderLinks.length)
			folderIndex++;
		else
			folderIndex = 0;
		$(folderLinks[folderIndex]).addClass('selected');
	},
	navOpen: function(){
	  link = $('.selected a').attr('href');
		if (link.indexOf('com/move/')!=-1) {
			hideFolderList();
			artID = link.split("/")[4];
			$.get(link,function(data){
				removeCell(artID);
				if ($('#textArticle').is(':visible')) {
					link = $('.selected a.textButton').attr('href');
					alert(link);
					ajaxGetLink(link);
				}
			});
		} else {
			document.location = link;
		}
	},
	navClose: function(){
	  if ($('#filter').text() == '') {
			if (!$('#newFolderList').hasClass("sendto")) {
				relid = $('#newFolderList').attr('rel');
				hideFolderList();
		
				link = $('.selected a').attr('href');
				$('.selected').removeClass('selected');
				if (relid != undefined) {
					$('#'+relid).addClass('selected');
				}
			} else {
				hideFolderList();
			}
		} else {
			$('#filter').text('');
			$('#newFolderList ul li').removeClass('selected');
			$('#newFolderList ul li:first').addClass('selected');
		}
	}
}

function isSelected (obj) {
	if (typeof obj == 'undefined' || obj==null || !RegExp) { return false; }
	var re = new RegExp("(^|\\s)selected(\\s|$)");
	if (typeof(obj)=="string") {
		return re.test(obj);
	}
	else if (typeof(obj)=="object" && obj.className) {
		return re.test(obj.className);
	}
	return false;
}
function clearSearch() {
		$('#filter').text('');	
		$('#newFolderList ul li').removeClass('selected');
		$('#newFolderList ul li:first').addClass('selected');
}

if (hist.indexOf('http')==-1){
	hist = 'http://www.instapaper.com/u';
}
if (y.indexOf('http://www.instapaper.com/go/')!=-1) {
	try {
		var aPos = y.indexOf('go/'),
		bPos = aPos + 3,
		cPos = y.indexOf('/text'),
		artID = y.substring(bPos,cPos);
		skipStr = 'http://www.instapaper.com/skip/' + artID;
		starStr = 'http://www.instapaper.com/star_toggle/' + artID;
		delStr = 'http://www.instapaper.com/delete/' + artID;
		var archtools = document.createElement("div");
		archtools.id = "readTbarr";
		archtools.innerHTML = "\
		<div><a href=" + hist + " title='go back' id='return-now'> &#8592;</a>\
			<a href=" + skipStr + " title='archive and return to read later' id='archive-return'>&#8599;</a>\
			<a href=" + starStr + " title='star this article' id='star-this'>&#65290;</a>\
			<a href=" + delStr + " title='delete this article and return to read later' id='del-this'>&#8709;</a>\
			<a href='javascript:togglescrolling()' title='toggle auto-scroll' id='scroll-tog'>&#8711;</a><\div>";
				var str = document.getElementById('story'); 
				str.parentNode.insertBefore(archtools, str);
		var heads = document.getElementsByTagName("head");
		var cssnode = document.createElement("style");
		var css = "html{padding-left:90px;padding-right:90px;}#readTbarr{position:fixed !important;z-index:100 !important;top:170px !important;}#readTbarr div{position: relative;right:80px;}#readTbarr a{opacity:.35;text-indent:0px !important;line-height:28px;font-family:serif !important;font-style: normal;font-weight: normal;font-size:22px;text-decoration:none;}#readTbarr a:visited{display:none;}#archive-return{background:#afafaf !important;margin-bottom:10px !important;font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block !important;padding:0 !important;width:26px !important;height:26px;text-align:center;font-size:19px !important;}#del-this{background:#afafaf !important;margin-bottom:10px !important;font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block;padding:0 !important;width:26px !important;height:26px;text-align:center;-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);}#star-this{background:#afafaf !important;margin-bottom:10px !important;font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style: solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block;padding:0 !important;width:26px !important;height:26px;text-align:center;}#return-now{background:#afafaf !important;margin-bottom:10px !important;font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width: .07em;border-style:solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block !important;padding:0 !important;width:26px !important;height:26px;text-align:center;opacity:.35 !important;line-height:24px !important;}#scroll-tog{background:#afafaf !important;margin-bottom:10px !important; font-weight:bold !important;-webkit-border-radius:4px;border-color:#4e4e4e;border-width:.07em;border-style:solid;-moz-border-radius:4px;color:#FFFFFF !important;display:block !important;padding:0 !important;width:26px !important;height:26px;text-align:center;line-height:24px !important;opacity:.35 !important;}#readTbarr a:hover{opacity:1 !important;}.selected{background:#ccc !important;}";
		cssnode.type = "text/css";
		cssnode.appendChild(document.createTextNode(css));
		heads[0].appendChild(cssnode);
		var jsnode = document.createElement("SCRIPT");
		var scrolljs = "\
			var goscrolling = 0;\
			var lastoffset = pageYOffset;\
			var aktiv = window.setInterval(scroll,150);\
			function scroll() {\
				if (goscrolling > 0) {lastoffset = pageYOffset; window.scrollBy(0,2);}\
				if (lastoffset == pageYOffset) {goscrolling = 0;}\
				}\
			function togglescrolling() {\
				document.getElementsByTagName('body')[0].focus();\
				if (goscrolling == 0) { goscrolling = 1;}\
				else {goscrolling = 0;}\
		}";
		scrolljs.id = "togscroll";
		jsnode.type = "text/javascript";
		jsnode.appendChild(document.createTextNode(scrolljs));
		heads[0].appendChild(jsnode);
	} catch(e) {
		//
	}
}

var body = document.getElementsByTagName("body");
var helpHUD = document.createElement("div");
helpHUD.id = "helpHUD";
var folderList = document.createElement("div");
folderList.id = "folderList";
var textArticle = document.createElement("div");
textArticle.id = "textArticle";
var textMask = document.createElement("div");
textMask.id = "textMask";
var brettLoader = document.createElement("div");
brettLoader.id = "brettLoader";
body[0].appendChild(helpHUD);
body[0].appendChild(folderList);
body[0].appendChild(textArticle);
body[0].appendChild(textMask);
body[0].appendChild(brettLoader);

var links = document.getElementsByTagName('a');
for (i=0;i<links.length;i++) {
	if (links[i].href.indexOf('instapaper.com')==-1 && links[i].href.indexOf('http') > -1) {
		links[i].target = "_blank";
	}
}
function setupForm() {
	$('input[type=text],textarea').addClass('focused');
	$('input[type=text],textarea').focus(function(){
		$(this).addClass('focused');
	}).blur(function(){
		$(this).removeClass('focused');
	});
	formIsSetUp = true;
}
function docOnKeyDown(ev) {
	var keyID = null;
	if (navigator.appName == "Microsoft Internet Explorer") {
		keyID = event.keyCode;
	} else {
		keyID = (window.event) ? event.keyCode : ev.keyCode;
	}
	e = (window.event) ? event : ev;
	switch(keyID) {
		case 40: case 38: // down arrow, up arrow
			if ($('#textArticle').is(':visible'))
				return true;
			e.preventDefault();
			return false;
			break;
		case 32: // spacebar
			if ($('#textArticle').is(':visible')) {
				e.preventDefault();
				var $bottom = $("a:contains('Back to Instapaper')").last();
				var $top = $('div.top').first();
				if ($top.sonar(true) && event.shiftKey) {
					if ($('.selected').prev('.tableViewCell').attr('id') == undefined) {
						$('.selected').removeClass('selected');
						$('.tableViewCell:last').addClass('selected');
					} else {
						$('.selected').removeClass('selected').prev('.tableViewCell').addClass('selected');
					}
					replaceStarBox();
					link = $('.selected a.textButton').attr('href');
					ajaxGetLink(link);
				} else if ( !$bottom.sonar(true) ) {
					if (event.shiftKey)
						window.scrollBy(0,-window.innerHeight+20);
					else
						window.scrollBy(0,window.innerHeight-20);
				} else {
					if (event.shiftKey) {
						window.scrollBy(0,-window.innerHeight+20);
					} else {
						if ($('.selected').next('.tableViewCell').attr('id') == undefined) {
							$('.selected').removeClass('selected');
							$('.tableViewCell:first').addClass('selected');
						} else {
							$('.selected').removeClass('selected').next('.tableViewCell').addClass('selected');
						}
						replaceStarBox();
						link = $('.selected a.textButton').attr('href');
						ajaxGetLink(link);
					}
				}
				return true;
			} else {
				e.preventDefault();
				replaceStarBox();
				if (!event.shiftKey) {
					if ($('.selected').next('.tableViewCell').attr('id') == undefined) {
						$('.selected').removeClass('selected');
						$('.tableViewCell:first').addClass('selected');
					} else {
						$('.selected').removeClass('selected').next('.tableViewCell').addClass('selected');
					}
				} else {
					if ($('.selected').prev('.tableViewCell').attr('id') == undefined) {
						$('.selected').removeClass('selected');
						$('.tableViewCell:last').addClass('selected');
					} else {
						$('.selected').removeClass('selected').prev('.tableViewCell').addClass('selected');
					}
				}
				scrollToArticle('selected');
			}
			break;
	}
}
function docOnKeyup(ev) {
	if ($('input[type=text].focused,textarea.focused').attr('name') != undefined)
		return;
	var keyID = null;
	if (navigator.appName == "Microsoft Internet Explorer") {
		keyID = event.keyCode;
	} else {
		keyID = (window.event) ? event.keyCode : ev.keyCode;
	}
	e = (window.event) ? event : ev;
	event = e;
	if (y.indexOf('http://www.instapaper.com/go/')!=-1) {
		switch (keyID) {
			case 27: // escape
				if ($('#newHelpHUD').is(':visible')) {
					hideHelp();
				} else {
					document.location = "http://www.instapaper.com/u";
				}
				break;
			case 85: // u
				document.location = "http://www.instapaper.com/u";
				break;
			case 37: // left arrow
				document.location = hist;
				break;
			case 67: // c
				if (event.ctrlKey && $('#linklist').is(':visible'))
					$('#linklist').fadeOut();
				break;
			case 39: // right arrow
				document.location = skipStr;
				break;
			case 46: // delete
				document.location = delStr;
				break;	
			case 191: // fwd slash
				togglescrolling();
				break;
			case 83: // s
				document.location = starStr;
				break;
			case 79: // o
				window.open($('div.bar.top a:first').attr('href'));
				break;
			case 72: // h
				if ($('#newHelpHUD').is(':visible')) {
					hideHelp();
				} else {
					showHelp();
				}
				break;
		}
	} else {
		switch (keyID) {
			case 27: case 37:// escape, left arrow
				if ($('#newHelpHUD').is(':visible')) {
					hideHelp();
				} else if ($('#folderForm').is(':visible')) {
					hideFolderForm();
					return;
				} else if ($('#linkStyles').is(':visible')) {
					hideLinkStyles();
					return;
				} else if ($('#newFolderList').is(':visible')) {
					if (!$('#newFolderList').hasClass("sendto")) {
						relid = $('#newFolderList').attr('rel');
						hideFolderList();
					
						link = $('.selected a').attr('href');
						$('.selected').removeClass('selected');
						if (relid != undefined) {
							$('#'+relid).addClass('selected');
						}
					} else {
						hideFolderList();
					}
				} else if ($('#textArticle').is(':visible')) {
					hideTextArticle();
				} else {
					document.location = "http://www.instapaper.com/u";
				}
				break;
			// case 37: // left arrow
			// 	document.location = hist;
			// case 39: // right arrow
			// 	if ($('.selected a.textButton').attr('href') != undefined) {
			// 		document.location = $('.selected a.textButton').attr('href');
			// 	} else {
			// 		document.location = $('a.textButton:first').attr('href');
			// 	}
			// 	break;
			case 74: case 40: // j, down arrow
				if ($('#newFolderList.sendto').is(':visible'))
					return;
				if ($('#newFolderList').is(':visible')) {
					if ($('.selected').next('li').attr('id') == undefined) {
						$('.selected').removeClass('selected');
						$('#newFolderList li:first').addClass('selected');
					} else {
						$('.selected').removeClass('selected').next('li').addClass('selected');
					}
				} else {
					if (keyID == 40 && $('#textArticle').is(":visible"))
						return;
					replaceStarBox();
					if ($('.selected').next('.tableViewCell').attr('id') == undefined) {
						$('.selected').removeClass('selected');
						$('.tableViewCell:first').addClass('selected');
					} else {
						$('.selected').removeClass('selected').next('.tableViewCell').addClass('selected');
					}
					if ($('#textArticle').is(":visible")) {
						link = $('.selected a.textButton').attr('href');
						ajaxGetLink(link);
					}
				}
				if (!$('#textArticle').is(":visible"))
					scrollToArticle('selected');
				break;
			case 75: case 38: // k, up arrow
				if ($('#newFolderList.sendto').is(':visible'))
					return;
				if ($('#newFolderList').is(':visible')) {
					if ($('.selected').prev('li').attr('id') == undefined) {
						$('.selected').removeClass('selected');
						$('#newFolderList li:last').addClass('selected');
					} else {
						$('.selected').removeClass('selected').prev('li').addClass('selected');
					}
				} else {
					if (keyID == 38 && $('#textArticle').is(":visible"))
						return;
					replaceStarBox();
					if ($('.selected').prev('.tableViewCell').attr('id') == undefined) {
						$('.selected').removeClass('selected');
						$('.tableViewCell:last').addClass('selected');
					} else {
						$('.selected').removeClass('selected').prev('.tableViewCell').addClass('selected');
					}
					if ($('#textArticle').is(":visible")) {
						link = $('.selected a.textButton').attr('href');
						ajaxGetLink(link);
					}
				}
				if (!$('#textArticle').is(":visible"))
					scrollToArticle('selected');
				break;
			case 76: // l
			    break;
				if (event.shiftKey && !$('#textArticle').is(':visible')) {
					chooseLinkStyle();
				}
				break;
			case 79: case 13: case 39:// o, enter, right arrow
				scrollToTop();
				if ($('#newFolderList').is(':visible')) {
					link = $('.selected a').attr('href');
					if (link.indexOf('com/move/')!=-1) {
						hideFolderList();
						artID = link.split("/")[4];
						$.get(link,function(data){
							removeCell(artID);
							if ($('#textArticle').is(':visible')) {
								link = $('.selected a.textButton').attr('href');
								ajaxGetLink(link);
							}
						});
					} else {
						document.location = link;
					}
				} else if (event.shiftKey && $('.selected a.tableViewCellTitleLink').attr('href') != undefined) {
						link = $('.selected a.tableViewCellTitleLink').attr('href');
						window.open(link);
				} else {
					if ($('#textArticle').is(':visible')) {
						hideTextArticle();
						window.open($('.selected .tableViewCellTitleLink').attr('href'));
					} else if ($('.selected a.textButton').attr('href') != undefined) {
						link = $('.selected a.textButton').attr('href');
						ajaxGetLink(link);
					} else if ($('.selected a.restoreButton').attr('href') != undefined) {
						link = $('.selected a.restoreButton').attr('href');
						artID = link.split('/')[2];
						$.get(link,function(data){
							removeCell(artID);
						});
						// document.location = $('.selected a.restoreButton').attr('href');
					}	
				}
				break;
			case 65: // a
				if (event.shiftKey) {
					if ($('.selected a:first').attr('href') != undefined) {
						artID = $('.selected .likeBox a:first').attr('href').split("/")[2];
						$.get('/skip/'+artID,function(data){
							removeCell(artID);
							if ($('#textArticle').is(':visible')) {
								link = $('.selected a.textButton').attr('href');
								ajaxGetLink(link);
							}
						});
					}
				} else {
					document.location = "http://instapaper.com/archive";
				}
				break;
			case 83: // s
				if (event.shiftKey) {
					toggleStar();
				} else {
					document.location = "http://instapaper.com/starred";
				}
				break;
			case 66: // b
				document.location = "http://instapaper.com/browse";
				break;
			case 85: // u
				if ($('#textArticle').is(":visible")) {
					hideTextArticle();
				} else {
					document.location = "http://instapaper.com/u";
				}
				break;
			case 78: // n
				// window.open("http://instapaper.com/edit");
				if (event.shiftKey)
					addFolder();
				else	
					location.href = "http://instapaper.com/edit";
				// ajaxGetLink("/edit");
				// this doesn't work well because I can't determine whether a text field is focused in order to stop trapping keys
				break;
			case 71: // g
				if ($('#newFolderList.goto').is(':visible')) {
					relid = $('#newFolderList').attr('rel');
					hideFolderList();
					if (relid != undefined && relid != 'none')
						$('#'+relid).addClass('selected');
				} else 	if ($('#newFolderList.moveto').is(':visible') || $('#newFolderList.sendto').is(':visible')) {
					return;
				} else {
					if ($('#newHelpHUD').is(':visible'))
						hideHelp();
					html = '';
					idcounter = 1;
					$('#categoryHeader a').each(function(){
						html += '<li id="'+idcounter+'"><a href="'+this.href+'">'+$(this).text()+'</a></li>';
						idcounter++;
					});
					$('#folders a').not(":contains('Add folder')").not(":contains('Edit folders')").each(function(){
						html += '<li id="'+idcounter+'"><a href="'+this.href+'">'+$(this).text()+'</a></li>';
						idcounter++;
					});
					newFolderList = $('#folderList').clone().attr('id','newFolderList').addClass('goto');
					if ($('.selected').attr('id') == undefined) {
						tid = $('.tableViewCell:first').attr('id');
						if (tid != undefined && tid != 'tableViewCell0')
							newFolderList.appendTo($('.tableViewCell:first')).attr('rel',$('.tableViewCell:first').attr('id'));
						else
							newFolderList.appendTo($('#bookmark_list')).attr('rel','none');
					} else {
						newFolderList.appendTo($('.selected')).attr('rel',$('.selected').attr('id'));
					}
					$('.selected').removeClass('selected');
					newFolderList.html('<h2>Go to folder:</h2><p id="filter"></p><ul>'+html+'</ul><p>Type to filter, arrows to select, Enter to open</p>').fadeIn('fast').find('li:first').addClass('selected');
					scrollToHUD();
				}
				break;
			case 77: // m
				if (y.indexOf('instapaper.com/starred')!=-1 || $('#newFolderList.sendto').is(':visible') || $('#newFolderList.goto').is(':visible'))
					return;
				if ($('#newFolderList.moveto').is(':visible')) {
					relid = $('#newFolderList').attr('rel');
					hideFolderList();
					link = $('.selected a').attr('href');
					$('.selected').removeClass('selected');
					if (relid != undefined) {
						$('#'+relid).addClass('selected');
					} else if (link.indexOf('com/move/')!=-1) {
						hideFolderList();
						artID = link.split("/")[4];
						$('#tableViewCell'+artID).addClass('selected');
					} else {
						document.location = link;
					}
				} else {
					if ($('.selected .textButton').attr('href') != undefined) {
						if ($('#newHelpHUD').is(':visible'))
							hideHelp();
						html = '';
						idcounter = 1;
						$('.selected .deleteLink').next('div').find('a.moveTo').each(function(){
							html += '<li id="folder-'+idcounter+'"><a href="'+this.href+'">'+$(this).text()+'</a></li>';
							idcounter++;
						});
						newFolderList = $('#folderList').clone().attr('id','newFolderList').addClass('moveto');
						if ($('.selected').attr('id') == undefined) {
							tid = $('.tableViewCell:first').attr('id');
							if (tid != undefined && tid != 'tableViewCell0')
								newFolderList.appendTo($('.tableViewCell:first')).attr('rel',$('.tableViewCell:first').attr('id'));
							else
								newFolderList.appendTo($('#bookmark_list')).attr('rel','none');
						} else {
							newFolderList.appendTo($('.selected')).attr('rel',$('.selected').attr('id'));
						}
						$('.selected').removeClass('selected');
						newFolderList.html('<h2>Move to folder:</h2><p id="filter"></p><ul>'+html+'</ul><p>Type to filter, arrows to select, Enter to open</p>').fadeIn('fast').find('li:first').addClass('selected');
						scrollToHUD();
					}
				}
				break;
			// case 38: // up arrow
			// 					if ($('#folderList').is(':visible')) {
			// 						e.preventDefault();
			// 						folderLinks = $('#folderList li');
			// 						if (folderIndex > 0) {
			// 							$('.selected').removeClass('selected');
			// 							folderIndex--;
			// 							$(folderLinks[folderIndex]).addClass('selected');
			// 						}
			// 					}
			// 					break;
			// 				case 40: // down arrow
			// 					if ($('#folderList').is(':visible')) {
			// 						e.preventDefault();
			// 						folderLinks = $('#folderList li');
			// 						if (folderIndex + 1 < folderLinks.length) {
			// 							folderIndex++;
			// 							$('.selected').removeClass('selected');
			// 							$(folderLinks[folderIndex]).addClass('selected');
			// 						}
			// 					}
			// 					break;
			case 46: case 8: // delete
				if ($('.selected a:first').attr('href') != undefined) {
					if ($('.selected a:first').attr('href') != undefined) {
						artID = $('.selected .likeBox a:first').attr('href').split("/")[2];
						$.get('/delete/'+artID,function(data){
							removeCell(artID);
							if ($('#textArticle').is(':visible')) {
								link = $('.selected a.textButton').attr('href');
								ajaxGetLink(link);
							}
						});
					}
				}
				break;	
			case 69: // e
				if ($('#newFolderList.sendto').is(':visible')) {
					if (event.altKey && event.shiftKey) {
						clipToEvernoteLocal();
					} else if (event.shiftKey) {
						clipToEvernote();
					} else {
						sendLinkAsEmail();
					}
				} else if (event.shiftKey) {
					document.location = $('div.selected div.secondaryControls a.actionLink[title=Edit]').attr('href');
					// ajaxGetLink($('div.selected div.secondaryControls a.actionLink[title=Edit]').attr('href'));
				}
				break;
			case 72: // h
				if ($('#newHelpHUD').is(':visible')) {
					hideHelp();
				} else {
					showHelp();
				}
				break;
			case 190: // .
				if ($('#textArticle').is(":visible")) {
					if ($('.highlight').attr('tagName') == undefined) {
						textItemsCounter = 0;
						// textItems = $('#story p,#story h1,#story h2,#story h3,#story h4,#story h5,#story h6,#story ul,#story ol,#story pre');
						$(textItems[textItemsCounter]).attr('id','textItem'+textItemsCounter).addClass('highlight');
						// textItemsCounter++;
						scrollToArticle('highlight');
					} else {
						// newAnchor = document.createElement('a');
						// newAnchor.id = "textItem"+textItemsCounter;
						// $('.highlight').removeClass('highlight').append(newAnchor);
						if (textItemsCounter < textItems.length)
							textItemsCounter++;
						else
							textItemsCounter == 0;
						$('.highlight').removeClass('highlight');
						$(textItems[textItemsCounter]).attr('id','textItem'+textItemsCounter).addClass('highlight');

						scrollToArticle('highlight');
					}
				}
				break;
			case 188: // ,
				if ($('#textArticle').is(":visible")) {
					if ($('.highlight').attr('tagName') == undefined) {
						textItemsCounter = 0;
						// textItems = $('#story p,#story h1,#story h2,#story h3,#story h4,#story h5,#story h6,#story ul,#story ol,#story pre');
						$(textItems[textItemsCounter]).attr('id','textItem'+textItemsCounter).addClass('highlight');
						textItemsCounter = textItems.length - 1;
						scrollToArticle('highlight');
					} else {
						if (textItemsCounter > 0)
							textItemsCounter--;
						else
							textItemsCounter = textItems.length - 1;

						$('.highlight').removeClass('highlight');
						$(textItems[textItemsCounter]).attr('id','textItem'+textItemsCounter).addClass('highlight');
						scrollToArticle('highlight');
					}
				}
				break;
			case 191: // fwd slash
				togglescrolling();
				break;
			case 220: // back slash
				toggleSidebar();
			case 73: // i
				scrollToTop();
				break;
			case 32: // spacebar
				// var $bottom = $("div.bottom:last");
				break;
			case 68: // d
				if ($('#newFolderList.sendto').is(':visible')) {
					if (event.shiftKey)
						openInDelibar();
					else
						saveToDelicious();
				}
				break;
			case 80: // p
				if ($('#newFolderList.sendto').is(':visible'))
					if (event.shiftKey)
						openInPukka();
					else
						saveToPinboard();
				break;
			case 84: // t
				if ($('#newFolderList.sendto').is(':visible')) {
					hideFolderList();
				} else if ($('#newFolderList.moveto').is(':visible') || $('#newFolderList.goto').is(':visible')) {
					return;
				} else {
					if ($('#newHelpHUD').is(':visible'))
						hideHelp();
					newFolderList = $('#folderList').clone().attr('id','newFolderList').addClass('sendto');
					if ($('.selected').attr('id') == undefined) {
						return;
					} else {
						desc = '';
						if ($('.highlight').is(':visible')) {
							desc=$('.highlight').text().replace(/\n+/g,' ');
							deschtml=$('.highlight').html();
						} else if ($('div.selected div.titleRow div.summary').text().length > 0) {
							desc=$.trim($('div.selected div.titleRow div.summary').text());
							deschtml=$('div.selected div.titleRow div.summary').html();
						}
						if (String(document.getSelection()).length > 0) {
							desc=String(document.getSelection());
							deschtml=document.getSelection();
						}

						if ($('.highlight').is(':visible')) {
							newFolderList.appendTo($('.highlight:first'));
						} else {
							newFolderList.appendTo($('.selected'));
						}
					}
					html = '<li><strong>e</strong>: <a href="javascript:void()" onclick="sendLinkAsEmail()" class="notarget">Send as email</a></li>' +
					'<li><strong>E</strong>: <a href="javascript:void()" onclick="clipToEvernote()" class="notarget">Save to Evernote</a></li>' +
					'<li><strong>&#x2325;E</strong>: <a href="javascript:void()" onclick="clipToEvernote()" class="notarget">Save to Evernote</a><a href="http://brettterpstra.com/share/localhelper" title="Get the helper application" style="text-decoration:underline;">w/local helper</a></li>' +
					'<li><strong>d</strong>: <a href="javascript:void()"  onclick="saveToDelicious()" class="notarget">Save to Delicious</a></li>' +
					'<li><strong>D</strong>: <a href="javascript:void()"  onclick="openInDelibar()" class="notarget">Open in Delibar</a></li>' +
					'<li><strong>p</strong>: <a href="javascript:void()" onclick="saveToPinboard()" class="notarget">Save to Pinboard</a></li>' +
					'<li><strong>P</strong>: <a href="javascript:void()" onclick="openInPukka()" class="notarget">Open in Pukka</a></li>';
					newFolderList.html('<h2>Send to:</h2><ul>'+html+'</ul><p>Enter a key or click the text</p>').fadeIn();
					scrollToHUD();
				}
				
				break;
		}
	}
}

function toggleStar() {
	if ($('.selected .likeBox a:first').attr('href') != undefined) {
		artID = $('.selected .likeBox a:first').attr('href').split("/")[2];
	
		$('#starButton'+artID).hide();
		$('#unstarButton'+artID).hide();
		$('#tempStar').remove();
	
		$('#starProgress'+artID).show();
		$.get('/star_toggle/'+artID+'?ajax=1',function(data){
			eval(data);
			var newStar = $('.selected .likeBox').clone().css({
				position:'fixed',
				top:'0',
				left:'50%',
				marginLeft:'-'+(TextStyles._width/2+(TextStyles._width/12)-5)+'px',
				top:'50px',
				zIndex:'92000',
				width:'30px',
				textAlign:'center'
			}).attr('id','tempStar').click(function(e){e.preventDefault();toggleStar();}).appendTo('#textArticle');
			newStar.children('img').css({
				margin:'0 auto',
				left:'0'
			});
		});
	}
}
function scrollCheck() {
  var min = 0; // top
  var max = document.body.scrollHeight - document.body.clientHeight; // bottom
  var curr = document.body.scrollTop;
  if (curr == min) {alert("at top");}
  if (curr == max) {alert("at bottom");}
}
function hideTextArticle() {
	replaceStarBox();
	$('#textArticle').fadeOut('slow',function(){
		$('#textMask').fadeOut('slow');
		$('.selected .likeBox').show();
		scrollToArticle('selected');
	});
}
function hideSendToList() {
	if ($('#newFolderList.sendto').is(':visible')) {
		hideFolderList();
	}
}
function removeCell(artID) {
	thisCell = $('#tableViewCell'+artID);
	if (thisCell.hasClass('tableViewCellLast')) {
		thisCell.removeClass('selected').fadeOut('slow').prev().addClass('selected tableViewCellLast').append($('#folderList'));
	} else if (thisCell.hasClass('tableViewCellFirst')) {
		thisCell.removeClass('selected').fadeOut('slow').next().addClass('selected tableViewCellFirst').append($('#folderList'));
	} else {
		thisCell.removeClass('selected').fadeOut('slow').next().addClass('selected').append($('#folderList'));
	}
	thisCell.remove();
}
function hideFolderList() {
    bindEvent(document, "keyup", docOnKeyup);
	$('#newFolderList').fadeOut('slow',function(){
		$(this).remove();
	});
}
function showHelp() {
	// show a HUD with shortcut keys for current page
	hud = $('#helpHUD').clone().appendTo($('body')).attr('id','newHelpHUD');
	help = "<ul>";

	if ($('#newFolderList').is(':visible')) { currScope = 'dialog'; }
	else {
		if (y.indexOf('instapaper.com/u')!=-1)
			currScope = /1/;
		if (y.indexOf('instapaper.com/starred')!=-1)
			currScope = /2/;
		if (y.indexOf('instapaper.com/archive')!=-1)
			currScope = /3/;
		if ($('#textArticle').is(':visible'))
			currScope = /4/;
	}
	var sortedHelp = helpArray.sort(sortHelp); 
	for (var i=0;i<sortedHelp.length;i++) {
		if (currScope.test(sortedHelp[i][2]) || (currScope != 'dialog' && sortedHelp[i][2] == '0'))
			help += "<li><strong>"+sortedHelp[i][0]+"</strong>: "+sortedHelp[i][1]+"</li>";
	}
	help += "</ul>";
	hud.html(help);
	hud.css('zIndex','9999999').slideDown().click(function(){
		hud.slideUp('fast',function(){ $(this).remove(); });
	});
}
function sortHelp(a, b){
 if (a[0] < b[0]) //sort string ascending
  return -1;
 if (a[0] > b[0])
  return 1;
 return 0;
}
function hideHelp() {
	$('#newHelpHUD').slideUp('fast',function() {
		$(this).remove();
	});
}
function scrollToArticle(sel) {
	switch (sel) {
		case 'selected':
			if( !$('.selected:first').sonar(true) ) {
			    $.scrollTo('#'+$('.selected:first').attr('id'),{duration:200,axis:'y',offset:{left:0,top:-20}});
			}
			break;
		case 'highlight':
			if( !$('.highlight:first').sonar(true) ) {
			    $.scrollTo('#'+$('.highlight:first').attr('id'),{duration:200,axis:'y',offset:{left:0,top:-20}});
			}
			break;
	}
}
function scrollToHUD() {
	if (!$('#newFolderList').hasClass('sendto'))
        bindEvent(document, "keyup", hudOnKeyUp);
	if( !$('#newFolderList').sonar(true) && $('#newFolderList').is(':visible') ) {
	    location.href = '#newFolderList';
	}
}
function scrollToTop() {
	$('body').animate({scrollTop: 0}, 10);
}
function autoArchive() {
	if ($('#user_auto_mark_as_read').is(':checked')) {
		artID = $('.selected .likeBox a:first').attr('href').split("/")[2];
		removeCell(artID);
	}
}
function ajaxGetLink(link) {
	window.clearInterval(aktiv);
	$('#textMask').css({zIndex:'9000'}).fadeIn('slow');
	$('#brettLoader').css({zIndex:'95000',position:'fixed',top:'30%',left:'50%',marginLeft:"-75px"}).fadeIn('slow');

	$('#textArticle').fadeOut('fast',function(){
		$.get(link,function(data){
			if (greyStyled) {
				$('body').css('width','100%');
			} else {
				$('body').css('width','750px');
			}
			
			$('#textArticle').html(data);
			var newStar = $('.selected .likeBox').clone().css({
				position:'fixed',
				top:'0',
				left:'50%',
				marginLeft:'-290px',
				top:'50px',
				zIndex:'92000',
				width:'30px',
				textAlign:'center'
			}).attr('id','tempStar').click(function(e){e.preventDefault();toggleStar();}).appendTo('#textArticle');
			newStar.children('img').css({
				margin:'0 auto',
				left:'0'
			});
			$('#textArticle').fadeIn('fast',function(){
				scrollToTop();
				autoArchive();
				$('#brettLoader').fadeOut('fast');
			});
			$('.bar.top a').attr('target','_blank');
			TextStyles.setup();
			var idcount = 0;
			$('#text_controls a').each(function(){
				idcount++;
				$(this).attr('onclick','').attr('id','textButton'+idcount);
			});
			$('#text_controls a').live('click',function(e){
				e.preventDefault();
				var linktxt = $(this).text();
				var linkid = $(this).attr('id')
				if (/^[GTHV]$/.test(linktxt)) {
					TextStyles._fontFamily = linktxt;
					TextStyles.saveFont();
				} else if (linkid == "textButton2") {
					TextStyles._fontSize--; 
					TextStyles.saveFont();
				} else if (linktxt == "+") {
					TextStyles._fontSize++; 
					TextStyles.saveFont();
				} else if (linkid == 'textButton1') {
					$('#text_controls_toggle').hide();
					$('#text_controls').fadeOut('fast',function(){
						$('#editing_controls').fadeIn();
					});
				} else if (linktxt == 'defaults') {
					TextStyles.loadDefaults();
					TextStyles.saveFont();
				} else if (linkid == 'textButton4') {
					TextStyles._lineHeight -= 0.1; 
					TextStyles.saveFont();
				} else if (linkid == 'textButton5') {
					TextStyles._lineHeight += 0.1;
					TextStyles.saveFont();
				} else if (linkid == 'textButton6') {
					TextStyles._width -= 20;
					TextStyles.saveFont();
				} else if (linkid == 'textButton7') {
					TextStyles._width += 20;
					TextStyles.saveFont();
				} 

				return false;
			});
			textItems = $("#story *").filter(function() {
			     var $this = $(this);
			     return $this.children('p,div').length == 0 && $.trim($this.text()).length > 0 && this.tagName in oc(validElements);
			});
			textItems.click(function(){
				$('.highlight').removeClass('highlight');
				$(this).addClass('highlight');
				textItemsCounter = $(this).attr('id').replace(/textItem/,'');
			});
		});
	});
}
// TODO zootool?

function clipToEvernote() 
{
	hideSendToList();
	titleLink = $('.selected .tableViewCellTitleLink');
	title = titleLink.text();
	url = titleLink.attr('href').replace(/[&\?]utm_source.*/,'');
	linkString = 'http://www.evernote.com/clip.action?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
	window.open(linkString);		
}
function clipToEvernoteLocal() { // TODO Fix the passing of html to the urlhandler, something's breaking in encoding and stripping line feeds and decoding improperly
	hideSendToList();
	titleLink = $('.selected .tableViewCellTitleLink');
	title = titleLink.text();
	url = titleLink.attr('href').replace(/[&\?]utm_source.*/,'');
	try {
		if (desc == "") {
			linkString = 'evernoteadd:com.brettterpstra.EvernoteHandler?page='+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
		} else {
			linkString = 'evernoteadd:com.brettterpstra.EvernoteHandler?html='+encodeURIComponent(deschtml)+'&source='+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
		}
		location.href = linkString;
	} catch(e) {
		linkString = 'http://www.evernote.com/clip.action?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title);
		window.open(linkString);		
	}
}
function saveToDelicious() {
	hideSendToList();
	titleLink = $('.selected .tableViewCellTitleLink');
	title = titleLink.text();
	url = titleLink.attr('href').replace(/[&\?]utm_source.*/,'');
	linkString = 'http://delicious.com/save?url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+'&notes='+encodeURIComponent(desc)+'&v=5&jump=yes';
	window.open(linkString);	
}
function openInDelibar() {
	hideSendToList();
	titleLink = $('.selected .tableViewCellTitleLink');
	title = titleLink.text();
	url = titleLink.attr('href').replace(/[&\?]utm_source.*/,'');
	linkString = 'Delibar://bpost'+'&!p!&'+url+'&!p!&'+encodeURIComponent(title)+'&!p!&'+encodeURIComponent(desc);
	document.location = linkString;	
}
function saveToPinboard() {
	hideSendToList();
	titleLink = $('.selected .tableViewCellTitleLink');
	title = titleLink.text();
	url = titleLink.attr('href').replace(/[&\?]utm_source.*/,'');
	linkString = 'http://pinboard.in/add?url='+encodeURIComponent(url)+'&description='+encodeURIComponent(desc)+'&title='+encodeURIComponent(title);
	window.open(linkString);	
}
function openInPukka() {
	hideSendToList();
	titleLink = $('.selected .tableViewCellTitleLink');
	title = titleLink.text();
	url = titleLink.attr('href').replace(/[&\?]utm_source.*/,'');
	linkString = 'pukka:url='+encodeURIComponent(url)+'&title='+encodeURIComponent(title)+'&extended='+encodeURIComponent(desc);
	document.location = linkString;	
}
function sendLinkAsEmail() {
	hideSendToList();
	titleLink = $('.selected .tableViewCellTitleLink');
	title = titleLink.text();
	url = titleLink.attr('href').replace(/[&\?]utm_source.*/,'');
	body="I thought you might find this of interest: \n\n"+title+"\n"+url;
	if (desc != '')
		body = body + "\n\n\"" + desc + "\"";
	linkString = 'mailto:?subject='+encodeURIComponent("FWD: "+title)+'&body='+encodeURIComponent(body);
	location.href = linkString;
}
function quickMessage(string) {
	string = string ? string : "";
	newHUD = $('#newHelpHUD').clone().appendTo($('body:first'));
	newHUD.html("<p>"+string+"</p>").slideDown('fast',function(){
		setInterval(function(){newHUD.slideUp('fast',function(){newHUD.remove();});},1500);
	});
}

var goscrolling = 60;
var lastoffset = window.pageYOffset;
var aktiv;
var scrollbottom;
function scroll() {
	window.scrollBy(0,1);
	
	if ( scrollbottom.sonar(true) ) {
	  $('#scrollMeter').remove();
		window.clearInterval(aktiv);
	}
}
function togglescrolling() {
	document.getElementsByTagName('body')[0].focus();
	scrollbottom = $("div.bottom:last");
	$('#scrollMeter').remove();
	if (scrollbottom.sonar(true)) {
	  window.clearInterval(aktiv);
	  return;
	}
	if (goscrolling > 0) {
	  window.clearInterval(aktiv);
	  aktiv = window.setInterval(scroll,goscrolling);
	  setScrollMeter(goscrolling);
	  goscrolling-=20;
	} else {
	  goscrolling = 60;
	  window.clearInterval(aktiv);
	}
}

function setScrollMeter(rate) {
  var scrollMeter = $('<div></div>',{id:'scrollMeter'}).appendTo('body');
  switch(rate) {
    case 60:
      scrollMeter.addClass('meter1');
      break;
    case 40:
      scrollMeter.addClass('meter2');
      break;
    case 20:
      scrollMeter.addClass('meter3');
      break;
    default:
      break;
  }
}

function addFolder() {
	if ($('#folderForm').is(':visible')) {
		hideFolderForm();
		return;
	} else if ($('#textArticle').is(':visible')) {
		return;
	}
	$('<div>',{id:'folderForm'}).appendTo($('#folders')).css({
		color:'white',
		backgroundColor:'#333',
		position:'fixed',
		left:'50%',
		top:'200px',
		marginLeft:'-150px',
		padding:'10px 20px 10px',
		WebkitBorderRadius:'10px',
		WebkitBoxShadow:'7px 7px 15px #333',
		zIndex:'9999999',
		opacity:'.9'
	});
	
	$('#folderForm').load('http://www.instapaper.com/edit_folder form',function(d){
		$('#folder_title').focus();
		$(this).keydown(function(event) {
			if (event.keyCode == '27') {
				event.preventDefault();
				hideFolderForm();
				return false;
			} 
		});
	});
}
function hideFolderForm() {
	$('#folderForm').fadeOut('fast',function(){
		$(this).remove();
	});
}
function toggleSidebar() {
	if ($('#right_column').is(':visible')) {
		$('#right_column,#bookmarkListDeckAd').fadeOut('fast',function(){
			$('#left_column').css({cssFloat:'none',margin:'0 auto'});
		});
		$('<div>',{id:'monster'}).insertBefore($('#bookmark_list')).css({ 	position:'fixed',
																			top:'0',left:'0',
																			right:'0',bottom:'0',
																			backgroundColor:'rgb(242, 242, 242)'
																			});
	} else {
		$('#left_column').css({cssFloat:'left',margin:'0'});
		$('#right_column,#bookmarkListDeckAd').fadeIn();
		$('#monster').remove();
	}
}
function replaceStarBox() {
	$('#tempStar').remove();
	// $('.selected .starBox').css({position:'relative',cssFloat:'left',top:'auto',left:'auto',zIndex:'0',width:'26px',backgroundColor:'transparent',marginLeft:'0'});
	// $('.selected .starBox img').css({margin:'0',left:'22px'});
	// $('.selected .starBox').css('height','30px');
}
function oc(a) // http://snook.ca/archives/javascript/testing_for_a_v
{
  var o = {};
  for(var i=0;i<a.length;i++)
  {
    o[a[i]]='';
  }
  return o;
}

function linkList(format) {
	hideLinkStyles();
    bindEvent(document, "keyup", docOnKeyup);
	var linklist = '';
	switch (format) {
		case 'markdownlist':
			$('#bookmark_list .titleRow a').each(function(){
				linklist += '* ['+$(this).text()+']('+$(this).attr('href')+')'+"\n";
			});
			break;
		case 'markdownref':
			$('#bookmark_list .titleRow a').each(function(){
				linklist += '['+$(this).text()+']: '+$(this).attr('href')+"\n";
			});
			break;
		case 'html':
			$('#bookmark_list .titleRow a').each(function(){
				linklist += '<a href="'+$(this).attr('href')+'">'+$(this).text()+'</a>'+"\n";
			});
			break;
		case 'text':
			$('#bookmark_list .titleRow a').each(function(){
				linklist += $(this).text()+"\n\t"+$(this).attr('href')+"\n";
			});
			break;
		default:
			$('#bookmark_list .titleRow a').each(function(){
				linklist += $(this).attr('href')+"\n";
			});
			break;
	}
	$('<div></div>',{id:'linklistHolder',display:'none'}).appendTo('body').css({
		zIndex:'90009111',
		padding:'10px',
		backgroundColor:'#fff',
		position:'fixed',
		width:'510px',
		top:'50px',
		left:'50%',
		marginLeft:'-250px',
		WebkitBorderRadius:'10px',
		WebkitBoxShadow:'7px 7px 15px #333'
	}).append($('<h3></h3>').html('Press &#x2318;-C to copy').css('margin','5px')).append($('<textarea></textarea>',{id:'linklist'}).appendTo('#linklistHolder').css({
		fontSize:'12px',
		width:'500px',
		height:'400px'
	})).append($('<a>Close</a>').attr('href','javascript:void()').css({backgroundColor:'#fff',padding:'10px',styleFloat:'right'}).click(function(){
		closeLinkList();
	}));
	
	$('#linklist').text(linklist).focus().select().keydown(function(event){
		if ((event.metaKey && event.keyCode == 67) || event.keyCode == 27) {
			$('#linklistHolder').fadeOut('fast',function(){
				$(this).remove();
			});
			hideLinkStyles();
		}
	});
	$('#linklistHolder').fadeIn();
	
}
function closeLinkList() {
	$('#linklistHolder').fadeOut('fast',function(){$(this).remove();});
}
function chooseLinkStyle() {
	if ($('#linkStyles').is(':visible')) {
		hideLinkStyles();
		return;
	} else if ($('#textArticle').is(':visible')) {
		return;
	}
	$('<div>',{id:'linkStyles'}).appendTo($('body')).css({
		color:'white',
		backgroundColor:'#333',
		position:'fixed',
		left:'50%',
		top:'200px',
		marginLeft:'-150px',
		padding:'10px 20px 10px',
		WebkitBorderRadius:'10px',
		WebkitBoxShadow:'7px 7px 15px #333',
		zIndex:'9999999',
		opacity:'.9'
	});
	html = '<li><strong>1</strong>: <a href="javascript:void()" id="markdownlist" class="notarget">Markdown list</a></li>' +
	'<li><strong>2</strong>: <a href="javascript:void()" id="markdownref" class="notarget">Markdown references</a></li>' +
	'<li><strong>3</strong>: <a href="javascript:void()"  id="html" class="notarget">HTML links</a></li>' +
	'<li><strong>4</strong>: <a href="javascript:void()"  id="text" class="notarget">Plain text</a></li>' +
	'<li><strong>5</strong>: <a href="javascript:void()"  id="plaintext" class="notarget">Plain text, no titles</a></li>';
	$('#linkStyles').html('<h2>Select a link style:</h2><ul style="list-style:none">'+html+'</ul><p>Enter a key or click the text</p>').fadeIn();
	$('#linkStyles a').click(function(){
		linkList(this.id);
	});
    bindEvent(document, "keyup", function(){
		if (navigator.appName == "Microsoft Internet Explorer") {
			keyID = event.keyCode;
		} else {
			keyID = (window.event) ? event.keyCode : ev.keyCode;
		}
		e = (window.event) ? event : ev;
		var k = String.fromCharCode(keyID),item;
		switch (k) {
			case '1':
				linkList('markdownlist');
				break;
			case '2':
				linkList('markdownref');
				break;
			case '3':
				linkList('html');
				break;
			case '4':
				linkList('text');
				break;
			case '5':
				linkList('plaintext');
				break;
		}
	});
}
function hideLinkStyles() {
	$('#linkStyles').fadeOut('fast',function(){
		$(this).remove();
	});
}
/**
*
*  URL encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Url = {
	// public method for url encoding
	encode : function (string) {
		return escape(this._utf8_encode(string));
	},
	// public method for url decoding
	decode : function (string) {
		return this._utf8_decode(unescape(string));
	},
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
};

// array containing help information (key[s], description, scope*)
// *scopes: 
// 0 = everywhere except dialog
// 1 = in unread view
// 2 = in starred  view
// 3 = in archive view
// 4 = in text view
// 5 = when dialog is open
var helpArray = new Array(	['g','Go to folder','1234'], 
						['&larr; or escape','Return to list','4'],
						['&larr; or escape','Return to unread','23'],
						['&larr; or escape','Dismiss dialog','5'],
						['b','Browse','0'],
						['u','Go to Unread','0'],
						['s','Go to Starred','0'],
						['a','Go to Archive','0'],
						['o or &rarr;','Open selected article','12'],
						['o or &rarr;','Open original article in new tab or window','4'],
						['o','Mark the selected article as Unread','3'],
						['O','Open original article in new tab/window','1'],
						['E','Edit bookmark','0'],
						['m','Move selected article to folder','124'],
						['&rarr; or o','Select location or folder','5'],
						['A','Archive selected article','124'],
						['S','Star or unstar selected article','0'],
						['Delete','Permanently delete current article','0'],
						['n','New (add) article, opens in new window/tab','1'],
						['N','New Folder','1'],
						['t','Send To (Delicious, Evernote, etc.)','14'],
						//['L','Copy a list of links from this folder','123'],
						['/','Toggle autoscroll','4'],
						['.','Navigate forward (down) in highlighted reading mode','4'],
						[',','Navigate back (up) in highlighted reading mode','4'],
						['i','Scroll to top of page','0'],
						['h','Display help screen','50'],
						['Escape','Close (cancel) the dialog','5'],
						['Escape','Return to list view','4'],
						['Escape','Go to Unread','23'],
						['j','Go to the next article in the list','0'],
						['j','Next item in the menu','5'],
						['k','Go to the previous article in the list','0'],
						['k','Previous item in the menu','5'],
						['\\','Concentrate','123']);
