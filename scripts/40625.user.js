// ==UserScript==
// @name           nico_betterBrowse
// @version        0.3.53 (ββ)
// @author         iguu
// @description    ブラウジングを快適にする事が目標です。現在4つの機能があります。
// @namespace      http://blog.hexaedge.net/
// @include        http://*.nicovideo.jp/*
// @unwrap
// ==/UserScript==

/*------------------------------------------------------------------------------*/
// 1にすると機能がONになり、0にするとOFFになります。
var conf_preventHorizontalScroll = 1; //横スクロールを出さない(ハミ出ても出さない)
var conf_preventBrokenThumb	= 1; //サムネが読めないときのレイアウト崩壊を防ぎます
var conf_randomLink         = 0; //気まぐれジャンプのリンクを出します
var conf_pageAlign          = 0; //1=ページを左寄せにする 2=右寄せ
var conf_comToDefThreadLink	= 1; //制作中
var conf_r18tab             = 1; //ランキングにR-18タブを追加
/*------------------------------------------------------------------------------*/

debug=false;
/*************************************************************************/
if(debug && unsafeWindow.console.log){
	log = function(txt){unsafeWindow.console.log(txt)}
}else if(debug){
	log = function(txt){document.body.innerHTML="<li>"+txt+"</li>"+document.body.innerHTML}
}else{
	log = function(txt){}
}
/*************************************************************************/
function $css(css) {
    var style;
    style = document.createElement('style');
    style.type = 'text/css';
    if(window.addcss){
    	style.innerHTML = window.addcss.innerHTML;
    }
    style.innerHTML += css;
    window.addcss = style;
}

function $css_write() {
   if(window.addcss){
    var head;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    head.appendChild(window.addcss);
   }
}

String.prototype.replaceAll = function(str1,str2){
	var temp = this;
	while(temp.indexOf(str1) != -1){
		temp=temp.replace(str1,str2);
	};
	return temp;
};
/*************************************************************************/
var followBox = document.createElement("DIV");
followBox.id="followBox";
document.body.appendChild(followBox);
$css(
	"div#followBox {"+
		"width:auto;"+
		"position:fixed;"+
		"top:1px; left:1px;"+
		"text-align:right;"+
		"font-size:12px;"+
	"}"+
	"div#followBox a {"+
		"opacity:0.75;"+
		"margin:0 4px; padding:2px;"+
		"background-color:#333;"+
		"border:solid 1px #aaa;"+
		"color:#fff;"+
	"}"
);

/*************************************************************************/
if(conf_preventBrokenThumb){
$css(//サムネ切れテレビちゃん化
	"img.video_w48:-moz-broken, img.video_w80:-moz-broken, img.video_w96:-moz-broken, img.video_w128:-moz-broken, img.g-thumbnail-image:-moz-broken {"+
		"display:inline-block;"+
		"background-image:url(http://res.nicovideo.jp/img/base/head/icon/nico/000.gif);"+
		"background-repeat:no-repeat;"+
		"background-position:center center;"+
		"background-color:#fff;"+
		"color:#aaa;"+
		"font-size:0;"+
		"line-height:10px;"+
		"text-align:left;"+
		"overflow:hidden;"+
	"}"
	);
}
/*************************************************************************/
if(conf_preventHorizontalScroll){
	$css(//overflow-x
	"html {"+
		"margin-left:-2px;"+
		"overflow-x:hidden;"+
	"}"
	);
}
/*************************************************************************/
if(conf_pageAlign==1){
	$css("body {margin:0;background-position:left top;}");
}else if(conf_pageAlign==2){
	$css("body {margin:0 0 0 auto;background-position:right top;}");
}
/*************************************************************************/

if(conf_randomLink) {
	$css(
		"div.topline a {color:#fff;}"
	);
	
	//入れ物
	target = followBox;
	
	//材料
	f = document.getElementById("PAGEFOOTER");
	strong = f.getElementsByTagName("strong");
	nums_video = strong[0].innerHTML;
	nums_video = nums_video.replaceAll(",","");
	
	var knockTimes = 0;
	var knockLimit = 1;
	var wait       = 1000;
	if(knockLimit<=1){wait=0}
	
	var boost = 0;
	if(boost){
		knockLimit = 20;
		wait = 500;
	}
	
	findAvailableID = function(knock) {
		randmized_id = Math.floor(Math.random()*nums_video+1);
		url = "http://ext.nicovideo.jp/api/getthumbinfo/sm"+randmized_id;
		if(knock!==false){
			GM_xmlhttpRequest({
			    method : "GET",
			    url    : url,
			    onload : checkFoundID
			});
		}else{
			checkFoundID("");
		}
	}
	
    checkFoundID = function(res) {
		if(res && res.responseText.indexOf('status="fail"')!=-1 && knockTimes<knockLimit){
			if(knockTimes==0){randomlink.style.color="#ffaa00"}
			knockTimes++;
			if(knockLimit>2){randomlink.innerHTML = "探し中 "+knockTimes;}
			if(knockTimes<=knockLimit){
				setTimeout(function(){findAvailableID()},wait);
			}else{
				findAvailableID(false);
			}
		}else{
			location.href = "/watch/sm"+randmized_id;
		}
    }
	
	var sepa       = document.createTextNode(" | ");
	var randomlink = document.createElement("a");
	randomlink.addEventListener("click",findAvailableID,false);
	randomlink.innerHTML = "気まぐれ";
	randomlink.href = "javascript:;";
	//target.appendChild(sepa);
	target.appendChild(randomlink);
}
/*************************************************************************/
/*
if(conf_comToDefThreadLink && _unsafeWindow.Video){
	var Video = _unsafeWindow.Video;
	if(Video.id!=Video.v){
		alert("コミュニティ or チャンネル or マイメモリー");
	}
}
*/
/*************************************************************************/
if(conf_r18tab && unsafeWindow._udl){
	//alert(unsafeWindow._udl);
	//http://www.nicovideo.jp/ranking/mylist/daily/music/
	
	var rankingurl = location.href;
	p = rankingurl.split("/");
	if(p[3]=="ranking"&&p[5]!="hourly"&&p[6]!="ichiba"){
		var PAGEBODY = document.getElementById("PAGEBODY");
		var tds = PAGEBODY.getElementsByTagName("TD");
		var r18tab = document.createElement("A");
		if(p[6]=="r18"){
			r18tab.className = "tab_a0";
		}else{
			r18tab.className = "tab_a1";
		}
		r18tab.href = p[0]+"/"+p[1]+"/"+p[2]+"/"+p[3]+"/"+p[4]+"/"+p[5]+"/"+"r18";
		var div = document.createElement("DIV");
		div.innerHTML = "R-18";
		r18tab.appendChild(div);
		tds[0].appendChild(r18tab);
	}
}
/*************************************************************************/
$css_write();