// ==UserScript==
// @name         Streamline OkC
// @version      2012.03.27
// @description  Hide OkCupid ads and clutter
// @include      http://www.okcupid.com/*
// @url          http://userscripts.org/scripts/source/64547.user.js
// ==/UserScript==

(function() {

var str ='';

// Hide ads
str += '#leaderboard_wrapper, #side_extras, #skysc' + 'raper_floater_wrapper, .okad, .ad_notifier, .advertisement_shell,';
str += ' .ad_wrapper, .ad_outer, #right_side_bar, .bottom_ad, #takeover_boxes, .upgrade_ad { display: none !important; }';

// Left pane: Hide You Might Like
//str += ' .section.matches { display: none !important; }';

// Profile pages: Hide the most intrusive Awards Box and the Wink button
//str += ' #p_profile .blue_cap { display: none; } #skinny_wrap .blue_cap { display: block; }';
//str += ' .pro_reviews, .pro_review_buttons, #winker_profile, #winker_dentyne { display: none !important; }';


// Profile pages: Hide Similar Users
//str += ' #similar_users_list { display: none !important; }';

// Profile pages: Hide the intrusive pop-out Action Bar
//str += ' #action_bar { display: none !important; }';

// Home page: Hide Site News, Greeting, Matches and Profile completion data
//str += ' #improve_your_matches, #site_news, #home_flask_info, ';
//str += ' #p_home .tabbed_heading, #matches_block, ';
//str += ' #section_completion { display: none !important; }';


// Core function
var head = document.getElementsByTagName('head')[0], style = document.createElement('style'), css = str;
if (!head) { return; }
style.type = 'text/css';
try { style.innerHTML = css; }
catch(x) { style.innerText = css; }
head.appendChild(style);

})();