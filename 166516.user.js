// ==UserScript==
// @name        GM HTTP Wrapper
// @namespace   Made by Heya on Neofriends.net
// @description General wrapper which can be used to to make http requests in greasemonkey. 
// @version     1
// ==/UserScript==

var http_request = new function() {
    this.timeout = 6000;
    this.post = function(url, postdata, referer, callback) {
		var start_time = (new Date()).getTime();
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
					onload: function(e) { var end_time = (new Date()).getTime(); var final_time = end_time-start_time; if(e.responseText.match('Something has happened!')) { add_log('Something has happened!\n'+getbetween(getbetween(e.responseText, 'Something has happened!', 'Almost Abandoned Attic'), 'border=1 height=80 width=80></td><td width=320>', '<br></td></tr></table>')+'\n' ) } callback(e.responseText, final_time); },
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
							onload: function(n) { if(n.responseText.match('Something has happened!')) { add_log('Something has happened!\n'+getbetween(getbetween(n.responseText, 'Something has happened!', 'Almost Abandoned Attic'), 'border=1 height=80 width=80></td><td width=320>', '<br></td></tr></table>')+'\n' ) } callback(n.responseText, start_time); }
						});
					}
		});
	}
	
	this.get = function(url, callback) {
		if(url.match('neopets.com')) {
			var host = 'www.neopets.com';
		} else if (url.match('neocodex.us')) {
			var host = 'www.neocodex.us';
		}
		GM_xmlhttpRequest({ 
					method: "GET",
					url: url,
					headers: {
						"Host": host,
						"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
						"Accept-Language": "en-US,en;q=0.5",
						"Accept-Encoding": "gzip, deflate",
						"Proxy-Connection": "keep-alive",
						"Cookie": document.cookie
					},
					onload: function(e) { if(e.responseText.match('Something has happened!')) { add_log('Something has happened!\n'+getbetween(getbetween(e.responseText, 'Something has happened!', 'Almost Abandoned Attic'), 'border=1 height=80 width=80></td><td width=320>', '<br></td></tr></table>')+'\n' ) } callback(e.responseText); },
					timeout: 6000,
					ontimeout: function() {
						GM_xmlhttpRequest({ 
							method: "GET",
							url: url,
							headers: {
								"Host": host,
								"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
								"Accept-Language": "en-US,en;q=0.5",
								"Accept-Encoding": "gzip, deflate",
								"Proxy-Connection": "keep-alive",
								"Cookie": document.cookie
							},
							onload: function(n) { if(n.responseText.match('Something has happened!')) { add_log('Something has happened!\n'+getbetween(getbetween(n.responseText, 'Something has happened!', 'Almost Abandoned Attic'), 'border=1 height=80 width=80></td><td width=320>', '<br></td></tr></table>')+'\n' ) } callback(n.responseText); }
						});
					}
		});
	}
}