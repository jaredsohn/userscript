// ==UserScript==

// @name           What.CD: Star Wars.CD!

// @namespace      http://userscripts.org

// @description    What.CD: Star Wars.CD!

// @include        http*//*what.cd/*
// @include        http*//last*fm*

// ==/UserScript==

/*
What this script does:

# Changes all the TorrentMaster classes to Star Wars themed userclasses. (Jedi Master < Jedi General < Jedi Grand Master)
# Changes the "Invited: #" stats on your profile to "Padawans: #".
# Changes the forum names to Star Wars themed names. Not finished yet because the names aren't decided.

*/

(function() {

    var textNodes =  document.evaluate("//text()", document, null,

        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var node = null;

    for (var i = 0; i < textNodes.snapshotLength; i++) {

        node = textNodes.snapshotItem(i);
//Jedi Master < Jedi General < Jedi Grand Master

	node.data = node.data.replace('Elite TorrentMaster', 'Jedi Grand Master') //this is for userpages.
	node.data = node.data.replace('Power TorrentMaster', 'Jedi General') //this is for userpages.
	node.data = node.data.replace('TorrentMaster', 'Jedi Master') //this is for userpages.

//crude bugfix
	node.data = node.data.replace('Elite TorrentMaster.', 'Jedi Grand Master.') //this is for userpages.
	node.data = node.data.replace('Power TorrentMaster.', 'Jedi General.') //this is for userpages.
	node.data = node.data.replace('TorrentMaster.', 'Jedi Master.') //this is for userpages.
	node.data = node.data.replace('Elite TorrentMaster,', 'Jedi Grand Master,') //this is for userpages.
	node.data = node.data.replace('Power TorrentMaster,', 'Jedi General,') //this is for userpages.
	node.data = node.data.replace('TorrentMaster,', 'Jedi Master,') //this is for userpages.

if (document.URL.match(/forums.php$/)) { //changes the forum names, but only on forum.php, and not in threads or such, to avoid confusion. To activate this anyway, remove the $ after "php".
	node.data = node.data.replace('Bugs', 'Hoth') //this if for forums.
	node.data = node.data.replace('The Lounge', 'Naboo') //this is for forums.
	node.data = node.data.replace('What.CD', 'Coruscant') //this is for forums.
	node.data = node.data.replace('Help', 'Tatooine') //this is for forums.
	}
}

//hoth = bugs
//Naboo = lounge
//Coruscant = what.cd
//Endor = ?
//Alderaan = ?
//Tatooine = Help

})();


//changes "Invited: #" to "Padawans: #"
if (document.URL.match(/user/)) { //prevents this from working on other places than profiles.
function changePosts ()
{
document.body.innerHTML = document.body.innerHTML.replace("Invited:", "Padawans:");
}
window.addEventListener("load", function() { changePosts(); }, false);
}