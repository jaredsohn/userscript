//
// ==UserScript==
// @name			Ford Focus Club Service Pack
// @author		joedm
// @namespace		http://ffclub.ru/
// @description	Ford Focus Club Service Pack
// @include		http://ffclub.ru/*
// @version    1.5
// @run-at		document-end
// ==/UserScript==

// Some code is from Dirty Service Pack 2 by Stasik0, BearOff, crea7or, flashface, slavka123

// opera requires putting the code into such function
(function () { 

var _$ = {
	settings: {},
	location: window.location.href.split(window.location.host)[1],
	ffcProfiles: [],
	
	// made by crea7or
	// start of SCRIPTS-71
	set_save: function(name,option) {
		if (name !== null) {
			_$.settings[name] = option;
		}
		localStorage.setItem('ffclubSp', jsonStringify(_$.settings));
	},
		
	set_get: function() {
		if(document.cookie.indexOf('ffc.settings=')  > -1) {
			var param = unescape(document.cookie.split('ffc.settings=')[1].split(";")[0]);
			eval("_$.settings=" + unescape(param));
			document.cookie = "ffc.settings=1; domain=.ffclub.ru; path=/; expires=Thu, 01-Jan-1970 00:34:13 GMT";
		} else {
			_$.settings = jsonParse(localStorGetItem('ffclubSp', "{}"));
		}
	},
 
	browser: function() {
	 
		var string = navigator.userAgent.toLowerCase();
		var params = null;
	 
		if(string.indexOf('opera/')>-1)
		params = {name:'opera',ver:string.split('opera/')[1].split(' ')[0]};
	 
		else if(string.indexOf('firefox/')>-1)
		params = {name:'firefox',ver:string.split('firefox/')[1].split(' ')[0]};
	 
		else if(string.indexOf('chrome/')>-1)
		params = {name:'chrome',ver:string.split('chrome/')[1].split(' ')[0]};
	 
		else if(string.indexOf('safari/')>-1)
		params = {name:'safari',ver:string.split('safari/')[1].split(' ')[0]};
	 
		else if(string.indexOf('msie ')>-1)
		params = {name:'ie',ver:string.split('msie ')[1].split(' ')[0]};
	 
		else params = {name:'unknown',ver:'unknown'};
	 
		return params;
	},
	 
	$: function(id) {
		return document.getElementById(id);
	},
	
	$t: function(name, obj) {
		var obj = obj || document;
		return obj.getElementsByTagName(name);
	},
	
	$c: function(name, obj, tagName) {
		var obj = obj || document;
		if(tagName == null) {
			return obj.querySelectorAll('*.' + name);
		} else {
			return obj.querySelectorAll(tagName + '.' + name);
		}
	},
	
	$f: function(name, element, val) {
		var element = element || false;
		var val = val || false;
		var obj, rtn;
		
		if(document.forms[name]) {
			obj = document.forms[name];
		} else {
			obj = name;
		}
		
		if(element !== false) {
			if(isNaN(element)) {
				el = obj.elements[element];
			} else {
				el = obj.elements[parseInt(element)];
			}
			
			if(val !== false) {
				if(el.type) {
					rtn = el.value;
				} else {
					rtn = el[el.selectedIndex].value;
				}
			} else {
				rtn = el;
			}
		} else {
			rtn = obj;
		}
		
		return rtn;
	},
	
	addEvent: function(obj, sEvent, sFunc) {
		if(obj.addEventListener) {
			obj.addEventListener(sEvent, sFunc, false);
		} else if(obj.attachEvent) {
			obj.attachEvent('on' + sEvent, sFunc);
		}
	},
		
	removeEvent: function(obj, sEvent, sFunc) {
		if(obj.removeEventListener) {
			obj.removeEventListener(sEvent, sFunc, false);
		} else if(obj.detachEvent) {
			obj.detachEvent('on' + sEvent, sFunc);
		}
	},
	
	injectScript: function(source){
		var inject = document.createElement("script");
		inject.setAttribute("type", "text/javascript");
		inject.textContent = source;
		_$.$t('head')[0].appendChild(inject);
	},
 
	current_scroll: function() {
 		var scrollx = (document.scrollX)?document.scrollX:document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
		var scrolly = (document.scrollY)?document.scrollY:document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
		return {x:scrollx,y:scrolly}
	},
	 
	element_position: function(el) {
		var x = y = 0;
		 
		if(el.offsetParent) {
			x = el.offsetLeft;
			y = el.offsetTop;
			while(el = el.offsetParent) {
				x += el.offsetLeft;
				y += el.offsetTop;
			}
		}
		return {x:x,y:y}
	},

	$n: function(element){
		return document.getElementsByName(element);
	}
}

function copyChildren(src, dst) {
    if (src.childNodes) {
		if (_$.browser().name == 'opera') {
			// opera doesn't like cloneNode()
			dst.innerHTML += src.innerHTML;
		} else {
			for (var childIndex = 0; childIndex < src.childNodes.length; childIndex++) {
				var child = src.childNodes[childIndex];
			    dst.appendChild(child.cloneNode(true));
			}
		}
	}
}

function removeChildren(src) {
    if (src.childNodes) {
		while(src.childNodes.length > 0) {
			src.removeChild(src.firstChild);
		}
    }
}

function getAvatarLocation(avatar) {
    // remove '_24' substring from avatar's url
    var avatarSrc = avatar.src;
    var lastSlash = avatarSrc.lastIndexOf('/');
    if (lastSlash > 0) {
        var avatarName = avatarSrc.substr(lastSlash + 1);
        var index24 = avatarName.indexOf('_24');
        // sometimes it doesn't have such substring
        if (index24 > 0) {
            avatarName = avatarName.substr(0, index24) + avatarName.substr(index24 + 3);
            avatarSrc = avatarSrc.substr(0, lastSlash + 1) + avatarName;
        }
    }
    return avatarSrc;
}

function getTargetCell(postElem) {
    var dstTable = postElem.getElementsByTagName('TABLE')[1];
    return dstTable.getElementsByTagName('TD')[0];
}

function getAvatarSourceCell(postElem) {
    var table = postElem.getElementsByTagName('TABLE')[0];
    return table.getElementsByTagName('TD')[0];
}

function forceAvatarSize(avatar) {
    if (avatar.width && avatar.height) {
        if (avatar.height < 25) {
            avatar.width = 64;
            avatar.height = 64;
        }
    }    
}

function updateAvatar(ffcProfile) {
	
	function checkAdded(targetCell, checkName) {
		var check = _$.$c(checkName, targetCell);
		return check.length > 0;
	}
	
    var avatar = ffcProfile.profileElem.firstChild;
    var location = getAvatarLocation(avatar);
    avatar.src = location;
	
	// copy avatar nodes
    for (var i = 0; i < ffcProfile.targetPosts.length; i++) {
        var targetCell = getTargetCell(ffcProfile.targetPosts[i]);
		// check if already added (for ajax-added posts)
		if (checkAdded(targetCell, 'profile_mini_ajax') || checkAdded(targetCell, 'profile_mini')) {
			continue;
		}
        copyChildren(getAvatarSourceCell(ffcProfile.sourcePostElem), targetCell);
        // force avatar size
        forceAvatarSize(targetCell.childNodes[2].firstChild);
    }
    // remove small avatars
    for (var i = 0; i < ffcProfile.targetPosts.length; i++) {
        var oldAvatarCell = getAvatarSourceCell(ffcProfile.targetPosts[i]);
        if (oldAvatarCell) {
			oldAvatarCell.style.display = 'none';
        }
    }
}

function storeProfile(postElement) {
    var firstPostElems = _$.$c('row-firstpost', postElement);
    if (firstPostElems && firstPostElems.length != 0) {
        // don't mess with the first post
        return;
    }
	
    var srcTable = postElement.getElementsByTagName('TABLE')[0];
    var profileElem = _$.$c('profile_mini', srcTable)[0] || _$.$c('profile_mini_ajax', srcTable)[0];
    if (profileElem) {
        var id = profileElem.rel;
        if (_$.ffcProfiles[id] == undefined) {
            _$.ffcProfiles[id] = new Object();
            _$.ffcProfiles[id].profileElem = profileElem;
            _$.ffcProfiles[id].sourcePostElem = postElement;
            _$.ffcProfiles[id].targetPosts = new Array();
        }
        // add target post
        _$.ffcProfiles[id].targetPosts.push(postElement);
    }
}


var __ffc_globalIndex = 0;

function traverse(elem) {
	function isPostElement(someElem) {
		if (elem.tagName == 'DIV') {
			if (elem.id) {
				return elem.id.toString().indexOf('thepost_') == 0;
			}
		}
		return false;
	}
	// don't traverse again already traversed post nodes
	if (isPostElement(elem)) {
		if (elem.__ffc_traversed) {
			return;
		}
		elem.__ffc_traversed = true;
	}
    // change color of posts
	if (_$.settings.use_old_design == '1') {
		if (elem.tagName == 'DIV') {
			if (elem.className == 'row-comment' 
				|| elem.className == 'row-firstpost'
				|| elem.className == 'subblock'
				|| elem.className == 'postcolor') {
				elem.style.backgroundColor = '#EFEFE3';
				elem.style.padding = '10px';
			}
			if (elem.id) {
				if (elem.id.toString().indexOf('thepost_') == 0) {
					storeProfile(elem);
				}
			}
		}
	}
    // table columns
    if (elem.tagName == 'TD') {
        // change font and colors
		if (_$.settings.use_old_design == '1') {
			if (elem.className == 'post-bar2') {
				elem.style.fontSize = '12px';
				elem.style.backgroundColor = '#DFDFD3';
			}
			if (elem.width == 43 && (elem.className == 'row-comment' || elem.className == 'row-comment-fill')) {
				elem.style.backgroundColor = '#EFEFE3';
				var post = elem.parentNode.getElementsByTagName('TD')[1];
				post.style.backgroundColor = '#EFEFE3';
				post.style.paddingTop = '11px';
				post.setAttribute('valign', 'top');
				// update cell for the avatar and profile data
				elem.width = 150;
				elem.setAttribute('valign', 'top');
				// insert a divider between avatar and comment text
				var divider = elem.parentNode.insertCell(1);
				divider.style.backgroundColor = '#EFEFE3';
				divider.style.borderWidth = '0pt 0pt 0pt 1px';
				divider.style.borderStyle = 'solid';
				divider.style.borderColor = '#DFDFD3';
				divider.width = '12px';
			}
			if (elem.id == 'QUOTE') {
				elem.style.backgroundColor = '#EFEFE3';
				elem.style.padding = '10px';
			}		
		}
    }
    // post number
	if (_$.settings.show_post_number == '1') {
		if (elem.tagName == 'SPAN' && elem.className == 'postdetails') {
			var linkElement = elem.getElementsByTagName('A')[0];
			if (linkElement) {
				var postNumberStr = linkElement.href.substr(0, linkElement.href.length - 1);
				var lastSlash = postNumberStr.lastIndexOf('/');
				var postNumber = postNumberStr.substr(lastSlash + 1, postNumberStr.length);
				linkElement.innerHTML = '#' + postNumber;
				linkElement.style.fontSize = '12px';
				linkElement.style.fontWeight = 'normal';
			}
		}
	}
	// expand hidden text
	if (_$.settings.expand_cut == '1') {
		if (elem.tagName == 'DIV') {
			if (elem.className == 'subblock') {
				elem.style.display = 'block';
			}
		}
	}
	// hide big quotes
	if (_$.settings.hide_quotes == '1') {
		if (elem.tagName == 'TABLE' && elem.width == '95%' && elem.border == '0' && elem.cellSpacing == '1' && elem.cellPadding == '3') {
			// hide if greater than 100px
			if(elem.offsetHeight > 100) {
				var quoteTdElement = elem.getElementsByTagName('TD')[0];
				var quoteText = quoteTdElement.innerHTML;
				quoteTdElement.innerHTML = '';
				// add span element
				var hSpanElement = document.createElement('SPAN');
				hSpanElement.className = 'cut-link';
				// add link for expanding
				var hrefElement = document.createElement('A');
				hrefElement.href = 'javascript:void(0)';
				hrefElement.innerHTML = quoteText + '<br>'; // Quote
				hrefElement.title = 'Expand';
				hSpanElement.appendChild(hrefElement);
				// insert span in place of quote table
				elem.parentNode.insertBefore(hSpanElement, elem);
				elem.parentNode.removeChild(elem);
				// create hidded div and insert quote table into it
				var hiddedDivElement = document.createElement('DIV');
				hiddedDivElement.style.display = 'none';
				// change color for newly created div to meet old design
				if (_$.settings.use_old_design == '1') {
					hiddedDivElement.style.backgroundColor = '#EFEFE3';
				}
				hiddedDivElement.style.padding = '0';
				hiddedDivElement.className = 'subblock';
				hiddedDivElement.appendChild(elem);
				hSpanElement.appendChild(hiddedDivElement);
				// add hide/expand event
				_$.addEvent(hrefElement, 'click', function(){
							hiddedDivElement.style.display = hiddedDivElement.style.display != 'block' ? 'block' : 'none';
							});
			}
		}
	}
	// hide ratings
	if (_$.settings.hide_ratings == '1') {
		var h = false;
		// message/karma ratings
		if (elem.tagName == 'DIV') {
			if (elem.id) {
				var idString = elem.id.toString();
				h = idString.indexOf('minus') == 0 || 
				idString.indexOf('plus') == 0 || 
				idString.indexOf('ratting') == 0;
			}
		}
		if (h) {
			elem.style.display = 'none';
		}
		// topic ratings
		if (elem.tagName == 'TR' && (elem.className == 'row-flist-tr' || elem.className == 'row-flist-pin-tr')) {
			var tdElement = elem.getElementsByTagName('TD')[1];
			removeChildren(tdElement);
		}
	}
    // further traverse
    if (elem.childNodes) {
        for (var childIndex = 0; childIndex < elem.childNodes.length; childIndex++) {
            traverse(elem.childNodes[childIndex]);
        }
    }
}
// profile related
function __ffcFetchProfileInfo(ffcProfile) {
    // create iframe to fetch profile data
    var iframeElement = document.createElement('IFRAME');
    iframeElement.style.visibility = 'hidden';
    iframeElement.width = 1;
    iframeElement.height = 1;
    iframeElement.src = '' + ffcProfile.profileElem.rel;
    var listener = function() {
        // remove listener
		_$.removeEvent(iframeElement, 'load', listener);
        // gather data
        var parentsToCopy = new Array();
        var _j = 0;
        var srcElements = iframeElement.contentDocument.body.getElementsByTagName('*');
        for (var _i = 0; _i < srcElements.length; _i++) {
            var child = srcElements[_i];
            if (child.className == 'desc') {
                parentsToCopy[_j++] = child;
            }
            if (child.className == 'row1') {
                parentsToCopy[_j++] = child.parentNode;
            }
        }
        // remove iframe
        document.body.removeChild(iframeElement);
        // copy profile info
        for (var i = 0; i < ffcProfile.targetPosts.length; i++) {
            var targetCell = getTargetCell(ffcProfile.targetPosts[i]);
            // on Opera (which suxx & must die ;) ) this info sometimes added twice; additionally checks for ajax-added posts.
            var tables = targetCell.getElementsByTagName('TABLE');
            if (tables == undefined || tables.length == 0) {
                // create new table
                var infoTable = document.createElement('TABLE');
                infoTable.style.display = 'none';
                infoTable.className = '__ffc_infoTable';
                infoTable.border = '0';
                infoTable.cellspacing = '0';
                infoTable.cellpadding = '0';
                var infoTr = infoTable.insertRow(-1);
                var infoTd = infoTr.insertCell(-1);
                infoTd.style.fontSize = '9px';
                targetCell.appendChild(infoTable);
                for (var j = 0; j < parentsToCopy.length; j++) {
                    copyChildren(parentsToCopy[j], infoTd);
                }
            }
        }
        // flag this profile as done fetching
        ffcProfile.doneFetching = true;
    };
    // install listener
	_$.addEvent(iframeElement, 'load', listener);
    document.body.appendChild(iframeElement);
}
 
function fixScrolling() {
	// fix scrolling
	try {
		var anchorName = window.location.hash;
		if (anchorName) {
			anchorName = 'thepost_' + anchorName.replace('#entry', '');
			var elem = _$.$(anchorName);
			if (elem) {
				var y = _$.element_position(elem).y;
				var x = _$.current_scroll().x;
				window.scrollTo(x, y);
			}
		}
	} catch(ex) {}
}

function __ffcUpdateProfileInfo() {
    for (var childIndex in _$.ffcProfiles) {
        if (!_$.ffcProfiles[childIndex].doneFetching) {
            // not all fetched, poll later (this is not good, but who'll offer a better way, you're welcome)
            setTimeout(__ffcUpdateProfileInfo, 300);
            return;
        }
    }
    var infoTables = _$.$c('__ffc_infoTable', document.body);
    if (infoTables) {
        for (var index = 0; index < infoTables.length; index++) {
            var infoTable = infoTables[index];
            infoTables[index].style.display = '';
        }
		fixScrolling();
    }
}

function updateProfiles() {
	if (_$.settings.use_old_design == '1') {
		// fetch profiles info
		var counter = 0;
		var timeoutDelta = 300;
		for(var childIndex in _$.ffcProfiles) {
			updateAvatar(_$.ffcProfiles[childIndex]);
			if (_$.settings.use_old_design_profile == '1') {
				window.setTimeout(__ffcFetchProfileInfo, timeoutDelta * ++counter, _$.ffcProfiles[childIndex]);
			}
		}
		// update page with profiles
		if (_$.settings.use_old_design_profile == '1') {
			window.setTimeout(__ffcUpdateProfileInfo, timeoutDelta * counter + 1);
		}
	}
}

// made by crea7or
// loading from a localStorage with default value instead of null, json wrappers
// should be available for the injected scripts
function jsonParse(valueToParse) {
	if (typeof JSON.parse !== "undefined") {
		return JSON.parse(valueToParse);
	} else {
		return JSON.decode(valueToParse);
	}
}
function jsonStringify(valueToStringify) {
	if (typeof JSON.stringify !== "undefined") {
		return JSON.stringify(valueToStringify);
	} else {
		return JSON.encode(valueToStringify);
	}
}
function localStorGetItem(itemName, defaultValue) {
	var loadedValue = localStorage.getItem(itemName);
	if (loadedValue == null) {
		loadedValue = defaultValue;
	}
	return loadedValue;
}

if(true /*check for url? */) {
	
	function add_checkbox_event(checkboxId, optionId, func) {
		var func = func || function() {
			if(_$.$(checkboxId).checked === true) {
				_$.set_save(optionId, 1);
			} else {
				_$.set_save(optionId, 0); 
			}
		} 
		_$.addEvent(_$.$(checkboxId),'click', func);
	}
	
	function ffc_settings_cb_init() {
		add_checkbox_event('ffc_cb_use_old_design','use_old_design');
		add_checkbox_event('ffc_cb_use_old_design','use_old_design', function() {
						   _$.$('ffc_cb_use_old_design_profile').disabled = !_$.settings.use_old_design; 
						   });
		add_checkbox_event('ffc_cb_use_old_design_profile','use_old_design_profile');
		add_checkbox_event('ffc_cb_hide_right_column','hide_right_column');
		add_checkbox_event('ffc_cb_show_post_number','show_post_number');
		add_checkbox_event('ffc_cb_expand_cut','expand_cut');
		add_checkbox_event('ffc_cb_hide_quotes','hide_quotes');
		add_checkbox_event('ffc_cb_hide_ratings','hide_ratings');
		add_checkbox_event('ffc_cb_autoupdate_post','autoupdate_post');
 }
	
	
	function ffc_settings_init() {
		var toolbarElement = _$.$('vsevse').parentNode;
		var spSettingsElement = document.createElement('A');
		spSettingsElement.id = 'ffcsp-settings-link';
		spSettingsElement.innerHTML = decodeURI('%D0%A1%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BF%D0%B0%D0%BA');
		spSettingsElement.href = 'javascript:void(0);';
		spSettingsElement.rel = '#ffcsp-settings';
		spSettingsElement.title = decodeURI('%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8%20%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BF%D0%B0%D0%BA%D0%B0');
		toolbarElement.insertBefore(spSettingsElement, toolbarElement.childNodes[toolbarElement.childNodes.length - 2]);
		
		$('#ffcsp-settings-link').cluetip({
										  activation: 'click',
										  cursor: 'pointer',
										  local: true,
										  hideLocal: true,
										  cluezIndex: 1970, 
										  waitImage: false,
										  positionBy: 'auto',
										  showTitle: true,
										  delayedClose: 0,
										  mouseOutClose: false,
										  sticky: true,
										  closePosition: 'title',
										  dropShadow: true,
										  clickThrough: false,
										  closeText: "<img src='http://css.ffclub.ru/forum/style_images/ffclub5a/miniclose_12.png' title='Close'>",
										  onShow: function(ct, ci) {
                                            ffc_settings_cb_init();
										  }
										  });
		
		var settingsDiv = document.createElement('div');
		settingsDiv.id = 'ffcsp-settings';
		settingsDiv.style.display = 'none';
		settingsDiv.innerHTML = 
		'<p><table cellspacing="0" border="0">' +
		// old design
		'<tr><td width="25"><input id="ffc_cb_use_old_design" type="checkbox" ' + 
		((_$.settings.use_old_design=='1') ? 'checked="checked"' : '') +
		'></td><td style="text-align:left"><label for="ffc_cb_use_old_design">' +
		decodeURI('%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D1%81%D1%82%D0%B0%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD') + '</label></td></tr>' + 
		// show profile
		'<tr><td width="25"><input id="ffc_cb_use_old_design_profile" type="checkbox" ' + 
		((_$.settings.use_old_design_profile=='1') ? 'checked="checked"' : '') +
		((_$.settings.use_old_design=='1') ? '' : 'disabled="disabled"') +
		'></td><td style="text-align:left"><label for="ffc_cb_use_old_design_profile">' +
		decodeURI('%D0%9F%D0%BE%D0%BA%D0%B0%D0%B7%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%20%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8E%20%D0%B8%D0%B7%20%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F') + '</label></td></tr>' +
		// hide right column
		'<tr><td width="25"><input id="ffc_cb_hide_right_column" type="checkbox" ' + 
		((_$.settings.hide_right_column=='1') ? 'checked="checked"' : '') +
		'></td><td style="text-align:left"><label for="ffc_cb_hide_right_column">' + 
		decodeURI('%D0%A1%D0%BA%D1%80%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BF%D1%80%D0%B0%D0%B2%D1%8B%D0%B9%20%D1%81%D1%82%D0%BE%D0%BB%D0%B1%D0%B5%D1%86') + '</label></td></tr>' +
		// post number
		'<tr><td width="25"><input id="ffc_cb_show_post_number" type="checkbox" ' + 
		((_$.settings.show_post_number=='1') ? 'checked="checked"' : '') +
		'></td><td style="text-align:left"><label for="ffc_cb_show_post_number">' + 
		decodeURI('%D0%9F%D0%BE%D0%BA%D0%B0%D0%B7%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BD%D0%BE%D0%BC%D0%B5%D1%80%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0') + '</label></td></tr>' +
		// expand cut
		'<tr><td width="25"><input id="ffc_cb_expand_cut" type="checkbox" ' + 
		((_$.settings.expand_cut=='1') ? 'checked="checked"' : '') +
		'></td><td style="text-align:left"><label for="ffc_cb_expand_cut">' + 
		decodeURI('%D0%A0%D0%B0%D1%81%D0%BA%D1%80%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%20%22%D0%A1%D0%BA%D1%80%D1%8B%D1%82%D1%8B%D0%B9%20%D1%82%D0%B5%D0%BA%D1%81%D1%82%22') + '</label></td></tr>' +
		// hide quotes
		'<tr><td width="25"><input id="ffc_cb_hide_quotes" type="checkbox" ' + 
		((_$.settings.hide_quotes=='1') ? 'checked="checked"' : '') +
		'></td><td style="text-align:left"><label for="ffc_cb_hide_quotes">' + 
		decodeURI('%D0%A1%D0%BA%D1%80%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%20%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%B8%D0%B5%20%D1%86%D0%B8%D1%82%D0%B0%D1%82%D1%8B') + '</label></td></tr>' +
		// hide ratings
		'<tr><td width="25"><input id="ffc_cb_hide_ratings" type="checkbox" ' + 
		((_$.settings.hide_ratings=='1') ? 'checked="checked"' : '') +
		'></td><td style="text-align:left"><label for="ffc_cb_hide_ratings">' + 
		decodeURI('%D0%9E%D1%82%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C%20%D1%80%D0%B5%D0%B9%D1%82%D0%B8%D0%BD%D0%B3%D0%B8') + '</label></td></tr>' +
		// auto update comments
		'<tr><td width="25"><input id="ffc_cb_autoupdate_post" type="checkbox" ' + 
		((_$.settings.autoupdate_post=='1') ? 'checked="checked"' : '') +
		'></td><td style="text-align:left"><label for="ffc_cb_autoupdate_post">' + 
		decodeURI('%D0%9E%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D1%8F%D1%82%D1%8C%20%D1%82%D0%B5%D0%BC%D1%83%20%D0%B0%D0%B2%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8') + '</label></td></tr>' +
 		'</table></p>';
		document.body.appendChild(settingsDiv);
	}
	
	/**
	 *
	 *  Base64 encode / decode 
	 *  http://www.webtoolkit.info/
	 *
	 */
	var Base64 = {
		
		// private property
		_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		
		// public method for encoding
		encode : function (input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			
			input = Base64._utf8_encode(input);
			
			while (i < input.length) {
				
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				
				output = output +
				this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
				this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
				
			}
			
			return output;
		},
		
		// private method for UTF-8 encoding
		_utf8_encode : function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";
			
			for (var n = 0; n < string.length; n++) {
				
				var c = string.charCodeAt(n);
				
				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				
			}
			
			return utftext;
		},
	}
	
	// let's run inside the normal global scope (except opera, it runs user scripts in global scope by default)
	if (_$.browser().name != 'opera') {
		if ('undefined' == typeof __PAGE_SCOPE_RUN__) {
			(function page_scope_runner() {
			 // If we're _not_ already running in the page, grab the full source
			 // of this script.
			 var my_src = "(" + page_scope_runner.caller.toString() + ")();";
			 
			 // Create a script node holding this script, plus a marker that lets us
			 // know we are running in the page scope (not the Greasemonkey sandbox).
			 // Note that we are intentionally *not* scope-wrapping here.
			 var script = document.createElement('script');
			 script.setAttribute("type", "application/javascript");
			 script.setAttribute("src",
								 "data:application/javascript;charset=Windows-1251;base64," + Base64.encode("var __PAGE_SCOPE_RUN__ = true;\n" + my_src));
			 
			 // Insert the script node into the page, so it will run. 
			 // Use setTimeout to force execution "outside" of
			 // the user script scope completely.
			 setTimeout(function() {
						document.body.appendChild(script);
						}, 0);
			 })();
			
			// Stop running, because we know Greasemonkey actually runs us in
			// an anonymous wrapper.
			return;
		}
	}	
	function updateAjaxAdded(ajaxElement) {
		if (ajaxElement) {
			traverse(ajaxElement);
			updateProfiles();
		}
	}	
	_$.injectScript(jsonParse + "\n" + jsonStringify  + "\n" +  localStorGetItem);
	// try to load settings
	_$.set_get();
	// init settings
	var settingsSave = false;
	if(typeof _$.settings.use_old_design == "undefined") { _$.settings.use_old_design = 0; settingsSave = true; }
	if(typeof _$.settings.use_old_design_profile == "undefined") { _$.settings.use_old_design_profile = 0; settingsSave = true; }
	if(typeof _$.settings.hide_right_column == "undefined") { _$.settings.hide_right_column = 0; settingsSave = true; }
	if(typeof _$.settings.show_post_number == "undefined") { _$.settings.show_post_number = 0; settingsSave = true; }
	if(typeof _$.settings.expand_cut == "undefined") { _$.settings.expand_cut = 0; settingsSave = true; }
	if(typeof _$.settings.hide_quotes == "undefined") { _$.settings.hide_quotes = 0; settingsSave = true; }
	if(typeof _$.settings.hide_ratings == "undefined") { _$.settings.hide_ratings = 0; settingsSave = true; }
	if(typeof _$.settings.autoupdate_post == "undefined") { _$.settings.autoupdate_post = 0; settingsSave = true; }
	
	if (settingsSave) {
		_$.set_save(null , 0);
	}
	// initialize
	ffc_settings_init();
	// hook into ajax updating routine to update ajax-added elements.
	var sendImpl = window.Send;
	window.Send = function(mode,submit,func) {
		sendImpl(mode, submit, func);
		updateAjaxAdded(document.getElementById('ajax_posts_previous'));
		updateAjaxAdded(document.getElementById('ajax_posts'));
	}

    // hide right column
    if (_$.settings.hide_right_column == '1') {
        var stopics = _$.$c('stopics', _$.$('body'));
        if (stopics[0]) {
            var rightColumn = stopics[0].parentNode;
            rightColumn.style.display = 'none';
            var contentNode = rightColumn.previousSibling;
            while (contentNode && contentNode.tagName != 'DIV') {
                contentNode = contentNode.previousSibling;
            }
            contentNode.style.width = '100%';
        }
    }

	// do the job using traversal
	traverse(document.body);
	updateProfiles();
    // fix scrolling
	if (_$.settings.use_old_design == '1' || _$.settings.expand_cut == '1') {
		window.setTimeout(fixScrolling, 50);
	}
	// add topic autoupdate
	if (_$.settings.autoupdate_post == '1' && _$.location.indexOf('/topic/') != -1) {
		function autoRefresh() {
			window.setTimeout(autoRefresh, 60000);
			return window.ajax_refresh();
		}
        // do not update if has no refresh button on the page
        if (_$.$('refresh_butt_div')) {
            window.setTimeout(autoRefresh, 60000);
        }
	}
}

// end of global function
})();
