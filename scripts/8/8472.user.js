// ==UserScript==
// @name    Only Slashdot News/Comments
// @author    Kristopher and linolium
// @description    Removes all content on Slashdot except News and Comments and Header.
// @include    http://slashdot.org/*
// @include    http://*.slashdot.org/*
// ==/UserScript==

(function() {
head = document.getElementsByTagName('head')[0];
    if (head)
    {
		var styles = document.getElementsByTagName("link");
		var home = true;
		for (var i = 0; i < styles.length; i++)
			if (styles[i].href.indexOf("slashdot_") > 0)
				home = false;
        style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML =
            'body { width: 100%; min-width: 0px; background: #ffffff; border: 0px; padding: 0; }\n' +
            '#wrapper { width: 100%; border: 0px; padding: 0px; max-width: 45em; margin: auto !important; }\n' +
            '#contents { width: 100%; padding: 0px; margin: 0px }\n' +
            '#frame { padding: 0px; border-top: 0px; background: #ffffff; }\n' +
            '.ad1 { display: none; }\n' +
            '.ad6 { display: none; }\n' +
            '.content { display: none; }\n' +
            '.copyright { display: none; }\n' +
            '.btmnav { display: none; }\n' +
            '#ostgnavbar { display: none; }\n' +
            '#slashboxes { display: none; }\n' +
            '#articles { margin: auto !important; }\n' +
            '#art1, #art2, #slink1, #slink1 .comments, #slink2, #slink2 .comments { margin-right: 0; }\n' +
            '#links { display: none; }\n' +
            '#message { display: none; }\n' +
            '#footer { display: none; }\n' +
			(home ? '#frame > div:first-child { background: url(http://images.slashdot.org/topnav-bg.png); position: absolute; top: 0; height: 13px; width: 28px; z-index: 100; }\n' : '') +
			'#topnav { margin: 0; }\n' +
			'.tagtitleclosed > i { display: none; }\n' +
			'body div.tags { margin-top: 2px; }\n' +
        head.appendChild(style);
    }
})();