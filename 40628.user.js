// ==UserScript==
// @name           nico_betterWatch
// @version        0.6.2.1 (ββ)
// @auther         iguu
// @namespace      http://blog.hexaedge.net/
// @include        http://*.nicovideo.*/watch*
// ==/UserScript==

/*******************************************************************************/
/***ココカラ*** 数字を変えると設定を変更できます*/
/* だいたい1にすると"変更する"、0だと"なにもしない"です */

var conf_autoScroll     = 1; //1=動画タイトルまで自動でスクロールする
var conf_Thumb          = 1; //1=タイトル横にサムネを表示
var conf_autoDarken     = 0; //1=勝手にまわりが暗くなります
var conf_descScroll     = 1; //1=動画説明の高さを固定してスクロール可能にします
var conf_compactButtons = 1; //"～する"リンクとボタンを一行にします。

/***ココマデ*** 数字で設定を変更できます*/
/*******************************************************************************/


var _test = false;
var debug = false;

/*----------------------------------------------------------------*/
/*----------------------------------------------------------------*/

var $ = function(id){ return unsafeWindow.document.getElementById(id); };

function removeElement(obj) {
	parent = obj.parentNode;
	parent.removeChild(obj);
}

function f(objarray,str) {
	for(i=0; i<objarray.length; i++) {
		isThis = objarray[i].innerHTML.indexOf(str);
		if (isThis!=-1) {
			return objarray[i];
		}
	}
	if(debug){alert("見つかりません")}
}

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
//debug用
function who(obj) {
	alert(
	"tagName: "+obj.tagName+"\n"+
	"className: "+obj.clasName+"\n"+
	"name: "+obj.name+"\n"+
	"innerHTML: "+obj.innerHTML
	);
}
function log(t){
	HEAD.innerHTML+="<span>"+t+",</span> ";
}

/*----------------------------------------------------------------*/
/*----------------------------------------------------------------*/

//HEAD elemゲットしておく
var HEAD		= $("WATCHHEADER");
var HEADdes_1   = $("des_1");
var HEADdes_2   = $("des_2");
var HEADtables	= HEAD.getElementsByTagName("table");
var HEADp		= HEAD.getElementsByTagName("p");
var HEADdivs	= HEAD.getElementsByTagName("div");
var HEADimgs	= HEAD.getElementsByTagName("img");
var HEADforms	= HEAD.getElementsByTagName("form");
var HEADinputs	= HEAD.getElementsByTagName("input");
var HEADh1		= HEAD.getElementsByTagName("h1");
	HEADh1		= HEADh1[0];
var v			= unsafeWindow.Video;
var so			= unsafeWindow.so;

var targetP = HEADdes_2.getElementsByTagName("p");
for(i=0;targetP.length>i;i++){
	if(targetP[i].className=="video_description"){
		var video_description = targetP[i];
	}
}

/*********************************/
/*********************************/
/*********************************/
if(_test){
	$css("table {border:solid 1px #888;}");
}
if(conf_Thumb==1){
	var thumbimg = document.createElement("IMG");
	thumbimg.src = v.thumbnail;
	thumbimg.className = "video_w96";
	thumbimg.style.marginLeft="0";
	thumbimg.style.display="inline-table";
	thumbimg.style.background="#445555";
	thumbimg.alt="サムネ";
	var titleTable = $("des_2").getElementsByTagName("table")[0];
	var comTD = titleTable.getElementsByTagName("td")[0];
	var titleTD = titleTable.getElementsByTagName("td")[1];
	comTD.width  ="169px";
	titleTD.width="";
	comTD.appendChild(thumbimg);
}

if(conf_descScroll==1){
	$css("p.video_description {max-height:80px;overflow-y:scroll;padding:2px 0 0 4px;}");
}

$css("div#blackScreen {"+
	"display:none;"+
	"position:fixed;top:0;left:0;height:100%;width:100%;"+
	"background-color:#000;"+
	"filter: alpha(opacity=80);"+
	"-moz-opacity:0.8;"+
	"opacity:0.8;"+
	"cursor:pointer;"+
"}");
$css(
	".bW_button {background-color:#fff; border-width:1px;line-height:16px;padding:1px 4px;}"+
	".bW_button img {vertical-align:middle;}"
	);
	

if(conf_compactButtons){
	var target = video_description.parentNode.childNodes[9];
	target.style.cssFloat="left";
}

/*********************************/
/*********************************/
/*********************************/
/*----------------------------------------------------------------*/
//###コミュニティ内で見てる時にsm***へのリンクをつける
if(so.variables.is_community_thread && !so.variables.is_channel) {
	HEADh1.innerHTML += '&nbsp;<a href="/watch/'+v.id+'" style="font-size:10px;">通常モードで見る</a>';
}

/*----------------------------------------------------------------*/
//###動画タイトル部分までスクロールする
if(conf_autoScroll){
	var yStart = HEAD.offsetTop;
	scrollTo(0,yStart);
}



/*ボタン追加場所*/
e_buttonsTable	= document.getElementById("mymemory_add_form");
e_buttonsTR		= e_buttonsTable.parentNode.parentNode;
e_buttonsTable	= e_buttonsTable.parentNode.parentNode.parentNode.parentNode;
e_buttonsTR.addTD = function(content){
	this.innerHTML += "<td>"+content+"</td>";
}

/*
if(shrink_ch_com){
	div.chacom_bg
}
*/


e_buttonsTR.addTD("<button type='button' class='bW_button' onClick='$(\"blackScreen\").style.display=\"block\"'><img src='http://res.nicovideo.jp/img/base/head/icon/nico/087.gif' width=16> 暗くする</button><div id='blackScreen' onClick='this.style.display=\"none\"'></div>");
if(conf_autoDarken==1){
	$("blackScreen").style.display="block";
}

$css_write();