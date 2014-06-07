// ==UserScript==
// @name        BTHEAL
// @namespace   Mafiawars by Zynga
// @description Enjoy!! Playing Mafia Wars With BTHEAL
// @icon        http://img819.imageshack.us/img819/989/26979571295540891.png
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	    https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// ==/UserScript==

/*
	Author:
	Pete Lundrigan
	Thanks to Josh Miller for the help with the Xpath for the BTheal Notifier
	Lina Maria for the Health Threshold Mod
	Name:
	Pistol Pete Quick Healer v.1.07
	Changes:
		2010-04-22 Added Reload from page to page. window.setInterval
		2010-10-1 Added Healthreshold Prompt.
		2011-10-28	Quick patch for Hospital -> Morgue name change
*/
javascript: (function () {
    if (document.getElementsByClassName('canvas_iframe_util')[0]) {
        //if(confirm('You need to unframe the page. Do you want me to do it for you?\nYou still may need to run UnFrameMW or ScrollMW to add scrollability!')){
        window.location.href = document.getElementsByClassName('canvas_iframe_util')[0].src;
        //}
    } else if (document.getElementById('app10979261223_iframe_canvas')) {
        //if(confirm('You need to unframe the page. Do you want me to do it for you?\nYou still may need to run UnFrameMW or ScrollMW to add scrollability!')){
        window.location.href = document.getElementById('app10979261223_iframe_canvas').src;
        //}
    } else {
        var healththreshold = parseInt(prompt('Quick Heal Settings.\n\nEnter Health Threshold:', '100'));
        var healchoice = confirm('Click OK to heal in NY, Otherwise Cancel to Heal in Current City.');
        var healcity = '';
        max_health = document.getElementById('user_max_health');
        maxHealth = parseInt(max_health.innerHTML);
        if ((0 < healththreshold) && (healththreshold < maxHealth)) {
            function checkhealth() {
                function getMWURL() {
                    str = document.location;
                    str = str.toString();
                    beg = str.substring(0, str.indexOf('?') + 1);
                    str = str.substring(str.indexOf('?') + 1);
                    str = str.split('&');
                    mid = '';
                    for (var i = 0; i < str.length; i++) {
                        if (str[i].indexOf('sf_xw_') == 0) {
                            mid = mid + str[i] + '&';
                        }
                    }
                    return beg + mid;
                }
                var last_i = 0,
                    autohealelt, timer;
                function p(s) {
                    return parseInt(s.replace(/[^\d]/g, ''));
                }
                function xpathFirst(p, c) {
                    return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
                }
                function jxpath(query, node) {
                    return document.evaluate(query, (node === undefined ? document : node), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                }
                var MWURL = getMWURL();
                if (document.getElementById('mw_city_wrapper')) {
                    var Elcity = document.getElementById('mw_city_wrapper');
                    if (!Elcity) return false;
                    // Update basic player information.
                    switch (Elcity.className) {
                    case 'mw_city1':
                        healcity = 'NY';
                        break;
                    case 'mw_city2':
                        healcity = 'CUBA';
                        break;
                    case 'mw_city3':
                        healcity = 'MOSCOW';
                        break;
                    case 'mw_city4':
                        healcity = 'BANGKOK';
                        break;
                    case 'mw_city5':
                        healcity = 'LAS VEGAS';
                        break;
                    case 'mw_city6':
                        healcity = 'ITALY';
                    case 'mw_city7':
                        healcity = 'BRAZIL';
                        break;
                    }
                }
                //var sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(document.body.innerHTML)[1];
                var userid = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
                var clock_healthelt = document.getElementById('clock_health');
                var healelt = xpathFirst('.//a[contains(., "Hospital")]', clock_healthelt) || xpathFirst('.//a[contains(., "Morgue")]', clock_healthelt);
                //Get Health Title Element
                //var healthelt=jxpath('//span[text()="Health"]');
                var healthelt = document.getElementById('stat_health'); //.getElementsByClassName('health')[0];
                //Get Health URL
                var hospital_url = healelt.href;
                var healurl = healelt.href.replace("xw_action=view", "xw_action=heal");
                healurl = healurl.replace("xw_controller=index", "xw_controller=hospital");
                if (healchoice) {
                    healurl = healurl + '&xcity=1';
                    healcity = 'NY';
                }
                var expnow, expnext, stamina, energy, ratiolvl, ratiolvl2, ratiolvl3, explevel;
                function stats_ratios(s) {
                    var stats = s;
                    //console.log('Stats before length: '+stats.length);
                    if (/var user_fields/.test(stats)) {
                        stats = stats.substr(stats.indexOf('var user_fields'));
                    }
                    if (/user_info_update/.test(stats)) {
                        stats = stats.substr(0, stats.indexOf('user_info_update'));
                    }
                    //console.log('Stats after length: '+stats.length);
                    document.getElementById('user_cash_nyc').innerHTML = /user_cash_nyc.*?([\d,]+)/.exec(stats)[1];
                    document.getElementById('user_cash_cuba').innerHTML = /user_cash_cuba.*?([\d,]+)/.exec(stats)[1];
                    document.getElementById('user_cash_moscow').innerHTML = /user_cash_moscow.*?([\d,]+)/.exec(stats)[1];
                    document.getElementById('user_cash_bangkok').innerHTML = /user_cash_bangkok.*?([\d,]+)/.exec(stats)[1];
                    document.getElementById('user_cash_vegas').innerHTML = /user_cash_vegas.*?([\d,]+)/.exec(stats)[1];
                    try {
                        cur_health = document.getElementById('user_health').innerHTML = p(/user_health.*?(\d+)/.exec(stats)[1]);
                        energy = document.getElementById('user_energy').innerHTML = p(/user_energy.*?(\d+)/.exec(stats)[1]);
                        stamina = document.getElementById('user_stamina').innerHTML = p(/user_stamina.*?(\d+)/.exec(stats)[1]);
                        expnow = document.getElementById('user_experience').innerHTML = p(/user_experience.*?(\d+)/.exec(stats)[1]);
                        expnext = document.getElementById('exp_for_next_level').innerHTML = p(/exp_for_next_level.*?(\d+)/.exec(stats)[1]);
                        expneed = expnext - expnow;
                        ratiolvl = expneed / energy;
                        ratiolvl2 = expneed / stamina;
                        ratiolvl3 = expneed / (energy + stamina);
                        (Math.abs(ratiolvl) < 5) ? (d = 2) : (d = 0);
                        (Math.abs(ratiolvl2) < 5) ? (d2 = 2) : (d2 = 0);
                        (Math.abs(ratiolvl3) < 5) ? (d3 = 2) : (d3 = 0);
                        if (ratiolvl == 'Infinity') {
                            ratiolvl = 0;
                            d = 0;
                        }
                        if (ratiolvl2 == 'Infinity') {
                            ratiolvl2 = 0;
                            d2 = 0;
                        }
                        if (ratiolvl3 == 'Infinity') {
                            ratiolvl3 = 0;
                            d3 = 0;
                        }
                        document.getElementById('user_stats').getElementsByClassName('experience')[0].innerHTML = 'Need: <span class="energy_highlight">' + expneed + '</span><span class="more_in">(' + (ratiolvl3).toFixed(d3) + ')</span><br>(<span class="energy_highlight">' + (ratiolvl).toFixed(d) + '</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="10" height="10" title="Exp needed per Energy">)(<span class="energy_highlight">' + (ratiolvl2).toFixed(d2) + '</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="10" height="10" title="Exp needed per Stamina">)';
                        document.getElementById('level_bar').style.width = /percent_complete.*?(\d+)/.exec(stats)[1] + '%';
                    } catch (newlayouterr) {
                        cur_health = document.getElementById('user_health').innerHTML = p(/user_health.*?(\d+)/.exec(stats)[1]);
                        energy = document.getElementById('user_energy').innerHTML = p(/user_energy.*?(\d+)/.exec(stats)[1]);
                        stamina = document.getElementById('user_stamina').innerHTML = p(/user_stamina.*?(\d+)/.exec(stats)[1]);
                        //expnow = p(/user_experience.*?(\d+)/.exec(stats)[1]);
                        //expnext = p(/exp_for_next_level.*?(\d+)/.exec(stats)[1]);
                        //expneed = document.getElementById('user_xp_to_next_level').innerHTML = expnext-expnow;
                        expneed = parseInt(document.getElementById('xp_to_next_level').innerHTML);
                        ratiolvl = eval(expneed / energy);
                        ratiolvl2 = eval(expneed / stamina);
                        ratiolvl3 = eval(expneed / (energy + stamina));
                        (Math.abs(ratiolvl) < 5) ? (d = 2) : (d = 0);
                        (Math.abs(ratiolvl2) < 5) ? (d2 = 2) : (d2 = 0);
                        (Math.abs(ratiolvl3) < 5) ? (d3 = 2) : (d3 = 0);
                        if (ratiolvl == 'Infinity') {
                            ratiolvl = 0;
                            d = 0;
                        }
                        if (ratiolvl2 == 'Infinity') {
                            ratiolvl2 = 0;
                            d2 = 0;
                        }
                        if (ratiolvl3 == 'Infinity') {
                            ratiolvl3 = 0;
                            d3 = 0;
                        }
                        document.getElementById('user_experience').innerHTML = '(<span class="energy_highlight">' + (ratiolvl).toFixed(d) + '</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">) (<span class="energy_highlight">' + (ratiolvl2).toFixed(d2) + '</span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">) <span class="more_in">' + (ratiolvl3).toFixed(d3) + '</span>';
                        document.getElementById('level_bar_new_header').style.width = /percent_complete.*?(\d+)/.exec(stats)[1] + '%';
                    }
                }
                function request() {
                    //var preurl = 'http://facebook.mafiawars.zynga.com/mwfb/remote/';
                    //var url ='html_server.php?xw_controller=friendladder&xw_action=initial_load&xw_city=1';
                    var m = '';
                    cb = userid + unix_timestamp();
                    ts = unix_timestamp();
                    var params = {
                        'ajax': 1,
                        'liteload': 1,
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig,
                        'cb': cb,
                        'xw_client_id': 8
                    };
                    $.ajax({
                        type: "POST",
                        url: hospital_url,
                        data: params,
                        success: function (msg) {
                            var m = /user_health\'].+parseInt\(\"(\d+)\"\)/.exec(msg);
                            document.getElementById('user_health').innerHTML = m[1];
                            var n = /user_max_health\'].+parseInt\(\"(\d+)\"\)/.exec(msg);
                            document.getElementById('user_max_health').innerHTML = n[1];
                            //stats_ratios(msg);
                        },
                        error: function (msg) {
                            var m = /user_health\'].+parseInt\(\"(\d+)\"\)/.exec(msg);
                            document.getElementById('user_health').innerHTML = m[1];
                            var n = /user_max_health\'].+parseInt\(\"(\d+)\"\)/.exec(msg);
                            document.getElementById('user_max_health').innerHTML = n[1];
                            //stats_ratios(msg);
                        }
                    });
                }
                request();
                function unix_timestamp() {
                    return parseInt(new Date().getTime().toString().substring(0, 10))
                }
                function timestamp() {
                    now = new Date();
                    var CurH = now.getHours();
                    CurH = (CurH < 10 ? "0" + CurH : CurH);
                    var CurM = now.getMinutes();
                    CurM = (CurM < 10 ? "0" + CurM : CurM);
                    return '<span class="more_in">[' + CurH + ':' + CurM + ']</span> ';
                }
                function clearautoheal() {
                    healthelt.removeChild(document.getElementById('autoheal'));
                    //clearInterval(timer);
                    window.clearInterval(pp_timer);
                }
                if (autohealelt = document.getElementById("autoheal")) {
                    autohealelt.onclick = clearautoheal;
                }
				else {
                    //replace Health title with BTheal On
                    //healthelt.snapshotItem(0).innerHTML = '<span id=autoheal><a href="#">BTheal</a></span>';}
                    healthelt.innerHTML += '<span id="autoheal"><a href="#">BTheal (' + healththreshold + ') ' + healcity + '</a></span>';
                }
                //timer =	setInterval(function() {
                //do_ajax('inner_page', hospital_url.replace("http://facebook.mafiawars.zynga.com/mwfb",""), 1, 0);
                usr_health = document.getElementById('user_health');
                max_health = document.getElementById('user_max_health');
                cur_health = parseInt(usr_health.innerHTML);
                maxHealth = parseInt(max_health.innerHTML);
                //var healththreshold = maxHealth -(maxHealth*.40);
                if (cur_health < healththreshold) {
                    //do_ajax('inner_page', healurl.replace("http://facebook.mafiawars.zynga.com/mwfb",""), 1, 1);
                    //do_ajax('', 'remote/html_server.php?xw_controller=hospital&xw_action=heal&xw_city=4', 1, 0, null, hospital_onload);
                    //do_ajax('', hospital_url.replace("http://facebook.mafiawars.zynga.com/mwfb",""), 1, 0)
                    setTimeout(function () {
                    http ='http://';
                    if (/https/.test(document.location)) {
						http = 'https://';
					}
                        do_ajax('', healurl.replace(http+ "facebook.mafiawars.zynga.com/mwfb", ""), 1, 0, null);
                    }, 1000)
                }
                //}, 2000);
            }
            pp_timer = window.setInterval(checkhealth, 2000);
        } else {
            alert('Wrong Health Threshold or Attack Timer!\nHealth Threshold must be higher than 0 and lower than ' + maxHealth + '\nAttack timer must be above 0 seconds.');
        }
    }
	//add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/QuickHeal");
	}
	catch(err) {}
	//end analytics	
}())