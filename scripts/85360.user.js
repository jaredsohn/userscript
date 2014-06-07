// ==UserScript==
// @author         plrang
// @name           SS SiteBoost GM ***** PRODUCT DISCONTINUED *****
// @version        0.29
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/
// @description    Enhancing Shutterstock site features [direct edit, stats, image previews]
// @namespace      http://fotostocki.pl/plrangjs/ss_siteboost
// @include        http://*.shutterstock.com/*
// ==/UserScript==

// ABOUT and INFO PAGE
//				Also available as a bookmarklet for any browser
//				http://fotostocki.pl/software/shutterstock-site-patch-update/
//
//				Started about 04-09-2010

// Changes
//
// 11-12-2010 0.29b Maintenance release - fixed parts of stats management and lifetime
// 10-12-2010 0.29 Maintenance release
//            Fixed Image Previews problems
//            Fixed Image Stats
//            Many visual and interface ergonomy fixes (Forum shortcut menu, Quick Edit back on Home Page thumbnails)
//            Improved few cross browser compatibility issues
//
// 12-11-2010 Adapted to Shutterstock New Contributors Home page changes and some minor tweaks
//             
// 04-11-2010 Full Total Stats - automatically collecting and showing the archival sales data 
//                       - improved Edit In Place
//                       -              
// 09-10-2010 Extended to work as a *** regular Safari extension *** 
//            Keyword counter and title length counter  added to original SS [ Edit Photo Page ]
// 08-10-2010 SS fix: Updated to reflect SS gallery layout changes
//            Added EditInPlace to HOME page icons [Latest approved and downloads]
//            Several fixes
// 05-10-2010 Extended to work as a *** regular Firefox add-on *** 
// 30-09-2010 Edit in place - click on the thumbnail in Live Stats to get the editor immediately (except footage)
//                          - keyword counter
//                          - title length counter
//            Referrals scan added - tricky and time limited to avoid servers overload
//            Initial code changed, merged bookmarklet and standalone script code in one - what a relief
//            Still no round corners in IE and O
//            Several optimizations and bug fixes 
// 15-09-2010 Bug Fixes
// 14-09-2010 Live Stats thumbnails show the DL count and earnings for each photo
// 12-09-2010 Clickable Live Stats rows allow to switch daily statistics for current month in the same panel without leaving the page
// 10-09-2010 Added more information to StatSS panel from the Stats Table: Totals and Gross
// 08-09-2010 Corrected 'Edit from Photo page' in autorun version and bookmarklet version
// 07-09-2010 Live Stats - a timer for Auto refresh stats page added
// 06-09-2010 Image Previews handling corrected
//

// This script is extremelly useful for Shutterstock contributors

// How it works?

// It gives an easy way to manage Shutterstock portfolio:

//     * adds edit buttons as a short cut to edit each photo from the gallery and from contributor Home page
//			 without searching through the batches
//     * adds a possibility to edit photo data straight from its page (by clicking the bookmarklet button there).
//     * StatSS - quick stats from almost any SS page
//     * adds  alternative Image Previews with full title text - in contributor gallery and on Home page
//     * makes Image Previews available in Chrome, Opera (also useful for image buyers)





