// Greasemonkey Document

// ==UserScript==
// @name			Gaia Redux
// @namespace   	http://gaiaredux.scripts.googlepages.com/index.html
// @description 	Adds Global format settings on Gaia Online.
// @include			*gaiaonline.com*
// @exclude			*gaiaonline.com/profile/index.php?view=profile.ShowProfile*
// @exclude			*gaiaonline.com/profile/?view=profile.ShowProfile*
// @exclude			*gaiaonline.com/profile/?controller=viewer*
// @exclude			*gaiaonline.com/forum/viewtopic.php?inline_review*
// @exclude			*gaiaonline.com/guilds/viewtopic.php?inline_review*
// @exclude			*index_mini.php*
// @exclude			*/gaia/manga.php*
// @exclude			*photobucket.com/svc/jwidget.php*
// @exclude			*gaiaonline.com/profiles/?u=*
//
// This script is created by Selphie (Anorhc on Gaia).
//
// ==/UserScript==
(function() {

//----- [ Global Settings ] - Start -----

    // inject style sheet

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
	
	addGlobalStyle('#navicons a:hover {' +
						'background-position: 0 0;' +
					'}' +
					'#navicons a {' +
						'background-color: transparent;' +
						'background-repeat: repeat;' +
						'background-attachment: scroll;' +
						'background-position: 0 -32px;' +
						'-moz-background-clip: -moz-initial;' +
						'-moz-background-origin: -moz-initial;' +
						'-moz-background-inline-policy: -moz-initial;' +
						'display: inline;' +
						'float: left;' +
						'width: 32px;' +
						'height: 32px;' +
						'text-decoration: none !important;' +
					'}' +
					'#memberLoginBox {' +
						'z-index: 20 !important;' +
					'}' +
					'#navicons a:focus {' +
						'-moz-outline-style: none;' +
					'}' +
					'#navicons {' +
						'width: 162px !important;' +
						'margin: 0 !important;' +
						'margin-top: 5px !important;' +
						'z-index: 1 !important;' +
						'background-color: #f5f5f5;' +
						'border: 1px solid #aacbe8;' +
						'-moz-border-radius: 6px;' +
						'opacity: 0.0;' +
					'}' +
					'#navicons:hover {' +
						'opacity: 1.0;' +
					'}' +
					'.accountQuickLinks #shortcuts div a {' +
						'z-index: 10 !important;' +
					'}' +
					'#dailyReward {' +
						'position: relative !important;' +
						'left: 630px !important;' +
						'width: 100px !important;' +
					'}' +
					'a#navsubscribe {' +
						'background-image: url("http://www.divshare.com/img/2435737-fae.png");' +
					'}' +
					'a#navguild {' +
						'background-image: url("http://www.divshare.com/img/2435712-d2c.png");' +
					'}' +
					'a#navdress {' +
						'background-image: url("http://www.divshare.com/img/2435691-b66.png");' +
					'}' +
					'a#navforum {' +
						'background-image: url("http://www.divshare.com/img/2435710-5b9.png");' +
					'}' +
					'a#navmp {' +
						'background-image: url("http://www.divshare.com/img/2435717-5cb.png");' +
					'}' +
					'a#navshop {' +
						'background-image: url("http://www.divshare.com/img/2435724-bd9.png");' +
					'}' +
					'a#navtrade {' +
						'background-image: url("http://www.divshare.com/img/2435738-1d2.png");' +
					'}' +
					'a#navfriend {' +
						'background-image: url("http://www.divshare.com/img/2435711-d8f.png");' +
					'}' +
					'a#navEmail {' +
						'background-image: url("http://www.divshare.com/img/2435716-180.png");' +
					'}' +
					'a#navjournal {' +
						'background-image: url("http://www.divshare.com/img/2435713-646.png");' +
					'}' +
	'}');


    // inject Navigational HTML

	var navbar = document.createElement("div");
	navbar.innerHTML = '<div id="navicons" style="position: absolute; left: 791px; top: 60px; ">' +
	    '<a title="Gaia Journals" href="http://www.gaiaonline.com/journal" id="navjournal">&nbsp;</a>' +
	    '<a title="Current Trades" href="http://www.gaiaonline.com/gaia/bank.php" id="navtrade">&nbsp;</a>' +
	    '<a title="Friendlist" href="http://www.gaiaonline.com/profile/friendlist.php" id="navfriend">&nbsp;</a>' +
	    '<a title="Read/Write Messages" href="http://www.gaiaonline.com/profile/privmsg.php" id="navEmail">&nbsp;</a>' +
	    '<a title="View Subscribed Topics" href="http://www.gaiaonline.com/forum/subscription/" id="navsubscribe">&nbsp;</a><br />' +
	    '<a title="Dress Up" href="http://www.gaiaonline.com/avatar/" id="navdress">&nbsp;</a>' +
	    '<a title="Gaia Forums" href="http://www.gaiaonline.com/forum/?" id="navforum">&nbsp;</a>' +
	    '<a title="View My Guilds" href="http://www.gaiaonline.com/guilds/index.php?gmode=myguilds" id="navguild">&nbsp;</a>' +
	    '<a title="Marketplace" href="http://www.gaiaonline.com/marketplace" id="navmp">&nbsp;</a>' +
	    '<a title="Go Shopping" href="http://www.gaiaonline.com/gaia/shopping.php?" id="navshop">&nbsp;</a></div>';
	document.body.insertBefore(navbar, document.body.firstChild);
	
//----- [ Global Settings ] - End -----

})();