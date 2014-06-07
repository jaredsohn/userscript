// ==UserScript==
// @name        Youtube: Remove Comment Avatars
// @namespace   comment-reformat
// @description Removes the avatars from Youtube comments, resulting in less clutter.
// @include     *www.youtube.com/watch*
// @include     *www.youtube.com/all_comments*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1.02
// ==/UserScript==

/*
.yt-user-photo {
	display:none !important;
}
*/

GM_addStyle( ".yt-user-photo { display:none !important; }" );
GM_addStyle( ".comment .content { margin-left: 0 !important; }" );
GM_addStyle( ".comments-textarea-container { margin-left: 0 !important; }" );