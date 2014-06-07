// ==UserScript==
// @name           The Last Site Improvement Script
// @namespace      Renegade
// @author         Renegade
// @description    This script improves a variety of aspects of The Last's site, including, but not limited to, the infamous wrong header link.
// @version        18
// @include        http://lg15.com/*
// @include        http://www.lg15.com/*
// @exclude        http://lg15.com/lonelygirl15*
// @exclude        http://lg15.com/theresistance*
// @exclude        http://lg15.com/katemodern*
// @exclude        http://lg15.com/lgpedia*
// @exclude        http://www.lg15.com/lonelygirl15*
// @exclude        http://www.lg15.com/theresistance*
// @exclude        http://www.lg15.com/katemodern*
// @exclude        http://www.lg15.com/lgpedia*
// @exclude        http://lg15.com/lonelygirl15/*
// @exclude        http://lg15.com/theresistance/*
// @exclude        http://lg15.com/katemodern/*
// @exclude        http://lg15.com/lgpedia/*
// @exclude        http://www.lg15.com/lonelygirl15/*
// @exclude        http://www.lg15.com/theresistance/*
// @exclude        http://www.lg15.com/katemodern/*
// @exclude        http://www.lg15.com/lgpedia/*
// ==/UserScript==
var scriptVersion = "18";
var DEBUG = false;
if(DEBUG) console.time("Entire Script");

/*
	CHANGELOG:
	18:
	- Added episode response video list (FF only)
	- Added default nick saving confirmation in script options
	- Added handling for Quietus naming scheme
	- Added notification when Last Seen system is off
	- Fixed bug where the Theme Selector wouldn't get created for logged out users
	- Fixed bug where the Theme Selector wouldn't get created on the landing page
	- Fixed bug where the header would link to The Last on first refresh even if the Resistance theme was selected 
	- Fixed bug causing redirect to "random" profiles after login
	- Changed Last Seen system so LS data is refreshed when the system is activated, and removed when the system is deactivated
	- Changed text on empty blog/picture categories on profile to "Currently none."
	- Stopped ignore link from appearing on one's own profile page
	- Removed Community Shows list to decrease chance of cut-offs
	- Removed double slashes on profile card
	- Removed empty personal information categories from profile page
	- Deactivated title display in YouTube embeds
	- Improved social bar styling
	
	17:
	- Added The Last's recent Twitter message widget to sidebar (Firefox only)
	- Fixed bug that prevented Script Options from appearing
	- Toned down nav bar hover color
	- Prettified Script variables display on profiles
	
	16:
	- Changed additional chat link from Mibbit to FreeNode web chat, since FreeNode blocked Mibbit >:|
	- Added Last seen: display
	- Improved leading/trailing space handling for BBCode parameters
	- Fixed up board page as much as possible
	- Worked around an obscure bug where the script would insist on setting an empty theme rather then reverting to The Last's.
	  (Added handling for lg15.com_theme being empty)
	- Firefox only:
		- Added option to save a default chat nick and forego the nick entering procedure
		- Added ignore system for posts
		- Added smiley/bbcode insertion at cursor position
	
	15:
	- Significant refactoring for ease of coding and cleanup
	- Fixed non-working smileys
	- Fixed videos overlaying social bar problem
	- Fixed header on the Profile -> Videos pages
	- Added smiley/BBCode-selection box
	- Added automatic image resizing
	- Added The Last-based image in dashboard
	- Added persistent theme changing
	- Removed superfluous "(LG15: The Last)" in episode titles
	- Centered wide videos
	- Increased forum textarea width
	- Simplified URL-parsing to account for pedia links
	
	14:
	- "Fixed" current week display for 7+ letters
	- Added show links to search pages
	- Added show links to profile comment boards
	- Fixed BBCode not being parsed on inline refresh
	- Links to the daily episodes in the week header
	- Added more community links to the community page
	- Added LG15 and KM to exclusion list
	
	13:
	- Fixed The Resistance logo in sidebar (shi not happy...again)
	- Fixed The Last logo in header
	- All comment boards except for the newest one are hidden by default
	- Comment boards can be shown/hidden at will
	- Automagic comment board refreshing through AJAX
	- Added The Last link to profile pages (victim of organization: "My Dashboard")
	- Added refresh-less comment posting from the main page
	
	12:
	- Fixed link colors in comment space
	
	11:
	- Fixed show link hover background colors
	- Fixed sidebar
	- Fixed trailer's background color
	
	10:
	- Complete smiley set
	- Styled input boxes (forgot those were not dark for everyone)
	
	9:
	- Tweaked comment colors
	- Added [color=] bbcode
	- Added chat link with automatic nick detection to user bar
	- Fixed pedia-link ampersand escaping
	- Increased CSS injection flexibility
	- Added [quote=] tag
	- Made thread titles appear in browser title for non-The Last forums
	
	8:
	The "Shi is not happy" edition xD
	- Added bigger Resistance graphic to the sidebar
	- Fixed dashboard position
	- Slightly lightened comment boards text
	
	7:
	- Different Resistance logo in the sidebar
	- Added some basic bbcode ([i], [b], [s], [size], [list], [url], [img])
	- Slight improvement to the favicon
	- Completely redesigned the front page comments
	- Week selector jumping tweak
	
	6:
	- Centered video embed in post
	- Added slight border around video
	- Tweaked video poster border color
	- Slightly more efficient page/series checking
	- Automatic LGPedia links on video posts
	- Tweaked current week marker border color
	- Added link to The Resistance under Past Shows
	- Potentially fixed Safari issues
	- Added version number to footer
	- Added graphical smileys to the forums/boards
	
	5:
	- Fixed forum show renaming conflict
	
	4:
	- New, better favicon
	- Slightly cleaned up code
	- Improved week navigation style (less flashy)
	- Improved post body style (reduced contrasts)
	- Added The Last link on /community and renamed Resistance link
	- "discussion" link on /community leads to community forum section
	- Forum does not have redundant "discussion" link anymore, instead has links to the shows
	- Where do forum links go now?
		> Forum -> always leads to the very top
		> discussion on The Last pages: The Last forum
		> discussion on Resistance pages: The Resistance forum
		> discussion on /community: Community forum
		> discussion on any forum: Removed, replaced by link to The Last
	
	3: 
	- Added weeks to page title
	- Made show link link to The Last
	
	2:
	- The Last has its own favicon
	- "discussion" links directly to The Last's section
	- Discussion area page titles now include current location (e.g. category title, thread title)
	
	1:
	- Fixed The Last header link
	- Fixed The Last title
-------------------------------------------------------------------------------
	TODO (ignore this section >_>):
	- Poster nick (expanded with character name)
	- fancy week changing through ajax/url replace
	- Post preview
	- comments pagination
	- preparation for proper forums
	- Error 436 page (pry out /community/)
	- change community page logo
	- Fix image resizing in the profile -> blogs column
	- Replace Amazon Ad with Quietus Ad
	- Fix & handling in anchors

	v19:
	- Male/Female profile fields
	- Try adding login fields
	- Statuses (Twitter or direct input, ask Shi)
	
	Thanks to Shiori, ThatFreakinRandy, modelmotion, cittiecait, kitsaber691 and Izabe_Cause for their feedback and their help! :)
	Very special thanks to D
*/

// States & conditions
if(DEBUG) {
	console.group("Startup + Styles");
	console.time("States and conditions");
}
var theLast = false; // all redundant, but makes me feel safer in case there are parser errors down the line // tadaa - not redundant anymore
var episodePage = false;
var forumPage = false;
var theLastForumPage = false;
var communityPage = false;
var profilePage = false;
var searchPage = false;
var boardPage = false;
var myVideosPage = false;
var editPage = false;
var phpBBPage = false;
var hasPosts = false;
var betaTest = false;
var loggedIn = false;

// custom pages first
phpBBPage = (document.location.pathname.search(/\/thelast\/forum\/?/i) != -1);

if(!phpBBPage) {
	var pageSeries = document.getElementById("global-show").getElementsByTagName("span")[0].firstChild;
	theLast = (pageSeries.nodeValue.search(/(lg15:)?.(the)?.last/i) != -1);
	episodePage = (document.getElementById("show") != null); // (document.getElementById("episode") != null) <-- old
	forumPage = (document.location.pathname.search(/(category|categories|bbsposts)\/(view|list)/i) != -1);
	theLastForumPage = (document.location.pathname.search(/(category|categories|bbsposts)\/(view|list)\/27\//i) != -1);
	communityPage = (document.location.pathname.search(/\/community\//i) != -1);
	profilePage = (document.location.pathname.search(/(user_profile|myfriends|albums|blog|youtube_video_list)/i) != -1);
	searchPage = (document.location.pathname.search(/\/search\//i) != -1);
	boardPage = (document.location.pathname.search(/\/board(?:_desc)?\//i) != -1);
	myVideosPage = (document.location.pathname.search(/\/youtube_video_list\//i) != -1);
	editPage = (document.location.pathname.search(/\/edit\//i) != -1);
	hasPosts = (document.getElementsByClassName("ugc-wrapper") != null);
	betaTest = (document.location.hash == "#betaTest");
	const USER_LINK = document.getElementById("u-social-user").getElementsByTagName("a")[0];
	loggedIn = (USER_LINK.firstChild.firstChild.nodeValue != "+");
}

if(DEBUG) {
	console.timeEnd("States and conditions");
	console.time("Constants and globals");
}

// Constants
const HEAD = document.getElementsByTagName("head")[0];
if(document.getElementById("show-resistance")) const HEADER_LINK = document.getElementById("show-resistance").getElementsByTagName("a")[0];
const LATEST_BOARD = "24";
const iLATEST_BOARD = 24;
const SAFARI = (navigator.userAgent.search(/Safari/i) != -1);
const SITETEMPLATE = "http://www.lg15.com/categories/list/27/1";
const THELASTPHPBB = "http://forum.the436.com/viewforum.php?f=22";
const BASE_PROFILE_URL = "http://www.lg15.com/user_profile/view/";
const CARD_THELAST = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%B8%00%00%01%03%08%06%00%00%00G%C7%11%05%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%06%0E%0D%0B0%5B%8F%1F%E0%00%00%00%25tEXtComment%00Created%20by%20Renegade%20with%20GIMP%A1-%04t%00%00%20%00IDATx%DA%ED%7Dk%AC%2C%D9U%DE%B7%EB%D1%8F%F3%3Ew%EE%18%7Bl%C6%9E%19%18%E3%18!%02%248%04%F0%83%87%88%C1%E0%00%22%D8%C6%C1%20%84!%16%04%08%10%05%1B%CB%40P%92%09%02%F3%08%B2c%08D%81%08%81%810%100%08%01%9E%11%20%FC%08H%190%91!!%C1cf%98%99s%EF%E9gu%D7c%E7%C7%E9%DDww%9D%EA%EE%AA%EE%AA%DA%B5W%AD%25%8D%E6%DEs%FBt%D7%EAo%7Fk%ED%B5%F6Zk%0B%EC%207ON%24J%14%DF%F7!%A5%84%10%02q%1C%23%8Ec%08!%60%A3H)%E1%FB%3E%00%40%08%81%24I%10E%91%B5%FA%AC%D3%D1u%5D%B8%AE%0B)%AF%96B%18%86V%EB%D8%06%DC%98o%CC7%9Bq%7Bz0(%AC%B0g%C2%A1%E9Jz%DE%9DGH%92%04q%1C%5B%BF%10%85%10%90RBJi%B5%3E%EB%C4q%1C%B8%AE%BB%5C%9Ca%18%920%20%D4qc%BE1%DFl%C6-%ED%87%F28%3Ca%C2%B1%AD%DB%95DQd5h%8E%E3%C0%F3%BC%15%7D%D4N%99%92(%23)%84%40%14EH%92%C4%EA%08%A0%0D%B81%DF%98oTq%DB%E4%E8%1C%13%CEM%81%A5%C8%A6R%25Ja%1BE%E9%A3%87%DCT%8D%A4%10b%A9%A3%CDdk%0Bn%CC7%E6%1Be%DC6%F9*Q%B7cS%C0Q%CA%9B%AB%D4%8F%FE%FC%B6%E7%C8%F3%EC%BC(%9C%03P%C7%8D%F9%C6%7Ck%13n%E9h%CE1%B9%2BQ%7F%A7p%0E%E08%CEJ%1A%81%9A%A4w%5E%B6%9Fu%B4%057%E6%1B%F3%AD%CD%B89uFojW%92%3E%07%B05%B5%A0%9E%3B%5D%DDD%F5%1C%40%E9%14%C7%B1%F5%E7%00m%C0%8D%F9%C6%7Ck%1Bni%1F%E6%D4%E5%DC%B2v%25%B6%E7%CD%85%10%2B%07%C0I%92%2C%FFL1%02%D0%2B%9El%3F%07%A0%8E%1B%F3%8D%F9%D6V%DCt_%E6%D4%05%DA%BA%12e%9Bw%25%CAx%E8%FAP%13%C7q%96i%05%15%01%D8~%0E%40%1D7%E6%1B%F3%8Dq%D3%1C%5C%1D%D1%5B%FAp%D1%F6%5DIz!%DA%AE%CF%A6%C5%A9%D2%0A%B6W%DE%B5%057%E6%1B%F3%AD%ED%B8)%9F%E6%D4%01%9A*sM%E7_m%5D%84%002%CF5%A8%89%EF%FBdJ%94%DB%82%1B%F3%8D%F9%C6%B8%A5%22%B8*E%E5_%D3%A4%B3y%F7%95%D6%C7%F6%DE%94%AC%C5%E98%0E%B9%09%11%D4qc%BE1%DF%18%B7%1A%1D%5CV%FE%D5%F6%E9%09%E9%92k%8As%EF%D2%A3%81%14%D9l%3F%BF%A1%8C%1B%F3%8D%F9%C6%B8%AD%CA%CD%93%13%E9Ty%FEF-o%9E.u%A5%3A%8C7%7D%0E%A0%AA%9E%18%B7f%0B%F3%8D%F9%C6%B8%D5%10%C1)%C5T%17%BEj%EA%B3%3Do%AE%EBC%E1%008%0B7%3D%AD%60%7B%E5%5D%9Bpc%BE1%DF%18%B7%9A%1C%5C%96%92%B6%1F%98%A6%FB8%A8Uq%E9%93%06%D49%00%85%12e%EA%B81%DF%98o%8C%DB%06%5ET%05%5Cz4%90%ED%D3%AF%A9%E8%B3N%C7%F40%5E%0Ad%A3%8E%1B%F3%8D%F9%C6%B8%D5%1C%C1Q%CC%9BS%EBM%D9%14%01%00X%96(%DB.m%C0%8D%F9%C6%7Cc%DCj%8C%E0%B2%F2%AF6%13N%F5%A6(%D0(%96(%EBM%C1Tv%CC%D4qc%BE1%DF%18%B7%1A%238%BDD%99B%DE%5C%D7%87%CAL%B8ui%05u%0E%A0%22%00%DBu%A2%8E%1B%F3%8D%F9%C6%B8%D5%18%C1%A5%AFB%A0r%0E%A0%97%5CS%BCo*%EB%1C%C0%E6%08%A0%0D%B81%DF%98o%8C%5B%CD%0E%0E%C0%B5%5D%89%ED%A9%12*W%8Cl%D3Q%E9D%E1%B6%E0%B6%E0%C6%7Cc%BE1n5%3A%B8t%FE%D5%F6%5D%89%9E%23%B7%FD%8A%91m%11%00%95%E2%846%E0%C6%7Cc%BE1n5%3A8%BD%EFA%AF%9E%B1%FD%1C%80%D2B%CC%12%8A%25%CAm%C0%8D%F9%C6%7Cc%DC%0Af%3A%F6QR%E5_U'%BE%CD%C0Q%ECM%C9%D2Q%19%C9tS%B0%CD%3AQ%C7%8D%F9%C6%7Cc%DCj%8C%E0%94bz%2F%87%EDys!%04%7C%DF's%00%BCNGj%25%CAm%C0%8D%F9%C6%7Cc%DCj%8E%E0%F4%91%2Cj%A7B%A1D%99%C2%5DL%9B%8C%A4%8E%17%A5%12e%AA%B81%DF%98o%8C%5B%8D%0EN%1F%0DDa%86ZVo%0A%C5%BE)%3D%02%A0r%25G%1Bpc%BE1%DF%18%B7%9A%1C%5CV%FE%D5%F6C%EEu%BD)%D4%8C%A4N6%DBG%03%B5%097%E6%1B%F3%8Dq%DB%23%F3QtW%92%CE%BF%DA%9CZH%E7%C8%A9%A6J%D2%E7%00%B6%1F%E6%B7%017%E6%1B%F3%8Dq%AB1%82%A3%967%CF%BA%26%9E%EAm%C1%D4F%03Q%C7%8D%F9%C6%7Cc%DCjvp%14G%03)%03%A2%16%22%8F%06b%DC%9A%22%CC7%E6%1B%E3V%83%83S%3B%91%AC%D1%40%B6%82%A6%0CH%1B%AE%E4%D0o%0B%B6%3D%02h%03n%CC7%E6%1B%E3V%22%26%DB%5E%90%95%7F%A5t%25%87%94%92%E49%80%9EV%A0%B2c%A6%8E%1B%F3%8D%F9%C6%B8%D5%E8%E0%D2%25%CA%B6%03%B7n!R%93t%892%B5s%00%AA%B81%DF%98o%8C%5B%C9%D8%DCu%7C%2C%B3%00%D3E%1D%9C6Q%C9%22!%B3%02L%E5%95m%09%B9%F3%3E%A3%BE%DB%D2%CF%03%9A%7C~S%E4%FB%A7%8E%1B%F3%8D%F9%C6%7C%2BW7%F1%E0%7D%F7I%F5%8Fa%18b%3A%99%5C%9BP%AE~%B1I%A0%E9%93%02%FA%07%07%E8v%BB%99%CF'%A5%C4%7C%3E%C7d2%81%D4%D2%3D6%A4%7Dt%E2%F4%0F%0EVR%06%BA%24I%82%20%08%10L%A7%2BX5%11%B7%F4z%EA%F5%FB%E8%F5z%2BwJ%E9%AFK%AF%C9%26%EA%B3%0Bn%CC7%E6%1B%F3%ADz%DC%C4%83%F7%DD'%D3%8B%2FI%12%0C%87CD%0D%BEtP%08%81%A3%E3%E3k%3D'%FA%F3%A6%8DF%12%C7%18%0E%87VT%A4I)%E1%F9%3E%8E%8F%8FW%16%E36%1D%C3%F9%1C%A3%D1%A8%F1%BB%AD%A3%A3%23%F8%9DN.%EClY%93yqc%BE1%DF%98o%F5%E0%B6%8C%E0%B2%24%98N1%1E%8F%1B%B7%93%ECv%BB8%3C%3A%DA%F9%B9%26%E31%A6%D3i%A3%D3%08%87%87%87%E8%F5%FB%3B%EDd%92%24%C1h8l%DC%ED%BARJ%F8%BE%8F%A3%C5b%DCeW%DF%C45%B9%2Fn%CC7%E6%1B%F3%AD%1A%DC6%B6%09%F4%FA%7D%1C%9F%9C4%26%FF*%A5D%B7%D7%C3%D1%F1%F1%5E%EFqpx%88%83%C3%C3F%E6%95%A5%948%3E9%D9%C9H.%C3r!prz%BA%9C%82%D1%24%B2%9D%9C%9E%AE%3CgQi%DA%9A%2C%037%E6%1B%F3%8D%F9V%0Dn%5B%FB%E0%3A%9D%0E%8E%8F%8F%8D%2B(%A5D%A7%D3%C1%D1%D1%D1%5E%F9%7C%F5%7B%FD~%1F%07%07%07%8D%02NJ%89%E3%E3ct%3A%9D%BD%D3Ij%01%E8%FDT%26%F5r%1CgI%94%7Dw%83MY%93e%E3%C6%7Cc%BE1%DF%CA%C5-W%A3w%A7%DB%85%DF%E9%18UP%94%08%98%D2%AB%7Fp%B0%D2%C8h%7C%C7%D5%E9%A0%D3%ED%96%F2%3C%AA%20%E0%EC%FC%DCxzA%7F%8E%B2%B0k%C2%9A%AC%027%E6%1B%F3%8D%F9V%1En%1B%CF%E0%D2o%7C%EB%E2%A2%B2%07%FF%8E7%BF%19%2C%ED%95%9F%7C%C7%3BvZ%ECU%AE%C9%BCr~%E3F%E9F%CD%A4nRJ%9C%9C%9C%C0%2F!%22MK%92%24%B8%7D%EBV%23%D6%5C%15%B8%01%C0t2%C1d21%E2%E8%A4%94888%40%FF%E0%A0%92%F7%B6%8Do%B9gQ%0A!J%DB%ED%B0%B0%94%B5S5%B9%26%D5%CE%B6%0ACfJ%B7%E5%ED%E1%BE_%19f%8E%E1(%AEJ%DC%00%ECu%0E%DB%E4%CF%B7%91o%85%EE%83%EB%F5zlUY%1A%25%A6%D7d%95%9FoJ%B7%83%83%83%CA%8C%BF%10%02%07%86%1D%40%D5%DF%AD%10%02%BD%5E%CF%C8%E6%A4%D7%EBU%1A9%DA%C6%B7B%F7%C1y%9EW%CB!%EAw~%E7w%B2%E5n%81%3C%F4%D0C%7B%BFG%5Dk2sw%E88%F0%3C%AF%B2%F77%A1%9B%10%02%DD%8A%8DX%A7%DB%850%D8%3BV5nJ%C7%20%08j%D7%AD%D3%EDV%FA%FE%B6%F1%CD%D9EA%16%96%26%89%A95Y%C7%E7%D6%AD%5B%5D%E7F%8Ev%05%0BE%DC%B2%26%85%D4%E5%04%98o%7B88%D7%E0%C2dai%D2%9A%AC%E3sM%E9V%F5%0E%DD1XiX%C7wj%AA%92R%1F%19%C6%7C%03%BC%A2%C3S)N%03g1%2F%BB%92%D2%E4%9A%0C%C3%B0RcbB7u-J%95i(5%FD%C3%94T%8D%1B%00%24%86%0A1%E2(%82Wa%C3%B9m%7C%F3%06%97%97%85%16%BF%CD7%0B%B34W%06%83%81Zd%85%0D%B2%A95%19E%11n%5D%5Cd%EF%2C%D7%3DO%01%FDL%E8%26%A5%C4%ED%5B%B7%B2%D3A%25%E8%04%002I%10%1B%BC%5B%ACj%DC%00%18Y%93B%08%0C%06%83%E5%95K%95%60g%19%DF%BC%B3%F3%F3B_%E0%ED%5B%B78%8Ac)%5D%CE%CE%CEv%26%B5%A95%E9y%1E%CEn%DC(l%24%9A%AC%9B%10%027%EE%BA%ABR%03%26%84%C0%C53%CF%18%8B%E2%AA%C6M9%B8%5B%17%17%B5oN%CE%CE%CF%2B%3D%23%B3%8Do%DEt%3A%CD%F3%CD-%3Dh%D8%F0%E9%D2%2CvJ%AEu%D8%B05%19E%11.o%DFF%C7%F7%D7%EF%90w%B3T%C6t%93R%E2%F2%D6%AD%ABJ%C7%B2%0B%16%A4%84%04%10%85%A1%D1LPe%B8i%3A%CE%82%C0L%04wy%89n%AFwu%C6IdM%EE%83%9BW%A4%AF%20%0CC%CCf3%B6%C6%2C%A5%CB%AE%FD5%A6%D7d%BF%DF%87_QS%B4)%DD%FCn%B7%92I%18J%02!0%9F%CF%8D%AE%B7*qS%C681%A0%A3%E7%FB8%A8%10%3B%DB%F8%E6M%C6%E3%DC%3B%3B%D3%8B%92%85%AE%E4%5D%87M%5B%93%A3%E1%10%9E%EF%C3-9%DA1%A9%5B0%9D%22%8A%22%B8%8ES%C9%08%B2%26l%92%AB%C2%0D%B8JO%CE%E7s%23Q%CE%7C6%C3%20I%B2%CF%E1%2C%5E%93%BB%E2%E6%E5m%0C%8C%E3%18%B3%D9%8C%D3%93%2C%95%C8.%0D%AA%A6%D7%A4*%C9%F6%7D%BFt%83bJ7%A5%93%EB8%E5%8F%B3%92ryvc%D2%8ET%89%9B%94%12q%D1t%7B%05%FAU1%8A%CCF%BEyq%1C%E7%02m%97%1D6%0BK%11%F2%145%24MY%93%93%F1%18%07%87%87%A5%11%DF%B4nB%08%04A%00%C7q%AE%1A%87K%D4%ABI%97g%96%8D%1B%A4D%9C%24%C6%A27%85%DD%7C%3E%87%E3%BA%F0%5C%B7T%ECl%E4%DB%C6%3E8%09%40H%89%20%08J%BB6%83%85e%1D%81r%BD%AE%81kRJ%89Y%10%5C%ED%9A%AF%AC%CCn%EF%D30%DD%82%20%B8%9Am%B8g%1AOJ%09%81%1D%0A%89%2C%C1MI%12%C7F%C6se%C9%2C%08%20z%BD%BD'%C6%D8%CE7%2F%D9%B4s%16%02%C1l%86%84%7B%DFX*%96%24o%04%D7%C05%A9%9A_e%92%A0%D3%EB%01%BB%96%BF7H7%D5%8C%3D%9DN%D1U%03%7C%F7(%AB%0Ff3%24%06%7B%DF%AA%C6-I%12%CCg%B3F8%01%95%CA%0B%82%00%9DN%E7%CA%C9%ED%8A%9D%E5%7C%F365%00%CE%D9%B9%B1%D4%B7j%F3l%DD%1A%BB%26%85%10W%E9%A9%D9%0C~%A7S%FC%F9%1A%A8%9B2%94%F3%D9%0C%BE%EF%EF%14%0D%A8%DFo%9As%2B%0D7%5C%A5%D7%C3E%F1E%93%B0%03%80%F9%7C~uf%B5Ko%1C%01%BE%ADDpjA'I%820%0C%1B%05%18K%3B%238%9B%D6%A4%10%02q%1C%23%9EN%AF%1C%C2%A2%0Aq%5D%FA%D5%06%DD%D43%CEf3%B8%AE%0B%CF%F3%B6%CE%3B%5C%EA%15%C7%08%1BPTR6n%BA%8EQ%145~%BA%D3%7C%3E%87%13E%F0%7D%3F%3FvD%F8%E6e%95%7D%AA%17%B0sc%A9%93%84%DB%22%01%1B%D6%A4%22X%91fX%1BtS%C6%A4%C8%F4%11%9B%CE%EDw%C1%CD%16%1DU%BA%B9H%89%3F%15%BEy%9B%C2%5B%16%96%26-d%AA%CFj%93%13%A0%8A%D9%AE%CF%CB%D85%5B7%07%2C%2C%2C%2C%2C%2C%04%85%1D%1C%0B%CB%0E%A2R8%D2%D0%B5(%A6%F4e%DCXG%9Btb%07%C7%C2%B2%03%D9%1C%C7%C9uh%CFz%B2%3Eu%8B%10b9%ED%83%82%8E%FB%E0%C6%0E%8E%85e%07%03%E2y%DErl%10Uc%E98%CE%D2H*%3D%19%B7%E6%3B%03%A5%A3%EB%BA%24%9C%DC%3E%B8%B1%83ca)h%40%D4%85%8B%AA%3A%8D%E2%94%1F%A5%A7%D2-%8Ec%AB%0De%1BpS%3A%0A!V%CA%FDm%D6q_%DC%D8%C1%B1%B0%14%20%9B%9A%CF%A8%8C%3D%C5%1B%EEU%14%40%C5P%B6%017e%F4u%1D%A3(%B2~S%B2%2Fn%EC%E0XXvH%95%2C%C7%05%11Lq%E9%86R53%DB%ACg%1BpS%3A%AAM%09%85%08%B5%0C%DC%D8%C1%B1%B0%EC%98*%B1%3D%FD%B3%C9%A8%A8%3F%2B'gs%F4F%1D7%85%8F%8E%97%BA%96%A8%ED%7C%F3%C0%C2%C2R(%AA%01%AE%D2%3F%14S%93%E9qG6%EB%D9%16%DC%B2%22%1D%DB%CF%DD%CA%C2%8D%238%16%96%1C%06%C4%F7%FD%95%82%0B%AAz%EA%86%D2%F6s%AA6%E0%A6%17%03%01XF%3A%CC7vp%2C%2C%B9%0D%88%12%AA%A9Ij%86%B2-%B8-%2F%A5%05HlJ%CA%C6%8D%1D%1C%0BK%0E%03B%25%AAY'%AE%EB%922%94m%C0-%DD%CAA%A1x%A6l%DC%D8%C1%B1%B0%E44%20%B6%F7%82%AD%D3Q%19%16*%86%B2-%B8Qj%E5%A8%0A7.2aa%D9b%40%D4%DF)%A6%B8%00%5C%D3%D3%F6%AAI%EA%B8%A5%AB%26%D5%A6%84%F9%C6%0E%8E%85%25%B7%01%C9j%9A%A5f(%D3U%936_t%DC%16%DCT%11%86%12%15%E9P%ABv-C'NQ%B2%B0d%18%10%BD%17L%15%5BP%EFyS%D5j%B6%EA%D9%06%DC%F4%22%0C%15%E5P%A8v%AD%0A7vp%2C%2C%1B%A2%1A)%25%F9%F2re()%8C%E3%A2%8E%1B%B5%E2%99%AAqs%9A%A2%24%0BKS%C8%96%3E%E8%A6%DA%D0%AD%0C%0B%60%F7l%C66%E0%A6l%24%B5%01%D8U%E3%C6%11%1C%0B%8B%26z%2FX%1C%C7%D67%CD%E6%D5%D3%F6Mf%1BpS7%05(%E7%40%A1x%A6j%DC%1A%E1%E0T%FE%95%85%C5%E4nR%2F%BB%06%40%BEj%92%C2l%C66%E0%96%9E%AAO%A5%95%A3%0E%DC%1C%D3J%EA%0A%B2%B0%98%5C%87%94%AE%1A%D9%C67%7D%D7%CC%B8%D9%11%E9%00XIMR%AC%9A%2C%5B%8C%3A8%BDz%86%85%C5%E4%3AL%CF%BE%A3x%89i%BAZM%F5N%D9%5C5I%1D7%15%E9%A8%3F%AB%22%0Cj3B%AB%C2%CD1%09%9C%BE%2Baa1%B5%0E%F5%D4%0F%F5%AAI%C57%0A%B3%26%DB%80%9B%5E%0CD%A5%A1%BBN%DC%1C%D3%C0q%05%25%8B%E9%DD%A4%3E%DCU%ED%8E%A9%0E%E5%A5r%A3u%1Bp%CB%1A%80M%E1%12%D3%3AqsL%03GaW%C2b%AF%01Q%D7%C3(%B2Q%AC%BE%A36%94%B7%0D%B8)%CC%F4%AAI%0A%F7%BC%D5%8D%9BgJ%C9%F4%EC%3B%16%96%BA%85b%D9u%5E%BE%D9%AC'u%DC%14%3E%D4%82%00%13%B8%D5%1E%C1%B5%A5%EA%89%A5%F9F%24%9D%B2%A3%B8%0E%A9%F1%AD-%B8%E9%C5w%14%EE%B23%85%9BW%B7%92jH(%E5j5%96%E6%93%CD%F7%FD%95%FE%1B%AA%D1%1B%25%BE%B5%017%3D5I%E5%BC%D4%24n%9EI%E0%A86%D2%B24%7F'I%A5%17%AC-%7Ck%03n%E9%FE0%FD%BC%94q%DBM%9C%3A%81%E3%C2%12%16%D3%A2z%C1%F4%1E%1C%F5sj%86%92%12%DF%DA%80%5B%D6T%7D%DB%83%00%D3%B8%D5v%06%97%BE%96%83%CF%DDXLE5i%03BQ(%F1%AD%0D%B8%A5%A7%3AQ%E8%EBk%02nN%5DJ%A6%AFC%E0%D4%24%8B%09%B2Q%EA%05k%03%DF%DA%82%5BV%A4c%7Bj%B2%09%B89U%2B%99N%95P%3C%EF%60%B1cw%9C%BEG%8B%EA%ACI*%7Ck%13n%3Af%14%06%607%05%B7%CA%8BL%D2%BB%12.%2Ca1!%E9%5E0%AAY%04j%7C%A3%8E%9B%1E%E9(%A1%A0cSp%F3%AA%06%AE%0DF%85%A5%D9%06%24%5D%C5e%FBD%886%F0%AD%0D%B8%A5%23n%E5%DC%A8UM%9A%C4%CD%A9%138%16%96%BA%25%7D%B6%A1%E6%F9Qsn%D4%F8%D6%06%DC%D2U%93%00%C8UM%9A%C6%AD%B23%B8%B4%92%9C%9Ad1%15%D5%A4'%97SOMR8%C3%A1%8E%9B2%FAz1P%18%86%D67t7%0D7%A7*%25)%0D%09e%B17U%A2%CE6%A8%AECj%7Ck%0Bn%E9%3B%D1%A8%8C%E2j%1AnN%15%C0%A5%AB%B8%D8%B9%B1%98%90te%1A%D5Y%93%D4%F8F%1D%B7%F458T%EE%B2k%22nN%95%C0Qn%A4e%B1%2B%AA%A1%DC%F3F%85om%C1M%8Ft%D4%94%19%0A%A9%C9%26%E2%E6%94%A9d%FA%F6Y%8E%DEXL%A5J%D2c%AA(%3A7J%7Ck%03n%EA%AC-%ABj%92%F9%D6%60%07%A7%00%D2%81%E3kpX%9A%90*%A1%DA%18L%91o%D4q%03%EE%F4%87Q%A9%9Al%3An%A5%F4%C1%A9%D2P%EA%97G%B2p%AA%A4%09B%8Dom%C0-%3D%DDC%DF%940n%0D%8E%E0%F4!%A1*%04%E7%9B%02XL%19%90tTCUO*%7Ck%0BnY7%05%D8%EE%DCl%C0%CD)%0B8%BDzF%FD%9C%85%A5n%03%92%AE%E2%A2%3E%94%D7v%BE%B5%017uN%A5%FEL!B%B5%057%A7%0C%E0%D2%8D%7D%2C%2C%26%0C%88%1E%D9P.%2C%A1%C2%B76%E0%A6G%3AT%8A%EFl%C2m%2F%07%A7%AAg%94pC7%8B%A9%DDd%3AUBq%1DR%E3%5B%5BpS%91%0E%80%E5%00l%E6%5B%83%1D%5CV%15%17_b%CAbj7%99u%8F%165%1D%A9%F1%AD%0D%B8)%E7%A6G%3A%14%26%96%D8%84%DB%CE%11%9C%1Er%03%E0%AAI%16%23d%D3%D7!%E5%EA%5DJ%7Ck%03n%E9Y%93*%D2%A1p%B3%BAM%B8y%BB(%A9%1AL%15Xa%18.%C1da%A9%8BlY%A9%12%AA%05%0AT%F8%D6%16%DC%D4%ACI%25%14%AE%C1%B1%117g%17%E0%D49%00WM%B2%984%20z%D9%B5%AAN%A3X5I%89om%C0M%AF%9AT%7F%A7R5i%1Bn%CE%AE%C0Q)we%B1w7%99%EE%05%A3Z5I%85om%C1-%EBn%3E%DB%CF%DDl%C5%AD%90%83%D3%AB%B8%A8%CE%F8c%B1g7I%FD%C6%0Aj%7Ck%03nYE%18%14%AA%26m%C5%CD)%02%9CN6%AE%9Ad1e%40%F4Ry%AA7VP%E3%5B%1Bp%CB%1A%5DE%A1j%D2f%DC%9C%A2%C0%E9Wsp%F4%C6b%22%AA%D1%9B%9D)_%83C%89om%C0M%E9I%A9%F5%C1v%DC%9C%3Cd%D3%87%84%0A!%10%86!Go%2C%B5%1B%7D%80%FE%8D%15%D4%F8%D6%26%DC%7C%DF_%9EU%A9H%C7%E6%F3R%0A%B8%E5j%13%D0'%97S%9D%F1%C7%D2%7CI%A7%7F%A8%AECj%7C%A3%8E%9B%3E%BA%8A%DA%CD%EA%B6%E3%E6%15M%95pa%09%8B)%03B%BD%F7%92%1A%DF%DA%82%5B%BA%08%83%C258Tp%DB%9A%A2%D4Cm%1E%A4%CCb%92t%E9uHq%A3E%8Dom%C1MmDlOMR%C3%CD%DB%B63Q%E09%8E%C3%85%25%2C%C6v%C8mX%87%D4%F4l%93%FDH%92%84LtJ%097%2F%DDq%9F%95k%D5s%CB%2C%2CU%ED%18%B7%91%CE%A6u%A87%C7%AE%7B%5E%1B%F9V%A4%C8%40%3D%BFm%F6%23%AF%8Ei%CC%A8%E9F%81o%DE%D9%F9%F95%C2%8D%86C%84a%C8%0E%8D%A56%B9q%D7%5D%99%8B6%0CCL%26%13%24%16%1D%DAK)%D1%E9tpxt%94%CB%C1%D9%C27)%25%20%04%FA%FD%3E%BA%DD%EE%CA8*%FD5%F3%F9%1C%93%C9%04%D2%C2%9D%BF%94%12%8E%EB%E2%E0%E0%60Y%15%99%15%AD%05A%80%60%3A%B5%C6%B9)%C7%D6%EB%F7%D1%EB%F5%D6bG%8Do%5E%96%D7%3E9%3DE%14E%18%0E%06%9C%96d%A9%3D5%B244%8E%83n%B7%8Bn%B7%8B(%8A0%1A%8D%107%B8%E8B%3D%F3%C9%E9%E9rn_%9E%5D%B2-%7C%3B%3A%3EF%A7%D3Y%A9%AC%CB%C2%AC%D7%EB%A1%DB%ED%22%0CC%8C%C7c%2B%8C%A5%94%12%AE%E7%E1%E8%E8h%05%BB%2C%1D%5D%D7%C5%E1%E1!%0E%FA%7D%04%B3%19%26%93%09%9A%AC%9D%04ppx%88%5E%B7%0B%A1%8D~k%03%DF%D6%16%99%B8%AE%8B%B3%F3s%F8%BE%CF%3Do%2C%B5%3A%B7%AC%BF%7B%9E%87%F3%F3s%F4%FB%FDF%AEG%D5%07uv~%BE2%F9!%AF4%95oj%F4%D4%F9%8D%1B%E8v%BB%1B%D3r%E9%7F%EBt%3A8%3F%3FG%B7%DBm%B4%0D%91R%A2%DF%EF%E3%FC%FC%FC%9A%A1%DC%B8.%17%D1%EC%F9%F9%F9J%C5a%D3%1C%80%E2%0DrbG%89o%CE6%83s%7Cr%D2H%F0X%DA'RJ%1C%1C%1E%E2%E8%F8%B8qN%C0q%1C%1C%9F%9Cd%1A%8B%22%0E%BEI%7CS%A9%9F%93%D3%D3%BD%DE%E3%E8%F8%B8%D1%86%F2%E8%F8%18%07%87%87%85%9FO%3Fc%3C%3D%3B%5Bi%8AnDD%EA%BA8%3D%3B%5By%CE%B6%F1%CD%C9%93B9%3B%3F%E74%25Kc%16w%B7%DB%C5%D1%D1QcH%A7sd%1F%9E4%8Do%BE%EF%EF%E5%B4%D5%EF)C%D9%EB%F5%9A%E7%DC%8E%8E%F6%8E0%15n%A7gg%99g%5B%26%C4q%9C%A5s%DBg-%D9%CE7'%EF%1B6%CD%8B%B3%B4S%94%C1%EC%F6z%F0%1A%90%CES%11%40%99%0E%A9)%7C%3B%3E9)%E5%19t''%1A%14%9Dz%BE%8Fn%AFWZ%A5%A0rrM%903-rk3%DFr%0F%5B%EEt%3A%B9%0E%CEYX%EApr%00prrb%3C%D2%F1%3C%0F%9DN%A7T%E2%9B%E6%9B%8Al%F6%DD%FDgE9M%C0L%3D%CF%C9%9E%D1%E9%BA%C8%A9%B7p%9A%A6%B0%EB%F5z%CBb%92%B6%F3-w%04%A7%BE8%8E%E2X%9A%E4%E8%CAv.%BB%18%93%B2%7B%85L%F2M%E9%E2w%3A%95%BC%7Fz%04%94)%DC%F4j%D0%B2%A5%7Fp%60%94%17U%7D%BE%8D%7Cs%8A(W%D5%A2ga%D9g%C1%9B%14%BF%22Ci%92o%FD~%BF2%E3%2F%84%C0%81a%07%00%A0%D2%CD%83%10%02%DDn%D7%88%5E%E9J%D7%B6%F3%AD%D8%8D%DE%AE%CBiJ%96FEp%DE%9Af%DC%3A%C4%F3%3C8%3B%B4%044%99oB%08t%2B6b%9D%0A%8DpS%D6%8D%89%D6%08U%10%C2%7C%DB%D1%C1a%D1%0C%C9%C2%D2%24%F1%7C%DF%C8%E7%BA%9E%07Ti%C4L%F0%AD%C4s%B7%8D%86%C7%60%B5a%1D%EB%A5%CA%8D%8F%E9%CF%B5%89o%85W%99%C3%ED%02%2C%0D%13%D7%941%A9%C3%11%D4%CC7%A1E%03T%1D%5C%1D%EB%C5T%94%A3_%B5%C4%7C%03%BC%20%08r%BF8%0AC%CC%E7s%B6%A8%2C%8D%11%93%D7%CA%04A%800%8A%D0%F1%FD%EBUk%19d%14%40%A1Q%5C%26%F8%A6%E6cV%E9%80%84%10H%0C%16%99%C4QT%FD%F7hH%B7%24%8E%2B%8D%B0l%E2%1B%90%BAM%60%9Bt%7B%3DDQ%84%24I%D8%B2%B2%94*%83%C1%40Y%D8b%84N%12c%B7'%8BEIx%91%CF.%B2%FB5%C17)%25n%5D%5C%AC%DC*%BE%CD%88%14%C5%2C%8Ec%A337%C30%C4%C53%CFd%9Fo%96%A4%A3%89%8Bj%85%10%B8%BC%7D%1B%AE%EF_%8FvJ%D2%CB6%BEyE%0E%B1%B9E%80%A5*9%DDq%1C%94%10%02%B7o%DDBT%C3%AE%3C%2B%22%F3%5C%B7%D4%9E%23%D3%7C%13B%E0%FC%C6%8D%CA%23%B8%8Bg%9E1%B6Q%F6%3C%0F%FA-*%95D%89q%8C%5B%17%17%B5%3A%02)%25No%DC%80_%E1%B9%ADm%7C%F3%26%E3q~%EF-%A51%EF%CDB%5Bf%B3YQ6C%E2*%8Dg%EA%AA%998%8E1%1A%8D*%3B%930%C17)%25%06%97%97W%E5%E6%8ES%EAg%2B%87%1D%CE%E7F%ED%88%BA%B9%C1%CFJu%95%A0%A3%94%12%B3%200%12%C1%8D%06%03t%17%D7%E1%94%FA%F9%96%F2%CD%3B%3C%3A%CA%FD%E2%E9d%82%90m1KE%BB%EA%5DI%5D%E4%1C%B9%8A%E7%3E8%3C%AC%E4%BDM%F1%CD%D7FXU%E5D%0BohJ%96N%B7%5BY%0B%86%10%02a%18%1A9%ABr%3D%AF%F2%1E%3F%9B%F8%E6%E5%3Dp%95%B8%3A%E4%E3%E8%8D%A5%11%11%DCbWi%D2P%0A!0%9B%CD%E0u%3ApK%E6%85I%BE%05A%80DJ%B8%8E%B3%FE%ECf%1F%E7f%D0%40*%99%8C%C7%F0%3B%9DJR%B1I%1Cc%3E%9B%19%C1n%3E%9Ba%8C%C5Yo%D9%9Fo!%DF%BC0%A7%83%9B%05%81U%D7%CE%B3%D8%25%9D%1D%A6v%C8%24%C1t%3A5%BA%26%A5%94%98%8C%C7%A5O%900%C57Uf%EE%3A%0E%3A%DD%EE%95%91%2C%23%1AX%BCO%1C%C7%08%0C%DB%11!%04%92%24A%C7%F7%AF%FA%C6J%D6Q%DD%F4mP%C1r%B1%B3%98o%9E%DCr%D0%2B%84XVr%B1sc%A9Jv9%B4%1E%178%3F%AE%D4!%24%09%E2(*%A5%F1%BB%09%7C%13B%602%99%00B%5CU%E3%95%F8%1C%A3%E1%B01vd8%1C%A2%C8%11M%9E%08'%91%D2h%A6K%08%81Y%10%C0q%9C%D2%23p%1B%F9%B65%09%1D'%09%C20%E4%E8%8D%A5R)RQ'p%95%D2%94%0D%D9tI)%97%07%EF%8E%EB%EE%E5%E4%9A%C4%B7%60%3A%BD%9A%3DX%C6%B5%2B%80%D1%B3%9Bu%B8%CD%A6S%F8%25%8C%B7%12%8B%F7%9B%9A%8E%DEt%EC%FA%7D8B%EC%DD%93g3%DF%BCM%0F%1C'%09%E6AP%DB%F8%1E%96%F6%8A%CC%EB%E0%16y%F8%26U%F3%AA%E7%98%CF%E7%E8t%3A%3BGrM%E2%9BJ%E3M%A7St%7B%3D%EC%FB4%C1l%D6%B8%2C%90%10%02a%14!%91%F2*%A5%B7%C7%C6%24Y%9CO5ac%A2%D2%CC%C1t%8AN%B7%7Bu%CE%B8%ABn%96%F3%CD%8B%D7%18%96%24%8E%8D%95%83%B2%B4Pr%AE3%D3%25%E6%DBd6%9B%C1%8B%E3%C23%24%9B%C87e(%E7%B3%D9%D5%F52%BB%14dH%89%F9%7C%DE%D8%23%0E5%99%23%9C%CFw%BE%BD!I%12%CC%17%C5%17%8Ds%02%0B%ECv%9DQi%3B%DF%BC%F4b%94%8B%05%D9%24%B0X%E8K%92QR%BD%1C%19%B58%DBhR%AA%5C%3DG%FAy%D4%19Z%14Ew%EE%1C%DB0E%A2%E9%7C%5BF%03A%00%CF%F3%E0%BA%EEU%3An%D3%EF%2C%FE%3DY%A4%5B%9B%A4%5B%16n%0A%B38%8E%E1%AB)%20%8B%08v%DDs%2B%1D%E3862%B5%A4%88%8E%B3%D9%0C%EE%E2f%8AM%D8Q%E4%9B%97U%B2%CB%8E%8D%A5n%99%87%E1Z'%A0%16xS%D6%A62%04%AE%EB%22%8A%A2L%D2%A9%14J%91%DDv%D3DJ%09%D7u%E18%CE%D2%88%2C%7B%BB6%3D%B3%86Y%D3%0C%FF%3A%DC%96%D1%EA%7C~%E7%99-%D4Q%E9%E2y%DE%CAH4%F5%E7%22zQ%E0%9B%C7%CE%8C%A5!%D6%C7%1A'%A0%0C%88%94%12%BE%EF%AF%DD%E9%DA%CE-!%04%5C%D7%5D%D13%2F%5EM%D4%7F%1Bn%D7%9E%D7B%1D%A5%94%CB%06v%E5%E4%AE%A5%18-%D3k%1F%BE9%60aa)%1C%D5(B%25IB%B2%C2X%19J%A5%9B%D2%93qk%BE%8EjL%97%94%D2%FA%F6%AE%7Dqc%07%C7%C2R0U%E28%CE%D2%D8S%9C%CD%AA%8C%8A%D0%AA9m%D6%B3%0D%B8)%BD%D2%3A%DA%BE)%D9%177vp%2C%2C%3B%A4J%D4%E16%B5%1B6%94n*5)%B5b%03%C6%AD%D9%3A%FA%BE%BF%DC%94%24Ib%7D%F4V%06n%EC%E0XX%0AD5%8Ax%14%D2%3F%9B%8C%8A%AE%A7%FA3%E3%D6%ECM%89%FA%B3%5C%8CDc%BE%B1%83ca%C9m%40T%AAD%9F%A4%40QOeP%A4%94F%EE%FDb%DC%F6%DB%94(%E7f%F3%A6%A4%2C%DC%D8%C1%B1%B0%E44%20z%C1E%1B%F4%B4%FD%9C%AA%0D%B8%A9HGE%DA*5%C9%7Cc%07%C7%C2%92%CB%80%E8%97GJ%A2%97%FER3%94m%C1M%15a%E8%D1%9B%EDU%93e%E2%C6%0E%8E%85e%CBnR%19~u%D0M%B1w%94%9A%A1l%03n%FA%A6Daf%7B%F1L%D9%B8%B1%83ca%D9%60%40%D2)%3B%8AU%93%00%AE%19%15%DB%CB%CB%DB%80%9B%E7y%2Bg%A6%14%A2%B7%B2q%F3%C0%C2%C2%B2%D1%80(%A1z'%A2%EAySz%DB%DC%00%DD%06%DC%D2%C5%40jS%C2%7Cc%07%C7%C2%92%DB%80%E8%0D%A6Y3%F0(%E8%99n%A4%B5Y%CF%B6%E0%A6z%DE%94%A8H%87J%D5d%99%B8q%8A%92%85%25%C3%80%E8e%D7%AA%D8%82by9%A5%F1Um%C0m9%F1%1F%AB%3Do%14%AA%5D%AB%C0%8D%1D%1C%0BK%86%01%D1%7B%C1lo%9A%5D%A7%A7rn%14%0Ce%5BpSS%F5%A9%14%CFT%8D%1B%3B8%16%96%0DQ%0DE%23%A9%0C%A5%5E5i%FB%19N%1Bp%5B7x%98q%5B%2F%5ES%80cai%C2%3A%F4%7D%FFZ%2F%18%F5%9B%02l%3F%A7j%03nz%11%86~Ne%7B%F4V5nNS%80cai%C2%EEX%9F%A0O%D9%B9%E9Ux6%EB%D9%06%DC%D2E%18T%AA%26%EB%C0%CD1%AD%A4%DE%B5%CE%C2%D2%04%03%A2v%C7%14%7B%A7%F4%F3%0E%A5'%E3%D6%7CI%CF%9A%A4Z5Y%FA%F7fRQ%BDz%86%85%C5%F4%3A%D4w%92%14%2F1M%F3%CDvC%D9%06%DC%F4H%87%CA%5Dvu%E2%E6%99%06.K%1Ez%E8!%B6%BA%2CF%D6%A1%ED%13%F4%8B%E8i%7B%D5d%1BpK%17a%84a%C8%7C%2B%20%8Ei%E0%B8%C0%84%A5)%06D%DF%1DS%EDy%A3R%A0%D0%06%DC%F4b%20*%11j%DD%B89%A6%81%A3%5C%8A%CDb%C7n%92%D2U%23y%F9f%FB%ACI%EA%B8%E9%A9I%3D%D2%B1%BDj%B2n%DC%C4%CD%93%13iB%C9%F4n%D2v%D0%F4%E6K%DB%D3%08%EBD%CF%9BGQD%A2%FA%8E%3An%CC7%E6%5B%9Bq%AB%3D%82K_%87%40a%D2w%BA%7C%97b%F5%9D~%D0M%A5%CF%88%3An%CC7%E6%5B%DBqs%EA%06.%5D%EEj%FB%AE%C4%F7%FDe%0E%99j%83%A9%EB%BA%2B%8B%93%C2%B5%1C%D4qc%BE1%DF%18%B7%1A%1D%5CzWB%A1%C14%DDSD%ED%2Cq%5D%83%A9%ED%E77%D4qc%BE1%DF%18%B7%1A%1D%9C%02%8B%D2%A5%8A%AA%97%23%9D%FA%A1v-%07%A5%A9%17m%C1%8D%F9%C6%7Cc%DCj%8E%E0%A8u%E2%A7%87%9E%DA%9EFXg%24%F5%08%80%CAx%20%CA%B81%DF%98o%8C%5B%8D%0E.%2BUB%E1Z%0E%7D%CC%0CE%23Im%C7%DC%16%DC%98o%CC7%C6%AD%26%07%97%95*%B19o%BEN%1F%AAU%5CJG%DB%0F%F3%DB%84%1B%F3%8D%F9%C6%B8%D5%18%C1%A5%3B%F1m%CF)%A7%9B%2F)%EE%26%F5%BB%C2%A8%EC%98%DB%80%1B%F3%8D%F9%C6%B8%D5%E4%E0%B2%AEC%A0%96*%B1%7D%B2%40%96%8EjqR%99%CE%DE%06%DC%98o%CC7%C6%ADF%07%97%0EQ%15%D9l%AF%E2J%A7%11%A8%A5J%94%8E%94%EE%D6j%03n%CC7%E6%1B%E3Vs%04%A7%1F%98R%C8)%AB%14%82%3A%BC%A7X%C5%A5%D2%25%AA8!%0CC%EB%1BL%A9%E3%C6%7Cc%BE1n%1BxQ%95%92%E9%FC%AB%ED%A0%A9rW%CA%D7r%A4K%CBm7%20m%C0%8D%F9%C6%7Cc%DCj%8C%E0%F4rW%15r%AB%9F%DB*z%EAG%ED%B6%A8%ED%26%D5%CE%8BBiy%5Bpc%BE1%DF%18%B7%1A%1D%5C%D6u%08%B6%EF%26%A9%5DY%B1%CEH%EA%0D%99T%AE%E5%A0%8E%1B%F3%8D%F9%C6%B8%D5%E4%E0%F4%EA%19uhj%7B%15WV%2F%07%B5%9D%24%C5%BB%C2%A8%E3%C6%7Cc%BE1n%06%228JU%5C%40vO%115%D1%EF%9CRz%DAnT%DA%80%1B%F3%8D%F9%C6%B8%D5%E8%E0%D2CBm%DFM%A6%CBw)%F6%E0%A4'%97%87aH%E2%A6g%CA%B81%DF%98o%8C%5B%8D%0E%8E%DA%90%D0u%3DE%D4%24%5D%C5%A5%FAU%A8%A4%B8%A8%E2%C6%7Cc%BE1n5%3A%B8%2C%E0%D4%9Fm%5E%88Tz%8A%D6-%CEt%15%97%ED%3B%E66%E0%C6%7Cc%BE1n5%3A8%3B%3B%7DH%00%00%18lIDAT%1D8%F5w%0A%C3%5D%D3%D5%40%14w%93z%15%17%85%1E%9C6%E0%C6%7Cc%BE1n5%3A8%D5%D8%A7_%AAH%EDr%3E%1DH*F2%AD%23%C5K%15%A9%E1%C6%7Cc%BE1n598%15fS%AA%E2Zwe%055%D1%0F%85)%DC%18%DC%06%DC%98o%CC7%C6%AD%E6%08N%AF%E2%02%60%FD%EC%3B%D7uWF%1EQ%9F%7D%07%D0%98%5CN%1D7%E6%1B%F3%8Dq%DB%837%BB(%A9%97%BB%EA%C0%D9%B8%40%B3%AA%81l%D6g%5BZA7%90%D4%AA%B8(%E2%C6%7Cc%BE1n5Fp%D4%CA%5D%D3%07%C0%94g%DFQ%1A%81%D4%06%DC%98o%CC7%C6%ADF%07GmHhzwL%7D%F6%9D~~c%FB9%40%1Bpc%BE1%DF%18%B7%1A%1D%9C~%1D%02%85Yq%EB%AA%81%A8%19%C9%AC~%15%0AQ%0De%DC%98o%CC7%C6%ADF%07%A7%0E%18%F5T%89%CD%C0%E9%FA%00%20%5B%7D%97%9E%F2Ma7I%1D7%E6%1B%F3%8Dq%AB%D1%C1%E9%C0Q%09%BB%D5%24%F66D%01M%B9%3E%9Eq%2Bn(%99o%CC7%C6%ADB%07%975%24%D4%E6r%D7tO%91%ED%FAlK%95%A8%D2ruW%98%CD%E77m%C1%8D%F9%C6%7Cc%DC%CA%11%2F%EB%81%D3%A0%A4%CB%5D%9B%D4%83S%E4%0BW%CF%AC%EBcC5P%5E%1Du%9Dl%D9y%15%C1%8F%3An%CC7%E6%1B%F3%AD%5C%DD%BC%B3%F3%F3%E5%3FFa%88%E9t%BA%24TV%AA%A4I%D53%EA%99z%FD%3E%BA%9D%0E%84%E3d%BEf%3E%9F%23%98N%AF-D%A5O%93%81S%CF%DC%EF%F7%E1%F9~%E6s%26I%82%D9l%86%D9t%0A%2Cv%90%FA%A1p%13u%94R%02R%A2%DB%EF%A3%DB%ED%AE%CCX%D4_%A3%D6%A4%FA%1E%A8%E0%C6%7Cc%BE1%DF%AA%C7M%3Cx%DF%7D2%FD%E0%F3%F9%1C%93%F1x%B9%0BQ%9E%3C%8A%A2F%ED%26%FB%07%07%E8%F5z%2B%BB%0C%FD%D9%F4%BFK)1%9F%CD0%99N%E1%2CR%40q%1C7z%A7%E5%BA.%0E%0F%0F%E1w%3A%99%3A%A5%FF%9E%24%09%82%E9%14%D3%20%80%BB%A8%C0K%92%A4q%25%BDRJ%F4%FB%7D%F4%FA%FD%952%F8uz%01%408%9F%23%98%CD%80%24A%DC%E0%F4O%1E%DC%98o%CC7%E6%5B%3D%B8%89%07%EF%BBO%AE%0B%BF%87%83%01f%B3%19%80%AB%C3%C6%26%90M)tzv%B6%F3%B3%0C.%2F%1B%3D%F4TJ%89n%B7%8B%E3%93%93B)%05%3D%3D2%B8%BCl%5C%BE%5C%ED%B2NNOWr%FBER%5E%E3%D1%08%D3%E9%94%14n%CC7%E6%1B%F3%AD%1A%DC%D6%3A8%25A%10%60%3C%1A-%156%AD%90%E7%FB899%D9%F9y%14%C8%E3%D1%08A%104%2F%8D%00%E0%F0%E8%08%BD%5Eo%EF%F7%B9%7D%EBVc%8C%8A%22%9BJ%89%EF%F3LMZ%93e%E2%C6%7Cc%BE1%DF%CA%C5%CD%D9%F6F%BD%5E%0F%87%07%07%8DX%90%9E%E7%E1%F4%F4t%AF%AB%19%D4%F9%C6%E1%D1%11%BA%DDn%E3v%25%87%8B4%D0%3E%BBA%F5%FD%9C%9D%9F7%C6%A0%E8%CF%B3%CF35mM%96%89%1B%F3%8D%F9%C6%7C%2B%177'%CF%E2%EC%1D%1C%2C%0FQM%CA%C9%E9i)%CF%A0%93N%3F%D07%BE%5B%F6%3C%F4%0E%0EJ%3B%CC%15B%E0%F4%EC%0C%A6%B5%93%00%CE%F6Hq5yM%96%89%1B%F3%8D%F9%C6%7C%2B%177'%8F%82%00p%BCHS%98RJ%91%A3%AC%1D%92z%AF%E3%93%134%25ir%BCG*h%9D%B8%AE%8B%5E%B7klaJ)%D1%EBv%E1h%D3%10%CA%C0%CE%F4%9A%AC%0A7%E6%1B%F3%8D%F9V%1En%B9Gu9%8E%83%8E%01%E0%D4%E7u%B4%0A%992%C5u%5D%08%AD%1C%D6%D4%A2%EC%AC)%DD-C%FA%07%07%80)%FD%A4%BC%FA%FC%0A%C4%D4%9A%AC%037%E6%1B%F3%8D%F9%B6%3Fn%85fQ%EE%7B%80%BE%AB%1C%1C%1CT%96%DB%16B%E0%A0%01%F9%E5%7D%CF%01%B6-%CC%AE!%EC%BA%BD%5Ee%86%C4%E4%9A%AC%1A7%E6%1B%F3%8D%F9%B6%3Fn%DE%A6%C1%99R%DB%15(%E0%24%EE4%0D%E6%FARJ%D8%91%08%D7%C5%3C%0CW%3ES%E6%00%23%F7G%00%88%E2%B8%F8%A3%ED%A8O%96%CC%C2%10%B3%94%8E%5B%3F%A3%C0%F7%11%C51%A6%F3y%E1%F4%90%DCC%2F%09%20%060%BF%BC%DC%A8%7B%E6%E7%14%C0o%3A%9F%9Bc%DC%A2%BA%AC*1%A1%9Bt%1CL%16%ED%0A%95%BC%3F%80%C0%24f5%E0%16%C71f%B3Y%ADE'RJDRb%16E%8DY%93%E2%FA%0Eg%FBk2~G%BD%26%98%CD%80%D4%E7%8B%8C%F7%16%85%228%ED%17%BD%82%B9%DD2%E0%DDe%91%14%FA%9DE%23j-%92%F1%5Ce%E6%CB%D79%9F%DA%F4%CB%D8%CD%96%F5%3D%95%FE%19%A6tk%D8g%EC%F3%DD%EF%F4%F60%5Bn%5E%C7w*%0C%ADIAuM%EE%F8%B9%85%7F%C3%5D%DC.%5C7%D9%AA%CE%FB%D6%B6%203%F4%A8%DC%C1%99%2C%5D%16%A2%F2%F3%08%CA%C6%C4%94n%B2%F2eanM%D6%82%9B)%DD%EA%C0%CE%94%83%DB%C1N%3AE%17e%D1%BB%80%CAHQ%EEB%88BCa%D78%9E%BA%16q%A2%D2%A3U9%02%C3%07%FA%3B9%B9%BC%AF7Xv.%AB%BE%17%CB%A0n%82%A8%5E%B5%E0fP%A4%94%CD%C5n%CFMM%B2%C31%92x%F6%8D%1Br%AD3J)%12%C71b%D5%A9_%F0%8Ck%2F%03)%25%5C%CF%5B%09Q%97%86sG%E3%A8%BF%22%8E%22%24%3B.%0CY%5C%A1%B5%EF%A1_%96%B8%F53%8A%9C%81..%5E%ACt'%BF%E6y%92%D4%25%90y%DEG%16%5C%1F%A6%A6G%E8W%DB%E4%26s%C1QPu%EB%26%B5%F3%F6k%9F%5B%82N%00%96%F7%A4%99%8A%E26%E1%B6%B6%C2s%07%1DM%E9V%25vE%D7d%99gp%0A7%FD%02V%91~%CF%F4%CD%1C%9Bz%1Bd%EA%8B%10B%E0%F2%F6%ED%9D%0A2%F6%D9I%9E%9C%9F%C3Q%A9%CA%12%A37%A9E%87%83%CB%CBz%16e%C6%E6%C0u%1C%1C%1E%1Dmw*%3B%14%A0H%8Dp%E3%F1%B8%D6%D4%89%C4U%C9%B4%9B2%24E%1C%B6%CC%B1%3E%82%200bP%1C%C7A%AF%DF%AFt%ED%D7%AD%9B%10%02%BD~%BFR%E7%23%80%E5%C4z%13R5n*J%AC%7B%86%A3%AArT%A9%3C%CF%F5%E0%B8%0E%E6%25%16%F4%EC%B5%26%F7%FC.%5C%D7%C5%C1%E1%E1%C6%A2%92k%0En%9EQ%B9%97%05%96%14%02Q%18%22%2C8)%7B%DF%25%2C%01%8CG%23t%3A%9D%AB%CF%CD%F3%D9)%E3%BEQ%2F%00Q%18%5EE%A6UGok%24%5E%90%C1S%E7%9Bi%1Dw4%FE*%1A%92R%222T%B56%9F%CD%EE%DC%2B%95S%AF%BC%BA%A9%EF%CE%D4%A4%F3%24I0%9F%CD%EE%EC(%CBz%06%83%BA%A9%5B%00%96Qw%99%9F%BDX%8F%C9%9A%C1%CB%9F%F0%A2%BF%837%BF%E5%BB1%9F%07%9B%0D%9D%D7%C5%1B%5E%FF%DA%95%9F%BD%ED%7B%BE%0F%CF%7F%FE%BD%F8%9A7%7C%F5%C6%DF%FD%A9%FF%FC_0%9DN%F1Mo%FA%C6k%B8%9D%9E%9E%E2%07%DF%FE%C3%88%C20%F3wG%E3%09%FE%C5%B7%FE%F3%5Cv'%D6%DE%E3m%DF%FB%AF%F1%82%17%3C%1F_%F7%B5_%83h%87%0A%C7%2F%FB%F2%AF%C0%9F%FC%F1%07%F1%97%7F%F9%97%DB%F96%9F%E3%E8%F8%18%EF%FA%89%9F%C2%AB%BE%F8%0B%01%00Q%14%E3-o%FEn%BC%F3%1D%FF%E1%DA%EB%DF%F9%1F%DF%B5%F5%3D%3D%DF%C3%8F%FF%D8%8F%E1%83%1F%F8%C0~krS%D6-%8F%9D%8Cc%04%CAN%AA%CA%CA%2C'%A7G~%F7%3D%EFy%B2H*o4%1A%15JQ%CA%12%08%D7%EDv%D1%D94%C7.%A7C%5B%17%E5%85ax5%08%B6%0E%07%B7%26E%D9%EB%F7%AFE%3Ay%A3%B4m%AF%13%B8*%AF%8Dw%20%D7%BE)J%C7uW%9A%86e%81%EF%A4%88%931%95%A2%AC%B2a%D8%84nj%C0%B2Wa1Y%1C%C7%08%E7%F3kz%7D%D6g%BF%14%EF%F9%AD%DF%C4x%3C%B9%C3%CD%F9%1C%C2%11%F0%3C%7F%F9%B3n%B7%8B%D3%A3%C3%95%DF%FD%9DG%1E%C5%8B_%F4%22%7C%CC%DD77~%F6%13O%3D%0D%99%24%B8%F7c%9Fw%0D%B7%BB%9F%F5%2C%FC%CF%C7%FE%14A%10%C0%F7%BD%95u(%00%3C%F9%E4S%F8%94O%FE%A4%5CQ%CE%7C%3E_F9%BF%F3%C8%A3%F8%D4O%F9%BB%B8%EB%ECl'%07%F7%D8%87%FE%1C%1F%F9%C8%E3%F8%82%CF%FB%9C%AD%AF%3D%3C%3C%C0G%9F%7C%0AQ%14%E2%FD%1F%F8%20%FE%F6%C9'%F1%F2%97%BF%1C%9Dn%07%EF%7F%DF%FB%F1e%FF%F8%D5%2B%AF%7F%FC%89'%90%24w%8Eg%D4%F3%E9%C7%0A%DD%5E%17_%FB%867%E0W%1F~%B8%F0%9A%2C%3BE%D9%EB%F7WR%94%D7~%3F%E5%F0%BC%E5%17%BE-%8A%030%0B%02cQ%00%84Xu%00%05%CFj%AE%19M%CD)%CE%2B%EC%F9)%A2%A3%BF%E6%82%C5%5D%F4%D5%7B%18%A5%94%3B9%B7R%8Ct%1C%23%8C%22%B8B%14v%96y%5E%1F%19%D2k%F9%F9a%08%D7%F3*I%FD%9A%D2-%8E%A2JK%F9%D7EH%8F%3E%F2%5E%1Cj%8D%C4%02%C0G%9E%FC%5B%FC%F5_%FF5%3E%FD%D3%3Eu%E3%7B%CE%829%269%ECS0%9B!%9C%CF3qK%A2%18a%18%E2%A7%7F%EA%A7%F1%D6%B7%7C%D7%5E%9B%04%3D%CA%99%CFB%04%D3%DDl%E7%D1%F1%09NNN%F0%92%97%7C%2C%CE%CEo%E0%F6%AD%8B%8D%AF%FFo%0F%FF%1A%A6%D3)%3E%EFs%5E%81%3F%FF%D0%87%96%3F%FF%BDG%1E%C5%8B%3F%F1%13q~v%8Eg%9Eyz%F9%F3%E7%DC%7D%F7%CA%EF%FF%FC%BB%7F%09%9F%FD%B2%97%E2%85%0F%3C%80%CB%CB%DB%8D%E3%DB%7C6%83%DF%E9%2Cq%13%5B%1C%A6%B7i%24%8FL%ED%26'%93I%ED%3Be5%EC%D3q%9C%3B%17%DA%15%89%D8%B6%BC6%8EcH%D4X%D6%9B%11%FD%8A%C5%F7%EB.Ry%CB%EF%B8%8C%A6%EF%C5%0D%CB%A6D%3D%8B%932%26%B2%84T%A5%94%122%0C%8D%15%2B%2Co%E1V%87%FA%25%3E%87)%DD%94NB%88JZ%82TT%93G%2F%E18%08%82%19%C6%93%C9%D6%D7N%A7%D3%95%C8o%9D%8CFc%C4I%9C%89%9B%E3%3A%18%8EF%90%D8%A3%1DJ%CAkN%602%9D%60%98%E3%D9%B2%E4%9D%EF%FAI%0CGc%5C%DC%BA%85%AF%FB%FA7%E2%07%FE%DD%BF%D9%F8%FA%1B7o%E2%F2r%80%0F%7F%F8%C3%2B%3A%BC%F2%1F%7D%C1%F2%AE%C1M%BA%CD%C3%10%93%F1%04%DD%5E%0F%EE%D8k%26%DF%5C%17NzN%EA%9A%F38o%1EE%9B%A3%B7%C5%BFM%26%133%95O%8B%EA%C6%E9b%91%3BZ%24P%C4%C1%AD3%AA%D3%C9dg%07Wv%CF%C9d2%B9%1A%85%B3%26W%5Dx%DA%87%94H%A4D%B8f%C7%5C%CB%A2%5C%EC%D8%85%10%2B%D8m%7B%EE%3C%AF%0B%E7s%A3%D5x%8A%F4%B3%C5%AE%B2L1%A9%9B%10%02%F3%F9%1C%1DeT%CA%CE%C6%E4up%8B%E2%AF%602%CD%E1%E0%C6%18%8F%86%DB96%9E%20%0C%E7%99%B8EQ%84%F1x%8C%20%08v%AA%3A%16%C0%92o%BA~%C14%C0x%BC%DB%E4%94%17%BE%F0%E3%F1%9E%DFx%0F%1E%7C%F0%E3%F0%F5o%FCz%FC%E8%DB%7Fp%E9%A82%1D%F8%60%88n%F7j%5CW%14%86K%EC%26%93%7C%0Ev2%9D%600%1C.o_o%22%DF%A6%D3%E9%F2%EA%A5%CC%08N%FB%99%A3%0E%7C%938%CE%FCO%26%C9%B2jf%A7%89%22eD%3C%CB%852%5D%DE%0C%9C%24%C9U%91H%92%40%C61%E4%9A%E7W%AF%5Dy%FD%A2LY%A5%5Ck%05l%DD%CD%B3%8B%7FS%8BHj%CF%9D%F9%FC%A9%FF%B2%5E%AB%F2%E5M%90pq%26!%F3%FC%B7H%AB%AE%FB%0FR%5E%91%D70%D9%F4%5De%1CE%5B%9F%3B%CF%7FM%D2-%0C%C3eI%7FYz%15%E1%9B%10%C0p8%C2p%3C%CEa%98%A7%18%E5%88%92%06%C3%01%26%8B%EA%C64nI%92%60%3C%1A%23%9C%CFv%D2%2FI%92%CC%F4%EBh4%C4p0%2C%5C5%FA%C6o%7C%13%C20%C2%BF%FF%FE%EF%C5%5B%DE%FCf%3C%FE%91%C7%F1%E9%2F%F9%8C%8D%BF%F3%07%7F%F0%87%F8%9B%8F%3E%8E%B7%7D%EF%F7%EF%84%DDt%1A%604%18%00h0%DF%16%DF%B3%C2%2C%D9%60%0B%3D%2C*%093%0D%B0%10%98%87!%A2%82%95%93%B9%D3j%05%1C%82H%ED%96E%9E%CF%DC%B0%A0%14y%F7I%2B%C9%DD%10%DA%F8%5Cq%1C%2F%EF%3CJ%EF%5C%0A%A5%82%A4Dh8_%9E%F5%9D%2F%2B*w8C%5D%EE%B4%D7T%E1%99%24%9D%C2%CD%DDs*MStS%0E%20%8A%A2R%CE%18w%D3K%604%1Aa%3C%DC%1E%FD%8CFc%5C%DE%BE%8D%B7%FF%E8%8F_%2B%1E%11B%20N%12%B8%8E%83%C1%E5%60%A5%3DH%C7-%89%13%5C%DC%BA%8D%8Fy%F6s%F0%DA%D7~%D5rb%87z%E6%E9d%8C_%7C%F7%2F%AC%E5%9Bz%AF%B4%8E%E3%F1%04%83%C1%B0%F0w%F6%CA%2F%7C%25%FE%EA%AF%FE%1F%9Ex%EA)%3C%F1%D4S%B8%B8x%06%DF%F6%ED%DF%81G%DE%FB%BBk%7F%E7_%FD%CBo%C7%2F%FD%CA%C3%B8%FF%FE%FB%F1%F0%AF%FF%26~%E2%9D%EF%C0%C3%BF%F2%CB%B9%3Fs4%1Ca0%1A!%0A%EFd%F6%9A%C8%B7h%B11QvR%AE%F1%19%DE%26%03%1F%EE%E9%DC%CAN%E3)'%17%CE%E7WN.%EB%B9R%0EzS4q%ADA%B0%8E%BE%9C%1C%25%FFI%1C%23%02V%9D%5C%C1%F6%88%A8a%CEMw%E0k%1B%BFs%7C%FFq%C3%C8%A6%93N%9D%2F%ED%EA%E4%E2%06%1A%12%15%E5%EC%E3%E4v%D5%2B%8Ec%5C%5E%5Eb%94c0%F2t%3C%C1p8%C2s%9F%FB%DC%8D%AF%1B%0E%07)%13q%077)%13%0C%07%97%B8y%F3n%7C%E1%AB%5Eu%ED%BB%B8%7D%FBV%A6%83%93%8Bg%5D%17%9D%06%D3)%86%C3A!%DD%3F%ED%EF%FD%7D%0C%87c%7C%DF%F7%BCu%F9%B3%9F%FD%99%9F%C5W%BE%E65x%EE%B3%9F%8D%C7%9Fxb%ED%EF~%E9%97%7C1%BE%F9%5B%BF%1D%9F%F9%99%9F%81%2F~%F5%AB%F1%BA%D7%FFS%3C%FA%DE%DF%C3%8F%FD%E8%0F%E7%F8%1EG%18%0D%87%902i%3C%DF%D4w%BE%B6%BD%0A%80%97%2C%8A%2C%20%E5r%C7%92%24%09%C2%92B%D22%5D%C6%F2%EC-I0%0B%02x%9E%07%D7u%97%CF%BF-jR%3BR%B9g%3F%C6%DE)%D7m%86%7CA%BA%F9%7C%0Eoq%7F%96%C2e%1B%1E%F1%22%DD%9C%DB)%D6%A1%B2%8E%DD%02%035%91%60%13v%FA%FAS%E9%88%26%A4I%F2D%3D%FA4%89%ACg%B6E%B7%A5Na%08%C7q%0A%B5D%EC%AB%97%10%C0h%3C%C28G%8Ar8%1Ab%3C%1E%E1%AB%BF%EA5%99%11%9CJ%FB%FF%F8%3B%DFumP%85%FA%F70%8A0%1A%0D%F1%C8%7B%1F%C1%CF%FD%D7%9FY%16%B7%E9%D9%93t%26E%A5%C26%A5%5E%87%C3!F%C3b%11%DCk%5E%FB%3A%CC%82%00%7F%F1%E1%0F%2F%7F%F6K%EF%FEy%7C%DE%E7%7F%3E%BE%EE%1B%FE%19%BE%E7mo%DD%F8%FB%3F%F2C%3F%80%1F%F9!%E0s%3F%FF%0B%F0O%BE%F25x%E0%E3%1F%C4%3B%DE%F5%9F%F0%CDo%FA%86%B5gxRJ%8C'W%D1f%14%C7K%5BY%DA%9A%2Cym%0B%DDN%AA%02%BDE4%AD%CE%8E%BD%954%D6%E2%CFE*%9DL9%09%B1%88RV%9A%0E%D7D%05%BAcTU%8A%FB%5C%CFRE%04%B7%EE%B5%E1%C2Xn%DC%3C%A4%09%D80%DC%B24%96I%82H%91g%F1%CC%99%DF%CCrw-%9B%BD%26S%86%E2%DA%BA%CC%C2%DD%12%DD%D4s)g%B5%D5%60%A9L%C2%02%DF%DD%F5%12%18%0E%86%18%E6p%0EA0%C3%E5%60%B0b%BF%B2d0%1C%22%89%B3%FF%5D%26%09%06%97%97%98L%26W%95%C79%C6%5B%E5q%00%D3%E9%04%83%E1(%F71%C3%E1%E1!%A2(%C4c%7F%FA%18%5E%F9E%AF%82%5E%C9%F0%D1%C7%1F%C7%CD%BB%9F%85%A3%E3%E3%5CN%F3%B7%7F%EB%3D%F8%ED%DFz%0F%BE%F9%5B%BE%0D%F7%DCs%0F%5E%F3%BA%D7%E3'%DF%F5%CE%B5%BA%8DF%23%5C%DE%BEU%CD%86%AB*%DB%A4m%9A%F5u)%00x%99%83G%9BnD%16_%94H%DF4%B0e%01%95m%40%CAJ%BF%CA-%8E%BC%D0%E0%E8%92%AB%DE*%8Dd%0DbW%96%23%DBV%C5e%ABn%E9%88%25%D3QU%AC%97%10%02%C3%C1%25%26%D3%EDU%94%93%F1%08%D3%C9%E1%D6%D7%8DGcDq%B4%96%87%A3%D1%F8NaV%0E%DE%E5%D1q2%99%60%90%D1S%B6N%5E%FB%BA%D7%E3%F2r%88%9Bw%DD%C4%DD7%EF%BE%86%C7%93O%3C%81%97%BF%E2s%F1%AB%1B%CE%D6%D2%9B%A6%1Fy%FB%0F%E2%BB%DE%F2V%BC%E0%05%F7%C1%F7%FD%B5%95%D5%B3%20%C0%600hd6a%ED3%E9%99%12%7D%83%25%04%3CX(%C2q%9A%1Fe%E6tl%02W%B3%F1%12%C2%13%CEALG%7DX%AF%AA4%B3y%1D%E61(%26%A2%CC%24I0%9EL0%C9Qb%3F%9DL0%DAR%8C%22%A5%C4%608%B8%16a%EA%0E%7B8%1CbVr%DF%E8t%3A%CD%D5%CB%A7%E4%F4%FC%1C%A3%D1%10%0F%FD%DB%EFG%BA%0E%3D%8E%23%7C%D3%B7%7C%1B%5E%FC%89%2F%C6o%FE%C6%7F%CF%ECq%D5S%AB%BA%8E%1F%FD%E8G%F1%9C%7B%EE%81%EFw%D6%3A%B8%F1d%8C%F1d%5C%CD%8D%0B%BB%AE%9DE%40S%94oRJT~%B1O%D9t%F0%17c%846N%FD%A8%F3%CB%DF%E3s%04%AEFY9%8E%B3w%F5%5D%93%9D%B8j%CAt%B3%A6%9C%DB%B8%C1Z%90M%FF%BF%C9%EB_%AA%D6S%ADO%13%D8%8D%86%23%049%22%B8%F1d%B2%B5%D7K%08%B1%E8I%1Bg%E2%96H%89%C9d%82%20%98%96%AA%C3%95%F3%CDw%06%F7%D2%97%BE%1C%83%CB%01~%F9%17%7F%01Q%14!%8A%C2%95%FF%A4%94%F8%FDG%1F%C1%ED%5B%97%B8%EF%FE%FBW~%F7%EE%BB%9F%857~%E3%9B%F0%C0%03%1F%97%B96%A3(%BA%FA%3E7%E87%9B%CD%16%1B%85jR%89%BB%DAL%B5%0E%8B%F0%AD%16%07WZ*%0Bwnt%95%DA%0E%CC%B4%F1%DE%15d%B9%D0%8D%AAq%D4%9D%B8p%9C%EA%F2%EF%06%A2%9A6%C8%BA%C2%98%BA%1D%ECd%3C%CA%99%A2%1Co%AC%B6T%CF%3E%9E%5C5r%AF%E3%E6h4*%BDwt%3A%9Db4%1A%E5%CA%60%DC%FB%82%17%40%CA%04%8F%3F%FE%F8%DA%D7%7C%F0%03%EF%C7p8%C0K%FE%C1%3F%5C%F9%F9%C5S%7F%8B%C9d%82%CFz%D9%CB%E0%3A%AB%1B%E6%7B%EF%7D%3E%1C!%F0g%7F%F6%D8%C6%E7%98%8C'%8Bg%8D%AA%00tw%1B%B2%83%9Dt%1C%A7%FA%14e%99%17%9E%BA%AE%BB%24%5EX%F6%C8%98%BA%C9%0B%AC%E8%13%D7x%05Q%9D%1B%00Wsn%D7%8A%14%2C%8Ej%96%BB~%02%A9%F2uz%EA%3A%99(%15W%E3%01%F3L%E1%88%A2h%BD%E3%D2p%9B%8E%C7%CB%EA%CE4nI%92%604%1A%E1%D9%CF%B9%07%AF%FE%D2%2F_%19%5B%26%17%23%EF~%FD%D7%1E.%AC%C7x2F%A7%DB%C5%97~%F9W%5C%FB7%D7q%F1%EE_%F89H)q%EF%C7%DE%8B%D1p%84%FF%F1%C1%0Flu%86%FF%F7%AF%FE%0F%9E%FD%9C%7Bp%E3%C6%0D%5C%5C%5C%CD%A7%8C%A4%C4%9F%FC%F1%07%F1%09%2Fz1%BE%E8K%5E%8D%FF%FD%17%7F%81%E1p%80%E7%3D%EF%5E%DC%BC%FBn%84a%84G%7F%EFw7%BEo%10%04%8B%EF%BB%A2%08n%875%94e'%F3%AEE%CF%06%23%99%E5%0CJ%3F%F7%A8%AB%0FN%19~M%1FI%C0%F0g%E9%E8%E8%F3%19%D5T%04%CB%A3%9A%F4%A5%BB%D4%CE%DF%B2.%035%A5%A7%10%02O%3F%F3%0C%A69%DA%04..%9EY%3B%D8%40%C7%ED%E2%E2bm%85%60%92%24%B8uq%B1%F6%7Cj%D7%81%E5%A3%E1%F0%AAq%3AC%3A%9D%CE%92%17%CF%BF%EF~%0C%06%97%F8_%1F%FA%B3%AD%11%CB%FB%FE%E0%F7%F1%99%2F%7B%05%3E%EE%E3_%88%F7%FD%D1%1F.u%FC%D3%C7%1E%C3%AD%8B%0B%7C%D2'%7F%0A%EE%7F%E0%81%85%5E%12%7F%F37%8F%E3%FD%EF%FB%A3%AD%FD%B1%E3%F1%10O%3F%E55%E6%BC%5C%9D%BB-%5B%3D%0A%AECq%D7%F1%B1%DC)%EA%AA%F1FowqN%A5%E7%92K%8F%2Cw4%BE%BB%DC%E8-T%3F%D1bG%13GQ%25%FD%82eD%A6%FB%5C%97%E3%B8%EE%1D%1D%09D%A8YQ%0D%B9%A8%3B%E3Fh%DB%F5l%03n%CA%19%E8%3Av%3A%1D8%8E%830%0C%8D%F1o%9F%EBrt%3B%997%CB%95%BE%3A%A7%F1)J%A1y%F1%A5s%AB%E2%3C%A7%A6%08N%02p%B5QUI%C9%CE%AD)%D1%9B~%99%A4%24%60P%D2%D1%5B%D3%9B%CE%CBt%066%EB%D9%06%DC%D2%23%E2T%A4c%F2%16%912%ED%24%80%9D%B3v%8D%2F2QW%3B%2CC%F6%06%15%2B%EC%E2%98%5C%D7%BDz%FEM7%D1Z%EE%DC%9CT%E9uB%20%FD%9AN%D9%A95I9%0A%A0%90%82%A5%8E%5B%DA%81%AB%9F%D9%AE%A3%EB8K%3B%B9%0FnN%AE%B0%B2%CC%10%B5%00p%E9%1E%9C8%8E%ABsn%3B%18aQT%1F%05%92%AE%0F%F5T%09%81s%B74%B9%A8%A6%26%B3%CE%A4l%8E%DC%DA%80%1B5%1D%A5%9EEX%60%B8%8FN%8DMQ%AA%AAI%25%91%C1%3B%CD%CA%D0M%08qu%26u%F5%17%B2U%93Y%11%80%ED%C6%23%ABj%92%A2%91%A4v%EEF%1D7%8AEOB%B7!B%DC%99%AB%BB%AB%83%5B%F7e%88%ED%2B%A8R%E0%F4F%EE%24I%AE%1D%7C%DB%B6%10%3D%CF%5B%E9%C4%8F%88%A6J%3C%CF%5B9%2F%B5%FD%FC%E6%1An%7B%DE%AE%D1T%3D%D3%7C%B3Y%CF6%E0%D6%1A%BE%ED5%CB%B4%81gp%EA%C0T%2F%0B%B5%7Dq%AA%0E%7C%BD%CD%81bq%82%22%9B%D0z%DE%18%B7%E6%1B%15%E6%1B%F3%8D*nN%D3%C8%96n%E8%B69%95%A7vV%BA%3E%CB%EBz%08%1AIE%BC%24I%AC6*m%C2%8D%F9%C6%7C%A3%8C%5B%E3%228%FD%92Ou%D7%92%CD%BB%12%7D%86%1F%D5%C1%BC%FA%CE%0B%00%89%1Ds%1Bpc%BE1%DF%A8%E3%D6%18%07%97N%95%D8%0E%9C%CA%91%EB!7%C5%DD%24%B5%1Ds%5Bpc%BE1%DF%DA%80%5Bc%1C%5CV%AA%C4f%E0%F4*%D0%CA%C6%8B5%C8H*Ci%7B%04%D0%06%DC%98o%CC%B7%B6%E0%E64%05%B8%F4%81%A9%ED%3D8%0A4%15nS%3B%E8N%EF%BC%A4%94%E5%0F%C0f%DC%98o%8C%1B%F3%CDf%07%97%9E%7D%A7%94%B4Y%D4BT%BB%922fg6%7D%E7E%A1%CF%A8%0D%B81%DF%98om%C2%CDyz0%10%A6%81%D3w%93%B6%A7%16%D4%AE%84%8A%3E%DBR%25*Mb%FB%8E%B9%0D%B81%DF%98om%C3%CDi%82%92%FA%AE%C4%F6T%89%E7y%2B9r%EA%A9%12%0A%7DFm%C0%8D%F9%C6%7Ck%1BnO%0F%06%C2i%02pJl%AF%E2J%8F%3B%A2%98*%01%B0b%24)Tq%B5%017%E6%1B%F3%AD%8D%B8%19%BD%F0T%1F3C!%B5%E0%FB%FE%12D%AA%D7%A9%A8%9D%97%5E%A0%60%BB%8Em%C0%8D%F9%C6%7Ck%23n%8E%0A%E5L%84%A8jW%A2%7Bv%5Bw%25%FA%60h%00%24%16%E2%B6%9DW%D8%C0%01%D8%8C%1B%F3%8D%F9%C6%B8)%9F%E6%98%04N%2Fw%B5%7D!%96%7D%E3x%D3DUqQ%99%12%D1%16%DC%98o%CC%B76%E3%E6%A4%3D%5E%1D%C0%A9%10U%9F%A2%60%7B%1AA%E9%A3BnjFR%95%96S%9A%CEN%1D7%E6%1B%F3%AD%8D%B8%E9%BE%CCY%F7%0FU%86%A8R%BB%C8%CE%E6%DD%97%5E%BE%AB%FEN%F1%9E7%C7q%AEM%1B%A0%90*%A1%8E%1B%F3%8D%F9%D66%DC%D2%3E%CC%A9%1B8%BD%B1OUq%D9%BA3Y7%EE%88b%0F%8E%DAIR%18%C8%DB%06%DC%98o%CC7%C6m%C3%BD%A67ONd%99%A0%01XI%95%C4ql%7D%99%B2%AE%8F%ED%97D%E6%D9M%AAT%89%ED%06%84%3An%CC7%E6%5B%DBp%5B%97%7Dt%8A%FE%C2%AE%92n%EC%A30%FBN%DF%0DSl0U%84K%DF%18L!UB%157%E6%1B%F3%ADm%B8m%F2U%5E%9E_%DC'%9A%5BW%3Dckj!%7DI%A4%02%8DZ%AAD%8DtR%3A%D9%DEg%D4%16%DC%98o%CC%B7%B6%E0%96'%08%F3%8A%BEQQg%A7%80%D3CT%F5g%9Bw%C7J%07%0AWVd-N%BD%8AK%19I%0AQ%0De%DC%98o%CC7%EA%B8%15%CD%2C%FE%7F%C1E%25%CB%85*%0Dc%00%00%00%00IEND%AEB%60%82";
const ARROW_LAST = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0E%00%00%00%0D%08%06%00%00%00%99%DC_%7F%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0B%3A%00%00%0B%3A%01d%7FW%0D%00%00%00%07tIME%07%D9%05%16%17%0F%17YUL%89%00%00%00%25tEXtComment%00Created%20by%20Renegade%20with%20GIMP%A1-%04t%00%00%01VIDAT(%CF%95%92%CF%2B%83q%1C%C7_%DF%3D%CF6dkc%9E%0D)JDQ%16qQ%A2(%87%91%12%E5%E0D%E1%AFp%A5(%97%25%A5%1C%9C%9C%9C%DCMiG%91%1D%A4%A1%CD%1Cd%0F%D9%E3y%FC%D8%D7e%5B%B3%24%7B%D7%A7O%BD%EB%F5%E9%DD%E7%F3Q%80%05%60%10%B8%00%3E(C.%20%05%3C%02%3B%40M9%F0r%B3%D3)g%FD%F5%D2%01%26%B0%014%FD%07T%01%19n%EF%94%87%DDA%B9%D8%D0(%AB%85%B0%80%5D%A0%E37%40%C9%F5%2Cp~g%1A3%13u~%BA%5Cn%A6%B4%80%E2w8%7B%AE%0Cc%C9%C8~%05%81%1B%20%91%07E%D1%10%01%9C%AE%B5%B6%F5%F7%B9%3D%05%F33%9B%25%A2%A7%D9%7BHrk%9Aq%60%058RJ%12%C8%94e%86%C6%7DZ%C1%B0%09AKe%15!%9F%86%D7n%F7F_%9E%E7%80%11%B5%04%1C%0D8%2B8%D6%D3%3F%CC%7B%CB%E4DOs%99y%05X%05%B6%8A%C1%5E%97%A2L%0F%14%C5%8C%BF%19D%F44%D7oF%02%D8%04%B6%81L~%9By%85%87%BC%B5B%15%82X%E6%95%88%FED%D2%B2b%C0%3A%B0%0F%BC%FF%B6%DD1%8F%AA%CA%90O%93%3E%BB%5D%02Q%60%12%B0%FDuC%1Bp%06%C8%5C%0D%FF%F7k%E6%81%03%20X%CE%AB%7D%03%92%BCf%C3%F8%FFG%AC%00%00%00%00IEND%AEB%60%82";
const RECYCLE_LAST = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%26%00%00%00%12%08%06%00%00%007%D6%AC%15%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%05%09%15%14%1A%85%2Ch%09%00%00%00%25tEXtComment%00Created%20by%20Renegade%20with%20GIMP%A1-%04t%00%00%04%9AIDATH%C7%8D%96Mh%95g%1E%C5%7F%F7%92%BDK%E9l%04K%5B%BA%90%16%04%17e%18%A6v%C61%20%91v%3E%A2%C1%E4%AAM%A2%8Cq%8A6%1D%EA%A6Rl%B5%85%AEF%064%9A%EBG%93%D1%5C%3F%DAt%A4C%87%162)%01q%26%C5%85%F4%03J%DB%85%E0%AAHgQh%EB%7B~%B3x%EF%CD%BD%A9%B93%F3n%DE%8F%87%E7%3C%E7y%FF%E7%9C%FFS%A1%CBui%FF%FE%07%D4%08%AB%88%0F%8B%A0%08%10%EFl%3Fyb%91%FF%F3Z%DC%CF%03J%02%AB%94%87%05%12%10P%EE%FC%F4%04%F7aUV%02j%8C%ED%3F*%1EBU_E%B7%0B%0F%A2%C4%12N%D9%B8cbb%EE%7F%91%FA%D7%18G%03%87%08%06%5E%15%B6%2B%0F%A6%DC'%01%95%8D%3F%9F%60%EE%BF%12k%8C%8DmP%AF%8B%15%02%E2%3D%F5e%F4%88%0A%82%88zS%5D%8F%AE%1E%AA%D7%EF%ACD%EA%9F%FB%D8%20%5C%0FT%14%22%F7%90%97%23G%9A%7F%0B%81%C8Me%7Dd%F5%2F'%B9%03P%ED%04%9A%D97V19%1E%AD%18%89A%ED!%99%8F.%A8%84%60%82%FA%B8zK%F9%C9J%A4n%EC%A3%128%5EH%25%25)%22%3D%85%CC%07%16Z%DF%8A%F2%FEx!%B7%D2%81%B5%8C%98f(%BA%81%04%9B35%8D%81%89%89y%E3A-U%A7%96%E3%E6z%EDL%7DE%AD%152%94%B0!B%91%25b%8D%9F%9Dd%3Er0b%D1%26%8Cr%FDW%F5%B6%D6~D%CCO0%1F%A9HP%BF5%8E%03%88%8B%26%8B%DA%24f%FE%1D9%D4M%5B%91O%0A%F8%A8%A5%A5B%BE%8D%8CS%0A%7F1a1%96%26(%E4%3E%AC%FB46%BDgO%153%AC%BC%A2%1C%1F%3C%7D%EA%08%C0%F9%DD%BB%9F%0A%AEk%EA%0E%F4%96%FA!zPx%EB%D97%DF%FC%F4%C7X%F3%7B%A8*%C3%A1%C4%DAx%8A%23%00%7F%7F%96%A7%94u-%8D%09%B7%0C%1F%06%0E*o%F5%9D%E7%D3%9E%0B%7B%F7%3E%22%1C%23%AE%15%AB%EAme%0B%3A%83~%D7Zd%A8%5E%FF%00%F8%A0%F5%3E94%F84%F2%B1%BA%16%7D%12%D8%B4%B0%97G%84c%81%B5J5r%5B%D8%920%23%2Cam%9Ad%19%D6_k%3C%8D%7C%1CX%1By%12%D8T%01%98%1E%1D%9DU%FB%9A%E5D%1D%19%9A%9C%3C%DD%ADL%F5%C1%C17%C4%E7%15L%CAB%CB%D6%D1%0B%17%DE%F9%C7%1Ef%91%BE%B4%1D7%F2%8B%D3t%C5z%A7%C6%1B%C0%F3%1D%B9F%60kuzdt%B3%DA%A7M%17FL%8E%9E%DB%B5kUw%FD%E4%9A%85MR-%F1%FA%DA%DCH%A57%D2W%08%05K%C2%3E%FA%DEn%BAb)%D7Z%E6(%DA.%7D%AD%1As%C02%16JR%A6P%5E4n%EE%066%3C5%3D%17%9C%D5%90%04%0D1%8F%DE%B3%F2%C7%A5h(%17%2B%22%2FF%BAbm%3D%CF%5Cd%B6h%CF%A1%08%8FV%D1%F7%92%26%A92%0AN%EC%3C%7B%A6%BE%F3%DC%D9%99%95%80N%0D%0C%94%BBO%C6%0D%DF%D3%8A%8E%F8%85%E6Z%87%FD)%C2%89%CDu%EA%BDgX%11%EB%CA%60%F9'%0B%19%8F%7C%BF4%17%BE%A8%26%1EW%3F%D3%00%B9%1Bs%B8%DB%EE%26%06%B6%AF1%A9%01%8C%5E%BC%F8y%CC%0BIf%D1%86%DA%2F%FC)%F2YQF%C0%DDHW%AC%CB%3BX%93%82%1A%C0%EF%A6%F9%3C%F2Bd6%A1Q%84%FE%0A%C0%99Z%AD%17%7CWy%09%DD)%ACnfUST%AC%1B%B9%F0%97%2FOn%EB%BF%A2lQ%7F%A8%B4%8D%02z%5B%7Dl%DF%D5%AB%DF%FDm%17%BD%91w%85%97%94%9D%CA%EA%A6%A0%5B%C2%5E%F7%9B)%BEl%0CpE%D8%A2%FC%60%AB%FCe%60%DE%0E%3CV%E9p%DAY%E5%2B%F1p%19S%02)%FB%99%3E%84%AEQ%DF_rn%EB%B4Q%8E%F7%8F%5D%BD%DA%E8%B0%FFY%E1%2B%E5p%CB%9D%B6K%FC%90%B0Fx%BF%F5%8D%26%A9%E6s%7F%ED%12%8Dj%DBi%1E(%9Br%88%01CJ3P%F6M%7B%A5%3C%5D%B4%DC%DB%1C_%E8%24%D5t%E9%81%C8%FA%CE%96S%D8%26%17%E9M%9Ab%CF%92%13Q%16j%97h%2CkI%C3SSw5%17%5BF(%C9-9%15%F4u%93oJ%93%D0j%E4%1A%9F%5B%C1iw%13.%9Ae%BD%B0%24P%12%7F%BD%90o%B2%9C%B8%85%3C%D7%B5%25%9D%DC%B6%AD%0F%7DB%E9%C1%D0%2C%DA%B1%DF_%BA%FC%F5%9F%9F%F9%F5x%19%C4%DE(%CB%C9%CD%3F%BC%FD%F6T%D7%C3%E6%00%7D%91'%84%9E%0E%9D%1D%DB1%C3%D7%E7~%CB8%D0%17%B8%D1%2C%F7%CD%E1%CB%2Ca%FD%07L%3CTu.Oz%18%00%00%00%00IEND%AEB%60%82";
const HEADER_IMG_LAST = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%87%00%00%00U%08%03%00%00%00%95A%D8%DC%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%01%83PLTE%00%00%00%00%00%00%01%01%01%08%04%04%1A%05%05%0A%0A%0A%10%10%102%08%09%16%16%16C%0A%0BM%0C%0ER%0D%0FX%0D%0F%1F%1F%1F_%0F%11e%0E%10%60%10%0Fc%10%12i%0F%12n%0F%11u%10%13%26%26'z%11%15%86%12%16%2C%2C-%9A%15%1A123%AB%16%1B779%BA%18%1E%3C%3C%3E%C4%1A%1F%CD%1B!%D8%1C%23EFG%E0%1C%23%E4%1D%26%ED%1B%25%EB%1C%25%EE%1C%25%EE%1C'%EC%1D%23%E9%1E%23%EC%1D%25%EC%1D'%EC%1D(%EE%1D%23%EB%1E%24%F2%1C%24%F2%1C%26%F0%1D%24%F0%1D%26%ED%1E%25%EF%1F%26KLN%F3%1E'%F6%1E%26%F6%1F%23%FA%1E'%F9%20'%FE%1F(PPRSSVUVXWXZYZ%5C%5D%5D___aabddegghjijmmnpopsrsuuvxxxzz%7B%7D%7C%7D%7F%7F%80%83%82%83%86%85%86%88%87%88%8B%8A%8B%8D%8E%8E%8F%8F%90%93%92%92%93%94%95%98%96%98%9B%99%9A%9D%9C%9D%A0%9F%A0%A2%A2%A3%A5%A4%A5%A8%A7%A8%AA%A9%AA%AD%AD%AE%B0%AF%B0%B2%B1%B2%B5%B4%B5%B8%B7%B8%BA%B9%BB%BE%BD%BE%C1%BF%C0%C3%C2%C3%C4%C5%C5%C8%C7%C8%C9%C9%CA%CB%CC%CD%CF%CF%D0%D2%D2%D3%D5%D5%D6%D7%D7%D8%DA%DA%DB%DC%DD%DD%DF%DF%E0%E2%E2%E3%E4%E5%E6%E8%E8%E9%EA%EB%EB%ED%ED%ED%EF%EE%EF%EF%F0%F0%F1%F2%F2%F3%F5%F6%F6%F7%F7%F8%F8%F8%F9%FB%FB%FB%FF%FF%FF%D2e%DE%BE%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%05%08%03%1A%2B%EAf%FD%1A%00%00%14VIDATx%DA%ED%5C%87%5B%DA%40%1F%FEr%09S%D0%3A%10%11D%10M%C8%90X%40%89!%0E%DC%A3%EEU%15%F7%E8%D0%DA%DAZ%DBj%5B%FD%D3%BF%BB%24%40%08%C3T%DB~%CF%F35%2F%12Cr%B9%84%7B%EF7%EF%8E%FF%FC%C7%84%09%13%26L%980a%C2%84%09%13%26L%980a%C2%84%09%13%26L%FC1%60%26%FE%06%FEg%3C%00%1C%02%00%B8c%92%F0%BBx%00%E8%05%D4%DD%FC1m%01%90%DB%C8%FFm.%AF%BF%3D%04%D1%EE%F7%D59pL%A1C%DD%9A%3C%3C%C0%03%00U%88%C8m%81Z%12%00M%93%E6%DA%19%C8%24xC%A9tZH%A5%84TOJH%0B%BDa%9F%13Q%A1%5C%00%AA%DD%C6%E4%E1%01y(%11%87%22%1A4%F2%00j%DA%04%A9%87%A5(%96gi%3E%C9S%24K%F5HB%A8%91%C8%5D%04%FEM%910%C4%83%DC6%00%AB.%0Ey%26%40~%A3%A3%0A%C3%1C%ED%A2%C0%F3%3CGB%1A(%8E%E3%A2I%9EM%F2%1C%95%92%C2%CF%14%89%F8W%15%93Q%1EJT%BE%8E%87%D2%EE_%A4%60%E4%8EN%F8R%FDT%94%E2)%96dY%24%13%0CKFy%26I%F2t%2C%25%B4%DB%14%910%F5Re%1E%1EV%DA%05%ED%AE6%A5%EE%1Ax%CC%11%92%BAy%9A%E5%BA)%9Ae%A1T%B0T%17M%F3%2Cd%22%CA%24iRH%D6%E5l%B5%C9CE%1E0%ACZ%0B%A1%CEn%23l2%08%A2%BC%DFS%9F%108%B2%9Bd%C8%24CBy%A0!%11%1C%C7w%93%24M%93%09%A8%9B%E8D%DA%8Bc%003%EDCe%1EpB%06%5E%A1%85%00%E1%0DE%18%A6%9B%E1%934%CFE%DA%9B%09%9D~%81m%DB%94%8AG%19%A8%8Dx%0An%91y%60Y%0E~%A2c%3C%C3%F24%C5Cj8%C9%8F%FF%A3%EE%921%1El%E1N%88%08%DDN%E8%DC%20%B5%E3%D7D%C4T%2F%1DM%24%E3%D1x4%19%13%C4%88S%A3%60dm%D3(%C6a%B3s%B0%E7C%1FIv%97%BA%60%C3%D3%3C%C5%D1%5C%8CU%C1H%BE%87%FD%25%F0%A8S%7F%26%16%C5%40%F5%98%EA%A1'%02%F9%8D!%1E%1A%A5T%2C%91H%26%25%97%AEb%A5%B1%5DBO%2F%D9%15%A3I%96%A4%D8.%8A%E48!%DD%A0*3E%2C%40%AD%90%60h%9A%E3a%B7%87%26%02%82D2%01%99%E0%B9.%9E%CB%F1%40%92%A2%17%18%7B%F8%F2-%F2%E0W%07%BA%EB%81%91%C6~%C0.%3E%A5S%E4U%B8!%1E%EAD%1Ave%8EL%BBJn%0Bk%B1E%7Bx%92%A7%BAY%9E%A4Y%86%26c%3C%CD%C4%D2%CE%5C%CC%80nec(%3E%D1E%B2t%92%E4%60k%B3%3C%05%A5%81%87r%91%88u%C5X%8ER%11%E5z%D2%F5%06%9B%06T%8F'%AB%B6%0B(%F4%A1'%CA%D0Cn%05%A8%D0%FDK%12%11%86x%A8O'Y%92gy%C8CI%D5%00%B4%A7%F9(t%7C%F8%18M3d%14%F6j%D8%F1%C9%9E%08%91%8F%EE%00%1E%12%A2iQL%ABo!%86D%01%CA%03%D9%CB%F2%1C%03%A5DEo%8CM%24m%E0%09z%A7%9C8%94%C9%B0%FC6qx0%BF%F0%40%DF%C9%3F%AFAy%80%CE%0D%1B%A3%05W%C97%05X%AD%C4G9%3EJ%92%DD%09Q%14S%C8%09%A296!%E54%0Cd%CA%2B%3E%0F55466%C1Wc%7D%A3%3F%91D%86%9A'%FB%FD6%E4e%A9%8E%96%CD%E6%08%F5p%A9v%F0%EB%16%00T%EB%A0%A0%5C%EAE%E3l%3FF%E9%18%B4U%E0%01%09%06%BFf%A7%1BD%A82%A0b%82%3C%14%E7%8DP_o%17x%8Ag%A1%F3)%84%7D%3E_%5B%AA%0B%FAL%DD%905%86%C8%05%11%B6xL%F4%A9Y%0Bt%CC%C6'%900%B0%A4%E0%00E%8E%15%F0J1Z%AC%7D%A0%BBW%EF%F3%40%DB%CB%806%BDU8%0D%8A%AB%C3%8C%B6f%E9Ykk%C5%B3%EE%40G%B0%D5%8A%19d%C2%20%0Fr%D4%A5%D8%07%ADC%8AR%15%FD%D0t%40%1E%BA%FB%DBP%C3%83%E64%CDq4%F4%86%A4f5%DF%07%FC%22'%FA%40%A1%07%12%91%A8%CCC%82%B1a%C5%D55%A7%BB%D8%DE0%F1%40%2F%1CY_%5B%D5am%D9%A2V1%BA%BE%3E%8F%17%97%B7%2C%AD%AF%0Fkh%98%5D%2F%BAt%C5Z%F1N%F8%EC%FA%FAD5%A2F%CE*%D8%A9%81%C3%EB%BB%FB%FB%BB%AB%ED%40%E1%BE%2F%D6%F5%8F%BD%BA%3E%F5%2B%FERC%1A%AAsh%02%90%5E%D2%0B%AEW%8C%91t%94%E7z%C2%84%A2%7B%DB%04%9Af%A19%86%22%A0%DC%C3%D6%1F%23E%9F%EA8%A1%23D8%11%25a%20%91%80-%5E%14vC%B7*%D9%C5%8A%0D%0F%F0%B0w_%8A%EFv%F5%FB%1E%DC%DF_Y%8A%3B%9B%FD%FB%FD%7DV%23%C2%EF%8B%2F%FD%E9%AE%2C%0E%1F%EF%EFO%ABI%CC%C1%7D%B0%DCa%FB%3E%E4%00U%7Dw%7F%3B%9B%BB%2F%FE%B1%CCs%9F%81_%92%07%C5%AFL%BBJo%E9%17%90%C9%A5%A8t%83*%FA%B6T%8Cci%8AL%FB%D4%24%87%2F%CD%F2B%9B%1C%08*7%25%C2q%94%E6%E3S!%3C%9F%0FQ%5C%87%26h%F2It%B8%9As%0E%B2%F7%3F%7F%FE%F8%09%DF77%DF%BE%2B%7Bw_%EC%AA%0E%C9%DE%FF%B8%B0%E8Z%E5%EA%FB%FDK%CD%F5o~%DE%DE%DE%E5q%7FS%85%87%F3%9Fw%07U%0CC%CB%CD%DDv%19%25c%7Du%7F%7B%F7%ED%EC%F8%F5%F5%DD%CD%F7%FB9%F5%1C~q%8F%9E%F5%E7%CF%EF77%B7%DF%7F%C8%FB%F7%AF%B1%DF%C8%03%CF'Y%C1%A1%C6%0B%98O%82NQ%3A-y%95'%23%22%3D%D0%2BJt%86%23%91%88%9FP%E4!.%FBKB%9Bl3%08W%5D%5D%7DCC%7D%5D%AD%97%89qPa%09%CE%EAvq%F1%E2%AD%8C%F3%2F_%BE%7DTv%CFN%ECj%91%ED%9F%B7%EF%F4%3C%7C%BA%F9%B9%AE%A9%E4%F5%ED%CD%E5%01%C2%3E%7C%1D%1C%EC%DA%2B%F3pv%FBc%BF%8A%5B%B6zws%ED%D1%19'%B8%5D%BF%FF%F2%E38%00%0By6%BE%7F%FBv%D7%A7%94%C7%F7%CE%CF%E4%87%7D%FF%F5%DB7%F9%2B%9C%BD%7D%B7%F5%2B%F1%C3C%3CP%2C%99H9%D4%E1%03%80%D76%CB%20%94%7C%9F%0B*%B5%18%C9%C6c%89%9ET%DA!%9Bv%99%07%92N%FB%15C%2F%A5E!-%A4!%7BP%A3q%0C%834Z5OD%1ER%85%F0%7C%BA%FE%BE%A4%EE%E7M%C2%D6%ED%D73%3D%0F%97_n%B5%3C%BC%BA%B9%CD%EAmy%85%5B%BD%F9v%BB%5B%B9S%C0%8A%3F%FF%98%2F%E9)%9E%EB%2F%DFN-J%C5%2Fn%BF%7F%CE%A87%C9%3D%EA%C0%ED%F5%CD%00(~%EE%DF%A4%97%C8%EE%1E%872J%01%40%8E%0FU%F1%FBDh.h%9EI0l4%E5T%F5%12%0A%A7id%BC%E1%0B%3A%5C%5DI%C8e%17OwsI%18%EC%25%C2x%F5%10K%3D%E1%BE%FC%7C%B3%A0%3F%B7%F9%F5%FA%AD%9E%87%F7%9F%BF%AEj%AE%3E%B9%FE%9A5%90%99%90)%BB%FE%B2S%D9w%9B%BC%BD%BA%FA%7Cf%D5%3F%DB%C4%ED%D5%97%8E%9C%9F%96%3D%F0%E4%BF%8Cz%AF%BE%2FW_%3Btc%09%BFI%2F%91%C9%94%03%CB%FBR%F9%EC%2C%92%8Ep%8Af%BBI%16F%D9%5C%BCW.%04%E5%01%C5%D4%B4%E8%95%CDC%7B*!%08%14J%84C%3B%C3QdWw%C2V-%5C%CE%9Fs%7F%F8t%3D%AF%2F%B3q%7D%F5J%CF%C3%BBO%D7%2B%9AZ%8E%AE%3Eo%19%0B%D2%F0%93%AB%CF%D9%8A%81%B4%E5%D5%D5%A7%AB%CB%EB%8C%FE%01%97%AF%3F%5D%E4%DC%06%CCZ%DC%E0%E8_%DF%E7%8F%9F%3B%40%B1O%FC%7B%F4%12MQ%82%23%3F%F6Y%C8%F1%C1%3D%1B%EC%FB%5D%7C%8C'I%8A%E1%90%3C%40%BF5%DC%2B%EB%25%B1Q.%19%92%C2%ED%ED%11%01%B9J%E80C%D3%E9%DA%EA%E1%B2%EAy%B9%DF%7D%B8%9A%D3%B7%E7%FA%D5%C7%13%1D%0F%D6%F3%CB%AB%25M%25%87%1F%3Fmb%86R%1B%E0%F8%E3%A7%AD%8Ag%FB%AE.%CFv%3F~%3A%D0'%ACV%E0q%ABn%7C%0Ch%E2%98%8EO%1F%3Eu%E8%EEj%98%07%BE%9A%3C%40%AD%02%EDtqoQ%C36%A7%40%93%14%D5%C5R%14%C3%F2i%87%9C%25%0F'Pm%B4%2077%EEu%128%20%9C%FEx%2F%07)%A3%A0%A0%C8%26%FEa%B8%CF.%3E%CE%16%12%7C%0AV%2F%DF%1F%E9yxsq%B9%A8y%B8%BD%0F%97%1B%0FDhy%CA%3E%5CnV%14%CC%ED%CB%CBe%CF%FB%8B%CB%A0%EE%D4%8B%8F%17%17-%E5%C35%F99%3B.%DF%7D%E8x%5C%3C%5D%9D%87(%0C%CAR%B2%09%D6L%80Q%E3%D6%26%91G%C9'%9E%23%93l%B7l%CC%91%AAB%83%40l%C1%2F%92Is%20%0DF%B3Q%92%14%FD%86%86%83%DCo%CE%DF%CF%14%24%5E%F9%BF%F2%FE%DD%A1%9E%87W%E7%EF5v%04%EC%BE%BBX7%98M%DD%7Fw%B1QI-%B5%9C%9F_%04%B0%CD%8B%8Bu%5D%83%F7%BD%3F%BBX%D1%F7%0FMx%DEqqv%D1%F1%98%F1%87%C6%F4%03v%1AB%95%87%82%85Pu%94W%A4%F9%5C%5E%9BM%C9YX%22%FC%1C%AA%B2d%2Ce%D3%245P%FE%23%92%80%91%07r%5C%DB%0C%0DS%BBO%DF%BC%9B%D2%1F%5C%3A%3F%DB%C3%8Bs%12%D6%E3%B7%EF%E6%B4%F1%C7%F9%F9%AA%C1%7C%DD%CE%D9%F9Z%25K5%7F~%BE%8Dc%1D%E7o%DEx%8A3X%D6%A3%B3%D7%E7%D3%95%9F%1F%5Er%F6(%1E%1A%24%A3%3C%E05%0Du%0D%0D%0DMMM%DEZE9%F9%E0%B5%14%C9%F3t%8Cbc%B2%D0(q%1C%CDRI%5B%91%FD%02%98%A37%DE%C5%F3%0C%2B%07x%0Fg%D9%DC%C7%AF%DEN%EA%1Bh%E1%ED%AB%5D%0B%AE%01%C0%EDG%A7og5%BAa%EB%F5%9BE%8D%F2%AE%E6%22g_%BFY%A9%40%83%1D%DE%7D%00%3A%1D%D9%D7g3%C5%AA%07%1B%3E%3B%3D%7D%BB%D6ZI%E0%82oN%DF%04%FF%A8%3C%C0V%17!%D2%22%0C%E5%A4ZY%20%9AD1%F5%3C%01AQT%AF%E0D%CDK%84SI*%9E%E8%E9%24%14%F5%83%13%B8%DA%E6%5E1%D1MQ)%A9%0D%18Hvb%EE%C3%E3W%13%FA%F6%99%7Bu%7C%B8%F92%FFB%7F%5BG%C7%AFf4%856NN%B6%C6F%C7%E0%1F%DC%8C%8D%8DX*%F3%B0yr%BAT%E1%DC%E8%EB%93%1Dd%8D%87_%1F%EF%DB%B5%2C%C0%AF4%F7%FA%F8%E8%F4d5h)%AB%5E%83%A7G%A7%C1%3F)%0F%B2G%CA%B04%C7%B1%B1n%C1%A7%0C%C79%FD%A1Hg'%D3%C90%3C%9Fp%C8y%BEp%12%7D%ECV2R%84%B7%3D%12j%C6%95%D0%3F%C4t%92%9D!%1Fa(%EFo%DF%3B%3C%19%D7w%D3%D9%E3%FD%83%23%1D%0E%F6O4%FA%0B%AC%1D%1D%1C%9E%E4qzX%25%9E%DE8%3A%5E(%2F%0E%96%ED%C3%93%11%F9)v%0FO%06%8A2%B3%F0KO%C2%9B%1E%9C%9Cl%0E%DA%CB%98%A1%E0%F1%C1%F1%1F%95%07%C8C%82%8411%B4%CC%24%8FR%DDj%F7P%A7%19%A83%0D%A0%40%A8P4%97M%DEU%BA%3F%2CA%10%98%D6%D2T%E3!%BBw8%AA%3F8s%B8%B7w%A8%C3%DE%EE%A1F%7F%81%95%FD%DD%BD%FD%83%1C%0E%AB%E55%D6%F6%0F%E6*(%F9%C3%BD%1DY%0C%C0%C4%E1%FE%1A%5E%A4%97%E0%BBuy%FF%60o%F7%E0h%7B%C4R%22%12%81%83%BD%83%C0%A3x%F8%05y%E0%93%1C%13%85%12%91%1Br%C0p%9B%C3%E9P%E0t%C8%139pG%EE%B3%0Ct%DC%E1RZ%1F8%E4%8F8fd%1E%93%7Dkg%3F%A3%EF%A8S%7B%3B%9B%99Lf83%0C%91%91%FFF%B7%B2%7B%E3%9A%86Z%DA%CDn%CC%E51%3F%5B9%EF%0D%96w%F7f%CB%9FY%DA%DD%9BT%AAt%EFd%F7%02%A5%81N%EB%CC%F6%FENvg%7F%D5%A3%1F%9D%0A%EC%95%5E%60%9C%07%E8j%1A%E0A%12%7B%608F3%24'(Y%22%5BX%10%05%04%B4M%3B%D1%13%11%8C%A8%1C%EB%87G%FB%95%93%92W%99T%19%92%84T%BF%E454%B1%CF%FErkgX%DF%00%13%D9%ED%25%9D%A3%88%AFoe%C74%3C%2Clg%A7%8C%8Dy%82%C5%ED%ECtY%3B%DD%B2%BD%B5%E5Q%3F%CCd%B3%2F%F2%26_3H%E6%1EZ%DD%D9%DA%CCn%B6%E8%EE%D4%9A%DD%CA%B6%3E%96%07%DE%08%0F%A0%C6%DF%16NFi%3E%1A%A3%D5%A1%1F%87%24%C4%A1%AF%04%C1%26U%A7%0A%C6qh%FA%12%0C%ED%C88%95%84%B2C%F1%5DB%BB%F2%A8%FE%FE%AEDBj6%A2%960%FB%DA%C6%D6%90%FE%E0%F8%D6%CBE%DD%3C%2B%CB%EA%C6%D6%88%A6%11%E7%5EnN%1A%CBk%80%F9%CD%CD%A9%B2g%E0mfr%15x67%5Ez%CA%86m%D6%C1%8D%97%1B%9B%CB%D6%E2%3B%B5nml%B6%3EM%2F%95%8E%E8%CA%F1t%B4%8B%13%1Cj%10M%A8%CC%A8YS%BC9%D4%D9%2B%A4%60%9F%87oI%F1%97%A0%3C%A4%FAeq%80%07S%B2%40H!%C5%D0%F9%25!%89%D2%E3F%FC%25%FB%CA%DA%C6%80%FE%E0%D8%C6Z%E9x%DC%DA%866%094%BB%BE1n0~x%B1%BE1Q%3Ab%0D0%FB%EA%EA%DA%CC%10R%7D%C3C%C3%19%F8%1C%A3%15%82%EE%96%E5%B5%D5%97%03%C5%A4%B7l%AC%AD%3F%89%07%D1U%DC%3Eh%CF%9F%EA%E2x%B2%97%16%D4%3C%1F%C0%BCR%9E%07u%20%CA%96%07.G%CE6%872-%20%BFAP%B4*%9A3%00J%E7)%97%E7aqe%ADO%DF%2FFVW%5E%E8yXXY%1D%D2(%8C%E9%95%D51%83%3C%CC%AC%AC%8E%97%99%26%03%FA%D6%96%97W%D6rX%5E%5E%5E%AAd%EC%5BV%97W%E6-%25%87Z%9Eh%A7K%02u%BF%40%F3%5C%94%8C*)%0BD%85O%CC%F1%20%AB%7C%A2%C9%5B%80MN%C16k%8E%E4%F6q%C5%A8%CB%1F%9D%C6f%7D%DB%E7%17%97%FB%F4%07%87%97%97f%F4%3C%CC-.k%E4%06L.-%8F%18%E4ajii%B4%CCl%25%CB%8B%C5%85e%0D%96%16V%3A*Lk%02%A3K%0B%8B%EE%A2fkY%5EXjy%A2%3C%14O%FF%81%D5%FBS%09%3E%CA%F3%DDB.%BF%84%F9%84%02%0Fh%FD%8F%24%A1iKi%18%DFI%92S%EE%F3%82%84%C6%EB%D0%A8%1D%3C%03%FF%A7%25%C9%2B%7B~%C0%01%0B%A7%A5f%60hY%90%7Dv~Q%9F%1F%C0%06%17%17%A6%F4%3C%CC%CC%2F%F6iM%F9%C2b%C6%20%0F%93%0B%0BEimU%2F%07%16%E7%16%FA%82%05%C0bS%96%92%89%23%CA~%60q~%A1%B8%D5%5B%16%E6%16%9E%C4C%BFS7%D3%04M%C6%E8G%E3q%2C%9DnP%E5%01%D3%C8%83%AC%A9%9A%23%DD%09h%0C%FA%D1%88%9B%9CQ%C2%A1S%94FNR%8A%17%D3%B2qH%D6%A9%8B%B6%DA%A4%94%C0%B4%11%C6VgYg%5E%CC%95%F000%F7bB%CF%C3%D4%EC%9C%96%87%B1%17sC%06y%18%2F.%AA%C6i%F88%BCI%91%E5%9D%9F%9Dk%D5%94%C25%F9%1A%CF%DC%EC%5CK%91%16AG%3CO%D2K%8D%A0%B8%A7%22yx%CE%A0q%20Jh%CB%AD%7D%F0%09t%DE%3E%E4%23%08gM%8D%AB%C6%E5%94%3D%19%60s%C1%7D%97%B3%C6%A1%EC%D4%B8l9VQ8A%E0%18fh%FE%BDurf%B6d%BAD%DF%EC%CC%98%9E%87%C9%E9Y%0D_%60dfv%C0%20%0F%A33%B3%83%25%89V%CC3%3B%3D%1B%D0%F6G%CB%F8%F4l%26o%3C%AC%1DC%A00%B4%E1%99%99%9E)%9E%89%00%2F%9Fy%12%0F%89H%83%C3%A6%05%40)!%9A%E6)%9Ad%7B%9A%95%F18Gg%5C%E3%2F%C9)%A66%BF%DFo%2B%1E%96%02%C0%D5%E6%05%F9%C5%8B%AA%A3%EF%83%05%DB%FC%84%A1%B1%01%C8%C3%C4%E4L%09%0F%1D%D3S%23z%1E%C6'%A7%B4%3C%0COM%F7%19%E4!35%D5W%EA%06%0DLM%8E%17%07%7F%C1%E9%C9)%B7%9A%3D%F0L%CELY%0Bz%230%3D9i-%FAB%9E%A9%C9%A9'%F1%40%C6%C5%E7%5C%B27%9EP%91%F2%01P'%C18%80%A3Y%B2%5Bh%F7A%F8%93%CFY%8D%BF%24%0F%05%B5w%A6%A4g%40%3B%D7%0E6%7F%A3%E4%2B%D2%A4P_%F9%24Q%E8%8D4%03%83%13%80%ADc%E3%93%A5%3CLLd%F4%3C%8Cj%CB%01081%D9a%90%87%A1%89%89%BE%12%1A%EC%E3%E3%FA%0A%D0%A3%E4%0E%B9%A7%C6'%0A%B7%C3%87%C7'%06%8B%BF%8Bgb%7C%C2%FD(%1ED%92%E2%99%24%C3%EA%90%60%08%40%90%D0N%D3%2C%C7%26yADqr%3CI%F2%D1(O%8A%BE%C2%B3%136%07%A1%B3%EF%18%E1%24t%F2N%A0%5C%87%8D%C0%8C%C2%3A2%3A%1E(If%8E%8F%0D%EAy%C8%8C%8D%075%8B1%06%C6%C6%8C%F2PR%14%3Dyp%7Ct%5C%EF%A6v%8C%8D%8EYU7%7Dpll%CCSx%9E%D1q%9DQv%C3%B2%8F%E4!I%D1q2%A9%E7%81%EA%24%D0%00%03%1Aoc%D1%24%3E%C8F%17'O%99%A4%D9dn*%25%0A%A0%7D%A1p%3D(2%EF%18h%0C%13y%D9%40%ADck%8B%84%C2%A1P%BB%C3%F0%8A%20%EBPf%B4%B5%84%87%D1%91%01%5D%05%F8Pf%24%A0!%BCo%243%10h%0D%04%D4wk%95%BC7*%AA%F1%8Bd%FDb%81%D5u%E8%9F%D1%3E%92%19%CDM%A1t%8Ff2%99%16%D9%CAY%83%23%99%91%3E%BCx%96%8E%1B%1Es%3Ff%7C%BAQ%E4%B8(Z%E1%A0C%12%CD%25%26%3AS%7Cw%82%E4b4%07%AD%04%0DM6M%A5%12LT(%F0%00-%B5%CB%91_%C1%A8%D8s%BC%A6%1E%07%9A%95%EF%B8%B3%AE%16%C2E%18%9F%E9n%19%1C%CA%94%F20%3C%DC%A7%AB%C120%94%09h%E4%AEc%08%5EX%C0p%15%1E%3A%86%87%B4E%ED%A8%E6%96%CC%60%C6%AD%9FR%85J%0E%E4*j%CD%0C%0D%0D%F7%05ZZ%83%83%99%C1%E1A%AB.%A8p%C3%B3n%9D%E25%AA%97h%9A%8C%D1%25z%89D%23%08%8E%A4%40%C1%F6g%A08%C4%A0%C9%8Ert%BC-%F4%9C%D1%EA%25%CC%E6E%26%B8%18%E8%88%AF%B9%D6%E5%AAm%92w%FD%D0%BAx%9D%C6%D7%C7%81%12%1EP%AF%0B%0C%0F%E9x%00%96%81%C1%E1%80ft%00%F2%A0%C5%80%A5%F2%3C%A9%8E%E1%A2%A2%A8E%F1%BE%A1%A1%3E%BCdU%91%1B%B2%93SF%A0%05%D6%3A88%84%EE3%D4a%D5L_R%12%B4%C3%83%C3%8F%D2KuRO%22%9E%88%E7%EDs%0E%3D%BD%84%BC%207%9C%8E%93Q%3E%CEs%24%17%A5%19Zl%C7%5DRL%F2iR%8F%00w%D4(Yn%E8%C0%D6%C8%BB5hO%7D%E7O%11%BF%B2%5E%D4%12%08%06K%3A%A6'%18l%D5%EB%A5%40%20%E8%D14Dk0%A0A0%80W%A6%1A%16%0D%AA%A5%D0%C6%22%AB%9A%40%D0%5D%BA%D2%07%87EZ%F3%CFn%0F%F4%0D%20%F4ux%00%A6%9F%BEo%875%D8%1F%A3%97%08%7Fg%04%BD%F4%E8%F4%A3y%81h%81z%24-%C6%12%89xO%FC9%97JGl%18%11%E2%3Bk%B5v%19w46%3F%0C%17%FE%2B%CBE%CB%CF5%AB8r%01%8A%A7R%1A%98V%89%95%84%C8%C5%E3%D0%BAB%40%B3%D0%0AX%EC%9E%16%8F%DB%8AW%B8%19x%8C%5E%C2%F2%23h%3A%E4%96%C0%01%A2%D1%1FV%A8%89%A0QM%80%86%E0t%0BK%89gM%08%CD%E8Oy%E9%D0%DCh%FB%D5e%EC%A5%C5%1F%5C6X%B2%F6%04%3C%EAv%00%2B%B7p%16%D3NL%D3%B9%DF%D5%17%83%19%FF%5D%87%8A%CB4%D5%15%AA%B9%C1O%3C%17W%EB%12%828QS%AB%81K%FB%A1%F6%194%13.%DB%9F%5B%C6%5E%D2lO%BCOi%7D%BFp%01x%2C%0F%BF%A5%25%00n%A9%A9%7F%06%5B%BC%3E%0F%F4%09r%F0%0Cn%9F%D5%D7%DA%FE%E5_%C4%FA%2B%3C%14%D4%97%C3US%06N%A7%AB%86%00%FF%F4%0F%93%FD%BD%DF%85S%A2%06%C4D%19.duf%F2%F0W~%9FO%C9%EA%11%0E%9B%EC%B4%A2%3F%C5cu%D8%1C6%F0%AF%FFJ%DF_%E2A%EBK%14%E6%CD(%20%0A%BF%FF%60%F2%F0%87%ED%03%00%E5%1C%15%A0%F1%C4%80)%0F%7F%F3wCKG%DA%F2s%F5M%FB%F0w%F4R%99%C1%CE2%F1%AD%C9%83%09%13%26L%980a%C2%84%09%13%26L%980a%C2%84%09%13%26%FE%0F%F0_j2%0F%EE%9E%8B%AE%D4%00%00%00%00IEND%AEB%60%82";
const FAVICON_LAST = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%BF%00%BF%00%BF%FE%083%8A%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%04%15%16%1C%12f%C7%15%FD%00%00%00%25tEXtComment%00Created%20by%20Renegade%20with%20GIMP%A1-%04t%00%00%01%D3IDAT8%CB%AD%93%B1kSQ%14%C6%7F%DF%CD%7B%2F%096%89%86H%AD%1A%9C2X%E8%7FPE%10%11%C4%AEBC%E7.%82%0A%FE%05%D2%C9%A1%88%83%FFAy%05%D7v%11%D7%CE%8E.%01%15%A3T1%82MZ4y%C9%3D%0Ey%A9%2F%D1%8A%83%07%EEp%0F%DF%F9%EE%F9%BEs%AE%98%89N%BD1%07%AC%00k%C0-%A0%0B%EC%01%5B%C0N%AD%DD%3A%CC%E25S%BC%0A%C4%FC%3D%9A%B5vk%7Brq%99%E2%0D3%8B%CDl%0AmfS%07%88%3B%F5%C6%C6T%07%9Dzcu%80%C5%9F%CC%93%00!pNc%EE%7D%EF%19%A6%7DN%F2%D1%B8%ACYk%B7%B6%95j%EE%7D6%CF%0D%FF%FD%F8%E5%5DW%04%E0v%26%07%F0%D2%15%99%D7q%E3%A5%205%8C3%12%3B*%F0V%C6%3D%DFg%C0%2F)O%5D%9E%8B%26%A2%14%97%89%95%20u%9B%08Q%97%23%C1%FF%E6%9AC%04%12y%C0%1B%18%86%C6Dk%01%B0%9C5%24%CB%9Fj%E5%81%FF%01%C0y%C4%7DE%5CU%8E%C2%18%B2%1C%9C4%2B%01%F3%12%BB%AE%C0%00x%E7%3D%5B%0Cyl%7D%96Td!%25%0F%5E%1Cu%DD%A502%00o%C6%07%019%F4%26%19%D8%20%B5%C1%80%AA%C45%3CO%1Cz%9D%F4%ED%9B%C1%FBa%E2%82%9B%A7%CA%EB%40%3C%C0%D8%F7%9EH%06%BEO%18%86%0A%11Ju%7F%C5%D83%A3%8A%B1%18%E6%B5%20%C7%E5%7Cq%5D%8FJ%A7%AB%17%82%F0%CB%81%60%B3%10%BA%13%25%99Q6%B8%3E%1C%D9%E2%C8%2C%02%3E%0E%93%B3%7F%5C%24%9B%DD%F1t%12E%A0%82(%00%92%C6%8B4%01l%CE%95%AC%ECr%23%FE!%BA~%94%7Bx%D8%D3%7F%F9L%B3%9D%F2%ACT%A98q%C7%A1%A6%83%2B%06G%06%AF%3C%16%7B%E3%F9%DD%DE%C1A%16%FF%13E%B8%BC%E2%F8%1A%B7%C2%00%00%00%00IEND%AEB%60%82";
const RESISTANCE_TV_ICON = "data:image/gif,GIF89a%7C%00Q%00%E7%FF%00%F8%F8%F8%7B%CBEm%B2%3F134%A9%AA%AA%01%04%04%F6%F6%F6%F4%F4%F4g%95Im%A7Fr%BAA%24%3B%18%D5%D5%D6%D0%D1%D1%EC%EC%ED%AD%AD%AEk%AE%3E%2CH%1B%9C%9D%9E%1C.%15%22%24%24%3Da'%C5%C5%C5%84%D8I%7D%7D~%E8%E8%E8Jg8PQR%F0%F0%F0%81%81%82yzz%19%1C%1C%11%14%14%B2%B2%B2%F2%F2%F3%B5%B6%B6%0A%0C%0Chjj%E3%E3%E3%90%90%91npqc%9C%3D%84%85%86R%860Z%925tvw%99%9A%9ACm)TUV%95%96%96%3C%3E%3E%EE%EE%EF%CC%CD%CDM~.%E6%E6%E6z%C0LPkA%A1%A2%A2%FC%FC%FCFHH%B9%BA%BAu%B5H%2F11Er)n%B8%3D%88%89%89%5ChU%D8%D8%D8BDE%3B%3C%3Dt%C0B%DE%DF%DFKy-def%3E%3F%40%0A%12%09%16%18%19V%8D2%CA%CB%CB%26()CY8%C2%C3%C28%3A%3A%BD%BE%BE%9A%9C%9C%1E3%13%9B%9A%9Eaab%06%09%09HIJ%E0%E0%E0%3E%3DALLM%15%15%1A%1F!%22%40%40CRST_%95%3DEDH4U!%2B--DFFILLn%B4%3FNWKXYZ%5D%5E%5E%DA%DA%DARNU%0E%10%10%C8%C8%C8b%A08%E4%E4%E4mlm%C0%C0%C0%2C..ceekmm%C8%CA%CA%8B%8C%8Cy%C4G%A7%A8%A8VXX%9E%A0%A0%81%84%84Hv%2Bd%A5%3Astt9%5C%22g%A6%3D(**%8C%8D%8EVVX%16%23%11%7C%C8H%5D%997%97%98%98Z%85%3E%10%1B%0CIKKEc4%A6%A6%A7%7F%81%81%25'(%DC%DC%DD9H1%BB%BD%BC%82%83%83.%2F0RTTOPQghh%92%93%94%19(%13799NNP%5E_%60rstpqr%13%0D%1B1P%1F%1D%1E%20%40g(%14!%0F)%2B%2B%06%03%0E%FF%FF%FF%FB%FB%FB%FA%FA%FA%DD%DE%DE%F1%F1%F2%EB%EC%EC%A7%A7%A8%CF%CF%D0%B7%B8%B8%A3%A5%A5%AE%B0%B0%C3%C4%C3%A8%A8%AALKN%86%87%88r%AFHACC4676Y%22%EE%ED%ED%5B%5D%5Da%A36%60%60ad%A87%E7%E7%E7%8E%90%90%5C%88%40%EC%EC%EByxyt%BEB%05%08%08%D2%D3%D3nopXU%5C%C3%C4%C4h%AA%3C87%3C%9E%9E%9F%14%18%17Y%89%3A%9B%9B%9C%AF%AF%B0r%A4Rwwx~~%7F3B-%C3%C1%C2%ED%ED%ED%8E%8F%90%ED%EE%EEp%9CU%88%88%89Ip1%92%94%949%3B%3B9T(ikk%FD%FE%FE%A3%A3%A4%C0%BF%C0s%C3%3Dbbd%7D%CFER%5EL%1A!%19d%A3%3Ag%A1A%FC%FC%FBRgFWgL%DF%DF%DFZlOfghZY%5C%8B%8B%8C%221%1C%FA%FB%FB%FE%FE%FE%C7%C7%C77%3F4%C1%C2%C1%C1%C2%C2%EF%EF%EF%DB%DC%DCP%83%2F%E5%E6%E6%E6%E6%E5%04%07%07%00%00%00%BF%BF%BF!%F9%04%01%00%00%FF%00%2C%00%00%00%00%7C%00Q%00%00%08%FE%00%FF%09%1CH%B0%A0A%7F%08%13*%5C%C8%B0%A1%C3%87%10%23JLh%B0%A2%C5%8B%FF%26j%DC%C8%B1%A3G%89%18%2B~%1CI%B2%A4%C9%85!3%9E%5C%C9%B2e%C4%8B.c%CA%8C)r%A6%CD%9B%24%0B%E2%DC%C9s%E3%C0%9E%40%836%14(%B4%A8Q%95F%93%F2D%AA%B4%A9%D3%A7P%A3J%9DJ%B5%AA%D5%ABX%B3j%DD%CA%B5%AB%D7%AF%60%C3%8A%1DK%B6%AC%D9%B3%0E%89%15%40H%AC%1F%B1%85%FD%FC%F5%5B%F0%A2%CF%8B%08X%E4%A2%8DY%A0%0D%18n%05%DE~%F8%E3%A2N%5E%125%0C%E1%19%16%C0%D0%8A%25%7Be%FAX5%C2_%01%12%12L%7D%3B5%A8%00%AE%26%3F%92%0D%D3W%81%C5%8B%BC%91%5B%DE2e'%AF%8C%03%23%A4%3C%90%A5%C8O%1FEM%FCT%01U%23%D9%82%D4%AAQ%F1%40%08%C6%943%26_(UQ%00a%C1%8A%26%13%00%1D%3AS%01%F8%CA%02jPQA%D8%C2%D4%B6%16%0C%AC%FE%2Co%8E%E4%CD%0BP%A3X%88%B2~%B2%80%8C%7D%CB%88a%01s%60Y%1B7%12%14%05z%A3h%CC%19%05%8F%E9%13%01%7B'%7D%B0%CF%01.H%40%87%2B%AB%20%02%005%9E%BD%B0D%26%A0%2C0%CA%185%40F%20I%050%E1%82%24%F4%D0%83%02%11%3C%14%93%834%FE(%F2%02%0Bo%1CRC%13%2Cd%B2aI%FD%F4S%40%8Dq%F9C%02%08%08%ADUH%1F%E7%24%F3F%0D2%AE5%E3%91H%26%A9%24V8%E2(%1F%16MF)%E5%94TV%D9%241%24%40i%E5%8DVv%E9e%95%1A%D5%88%C5%04%99%14%A0%C8%0F%11%94%F2%E5%9Ak%16%F0%814(%80P%E5%8E%A4h%C9%E6%9DT%86Y%C0%04%02%D4%E0%CF%04%E4%24%F2%09%97x%16%8A%A3%3Fs8%00%C9%00y%A6%01%C0%03%1F%18*i%8Dzf%02%01%12%7F%06%FAIB%84%1A%D9c%94%9E%22D%A9B%87*t%A3%9B%83%0C%F2H%8D%A1%AE%C5%8B%01%FE%0F%F0h%99%A9%AC%CE%CA)%8E%AD%82Z%C0%AEQ%86IB%04%10%AC%A0%C8%02%01%24B%C1%04%0BdB%C2%8D%FE%2C1A%15U%14%B2l%93m%F8%E0%85%26%3B%90%F2%D6%13%3B%98%A1%04%13%B3%22%B7%08%11%3E%80%B0%2B%09%5E%7C%D0V%01%20%14a%C6%0Es%5C%26%0D%00r%94A%C1%1C%20%90%91E%19%E5%EE%FAA%B9%94%2CR%C6%1C%D3%FAS%ED-%94%7C%40%82%8D%0C%B7%C1%0C3m%10%9A%A3D%C4%C4%83%CE%19%02%84!%8A%11)%84%81%C7%05%02%88%12q!H%00a%88!%81%40%F1%01%97%05%14%A1%C5%14%A6%982%05%13Y%14%13%B3)%0F%C8P%C0%23%04%DC%BC%0A%3Cd%14%F0%04%03%F7P%E0O(9%DC%0CG%09z%E4c%0A%00%26%80%03%C92G%C4%9CA%07%F1%5E%A2%C5%1E%FC%C4%CCN4%E0%CEAE53%E0%F3%80%1A%14%60Q%00%16Op%01%86%1Ebx%D1d%98%E6h%23%40%0A%DD%80b%84%FE%02%E80R%81%1FxD%82E%13%C3%20%80C%05%BB%DC%B0N%17%A7%DA%12s%2B%B2%A8%00%86%16%07H%80B%D2%A9P%82%88)%23%A8%C0G%06%A6%60%C2%04%19%F8d%8E%85%0A%A6%E4%10%87%0A%D5%98%E2%8D%0B%A7%14C%CB%091%3B%D1%018%A8T%23%0C%08%7F%D4N%CB%2B%A68%40%08%25N%98%D2J%23%92%98%C2%C0%3BO%F8%23%08'%96%F8p%CB%06%84%84R%AADq%8D%02A%1F%FEd%12%40%02%F5%20%24%CA08%2Cp%06%02_%94%E2O%15%40%60%A3%09%94%05%D8%92%0E%3B2%F8%C3D%CF%18%24%94%19%3CC%18%D0%01%8FY%88%81%25%B0%E0%85%0C0%80%02%20p%02%00*%81%10o%E4%81%02z8%00%2B%B0%A0%0BS4%80%12%08y%80)%84%E1%05O%00%A0%01e%F0%071F%A0%83%3F%E4%C1%14%B2%D8%00%08%DA%10%02%E3%DC%82%04_(%03%09%10B%82%2C(%E1z%11%B1%D1%04%20%E0'%40%01%A3%0B%FE%08%01%04%10p%80%04%01%20%40%03%11%88%00%20z%91%004%98%AB%00J%00%00%2Bx%14%8A%7B%98B%02%250%C6%25%080%8F%07%DC%C1%14%D5%08%810%EA%80%82%3A%D4a%12%22%C8%C0%06%88!%0D%1B%D0%80%0AE%D8%95%3F*!%029%7C%C0%0CSh%81%12%F4%90%04d%98%E2%19%B7%B8%03%00%9C1%00%83-%C3%14%93%60%85%3C%9C1%8B%B7%94%C1%0D%8EhC%11B%80%02n(%E1%0BE8%81%0B%DA0*%EC%ED%09%08%FAX%DF%05%9A1(%7F%88B%1C8%60%81%11%20%90%80Z%B8%B2%07%D0%10%02%E3%0A%B0%83A%B6%C1%1F%3E%18%82)%F0%A1%0A%11%88%80%03%00h%84%140a%82%9B%193f%1C%90%84%0C8%B1%06S%2C%A3%08%82%60%82-%AA%C1%80%0F%F8%C5%0D%C54E%06P%11%0C%5B%C8%E2%14%93%10%84%3F%BC%10%85%03%A0%20%09aT%02%94%DA%40%81%5B%5E%E1i%07%00%00%00%0C%103%26t2%87%FD%FE%F8%40%3B%A6%C1.u%94c%96%8AP%07%1A%26%00%05!Db%02%F1%88%07%99%98%01%3F%0FJ%E3%96Q%5C%03%2F%8A%A0%04%19%10%E1%09%A4%08%01%0Fv%A0%04%18%94%40%1A%1D%F8%C3%06%C61%09%3A(ae%5C%80E%06%86%D0%81%11%3C%E3%00%0C%60%02%13%8Ag%01%14%2C%C2%16%0D%00%00%11%08p%0A%0C%3Cb%9C%16%E0%40%126%E0%8B(%EC%40K%20%08E%01%E8%60%8A%3Dpa%03P%E5%86%14%1661%7C2%81%0DO%B8%CC%16%D8%C0%04f%89a%16%FD%08%C51%94%91%10%12%F8%C0%07%11%2B%00%06%00%D0%09%1E%F9%40%0B%06HCB%10a%015h%D0%03%09q%C7%10%AC%91%CFM%D0B%0E%93%F8)%08Z%88%09%1B%0C%01%00%C5%60%A7%F2%C8%80%90%22%F8%E2%00%3B%3D%854%9A%E7%85X%A8%A2%04eX%83%03%C6%F1%966%AC%C1%0D%A4%E0%84)b%A0%90W%FC%82%AAa%EA%07%13%60%F0%856%B4%C1%16%96%E8%FEj%5Cv%C0%05%12%90%00%0C%60x%C4%8D%06p%85%F7%D9%C8%03%00h%81%B9%FA%81%3A%06%5C%81%0C%838%05%07%60%C0%0DSp%20%B0%9CH%85)%3C%40%8C'x%D4%14%AB%90%86%14*q%84%5Cd%C3%04%AE%10%81*Z%90%86%5D%D2%C1%1FDhE%F0%22%3B%D9qZ%D6%13m%80%05%CEn%C1%8C%CD%85%83%0C%82(%06%00%3C%10%98%3Dp%0E%87%10%A9Q%1B%60%90%86Yx%E1%0B%B1e%16m%17%16%0AB%C0%00%B7i%D8%84l%0B%E0%81%03%FC%C1%5C%FE%F8%40%1Et%60%00U%A0%C2%17%D2%60%021%E8%A0%03%00p%C0%00%3A%60%C5O%05%01%83%018%A2%C4%220%00%00b%A0%07%13P!%0A%A7%10A%0CT%C0%E1j%88%80%06%268%05%18d%01%00%0CP%D6%1E3%E8%04%3B%15%C8%81k%A0b%08%84%E0%D1%22L%00%00%078%00%15%99%03%F0Cp%F4%01J%90%82%09%5E%10D%C4l%F4%88Gh%A9%0D%94%F8%82%FA%0C%9E0%E6%1AQ%60%11%03%A0j%3F%B0%A0%04%0F%9C%40%BBr%AA%D1%13%EA%80%89l%EC%20%CF%A3c%02%16n%11%8D%20%D0b%03%ED%E4%C6%1C%98%A0%07OH%A1%0D%DC%98D%0C%BC%E1%05%0A%80A%0A%03%D8%01%7D%2F3%80%2C%DC%E2%96%1FP%C2%06%92%E0%8E%17Rj%0E%DE%D0%A2%1E%AC%A7e%87L%8AJ%12c%D5%AEbm%A3Y%C3%DA%D6M%E2%95%ACY%C6*P%E5%1A%D7%BF%D6u%AB%1B%F2%EAb%1B%FB%D8wJ-%B2%97%CD%ECe%2B%BB%D9%D0%8E6%9E%9E-%EDj%5B%7BJ%D4%BE%B6%B6%AD%9D%EDm%7B%BB%D9%DD%FE%B6%B8%8D%1D%EEq%9B%DBP%E5%3E%B7%BA%D7%94%EEu%BB%1BL%13y%B7%BC%D9%D4%EEy%DB%7BI%F8%CE%B7%BE%F7%CD%EF~%FB%FB%DF%00%0F%B8%C0MB%94%81%13%BC%E0%06%FF%08A%12%AEp%9D0%DC'%16y8H0%22q%87%A4d%E1%15%F7%C7%C5%2F%AE%EF%8D%13%24%20%00%3B";
const SOCIAL_BAR_BG = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%18%08%06%00%00%00%3B%CC%97%DA%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%00%00%00%00%00%F9C%BB%7F%00%00%00%09pHYs%00%00%0D%B0%00%00%0D%B0%01%7DeY%FA%00%00%00%07tIME%07%D9%07%10%0E%005G%F1%85%E1%00%00%00%25tEXtComment%00Created%20by%20Renegade%20with%20GIMP%A1-%04t%00%00%00DIDAT%08%D7M%CB%B1%0D%80%40%10%C4%40%DF%B6%F5%FDW%02-%A0%8FX%13!H%2CM%60%D6Z%E68N%B2%F7E%042B%9C!%B6%A4J%ACDo%D2BP%D2%96%A8%A4%F6O%DF%83%99%11%C0%00%7Cy%00%C9713e%5E%10-%00%00%00%00IEND%AEB%60%82";
const SOCIAL_BAR_SHADOW = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%01%00%00%00%09%08%06%00%00%00%F3FF%E4%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0D%B0%00%00%0D%B0%01%7DeY%FA%00%00%00%07tIME%07%D9%07%10%0D%03%22%EDI%ED%BC%00%00%00%25tEXtComment%00Created%20by%20Renegade%20with%20GIMP%A1-%04t%00%00%00%26IDAT%08%D7%05%C1!%0E%C0%20%00%00%B1r%24%08%C4%1C%02%C3%FF%9F%B9%16F(%CC%B0%C2%0E_8%E1%86%F7%03%06L%00%81Bx%C78%00%00%00%00IEND%AEB%60%82";
const HEADER_IMG_LAST_SIB = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%01%87%00%00%00U%08%03%00%00%00%95A%D8%DC%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%03%00PLTE%00%00%00%00%01%00%07%00%00%0B%04%02%00%09%02%0D%06%05%15%07%07%01%0E%00%1B%09%0C%13%0E%0C%1E%0C%08%1A%0E%0A%00%17%00%22%0C%0A'%0D%0E%24%10%0F%22%13%10%2C%11%0D%00%20%00)%13%0D%1F%16%12%26%15%0D%2F%14%11-%17%12%16%1E%11%1C%1C%153%17%0F0%19%0F-%1A%0F*%1B%166%19%0C%01%2C%03%3C%1A%159%1C%156%1E%153%20%164%1F%202!%1A9!%13%2C%24%22C%1F%16%40!%15%007%02%0C5%046%26%24%3E%25%1C%3B'%1C%40%26%189(!%3D(%18E%2C%22%00C%0AG%2C%1E%40.'B.%23D.%1E%0E%3F%17M-%22G.*M.%1C%3F1.M3%24M3)G5-I5)%00Q%0F%08O%1AU63%5C5*U9*Z8*R%3B%2BT%3A0N%3C5Q%3C0%25L*%5C%40%3D%5EA1%5DA7c%400ZC2YC7VD%3E%00a%1D%0B_'gD6fI9aJ%3EeI%3FiH%40%5EKE2_%3DrM%3D%3E%5DEmP%40mPFwMHhRE%0Cp%2BeSK%0Dp4yVMuXGuXMqZMp%5BSvZTq%5D%5BGmQ~%5CX~%60OyaT%7D%60U%84_P%1F%82%3B!%82E%88cT%86fV%80h%5B%85g%5C%89fb%83iVmoh%7Fkb%89lf%81om%89o%5D%8En%5D%8Dnc%93m%5E%88pb%2C%92O%95tc%95uj%92wd%8Ewq%90xj%9Cue%99xg%7D%81w%A0zp%A2zk%9E%7Ckm%8Cs%9E~s%9B%80m%99%80s%97%81z%A2%80o%3F%A3%60%A8%82x%A7%82~%A6%84s%A2%88%7B%AE%85v%A7%87%7B%A4%89u%8D%8E%88%A0%8A%84%AB%89w%B1%8E%7D%A6%90%8A%AC%90%7D%B0%8F%83%AB%91%83L%B1p%B9%90%80%7F%A5%89%B8%95%83%C0%93%91%B5%98%85%BF%95%86%B8%97%8B%B3%99%8B%B1%99%92%BE%97%8E%BD%99%87%AC%9D%97%A0%A6%9F%C7%9D%8D%C3%9F%8D%BC%A1%93%C6%9E%96%C1%A0%94%BA%A2%99%BE%A2%8Ea%C7%82%C5%A8%94%CB%A7%95%C9%A7%9B%C0%A9%A2%C4%A9%9B%D1%A6%95%D0%A8%A1%C0%AF%A7%B2%B4%AB%C8%B0%AA%CD%B0%9C%D9%AD%9D%D3%AF%9C%D1%AF%A3%CC%B1%A3%D8%AF%A7%D6%B8%A4%E2%B5%A2t%D7%96%DC%B7%A5%D4%B9%AA%DB%B8%AC%E0%B8%B4%D0%BD%BA%D7%BD%B5%E9%BD%AB%C8%C6%C1%BB%CB%BB%DD%C2%B3%E5%C1%AE%E3%C1%B4%87%E7%A7%F2%C7%BD%EE%C9%B6%E3%CB%C4%ED%C9%BD%E7%CB%BC%D4%D3%CE%EE%CD%C7%CB%D8%CA%F8%CD%C3%F7%D1%BE%EF%D3%C4%F5%D2%C5%EB%D5%CD%FF%D7%BE%FE%D8%C5%FD%DA%CD%F8%DB%D3%F9%DD%CE%9D%FA%C0%FE%DF%CA%F1%E4%E0%FA%E3%E0%FF%E3%D4%DE%EE%E3%FF%E5%DC%FF%E9%D8%BC%FF%E6%FF%EC%E1%FF%EF%EA%FE%F0%F1%FF%F2%DE%FF%F3%E6%FF%F7%EF%FF%FB%EC%FF%FA%FA%FF%FE%F4%FD%FF%FC%2Fo%7F%8D%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%11%00%1B)H%E4X%5B%00%00%20%00IDATx%DA%ED%9C%0F%5C%DA%F7%9D%FFO%98%DF%12%0CAB%A2%BF%13%5D%26Nz%B6%01%A2!%3A%9B%A06%3D%A2%D2%83%89%C9%C0%D9%0D%8F%D8%A16%3Bt%CD%81%E7%A5%11%CE%80%B1%DC%8D%0A%D2%DF%E1%B4%82b%7F%E3%E7%A1%B3%1B%9EI%95%B8k%93a%96%CE%B0%A4%FB%A9%9D1%ED%A68%0D5%E5t%A6j%A2%F7%FE%7C1m%BA%EE%F7%BB%7B%E4w%5D%93%3E%7Ck%A2%B1i%94%CF%F3%F3z%BF%DE%EF%CF%9F%EF%9F%FD%D9fl%C6fl%C6fl%C6fl%C6fl%C6fl%C6fl%C6fl%C6C%1A%11%F7%11%04%22%86%91%B0%9D%F1%B1%E9%9C%1C%A1D%22dP%E3%A30b%24F%20%10c%E9%5C%3E%8B%C5%95%D7%C9sYl%3E%9F%97%F6%04%93%C3%97%A5%17%C8r%14%C2%D4%D4tEe%A5%A6%BC%A1A%23)%2C%AD%90%C9%CA%8B%15%B2%13%95%0A!%FAG%14u%95%E5%05%0Du%0D5%F5%E6%D6Vsk%FD%D9%3E%AD%C9d%96%D7%D8%3A%3A%CC%F5%F5%E6zm%BD%5E%5D%A3%D6%AA%D5j%ADV%A9%D66%88%C8%04%2C1%85%89%11%99i%91%84H%F8%CE%14%0A%86%A5UjN%97%2B%F8%3C%09%8F%C5e3%99%0C%26')'%9F%C3%C9%D9%93%94%CE%E1%24%D1%E31B%C4%03%18%F7%CF%81%80a%189%9A%1C%CF%E1%A4%E7%08%85ITr%24%81H%88%8C%22S%E8%EC%8C%0Cn%AET%A9%E4%0B%E4*%A9TiV%C9%E5%D5u%1A%B9%2275%BD%A0N%A3%91%A0!%E7%08%25%C2%F8%9D%7B%92%8A%F3%0B%F3s8%E9%FB%F2%F39%D9%1A%8D%A2%5C%23%13K4u%F5%ADJy%87%B9%B6F%DDj5*%F5f%3C%3A%3B%9B%5B%5BM%EA%FA%9AZ%ADJ%AB%D5%EAUr%7D%95%9C%8CQ)%89%5C%0A%91%9A%88%11%09%0C%8C%88q%E21%B6%A2%E2%B4%A6%5C%96W.Kc%C60%E8l%16'%89%93%93%9E%9E%CD%D9%B3%87%C3a%D0c%C9%D8%17%8BCd%24%86c%E0d%A4g%E4Pb%93%C8D*%23)5%95%C3%15%C1%F8%D7%2B%95%F2oI%A5Z%87%CBa%D4kUR%D1~%91T%A9m%AC%2B%2F%D7h%90%1E8%9C%EC%F8%84%EC%D2%D2%E2%E2%C2%D2%EC%C2%7CaR%8E%B0B%98%9E%A3%90%C8%40%1B%E5%95%05%B2ry%81F.W%8AT%AD%1D%ADjU%7DkWWg%2B%A0%B0%D4%B7%B6%1A%0C%F5%A0%08%95T%A9R%2B%991%99tZ%5C%1C%09%A3%90%08D%3A%86Q9%94H%A6Lv%BA%5CR%C0W(%24%CC8%129%95%C9e2%E1%DF%DE%07%3C8%9C%D8%24%3A%1D%98%7Dq8%40%0E%C2%C8%A4%9DI%9C%D4%D4%0C%3E%07c%A5R%E9%B1%8C%D4%5C%5E%01%CCV%B5%D6h%84%F4%A1%EF%F5%F5z%86%87G%7C.%97%AB%CBt%F6B%BFMkh%D4juUU%E5%9500%9CtN%FC%9E%7D%A5%A5%F9%FB%B2%0B%2BN%9C(%CD%91%14%2B%CA%15%C2%CA%06EF%AA0G%22%93%E5rs%95%E6%FAZU%AD%D9%0C%99%C9%DC%DA%D5%D1%D1j%86%F4%A4U%A9%D4*%B5%5E%A9%02e%F0%13%A5q4Z%1C%15%40%C0OD%C1%C8%0C%12%9B%99%AB%D0%D4%15%89%F8Y%92r%1E%93%B1%8D%CEb3%989%FB%20-18%8C%A4%24%0E%9D%1E%89%7Da8%84%0D%82L%879%96%9A%93%C1ds%99t6%AF%40.R%CA%CD%26%93Zo%B3%BB%06%07%07G.%8DLL%5E%0FL%F8%C7%26z%3D%0Ec%AF%7F%3C09%19%F0%F7%BB%BB%FB%60n74%9D%E0p%92%F7%EC%2B%AE%40%2C%F2%B3%F7%E4%94%CAp%93%C8%01%0A%0A%E1%979%A9%C2%8C%9A%9A%1A%B9%B2%C6%5C%0F%8A%D0%EB%F5%E0%0C%B5%EAZ%BDQk%B0%18%1A%1A%B5j%A5Z%DF%20%FA%B2%20%91%C6%13%B1)d2F%24%120%0A%85Y%10%BB%BF%A0%B2AS%26%12%F0%CA%F3%F89t2%93%C6L%02%EA%C0%1D0%C4sb1H%A2_%18%0E%00%82D%8E%DE%99%94%CA%E2%A7f%B0%05%82%02%91H%AA%D2Z%ADv%BB%ADwpplldddbbb%3E%18%0CMM%81%24%7C%D3%A1%60%20%14%0AN%87%A6%A7%83%97G%87%BD-%8D%D5%25%C2%9ClNRv%F6%9E%C2%FC%FC%FC%3D%7B%F6%E5%E7%E4%A4%E7W%94%96W%94%97%CB%D2%C1%BA%15%1C%890%A7%40%AA%2C%90%E6J%E55%FAz%E4%13%F5%F5%F5j%83%5E_%DF%A0%AE%D7%EA%D5%3A%B3E%BE%9F%97%12'%10%F0%C9%DB%E2%C8a%10%D4%02%1AS%20%AE%D4%94HE%3C%85L(c%D0(t%06%83%11%8F%92hR%3A%A0%A0%901%EC%8B%C3%01%9Cz'%99%CAI%E5%A4%F2%84%CC%82%82%5C%B9%B2Vmo%B5%3A%06%C7F%7C%23S%93%B3SS%A1%E0%7Cpr%D2%EF%BF%3E%16%0A%2C%86%16%17%97V%96%E0%3D%14%BA1%3A%7D%D1%DB%E7ln%AE%AB%84%24.%91%E4%97V%9C(%CD%CE%A7s%B2A%16%D9%C5%F9%15%8A%A4xY%B9B%96%13O%8FO%15%16%94%17%14h%9A%3B%D5%F5%1D%5D%1D%CD%1D%CD%96NC%83V%0Fi%AF%16%F2%92TU%AFR%8ARR%E2x%D22%814%91B%88%8C%C0%A8%24%3A%83%14%CB%97%CB%15%95%8A%22%1E%97%9F%CA%17RIT%3A%99%93%9E%C4%D9%B7%2F))%3E%99C%07%10%84%2F%02%07B%04%AA%8E%B0%9D%3B%E9P%2FA6%E7%C3%AC%AD%A9%87%E4a%F2%5C%F0A2%9A%98%9C%9C%04%25%84B%8B%E8%7Dqq1%B4%02q%1B%FD%B6%B4%B0%B4%10%BC%11%1C%1D%BD%DC%D7l(%D1444X%1A%14%B2%F2%13%60%11%15%7B%92%93%D2sr%F2%F35%1Aaee%B9%84%99DO%CD%D1TfH%E5R%F0l%C8M%DD%9D%DD%90%D0%20%2Cz%BD%D1%A4%D6B%AA%02%24%F5ji%0A-%8EW%5D%92%C6%A3%C1%F8%92(X%1C%93%CC.%D0%94%8BdE%E5%05%C8%1D%24L2F%A60%E1g%CD%06%10%90K)%E0%EC_%10%0E%90%98H%14z%7C%7C%3C%94K%19%B9%05J%A5J%AF7%99%06%7C%60%0B%E3%81%40%60.0%3D%3F%BF8%8F8%40%20%00%2Bkk%88%C4%D2%C2%CA%C2%C2%D2%D2%8D%99Q%AF%B3%8C%A7%B1X%EA%10%0A%0B%F4%0EuM%95'%9A4uM%A7%9B%9AN%2Bd%A8%BE%3D%91%CF%90%88%0B%04Jy%03%B4%0Ff(%97%2C%C8Y%BA-%8D%CD%8D%8DP%87%01%033%14%05%B5%16%83%7C%FF%FED%AE%5C%C4%E5%D1%C1%AB%23%C9%18%9BIa%E464%94%0B%24%0A%85%80M%8A%CDa10%0A%9D%1E%9B%9E%9E%0EMD%D2%BEx%3A%C8%86%F0%05%E0%80%82%88!%7F%88O%CD%90%15%88%A4%E0%0DZ%A3%ED%EC%80olrz.07%17%08L%CC%CF%E3%0Cp)%849%DC%BE%BDr%1B%A1XB%A2%00%10-%3CKs3%E8%C1%D2%D0PU%DE%D0%09%1F%01Ge%5D%5DSCy%1D%B4%1A%E5%B2J%09O%A1%11%C9k%9Bkjk%CD%DD%7D%7DC%DD%9D%0D%9D%DD%8D%CD%9D%00%02g%A07i%D5%F5%0D%8D%06eJJJ%A2T.%E2%B10%C8%FEt%2C%96J%91(%94%0D%0D%0A%81%A8%5C%10K%A2A%A7I%C2%E8t%A4%09NR%2C%24'%12%25%FE%01%02q%9F%1Cp%0C%E0%0F%D1%D1T(A2d%D0%B5%A9%F5%F5%06%BB%C3%EB%19%F6O%8E%CFM%05%26f%C1%9E%C1!%80%C3%F2%CA%CA%F2%F22%22%00%20%C0%20%D6%D6Vq%0E7.%BB%FB%B9%96%86%E6n%C84%9D%7D0%D1-%D5%9A%BA%3AKsC%1D%7C%C0%7F%D5%E9%1A%0C%D5%80%A7%CE%D29%D4%DD%3C%D4%D7%87%830%EBM%9DNg%A3%C5%D8%8C8%18%C0%AD%A1~j%D4f%EEO%A1%09%A4R%5E%0A%B6%8DD%A2b%18%83%C9%2F%10%957TJs%15%E5%92Xr%9A%90%C3%20R%E9%18%1D%07%11%9FD%89%A5S1%E2C%CD%81%10A%0C%CB%01%8B%DE%19%9B%C4%C8%E0%E7%8A%EB5%D5%EAz%A3%D5%E1%F2%0ECm%3A55%87%20%CC%05%A7%A6%40%12%CBH%0B%8B%2B%F0%01%F94%C4%CA*%7C%5CX%98%B9%D6%D7%97W%D6%D9%DC%07I%BF%AF%BD%1De%1D%0B%FCj%D0%D45t6%03%96%3E%60%D3%D7%D9%0Cy%E8b%DFP%DF%D0E%E0%80%BFwvu%B4%EA-%E6f%B3%DD%04%06%A1%D5%9B%8D%C8%25%9A%CD%02)%90PIy%BC8pa*%99%9C%C1%14%CB%04%D0%C1W%0Ay%8Ar0%8C%9Ctf%14%C6%A0b%D1%00%22%9EA%A7%C6%83%5B%13%1Ej%0E%C4%0D%3D%90%C9%D1%B1I%1C%960%B7%40*%AFU%D7%DB%DC%FD%DEa%FF%D8%D8d%60~vjv~n*4%1F%02%8F%80%CC%14%F6%07%18%7D%B0%8B%20%CE%02%04q%E3Z%CF%99J%C6%99%BE%EE3%3D%00%A0%1D%06%1C%20%80%1E%9A-%CD%9D%3D%DD%00ah%08%8D%FB%E5%D1%CB%97%87%86%AE%5E%3D%0F%2C%E0%8B%17%91*%00%1C%B4%D6z%E8%E6%D4%90%0D%B5%F5*U%7D%BD%B6%1E%BAoi%A2R%CE%13%80%5B%93h%18%85'%91T%16%14T%96k%94%7CA9%83%12%CB%06)%60%CCx%8C%9C%04%22%A6S%A3%A3%C9%FF%09%86-%85%C4%07%9B%C3FP%C8%D4%F8%D8xv%0EpP%D6%19%CCf%9B%13q%00%93%9E%0ALMLM%CD%CE%86%0Dbq%C3%AA%97W%E0%C3Rp%FA%FA%0D%88%99%1B%D7%AE%9Ei%FB%2B%AC%A7%ED%CC%B93%3D%CD%DD%CDH%0B%1AHS%10%DD%DD%EE%EE%EE%FE%BE3C%17%2F%5E%1C%1D%BD%0Aq%19%DE.%5E%86%3F%0E%E14%BA%BB%BB%BA%FB%3ALV%E8%18%A1%B9%D3%1A%A1%B5%D3%9A%CDz%A5H%A9%DC%0F%B2%90%82%17%90)%B10%F2%D0Z%17%15TVj%24y2%26F%DD%C9L%CD%C0%C8tF4%9DN%8F'%FD%17J%D7G%B7%3C%D0%1C%00D%24%11%23F%92%E8P0q%D8%19%B9%E5%F2r%0DT%92%8E%5E%C4a20%05z%80w%98%FBx%E5%0Ao%90%91%16!!MO%2F%DDX%08%CE%5C%9B%99%99%B9v%F5%DA%B9%F3M%CC%A8%CA%B6%9E%9Esg%CE%F4%0D%81%1A%DAe%7DP9%01%06%A8O%BBa%EA%C3%B0%83%18%10%86%CB%97%CF%03%08%C4%05%D2%D3Pg%17*%60%3BL6%AB%DEj2%E9%8DF%93%D5%AA%D5%AA%8Df%A5%5C%AA%CC%8C%11%88D%2C%12%99%B6%0DF%9AH%E7e%88%14%20%09%8D%84%9F%15C%C6%98%E9T%12%11l%9C%10%1D%1D%F9_%99%EB%91%0F%BA%1E%B0H%60%81E%93c%19%E9%E9B%89%AC%40Y%A3%B7%B4%D8%5C%7D%60%D3%13%81%D99%C8G%F3()M%85%CB%D6%D0%D2R(x%E3%DA%D2%92%E5%1A%008%7F%ED%DA5%18%DC%F3g%9AND%25D5%B5%B5%F5%B47%B5%9D%3E%5Dq%E2t%CE%89%D3mmm%96%9EN%14%DD%C8%BC%87.%5E%BE%0C%AD%06H%E1%3C%7Cv%194%81%F2%D2Y%94%9A%3A%3B%EC%1D%ADV%A8%95M%60%12Z%AD%B6%B6%A6%D6%A8%D6%8A%04%894%91%5C%10G%A2%D1(%91%18%C6%8Daq3%A0%A1%D3h%14%B9%05%DC4%3A%85J%26Eb%60%0CXd%C4%03%14%F7%C7%01%C4%80%91%23%E1UF%93%E9%F1i%E9%19%12%99%A2R%5Egv%BA%DD%5E%2F%18%F5Tpv%0ER%D2lh~.%DC%3E%80'%2CB%C3p%B5%FC%C65%D9%F9%ABm%A7%DB%7B%CE%9C%BFz%A6%A7%ADtwDrD%D4%9E%FC%E2%C2%93%D9%85%F9%D9%F9%BB%A3%F2KO%40%F4X%3A-%60%D0%CD%A0%8A%3EP%C5eD%00%D9%04%8A%8B%00%E2%AC3l%E2%5D%1D6%AB%DD%8As%80%B6%CE%DAjR%AB%95Vy%8A%00r%93%9CKa%92%22%23)%18%83%C1%E2%F2%15%0AY%9D%A6%5C%C8%E6%A6%A72%A20%8CN%A1%FCaN%22%10%1E%3E%0E%A0%06%0C%DE1%12%16%8D%AA%D6%F4%F4%5C%89%A4%ACL%A5kq%BA%3D~%FF%98%7Fl%16%ADi%40%CCAJ%9A%0F%05%83%D0ZO%BF%07%0A%A8%A8x%E3D%F4%89%B6%8A%13%C7%8A%8B%0B%0B%0B%93%13%3E%9D~%89%5Bv%EC.-%D4%40%CDd%A9%03M%B4t%22%16CC%B8%16.%A2_%C0%E1%EC%D9!%DC%C2%81%85%D3%E8%B0%9A%8C%A8%A53%19MP%CA%9ATj%ABJ%24%DA%9F%22R%0A%E2%18%E0%D7%14%E2%B6m%7C%3E_%24%93T%A2%0E%9DMe'qv%22%3D%10%22%1E%24%10%F7%99%97%00%01%DA%06%A2B%F1%97%94%9E%91.%93%C9%14%D55P%B6v%40%DD%EA%F7%8FC%CD%1A%80zi%C3%1C%E6B%81%C0%E4e%A8%8Azz%C8%F9M%09%5B%0E%24%EC%D9%F1%FF%DE%01%88LH..-%D6%80Qt%BA%9D%60%D9%AD%5D%20%8B%B0%18p%AF%C69%84It%B4%B6Z%CDH%0DH%14%C0%C2%A62%D5%9B%A4)rQ%A6%40%C4%A60%A9%E4m%B1%5C.%9B%CB%95)%20%3BU*%84%19L%06%23%89%81%E1%EB%01%84%3FX%A8y%C88%E0%9D%03%09H%40R%A2'%25%A5%F3%D1%5E%81%A2LSmr8%BA%3C%BE%11%FF8%5E%2B%CD%CD%81K%84%E6%82%C1%F1%C9%EB%97%BD%DD%CE%D3%A5%C5%C5%D1Q%07%1E%8D%F8%F4%5C%8C%F84%15%C2%16v%C5%E9%86%CE%CE%3E'T%B0-%AD%AD%9D%DD%08%C2%85%B0%22P%D9tqh%00%A1%E8j%ED%B0%D9%C1%22%ACP8%19%F5%26%80bnm%B6%CAE%CAo%25%A6(%05%14%18u6%97A%89a%F1%A42I%AEL%26%11%B2YI%F1%E1%BE%E1%5E%10%F0%9A%3EW%10%F7%C5%81%88%8C%0Eq%88%8Fg%24q%D2r%24%88%83%AA%BA%AE%BA%D1%DE%E5%19%84%8Ai%02%AC%1Ao%E4%40%17%81%C9~%E8%D2%9AN%14%E7%EF%DBA%8C%D8B%40%AFy%CB%A79DG%10%EE%26%87%BB%A3C%CC.%D544w%40%E5%D4%DFan%05%240%F8%A3%B8%1E%06%06%10%07%08%C8Q%1D%5Dv%9C%03%24'%F4%C1f57%5B%BA%5B%D4%AA%AF%8B%F8%99%D5i%A4%18%1A%19%DB%06%BD5%83%97%5B%90%2B%14J%84%C2%D4x*%E9%AE%3B%7CD%02%ED%ABG%3Ct%1C%88Qd%E8%E1%C8tNR%12''5C(%94I%8AJ%94eU%F5%0EGo%2F%80%98%80%00%04s%81%C9q%FFp%BF%BB%AC%E9%C4%89%E2%3DD%C2%7F%9E%85%3F1C%81%D7S%95%0D%90%9C%86%BCg%CFvt%22o%1E%80%BC%04%04.%9C%BDp%E9%22%7Cux%E8%EC%D9.WG%97%C3n%B7Ab%D2%C3%3B%7C%ECh%86%96%B0V%A5%14%1D%12%D4%E4Qc(%24%8C%14G%A1%C40%0B%14%5C%A1%24%3D%3D)%89L%D8%F8F%84%88%8D%F4D%C0%A2%C1%F2%22%3E%BF%DD%A1%FB%D6%03%89L%A7S%92%D2%99Ln%968%0F%E4%20%95%96%95U%E9L%8E.%D7%E0%F0%A0%DF%EF%9F%1C%9FD%10%BC%5E%B7%BB%AD%A28%3B%F9%8FT%89_%FA%D2%BD%7Fx%E4%91%2F%85%F3%D1%5D%B1%3C%BA%9B%1A%19A%06%97hF%15%AC%1B%8A%A3%AE%BE%B3a%25x%2F%5C%B8%E0%BB0%E0%BDx%F1%C2%C0%40%D7Y%9C%03%14%B0%D0G%18%A1zB%7B%A8%5D%FD%26%F5%B7D%FB%BF%2CRq%B71I%24%1A%83%C2%20%C5%0A%25%DC%3Ca%12%23%09%FB%D4%EA%00%91%10%99%10M%24%10%1E.%0Eh%03%08w%E9xNzjF%AEX%9CWRY%A9%AC%A9R%D7%1A%ED%0E%87%C3%03%92p%FB%FB%BDP%C4%0E%F7%3B%1B_%A8%C8ON%88%84%3A(%F2%93%C3%BEu%EB'8l%DD%BEu%2B%B0%F8%F3G%0F%1C%08%CFU%C2%EE%AF~%95D%202%15%0D%96%D6%8E%0Eh%A0%A1cp%9F%3D%7Bv%E0%C2P%DF%C0%85%B3C%17.%0C%5E%40%D1%7B%B6%D7mG%82%B0%83%1CP%E5dom%AD7%DB%1A%D5*%B9%5C%F4%95L%B9%20%91A%8E%8B%DD%C6%A0bdvN%1A%9B%CD%F8%C3%E5%3D%02F%88DskGT%04%16Ax%98%F4%80%91wBb%8AO%E2%A4f%A4%0B%D1%86%A8RYU%A9%AEVk%F56%97%CB%E5p%F5%BAm%06%AF%D7%E9%EC%EF%B6TWHvb%D1Q%D8%96-%3Bv%7C%F4%1A%01%C2%AE%5D%BB6%00D%3C%FA(%FE%B5%ED%BBvm%DF%BE%F5%91%7F%3C%D6%B6e%23%2F%11%0F%1C%FB%2B%F0!a%1DZ%93%ED%EEsww%3A%3B%BA%00%C4%25%F0%08%CF%00p%F0!%0E%5D%03%5EO%2F%7CW%BB%C3h%B3%1A%F5x%2F%D1jlu8%EAMz%A9(e%5B%A6%80%CBb%B0y%3C%16%9DD%A2dpX%0C%C8S%C4O%CF%AC%A8%04%2Ca%C7%E7%26%88%FB%E2%10I%24%93w%D2%A9Ih%EF%2CG%20%90%95%14)U%D5%EA*%B5%0E2%B4%CDj%B3%D9%1CNwu%8B%B3Q%83%D6%3A%F7D%11a%BE%DD%FB%C2%FF%C7%D6%ED%DBw%ED%DD%BB%2B%9C%9B%BE%14q%E0Q%C2%9F%C3g%DB%1F%DB%FB%D8%DE%5D%CF%FC%FB%C9%D76%26%25%FC%3F%F9%C7N%3EA%C2%9E%A8%AC%03Itw%3B%9DN%87%A3%A3%AB%E3%EC%05%001%00%20.%5D%B80rip%60%60%A0%17%C2e%B7%D9%3B%F4V%1B4v%AD%9Df%93%B9%A3%C3h3%A9%0E%EDOL%E43Y4%16%3F%23%8D%19K%A2'%B1(%F8!%9B%3F%7CQXTTB%C2%CE%E8%9D%0F%93%1E%22%A1j%A5%26%C5rR%D3%85B%C8Jr%B0h%95J%AD%AB%AER%EBu%90%19LZ%83%B3%A5%A5%AC%BA%5C%02%AD%1A%06%ED%2B%CA%BB%1F%BD%BEG%FF%F1%DB%5Bw%3D%F6%E4%93On%DD%E0%F0%A5%88w%D7%D7_%89%88%80%AF%EE%DD%BB%F7%E0%FFy%A5%F8%E4%16%C2%81(%DCC%C9%C7%5E8%F6%C4W%A9O%155X%F0%25%A7%0E%A7%A3%D5cw%80%2B%0C%0C%F6z%80%83od%E4%D2%C0%85%81%B3%03%FD%A0%89.%17j%AE%AD%26%AB%D5%06%5D%85%A9%A3%15%BC%C2%FC%8D%BF%C8%E4%F3%E2Xq1%CC%0C%1E%19%10pbI%24%D2%A7%BAi%A0%8Ea%09%BB%13%08%D1%0FU%5E%22%91c%93%98%9C%D4%1C%BE%24%B7H%2C%95WV%ABuU*%5D%B5%16%ED%C9%18m%D5%3A%83%AE%BAL%5C%9C%1F%9F%90%90%8C%DDS%96%EF.%ADx%ED%DA%9B%DF%DE~%F0%F0%F1%E7%9F%7D%E4.%86%88u%08HL%BB%9E%3C%7C%F8%C8%E3%3F%FC%D5%CD%F5%C2%1D%09%C7%12%0A%D1%D8%1C8v%F2%F4%B1%E2%C4%C4%A2%BA%063%B4%D6%60%C8%0E%97%C3%E6%E8%F5%0C%0EBf%BA46r%C9%3F%3A%00%24.x%3C%5E%8F%B7%AB%D7%E6%02%3D%D8p%16VSW%ABU%EF%E8P%A7%24%F2x%B48Z%0C%8D%C9%A5P%22I%0C%3A%9D%FE%A9%C2%95%80O%2Flw%02%F1%F3%A9%99%EE%87%03%CC%1C%0A%95%C1d%A7%A7%09%F3%8AdREI%89Re%D0i%B5%D5%06%BDV%A7U%1BZ%AA%AB%AB%CBJ%CA%24%E9%C9%90%91%D0%D9%B9pZ%8A%8C%CAo%7F%ED%CA%95%99w%BF%BD%EB%C8%E1%A3G%0FoE%DE%80s%F8%D5%FA%FA%BB%E0%DC%8F%9D%3A%F5%FC%93%8F%BDt%F3%CE%FA%FA%C9%88%F6%03%ED%09hp%B2O%9E%3B%7D%AC%243Q%5CU%D7%DC%0C%99%09%F2%BE%D5%0Ev%80%40%5C%BAti%C4%EF%1F%BD%7Cy%60%00%AA%A7%01%CF%B0%C73%D8%0B%98l%A8%8F%B0Y%EDF%E8%F0%F4f%5B%AB(%85%C7%8DKa1%B7%D1%98%8C8%0AF%A53%18%94O6%F4%04%BCw%40%1B%8C%C9%84%87%86%03%FC%B8%14%3A%1D%3A%87%AC%2C%B0%06)%94Jj%B5%DA%60%D0%EB%91Gj%F5%C0%A4%A4%AA%ACL%92%83%85%CB%F4pR%22D%95%B6%F5%BCqm%E6%D6-%C4%E1%E8%E1%A3On%C5)%E0%20%5Ey%05%3E%DD%BA%F7%F9%E7O%1D%DE%FB%C3%7F%07u%5C%D9%D1v%EC%DA%01%12%9A%9B%BB%8F%B5_9%DD%F8%5C%A6%B8L%D7%D8%D9%09%3D%9B%D5jwA%97%12%E60%3A2%3E%3Ez%C1%3F%E2%F7%0D%5E%86%FC%E4%ED%F2%40%99%00F%01r0%9Al%60W%1DF%7Dk%87*%11%D4%90%C8%E5%B2%E8%B4m%B4X%00A%A73%FE%C8V%2F.%09%C2%E7%B2Gw%7F%FE%00-%1C4%D29B%89%B8%A8H.W%D5%D4%A8%D1%D1.(%DFu%26%ADNW%A6))%11%17s%EE%C9%B4%84%A8%84%7D%F9%C7z%AE%CC%DC%5C%BDs%EB%DD%EF%3E~%E4%F8%D1%C3%A7vm%E4%25%BC%8D%00%26%5B%1F%3B%FA%F2%EB%A7%F6%FEp%1D%8Fw%DF%B8s%2C%BF%E8%09%18%94%C2c%3D%3D3%E7%9E%7B%AA%A8%0C%ED%97%DA%9D%26%B3%CD%EE%81%99%0F%A5%D2%A5K%E3c%93%E3%D7%2F%8D%02%08%88%8B%FE%C1A%17%D4%CD%0E%AB%C9%06%C0%C0%A6%8D%26%7B%ABIkj5%F0)4Z%22%8B%C9%A4%A3%03eT2%89%82%1Ah%C2%1F%A4%5B%BC%7D%09%E7Q%C2%C3%C0%81%80%91%19%F1%CC4%B4%DC%5D%22WV%95%D5%D4%E8t%06%B4%CCfj4h%D5%BA2%B1%22%F6%89%7D%D1%11%1F-%E1%10%1EM%3E%90_%D1~%FE%E6%CC%07%ABw%3E%7C%F7%BB%DB%1F%3B%FC%E4%93%87%1F%7F%E4K%F7%C6%23%DB%F7%1E%7D%FE%E5%E3%0778%AC%AF%DFi%3F%F7Df%15%D4%F4%BB%0B%DB%DB%CF_m%11K%AB%1A%1A%9B%5B%60%9E%5B%ED%60%10%3E%9Fopdl%0Cq%18%F5%8F%5D%1E%85%AE%D1%7F%D97%82%7C%C2%05%8A%B0%DAm%D0%D5%E1%2B%1D%26%AD%DE%AC%17P%12%E3X%891P9%C5Q%19%0C%3A%19%12%11%F1%FF%B2%F4%8D%8B%F8a%E1%C0a%81%1EdE%0A%A5%12%B2R-%94%EDF%B3%1E%5E%B8%DE%A2%D5iJ%D2%92%89%09%F7%BC%92%C2c%D9%85%C5'_%BB2sk%F5%D6%EA%CC%AF%5E%DA%FE%F8%D1%A3GO%3D%B9%FD%1E%10%20%87%BD%87O%BD%7C%FC%F0%91%DF%DC%C5%B0~e%E6%F4_%3Dg%88%8E%88%C4*%CE%F5%9C%EB1%94%95%D456%9A%E1%9Bh%C1~%91S%0F%5EB%1C%C6%AEO%0F%FB%AF%8F%8E%8E%5E%F7%FB%7D%97.%5D%BC%ECw%A0%40%0CLx%F5%04oZ%B56%93%CD%8Ac%C5%D0%F8l*%85D%A7S1%ECA%3A%BEt%BF%F5%12%05m%FF%E4%88e%8A%B2JU%15r%87z%83%D1jmD%07'TUu'%0A%93%C9%F7L0%AC%A9%A9%F8%D8%B1%D3%AF%BDq%F3%CE%AD%5Bwf%AE%FCx%D7c%CF%1E%7F%FE%E8%D1%C7%B7%3E%F21%86G%1E%3F%FA%FC%A9WO%1Dy%E6%DF%EF%EAa%FD%C3%0F%AF%5Dy%EAo%BE%19%19%81am%E7%CE%CF%8CWW)u%86%96F%3D%DAl%80%A6%1DR%D3%08%021q%7Drrz%DA%3F%8A%8E%10%8E%5C%BF%7C%D1%3F%EC%F5x%5C%BD%26%A4%06%A3%11-%88%1B%CDF%ADJ)U%F2b%18L%B4%FCJ%A5Pb%201%91H%9F%F7%EE%CF%FF%EF%FE%03F%A2%24%B1s%B3%D06%5C%A5%0A0%A0%93%7C%06%E8%E0L%3A%9DFSQ%9C%9F%1Du%CFr64%01%E7%8F%9D%3Cy%F2%B5s%1F%AC%AEB%5E%BA%F9%EE%D3%DB%8F%3C%7B%FC%F8%F1'%1FG%8A%08w%11%5B%1F%7F%F6%E5%D7_%7F%F9%E8%C1%97%3E%C2%B0~%E7%C3%99%0F~%F9%D7%DF%FC%0B%C8%D8%84%C2%99%99%0F%CE%5B%AAT%F5%FA%C6F%23%CCn%97%A3%D750%E8%1BA%87C%26%AFOO%04%20%3D%5D%07%1C%D3%D3%93%E3%A3%C3%5E%B7%BB%D7%86'%25%5C%13F%BDU%5B%A3%92KK%F8%B48%5Eb%5C%16%9BN%C1h%1422%82%07%E5%98%EB%7D%F6qT%E0%90%95'%91%96W%D6%D4%EA%F5%F5%90%91%C0%1D%C0%16%B5e%952IV%F4'%96%0D%22w%B7%5D%B9r%EC%F4%C9%B6%F6kwVo%22%83xi%D7%C1g%8F%BF%7C%EA%D4%91%BD%DB%D1%92%12Zk%DA%FB%EC%EB%BFx%FD%D5S%87%0F%FE%E6c%0E%EB%1F%7C%F0%DE%07%3F%FA%EB%AF%C4%10!%136%CD%8C_%BB%D8%A8%D5Y%8DHu*%AD%1D*%A6%11%9Fo%028%04%02%C1%89%C04%40%18%9F%0EN%07%02%D7%AF%FB%BD%C3%DE%5E%17%02%A1%D7%5B%91%22LFuM%ADF*%12I%D94%1E%8D*%C8%82%06%82D%A1b%E1E%CB%87X%0F%14R%12%9B%9F'%91Ujj%AA%917XQ%1B%0D%B3O%2F%15%B0%E2H%24rt%14%86V1%C3%7F%7Bw%1B%B4%0D%C7%DA%DAO%CF%7Cpk%F5%0E%08%E27O%EF%3D%FC%EA%A9S%2F%1F%3E%B5w%D7%F6%ED%BB%BE%F6%B5%23%EF%BF%FF%FB%DF%BF%FF%FA%F3%CF%EE%FD%EE%FA'8%7C%F0%DE%F0%7B%AB%B4%CC-%11%84%3D%D7%AE%CD%5C%F56j%ED%B6%16%C0%ADU%EBm%C8!F%26%26%02%88%C3%14%D0%08NO%07BA%F8%1D%40%00%87A%E8%23%5E%04OG%5BufSmMUue%91%88%2F%15%A4%7C9f%9B%20%03%DD%A4%23%13%F1%22%95%B8!%89pyMx%A88%80%1EX%FC%3C%99%AC%BC%B2Ng%A8%87J%1D%CC%D0%E6%B0%3BZl%BA%AA%B2%A2%A2%A2%3C6%23%9E%1C%8Da%E1%FCD%3C%D0%F4%C6%95%D3%ED'%AE%DC%BCu%E7%0E%A4%9B%9B%2F%3D~%F0%D5S%E0%D5%60%09%A7%5E~%F5%17%BF8%F8%7B%C0%F0%CE%CB%A7%8E%3C%7D%AF%1C%EE%7C%F0%E1%AD%9F%FF%F2%D6%B5%1F%FD%F5%DF%81%AA%9A%AE%CD%2C%0C%F7%B78%DD%EE%16%A3%1A2%93%D51%08%061615%8F%CE4O%06%E6%E6%82%10%08%C4%F5%C0%F8%A8%DF%3B%08%E5%EB%F7_%7C%D1%84%AA%26%B3%19%9D%E6P%95IE%02%A9%94KcnC%5Bt%0C(%5E1*%95H%20R%11%0Ft%89%05%AFe%23%89%1B%9B%13%84%87%40%0F%14%26%3BK%22.%2F%AB%AA%D6%E9%8Cx%FB%8A%16%F8%80%84%CDjh%FC%BB%EF%94%89%C5Bf2%E9%E3%CA%B0%F4%8D%2Bm'%CF%5D%F9%008%C0%00%A3%16%E2%F0%E1%E7%A1o%7B%E7%17%EF%80%16%8E%BE%FF%FB%F7%DF%3Fu%EA%F8%DE%1F%DE%8B%01%E2%D6%AF%DF%F3_%5D%FF%D1%3F%3F%11%11q%02%D4%F4%DEp%BF%BB%BF%DFmC%B7%1F%5E%B4A%13%818L%CD%A1C%CDs8%84E%C4%228%3D9y%F9%224tv%AB%E9E%94%94%8C%F5f%E8%F4%EBU*%A9%5CT%D5P%CB%A3%A5l%A3%D3%184%16%95D%24R%18tt%BF%0C%20%10)8%8F%08%0A9%92H%C4%A5%81%11%FEd%F5%EB%FD%9D%D7%C0HtfZ%8ED*%2F%AB%AAQ%A3C%5CP%D1%3B%1D.%97%EB%7FA%1B%F5%83%EF%FF%D3%DF~%AB%BAD%91%C3%A6%92%3F%06q%E0%E4%95%F6so%DC%FC%F0CD%E2%CE%9BOC%2Fw%EA%F5_%BC%8F%E2%9D%F7%DFy%FE%D5w%DE9%FA%EC%DE%7B%8A%25%1C%C4%FA%EA%8D%DF%FE%F2%DFn%0E%FF%F3s%D1%11y%B7%A0%EA%7Do%1C%9D%CCqY%F5(19%3Cx%03%81%83%98%03M%A0%13%22aE%04%C6%C7%FD%C3%9E%5E%87%DD%F6%FD%EF%1BQ%9F%8F%B6%25jUUrU%B5%B4%A1%B6V%94%C8%A2Q%9814%16%19%C3%88d%06%9DB%06%BB%88%25%C5%C6%92%40%14d%22%C8%24%9C%AA%A2%89%C4%3F%95*%EE%F3%DC%0C)%96%99.%CC%2B*QV%D5h%CDhQ%CDaw%D9z%FB%FB%5D%AE%DE%5E%CF%0F~%F0%0F%7F%A73%08%98%ECt%12%15%DBXj%053%DCQ%FCZ%FB%95%9B%B8%20%D6o%BE%F9%CC%C1%23%90%91%DE%01%06%60%D0%EF%40'%FD%EA%F1%83%DF%BD7%2B%E1%24V%17~%FB%CB%9F%FF%D3%E4%0B%7FC%8A%88%BE%01%EErc%DA%3F%0C%E1B%A7%F7L6%17%CAKcs%C0!%08%8A%00%0AK%A1%D0%DC%02%C0%40%1C%F0%DE%1A%D5pF%A0%60%AC%D5jQ%D7%AF%B6Tk%9A-%D5%82%FD%AC%98m1%AC%18%3E%1D%A3%90)tf%2C%85%CE%60%D1%A1%BF%23%13Itt%04%02%94LD%95%1EF%F8%13%81%B8%CFs3%C0%81-%94(%CA%2B%ABTZ%A3%DDfG%DBp%40%00-%B4%0Dz~%E2p%3B%1A%ABDE%15%12Y%3A%07%DD%1E%0C%2Fa%12%B0%84%03%C7%AE%E1%0E%01%2C%DE%FC%F6%D7%8E%1F%FF%C5%FB%AF%C3%F8%9F%82%DA%E9%E8%AB%CF~%8C%E1%CE%87%B7%EE%DC%C2y-%FC%F6%D6%8F%AE%FE%EF%EF%BD%F0Tb%04Q%F7%C1%EA%FA%9D%1B%93%E30%C6%1E%BBI%AF5%D9%1CP%B8N%80%1Ef%E7%E6B%F8%E5%23t%7Cya%018%04%26%A1%A7%F3y%FE%C5e%B3Z%D1%B9K%3D%E2%A0Vk%0D%CD%16%E0PV%26%10p%E3b%98%0C%9E%80%0D%BD%10%05%BA%0A%3A%032-%95NG%0C%D0%06%05!%9C%9A%90%87%13%1F%60%0E%14*%F8%83%B8%A4%A4%AAJ%A73%5B%ED.%07%DA%84%83J%D27%E2%836%D7%E5s9%D5%DAF%5D%95%22%9DA%DD%19%9D%9C%80E%E2%DB%F1%04bt%F1%C9%9B%08%03%BC%BD%FB%8F%CF%1C9~%FC%C8%F1g%9F%3D%0E%DD%C4%91%83O%BFt%F3%A3N%1At%80n%0D%DD%BA%F6%AF%EF%0D%EB%FE%E7%CFu%DFy%22%11%8B%F9%DE%F8%D2%D2%EARhr%3C0%0E%82%00E8%201%81%1E%A6fg%83s%E8(%ED%12~%AE%1F%D7C%60%7C%C4%3F%EC%1B%FC%89%0Bl%CB%84%F6%E8%B4%B5%A0%07%95%B6%A5%D9%60%01%14%0DR%81%88%CF%8DK%E4%F2%13%D3HD%D26%16%83%CDf%D2bs%D0%D6%04%09%23C9%18I%C2%22%89%18%88%81D%26%60%0F.%07%8C%CE%C8%C8%CA%2BQV%83M%9B%AC%0E%87%CB%EBq%0D%FA%E0m%C47%06%2C%7C%1E%A7%DD%D6%DCY%26%CBJ%A7%C7rv%26DcD%7C%3B%3E*%01%DBQx%F2%5D%C8K%A8%5D~%F3%BB%CF%7Cm%D7c%07%0F%1E%7F%F6%C83%CF%BC%F4%9B%7B%FC%19%FA%BD%99%8B%7D%86j%F1s%3D%DF%CC%FC%CEw%BE%F3M%F1%A1C%99F_hu%7De!%08Np%1D%8AR%BD%DE%E1%F2%A0%2B%A9%A0%07t%60-%B8%B8q%B4%7F)4%87%0E%8A%8C%0F%0F%C3%CF%E1%B0%9B%F0s%97%00%02%3D%0E%A2%B1%A5%C5R%5DWg%90BW'J%8C%DB%B6%8D%CB%E3R%88%18%99%C9%E4%B2%D9%0CJ%1A%93%8E%AE%FF%82%DA%89%B1THX%14%98%3C%18%F6%A7%C8L%F7y%BE%15%A33%D9%02%B1%02%CA%25mmc%8B%DB%E5%F6%40%11%E9%F3%F9%60%5C%20e%8F%8Cx%06%BB%1C%DDNQIyNz%3A'~'%3A0D%88%DC%826%E4%F7%25%24%24%E4%BFv%E5C%E4%D6%EF%FE%F8%EF%BF%FD%F4%D3O%3F%F3%DD%97%5E%FA%D5%C7%10%D6%EF%DC%9C%196%94%1C%CA%CCL%A4%89I%A4%98%98%AF%A4%1C%FA%CB%BF%FC%FE%F7%07%7D%B3%2B%E8%82%DD%E2bhb%C4%05%1CL%8E%DE%C10%87%60%08%1De%069%20%10%8B%60%12%01%04%C2%3F%E2%F3%A0%DDR%13ri-%3A%9F%AFE%C74%9Bu%C6F%B9%B9%5E%A9%14e%C6%D1Rx%3C%3E%9BB!%D1%B9%EC%2C%26%C8B%C8%A6%A3%3BCt%12%85%82%D6%A1H%F8%06%CA%9F%60o%E8~%F5%40fr%B3%F2%8A%CAT0%C5%1A%5B%9C%BD%1E%AFox%04%84%80_%99%06%14%83%3E%D7%D9.%95R)%96%95%CB%D2%D3%D3%85O%C5b%04%E2%8E%1D%18%BAH%B4%259!a%F7%EEc%AF%BC%FB%EE%CD%9B%BFz%F3%C7%3F~%F3%CD_%BD%8B%9B%C1%9D%9B%D0_%DC%9A%B9%D2V%94vHZ%FD%CDCPdf~%253.%263%F3%EB%DF%FB%87%7F%FB%E9%AF'%26%16o%AF%DD%5E%B9%BD%1C%9A%1B%F7%B8L%2F%E2%82%18%9B%98%9D%9DEg%99%97%EEr%40%89%09)%02H%00%08%8F%03%E7%A0R%23%16%F5%16t%06%A7Vk%AD%B2X%1A%CAte%82DZb%5C%96%98K%A3P(%5C%1E%9B%C7c%B0s%B8%14F%2C%14%B3%8CX%3A%FC%8Ae%90%08%A8%B3%F8%CCW%3F%EE%EF~%1C4r%0C%A6XPT%A6%D4%E9%8D%16%A7%B3%1F%E7%80%8A%C81%C4ald%CC%E7%19%B0%E9-%D2%CAr%85D%22%CB%D3%9C%CE%CBF%1B%A4%D1%E4h%C2%16%F2%81%7D%C9%09%3B%13%12%1E%DD%B1%E3%D1%C2%E2%B6%93W%DEx%ED%95%D7J%FF%FE%95%A6%2B%E7%7BzNd%A7%83%F3%C4d%3A%C7%C7'%DD%DF%FA%8BoT%EB%BC%8Eo%FC%ED%8B%3Fx%FB%D7DM%97%FE%00%00%0CCIDATss%8BS%B3%CBkk%40be.%00%19Go%05%0Ec%238%87%20%BAa%B1%C1a%09UM%A0%88%00%0Eb%10%04%A17jU*%23%94%BAz%FCnEs%7D%3D~%FF%AB%CEP-J%A1%25%D2%D8y1%CCD%0A%C6%CC%E2%E6e%B1%B3%B2xl%06%7B%1B%8B%C3f%D2%19%90%A7%18LT%DBF%B2%23%1FH%0E%91%F4XV%9E%B8%A8D%A5%D3%1A%5B%9C%CE%B3%FD%5E%9F%DF%8B8%8C%20%12xf%B2%3BZ%F5J%E8%AE%25RMIu%D3%E9%D2%FChb%F4Nrr%D4%9E%C2c%7B%B0%84%E4%3D%C9%D1dlOrrrt%F2%81%E8%84%AF%EE%D9%97%9D%9D%7D%22%BF%A2%82%99%15S%975%D4%BF%B229%E9%9E%1C%F7%2F%04%FD%3F%0A%06%DE%0E%05V%16C%8B%F3%A1%E5%E5%DB(B%01%9F%CFa%B5%D9%5D%BD%00%1F%F5%0F%C1%8D%9B%C1%AB%E1%3B_A%9C%C4%E4%E4%E4%18JMv%B4%0E%A2F%E7i%EA%D1U%A3%BEN%83%B9%AF%DB%D2%D3%D9%A0k%A8%14%09R%E2h%89%82%C4m%89%14%12%85%C9%C8%95%F0%B3%B2%B2%D8P%40ee%E5%E4q%D999L%26%1D%23FA%5D%F2%D9%BA%C4%FD%EA%81LO%CD%12%94%C8%E5%D5%88%83%BB%7F%D0%EF%1F%19%1F%83%AC%04%14%A6%C2%20%7C%0E%9B%D6%AA%D5%A9%0A4%1A%83%C1RW%96%F6D%E1%CE%E4%EC%C2%C2%C2%7D%D1%BB%0F%94%16'%93v%24%24%BFQQ%BAo%E7%BE%E4%E2%EC%7DM%92%3D%F9%F9%A5i%2F4V%7DS%3C%EC%9C%F4%AF%AF%AC%DEXX%9A%F4%A3Btii%12%8Ca-%B4%3C%BF%B8%88cXY%9C%1B%F3%40Ij%872%F9-%D0%03%0C%FB%E2R%98%C3%CA*~%07r%118%CCM%06%80%C3%C8%60%AF%CD%84%EE3B%D5dji%C5947%F6uv%5B%3A-%BAj%9DA%2C%E2%F1%984%1E%FET%08%0A%85%C6%E5%F3%B3%C4yYq%20%CA%AC%AC%3Cf%9AD%C8f%40N%A5R%88%9F%ED~%E9%7Dr%20R%E8H%0Fe%AAj%B5%D5%E9tz%07%87%87%A1%AE%9F%F2M%E1%FD-%18%84%0FF%C0%EE%F0%B8%AB%ABTu%96%86F%8B%C5Pu%A6--KV%91%FFT%EC%CE%D2%FC%7D%7B%92%9F%3A%DDt%EC%CA%13%C7%BEZ%98%BDs_R%C5%1B%85%F9%D8s%EC%EE%E1%1B%0B%C3~%E8%C1%C6%A1bZZ%5D%FB%F5B%60m%1D%3E%5D_%5B%5B%5D%BE%BD%BCx%7B%11%04%B1%0C%1C%E6%C7%7DP%92%DAz%3D%3F%01%FDM%CD%E2%8F%8C%40%CF%2BX%03%0C%90%9E%16%90%1E%F0%D4%04%13%A2%D7%01%ED%9C%11%ED%16%9A%9B%ED%CD%DD%9D%7D%7DC%96%EE%EE%9E%9E%F6%FEF%9D%CEP%0D%B9%89%C7%A7%F1Rh))%14%1A%2511%2F%8B_%24%CEb%A7%B1%F2%B2%F2x%C2%1Ca%5E%1E%9BI%C4%A0!%25%12%1F%40%0E%24%3A3K%22%2BQ%EA%B4%06%A4%07%E8q%C7'A%10%13S%B8%24%60l%A0%7CE%9D%84%DD%DAa%B5%B5%40%A1%A2u%F7%3B%DD%EE%AA%13%A7%D3%0B%8B%F2JNd%3Dw%BA%BD%E9%B9s%EC%0Afv%F2%BE%EC%D2%A63%85%2F%C45%A5%2C%FD%7Ca%E1_%E1m%F2%E7%2B%40a%15Y%EF%1A%B4%13%AB%EB%00b%09j%A5%DB%8B%8B%F8M%EC%C5%E0%14Ls%1B4r%1E%C4!%B4%C1%E16%C8%067%89%A5%10%0E%02%95Mcc%83%BD%BDP3%E9%F5V%B4%16i%EF%EC%C4%EF%60ww%9Fioo%B34Xt%86%AAC%99)%02%1E%8B%17%C7%E2%B3%B7QRRxY%B9E21%9B%97%05%C2%10%88%F9B%99%24%87%89%11%D1%BE%11!%E23%DB%B9%BE_%7F%A0%C4r%B3%0A%40%0F*%03%E2%E0%1D%F0%FA%FD%A0%82%B1%00%F2%88Yd%D6cS%00%C2%D3%EBq%F8%1C%DE~%E80%DC%DE%16%EF%F0pOO%99%E4%F4s%06gI%B5%B3%C4%F9%82%A1%25%AB%84LgV%B0%9F%BBv%E3%85%92%AA%A1%CC%A5%1B%AB%0Bs%BF%BE1w%C3%BF%B4%8A%C7%DA%ED%F55%60%00r%40%9FA%B5%84%B2%D2%F2%ED%D0%E2%94%AF%D7a%07%9FF%2B%1B%B3%E1%CB%F2%E8%3F%AD%DD%5E%B9%5B%BB%86%C2n%0D%93c%B0%17%DA%3E%A3%1E%DF%14r8%3B%BB%FB%FA%20-%9D%E9%EE%EElno%B24VW%1B%CA%E4))%89%89q%3C%96%00%8C%82%07%99%89%2B%93%89%F3%D2%04B1%CC5%89P%26%93%B0%E8%91%E8%E2M%04%F6Y-8%DD%B7%1E%A8l.%1F%7CZ%AD%07%0E%8E%B3%1Et%0B%08wi%BCp%9D%9DGE%D3%04(%02%3A%09t%A8%A8%F7%92o%DC%1B%9C%BC%EEw%8B%87._%F5%B6%B4%8C6%968%5B%1A%87_(%AA%A0%8B%DB%13o%BC7i%F8'%F7%E8%F7P%C3%BC%B0%B0%F0%EB%F7%E0%93%0D%02%EBK%F8G%F8%0Db%03%04%E8av%C2%E3%B1%D9%EC%83%83oOL%CC%E3w%F0PV%C2%1F%1A%11%BE%A7%BD%B8%01b*%00%B5%5B%2Fp0Z%AD6%A3%D6%E6p%A2%AB%F0%90%9Dzzz%3A%DBz%5Ehv%1A%1A%0DUriJfJ%5Cb%5C%0A%9F%1F%C7%95%0A%04%2CA%918%8F%25%C9%E3%89%25b%1C%06%EA%F6%A0~%25%7DV%9B%DA%F7%FB%5C%072%95%95%95QTR%AE%D6%19%1A%A1n%F5%FA%7C%FEa%1FP%98%C2%7D%1A%5DB%99%1DC%8F%FF%09%A3%F0%0D%8E%8D%8D%8EM%07%C7'%B5%EE%90%7Fi%DA%1F%0Az%A1%DF%F5%FB%7B%5E%E8I%AB%1A%AD%5E%B9%E1%1D%F6%FAg~%02%0D%F3%1A%E4%95%20X%F3%EA%DA%3A.%04%E4%BDkw9%AC%855%B1%BC8%0Fy%AF%D7nw%FC%0B%E8avq%F1.%08%40%B1%86%9E%A6%12%BE0%3F%87%93%80v%E6%A7%1E%FC~%84%15%9Ak%10%04%D2C_s%1F(%A2%A7%AD%BD%BD%A1%E7%9F%A1%C9V*A%12%99q%02%BE(E%C0O%11IE%EC8%BE%40%C4%CB-%E0%15%88%C5%E2%3C%A8%BD%85%0C%2C%92B%22%B3%3F%A3%DCt%9Fz%20%60%B1ln%AEHZU%A5oD%B7%13%7D%90%20FF~62%02%26%3D1%3F%15%02%7F%98%9D%9A%9D%80%CEn%EC%D2%20%E0%98%18%99%1A%0BM_%1F%EB%F5%86%A6%03%81%E0%F8%CAu%E8%B7%16%027%C6%0D%BF%2C%02%1EKK%FE%85k%81%1B%93%2B0%D4%2B%2B%0B(%D1%DF%C11%AC%AF%A2)~%1B%7D%86S%00%08%88Chvvl%A4%D7%EErx~%06%FD%03%FE8%95p%BDt%1Be0%C4!%AC%07%5C%11%00%E2g%BD%60%D5%26%B4Ebu%B8%D1%93%0A%F0%DB%A6%E8%D15%CEfK%B3%B3%B3%A5Q%07%ED%B5t%7F%0AO%20O%E1%F3b%D2%A4%22f%0C%8B%5B%C0%E2%818%0A%24%12%81P%22Icn%83%26%3B%8AN%08%EF%DC%11%1E%08%3D%40%01%01%0D%B5%A8%A4J%85%FAi%B7%1B%1D%AE%83%0A%09%E6%3F%12%C4%D4%FC%14P%00%24%60%16%97.%0DN%CC%A3%5D%B3%F9%D0%FC%5C%C0%11%0A%8E%07B%CB%D3%2Bsh%E6%DE%B8%11p%BF%E7%9C%1E%1E%5D%5B%0B%AE%AE%F9gpS%C6g%F4%DA%9D%B5%BB%81%92~%98%03JLx%2C%2F%86%A0%26%FB%A9%C3%E1%18%F4%BD%3D%81%3F9%02%EF%A7q%0E%C8LPW%8D%BE%B6%00%9D5%D4Lcx7%07i%CCh%B2%3B%1C%9D%FD8%88%BE%8B%DDC%80%A4%B9%D9%09%1C%9CNC%95Rph%3F%2FE%20%17%F0%F6%D3h%3C%91%80%05%14%B8%2C%96%40%94%2B%91H%F2%0A%C4%05%19l%0C%3D%CB%E6%A3%C9%F8%20%E4%25%12%9D%C1%E3I%E5e*%A8%97Z%FA%C1%01%06!%2B%C1%E0%20%0C%C0%60vv%1E%DE%E7%E7Q5%83%B6%CC%A6%D0%03O%E6%83%F3%23Ah%7DW%96Q%DB%85O%DB%D0p%60x)%00%C5)TC%81%95%95u%B4%EA%14%F6%83%950%84%DBwq%E0%18%D6%C2%92%00%0E%13c%3F%FB%A9%A7%D7%F5%D3%B7%DE%02%FD%A1%A4%B4%8C%1E%E2%B1%F1%D7W%D7%F0%E7%A9%E0%17%B7C%60%11%60TP%BC%DAQ8%5Cn%F7%D9%FE%3E%B7%BB%AF%13%3D%3C%05i%02%20%00%0A%A7A%25%3F%24%D8%0F!%15%09D%99q%5C%91%88%97%16%97%08u%14_%94'%10H%F2%F8%05b%A1%10%3D%A1%F63y%D8%E5%FDr%88%A40Y%7Cq%89R%A5%06%0En7%BA%02%04j%18%9B%40%CB%3Dh%D0%E7g%A7%16%F1%AB%8Ac%E87%B4%167%1F%9A%9B%9F%0E..%C3%5Bpy%11%AFnVn%2F%CDM%8F%AF%04WV%D1%B0%2F%AD%AC%DF%1DlD%03%7D%B6z%1B%F7%86%DB%1B%F6%10v%8C%DBh%CCg%81%03T%00%3F%7Bk%E4%ED%DF%E1%82XF0%EER%BB%EB%D5(%3BA%F9%0A%3F%85%C7%E5q%A0m%12%17%14%D9%10%C0%C1%1D~b%0A%A0p%BB%01%83%B3%DB%D0%A2U%1D%3A%B4_%BA_*%07%83%88%83%C2%89%C7O%8C%8B%13%09x%02%81%80%9F%9B%2B%16*d%22*Z%16'%3C8%1C0%0A%93%CB%17I%E5%AAj%03n%10%83%83%3E%1FZtCm%DC%14J%D9%F8SN%D0%F0%E3%9E%0Ddf%83%C1%F9%60%10%CA%FF%E5%C5%89%C5e%94%E7%C1%82W%17%96~%BB%B2p7%EB%7C%B4%FF%B01%ECP%FF%A0ruem%03%0Er%E9%B5%DB%E8_%80%BC%E4%F3%0D%FEt%F0%AD%B7%DEz%FBw%B3%F3%8B%E1g%0B%E1%18%D6%C3%89)%FC%84%A1Et%7B%1B%E7%D0%0B%A9%C9%E1r9%1C%AE%5E%E0%E0%01%14%AE%BE%8D%2B%D8%9D%80%058%B4t%B6%18%94r%F9%D7E%FBEr%A9%14%7F%D2%1C_%C0%8Fc%F1%F6%F3%E0%A5%8A%C5Eb%81L%5C%94FE%FBu%FF%ED%A7%08%EE%F7yd%18%85%C1%E5%E7%E1%1CZ%9CvG%2F%DA%7C%80%1E%1A%25!%94%99pM%E0%20%80%08%9E%A5%E6%F1Y%3B%0F%7D%D8%E2rpy%83%03%EA%D3%E0m%FD%93%1C6*%25T%1C%AD%87%FDy%E3%8BxR%C2%E5%80%FC%C1%07%EC%DFz%FB%ED%A9%DF%FDn%3E%FC%E0%B9%8D%AC%B4~W%11%B8%5D%23%BF%9E%0B%FF%ED%F0n%15pp%7B%81%84%BB%D7%DD%8F%1E%9A2%ECu%F7%F5%F5w%BB%C1*%DC%DD%8DZ%B5%5C%24%82%C4%24%92%8B%C0%AF%B9)%02%01m%3Fo%FF~%20%22%95%16%95%88%F3%F2D%7C2p%F8%E8P%D0%E7%AD%07%22%85%C1%E6%09%A4J%95Amj%B19P%E1%1A%B6%E91%7C%FE%03%03d%08S%E8i'8%83%0D3%5D%9C%C3%1B%E2%E5%DB%F8%88%86%AB%7D%18%EDO%C7F%81%84%9F%EEX%FB%98O%D8%A5%17!%E5A%9F%0C%DF%12%E405%F5%BBO%E9%E1%23%0EK%E1%026%80%83%F0x%5C.ts%A2%DF%3B%D4%EF%EE%1F%04%1A%C3%C3%C3C%17%87%87%BD%5E%2F%12F%A7%D3%DD%D2%A8%D7J%91A%A0g2K%13i%5C.%F4%12%90%99%20Gq%05%FC%02%81B%C1%2B%12%C5P(%04r%C4'%D6%C2%09%9F_%5Eb%B0r%F3%A0n%D5i%B5V%BB%A3%BF%1F%18%8C%8CL%F8%C0%ABg%F1%C0%C7%3E%04%02%80w%F8ly%11%B2%07%1AA%84%E1%F62%3Eu%EF%20%16h%CE%DF%F94%85%B5%3F%C2%06%1C%3C%2C%07%B0%87%A9%B1%B7F%D0y%EF%B7%DF%9E%FD%1D%FA%D7%97%97Q%F7%B0%E1%E4a%D9%E0r%80%9Eon.8%0F%8A%40K%AFx%F4%F6%F6%7B%FB%BD%83%E8%3A%AB%7B%F8%E20%3Ax%E0%BD%E8E%CF9%83%F4%D4%DDb%D0j%BF%8E2%93%40%AEVISbRR%D0%DA%1F4%D9%22%01HB%2C%96%08%8ADd%FC%96%04%F1%5E%C7%26%7CNy%89%04y%09J%8A2y%B5%16%ED%8B%C2%ABC%1CPV%02%06%E1%A7%FE%E0%1A%98%0F%A7%A2E%3C%1F%A1%B7p%E5y%3B%3C%DFq%13%5E%FFcrX%FF%A3_%C5%E5%B0%023%7C%16%26%F8%5BoA%D5%FA6%24A%DC%A6%D1%BA%C6%DD%84%16vs%F40%BA%05%7C7%02%99%F5%24%C8%15I%02%BD%7B%A1k%04%10%80%C0%3F%7C%F1%B2%DF%EF%1F%F6%0E%01%8A%FE~%10%85%BBS%AB5~%03%ECZ%0A%95%93R%C9OLL%E4%B2%04)%D0Y%80%1D%8A%8A%14b%E0%C1%8FC'k%88%D8%3D%B5%D3%7F%0B%87%CD%D8%8C%CD%D8%8C%CD%D8%8C%CD%D8%8C%CD%D8%8C%CD%D8%8C%CD%D8%8C%CD%D8%8C%874%FE%03%C9%89%DC%8E%19%ECr%9C%00%00%00%00IEND%AEB%60%82";

// globals (mostly constant data that is set later)
var episodeNumber = 0; // set in idEverything()
var iOLDEST_BOARD = 0;  // set in idEverything()
const CURRENT_USER = USER_LINK.firstChild.firstChild.nodeValue;
const CURRENT_USER_ID = loggedIn ? /showProfile\((\d+)\)/.exec(USER_LINK.href)[1] : false;
var garbageTime = new Date(); // what we need only for a split second
var CURRENT_TIME = Math.floor(garbageTime.getTime()/1000); // what we really want // see also updateCurrentTime()
var usersOnThisPage = new Object(); // in case of hasPosts, save which users we need to check/add last seen data for 
var CHAT_LINK = null; // being assigned when the actual representation is created
var twitterPosts = new Object();
var twitterPostIDs = new Array();
var twitterRateLimitLeft = 150; // changed to correct value on attempt to update
var twitter400Encountered = false; // if Twitter sends us a 400 response code, we stop asking immediately.
var smileys = new Object(); // holds the data uri smileys
smileys[":)"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%18PLTE%1CE%8C%D3%DF%FE%B4%CB%FF%A9%C3%FF%20S%AC%C6%D7%FF%00%00%00%FF%FF%FFA%01%AE%E0%00%00%00%08tRNS%FF%FF%FF%FF%FF%FF%FF%00%DE%83%BDY%00%00%00%5EIDATx%DAl%CFQ%0E%C0%20%08%03PE%EA%EE%7F%E3%D1%15%8D.%F4%C7%F8%82%02%ED%F9%A7%E9p%E6%10%F7%C1%C8(q%87E%C2%24%3E%10%D9D%C1%12%93%7C%253d%8Aj%E9%00_%FA%25%F9%15%96%2C%82jHj%E7%B0%EC%1EE%8D%01r%1E%CE%DC%99%3Ds%B1W%B1%FB%95W%80%01%00J%84%05uu%9F%98%0F%00%00%00%00IEND%AEB%60%82";
smileys[";)"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1EPLTE%20%AC~%00%00%00D%C2%A2%D7%F6%ED%D3%FE%EA%B0%FA%DC%91%FE%CB%C6%FF%EC%16%8B%5B%0B!%055%19%F9%E4%00%00%00%0AtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%B2%CC%2C%CF%00%00%00dIDATx%DAl%CFQ%0E%C0%20%08%03P%E6%D4%B2%FB_x%94%BAM%17%CB%87%E1%85D%B0%EB%1F%D3%E3%CC%24%EE%9D%91Q%A2G%8B%84I%BC%23%81%E6%120-5%85%23%C5%0BphH%E2Q%ABX%D4%E9%9FT(%93%3C%04%09%C9%B27%B4%F1%7B%0C%E5%15%C0%D8%87%3BW%E6%DDys%D7%E6%F6%25%B7%00%03%00%F1X%08E%08%D2%A3%FA%00%00%00%00IEND%AEB%60%82";
smileys[":("] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1BPLTE%20k%AC9z%C2%00%00%00%D3%ED%FE%91%BE%FE%B4%D6%FF%C6%DF%FF%20R%9A%0B!%05%14%8B%BF'%00%00%00%09tRNS%FF%FF%FF%FF%FF%FF%FF%FF%00SOx%12%00%00%00lIDATx%DAl%8F%01%0E%80%20%0C%03%87%1B%9D%FF%7F%B1-%03%82%C6K%C0x%E9Bg%F7%17%ABO%8A%C3dF%F4%88r2%FCG'te20%84%5C%96%81(5%8C%22%14X%A1e(%B0%8D%3B%D0%0C%D60%C6%94qvaJ%F7%9Cb%E8%A2%E1%A9))L%FA%7C%7D%8C%11%C3%EC%A3%CE.v%E7%DA%CB%CF%BD~v%7F%F1%080%00S'%0741%87%9EV%00%00%00%00IEND%AEB%60%82";
smileys[":'("] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1EPLTE0%5D%C8%C7%EA%FF%C7%FF%FD%D3%D8%FE%B4%BD%FF%91%A2%FE%C6%C8%FF%207%9A%00%00%00%0B!%05%CC%0412%00%00%00%0AtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%B2%CC%2C%CF%00%00%00oIDATx%DAl%8F%5B%0E%800%08%04%81-%A0%F7%BF%B0%3C%9A%B6%1A%E7%A7q%B2%1B%17%BA%BFP%3F%9E%1C%C6%5Du%A8%B6K%13%DF6%82pm%5C-%18%E5%BC%8D-3%CAT%E4%0Auuh%1B%DB%060%C9%A6K%D52%03%11%0E%C3%226%5B%60k%B8%5B%A1%18%B59%CC%FC%BB%82%90%11%B2%B9'7%23Y%9B%FB.%9Cw%FD%DC%FE%E2%11%60%00%8E~%07%90%8A7%FAm%00%00%00%00IEND%AEB%60%82";
smileys[":D"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%18PLTE%98%9C%18%FD%FE%D3%FA%FF%C6%F3%FE%91%FF%FD%B4%00%00%00%7B%81%12%0B!%05%AEBE%91%00%00%00%08tRNS%FF%FF%FF%FF%FF%FF%FF%00%DE%83%BDY%00%00%00hIDATx%DAl%8FI%12%C0%20%08%04eq%F2%FF%1FgX4%26%95%BEXt%0D%02%E3%FA2%EAAp%18%C0%CC%CD%CA%85a%ADN%E8%CA%C0%94x%3A%94a%3Di%26U%9A%8C%2C%C3P%1B%E6%1C%DB%88%A8%14%D9%16%19%C1bu%09F%D1%E6QP%EF%E9%26%D5%A7%DA%FB%C4%CE%F9%F1%DE%B9%EE%92%F3%AE%9F%DB_%DC%02%0C%00b%B5%05%9C%906%05%C9%00%00%00%00IEND%AEB%60%82";
smileys[":P"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1BPLTE%FA%C8%C8%FF%DB%DB%DA%FE%D3%CA%FF%C6%9C%FE%91%BF%FF%B4%1C%873%00%00%00%0B!%05%1C%B7-%A3%00%00%00%09tRNS%FF%FF%FF%FF%FF%FF%FF%FF%00SOx%12%00%00%00lIDATx%DAl%CFK%12%C0%20%08%03P%0A%18%7B%FF%1374%D4~%A6%D98%BE%01%05%DB%BF1%1D%A8%3C%04%C8%1C%99%B2%92%BAWh%12%A4G%0C%19%24Ai%3A%05I%99%A4%A9%A2%12w%9F%AC%B9%85%E0%60%1F%D4%D65%11zjuAi%D1%EF%013%C4%C05%0F%09%1B%A5%E7%A9%99%EBq%AC%99%B5%97%3F%F7%FA%D9%FD%95C%80%01%00%F3%E7%06%8FV%FA%D0%D2%00%00%00%00IEND%AEB%60%82";
smileys["o_o"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1BPLTE%00%00%00%AC%93%20%FE%F7%D3%FE%EF%91%FF%F3%C6%9A%84%20%FF%EF%B4%FF%FF%FF%0B!%05%9B4%E6%2F%00%00%00%09tRNS%FF%FF%FF%FF%FF%FF%FF%FF%00SOx%12%00%00%00hIDATx%DAl%8FK%12%800%08C%2B_%EF%7FbCc%B1%3AfA%877%81%86q~5%F8xi%23%EE%AA%A1JV%04%BD%05%04F%E2%1A-'%89%CCDWu%12Xrd%D8%AC%98%23i%0F%097%D8ZT%1E1%0A%F8%9E%92%85%8CS%D3T%91%0F%90%FB%F7%C7%A4%DE%99%A5%D4%99y%97%ECw%FD%DC%FE%D2%25%C0%00%1F%8D%06%BCq%8B%C2%0D%00%00%00%00IEND%AEB%60%82";
smileys[":="] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1EPLTEk%05h%F6%D7%DE%FE%D3%DD%FF%B4%CA%FE%A2%C4%FF%C6%D4%9A%20P%00%00%00%FF%FF%FF%0B!%05%BD%E9%CA%16%00%00%00%0AtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%B2%CC%2C%CF%00%00%00cIDATx%DAl%CF%81%0A%C0%20%08%04P%97%9D%B5%FF%FF%E1yZQ%A3C%88%1ER*%EF%3F%92%871%9B%98U%26%8D%E2w%A8%C7-%C5*%3C%1Af)X%A2!%D1%D2%9CZ6-%D1%5D%0A%20%C0%23%87%CC%A7%A6%14%CB%20%85d%BD%B3%A0%E3%F7h%82%17%C6%3C%9C%B90k%E6%CB%5E%97%DD%8F%7C%02%0C%00%3D%0F%07%1D~F%1DA%00%00%00%00IEND%AEB%60%82";
smileys[">:("] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1EPLTE%C2DD%880%25%00%00%00%AC%20%20%FE%D3%D3%FE%A6%A6%FF%B4%B4%FF%C6%C6%9A%20%20%0B!%05%7C%83%F0%D2%00%00%00%0AtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%B2%CC%2C%CF%00%00%00pIDATx%DAl%CF%0B%0E%800%08%03%D0)%9F%E2%FD%2Fl%81%B9Lc%A31%BEt%19%8C%EB%9B%D1%9F%C8l%12a%E6fm)%FC%873%B4%960%14%A4E%0BD%06m%88xIV%10%C1%A7KSNv%CE%25%AA%C0%81%7CI%DD%A1T%DC1O%E9C%E8SU%AA%99)%F3vS%A9%86%60%CE%933kf%CD%DC%7B%E9%BE%D7%CF%EE%AF%DC%02%0C%00%ED%40%08%3E%1D%DF%3C%B0%00%00%00%00IEND%AEB%60%82";
smileys[":rolleyes:"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%24PLTEk%05h%BFr%C3%F3%D7%F6%00%00%00%9Eg%AB%F3%DE%F3%DF%C6%E4%AB%90%AB%E4%D0%E7%85h%85%FF%FF%FF%0B!%05%8D%0F%1D-%00%00%00%0CtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%12%DF%CE%CE%00%00%00xIDATx%DAl%8F%8D%0A%C30%10%82%D36%F7%A3%7B%FF%F7%9D%B7KJ7%26%84%90%0F%25%3A%5E%BF%1A%7D%A1%F4%20%40%84G4%2B%A2w%BA%24%D6%04qL%C0%81y%14*%92%93%BC%9C%17%A7%7F%08%22A%8E%E4%20%5C%A6M%E8%3A%9B%98)u%E6I%A5%BC%3D%96-%F7%5C)%DB(%3Bu%9B%A6%C8%FA%5D%A6%1A!%B8%FATg%2B%DD%9D%7B%97%3Dw%FD%D9%FE%A5%B7%00%03%00%F4L%09%F8%94O%16%C8%00%00%00%00IEND%AEB%60%82";
smileys[">_<"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%18PLTE%C2%A2D%AC%8B%20%FE%F6%D3%FE%E7%91%FF%ED%B4%FF%F3%C6%9Ay%20%0B!%05%15%06l%B7%00%00%00%08tRNS%FF%FF%FF%FF%FF%FF%FF%00%DE%83%BDY%00%00%00mIDATx%DAl%CFY%0E%80%40%08%03P%16%5B%EF%7Fc)%8Ck%EC%87%C6%97%CE%08%B6%7Fc%F3%A2%F2%102s%CB%1C%93%D47%B6J%D9%08%13%0D2%8E%A0%D3%D4R%15s%16%D0M%A5%16%C0%08%DA%1C%2B%09%B8%7Bu%EA%A9c%EA%04%AE%9B%D6%A98%09%23%5D%D2%C8%5E%B2%FE~%97%D6%3C%9A9%94k%E6%D9%2B%9E%7B%FD%EC%FE%CA!%C0%00%97%84%05%FD%EB%3F!%AC%00%00%00%00IEND%AEB%60%82";
smileys[":blush:"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1BPLTE%F4%A7%89%FF%ED%D7%FF%BA%A0%FA%DC%B4%F8%D0%99%FF%E4%C1%81V%00%00%00%00%0B!%05%0C%60%BC%8C%00%00%00%09tRNS%FF%FF%FF%FF%FF%FF%FF%FF%00SOx%12%00%00%00%60IDATx%DAl%CFK%0E%00!%08%03PA%A9%DE%FF%C4C%C5%EF%C4.4%BE%90XR%FB'%C5%05%E6%10%A00a%14%7F%5B%F6%B8%85%A0X%07%1A%96%0C%0B%E9P%B3%E5%1A4%C5g%0E%11U%B8BuKR%17%9E%7BF%BD%A0%CE%19%92%8D%AC%DFEnagaV%E7%C7%5E%8F%DD%AF%7C%02%0C%00%DD%E9%06oS%DC%CBB%00%00%00%00IEND%AEB%60%82";
smileys["^^"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%18PLTEQ%CD%D7%20%A2%AC%D3%FD%FE%9B%ED%EA%91%EF%FE%B8%F6%FC%20%9A%94%0B!%05%1F%A4%25h%00%00%00%08tRNS%FF%FF%FF%FF%FF%FF%FF%00%DE%83%BDY%00%00%00pIDATx%DAl%CF%0B%0E%830%0C%03%D0%B6%8E%BD%FB%DF%18%E73%C4%D0%2C%04%EA%93%81d%7D%DEY%FDP%E6!R%04%22%DAR%7C%26%1C%5B%8B%82%05ij%E1%92%16%EAV%E2%8A%E8K%80%B2T%B2-%10%B1G%CEa%05%F9%B5%EE%8C%188o%7DK%B6%92%A4%5D%E7M%CC%DF%5D%AA-%C8%99'g%3E%99%7B%E6%DE%EB%3C%F7%FA%B3%FBO.%01%06%00%A4%D7%06%1A%E1%14%BD%7F%00%00%00%00IEND%AEB%60%82";
smileys[":/"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%18PLTE%20%87%AC%D3%EF%FE%B4%DA%FF%A1%D3%FF%C6%E8%FF%20o%9A%00%00%00%0B!%05%3F%98%A2%ED%00%00%00%08tRNS%FF%FF%FF%FF%FF%FF%FF%00%DE%83%BDY%00%00%00aIDATx%DAl%CFK%0E%C0%20%08%04P~%D3%DE%FF%C6e%40M5%CE%C6%F8%82%02%F2%9E%91%3E%C0%FC%04p%A6%8D%92%F7%B0LZ%0B%3C2V%86%96Xb%25U%F2%24%3D%5DDQ%8A%1D%C2%97%D8d~5E%97%95%0Cr%88%84%8D%EE%AE%92%3B%B0%E5%98%873%2B%B3f%BE%ECu%D9%7D%CB'%C0%00D%13%05opR%D4B%00%00%00%00IEND%AEB%60%82";
smileys["o_O"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1BPLTE%00%00%00w0%C3%DF%C6%FF%D9%C6%FF%BB%91%FE%D3%B4%FFi%26%B0%FF%FF%FF%0B!%05%86%98%1C%CD%00%00%00%09tRNS%FF%FF%FF%FF%FF%FF%FF%FF%00SOx%12%00%00%00iIDATx%DAl%CFY%12%800%08%03P%A4%2C%DE%FF%C4%12%C2%D4e%CCO%ED%9B%A8%20%E77%C2%23%90%87D%98%B9%19%0DR%F7%E5%5EdA%09%F3Nf%82%20xn%C8l%A9JJ%8Bt%89%B2%3B%14~e%D1%D9%D1%D5%01%CF%5B%3AT%D8%D2%25%8C%7C%94%CC%DF%EF%D2%CC%83%99%15%D93s%2F%7D%EE%F5%B3%FB%2B%97%00%03%00-%09%06%D4%13%D5s%1B%00%00%00%00IEND%AEB%60%82";
smileys["x_x"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%15PLTE%81%AC%20%EF%FE%D3%D5%FE%91%E4%FF%B4%EC%FF%C6%5B%8E%1A%0B!%05%1A7K%9D%00%00%00%07tRNS%FF%FF%FF%FF%FF%FF%00%1AK%03F%00%00%00hIDATx%DAl%CFQ%0E%C0%20%08%03P%A0e%F7%3F%F2%8A%E8t%CB%EA%87%F1%A5%89%60%D77%D6WV%0E%C9%8C%40D%5B%89%DE%84%22k%C9%E0%80%B2l!%1F%1A%A2%8A%E9%00%A6%A3%D2%10%26!JLq%DF%1Dt%C7%D9%C1%EA%84%2Fb%CB(%D5%C8%26%99%BF%EF%D2%9C%A7f%F6%CA3s%EF%E5%E7%5E%3F%BB%BFr%0B0%00%F0%12%04%E5kF%1FT%00%00%00%00IEND%AEB%60%82";
smileys["xD"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1BPLTET%CA%9C%20%AC%81%D3%FE%E6%B4%FF%D8%91%FE%BB%C6%FF%E1%FF%FF%FF%20%9AR%0B!%05%80%F3y%1F%00%00%00%09tRNS%FF%FF%FF%FF%FF%FF%FF%FF%00SOx%12%00%00%00oIDATx%DAl%8F%0B%0E%C3%20%0CC!%8E%E7%DD%FF%C4%CB%AF%15%AB%FA%84%40%3C9%90%AC%EF%93%D5%87%92%C3H%EEpo%97%26%EED%10%AE%8D%9C%25%D2%A9%0D%97%B4P%5B%99%88%88%B1%04(Cev%18%88%D8c%CCX%20_%EB%CC%98%10%9C*35%EC%AAT%FB%93lb~%BFB%E4%F4%93%3D%5Br%F7%DCs%D99%D7%CB%EC%7F%FC%04%18%00%11.%06%D4L%95%95%01%00%00%00%00IEND%AEB%60%82";
smileys[":ninja:"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1EPLTE%E1%E2%CD%F4%F6%D7%87%AC%20%F3%FE%D3%CE%FE%91%EB%FF%B4f%7D%00%EF%FF%C6%00%00%00%0B!%05%E2%9B%C6%17%00%00%00%0AtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%B2%CC%2C%CF%00%00%00mIDATx%DAl%8FK%12%800%08C%AB%7CR%EF%7Fa%09%A0V%C7%2C%E8%F4M%D2%86q%7C5%EApj!%EE%AA%A6Z%8C%24%EE%B0P%B0%22%AEH%40%E6E%40%15J%12%96%19%CAAS%12%60L3%8E%22%22%81%B6%C8!c%F4%08%D0O%A1Sr!T%AAM%D1y%87%F5%EF%8F%A9%FB%B0%B3Pw%E7%DAK%D6%BD~v%7F%E9%14%60%00%AAU%07%C38%C8%0F%2C%00%00%00%00IEND%AEB%60%82";
smileys[":zombie:"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%18PLTE%7B%5C%93%EE%DA%FE%88h%A1%DD%C5%F1%DA%BB%F3%E6%D0%F8gF%80%0B!%05%3F%02P%E4%00%00%00%08tRNS%FF%FF%FF%FF%FF%FF%FF%00%DE%83%BDY%00%00%00jIDATx%DAl%CFK%0E%00!%08%03P%04%DB%B9%FF%8D%87%0A%F3%8D%5D%60x%C1%88v%FCcuPy%099%952I%F6%88LZ%09'%16%C8X%02%A3%CC%2Cb%09%A7%01%0C%A8%D7P%89f%B2%C6%25%0E%C0%E1%81%F0%96%E1%BE0%EB%25%03%9D%BA%25%82%E7%CA9%17%FD%FA3%D4%FBh%E7%A1%DC%3Bo%FE%B5%F9%FB'%A7%00%03%00%8B%9B%05%EE%8E'%E7%98%00%00%00%00IEND%AEB%60%82";
smileys["B)"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1EPLTE%EF%D4%B6%E4%E4%E4%FE%E6%D3%FF%DA%C6%FF%DC%B4%FE%B9%91%FF%FF%FF%00%00%00%9AY%20%0B!%05%3F%85%D4-%00%00%00%0AtRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%B2%CC%2C%CF%00%00%00nIDATx%DAl%8F%DB%12%80%20%08%05%95K%D0%FF%FFp%1C%8E6%D5%B4%0F(%3B%A00%CE%2F%83G%82%87%C9t7w%3A%98%CA%D5%8Ar4%E9%113%0C%01%0A%26%900%B4IW%DC%3BX%15%B5%19%11%C3%3A%D0%88hcx%9E5%92%1B%F5m%E6%01f%B2%8B%0A%A4%DA%FA%DD%85%7D%AAk%1E%CC%2C%E0%9E%99%7B%C9s%AF%9F%DD_%5C%02%0C%00%9FO%07%AF%0D%B6P%AA%00%00%00%00IEND%AEB%60%82";
smileys["<3"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%12PLTE%FE%D3%D3%FE%A6%A6%FF%B4%B4%9A%20%20%FF%C6%C6%0B!%056%D5%16%19%00%00%00%06tRNS%FF%FF%FF%FF%FF%00%B3%BF%A4%BF%00%00%00%5DIDATx%DA%5C%CD%0B%0A%C00%08%03P5z%FF%2B%2F%FE%D6%AD%81bx%14%95%B8%23%7C%00%AA%F7%A4%40U%B3%CE%14%163g%85%8A%E4%A4%10%9C%95%40%3A%E2%EA~IF%C4%B0%7BVj%CF%F7%93a%AE%2FY_%3FTP2%D4%D0R40%924%B0BB%FC%25%10%B7%BCy%04%18%00%5E%9D%040%5C'%F3%1B%00%00%00%00IEND%AEB%60%82";
smileys[":*"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%03%00%00%00%0C%B3%B7%C8%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%1BPLTE%C6%00%00%C3E%A7%DDTT%FE%D3%EF%FD%A9%E9%FF%B4%E8%FD%C3%F1%98%25~%0B!%05vll%D3%00%00%00%09tRNS%FF%FF%FF%FF%FF%FF%FF%FF%00SOx%12%00%00%00oIDATx%DAl%CF%0B%0E%830%0C%03%D0%90%9F%B9%FF%89g7%5D%C5%D0%2C!%D4'S%12%BB%DF%B1yAy%08%90Y%99c%12%9E%BB%18%DA%08%B2%17%C80%D2%0D%D0%00%3E%12Vd%AD%B3JG%8A%B5%AFD%F4J%E9%B6%E9l!%F5%FE*%D8rw%D9%12%D1%E5f%E6W%D7%FE%7B%9E%CE%9EG3%87rf%9E%BD%E2%B9%D7%9F%DD%7F%F2%11%60%00S%FC%07%1B%F6m%036%00%00%00%00IEND%AEB%60%82";
smileys[":O"] = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%04%03%00%00%00%C9CZ%C9%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%15PLTE%20%87%AC%00%00%00%20o%9A%A1%D3%FF%B4%DA%FF%C6%E8%FF%D3%EF%FE%A6hA%F1%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%04%1B%11)%0A2%0A.%AB%00%00%00bIDAT%08%D7c%60%40%06JJ%0AP%86%B1%B1%11%98%C9d%1C%E2%E2l%04b)%07%8A%BA%08%3A%83%04U%85B%5D%9CD%80%2C%26%D3P%D1%10%11%17%A04%93Y%A8%A8%0B%8C%A5%1A%AA%02e%85%86%86%40Xi%81%82%A1!%20c%94%D3%12%81%2C%05%18%2BX%01lG%92R%B2%11%AA%BDHn%81%02%00L2%13%87Q%7F%F7W%00%00%00%00IEND%AEB%60%82";
var twitterAccounts = new Object();
twitterAccounts["jayde"] = 25762256;
twitterAccounts["toni"] = 25761305;
twitterAccounts["leigh"] = 30807387;
twitterAccounts["chas"] = 31078854;
twitterAccounts["hell_saint_mvce"] = 31091981;
twitterAccounts["bray"] = 31087141;

if(DEBUG) {
	console.timeEnd("Constants and globals");
	console.time("Themes and styles");
}

/*-----------------------------------------------------------------------------
	T H E M E S  A N D  S T Y L E  S E C T I O N
-----------------------------------------------------------------------------*/
var tempLink = HEAD.getElementsByTagName("link");
// themeElement is a global reference to the <link> element loading the style sheet
var themeElement;
for(var i = 0; i < tempLink.length; ++i) {
	if(tempLink[i].getAttribute("href").search(/\/themes\//i) != -1) {
		themeElement = tempLink[i];
		break;
	}
}

// global custom CSS object // extended in v15 for theming
// customCSS is a global reference to a custom style element into which we can put all our custom CSS
var tempHead = HEAD;
var customCSS = tempHead.appendChild(document.createElement("style"));
customCSS.setAttribute("type","text/css");
customCSS.setAttribute("media","screen");
customCSS.id = "css_generic";
var customCSSresistance = tempHead.appendChild(document.createElement("style"));
customCSSresistance.setAttribute("type","text/css");
customCSSresistance.setAttribute("media","hamster");
customCSSresistance.id = "css_resistance";
var customCSSthelast = tempHead.appendChild(document.createElement("style"));
customCSSthelast.setAttribute("type","text/css");
customCSSthelast.setAttribute("media","hamster");
customCSSthelast.id = "css_thelast";

// should've done this a long time ago
/*	where foo is any string,
	addCSS(foo) adds foo to the generic style
	addCSS(foo, res) adds foo to the resistance style
	addCSS(foo, last) adds foo to the the last style
	NOTE: addCSS(foo, bar), where bar is any string not "res" or "last", also adds the CSS to the generic style
*/
function addCSS(styleString, styleTarget) {
	switch(styleTarget) {
		case "res": customCSSresistance.appendChild(document.createTextNode(styleString)); break;
		case "last": customCSSthelast.appendChild(document.createTextNode(styleString)); break;
		default: customCSS.appendChild(document.createTextNode(styleString)); break;
	}
}

// if theme is not in the session store, set it (oh how I wish I had localStorage)
// for FF users, this setting is permanent through GM functions, for Safari users only until the browser is closed
if(sessionStorage.getItem("theme") == null) {
	if(!SAFARI) sessionStorage.setItem("theme", GM_getValue("lg15.com_theme", getCurrentTheme()))
	else sessionStorage.setItem("theme", getCurrentTheme());
}
// Switch theme to the determined theme
// Not conditional because one set has to be activated
switchTheme(sessionStorage.getItem("theme").toString());

// Helper function that extracts the current theme from the <link> element's href
function getCurrentTheme() {
	var tempArray = themeElement.getAttribute("href").split("/");
	return tempArray[4];
}

// CSS FOLLOWS
// CSS-section; I originally did this with GM_addStyle, but it seems like GreaseKit doesn't like that

// == Generic ==

// Styling for the version notice
addCSS(".footerLink {text-align: center; font-family: sans-serif; font-size: 88%; color: #666666; padding: 0.5em;} .footerLink a, .footerLink a:link, .footerLink a:visited {color: #888888; text-decoration: none;} .footerLink a:hover {color: #999999; text-decoration: underline;}.footerLink a:active {color: #AAAAAA;}");

// Adds Last-styled refresh link, may have to move that later
addCSS("a.commentRefreshLink, a.commentRefreshLink:visited {display: block; float: right; margin-right: 20px; color: #AB6D6D; text-decoration: none; cursor: pointer; width: 19px; height: 18px; background-image: url(\"" + RECYCLE_LAST + "\"); background-repeat: no-repeat; background-position:0px 0px;} a.commentRefreshLink:hover { background-position:-19px 0px;}");
// Adds style for the links in the week header
addCSS("#episode div.post div.post-tlc a.weekLinks:link, #episode div.post div.post-tlc a.weekLinks:visited {text-decoration: none; color: #A6A6A6} #episode div.post div.post-tlc a.weekLinks:hover {text-decoration: underline;} #episode div.post div.post-tlc a.weekLinks:active {color: #FAFAFA;} #episode div.post div.post-tlc div.post-tlc-content h2 {margin-bottom: 0px;}");

// Adds Resistance icon to past shows list
addCSS("#link-theresistance a {margin-left: 13px;}");

// Styling for spacer between week header and episodes
addCSS("div.span14Spacer {height: 16px;} div.headSpacer {height: 8px; width: 576px;}");
// Part of fixing the sidebar
addCSS("#episode div.post {padding-bottom: 0px !important;} #episode div.post div.post-tlc {position: relative; top: 0px; left: 0px;} #episode div.post .span-14 {float: none;} #episode div.post .span-8 {float: none; position: absolute; top: 0px; right: 0px;} #wrapper #episode div.post div.post-tlc div.post-discussion {margin-bottom: 0px;}"); // You EQAL morons need to learn to live without floats
// Sidebar end
addCSS("#episode-foot {position: relative; top: 0px; left: 0px;} div.theLastRect {position: absolute; top: -12px; right: 0px; width: 312px; height: 52px;}");

// Part of the comment boarder hiding logic
addCSS("#wrapper #episode div.post div.post-tlc div.post-tlc-content {position: relative; top: 0px; left: 0px;} #wrapper #episode div.post div.post-tlc div.post-tlc-content div.bottomLeftCorner {width: 16px; height: 16px; position: absolute; bottom: 0px; left: 0px;} div.toggleLinkWrapper {text-align: right;} a.toggleCommentLink {text-decoration: none; cursor: pointer; font-size:80%; font-weight:bold; text-transform:uppercase; margin-right: 1em; margin-top: 0.2em;} a.hideComment {float: right;}");

// Style for phpBB link
addCSS("#global ul #global-phpbb {float: right; margin: 6px 12px 0 0;} #global ul #global-phpbb a {border-right: 2px solid #666666; padding: 0 10px 0 0;}");

// Fixes for the header width and coloring of scriptically added show links
addCSS("#head ul {padding:40px 0pt 0pt 540px !important; white-space: nowrap;} #head ul li#menu-show {background-color: #000000;} #head ul li a.scriptTheResistanceLink {color: #68BF27;} #head ul li a.scriptTheResistanceLink:hover {color: #000000; background-color: #68BF27;} #head ul li a.scriptTheLastLink {color: #CA0707;} #head ul li a.scriptTheLastLink:hover {color: #000000; background-color: #CA0707;}");

// Styling for [quote] bbcode tags
addCSS("blockquote.linkFixQuote {font-style: inherit;} blockquote.linkFixQuote address {font-weight: bold; margin: 0em 0em 0.5em -1em;}"); 

// Styling for image resizing
// For an unknown reason (likely illegal stripping of units), Firefox errors on top: - doesn't affect the script, though
addCSS("img.enlarged {position: absolute; top: 0em; left: -8em; border: 1px solid #666666; z-index: 1000;} dd.post-body .largeImageContainer {position: relative; top: 0px; left: 0px; overflow: visible;}");

// Styling for the BBCode selection parts
addCSS("div.markupBlock {float: right; margin-top: 6px; position: relative; top: 0px; left: 0px;} div.markupBlock table {margin: 0px 0px 0.5em 0px; padding: 3px;} div.markupBlock table td {padding: 2px 3px;} div.markupBlock table td a {cursor: pointer;} div.markupButtons {position: absolute; top: 0px; left: -5.3em; font-size: 90%; letter-spacing: 0.1em; padding: 3px;} div.markupButtons a, div.markupButtons span {display: block; -moz-appearance: button; cursor: pointer; padding: 0.1em; margin: 0.1em; margin-top: 0.3em; text-align: center; text-decoration: none;} div.markupButtons a:first-child, div.markupButtons span:first-child {margin-top: 0.1em;}");
// image border fix
addCSS("div.markupBlock img {margin: 0px;}");
// Dropdown selectors
addCSS("div.markupBlock div.markupDropDowns {text-align: right;} div.markupBlock div.markupDropDowns p {margin: 0px 0px 0.2em 0px;} div.markupBlock div.markupDropDowns select {margin: 0px;} #episode div.post div.post-tlc div.markupDropDowns a, #episode div.post div.post-tlc div.markupDropDowns a:link, #episode div.post div.post-tlc div.markupDropDowns a:active, #episode div.post div.post-tlc div.markupDropDowns a:visited {font-weight: bold; text-decoration: none; cursor: help;} #episode div.post div.post-tlc div.markupDropDowns a:hover {text-decoration: underline;} /* For the forums: */div.module-body div.markupDropDowns a, div.module-body div.markupDropDowns a:link, div.module-body div.markupDropDowns a:visited, div.module-body div.markupDropDowns a:active {color: #222222; font-weight: bold; cursor: help;} div.module-body div.markupDropDowns strong {color: #222222;}");
// This nudges the thing a little for the 8 most recent videos on the portal page
addCSS("#post-24-smileys, #post-23-smileys, #post-22-smileys, #post-21-smileys, #post-20-smileys, #post-19-smileys, #post-18-smileys, #post-17-smileys {margin-right: -11px;}");

// Custom positioning for the Mibbit chat link
addCSS("#u-social-task ul #u-social-chat {float: right; margin-right: 5em;}");

// Styling for the theme selector
addCSS("#u-social-theme select {margin: 0px; border-color: #333333 transparent transparent #333333; border-style: solid; border-width: 1px; color: #CCCCCC; background-color: transparent;} #u-social-theme option {background-color: #000000;}");

// Styling for the current week sidebar link
addCSS("#wrapper #episode-list ul li.current {overflow: visible; white-space: nowrap;} #wrapper #episode-list ul li.current a:link, #wrapper #episode-list ul li.current a:visited {border: 1px solid; border-right: none; border-left: 1px solid !important;}");

// Styling for hovered-over week links
addCSS("#wrapper #episode-list ul li a:hover, #wrapper #episode-list ul li a:active {margin-left: -4px;}");

// Styling for posting user
addCSS("#episode .post-tlc-content .user a:link, #episode .post-tlc-content .user a:visited {-moz-border-radius: 8px;}");

// Center video in the posting space
addCSS("p.post {text-align: center;}");

addCSS("a.cruella {float: right; margin-bottom: 28px; margin-right: 5px; color: #222222; cursor: default;}");

// Size up the pedia Link
addCSS("ul.promos li a {font-size: 130%;}");

// Align/format the episode-specific pedia Links
addCSS("div.autoPediaLinks {text-align: right; font-style: italic;}");

// This is actually obsolete, but we'll keep it in case we add something to the footer in the future
//addCSS("#foot {color: #AAAAAA !important;}");

// This fixes the video-over-userbar problem
// In Safari, this automatically displays scrollbars, making the userbar inaccessible
if(!SAFARI) addCSS("#u-social-task {overflow: auto;}");

// Reversing border styles
addCSS("input.text, input.title, textarea, select {border:1px solid #666666;} input.text:focus, input.title:focus, textarea:focus, select:focus {border:1px solid #BBBBBB;}");

// Style for posts' "Last seen:" display and LSon/off notices
addCSS(".lastSeenDisplay {font-weight: normal; font-size: xx-small; padding-top: 1em; letter-spacing: 0.08em; text-align: center;} .LSon, .LSoff {font-size: 95%; letter-spacing: 0.07em; line-height: 1.4em;} .LSon {color: #008800;} .LSoff {color: #EE0000;}");

// Style for profile pages' "Ignore" link
addCSS("span.ignoreLink {cursor: pointer;}");

// This sets posts from ignored users invisible
if(!SAFARI) {
	var ignoreList = GM_getValue(CURRENT_USER_ID + ".ignorelist");
	if(ignoreList && ignoreList.length > 1) addCSS(ignoreList.replace(/\+/g,", li.c").replace(/^(?:, li\.c)*/,"li.c") + " {visibility: hidden;}");
	ignoreList = null;
}

// Style for Script Options link and options
addCSS("#u-social span.linkfix {padding-left: 26px; cursor: pointer;} #u-social a.optionslink {text-decoration: none;} form#chatNickForm, form#lastSeenForm {color: #888888;} form#lastSeenForm p {margin-top: 0.4em;} label.confirmation {color: #33CC33; display: none;}");

// Style for Twitter
addCSS("#twittercontainer {padding: 0em 4em 0em 4em; margin-bottom: 1em;} #episode #twittercontainer a:link, #episode #twittercontainer a:visited {text-decoration: none;} #episode #twittercontainer a:hover, #episode #twittercontainer a:active {text-decoration: underline;} .twitterfoot {font-size: x-small; text-align: right; padding: 0.1em 0.5em 0.1em 0.5em; } .twitterpost {position: relative; top: -2px; left: -2px; margin-bottom: 0.5em;} .twitteruser, .twitteruser a {font-size: x-small; letter-spacing: 0.2em; text-transform: uppercase; padding: 0.1em 0.1em 0.1em 0.3em;} .twittermessage {padding: 0.7em;} #twitterheadline {font-size: large; margin-left: 2em;} #episode #twitterExplanation {padding: 0em 3.8em 0em 4.3em;} #twitterF5count {} #twitterUpdateButton {text-decoration: none; cursor: pointer;} #twitterUpdateButton:hover {text-decoration: underline;} .twittershadow {position: relative; top: 2px; left: 2px;}");

// Style for hovered social bar links
addCSS("#u-social-task ul li a:hover {background-color: #1A1A1A; border-color: #4A4A4A transparent transparent #4A4A4A; border-style: solid; border-width: 1px; color: #FFFFFF;} #u-social-task ul li a:active {border-color: transparent #4A4A4A #4A4A4A transparent !important;}");

// Video responses styling
addCSS(".vidRespsWrapper {margin: 5em 2em 1em 3em; height: 400px; overflow-y: auto;} .vidRespsHead {font-size: large;} .vidRespsList {list-style-type: none;} #episode div.post div.post-tlc a:link.vidRespsLink, #episode div.post div.post-tlc a:visited.vidRespsLink {color: #BBBBBB; float: right; text-decoration: none;} #episode div.post div.post-tlc a:hover.vidRespsLink, #episode div.post div.post-tlc a:active.vidRespsLink {text-decoration: underline;} #episode div.post div.post-tlc ul.vidRespsList li a.responseVideo {color: #BBBBBB; text-decoration: none; display: block;} ul.vidRespsList li {padding: 0.5em; margin-bottom: 1em;}");

// == The Resistance ==
// Background-color: #00828d
// Sidebar-color: #333333

// Styling for spacer between week header and episodes
addCSS("div.span14Spacer {background-color: #00828d;} div.headSpacer {background-color: #00828d;}", "res");

// Part of the comment boarder hiding logic
addCSS("#wrapper #episode div.post div.post-tlc div.post-tlc-content div.bottomLeftCorner {background-image: url(http://static.lg15.com/themes/resistance/img/show_episode_post_corner_bottom.png);} div.toggleLinkWrapper {background-color: #00828d;} a.toggleCommentLink {color: #444444;} a.hideComment {color: #5e5e5e;}", "res");

// Sidebar end
addCSS("div.theLastRect {background-color: #333333;}", "res");

// Styling for the current week sidebar link
addCSS("#wrapper #episode-list ul li.current a:link, #wrapper #episode-list ul li.current a:visited {background-color: #00828d !important; border-color: #00b0bf !important;}", "res");

// Styling for hovered-over week links
addCSS("#wrapper #episode-list ul li a:hover, #wrapper #episode-list ul li a:active {border-left:4px solid #00828D !important;}", "res");

// Styling for posting user
addCSS("#episode div.post div.post-tlc div.post-tlc-content div.user a:link, #episode div.post div.post-tlc div.post-tlc-content div.user a:visited {background-color:#00828d !important; color:#242424 !important;} #episode .post-tlc-content .user a:link, #episode .post-tlc-content .user a:visited {border-color: #262626 !important;}", "res");

// Fixed comment style because the moronic EQAL coders have styles in there that didn't work on the Resistance or The Last
// They only work now because I fixed their site structure
addCSS("#episode div.post div.post-tlc dl {color: #222222 !important;}", "res");
// same as above, for links
addCSS("#episode div.post div.post-tlc ul.post-list a:link, #episode div.post div.post-tlc ul.post-list a:visited {color: #000099 !important;}", "res");
addCSS("#episode div.post div.post-tlc ul.post-list a:hover {color: #000000 !important;}", "res");
// same as above, for headlines
addCSS("#episode div.post div.post-discussion h3.post-list-heading {color: #111111 !important;}", "res");
// same as above, for the textarea label
addCSS("#episode div.post div.post-tlc label.textarea-input {color: #222222 !important;}", "res");

// Styling for the BBCode selection parts
addCSS("div.markupBlock table {background-color: #00828d; border: 1px solid #666666;} div.markupButtons {background-color: #00828d; border: 1px solid #666666;} div.markupButtons a, div.markupButtons a:link, div.markupButtons a:visited {border: 1px solid; border-color: #0099a6 #006a73 #006a73 #0099a6; color: #222222;} div.markupButtons a:hover {border-color: #00b0bf #00828d #00828d #00b0bf; background-color: #0099a6; color: #080808;} div.markupButtons a:active {border-color: #00828d #00b0bf #00b0bf #00828d; background-color: #0099a6; color: #080808;} div.markupDropDowns strong {color: #222222;} #episode div.post div.post-tlc div.markupDropDowns a, #episode div.post div.post-tlc div.markupDropDowns a:link, #episode div.post div.post-tlc div.markupDropDowns a:active, #episode div.post div.post-tlc div.markupDropDowns a:visited, #episode div.post div.post-tlc div.markupDropDowns a:hover {color: #222222;}", "res");

// Style for Twitter
addCSS("#twittercontainer {color: #BBBBBB;} #episode #twittercontainer a:link, #episode #twittercontainer a:visited {color: #999999;} .twitterfoot {color: #666666; background-color: #262626;} .twitterpost {border: 1px solid #383838;} .twitteruser {color: #888888; background-color: #262626;} .twittermessage {background-color: #2b2b2b;} #twitterheadline {color: #CCCCCC;} #episode #twitterExplanation {color: #888888;} #twitterF5count {color: #999999;} #twitterUpdateButton {color: #BBBBBB;} #twitterUpdateButton:hover {text-decoration: underline;} .twittershadow {background-color: #212121;}", "res");

// Video responses styling
addCSS(".vidRespsHead {color: #CCCCCC;} ul.vidRespsList li {background-color: #262626; border: 1px solid #1f1f1f; color: #888888;} ul.vidRespsList li:hover {background-color: #4c4c4c; border-color: #666666;}", "res");

// == The Last ==
// Background-color: #4B0606
// Sidebar-color: #2f2525

// This fixes the header image
addCSS("#head h1#show-resistance a {background: url(\"" + HEADER_IMG_LAST + "\") !important;} #head h1#show-resistance a.itsandrew {background: url(\"" + HEADER_IMG_LAST_SIB + "\") !important;}", "last");

// Styling for spacer between week header and episodes
addCSS("div.span14Spacer {background-color: #4B0606;} div.headSpacer {background-color: #4B0606;}", "last");

// Part of the comment boarder hiding logic
addCSS("#wrapper #episode div.post div.post-tlc div.post-tlc-content div.bottomLeftCorner {background-image: url(http://static.lg15.com/themes/thelast/img/show_episode_post_corner_bottom.png);} div.toggleLinkWrapper {background-color: #4B0606;} a.toggleCommentLink {color: #999999;} a.hideComment {color: #AAAAAA;}", "last");

// Sidebar end
addCSS("div.theLastRect {background-color: #2f2525;}", "last");

// Styling for the current week sidebar link
addCSS("#wrapper #episode-list ul li.current a:link, #wrapper #episode-list ul li.current a:visited {background-color: #4b0606 !important; border-color: #7d0404 !important;}", "last");

// Styling for hovered-over week links
addCSS("#wrapper #episode-list ul li a:hover, #wrapper #episode-list ul li a:active {border-left:4px solid #999999 !important;}", "last");

// Styling for posting user
addCSS("#episode div.post div.post-tlc div.post-tlc-content div.user a:link, #episode div.post div.post-tlc div.post-tlc-content div.user a:visited {background-color:#4b0606 !important; color:#B2B2B2 !important;} #episode .post-tlc-content .user a:link, #episode .post-tlc-content .user a:visited {border-color: #261e1e !important;}", "last");

// Resistance-styled form parts don't fit The Last
addCSS("input, textarea, select {background-color: #373C41; color: #bab5ac;}", "last");

// Featured posts are only used on the trailer in The Last, and the black background doesn't work with the layout anyway - this disables it
addCSS("#wrapper #episode div.post div.post-tlc.feature {background-image:url(http://static.lg15.com/themes/thelast/img/show_post_bg.png) !important;}", "last");

// Tone down video description text color
addCSS(".post-tlc-desc {color: #A6A6A6;}", "last");

/*// Add a border around the video // this doesn't work
addCSS("p.post object embed {border: 1px solid #1f1818;}", "last");*/

// Setting some comment board styles
addCSS("#wrapper #episode div.post div.post-discussion {background-color: #730d0d !important;} #episode ul.post-list li {border-color: #540707 !important; border-style: solid none none none !important; margin-bottom: 3px !important; padding: 0px !important; background-color: #4b0606 !important; border-width: 2px !important;} #episode ul.post-list .post-head li {border-width: 0px !important;} #episode ul.post-list li.meta-num {color: #a66b54 !important; background-color: #730d0d !important;} #episode ul.post-list li dl dt.post-head ul li.meta-timestamp {color: #b2735b !important; background-color: #730d0d !important;} #episode .ugc-wrapper {color: #debaba !important;}", "last");

// Setting some more comment board styles
addCSS("#episode ul.post-list li dl {margin:0px 110px 0px 0pt !important; border-right: none !important; padding-left: 16px; background-color: #730d0d;} #episode ul.post-list li h3.author {width: 110px !important; text-align: center; background-color: #4b0606; padding-top: 16px; padding-bottom: 16px; overflow: visible; white-space: nowrap;} #episode ul.post-list li h3.author div.user, #episode ul.post-list li h3.author a.user {color: #AAAAAA;} #episode ul.post-list li h3.author a.user:hover {color: #BBBBBB;} #episode ul.post-list li dl dd.post-body {padding: 0px 16px 1em 0px !important;} #episode ul.post-list li h3.author div.user a {margin: 0px auto 0px auto !important;} #episode ul.post-list li h3.author div.user a:hover {background-color: #993e3e;} #episode ul.post-list {border-top-color: #540707 !important; border-bottom-color: #3b0505 !important;} #episode div.post div.post-discussion div.discussion-jump div.discussion-jump-main a, #episode div.post div.post-discussion div.discussion-jump div.discussion-jump-detail a {color: #DDDDDD !important;} #episode .form label.required {color: #a67765 !important;} #episode div.post div.post-tlc ul.post-list a.parserLinks, #episode div.post div.post-tlc ul.post-list a.parserLinks:visited, #episode div.post div.post-tlc div.ugc-wrapper a, #episode div.post div.post-tlc div.ugc-wrapper a:visited {color: #DDDDAA; text-decoration: none;} #episode div.post div.post-tlc ul.post-list a.parserLinks:hover, #episode div.post div.post-tlc div.ugc-wrapper a:hover {text-decoration: underline;} #episode div.post-discussion h3.post-list-heading {color: #BBBBBB; border-bottom: none !important; margin: 1em 0px 0.3em 16px !important;} #episode ul.post-list li .user a:link, #episode ul.post-list li .user a:visited {border-top:1px solid #daa !important; border-right:1px solid #966 !important; border-bottom:1px solid #966 !important; border-left:1px solid #daa !important;}", "last");

// Styling for the BBCode selection parts
addCSS("div.markupBlock table {background-color: #4B0606; border: 1px solid #885555;} div.markupButtons {background-color: #4B0606; border: 1px solid #3d0505;} div.markupButtons a, div.markupButtons a:link, div.markupButtons a:visited {border: 1px solid; border-color: #630808 #300404 #300404 #630808; color: #AAAAAA;} div.markupButtons a:hover {border-color: #7d0a0a #4B0606 #4B0606 #7d0a0a; background-color: #630808; color: #919191;} div.markupButtons a:active {border-color: #4B0606 #7d0a0a #7d0a0a #4B0606; background-color: #630808; color: #919191;} div.markupDropDowns strong {color: #A67765;} #episode div.post div.post-tlc div.markupDropDowns a, #episode div.post div.post-tlc div.markupDropDowns a:link, #episode div.post div.post-tlc div.markupDropDowns a:active, #episode div.post div.post-tlc div.markupDropDowns a:visited, #episode div.post div.post-tlc div.markupDropDowns a:hover {color: #A67765;}", "last");

// Adding new The Last "card"
addCSS(".card.mask {background: transparent url(\"" + CARD_THELAST + "\") no-repeat scroll 0 0;}", "last");

// Styling for [quote] bbcode tags
addCSS("blockquote.linkFixQuote {color: #c47e7e;} blockquote.linkFixQuote address {color: #c48686;}", "last");

// Style for Twitter
addCSS("#twittercontainer {color: #BBBBBB;} #episode #twittercontainer a:link, #episode #twittercontainer a:visited {color: #999999;} .twitterfoot {color: #666666; background-color: #241c1c;} .twitterpost {border: 1px solid #332828;} .twitteruser {color: #888888; background-color: #241c1c;} .twittermessage {background-color: #292020;} #twitterheadline {color: #CCCCCC;} #episode #twitterExplanation {color: #888888;} #twitterF5count {color: #AAAAAA;} #twitterUpdateButton {color: #BBBBBB;} #twitterUpdateButton:hover {text-decoration: underline;} .twittershadow {background-color: #1C1616;}", "last");

// Video responses styling
addCSS(".vidRespsHead {color: #CCCCCC;} ul.vidRespsList li {background-color: #261E1E; border: 1px solid #1f1818; color: #888888;} ul.vidRespsList li:hover {background-color: #473838; border-color: #614c4c;}", "last");

// Improved social bar styling
addCSS("#u-social-task {background: #000000 url(\"" + SOCIAL_BAR_BG + "\") repeat-x scroll 0 0 !important;} #u-social {background: url(\"" + SOCIAL_BAR_SHADOW + "\") repeat-x scroll 0 0 !important; padding-top: 9px;}", "last");

/*-----------------------------------------------------------------------------
	E N D  O F  T H E M E S  A N D  S T Y L E  S E C T I O N
-----------------------------------------------------------------------------*/

if(DEBUG) {
	console.timeEnd("Themes and styles");
	console.groupEnd();
}

// This is all that's needed to fix the link from the outside
// ATTENTION: Starting from v15, the header link is dynamically modified by switchTheme
// This section only exists for historical purposes and is redundant
if(theLast) {
	//document.getElementById("show-resistance").getElementsByTagName("a")[0].setAttribute("href","http://www.lg15.com/thelast");
	//HEADER_LINK.setAttribute("href","http://www.lg15.com/thelast");
	if(getCurrentTheme() == "thelast") HEADER_LINK.href = "http://www.lg15.com/thelast";
}

if(DEBUG) {
	console.group("The Last Episode Page");
	console.time("The Last Episode Page");
}
if(theLast && episodePage) {
	// new in v15 - reached a point where I just had to generate access ids once and for all.
	idEverything();
	
	// cleaning up episode titles
	for(var i = iLATEST_BOARD; i >= iOLDEST_BOARD; --i) document.getElementById("post-" + i + "-episodeTitle").firstChild.nodeValue = stripTheLast(document.getElementById("post-" + i + "-episodeTitle").firstChild.nodeValue);
	
	// This pieces the page title together
	var pageTitle = new String(pageSeries.nodeValue); // initializes the string with either The Last or LG15: The Last
	var tempNode = document.getElementsByClassName("current")[0].getElementsByTagName("a")[0].firstChild; // Shiori creates work -_- // gets current week
	pageTitle = pageTitle.concat(" - ", tempNode.nodeValue);
	tempNode = document.getElementById("post-" + LATEST_BOARD + "-episodeTitle").firstChild;
	pageTitle = pageTitle.concat(" - ", tempNode.nodeValue);
	
	tempNode = document.getElementsByTagName("title")[0]; 
	tempNode.appendChild(document.createTextNode(pageTitle));
	document.title = pageTitle;

	// This adds automagic LGPedia-links to each video post
	var episodeName = new String("");
	var tempNodeI = null;
	for(var i = iLATEST_BOARD; i >= iOLDEST_BOARD; --i) {
		episodeName = createSafeTitle(document.getElementById("post-" + i + "-episodeTitle").firstChild.nodeValue);
		
		var tempLink = createAnchor("http://www.lg15.com/lgpedia/index.php?title=" + episodeName, "Check this episode on LGPedia!");
		tempLink.setAttribute("title","This link was automatically generated and may be incorrect.");
		tempNodeI = document.createElement("div");
		tempNodeI.setAttribute("class","autoPediaLinks");
		tempNodeI.appendChild(tempLink);
		document.getElementById("post-" + i + "-description").appendChild(tempNodeI);
	}
	
	// This adds The Resistance to Past Shows....not that I'm implying anything.
	tempNode = document.createElement("img");
	tempNode.setAttribute("src",RESISTANCE_TV_ICON);
	tempNode.setAttribute("width","124px");
	tempLink = document.createElement("a");
	tempLink.setAttribute("href","http://www.lg15.com/theresistance/");
	tempLink.appendChild(tempNode);
	tempNodeI = document.createElement("dd");
	tempNodeI.setAttribute("id","link-theresistance");
	tempNodeI.appendChild(tempLink);
	tempNode = document.getElementById("link-katemodern");
	tempNode.parentNode.insertBefore(tempNodeI, tempNode.nextSibling);
	// yes, I know the variable naming scheme is horrible. It works.
	
	// Removing Community Shows list
	while(tempNode.nextSibling.nextSibling !== null) tempNode.parentNode.removeChild(tempNode.nextSibling.nextSibling);
	
	
	for(var i = iLATEST_BOARD; i >= iOLDEST_BOARD; --i) {
		// fix sidebar backgrounds
		tempNode = document.getElementById("post-" + i);
		tempNodeI = document.createElement("div");
		tempNodeI.setAttribute("class","post-tlc");
		tempNodeI.id = "lower-" + i;
		tempNodeI.appendChild(tempNode.removeChild(document.getElementById("lower-" + i + "-wrapper")));
		tempNodeI.appendChild(tempNode.removeChild(document.getElementById("lower-" + i + "-sidebar")));
		tempNode.appendChild(tempNodeI);
		// append spacers
		tempNodeI = null;
		if(i != iOLDEST_BOARD) {
			tempNodeI = document.createElement("div");
			tempNodeI.setAttribute("class","span14Spacer");
			document.getElementById("lower-" + i + "-wrapper").appendChild(tempNodeI);
		}
	}
	
	// insert spacer between week header and episodes
	tempNodeI = document.createElement("div");
	tempNodeI.setAttribute("class","headSpacer");
	tempLink = document.getElementById("episode").insertBefore(tempNodeI,document.getElementById("post-" + LATEST_BOARD));
	
	// crude fix, but after having come this far, I will not invest another 2 hours to fix EQAL's moronic layout
	// this adds an empty, colored rectangle at the bottom of the sidebar
	tempNode = document.createElement("div");
	tempNode.setAttribute("class","theLastRect");
	document.getElementById("episode-foot").appendChild(tempNode);
	tempNode = null;
	
	// This adds show/hide links to the comments, and hides the non-current boards by default
	var commentSections; 	// entire comments section
	var commentLists;		// only the actual comments
	var postSections;		// the video post
	
	// Add links
	for(var i = iLATEST_BOARD; i >= iOLDEST_BOARD; --i) {
		// set this loop's vars
		var currentID = i.toString();
		commentSection = document.getElementById("post-" + currentID + "-commentBoard"); 	// entire comments section
		commentList = document.getElementById("post-" + currentID + "-comments");			// only the actual comments
		postSection = document.getElementById("post-" + currentID + "-content");			// the video post
		
		// Remove lower comment sections
		commentSection.style.display = "none";
		
		// Do unsafe AJAX FX
		if(!SAFARI) commentSection.wrappedJSObject.fade('hide');
		
		// Create toggle link wrapper
		tempNode = document.createElement("div");
		tempNode.setAttribute("class","toggleLinkWrapper");
		
		// Create primary toggle link
		tempLink = document.createElement("a");
		tempLink.setAttribute("class","toggleCommentLink");
		tempLink.id = "show-" + currentID;
		tempLink.appendChild(document.createTextNode("Show comments \u2193"));
		tempLink.addEventListener("click", toggleComment, false);
		tempNode.appendChild(tempLink);
		
		// Append primary link
		commentSection.parentNode.insertBefore(tempNode,commentSection.nextSibling);
		
		// Create secondary link (inside the comments section)
		tempLink = document.createElement("a");
		tempLink.setAttribute("class","toggleCommentLink hideComment");
		tempLink.id = "hide-" + currentID;
		tempLink.appendChild(document.createTextNode("Hide comments \u2191"));
		tempLink.addEventListener("click", toggleComment, false);
		
		// Append secondary link
		commentSection.insertBefore(tempLink,commentSection.firstChild)
		
		// Manual comment refresh trigger
		tempLink = document.createElement("a");
		tempLink.id = "commentRefreshLink-" + currentID;
		tempLink.setAttribute("class","commentRefreshLink");
		tempLink.title = "F5";
		tempLink.addEventListener("click", function() {refreshComments(getPostId(this));}, false); // cannot be currentID because JavaScript doesn't replace it
		commentList.parentNode.insertBefore(tempLink,commentList.nextSibling);
		
		// Add corner
		tempNode = document.createElement("div");
		tempNode.setAttribute("class","bottomLeftCorner");
		tempNode.id = "corner-" + currentID;
		postSection.appendChild(tempNode);
		
		// Add name to head link
		//document.getElementById("post-" + currentID + "-user").name = "head-" + currentID;
		document.getElementById("post-" + currentID + "-user").name = createSafeTitle(document.getElementById("post-" + currentID + "-episodeTitle").firstChild.nodeValue).toLowerCase();
	}
	
	// Reactivate top comment board
	document.getElementById("post-" + LATEST_BOARD + "-commentBoard").style.display = "block";
	if(!SAFARI) document.getElementById("post-" + LATEST_BOARD + "-commentBoard").wrappedJSObject.fade('show');
	document.getElementById("show-" + LATEST_BOARD).firstChild.nodeValue = "Hide comments \u2191";
	document.getElementById("corner-" + LATEST_BOARD).style.display = "none";
	
	/* AJAX magic to refresh comments automagically
	 * You *can* change the number below to increase the frequency of comment refreshing
	 * BUT REMEMBER that every time the comments refresh, it is as if you pressed refresh
	 * in your browser, loading an entire page from the server. If the script refreshes 
	 * too often, you alone essentially put the load of dozens, if not hundreds of people 
	 * on the server, increasing the likelyhood that it will become unresponsive for everyone,
	 * or even crash - would you want to be responsible for crashing the comment boards?
	 * I think not.
	 *
	 * DO NOT SET THIS NUMBER BELOW 30000. 
	 */
	var onTheRun = setInterval(refreshComments, 180000, LATEST_BOARD);
	
	// Refresh-less posting 
	//document.getElementById("create_discussion_post").addEventListener('submit', customAjaxSubmit, true); //breaks because the EQAL morons can't use id properly
	tempNode = document.getElementById("episode").getElementsByClassName("form");
	for(var i = 0; i < tempNode.length; ++i) {
		tempNode[i].addEventListener('submit', customAjaxSubmit, true);
	}
	
	// Add links to week header - arrow images
	var arrowNode = document.createElement("img");
	arrowNode.src = ARROW_LAST;
	arrowNode.style.marginBottom = "-2px";
	
	// empty week header subheader
	tempNode = document.getElementById("post-" + (iLATEST_BOARD+1) + "-contentItems");
	while(tempNode.hasChildNodes()) tempNode.removeChild(tempNode.firstChild);
	
	// Add links to week header - insertion
	for(var i = iLATEST_BOARD; i >= iOLDEST_BOARD; --i) {
		// Add links
		tempNode.insertBefore(createAnchor("#" + createSafeTitle(document.getElementById("post-" + i + "-episodeTitle").firstChild.nodeValue).toLowerCase(), document.getElementById("post-" + i + "-episodeTitle").firstChild.nodeValue, "weekLink-" + i, "weekLinks"),tempNode.firstChild);
		// Add arrow images
		tempNode.insertBefore(arrowNode.cloneNode(true),tempNode.firstChild);
	}
	
	/* OLD CODE - hardwired for breefm.blogspot.com x_x Black:
	<!--Wavestreaming.com SHOUTcast Flash Player--><script type="text/javascript" src="http://player.wavestreamer.com/cgi-bin/swf.js?id=1OWG8493GNVI8ZKC"></script><script type="text/javascript" src="http://player.wavestreaming.com/?id=1OWG8493GNVI8ZKC"></script><!--End Player-->
	Silverywhite:
	<!--Wavestreaming.com SHOUTcast Flash Player--><script type="text/javascript" src="http://player.wavestreamer.com/cgi-bin/swf.js?id=S5I6KLW2S4U65QXA"></script><script type="text/javascript" src="http://player.wavestreaming.com/?id=S5I6KLW2S4U65QXA"></script><!--End Player-->
	*/
	/* NEW CODE - hardwired for lg15.com
	<!--Wavestreaming.com SHOUTcast Flash Player--><script type="text/javascript" src="http://player.wavestreamer.com/cgi-bin/swf.js?id=QBN2DC1RHAA1ZTPR"></script><script type="text/javascript" src="http://player.wavestreaming.com/?id=QBN2DC1RHAA1ZTPR"></script><!--End Player-->
	*/
	/*var tempWrapper = document.createElement("div");
	tempWrapper.style.padding = "5px";
	tempLink = document.createElement("script");
	tempLink.src = "http:\/\/player.wavestreamer.com\/cgi-bin\/swf.js?id=QBN2DC1RHAA1ZTPR";
	tempLink.setAttribute("type","text\/javascript");
	tempNodeI = tempLink.cloneNode(false);
	tempNodeI.src = "http:\/\/player.wavestreaming.com\/?id=QBN2DC1RHAA1ZTPR";
	tempWrapper.appendChild(document.createComment("Wavestreaming.com SHOUTcast Flash Player"));
	tempWrapper.appendChild(tempLink);
	tempWrapper.appendChild(tempNodeI);
	tempWrapper.appendChild(document.createComment("End Player"));
	tempNode.insertBefore(tempWrapper,tempNode.firstChild);*/
	
	// Twitter integration (Firefox only)
	if(!SAFARI) {
		//for debugging:
		// Sam: http://twitter.com/statuses/user_timeline.xml?user_id=22577252&count=1
		// Em: http://twitter.com/statuses/user_timeline.xml?user_id=35697247&count=1
		
		// Remove annoying iMeem player 
		tempNode = document.getElementsByClassName("post-featured")[0]; // imeem wrapper
		tempNode.removeChild(tempNode.getElementsByTagName("div")[0]);
		// Add Twitter explanation text
		tempNodeI = document.createElement("p");
		tempNodeI.id = "twitterExplanation";
		tempNodeI.appendChild(document.createTextNode("Due to technical restrictions, this block does not update automatically. "));
		// Twitter refresh link 
		tempLink = document.createElement("a");
		tempLink.id = "twitterUpdateButton";
		tempLink.title = "F5";
		tempLink.appendChild(document.createTextNode("Click here to F5."));
		tempLink.addEventListener("click", updateAllTwitters, false);
		tempNodeI.appendChild(tempLink);
		tempNodeI.appendChild(document.createTextNode(" You have "));
		tempLink = document.createElement("span");
		tempLink.id = "twitterF5count";
		tempLink.appendChild(document.createTextNode(Math.floor(twitterRateLimitLeft/6).toString()));
		tempNodeI.appendChild(tempLink);
		tempNodeI.appendChild(document.createTextNode(" F5s left this hour."));
		
		tempNode.insertBefore(tempNodeI, tempNode.firstChild);
		
		// Add Twitter container DIV
		var tempNodeI = document.createElement("div");
		tempNodeI.id = "twittercontainer";
		if(GM_getValue("recentTwitterPosts")) tempNodeI.innerHTML = GM_getValue("recentTwitterPosts");
		tempNode.insertBefore(tempNodeI, tempNode.firstChild);
		
		// Add Twitter headline
		tempNodeI = document.createElement("h1");
		tempNodeI.appendChild(document.createTextNode("The Last on Twitter"));
		tempNodeI.id = "twitterheadline";
		tempNode.insertBefore(tempNodeI, tempNode.firstChild);
		
		document.addEventListener("new_twitter_posts", updateTwitterDiv, false);
	}
	
	tempNode = null;
	
	for(var i = iLATEST_BOARD; i >= iOLDEST_BOARD; --i) {
		// Adjust video positioning for overly wide videos
		tempNode = document.getElementById("post-" + i + "-video");
		var tempVideoWidth = parseInt(tempNode.getAttribute("width"));
		tempNode.parentNode.style.marginLeft = "-" + ((tempVideoWidth - 528)/2) + "px"; // 528 -> .span-14 = 576px, minus 2*24px padding of .post-tlc-content
		
		// Deactivate YouTube title display
		tempNode.firstChild.value = tempNode.firstChild.value + "&showinfo=0";
		tempNode.lastChild.src = tempNode.lastChild.src + "&showinfo=0";
		
		// Add YouTube video responses, if they exist
		if(!SAFARI) showVideoResponses(/\/v\/(.*)&hl=/.exec(tempNode.firstChild.value)[1], i);
	}
	
	
}
if(DEBUG) {
	console.timeEnd("The Last Episode Page");
	console.groupEnd();
}

function idEverything() {
	if(DEBUG) console.time("idEverything()");
	/* ASSIGNS THE FOLLOWING IDS ATM:
	post-25 and lower to class="post" blocks (all video posts + week header)
	upper-25 and lower for first class="post-tlc" in a block
	lower-24 and lower for second class="post-tlc" in a block
	(upper|lower)-(<=(25|24))-wrapper for the left (content) side of each block
	(upper|lower)-(<=(25|24))-sidebar for the right (sidebar) side of each block
	post-(<=25)-content to class="post-tlc-content" blocks
	post-(<=25)-headline to h2 element in content
	post-(<=24)-user to posting user a element
	post-(<=25)-contentItems to class="post-tlc-units" blocks
	post-(<=24)-description to class="post-tlc-desc" blocks
	post-(<=24)-video for the object tags
	post-(<=24)-episodeTitle to h3 element in description
	post-(<=24)-commentBoard for class="post-discussion" blocks
	post-(<=24)-comments for class="post-list" unordered lists
	
	*/
	var postBlock = document.getElementsByClassName("post"); 
	var rejectedElements = 0; // because our favorite morons decided divs and lists are exactly the same thing
	for(var i = 0; i < (postBlock.length -1); ++i) { // last class="post" is the footer
		if(postBlock[i].tagName != "DIV") {
			++rejectedElements;
			continue;
		}
		var currentID = (iLATEST_BOARD + 1 - i + rejectedElements).toString(); // +1 because in EQAL's moronic code, the week header is a post as well. All hail EQAL logic.
		//alert("i: " + i + " length: " + postBlock.length + " currentID: " + currentID);
		postBlock[i].id = "post-" + currentID;
		
		var tempNodeI = postBlock[i].getElementsByClassName("post-tlc")[0];
		tempNodeI.id = "upper-" + currentID;
		tempNodeI.getElementsByClassName("span-14")[0].id = "upper-" + currentID + "-wrapper"; // which moron of a designer named these classes, anyway?
		tempNodeI.getElementsByClassName("span-8")[0].id = "upper-" + currentID + "-sidebar";
		if(currentID <= iLATEST_BOARD) {
			postBlock[i].getElementsByClassName("span-14")[1].id = "lower-" + currentID + "-wrapper";
			postBlock[i].getElementsByClassName("span-8")[1].id = "lower-" + currentID + "-sidebar";
		}
		document.getElementById("upper-" + currentID + "-wrapper").getElementsByClassName("post-tlc-content")[0].id = "post-" + currentID + "-content";
		tempNodeI = document.getElementById("post-" + currentID + "-content");
		tempNodeI.getElementsByTagName("h2")[0].id = "post-" + currentID + "-headline";
		if(currentID < (iLATEST_BOARD + 1)) tempNodeI.getElementsByClassName("user")[0].getElementsByTagName("a")[0].id = "post-" + currentID + "-user";
		tempNodeI = tempNodeI.getElementsByClassName("post-tlc-units")[0]; // did I mention the class names are moronic?
		tempNodeI.id = "post-" + currentID + "-contentItems";
		
		if(currentID > iLATEST_BOARD) continue; // ends loop for week header
			
		tempNodeI.getElementsByClassName("post-tlc-desc")[0].id = "post-" + currentID + "-description";
		tempNodeI.getElementsByTagName("object")[0].id = "post-" + currentID + "-video";
		tempNodeI.getElementsByTagName("h3")[0].id = "post-" + currentID + "-episodeTitle";
		document.getElementById("lower-" + currentID + "-wrapper").getElementsByClassName("post-discussion")[0].id = "post-" + currentID + "-commentBoard";
		document.getElementById("post-" + currentID + "-commentBoard").getElementsByClassName("post-list")[0].id = "post-" + currentID + "-comments";
	}
	episodeNumber = postBlock.length - rejectedElements - 2; // -2 for week header and footer
	iOLDEST_BOARD = iLATEST_BOARD - episodeNumber + 1;
	if(DEBUG) console.timeEnd("idEverything()");
}

// this function extracts this section's number from a given node's ID
function getPostId(tempNode) {
	return tempNode.id.match(/\d\d?/)[0];
}

function createSafeTitle(episodename) {
	var tempName = episodename;
	tempName = tempName.replace(/ /g,"_"); //pedia-fying the spaces - not strictly necessary, but could potentially prevent problems
	tempName = tempName.replace(/\?/g,"%3F"); // would otherwise count as arguments
	tempName = tempName.replace(/&/g,"%26"); // would otherwise count as arguments
	tempName = tempName.replace(/#/g,"%23"); // would otherwise count as link*/
	return tempName;
}

// This function toggles comment sections between show and hide
function toggleComment(eventName) {
	var callingLink = eventName.target;									// the link that was clicked
	var commentSection = getPostId(callingLink);				// holds the id (number) of the current discussion section
	var commentStyle = document.getElementById("post-" + commentSection + "-commentBoard").style;	// style property of that discussion section
	var corner = document.getElementById("corner-" + commentSection);	// lower left corner element of that video's description section
	var showLink = document.getElementById("show-" + commentSection);	// lower show/hide link
	var hideLink = document.getElementById("hide-" + commentSection);	// upper show/hide link
	switch(commentStyle.display) {
		case "block": // hide comments
			//if(callingLink.id.search(/show-/) != -1) location.hash = "head-" + commentSection; // if this is the primary link, jump
			if(callingLink.id.search(/show-/) != -1) location.hash = createSafeTitle(document.getElementById("post-" + commentSection + "-episodeTitle").firstChild.nodeValue).toLowerCase();
			commentStyle.display = "none";
			if(!SAFARI) document.getElementById("post-" + commentSection + "-commentBoard").wrappedJSObject.fade('hide'); // have to fade even if it's already gone, for fade in to work
			showLink.firstChild.textContent = "Show comments \u2193"; // reset link texts
			hideLink.firstChild.textContent = "Show comments \u2193";
			corner.style.display = "block"; // turn on corner
			break;
		case "none": // show comments
			commentStyle.display = "block";
			if(!SAFARI) document.getElementById("post-" + commentSection + "-commentBoard").wrappedJSObject.fade('in'); // purrdifying that a little
			showLink.firstChild.textContent = "Hide comments \u2191";
			hideLink.firstChild.textContent = "Hide comments \u2191";
			corner.style.display = "none";
			break;
		default: alert("Could not determine comment status; this should not happen. Please inform Renegade you encountered this message, and where."); // I don't want to hear this, though
	}
	return false; // necessary so the window doesn't get refreshed
}

// This auto-refreshes the selected comment-board inline
function refreshComments(sectionID) {
	var IcanHazUrl = document.getElementById("post-" + sectionID + "-commentBoard").getElementsByClassName("follow")[0].parentNode.getAttribute("href");
	IcanHazUrl = IcanHazUrl.replace(/http:\/\/www\.lg15\.com\/bbsposts\/list\/27\/(\d\d?\d?)\/(\d\d?\d?\d?)\/\d\d?\d?/i, "http://www.lg15.com/bbsposts/list/27/$1/$2/999");
	var ImInUrCommentz = document.getElementById("post-" + sectionID + "-comments");
	var req = new XMLHttpRequest();  
	req.open('GET', IcanHazUrl, true);  
	if(!SAFARI) ImInUrCommentz.wrappedJSObject.fade('out');
	req.onreadystatechange = function (someEvent) {  
		// IF the ready state changed AND IF the new ready state is 4 ("COMPLETED") AND IF the server's response was 200 ("OK"), do stuff
		if (req.readyState == 4) {  
			if(req.status == 200)  {
				// Get the latest page, cut it down to only the comments list 
				var newComments = req.responseText;
				newComments = newComments.match(/<ul class=\"post-list\">[\s\S]*?<\/ul>\s*<div class=\"module-foot\">/mi)[0];
				newComments = newComments.slice(22,-33); // this cuts off the ul/div declarations
				
				// Check how many items are in the new comments list...
				var newCommentNumber = newComments.match(/<li>/gi).length;
				// ...and act accordingly (we're doing this with innerHTML because requestXML was undefined - I blame EQAL's fucked up meta tags)
				// If we got exactly 10 comments, no need to process them - just replace the old ones
				if(newCommentNumber == 10) ImInUrCommentz.innerHTML = newComments
				else if(newCommentNumber > 10) {
					// If there are more than 10, add them to the old ones, run backwards through them,
					// count to 10, and kill everything that comes after 10.
					// (No need to check for doubles, because only comments from the new list will be left.)
					ImInUrCommentz.innerHTML = ImInUrCommentz.innerHTML.concat(newComments);
					var nodeCounter = 0;
					for(var i = ImInUrCommentz.childNodes.length - 1; i > 0; i--) {
						if(nodeCounter >= 10) ImInUrCommentz.removeChild(ImInUrCommentz.childNodes[i]);
						if((nodeCounter < 10) && (ImInUrCommentz.childNodes[i].nodeType == 1) && (ImInUrCommentz.childNodes[i].tagName == "LI")) nodeCounter++;
					}
				} else {
					// If there are less then new 10 comments, we actually have to work x_x
					// This time, we save the number of each comment we traverse - since, going backwards, the number of the next
					// comment should always be one lower than the previous number, we kill everything with an equal or higher number,
					// and THEN kill everything more than 10 comments.
					ImInUrCommentz.innerHTML = ImInUrCommentz.innerHTML.concat(newComments);
					var nodeCounter = 0;
					var currentCommentNumber = 10001;
					var previousCommentNumber = 10000; // this will break if comments ever exceed 10000 in a thread.
					var deletedComment = false; // we need this so deleted comments aren't used for comparison
					for(var i = ImInUrCommentz.childNodes.length - 1; i > 0; i--) {
						deletedComment = false;
						// If it's not a text node AND if it's a list item, get a new current number
						if((ImInUrCommentz.childNodes[i].nodeType == 1) && (ImInUrCommentz.childNodes[i].tagName == "LI")) currentCommentNumber = ImInUrCommentz.childNodes[i].getElementsByClassName("meta-num")[0].firstChild.textContent;
						// if it's either more than we need, or an unwanted comment, kill it (kills worthless text nodes as a side effect)
						if((nodeCounter >= 10) || (currentCommentNumber >= previousCommentNumber)) {
							ImInUrCommentz.removeChild(ImInUrCommentz.childNodes[i]); 
							deletedComment = true;
						}
						// If it's list item that we want, increase the nodeCounter
						if(!deletedComment && (nodeCounter < 10) && (ImInUrCommentz.childNodes[i].nodeType == 1) && (ImInUrCommentz.childNodes[i].tagName == "LI")) nodeCounter++;
						// If this node wasn't deleted, make it the new previous
						if(!deletedComment) previousCommentNumber = currentCommentNumber;
					}
				}
				// New v16 way of parsing the updated posts:
				var sectionPosts = ImInUrCommentz.childNodes;
				for(var j = 0; j < sectionPosts.length; ++j) {
					if(sectionPosts[j].tagName == "LI") applyModsToPost(sectionPosts[j]);
				}
				// ...rewrite the last seen timers...
				var tempEvent = document.createEvent("UIEvents");
				tempEvent.initUIEvent("page_inline_refresh", false, false, window, 1);
				document.dispatchEvent(tempEvent);
				
				// And after all that work, show off the shiny new comments list
				if(!SAFARI) ImInUrCommentz.wrappedJSObject.fade('in');
				return true;
			} else return false; // If we're done, but the server flipped us off...well, damn.
		}  
	};  
	req.setRequestHeader("X-TheLastScript", "v" + scriptVersion);
	req.send(null);  
}
// This function kills the old school DB inject and replaces it with shiny AJAX-ness
function customAjaxSubmit(submitEvent) {
	submitEvent.preventDefault(); // kills the original submit
	var postForm = submitEvent.target; // the form that sent this
	
	// Gathering data - we're sending the urlencoded values of IDs posttext, form_name, entity_object_id and savechanges, just like EQAL
	var postData = "posttext=" + encodeURI(postForm.elements[2].value) + "&form_name=" + encodeURI(postForm.elements[3].value) + "&entity_object_id=" + encodeURI(postForm.elements[4].value) + "&savechanges=" + encodeURI(postForm.elements[5].value);
	
	// POSTing data
	var sndCmntReq = new XMLHttpRequest();  
	sndCmntReq.open('POST', postForm.action, true);
	sndCmntReq.onreadystatechange = function (someEvent) {  
		if (sndCmntReq.readyState == 4) {  
			if(sndCmntReq.status == 200)  {
				// If all went well, clean up and show
				postForm.reset();
				refreshComments(getPostId(postForm.parentNode));
				return true;
			} else {
				alert("Warning! Could not post! Server returned code " + sndCmntReq.status);
				return false;
			}
		}  
	};
	sndCmntReq.setRequestHeader("Content-Type", postForm.enctype);
	//sndCmntReq.setRequestHeader("Content-Length", postData.length); // this is generated automagically by send()
	sndCmntReq.setRequestHeader("X-TheLastScript", "v" + scriptVersion);
	sndCmntReq.setRequestHeader("Connection", "close");
	sndCmntReq.send(postData);
	
	// New in v16: Since the user just posted, update their activity time
	writeOptionsToProfile();
}

function stripTheLast(stringTanga) { // wouldn't it be nice if that worked IRL?
	var redundancyIndex = -1;
	var episodeName = stringTanga;
	redundancyIndex = episodeName.search(/ ?\((lg15:)?.(the)?.last\)/i);
	if(redundancyIndex != -1) {
		episodeName = episodeName.slice(0, redundancyIndex)
	} else if(episodeName.search(/quietus/i) != -1) {
		// New in v18: Handling for Quietus naming scheme >>LG15: The Last - Quietus - "Episodename"<<
		episodeName = /"(.*)"/i.exec(episodeName)[1];
	}
	return episodeName;
}

// gets the latest post(s) from the specified account ID
function getTwitterPosts(accountId, postNum) {
	if((twitterRateLimitLeft < 1) || twitter400Encountered) return false;
	
	if(typeof postNum == 'undefined') postNum = 1;
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://twitter.com/statuses/user_timeline.xml?user_id=" + accountId + "&count=" + postNum,
		headers: {
			"User-Agent": "The Last Link Fix v" + scriptVersion,
			"Accept": "text/xml"
		},
		onload: function(response) {
			// This is so we don't get in trouble with Twitter (related to the API rate limit)
			twitterRateLimitLeft = parseInt(/X-RateLimit-Remaining: (\d+)/.exec(response.responseHeaders)[1]);
			twitter400Encountered = (response.status == 400);
			if(response.status >= 400) {
				if(DEBUG) console.error("Twitter request for account #%i resulted in HTTP code %i. Response text:\n%s", accountId, response.status, response.responseText);
				GM_log("Twitter request for account #" + accountId + " resulted in HTTP code " + response.status + ". Response text:\nresponse.responseText");
				return false;
			}
			//if(DEBUG) console.info("Twitter headers: %s, response status: %i, 400 encountered: %s, limit left: %i.", response.responseHeaders, response.status, twitter400Encountered, twitterRateLimitLeft);
			
			// Inject responseXML into existing Object if not present
			if (!response.responseXML) response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			// do stuff here
			handleTwitterPosts(accountId, response.responseXML);
			// let's tell the page we're done.
			var tempEvent = document.createEvent("UIEvents");
			tempEvent.initUIEvent("new_twitter_posts", false, false, window, 1);
			document.dispatchEvent(tempEvent);
		}
	});
}

// Turns the Twitter response XML into HTML strings saved in twitterPosts under their post ID
function handleTwitterPosts(accountId, twitterXML) {
	var realPosts = twitterXML.getElementsByTagName("status");
	for(var i = 0; i < realPosts.length; ++i) {
		var postID = realPosts[i].getElementsByTagName("id")[0].firstChild.nodeValue;
		if(typeof twitterPosts[postID] != 'undefined') continue; // if an attribute like that is already defined, we already handled that post.
		var postCreatedAt = new Date(realPosts[i].getElementsByTagName("created_at")[0].firstChild.nodeValue);
		var postCreator = realPosts[i].getElementsByTagName("name")[0].firstChild.nodeValue;
		var postScreenName = realPosts[i].getElementsByTagName("screen_name")[0].firstChild.nodeValue;
		var postText = realPosts[i].getElementsByTagName("text")[0].firstChild.nodeValue;
		
		var finalHTML ="<div class=\"twittershadow\"><div class=\"twitterpost\" id=\"" + postID + "\">\
		<div class=\"twitteruser\"><a href=\"http://twitter.com/" + postScreenName + "\">" + postCreator + "</a></div>\
		<div class=\"twittermessage\">" + postText + "</div>\
		<div class=\"twitterfoot\"><span class=\"twitterdate\">" + postCreatedAt.toLocaleDateString() + " " + postCreatedAt.toLocaleTimeString() + " - " + "</span><a href=\"http://twitter.com/" + postScreenName + "/status/" + postID + "\">Link</a></div>\
		</div></div>";
		
		// Every Twitter post is accessible by post ID and has two values:
		// [0] is the time it was created at, in JavaScript UNIX milliepoch
		// [1] is the entire html to display the complete post
		twitterPosts[postID] = finalHTML; //new Array(postCreatedAt.getTime(), finalHTML);
		twitterPostIDs.push(postID);
		if(DEBUG) console.count("Handled Twitter Posts");
	}
}

// Updates the actual on-page twitter Div with posts
// is called by event new_twitter_posts
function updateTwitterDiv(event) {
	//if(DEBUG) console.debug("updateTwitterDiv executed.");
	var twitterDiv = document.getElementById("twittercontainer");
	twitterDiv.innerHTML = "<p>Updating posts, please wait.</p>";
	twitterPostIDs.sort(numericalSort);
	twitterPostIDs.reverse();
	var allTwitterPosts = new String("");
	for(var i = 0; i < twitterPostIDs.length; ++i) {
		//if(DEBUG) console.debug("Index %i has value %i for twitterPost %s", i, twitterPostIDs[i], twitterPosts[twitterPostIDs[i]]);
		allTwitterPosts += twitterPosts[twitterPostIDs[i]];
	}
	twitterDiv.innerHTML = allTwitterPosts;
	document.getElementById("twitterF5count").firstChild.nodeValue = Math.floor(twitterRateLimitLeft/6).toString();
	GM_setValue("recentTwitterPosts", allTwitterPosts);
}

function numericalSort(a, b) {
	return a - b;
}

function updateAllTwitters() { 
	var baseTime = -5000;
	var increment = 5000;
	for(var i in twitterAccounts) {
		baseTime += increment;
		if(DEBUG) console.debug("Twitter ID is %i, baseTime is %i.", twitterAccounts[i], baseTime);
		setTimeout(getTwitterPosts, baseTime, twitterAccounts[i], 2);
	}
}

// gets the video responses for a given YouTube video ID and adds them to the page
function getVideoResponses(videoId, sectionId) {
	GM_xmlhttpRequest({
		method: "GET",
		url:" http://gdata.youtube.com/feeds/api/videos/" + videoId + "/responses?max-results=5",
		headers: {
		"User-Agent": "The Last Link Fix v" + scriptVersion,
		"Accept": "text/xml"
		},
		onload: function(response) {
			if(response.status >= 400) return false;
			
			// Touch sessionStorage so it knows we handled this one
			sessionStorage.setItem("video." + videoId, "true");
			
			// Inject responseXML into existing Object if not present
			if (!response.responseXML) response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
			var noResps = parseInt(response.responseXML.getElementsByTagName("openSearch:totalResults")[0].firstChild.nodeValue);
			
			// Save number of response videos available
			sessionStorage.setItem("video." + videoId + ".num", noResps);
			if(DEBUG) console.info("Video with ID %s has %i response videos.", videoId, noResps);
			
			// If there are responses, save their data
			if(noResps > 0) {
				var entryList = response.responseXML.getElementsByTagName("entry");
				for(var i = 0; i < entryList.length; ++i) {
					sessionStorage.setItem("video." + videoId + "." + i + ".title", entryList[i].getElementsByTagName("title")[0].firstChild.nodeValue);
					sessionStorage.setItem("video." + videoId + "." + i + ".user", entryList[i].getElementsByTagName("name")[0].firstChild.nodeValue);
					// They're usually ordered in 1/4, 2/4, 3/4 small, then 2/4 large. Should 2/4 large end up at 0 once, the users are in for a surprise
					sessionStorage.setItem("video." + videoId + "." + i + ".thumb", entryList[i].getElementsByTagName("media:thumbnail")[0].getAttribute("url"));
					sessionStorage.setItem("video." + videoId + "." + i + ".link", entryList[i].getElementsByTagName("media:player")[0].getAttribute("url"));
				}
				showVideoResponses(videoId, sectionId);
			}
		}
	});
}

function showVideoResponses(videoId, sectionId) {
	if(sessionStorage.getItem("video." + videoId) !== null) {
		var noResps = parseInt(sessionStorage.getItem("video." + videoId + ".num"));
		if(DEBUG) console.info("Video with ID %s has %i response videos stored locally.", videoId, noResps);
		
		// If there are responses to this video, display them
		if(noResps > 0) {
			// Get sidebar and create a wrapper, a headline and an empty list to be filled
			var sidebar = document.getElementById("upper-" + sectionId + "-sidebar");
			var wrapper = document.createElement("div");
			wrapper.id = "videoResponses-" + sectionId;
			wrapper.setAttribute("class","vidRespsWrapper");
			var headline = document.createElement("h1");
			headline.setAttribute("class","vidRespsHead");
			headline.appendChild(document.createTextNode("Video Responses"));
			var videoList = document.createElement("ul");
			videoList.setAttribute("class","vidRespsList");
			
			// Handle each individual video
			for(var i = 0; i < noResps; ++i) {
				var videoListItem = document.createElement("li");
				
				// get data from storage
				var videoTitle = sessionStorage.getItem("video." + videoId + "." + i + ".title");
				var videoUser = sessionStorage.getItem("video." + videoId + "." + i + ".user");
				var videoThumbnail = sessionStorage.getItem("video." + videoId + "." + i + ".thumb");
				var videoLinkUrl = sessionStorage.getItem("video." + videoId + "." + i + ".link");
				
				// Dumbasses of YouTube happily provide an empty list telling us there was one result
				if((videoTitle === null) || (videoUser === null) || (videoThumbnail === null) || (videoLinkUrl === null)) {
					videoListItem.appendChild(document.createTextNode("This should be a video reply box, but YouTube failed to provide the necessary data."));
					videoList.appendChild(videoListItem);
					continue;
				}
				
				// create elements from that
				var videoAnchorElement = createAnchor(videoLinkUrl, videoTitle, "", "responseVideo");
				var videoThumbImgElem = document.createElement("img");
				videoThumbImgElem.alt = videoTitle + " by " + videoUser;
				videoThumbImgElem.title = videoTitle + " by " + videoUser;
				videoThumbImgElem.src = videoThumbnail;
				videoAnchorElement.insertBefore(document.createElement("br"), videoAnchorElement.firstChild);
				videoAnchorElement.insertBefore(videoThumbImgElem, videoAnchorElement.firstChild);
				videoListItem.appendChild(videoAnchorElement);
				videoListItem.appendChild(document.createTextNode("by " + videoUser));
				videoList.appendChild(videoListItem);
			}
			
			// Put all elements in the wrapper div
			wrapper.appendChild(headline);
			wrapper.appendChild(videoList);
			wrapper.appendChild(createAnchor("http://www.youtube.com/video_response_view_all?v=" + videoId, "See all " + noResps + " video responses", "allVidResps-" + sectionId, "vidRespsLink"));
			
			// Whatever garbage was in there before, we don't need it
			sidebar.innerHTML = "";
			
			// Add everything to the page
			sidebar.appendChild(wrapper);
		}
		
	} else {
		getVideoResponses(videoId, sectionId);
	}
}

// This fixes the show link to go directly to the The Last section
if(theLast && (document.getElementById("menu-show") != null) && !forumPage) {
	document.getElementById("menu-show").getElementsByTagName("a")[0].setAttribute("href","http://www.lg15.com/thelast");
}

// This fixes the discussion link to go directly to the The Last section
if(theLast && (document.getElementById("menu-discus") != null)) {
	document.getElementById("menu-discus").getElementsByTagName("a")[0].setAttribute("href","http://www.lg15.com/categories/list/27/1");
}

// This fixes the forum section title to be a little more specific
if(theLastForumPage) {
	var trueTitle = new String();
	// this is ugly, but it's their fault.
	var trueHeader = document.getElementsByClassName("module-head")[0].getElementsByTagName("h3")[0].firstChild.nodeValue;
	trueTitle = trueTitle.concat("LG15: The Last Forums - ",trueHeader);
	document.title = trueTitle;
}

// This fixes the favicon, should it not exist. 
if(theLast) {
	if(DEBUG) {
		console.group("Just The Last");
		console.time("Just The Last");
	}
	tempNode = HEAD.getElementsByTagName("link");
	var iconExists = false;
	for(var i = 0; i < tempNode.length; ++i) {
		if(tempNode[i].getAttribute("rel") == "icon") iconExists = true;
	}
	if(!iconExists) {
		tempNode = HEAD;
		var tempLink = document.createElement("link");
		tempLink.setAttribute("rel","shortcut icon");
		tempLink.setAttribute("type","image/png");
		tempLink.setAttribute("href",FAVICON_LAST);
		tempNode.appendChild(tempLink);
	}
	
	// This section adds the new phpBB forum link
	if(betaTest) { // temporarily hidden
	tempNode = document.getElementById("global").getElementsByTagName("ul")[0];
	
	// create link
	var tempLink = document.createElement("a");
	tempLink.setAttribute("href","/thelast/forum");
	var tempNodeI = document.createElement("span");
	tempNodeI.appendChild(document.createTextNode("phpBB Forum"));
	tempLink.appendChild(tempNodeI);
	
	// create list item
	tempNodeI = document.createElement("li");
	tempNodeI.id = "global-phpbb";
	tempNodeI.appendChild(tempLink);
	
	// add list item to list
	tempNode.insertBefore(tempNodeI, document.getElementById("global-bts"));
	
	} // end beta-section
	
	if(DEBUG) {
		console.timeEnd("Just The Last");
		console.groupEnd();
	}
}

if(communityPage || forumPage || profilePage || searchPage || boardPage) {
	if(DEBUG) {
		console.group("Link-adjustments for non-episode pages");
		console.time("Link-adjustments for non-episode pages");
	}
	// Modifying show links
	tempNode = document.getElementById("menu-show");
	tempNode.getElementsByTagName("span")[0].firstChild.nodeValue = "The Resistance";
	tempNode.getElementsByTagName("a")[0].setAttribute("class","scriptTheResistanceLink");
	var tempLink = document.createElement("a");
	tempLink.setAttribute("href","/thelast");
	tempLink.setAttribute("class","scriptTheLastLink");
	tempLink.appendChild(document.createTextNode("The Last"));
	tempNode.appendChild(tempLink);
	// removing useless link, thus restoring order (not Order)
	if(communityPage) {
		tempNode = document.getElementById("menu-community");
		document.getElementById("menu-discus").getElementsByTagName("a")[0].setAttribute("href","http://www.lg15.com/category/view/1/21/1");
	}
	if(forumPage) {
		tempNode = document.getElementById("menu-discus");
	}
	if(profilePage || searchPage || boardPage) {
		tempNode = document.getElementById("menu-dash");
	}
	tempNode.parentNode.removeChild(tempNode); //this one deletes the show link if we don't re-set tempNode before it (guess how I found that out)
	
	if(DEBUG) {
		console.timeEnd("Link-adjustments for non-episode pages");
		console.groupEnd();
	}
}

if(forumPage && !theLastForumPage) {
	// setting title
	document.title = document.getElementsByClassName("module-head")[0].getElementsByTagName("h3")[0].firstChild.nodeValue;
}

// New in v16 - optimized post processing
// This function takes a reference to the <li> element which encloses a post inside a ul.post-list
function applyModsToPost(post) {
	if(DEBUG) console.count("Posts being modified");
	try {
		if(profilePage) {
			var postAuthorBlock = post.getElementsByClassName("user")[0];
			var postContent = post.getElementsByTagName("p")[0];
			var postUserID = getUserIDfromProfileLink(postAuthorBlock.firstChild);
			//post.lastChild.style.clear = "both";
			var lastP = post.getElementsByTagName("p");
			lastP = lastP[lastP.length - 1];
			lastP.style.clear = "both"; // fuck the DOM
		} else {
			var postAuthorBlock = post.getElementsByClassName("author")[0];
			var postContent = post.getElementsByClassName("ugc-wrapper")[0];
			var postUserID = getUserIDfromProfileLink(postAuthorBlock.getElementsByClassName("user")[1]);
		}
		
		// Add posting User ID as class
		post.setAttribute("class", "c" + postUserID);
		
		// send user ID to global "users on this page" "array"
		usersOnThisPage[postUserID] = true;
		
		// Add "last seen" row to author column
		var tempCounter = document.createElement("span");
		tempCounter.setAttribute("class","lastSeenTime");
		tempCounter.appendChild(document.createTextNode("Unknown"));
		
		if(!profilePage) {
			var tempP = document.createElement("p");
			tempP.setAttribute("class","lastSeenDisplay");
			tempP.appendChild(document.createTextNode("Last seen:"));
			tempP.appendChild(document.createElement("br"));
			tempP.appendChild(tempCounter);
			tempP.appendChild(document.createTextNode(" ago"));
			tempP.style.display = "none"; // Will be set visible for those who have a time saved
			postAuthorBlock.appendChild(tempP);
		} else {
			var tempSpan = document.createElement("span");
			var tempP = post.getElementsByClassName("admin")[0];
			tempSpan.appendChild(document.createTextNode("Last seen: "));
			tempSpan.appendChild(tempCounter);
			tempSpan.appendChild(document.createTextNode(" ago"));
			tempSpan.style.display = "none"; // Will be set visible for those who have a time saved
			tempP.appendChild(tempSpan);
		}
		
		// Replace BBCode/Smileys
		replaceBBCode(postContent);
		
		// Check if images in this post have to be resized
		var tempImages = postContent.getElementsByTagName("img");
		for(var i = 0; i < tempImages.length; ++i) {
			if(tempImages[i].src.search(/data:image/) != -1) {
				if(DEBUG) console.count("Aborted images");
				continue; // no need to process our own smileys
			}
			if(tempImages[i].complete) { // ATTENTION: Make sure this block stays in sync with the one in determineWidthHandling
				//if(DEBUG) console.debug("Complete image handled, width: ", tempImages[i].width);
				var tempMaxWidth = 800; // failsafe value
				if(episodePage) tempMaxWidth = 400;
				if(forumPage) tempMaxWidth = 790;
				if(profilePage) tempMaxWidth = 280;
				if(tempImages[i].width > tempMaxWidth) handleCommentImage(tempImages[i]);
			} else tempImages[i].addEventListener("load", determineWidthHandling, false);
		}
	}
	catch (exception) {
		if(DEBUG) console.error("Error: %s - %s", exception.name, exception.message);
	}
}

// New v16 version of this - now cycles through all posts on the page, applying mods to them
// This is as opposed to the previous version, where each modification individually would cycle through a section's posts
if(hasPosts) { //need this and not just forumPage 'cause the portals have comments
	if(DEBUG) {
		console.group("Pages that have posts");
		//console.time("Post processing");
	}
	
	// Need to catch when we're done for last seen handling
	if(loggedIn) {
		document.addEventListener("posts_processed", checkOnlineStatuses, false);
		document.addEventListener("user_last_seen_ready", updateOnlineStatuses, false);
		document.addEventListener("page_inline_refresh", updateKnownUsersLS, false);
	}
	
	if(DEBUG) console.time("Post processing");
	
	// Each tempNode[i] will be one ul.post-list
	tempNode = document.getElementsByClassName("post-list");
	for(var i = 0; i < tempNode.length; ++i) {
		// Each tempChildNodes[j] will be one LI representing a post 
		var tempChildNodes = tempNode[i].childNodes;
		for(var j = 0; j < tempChildNodes.length; ++j) {
			if(tempChildNodes[j].tagName == "LI") applyModsToPost(tempChildNodes[j]);
		}
	}
	tempNode = null;
	
	if(DEBUG) console.timeEnd("Post processing");
	
	// let's tell the page we're done.
	var tempEvent = document.createEvent("UIEvents");
	tempEvent.initUIEvent("posts_processed", false, false, window, 1);
	document.dispatchEvent(tempEvent);
	
	// update CURRENT_TIME each minute in the background (important for later inline post updates)
	var timeUpdateInterval = setInterval(updateCurrentTime, 60000);
	// update last seen data of all users on the page
	var userUpdateInterval = setInterval(updateAllUsersLS, 900000);
	
	
	if(DEBUG) {
		//console.timeEnd("Post processing");
		console.groupEnd();
	}
}

// This function queries a user profile and saves the found scriptvars in session storage (through appropriate helpers)
// Used in opt
function getUserOptions(userID) {
	// Logged out users cannot access profiles, leading to 2 requests per user (request + redirect) and no valuable data.
	if(!loggedIn) return;
	
	var regLastSeen = /\[scriptvars lastseen=(\d+)\]/;
	var queriedProfile = new XMLHttpRequest();  
	queriedProfile.open('GET', BASE_PROFILE_URL + userID, true);  
	queriedProfile.onreadystatechange = function (request) {  
		// IF the ready state changed AND IF the new ready state is 4 ("COMPLETED") AND IF the server's response was 200 ("OK"), do stuff
		if (queriedProfile.readyState == 4) {  
			if(queriedProfile.status == 200)  {
				if(regLastSeen.test(queriedProfile.responseText)) {
					setUserLastSeen(userID, regLastSeen.exec(queriedProfile.responseText)[1]);
					
					var tempEvent = document.createEvent("UIEvents");
					tempEvent.initUIEvent("user_last_seen_ready", false, false, window, userID);
					document.dispatchEvent(tempEvent);
					if(DEBUG) console.info("Got user options from profile for user %s.", userID);
				} else {
					setUserLastSeen(userID, "false");
					if(DEBUG) console.info("User %s does not have any options saved on his/her profile.", userID);
				}
				return true;
			} else return false; // If we're done, but the server flipped us off...well, damn.
		}  
	};  
	queriedProfile.setRequestHeader("X-TheLastScript", "v" + scriptVersion);
	//queriedProfile.overrideMimeType('text/xml');
	queriedProfile.send(null);
}

// Gets a given user's last seen time from session storage
// returns null if it doesn't exist
// used in opt
function getUserLastSeen(userID) {
	return sessionStorage.getItem(userID + ".lastseen");
}

// Sets a given user's last seen time in session storage
// used in opt
function setUserLastSeen(userID, timestamp) {
	sessionStorage.setItem(userID + ".lastseen", timestamp);
}

// This updates the global CURRENT_TIME
// used in opt
function updateCurrentTime() {
	delete garbageTime;
	garbageTime = new Date(); // what we need only for a split second
	CURRENT_TIME = Math.floor(garbageTime.getTime()/1000); // what we really want
}

// Gets called on event and re-fetches the times of those who had a time saved previously
function updateKnownUsersLS() {
	if(DEBUG) console.info("Updating Last Seen info of known script/last seen users.");
	
	for (var i in usersOnThisPage) {
		var tempULS = getUserLastSeen(i);
		if((tempULS !== null) && (tempULS != "false")) getUserOptions(i);
	}
}

// Gets called on interval and re-fetches the times of all encountered users
// We're doing this to account for people who activated or installed that function after the user arrived
function updateAllUsersLS() {
	if(DEBUG) console.info("Updating Last Seen info of everybody.");
	
	for (var i in usersOnThisPage) {
		getUserOptions(i);
	}
}

// Extracts and returns a user ID from an anchor DOM node which links to the user's profile
// used in opt
function getUserIDfromProfileLink(argNode) {
	return getUserIDfromURL(argNode.href);
}

// Extracts the user ID from a given URL
// (actually, it just returns the first 5-digit number, no matter what it is)
// used in opt
function getUserIDfromURL(argURL) {
	return /(\d{5,})/.exec(argURL)[1];
}

// New version which works with a global list of met users
// This is called by the posts_processed event after we're done processing the posts,
// thus ensuring that both ID-based classes as well as last seen displays exist
function checkOnlineStatuses() {
	if(DEBUG) {
		console.group("checkOnlineStatuses");
		console.time("checkOnlineStatuses");
		console.count("checkOnlineStatuses count");
	}
	
	for (var i in usersOnThisPage) {
		if(DEBUG) console.debug("Retrieving data for user %s.", i);
		var tempULS = getUserLastSeen(i);
		if(tempULS === null) getUserOptions(i);
		if((tempULS !== null) && (tempULS != "false")) {
			var tempEvent = document.createEvent("UIEvents");
			tempEvent.initUIEvent("user_last_seen_ready", false, false, window, i);
			document.dispatchEvent(tempEvent);
		}
	}
	
	if(DEBUG) {
		console.timeEnd("checkOnlineStatuses");
		console.groupEnd();
	}
}

function updateOnlineStatuses(event) {
	if(DEBUG) {
		console.group("updateOnlineStatuses");
		console.time("updateOnlineStatuses");
		console.count("updateOnlineStatuses count");
	}
	
	var tempUser = event.detail;
	var tempULS = getUserLastSeen(tempUser);
	
	if(tempUser == CURRENT_USER_ID) return; // no need to tell us ourselves when we were last active
	
	if(DEBUG) console.debug("Writing data for user %s, last seen at %s", tempUser, tempULS);
	
	tempULS = Math.floor((CURRENT_TIME - tempULS)/60); // last seen tempULS minutes ago
	if(tempULS > 60) { // if more than 60 minutes ago...
		tempULS /= 60; // ...tempULS hours ago
		tempULS = Math.floor(tempULS) + " hours";
	} else { // ^v convert to string and add appropriate suffix
		tempULS = tempULS + " minutes";
	}
	
	// find all posts by this user based on class name
	var userPosts = document.getElementsByClassName("c" + tempUser);
	// Add last seen time to display and show display
	for(var i = 0; i < userPosts.length; ++i) {
		var LSD = userPosts[i].getElementsByClassName("lastSeenTime")[0];
		LSD.firstChild.nodeValue = tempULS;
		if(!profilePage) {
			LSD.parentNode.style.display = "block";
		} else {
			LSD.parentNode.style.display = "inline";
		}
	}
	
	if(DEBUG) {
		console.timeEnd("updateOnlineStatuses");
		console.groupEnd();
	}
}

// Fix width of entry box on forum pages
if(forumPage) {
	if(document.getElementsByClassName("span-12").length > 0) document.getElementsByClassName("span-12")[0].setAttribute("class", "span-24");
	if(document.getElementsByTagName("input").length > 0) document.getElementsByTagName("input")[0].style.width = "75%";
	if(document.getElementsByTagName("textarea").length > 0) document.getElementsByTagName("textarea")[0].style.width = "75%";
	
	var smallUserUpdateInterval = setInterval(updateKnownUsersLS, 180000); // doing this since forum pages don't have inline refresh
}

// This adds the BBCode selector to portals and forum pages
if(forumPage || episodePage) {
	if(DEBUG) {
		console.group("Forum or Episode Page (Markup selector)");
		console.time("Forum or Episode Page (Markup selector)");
	}
	// Add markup selector
	tempNode = null;
	tempNodeI = null;
	tempNode = document.getElementsByTagName("textarea");
	tempNodeI = document.createElement("div");
	tempNodeI.setAttribute("class","markupBlock")
	//simplicity wins in this case
	tempNodeI.innerHTML = "<div class=\"markupButtons\">\
		<a id=\"bbcodeBold\">Bold</a>\
		<a id=\"bbcodeItalic\">Italic</a>\
		<a id=\"bbcodeStruck\">Struck</a>\
		<a id=\"bbcodeURL\">Link</a>\
		<a id=\"bbcodeIMG\">Image</a>\
		<a id=\"bbcodeQuote\">Quote</a>\
		</div><table>\
		<tbody>\
			<tr>\
				<td><a><img alt=\":)\" src=\"" + smileys[":)"] + "\"></a></td>\
				<td><a><img alt=\";)\" src=\"" + smileys[";)"] + "\"></a></td>\
				<td><a><img alt=\":(\" src=\"" + smileys[":("] + "\"></a></td>\
				<td><a><img alt=\":'(\" src=\"" + smileys[":'("] + "\"></a></td>\
			</tr>\
			<tr>\
				<td><a><img alt=\":D\" src=\"" + smileys[":D"] + "\"></a></td>\
				<td><a><img alt=\":P\" src=\"" + smileys[":P"] + "\"></a></td>\
				<td><a><img alt=\"o_o\" src=\"" + smileys["o_o"] + "\"></a></td>\
				<td><a><img alt=\":=\" src=\"" + smileys[":="] + "\"></a></td>\
			</tr>\
			<tr>\
				<td><a><img alt=\":grr:\" src=\"" + smileys[">:("] + "\"></a></td>\
				<td><a><img alt=\":rolleyes:\" src=\"" + smileys[":rolleyes:"] + "\"></a></td>\
				<td><a><img alt=\":doh:\" src=\"" + smileys[">_<"] + "\"></a></td>\
				<td><a><img alt=\":blush:\" src=\"" + smileys[":blush:"] + "\"></a></td>\
			</tr>\
			<tr>\
				<td><a><img alt=\"^^\" src=\"" + smileys["^^"] + "\"></a></td>\
				<td><a><img alt=\":/\" src=\"" + smileys[":/"] + "\"></a></td>\
				<td><a><img alt=\"o_O\" src=\"" + smileys["o_O"] + "\"></a></td>\
				<td><a><img alt=\"x_x\" src=\"" + smileys["x_x"] + "\"></a></td>\
			</tr>\
			<tr>\
				<td><a><img alt=\"xD\" src=\"" + smileys["xD"] + "\"></a></td>\
				<td><a><img alt=\":ninja:\" src=\"" + smileys[":ninja:"] + "\"></a></td>\
				<td><a><img alt=\":zombie:\" src=\"" + smileys[":zombie:"] + "\"></a></td>\
				<td><a><img alt=\"B)\" src=\"" + smileys["B)"] + "\"></a></td>\
			</tr>\
			<tr>\
				<td><a><img alt=\":heart:\" src=\"" + smileys["<3"] + "\"></a></td>\
				<td><a><img alt=\":*\" src=\"" + smileys[":*"] + "\"></a></td>\
				<td><a><img alt=\":O\" src=\"" + smileys[":O"] + "\"></a></td>\
				<td></td>\
			</tr>\
			</tbody>\
		</table>\
		<div class=\"markupDropDowns\"><p><strong>Size:&nbsp;</strong><select id=\"bbcodeSize\">\
			<option value=\"xx-small\">Smallest</option>\
			<option value=\"x-small\">Smaller</option>\
			<option value=\"small\">Small</option>\
			<option value=\"medium\">Normal</option>\
			<option value=\"large\">Large</option>\
			<option value=\"x-large\">Larger</option>\
			<option value=\"xx-large\">Largest</option>\
		</select></p>\
		<p><a href=\"http://en.wikipedia.org/wiki/Web_colors#X11_color_names\" target=\"_blank\" title=\"Click here for a list of more color names you can manually use.\">Color:</a>&nbsp;<select id=\"bbcodeColor\">\
			<option value=\"aqua\">Aqua</option>\
			<option value=\"gray\">Gray</option>\
			<option value=\"navy\">Navy</option>\
			<option value=\"silver\">Silver</option>\
			<option value=\"black\">Black</option>\
			<option value=\"green\">Green</option>\
			<option value=\"olive\">Olive</option>\
			<option value=\"teal\">Teal</option>\
			<option value=\"blue\">Blue</option>\
			<option value=\"lime\">Lime</option>\
			<option value=\"purple\">Purple</option>\
			<option value=\"white\">White</option>\
			<option value=\"fuchsia\">Fuchsia</option>\
			<option value=\"maroon\">Maroon</option>\
			<option value=\"red\">Red</option>\
			<option value=\"yellow\">Yellow</option>\
		</select></p></div>";
	for(var i = 0; i < tempNode.length; ++i) {
		tempLink = tempNode[i].parentNode.insertBefore(tempNodeI.cloneNode(true), tempNode[i]);
		if(episodePage) tempLink.id = "post-" + getPostId(tempLink.parentNode.parentNode.parentNode) + "-smileys";
		//var tempAnchors = tempLink.lastChild.getElementsByTagName("a");
		var tempAnchors = tempLink.getElementsByTagName("table")[0].getElementsByTagName("a");
		for(var j = 0; j < tempAnchors.length; ++j) {
			tempAnchors[j].addEventListener("click", enterSmiley, false); // function() {refreshComments(getPostId(this));}, false);
		}
		tempAnchors = tempLink.firstChild.getElementsByTagName("a");
		for(var j = 0; j < tempAnchors.length; ++j) {
			tempAnchors[j].addEventListener("click", enterBBcode, false); // function() {refreshComments(getPostId(this));}, false);
		}
		tempAnchors = tempLink.getElementsByTagName("select");
		for(var j = 0; j < tempAnchors.length; ++j) {
			tempAnchors[j].addEventListener("change", enterBBcode, false); 
			tempAnchors[j].selectedIndex = 3;
		}
	}
	if(DEBUG) {
		console.timeEnd("Forum or Episode Page (Markup selector)");
		console.groupEnd();
	}
}

// New v16 post-based version of this.
// postContentDiv should be a div.ugc-wrapper
function replaceBBCode(postContentDiv) {
	// This is fugly and I hope no one sees it...but it'll do for now.
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/(?:alt=")?(:\)|;\)|:\(|:'\(|:D|:P|:p|o_o|:=|>:\(|:grr:|:rolleyes:|>_<|:doh:|:blush:|\^\^|:\/(?!\/)|o_O|X_X|x_x|XD|xD|:ninja:|:zombie:|B\)|<3|:heart:|:\*|:o|:O)/g,replaceSmiley); // matching alt=" prevents double-parsing b/c alt=":) is not a case
	if(postContentDiv.innerHTML.search(/[\[\]]/) == -1) {
		if(DEBUG) console.count("Aborted BBCode"); // no need to run a dozen RegExps if there is no BBCode anyway
		return;
	}
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[b\]/gi,"<span style=\"font-weight: bold;\">");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[\/b\]/gi,"</span>");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[i\]/gi,"<span style=\"font-style: italic;\">");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[\/i\]/gi,"</span>");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[s\]/gi,"<span style=\"text-decoration: line-through;\">");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[\/s\]/gi,"</span>");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[size=[" ]?[" ]?(xx-small|x-small|small|medium|large|x-large|xx-large)[" ]?[" ]?\]/gi,"<span style=\"font-size: $1;\">");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[\/size\]/gi,"</span>");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[color=[" ]?[" ]?(#?\w*?)[" ]?[" ]?\]/gi,"<span style=\"color: $1;\">");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[\/color\]/gi,"</span>");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[url=[" ]?[" ]?(.*?)[" ]?[" ]?\](.*?)\[\/url\]/gi,"<a href=\"$1\" class=\"parserLinks\">$2</a>");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[img=[" ]?[" ]?(.*?)[" ]?[" ]?\]/gi,"<img src=\"$1\">");
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[quote=[" ]?[" ]?(.*?)[" ]?[" ]?\]([\s\S]*?)\[\/quote\]/gi,"<blockquote class=\"linkFixQuote\"><address>$1 said:</address>$2</blockquote>");
	
	postContentDiv.innerHTML = postContentDiv.innerHTML.replace(/\[list(?:="?[a1]"?)?\][\s\S]*?\[\/list\]/gim,replaceList);
}

// This is attached to the load event of an image
// used in opt
function determineWidthHandling(event) {
	// if(DEBUG) console.debug("WidthHandler called on ",event.target.tagName, " with a width of ", event.target.width);
	var tempMaxWidth = 800; // failsafe value
	if(episodePage) tempMaxWidth = 400;
	if(forumPage) tempMaxWidth = 790;
	if(event.target.width > tempMaxWidth) handleCommentImage(event.target);
}

// If the image is too big, this sizes it down initially and attaches the click handler
// used in opt
function handleCommentImage(image) {
	// if(DEBUG) console.debug("Handling image of width: ",image.width);
	image.setAttribute("width","100%"); // can't read out ugc-wrapper width in standards-conform way
	image.title = "This image has been resized to fit the comments; click on it to enlarge it.";
	// This ensures correct positioning
	if(image.parentNode.getAttribute("class") == null) image.parentNode.setAttribute("class", "largeImageContainer")
	else image.parentNode.setAttribute("class", image.parentNode.getAttribute("class") + " largeImageContainer");
	image.addEventListener("click", resizeImageHandler, false);
}

// This handles up- and downsizing on click
// (Works on the power of evil hacks, too.)
// used in opt
function resizeImageHandler(event) {
	if(event.target.hasAttribute("width")) {
		event.target.removeAttribute("width");
		event.target.style.top = event.clientY;
		event.target.setAttribute("class","enlarged");
	} else {
		event.target.setAttribute("width","100%");
		event.target.removeAttribute("class");
	}
}


function replaceSmiley(foundAscii) {
	//switch(foundAscii.toLowerCase()) {
	switch(foundAscii) {
		case ":)": return "<img alt=\":)\" src=\"" + smileys[":)"] + "\">";
			break;
		case ";)": return "<img alt=\";)\" src=\"" + smileys[";)"] + "\">";
			break;
		case ":(": return "<img alt=\":(\" src=\"" + smileys[":("] + "\">";
			break;
		case ":'(": return "<img alt=\":'(\" src=\"" + smileys[":'("] + "\">";
			break;
		case ":D": return "<img alt=\":D\" src=\"" + smileys[":D"] + "\">";
			break;
		case ":P":
		case ":p": return "<img alt=\":P\" src=\"" + smileys[":P"] + "\">";
			break;
		case "o_o": return "<img alt=\"o_o\" src=\"" + smileys["o_o"] + "\">";
			break;
		case ":=": return "<img alt=\":=\" src=\"" + smileys[":="] + "\">";
			break;
		case ":grr:":
		case ">:(": return "<img alt=\":grr:\" src=\"" + smileys[">:("] + "\">";
			break;
		case ":rolleyes:": return "<img alt=\":rolleyes:\" src=\"" + smileys[":rolleyes:"] + "\">";
			break;
		case ":doh:": //fuck you, EQAL
		case ">_<": return "<img alt=\":doh:\" src=\"" + smileys[">_<"] + "\">";
			break;
		case ":blush:": return "<img alt=\":blush:\" src=\"" + smileys[":blush:"] + "\">";
			break;
		case "^^": return "<img alt=\"^^\" src=\"" + smileys["^^"] + "\">";
			break;
		case ":/": return "<img alt=\":/\" src=\"" + smileys[":/"] + "\">";
			break;
		case "o_O": return "<img alt=\"o_O\" src=\"" + smileys["o_O"] + "\">";
			break;
		case "X_X":
		case "x_x": return "<img alt=\"x_x\" src=\"" + smileys["x_x"] + "\">";
			break;
		case "XD":
		case "xD": return "<img alt=\"xD\" src=\"" + smileys["xD"] + "\">";
			break;
		case ":ninja:": return "<img alt=\":ninja:\" src=\"" + smileys[":ninja:"] + "\">";
			break;
		case ":zombie:": return "<img alt=\":zombie:\" src=\"" + smileys[":zombie:"] + "\">";
			break;
		case "B)": return "<img alt=\"B)\" src=\"" + smileys["B)"] + "\">";
			break;
		case ":heart:":
		case "<3": return "<img alt=\":heart:\" src=\"" + smileys["<3"] + "\">";
			break;
		case ":*": return "<img alt=\":*\" src=\"" + smileys[":*"] + "\">";
			break;
		case ":O":
		case ":o": return "<img alt=\":O\" src=\"" + smileys[":O"] + "\">";
			break;
		default: return foundAscii; // :X :S xP
	}
}


function replaceList(foundList) {
	var listContent = foundList.replace(/\[list(?:=[a1])?\]([\s\S]*?)\[\/list\]/gim, "$1");
	listContent = listContent.replace(/<br>/gi,"");
	listContent = listContent.split('[*]').join('</li><li style="display: list-item !important; border: none !important; margin: 0px !important; padding: 0px !important;">'); // D's idea. Thanks! // Fuck you, EQAL designers
	listContent = listContent.substr(6) + "</li>";
	var listOrder = foundList.match(/\[list=([a1])\]/i);
	var list = "";
	if(listOrder) {
		var styledListOrder
		switch(listOrder[1]) { // if there was a smiley to give people the finger...EQAL would get it. Vigorously.
			case "a": styledListOrder = "lower-alpha";
				break;
			case "A": styledListOrder = "upper-alpha";
				break;
			case "1": styledListOrder = "decimal";
				break;
			case "I": styledListOrder = "upper-roman";
				break;
			default: styledListOrder = "wtf";
				break;
		}
		list = "<ol type=\"" + listOrder[1] + "\" style=\"list-style-type: " + styledListOrder + " !important; margin-left: 3em !important;\">" + listContent + "</ol>";
	} else {
		list = "<ul style=\"margin: 0px !important; padding: 0px !important; margin-left: 3em !important;\">" + listContent + "</ul>";
	}
	return list;
}

function insertText(argText, argID) {
	var textarea = argID ? document.getElementById("post-" + argID + "-commentBoard").getElementsByTagName("textarea")[0] : document.getElementsByTagName("textarea")[0];
	
	if(typeof(textarea) == "undefined") return;
	if(textarea.hasAttribute("disabled")) return;
	if(!SAFARI) {
		// adapted from http://parentnode.org/javascript/working-with-the-cursor-position/
		// This pulls the selection from the textarea, and sets the new value to everything before + argText + space + everything after
		var selStart = textarea.selectionStart;
		var selEnd = textarea.selectionEnd;
		textarea.value = textarea.value.substr(0, selStart) + argText + " " + textarea.value.substr(selEnd, textarea.value.length);
		// This puts the cursor at the new position
		textarea.focus();
		var newPos = selEnd + argText.length + 1;
		textarea.setSelectionRange(newPos, newPos);
	} else {
		textarea.value += argText + " ";
	}
	return;
}

function enterSmiley(event) {
	//alert(event.target.tagName); return;
	var smiley = event.target.alt;
	if(typeof(smiley) == "undefined") smiley = event.target.firstChild.alt; //this is for cases where a user hits the anchor, but not the image
	if(episodePage) var section = getPostId(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode) // takes post-##-smiley.id
	else var section = false;
	insertText(smiley, section);
}

function enterBBcode(event) {
	if(DEBUG) console.time("enterBBcode");
	var bbcode = new String("");
	var label = "";
	switch(event.target.id) {
		case "bbcodeBold": bbcode = "[b]" + window.prompt("Please enter the text you want in bold:") + "[/b]"; break;
		case "bbcodeItalic": bbcode = "[i]" + window.prompt("Please enter the text you want in italics:") + "[/i]"; break;
		case "bbcodeStruck": bbcode = "[s]" + window.prompt("Please enter the text you want struck out:") + "[/s]"; break;
		case "bbcodeURL":
			bbcode = window.prompt("Please enter the URL to link to:","http://");
			if(bbcode == null) return;
			label = window.prompt("Please enter the text to display:");
			if((label == "") || (label == null)) label = bbcode;
			bbcode = bbcode.replace(/\s+/g,"%20");
			bbcode = "[url=" + bbcode + "]" + label + "[/url]";
			break;
		case "bbcodeIMG":
			bbcode = window.prompt("Please enter the URL of the image:","http://");
			if(bbcode == null) return;
			bbcode = bbcode.replace(/\s+/g,"%20");
			bbcode = "[img=" + bbcode + "]";
			break;
		case "bbcodeQuote":
			label = window.prompt("Please enter the user to quote:");
			if(label == null) label = "";
			bbcode = "[quote=" + label + "][/quote]";
			break;
		case "bbcodeSize": bbcode = "[size=" + event.target[event.target.selectedIndex].getAttribute("value") + "]" + window.prompt("Please enter the text you want in " + event.target[event.target.selectedIndex].firstChild.nodeValue + ":") + "[/size]"; if(!SAFARI) event.target.selectedIndex = 3; break;
		case "bbcodeColor": bbcode = "[color=" + event.target[event.target.selectedIndex].getAttribute("value") + "]" + window.prompt("Please enter the text you want in " + event.target[event.target.selectedIndex].getAttribute("value") + ":") + "[/color]"; if(!SAFARI) event.target.selectedIndex = 3; break;
		default: break;
	}
	// Abort if the user hit cancel
	if(bbcode == null) return;
	// At least filter out *some* unsightly nulls
	bbcode = bbcode.replace(/\[([bis]?)\]null\[\/[bis]\]/g,"[$1][/$1]");
	if(episodePage) {
		if(event.type == "click") var section = getPostId(event.target.parentNode.parentNode);
		if(event.type == "change") var section = getPostId(event.target.parentNode.parentNode.parentNode);
	} else var section = false;
	insertText(bbcode, section);
	if(DEBUG) console.timeEnd("enterBBcode");
}

// This adds a mibbit chat link to the user bar
// v15: This also adds the theme selector
// v16: Fucking FreeNode blocked mibbit...wtf? - also added (for Firefox users) the ability to pre-set a chat nick other than their user name
if(document.getElementById("u-social")) {
	if(DEBUG) {
		console.group("User Bar Handling");
		console.time("User Bar Handling");
	}
	var tempUser = "";
	var tempPrompt = "&prompt=1";
	if(loggedIn) {
		// If a default chat nick is set, use that
		if((typeof getChatNick(CURRENT_USER_ID) != 'undefined') && (getChatNick(CURRENT_USER_ID) != "undefined")) {
			tempUser = getChatNick(CURRENT_USER_ID);
			tempPrompt = "";
		} else {
			tempUser = CURRENT_USER;
		}
		tempUser = sanitizeChatNick(tempUser);
	} else {
		tempUser = "Traveler.."; //%3F for mibbit
	}
	 
	//var tempLink = createAnchor("http://widget.mibbit.com/?server=irc.freenode.net&channel=%23LG15chat&customprompt=Welcome%20to%20the%20official%20lonelygirl15%20chat!&noServerMotd=true&customloading=Loading%20-%20please%20wait.%20If%20this%20is%20taking%20long,%20maybe%20you%20already%20have%20another%20chat%20window%20open.&nick=" + tempUser, "Chat", "u-social-chat-link", "newChatLink"); //mibbit, obviously
	var tempLink = createAnchor("http://webchat.freenode.net/?nick=" + tempUser + "&channels=LG15chat" + tempPrompt, "Chat", "u-social-chat-link", "newChatLink");
	tempLink.setAttribute("title","Join the official chat! [opens in a new window]");
	tempLink.setAttribute("target","_blank"); // not good, but better than confusing people
	
	var tempNodeI = document.createElement("li");
	tempNodeI.setAttribute("id","u-social-chat");
	CHAT_LINK = tempNodeI.appendChild(tempLink);
	
	tempNode = document.getElementById("u-social-task").getElementsByClassName("container")[0].getElementsByTagName("ul")[0];
	tempNode.appendChild(tempNodeI);
	
	// Theme selector follows
	tempLink = loggedIn ? document.getElementById("u-social-notify") : document.getElementById("u-social-login");
	tempNode = document.createElement("li");
	tempNode.id = "u-social-theme";
	tempLink = tempLink.parentNode.insertBefore(tempNode, tempLink.nextSibling);
	
	tempNode = document.createElement("select");
	tempNode.id = "u-social-theme-switcher";
	
	tempNodeI = document.createElement("option");
	tempNodeI.setAttribute("value", "thelast");
	tempNodeI.appendChild(document.createTextNode("The Last Theme"));
	
	tempNode.appendChild(tempNodeI);
	
	tempNodeI = document.createElement("option");
	tempNodeI.setAttribute("value", "resistance");
	tempNodeI.appendChild(document.createTextNode("Resistance Theme"));
	
	tempNode.appendChild(tempNodeI);
	
	//tempLink.parentNode.insertBefore(tempNode, tempLink.nextSibling);
	tempNode.addEventListener("change", switchTheme, false); 
	tempNode = tempLink.appendChild(tempNode);
	// set newly added switcher to current theme index
	tempNode.selectedIndex = convertThemeName(getCurrentTheme());
	
	// GreaseKit seriously needs to add GM API functions
	if(!SAFARI && loggedIn) {
		// This adds a menu command to set a default chat nick
		GM_registerMenuCommand("Set chat nick", function() {
			setChatNick(CURRENT_USER_ID, window.prompt("Please choose your default chat nickname:", getChatNick(CURRENT_USER_ID)));
		}, "", "", "c");
		// This adds a menu command to unset a default chat nick
		GM_registerMenuCommand("Clear chat nick", function() {
			if(window.confirm("Are you sure you want to clear your default chat nick (\"" + getChatNick(CURRENT_USER_ID) + "\")?")) delChatNick(CURRENT_USER_ID);
		}, "", "", "r");
		
		// This adds a menu command to toggle writing last seen data
		GM_registerMenuCommand("Toggle \"Last seen\"", function() {
			setWriteLastSeenData(window.confirm("Click OK to activate broadcasting last seen data, Cancel to deactivate.\nWARNING: If activated, this WILL overwrite the Sports section in your Favorites on your profile."));
		}, "", "", "l");
		
		//USER_LINK.addEventListener("click", addScriptOptionsLink, false);
		//if(document.getElementById("menu-dash")).document.getElementById("menu-dash")
		document.getElementById("u-social-content").addEventListener("DOMNodeInserted", socialBarChanged, false);
	}
	
	if(DEBUG) {
		console.timeEnd("User Bar Handling");
		console.groupEnd();
	}
}

function getChatNick(loggedInUser) {
	if(SAFARI) return undefined;
	// if(DEBUG) console.debug("GM_getValue(loggedInUser.chatnick): ", GM_getValue(loggedInUser + ".chatnick"));
	return GM_getValue(loggedInUser + ".chatnick");
}

function setChatNick(loggedInUser, newChatNick) {
	if(SAFARI) return undefined;
	GM_setValue(loggedInUser + ".chatnick", sanitizeChatNick(newChatNick));
	CHAT_LINK.href = "http://webchat.freenode.net/?nick=" + getChatNick(loggedInUser) + "&channels=LG15chat";
}

function delChatNick(loggedInUser) {
	if(SAFARI) return undefined;
	GM_deleteValue(loggedInUser + ".chatnick");
	CHAT_LINK.href = "http://webchat.freenode.net/?nick=" + sanitizeChatNick(CURRENT_USER) + "&channels=LG15chat";
}

function sanitizeChatNick(argNick) {
	// This ignores special characters so far
	var safeNick = argNick.replace(/ /g,"");
	if(safeNick.length > 16) safeNick = safeNick.substr(0, 16); // freenode seems to be running with NICKLEN = 16
	return safeNick;
}

function switchTheme(event) {
	if(DEBUG) console.time("switchTheme");
	
	var theme = "";
	var switcher = document.getElementById("u-social-theme-switcher");
	// this fires when switchTheme() is called from code
	if(typeof(event) == "string") theme = event
	// this fires when switchTheme() is called by the theme switcher
	else theme = convertThemeId(event.target.selectedIndex);
	// Workaround for a problem Izabe was having
	if(theme.length < 1) {
		theme = "thelast";
		if(!SAFARI) {
			// Not using console.debug/DEBUG here b/c this way, normal users can report it
			GM_log("Theme unset bug hit. Forcefully set to >>>" + theme + "<<<.");
			GM_log("Debug information: event was >>>" + event.toString() + "<<<.");
		}
	}
	themeElement.setAttribute("href", "http://static.lg15.com/themes/"+ theme +"/css/theme.css");
	sessionStorage.setItem("theme", theme);
	if(!SAFARI) GM_setValue("lg15.com_theme", theme);
	// this *should* be superfluous, but we're keeping it to be sure
	if(switcher !== null) switcher.selectedIndex = convertThemeName(theme);
	// set respective style active and disable the other one
	// also change the header link
	switch(theme) {
		case "thelast": 
			customCSSresistance.setAttribute("media","hamster");
			customCSSthelast.setAttribute("media","screen");
			if(HEADER_LINK) {
				HEADER_LINK.href = "http://www.lg15.com/thelast";
				setTimeout(sibyllafy, Math.floor(10800000 * Math.random()), true); // three hours
			}
			break;
		case "resistance": 
			customCSSresistance.setAttribute("media","screen");
			customCSSthelast.setAttribute("media","hamster");
			if(HEADER_LINK) HEADER_LINK.href = "http://www.lg15.com/theresistance";
			break;
		default: 
			customCSSresistance.setAttribute("media","hamster");
			customCSSthelast.setAttribute("media","screen");
			break;
	}
	if(DEBUG) console.timeEnd("switchTheme");
}

function convertThemeId(id) {
	switch(id) {
		case 0: return "thelast";
		case 1: return "resistance";
		default: return "thelast";
	}
}

function convertThemeName(themeName) {
	switch(themeName) {
		case "thelast": return 0;
		case "resistance": return 1;
		default: return 0;
	}
}

function sibyllafy(turnOn) {
	if(!HEADER_LINK) return false;

	// if arg is true, add Sibylla to the header
	if(turnOn) { 
		HEADER_LINK.setAttribute("class","itsandrew");
		HEADER_LINK.href = "http://tinyurl.com/6f72206e6f6e65206f66207468656d";
		HEADER_LINK.target = "_blank";
		var s = Math.random();
		var linkTitle = "";
		if(s < 0.66) {
			if(s < 0.33) {
				linkTitle = "I'm always here. God when will you people learn?";
			} else {
				linkTitle = "I'm always in control";
			}
		} else {
			linkTitle = "I always run the game";
		}
		HEADER_LINK.title = linkTitle;
		HEADER_LINK.addEventListener("mouseover", slayCruella, false);
	} else if(getCurrentTheme() == "thelast") { // if arg is false AND the current theme is The Last, remove Sib
		HEADER_LINK.removeAttribute("class");
		HEADER_LINK.removeAttribute("title");
		HEADER_LINK.removeAttribute("target");
		HEADER_LINK.href = "http://www.lg15.com/thelast";
	}
}

function slayCruella() {
	HEADER_LINK.removeEventListener("mouseover", slayCruella, false);
	setTimeout(sibyllafy, Math.floor(30000 * Math.random()), false);
}

function socialBarChanged(event) {
	if(event.target.className == "prepend-2 span-6") addScriptOptionsLink(event.target.getElementsByTagName("ul")[0]);
	var userAge = document.getElementById("preview-identity-age");
	if(userAge && (userAge.firstChild.nodeValue == "//")) userAge.parentNode.removeChild(userAge); //userAge.firstChild.nodeValue = "\u00A0";
}

function addScriptOptionsLink(argList) {
	//var optionsList = document.getElementById("module-dashboard").getElementsByTagName("ul")[0];
	var tempNode = document.createElement("li");
	var tempLink = document.createElement("a");
	var tempNodeI = document.createElement("span");
	tempNodeI.appendChild(document.createTextNode("Script Options"));
	tempNodeI.setAttribute("class","linkfix");
	tempLink.setAttribute("class","optionslink");
	tempLink.appendChild(tempNodeI);
	//tempLink.addEventListener("click", loadScriptOptions, false);
	tempNodeI = tempNode.appendChild(tempLink);
	tempNodeI.addEventListener("click", loadScriptOptions, false);
	//optionsList.appendChild(tempNode);
	argList.appendChild(tempNode);
}

function loadScriptOptions(event) {
	var userAvatar = /avt_xsmall_24x24_(.*)\)\;/.exec(USER_LINK.getAttribute("style"))[1];
	var tempChatNick = getChatNick(CURRENT_USER_ID);
	if(DEBUG) console.info("tempChatNick set to %s.", tempChatNick);
	if((typeof tempChatNick == 'undefined') || (tempChatNick == "undefined")) tempChatNick = sanitizeChatNick(CURRENT_USER);
	var scriptOptionsHtml = "<div class=\"distraction-class prepend-2 span-6\">\
		<div id=\"module-dashboard\" class=\"module\">\
			<div class=\"module-main\">\
				<div class=\"module-list\">\
					<form id=\"chatNickForm\">\
						<label for=\"chatNickField\">Default Nick:</label><br>\
						<input type=\"text\" id=\"chatNickField\" name=\"chatnickfield\" value=\"" + tempChatNick + "\"><br>\
						<input type=\"button\" id=\"chatNickButton\" name=\"chatnickbutton\" value=\"Set\">\
						<input type=\"button\" id=\"chatNickClearButton\" name=\"chatnickclearbutton\" value=\"Clear\">\
						<label for=\"chatnickbutton\" id=\"chatNickConfirmLabel\" class=\"confirmation\">Default nick saved.</label>\
						<label for=\"chatnickclearbutton\" id=\"chatNickClearConfirmLabel\" class=\"confirmation\">Default nick cleared.</label>\
					</form><br>\
					<form id=\"lastSeenForm\">\
						<label>Last Seen Data:</label><br>\
						Show <input type=\"radio\" id=\"showLSradio\" name=\"lastseen\" value=\"showLS\">\
						<input type=\"radio\" id=\"hideLSradio\" name=\"lastseen\" value=\"hideLS\"> Hide\
						<p><strong>Warning!</strong> This option, if activated, <strong>will</strong> overwrite the data in the Favorites &raquo; Sports section of your profile.</p>\
					</form>\
				</div>\
			</div>\
		</div>\
	</div>\
	<div class=\"prepend-2 span-12 append-2 last\">\
		<div class=\"card mask\">\
			<div id=\"preview-identity-image\" class=\"avatar128x128\"><a href=\"http://www.lg15.com/user_profile/view/" + CURRENT_USER_ID + "\"><img src=\"http://avatars.lg15.com/cloud1/avt_xlarge_128x128_" + userAvatar + "\" width=\"128\" height=\"128\" alt=\"" + CURRENT_USER + "\"></a></div>\
			<ul>\
			<li id=\"preview-identity-name\">The Last Link Fix v" + scriptVersion + "</li>\
			<li id=\"preview-identity-location\">Created by <a href=\"http://www.lg15.com/user_profile/view/10071\">Renegade</a></li>\
			<li id=\"preview-identity-age\"><a href=\"http://userscripts.org/scripts/show/51625\">Visit UserScripts.org</a></li>\
			</ul>\
		</div>\
	</div>"
	
	unsafeWindow.$usocial.loadHtml(scriptOptionsHtml);
	document.getElementById("showLSradio").checked = getWriteLastSeenData();
	document.getElementById("hideLSradio").checked = !getWriteLastSeenData();
	
	document.getElementById("chatNickButton").addEventListener("click", function() {
		setChatNick(CURRENT_USER_ID, document.getElementById("chatNickField").value);
		document.getElementById("chatNickClearConfirmLabel").style.display = "none";
		document.getElementById("chatNickConfirmLabel").style.display = "block";
	}, false);
	document.getElementById("chatNickClearButton").addEventListener("click", function() {
		delChatNick(CURRENT_USER_ID);
		document.getElementById("chatNickField").value = "";
		document.getElementById("chatNickConfirmLabel").style.display = "none";
		document.getElementById("chatNickClearConfirmLabel").style.display = "block";
	}, false);
	document.getElementById("lastSeenForm").addEventListener("change", function(event) {setWriteLastSeenData(event.target.value == "showLS" ? true : false);}, false);
}

if(loggedIn) {
	// if(DEBUG) console.debug("Profile touch time: ",getProfileTouchTime());
	if((CURRENT_TIME - getProfileTouchTime()) > 300) {
		// if(DEBUG) console.debug("Touching profile ",CURRENT_USER_ID,"...");
		writeOptionsToProfile();
	}
	// This dumps the options to a user's profile, at set intervals
	var dumpInterval = setInterval(writeOptionsToProfile, 300000);
}

// Check when we last wrote to our profile
// returns null if value doesn't exist
function getProfileTouchTime() {
	return sessionStorage.getItem(CURRENT_USER_ID + ".profiletouch");
}

// Log when we last wrote to our profile
function setProfileTouchTime(timestamp) {
	sessionStorage.setItem(CURRENT_USER_ID + ".profiletouch", timestamp);
}

// save whether to broadcast last seen data
// New in v18: Write Last Seen time if system was activated, remove if sys was deactivated
function setWriteLastSeenData(argBool) {
	if(!SAFARI) {
		GM_setValue(CURRENT_USER_ID + ".broadcastLS", argBool);
		writeOptionsToProfile(true);
	}
}

// return whether to broadcast last seen data
function getWriteLastSeenData() {
	if(!SAFARI) {
		return GM_getValue(CURRENT_USER_ID + ".broadcastLS");
	} else {
		return true;
	}
}

function writeOptionsToProfile(override) {
	// Dropping out here if writing is disabled
	if(!getWriteLastSeenData() && !override) {
		if(DEBUG) {
			console.info("Saving last seen data is off. Returning.");
			console.debug("getWriteLastSeenData returned ", getWriteLastSeenData(), " of type ", typeof getWriteLastSeenData());
		}
		return;
	}
	
	var lastSeenBlock = getWriteLastSeenData() ? "%5Bscriptvars+lastseen%3D" + CURRENT_TIME + "%5D" : "";
	
	// While redundant now, this will be useful if we ever write more options to the profile
	var completeOptionsString = lastSeenBlock;
	
	// POSTing data
	var targetURL = "http://www.lg15.com/profile_favorites/edit/" + CURRENT_USER_ID;
	var profileDump = new XMLHttpRequest();  
	profileDump.open('POST', targetURL, true);
	profileDump.onreadystatechange = function (someEvent) {  
		if (profileDump.readyState == 4) {  
			if(profileDump.status == 200)  {
					// Don't really have to do anything here, since we're just posting
					// Just reminding ourselves when we last did this
					setProfileTouchTime(CURRENT_TIME);
				return true;
			} else {
				alert("Warning! Could not write to profile! Server returned code " + profileDump.status);
				return false;
			}
		}  
	};
	profileDump.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	profileDump.setRequestHeader("X-TheLastScript", "v" + scriptVersion);
	profileDump.setRequestHeader("Connection", "close");
	profileDump.send("form_name=profile_favorites_edit&sports=" + completeOptionsString);
}

if(phpBBPage) {
	if(DEBUG) {
		console.group("Generate phpBB page.");
		console.time("Generate phpBB page.");
	}
	generateBarebonesPage();
	document.title = "The Last phpBB Forums";
	var tempNode = document.createElement('iframe');
	tempNode.src = THELASTPHPBB;
	tempNode.width = "100%";
	tempNode.height = "1800px";
	/*tempNode.addEventListener("load", function(event) {
		event.target.width = "100%";
		//event.target.height = event.target.contentWindow.scrollMaxY;
		alert(event.target.getElementById("phpbb"));
	}, false); */
	while(!document.getElementById("scriptContent")); // stalling the script until the DOM is ready
	document.getElementById("scriptContent").appendChild(tempNode);
	if(DEBUG) {
		console.timeEnd("Generate phpBB page.");
		console.groupEnd();
	}
}

function generateBarebonesPage() {
	if(DEBUG) console.time("generateBarebonesPage");
	
	var tempNode = document.getElementById("body");
	
	var eqalCode = new XMLHttpRequest();  
	eqalCode.open('GET', SITETEMPLATE, true);  
	eqalCode.onreadystatechange = function (someEvent) {  
		// IF the ready state changed AND IF the new ready state is 4 ("COMPLETED") AND IF the server's response was 200 ("OK"), do stuff
		if (eqalCode.readyState == 4) {  
			if(eqalCode.status == 200)  {
				var tempText = eqalCode.responseText;
				var headContent = tempText.match(/<head>([\s\S])*<\/head>/i);
				var bodyContent = tempText.match(/<body>([\s\S])*<\/body>/i);
				headContent = headContent.toString();
				bodyContent = bodyContent.toString();
				HEAD.innerHTML = headContent.slice(6,-9);
				document.body.innerHTML = bodyContent.slice(6,-6);
				document.getElementsByClassName("span-24")[0].parentNode.removeChild(document.getElementsByClassName("span-24")[0]);
				var tempNode = document.createElement("div");
				tempNode.id = "scriptContent";
				tempNode.setAttribute("class","span-24 last");
				document.getElementById("foot").parentNode.insertBefore(tempNode,document.getElementById("foot"));
				document.normalize();
				return true;
			} else return false; // If we're done, but the server flipped us off...well, damn.
		}  
	};  
	eqalCode.setRequestHeader("X-TheLastScript", "v" + scriptVersion);
	eqalCode.overrideMimeType('text/xml');
	eqalCode.send(null);
	
	if(DEBUG) console.timeEnd("generateBarebonesPage");
}

function createAnchor(anchorUrl, anchorText, anchorID, anchorClass) {
	if((typeof(anchorUrl) == "undefined") || (typeof(anchorText) == "undefined")) return null;
	var tempLink = document.createElement("a");
	tempLink.setAttribute("href",anchorUrl);
	if(typeof(anchorClass) != "undefined") tempLink.setAttribute("class",anchorClass);
	if(typeof(anchorID) != "undefined") {
		tempLink.setAttribute("name",anchorID);
		tempLink.id = anchorID;
	}
	tempLink.appendChild(document.createTextNode(anchorText));
	return tempLink;
}

// This improves the community page
if(communityPage) {
	if(DEBUG) {
		console.group("Community Page");
		console.time("Community Page");
	}
	
	var contentArea = document.getElementsByClassName("module-body")[0];
	contentArea.appendChild(document.createElement("hr"));
	addRowToComPage("LG15 Today","http://lg15today.blogspot.com","Twitter","http://twitter.com/lg15today");
	addRowToComPage("The 436","http://the436.com","Forum","http://forum.the436.com");
	//addRowToComPage("","","","");
	addRowToComPage("BreeFM","http://breefm.blogspot.com/","Listen","http://breefm.2tunes.com/listen.pls");
	addRowToComPage("Anchor Cove","http://www.anchorcove.net/","Forum","http://forum.anchorcove.net/");
	addRowToComPage("Meepers United","http://meepers-united.ning.com/");
	contentArea.appendChild(document.createElement("hr"));
	addRowToComPage("Creature Enterprises","http://www.thecoalitiontv.com/thecoalition/index.php?option=com_seyret&Itemid=26&catid=14","Jessica Morning's YouTube","http://www.youtube.com/user/JessicaMorning");
	addRowToComPage("Maddison Atkins","http://www.maddisonatkins.com","Forum","http://www.maddisonatkins.com/forum");
	addRowToComPage("Fallen Angel","http://www.youtube.com/user/SmythesFallenAngel");
	addRowToComPage("Samantha Chronicles","http://www.youtube.com/user/supersam73","Twitter","http://www.twitter.com/supersam73");
	
	if(DEBUG) {
		console.timeEnd("Community Page");
		console.groupEnd();
	}
}
function addRowToComPage(paramText, paramLink, paramText2, paramLink2) {
	var tempP = contentArea.appendChild(document.createElement("p"));
	var tempNode = tempP.appendChild(document.createElement("strong"));
	tempNode.appendChild(document.createTextNode(paramText));
	tempP.appendChild(document.createTextNode(" "));
	tempP.appendChild(createAnchor(paramLink, "Website"));
	if((typeof(paramLink2) != "undefined") && (typeof(paramText2) != "undefined")) {
		tempP.appendChild(document.createTextNode(" | "));
		tempP.appendChild(createAnchor(paramLink2, paramText2));
	}
}

if(profilePage) {
	var profileUserId = getUserIDfromURL(document.location.pathname);
	if(!SAFARI) {
		if(profileUserId != CURRENT_USER_ID) {
			var isIgnored = isUserOnIgnoreList(profileUserId);
			tempNodeI = document.createElement("li");
			tempLink = document.createElement("a");
			tempNode = document.createElement("span");
			tempNode.setAttribute("class", isIgnored ? "add ignoreLink" : "delete ignoreLink");
			tempNode.appendChild(document.createTextNode(isIgnored ? "Unignore" : "Ignore"));
			tempLink.appendChild(tempNode);
			tempLink.addEventListener("click", ignoreLinkClickHandler, false);
			tempNodeI.appendChild(tempLink);
			tempNode = document.getElementById("profile-module").getElementsByClassName("module-list")[0].getElementsByTagName("ul")[0];
			tempNode.appendChild(tempNodeI);
		} else {
			tempNodeI = document.createElement("li");
			if(getWriteLastSeenData()) {
				tempNodeI.appendChild(document.createTextNode("You ARE currently broadcasting Last Seen data. Other users CAN see when you were last seen."));
				tempNodeI.setAttribute("class", "LSon");
			} else {
				tempNodeI.appendChild(document.createTextNode("You are currently NOT broadcasting Last Seen data. Other users canNOT see when you were last seen."));
				tempNodeI.setAttribute("class", "LSoff");
			}
			tempNodeI.title = "This setting can be changed under Script Options in your Dashboard.";
			tempNode = document.getElementById("profile-module").getElementsByClassName("module-list")[0].getElementsByTagName("ul")[0];
			tempNode.appendChild(tempNodeI);
			
			if(profileUserId == "10721") setTimeout(sibyllafy, Math.floor(600000 * Math.random()), true); // ten minutes
		}
	}
	
	// Remove empty profile information fields
	tempNode = document.getElementsByClassName("module-main")[2].getElementsByClassName("module-body");
	tempNodeI = document.getElementsByClassName("module-main")[2].getElementsByClassName("module-head");

	for(var i = tempNode.length - 1; i >= 0; --i) {
		if(tempNode[i].getElementsByTagName("dt").length < 1) {
			tempNode[i].parentNode.removeChild(tempNode[i]);
			tempNodeI[i].parentNode.removeChild(tempNodeI[i]);
		}
	}
	
	// Fix silly "0 - 0 of 0" messages on blogs and pics
	tempNode = document.getElementsByClassName("module-foot");
	tempNodeI = tempNode[2].getElementsByTagName("p")[0].firstChild;
	tempNode = tempNode[3].getElementsByTagName("p")[0].firstChild;
	
	
	if(tempNodeI.nodeValue.search("0 - 0") != -1) {
		tempNodeI.nodeValue = "Currently none.";
	}
	
	if(tempNode.nodeValue.search("0 - 0") != -1) {
		tempNode.nodeValue = "Currently none.";
	}
	
	
	// Check if the sports section is used by the script, if so, prettify it
	tempNode = document.getElementById("user-profile").getElementsByTagName("dt");
	for(var i = tempNode.length - 1; i >= 0; --i) {
		if(tempNode[i].firstChild.nodeValue == "Sports") {
			tempNodeI = tempNode[i].parentNode.getElementsByTagName("dd")[0];
			if(tempNodeI.firstChild.nodeValue.search("scriptvars") != -1) {
				if(DEBUG) console.debug("Script variables found, prettifying section...");
				// Changing block title
				tempNode[i].firstChild.nodeValue = "Link Fix Data";
				// Handling Last Seen
				var tempLS = new Date(/\[scriptvars lastseen=(\d+)\]/.exec(tempNodeI.firstChild.nodeValue)[1] * 1000); // curse JS and its milliepoch
				if((typeof tempLS != 'undefined') && (tempLS !== null)) tempNodeI.firstChild.nodeValue = "Last seen: " + tempLS.toLocaleString();
			}
			break;
		}
	}
	
	var tempBlogPosts = document.getElementsByClassName("ugc-wrapper"); // Did I mention the EQAL people are morons?
	for(var i = 0; i < tempBlogPosts.length; ++i) {
		replaceBBCode(tempBlogPosts[i]);
	}
}

function addUserToIgnoreList(userToIgnore) {
	if(DEBUG) console.info("aUTIL executed");
	if(SAFARI) return false;
	if(!window.confirm("Are you sure you want to add this user to your ignore list?")) return false;
	//var userToIgnore = getUserIDfromURL(document.location.pathname);
	var ignoreList = GM_getValue(CURRENT_USER_ID + ".ignorelist");
	if(DEBUG) console.debug("Old ignoreList value is ", ignoreList, " type is ", typeof ignoreList, ".");
	if(typeof ignoreList == 'undefined') var ignoreList = "";
	if(ignoreList.search(userToIgnore) == -1) {
		GM_setValue(CURRENT_USER_ID + ".ignorelist", ignoreList + "+" + userToIgnore);
		switchIgnoreLink(true);
	}
	//GM_deleteValue(CURRENT_USER_ID + ".ignorelist");
	return true;
}

function removeUserFromIgnoreList(userToRemove) {
	if(DEBUG) console.info("rUFIL executed");
	if(SAFARI) return false;
	if(!window.confirm("Are you sure you want to remove this user from your ignore list?")) return false;
	//var userToRemove = getUserIDfromURL(document.location.pathname);
	var ignoreList = GM_getValue(CURRENT_USER_ID + ".ignorelist");
	if(typeof ignoreList == 'undefined') return false;
	ignoreList = ignoreList.replace(userToRemove,"");
	ignoreList = ignoreList.replace(/\+{2,}/,"+"); // to keep the list from getting cluttered with pluses
	GM_setValue(CURRENT_USER_ID + ".ignorelist", ignoreList);
	switchIgnoreLink(false);
	//GM_deleteValue(CURRENT_USER_ID + ".ignorelist");
	return true;
}

function isUserOnIgnoreList(userToCheck) {
	if(DEBUG) console.info("iUOIL executed");
	if(SAFARI) return false;
	var ignoreList = GM_getValue(CURRENT_USER_ID + ".ignorelist");
	if(typeof ignoreList == 'undefined') return false;
	if(ignoreList.search(userToCheck) != -1) return true;
}

function switchIgnoreLink(isIgnored) {
	var ignoreSpan = document.getElementsByClassName("ignoreLink")[0];
	ignoreSpan.setAttribute("class", isIgnored ? "add ignoreLink" : "delete ignoreLink");
	ignoreSpan.firstChild.nodeValue = isIgnored ? "Unignore" : "Ignore";
}

function ignoreLinkClickHandler() { // Fuck the damn event system and its lack of arguments
	var targetUserID = getUserIDfromURL(document.location.pathname);
	var isIgnored = isUserOnIgnoreList(targetUserID);
	if(isIgnored) {
		removeUserFromIgnoreList(targetUserID);
	} else {
		addUserToIgnoreList(targetUserID);
	}
}


if(myVideosPage) {
	tempNode = null;
	tempNode = document.getElementById("user-profile").getElementsByTagName("h3"); // This needs changing should the Cs fuck around with that site
	if(loggedIn && (tempNode[0].firstChild.nodeValue == CURRENT_USER)) {
		tempNode[1].firstChild.nodeValue = "My videos";
	} else {
		tempNode[1].firstChild.nodeValue = tempNode[0].firstChild.nodeValue + "'s videos";
	}
	tempNode = null;
}

if(editPage) {
	if(document.getElementById("savechanges")) document.getElementById("savechanges").setAttribute("value", "Save Changes");
}

if(boardPage) {
	// tempNode = post list ul
	var tempNode = document.getElementsByClassName("item-myblog")[0].parentNode.childNodes;
	for(var i = 0; i < tempNode.length; ++i) {
		if(tempNode[i].tagName != "DIV") continue; // Fuck the DOM....but fuck the moronic, standards-blind idiot developers harder
		var tempLink = tempNode[i].getElementsByTagName("h3")[0].firstChild;
		var tempUserName = tempLink.firstChild.nodeValue;
		tempLink.href = "http://www.lg15.com/search/search?form_name=search&search=" + tempUserName + "&savechanges=Search";
		tempNode[i].getElementsByClassName("user-icon")[0].firstChild.href = "http://www.lg15.com/search/search?form_name=search&search=" + tempUserName + "&savechanges=Search";
		replaceBBCode(tempNode[i].getElementsByClassName("post")[0]);
		tempNode[i].style.clear = "both";
		var tempNodeI = tempNode[i].childNodes;
		for(var j = 0; j < tempNodeI.length; ++j) {
			if(tempNodeI[j].tagName != "A") {
				continue;
			} else {
				if(tempNodeI[j].href.search(/\$create/) != -1) tempNodeI[j].parentNode.removeChild(tempNodeI[j]); // remove useless board links
			}
		}
	}
}

tempLink = document.createElement("a");
tempLink.href = "http://tinyurl.com/whoisSW";
tempLink.setAttribute("class","cruella");
tempLink.appendChild(document.createTextNode("\u03B8\u03AD\u03BB\u03B7\u03BC\u03B1"));
document.body.appendChild(tempLink);

// This adds a note to the footer about the version - to make it easier for people to determine if they're up to date
// New in v15: Links to the script's page on userscripts.org and my profile
if(DEBUG) console.time("Create Script Footer");
tempNode = document.getElementById("foot");
tempNodeI = document.createElement("div");
tempNodeI.setAttribute("class","footerLink");
tempLink = document.createElement("a");
tempLink.setAttribute("href","http://userscripts.org/scripts/show/51625");
tempLink.appendChild(document.createTextNode("The Last Link Fix v" + scriptVersion));
tempNodeI.appendChild(document.createTextNode("This website has been improved by "));
tempNodeI.appendChild(tempLink);
tempNodeI.appendChild(document.createTextNode(" by "));
tempLink = document.createElement("a");
tempLink.setAttribute("href","http://www.lg15.com/user_profile/view/10071");
tempLink.appendChild(document.createTextNode("Renegade"));
tempNodeI.appendChild(tempLink);
tempNodeI.appendChild(document.createElement("br"));
tempNodeI.appendChild(document.createTextNode("Time since "));
tempLink = document.createElement("a");
tempLink.setAttribute("href","http://www.lg15.com/bbsposts/list/1/42/748/1");
tempLink.appendChild(document.createTextNode("the Creators have been informed about the broken links"));
tempNodeI.appendChild(tempLink);
tempNodeI.appendChild(document.createTextNode(": " + Math.floor((CURRENT_TIME - 1235775600)/86400) + " days."));
tempNode.appendChild(tempNodeI);
if(DEBUG) {
	console.timeEnd("Create Script Footer");
	console.timeEnd("Entire Script");
}

// EOF
