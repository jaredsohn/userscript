// ==UserScript==
// @name           MusicMight: Cursor to Search field
// @namespace      musicmight
// @include        http://*.musicmight.com/*
// @include        http://*.rockdetector.com/*
// ==/UserScript==


searchField();

function searchField(){
    var inputElements = null;

    inputElements = document.getElementsByTagName("input");

    //traverse through array of input elements till find search field named "string"
    var field = null;
    for (var i = 0; i < inputElements.length; i++){
        field = inputElements[i];
        if (field.name=='q'){
            field.focus();
            break;
        }
    }
}
