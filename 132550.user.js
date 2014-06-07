// ==UserScript==
// @name       VijmeDe Avoid Like
// @namespace  http://vijmede.com/
// @require    http://vijmede.com/wp-content/themes/WPTube4/scripts/jquery.min.js
// @version    0.2
// @description  Little scriptie to avoid the like button and load the vid directly! (also make it larger)
// @match      http://vijmede.com/*
// @copyright  2012+, martixy
// ==/UserScript==

var sizeMultiplier = 1.6;

$('#likeMe').remove();
$('#theVideo')
    .css('display','inline')
    .children()
    .first()
    .attr('height',function(i, val){return val * sizeMultiplier})
    .attr('width',function(i, val){return val * sizeMultiplier});