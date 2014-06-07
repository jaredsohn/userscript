// ==UserScript==
// @name           MySpace Profile to Send Message
// @description    Redirects you to Send Message When Viewing a MySpace Profile
// @include        http://profile.myspace.com*
// @include        http://mysapce.com/*
// ==/UserScript==

window.location = 'http://messaging.myspace.com/index.cfm?fuseaction=mail.message&friendID=*';