// ==UserScript==
// @name           StreamItUp Video Link
// @version        1.0.2
// @namespace      gargamel64
// @author         Gargamel64
// @description    Shows the lectures links, in streamitup.com systems, so it is easier to download them, or watch them in other OS than Windows
// @include        http://www.streamitup.com/elearning/*/vod_student_window_E.php
// @include        http://www.streamitup.com/huji_db/*
// @grant          GM_addStyle
// @run-at         document-end
// ==/UserScript==

var EMPTY_VIDEO_NAME = "blankvideo.wmv";

// Setting the style needed
GM_addStyle(
	"#divMmsLinks { direction: rtl; text-align: center; font-size: 12pt; font-family: arial; margin: 0.5em 0; } \
	table.TableData { width: 90%; margin: 0 auto; border: 2px solid black; } \
	table.TableData tr th, table.TableData tr td { border: 1px solid black; padding: 0; } \
	table.TableData tr td.ID { width: 10%; } \
	table.TableData tr td.Link { width: 45%; } \
	table.TableData tr td.Link input { width: 95%; } \
	p.Right { float: right; width: 40%; margin-right: 10%; } \
	p.Left { float: left; width: 40%; margin-left: 10%; direction: ltr; } \
	div.Clear { clear: both; } "
);

// The movies are listed in an array, each item is an object containing the data
var movies = unsafeWindow.chapters_data;
if (movies == null)
{
	return;
}

var div = document.createElement("div");
div.id = "divMmsLinks";

var header = "<p class=\"Right\"> \
	קישורים ישירים לסרטונים (פרוטוקול mms): \
	<br /> \
	הורדה או צפייה באמצעות VLC או כל נגן אחר שמכבד את עצמו. </p> \
	<p class=\"Left\"> \
	Direct links for the videos (mms protocol): <br /> \
	Watch or download using VLC or other media players. \
	</p> \
	<div class=\"Clear\"></div>";

var table = "<table class=\"TableData\">";
table += "<tr>";
table += "	<th> פרק <br /> Part</th>";
table += "	<th> מסך המחשב <br /> Computer Screen</th>";
table += "	<th> לוח <br /> Board </th>";
table += "</tr>";

var screenPath;
var boardPath;
for (var i = 0; i < movies.length; i++)
{
	screenPath = (movies[i].full_scr_path.indexOf(EMPTY_VIDEO_NAME) >= 0 ? "-" : "<input type=\"text\" value=\"" + movies[i].full_scr_path + "\" onfocus=\"this.select();\" readonly=\"readonly\" />");
	boardPath = (movies[i].full_cam_path.indexOf(EMPTY_VIDEO_NAME) >= 0 ? "-" : "<input type=\"text\" value=\"" + movies[i].full_cam_path + "\" onfocus=\"this.select();\" readonly=\"readonly\" />");
	
	table += "<tr>";
	table += "	<td class=\"ID\"> " + (i + 1) + " </td>";
	table += "	<td class=\"Link\"> " + screenPath + " </td>";
	table += "	<td class=\"Link\"> " + boardPath + " </td>";
	table += "</tr>";
}

table += "</table>";
div.innerHTML = header + table;

document.body.insertBefore(div, document.body.firstChild);

// Hides the annoying "Install Microsoft Silverlight" baner (Why should Someone do so? yack..)
// There are two versions, one is { big, small } and the second is { one, two }. Checking for both
if (document.getElementById("big") != null)
{
	document.getElementById("big").style.display = "none";
	document.getElementById("small").style.display = "none";
}
if (document.getElementById("one") != null)
{
	document.getElementById("one").style.display = "none";
	document.getElementById("two").style.display = "none";
}