// ==UserScript==
// @name		Lockerz unPLAY'd
// @description		Hide all watched videos in PLAY
// @include		http*//www.lockerz.com/watch
// @include		http*//www.lockerz.com/p/*
// @version		0.1.1
// @copyright	JaCo1776

// ==/UserScript==

Psuedocode:
while (user has watched video)
    check to see if user has watched it 3 times or more
        If (# of times watched >= 3)
            Move to next clip and hide current one
        else ()
            Replay clip, and automatically begin its playing