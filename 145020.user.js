// ==UserScript==
// @name        The Pirate Bay Cleaner v3
// @description	THERE ARE TOO MANY FEATURES TO LIST IN THE DESCRIPTION! Auto Sorting, Torrentifying, Theme Change, Search Change, SSL/HTTPS and more... (see the 3rd screen shot for a list of features)
// @namespace   https://userscripts.org/users/boku/145020/v3
// @updateURL   https://userscripts.org/scripts/source/145020.meta.js
// @downloadURL https://userscripts.org/scripts/source/145020.user.js
// @icon        https://s3.amazonaws.com/uso_ss/icon/145020/large.png?1368115417
// @license 	The Pirate Bay Cleaner is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// @include     http*thepiratebay.*
// @exclude     *google.com*
// @exclude     http*thepiratebay.*/ajax*
// @exclude     http*rss.thepiratebay.*
// @version     3.10.0
// @require     https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @noframes    
// ==/UserScript==
/* Set all the variables that I will need and defaults if not used etc. */
torrentify=GM_getValue("torrentify",true);
imdb=GM_getValue("imdb",true);
linkify_all=GM_getValue("linkify_all",false);
info=GM_getValue("info",true);
alternate=GM_getValue("alternate",false);
ebay=GM_getValue("ebay",false);
amazon=GM_getValue("amazon",false);
color_code=GM_getValue("color_code",true);
	color_code_yday=GM_getValue("color_code_yday","#FF7F7F");
	color_code_today=GM_getValue("color_code_today","#FFE77F");
	color_code_minutes=GM_getValue("color_code_minutes","#7FFF8C");
trust=GM_getValue("trust",true);
filter=GM_getValue("filter",true);
	filter_text=GM_getValue("filter_text","malayalam|cam|dvdscr|hdrip|webrip|vcd|tv rip|hindi|hdtvrip|screener");
pornfilter=GM_getValue("pornfilter",false);
	pornfilter_text=GM_getValue("pornfilter_text","");
pornremove=GM_getValue("pornremove",false);
magnet=GM_getValue("magnet",false);
anonymous=GM_getValue("anonymous",true);
sorting=GM_getValue("sorting",false);
	sorting_value=GM_getValue("sorting_value","sd");
https=GM_getValue("https",true);
theme=GM_getValue("theme",false);
google=GM_getValue("google",true);
stretch=GM_getValue("stretch",true);
ads=GM_getValue("ads",true);
single=GM_getValue("single",false);
images=GM_getValue("images",true);
comments=GM_getValue("comments",true);
remotetorrent=GM_getValue("remotetorrent",true);
	remotetorrent_client = GM_getValue("remotetorrent_client",'1');
	remotetorrent_client_mode = GM_getValue("remotetorrent_client_mode",'lightbox');
	transmission_url=GM_getValue("transmission_url",'');
	if(transmission_url.length > 0 && !/^(ht)tps?:\/\//i.test(transmission_url)) transmission_url = 'http://'+transmission_url;
save_history=GM_getValue("save_history",true);
	torrent_history=GM_getValue("torrent_history",'');
	torrent_history_array = torrent_history.split(',');
save_faves=GM_getValue("save_faves",true);
	the_faves=GM_getValue("the_faves",'');
	the_faves_array = the_faves.split(',');
refresh=GM_getValue("refresh",false);
    refresh_duration=GM_getValue("refresh_duration",1800000)
    refresh_duration_int=refresh_duration;
url=location.href;
domain=url.split('/')[2];
PageRefresher = false;
window.Escapable = false;
/* Declare all the functions that will be used throughout script */
/* Set cookies function, name, value and days until expiry */
function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; path=/; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}
/* Retrieve a cookie value */
function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
}
/* Add an ordinal suffix to an integer */
function ordinal(n){
	var s=["th","st","nd","rd"], v=n%100;
	return n+(s[(v-20)%10]||s[v]||s[0]);
}
/* Convert month numbers to names */
function monthName(month){
	var MonthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
	var monthIndex = parseFloat(month);
	return MonthNames[monthIndex];
}
/* The date now, plus days if needed */
function dateNow(xdays){
	var today = new Date();
	if(!xdays){
		var year = today.getFullYear();
		var month = today.getMonth()+1;
		var day = today.getDate();
	} else {
		var tomorrow = new Date(today.getTime() + (xdays*(24 * 60 * 60 * 1000)));
		var year = tomorrow.getFullYear();
		var month = tomorrow.getMonth()+1;
		var day = tomorrow.getDate();
	}
	return year + '-' + ((''+month).length<2 ? '0' : '') + month + '-' +((''+day).length<2 ? '0' : '') + day;
}
/* Used for increasing the brighrness of a colour by a percentage */
function increase_brightness(hex, percent){
    hex = hex.replace(/^\s*#|\s*$/g, '');
    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);
    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
/* If told to use Google search, the convert forms behind the scenes to use Google */
$('#fp > form').submit(function(e){
	e.preventDefault();
	if(google==true){
		if (https==true){
			var qval = $('.https_form').val();
			$('.https_form').val(qval + ' site:' + domain + '/torrent');
		} else {
			var qval = $('#inp > input').val();
			$('#inp > input').val(qval + ' site:' + domain + '/torrent');
		}	
	}
	this.submit();
});
$('#header > form').submit(function(e){
	e.preventDefault();
	if(google==true){
	if (https==true){
		var qval = $('.searchBox').val();
		$('.searchBox').val(qval + ' site:' + domain + '/torrent');
	} else {
		var qval = $('.inputbox').val();
		$('.inputbox').val(qval + ' site:' + domain + '/torrent');
	}	
}
	this.submit();
});
/* If told to use HTTPS then set page to it */
if(url.substring(0,5)=="http:" && https==true){
	if ( !getCookie('lw') && single==true ){
		setCookie('lw','s',999);
	}
	location.replace(url.replace(url.substring(0,5),"https:"));
} else if(url.substring(0,6)=="https:" && https==false){
	if ( !getCookie('lw') && single==true ){
		setCookie('lw','s',999);
	}
	location.replace(url.replace(url.substring(0,6),"http:"));
}
/* Update cookies that potentially causes popups to expire in the year 2050 */
var FutureDate = new Date();
FutureDate.setFullYear( 2050 );
if( getCookie('tpbpop') ){
    document.cookie = "tpbpop=" + getCookie('tpbpop') +"; path=/; expires=" + FutureDate.toUTCString();
}if( getCookie('__PPU_SESSION_0-3') ){
    document.cookie = "__PPU_SESSION_0-3=" + getCookie('__PPU_SESSION_0-3') +"; path=/; expires=" + FutureDate.toUTCString();
}
document.cookie = "__PPU_CHECK=1; path=/; expires=" + FutureDate.toUTCString();
/* Checks if supposed to be single or double row and converts it if not set correctly */
if (!getCookie('lw') && single==true){
	setCookie('lw','s',999);
	location.reload(); 
} else if (getCookie('lw') && single==false){
	setCookie('lw','',-9999);
}
/* Convert milliseconds to real time HH:MM:SS */
function msToTime(s){
    var arrTime = new Array();
    var ms = s % 1000; s = (s - ms) / 1000;
    var secs = s % 60; s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    strHrs = "0" + hrs; strHrs = strHrs.substr(strHrs.length - 2);
    strMins = "0" + mins; strMins = strMins.substr(strMins.length - 2);
    strSecs = "0" + secs; strSecs = strSecs.substr(strSecs.length - 2);
    if(hrs > 0){ 
        arrTime['TheTime'] = strHrs + ':' + strMins;
        arrTime['TheTimeAsWords'] = hrs + " Hours and " + mins + " Minutes";
    } 
    else if(mins > 0){
        arrTime['TheTime'] = strMins + ':' + strSecs;
        arrTime['TheTimeAsWords'] = mins + " Minutes and " + secs + " Seconds";
    } 
    else if(secs > 0){
        arrTime['TheTime'] = strSecs;
        arrTime['TheTimeAsWords'] = secs + " Seconds";
    }
    return arrTime;
}
/* The page refresh function */
function TogglePageRefresh(){
    if(!PageRefresher){
        setCookie(url, 'AutoRefresh',999);
        refresh_duration=GM_getValue("refresh_duration")
        $("#refresh_button").attr('onmouseover' , "this.style.background='url(//i.imgur.com/u4tV1h1.png) 0px 40px'");
        $("#refresh_button").attr('onmouseout' , "this.style.background='url(//i.imgur.com/u4tV1h1.png) 0px 0px'");
        $("#refresh_button").attr('title' , "Turn Off Auto Refresh");
        var noti_bubble = document.createElement('div');
        noti_bubble.id = "noti_bubble";
        noti_bubble.style.cssText = 'z-index:9999; max-width:80px; position:absolute; padding:1px 2px 1px 2px; color:white; font-weight:bold; border-radius:30px; float:right; box-shadow:1px 1px 1px gray; left:' + $("#refresh_button").position().left + 'px;';
        $('#tpbc_btn_container').append(noti_bubble);
        /* Set the initial countdown time appearance */  
        var TimeDetails = msToTime(refresh_duration);        
        $('#noti_bubble').html( TimeDetails['TheTime'] );
        noti_bubble.title =  TimeDetails['TheTimeAsWords'] + " Until Refresh";
        if(refresh_duration <= 60000){
            noti_bubble.style.backgroundColor = "red";
        } else if (refresh_duration <= 300000){
            noti_bubble.style.backgroundColor = "orange";
        } else{
            noti_bubble.style.backgroundColor = "green";
        }
        /* Now with the timer running, make sure we're keeping up appearances ;) */
        PageRefresher = setInterval(function(){
            refresh_duration = refresh_duration - 1000;
            var TimeDetails = msToTime(refresh_duration);
            $('#noti_bubble').html( TimeDetails['TheTime'] );
            noti_bubble.title =  TimeDetails['TheTimeAsWords'] + " Until Refresh";
            if(refresh_duration <= 60000){
                noti_bubble.style.backgroundColor = "red";
            } else if (refresh_duration <= 300000){
                noti_bubble.style.backgroundColor = "orange";
            } else{
                noti_bubble.style.backgroundColor = "green";
            }
            if(refresh_duration <= 0){
                document.title = "Refreshing...";
                location.reload();
            }
        },1000);
    } else if (PageRefresher){
        /* Remove etc. when no timer running */
        setCookie(url, 'AutoRefresh',-999);
        clearInterval(PageRefresher);
        $("#refresh_button").attr('onmouseover' , "this.style.background='url(//i.imgur.com/u4tV1h1.png) 0px 0px'");
        $("#refresh_button").attr('onmouseout' , "this.style.background='url(//i.imgur.com/u4tV1h1.png) 0px 40px'");
        $("#refresh_button").attr('title' , "Turn On Auto Refresh");
        $('#noti_bubble').remove();
        PageRefresher = false;
    }
}
/* This shows a black translucent background, exactly like a lightbox background */
function LightboxBG(){
	$("body").append($('<div id="tpbc_lightbox" style="width:100%!important;height:100%!important;position:fixed;z-index:1000;top:0;left:0;background:#000 url(\'//i.imgur.com/ByMmVtd.gif\');opacity:0.75;background-repeat:no-repeat;background-attachment:fixed;background-position:center; "><img src="//i.imgur.com/NMFMQRZ.png" title="Close" style="position:fixed; top:5px;right:5px; cursor:pointer"></div>').hide().fadeIn('fast'));
}
/* Depending on the type, url and nobg. type can be www for websites, img for an image, code for text or settings for TPBC settings window. With www, you'll also need the url to be set and you can choose to use nobg or not, which is whether or not you want to show the black background */
function Lightbox(type, url, nobg){
	/* if nobg has nothing set, then show the background */
    if(!nobg) LightboxBG();
	switch (type){
		/* Show a website */
        case 'www':
			if(url){
				window.Escapable = true;
                var scrWidth = $(window).width(); var scrHeight = $(window).height();
				$('<iframe id="tpbc_holder" style="width:'+ (scrWidth-100) +'px!important;height:'+ (scrHeight-100) +'px!important;position:fixed;z-index:1002;top:50px;left:50px;background:#ffffff;display:none;" src="' + $.trim(url) + '" />').appendTo("body");
				$("#tpbc_holder").load(function (){
					$('#tpbc_holder').fadeIn('fast');
					$("#tpbc_lightbox").css({'background':'#000'});
				})
			}
			SettingsChanged = false;
		break;
        /*  Show an image */
		case 'img':
			if(url){
                window.Escapable = true;
				$('<div id="tpbc_holder" style="cursor:pointer;width:100%!important;height:100%!important;position:fixed;z-index:1002;top:0;left:0;background:url(\''+ $.trim(url) + '\');background-repeat:no-repeat;background-attachment:fixed;background-position:center;"></div>').appendTo("body");
			}
			SettingsChanged = false;
		break;
        /* Show text */
		case 'code':
			if(url){
                window.Escapable = true;
				var scrWidth = $(window).width(); var scrHeight = $(window).height();
				$('<div id="tpbc_holder" style="width:'+ (scrWidth-100) +'px!important;height:'+ (scrHeight-100) +'px!important;position:fixed;z-index:1002;top:50px;left:50px;background:#ffffff;font-size:1.3em;overflow:auto;text-align:left;padding:5px;" >'+$.trim(url)+'</div>').appendTo("body");
			}
			SettingsChanged = false;
		break;
		/* Build and show TPBC settings window */
        case 'settings':
			SettingsChanged = false;
			var scrWidth = $(window).width(); var scrHeight = $(window).height();
			$('<div id="tpbc_holder_form" style="width:'+ (((scrWidth/2) / scrWidth) * 100) +'%!important;height:'+ (scrHeight-100) +'px!important;max-height:'+ (scrHeight-100) +'px!important;position:fixed;z-index:1002;top:50px;left:' + ((((scrWidth/2) /2) / scrWidth)*100) + '%!important;background:#ffffff;-webkit-border-radius: 10px;border-radius:10px;-moz-border-radius:10px;border:10px solid #000;overflow:auto;color:#000000;">'
			+'<h1 style="text-align:center;">The Pirate Bay Cleaner Settings</h1>'
			+'<span id="tbpc_formcontents" style="padding:5px;width:95%!important;text-align:left;display:block;margin:auto;margin-bottom:5px!important;" ></span>'
			+'</div>').appendTo("body");
			$("<h2/>", {html: "Torrent Settings <label style=\"color:red\">All Settings Are Saved Instantly!</label>", style: "text-align:left;margin:5px 0px;font-size:1.1em;font-weight:normal;line-height:1.5em;"}).appendTo('#tbpc_formcontents');
			var tpbc_torrentify = document.createElement('input');
				tpbc_torrentify.type = 'checkbox';
				tpbc_torrentify.checked = torrentify;
				tpbc_torrentify.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('torrentify', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_torrentify);
					$("<label/>", {html: "Show Download Torrent Icon<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_imdb = document.createElement('input');
				tpbc_imdb.type = 'checkbox';
				tpbc_imdb.checked = imdb;
				tpbc_imdb.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('imdb', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_imdb);
					$("<label/>", {html: "Show IMDB Icon <small>(Opens IMDB.com in new window)</small><br>"}).appendTo('#tbpc_formcontents');
			var tpbc_info = document.createElement('input');
				tpbc_info.type = 'checkbox';
				tpbc_info.checked = info;
				tpbc_info.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('info', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_info);
					$("<label/>", {html: "Show Info Icon<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_alternate = document.createElement('input');
				tpbc_alternate.type = 'checkbox';
				tpbc_alternate.checked = alternate;
				tpbc_alternate.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('alternate', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_alternate);
					$("<label/>", {html: "Show Search For Alternate Torrent Icon <small>(Search other torrent sites for this torrent)</small><br>"}).appendTo('#tbpc_formcontents');
			var tpbc_ebay = document.createElement('input');
				tpbc_ebay.type = 'checkbox';
				tpbc_ebay.checked = ebay;
				tpbc_ebay.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('ebay', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_ebay);
					$("<label/>", {html: "Show Buy On eBay Icon<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_amazon = document.createElement('input');
				tpbc_amazon.type = 'checkbox';
				tpbc_amazon.checked = amazon;
				tpbc_amazon.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('amazon', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_amazon);
					$("<label/>", {html: "Show Buy On Amazon Icon<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_color_code = document.createElement('input');
				tpbc_color_code.type = 'checkbox';
				tpbc_color_code.checked = color_code;
				tpbc_color_code.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('color_code', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_color_code);
					$("<label/>", {html: "Color Code Torrents Based Time Added<br>"}).appendTo('#tbpc_formcontents');
					$("<label/>", {html: "Y-Day:", style: "margin-left:25px;margin-right:10px;"}).appendTo('#tbpc_formcontents');
						$("<input/>", {type: "text", id: "tpbc_color_code_yday_color", disabled: "disabled", style: "margin-left:26px;width:25px;padding:2px;text-align:center; font-family:Verdana,Arial,Helvetica,sans-serif;margin-bottom:2px;background-color:"+color_code_yday+";" }).appendTo('#tbpc_formcontents');
						var tpbc_color_code_yday = document.createElement('input');
							tpbc_color_code_yday.type = 'text';
							tpbc_color_code_yday.value = color_code_yday;
							tpbc_color_code_yday.maxlength = '7';
							tpbc_color_code_yday.style.cssText = "width:125px;padding:2px;text-align:center;font-family:Verdana,Arial,Helvetica,sans-serif;margin-bottom:2px;";
							tpbc_color_code_yday.placeholder = "Example: #FF7F7F";
							tpbc_color_code_yday.addEventListener('keyup', 
								function(){
									SettingsChanged = true;
									document.getElementById('tpbc_color_code_yday_color').style.backgroundColor=this.value;
									GM_setValue('color_code_yday', this.value);
								}, false);
								document.getElementById('tbpc_formcontents').appendChild(tpbc_color_code_yday);
								$("<br>").appendTo('#tbpc_formcontents');
					$("<label/>", {html: "Today:", style: "margin-left:25px;margin-right:10px;"}).appendTo('#tbpc_formcontents');
						$("<input/>", {type: "text", id: "tpbc_color_code_today_color", disabled: "disabled", style: "margin-left:26px;width:25px;padding:2px;text-align:center; font-family:Verdana,Arial,Helvetica,sans-serif;margin-bottom:2px;background-color:"+color_code_today+";" }).appendTo('#tbpc_formcontents');
						var tpbc_color_code_today = document.createElement('input');
							tpbc_color_code_today.type = 'text';
							tpbc_color_code_today.value = color_code_today;
							tpbc_color_code_today.maxlength = '7';
							tpbc_color_code_today.style.cssText = "width:125px;padding:2px;text-align:center;font-family:Verdana,Arial,Helvetica,sans-serif;margin-bottom:2px;";
							tpbc_color_code_today.placeholder = "Example: #FFE77F";
							tpbc_color_code_today.addEventListener('keyup', 
								function(){
									SettingsChanged = true;
									document.getElementById('tpbc_color_code_today_color').style.backgroundColor=this.value;
									GM_setValue('color_code_today', this.value);
								}, false);
								document.getElementById('tbpc_formcontents').appendChild(tpbc_color_code_today);
								$("<br>").appendTo('#tbpc_formcontents');
					$("<label/>", {html: "xx Minutes:", style: "margin-left:25px;margin-right:10px;"}).appendTo('#tbpc_formcontents');
						$("<input/>", {type: "text", id: "tpbc_color_code_minutes_color", disabled: "disabled", style: "width:25px;padding:2px;text-align:center; font-family:Verdana,Arial,Helvetica,sans-serif;margin-bottom:2px;background-color:"+color_code_minutes+";" }).appendTo('#tbpc_formcontents');
						var tpbc_color_code_minutes = document.createElement('input');
							tpbc_color_code_minutes.type = 'text';
							tpbc_color_code_minutes.value = color_code_minutes;
							tpbc_color_code_minutes.maxlength = '7';
							tpbc_color_code_minutes.style.cssText = "width:125px;padding:2px;text-align:center;font-family:Verdana,Arial,Helvetica,sans-serif;margin-bottom:2px;";
							tpbc_color_code_minutes.placeholder = "Example: #7FFF8C";
							tpbc_color_code_minutes.addEventListener('keyup', 
								function(){
									SettingsChanged = true;
									document.getElementById('tpbc_color_code_minutes_color').style.backgroundColor=this.value;
									GM_setValue('color_code_minutes', this.value);
								}, false);
								document.getElementById('tbpc_formcontents').appendChild(tpbc_color_code_minutes);
								$("<br>").appendTo('#tbpc_formcontents');
			var tpbc_trust = document.createElement('input');
				tpbc_trust.type = 'checkbox';
				tpbc_trust.checked = trust;
				tpbc_trust.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('trust', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_trust);
					$("<label/>", {html: "Remove Torrents That Are Not From Trusted Uploaders (<img src=\"/static/img/vip.gif\" title=\"VIP\" >&nbsp;<img src=\"/static/img/trusted.png\" title=\"Trusted\" >&nbsp;<img src=\"/static/img/helper.png\" title=\"Helper\" >&nbsp;<img src=\"/static/img/moderator.gif\" title=\"Moderator\" >&nbsp;<img src=\"/static/img/supermod.png\" title=\"Supermod\" >&nbsp;<img src=\"/static/img/admin.gif\" title=\"Admin\" >)<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_filter = document.createElement('input');
				tpbc_filter.type = 'checkbox';
				tpbc_filter.checked = filter;
				tpbc_filter.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('filter', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_filter);
					$("<label/>", {html: "Remove Torrents Based On Keywords <small>(Not case sensitive, words are separated by a pipe | )</small><br>"}).appendTo('#tbpc_formcontents');
					$("<label/>", {html: "Keywords:", style: "margin-left:25px;margin-right:10px;"}).appendTo('#tbpc_formcontents');
						var tpbc_filter_text = document.createElement('input');
							tpbc_filter_text.type = 'text';
							tpbc_filter_text.value = filter_text;
							tpbc_filter_text.style.cssText = "width:500px;padding:2px;";
							tpbc_filter_text.placeholder = "Example: cam|ts|camrip|tsync|ts2dvd|telesync2dvd|720p-ts|telesync|";
							tpbc_filter_text.addEventListener('keyup', 
								function(){
									SettingsChanged = true;
									GM_setValue('filter_text', this.value);
								}, false);
								document.getElementById('tbpc_formcontents').appendChild(tpbc_filter_text);
								$("<br>").appendTo('#tbpc_formcontents');
			var tpbc_pornremove = document.createElement('input');
				tpbc_pornremove.type = 'checkbox';
				tpbc_pornremove.checked = pornremove;
				tpbc_pornremove.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('pornremove', this.checked);
						if(this.checked==true){
							$('#tpbc_pornfilter').prop('disabled', true);
							$('#tpbc_pornfilter_text').prop('disabled', true);
						} else {
							$('#tpbc_pornfilter').prop('disabled', false);
							$('#tpbc_pornfilter_text').prop('disabled', false);
						}
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_pornremove);
					$("<label/>", {html: "Remove All <b style=\"color:red\">Porn</b><br>"}).appendTo('#tbpc_formcontents');
			var tpbc_pornfilter = document.createElement('input');
				tpbc_pornfilter.type = 'checkbox';
				tpbc_pornfilter.checked = pornfilter;
				tpbc_pornfilter.id = 'tpbc_pornfilter';
				if(pornremove == true){ 
					tpbc_pornfilter.disabled = true;
				}else{
					tpbc_pornfilter.disabled = false;
				}
				tpbc_pornfilter.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('pornfilter', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_pornfilter);
					$("<label/>", {html: "Remove <b style=\"color:red\">Porn</b> Based On Keywords <small>(Not case sensitive, words are separated by a pipe | )</small><br>"}).appendTo('#tbpc_formcontents');
					$("<label/>", {html: "Keywords:", style: "margin-left:25px;margin-right:10px;"}).appendTo('#tbpc_formcontents');
						var tpbc_pornfilter_text = document.createElement('input');
							tpbc_pornfilter_text.type = 'text';
							tpbc_pornfilter_text.id = 'tpbc_pornfilter_text';
							if(pornremove == true){ 
								tpbc_pornfilter_text.disabled = true;
							}else{
								tpbc_pornfilter_text.disabled = false;
							}
							tpbc_pornfilter_text.value = pornfilter_text;
							tpbc_pornfilter_text.style.cssText = "width:500px;padding:2px;";
							tpbc_pornfilter_text.placeholder = "Example: xxx|cam|pussy|vagina|ts|milf|porn|camrip|vhs";
							tpbc_pornfilter_text.addEventListener('keyup', 
								function(){
									SettingsChanged = true;
									GM_setValue('pornfilter_text', this.value);
								}, false);
								document.getElementById('tbpc_formcontents').appendChild(tpbc_pornfilter_text);
								$("<br>").appendTo('#tbpc_formcontents');
			var tpbc_magnet = document.createElement('input');
				tpbc_magnet.type = 'checkbox';
				tpbc_magnet.checked = magnet;
				tpbc_magnet.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('magnet', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_magnet);
					$("<label/>", {html: "Remove Magnet Links<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_anonymous = document.createElement('input');
				tpbc_anonymous.type = 'checkbox';
				tpbc_anonymous.checked = anonymous;
				tpbc_anonymous.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('anonymous', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_anonymous);
					$("<label/>", {html: "Remove \"Anonymous Download\" Links<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_images = document.createElement('input');
				tpbc_images.type = 'checkbox';
				tpbc_images.checked = images;
				tpbc_images.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('images', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_images);
					$("<label/>", {html: "Click Cover Image Icon To Open Cover Image<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_comments = document.createElement('input');
				tpbc_comments.type = 'checkbox';
				tpbc_comments.checked = comments;
				tpbc_comments.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('comments', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_comments);
					$("<label/>", {html: "Click Comments Icon To Open Comments<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_save_history = document.createElement('input');
				tpbc_save_history.type = 'checkbox';
				tpbc_save_history.checked = save_history;
				tpbc_save_history.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('save_history', this.checked);
						if(this.checked==true){
							$('#delete_history').fadeIn('slow', function(){});
						} else {
							$('#delete_history').fadeOut('slow', function(){});
						}
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_save_history);
					$("<label/>", {html: "Remember Downloaded <small>(This unchecked will NOT clear any history. MAY increase site loading time.)</small><br>"}).appendTo('#tbpc_formcontents');
			var tpbc_delete_history = document.createElement('input');
				tpbc_delete_history.type = 'button';
				tpbc_delete_history.value = 'Clear History';
				tpbc_delete_history.id = 'delete_history';
				if(save_history == true){ 
					tpbc_delete_history.style.cssText = "margin-left:25px;width:125px;padding:2px;";
				}else{
					tpbc_delete_history.style.cssText = "margin-left:25px;width:125px;padding:2px;display:none;";
				}
				tpbc_delete_history.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue("torrent_history",'');
						alert('History Cleared');
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_delete_history);
			$("<h2/>", {html: "Other Settings <label style=\"color:red\">All Settings Are Saved Instantly!</label>", style: "text-align:left;margin:5px 0px;font-size:1.1em;font-weight:normal;line-height:1.5em;"}).appendTo('#tbpc_formcontents');
			var tpbc_remotetorrent = document.createElement('input');
				tpbc_remotetorrent.type = 'checkbox';
				tpbc_remotetorrent.checked = remotetorrent;
				tpbc_remotetorrent.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('remotetorrent', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_remotetorrent);
					$("<label/>", {html: "Show Button To Launch Remote Web Client Service<br>"}).appendTo('#tbpc_formcontents');
					$("<label/>", {html: "Client:", style: "margin-left:25px;margin-right:10px;"}).appendTo('#tbpc_formcontents');
						var tpbc_remotetorrent_client = document.createElement('select');
								tpbc_remotetorrent_client.id = 'tpbc_remotetorrent_client';
								tpbc_remotetorrent_client.style.cssText = "width:125px;padding:2px;text-align:center; font-family:Verdana,Arial,Helvetica,sans-serif;margin-bottom:2px;";
								tpbc_remotetorrent_client.addEventListener('change', function(){
										SettingsChanged = true;
										GM_setValue('remotetorrent_client', this.value);
											if(this.value=='4'){
												$('#transmission_url').fadeIn('slow', function(){});
											} else {
												$('#transmission_url').fadeOut('slow', function(){});
											}
									}, false);
									document.getElementById('tbpc_formcontents').appendChild(tpbc_remotetorrent_client);
									var client_1 = document.createElement("option");
										client_1.value='1';
										client_1.innerHTML = 'µTorrent';
										if(remotetorrent_client == '1') client_1.selected = true;
									    tpbc_remotetorrent_client.appendChild(client_1);
									var client_2 = document.createElement("option");
										client_2.value='2';
										client_2.innerHTML = 'Vuze';
										if(remotetorrent_client == '2') client_2.selected = true;
									    tpbc_remotetorrent_client.appendChild(client_2);
									var client_3 = document.createElement("option");
										client_3.value='3';
										client_3.innerHTML = 'BitTorrent';
										if(remotetorrent_client == '3') client_3.selected = true;
									    tpbc_remotetorrent_client.appendChild(client_3);
									var client_4 = document.createElement("option");
										client_4.value='4';
										client_4.innerHTML = 'Transmission';
										if(remotetorrent_client == '4') client_4.selected = true;
									    tpbc_remotetorrent_client.appendChild(client_4);
									var client_4_url = document.createElement("input");
									client_4_url.type = 'text';
									client_4_url.id = 'transmission_url';
									client_4_url.value = transmission_url;
									if(remotetorrent_client == '4'){ 
										client_4_url.style.cssText = "width:500px;padding:2px;";
									}else{
										client_4_url.style.cssText = "width:500px;padding:2px;display:none;";
									}
									client_4_url.placeholder = "Example: http://192.168.178.100:9090";
									client_4_url.addEventListener('keyup', 
										function(){
											SettingsChanged = true;
											GM_setValue('transmission_url', $.trim(this.value));
										}, false);
									document.getElementById('tbpc_formcontents').appendChild(client_4_url);
											$("<br>").appendTo('#tbpc_formcontents');
												var remotetorrent_client_mode_lightbox = document.createElement('input');
												remotetorrent_client_mode_lightbox.style.cssText = "margin-left:25px;margin-right:10px;";
												remotetorrent_client_mode_lightbox.name= 'radio2';
												remotetorrent_client_mode_lightbox.type = 'radio';
												if(remotetorrent_client_mode == 'lightbox') remotetorrent_client_mode_lightbox.checked = true;
												remotetorrent_client_mode_lightbox.addEventListener('click', 
													function(){
														SettingsChanged = true;
														GM_setValue('remotetorrent_client_mode', 'lightbox');
													}, false);
													document.getElementById('tbpc_formcontents').appendChild(remotetorrent_client_mode_lightbox);
													$("<label/>", {html: "Open Client In Lightbox"}).appendTo('#tbpc_formcontents');
												var remotetorrent_client_mode_window = document.createElement('input');
												remotetorrent_client_mode_window.style.cssText = "margin-left:33px;margin-right:10px;";
												remotetorrent_client_mode_window.name= 'radio2';
												remotetorrent_client_mode_window.type = 'radio';
												if(remotetorrent_client_mode == 'window') remotetorrent_client_mode_window.checked = true;
												remotetorrent_client_mode_window.addEventListener('click', 
													function(){
														SettingsChanged = true;
														GM_setValue('remotetorrent_client_mode', 'window');
													}, false);
													document.getElementById('tbpc_formcontents').appendChild(remotetorrent_client_mode_window);
													$("<label/>", {html: "Open Client In New Window"}).appendTo('#tbpc_formcontents');
					$("<br>").appendTo('#tbpc_formcontents');
			var tpbc_https = document.createElement('input');
				tpbc_https.type = 'checkbox';
				tpbc_https.checked = https;
				tpbc_https.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('https', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_https);
					$("<label/>", {html: "Always Use HTTPS<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_theme = document.createElement('input');
				tpbc_theme.type = 'checkbox';
				tpbc_theme.checked = theme;
				tpbc_theme.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('theme', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_theme);
					$("<label/>", {html: "Use Dark Theme<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_google = document.createElement('input');
				tpbc_google.type = 'checkbox';
				tpbc_google.checked = google;
				tpbc_google.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('google', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_google);
					$("<label/>", {html: "Use Google Search As Search Replacement<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_stretch = document.createElement('input');
				tpbc_stretch.type = 'checkbox';
				tpbc_stretch.checked = stretch;
				tpbc_stretch.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('stretch', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_stretch);
					$("<label/>", {html: "Stretch To Fit Width<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_ads = document.createElement('input');
				tpbc_ads.type = 'checkbox';
				tpbc_ads.checked = ads;
				tpbc_ads.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('ads', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_ads);
					$("<label/>", {html: "Remove Adverts<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_single = document.createElement('input');
				tpbc_single.type = 'checkbox';
				tpbc_single.checked = single;
				tpbc_single.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('single', this.checked);
						if (this.checked == true) setCookie('lw','s',999); else setCookie('lw','d',999);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_single);
					$("<label/>", {html: "Use Single Line Instead Of Double Line<br>"}).appendTo('#tbpc_formcontents');
			var tpbc_linkify_all = document.createElement('input');
				tpbc_linkify_all.type = 'checkbox';
				tpbc_linkify_all.checked = linkify_all;
				tpbc_linkify_all.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('linkify_all', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_linkify_all);
					$("<label/>", {html: "Try To Lightbox External Links <small>(Will not work with sites that block being embedded)</small><br>"}).appendTo('#tbpc_formcontents');
			var tpbc_faves = document.createElement('input');
				tpbc_faves.type = 'checkbox';
				tpbc_faves.checked = save_faves;
				tpbc_faves.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('save_faves', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_faves);
					$("<label/>", {html: "Allow Saving of Favorite Users<br>"}).appendTo('#tbpc_formcontents');
            var tpbc_refresh = document.createElement('input');
				tpbc_refresh.type = 'checkbox';
				tpbc_refresh.checked = refresh;
				tpbc_refresh.addEventListener('click', 
					function(){
						SettingsChanged = true;
						GM_setValue('refresh', this.checked);
					}, false);
					document.getElementById('tbpc_formcontents').appendChild(tpbc_refresh);
					$("<label/>", {html: "Enable Option to Refresh Current Page Every "}).appendTo('#tbpc_formcontents');
                        var tpbc_refresh_duration = document.createElement('select');
                        tpbc_refresh_duration.id = 'tpbc_remotetorrent_client';
                        tpbc_refresh_duration.style.cssText = "width:125px;padding:2px;text-align:center; font-family:Verdana,Arial,Helvetica,sans-serif;margin-bottom:2px;";
                        tpbc_refresh_duration.addEventListener('change', function(){
                            SettingsChanged = true;
                            GM_setValue('refresh_duration', this.value);
                        }, false);
                        document.getElementById('tbpc_formcontents').appendChild(tpbc_refresh_duration);
                            var time_1 = document.createElement("option");
                            time_1.value='60000';
                            time_1.innerHTML = 'Minute';
                            if(refresh_duration_int == '60000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='300000';
                            time_1.innerHTML = '5 Minutes';
                            if(refresh_duration_int == '300000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='600000';
                            time_1.innerHTML = '10 Minutes';
                            if(refresh_duration_int == '600000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='900000';
                            time_1.innerHTML = '15 Minutes';
                            if(refresh_duration_int == '900000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='1200000';
                            time_1.innerHTML = '20 Minutes';
                            if(refresh_duration_int == '1200000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='1500000';
                            time_1.innerHTML = '25 Minutes';
                            if(refresh_duration_int == '1500000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='1800000';
                            time_1.innerHTML = '30 Minutes';
                            if(refresh_duration_int == '1800000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='2700000';
                            time_1.innerHTML = '45 Minutes';
                            if(refresh_duration_int == '2700000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='3600000';
                            time_1.innerHTML = 'Hour';
                            if(refresh_duration_int == '3600000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='7200000';
                            time_1.innerHTML = '2 Hours';
                            if(refresh_duration_int == '7200000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='10800000';
                            time_1.innerHTML = '3 Hours';
                            if(refresh_duration_int == '10800000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='14400000';
                            time_1.innerHTML = '4 Hours';
                            if(refresh_duration_int == '14400000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='18000000';
                            time_1.innerHTML = '5 Hours';
                            if(refresh_duration_int == '18000000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='21600000';
                            time_1.innerHTML = '6 Hours';
                            if(refresh_duration_int == '21600000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='25200000';
                            time_1.innerHTML = '7 Hours';
                            if(refresh_duration_int == '25200000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='28800000';
                            time_1.innerHTML = '8 Hours';
                            if(refresh_duration_int == '28800000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='32400000';
                            time_1.innerHTML = '9 Hours';
                            if(refresh_duration_int == '32400000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='36000000';
                            time_1.innerHTML = '10 Hours';
                            if(refresh_duration_int == '36000000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='39600000';
                            time_1.innerHTML = '11 Hours';
                            if(refresh_duration_int == '39600000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='43200000';
                            time_1.innerHTML = '12 Hours';
                            if(refresh_duration_int == '43200000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='64800000';
                            time_1.innerHTML = '18 Hours';
                            if(refresh_duration_int == '64800000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                            var time_1 = document.createElement("option");
                            time_1.value='86400000';
                            time_1.innerHTML = '24 Hours';
                            if(refresh_duration_int == '86400000') time_1.selected = true;
                            tpbc_refresh_duration.appendChild(time_1);
                $("<br>").appendTo('#tbpc_formcontents');
			$("#tpbc_lightbox").css({'background':'#000'});
		break;
	}
    /* If we click anywhere on the lightbox then it closes and checks for things that have changed and alerts etc. */
	$("#tpbc_lightbox").click(function(){
		if( $(tpbc_remotetorrent_client).val()=='4' && $.trim($(client_4_url).val()) == '' ){
			alert('You have not entered your Transmission URL');
			$('#transmission_url').focus();
		}else{
			$("#tpbc_lightbox").css({'background':'#000'});
			$('#tpbc_holder').remove();
			$('#tpbc_holder_form').remove();
			$("#tpbc_lightbox").fadeOut('fast', function () {
				$(this).remove();
			});
			if (SettingsChanged == true){
				alert('Something Changed! Page Will Now Refresh');
				SettingsChanged = false;
				location.reload();
			}
		}
	});
    /* Same as above, but against a different object. Check for things that may have changed and alerts or refreshes etc. */
	$("#tpbc_holder").click(function(){
		if( $(tpbc_remotetorrent_client).val()=='4' && $.trim($(client_4_url).val()) == '' ){
			alert('You have not entered your Transmission URL');
			$('#transmission_url').focus();
		}else{
			$("#tpbc_lightbox").css({'background':'#000'});
			$('#tpbc_holder').remove();
			$("#tpbc_lightbox").fadeOut('fast', function () {
				$("#tpbc_lightbox").remove();
			});
			if (SettingsChanged == true){
				alert('Something Changed! Page Will Now Refresh');
				SettingsChanged = false; 
				location.reload();
			}
		}
	});
}
/* Check for Escape Key, used for some windows */
$('body').keyup(function(e){
    if( e.which == 27 && window.Escapable == true ){
        $("#tpbc_lightbox").css({'background':'#000'});
        $('#tpbc_holder').remove();
        $('#tpbc_holder_form').remove();
        $("#tpbc_lightbox").fadeOut('fast', function () {
            $(this).remove();
        });
        window.Escapable = false;
    }
});
/* Use this function to display the settings window */
function ShowSettings(){
	Lightbox('settings');
}
/* Some basic checking, if you entered a transmission url for custom torrent client */
if(remotetorrent_client == '4' && transmission_url == ''){
	Lightbox('settings');
	alert('You have not entered your Transmission URL');
	$('#transmission_url').focus();
}
/* If use Google has been set, then change fields to show it, so the user knows */
if(google == true){
	$('#chb').remove();
	$('#subm > input:nth-child(2)').remove();
	$('#q > label').remove();
	$('#q > select').remove();
	$('.https_form').attr('placeholder', 'Google Pirate Search...');
	$('#inp > input').attr('placeholder', 'Google Pirate Search...');
	$('.submitbutton').attr('value', 'Google Pirate Search');
	$('#subm > input:first').attr('value', 'Google Pirate Search');						
	if (https==true){
		$('#fp > form').attr('action', 'https://www.google.com/search');
		$('#header > form').attr('action', 'https://www.google.com/search');
	} else {
		$('#fp > form').attr('action', 'http://www.google.com/search');
		$('#header > form').attr('action', 'http://www.google.com/search');
	}
}
/* Remove things definitely no longer needed on TPB */
$('.viewswitch').remove();
$("img[src$='11x11p.png']").remove();
$("img[src$='dl.gif']").remove();
$('a:contains("Get Torrent File")').remove();
$('.download:contains("()")').each(function(){$(this).html($(this).html().split("()").join(""));});
/* Remove things the user has decided they no longer need on TPB */
if(ads == true){
	$("img[src$='banner.png']").remove();
	$("img[src$='bar.gif']").remove();
	$('.ad').remove();
	$('iframe').remove();
}
if(pornremove == true){
	$('.categoriesContainer:nth-child(2) > dl > dt:eq(1)').remove();
	$('.categoriesContainer:nth-child(2) > dl > dd:eq(1)').remove();
}
/* Stretch TPB to use the whole available screen space */
if(stretch == true){
	$('#content').css({'margin':'0','min-width':'100%'});
	$('#main-content').css({'margin-left':'0','padding-right':'0'});
}
/* Remove magnets links if required */
if(magnet == true){
	$("img[src$='icon-magnet.gif']").remove();
	$('a:contains("Get this torrent")').remove();
	$('#details > div:contains("Problems with magnets links are fixed by upgrading your")').remove();
}
/* Remove the anonymous links if required */
if(anonymous == true){
	$('a:contains("Anonymous Download")').remove();
}
/* Advise the user that they have chosen to remove all methods of downloading */
if(magnet == true && anonymous == true && torrentify==false) $('<p style="margin:0;padding:10px;font-size: 1.2em;text-align:center;width:600px;background-color:red;color:yellow;">Oh dear! It looks like you have removed all ways and means to download this torrent!</p>').appendTo('.download:first');
/* Adds the button to show settings */
/* Create a container for all the buttons */
$('<div />', {id: 'tpbc_btn_container', style:'position:absolute; top:5px; right:5px; z-index:999;margin:0;padding:0;'}).appendTo("body");
$('<img />', {name:'tpbc_settings', title: 'TPBC Settings', src:'//i.imgur.com/aQMmcuW.png', style: 'cursor:pointer; float:right;'}).click(ShowSettings).appendTo("#tpbc_btn_container");
/* If the user has chosen to show a remote torrent client in the browser then this is where it will add the button */
if(remotetorrent==true){
    switch(remotetorrent_client){
    /* uTorrent */
    case '1':
        $('<img />', {id: 'torrent_client', title: 'Open Remote µTorrent', src:'//i.imgur.com/sDpDX2k.png', style: 'cursor:pointer; float:right; margin-right:5px;'}).appendTo("#tpbc_btn_container");
        $('#torrent_client').on('click', function(){ 
            if(remotetorrent_client_mode=='window'){window.open('https://remote.utorrent.com/srp', '_blank');}
            else if(remotetorrent_client_mode=='lightbox'){
                LightboxBG();
                Lightbox('www', "https://remote.utorrent.com/srp", 'nobg');
            }
        });
        break;
    /* Vuze */
    case '2':
        $('<img />', {id: 'torrent_client', title: 'Open Remote Vuze', src:'//i.imgur.com/0J5FPyM.png', style: 'cursor:pointer; float:right; margin-right:5px;'}).appendTo("#tpbc_btn_container");
        $('#torrent_client').on('click', function(){ 
            if(remotetorrent_client_mode=='window'){window.open('http://remote.vuze.com/', '_blank');}
            else if(remotetorrent_client_mode=='lightbox'){
                LightboxBG();
                Lightbox('www', "http://remote.vuze.com/", 'nobg');
            }
        });
        break;
    /* Bittorent */
    case '3':
        $('<img />', {id: 'torrent_client', title: 'Open Remote BitTorrent', src:'//i.imgur.com/jKNMk4G.png', style: 'cursor:pointer; float:right; margin-right:5px;'}).appendTo("#tpbc_btn_container");
        $('#torrent_client').on('click', function(){ 
            if(remotetorrent_client_mode=='window'){window.open('https://remote.bittorrent.com/srp', '_blank');}
            else if(remotetorrent_client_mode=='lightbox'){
                LightboxBG();
                Lightbox('www', "https://remote.bittorrent.com/srp", 'nobg');
            }
        });
        break;
    /* Transmission */
    case '4':
        $('<img />', {id: 'torrent_client', title: 'Open Transmission', src:'//i.imgur.com/GA9ghaR.png', style: 'cursor:pointer; float:right; margin-right:5px;'}).appendTo("#tpbc_btn_container");
        $('#torrent_client').on('click', function(){ 
            if(remotetorrent_client_mode=='window'){window.open(transmission_url, '_blank');}
            else if(remotetorrent_client_mode=='lightbox'){
                LightboxBG();
                Lightbox('www', transmission_url, 'nobg');
            }
        });
        break;
    }
}
/* Checks to see if the auto refresh feature is turned on */
if(refresh==true){
    var refresh_button = document.createElement('a');
    refresh_button.id = "refresh_button";
    refresh_button.style.cssText = 'cursor:pointer; height:40px; border:0; width:40px; display:block; text-decoration:none!important; float:right; margin-right:5px; background: url(//i.imgur.com/u4tV1h1.png) 0px 40px;';
    $(refresh_button).attr('onmouseover' , "this.style.background='url(//i.imgur.com/u4tV1h1.png) 0px 0px'");
    $(refresh_button).attr('onmouseout' , "this.style.background='url(//i.imgur.com/u4tV1h1.png) 0px 40px'");
    $("#refresh_button").attr('title' , "Turn On Auto Refresh");
    refresh_button.addEventListener('click', function(){TogglePageRefresh()}, false);
    $('#tpbc_btn_container').append(refresh_button);
}
/* If choosing to save favourites and are on a user page, then add the star */
if(save_faves==true && url.match(/\/user\//gi)){
    var current_user = url.split('/')[4];
    var fave_star = document.createElement('a');
    var fave_user_array_location = the_faves_array.indexOf(current_user);
    if(fave_user_array_location >= 0){
        fave_star.style.cssText = 'cursor:pointer; height:40px; border:0; width:40px; display:block; text-decoration:none!important; background: url(//i.imgur.com/Wpee6Pq.png) 0px 0px; float:right; margin-right:5px;';
        $(fave_star).attr('onmouseover' , "this.style.background='url(//i.imgur.com/Wpee6Pq.png) 0px 40px'");
        $(fave_star).attr('onmouseout' , "this.style.background='url(//i.imgur.com/Wpee6Pq.png) 0px 0px'");
        fave_star.title = 'Remove from Favorites';
        fave_star.addEventListener('click', function(){
            the_faves_array.splice(fave_user_array_location, 1);
            the_faves_array.sort();
            the_faves = the_faves_array.join();
            GM_setValue("the_faves",the_faves);
            location.reload(); 
        });
    } else {
        fave_star.style.cssText = 'cursor:pointer; height:40px; border:0; width:40px; display:block; text-decoration:none!important; background: url(//i.imgur.com/Wpee6Pq.png) 0px 40px; float:right; margin-right:5px;';
        $(fave_star).attr('onmouseover' , "this.style.background='url(//i.imgur.com/Wpee6Pq.png) 0px 0px'");
        $(fave_star).attr('onmouseout' , "this.style.background='url(//i.imgur.com/Wpee6Pq.png) 0px 40px'");
        fave_star.title = 'Add to Favorites';
        fave_star.addEventListener('click', function(){
            the_faves_array.unshift(current_user);
            the_faves_array.sort();
            the_faves = the_faves_array.join();
            GM_setValue("the_faves",the_faves);
            location.reload(); 
        });
    }
    $('#tpbc_btn_container').append(fave_star);
    var faves_dropdown = document.createElement('select');
    faves_dropdown.id = 'faves_dropdown';
    faves_dropdown.style.cssText = "min-width:200px; height:40px; text-align:center; font-family:Verdana,Arial,Helvetica,sans-serif; font-size:25px; float:right; margin-right:5px;";
    if(the_faves_array.length <= 1) faves_dropdown.style.cssText = "display:none;";
    for(var i = 0; i < the_faves_array.length; i++){
        var user_name = document.createElement("option");
        user_name.value = the_faves_array[i];
        user_name.innerHTML = the_faves_array[i];
        faves_dropdown.appendChild(user_name);
    }
    faves_dropdown.addEventListener('change', function(){
        if(this.value != ""){
            location.replace('\/\/' + domain + '\/user\/' + this.value + '\/');
        }
    });
    $('#tpbc_btn_container').append(faves_dropdown);
	$('#faves_dropdown').val(current_user);
} /* If not on a user page, then just show the drop down, with the list of users that you can quick jump to. */
else if(save_faves==true && !url.match(/\/user\//gi)){
    var faves_dropdown = document.createElement('select');
    faves_dropdown.style.cssText = "min-width:200px; height:40px; text-align:center; font-family:Verdana,Arial,Helvetica,sans-serif; font-size:25px; float:right; margin-right:5px;";
    for(var i = 0; i < the_faves_array.length; i++){
        var user_name = document.createElement("option");
        user_name.value = the_faves_array[i];
        user_name.innerHTML = the_faves_array[i];
        faves_dropdown.appendChild(user_name);
    }
    faves_dropdown.addEventListener('change', function(){
        if(this.value != ""){
            location.replace('\/\/' + domain + '\/user\/' + this.value + '\/');
        }
    });
    $('#tpbc_btn_container').append(faves_dropdown);
}
/* Turn on the count down timer for the auto refresh if turned on */
if( refresh==true && getCookie(url) == 'AutoRefresh' ){
    refresh_button.style.background = "url(//i.imgur.com/u4tV1h1.png) 0px 0px";
    TogglePageRefresh();
}
/* This is where we decide whether or not to show the little icons in the main torrent lists */
/* Yes or no to showing the comments in a lightbox */
if(comments==true){
	$("img[src$='icon_comment.gif']").attr('style', 'cursor:pointer;');
	$("img[src$='icon_comment.gif']").on('click', function(){
		LightboxBG();
		if(single==false) var torrentID = $(this).parent().children('.detName').children('a:first').attr('href').split('/')[2]; else var torrentID = $(this).parent().parent().parent().children('td:nth-child(2)').children('a:first').attr('href').split('/')[2];
		Lightbox('www', '/ajax_details_comments.php?id='+torrentID, 'nobg');
	});
}
/* Yes or no to showing the cover images in a lightbox */
if(images==true){
	$("img[src$='icon_image.gif']").attr('style', 'cursor:pointer;');
	$("img[src$='icon_image.gif']").on('click', function(){
		if(single==false) var torrentURL = $(this).parent().children('.detName').children('a:first').attr('href'); else var torrentURL = $(this).parent().parent().parent().children('td:nth-child(2)').children('a:first').attr('href');
		LightboxBG();
		$.ajax({
			url: torrentURL, 
            success: function(data){
				var doc = document.createElement("html")
				doc.innerHTML = data;
				var picture = doc.getElementsByTagName("img")[2].src
				Lightbox('img', picture, 'nobg');
			}
		});
	});
}
$('#searchResult > tbody > tr').each(function(i){
	/* Local variables declaration */
    var filter_text_regex_keywords = new RegExp('/xvid\\-\\w+|ac3\\-\\w+|x264\\-\\w+|dvdrip\\-\\w+|\\w+\\-\\w+|hive\\-\\w+| webrip |limited|dvdrip|hdrip|webrip|divx|readnfo|RemixHD|bdrip|bluray|brrip|repack|juggs|retail|1080p|480p|720p|hdts|ssdd|x264|xvid|ac3| hq |r5|r6|5\\.1|fix|[12]cd|[12]xcd|\\[ddr\\]/', 'gi');
	var torrentHTML = $(this).html();
	var torrentTitle = $(this).children('td:eq(1)').children('div').children('a').attr('href');
	if(single==false) var torrentID = torrentHTML.match(/\d+/g)[2]; else var torrentID = torrentHTML.match(/\d+/g)[1];
	if(!torrentHTML.match(/alt="Next"|alt="Previous"/gi)){
		/* Colour coding of torrents depending on when they were added */
        if(color_code==true){
			if(torrentHTML.match(/Y-day/g)){
				$(this).css({'background-color':color_code_yday});
			} else if(torrentHTML.match(/Today/g)){
				$(this).css({'background-color':color_code_today});
			} else if(torrentHTML.match(/\d+&nbsp;mins&nbsp;ago|\d+&nbsp;min&nbsp;ago/g)){
				$(this).css({'background-color':color_code_minutes});
			} else if (theme==true){
				$(this).css({'background-color':'#000000'});
			}
			$(this).hover(
				function(){ 
					if(torrentHTML.match(/Y-day/g)){
						if(theme==false)$(this).css({'background-color':increase_brightness(color_code_yday,40)}); else $(this).css({'background-color':increase_brightness(color_code_yday,-40)});
					} else if(torrentHTML.match(/Today/g)){
						if(theme==false)$(this).css({'background-color':increase_brightness(color_code_today,40)}); else $(this).css({'background-color':increase_brightness(color_code_today,-40)});
					} else if(torrentHTML.match(/\d+&nbsp;mins&nbsp;ago|\d+&nbsp;min&nbsp;ago/g)){
						if(theme==false)$(this).css({'background-color':increase_brightness(color_code_minutes, 40)}); else $(this).css({'background-color':increase_brightness(color_code_minutes,-40)});
					} else {
						if(theme==false) $(this).css({'background-color':'#FFFFFF'}); else $(this).css({'background-color':'#404040'});
					}
				}, function(){ 
					if(torrentHTML.match(/Y-day/g)){
						$(this).css({'background-color':color_code_yday});
					} else if(torrentHTML.match(/Today/g)){
						$(this).css({'background-color':color_code_today});
					} else if(torrentHTML.match(/\d+&nbsp;mins&nbsp;ago|\d+&nbsp;min&nbsp;ago/g)){
						$(this).css({'background-color':color_code_minutes});
					} else {
						if(theme==false) $(this).css({'background-color':'#F6F1EE'}); else $(this).css({'background-color':'#000000'})
					}
				}
			);
		}
        /* Search other torrent sites icon */
		if(alternate==true){
			var tpbc_alternate_icon = document.createElement('img');
			tpbc_alternate_icon.title = 'Find On Other Torrent Sites';
			tpbc_alternate_icon.style.cssText = 'cursor:pointer;';
			tpbc_alternate_icon.src = '//i.imgur.com/OIOj823.png';
			tpbc_alternate_icon.addEventListener('click', 
				function(){
					if(single==false) var torrentName = $(this).parent().children('.detName').children('a:first').text(); else var torrentName = $(this).parent().parent().children('td:nth-child(2)').children('a').text(); 
					LightboxBG();
					Lightbox('www', 'https://kickass.to/usearch/'+torrentName+'/' ,'nobg');
				}, false);
			if(single==false) $($(this).children('td:nth-child(2)').children('div:first')).after(tpbc_alternate_icon); else $($(this).children('td:nth-child(4)').children('nobr')).after(tpbc_alternate_icon);
		}
        /* Search IMDB icon */
		if(imdb==true){
			if($(this).children('td:first').html().match(/Video/gi)){
			var tpbc_imdb_icon = document.createElement('img');
			tpbc_imdb_icon.title = 'Find on IMDB';
			tpbc_imdb_icon.style.cssText = 'cursor:pointer;';
			tpbc_imdb_icon.src = '//i.imgur.com/VHOBG4q.png';
			tpbc_imdb_icon.addEventListener('click', 
				function(){
					if(single==false) var torrentURL = $(this).parent().children('.detName').children('a:first').attr('href'); 
                    else var torrentURL = $(this).parent().parent().children('td:nth-child(2)').children('a').attr('href');
                    $.ajax({
						url: torrentURL, 
                        success: function(data){
							var imdb_url = data.match(/imdb.com\/title\/tt[^/]+/gi);
							if(imdb_url) window.open("http://"+imdb_url[0], "_blank"); else { alert('No IMDB Link Found'); }
						},
                        async: false
					});
				}, false);
			if(single==false) $($(this).children('td:nth-child(2)').children('div:first')).after(tpbc_imdb_icon); else $($(this).children('td:nth-child(4)').children('nobr')).after(tpbc_imdb_icon);
			}
		}
        /* Show torrent info icon */
		if(info==true){
			var tpbc_info_icon = document.createElement('img');
			tpbc_info_icon.title = 'Show Torrent Information';
			tpbc_info_icon.style.cssText = 'cursor:pointer;';
			tpbc_info_icon.src = '//i.imgur.com/oFuIiGu.png';
			tpbc_info_icon.addEventListener('click', 
				function(){
					if(single==false) var torrentURL = $(this).parent().children('.detName').children('a:first').attr('href'); else var torrentURL = $(this).parent().parent().children('td:nth-child(2)').children('a:first').attr('href');
					LightboxBG();
					$.ajax({
						url: torrentURL, 
                        success: function(data){
							var doc = document.createElement("html")
							doc.innerHTML = data;
							var tor_info = $(doc).find('.nfo').html();
							Lightbox('code', tor_info, 'nobg');
						}
					});
				}, false);
			if(single==false) $($(this).children('td:nth-child(2)').children('div:first')).after(tpbc_info_icon); else $($(this).children('td:nth-child(4)').children('nobr')).after(tpbc_info_icon);
		}
        /* Search on Amazon icon */
		if(amazon==true){
			var tpbc_amazon_icon = document.createElement('img');
			tpbc_amazon_icon.title = 'Find on Amazon';
			tpbc_amazon_icon.style.cssText = 'cursor:pointer;';
			tpbc_amazon_icon.src = '//i.imgur.com/FeeU0sa.png';
			tpbc_amazon_icon.addEventListener('click', 
				function(){
					if(single==false) var torrentName = $(this).parent().children('.detName').children('a:first').text().replace(filter_text_regex_keywords,''); else var torrentName = $(this).parent().parent().children('td:nth-child(2)').children('a').text().replace(filter_text_regex_keywords,'');
					torrentName = torrentName.replace(/\.|\-/gi,' ');
					LightboxBG();
					Lightbox('www', 'https://www.amazon.com/s?field-keywords='+torrentName ,'nobg');						
				}, false);
			if(single==false) $($(this).children('td:nth-child(2)').children('div:first')).after(tpbc_amazon_icon); else $($(this).children('td:nth-child(4)').children('nobr')).after(tpbc_amazon_icon);
		}
		/* Search on eBay icon */
        if(ebay==true){
			var tpbc_ebay_icon = document.createElement('img');
			tpbc_ebay_icon.title = 'Find on eBay';
			tpbc_ebay_icon.style.cssText = 'cursor:pointer;';
			tpbc_ebay_icon.src = '//i.imgur.com/2w3bKvx.png';
			tpbc_ebay_icon.addEventListener('click', 
				function(){
					if(single==false) var torrentName = $(this).parent().children('.detName').children('a:first').text().replace(filter_text_regex_keywords,''); else var torrentName = $(this).parent().parent().children('td:nth-child(2)').children('a').text().replace(filter_text_regex_keywords,'');
					torrentName = torrentName.replace(/\.|\-/gi,' ');
					LightboxBG();
					Lightbox('www', 'https://www.ebay.com/sch/i.html?_nkw='+torrentName ,'nobg');						
				}, false);
			if(single==false) $($(this).children('td:nth-child(2)').children('div:first')).after(tpbc_ebay_icon); 
			else $($(this).children('td:nth-child(4)').children('nobr')).after(tpbc_ebay_icon);
		}
		/* Add the option to use torrents */
        if(torrentify==true){
			if(single==false) var torrentURL = $(this).children('td:nth-child(2)').children('div:first').children('a:first').attr('href').replace('/torrent','//torrents.' + domain); 
			else var torrentURL = $(this).children('td:nth-child(2)').children('a').attr('href').replace('/torrent','//torrents.' + domain);
			var tpbc_torrent_icon = document.createElement('a');
			var linkText = document.createElement('img');
			linkText.src = '//' + domain + '/static/img/dl.gif';
			tpbc_torrent_icon.appendChild(linkText);
			tpbc_torrent_icon.title = 'Download this torrent';
			tpbc_torrent_icon.href = torrentURL + ' [The Pirate Bay Cleaner].torrent';
			if(save_history==true){
				tpbc_torrent_icon.addEventListener('click', function(){
					var thisTorrent = new RegExp('\\b' + torrentID + '\\b', 'i');
					if (!(thisTorrent.test(torrent_history_array))){
						torrent_history_array.unshift(torrentID + '<' + dateNow() + '>');
						torrent_history = torrent_history_array.join();
						GM_setValue("torrent_history",torrent_history);
						var beendownloaded_img = document.createElement('img');
						beendownloaded_img.src = '//i.imgur.com/E5zH2QV.png';
						beendownloaded_img.title = 'Downloaded on ' + ordinal(dateNow().substr(8,2)) + ' ' + monthName(dateNow().substr(5,2)) + ', ' + dateNow().substr(0,4)
						beendownloaded_img.style.cssText = 'height:' + ($(this).parent().parent().height()-7) + 'px;float:right';
						if(single==false) $(this).parent().children('div:first').before(beendownloaded_img);
						else $(this).children('td:nth-child(2)').append(beendownloaded_img);
					}
				});
			}
			if(single==false) $($(this).children('td:nth-child(2)').children('div:first')).after(tpbc_torrent_icon); 
			else $($(this).children('td:nth-child(4)').children('nobr')).before(tpbc_torrent_icon);
		}
        /* Remove torrents from untrusted sources */
		if(trust==true){
			if(!torrentHTML.match(/alt=\"Trusted\"|alt=\"VIP\"|alt=\"Helper\"|alt=\"Moderator\"|alt=\"Supermod\"|alt=\"Admin\"/gi)){
				$(this).remove();
			}
		}
        /* Remove torrents that you want to filter based on chosen keywords */
		if(filter==true && filter_text != ''){
			var filter_text_regex = new RegExp('(' + filter_text + ')', 'gi');
			if(torrentHTML.match(filter_text_regex)){
				$(this).remove();
			}
		}
        /* Remove porn or not ;) */
		if(pornremove==true){
            if(single==false){
                if( ($(this).children('td:eq(0)').children('center:eq(0)').children('a:eq(0)').html() == 'Porn') ){
                    $(this).remove();
                }
            } else if(single==true){
                if($(this).children('td:eq(0)').children('a:eq(0)').html().indexOf('Porn') >= 0){
                    $(this).remove();
                }
            }
		}
		else if(pornfilter==true && ( url.match(/\/browse\/[5][0-9][0-9]/gi) || url.match(/\/top\/[5][0-9][0-9]/gi) || url.match(/\/top\/48h[5][0-9][0-9]/gi) ) && pornfilter_text != ''){
			var pornfilter_text_regex = new RegExp( '(' + pornfilter_text + ')', 'gi' );
			if( pornfilter_text_regex.test(torrentTitle) == true ){
				$(this).remove();
			}
		}
        /* Show thumbs up if the torrent is in the download history */
		if(save_history==true && torrent_history_array.length > 0){
			for(var i=0; i<torrent_history_array.length; i++){
				if( torrent_history_array[i].substring(0,torrentID.length) == torrentID){
					var download_date = torrent_history_array[i].substr((torrentID.length + 1), (torrent_history_array[i].length)-(torrentID.length + 2));
					var beendownloaded_img = document.createElement('img');
					beendownloaded_img.src = '//i.imgur.com/E5zH2QV.png';
					beendownloaded_img.title = 'Downloaded on ' + ordinal(download_date.substr(8,2)) + ' ' + monthName(download_date.substr(5,2)) + ', ' + download_date.substr(0,4)
					beendownloaded_img.style.cssText = 'height:' + ($(this).height()-7) + 'px;float:right';
					if(single==false) $($(this).children('td:nth-child(2)').children('div:first')).before(beendownloaded_img); 
					else $(this).children('td:nth-child(2)').append(beendownloaded_img);
				}
			}
		}
	}
});
/* This saves magnet links to history too */
if(save_history==true && magnet == false){
    $('a[href^="magnet:"]').click(function(e){
        e.preventDefault();
        var torrentHTML = $(this).parent().parent().html();
        if(single==false) var torrentID = torrentHTML.match(/\d+/g)[2]; else var torrentID = torrentHTML.match(/\d+/g)[1];
        var thisTorrent = new RegExp('\\b' + torrentID + '\\b', 'i');
        if (!(thisTorrent.test(torrent_history_array))){
            torrent_history_array.unshift(torrentID + '<' + dateNow() + '>');
            torrent_history = torrent_history_array.join();
            GM_setValue("torrent_history",torrent_history);
            var beendownloaded_img = document.createElement('img');
            beendownloaded_img.src = '//i.imgur.com/E5zH2QV.png';
            beendownloaded_img.title = 'Downloaded on ' + ordinal(dateNow().substr(8,2)) + ' ' + monthName(dateNow().substr(5,2)) + ', ' + dateNow().substr(0,4)
            beendownloaded_img.style.cssText = 'height:' + ($(this).parent().parent().height()-7) + 'px;float:right';
            if(single==false) $(this).parent().children('div:first').before(beendownloaded_img);
            else $(this).children('td:nth-child(2)').append(beendownloaded_img);
        }
        location.href = $(this).attr('href');
    });
}
/* Show a message if there are no files to download and why */
if($('#searchResult > tbody > tr').length <= 1){
	var next_link = $("img[alt='Next']").parent().attr('href');
		if(!next_link) next_link = '' ;
	var prev_link = $("img[alt='Previous']").parent().attr('href');
		if(!prev_link) prev_link = '' ;
	if( $('#searchResult > tbody').length > 0 ){
		$('<tr style="font-size: 1.5em;text-align:center;width:100%;background-color:red;color:yellow;"><td colspan="99" style="margin:0;padding:10px;" >You are seeing no results because of the filters that have been set, please go to the <a style="color:yellow;text-decoration:none;border-bottom: 1px dashed;" href="'+next_link+'" title="Next">Next</a> or <a style="color:yellow;text-decoration:none;border-bottom: 1px dashed" href="'+prev_link+'" title="Previous">Previous</a> page to check for results or re-define your search.</td></tr>').prependTo( $('#searchResult > tbody') );
	} else {
		if($('#categoriesTable').length == 0 && $('#details').length == 0){
			$('<div style="font-size: 1.5em;text-align:center;width:100%;background-color:red;color:yellow;"><p style="margin:0;padding:10px;" >You are seeing no results because of the filters that have been set, please go to the Next or Previous page to check for results or re-define your search.</p></div>').insertAfter( $('h2') );
		}
	}
}
/* Modify main torrent pages to reflect the main settings */
if($('#detailsframe')){
	var torrentID = url.split('/')[4];
	if(torrentify==true){
		var torrentURL = document.URL.replace('/' + domain,'/torrents.' + domain).replace('/torrent/','/');
		var tpbc_torrent_icon = document.createElement('a');
		var linkText = document.createTextNode('DOWNLOAD THIS TORRENT');
		tpbc_torrent_icon.appendChild(linkText);
		tpbc_torrent_icon.title = 'Download this torrent';
		tpbc_torrent_icon.href = torrentURL + ' [The Pirate Bay Cleaner].torrent';
		$('.download').append(tpbc_torrent_icon);
		$("a[href$='.torrent']").on('click', function(e){
			if(save_history==true){
				torrent_history_array.unshift(torrentID + '<' + dateNow() + '>');
				torrent_history = torrent_history_array.join();
				GM_setValue("torrent_history",torrent_history);
			}
		});
	}
	if(save_history==true && torrent_history_array.length > 0){
		for(var i=0; i<torrent_history_array.length; i++){
			if( torrent_history_array[i].substring(0,torrentID.length) == torrentID){
				var download_date = torrent_history_array[i].substr((torrentID.length + 1), (torrent_history_array[i].length)-(torrentID.length + 2));
				$('.col1').prepend('<dt>Downloaded:</dt><dd>' + ordinal(download_date.substr(8,2)) + ' ' + monthName(download_date.substr(5,2)) + ', ' + download_date.substr(0,4)+'</dd><br>');
			}
		}
	}
}
/* Try to show all links in lightbox */
if(linkify_all==true){
	for(var i = 0; i < $("a[href*='http']").length; i++){
		var this_url = $($("a[href*='http']")[i]).attr('href');
		if(!this_url.match(/imdb\.com|thepiratebay/gi)){
			$($("a[href*='http']")[i]).on('click', 
				function(e){
					e.preventDefault();
					if( $(this).attr('href').match(/\.png|\.jpg|\.svg|\.gif|\.bmp/gi) ){
						console.log('Image Detected: ' + $(this).attr('href'));
						LightboxBG();
						Lightbox('img', $(this).attr('href'), 'nobg');
					} else {
						LightboxBG();
						Lightbox('www', $(this).attr('href'), 'nobg');
					}
				}
			);
		}
	}
}
/* Change page theme to be dark */
if(theme==true){
	$('#fp > iframe').remove();
	$('.promoimglink').remove();
	$('body').css({'color':'#F3F3F3'});
	$('#TPBlogo').attr('src', '//i.imgur.com/i1jaoxr.png');
	$('#fp').prepend('<img src="//i.imgur.com/mFspNKB.png">');
	$('body').css({'background-color':'#000000'});
	$('td').css({'border':'1px solid #000000'});
	$('#searchResult > tbody').css({'border':'1px solid #000000'});
	$('#searchResult > thead > tr > th').css({'background-color':'#505050'});
	$('#searchResult > thead > tr > th').css({'border':'1px solid #000000'});
	$('a').css({'color':'#0094FF'});
	$('.detDesc').css({'color':'#F3F3F3'});
	$('h2').css({'background-color':'#404040','color':'#F3F3F3', 'border-bottom':'1px solid #FFFFFF'});
	if($('#detailsframe')){
		$('#details').css({'background-color':'#505050','color':'#F3F3F3'});
		$('#title').css({'background-color':'#404040','color':'#F3F3F3', 'border-bottom':'1px solid #FFFFFF'});
		$('dt').css({'color':'#F3F3F3'});
		$('h4').css({'color':'#F3F3F3'});
		$('.nfo').css({'background-color':'#000000'});
		$('#comments').children().remove();
		$('#comments').append('<div id="tpbc_loading">Loading...</div>');
		var torrentID = $('#detailsframe > #details > .col1').children('dd:nth-child(4)').children('a').attr('href').match(/\d+/gi);
		$.ajax({
			url: '/ajax_details_comments.php?id='+torrentID, 
            success: function(data){
				$('#tpbc_loading').remove();
				$('#comments').append('<div style="max-height:250px;overflow:auto;border:0;margin:0;border-collapse:collapse;" >' + data + '</div>');
				$('.comment').css({'background-color':'#000000'});
				$('#comments > div > div > p').css({'color':'#F3F3F3'});
				$('#comments > div > div > p > a').css({'color':'#0094FF'});
				$('.comment > a').css({'color':'#0094FF'});
			}
		});
	}
}
document.title += " - Empowered by The Pirate Bay Cleaner";