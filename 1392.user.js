// ==UserScript==
// @name           GoogleAutoPager
// @namespace      http://ma.la/
// @author         ma.la <timpo@ma.la>
// @include        http://www.google.*/search*
// @description Add autoloading for next page to Google search result. DblClick to enable/disable it. Demo at http://la.ma.la/misc/demo/googleautopager.htm (Working in Trixie and captured by Wink)
// ==/UserScript==

// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

// ver 0.1 @ 2005-06-23
//  Ã¥Â®ÂÃ©Â¨ÂÃ§ÂÂÃ£ÂÂ«Ã¥ÂÂ¬Ã©ÂÂ
//  experimental release
// ver 0.2 @ 2005-06-23
//  Ã£ÂÂÃ£ÂÂÃ£ÂÂ«Ã£ÂÂ¯Ã£ÂÂªÃ£ÂÂÃ£ÂÂ¯Ã£ÂÂ§Ã£ÂÂ¹Ã£ÂÂ¿Ã£ÂÂ¼Ã£ÂÂÃ£ÂÂÃ£ÂÂ«Ã£ÂÂÃ£ÂÂ¦Ã£ÂÂ¿Ã£ÂÂÃ£ÂÂ
//  double click to start.
// ver 0.3 @ 2005-12-02 - modified by beerboy <http://beerboy.org/>
//  convert XMLHttpRequest to GM_xmlhttpRequest.

(function(){
	var base = "http://"+location.host+"/search";
	var offset;
	var num;
	var query;
	var insertPoint;
	var Enable = -1;
	var watch_scroll = function(){
		try{
			var sc = document.body.scrollTop;
			var total = (document.body.scrollHeight - document.body.clientHeight);
			var remain = total - sc;
			// window.status = remain;
			if(remain < 500 && Enable == 1){
				do_request()
			}
		}catch(e){
		
		}
		var self = arguments.callee;
		setTimeout(self,100);
	};
	
	var do_request = function(){
		if(this.requested == offset){return}
		this.requested = offset;
		var xmlhttp;
		try{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			xmlhttp.onreadystatechange = function(){
				//alert(xmlhttp.readyState);
				if(xmlhttp.readyState == 4){
					var v = xmlhttp.responseText;
					var end_flag = 0;
					//alert(v.length);
					var start = v.indexOf("<div><p class=g>");
					var end = v.indexOf("<div class=n>");
					//alert([start,end]);
					//alert(v.length);
					if(v.indexOf("nav_next") == -1){
						end_flag = 1;
					}
					v = v.slice(start,end);
					var div = document.createElement("div");
					div.innerHTML = ["<hr>",offset," to ",(offset+num),"","<p class=g>",v].join("");
					document.body.insertBefore(div,insertPoint);
					window.status = "loading ... " + offset +" - " + (offset+num) + " done.";
					if(!end_flag){
						offset += num;
					}
				}
			};
			xmlhttp.open("GET", base+query.replace(/start=\d*/,"start="+offset), true);
			window.status = "loading ... " + offset +" - " + (offset+num);
			xmlhttp.send(null);
		}catch(e){
			GM_xmlhttpRequest({
				method:"GET",
				url:base + query.replace(/start=\d*/,"start=" + offset),
				onload:function(details)
				{
					var v = details.responseText;
					var end_flag = 0;
					//alert(v.length);
					var start = v.indexOf("<div><p class=g>");
					var end = v.indexOf("<div class=n>");
					//alert([start,end]);
					//alert(v.length);
					if(v.indexOf("nav_next") == -1){
						end_flag = 1;
					}
					v = v.slice(start,end);
					var div = document.createElement("div");
					div.innerHTML = ["<hr>",offset," to ",(offset+num),"","<p class=g>",v].join("");
					document.body.insertBefore(div,insertPoint);
					window.status = "loading ... " + offset +" - " + (offset+num) + " done.";
					if(!end_flag){
						offset += num;
					}
				}
			});
		}
	};

	var init_autopager = function(){
		var div = document.getElementsByTagName("div");
		var len = div.length;
		for(var i=0;i<len;i++){
			if(div[i].className == "n"){
				insertPoint = div[i];
			}
		}

	// find nav_next.gif 
		var img = document.images;
		var len = img.length;
		var next;
		for(var i=0;i<len;i++){
			if(img[i].src.indexOf("nav_next") != -1){
				next = img[i];
			}
		}
		var href = next.parentNode.href;
		query = href.substr(href.indexOf("?"));
		offset = (query.match(/start=(\d*)/))[1] - 0;
		var tmp = query.match(/num=(\d*)/);
		num = tmp?tmp[1]-0:10;
	};

	// init 
	if(window.location.href.indexOf(base) != -1){
		if(document.body.attachEvent){
			document.body.attachEvent(
				'ondblclick',function(){
					Enable *= -1;
					window.status = (Enable==1)?"Enabled":"Disabled"
				}
			);
		}else{
			document.body.addEventListener(
				'dblclick',function(){
					Enable *= -1;
					window.status = (Enable==1)?"Enabled":"Disabled"
				},true
			);
		}
		init_autopager();watch_scroll()
	}
})();
