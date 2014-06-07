// ==UserScript==
// @name			Google Background
// @description		changes the google search wallpaper
// @include			https://www.google.*
// ==/UserScript==

var background = 'https://lh5.googleusercontent.com/-QJ_9mfY9I_Q/UIqtahhTG3I/AAAAAAAAAPs/q43MBfhMCEo/s1437/Konachan.com+-+36303+hinata_yuuhi+pink_hair+sky+soshite_ashita_no_sekai_yori+ueda_ryou.jpg';

setTimeout(function(){
	console.log(document.URL);
	if(document.URL.length<40)
	{
		if(c('googlebg')) background = c('googlebg');
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML="#body a,#footer a,#footer span,#prm,#als,#gbi4t,.sblc a{color:#fff !important;filter:shadow(color=#333333,direction=135,strength=2);text-shadow:black 0 1px 3px !important}#cpshi,#pmocntr2 a,#cpshi a,#cpshi span{filter:none;text-shadow:none !important}#cpshi{max-width:400px;color:black;margin:15px 30px 15px 15px}#cpshi a{color:blue !important;margin:0}#cpshrbd button{cursor:default;font-family:arial,sans-serif;font-size:11px;font-weight:bold;height:29px;margin:12px 7px 0;min-width:70px}#cpBackgroundImg{left:-999999px;position:fixed;top:0;z-index:-2}#sbl,#fctr,.fade{background:transparent}#ghead,#gog{background:#fff}.gbh{border:none}#cpDoodleNotifier {background-image:url('/ig/images/classic_plus_sprite.png');background-position: 0 0;height: 22px;left: 275px;position: absolute;top: -95px;width: 22px;}";
		document.getElementsByTagName('HEAD').item(0).appendChild(style);

		var logo = document.getElementById('lga').innerHTML;
		document.getElementById('lga').innerHTML = logo.replace('"><div nowrap="nowrap" style="color:#777;','"><div nowrap="nowrap" style="display:none;color:#777;');

		var body = document.body.innerHTML;
		document.body.innerHTML = body+'<img id="cpBackgroundImg" style="left: 0px;">';
		
		var bw = 0;
		var bh = 0;
		var rate = 0;
		var set_bg = function(bg){
			document.getElementById('cpBackgroundImg').src = bg;
			document.getElementById('cpBackgroundImg').style.opacity = 0;
			document.getElementById('cpBackgroundImg').onload = function(){
				if (document.getElementById('cpBackgroundImg').complete == true)
				{
					bw = document.getElementById('cpBackgroundImg').width;
					bh = document.getElementById('cpBackgroundImg').height;
					rate = bw/bh;
					setbgwh(document.body.clientWidth);
					fi(document.getElementById('cpBackgroundImg'),40,100);
				}
			}
		}
		set_bg(background);

		function setbgwh(w)
		{
			document.getElementById('cpBackgroundImg').width = w;
			document.getElementById('cpBackgroundImg').height = w/rate;
		}
	
		window.onresize = function(){
			setbgwh(document.body.clientWidth);
		};

		document.getElementById('flci').innerHTML = '<div id="cpNavTextWrapper" style="display: inline-block;"><a id="setbg" href="javascript:void(0)">Set background image - by Laintin</a></div>';
		document.getElementById('setbg').onclick = function(){
			var bg = prompt("What do you want to set background image?",background);
			if(bg != null && bg != ""){
				set_bg(bg);
				setbgwh(document.body.clientWidth);
				c('googlebg',bg,{expires:965});
			}
		};

		if(document.getElementById('hplogo').src)
			document.getElementById('hplogo').src = "http://ichan-me.static.smartgslb.com/googleimg/classicplus.png";
		else
			document.getElementById('hplogo').style.background = "url(http://ichan-me.static.smartgslb.com/googleimg/classicplus.png) no-repeat";
	}
},230);

function c(name, value, options) {
	if (typeof value != 'undefined') { // name and value given, set cookie
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		}
		var path = options.path ? '; path=' + options.path : '';
		var domain = options.domain ? '; domain=' + options.domain : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else { // only name given, get cookie
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].replace(/(^\s*)/g, "");
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	//
}

function fi(elem, speed, opacity){
	speed = speed || 20;
	opacity = opacity || 100;
	elem.style.opacity = 0;
	var val = 0;
	(function(){
		elem.style.opacity = val / 100;
		val += 5;
		if (val <= opacity) setTimeout(arguments.callee, speed)
	})();
}