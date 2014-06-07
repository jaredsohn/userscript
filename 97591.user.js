// ==UserScript==
// @name             Podcast downloader for polskieradio.pl
// @author           Krzysztof Ostrowski
// @date             January 15, 2014
// @namespace        http://insooth.i365.pl/insooth/
// @include          http://polskieradio.pl/*
// @include          http://www.polskieradio.pl/*
// ==/UserScript==

(function()
{

var process = function(icons) {
    if ( (null !== icons) && (0 < icons.length) ) {

        var re = new RegExp('playFile\\(\'[^\']+\',\\s*\'([^\']+)\'')

        var processor = function(urls, re, audio) {
            if ( (null !== urls) && (0 < urls.length) ) {
                var a = document.createElement('a')
                var a_href = document.createAttribute('href')
                var a_alt = document.createAttribute('alt')
                var a_class = document.createAttribute('class')
                var url = ""
                var tmp = null
                var parsed = false
                a_class.value = 'podcast-downloader'

                for (var i in urls) {
                    url = ""
                    tmp = null

                    try {
                        parsed = false;

                        if (urls[i].parentNode.getElementsByClassName(a_class.value).length > 0)
                        {
                            parsed = true
                        }

                        if ( (null !== urls[i]) && (true == urls[i].hasAttribute('onclick')) && (false == parsed) ) {
                            tmp = urls[i].getAttribute('onclick')
                            if ( (null !== tmp) && (true == re.test(tmp)) ) {
                                url = re.exec(tmp)[1];
                                a.innerHTML = ' Pobierz'
                                a_href.value = 'http://static.polskieradio.pl/' + url + ( (true == audio) ? '.mp3' : '.flv')
                                a_alt.value = 'Zapisz podcast jako...'
                                a.setAttributeNode(a_href)
                                a.setAttributeNode(a_alt)
                                a.setAttributeNode(a_class)
                                urls[i].parentNode.appendChild(a)
                            }
                        }
                    } catch (e) {}
                }
            }
        }

        for (var i in icons) {
            try {
                processor(icons[i].getElementsByClassName("iVCam"), re, false)
            } catch (e) {}

            try {
                processor(icons[i].getElementsByClassName("iSpeaker"), re, true)
            } catch (e) {}
        }
    }
}

process(document.getElementsByClassName("bIcons"))
process(document.getElementsByClassName("icons"))
process(document.getElementsByTagName("li"))

return;

}) ();

