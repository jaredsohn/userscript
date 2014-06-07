// ==UserScript==
// @name           mu-friend feed change
// @namespace      www.erepublik.com
// @description    repair mu - friend feed
// @version        0.1
// @include        http://www.erepublik.com/*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// @require        http://json-template.googlecode.com/files/json-template.js

// ==/UserScript==
$(document).ready(function () {



$('a[trigger=get_citizen_feeds]').click(function(){
  unsafeWindow.get_citizen_feeds();

});



if($('li[id=show_friends_feed]').attr('class') != "active"){

 $('a[trigger=get_citizen_feeds]').trigger('click');

}

});