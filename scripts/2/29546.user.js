// ==UserScript==
// @name           Zooomr Simple Organizer
// @namespace      http://www.zooomr.com/photos/ping/
// @description    A simple bulk organizer for Zooomr. Edit tags, privacy, license settings, titles and descriptions, rotates and deletes too!
// @include        http://*.zooomr.com
// @include        http://*.zooomr.com/*
// ==/UserScript==

(function() {

var $ = unsafeWindow.$;
var $$ = unsafeWindow.$$;
var $A = unsafeWindow.$A;
var ZAPI = unsafeWindow.ZAPI;
var json_parse = unsafeWindow.json_parse;
var gettext = unsafeWindow.gettext;
var global_nsid = unsafeWindow.global_nsid;
var _site_root = unsafeWindow._site_root;
var _photo_root = unsafeWindow._photo_root;
var _images_root = unsafeWindow._images_root;
var _css_root = unsafeWindow._css_root;
var _per_page = 30;
var _search_term = '';
var _photoset_id = 0;

var MODE_GETALL = 'getall';
var MODE_SEARCH = 'search';
var MODE_PHOTOSET = 'photoset';

if (global_nsid == '00@Z01') {
	return;	// not logged in
}

var navtab_organizer = document.createElement('li');
navtab_organizer.id = 'navtab_organizer';
navtab_organizer.innerHTML = '<span><img width="16" height="16" src="' + _images_root + 'silk/tag_blue_edit.png" style="margin-right: 2px;"><a href="/organizer/">Organize</a></span>';

$('navtab_you').insert({ before: navtab_organizer });

var windowlocation = new String(unsafeWindow.location);
if (windowlocation.indexOf('zooomr.com/organizer') == -1) {
	return;	// not on organizer page
}

var qstring = window.location.search;
if (qstring && !isNaN(qstring.substring(10))) {
	_per_page = new Number(qstring.substring(10));
}

/* 
	CSS Stuff
*/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#photoDisplay { width: 500px; overflow: hidden; float: left; margin-bottom: 3px; }');
addGlobalStyle('#sidebarDiv { width: 300px; overflow: hidden; float: left; }');
addGlobalStyle('#organizerEditor { font-size: 12px; width: 280px; float: left; margin-bottom: 5px;}');
addGlobalStyle('#organizerEditor legend { font-size: 14px; }');
addGlobalStyle('#organizerSearch { font-size: 12px; width: 280px; float: left; margin-bottom: 2px;}');
addGlobalStyle('#organizerSearch legend { font-size: 14px; }');
addGlobalStyle('.pagelink { margin-right: 3px; }');
addGlobalStyle('div.toggle { width: 50%; text-align: right; font-size: 12px; margin-bottom: 3px; float: left; }');
addGlobalStyle('div.pageSize { width: 50%; text-align: left; font-size: 12px; margin-bottom: 3px; float: left; }');
addGlobalStyle('.itghdr { border: 1px solid silver; padding: 3px; vertical-align:top; margin-top: 8px; }');
addGlobalStyle('.itgcontent { border: 1px solid silver; border-top: 0px; padding: 5px; vertical-align: top; margin-left: 2px; margin-right: 2px; }');
addGlobalStyle('#ed_hdr_find { background:url(' + _images_root + 'silk/magnifier.png) 2px 2px no-repeat; padding-left: 18px; }');
addGlobalStyle('#ed_hdr_labels { background:url(' +  _images_root + 'silk/tag_green.png) 2px 2px no-repeat; padding-left: 18px; }');
addGlobalStyle('#ed_hdr_privacy { background:url(' + _images_root + 'silk/lock.png) 2px 2px no-repeat; padding-left: 18px; }');
addGlobalStyle('#ed_hdr_license { background:url(' + _images_root + 'silk/copyright.png) 2px 2px no-repeat; padding-left: 18px; }');
addGlobalStyle('#ed_hdr_rotate { background:url(' + _images_root + 'silk/arrow_rotate_clockwise.png) 2px 2px no-repeat; padding-left: 18px; }');
addGlobalStyle('#ed_hdr_meta { background:url(' + _images_root + 'silk/vcard.png) 2px 2px no-repeat; padding-left: 20px; }');


/* 
	Saves tags for selected photos
*/
function saveLabels() {
	var photoCheckboxes = $$('input.PhotoSelector');
	var photoCount = 0;
	$('labels_save').hide();
	$('labels_progress').show();
	
	var successLabels = function(t) {
		if (photoCount == 0) {
			$('labels_save').show();
			$('labels_progress').hide();
		}
	}
	
	for (var i = 0; i < photoCheckboxes.length; i++) {
		var photo = photoCheckboxes[i];
		var newTags = $('labels_input').value;
		
		if (photo.checked) {
			photoCount++;
			ZAPI.callMethodJSON( 'zooomr.photos.addtags'
				, {photo_id: photo.value, tags: newTags}
				, {'onSuccess': function(t) { photoCount--; successLabels(t); } }
			);
		}
	}
} // end: function saveLabels()


/* 
	Saves privacy settings for selected photos
*/
function savePrivacy() {
	var photoCheckboxes = $$('input.PhotoSelector');
	var photoCount = 0;
	$('privacy_save').hide();
	$('privacy_progress').show();
	
	var successPrivacy = function(t) {
		if (photoCount == 0) {
			$('privacy_save').show();
			$('privacy_progress').hide();
		}
	};
	
	for (var i = 0; i < photoCheckboxes.length; i++) {
		var photo = photoCheckboxes[i];
		data = {photo_id:photo.value, is_public:($('is_private').checked ? 0 : 1), is_friend:($('is_friend').checked ? 1 : 0), is_family:($('is_family').checked ? 1 : 0) };

		if (photo.checked) {
			photoCount++;
			ZAPI.callMethodJSON( 'zooomr.photos.setPerms'
				, data
				, {'onSuccess': function(t) { photoCount--; successPrivacy(t); } }
			);
		}
	}
} // end: function savePrivacy()

unsafeWindow.change_privacy_form = function (setting) {
	$('is_friend').disabled = setting;
	$('is_family').disabled = setting;
	if (setting == 1) {
		$('is_friend').checked = false;
		$('is_family').checked = false;
	}	
	$('is_private').checked = !(setting ==1);
	$('is_public').checked = (setting ==1);
};


/* 
	Saves license for selected photos
*/
function saveLicense() {
	var photoCheckboxes = $$('input.PhotoSelector');
	var photoCount = 0;
	$('license_save').hide();
	$('license_progress').show();
	
	var successLabels = function(t) {
		if (photoCount == 0) {
			$('license_save').show();
			$('license_progress').hide();
		}
	}
	
	for (var i = 0; i < photoCheckboxes.length; i++) {
		var photo = photoCheckboxes[i];
		var newLicense = $('license_edit').value;
		
		if (photo.checked) {
			photoCount++;
			ZAPI.callMethodJSON( 'zooomr.photos.licenses.setLicense'
				, {photo_id: photo.value, license_id: newLicense}
				, {'onSuccess': function(t) { photoCount--; successLabels(t); } }
			);
		}
	}
} // end: function saveLicense()

/*
	Rotates selected photos
*/
function rotatePhotos(direction) {

	var photoCheckboxes = $$('input.PhotoSelector');
	var photoCount = 0;
	var angle = '';
	var arrayPhotos = new Array();
	
	switch (direction) {
		case 'cw':
			angle = '90';
			break;
		case 'ccw':
			angle = '270'
			break;
	}
	
	if (angle == '') { return; }
	
	var successRotatePhoto = function() {

		if (photoCount == 0) {
			$('rotate_' + direction + '_save').show();
			$('rotate_' + direction + '_progress').hide();
			for (var i = 0; i < arrayPhotos.length; i++) {
				$('container_' + arrayPhotos[i]).update($('container_' + arrayPhotos[i]).innerHTML);
			}
		}
	};
	
	$('rotate_' + direction + '_save').hide();
	$('rotate_' + direction + '_progress').show();
	
	for (var i = 0; i < photoCheckboxes.length; i++) {
		var photo = photoCheckboxes[i];			
		if (photo.checked) {
			var pid = photo.value;
			arrayPhotos[photoCount] = pid;
			photoCount++;
			ZAPI.callMethodJSON( 'zooomr.photos.transform.rotate'
				, {photo_id: pid, degrees: angle}
				, {'onSuccess': function(t) { photoCount--; successRotatePhoto(); } }
			);
		}
	}


} //end: function rotatePhotos()

/*
	Mass deletes selected photos
*/
function deletePhotos() {

	if (confirm( gettext("Are you sure you want to delete these photos? This action cannot be undone!") ) ) {
	
		var photoCheckboxes = $$('input.PhotoSelector');
		var photoCount = 0;
		var arrayPhotos = new Array();

		$('delete_save').hide();
		$('delete_progress').show();
		
		var successDeletePhotos = function() {
			
			if (photoCount == 0) {
				$('delete_save').show();
				$('delete_progress').hide();
				for (var i = 0; i < arrayPhotos.length; i++) {
					$('container_' + arrayPhotos[i]).remove();
				}
			}
		};
		
		for (var i = 0; i < photoCheckboxes.length; i++) {
			var photo = photoCheckboxes[i];			
			if (photo.checked) {
				var pid = photo.value;
				arrayPhotos[photoCount] = pid;
				photoCount++;
				ZAPI.callMethodJSON( 'zooomr.photos.delete'
					, {photo_id: pid}
					, {'onSuccess': function(t) { photoCount--; successDeletePhotos(); } }
				);
			}
		}
	} 

} // end: function deletePhotos()

/*
	Get Photos
*/
function getPhotos(isFirstLoad) {
	if (!isFirstLoad) {
		// hide stuff
		$('getall_button').hide();
		$('getall_progress').show();
	}
	ZAPI.callMethodJSON( 'zooomr.people.getPhotos', {user_id:global_nsid, per_page: _per_page, page: '1'} ,  {onSuccess: successGetPhotos});
}
/* 
	Search Photos 
*/
function searchPhotos() {
	_search_term = $('search_input').value;
	if (_search_term == '') {
		return;
	}
	$('search_button').hide();
	$('search_progress').show();
	ZAPI.callMethodJSON( 'zooomr.photos.search', {query: _search_term, user_id:global_nsid, per_page: _per_page, page: '1'} ,  {onSuccess: successSearchPhotos});
}

/* 
	Get PhotoSet/SmartSet Photos 
*/
function getPhotoSetPhotos() {
	_photoset_id = $('photoset_list').value;
	if (_photoset_id == '0') {
		return;
	}
	$('photoset_get').hide();
	$('photoset_progress').show();
	ZAPI.callMethodJSON( 'zooomr.photosets.getPhotos', {photoset_id: _photoset_id, per_page: _per_page, page: '1'} ,  {onSuccess: successGetPhotosetPhotos});
}


var getSmartSetsList = function(pageIndex) {
	
	var successGetSetsList = function(t) {
		var data = json_parse(t.responseText);
		for (i = 0; i < data.photosets._content.photoset.length; i++) {

			var photoSetOption = document.createElement('option');
			photoSetOption.value = data.photosets._content.photoset[i].id;
			photoSetOption.innerHTML =  data.photosets._content.photoset[i].title._content;
			$('photoset_list').appendChild(photoSetOption);
		}
		if (data.photosets.page != data.photosets.pages) {	// there are more sets
			var newPageIndex = parseInt(data.photosets.page) + 1;
			getSmartSetsList(newPageIndex);
		} else {
			$('photoset_progress').hide();
			$('photoset_get').show();
		}
	}; // end: successGetSetsList
	
	ZAPI.callMethodJSON( 'zooomr.photosets.getList', {user_id: global_nsid, per_page: '500', page: pageIndex}, {'onSuccess': successGetSetsList});
} // end: getSmartSetsList

/*
	Page Link listener
*/
function pageTo(e) {
	var pageNum = e.target.getAttribute('pagenum');
	var mode = e.target.getAttribute('mode');
	
	$('break').remove();
	$('pager').remove();
	$('photoListing').innerHTML = '<img src="' + _images_root + 'tidbits/bar_throbber.gif">';

	switch (mode) {
		case MODE_GETALL:
			ZAPI.callMethodJSON( 'zooomr.people.getPhotos', {user_id:global_nsid, per_page: _per_page, page: pageNum} ,  {onSuccess: successGetPhotos});
			break;
		case MODE_SEARCH:
			ZAPI.callMethodJSON( 'zooomr.photos.search', {query: _search_term, user_id:global_nsid, per_page: _per_page, page: pageNum} ,  {onSuccess: successSearchPhotos});
			break;
		case MODE_PHOTOSET:
			ZAPI.callMethodJSON( 'zooomr.photosets.getPhotos', {photoset_id: _photoset_id, per_page: _per_page - 1, page: pageNum} ,  {onSuccess: successGetPhotosetPhotos});
			break;
	}
}

/*
	Delete Link listener - not used
*/
function deletePhoto(e) {

	var photo_id = e.target.getAttribute('pid');
	var successDeletePhoto = function(t) {
		$('container_' + photo_id).remove();
	};
	
	if ( confirm( gettext("Are you sure you want to delete this photo? This action cannot be undone!") ) ) {
		$('photoDelete_' + photo_id).hide();
		$('photoProgress_' + photo_id).show();
		ZAPI.callMethodJSON( 'zooomr.photos.delete', {photo_id : photo_id } ,  {onSuccess: successDeletePhoto});
	} 
}

/*
	Edit Photo
*/
function editPhoto(e) {
	var photo_id = e.target.getAttribute('pid');
	
	var successGetPhoto = function(t) {
		var data = json_parse(t.responseText);
		$('photoID').value = photo_id;
		$('photoTitle').value = data.photo.title._content;
		$('photoDescription').value = data.photo.description._content;
		$('metaEditor').show();
		$('bulkEditor').hide();
		
		$('photoEdit_' + photo_id).show();
		$('photoProgress_' + photo_id).hide();
	};

	$('photoEdit_' + photo_id).hide();
	$('photoProgress_' + photo_id).show();
	
	ZAPI.callMethodJSON('zooomr.photos.getInfo', {photo_id : photo_id } ,  {onSuccess: successGetPhoto});
}

function cancelEditPhoto() {
	$('metaEditor').hide();
	$('bulkEditor').show();    
}

function saveEditPhoto() {
	var successSaveEditPhoto = function(t) {
		alert('Saved!');
		cancelEditPhoto();
		$('meta_save').show();
		$('meta_progress').hide();

	}

	$('meta_save').hide();
	$('meta_progress').show();

	ZAPI.callMethodJSON('zooomr.photos.setMeta', {photo_id : $('photoID').value, title: $('photoTitle').value, description: $('photoDescription').value } ,  {onSuccess: successSaveEditPhoto});	

}

/*
	Shows/Hides the Editor Section
*/
unsafeWindow.toggleSection = function (section) {
	$('ed_content_' + section).toggle();
	if ($('ed_content_' + section).visible()) {
		$('ed_toggle_' + section).src =  _images_root + 'silk/bullet_toggle_minus.png';
	} else {
		$('ed_toggle_' + section).src =  _images_root + 'silk/bullet_toggle_plus.png';
	}
};

/*
	Displays photos retrieved
*/
function renderPhotoListing(data, mode) {

	if ($('photoListing') != undefined) { $('photoListing').remove(); }
	if ($('break') != undefined) { $('break').remove(); }
	if ($('pager') != undefined) { $('pager').remove(); }

	var photoListing = document.createElement('div');
	photoListing.id = 'photoListing';
	photoListing.innerHTML = '<div class="pageSize">Show <a href="?pageSize=30">30</a> | <a href="?pageSize=150">150</a> | <a href="?pageSize=300">300</a></div>';
	photoListing.innerHTML += '<div class="toggle">Select All <input id="selectall" onClick="toggleAll();" type="checkbox"></div>';
	photoDisplay.appendChild(photoListing);
	
	var startIndex = 0;
	if (mode == MODE_PHOTOSET) {
		startIndex = 1;
	}
	for (i = startIndex; i < data.photos.photo.length; i++) {
		var photoSrc = _photo_root + data.photos.photo[i].id + '_' + data.photos.photo[i].secret + '_s.jpg';
		
		var imgDiv = document.createElement('div');
		imgDiv.id = 'container_' + data.photos.photo[i].id;
		imgDiv.setAttribute('class', 'SqStreamBit float ImageContainer');
		//imgDiv.setAttribute('onmouseout',"$('extraspace_" + data.photos.photo[i].id + "').style.display='none';");
		//imgDiv.setAttribute('onmouseover',"$('extraspace_" + data.photos.photo[i].id + "').style.display='block';");
		
		var imgLink = document.createElement('a');
		imgLink.setAttribute('class','image_link');
		imgLink.setAttribute('title', data.photos.photo[i].title);
		imgLink.href = unsafeWindow.photos_url + data.photos.photo[i].id + '/';
		
		var img = document.createElement('img');
		img.setAttribute('src', photoSrc);
		img.setAttribute('title', data.photos.photo[i].title);
		img.setAttribute('alt', data.photos.photo[i].title);
		img.setAttribute('width', '75');
		img.setAttribute('height', '75');
		
		var imgPitBox = document.createElement('div');
		imgPitBox.id = 'extraspace_' + data.photos.photo[i].id;
		imgPitBox.setAttribute('class','ImagePitBox');
		imgPitBox.setAttribute('style','display: block;');
		imgPitBox.innerHTML = '<input class="PhotoSelector" type="checkbox" value="' + data.photos.photo[i].id + '" id="select_' + data.photos.photo[i].id + '" name="select_' + data.photos.photo[i].id + '"/>'
//			+ '<a id="photoDelete_' + data.photos.photo[i].id + '" class="iconlink deletelink" title="Delete" alt="Delete" pid="' + data.photos.photo[i].id + '" href="javascript:void(0);"><img pid="' + data.photos.photo[i].id + '" title="Delete" alt="Delete" src="' + _images_root + 'silk/cross.png"></a>'
			+ '<img style="display: none;" id="photoProgress_' + data.photos.photo[i].id + '" style="display: none; margin-left: 3px;" src="' + _images_root + 'tidbits/progress.gif' + '">'
			+ '<a id="photoEdit_' + data.photos.photo[i].id + '" class="iconlink editlink" title="Edit" alt="Edit" pid="' + data.photos.photo[i].id + '" href="javascript:void(0);"><img pid="' + data.photos.photo[i].id + '" title="Edit" alt="Edit" src="' + _images_root + 'silk/pencil.png"></a>'
			;
		
		imgLink.appendChild(img);
		imgDiv.appendChild(imgLink);
		imgDiv.appendChild(imgPitBox);
		
		photoListing.appendChild(imgDiv);
	}	
	
	/* ---------------- Paging ------------------- */
	photoDisplay.innerHTML += '<br id="break" clear="all">';
	var totalPages = parseInt(data.photos.pages); 
	var currentPage = parseInt(data.photos.page); 
	var nextPage = ((currentPage == totalPages) ? currentPage : currentPage + 1); 
	var prevPage = ((currentPage == 1) ? currentPage : currentPage - 1); 
	var lowerBound = (((currentPage - 4 ) > 1) ? (currentPage - 3)  : 1);
	var upperBound = (((currentPage + 4) < totalPages) ? (currentPage + 3)  : totalPages);
	
	var pages = document.createElement('div');
	pages.id = "pager";
	pages.setAttribute('class','Pages');
	
	// Previous Link
	pages.innerHTML += ((currentPage > 1) ? '<a class="Prev pagelink" href="javascript: void(0);" mode="' + mode + '" pagenum="' + prevPage + '">< Previous</a>' : '<span class="StartBit">< Previous</span>');
	if (lowerBound >  1) {
		pages.innerHTML += ((currentPage == 1) ? '<span class="this-page">' + 1 + '</span>' : '<a class="pagelink" href="javascript: void(0);" mode="' + mode + '" pagenum="' + 1 + '">' + 1 + '</a>');
		pages.innerHTML += '<span class="break">...</span>';
	}
	for (i = lowerBound; i <= upperBound; i++) {
		pages.innerHTML += ((currentPage == i) ? '<span class="this-page">' + i + '</span>' : '<a class="pagelink" href="javascript: void(0);" mode="' + mode + '" pagenum="' + i + '">' + i + '</a>');
	}
	if (upperBound < totalPages) {
		pages.innerHTML += '<span class="break">...</span>';
		pages.innerHTML += ((currentPage == totalPages) ? '<span class="this-page">' + totalPages + '</span>' : '<a class="pagelink" href="javascript: void(0);" mode="' + mode + '" pagenum="' + totalPages + '">' + totalPages + '</a>');
	}
	// Next Link
	pages.innerHTML += ((currentPage < totalPages) ? '<a class="Next pagelink" href="javascript: void(0);" mode="' + mode + '" pagenum="' + nextPage + '">Next ></a>' : '<span class="EndBit">Next ></span>');		
	pages.innerHTML = '<div class="Paginator">' + pages.innerHTML +'</div>' + '<div class="Results">(' + data.photos.total + ' Photos)</div>';
	photoDisplay.appendChild(pages);
	/* ---------------- Paging ------------------- */
	
	// Hook up page links click
	var pageLinks = $$('a.pagelink');
	for (var i = 0; i < pageLinks.length; i++) {
		pageLinks[i].addEventListener('click', pageTo, false);
	}
	
	// Hook up delete clicks
	var deleteLinks = $$('a.deletelink');
	for (var i = 0; i < deleteLinks.length; i++) {
		deleteLinks[i].addEventListener('click', deletePhoto, false);
	}

	// Hook up edit clicks
	var editLinks = $$('a.editlink');
	for (var i = 0; i < editLinks.length; i++) {
		editLinks[i].addEventListener('click', editPhoto, false);
	}


} //end: function renderPhotoListing(data)

/* 
	Setup page
 */
document.title = 'Zooomr Simple Organizer';
$('content').innerHTML = '';


/* Photos Display Area */
var photoDisplay = document.createElement('div');
photoDisplay.id = 'photoDisplay';
photoDisplay.innerHTML = '<h3>Your Photos</h3>';
photoDisplay.setAttribute('class','theme_zipline_bubble');
$('content').appendChild(photoDisplay);

/* SideBar */
var sidebarDiv = document.createElement('div');
sidebarDiv.id = 'sidebarDiv';

/* Search/Filter Area */
var organizerSearch = document.createElement('div');
organizerSearch.id = 'organizerSearch';
organizerSearch.setAttribute('class','theme_zipline_bubble');
organizerSearch.innerHTML = ''
	+ '<div>'
// FIND
	+ '<div id="ed_hdr_find" class="itghdr">'
	+ '<span style="float: right;"><a onclick="this.blur(); toggleSection(\'find\');" class="iconlink" href="javascript: void(0);"><img id="ed_toggle_find" src="' + _images_root + 'silk/bullet_toggle_minus.png' + '"></span>'
	+ '<h4><a onclick="this.blur(); toggleSection(\'find\');" class="smalllink_ltgrey" href="javascript: void(0);">Find</a></h4>'
	+ '</div>' 
	+ '<div id="ed_content_find" class="itgcontent" >'
	+ '<div>'
	+ 'Labels: <input id="search_input" type="text" size="25" value="" style="font-size: 12px;"/>'
	+ '<input id="search_button" class="sm_button" type="button" value="SEARCH" style="margin-left: 3px;"/>'
	+ '<img style="display: none; margin-left: 3px;" id="search_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '</div>'
	+ '<div style="margin-top: 5px;">'
	+ 'SmartSets: <br/><select id="photoset_list" style="font-size: x-small;" name="photoset_list">'
	+ '<option selected="" value="0">-- select --</option>'
	+ '</select>'
	+ '<br/>'
	+ '<input id="photoset_get" class="sm_button" type="button" value="LIST PHOTOS" style="margin-top: 3px;"/>'
	+ '<img style="display: none; margin-top: 3px;" id="photoset_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '<br style="margin-top="5px;" />'
	+ '<input id="getall_button" class="sm_button" type="button" value="Search is for wimps, I want EVERYTHING!" style="margin-top: 15px;"/>'
	+ '<img style="display: none; margin-top: 15px;" id="getall_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '</div>'
	+ '</div>';
//$('content').appendChild(organizerSearch);
sidebarDiv.appendChild(organizerSearch);

/* Editor Area */
var organizerEditor = document.createElement('div');
organizerEditor.id = 'organizerEditor';
organizerEditor.setAttribute('class','theme_zipline_bubble');
organizerEditor.innerHTML = ''
	+ '<div id="bulkEditor">'
// LABELS
	+ '<div id="ed_hdr_labels" class="itghdr">'
	+ '<span style="float: right;"><a onclick="this.blur(); toggleSection(\'labels\');" class="iconlink" href="javascript: void(0);"><img id="ed_toggle_labels" src="' + _images_root + 'silk/bullet_toggle_minus.png' + '"></span>'
	+ '<h4><a onclick="this.blur(); toggleSection(\'labels\');" class="smalllink_ltgrey" href="javascript: void(0);">Labels / Tags</a></h4>'
	+ '</div>' 
	+ '<div id="ed_content_labels" class="itgcontent" >'
	+ '<input id="labels_input" type="text" size="30" value="" style="font-size: 12px;"/>'
	+ '<input id="labels_save" class="sm_button" type="button" value="ADD" style="margin-left: 3px;"/>'
	+ '<img style="display: none; margin-left: 3px;" id="labels_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '</div>'
// PRIVACY
	+ '<div id="ed_hdr_privacy" class="itghdr">'
	+ '<span style="float: right;"><a onclick="this.blur(); toggleSection(\'privacy\');" class="iconlink" href="javascript: void(0);"><img id="ed_toggle_privacy" src="' + _images_root + 'silk/bullet_toggle_plus.png' + '"></span>'
	+ '<h4><a onclick="this.blur(); toggleSection(\'privacy\');" class="smalllink_ltgrey" href="javascript: void(0);">Privacy</a></h4>'
	+ '</div>' 
	+ '<div id="ed_content_privacy" class="itgcontent" style="display: none;" >'
	+ '<input id="is_private" type="radio" value="0" name="is_private" onClick="change_privacy_form(0);" onChange="change_privacy_form(0);">'
	+ '<label for="is_private">'
	+ '<img border="0" margin-left="2px" margin-right="2px" width="16" height="16" style="vertical-align: middle;" alt="Mark as Private" src="' + _images_root + 'silk/lock.png">Mark as Private'
	+ '</label>'
	+ '<br/>'
	+ '<div style="padding-left: 20px;">'
	+ '<input id="is_friend" type="checkbox" value="1" name="is_friend"/>'
	+ '<label for="is_friend">'
	+ '<img border="0" width="16" height="16" style="vertical-align: middle;" alt="Visible to Friends" src="' + _images_root + 'silk/key_add.png">Visible to Friends'
	+ '</label>'
	+ '<br/>'
	+ '<input id="is_family" type="checkbox" value="1" name="is_family"/>'
	+ '<label for="is_family">'
	+ '<img border="0" margin-left="2px" margin-right="2px" width="16" height="16" style="vertical-align: middle;" alt="Visible to Family" src="' + _images_root + 'silk/key_add.png">Visible to Family'
	+ '</label></div>'
	+ '<input id="is_public" type="radio" value="0" name="is_public" onClick="change_privacy_form(1);" onChange="change_privacy_form(1);">'
	+ '<label for="is_public">'
	+ '<img border="0" margin-left="2px" margin-right="2px" width="16" height="16" style="vertical-align: middle;" alt="Mark as Public" src="' + _images_root + 'silk/lock_open.png"/>Mark as Public'
	+ '</label>'
	+ '<br/>'
	+ '<input id="privacy_save" class="sm_button" type="button" value="SAVE" style="margin-top: 3px;"/>'
	+ '<img margin-left="2px" margin-right="2px" width="10" height="10" style="display: none; margin-top: 3px;" id="privacy_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '</div>'
// LICENSE
	+ '<div id="ed_hdr_license" class="itghdr">'
	+ '<span style="float: right;"><a onclick="this.blur(); toggleSection(\'license\');" class="iconlink" href="javascript: void(0);"><img id="ed_toggle_license" src="' + _images_root + 'silk/bullet_toggle_plus.png' + '"></span>'
	+ '<h4><a onclick="this.blur(); toggleSection(\'license\');" class="smalllink_ltgrey" href="javascript: void(0);">License</a></h4>'
	+ '</div>' 
	+ '<div id="ed_content_license" class="itgcontent" style="display: none;" >'
	+ '<select id="license_edit" style="font-size: x-small;" name="license_edit">'
	+ '<option selected="" value="0">None (All rights reserved)</option>'
	+ '<option value="1">Attribution License</option>'
	+ '<option value="2">Attribution-NoDerivs License</option>'
	+ '<option value="3">Attribution-NonCommercial-NoDerivs License</option>'
	+ '<option value="4">Attribution-NonCommercial License</option>'
	+ '<option value="5">Attribution-NonCommercial-ShareAlike License</option>'
	+ '<option value="6">Attribution-ShareAlike License</option>'
	+ '</select>'
	+ '<br/>'
	+ '<input id="license_save" class="sm_button" type="button" value="SAVE" style="margin-top: 3px;"/>'
	+ '<img style="display: none; margin-top: 3px;" id="license_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '</div>'
// ROTATE
	+ '<div id="ed_hdr_rotate" class="itghdr">'
	+ '<span style="float: right;"><a onclick="this.blur(); toggleSection(\'rotate\');" class="iconlink" href="javascript: void(0);"><img id="ed_toggle_rotate" src="' + _images_root + 'silk/bullet_toggle_plus.png' + '"></span>'
	+ '<h4><a onclick="this.blur(); toggleSection(\'rotate\');" class="smalllink_ltgrey" href="javascript: void(0);">Rotate / Delete</a></h4>'
	+ '</div>' 
	+ '<div id="ed_content_rotate" class="itgcontent" style="display: none;" >'
	+ '<a id="delete_save" class="iconlink" title="Delete Photos" alt="Delete Photos" href="javascript:void(0);"><img title="Delete Photos" alt="Delete Photos" src="' + _images_root + 'silk/cross.png"> Delete Photos</a>'
	+ '<img class="iconlink" width="10" height="10" style="display: none;" id="delete_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '<br/><a id="rotate_ccw_save" class="iconlink" title="Rotate Photos 90°CCW" alt="Rotate Photos 90°CCW" href="javascript:void(0);"><img title="Rotate Photos 90°CCW" alt="Rotate Photos 90°CCW" src="' + _images_root + 'silk/arrow_rotate_anticlockwise.png"> Rotate Photos 90°CCW</a>'
	+ '<img class="iconlink" width="10" height="10" style="display: none;" id="rotate_ccw_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '<br/><a id="rotate_cw_save" class="iconlink" title="Rotate Photos 90°CW" alt="Rotate Photos 90°CW" href="javascript:void(0);"><img title="Rotate Photos 90°CW" alt="Rotate Photos 90°CW" src="' + _images_root + 'silk/arrow_rotate_clockwise.png"> Rotate Photos 90°CW</a>'
	+ '<img class="iconlink" width="10" height="10" style="display: none;" id="rotate_cw_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '</div>'
	+ '</div>'
// META
	+ '<div id="metaEditor" style="display: none">'
	+ '<div id="ed_hdr_meta" class="itghdr">'
	+ '<h4>Title / Description</h4>'
	+ '</div>'
	+ '<div id="ed_content_meta" class="itgcontent" >'
	+ '<label for="photoTitle" style="margin-right: 3px;">Title</label>'
	+ '<input type="text" id="photoTitle" size="30">'
	+ '<input type="hidden" id="photoID">'
	+ '<div id="photoPlaceholder"></div>'
	+ '<label for="photoDescription" style="display: block;">Description</label>'
	+ '<textarea id="photoDescription" rows="8" style="width: 95%;" ></textarea>'
	+ '<br/><input id="meta_save" class="sm_button" type="button" value="SAVE" style="margin-top: 3px;"/>'
	+ '<img style="display: none; margin-left: 3px;" id="meta_progress" src="' + _images_root + 'tidbits/progress.gif' + '">'
	+ '<input id="meta_cancel" class="sm_button" type="button" value="CANCEL" style="margin-left: 3px;"/>'
	+ '</div>'
	+ '</div>';

//$('content').appendChild(organizerEditor);
sidebarDiv.appendChild(organizerEditor);
$('content').appendChild(sidebarDiv);

/* Hook up the buttons */
$('labels_save').addEventListener('click', saveLabels, false);
$('privacy_save').addEventListener('click', savePrivacy, false);
$('license_save').addEventListener('click', saveLicense, false);

$('delete_save').addEventListener('click', deletePhotos, false);
$('rotate_ccw_save').addEventListener('click', function() {rotatePhotos('ccw'); }, false);
$('rotate_cw_save').addEventListener('click', function() {rotatePhotos('cw'); }, false);


$('search_button').addEventListener('click', searchPhotos, false);
$('photoset_get').addEventListener('click', getPhotoSetPhotos, false);
$('getall_button').addEventListener('click', function() { getPhotos(false); }, false);

$('meta_save').addEventListener('click', saveEditPhoto, false);
$('meta_cancel').addEventListener('click', cancelEditPhoto, false);


/*
	Toggles the Select All
*/
unsafeWindow.toggleAll = function() {
	var photoCheckboxes = $$('input.PhotoSelector');
	for (var i = 0; i < photoCheckboxes.length; i++) {
		photoCheckboxes[i].checked = $('selectall').checked;
	}
}

/*
	Get all photos
*/
var successGetPhotos = function(t) {
	var data = json_parse(t.responseText);
	$('getall_button').show();
	$('getall_progress').hide();
	renderPhotoListing(data, MODE_GETALL);
}

/* 
	Search photos
*/
var successSearchPhotos = function(t) {
	$('search_button').show();
	$('search_progress').hide()
	var data = json_parse(t.responseText);
	renderPhotoListing(data, MODE_SEARCH);
}

/*
	Get Photoset photos
*/
var successGetPhotosetPhotos = function(t) {
	$('photoset_get').show();
	$('photoset_progress').hide()
	var data = json_parse(t.responseText);
	data.photos = data.photoset;
	renderPhotoListing(data, MODE_PHOTOSET);
}


// Load photos
unsafeWindow.setTimeout(
	function() { getPhotos(true); }
	, 1);

// Load sets
unsafeWindow.setTimeout(
	function() { 
		$('photoset_progress').show();
		$('photoset_get').hide();
		getSmartSetsList(1); 
	}
	, 1);

})();