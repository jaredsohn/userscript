// ==UserScript==
// @name           LastFm Radio Make-over
// @namespace      HelloChameleon.com
// @author         David Holman
// @description    Strip the ads out of Last.fm's on-line player and remove lots of visual noise
// @version        1.5
// @include        http://www.last.fm/listen/*
// ==/UserScript==

var styleFix = document.createElement('style');
styleFix.innerHTML="body { background:#ddd!important; }";
styleFix.innerHTML+=".masthead-wrapper { margin-top: 0; } .masthead a, .masthead a:hover, .masthead a:focus { color:#aaa; }";
styleFix.innerHTML+="#leftColumn, #rightColumn { margin-top:18px; } #rightColumn { padding: 0 0 15px 15px; }";
styleFix.innerHTML+="#radioPlayer { background: none no-repeat scroll left top #444; border-radius: 6px; }";
styleFix.innerHTML+="#radioTitle { color: #ccc; font-size: 12px; letter-spacing: 0.12em; text-transform:uppercase; }";
styleFix.innerHTML+="#radioSwitchPaneButton { background: none no-repeat scroll 0 #606060; border-radius: 3px 3px 3px 3px; margin: 0 15px 0 0; padding-left:8px; }";
styleFix.innerHTML+="#radioSwitchPaneButton strong { background: none no-repeat scroll right 0 transparent; }";
styleFix.innerHTML+="#radioSwitchPaneButton:hover { color: #fff; background: #ed281e; }";
styleFix.innerHTML+="#radioTrackMeta { background: none repeat scroll 0 0 rgba(0, 0, 0, 0.3); color: #CCCCCC; left: 0; padding: 6px 12px 0; top: 0; max-height: 40px; width: 96%; }";
styleFix.innerHTML+="#radioTrackMeta > p { display:inline; padding: 0 2px 0 0; }";
styleFix.innerHTML+="p.album > span.title:before { content:' - '; padding: 0 2px 0 0; } p.album > span.title:after { content:' - '; padding: 0 0 0 2px; }";
styleFix.innerHTML+="#trackContext a, radioTrackMeta a, #radioTrackMeta p a {color:#ccc;}";
styleFix.innerHTML+="#trackContext a:hover, radioTrackMeta a:hover, #radioTrackMeta p a:hover {text-decoration:none; color:#fff;}";
styleFix.innerHTML+="#userMetadata div.items h2.heading { background: none no-repeat scroll left top #606060 !important; border-radius: 6px 6px 0 0; color: #CCCCCC; margin: 10px 0 0; }";
styleFix.innerHTML+="#userMetadata div:first-child h2.heading { margin-top: 0; }";
styleFix.innerHTML+="#userMetadata div.items ul li { background-color: #e5e5e5; } #userMetadata div.items ul li.odd { background-color: #e5e5e5; }";
styleFix.innerHTML+="#userMetadata div.items ul li a { color: #606060; }";
styleFix.innerHTML+="#recentTracks li.nowPlaying { background-color:#FFFFFF!important; }";
styleFix.innerHTML+=".moduleOptions { background-color: #ddd; color: #505050; } .moduleOptions a { color: #505050; }";
styleFix.innerHTML+="#webRadioPlayer .twoCols .leftColumn { width:100%; }";
styleFix.innerHTML+="ul.artistsMedium li { margin: 0 6px 6px 0; }";
styleFix.innerHTML+="#page .stationbuttonInline {  margin-left:-19px; }";

// hidden
styleFix.innerHTML+="#webRadioPlayer .twoCols .rightColumn, .adroll-block, .google-ad-mpu, #leader_top, .LastAd, .adWrapper, .LastAd *, #LastAd, #LastAd_Top, #LastAd_TopRight, #LastAd_Mid, #LastAd_leaderboard, #LastAd_mpu, #LastAd_sky, #LastAd_lowerleaderboard, #slideshowPhotoCredits, #shoutboxContainer h2, div#shoutbox, #page .stationbuttonInline img.radio_play_icon {display:none!important;}";

/* // old player
styleFix.innerHTML+="#trackContext { background: none repeat scroll 0 0 rgba(0, 0, 0, 0.3); color: #CCCCCC; left: 0; padding: 0 12px 6px; text-shadow: none; top: 46px; min-width: 100%; width: 100%;}";
styleFix.innerHTML+="#progressBar span { background: none repeat scroll 0 0 #ED281E; }";
styleFix.innerHTML+="#progressBar { background: none repeat scroll 0 0 transparent; margin-top:8px; }";
*/

document.body.appendChild(styleFix);
