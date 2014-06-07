// ==UserScript==
// @name           Filmtipset Cast Images
// @namespace      none
// @description    Displays small cast images on each movie page on filmtipset.se
//                 Firefox about:config network.http.sendRefererHeader must be set to 1,
//                 or else imdb's image server will block your requests.
// @version        0.04
// @include        http://www.filmtipset.se/film/*
// @include        http://nyheter24.se/filmtipset/film/*
// ==/UserScript==

var persons;

function get(url, cb)
{
  GM_xmlhttpRequest({
     method: "GET",
     url: url,
     onload: function(xhr) { cb( xhr.responseText); }
  });
}

function setCastStyle(el,img)
{
    el.style.display    = 'block';
    el.style.padding    = '9px 5px 9px 50px';
    el.style.margin     = '2px 0';
    el.style.background = '#F3F4E7 url('+img+') no-repeat 10px 50%';
}

function drawCastBox()
{
    var xpath = '//h2[contains(.,"despelare")]/../../td[2]/span/a';
    persons = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if(!persons.snapshotLength)
        return false;

    var castBox = persons.snapshotItem(0).parentNode.parentNode;
    castBox.innerHTML = '';
    for(var i = 0; i < persons.snapshotLength; i++) {
        var el = persons.snapshotItem(i);
        setCastStyle(el,'http://i.media-imdb.com/images/SF984f0c61cc142e750d1af8e5fb4fc0c7/nopicture/small/name.png');
        castBox.appendChild(el);
    }

    return true;
}

function drawImages(text)
{
    var imdbActors = [];
    text.replace(/title="(.*?)"\n\n\s+src="(.*?)" class=""/gm,
            function(m, n, o) {imdbActors.push({img: o, name: n})}
    );
    for(var i = 0; i < persons.snapshotLength; i++) {
        for(var j = 0; j < imdbActors.length; j++) {
            var ftActor = persons.snapshotItem(i).text.replace(/ \(.+\)/,'').toLowerCase();
            var imdbActor = imdbActors[j].name.toLowerCase().replace(/\./gm,'');
            if(imdbActor == ftActor) {
                setCastStyle(persons.snapshotItem(i), imdbActors[j].img);
            }
        }
    }
}

function callImdb()
{
    var xpath = '//a[contains(@href, "http://www.imdb.com/title/")]'
    var imdbUrl = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    if(!imdbUrl || !drawCastBox())
        return false;

    get(imdbUrl.toString(), drawImages);
}

callImdb();
