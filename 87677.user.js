// ==UserScript==
// @name           Twio.cz Thumbnailer
// @version        1.1
// @description    add image previews from twio.cz
// @namespace      http://horakj.cz
// @author         Jakub Hořák <kub4jz@gmail.com>

// @permissions    http://api.twio.cz/*
// @permissions    http://twio.kub4jz.cz/?id=*

// @include        http*://twitter.com/*
// @match          http://twitter.com/*
// @match          https://twitter.com/*

// ==/UserScript==

(function(d){

    const gm_class = ' gm_twiothumbnailer';

    function findPics()
    {
        var links = d.querySelectorAll('div.stream-item div.tweet-text > a.twitter-timeline-link, div.tweet-text-large > a.twitter-timeline-link', d.getElementById('page-outer'));
        var regex = new RegExp('^/');
        var twioRegex = new RegExp('w{0,3}.?twio.cz', 'i');

    	for (var i = 0; i < links.length; i++) {
    	    var a = links[i];

    	    if (twioRegex.test(a.hostname) == false) continue;
            if (a.className.indexOf(gm_class) >= 0) continue;
    	    if (a.pathname.indexOf('.') != -1) continue;
    	    if (a.pathname.length < 2) continue;
    	    if (a.pathname.lastIndexOf('/') != 0) continue;
    	    if (a.search || a.hash) continue;

            // aby se nespouštělo znovu na již upravených tweetech (odkazech)
            a.className += gm_class;

            // odstraníme / ze začátku adresy
            var id = a.pathname.replace(regex, '');

            var parent = a.parentNode;

            // Pokud rodič neobsahuje třídu tweet-text-large není to detail tweetu
            if (parent.className.indexOf('tweet-text-large') == -1) {
                parent = parent.parentNode.parentNode;

                if (parent.querySelector('span[data-media-type="twio"]')) continue;

                var corner = parent.querySelector('.extra-icons .inlinemedia-icons');
                if (corner) corner.innerHTML += '<span data-media-type="twio" class="media photo"></span>';
            } else { // detail tweetu => načítáme API a vytváříme náhled
                parent = parent.parentNode.parentNode.parentNode.parentNode.parentNode;

                var media = parent.querySelector('div.tweet-media');
                if (!media) continue;

                // obal fotky
                var photo = d.createElement('div');
                    photo.setAttribute('class', 'twio');
                var photoHTML = '';

                // via Twio.cz
                var attribution = d.createElement('div');
                    attribution.setAttribute('class', 'media-attribution');

                var attributionHTML = '<span>via</span>'
                                    + '<img width="16px" height="16px" src="http://twio.cz/favicon.ico">'
                                    + '<a href="http://twio.cz" class="media-attribution-link" data-media-type="Twio" target="_blank">Twio.cz</a>';

                attribution.innerHTML = attributionHTML;
                media.appendChild(photo);
                media.appendChild(attribution);

                // miniatura fotky (následně se přepíše větším náhledem)
                photoHTML  = '<a target="_blank" href="'+ a.href +'?ref=twioczthumbnailer" data-inline-type="Twio" class="inline-media-image">'
                           + '<img src="http://twio.cz/pics/thumb/'+ id +'.jpg">'
                           + '</a>';

                photo.innerHTML = photoHTML;

                // stáhneme API
                if (typeof GM_xmlhttpRequest === "function") {
                    GM_xmlhttpRequest({
                    	method: "GET",
                    	url: 'http://twio.kub4jz.cz/?id='+ id, // používáme, protože chrome
                        //url: 'http://api.twio.cz/geturl?id='+ id,
                    	onload: function(response) {
                            var parser = new DOMParser();
                            var xml = parser.parseFromString(response.responseText, "text/xml");

                            var doc = xml.documentElement;
                            if (!doc) return false;

                            var photoHTML = '';

                            // cyklus pro případ více fotek pod jedním odkazem
                            for (var j = 0; j <= 3; j++) {
                                var item = doc.getElementsByTagName('item-'+j)[0];
                                if (!item) break;

                                var value = item.getElementsByTagName('normalUrl')[0].textContent;

                                photoHTML += '<a target="_blank" href="'+ a.href +'?ref=twioczthumbnailer" data-inline-type="Twio" class="inline-media-image">'
                                          + '<img src="'+ value +'">'
                                          + '</a>';
                            }

                            photo.innerHTML = photoHTML;
                    	}
                    });
                }
            }
    	}

        return false;
    }


    findPics();

    setTimeout( function () {
        var t;
        d.getElementById('page-container').addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout(findPics, 250); }, false);
    }, 500);

})(document);
