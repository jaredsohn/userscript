// ==UserScript==
// @name           Remember The Milk + Gmail Addons
// @namespace      CyberCPA
// @description    Adds Remember The Milk to Gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

/*
 * This script allows you to use RTM with GMail Addons.
 * This will provide you access to the RTM iGoogle Gadget interface to 
   RTM; you can login to RTM from this as well.
 * You then don't have to use the RTM Extension.
 */

GmailAddons.registerAddon(
{
id: 'tdRTM',
name: 'Remember The Milk',
url: 'http://www.rememberthemilk.com/services/modules/googleig/',
indicatorLabel: 'RTM'
});