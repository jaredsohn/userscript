// ==UserScript==
// @name           Google Logo Replacer
// @namespace      Jos van Nijnatten
// @description    Verandert de Google logo
// @include        http://www.google.*/
// @include        http://www.google.*/webhp*
// @include        http://images.google.*/
// @include        http://images.google.*/images*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var url = "http://photos-d.ak.fbcdn.net/hphotos-ak-snc1/hs270.snc1/9717_148727390786_669895786_2620235_6073924_n.jpg";
alert("halo");
    $(document).ready(function(){
    alert('halo');
        $jQuery("#logo").css(background: transparent url('http://photos-d.ak.fbcdn.net/hphotos-ak-snc1/hs270.snc1/9717_148727390786_669895786_2620235_6073924_n.jpg) no-repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; height: 110px; width: 276px;');
});
