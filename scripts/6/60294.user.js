// ==UserScript==
// @name           EnableAutoLogin.uc.js
// @description    Enable Auto Login
// @compatibility  Firefox 2.0+
// @include        http://*/bbs/*
// @include        https://*/bbs/*
// @include        http://bbs.*/*
// @include        https://bbs.*/*
// @include        http://*/discuz/*
// @include        https://*/discuz/*
// @include        http://fourm.*/*
// @include        https://fourm.*/*
// @author         GOLF-AT
// @version        1.1.20091023
// ==/UserScript==
(function() {
    function ContentLoaded(event) {
		try {
			var items = event.target.getElementsByTagName('input');
			for(var i=0; i<items.length; i++) {
				var item = items.item(i);
				if (item.hasAttribute('autocomplete'))
					item.setAttribute('autocomplete', "on");
			}
		}catch(e) {}
    }

    function AutoCompleteOn(event) {
        try {
            var href  = event.target.getAttribute('href');
            var click = event.target.getAttribute('onclick');
            if (click.substr(0,9) == 'floatwin(') {
                if ('logging.php?action=login'==href.substr(0,24) ||
                    'register.php'==href.substr(0,12)) {
                    event.target.setAttribute('onclick', '');
                    event.target.click();
                }
            }
        }catch(e) {}
    }

    try {
        document.addEventListener('mousedown', AutoCompleteOn, false);
        document.addEventListener("DOMContentLoaded", ContentLoaded, true);
    }catch(e) {}

})();