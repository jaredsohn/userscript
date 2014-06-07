// ==UserScript==
// @name          MusicBrainz Album Images
// @description   Adds album images to the artist and release-group pages
// @namespace     http://userscripts.org/users/518906
// @author        Nonya Beesnes
// @version       0.2.1
// @license       GPL
// @include       *://musicbrainz.org/artist/*
// @include       *://musicbrainz.org/release-group/*
// @include       *://beta.musicbrainz.org/artist/*
// @include       *://beta.musicbrainz.org/release-group/*
// @include       *://test.musicbrainz.org/artist/*
// @include       *://test.musicbrainz.org/release-group/*
// @match         *://musicbrainz.org/artist/*
// @match         *://musicbrainz.org/release-group/*
// @match         *://beta.musicbrainz.org/artist/*
// @match         *://beta.musicbrainz.org/release-group/*
// @match         *://test.musicbrainz.org/artist/*
// @match         *://test.musicbrainz.org/release-group/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

function enableFullDisplay() {
	'use strict';
	$('table.tbl td:nth-of-type(2)').show();
	$('table.tbl th.imageHeader').show();
	$('div.full.displayLink').addClass('on');
	$('div.full.displayLink').removeClass('off');
	$('div.condensed.displayLink').addClass('off');
	$('div.condensed.displayLink').removeClass('on');
	// for expand/collapse releases script compatibility
	$('table[style*="margin-left: 3em;"]').css('margin-left','9em');
	localStorage.MusicBrainzAlbumImagesCondensed = false;
}

function enableCondensedDisplay() {
	'use strict';
	$('table.tbl td:nth-of-type(2)').hide();
	$('table.tbl th.imageHeader').hide();
	$('div.condensed.displayLink').addClass('on');
	$('div.condensed.displayLink').removeClass('off');
	$('div.full.displayLink').addClass('off');
	$('div.full.displayLink').removeClass('on');
	// for expand/collapse releases script compatibility
	$('table[style*="margin-left: 9em;"]').css('margin-left','3em');
	localStorage.MusicBrainzAlbumImagesCondensed = true;
}

var current_tab = $('div.tabs ul.tabs > li.sel').text();

if (current_tab === 'Overview' || current_tab === 'Releases') {
    var entity = window.location.pathname.match(/\/(artist|label|release-group)\/.+/)[1],
        imageEntity;

    if (entity === 'artist' && current_tab === 'Overview') {
        imageEntity = 'release-group';
    } else if ( (entity === 'artist' && current_tab === 'Releases')  || (entity === 'release-group' && current_tab === 'Overview') ) {
        imageEntity = 'release';
    }
    
	if (imageEntity) {
        $('table.tbl').each(function () {
			'use strict';
            //insert new table header cell
            $(this).find('thead tr th').first().after('<th class="imageHeader" width="50px"></th>');
    
            //insert images
            $(this).find('tbody tr').each(function () {
                if (this.className !== 'subh') {
                    var rghref = $(this).find('a').first().attr('href'),
                        rgid = rghref.substring(rghref.lastIndexOf('/') + 1);
                    $(this).find('td').first().after('<td><img src="http://coverartarchive.org/' + imageEntity + '/' + rgid +'/front-250" width="54px" onError="this.onerror=null;this.src=\'http://i.imgur.com/TPvYmB4.jpg\';" /></td>');
                }
            });
            
            if (entity === 'release-group') {
                //fix subheader width
                $('tr.subh th:last').attr('colspan',Number( $('tr.subh th:last').attr('colspan') ) + 2);
                console.log(Number( $('tr.subh th:last').attr('colspan') ));
            }
            
        });
    }

    //add button to toggle images
    
    var css = '<style type="text/css"> \
                  div.displayLink{display:inline-block;cursor:pointer;margin-top:10px;padding-left:18px;padding-top:1px;background-position-x:0%;background-position-y:50%;background-repeat:no-repeat}\
                  div.displayLink.full.on, div.displayLink.full.off:hover{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABlBMVEX////+vlNivA7cAAAAAXRSTlMAQObYZgAAABVJREFUeAFjYAQBFBIMiBJHApSYAwAVYABRfIzHZQAAAABJRU5ErkJggg==)}\
                  div.displayLink.off:hover{color:#FEBE53}\
                  div.displayLink.full.off{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABlBMVEUAAADi4uItTa87AAAAAXRSTlMAQObYZgAAABVJREFUeAFjYAQBFBIMiBJHApSYAwAVYABRfIzHZQAAAABJRU5ErkJggg==)}\
                  div.displayLink.condensed{margin-left:15px}\
                  div.displayLink.condensed.on, div.displayLink.condensed.off:hover{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABlBMVEX////+vlNivA7cAAAAAXRSTlMAQObYZgAAABBJREFUeAFjYEQABiRAT3EAEYgAQ7Ng8eYAAAAASUVORK5CYII=)}\
                  div.displayLink.condensed.off{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAABlBMVEUAAADi4uItTa87AAAAAXRSTlMAQObYZgAAABBJREFUeNpjYEQABmRAR3EAEYgAQ0D3DvEAAAAASUVORK5CYII=)}\
               </style>';
	$(css).appendTo('head');
    
    $('#content > form').first().before('<div class="full displayLink on">full</div>');
    $('#content > form').first().before('<div class="condensed displayLink off" style="display:inline-block;cursor:pointer;margin-top:10px;">condensed</div>');
	$('div.full.displayLink').click(function() {enableFullDisplay();});
	$('div.condensed.displayLink').click(function() {enableCondensedDisplay();});
	
	if (localStorage.MusicBrainzAlbumImagesCondensed === 'true') {
		enableCondensedDisplay();
	} else {
		enableFullDisplay();
	}
}