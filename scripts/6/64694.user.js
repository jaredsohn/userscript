// ==UserScript==
// @name		superManger [Airline Manger]
// @description	superManager for Airline Manager of facebook
// @author		Almog Baku - almog.baku@gmail.com
// @include	http://apps.facebook.com/airline_manager/route.php*
// ==/UserScript==


/**
 * jQuery
 */
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head').item(0).appendChild(GM_JQ);


/**
 * jQuery Cookie
 */
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'http://plugins.jquery.com/files/jquery.cookie.js.txt';
document.getElementsByTagName('head').item(0).appendChild(script);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined')	window.setTimeout(GM_wait,100);
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

var orginalTimes=[];
function letsJQuery() {
	$(document).ready(function() {	
		//Logo
		$("table:eq(0) td:eq(0) div:eq(0)").css("backgroundImage", "url('http://img684.imageshack.us/img684/8568/superairlinemanager.jpg')");
		$("table:eq(0) td:eq(0) div:eq(0) div").css('left','280px');
		$("table:eq(0) td:eq(0) div:eq(0) div b").css('color','white');
		
		//Default Options
		defaultOptions();
		
		//Add options
		optionsPanel();
		
		//Fast information
		fastInfo();
		
		//Start auto flying
		autoFlying();
		
		//Auto Refresh
		setInterval(refreshPage, 1000*60*30);
		
		//Auto Advertisement
		setInterval(autoAdvertise, 1000*60);
		
		//Auto buy Fuel
		setInterval(autoFuel, 1000*60);
	});
}

/**
 * Options Panel
 */
function optionsPanel() {
	$(".l_menu td:eq(5)").html('');
	$(".l_menu").append("<br/><br/><div id=\"optionsPanel\" style=\"color: white; direction: ltr;\"></div>");
	$("#optionsPanel").html(''
		+'<center><u>Advertisement</u></center>'
		+'Maximum price: <br /><input style="width: 50px;" type="text" id="sM_adv_maxPrice" value="'+$.cookie('sM_adv_maxPrice')+'" /><br />'
		+'Days: <br /><select id="sM_adv_days"><option value="1">1 Day</option><option value="2">2 Days</option><option value="3">3 Days</option><option value="4">4 Days</option><option value="5">5 Days</option></select><br />'
		+'<br/><center><u>Fuel</u></center>'
		+'Maximum price: <br /><input style="width: 50px;" type="text" id="sM_fuel_maxPrice" value="'+$.cookie('sM_fuel_maxPrice')+'" /><br />'
		+'Maximum fuel: <br /><input style="width: 70px;" type="text" id="sM_fuel_maxFuel" value="'+$.cookie('sM_fuel_maxFuel')+'" /><br />'
		+'Amout: <br /><input style="width: 70px;" type="text" id="sM_fuel_amout" value="'+$.cookie('sM_fuel_amout')+'" />lbs<br />'
		+'<br /><input type="button" id="sM_save" value="Save" />'
		+''
		+'');
	$("#sM_adv_days").val($.cookie("sM_adv_days"));
	
	//save
	$("#sM_save").click(function() {
		$.cookie("sM_adv_maxPrice", parseInt($("#sM_adv_maxPrice").val()), { expires: 1000 });
		$.cookie("sM_adv_days", parseInt($("#sM_adv_days").val()), { expires: 1000 });
		
		$.cookie("sM_fuel_maxPrice", parseInt($("#sM_fuel_maxPrice").val()), { expires: 1000 });
		$.cookie("sM_fuel_maxFuel", parseInt($("#sM_fuel_maxFuel").val()), { expires: 1000 });
		$.cookie("sM_fuel_amout", parseInt($("#sM_fuel_amout").val()), { expires: 1000 });
	});
}
function defaultOptions() {
	if($.cookie("sM_fuel_maxPrice")==null) {
		$.cookie("sM_adv_maxPrice", 10000, { expires: 1000 });
		$.cookie("sM_adv_days", 1, { expires: 1000 });
		
		$.cookie("sM_fuel_maxPrice", 600, { expires: 1000 });
		$.cookie("sM_fuel_maxFuel", 2000000, { expires: 1000 });
		$.cookie("sM_fuel_amout", 1000000, { expires: 1000 });
	}
}

/**
 * Advertisment
 */
function autoAdvertise() {
	$.get("ads.php", function(data) {
		var price = parseInt($("form table table td:eq(13)",data).html().replace(/[^0-9]/g,""));
		var send={};
		send['route']='all';
		send['type']=5;
		send['days']=1;
		if(price<=$.cookie("sM_adv_maxPrice"))
			$.post('ads.php?m=ins',send, function() {refreshPage();});
	});
}

/**
 * Auto Fuel
 */
function autoFuel() {
	$.get("fuel.php", function(data) {
		var currentFuel=normalizeNum($("table:eq(8) td:eq(1) b", data).html());
		var currentPrice=normalizeNum($("table:eq(8) td:eq(3) b", data).html());
		if((currentPrice<=$.cookie("sM_fuel_maxPrice")) && (currentFuel<=$.cookie("sM_fuel_maxFuel")))
			$.post('fuel_pur.php', { fuel: $.cookie("sM_fuel_amout") }, function() {refreshPage();});
	});
}

/**
 * Fast Information
 */
function fastInfo() {
	$("#app93673891404_flight").before("<div id=\"fastInfo\" src=\"\"></div>");
	$('#app93673891404_flight tr:not(:first)').each(function() {
		var href=$(this).find('td:eq(1) a').attr('href');
		$(this).find('td:eq(1) a').attr('href','javascript:void(1)');
		$(this).find('td:eq(1) a').click(function() {
			if($("#fastInfo").attr('src')==href) $("#fastInfo").html('').attr('src','');
			else
				$.get(href, function(data) {
					var title = $("#app93673891404_flight center:eq(0)", data).html();
					data = '<center>'+title+'</center><table>'+$("#app93673891404_flight table:eq(0)", data).html()+"</table>";
					$("#fastInfo").html(data).attr('src',href);
					$("#app93673891404_timer").html('');
				});
		});
	});
}

/**
 * Auto Flying
 */
function autoFlying() {
	var i=1;
	$('#app93673891404_flight tr:not(:first)').each(function() {
		var time = StripTags($(this).find('td:eq(4)').html());
		if(time=='') 	time=0;
		else			time=time2sec(time.split(' ')[1])+30+getSaftyRandom();
		orginalTimes[i]=time;
		i++;
	});
	updateTimes();
	
	setInterval(updateTimes, 1000);
}
function updateTimes() {
	for(var i=1;i<orginalTimes.length;i++) {
		if(orginalTimes[i]>0) {
			orginalTimes[i]--;
			if(orginalTimes[i]<(60*60)) var html='<font color="darkred"><b>'+sec2time(orginalTimes[i])+'</b></font>';
			else 						var html=sec2time(orginalTimes[i]);
			$('#app93673891404_flight tr:eq('+i+') td:eq(4)').html('<img src="http://server222.server.activewebs.dk/am/pics/clock.gif"/> '+html);
		} else setTimeout(startRoutes, 1000*3);
	}
}
function startRoutes() {
	setTimeout(refreshPage, 1000*4);
	$("#app93673891404_frmbtn").click();
}


/**
 * Common functions
 **/
function getSaftyRandom() {
	return (Math.floor(Math.random()*63*3)+Math.floor(Math.random()%5)+7);
}
function refreshPage() {
	window.location.href = window.location.href;
}
function normalizeNum(num) {
	return parseInt(str.replace(/[^0-9]/g,""));
}
function sec2time(s) {
	var h,m;
	h=parseInt((s/60)/60);
	h=(h<10)?'0'+h:h;
	s=s%(60*60);
	m=parseInt(s/60);
	m=(m<10)?'0'+m:m;
	s=s%60;
	s=(s<10)?'0'+s:s;
	
	return h+':'+m+':'+s;
}
function time2sec(time){
	var split 	= time.split(':');
	var h		= parseInt(split[0]*60*60);
	var m		= parseInt(split[1]*60);
	var s		= parseInt(split[2]);
	return h+m+s;
}
function StripTags(strMod){
	/** @author: http://www.georgehernandez.com **/
    if(arguments.length<3) strMod=strMod.replace(/<\/?(?!\!)[^>]*>/gi, '');
    else {
        var IsAllowed=arguments[1];
        var Specified=eval("["+arguments[2]+"]");
        if(IsAllowed){
            var strRegExp='</?(?!(' + Specified.join('|') + '))\b[^>]*>';
            strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
        } else {
            var strRegExp='</?(' + Specified.join('|') + ')\b[^>]*>';
            strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }
    }
    return strMod;
}