// ==UserScript==
// @name          FTV Streams free
// @description   Watch Videos on ftvstream.com for free, directly in-browser through flash plugin.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @require       http://cdn.jquerytools.org/1.2.6/all/jquery.tools.min.js
// @require       http://releases.flowplayer.org/js/flowplayer-3.2.8.min.js
// @include       http://www.ftvstream.com/*
// @include       http://ftvstream.com/*
// ==/UserScript==

function init(){
$('body').append('<div id="vcontainer"> </div>');


$('img[width=180]').each(function(i,e){
  $('#vcontainer').append('<a style="width:640px;height:360px;" id="vid' + e.id + '">&nbsp</a>');
  $('#vid' + e.id).addClass('rtmp');
  $('#vid' + e.id).addClass('apple_overlay');
  $('#vid' + e.id).attr('href','mp4:' + e.id + '.mp4');
  $('#vid' + e.id).hide();
  $(e).parent().attr('rel','#vid' + e.id);
});

$f("a.rtmp", "http://releases.flowplayer.org/swf/flowplayer-3.2.9.swf", {clip: {provider: 'rtmp'},plugins: {rtmp: {url: "http://releases.flowplayer.org/swf/flowplayer.rtmp-3.2.9.swf",netConnectionUrl: 'rtmp://68.169.82.162/ftvstream'}}});
$("a[rel]").click(function(e){
  $(this).overlay({
    onLoad: function() {var p = $f(this.getOverlay().get(0));p.load();},
    onClose: function(){var p = $f(this.getOverlay().get(0));p.unload();},
    load: true,
    mask: '#3B5872',
  });
  e.preventDefault()
});
}
(init())();