// ==UserScript==

// @name           CockBlocker

// @namespace      diggRTBarRemover@gmail.com

// @description    Removes DiggBar and RT's Cockbar

// @include        http://digg.com/*

// @include        http://roosterteeth.com/*

// ==/UserScript==



    var iframe = document.getElementsByTagName('iframe');



    for(i in iframe) {

        if( iframe[i].name == 'diggiFrame' || iframe[i].id == "fr")

            window.location.href = iframe[i].src;

    }