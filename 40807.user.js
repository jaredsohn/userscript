// ==UserScript==
// @name           jQuery Plugins
// @description    Alternate view for browsing jQuery plugins
// @author         Sean Catchpole
// @version        1.0
// @namespace      jquery
// @include        http://plugins.jquery.com/project/Plugins/*
// @require	       http://ajax.googleapis.com/ajax/libs/jquery/1.3.0/jquery.min.js
// ==/UserScript==

$.fn.at = $.fn.appendTo;

var css = "\
.project > div > div { display:none; margin:0; padding:0 25px 25px; }\
#jq-primaryContent .project > div > h2 { margin:0!important; border-bottom:1px solid #DDD!important; width:100%; display:block; padding:2px 4px; cursor:pointer; }\
#jq-primaryContent .project > div > h2 a { text-decoration:none; }\
#jq-primaryContent .project > div > h2:hover, #jq-primaryContent .project > div > h2.active { background:#EEE; border-bottom:1px solid #BBB!important; }\
#jq-primaryContent .project > div > h2:hover a, #jq-primaryContent .project > div > h2.active a { color:#000; }\
";
$('<style type="text/css">').html(css).at('head');
$(".project > div").wrapInner("<div>").each(function(){
  var self = this;
  $("h2:first",this).each(function(){
    $(this).prependTo(self); }).toggle(
    function(){ $(this).addClass("active").next("div").show(); },
    function(){ $(this).removeClass("active").next("div").hide(); });
});
