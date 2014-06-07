// ==UserScript==
// @name          MySpaceVidFetch v0.9
// @namespace     http://www.mathguy.com
// @description   Provides download links for Flash FLV files hosted by MySpace.com (excludes music videos).
// @include       http://vids*.myspace.com/index.cfm?fuseaction=vids.individual*
// ==/UserScript==
//Special credit to Josh Kinberg for creating Youtube-to-Me, which served as a template
//for MySpaceVidFetch and vidkeep.com for cleverly figuring out the URL naming scheme.

/*Sometimes the URL parameters are switched so the index will either be a 2 or a 3*/

var hack = window.location.href.split("=")[1]; 
if (hack.charAt(hack.length-1) == "n") { var url_vars = window.location.href.split("=")[3]; }
else { url_vars = window.location.href.split("=")[2]; }

var video_id = "" + url_vars.match(/^[0-9]+/);

var prefix = '00';
var first_five = video_id.substring(0,5);
var final_two_reversed = video_id.charAt(video_id.length-1) + video_id.charAt(video_id.length-2);
var next_final_two_reversed = video_id.charAt(video_id.length-3) + video_id.charAt(video_id.length-4);
var video_url = 'http://content.movies.myspace.com/' + prefix + first_five + '/' + final_two_reversed + '/' + next_final_two_reversed + '/' + video_id + '.flv';

// add banner with download link

var my_banner = document.createElement("div"); my_banner.innerHTML =
'<div style="border-bottom: 1px solid #CCCCCC; margin-bottom: 10px; font-size: small; background-color: #0000FF; color: #FFFFFF;">' +
    '<p style="margin:0px;padding: 5px;text-align:center;">' +
    '<a href="' + video_url + '" style="color:#FFFFFF; font-weight:bold; font-size:10px;">Click Here to Download Flash Video to Disk</a>' +
    '</p></div>';
document.body.insertBefore(my_banner, document.body.firstChild);

// clean up body margin

document.body.style.margin = '0px';