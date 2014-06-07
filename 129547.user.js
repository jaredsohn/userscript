// ==UserScript==
// @name           FSFE Affiliate Programs + extras (auto-SSL...)
// @namespace      https://blogs.fsfe.org/h2/userscripts/
// @description    Modify Amazon and Libri.de-links to support FSFE, always use SSL and shorten links (only Amazon)

// Contains the getASIN()-function from:
// http://userscripts.org/scripts/review/3284 by Jim Biancolo

// @version        0.3
// @include       *
// @license       CC0 / Public Domain
// see http://creativecommons.org/publicdomain/zero/1.0/

// @author Hannes Hauswedell
// @homepage https://blogs.fsfe.org/h2/userscripts/
// ==/UserScript==



function getASIN(href) {
    var asinMatch;
    asinMatch = href.match(/\/exec\/obidos\/ASIN\/(\w{10})/i);
    if (!asinMatch) { asinMatch = href.match(/\/gp\/product\/(\w{10})/i); }
    if (!asinMatch) { asinMatch = href.match(/\/exec\/obidos\/tg\/detail\/\-\/(\w{10})/i); }
    if (!asinMatch) { asinMatch = href.match(/\/dp\/(\w{10})/i); }
    if (!asinMatch) { return null; }
    return asinMatch[1];
}

(function()
{
    var links = document.getElementsByTagName("a");

    for (i = 0; i < links.length; i++) 
    {
        var curLink = links[i].href;

        // AMAZON
        if (curLink.match(/https?\:\/\/(www\.)?amazon\./i))
        {
            var affiliateID = '';
            var host = '';
            if (curLink.match(/amazon\.de/i))
            {
                host = 'amazon.de';
                affiliateID = 'fsfe-21';
            }
            else if (curLink.match(/amazon\.co\.uk/i))
            {
                host = 'amazon.co.uk';
                affiliateID = 'fsfe05-21';
            }
            else if (curLink.match(/amazon\.ca/i))
            {
                host = 'amazon.ca';
                affiliateID = 'fsfe-20';
            }
            else if (curLink.match(/amazon\.fr/i))
            {
                host = 'amazon.fr';
                affiliateID = 'fsfeurope-21';
            }
            else if (curLink.match(/amazon\.com/i))
            {
                host = 'amazon.com';
                affiliateID = 'freesoftfoune-20';
            }

            var asin = getASIN(curLink);
            if (affiliateID != '')
            {
                if (asin != null)
                    links[i].setAttribute("href", "https://www."+host+"/dp/" + asin + "/?tag="+affiliateID);
//                 else
//                     links[i].setAttribute("href", curLink + "?tag="+affiliateID);
            }
        }

        // libri.de / bookzilla
        else if (curLink.match(/https?\:\/\/(www\.)?libri\.de/i))
        {
            links[i].setAttribute("href", curLink.replace(/https?\:\/\/(www\.)?libri\.de/i,
                                  "https://www.bookzilla.de"));
        }
    }
})();

