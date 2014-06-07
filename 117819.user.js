// ==UserScript==
// @name           diaspora
// @namespace      http://www.kiwi-hacker.net/diaspora
// @description    Diaspora Tweaks - some ideas for D* improvement
// @version        0.1A
// @include        https://diasp.org/*
// @include        https://diasp.eu/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

/*****************************************************************************

Tweaks for diaspora client

Things i find useful to use and others might too.

STILL AN ALPHA VERSION - SO IT CONTAINS BUGS !!!

*****************************************************************************/


	//
	// vars - consts really but javascript doesn't have consts.
	//
	
	var img_loc="/images/deletelabel.png";
	var ignore_img="https://fugue-icons-src.googlecode.com/git/icons/cross-script.png";
	var mute_img="https://fugue-icons-src.googlecode.com/git/icons/ear--minus.png";

	var thumb_ratio=0.25; // thumbnail resize
	var thumb_wh = '_mywh'; // attr to store w x h of thumbnails
	
	var reshare_onoff='on'; // default  'on' or 'off'

	var pollTimerLength=300;  // millisecs
	var pagePollLength=0;

	var hashtagmenu_timer=4000; // millisecs

	
	var DEBUG=0; // show debugging div

function stopGIFs() {

	// not working - yet

	// Create a new jQuery.Event object with specified event properties.
  //var e = jQuery.Event("keydown", { keyCode: 27 });

  // trigger an artificial keydown event with keyCode 64
  //jQuery("body").trigger( e );

};

function auto_hashtags(id) {
	
	//
	// auto hashtags
	//

	// we add a line of hash tags at the bottom
	// we could've replaced all matching words, but that doesn't look as nice.

	// still buggy

	var my_hashtags=$('li[id^="tag-following-"] > a.tag_selector').text().split(/#/).splice(1);

	if ( $('#hashtagmenu').length === 0 ) {

		$.each( $('textarea'), function(indx,id){
			
			if ( $(id).is(":visible") ) {
		
				// regex needs updating
				var comments=$(id).val().split(/( |\n|\t|\r)/); // array of words
				var auto_tags={};
				
				$.each(my_hashtags, function(indx,value){
				
					$.each(comments, function(indx, el) {
					
						if (el === value) {
							auto_tags[value]=1;
						};
					
					}); //each
				}); //each
		
		
				//$(id).val( $(id).val() + '\n---\n' ); // add a markup line break
				$.each(auto_tags,function(indx,value){
					$(id).val( $(id).val() + '#'+indx+' ' );			
				}); 
				
			}; // visible

		}); //each id

	};
	
};

function hashtags(event) {

	// still buggy

	var my_hashtags=$('li[id^="tag-following-"] > a.tag_selector').text().split(/#/).splice(1);
	
	var id = '#' + $(event.currentTarget).attr('id');

	if ( $('#hashtagmenu').length === 0 ) {

		//GM_log("hashtags");

		//
		// manual hashtags
		//
		var count=0;
		var taglist="<div id='hashtagmenu'>";
		$.each(my_hashtags, function(indx,value){
			count+=1;
			var tagitem='hashtagmenu_'+count;
			taglist=taglist+'<a id="'+tagitem+'" href="#">#'+value+'</a> ';			
		});
		taglist=taglist+"</div>";
	
		$(id).after(taglist); // add to textarea box
		
		// now add the click events
		
		count=0;
		$.each(my_hashtags, function(indx,value){
			count+=1;
			var tagitem='#hashtagmenu_'+count;		
			$(tagitem).click(function(){
			
				//GM_log( $(tagitem).text() );


				var thistag = $(tagitem).text();
				
				// need to check if the last char is a hash and remove it
				// buggy - sometimes it still doubles the hashes
				if ( $(id).val().substr($(id).val().length)  === '#' ) {
					thistag.replace(/#/,'');
				};
				
				$(id).val( $(id).val() + thistag + ' ' );
				
				
			});
		});
		
			
		setTimeout("$('#hashtagmenu').remove();", hashtagmenu_timer); // cleanup later
	};
	
};

function reshares() {

	// this needs tidying up, there is probably a better way
	var reshares=$('div.stream_element > div.sm_body > div.content > div.reshare').parent().parent().parent();

	// a bit of debug
	reshares.css({'background':'#EEEEEE'});
			
		if (reshare_onoff=='on') {
			$('#reshare_toggle').text('Reshares off');
			reshare_onoff='off';
			reshares.hide();
		} else {
			$('#reshare_toggle').text('Reshares on');
			reshare_onoff='on';
			reshares.show();
		};		
	
};

function mutePostsIcons() {

	//
	// change mute/ignore icons
	//
	
	// block user - ignore
	$('a.block_user img').each(function(k,v){	
		$(this).attr("src", 
			$(this).attr("src").replace(img_loc,ignore_img)
		);
	});
	
	// remove post - mute
	$('a.remove_post img').each(function(k,v){	
		$(this).attr("src", 
			$(this).attr("src").replace(img_loc,mute_img)
		);
	});	

};

function columnMove() {
	//
	// Move RHS column into LHS
	//
	var rhs=$('div.span-5.rightBar.last');
	var rhs_width = rhs.width();
	var lhs=$('div.span-5.leftNavBar');
	
	// add rhs contents to lhs
	lhs.append(rhs.contents());
	rhs.remove(); // and remove rhs
	// fix size of middle
	var middle=$('div.span-13 > div#aspect_stream_container');
	//GM_log( middle.width() + " " + rhs_width );
	middle.width( middle.width() + rhs_width );
	// and middle contents
	$('div#aspect_stream_container').width( middle.width() );

};

function thumbnails() {
	//
	// photo thumbnails
	//	

	// there is a bug somewhere when the image is made tiny
	// but a refresh of the page fixes it. weird
	
	var thumbin = function(){

		var wh = $(this).attr(thumb_wh).split("x");
		
		$(this).animate({
			'width':wh[0],
			'height':wh[1]
		}, 200);
	};
	
	var thumbout = function(){

		var wh = $(this).attr(thumb_wh).split("x");
		
		var w=wh[0];
		var h=wh[1];
		var my_thumb_ratio = workOutRatio(w,h);
		
		$(this).animate({
			'width':w * my_thumb_ratio,
			'height':h * my_thumb_ratio
		}, 200);
		
	};
	
	var workOutRatio = function(w,h) {
	
		var w_pct = 200 / w;
		var h_pct = 200 / h;
		
		var my_thumb_ratio = 1;
		
		if (w_pct < h_pct) {
				my_thumb_ratio = w_pct;
		} else {
				my_thumb_ratio = h_pct;			
		};

		return 	my_thumb_ratio;
	};
	
	// multi selector (note the comma)
	$('img.stream-photo, div.ltr.collapsible img').not('.thumb_small').each(function(k,v){

		if ( typeof($(this).attr(thumb_wh)) === "undefined" ) {
			// make sure we don't re-thumbnail an already thumbnailed img

			var w=$(this).width();
			var h=$(this).height();
/*		
		if ( typeof($(this).attr('data-small-photo')) === "undefined" ) {
		
			GM_log("d-s-p: "+$(this).attr('alt') );
		
		};
*/		
		
		
			var my_thumb_ratio = workOutRatio(w,h);
				
			if (my_thumb_ratio < 1) {
		
			// add attrib that contains full img w h 
			// this is against standards but it makes it sooo much easier
			// to keep a record of what th real img size is
			$(this).attr(thumb_wh,w + "x" + h); 
		
			// indicate its a thumbnail
			$(this).css({'border':'5px double black'});
		
			// immediately re-size
			$(this).width(w * my_thumb_ratio);		
			$(this).height(h * my_thumb_ratio);
			$(this).hover(thumbin, thumbout)
			
			};
/*
			GM_log( $(this).attr('alt') +"\n" + 
					$(this).attr(thumb_wh) + "\n" + 
					"orig: " + w  + "x" + h + "\n" +
					"resized: " + $(this).width() + "x" + $(this).height() + "\n" +
					my_thumb_ratio
			);
*/

		};		
	});

};

function pollPage() {

	var pageItems=$('div.content').length;
	
	$('#debugme').text('pageItems:'+pageItems+' pagePollLength:'+pagePollLength);
	
	if (pageItems != pagePollLength) {
	
		// we have a page change
		// ie. content has changed
	
		runChanges();
		
		pagePollLength=$('div.content').length;
	};
};


function runChanges() {
	
	//GM_log("runChanges");

	mutePostsIcons();
	columnMove();
	thumbnails();
	//stopGIFs();
};

function debug_init() {
	$('<div id="debugme">my debug window</div>').appendTo('body');
	$('#debugme').css({
		'z-index':'99999', 
		'background':'#FFFFFF',
		'position':'fixed',
		'top':'5px'
	});
	
};

$(document).ready( function() {

	GM_log("running : "+$().jquery);

	
	if (DEBUG==1) {
		debug_init();
	};
	
	//
	// re-shares - hide
	//
	// add button to nav-bar
	$('#nav_badges').append(
		'<div class="badge"><button id="reshare_toggle">Reshares</button></div>'
	);
	$('#reshare_toggle').click(function(){
		reshares();
	});
	
	
	//
	// hash tags
	//
	$('textarea').keypress(function(event) {
		if ( event.which == 35 ) { // hashkey
				hashtags(event);
   		};
	});

	$('#nav_badges').append(
		'<div class="badge"><button id="auto_hashtags">Auto HashTag</button></div>'
	);
	$('#auto_hashtags').click(function(){
		auto_hashtags();
	});
	

	//
	// run functions for initial page
	//
	runChanges();

	
	//
	// set timer to watch for new posts
	//
	pagePollLength=$('div.content').length;
	setInterval(pollPage,pollTimerLength); 	
	
});

