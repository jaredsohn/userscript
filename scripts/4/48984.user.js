// ==UserScript==
// @name          LinkYourViadeoContact
// @author        iguane39
// @namespace     http://iguane39.wordpress.com
// @description   Script to add links to Viadeo Contact on images.
// @include       http://www.viadeo.com/*
// ==/UserScript==

String.prototype.startsWith = function(str) {
    return (this.indexOf(str) == 0);
    };

var viadeoContent = document.getElementById('viadeocontent');
var aTagsList = viadeoContent.getElementsByTagName('a');
if (aTagsList) {
    for (var i = 0; i < aTagsList.length; i++) { 
        var currentLink = aTagsList[i].getAttribute('href');
        if (currentLink.startsWith('/abonnement/abonnement/?message=')) {
            var imgTagList = aTagsList[i].getElementsByTagName('img');
            if (imgTagList.length > 0) {
                var source = imgTagList[0].getAttribute('src');
                var start = source.indexOf('=', 0);
                var stop = source.indexOf('&', 0);
                var viadeoId = source.substring(start+1, stop);
                aTagsList[i].setAttribute('href', ' http://www.viadeo.com/recherche/profil/?memberId=' + viadeoId);
            }
        }
    }
}