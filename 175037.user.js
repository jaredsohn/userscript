// ==UserScript==
// @name           Feedly Auto Refresh
// @description    Auto Refresh feedly every 15 minutes.
// @version        1.0
// @date           2013-08-04
// @author         Boltex
// @include     http://cloud.feedly.com/*
// @include     http://*.cloud.feedly.com/*
// ==/UserScript==
setTimeout("window.location.reload(true)", 15 * 60 * 1000);