// ==UserScript==
// @name           8 tracks MP3 download link
// @namespace      Yamamaya
// @include        http://*8tracks.com/*/*
// @version        0.1.4
// ==/UserScript==

var executeBrowserContext = function(funcOrString) {
    var code = 'javascript:(' + encodeURIComponent(funcOrString.toString()) + ')();';
    location.href = code;
};

executeBrowserContext(function() {
	var MP3_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABl0lEQVR4nJ3P3UuTARTH8fMv9R94Uwp2kaBpWIjDUiRiuBRCDLcnX2JQos6y6cTW3HyZbo0tQbbmhs6XBT3OTWurYKgrvXDeeLELv114YyGPmxfn5vz4fQ5HBJFipqp7iubX88R2c/yTFQvce+mlyrzEM+9PllMXkGKBZtsGTc4MLa4ftNk3SgceO5Ion7JUvwpR9vRd6YDeGiS2m6PGZOeGTrnGC4N+BBGTzUfFE3PpQOuQD0FkcVXFG46XDtT3THNp9v9CzRzijx/giWWJqlm20nsIIg96Z64GllN5rKEjFN8RBuceylyCfleEhUiChr5ZbSCazmMKHLO5X2DzD0yoZ+hnMlQaXdzpHKdjaF4baPfksKfg1ykkT8CdAcP0DuWd76k1TmG0eLSBupGvKKE8k8kCk9sFepYOqTMHuP3cwcM3K1iCv7WBxpEw9weCtE58ocUW526fl8quDzwai9Hh3Lq8fBFwRNLUvnBxyzDKTcPb88vWNdpnv+Fez14NCCLule/ohj/TYImiG11j4GOCsKpRRuQvG2SsxuXIJ3AAAAAASUVORK5CYII=';

	var EightTracks = {
		init: function(){
			document.addEventListener('DOMNodeInserted',this,false);
			document.addEventListener('click',this,true);
		},
		handleEvent: function(evt){
			var target = evt.target;
			switch(evt.type){
				case 'DOMNodeInserted':
					if(/^now_playing/.test(target.className)){
						setTimeout(function(){
							EightTracks.mp3Link(target);
						},3000);
					}
					break;
					
				case 'click':
					if(target.id === 'player_skip_button' && !evt.button){
						this.skip();
						evt.preventDefault();
						evt.stopPropagation();
					}
					break;
			}
		},
		mp3Link: function(point){
			var p   = player;
			var ct  = p.sm_sound;
			var mp3 = ct.url;
			var a = document.createElement('a');
			var aStyle = a.style;
			aStyle.fontSize    = '13px';
			aStyle.paddingLeft = '20px';
			aStyle.marginLeft  = '15px';
			aStyle.background  = 'transparent url('+MP3_IMG+') no-repeat';
			a.href = mp3;
			a.textContent = 'Download';
			point.insertBefore(a,point.lastChild);			
		},
		skip: function(){
			player.next();	
		}
	};
	
	EightTracks.init();
});
