// ==UserScript==
// @name           ShoopdawhoopLinkgrabber
// @namespace      ShoopdawhoopLinkgrabber
// @description    Grabs the SWF link.
// @include        http://www.shoopdawhoop.com*
// @include        http://shoopdawhoop.com*
// @match          http://www.shoopdawhoop.com/*
// @author Lexsym
// @version 0.5
// @date 2010-09-28
// ==/UserScript==

(function () {
		
	function fixFrame(urll, urll2) {
		try {
			var testit = parent.window.frames[1].document.getElementsByTagName('center')[0];
			testit.innerHTML='<a href="http://www.facebook.com/pages/Shoop-Da-Whoop/284142208658" target="rickroll"><img src="facebook.jpg"></a>';
			testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=ac" target="_parent"><img src="ac.jpg"></a>';
			testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=g" target="_parent"><img src="g.jpg"></a>';
			testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=h" target="_parent"><img src="h.jpg"></a>';
			testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=l" target="_parent"><img src="l.jpg"></a>';
			testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=wtf" target="_parent"><img src="wtf.jpg"></a>';
			testit.innerHTML+='<a id="downloadit" href="'+urll+'" target="_parent"><img src="http://i74.photobucket.com/albums/i275/mal1t1a/sdw-download-icon2.png" alt="'+urll2+'"></a>';
		} catch(err) {
			try {
				var testit = window.frames[1].document.getElementsByTagName('center')[0];
				testit.innerHTML='<a href="http://www.facebook.com/pages/Shoop-Da-Whoop/284142208658" target="rickroll"><img src="facebook.jpg"></a>';
				testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=ac" target="_parent"><img src="ac.jpg"></a>';
				testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=g" target="_parent"><img src="g.jpg"></a>';
				testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=h" target="_parent"><img src="h.jpg"></a>';
				testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=l" target="_parent"><img src="l.jpg"></a>';
				testit.innerHTML+='<a href="http://www.shoopdawhoop.com/?shoop=wtf" target="_parent"><img src="wtf.jpg"></a>';
				testit.innerHTML+='<a id="downloadit" href="'+urll+'" target="_parent"><img src="http://i74.photobucket.com/albums/i275/mal1t1a/sdw-download-icon2.png" alt="'+urll2+'"></a>';
			} catch (err2) {
				
			}
		}
	}
	
	function runit() {
			var swff;
			var swfn;
			swff=document.getElementsByTagName('html')[0].innerHTML;
			if (swff.search("window.location=")>0) {
				swff=swff.substr(swff.lastIndexOf("=")).replace('="','').replace('</script>','').replace('</head>','').replace('";','');
				swff=swff.substr(0,swff.length-1);
				swfn=swff.replace('http://www.shoopdawhoop.com','').replace('/ac/','').replace('/wtf/','').replace('/g/','').replace('/h/','').replace('/l/','').replace('.swf','');
				fixFrame(swff,swfn);
			}
	}
	
	runit();
})();