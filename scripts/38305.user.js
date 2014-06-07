// ==UserScript==
// @name           anywhere Yahoo! Media Player
// @namespace      http://d.hatena.ne.jp/jazzanova/
// @include        *
// @excludes       http://delicious.com/*
// @excludes       http://b.hatena.ne.jp/*
// @excludes       http://mail.google.com/*
// @excludes       https://mail.google.com/*
// ==/UserScript==

(function() {
    var script = createElement('script', {
        src: 'http://mediaplayer.yahoo.com/js',
        type: 'text/javascript'
    });
    var head = $t('head')[0];
    head.insertBefore(script, head.childNodes[0]);

    function convert_mp3_link() {
        mp3s = Array.prototype.filter.apply($t('a'), [function(e) { return e.href.match(/\.mp3/i) }]);
        var i = 0;
        setTimeout(function forEach() {
            if (!(i < mp3s.length))
                return;
            var mp3 = mp3s[i++];
            mp3.href = mp3.href;
            setTimeout(forEach);
        },0);
    }


    function createElement(tagname, attrs, innerHTML) {
        var element = document.createElement(tagname);
        for (var k in attrs) {
            element.setAttribute(k, attrs[k]);
        }
        element.innerHTML = innerHTML;
        return element;
    }

    convert_mp3_link();

	setTimeout(function() {
	  if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
	    window.AutoPagerize.addDocumentFilter(convert_mp3_link);
	  }
	}, 0);


    function $t(tagname) {
        return document.getElementsByTagName(tagname);
    }
})();

