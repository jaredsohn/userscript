// ==UserScript==
// @name          deviousIcons
// @namespace     http://www.jbouchard.net/chris
// @description	  Replace the dA icons with moving icons onMouseover.
// @include       http://*.deviantart.com/*
// @include       http://www.deviantart.com/deviation/*
// @include       http://www.deviantart.com/view/*
// ==/UserScript==

var original = new Array('http://i.deviantart.com/icons/top/browse.gif',
                       'http://i.deviantart.com/icons/top/store.gif',
                       'http://i.deviantart.com/icons/top/submit.gif',
                       'http://i.deviantart.com/icons/top/chat.gif',
                       'http://i.deviantart.com/icons/top/forum.gif',
                       'http://s.deviantart.com/styles/minimal/faq.gif',
                       'http://i.deviantart.com/icons/userpage/general.gif',
                       'http://i.deviantart.com/icons/userpage/gallery.gif',
                       'http://i.deviantart.com/icons/userpage/scraps.png',
                       'http://i.deviantart.com/icons/userpage/journal.gif',
                       'http://i.deviantart.com/icons/activity/journal.gif',
                       'http://i.deviantart.com/icons/userpage/neighbours.png',
                       'http://i.deviantart.com/icons/deviation/view.gif',
                       'http://i.deviantart.com/icons/deviation/edit.gif',
                       'http://i.deviantart.com/icons/deviation/delete.gif',
                       'http://i.deviantart.com/icons/deviation/scrap-deviation.gif',
                       'http://i.deviantart.com/icons/deviation/submit.gif',
                       'http://i.deviantart.com/icons/notes/note-read.gif',
                       'http://i.deviantart.com/icons/activity/deviation.gif',
                       'http://i.deviantart.com/icons/userpage/favourites.gif',
                       'http://i.deviantart.com/icons/userpage/friends.gif',
                       'http://i.deviantart.com/icons/activity/forum.gif'
                      );

var animated = new Array('http://www.jbouchard.net/chris/images/buttons/browse.gif',
                         'http://www.jbouchard.net/chris/images/buttons/store.gif',
                         'http://www.jbouchard.net/chris/images/buttons/submit.gif',
                         'http://www.jbouchard.net/chris/images/buttons/chat.gif',
                         'http://www.jbouchard.net/chris/images/buttons/forum.gif',
                         'http://www.jbouchard.net/chris/images/buttons/faq.gif',
                         'http://www.jbouchard.net/chris/images/buttons/general.gif',
                         'http://www.jbouchard.net/chris/images/buttons/gallery.gif',
                         'http://www.jbouchard.net/chris/images/buttons/scraps-gallery.gif',
                         'http://www.jbouchard.net/chris/images/buttons/journal.gif',
                         'http://www.jbouchard.net/chris/images/buttons/journal.gif',
                         'http://www.jbouchard.net/chris/images/buttons/neighbors.gif',
                         'http://www.jbouchard.net/chris/images/buttons/zoom.gif',
                         'http://www.jbouchard.net/chris/images/buttons/edit.gif',
                         'http://www.jbouchard.net/chris/images/buttons/delete.gif',
                         'http://www.jbouchard.net/chris/images/buttons/scrap.gif',
                         'http://www.jbouchard.net/chris/images/buttons/submit.gif',
                         'http://www.jbouchard.net/chris/images/buttons/notes.gif',
                         'http://www.jbouchard.net/chris/images/buttons/gallery.gif',
                         'http://www.jbouchard.net/chris/images/buttons/fav.gif',
                         'http://www.jbouchard.net/chris/images/buttons/deviant.gif',
                         'http://www.jbouchard.net/chris/images/buttons/forum.gif'
                        );

var tableTags = document.body.getElementsByTagName('table');

for (i = 1; i < tableTags.length; i++)
{
	var aTags = tableTags[i].getElementsByTagName('a');
	if (aTags.length) for (j = 0; j < aTags.length; j++)
	{
		var iconImg = aTags[j].getElementsByTagName('img')[0];
		for (k = 0; k < original.length; k++)
		{
			if (iconImg.src == original[k])
			{
				aTags[j].getElementsByTagName('img')[0].name = 'icon' + i + '-' + j;
				aTags[j].addEventListener('mouseover', new Function("document.images.namedItem('icon" + i + "-" + j + "').src = '" + animated[k] + "'; return true;"), true);
				aTags[j].addEventListener('mouseout', new Function("document.images.namedItem('icon" + i + "-" + j + "').src = '" + original[k] + "'; return true;"), true);
			}
		}
	}
}