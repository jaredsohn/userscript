// ==UserScript==
// @name redirect cn.last.fm to www.last.fm
// @version		2009-11-03a
// @description		Replaces "[cn.]last.fm" with "www.last.fm" link
// @author		lanux128
// @contact		http://twitter.com/lanux128
// @licence		GPL (http://www.gnu.org/copyleft/gpl.html)
// @include   http://cn.last.fm/*
//
// ==/UserScript==

var newprefix = "www.";
var mylocation = window.location.href;
var mynewlocation = mylocation.replace(/cn\./g,newprefix);
window.location = mynewlocation;

