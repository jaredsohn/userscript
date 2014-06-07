// ==UserScript==

// @name           Hide Tagged Images of Me

// @namespace      htiom@kwierso.com

// @include        http://*.roosterteeth.com/members/

// @include        http://*.roosterteeth.com/members/index.php
// @include        http://roosterteeth.com/members/

// @include        http://roosterteeth.com/members/index.php

// ==/UserScript==



(function() {

    var allB = document.getElementsByTagName("b");

    for(i in allB) {

        try {

        if(allB[i].innerHTML == "Tagged Images of Me") {

            var tiom = allB[i];

        }

        } catch(e) {}

    }

    

    if(tiom) {

        tiom.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';

    }



}());