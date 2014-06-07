// ==UserScript==
// @name           Artechok - Add link to trailer from moviemaze.de 
// @namespace      http://esquifit.myopenid.com/
// @description    Kino München - Artechok - Add link to trailer from moviemaze.de 
// @include        http://www.artechock.de/film/muenchen/index*
// @include        http://www.artechock.de/film/muenchen/film*
// @include        http://www.artechock.de/film/muenchen/oton*
// @include        http://www.artechock.de/film/bg/film.htm
// @include        http://www.artechock.de/film/bg/index.htm
// ==/UserScript==



/*
 *  Credits and copyright notice:
 *  - The Yahoo! guys from YQL Team
 *    http://developer.yahoo.com/yql/
 *  - The 'filmstrip' icon is gratiously offered for free by Mark James and licensed under  
 *    a Creative Commons Attribution 2.5 License  (http://creativecommons.org/licenses/by/2.5/) 
 *    http://www.famfamfam.com/lab/icons/silk/
 *  - The 'filmstrip' icon was converted to data: pseudo-protocol with the aid of 
 *    the "data: URI image encoder" by Mike Scalora available under 
 *    http://www.scalora.org/projects/uriencoder/
 * 
 *  Change log
 *  - 30.12.2008 Initial release
 *  - 31.12.2008 Handling of special characters in the script itself
 *  - 01.01.2009 Support for embedded frame in http://www.muenchen.de/
 */

const SEARCH_URL   = "http://www.moviemaze.de/suche/result.phtml?searchword=";
const TRAILER_PATH = "//tr[td[(strong[text()] or a[strong[text()]]) and following-sibling::td/a[text()='Trailer']]]"
const YQL_QUERY    = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where";
const MOVIES_XPATH = "//tr/td//a[starts-with(@href,'../text/filminfo')]";
const ONST         = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
const USER_AGENT   = navigator.userAgent;
const SPECIALS     = /\W/g;  // this is probably too restrictive; allow more if needed
const FILM_ICON    = 'data:image/png;base64,' +
                     'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
                     'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIfSURBVDjLpZNPaBNBGMXfbrubzBqbg4kL0lJLgiVK' +
                     'E/AP6Kl6UUFQNAeDIAjVS08aELx59GQPAREV/4BeiqcqROpRD4pUNCJSS21OgloISWMEZ/aPb6ARdNeT' +
                     'Cz92mO+9N9/w7RphGOJ/nsH+olqtvg+CYJR8q9VquThxuVz+oJTKeZ63Uq/XC38E0Jj3ff8+OVupVGLb' +
                     'olkzQw5HOqAxQU4wXWWnZrykmYD0QsgAOJe9hpEUcPr8i0GaJ8n2vs/sL2h8R66TpVfWTdETHWE6GRGK' +
                     'jGiiKNLii5BSLpN7pBHpgMYhMkm8tPUWz3sL2D1wFaY/jvnWcTTaE5DyjMfTT5J0XIAiTRYn3ASwZ1MK' +
                     'bTmN7z+KaHUOYqmb1fcPiNa4kQBuyvWAHYfcHGzDgYcx9NKrwJYHCAyF21JiPWBnXMAQOea6bmn+4ueY' +
                     'GZi8gtymNVobF7BG5prNpjd+eW6X4BSUD0gOdCpzA8MpA/v2v15kl4+pK0emwHSbjJGBlz+vYM1fQeDr' +
                     'YOBTdzOGvDf6EFNr+LYjHbBgsaCLxr+moNQjU2vYhRXpgIUOmSWWnsJRfjlOZhrexgtYDZ/gWbetNRbN' +
                     's6QT10GJglNk64HMaGgbAkoMo5fiFNy7CKDQUGqE5r38YktxAfSqW7Zt33l66WtkAkACjuNsaLVaDxlw' +
                     '5HdJ/86aYrG4WCgUZD6fX+jv/U0ymfxoWVZomuZyf+8XqfGP49CCrBUAAAAASUVORK5CYII=';

/* ******************************************************************************** 
 *                               Utility functions 
 * ********************************************************************************

/* Utility function: normalise white space in a string */
function normalize_space(str) 
{
    return str.replace(/^\s+|\s+$/g, '')
              .replace(/\s{2,}/g, ' ');
}

function normalize_string(str)
{
    return str
              // dexmlify string
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g,  '<')
              .replace(/&gt;/g,  '>')
              // stript out all special characters 
              .replace(SPECIALS, '')
              // and convert to lowercase.
              .toLowerCase();
}

/* ******************************************************************************** 
 *                               Support functions 
 * ********************************************************************************

/* Show trailer */
function show_trailer(icon, res) 
{
    var movie = icon.nextSibling;
    var name  = movie.textContent;

    if (res.responseText)
    {
        // XML() doesn't like xml opening processing instruction
        var doc = new XML(res.responseText.replace(/^<\?xml [^>]*>\s*/,''));
        GM_log(doc.toString());
    }
    else
    {
        GM_log("Fatal error!");
        return;
    }

    /* process xml response and extract trailer's url */
    if ( res.status == '200')
    {
        var url = get_trailer_url(doc.results, name);
        if (url)
        {
            GM_openInTab(url);
        }
        else
        {
            open_search_tab(name);
        }
    }
    else
    {
        GM_log("Status: " + res.status);
        if (doc.description.toString())
        {
            GM_log(doc.description);
        }
        else
        {
            GM_log("Trailer not found.\n" + doc.toString());
        }
        open_search_tab(name);
    }
}

function open_search_tab(name)
{
    /* Construct search url */
    var search_url = SEARCH_URL + name.replace(/ /g, '+');
    GM_openInTab(search_url);
}

function get_trailer_url(rows, name)
{
    // Normalise search string and strip out eventual original title at the end
    var search = normalize_string( name ).replace(/\(.*?\)\s*$/,'');
    
    // URL of the movie trailer
    var url;

    GM_log('Normalized searh string: ' + search);

    var count =rows.tr.length();
    GM_log('Number of candidate entries: ' + count );
    
    for (var res=0; res < count; res++)
    {
        var row = rows.tr[res];
        // Normalize movie title of each candidate string 
        var movie_title = normalize_string( row.td[0].a.strong.toString() );
        GM_log('Normalized title: ' + movie_title);

        // Check whether title matches a portion of the (normalized) search string
         
        if( search.indexOf(movie_title) > -1)
        {
            url =  'http://www.moviemaze.de' + row.td[1].a.@href;
            break;
        }
    }
    return url;
}

/* closure to hold reference to the link object */
function get_load_handler(icon)
{
        return function(response)
               {
                        show_trailer(icon, response);
               }
}

/* Construct click handler */
function get_click_handler(icon, url )
{
    return function(ev)
    {
        GM_log('Requesting: \n' + url);
        GM_xmlhttpRequest({
                method:  'GET',
                url:     url,
                headers: { 'User-agent': USER_AGENT },
                onload:  get_load_handler(icon),
                onerror: function (res)
                         {
                                GM_log('XHR Error: \n' + res.responseText);
                                icon.removeChild(icon.firstChild);
                         }
        });
    }        
} 

function set_icon(elem, name)
{

    //  Create icon 
    var img               = document.createElement('IMG');
    img.src               = FILM_ICON;
    img.style.border      = "none";
    img.style.marginRight = "1em";
    img.style.cursor      = "pointer";

    var icon = document.createElement('SPAN');
    icon.appendChild(img);

    //  Prepend icon 
    icon.setAttribute('title', 'Watch trailer "' + name + '"');
    elem.parentNode.insertBefore(icon, elem);

    /* Construct search url */
    var search_url = SEARCH_URL + name.replace(/ /g, '+');

    /* Construct query xpath string */
    var xpath = TRAILER_PATH.replace('XXX', name.toLowerCase());

    /* Construct YQL query url */
    var yql = YQL_QUERY + encodeURIComponent( [' url="',       search_url, '"', 
                                               ' and xpath="', xpath,      '"'].join('') );

    /* Attach click handler */
    icon.addEventListener('click', get_click_handler(icon, yql), false);
}

/* ******************************************************************************** 
 *                                Main looop
 * ********************************************************************************

/* Get movie titles */
var movies = document.evaluate(MOVIES_XPATH, document, null, ONST , null);

/* Attach an clickable icon next to each title */
for (var m = 0; m < movies.snapshotLength; m++) 
{
        var movie = movies.snapshotItem(m);
        // Normalise search string and strip out eventual title in original language at the end
        var name  = normalize_space(movie.textContent).replace(/\(.*?\)\s*$/,'');

        // 3rd argument is true when trailer cannot be automatically identified
        // in this case the user is directed to the search result page
        set_icon(movie, name);
}

