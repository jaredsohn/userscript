// ==UserScript==
// @name           adf.ly Killer
// @namespace      adf.ly-killer
// @author         Mohamed Elkholy
// @description    Remove adf.ly waiting time and instantly redirect to the specified url.
// @include        http://adf.ly/*
// @include        http://u.bb/*
// @include        http://9.bb/*
// ==/UserScript==


if(__amscript_cd("adf.ly")){__amscript_wc('iframe { display: none !important;}');};