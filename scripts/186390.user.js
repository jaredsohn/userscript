// ==UserScript==
// @name        Remove AdviceAnimals troll element
// @namespace   http://userscripts.org/users/399688
// @include     http*://*reddit.com/r/AdviceAnimals/*
// @version     1.1
// @grant       none
// ==/UserScript==

// Delete the troll background image
$('head').append("<style>.title:before, .titlebox:before, .side:before, .content:before, .title:after, .titlebox:after, .side:after, .content:after { background: url('') }</style>");

//Reddit troll element
//https://s3.amazonaws.com/d.thumbs.redditmedia.com/zWbNHVDeFd_OxwWi.png
//Maybe simply making it inaccessible using a smart proxy e.g FoxyProxy could also do the trick

$('head').append("<style>.side h4 { background: url('') }</style>");