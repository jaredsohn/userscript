// ==UserScript==
// @name           FlickrShowNumberItemsInPool
// @namespace      vispillo
// @require        http://userscripts.org/scripts/source/78952.user.js
// @include        http://www.flickr.com/groups/*/admin/members/*
// @include        http://www.flickr.com/groups/*/admin/moderators/*
// ==/UserScript==

var data_handler = function ( memberid ) {
  return function (data) {
    var num = (data.photos.total);
    numword = (num == 1) ? 'item' : 'items';
    $('tr[id="member_'+memberid+'"] td:eq(1)').append('<small>&nbsp;-&nbsp;<a href="'+baseurl+'pool/'+memberid+'">'+num+' '+numword+'</a> in pool</small>');
  }
}
var cookie = jQuery('a[data-track=Account-sign_out]').attr('href').split('=')[1];
var group_id = jQuery('link[rel=alternate]').attr('href').split('?id=')[1].split('&')[0];
var key = unsafeWindow.global_magisterLudi;
var baseurl = window.location.href.split('admin')[0];
$('tr[id^="member"]').each(function() {
  var nsid = $(this).attr('id').split('_')[1];
  var api_url = 'http://www.flickr.com/services/rest/?method=flickr.photos.search&api_key='+key+'&api_hash='+cookie+'&user_id='+nsid+'&group_id='+group_id+'&format=json&nojsoncallback=1';  
  $.getJSON(api_url,data_handler(nsid));
});