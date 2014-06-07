// ==UserScript==
// @name		Teckler - Upload Videos
// @version		0.3
// @description	Now, you can upload videos in Teckler.
// @copyright	2013, Fabiano Lothor
//
// @ include ^(http[s]?://)?(www\.)?teckler\.com*
// ==/UserScript==

$('ul.dropdown-menu').first().append("<li><a data-toggle='modal' data-dynamic='true' data-target='#scrollModal1' onclick='javascript:createTeckLightbox(\"video\",\"http://www.teckler.com/pt/post/new_post\",null,true);setTimeout(function() {addPostCategory(1,\"Others\",\"other\");}, 2500);' class='btn_modal_video'><p class='sprite post_video_icon'></p><span>Video</span></a></li>");