// ==UserScript==
// @name           Flickr context harvester for archives
// @namespace      http://ozhistory.info/flickr_context_harvest
// @description    
// @version        0.2
// @date           2010-04-21
// @creator        Tim Sherratt
// @include        http://naa12.naa.gov.au/scripts/*
// @include        http://recordsearch.naa.gov.au/scripts/*
// @include        http://investigator.records.nsw.gov.au/asp/photosearch/*
// @include        http://arcweb.archives.gov/arc/action/*
// @include        http://acms.sl.nsw.gov.au/item/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var siteDetails = {
	identifySite: function() {
		//If it's NAA Photosearch
		if (document.location.href.match(/naa.gov.au\/scripts\/PhotoSearchItemDetail.asp/i)) {
			//Get barcode
			this.name = 'NAA';
			this.identifier = document.location.href.match(/M=0&B=(\d+)/)[1];
			this.flickrId = '24849862@N08';
			this.position = 'table:last';
		} else if (document.location.href.match(/records.nsw.gov.au\/asp\/photosearch\/photo\.asp\?/i)) {
			this.name = 'StateRecordsNSW';
			this.identifier = document.location.href.match(/photo\.asp\?([\d\w_]+)/i)[1];
			this.flickrId = '27331537@N06';
			this.position = 'table:first';
		} else if (document.location.href.match(/arcweb.archives.gov\/arc\/action\/ShowFullRecord|arcweb.archives.gov\/arc\/action\/ExternalIdSearch/i)) {
			this.name = 'NARA';
			this.identifier = $('.arcID').text().match(/ARC Identifier (\d+)/i)[1];
			this.flickrId = '35740357@N03';
			this.position = '.genPad:first';
		} else if (document.location.href.match(/acms.sl.nsw.gov.au\/item\/itemDetailPaged.aspx\?itemID=/i)) {
			this.name = 'SLNSW';
			this.identifier = document.location.href.match(/itemID=(\d+)/)[1];
			this.flickrId = '29454428@N08';
			this.position = '.div-body';
		}
		getFlickrJSON('photos');
	},
	showComments: function(data) {
		addStyle();
		var photoUrl = 'http://www.flickr.com/photos/' + this.flickrId + '/' + this.photoId;
		$(this.position).after('<div id="flickr"></div>');
		$('#flickr').append('<div id="flickrLink"><a href="' + photoUrl + '" >View this photo in Flickr</a></div>');
		$('#flickr').append('<h2 class="flickrHead">Flickr comments</h2>');
		if (typeof data.comments.comment != 'undefined') {
			$.each(data.comments.comment, function(i, comment) {
				var date = new Date(comment.datecreate*1000);
				var author = '<a href="http://www.flickr.com/people/' + comment.author + '">' + comment.authorname + '</a>';
				$('#flickr').append('<p class="flickrComment">' + comment._content + '</p>');
				$('#flickr').append('<p class="flickrAuthor">Posted by ' + author + ' on ' + date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + '.</p>');
			});
		} else {
			$('#flickr').append('<p class="flickrComment">There are no comments yet.</p>');
		}
	}
};
//Look for photos on Flickr
function getFlickrJSON(searchType) {
	var apiKey = 'bc4984b2fbe0b03611643436b8e05ad4';
	if (searchType == 'photos') {
		var flickrMethod = 'flickr.photos.search';
		var params = '&user_id=' + siteDetails.flickrId + '&text=' + siteDetails.identifier;
	} else if (searchType == 'comments') {
		var flickrMethod = 'flickr.photos.comments.getList';
		var params = '&photo_id=' + siteDetails.photoId;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.flickr.com/services/rest/?method=' + flickrMethod + '&api_key=' + apiKey + params + '&format=json&nojsoncallback=1',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/plain'
		},
		onload: function(response) {
			if (response.status === 200) {
				var data = eval('('+ response.responseText +')');
				if(data.stat != 'fail') {
					if (searchType == 'photos') {
						if (data.photos.total > 0) {
							siteDetails.photoId = data.photos.photo[0].id;
							getFlickrJSON('comments');
						}
					} else {
						siteDetails.showComments(data);
					}
				}
			}
		}
	});
};
function addStyle() {
	var css = '#flickr {border: 1px solid #8F8F8F; padding: 1em; width: 400px;}\n';
	css += '#flickrLink {width: 50%; float: right; text-align:right;}\n';
	css += '.flickrHead {margin: 0; font-size: 120%;}\n';
	css += '.flickrAuthor {margin:0 0 0 2em; font-size: 80%; color: #8F8F8F;}\n';
	css += '.flickrAuthor a {color: #8F8F8F;}\n';
	css += '.flickrComment {margin:1em 0 0 0;}\n';
	$('head').append('<style>\n' + css + '</style>');
}

siteDetails.identifySite();

