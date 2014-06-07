// ==UserScript==
// @name           Calil lookup from MediaMarker
// @namespace      http://mediamarker.net/
// @include        http://mediamarker.net/u/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://calil.jp/public/js/calilapi.js
// ==/UserScript==

var isbn_list = [];
var systemid_list = [];
var city_selector = {};
var APP_KEY = 'aefc52cc4f2282daa7d58d922d4dc06d'
var pref_name = "";

var setting = eval(GM_getValue('calil_setting'));
var isShowDlg = (typeof setting == 'undefined');

var city_selector = new CalilCitySelectDlg({
	'appkey' : APP_KEY,
	'select_func' : on_select_city,
	'getstart' : isShowDlg
});

$("#calil_place_dialog_wrapper").css("left", 0);
$("#calil_place_dialog_wrapper").css("top", 0);
$("#calil_place_dialog_wrapper").css("position", "absolute");

$("#calil_place_dialog").css("-moz-border-radius", "10px 10px 10px 10px");
$("#calil_place_dialog").css("background-color", "white");
$("#calil_place_dialog").css("width", "460px");
$("#calil_place_dialog").css("border", "5px solid #999999");
$("#calil_place_dialog").css("position", "absolute");


//図書館選択画面を表示する。
showConfBtn();

//図書館設定が完了している場合、各書籍の蔵書検索を行う。
var header = document.getElementsByClassName('med_detail_block');
render_mode = (header.length == 1) ? "single" : "list"
$.each(header, function(i,val){
	isbn = getIsbn(val);
	isbn_list.push(isbn);
	$(val).append('<div id="'+isbn+'"></div>');
});


if(!isShowDlg){
	systemid_list = setting.systemid_list;
	pref_name     = setting.pref_name;
	$("#pref").html(pref_name);
	showCalil();
	city_selector.closeDlg();
}

/*------------------------------------------------------------------------*/
/**
 * 設定画面で市区町村を選んだときの処理
 */
function on_select_city(select_systemid_list, select_pref_name){
	var setting = {'pref_name': select_pref_name, 'systemid_list': select_systemid_list}
	GM_setValue('calil_setting', setting.toSource());

	systemid_list = $.unique(select_systemid_list);
	pref_name = select_pref_name;
	$("#pref").html(pref_name);

	showCalil();
}

/**
 * 蔵書検索の実行
 */
function showCalil(){
	var calil = new Calil({
		'appkey' : APP_KEY,
		'render': new CalilRender(),
		'isbn' : isbn_list,
		'systemid' : systemid_list
	});
	calil.search();
}
/**
 * 設定画面を表示する。
 */
function showConfBtn(){

	confHeader = document.getElementsByClassName("title")[0];
	confBtn = document.createElement("div");
	confBtn.setAttribute("id", "setLib");
	confBtn.innerHTML = 
		'<form>' +
			'<b><span id="pref"></span></b>図書館の蔵書を検索します。<input type="button" id="confBtn" value="図書館変更" />' +
		'</form>';
	confHeader.parentNode.insertBefore(confBtn, confHeader.nextSibling);

	$("#confBtn").click(function(){
		city_selector.showDlg();
	});
}

/**
 * ISBN番号を取得する。
 */
function getIsbn(val){
	var isbn;
	val.textContent.match( /(978\d{9}[\dX])/ );
	isbn = RegExp.$1;

	return isbn;
}


