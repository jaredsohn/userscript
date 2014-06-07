// Warbears Attach Signature
// version 0.1 BETA!
// 2008-07-05
// Copyright (c) 2008, Mr
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This userscript always attaches the signature, regardless of setting in the profile
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Warbears Attach Signature
// @namespace     http://www.userscripts.org/user/MrMagical
// @description   Always attaches signature on warbears.com forums
// @include       *warbears.com*
// ==/UserScript==
document.getElementsByName("attach_sig")[0].checked=true;