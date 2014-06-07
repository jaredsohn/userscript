// ==UserScript==
// @name           Zooomr Infotag - Flickr
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Links your Zooomr photo to your Flickr one and allows you to synchronise Title/Description/Tags into Zooomr.
// @include        http://*.zooomr.com/photos/*/*/
// ==/UserScript==

(function() {
// reference of global context values
var $ = unsafeWindow.$;
var infotags = unsafeWindow.infotags;
var _INFO_TAGS = unsafeWindow._INFO_TAGS;
var infotag_widgets_init = unsafeWindow.infotag_widgets_init;
var infotag_widgets_add = unsafeWindow.infotag_widgets_add;
var infotag_widgets_save = unsafeWindow.infotag_widgets_save;
var infotag_widgets_remove = unsafeWindow.infotag_widgets_remove;
var infotag_widgets_edit = unsafeWindow.infotag_widgets_edit;
var infotag_widgets_save_edit = unsafeWindow.infotag_widgets_save_edit;
var ZAPI = unsafeWindow.ZAPI;
var _ZGLOBAL = unsafeWindow._ZGLOBAL;
var global_nsid = unsafeWindow.global_nsid;

var isOwner = _ZGLOBAL[ _INFO_TAGS['_']['cnx'][ 'pid' ] ]['owner']['nsid'] == global_nsid;

var flickr_api_key = '';
var FLICKR_API_ENDPOINT = 'http://api.flickr.com/services/rest/';
var _photo_id, _photo_title, _photo_desc, _photo_tags;

/*
	API functions
*/
//flickr_api_key = GM_getValue('api_key');
flickr_api_key = '1ff7fb52de384c79e114461c0ebb90e0'; //updated 2008.02.10 - static API key

if (flickr_api_key == '' || flickr_api_key == undefined) {
	flickr_api_key = prompt('Set your Flickr API key:');
	GM_setValue('api_key',flickr_api_key);
}

if (flickr_api_key == '' || flickr_api_key == undefined) {
	return;
}

function setAPIKey() {
	var api_key = prompt('Set your Flickr API key:');
	api_key = api_key || '';
	GM_setValue("api_key", api_key);
}


/* 
	Widget form 
*/
var build_flickr_infowidget = function(photo_id, is_edit) {
    var content = '';
    var action = (is_edit ? 'save_edit(\'flickr\',\'photo_id\')' : 'save(\'flickr\')');
    if (_ZGLOBAL[ _INFO_TAGS['_']['cnx'][ 'pid' ] ]['owner']['nsid'] == global_nsid) {
		content += '<form onchange="infotags.' + action + '" action="javascript:void(0)" id="it_flickr_photoid_input">';
		content += 'Flickr Photo ID <input type="text" size="15" id="flickr_photoid" name="flickr_photoid" value="' + photo_id + '">';
		content += '<p style="font-size: 0.9em; padding-top: 3px;">You can extract the photo ID from your image URL, e.g. the photo ID is 123456 for the photo at http://www.flickr.com/photos/yourname/<font color="red">123456</font>/.</p>';
		content += '</form>';
	} else {
		content += '';
	}

    return content;
};

/*
	Retrieve Flickr info
*/
getFlickrPhotoInfo = function() {
		var dataRequest = "api_key=" + flickr_api_key + "&method=flickr.photos.getInfo&photo_id=" + _photo_id + "&format=json";
		GM_xmlhttpRequest({
      			method: 'GET',
      			url: FLICKR_API_ENDPOINT + "?" + dataRequest,
      			headers: {
      				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      				'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
      			},
      			data: null,
      			onload: handleFlickrPhotoGetInfoResponse
      		});
      		
}

/*
	Formats Flickr response for display
*/
function handleFlickrPhotoGetInfoResponse(responseDetails) {
	var resp = responseDetails.responseText.replace(/jsonFlickrApi\(/,'');
	var data = eval('('+resp);
	if (data.photo == undefined) {
		displayContent('<font color="red">Unable to retrieve Flickr information (Message: ' + data.message + ')</font>');
		return;
	}
	var content = '';
	//content += 'This photo has ' + data.photo.comments._content + ((data.photo.comments._content == 1) ? ' comment'   : ' comments' );
	//content += ' on <a target="_blank" href="' + data.photo.urls.url[0]._content + '">Flickr</a>. ';
	content += '<b>Title</b>: ' + data.photo.title._content;
	content += '<br/><b>Description</b>: ' + data.photo.description._content;
	if (data.photo.tags.tag.length > 0) {
		
		var tagContent = '';
		for (var i=0; i < data.photo.tags.tag.length; i++) {
			if (!data.photo.tags.tag[i].machine_tag) {
				tagContent += ((tagContent.length == 0) ? '' : ' ');
				tagContent += ((data.photo.tags.tag[i].raw.length == data.photo.tags.tag[i]._content.length) ? ''   : '"' );
				tagContent += data.photo.tags.tag[i].raw;
				tagContent += ((data.photo.tags.tag[i].raw.length == data.photo.tags.tag[i]._content.length) ? ''   : '"' );
			}
		}
		if (tagContent != '') { 
			content += '<br/><b>Tags</b>: ';
			content += tagContent;
		}
	}
	content += '<br/><a target="_blank" href="' + data.photo.urls.url[0]._content + '">Flickr Photo Page</a>';
	if (_ZGLOBAL[ _INFO_TAGS['_']['cnx'][ 'pid' ] ]['owner']['nsid'] == global_nsid) {
		content += ' <input id="infotag_flickr_synch" class="sm_button" type="submit" value="SYNCH"/> ';
	}
	
	displayContent(content);
	
	_photo_title = data.photo.title._content;
	_photo_description = data.photo.description._content;
	_photo_tags = tagContent;
	
	if (_ZGLOBAL[ _INFO_TAGS['_']['cnx'][ 'pid' ] ]['owner']['nsid'] == global_nsid) {
		var synchButton = document.getElementById('infotag_flickr_synch');
		synchButton.addEventListener('click', synchMeta, false);
	}
}

/*
	Helper function to display info
*/
function displayContent(content) {
	var widgetNav = document.getElementById('it_flickr_photo_id_content');
	var widgetContent = document.getElementById('it_flickr_photo_id_content_custom');
	if (widgetContent == undefined) {
		widgetContent = widgetNav.appendChild(document.createElement('div'));
		widgetContent.id = 'it_flickr_photo_id_content_custom';
	}
	widgetContent.innerHTML += content;
}

/*
	Synchs
*/
function synchMeta() {
	var successMeta = function() {
		_ZGLOBAL[ _INFO_TAGS['_']['cnx'][ 'pid' ] ]['title'] = _photo_title;
		_ZGLOBAL[ _INFO_TAGS['_']['cnx'][ 'pid' ] ]['description'] = _photo_description;
		$('phototitle_' + _INFO_TAGS['_']['cnx'][ 'pid' ]).innerHTML = _photo_title;
		$('photodesc_' + _INFO_TAGS['_']['cnx'][ 'pid' ]).innerHTML = _photo_description;
	};
	var successTags = function() {
		 infotags.refresh_node('labels');
	};
	if (confirm('Are you sure you wish to synchronize the Title, Description and Tags from Flickr?')) {
		ZAPI.callMethodJSON( 'zooomr.photos.setMeta', {photo_id: _INFO_TAGS['_']['cnx'][ 'pid' ], title: _photo_title, description: _photo_description} , {'onSuccess':successMeta});
		ZAPI.callMethodJSON( 'zooomr.photos.addtags', {photo_id: _INFO_TAGS['_']['cnx'][ 'pid' ], tags: _photo_tags}, {'onSuccess':successTags});
	}
}

/*
 * event handler when initializing flickr tag widget
 */

infotag_widgets_init["flickr"] = function (key, data) {
    var content = ''; //The Master Content of the Widget
    var icon = 'http://www.flickr.com/favicon.ico'; // The name of the icon we want to use
    var title = 'Flickr'; // The Title of the InfoWIdget
    if ('photo_id' in data) { 
		content = infotags.build_sub(data['photo_id'] , '',
                                     { title : 'Photo ID: ' + data[ 'photo_id' ].data, //Title of the Node
                                       canRemove: isOwner, //Can we remove this Node?
                                       canEdit: isOwner // Can we edit this node?
                                     });
		_photo_id = data[ 'photo_id' ].data;
		unsafeWindow.setTimeout(getFlickrPhotoInfo, 1);

    } else { //No data, set defaults
        content = '';
    }
    var titlebar = {"id" : key, // The InfoTag's class/key (mood)
                   "icon": icon, // The Icon we wish to use
                   "title" : title, // The Title we wish to use
                   'content' : content, // Our Widget's Content
                   'collapsed' : true, // Does this widget start collapsed?
                   'add_allow': !('photo_id' in data)}; // Don't allow users to add anything if we already have data
    return titlebar;
};

/*
 * event handler when showing
 */
infotag_widgets_add['flickr'] = function (key, add_container) {
    infotags.add_prep( key );
    var photo_id = '';
    add_container.update(build_flickr_infowidget('', false));
};

/*
 * event handler when saving
 */
infotag_widgets_save['flickr'] = function (key, add_container) {
	var photoID = $('flickr_photoid').value;
    infotags.saving_prep(key); //show saving icon
    // define update event handler
    var success = function(t) {
        infotags.refresh_node( key );
    };
    ZAPI.callMethodJSON( 'zooomr.photos.addtags', {photo_id: _INFO_TAGS['_']['cnx'][ 'pid' ], tags: 'flickr:photo_id=' + photoID}, {'onSuccess':success});
};

/* 
 * event handler when editing
*/

infotag_widgets_edit['flickr'] = function (key, dict, add_container) {
	infotags.edit_prep( key, dict);
	var photo_id = '';
    
    if (_INFO_TAGS.flickr && _INFO_TAGS.flickr['photo_id']) {
        photo_id = _INFO_TAGS.flickr['photo_id'].data;
    }
    add_container.update(build_flickr_infowidget(photo_id, true));
};

/* 
 * event handler when saving edit
*/
infotag_widgets_save_edit['flickr'] = function (key, dict, add_container) {
    var photoID = $('flickr_photoid').value;
    infotags.editing_prep(key, dict);
    var success = function(t) {
      ZAPI.callMethodJSON( 'zooomr.photos.addtags', {photo_id: _INFO_TAGS['_']['cnx'][ 'pid' ], tags: 'flickr:photo_id=' + photoID}, {'onSuccess': function() { infotags.refresh_node( key ) }});
    };
	ZAPI.callMethodJSON( 'zooomr.photos.removetag', {tag_id: _INFO_TAGS[key]['photo_id']['id']}, {'onSuccess':success});	
};


//Activate ReInit
if ((_INFO_TAGS.flickr && _INFO_TAGS.flickr['photo_id']) 
	|| isOwner) {
	infotags.init_node('flickr');
}

 
})();