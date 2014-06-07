// ==UserScript==
// @name        Husaria Rozkazy
// @namespace   http://shoxteam.net
// @description Displays Husaria MU orders directly on eRepublik. By Slay
// @include     http://*erepublik.com/*
// @version     1.2.8
// @grant		unsafeWindow
// ==/UserScript==

var old_hash = "";
var old_rozkazy = "";
var first_time = true;

function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $j = unsafeWindow.jQuery;
    letsJQuery();
  }
}
function decode_base64(s) {
var e={},i,k,v=[],r='',w=String.fromCharCode;
var n=[[65,91],[97,123],[48,58],[43,44],[47,48]];

for(z in n){for(i=n[z][0];i<n[z][1];i++){v.push(w(i));}}
for(i=0;i<64;i++){e[v[i]]=i;}

for(i=0;i<s.length;i+=72){
var b=0,c,x,l=0,o=s.substring(i,i+72);
	 for(x=0;x<o.length;x++){
			c=e[o.charAt(x)];b=(b<<6)+c;l+=6;
			while(l>=8){r+=w((b>>>(l-=8))%256);}
	 }
}
return r;
}
function getCzas()
{
	(function(e){var t=function(){"use strict";var e="s",n=function(e){var t=-e.getTimezoneOffset();return t!==null?t:0},r=function(e,t,n){var r=new Date;return e!==undefined&&r.setFullYear(e),r.setDate(n),r.setMonth(t),r},i=function(e){return n(r(e,0,2))},s=function(e){return n(r(e,5,2))},o=function(e){var t=e.getMonth()>7?s(e.getFullYear()):i(e.getFullYear()),r=n(e);return t-r!==0},u=function(){var t=i(),n=s(),r=i()-s();return r<0?t+",1":r>0?n+",1,"+e:t+",0"},a=function(){var e=u();return new t.TimeZone(t.olson.timezones[e])},f=function(e){var t=new Date(2010,6,15,1,0,0,0),n={"America/Denver":new Date(2011,2,13,3,0,0,0),"America/Mazatlan":new Date(2011,3,3,3,0,0,0),"America/Chicago":new Date(2011,2,13,3,0,0,0),"America/Mexico_City":new Date(2011,3,3,3,0,0,0),"America/Asuncion":new Date(2012,9,7,3,0,0,0),"America/Santiago":new Date(2012,9,3,3,0,0,0),"America/Campo_Grande":new Date(2012,9,21,5,0,0,0),"America/Montevideo":new Date(2011,9,2,3,0,0,0),"America/Sao_Paulo":new Date(2011,9,16,5,0,0,0),"America/Los_Angeles":new Date(2011,2,13,8,0,0,0),"America/Santa_Isabel":new Date(2011,3,5,8,0,0,0),"America/Havana":new Date(2012,2,10,2,0,0,0),"America/New_York":new Date(2012,2,10,7,0,0,0),"Asia/Beirut":new Date(2011,2,27,1,0,0,0),"Europe/Helsinki":new Date(2011,2,27,4,0,0,0),"Europe/Istanbul":new Date(2011,2,28,5,0,0,0),"Asia/Damascus":new Date(2011,3,1,2,0,0,0),"Asia/Jerusalem":new Date(2011,3,1,6,0,0,0),"Asia/Gaza":new Date(2009,2,28,0,30,0,0),"Africa/Cairo":new Date(2009,3,25,0,30,0,0),"Pacific/Auckland":new Date(2011,8,26,7,0,0,0),"Pacific/Fiji":new Date(2010,11,29,23,0,0,0),"America/Halifax":new Date(2011,2,13,6,0,0,0),"America/Goose_Bay":new Date(2011,2,13,2,1,0,0),"America/Miquelon":new Date(2011,2,13,5,0,0,0),"America/Godthab":new Date(2011,2,27,1,0,0,0),"Europe/Moscow":t,"Asia/Yekaterinburg":t,"Asia/Omsk":t,"Asia/Krasnoyarsk":t,"Asia/Irkutsk":t,"Asia/Yakutsk":t,"Asia/Vladivostok":t,"Asia/Kamchatka":t,"Europe/Minsk":t,"Australia/Perth":new Date(2008,10,1,1,0,0,0)};return n[e]};return{determine:a,date_is_dst:o,dst_start_for:f}}();t.TimeZone=function(e){"use strict";var n={"America/Denver":["America/Denver","America/Mazatlan"],"America/Chicago":["America/Chicago","America/Mexico_City"],"America/Santiago":["America/Santiago","America/Asuncion","America/Campo_Grande"],"America/Montevideo":["America/Montevideo","America/Sao_Paulo"],"Asia/Beirut":["Asia/Beirut","Europe/Helsinki","Europe/Istanbul","Asia/Damascus","Asia/Jerusalem","Asia/Gaza"],"Pacific/Auckland":["Pacific/Auckland","Pacific/Fiji"],"America/Los_Angeles":["America/Los_Angeles","America/Santa_Isabel"],"America/New_York":["America/Havana","America/New_York"],"America/Halifax":["America/Goose_Bay","America/Halifax"],"America/Godthab":["America/Miquelon","America/Godthab"],"Asia/Dubai":["Europe/Moscow"],"Asia/Dhaka":["Asia/Yekaterinburg"],"Asia/Jakarta":["Asia/Omsk"],"Asia/Shanghai":["Asia/Krasnoyarsk","Australia/Perth"],"Asia/Tokyo":["Asia/Irkutsk"],"Australia/Brisbane":["Asia/Yakutsk"],"Pacific/Noumea":["Asia/Vladivostok"],"Pacific/Tarawa":["Asia/Kamchatka"],"Africa/Johannesburg":["Asia/Gaza","Africa/Cairo"],"Asia/Baghdad":["Europe/Minsk"]},r=e,i=function(){var e=n[r],i=e.length,s=0,o=e[0];for(;s<i;s+=1){o=e[s];if(t.date_is_dst(t.dst_start_for(o))){r=o;return}}},s=function(){return typeof n[r]!="undefined"};return s()&&i(),{name:function(){return r}}},t.olson={},t.olson.timezones={"-720,0":"Etc/GMT+12","-660,0":"Pacific/Pago_Pago","-600,1":"America/Adak","-600,0":"Pacific/Honolulu","-570,0":"Pacific/Marquesas","-540,0":"Pacific/Gambier","-540,1":"America/Anchorage","-480,1":"America/Los_Angeles","-480,0":"Pacific/Pitcairn","-420,0":"America/Phoenix","-420,1":"America/Denver","-360,0":"America/Guatemala","-360,1":"America/Chicago","-360,1,s":"Pacific/Easter","-300,0":"America/Bogota","-300,1":"America/New_York","-270,0":"America/Caracas","-240,1":"America/Halifax","-240,0":"America/Santo_Domingo","-240,1,s":"America/Santiago","-210,1":"America/St_Johns","-180,1":"America/Godthab","-180,0":"America/Argentina/Buenos_Aires","-180,1,s":"America/Montevideo","-120,0":"Etc/GMT+2","-120,1":"Etc/GMT+2","-60,1":"Atlantic/Azores","-60,0":"Atlantic/Cape_Verde","0,0":"Etc/UTC","0,1":"Europe/London","60,1":"Europe/Berlin","60,0":"Africa/Lagos","60,1,s":"Africa/Windhoek","120,1":"Asia/Beirut","120,0":"Africa/Johannesburg","180,0":"Asia/Baghdad","180,1":"Europe/Moscow","210,1":"Asia/Tehran","240,0":"Asia/Dubai","240,1":"Asia/Baku","270,0":"Asia/Kabul","300,1":"Asia/Yekaterinburg","300,0":"Asia/Karachi","330,0":"Asia/Kolkata","345,0":"Asia/Kathmandu","360,0":"Asia/Dhaka","360,1":"Asia/Omsk","390,0":"Asia/Rangoon","420,1":"Asia/Krasnoyarsk","420,0":"Asia/Jakarta","480,0":"Asia/Shanghai","480,1":"Asia/Irkutsk","525,0":"Australia/Eucla","525,1,s":"Australia/Eucla","540,1":"Asia/Yakutsk","540,0":"Asia/Tokyo","570,0":"Australia/Darwin","570,1,s":"Australia/Adelaide","600,0":"Australia/Brisbane","600,1":"Asia/Vladivostok","600,1,s":"Australia/Sydney","630,1,s":"Australia/Lord_Howe","660,1":"Asia/Kamchatka","660,0":"Pacific/Noumea","690,0":"Pacific/Norfolk","720,1,s":"Pacific/Auckland","720,0":"Pacific/Tarawa","765,1,s":"Pacific/Chatham","780,0":"Pacific/Tongatapu","780,1,s":"Pacific/Apia","840,0":"Pacific/Kiritimati"},typeof exports!="undefined"?exports.jstz=t:e.jstz=t})(this); var tz = jstz.determine(); var region=tz.name();
	var currentTime = new Date();
	if(region=="Africa/Johannesburg") currentTime-=(60*60*1000); //Belarus
	//region=="Europe/Berlin" - Poland
	return Math.round(currentTime/1000);
}
function slap()
{
	$j('#hus_rozkazy').css( { backgroundColor: "#f00" });
	setTimeout(function(){$j('#hus_rozkazy').css( { backgroundColor: "#EEEEEE" });}, 400);
	$j("#slapper").html('<audio autoplay="autoplay"><source src="http://www.sg-infinity.com/kamaz/api/bot/Applied.WAV" /></audio>');
}
function SetCSS(fail)
{
	if(fail)
	{
		$j('#hus_rozkazy').css("padding", "5px")
		.css("padding-bottom", "15px")
		.css("color", "#3A3A3A")
		.css("overflow", "hidden")
		.css("top", "14px")
		.css("margin-bottom", "10px")
		.css("background", "#FFA7A7")
		.css("background-image", "url('http://sg-infinity.com/kamaz/api/bot/Red_Exclamation_Mark.png')")
		.css("background-repeat", "no-repeat")
		.css("background-position", "97% 43%")
		.css("text-shadow", "1px 1px 0 #CACACA")
		.css("border-radius", "1px 1px 1px 1px")
		.css("box-shadow", "0 0 1px #FFFFFF inset")
		.css("border", "1px solid #C49B9B")
		.css("width", "745px")
		.css("height", "60px")
		.css("font-size", "120%")
		.css("font-weight", "bold");
	}
	else
	{
		$j('#hus_rozkazy').css("padding", "5px")
		.css("padding-left", "8px")
		.css("padding-bottom", "15px")
		.css("color", "rgb(0, 0, 0)")
		.css("overflow", "hidden")
		.css("top", "14px")
		.css("margin-bottom", "10px")
		.css("background", "#EEEEEE")
		.css("text-shadow", "0 1px 1px #FFFFFF")
		.css("border-radius", "1px 1px 1px 1px")
		.css("box-shadow", "0 0 1px #FFFFFF inset")
		.css("border", "1px solid #BDBDBD")
		.css("width", "745px")
		.css("font-size", "90%")
		.css("font-weight", "normal");
	}
}
function ShowError(id)
{
	switch(id)
	{
	case 616:
		$j("#hus_rozkazy").html("Błąd połączenia z Huśkiem.<br/>Wejdź na husarski IRC aby zobaczyć aktualne rozkazy.");
		break;
	case 404:
		$j("#hus_rozkazy").html("Błąd połączenia z serwerem.<br/>Wejdź na husarski IRC aby zobaczyć aktualne rozkazy.");
		break;
	}
	SetCSS(true);
}
// Main()
function letsJQuery()
{

  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }
  
  $j("#content").prepend('<div id="hus_rozkazy"></div><div id="slapper"></div>');

  setInterval(function () {
	$j.ajax({
  dataType: 'jsonp',
  data: 'id=6',
  jsonp: 'jsonp_callback',
  url: 'http://www.sg-infinity.com/kamaz/api/bot/get_rozkazy_new.php?rnd=' + new Date(),
  success: function (data) {
	var czas = getCzas();
	if(parseInt(data["timestamp"]) < (czas-150)) ShowError(616); else
	{
		SetCSS(false);
		if(old_hash != data["hash"]){if(!first_time) slap(); else first_time=false;}
		old_hash = data["hash"];
		old_rozkazy = data["rozkazy"];
		$j("#hus_rozkazy").html(decode_base64(data["rozkazy"]));
	}
  },
  error: function (xhr, ajaxOptions, thrownError) {
	ShowError(404);
	}
});

  }, 3000);

}

GM_wait();