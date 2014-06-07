// ==UserScript==
// @name          2chBrowserize
// @namespace     http://polygonpla.net/
// @description   Creates thumbnail images list from 2ch thread URLs for quick Tumblr POST
// @include       http://*.2ch.net/*
// @include       http://*.bbspink.com/*
// @include       http://cha2.net/*
// @include       http://*.machi.to/*
// @include       http://*.vip2ch.com/*
// @exclude       http://find.2ch.net/*
// @exclude       http://p2.2ch.net/*
// @exclude       http://p2.chbox.jp/*
// @exclude       http://com-nika.osask.jp/*
// @exclude       http://www.heiwaboke.net/2ch/*
// @exclude       http://localhost:8823/*
// @exclude       http://127.0.0.1:8823/*
// @author        polygon planet
// @version       2.30
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// ==/UserScript==
/**
 * 2ch をブラウザで閲覧する際、レスの正規化と画像をリスト化して
 * Tumblr にポストしやすくするためのスクリプト
 *
 * Based: http://tmkk.hp.infoseek.co.jp/
 * Author: polygon planet <http://twitter.com/polygon_planet>
 */
(function() {
/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};
k.defaults={ axis :'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};
k.window=function(a){return d(window)._scrollable()};
d.fn._scrollable=function(){return this.map(function(){
var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),
['iframe','#document','html','body'])!=-1;if(!i)return a;
var e=(a.contentWindow||a).document||a.ownerDocument||a;
return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};
d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}
if(typeof b=='function')b={ onAfter :b};if(n=='max')n=9e9;
b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;
b.queue=b.queue&&b.axis.length>1;
if(b.queue)j/=2;b.offset=p(b.offset);
b.over=p(b.over);return this._scrollable().each(function(){
var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){
case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){
f=p(f);break}f=d(f,this);case'object':
if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),
function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),
c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);
if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;
g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;
if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{
var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}
if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){
if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);
function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};
k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;
if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();
var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;
return Math.max(l[h],m[h])-Math.min(l[c],m[c])};
function p(a){return typeof a=='object'?a:{ top :a,left:a}}})(jQuery);
})();


(function() {
D();

// 汎用オブジェクト
var Pot = {scriptName: "2chBrowserize"};

$.extend(Pot, {
    inited: false,
    init: function() {
        if (!Pot.inited) {
            $("a[href]:visible").each(function() {
                Pot.thumbLinks.push($(this));
            });
            setTimeout(function() {
                appendThumbnailListButton();
            }, rand(500, 1000));
            Pot.inited = true;
        }
    },
    thumbLinks: [],
    thumbImageURLCache: [],
    thumbImagePushCount: 0,
    
    
    //
    // サムネイル画像の最大サイズ (px)
    //
    THUMB_MAX_HEIGHT: 176, // css max-height
    
    // サムネイル画像を一回に何枚表示するか
    //
    // あまり多いとメモリ食い過ぎるので注意!
    // Firefox4 は表示画像が多すぎると GUI が壊れて最悪クラッシュする
    //
    //  推奨: 5 ～ 10
    //
    // 次の画像を出す前に「すべて消去」ボタンでクリアしておくとメモリは食わない
    //
    THUMB_MAX_IMAGE_LOOPCOUNT: 8,
    
    THUMB_PANEL_ID: toUniqId("thumbnailPanel"),
    THUMB_INIT_BUTTON_ID: toUniqId("thumbnailInitButton")
    
});





/* Configurations */

//TODO: このへん直してないのでどうにかする

/*NGワード登録*/
var NGWord = [];

/*常に人大杉サーバ*/
var serverList = [];
//serverList[0] = "tmp7.2ch.net";

/*AA用フォント*/
var detectAsciiArt = true;
var aaFont = "'MS PGothic',MS-PGothic,'ＭＳ Ｐゴシック',IPAMonaPGothic,Mona";
var aaFontSize = 16;

/*ポップアップ非表示ディレイ(ms)*/
var popupTimeout = 500;

/* Configurations end */

var res = [];
var popupArr = [];

var ttp = /([^h])(ttp(s)?:\/\/[\x21-\x3B\x3D\x3F-\x7E]+)/ig;
var thread = document.URL.replace(/(http.*\/)[^\/]*$/,"$1");

// Add by polygon 画像キャッシュ用
var imageCache = [];

/*
document.body.addEventListener("error", function(evt) {
    if (evt.target.tagName === 'IMG') {
        openImageWithoutReferrer(evt.target);
        evt.target.parentNode.removeChild(evt.target);
        
        
        Pot.thumbImagePushCount = 0;
        
    }
}, true);
*/

document.body.addEventListener("error", function(event) {
    var target;
    target = event && event.target || {};
    if (String(target.tagName).toLowerCase() === "img") {
        setTimeout(function() {
            generateImageWithoutReferrer(target);
        }, 0);
    }
}, true);


/*
window.addEventListener('message', function(evt){
	if(evt.data.indexOf('image_id:') != 0) return;
	var img = document.getElementById('image'+evt.data.substring(9));
	img.addEventListener("mouseover",function(e){showImgPopup(e,null);},false);
}, false);
*/






var ddTags = document.getElementsByTagName('dd');
for (var i=0; i<ddTags.length; i++) {
	if (detectAsciiArt && ddTags[i].innerHTML.match(/(?:　{4}|(?: 　){2}|[─￣＿╂-]{4})/i)) {
		ddTags[i].style.fontFamily = aaFont;
		ddTags[i].style.fontSize = aaFontSize;
		ddTags[i].style.lineHeight = 1; 
	}
	var targetStr = ddTags[i].innerHTML;
	targetStr = ' ' + targetStr;
	// Add by polygon Tumblr Quote用に h をつける
	targetStr = targetStr.replace(ttp, "$1<a href=h$2 target=_blank>h$2</a>");
	targetStr = targetStr.replace(/(ID:[0-9a-zA-Z\+\/\.]+)/g, "<span id=idpop1>$1</span>");
	
	var pattern = /(&gt;|\uFF1E|>)([0-9]{1,4}(?:-[0-9]{1,4})*)/g;
	var newHTML = "";
	var previousIdx = 0;
	while (1) {
		var result = pattern.exec(targetStr);
		if(!result) break;
		if(targetStr.substring(pattern.lastIndex).indexOf("</a>") != 0) {
			newHTML += RegExp.leftContext.substring(previousIdx);
			newHTML += "<a href=" + thread + RegExp.$2 + " target=_blank>" + RegExp.$1 + RegExp.$2 + "</a>";
			previousIdx = pattern.lastIndex;
		}
	}
	if(newHTML.length) {
		newHTML += RegExp.rightContext;
		ddTags[i].innerHTML = newHTML;
	}
	else ddTags[i].innerHTML = targetStr;
	
	for (var j=0; j<ddTags[i].getElementsByTagName('span').length; j++) {
		if(ddTags[i].getElementsByTagName('span')[j].id == "idpop1") {
            with (ddTags[i].getElementsByTagName('span')[j].style) {
                textDecoration = "underline";
                cursor = "pointer";
            }
			ddTags[i].getElementsByTagName('span')[j].id = "idpop1" + i + "_" + j;
			ddTags[i].getElementsByTagName('span')[j].addEventListener("click",function(e){showIDPopup(e,null);},false);
			ddTags[i].getElementsByTagName('span')[j].addEventListener("mouseover",function(e){e.target.style.textDecoration="none";},false);
			ddTags[i].getElementsByTagName('span')[j].addEventListener("mouseout",function(e){e.target.style.textDecoration="underline";},false);
		}
	}
	
	for (var j=0; j<NGWord.length; j++) {
		if (ddTags[i].innerHTML.match(NGWord[j])) {
			var div = document.createElement("div");
			div.style.marginLeft = 40;
			div.style.marginBottom = 30;
			div.style.color = "#a0a0a0";
			div.innerHTML = "あぼーんされたよ";
			div.addEventListener("click", function(e){e.target.style.display = "none"; e.target.nextSibling.style.display = "block";}, false);
			ddTags[i].parentNode.insertBefore(div,ddTags[i]);
			ddTags[i].style.display = "none";
			break;
		}
	}
}

var dtTags = document.getElementsByTagName('dt');
for (var i=0; i<dtTags.length; i++) {
	if(document.location.href.indexOf("read.cgi") != -1) {
		dtTags[i].style.borderTop = "dotted 2px #AABBFF";
		dtTags[i].style.borderLeft = "solid 10px #AABBFF";
		dtTags[i].style.paddingTop = "2px";
		dtTags[i].style.paddingLeft = "2px";
	}
	dtTags[i].innerHTML = dtTags[i].innerHTML.replace(/(ID:[0-9a-zA-Z\+\/\.]+)/g, "<span id=idpop2>$1</span>");
	if(dtTags[i].getElementsByTagName('b').length) {
		dtTags[i].getElementsByTagName('b')[0].innerHTML = dtTags[i].getElementsByTagName('b')[0].innerHTML.replace(/^([ \t]*)([0-9]+)([ \t]*)$/, "<span id=namelink>$1$2$3</span>");
	}
	var aTags = dtTags[i].getElementsByTagName('a');
	for (var j=0; j<aTags.length; j++) {
		if(aTags[j].href.match(/^mailto:(.*)/)) {
			var fontTag = document.createElement("font");
			fontTag.color = "blue";
			fontTag.innerHTML = aTags[j].innerHTML;
			var smallTag = document.createElement("small");
			var mail = decodeURI(RegExp.$1);
			mail = mail.replace("<","&lt;");
			mail = mail.replace(">","&gt;");
			smallTag.innerHTML = " [" + mail + "]";
			aTags[j].parentNode.insertBefore(smallTag,aTags[j].nextSibling);
			aTags[j].parentNode.replaceChild(fontTag,aTags[j]);
			break;
		}
	}
	for (var j=0; j<dtTags[i].getElementsByTagName('span').length; j++) {
		if(dtTags[i].getElementsByTagName('span')[j].id == "idpop2") {
			//dtTags[i].getElementsByTagName('span')[j].style.textDecoration="underline";
            
            with (dtTags[i].getElementsByTagName('span')[j].style) {
                textDecoration = "underline";
                cursor = "pointer";
            }
            
            
			dtTags[i].getElementsByTagName('span')[j].id = "idpop2" + i;
			dtTags[i].getElementsByTagName('span')[j].addEventListener("click",function(e){showIDPopup(e,null);},false);
            dtTags[i].getElementsByTagName('span')[j].addEventListener("mouseover",function(e){e.target.style.textDecoration="none";},false);
            dtTags[i].getElementsByTagName('span')[j].addEventListener("mouseout",function(e){e.target.style.textDecoration="underline";},false);
		}
		else if(dtTags[i].getElementsByTagName('span')[j].id == "namelink") {
			dtTags[i].getElementsByTagName('span')[j].innerHTML.match(/^([ \t]*)([0-9]+)([ \t]*)$/);
			dtTags[i].getElementsByTagName('span')[j].id = "namelink" + i + "_" + RegExp.$2;
			dtTags[i].getElementsByTagName('span')[j].setAttribute('res', RegExp.$2);
			dtTags[i].getElementsByTagName('span')[j].addEventListener("mouseover",function(e){showResPopup(e,null);},false);
		}
	}
}


(function() {

    var fixAllLinks = function(aTags, i) {
        var href = aTags[i].href;
        href = href.replace(/((ime\.nu|(www\d\.|)ime\.st|pinktower\.com|fast\.io)\/|http:\/\/jbbs\.livedoor\.jp\/bbs\/link\.cgi\?url=)/, "");
        for (var j=0; j<serverList.length; j++) {
            if(href.match("^http://" + serverList[j] + "/test/read.cgi/")) {
                href = RegExp.rightContext;
                href = RegExp.lastMatch.replace(/\.cgi\/$/,".html/") + href;
            }
        }
        aTags[i].href = href;
    
        if (href.match(/\.(gif|jpeg|jpg|png)$/i)) {
            var img = document.createElement("img");
            
            $(img).hide();
            
            //img.src = href;
            //img.height = "30";
            //img.style.verticalAlign = "middle";
            //img.addEventListener("mouseover",function(e){showImgPopup(e,null);},false);
            img.id = toUniqId("image") + i;
            //aTags[i].innerHTML = ' ' + aTags[i].innerHTML;
            aTags[i].id = toUniqId('imglink') + i;
            //aTags[i].insertBefore(img,aTags[i].childNodes[0]);
            //setTimeout(function() {
                setImageButtonEvent(aTags[i], img);
            //}, 0);
        }
        else if (aTags[i].innerHTML.match(/^(&gt;(&gt;)?|\uFF1E|>(>)?)([-0-9,]+)/)) {
            var n = RegExp.$4;
            aTags[i].id = "link" + i + "_" + n;
            aTags[i].setAttribute('res', n);
            aTags[i].addEventListener("mouseover",function(e){showResPopup(e,null);},false);
        }
        else if (href.match(/^http:\/\/www\.nicovideo\.jp\/watch\/(.*$)/i)) {
            var nicodiv = document.createElement("div");
            nicodiv.style.width = "318";
            nicodiv.style.border = "solid 1px #CCCCCC";
            var nicoiframe = document.createElement("iframe");
            nicoiframe.src = "http://www.nicovideo.jp/thumb/" + RegExp.$1;
            nicoiframe.width = "100%";
            nicoiframe.height = "200";
            nicoiframe.scrolling = "no";
            nicoiframe.style.border = "0";
            nicoiframe.style.frameborder = "0";
            nicodiv.appendChild(nicoiframe);
            aTags[i].parentNode.replaceChild(nicodiv,aTags[i]);
            i--;
        }
        else if (href.match(/^http:\/\/[a-zA-Z0-9]*\.youtube\.com\/watch\?v=([0-9a-zA-Z\-_]{11})/i)) {
            var ytdiv = document.createElement("div");
            ytdiv.style.width = "406";
            ytdiv.style.border = "solid 1px #CCCCCC";
            ytdiv.style.padding = "5";
            ytdiv.style.background = "#F7F7F7";
            var yttitle = document.createElement("b");
            yttitle.innerHTML = "<small>You<span style=\"color:#FFFFFF; background:#FF0000;\">Tube</div></small>";
            var ytId = RegExp.$1;

            var ytimg0 = $("<img/>")
                .css({
                    display: "block",
                    border: "2px solid #999",
                    maxWidth: 390,
                    margin: 5,
                })
                .attr({
                    src: "http://img.youtube.com/vi/" + ytId + "/0.jpg"
                });
        
        

            var ytimg1 = document.createElement("img");
            //--------------------------------
            //ytimg1.width = 130;
            //ytimg1.height = 97;
            ytimg1.style.maxWidth = 130;
            ytimg1.style.maxHeight = 97;
            //--------------------------------
            ytimg1.style.margin = "2px 5px 5px 5px";
            ytimg1.style.border = "2px solid #999";
            ytimg1.src = "http://img.youtube.com/vi/" + ytId + "/1.jpg";
            var ytimg2 = document.createElement("img");
            //--------------------------------
            //ytimg2.width = 130;
            //ytimg2.height = 97;
            ytimg2.style.maxWidth = 130;
            ytimg2.style.maxHeight = 97;
            //--------------------------------
            ytimg2.style.margin = "2px 5px 5px 2px";
            ytimg2.style.border = "2px solid #999";
            ytimg2.src = "http://img.youtube.com/vi/" + ytId + "/2.jpg";
            var ytimg3 = document.createElement("img");
            //--------------------------------
            //ytimg3.width = 130;
            //ytimg3.height = 97;
            ytimg3.style.maxWidth = 130;
            ytimg3.style.maxHeight = 97;
            //--------------------------------
            ytimg3.style.margin = "2px 5px 5px 2px";
            ytimg3.style.border = "2px solid #999";
            ytimg3.src = "http://img.youtube.com/vi/" + ytId + "/3.jpg";
            var ytlink = aTags[i];
        
            ytdiv.appendChild(yttitle);
            ytdiv.appendChild(document.createElement("br"));
        
            ytdiv.appendChild( $(ytimg0).get(0) );
        
            ytdiv.appendChild(ytimg1);
            ytdiv.appendChild(ytimg2);
            ytdiv.appendChild(ytimg3);
            ytdiv.appendChild(document.createElement("br"));
            aTags[i].parentNode.replaceChild(ytdiv,aTags[i]);
            ytdiv.appendChild(ytlink);
        }
        else if (href.match(/^http:\/\/find\.2ch\.net\/index\.php\?STR=dat:.*$/i)) {
            var datLink = document.createElement("a");
            datLink.innerHTML = "<strong>DATを探す</strong>";
            datLink.href = "http://mirrorhenkan.g.ribbon.to/url.html?u=" + document.URL;
            aTags[i].parentNode.insertBefore(datLink,aTags[i].nextSibling.nextSibling);
            i++;
        }
    };
    
    var i, aTags = document.getElementsByTagName('a');
    
    Deferred.loop(aTags.length, function(i) {
        fixAllLinks(aTags, i);
        
        if (i % 100 === 0) {
            return Deferred.wait(0.25);
        }
    });
    
    /*
    for (i = 0; i < aTags.length; i++) {
        (function(a, c) {
            setTimeout(function() {
                fixAllLinks(a, c);
            }, 10);
        })(aTags, i);
    }
    */
})();

(function() {
    try {
        if (document.getElementsByTagName('title')[0].innerHTML.match("２ちゃんねる error 1503")) {
            document.location = document.location.href.replace(/\.cgi\//,".html/");
        }
    } catch (e) {
        try {
            if (/[2２](?:ch|ちゃんねる|チャンネル)\s*(?:Error|エラー)\s*1503/i.test( document.title)) {
                document.location = document.location.href.replace(/\.cgi\//, ".html/");
            }
        } catch (e) {}
    }
})();


setTimeout(function() { Pot.init(); }, 100);
//setTimeout(function() { appendThumbnailListButton(); }, 2500);


function createPopup() {
	var div = document.createElement('div');
	div.style.position = 'absolute';
	// Add by polygon z-index追加
	div.style.zIndex = 999999;
	div.style.padding = '10px';
	div.style.fontSize = 'smaller';
	div.style.opacity = '0.9';
	//div.style.borderRadius = '5px';
	div.style.boxShadow = '2px 2px 2px #999';
	//div.style.MozBorderRadius = '5px';
	div.style.MozBoxShadow = '2px 2px 2px #999';
	//div.style.WebkitBorderRadius = '5px';
	div.style.WebkitBoxShadow = '2px 2px 2px #999';
	//if(!('boxShadow' in div.style) && !('MozBoxShadow' in div.style) && !('WebkitBoxShadow' in div.style)) {
	//	div.style.border = 'outset 1px gray';
	//}
	
	$(div).hide();
	
	return div;
}
function setResNumber(dt) {
	dt.innerHTML.match(/^(<[^>]*>)?(\d+)/);
	var r = Number(RegExp.$2);
	dt.id = r;
	res[r] = true;
	return r;
}

function setTimer(obj,time) {
	if(!obj.timer) {
		obj.timer = setTimeout(function(){hidePopup(obj);}, time);
	}
}

function clearTimer(obj) {
	if(obj.timer) {
		clearTimeout(obj.timer);
		obj.timer = null;
	}
}

function showPopup(obj, showOnly, imagePopup) {
	var popup = obj.popup;
	var e = obj.event;
	popup.style.left = e.pageX + 10;
	popup.style.top  = e.pageY;
	document.body.appendChild(popup);
	
	var r = popup.offsetLeft + popup.offsetWidth;
	var scrollX = e.pageX - e.clientX;
	var scrollY = e.pageY - e.clientY;
	if (r > scrollX + document.body.clientWidth) {
		popup.style.left = scrollX + document.body.clientWidth - popup.offsetWidth - 10;
	}
	var b = popup.offsetTop + popup.offsetHeight;
	if (b > scrollY + document.body.clientHeight) {
		var t = scrollY + document.body.clientHeight - popup.offsetHeight - 10;
		if (t < scrollY)
			t = scrollY + 10;
		popup.style.top = t;
	}
    
    
    if (!imagePopup) {
        $(popup).show();
    } else {
        toCenterMiddle(popup);
    }
    
    if (showOnly) {
        return;
    }
    
    try {
        var aTags = popup.getElementsByTagName("a");
        for (i=0; i<aTags.length; i++) {
            try {
                if (aTags[i].innerHTML.match(/^(&gt;(&gt;)?|\uFF1E|>(>)?)([-0-9]+)/)) {
                    var n = RegExp.$4;
                    aTags[i].id = "link" + i + "_" + n;
                    aTags[i].setAttribute('res', n);
                    aTags[i].addEventListener("mouseover",function(e){showResPopup(e,obj);},false);
                }
                if (aTags[i].href.match(/\.(gif|jpeg|jpg|png)$/i)) {
                    var img = aTags[i].getElementsByTagName("img")[0];
                    img.addEventListener("mouseover",function(e){showImgPopup(e,obj);},false);
                }
            } catch (e) {}
        }
    } catch (e) {}
    
}

function hidePopup(obj) {
	obj.popup.removeEventListener("mouseover",obj.clearFunction,false);
	var opacity = obj.popup.style.opacity;
	if(opacity > 0 && opacity < 1) {
		obj.popup.style.opacity -= 0.1;
		obj.timer = setTimeout(function(){hidePopup(obj);}, 15);
		return;
	}
	try {
		// Add by polygon 画像はキャッシュしておく
		if (typeof obj.enableCache !== "undefined" && obj.enableCache) {
			obj.popup.style.display = "none";
			
			// やっぱり消す
			obj.popup.parentNode.removeChild(obj.popup);
			
			throw "";
		}
		
		document.body.removeChild(obj.popup);
	}
	catch(e) {
	}
	clearTimeout(obj.timer);
	obj.timer = null;
	for (var i = 0; i < popupArr.length; i++) {
		if (popupArr[i].popup.id == obj.popup.id) {
			popupArr.splice(i,1);
		}
	}
	if(obj.parent) {
		if(!obj.parent.mousein) setTimer(obj.parent,0);
		obj.parent.setFunction = function(e){setTimer(obj.parent,popupTimeout);};
		obj.parent.popup.addEventListener("mouseout",obj.parent.setFunction,false);
	}
}

function showResCallback(res,o) {
    if (!o) {
        return;
    }
    var popup = o.popup;
	res.responseText = res.responseText.replace(ttp, "$1<a href=h$2 target=_blank>$2</a>");
	var tmp = '';
	var match = res.responseText.match(/<dt>.*<br><br>/ig);
	for(var i=0;i<match.length;i++) {
		match[i] = match[i].replace(/<dt>/i, "");
		tmp += match[i].replace(/(<br>)?<dd>/i, "<br>");
	}
	popup.innerHTML = tmp;
	
    
    var aTags = popup.getElementsByTagName("a");
    
    Deferred.loop(aTags.length, function(i) {
        var href = aTags[i].href;
        aTags[i].href = href.replace(/((ime\.nu|(www\d\.|)ime\.st|pinktower\.com|fast\.io)\/|http:\/\/jbbs\.livedoor\.jp\/bbs\/link\.cgi\?url=)/, "");
        if (aTags[i].href.match(/\.(gif|jpeg|jpg|png)$/i)) {
            (function() {
                var img = document.createElement("img"), link = aTags[i];
                img.src = aTags[i].href;
                //img.height = "30";
                //img.style.verticalAlign = "middle";
                img.id = "image" + i + Math.random().toString(36).split(".").pop() + (new Date).getTime();
                //link.innerHTML = ' ' + link.innerHTML;
                //aTags[i].insertBefore(img,aTags[i].childNodes[0]);
                Deferred.wait(0).next(function() {
                    setImageButtonEvent(link, img, true);
                });
            })();
        }
    }).next(function() {
        showPopup(o);
    });
}

function extractIdCallback(res,o) {
    if (!o) {
        return;
    }
    
	var popup = o.popup;
	res.responseText = res.responseText.replace(ttp, "$1<a href=h$2 target=_blank>$2</a>");
	var tmp = '';
	var idStr = o.event.target.innerHTML;
	var match = res.responseText.match(/<dt>.*<br><br>/ig);
	var added = 0;
	for(var i=0;i<match.length;i++) {
		var included = match[i].substring(0,match[i].indexOf("<dd>")).indexOf(idStr);
		if(included != -1) {
			match[i] = match[i].replace(/<dt>/i, "");
			tmp += match[i].replace(/(<br>)?<dd>/i, "<br>");
			added++;
		}
	}
	
	tmp = "全発言数: " + added + "<hr>" + tmp;
	popup.innerHTML = tmp;
	
	var aTags = popup.getElementsByTagName("a");
	for (i=0; i<aTags.length; i++) {
		var href = aTags[i].href;
		aTags[i].href = href.replace(/((ime\.nu|(www\d\.|)ime\.st|pinktower\.com|fast\.io)\/|http:\/\/jbbs\.livedoor\.jp\/bbs\/link\.cgi\?url=)/, "");
	}
	showPopup(o);
}

function showResPopup(e,parent) {
	var popup = createPopup();
	var r = false;
	var num = e.currentTarget.getAttribute('res');
	//var nn = num.split(',');
	
	for (var i = 0; i < popupArr.length; i++) {
		if (popupArr[i].popup.id == 'pop_'+e.target.id) {
			return;
		}
	}
	
	var obj = new Object();
	obj.popup = popup;
	obj.event = e;
	obj.timer = null;
	obj.parent = parent;
	obj.setFunction = function(e){setTimer(obj,popupTimeout);};
	obj.clearFunction = function(e){clearTimer(obj);obj.mousein=1;};
	obj.mousein = 0;
	obj.bgRed = 255;
	obj.bgGreen = 255;
	obj.bgBlue = 237;
	
	if(parent) {
		if(parent.bgRed > 220) {
			obj.bgRed = parent.bgRed - 10;
			obj.bgBlue = parent.bgBlue + 2;
		}
		else if(parent.bgGreen > 220) {
			obj.bgRed = parent.bgRed + 5;
			obj.bgGreen = parent.bgGreen - 10;
			obj.bgBlue = parent.bgBlue;
		}
		parent.popup.removeEventListener("mouseout",parent.setFunction,false);
		clearTimer(parent);
	}
	e.target.addEventListener("mouseout",function(e){setTimer(obj,popupTimeout);},false);
	popup.addEventListener("mouseout",obj.setFunction,false);
	popup.addEventListener("mouseover",obj.clearFunction,false);
	popup.addEventListener("mouseout",function(e){obj.mousein=0;},false);
	
	popupArr.push(obj);
	popup.id = 'pop_'+e.target.id;
	popup.innerHTML = '';
	popup.style.backgroundColor = '#' + obj.bgRed.toString(16) + obj.bgGreen.toString(16) + obj.bgBlue.toString(16);
	//for (var j = 0; j < nn.length; j++) {
		//nn[j].match(/(\d+)?(-(\d+))?/);
		num.match(/(\d+)?(-(\d+))?/);
		var a = RegExp.$1;
		var b = RegExp.$3;
		if (a == '') a = 0;
		if (b == '') b = a;
		//if (b > 1001) b = 1001;
		var dt = document.getElementsByTagName('dt');
		var len = dt.length;
		for (var i = a; i <= b; i++) {
			if (!res[i]) {
				if (len > 1) {
					var n = setResNumber(dt[1]);
					if (i < n || n + len - 2 < i) {
						r = false;
						popup.innerHTML = '';
						break;
					}
					setResNumber(dt[i-n+1]);
				}
			}
			var d = document.getElementById(i);
			if (!d) {
				r = false;
				popup.innerHTML = '';
				break;
			}
			popup.innerHTML += d.innerHTML + '<br>' + d.nextSibling.innerHTML;
			r = true;
		}
	//}
	
    // innerHTML で操作してるのでイベントが消えてる
    if (r) {
        $(".image-show-button", popup).hide();
        $(".mini-thumbnail-image-for-popup", popup).click(function(event) {
            showImgPopup(event, null);
        }).show();
    }
    
	showPopup(obj);
	if (!r) {
		popup.innerHTML = 'loading...';
		var url = (e.target.href) ? e.target.href : thread + num;
		/*if(num.match(/-/))*/ url += 'n';
		GM_xmlhttpRequest({
			method: 'GET',
			overrideMimeType: "text/plain; charset=" + document.characterSet,
			url: url,
			onload: function(res){showResCallback(res,obj);}
		});
		/*var req = new XMLHttpRequest();
		req.open('GET',url,true);
		req.overrideMimeType("text/plain; charset=" + document.characterSet);
		req.onload = function(){showResCallback(req,obj);};
		req.send(null);*/
	}
}

function showIDPopup(e,parent) {
	var popup = createPopup();
	var obj = new Object();
	obj.popup = popup;
	obj.event = e;
	obj.timer = null;
	obj.parent = parent;
	obj.setFunction = function(e){setTimer(obj,popupTimeout);};
	obj.clearFunction = function(e){clearTimer(obj);obj.mousein=1;};
	obj.mousein = 0;
	obj.bgRed = 255;
	obj.bgGreen = 255;
	obj.bgBlue = 237;
	
	for (var i = 0; i < popupArr.length; i++) {
		if (popupArr[i].popup.id == 'pop_'+e.target.id) {
			return;
		}
	}
	
	if(parent) {
		if(parent.bgRed > 220) {
			obj.bgRed = parent.bgRed - 10;
			obj.bgBlue = parent.bgBlue + 2;
		}
		else if(parent.bgGreen > 220) {
			obj.bgRed = parent.bgRed + 5;
			obj.bgGreen = parent.bgGreen - 10;
			obj.bgBlue = parent.bgBlue;
		}
		parent.popup.removeEventListener("mouseout",parent.setFunction,false);
		clearTimer(parent);
	}
	e.target.addEventListener("mouseout",function(e){setTimer(obj,popupTimeout);},false);
	popup.addEventListener("mouseout",obj.setFunction,false);
	popup.addEventListener("mouseover",obj.clearFunction,false);
	popup.addEventListener("mouseout",function(e){obj.mousein=0;},false);
	
	popupArr.push(obj);
	popup.id = 'pop_'+e.target.id;
	popup.innerHTML = 'loading...';
	popup.style.backgroundColor = '#' + obj.bgRed.toString(16) + obj.bgGreen.toString(16) + obj.bgBlue.toString(16);
	showPopup(obj);
	var url = document.URL.replace(/(http.*\/)[^\/]*$/,"$1");
	GM_xmlhttpRequest({
		method: 'GET',
		overrideMimeType: "text/plain; charset=" + document.characterSet,
		url: url,
		onload: function(res){extractIdCallback(res,obj);}
	});
	/*var req = new XMLHttpRequest();
	req.open('GET',url,true);
	req.overrideMimeType("text/plain; charset=" + document.characterSet);
	req.onload = function(){extractIdCallback(req,obj);};
	req.send(null);*/
}

function resizeImage(e,obj) {
    /*
	if(window.innerWidth * 0.9 < e.target.width) {
		e.target.height = e.target.height * window.innerWidth * 0.9 / e.target.width;
		e.target.width = window.innerWidth * 0.9;
	}
	if(window.innerHeight * 0.9 < e.target.height) {
		e.target.width = e.target.width * window.innerHeight * 0.9 / e.target.height;
		e.target.height = window.innerHeight * 0.9;
	}
	*/
    if (window.innerWidth * 0.8 < e.target.width) {
        e.target.height = Math.floor(e.target.height * window.innerWidth * 0.8 / e.target.width);
        e.target.width = Math.floor(window.innerWidth * 0.8);
    }
    if (window.innerHeight * 0.8 < e.target.height) {
        e.target.width = Math.floor(e.target.width * window.innerHeight * 0.8 / e.target.height);
        e.target.height = Math.floor(window.innerHeight * 0.8);
    }
	e.target.style.display = "block";
	showPopup(obj);
}


function getScreenInfo(key) {
    var d, de, db, sc, win, info;
    d = document || {};
    de = d.documentElement || {};
    db = d.body  || {};
    win = window || {};
    sc = win.sc  || {};
    info = {
      width: db.clientWidth || de.clientWidth || sc.availWidth ||
             win.innerWidth || win.width      || sc.width      || 800,
      height: db.clientHeight || db.scrollHeight || de.clientHeight ||
              sc.availHeight  || win.innerHeight || win.height ||
              sc.height || 600,
      availHeight: win.innerHeight ||
                   de.clientHeight || sc.availHeight || 600,
      x: win.scrollX || db.scrollLeft || de.scrollLeft || 0,
      y: win.scrollY || db.scrollTop  || de.scrollTop  || 0
    };
    return (key && (key in info)) ? info[key] : info;
}


function toCenterMiddle(elem) {
    var info = getScreenInfo(), left, top;
    if (elem) {
      if (elem.jquery) {
        left = elem.width();
        top = elem.height();
      } else {
        left = elem.style && parseInt(elem.style.width);
        if (isNaN(left - 0)) {
          left = elem.clientWidth;
        }
        top = elem.style && parseInt(elem.style.height);
        if (isNaN(top - 0)) {
          top = elem.clientHeight;
        }
      }
      if (!isNaN(Number(left)) && !isNaN(Number(top))) {
        left = Math.floor(info.x + (info.width  / 2) - (left / 2));
        top = Math.floor(info.y + (info.availHeight / 2) - (top  / 2));
        if (elem.jquery) {
          elem.css({ left: left, top: top });
        } else {
          elem.style.left = left + 'px';
          elem.style.top  = top  + 'px';
        }
      }
    }
    return elem;
}


function setImageButtonEvent(a, img, plain) {
    //setTimeout(function() {
    Deferred.call(function() {
        setImageButtonEventTrigger(a, img, plain);
    });
    //}, 0);
}


function setImageButtonEventTrigger(a, img, plain) {
    var css, panel, imageShowButton, image, target, link, clickBtn, clickImg;
    css = {
        border: "1px solid #8888ff",
        background: "#eeeeff",
        color: "#8888ff",
        padding: "3px",
        margin: "2px 4px",
        fontSize: "11px",
        cursor: "pointer"
    };
    target = $(a);
    image = $(img).css(css).css({ maxHeight: 50 }).hide();
    
    /*
    if (String(image.attr("src") || "").length === 0) {
        image.attr({
            src: target.attr("href")
        });
    }
    */
    var imgWrap = $("<div/>")
        .click(function() {
            showImgPopup({ target: $("img.mini-thumbnail-image-for-popup:visible", $(this)).get(0) }, null);
        });
    
    panel = $("<div/>").css({
        display: "inline-block",
        margin: 5,
        lineHeight: 1.5,
        verticalAlign: "middle"
    });
    if (plain) {
        // なぜかイベントが効かない(?)
        image.appendTo(panel);
    } else {
        imageShowButton = $("<span/>")
            .css(css)
            .css({
                paddingBottom: 1,
                userSelect: "none",
                MozUserSelect: "none",
                OUserSelect: "none",
                KhtmlUserSelect: "none",
                WebkitUserSelect: "none"
            })
            .addClass("image-show-button")
            .attr({
                title: "画像を表示するよっ!!"
            })
            .text("画像")
            .click(function() {
                //if ( $("img.mini-thumbnail-image-for-popup:visible", $(imageShowButton).parent() ).length ) {
                //    showImgPopup({ target: $("img.mini-thumbnail-image-for-popup:visible", $(imageShowButton).parent() ).get(0) }, null);
                //    return;
                //}
                if ( $(imageShowButton).text() === "Loading..." ) {
                    return;
                }
                $(imageShowButton)
                    .text("Loading...");
                $(image)
                    .load(function() {
                        $(imageShowButton).text("").hide("fast");
                        $(image).show("slow");
                    })
                    .attr({
                        src: target.attr("href")
                    })
                    .hide();
            })
            .appendTo(panel);
        image
            .addClass("mini-thumbnail-image-for-popup")
            .css({
                userSelect: "none",
                MozUserSelect: "none",
                OUserSelect: "none",
                KhtmlUserSelect: "none",
                WebkitUserSelect: "none"
            })
            .attr({
                title: "クリックでおっきく…なるよ///"
            })
            //.click(function(event) {
                //$(image).parent().find(".image-show-button").click();
                //showImgPopup(event, null);
            //});
            ;
        image.appendTo(imgWrap);
        imgWrap.appendTo(panel);
        //image.appendTo(panel);
    }
    $(target).before(panel);
}


function popupImageLoadedHandler(img, frame, popup) {
    var orgWidth, orgHeight, node, percent;
    
    if (!frame) {
        node = $(img).get(0).parentNode;
        while (node && String(node.tagName).toLowerCase() !== "body") {
            if ( $(node).hasClass("pot-2ch-browser-popup-frame") ) {
                frame = node;
                break;
            }
            node = node.parentNode;
        }
    }
    if (!popup) {
        node = $(img).get(0).parentNode;
        while (node && String(node.tagName).toLowerCase() !== "body") {
            if ( $(node).hasClass("pot-2ch-browser-popup-dialog") ) {
                popup = node;
                break;
            }
            node = node.parentNode;
        }
    }
    if (img && frame && popup) {
        
        orgWidth = img.naturalWidth || img.width || img.clientWidth || img.innerWidth;
        orgHeight = img.naturalHeight || img.height || img.clientHeight || img.innerHeight;
        
        percent = 0.8;
        
        if (window.innerWidth * percent < img.width) {
            img.height = Math.floor(img.height * window.innerWidth * percent / img.width);
            img.width = Math.floor(window.innerWidth * percent);
        }
        if (window.innerHeight * percent < img.height) {
            img.width = Math.floor(img.width * window.innerHeight * percent / img.height);
            img.height = Math.floor(window.innerHeight * percent);
        }
        
        img.style.margin = 0;
        img.style.border = 0;
        img.style.padding = 0;
        img.style.display = "block";
        img.style.maxWidth = img.width + 'px';
        img.style.maxHeight = img.height + 'px';

        $(popup).find(".popup-image-size-container").html([
            (orgWidth < 500 || orgHeight < 500) ? '<strong style="color:#ff4465;">' : '<span>',
            orgWidth + "x" + orgHeight,
            (orgWidth < 500 || orgHeight < 500) ? '</strong>' : '</span>'
        ].join(""));
        
        img.width = orgWidth;
        img.height = orgHeight;
        
        img.removeAttribute("width");
        img.removeAttribute("height");
        
        frame.style.width  = (img.style.maxWidth  + 20) + "px";
        frame.style.height = (img.style.maxHeight + 20) + "px";
        
        frame.style.display = "block";
        
        toCenterMiddle( $(popup) ).show();
    }
}


function showImgPopup(e, parent) {
    var exists = false, obj, popup, i;
    
    // Add by polygon 画像をキャッシュから探す ---------------
    /*
    // やっぱりやめ!
    for (i = 0; i < imageCache.length; ++i) {
        if (imageCache[i].itemUrl === e.target.src) {
            obj = imageCache[i];
            exists = true;
            break;
        }
    }
    if (exists) {
        obj.popup.style.opacity = 0.99;
        obj.imgElem.style.opacity = 1;
        setTimeout(function() {
            popupImageLoadedHandler.call(null, obj.imgElem, obj.frameElem, obj.popup);
        }, 2500);
        showPopup(obj);
        return;
    }
    */
    // -------------------------------------------------------
    
    obj = new Object();
    popup = createPopup();
    obj.popup = popup;
    obj.event = e;
    obj.timer = null;
    obj.parent = parent;
    obj.setFunction = function(e){setTimer(obj,popupTimeout);};
    obj.clearFunction = function(e){clearTimer(obj);obj.mousein=1;};
    obj.mousein = 0;
    
    for (i = 0; i < popupArr.length; i++) {
        if (popupArr[i].popup.id == 'pop_' + e.target.id) {
            return;
        }
    }
    
    // Add by polygon 画像をキャッシュしておく
    obj.enableCache = true;
    obj.itemUrl = e.target.src;
    
    $(popup).hide();
    
    /*
     * Modified by polygon Timbloo用にポップアップは自動で消さない
     *
    if(parent) {
        parent.popup.removeEventListener("mouseout",parent.setFunction,false);
        clearTimer(parent);
    }
    e.target.addEventListener("mouseout",function(e){setTimer(obj,popupTimeout);},false);
    popup.addEventListener("mouseout",obj.setFunction,false);
    popup.addEventListener("mouseover",obj.clearFunction,false);
    popup.addEventListener("mouseout",function(e){obj.mousein=0;},false);
    */
    var hideImagePopup = function(ev) {
        
        if ( $(ev.target).hasClass("popup-image-draggable-handler") ) {
            return;
        }
        
        if ( !$(".popup-image-draggable-handler:visible").length ) {
            return;
        }
        
        try {
            $("body").unbind("click", hideImagePopup);
            //document.body.removeEventListener('click', hideImagePopup, true);
        } catch (e) {}
        
        try {
            
            // フェードアウトしない (とりあえず)
            obj.popup.style.opacity = 0;
            
            if (obj.popup.style.opacity > 0 && obj.popup.style.opacity < 1) {
                obj.popup.style.opacity -= 0.1;
                throw "continue";
            }
        } catch (e) {
            setTimeout(hideImagePopup, 15);
            return;
        }
        obj.mousein = 0;
        if (typeof obj.enableCache === "undefined" || !obj.enableCache) {
            obj.setFunction();
        } else {
            
            obj.popup.style.display = "none";
            obj.popup.parentNode.removeChild(obj.popup);
            
            clearTimeout(obj.timer);
            obj.timer = null;
            for (var i = 0; i < popupArr.length; i++) {
                if (popupArr[i].popup.id == obj.popup.id) {
                    popupArr.splice(i, 1);
                }
            }
        }
    };
    //document.body.addEventListener('click', hideImagePopup, true);
    $("body").bind("click", hideImagePopup);
    
    popupArr.push(obj);
    $(popup)
        .addClass("pot-2ch-browser-popup-dialog")
        .css({
            margin: 0,
            padding: 0,
            opacity: 0.99
        })
        .attr({
            id: 'pop_' + e.target.id
        });
    
    var frame = $("<div/>")
        .addClass("pot-2ch-browser-popup-frame")
        .css({
            background: "#f8f8f8",
            border: "1px solid #aaa",
            borderColor: "#aaa #777 #777 #aaa",
            color: "#333",
            margin: 0,
            padding: 10
        })
        .attr({
            id: 'frame_' + e.target.id
        });
    
    (function() {
        var header = $("<div/>")
            .addClass("popup-image-draggable-handler")
            .click(function(ev) {
                // ポップアップを消すイベントに達するのを防ぐ
                ev.preventDefault();
                ev.stopPropagation();
                return false;
            })
            .mousedown(function() { $("img", $(popup)).css({ opacity: 0.5 }) })
            .mouseup(function  () { $("img", $(popup)).css({ opacity: 1   }) });
        
        var footer = $("<div/>")
            .addClass("popup-image-size-container")
            .css({
                textAlign: "right",
                fontFamily: "verdana",
                fontSize: "11px",
                color: "#777",
                paddingTop: 3
            });
        
        var dragPanel = $("<div/>")
            .css({
                background: "#e8e8ea",
                cursor: "move",
                height: 25,
                margin: "0 0 5px 0",
                padding: 3,
                textAlign: "right"
            })
            .append(
                $("<span/>")
                    .css({
                        display: "inline-block",
                        fontSize: "13px",
                        fontFamily: "verdana",
                        fontWeight: "bold",
                        height: 16,
                        width: 16,
                        color: "#555566",
                        background: "transparent",
                        padding: 2,
                        margin: 2,
                        textAlign: "center",
                        verticalAlign: "middle",
                        cursor: "pointer"
                    })
                    .click(hideImagePopup)
                    .hover(
                        function() {
                            $(this)
                                .css({
                                    color: "#3333ff"
                                    //background: "#bbbbff"
                                });
                        },
                        function() {
                            $(this)
                                .css({
                                    color: "#555566"
                                    //background: "#cdcdff"
                                });
                        }
                    )
                    .attr({
                        title: "閉じるよっ☆.*ﾟ:｡*（ゝω〃)ﾉﾟ:｡*ﾟ"
                    })
                    .text("×")
            )
            .appendTo(header);
        
        // draggable
        $(popup).draggable({
            cursor: "move",
            scroll: false,
            handle: $(header),
            start: function() {
                $(popup).css({
                    boxShadow: "none",
                    MozBoxShadow: "none",
                    WebkitBoxShadow: "none"
                });
                $("img", $(popup)).css({ opacity: 0.075 });
                //$("img", $(popup)).hide();
            },
            stop: function(ev) {
                $(popup).css({
                    boxShadow: "2px 2px 2px #999",
                    MozBoxShadow: "2px 2px 2px #999",
                    WebkitBoxShadow: "2px 2px 2px #999"
                });
                $("img", $(popup)).css({ opacity: 1 });
                //$("img", $(popup)).show();
                
                // ポップアップを消すイベントに達するのを防ぐ
                //ev.preventDefault();
                //ev.stopPropagation();
                //return false;
            }
        });
        
        $(header).appendTo( $(frame) );
    })();
    
    var imgWrap = $("<div/>")
        .css({
            textAlign: "center",
            width: "100%"
        });
    var imgLink = $("<a/>")
        .addClass("pot-2ch-browser-popup-img-link")
        .css({
            border: "0 none",
            margin: 0,
            padding: 0,
            display: "block",
            textDecoration: "none"
        })
        .attr({
            href: e.target.src
            //href: "javascript:void(0)"
        })
        .click(function(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            //if (!$(ev.target).hasClass("popup-image-draggable-handler")) {
            //    hideImagePopup();
            //}
            window.open( $(this).attr("href"), "_blank" );
            
            
        })
        .appendTo(imgWrap);
    
    
    var popupImageId = toUniqId("Pot2chBrowserizePopupImage");
    
    
    var img = $("<img/>")
        .css({
            border: "0 none",
            margin: 0,
            padding: 0,
            display: "block",
            cursor: "pointer",
            opacity: 1
        })
        //.hover(
        //    function() { $(this).css({ opacity: 1/*0.75*/ }) },
        //    function() { $(this).css({ opacity: 1    }) }
        //)
        .load(function() {
            popupImageLoadedHandler.call(null, $(img).get(0), $(frame).get(0), $(popup).get(0));
        })
        .error(function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            generateImageWithoutReferrer(event.target, "popup");
            
            /*
            Deferred.wait(2).next(function() {
                var newImage = $(imgLink).find("#" + popupImageId);
                if (newImage && newImage.length) {
                    popupImageLoadedHandler.call(null, $(newImage).get(0), $(frame).get(0), $(popup).get(0));
                }
            });
            */
            
            return false;
        })
        .attr({
            id: popupImageId,
            src: e.target.src
        })
        .appendTo(imgLink);
    
    obj.imgElem = img.get(0);
    imgWrap.appendTo(frame);
    
    /*
     * dataスキームの場合TomblooからPOSTできないので変更
     *
    var frame = document.createElement("iframe");
    frame.id = 'frame_'+e.target.id;
    frame.style.border = "none";
    frame.style.margin = "0";
    frame.style.padding = "0";
    frame.scrolling = "no";
    frame.style.display = 'none';
    frame.src = 'data:text/html,' +
                '<html><head>' +
                '<style type="text/css">body {padding:0; margin:0;}</style>' +
                '<script>' +
                'function img_loaded(img){' +
                'var frame = window.parent.document.getElementById("'+frame.id+'");' +
                'var popup = window.parent.document.getElementById("'+popup.id+'");' +
                'if(window.parent.innerWidth * 0.9 < img.width) {' +
                '    img.height = img.height * window.parent.innerWidth * 0.9 / img.width;' +
                '    img.width = window.parent.innerWidth * 0.9;' +
                '}' +
                'if(window.parent.innerHeight * 0.9 < img.height) {' +
                '    img.width = img.width * window.parent.innerHeight * 0.9 / img.height;' +
                '    img.height = window.parent.innerHeight * 0.9;' +
                '}' +
                'img.style.margin = 0;' +
                'img.style.border = 0;' +
                'img.style.padding = 0;' +
                'frame.width = img.width;' +
                'frame.height = img.height;' +
                'frame.style.display = "block";' +
                'var r = popup.offsetLeft + popup.offsetWidth;' +
                'var scrollX = '+(e.pageX - e.clientX)+';' +
                'var scrollY = '+(e.pageY - e.clientY)+';' +
                'if (r > scrollX + '+document.body.clientWidth+') {' +
                '    popup.style.left = scrollX + '+document.body.clientWidth+' - popup.offsetWidth - 10;' +
                '}' +
                'var b = popup.offsetTop + popup.offsetHeight;' +
                'if (b > scrollY + '+document.body.clientHeight+') {' +
                '    var t = scrollY + '+document.body.clientHeight+' - popup.offsetHeight - 10;' +
                '    if (t < scrollY)' +
                '        t = scrollY + 10;' +
                '    popup.style.top = t;' +
                '    }' +
                '}' +
                '</script></head><body>' +
                '<img onload="img_loaded(this)" src='+e.target.src+'>' +
                '</body></html>';
    */
    obj.frameElem = $(frame).get(0);
    $(frame).appendTo(popup);
    showPopup(obj, true, true);
}


/*
// 未使用
function openImageWithoutReferrer(img){
    // Modified by polygon  エラー時なのでこれ以上無意味な通知は出さないように try ... catch で包む
    try {
        var frame = document.createElement("iframe");
        frame.id = 'iframe'+img.id.replace('image','');
        frame.style.display = 'none';
        frame.src = 'data:text/html,' + encodeURI(
                    '<html><head><script>' +
                    'function img_loaded(img){' +
                    // Add by polygon
                    'try{' +
                    // --------------
                    'var data = "image_id:'+img.id.replace('image','')+'";' +
                    'var aTag = window.parent.document.getElementById("imglink'+img.id.replace('image','')+'");' +
                    'aTag.insertBefore(img,aTag.childNodes[0]);' +
                    'img.style.verticalAlign = "middle";' +
                    'window.parent.postMessage(data,"' + location.protocol + '//' + location.host + '");' +
                    // Add by polygon
                    '}catch(e){}' +
                    // --------------
                    '}' +
                    '</script></head><body>' +
                    // Add by polygon エラー通知 (この関数はエラー時に呼ばれる)
                    '<h3 style="color:red">Error</h3>' +
                    '<img src='+img.src+
                    ' onload="try{img_loaded(this)}catch(e){}" onerror="try{img_loaded(this)}catch(e){}" height=30 id="'+img.id+'">' +
                    '</body></html>'
        );
        document.body.appendChild(frame);
    } catch (e) {}
}
*/

function generateImageWithoutReferrer(img) {
    var iframe, params;
    try {
        if (!img.id) {
            img.id = toUniqId("image");
        }
        iframe = document.createElement("iframe");
        iframe.style.visibility = "hidden";
        iframe.style.position = "absolute";
        iframe.style.left = "-999999px";
        iframe.style.top = "-999999px";
        iframe.id = toUniqId("Pot2chBrowserizeErrorIframe");
        
        params = {
            THUMB_MAX_HEIGHT: Pot.THUMB_MAX_HEIGHT,
            IMAGE_SRC: img.getAttribute("src"),
            IMAGE_ID: img.id,
            NEW_IMAGE_ID: toUniqId("image"),
            IFRAME_ID: iframe.id,
            SIZEBOX_CLASS: "thumbnail-image-size-viewer",
            IMAGE_SHOW_BUTTON_CLASS: "image-show-button",
            THUMBNAIL_WRAPPER_CLASS: "thumbnail-image-list-wrapper",
            THUMBNAIL_PROTOTYPE_IMAGE_CLASS: "thumbnail-prototype-image",
            POPUP_IMAGE_LINK_CLASS: "pot-2ch-browser-popup-img-link"
        };
        
        iframe.src = "data:text/html," + [
            '<html><head><script>' ,
            'const params = {' ,
                'THUMB_MAX_HEIGHT: "{{THUMB_MAX_HEIGHT}}",' ,
                'imageId: "{{IMAGE_ID}}",' ,
                'newImageId: "{{NEW_IMAGE_ID}}",' ,
                'iframeId: "{{IFRAME_ID}}",' ,
                'sizeBoxClass: "{{SIZEBOX_CLASS}}",' ,
                'imageShowButtonClass: "{{IMAGE_SHOW_BUTTON_CLASS}}",' ,
                'thumbnailWrapperClass: "{{THUMBNAIL_WRAPPER_CLASS}}",' ,
                'thumbnailPrototypeImageClass: "{{THUMBNAIL_PROTOTYPE_IMAGE_CLASS}}",' ,
                'popupImageLinkClass: "{{POPUP_IMAGE_LINK_CLASS}}"' ,
            '};' ,
            'function getDoc() {' ,
                'return window.parent.document;' ,
            '}' ,
            'function onLoaded(newImage) {' ,
                'try {' ,
                    'onLoadedTrapper(newImage);' ,
                '} catch (e) {' ,
                    'throw e;' ,
                '} finally {' ,
                    'try {' ,
                        'removeFrame();' ,
                    '} catch (e) {}' ,
                '}' ,
            '}' ,
            'function onLoadedTrapper(newImage) {' ,
                'var doc, oldImage;' ,
                'doc = getDoc();' ,
                'cleanAttrs(newImage);' ,
                'oldImage = doc.getElementById(params.imageId);' ,
                'newImage.parentNode.removeChild(newImage);' ,
                'newImage.setAttribute("style", oldImage.getAttribute("style"));' ,
                'newImage.style.display = "none";' ,
                'setImageStyle(newImage, oldImage);' ,
                'oldImage.parentNode.insertBefore(newImage, oldImage);' ,
                '' ,
                'if (isPopupImage(oldImage)) {' ,
                    'try {' ,
                        'removeImageByCase(oldImage, true);' ,
                        'popupImageLoadedHandler(newImage);' ,
                    '} catch (e) {}' ,
                '}' ,
                'try {' ,
                    'removeImageByCase(oldImage, true);' ,
                '} catch (e) {}' ,
                'newImage.style.display = "inline-block";' ,
                'try {' ,
                    'setImageSize(newImage);' ,
                '} catch (e) {}' ,
                '' ,
                'removeFrame();' ,
            '}' ,
            'function onFailed(newImage) {' ,
                'try {' ,
                    'onFailedTrapper(newImage);' ,
                '} catch (e) {}' ,
            '}' ,
            'function onFailedTrapper(newImage) {' ,
                'var doc, oldImage, notice;' ,
                'doc = getDoc();' ,
                'cleanAttrs(newImage);' ,
                'newImage.removeAttribute("src");' ,
                'oldImage = doc.getElementById(params.imageId);' ,
                '' ,
                'notice = document.createElement("div");' ,
                'notice.style.color = "#ff6688";' ,
                'notice.style.fontWeight = "bold";' ,
                'notice.style.fontSize = "12px";' ,
                'notice.style.padding = "10px 5px";' ,
                'notice.innerHTML = "＼エラー／";' ,
                '' ,
                'oldImage.parentNode.insertBefore(notice, oldImage.nextSibling);' ,
                'removeImageByCase(oldImage, false);' ,
                'newImage.parentNode.removeChild(newImage);' ,
                'removeFrame();' ,
            '}' ,
            'function isButtonImage(img) {' ,
                'var isButton, node;' ,
                'try {' ,
                    'node = img.parentNode.parentNode.querySelector("." + params.imageShowButtonClass);' ,
                    'isButton = !!node;' ,
                '} catch (e) {' ,
                    'isButton = false;' ,
                '}' ,
                'return isButton;' ,
            '}' ,
            'function isPopupImage(img) {' ,
                'var isPopup = false;' ,
                'try {' ,
                    'isPopup = hasClass(img.parentNode, params.popupImageLinkClass);' ,
                '} catch (e) {' ,
                    'isPopup = false;' ,
                '}' ,
                'return isPopup;' ,
            '}' ,
            'function hasClass(elem, className) {' ,
                'var re;' ,
                're = new RegExp("\\\\b" + className + "\\\\b");' ,
                'return elem && elem.className && re.test(elem.className);' ,
            '}' ,
            'function removeImageByCase(oldImage, success) {' ,
                'var doc, parent, node, re;' ,
                'doc = getDoc();' ,
                'try {' ,
                    'parent = oldImage.parentNode;' ,
                    'if (parent) {' ,
                        'node = parent.querySelector("." + params.imageShowButtonClass);' ,
                        'if (node) {' ,
                            'node.parentNode.removeChild(node);' ,
                            'try {' ,
                                'oldImage.parentNode.removeChild(oldImage);' ,
                            '} catch (e) {}' ,
                            'throw "break";' ,
                        '} else if (parent.parentNode) {' ,
                            'node = parent.parentNode.querySelector("." + params.imageShowButtonClass);' ,
                            'if (node) {' ,
                                'node.parentNode.removeChild(node);' ,
                                'try {' ,
                                    'oldImage.parentNode.removeChild(oldImage);' ,
                                '} catch (e) {}' ,
                                'throw "break";' ,
                            '}' ,
                        '}' ,
                        'node = parent.querySelectorAll("img");' ,
                        'if (node && node.length) {' ,
                            'Array.prototype.slice.call(node).forEach(function(n) {' ,
                                'if (n.id !== params.newImageId) {' ,
                                    'n.parentNode.removeChild(n);' ,
                                '}' ,
                            '});' ,
                            'throw "break";' ,
                        '}' ,
                        'parent = parent.parentNode;' ,
                        'if (parent && hasClass(parent, params.thumbnailWrapperClass)) {' ,
                            '' ,
                            'if (success) {' ,
                                'oldImage.parentNode.removeChild(oldImage);' ,
                                'throw "break";' ,
                            '}' ,
                            '' ,
                        '}' ,
                    '}' ,
                '} catch (e) {}' ,
            '}' ,
            'function cleanAttrs(elem) {' ,
                'elem.removeAttribute("onload");' ,
                'elem.removeAttribute("onerror");' ,
                'try {' ,
                    'elem.onload = null;' ,
                    'elem.onerror = null;' ,
                    'delete elem.onload;' ,
                    'delete elem.onerror;' ,
                '} catch (e) {}' ,
            '}' ,
            'function setImageSize(img) {' ,
                'var width, height, sizeBox;' ,
                'if (!isButtonImage(img)) {' ,
                    'width = img.naturalWidth || img.width || img.clientWidth || img.innerWidth;' ,
                    'height = img.naturalHeight || img.height || img.clientHeight || img.innerHeight;' ,
                    'sizeBox = img.parentNode.parentNode.querySelector("." + params.sizeBoxClass);' ,
                    'if (sizeBox) {' ,
                        'sizeBox.innerHTML = [' ,
                            '(width < 500 || height < 500) ? "<strong style=color:#ff4465>" : "<span>",' ,
                            'width + "x" + height,' ,
                            '(width < 500 || height < 500) ? "</strong>" : "</span>"' ,
                        '].join("");' ,
                    '}' ,
                '}' ,
            '}' ,
            'function removeFrame() {' ,
                'var doc, iframe;' ,
                'doc = getDoc();' ,
                'iframe = doc.getElementById(params.iframeId);' ,
                'iframe.parentNode.removeChild(iframe);' ,
            '}' ,
            'function doClick(element) {' ,
                'var event = element.ownerDocument.createEvent("MouseEvents");' ,
                'event.initMouseEvent(' ,
                    '"click", true, true,' ,
                    'element.ownerDocument.defaultView,' ,
                    '1, 0, 0, 0, 0,' ,
                    'false, false, false, false,' ,
                    '0, element' ,
                ');' ,
                'element.dispatchEvent(event);' ,
            '}' ,
            'function setImageStyle(img, old) {' ,
                'var width, height, ratio, newWidth, newHeight;' ,
                '' ,
                'if (isButtonImage(old)) {' ,
                    'with (img.style) {' ,
                        'border = "1px solid #8888ff";' ,
                        'background = "#eeeeff";' ,
                        'color = "#8888ff";' ,
                        'padding = "3px";' ,
                        'margin = "2px 4px";' ,
                        'fontSize = "11px";' ,
                        'cursor = "pointer";' ,
                        'maxHeight = "50px";' ,
                        'userSelect = "none";' ,
                        'MozUserSelect = "none";' ,
                        'OUserSelect = "none";' ,
                        'KhtmlUserSelect = "none";' ,
                        'WebkitUserSelect = "none";' ,
                    '}' ,
                    'img.setAttribute("class", "mini-thumbnail-image-for-popup");' ,
                    'img.setAttribute("title", old.getAttribute("title"));' ,
                    '' ,
                    'return img;' ,
                    '' ,
                '} else if (isPopupImage(old)) {' ,
                    '' ,
                    '//popupImageLoadedHandler(img);' ,
                    'return img;' ,
                    '' ,
                '} else {' ,
                    '' ,
                    'width = img.naturalWidth || img.width || img.clientWidth;' ,
                    'height = img.naturalHeight || img.height || img.clientHeight;' ,
                    'try {' ,
                        'if (img.parentNode.parentNode.querySelector("." + params.imageShowButtonClass).innerHTML.length === 0 ) {' ,
                            'img.parentNode.parentNode.querySelector("." + params.imageShowButtonClass).innerHTML = [' ,
                                '(width < 500 || height < 500) ? "<strong style=color:#ff4465>" : "<span>",' ,
                                'width + "x" + height,' ,
                                '(width < 500 || height < 500) ? "</strong>" : "</span>"' ,
                            '].join("");' ,
                        '}' ,
                    '} catch (e) {}' ,
                    'if (width > height) {' ,
                        'ratio = height / width;' ,
                        'newWidth = params.THUMB_MAX_HEIGHT;' ,
                        'newHeight = height * ratio;' ,
                    '} else {' ,
                        'ratio = width / height;' ,
                        'newHeight = params.THUMB_MAX_HEIGHT;' ,
                        'newWidth = width * ratio;' ,
                    '}' ,
                    'img.style.maxWidth = Math.floor(newWidth) + "px";' ,
                    'img.style.maxHeight = Math.floor(newHeight) + "px";' ,
                    'img.className = params.thumbnailPrototypeImageClass;' ,
                    'with (img.style) {' ,
                        'border = "0 none";' ,
                        'margin = "0";' ,
                        'padding = "0";' ,
                        'verticalAlign = "top";' ,
                        'opacity = 1;' ,
                        'cursor = "pointer";' ,
                    '}' ,
                '}' ,
            '}' ,
            'function popupImageLoadedHandler(img, frame, popup) {' ,
                'var orgWidth, orgHeight, node, percent;' ,
                'if (!frame) {' ,
                    'node = img.parentNode;' ,
                    'while (node && String(node.tagName).toLowerCase() !== "body") {' ,
                        'if ( hasClass(node, "pot-2ch-browser-popup-frame") ) {' ,
                            'frame = node;' ,
                            'break;' ,
                        '}' ,
                        'node = node.parentNode;' ,
                    '}' ,
                '}' ,
                'if (!popup) {' ,
                    'node = img.parentNode;' ,
                    'while (node && String(node.tagName).toLowerCase() !== "body") {' ,
                        'if ( hasClass(node, "pot-2ch-browser-popup-dialog") ) {' ,
                            'popup = node;' ,
                            'break;' ,
                        '}' ,
                        'node = node.parentNode;' ,
                    '}' ,
                '}' ,
                'if (img && frame && popup) {' ,
                    'orgWidth = img.naturalWidth || img.width || img.clientWidth || img.innerWidth;' ,
                    'orgHeight = img.naturalHeight || img.height || img.clientHeight || img.innerHeight;' ,
                    'percent = 0.8;' ,
                    'if (window.parent.innerWidth * percent < img.width) {' ,
                        'img.height = Math.floor(img.height * window.parent.innerWidth * percent / img.width);' ,
                        'img.width = Math.floor(window.parent.innerWidth * percent);' ,
                    '}' ,
                    'if (window.parent.innerHeight * percent < img.height) {' ,
                        'img.width = Math.floor(img.width * window.parent.innerHeight * percent / img.height);' ,
                        'img.height = Math.floor(window.parent.innerHeight * percent);' ,
                    '}' ,
                    'with (img.style) {' ,
                        'margin = 0;' ,
                        'border = 0;' ,
                        'padding = 0;' ,
                        'display = "block";' ,
                        'maxWidth = img.width;' ,
                        'maxHeight = img.height;' ,
                    '}' ,
                    '' ,
                    'try {' ,
                        'popup.querySelector(".popup-image-size-container").innerHTML = [' ,
                            '(orgWidth < 500 || orgHeight < 500) ? "<strong style=color:#ff4465>" : "<span>",' ,
                            'orgWidth + "x" + orgHeight,' ,
                            '(orgWidth < 500 || orgHeight < 500) ? "</strong>" : "</span>"' ,
                        '].join(""));' ,
                    '} catch (e) {}' ,
                    '' ,
                    'img.width = orgWidth;' ,
                    'img.height = orgHeight;' ,
                    '' ,
                    'img.removeAttribute("width");' ,
                    'img.removeAttribute("height");' ,
                    '' ,
                    'frame.style.width  = (img.style.maxWidth  + 20) + "px";' ,
                    'frame.style.height = (img.style.maxHeight + 20) + "px";' ,
                    'frame.style.display = "block";' ,
                    '' ,
                    'popup.style.left = "-99999px";' ,
                    'popup.style.top = "-99999px";' ,
                    'popup.style.display = "block";' ,
                    '' ,
                    'toCenterMiddle( popup );' ,
                    'popup.style.display = "block";' ,
                '}' ,
            '}' ,
            'function getScreenInfo(key) {' ,
                'var d, de, db, sc, win, info;' ,
                'd = window.parent.document || {};' ,
                'de = d.documentElement || {};' ,
                'db = d.body  || {};' ,
                'win = window.parent || {};' ,
                'sc = win.screen  || {};' ,
                'info = {' ,
                  'width: db.clientWidth || de.clientWidth || sc.availWidth ||' ,
                         'win.innerWidth || win.width      || sc.width      || 800,' ,
                  'height: db.clientHeight || db.scrollHeight || de.clientHeight ||' ,
                          'sc.availHeight  || win.innerHeight || win.height ||' ,
                          'sc.height || 600,' ,
                  'availHeight: win.innerHeight ||' ,
                               'de.clientHeight || sc.availHeight || 600,' ,
                  'x: win.scrollX || db.scrollLeft || de.scrollLeft || 0,' ,
                  'y: win.scrollY || db.scrollTop  || de.scrollTop  || 0' ,
                '};' ,
                'return (key && (key in info)) ? info[key] : info;' ,
            '}' ,
            'function toCenterMiddle(elem) {' ,
                'var info = getScreenInfo(), left, top;' ,
                'if (elem) {' ,
                  'if (elem.jquery) {' ,
                    'left = elem.width();' ,
                    'top = elem.height();' ,
                  '} else {' ,
                    'left = elem.style && parseInt(elem.style.width);' ,
                    'if (isNaN(left - 0)) {' ,
                      'left = elem.offsetWidth;' ,
                    '}' ,
                    'top = elem.style && parseInt(elem.style.height);' ,
                    'if (isNaN(top - 0)) {' ,
                      'top = elem.offsetHeight;' ,
                    '}' ,
                  '}' ,
                  'if (!isNaN(Number(left)) && !isNaN(Number(top))) {' ,
                    'left = Math.floor(info.x + (info.width  / 2) - (left / 2));' ,
                    'top = Math.floor(info.y + (info.availHeight / 2) - (top  / 2));' ,
                    'if (elem.jquery) {' ,
                      'elem.css({ left: left, top: top });' ,
                    '} else {' ,
                      'elem.style.left = left + "px";' ,
                      'elem.style.top  = top  + "px";' ,
                    '}' ,
                  '}' ,
                '}' ,
                'return elem;' ,
            '}' ,
            '</script></head><body><h1>Error</h1>' ,
            '<img src="{{IMAGE_SRC}}" onload="onLoaded(this)" onerror="onFailed(this)" id="{{NEW_IMAGE_ID}}"/>' ,
            '</body></html>'
        ].join('\n').replace(/\{\{([A-Z_]+)\}\}/g, function(all, id) {
          return (id in params) ? params[id] : "";
        });
        document.body.appendChild(iframe);
    } catch (e) {}
}




function getNumberFromLink(target) {
    var result, id, number, parent, child, childs, re, tagName;
    tagName = function(el) {
        return String(el.tagName || '').toLowerCase();
    };
    try {
        target = target.jquery ? target.get(0) : target;
        parent = target.parentNode;
        while (parent && tagName(parent) !== "dd") {
            parent = parent.parentNode;
        }
        while (parent && tagName(parent) !== "dt") {
            parent = parent.previousSibling;
        }
        if (parent && tagName(parent) === "dt") {
            re = /^[\s\u3000]*(\d+)/;
            try {
                number = parent.textContent.match(re)[1];
            } catch (e) {
                try {
                    number = parent.innerHTML.replace(/<\/?\w+[^>]*>/g, "").match(re)[1];
                } catch (e) {}
            }
            childs = parent.childNodes;
            for (i = 0; i < childs.length; i++) {
                child = childs[i];
                if (child && child.id && child.id.length) {
                    id = child.id;
                    break;
                }
            }
        }
    } catch (e) {}
    if (!id || !number) {
        try {
            parent = $(target).parents("dd").prev("dt");
            if (!parent.length || tagName(parent.get(0)) !== "dt") {
                parent = $(target).parents("dd").prevUntil("dt");
            }
            if (!number) {
                number = parent.text().match(/^[^\d]*(\d+)/)[1];
            }
            if (!id) {
                id = $("*[id]", parent).attr("id");
            }
        } catch (e) {}
    }
    return {
        id: id,
        number: number
    };
}


function appendThumbnailListButton() {
    var div, button;
    div = $("<div/>")
        .css({
            textAlign: "center",
            margin: 10,
            padding: 10
        });
    
    button = $("<button/>")
        .text("画像サムネイル一覧を作るよっ!!")
        .attr({
            title: "画像サムネイル一覧をつくるるんだよっ☆ﾟ+｡",
            id: Pot.THUMB_INIT_BUTTON_ID
        })
        .css({
            margin: 20,
            padding: "5px 10px",
            border: "2px solid #7777ff",
            background: "#ddddff",
            color: "#6666ff",
            userSelect: "none",
            MozUserSelect: "none",
            OUserSelect: "none",
            KhtmlUserSelect: "none",
            WebkitUserSelect: "none",
            MozBorderRadius: "5px",
            borderRadius: "5px",
            verticalAlign: "middle",
            cursor: "pointer",
            opacity: 0.75
        })
        .click(function(event) {
            setTimeout(function() {
                var arrow;
                if ( $("#" + Pot.THUMB_PANEL_ID).length === 0 ) {
                    arrow = $("<div/>")
                        .css({
                            fontWeight: "bold",
                            fontSize: "large",
                            color: "#3366ff"
                        })
                        .text("↓")
                        .appendTo(div);
                    createThumbnailList();
                    $(button)
                        //.text("+｡★┣¨ｷ☆(*///∇///*)★┣¨ｷ☆･ﾟ")
                        .text("「」")
                        .removeAttr("title");
                }
            }, 10);
        })
        .hover(
            function() {
                $(this).css({
                    opacity: 1,
                    borderColor: "#55cc66",
                    background: "#ccffc9",
                    color: "#339955"
                });
            },
            function() {
                $(this).css({
                    opacity: 0.75,
                    borderColor: "#7777ff",
                    background: "#ddddff",
                    color: "#6666ff"
                });
            }
        );
    $(button).appendTo(div);
    $(div).appendTo("body");
}


function createThumbnailList() {
    var panel;
    if ( $("#" + Pot.THUMB_PANEL_ID).length === 0 ) {
        panel = $("<div/>")
            .attr({
                id: Pot.THUMB_PANEL_ID
            })
            .css({
                margin: 10,
                padding: 10,
                border: "2px solid #aaa",
                MozBorderRadius: "5px",
                borderRadius: "5px",
                background: "#f8f8f8",
                maxWidth: "95%",
                width: "94%"
            })
            .appendTo("body");
        
        $(panel).after(
            $("<div/>").css({ clear: "both" })
        );
        $.scrollTo(panel, 800, {
            offset: -10
        });
        setTimeout(function() { processThumbnailImage(panel); }, 0);
    }
}


function createThumbnailImage(url, target, panel) {
    setTimeout(function() {
        createThumbnailImageTrapper(url, target, panel);
    }, rand(100, 550));
}


function createThumbnailImageTrapper(url, target, panel) {
    var img, link, wrapper, linker, infos, imageDataURI, linkerWrap, clearfix, showWrapper;
    infos = getNumberFromLink(target);
    showWrapper = function() {
        if ( !$(wrapper).attr("showing") ) {
            $(wrapper)
                .attr({
                    showing: "true"
                })
                .animate({
                    opacity: 1
                }, {
                    duration: 800,
                    easing: "linear",
                    step: function() {
                        $(wrapper).css({
                            opacity: $(wrapper).css("opacity") + 0.05
                        });
                    },
                    complete: function() {
                        $(wrapper)
                            .css({
                                opacity: 1
                            });
                        setTimeout(function() {
                            $(wrapper).removeAttr("showing");
                        }, 5000);
                    }
                });
        }
    };
    img = $("<img/>")
        .load(function() {
            var image, width, height, ratio, newWidth, newHeight;
            image = $(this).get(0);
            width = image.naturalWidth || image.width || image.clientWidth;
            height = image.naturalHeight || image.height || image.clientHeight;
            
            if ( $(image).parent().parent().find(".thumbnail-image-size-viewer").text().length === 0 ) {
                $(image)
                    .parent()
                    .parent()
                    .find(".thumbnail-image-size-viewer")
                    .html([
                        (width < 500 || height < 500) ? '<strong style="color:#ff4465;">' : '<span>',
                        width + "x" + height,
                        (width < 500 || height < 500) ? '</strong>' : '</span>'
                    ].join(""));
            }
            
            if (width > height) {
                ratio = height / width;
                newWidth = Pot.THUMB_MAX_HEIGHT;
                newHeight = height * ratio;
            } else {
                ratio = width / height;
                newHeight = Pot.THUMB_MAX_HEIGHT;
                newWidth = width * ratio;
            }
            $(image)
                .show()
                .css({
                    maxWidth: Math.floor(newWidth),
                    maxHeight: Math.floor(newHeight),
                    display: "inline"
                });
            showWrapper();
        })
        .addClass("thumbnail-prototype-image")
        .css({
            border: "0 none",
            margin: 0,
            padding: 0,
            verticalAlign: "top",
            opacity: 1,
            display: "none",
            cursor: "pointer"
        })
        .attr({
            id: toUniqId("image"),
            src: url
        })
        //.hover(
        //    function() { $(this).css({ opacity: 1/*0.75*/ });  },
        //    function() { $(this).css({ opacity: 1    });  }
        //)
        ;
    
    link = $("<a/>")
        .css({
            border: "2px solid #aaa",
            margin: 5,
            padding: 0,
            display: "inline-block",
            float: "left"
        })
        .attr({
            href: url,
            target: "_blank",
            id: toUniqId("imglink")
        })
        .click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            showImgPopup(event, null);
            return false;
        });
    
    wrapper = $("<div/>")
        .css({
            margin: 5,
            padding: 5,
            display: "inline-block",
            opacity: 0
        })
        .addClass("thumbnail-image-list-wrapper");
    
    linker = $("<a/>")
        .css({
            fontSize: "11px",
            paddingBottom: 3,
            fontFamily: "verdana",
            textDecoration: "underline",
            float: "left"
        })
        .attr({
            href: "javascript:void(';_;')",
            title: "リンク先が取得できなかったｳﾜｧｧ-----｡ﾟ(ﾟ´Д｀ﾟ)ﾟ｡-----ﾝ!!!!"
        })
        .hover(
            function() { $(this).css({ textDecoration: "none"      }) },
            function() { $(this).css({ textDecoration: "underline" }) }
        )
        .text(">>" + (infos.number || "?"));
    
    if (infos.id) {
        linker
            .click(function() {
                $.scrollTo("#" + infos.id, 800);
            })
            .attr({
                title: ">>" + infos.number + " にトブお☆ヾ(@゜∇゜@)ノ ｼﾞｬ-ﾝﾌﾟ",
                res: infos.number
            })
            ;
            //.mouseover(function(event) {
            //    showResPopup(event, null);
            //});
    }
    imageDataURI = $("<a/>")
        .addClass("thumbnail-image-uri-to-org-switcher")
        .text("再取得")
        .attr({
            title: [
                "リンク切れなら…、も、もう一回取ってくれば…い、いい、いいんでしょ…っ！！",
                "べっ、べべべべつに暇つぶしに作っただけなんだからっ！！",
                "あ、あんたのためなんかじゃ……ためなんかじゃ……な………っっっ！…",
                "もうっ………バカッ！！！"
            ].join("\n"),
            href: "javascript:void(0)"
        })
        .css({
            fontSize: "11px",
            paddingButtom: 3,
            paddingLeft: 5,
            fontFamily: "verdana",
            textDecoration: "underline",
            float: "right"
        })
        .hover(
            function() { $(this).css({ textDecoration: "none"      }) },
            function() { $(this).css({ textDecoration: "underline" }) }
        )
        .click(function(event) {
            
            if ( $(this).hasClass("thumbnail-data-uri-image-loading") ) {
                return;
            }
            
            if ( $(link).find(".thumbnail-data-uri-image").length === 0 ) {
                
                var self = $(this), orgText = self.text();
                
                self
                    .addClass("thumbnail-data-uri-image-loading")
                    .text("Loading...");
                
                setTimeout(function() {
                    createImageDataCache(url, function(dataimg) {
                        var dataimgElem = $(dataimg).get(0);
                        
                        $(dataimg)
                            .addClass("thumbnail-data-uri-image")
                            .css({
                                display: "inline-block",
                                border: "0 none",
                                margin: 0,
                                padding: 0,
                                maxHeight: 0
                            })
                            .removeAttr("width")
                            .removeAttr("height")
                            .appendTo(link);
                        
                        setTimeout(function() {
                            if ( $(dataimg).text().length === 0 ) {
                                $(imageSize)
                                    .html((function() {
                                        var width = dataimgElem.naturalWidth || dataimgElem.width || dataimgElem.clientWidth || dataimgElem.innerWidth;
                                        var height = dataimgElem.naturalHeight || dataimgElem.height || dataimgElem.clientHeight || dataimgElem.innerHeight;
                                        return [
                                            (width < 500 || height < 500) ? '<strong style="color:#ff4465;">' : '<span>',
                                            width + "x" + height,
                                            (width < 500 || height < 500) ? '</strong>' : '</span>'
                                        ].join("");
                                    })());
                            }
                        }, 150);
                        
                        self
                            .text("")
                            .removeClass("thumbnail-data-uri-image-loading")
                            .click();
                        setTimeout(function() {
                            if ( !self.text() ) {
                                self.text(orgText);
                            }
                        }, 0);
                    });
                }, 0);
                
                return;
            }
            
            
            
            
            if ( $(this).hasClass("using-data-uri-image") ) {
                $(this)
                    .parents(".thumbnail-image-list-wrapper")
                    .find("img.image-cache-data-uri")
                    .animate({
                        maxHeight: 1
                    }, {
                        duration: "fast",
                        complete: function() {}
                    });
                $(this)
                    .parents(".thumbnail-image-list-wrapper")
                    .find("img.thumbnail-prototype-image")
                    .css({
                        maxHeight: 1
                    })
                    .show()
                    .animate({
                        maxHeight: Pot.THUMB_MAX_HEIGHT
                    }, {
                        duration: "normal",
                        complete: function() {
                            var tmp = $(link).attr("orghref");
                            $(link).attr({
                                href: tmp
                            });
                        }
                    });
                $(this)
                    .removeClass("using-data-uri-image")
                    .text("再取得");
            } else {
                $(this)
                    .parents(".thumbnail-image-list-wrapper")
                    .find("img.thumbnail-prototype-image")
                    .animate({
                        maxHeight: 1
                    }, {
                        duration: "fast",
                        complete: function() {
                            var tmp = $(link).attr("href");
                            $(link).attr({
                                href: "javascript:void(0)",
                                orghref: tmp
                            });
                        }
                    });
                $(this)
                    .parents(".thumbnail-image-list-wrapper")
                    .find("img.image-cache-data-uri")
                    .css({
                        maxHeight: 1
                    })
                    .show()
                    .animate({
                        maxHeight: Pot.THUMB_MAX_HEIGHT
                    }, {
                        duration: "normal",
                        complete: function() {
                            $(this).css({ maxHeight: Pot.THUMB_MAX_HEIGHT });
                        }
                    });
                $(this)
                    .addClass("using-data-uri-image")
                    .text("元の画像を表示");
            }
        });
    
    var footer = $("<div/>")
        .css({
            textAlign: "right",
            fontSize: "11px",
            margin: 0,
            padding: "3px 0 3px 0",
            fontFamily: "verdana"
        });
    
    var imageSize = $("<span/>")
        .addClass("thumbnail-image-size-viewer")
        .appendTo(footer);
    
    var removeBtn = $("<a/>")
        .addClass("thumbnail-remove-image-link")
        .attr({
            href: "javascript:void(0)",
            title: "画像を消去するよ…？いいの？\r\nいいい、い、いいんだよねっ!??\r\n…し、知らないんだからっ!!!!!"
        })
        .text("消去")
        .css({
            display: "inline-block",
            padding: "0 5px",
            textDecoration: "underline"
        })
        .hover(
            function() { $(this).css({ textDecoration: "none"      }) },
            function() { $(this).css({ textDecoration: "underline" }) }
        )
        .click(function() {
            var imgwrap = $(this).parent().parent(".thumbnail-image-list-wrapper");
            imgwrap.hide("slow", function() { $(imgwrap).empty().remove() });
        })
        .appendTo(footer);
    
    linkerWrap = $("<div/>");
    clearfix = $("<div/>").css({ clear: "both" });
    $(img).appendTo(link);
    
    /*
    // 画像の取得を確実にするためキャッシュする
    setTimeout(function() {
        createImageDataCache(url, function(dataimg) {
            $(dataimg)
                .addClass("thumbnail-data-uri-image")
                .css({
                    display: "inline-block",
                    border: "0 none",
                    margin: 0,
                    padding: 0,
                    maxHeight: 0
                })
                .removeAttr("width")
                .removeAttr("height")
                .appendTo(link);
            
            //if (/^data:image.{50}/i.test($(dataimg).attr("src"))) {
            //
                //$(dataimg).parents(".thumbnail-image-list-wrapper").find("img.thumbnail-prototype-image").hide();
                //$(dataimg).show();
                //
                
                //setTimeout(function() {
                //    $(dataimg)
                //        .parent()
                //        .parent(".thumbnail-image-list-wrapper")
                //        .find(".thumbnail-image-uri-to-org-switcher")
                //        .click();
                //}, rand(2500, 3500));
                
            //}
        });
    }, 1000);
    */
    
    $(linker).appendTo(linkerWrap);
    $(imageDataURI).appendTo(linkerWrap);
    $(linkerWrap).after(clearfix);
    $(linkerWrap).appendTo(wrapper);
    $(link).appendTo(wrapper);
    $(link).after(footer);
    $(wrapper).appendTo(panel);
    showWrapper();
    
    Pot.thumbImagePushCount--;
}



function putNextStepButtonForThumbnailImage() {
    var panel, button, args = arguments, removeButton, self = args.callee;
    try {
        if (Pot.thumbImagePushCount > 0) {
            throw "continue";
        }
    } catch (e) {
        setTimeout(function() { self.apply(self, args); }, rand(50, 250));
        return;
    }
    panel = $("#" + Pot.THUMB_PANEL_ID);
    button = $("<div/>")
        .css({
            display: "inline-block",
            fontFamily: "verdana",
            fontSize: "12px",
            margin: 20,
            padding: "5px 10px",
            border: "1px solid #7777ff",
            background: "#ddddff",
            color: "#6666ff",
            userSelect: "none",
            MozUserSelect: "none",
            OUserSelect: "none",
            KhtmlUserSelect: "none",
            WebkitUserSelect: "none",
            MozBorderRadius: "5px",
            borderRadius: "5px",
            verticalAlign: "middle",
            cursor: "pointer",
            opacity: 0.75
        })
        .hover(
            function() {
                $(this).css({
                    opacity: 1,
                    borderColor: "#55cc66",
                    background: "#ccffc9",
                    color: "#339955"
                });
            },
            function() {
                $(this).css({
                    opacity: 0.75,
                    borderColor: "#7777ff",
                    background: "#ddddff",
                    color: "#6666ff"
                });
            }
        )
        .text(">> 次の画像を読み込むよっ!! >>");
    
    removeButton = button.clone()
        .addClass("thumbnail-image-all-remove-button")
        .css({
            fontSize: "11px",
            border: "1px solid #ff8877",
            background: "#ffdfdd",
            color: "#ff7766",
            userSelect: "none",
            MozUserSelect: "none",
            OUserSelect: "none",
            KhtmlUserSelect: "none",
            WebkitUserSelect: "none"
        })
        .hover(
            function() {
                $(this).css({
                    opacity: 1,
                    borderColor: "#cc6655",
                    background: "#ffccc9",
                    color: "#995533"
                });
            },
            function() {
                $(this).css({
                    opacity: 0.75,
                    borderColor: "#ff8877",
                    background: "#ffdfdd",
                    color: "#ff7766"
                });
            }
        )
        .text("×すべて消去×")
        .attr({
            title: "表示されてる画像をすべて消去するよ？\r\n ……いいの？\r\n ほ、本気なんだからねっ!!"
        })
        .click(function() {
            var imgwraps = $("#" + Pot.THUMB_PANEL_ID).find(".thumbnail-image-list-wrapper");
            imgwraps.hide("slow", function() { $(this).remove() });
        })
        .appendTo( $("#" + Pot.THUMB_PANEL_ID) );
    
    $(button)
        .click(function() {
            var self = $(this);
            self.hide("normal", function() {
                var allRemoveBtn = $(".thumbnail-image-all-remove-button");
                allRemoveBtn.hide("fast", function() {
                    allRemoveBtn.empty().remove();
                });
                self.empty().remove();
                setTimeout(function() {
                    $.scrollTo({ top: "+=100px" }, 1000);
                }, 500);
                processThumbnailImage( $("#" + Pot.THUMB_PANEL_ID) );
            });
        })
        .appendTo( $("#" + Pot.THUMB_PANEL_ID) );
}


function processThumbnailImage(panel) {
    var url, link, patterns, end;
    patterns = {
        protocol: /^(?:http|ftp)/,
        extension: /\.(?:jpe?g|png|gif|bmp|ico|svg)(?:\.\w+)?(?:[!?#].*)?$/i
    };
    end = function() {
        $("<div/>").css({ color: "#333" }).text("もう…ないよ……").appendTo( $("#" + Pot.THUMB_PANEL_ID) );
    };
    do {
        link = Pot.thumbLinks.shift();
        if (link && link.length) {
            url = link.attr("href");
            if (patterns.extension.test(url) && patterns.protocol.test(url)) {
                if (!inArray(Pot.thumbImageURLCache, url)) {
                    (function(uri, elem) {
                        setTimeout(function() {
                            createThumbnailImage(uri, elem, panel);
                        }, 250);
                        Pot.thumbImageURLCache.push(uri);
                        Pot.thumbImagePushCount++;
                    })(url, link);
                }
            }
        }
    } while (Pot.thumbImagePushCount < Pot.THUMB_MAX_IMAGE_LOOPCOUNT && Pot.thumbLinks.length > 0);
    
    if (Pot.thumbImagePushCount > 0 && Pot.thumbLinks.length > 0) {
        setTimeout(function() {
            putNextStepButtonForThumbnailImage();
        }, 250);
    } else {
        setTimeout(function() { end() }, 500);
    }
}


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function toUniqId(prefix) {
    return [
        String(prefix),
        (new Date).getTime(),
        Math.random().toString(36).split('.').pop()
    ].join("");
}


function createImageDataCache(url, func) {
    var params, callback;
    callback = function(data, type, res, headers) {
        try {
            var img = $("<img/>")
                .addClass("image-cache-data-uri")
                .css({
                    border: "0 none",
                    maxHeight: Pot.THUMB_MAX_HEIGHT
                })
                .attr({
                    src: toDataScheme(data, type),
                    orgurl: url
                })
                .hide();
        } catch (e) {}
        (func || (function() {})).call(null, img);
        return img;
    };
    params = {
        url: url,
        callback: callback
    };
    setTimeout(function() { getBinaryFile(params); }, rand(100, 1000));
}


/**
 * リモートの画像ファイルのバイナリデータを非同期で取得
 *
 * @param  {Object}  params    パラメータ
 *                             - url: 対象の画像URL (必須)
 *                             - callback: 成功時に呼ばれるコールバック関数 (必須)
 *                                * 引数 1: {String} data     取得したバイナリデータ
 *                                * 引数 2: {String} type     画像の Content-Type
 *                                * 引数 3: {Object} res      HTTPレスポンスそのもの (e.g. res.responseText)
 *                                * 引数 4: {Object} headers  レスポンスヘッダー
 *                             - context: callback の this になるもの
 *                             - type: 画像の Content-Type がわかってる場合設定しておくと確実 (e.g. 'image/png')
 *
 * @return {Void}
 */
var getBinaryFileRetryCount = 2;
function getBinaryFile(params) {
    var args = arguments, callback, trim, parseHeaders, getContentType, toBinary,
        fixContentType, retry;
    
    retry = function() {
        if (--getBinaryFileRetryCount >= 0) {
            setTimeout(function() {
                args.callee.apply(args.callee, Array.prototype.slice.call(args));
            }, 2500);
        } else {
            getBinaryFileRetryCount = 2;
        }
    };
    
    trim = function(s) {
        return String(s || "").replace(/^[\s\u3000\u00A0]+|[\s\u3000\u00A0]+$/g, "");
    };
    parseHeaders = function(res) {
        var results = {}, items;
        try {
            res.responseHeaders.split(/[\r\n]+/).forEach(function(header) {
                items = trim(header).split(/\s*:\s*/, 2);
                results[trim(header.shift()).toLowerCase()] = trim(header.shift());
            });
        } catch (e) {}
        return results;
    };
    getContentType = function(url) {
        var result, items, ext, maps = {
            png: "image/png",
            jpe: "image/jpeg",
            jpeg: "image/jpeg",
            jpg: "image/jpeg",
            gif: "image/gif",
            bmp: "image/bmp",
            ico: "image/vnd.microsoft.icon",
            tiff: "image/tiff",
            tif: "image/tiff",
            svg: "image/svg+xml",
            svgz: "image/svg+xml"
        };
        items = trim(url).replace(/[!?#].*$/g, "").split(".");
        do {
            ext = trim(items.pop()).toLowerCase();
        } while (!ext || !ext.length);
        
        result = (ext in maps) ? maps[ext] : "application/octet-stream";
        return result;
    };
    toBinary = function(utf16data) {
        return utf16data.replace(/[\u0100-\uFFFF]/g, function(m) {
            return String.fromCharCode(m.charCodeAt(0) & 0xff);
        });
    };
    fixContentType = function(data, deftype) {
        var type, top, length, uri;
        length = 8;
        type = deftype;
        if (!/^image\//i.test(type)) {
            top = data.slice(0, length);
            uri = "x.";
            if (/^[\x89]PNG/.test(top)) {
                uri += "png";
            } else if (/^GIF8\d/.test(top)) {
                uri += "gif";
            } else if (/^[\xFF][\xD8]/.test(top)) {
                uri += "jpg";
            } else if (/^BM/.test(top)) {
                uri += "bmp";
            }
            type = getContentType(uri);
        }
        return type;
    };
    callback = function(res) {
        var data, type, headers, key;
        try {
            if (res.status != 200) {
                throw "HTTP " + res.status;
            }
            headers = parseHeaders(res);
            data = toBinary(res.responseText);
            if (params.type && typeof params.type === "string") {
                type = params.type;
            } else {
                key = "content-type";
                type = (key in headers) ? headers[key] : getContentType(params.url);
                type = fixContentType(data, type);
            }
        } catch (e) {
            //GM_log(e);
        }
        return params.callback.call(
            params.context,
            data || "", type || "", res || {}, headers || {}
        );
    };
    params.callback = params.callback || (function() {});
    params.context = params.context || window;
    params.url = trim(params.url);
    params.type = params.type || "";
    if (params.url && params.url.length) {
        setTimeout(function() {
            GM_xmlhttpRequest({
                method: "GET",
                url: params.url,
                onload: callback,
                onerror: retry,
                overrideMimeType: "text/plain; charset=x-user-defined"
            });
        }, 500);
    }
}


function toDataScheme(data, type) {
    var value;
    try {
        value = ";base64," + btoa(data);
    } catch (e) {
        value = encodeURIComponent(data);
    }
    return [
        "data:",
        type || "*/*",
        value
    ].join("");
}

function inArray(array, value) {
    var exists, i = 0, len = array.length;
    do {
        exists = array[i] === value;
    } while (++i < len && !exists);
    return exists;
}

function trim(s) {
    return String(s || "").
        replace(/^[\s\u3000\u00A0]+|[\s\u3000\u00A0]+$/g, "");
}


//-----------------------------------------------------------------------------
// JSDeferred
//-----------------------------------------------------------------------------
/**
 * JSDeferred
 *
 * Usage:: with (D()) { your code }
 *
 * JSDeferred 0.4.0 Copyright (c) 2007 cho45 ( www.lowreal.net )
 *
 * See http://github.com/cho45/jsdeferred
 * http://cho45.stfuawsc.com/jsdeferred/
 *
 * Fixed.
 */
function D() {
  function Deferred() {
      return (this instanceof Deferred) ? this.init() : new Deferred();
  }
  Deferred.ok = function(x) { return x };
  Deferred.ng = function(x) { throw  x };
  Deferred.prototype = {
    _id: 0xe38286e381ae,
    init: function() {
      this._next = null;
      this.callback = {
          ok: Deferred.ok,
          ng: Deferred.ng
      };
      return this;
    },
    next: function(fun) { return this._post("ok", fun) },
    error: function(fun) { return this._post("ng", fun) },
    call: function(val) { return this._fire("ok", val) },
    fail: function(err) { return this._fire("ng", err) },
    cancel: function() {
      (this.canceller || function() {})();
      return this.init();
    },
    _post: function(okng, fun) {
      this._next = new Deferred();
      this._next.callback[okng] = fun;
      return this._next;
    },
    _fire: function(okng, value) {
      var next = "ok";
      try {
        value = this.callback[okng].call(this, value);
      } catch (e) {
        next = "ng";
        value = e;
        if (Deferred.onerror) {
          Deferred.onerror(e);
        }
      }
      if (Deferred.isDeferred(value)) {
        value._next = this._next;
      } else {
        if (this._next) {
          this._next._fire(next, value);
        }
      }
      return this;
    }
  };
  Deferred.isDeferred = function(obj) {
    return !!(obj && obj._id == Deferred.prototype._id);
  };
  Deferred.next_default = function(fun) {
    var d = new Deferred();
    var id = setTimeout(function() { d.call() }, 0);
    d.canceller = function() { clearTimeout(id) };
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_faster_way_readystatechange = 
    ((typeof window === 'object') && (location.protocol == "http:") &&
    !window.opera && /\bMSIE\b/.test(navigator.userAgent)) && function(fun) {
    var d = new Deferred();
    var t = new Date().getTime();
    if (t - arguments.callee._prev_timeout_called < 150) {
      var cancel = false;
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src  = "data:text/javascript,";
      script.onreadystatechange = function() {
        if (!cancel) {
          d.canceller();
          d.call();
        }
      };
      d.canceller = function() {
        if (!cancel) {
          cancel = true;
          script.onreadystatechange = null;
          document.body.removeChild(script);
        }
      };
      document.body.appendChild(script);
    } else {
      arguments.callee._prev_timeout_called = t;
      var id = setTimeout(function() { d.call() }, 0);
      d.canceller = function() { clearTimeout(id) };
    }
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_faster_way_Image = 
    ((typeof window === 'object') && (typeof(Image) != "undefined") &&
    !window.opera && document.addEventListener) && function(fun) {
    var d = new Deferred();
    var img = new Image();
    var handler = function() {
      d.canceller();
      d.call();
    };
    img.addEventListener("load", handler, false);
    img.addEventListener("error", handler, false);
    d.canceller = function() {
      img.removeEventListener("load", handler, false);
      img.removeEventListener("error", handler, false);
    };
    //### modified
    try {
        //img.src = "data:image/png," + Math.random();
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
    } catch (e) {}
    
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next_tick =
    (typeof process === 'object' &&
     typeof process.nextTick === 'function') && function(fun) {
    var d = new Deferred();
    process.nextTick(function() { d.call() });
    if (fun) {
      d.callback.ok = fun;
    }
    return d;
  };
  Deferred.next = Deferred.next_faster_way_readystatechange ||
                Deferred.next_faster_way_Image ||
                Deferred.next_tick ||
                Deferred.next_default;
  Deferred.chain = function() {
    var chain = Deferred.next();
    for (var i = 0, len = arguments.length; i < len; i++) (function(obj) {
      switch (typeof obj) {
        case "function":
          var name = null;
          try {
            name = obj.toString().match(/^\s*function\s+([^\s()]+)/)[1];
          } catch (e) {}
          if (name != "error") {
            chain = chain.next(obj);
          } else {
            chain = chain.error(obj);
          }
          break;
        case "object":
          chain = chain.next(function() { return Deferred.parallel(obj) });
          break;
        default:
          throw "unknown type in process chains";
      }
    })(arguments[i]);
    return chain;
  };
  Deferred.wait = function(n) {
    var d = new Deferred(), t = new Date();
    var id = setTimeout(function() {
      d.call((new Date).getTime() - t.getTime());
    }, n * 1000);
    d.canceller = function() { clearTimeout(id) };
    return d;
  };
  Deferred.call = function(fun) {
    var args = Array.prototype.slice.call(arguments, 1);
    return Deferred.next(function() {
        return fun.apply(this, args);
    });
  };
  Deferred.parallel = function(dl) {
    if (arguments.length > 1) {
      dl = Array.prototype.slice.call(arguments);
    }
    var ret = new Deferred(), values = {}, num = 0;
    for (var i in dl) if (dl.hasOwnProperty(i)) (function(d, i) {
      if (typeof d == "function") d = Deferred.next(d);
      d.next(function(v) {
        values[i] = v;
        if (--num <= 0) {
          if (dl instanceof Array) {
            values.length = dl.length;
            values = Array.prototype.slice.call(values, 0);
          }
          ret.call(values);
        }
      }).error(function (e) {
        ret.fail(e);
      });
      num++;
    })(dl[i], i);
    if (!num) Deferred.next(function() { ret.call() });
    ret.canceller = function() {
        for (var i in dl) if (dl.hasOwnProperty(i)) {
          dl[i].cancel();
        }
    };
    return ret;
  };
  Deferred.earlier = function(dl) {
    if (arguments.length > 1) {
      dl = Array.prototype.slice.call(arguments);
    }
    var ret = new Deferred(), values = {}, num = 0;
    for (var i in dl) if (dl.hasOwnProperty(i)) (function(d, i) {
      d.next(function(v) {
        values[i] = v;
        if (dl instanceof Array) {
          values.length = dl.length;
          values = Array.prototype.slice.call(values, 0);
        }
        ret.canceller();
        ret.call(values);
      }).error(function(e) {
        ret.fail(e);
      });
      num++;
    })(dl[i], i);
    if (!num) Deferred.next(function() { ret.call() });
    ret.canceller = function() {
      for (var i in dl) if (dl.hasOwnProperty(i)) {
        dl[i].cancel();
      }
    };
    return ret;
  };
  Deferred.loop = function(n, fun) {
    var o = {
      begin: n.begin || 0,
      end: (typeof n.end == "number") ? n.end : n - 1,
      step: n.step  || 1,
      last: false,
      prev: null
    };
    var ret, step = o.step;
    return Deferred.next(function() {
      function _loop(i) {
        if (i <= o.end) {
          if ((i + step) > o.end) {
            o.last = true;
            o.step = o.end - i + 1;
          }
          o.prev = ret;
          ret = fun.call(this, i, o);
          if (Deferred.isDeferred(ret)) {
            return ret.next(function (r) {
              ret = r;
              return Deferred.call(_loop, i + step);
            });
          } else {
            return Deferred.call(_loop, i + step);
          }
        } else {
          return ret;
        }
      }
      return (o.begin <= o.end) ? Deferred.call(_loop, o.begin) : null;
    });
  };
  Deferred.repeat = function(n, fun) {
    var i = 0, end = {}, ret = null;
    return Deferred.next(function() {
      var t = (new Date()).getTime();
      divide: {
        do {
          if (i >= n) break divide;
          ret = fun(i++);
        } while ((new Date()).getTime() - t < 20);
        return Deferred.call(arguments.callee);
      }
      return null;
    });
  };
  Deferred.register = function(name, fun) {
    this.prototype[name] = function() {
      var a = arguments;
      return this.next(function() {
        return fun.apply(this, a);
      });
    };
  };
  Deferred.register("loop", Deferred.loop);
  Deferred.register("wait", Deferred.wait);
  Deferred.connect = function(funo, options) {
    var target, func, obj;
    if (typeof arguments[1] == "string") {
      target = arguments[0];
      func = target[arguments[1]];
      obj = arguments[2] || {};
    } else {
      func = arguments[0];
      obj = arguments[1] || {};
      target = obj.target;
    }
    var partialArgs = obj.args ? Array.prototype.slice.call(obj.args, 0) : [];
    var callbackArgIndex = isFinite(obj.ok) ? obj.ok : 
                                   obj.args ? obj.args.length : undefined;
    var errorbackArgIndex = obj.ng;
    return function() {
      var d = new Deferred().next(function(args) {
        var next = this._next.callback.ok;
        this._next.callback.ok = function() {
          return next.apply(this, args.args);
        };
      });
      var args = partialArgs.concat(Array.prototype.slice.call(arguments, 0));
      if (!(isFinite(callbackArgIndex) && callbackArgIndex !== null)) {
        callbackArgIndex = args.length;
      }
      var callback = function() {
        d.call(new Deferred.Arguments(arguments))
      };
      args.splice(callbackArgIndex, 0, callback);
      if (isFinite(errorbackArgIndex) && errorbackArgIndex !== null) {
        var errorback = function() { d.fail(arguments) };
        args.splice(errorbackArgIndex, 0, errorback);
      }
      Deferred.next(function() { func.apply(target, args) });
      return d;
    }
  };
  Deferred.Arguments = function(args) {
    this.args = Array.prototype.slice.call(args, 0);
  };
  Deferred.retry = function (retryCount, funcDeferred, options) {
    if (!options) options = {};
    var wait = options.wait || 0;
    var d = new Deferred();
    var retry = function() {
      var m = funcDeferred(retryCount);
      m.next(function (mes) {
          d.call(mes);
        }).
        error(function(e) {
          if (--retryCount <= 0) {
            d.fail(['retry failed', e]);
          } else {
            setTimeout(retry, wait * 1000);
          }
        });
    };
    setTimeout(retry, 0);
    return d;
  };
  Deferred.methods = [
    "parallel", "wait", "next", "call", "loop", "repeat", "chain"
  ];
  Deferred.define = function (obj, list) {
    if (!list) list = Deferred.methods;
    if (!obj)  obj  = (function getGlobal() { return this })();
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      obj[n] = Deferred[n];
    }
    return Deferred;
  };
  this.Deferred = Deferred;
  function http(opts) {
    var d = Deferred();
    var req = new XMLHttpRequest();
    req.open(opts.method, opts.url, true);
    if (opts.headers) {
      for (var k in opts.headers) if (opts.headers.hasOwnProperty(k)) {
        req.setRequestHeader(k, opts.headers[k]);
      }
    }
    req.onreadystatechange = function() {
      if (req.readyState == 4) d.call(req);
    };
    req.send(opts.data || null);
    d.xhr = req;
    return d;
  }
  http.get = function(url) {
    return http({method: "get",  url: url});
  };
  http.post = function(url, data) {
    return http({
      method: "post",
      url: url, 
      data: data, 
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };
  http.jsonp = function(url, params) {
    if (!params) params = {};
    var Global = (function() { return this })();
    var d = Deferred();
    var cbname = params["callback"];
    if (!cbname) do {
      cbname = "callback" + String(Math.random()).slice(2);
    } while (typeof(Global[cbname]) != "undefined");
    params["callback"] = cbname;
    url += (url.indexOf("?") == -1) ? "?" : "&";
    for (var name in params) if (params.hasOwnProperty(name)) {
      url = url + encodeURIComponent(name) + "=" + 
                  encodeURIComponent(params[name]) + "&";
    }
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = url;
    document.body.appendChild(script);
    Global[cbname] = function callback(data) {
      delete Global[cbname];
      document.body.removeChild(script);
      d.call(data);
    };
    return d;
  };
  function xhttp(opts) {
    var d = Deferred();
    if (opts.onload)  d = d.next(opts.onload);
    if (opts.onerror) d = d.error(opts.onerror);
    opts.onload = function(res) {
      d.call(res);
    };
    opts.onerror = function(res) {
      d.fail(res);
    };
    setTimeout(function() {
      GM_xmlhttpRequest(opts);
    }, 0);
    return d;
  }
  xhttp.get = function(url) {
    return xhttp({method: "get", url: url});
  };
  xhttp.post = function(url, data) {
    return xhttp({
      method: "post",
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };
  Deferred.Deferred = Deferred;
  Deferred.http = http;
  Deferred.xhttp = (typeof(GM_xmlhttpRequest) == 'undefined') ? http : xhttp;
  return Deferred;
}
//-----------------------------------------------------------------------------
// End of JSDeferred
//-----------------------------------------------------------------------------


})();

