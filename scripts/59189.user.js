// ==UserScript==
// @name           MinibufferAlcCommand
// @namespace      http://d.hatena.ne.jp/swkm/
// @description    MinibufferAlcCommand
// @include        *
// ==/UserScript==

if(!window.Minibuffer) return;

//  nothing => nothing
window.Minibuffer.addCommand({
	name: 'alc',
	command: function(stdin){
		var str = this.args.shift();
   		if ( location.hostname.match(/(^|\.)alc\.co\.jp$/) ) {
			window.open('http://eow.alc.co.jp/'+str+'/UTF-8/', '_self');
		}
		else {
			window.open('http://eow.alc.co.jp/'+str+'/UTF-8/', '_blank');
		}
	}
});


(function(){
    var w = unsafeWindow ? unsafeWindow : window;
	if ( location.hostname.match(/(^|\.)alc\.co\.jp$/) ) {
	    w.onload = function(){};
	}
})();
