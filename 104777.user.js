// ==UserScript==
// @name           vkontakte i'am here
// @namespace      vkontakte_here
// @description    сообщает на каком сайте из списка вы находитесь сейчас.
// @include        http://habrahabr.ru/*
// @include        http://beon.ru/*
// @include        http://*.livejournal.com/*
// @include        http://livejournal.com/*
// @include        http://sprashivai.ru/*
// @include        http://*.formspring.me/*
// @include        http://formspring.me/*
// @include        http://resheto.ru/*
// @include        http://nekto.me/*
// @include        http://love.ru/*
// @include        http://*.love.ru/*
// @include        http://bash.org.ru/*
// @include        http://bash.im/*
// @include        http://deviantart.com/*
// @include        http://*.deviantart.com/*
// @include        http://animeradio.su/*
// @include        http://101.ru/*
// @include        http://facebook.com/*
// @include        http://lib.ru/*
// @include        http://samlib.ru/*
// @include        http://www.amalgama-lab.com/*
// @include        http://www.ebay.com/*
// @include        http://chat.chat.ru/*
// @include        http://userscripts.org/*
// @include        http://userstyles.org/*
// @include        http://wikipedia.org/*
// @include        http://*.wikipedia.org/*
// @include        http://www.diary.ru/*
// @include        http://www.flickr.com/*
// @include        http://nnm.ru/*
// @include        http://*.nnm.ru/*
// @include        http://smotri.com/*
// ==/UserScript==


(function(){
	function makeRequest(url, callback) {
		if (GM_xmlhttpRequest) {
			GM_xmlhttpRequest({
			  method: "GET",
			  url: url,
			  onload: callback
			});
		}
	}
	
	var my_domain = (/[^\.]+\.[^\.]+$/.exec(document.domain))[0]

	if (document.domain == "bash.org.ru") my_domain = "bash.org.ru";
	if (document.domain == "chat.chat.ru") my_domain = "chat.chat.ru";
	function alertContents(httpRequest) {
		try{
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) {
					var current_status = /class="my_current_info">([^<]+)</.exec(httpRequest.responseText)
					current_status = current_status?current_status[1]:current_status;
					
					if (!current_status || current_status.indexOf(my_domain)<0) {
						var info_hash = (/"info_hash":"([^"]+)"/.exec(httpRequest.responseText))[1];
						var id = (/id: ([0-9]+)/.exec(httpRequest.responseText))[1];
						
						if (info_hash){
							makeRequest("http://vk.com/al_page.php?act=current_info&oid="+id+"&al=1&hash="+info_hash+"&info=" + encodeURIComponent("я здесь "+my_domain));
							GM_setValue("domain", my_domain)
						}
					}
				} else {
					//alert('There was a problem with the request.');
				}
			}
		}
		catch( e ) {
			window.console.error(e)
		}

	}

	if (GM_getValue("domain") != my_domain)
		makeRequest("http://vk.com/id0", alertContents);

})()