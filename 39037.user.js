// ==UserScript==
// @name         Twitter Refresh
// @namespace    http://userscripts.org/users/35001
// @description  Twitter Refresh.
// @include      http://twitter.com/*
// @include      https://twitter.com/*
// @author       Hannibal Smith.
// ==/UserScript==

// Copyright (c) 2008, Hannibal Smith
// Released under the BSD license.
// http://www.opensource.org/licenses/bsd-license.php

var fresh_delay = 240; // seconds 

setInterval( function() {
             status = document.getElementById( "status" );
             if ( status && status.value == "" )  
                            location.href = location.href;
             }, fresh_delay * 1000 );
