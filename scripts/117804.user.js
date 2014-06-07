// ==UserScript==
// @name			YunFile_Auto_Down_cookies
// @namespace   	petcon_FF_Ext
// @description 	yunfile 全自动下载清除cookies
// @include         http://www.yunfile.com/file/*
// @include         http://yunfile.com/file/*
// @author          petcon
// @version         0.3
// ==/UserScript==
var expdate = new Date(); 
expdate.setTime(expdate.getTime() - (86400 * 1000 * 1)); 
setCookie(cck_lasttime, "", expdate);
setCookie(cck_count, "", expdate);
var url = window.location.href;
var scope = /down.*\.html$/.test(url) ? "downpage" : "prepage";
var timer;
var checkTimes=0;
var yunfile = {
	init: function (scope) {
        this[scope]();
    },
    downpage: function () {
        var downloaded = false;
        function done(e) {
            window.removeEventListener(e.type, arguments.callee, false);
            if (downloaded) return;
            downloaded = true;
            try {
                document.getElementById("down_from").submit();
            } catch (ex) {}
        }
        window.addEventListener("DOMContentLoaded", done, false);
        window.addEventListener("load", done, false);
    },
    prepage: function () {
        var flags = false;
        function done(e) {
            window.removeEventListener(e.type, arguments.callee, false);
            if (flags) return;
            flags = true;
			// alert(document.getElementById("interval_div").style.display)
			if (/down.*\.html$/.test(document.referrer)) //if be asked to wait (sent from the downloadpage)
			{
				if (!timer)
				{
					var strInterval = document.getElementById("down_interval").innerHTML;
					var iInterval = parseInt(strInterval);
					var timerInterval = iInterval * 1000 * 60; //then wait for the required time
					// alert(timerInterval)
					timer = window.setTimeout(
						function(){
							yunfile["ticktock"](); //finally do relocation
						} 
						,timerInterval
					);
				}
				return;
			}
            yunfile["ticktock"]();
        }
        window.addEventListener("DOMContentLoaded", done, false); // opera firefox
        window.addEventListener("load", done, false);
    },
    ticktock: function () {
	var win = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
	var url = win.location.href;
	url = url.replace(/\/file\/(?=[^/]+?\/)(.+?)(\/?)$/, "/file/down/$1.html"); 
	win.location.replace(url);
    }
}
yunfile.init(scope);