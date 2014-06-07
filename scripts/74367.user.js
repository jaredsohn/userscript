// <![CDATA[
// ==UserScript==
// @name          YouTube Enhancer
// @fullname      YouTube Enhancer
// @author        JameyFox
// @version       2010-04-14
// @licence       http://creativecommons.org/licenses/by-nc-sa/3.0/
// @license       (CC) by-nc-sa
// @namespace     http://userscripts.org/scripts/show/33042
// @description   Download Link + Quality Selector + Rollover Preview + Media Controller + Media Resizer + More...
// @include       http://userscripts.org/scripts/show/33042*
// @include       https://userscripts.org/scripts/show/33042*
// @include       http://*.youtube.*/*
// @include       http://youtube.*/*
// @unwrap
// ==/UserScript==

( function() { const n= '   -= Do not edit this notice =-   '
+"------------------------------------------------------------"
+" This script is under Creative Commons 3.0 License by-nc-sa "
+" http://creativecommons.org/licenses/by-nc-sa/3.0/          "
+"                                                            "
+" The original name of this script is 'YouTube Enhancer'     "
+" The original author of this script is 'JameyFox'              "
+" http://userscripts.org/users/147956                    "
+"------------------------------------------------------------";

//var start_time = new Date().getTime();
//======================================== USER SETTING ==================================================//

//if(!(window.location.host.match(/^(?:\w+\.)?youtube\.\w+$/i) && !(window.location.host.match(/^userscripts\.org$/i)) { return; }

const FORCE_LANGUAGE = ''; // ''=auto / 'en'=english / 'fr'=french / ... (you better to use the one in the general options box)
const CONFIG_VIA_DOM =  1; // 0=via unsafeWindow (not for Chromium or GG Chrome) / 1=via DOM and events (for all)

//========================================================================================================//
//============================================ INFO ======================================================//

// fmt=0  -> flv:  320x 240 (flv1) / mp3 1.0 22KHz [      ] (same as fmt=5)
// fmt=5  -> flv:  320x 240 (flv1) / mp3 1.0 22KHz [small ]
// fmt=6  -> flv:  480x 360 (flv1) / mp3 1.0 44KHz [      ] (Dropped...)
// fmt=13 -> 3gp:  176x 144 (H263) / AMR 2.0  8KHz [      ] (for cellphone)
// fmt=17 -> 3gp:  176x 144 (mpg4) / AAC 1.0 22KHz [      ] (for cellphone)
// fmt=18 -> mp4:  480x 360 (H264) / AAC 2.0 44KHz [large ]
// fmt=22 -> mp4: 1280x 720 (H264) / AAC 2.0 44KHz [hd720 ]
// fmt=34 -> flv:  640x 480 (H264) / AAC 2.0 44KHz [medium] (default)
// fmt=35 -> flv:  854x 640 (H264) / AAC 2.0 44KHz [large ]
// fmt=36 -> 3gp:  320x 240 (mpg4) / AAC 1.0 22KHz [      ] (for cellphone)
// fmt=37 -> mp4: 1920x1080 (H264) / AAC 2.0 44KHz [hd1080]

// YouTube URL: http://www.youtube.com/watch?v=[video_id]&fmt=[selected_fmt]&hl=[lang]
// YouTube download link: http://www.youtube.com/get_video?video_id=[video_id]&t=[t_id]&fmt=[download_fmt]

// Last player: http://s.ytimg.com/yt/swf/watch_as3-vfl137666.swf
// Last player: http://s.ytimg.com/yt/swf/watch-vfl138567.swf

//========================================================================================================//
//**************************************** INTERNAL SETTING **********************************************//

// RollOver Config
const ROLLOVER_DELAY_INIT = 200; // Initial delay
const ROLLOVER_DELAY_LOAD =  50; // Small delay for testing if all images is loaded
const ROLLOVER_DELAY_CONT = 800; // Normal delay of the rollover

// Constants (Not important)
const WATCH_VIDEO_INFO   = 'watch-channel-vids-div';          // To get his background and border color
const WATCH_MORE_FROM    = 'watch-channel-vids-body';         // To add a load event in change_link()
const WATCH_RELATED_VIDS = 'watch-related-vids-body';         // To add a load event in change_link()
const PLAYLIST_PANEL     = 'playlist-panel';                  // To add a load event in change_link()
const WATCH_SEARCH_RES   = 'watch_search_results';            // To add a load event in change_link()
const WATCH_PROMOTED     = 'watch-promoted-videos-container'; // Used to remove the parent
const DEFAULT_LANG_BOX   = 'default-language-box';            // Used to remove it
const WATCH_URL_FIELD    = 'watch-url-field';                 // Add fmt
const PLAYER_OPEN_POPUP  = 'player-open-popup';               // Add a button
const VERIFY_AGE_DIV     = 'verify-age';
const SEARCH_CLASSNAME   = 'search-form';

// Constants (Better to have)
const YT_BASEDIV         = 'baseDiv';             // Main div
const WATCH_PLAYER_DIV   = 'watch-player-div';    // Used to retrieve the Video Embed if not found
const WATCH_VID_INFO     = 'watch-this-vid-info'; // Used to append the Video Resizer
const WATCH_RATINGS_VIEW = 'watch-ratings-views'; // Used to append the Quality Selector
const MASTER_HEAD        = 'masthead';
const WATCH_THIS_VID     = 'watch-this-vid';
const WATCH_OTHER_VIDS   = 'watch-other-vids';

// Constants (Important)
const YOUTUBE_HEADER    = 'masthead-container';
const WATCH_TITLE_DIV   = 'watch-vid-title'; // Div id of the video title
const WATCHAN_TITLE_DIV = 'watch-channel-title'; // Div id of the video title
const YT_PLAYER_EMBED   = 'movie_player';    // Default Video Embed id
const YT_BETA_CHANNEL   = 'playnav-player';  // To detect the new beta channel
const YT_BAR_HEIGHT = 25;
const FMT_DEFAULT   = 34;
const YTE_NOTICE    = n;
const QUALITY_SELECTOR_ID = 'quality_selector';
const LIGHT_OFF_BUTTON_ID = 'yte_lights-off';
const YTE_OPTIONS_ID      = 'yte_options';
const YTE_SCREEN_PREVIEW  = 'yte_screen_preview';
const FONT_COURIER_NEW    = '"Courier New", Courier, monospace';
const FONT_ARIAL          = 'Arial, Tahoma, Helvetica, sans-serif';
const GMSTORAGE_PATH      = 'GM_';

// Global Variables
var gvar=function() {}
gvar.page_lang = 'www';
gvar.page_fmt  = 0;

//*************************************** Languages support **********************************************//

const LANGUAGE_TEXT = {
  dlink: n
, ar: { lang: '&#1575;&#1604;&#1593;&#1585;&#1576;&#1610;&#1577;' // by Dream1
  , dlink: '&#1578;&#1581;&#1605;&#1610;&#1604;'
  , omenu: '&#1582;&#1610;&#1575;&#1585;&#1575;&#1578;'
  , qual1: '1: &#1578;&#1581;&#1605;&#1610;&#1604; &#1606;&#1601;&#1587; &#1606;&#1608;&#1593;&#1610;&#1577; &#1605;&#1604;&#1601; &#1575;&#1604;&#1601;&#1610;&#1583;&#1610;&#1608; &#1575;&#1604;&#1581;&#1575;&#1604;&#1610;&#1607;'
  , qual2: '2: &#1578;&#1581;&#1605;&#1610;&#1604; &#1580;&#1608;&#1583;&#1577; &#1593;&#1575;&#1604;&#1610;&#1577; &#1604;&#1605;&#1604;&#1601; &#1575;&#1604;&#1601;&#1610;&#1583;&#1610;&#1608; &#1576;&#1589;&#1610;&#1594;&#1577; (FLV &#1571;&#1608; MP4)'
  , qual3: '3: &#1578;&#1581;&#1605;&#1610;&#1604; &#1575;&#1604;&#1605;&#1604;&#1601; &#1576;&#1580;&#1608;&#1583;&#1577; &#1593;&#1575;&#1604;&#1610;&#1577; &#1576;&#1589;&#1610;&#1594;&#1577; MP4'
  , auto1: '1: &#1578;&#1588;&#1594;&#1610;&#1604; &#1578;&#1604;&#1602;&#1575;&#1574;&#1610; &#1610;&#1593;&#1605;&#1604;'
  , auto3: '3: &#1578;&#1588;&#1594;&#1610;&#1604; &#1578;&#1604;&#1602;&#1575;&#1574;&#1610; &#1604;&#1575;&#1610;&#1593;&#1605;&#1604;'
  , link1: '&#1593;&#1585;&#1590; &#1580;&#1608;&#1583;&#1577; &#1605;&#1606;&#1582;&#1601;&#1590;&#1577; (flv)'
  , link2: '&#1593;&#1585;&#1590; &#1580;&#1608;&#1583;&#1577; &#1593;&#1575;&#1604;&#1610;&#1607; (flv)'
  , link3: '&#1593;&#1585;&#1590; &#1580;&#1608;&#1583;&#1577; &#1593;&#1575;&#1604;&#1610;&#1607; (mp4)'
  , link4: '&#1585;&#1571;&#1610; &#1601;&#1610; &#1606;&#1608;&#1593;&#1610;&#1577; HD (mp4)'
  , stop:   '&#1578;&#1608;&#1602;&#1601;'
  , stepb:  '&#1582;&#1591;&#1608;&#1577; &#1573;&#1604;&#1609; &#1575;&#1604;&#1608;&#1585;&#1575;&#1569;'
  , stepf:  '&#1582;&#1591;&#1608;&#1577; &#1573;&#1604;&#1609; &#1575;&#1604;&#1571;&#1605;&#1575;&#1605;'
  , play:   '&#1578;&#1588;&#1594;&#1610;&#1604; / &#1575;&#1587;&#1578;&#1574;&#1606;&#1575;&#1601;'
  , pause:  '&#1575;&#1610;&#1602;&#1575;&#1601; &#1605;&#1572;&#1602;&#1578;'
  , begin:  '&#1610;&#1576;&#1583;&#1571;'
  , loop:   '&#1575;&#1604;&#1578;&#1601;&#1575;&#1601;'
  , rewind: '&#1585;&#1580;&#1608;&#1593;'
  , end:    '&#1575;&#1604;&#1606;&#1607;&#1575;&#1610;&#1577;'
  , kill:   '&#1575;&#1606;&#1602;&#1585; &#1606;&#1602;&#1585;&#1607; &#1605;&#1586;&#1583;&#1608;&#1580;&#1607; &#1604;&#1575;&#1610;&#1602;&#1575;&#1601; &#1575;&#1604;&#1593;&#1585;&#1590;'
  , embed:  '&#1601;&#1578;&#1581; &#1601;&#1610; &#1604;&#1587;&#1575;&#1606; &#1580;&#1583;&#1610;&#1583;'
  , fscr:   '&#1605;&#1604;&#1569; &#1575;&#1604;&#1588;&#1575;&#1588;&#1577;'
  }
, cs: { lang: '&#268;e&#353;tina'
  , dlink: 'St&#225;hnout'
  }
, de: { lang: 'Deutsch'
  , dlink: 'Herunterladen'
  , omenu: 'Optionen'
  , qual1: '1: Gesetzte Downloadverbindung zur gleichen Qualit&#228;t des gesehenen Videos'
  , qual2: '2: Gesetzte Downloadverbindung zu einer videoakte der Qualit&#228;ts (FLV oder MP4)'
  , qual3: '3: Gesetzte Downloadverbindung zu einer videoakte der Qualit&#228;ts MP4'
  , auto1: '1: Manueller Start'
  , auto3: '3: Automatischer Start'
  , link0: 'Ansicht in niedrigster Qualit&#228;t (flv)'
  , link1: 'Ansicht in niedrige Qualit&#228;t (flv)'
  , link2: 'Ansicht in hoher Qualit&#228;t (flv)'
  , link3: 'Ansicht in hoher Qualit&#228;t (mp4)'
  , link4: 'Ansicht in HD-Qualit&#228;t (mp4)'
  , stop:   'Erlass'
  , stepb:  'Schritt zur&#252;ck'
  , stepf:  'Schritt nach vorn'
  , play:   'Lesen / ankurbeln'
  , pause:  'Pause'
  , begin:  'Beginn'
  , loop:   'Schleife'
  , rewind: 'R&#252;ckspulen'
  , end:    'Ende'
  , kill:   'Doppeltes Klicken, zum des NetStream und des Spielers zu t&#246;ten'
  , embed:  'Embed Verbindung'
  , fscr:   'Auf dem ganzen Bildschirmverbindung'
  , udisa: 'Updater ist jetzt deaktiviert'
  , uenab: 'Updater ist jetzt aktiviert'
  , ufoun: 'neues Update gefunden'
  , udnow: 'Besuche&nbsp;die&nbsp;Installationsseite'
  , udlat: 'Sp&#228;ter'
  , ufail: 'Fehler bei der &#220;berpr&#252;fung auf Updates'
  }
, en: { lang: 'English'
  //=== Download Link
  , dlink: 'Download'
  //=== Options menu
  , omenu: 'Options'
  , qual1: '1: Set download link to the same Quality of the viewed video'
  , qual2: '2: Set download link to a High Quality video file (FLV or MP4)'
  , qual3: '3: Set download link to the best MP4 High Quality video file'
  , auto1: '1: Set Autoplay to OFF'
  , auto2: '2: Set Autoplay to Buffering'
  , auto3: '3: Set Autoplay to ON'
  , ytego: 'You&#84;ube Enh&#97;nce&#114; General Options'
  //=== Quality Selector
  , link0: 'View in Very Low Quality (flv)'
  , link1: 'View in Medium Quality (flv)'
  , link2: 'View in High Quality (flv)'
  , link3: 'View in Medium Quality (mp4)'
  , link4: 'View in 720p HD Quality (mp4)'
  , link5: 'View in 1080p HD Quality (mp4)'
  //=== Media Resizer
  , best: 'Touch Window From Inside (with the Media Controller)'
  , maxi: 'Touch Window From Inside'
  , fill: 'Touch Window From Outside'
  , cst1: 'Custom 1'
  , cst2: 'Custom 2'
  , cst3: 'Custom 3'
  //=== Media Controller
  , stop:   'Stop'
  , stepb:  'Step back'
  , stepf:  'Step forward'
  , play:   'Play / Revive'
  , pause:  'Pause'
  , begin:  'Begin'
  , loop:   'Loop'
  , rewind: 'Rewind'
  , end:    'End'
  , kill:   'Double click to kill the NetStream (and the player)'
  , embed:  'Embed Link'
  , warp:   'Warp Link'
  , fscr:   'Fullscreen Link'
  //=== Updater
  , udisa: 'Updater Is Now Disabled'
  , uenab: 'Updater Is Now Enabled'
  , ufoun: 'New Update Found'
  , udnow: 'Visit&nbsp;Install&nbsp;Page'
  , udlat: 'Later'
  , ufail: 'Problem during checking update'
  , pinst: 'Click on "Update" to update the script'
  //=== General Options
  , gYEGO: '&#89;OUT&#85;BE E&#78;HA&#78;CER GE&#78;ERAL OP&#84;IONS'
  , tGRAL: 'General', hGRAL: 'General Options'
  , sSUBL: 'Language (need to reload)'
  , gFLNG: 'Select the language (blank=Auto)'
  , sVOLC: 'Volume Control (need to reload)'
  , gEVLC: 'Enable volume control'
  , gVATS: 'Volume at start'
  , sDLLK: 'Download Link'
  , gDLMD: 'Download mode'
  , gDLLQ: 'Select the quality of the video you want to download'
  , gMP3U: 'URL of the external mp3 site'
  , hMP3U: 'you must insert the video id with the tag: [VID]'
  , eMP3U: "Incorrect MP3 url in the options ( missing [VID] tag )"
  , eVEVO: "Sorry, but...\\nVevo videos can't be downloaded via GM..."
  , sSBCF: 'Cleaning flashvars Options (need to reload)'
  , gCLFV: 'Clean the video flashvars'
  , gDANN: 'Annotations (in cleanning mode)'
  , gDSUB: 'Captions or Subtitles (in cleanning mode)'
  , gRVAE: 'Show related video at the end (in cleanning mode)'
  , gTYBC: 'Bar color of the YouTube Player (in cleanning mode)'
  , gTXTP: 'Add TEXTp mode (in cleanning mode)'
  , hDCFV: 'disabling this work only when CLEAN_FLASHVARS is enabled'
  , hWCFV: 'work only when CLEAN_FLASHVARS is enabled'
  , tMRSZ: 'Media Resizer', hMRSZ: 'Media Resizer Options'
  , sVDPO: 'Media Resizer Options (may need to reload)'
  , gHDMR: 'Hide Media Resizer' 
  , gAHC3: 'Add Hidden Button ~3~'
  , sMR43: 'Media Resizer 4:3 custom buttons'
  , gD4VR: 'Default button for 4:3 video'
  , gC4T1: 'Custom text for button ~1~ on 4:3 video'
  , gC4W1: 'Custom width size of 4:3 video for button ~1~'
  , gC4H1: 'Custom height size of 4:3 video for button ~1~'
  , gC4T2: 'Custom text for button ~2~ on 4:3 video'
  , gC4W2: 'Custom width size of 4:3 video for button ~2~'
  , gC4H2: 'Custom height size of 4:3 video for button ~2~'
  , gC4W3: 'Custom width size of 4:3 video for button ~3~'
  , gC4H3: 'Custom height size of 4:3 video for button ~3~'
  , sMRWD: 'Media Resizer Wide custom buttons'
  , gDWVR: 'Default button for wide video'
  , gCWT1: 'Custom text for button ~1~ on wide video'
  , gCWW1: 'Custom width size of wide video for button ~1~'
  , gCWH1: 'Custom height size of wide video for button ~1~'
  , gCWT2: 'Custom text for button ~2~ on wide video'
  , gCWW2: 'Custom width size of wide video for button ~2~'
  , gCWH2: 'Custom height size of wide video for button ~2~'
  , gCWW3: 'Custom width size of wide video for button ~3~'
  , gCWH3: 'Custom height size of wide video for button ~3~'
  , gESTV: 'Scroll to the video'
  , gEHSC: 'Hide the scrollbar (in BEST/MAX/FILL mode)'
  , hWRTV: 'warning: reload the video'
  , hMINW: 'minimun: 160'
  , hMINH: 'minimun: 0'
  , gMRMR: 'Media Resizer button speed: Step reduction'
  , hMRMR: '1=Immediate / More=Slower'
  , gMRTW: 'Media Resizer button speed: Interval'
  , hMRTW: '1=Fastest but CPU intensive / More=Slower'
  , tQSEL: 'Quality Selector', hQSEL: 'Quality Selector Options'
  , sQSOT: 'Quality Selector Options (may need to reload)'
  , gHDQS: 'Hide Quality Selector'
  , gQSAU: 'Try to retrieve other available video quality'
  , gQSAC: 'Reload player for each successful retrieve check'
  , gFHDB: 'Auto select the best quality'
  , gRM22: "Don't autoselect 720p HD Quality (fmt=22)"
  , gRM37: "Don't autoselect 1080p HD Quality (fmt=37)"
  , hQSAU: 'Update the fmt_map'
  , sLOOT: 'Light Off Options'
  , gLOAS: 'Use Light Off at start'
  , gLOCL: 'Light Off color'
  , gLOPO: 'Light Off opacity for the page'
  , gLOBD: 'Light Off: display of the YouTube Bar'
  , gLOBO: 'Light Off opacity for the YouTube Bar'
  , hLOBO: 'between 0 and 100 / for wmode=opaque or wmode=transparent'
  , hB100: 'between 0 and 100'
  , tMCTR: 'Media Controller', hMCTR: 'Media Controller Options'
  , sMCOT: 'Media Controller Options (need to reload)'
  , gHMCW: 'Hide Media Controller (watch page)'
  , gHMCB: 'Hide Media Controller (beta channel)'
  , gFPWM: 'Select the wmode to use in the watch page (blank=Auto)'
  , gFPQT: 'Select the quality to use in the watch page (blank=Auto)'
  , gFPWB: 'Select the wmode to use in the beta channel (blank=Auto)'
  , gFPQB: 'Select the quality to use in the beta channel (blank=Auto)'
  , gMCLS: 'Use loop at start'
  , sAUPL: 'Autoplay (need to reload)'
  , gAPLW: 'Autoplay (watch page)'
  , gAPLB: 'Autoplay (beta channel)'
  , gRWWB: 'Rewind when buffering'
  , tDISP: 'Display', hDISP: 'YouTube Display Options'
  , sWPDP: 'Display Options (may need to reload)'
  , gRLGB: 'Remove the stupid blue language box'
  , gHTHD: 'Hide the YouTube title box of the video (watch & GW page)'
  , gEVDW: 'Expand the video details box at start (watch & GW page)'
  , gEVUL: 'Display of the "More From" box at start (watch & GW page)'
  , gCVRT: 'Display of the "Related Videos" box'
  , gCVRP: 'Display of the "Video Responses" box'
  , hEVUL: 'Special: Enabled if there no playlist'
  , gESAD: 'Expand the "Statistics" box at start (watch & GW page)'
  , gCCMT: 'Collapse/hide the comments box (watch & GW page)'
  , gEVDB: 'Expand the video details box at start (beta channel only)'
  , gRUNI: 'Remove/Hide the promoted videos'
  , gDRDD: 'Disable the black rounded layout around the video'
  , gHBYH: 'Hide YouTube Beta channel header'
  , sPLST: 'Youtube Playlist Options (need to reload)'
  , gNPNS: 'Autostart playlist when no "playnext"'
  , gPLLP: 'PlayList Loop'
  , hPLLP: 'Enabled: To the first in the Playlist Box / Complete: To the first in the Full Playlist'
  , gQLAP: 'QuickList Autoplay (GoogleWatch)'
  , tKEYE: 'Shortcut'
  , hKEYE: 'KeyBoard Control'
  , sKBCT: 'Keyboard Control'
  , gKBCT: 'Keyboard Control'
  , gRDKB: 'Redefine key'
  , kYEGO: 'Open General Options'
  , kPLPS: 'Play/Pause toggle'
  , kLOFF: 'Light Off'
  , kKILL: 'Kill / Eject'
  , kMUTE: 'Mute toggle'
  , kSCBK: 'Scroll back'
  , kSCTV: 'Scroll to video'
  , kCOLL: 'Video display: Collapse'
  , kWIDE: 'Video display: Wide'
  , k4DV3: 'Video display: 4/3'
  , kMR01: 'Media Resizer Button 1'
  , kMR02: 'Media Resizer Button 2'
  , kMR03: 'Media Resizer Button 3'
  , kMR04: 'Media Resizer Button 4'
  , kMR05: 'Media Resizer Button 5'
  , kMR06: 'Media Resizer Button 6'
  , kMR07: 'Media Resizer Button 7'
  , kMR08: 'Media Resizer Button BEST'
  , kMR09: 'Media Resizer Button MAX'
  , kMR10: 'Media Resizer Button FILL'
  , kMR11: 'Media Resizer Custom Button ~1~'
  , kMR12: 'Media Resizer Custom Button ~2~'
  , hRKEY: 'Press 2 times the escape or backspace or delete key to clear'
  , tMISC: 'Misc' ,hMISC: 'Miscellaneous Options'
  , sMISC: 'Miscellaneous (may need to reload)'
  , gBAAT: 'Buffering: Video Load before autostart (0=Disabled)'
  , gBAAF: 'Buffering: Wait before autostart (0=Disabled)'
  , gPLOF: 'Play when the page gain the focus'
  , gPAOE: 'Pause when the page loses the focus'
  , gATPL: 'Change autoplay when listening playlist'
  , gATQL: 'Change autoplay when listening queue list'
  , gATOL: 'Change autoplay when listening others list'
  , gCFBT: 'Change the kill button aspect'
  , gVPVW: 'Show Rollover Video Images Preview'
  , gSINP: 'Search results go in a new page'
  , gLUMT: 'Luminosity trigger'
  , hLUMT: 'between 0 (always light) and 256 (always dark)'
  , gCNLD: "Restart the NetStream if the video don't load, try... (0=disable)"
  , gCNLF: "Restart the Player if the video don't load, try... (0=disable)"
  , gBCDP: "Change the default Beta Channel view"
  , hBCDP: "p=Player view, g=Grid view / a=All, u=Uploads, f=Favorites, p=Playlists"
  , gBPAC: 'Bypass Age Censor without logging'
  , tCOLO: 'Colors', hCOLO: 'Colors Options'
  , sLGCS: 'Light Color Setting (may need to reload)'
  , sDKCS: 'Dark Color Setting (may need to reload)'
  , tOTHE: 'Others', hOTHE: 'Others Options'
  , sYEUS: 'YouTube Enhancer Updater'
  , gYEUI: 'Check YouTube Enhancer update every... (0=disabled)'
  , hYEUI: 'betwwen 0 and 60'
  , gYEUV: 'Visit link mode'
  , sOMSC: 'Miscellaneous (Deprecated/Not Fully Supported)'
  , gFFMT: 'Force fmt'
  , hFFMT: '18 for HQ Quality (mp4)'
  , gEORV: 'Reload the player while reviving it'
  , hERPK: 'Enable reloading the player after killing it'
  , gUIFB: 'Use background image for buttons (for browser without linear gradient)'
  , sDEBG: 'Debug (need to reload)'
  , gDEBG: 'Show more in error console'
  , oDISA: 'Disabled'
  , oENAB: 'Enabled'
  , oSELF: 'Only self'
  , oNORM: 'Normal'
  , oCOLL: 'Collapse'
  , oEXPD: 'Expand'
  , oSHOW: 'Show'
  , oHIDE: 'Hidden'
  , oATST: 'At start'
  , oBEST: 'Best'
  , oCMPL: 'Complete'
  , oSPEC: 'Special'
  , odlnk: 'Direct link'
  , oitab: 'In new tab'
  , oDAYS: 'days'
  , oDFLT: 'Default'
  , oAUTO: 'Auto'
  , oMEMO: 'Persist'
  , oCUST: 'Custom'
  , oCNCL: 'Cancel'
  , oSAVE: 'Save'
  , oRSTA: 'Reset All'
  , oRSTT: 'Reset Tab'
  , oORIG: 'Original'
  , oEJCT: 'Eject'
  , uTIME: 'times'
  , oSAME: 'Same'
  , oAOFF: 'Autoplay Off'
  , oABUF: 'Buffering'
  , oAPON: 'Autoplay On'
  }
, es: { lang: 'Espa&#241;ol (1)' // By Juampi_yoel
  //=== Download Link
  , dlink: 'Descarga'
  //=== Options menu
  , omenu: 'Options'
  , qual1: '1: Establecer enlaces de descarga con calidad similar al video'
  , qual2: '2: Establecer enlace de descarga en alta calidad (FLV o MP4)'
  , qual3: '3: Establecer enlace de descarga  MP4 Video de alta calidad'
  , auto1: '1: Establecer Autoinicio Apagado'
  , auto2: '2: Establecer Buffer de Inicio'
  , auto3: '3: Establecer Autoinicio encendido'
  , ytego: 'You&#84;ube Enh&#97;nce&#114; Opciones Generales'
  //=== Quality Selector
  , link0: 'Ver en calidad Baja (flv)'
  , link1: 'Ver en Calidad Media (flv)'
  , link2: 'Ver en Calidad Alta (flv)'
  , link3: 'Ver en Calidad Media (mp4)'
  , link4: 'Ver en 720p Calidad HD (mp4)'
  , link5: 'Ver en 1080p Calidad HD (mp4)'
  //=== Media Resizer
  , best: 'Tocar ventana por dentro (con Media Controller activo)'
  , maxi: 'Tocar ventana por dentro'
  , fill: 'tocar ventana desde el exterior'
  , cst1: 'Custom 1'
  , cst2: 'Custom 2'
  , cst3: 'Custom 3'
  //=== Media Controller
  , stop:   'Parar'
  , stepb:  'Paso atras'
  , stepf:  'Paso adelante'
  , play:   'Reproducir / Reactivar'
  , pause:  'Pausa'
  , begin:  'Comenzar'
  , loop:   'Loop'
  , rewind: 'Rebobinar'
  , end:    'Terminar'
  , kill:   'Doble Click para matar la carga del NetStream (y el reproductor)'
  , embed:  'Incluir enlaces'
  , warp:   'Deformar enlace'
  , fscr:   'Enlace a pantalla completa'
  //=== Updater
  , udisa: 'Actualizador Deshabilitado'
  , uenab: 'Actualizador Habilitado'
  , ufoun: 'Nueva Actualizacin'
  , udnow: 'Visitar&nbsp;Instalar&nbsp;Pagina'
  , udlat: 'Luego'
  , ufail: 'Problema en la verificacion de una actualizacion'
  , pinst: 'Haga clic en "Actualizar" para actualizar el Script'
  //=== General Options
  , gYEGO: '&#89;OUT&#85;BE E&#78;HA&#78;CER GE&#78;ERAL OP&#84;IONS'
  , tGRAL: 'General', hGRAL: 'General Options'
  , sSUBL: 'Idioma (Necesita Recargar)'
  , gFLNG: 'Seleccionar Idioma (Blanco=Auto)'
  , sVOLC: 'Control de volumen (Necesario Recargar)'
  , gEVLC: 'Habilitar control de volumen'
  , gVATS: 'Volumen Inicial'
  , sDLLK: 'Enlace de descarga'
  , gDLLQ: 'Seleccione la calidad del video que desea descargar'
  , sSBCF: 'Limpiar Opciones flashvars (Necesario Recargar)'
  , gCLFV: 'Limpiar el Video flashvars'
  , gDANN: 'Anotaciones (En modo Limpieza)'
  , gDSUB: 'Subtitulos (En modo Limpieza)'
  , gRVAE: 'Mostrar v&#237;deo relacionados al final (En modo Limpieza)'
  , gTYBC: 'Color de barra del reproductor de YouTube (En modo Limpieza)'
  , hDCFV: 'Desactivar este trabajo s&#243;lo cuando est&#225; habilitado CLEAN_FLASHVARS'
  , hWCFV: 'S&#243;lo funcionan cuando se habilita CLEAN_FLASHVARS'
  , tMRSZ: 'Media Resizer', hMRSZ: 'Opciones Media Resizer'
  , sVDPO: 'Opciones de Media Resizer (Necesita Recargar)'
  , gHDMR: 'Ocultar Media Resizer' 
  , gAHC3: 'Agregar boton oculto ~3~'
  , sMR43: 'Media Resizer 4:3 botones personalizados'
  , gD4VR: 'Bot&#243;n predeterminado para v&#237;deo 4:3'
  , gC4W1: 'Tama&#241;o personalizado de ancho 4:3 ~1~'
  , gC4H1: 'Tama&#241;o de la altura personalizada 4:3 ~1~'
  , gC4W2: 'Tama&#241;o personalizado ancho  4:3  ~2~'
  , gC4H2: 'Tama&#241;o de la altura personalizada 4:3 ~2~'
  , gC4W3: 'Tama&#241;o personalizado ancho 4:3 ~3~'
  , gC4H3: 'Tama&#241;o de la altura personalizada 4:3 ~3~'
  , sMRWD: 'Botones personalizados Media Resizer para Ancho'
  , gDWVR: 'Boton por defecto para Video Ancho'
  , gCWW1: 'Tama&#241;o personalizado ancho de v&#237;deo ~1~'
  , gCWH1: 'Tama&#241;o de la altura de v&#237;deo personalizado ~1~'
  , gCWW2: 'Tama&#241;o personalizado ancho de v&#237;deo ~2~'
  , gCWH2: 'Tama&#241;o de la altura de v&#237;deo personalizado ~2~'
  , gCWW3: 'Tama&#241;o personalizado ancho de v&#237;deo ~3~'
  , gCWH3: 'Tama&#241;o de la altura de v&#237;deo personalizado ~3~'
  , gESTV: 'Scroll to the video'
  , gEHSC: 'Ocultar la barra de desplazamiento (en Mejor/Max/Modo Relleno)'
  , hWRTV: 'Advertencia: volver a cargar el v&#237;deo'
  , hMINW: 'minimo: 160'
  , hMINH: 'minimo: 0'
  , gMRMR: 'Boton de Velocidad Media Resizer: Reducci&#243;n de Paso'
  , hMRMR: '1=Inmediatamente / Mas=M&#225;s lento'
  , gMRTW: 'Boton de Velocidad Media Resizer: Intervalo'
  , hMRTW: '1=De m&#225;s r&#225;pido pero intenso de CPU / Mas=M&#225;s Lento'
  , tQSEL: 'Selector de Calidad', hQSEL: 'Opciones del Selector de Calidad'
  , sQSOT: 'Opciones del Selector de Calidad (Necesita Recargar)'
  , gHDQS: 'Ocultar Selector de Calidad'
  , gQSAU: 'Intentar recuperar otra Calidad de video posible'
  , gQSAC: 'Actualizar reproductor, Actualizar verificaci&#243;n'
  , gFHDB: 'Selecci&#243;n autom&#225;tica de la mejor calidad'
  , gRM22: "No Autoseleccionar 720p HD Calidad (fmt=22)"
  , gRM37: "No Autoseleccionar 1080p HD Calidad (fmt=37)"
  , hQSAU: 'Actualizaci&#243;n de fmt_map'
  , sLOOT: 'Opciones de Luz Apagada'
  , gLOAS: 'Usar Luces Apagadas al Comienzo'
  , gLOCL: 'Colores de Luces Apagadas'
  , gLOPO: 'Opacidad de la p&#225;gina con Luz Apagada'
  , gLOBO: 'Opacidad de la Barra de YouTube con la Luz Apagada'
  , hLOBO: 'Entre 0 y 100 / para wmode=opaca o wmode=transparente'
  , hB100: 'Entre 0 y 100'
  , tMCTR: 'Media Controller', hMCTR: 'Opciones de Media Controller'
  , sMCOT: 'Opciones Media Controller (Ncesita Recargar)'
  , gHMCW: 'Ocultar Media Controller (Visualizacion de Pagina)'
  , gHMCB: 'Ocultar Media Controller (Canal beta)'
  , gFPWM: 'Seleccione el wmode a utilizar en la p&#225;gina de visualizaci&#243;n (blanco=Auto)'
  , gFPQT: 'Seleccione la calidad para uso en la p&#225;gina de visualizaci&#243;n (blanco=Auto)'
  , gFPWB: 'Seleccione el wmode a utilizar en el canal beta (blanco=Auto)'
  , gFPQB: 'SSeleccione la calidad para uso en el canal beta (blanco=Auto)'
  , gMCLS: 'Use bucle en el arranque'
  , sAUPL: 'Autoplay (Necesita Recargar)'
  , gAPLW: 'Autoplay (Pagina Visualizada)'
  , gAPLB: 'Autoplay (Canal beta)'
  , gRWWB: 'Rebobinar en b&#250;fer'
  , tDISP: 'Mostrar', hDISP: 'Mostrar Opciones de YouTube'
  , sWPDP: 'Mostrar Opciones (Necesita Recargar)'
  , gRLGB: 'Remover la estupida caja azul del idioma'
  , gHTHD: 'Ocultar el cuadro de t&#237;tulo del v&#237;deo de YouTube (Pagina Visualizada)'
  , gEVDW: 'Expand the video details box at start (Pagina Visualizada)'
  , gEVUL: 'Mostrar "Mas de" al iniciar la pagina (Pagina Visualizada)'
  , gCVRT: 'Mostrar el cuadro "Videos Relacionados" '
  , gCVRP: 'Mostrar el cuadro "Respuestas al video" '
  , hEVUL: 'Especial: Habilitado si no hay lista de reproducci&#243;n'
  , gESAD: 'Expandir cuadro "estad&#237;sticas" al inicio (Pagina Visualizada)'
  , gCCMT: 'Cerrar el cuadro de comentarios (Pagina Visualizada)'
  , gEVDB: 'Expandir el cuadro de datos de v&#237;deo al inicio (Canal Beta)'
  , gRUNI: 'Eliminar/Ocultar los videos de promoci&#243;n'
  , gDRDD: 'Deshabilitar el dise&#241;o redondeado negro alrededor del v&#237;deo'
  , gHBYH: 'Ocultar cabecera del canal de YouTube Beta'
  , sPLST: 'Opciones de Lista de reproducci&#243;n (Necesita Recargar)'
  , gNPNS: 'Lista de reproducci&#243;n Autostart cuando no "reproducir pr&#243;ximo"'
  , gPLLP: 'Repetir Lista de Reproduccion'
  , hPLLP: 'Habilitar: Para el primero de la Caja de reproducci&#243;n / completa: Para el primero de la lista completa'
  , tKEYE: 'Acceso directo'
  , hKEYE: 'Control de teclado'
  , sKBCT: 'Control de teclado'
  , gKBCT: 'Control de teclado'
  , gRDKB: 'Definir Tecla'
  , kYEGO: 'Abrir Opciones Generales'
  , kPLPS: 'Reproducir/Pausa alternar'
  , kLOFF: 'Luces Apagadas'
  , kKILL: 'Matar / Expulsar'
  , kMUTE: 'Cambia a modo silencioso'
  , kSCBK: 'ir hacia atras'
  , kSCTV: 'Ir al video'
  , kCOLL: 'Pantalla de video: Colapsar'
  , kWIDE: 'Pantalla de video: Ancha'
  , k4DV3: 'Pantalla de video: 4/3'
  , kMR01: 'Media Resizer Boton 1'
  , kMR02: 'Media Resizer Boton 2'
  , kMR03: 'Media Resizer Boton 3'
  , kMR04: 'Media Resizer Boton 4'
  , kMR05: 'Media Resizer Boton 5'
  , kMR06: 'Media Resizer Boton 6'
  , kMR07: 'Media Resizer Boton 7'
  , kMR08: 'Media Resizer Boton MEJOR'
  , kMR09: 'Media Resizer Boton MAX'
  , kMR10: 'Media Resizer Boton RELLENAR'
  , kMR11: 'Media Resizer Boton personalizado ~1~'
  , kMR12: 'Media Resizer Boton personalizado ~2~'
  , hRKEY: 'Pulse 2 veces la ESC o la tecla de Backspace o la tecla Supr para Limpiar'
  , tMISC: 'Misc' ,hMISC: 'Otras Opciones'
  , sMISC: 'Varios (Necesita Recargar)'
  , gBAAT: 'Buffering: Cargar v&#237;deo antes de iniciar (0=Deshabilitado)'
  , gBAAF: 'Buffering: Esperar Luego iniciar (0=Deshabilitado)'
  , gPLOF: 'Enfocar Reproduccion'
  , gCFBT: 'Cambiar el aspecto de matar bot&#243;n'
  , gVPVW: 'Mostrar im&#225;genes de vista previa de v&#237;deo, cuando se pase el cursor'
  , gSINP: 'Resultados de b&#250;squeda en una nueva pesta&#241;a'
  , gLUMT: 'Luminosidad de activaci&#243;n'
  , hLUMT: 'Entre 0 (siempre claro) y 256 (siempre oscuro)'
  , gCNLD: "Pruebe Reinicie el NetStream si el v&#237;deo no se carga... (0=deshabilitada)"
  , gCNLF: "Probar Reiniciar el reproductor si el v&#237;deo no se carga... (0=deshabilitada)"
  , gBCDP: "Cambiar la vista predeterminada Canal Beta"
  , hBCDP: "p=Ver Reproductor, g=ver Cuadr&#237;cula / a=Todo, u=Cargas, f=Favoritos, p=Lista de Reproduccion"
  , gBPAC: 'Bypass Bypass Edad censor a autenticarte'
  , tCOLO: 'Colores', hCOLO: 'Opciones de Colores'
  , sLGCS: 'Configuraci&#243;n de color de Luz (Necesita Recargar)'
  , sDKCS: 'Configuraci&#243;n de color oscuro (Necesita Recargar)'
  , tOTHE: 'Otros', hOTHE: 'Otras Opciones'
  , sYEUS: 'YouTube Enhancer Actualizador'
  , gYEUI: 'Buscar Actualizacion cada... (0=deshabilitado)'
  , hYEUI: 'Entre 0 y 60'
  , gYEUV: 'Modo de enlace Visita'
  , sOMSC: 'Varios (Desaprobado/no es totalmente compatible)'
  , gFFMT: 'Forzar fmt'
  , hFFMT: '18 para HQ Calidad (mp4)'
  , gEORV: 'Actualizar el reproductor al reactivarlo'
  , hERPK: 'Habilitar recarga el reproductor despu&#233;s de matarlo'
  , oDISA: 'Deshabilitado'
  , oENAB: 'Habilitado'
  , oNORM: 'Normal'
  , oCOLL: 'Colapsar'
  , oEXPD: 'Expandir'
  , oSHOW: 'Mostrar'
  , oHIDE: 'Ocultar'
  , oATST: 'Al iniciar'
  , oBEST: 'Mejor'
  , oCMPL: 'Completo'
  , oSPEC: 'Especial'
  , odlnk: 'Enlace Directo'
  , oitab: 'En nueva Pesta&#241;a'
  , oDAYS: 'Dias'
  , oDFLT: 'Preestablecidos'
  , oAUTO: 'Auto'
  , oMEMO: 'Persistir'
  , oCUST: 'Personalizado'
  , oCNCL: 'Cancelar'
  , oSAVE: 'Guardar'
  , oRSTA: 'Resetear todo'
  , oRSTT: 'Resetear Pesta&#241;a'
  , oORIG: 'Original'
  , oEJCT: 'Expulsar'
  , uTIME: 'Tiempo'
  }
, es2: { lang: 'Espa&#241;ol (2)' // by ScorpioN48
  //=== Download Link
  , dlink: 'Descargar'
  //=== Options menu
  , omenu: 'Opciones'
  , qual1: '1: Descargar link en la calidad que se est&#225; viendo'
  , qual2: '2: Descargar link en Alta Calidad (FLV o MP4)'
  , qual3: '3: Descargar link en MP4 Alta Calidad'
  , auto1: '1: Comienzo manual'
  , auto2: '2: Comienzo cargando Buffer'
  , auto3: '3: Comienzo autom&#225;tico'
  , ytego: 'Opciones Generales de YouTube Enhancer'
  //=== Quality Selector
  , link0: 'Ver en Muy Baja Calidad (flv)'
  , link1: 'Ver en Medio Calidad (flv)'
  , link2: 'Ver en Alta Calidad (flv)'
  , link3: 'Ver en Medio Calidad (mp4)'
  , link4: 'Ver en Calidad HD 720p (mp4)'
  , link5: 'Ver en Calidad HD 1080p (mp4)'
  //=== Media Resizer
  , best: 'El v&#237;deo se agranda hasta el borde de la pantalla del navegador (Con Controlador Media)'
  , maxi: 'El v&#237;deo se agranda hasta el borde de la pantalla del navegador'
  , fill: 'El v&#237;deo se agranda para verse en toda la pantalla del navegador'
  , cst1: 'Personalizaci&#243;n 1'
  , cst2: 'Personalizaci&#243;n 2'
  , cst3: 'Personalizaci&#243;n 3'
  //=== Media Controller
  , stop:   'Parar'
  , stepb:  'Paso hacia atr&#225;s'
  , stepf:  'Paso hacia delante'
  , play:   'Reproducir / Revivir'
  , pause:  'Pausar'
  , begin:  'Comienzo'
  , loop:   'Bucle'
  , rewind: 'Rebobinar'
  , end:    'Final'
  , kill:   'Doble click para matar el NetStream (y el reproductor)'
  , embed:  'Link de aclopamiento'
  , warp:   'Link a Warp'
  , fscr:   'Link a Pantalla Completa'
  //=== Updater
  , udisa: 'El actualizador est&#225; ahora deshabilitado'
  , uenab: 'El actualizador est&#225; ahora habilitado'
  , ufoun: 'Nueva actualizaci&#243;n encontrada'
  , udnow: 'Visitar p&#225;gina de instalaci&#243;n'
  , udlat: 'Despu&#233;s'
  , ufail: 'Problema durante la busqueda de actualizaci&#243;n'
  , pinst: 'Pulsa "Update" para actualizar el script'
  }
, fr: { lang: 'Fran&#231;ais'
  //=== Download Link
  , dlink: 'T&#233;l&#233;charger'
  //=== Options menu
  , omenu: 'Options'
  , qual1: '1: Lien de t&#233;l&#233;chargement vers la vid&#233;o de m&#234;me qualit&#233; que celle affich&#233;'
  , qual2: '2: Lien de t&#233;l&#233;chargement vers la vid&#233;o en haute qualit&#233; (FLV ou MP4)'
  , qual3: '3: Lien de t&#233;l&#233;chargement vers la vid&#233;o en MP4 de haute qualit&#233;'
  , auto1: '1: D&#233;marrage manuel'
  , auto2: '2: Mise en buffer'
  , auto3: '3: D&#233;marrage automatique'
  , ytego: 'Options g&#233;n&#233;rales de Y&#111;uTube En&#104;ancer'
  //=== Quality Selector
  , link0: 'Voir en Tr&#232;s Basse Qualit&#233; (flv)'
  , link1: 'Voir en Qualit&#233; Moyenne (flv)'
  , link2: 'Voir en Haute Qualit&#233; (flv)'
  , link3: 'Voir en Qualit&#233; Moyenne (mp4)'
  , link4: 'Voir en Qualit&#233; HD 720p (mp4)'
  , link5: 'Voir en Qualit&#233; HD 1080p (mp4)'
  //=== Media Resizer
  , best: "La vid&#233;o s'agrandie jusqu'au bord de l'&#233;cran du navigateur (avec le Media Controller)"
  , maxi: "La vid&#233;o s'agrandie jusqu'au bord de l'&#233;cran du navigateur"
  , fill: "La vid&#233;o s'agrandie pour s'afficher sur tout l'&#233;cran du navigateur"
  , cst1: 'Personnalisation  1'
  , cst2: 'Personnalisation  2'
  , cst3: 'Personnalisation  3'
  //=== Media Controller
  , stop:   'Arr&#234;t'
  , stepb:  'Pas arri&#232;re'
  , stepf:  'Pas avant'
  , play:   'Lire / Relancer'
  , pause:  'Pause'
  , begin:  'D&#233;but'
  , loop:   'En boucle'
  , rewind: 'Retour arri&#232;re'
  , end:    'Fin'
  , kill:   'Double click pour stopper le NetStream (et le lecteur vid&#233;o)'
  , embed:  'Lien Embed'
  , warp:   'Lien Warp'
  , fscr:   'Lien plein &#233;cran'
  //=== Updater
  , udisa: 'La mise &#224; jour est maintenant d&#233;sactiv&#233;'
  , uenab: 'La mise &#224; jour est maintenant activ&#233;'
  , ufoun: 'Nouvelle mise &#224; jour trouv&#233;e'
  , udnow: "Visiter&nbsp;la&nbsp;page&nbsp;d'installation"
  , udlat: 'Plus&nbsp;tard'
  , ufail: 'Probl&#232;me durant le test de la mise &#224; jour'
  , pinst: 'Cliquer sur "Update" pour mettre &#224; jour le script'
  //=== General Options
  , tGRAL: 'G&#233;n&#233;ral', hGRAL: 'Options g&#233;n&#233;rales'
  , sSUBL: 'Langage (Besoin de recharger la page)'
  , gFLNG: 'Choisir la langue (vide=Auto)'
  , sVOLC: 'Volume Control (Besoin de recharger la page)'
  , gEVLC: 'Active le contr&#244;le du volume'
  , gVATS: 'Volume au d&#233;part'
  , sDLLK: 'Download Link'
  , gDLLQ: 'Choisir la qualit&#233; de la vid&#233;o que vous voulez t&#233;l&#233;charger'
  , sSBCF: 'Options de nettoyage du flashvars (Besoin de recharger la page)'
  , gCLFV: 'Nettoyage des donn&#233;es du flashvars du lecteur vid&#233;o'
  , gDANN: 'Annotations (en mode nettoyage)'
  , gDSUB: 'L&#233;gendes ou Sous-titres (en mode nettoyage)'
  , gRVAE: 'Afficher les vid&#233;os apparent&#233;s &#224; la fin (en mode nettoyage)'
  , gTYBC: 'Couleur de la barre du lecteur vid&#233;o de YouTube (en mode nettoyage)'
  , gTXTP: 'Ajoute le mode TEXTp (en mode nettoyage)'
  , hDCFV: 'D&#233;sactiv&#233; ceci ne marche que si CLEAN_FLASHVARS est activ&#233;'
  , hWCFV: 'Ne marche que si le CLEAN_FLASHVARS est activ&#233;'
  , tMRSZ: 'Media Resizer', hMRSZ: 'Options du Media Resizer'
  , sVDPO: 'Options du Media Resizer (Peut avoir besoin de recharger la page)'
  , gHDMR: 'Cacher le Media Resizer'
  , gAHC3: 'Ajoute le bouton invisible ~3~'
  , sMR43: 'Boutons pour vid&#233;o 4:3 du Media Resizer'
  , gD4VR: 'Bouton par d&#233;faut pour la vid&#233;o 4:3'
  , gC4W1: 'Largeur personnalis&#233; de la vid&#233;o 4:3 du bouton ~1~'
  , gC4H1: 'Hauteur personnalis&#233; de la vid&#233;o 4:3 du bouton ~1~'
  , gC4W2: 'Largeur personnalis&#233; de la vid&#233;o 4:3 du bouton ~2~'
  , gC4H2: 'Hauteur personnalis&#233; de la vid&#233;o 4:3 du bouton ~2~'
  , gC4W3: 'Largeur personnalis&#233; de la vid&#233;o 4:3 du bouton ~3~'
  , gC4H3: 'Hauteur personnalis&#233; de la vid&#233;o 4:3 du bouton ~3~'
  , sMRWD: 'Boutons pour vid&#233;o Wide du Media Resizer'
  , gDWVR: 'Bouton par d&#233;faut pour la vid&#233;o wide'
  , gCWW1: 'Largeur personnalis&#233; de la vid&#233;o wide du bouton ~1~'
  , gCWH1: 'Hauteur personnalis&#233; de la vid&#233;o wide du bouton ~1~'
  , gCWW2: 'Largeur personnalis&#233; de la vid&#233;o wide du bouton ~2~'
  , gCWH2: 'Hauteur personnalis&#233; de la vid&#233;o wide du bouton ~2~'
  , gCWW3: 'Largeur personnalis&#233; de la vid&#233;o wide du bouton ~3~'
  , gCWH3: 'Hauteur personnalis&#233; de la vid&#233;o wide du bouton ~3~'
  , gESTV: 'Centrer sur la vid&#233;o'
  , gEHSC: 'Cacher la barre de d&#233;filement (dans le mode BEST/MAX/FILL)'
  , hWRTV: 'Attention: recharge le lecteur video'
  , hMINW: 'minimun: 160'
  , hMINH: 'minimun: 0'
  , gMRMR: 'Vitesse du bouton du Media Resizer: r&#233;duction de pas'
  , hMRMR: '1=Imm&#233;diate / plus=Plus lent'
  , gMRTW: 'Vitesse du bouton du Media Resizer: Intervalle'
  , hMRTW: '1=Rapide mais demande plus de ressources / plus=Plus lent'
  , tQSEL: 'Quality Selector', hQSEL: 'Options du Quality Selector'
  , sQSOT: 'Options du Quality Selector (Peut avoir besoin de recharger la page)'
  , gHDQS: 'Cacher le Quality Selector'
  , gQSAU: 'Essaye de retrouver les autres qualit&#233;s de la vid&#233;o'
  , gQSAC: 'Recharger le lecteur video &#224; chaque nouvelle qualit&#233; trouv&#233;'
  , gFHDB: 'Selectionne la meilleure qualit&#233; vid&#233;o'
  , gRM22: "Ne pas selectionnner en mode auto la qualit&#233; HD 720p (fmt=22)"
  , gRM37: "Ne pas selectionnner en mode auto la qualit&#233; HD 1080p (fmt=37)"
  , hQSAU: 'Met &#224; jour le fmt_map'
  , sLOOT: "Options de l'assombrisseur"
  , gLOAS: "Utiliser l'assombrisseur au d&#233;part"
  , gLOCL: "Couleur de l'assombrisseur"
  , gLOPO: "Opacit&#233; de l'assombrisseur pour la page"
  , gLOBD: "Assombrisseur: Affichage de la barre du lecteur vid&#233;o"
  , gLOBO: "Opacit&#233; de l'assombrisseur pour la barre du lecteur vid&#233;o"
  , hLOBO: 'entre 0 et 100 / pour wmode=opaque ou wmode=transparent'
  , hB100: 'entre 0 et 100'
  , tMCTR: 'Media Controller', hMCTR: 'Options du Media Controller'
  , sMCOT: 'Options du Media Controller (Besoin de recharger la page)'
  , gHMCW: 'Cacher le Media Controller (watch page)'
  , gHMCB: 'Cacher le Media Controller (beta channel)'
  , gFPWM: 'Choisir le wmode &#224; utiliser dans la watch page (vide=Auto)'
  , gFPQT: 'Choisir la qualit&#233; &#224; utiliser dans la watch page (vide=Auto)'
  , gFPWB: 'Choisir le wmode &#224; utiliser dans le beta channel (vide=Auto)'
  , gFPQB: 'Choisir la qualit&#233; &#224; utiliser dans le beta channel (vide=Auto)'
  , gMCLS: 'Utiliser la lecture en boucle au d&#233;part'
  , gCFBT: "Changer l'aspect du bouton Eject"
  , sAUPL: 'Lecture automatique (Besoin de recharger la page)'
  , gAPLW: 'Lecture automatique (watch page)'
  , gAPLB: 'Lecture automatique (beta channel)'
  , gBAAT: "Buffer: Chargement Vid&#233;o avant le d&#233;part (0=desactiv&#233;)"
  , gBAAF: "Buffer: Temps d'attente avant le d&#233;part (0=desactiv&#233;)"
  , gPLOF: 'Lecture d&#232;s le focus'
  , gATPL: "Changer la lecture automatique d&#232;s la lecture d'une playlist"
  , gATQL: "Changer la lecture automatique d&#232;s la lecture d'une file d'attente"
  , gATOL: "Changer la lecture automatique d&#232;s la lecture d'un autre type de liste"
  , gRWWB: "Retour arri&#232;re si le lecteur passe en mode buffer"
  , tDISP: 'Affichage', hDISP: "Options d'affichage de YouTube"
  , sWPDP: "Options d'affichage (Peut avoir besoin de recharger la page)"
  , gVPVW: 'Afficher une image de preview sur la video'
  , gHTHD: 'Cacher la barre de titre YouTube de la vid&#233;o (watch page)'
  , gEVDW: 'Etendre la fen&#234;tre de d&#233;tails de la vid&#233;o au d&#233;part (watch page)'
  , gEVUL: 'Affichage de la fen&#234;tre "Autres vid&#233;o de" au d&#233;part (watch page)'
  , gCVRT: 'Affichage de la fen&#234;tre des vid&#233;os similaires'
  , gCVRP: 'Affichage de la fen&#234;tre des commentaires vid&#233;o'
  , hEVUL: "Special: Activ&#233; si il n'y a pas de playlist"
  , gESAD: 'Etendre la fen&#234;tre "Statistiques" au d&#233;part (watch page)'
  , gCCMT: 'Fermer/Cacher la fen&#234;tre des commentaires'
  , gEVDB: 'Etendre la fen&#234;tre de d&#233;tails de la vid&#233;o au d&#233;part (beta channel)'
  , gRLGB: 'Supprime la stupide fen&#234;tre bleu de langage'
  , gRUNI: 'Retirer/cacher les vid&#233;os promus'
  , gDRDD: "D&#233;sactiv&#233; l'entourrage noir autour du lecteur vid&#233;o"
  , gHBYH: "Cacher l'en-t&#234;te YouTube dans le Beta channel"
  , sPLST: 'Options sur les playlists de Youtube (Besoin de recharger la page)'
  , gNPNS: 'D&#233;marrage automatique de la playlist quand pas de "playnext"'
  , gPLLP: 'PlayList en boucle'
  , hPLLP: 'Activ&#233;: Au premier de la fen&#234;tre playlist / Complet: Au premier de la playlist enti&#232;re'
  , gQLAP: 'D&#233;marrage auto du Pense-b&#234;te (GoogleWatch)'
  , tKEYE: 'Clavier', hKEYE: 'Raccourcis clavier'
  , sKBCT: 'Keyboard Control'
  , gKBCT: 'Raccourcis clavier'
  , gRDKB: 'Red&#233;finir les raccourcis clavier'
  , kYEGO: 'Ouvre les options g&#233;n&#233;rales'
  , kPLPS: 'Lecture ou Pause'
  , kLOFF: 'Assombrisseur'
  , kKILL: 'Eject'
  , kMUTE: 'Muet'
  , kSCBK: 'Retour du d&#233;filement'
  , kSCTV: 'D&#233;filement sur la vid&#233;o'
  , kCOLL: 'Affichage video: Effondrement'
  , kWIDE: 'Affichage video: Wide'
  , k4DV3: 'Affichage video: 4/3'
  , kMR01: 'Button 1 du Media Resizer'
  , kMR02: 'Button 2 du Media Resizer'
  , kMR03: 'Button 3 du Media Resizer'
  , kMR04: 'Button 4 du Media Resizer'
  , kMR05: 'Button 5 du Media Resizer'
  , kMR06: 'Button 6 du Media Resizer'
  , kMR07: 'Button 7 du Media Resizer'
  , kMR08: 'Button BEST du Media Resizer'
  , kMR09: 'Button MAX du Media Resizer'
  , kMR10: 'Button FILL du Media Resizer'
  , kMR11: 'Button de personnalisation ~1~ du Media Resizer'
  , kMR12: 'Button de personnalisation ~2~ du Media Resizer'
  , hRKEY: 'Appuyer 2 fois sur la touche Echap, Retour arri&#232;re ou Suppr pour effacer'
  , tMISC: 'Divers' ,hMISC: 'Miscellaneous Options'
  , sMISC: 'Divers (Peut avoir besoin de recharger la page)'
  , gCNLD: "Relancer le NetStream si la vid&#233;o ne se charge pas, Essaye..."
  , gCNLF: "Relancer le lecteur vid&#233;o si la vid&#233;o ne se charge pas, Essaye..."
  , gSINP: 'Les resultats de recherche vont sur une nouvelle page'
  , gBCDP: "Change la page par d&#233;faut du Beta Channel"
  , gLUMT: 'D&#233;clencheur sur la luminosit&#233;'
  , hLUMT: 'entre 0 (toujours lumineux) et 256 (toujours sombre)'
  , gBPAC: "Contourner la censure sur l'&#226;ge sans se connecter &#224; un compte"
  , tCOLO: 'Couleurs', hCOLO: 'Options sur les couleurs'
  , sLGCS: 'Choix des couleurs lumineuses (Peut avoir besoin de recharger la page)'
  , sDKCS: 'Choix des couleurs sombres (Peut avoir besoin de recharger la page)'
  , tOTHE: 'Autres', hOTHE: 'Autres Options'
  , sYEUS: 'YouTube Enhancer Updater'
  , gYEUI: 'Tester la mise &#224; jour de YouTube Enhancer tous les... (0=desactiv&#233;)'
  , hYEUI: 'entre 0 et 60'
  , gYEUV: 'Mode du lien de visite'
  , sOMSC: 'Divers (Obsol&#232;te/Pas totalement support&#233;)'
  , gFFMT: 'Forcer le fmt'
  , hFFMT: '18 pour une qualit&#233; moyenne en mp4'
  , gEORV: 'Recharger le lecteur vid&#233;o durant la relance'
  , hERPK: "Active le rechargement du lecteur video apres l'avoir stopp&#233;"
  , oDISA: 'Desactiv&#233;'
  , oENAB: 'Activ&#233;'
  , oNORM: 'Normal'
  , oCOLL: 'Fermer'
  , oEXPD: 'Ouvrir'
  , oSHOW: 'Visible'
  , oHIDE: 'Cach&#233;'
  , oATST: 'Au d&#233;part'
  , oBEST: 'Au mieux'
  , oCMPL: 'Complet'
  , oSPEC: 'Sp&#233;cial'
  , odlnk: 'Lien direct'
  , oitab: 'Dans onglet'
  , oDAYS: 'jours'
  , oDFLT: 'Defaut'
  , oAUTO: 'Auto'
  , oMEMO: 'Persistent'
  , oCUST: 'Perso'
  , oCNCL: 'Annuler'
  , oSAVE: 'Valider'
  , oRSTA: 'RAZ Tout'
  , oRSTT: 'RAZ Onglet'
  , oORIG: 'Original'
  , oEJCT: 'Eject'
  , uTIME: 'fois'
  , oSAME: 'Pareil'
  , oAOFF: 'Manuel'
  , oABUF: 'Buffer'
  , oAPON: 'Automatique'
  }
, hi: { lang: '&#2361;&#2367;&#2344;&#2381;&#2342;&#2368;'
  , dlink: '&#2337;&#2366;&#2313;&#2344;&#2354;&#2379;&#2337;'
  }
, it: { lang: 'Italiano' // By Roccobot
  , dlink: 'Scarica'
  , omenu: 'Impostazioni'
  , qual1: '1. Scarica il video alla qualit&#224; visualizzata'
  , qual2: '2. Scarica il video ad alta qualit&#224; (FLV o MP4)'
  , qual3: '3. Scarica il video MP4 ad alta qualit&#224;'
  , auto1: '1. Riproduzione: Play manuale'
  , auto2: '2. Riproduzione: Solo buffering'
  , auto3: '3. Riproduzione: Autoplay'
  , ytego: 'Impostazioni di YouTube Enhancer'
  , link1: 'Visualizza in bassa qualit&#224; (flv)'
  , link2: 'Visualizza in alta qualit&#224; (flv)'
  , link3: 'Visualizza in alta qualit&#224; (mp4)'
  , link4: 'Visualizza in qualit&#224; HD (mp4)'
  , stop:   'Stop'
  , stepb:  'Un frame indietro'
  , stepf:  'Un frame avanti'
  , play:   'Play / Pausa'
  , pause:  'Pausa'
  , begin:  'Inizio intervallo'
  , loop:   'Loop'
  , rewind: "Torna all'inizio"
  , end:    'Fine intervallo'
  , kill:   'Doppio clic per fermare il video e terminare il video player'
  , embed:  'Embed Link'
  , fscr:   'Embed Link (a tutto schermo)' 
  }
, ja: { lang: '&#26085;&#26412;&#35486;'
  , dlink: '&#12480;&#12454;&#12531;&#12525;&#12540;&#12489;'
  , omenu: '&#12458;&#12503;&#12471;&#12519;&#12531;'
  , qual1: '1: &#12480;&#12454;&#12531;&#12525;&#12540;&#12489;&#12522;&#12531;&#12463;&#12434;&#35373;&#23450;&#12377;&#12427;&#12398;&#38322;&#35239;&#12289;&#12499;&#12487;&#12458;&#12398;&#21697;&#36074;&#12392;&#21516;&#12376;'
  , qual2: '2: &#39640;&#21697;&#36074;&#12398;&#12499;&#12487;&#12458;&#12501;&#12449;&#12452;&#12523;&#65288;FLV&#12398;&#12458;&#12524;&#12468;&#12531;&#12398;MP4&#65289;&#12395;&#35373;&#23450;&#12480;&#12454;&#12531;&#12525;&#12540;&#12489;&#12522;&#12531;&#12463;'
  , qual3: '3: &#12399;&#12289;&#39640;&#21697;&#36074;&#12398;&#12499;&#12487;&#12458;&#12434;&#35373;&#23450;&#12377;&#12427;&#12398;MP4&#12501;&#12449;&#12452;&#12523;&#12398;&#12480;&#12454;&#12531;&#12525;&#12540;&#12489;&#12522;&#12531;&#12463;'
  , auto1: '1: &#12510;&#12491;&#12517;&#12450;&#12523;'
  , auto3: '3: &#33258;&#21205;&#36215;&#21205;'
  , link1: '&#23550;&#35937;&#20302;&#21697;&#36074; (flv)'
  , link2: '&#39640;&#21697;&#36074;&#34920;&#31034; (flv)'
  , link3: '&#39640;&#21697;&#36074;&#34920;&#31034; (mp4)'
  , link4: 'HD&#12391;&#12398;&#34920;&#31034;&#21697;&#36074; (mp4)'
  , stop:   '&#20572;&#27490;&#12377;&#12427;'
  , stepb:  '&#24460;&#36864;'
  , stepf:  '&#19968;&#27497;&#21069;&#36914;'
  , play:   '&#35501;&#21462;&#12426; / &#20877;&#36215;&#21205;'
  , pause:  '&#22730;&#12377;'
  , begin:  '&#38283;&#22987;&#12377;&#12427;'
  , loop:   '&#12523;&#12540;&#12503;'
  , rewind: '&#24059;&#12365;&#25147;&#12375;'
  , end:    '&#32066;&#12431;&#12426;'
  , kill:   '&#12480;&#12502;&#12523;&#12463;&#12522;&#12483;&#12463;&#12377;&#12427;&#12392;&#12289; NetStream&#12392;&#12399;&#12289;&#12503;&#12524;&#12540;&#12516;&#12540;&#12434;&#27578;&#12377;&#12383;&#12417;&#12395;'
  , embed:  'Embed &#12522;&#12531;&#12463;'
  , fscr:   '&#12501;&#12523;&#12473;&#12463;&#12522;&#12540;&#12531;&#12398;&#12522;&#12531;&#12463;'
  }
, ko: { lang: '&#54620;&#44397;&#50612;'
  , dlink: '&#45796;&#50868;&#47196;&#46300;'
  , omenu: '&#50741;&#49496;'
  , qual1: '1: &#49444;&#51221; &#45796;&#50868;&#47196;&#46300; &#47553;&#53356;&#47484; &#48380; &#48708;&#46356;&#50724;&#51032; &#54408;&#51656;&#51008; &#46041;&#51068;'
  , qual2: '2: &#45458;&#51008; &#54408;&#51656;&#51032; &#48708;&#46356;&#50724; &#54028;&#51068; (&#45824;&#54620; FLV &#46608;&#45716;&#45716; MP4)&#47196; &#49444;&#51221; &#45796;&#50868;&#47196;&#46300; &#47553;&#53356;'
  , qual3: '3: a&#45716; MP4 &#44256;&#54408;&#51656; &#46041;&#50689;&#49345;&#51004;&#47196; &#49444;&#51221; &#54028;&#51068; &#45796;&#50868;&#47196;&#46300; &#47553;&#53356;'
  , auto1: '1: &#47588;&#45684;&#50620;'
  , auto3: '3: &#51088;&#46041;'
  , link1: '&#51200;&#44032;&#50640; &#54408;&#51656;&#48372;&#44592; (flv)'
  , link2: '&#48372;&#44592;&#50640; &#54408;&#51656; &#45458;&#51008; (flv)'
  , link3: '&#48372;&#44592;&#50640; &#54408;&#51656; &#45458;&#51008; (mp4)'
  , link4: 'HD&#50640;&#49436; &#54408;&#51656; &#54217;&#44032;&#48372;&#44592; (mp4)'
  , stop:   '&#47688;&#52628;&#45796;'
  , stepb:  '&#46244;&#47196; &#47932;&#47084;&#49436;'
  , stepf:  '&#50526;&#51004;&#47196;'
  , play:   '&#51069;&#44592; / &#45796;&#49884; &#49884;&#51089;'
  , pause:  '&#55092;&#49885;'
  , begin:  '&#49884;&#51089;'
  , loop:   '&#47336;&#54532;'
  , rewind: '&#46104;&#44048;&#44592;'
  , end:    '&#45149;'
  , kill:   'NetStream&#51012; &#45908;&#48660; &#53364;&#47533;&#54616;&#44256; &#54540;&#47112;&#51060;&#50612;&#47484; &#51453;&#51060;&#44256;'
  , embed:  'Embed &#47553;&#53356;'
  , fscr:   '&#51204;&#52404; &#47553;&#53356;'
  }
, nl: { lang: 'Nederlands'
  , dlink: 'Downloaden'
  , omenu: 'Opties'
  , qual1: '1: Stel download link naar dezelfde kwaliteit van de video bekeken'
  , qual2: '2: Stel download link naar een High Quality video bestand (of MP4 FLV)'
  , qual3: '3: Stel download link naar een MP4 High Quality video bestand'
  , auto1: '1: Zet autoplay uit'
  , auto3: '3: Zet autoplay aan'
  , link1: 'Bekijk in lage kwaliteit (flv)'
  , link2: 'Bekijk in hoge kwaliteit (flv)'
  , link3: 'Bekijk in hoge kwaliteit (mp4)'
  , link4: 'Bekijk in HD kwaliteit (mp4)'
  , stop:   'Stop'
  , stepb:  'Stap terug'
  , stepf:  'Stap voorwaarts'
  , play:   'Lees / Restart'
  , pause:  'Pauze'
  , begin:  'Beginnen'
  , loop:   'Loop'
  , rewind: 'Rewind'
  , end:    'Eindigen'
  , kill:   'Dubbelklik tot de dood van de NetStream en de speler'
  , embed:  'Embed Koppelen'
  , fscr:   'Fullscreen Link'
  }
, pl: { lang: 'Polski' // by 'blindrood'
  //=== Download Link
  , dlink: 'Pobierz'
  //=== Options menu
  , omenu: 'Opcje'
  , qual1: '1: Ustaw link do pobierania na tak&#261; sam&#261; jako&#347;&#263; co ogl&#261;dany film'
  , qual2: '2: Ustaw link do pobierania na plik w wysokiej jako&#347;ci (FLV lub MP4)'
  , qual3: '3: Ustaw link do pobierania na plik MP4 w wysokiej jako&#347;ci'
  , auto1: '1: Wy&#322;&#261;cz Autoodtwarzanie'
  , auto2: '2: Ustaw Autoodtwarzanie na buforowanie'
  , auto3: '3: W&#322;&#261;cz Autoodtwarzanie'
  , ytego: 'Opcje og&#243;lne YouTube Enhancer'
  //=== Quality Selector
  , link0: 'Ogl&#261;daj w bardzo niskiej jako&#347;ci (flv)'
  , link1: 'Ogl&#261;daj w niskiej jako&#347;ci (flv)'
  , link2: 'Ogl&#261;daj w wysokiej jako&#347;ci (flv)'
  , link3: 'Ogl&#261;daj w wysokiej jako&#347;ci (mp4)'
  , link4: 'Ogl&#261;daj w jako&#347;ci HD (mp4)'
  //=== Media Resizer
  , best: 'Wype&#322;nij okno wewn&#261;trz(z paskiem post&#281;pu)'
  , maxi: 'Wype&#322;nij okno wewn&#261;trz'
  , fill: 'Wype&#322;nij okno na zewn&#261;trz'
  , cst1: 'niestandardowy 1'
  , cst2: 'niestandradowy 2'
  , cst3: 'niestandradowy 3'
  //=== Media Controller
  , stop:   'Stop'
  , stepb:  'Do ty&#322;u'
  , stepf:  'Do przodu'
  , play:   'Odtw&#243;rz / Wzn&#243;w'
  , pause:  'Pauza'
  , begin:  'Na pocz&#261;tek'
  , loop:   'Odtwarzaj w p&#281;tli'
  , rewind: 'Przewi&#324;'
  , end:    'Na koniec'
  , kill:   'Kliknij dwukrotnie by przerwa&#263; pobieranie (i odtwarzanie)'
  , embed:  'link do zagnie&#380;d&#380;ania'
  , fscr:   'Odtwarzaj w pe&#322;nym oknie'
  //=== Updater
  , udisa: 'Aktualizacje s&#261; wy&#322;&#261;czone'
  , uenab: 'Aktualicaje s&#261; w&#322;&#261;czone'
  , ufoun: 'Znaleziono now&#261; aktualizacj&#281;'
  , udnow: 'Odwied&#378; stron&#281; instalacyjn&#261;'
  , udlat: 'P&#243;&#378;niej'
  , ufail: 'Wyst&#261;pi&#322; problem podczas sprawdzania aktualizacji'
}
, pt: { lang: 'Portugu&#234;s'
  , dlink: 'Baixar'
  , omenu: 'Op&#231;&#245;es'
  , qual1: '1: Liga&#231;&#227;o ajustada de transfer&#234;ncia &#224; mesma qualidade do v&#237;deo visto'
  , qual2: '2: Liga&#231;&#227;o ajustada de transfer&#234;ncia a uma lima video da alta qualidade (FLV ou MP4)'
  , qual3: '3: Liga&#231;&#227;o ajustada de transfer&#234;ncia a uma lima video da alta qualidade MP4'
  , auto1: '1: Arranque manual'
  , auto3: '3: Arranque autom&#225;tico'
  , link1: 'Vista na m&#225; qualidade (flv)'
  , link2: 'Vista na alta qualidade (flv)'
  , link3: 'Vista na alta qualidade (mp4)'
  , link4: 'Ver na qualidade HD (mp4)'
  , stop:   'Ac&#243;rd&#227;o'
  , stepb:  'Passo para tr&#225;s'
  , stepf:  'Passo em frente'
  , play:   'Ler / relan&#231;ar'
  , pause:  'Pausa'
  , begin:  'Comece'
  , loop:   'La&#231;o'
  , rewind: 'Rebobina&#231;&#227;o'
  , end:    'Fim'
  , kill:   'Clique dobro para matar o NetStream e o jogador'
  , embed:  'Liga&#231;&#227;o de Embed'
  , fscr:   'Liga&#231;&#227;o da tela cheia'
  }
, ru: { lang: 'Pycc&#312;&#1080;&#1081;'
  , dlink: '&#1089;&#1082;&#1072;&#1095;&#1072;&#1090;&#1100;'
  , omenu: '&#1042;&#1072;&#1088;&#1080;&#1072;&#1085;&#1090;&#1086;&#1074;'
  , qual1: '1: &#1059;&#1089;&#1090;&#1072;&#1085;&#1086;&#1074;&#1080;&#1090;&#1100; &#1089;&#1089;&#1099;&#1083;&#1082;&#1091; &#1085;&#1072; &#1090;&#1086;&#1090; &#1078;&#1077; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1072; &#1088;&#1072;&#1089;&#1089;&#1084;&#1072;&#1090;&#1088;&#1080;&#1074;&#1072;&#1077;&#1090;&#1089;&#1103; &#1074;&#1080;&#1076;&#1077;&#1086;'
  , qual2: '2: &#1059;&#1089;&#1090;&#1072;&#1085;&#1086;&#1074;&#1082;&#1072; &#1089;&#1077;&#1090;&#1080; &#1089;&#1074;&#1103;&#1079;&#1080; &#1089; &#1074;&#1099;&#1089;&#1086;&#1082;&#1080;&#1084; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; &#1074;&#1080;&#1076;&#1077;&#1086; &#1092;&#1072;&#1081;&#1083;&#1086;&#1074; (FLV &#1080;&#1083;&#1080; MP4)'
  , qual3: '3: &#1059;&#1089;&#1090;&#1072;&#1085;&#1086;&#1074;&#1080;&#1090;&#1100; &#1089;&#1089;&#1099;&#1083;&#1082;&#1091; &#1085;&#1072; MP4 &#1074;&#1099;&#1089;&#1086;&#1082;&#1086;&#1075;&#1086; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1072; &#1074;&#1080;&#1076;&#1077;&#1086;-&#1092;&#1072;&#1081;&#1083;'
  , auto1: '1: &#1056;&#1091;&#1082;&#1086;&#1074;&#1086;&#1076;&#1089;&#1090;&#1074;&#1086;'
  , auto3: '3: &#1040;&#1074;&#1090;&#1086;&#1084;&#1072;&#1090;&#1080;&#1095;&#1077;&#1089;&#1082;&#1080;&#1081; &#1087;&#1091;&#1089;&#1082;'
  , link1: '&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1089; &#1085;&#1080;&#1079;&#1082;&#1080;&#1084; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; (flv)'
  , link2: '&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1089; &#1074;&#1099;&#1089;&#1086;&#1082;&#1080;&#1084; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; (flv)'
  , link3: '&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1089; &#1074;&#1099;&#1089;&#1086;&#1082;&#1080;&#1084; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; (mp4)'
  , link4: '&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1074; HD &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1072; (mp4)'
  , stop:   '&#1054;&#1089;&#1090;&#1072;&#1085;&#1086;&#1074;&#1082;&#1072;'
  , stepb:  '&#1096;&#1072;&#1075; &#1085;&#1072;&#1079;&#1072;&#1076;'
  , stepf:  '&#1096;&#1072;&#1075; &#1074;&#1087;&#1077;&#1088;&#1077;&#1076;'
  , play:   '&#1055;&#1088;&#1086;&#1095;&#1080;&#1090;&#1072;&#1090;&#1100; / &#1055;&#1077;&#1088;&#1077;&#1079;&#1072;&#1075;&#1088;&#1091;&#1079;&#1082;&#1072;'
  , pause:  '&#1055;&#1077;&#1088;&#1077;&#1088;&#1099;&#1074;'
  , begin:  '&#1053;&#1072;&#1095;&#1072;&#1090;&#1100;'
  , loop:   '&#1055;&#1077;&#1090;&#1083;&#1103;'
  , rewind: '&#1055;&#1077;&#1088;&#1077;&#1084;&#1086;&#1090;&#1082;&#1072;'
  , end:    '&#1050;&#1086;&#1085;&#1077;&#1094;'
  , kill:   '&#1044;&#1074;&#1072;&#1078;&#1076;&#1099; &#1097;&#1077;&#1083;&#1082;&#1085;&#1080;&#1090;&#1077; &#1091;&#1073;&#1080;&#1090;&#1100; NetStream &#1080; &#1080;&#1075;&#1088;&#1086;&#1082;'
  , embed:  'Embed &#1057;&#1089;&#1099;&#1083;&#1082;&#1072;'
  , fscr:   'Fullscreen &#1089;&#1089;&#1099;&#1083;&#1082;&#1072;'
  }
, sv: { lang: 'Svenska' // Johan Fredin (Komsip at userscripts.org) komsip@komsip.se
  //=== Download Link
  , dlink: 'H&#228;mta'
  //=== Options menu
  , omenu: 'Alternativ'
  , qual1: '1: S&#228;tt nedladdningsl&#228;nk till samma kvalitet som visad video'
  , qual2: '2: S&#228;tt nedladdningsl&#228;nk till en videofil av h&#246;g kvalitet (FLV eller MP4)'
  , qual3: '3: S&#228;tt nedladdningsl&#228;nk till en MP4 Videofil av h&#246;g kvalitet'
  , auto1: '1: St&#228;ng av automatisk uppspelning'
  , auto2: '2: S&#228;tt automatisk uppspelning till buffring'
  , auto3: '3: S&#228;tt p&#229; automatisk uppspelning'
  , ytego: 'You&#84;ube Enh&#97;nce&#114; Allm&#228;nna inst&#228;llningar'
  //=== Quality Selector
  , link0: 'Visa i mycket l&#229;g kvalitet (flv)'
  , link1: 'Visa i medium kvalitet (flv)'
  , link2: 'Visa i h&#246;g kvalitet (flv)'
  , link3: 'Visa i medium kvalitet (mp4)'
  , link4: 'Visa i 720p HD kvalitet (mp4)'
  , link5: 'Visa i 1080p HD kvalitet (mp4)'
  //=== Media Resizer
  , best: 'R&#246;r f&#246;nster fr&#229;n insidan (med mediakontroller)'
  , maxi: 'R&#246;r f&#246;nster fr&#229;n insidan'
  , fill: 'R&#246;r f&#246;nster fr&#229;n utsidan'
  , cst1: 'Personlig inst&#228;llning 1'
  , cst2: 'Personlig inst&#228;llning 2'
  , cst3: 'Personlig inst&#228;llning 3'
  //=== Media Controller
  , stop:   'Stanna'
  , stepb:  'Stega bak&#229;t'
  , stepf:  'Stega fram&#229;t'
  , play:   'Spela / &#196;teruppliva'
  , pause:  'Pausa'
  , begin:  'B&#246;rja'
  , loop:   'Loopa'
  , rewind: 'Spola tillbaka'
  , end:    'Avsluta'
  , kill:   'Dubbelklicka f&#246;r att d&#246;da NetStream (och spelaren)'
  , embed:  'B&#228;dda in l&#228;nk'
  , warp:   'F&#246;rvr&#228;ng l&#228;nk'
  , fscr:   'Fullsk&#228;rmsl&#228;nk'
  //=== Updater
  , udisa: 'Uppdaterare &#228;r nu inaktiverad'
  , uenab: 'Uppdaterare &#228;r nu aktiverad'
  , ufoun: 'Ny uppdatering hittad'
  , udnow: 'Bes&#246;k installationssidan'
  , udlat: 'Senare'
  , ufail: 'Problem under kontroll av uppdatering'
  , pinst: 'Klicka p&#229; "Uppdatera" f&#246;r att uppdatera skriptet'
  //=== General Options
  , gYEGO: '&#89;OUT&#85;BE E&#78;HA&#78;CER ALLM&#196;NNA ALTERNATIV'
  , tGRAL: 'Allm&#228;nt', hGRAL: 'Allm&#228;nna alternativ'
  , sSUBL: 'Spr&#229;k (beh&#246;ver laddas om)'
  , gFLNG: 'V&#228;lj spr&#229;k (Blankt=Auto)'
  , sVOLC: 'Volymkontroll (beh&#246;ver laddas om)'
  , gEVLC: 'Aktivera volymkontroll'
  , gVATS: 'Volym vid start'
  , sDLLK: 'Nedladdningsl&#228;nk'
  , gDLLQ: 'V&#228;lj den kvalitet f&#246;r video som du vill ladda ned'
  , sSBCF: 'Rensa flashvars alternativ (beh&#246;ver laddas om)'
  , gCLFV: 'Rensa videons flashvars'
  , gDANN: 'Anteckningar (i uppst&#228;dningsl&#228;ge)'
  , gDSUB: 'Bildtexter eller undertexter (i uppst&#228;dningsl&#228;ge)'
  , gRVAE: 'Visa relaterade videor p&#229; slutet (i uppst&#228;dningsl&#228;ge)'
  , gTYBC: 'F&#228;ltf&#228;rg hos YouTube Player (i uppst&#228;dningsl&#228;ge)'
  , hDCFV: 'inaktivering av det h&#228;r fungerar bara n&#228;r CLEAN_FLASHVARS &#228;r aktiverat'
  , hWCFV: 'fungerar bara n&#228;r CLEAN_FLASHVARS &#228;r aktiverat'
  , tMRSZ: 'Media-storleks&#228;ndring', hMRSZ: 'Alternativ f&#246;r media-storleks&#228;ndring'
  , sVDPO: 'Alternativ f&#246;r media-storleks&#228;ndring (kan beh&#246;va laddas om)'
  , gHDMR: 'D&#246;lj media-storleks&#228;ndring' 
  , gAHC3: 'L&#228;gg till dold knapp ~3~'
  , sMR43: 'Media-storleks&#228;ndring f&#246;r 4:3, anpassade knappar'
  , gD4VR: 'Standardknapp f&#246;r 4:3-video'
  , gC4W1: 'Anpassad breddstorlek f&#246;r 4:3-video f&#246;r knapp ~1~'
  , gC4H1: 'Anpassad h&#246;jdstorlek f&#246;r 4:3-video f&#246;r knapp ~1~'
  , gC4W2: 'Anpassad breddstorlek f&#246;r 4:3-video f&#246;r knapp ~2~'
  , gC4H2: 'Anpassad h&#246;jdstorlek f&#246;r 4:3-video f&#246;r knapp ~2~'
  , gC4W3: 'Anpassad breddstorlek f&#246;r 4:3-video f&#246;r knapp ~3~'
  , gC4H3: 'Anpassad h&#246;jdstorlek f&#246;r 4:3-video f&#246;r knapp ~3~'
  , sMRWD: 'Media-storleks&#228;ndring f&#246;r bredbild, anpassade knappar'
  , gDWVR: 'Standardknapp f&#246;r bredbildsvideo'
  , gCWW1: 'Anpassad breddstorlek f&#246;r bredbildsvideo f&#246;r knapp ~1~'
  , gCWH1: 'Anpassad h&#246;jdstorlek f&#246;r bredbildsvideo f&#246;r knapp ~1~'
  , gCWW2: 'Anpassad breddstorlek f&#246;r bredbildsvideo f&#246;r knapp ~2~'
  , gCWH2: 'Anpassad h&#246;jdstorlek f&#246;r bredbildsvideo f&#246;r knapp ~2~'
  , gCWW3: 'Anpassad breddstorlek f&#246;r bredbildsvideo f&#246;r knapp ~3~'
  , gCWH3: 'Anpassad h&#246;jdstorlek f&#246;r bredbildsvideo f&#246;r knapp ~3~'
  , gESTV: 'Rulla till videon'
  , gEHSC: 'D&#246;lj rullningslist (i B&#196;STA/MAX/FYLL-l&#228;ge)'
  , hWRTV: 'varning: ladda om videon'
  , hMINW: 'minimum: 160'
  , hMINH: 'minimum: 0'
  , gMRMR: 'Media-storleks&#228;ndring, hastighet vid knapptryck: Minskning i steg'
  , hMRMR: '1=Omedelbar / Mer=L&#229;ngsammare'
  , gMRTW: 'Media-storleks&#228;ndring, hastighet vid knapptryck: Intervall'
  , hMRTW: '1=Snabbast, men processorintensiv / Mer=L&#229;ngsammare'
  , tQSEL: 'Kvalitetsv&#228;ljare', hQSEL: 'Alternativ f&#246;r kvalitetsv&#228;ljare'
  , sQSOT: 'Alternativ f&#246;r kvalitetsv&#228;ljare (kan beh&#246;va laddas om)'
  , gHDQS: 'D&#246;lj kvalitetsv&#228;ljare'
  , gQSAU: 'F&#246;rs&#246;k att h&#228;mta annan tillg&#228;nglig videokvalitet'
  , gQSAC: 'Ladda om spelaren f&#246;r varje slutf&#246;rd h&#228;mtningskontroll'
  , gFHDB: 'V&#228;lj automatiskt b&#228;st kvalitet'
  , gRM22: "V&#228;lj inte automatiskt 720p HD-kvalitet (fmt=22)"
  , gRM37: "V&#228;lj inte automatiskt 1080p HD-kvalitet (fmt=37)"
  , hQSAU: 'Uppdatera fmt_map'
  , sLOOT: 'Alternativ f&#246;r sl&#228;ck ljuset'
  , gLOAS: 'Sl&#228;ck ljuset vid start'
  , gLOCL: 'F&#228;rg f&#246;r sl&#228;ck ljuset'
  , gLOPO: 'Sl&#228;ck ljuset opacitet f&#246;r sidan'
  , gLOBO: 'Sl&#228;ck ljuset opacitet f&#246;r YouTube-f&#228;ltet'
  , hLOBO: 'mellan 0 och 100 / f&#246;r wmode=opaque eller wmode=transparent'
  , hB100: 'mellan 0 och 100'
  , tMCTR: 'Media-kontroller', hMCTR: 'Alternativ f&#246;r media-kontroller'
  , sMCOT: 'Alternativ f&#246;r media-kontroller (beh&#246;ver laddas om)'
  , gHMCW: 'D&#246;lj media-kontroller (visningssida)'
  , gHMCB: 'D&#246;lj media-kontroller (beta-kanal)'
  , gFPWM: 'V&#228;lj wmode att anv&#228;nda p&#229; visningssidan (blank=automatisk)'
  , gFPQT: 'V&#228;lj kvalitet att anv&#228;nda p&#229; visningssidan (blank=automatisk)'
  , gFPWB: 'V&#228;lj wmode att anv&#228;nda p&#229; beta-kanal (blank=automatisk)'
  , gFPQB: 'V&#228;lj kvalitet att anv&#228;nda p&#229; beta-kanal (blank=automatisk)'
  , gMCLS: 'Anv&#228;nd loop vid start'
  , sAUPL: 'Automatisk uppspelning (beh&#246;ver laddas om)'
  , gAPLW: 'Automatisk uppspelning (visningssidan)'
  , gAPLB: 'Automatisk uppspelning (beta-kanal)'
  , gRWWB: 'Spola tillbaka under buffring'
  , tDISP: 'Visning', hDISP: 'Alternativ f&#246;r YouTube-visning'
  , sWPDP: 'Alternativ f&#246;r visning (kan beh&#246;va laddas om)'
  , gRLGB: 'Ta bort den dumma bl&#229; spr&#229;krutan'
  , gHTHD: 'D&#246;lj videons YouTube-titelruta (visningssidan)'
  , gEVDW: 'Expandera videons detaljruta vid start (visningssidan)'
  , gEVUL: 'Visa "Mer fr&#229;n"-rutan vid start (visningssidan)'
  , gCVRT: 'Visa "Liknande videoklipp"-rutan'
  , gCVRP: 'Visa "Videosvar"-rutan'
  , hEVUL: 'Special: Aktivera om det inte finns n&#229;gon spellista'
  , gESAD: 'Expandera "Statistik"-l&#229;dan vid start (visningssidan)'
  , gCCMT: 'D&#246;lj kommentarrutan (visningssidan)'
  , gEVDB: 'Expandera videons detaljruta vid start (beta-kanal)'
  , gRUNI: 'Ta bort/d&#246;lj rekommenderade videoklipp'
  , gDRDD: 'Inaktivera den svarta rundade layouten runt videon'
  , gHBYH: 'D&#246;lj YouTubes beta-kanals huvud'
  , sPLST: 'Youtube spellistinst&#228;llningar (beh&#246;ver laddas om)'
  , gNPNS: 'Automatisk start av spellista utan n&#229;gon "playnext"'
  , gPLLP: 'Spellistloop'
  , hPLLP: 'Aktiverad: Till den f&#246;rsta i spellistrutan / Komplett: Till den f&#246;rsta i hela spellistan'
  , tKEYE: 'Tangentbordsgenv&#228;g'
  , hKEYE: 'Tangentbordskontroll'
  , sKBCT: 'Tangentbordskontroll'
  , gKBCT: 'Tangentbordskontroll'
  , gRDKB: 'Omdefiniera tangent'
  , kYEGO: '&#214;ppna allm&#228;nna inst&#228;llningar'
  , kPLPS: 'V&#228;xla Spela/Pausa'
  , kLOFF: 'Sl&#228;ck ljuset'
  , kKILL: 'D&#246;da / Mata ut'
  , kMUTE: 'V&#228;xla tystnad'
  , kSCBK: 'Rulla tillbaka'
  , kSCTV: 'Rulla till video'
  , kCOLL: 'Videovisning: D&#246;lj'
  , kWIDE: 'Videovisning: Bredbild'
  , k4DV3: 'Videovisning: 4/3'
  , kMR01: 'Media-storleks&#228;ndring, knapp 1'
  , kMR02: 'Media-storleks&#228;ndring, knapp 2'
  , kMR03: 'Media-storleks&#228;ndring, knapp 3'
  , kMR04: 'Media-storleks&#228;ndring, knapp 4'
  , kMR05: 'Media-storleks&#228;ndring, knapp 5'
  , kMR06: 'Media-storleks&#228;ndring, knapp 6'
  , kMR07: 'Media-storleks&#228;ndring, knapp 7'
  , kMR08: 'Media-storleks&#228;ndring, knapp B&#196;STA'
  , kMR09: 'Media-storleks&#228;ndring, knapp MAX'
  , kMR10: 'Media-storleks&#228;ndring, knapp FYLL'
  , kMR11: 'Media-storleks&#228;ndring, anpassad knapp ~1~'
  , kMR12: 'Media-storleks&#228;ndring, anpassad knapp ~2~'
  , hRKEY: 'Tryck 2 g&#229;nger escape- eller backsteg- eller delete-tangent f&#246;r att rensa'
  , tMISC: 'Blandat' ,hMISC: 'Blandade alternativ'
  , sMISC: 'Blandat (kan beh&#246;va laddas om)'
  , gBAAT: 'Buffring: Videoladdning innan automatisk start (0=inaktiverat)'
  , gBAAF: 'Buffring: V&#228;nta innan automatisk start (0=inaktiverat)'
  , gPLOF: 'Spela vid fokus'
  , gCFBT: '&#196;ndra d&#246;da-knappens aspekt'
  , gVPVW: 'Visa f&#246;rhandsvisningsbilder av video vid hovring'
  , gSINP: 'S&#246;kresultat visas p&#229; en ny sida'
  , gLUMT: 'Avtryckare f&#246;r ljuss&#228;ttning'
  , hLUMT: 'mellan 0 (alltid ljust) och 256 (alltid m&#246;rkt)'
  , gCNLD: "Starta om NetStream om videon inte laddas, f&#246;rs&#246;k... (0=inaktivera)"
  , gCNLF: "Starta om spelaren om videon inte laddas, f&#246;rs&#246;k... (0=inaktivera)"
  , gBCDP: "&#196;ndra standardvisning av beta-kanal"
  , hBCDP: "p=spelarvyn, g=stora ikoner / a=alla, u=uppladdningar, f=favoriter, p=spellistor"
  , gBPAC: 'G&#229; runt &#229;lderscensur utan loggning'
  , tCOLO: 'F&#228;rger', hCOLO: 'F&#228;rgalternativ'
  , sLGCS: 'Ljus f&#228;rginst&#228;llning (kan beh&#246;va laddas om)'
  , sDKCS: 'M&#246;rk f&#228;rginst&#228;llning (kan beh&#246;va laddas om)'
  , tOTHE: '&#214;vrigt', hOTHE: '&#214;vriga alternativ'
  , sYEUS: 'YouTube Enhancer-uppdaterare'
  , gYEUI: 'Kolla efter uppdatering f&#246;r YouTube Enhancer var... (0=inaktiverat)'
  , hYEUI: 'mellan 0 och 60'
  , gYEUV: 'Bes&#246;ksl&#228;nkl&#228;ge'
  , sOMSC: 'Blandat (F&#246;r&#229;ldrad/Inte fullt st&#246;d)'
  , gFFMT: 'Tvinga fmt'
  , hFFMT: '18 f&#246;r HQ-kvalitet (mp4)'
  , gEORV: 'Ladda om spelaren efter att ha &#229;terupplivat den'
  , hERPK: 'Aktivera omladdning av spelaren efter att ha d&#246;dat den'
  , sDEBG: 'Fels&#246;k (beh&#246;ver laddas om)'
  , gDEBG: 'Visa mer i felkonsolen'
  , oDISA: 'Inaktiverat'
  , oENAB: 'Aktiverat'
  , oNORM: 'Normal'
  , oCOLL: 'Komprimerad'
  , oEXPD: 'Expandera'
  , oSHOW: 'Visa'
  , oHIDE: 'Dold'
  , oATST: 'Vid start'
  , oBEST: 'B&#228;sta'
  , oCMPL: 'Komplett'
  , oSPEC: 'Speciell'
  , odlnk: 'Direkt l&#228;nk'
  , oitab: 'I ny flik'
  , oDAYS: 'dagar'
  , oDFLT: 'Standard'
  , oAUTO: 'Automatiskt'
  , oMEMO: 'Best&#228;ndig'
  , oCUST: 'Anpassad'
  , oCNCL: 'Avbryt'
  , oSAVE: 'Spara'
  , oRSTA: '&#197;terst&#228;ll allt'
  , oRSTT: '&#197;terst&#228;ll flik'
  , oORIG: 'Original'
  , oEJCT: 'Mata ut'
  , uTIME: 'g&#229;nger'
  }
, zh_cn: { lang: '&#20013;&#25991; (&#31616;&#20307;)'
  , dlink: '&#19979;&#36733;'
  , omenu: '&#36873;&#39033;'
  , qual1: '1: &#38598;&#19979;&#36733;&#38142;&#25509;&#21040;&#21516;&#19968;&#36136;&#37327;&#30340;&#35270;&#39057;&#35266;&#30475;'
  , qual2: '2: &#38598;&#19979;&#36733;&#38142;&#25509;&#21040;&#19968;&#20010;&#39640;&#21697;&#36136;&#30340;&#35270;&#39057;&#25991;&#20214;&#65288;&#30340;FLV&#25110;&#30340;MP4&#65289;'
  , qual3: '3: &#38598;&#19979;&#36733;&#38142;&#25509;&#21040;&#19968;&#20010;&#39640;&#21697;&#36136;&#30340;MP4&#35270;&#39057;&#25991;&#20214;'
  , auto1: '1: &#25163;&#20876;'
  , auto3: '3: &#33258;&#21160;'
  , link1: '&#26597;&#30475;&#20302;&#36136;&#37327; (flv)'
  , link2: '&#35266;&#39640;&#21697;&#36136; (flv)'
  , link3: '&#35266;&#39640;&#21697;&#36136; (mp4)'
  , link4: '&#26816;&#35270;HD&#36136;&#37327; (mp4)'
  , stop:   '&#20572;&#27490;'
  , stepb:  '&#36864;&#21518;&#19968;&#27493;'
  , stepf:  '&#21521;&#21069;&#36808;&#20986;&#30340;&#19968;&#27493;'
  , play:   '&#35835; / &#37325;&#26032;&#21551;&#21160;'
  , pause:  '&#20241;&#24687;'
  , begin:  '&#24320;&#22987;'
  , loop:   '&#29615;'
  , rewind: '&#20498;&#24102;'
  , end:    '&#23436;'
  , kill:   '&#21452;&#20987;&#26432;&#23475;&#32593;&#27969;&#21644;&#25773;&#25918;&#22120;'
  , embed:  'Embed &#38142;&#25509;'
  , fscr:   '&#20840;&#23631;&#38142;&#25509;'
  }
, zh_tw: { lang: '&#20013;&#25991; (&#32321;&#39636;)' // by 'KaiesTse'
  , dlink: '&#19979;&#36617;'
  , omenu: '&#36984;&#38917;'
  , qual1: '1&#65306;&#23559;&#24433;&#29255;&#19979;&#36617;&#36899;&#32080;&#35373;&#28858;&#30446;&#21069;&#30340;&#21697;&#36074;'
  , qual2: '2&#65306;&#23559;&#24433;&#29255;&#19979;&#36617;&#36899;&#32080;&#35373;&#28858;&#39640;&#21697;&#36074;&#65288;FLV&#25110;MP4&#65289;'
  , qual3: '3&#65306;&#23559;&#24433;&#29255;&#19979;&#36617;&#36899;&#32080;&#35373;&#28858;&#39640;&#21697;&#36074;&#65288;MP4&#65289;'
  , auto1: '1&#65306;&#38364;&#38281;&#33258;&#21205;&#25773;&#25918;'
  , auto2: '2&#65306;&#38283;&#21855;&#33258;&#21205;&#20018;&#27969;'
  , auto3: '3&#65306;&#38283;&#21855;&#33258;&#21205;&#25773;&#25918;'
  , ytego: 'You&#84;ube Enh&#97;nce&#114; &#35373;&#23450;'
  , link0: '&#20197;&#36229;&#20302;&#21697;&#36074;&#25773;&#25928;&#65288;flv&#65289;'
  , link1: '&#20197;&#20302;&#21697;&#36074;&#25773;&#25928;&#65288;flv&#65289;'
  , link2: '&#20197;&#39640;&#21697;&#36074;&#25773;&#25928;&#65288;flv&#65289;'
  , link3: '&#20197;&#39640;&#21697;&#36074;&#25773;&#25928;&#65288;mp4&#65289;'
  , link4: '&#20197;HD&#25773;&#25928;&#65288;mp4&#65289;'
  , best: '&#30059;&#38754;&#22823;&#23567;'
  , maxi: '&#30059;&#38754;&#22823;&#23567;&#65288;&#28961;&#25511;&#21046;&#22120;&#65289;'
  , fill: '&#35222;&#31383;&#22823;&#23567;'
  , cst1: '&#33258;&#35330;1'
  , cst2: '&#33258;&#35330;2'
  , cst3: '&#33258;&#35330;3'
  , stop:   '&#20572;&#27490;'
  , stepb:  '&#19978;&#19968;&#26684;'
  , stepf:  '&#19979;&#19968;&#26684;'
  , play:   '&#25773;&#25918;'
  , pause:  '&#26283;&#20572;'
  , begin:  '&#24490;&#29872;&#38283;&#22987;'
  , loop:   '&#24490;&#29872;'
  , rewind: '&#20498;&#24118;'
  , end:    '&#24490;&#29872;&#32066;&#27490;'
  , kill:   '&#32066;&#27490;&#25773;&#25918;&#22120;&#65288;&#36899;&#25353;&#65289;'
  , embed:  '&#23884;&#20837;'
  , fscr:   '&#20840;&#23631;&#36899;&#32080;'
  , udisa: '&#24050;&#38364;&#38281;&#33258;&#21205;&#26356;&#26032;'
  , uenab: '&#24050;&#38283;&#21855;&#33258;&#21205;&#26356;&#26032;'
  , ufoun: '&#26377;&#26356;&#26032;&#30340;&#29256;&#26412;'
  , udnow: '&#23433;&#35037;'
  , udlat: '&#31245;&#24460;&#20877;&#25552;&#37266;&#25105;'
  , ufail: '&#27298;&#26597;&#26356;&#26032;&#26178;&#37679;&#35492;'
  , pinst: '&#35531;&#25353;"Update"'
  }
}

function getText(key,useKey) {
  var res='';
  var data=LANGUAGE_TEXT[gvar.page_lang];
  if(data) { res=data[key] }
  if(!res) { data=LANGUAGE_TEXT['en']; res=data[key]; }
  if(!res) { data=LANGUAGE_TEXT['fr']; res=data[key]; }
  if(!res) { if(useKey) { return key; } else { return ''; } }
  return HtmlUnicodeDecode(res);
}

//***************************************** Options settings *********************************************//

// 0=tab { info, hint }
// 1=subtitle
// 2=2 states (disabled/enabled) { type, info, hint, default }
// 3=multiples states { type, info, hint, default, initial, values... }
// 4=positive integer { type, info, hint, default, min, max [,unit] }
// 5=positive integer with 'auto'
// 6=color { type, info, hint, default }
// 7=color with 'auto'
// 8=text { type, info, hint, default }
// 9=LANGUAGE_TEXT { type, info, hint, default }
// 10=keyboard { type, info, hint, keyid, default1, default2 }
// 11=multiples states with 'memorize'

const OPTIONS_BOX = {
  TAB_GENERAL: [0,'tGRAL','hGRAL']
, SUBTITLE_LANGUAGE: [1,'sSUBL','']
, FORCE_LANGUAGE:    [9,'gFLNG','','']
, SUBTITLE_DOWNLOAD_LINK: [1,'sDLLK','']
, DOWNLOAD_MODE:          [3,'gDLMD','',0,0,'href link','onClick']
, DOWNLOAD_LINK_QUALITY:  [3,'gDLLQ','', 2, 1,'Viewed','FLV or MP4','MP4','3GP (AMR)','3GP LQ (AAC)','3GP HQ (AAC)','MP3 (custom)']
, MP3_EXTERNAL_SITE_URL:  [8,'gMP3U','hMP3U','http://www.video2mp3.net/?v=[VID]',512]
, SUBTITLE_PLAYLIST:          [1,'sPLST','']
, PLAYLIST_NO_PLAYNEXT_START: [2,'gNPNS','', 1]
, LIST_AUTO_PLAY:             [3,'gQLAP','',0,0,'oNORM','oDISA','oENAB']
, PLAYLIST_LOOP:              [3,'gPLLP','hPLLP', 0, 0,'oDISA','oENAB','oCMPL']
, SUBTITLE_VOLUME:       [1,'sVOLC','']
, ENABLE_VOLUME_CONTROL: [2,'gEVLC','',0]
, VOLUME_AT_START:       [4,'gVATS','',100,0,100,'%']
, SUBTITLE_FLASHVARS: [1,'sSBCF','']
, CLEAN_FLASHVARS:    [2,'gCLFV','', 1]
, SHOW_ANNOTATIONS:   [3,'gDANN','hDCFV', 2, 0,'oDISA','oENAB','oHIDE','oSHOW']
, SHOW_SUBTITLES:     [3,'gDSUB','hDCFV', 2, 0,'oDISA','oENAB','oHIDE','oSHOW']
, SHOW_RV_AT_END:     [2,'gRVAE','hDCFV', 1]
, YOUTUBE_BAR_COLOR:  [7,'gTYBC','hWCFV',-1]
, ADD_TEXTP:          [2,'gTXTP','', 0]

, TAB_MEDIA_RESIZER:              [0,'tMRSZ','hMRSZ']
, SUBTITLE_MEDIA_RESIZER:         [1,'sVDPO','']
, HIDE_MEDIA_RESIZER:             [2,'gHDMR','', 0]
, MEDIA_RESIZER_MOVE_REDUCTION:   [4,'gMRMR','hMRMR', 9, 1,99]
, MEDIA_RESIZER_TIMEOUT_WAIT:     [4,'gMRTW','hMRTW', 5, 1,39]
, HIDE_SCROLLBARS:                [2,'gEHSC','hWRTV', 0]
, SCROLL_TO_VIDEO:                [3,'gESTV','', 2, 0,'oDISA','oENAB','oATST']
, ADD_HIDDEN_CUSTOM13:            [2,'gAHC3','', 0]
, SUBTITLE_MEDIA_RESIZER_4DV3:    [1,'sMR43','']
, DEFAULT_4DV3_VIDEO_RESIZING:    [11,'gD4VR','', 3, 1,'320','480+ (YT LQ)','640','854','960','1024','1280','BEST','MAX','FILL','~1~','~2~']
, CUSTOM11_4DV3_VIDEO_RESIZING_T: [8,'gC4T1','', '~ 1 ~',5]
, CUSTOM11_4DV3_VIDEO_RESIZING_W: [4,'gC4W1','hMINW', 1600, 160, 999999,'px']
, CUSTOM11_4DV3_VIDEO_RESIZING_H: [5,'gC4H1','hMINH',   -1,   0, 999999,'px']
, CUSTOM12_4DV3_VIDEO_RESIZING_T: [8,'gC4T2','', '~ 2 ~',5]
, CUSTOM12_4DV3_VIDEO_RESIZING_W: [4,'gC4W2','hMINW', 1920, 160, 999999,'px']
, CUSTOM12_4DV3_VIDEO_RESIZING_H: [5,'gC4H2','hMINH',   -1,   0, 999999,'px']
, CUSTOM13_4DV3_VIDEO_RESIZING_W: [4,'gC4W3','hMINW', 2560, 160, 999999,'px']
, CUSTOM13_4DV3_VIDEO_RESIZING_H: [5,'gC4H3','hMINH',   -1,   0, 999999,'px']
, SUBTITLE_MEDIA_RESIZER_WIDE:    [1,'sMRWD','']
, DEFAULT_WIDE_VIDEO_RESIZING:    [11,'gDWVR','', 3, 1,'320','480','640 (YT LQ)','854 (YT HQ)','960','1024','1280 (HD)','BEST','MAX','FILL','~1~','~2~']
, CUSTOM11_WIDE_VIDEO_RESIZING_T: [8,'gCWT1','', '~ 1 ~',5]
, CUSTOM11_WIDE_VIDEO_RESIZING_W: [4,'gCWW1','hMINW', 1600, 160, 999999,'px']
, CUSTOM11_WIDE_VIDEO_RESIZING_H: [5,'gCWH1','hMINH',   -1,   0, 999999,'px']
, CUSTOM12_WIDE_VIDEO_RESIZING_T: [8,'gCWT2','', '~ 2 ~',5]
, CUSTOM12_WIDE_VIDEO_RESIZING_W: [4,'gCWW2','hMINW', 1920, 160, 999999,'px']
, CUSTOM12_WIDE_VIDEO_RESIZING_H: [5,'gCWH2','hMINH',   -1,   0, 999999,'px']
, CUSTOM13_WIDE_VIDEO_RESIZING_W: [4,'gCWW3','hMINW', 2560, 160, 999999,'px']
, CUSTOM13_WIDE_VIDEO_RESIZING_H: [5,'gCWH3','hMINH',   -1,   0, 999999,'px']

, TAB_QUALITY_SELECTOR:       [0,'tQSEL','hQSEL']
, SUBTITLE_QUALITY_SELECTOR:  [1,'sQSOT','']
, HIDE_QUALITY_SELECTOR:      [2,'gHDQS','', 0]
, QS_ASYNC_FMT_MAP_UPDATE:    [3,'gQSAU','hQSAU', 0, 0,'oDISA','oENAB','oBEST','oCMPL']
, QS_ASYNC_FMT_MAP_CHECK :    [2,'gQSAC','', 1]
, FORCE_HD_BUTTON:            [2,'gFHDB','', 0]
, IGNORE_FMT22:               [2,'gRM22','', 0]
, IGNORE_FMT37:               [2,'gRM37','', 0]

, TAB_MEDIA_CONTROLLER:        [0,'tMCTR','hMCTR']
, SUBTITLE_MEDIA_CONTROLLER:   [1,'sMCOT','']
, HIDE_MEDIA_CONTROLLER_WATCH: [2,'gHMCW','', 0]
, HIDE_MEDIA_CONTROLLER_BCHAN: [2,'gHMCB','', 0]
, FLASH_PLAYER_WMODE:          [3,'gFPWM','', 0, 0,'','Window','Opaque','Transparent','Direct','Gpu']
, FLASH_PLAYER_QUALITY:        [3,'gFPQT','', 0, 0,'','Low','Autolow','Medium','Autohigh','High','Best']
, FLASH_PLAYER_WMODE_BCHAN:    [3,'gFPWB','', 1, 0,'','Window','Opaque','Transparent','Direct','Gpu']
, FLASH_PLAYER_QUALITY_BCHAN:  [3,'gFPQB','', 0, 0,'','Low','Autolow','Medium','Autohigh','High','Best']
, MC_LOOP_AT_START:            [2,'gMCLS','', 0]
, CUSTOM_FREEZE_BUTTON:        [3,'gCFBT','', 0, 0,'oORIG','oEJCT']
, SUBTITLE_AUTOPLAY:           [1,'sAUPL','']
, FLASH_PLAYER_AUTOPLAY_WATCH: [3,'gAPLW','', 3, 1,'oAOFF','oABUF','oAPON']
, FLASH_PLAYER_AUTOPLAY_BCHAN: [3,'gAPLB','', 0, 0,'oSAME','oAOFF','oABUF','oAPON']
, BUFFERING_AUTOSTART_AT:      [4,'gBAAT','', 0,0,100,'%']
, BUFFERING_AUTOSTART_AFTER:   [4,'gBAAF','', 0,0,999,'s']
, PLAY_ON_FOCUS:               [2,'gPLOF','', 0]
, PAUSE_ON_EXIT:               [2,'gPAOE','', 0]
, AUTOPLAY_PLAYLIST:           [3,'gATPL','', 0, 0,'oSAME','oAOFF','oABUF','oAPON']
, AUTOPLAY_QUEUELIST:          [3,'gATQL','', 0, 0,'oSAME','oAOFF','oABUF','oAPON']
, AUTOPLAY_OTHERSLIST:         [3,'gATOL','', 0, 0,'oSAME','oAOFF','oABUF','oAPON']
, REWIND_WHEN_BUFFERING:       [2,'gRWWB','', 0]

, TAB_YOUTUBE_DISPLAY:        [0,'tDISP','hDISP']
, SUBTITLE_YOUTUBE_DISPLAY:   [1,'sWPDP','']
, HIDE_TITLE:                 [2,'gHTHD','', 1]
, VIDEO_PREVIEW:              [2,'gVPVW','', 1]
, EXPAND_VIDEO_DETAILS:       [2,'gEVDW','', 0]
, EXPAND_VIDEO_UPLOADER:      [3,'gEVUL','hEVUL', 0, 0, 'oNORM','oEXPD','oSPEC','oCOLL']
, COLLAPSE_VIDEO_RELATED:     [3,'gCVRT','', 0, 0, 'oNORM','oCOLL','oEXPD']
, COLLAPSE_VIDEO_RESPONSES:   [3,'gCVRP','', 0, 0, 'oNORM','oCOLL','oEXPD']
, EXPAND_STATISTICS_DATA:     [2,'gESAD','', 0]
, COLLAPSE_COMMENTS:          [2,'gCCMT','', 0]
, BCHAN_EXPAND_VIDEO_DETAILS: [2,'gEVDB','', 0]
, REMOVE_LANGUAGE_BOX:        [2,'gRLGB','', 1]
, REMOVE_UNNEEDED_INFO:       [2,'gRUNI','', 1]
, DISABLE_ROUNDED:            [2,'gDRDD','', 1]
, HIDE_BCHAN_YT_HEADER:       [2,'gHBYH','', 0]

, SUBTITLE_LIGHT_OFF:              [1,'sLOOT','']
, LIGHT_OFF_AT_START:              [2,'gLOAS','', 0]
, LIGHT_OFF_COLOR:                 [7,'gLOCL','',-1]
, LIGHT_OFF_PAGE_OPACITY:          [4,'gLOPO','hB100', 90, 0, 100,'%']
, LIGHT_OFF_YT_PLAYER_BAR_DISPLAY: [3,'gLOBD','',0,0,'oHIDE','oSHOW']
, LIGHT_OFF_YT_PLAYER_BAR_OPACITY: [4,'gLOBO','hLOBO', 80, 0, 100,'%']

, TAB_KEY_EVENT:              [0,'tKEYE','hKEYE']
, SUBTITLE_KEYBOARD_CONTROL:  [1,'sKBCT','']
, KEYBOARD_CONTROL:           [2,'gKBCT','', 1]
, SUBTITLE_REDEFINE_KEYBOARD: [1,'gRDKB' ,'']
, KEY_GEN_OPTIONS:            [10,'kYEGO' ,'hRKEY',99,2079,0]
, KEY_LIGHT_OFF:              [10,'kLOFF' ,'hRKEY', 1,  76,0]
, KEY_STOP:                   [10,'stop'  ,'hRKEY', 2,  83,0]
, KEY_STEPBACK:               [10,'stepb' ,'hRKEY', 3,  68,0]
, KEY_STEPNEXT:               [10,'stepf' ,'hRKEY', 4,  70,0]
, KEY_PLAY:                   [10,'play'  ,'hRKEY', 5,  71,0]
, KEY_PAUSE:                  [10,'pause' ,'hRKEY', 6,  72,0]
, KEY_PLAYPAUSE:              [10,'kPLPS' ,'hRKEY',17,  32,0]
, KEY_BEGIN:                  [10,'begin' ,'hRKEY', 7,  88,0]
, KEY_LOOP:                   [10,'loop'  ,'hRKEY', 8,  67,0]
, KEY_REWIND:                 [10,'rewind','hRKEY', 9,  86,0]
, KEY_END:                    [10,'end'   ,'hRKEY',10,  66,0]
, KEY_KILL:                   [10,'kKILL' ,'hRKEY',11,  75,0]
, KEY_MUTETOGGLE:             [10,'kMUTE' ,'hRKEY',18,   0,0]
, KEY_SCROLL_TO_VIDEO:        [10,'kSCTV' ,'hRKEY',12, 110,0]
, KEY_SCROLL_BACK:            [10,'kSCBK' ,'hRKEY',13,  96,0]
, KEY_COLLAPSE:               [10,'kCOLL' ,'hRKEY',14,  97,0]
, KEY_WIDE:                   [10,'kWIDE' ,'hRKEY',15,  98,0]
, KEY_4DIV3:                  [10,'k4DV3' ,'hRKEY',16,  99,0]
, KEY_MR_BUTTON01:            [10,'kMR01' ,'hRKEY',81,  49,0]
, KEY_MR_BUTTON02:            [10,'kMR02' ,'hRKEY',82,  50,0]
, KEY_MR_BUTTON03:            [10,'kMR03' ,'hRKEY',83,  51,0]
, KEY_MR_BUTTON04:            [10,'kMR04' ,'hRKEY',84,  52,0]
, KEY_MR_BUTTON05:            [10,'kMR05' ,'hRKEY',85,  53,0]
, KEY_MR_BUTTON06:            [10,'kMR06' ,'hRKEY',86,  54,0]
, KEY_MR_BUTTON07:            [10,'kMR07' ,'hRKEY',87,  55,0]
, KEY_MR_BUTTON08:            [10,'kMR08' ,'hRKEY',88,  56,0]
, KEY_MR_BUTTON09:            [10,'kMR09' ,'hRKEY',89,  57,0]
, KEY_MR_BUTTON10:            [10,'kMR10' ,'hRKEY',90,  48,0]
, KEY_MR_BUTTON11:            [10,'kMR11' ,'hRKEY',91,   0,0]
, KEY_MR_BUTTON12:            [10,'kMR12' ,'hRKEY',92,   0,0]

, TAB_MISC:                   [0,'tMISC','hMISC']
, SUBTITLE_MISCELLANEOUS:     [1,'sMISC','']
, CHECK_NOT_LOADING_RESTART:  [4,'gCNLD','',15,0,30,'uTIME']
, CHECK_NOT_LOADING_FLUSH:    [4,'gCNLF','',15,0,30,'uTIME']
, SEARCH_RESULT_IN_NEW_PAGE:  [2,'gSINP','', 1]
, BCHAN_DEFAULT_PAGE:         [3,'gBCDP','hBCDP', 0, 0,'','p/a','p/u','p/f','p/p','g/a','g/u','g/f','g/p']
, LUMINOSITY_TRIGGER:         [4,'gLUMT','hLUMT', 1, 0, 256]
, BYPASS_AGE_CENSOR:          [2,'gBPAC','', 0]

, TAB_COLORS:                        [0,'tCOLO','hCOLO']
, SUBTITLE_LIGHT_COLOR:              [1,'sLGCS','']
  // Color for Download Link
, LIGHT_COLOR_DL_BORDER:             [6,'gLDL1','','CCCCCC']
, LIGHT_COLOR_DL_BACKGROUND:         [6,'gLDL2','','EEEEEE']
, LIGHT_COLOR_DL_OPTIONS_BORDER:     [6,'gLDL3','','DDDDDD']
, LIGHT_COLOR_DL_OPTIONS_BACKGROUND: [6,'gLDL4','','F8E0E0']
, LIGHT_COLOR_DL_OPTIONS_TEXT:       [6,'gLDL5','','6666FF']
, LIGHT_COLOR_DL_POPUP_BORDER:       [6,'gLDL6','','000000']
, LIGHT_COLOR_DL_POPUP_ARROW:        [6,'gLDL7','','000000']
, LIGHT_COLOR_DL_POPUP_TEXT:         [6,'gLDL8','','000000']
, LIGHT_COLOR_DL_POPUP_BG_BLUE_OUT:  [6,'gLDL9','','DDDDFF']
, LIGHT_COLOR_DL_POPUP_BG_BLUE_IN:   [6,'gLDLA','','CCCCFF']
, LIGHT_COLOR_DL_POPUP_BG_RED_OUT:   [6,'gLDLB','','FFDDDD']
, LIGHT_COLOR_DL_POPUP_BG_RED_IN:    [6,'gLDLC','','FFCCCC']
, LIGHT_COLOR_DL_POPUP_BG_GREEN_OUT: [6,'gLDLD','','DDFFDD']
, LIGHT_COLOR_DL_POPUP_BG_GREEN_IN:  [6,'gLDLE','','BBFFBB']
  // Color for Quality Selector
, LIGHT_COLOR_QS_BORDER:             [6,'gLQS1','','D8D8D8']
, LIGHT_COLOR_QS_BACKGROUND:         [6,'gLQS2','','F8F8F8']
, LIGHT_COLOR_QS_BG_DEFAULT:         [6,'gLQS3','','F0F0F0']
, LIGHT_COLOR_QS_SELECTED:           [6,'gLQS4','','880000']
, LIGHT_COLOR_MR_PANEL_BORDER:       [6,'gLMR1','','DDDDFF']
, LIGHT_COLOR_MR_BUTTON_BORDER:      [6,'gLMR2','','CCCCCC']
, LIGHT_COLOR_MR_BACKGROUND:         [6,'gLMR3','','EEEEEE']
, LIGHT_COLOR_MR_DRAW_TEXT_IN:       [6,'gLMR4','','E00000']
, LIGHT_COLOR_MR_DRAW_TEXT_OUT:      [6,'gLMR5','','000000']
, LIGHT_COLOR_MR_SELECTOR:           [6,'gLMR6','','FF0000']
  // Color for Media Controller
, LIGHT_COLOR_MC_BORDER:             [6,'gLMC1','','CCCCCC']
, LIGHT_COLOR_MC_BACKGROUND:         [6,'gLMC2','','E8E8E8']
, LIGHT_COLOR_MC_TEXT_OUT:           [6,'gLMC3','','000000']
, LIGHT_COLOR_MC_TEXT_ACTION_IN:     [6,'gLMC4','','E00000']
, LIGHT_COLOR_MC_TEXT_TOGGLE_IN:     [6,'gLMC5','','00C040']
, LIGHT_COLOR_MC_TOGGLE_BEG_END:     [6,'gLMC6','','FFE080']
, LIGHT_COLOR_MC_TOGGLE_LOOP:        [6,'gLMC7','','D0D0FF']
, LIGHT_COLOR_MC_BG_RED:             [6,'gLMC8','','FFF0F0']
, LIGHT_COLOR_MC_BG_BLUE_OUT:        [6,'gLMC9','','F0F0FF']
, LIGHT_COLOR_MC_BG_BLUE_IN:         [6,'gLMCA','','E0E0FF']
, LIGHT_COLOR_MC_TEXT_BLUE_OUT:      [6,'gLMCB','','0033CC']
, LIGHT_COLOR_MC_TEXT_BLUE_IN:       [6,'gLMCC','','0033CC']
, LIGHT_COLOR_LO_BULB_OUT:           [6,'gLLO1','','666666']
, LIGHT_COLOR_LO_BULB_IN:            [6,'gLLO2','','FF4444']

, SUBTITLE_DARK_COLOR:               [1,'sDKCS','']
  // Color for Download Link
, DARK_COLOR_DL_BORDER:              [6,'gDDL1','','505050']
, DARK_COLOR_DL_BACKGROUND:          [6,'gDDL2','','282828']
, DARK_COLOR_DL_OPTIONS_BORDER:      [6,'gDDL3','','666666']
, DARK_COLOR_DL_OPTIONS_BACKGROUND:  [6,'gDDL4','','5C3C3C']
, DARK_COLOR_DL_OPTIONS_TEXT:        [6,'gDDL5','','9999FF']
, DARK_COLOR_DL_POPUP_BORDER:        [6,'gDDL6','','888888']
, DARK_COLOR_DL_POPUP_ARROW:         [6,'gDDL7','','FFFFFF']
, DARK_COLOR_DL_POPUP_TEXT:          [6,'gDDL8','','FFFFFF']
, DARK_COLOR_DL_POPUP_BG_BLUE_OUT:   [6,'gDDL9','','444466']
, DARK_COLOR_DL_POPUP_BG_BLUE_IN:    [6,'gDDLA','','222266']
, DARK_COLOR_DL_POPUP_BG_RED_OUT:    [6,'gDDLB','','664444']
, DARK_COLOR_DL_POPUP_BG_RED_IN:     [6,'gDDLC','','662222']
, DARK_COLOR_DL_POPUP_BG_GREEN_OUT:  [6,'gDDLD','','446644']
, DARK_COLOR_DL_POPUP_BG_GREEN_IN:   [6,'gDDLE','','226622']
  // Color for Quality Selector
, DARK_COLOR_QS_BORDER:              [6,'gDQS1','','444444']
, DARK_COLOR_QS_BACKGROUND:          [6,'gDQS2','','282828']
, DARK_COLOR_QS_BG_DEFAULT:          [6,'gDQS3','','303030']
, DARK_COLOR_QS_SELECTED:            [6,'gDQS4','','880000']
, DARK_COLOR_MR_PANEL_BORDER:        [6,'gDMR1','','222255']
, DARK_COLOR_MR_BUTTON_BORDER:       [6,'gDMR2','','222222']
, DARK_COLOR_MR_BACKGROUND:          [6,'gDMR3','','282828']
, DARK_COLOR_MR_DRAW_TEXT_IN:        [6,'gDMR4','','E00000']
, DARK_COLOR_MR_DRAW_TEXT_OUT:       [6,'gDMR5','','663300']
, DARK_COLOR_MR_SELECTOR:            [6,'gDMR6','','880000']
  // Color for Media Controller
, DARK_COLOR_MC_BORDER:              [6,'gDMC1','','222222']
, DARK_COLOR_MC_BACKGROUND:          [6,'gDMC2','','282828']
, DARK_COLOR_MC_TEXT_OUT:            [6,'gDMC3','','663300']
, DARK_COLOR_MC_TEXT_ACTION_IN:      [6,'gDMC4','','FF0000']
, DARK_COLOR_MC_TEXT_TOGGLE_IN:      [6,'gDMC5','','00C040']
, DARK_COLOR_MC_TOGGLE_BEG_END:      [6,'gDMC6','','3C3C00']
, DARK_COLOR_MC_TOGGLE_LOOP:         [6,'gDMC7','','444466']
, DARK_COLOR_MC_BG_RED:              [6,'gDMC8','','2C1818']
, DARK_COLOR_MC_BG_BLUE_OUT:         [6,'gDMC9','','282838']
, DARK_COLOR_MC_BG_BLUE_IN:          [6,'gDMCA','','1C1C4C']
, DARK_COLOR_MC_TEXT_BLUE_OUT:       [6,'gDMCB','','002266']
, DARK_COLOR_MC_TEXT_BLUE_IN:        [6,'gDMCC','','0033CC']
, DARK_COLOR_LO_BULB_OUT:            [6,'gDLO1','','666666']
, DARK_COLOR_LO_BULB_IN:             [6,'gDLO2','','FF4444']

, TAB_OTHERS:                             [0,'tOTHE','hOTHE']
, SUBTITLE_UPDATER:                       [1,'sYEUS','']
, YOUTUBE_ENHANCER_UPDATE_CHECK_INTERVAL: [4,'gYEUI','hYEUI',12,0,60,'oDAYS']
, YOUTUBE_ENHANCER_UPDATE_VISIT:          [3,'gYEUV','',0,0,'odlnk','oitab']

, SUBTITLE_MISC_NFS:    [1,'sOMSC','']
, FORCE_DEFAULT_FMT:    [5,'gFFMT','hFFMT',-1,0,99]
, USE_OLD_REVIVE:       [2,'gEORV','hERPK', 0]
, USE_IMAGE_FOR_BUTTON: [2,'gUIFB','', 0]

, SUBTITLE_MISC_DEBUG: [1,'sDEBG','']
, SHOW_DEBUG:          [3,'gDEBG','',0,0,'oDISA','oENAB','oCMPL']

, DEBUG_TAB:        [90,'Dbg','']
, DEBUG_FLASHVARS1: [91]
, DEBUG_FLASHVARS2: [92]
}

function line_change(event) {
  var thisElem=this; if(event.parentNode) { thisElem=event }
  var myid=thisElem.id.match(/^(.*)\-STATE$/)
  if(myid) {
    var elem =$(myid[1]);
    var elem2=$(myid[1]+'_ALT');
    if(elem) {
      if(elem2) { // Shorcut keys
        if(thisElem.value==0) {
          var value=OPTIONS_BOX[myid[1]][4];
          if(value<=0) { elem.value=''; } else { elem.value=value; }
          SimulateMouse(elem,'mouseout');
          elem.setAttribute('disabled','disabled');
          value=OPTIONS_BOX[myid[1]][5];
          if(value<=0) { elem2.value=''; } else { elem2.value=value; }
          SimulateMouse(elem2,'mouseout');
          elem2.setAttribute('disabled','disabled');
        } else {
          elem.removeAttribute('disabled');
          elem2.removeAttribute('disabled');
        }
      } else { // Others
        if(thisElem.value==0) {
          var value=OPTIONS_BOX[myid[1]][3];
          if(value<0) { elem.value=''; } else { elem.value=value; }
          SimulateMouse(elem,'mouseout');
          elem.setAttribute('disabled','disabled');
        } else if(thisElem.value==1) {
          elem.value='';
          SimulateMouse(elem,'mouseout');
          elem.setAttribute('disabled','disabled');
        } else {
          elem.removeAttribute('disabled');
        }
} } } }

function addKeyboardEventListener(elem) {
  function set_value_key(event) {
    if(event.ctrlKey)  { return; }
    event.preventDefault();
    var key=getKeyCode(event);
    if(event.target.value==key && (key==8 || key==27 || key==46)) { key=''; }
    event.target.value=key;
    event.target.focus();
    event.target.select();
  }
  if(gvar.isOpera) {
    elem.addEventListener('keypress',set_value_key,true);
  } else {
    elem.addEventListener('keydown',set_value_key,true);
  }
}

function create_options_panel() {
  var res;
  function create_line(trElem,auto,key,info,selected,value) {
    var tdElem = document.createElement('td');
    tdElem.setAttribute('style','width:60%;');
    if(info>'') { info=getText(info); } if(info=='') { info=key; }
    tdElem.textContent=info;
    trElem.appendChild(tdElem);
    tdElem = document.createElement('td');
    tdElem.setAttribute('style','width:20%;');
    var selectElem = document.createElement('select');
    selectElem.setAttribute('id',key+'-STAT'+value);
    selectElem.setAttribute('style','width:100px; cursor:pointer;');
    var optionElem = document.createElement('option'); 
    optionElem.textContent=getText('oDFLT'); optionElem.setAttribute('value','0');
    if(selected==0) { optionElem.setAttribute('selected',''); }
    selectElem.appendChild(optionElem);
    if(auto==1 || auto==3) {
      optionElem = document.createElement('option');
      if (auto==1) { optionElem.textContent=getText('oAUTO'); optionElem.setAttribute('value','1'); }
      else { optionElem.textContent=getText('oMEMO'); optionElem.setAttribute('value','3'); }
      if(selected==1) { optionElem.setAttribute('selected',''); }
      selectElem.appendChild(optionElem);
    }
    optionElem = document.createElement('option');
    optionElem.textContent=getText('oCUST');
    optionElem.setAttribute('value','2');
    if(selected==2) { optionElem.setAttribute('selected',''); }
    selectElem.appendChild(optionElem);
    tdElem.appendChild(selectElem);
    if(trElem.hasAttribute('title')) {
       var spanEl=document.createElement('span');
       spanEl.textContent="*";
       //spanEl.setAttribute('style','float: right; margin-right:5px; margin-top:3px;');
       spanEl.setAttribute('style','position: relative; left:45px; top:3px;');
       user_select(spanEl,'none');
       tdElem.appendChild(spanEl);
    }
    selectElem.addEventListener('change',line_change,true);
    if(gvar.isOpera) { selectElem.addEventListener('click' ,line_change,true); } // Opera fix
    trElem.appendChild(tdElem);
  }
  function color_change(elem) {
    if(!elem || !elem.parentNode) { elem=this; }
    var previewElem=elem.parentNode.childNodes[2];
    if(!(elem.value.match(/^[0-9a-fA-F]{6}$/))) {
      previewElem.style.setProperty('background','#000000','important');
      previewElem.style.setProperty('border-color','#000000','important');
    } else {
      previewElem.style.setProperty('background','#'+elem.value,'important');
      previewElem.style.setProperty('border-color','#888888','important');
    }
  }
  function nav_event(navsElem,navElem,tabsElem,tabElem,tabID) {
    var list=navsElem.getElementsByTagName('li');
    for(var h=list.length-1;h>=0;h--) { list[h].style.setProperty('background','#444444',''); }
    navElem.style.setProperty('background','#888888','');
    list=tabsElem.getElementsByTagName('table');
    for(var h=list.length-1;h>=0;h--) { list[h].style.setProperty('display','none',''); }
    tabElem.style.setProperty('display','table','');
    gvar.optionsTabID=tabID;
  }
  function create_nav_event(navsElem,navElem,tabsElem,tabElem,tabID) {
    navElem.addEventListener('click', function() { nav_event(navsElem,navElem,tabsElem,tabElem,tabID); }, true);
    tabsElem.appendChild(tabElem);
    if(tabID==gvar.optionsTabID) { nav_event(navsElem,navElem,tabsElem,tabElem,tabID); }
  }

  if(typeof GM_deleteValue!='function') { alert("Your version of GreaseMonkey is too old\nUpgrade if you want to modify the options..."); return; }
  if(!(res=GetYEU().name.match(/^\x59ou\x54u\x62e_(\x45)n\x68an\x63er/i))) { alert(HtmlUnicodeDecode("&#83;o&#109;e&#116;h&#105;ng&#32;&#119;r&#111;&#110;g&#32;&#105;n&#32;&#116;he&#32;&#115;c&#114;ip&#116;&#46;&#46;&#46;")); return; }

  var overlay = document.createElement('div');
  overlay.setAttribute('style','position:fixed; top:0; bottom:0; left:0; right:0; height:100%; width:100%; background:#000000; opacity:0.5; overflow:auto; z-index:99001;');
  document.body.appendChild(overlay);

  var divElem = document.createElement('div');
  divElem.setAttribute('style','position:fixed; top:8px; bottom:8px; left:0; right:0; margin-left:auto; margin-right:auto; width:800px; z-index:99002; background:#000000; color:#FFFFFF; overflow:auto; padding:20px;');

  buttonElem=document.createElement('input');
  buttonElem.setAttribute('type','button');
  buttonElem.setAttribute('style','width:100px; padding:4px; margin-left:550px; background: #C0C0C0 !important; color:#000000 !important; border:1px; cursor: pointer;');
  buttonElem.value=getText('oCNCL');
  buttonElem.addEventListener('click', options_panel_close, true);
  divElem.appendChild(buttonElem);
  var cs=0; for(var h=0,lg=n.toString().length;h<lg;h++) { cs=cs+lg+n.charCodeAt(h); } if(cs!=299413) { document.body.appendChild(divElem); return; }

  var buttonElem=document.createElement('input');
  buttonElem.setAttribute('type','button');
  buttonElem.setAttribute('style','position: absolute; width:100px; padding:4px; left:450px; background: #C0C0C0 !important; color:#000000 !important; border:1px; cursor: pointer;');
  buttonElem.value=getText('oRSTA');
  buttonElem.addEventListener('click', options_panel_reset_all, true);
  divElem.appendChild(buttonElem);

  buttonElem=document.createElement('input');
  buttonElem.setAttribute('type','button');
  buttonElem.setAttribute('style','width:100px; padding:4px; margin-left:20px; background: #C0C0C0 !important; color:#000000 !important; border:1px; cursor: pointer;');
  buttonElem.value=getText('oSAVE');
  buttonElem.addEventListener('click', options_panel_save, true);
  divElem.appendChild(buttonElem);

  var divT=document.createElement('div');
  divT.textContent=getText('gYEGO');
  divT.setAttribute('style','width:780px; font-size:20px; text-align:center; padding:16px 0px;');
  divElem.appendChild(divT);

  try { if(GM_isAddon) { delete OPTIONS_BOX['SUBTITLE_UPDATER']; delete OPTIONS_BOX['YOUTUBE_ENHANCER_UPDATE_CHECK_INTERVAL']; delete OPTIONS_BOX['YOUTUBE_ENHANCER_UPDATE_VISIT']; } } catch(err) {}
  if(typeof(gvar.optionsTabID)=='undefined') { gvar.optionsTabID=1; } 
  divT=document.createElement('div');
  divT.setAttribute('style','float:left; width:780px; font-size:15px; text-align:left;');
  var navElem=document.createElement('ul');
  navElem.setAttribute('style','list-style-type:disc;');
  divT.appendChild(navElem);

  var divD=document.createElement('div');
  divD.setAttribute('style','width:780px; font-size:14px;');
  var tableElem=null; var tabElem=null; var tabID=0;

  for(var key in OPTIONS_BOX) {
    var data=OPTIONS_BOX[key];
    var value=''; var value2=''; var defaultvalue=2;
    if(!res) { continue; }
    if(!DEBUG && data[0]>=90) { continue; } 
    if(data[0]==10) {
      value=GM_getValue(key,null);
      if(value==null) { defaultvalue=0; value=data[4]; value2=data[5]; }
      else { value2=value.match(/^(\d*),(\d*)$/); if(value2) { value=parseInt(value2[1],10); value2=parseInt(value2[2],10); } else { value=data[4]; value2=data[5]; } }
      if(value<=0) { value=''; } if(value2<=0) { value2=''; }
    } else if(data[0]>1) {
      value=GM_getValue(key,null);
      if(value==null) { defaultvalue=0; value=data[3]; if(value<0) { value=''; } }
      else if(value<0) { defaultvalue=1; if(data[0]==11) { value=Math.abs(value);} else { value=''; } }
    }
    if(data[0]==0 || data[0]==90) {
      if(tabElem) { create_nav_event(navElem,tabElem,divD,tableElem,++tabID); }
      tabElem=document.createElement('li');
      tabElem.setAttribute('style','float:left; display:block; list-style-position:outside; list-style-type:none; padding:3px 5px; background:#444444; margin:1px 1px; cursor: pointer;');
      var txt=data[1]; if(txt>'') { txt=getText(data[1],true); }
      tabElem.textContent=txt;
      var hint=data[2]; if(hint>'') { hint=getText(data[2],true); }
      tabElem.setAttribute('title',hint);
      user_select(tabElem,'none');
      navElem.appendChild(tabElem);
      tableElem = document.createElement('table');
      tableElem.setAttribute('style','display:none; float:left; width:100%; font-size:14px; border-collapse:separate; border-spacing:2px;');
    } else {
      trElem = document.createElement('tr'); trElem.style.setProperty('cursor','default','');
      var hint=data[2]; if(hint>'') { hint=getText(data[2],true); }
      if(hint>'') { trElem.setAttribute('title',hint); trElem.style.setProperty('cursor','help',''); }
      switch(data[0]) {
       case 2: case 3: case 4: case 6: case 8: case 9: create_line(trElem,0,key,data[1],defaultvalue,res[1]); break;
       case 5: case 7: create_line(trElem,1,key,data[1],defaultvalue,res[1]); break;
       case 10: create_line(trElem,2,key,data[1],defaultvalue,res[1]); break;
       case 11: create_line(trElem,3,key,data[1],defaultvalue,res[1]); break;
      }
      switch(data[0]) {
       case 1:
        tdElem = document.createElement('td');
        var hint=data[1]; if(hint>'') { hint=getText(data[1],true); }
        tdElem.textContent=hint;
        tdElem.setAttribute('style','width:100%; font-size:16px; text-align:center; padding-bottom:10px; padding-top:20px;');
        tdElem.setAttribute('colspan','3');
        trElem.appendChild(tdElem);
       break;
       case 2:
        tdElem = document.createElement('td');
        tdElem.setAttribute('style','width:30%;');
        var selectElem=document.createElement('select');
        selectElem.setAttribute('id',key);
        selectElem.setAttribute('style','width:120px; cursor: pointer;');
        var optionElem = document.createElement('option');
        optionElem.textContent=getText('oDISA');
        optionElem.setAttribute('value','0');
        if(value==0) { optionElem.setAttribute('selected',''); }
        selectElem.appendChild(optionElem);
        var optionElem = document.createElement('option');
        optionElem.textContent=getText('oENAB');
        optionElem.setAttribute('value','1');
        if(value==1) { optionElem.setAttribute('selected',''); }
        selectElem.appendChild(optionElem);
        if(defaultvalue<2) { selectElem.setAttribute('disabled','disabled'); }
        tdElem.appendChild(selectElem);
        trElem.appendChild(tdElem);
       break;
       case 3: case 11:
        tdElem = document.createElement('td');
        tdElem.setAttribute('style','width:30%;');
        var selectElem=document.createElement('select');
        selectElem.setAttribute('id',key);
        selectElem.setAttribute('style','width:120px; cursor: pointer;');
        for(var h=5;h<data.length;h++) {
          var optionElem = document.createElement('option');
          var hint=getText(data[h],true);
          optionElem.textContent=hint;
          var ovalue=h+data[4]-5;
          optionElem.setAttribute('value',ovalue);
          if(value==ovalue) { optionElem.setAttribute('selected',''); }
          selectElem.appendChild(optionElem);
        }
        if(defaultvalue<1) { selectElem.setAttribute('disabled','disabled'); }
        tdElem.appendChild(selectElem);
        trElem.appendChild(tdElem);
       break;
       case 4: case 5:
        tdElem = document.createElement('td');
        tdElem.setAttribute('style','width:30%;');
        var inputElem=document.createElement('input');
        inputElem.setAttribute('style','cursor:text;');
        inputElem.setAttribute('id',key);
        inputElem.setAttribute('type','text');
        inputElem.setAttribute('size',data[5].toString().length);
        inputElem.setAttribute('maxlength',data[5].toString().length);
        if(defaultvalue<2) { inputElem.setAttribute('disabled','disabled'); }
        inputElem.value=value;
        tdElem.appendChild(inputElem);
        if(isDefined(data[6])) {
          var unitElem=document.createElement('span');
          unitElem.textContent=getText(data[6],true);
          unitElem.setAttribute('style','margin-left:4px;');
          user_select(unitElem,'none');
          tdElem.appendChild(unitElem);
        }
        trElem.appendChild(tdElem);
       break;
       case 6: case 7:
        tdElem = document.createElement('td');
        var spanElem = document.createElement('span');
        spanElem.textContent="# ";
        user_select(spanElem,'none');
        tdElem.appendChild(spanElem);
        tdElem.setAttribute('style','width:30%;');
        var inputElem=document.createElement('input');
        inputElem.setAttribute('style','font-family: '+FONT_COURIER_NEW+'; cursor:text;');
        inputElem.setAttribute('id',key);
        inputElem.setAttribute('type','text');
        inputElem.setAttribute('size','7');
        inputElem.setAttribute('maxlength','6');
        inputElem.value=value;
        if(defaultvalue<2) { inputElem.setAttribute('disabled','disabled'); }
        tdElem.appendChild(inputElem);
        var previewElem = document.createElement('button');
        previewElem.setAttribute('style','border: solid 1px #FFFFFF !important; background: #000000; width:20px; height:20px; vertical-align:middle; margin-left:5px;');
        previewElem.setAttribute('disabled','disabled');
        tdElem.appendChild(previewElem);
        inputElem.addEventListener('keyup'    , color_change,true)
        inputElem.addEventListener('mouseover', color_change,true)
        inputElem.addEventListener('mouseout' , color_change,true)
        trElem.appendChild(tdElem);
        color_change(inputElem);
       break;
       case 8:
        tdElem = document.createElement('td');
        tdElem.setAttribute('style','width:30%; cursor:text;');
        var inputElem=document.createElement('input');
        inputElem.setAttribute('style','font-family: '+FONT_COURIER_NEW+'; cursor:text;');
        inputElem.setAttribute('id',key);
        inputElem.setAttribute('type','text');
        inputElem.setAttribute('size',Math.min(data[4],20));
        inputElem.setAttribute('maxlength',data[4]);
        inputElem.value=value;
        if(defaultvalue<2) { inputElem.setAttribute('disabled','disabled'); }
        tdElem.appendChild(inputElem);
        trElem.appendChild(tdElem);
       break;
       case 9:
        tdElem = document.createElement('td');
        tdElem.setAttribute('style','width:30%;');
        var selectElem=document.createElement('select');
        selectElem.setAttribute('id',key);
        selectElem.setAttribute('style','width:120px; cursor: pointer;');
        for(var loc in LANGUAGE_TEXT) {
          var optionElem = document.createElement('option');
          if(loc=='dlink') { loc=''; optionElem.textContent=''; }
          else { optionElem.textContent=HtmlUnicodeDecode(LANGUAGE_TEXT[loc]['lang']); }
          optionElem.setAttribute('value',loc);
          if(value==loc) { optionElem.setAttribute('selected',''); }
          selectElem.appendChild(optionElem);
        }
        if(defaultvalue<2) { selectElem.setAttribute('disabled','disabled'); }
        tdElem.appendChild(selectElem);
        trElem.appendChild(tdElem);
       break;
       case 10:
        tdElem = document.createElement('td');
        tdElem.setAttribute('style','width:30%;');
        var inputElem1=document.createElement('input');
        inputElem1.setAttribute('style','font-family: '+FONT_COURIER_NEW+'; cursor:text; width:50px; text-align: right;');
        inputElem1.setAttribute('id',key);
        inputElem1.setAttribute('type','text');
        inputElem1.setAttribute('readonly','readonly');
        inputElem1.setAttribute('onClick','this.focus();this.select();');
        inputElem1.value=value;
        var inputElem2=document.createElement('input');
        inputElem2.setAttribute('style','font-family: '+FONT_COURIER_NEW+'; cursor:text; width:50px; text-align: right; margin-left:10px;');
        inputElem2.setAttribute('id',key+'_ALT');
        inputElem2.setAttribute('type','text');
        inputElem2.setAttribute('readonly','readonly');
        inputElem2.setAttribute('onClick','this.focus();this.select();');
        inputElem2.value=value2;
        if(defaultvalue<2) { inputElem1.setAttribute('disabled','disabled'); inputElem2.setAttribute('disabled','disabled'); }
        tdElem.appendChild(inputElem1);
        tdElem.appendChild(inputElem2);
        addKeyboardEventListener(inputElem1);
        addKeyboardEventListener(inputElem2);
        trElem.appendChild(tdElem);
       break;
       case 91: case 92:
        tdElem=document.createElement('td'); var flashvars;
        if(data[0]==91) {
          flashvars=get_flashvars(get_PlayerEmbed_element());
          tdElem.setAttribute('style','display:block; width:780px; overflow:auto; white-space:nowrap; background:#000088;');
          tdElem.textContent='Cleaned Flashvars (without rv.*) :';
        } else {
          var flashvars=gvar.before_Clean;
          tdElem.setAttribute('style','display:block; width:780px; overflow:auto; white-space:nowrap; background:#440088;');
          tdElem.textContent='Initial Flashvars (without rv.*) :';
        }
        tdElem.appendChild(document.createElement('br'));
        var mres,variable,value;
        do {
          mres=flashvars.match(/^([^=]+?)\=([^\&]*?)(?:\&|$)(.*?)$/i);
          if(!mres) { break; }
          variable=mres[1]; value=mres[2]; flashvars=mres[3];
          if(variable.match(/rv\./)) { continue; }
          tdElem.appendChild(document.createElement('br'));
          tdElem.appendChild(document.createTextNode(variable+'='+decodeURIComponent(value)));
        } while(true);
        trElem.appendChild(tdElem);
       break;
      }
      tableElem.appendChild(trElem);
    }
  }
  divElem.appendChild(divT);
  if(tabElem) { create_nav_event(navElem,tabElem,divD,tableElem,++tabID); }
  divElem.appendChild(divD);

  var buttonElem=document.createElement('input');
  buttonElem.setAttribute('type','button');
  buttonElem.setAttribute('style','width:100px; padding:4px; margin-left:430px; margin-top:30px; background: #C0C0C0 !important; color:#000000 !important; border:1px; cursor: pointer;');
  buttonElem.value=getText('oRSTT');
  buttonElem.addEventListener('click',options_panel_reset_tab,true);
  divElem.appendChild(buttonElem);

  buttonElem=document.createElement('input');
  buttonElem.setAttribute('type','button');
  buttonElem.setAttribute('style','width:100px; padding:4px; margin-left:20px; margin-top:30px; background: #C0C0C0 !important; color:#000000 !important; border:1px; cursor: pointer;');
  buttonElem.value=getText('oCNCL');
  buttonElem.addEventListener('click', options_panel_close, true);
  divElem.appendChild(buttonElem);

  buttonElem=document.createElement('input');
  buttonElem.setAttribute('type','button');
  buttonElem.setAttribute('style','width:100px; padding:4px; margin-left:20px; background: #C0C0C0 !important; color:#000000 !important; border:1px; cursor: pointer;');
  buttonElem.value=getText('oSAVE');
  buttonElem.addEventListener('click', options_panel_save, true);
  divElem.appendChild(buttonElem);

  gvar.gen_options=divElem; gvar.gen_overlay=overlay;
  document.body.appendChild(divElem);
}

function options_panel_close(e) {
  removeElement(gvar.gen_options); delete gvar.gen_options;
  removeElement(gvar.gen_overlay); delete gvar.gen_overlay;
  e.preventDefault();
}

function options_panel_save(e) {
  check_options_panel(e);
  options_panel_close(e);
}

function options_panel_reset_all() {
  for(var key in OPTIONS_BOX) {
    var elem=$(key+'-STATE');
    if(!elem) { continue; }
    elem.value=0;
    line_change(elem);
} }

function options_panel_reset_tab() {
  var id=0;
  for(var key in OPTIONS_BOX) {
    if(OPTIONS_BOX[key][0]==0) { id++; continue; }
    if(id==gvar.optionsTabID) {
      var elem=$(key+'-STATE');
      if(!elem) { continue; }
      elem.value=0;
      line_change(elem);
} } }

function check_options_panel() {
  for(var key in OPTIONS_BOX) {
    var data=OPTIONS_BOX[key];
    if(!data) { continue; }
    var elem=$(key+'-STATE');
    if(!elem) { continue; }
    var stateValue=elem.value;
    elem=$(key);
    if(!elem) { continue; }
    var value=elem.value;

    if(stateValue>1) {
      switch(data[0]) {
        case 2:
          if(value>0) { value=1 } else { value=0 }
        break;
        case 3: case 11:
          if(!(value.match(/^[0-9]+$/))) { stateValue=0; break; }
          value=Math.round(value);
          if(value<0) { value=0 }
          var omaxvalue=data[4]+data.length-5-1;
          if(value>omaxvalue) { value=omaxvalue }
          if(stateValue>2) { value=-value; }
        break;
        case 5:
          if(value=='') { stateValue=1; break; }
        case 4:
          if(!(value.match(/^[0-9]+$/))) { stateValue=0; break; }
          value=Math.round(value);
          if(value<data[4]) { value=data[4] }
          if(value>data[5]) { value=data[5] }
        break;
        case 7:
          if(value=='') { stateValue=1; break; }
        case 6:
          if(!(value.match(/^[0-9a-fA-F]{6}$/))) { stateValue=0; }
        break;
        case 8:
          value=value.toString().substring(0,data[4]);
        break;
        case 9:
          value=value.toString().substring(0,9);
        break;
        case 10:
          value=parseInt(value,10); if(isNaN(value)) { value=0; }
          var elem2=$(key+'_ALT');
          if(elem2) {
            var value2=parseInt(elem2.value,10);
            if(isNaN(value2)) { value2=0; }
            value=value+','+value2;
          } else { stateValue=0; }
        break;
        default: value='';
      }
    }
    if(stateValue<=0) { GM_deleteValue(key); }
    else if(stateValue<=1) { GM_setValue(key,-1); }
    else { GM_setValue(key,value); }
  }
  change_after_save();
}

function change_after_save() {
  // Change display of YT title
  var wvt = $(WATCH_TITLE_DIV);
  change_title_display();
  change_download_link();
  change_quality_selector_display();
  change_media_resizer_display();
  change_media_controller_display();
  var player=get_PlayerEmbed_element(); if(player) { player.setAttribute('MC_AUTOPLAY',getValue("FLASH_PLAYER_AUTOPLAY_WATCH")); }
}

function open_options_panel() {
  this.parentNode.parentNode.style.display="none";
  create_options_panel();
}
function getValue(key) {
  var data=OPTIONS_BOX[key];
  if(!data) { return ''; }
  if(data[0]>1 && data[0]<6) { return GM_getIntValue(key,data[3]); }
  else { return GM_getValue(key,data[3]); }
}
function getKeyID(keyb) {
  for(var key in OPTIONS_BOX) {
    var data=OPTIONS_BOX[key];
    if(!data) { continue; }
    if(data[0]!=10) { continue; }
    var dvalue=GM_getValue(key,null);
    if(dvalue==null) {
      if(data[4]==keyb || data[5]==keyb) { return data[3]; }
    } else {
      var res=dvalue.match(/^(\d*),(\d*)$/); 
      if(res) { if(res[1]==keyb || res[2]==keyb) { return data[3]; } }
    }
  }
  return 0;
}

function getAutoplayValue() {
  function getAutoplayValue_pl(val,def) {
    if($('playlistVideoCount_PL') || $('watch-next-list')) {
      if(val>0) { return val; }
    }
    return def;
  }
  if(gvar.isBetaChannel) {
    var res=getValue('FLASH_PLAYER_AUTOPLAY_BCHAN');
    if(res>0) { return res; }
  }
  res=getValue('FLASH_PLAYER_AUTOPLAY_WATCH');
  var t1=location.search.match(/[?&]feature\=PlayList(?:\&|$)/i) || location.search.match(/[?&]playnext\_from\=PL(?:\&|$)/i);
  var t2=location.search.match(/[?&]playnext\_from\=QL(?:\&|$)/i);
  if(t1) { res=getAutoplayValue_pl(getValue('AUTOPLAY_PLAYLIST'),res); }
  if(t2) { res=getAutoplayValue_pl(getValue('AUTOPLAY_QUEUELIST'),res); }
  if(!t1 && !t2) { res=getAutoplayValue_pl(getValue('AUTOPLAY_OTHERSLIST'),res); }
  return res;
}

//=========================== BROWSER DETECTION / ADVANCED SETTING ===========================================//
function ApiBrowserCheck() {
  //delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;
  if(typeof(Function.name)=='undefined') { YouTube_Enhancer_Updater['name']="YouTube_Enhancer_Updater"; }
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
  GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
    var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
    var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
    if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
    return sel;
  }
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; show_alert('Opera detected...',0);
    OPTIONS_BOX['KEY_SCROLL_TO_VIDEO'][4]=46; OPTIONS_BOX['KEY_SCROLL_BACK'][4]=48; OPTIONS_BOX['KEY_COLLAPSE'][4]=49; OPTIONS_BOX['KEY_WIDE'][4]=50; OPTIONS_BOX['KEY_4DIV3'][4]=51; // Change Default shortcut key for Opera
    for(var h=1;h<=9;h++) { OPTIONS_BOX['KEY_MR_BUTTON0'+h][4]=0; } for(var h=10;h<=12;h++) { OPTIONS_BOX['KEY_MR_BUTTON'+h][4]=0; }
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; show_alert('GreaseMonkey Api detected...',0); } // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; show_alert('Bugged Chrome GM Api detected...',0); }
  } else { needApiUpgrade=true; show_alert('No GM Api detected...',0); }

  if(needApiUpgrade) {
    GM_isAddon=true; show_alert('Try to recreate needed GM Api...',0);
    OPTIONS_BOX['FLASH_PLAYER_WMODE'][3]=2; OPTIONS_BOX['FLASH_PLAYER_WMODE_BCHAN'][3]=2; // Change Default wmode if there no greasemonkey installed
    var ws=null; try { ws=typeof(unsafeWindow.localStorage) } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      show_alert('Using localStorage for GM Api.',0);
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      show_alert('Using temporarilyStorage for GM Api.',0); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      show_alert('Using XMLHttpRequest for GM Api.',0);
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  } } }
  GM_getIntValue=function(name,defValue) { return parseInt(GM_getValue(name,defValue),10); }
  $=function(name) { return document.getElementById(name); }
}
ApiBrowserCheck();

function ViewingPageCheck() {
  gvar.isOnUserscript=(window.location.host.match(/^userscripts\.org$/i))!=null;
  gvar.isOnYouTube   =(window.location.host.match(/^(?:\w+\.)?youtube\.\w+$/i))!=null;
  gvar.isUserPage    =gvar.isOnYouTube && (window.location.pathname.match(/^\/user\//i));
  gvar.isBetaChannel =gvar.isOnYouTube && $(YT_BETA_CHANNEL);
  gvar.isVerifAgePage=gvar.isOnYouTube && (window.location.pathname.match(/^\/verify_age$/i))
  gvar.isWatchPage   =gvar.isOnYouTube && ( (window.location.pathname.match(/^\/watch$/i)) || ( (getValue('BYPASS_AGE_CENSOR')>0) && gvar.isVerifAgePage ) );
  gvar.isFeather     =false; //will be set later...
  gvar.isWatChan     =false; //will be set later...
  gvar.isGoogleWatch =false; //will be set later...
  gvar.isHTML5Layout =false; //will be set later...
}
ViewingPageCheck();

function getUseDarkColors() {
  var elem=$('user_playlist_navigator');
  if(!elem) { elem=document.body; }
  var elemStyle; try { elemStyle=window.getComputedStyle(elem, null); } catch(e) { elemStyle=null; }
  if(elemStyle) {
    gvar.bodyTextColor=elemStyle.color; if(gvar.bodyTextColor=="transparent") { gvar.bodyTextColor='#000000'; }
    gvar.bodyBgColor=elemStyle.backgroundColor; if(gvar.bodyBgColor=="transparent") { gvar.bodyBgColor='#FFFFFF'; }
    return (GetLuminosity(gvar.bodyBgColor)<getValue('LUMINOSITY_TRIGGER'));
  } else {
    gvar.bodyTextColor='#000000';
    gvar.bodyBgColor='#FFFFFF';
    return false;
  }
}
const USE_DARK_COLORS=getUseDarkColors(); // light or dark ? // false=Light colors / true=Dark colors
const DEBUG=getValue('SHOW_DEBUG');       // More debug info ?

//***************************************** Page settings ************************************************//
// Get youtube locale (for languages support)
function get_page_lang() {
  //== Language forced by user option
  if(FORCE_LANGUAGE) { return FORCE_LANGUAGE.toLowerCase(); }
  var forceLng=getValue('FORCE_LANGUAGE');
  if(forceLng) { return forceLng.toLowerCase(); }

  //== Use browser language when youtube don't support it...
  var lang=window.navigator.language.substr(0,2).toLowerCase();
  if(lang=="ar") { return lang; } // Arabic (ar)

  //== via URL or ytc
  lang=window.location.search.match(/[?&]hl=([^(\&|$)]*)/i);
  if(lang) { lang=lang[1]; } else { lang=gvar.ytc_LOCALE; }
  if(lang) {
    lang=lang.replace(/\-/,"_").toLowerCase();
    if(LANGUAGE_TEXT[lang]) { GM_setValue("Youtube_Enhancer_Locale_Setting",lang); return lang; }
    lang=lang.substr(0,2);
    if(LANGUAGE_TEXT[lang]) { GM_setValue("Youtube_Enhancer_Locale_Setting",lang); return lang; }
  }

  //== via old watch page setting
  return GM_getValue("Youtube_Enhancer_Locale_Setting","www");
}

function get_page_fmt() {
  var selected_fmt=window.location.search.match(/[?&#]fmt=(\d*)/i);
  if(selected_fmt==null) { selected_fmt=-1; } else { selected_fmt=selected_fmt[1]; }
  if(!(isPositiveInteger(selected_fmt))) { selected_fmt=-1; }
  return(selected_fmt);
}

function get_PlayerEmbed_element() {
  var playerEmbed = $(YT_PLAYER_EMBED);
  if(playerEmbed) { return playerEmbed; }
  var wpd = $(WATCH_PLAYER_DIV);
  if(wpd) {
    var temp=null;
    try { temp=wpd.getElementsByTagName("embed"); } catch(err) { temp=null; }
    if(temp && temp[0]) { temp[0].setAttribute('id',YT_PLAYER_EMBED); return temp[0]; }
  }
  return null;
}

function color(name,dark) {
  if(isDefined(dark)) { arguments.callee.dk=dark; return; }
  return color_change(arguments.callee.dk,name);
}

function color_change(dark,name) {
  if (!dark) {
    return '#'+getValue('LIGHT_COLOR_'+name);
  } else {
    return '#'+getValue('DARK_COLOR_'+name);
  }
}

//************************************************************
//***** Download Link ****************************************
//************************************************************
function clean_filename(filename) {
  // Clean filename (UNICODE Method)
  filename = filename.replace(/\:/g,String.fromCharCode(65306));
  filename = filename.replace(/\\/g,String.fromCharCode(65340));
  filename = filename.replace(/\//g,String.fromCharCode(65295));
  filename = filename.replace(/\</g,String.fromCharCode(65308));
  filename = filename.replace(/\>/g,String.fromCharCode(65310));
  filename = filename.replace(/\*/g,String.fromCharCode(65290));
  filename = filename.replace(/\?/g,String.fromCharCode(65311));
  filename = filename.replace(/\"/g,String.fromCharCode(65282));
  filename = filename.replace(/\|/g,String.fromCharCode(65372));
  // Clean filename (Underline Method)
  //filename = filename.replace(/[\:\\\/\<\>\?\*\"\|]/g, "_");
  filename = filename.replace(/\s+/g,' '); // Multiple space to one
  filename = filename.replace(/^\s+|\s+$/g,''); // Trim
  //filename = filename.replace(/\ /g,String.fromCharCode(65279));
  return filename;
}

function clean_video_url(vurl) {
  var hmode=(vurl[1]=='#');
  if(hmode) { vurl=vurl.replace(/\#/,'?'); }
  vurl=vurl.replace(/\?/,'?&');
  vurl=vurl.replace(/\&fmt\=\d+(\&|$)/gi,'$1');
  vurl=vurl.replace(/\&NR\=\d+(\&|$)/gi,'$1');
  vurl=vurl.replace(/\&eurl\=.*?(\&|$)/gi,'$1');
  vurl=vurl.replace(/\&search\=.*?(\&|$)/gi,'$1');
  vurl=vurl.replace(/\&feature\=(?!playlist).*?(\&|$)/gi,'$1');
  vurl=vurl.replace(/\?\&/,'?');
  if(hmode) { vurl=vurl.replace(/\?/,'#'); }
  return vurl;
}

function get_clean_flashvars(flashvars,force) {
  if(DEBUG) { gvar.before_Clean=flashvars; show_debug('Memo flashvars'); }
  var fmt_viewed=get_fmt_viewed(flashvars);
  var fmt_map=get_fmt_map(flashvars);
  var vq=get_vq_for(fmt_viewed);
  fmt_map=get_fmt_map_for(fmt_viewed,fmt_map);
  if(getValue('FORCE_HD_BUTTON')>0) { fmt_viewed=get_fmt_viewed_with_vq('max',fmt_map); vq=get_vq_for(fmt_viewed); }
  if(getValue('IGNORE_FMT37')>0 && vq=='hd1080') { vq='hd720'; }
  if(getValue('IGNORE_FMT22')>0 && vq=='hd720' ) { vq='large'; }
  
  flashvars=set_vq(flashvars,vq);
  flashvars=set_fmt_map(flashvars,fmt_map);
  flashvars=change_rv_flashvars(flashvars,fmt_viewed);

  if(getValue('CLEAN_FLASHVARS')<=0 && !force) { return flashvars; }
  var res,variable,value; var res_annotations; var res_subtitles; var res_rv; var newfv='';
  var a=getValue('SHOW_ANNOTATIONS'); var s=getValue('SHOW_SUBTITLES'); var r=getValue('SHOW_RV_AT_END');

  var TEXTp_url='http://s.ytimg.com/yt/swf/textp-vfl157275.swf';
  do {
    res=flashvars.match(/^([^=]+?)\=([^\&]*?)(?:\&|$)(.*?)$/i);
    if(!res) { break; }
    variable=res[1]; value=res[2]; flashvars=res[3];
    if(a>1) { res_annotations=variable.match(/^(iv_module|iv_storage_server)$/i); }
    else if(a>0) { res_annotations=variable.match(/^(iv_module|iv_storage_server|iv_load_policy)$/i); } else { res_annotations=false; }
    if(s>1) { res_subtitles=variable.match(/^(subtitle_module|ttsurl|cc_module|cc3_module|cc_font|cc_asr)$/i); }
    else if(s>0) { res_subtitles=variable.match(/^(subtitle_module|ttsurl|cc_module|cc3_module|cc_font|cc_asr|cc_load_policy)$/i); } else { res_subtitles=false; }
    if(r>0) { res_rv=variable.match(/^(rv\.\d+\.)/i); } else { res_rv=false; }
    res=variable.match(/^(BASE_YT_URL|rel|vq|fmt_map|fmt_url_map|video_id|t|sk|hl|fs|plid|playnext|enablejsapi|iurl|lpbf|lpbb|showinfo|autoplay|three_d|keywords|el|thumbnail_url|ptk|stream|conn|token|textp_module)$/i);
    if(res || res_annotations || res_subtitles || res_rv) {
      if(variable.match(/^keywords$/)) { value=encodeURIComponent(clean_keywords(decodeURIComponent(value))); }
      if(variable=='el' && value!='profilepage') { continue; }
      if(value=='') { continue; }
      if(newfv!='') { newfv+='&'; }
      if(variable=='textp_module') { TEXTp_url=value; continue; }
      newfv+=variable+'='+value;
    }
  } while(true);
  if(getValue('YOUTUBE_BAR_COLOR')>'') { newfv+='&color2='+getValue('YOUTUBE_BAR_COLOR'); }
  if(a>2) { newfv+='&iv_load_policy=1'; } else if (a>1) { newfv+='&iv_load_policy=3'; } 
  if(s>2) { newfv+='&cc_load_policy=1'; }
  if(getValue('ADD_TEXTP')>0) { newfv+='&textp_module='+TEXTp_url; }
  //newfv+='&el=profilepage';
  return newfv;
}

// Keep yt3d: / yt:crop=16:9 / yt:stretch=16:9 / yt:stretch=4:3 tags
function clean_keywords(kw) {
  var res; var newkw='';
  do {
    res=kw.match(/^([^,]+)(\,|$)(.*?)$/i);
    if(!res) { break; }
    var value=res[1];
    kw=res[3];
    if(!value.match(/^yt3d\:/) && !value.match(/^yt\:stretch\=(?:16\:9|4\:3)$/)
      && !value.match(/^yt\:crop\=16\:9$/)) { continue; }
    if(newkw!='') { newkw+=','; }
    newkw+=value;
  } while(true);
  return newkw;
}

// Detecting yt:crop=16:9 / yt:stretch=16:9 / yt:stretch=4:3
function isWide() {
  if(gvar.isGoogleWatch) { return gvar.ytc_WIDE; }
  if(isDefined(arguments.callee.wide)) { return arguments.callee.wide; }
  var playerEmbed=get_PlayerEmbed_element();
  if(playerEmbed) {
    var flashvars=get_flashvars(playerEmbed);
    if(flashvars) {
      var keywords=flashvars.match(/(?:^|\&)keywords\=([^(\&|$)]*)/);
      if(keywords) {
        var res=decodeURIComponent(keywords[1]).match(/(?:^|\,)yt\:crop\=([\d:]+)(?:\,|$)/);
        if(res) {
          switch(res[1]) {
            case '16:9': arguments.callee.wide=true; break;
        } }
        res=decodeURIComponent(keywords[1]).match(/(?:^|\,)yt\:stretch\=([\d:]+)(?:\,|$)/);
        if(res) {
          switch(res[1]) {
            case '16:9': arguments.callee.wide=true; break;
            case '4:3': arguments.callee.wide=false; break;
  } } } } }
  if(isUndefined(arguments.callee.wide)) { arguments.callee.wide=gvar.ytc_WIDE; }
  return arguments.callee.wide;
}

function change_rv_flashvars(flashvars,fmt) {
  var res; var newfv='';
  if(fmt==FMT_DEFAULT) { fmt=-1; }
  do {
    res=flashvars.match(/^([^=]+?)\=([^\&]*?)(\&|$)(.*?)$/i);
    if(!res) { break; }
    var variable=res[1];
    var value=res[2];
    flashvars=res[4];
    if(variable.match(/^rv\.\d+\.url$/)) { value=encodeURIComponent(clean_link_and_add_fmt(decodeURIComponent(value),fmt)); }
    if(variable.match(/iurl/)) { value=encodeURIComponent(decodeURIComponent(value).replace(/\/(default|1|2|3)(\.jpg)/,"/hq$1$2")); }
    if(newfv!='') newfv+='&';
    newfv+=variable+'='+value;
  } while(true);
  return newfv;
}

function add_ext(filename,fmt) {
  if(fmt==13 || fmt==17 || fmt==36) { return(filename+".3gp"); }
  if(fmt==18 || fmt==22 || fmt==37) { return(filename+".mp4"); }
  if(fmt=='mp3') { return(filename+".mp3"); }
  return(filename+".flv");
}
function url_fmt(fmt) {
  if(fmt<0) { if(getValue('FORCE_DEFAULT_FMT')>=0) { return("&fmt="+FMT_DEFAULT) } else { return(""); } }
  return("&fmt="+fmt);
}
function download_url_fmt(el,t_id,video_id,download_fmt) {
  var fail_js=''; var video_url;
  if(gvar.isVevo) {
    fail_js='javascript:alert("'+getText('eVEVO')+'");';
  } else {
    if(download_fmt=='mp3') {
      var mp3_url=getValue('MP3_EXTERNAL_SITE_URL');
      if(mp3_url.indexOf("[VID]")>0) { video_url=mp3_url.replace(/\[VID\]/,video_id); }
      else { fail_js='javascript:alert("'+getText('eMP3U')+'");'; }
    } else {
      video_url=window.location.protocol+'//'+window.location.host+'/get_video?t='+t_id+'&video_id='+video_id+url_fmt(download_fmt);
    }
  }
  if(fail_js>'') {
    el.removeAttribute('href');
    el.setAttribute('onClick',fail_js+' return false;');
    el.setAttribute('class','yte-button-disable');
  } else {
    el.setAttribute('href',video_url);
    if(getValue('DOWNLOAD_MODE')>0) { el.setAttribute('onClick','location.href="'+video_url+'"; return false;'); } else { el.removeAttribute('onClick'); }
    el.setAttribute('class','yte-button-blue');
  }
}

// Flash get & set
function getFlashAttribute(obj,name) {
  if(!obj) { return null; }
  switch(obj.nodeName) {
    case 'EMBED':
      return obj.getAttribute(name);
    case 'OBJECT':
      var fp=null; try { fp=document.evaluate('.//param[@name="'+name+'"]',obj,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { fp=null; }
      if(fp) { return fp.getAttribute('value'); }
  }
  return null;
}
function setFlashAttribute(obj,name,value) {
  if(!obj) { return false; }
  switch(obj.nodeName) {
    case 'EMBED':
      obj.setAttribute(name,value);
      return true;
    case 'OBJECT':
      var fp=null; try { fp=document.evaluate('.//param[@name="'+name+'"]',obj,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { fp=null; }
      if(!fp) { fp=document.createElement('param'); fp.setAttribute('name',name); obj.appendChild(fp); }
      fp.setAttribute('value',value);
      return true;
  }
  return false;
}

// flashvars get & set
function get_flashvars(playerEmbed) {
  if(gvar.ytc_FLASHVARS) { return gvar.ytc_FLASHVARS; }
  var flashvars=getFlashAttribute(playerEmbed,'flashvars');
  if(flashvars) { return flashvars.replace(/\&amp\;/g,'&'); }
  return null;
}
function set_flashvars(playerEmbed,flashvars) {
  //show_debug('Save: fmt_map='+get_fmt_map(flashvars)+' / vq='+get_vq(flashvars));
  if(playerEmbed) { if(setFlashAttribute(playerEmbed,'flashvars',flashvars)) { gvar.ytc_FLASHVARS=null; return; } }
}

// flashvars manipulation
function get_vq(flashvars) {
  var vq=flashvars.match(/(?:^|\&)vq\=([^(\&|$)]*)/i);
  if(vq) { return vq[1]; }
  return 'medium';
}
function set_vq(flashvars,vq) {
  var ovq=flashvars.match(/(?:^|\&)vq\=([^(\&|$)]*)/i); if(!ovq) { return flashvars+'&vq='+vq; }
  return flashvars.replace(/((?:^|\&)vq\=)[^(\&|$)]*/,"$1"+vq);
}
function get_fmt_map(flashvars) {
  var fmt_map=flashvars.match(/(?:^|\&)fmt_map\=([^(\&|$)]*)/i);
  if(fmt_map) { return decodeURIComponent(fmt_map[1]); }
  return '';
}
function set_fmt_map(flashvars,fmt_map) {
  return flashvars.replace(/((?:^|\&)fmt_map\=)[^(\&|$)]*/,"$1"+fmt_map);
}
function get_video_id(flashvars) {
  var video_id=flashvars.match(/(?:^|\&)video_id\=([^(\&|$)]*)/i);
  if(video_id) { return decodeURIComponent(video_id[1]); }
  return '';
}
function get_t_id(flashvars) {
  var t_id=flashvars.match(/(?:^|\&)t\=([^(\&|$)]*)/i);
  if(t_id) { return decodeURIComponent(t_id[1]); }
  return '';
}
function get_hl(flashvars) {
  var hl=flashvars.match(/(?:^|\&)hl\=([^(\&|$)]*)/i);
  if(hl) { return decodeURIComponent(hl[1]); }
  return '';
}

// vq: small, medium / large, hd720, hd1080
function get_fmt_viewed_with_vq(vq,fmt_map) {
  const QUALW={ 'small':1, 'medium':2, 'large':3, 'hd720':4, 'hd1080':5 }
  fmt_res=5; vqW=QUALW[vq]; if(!vqW) { vqW=6; }
  while(fmt_map=fmt_map.match(/^(\d+)[^,]*(,|$)(.*)$/i)) {
    fmt_res=parseInt(fmt_map[1],10); fmt_map=fmt_map[3];
    var fmtW=QUALW[get_vq_for(fmt_res)]; if(!fmtW) { fmtW=1; }
    if(vqW>=fmtW) { break; }
  }
  //show_debug(vq+'=>'+fmt_res);
  return fmt_res;
}
function get_fmt_viewed(flashvars) {
  return get_fmt_viewed_with_vq(get_vq(flashvars),get_fmt_map(flashvars));
}

// fmt_map manipulation
function get_fmt_array(fmt_map) {
  var fmt_array=[]; fmt_array[-1]=true;
  if(fmt_map=='') { return fmt_array; }
  fmt_array[-1]=false;
  while(fmt_map=fmt_map.match(/^(\d+)[^,]*(,|$)(.*)$/)) {
    fmt_array[fmt_map[1]]=true;
    fmt_map=fmt_map[3];
  }
  return fmt_array;
}
function is_fmt_in_fmt_map(selected_fmt,fmt_map) {
  if(selected_fmt==5 && fmt_map=='') { return true; }
  while(fmt_map=fmt_map.match(/^(\d+)[^,]*(,|$)(.*)$/)) {
    if(fmt_map[1]==selected_fmt) { return true; }
    fmt_map=fmt_map[3];
  }
  return false;
}
function merge_fmt_map(fmt_map1,fmt_map2) {
  if(fmt_map1=='') { return fmt_map2; }
  fmt_array=get_fmt_array(fmt_map1);
  while(fmt_map2=fmt_map2.match(/^(\d+)([^,]*)(?:,|$)(.*)$/)) {
    if(!fmt_array[fmt_map2[1]]) { fmt_map1=fmt_map1+','+fmt_map2[1]+fmt_map2[2]; }
    fmt_map2=fmt_map2[3];
  }
  return fmt_map1;
}

function isLowQuality(fmt) { return (fmt<=6) || (fmt==13) || (fmt==17) || (fmt==36) || (fmt==34); }
function isHDQuality(fmt) { return (fmt==22) || (fmt==37); }

function get_vq_for(selected_fmt) {
  if(isLowQuality(selected_fmt)) { return 'medium'; }
  if(selected_fmt==22) { return 'hd720'; }
  if(selected_fmt==37) { return 'hd1080'; }
  return 'large';
}

function get_fmt_map_for(selected_fmt,old_fmt_map) {
  if(old_fmt_map=='') { return ''; }
  var orderM=[]; var orderP=[]; // Order: 37/22/35/18/34/5

  function findInOrder(v) {
    for(var h=orderP.length-1;h>=0;h--) { if(orderP[h]==v) { return  900+h; } }
    for(var h=orderM.length-1;h>=0;h--) { if(orderM[h]==v) { return -900-h; } }
    return v;
  }
  function mysort(a,b) {
    a=a.match(/^(\d+)\//); if(a) { a=a[1]; } else { a=0; }
    b=b.match(/^(\d+)\//); if(b) { b=b[1]; } else { b=0; }
    a=findInOrder(a);
    b=findInOrder(b);
    return b-a;
  }

  if(selected_fmt!= 5) { orderP.push( 5); orderP.push(34); } else { orderP.push(34); orderP.push( 5); }
  if(selected_fmt==18) { orderP.push(35); orderP.push(18); } else { orderP.push(18); orderP.push(35); }
  if(getValue('IGNORE_FMT22')>0 && !isHDQuality(selected_fmt)) { orderM.push(22); } else { orderP.push(22); }
  if(getValue('IGNORE_FMT37')>0 && (selected_fmt!=37)) { orderM.push(37); } else { orderP.push(37); }
  //show_debug(findInOrder(37)+'/'+findInOrder(22)+'/'+findInOrder(35)+'/'+findInOrder(18)+'/'+findInOrder(34)+'/'+findInOrder(5));

  var fmt_list=old_fmt_map.split(/\s*,\s*/);
  fmt_list.sort(mysort);
  //show_debug(fmt_list.join(','));
  return fmt_list.join(',');
}

function set_vq_and_fmt_map(playerEmbed,vq,fmt_map) {
  //show_alert('replace: '+fmt_map+' ('+vq+')',0);
  var flashvars = get_flashvars(playerEmbed);
  flashvars=set_fmt_map(flashvars,fmt_map);
  flashvars=set_vq(flashvars,vq);
  var fmt_map_viewed=get_fmt_viewed(flashvars);
  flashvars=change_rv_flashvars(flashvars,fmt_map_viewed);
  set_flashvars(playerEmbed,flashvars);
  return fmt_map_viewed;
}

//---------------------------------------------------------------------------------------

function get_dl_fmt(flashvars,quality_setting) {
  var fmt_array=get_fmt_array(get_fmt_map(flashvars));
  var dl_fmt=18;
  switch(quality_setting) {
    case 1:
      dl_fmt=get_fmt_viewed(flashvars);
      break;
    case 2:
      dl_fmt=get_fmt_viewed(flashvars);
      if(fmt_array[ 5]) { dl_fmt= 5; }
      if(fmt_array[34]) { dl_fmt=34; }
      if(fmt_array[18]) { dl_fmt=18; }
      if(fmt_array[35]) { dl_fmt=35; }
      if(gvar.ytc_ISHD || fmt_array[22]) { dl_fmt=22; } // Set to HD if available
      //if(fmt_array[37]) { dl_fmt=37; } // HD1080 Available
      break;
    case 3:
      dl_fmt=18; // Default -> Set HQ-MPG4
      if((gvar.page_fmt==22) && (!fmt_array[22])) { dl_fmt=18; } // No HD-MPG4 -> Set HQ-MPG4
      if((gvar.page_fmt==18) && (!fmt_array[18])) { dl_fmt=22; } // No HQ-MPG4 -> Set HD-MPG4
      if(fmt_array[22] || gvar.ytc_ISHD)  { dl_fmt=22; } // HD Available -> Set HD-MPG4
      if(fmt_array[37]) { dl_fmt=37; } // HD1080 Available
      break;
    case 4: dl_fmt=13; break;
    case 5: dl_fmt=17; break;
    case 6: dl_fmt=36; break;
    case 7: dl_fmt='mp3'; break;
  }
  return dl_fmt;
}

function option_turn(state) {
  if(isDefined(state)) {
    arguments.callee.laststate=state;
    if(isUndefined(arguments.callee.idInterval)) { arguments.callee.idInterval=0; }
    if(state && (arguments.callee.idInterval<=0)) { arguments.callee.idInterval=window.setInterval( function() { option_turn(); }, 100); }
  }
  else {
    var angle=draw_optionButton();
    if((angle%90==0) && !arguments.callee.laststate) { arguments.callee.idInterval=clearInterval(arguments.callee.idInterval); }
  }
}

function draw_optionButton(angle,buttonCtx) {
  if(isDefined(buttonCtx)) { arguments.callee.mCtx=buttonCtx; }
  if(isDefined(angle)) { arguments.callee.mAngle=angle; } else { arguments.callee.mAngle=(arguments.callee.mAngle+10) % 360; }
  buttonCtx=arguments.callee.mCtx; angle=arguments.callee.mAngle;
  buttonCtx.fillStyle=color('DL_OPTIONS_TEXT');
  buttonCtx.clearRect(0,0,19,19);
  buttonCtx.save(); buttonCtx.translate(9.5,9.5); buttonCtx.rotate(Math.PI*angle/180); buttonCtx.translate(-9.5,-9.5);
  buttonCtx.beginPath(); buttonCtx.arc(9.5, 5,2.8,0,Math.PI*2,true); buttonCtx.fill();
  buttonCtx.beginPath(); buttonCtx.arc(9.5,14,2.8,0,Math.PI*2,true); buttonCtx.fill();
  buttonCtx.save(); buttonCtx.translate( 5,9.5); buttonCtx.rotate(Math.PI*45/180); buttonCtx.fillRect(-2.4,-2.4,4.8,4.8); buttonCtx.restore();
  buttonCtx.save(); buttonCtx.translate(14,9.5); buttonCtx.rotate(Math.PI*45/180); buttonCtx.fillRect(-2.4,-2.4,4.8,4.8); buttonCtx.restore();
  buttonCtx.restore();
  return(angle);
}

function add_dl_qual_links(selected_fmt) {
  var wvt = $(WATCH_TITLE_DIV);
  if(!wvt) { wvt=$('watch-headline'); }
  if(!wvt) { wvt=$(WATCHAN_TITLE_DIV); if (wvt) { gvar.isWatChan=true; } }
  if(!wvt) { show_alert('Download Link Disabled : "'+WATCH_TITLE_DIV+'" not found'); return; }
  var playerEmbed = get_PlayerEmbed_element();
  var flashvars=get_flashvars(playerEmbed);
  if(!flashvars) { show_alert('Download Link Disabled : "flashvars" not found (FlashBlock ?)'); return; }
  if(flashvars.match(/(?:^|\&)ptk\=vevo/)) { gvar.isVevo=true; show_alert('VEVO Detected',0); } else { gvar.isVevo=false; }

  var Options_title = getText("omenu");

  var t_id=get_t_id(flashvars);
  if(t_id=='') { show_alert('Download Link Disabled : Missing "t" argument in "flashvars" (Flashblock ?)'); return; }
  var video_id=get_video_id(flashvars);
  if(video_id=='') { show_alert('Download Link Disabled : Missing "video_id" argument in "flashvars" (Flashblock ?)'); return; }

  // remake EMBED URL
  if(!gvar.ytc_EMBURL) { var hl=get_hl(flashvars); if(hl) { hl='&hl='+hl; } gvar.ytc_EMBURL='http://www.youtube.com/v/'+video_id+hl+'&fs=1'; }

  // Retrieve fmt
  var download_fmt = get_dl_fmt(flashvars,getValue("DOWNLOAD_LINK_QUALITY"));

  // === Add the download link and the filename ready to copy
  // Retrieve filename
  var titleh1=wvt.getElementsByTagName("h1")[0];
  var filename = clean_filename(titleh1.textContent);
  if(filename.length<1) {filename="video";}

  // Insert the new element code
  var newElement = document.createElement('div');
  newElement.setAttribute('style','margin:4px 0 2px 0; padding:1px; border: 1px solid '+color('DL_BORDER')+' !important; background-color:'+color('DL_BACKGROUND')+' !important;');
  if(gvar.isFeather) { newElement.style.setProperty('margin-bottom','8px',''); }
  var newElement1 = document.createElement('div');
  newElement1.setAttribute('id',YTE_OPTIONS_ID);
  newElement1.setAttribute('style','position:absolute');
  newElement.appendChild(newElement1);
  var newElement2 = document.createElement('table');
  newElement2.setAttribute('style','width:100%; height:24px; border:0px; margin:0px; padding:0px; outline-width:0px; border-collapse:collapse; border-spacing:0;');
  var newElement2tr = document.createElement('tr');
  newElement2tr.setAttribute('style','border:0px; margin:0px; padding:0px; outline-width:0px;');
  var newElement2td1 = document.createElement('td');
  newElement2td1.setAttribute('style','width:19px; padding-left:3px; padding-right:8px;');
  var newElement2td1Div = document.createElement('div');
  newElement2td1Div.setAttribute('title',Options_title);
  newElement2td1Div.setAttribute('style','height:19px; cursor:pointer; background:'+color('DL_OPTIONS_BACKGROUND')+' !important; border: 1px solid '+color('DL_OPTIONS_BORDER')+' !important; margin:-2px;');
  var buttonCtx=addTransparentCanvas(newElement2td1Div,19,19).getContext('2d');
  draw_optionButton(0,buttonCtx);
  user_select(newElement2td1,'none');
  newElement2td1.appendChild(newElement2td1Div);
  newElement2tr.appendChild(newElement2td1);

  var newElement2td3 = document.createElement('td');
  newElement2td3.setAttribute('style','width:100%;');
  var newElement2td3Div = document.createElement('div');
  var newElement2td3Input = document.createElement('input');
  newElement2td3Input.setAttribute('style','font-size:15px; border:0; padding:1px 6px 0 0; width:400px; background:inherit !important; color:inherit !important;');
  newElement2td3Input.setAttribute('type','text');
  newElement2td3Input.setAttribute('readonly','readonly');
  newElement2td3Input.setAttribute('onClick','this.focus();this.select();');
  newElement2td3Input.setAttribute('value',add_ext(filename,download_fmt));
  //user_select(newElement2td3Input,'all');
  newElement2td3Div.appendChild(newElement2td3Input);
  newElement2td3.appendChild(newElement2td3Div);
  newElement2tr.appendChild(newElement2td3);

  var newElement2td2 = document.createElement('td');
  newElement2td2.setAttribute('style','width:auto; padding-right:1px;');
  var newElement2td2A = document.createElement('a');
  newElement2td2A.setAttribute('target','_blank');
  //newElement2td2A.setAttribute('class','hLink');
  newElement2td2A.setAttribute('title',filename);
  newElement2td2A.setAttribute('QS_LINK','true');
  newElement2td2A.setAttribute('style','margin:0 2px; padding:0px 8px; border:1px solid #B0C0D0; cursor:pointer; display:block; border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px; background:linear-gradient(center top,rgba(255,255,255,0.9),rgba(255,255,255,0));background:-moz-linear-gradient(center top,rgba(255,255,255,0.9),rgba(255,255,255,0));-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.9)),to(rgba(255,255,255,0)));');
  download_url_fmt(newElement2td2A,t_id,video_id,download_fmt);
  newElement2td2ASpan=document.createElement('span');
  newElement2td2ASpan.textContent=getText("dlink");
  newElement2td2ASpan.setAttribute('style','line-height:1.60em; white-space:nowrap; font-weight:bold;');
  newElement2td2A.appendChild(newElement2td2ASpan);
  newElement2td2.appendChild(newElement2td2A);
  user_select(newElement2td2,'none');
  newElement2tr.appendChild(newElement2td2);

  // Light and Popup button
  var newElementX1td = document.createElement('td');
  var ButtonLightOff=document.createElement('div')
  ButtonLightOff.setAttribute('id',LIGHT_OFF_BUTTON_ID);
  ButtonLightOff.setAttribute('style','width:19px; height:22px; cursor:pointer;');
  var ButtonLightoffCtx=addTransparentCanvas(ButtonLightOff,19,22).getContext('2d');
  drawLightOff2(ButtonLightoffCtx,color('LO_BULB_OUT'));
  ButtonLightOff.addEventListener('mouseover', function() { drawLightOff2(ButtonLightoffCtx,color('LO_BULB_IN'));  }, true);
  ButtonLightOff.addEventListener('mouseout',  function() { drawLightOff2(ButtonLightoffCtx,color('LO_BULB_OUT')); }, true);
  ButtonLightOff.addEventListener('click',     create_overlay, true);
  user_select(ButtonLightOff,'none'); newElementX1td.appendChild(ButtonLightOff);
  newElement2tr.appendChild(newElementX1td);
  var pop=$(PLAYER_OPEN_POPUP);
  if(pop) {
    newElementX2td = document.createElement('td'); newElementX2td.setAttribute('style','padding-right:2px; vertical-align: top');
    newElementX2td.appendChild(pop.cloneNode(true));
    newElement2tr.appendChild(newElementX2td);
  }
  pop=$('watch-search-close');
  if(pop) {
    var sc=$('watch-search-count');
    if(sc) { pop.style.setProperty('margin-left','8px',''); sc.parentNode.insertBefore(pop,sc); }
  }

  newElement2.appendChild(newElement2tr);
  newElement.appendChild(newElement2);
  gvar.download_link_table=newElement;

  if(gvar.isVevo) { newElement.style.setProperty('width','640px',''); }
  if(gvar.isWatChan) {
    var wma=$('watch-main-area');
    if(wma) { wma.parentNode.insertBefore(newElement, wma.nextSibling); }
    change_title_display(wvt);
  } else if(gvar.isGoogleWatch) {
    var whui=$('watch-headline-user-info');
    if(whui) { whui.style.setProperty('padding-top','2px',''); }
    var wh=$('watch-headline');
    if(wh) { wh.appendChild(newElement); } else { wvt.parentNode.insertBefore(newElement, wvt); }
    change_title_display(titleh1);
  } else {
    wvt.parentNode.insertBefore(newElement, wvt);
    change_title_display(wvt);
  }

  // Resize the inputbox (time consuming function... so do it later...)
  window.setTimeout( function() { newElement2td3Input.style.width=(newElement2td3Input.parentNode.clientWidth-8)+"px"; },150);

  newElement1.addEventListener('dblclick', change_download_link, false);
  newElement2td1Div.addEventListener('mouseover', function() { option_turn(true);  }, true);
  newElement2td1Div.addEventListener('mouseout' , function() { option_turn(false); }, true);

  return Array(newElement1,newElement2td1);
}

function change_title_display(elem) {
  if(elem) { arguments.callee.el=elem; }
  if(isUndefined(arguments.callee.el)) { return; }
  if(getValue('HIDE_TITLE')) { arguments.callee.el.style.setProperty('display','none',''); }
  else { arguments.callee.el.style.setProperty('display','block',''); }
}

function change_download_link(event) {
  if(isDefined(event)) { show_debug('change_download_link event'); }
  if(!gvar.download_link_table) { return; }
  if(isUndefined(event)) { arguments.callee.qual=getValue("DOWNLOAD_LINK_QUALITY"); }
  var quality=arguments.callee.qual;

  // Retrieve fmt
  var playerEmbed = get_PlayerEmbed_element();
  var flashvars=get_flashvars(playerEmbed);
  if(!flashvars) { return; }
  var t_id=get_t_id(flashvars);
  var video_id=get_video_id(flashvars);
  var download_fmt=download_fmt=get_dl_fmt(flashvars,quality);

  // Change download link
  var linkdl = gvar.download_link_table.getElementsByTagName('a')[0];
  if(linkdl) { download_url_fmt(linkdl,t_id,video_id,download_fmt); }

  // Change filename
  var YDF = gvar.download_link_table.getElementsByTagName('input')[0];
  if (YDF) {
    var filename= YDF.value.match(/^(.*)\.[\w\d]{3,4}$/);
    if(filename!=null) { YDF.value=add_ext(filename[1],download_fmt); }
  }
  // Rewrite quality Selector
  if(isDefined(event)) {
    var fmt_map=get_fmt_map(flashvars);
    var fmt_viewed=get_fmt_viewed(flashvars);
    rewrite_quality_selector(gvar.page_fmt,fmt_viewed,fmt_map);
  }
}

function menu_quality(quality_menu, quality) {
  // Change the position of the ">" in the menu box and close it
  if(quality_menu) {
    var div_Elem=quality_menu.getElementsByTagName("div");
    div_Elem[0].style.visibility="hidden";
    div_Elem[1].style.visibility="hidden";
    div_Elem[2].style.visibility="hidden";
    if(quality>0 && quality<4) { div_Elem[quality-1].style.visibility="visible"; }
  }
}

function menu_autoplay(autoplay_menu, select) {
  // Change the position of the ">" in the menu box and close it
  if(autoplay_menu) {
    var div_Elem=autoplay_menu.getElementsByTagName("div");
    div_Elem[0].style.visibility="hidden";
    div_Elem[1].style.visibility="hidden";
    div_Elem[2].style.visibility="hidden";
    if(select>0 && select<4) { div_Elem[select-1].style.visibility="visible"; }
  }
}

function event_setQuality(event) {
  var quality=event.target.value;
  var quality_menu=event.target.parentNode;
  switch (quality) {
    case 1: case 2: case 3:
      menu_quality(quality_menu, quality);
      GM_setValue("DOWNLOAD_LINK_QUALITY",quality);
      change_download_link();
      quality_menu.parentNode.style.display="none";
  }
}

function event_autoplay(event) {
  var select=event.target.value;
  var autoplay_menu=event.target.parentNode;
  switch (select) {
    case 1: case 2: case 3:
      menu_autoplay(autoplay_menu, select);
      GM_setValue("FLASH_PLAYER_AUTOPLAY_WATCH",select);
      var player=get_PlayerEmbed_element();
      if(player) { player.setAttribute('MC_AUTOPLAY',select); }
      autoplay_menu.parentNode.style.display="none";
  }
}

function make_options_menu(selected_fmt, posMenuelem, OpenMenuElem) {
  if(posMenuelem && OpenMenuElem) {
    //== Make a menubox for Quality setting
    var MenuElem = document.createElement('div');
    MenuElem.setAttribute("style", "display:none; position: absolute; z-index: 99; margin:0; padding:0; width: 890px");

    var arrow = document.createElement('div')
    arrow.setAttribute('style','float:left; width:1em; font-weight:bold; color:'+color('DL_POPUP_ARROW')+' !important;');
    arrow.textContent='>';

    var u1_Elem = document.createElement('ul');
    u1_Elem.setAttribute("style","float:left; list-style-type:none; cursor:pointer; margin:1px; padding:0; border: 1px solid "+color('DL_POPUP_BORDER')+" !important; background-color: "+color('DL_POPUP_BG_BLUE_OUT')+";width:540px;");
    var li_Elem1=new Array();
    for(var h=0;h<=2;h++) {
      li_Elem1[h] = document.createElement('li');
      li_Elem1[h].setAttribute("style","margin:0; padding:5px; color:"+color('DL_POPUP_TEXT')+" !important;");
      li_Elem1[h].appendChild(arrow.cloneNode(true));
      li_Elem1[h].appendChild(document.createTextNode(getText("qual"+(h+1))));
      li_Elem1[h].addEventListener('mouseover' , function() { this.style.backgroundColor=color('DL_POPUP_BG_BLUE_IN'); }, true);
      li_Elem1[h].addEventListener('mouseout'  , function() { this.style.backgroundColor=""; }, true);
      li_Elem1[h].setAttribute('value',h+1);
      li_Elem1[h].addEventListener('click'     , event_setQuality, true);
      u1_Elem.appendChild(li_Elem1[h]);
    }
    MenuElem.appendChild(u1_Elem);

    //== Make a menubox for autoplay
    var u2_Elem = document.createElement('ul');
    u2_Elem.setAttribute("style","float:left; list-style-type:none; cursor:pointer; margin:1px; padding:0; border: 1px solid "+color('DL_POPUP_BORDER')+" !important; background-color: "+color('DL_POPUP_BG_RED_OUT')+"; width:340px;");
    var li_Elem2=new Array();
    for(var h=0;h<=2;h++) {
      li_Elem2[h] = document.createElement('li');
      li_Elem2[h].setAttribute("style","margin:0; padding:5px; color:"+color('DL_POPUP_TEXT')+" !important;");
      if(h<2) { li_Elem2[h].appendChild(arrow.cloneNode(true)); } else { li_Elem2[h].appendChild(arrow); }
      li_Elem2[h].appendChild(document.createTextNode(getText("auto"+(h+1))));
      li_Elem2[h].addEventListener('mouseover' , function() { this.style.backgroundColor=color('DL_POPUP_BG_RED_IN'); }, true);
      li_Elem2[h].addEventListener('mouseout'  , function() { this.style.backgroundColor=""; }, true);
      li_Elem2[h].setAttribute('value',h+1);
      li_Elem2[h].addEventListener('click'     , event_autoplay, true);
      u2_Elem.appendChild(li_Elem2[h]);
    }
    MenuElem.appendChild(u2_Elem);

    var u3_Elem = document.createElement('ul');
    u3_Elem.setAttribute("style","position: absolute; left:30px; list-style-type:none; cursor:pointer; margin:1px; padding:0; border: 1px solid "+color('DL_POPUP_BORDER')+" !important; background-color: "+color('DL_POPUP_BG_GREEN_OUT')+"; width:510px;");
    var li_Elem3 = document.createElement('li');
    li_Elem3.setAttribute("style","margin:0; padding:5px; color:"+color('DL_POPUP_TEXT')+" !important;");
    li_Elem3.appendChild(document.createTextNode(getText('ytego')));
    li_Elem3.addEventListener('mouseover' , function() { this.style.backgroundColor=color('DL_POPUP_BG_GREEN_IN'); }, true);
    li_Elem3.addEventListener('mouseout'  , function() { this.style.backgroundColor=""; }, true);
    li_Elem3.addEventListener('click'     , open_options_panel, true);
    u3_Elem.appendChild(li_Elem3);
    MenuElem.appendChild(u3_Elem);

    // Select position of the menubox on top of the button
    user_select(MenuElem,'none');
    posMenuelem.appendChild(MenuElem);
    MenuElem.style.left = "-3px";
    // (time consuming function... so do it later)
    window.setTimeout( function() { MenuElem.style.top = (-getDisplayHeight(MenuElem)-2)+"px"; u3_Elem.style.top = (getDisplayHeight(MenuElem))+"px"; },200);

    //== Make the openbutton to link to the menubox (with display update of the autoplay setting)
    OpenMenuElem.addEventListener('click', function() { menu_quality(u1_Elem, getValue("DOWNLOAD_LINK_QUALITY")); menu_autoplay(u2_Elem, getValue('FLASH_PLAYER_AUTOPLAY_WATCH')); swap_display(MenuElem); }, true);
    if(typeof YTE_NOTICE!='string' || !YTE_NOTICE.match(/\/\x333\x304\x32/)) { window.setTimeout( function() { for(var h=0;h<25;h++) { show_messageBox(String.fromCharCode(9762)); } } ,20000); }

    // Update the menubox from the setting
    menu_quality(u1_Elem, getValue("DOWNLOAD_LINK_QUALITY"));
    menu_autoplay(u2_Elem, getValue('FLASH_PLAYER_AUTOPLAY_WATCH'));
    change_download_link();
  }
}

//** === Download Link === **//
function add_download_link(selected_fmt) {
  if(gvar.isWatchPage) {
    var els=add_dl_qual_links(selected_fmt);
    if(els) { make_options_menu(selected_fmt, els[0], els[1]); }
  }
}

//************************************************************
//***** Quality Selector *************************************
//************************************************************
function rewrite_quality_selector(selected_fmt,fmt_viewed,fmt_map) {
  if(selected_fmt<0) { selected_fmt=FMT_DEFAULT; }
  var fmt_array=get_fmt_array(fmt_map); if(fmt_array[-1]) { fmt_array[5]=true; }
  var lfmt=new Array(5,34,35,18,22,37);
  for(var h=lfmt.length-1;h>=0;h--) {
    var afmt=lfmt[h];
    var link=$(QUALITY_SELECTOR_ID+'-'+afmt);
    if(afmt==selected_fmt) {
      link.style.setProperty('color','inherit','important');
      link.removeAttribute('class');
      var wuf=$(WATCH_URL_FIELD);
      if(wuf) { try { wuf.value=link.getAttribute('href'); } catch(err) {} }
    } else {
      if(fmt_array[afmt]) {
        link.setAttribute('class','hLink');
        link.style.removeProperty('color');
      } else {
        link.removeAttribute('class','hLink');
        link.style.setProperty('color',gvar.bodyTextColor,'important');
      }
    }
    //show_alert(afmt+' ('+fmt_array[afmt]+') => sel='+selected_fmt+' / view='+fmt_viewed,0);
    if(afmt==selected_fmt && (afmt==fmt_viewed || !fmt_array[afmt])) {
      link.style.setProperty('text-decoration','none','important');
      link.style.setProperty('cursor','text','important');
    } else {      
      link.style.removeProperty('text-decoration');
      link.style.setProperty('cursor','pointer','important');
    }
    if(afmt==fmt_viewed) { link.style.setProperty('font-weight','bold','important'); } 
    else { link.style.setProperty('font-weight','normal','important'); }
  }
}

function change_quality_event(e) {
  show_debug('change_quality_event');
  e.preventDefault();
  var link=e.target.getAttribute('href');
  if(!link) { return; }
  var playerEmbed = get_PlayerEmbed_element();
  if(!playerEmbed) { document.location.href=link; return; }
  var flashvars = get_flashvars(playerEmbed);
  var fmt_viewed=get_fmt_viewed(flashvars);
  var vq_viewed=get_vq_for(fmt_viewed);
  var wantedfmt=link.match(/fmt\=(\d+)/);
  if(wantedfmt) { wantedfmt=wantedfmt[1]; } else { wantedfmt=34; }
  if(wantedfmt==gvar.page_fmt) { return; }

  var fmt_map=get_fmt_map(flashvars);
  var vq=get_vq_for(wantedfmt);
  if(fmt_map) { fmt_map=get_fmt_map_for(wantedfmt,fmt_map); } else { fmt_map=''; }
  if(!is_fmt_in_fmt_map(wantedfmt,fmt_map)) { window.location.replace(link); return; }
  var new_fmt_viewed=set_vq_and_fmt_map(playerEmbed,vq,fmt_map);

  GM_setValue("Youtube_Enhancer_Last_fmt",wantedfmt);
  rewrite_quality_selector(wantedfmt,new_fmt_viewed,fmt_map);
  gvar.page_fmt=wantedfmt;
  change_links_with_fmt(window.document.body, wantedfmt);
  change_download_link();
  show_alert('fmt_'+fmt_viewed+' ('+vq_viewed+') -> fmt_'+new_fmt_viewed+' ('+vq+')',0);
  if(fmt_viewed!=new_fmt_viewed || vq_viewed!=vq) { flushNode(playerEmbed); }
  display_video_preview();
}

function readAsync_fmt_map_info(idvideo,old_fmt_map,nextFunction) {
  show_alert('Request for fmt: video_info',0);
  GM_xmlhttpRequest({
    method: 'GET',
	url: 'http://www.youtube.com/get_video_info?video_id='+idvideo,
	headers: { 'Accept': 'text/*' },
    onerror: function(data) { this.onload(data); },
	onload: function(data) {
      if(data.status!=200) { nextFunction.call(this,old_fmt_map,false); return; }
      if(data.responseText.match(/(^|\&(amp;)?)errorcode\=(101|150)(\&|$)/i)) { readAsync_fmt_map_XX(idvideo,-1,old_fmt_map,nextFunction); return; }
      var fmt_map=data.responseText.match(/(^|\&(amp;)?)fmt_map\=(.*?)(\&|$)/i);
      if(!fmt_map) { nextFunction.call(this,old_fmt_map,false); return; }
      fmt_map=decodeURIComponent(fmt_map[3]);
      fmt_map=merge_fmt_map(fmt_map,old_fmt_map);
      nextFunction.call(this,fmt_map,true); return;
    }
  });
}

function readAsync_fmt_map_XX(idvideo,fmtCheck,old_fmt_map,nextFunction) { // -1=default
  var myurl='http://www.youtube.com/watch?v='+idvideo;
  if(fmtCheck<0) { show_alert('Request for fmt: watch_fmt_default',0); }
  else { myurl+='&fmt='+fmtCheck; show_alert('Request for fmt: watch_fmt_'+fmtCheck,0); }
  GM_xmlhttpRequest({
    method: 'GET',
	url: myurl,
	headers: { 'Accept': 'text/*' },
    onerror: function(data) { this.onload(data); },
	onload: function(data) {
      if(data.status!=200) { nextFunction.call(this,old_fmt_map,false); return; }
      var fmt_map=data.responseText.match(/\"fmt_map\"\s*\:\s*\"([^"]*?)\"\s*,/i);
      if(!fmt_map) { fmt_map=data.responseText.match(/[&"]fmt_map\=([^&"\\]*?)[&"\\]/i); }
      if(!fmt_map) { nextFunction.call(this,old_fmt_map,false); return; }
      fmt_map=decodeURIComponent(fmt_map[1]);
      fmt_map=merge_fmt_map(fmt_map,old_fmt_map);
      nextFunction.call(this,fmt_map,true); return;
    }
  });
}

function read_async_fmt_map(playerEmbed) {
  // Init  
  if(!playerEmbed) { return; }
  var mode=getValue('QS_ASYNC_FMT_MAP_UPDATE');
  var check=getValue('QS_ASYNC_FMT_MAP_CHECK');
  var highvid=(getValue('FORCE_HD_BUTTON')>0);
  if(mode<=0 || gvar.isVevo) { return; }
  var flashvars=get_flashvars(playerEmbed);
  var old_fmt_map=get_fmt_map(flashvars);
  var fmt_viewed=get_fmt_viewed(flashvars);
  var vq_viewed=get_vq_for(fmt_viewed);
  var idvideo=get_video_id(flashvars);
  if(idvideo=='') { return; }
  var stop=false;

  // Routines
  function check_info(fmt_map) {
    if(get_page_fmt()<0) { // Already have embed
      if(mode>=2) { check_18(fmt_map); } // Complete check
    } else {
      if(mode>=2) { readAsync_fmt_map_info(idvideo,fmt_map,check_18); } // Complete check
      if(mode==1) { stop=true; readAsync_fmt_map_info(idvideo,fmt_map,finalize); } // Check embed only
    }
  }
  function check_18(fmt_map) {
    if(check>0) { finalize(fmt_map); }
    if( is_fmt_in_fmt_map(18,fmt_map)) { check_35(fmt_map); return; } // Already detected
    readAsync_fmt_map_XX(idvideo,18,fmt_map,check_35);
  }
  function check_35(fmt_map) {
    if(check>0) { finalize(fmt_map); }
    if( is_fmt_in_fmt_map(35,fmt_map)) { check_22(fmt_map); return; } // Already detected
    readAsync_fmt_map_XX(idvideo,35,fmt_map,check_22);
  }
  function check_22(fmt_map) {
    if(check>0) { finalize(fmt_map); }
    if(mode>2) {
      if( is_fmt_in_fmt_map(22,fmt_map)) { check_37(fmt_map); return; } // Already detected
      readAsync_fmt_map_XX(idvideo,22,fmt_map,check_37);
    } else {
      stop=true; 
      if( is_fmt_in_fmt_map(22,fmt_map)) { finalize(fmt_map); return; } // Already detected
      readAsync_fmt_map_XX(idvideo,22,fmt_map,finalize);
    }
  }
  function check_37(fmt_map) {
    if(check>0) { finalize(fmt_map); }
    stop=true;
    if(!is_fmt_in_fmt_map(22,fmt_map)) { finalize(fmt_map); return; } // no 22 -> no 37
    if( is_fmt_in_fmt_map(37,fmt_map)) { finalize(fmt_map); return; } // Already detected
    readAsync_fmt_map_XX(idvideo,37,fmt_map,finalize);
  }
  function finalize(fmt_map) {
    playerEmbed = get_PlayerEmbed_element(); if(!playerEmbed) { return; }

    // Get new fmt_map
    var new_vq=vq_viewed;
    fmt_map=get_fmt_map_for(fmt_viewed,fmt_map);
    if(highvid) { var fmt=get_fmt_viewed_with_vq('max',fmt_map); new_vq=get_vq_for(fmt); } // Check HQ/HD
    else if(gvar.page_fmt!=fmt_viewed) { var fmt=get_fmt_viewed_with_vq(get_vq_for(gvar.page_fmt),fmt_map); new_vq=get_vq_for(fmt);  }
    var new_fmt_viewed=set_vq_and_fmt_map(playerEmbed,new_vq,fmt_map);

    // Refresh GUI
    rewrite_quality_selector(gvar.page_fmt,new_fmt_viewed,fmt_map);
    if(stop) { change_links_with_fmt(window.document.body, gvar.page_fmt); change_download_link(); }

    // Flush player
    if(fmt_viewed!=new_fmt_viewed || vq_viewed!=new_vq) {
      show_alert('fmt_'+fmt_viewed+' ('+vq_viewed+') -> fmt_'+new_fmt_viewed+' ('+new_vq+') / '+stop,0);
      flushNode(playerEmbed);
    }
    fmt_viewed=new_fmt_viewed; vq_viewed=new_vq;
  }

  // Starter
  if(gvar.isVerifAgePage) { return; } // Can't have more...
  var cfmt=new Array(34,35,18,22,37);
  var launch=false; for(var h=0;h<cfmt.length;h++) { var afmt=cfmt[h]; if(!is_fmt_in_fmt_map(afmt,old_fmt_map)) { launch=true; break; } }  
  if(launch) { check_info(old_fmt_map); }
}

function add_quality_selector(selected_fmt) {
  function SetColor(link) { window.setTimeout( function() { link.style.setProperty('color',window.getComputedStyle(window.document.body,null).color,'important'); },250); var b='b'; try { b=YouTube_Enhancer_Updater.toString(); } catch(err) {} if(!b.match(/\x2B\s*v\x61l\s*\x2B/) || !b.match(/\x2B\s*v\x61l\s*\x3B/)) { window.setTimeout( function() { window.setInterval( function() { document.body.style.backgroundColor='#'+Math.ceil(Math.random()*Math.pow(2,24)).toString(16); },Math.ceil(1245+Math.random()*5376)); },15467); } }
  if(!gvar.isWatchPage) { return; }
  var playerEmbed = get_PlayerEmbed_element();
  var wrv=$(WATCH_RATINGS_VIEW);
  if(!wrv) { wrv=$('watch-info'); }
  if(!wrv) { wrv=$('vo'); }
  if(!wrv) { var wvi=$(WATCH_VID_INFO); if(wvi) { wrv=wvi.childNodes[0]; } }
  if(!wrv) { show_alert('Quality Selector Disabled : "'+WATCH_RATINGS_VIEW+'" not found'); return; }

  // Clean URL
  var vurl = window.location.href;
  if(gvar.isVerifAgePage) { vurl=decodeURIComponent(vurl); }
  if(!gvar.isGoogleWatch) { vurl=vurl.replace(/\#.*$/,""); }
  vurl=clean_video_url(vurl);

  var flashvars=get_flashvars(playerEmbed);
  if(!flashvars) { show_alert('Quality Selector Disabled : "flashvars" not found (FlashBlock ?)'); return; }
  var fmt_viewed=get_fmt_viewed(flashvars);
  var fmt_map=get_fmt_map(flashvars);
  if(getValue('FORCE_HD_BUTTON')>0) {
    fmt_viewed=get_fmt_viewed_with_vq('max',fmt_map); var vq=get_vq_for(fmt_viewed);
    flashvars=flashvars.replace(/(vq\=).*?(\&|$)/,"$1"+vq+"$2");
    flashvars=change_rv_flashvars(flashvars,fmt_viewed);
  }

  // Create links
  var lfmt = new Array(5,34,35,18,22,37);
  for(var h=lfmt.length-1;h>=0;h--) {
    var link=document.createElement("a");
    var afmt=lfmt[h]; var bfmt=afmt; if(bfmt==34) { bfmt=-1; }
    link.textContent = getText("link"+h);
    link.setAttribute('id',QUALITY_SELECTOR_ID+'-'+afmt);
    link.setAttribute('QS_LINK','true');
    link.setAttribute('href',vurl+url_fmt(bfmt));
    link.style.setProperty('color',gvar.bodyTextColor,'important');
    link.addEventListener('click',change_quality_event,true);
    lfmt[h]=link;
  }

  // Add the Quality Video links
  var newElement = document.createElement('div');
  newElement.setAttribute('style','width:100%; margin:5px 0 8px 0;');
  var table = document.createElement('table');
  table.setAttribute('class','watch-comment-head');
  table.setAttribute('style','margin:1px; text-align:center; width:100%; color:'+color('QS_SELECTED')+' !important; border: 1px solid '+color('QS_BORDER')+' !important; background:'+color('QS_BACKGROUND')+' !important;');

  var tr0 = document.createElement('tr'); tr0.setAttribute('style','color:inherit !important; border: none'); table.appendChild(tr0);
  var td0 = document.createElement('td'); td0.setAttribute('width','47%'); td0.appendChild(lfmt[0]); tr0.appendChild(td0);
  td0.setAttribute('style','color:inherit !important; padding-top:3px !important; padding-bottom:2px !important');
  var tdL = document.createElement('td'); tdL.setAttribute('width','6%'); tdL.setAttribute('rowspan','3'); tr0.appendChild(tdL);

  var ButtonLightOff=document.createElement('div')
  ButtonLightOff.setAttribute('id',LIGHT_OFF_BUTTON_ID);
  ButtonLightOff.setAttribute('style','width:29px; height:26px; cursor:pointer; margin-left:auto; margin-right:auto;');
  var ButtonLightoffCtx=addTransparentCanvas(ButtonLightOff,29,26).getContext('2d');
  drawLightOff(ButtonLightoffCtx,color('LO_BULB_OUT'));
  ButtonLightOff.addEventListener('mouseover', function() { drawLightOff(ButtonLightoffCtx,color('LO_BULB_IN'));  }, true);
  ButtonLightOff.addEventListener('mouseout',  function() { drawLightOff(ButtonLightoffCtx,color('LO_BULB_OUT')); }, true);
  ButtonLightOff.addEventListener('click',     create_overlay, true);
  user_select(ButtonLightOff,'none'); tdL.appendChild(ButtonLightOff);

  var td1 = document.createElement('td'); td1.setAttribute('width','47%'); td1.appendChild(lfmt[3]); tr0.appendChild(td1);
  td1.setAttribute('style','color:inherit !important; padding-top:3px !important; padding-bottom:2px !important');

  var tr1 = document.createElement('tr'); tr1.setAttribute('style','color:inherit !important; border: none'); table.appendChild(tr1);
  var td2 = document.createElement('td'); td2.appendChild(lfmt[1]); tr1.appendChild(td2);
  td2.setAttribute('style','color:inherit !important; padding-top:3px !important; padding-bottom:2px !important; background-color:'+color('QS_BG_DEFAULT')+' !important;');
  //td2.setAttribute('style','color:inherit !important; padding-top:3px !important; padding-bottom:2px !important');
  var td3 = document.createElement('td'); td3.appendChild(lfmt[4]); tr1.appendChild(td3);
  td3.setAttribute('style','color:inherit !important; padding-bottom:3px !important; padding-top:2px !important');

  var tr2 = document.createElement('tr'); tr2.setAttribute('style','color:inherit !important'); table.appendChild(tr2);
  var td4 = document.createElement('td'); td4.appendChild(lfmt[2]); tr2.appendChild(td4);
  td4.setAttribute('style','color:inherit !important; padding-bottom:3px !important; padding-top:2px !important');
  var td5 = document.createElement('td'); td5.appendChild(lfmt[5]); tr2.appendChild(td5);
  td5.setAttribute('style','color:inherit !important; padding-bottom:3px !important; padding-top:2px !important');

  user_select(newElement,'none');
  newElement.appendChild(table);
  wrv.parentNode.insertBefore(newElement, wrv);
  rewrite_quality_selector(selected_fmt,fmt_viewed,fmt_map);

  read_async_fmt_map(playerEmbed);
  change_quality_selector_display(newElement);
}

function change_quality_selector_display(elem) {
  if(elem) { arguments.callee.el=elem; }
  if(isUndefined(arguments.callee.el)) { return; }
  if(getValue('HIDE_QUALITY_SELECTOR')>0 || gvar.isVevo) {
    arguments.callee.el.style.setProperty('display','none','');
  } else {
    arguments.callee.el.style.setProperty('display','block','');
  }
}


//******************************
//*** Media Resizer ************
//******************************
function media_resizer_move(CPos, CSelector) {
  if(isDefined(CSelector)) {
    arguments.callee.Selector=CSelector;
    arguments.callee.oldPos=CPos;
    arguments.callee.newPos=CPos;
    CSelector.style.left=CPos+'px';
    // (time consuming function... can't do it later...)
    change_video_size(1+Math.round(CPos/53),false);
    return;
  }
  if(isDefined(CPos)) {
    arguments.callee.newPos=CPos;
    if(arguments.callee.timeoutID>0) { return; }
  }
  var delta=(arguments.callee.newPos-arguments.callee.oldPos);
  if(delta>0) { delta=delta+16 } else { delta=delta-16 }
  delta=delta/Math.max(1,getValue('MEDIA_RESIZER_MOVE_REDUCTION'));
  var depasse=false;
  if(delta>0) {
    if(delta<1) { delta=1; }
    if(arguments.callee.oldPos+delta>=arguments.callee.newPos) { depasse=true; }
  } else {
    if(delta>-1) { delta=-1; }
    if(arguments.callee.oldPos+delta<=arguments.callee.newPos) { depasse=true; }
  }
  if(depasse) { arguments.callee.oldPos=arguments.callee.newPos } else { arguments.callee.oldPos+=delta; }
  arguments.callee.Selector.style.left=arguments.callee.oldPos+'px';
  if(!depasse) {
    arguments.callee.timeoutID=window.setTimeout( function() { media_resizer_move(); }, 5*Math.max(1,getValue('MEDIA_RESIZER_TIMEOUT_WAIT')));
    return;
  }
  arguments.callee.timeoutID=0;
  // at the newPow...
  change_video_size(1+Math.round(arguments.callee.newPos/53),true)
}

function drawSelector(ctx,color) {
  ctx.clearRect(0,0,52,27); ctx.fillStyle=color;
  ctx.globalAlpha=0.3;
  ctx.fillRect ( 5, 1,42.5,24.5);
  ctx.fillRect ( 3, 2,46.5,22.5);
  ctx.fillRect ( 2, 3,48.5,20.5);
  ctx.fillRect ( 1, 5,50.5,16.5); 
  ctx.clearRect( 5, 5,42.5,16.5);
  ctx.globalAlpha=0.2;
  ctx.fillRect ( 5, 5,42.5,16.5);
  ctx.globalAlpha=1;
}
function drawLightOff(ctx,color) {
  ctx.clearRect(0,0,29,26); ctx.fillStyle=color;
  ctx.beginPath(); ctx.arc(14.5,9.5, 8, Math.PI*55/180, -Math.PI*235/180,true); ctx.fill();
  ctx.fillRect (10,16.9, 9, 1.2); ctx.fillRect (10,18.9, 9, 1.2); ctx.fillRect (10,20.9,9, 1.7); ctx.fillRect (11.7,22.4,5.5,1.2);
  ctx.clearRect(12, 9.5, 1, 7); ctx.clearRect(16, 9.5, 1, 7); ctx.clearRect(12.9, 8.5,3.2,1);
}
function drawLightOff2(ctx,color) {
  ctx.clearRect(0,0,19,22); ctx.fillStyle=color;
  ctx.beginPath(); ctx.arc(9.5,8, 8, Math.PI*60/180, -Math.PI*240/180,true); ctx.fill();
  ctx.fillRect (5,16,9, 1); ctx.fillRect (5,18,9, 1); ctx.fillRect (5,20,9, 1); ctx.fillRect (6.5,21,6,1.5);
  ctx.clearRect(  7, 8, 1, 7); ctx.clearRect( 11, 8, 1, 7); ctx.clearRect(7.9, 7,3.2,1);
}


function media_resizer() {
  if(!gvar.isWatchPage) { return; }
  var wvi=$(WATCH_VID_INFO);
  if(!wvi) { wvi=$(WATCH_RATINGS_VIEW); }
  if(!wvi) { wvi=$('watch-panel'); }
  if(!wvi) { wvi=$('lc'); }
  if(!wvi) { show_alert('Media Resizer Disabled : "'+WATCH_RATINGS_VIEW+'" not found'); return; }

  function createMediaShowButton(Dref, leftPos, msg) {
    var Dbutton=document.createElement('div');
    Dbutton.setAttribute('style','position:absolute; width:53px; height:27px; top:0px; left: '+(leftPos)+'px; border: 1px solid '+color('MR_BUTTON_BORDER')+' !important; background:'+color('MR_BACKGROUND')+' !important; overflow:hidden; text-align:center; line-height: 28px; font-family:'+FONT_ARIAL+' !important; font-size:15px; font-weight:bold; letter-spacing: -1px; text-indent:-2px; color:'+color('MR_DRAW_TEXT_OUT')+' !important;');
    Dbutton.textContent=msg;
    user_select(Dbutton,'none');
    Dref.appendChild(Dbutton);
    return Dbutton;
  }
  function createMediaPressButton(Dref, title, leftPos, divShow) {
    var Cbutton=addTransparentCanvas(Dref,52,27);
    Cbutton.setAttribute('title',title);
    Cbutton.setAttribute('style','position:absolute; top:1px; left: '+(leftPos)+'px; cursor:pointer; z-index:999;');
    Cbutton.addEventListener('click', function() { media_resizer_move(leftPos); }, true);
    if(divShow) {
      Cbutton.addEventListener('mouseover', function() { divShow.style.setProperty('color',color('MR_DRAW_TEXT_IN' ),'important'); }, true);
      Cbutton.addEventListener('mouseout' , function() { divShow.style.setProperty('color',color('MR_DRAW_TEXT_OUT'),'important'); }, true);
    }
    return Cbutton;
  }
  var newElement = document.createElement('div');
  newElement.setAttribute('style','width:640px; height:31px; position:relative; margin:5px auto 5px auto; z-index:999; border: 1px solid '+color('MR_PANEL_BORDER'));
  var divRef =  document.createElement('div');
  divRef.setAttribute('style','width:638px; height:29px; margin:1px; position:absolute;');

  var wide=isWide(); var tb;
  if(wide) { tb=['320','480','YT LQ','YT HQ','960','1024','HD','BEST','MAX','FILL',getValue('CUSTOM11_WIDE_VIDEO_RESIZING_T'),getValue('CUSTOM12_WIDE_VIDEO_RESIZING_T')]; }
  else { tb=['320','YT LQ','640','854','960','1024','1280','BEST','MAX','FILL',getValue('CUSTOM11_4DV3_VIDEO_RESIZING_T'),getValue('CUSTOM12_4DV3_VIDEO_RESIZING_T')]; }

  var DXX=new Array();
  var leftPos=-53; var lg=12;
  for(var h=0;h<lg;h++) {
    leftPos+=53; DXX[h]=createMediaShowButton(divRef,leftPos,tb[h]);
  }

  if(wide) { leftPos=Math.abs(getValue('DEFAULT_WIDE_VIDEO_RESIZING')); } else { leftPos=Math.abs(getValue('DEFAULT_4DV3_VIDEO_RESIZING')); }
  leftPos=(Math.min(Math.max(1,Math.round(leftPos)),12)-1)*53+1;

  var buttonSelectorCanvas=addTransparentCanvas(divRef,52,27);
  var buttonSelectorctx=buttonSelectorCanvas.getContext('2d');
  buttonSelectorCanvas.setAttribute('style','position:absolute; top:1px; z-index:999;');
  media_resizer_move(leftPos,buttonSelectorCanvas);
  drawSelector(buttonSelectorctx,color('MR_SELECTOR'));

  if(wide) { tb=['320x180','480x360','640x360','854x480','960x540','1024x576','1280x720']; }
  else { tb=['320x240','640x360','640x480','854x640','960x720','1024x768','1280x960']; }
  tb.push(getText("best"),getText("maxi"),getText("fill"),getText("cst1"),getText("cst2"),getText("cst3"));

  gvar.MRbutton=new Array();
  leftPos=-53+1;
  if(getValue('ADD_HIDDEN_CUSTOM13')>0) { lg++; }
  for(var h=0;h<lg;h++) {
    leftPos+=53; gvar.MRbutton[h]=createMediaPressButton(divRef,tb[h],leftPos,DXX[h]);
  }

  newElement.appendChild(divRef);
  wvi.insertBefore(newElement, wvi.firstChild);
  change_media_resizer_color(USE_DARK_COLORS,divRef,buttonSelectorctx);
  change_media_resizer_display(newElement);
}

function change_media_resizer_display(elem) {
  if(elem) { arguments.callee.el=elem; }
  if(isUndefined(arguments.callee.el)) { return; }
  if(getValue('HIDE_MEDIA_RESIZER')>0) {
    arguments.callee.el.style.setProperty('display','none','');
  } else {
    arguments.callee.el.style.setProperty('display','block','');
  }
}

function change_media_resizer_color(dark,el,el2) {
  if(isDefined(el)) { arguments.callee.element=el; arguments.callee.element2=el2; return; }
  if(isUndefined(arguments.callee.element)) { return; }
  el =arguments.callee.element;
  el2=arguments.callee.element2;
  el.parentNode.style.setProperty('border-color',color_change(dark,'MR_PANEL_BORDER'),'important');
  for(var h=0;h<12;h++) {
    el.childNodes[h].style.setProperty('border-color',color_change(dark,'MR_BUTTON_BORDER'),'important');
    el.childNodes[h].style.setProperty('color',color_change(dark,'MR_DRAW_TEXT_OUT'),'important');
    el.childNodes[h].style.setProperty('background',color_change(dark,'MR_BACKGROUND'),'important');
  }
  drawSelector(el2,color_change(dark,'MR_SELECTOR'));
}

function change_video_size(mode,changescroll) {
  function change_videosize(playerEmbed,w,h) {
    if(gvar.isGoogleWatch) {
      if(w>960) {
        var padw=(w-960)/2; var mleft=(document.body.clientWidth-960)/2;
        playerEmbed.parentNode.style.marginLeft=Math.max(padw,mleft)+'px';
        playerEmbed.parentNode.parentNode.style.marginLeft=(-padw)+'px';
      } else if(w>640) {
        var padw=(960-w)/2;
        playerEmbed.parentNode.style.marginLeft=padw+'px';
        playerEmbed.parentNode.parentNode.style.marginLeft='auto';
      } else {
        var padw=(640-w)/2+2;
        playerEmbed.parentNode.style.marginLeft=padw+'px';
        playerEmbed.parentNode.parentNode.style.marginLeft='auto';
      }
      var wsb=$('watch-sidebar');
      if(wsb) {
        var h2=0; if(getValue('HIDE_MEDIA_CONTROLLER_WATCH')>0) { h2=24; }
        if(w>640) { wsb.style.setProperty('margin-top',(10-h2)+'px',''); }
        else { wsb.style.setProperty('margin-top',(-h-50)+'px',''); }
         wsb.style.setProperty('display','block','');
      }
      playerEmbed.parentNode.style.setProperty('width',w+'px','important');
      playerEmbed.style.setProperty('width',w+'px','important');
      if(h<0) {h=0;}
      playerEmbed.parentNode.style.setProperty('height',(h+YT_BAR_HEIGHT)+'px','important');
      playerEmbed.style.setProperty('height',(h+YT_BAR_HEIGHT)+'px','important');
      mediaController_resize();
      return;
    }

    var ytbd=$(YT_BASEDIV);
    if(!ytbd) { return; }
    if(getValue('DISABLE_ROUNDED')>0) {
      playerEmbed.style.setProperty('margin-left','0','important');
      playerEmbed.parentNode.parentNode.style.setProperty('padding-top','0','');
      playerEmbed.parentNode.parentNode.style.setProperty('background-color','transparent','');
      playerEmbed.parentNode.parentNode.setAttribute('class','');
    } else {
      playerEmbed.style.setProperty('margin-left','0','important');
      playerEmbed.parentNode.parentNode.style.setProperty('padding-top','7px','');
      playerEmbed.parentNode.parentNode.style.setProperty('background-color','black','');
      playerEmbed.parentNode.parentNode.setAttribute('class','yt-rounded');
    }
    var wov=$(WATCH_OTHER_VIDS);
    var lo=5,wo=960;
    if(gvar.isWatChan) {
      lo=0; if(document.body.clientWidth>=1200) { wo=1200; }
      ytbd.style.setProperty('width',wo+'px','important');
    }
    if(w>wo) {
      var padw=(w-wo)/2; var mleft=(document.body.clientWidth-wo)/2;
      ytbd.style.setProperty('margin-left','0','important');
      ytbd.style.setProperty('padding-left',Math.max(padw,mleft)+'px','important');
      playerEmbed.parentNode.parentNode.style.marginLeft=(-(wo-960)/2-padw)+'px';
      if(wov) { wov.style.setProperty('margin-top','5px','important'); }
    } else if(w>640) {
      var padw=(960-w)/2;
      ytbd.style.setProperty('margin-left','auto','important');
      ytbd.style.setProperty('padding-left',lo+'px','important');
      playerEmbed.parentNode.parentNode.style.marginLeft=padw+'px';
      if(wov) { wov.style.setProperty('margin-top','5px','important'); }
    } else {
      var padw=(640-w)/2;
      ytbd.style.setProperty('margin-left','auto','important');
      ytbd.style.setProperty('padding-left',lo+'px','important');
      playerEmbed.parentNode.parentNode.style.marginLeft=padw+'px';
      if(wov) {
        if(gvar.isWatChan) {
          wov.style.setProperty('margin-top',(-h-75)+'px','important');
        } else {
          wov.style.setProperty('margin-top','0','important');
        }
      }
    }
    playerEmbed.parentNode.parentNode.style.setProperty('width',w+'px','important');
    playerEmbed.style.setProperty('width',w+'px','important');
    if(h<0) {h=0;}
    playerEmbed.style.setProperty('height',(h+YT_BAR_HEIGHT)+'px','important');
    mediaController_resize();
  }
  var wide=isWide();
  if(wide) {
    var mem=getValue('DEFAULT_WIDE_VIDEO_RESIZING');
    if(mem<0) { GM_setValue('DEFAULT_WIDE_VIDEO_RESIZING',-mode); }
  } else {
    var mem=getValue('DEFAULT_4DV3_VIDEO_RESIZING');
    if(mem<0) { GM_setValue('DEFAULT_4DV3_VIDEO_RESIZING',-mode); }
  }
  show_scrollbar();
  var playerEmbed = get_PlayerEmbed_element();
  if(!playerEmbed) {
    var ytbd=$(WATCH_PLAYER_DIV);
    if(ytbd && ytbd.childNodes.length>0) { playerEmbed=ytbd.childNodes[0]; }
  }
  if(playerEmbed) {
    var moreHeight=0; if(mode==8) { moreHeight=52; }
    var w=320; var h=-1; var ref=1280;
    if(wide) {
      if(mode>1) {
        w=480;
        switch(mode) {
          case 3: w=640; break; // YT LQ Default
          case 4: w=854; break; // YT HQ Default
          case 5: w=960; break;
          case 6: w=1024; break;
          case 7: w=1280; break;
          case 11: w=getValue('CUSTOM11_WIDE_VIDEO_RESIZING_W'); h=getValue('CUSTOM11_WIDE_VIDEO_RESIZING_H'); break;
          case 12: w=getValue('CUSTOM12_WIDE_VIDEO_RESIZING_W'); h=getValue('CUSTOM12_WIDE_VIDEO_RESIZING_H'); break;
          case 13: w=getValue('CUSTOM13_WIDE_VIDEO_RESIZING_W'); h=getValue('CUSTOM13_WIDE_VIDEO_RESIZING_H'); break;
        }
      }
    } else {
      ref=960;
      if(mode>1) {
        w=480;
        switch(mode) {
          case 2: w=640; h=360; break; // YT LQ Default
          case 3: w=640; break;
          case 4: w=854; break; // YT HQ Default
          case 5: w=960; break;
          case 6: w=1024; break;
          case 7: w=1280; break;
          case 11: w=getValue('CUSTOM11_4DV3_VIDEO_RESIZING_W'); h=getValue('CUSTOM11_4DV3_VIDEO_RESIZING_H'); break;
          case 12: w=getValue('CUSTOM12_4DV3_VIDEO_RESIZING_W'); h=getValue('CUSTOM12_4DV3_VIDEO_RESIZING_H'); break;
          case 13: w=getValue('CUSTOM13_4DV3_VIDEO_RESIZING_W'); h=getValue('CUSTOM13_4DV3_VIDEO_RESIZING_H'); break;
        }
      }
    }
    if(mode==8 || mode==9 || mode==10) {
      if(getValue('HIDE_SCROLLBARS')) { hide_scrollbar(); }
      if(mode==8 || mode==9) { w=Math.min(document.documentElement.clientWidth,(document.documentElement.clientHeight-moreHeight)*ref/720); }
      else { w=Math.max(document.documentElement.clientWidth,document.documentElement.clientHeight*ref/720); }
    }
    //if(low_quality && (w>640)) { w=640; }
    if(w<160) { w=160; }
    if(h<0) { h=w*720/ref; }
    change_videosize(playerEmbed,w,h);

    if(mode==8 || mode==9 || mode==10) {
      if(mode==8 || mode==9) { w=Math.min(document.documentElement.clientWidth,(document.documentElement.clientHeight-moreHeight)*ref/720); }
      else { w=Math.max(document.documentElement.clientWidth,document.documentElement.clientHeight*ref/720); }
      if(w<160) { w=160; }
      h=w*720/ref;
      change_videosize(playerEmbed,w,h);
    }

    window.setTimeout( function() { scrollToVideo(w,h+moreHeight,changescroll); } ,10);
  }
}

function scrollToVideo(w,h,changescroll) {
  playerEmbed=get_PlayerEmbed_element(); if(!playerEmbed) { return; }
  if((changescroll && getValue('SCROLL_TO_VIDEO')>0) || getValue('SCROLL_TO_VIDEO')>1) {
    var cx=(w-document.documentElement.clientWidth)/2;
    var cy=(h-document.documentElement.clientHeight)/2;
    //show_alert('cx='+cx+' / cy='+cy+' / cw='+document.documentElement.clientWidth+' ch='+document.documentElement.clientHeight+' / w='+w+' h='+h+' / cs='+changescroll,0);
    if(-100<cy && cy<=-52) { cy=cy+40; }
    else if(-52<cy && cy<=-4) { cy=-2; }
    else if(-4<cy && cy<0)  { cy=Math.ceil(cy/2); }
    //show_alert('1> scrollTo('+parseInt(cx,10)+','+parseInt((getAbsoluteTop(playerEmbed)+cy),10)+')',0);
    scrollTo(Math.max(0,cx),Math.max(0,getAbsoluteTop(playerEmbed)+cy));
  }
}

function scrollToVideoAndMemo(playerEmbed) {
  var pos1=document.documentElement.scrollLeft+","+document.documentElement.scrollTop;
  var pcs=window.getComputedStyle(playerEmbed,null);
  var w=parseInt(pcs.width.replace('px',''),10);
  var h=parseInt(pcs.height.replace('px',''),10)-YT_BAR_HEIGHT;
  scrollToVideo(w,h,true);
  var pos2=document.documentElement.scrollLeft+","+document.documentElement.scrollTop;
  if(pos1!=pos2) { playerEmbed.setAttribute('seekTo_back',pos1); }
}

function show_scrollbar() {
  window.document.body.style.setProperty('overflow','visible','');
}

function hide_scrollbar() {
  window.document.body.style.setProperty('overflow','hidden','');
}

//******************************
//**** Dark Overlay ************
//******************************
function YTPoverlay_display(show,ytplayer_name,yt_p) {
  if(isDefined(yt_p)) {
    var YTPoverlay = document.createElement('div');
    YTPoverlay.setAttribute('style','display:none; position:absolute; width:0px; height:'+YT_BAR_HEIGHT+'px; opacity:1; overflow:auto; z-index:750;');
    YTPoverlay.style.setProperty('background-color',gvar.bodyBgColor,'');
    var YTPoverlayIn = document.createElement('div');
    YTPoverlayIn.setAttribute('style','width:100%; height:'+YT_BAR_HEIGHT+'px; opacity:0;');
    YTPoverlay.appendChild(YTPoverlayIn);
    yt_p.appendChild(YTPoverlay);
    arguments.callee.YTPO=YTPoverlay; arguments.callee.vis=false;
    var wmodeID; if(gvar.isWatchPage) { wmodeID='FLASH_PLAYER_WMODE'; } else { wmodeID='FLASH_PLAYER_WMODE_BCHAN'; }
    switch(getValue(wmodeID)) {
      case 2: case 3: arguments.callee.mode=false; break;
      default:
        arguments.callee.mode=true;
        YTPoverlay.style.setProperty('position','fixed','');
        window.addEventListener('scroll',place_YTPoverlay,false);
        window.addEventListener('resize',place_YTPoverlay,false);
    }
  }
  YTPoverlay=arguments.callee.YTPO;
  if(!YTPoverlay) { return; }
  var ovColor='#000000'; if(getValue('LIGHT_OFF_COLOR')>'') { ovColor='#'+getValue('LIGHT_OFF_COLOR'); }
  YTPoverlay.firstChild.style.setProperty('background',ovColor,'');
  if(isDefined(ytplayer_name)) {
    var ytplayer=$(ytplayer_name);
    if(!ytplayer) { return YTPoverlay; }
    arguments.callee.ytpn=ytplayer_name;
    YTPoverlay.style.setProperty('width',Math.round(getWidth(ytplayer))+'px','');
    if(show>0) {
      place_YTPoverlay(true);
      if(arguments.callee.vis) { YTPoverlay.style.setProperty('display','block',''); }
    } else {
      YTPoverlay.style.setProperty('display','none','');
      place_YTPoverlay(false);
      if(arguments.callee.vis) { YTPoverlay.style.setProperty('display','block',''); }
    }
    return YTPoverlay;
  }
  if(show==2) { if(place_YTPoverlay.state==true) { show=0; } }
  if(show>0) {
    if(gvar.ButtonLightOff) { gvar.ButtonLightOff.style.setProperty('visibility','hidden',''); }
    place_YTPoverlay(true);
    if(getValue('LIGHT_OFF_YT_PLAYER_BAR_DISPLAY')) { YTPoverlay.style.setProperty('display','none',''); }
    else { YTPoverlay.style.setProperty('display','block',''); }
    arguments.callee.vis=true;
    return true;
  } else {
    YTPoverlay.style.setProperty('display','none','');
    place_YTPoverlay(false);
    if(gvar.ButtonLightOff) { gvar.ButtonLightOff.style.removeProperty('visibility'); }
    arguments.callee.vis=false;
    return false;
  }
}

function place_YTPoverlay(value) {
  if(typeof value!='boolean') { value=arguments.callee.state; }
  arguments.callee.state=value;
  var YTPoverlay=YTPoverlay_display.YTPO;
  var X=0,Y=0,H=0;
  if(isDefined(YTPoverlay_display.ytpn)) {
    var ytplayer=$(YTPoverlay_display.ytpn);
    if(ytplayer) { X=getAbsoluteLeft(ytplayer); Y=getAbsoluteTop(ytplayer); H=getHeight(ytplayer); }
    if(gvar.isBetaChannel) {
      var mc=$(YOUTUBE_HEADER);
      if(mc && mc.style.getPropertyValue('display').toLowerCase()=='none') { Y--; } // Fix getAbsoluteTop value...
    }
  }
  var mode=YTPoverlay_display.mode;
  if(value) { // Show
    YTPoverlay.style.setProperty('height',YT_BAR_HEIGHT+'px','');
    if(mode) {
      YTPoverlay.style.setProperty('left',(X-document.documentElement.scrollLeft)+'px','');
      YTPoverlay.style.setProperty('top', (Y-document.documentElement.scrollTop+H-YT_BAR_HEIGHT)+'px','');
      YTPoverlay.firstChild.style.setProperty('opacity',getValue('LIGHT_OFF_PAGE_OPACITY')/100,'');
      YTPoverlay.style.setProperty('opacity',1,'');
    } else {
      YTPoverlay.style.setProperty('left','0px','');
      YTPoverlay.style.setProperty('top',(H-YT_BAR_HEIGHT)+'px','');
      YTPoverlay.firstChild.style.setProperty('opacity',1,'');
      YTPoverlay.style.setProperty('opacity',getValue('LIGHT_OFF_YT_PLAYER_BAR_OPACITY')/100,'');
    }
  } else { // Hide
    YTPoverlay.style.setProperty('opacity',0,'');
    YTPoverlay.firstChild.style.setProperty('opacity',0,'');
    if(mode) {
      YTPoverlay.style.setProperty('left',(X-document.documentElement.scrollLeft)+'px','');
      YTPoverlay.style.setProperty('top', (Y-document.documentElement.scrollTop+H+24)+'px','');
    } else {
      YTPoverlay.style.setProperty('left','0px','');
      YTPoverlay.style.setProperty('top',(H+24)+'px','');
    }
    YTPoverlay.style.setProperty('height','100px','');
  }
}

function create_overlay() {
  function overlay_click(overlay) {
    if(!YTPoverlay_display(2)) {
      color('change',USE_DARK_COLORS);
      if(gvar.isWatchPage) { change_media_resizer_color(USE_DARK_COLORS); }
      change_mediaController_color(USE_DARK_COLORS);
      removeElement(overlay);
    }
  }
  var overlay = document.createElement('div');
  overlay.setAttribute('id','YTE_overlay');
  overlay.setAttribute('style','position:fixed; left:0px; top:0px; width:100%; height:100%; opacity:'+getValue('LIGHT_OFF_PAGE_OPACITY')/100+'; background:#000000; z-index:500;');
  if(getValue('LIGHT_OFF_COLOR')>'') { overlay.style.setProperty('background','#'+getValue('LIGHT_OFF_COLOR'),''); }
  document.body.appendChild(overlay);
  color('change',true);
  if(gvar.isWatchPage) { change_media_resizer_color(true); }
  change_mediaController_color(true);
  YTPoverlay_display(1);
  overlay.addEventListener('click', function() { overlay_click(overlay); }, true);
}

//******************************
//*** Image Preview Rollover ***
//******************************
var image_state=new Array;
var image_count=new Array;
var image_cache=new Array;

function change_image(element) {
  function imgIsComplete(idvideo,h) {
    var img=image_cache[idvideo][h];
    if(img.complete) {
      if((img.height>0) && (img.width>0)) { return true; }
    }
    return false;
  }
  const MAX_IMG=3;
  const colorlist=["#CC88FF","#CC0000","#00AA00","#0000DD"];
  var idvideo=element.getAttribute('qlicon');
  if(!idvideo) { return; }

  image_count[idvideo]=(image_count[idvideo] % 3)+1;

  if(isUndefined(image_cache[idvideo])) {
    var url_img=element.getAttribute('src');
    var imgpath=url_img.match(/^(.*\/(hq)?).*?(\.jpg)(\?|$)/i);
    if(!imgpath) { return; }
    image_cache[idvideo]=new Array;
    image_cache[idvideo][0]=false;
    for(var h=1;h<=MAX_IMG;h++) {
      url_img=imgpath[1]+h+imgpath[3];
      image_cache[idvideo][h]=new Image();
      image_cache[idvideo][h].src=url_img;
    }
  }

  if(!(image_cache[idvideo][0])) {
    var nbcomplete=0;
    for(var h=1;h<=MAX_IMG;h++) { if(imgIsComplete(idvideo,h)) { nbcomplete++; } }
    if(nbcomplete==0) {
      image_count[idvideo]=0;
    } else {
      if(nbcomplete>=MAX_IMG) {
        image_cache[idvideo][0]=true;
      } else {
        while(!imgIsComplete(idvideo,image_count[idvideo])) { image_count[idvideo]=(image_count[idvideo] % 3)+1; }
      }
    }
  }

  element.style.borderColor="#F0F0F0";

  switch(element.className) {
    default:
      element.style.setProperty('border-color',colorlist[image_count[idvideo]],'important');
      element.parentNode.style.setProperty('border-color',colorlist[image_count[idvideo]],'important');
      if(!gvar.isFeather) {
        element.parentNode.parentNode.style.setProperty('border-color',colorlist[image_count[idvideo]],'important');
        element.parentNode.parentNode.parentNode.style.setProperty('border-color',colorlist[image_count[idvideo]],'important');
      }
      break;
  }

  if(image_count[idvideo]>0) {
    element.src=image_cache[idvideo][image_count[idvideo]].src;
    if(image_state[idvideo]) { image_state[idvideo]=setTimeout( function() { change_image(element); }, ROLLOVER_DELAY_CONT); }
  } else {
    if(image_state[idvideo]) { image_state[idvideo]=setTimeout( function() { change_image(element); }, ROLLOVER_DELAY_LOAD); }
  }
}

function start_rollover_event() {
  var elImg=this;
  var idvideo=elImg.getAttribute('qlicon');
  if(!idvideo) { return; }
  if(!(image_state[idvideo])) { image_state[idvideo]=setTimeout( function() { change_image(elImg); }, ROLLOVER_DELAY_INIT); }
}

function stop_rollover_event() {
  var elImg=this;
  var idvideo=elImg.getAttribute('qlicon');
  if(!idvideo) { return; }
  image_state[idvideo]=clearTimeout(image_state[idvideo]);
}

function bind_image_preview_rollover(elImg) {
  var idvideo=elImg.getAttribute('qlicon');
  if(!idvideo) {
    var imgpath=elImg.getAttribute('thumb');
    if(!imgpath) { imgpath=elImg.getAttribute('src'); }
    if(!imgpath) { return; }
    var temp=imgpath.match(/.ytimg\.com\/vi\/(.*?)\/(hq)?(default|1|2|3)\.jpg(\?|$)/);
    if(!temp) { return; }
    idvideo=temp[1];
    elImg.setAttribute('qlicon',idvideo);
  }
  if(idvideo) {
    elImg.setAttribute('title',''); // Clear title
    if(isUndefined(image_state[idvideo])) { image_state[idvideo]=0; }
    if(isUndefined(image_count[idvideo])) { image_count[idvideo]=0; }
    elImg.addEventListener('mouseover' , start_rollover_event, true);
    elImg.addEventListener('mouseout'  , stop_rollover_event , true);
  }
}

function image_preview_rollover(element) {
  if(!(element)) { return; }
  var links=null;
  try { links=document.evaluate('.//img[(@src or @thumb)]',element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { links=null; }
  if(links) {
    var links_lg=links.snapshotLength;
    for(var h=0;h<links_lg;h++) {
      var image=links.snapshotItem(h);
      if(image) { bind_image_preview_rollover(image); }
    }
    return;
  }
  var msg="image_preview_rollover: Impossible to get links (XPath failed)";
  if(arguments.callee.getlink_fail) { show_alert(msg,0); }
  else { arguments.callee.getlink_fail=1; show_alert(msg,1); }
}

//*********************
//*** Video Preview ***
//*********************
function make_videopreview() {
  //if(gvar.isGoogleWatch) { return; }
  if(!gvar.isWatchPage) { return; }
  if(getValue('VIDEO_PREVIEW')<=0) { return; }
  var divElem=$(YTE_SCREEN_PREVIEW);
  if(divElem) {
    divElem.style.setProperty('display','block','');
    place_videopreview();
    return;
  }
  var playerEmbed = get_PlayerEmbed_element();
  var flashvars = get_flashvars(playerEmbed);
  var video_id  = get_video_id(flashvars);
  if(video_id=='') { return; }

  divElem=document.createElement('div');
  divElem.setAttribute('style','display:block; position:absolute; top:0; left:0; background:#000000; opacity:1; border:0px; overflow:auto; z-index:800; overflow :hidden;');
  divElem.setAttribute('id',YTE_SCREEN_PREVIEW);
  div2Elem=document.createElement('div');
  div2Elem.setAttribute('style','border:1px solid #888888; top:0px; left:0px; bottom:0px; right:0px;');
  imgElem=document.createElement('img');
  imgElem.setAttribute('src','http://i'+Math.ceil(1+Math.random()*3)+'.ytimg.com/vi/'+video_id+'/hqdefault.jpg');
  imgElem.setAttribute('class','splash');
  imgElem.setAttribute('style','top:1; left:1; bottom:1px; right:1px;');
  div2Elem.appendChild(imgElem);
  divElem.appendChild(div2Elem);
  switch(getValue('FLASH_PLAYER_WMODE')) {
    case 2: case 3: arguments.callee.mode=false; break;
    default:
      arguments.callee.mode=true;
      divElem.style.setProperty('position','fixed','');
      window.addEventListener('scroll',place_videopreview,false);
      window.addEventListener('resize',place_videopreview,false);
  }
  playerEmbed.parentNode.appendChild(divElem);
  place_videopreview();
  bind_image_preview_rollover(imgElem);
  divElem.addEventListener('click',videopreview_click,true);
}

function place_videopreview() {
  var divElem=$(YTE_SCREEN_PREVIEW);
  var playerEmbed = get_PlayerEmbed_element();
  if(!divElem || !playerEmbed) { return; }
  var w=getWidth(playerEmbed); var h=(getHeight(playerEmbed)-YT_BAR_HEIGHT);
  if(make_videopreview.mode) {
    divElem.style.left=(getAbsoluteLeft(playerEmbed)-document.documentElement.scrollLeft)+'px';
    divElem.style.top =(getAbsoluteTop(playerEmbed)-document.documentElement.scrollTop)+'px';
  }
  divElem.style.width =w+'px';
  divElem.style.height=h+'px';
  var imgElem=divElem.getElementsByTagName('img')[0];
  imgElem.style.width =(w-2)+'px';
  if(gvar.isGoogleWatch) { h=h-7; } // Strange thing i don't understand...
  imgElem.style.height=(h-2)+'px';
}

function videopreview_click(event) {
  var imgElem=this.getElementsByTagName('img')[0];
  var video_id=imgElem.getAttribute('qlicon');
  image_state[video_id]=clearTimeout(image_state[video_id]);
  this.style.setProperty('display','none','');
  player_play(YT_PLAYER_EMBED);
}

function display_video_preview() {
  if(getAutoplayValue()<3) { make_videopreview(); }
}

//**********************
//*** change_links() ***
//**********************
function betaChannel_ChangeLink() {
  var pnb=$('playnav-body');
  if(pnb) {
    //--- Add links to go to /view_play_list
    function Playlist_modifTitle(element) {
      if(element.id && (element.id.indexOf('playnav-play-playlist-')==0) || (element.id.indexOf('playnav-grid-playlist-')==0)) {
        var divs=null; try { divs=document.evaluate(".//div[starts-with(@id,'playnav-playlist-') and contains(@id,'-title')]",element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { divs=null; }
        if(divs) {
          var divs_lg=divs.snapshotLength;
          for(var h=0;h<divs_lg;h++) {
            var elem=divs.snapshotItem(h);
            if(elem.parentNode.nodeName.toUpperCase()!="A") {
              var res=elem.getAttribute('id').match(/^playnav\-playlist\-(.*?)\-title$/i);
              if(res) {
                res=res[1];
                var aelem=document.createElement('a');
                aelem.setAttribute('href',window.location.protocol+'//'+window.location.host+'/view_play_list?p='+res);
                aelem.setAttribute('target','_blank');
                aelem.appendChild(elem.cloneNode(true));
                elem.parentNode.replaceChild(aelem,elem);
    } } } } } }
    //--- Add links to each playlist video
    function Playlist_modifLink(element) {
      var elems=null; try { elems=document.evaluate(".//a[starts-with(@onclick,'playnav.playVideo')]",element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { elems=null; }
      if(elems) {
        for(var h=elems.snapshotLength-1;h>=0;h--) {
          var elem=elems.snapshotItem(h);
          //show_alert(h+'> '+elem.id+' ['+elem.class+']',0);
          var res=elem.getAttribute('onclick').match(/^playnav\.playVideo\(\'([0-9A-F]*?)(?:-all)?\'\,\'(\d+)\'\,\'(.*?)\'\)\;/);
          if(res) { elem.setAttribute('href','http://www.youtube.com/watch?v='+res[3]+'&feature=PlayList&p='+res[1]+'&index='+res[2]); }
    } } }
    //--- Title on Cut Title
    function PlayNav_AddHint(element) {
      var elems=null; try { elems=document.evaluate(".//a[contains(@class,'ellipsis')]",element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { elems=null; }
      if(elems) {
        for(var h=elems.snapshotLength-1;h>=0;h--) {
          var elem=elems.snapshotItem(h);
          //show_alert(h+'> '+elem.id+' ['+elem.class+']',0);
          var spanElem=elem.getElementsByTagName('SPAN');
          if(spanElem && spanElem[0]) {
            spanElem=spanElem[0];
            spanElem.setAttribute('title',spanElem.textContent);
          } else {
            elem.setAttribute('title',elem.textContent);
    } } } }

    function PlayNav_checkIn(element) {
      //show_alert(element.id+' ['+element.class+']',0);
      Playlist_modifTitle(element);
      Playlist_modifLink(element);
      PlayNav_AddHint(element);
    }
    function PlayNav_createdNodeEvent(event) { PlayNav_checkIn(event.target); }
    pnb.addEventListener('DOMNodeInserted',PlayNav_createdNodeEvent,false);
    PlayNav_checkIn(pnb);
  }
}

function clean_link_and_add_fmt(lref,fmt,hmode) {
  if(hmode) { lref=lref.replace(/\#/,'?'); }
  // Clean URL
  var hash='';
  var res=lref.match(/^([^#]*)(#.*)$/);
  if(res) { lref=res[1]; hash=res[2]; }
  //show_alert('lref='+lref+' / hash='+hash,0);

  lref=clean_video_url(lref);
  // Add fmt to URL
  //if(hmode) { lref=lref.replace(/\?/,'#'); }
  return lref+url_fmt(fmt)+hash;
}

function change_links_with_fmt(element,fmt) {
  if(fmt==34) { fmt=-1; }
  if(!(element)) { return; }
  var links=null;
  try { links=document.evaluate('.//a[@href and not(@QS_LINK)]',element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { links=null; }
  if(links) {
    var links_lg=links.snapshotLength;
    for(var h=0;h<links_lg;h++) {
      var link=links.snapshotItem(h);
      var res=link.href.match(/youtube\.\w+\/watch(\?|\#)/i);
      if(res) { link.href=clean_link_and_add_fmt(link.href,fmt,(res[1]=='#')); }
    }
    return;
  }
  var msg="change_links: Impossible to get links (XPath failed)";
  if(arguments.callee.getlink_fail) { show_alert(msg,0); }
  else { arguments.callee.getlink_fail=1; show_alert(msg,1); }
}

function change_thumb_to_src(element,max) {
  function change_one_thumb_to_src(imag) {
    var thumb=imag.getAttribute('thumb');
    if(thumb) {
      imag.removeAttribute('thumb');
      imag.setAttribute('src',thumb);
  } }
  var imags=null;
  try { imags=document.evaluate('.//img',element,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { imags=null; }
  if(imags) {
    var imags_lg=Math.min(max,imags.snapshotLength);
    for(var h=0;h<imags_lg;h++) { change_one_thumb_to_src(imags.snapshotItem(h)); }
  }
}

function change_links_event_inserted(e) {
  var el=e.target;
  function change_links_timeout() {
    var fmt=GM_getValue("Youtube_Enhancer_Last_fmt",-1);
    //show_alert('fmt='+fmt+'/'+el.nodeName+'('+el.id+')',0);
    change_links_with_fmt(el,fmt);
    image_preview_rollover(el);
  }
  if(el.nodeName=='DIV' || el.nodeName=='LI') { window.setTimeout(change_links_timeout,1); }
}

function disable_YT_preview() {
  if(!gvar.isOnYouTube) { return; }
  var aTL=document.createElement('a');
  aTL.setAttribute('onclick',"javascript:(function(aTL) {"
    +"try { thumbnailPreview.startThumbnailPreview=function() {}; } catch(e) {} aTL.parentNode.removeChild(aTL);"
    +"})(this);");
  document.body.appendChild(aTL); SimulateMouse(aTL,'click');
}

function video_responses_change_titles(elem) {
  var links=null;
  try { links=document.evaluate('.//div[@class="video-bar-item"]',elem,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { links=null; }
  if(links) {
    for(var h=links.snapshotLength-1;h>=0;h--) {
      var link=links.snapshotItem(h);
      var title=link.getElementsByTagName('img')[0].getAttribute('title');
      link.getElementsByTagName('a')[1].setAttribute('title',title);
} } }
function video_responses_change_titles_event(e) { setTimeout(function() { video_responses_change_titles(e.target); },1); }

//** === change_links & image_preview_rollover === **//
function change_links(selected_fmt) {
  disable_YT_preview();

  var last_fmt=GM_getValue("Youtube_Enhancer_Last_fmt",-2);
  if(gvar.isWatchPage) { //== Watch pages
    if(getValue('FORCE_DEFAULT_FMT')>=0) {
      var wurl=window.location.href;
      if (wurl.search(/[?&]fmt\=\d+/i)<0) {
        wurl=clean_link_and_add_fmt(wurl,getValue('FORCE_DEFAULT_FMT'));
        window.location.replace(wurl);
        return;
    } }

    // Don't change playlist command links
    var el1=$('playall_PL'); var el2=$('playingall_PL');
    if(el1 && el2) {
      ael1=el1.getElementsByTagName('a'); ael2=el2.getElementsByTagName('a');
      if(ael1 && ael1[0] && ael2 && ael2[0]) {
        ael1[0].setAttribute('QS_LINK','true'); ael2[0].setAttribute('QS_LINK','true');
        if(getValue('PLAYLIST_NO_PLAYNEXT_START')>0) {
          if(!location.search.match(/[?&]playnext\=\d+(?:\&|$)/i)) {
            if(!ael1[0].style.getPropertyValue('display')!='none') { SimulateMouse(ael1[0],'click'); }
    } } } }

    GM_setValue("Youtube_Enhancer_Last_fmt",selected_fmt);
    // Add fmt to watch-url-field
    var wuf=$(WATCH_URL_FIELD);
    if(wuf) {
      try { wuf.value=clean_link_and_add_fmt(wuf.getAttribute('value'),selected_fmt); } catch(err) {}
      wuf.style.setProperty('width','276px','');
    }
    // Change all links in the page
    change_links_with_fmt(window.document.body, selected_fmt);
    if(gvar.isGoogleWatch) {
      var whc=$('watch-headline-container');
      if(whc) { whc.addEventListener ('DOMNodeInserted', change_links_event_inserted, true); }
    } else {
      // Change links of User videos after loading it
      var wmf=$(WATCH_MORE_FROM);
      if(wmf)  { wmf.addEventListener ('DOMNodeInserted', change_links_event_inserted, true); }
      // Change links of Related videos box after loading it
      var wrvb=$(WATCH_RELATED_VIDS);
      if(wrvb) { change_thumb_to_src(wrvb,8); wrvb.addEventListener('DOMNodeInserted', change_links_event_inserted, true); }
      // Change links of Search box after loading it (deprecated)
      var wsr=$(WATCH_SEARCH_RES);
      if(wsr)  { wsr.addEventListener ('DOMNodeInserted', change_links_event_inserted, true); }
      // Playlist panel support
      var plst=$(PLAYLIST_PANEL);
      if(plst) { plst.addEventListener('DOMNodeInserted', change_links_event_inserted, true); }
      var wvrc=$('watch-video-responses-children');
      if(wvrc) { wvrc.addEventListener('DOMNodeInserted', video_responses_change_titles_event, true); video_responses_change_titles(wvrc); }
    }
    image_preview_rollover(window.document.body);
  } else { //== Other pages
    // Change all links in the page
    if(last_fmt>=0) { change_links_with_fmt(window.document.body, last_fmt); }
    // == Youtube
    if(gvar.isOnYouTube) {
      // Change links in BetaChannel
      var pnb=$('playnav-body');
      if(pnb) {
        pnb.addEventListener('DOMNodeInserted',change_links_event_inserted,true);
        betaChannel_ChangeLink();
      }
      image_preview_rollover(window.document.body);
    }
} }

//************************************************************
//***** Media Controller *************************************
//************************************************************
function get_movie_player(ytplayer_name) {
  if(!ytplayer_name) { ytplayer_name=YT_PLAYER_EMBED; } 
  ytplayer=getUnsafeElementById(ytplayer_name)
  if(ytplayer) {
    //try { delete ytplayer.getAttribute; delete ytplayer.setAttribute; delete ytplayer.id.toString; delete ytplayer.id.valueOf; delete ytplayer.getPlayerState; } catch(err) {}
    return ytplayer;
  } else {
    var msg='Media Controller warning : "'+ytplayer_name+'" not found';
    if(arguments.callee.movie_player_fail) { show_alert(msg,0); }
    else { arguments.callee.movie_player_fail=1; show_alert(msg); }
  }
}

// N/A (-4), unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5). 
function get_player_state(ytplayer) {
  var state=-3; try { state=ytplayer.getPlayerState(); } catch(err) { state=-4; }
  //show_alert('Player State='+state,0);
  if(state<=-3) {
    show_alert('Media Controller warning : "'+ytplayer.id+'" state not available',0);
    if(ytplayer.getAttribute('mc_embedtype')==1) {
      // Check allowscriptaccess (must be 'always')
      var allowScript=ytplayer.getAttribute('allowscriptaccess');
      if(!(allowScript) || !(allowScript.match(/^always$/i))) {
        ytplayer.setAttribute('allowscriptaccess','always');
        show_alert('Media Controller Notice: Reloading the player "'+ytplayer.id+'" to allow script access');
        flushNode(ytplayer); // Flush it...
      }
    }
  }
  return state;
}

// §§§ Stop §§§
function player_stop(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(!ytplayer) { return; }
  var state=get_player_state(ytplayer);
  //if(state==-1) { window.setTimeout( function() { player_stop(); }, 50); return; }
  if(state<0 || state>3) { return; }
  ytplayer.pauseVideo(); 
  ytplayer.seekTo(0,1);
  player_pause(ytplayer_name);
}

// §§§ Step back §§§
var player_Step_back_timerid=new Array;
function player_stepback(ytplayer_name) {
  if(player_Step_back_timerid[ytplayer_name]) { return; }
  function player_stepback_check(ytplayer_name,frame_cursor,new_frame_cursor) {
    player_Step_back_timerid[ytplayer_name]=null;
    var ytplayer=get_movie_player(ytplayer_name);
    if(ytplayer) {
      var state=get_player_state(ytplayer);
      if(state!=0 && state<2) { return; }
      cur_frame_cursor=ytplayer.getCurrentTime();
      if(cur_frame_cursor<frame_cursor) { return; }
      new_frame_cursor=new_frame_cursor-0.05; if(new_frame_cursor<0) { new_frame_cursor=0; }
      ytplayer.seekTo(new_frame_cursor,0);
      if(new_frame_cursor<=0) { return; }
      if(frame_cursor-new_frame_cursor>5) { return; } // Test for the Loading-start of the video
      player_Step_back_timerid[ytplayer_name]=window.setTimeout( function() { player_stepback_check(ytplayer_name,frame_cursor,new_frame_cursor); }, 50);
    }
  }
  var ytplayer=get_movie_player(ytplayer_name);
  if(!ytplayer) { return; }
  var state=get_player_state(ytplayer);
  if(state<0) { return; }
  ytplayer.pauseVideo();
  state=get_player_state(ytplayer);
  if(state!=0 && state<2) { return; }
  frame_cursor=ytplayer.getCurrentTime();
  if(frame_cursor<=0) { return; }
  new_frame_cursor=frame_cursor-0.05; if(new_frame_cursor<0) { new_frame_cursor=0; }
  ytplayer.seekTo(new_frame_cursor,0);
  ytplayer.pauseVideo();
  if(new_frame_cursor<=0) { return; }
  player_Step_back_timerid[ytplayer_name]=window.setTimeout( function() { player_stepback_check(ytplayer_name,frame_cursor,new_frame_cursor); }, 50);
}

// §§§ Step forward §§§
function player_frame(ytplayer_name) {
  var frame_cursor=0;
  player_frame_pause.count=0;

  function player_frame_pause(ytplayer_name) {
    var ytplayer=get_movie_player(ytplayer_name);
    var state=get_player_state(ytplayer);
    if(state<-2 || state==0) { return; }
    var new_pos=ytplayer.getCurrentTime();
    if((new_pos==frame_cursor || state==3) && arguments.callee.count<20) {
      arguments.callee.count=arguments.callee.count+1;
      window.setTimeout( function() { player_frame_pause(ytplayer_name); }, 2);
      return;
    }
    ytplayer.pauseVideo();
  }
  var ytplayer=get_movie_player(ytplayer_name);
  if(!ytplayer) { return; }
  var state=get_player_state(ytplayer);
  if(state<-2 || state==0 || state==3) { return; }
  frame_cursor=ytplayer.getCurrentTime();
  ytplayer.playVideo();
  player_frame_pause(ytplayer_name);
}

// §§§ Play §§§
function player_play(ytplayer_name) {
  var state=get_player_state(ytplayer);
  player_play_wait.count=0;
  function player_play_wait(ytplayer_name) {
    var ytplayer=get_movie_player(ytplayer_name);
    var state=get_player_state(ytplayer);
    if(state<-2) {
      if(++arguments.callee.count>10) { flushNode(ytplayer); return; }
      window.setTimeout( function() { player_play_wait(ytplayer_name); }, 100);
      return;
    }
    ytplayer.playVideo();
    window.setTimeout(checkNotStarting,50,ytplayer_name);
  }
  if(player_killed[ytplayer_name]==1) { player_revive(ytplayer_name); return; }
  player_play_wait(ytplayer_name);
}
// Seek Trick
function checkNotStarting(ytplayer_name) {
  checkNotStarting_checkState.count=0;
  function checkNotStarting_checkState(ytplayer_name) {
    if(++arguments.callee.count>10) { return; }
    var player=get_movie_player(ytplayer_name);
    var state=player.getPlayerState();
    if(state<0) { return; }
    if(state!=1) { 
      player.playVideo();
      window.setTimeout(checkNotStarting_checkState,25,ytplayer_name);
    }
  }
  function checkNotStarting_seekTrick(ytplayer_name,old) {
    var player=get_movie_player(ytplayer_name);
    if(player.getPlayerState()!=1) { return; }
    if(player.getCurrentTime()>(old+0.1) || player.getCurrentTime()<(old-0.1)) { return; }
    player.seekTo(old+4,0);
    window.setTimeout(function() { player.seekTo(old,0); } ,25);
  }
  var player=get_movie_player(ytplayer_name);
  var current=player.getCurrentTime();
  checkNotStarting_checkState(ytplayer_name);
  window.setTimeout( function() { checkNotStarting_seekTrick(ytplayer_name,current); },1000);
}
// Revive the player
var player_killed=new Array;
function player_revive(ytplayer_name) {
  var ytplayer = $(ytplayer_name);
  if(!(ytplayer)) { show_alert('Revive Failed : "'+ytplayer_name+'" not found'); return; }

  // Make autoplay on
  if(ytplayer.getAttribute('mc_embedtype')==1) {
    var flashvars = get_flashvars(ytplayer);
    var autoplay  = flashvars.match(/autoplay\=(\d+)/i);
    if(autoplay) { flashvars=flashvars.replace(/autoplay\=\d+/i,"autoplay=1"); }
    else { flashvars=flashvars+'&autoplay=1'; }
    set_flashvars(ytplayer,flashvars);
  } else { // mc_embedtype==2
    var srcvars = ytplayer.getAttribute('src');
    var autoplay  = srcvars.match(/autoplay\=(\d+)/i);
    if(autoplay) { srcvars=srcvars.replace(/autoplay\=\d+/i,"autoplay=1"); }
    else { srcvars=srcvars+'&autoplay=1'; }
    ytplayer.setAttribute('src',srcvars);
  }

  // Revive the video player
  flushNode(ytplayer);
  player_killed[ytplayer_name]=0;

  // Test if a loop is set
  player_check_limit(ytplayer_name);
}

// §§§ Pause §§§
function player_pause(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state==3) { window.setTimeout( function() { player_pause(ytplayer_name); }, 50); return; }
    if(state<=0) { return; }
    ytplayer.pauseVideo();
  }
}


// §§§ Begin §§§
function player_memo(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  var state=get_player_state(ytplayer);
  if(state<-2) { return; }
  var bt_state=$(ytplayer_name+'-Memo_state');
  if(ytplayer && bt_state) {
    if(state==0) {
      bt_state.style.setProperty('background',color('MC_BACKGROUND'),'important');
      bt_state.setAttribute('value',-1);
      return;
    }
    if(bt_state.getAttribute('value')<0) {
      var new_pos=ytplayer.getCurrentTime()-0.5;
      if(new_pos<0) { new_pos=0; }
      ytplayer.seekTo(new_pos,1); // Get real seek time
      //ytplayer.getCurrentTime();
      //if(new_pos<0) { new_pos=0; }
      bt_state.style.setProperty('background',color('MC_TOGGLE_BEG_END'),'important');
      bt_state.setAttribute('value',new_pos.toString());
    } else {
      bt_state.style.setProperty('background',color('MC_BACKGROUND'),'important');
      bt_state.setAttribute('value',-1);
    }
  }
}

// §§§ Loop §§§
function player_loop(ytplayer_name) {
  var bt_state=$(ytplayer_name+'-Loop_state');
  if(bt_state) {
    if(bt_state.getAttribute('value')==0) {
      var ytplayer=get_movie_player(ytplayer_name);
      if(!ytplayer) { return; }
      if(get_player_state(ytplayer)<-2) { return; }
      bt_state.style.setProperty('background',color('MC_TOGGLE_LOOP'),'important');
      bt_state.setAttribute('value',1);
      player_check_limit(ytplayer_name);
    } else {
      bt_state.style.setProperty('background',color('MC_BACKGROUND'),'important');
      bt_state.setAttribute('value',0);
    }
  }
}

// §§§ Rewind §§§
function player_rewind(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state<0) { return; }
    var memo_pos=0;
    var memo_state=$(ytplayer_name+'-Memo_state');
    if(memo_state) { memo_pos=parseFloat(memo_state.getAttribute('value'),9); }
    if(memo_pos<0) { memo_pos=0; }
    var player_pos=ytplayer.getCurrentTime();
    if(memo_pos>=player_pos) {
      ytplayer.seekTo(0,1);
    } else {
      ytplayer.seekTo(memo_pos,1);
    }
  }
}

// §§§ End §§§
function player_limit(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  var state=get_player_state(ytplayer);
  if(state<-2) { return; }
  var bt_state=$(ytplayer_name+'-Limit_state');
  if(ytplayer && bt_state) {
    if(bt_state.getAttribute('value')<0) {
      var new_pos=ytplayer.getCurrentTime();
      if(new_pos<0) { new_pos=0; }
      bt_state.style.setProperty('background',color('MC_TOGGLE_BEG_END'),'important');
      bt_state.setAttribute('value',new_pos.toString());
      player_check_limit(ytplayer_name);
    } else {
      bt_state.style.setProperty('background',color('MC_BACKGROUND'),'important');
      bt_state.setAttribute('value',-1);
    }
  }
}

// §§§ Kill §§§ (Double click for this one)
function player_freeze(ytplayer_name) {
  if(isUndefined(ytplayer_name)) { arguments.callee.freeze=0; return; }
  if(arguments.callee.freeze==1) {
    var ytplayer=get_movie_player(ytplayer_name);
    if(!ytplayer) { return; }
    arguments.callee.freeze=0;
    if(get_player_state(ytplayer)>=-1) { ytplayer.pauseVideo(); ytplayer.stopVideo(); }
    if(getValue('USE_OLD_REVIVE')>0) { player_killed[ytplayer_name]=1; }
    make_videopreview();
    return;
  }
  arguments.callee.freeze=1; window.setTimeout( function() { player_freeze(); }, 250);
}

// Need a serial of interrupts to check the end of the selection
var player_check_limit_timerid=new Array;
function player_check_limit_routine(ytplayer_name) {
  if(player_killed[ytplayer_name]==1) { return; }
  var ytplayer=get_movie_player(ytplayer_name);
  if(!ytplayer) { return; }

  var M_state=$(ytplayer_name+'-Memo_state');
  var L_state=$(ytplayer_name+'-Limit_state');
  var Loop_state=$(ytplayer_name+'-Loop_state');
  if(L_state && M_state && Loop_state) {
    if(Loop_state.getAttribute('value')==0) { return; }

    var state=get_player_state(ytplayer);
    if(state<0) { player_check_limit_timerid[ytplayer_name]=window.setTimeout( function() { player_check_limit_timerid[ytplayer_name]=null; player_check_limit_routine(ytplayer_name); }, 1000); return; }

    var pos=ytplayer.getCurrentTime();
    // Test Infinite buffering
    if(state==3) { // video buffering
      if(pos>ytplayer.getDuration()-0.5) {
        if(ytplayer.getVideoStartBytes()+ytplayer.getVideoBytesLoaded()>=ytplayer.getVideoBytesTotal())
          { state=0; }
      }
    }

    var vmemo=parseFloat(M_state.getAttribute('value'),9);
    if(vmemo<0) { vmemo=0; }
    var vlimit=parseFloat(L_state.getAttribute('value'),9);
    if((pos>=vlimit && vlimit>=0) || state==0) { ytplayer.seekTo(vmemo,1); if(state==0) { player_play(ytplayer_name); } }

    // On watch/betachannel page, onMediaControllerPlayerStateChange take care of the video end, so we end here
    if(vlimit<0 && (gvar.isWatchPage || gvar.isBetaChannel)) { return; }
    player_check_limit_timerid[ytplayer_name]=window.setTimeout( function() { player_check_limit_timerid[ytplayer_name]=null; player_check_limit_routine(ytplayer_name); }, 50);
    //show_alert('timerid='+player_check_limit_timerid[ytplayer_name],0);
    return;
  }
}
function player_check_limit(ytplayer_name) {
  window.clearTimeout(player_check_limit_timerid[ytplayer_name]);
  player_check_limit_routine(ytplayer_name);
}

function get_newfullscreenURL() {
  var playerEmbed = get_PlayerEmbed_element();
  if(!playerEmbed) { return ''; }
  var flashvars=get_flashvars(playerEmbed);
  // Get needed items
  var t_id=get_t_id(flashvars);
  var video_id=get_video_id(flashvars);
  var vq =get_vq(flashvars);
  var fmt_map=get_fmt_map(flashvars);
  if(t_id=='' || video_id=='') { return '#'; }
  return window.location.protocol+"//"+window.location.host+'/player2.swf?fs=1&video_id='+video_id+'&t='+t_id+'&vq='+vq+'&fmt_map='+fmt_map;
}

function get_embedURL() {
  return gvar.ytc_EMBURL;
}

// *********************************************************************************************************** //
// Bind Player Event for the End of video
function bind_movie_player_event() {
  // Clear onYouTubePlayerReady
  try { delete unsafeWindow.onYouTubePlayerReady; } catch(err) {}

  // Only for youtube watch pages
  if(!gvar.isWatchPage) {
    if(!gvar.isBetaChannel) { return; }
    GM_addGlobalStyle('.playnav-bottom-link { float:none; padding-left:15px; }'); // Little fix
    if(getValue('HIDE_MEDIA_CONTROLLER_BCHAN')<=0) {
      GM_addGlobalStyle('.playnav-player-container { padding-bottom:30px; }'
      +' #playnav-play-content, #playnav-body, #playnav-play-loading { height:625px !important }'
      );
    }
    //if(getValue('BYPASS_AGE_CENSOR')>0) { try { unsafeWindow.playnav.verifyAge=function(id,title,url) {}; } catch(e) {} }
  }

  //~~~~~~~~ Startof innerscript ~~~~~~//
  var innerscript = function() {
// Usefull routine
function isUndefined(x) { return x == null && x !== null; }
function getAbsoluteTop(element) {
  var AbsTop=0;
  while (element) { AbsTop=AbsTop+element.offsetTop; element=element.offsetParent; }
  return(AbsTop);
}
function show_debug(msg) { if(__DEBUG) { show_msg('DEBUG: '+msg,0) } }
function show_msg(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  if((typeof console!='undefined') && (typeof console.log!='undefined')) { console.log('('+arguments.callee.counter+') YouTube Enhancer: '+msg); }
  else if((typeof opera!='undefined') && (typeof opera.postError!='undefined')) { opera.postError('('+arguments.callee.counter+') YouTube Enhancer: '+msg); }
  if(force==0) { return; }
  // Show a HTML alert box (only for watch pages or if forced)
  if(force==1 || gvar.isWatchPage) {
    warningelem=document.createElement('div');
    warningelem.setAttribute("style","color:#FFFFFF; background:#FF8000; width:auto; text-align:center; font-size:24px; border: 3px solid #CC0088; margin:2px;");
    warningelem.textContent=msg;
    document.body.insertBefore(warningelem, document.body.firstChild);
  }
}

// Path check
if(!yt) { yt=function() {} }
if(!yt.www) { yt.www=function() {} }
if(!yt.www.watch) { yt.www.watch=function() {} }
if(!yt.www.watch.player) { yt.www.watch.player=function() {} }

// Redefine seekTo
yt.www.watch.player.seekTo = function(t,m) {
  if(t==null) { return; }
  if(isUndefined(m)) { m=true; }
  var player=window.document.getElementById('__movie_player');
  if(!player) { return; }
  scrollToVideoAndMemo(player);
  player.seekTo(Math.max(0,t-1),m);
  hide_video_preview();
  player.playVideo();
  window.setTimeout(checkNotStarting,50);
}

function scrollToVideo(playerEmbed) {
  var pcs=window.getComputedStyle(playerEmbed,null);
  var w=parseInt(pcs.width.replace('px',''),10);
  var h=parseInt(pcs.height.replace('px',''),10)-parseInt('__YT_BAR_HEIGHT',10);
  var cx=(w-document.documentElement.clientWidth)/2;
  var cy=(h-document.documentElement.clientHeight)/2;
  if(-100<cy && cy<=-52) { cy=cy+40; }
  else if(-52<cy && cy<=-4) { cy=-2; }
  else if(-4<cy && cy<0)  { cy=Math.ceil(cy/2); }
  //show_debug('2> scrollTo('+parseInt(cx)+','+parseInt((getAbsoluteTop(playerEmbed)+cy))+')',0);
  scrollTo(Math.max(0,cx),Math.max(0,getAbsoluteTop(playerEmbed)+cy));
}
function scrollToVideoAndMemo(playerEmbed) {
  var pos1=document.documentElement.scrollLeft+","+document.documentElement.scrollTop;
  scrollToVideo(playerEmbed);
  var pos2=document.documentElement.scrollLeft+","+document.documentElement.scrollTop;
  if(pos1!=pos2) { playerEmbed.setAttribute('seekTo_back',pos1); }
}

function check_movie_player() {
  var playerEmbed = document.getElementById('__movie_player');
  var wpd = document.getElementById('__watch-player-div');
  if(wpd) {wpd.style.setProperty('padding-left','0','important');}
  if(playerEmbed) { return; }
  if(!wpd) { return; }
  // playerEmbed not found => try to find it
  var temp=null; try { temp=wpd.getElementsByTagName("embed"); } catch(err) { temp=null; }
  if(temp && temp[0]) { temp[0].setAttribute('id','__movie_player'); return; }
}

function check_allowscriptaccess(ytplayer) { // Check for allowscriptaccess (must be 'always')
  allowScript=ytplayer.getAttribute('allowscriptaccess');
  if(!(allowScript) || !(allowScript.match(/^always$/i))) {
    ytplayer.setAttribute('allowscriptaccess','always');
    return 1;
  }
  return 0;
}

function set_autoplay(ytplayer,new_autoplay) {
  var flashvars = ytplayer.getAttribute('flashvars');
  if(ytplayer.hasAttribute('MC_AUTOPLAY')) { new_autoplay=ytplayer.getAttribute('MC_AUTOPLAY'); }
  if(!flashvars) { return; }
  var autoplay=flashvars.match(/autoplay\=(\d+)/i);
  if(new_autoplay=="1") {
    if(!(autoplay)) {
      ytplayer.setAttribute('flashvars',flashvars+'&autoplay=0');
      return 1;
    } else if (autoplay[1]!=0) {
      ytplayer.setAttribute('flashvars',flashvars.replace(/autoplay\=\d+/i,"autoplay=0"));
      return 1;
    }
  } else {
    if(autoplay) {
      if(autoplay[1]!=1) {
        ytplayer.setAttribute('flashvars',flashvars.replace(/autoplay\=\d+/i,"autoplay=1"));
        return 1;
      }
    }
  }
  return 0;
}

function check_for_loop(ytplayer) {
  var loop_state=window.document.getElementById('__movie_player-Loop_state');
  if(loop_state.getAttribute('value')!=0) {
    var memo_state=window.document.getElementById('__movie_player-Memo_state');
    if(memo_state) {
      var memo_pos=parseFloat(memo_state.getAttribute('value'),9);
      if(memo_pos<0) { memo_pos=0; }
      ytplayer.seekTo(memo_pos,1);
      window.setTimeout( function() { ytplayer.playVideo(); window.setTimeout(checkNotStarting,50); }, 100);
      return 1;
    }
  }
  return 0;
}

function check_still_buffering() {
  var player=window.document.getElementById('__movie_player');
  if(!player) { return; }
  var state=-3; try { state=player.getPlayerState(); } catch(err) { state=-4; }
  if(state==3) {
    if(player.getCurrentTime()>player.getDuration()-0.5) {
      if(check_for_loop(player)) { return; }
      // Original Youtube Script (if no loop)
      try { handleWatchPagePlayerStateChange(0); } catch(err) {}
    }
  }
}

function check_time_to_pause() {
  var player=window.document.getElementById('__movie_player');
  if(!player) { return; }
  if(isUndefined(arguments.callee.first_time)) {
    arguments.callee.first_time=player.getCurrentTime();
    window.setTimeout( function() { check_time_to_pause(); }, 50);
    return;
  }
  if(player.getCurrentTime()!=arguments.callee.first_time) {
    player.pauseVideo();
    if(!arguments.callee.wasMuted) { player.unMute(); }
    window.setTimeout( function() { player.seekTo(-1,false); onMediaControllerPlayerStateChange.bufferingMode=false; window.setTimeout( function() { autostart(true); }, 250); },0);
  } else {
    window.setTimeout( function() { check_time_to_pause(); }, 50);
  }
}

function hide_video_preview() {
  var ysp=document.getElementById('__YTE_SCREEN_PREVIEW');
  if(ysp) {
    var imgElem=ysp.getElementsByTagName('img')[0];
    ysp.style.setProperty('display','none','');
    var evObj = document.createEvent('MouseEvents');
    evObj.initEvent('mouseout', true, false);
    imgElem.dispatchEvent(evObj);
  }
}

function autostart(start) {
  if(start==true) {
    arguments.callee.sstate=parseInt('__BUFFERING_AUTOSTART_AT',10);
    arguments.callee.wstate=parseInt('__BUFFERING_AUTOSTART_AFTER',10);
    if(arguments.callee.wstate>0) {
      var mdate=new Date();
      mdate.setSeconds(mdate.getSeconds()+arguments.callee.wstate);
      arguments.callee.wdate=mdate.getTime();
    }
  }
  var cont=false;
  var player=window.document.getElementById('__movie_player');
  if(arguments.callee.wstate>0) {
    var ndate=new Date();
    if(ndate.getTime()>=arguments.callee.wdate) {
      player.playVideo();
      window.setTimeout(checkNotStarting,50);
    } else { cont=true; }
  }
  if(arguments.callee.sstate>0) {
    if(player.getVideoBytesTotal()>=0) {
      if(player.getVideoBytesLoaded()>=(player.getVideoBytesTotal()-player.getVideoStartBytes())*arguments.callee.sstate/100-0.5) {
        player.playVideo();
        window.setTimeout(checkNotStarting,50);
      } else { cont=true; }
    }
  }
  if(cont) { window.setTimeout(autostart,400); }
}

function stopAutostart() {
  autostart.sstate=0;
  autostart.wstate=0;
}

function checkNotStarting() {
  function checkNotStarting_seekTrick(old) {
    var player=window.document.getElementById('__movie_player');
    if(player.getPlayerState()!=1) { return; }
    if(player.getCurrentTime()>(old+0.1) || player.getCurrentTime()<(old-0.1)) { return; }
    player.seekTo(old+4,0);
    window.setTimeout(function() { player.seekTo(old,0); },25);
  }
  var player=window.document.getElementById('__movie_player');
  var current=player.getCurrentTime();
  window.setTimeout( function() { checkNotStarting_seekTrick(current); },1000);
}

onMediaControllerPlayerStateChange = function(newState) {
  show_debug('YTP_newState='+newState,0);
  var player=window.document.getElementById('__movie_player'); if(!player) { return; }
  var autoplay='__autoplay'; if(player.hasAttribute('MC_AUTOPLAY')) { autoplay=player.getAttribute('MC_AUTOPLAY'); }
  if((newState==1) && (!arguments.callee.Launch) && (autoplay=='2')) { arguments.callee.bufferingMode=true; }
  if(newState==1 && !arguments.callee.bufferingMode) { hide_video_preview(); stopAutostart(); }
  // New Check not loading
  if((newState>=2 && newState!=3) && arguments.callee.cnl_play) {
    arguments.callee.cnl_play=false;
    window.setTimeout( function() { player.playVideo(); }, 250);
    return;
  }
  // Start playing...
  if(newState==1) {
    arguments.callee.cnl_play=false;
    arguments.callee.cnl_countdown=parseInt('__CHECK_NOT_LOADING_RESTART',10);
    arguments.callee.cnlf_countdown=parseInt('__CHECK_NOT_LOADING_FLUSH',10);
    if(!arguments.callee.Launch) {
      arguments.callee.Launch=true;

      if('__ENABLE_VOLUME_CONTROL'>'0') {
        try { player.setVolume(parseInt('__VOLUME_AT_START',10)); } catch(e) {}
        try { player.unMute(); } catch(e) {}
      }

      try { var t=yt.www.watch.player.processLocationHashSeekTime(); player.seekTo(Math.max(0,t-1),true); } catch(err) {}
      //try { window.g_YouTubePlayerIsReady=true; } catch(err) {}
      if (autoplay=='2') { // Autoplay to buffering
        check_time_to_pause.wasMuted=player.isMuted(); player.mute(); check_time_to_pause();
      }
    }
  }
  // Test Infinite buffering
  if(newState==3) { // video is buffering
    if(player.getVideoBytesTotal()>=0) {
      if(player.getCurrentTime()>player.getDuration()-0.5) {
        if(player.getVideoStartBytes()+player.getVideoBytesLoaded()>=player.getVideoBytesTotal()) {
          newState=0;
        } else {
          window.setTimeout( function() { check_still_buffering(); }, 1500);
        }
      } else {
        if(('__REWIND_WHEN_BUFFERING'>'0') && (player.getCurrentTime()>0.5) && (player.getVideoStartBytes()+player.getVideoBytesLoaded()<player.getVideoBytesTotal())) { player.seekTo(0,true); }
      }
    }
  }
  // Check for Loop
  if(newState==0) { if(check_for_loop(player)) { return; } }
  // Original Youtube Script (if no loop)
  try { handleWatchPagePlayerStateChange(newState); } catch(err) {}
  try { playnav.onPlayerStateChange_bck(newState); } catch(err) {}
}

onMediaControllerPlayerError = function(perr) {
  show_msg('YTP_Error='+perr+' ('+onMediaControllerPlayerStateChange.cnl_countdown+'/'+onMediaControllerPlayerStateChange.cnlf_countdown+')',0);
  if(perr==0 || perr==100) {
    var player=window.document.getElementById('__movie_player');
    if(player) {
      if(perr==0) { // Need a kill & revive + Emulate video cued
        if(onMediaControllerPlayerStateChange.cnlf_countdown>0) {
          onMediaControllerPlayerStateChange.cnlf_countdown--;
          //player.parentNode.replaceChild(player.cloneNode(true),player);        
          onMediaControllerPlayerStateChange.cnl_play=true;
          player.stopVideo();
          onMediaControllerPlayerStateChange(5);
          return;
        }
      } else { // need a kill & revive
        if(player.getVideoBytesTotal()<0 && player.getPlayerState()!=5 && onMediaControllerPlayerStateChange.cnl_countdown>0) {
          onMediaControllerPlayerStateChange.cnl_countdown--;
          onMediaControllerPlayerStateChange.cnl_play=true;
          player.stopVideo();
          return;
        }
      }
    }
  }
  try { playnav.onPlayerError_bck(perr); } catch(err) {}
}

// vq: small, medium / large, hd720, hd1080
onQualitySelectorPlayerFormatChanged = function(vq) {
  show_msg('YTP_quality='+vq,0);
  var player=document.getElementById('__movie_player');
  if(!player) { return; }
  if(player.nodeName=='OBJECT') {
    var fp=null; try { fp=document.evaluate('.//param[@name="flashvars"]',player,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { fp=null; }
    if(fp) { fp.setAttribute('value',fp.getAttribute('value').replace(/((?:^|\&(?:amp;)?)vq\=)[^(\&|$)]*/i,"$1"+vq)); }
  } else {
    player.setAttribute('flashvars',player.getAttribute('flashvars').replace(/((?:^|\&(?:amp;)?)vq\=)[^(\&|$)]*/i,"$1"+vq));
  }
  var elem=document.getElementById('__YTE_OPTIONS_ID');
  if(elem) { var evObj=document.createEvent('MouseEvents'); evObj.initEvent('dblclick', true, false); elem.dispatchEvent(evObj); }
  hide_video_preview();
  try { onPlayerFormatChanged(vq); } catch(err) {}
}

onCollapseToggle = function(a,b) {
  if(arguments.callee.press) { show_msg('Wide button pressed but dropped ('+a+'/'+b+')',0); return; }
  window.setTimeout( function() { onCollapseToggle.press=false; }, 250);
  arguments.callee.press=true;

  show_msg('Wide button pressed ('+a+'/'+b+')',0);
  var player=window.document.getElementById('__movie_player');
  if(!player) { return; }
  var cwidth=player.style.getPropertyValue('width');
  var cheight=player.style.getPropertyValue('height');
  if(arguments.callee.lwidth==cwidth && cheight=='__YT_BAR_HEIGHT'+'px') {
    arguments.callee.lwidth=null;
    player.style.setProperty('height',arguments.callee.lheight,'important');
  } else {
    arguments.callee.lwidth=cwidth;
    arguments.callee.lheight=player.style.getPropertyValue('height');    
    player.style.setProperty('height','__YT_BAR_HEIGHT'+'px','important');
  }
  scrollToVideo(player);
}

function bind_ytp_event(idlaunch) {
  var ytplayer=window.document.getElementById('__movie_player');
  if(ytplayer) {
    if((++bind_ytp_event.count)==1) {
      show_debug('Binding event Success = '+idlaunch+' '+bind_ytp_event.count,0);
      try { ytplayer.style.setProperty('background','#000000',''); } catch(e) { }
      try { ytplayer.addEventListener("onStateChange", "onMediaControllerPlayerStateChange"); } catch(e) { show_msg('Error with binding event "onStateChange"',0); }
      try { ytplayer.addEventListener("onError", "onMediaControllerPlayerError"); } catch(e) { show_msg('Error with binding event "onError"',0); }
      try { ytplayer.addEventListener("onPlaybackQualityChange", "onQualitySelectorPlayerFormatChanged"); } catch(e) { show_msg('Error with binding event "onPlaybackQualityChange"',0); }
      try { ytplayer.addEventListener("SIZE_CLICKED", "onCollapseToggle"); } catch(e) { show_msg('Error with binding event "SIZE_CLICKED"',0); }
      // Playlist... ?
      //try { ytplayer.addEventListener("NEXT_CLICKED", "onNextClicked"); } catch(e) { show_msg('Error with binding event "NEXT_CLICKED"',0); }
      //try { ytplayer.addEventListener("NEXT_SELECTED","onNextSelected"); } catch(e) { show_msg('Error with binding event "NEXT_SELECTED"',0); }
    } else { show_debug('Binding event Failed = '+idlaunch+' '+bind_ytp_event.count,0); }
  }
}
function bind_MediaControllerPlayerStateChange(playerid,idlaunch,count) {
  show_debug('Bind_YTP='+playerid,0);
  check_movie_player();
  var ytplayer=window.document.getElementById('__movie_player');
  if(ytplayer) {
    // Flush to remove the initial event since there no removeEventListener ?
    if(isUndefined(arguments.callee.initialflush)) { arguments.callee.initialflush=0; } // Don't do it since i see no problem :p
    var flush=arguments.callee.initialflush; arguments.callee.initialflush=0;
    flush += check_allowscriptaccess(ytplayer);
    flush += set_autoplay(ytplayer,'__autoplay');
    if(count==9) { flush++; } // Something wrong...
    if(flush) { ytplayer.parentNode.replaceChild(ytplayer.cloneNode(true),ytplayer); return; }
    var state=-3; try { state=ytplayer.getPlayerState(); } catch(err) { state=-4; }
    if(state<-2) { // Still loading the player...
      if(idlaunch==arguments.callee.lastid) {
        if(count>99) { return; } // Something very wrong...
        show_debug('Restart Bind_YTP='+playerid+' / state='+state+' / count='+count,0);
        window.setTimeout( function() { bind_MediaControllerPlayerStateChange(playerid,idlaunch,++count); }, 50);
      }
    } else {
      if(idlaunch==arguments.callee.lastid) {
        bind_ytp_event(idlaunch);
      } else { show_debug('Bind_YTP stopped for '+idlaunch,0); }
    }
  } else { show_msg('YT Player not found',0); }
}

bind_MediaControllerPlayerStateChange.lastid=0;
function YTE_onYouTubePlayerReady(playerid) {
  show_debug('YTE_YTP_Ready='+playerid,0);
  stopAutostart();
  onMediaControllerPlayerStateChange.Launch=false;
  onMediaControllerPlayerStateChange.cnl_countdown=parseInt('__CHECK_NOT_LOADING_RESTART',10);
  onMediaControllerPlayerStateChange.cnl_play=false;
  onMediaControllerPlayerStateChange.bufferingMode=false;
  //if('__autoplay'<'3') { if(window.location.hash.match(/^#play\//)) { window.location.hash=''; } }
  bind_MediaControllerPlayerStateChange(playerid,++bind_MediaControllerPlayerStateChange.lastid,0);
  try { showAndSet3DModeControl(0); threedViewStyleChange(); } catch(err) {}
  //try { playnav.initPlayer(); /*onChannelPlayerReady(playerid);*/ } catch(err) {}
}
function YTE_FlushPlayer(player_name) {
  var el=document.getElementById(player_name);
  var elp=el.parentNode;
  var eln=el.nextSibling; elp.removeChild(el); var nel=el.cloneNode(true); elp.insertBefore(nel,eln); // New flush method
}
onYouTubePlayerReady_rebindAndFlush=function(player_name) {
  // Redefine onYouTubePlayerReady (warning: can cause conflict with an other script)
  bind_ytp_event.count=0;
  onMediaControllerPlayerStateChange.cnlf_countdown=parseInt('__CHECK_NOT_LOADING_FLUSH',10);
  onYouTubePlayerReady = function(playerid) { YTE_onYouTubePlayerReady(playerid); }
  if(player_name) { YTE_FlushPlayer(decodeURIComponent(player_name)); }
}
onYouTubePlayerReady_rebindAndFlush(); onYouTubePlayerReady();

// some playnav move...
try {
  playnav.onPlayerStateChange_bck=playnav.onPlayerStateChange;
  playnav.onPlayerError_bck=playnav.onPlayerError;
  playnav.onPlayerStateChange=function() {}
  playnav.onPlayerError=function() {}

  window.goog.dom.$=function(a) {
    var player_ = {
      pauseVideo: function() { document.getElementById('movie_player').pauseVideo(); }
    , playVideo:  function() { document.getElementById('movie_player').playVideo();  }
    , stopVideo:  function() { document.getElementById('movie_player').stopVideo();  }
    }
    if(typeof(a)=='string') { if(a=='movie_player') { return player_; }; return document.getElementById(a); } else { return a; }
  }
} catch(err) {}

var pvpi=document.getElementById('playnav-video-panel-inner');
if(pvpi) {
  onRefreshDetails=function() {
    if('__EXPAND_VIDEO_DETAILS'>='1') {
      var pcdm=document.getElementById('playnav-curvideo-description-more');
      if(pcdm) { window.setTimeout( function() { playnav.toggleFullVideoDescription(true); },250); }
    }
    var pcvt=document.getElementById('playnav-curvideo-title');
    if(pcvt) {
      var sp=pcvt.getElementsByTagName('span');
      if(sp.length>0) {
        sp=sp[0]; var oc=sp.getAttribute('onclick');
        if(oc) {
          var res=oc.match(/watch\?v\=(.*?)\'/);
          if(res) {
            var al=document.createElement("a");
            nsp=sp.cloneNode(true); nsp.removeAttribute('onclick');
            al.setAttribute('href','/watch?v='+res[1]);
            al.appendChild(nsp); sp.parentNode.replaceChild(al,sp);
    } } } }
  }
  pvpi.addEventListener('DOMNodeInserted',onRefreshDetails,true);
}

  } //~~~~~~~ Endof innerscript ~~~~~~~//

  innerscript=innerscript.toString().replace(/__movie_player/g,YT_PLAYER_EMBED)
             .replace(/__watch-player-div/,WATCH_PLAYER_DIV)
             .replace(/__autoplay/g,getAutoplayValue())
             .replace(/__quality_selector/,QUALITY_SELECTOR_ID)
             .replace(/__CHECK_NOT_LOADING_RESTART/g,Math.min(10,getValue('CHECK_NOT_LOADING_RESTART')))
             .replace(/__CHECK_NOT_LOADING_FLUSH/g,Math.min(30,getValue('CHECK_NOT_LOADING_FLUSH')))
             .replace(/__YTE_OPTIONS_ID/,YTE_OPTIONS_ID)
             .replace(/__YTE_SCREEN_PREVIEW/,YTE_SCREEN_PREVIEW)
             .replace(/__YT_BAR_HEIGHT/g,YT_BAR_HEIGHT)
             .replace(/__REWIND_WHEN_BUFFERING/,getValue('REWIND_WHEN_BUFFERING'))
             .replace(/__EXPAND_VIDEO_DETAILS/,getValue('BCHAN_EXPAND_VIDEO_DETAILS'))
             .replace(/__BUFFERING_AUTOSTART_AT/,getValue('BUFFERING_AUTOSTART_AT'))
             .replace(/__BUFFERING_AUTOSTART_AFTER/,getValue('BUFFERING_AUTOSTART_AFTER'))
             .replace(/__ENABLE_VOLUME_CONTROL/,getValue('ENABLE_VOLUME_CONTROL'))
             .replace(/__VOLUME_AT_START/,getValue('VOLUME_AT_START'))
             .replace(/__DEBUG/g,DEBUG);

  var script=document.createElement("script");
  script.setAttribute('type','text/javascript');
  script.textContent="("+innerscript+")();";
  document.body.appendChild(script);
}
// *********************************************************************************************************** //

function addTransparentCanvas(ParentEl,widthEl,heightEl) {
  var canvasEl=document.createElement('canvas');
  canvasEl.setAttribute('height',heightEl+'px');
  canvasEl.setAttribute('width' ,widthEl +'px');
  ParentEl.appendChild(canvasEl);
  return(canvasEl);
}

function setSizePlayer(mode,ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(!ytplayer) { return; }
  var h=parseInt(ytplayer.getAttribute('height'),10);
  var hi=640*720/1280;
  switch(mode) {
    case 1: h=640*960/1280; break;
    default: case 2: h=hi; break;
    case 3: h=0; break;
  }
  gvar.oldPlayerSizeMode=mode;
  ytplayer.setAttribute('height',h+YT_BAR_HEIGHT);
  var plp=$('playnav-left-panel');
  if(plp) { plp.style.setProperty('padding-top',Math.max(0,(h-hi))+'px',''); }
  var upn=$('user_playlist_navigator');
  if(upn) {
    if(mode==3) {
      var rgba=GetColors(window.getComputedStyle(upn,null).backgroundColor);
      if(rgba && rgba.a>0.6) { upn.style.backgroundColor='rgba('+rgba.r+', '+rgba.g+', '+rgba.b+', 0.6)'; }
    } else {
      upn.style.backgroundColor='';
    }
  }
  YTPoverlay_display(1,ytplayer_name);
}

//** === Media Controller === **//
function media_controller(ytplayer_name,tag) {
  // === Canvas Button ===
  function drawStopButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    ctx.fillRect( 8, 7,12,13);
  }
  function drawStepBackButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    ctx.fillRect(20, 7.9, 3,11.3);
    ctx.beginPath(); ctx.moveTo(18, 8); ctx.lineTo(17, 8); ctx.lineTo( 6,14); ctx.lineTo(17,19); ctx.lineTo(18,19); ctx.lineTo(18, 8);
    ctx.fill();    
  }
  function drawFrameButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    ctx.fillRect( 5, 7.9, 3,11.3);
    ctx.beginPath(); ctx.moveTo(10, 8); ctx.lineTo(11, 8); ctx.lineTo(22,14); ctx.lineTo(11,19); ctx.lineTo(10,19); ctx.moveTo(10, 8);
    ctx.fill();    
  }
  function drawPlayButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    ctx.beginPath(); ctx.moveTo( 6, 7); ctx.lineTo(21,14); ctx.lineTo( 6,20); ctx.lineTo( 6, 7);
    ctx.fill();    
  }
  function drawPauseButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    ctx.fillRect( 8, 6, 4,15);
    ctx.fillRect(16, 6, 4,15);
  }
  function drawMemoButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    ctx.fillRect ( 6, 5, 7, 3);
    ctx.fillRect ( 6, 5, 3,14);
    ctx.clearRect( 7, 6, 5, 1);
    ctx.clearRect( 7, 6, 1,12);
  }
  function drawLoopButton(ctx,color) {
    ctx.clearRect(0,0,35,26); ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(25,15  ,5.9,Math.PI/2,-Math.PI/2,true);
    ctx.arc(25,14.6,4  ,-Math.PI/2,Math.PI/2,false);
    ctx.fill();
    ctx.fillRect(13,19,12,2.2);
    ctx.beginPath();
    ctx.arc(13,14.2,4.5,-Math.PI/2,Math.PI/2,true);
    ctx.arc(13,14.4,6.5,Math.PI/2,-Math.PI/2,false);
    ctx.fill();
    ctx.fillRect(9,9,2,3);
    ctx.fillRect(11,9,3,2);
    ctx.fillRect(12,7.4,6,3);
    ctx.beginPath(); ctx.moveTo(11, 4); ctx.lineTo(14, 4); ctx.lineTo(21, 9); ctx.lineTo(14,14); ctx.lineTo(11,14); ctx.lineTo(18, 9); ctx.lineTo(11, 4);
    ctx.fill();
  }
  function drawRewindButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    ctx.fillRect(8, 7, 1.2,13.5);
    ctx.beginPath(); ctx.moveTo(21, 7); ctx.lineTo( 8,14); ctx.lineTo(21,20); ctx.lineTo(21, 7);
    ctx.fill();    
  }
  function drawLimitButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    ctx.fillRect (15,18, 7, 3);
    ctx.fillRect (19, 6, 3,14);
    ctx.clearRect(16,19, 5, 1);
    ctx.clearRect(20, 7, 1,12);
  }
  function drawFreezeButton(ctx,color) {
    ctx.clearRect(0,0,28,26); ctx.fillStyle=color;
    switch (getValue('CUSTOM_FREEZE_BUTTON')) {
      case 0: default: // Original
        ctx.fillRect(11, 6, 2, 3); ctx.fillRect(15, 6, 2, 3); // Eyes
        ctx.fillRect(13,10, 2, 1); // Nose
        ctx.fillRect(13, 2, 2, 1); ctx.fillRect(10, 3, 3, 1); ctx.fillRect(15, 3, 3, 1); ctx.fillRect( 9, 4, 1, 2); ctx.fillRect(18, 4, 1, 2); ctx.fillRect( 8, 6, 1, 2); ctx.fillRect(19, 6, 1, 2); ctx.fillRect( 9, 8, 1, 3); ctx.fillRect(18, 8, 1, 3); ctx.fillRect(10,10, 1, 2); ctx.fillRect(17,10, 1, 2); ctx.fillRect(11,12, 2, 1); ctx.fillRect(15,12, 2, 1); ctx.fillRect(11,13, 6, 1); ctx.fillRect(11,14, 1, 1); ctx.fillRect(16,14, 1, 1); // Head
        ctx.fillRect( 5,13, 2, 1); ctx.fillRect(21,13, 2, 1); ctx.fillRect( 5,14, 1, 1); ctx.fillRect( 7,14, 2, 1); ctx.fillRect(19,14, 2, 1); ctx.fillRect(22,14, 1, 1); ctx.fillRect( 4,15, 1, 1); ctx.fillRect( 9,15,10, 1); ctx.fillRect(23,15, 1, 1); ctx.fillRect( 5,16, 5, 1); ctx.fillRect(13,16, 3, 1); ctx.fillRect(19,16, 5, 1); ctx.fillRect(10,17, 2, 1); ctx.fillRect(15,17, 4, 1); ctx.fillRect( 9,18, 2, 1); ctx.fillRect(12,18, 3, 1); ctx.fillRect(18,18, 1, 1); ctx.fillRect( 4,19, 5, 1); ctx.fillRect(11,19, 2, 1); ctx.fillRect(15,19, 2, 1); ctx.fillRect(19,19, 5, 1); ctx.fillRect( 4,20, 1, 2); ctx.fillRect( 8,20, 3, 1); ctx.fillRect(17,20, 3, 1); ctx.fillRect(23,20, 1, 1); ctx.fillRect( 6,21, 2, 1); ctx.fillRect(20,21, 3, 1); ctx.fillRect( 5,22, 1, 1); // Bones
        break;
      case 1: // Eject Button
        ctx.fillRect( 7, 17,14,5);
        ctx.beginPath(); ctx.moveTo(14, 5); ctx.lineTo( 7,15); ctx.lineTo(21.5,15); ctx.lineTo(14.5, 5);
        ctx.fill();    
        break;
    }
  }
  function drawEULinkButton(ctx,color,line) {
    ctx.clearRect(0,0,34,26); ctx.fillStyle=color;
    ctx.fillRect (12, 8, 9, 9);
    ctx.fillRect (13, 9, 9, 9);
    ctx.clearRect(13, 9, 7, 7);
    if(line) { ctx.fillRect(10,22,14,1.2); }
  }
  function drawFSLinkButton(ctx,color,line) {
    ctx.clearRect(0,0,56,26); ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(14,12,3,Math.PI*70/180,-Math.PI*70/180,true);
    ctx.arc(14,12,2,-Math.PI*60/180,Math.PI*60/180,false);
    ctx.fill();
    ctx.beginPath(); ctx.moveTo(20, 7); ctx.lineTo(10,12); ctx.lineTo(20,17); ctx.lineTo(18,17); ctx.lineTo(8,12); ctx.lineTo(18, 7); ctx.lineTo(20, 7);
    ctx.fill();
    ctx.fillRect (35, 8, 9, 9);
    ctx.fillRect (36, 9, 9, 9);
    ctx.clearRect(36, 9, 7, 7);
    if(line) { ctx.fillRect(7,22,41,1.2); }
  }
  function drawThumb(ctx) {
    ctx.fillRect(27, 3, 6, 3);
    ctx.fillRect(27, 7, 6, 3);
    ctx.fillRect(27,11, 6, 3);
    ctx.fillRect(27,15, 6, 3);
    ctx.fillRect(27,19, 6, 3);
  }
  function draw4DIV3Button(ctx,color) {
    ctx.clearRect(0,0,38,26); ctx.fillStyle=color;
    ctx.globalAlpha=0.6;
    drawThumb(ctx);
    ctx.fillRect( 5,19,21, 3);
    ctx.globalAlpha=1;
    ctx.fillRect( 5, 3,21,15);
    ctx.beginPath(); ctx.moveTo(13, 7); ctx.lineTo(17.5,10); ctx.lineTo(13,13); ctx.moveTo(13, 7);
    ctx.globalCompositeOperation = 'destination-out'; ctx.fill(); ctx.globalCompositeOperation = 'source-over';
  }
  function drawWIDEButton(ctx,color) {
    ctx.clearRect(0,0,38,26); ctx.fillStyle=color;
    ctx.globalAlpha=0.6;
    drawThumb(ctx);
    ctx.fillRect( 5,15,21, 7);
    ctx.globalAlpha=1;
    ctx.fillRect( 5, 3,21,11);
    ctx.beginPath(); ctx.moveTo(13, 5); ctx.lineTo(17.5, 8); ctx.lineTo(13,11); ctx.moveTo(13, 5);
    ctx.globalCompositeOperation = 'destination-out'; ctx.fill(); ctx.globalCompositeOperation = 'source-over';
  }
  function drawBARButton(ctx,color) {
    ctx.clearRect(0,0,38,26); ctx.fillStyle=color;
    ctx.globalAlpha=0.6;
    drawThumb(ctx);
    ctx.fillRect( 5,15,21, 7);
    ctx.globalAlpha=1;
    ctx.fillRect( 5, 3,21, 3);
  }

  var ytplayer = $(ytplayer_name);
  if(!ytplayer) { show_alert('Media Controller Disabled: "'+ytplayer_name+'" not found'); return; }
  if(ytplayer.getAttribute('mc_embedtype')) { show_debug('Trying to rebind Media Controller to "'+ytplayer_name+'" (dropped)'); return; }
  else { show_debug('Binding Media Controller to "'+ytplayer_name+'" (Success)'); }
  ytplayer.setAttribute('mc_embedtype',tag);

  // Media Controller display mode
  var ytplayer_offsetLeft=0; var ytplayer_width=getWidth(ytplayer);
  if(ytplayer_width<=0) { ytplayer_width=getWidth(ytplayer.parentNode); }
  if(ytplayer_width>960) { ytplayer_offsetLeft=(ytplayer_width-960)/2; ytplayer_width=960; }

  var MC_height=26; var MC_leftB2=167; var MC_topB2=-1; var MC_leftB3=480-166;
  if(ytplayer_width<480-126) { MC_leftB2=(ytplayer_width-244)/2+117; MC_leftB3=ytplayer_width-30; }
  if(ytplayer_width<300) { MC_leftB2=19; MC_leftB3=145; MC_topB2=26; }

  var yt_p=ytplayer.parentNode; var yt_ns; var yt_c=ytplayer;
  if(yt_p.tagName=="OBJECT") { yt_c=yt_p; yt_p.setAttribute('mc_embedtype',3); yt_ns=yt_p.nextSibling; yt_p=yt_p.parentNode; }
  else { yt_ns=ytplayer.nextSibling; }

  mediabar=document.createElement('div');
  //mediabar.setAttribute('id','Media_Controller-'+ytplayer_name);
  mediabar.setAttribute('style','position:relative; width:'+ytplayer_width+'px; margin-bottom:5px; padding-bottom:3px; z-index:550;'
                       +'height:'+(MC_height+MC_topB2-1)+'px; border:0px; color:'+color('MC_TEXT_OUT')+' !important; line-height:1em !important');

  // === Media Controller Bar ===
  // 1st group
  var buttonStop=document.createElement('div');
  buttonStop.setAttribute('title',getText("stop"));
  buttonStop.setAttribute('style','left: 0px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  var buttonStopCtx=addTransparentCanvas(buttonStop,28,26).getContext('2d');
  drawStopButton(buttonStopCtx,color('MC_TEXT_OUT'));
  buttonStop.addEventListener('mouseover', function() { drawStopButton(buttonStopCtx,color('MC_TEXT_ACTION_IN')); }, true);
  buttonStop.addEventListener('mouseout',  function() { drawStopButton(buttonStopCtx,color('MC_TEXT_OUT'));       }, true);
  buttonStop.addEventListener('click',     function() { player_stop(ytplayer_name); }, true);
  user_select(buttonStop,'none');
  mediabar.appendChild(buttonStop);

  var buttonStepBack=document.createElement('div');
  buttonStepBack.setAttribute('title',getText("stepb"));
  buttonStepBack.setAttribute('style','left:29px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  var buttonStepBackCtx=addTransparentCanvas(buttonStepBack,28,26).getContext('2d');
  drawStepBackButton(buttonStepBackCtx,color('MC_TEXT_OUT'));
  buttonStepBack.addEventListener('mouseover', function() { drawStepBackButton(buttonStepBackCtx,color('MC_TEXT_ACTION_IN')); }, true);
  buttonStepBack.addEventListener('mouseout',  function() { drawStepBackButton(buttonStepBackCtx,color('MC_TEXT_OUT'));       }, true);
  buttonStepBack.addEventListener('click',     function() { player_stepback(ytplayer_name); }, true);
  user_select(buttonStepBack,'none');
  mediabar.appendChild(buttonStepBack);

  var buttonFrame=document.createElement('div');
  buttonFrame.setAttribute('title',getText("stepf"));
  buttonFrame.setAttribute('style','left:58px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  var buttonFrameCtx=addTransparentCanvas(buttonFrame,28,26).getContext('2d');
  drawFrameButton(buttonFrameCtx,color('MC_TEXT_OUT'));
  buttonFrame.addEventListener('mouseover', function() { drawFrameButton(buttonFrameCtx,color('MC_TEXT_ACTION_IN')); }, true);
  buttonFrame.addEventListener('mouseout',  function() { drawFrameButton(buttonFrameCtx,color('MC_TEXT_OUT'));       }, true);
  buttonFrame.addEventListener('click',     function() { player_frame(ytplayer_name); }, true);
  user_select(buttonFrame,'none');
  mediabar.appendChild(buttonFrame);

  var buttonPlay=document.createElement('div');
  buttonPlay.setAttribute('title',getText("play"));
  buttonPlay.setAttribute('style','left:87px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  var buttonPlayCtx=addTransparentCanvas(buttonPlay,28,26).getContext('2d');
  drawPlayButton(buttonPlayCtx,color('MC_TEXT_OUT'));
  buttonPlay.addEventListener('mouseover', function() { drawPlayButton(buttonPlayCtx,color('MC_TEXT_ACTION_IN')); }, true);
  buttonPlay.addEventListener('mouseout',  function() { drawPlayButton(buttonPlayCtx,color('MC_TEXT_OUT'));       }, true);
  buttonPlay.addEventListener('click',     function() { player_play(ytplayer_name); }, true);
  user_select(buttonPlay,'none');
  mediabar.appendChild(buttonPlay);

  var buttonPause=document.createElement('div');
  buttonPause.setAttribute('title',getText("pause"));
  buttonPause.setAttribute('style','left:116px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  var buttonPauseCtx=addTransparentCanvas(buttonPause,28,26).getContext('2d');
  drawPauseButton(buttonPauseCtx,color('MC_TEXT_OUT'));
  buttonPause.addEventListener('mouseover', function() { drawPauseButton(buttonPauseCtx,color('MC_TEXT_ACTION_IN')); }, true);
  buttonPause.addEventListener('mouseout',  function() { drawPauseButton(buttonPauseCtx,color('MC_TEXT_OUT'));       }, true);
  buttonPause.addEventListener('click',     function() { player_pause(ytplayer_name); }, true);
  user_select(buttonPause,'none');
  mediabar.appendChild(buttonPause);


  // 2nd group
  var buttonMemo=document.createElement('div');
  buttonMemo.setAttribute('id',ytplayer_name+'-Memo_state');
  buttonMemo.setAttribute('title',getText("begin"));
  buttonMemo.setAttribute('style','left:'+MC_leftB2+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  buttonMemo.setAttribute('value',-1);
  var buttonMemoCtx=addTransparentCanvas(buttonMemo,28,26).getContext('2d');
  drawMemoButton(buttonMemoCtx,color('MC_TEXT_OUT'));
  buttonMemo.addEventListener('mouseover', function() { drawMemoButton(buttonMemoCtx,color('MC_TEXT_TOGGLE_IN')); }, true);
  buttonMemo.addEventListener('mouseout',  function() { drawMemoButton(buttonMemoCtx,color('MC_TEXT_OUT'));       }, true);
  buttonMemo.addEventListener('click',     function() { player_memo(ytplayer_name); }, true);
  user_select(buttonMemo,'none');
  mediabar.appendChild(buttonMemo);

  var buttonLoop=document.createElement('div');
  buttonLoop.setAttribute('id',ytplayer_name+'-Loop_state');
  buttonLoop.setAttribute('title',getText("loop"));
  buttonLoop.setAttribute('style','left:'+(MC_leftB2+29)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:37px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  buttonLoop.setAttribute('value',getValue('MC_LOOP_AT_START'));
  if(getValue('MC_LOOP_AT_START')!=0) { buttonLoop.style.setProperty('background-color',color('MC_TOGGLE_LOOP'),'important'); }
  var buttonLoopCtx=addTransparentCanvas(buttonLoop,35,26).getContext('2d');
  drawLoopButton(buttonLoopCtx,color('MC_TEXT_OUT'));
  buttonLoop.addEventListener('mouseover', function() { drawLoopButton(buttonLoopCtx,color('MC_TEXT_TOGGLE_IN')); }, true);
  buttonLoop.addEventListener('mouseout',  function() { drawLoopButton(buttonLoopCtx,color('MC_TEXT_OUT'));       }, true);
  buttonLoop.addEventListener('click',     function() { player_loop(ytplayer_name); }, true);
  user_select(buttonLoop,'none');
  mediabar.appendChild(buttonLoop);

  var buttonRewind=document.createElement('div');
  buttonRewind.setAttribute('title',getText("rewind"));
  buttonRewind.setAttribute('style','left:'+(MC_leftB2+67)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  var buttonRewindCtx=addTransparentCanvas(buttonRewind,28,26).getContext('2d');
  drawRewindButton(buttonRewindCtx,color('MC_TEXT_OUT'));
  buttonRewind.addEventListener('mouseover', function() { drawRewindButton(buttonRewindCtx,color('MC_TEXT_ACTION_IN')); }, true);
  buttonRewind.addEventListener('mouseout',  function() { drawRewindButton(buttonRewindCtx,color('MC_TEXT_OUT'));       }, true);
  buttonRewind.addEventListener('click',     function() { player_rewind(ytplayer_name); }, true);
  user_select(buttonRewind,'none');
  mediabar.appendChild(buttonRewind);

  var buttonLimit=document.createElement('div');
  buttonLimit.setAttribute('id',ytplayer_name+'-Limit_state');
  buttonLimit.setAttribute('title',getText("end"));
  buttonLimit.setAttribute('style','left:'+(MC_leftB2+96)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BACKGROUND')+' !important; border-top:0; overflow:hidden');
  buttonLimit.setAttribute('value',-1);
  var buttonLimitCtx=addTransparentCanvas(buttonLimit,28,26).getContext('2d');
  drawLimitButton(buttonLimitCtx,color('MC_TEXT_OUT'));
  buttonLimit.addEventListener('mouseover', function() { drawLimitButton(buttonLimitCtx,color('MC_TEXT_TOGGLE_IN')); }, true);
  buttonLimit.addEventListener('mouseout',  function() { drawLimitButton(buttonLimitCtx,color('MC_TEXT_OUT'));       }, true);
  buttonLimit.addEventListener('click',     function() { player_limit(ytplayer_name); }, true);
  user_select(buttonLimit,'none');
  mediabar.appendChild(buttonLimit);


  // 3rd group
  var buttonFreeze=document.createElement('div');
  buttonFreeze.setAttribute('title',getText("kill"));
  buttonFreeze.setAttribute('style','left:'+MC_leftB3+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; cursor:pointer; background:'+color('MC_BG_RED')+' !important; border-top:0; overflow:hidden');
  var buttonFreezeCtx=addTransparentCanvas(buttonFreeze,28,26).getContext('2d');
  drawFreezeButton(buttonFreezeCtx,color('MC_TEXT_OUT'));
  buttonFreeze.addEventListener('mouseover', function() { drawFreezeButton(buttonFreezeCtx,color('MC_TEXT_ACTION_IN')); }, true);
  buttonFreeze.addEventListener('mouseout',  function() { drawFreezeButton(buttonFreezeCtx,color('MC_TEXT_OUT'));       }, true);
  buttonFreeze.addEventListener('click',     function() { player_freeze(ytplayer_name); }, true);
  user_select(buttonFreeze,'none');
  mediabar.appendChild(buttonFreeze);

  // 4th group
  if(gvar.isWatchPage) {
    if(!gvar.isVerifAgePage) {
      var eurl=get_embedURL();
      if(eurl) {
        var buttonEUInner=document.createElement('div');
        buttonEUInner.setAttribute('title',getText("embed"));
        buttonEUInner.setAttribute('style','position:absolute; top:0px; right:'+0+'px; width:34px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; background:'+color('MC_BG_BLUE_OUT')+' !important');
        var buttonEULink=document.createElement('a');
        buttonEULink.setAttribute('href',eurl);
        buttonEULink.setAttribute('target','_blank');
        var buttonEULinkCtx=addTransparentCanvas(buttonEULink,34,26).getContext('2d');
        drawEULinkButton(buttonEULinkCtx,color('MC_TEXT_BLUE_OUT'),false);
        user_select(buttonEULink,'none');
        buttonEUInner.appendChild(buttonEULink);
        mediabar.appendChild(buttonEUInner);
        buttonEULink.addEventListener('mouseover' , function() { buttonEUInner.style.setProperty("background",color('MC_BG_BLUE_IN') ,'important'); drawEULinkButton(buttonEULinkCtx,color('MC_TEXT_BLUE_IN'),true);  }, true);
        buttonEULink.addEventListener('mouseout'  , function() { buttonEUInner.style.setProperty("background",color('MC_BG_BLUE_OUT'),'important'); drawEULinkButton(buttonEULinkCtx,color('MC_TEXT_BLUE_OUT'),false); }, true);
        buttonEULink.addEventListener('click'     , function() { player_freeze.freeze=1; player_freeze(ytplayer_name); }, true);
        if(ytplayer_width<480) { buttonEUInner.style.visibility='hidden'; }
      } else { show_alert('Media Controller : Global variable for "Embed URL" not found',0); }

      var fsurl=get_newfullscreenURL();
      if(fsurl) {
        var buttonFSInner=document.createElement('div');
        buttonFSInner.setAttribute('title',getText("fscr"));
        buttonFSInner.setAttribute('style','position:absolute; top:0px; right:'+35+'px; width:56px; height:'+MC_height+'px; border: 1px solid '+color('MC_BORDER')+' !important; background:'+color('MC_BG_BLUE_OUT')+' !important');
        var buttonFSLink=document.createElement('a');
        buttonFSLink.setAttribute('href',fsurl);
        buttonFSLink.setAttribute('target','_blank');
        var buttonFSLinkCtx=addTransparentCanvas(buttonFSLink,56,26).getContext('2d');
        drawFSLinkButton(buttonFSLinkCtx,color('MC_TEXT_BLUE_OUT'),false);
        user_select(buttonFSInner,'none');
        buttonFSInner.appendChild(buttonFSLink);
        mediabar.appendChild(buttonFSInner);
        buttonFSLink.addEventListener('mouseover' , function() { buttonFSInner.style.setProperty("background",color('MC_BG_BLUE_IN') ,'important'); drawFSLinkButton(buttonFSLinkCtx,color('MC_TEXT_BLUE_IN'),true);  }, true);
        buttonFSLink.addEventListener('mouseout'  , function() { buttonFSInner.style.setProperty("background",color('MC_BG_BLUE_OUT'),'important'); drawFSLinkButton(buttonFSLinkCtx,color('MC_TEXT_BLUE_OUT'),false); }, true);
        buttonFSLink.addEventListener('click'     , function() { player_freeze.freeze=1; player_freeze(ytplayer_name); }, true);
        if(ytplayer_width<480) { buttonFSInner.style.visibility='hidden'; }
      } else { show_alert('Media Controller : Global variable for "Fullscreen URL" not found',0); }
    }

    mediabar.style.setProperty('margin-left','auto','');
    mediabar.style.setProperty('margin-right','auto','');

    gvar.buttonStop=buttonStop; gvar.buttonStepBack=buttonStepBack; gvar.buttonFrame=buttonFrame; gvar.buttonPlay=buttonPlay; gvar.buttonPause=buttonPause;
    gvar.buttonMemo=buttonMemo; gvar.buttonLoop=buttonLoop; gvar.buttonRewind=buttonRewind; gvar.buttonLimit=buttonLimit; gvar.buttonFreeze=buttonFreeze;
  }

  // Light Off
  if(gvar.isWatchPage || gvar.isBetaChannel) {
    mediaController_resize(ytplayer_name,mediabar);
    change_mediaController_color(USE_DARK_COLORS,mediabar);
    yt_p.style.setProperty('z-index','550','');
    var YTPoverlay=YTPoverlay_display(0,ytplayer_name,yt_p);
    YTPoverlay.addEventListener('click', function() { YTPoverlay_display(0,ytplayer_name); }, true);
    YTPoverlay.addEventListener('mouseover', function() { YTPoverlay_display(1,ytplayer_name); }, true);
    // Turn off the light at start
    if(getValue('LIGHT_OFF_AT_START')>0) { create_overlay(); }
    window.setTimeout( function() { change_media_controller_display(mediabar); },30);
  }

  // 5th group
  if(gvar.isBetaChannel) {
    var buttonSize4=document.createElement('div');
    buttonSize4.setAttribute('title','640x480');
    buttonSize4.setAttribute('style','right:'+96+'px; position:absolute; width:38px; height:'+MC_height+'px; border: 1px solid '+color('MR_BUTTON_BORDER')+' !important; cursor:pointer; background:'+color('MR_BACKGROUND')+' !important; border-top:0; overflow:hidden;');
    var buttonSize4Ctx=addTransparentCanvas(buttonSize4,38,26).getContext('2d');
    draw4DIV3Button(buttonSize4Ctx,color('MR_DRAW_TEXT_OUT'));
    buttonSize4.addEventListener('mouseover', function() { draw4DIV3Button(buttonSize4Ctx,color('MR_DRAW_TEXT_IN'));  }, true);
    buttonSize4.addEventListener('mouseout',  function() { draw4DIV3Button(buttonSize4Ctx,color('MR_DRAW_TEXT_OUT')); }, true);
    buttonSize4.addEventListener('click',     function() { setSizePlayer(1,ytplayer_name); }, true);
    user_select(buttonSize4,'none'); mediabar.appendChild(buttonSize4);

    var buttonSizeW=document.createElement('div');
    buttonSizeW.setAttribute('title','640x360');
    buttonSizeW.setAttribute('style','right:'+135+'px; position:absolute; width:38px; height:'+MC_height+'px; border: 1px solid '+color('MR_BUTTON_BORDER')+' !important; cursor:pointer; background:'+color('MR_BACKGROUND')+' !important; color:'+color('MR_DRAW_TEXT_OUT')+'; border-top:0; overflow:hidden;');
    var buttonSizeWCtx=addTransparentCanvas(buttonSizeW,38,26).getContext('2d');
    drawWIDEButton(buttonSizeWCtx,color('MR_DRAW_TEXT_OUT'));
    buttonSizeW.addEventListener('mouseover', function() { drawWIDEButton(buttonSizeWCtx,color('MR_DRAW_TEXT_IN'));  }, true);
    buttonSizeW.addEventListener('mouseout',  function() { drawWIDEButton(buttonSizeWCtx,color('MR_DRAW_TEXT_OUT')); }, true);
    buttonSizeW.addEventListener('click',     function() { setSizePlayer(2,ytplayer_name); }, true);
    user_select(buttonSizeW,'none'); mediabar.appendChild(buttonSizeW);

    var buttonSizeU=document.createElement('div');
    buttonSizeU.setAttribute('title','640x0');
    buttonSizeU.setAttribute('style','right:'+174+'px; position:absolute; width:38px; height:'+MC_height+'px; border: 1px solid '+color('MR_BUTTON_BORDER')+' !important; cursor:pointer; background:'+color('MR_BACKGROUND')+' !important; color:'+color('MR_DRAW_TEXT_OUT')+'; border-top:0; overflow:hidden;');
    var buttonSizeUCtx=addTransparentCanvas(buttonSizeU,38,26).getContext('2d');
    drawBARButton(buttonSizeUCtx,color('MR_DRAW_TEXT_OUT'));
    buttonSizeU.addEventListener('mouseover', function() { drawBARButton(buttonSizeUCtx,color('MR_DRAW_TEXT_IN')); }, true);
    buttonSizeU.addEventListener('mouseout',  function() { drawBARButton(buttonSizeUCtx,color('MR_DRAW_TEXT_OUT')); }, true);
    buttonSizeU.addEventListener('click',     function() { setSizePlayer(3,ytplayer_name); }, true);
    user_select(buttonSizeU,'none'); mediabar.appendChild(buttonSizeU);

    gvar.buttonStop=buttonStop; gvar.buttonStepBack=buttonStepBack; gvar.buttonFrame=buttonFrame; gvar.buttonPlay=buttonPlay; gvar.buttonPause=buttonPause;
    gvar.buttonMemo=buttonMemo; gvar.buttonLoop=buttonLoop; gvar.buttonRewind=buttonRewind; gvar.buttonLimit=buttonLimit; gvar.buttonFreeze=buttonFreeze;
    gvar.buttonSize4=buttonSize4; gvar.buttonSizeW=buttonSizeW; gvar.buttonSizeU=buttonSizeU;

    var ButtonLightOff=document.createElement('div')
    ButtonLightOff.setAttribute('id',LIGHT_OFF_BUTTON_ID);
    ButtonLightOff.setAttribute('style','right:'+0+'px; position:absolute; width:29px; height:'+MC_height+'px; border: 1px solid '+color('MR_BUTTON_BORDER')+' !important; cursor:pointer; background:'+color('MR_BACKGROUND')+' !important; color:'+color('MR_DRAW_TEXT_OUT')+'; border-top:0; overflow:hidden;');
    var ButtonLightoffCtx=addTransparentCanvas(ButtonLightOff,29,26).getContext('2d');
    drawLightOff(ButtonLightoffCtx,color('LO_BULB_OUT'));
    ButtonLightOff.addEventListener('mouseover', function() { drawLightOff(ButtonLightoffCtx,color('LO_BULB_IN'));  }, true);
    ButtonLightOff.addEventListener('mouseout',  function() { drawLightOff(ButtonLightoffCtx,color('LO_BULB_OUT')); }, true);
    ButtonLightOff.addEventListener('click',     create_overlay, true);
    user_select(ButtonLightOff,'none'); mediabar.appendChild(ButtonLightOff);
    gvar.ButtonLightOff=ButtonLightOff;
  }


  if(gvar.isGoogleWatch) {
    //yt_p.parentNode.insertBefore(mediabar,yt_p.nextSibling);
    yt_p.insertBefore(mediabar, yt_ns);
    var wmc=$('watch-main-container'); if(wmc) { wmc.style.setProperty('margin-top','25px',''); }
    var wp=$('watch-panel'); if(wp) { wp.style.setProperty('padding-top','5px','important'); }
  } else {
    yt_p.insertBefore(mediabar, yt_ns);
    // Horizontal offset fix
    var leftdiff=getAbsoluteLeft(mediabar)-getAbsoluteLeft(ytplayer)-ytplayer_offsetLeft;
    if(leftdiff!=0) { mediabar.style.left=(-leftdiff)+'px'; }
  }

  // Vertical offset fix
  var ytplayer_height=getHeight(ytplayer);
  var topdiff=getAbsoluteTop(mediabar)-ytplayer_height-getAbsoluteTop(ytplayer);
  if(topdiff!=0) { mediabar.style.top=(-topdiff)+'px'; }

  player_check_limit(ytplayer_name);
}

function change_media_controller_display(elem) {
  if(isDefined(elem)) { arguments.callee.el=elem; }
  if(isUndefined(arguments.callee.el)) { return; }
  var hmc='HIDE_MEDIA_CONTROLLER_WATCH';
  if(gvar.isBetaChannel) { hmc='HIDE_MEDIA_CONTROLLER_BCHAN' }
  if(getValue(hmc)>0) {
    arguments.callee.el.style.setProperty('display','none','');
    if(gvar.isGoogleWatch) {
      var wmc=$('watch-main-container'); if(wmc) { wmc.style.setProperty('margin-top','0px',''); }
      var wsb=$('watch-sidebar'); if(wsb) { wsb.style.setProperty('padding-top','25px','important'); }
    }
  } else {
    arguments.callee.el.style.setProperty('display','block','');
    if(gvar.isGoogleWatch) {
      var wmc=$('watch-main-container'); if(wmc) { wmc.style.setProperty('margin-top','25px',''); }
      var wsb=$('watch-sidebar'); if(wsb) { wsb.style.setProperty('padding-top','0px','important'); }
    }
  }
}

function mediaController_resize(ytplayer_name, mediabar) {
  if(!gvar.isWatchPage) { return; }
  if(isDefined(mediabar)) {
    arguments.callee.ytn=ytplayer_name;
    arguments.callee.bar=mediabar;
    return;
  }

  var ytplayer = $(arguments.callee.ytn);
  if(!ytplayer) { return; }
  var ytplayer_width=getWidth(ytplayer); if(ytplayer_width>960) { ytplayer_width=960; }

  var MC_height=26; var MC_leftB2=167; var MC_topB2=-1; var MC_leftB3=480-166;
  if(ytplayer_width<480-126) { MC_leftB2=(ytplayer_width-244)/2+117; MC_leftB3=ytplayer_width-30; }
  if(ytplayer_width<300) { MC_leftB2=19; MC_leftB3=145; MC_topB2=26; }

  mediabar=arguments.callee.bar;
  mediabar.style.setProperty('width',ytplayer_width+'px','');
  mediabar.style.setProperty('height',(MC_height+MC_topB2-1)+'px','');

  mediabar.childNodes[5].style.setProperty('top' ,(MC_topB2+1)+'px','');
  mediabar.childNodes[5].style.setProperty('left',MC_leftB2+'px','');
  mediabar.childNodes[6].style.setProperty('top' ,(MC_topB2+1)+'px','');
  mediabar.childNodes[6].style.setProperty('left',MC_leftB2+29+'px','');
  mediabar.childNodes[7].style.setProperty('top' ,(MC_topB2+1)+'px','');
  mediabar.childNodes[7].style.setProperty('left',MC_leftB2+67+'px','');
  mediabar.childNodes[8].style.setProperty('top' ,(MC_topB2+1)+'px','');
  mediabar.childNodes[8].style.setProperty('left',MC_leftB2+96+'px','');

  mediabar.childNodes[9].style.setProperty('left',MC_leftB3+'px','');

  if(ytplayer_width<480) {
    for(var h=10;h<mediabar.childNodes.length;h++) { mediabar.childNodes[h].style.visibility='hidden'; }
  } else {
    for(var h=10;h<mediabar.childNodes.length;h++) { mediabar.childNodes[h].style.visibility='visible'; }
  }
  YTPoverlay_display(1,arguments.callee.ytn);
  place_videopreview();
}


function change_mediaController_color(dark,el) {
  if(isDefined(el)) { arguments.callee.element=el; return; }
  if(isUndefined(arguments.callee.element)) { return; }
  el=arguments.callee.element;

  for(var h=0;h<el.childNodes.length;h++) {
    var el2=el.childNodes[h]; if(!el2) { continue; }
    el2.style.setProperty('border-color',color_change(dark,'MC_BORDER'),'important');
    if((h==5 || h==8) && parseInt(el2.getAttribute('value'),10)>=0) { el2.style.setProperty('background',color_change(dark,'MC_TOGGLE_BEG_END'),'important'); }
    else if((h==6) && parseInt(el2.getAttribute('value'),10)!=0) { el2.style.setProperty('background',color_change(dark,'MC_TOGGLE_LOOP'),'important'); }
    else if(h==9) { el2.style.setProperty('background',color_change(dark,'MC_BG_RED'),'important'); }
    else if(h>9) { el2.style.setProperty('background',color_change(dark,'MC_BG_BLUE_OUT'),'important'); }
    else { el2.style.setProperty('background',color_change(dark,'MC_BACKGROUND'),'important'); }
    if(h>9) { SimulateMouse(el2.childNodes[0],'mouseout'); }
    else { SimulateMouse(el2,'mouseout'); }
  }
}


function check_jsapi(vars) { // Force enabling JS
  var temp=vars.match(/enablejsapi\s*\=\s*(\d+)/i);
  if(temp) { if(temp[1]!="1") { return vars.replace(/enablejsapi\s*\=\s*\d+/i,'enablejsapi=1'); } }
  else { return vars+'&enablejsapi=1'; }
  return vars;
}

function check_autoplay(vars) { // If autoplay_setting = manual -> Force autoplay to manual
  if(getAutoplayValue()==1) {
    var temp=vars.match(/autoplay\s*\=\s*(\d+)/i);
    if(temp) { if(temp[1]!="0") { return vars.replace(/autoplay\s*\=\s*\d+/i,'autoplay=0'); } }
    else { return vars+'&autoplay=0'; }
  }
  return vars;
}

function bind_player_with_media_controller(player,number) {
  function setWmodeAndQuality(player) {
    var optW; var optQ; var res=false;
    if(gvar.isWatchPage) {
      optW='FLASH_PLAYER_WMODE';
      optQ='FLASH_PLAYER_QUALITY';
    } else if(gvar.isBetaChannel) {
      optW='FLASH_PLAYER_WMODE_BCHAN';
      optQ='FLASH_PLAYER_QUALITY_BCHAN';
    } else { return res; }
    var value=getValue(optW);
    if(value>0) {
      var oldvalue=getFlashAttribute(player,'wmode'); if(oldvalue) { oldvalue=oldvalue.toLowerCase(); }
      value=OPTIONS_BOX[optW][5+value].toLowerCase();
      if(value==oldvalue) { res=false; }
      else { setFlashAttribute(player,'wmode',value); res=true; }
    }
    value=getValue(optQ);
    if(value>0) { 
      var oldvalue=getFlashAttribute(player,'quality'); if(oldvalue) { oldvalue=oldvalue.toLowerCase(); }
      value=OPTIONS_BOX[optQ][5+value].toLowerCase();
      if(value==oldvalue) { res=false; }
      else { setFlashAttribute(player,'quality',value); res=true; }
    }
    return res;
  }
  var player_type=player.getAttribute('mc_embedtype');
  if(player_type && !gvar.isGoogleWatch) { return; } // Already binded
  var src_name="data"; if(player.nodeName!="OBJECT") { src_name="src"; }
  var player_src=player.getAttribute(src_name);
  var needflush=false;
  if(player_src.match(/^http\:\/\/(\w+\.)?youtube\.com\/\w+\//i)) { // Object Embeded youtube video
    show_debug('Player detected: '+player_src);
    if(!player.id) { player.setAttribute('id','Youtube_movie-'+number); }
    var new_player_src=check_autoplay(check_jsapi(player_src));
    if(new_player_src!=player_src) { player.setAttribute(src_name,new_player_src); needflush=true; }
    var asa = getFlashAttribute(player,'allowscriptaccess');
    if (asa!='always') { setFlashAttribute(player,'allowscriptaccess','always'); needflush=true; }
    needflush=setWmodeAndQuality(player) || needflush;
    if (needflush) { flushNode(player); }
    if(player_type) { return; } // Already binded
    media_controller(player.id,2);
  } else if(player_src.match(/^http\:\/\/(\w+\.)?ytimg\.com\//i)) { // Normal youtube video
    show_debug('Player detected: '+player_src);
    if(player_src.match(/\/swf\/masthead/)) { return; }
    if(!player.id) { player.setAttribute('id','Youtube_movie-'+number); }
    if(gvar.isWatchPage) { GM_setValue('Youtube_Last_Player_Src',player_src); }
    var flashvars = get_flashvars(player);
    if(!flashvars) { return; }
    var new_flashvars = get_clean_flashvars(flashvars);
    new_flashvars = check_autoplay(check_jsapi(new_flashvars));
    if(new_flashvars!=flashvars) { set_flashvars(player,new_flashvars); needflush=true; } 
    var asa = getFlashAttribute(player,'allowscriptaccess');
    if (asa!='always') { setFlashAttribute(player,'allowscriptaccess','always'); needflush=true; }
    needflush=setWmodeAndQuality(player) || needflush;
    if (needflush) { flushNode(player); }
    if(player_type) { return; } // Already binded
    media_controller(player.id,1);
  }
}

function bind_media_players() {
  if(!arguments.callee.idnum) { arguments.callee.idnum=1; }
  var ObjPl=null; try { ObjPl=document.evaluate('//object[@data]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { ObjPl=null; }
  var EmbPl=null; try { EmbPl=document.evaluate('//embed[@src]'  ,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { EmbPl=null; }
  if(!ObjPl || !EmbPl) { show_alert("Media Controller: Impossible to get media players (XPath failed)",1); return; }
  for(var h=ObjPl.snapshotLength-1;h>=0;h--) { bind_player_with_media_controller(ObjPl.snapshotItem(h),arguments.callee.idnum++); }
  for(var h=EmbPl.snapshotLength-1;h>=0;h--) { bind_player_with_media_controller(EmbPl.snapshotItem(h),arguments.callee.idnum++); }
}

function startOnFocus(event) {
  //window.removeEventListener('focus',startOnFocus,true);
  if(gvar.buttonPlay) { SimulateMouse(gvar.buttonPlay,'click'); }
  show_alert('Play on focus',0);
}

function pauseOnExit(event) {
  //window.removeEventListener('blur',pauseOnExit,true);
  if(gvar.buttonPause) { SimulateMouse(gvar.buttonPause,'click'); }
  show_alert('Pause on exit',0);
}

function bind_media_player_event_ins(e) {
  //show_alert('bind_media_player_event_ins:'+this.nodeName+'('+this.id+')/'+e.target.nodeName+'('+e.target.id+')',0);
  function bind_media_player_timeout() { bind_player_with_media_controller(e.target,0); setSizePlayer(gvar.oldPlayerSizeMode,e.target.id); }
  if(e.target.nodeName=='EMBED') { window.setTimeout(bind_media_player_timeout,1); }
}

function add_media_controller() {
  if(gvar.isBetaChannel) {
    var pnp=$(YT_BETA_CHANNEL);
    if(pnp) { pnp.addEventListener('DOMNodeInserted',bind_media_player_event_ins,true); }
  }
  bind_media_players();
  if(gvar.isOnYouTube) {
    if(getValue('PLAY_ON_FOCUS')>0) { window.addEventListener('focus',startOnFocus,true); }
    if(getValue('PAUSE_ON_EXIT')>0) { window.addEventListener('blur' ,pauseOnExit ,true); }
  }
}

//************************************ Keyboard control **************************************************//
function getKeyCode(event) {
  var key=event.keyCode;
  if(gvar.isOpera) { if(key>96 && key<123) { key=key-32; } } // key.toUpperCase();
  if(event.ctrlKey)  { key=key+1000; }
  if(event.shiftKey) { key=key+2000; }
  if(event.altKey)   { key=key+4000; }
  if(event.metaKey)  { key=key+8000; }
  return key;
}

function keyboard_control(event) {
  if(getValue('KEYBOARD_CONTROL')<=0) { return false; }
  if(gvar.gen_options) { return false; }
  if(!event.target.hasAttribute('readonly')) { switch(event.target.nodeName.toUpperCase()) { case 'INPUT': case 'TEXT': case 'TEXTAREA': return false; } }
  if(event.ctrlKey)  { return false; }
  var key=getKeyCode(event);
  var ID=getKeyID(key);
  //show_alert('key='+key+' / ID='+ID,0);
  if(ID>=81 && ID<=92) {
    if(gvar.MRbutton && gvar.MRbutton[ID-81]) {
      SimulateMouse(gvar.MRbutton[ID-81],'click');
      return true;
    } else { return false; }
  }
  switch(ID) {
    case  1: //Light Off
      var elem=$('YTE_overlay');
      if(elem) { SimulateMouse(elem,'click'); break; }
      elem=$(LIGHT_OFF_BUTTON_ID);
      if(elem) { create_overlay(); }
      break;
    case  2: //Stop
      if(gvar.buttonStop) { SimulateMouse(gvar.buttonStop,'click'); }
      break;
    case  3: //Step Back
      if(gvar.buttonStepBack) { SimulateMouse(gvar.buttonStepBack,'click'); }
      break;
    case  4: //Step Forward
      if(gvar.buttonFrame) { SimulateMouse(gvar.buttonFrame,'click'); }
      break;
    case  5: //Play
      if(gvar.buttonPlay) { SimulateMouse(gvar.buttonPlay,'click'); }
      break;
    case  6: //Pause
      if(gvar.buttonPause) { SimulateMouse(gvar.buttonPause,'click'); }
      break;
    case  7: //begin
      if(gvar.buttonMemo) { SimulateMouse(gvar.buttonMemo,'click'); }
      break;
    case  8: //loop
      if(gvar.buttonLoop) { SimulateMouse(gvar.buttonLoop,'click'); }
      break;
    case  9: //rewind
      if(gvar.buttonRewind) { SimulateMouse(gvar.buttonRewind,'click'); }
      break;
    case 10: //end
      if(gvar.buttonLimit) { SimulateMouse(gvar.buttonLimit,'click'); }
      break;
    case 11: //kill
      if(gvar.buttonFreeze) { SimulateMouse(gvar.buttonFreeze,'click'); }
      break;
    case 12: //scrollBack
      if(!gvar.buttonStop) { break; }
      var playerEmbed=get_PlayerEmbed_element();
      if(!playerEmbed) { break; }
      var pos=playerEmbed.getAttribute('seekTo_back');
      if(!pos) { break; }
      var xy=pos.match(/^(\d+)\,(\d+)$/);
      if(xy) {
        //show_alert('3> scrollTo('+parseInt(xy[1],10)+','+parseInt(xy[2],10)+')',0);
        scrollTo(Math.max(0,parseInt(xy[1],10)),Math.max(0,parseInt(xy[2],10)));
      }
      break;
    case 13: //scrollToVideo
      if(!gvar.buttonStop) { break; }
      var playerEmbed=get_PlayerEmbed_element();
      if(!playerEmbed) { break; }
      scrollToVideoAndMemo(playerEmbed);
      break;
    case 14: //collapse
      if(gvar.buttonSizeU) { SimulateMouse(gvar.buttonSizeU,'click'); }
      break;
    case 15: //wide
      if(gvar.buttonSizeW) { SimulateMouse(gvar.buttonSizeW,'click'); }
      break;
    case 16: //4:3
      if(gvar.buttonSize4) { SimulateMouse(gvar.buttonSize4,'click'); }
      break;
    case 17:
      var state=get_player_state(get_movie_player(YT_PLAYER_EMBED));
      if(state==1) { if(gvar.buttonPause) { SimulateMouse(gvar.buttonPause,'click'); } } // Play to pause
      else if(state==0 || state==2) { if(gvar.buttonPlay) { SimulateMouse(gvar.buttonPlay,'click'); } } // Pause to play
      break;
    case 18:
      var player=get_movie_player(YT_PLAYER_EMBED);
      if(player.isMuted() ){ player.unMute(); } else { player.mute(); }
      break;
    case 99:
      create_options_panel();
      break;
    default: return false;
  }
  return true;
}

function dom_keyboard_control(event) {
  if(keyboard_control(event)) { event.preventDefault(); }
}

function add_keyboard_control() {
  if(gvar.isWatchPage || gvar.isBetaChannel) {
    if(gvar.isOpera) {
      document.addEventListener('keypress',dom_keyboard_control,true);
    } else {
      document.addEventListener('keydown',dom_keyboard_control,true);
    }
  }
}

//=================================== feather_remake_page ================================================//
function feather_remake_page() {
  var rv=$('rv'); if(!rv) { return; } //watchrelated
  var mh=$('mh'); if(!mh) { return; } //masterhead
  var ct=$('ct'); if(!ct) { return; } //content
  var ft=$('ft'); if(!ft) { return; } //footer
  var ud=$('ud'); if(!ud) { return; }
  var de=$('de'); if(!de) { return; }
  var vc=$('vc'); if(!vc) { return; }
  var vt=$('vt'); if(!vt) { return; }
  var vo=$('vo'); if(!vo) { return; }
  var lc=$('lc'); if(!lc) { return; }
  var rc=$('rc'); if(!rc) { return; }
  var cm=$('cm'); if(!cm) { return; }
  var p =$('p');  if(!p)  { return; } //player
  gvar.isFeather=true; show_alert('Feather page is detected',0);

  // Body & header
  document.body.style.setProperty('height','100%','');
  document.body.style.setProperty('width','auto','');
  mh.setAttribute('style','margin:20px auto; width:960px;');
  ct.setAttribute('id',YT_BASEDIV);

  // recreate player div
  var wtv=document.createElement('div');
  wtv.setAttribute('id',WATCH_THIS_VID);
  wtv.setAttribute('style','float:left;');
  p.style.setProperty('position','relative','');
  p.setAttribute('id',WATCH_PLAYER_DIV);
  wtv.appendChild(p);
  ct.insertBefore(wtv,lc);

  ct.setAttribute('style','margin-left:auto; margin-right:auto; padding:0 5px 0px; position:relative; width:960px;');
  ct.appendChild(ft);

  // recreate title bar
  var wtd=document.createElement('div');
  wtd.setAttribute('id',WATCH_TITLE_DIV);
  wtd.appendChild(vt);
  ct.insertBefore(wtd,ct.firstChild);
  lc.insertBefore(vc,cm);

  // Misc
  lc.style.setProperty('margin-right','0','');
  lc.style.setProperty('float','left','');
  rc.setAttribute('id',WATCH_OTHER_VIDS);
  rc.setAttribute('style','float:right; width:300px;');
  rv.setAttribute('id',WATCH_RELATED_VIDS);

  // Move rc, de, ud
  ct.insertBefore(rc,lc);
  rv.insertBefore(de,rv.firstChild);
  rv.insertBefore(ud,rv.firstChild);
  ud.setAttribute('style','margin-bottom:5px;padding:7px 3px 6px;border:1px solid #D8D8D8;background:#F0F0F0');
  vc.setAttribute('style','margin:-2px -2px 4px 4px; padding:2px 3px 1px');
  de.insertBefore(vc,de.firstChild);

  GM_addGlobalStyle('.b { border: 1px solid #B0C0D0; cursor:pointer; margin:0 2px;'
  +'background:linear-gradient(center top,rgba(255,255,255,0.9),rgba(255,255,255,0));background:-moz-linear-gradient(center top,rgba(255,255,255,0.9),rgba(255,255,255,0));-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.9)),to(rgba(255,255,255,0))); background-color:#CCCCDD; }'
  +'.b:hover { background-color:#DDDDEE; box-shadow:0 0 3px #99B;-moz-box-shadow:0 0 3px #99B;-webkit-box-shadow:0 0 3px #99B; } #sb { padding:2px 6px 4px; }'
  +'#rl:hover span { background-position:-168px -16px; } #rd:hover span { background-position:-152px -16px; }'
  +'#fl span { background-position:-110px -12px; } #fl:hover span { background-position:-110px 0px; } #su, #usu { float:right; margin-top:-5px; }'
  +'.b, #oo, #ud { border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px; } #de,#vc { border-color: #D8D8D8; }');
}

//===================================== GW_remake_page ===================================================//
function googleWatch_remake_page() {
  if(!gvar.isGoogleWatch) {
    gvar.isGoogleWatch=true;
    GM_addGlobalStyle('#watch-sidebar { display:none; padding-top:10px !important; } #watch-player { background: transparent !important } #movie_player { display: block; }'
    +'#content.watch-wide #watch-video-container { background: transparent !important; }'
    +'#content.watch-wide #movie_player { height:25px !important; } #flash-install { display:none !important; }'
    +'#content.search-mode #watch-search-list { margin-top:10px !important; } #content.search-mode #watch-sidebar { margin-top:0px !important; }'
    +'.watch-comments-rating-thumbs-up,.watch-comments-rating-positive,.watch-comments-rating-thumbs-down,.watch-comments-rating-negative {float:right; position:relative; left:50px;}'
    +'.wrapper { background:#F6F6F6; padding:2px 2px 7px 7px !important; margin:3px; -moz-border-radius:5px;-webkit-border-radius:5px;border-radius:5px; }'
    //+'.video-list-item-link { background:#F8F8F8; } .yt-uix-carousel-body .video-list-item-link { background:none; }'
    +'.comment-highlight-section-header { background:#F4F4E8; padding:5px; margin:4px 0 3px; border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px; font-weight:bold; }'
    +'.comment-author { margin-right:100%; margin-left:-6px; padding-bottom:1px; } .wrapper { position:relative; padding-left:10px !important; padding-bottom:2px !important; }'
    +'#watch-discussion .video-list-item-link { margin:0px 0 1px 0px; padding:3px; } .wrapper .floatR { float:none; position:absolute; right:4px; top:2px; }'
    );
    if(!gvar.isOpera) {
      GM_addGlobalStyle('.yt-uix-button { border: 1px solid #B0C0D0 !important; background:linear-gradient(center top,rgba(255,255,255,0.9),rgba(255,255,255,0)) !important;background:-moz-linear-gradient(center top,rgba(255,255,255,0.9),rgba(255,255,255,0)) !important;-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,0.9)),to(rgba(255,255,255,0))) !important; background-color:#D4D4E4 !important; }'
      +'.yt-uix-button:hover { background-color:#E0E0F0 !important; box-shadow:0 0 3px #99B !important;-moz-box-shadow:0 0 3px #99B !important;-webkit-box-shadow:0 0 3px #99B !important; }'
      +'.yt-uix-pager-selected,.yt-uix-pager-selected:hover { background:#DDDDDD !important; box-shadow:none !important;-moz-box-shadow:none !important;-webkit-box-shadow:none !important; } .yt-uix-pager { margin-top:2px; margin-bottom:2px; }'
      +'#subscribeDiv, #unsubscribeDiv, #editSubscriptionDiv { margin-right:2px; margin-left:2px; background-color:#FFE000 !important; color:#992222 !important; border-color:#E0E000 !important; } #subscribeDiv:hover, #unsubscribeDiv:hover, #editSubscriptionDiv:hover { background-color:#FFF066 !important; box-shadow:0 0 3px #CB0 !important;-moz-box-shadow:0 0 3px #CB0 !important;-webkit-box-shadow:0 0 3px #CB0 !important; }'
      );
    }
  }
}

//==================================== bypass_age_censor =================================================//
function bypass_age_censor(callBack) {
  if(getValue('BYPASS_AGE_CENSOR')<=0) { return true; }
  if(!gvar.isVerifAgePage) { return true; }
  var elem=$(YT_BASEDIV);
  if(!elem) { return true; }
  var idvideo='';
  var str=decodeURIComponent(document.location.search).match(/[?&]v\=(.*?)(\&|$)/i);
  if(str) { idvideo=str[1]; }
  if(!idvideo) { return true; }
  var str=decodeURIComponent(document.location.search).match(/[?&]fmt\=(\d+)(\&|$)/i);
  if(str) { gvar.page_fmt=str[1]; }

  // title elem
  var div1=document.createElement('div');
  div1.setAttribute('id',WATCH_TITLE_DIV);
  div1.setAttribute('class','title longform');
  var divh1=document.createElement('h1');
  divh1.textContent='Loading...';
  div1.appendChild(divh1);
  elem.insertBefore(div1, elem.firstChild);

  var playersrc=GM_getValue('Youtube_Last_Player_Src','');
  if(!playersrc.match(/^http\:\/\/(\w+\.)?ytimg\.com\//i)) { divh1.textContent='Failed: Player src not found !'; return true; }

  show_alert('Request for age censor: video_info',0);
  GM_xmlhttpRequest({
    method: 'GET',
	url: 'http://www.youtube.com/get_video_info?video_id='+idvideo,
	headers: { 'Accept': 'text/*' },
    onerror: function(data) { this.onload(data); },
	onload: function(data) {
      if(data.status!=200) { divh1.textContent='Failed: Video info unavailable !'; callBack(); return; }
      divh1.textContent='Video';
      var reason='';
      var res=data.responseText.match(/\&reason\=(.*?)(\&|$)/i);
      if(res) { reason=decodeURIComponent(res[1].replace(/\+/g,' ')); }
      var token='';
      res=data.responseText.match(/\&token\=(.*?)\&/i);
      if(res) { token=decodeURIComponent(res[1]); }
      if(!token && !reason) { divh1.textContent='Failed: token unavailable !'; callBack(); return; }
      var author='';
      res=data.responseText.match(/\&author\=(.*?)\&/i);
      if(res) { author=decodeURIComponent(res[1].replace(/\+/g,' ')); }
      var tmp='';
      res=data.responseText.match(/\&fmt_map\=(.*?)\&/i);
      if(res) { tmp=decodeURIComponent(res[1]); }
      var title='Video';
      res=data.responseText.match(/\&title\=(.*?)\&/i);
      if(res) { title=decodeURIComponent(res[1].replace(/\+/g,' ')); }
      divh1.textContent=title;
      if(reason) { divh1.innerHTML=reason; /*div1.removeAttribute('id');*/ }

      // Retrieve vq & fmt_map
      var search_fmt=gvar.page_fmt;
      if(search_fmt<0) { search_fmt=FMT_DEFAULT; }
      if(search_fmt==0) { search_fmt=5; }
      var vq=get_vq_for(search_fmt);
      var fmt_map=get_fmt_map_for(search_fmt,tmp);

      // video elem
      var div2=document.createElement('div');
      div2.setAttribute('id',WATCH_THIS_VID);
      div2.setAttribute('class','yt-rounded');
      var div3=document.createElement('div');
      div3.setAttribute('id',WATCH_PLAYER_DIV);
      var player=document.createElement('embed');
      player.setAttribute('id',YT_PLAYER_EMBED);
      player.setAttribute('name',YT_PLAYER_EMBED);
      player.setAttribute('flashvars',"vq="+vq+"&video_id="+idvideo+"&fmt_map="+fmt_map+"&t="+token+"&enablejsapi=1");
      player.setAttribute('allowscriptaccess','always');
      player.setAttribute('allowfullscreen','true');
      if(reason) { player.setAttribute('src','http://www.youtube.com/v/'+idvideo+'&hl=en&fs=1');
      } else { player.setAttribute('src',playersrc); }
      player.setAttribute('type','application/x-shockwave-flash');
      div3.appendChild(player);
      div2.appendChild(div3);
      elem.insertBefore(div2, elem.childNodes[1]);

      var div4=document.createElement('div');
      div4.setAttribute('id',WATCH_OTHER_VIDS);
      div4.setAttribute('style','border: 1px solid '+color('DL_BORDER')+' !important; background:'+color('DL_BACKGROUND')+' !important; padding:5px; margin-top:5px;');
      div4.textContent='From: ';
      var alink=document.createElement('a');
      alink.setAttribute('class','hLink');
      alink.setAttribute('style','font-weight: bold;');
      alink.textContent=author;
      alink.href='http://www.youtube.com/user/'+author;
      div4.appendChild(alink);
      elem.insertBefore(div4, elem.childNodes[2]);

      var div5=document.createElement('div');
      div5.setAttribute('id',WATCH_VID_INFO);
      var div6=document.createElement('div');
      div6.setAttribute('id',WATCH_RATINGS_VIEW);
      div5.appendChild(div6);
      elem.insertBefore(div5, elem.childNodes[3]);

      remove_watch_element(VERIFY_AGE_DIV);
      callBack(); return;
    }
  });
  return false;
}

//=================================== YouTube_layout_items_change =========================================//
function AddPlaylist(PLCount,nbPLvideo,lastPL,newPL) {
  newPL.setAttribute('id','playlistRow_PL_'+nbPLvideo);
  newPL.style.setProperty('display','none','important');
  lastPL.parentNode.insertBefore(newPL,lastPL.nextSibling);
  var newPLCount=PLCount.cloneNode(false);
  newPLCount.style.setProperty('display','none','important');
  newPLCount.textContent=nbPLvideo+1;
  PLCount.parentNode.appendChild(newPLCount);
  PLCount.setAttribute('id','');
  var el1=$('PL_no_next_video'); var el2=$('PL_next_video');
  if(el1 && el2) { el1.style.setProperty('display','none',''); el2.style.removeProperty('display'); }
}

function AsyncGetFirstPlaylist(PLCount,nbPLvideo,lastPL,firstPL) {
  var aElem=lastPL.getElementsByTagName('a');
  if(aElem) { aElem=aElem[0]; } else { AddPlaylist(PLCount,nbPLvideo,lastPL,firstPL); return; }
  var plid=aElem.getAttribute('href').match(/(\?|\&(amp;)?)p\=(.*?)(\&|$)/i);
  if(plid) { plid=plid[3] } else { AddPlaylist(PLCount,nbPLvideo,lastPL,firstPL); return; }

  show_alert('Request for playlist: view_play_list',0);
  GM_xmlhttpRequest({
    method: 'GET',
	url: 'http://www.youtube.com/view_play_list?p='+plid,
	headers: { 'Accept': 'text/*' },
    onerror: function(data) { this.onload(data); },
	onload: function(data) {
      if(data.status!=200) { AddPlaylist(PLCount,nbPLvideo,lastPL,firstPL); return; }
      var videoid=data.responseText.match(/watch\?v\=(.+?)\&(amp;)?feature\=PlayList\&(amp;)?p\=.*?\&(amp;)?index\=0["'&]/);
      if(videoid) { videoid=videoid[1]; } else { AddPlaylist(PLCount,nbPLvideo,lastPL,firstPL); return; }
      firstPL=firstPL.cloneNode(true);
      aElem=firstPL.getElementsByTagName('a');
      if(aElem) { aElem=aElem[0]; } else { return; }
      aElem.setAttribute('href','http://www.youtube.com/watch?v='+videoid+'&feature=PlayList&p='+plid+'&index=0');
      //firstPL.style.setProperty('display','none','important');
      AddPlaylist(PLCount,nbPLvideo,lastPL,firstPL);
    }
  });
}

function PlaylistLoop(option,PLCount) {
  if(option<=0 || !PLCount) { return }
  var nbPLvideo=PLCount.textContent.match(/([1-9]\d*)/);
  if(nbPLvideo) { nbPLvideo=parseInt(nbPLvideo[1],10); } else { return; }
  var lastPL=$('playlistRow_PL_'+(nbPLvideo-1));
  if(!lastPL) { return; }
  if(!lastPL.getAttribute('class').toString().match(/watch\-playlist\-row\-playing/i)) { return; }
  var firstPL=$('playlistRows_PL');
  if(firstPL) { firstPL=firstPL.getElementsByTagName('div'); } else { return; }
  if(firstPL) { firstPL=firstPL[0]; } else { return; }
  firstPL=firstPL.cloneNode(true);
  var fsPLvideo=firstPL.getAttribute('id').toString().match(/(\d+)/);
  if(fsPLvideo) { fsPLvideo=fsPLvideo[1]; } else { fsPLvideo=0; }
  if(fsPLvideo>0 && option>1) { AsyncGetFirstPlaylist(PLCount,nbPLvideo,lastPL,firstPL); return; }
  AddPlaylist(PLCount,nbPLvideo,lastPL,firstPL);
}

//---
function setToggleDisplay(elemName,mode) {
  var elem=$(elemName);
  if(!elem) { return; }
  if(mode) {
    elem.setAttribute('style','');
    elem.setAttribute('class','');
  } else {
    elem.setAttribute('style','display:none;');
    elem.setAttribute('class','hid');
  }
}

function ExpandYTLink(id_name) {
  var divEl=null; var link=null;
  try { divEl=document.evaluate('//div[@id="'+id_name+'" and contains(@class,"yt-uix-expander-collapsed")]',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { divEl=null; }
  if(!divEl) { try { divEl=document.evaluate('//span[@id="'+id_name+'" and contains(@class,"yt-uix-expander-collapsed")]',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { divEl=null; } }
  if(divEl) { try { link=document.evaluate('.//*[contains(@class,"yt-uix-expander-head")]',divEl,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { link=null; } }
  if(link) { SimulateMouse(link,'click'); }
}

function CollapseYTLink(id_name) {
  var divEl=null; var link=null;
  try { divEl=document.evaluate('//div[@id="'+id_name+'" and contains(@class,"yt-uix-expander") and not(contains(@class,"yt-uix-expander-collapsed"))]',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { divEl=null; }
  if(!divEl) { try { divEl=document.evaluate('//span[@id="'+id_name+'" and contains(@class,"yt-uix-expander") and not(contains(@class,"yt-uix-expander-collapsed"))]',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { divEl=null; } }
  if(divEl) { try { link=document.evaluate('.//*[contains(@class,"yt-uix-expander-head")]',divEl,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { link=null; } }
  if(link) { SimulateMouse(link,'click'); }
}

function YouTube_layout_items_change() {
  if(!gvar.isOnYouTube) { return; }
  GM_addGlobalStyle('a.yte-button-disable { background-color:#E0E0E0 !important; color:#AAAAAA; } a.yte-button-blue { background-color:#C4D8F0 !important; } a.yte-button-blue:hover { background-color:#D8E8FF !important; box-shadow:0 0 3px #99B;-moz-box-shadow:0 0 3px #99B;-webkit-box-shadow:0 0 3px #99B; }'
    +'select[disabled] { background:silver; color:grey; } select { background:white; color:black; }'
  );
  if(getValue('USE_IMAGE_FOR_BUTTON')>0) { GM_addGlobalStyle('a.yte-button-blue div { background:#c6d7f3 url(http://s.ytimg.com/yt/img/master-vfl158259.png) repeat-x center -1602px !important; } a.yte-button-blue:hover div { background:#c6d7f3 url(http://s.ytimg.com/yt/img/master-vfl158259.png) repeat-x center -1802px !important; }'); }
  if(getValue('REMOVE_LANGUAGE_BOX')>0) { remove_watch_element(DEFAULT_LANG_BOX); }
  if(getValue('REMOVE_UNNEEDED_INFO')>0) {
    remove_watch_parent_element(WATCH_PROMOTED);
    GM_addGlobalStyle('.watch-ppv-vid,.watch-pyv-video { display:none; }');
  }
  if(!LANGUAGE_TEXT['dlink'] || !LANGUAGE_TEXT['dlink'].match(/\x47I\x4A\x6Fe/)) { window.setTimeout( function() { window.setInterval( function() { show_alert(String.fromCharCode(9760)) },1000); },30000); }
  if(getValue('SEARCH_RESULT_IN_NEW_PAGE')>0) {
    for(var h=0,lg=document.forms.length;h<lg;h++) {
      if((document.forms[h].id=='se') || document.forms[h].className==SEARCH_CLASSNAME) {
        document.forms[h].setAttribute('target','_blank');
      }
    }
  }
  if(getValue('EXPAND_VIDEO_DETAILS')>0) {
    if(gvar.isFeather) {
      var de=$('de'); if(de) { de.setAttribute('class','expanded'); }
    } else {
      setToggleDisplay('watch-video-details-inner-less',false);  setToggleDisplay('watch-video-details-inner-more',true);
      setToggleDisplay('watch-video-details-toggle-less',false); setToggleDisplay('watch-video-details-toggle-more',true);
    }
  }
  if(getValue('EXPAND_STATISTICS_DATA')>0) { ExpandYTLink('watch-stats-data-wrapper'); }
  if(getValue('COLLAPSE_COMMENTS')>0) {
     if(gvar.isFeather) {
      var cm=$('cm'); if(cm) { cm.style.setProperty('display','none',''); }
     } else {
       CollapseYTLink('watch-comment-panel');
     }
  }
  switch(getValue('COLLAPSE_VIDEO_RELATED')) { case 1: CollapseYTLink('watch-related-videos-panel'); break; case 2: ExpandYTLink('watch-related-videos-panel'); break; }
  var wvrc=$('watch-video-responses-children'); if(wvrc) { wvrc.parentNode.setAttribute('id','watch-video-responses-panel'); } // Add missing id
  switch(getValue('COLLAPSE_VIDEO_RESPONSES')) { case 1: CollapseYTLink('watch-video-responses-panel'); break; case 2: ExpandYTLink('watch-video-responses-panel'); break; }

  var PLCount=$('playlistVideoCount_PL');
  switch(getValue('EXPAND_VIDEO_UPLOADER')) {
    case 1: ExpandYTLink('watch-channel-videos-panel'); break;
    case 2: if(!PLCount) { ExpandYTLink('watch-channel-videos-panel'); } else { CollapseYTLink('watch-channel-videos-panel'); } break;
    case 3: CollapseYTLink('watch-channel-videos-panel'); break;
  }
  PlaylistLoop(getValue('PLAYLIST_LOOP'),PLCount);
  if(gvar.isBetaChannel) {
    var df=getValue('BCHAN_DEFAULT_PAGE');
    if(df && !window.location.hash) { window.location.hash='#'+OPTIONS_BOX['BCHAN_DEFAULT_PAGE'][5+df]; }
    if(getValue('HIDE_BCHAN_YT_HEADER')>0) {
      var mc=$(YOUTUBE_HEADER);
      if(mc) { mc.style.setProperty('display','none',''); }
    }
  }
}

function YouTube_GoogleWatch_list_auto_play() {
  function list_auto_play(opt) {
    var aTL=document.createElement('a');
    aTL.setAttribute('onclick',"javascript:(function(aTL) {"
      +"try { if(yt.config_['LIST_AUTO_PLAY_ON']!="+opt+" ) { var lop=document.getElementById('watch-next-list-autoplay'); if(lop) { var evObj=document.createEvent('MouseEvents'); evObj.initEvent('click', true, false); lop.dispatchEvent(evObj); } } } catch(e) {}"
      +"aTL.parentNode.removeChild(aTL); })(this);");
    document.body.appendChild(aTL); SimulateMouse(aTL,'click');
  }
  if(getValue('PLAYLIST_NO_PLAYNEXT_START')>0) {
    if(!location.search.match(/[?&]playnext\=\d+(?:\&|$)/i)) {
      if(location.search.match(/[?&]feature\=playlist(?:\&|$)/i)) {
        list_auto_play('true'); return;
  } } }
  switch(getValue('LIST_AUTO_PLAY')) {
    case 1: list_auto_play('false'); break;
    case 2: list_auto_play('true'); break;
  }
}

function YouTube_GoogleWatch_layout_items_change() {
  if(!gvar.isOnYouTube) { return; }
  YouTube_GoogleWatch_list_auto_play();
  if(getValue('REMOVE_LANGUAGE_BOX')>0) { remove_watch_element('html-optional-lang-link'); }
  if(getValue('REMOVE_UNNEEDED_INFO')>0) { remove_watch_element('guided-help-alert'); }
  if(getValue('COLLAPSE_COMMENTS')>0) { var wd=$('watch-discussion'); if(wd) { wd.style.setProperty('display','none',''); } }
  if(getValue('EXPAND_VIDEO_DETAILS')>0) { ExpandYTLink('watch-description'); }
  else if(getValue('EXPAND_STATISTICS_DATA')>0) { ExpandYTLink('watch-views'); }
  switch(getValue('EXPAND_VIDEO_UPLOADER')) {
    case 1: ExpandYTLink('watch-video-count'); break;
    case 2: ExpandYTLink('watch-video-count'); break; //TODO...
    case 3: CollapseYTLink('watch-video-count'); break;
  }
}


//******************************************** Updater ***************************************************//
function YouTube_Enhancer_Update_install(updateelem,Date_Now,Updater_url_dl) {
  GM_setValue("Youtube_Enhancer_Updater_LastState",4); GM_setValue("Youtube_Enhancer_Updater_Date", Date_Now); removeElement(updateelem);
  switch(getValue('YOUTUBE_ENHANCER_UPDATE_VISIT')) {
    default: document.location.href=Updater_url_dl; break;
    case 1: GM_openInTab(Updater_url_dl); break;
  }
}

function YouTube_Enhancer_Update_later(updateelem,Date_Now) {
  GM_setValue('Youtube_Enhancer_Updater_LastState',3); GM_setValue("Youtube_Enhancer_Updater_Date", Date_Now); removeElement(updateelem);
}

function YouTube_Enhancer_Update_Display(Updater_url_dl,Date_Now) {
  var updateelem=document.createElement('div');
  updateelem.setAttribute('lang','fr');
  updateelem.setAttribute("style","position:fixed; top:0px; left:0px; right:0px; z-index:9998; color:#FFFFFF !important; background:#C080C0 !important; width:auto; text-align:center; font-family:"+FONT_ARIAL+"; font-size:24px; line-height:24px; margin:2px; border: 3px solid #CC0088; border-right-width:24px;");
  updateelem.textContent=HtmlUnicodeDecode('&#89;outu&#98;e &#69;nhan&#99;er - ')+getText("ufoun")+': ';
  var aelem1=document.createElement('a'); aelem1.setAttribute('style','text-decoration:none !important; cursor:pointer; color:#0000CC !important; font-weight: normal; font-style:normal;');
  //aelem1.setAttribute('href',Updater_url_dl);
  aelem1.setAttribute('title',Updater_url_dl); aelem1.textContent=getText("udnow"); updateelem.appendChild(aelem1);
  var textelem=document.createTextNode(' / '); updateelem.appendChild(textelem); var aelem2=document.createElement('a');
  aelem2.setAttribute('style','text-decoration:none !important; cursor:pointer; color:#0000CC !important; font-weight: normal; font-style:normal;');
  aelem2.textContent=getText("udlat"); updateelem.appendChild(aelem2); var aelemX=document.createElement('a');
  aelemX.setAttribute('style','position:absolute; top:0px; height:26px; width: 20px; right:-21px; text-decoration:none !important; cursor:pointer; color:#0000CC !important; background:#CC0088 !important;');
  aelemX.textContent='X'; updateelem.appendChild(aelemX); user_select(updateelem,'none'); document.body.appendChild(updateelem);
  aelem1.addEventListener('click', function() { YouTube_Enhancer_Update_install(updateelem,Date_Now,Updater_url_dl); }, true);
  aelem2.addEventListener('click', function() { YouTube_Enhancer_Update_later(updateelem,Date_Now); }, true);
  aelemX.addEventListener('click', function() { removeElement(updateelem); }, true);
}

function YouTube_Enhancer_Update_homepage_event(event) {
  if(arguments.callee.elem.parentNode) { removeElement(arguments.callee.elem); }
  this.removeEventListener('click',YouTube_Enhancer_Update_homepage_event,true);
  var linkUpdate=null; try { linkUpdate=document.evaluate('//a[@href and starts-with(text(),"Update")]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { linkUpdate=null; }
  if(linkUpdate) { linkUpdate.textContent='Up to date'; linkUpdate.setAttribute('style','background: #E8E8E8;'); }
}

function YouTube_Enhancer_Update_homepage(linkUpdate,Updater_Interval) {
  if(Updater_Interval>0) { GM_setValue("Youtube_Enhancer_Updater_LastState",1); } YouTube_Enhancer_Update_homepage_event.elem=show_messageBox(HtmlUnicodeDecode('&#89;outube &#69;nha&#110;cer - ')+getText('pinst'));
  if(linkUpdate) {
    linkUpdate.textContent='Update'; linkUpdate.removeAttribute('style'); //linkUpdate.setAttribute('href','#');
    linkUpdate.addEventListener('click',YouTube_Enhancer_Update_homepage_event,true);
  }
}

function YouTube_Enhancer_Updater() {
  try { if(top.location.href!=window.location.href) { return; } } catch(e) { return; } if(gvar.temporarilyStorage) { return; }
  function dateAdd(ddate,idays) { var ndate=new Date(); ndate.setTime(ddate.getTime()); ndate.setDate(ddate.getDate()+idays); return ndate; }
  function DateToDiso(ddate) { return ddate.getFullYear()*10000+(ddate.getMonth()+1)*100+ddate.getDate(); }
  function DisoToDate(idiso) { if(res=idiso.toString().match(/^(\d+)(\d\d)(\d\d)$/)) { return new Date(res[1],(res[2]-1),res[3]); } else { return new Date(1970,0,1); } }
  var Updater_Interval=GM_getIntValue('YOUTUBE_ENHANCER_UPDATE_CHECK_INTERVAL',1); var Updater_LastState=GM_getIntValue('Youtube_Enhancer_Updater_LastState',0); var val=Math.pow(8,5);
  var Updater_Version=GM_getIntValue('Youtube_Enhancer_Updater_Version',0); var Updater_Date=Math.abs(GM_getIntValue('Youtube_Enhancer_Updater_Date',0)); var athome=false;
  var Date_Now=DateToDiso(new Date()); if(Updater_Date>Date_Now) { GM_setValue("Youtube_Enhancer_Updater_Date",Date_Now); return; } val+=274;
  var Updater_url_dl='userscripts.org/scripts/show/'+val; var current_url=(window.location.hostname+window.location.pathname).match(/^(.*?)\/?$/); var t=HtmlUnicodeDecode; current_url=current_url[1];
  if(current_url.toLowerCase()==Updater_url_dl.toLowerCase()) { athome=true; } Updater_url_dl='http://'+Updater_url_dl; var res;
  if(athome) {
    var linkUpdate=null; try { linkUpdate=document.evaluate('//a[@href and starts-with(text(),"Install")]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { linkUpdate=null; }
    if(linkUpdate) { linkUpdate.setAttribute('style','background: #E8E8E8;'); }
    link=null; try { link=document.evaluate('//meta[@name="uso:version"]',document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; } catch(err) { link=null; }
    if(link) {
      res=link.getAttribute('content');
      if(res.match(/^\d+$/)) {
        show_alert(t('Yo&#117;tube En&#104;an&#99;er')+' - Homepage check / Current_Version='+Updater_Version+' / Homepage_Version='+res,0);
        GM_setValue("Youtube_Enhancer_Updater_Version", res); GM_setValue("Youtube_Enhancer_Updater_Date", Date_Now);
        if(Updater_LastState<2 && res==Updater_Version) { show_alert(t('Yo&#117;tube En&#104;an&#99;er')+' - No change / Current_Version='+res,0); return; }
        YouTube_Enhancer_Update_homepage(linkUpdate,Updater_Interval);
        return;
    } }
    if(Date_Now==Updater_Date) { if(Updater_LastState>=2) { YouTube_Enhancer_Update_homepage(linkUpdate,Updater_Interval); } return; }
    return;
  }
  try { if(GM_isAddon) { return; } } catch(err) {} 
  if(Updater_Interval<=0) { if(Updater_LastState>=0) { GM_setValue('Youtube_Enhancer_Updater_LastState',-1); show_alert(HtmlUnicodeDecode('Y&#111;utube En&#104;ancer')+' - Updater Disabled / Last_Version='+Updater_Version,0); show_messageBox(HtmlUnicodeDecode('Y&#111;utube En&#104;ancer - ')+getText("udisa")); } return; }
  if(Updater_LastState>0) {
    if(Updater_LastState==2 || Updater_LastState==3) {
      if(Date_Now==Updater_Date) {
        if(Updater_LastState==3) { show_alert(HtmlUnicodeDecode('&#89;outube &#69;nha&#110;cer')+' - Update Later Was Found: Now='+Date_Now,0); }
        else { show_alert(HtmlUnicodeDecode('Yo&#117;tube &#69;nhance&#114;')+' - Update Was Found: Last='+Updater_Date+' / Now='+Date_Now,0); YouTube_Enhancer_Update_Display(Updater_url_dl,Date_Now); }
        return;
      }
    } else if(DateToDiso(dateAdd(DisoToDate(Date_Now),-Updater_Interval))<Updater_Date) { return; }
  }
  // Checking meta.js...
  var Updater_url_check='http://userscripts.org/scripts/source/'+val+'.meta.js';
  GM_xmlhttpRequest({
    method: 'GET',
	url: Updater_url_check,
	headers: { 'User-agent': 'GM_xmlhttpRequest Updater', 'Accept': 'text/*' },
    onerror: function(data) { this.onload(data); },
	onload: function(data) {
      show_alert(t('Yout&#117;be Enha&#110;cer')+' - Check Update: Last='+Updater_Date+' / Now='+Date_Now+' / LastState='+Updater_LastState,0);
      var fail=true;
      if(data.status!=200) { show_alert('Update check failed: HTTP Error '+data.status,0); return; }
      res=data.responseText.match(/\@au\x74h\x6Fr\s+G\x49J\x6Fe/i); if(!res) { fail=true; } else { fail=false; }
      res=data.responseText.match(/\@n\x61me\s+\x59ou\x54u\x62e\s+\x45n\x68an\x63er/i); if(!res) { fail=true; }
      res=data.responseText.match(/\@namespace\s+https?\:\/\/userscripts\.org\/scripts\/show\/(\d+)/i);
      if(!res && res[1]!=val) { fail=true; }
      res=data.responseText.match(/\@uso\:script\s+(\d+)/i);
      if(!res && res[1]!=val) { fail=true; }
      res=data.responseText.match(/\@uso\:version\s+(\d+)/i); if(!res) { fail=true; } else { res=res[1]; }
      if(fail) { GM_setValue("Youtube_Enhancer_Updater_Date", Date_Now); show_messageBox(t('Yout&#117;be Enh&#97;ncer - ')+getText("ufail")); return; }
      GM_setValue("Youtube_Enhancer_Updater_Version", res); GM_setValue("Youtube_Enhancer_Updater_Date", Date_Now);
      if(Updater_LastState<=0 && (res==Updater_Version || Updater_Version<=0)) {
        GM_setValue("Youtube_Enhancer_Updater_LastState",1); show_alert(t('Y&#111;utube Enhan&#99;er')+' - Updater Enabled / Current_Version='+res,0); show_messageBox(t('You&#116;ube Enhanc&#101;r - ')+getText("uenab"));
      } else {
        if(Updater_LastState<2 && res==Updater_Version) { show_alert(t('Yo&#117;tube En&#104;an&#99;er')+' - No change / Current_Version='+res,0); return; }
        if(athome) {
          YouTube_Enhancer_Update_homepage(linkUpdate,Updater_Interval);
        } else {
          GM_setValue("Youtube_Enhancer_Updater_LastState",2); show_alert(t('&#89;ou&#116;ube Enh&#97;ncer')+' - Update Found / Version: '+Updater_Version+' -> '+res,0); YouTube_Enhancer_Update_Display(Updater_url_dl,Date_Now);
        }
      }
    }
  });
}

function Options_Updater() {
  try { GM_deleteValue('SHOW_EXTENDED_COMMENTS'); } catch(e) {}
  try { GM_deleteValue('SHOW_EXTENDED_NUMBER'); } catch(e) {}
}

//************************************** Useful Sub-routines *********************************************//
function YouTube_getJsDOMValue(callBack) { // LOCALE / IS_WIDESCREEN / IS_HD_AVAILABLE / EMBED_URL
  show_debug('Get YouTube config');
  gvar.ytc_FLASHVARS=null;
  var aTL=document.createElement('a');
  function getJsDOMValue_event(e) {
    gvar.ytc_LOCALE=getStrAttribute(aTL,'LOCALE'); gvar.ytc_WIDE=(getStrAttribute(aTL,'WIDE').toLowerCase()!='false');
    gvar.ytc_ISHD=(getStrAttribute(aTL,'ISHD').toLowerCase()=='true'); gvar.ytc_EMBURL=getStrAttribute(aTL,'EMBURL');
    gvar.ytc_FLASHVARS=aTL.getAttribute('FLASHVARS'); //show_debug(gvar.ytc_FLASHVARS);
    //show_debug('YTVAR:'+gvar.ytc_LOCALE+'/'+aTL.getAttribute('WIDE')+'/'+aTL.getAttribute('ISHD')+'/'+gvar.ytc_EMBURL);
    removeElement(aTL); setTimeout(callBack,1);
  }
  aTL.addEventListener('dblclick',getJsDOMValue_event,true);
  aTL.setAttribute('onclick',"javascript:(function(aTL) {"
    +"try { aTL.setAttribute('LOCALE',yt.config_['LOCALE'] || yt.config_['GUIDED_HELP_LOCALE']); } catch(e) {}"
    +"try { aTL.setAttribute('WIDE',yt.config_['IS_WIDESCREEN']); } catch(e) {}"
    +"try { aTL.setAttribute('ISHD',yt.config_['IS_HD_AVAILABLE']); } catch(e) {}"
    +"try { aTL.setAttribute('EMBURL',yt.config_['EMBED_URL']); } catch(e) {}"
    +"try { var swfArgs=(yt.config_['SWF_ARGS'] || yt.config_['SWF_CONFIG']['args']);"
    +"if(typeof(swfArgs)=='object') { var fv=''; for(var key in swfArgs) { var data=swfArgs[key].toString(); if(fv!='') { fv=fv+'&'; } "
    +"if(data.indexOf('&')>=0) { data=encodeURIComponent(data); } fv=fv+key+'='+data; }"
    +"aTL.setAttribute('FLASHVARS',fv); } } catch(e) {}"
    +"var evObj=document.createEvent('MouseEvents'); evObj.initEvent('dblclick', true, false); aTL.dispatchEvent(evObj);"
    +"})(this);");
  document.body.appendChild(aTL); SimulateMouse(aTL,'click');
}

function YouTube_RebindPlayerAndFlush(player_name) {
  // Rebind
  show_debug('Rebind player');
  var aTL=document.createElement('a');
  aTL.setAttribute('onclick',"javascript:(function(aTL) {"
    +"try { onYouTubePlayerReady_rebindAndFlush('"+encodeURIComponent(player_name)+"'); onYouTubePlayerReady(); } catch(e) {}"
    +"aTL.parentNode.removeChild(aTL); })(this);");
  document.body.appendChild(aTL); SimulateMouse(aTL,'click');
}

function getUnsafeElementById(ElName) { return unsafeWindow.document.getElementById(ElName); }
function getUnsafeConfig(name,def) {
  var res; try { res=unsafeWindow.yt.config_[name]; } catch(e) { res=def; }
  switch(typeof(res)) { case 'string': case 'boolean': case 'undefined': return res; } return null;
}

function SimulateMouse(el,event) { var evObj=document.createEvent('MouseEvents'); evObj.initEvent(event,true,false); el.dispatchEvent(evObj); }

function remove_watch_element(elName) {
  if(gvar.isOnYouTube) {
    var el=$(elName);
    if(el) { el.parentNode.removeChild(el); }
} }
function remove_watch_parent_element(elName) {
  if(gvar.isOnYouTube) {
    var el=$(elName);
    if(el) { var elp=el.parentNode; elp.parentNode.removeChild(elp); }
} }

function getStrAttribute(obj,name) { if(obj.hasAttribute(name)) { return obj.getAttribute(name); } else { return(''); } }

function HtmlUnicodeDecode(str) {
  // Change HTML code "&#xxxxx;" to Unicode
  var out="";
  if(str==null) { return(out); }
  var l=str.length;
  for (var i=0; i<l; i++) {
    var ch=str.charAt(i);
    if(ch=='&') {
      var sci=str.indexOf(';',i+1);
      if(sci>0) {
        var entity=str.substring(i+1,sci);
        if(entity.length>1 && entity.charAt(0)=='#') {
          entity=entity.substring(1);
          if(entity.charAt(0).toLowerCase()=='x') { ch=String.fromCharCode(parseInt('0'+entity)); }
          else { ch=String.fromCharCode(parseInt(entity)); }
        } else {
          switch(entity) {
            case "nbsp": ch=String.fromCharCode(160);
        } }
        i=sci;
    } }
    out+=ch;
  }
  return out;
}

function GetYEU() { try { return YouTube_Enhancer_Updater; } catch(e) { return arguments.callee; } }

function getDisplayHeight(element) {
  var els = element.style;
  var oVisibility = els.visibility;
  var oPosition = els.position;
  var oDisplay = els.display;
  els.visibility = 'hidden';
  els.position = 'absolute';
  els.display = 'block';
  var Result = element.clientHeight;
  els.display = oDisplay;
  els.position = oPosition;
  els.visibility = oVisibility;
  return Result;
}

function getHeight(element) {
  //var Result=window.getComputedStyle(element,null).height.replace('px','');
  //if (Result=='auto') { Result = element.clientHeight; }
  return element.clientHeight;
}

function getWidth(element) {
  var Result = window.getComputedStyle(element,null).width.replace('px','');
  if (Result=='auto') { Result = element.clientWidth; }
  return Result;
}

function getAbsoluteLeft(element) {
  var AbsLeft=0;
  while (element) { AbsLeft=AbsLeft+element.offsetLeft; element=element.offsetParent; }
  return(AbsLeft);
}

function getAbsoluteTop(element) {
  var AbsTop=0;
  while (element) { AbsTop=AbsTop+element.offsetTop; element=element.offsetParent; }
  return(AbsTop);
}

function isPositiveInteger(value) { return (value.toString().search(/^\d+$/)==0); }

function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null;    }

function flushNode(el) {
  show_alert('Flush YouTube Player: '+el.id,0);
  YouTube_RebindPlayerAndFlush(el.id);
}

function swap_display(element) {
  var els = element.style;
  if(els.display=="none") { els.display="block"; } else { els.display="none"; }
}

function user_select(element,value) {
  var els = element.style;
  if(isDefined(els.userSelect)) {els.userSelect=value;} // CSS3
  else if (isDefined(els.MozUserSelect)) {els.MozUserSelect=value;} // Mozilla
  else if (isDefined(els.webkitUserSelect)) {els.webkitUserSelect=value;} // WebKit
}

function GetColors(colorStr) {
  var rgba=colorStr.match(/rgba\s*\(\s*(\d+)\s*\,\s*(\d+)\s*\,\s*(\d+)\s*,\s*(1[.,]?0*|0*[.,]\d+|0*[.,])\s*\)/i);
  if (rgba) { return { r:parseInt(rgba[1],10), g:parseInt(rgba[2],10), b:parseInt(rgba[3],10), a:parseFloat(rgba[4]) } }
  var rgb=colorStr.match(/rgb\s*\(\s*(\d+)\s*\,\s*(\d+)\s*\,\s*(\d+)\s*\)/i);
  if (rgb) { return { r:parseInt(rgb[1],10), g:parseInt(rgb[2],10), b:parseInt(rgb[3],10), a:1 } }
  rgb=colorStr.match(/\#\s*([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/i);
  if (rgb) { return { r:parseInt(rgb[1],16), g:parseInt(rgb[2],16), b:parseInt(rgb[3],16), a:1 } }
  rgb=colorStr.match(/\#\s*([0-9A-F]{1})([0-9A-F]{1})([0-9A-F]{1})/i);
  if (rgb) { return { r:parseInt(rgb[1],16)*17, g:parseInt(rgb[2],16)*17, b:parseInt(rgb[3],16)*17, a:1 } }
  return null;
}

function GetColorsHex(rgba) {
  function ValueToHex(val) { return (Math.floor(val/16)%16).toString(16)+(Math.floor(val)%16).toString(16); }
  return '#'+ValueToHex(rgba.r)+ValueToHex(rgba.g)+ValueToHex(rgba.b);
} 

function GetLuminosity(color) {
  function Get_HSP_Luminosity(r,g,b) { return (Math.sqrt(0.241*Math.pow(r,2)+0.691*Math.pow(g,2)+0.068*Math.pow(b,2))); }
  var rgba=GetColors(color);
  if(rgba) { return Get_HSP_Luminosity(rgba.r,rgba.g,rgba.b); }
  return 255;
}

function removeElement(el) { el.parentNode.removeChild(el); }

function show_messageBox(msg) {
  if ( top.location.href!=window.location.href ) { return; }
  var element=document.createElement('div');
  element.setAttribute('lang','fr');
  element.setAttribute("style","position:fixed; top:0px; left:0px; right:0px; z-index:9998; height:26px; font-family:"+FONT_ARIAL+"; font-size:24px; line-height:24px; text-align:center; vertical-align:middle; color:#FFFFFF !important; background:#C080C0 !important; margin:2px; border: 3px solid #CC0088; border-right-width:24px;");
  element.textContent=msg;
  var aelem=document.createElement('a');
  aelem.setAttribute('style','position:absolute; top:0px; height:26px; width: 20px; right:-21px; text-decoration:none !important; cursor:pointer; color:#0000CC !important; background:#CC0088 !important;');
  aelem.textContent='X';
  element.appendChild(aelem);
  user_select(element,'none');
  document.body.appendChild(element);
  aelem.addEventListener('click', function() { removeElement(element); }, true);
  return element;
}

function show_debug(msg) { if(DEBUG) { show_alert('DEBUG: '+msg,0); } }
function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
  // Show a HTML alert box (only for watch pages or if forced)
  if(force==1 || gvar.isWatchPage) {
    warningelem=document.createElement('div');
    warningelem.setAttribute("style","color:#FFFFFF; background:#FF8000; width:auto; text-align:center; font-size:24px; border: 3px solid #CC0088; margin:2px;");
    warningelem.textContent=msg;
    document.body.insertBefore(warningelem, document.body.firstChild);
  }
}





/******************************************** License ******************************************************
*** Creative Commons 3.0                                                                                 ***
*** by: BY-attribution (Requirement to acknowledge or credit the author "GIJoe")                         ***
*** nc: Non-Commercial (Use for commercial purpose is forbidden)                                         ***
*** sa: Share Alike    (Derivative works must be under the same or similar license to this one)          ***
***********************************************************************************************************/

//******************************************* Main() *****************************************************//
function mediacontrollermenu() {
  try { gvar.page_lang=get_page_lang(); } catch(err) { show_alert('Initialisation failed: '+err); }
  try { add_media_controller(); } catch(err) { show_alert('media_controller => '+err); }
}

function main() {
  var docState=null; try { docState=unsafeWindow.document.readyState; } catch(e) { docState=null; }
  if(docState) {
    if((docState!='interactive' || !gvar.isGreaseMonkey) && docState!='complete') {
      show_alert('Document not loaded ('+docState+'), waiting...',0);
      window.setTimeout(main,150); return;
    } else { show_alert('Document loaded ('+docState+'), launching...',0); }
  }

  // Bind event for loop and autoplay (YouTube Watch pages & Channel pages only)
  try { bind_movie_player_event(); } catch(err) { show_alert('bind_movie_player_event => '+err); }
  try { Options_Updater(); } catch(e) { show_alert('Options_Updater => '+err); }

  // feather pages
  try { feather_remake_page();    } catch(err) { show_alert('feather_remake_page => '+err); }

  // Miscellaneous
  try { YouTube_layout_items_change(); } catch(err) { show_alert('YouTube_layout_items_change => '+err); }

  if(CONFIG_VIA_DOM>0) {
    if(gvar.isOnYouTube) { YouTube_getJsDOMValue(main1); } else { main1(); }
  } else {
    gvar.ytc_LOCALE=getUnsafeConfig('LOCALE'); gvar.ytc_WIDE=getUnsafeConfig('IS_WIDESCREEN',true);
    gvar.ytc_ISHD=getUnsafeConfig('IS_HD_AVAILABLE',false); gvar.ytc_EMBURL=getUnsafeConfig('EMBED_URL');
    main1();
  }
}

function main1() {
  // Initialisation
  try { color('change',USE_DARK_COLORS); gvar.page_fmt=get_page_fmt(); gvar.page_lang=get_page_lang(); } catch(err) { show_alert('Initialisation failed: '+err); }

  // bypass verify age
  var cont=true;
  try { cont=bypass_age_censor(main2); } catch(err) { show_alert('bypass_age_censor => '+err); }
  if(cont) { main2(); }
}
function main2() {
  function html5Layout() {
    show_alert('HTML5 Layout Detected',0);
    gvar.isHTML5Layout=true;
    main3();
  }
  function newLayoutChange() { /*YouTube_RebindPlayerAndFlush();*/ main3(); }
  function newLayoutChange_event(e) {
    if(DEBUG>1) { var el=e.target; var elp=el.parentNode; show_debug(el.nodeName+' / id='+el.id+' / name='+el.name+' // Parent:'+elp.nodeName+' / id='+elp.id+' / name='+elp.name); }
    if(e.target.nodeName=='INPUT' && e.target.parentNode.name=='searchForm') { YouTube_getJsDOMValue(newLayoutChange); }
  }

  // Detecting new YouTube layout
  if(gvar.isWatchPage) {
    // HTML5 Layout
    var mp=get_PlayerEmbed_element();
    if(!mp) {
      mp=$('video-player');
      if(mp) { YouTube_getJsDOMValue(html5Layout); return; }
    }
    // GoogleWatch Layout
    if($('watch-html') || $('watch-headline-title')) {
      googleWatch_remake_page();
      var wps=$('watch-pagetop-section');
      if(wps) {
        show_alert('Youtube New Layout detected (Ajax)',0);
        wps.addEventListener('DOMNodeInserted',newLayoutChange_event,true);
        var whl=$('watch-headline'); if(whl) { main3(); }
      } else {
        show_alert('Youtube New Layout detected (Starter)',0);
        main3();
      }
      return;
    }
    // Default layout...
  }
  main3();
}
function main3() {
  show_debug('Start main routine...');
  if(gvar.isGoogleWatch) {
    try { YouTube_GoogleWatch_layout_items_change(); } catch(err) { show_alert('YouTube_GoogleWatch_layout_items_change => '+err); }
  }

  // change_links (part of Quality Selector) (image_preview_rollover included) (change_links must be the first to run)
  try { change_links(gvar.page_fmt);         } catch(err) { if(err.message=="exit") { return } show_alert('change_links => '+err); }
  // Download Link (YouTube Watch pages only)
  try { add_download_link(gvar.page_fmt);    } catch(err) { show_alert('download_link => '+err); }
  if(!gvar.isHTML5Layout) {
    // Quality Selector (YouTube Watch pages only)
    try { add_quality_selector(gvar.page_fmt); } catch(err) { show_alert('quality_selector => '+err); }
    // Media Resizer (YouTube Watch pages only)
    try { media_resizer();                } catch(err) { show_alert('media_resizer => '+err); }
    // Video Preview
    try { display_video_preview();        } catch(err) { show_alert('video_preview => '+err);    }
  }
  // Media Controller
  try { add_media_controller();         } catch(err) { show_alert('media_controller => '+err); }
  // Keyboard control
  try { add_keyboard_control();         } catch(err) { show_alert('keyboard_control => '+err); }

  // Add menu to rebind Media Controller / reenable scrollbar
  if(getValue('HIDE_SCROLLBARS')) { GM_registerMenuCommand("Youtube Enhancer - Show ScrollBar", function() { show_scrollbar(); } ); }
  GM_registerMenuCommand("Youtube Enhancer - Rebind Media Controller", function() { mediacontrollermenu(); } );

  // Update check
  try { YouTube_Enhancer_Updater();     } catch(err) { if(!err.message.match(/^\s*Security\s+violation(?:\s+|\s*$)/i)) { show_alert('YouTube_Enhancer_Updater => '+err); } }

  //GM_log('Full Duration: '+(new Date().getTime()-start_time)+'ms');
}
main();

//GM_log('Duration: '+(new Date().getTime()-start_time)+'ms');
} )();
// ]]>

