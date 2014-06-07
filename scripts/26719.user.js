// ==UserScript==
// @name           Toodledo + Gmail Addons
// @namespace      CyberCPA
// @description    Adds Toodledo to Gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

/*
 * This script allows you to use Toodledo with GMail Addons.
 * This will provide you access to the Toodledo slim  interface;
 */

GmailAddons.registerAddon(
{
id: 'tdToodledo',
name: 'Toodledo',
url: 'http://www.toodledo.com/slim/',
indicatorLabel: 'Toodledo',
position: 'right'
});