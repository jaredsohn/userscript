// ==UserScript==
// @name          Kaskus Quick Reply
// @namespace     http://userscripts.org/scripts/show/80409
// @include       http://*.kaskus.us/showthread.php*
// @version       101017207
// @vversion      v2.7
// @description   provide a quick reply feature, under circumstances capcay required.
// @author        bimatampan
// @moded         idx (http://userscripts.org/users/idx)
// @license       (CC) by-nc-sa 3.0
// 
// Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.ms
// --------------------------------------------------------------------
// 
// v2.7 - 2010-10-16
//  Add YOUTUBE wrapper
//  Add Preview Quick Reply
// 
// v2.6 - 2010-10-12
//  Fix Parsing smiley custom.. [non-alphanumeric regex]
// 
//
// 
// version 0.1 - 2010-06-29
// Init
//------ 
//
// ==/UserScript==
//
// 
(function () {

// Initialize Global Variables
var gvar=function() {}

gvar.sversion = 'v' + '2.7';
gvar.codename = 'KQR';

gvar.__DEBUG__ = false; // development debug

const OPTIONS_BOX = {
  KEY_SAVE_SAVED_AVATAR:  ['']
 ,KEY_SAVE_LAST_FONT:     [''] // last used font
 ,KEY_SAVE_LAST_COLOR:    ['Black'] // last used color
 ,KEY_SAVE_LAST_SIZE:     [''] // last used size
 
