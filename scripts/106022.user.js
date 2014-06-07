// ==UserScript==
// @id             what.cd-whattf
// @name           What.CD : WhatTF Album Description Fetcher
// @namespace      hateradio)))
// @author         hateradio
// @contributor    Paaskehare
// @version        1.5
// @updateURL      https://userscripts.org/scripts/source/106022.meta.js
// @description    Just paste a link to get a description generated from WhatTF by Paaskehare.
// @include        http*://*what.cd/upload.php*
// @match          http://*.what.cd/upload.php*
// @match          https://*.what.cd/upload.php*
// @update         13 Sep 2011
// @date           04 Jul 2011
// ==/UserScript==

/*
 Note:
 This script fetches data from WhatTF by Paaskehare (http://ole.im/whattf/).
 
 If you use NoScript, NotScript, or any other JavaScript blocker, please whitelist ole.im for this script to work.
*/

/* U P D A T E HANDLE */
var update = {
	css:function(t){
		if(!this.style){this.style = document.createElement('style'); this.style.type = 'text/css'; (document.head || document.getElementsByTagName('head')[0]).appendChild(this.style);} this.style.appendChild(document.createTextNode(t+'\n'));
	},
	js:function(t){
		var j = document.createElement('script'); j.type = 'text/javascript'; /(?:^https?\:\/\/)/i.test(t) ? j.src = t : j.textContent = t; document.body.appendChild(j);
	}
};

var whattf = {
	url : 'http://ole.im/whattf/getjson/',
	desc : document.getElementById('album_desc'),
	input : document.createElement('input'),
	span : document.createElement('span'),
	init : function(){
		var b = this.input.cloneNode(false), p = document.createElement('p'), a = document.createElement('a'), r = document.createElement('tr'), d = document.createElement('td'), e = document.createElement('td');
		
		d.textContent = 'WhatTF Description'; d.className = 'label';
		this.input.title = 'Enter the URL.'; this.input.type = 'text'; this.input.size = 60;
		b.value = 'Fetch!'; b.title = 'Get my description!'; b.type = 'button'; b.className = 'whattf_album_desc_button'; b.addEventListener('click',this.fetch,false);
		this.span.textContent = 'Loading description . . .'; this.span.id = 'album_desc_loading'; this.span.title = 'Please wait.'; this.span.style.display = 'none';
		p.textContent = 'Paste the URL to a discogs, beatport, or musicbrainz release page. The info will be placed right into the album description box using '; p.style.margin = '3px 0px';
		a.href = 'http://ole.im/whattf/'; a.title = a.textContent = 'WhatTF'; a.target = '_window';

		this.a(p,a,document.createTextNode('. (Please allow http://ole.im to run scripts.)'));
		this.a(e,this.input,document.createTextNode(' '),b,this.span,p);
		this.a(r,d,e);
		
		this.desc.parentNode.parentNode.parentNode.insertBefore(r,this.desc.parentNode.parentNode);
		this.callbackinit();
		update.css('.whattf_album_desc_button:hover{cursor:pointer} #album_desc_loading{background: #fff url(http://whatimg.com/images/05383655947505369244.gif) no-repeat 6px center; padding: 3px 6px 3px 26px; color: #333; border-radius:3px;margin: auto 6px; font-size: 11px}');
	},
	fetch:function(evt){
		evt.preventDefault();
		var t = whattf.input.value;
		if(/(?:^https?\:\/\/)/i.test(t) && /(?:\b(?:musicbrainz|discogs|beatport)\b)/.test(t)){
			t = btoa(t); update.js(whattf.url+t); whattf.span.style.display = 'inline';
		}else{
			alert('Please enter a valid description URL.');
		}
	},
	callbackinit : function(){
		update.js('function album_description(json){ var d = document.getElementById("album_desc"), s = document.getElementById("album_desc_loading"); d.value = json.data; s.style.display = "none"; }');
	},
	a : function(e){var a = arguments, i = 0, j = a.length; while(++i<j){ e.appendChild(a[i]); } }
};
whattf.init();