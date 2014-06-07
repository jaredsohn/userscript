// ==UserScript==
// @name        TwitterUserProfileExtension
// @namespace   http://mstssk.blogspot.com/
// @description Extends Twitter user profile infomation.
// @include     *://twitter.com/*
// ==/UserScript==

function makeATagString (servicename, serviceBaseUrl, username, faviconUrl, internal_username) {
    return "<a href=\""+serviceBaseUrl+(internal_username||username)+"\" ><img width=\"16px\"src=\""+faviconUrl+"\" style=\"vertical-align:middle\" />"+username+"'s "+servicename+"</a>";
}

var d = document;
var favotterIcon = 'data:image/gif;base64,R0lGODlhEAAQAMZIAD3XBUrZFUvbClDYIVXbJVbeGVbhEFviEWDeK2bcPV/iHV/kFGHjH2LiJ2jjL2zpFnHoIXDpHXDpHnfqJ3frJ4XsOITvJontOovtQozvNI3wM5LvR5HyLZXvSJbuVJ/phpv0M53yRp30Op7zSKPwaajxdqr4QrHvk636Prf8QLf8Qrj8Qb3zmsX0osH9V8T1oMX1o8jztcnzucvzu8n2ps30vNL1wtP2wdv21+D41+D42eH42eH42uD51OH51OT52+776PH78PL78fj9+Pr9+/z+/f7+/v/+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAH8ALAAAAAAQABAAAAeQgH+CgkiFhoaDg0hGh4aMiYtFMzQtMDAvLENIikZEJC4qKaIpKzebhEglKCYgISOvHUKnf0hHGSIcOLVHR4uzSEEWGhU/Pj49QIWQOhAeGxfQFxg2yoQ8BxQTERLcDyfVtDoLCg01Mecyi5A7BgwOjeC0PAIFCI2JhDkAAQTx+LUJBnzwB4lRoUf4IB1KKCgQADs=';
var servicesLinks = d.createElement("li");
d.getElementsByClassName("about vcard entry-author")[0].appendChild(servicesLinks);
var username=location.href.match(/https?\:\/\/twitter\.com\/(?!follow(?:ers|ing)[^a-zA-Z0-9_]*)([a-zA-Z0-9_]+)/)[1];
if (username != "") {
    var htmlstr = makeATagString("favotter", "http://favotter.net/user/", username, favotterIcon);
    htmlstr += "<br />" + makeATagString("TwitPic", "http://twitpic.com/photos/", username, "http://twitpic.com/favicon.ico");
    htmlstr += "<br />" + makeATagString("Twitgoo", "http://twitgoo.com/u/", username, "http://twitgoo.com/images/favicon.png");
    htmlstr += "<br />" + makeATagString("携帯百景", "http://movapic.com/", username, "http://assets.movapic.com/image/parts/favicon.gif",username.replace(/_/g,''));
    htmlstr += "<br />" + makeATagString("Favstar", "http://favstar.fm/users/", username, "http://favstar.fm/favicon.ico");
    htmlstr += "<br />" + makeATagString("yflog", "http://yfrog.com/froggy.php?username=", username, "http://yfrog.com/favicon.ico");
    htmlstr += "<br />" + makeATagString("twistar", "http://twistar.cc/", username, "http://twistar.cc/ts.png");
    htmlstr += "<br />" + makeATagString("twilog", "http://twilog.org/", username, "http://img.twi-log.com/image-dir/favicon.ico");
    servicesLinks.innerHTML += htmlstr;
}

// Profile location
var locationProfile = d.getElementById("profile").getElementsByClassName("adr")[0];
if (locationProfile == null) return;
var iPhoneGeoLocation = locationProfile.textContent.replace(" ", "").match(/^iphone\:(-?\d+\.\d+,-?\d+\.\d+)$/i);
var locationText = "";
if(iPhoneGeoLocation==null){
    locationText = locationProfile.textContent;
}else{
    locationText = iPhoneGeoLocation[1];
}
locationProfile.innerHTML += "<a href=\"http://maps.google.com/maps?q="+locationText+"\" ><img width=\"16px\"src=\"http://www.gstatic.com/mgc/images/icons/32x32/maps.png\" title=\"Google Map\" alter=\"Google Map\" style=\"vertical-align:middle\" /></a>";