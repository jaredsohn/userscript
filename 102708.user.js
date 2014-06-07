// ==UserScript==
// @name            Support of listagram
// @namespace       http://userscripts.org/users/290001
// @description     画像をマウスオーバーで画像拡大
// @include         http://listagr.am/*
// @exclude         
// @version         0.0.2.beta
// ==/UserScript==

(function () {

    var styleHTML = "<style type='text/css'><!-- .wrapper { position:relative; } ul li a .mainImage { display: none; } ul li a:hover .mainImage {  display: block;  position: fixed; top: 210px;  right: 50px; } --></style>";
    
    var headNode = document.getElementsByTagName('head')[0]
    var headHTML =  headNode.innerHTML + styleHTML;
    headNode.innerHTML = headHTML;

	var imgNum = document.getElementsByTagName('img').length;
    for (var i=0; i < imgNum; i++){
        var preloadNode = document.getElementsByClassName('preload')[i];
        var aNode = preloadNode.parentNode;
        var href = preloadNode.src.replace("_5.jpg","_6.jpg");
        aNode.innerHTML = "<span class='thumbnail'>" + aNode.innerHTML + "</span><span class='mainImage'><img src='" + href + "'></span>";
    }

})();

