// ==UserScript==
// @name        download mp4 from http://stream-tv.me/
// @namespace   http://userscripts.org/users/505447

// @include     http://*.tv-series.mobi/*
// @include     http://tv-series.mobi/*

// @include     http://*.vk.com/video_ext.php*
// @include     http://vk.com/video_ext.php*

// @version     0.3
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==


var iframe;

if(document.location.href.match(/^http:\/\/vk\.com\/video_ext\.php\?oid=/)){	
	var rec = GM_getValue(document.location.href);
	var emb = document.getElementById('flash_video_obj');	
	
	if(emb){			
		var tmp1 = emb.getAttribute('flashvars').split('&');
		for(var i = 0;i<tmp1.length;i++){
			var tmp2 = tmp1[i].split("=");
			if(tmp2[0]=="uid"){GM_setValue(rec+'_uid',tmp2[1]);}
			if(tmp2[0]=="vtag"){GM_setValue(rec+'_vtag',tmp2[1]);}
			if(tmp2[0]=="host"){GM_setValue(rec+'_host',tmp2[1]);}
		}
	}	
}else{
	var elements = document.getElementsByTagName('iframe');
	for(var i=0;i<elements.length;i++){
			
		if(elements[i].getAttribute('src').match(/^http:\/\/vk\.com\/video_ext\.php\?oid=/)){
			GM_setValue(elements[i].getAttribute('src'), document.location.href);	
			iframe = elements[i];										
			iframe.onload = test();

					
		}	
	}	
}

function test(){
				
	var uid  = GM_getValue(document.location.href+'_uid' ,'undefined');
	var vtag = GM_getValue(document.location.href+'_vtag','undefined');
	var host = GM_getValue(document.location.href+'_host','undefined');
	var link = document.createElement('a');

	if(uid != "undefined" & vtag != "undefined" & host != "undefined"){				
		link.href=host+'u'+uid+'/videos/'+vtag+'.360.mp4';
		link.appendChild(document.createTextNode('Download MP4')); 
	}else{
		link.href=document.location.href;
		link.appendChild(document.createTextNode('Couldn\'t create a download link..., try reloading the site.')); 
	}			
	iframe.parentNode.insertBefore(link, iframe);
}




