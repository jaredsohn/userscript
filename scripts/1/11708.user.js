// Alternate Styles
// version 1.0
// 
// Last Updated: June 2007
// Released to the public domain.
//
// ==UserScript==
// @name          Last.fm Minus Ads/etc
// @description   Hides the horrible Ads! Etc
// @include       http*://*last.fm/*
// ==/UserScript==

(function () { //EDIT ME
	var newstyle = "tr.subject span {margin-right:0px;} table.barChart td.quantifier div span {margin-left:5px; padding-left: 0px; padding-right: 9px;} table tbody tr.quantifier {padding-left:-5px;} #otherStations li a span, #firstRadioStation ul li a span {font-family:verdana; font-size:11px; text-decoration:none;} .subhead {font-family:tahoma; font-size:10px; color:8A8E8D; text-align:left; bottom-margin:-5px; padding-bottom:-5px;} #LastContent3 div h3,#LastContent3 div h3 a{font-family:tahoma; font-size:12px; color:FF0000;letter-spacing:3px; text-align:left; padding-bottom:-5px; bottom-margin:-5px;} #otherStations,#firstRadioStation, playlist {margin-left:25px;} table.recentList tr.justlistened td, table.recentList tr.justlistened td a {background-color: #E8E7E8;color: #545454;} h3 span {display:none;} #LastHeadline h1 {color:white; text-decoration:none; letter-spacing:7px; z-index:20; font-size:20px; font-family:Times; text-align:left; padding-right:0px; margin-right:0px;} #headerBottom li {border-right: 1px solid #DE586A;} #headerBottom a {color: #DE586A;} #headerBottom a:hover {color:F5B5B5;} dl.dropDown, dl.dropDown dt a, .withDropDown a {display:none;} #headerBottom li#uploadmusic {display:none;} #headerSearchbox input.sbox { background: url('http://i106.photobucket.com/albums/m264/michaelcox68/last-fm/search.gif') center left no-repeat transparent; color:white; height: 13px; width: 156px; padding: 5px 4px 2px 16px; margin: 0px 0 0 10px; font-size: 11px; float: left; border: solid 1px transparent; border-right:solid 1px #DA546A;} #LastAd_Top {display:none;}  #LastAd_Mid  {display:none;} >"; //END EDIT ME

	var ss = document.createElement("style"); var t = document.createTextNode(newstyle); 
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]); ss.appendChild(t); root.appendChild(ss); })();




