// Created by: Morac
// ==UserScript==
// @name            Yahoo Groups Sponsored Links Remover
// @namespace       http://anonymous123.home.comcast.net/yg-sponsor.user.js
// @description     Removes Yahoo Sponsored Links from Yahoo Groups
// @include         http://*groups.yahoo.com/*
// ==/UserScript==
	
(function() {

        els = document.getElementsByTagName( "td" );
        var i;
        for( i = 0 ; i < els.length ; i ++ )
        {
                if( els[i].className.indexOf("ygrp-ad") > -1 )
                {
                        els[i].style.display = "none";
                }
        }
	
})();