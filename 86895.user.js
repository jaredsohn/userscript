// ==UserScript==
// @name           xREL Advanced
// @namespace      xRELAdvanced
// @description    This Script adds some functions to xREL
// @include        http://www.xrel.to*
// @include        www.xrel.to*
// @include        http://xrel.to*
// @include        xrel.to*
// @include        *.xrel.to*
// @exclude        http://api.xrel.to*
// @exclude        https://api.xrel.to*
// @require        http://xrel.beautify.it/jquery.1.3.2.min.js
// @require        http://xrel.beautify.it/gm_jq_xhr.js
// @require        http://xrel.beautify.it/json_parse.js
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @version        0.1.2
// ==/UserScript==

$(document).ready(function() {

GM_addStyle(".getReleaseName {	cursor: pointer; } .release_options {	padding-top: 0px !important; } .release_options a img {	width:13px; } .release_options span img {	width:13px; } .nfo_title .getReleaseName { margin-left:5px; } .nfo_title .getReleaseName img { width:16px; vertical-align: sub; }");

    // Add Pictures to persons
    if (window.location.href.indexOf("/person/") > -1) {
      var actor = $(".headline2").html();
      var i = 0;
      $('#middle_spawn').after('<div id="middle_left"><div style="position: relative; left: 0pt; top: 0pt;" id="rightbox"><div><div class="box_title1">' + actor + '</div><div style="line-height: 15px;" id="release_info_box" class="box1"></div></div></div></div>');
      $.get("http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=site:imdb.com " + actor + "", function (data) {
        var myObject = JSON.parse(data, function (key, value) {
          if (key == 'url') {
            $("#release_info_box").append('<div class="box_content"><a href="http://images.google.com/searchbyimage?image_url=' + value + '" target="_blank"><img src="http://xrel.beautify.it/?src=' + value + '" title="' + actor + '"></a></div>');
          }
        });
      });
    }
    
    // Expand the view of trailers / hide trailer navigation
    if (window.location.href.indexOf("entertainment-trailers") > -1) {
      if ($('.trailers_top').length != 0) {
        $('.trailers_top').css({
          height: 'auto'
        });
      }
      $('#trailers_top_pagination').hide();
    }
    
    // Make links open in a new tab
    $('a').each(function(){
        if($(this).attr('href')){
            var href = $(this).attr('href');
        	if(href.indexOf('derefer') != -1){
                $(this).attr('target', '_blank');
        	}
        }
    });
    $('area').each(function(){
        if($(this).attr('href')){
            var href = $(this).attr('href');
        	if(href.indexOf('derefer') != -1){
        	   $(this).attr('target', '_blank');
        	}
        }
    });

		// Create a copy button in the release options
		$('.release_item .release_title .sub_link').each(function(){
			if($(this).children('span').hasClass('truncd')){
				var content = $(this).children('span').attr('title');
			}
			else {
				var content = $(this).children('span').html();
			}
			if(content == ''){
				var content = $(this).children('span').html();	
			}
			html = '<br><span class="getReleaseName" data-name="'+content+'"><img src="http://xrel.beautify.it/img/copy.gif"></span>';
			$(this).parent().parent().find('.release_options').append(html);
		});

		// Create a copy button in the p2p release options
		$('.release_item .release_title_p2p .sub_link').each(function(){
			if($(this).children('span').hasClass('truncd')){
				var content = $(this).children('span').attr('title');
			}
			else {
				var content = $(this).children('span').html();
			}
			if(content == ''){
				var content = $(this).children('span').html();	
			}
			html = '<br><span class="getReleaseName" data-name="'+content+'"><img src="http://xrel.beautify.it/img/copy.gif"></span>';
			$(this).parent().parent().find('.release_options').append(html);
		});


		// Make the created Icon clickable
		$('.getReleaseName').click(function(){
			var content = $(this).attr("data-name");
			window.prompt('Einfach STRG+C, schliessen mit ENTER',content); return false;
		});

});