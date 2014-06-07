// ==UserScript==
// @name           Signature
// @description    Automatically adds a signature to posts on the forum that indicates the number of tickets and ROBUX the user possesses.
// @namespace      Mark Otaris
// @include        *.roblox.com/Forum/AddPost.aspx*
// @version        1
// ==/UserScript==

var tickets_possessed = document.getElementById('ctl00_cphBanner_ctl00_BannerAlertsAndOptionsLoginView_ctl01_TicketsAlertCaption').innerHTML
var robux_possessed = document.getElementById('RobuxAlertCaption').innerHTML
document.getElementById('ctl00_cphRoblox_Createeditpost1_PostForm_PostBody').defaultValue = "\n\n_________________________________________________________________________\n" + "I possess " + robux_possessed + " ROBUX and " + tickets_possessed + " tickets.";