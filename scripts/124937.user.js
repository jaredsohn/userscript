// ==UserScript==
// @name           TimeSinceLastUpload
// @namespace      http://userscripts.org/users/65243
// @description    Shows the time since the last uploaded video on your subscriptions list. Makes it easier to clean up your subscriptions list.
// @include        *youtube.com/subscription_manager*
// ==/UserScript==

(function() {
	var tmp = document.getElementsByClassName("subscription-title");
	this.els = new Array();
	for (var i in tmp)
		this.els.push(tmp[i]);
	
	
	this.next = function () {
		var el = els.shift();
		if (!el)
			return; // .shift() failed = eof
			
		var user = el.innerHTML;
		
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://gdata.youtube.com/feeds/api/users/"+user+"/uploads?v=2&alt=jsonc&max-results=1",
			onload: function(response) {
				var data = JSON.parse(response.responseText);
				
				if (!data.error) {
					var date = new Date(data.data.items[0].uploaded).getTime();
					var days = Math.floor((Date.now() - date) / 86400000); // ms to days
					
					el.innerHTML += " - " + days + " days";
				}
				
				//next.apply(this);
			}
		});
		// Dont wait for it to load, just query the next NAO! (very vast)
		next.apply(this);
	};
	
	this.next.apply(this);
}).apply(window);
