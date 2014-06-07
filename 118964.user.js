// ==UserScript==
// @id              com.lespea.google.reader.favicons
// @name            Google Reader - Favicons in entries
// @version         2012.01.03
// @namespace       com.lespea
// @author          Adam Lesperance <lespea@gmail.com>
// @description     For each rss feed entry, the favicon is copied from the google-provided one in the subscription panel
// @match           *://*.google.com/reader/view/*
// @match           *://*.google.ac.th/reader/view/*
// @match           *://*.google.ac/reader/view/*
// @match           *://*.google.ad/reader/view/*
// @match           *://*.google.ae/reader/view/*
// @match           *://*.google.af/reader/view/*
// @match           *://*.google.ag/reader/view/*
// @match           *://*.google.ai/reader/view/*
// @match           *://*.google.al/reader/view/*
// @match           *://*.google.am/reader/view/*
// @match           *://*.google.an/reader/view/*
// @match           *://*.google.ao/reader/view/*
// @match           *://*.google.aq/reader/view/*
// @match           *://*.google.ar/reader/view/*
// @match           *://*.google.as/reader/view/*
// @match           *://*.google.at/reader/view/*
// @match           *://*.google.au/reader/view/*
// @match           *://*.google.aw/reader/view/*
// @match           *://*.google.az/reader/view/*
// @match           *://*.google.ba/reader/view/*
// @match           *://*.google.bb/reader/view/*
// @match           *://*.google.bd/reader/view/*
// @match           *://*.google.be/reader/view/*
// @match           *://*.google.bf/reader/view/*
// @match           *://*.google.bg/reader/view/*
// @match           *://*.google.bh/reader/view/*
// @match           *://*.google.bi/reader/view/*
// @match           *://*.google.bj/reader/view/*
// @match           *://*.google.bm/reader/view/*
// @match           *://*.google.bn/reader/view/*
// @match           *://*.google.bo/reader/view/*
// @match           *://*.google.br/reader/view/*
// @match           *://*.google.bs/reader/view/*
// @match           *://*.google.bt/reader/view/*
// @match           *://*.google.bv/reader/view/*
// @match           *://*.google.bw/reader/view/*
// @match           *://*.google.by/reader/view/*
// @match           *://*.google.bz/reader/view/*
// @match           *://*.google.ca/reader/view/*
// @match           *://*.google.cc/reader/view/*
// @match           *://*.google.cf/reader/view/*
// @match           *://*.google.cg/reader/view/*
// @match           *://*.google.ch/reader/view/*
// @match           *://*.google.ci/reader/view/*
// @match           *://*.google.ck/reader/view/*
// @match           *://*.google.cl/reader/view/*
// @match           *://*.google.cm/reader/view/*
// @match           *://*.google.cn/reader/view/*
// @match           *://*.google.co.cr/reader/view/*
// @match           *://*.google.co.cz/reader/view/*
// @match           *://*.google.co.id/reader/view/*
// @match           *://*.google.co.il/reader/view/*
// @match           *://*.google.co.jp/reader/view/*
// @match           *://*.google.co.kr/reader/view/*
// @match           *://*.google.co.th/reader/view/*
// @match           *://*.google.co.uk/reader/view/*
// @match           *://*.google.co.uk/reader/view/*
// @match           *://*.google.co/reader/view/*
// @match           *://*.google.com.ar/reader/view/*
// @match           *://*.google.com.au/reader/view/*
// @match           *://*.google.com.bo/reader/view/*
// @match           *://*.google.com.br/reader/view/*
// @match           *://*.google.com.cn/reader/view/*
// @match           *://*.google.com.co/reader/view/*
// @match           *://*.google.com.do/reader/view/*
// @match           *://*.google.com.ec/reader/view/*
// @match           *://*.google.com.fr/reader/view/*
// @match           *://*.google.com.hk/reader/view/*
// @match           *://*.google.com.mx/reader/view/*
// @match           *://*.google.com.my/reader/view/*
// @match           *://*.google.com.pa/reader/view/*
// @match           *://*.google.com.pe/reader/view/*
// @match           *://*.google.com.pk/reader/view/*
// @match           *://*.google.com.pl/reader/view/*
// @match           *://*.google.com.py/reader/view/*
// @match           *://*.google.com.sg/reader/view/*
// @match           *://*.google.com.tr/reader/view/*
// @match           *://*.google.com.tw/reader/view/*
// @match           *://*.google.com.ve/reader/view/*
// @match           *://*.google.com.vl/reader/view/*
// @match           *://*.google.com.vn/reader/view/*
// @match           *://*.google.com.vy/reader/view/*
// @match           *://*.google.con.gr/reader/view/*
// @match           *://*.google.cr/reader/view/*
// @match           *://*.google.cs/reader/view/*
// @match           *://*.google.cu/reader/view/*
// @match           *://*.google.cv/reader/view/*
// @match           *://*.google.cx/reader/view/*
// @match           *://*.google.cy/reader/view/*
// @match           *://*.google.cz/reader/view/*
// @match           *://*.google.de/reader/view/*
// @match           *://*.google.dj/reader/view/*
// @match           *://*.google.dk/reader/view/*
// @match           *://*.google.dm/reader/view/*
// @match           *://*.google.do/reader/view/*
// @match           *://*.google.dz/reader/view/*
// @match           *://*.google.ec/reader/view/*
// @match           *://*.google.edu.pk/reader/*
// @match           *://*.google.edu/reader/view/*
// @match           *://*.google.ee/reader/view/*
// @match           *://*.google.eg/reader/view/*
// @match           *://*.google.eh/reader/view/*
// @match           *://*.google.er/reader/view/*
// @match           *://*.google.es/reader/view/*
// @match           *://*.google.et/reader/view/*
// @match           *://*.google.fi/reader/view/*
// @match           *://*.google.fj/reader/view/*
// @match           *://*.google.fk/reader/view/*
// @match           *://*.google.fm/reader/view/*
// @match           *://*.google.fo/reader/view/*
// @match           *://*.google.fr/reader/view/*
// @match           *://*.google.fx/reader/view/*
// @match           *://*.google.ga/reader/view/*
// @match           *://*.google.gb/reader/view/*
// @match           *://*.google.gd/reader/view/*
// @match           *://*.google.ge/reader/view/*
// @match           *://*.google.gf/reader/view/*
// @match           *://*.google.gh/reader/view/*
// @match           *://*.google.gi/reader/view/*
// @match           *://*.google.gl/reader/view/*
// @match           *://*.google.gm/reader/view/*
// @match           *://*.google.gn/reader/view/*
// @match           *://*.google.gob.mx/reader/view/*
// @match           *://*.google.gov.au/reader/view/*
// @match           *://*.google.gov.br/reader/view/*
// @match           *://*.google.gov.co/reader/view/*
// @match           *://*.google.gov.my/reader/view/*
// @match           *://*.google.gov.ph/reader/view/*
// @match           *://*.google.gov.sg/reader/view/*
// @match           *://*.google.gov.tr/reader/view/*
// @match           *://*.google.gov/reader/view/*
// @match           *://*.google.gp/reader/view/*
// @match           *://*.google.gq/reader/view/*
// @match           *://*.google.gr/reader/view/*
// @match           *://*.google.gs/reader/view/*
// @match           *://*.google.gt/reader/view/*
// @match           *://*.google.gu/reader/view/*
// @match           *://*.google.gw/reader/view/*
// @match           *://*.google.gy/reader/view/*
// @match           *://*.google.hk/reader/view/*
// @match           *://*.google.hm/reader/view/*
// @match           *://*.google.hn/reader/view/*
// @match           *://*.google.hr/reader/view/*
// @match           *://*.google.ht/reader/view/*
// @match           *://*.google.hu/reader/view/*
// @match           *://*.google.id/reader/view/*
// @match           *://*.google.ie/reader/view/*
// @match           *://*.google.il/reader/view/*
// @match           *://*.google.in/reader/view/*
// @match           *://*.google.io/reader/view/*
// @match           *://*.google.iq/reader/view/*
// @match           *://*.google.ir/reader/view/*
// @match           *://*.google.is/reader/view/*
// @match           *://*.google.it/reader/view/*
// @match           *://*.google.jm/reader/view/*
// @match           *://*.google.jo/reader/view/*
// @match           *://*.google.jp/reader/view/*
// @match           *://*.google.ke/reader/view/*
// @match           *://*.google.kg/reader/view/*
// @match           *://*.google.kh/reader/view/*
// @match           *://*.google.ki/reader/view/*
// @match           *://*.google.km/reader/view/*
// @match           *://*.google.kn/reader/view/*
// @match           *://*.google.kp/reader/view/*
// @match           *://*.google.kr/reader/view/*
// @match           *://*.google.kw/reader/view/*
// @match           *://*.google.ky/reader/view/*
// @match           *://*.google.kz/reader/view/*
// @match           *://*.google.la/reader/view/*
// @match           *://*.google.lb/reader/view/*
// @match           *://*.google.lc/reader/view/*
// @match           *://*.google.li/reader/view/*
// @match           *://*.google.lk/reader/view/*
// @match           *://*.google.lr/reader/view/*
// @match           *://*.google.ls/reader/view/*
// @match           *://*.google.lt/reader/view/*
// @match           *://*.google.lu/reader/view/*
// @match           *://*.google.lv/reader/view/*
// @match           *://*.google.ly/reader/view/*
// @match           *://*.google.ma/reader/view/*
// @match           *://*.google.mc/reader/view/*
// @match           *://*.google.md/reader/view/*
// @match           *://*.google.mg/reader/view/*
// @match           *://*.google.mh/reader/view/*
// @match           *://*.google.mil/reader/view/*
// @match           *://*.google.mk/reader/view/*
// @match           *://*.google.ml/reader/view/*
// @match           *://*.google.mm/reader/view/*
// @match           *://*.google.mn/reader/view/*
// @match           *://*.google.mo/reader/view/*
// @match           *://*.google.mp/reader/view/*
// @match           *://*.google.mq/reader/view/*
// @match           *://*.google.mr/reader/view/*
// @match           *://*.google.ms/reader/view/*
// @match           *://*.google.mt/reader/view/*
// @match           *://*.google.mu/reader/view/*
// @match           *://*.google.mv/reader/view/*
// @match           *://*.google.mw/reader/view/*
// @match           *://*.google.mx/reader/view/*
// @match           *://*.google.my/reader/view/*
// @match           *://*.google.mz/reader/view/*
// @match           *://*.google.na/reader/view/*
// @match           *://*.google.nc/reader/view/*
// @match           *://*.google.ne/reader/view/*
// @match           *://*.google.net.au/reader/view/*
// @match           *://*.google.net.tr/reader/view/*
// @match           *://*.google.net/reader/view/*
// @match           *://*.google.nf/reader/view/*
// @match           *://*.google.ng/reader/view/*
// @match           *://*.google.ni/reader/view/*
// @match           *://*.google.nl/reader/view/*
// @match           *://*.google.no/reader/view/*
// @match           *://*.google.np/reader/view/*
// @match           *://*.google.nr/reader/view/*
// @match           *://*.google.nt/reader/view/*
// @match           *://*.google.nu/reader/view/*
// @match           *://*.google.nz/reader/view/*
// @match           *://*.google.om/reader/view/*
// @match           *://*.google.org.br/reader/view/*
// @match           *://*.google.org.mx/reader/view/*
// @match           *://*.google.org.tr/reader/view/*
// @match           *://*.google.org.uk/reader/view/*
// @match           *://*.google.org/reader/view/*
// @match           *://*.google.pa/reader/view/*
// @match           *://*.google.pe/reader/view/*
// @match           *://*.google.pf/reader/view/*
// @match           *://*.google.pg/reader/view/*
// @match           *://*.google.ph/reader/view/*
// @match           *://*.google.pk/reader/view/*
// @match           *://*.google.pl/reader/view/*
// @match           *://*.google.pm/reader/view/*
// @match           *://*.google.pn/reader/view/*
// @match           *://*.google.pr/reader/view/*
// @match           *://*.google.pt/reader/view/*
// @match           *://*.google.pw/reader/view/*
// @match           *://*.google.py/reader/view/*
// @match           *://*.google.qa/reader/view/*
// @match           *://*.google.re/reader/view/*
// @match           *://*.google.ro/reader/view/*
// @match           *://*.google.ru/reader/view/*
// @match           *://*.google.rw/reader/view/*
// @match           *://*.google.sa/reader/view/*
// @match           *://*.google.sb/reader/view/*
// @match           *://*.google.sc/reader/view/*
// @match           *://*.google.sd/reader/view/*
// @match           *://*.google.se/reader/view/*
// @match           *://*.google.sg/reader/view/*
// @match           *://*.google.sh/reader/view/*
// @match           *://*.google.si/reader/view/*
// @match           *://*.google.sj/reader/view/*
// @match           *://*.google.sk/reader/view/*
// @match           *://*.google.sl/reader/view/*
// @match           *://*.google.sm/reader/view/*
// @match           *://*.google.sn/reader/view/*
// @match           *://*.google.so/reader/view/*
// @match           *://*.google.sr/reader/view/*
// @match           *://*.google.st/reader/view/*
// @match           *://*.google.su/reader/view/*
// @match           *://*.google.sv/reader/view/*
// @match           *://*.google.sy/reader/view/*
// @match           *://*.google.sz/reader/view/*
// @match           *://*.google.tc/reader/view/*
// @match           *://*.google.td/reader/view/*
// @match           *://*.google.tf/reader/view/*
// @match           *://*.google.tg/reader/view/*
// @match           *://*.google.th/reader/view/*
// @match           *://*.google.tj/reader/view/*
// @match           *://*.google.tk/reader/view/*
// @match           *://*.google.tm/reader/view/*
// @match           *://*.google.tn/reader/view/*
// @match           *://*.google.to/reader/view/*
// @match           *://*.google.tp/reader/view/*
// @match           *://*.google.tr/reader/view/*
// @match           *://*.google.tt/reader/view/*
// @match           *://*.google.tv/reader/view/*
// @match           *://*.google.tw/reader/view/*
// @match           *://*.google.tz/reader/view/*
// @match           *://*.google.ua/reader/view/*
// @match           *://*.google.ug/reader/view/*
// @match           *://*.google.uk/reader/view/*
// @match           *://*.google.um/reader/view/*
// @match           *://*.google.us/reader/view/*
// @match           *://*.google.uy/reader/view/*
// @match           *://*.google.uz/reader/view/*
// @match           *://*.google.va/reader/view/*
// @match           *://*.google.vc/reader/view/*
// @match           *://*.google.ve/reader/view/*
// @match           *://*.google.vg/reader/view/*
// @match           *://*.google.vi/reader/view/*
// @match           *://*.google.vn/reader/view/*
// @match           *://*.google.vu/reader/view/*
// @match           *://*.google.wf/reader/view/*
// @match           *://*.google.ws/reader/view/*
// @match           *://*.google.ye/reader/view/*
// @match           *://*.google.yt/reader/view/*
// @match           *://*.google.yu/reader/view/*
// @match           *://*.google.za/reader/view/*
// @match           *://*.google.zm/reader/view/*
// @match           *://*.google.zr/reader/view/*
// @match           *://*.google.zw/reader/view/*
// @match           *://getfavicon.appspot.com/http*";
// @run-at          document-end
// @priority        -1
// @updateURL       https://userscripts.org/scripts/source/118964.user.js
// ==/UserScript==


// ==ChangeLog==
//
// # 2012.01.03
// ---------------
//  * The fallback method should work everywhere now
//
//
// # 2011.12.08.1
// ---------------
//  * Ensure favicons are the correct size
//
//
// # 2011.12.08
// ---------------
//  * Fall back on google's favicon if getFavicon fails (not as reliable on chrome yet)
//
//
// # 2011.12.07
// ---------------
//  * Use favicons from http://getfavicon.appspot.com/ instead of google's default favicon site
//
//
// # 2011.12.01
// ---------------
//  * Include many more top level domains (man chrome is annoying for not supporting .tld)
//  * Declare "for loop" variable
//
//
// # 2011.11.24.2
// ---------------
//  * Now works on entries list with only one feed (instead of only in the folder view)
//
//
// # 2011.11.24.1
// ---------------
//  * Added updateURL
//
//
// # 2011.11.24
// -------------
//  * Initial release
//
// ==/ChangeLog==




//  For chrome
if (typeof GM_addStyle === 'undefined') {
    var GM_addStyle = function(css) {
        var d = document;
        var s = d.createElement('style');
        var a = d.getElementsByTagName('head')[0] || d.documentElement;
        s.textContent = css;
        a.appendChild(s);
    }
}


if (typeof GM_log === 'undefined') {
    GM_log = function(message) {
        console.log(message);
    }
}




// Globals
const mainClass               = "cust-favicon-div";
const mainSingleClass         = "cust-favicon-div-single";
const mainClassCSS            = "{float: left; width: 16px; height: 16px; margin: 5px 5px 0 0; background-size: 16px 16px !important;x}";
const faviconBaseClass        = "lespea-favicon-num";

const googleFaviconClass      = "favicon";
const googleSubID             = "sub-tree-container";
const googleEntriesID         = "entries";
const googleInsertClass       = "entry-source-title";
const googleInsertParentClass = "entry-main";

const getDomainRegex          = /domain=(.*)&alt/i;
const newFaviconUrlBase       = "https://getfavicon.appspot.com/http://";
const newFaviconUrlEnd        = "?defaulticon=1pxgif";

const cssFixes                = ".samedir #entries.single-source .collapsed ." + mainSingleClass + "{margin-left: 2em !important;}" +
                                ".samedir #entries.single-source .collapsed .entry-secondary{margin-left: 3.5em !important;}" +
                                "." + googleFaviconClass + "{background-size: 16px 16px !important;};";

const verbose_logging         = false;

var classIdFor = {};
var curElement = 0;

var missing_icon;




/**
*   Given an index and a url, create a new style, add it to the dom, and create the class name that
*   uses that style
*/
function makeFaviconFor( className, url ) {
    var css = "." + className + "{background-image: " + url + ";}";
    GM_addStyle(css);
}



/**
*   Gets a new classname for a url
*/
function getNewClassname() {
    return faviconBaseClass + curElement++;
}



/**
*   Given a node that contains the feed name and favicon... save it into the array
*/
function getIconFrom( node ) {
    if (node && node.style) {
        var iconUrl  = node.style.backgroundImage;
        var feedName = document.getElementById( node.id.replace(/icon$/i, "name") ).textContent;
        var className = getNewClassname();
        classIdFor[feedName] = className;

        var go = function(url) {
            if (verbose_logging) GM_log(url);
            makeFaviconFor( className, url );
        }

        var matches = getDomainRegex.exec( iconUrl );
        if (matches) {
            var tmpIconUrl = newFaviconUrlBase + matches[1] + newFaviconUrlEnd;

            try {
                GM_xmlhttpRequest({
                    url: tmpIconUrl,
                    method: "GET",
                    onload: function(response) {
                        if (response.responseText != missing_icon) {
                            tmpIconUrl = "url(" + tmpIconUrl + ")";
                            node.style.backgroundImage = tmpIconUrl;
                            go(tmpIconUrl);
                        }
                        else {
                            go(iconUrl);
                        }
                    },
                    onerror: function(response) {
                        GM_log("An error occurred: " + response.responseHeaders);
                        go(iconUrl);
                    },
                    onabort: function(response) {
                        GM_log("The request aborted: " + response.responseHeaders);
                        go(iconUrl);
                        go(iconUrl);
                    }
                });
            } catch(err) {
                GM_log("Exception caught: " + err);
                go(iconUrl);
            }
        }
    }
}



/**
*   Given a template div, create all of the favicon divs for the feeds that are currently present
*/
function addIcon( rootNode, faviconTemplate ) {
    var entries = rootNode.getElementsByClassName(googleInsertClass);
    var i;
    for (i in entries) {
        var entry = entries[i];
        if (entry.parentNode && entry.parentNode.className == googleInsertParentClass) {
            if (entry.getElementsByClassName(faviconBaseClass).length == 0) {
                var node = faviconTemplate.cloneNode(false);
                var iconClass = classIdFor[entry.textContent];
                if (iconClass) {
                    node.className += " " + iconClass;
                }

                var container = document.getElementById(googleEntriesID);
                var samedir = container.className.indexOf("single-source") != -1;
                if (container && samedir) {
                    node.className += " " + mainSingleClass;
                    entry.parentNode.insertBefore(node, entry);
                }
                else {
                    entry.insertBefore(node, entry.firstChild);
                }
            }
        }
    }
}



/**
*   Function that locates all of the initial favicon pictures, stores them for each subscription,
*   adds all of the necessary classes to the stylesheet, and adds the watcher that is responsible
*   for adding the feeds themselves.
*/
function setupWatcher( subContainer, icons ) {
    GM_log("Found " + icons.length + " favicons");

    GM_xmlhttpRequest({
        url: newFaviconUrlBase + newFaviconUrlEnd,
        method: "GET",
        onload: function(response) {
            missing_icon = response.responseText;
        }
    });

    var icon;
    for (icon in icons) {
        getIconFrom( icons[icon] );
    }

    GM_addStyle("." + mainClass + mainClassCSS);
    GM_addStyle(cssFixes);

    var faviconTemplate = document.createElement('div');
    faviconTemplate.className = mainClass;

    var listener = {
        handleEvent: function (evt) {
            addIcon( evt.target, faviconTemplate );
        }
    }

    document.getElementById(googleEntriesID).addEventListener("DOMNodeInserted", listener, false);
    addIcon(document.getElementById(googleEntriesID));

    GM_log("Finished adding favicons");
}



/**
*   Function that makes sure we're on a page we can process, and if so starts the real main-function
*/
function go() {
    var subContainer = document.getElementById(googleSubID);
    var icons = subContainer.getElementsByClassName(googleFaviconClass);
    if (subContainer && icons.length > 0) {
        setupWatcher( subContainer, icons );
    } else {
        var listener = {
            handleEvent: function (evt) {
                subContainer = document.getElementById(googleSubID)
                icons = subContainer.getElementsByClassName(googleFaviconClass);
                if (subContainer && icons.length > 0) {
                    document.removeEventListener("DOMNodeInserted", listener, false);
                    setupWatcher( subContainer, icons );
                }
            }
        }
        document.addEventListener("DOMNodeInserted", listener, false);
    }
}


go();
