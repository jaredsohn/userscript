// ==UserScript==
// @name SU V5 Custom_modtheme_f1_test2 
// @version 1.05.02
// @namespace http://www.justmyimagination.com
// @description A bit of customization for the V5
// @include        http://*.stumbleupon.com/stumbler/*
// @include        http://*.stumbleupon.com/stumbler/*/*
// @include        http://*.stumbleupon.com/home/*
// @copyright © JustMyImagination 2013
// ==/UserScript==

var headID = document.getElementsByTagName("head")[0];
var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML ='.l-content-primary-wrap {background: #282828;} .page-title {font-size: 25px; line-height: 40px; text-align: center; color: #A7A9AC; text-shadow: none;} .nav-filter-wrapper {border: 0px solid blue; padding-top: 15px; overflow: auto; text-align: center; clear: both; border-top: 0px solid #fefefe;} .nav-filter-nav-link { border: 0px solid red; margin: 0 20px 0; padding-bottom: 4px; display: block; font-size: 18px; font-family: maiandra gd; color: #BBBBBB; text-shadow: none;} .tile {font-family: "Helvetica Neue", Arial, sans-serif; color: #6d6e71; box-shadow: 0 0 6px rgba(0, 0, 0, 0.1), 0px 0px 10px rgba(0, 0, 0, 01) inset; border-radius: 15px;} .topic-bar,.tile-url-topic {padding: 0px 10px 0px 15px; border-radius: 156px 12px 156px 12px; box-shadow: 01px 01px 06px 0px gray;} .gsfn-widget-tab {opacity: 0; z-index: -100000;}'; 
headID.appendChild(cssNode);