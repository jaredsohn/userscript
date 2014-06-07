// ==UserScript==
// @name          WOT
// @description   WOT
// @exclude       http://*.mywot.com/*
// @exclude       http://*google.com/*
// @exclude       http://*lifehacker.com/*
// @exclude       http://*gizmodo.com/*
// @exclude       http://*facebook.com/*
// @exclude       http://*youtube.com/*
// @exclude       http://*apple.com/*
// @exclude       http://*wikipedia.org/*
// @exclude       http://*microsoft.com/*
// @exclude       http://*adobe.com/*
// @exclude       http://*gmail.com/*
// @exclude       http://*avira.com/*
// @exclude       http://*yahoo.com/*
// @exclude       http://*acidtests.org/*

// ==/UserScript==

(function() {	
    var f = document.getElementById('wot-bookmarklet');
    if (f) {
        f.parentNode.removeChild(f);
        return;
    }
    var l = location.hostname;
    if (l && l.length) {
        f = document.createElement('iframe');
        if (f) {
            f.setAttribute('id', 'wot-bookmarklet');
            f.setAttribute('src', 'http://www.mywot.com/bookmarklet/' + encodeURIComponent(location.hostname));
            f.setAttribute('frameborder', 0);
            f.setAttribute('scrolling', 'no');
			f.setAttribute('style', 'position:fixed;bottom:10px;right:10px;' + 'width:135px;height:235px;border:0;margin:0;padding:0;z-index:10487575;');
            
			var div = document.createElement('div');
			div.setAttribute('id', 'wot-opera');
			div.setAttribute('style', 'position:fixed;bottom:10px;right:10px;' + 'width:135px;height:235px;border:0;margin:0;padding:0;z-index:10487576;opacity:0;');
			div.onclick = function(){
				var f = document.getElementById('wot-bookmarklet');
				if(f) {
					f.parentNode.removeChild(f);
				}
				var div = document.getElementById('wot-opera');
				if(div){
					div.parentNode.removeChild(div);
				}
			};
			
			if (document.body) {
                document.body.appendChild(f);
                document.body.appendChild(div);
            }
        }
    }
})();