// TTB Gallery direct image
// Written at Feb, 23 2007
// Copyright (c) 2007, KallAngos

// ==UserScript==
// @name          TTB.Kicks-Ass direct images (inc.multi-page galleries)
// @description   Auto show images in a gallery hosted by ttb.kicks-ass.org
// @include       http://ttb.kicks-ass.org/ttb/pics/EFA/*
// @include       http://ttb.kicks-ass.org/ttb/pics/*
// @include       http://ttb.kicks-ass.org/ttb/*
// @include       http://ttb.kicks-ass.org/ttb/pics/EFA/pages/*
// ==/UserScript==

var arLinks = document.getElementsByTagName('img');

for ( var i=0; i < arLinks.length; i++ ) {
    var elem = arLinks[i];

    if ( elem.src.match( /pages\.ttb\.kicks-ass\.org\/ttb\/pics\/EFA\/pages ) ) {
        elem.src = elem.src.replace( /pages/, 'images' );
    }
}