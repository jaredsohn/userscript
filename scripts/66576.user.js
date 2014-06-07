// ==UserScript==
// @name           Flickr — Display Decluttr
// @namespace      http://userscripts.org/users/123116
// @description    Displays decluttr link on a photo page
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// @version        1.0
// @copyright      2010, Christian Stangier
// ==/UserScript==

var decluttr_url = "&lt;a href=\"http://decluttr.com/"+ page_photo_id + "\" rel=\"nofollow\"&gt;decluttr&lt;/a&gt;";

if (page_photo_id != null) {
    var newDiv = document.createElement('div');
    newDiv.id = 'decluttr_url';
    newDiv.innerHTML = '<h4>decluttr</h4>' + decluttr_url;
    var sib = document.getElementsByClassName('PeopleTagList')[0];
    sib.parentNode.insertBefore(newDiv,sib);
    newDiv.addEventListener('click',selectLink,false);
}

function selectLink () {
    var p=document.getElementById("decluttr_url");
    var el=p.childNodes[1];
    var s=window.getSelection();
    var r=document.createRange();
    r.selectNodeContents(el);
    s.removeAllRanges();
    s.addRange(r);
}
