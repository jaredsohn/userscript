// --------------------------------------------------------------------------
// ==UserScript==
// @name           Facebook Profil Büyük Resim
// @namespace      http://www.efayazilim.com
// @description    Facebook'da aradığınız kişilerin profil resimlerini büyük olarak gösterir.
// @include        *s.php?ref=search*
// ==/UserScript==
//
// --------------------------------------------------------------------------






function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();
    if (node == null)
        node = document;
    if (tag == null)
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function ChangeImage() {



    var divs = getElementsByClass("image", document.body, "div");



    for (var b = 0; b < divs.length; b++) {

        var images = divs[b].getElementsByTagName('img');



        for (var i = 0; i < images.length; i++) {

            var thisElement = images[i];

            var src = thisElement.getAttribute('src');
            
            if (src.match("http://profile.ak.fbcdn.net/") != null) {

                if (src.indexOf('/s') != -1) {
                    src = src.replace('/s', '/n');

                }
                
                divs[b].setAttribute('style','width:200px');
                
                thisElement.setAttribute('src', src);
            }

        }

    }

}





document.addEventListener("click", ChangeImage, true);