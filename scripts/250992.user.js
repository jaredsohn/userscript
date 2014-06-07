// ==UserScript==
// @name        Teamliquid auto popout
// @namespace   tl_auto_popout_stream
// @include     http://www.teamliquid.net/video/streams/*
// @exclude     http://www.teamliquid.net/video/streams/*/popout
// @description If you watch a stream on teamliquid.net then this script will automatically switch you to the popout view.
// @author      Starfox
// @date        09.01.2014
// @version     1
// @grant       none
// ==/UserScript==

location.href = location.href+"/popout";