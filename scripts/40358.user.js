// ==UserScript==
// @name           Spotify + discogs
// @author         Mattias Blom
// @namespace      MattiasBlom
// @description    Inserts Spotify links to artists on discogs.com
// @include        http://www.discogs.com/*
// ==/UserScript==


/*

Straight up stolen from official blog post about last.fm.

http://www.spotify.com/blog/archives/2008/12/18/spotify-scrobbles/

*/



// Remove whitespace in the beginning and end
function trim(str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

// Creates a link element
function createLink(link) {
    var a = document.createElement('a');
    a.href = link;
    a.title = 'Listen in Spotify'
    a.setAttribute('spotifyLink', true);
    var img = document.createElement('img');
    img.style.border = 'none';
    img.style.marginLeft = '3px';
    img.src = 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGlJREFUeNpi%2BP%2F%2FPwMMuy1j%2BA%2FEBchiIMzEgAn63ZczzkcWwKaoEYgdgAr7cSraGfm%2FAUgZAnECPpNACj8AqQd4FQGtKgBSB2B8FqigArLxQPABaNoEFEVAcB6IBZCsW4DPdwewWQ8QYACnBy8V7gSvaAAAAABJRU5ErkJggg%3D%3D';
    a.appendChild(img);

    return a;
}

// multiple artists with same name search only for the common name
// ending ", the" - no good
function getClenRegExp(){
  var re = /([\s\+]+\(\d+\)|(%2C|,)[\s\+]The|(%2C|,)[\s\+]The[\s\+]+\(\d+\))$/i;
  return re;
}

// Add links for the content under this element.
function addLinks(topElem) {
    // Check if we already added links for this content
    if (topElem.hasAttribute('spotifyLinksAdded'))
        return;
    topElem.setAttribute('spotifyLinksAdded', true);

    // This is a discogs url that we want to rewrite
    var re = /^http:\/\/www.discogs.com\/artist\/([^\?#]*)(\?(no)?anv[^&#]*)?$/i;
    

    var reEnding = getClenRegExp();
    
    var elems = topElem.getElementsByTagName('a');
    
    // limit to 1000 checked links, performance issues on my crappy old computer (YMMV)
    // and by the way, if you're checking out labels where this is an issue: INDIE FAIL!
    for (var i = 0; i < elems.length && i < 1000 ; i++) {
        var elem = elems[i];
    
        // Ignore image links
        if (!elem.href || trim(elem.textContent) == '')
            continue;

        // Check if the link matches
        if (m = re.exec(elem.href)) {
            
            // ignore compilations
            if(trim(m[1].toLowerCase())=='various')
              continue;
                          
            var a = createLink('spotify:search:artist%3a%22'+ trim(m[1].replace(reEnding,'')) +'%22');

            // Insert the link after the found link
            // Check if it already have a spotify url
            if (!elem.nextSibling || !elem.nextSibling.hasAttribute || !elem.nextSibling.hasAttribute('spotifyLink')) {
                elem.parentNode.insertBefore(a, elem.nextSibling);
            }
        }
    }
}

// Add links to titles like the artist name on the artist page.
var body = document.body;
var h1 = body.getElementsByTagName('h1')[0];

//                                  prevent from linking on label pages
if(h1 && h1.className == 'title' && h1.parentNode.getElementsByTagName('a')[0].href.indexOf('/artists/')>-1){
  var re = getClenRegExp();
  var a = createLink('spotify:search:artist%3a%22'+ encodeURIComponent(h1.textContent.replace(re,'')) +'%22');
  h1.appendChild(a);
}

// Find links and add spotify links to them
addLinks(body);