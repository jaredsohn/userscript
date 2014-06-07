// ==UserScript==
// @name           Blocket minus mötesplatsen
// @namespace      www.shuffled.net/code/ssb
// @include        http://www.blocket.se/*
// ==/UserScript==

(function doIt() {
    var foo, i;
    //if you want to remove more ads, try adding these: .searchbox_mini, #banner_index_top, 
    //but at the moment the region picker for southern sweden will not work if we remove them.
    foo = document.getElementById('motesplatsen_top');
    if (foo) {foo.parentNode.removeChild(foo);}

    foo = document.getElementById('banner_list_top');
    if (foo) {foo.parentNode.removeChild(foo);}

    foo = document.querySelectorAll('.motesplatsen');
    if (foo.length){
        for (i=0; i< foo.length; i++){
            foo[i].parentNode.removeChild(foo[i]);
            //foo[i].style.visibility="hidden";
        }
    }
}());