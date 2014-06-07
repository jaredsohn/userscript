// ==UserScript==
// @name        Import CD1D releases into MB 
// @namespace   http://userscripts.org/users/517952
// @description Import CD1D releases into MB 
// @include     http://cd1d.com/*/album/*
// @version     0.1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        https://raw.github.com/phstc/jquery-dateFormat/master/jquery.dateFormat-1.0.js
// @require        https://raw.github.com/murdos/musicbrainz-userscripts/master/lib/import_functions.js
// @grant       none
// ==/UserScript==

if (!unsafeWindow) unsafeWindow = window;

$(document).ready(function(){
	var release = retrieveReleaseInfo();
	insertLink(release);
});

// extract active tab
function getActive() {
    return $('#container-1 li.ui-state-active a').attr('href').split('#')[1]
};

// extract tracks from active tab
function getTracks() {
    var selector = 'div#' + getActive() + ' table.tracklist-content tbody tr'
    return $(selector).map(function() {
        // $(this) is used more than once; cache it for performance.
        var row = $(this);
 
        // For each row that's "mapped", return an object that  
        //  describes the first and second <td> in the row.
	var duration = row.find('td.tracklist-content-length').text().replace('"', '').replace('\' ', ':').split(':');
	duration = 60*parseInt(duration[0])+parseInt(duration[1]); // convert MM:SS to seconds

	// drop track number prefix (A A2 C3 01 05 etc...)
	var title = row.find('td.tracklist-content-title').text().replace(/^[0-9A-F][0-9]* /, '')
        return {
            title: title,
            duration: duration*1000 // milliseconds in MB
        };
    }).get();
}

// get artists
function getArtists() {
    return $('div.infos-releasegrp div.list-artist a').map(function() {
        return $(this).text()
    }).get().join(' & ')
}

// get release title
function getAlbum() {
    return $('h1').text()
}

// get release date and convert it to object
function getReleaseDate() {
    var date = $('div.infos-releasegrp div.row-date').text()
    .replace('janvier', '01')
    .replace('février', '02')
    .replace('mars', '03')
    .replace('avril', '04')
    .replace('mai', '05')
    .replace('juin', '06')
    .replace('juillet', '07')
    .replace('août', '08')
    .replace('septembre', '09')
    .replace('octobre', '10')
    .replace('novembre', '11')
    .replace('décembre', '12')
    .replace('January', '01')
    .replace('February', '02')
    .replace('March', '03')
    .replace('April', '04')
    .replace('May', '05')
    .replace('June', '06')
    .replace('July', '07')
    .replace('August', '08')
    .replace('September', '09')
    .replace('October', '10')
    .replace('November', '11')
    .replace('December', '12')
    .split(' ');
    return { 'year': date[2], 'month': date[1], 'day': date[0] }
}
// Analyze CD1D data and return a release object
function retrieveReleaseInfo() {
    	var release = new Object();
	release.discs = [];

     	// Release artist credit
    	release.artist_credit = [ { artist_name: getArtists() } ];

	// Grab release title
	release.title = getAlbum();

    	// Grab release event information
    	var releasedate = getReleaseDate();
	if (typeof releasedate != "undefined") {
		release.year = $.format.date(releasedate.year, "yyyy");
		release.month = $.format.date(releasedate.month, "MM");
		release.day = $.format.date(releasedate.day, "dd");
	}  
	   
	release.labels = new Array();
	release.format = "Digital Media";
	release.country = "XW"; // Worldwide
	release.type = '';
	release.status = 'official';
	
	// Tracks
	var disc = new Object();
	disc.tracks = new Array();
	disc.format = release.format;
	release.discs.push(disc);
	$.each(getTracks(), function(index, track) {
		var track = {
		    'title': track.title,
		    'duration': track.duration,
		    'artist_credit': []
		}
		disc.tracks.push(track);
	});

	mylog(release);
	return release;

}

// Insert links in page
function insertLink(release) {
  
    	// Form parameters
    	var edit_note = 'Imported from ' + window.location.href;
	var parameters = MBReleaseImportHelper.buildFormParameters(release, edit_note);

	// Build form
	var innerHTML = MBReleaseImportHelper.buildFormHTML(parameters);
	$('div.pane-service-links-service-links h2.pane-title').append(innerHTML);

}

function mylog(obj) {
    var DEBUG = true;
    if (DEBUG && unsafeWindow.console) {
        unsafeWindow.console.log(obj);
    }
}

