// ==UserScript==
// @name		MusicBrainz: Helper for fixing featuring artists for recordings.
// @description		This adds a button when editing a recording which attempts to move featuring artists from the recording title to the artist credits.
// @version		2013-04-19
// @author		-
// @namespace		df069240-fe79-11dc-95ff-0800200c9dd6
//
// @include		*://musicbrainz.org/recording/*/edit
// @include		*://beta.musicbrainz.org/recording/*/edit
// @include		*://test.musicbrainz.org/recording/*/edit
// @include		*://musicbrainz.org/recording/create
// @include		*://beta.musicbrainz.org/recording/create
// @include		*://test.musicbrainz.org/recording/create
// ==/UserScript==
//**************************************************************************//

function injected() {

$('#id-edit-recording\\.name').after('<div class="row"><label>&nbsp;</label><input type="button" value="Fix Feats" id="fixfeats"></div>');
$('#fixfeats').click(function() {
	var title = $('#id-edit-recording\\.name').val();
	var m = title.match(/^(.*) \(feat\. (.*)\)$/);
	if (m) {
		$('#id-edit-recording\\.name').val(m[1]);
		$('#open-ac').click();

		var account = $(".artist-credit-box .artist").size(); // number of existing credits
		var artists = m[2].split(/[,&]/);

		// the artist credit editor likes overwriting join phrases, so lets add enough credits to start with
		for (var i = 0; i < artists.length; i++) {
			$('.add-artist-credit').eq(0).click();
		}

		// *now* put the artist names in the boxes
		for (var i = 0; i < artists.length; i++) {
			var j = account + i;
			$('#id-edit-recording\\.artist_credit\\.names\\.'+j+'\\.artist\\.name').val(artists[i]);
		}

		$('#id-edit-recording\\.artist_credit\\.names\\.'+ (account - 1) +'\\.join_phrase').val(' feat. ');
		$('#id-edit-recording\\.artist_credit\\.names\\.'+account+'\\.artist\\.name').focus();
	}
});

}
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injected +')();'));
document.body.appendChild(script);


