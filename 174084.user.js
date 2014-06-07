// ==UserScript==
// @name            grommudo
// @version			1.0.0
// @description     Aktualne MUDO GROM
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include			http://*.erepublik.com/*
// @include			https://*.erepublik.com/*
// ==/UserScript==
	
	GM_xmlhttpRequest({
      method: "GET",
      url: "http://grom.roob"+"hajz.net/mudo.txt",
      headers: {
        "Accept": "text/html"
      },
      onload: function(response)
      {
        var text = '<div style="clear: both;"></div><h1 class="noborder">GROM MUDO</h1><div class="post_content" style="font-size: 13px; padding: 10px; text-align: left; background: #f1faea; border-top: 1px solid #d9eacb; color: #5a8931; font-size: 11px; font-weight: bold;">'+response.responseText+'</div><div style="height: 10px;"></div>';
    	$('#orderContainer').after(text);
      }
    });
	
	
	
	