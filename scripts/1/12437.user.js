
// ==UserScript==
// @name            OGame Remove GF Spam (Commander & Officer)
// @namespace       http://aft.cedricpc.net/
// @author          cedricpc
// @description     Remove Commander and Officer icons in all page, links in menu and banner in overview.
// @include         http://*ogame*/game/*
// ==/UserScript==
// @version         1.2
// @modify          Tuesday 18 September 2007 @ 13:50

// For OGame version 0.77
// OperaGame isn't needed.

var RegEx  = /http:\/\/.*?ogame.*?\/game\/.*?/i;
var Result = RegEx.exec(document.location);
if (Result != null) {
    function OGame_RemoveGFSpam() {
        var RegExSpamLink = /page=micropayment(?=&|$)/i;
        var RegExSpamImg  = /game\/img\/.*?_ikon.*?\.gif/i;
        var RegExDarkM    = /img\/dm_klein_2\.jpg/i;

        var links          = document.getElementsByTagName('a');
        for (i = 0, link = ''; link = links[i]; i++) {
            if ((link.getAttribute('href')) && (link.getAttribute('href').match(RegExSpamLink))) {
                if (link.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'td') {
                    var IconsSpam   = link.parentNode.parentNode.parentNode.parentNode;
                }
                else if (link.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'div') {
                    var MenuSpam    = link.parentNode.parentNode;
                }
            }
        }
        var imgs           = document.getElementsByTagName('img');
        for (i = 0, img = ''; img = imgs[i]; i++) {
            if ((img.getAttribute('src')) && (img.getAttribute('src').match(RegExDarkM))) {
                if (img.parentNode.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'table') {
                    var DarkMatiere = img.parentNode.parentNode.parentNode;
                }
            }
            else if ((img.getAttribute('src')) && (img.getAttribute('src').match(RegExSpamImg))) {
                if (img.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'table') {
                    var IconsSpam   = img.parentNode.parentNode.parentNode.parentNode.parentNode;
                    break;
                }
            }
        }

        if (IconsSpam) { IconsSpam.parentNode.removeChild(IconsSpam); }
        if (MenuSpam) { MenuSpam.parentNode.removeChild(MenuSpam); }
        if (DarkMatiere) {
            DarkMatiere.childNodes[0].removeChild(DarkMatiere.childNodes[0].childNodes[3]);
            DarkMatiere.childNodes[1].removeChild(DarkMatiere.childNodes[1].childNodes[3]);
            DarkMatiere.childNodes[2].removeChild(DarkMatiere.childNodes[2].childNodes[3]);
        }
    }

    OGame_RemoveGFSpam();

    if (self.opera) {
        opera.addEventListener('BeforeScript', OGame_RemoveGFSpam, false);
    }
}