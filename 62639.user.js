// ==UserScript==
	// @name          Salta la ventana de regalos del zynga de Facebook
	// @namespace     http://userscripts.org/users/104041
	// @author        Joffrey  (Version modifiedo of ceejinc)
	// @description	  Quita los regalos del principio :D
	// @version       1.0.1
	// @include    http://apps.facebook.com/texas_holdem/invite_gifting*
        // @include    http://apps.facebook.com/texas_holdem/dmz_link_landing.php?src_track_str=Poker FB Bookmark Other %25ACTION%25 o%3ABookmark%*
	// @include    http://apps.facebook.com/texas_holdem/dmz_link_landing.php?src_track_str=Poker+FB+Bookmark+Other+%25ACTION%25+o%3ABookmark%3A*
	// @include    http://apps.facebook.com/texas_holdem/dmz_link_landing.php?src_track_str=Poker FB Profile_Box Other %25ACTION%25 o%3AWall%3A*
	// @include    http://www.facebook.com/home.php?ref=logo#/texas_holdem/invite_gifting.php?type=9&_fb_q=1&_fb_qsub=apps.facebook.com
// ==/UserScript==

location.replace("http://apps.facebook.com/texas_holdem/index.php?chkfeed=y");