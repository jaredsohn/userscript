/*
    Mother Plucker - Pluck data viewer
	
	Reveals Personal Identifying Information (PII) incompetently
	leaked by numerous McClatchy newspaper web sites:
	
	AFFECTED WEB SITES:

	Anchorage Daily News
	http://www.adn.com/

	Belleville News-Democrat, Belleville IL
	http://www.bnd.com/

	Bradenton Herald, Bradenton FL
	http://www.bradenton.com/

	Centre Daily Times, State College PA
	http://www.centredaily.com/

	The Charlotte Observer, Charlotte NC
	http://www.charlotteobserver.com/
	http://www.thatsracin.com/

	Fort Worth Star-Telegram, Fort Worth TX
	http://www.star-telegram.com/

	Fresno Bee, Fresno CA
	http://www.fresnobee.com/

	The Herald, Rock Hill SC
	http://www.heraldonline.com/

	The Idaho Statesman, Boise ID
	http://www.idahostatesman.com/

	The Kansas City Star, Kansas City MO
	http://www.kansascity.com/

	Ledger-Enquirer, Columbus GA
	http://www.ledger-enquirer.com/

	Lexington Herald-Leader, Lexington KY
	http://www.kentucky.com/

	The News Tribune, Tacoma WA
	http://www.thenewstribune.com/

	The Telegraph, Macon GA
	http://www.macon.com/

	McClatchy DC, Washington DC
	http://www.mcclatchydc.com/  ['Name' not leaked]

	Merced Sun-Star, Merced CA
	http://www.mercedsunstar.com/

	Miami Herald, Miami FL
	http://www.miamiherald.com/

	Modesto Bee, Modesto CA
	http://www.modbee.com/

	The News & Observer, Raleigh NC
	http://www.newsobserver.com/
	http://www.triangle.com/

	The Olympian, Olympia WA
	http://www.theolympian.com/

	The Sacramento Bee, Sacramento CA
	http://www.sacbee.com/

	San Luis Obispo Tribune, San Luis Obispo CA
	http://www.sanluisobispo.com/

	The State, Columbia SC
	http://www.thestate.com/

	Sun Herald, Biloxi MS
	http://www.sunherald.com/

	The Sun News, Myrtle Beach SC
	http://www.thesunnews.com/

	Tri-City Herald, Kennewick WA
	http://www.tri-cityherald.com/

	The Wichita Eagle, Wichita KS
	http://www.kansas.com/

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name           Mother Plucker
// @namespace      http://example.com/MotherPlucker
// @description    Reveals Pluck data
// @include        http://*.adn.com/*
// @include        http://*.bnd.com/*
// @include        http://*.bradenton.com/*
// @include        http://*.centredaily.com/*
// @include        http://*.charlotteobserver.com/*
// @include        http://*.fresnobee.com/*
// @include        http://*.heraldonline.com/*
// @include        http://*.idahostatesman.com/*
// @include        http://*.kansas.com/*
// @include        http://*.kansascity.com/*
// @include        http://*.kentucky.com/*
// @include        http://*.ledger-enquirer.com/*
// @include        http://*.macon.com/*
// @include        http://*.mcclatchydc.com/
// @include        http://*.mercedsunstar.com/*
// @include        http://*.miamiherald.com/*
// @include        http://*.modbee.com/*
// @include        http://*.newsobserver.com/*
// @include        http://*.sanluisobispo.com/*
// @include        http://*.sacbee.com/*
// @include        http://*.star-telegram.com/*
// @include        http://*.sunherald.com/*
// @include        http://*.thatsracin.com/*
// @include        http://*.thenewstribune.com/*
// @include        http://*.theolympian.com/*
// @include        http://*.thestate.com/*
// @include        http://*.thesunnews.com/*
// @include        http://*.tri-cityherald.com/*
// @include        http://*.triangle.com/*
// ==/UserScript==

var templateElement = window.document.getElementById('commentOutputTemplate');
templateElement.innerHTML = '<li class="nyxComment @Nyx.AlternateClass@">' +
	'<div style="background-color:#afa;border: 1px solid green;padding:1px;">' +
	'<div style="float:left;text-align:center">' +
	'<img src="@Nyx.AuthorAvatarPhotoUrl@" class="avatar" title="@Nyx.AuthorLocation@" onclick="helloworld(\'@Nyx.AuthorKey@\')">' +
	'<br style="clear:both;" /><a id="enlarge-@Nyx.CommentIDKey@" href="" style="color:red;display:none;text-decoration:underline;" target="_blank">enlarge</a></div>' +
	'<div id="dialog-@Nyx.CommentIDKey@" style="background-color:#afa;padding-left:72px;"></div><br style="clear:both;" /></div>' +
	'<div class="pluckComAuth">' +
	'<a href="/personas?plckUserId=@Nyx.AuthorKey@&amp;insiteUserId=@Nyx.AuthorKey@">@Nyx.AuthorDisplayName@</a>' +
	' blathered on @Nyx.PostedAtTime@:</div>' +
	'<div class="commentBlock" style="clear:left">' +
	'<p>@Nyx.CommentBody@</p>' +
	'<div class="pluckComOptions" style="text-align: right; font-size: 11px; padding-top: 10px;">' +
	'<span class="commentRecommend">@Nyx.Recommender@</span>' +
	'<span class="commentAbuse">@Nyx.AbuseReporter@</span>' +
	'</div></div><div style="clear:both;"></div></li>';

unsafeWindow.delayedFunction = function() {
	var elementDyn = window.document.getElementById('nyxComments_dynamicContent');
	var elementNCP = window.document.getElementById('nyxComments_pager');
	if (elementDyn) {
		if (elementDyn.innerHTML != '') {
			var comments = unsafeWindow.outputGadget.comments;
			for (var i = 0; i < comments.length; i++) {
				var comment = comments[i];
				var elementAuthor = unsafeWindow.document.getElementById('dialog-' + comment.CommentIDKey);
				if (elementAuthor == null) continue;
				
				// Enlarge avatar -------------------------
				var elementEnlarge = unsafeWindow.document.getElementById('enlarge-' + comment.CommentIDKey);
				var regexCanEnlarge = /.small./i;
				if (comment.AuthorAvatarPhotoUrl.match(regexCanEnlarge) != null) {
					elementEnlarge.href = comment.AuthorAvatarPhotoUrl.replace(regexCanEnlarge, '.Large.');
					elementEnlarge.style.display = 'inline';
				}
				
				if (elementAuthor) {
					var extProfile = comment.AuthorExtendedProfile;
					var html = '';
					if (extProfile.f != '' || extProfile.l != '') html += '<b>Name:</b> ' + extProfile.f + ' ' + extProfile.l + '&emsp;';
					if (comment.AuthorSex != "") html += "<b>Sex:</b> " + comment.AuthorSex + '&emsp;';
					if (comment.AuthorAge != '') {
						// trim extraneous time off DOB
						var idxDOB = comment.AuthorDateOfBirth.indexOf(' ');
						html += "<b>Age:</b> " + comment.AuthorAge + '&emsp;<b>DOB:</b> ' +
						(idxDOB == -1 ? comment.AuthorDateOfBirth : comment.AuthorDateOfBirth.substr(0, idxDOB));
					}
					if (html != '') html += '<br />';
					
					// About Me ---------------------------
					if (comment.AuthorAboutMe != '') {
						html += '<b>About me:</b> ' + comment.AuthorAboutMe.substr(0, 128) + 
							(comment.AuthorAboutMe.length <= 128 ? '<br />' :	
							' [<span style="color:blue;font-weight:bold;text-decoration:underline" title="' + 
							comment.AuthorAboutMe + '">more</span>]<br />');
					}
					
					// Location ---------------------------
					if (comment.AuthorLocation != '') html += '<b>Location:</b> ' + comment.AuthorLocation + '<br />';

					// Stats-------------------------------
					html += '<b>User #:</b> ' + comment.AuthorKey.substr(comment.AuthorKey.lastIndexOf('-') + 1) + '&emsp;';
					html += '<b>Comments:</b> ' + comment.AuthorNumberOfComments + '&emsp;' +
						'<b>Friends:</b> ' + comment.AuthorNumberOfFriends + '&emsp;' +
						'<b>Recommendations:</b> ' + comment.AuthorNumberOfRecommendations + '<br />';

					// User Tier --------------------------
					if (comment.AuthorUserTier != 'Standard') {
						'<b>User tier:</b> ' + comment.AuthorUserTier + '<br />';
					}
					
					// Details ----------------------------
					html += '<b>Last update:</b> ' + comment.AuthorLastUpdated + '<br />';
					html += '<b>Messages public: </b> ' + comment.AuthorMessagesOpenToEveryone + '&emsp;';
					html += '<b>Email notifications: </b> ' + comment.AuthorIsEmailNotificationsEnabled + '<br />';
					
					if (comment.AuthorPersonalPrivacyMode)
						html += '<b>Privacy mode:</b> <span style="color:red;">' + comment.AuthorPersonalPrivacyMode + '</span><br />';

					// Flags ------------------------------
					var lineFlags = '';
					
					if (comment.AuthorIsBlocked != "False")
						lineFlags += '<b style="color:red;">AuthorIsBlocked</b>&emsp;';

					if (comment.ContentBlockingState != 'Unblocked')
						lineFlags = '<b style="color:red;">' + comment.ContentBlockingState + '</b>&emsp;';

					if (comment.CurrentUserHasRecommended == 'True')
						lineFlags += '<b style="color:green;">Has Recommended</b>&emsp;';

					if (comment.CurrentUserHasReportedAbuse == 'True')
						lineFlags += '<b style="color:red;">Has Reported Abuse</b>';

					elementAuthor.innerHTML = html + lineFlags;
				}
			}
		} else {
			window.setTimeout("delayedFunction()", 600);
		}
	} else {
		window.setTimeout("delayedFunction()", 600);
	}
}

window.setTimeout("delayedFunction()", 600);

// END