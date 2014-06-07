// ==UserScript==
// @name        Coursera Enhancer
// @namespace   Coursera Enhancer
// @include     https://nus.coursera.org/*
// @version     1.0
// @grant       none
// ==/UserScript==


/************************************************************** 
                      Coursera Enhancer v1.0
Coursera enhancer, a script brought to you by Adriel!
This script aims to improve your experience using coursera
***************************************************************/

function loader(){
    if(document.getElementsByClassName('course-topbar-logo')[0]){
        document.getElementsByClassName('course-topbar-logo')[0].href="https://nus.coursera.org/";
    }
    else
        setTimeout(function(){loader()},100);
}

setTimeout(function(){loader()},100);