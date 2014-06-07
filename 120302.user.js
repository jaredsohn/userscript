// ==UserScript==
// @name           MedUniWien Webambulanz Avatars
// @namespace      Jakob V. <jakov@gmx.at>
// @description    Adds Gravatar identicons to the usernames for easier visual recognition
// @include        http://maximus.repro.meduniwien.ac.at/up1/x.web?CID=Iframe.View.NavigateTo*
// @require        http://code.jquery.com/jquery-1.5.js
// @require        https://raw.github.com/unlight/Identicon5/master/jquery.identicon5.js
// @require        http://www.itsyndicate.ca/gssi/jquery/jquery.crypt.js
// ==/UserScript==

$(document).ready(function(){
	$("td.clsDiscussionParentArticle span, td.clsDiscussionAnswerToParentArticle span").each(function(){
		name = '';
		if($(this).text().match(/n\d{7}/) || $(this).text().match(/^(Diskussionsleiter|Koordination)/)){
			name = $(this).text();
		}
		if(name){
			icon = $(this).clone();
			md5 = $().crypt({method:"md5", source:name});
			icon.html(md5).identicon5().find('canvas').css({'padding':'3px'});
			$(this).parent().prev().append(icon);
		}
	});
});