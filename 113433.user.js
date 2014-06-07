// ==UserScript==
// @name ireader
// @namespace ireader
// @description  Enjoy Comfortable Reading
// @version 1.0
// @author colossuspeng
// @include http://bbs.chromi.org/*
// @include http://www.feelcars.com/*
// @include http://www.chinaventure.com.cn/*
// ==/UserScript==
var l = window.location;function $klipme_install(){if(window.MooTools || window.Prototype){alert('Sorry, some JavaScript in the page is not compatible with this Bookmarklet. We will improve this later. Thanks.');return;}var d = document;try {if (!d.body) throw (0);var s = d.createElement('script');s.setAttribute('id', 'klipme_loader');s.setAttribute('type', 'text/javascript');s.setAttribute('charset', 'utf-8');s.setAttribute('src', 'http://www.klip.me/sendtokindle/bookmarklet?key=3bedfa0aecae0ce7&v=2.2.0.189&t=' + (new Date().getTime()));d.body.appendChild(s);} catch (e) {alert('Please wait until the page has loaded.');d.getElementById('klipme_loader').destroy ();}}if (l.host.indexOf('klip.me')>=0 || (l.protocol!='http:' && l.protocol!='https:')) l.href='http://www.klip.me/sendtokindle/options?key=3bedfa0aecae0ce7&v=2.2.0.189&url=' + encodeURIComponent(l.href);else if (document.getElementById('klipme_loader')===null) $klipme_install();else if (typeof window['$klipme_execute'] !== 'undefined') window['$klipme_execute'] ();