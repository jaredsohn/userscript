// ==UserScript==
// @name           Wordnik.com Rearrange
// @namespace      
// @description    Moves Etymologies section up before Flickr section
// @include        http://www.wordnik.com
// ==/UserScript==


$('#etymologies').insertBefore('#flickr');
