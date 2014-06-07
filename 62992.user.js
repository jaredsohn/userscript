// ==UserScript==
// @name           Tudou Lite Frontpage Boost Image
// @namespace      http://woooh.com
// @include        http://www.tudou.com/
// ==/UserScript==


var isindex = document.getElementById("slideFocus");
if(isindex!=null) {
	var images = document.getElementsByClassName("lazyImg");
	for (var i = 0; i < images.length; i++) {
	    altStr = images[i].getAttribute("alt");
	    images[i].setAttribute("src",altStr);
	}
}
// list all the variables in the content's global scope
var issingleplaying = document.getElementById("relV");
issingleplaying.innerHTML = "";

if(issingleplaying!=null) {

	GM_xmlhttpRequest({
		method:"GET",
		url:"http://douwan.tudou.com/searchRelative.html?kw="+ unsafeWindow.iid_code,
		headers:{
			"User-Agent":"monkeyagent",
			"Accept":"text/html",
		},
		onload:function(details) {
			var myObject = eval('['+ details.responseText +']');
			var htmlStr = [];
			var itemCount = 0;
			//for(var i=myObject[0].items.length-1; i > 0; i--){
			for(var i=1; i < myObject[0].items.length; i++){
				itemCount ++;
				htmlStr.push('<div class="rvi"><div class="p"><div class="pic"><a title="'+ myObject[0].items[i].title +'" href="http://www.tudou.com/programs/view/'+ myObject[0].items[i].code +'/"><img class="pack_clipImg" width="90" height="68" src="'+ myObject[0].items[i].itempic +'"/></a></div><h6><a title="'+ myObject[0].items[i].title +'" href="http://www.tudou.com/programs/view/'+ myObject[0].items[i].code +'/">'+ myObject[0].items[i].title +'</a></h6><p></p></div></div>');
				if(itemCount == 8) break;
			}
			issingleplaying.innerHTML = "<div class='rc'>"+ htmlStr.join("") +"</div>";
		}
	});
}
