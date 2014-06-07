// ==UserScript==
// @id             tistory_image
// @name           tistory_image
// @version        0.1
// @namespace      
// @author         hg
// @description    tistory original image 
// @include        *tistory.com/image/*
// @run-at         document-end
// ==/UserScript==
var oldLocation = window.location.href;
var newLocation = oldLocation.replace("image", "original");
window.location.replace(newLocation);
