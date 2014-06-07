// ==UserScript==
// @name			XVIDEOS Customised Features
// @description		Adds some features: is video on favorites, download button, video player in thumbnail...
// @author			jul75
// @namespace		xvideosCustomiz
// @include			http://www.xvideos.com/*
// @version			1.1.2
// ==/UserScript==
// SET core instructions
// script configuration:
// Set true OR false to enable/disable the 6 following features
OPTION_BOOL_DL_BUTTON = true; // "Download" button under video player
OPTION_BOOL_DROPDOWN_FAVORITES = true; // Favorites drop-down in profile pages
OPTION_BOOL_COMMENTS_FRIEND_ANNOTATION = true; // Friend annotation while mouseover a comment
OPTION_BOOL_VIDEOTHUMB_FAVORITE_ANNOTATION = true; // Favorite annotation under video thumb (block)
OPTION_BOOL_NOTIFICATIONS_ANNOTATION = true; // Add number of friends invite and new comment in "My profile" link
OPTION_BOOL_VIDEO_IN_THUMBNAIL = true; // Add a simple-small button over each video thumbnail to open it in its thumbnail area

// Load jQuery and calls a callback function when jQuery has finished loading
// author: Erik Vergobbi Vold & Tyler G. Hicks-Wright

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}




// END SET core instructions


// userscript core

function main() {
	// Note: use jQ instead of $

	// SET functions definition

	// Returns true if user is connected, false otherwise
	function userIsConnected() {
		var res = false;
		jQ.ajax({
			url: '/ajax-favorite/view/0',
			dataType: 'json',
			async: false
		}).done(function (response, status, xhr) {
			res = response.LOGGED;
		});

		return (res);
	}
	
	function showVideoInThumbnail(evt) {
		var videoId = $(evt.target).parent().parent().attr('id').split('_')[1] ;
		$('#video_'+ videoId +' .thumb').html('<iframe src="http://flashservice.xvideos.com/embedframe/'+ videoId +'" frameborder=0 width=231 height=137 scrolling=no></iframe>');
	}
	
	
	// END SET functions definition


	// *** *** ***
	// *** Comments friends annotation ***
	if (OPTION_BOOL_COMMENTS_FRIEND_ANNOTATION === true) {
		jQ(document).on('mouseenter', '#comments .comment', function (event) {
			console.log('XFC: Setting comments\'s author annotation if in friends list ');
			
			var commentUserBlock = jQ(this).find('.comment_user');
			jQ.ajax({
				url: jQ(commentUserBlock).find('a')[0].href,
				async: false
			}).done(function (response) {
				if (response.indexOf('removeFromFriends') != -1) {
					jQ(commentUserBlock[0]).append('<span class="xfc_friendAnnotation"><b style="color: #F00;">&nbsp;Friend</b></span>');
				} else {
					jQ(commentUserBlock[0]).append('<span class="xfc_friendAnnotation" style="color: #000;">&nbsp;Not in friends list</span>');
				}
			});




		});
		jQ(document).on('mouseleave', '#comments .comment', function (event) {
			jQ('.xfc_friendAnnotation').remove();
		});
	}
	// *** END ***
	// *** *** ***


	// *** *** ***
	// *** Download video button ***
	if ((document.location.href.indexOf('/video') != -1) && (OPTION_BOOL_DL_BUTTON === true)) {
		console.log('XFC: Setting "Download video" button');
		
		// Remove useless text ("Did you like this video") to free some space
		$("#tabVote .voteActions").contents().filter(function () {
			return (this.nodeType == 3);
		}).remove();
		
		// Check if video is already downloadable (XVIDEOS automatically adds DOWNLOAD for some videos)
		if( !($('.tabButtons [data-ref="tabDownload"]').length) || !userIsConnected() ) {
			$('.tabButtons [data-ref="tabDownload"]').remove();
			// Get video direct URL and related informations for filename
			var videoDirectURL = unescape($('#player embed').attr('flashvars').split('&')[2].split('=')[1]);
			var filename2set = 'xvideos_' + $('#page').html().match(/\|\|\/video(.*?)\|\|/)[1].replace('/', '-') + '.flv';
			// Add Download button
			$('.tabButtons [data-ref="tabFavs"]').before('<li class="headtab"><a href="' + videoDirectURL + '" target="_blank"  download="' + filename2set + '">Download</a></li>');
		}
		else
			console.log('XFC: Default "Download video" button already available');
		
	}
	// *** END ***
	// *** *** ***

	jQ(document).ready(function () {

		// *** *** ***
		// *** Videos thumbnail annotation ***
		if (userIsConnected() && OPTION_BOOL_VIDEOTHUMB_FAVORITE_ANNOTATION === true) {
			console.log('XFC: Setting favorites annotation under videos thumbnail');

			// Retrieve current displayed video thumbnails
			jQ('.thumbBlock').each(function () {
				var currVideoID = jQ(this).attr('id').split('_')[1];
				var thumbnailContainer = this;

				// Use XVIDEOS favorite functions to see if given video ID was already added to favorites
				jQ.ajax({
					url: '/ajax-favorite/view/' + currVideoID,
					dataType: 'json',
					async: true
				}).done(function (response, status, xhr) {
					var favListsName = Array();
					var isInFav = false;

					// Go through favorites list
					for (var currListId in response.LISTS) {
						if (response.LISTS[currListId].in_list) {
							favListsName.push(response.LISTS[currListId].name);
							isInFav = true;
						}
					}
					// If current video is on favorites, update thumbnail container
					if (isInFav) {
						jQ(thumbnailContainer).css('background-color', '#BBB');
						var extraHTMLtoAdd = '<span title="' + favListsName.join(' | ') + '"><b style="color: #F00;">F</b></span>';
						jQ(jQ(thumbnailContainer).find('.metadata')[0]).append(extraHTMLtoAdd);

					}

				});

			});
		}
		// *** END ***
		// *** *** ***


		// *** *** ***
		// *** Favorites dropdown on profile pages ***
		if ((location.href.indexOf('/profiles/') != -1) && (OPTION_BOOL_DROPDOWN_FAVORITES === true)) {
			console.log('XFC: Setting favorites profile quick-links');
			var galleriesLinks = Array();
			jQ.ajax({
				url: location.pathname + '/favorites_list/0/0',
				async: true
			}).done(function (response, status, xhr) {
				response = jQ(response); // "Convert" text to HTML

				// Setting pages counter
				var favRemainingPages = 0;
				var favPager = response.find('.pagination')[0];
				if (favPager)
					favRemainingPages = jQ(favPager).find('li').length - 2;

				// Retrieve galleries name over favorites pages
				for (var pageIndex = 0; pageIndex <= favRemainingPages; pageIndex++) {
					jQ.ajax({
						url: location.pathname + '/favorites_list/0/' + pageIndex,
						async: false
					}).done(function (response, status, xhr) {
						response = jQ(response);
						response.find('.blackTitle').each(function () {
							var galleryVideoCounter = '?';
							var counterRegex = /\((.*) ((video)||(videos))\)/i;
							var regexRes = jQ(this).text().match(counterRegex);
							if (regexRes != null)
								galleryVideoCounter = regexRes[1];

							var currGalleryLinkData = jQ(this).find('a')[0];
							galleriesLinks.push({
								'name': jQ(currGalleryLinkData).text(),
								'url': jQ(currGalleryLinkData).attr('href'),
								'counter': galleryVideoCounter
							});
						});

					});
				}

				var htmlGalleriesLinks = '<select style="width:240px;" onchange="location=this.value"><option value="#">Galleries links</option>';
				for (var galleryIndex = 0; galleryIndex < galleriesLinks.length; galleryIndex++) {
					htmlGalleriesLinks += '<option value="' + galleriesLinks[galleryIndex].url + '">';
					htmlGalleriesLinks += galleriesLinks[galleryIndex].name + ' (' + galleriesLinks[galleryIndex].counter + ' videos) </option>';
				}
				htmlGalleriesLinks += '</select>';
				htmlGalleriesLinks = jQ(htmlGalleriesLinks);
				jQ('#tabAboutMe .column_left').append(htmlGalleriesLinks);

			});
		}
		// *** END ***
		// *** *** ***


		// *** *** ***
		// *** Number of friends-invite in "My profile" link ***
		if (userIsConnected() && OPTION_BOOL_NOTIFICATIONS_ANNOTATION) {
			console.log('XFC: Setting notifications annotation');
			var myProfileLink = $('a[href*="http://www.xvideos.com/profiles/"]');
			jQ.ajax({
				url: myProfileLink.attr('href'),
				async: true
			}).done(function (response, status, xhr) {
				var friendsRequestNumber = 0;
				if (response.indexOf('xvideos.com/account/friendsrequests') != -1)
					friendsRequestNumber = response.match(/You have ([0-9]*?) pending/)[1];
				if (friendsRequestNumber) {
					myProfileLink.find('b')[0].innerHTML = '<span title="' + friendsRequestNumber + ' new friends request">My profile (' + friendsRequestNumber + ')</span>';
				}
			});
		}
		// *** END ***
		// *** *** ***


		// *** *** ***
		// *** Video in thumbnail ***
		if (OPTION_BOOL_VIDEO_IN_THUMBNAIL) {
			$('.thumbBlock .thumbInside').prepend('<span class="vin_container" title="Switch to video player" style="cursor:pointer; position: absolute; right: 32px; color: #bf0000">&#9635;</span>');
			$('.vin_container').each(function(el) {
				$(this).click( $(this).parent('.thumbBlock').attr('id'), showVideoInThumbnail );
			});
			
		}
		// *** END ***
		// *** *** ***

/* TODO: 1) Video in popup

var marginLeft = $(window).width() / 2 - (520 / 2);
			popupContainer = '<div id="video_popup_container" style="position:fixed; top:20%; left:'+ marginLeft +'px; z-index:2; background-color: gray; width:520px; height:410px; margin: auto">';
			popupContainer += '<iframe src="http://flashservice.xvideos.com/embedframe/VIDEO_ID" frameborder=0 width=510 height=400 scrolling=no></iframe>';
			popupContainer += '</div>';
			
			$('body').append(popupContainer);
			
			$('body').append(
				'<div id="video_popup_background" onclick="document.getElementById(\'video_popup_background\').remove(); document.getElementById(\'video_popup_container\').remove()" style="z-index:1; opacity:0.85; position:fixed; top:0px; left: 0px; background-color:gray; width:100%; height:100%"></div>'
			);
*/
/* TODO: 2) Move to video (chapters) with thumbnails
Video length / 30 = x
X * thumbnail number => Video "chapter"
*/

	});

}

// load jQuery and execute the main function
addJQuery(main);
