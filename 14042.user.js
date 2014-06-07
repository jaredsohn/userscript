// ==UserScript==
// @name           Browsershots.org Autoextend
// @namespace      http://browsershots.org/http://
// @description    Automatically extends the time every 20 minutes, until all screenshots are generated. In addtion it also changes the time till expire to make it roughly live.
// @include        http://browsershots.org/http://*
// ==/UserScript==

if(document.body.innerHTML.match(/.*Expires in [0-9]+ minutes.*/) != null){
	if(document.getElementsByName("submit").length==0)
	{
		window.setTimeout('window.location.reload()', 60000);
	}else{
		window.setTimeout('document.getElementsByName("submit")[0].click()', 1200000);
		window.setInterval(
			function() {
				var item;
				var time=0;
				for (; time < document.getElementsByTagName("li").length; time++){
					item = document.getElementsByTagName("li")[time];
					if (item.innerHTML.match(/.*Expires in [0-9]+ minutes.*/) != null)
						break;
				}
				time=parseInt(item.innerHTML.match(/.*Expires in [0-9]+ minutes.*/)[0].match(/[0-9]+/)[0]);
				if(time<5){document.getElementsByName("submit")[0].click();}
				time="Expires in " + --time + " minutes";
				item.innerHTML = item.innerHTML.replace(/Expires in [0-9]+ minutes/, time);
			}, 60000);
	}
}