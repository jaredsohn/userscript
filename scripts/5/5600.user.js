// ==UserScript==
// @name	Invite 
// @namespace	http://serprest.pt/flickr/#Invitet
// @description Auto fill text to invite a photo to Groups
// @description see how to install here http://www.flickr.com/groups/spectacular_animals/discuss/72157594221655752/
// @version        0.1.4.5
// @identifier	http://serprest.pt/Greasemonkey/flickr/invite.user.js
// @date           2006-08-02
// @creator        Isidro Vila Verde (jvv@fe.up.pt)
// @include http://*flickr.com/photos/*/*
// ==/UserScript==
// I got some ideas from a Dejan Katasic aka noviKorisnik (http://www.flickr.com/photos/noviKorisnik/) script (http://www.flickr.com/groups/NewUserExperience/)
// Many Thanks to Tut99 (Roger): http://www.flickr.com/photos/tut99/ for fixing standard messages 
// --------------------------------------------------------------------
// Copyright (C) 2006 Isidro Vila Verde
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA

var val = [
	'',
	"\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
	 + "I really like your animal photo!\n"
	 + "You are invited to post this photo to <b>Spectacular Animals, invite only</b>\n"
	 + '<a href="http://www.flickr.com/groups/spectacular_animals/">http://www.flickr.com/groups/spectacular_animals/</a>'
	 + "\nPlease add the tag SpecAnimal to your photo\n"
	 + "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
	 ,
	"\n****\n"
	+ "This image has been invited for submission at the Animal Kingdom group!\n"
	+ "The Animal Kingdom group allows for only the finest images of creatures to be submitted. <b>By invite only; please read rules!</b>\n"
	+ '<a href="http://www.flickr.com/groups/animal_kingdom">Animal Kingdom</a>'
	+ "\n--\nPlease add this tag: AnimalKingdomElite\n****\n"
	,
	"\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\nYou are invited to post this image to Spectacular Nature, invite only\n"
	+ '<a href="http://www.flickr.com/groups/spectacular_nature/">http://www.flickr.com/groups/spectacular_nature/</a>'
	+ "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
	,
	"\n-------------------------------------------\n"
	+ 'You are invited to post this image to "Spectacular Skyscapes--by invitation only"'+"\n"
	+ '<a href="http://www.flickr.com/groups/spectacular_skyscapes/">http://www.flickr.com/groups/spectacular_skyscapes/</a>'
	+ "\nPlease read the instructions on page one.\n"
	+ 'Please add the tag "SpecSky".'
	+ "\n-------------------------------------------\n"
	,
	"\n------------------------------------------\n"
	+ 'You are invited to post this image to "Spectacular Landscape, invitation only"'+"\n"	
	+ '<a href="http://www.flickr.com/groups/spectacular_landscapes/">http://www.flickr.com/groups/spectacular_landscapes/</a>'
	+ "\nPlease read the instructions on page one.\n"
	+ 'Please add the tag "specland".'
	+ "\n-------------------------------------------\n"
	,
	"\n------------------------------------------\n"
	+ "<b>BRAVO</b>\n"
	+ 'You are invited to post this image to "The Best: BRAVO" group' + "\n"	
	+ '<a href="http://www.flickr.com/groups/thebestbravo/">http://www.flickr.com/groups/thebestbravo/</a>'
	+ "\n Please read the Rules before posting and don't forget to tag with BRAVO"
	+ "\n-------------------------------------------\n"
	,
	"\n"+'Please post this photo with <a href="http://www.flickr.com/groups/searchthebest">Search the Best</a>'+"\n"
	,
	"I've"+' faved and tagged this one "QUALITY" and am hoping you will join and post it to:'
	+ "\nwww.flickr.com/groups/quality_photography/\n"
	+ "\nwhere photographic quality such as this gets the recognition it deserves and inspires others...\n"
	+ "\n<b>QUALITY!</b>\n"
	+ 'Please read (and heed) the comment entitled <b>"YOUR Responsibility" on the'+"Group's opening page.</b>\n"
	,
	"\n"+'Please post this photo with <a href="http://www.flickr.com/groups/exoticbirds/">Exotic birds</a> group'+"\n"
	,
	"\n"+'<a href="http://www.flickr.com/photos/34072207@N00/205703677/" title="Photo Sharing">'
	+ '<img src="http://static.flickr.com/59/205703677_42bc2e7649_t.jpg" width="71" height="100" alt="WINNER" /></a>'+"\n"
	+ "You are MY WINNER!\n"
	+ "Please add this photo to\n"
	+ "www.flickr.com/groups/mywinners/\n"
	,
	"\n"+'<a href="http://www.flickr.com/photos/34072207@N00/205703677/" title="Photo Sharing">'
	+ '<img src="http://static.flickr.com/59/205703677_42bc2e7649_t.jpg" width="71" height="100" alt="WINNER" /></a>'+"\n"
	+ "You are my winner as well!\n"
	+ "Thanks for posting at www.flickr.com/groups/mywinners\n"
	,
	"\n"+'<a href="http://www.flickr.com/groups/bigfave" title="A Big Fave">'
	+ '<img src="http://static.flickr.com/60/206034722_7c1e091cb5_t.jpg" width="48" height="48" alt="A Big Fave" />'
		+ "A Big Fave</a>\nPlease add this to www.flickr.com/groups/bigfave\n"
	,
	"\n" + ' <img src="http://static.flickr.com/61/228129282_c14d7c812a_o.jpg"/> (<a href="http://www.flickr.com/groups/flickrgold/">gallery & instructions</a>)' + "\n"
	,
	
	"\n" + '<img src="http://static.flickr.com/68/228129285_fbfff59352_o.jpg"/> (<a href="http://www.flickr.com/groups/flickrsilver/">gallery & instructions</a>)' + "\n"
	,
	"\n" + '<img src="http://static.flickr.com/74/228129286_91858f50c3_o.jpg"/> (<a href="http://www.flickr.com/groups/flickrbronze/">gallery & instructions</a>)' + "\n"
	,
	"\n"+'<a href="http://www.flickr.com/groups/kakadoo" title="Kakadoo: PICTURE DIVERSITY">'
	+ '<img src="http://img176.imageshack.us/img176/3954/47408257n00vq7.jpg" width="48" height="48" alt="Kakadoo: PICTURE DIVERSITY" />'
		+ "Kakadoo: PICTURE DIVERSITY</a>\nSeen in www.flickr.com/groups/kakadoo\n"
];
var node;
Invite = {
    init: function ()
    {
    	this.textarea = document.getElementById ('DiscussPhoto').getElementsByTagName ('TEXTAREA') [0];
        var n = document.createElement ('SELECT');
        n.addEventListener ('change', function (e) {
		Invite.insertInvite ();}, 
	false);
	n.innerHTML = '<option value="0"></option>'
			+ '<option value="12">A Big Fave</option>'
			+ '<option value="2">Animal Kingdom</option>'
			+ '<option value="9">Exotic birds</option>'
			+ '<option value="13">Flickr GOLD medal</option>'
			+ '<option value="14">Flickr SILVER medal</option>'
			+ '<option value="15">Flickr BRONZE medal</option>'
			+ '<option value="16">Kakadoo: PICTURE DIVERSITY</option>'
			+ '<option value="10">My Winners</option>'
			+ '<option value="11">My Winners (2nd time)</option>'
			+ '<option value="8">Quality</option>'
			+ '<option value="7">Search the Best</option>'
			+ '<option value="1">Spectacular Animals</option>'
			+ '<option value="5">Spectacular Landscape</option>'
			+ '<option value="3">Spectacular Nature</option>'
			+ '<option value="4">Spectacular Skyscapes</option>'
			+ '<option value="6">The Best: BRAVO</option>'
			;
        this.textarea.parentNode.insertBefore (document.createTextNode ('Invite to '), this.textarea);
        this.textarea.parentNode.insertBefore (n, this.textarea);
	node = n;
    },
    insertInvite:   function ()
    {
        this.textarea.value += val[node.value];
        this.textarea.value += '<i>Invited with <a href="http://www.flickr.com/groups/kakadoo/discuss/72157594282486336/">invite script</a></i>';
    }
}

window.addEventListener (
	'load', 
	function (e) {
		Invite.init ();
	}, 
	false
);