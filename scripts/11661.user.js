// ==UserScript==
// @name           use.perl.org technorati + digg enabler
// @namespace      http://pjf.id.au/
// @description    Enable technorati and digg links on all use.perl.org journals
// @include        http://use.perl.org/*/journal*
// ==/UserScript==

// Don't you hate it that use.perl.org journals are so web 1.0?
// Don't you wish that they could have all the bling of other sites?
// Now, with the power of greasemonkey, you can upgrade to web 1.01.

// Paul Fenwick <pjf@cpan.org>
// August 2007
// Version 1.01

// Changelog:
//
// 1.01
// 23rd August - Fixed bug where links would not appear when URL used
//               %7E to encode tildes.

// Find the root of the blog.

var blog_url = document.URL.match(/http:\/\/use\.perl\.org\/(?:~|%7[Ee])[A-Za-z0-9_]+\/?/);

// If we can't figure out the blog root URL, then run away.
if (!blog_url) { return; }

// If we have a user info box, then add a technorati favourite link to it.
// If we don't, then we presume that we're not on a use.perl blog as we
// expect it, and don't touch anything.

var user_info = document.getElementById("user-info-content");

if (user_info) {
	// Create our link.
	var technorati_fave_link = document.createElement('a');
	technorati_fave_link.href = 'http://technorati.com/faves?add='+blog_url;

	// Create our image element.
	var technorati_fave_img = document.createElement('img');
	technorati_fave_img.src='http://static.technorati.com/pix/fave/tech-fav-1.png';
	technorati_fave_img.alt='Add to Technorati Favorites';

	// Add them to the user info box.

	technorati_fave_link.appendChild(technorati_fave_img);
	user_info.appendChild(technorati_fave_link);
}

// Adding digg links.  This takes the rather awful approach of finding all the
// divs on the page, looking for ones marked 'adminoptions' and tweaking their
// contents appropriately.  Better suggestions are welcome.

var blog_entries = document.getElementsByTagName('div');

for (var i=0; i < blog_entries.length; i++) {
	var entry = blog_entries[i];

	if (entry.className != 'adminoptions') { continue; }

	// Look around inside the adminoptions area to look for the
	// particular permalink URL.  If we find it, add a digg link

	for (var j=0; j < entry.childNodes.length; j++) {

		// If we don't have a href, we don't want to look at it.
		var child = entry.childNodes[j];
		if (!child.href) { continue; }

		// Search for the permalink...
		var link  = entry.childNodes[j].href.match(/^http:\/\/use\.perl\.org\/~[A-Za-z0-9_]+\/journal\/[0-9]+$/);

		// Found it!  Add a digg link.
		if (link) {

			var digg_link = document.createElement('a');
			digg_link.href = 'http://digg.com/submit?phase=2&url='+link;

			var digg_img = document.createElement('img');
			digg_img.src = 'http://digg.com/img/badges/80x15-digg-badge-2.gif';
			digg_img.alt = 'Digg it';

			digg_link.appendChild(digg_img);
			entry.appendChild(digg_link);
		}
	}
}
