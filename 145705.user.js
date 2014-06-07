// ==UserScript==
// @name        Suspilstvo
// @namespace   http://suspilstvo.com/
// @description automate gameplay
// @include     http://suspilstvo.com/society/*
// @include     http://suspilstvo.com/*
// @include     http://www.suspilstvo.com/*
// @version     1.0.7
// @grant       none
// ==/UserScript==

var domain = document.domain;

function sendResourceGlobal() {
if(confirm("Бажаєте надіслати ресурси?"))
    {
            //var city_rec = prompt('У яке місто?', 1);
            var city_num = prompt('Кількість міст?', 13);

            var res1 = prompt('Скільки дерева?', 252000);
            var res2 = prompt('Скільки каменю?', 252000);
            var res3 = prompt('Скільки заліза?', 0);
            var res4 = prompt('Скільки їжі?', 0);

            var i;
            for (i = 2; i < city_num + 1; i++) {
            	var time = new Date().getTime();
            	$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_'+i+'&to_city='+txt_myid_txt+'_1&own=1&wood='+res1+'&stone='+res2+'&iron='+res3+'&food='+res4+'&jantar=0&rubin=0&swords=0&bows=0&_='+time);
            	//setTimeout(function() {}, 100);

            };

    }    
}


function sendResource() {
if(confirm("Бажаєте надіслати ресурси у форт?"))
    {
		//--------------------------
		// send resource to ford
		//--------------------------
		//http://'+domain+'/society/actions/actions.php?my_p_id=6478&action=sendKars&cityN=1&from_city=6478_1&to_city=-2_3&own=1&wood=150000&stone=150000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_=1347611008602
		// city 1
		var time = new Date().getTime();
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_1&to_city=-2_3&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 2
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_2&to_city=-2_3&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 3
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_3&to_city=-2_3&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 4
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_4&to_city=-2_3&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 5
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_5&to_city=-2_3&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 6
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_6&to_city=-2_3&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 7
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_7&to_city=-2_3&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 8
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_8&to_city=-2_3&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
	}
}

function sendResourceCapital() {
if(confirm("Бажаєте надіслати ресурси у столицю?"))
    {
		//--------------------------
		// send resource to capital
		//--------------------------

		// city 1
		var time = new Date().getTime();
//		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_1&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 2
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_2&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 3
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_3&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 4
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_4&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 5
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_5&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 6
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_6&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 7
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_7&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 8
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_8&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 9
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_9&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 10
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_10&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 11
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_11&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 12
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_12&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);
		// city 13
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=sendKars&cityN=1&from_city='+txt_myid_txt+'_13&to_city='+txt_myid_txt+'_1&own=1&wood=252000&stone=252000&iron=0&food=0&jantar=0&rubin=0&swords=0&bows=0&_='+time);

	}
}

function sendFermersWork() {
if(confirm("Відправити працювати селян?"))
    {
		var time = new Date().getTime();
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=1&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=2&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=3&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=4&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=5&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=6&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=7&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=8&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=9&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=10&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=11&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=12&_='+time);
		$.get('http://'+domain+'/society/actions/actions.php?my_p_id='+txt_myid_txt+'&action=goToWork&cityN=13&_='+time);
	}
}


$("#btn_forum").after('<div onclick="showWindow("my", 1, "");" class="btns clickable" id="btn_my"><img class="clickable justforAnim" src="https://www.wellsfargo.com/img/badge/tools_calcs.gif" id="my_btn" alt="" style="top: -5px"></div>');
var my_menu = '	<div id="my-menu" class="clickable" style="display: none; position: fixed;">\
		<div class="ui-corner-all ui-dialog-title ui-dialog-titlebar ui-widget-header ui-corner-all othercity shadow" id="send-recource-global" style="display:block; padding:10px;">\
			Надіслати ресурси в столицю (дерево/камінь/залізо/їжа)\
		</div>\
		<div class="ui-corner-all ui-dialog-title ui-dialog-titlebar ui-widget-header ui-corner-all othercity shadow" id="send-recource-capital" style="display:block; padding:10px;">\
			Надіслати ресурси в столицю (дерево/камінь - 50/50)\
		</div>\
		<div class="ui-corner-all ui-dialog-title ui-dialog-titlebar ui-widget-header ui-corner-all othercity shadow" id="send-recource" style="display:block; padding:10px;">\
			Надіслати ресурси у форт (дерево/камінь - 50/50)\
		</div>\
		<div class="ui-corner-all ui-dialog-title ui-dialog-titlebar ui-widget-header ui-corner-all othercity shadow" id="send-fermers-work" style="display:block; padding:10px;">\
			Послати усіх селян працювати\
		</div>\
		<!-- <div class="ui-corner-all ui-dialog-title ui-dialog-titlebar ui-widget-header ui-corner-all othercity shadow" id="npt-used" style="display:block; padding:10px;">\
			Інша кнопка (не задіяна)\
		</div> -->\
	</div>';

$("#btn_my").after( my_menu );

$(".btn_container").css("max-width", "+=40");
$("#btn_my").hover(
  function () {
    $(this).addClass("btnBackOver");
  }, 
  function () {
    $(this).removeClass("btnBackOver")
  }
);
$("#btn_my").click(function(){
	var iw = $(window).width();
	var ih = $(window).height();
	$("#my-menu").css( "left", iw/2-100 );
	$("#my-menu").css( "top", ih/2 );
	$("#my-menu").toggle();
});

$("#send-recource-global").click(function(){
	sendResourceGlobal();
});

$("#send-recource-capital").click(function(){
	sendResourceCapital();
});

$("#send-recource").click(function(){
	sendResource();
});

$("#send-fermers-work").click(function(){
	sendFermersWork();
});