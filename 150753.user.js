// ==UserScript==
// @name           iHatePaidLinks (IHPL, Anti Adfly v2)
// @namespace      http://*www.softcreatr.de
// @author         Sascha Heldt <sascha@softcreatr.de>
// @description    Skip Paid Link redirects and forward directly to the target page
// @license        Creative Commons Attribution-ShareAlike 3.0
// @version        2.3.9
// @run-at         document-end
// @include        http*://*9.bb/*
// @include        http*://*adcraft.co/*
// @include        http*://*adf.ly/*
// @include        http*://*allanalpass.com/*
// @include        http*://*amy.gs/*
// @include        http*://*any.gs/*
// @include        http*://*awsclic.com/*
// @include        http*://*baberepublic.com/*
// @include        http*://*bat5.com/*
// @include        http*://*byb.me/*
// @include        http*://*celebclk.com/*
// @include        http*://*deb.gs/*
// @include        http*://*drstickyfingers.com/*
// @include        http*://*dyo.gs/*
// @include        http*://*eightteen.com/*
// @include        http*://*fapoff.com/*
// @include        http*://*filesonthe.net/*
// @include        http*://*galleries.bz/*
// @include        http*://*hornywood.tv/*
// @include        http*://*j.gs/*
// @include        http*://*linkbabes.com/*
// @include        http*://*linkbee.com/*
// @include        http*://*linkbucks.com/*
// @include        http*://*linkgalleries.net/*
// @include        http*://*linkseer.net/*
// @include        http*://*lnk.co/*
// @include        http*://*looble.net/*
// @include        http*://*miniurls.co/*
// @include        http*://*peekatmygirlfriend.com/*
// @include        http*://*picbucks.com/*
// @include        http*://*picturesetc.net/*
// @include        http*://*placepictures.com/*
// @include        http*://*poontown.net/*
// @include        http*://*pornyhost.com/*
// @include        http*://*q.gs/*
// @include        http*://*qqc.co/*
// @include        http*://*qvvo.com/*
// @include        http*://*realfiles.net/*
// @include        http*://*rqq.co/*
// @include        http*://*seriousdeals.net/*
// @include        http*://*seriousfiles.com/*
// @include        http*://*seriousurls.com/*
// @include        http*://*sexpalace.gs/*
// @include        http*://*smilinglinks.com/*
// @include        http*://*theseblogs.com/*
// @include        http*://*thesefiles.com/*
// @include        http*://*theseforums.com/*
// @include        http*://*thesegalleries.com/*
// @include        http*://*thosegalleries.com/*
// @include        http*://*tinybucks.net/*
// @include        http*://*tinylinks.co/*
// @include        http*://*tnabucks.com/*
// @include        http*://*tubeviral.com/*
// @include        http*://*u.bb/*
// @include        http*://*uberpicz.com/*
// @include        http*://*ubervidz.com/*
// @include        http*://*ubucks.net/*
// @include        http*://*ugalleries.net/*
// @include        http*://*ultrafiles.net/*
// @include        http*://*urlbeat.net/*
// @include        http*://*urlcash.net/*
// @include        http*://*urlcash.org/*
// @include        http*://*urlpulse.net/*
// @include        http*://*whackyvidz.com/*
// @include        http*://*xxxs.org/*
// @include        http*://*youfap.com/*
// @include        http*://*youfap.me/*
// @include        http*://*yyv.co/*
// @include        http*://*zff.co/*
// @include        http*://*zpag.es/*
// @include        http*://*zxxo.net/*
// ==/UserScript==

// Just too lazy...
var loc = window.location.href.toLowerCase();

// Bypass function
function bypass(go_to) {
    if (go_to) {
        document.title = 'Bypassed!';
        document.getElementsByTagName('html').innerHTML = 'Redirecting to: <a href="' + go_to + '">' + go_to + '</a>';
        document.location.replace(go_to);
    }
}

// Extract function
function extract(lf1, lf2, elm) {
    var a = elm || document.getElementsByTagName('script');
    var b = null;
    var c = 0;

    if (a && lf1 && lf2) {
        for (c; c < a.length; c += 1) {
            if (a[c].text.indexOf(lf1) !== -1) {
                b = a[c].text.split(lf1)[1].split(lf2)[0].replace(/\\/g, '');

                if (b) {
                    bypass(b);
                }
            }
        }
    }

    return false;
}

// Let's go
if (document.getElementById('urlholder')) {
    bypass(document.getElementById('urlholder').value);
}

extract("var url = '", "'");
extract('"href","', '"');
extract('window.location = "', '"');
extract("linkDestUrl = '", "'");
extract("Lbjs.TargetUrl = '", "'");
extract('document.getElementById("link2").href = "', '"');