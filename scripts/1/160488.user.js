// ==UserScript==
// @name           CustomGinnamaWatch
// @include         http://live.nicovideo.jp/watch/*
// @exclude         http://live.nicovideo.jp/watch/nsen/vocaloid
// @version        2.0.0
// ==/UserScript==
/*
■参考スクリプト
NicoRankingKidokuDelete　→　http://userscripts.org/scripts/show/45927
■参考サイト
http://userscripts.org/topics/43597
http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
http://www.webopixel.net/javascript/160.html
*/


(function() {

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {

GM_getValue = function(name, defaultValue) {
var value = localStorage.getItem(name);
if (!value)
return defaultValue;
var type = value[0];
value = value.substring(1);
switch (type) {
case 'b':
return value == 'true';
case 'n':
return Number(value);
default:
return value;
}
}
GM_setValue = function(name, value) {
value = (typeof value)[0] + value;
localStorage.setItem(name, value);
}
if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; } 
}

	//ウォール消去
	function walloff(){
		if( GM_getValue("walloff")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#wall_canvas{display:none!important;}#wall_chip_area{display:none!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//広告消去
	function senCut2(){
		if( GM_getValue("senden2")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#ad_bnr,#footer_ads{display:none!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//フッター消去
	function footcut(){
		if( GM_getValue("footer_off")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#page_footer,#body_footer_wrap{display:none!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//ヘッダー消去
	function headcut(){
		if( GM_getValue("head_off")=="on"){

			var menu=document.getElementById("qnama");
			menu.innerHTML="■";
			document.body.appendChild(menu);

			var divwidth=parseInt( (document.body.clientWidth-960)/2 +1 );
			document.getElementById("qnama").style.left=divwidth+20+"px";

			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#siteHeader{display:none!important;}body{padding-top:0!important;}#qnama{color:#fe42c7;position:fixed;bottom:10px;z-index:99999;cursor:pointer;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//市場消去
	function ichibaCut(){
		if( GM_getValue("ichiba_off")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#advertisement_box{display:none!important;}div#watch_tab_box{background:transparent!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//ザッピングを消去
	function zappingCut(){
		if( GM_getValue("zapping_off")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#watch_zapping_box{display:none!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//使い方・共有等を消去
	function helpCut(){
		if( GM_getValue("help_off")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#watch_player_bottom_box{display:none!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//PAGE TOPを消去
	function pagetopCut(){
		if( GM_getValue("pagetop_off")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '.page_top{display:none!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//背景灰色
	function backwhite(){
		if( GM_getValue("back_off")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = 'body,#all_cover,#all,div#watch_title_box,#watch_player_top_box,div#watch_player_top_box div,div#watch_player_box,div#watch_zapping_box,div#page_header,div#page_cover{background:#F4F4F4!important;border:none!important;}#page *{text-shadow:none!important;color:#000000!important;font-size:13px!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//ロゴ・検索ボックス消去
	function logoCut(){
		if( GM_getValue("logo_off")=="on"){
			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#page_header{display:none!important;}#page_cover{margin-top:5px!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);
		}
	}
	//ページ左右余白リンク消去
	function dellink(){
		if( GM_getValue("link_off")=="on"){

			var divleft=document.createElement("div");
			var divright=document.createElement("div");
			divleft.id="divleft";
			divright.id="divright";
			document.body.appendChild(divleft);
			document.body.appendChild(divright);
			
			var divwidth=parseInt( (document.body.clientWidth-960)/2 +1 );
			divleft.style.width=divwidth+"px";
			divright.style.width=divwidth+"px";

			var oStyle = document.createElement('style');
			oStyle.setAttribute('type','text/css');
			var css = '#divleft{position:absolute;top:0;left:0;height:100%;background-color:#F4F4F4;z-index:9999999;}#divright{position:absolute;top:0;right:0;height:100%;background-color:#F4F4F4;z-index:9999999;}#siteHeader #siteHeaderInner{width:984px!important;}';
			oStyle.innerHTML = css;
			document.getElementsByTagName('head')[0].appendChild(oStyle);

			var pagewidth=parseInt( (document.body.clientWidth-960)/2 +1 );
			document.getElementById("prefDiv").style.right=pagewidth+"px";

		}
	}


	function labelElement(str,che){
		var k = document.createElement("label");
		k.innerHTML = str;
		k.style.cursor = "hand";
		k.setAttribute("for",che);
		k.style.fontSize = "12px";
		return k;
	}

	function interface_kidoku(){
		var prefDiv = document.createElement("div");
			prefDiv.style.width = "300px";
			prefDiv.style.height = "250px";
			prefDiv.style.overflowY = "scroll";
			prefDiv.innerHTML = "GinnamaWatchカスタマイズ設定" + "<br>";
			prefDiv.style.backgroundColor = "#ccccff";
			prefDiv.style.color = "black";
			prefDiv.style.border = "1px solid #888";
			prefDiv.style.position = "fixed";
			prefDiv.style.bottom = "0px";
			prefDiv.style.right = "0px";
			prefDiv.style.textAlign = 'left';
			prefDiv.style.margin = "0 0 0 0";
			prefDiv.style.zIndex = 999;
			prefDiv.style.display = 
				(GM_getValue("prefDisplay") == "none") ? "none" : "";
			prefDiv.id = "prefDiv";
			document.body.appendChild(prefDiv);

		var tojiru=document.createElement("div");
		tojiru.innerHTML = "閉じる";
		tojiru.style.position = "absolute";
		tojiru.style.top = "0px";
		tojiru.style.right = "5px";
		tojiru.style.color="#00BFFF";
		tojiru.style.cursor = "pointer";
		tojiru.id="tojiru";


		var linkwalloff = document.createElement("input");
			linkwalloff.name = "walloff";
			linkwalloff.type = "checkbox";
			linkwalloff.caption = "ウォール消去";
			linkwalloff.defaultValue = "off";
		var linkSen2 = document.createElement("input");
			linkSen2.name = "senden2";
			linkSen2.type = "checkbox";
			linkSen2.caption = "Flash上以外の広告を消去";
			linkSen2.defaultValue = "off";
		var linkichiba = document.createElement("input");
			linkichiba.name = "ichiba_off";
			linkichiba.type = "checkbox";
			linkichiba.caption = "市場消去";
			linkichiba.defaultValue = "off";
		var linklist = document.createElement("input");
			linklist.name = "zapping_off";
			linklist.type = "checkbox";
			linklist.caption = "ザッピングを消去";
			linklist.defaultValue = "off";
		var linkfootcut = document.createElement("input");
			linkfootcut.name = "footer_off";
			linkfootcut.type = "checkbox";
			linkfootcut.caption = "フッター消去";
			linkfootcut.defaultValue = "off";
		var linkwhite = document.createElement("input");
			linkwhite.name = "back_off";
			linkwhite.type = "checkbox";
			linkwhite.caption = "背景を灰色にする";
			linkwhite.defaultValue = "off";
		var linkhelp = document.createElement("input");
			linkhelp.name = "help_off";
			linkhelp.type = "checkbox";
			linkhelp.caption = "使い方・共有等を消去";
			linkhelp.defaultValue = "off";
		var linkpagetop = document.createElement("input");
			linkpagetop.name = "pagetop_off";
			linkpagetop.type = "checkbox";
			linkpagetop.caption = "PAGETOPを消去";
			linkpagetop.defaultValue = "off";
		var linklogocut = document.createElement("input");
			linklogocut.name = "logo_off";
			linklogocut.type = "checkbox";
			linklogocut.caption = "ロゴ・検索ボックス消去";
			linklogocut.defaultValue = "off";
		var linkdellink = document.createElement("input");
			linkdellink.name = "link_off";
			linkdellink.type = "checkbox";
			linkdellink.caption = "ページ左右余白リンクを消去";
			linkdellink.defaultValue = "off";
		var linkheadcut = document.createElement("input");
			linkheadcut.name = "head_off";
			linkheadcut.type = "checkbox";
			linkheadcut.caption = "ヘッダー消去";
			linkheadcut.defaultValue = "off";

		var form = document.createElement("form");

		var links = 
			[linkSen2,linkichiba,linkfootcut,linkwhite,linklist,linkhelp,linkpagetop,linkdellink,linklogocut,linkheadcut,linkwalloff];

		for (var i=0;i<links.length;i++){
			if (!GM_getValue(links[i].name)) {
				GM_setValue(links[i].name, links[i].defaultValue);
			}
				links[i].id = links[i].name;
				links[i].checked = (GM_getValue(links[i].name) != "on") ? false : true;
				links[i].addEventListener("click", function(e){
					GM_setValue(this.name, (GM_getValue(this.name) != "on") ? "on" : "off");
				}, true);
		}

		//登録
		form.appendChild(tojiru);
		form.appendChild(document.createElement("br"));
		form.appendChild(linkSen2);
		form.appendChild(labelElement(linkSen2.caption, linkSen2.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkwalloff);
		form.appendChild(labelElement(linkwalloff.caption, linkwalloff.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkfootcut);
		form.appendChild(labelElement(linkfootcut.caption, linkfootcut.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linklist);
		form.appendChild(labelElement(linklist.caption, linklist.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkhelp);
		form.appendChild(labelElement(linkhelp.caption, linkhelp.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkichiba);
		form.appendChild(labelElement(linkichiba.caption, linkichiba.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkpagetop);
		form.appendChild(labelElement(linkpagetop.caption, linkpagetop.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkwhite);
		form.appendChild(labelElement(linkwhite.caption, linkwhite.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linklogocut);
		form.appendChild(labelElement(linklogocut.caption, linklogocut.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkdellink);
		form.appendChild(labelElement(linkdellink.caption, linkdellink.id));
		form.appendChild(document.createElement("br"));
		form.appendChild(linkheadcut);
		form.appendChild(labelElement(linkheadcut.caption, linkheadcut.id));

		prefDiv.appendChild(form);

		var prefSw = document.createElement("a");
		prefSw.innerHTML = "カスタマイズ設定";
		prefSw.id = "qnama";
		prefSw.addEventListener("click",function(e){
			prefDiv.style.display = 
				(prefDiv.style.display　== "") ? "none" : "";
			GM_setValue("prefDisplay",prefDiv.style.display);
		},false);
		document.getElementById("siteHeaderRightMenuContainer").appendChild(prefSw);

		tojiru.addEventListener("click",function(e){
			prefDiv.style.display = 
				(prefDiv.style.display　== "") ? "none" : "";
			GM_setValue("prefDisplay",prefDiv.style.display);
		},false);


		var oStyle = document.createElement('style');
		oStyle.setAttribute('type','text/css');
		var css = '#siteHeader #siteHeaderInner{width:85%!important;}#qnama{margin-left:17px;color:#000000!important;cursor:pointer;}';
		oStyle.innerHTML = css;
		document.getElementsByTagName('head')[0].appendChild(oStyle);


	}

interface_kidoku();
senCut2();
zappingCut();
footcut();
backwhite();
ichibaCut();
helpCut();
pagetopCut();
logoCut();
headcut();
dellink();
walloff();

})();