// ==UserScript==
// @name           Linked Iframe & Frameset Buster
// @namespace      http://code.chimericdream.com/
// @description    Detects whether you are in a linked iframe (such as a Digg bar or on Linkive), and breaks out of it. Also detects whether you are on a landing page which simply links to a full article (such as DevSnippets or DZone)
// @require        http://code.chimericdream.com/GmScripts/GM-AutoUpdate.php?id=56828
// @include        http://*.dzone.com/*
// @include        http://dzone.com/*
// @include        http://*.linkive.com/*
// @include        http://*.digg.com/*
// @include        http://digg.com/*
// @include        http://photoshoplady.com/*
// @include        http://*.photoshoplady.com/*
// @include        http://tutorialmagazine.com/*
// @include        http://*.tutorialmagazine.com/*
// @include        http://bigresource.com/*
// @include        http://*.bigresource.com/*
// @include        http://*.devsnippets.com/*
// @include        http://devsnippets.com/*
// @include        http://tutorialized.com/*
// @include        http://*.tutorialized.com/*
// @include        http://ht.ly/*
// @include        http://ow.ly/*
// @include        http://*.stumbleupon.com/*
// @include        http://design-newz.com/*
// @include        http://zergnet.com/*
// @include        http://*.zergnet.com/*
// ==/UserScript==

(function(d){
    var dzre  = /dzone\.com/i;            // DZone
    var dsre  = /devsnippets\.com/i;      // DevSnippets
    var sure  = /stumbleupon\.com/i;      // StumbleUpon.com
    var lire  = /linkive\.com/i;          // Linkive
    var dgre  = /digg\.com/i;             // Digg
    var plre  = /photoshoplady\.com/i;    // PhotoshopLady
    var tmre  = /tutorialmagazine\.com/i; // TutorialMagazine
    var brre  = /bigresource\.com/i;      // BigResource
    var tutre = /tutorialized\.com/i;     // Tutorialized
    var owlre = /ow\.ly/i;                // Ow.ly
    var htre  = /ht\.ly/i;                // Ht.ly
    var dnre  = /design-newz\.com/i       // Design Newz
    var zgre  = /zergnet\.com/i           // Zergnet
    
    var site = '';
    if (dzre.exec(window.location) !== null) {
        site = 'dzone';
    } else if (lire.exec(window.location) !== null) {
        site = 'linkive';
    } else if (dgre.exec(window.location) !== null) {
        site = 'digg';
    } else if (dsre.exec(window.location) !== null) {
        site = 'dvsnip';
    } else if (plre.exec(window.location) !== null) {
        site = 'pslady';
    } else if (tmre.exec(window.location) !== null) {
        site = 'tutmag';
    } else if (brre.exec(window.location) !== null) {
        site = 'bigres';
    } else if (tutre.exec(window.location) !== null) {
        site = 'tutorialized';
    } else if (owlre.exec(window.location) !== null) {
        site = 'owly';
    } else if (htre.exec(window.location) !== null) {
        site = 'hootly';
    } else if (sure.exec(window.location) !== null) {
        site = 'stumbleupon';
    } else if (dnre.exec(window.location) !== null) {
	    site = 'designnewz';
    } else if (zgre.exec(window.location) !== null) {
        site = 'zergnet';
    }

    switch (site) {
        case 'dzone':
            // DZone
            var dz1 = document.getElementById('linkDetails');
            var dz2 = getElementsByClassName('ldDescription', dz1);
            var dz3 = getElementsByClassName('ldTitle', dz2);
            if (dz1 && dz2 && dz3) {
                var dzlink = dz3[0].childNodes[0];
                if (dzlink) {
                    window.location = dzlink;
                }
            }
            break;

        case 'linkive':
            // Old Linkive
            // Left in for backwards compatibility
            var iframe = document.getElementById('linkive-iframe');
            if (iframe !== null) {
                window.location = iframe.src;
            }

            // New Linkive
            var iframe = document.getElementById('browser-iframe');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            break;
    
        case 'digg':
            // Digg
            var iframe = document.getElementById('diggiFrame');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            break;
    
        case 'tutmag':
            // TutorialMagazine.com
            var iframe = document.getElementById('mainFrame');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            break;

        case 'pslady':
            // PhotoshopLady.com
            var iframe = document.getElementById('mainFrame');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            var tutLink = document.getElementById('bigImage');
            if (tutLink !== null) {
                window.location = tutLink.href;
            }
            break;
        
        case 'bigres':
            // BigResource.com
            if (typeof document.getElementsByName('t')[0] !== 'undefined') {
                window.location = document.getElementsByName('t')[0].src;
            }
            break;
            
        case 'dvsnip':
            // DevSnippets.com
            var ds1 = document.getElementById('links');
            var ds2 = getElementsByClassName('recent-leads');
            var ds3 = getElementsByClassName('post-title');
            if (ds1 && ds2 && ds3) {
                var ltext = ds3[0].innerHTML;
                var re = /href=\"([^\"]*)\" title=\"/igm;
                var result = re.exec(ltext);
                if (result) {
                    window.location = result[1];
                }
            }
            break;

        case 'tutorialized':
            // Tutorialized.com
            if (typeof document.getElementsByName('tutorial')[0] !== 'undefined') {
                window.location = document.getElementsByName('tutorial')[0].src;
            }
            break;
            
        case 'owly':
        case 'hootly':
            // Ow.ly, Ht.ly (HootSuite's URL shorteners)
            var iframe = document.getElementById('hootFrame');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            break;

        case 'stumbleupon':
            var iframe = document.getElementById('stumbleFrame');
            if (iframe !== null) {
                window.location = iframe.src;
            }
            break;

        case 'designnewz':
            var container = document.getElementById('container');
            var post = container.getElementsByClassName('postsinglelink');
            var children = post[0].childNodes;
            for (var i = 0; i < children.length; i++) {
	            if (children[i].tagName == 'H2') {
					var link = children[i].childNodes[0].childNodes[0];
					if (link.href) {
						window.location = link.href;
					}
                }
            }
            break;

        case 'zergnet':
            // Zergnet
            var zg1 = document.getElementById('container');
            var zg2 = getElementsByClassName('featured', zg1);
            if (zg1 && zg2) {
                var zglink = zg2[0].childNodes[1].childNodes[1];
                if (zglink) {
                    window.location = zglink;
                }
            }
            break;
    }

    function getElementsByClassName(classname)  {
        node = document.getElementsByTagName("body")[0];
        var a = [];
        var re = new RegExp('\\b' + classname + '\\b');
        var els = node.getElementsByTagName("*");
        var j = els.length;
        for (var i = 0; i < j; i++) {
            if (re.test(els[i].className)) {
                a.push(els[i]);
            }
        }
        return a;
    }
}(document));