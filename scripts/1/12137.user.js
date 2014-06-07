// PublishNow!
// version 1.1
// 2007-05-02
// Copyright (c) 2007, Vincenzo Visciano
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "PublicNow!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          PublishNow!
// @namespace     http://lafraveca.blogspot.com
// @description   PublishNow! it's a simplified way to publish your photos on your photostream. Upload your photo as private, tag it and geotag it. When you are done, click on the Publishnow! link and your photo will appear on flickr as posted that very moment. You can simultaneously choose the privacy level. This script is also useful for reordering photos on your photostream.
// @include       http://*flickr.com/photos/*
// @include		  http://flickr.com/photos/*
// ==/UserScript==

(function() {

if (document.getElementById('DiscussPhoto') != null &&
	unsafeWindow.page_current_url.split('/')[2] == unsafeWindow.photos_url.split('/')[2]
	){
	link = document.createElement('a');
	link.setAttribute ('href', "javascript:publishPhotoNow();");
	link.innerHTML = "Publish photo as posted NOW!";

	unsafeWindow.previous_public = 0?true:false;
	unsafeWindow.previous_friend = 0?true:false;
	unsafeWindow.previous_family = 0?true:false;

	permissionBox = '<div id="permissionBoxId" style="display:none; position: absolute; border: 2px solid blue; padding: 10px; z-index:99; background-color: white;"><input name="is_public" id="is_private" value="0" onchange="_privacy_specific_change();" onclick="_privacy_specific_change();" type="radio"> <label for="is_private">Only You</label><br>'
    				+'&nbsp;&nbsp;&nbsp;&nbsp;<input disabled="disabled" name="is_friend" id="is_friend" value="1" onchange="_privacy_specific_change();" onclick="_privacy_specific_change();" type="checkbox"> <label style="color: silver;" for="is_friend" id="is_friend_label">Your Friends</label><br>'
    				+'&nbsp;&nbsp;&nbsp;&nbsp;<input disabled="disabled" name="is_family" id="is_family" value="1" onchange="_privacy_specific_change();" onclick="_privacy_specific_change();" type="checkbox"> <label style="color: silver;" for="is_family" id="is_family_label">Your Family</label><br>'
    				+'<input name="is_public" id="is_public" value="1" onchange="_privacy_specific_change();" onclick="_privacy_specific_change();" checked="checked" type="radio"> <label for="is_public">Anyone</label>'
				+'<br /><input onclick="javascript:publishNOW()" name="Publish" class="Butt" value="Publish" type="button">&nbsp;'
				+'<input onclick="javascript:publishPhotoLater()" name="Cancel" class="Butt" value="Cancel" type="button">&nbsp;'
				+'<input type="hidden" id="perm_comment_4" />'
				+'<input type="hidden" id="perm_comment_3" />'
				+'<input type="hidden" id="perm_comment_2" />'
				+'<input type="hidden" id="perm_comment_1" />'
				+'<input type="hidden" id="perm_addmeta_4" />'
				+'<input type="hidden" id="perm_addmeta_3" />'
				+'<input type="hidden" id="perm_addmeta_2" />'
				+'<input type="hidden" id="perm_addmeta_1" />'
				+'<input type="hidden" id="perm_comment_4_label" />'
				+'<input type="hidden" id="perm_comment_3_label" />'
				+'<input type="hidden" id="perm_comment_2_label" />'
				+'<input type="hidden" id="perm_comment_1_label" />'
				+'<input type="hidden" id="perm_addmeta_4_label" />'
				+'<input type="hidden" id="perm_addmeta_3_label" />'
				+'<input type="hidden" id="perm_addmeta_2_label" />'
				+'<input type="hidden" id="perm_addmeta_1_label" />'
				+'</div>';

	qui = document.createElement('li');
	qui.className = "Stats";
	qui.innerHTML = permissionBox;
	qui.appendChild(link);
	//qui.appendChild(permissionBox);

	insideME = document.getElementById('faves_p');
	insideME.parentNode.appendChild(qui);

	var photoid = unsafeWindow.page_photo_id;
}

unsafeWindow.publishPhotoNow = function () {
	document.getElementById("permissionBoxId").style.display = "block";
}
  
unsafeWindow.publishPhotoLater= function () {
	document.getElementById("permissionBoxId").style.display = "none";
}

unsafeWindow.publishNOW = function () {
  now= new Date();

  var listener = {
	flickr_photos_setDates_onLoad : function(success, responseXML, responseText, params){
	      if(!success) {
	        alert('Set Posted Data NOW failed.');
	      } else {
			document.location.href = document.location.href
		}
	},
	flickr_photos_setPerms_onLoad : function(success, responseXML, responseText, params) {
	      if(!success) {
	        alert('Set Public failed.');
	      } else {
			unsafeWindow.F.API.callMethod('flickr.photos.setDates', { photo_id: photoid, date_posted: now.getTime() },  listener );       
		}
	}
  };

  var public_var = (document.getElementById("is_public").checked == true) ? 1 : 0;
  var friend_var = (document.getElementById("is_friend").checked == true && !public_var) ? 1 : 0;
  var family_var = (document.getElementById("is_family").checked == true && !public_var) ? 1 : 0;
  
  unsafeWindow.F.API.callMethod('flickr.photos.setPerms', { photo_id: photoid, is_public: public_var, 
													 is_friend: friend_var, 
													 is_family: family_var },  listener );       
	
}// end function 

})();