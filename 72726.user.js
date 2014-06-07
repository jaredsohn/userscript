// ==UserScript==
// @name           Google Reader to Instapaper Reloaded
// @namespace      http://brettterpstra.com
// @description    Add current Google Reader item to Instapaper
//	Updated to work with new Reader formatting and Instapaper bookmarklet requirements, works in compact and expanded views
//	Use "i" to add current item to Instapaper.
// @include        http://www.google.com/reader/view/*
// ==/UserScript==
	var shortCutKey = 'I';
	window.iprl5 = function(){};
	function keyPressEvent(ev){
		var keyID = null;
		var e = (window.event) ? event : ev;
		if (navigator.appName == "Microsoft Internet Explorer") {
			keyID = event.keyCode;
		} else {
			keyID = (window.event) ? event.keyCode : ev.keyCode;
		}
		var k = String.fromCharCode(keyID),item;
		if(k == shortCutKey){
			try {
	  			item = document.getElementById('current-entry').childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0];
			} catch(e) {
				item = document.getElementById('current-entry').childNodes[1].childNodes[0].childNodes[1].childNodes[0];
			}
	  	var title       = item.innerHTML.split("<div")[0];
	  	var url 	= item.href;
	  	toInstapaper(title, url);
	   }
	}
	function toInstapaper(title,url)
	{
		var d=document,z=d.createElement('scr'+'ipt'),b=d.body;
		try	{
			if(!b)throw(0);
			d.title='(Saving...) '+d.title;
			z.setAttribute('src','http://www.instapaper.com/j/JbbKTRdmElDu?u='+encodeURIComponent(url)+'&t='+(new Date().getTime()));
			b.appendChild(z);
		}
		catch(e)
		{
			alert('Please wait until the page has loaded.');
		}

	}
	document.onkeyup = keyPressEvent;