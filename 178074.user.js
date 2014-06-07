// ==UserScript==
// @name           Viadeo | Qui a consulté votre profil ?
// @description    Permets de visualiser le profil des personnes qui ont consulté votre cv
// @include        http://www.viadeo.com/*
// @version        0.4.0
// ==/UserScript==
window.onload = function () {
    setTimeout(function () {
        var aProfils = document.getElementsByClassName("rcss");
        for (var i = 0; i < aProfils.length; i++) {
            var linkA = aProfils[i].getElementsByTagName("a")[0];
            var linkB = aProfils[i].getElementsByTagName("a")[1];
            var image = aProfils[i].getElementsByTagName("img")[0];
            if (image != undefined && !aProfils[i].className.match(/account/)) {
                var m = image.src.match(/memberId=(\w*)/);
                if (m != null && m.length == 2) {
                    linkA.href = "http://www.viadeo.com/profile/" + m[1];
                    linkB.href = "http://www.viadeo.com/profile/" + m[1];
                    image.style.border = "1px solid red";
                }
            }
        }
    }, 3000);
}