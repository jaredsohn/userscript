// ==UserScript==
// @name           Haijia
// @namespace      www.zoopigzoo.com
// @description    Haijia YueChe
// @include        http://124.65.135.98/Training/ListForReservationKm2*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var requesturl = "http://124.65.135.98/Training/ForReservationTimeSectionList?_=1333180506277&trainType=2";
var tofindDts = {};

var avaMode = 2;
var noMode = 3;
var getMode = 4;

function TryAndFind()
{
	setSettingBox();
  GM_xmlhttpRequest({
     method: "GET",
     url: requesturl,
     onload: function(xhr) {
			var response = xhr.responseText;
			var getIt = false;
			//add code to analyse
			var obj = $.parseJSON(response);

			if(obj.code == 0 && obj.data != null) {
				var dts = obj.data.DateList;
				var wks = obj.data.WeekList;
				var modes = obj.data.DateDtMode;
				for(var i=0;i<modes.length;i++) {
					var oneslot = modes[i];
					if(oneslot.Date in tofindDts) {
						if(oneslot.DtId != "3") {
							if(oneslot.Mode == avaMode) {
								getIt = true;
							}
						}
					}
				}
			} else {
				getIt = false;
				if(obj.code == 1) {
					unsafeWindow.console.log(obj.message);
				} else {
					unsafeWindow.console.log("unknown error");
				}
			}
			
			if(getIt) {
				alert("Find");
			} else {
				unsafeWindow.console.log("request submit: not find!");
				iterFind();				
			}
    }
  });
}

function iterFind()
{
   setTimeout(TryAndFind,10000);
}

// Check if jQuery's loaded
function GM_wait()
{
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}

GM_wait();

function setSettingBox() {
	//set up setting envi
	var finddatestring = localStorage.getItem("finddates");
	var html = "<div id='settings'>";
	html += "<input id='adddates' type=text value='' /><a href='#' class='addbuton'>ADD</a><br />";
	tofindDts = {};
	if(finddatestring != null && finddatestring != "") {
		var items = finddatestring.split(',');
		for(var i=0;i<items.length;i++) {
			if(items[i] != "") {
				html += "<span class='dts'>" + items[i] + "</span><a href='#' class='delbuton' >DEL</a><br />";
				tofindDts[items[i]] = true;
			}
		}
	}
	html += "</div>";
	$("#settings").html(html);
	
	$(".delbuton").click(function() {
		var dt = $(this).prev().text();
		alert(dt);
		eval("var str = \"\"; $(\".dts\").each(function() { if($(this).text() != dt) { str += $(this).text() + \",\"; } });	 str += $(\"#adddates\").val() + \",\"; localStorage.setItem(\"finddates\",str); setSettingBox();");
	});
	
	$(".addbuton").click(function() {
		eval("var str = \"\"; $(\".dts\").each(function() { if(true) { str += $(this).text() + \",\"; } });	 str += $(\"#adddates\").val() + \",\"; localStorage.setItem(\"finddates\",str); setSettingBox();");
	});	
}

// *** put your code inside letsJQuery: ***
function letsJQuery()
{
    $(document).ready(function () {
		$(".ui-widget").append("<div id='settings'></div>");	
		iterFind();		
    });
}
