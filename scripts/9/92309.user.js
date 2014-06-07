// ==UserScript==
// @name				Less IMDb
// @version				1.0.3
// @date				2011-09-19
// @namespace			http://quoteunquoteapps.com
// @description			The goodness of IMDb, with less clutter.
// @source				http://quoteunquoteapps.com/less-imdb
// @identifier			http://userscripts.org/scripts/source/92309.user.js
// @include				http://imdb.com/*
// @include				http://www.imdb.com/*
// @include				http://uk.imdb.com/*
// @match				http://imdb.com/*
// @match				http://www.imdb.com/*
// @match				http://uk.imdb.com/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

	// Browser detection
	if ($.browser.mozilla) {
		$('html').addClass("firefox");
		//$('html').addClass("updated");
	}
	if ($.browser.webkit) {
		$('html').addClass("webkit");
	}


	// ######### ADD MENU  ######### //
	$('<div id="less-imdb-control"><span class="label">Less IMDb</span><div id="imdb-controls"><div id="on" class="imdb-toggle selected">On<div class="radio-outer"><div class="radio-inner"></div></div></div><div id="off" class="imdb-toggle">Off<div class="radio-outer"><div class="radio-inner"></div></div></div></div></div>').appendTo('body#styleguide-v2');

	var firstRun = true;	

function modifyPage() {
	 // Get the URL then see if it's a /title or /name page
	var requestURL = window.location.href;
	var pagePattern = /^http\:\/\/(www|uk).imdb.com\/(title|name)\/.*/;
	if (firstRun == true && requestURL.match(pagePattern)) {
    firstRun = false;
		if($('#on').hasClass('selected')){

// ######### BEGIN MODIFY TITLE & NAME PAGE LAYOUT  ######### //
			$('body').addClass('less-imdb');
			$('#maindetails_sidebar_top').prependTo('#content-2-wide');
			
			//Add classes to divs we want to show
			$("#maindetails_sidebar_top .mediastrip_big").parent('div').addClass('video');
			$("#filmography").parent('.article').addClass('filmography');
			$("table.cast_list").parent('.article').addClass('cast-list');
			$(".article > h2:contains('Storyline')").parent('.article').addClass('storyline');
			$(".article > h2:contains('Did You Know?')").parent('.article').addClass('trivia');
			$(".article > h2:contains('Details')").parent('.article').addClass('details');
			$(".article h4:contains('Season')").parent().parent('.article').addClass('season-year');
			
			//Move things to the sidebar
			var awards = $('.highlighted').html();
			var photos = $('.mediastrip').parent().html();			
			var movie = $('#title-overview-widget-layout').parent('div').parent().html();
			var bio = $('#name-overview-widget-layout').parent().html();
			
			if(photos != ''){
				photos = '<div class="article">'+photos+'</div>';
			} else {
				photos = '';
			}
			if(movie != null){
				movie = '<div class="article movie">'+movie+'</div>';
			} else {
				movie = '';
			}
			if(bio != null){
				bio = '<div class="article bio">'+bio+'</div>';
			} else {
				bio = '';
			}
			if(awards != null){
				awards = '<div class="article highlighted">'+awards+'</div>';
			} else {
				awards = '';
			}

			var alldivs = bio + movie + awards + photos;
			$('#maindetails_sidebar_top').prepend(alldivs);
			
			// Moving things around for the alternate layout
			$('#maindetails_sidebar_top #overview-top .infobar').prependTo('#maindetails_sidebar_top > div.movie');
			$('#maindetails_sidebar_top h1.header').prependTo('#maindetails_sidebar_top > div.movie');
			$('#maindetails_sidebar_top #overview-top .infobar').prependTo('#maindetails_sidebar_top > div.bio');
			$('#maindetails_sidebar_top h1.header').prependTo('#maindetails_sidebar_top > div.bio');
			$('#maindetails_sidebar_top .highlighted').appendTo('#maindetails_sidebar_top div.star-box');
			$('#maindetails_sidebar_top .highlighted').appendTo('#maindetails_sidebar_top #name-overview div.txt-block');
			
			//Save copy of writer/director/castandcrew
			var castCrew = $("#main div.see-more a:contains('Full cast and crew')").parent('.see-more').html();
			var writerCreator = $(".txt-block > h4:contains('Writer:'), .txt-block > h4:contains('Writers:'),.txt-block > h4:contains('Creator:'), .txt-block > h4:contains('Creators:')").parent('.txt-block').html();
			var director = $(".txt-block > h4:contains('Director:'), .txt-block > h4:contains('Directors:')").parent('.txt-block').html();

			if(writerCreator != null){
				writerCreator = '<div class="writer-director">'+writerCreator+'</div>';
			} else {
				writerCreator = '';
			}
			if(director != null){
				director = '<div class="writer-director">'+director+'</div>';
			} else {
				director = '';
			}
			if(castCrew != null){
				castCrew = '<div class="writer-director">'+castCrew+'</div>';
			} else {
				castCrew = '';
			}

			//Hide the original writer/director/castandcrew
			$("#main div.see-more a:contains('Full cast and crew')").parent('.see-more').hide();
			$(".txt-block > h4:contains('Writer:'), .txt-block > h4:contains('Writers:'),.txt-block > h4:contains('Creator:'), .txt-block > h4:contains('Creators:')").parent('.txt-block').hide();
			$(".txt-block > h4:contains('Director:'), .txt-block > h4:contains('Directors:')").parent('.txt-block').hide();
			
			//Move copy of writer/director/castandcrew to sidebar
			$('td#img_primary').prepend(castCrew);
			$('td#img_primary').prepend(writerCreator);
			$('td#img_primary').prepend(director);
			
			//Disable show/hide functionality
			headOnClick = $('.head').attr('onclick');
			$('.less-imdb .head').attr('onclick', '');
			
			//Expand all filmography
			$('#filmography > div').show();
			
			//No more show/hide links
			$('.filmo-show-hide-all').addClass('hide');
			$('.hide-link').addClass('hide');
			$('.show-link').addClass('hide');

// ######### BEGIN RESTORE TITLE & NAME PAGE LAYOUT  ######### //

		} else {

			$('body').removeClass('less-imdb');
			
			//Remove articles from the sidebar
			$('#maindetails_sidebar_top .article').remove();
			$('.writer-director').remove();
			$("#maindetails_sidebar_top div.see-more a:contains('Full cast and crew')").parent('.see-more').remove();
			
			//Show original writer/director/castandcrew
			$(".txt-block > h4:contains('Writer:'), .txt-block > h4:contains('Writers:'),.txt-block > h4:contains('Creator:'), .txt-block > h4:contains('Creators:')").parent('.txt-block').show();
			$(".txt-block > h4:contains('Director:'), .txt-block > h4:contains('Directors:')").parent('.txt-block').show();
			$("#main div.see-more a:contains('Full cast and crew')").parent('.see-more').show();
			
			//Re-enableDisable show/hide functionality
			$('.head').attr('onclick', headOnClick);
			
		} // End if #on has class selected

	
	} // End if url pattern matches
	
	else {
	
    firstRun = false;
		if($('#on').hasClass('selected')){

// ######### BEGIN MODIFY OF NON-TITLE & NAME PAGE LAYOUT  ######### //
			$('body').addClass('less-imdb-global');

// ######### BEGIN RESTORE OF NON-TITLE & NAME PAGE LAYOUT  ######### //

		} else {

			$('body').removeClass('less-imdb-global');
			
		} // End if #on has class selected (general pages)
	
	} // End else url pattern matches

} // end modifyPage

var fadeDuration = 120; //time in milliseconds
      
// Animate controls in jquery for firefox
      $('.firefox #less-imdb-control').hover(function() {
        $(this).animate({ 
        	paddingRight: '88px',
        	opacity: 1
         }, fadeDuration);
      }, function() {
        $(this).animate({ 
        	paddingRight: '0px',
        	opacity: .5
         }, fadeDuration);
      });


  $('#on').click(function() {
    if(!$(this).hasClass('selected')){
      $(this).addClass('selected');
      $('#off').removeClass('selected');
      firstRun = true;
      modifyPage();
    }
  });

  $('#off').click(function() {
    if(!$(this).hasClass('selected')){
      $(this).addClass('selected');
      $('#on').removeClass('selected');
      $('body').removeClass('title-name');
      $('body').removeClass('lookfor');
      firstRun = true;
      modifyPage();
    }
  });

modifyPage();

} // end main()

// load jQuery and execute the main function
addJQuery(main);

// Add the styles
//GM_addStyle('body.less-imdb #wrapper{background-image:none!important;background-color:transparent!important}body.less-imdb-global,body.less-imdb{background:#d4d9dd url('http://www.imdb.com/images/SF6a60b25e95abed5cb5d88ede408d0223/wheel/bg-1008.png') repeat-y center!important}body.less-imdb h1.header,body.less-imdb table#name-overview-widget-layout h1.header{display:block!important;padding:5px 5px 5px 10px!important;background-color:silver!important;border-bottom:1px solid #dfdfdf;margin:-10px -12px 10px!important;background-image:-webkit-gradient(linear,50% 0,50% 100%,from(#f9f9f9),to(#efefef));background-image:-moz-linear-gradient(0% 100% 90deg,#efefef,#f9f9f9);background-image:gradient(linear,50% 0,50% 100%,from(#f9f9f9),to(#efefef))}body.less-imdb #main_nav{display:none}body.less-imdb .nb_extra{display:none}body.less-imdb #nb_personal{margin-top:14px!important}body.less-imdb #nb_search{margin-top:12px!important;margin-left:240px!important}body.less-imdb #nb_search input{padding:6px;-webkit-appearance:caret;-webkit-box-shadow:10px 10px 10px black!important;-moz-box-shadow:10px 10px 10px black!important;box-shadow:10px 10px 10px black!important;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px}body.less-imdb button.nb_primary{padding:6px 15px 8px 15px!important;margin-left:-30px!important;-webkit-border-top-right-radius:6px!important;-webkit-border-bottom-right-radius:6px!important;-moz-border-radius-topright:6px!important;-moz-border-radius-bottomright:6px!important;border-top-right-radius:6px!important;border-bottom-right-radius:6px!important;-webkit-border-top-left-radius:0!important;-webkit-border-bottom-left-radius:0!important;-moz-border-radius-topleft:0!important;-moz-border-radius-bottomleft:0!important;border-top-left-radius:0!important;border-bottom-left-radius:0!important}body.less-imdb #navbar,body.less-imdb-global #navbar{margin:25px auto auto -1px!important}body.less-imdb div#top_ad_wrapper,body.less-imdb-global div#top_ad_wrapper,body.less-imdb .twentyanniversary,body.less-imdb-global .twentyanniversary,body.less-imdb .fallmoviepreviewdiv,body.less-imdb-global .fallmoviepreviewdiv,body.less-imdb div#top_ad_wrapper,body.less-imdb-global div#top_ad_wrapper,body.less-imdb table#amazon-affiliates,body.less-imdb-global table#amazon-affiliates,body.less-imdb div#eyeDiv,body.less-imdb-global div#eyeDiv,body.less-imdb #ebStdBanner0,body.less-imdb-global #ebStdBanner0,body.less-imdb iframe,body.less-imdb #cboxOverlay,body.less-imdb-global #cboxOverlay{display:none!important}body.less-imdb div#content-1,body.less-imdb div.article{display:none}body.less-imdb #maindetails_sidebar_top div.article.highlighted{display:block!important}body.less-imdb .hide{display:none!important}body.less-imdb div.article.filmography,body.less-imdb div.article.bio,body.less-imdb div.article.movie,body.less-imdb div.article.cast-list,body.less-imdb div.article.storyline,body.less-imdb div.article.trivia,body.less-imdb div.article.details,body.less-imdb div.article.writer-director,body.less-imdb div.article.season-year,body.less-imdb div.article.listo{display:block!important}body.less-imdb div.aux-content-widget-3,body.less-imdb div.aux-content-widget-2,body.less-imdb div.aux-content-widget-5,body.less-imdb div.middle-rhs,body.less-imdb div.top-rhs{display:none}body.less-imdb .video{display:block!important}body.less-imdb div.article.filmography,body.less-imdb xdiv.article.cast-list{padding-left:0;padding-right:0}body.less-imdb div.article.filmography #jumpto{padding-left:10px;padding-right:10px}body.less-imdb div.article.filmography div.rightcornerlink{padding-right:10px!important}body.less-imdb img.video{margin-left:auto;margin-right:auto;margin-bottom:4px}body.less-imdb div#prometer_container{margin:-18px -22px 0 0!important}body.less-imdb table#name-overview-widget-layout,body.less-imdb table#name-overview-widget-layout tbody,body.less-imdb table#name-overview-widget-layout tr,body.less-imdb table#name-overview-widget-layout td,body.less-imdb table#title-overview-widget-layout,body.less-imdb table#title-overview-widget-layout tbody,body.less-imdb table#title-overview-widget-layout tr,body.less-imdb table#title-overview-widget-layout td{display:block}body.less-imdb div.star-box{width:auto!important;margin-left:-12px!important;margin-right:-12px!important;-webkit-border-radius:0!important;-moz-border-radius:0!important;border-radius:0!important;padding:20px 20px!important;background:-webkit-gradient(linear,0% 100%,0% 0,from(#ededed),color-stop(0.49,white))!important;background:-moz-linear-gradient(0% 90% 90deg,#ededed,#fff)!important;background:gradient(linear,0% 100%,0% 0,from(#ededed),color-stop(0.49,white))!important;border-left:none!important;border-right:none!important}body.less-imdb .rating-big{height:21px;overflow:hidden;margin-bottom:6px;width:auto!important}body.less-imdb #warplink{display:none}body.less-imdb #resume-teaser{display:block!important;clear:both!important;position:relative!important;float:none!important}body.less-imdb #img_primary{padding:10px 0 2px!important;background-image:-webkit-gradient(linear,left top,right bottom,color-stop(0,#f9f9f9),color-stop(1,white));background-image:-moz-linear-gradient(left top,#f9f9f9 0,#fff 100%);background-image:gradient(linear,left top,right bottom,color-stop(0,#f9f9f9),color-stop(1,white));margin:0 -11px;border-top:1px solid #eef1f1}body.less-imdb #img_primary img{display:block;background-color:white;padding:6px;border:1px solid #d3d3d3;-webkit-box-shadow:0 1px 4px rgba(0,0,0,.2);-moz-box-shadow:0 1px 4px rgba(0,0,0,.2);box-shadow:0 1px 4px rgba(0,0,0,.2);margin:0 auto 20px!important}body.less-imdb #img_primary a img{-webkit-transition:.15s!important;-moz-transition:.15s!important;transition:.15s!important}xbody.less-imdb #img_primary a:hover img{-webkit-transform:perspective(500) rotateY(0deg) rotateZ(0deg) rotateX(2.5deg) scale(1,1);transform:perspective(500) rotateY(0deg) rotateZ(0deg) rotateX(2.5deg) scale(1,1);-webkit-transition:.15s!important;transition:.15s!important;border:1px solid #b0b3b3;-webkit-box-shadow:0 10px 10px rgba(0,0,0,.2);-moz-box-shadow:0 10px 10px rgba(0,0,0,.2);box-shadow:0 10px 10px rgba(0,0,0,.2)}body.less-imdb #img_primary a:hover img{-webkit-transition:.15s!important;-moz-transition:.15s!important;transition:.15s!important;border:1px solid #b0b3b3;-webkit-box-shadow:0 1px 4px rgba(0,0,0,.4);-moz-box-shadow:0 1px 4px rgba(0,0,0,.4);box-shadow:0 1px 4px rgba(0,0,0,.4)}body.less-imdb .writer-director{padding:0 20px 8px}span.nobr{white-space:pre!important}body.less-imdb div.article,body.less-imdb #maindetails_sidebar_top>div{-webkit-border-radius:5px!important;-moz-border-radius:5px!important;border-radius:5px!important;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.3),inset -2px -2px 2px white;-moz-box-shadow:0 1px 3px rgba(0,0,0,.3),inset -2px -2px 2px white;box-shadow:0 1px 3px rgba(0,0,0,.3),inset -2px -2px 2px white;background-image:-webkit-gradient(linear,100% 100%,50% 0,from(#f9f9f9),to(white));background-image:-moz-linear-gradient(right bottom,#f9f9f9 20%,#fff 100%);background-image:gradient(linear,100% 100%,50% 0,from(#f9f9f9),to(white));border:1px solid #ebebeb;border:none!important}body.less-imdb div.article{background:white}body.less-imdb .infobar{margin-bottom:5px!important;word-wrap:break-word}body.less-imdb div.mediastrip{clear:both;padding-top:20px}body.less-imdb div.article{border:none;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}body.less-imdb #maindetails_sidebar_top div.article.highlighted{background:#efe3a4;border:6px double rgba(255,255,255,1)!important;margin:10px -12px 2px!important;padding:8px 12px!important}body.less-imdb .txt-block div.article.highlighted{margin-left:0!important;margin-right:0!important}body.less-imdb div#filmography>.head,body.less-imdb div#filmography>.head:hover{background-image:-webkit-gradient(linear,50% 100%,50% 0,from(gray),to(silver))!important;background-image:-moz-linear-gradient(0% 100% 90deg,gray,silver);background-image:gradient(linear,50% 100%,50% 0,from(gray),to(silver))!important;border-bottom:1px solid #696c6c!important;border-top:1px solid #9ba0a1;cursor:auto!important;padding-bottom:10px!important;padding-top:7px!important}body.less-imdb div#filmography div.filmo-row{border-bottom:1px solid #d6d7d7!important}body.less-imdb div#filmography div.filmo-row:last-child{border-bottom:none!important}body.less-imdb .filmography .rightcornerlink{border:none!important}body.less-imdb .filmography .rightcornerlink span{display:none!important}body.less-imdb .cast_list tr{border:none!important}body.less-imdb td.castlist_label{padding-bottom:10px!important;font-size:11px!important}body.less-imdb div.article.season-year{margin-bottom:-10px!important}body.less-imdb h2{color:#3f3f3f!important;text-shadow:white 0 1px 0;font-size:18px!important}body.less-imdb h3{color:#3f3f3f!important;text-shadow:white 0 1px 0;font-size:14px!important}body.less-imdb hr{border-style:solid;border-color:#e1e1e1!important}body.less-imdb .see-more{border-style:none!important}body.less-imdb div#filmography>.head,body.less-imdb div#filmography>.head:hover,body.less-imdb div#filmography>.head a,body.less-imdb div#filmography>.head a:hover{color:#3f3f3f!important;text-shadow:#c0c1c1 0 1px 0!important;font-size:11px!important}body.less-imdb div#filmography>.head a,body.less-imdb div#filmography>.head a:hover{font-size:15px!important}body.less-imdb #content-2-wide a:link{text-decoration:none!important}body.less-imdb #content-2-wide a:hover{color:#143f6c!important}body.less-imdb .spin{-webkit-transition:.75s .5s!important;-moz-transition:.75s .5s!important;transition:.75s .5s!important;display:inline-block;margin:0;padding:0}body.less-imdb .spin-hover:hover .spin{-webkit-transition:.75s!important;-moz-transition:.75s!important;transition:.75s!important;-webkit-transform:perspective(99999) rotateY(180deg);transform:perspective(99999) rotateY(180deg)}body.less-imdb div#pageContent{overflow:hidden!important;display:none!important}body.less-imdb div#jumpto{padding-left:0!important}body.less-imdb div#maindetails_sidebar_top{float:left!important;margin-left:20px}body.less-imdb div.maindetails_center{margin-left:0!important}body.less-imdb div#maindetails_center_top{display:none}body.less-imdb div#maindetails_center_bottom{float:left;margin-top:0!important}#less-imdb-control{color:white;background-color:rgba(0,0,0,.8);position:absolute;top:0;display:block;font:9px/0 Verdana,Tahoma,"Lucida Grande",Lucida,sans-serif;z-index:999;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.4),inset 0 1px 5px rgba(0,0,0,.6);-moz-box-shadow:-3px 1px 3px rgba(0,0,0,.4),inset 0 1px 5px rgba(0,0,0,.6);box-shadow:0 1px 3px rgba(0,0,0,.4),inset 0 1px 5px rgba(0,0,0,.6);-webkit-border-bottom-left-radius:6px;-moz-border-radius-bottomleft:6px;border-bottom-left-radius:6px;text-shadow:#000 0 1px 0;-webkit-transition:.25s ease-in-out .5s;-moz-transition:.25s ease-in-out .5s;transition:.25s ease-in-out .5s;opacity:.5;-webkit-user-select:none;right:0;height:23px;overflow:hidden;-webkit-background-clip:padding-box!important;background-clip:padding-box!important}#less-imdb-control:hover{-webkit-transition:.15s ease-in-out;-moz-transition:.15s ease-in-out;transition:.15s ease-in-out;opacity:1;padding-right:88px;cursor:pointer}.webkit #less-imdb-control:hover{opacity:1;padding-right:88px}#imdb-controls{position:absolute;width:91px;overflow:hidden;top:0;left:60px;height:23px}#less-imdb-control .label{-webkit-border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;border-bottom-left-radius:5px;padding:0 5px 6px 7px;color:black;text-shadow:#ded397 0 1px 0;position:relative;font:bold 9px "Helvetica Neue",Arial,Helvetica,Geneva,sans-serif;border:1px solid #c69a3b;border-top:1px solid #ded397;top:0;text-indent:-9999px;overflow:hidden;display:block;background:url(http://quoteunquoteapps.com/_images/less-imdb-control-icon.png) no-repeat left top;width:46px;height:15px}.imdb-toggle{border-top:1px solid rgba(0,0,0,1);border-bottom:1px solid rgba(0,0,0,1);display:block;padding:9px 8px 5px;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,rgba(0,0,0,.5)),color-stop(0.83,rgba(71,71,71,.2)));background-image:-moz-linear-gradient(center bottom,rgba(0,0,0,.5) 0,rgba(71,71,71,.2) 83%);background-image:gradient(linear,left bottom,left top,color-stop(0,rgba(0,0,0,.5)),color-stop(0.83,rgba(71,71,71,.2)));width:28px;height:7px}.imdb-toggle:hover{cursor:pointer;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,rgba(0,0,0,1)),color-stop(0.83,rgba(71,71,71,.5)))!important;background-image:-moz-linear-gradient(center bottom,rgba(0,0,0,1) 0,rgba(71,71,71,.5) 83%)!important;background-image:gradient(linear,left bottom,left top,color-stop(0,rgba(0,0,0,1)),color-stop(0.83,rgba(71,71,71,.5)))!important}.imdb-toggle:active{background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,rgba(0,0,0,1)),color-stop(0.83,rgba(0,0,0,.1)))!important;background-image:-moz-linear-gradient(center bottom,rgba(0,0,0,1) 0,rgba(0,0,0,.1) 83%)!important;background-image:gradient(linear,left bottom,left top,color-stop(0,rgba(0,0,0,1)),color-stop(0.83,rgba(0,0,0,.1)))!important}#on{padding-right:6px;border-right:1px solid rgba(255,255,255,.1);top:0;position:absolute;left:0}#off{border-left:1px solid rgba(0,0,0,.6);left:43px;top:0;position:absolute}.radio-outer{display:inline-block;width:5px;height:5px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;border:1px solid black;padding:2px;margin-left:4px;-webkit-box-shadow:0 1px 1px rgba(100,100,100,1);-moz-box-shadow:0 1px 1px rgba(100,100,100,1);box-shadow:0 1px 1px rgba(100,100,100,1);margin-top:-4px;position:absolute;top:8px;right:6px}.radio-inner{display:inline-block;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;width:5px;height:5px}.imdb-toggle:hover .radio-inner{background-color:rgba(100,100,100,1)}.selected .radio-outer{opacity:1!important}.imdb-toggle:active .radio-inner,.selected .radio-inner{background-color:white!important;opacity:1}');
GM_addStyle((<><![CDATA[
/* Body Background */
body.less-imdb #wrapper {
	background-image: none !important;
	background-color: transparent !important;
}
body.less-imdb-global,
body.less-imdb {
	background:#d4d9dd url('http://www.imdb.com/images/SF6a60b25e95abed5cb5d88ede408d0223/wheel/bg-1008.png') repeat-y center !important;
}
/* Hide menu */
body.less-imdb h1.header,
body.less-imdb table#name-overview-widget-layout h1.header {
	display: block !important;
	padding: 5px 5px 5px 10px !important;
	background-color: silver !important;
	border-bottom: 1px solid #dfdfdf;
	margin: -10px -12px 10px !important;
	background-image: 
	-webkit-gradient(
		linear, 
		50% 0%, 
		50% 100%, 
		from(#f9f9f9), to(#efefef));
	background-image:
		-moz-linear-gradient(0% 100% 90deg,#efefef, #f9f9f9)
	;
	background-image: 
	gradient(
		linear, 
		50% 0%, 
		50% 100%, 
		from(#f9f9f9), to(#efefef));
}

body.less-imdb #main_nav {
	display: none;
}
body.less-imdb .nb_extra {
	display: none;
}
body.less-imdb #nb_personal {
	margin-top: 14px !important;
}
body.less-imdb #nb_search {
	margin-top: 12px !important;
	margin-left: 240px !important;
}
body.less-imdb #nb_search input {
	padding: 6px;
	-webkit-appearance: caret;
	-webkit-box-shadow: 10px 10px 10px black !important;
	-moz-box-shadow: 10px 10px 10px black !important;
	box-shadow: 10px 10px 10px black !important;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	
}
body.less-imdb button.nb_primary {
	padding: 6px 15px 8px 15px !important;
	margin-left: -30px !important;
	-webkit-border-top-right-radius: 6px !important;
	-webkit-border-bottom-right-radius: 6px !important;
	-moz-border-radius-topright: 6px !important;
	-moz-border-radius-bottomright: 6px !important;
	border-top-right-radius: 6px !important;
	border-bottom-right-radius: 6px !important;
	-webkit-border-top-left-radius: 0 !important;
	-webkit-border-bottom-left-radius: 0 !important;
	-moz-border-radius-topleft: 0 !important;
	-moz-border-radius-bottomleft: 0 !important;
	border-top-left-radius: 0 !important;
	border-bottom-left-radius: 0 !important;
}
body.less-imdb #navbar,
body.less-imdb-global #navbar {
	margin: 25px auto auto -1px !important;
}

/* Hide ads */
body.less-imdb div#top_ad_wrapper,
body.less-imdb-global div#top_ad_wrapper,
body.less-imdb .twentyanniversary,
body.less-imdb-global .twentyanniversary,
body.less-imdb .fallmoviepreviewdiv,
body.less-imdb-global .fallmoviepreviewdiv,
body.less-imdb div#top_ad_wrapper,
body.less-imdb-global div#top_ad_wrapper,
body.less-imdb table#amazon-affiliates,
body.less-imdb-global table#amazon-affiliates,
body.less-imdb div#eyeDiv,
body.less-imdb-global div#eyeDiv,
body.less-imdb #ebStdBanner0,
body.less-imdb-global #ebStdBanner0,
body.less-imdb iframe,
body.less-imdb #cboxOverlay,
body.less-imdb-global #cboxOverlay
 {
	display: none !important;
}
/* Hide articles */
body.less-imdb div#content-1,
body.less-imdb div.article {
	display: none;
}

body.less-imdb #maindetails_sidebar_top div.article.highlighted {
	display: block !important;
}
body.less-imdb .hide {
	display: none !important;
}
/* Show articles we want */
body.less-imdb div.article.filmography,
body.less-imdb div.article.bio,
body.less-imdb div.article.movie,
body.less-imdb div.article.cast-list,
body.less-imdb div.article.storyline,
body.less-imdb div.article.trivia,
body.less-imdb div.article.details,
body.less-imdb div.article.writer-director,
body.less-imdb div.article.season-year,
body.less-imdb div.article.listo {
	display: block !important;
}
/* Hide sidebar items */
body.less-imdb div.aux-content-widget-3,
body.less-imdb div.aux-content-widget-2,
body.less-imdb div.aux-content-widget-5,
body.less-imdb div.middle-rhs,
body.less-imdb div.top-rhs {
	display: none;
}
/* Show sidebar items */
body.less-imdb .video {
	display: block !important;
}
/* Move Things */
body.less-imdb div.article.filmography,
body.less-imdb xdiv.article.cast-list {
	padding-left: 0;
	padding-right: 0;
}
body.less-imdb div.article.filmography #jumpto {
	padding-left: 10px;
	padding-right: 10px;
}
body.less-imdb div.article.filmography div.rightcornerlink {
	padding-right: 10px  !important;
}
body.less-imdb img.video {
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 4px;
}
body.less-imdb div#prometer_container {
	margin: -18px -22px 0 0 !important;
}
/* De-tablefy */
body.less-imdb table#name-overview-widget-layout,
body.less-imdb table#name-overview-widget-layout tbody,
body.less-imdb table#name-overview-widget-layout tr,
body.less-imdb table#name-overview-widget-layout td,
body.less-imdb table#title-overview-widget-layout,
body.less-imdb table#title-overview-widget-layout tbody,
body.less-imdb table#title-overview-widget-layout tr,
body.less-imdb table#title-overview-widget-layout td {
	display: block;
}
body.less-imdb div.star-box {
	width: auto !important;
	margin-left: -12px !important;
	margin-right: -12px !important;
	-webkit-border-radius: 0 !important;
	-moz-border-radius: 0 !important;
	border-radius: 0 !important;
	padding: 20px 20px !important;
	background: -webkit-gradient(linear, 0% 100%, 0% 0%, from(#EDEDED), color-stop(0.49, white)) !important;
	background: -moz-linear-gradient(0% 90% 90deg,#EDEDED, #FFFFFF) !important;
	background: gradient(linear, 0% 100%, 0% 0%, from(#EDEDED), color-stop(0.49, white)) !important;
	border-left: none !important;
	border-right: none !important;
}
body.less-imdb .rating-big {
	height: 21px;
	overflow: hidden;
	margin-bottom: 6px;
	width: auto !important;
}
/* Clean up bio and film overview divs */
body.less-imdb #warplink{
	display: none;
}
body.less-imdb #resume-teaser {
	display: block !important;
	clear: both !important;
	position: relative !important;
	float: none !important;
}
body.less-imdb #img_primary {
	padding: 10px 0 2px !important;
	background-image: 
	-webkit-gradient(
		linear,
		left top,
		right bottom,
		color-stop(0, #f9f9f9),
		color-stop(1, white)
		);
	background-image:
	-moz-linear-gradient(
   		left top,
    	rgb(249,249,249) 0%,
    	rgb(255,255,255) 100%
	);
	background-image: 
	gradient(
		linear,
		left top,
		right bottom,
		color-stop(0, #f9f9f9),
		color-stop(1, white)
		);		
	margin: 0 -11px;
	border-top: 1px solid #eef1f1;
}
body.less-imdb #img_primary img {
	display: block;
	background-color: white;
	padding: 6px;
	border: 1px solid #d3d3d3;
	-webkit-box-shadow: 0px 1px 4px rgba(0,0,0,.2);
	-moz-box-shadow: 0px 1px 4px rgba(0,0,0,.2);
	box-shadow: 0px 1px 4px rgba(0,0,0,.2);
	margin: 0 auto 20px !important;
}
body.less-imdb #img_primary a img {
	-webkit-transition: .15s !important;
	-moz-transition: .15s !important;
	transition: .15s !important;
}
xbody.less-imdb #img_primary a:hover img {
	-webkit-transform: perspective(500) rotateY(0deg) rotateZ(0deg) rotateX(2.5deg) scale(1, 1);
	transform: perspective(500) rotateY(0deg) rotateZ(0deg) rotateX(2.5deg) scale(1, 1);
	-webkit-transition: .15s !important;
	transition: .15s !important;
	border: 1px solid #b0b3b3;
	-webkit-box-shadow: 0px 10px 10px rgba(0,0,0,.2);
	-moz-box-shadow: 0px 10px 10px rgba(0,0,0,.2);
	box-shadow: 0px 10px 10px rgba(0,0,0,.2);
}
body.less-imdb #img_primary a:hover img {
	-webkit-transition: .15s !important;
	-moz-transition: .15s !important;
	transition: .15s !important;
	border: 1px solid #b0b3b3;
	-webkit-box-shadow: 0px 1px 4px rgba(0,0,0,.4);
	-moz-box-shadow: 0px 1px 4px rgba(0,0,0,.4);
	box-shadow: 0px 1px 4px rgba(0,0,0,.4);
}
body.less-imdb .writer-director {
	padding: 0 20px 8px;
}
span.nobr {
	white-space: pre !important;
}
/* Make it more subtle */
body.less-imdb div.article,
body.less-imdb #maindetails_sidebar_top > div {
	-webkit-border-radius: 5px !important;
	-moz-border-radius: 5px !important;
	border-radius: 5px !important;
	-webkit-box-shadow: 
		0px 1px 3px rgba(0,0,0,.3),
		inset -2px -2px 2px white
		;
	-moz-box-shadow: 
		0px 1px 3px rgba(0,0,0,.3),
		inset -2px -2px 2px white
		;
	box-shadow: 
		0px 1px 3px rgba(0,0,0,.3),
		inset -2px -2px 2px white
		;
	background-image: 
	-webkit-gradient(
		linear, 
		100% 100%, 
		50% 0%, 
		from(#f9f9f9), to(white));
	background-image:
	-moz-linear-gradient(
	   right bottom,
    	rgb(249,249,249) 20%,
    	rgb(255,255,255) 100%
	);
	background-image: 
	gradient(
		linear, 
		100% 100%, 
		50% 0%, 
		from(#f9f9f9), to(white));
	border: 1px solid #ebebeb;
	border: none !important;
}
body.less-imdb div.article  {
	background: white;
}
body.less-imdb .infobar {
	margin-bottom: 5px !important;
	word-wrap: break-word;
}
/* Mediastrip Styles */
body.less-imdb div.mediastrip {
	clear: both;
	padding-top: 20px;
}
/* Filmography Styles */
body.less-imdb div.article {
	border: none;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	box-shadow: none;
}
/* Awards Styles */
body.less-imdb #maindetails_sidebar_top div.article.highlighted {
	background:#EFE3A4;
	border:6px double rgba(255,255,255,1) !important;
	margin: 10px -12px 2px !important;
	padding:8px 12px !important;
}
body.less-imdb .txt-block div.article.highlighted {
	margin-left: 0 !important;
	margin-right: 0 !important;
}
body.less-imdb div#filmography > .head,
body.less-imdb div#filmography > .head:hover {
	background-image: 
	-webkit-gradient(
		linear, 
		50% 100%,
		50% 0%, 
		from(gray), to(silver)) !important;
	background-image:
	-moz-linear-gradient(0% 100% 90deg,gray, silver) ;
	background-image: 
	gradient(
		linear, 
		50% 100%,
		50% 0%, 
		from(gray), to(silver)) !important;
	border-bottom: 1px solid #696c6c !important;
	border-top: 1px solid #9ba0a1;
	cursor: auto !important;
	padding-bottom: 10px !important;
	padding-top: 7px !important;
}
body.less-imdb div#filmography div.filmo-row {
	border-bottom: 1px solid #d6d7d7  !important;
}
body.less-imdb div#filmography div.filmo-row:last-child {
	border-bottom: none !important;
}
body.less-imdb .filmography .rightcornerlink {
	border: none !important;
}
body.less-imdb .filmography .rightcornerlink span {
	display: none !important;
}
/* Cast List */
body.less-imdb .cast_list tr {
	border: none !important;
}
body.less-imdb td.castlist_label {
	padding-bottom: 10px  !important;
	font-size: 11px  !important;
}
/* TV Series styles */
body.less-imdb div.article.season-year {
	margin-bottom: -10px !important;
}
/* Typography */
body.less-imdb h2 {
	color: #3f3f3f !important;
	text-shadow: white 0 1px 0;
	font-size: 18px !important;
}
body.less-imdb h3 {
	color: #3f3f3f !important;
	text-shadow: white 0 1px 0;
	font-size: 14px !important;
}
body.less-imdb hr {
	border-style: solid;
	border-color: #e1e1e1 !important;
}
body.less-imdb .see-more {
	border-style: none !important;
}
body.less-imdb div#filmography > .head,
body.less-imdb div#filmography > .head:hover,
body.less-imdb div#filmography > .head a,
body.less-imdb div#filmography > .head a:hover {
	color: #3f3f3f !important;
	text-shadow: #c0c1c1 0 1px 0  !important;
	font-size: 11px  !important;
}
body.less-imdb div#filmography > .head a,
body.less-imdb div#filmography > .head a:hover {
	font-size: 15px !important;
}
body.less-imdb #content-2-wide a:link {
	text-decoration: none !important;
}
body.less-imdb #content-2-wide a:hover {
	color: #143f6c !important;
}
body.less-imdb .spin {
	-webkit-transition: .75s .5s !important;
	-moz-transition: .75s .5s !important;
	transition: .75s .5s !important;
	display: inline-block;
	margin: 0;
	padding: 0;
}
body.less-imdb .spin-hover:hover .spin {
	-webkit-transition: .75s !important;
	-moz-transition: .75s !important;
	transition: .75s !important;
	-webkit-transform: perspective(99999) rotateY(180deg);
	transform: perspective(99999) rotateY(180deg);
}
body.less-imdb div#pageContent {
	overflow: hidden !important;
	display: none !important;
}
body.less-imdb #content-2-wide {
}
body.less-imdb div#jumpto {
	padding-left: 0 !important;
}
body.less-imdb div#maindetails_sidebar_top {
	float: left !important;
	margin-left: 20px;
}
body.less-imdb div#maindetails_center_bottom {

}
body.less-imdb div.maindetails_center {
	margin-left: 0 !important;
}
body.less-imdb div#maindetails_center_top {
	display: none;
}

body.less-imdb div#maindetails_center_bottom {
	float: left;
	margin-top: 0 !important;
}
/* ON/Off */
#less-imdb-control {
	color: white;
	background-color: rgba(0,0,0,.8);
	position: absolute;
	top: 0;
	display: block;
	font: 9px/0 Verdana, Tahoma, "Lucida Grande", Lucida, sans-serif;
	z-index: 999;
	-webkit-box-shadow: 
		0px 1px 3px rgba(0,0,0,.4),
		inset 0px 1px 5px rgba(0,0,0,.6);
	-moz-box-shadow: 
		-3px 1px 3px rgba(0,0,0,.4),
		inset 0px 1px 5px rgba(0,0,0,.6);
	box-shadow: 
		0px 1px 3px rgba(0,0,0,.4),
		inset 0px 1px 5px rgba(0,0,0,.6);
	-webkit-border-bottom-left-radius: 6px;
	-moz-border-radius-bottomleft: 6px;
	border-bottom-left-radius: 6px;
	text-shadow: #000000 0 1px 0;
	-webkit-transition: .25s ease-in-out .5s;
	-moz-transition: .25s ease-in-out .5s;
	transition: .25s ease-in-out .5s;
	opacity: .5;
	-webkit-user-select: none;
	right: 0;
	height: 23px;
	overflow: hidden;
	-webkit-background-clip: padding-box !important;
	background-clip: padding-box !important;
}
#less-imdb-control:hover {
	-webkit-transition: .15s ease-in-out;
	-moz-transition: .15s ease-in-out;
	transition: .15s ease-in-out;
	opacity: 1; /* webkit only */
	padding-right: 88px; /* webkit only */
	cursor: pointer;
}
.webkit #less-imdb-control:hover {
	opacity: 1; /* Safari only */
	padding-right: 88px; /* Safari only */
}
#imdb-controls {
	position: absolute;
	width: 91px;
	overflow: hidden;
	top: 0;
	left: 60px;
	height: 23px;
}
#less-imdb-control .label {
	-webkit-border-bottom-left-radius: 5px;
	-moz-border-radius-bottomleft: 5px;
	border-bottom-left-radius: 5px;
	padding: 0 5px 6px 7px;
	color: black;
	text-shadow: #ded397 0 1px 0;
	position: relative;
	font: bold 9px "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
	border: 1px solid #c69a3b;
	border-top: 1px solid #ded397;
	top: 0;
	text-indent: -9999px;
	overflow: hidden;
	display: block;
	background: url(http://quoteunquoteapps.com/_images/less-imdb-control-icon.png) no-repeat left top;
	width: 46px;
	height: 15px;
}
.imdb-toggle {
	border-top: 1px solid rgba(0,0,0,1);
	border-bottom: 1px solid rgba(0,0,0,1);
	display: block;
	padding: 9px 8px 5px;
	background-image: 
	-webkit-gradient(
		linear,
		left bottom,
		left top,
		color-stop(0, rgba(0,0,0,.5)),
		color-stop(0.83, rgba(71,71,71,.2))
	);
	background-image:
	-moz-linear-gradient(
	    center bottom,
	    rgba(0,0,0,.5) 0%,
	    rgba(71,71,71,.2) 83%
	);
	background-image: 
	gradient(
		linear,
		left bottom,
		left top,
		color-stop(0, rgba(0,0,0,.5)),
		color-stop(0.83, rgba(71,71,71,.2))
	);
	width: 28px;
	height: 7px;
}
.imdb-toggle:hover {
	cursor: pointer;
	background-image: 
	-webkit-gradient(
		linear,
		left bottom,
		left top,
		color-stop(0, rgba(0,0,0,1)),
		color-stop(0.83, rgba(71,71,71,.5))
	) !important;
	background-image:
	-moz-linear-gradient(
	    center bottom,
	    rgba(0,0,0,1) 0%,
	    rgba(71,71,71,.5) 83%
	) !important;
	background-image: 
	gradient(
		linear,
		left bottom,
		left top,
		color-stop(0, rgba(0,0,0,1)),
		color-stop(0.83, rgba(71,71,71,.5))
	) !important;
}
.imdb-toggle:active {
	background-image: 
		-webkit-gradient(
			linear,
			left bottom,
			left top,
			color-stop(0, rgba(0,0,0,1)),
			color-stop(0.83, rgba(0,0,0,.1))
		) !important;
	background-image:
		-moz-linear-gradient(
		    center bottom,
		    rgba(0,0,0,1) 0%,
		    rgba(0,0,0,.1) 83%
		) !important;
	background-image: 
		gradient(
			linear,
			left bottom,
			left top,
			color-stop(0, rgba(0,0,0,1)),
			color-stop(0.83, rgba(0,0,0,.1))
		) !important;
}

#on {
	padding-right: 6px;
	border-right: 1px solid rgba(255,255,255,.1);
	top: 0;
	position: absolute;
	left: 0;
}

#off {
	border-left: 1px solid rgba(0,0,0,.6);
	left: 43px;
	top: 0;
	position: absolute;
}
.radio-outer {
	display: inline-block;
	width: 5px;
	height: 5px;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	border: 1px solid black;
	padding: 2px;
	margin-left: 4px;
	-webkit-box-shadow: 0px 1px 1px rgba(100,100,100,1);
	-moz-box-shadow: 0px 1px 1px rgba(100,100,100,1);
	box-shadow: 0px 1px 1px rgba(100,100,100,1);
	margin-top: -4px;
	position: absolute;
	top: 8px;
	right: 6px;
}
.radio-inner {
	display: inline-block;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	width: 5px;
	height: 5px;
}
.imdb-toggle:hover .radio-inner {
	background-color: rgba(100,100,100,1);
}
.selected .radio-outer {
	opacity: 1 !important;
}
.imdb-toggle:active .radio-inner,
.selected .radio-inner {
	background-color: white !important;
	opacity: 1;
}
]]></>).toString());