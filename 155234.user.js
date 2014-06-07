// ==UserScript==
// @name        The Portal basic functions
// @namespace   Made by Heya on Neofriends.net
// @description Portal basic functions
// @include     nowhere
// @version     1
// ==/UserScript==

function load_portal_shortcut() {
		var one = "document.getElementById('sip').src='http://images.neopets.com/portal/images/switch1_on.gif'";
		var two = "document.getElementById('sip').src='http://images.neopets.com/portal/images/switch1.gif'";

		document.getElementsByClassName('user medText')[0].innerHTML = document.getElementsByClassName('user medText')[0].innerHTML+' | <a href="http://www.neopets.com/portal.phtml" class="tl">Portal&nbsp;<img src="http://images.neopets.com/portal/images/switch1.gif" id="sip" onMouseOver="'+one+'" onMouseOut="'+two+'" title="Use site in Portal" height="22" width="22" border="0" align="absmiddle"></a>';
	}

function check_for_update() {
		GM_xmlhttpRequest({ 
			method: "GET",
			url: "http://www.neofriends.net/program-help-f103/the-portal-gm-script-t39035.html",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(e) {
				var current_version = getbetween(e.responseText, 'Current Version: ', ' ;');
				if(this_version == current_version) {
				} else {
					document.getElementsByClassName('eventIcon sf')[0].innerHTML = '<b><font color="red">WARNING:</font> The portal script you are using is outdated! Click <a href="http://www.neofriends.net/post427507.html#p427507">here</a> to update!</b>';
				}
			}
		});
	}

	function getbetween(source, firstitem, seconditem) {
		return new RegExp(firstitem.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1')+'((?:.|\n)*)'+seconditem.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1')).exec(source)[1];
	}

	function post_request(url, postdata, referer, callback) {
		GM_xmlhttpRequest({ 
					method: "POST",
					url: url,
					data: postdata,
					headers: {
						"Referer": referer,
						"Content-Type": "application/x-www-form-urlencoded",
						"Host": "www.neopets.com",
						"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
						"Accept-Language": "en-US,en;q=0.5",
						"Accept-Encoding": "gzip, deflate",
						"Proxy-Connection": "keep-alive",
						"Cookie": document.cookie
					},
					onload: function(e) { callback(e.responseText); },
					timeout: 6000,
					ontimeout: function() {
						GM_xmlhttpRequest({ 
							method: "POST",
							url: url,
							data: postdata,
							headers: {
								"Referer": referer,
								"Content-Type": "application/x-www-form-urlencoded",
								"Host": "www.neopets.com",
								"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
								"Accept-Language": "en-US,en;q=0.5",
								"Accept-Encoding": "gzip, deflate",
								"Proxy-Connection": "keep-alive",
								"Cookie": document.cookie
							},
							onload: function(n) { callback(n.responseText); }
						});
					}
		});
	}
	
	function get_request(url, callback) {
		GM_xmlhttpRequest({ 
					method: "GET",
					url: url,
					headers: {
						"Host": "www.neopets.com",
						"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
						"Accept-Language": "en-US,en;q=0.5",
						"Accept-Encoding": "gzip, deflate",
						"Proxy-Connection": "keep-alive",
						"Cookie": document.cookie
					},
					onload: function(e) { callback(e.responseText); },
					timeout: 6000,
					ontimeout: function() {
						GM_xmlhttpRequest({ 
							method: "GET",
							url: url,
							headers: {
								"Host": "www.neopets.com",
								"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
								"Accept-Language": "en-US,en;q=0.5",
								"Accept-Encoding": "gzip, deflate",
								"Proxy-Connection": "keep-alive",
								"Cookie": document.cookie
							},
							onload: function(n) { callback(n.responseText); }
						});
					}
		});
	}

function update_nps(source) {
		var source_code = document.createElement('div');
		source_code.innerHTML = source;
		var one = "document.getElementById('sip').src='http://images.neopets.com/portal/images/switch1_on.gif'";
		var two = "document.getElementById('sip').src='http://images.neopets.com/portal/images/switch1.gif'";
		document.getElementsByClassName('user medText')[0].innerHTML = source_code.getElementsByClassName('user medText')[0].innerHTML+' | <a href="http://www.neopets.com/portal.phtml" class="tl">Portal&nbsp;<img src="http://images.neopets.com/portal/images/switch1.gif" id="sip" onMouseOver="'+one+'" onMouseOut="'+two+'" title="Use site in Portal" height="22" width="22" border="0" align="absmiddle"></a>';
	}

function loading_bar(classname, done_num, total_num, width) {
		var code = "<center><h1>Loading</h1><table><tr>";
		for(var i=0; i< done_num; i++) {
			code = code+"<td><div style='width:"+width+"px; height:50px; background: green; padding: 20px;'></div></td>";
		}
		var blank_num = total_num-done_num;
		for(var i=0; i< blank_num; i++) {
			code = code+"<td><div style='width:"+width+"px; height:50px; background: grey; padding: 20px;'></td>";
		}
		code = code+"</tr></table></center>";
		document.getElementsByClassName(classname)[0].innerHTML = code;
	}