// ==UserScript==
// @name       Youtube Ad Remover
// @namespace  http://bensoft.de/
// @version    1.0
// @description  Removes the ads on Youtube
// @match      http://*youtube.com/*
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// @copyright  2012+, bensoft.de
// ==/UserScript==
$('#ad_creative_iframe_1').remove();
$('#watch-channel-brand-div').remove();