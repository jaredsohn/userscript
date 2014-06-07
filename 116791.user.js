// ==UserScript==
// @name		Yah's GM Linkchecker
// @namespace	http://userscripts.org/scripts/review/92329
// @include		http://slashdot.org/*
// @include		http://zevera.com/*
// @include		http://www.thecavernforum.com/*
// @version		0.250
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
//
// ==/UserScript==
// version                     0.250 01 Nov 2011

/*
To Do list:
 * Rename the filehosts_checks.txt file to lc.txt
 * Add a backup hosts section to the lc.txt file to handle failovers

Done list:
 * Preference Page Changes
 	* Add filehost counts to the enabled/disabled lists
 	* Style the page
 	* Make preferences open as a page, not a <div> popup
*/

$(document).ready(function(){
	GM_log("start");
	var allHostsMatch = "";
	var arr_allHostsMatch = [];
	var GMHosts = [];
	var hosts = [];
	var redirs_regex = "";
	var ret = String.fromCharCode(13) + String.fromCharCode(10);
	
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
	
	//Setup Menu Options
	GM_registerMenuCommand("GM LC Preferences", prefs);

	
	linkify();				//Linkify all links
	get_hosts();			//Get hosts file from web
	
	function chk(ck){
		return (ck == true)?("checked"):("");
	}
	
	function check_link(URL, ID){
		//GM_log("Checking link: " + URL);
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: URL,
		    headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
		    onload: function(responseDetails) {
		    	//GM_log("Good link: " + URL);
		    	$("#" + ID).css("background-color",pref3);		    	
		    },
		    onerror: function(responseDetails) {
		    	//GM_log("There was an error loading: " + URL);
		    	$("#" + ID).css("background-color",pref4);
		    }
		});
	}

	function get_hosts(){
		GM_log("---------------------- this.get_hosts() - start");
		GM_setValue("filehosts_loaded_date", 20090101);
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
		        url: 'http://fil3z.com/filehost_checks.txt',
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
	
	function fn_get_hosts_process(){
		//GM_log("fn_get_hosts_process()");
		get_hosts_process();
	}
	
	function get_hosts_process(){
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
	
	function get_redirs_process(){
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
	
	function process_links(){
		//Get your initial domain
		var dom = document.URL.split("/");
		var dom = dom[2];
		//GM_log("Domain: " + dom);

		var count = 0;
		$("a").each(function(){
			//Filter out some unwanted links with no href:
			var lnk = $(this).attr("href");
			if ($(this).attr("href")){
				count = count + 1;
				var lnks = lnk.split("/");
				//Filter out all on-site links
				if (lnk.search(/\#|mailto|(^\/)/) > -1){
					//GM_log("Found on-site link 1: " + lnk);
				} else if (lnk.search(dom) > -1 ){
					//GM_log("else: " + lnk + "   search: " + lnk.search(dom));
					//GM_log("Found on-site link 2: " + lnk);
				} else {
					//GM_log("	ELSE: " + lnk);
					//Assign an ID to the link
					var ID = "ygl_" + count;
					$(this).attr("id", ID);
					check_link(lnk, ID);
				}
			} else {
				//GM_log("No href:" + lnk);	//Ignore these -- Generally show as undefined.
			}			
		});
	}

	function linkify(){
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

	function prefs(){
		//alert("Preferences");
		
		function refresh_filehosts(){
			//GM_log("refresh_filehosts()");
			var list = win.document.getElementById('list_enabled');
			list.length = 0;
			for (var i = 0; i < hosts.length; i++){		// Enabled Hosts
				var host = hosts[i][0];
				if (GMHosts.indexOf(host + "|") != -1){
					list.add(new Option(host, host), null);
				}
			}
			win.document.getElementById("en_hosts").innerHTML = "Enabled Hosts (" + list.length + ")";
			var list = win.document.getElementById('list_available');
			list.length = 0;
			for (var i = 0; i < hosts.length; i++){		// Enabled Hosts
				var host = hosts[i][0];
				if (GMHosts.indexOf(host + "|") == -1){
					list.add(new Option(host, host), null);
				}
			}
			win.document.getElementById("av_hosts").innerHTML = "Disabled Hosts (" + list.length + ")";
		}
		function update_prefs(){
			//GM_log("Update_prefs()");
			GM_setValue("linkify", win.document.getElementById('p1').checked);
			GM_setValue("highlight_full_link", win.document.getElementById('p2').checked);
			GM_setValue("link_color_alive", win.document.getElementById('p3').value);
			GM_setValue("link_color_dead", win.document.getElementById('p4').value);
			GM_setValue("flag_bad_image_hosts", win.document.getElementById('p5').checked);
			GM_setValue("flag_redirectors", win.document.getElementById('p6').checked);
			GM_setValue("link_color_maybe", win.document.getElementById('p7').value);
			GM_setValue("flag_mouseover_mode", win.document.getElementById('p8').checked);
			win.close();
			window.location.reload();
		}

		//Build html for new window
		win = window.open('', 'Preferences')
		var wdb = win.document.body
		
		//Add style to HEAD
		var s = "";
		s = s + "<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js'></script>";
		s = s + "<style>";
		s = s + "	body {background-color:#BFDBFF;}";
		s = s + "	#div_filehosts_update {padding-top:5px;}";
		s = s + "	#prefs_html {font-family:Verdana,Geneva,'DejaVu Sans',sans-serif; color:black;}";
		s = s + "	#prefs_header {font-size:1.25em; font-weight:bold;}";
		s = s + "	.host_list, .pref_list {padding-left: 10px;}";
		s = s + "	.list {width:200px;}";
		s = s + "	.prefs_btn {-moz-appearance:button; -moz-binding:none; -moz-box-sizing:border-box; border-collapse: separate; color:buttontext; cursor:default; font:-moz-button; line-height:normal; overflow: visible; padding:0 6px; text-align:center; text-shadow:none;}";
		s = s + "	.prefs_list_text {font-size:1em;}";
		s = s + "	.prefs_text {font-size:.75em; font-weight:bold}";
		s = s + "	.tbl {padding: 3px;}";
		s = s + "</style>";
		win.document.head.innerHTML = s;

		var div_prefs = win.document.createElement('div_prefs');
		wdb.appendChild(div_prefs);
		div_prefs.id = "div_prefs";
		
		var c1 = 0;
		var c2 = 0;
	    var t = new Array();
	    var divL = (innerWidth - 720).toString();
	    var divT = (innerHeight - 600).toString();
	
		var pref3 = GM_getValue("link_color_alive", ""); if(pref3 == ""){pref3 = "paleGreen"};
		var pref4 = GM_getValue("link_color_dead", ""); if(pref4 == ""){pref4 = "lightPink"};
		var pref7 = GM_getValue("link_color_maybe", ""); if(pref7 == ""){pref7 = "yellow"};
		
	    t.push('<div id="prefs_html" class="prefs_html">');
	    t.push('	<table class="tbl" id="tbl_header" cellspacing=0><tr>');
	    t.push('		<td align=left width=400px><div id="prefs_header">Preferences</div><p><p></td>');
	    t.push('		<td align=right width=250px><button id="close_prefs1" class="prefs_btn" type="button">Close</button></td>');
	    t.push('	</tr></table>');
	    t.push('	<table class="tbl" cellspacing=0>');
	    t.push('		<tr>');
	    t.push('			<td>');
	    t.push('				<div class="host_list">');
	    t.push('				<center><div id="en_hosts" class="prefs_text"></div>');
	    t.push('				<select id="list_enabled" class="list" size=35>');
											for (var ii = 0; ii < hosts.length; ii++){
	 											var host = hosts[ii][0];
	 											if (GMHosts.indexOf(host + "|") != -1){
		t.push('									<option value="' + host + '" class="prefs_list_text">' + host + '</option>');
			    								}
											}
	    t.push('				</select><br>');
	    t.push('				<button id="host_disable" class="prefs_btn" type="button"">Disable Host</button>');
	    t.push('				<button id="all_hosts_disable" class="prefs_btn" type="button">All</button></center>');
	   	t.push('				</div>');
	   	t.push('			</td><td>');
	   	t.push('				<div class="host_list">');
	    t.push('				<center><div id="av_hosts" class="prefs_text"></div>');
	    t.push('				<select id="list_available" class="list" size=35>');
	 										for (var ii = 0; ii < hosts.length; ii++){
	 											var host = hosts[ii][0];
	 											if (GMHosts.indexOf(host + "|") == -1){
		t.push('									<option value="' + host + '" class="prefs_list_text">' + host + '</option>');
												}
	 										}
	    t.push('				</select><br>');
	    t.push('				<button id="host_enable" class="prefs_btn" type="button">Enable Host</button>');
	    t.push('				<button id="all_hosts_enable" class="prefs_btn" type="button"">All</button></center>');
	    t.push('				</div>');
		t.push('			</td><td valign="top">');
		t.push('				<div class="pref_list">');
	   	t.push('				<table id="prefs" border=0 cellpadding=0 cellspacing=0 valign="top">');
	   	t.push('					<tr><td>&nbsp;</td></tr>');
		t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Enable Linkify</td><td><input type="checkbox" name="p1" id="p1" ' + chk(pref1) + '></b></td>');
		t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Highlight Full Link</td><td><input type="checkbox" name="p2" id="p2" ' + chk(pref2) + '></b></td>');
		t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Good Link Color</td><td><input type="text" name="p3" id="p3" value=' + pref3 + ' size="10" style="background-color: ' + pref3 + ';"></b></td>');
		t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Bad Link Color</td><td><input type="text" name="p4" id="p4" value=' + pref4 + ' size="10" style="background-color: ' + pref4 + ';"></b></td>');
		t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Maybe Link Color</td><td><input type="text" name="p7" id="p7" value=' + pref7 + ' size="10" style="background-color: ' + pref7 + ';"></b></td>');
		t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Flag bad image hosts&nbsp;&nbsp;</td><td><input type="checkbox" name="p5" id="p5" ' + chk(pref5) + '></b></td>');
		t.push('					<tr align=left><td><b class="prefs_text">&nbsp;Flag Redirectors</td><td><input type="checkbox" name="p6" id="p6" ' + chk(pref6) + '></b></td>');
		t.push('					<tr align=left><td><b class="prefs_text">&nbsp;MouseOver Mode</td><td><input type="checkbox" name="p8" id="p8" ' + chk(pref8) + '></b></td>');
		t.push('					<tr><td>&nbsp;<br></td>');
		t.push('					<tr><td>&nbsp;<br></td>');
		t.push('					<tr></tr>');
		t.push('				</table>');
		t.push('			</td>');
	   	t.push('		</tr><tr>');
	   	t.push('			<td colspan=2 align=center><div id="div_filehosts_update"><button id="filehosts_update" class="prefs_btn" type="button">Update Filehosts now</button></div></td>');	
	   	t.push('		</tr>');
	    t.push('	</table>');
	    t.push('	<p>&nbsp;');
	    t.push('	<table class="tbl" cellspacing=0 width=700px><tr>');
	    t.push('		<td>');
	    t.push('			<table border=0><tr>');
	    t.push('				<td><b id="prefs_donate">Please donate to keep this Script alive and growing:<b>&nbsp;&nbsp;</td>');
	    t.push('				<td><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=98CL9GYVNBZNU"><img src="http://yahavatar.com/images/buttons/btn_donate_LG.png" style="height: 20px; border: 0px;"></a></td>');
	    t.push('			</tr></table>');
	    t.push('		</td>');
	    t.push('	</tr></table>');
	    t.push('</div>');
		wdb.innerHTML = t.join('\n');
		refresh_filehosts();

		//======================== Preferences Button Functions ===========================
	    //var btn_close = win.document.getElementById("close_prefs");
	    //btn_close.addEventListener("click", function(){
	    //	win.close();
	    //	window.location.reload();
	    //}, false);

	    var btn_close1 = win.document.getElementById("close_prefs1");
	    btn_close1.addEventListener("click", function(){
	    	win.close();
	    	window.location.reload();
	    }, false);

	    var btn_host_enable = win.document.getElementById("host_enable");
	    btn_host_enable.addEventListener("click", function(){
			var host = win.document.getElementById('list_available').options[win.document.getElementById('list_available').selectedIndex].text;
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
		}, false);
	    
	    //var btn_host_disable = win.document.getElementById("host_disable");
	    //btn_host_disable.addEventListener("click", function(){
		win.document.getElementById("host_disable").addEventListener("click", function(){
			var old_hosts = GM_getValue("hosts_enabled", "");
			var selHost = win.document.getElementById('list_enabled').options[win.document.getElementById('list_enabled').selectedIndex].text;
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
		}, false);

	    var btn_all_hosts_enable = win.document.getElementById("all_hosts_enable");
	    btn_all_hosts_enable.addEventListener("click", function(){
			var new_hosts = "";
			for (var i = 0; i < hosts.length; i++){
		    	new_hosts = new_hosts + hosts[i][0] + "|";
			}
			GM_setValue("hosts_enabled", new_hosts);
			GMHosts = new_hosts;
			//show_prefs()
			refresh_filehosts();
		}, false);
	    
	    var btn_all_hosts_disable = win.document.getElementById("all_hosts_disable");
	    btn_all_hosts_disable.addEventListener("click", function(){
			var new_hosts = "|";
			GM_setValue("hosts_enabled", new_hosts);
			GMHosts = "";
			//show_prefs()
			refresh_filehosts();
		}, false);
	    
	    var btn_filehosts_update = win.document.getElementById("filehosts_update");
	    btn_filehosts_update.addEventListener("click", function(){
			//GM_log("filehosts_update()");
			//GM_setValue("filehosts_loaded_date", 0);
			GM_setValue("filehosts_loaded_date", 20090101);
			//GM_log("filehosts_loaded_date: from filehosts_update: " + GM_getValue("filehosts_loaded_date"));
			get_hosts();
			alert("This may take a few seconds. You must re-open preferences to see updates.");
			window.close();
			window.location.reload();
		}, false);
	}

});