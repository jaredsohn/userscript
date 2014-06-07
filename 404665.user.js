// ==UserScript==
// @name	Serenes Forest - Plaintext BBCode
// @namespace	Makaze
// @include	*://*serenesforest.net/forums/*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant	none
// @version	4.2.1
// ==/UserScript==

if (document.body.id !== 'ipboard_body') {
	return false;
}

function selectRangeRaw(elem, start, end) {
	if (elem.setSelectionRange) {
		elem.focus();
		elem.setSelectionRange(start, end);
	} else if (elem.createTextRange) {
		var range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd('character', end);
		range.moveStart('character', start);
		range.select();
	}
}

function wrapTextRaw(elementSelector, openTag, closeTag) {
	var textArea = elementSelector;
	len = textArea.value.length,
	start = textArea.selectionStart,
	end = textArea.selectionEnd,
	selectedText = textArea.value.substring(start, end),
	replacement = openTag + selectedText + closeTag,
	paste = document.createEvent('TextEvent');
	if (paste.initTextEvent) {
		paste.initTextEvent('textInput', true, true, null, replacement);
		textArea.dispatchEvent(paste);
	} else {
		textArea.value = textArea.value.substring(0, start) + replacement + textArea.value.substring(end, len);
	}
	selectRangeRaw(textArea, start + openTag.length, end + openTag.length);
}

function removeListeners(element, callback, deleteElement) {
	var elementClone = element.cloneNode(true),
	elementParent = element.parentNode,
	fullValue = element.value,
	start = element.selectionStart,
	end = element.selectionEnd,
	selectedText = element.value.substring(start, end),
	newElement;

	callback(element, elementClone);

	elementClone.setAttribute('data-listenersRemoved', '');
	elementParent.insertBefore(elementClone, element);
	element.style.display = 'none';
	if (deleteElement) {
		elementParent.replaceChild(elementClone, element);
	}
	for (var i = 0, thisChild; i < elementParent.childNodes.length; i++) {
		thisChild = elementParent.childNodes[i];
		if (thisChild.hasAttribute('data-listenersRemoved')) {
			newElement = thisChild;
			thisChild.removeAttribute('data-listenersRemoved');
			break;
		}
	}
	newElement.focus();
	newElement.value = fullValue;
	selectRangeRaw(newElement, start, end);
}

// Event handler constructor

function EventHandler() {
	var events = [],
	matchedEvents = [],
	selector = document,
	self = this;

	this.selector = function(toSelect) {
		selector = toSelect;
		return self;
	}

	this.add = function(types, namespace, listener, useCapture) {
		var type,
		i = 0,
		event;

		types = types.split(/[\b\s]/);

		events.push({'selector': selector, 'namespace': namespace, 'types': types, 'listener': listener, 'useCapture': useCapture});
		event = events[events.length - 1];

		for (var i = 0; i < event.types.length; i++) {
			type = event.types[i];
			selector.addEventListener(type, listener, useCapture);
		}

		return self;
	}

	this.remove = function(types, namespace, listener, useCapture) {
		var event,
		eventType,
		eventTypes,
		type;

		if (!arguments.length) {
			if (matchedEvents.length) {
				for (var i = 0; i < matchedEvents.length; i++) {
					event = matchedEvents[i];
					for (var j = 0; j < event.types.length; j++) {
						type = event.types[j];
						event.selector.removeEventListener(type, event.listener, event.useCapture);
					}
				}
			} else {
				self.getEventsBySelector(selector).remove();
			}
		} else {
			types = types.split(/[\b\s]/);

			for (var i = 0; i < events.length; i++) {
				event = events[i];
				if (event.selector == selector && event.namespace === namespace && event.useCapture === useCapture && event.listener === listener) {
					eventTypes = event.types;
					for (var j = 0; j < eventTypes.length; j++) {
						eventType = eventTypes[j];
						for (var k = 0; k < event.types.length; k++) {
							type = types[k];
							if (type === eventType) {
								selector.removeEventListener(type, event.listener, event.useCapture);
							}
						}
					}
					break;
				}
			}
		}

		matchedEvents = [];

		return self;
	}

	this.output = function() {
		if (!matchedEvents.length) {
			self.getAllEvents().output();
		} else {
			var output = matchedEvents;
			matchedEvents = [];
			return output;
		}
	}

	this.getAllEvents = function() {
		matchesEvents = events;
		return self;
	}

	this.getEventsBySelector = function(getSelector) {
		var event;

		if (matchedEvents.length) {
			for (var i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.selector != getSelector) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (var i = 0; i < events.length; i++) {
				event = events[i];
				if (event.selector == getSelector) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	}

	this.getEventsByType = function(types) {
		var eventTypes,
		eventType,
		hasType = false;

		types = types.split(/[\b\s]/);

		if (matchedEvents.length) {
			for (var i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				for (var j = 0; j < eventTypes.length; j++) {
					eventType = eventTypes[j];
					for (var k = 0; k < event.types.length; k++) {
						type = types[k];
						if (type === eventType) {
							hasType = true;
							break;
						}
					}
					if (hasType) {
						break;
					}
				}
				if (hasType) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (var i = 0; i < events.length; i++) {
				event = events[i];
				for (var j = 0; j < eventTypes.length; j++) {
					eventType = eventTypes[j];
					for (var k = 0; k < event.types.length; k++) {
						type = types[k];
						if (type === eventType) {
							hasType = true;
							break;
						}
					}
					if (hasType) {
						break;
					}
				}
				if (hasType) {
					matchedEvents.push(event);
				}
			}
		}
		
		return self;
	}

	this.getEventsByName = function(namespace) {
		var event;

		if (matchedEvents.length) {
			for (var i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.namespace !== namespace) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (var i = 0; i < events.length; i++) {
				event = events[i];
				if (event.namespace === namespace) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	}

	this.getEventsByListener = function(listener) {
		var event;

		if (matchedEvents.length) {
			for (var i = 0; i < matchedEvents.length; i++) {
				event = matchedEvents[i];
				if (event.listener !== listener) {
					matchedEvents.splice(i, 1);
				}
			}
		} else {
			for (var i = 0; i < events.length; i++) {
				event = events[i];
				if (event.listener === listener) {
					matchedEvents.push(event);
				}
			}
		}

		return self;
	}
}

// End event handler constructor

var Events = new EventHandler();

Events.selector(document).add('keydown', 'plaintext_shortcuts', function(event) {
	var element = event.target;

	if (!element.className || !element.className.match(/cke_source/)) {
		return false;
	}

	if (!element.hasAttribute('data-shortcutsenabled')) {
		removeListeners(element, function(element, removed) {
			var postFormParent = element.parentNode;
			removed.setAttribute('data-shortcutsenabled', '');
			Events.selector(removed).add('input propertychange', 'edit', function(event) {
				element.value = removed.value;
			}, false);
			while (postFormParent.getElementsByClassName('input_submit')[0] == null && postFormParent.parentNode) {
				postFormParent = postFormParent.parentNode;
			}
			// On submits
			for (var i = 0, inputs = postFormParent.getElementsByClassName('input_submit'), thisInput; i < inputs.length; i++) {
				thisInput = inputs[i];
				if (thisInput.hasAttribute('data-deleteclone')) {
					return false;
				}
				Events.selector(thisInput).add('click', 'deleteClone', function(event) {
					for (var j = 0, texts = postFormParent.getElementsByTagName('textarea'), thisOne; j < texts.length; j++) {
						thisOne = texts[j];
						if (thisOne.hasAttribute('data-shortcutsenabled')) {
							thisOne.remove();
							break;
						}
					}
					element.style.display = '';
				}, false);
				thisInput.setAttribute('data-deleteclone', '');
			}
		}, false);
	}

	if (event.ctrlKey) {
		switch (event.keyCode) {
			case 66:
				event.preventDefault();
				wrapTextRaw(element, '[b]', '[/b]');
			break;
			case 73:
				event.preventDefault();
				wrapTextRaw(element, '[i]', '[/i]');
			break;
			case 85:
				event.preventDefault();
				wrapTextRaw(element, '[u]', '[/u]');
			break;
		}
	}
}, false);

function plaintextBBCode(editor) {

	jQuery.cssHooks.backgroundColor = {
		get: function(elem) {
			if (elem.currentStyle) {
				var bg = elem.currentStyle["backgroundColor"];
			} else if (window.getComputedStyle) {
				var bg = document.defaultView.getComputedStyle(elem, null).getPropertyValue("background-color");
				if (bg.search("rgb") == -1) {
					return bg;
				} else {
					bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					function hex(x) {
						return ("0" + parseInt(x).toString(16)).slice(-2);
					}
					return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
				}
			}
		}
	}

	var createRequest = function() {
		var dialogcss;
	
		jQuery('link').each(function() {
			if (jQuery(this).attr('href').match(/dialog\.css/gi)) {
				dialogcss = true;
			} else {
				dialogcss = false;
			}
		});
	
		if (!dialogcss) {
			var requestStyle = document.createElement('link');
			jQuery(requestStyle).attr('rel', 'stylesheet').attr('media', 'screen,print').attr('type', 'text/css').attr('href', 'public/js/3rd_party/ckeditor/skins/ips/dialog.css');
			jQuery('head').append(requestStyle);
		}
	
		var request = document.createElement('div');
		jQuery(request).addClass('plaintext-request').addClass('cke_skin_ips').css('display', 'none');
		jQuery(request).html('<div class="cke_dialog_body" style="position: fixed; top: 0px; left: 0px; width: 400px; background-color: #fff;" id="plaintext-request"><div class="request-type cke_dialog_title">Link</div> <a class="cke_dialog_close_button" href="javascript:void(0)" title="Close"><span class="cke_label">X</span></a><div class="cke_dialog_contents"><div class="spec" style="margin-top: 5px;">URL</div><div class="fields" style="line-height: 14px; vertical-align: middle;"><div class="cke_dialog_ui_input_text"><input type="text" class="cke_dialog_ui_input_text" /></div></div><div class="cke_dialog_footer cke_dialog_footer_buttons" style="float: right; margin-right: 0px; margin-top: 10px;"><a href="javascript:void(0)" title="OK" hidefocus="true" class="cke_dialog_ui_button"><span class="cke_dialog_ui_button" style="margin-bottom: 5px;">OK</span></a><a href="javascript:void(0)" title="Cancel" hidefocus="true" class="cke_dialog_ui_button" style="margin-left: 10px;"><span class="cke_dialog_ui_button" style="margin-bottom: 5px;">Cancel</span></a></div></div></div>');
		jQuery('body').prepend(request);
		
		var requestDrag = new Draggable('plaintext-request', { handle: 'request-type', starteffect: null, endeffect: null });
		
		if (jQuery('#request-background').length < 1) {
			var requestbackground = document.createElement('div');
			jQuery(requestbackground).attr('id', 'request-background');
			jQuery(requestbackground).addClass('cke_dialog_background_cover');
			jQuery(requestbackground).css({
				'position': 'fixed',
				'z-index': 10000,
				'top': '0px',
				'left': '0px',
				'opacity': 0.5,
				'width': '100%',
				'height': '100%',
				'display': 'none'
			});
			jQuery('body').prepend(requestbackground);
		}
	
		jQuery('.plaintext-request .cke_dialog_close_button, .plaintext-request .cke_dialog_ui_button[title=Cancel], .plaintext-request .cke_dialog_ui_button[title=OK]').on('click.default', function() {
			jQuery('.plaintext-request').hide();
			jQuery('#request-background').hide();
		});
	}
	
	var createFontDropdown = function() {
		var main = document.createElement('div');
		jQuery(main).addClass('cke_panel').addClass('cke_ltr').addClass('cke_rcombopanel').addClass('font-dropdown');
		jQuery(main).attr('style', 'position: absolute; z-index: 9999; overflow-y: auto; background-color: #fff; width: 300px; height: 170px; border-top-left-radius: 0px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid #aaa; color: #222; font-family: \'Helvetica Neue\', Arial, Verdana, sans-serif; display: none;');
		jQuery(main).html('<div class="cke_panel_block"><h1 class="cke_panel_grouptitle">Font Name</h1><ul class="cke_panel_list main-list"><li class="cke_panel_listItem"><a title="Arial" href="javascript:void(\'Arial\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:arial,helvetica,sans-serif; font-size: 14px;">Arial</span></a></li><li class="cke_panel_listItem"><a title="Comic Sans MS" href="javascript:void(\'Comic Sans MS\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:comic sans ms,cursive; font-size: 14px;">Comic Sans MS</span></a></li><li class="cke_panel_listItem"><a title="Courier New" href="javascript:void(\'Courier New\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:courier new,courier,monospace; font-size: 14px;">Courier New</span></a></li><li class="cke_panel_listItem"><a title="Georgia" href="javascript:void(\'Georgia\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:georgia,serif; font-size: 14px;">Georgia</span></a></li><li class="cke_panel_listItem"><a title="Lucida Sans Unicode" href="javascript:void(\'Lucida Sans Unicode\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:lucida sans unicode,lucida grande,sans-serif; font-size: 14px;">Lucida Sans Unicode</span></a></li><li class="cke_panel_listItem"><a title="Tahoma" href="javascript:void(\'Tahoma\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:tahoma,geneva,sans-serif; font-size: 14px;">Tahoma</span></a></li><li class="cke_panel_listItem"><a title="Times New Roman" href="javascript:void(\'Times New Roman\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:times new roman,times,serif; font-size: 14px;">Times New Roman</span></a></li><li class="cke_panel_listItem"><a title="Trebuchet MS" href="javascript:void(\'Trebuchet MS\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:trebuchet ms,helvetica,sans-serif; font-size: 14px;">Trebuchet MS</span></a></li><li class="cke_panel_listItem"><a title="Verdana" href="javascript:void(\'Verdana\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-family:verdana,geneva,sans-serif; font-size: 14px;">Verdana</span></a></li></ul></div></div>');
		jQuery('body').prepend(main);
	}
	
	var createSizeDropdown = function() {
		var main = document.createElement('div');
		jQuery(main).addClass('cke_panel').addClass('cke_ltr').addClass('cke_rcombopanel').addClass('size-dropdown');
		jQuery(main).attr('style', 'position: absolute; z-index: 9999; overflow-y: auto; background-color: #fff; width: 120px; height: 170px; border-top-left-radius: 0px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid #aaa; color: #222; font-family: \'Helvetica Neue\', Arial, Verdana, sans-serif; display: none;');
		jQuery(main).html('<div class="cke_panel_block"><h1 class="cke_panel_grouptitle">Font Size</h1><ul class="cke_panel_list main-list"><li class="cke_panel_listItem"><a id="Size_1" title="8" href="javascript:void(\'8\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-size:8px;">8</span></a></li><li class="cke_panel_listItem"><a id="Size_2" title="10" href="javascript:void(\'10\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-size:10px;">10</span></a></li><li class="cke_panel_listItem"><a id="Size_3" title="12" href="javascript:void(\'12\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-size:12px;">12</span></a></li><li class="cke_panel_listItem"><a id="Size_4" title="14" href="javascript:void(\'14\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-size:14px;">14</span></a></li><li class="cke_panel_listItem"><a id="Size_5" title="18" href="javascript:void(\'18\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-size:18px;">18</span></a></li><li class="cke_panel_listItem"><a id="Size_6" title="24" href="javascript:void(\'24\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-size:24px;">24</span></a></li><li class="cke_panel_listItem"><a id="Size_7" title="36" href="javascript:void(\'36\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-size:36px;">36</span></a></li><li class="cke_panel_listItem"><a id="Size_8" title="48" href="javascript:void(\'48\')" style="padding: 2px; display: block; border: 1px solid #fff; color: inherit !important; text-decoration: none; overflow: hidden; text-overflow: ellipsis;"><span style="font-size:48px;">48</span></a></li></ul></div></div>');
		jQuery('body').prepend(main);
	}
	
	var createColorDropdown = function() {
		var main = document.createElement('div');
		jQuery(main).addClass('cke_panel').addClass('cke_ltr').addClass('color-dropdown');
		jQuery(main).attr('style', 'position: absolute; z-index: 9999; background-color: #fff; border-top-left-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px; border: 1px solid #8F8F73; color: #222; font-family: \'Helvetica Neue\', Arial, Verdana, sans-serif; display: none; width: 154px; height: 134px;');
		jQuery(main).html('<div class="cke_panel_block cke_colorblock cke_frameLoaded"><a class="cke_colorauto" title="Automatic" href="javascript:void(\'Automatic\')"><table cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td style="padding: 0px;"><span class="cke_colorbox" style="background-color: rgb(34, 34, 34);"></span></td><td style="padding: 0px;" style="padding: 0px;" colspan="7" align="center">Automatic</td></tr></tbody></table></a><table cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td style="padding: 0px;"><a class="cke_colorbox" title="Black" href="javascript:void(\'Black\')"><span class="cke_colorbox" style="background-color:#000"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Maroon"href="javascript:void(\'Maroon\')"><span class="cke_colorbox" style="background-color:#800000"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Saddle Brown" href="javascript:void(\'Saddle Brown\')"><span class="cke_colorbox" style="background-color:#8B4513"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Dark Slate Gray" href="javascript:void(\'Dark Slate Gray\')"><span class="cke_colorbox" style="background-color:#2F4F4F"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Teal" href="javascript:void(\'Teal\')"><span class="cke_colorbox" style="background-color:#008080"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Navy" href="javascript:void(\'Navy\')"><span class="cke_colorbox" style="background-color:#000080"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Indigo" href="javascript:void(\'Indigo\')"><span class="cke_colorbox" style="background-color:#4B0082"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Dark Gray" href="javascript:void(\'Dark Gray\')"><span class="cke_colorbox" style="background-color:#696969"></span></a></td></tr><tr><td style="padding: 0px;"><a class="cke_colorbox" title="Fire Brick" href="javascript:void(\'Fire Brick\')"><span class="cke_colorbox" style="background-color:#B22222"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Brown" href="javascript:void(\'Brown\')"><span class="cke_colorbox" style="background-color:#A52A2A"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Golden Rod" href="javascript:void(\'Golden Rod\')"><span class="cke_colorbox" style="background-color:#DAA520"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Dark Green" href="javascript:void(\'Dark Green\')"><span class="cke_colorbox" style="background-color:#006400"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Turquoise" href="javascript:void(\'Turquoise\')"><span class="cke_colorbox" style="background-color:#40E0D0"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Medium Blue" href="javascript:void(\'Medium Blue\')"><span class="cke_colorbox" style="background-color:#0000CD"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Purple" href="javascript:void(\'Purple\')"><span class="cke_colorbox" style="background-color:#800080"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Gray" href="javascript:void(\'Gray\')"><span class="cke_colorbox" style="background-color:#808080"></span></a></td></tr><tr><td style="padding: 0px;"><a class="cke_colorbox" title="Red" href="javascript:void(\'Red\')"><span class="cke_colorbox" style="background-color:#F00"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Dark Orange" href="javascript:void(\'Dark Orange\')"><span class="cke_colorbox" style="background-color:#FF8C00"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Gold" href="javascript:void(\'Gold\')"><span class="cke_colorbox" style="background-color:#FFD700"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Green" href="javascript:void(\'Green\')"><span class="cke_colorbox" style="background-color:#008000"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Cyan" href="javascript:void(\'Cyan\')"><span class="cke_colorbox" style="background-color:#0FF"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Blue" href="javascript:void(\'Blue\')"><span class="cke_colorbox" style="background-color:#00F"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Violet" href="javascript:void(\'Violet\')"><span class="cke_colorbox" style="background-color:#EE82EE"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Dim Gray" href="javascript:void(\'Dim Gray\')"><span class="cke_colorbox" style="background-color:#A9A9A9"></span></a></td></tr><tr><td style="padding: 0px;"><a class="cke_colorbox" title="Light Salmon" href="javascript:void(\'Light Salmon\')"><span class="cke_colorbox" style="background-color:#FFA07A"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Orange" href="javascript:void(\'Orange\')"><span class="cke_colorbox" style="background-color:#FFA500"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Yellow" href="javascript:void(\'Yellow\')"><span class="cke_colorbox" style="background-color:#FFFF00"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Lime" href="javascript:void(\'Lime\')"><span class="cke_colorbox" style="background-color:#00FF00"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Pale Turquoise" href="javascript:void(\'Pale Turquoise\')"><span class="cke_colorbox" style="background-color:#AFEEEE"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Light Blue" href="javascript:void(\'Light Blue\')"><span class="cke_colorbox" style="background-color:#ADD8E6"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Plum" href="javascript:void(\'Plum\')"><span class="cke_colorbox" style="background-color:#DDA0DD"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Light Gray" href="javascript:void(\'Light Gray\')"><span class="cke_colorbox" style="background-color:#D3D3D3"></span></a></td></tr><tr><td style="padding: 0px;"><a class="cke_colorbox" title="Lavender Blush" href="javascript:void(\'Lavender Blush\')"><span class="cke_colorbox" style="background-color:#FFF0F5"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Antique White" href="javascript:void(\'Antique White\')"><span class="cke_colorbox" style="background-color:#FAEBD7"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Light Yellow" href="javascript:void(\'Light Yellow\')"><span class="cke_colorbox" style="background-color:#FFFFE0"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Honeydew" href="javascript:void(\'Honeydew\')"><span class="cke_colorbox" style="background-color:#F0FFF0"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Azure" href="javascript:void(\'Azure\')"><span class="cke_colorbox" style="background-color:#F0FFFF"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Alice Blue" href="javascript:void(\'Alice Blue\')"><span class="cke_colorbox" style="background-color:#F0F8FF"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="Lavender" href="javascript:void(\'Lavender\')"><span class="cke_colorbox" style="background-color:#E6E6FA"></span></a></td><td style="padding: 0px;"><a class="cke_colorbox" title="White" href="javascript:void(\'White\')"><span class="cke_colorbox" style="background-color:#FFF"></span></a></td></tr><tr><td style="padding: 0px;" style="padding: 0px;" colspan="8" align="center"><a class="cke_colormore" title="More Colors..." href="javascript:void(\'More Colors...\')">More Colors...</a></td></tr></tbody></table></div>');
		jQuery('body').prepend(main);
	}
	
	var createMoreColorsPicker = function() {
		var dialogcss = false;
	
		jQuery('link').each(function() {
			if (jQuery(this).attr('href').match(/dialog\.css/gi)) {
				dialogcss = true;
			}	
		});
	
		if (!dialogcss) {
			var requestStyle = document.createElement('link');
			jQuery(requestStyle).attr('rel', 'stylesheet').attr('media', 'screen,print').attr('type', 'text/css').attr('href', 'public/js/3rd_party/ckeditor/skins/ips/dialog.css');
			jQuery('head').append(requestStyle);
		}
		
		var main = document.createElement('div');
		jQuery(main).addClass('cke_skin_ips').css('display', 'none').addClass('more_colors-request');
		jQuery(main).html('<div class="cke_dialog_body" style="position: fixed; top: 0px; left: 0px; width: 380px; background-color: #fff; z-index: 20000;" id="more_colors-request"><div class="request-type cke_dialog_title">Select color</div><a class="cke_dialog_close_button" href="javascript:void(0)" title="Close"><span class="cke_label">X</span></a><table class="cke_dialog_contents"></table><table class="cke_dialog_contents"><tbody><tr><td class="cke_dialog_contents" style="width: 360px; height: 220px;"><div class="cke_dialog_ui_vbox cke_dialog_page_contents" style="width: 100%; height:100%" name="picker" aria-hidden="false"><table cellspacing="0" border="0" style="width:100%;" align="left"><tbody><tr><td class="cke_dialog_ui_vbox_child"><table class="cke_dialog_ui_hbox"><tbody><tr class="cke_dialog_ui_hbox"><td class="cke_dialog_ui_hbox_first" style="width:70%; padding:0"><div class="cke_dialog_ui_html"><table style="border-collapse:separate;" cellspacing="0"><caption class="cke_voice_label">Color Options</caption><tbody><tr><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 51, 0); border: 1px solid rgb(0, 51, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#003300</span></td><td class="ColorCell" style="background-color: rgb(0, 102, 0); border: 1px solid rgb(0, 102, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#006600</span></td><td class="ColorCell" style="background-color: rgb(0, 153, 0); border: 1px solid rgb(0, 153, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#009900</span></td><td class="ColorCell" style="background-color: rgb(0, 204, 0); border: 1px solid rgb(0, 204, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#00cc00</span></td><td class="ColorCell" style="background-color: rgb(0, 255, 0); border: 1px solid rgb(0, 255, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#00ff00</span></td><td class="ColorCell" style="background-color: rgb(51, 0, 0); border: 1px solid rgb(51, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#330000</span></td><td class="ColorCell" style="background-color: rgb(51, 51, 0); border: 1px solid rgb(51, 51, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#333300</span></td><td class="ColorCell" style="background-color: rgb(51, 102, 0); border: 1px solid rgb(51, 102, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#336600</span></td><td class="ColorCell" style="background-color: rgb(51, 153, 0); border: 1px solid rgb(51, 153, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#339900</span></td><td class="ColorCell" style="background-color: rgb(51, 204, 0); border: 1px solid rgb(51, 204, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#33cc00</span></td><td class="ColorCell" style="background-color: rgb(51, 255, 0); border: 1px solid rgb(51, 255, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#33ff00</span></td><td class="ColorCell" style="background-color: rgb(102, 0, 0); border: 1px solid rgb(102, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#660000</span></td><td class="ColorCell" style="background-color: rgb(102, 51, 0); border: 1px solid rgb(102, 51, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#663300</span></td><td class="ColorCell" style="background-color: rgb(102, 102, 0); border: 1px solid rgb(102, 102, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#666600</span></td><td class="ColorCell" style="background-color: rgb(102, 153, 0); border: 1px solid rgb(102, 153, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#669900</span></td><td class="ColorCell" style="background-color: rgb(102, 204, 0); border: 1px solid rgb(102, 204, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#66cc00</span></td><td class="ColorCell" style="background-color: rgb(102, 255, 0); border: 1px solid rgb(102, 255, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#66ff00</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(0, 0, 51); border: 1px solid rgb(0, 0, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#000033</span></td><td class="ColorCell" style="background-color: rgb(0, 51, 51); border: 1px solid rgb(0, 51, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#003333</span></td><td class="ColorCell" style="background-color: rgb(0, 102, 51); border: 1px solid rgb(0, 102, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#006633</span></td><td class="ColorCell" style="background-color: rgb(0, 153, 51); border: 1px solid rgb(0, 153, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#009933</span></td><td class="ColorCell" style="background-color: rgb(0, 204, 51); border: 1px solid rgb(0, 204, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#00cc33</span></td><td class="ColorCell" style="background-color: rgb(0, 255, 51); border: 1px solid rgb(0, 255, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#00ff33</span></td><td class="ColorCell" style="background-color: rgb(51, 0, 51); border: 1px solid rgb(51, 0, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#330033</span></td><td class="ColorCell" style="background-color: rgb(51, 51, 51); border: 1px solid rgb(51, 51, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#333333</span></td><td class="ColorCell" style="background-color: rgb(51, 102, 51); border: 1px solid rgb(51, 102, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#336633</span></td><td class="ColorCell" style="background-color: rgb(51, 153, 51); border: 1px solid rgb(51, 153, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#339933</span></td><td class="ColorCell" style="background-color: rgb(51, 204, 51); border: 1px solid rgb(51, 204, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#33cc33</span></td><td class="ColorCell" style="background-color: rgb(51, 255, 51); border: 1px solid rgb(51, 255, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#33ff33</span></td><td class="ColorCell" style="background-color: rgb(102, 0, 51); border: 1px solid rgb(102, 0, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#660033</span></td><td class="ColorCell" style="background-color: rgb(102, 51, 51); border: 1px solid rgb(102, 51, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#663333</span></td><td class="ColorCell" style="background-color: rgb(102, 102, 51); border: 1px solid rgb(102, 102, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#666633</span></td><td class="ColorCell" style="background-color: rgb(102, 153, 51); border: 1px solid rgb(102, 153, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#669933</span></td><td class="ColorCell" style="background-color: rgb(102, 204, 51); border: 1px solid rgb(102, 204, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#66cc33</span></td><td class="ColorCell" style="background-color: rgb(102, 255, 51); border: 1px solid rgb(102, 255, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#66ff33</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(0, 0, 102); border: 1px solid rgb(0, 0, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#000066</span></td><td class="ColorCell" style="background-color: rgb(0, 51, 102); border: 1px solid rgb(0, 51, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#003366</span></td><td class="ColorCell" style="background-color: rgb(0, 102, 102); border: 1px solid rgb(0, 102, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#006666</span></td><td class="ColorCell" style="background-color: rgb(0, 153, 102); border: 1px solid rgb(0, 153, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#009966</span></td><td class="ColorCell" style="background-color: rgb(0, 204, 102); border: 1px solid rgb(0, 204, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#00cc66</span></td><td class="ColorCell" style="background-color: rgb(0, 255, 102); border: 1px solid rgb(0, 255, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#00ff66</span></td><td class="ColorCell" style="background-color: rgb(51, 0, 102); border: 1px solid rgb(51, 0, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#330066</span></td><td class="ColorCell" style="background-color: rgb(51, 51, 102); border: 1px solid rgb(51, 51, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#333366</span></td><td class="ColorCell" style="background-color: rgb(51, 102, 102); border: 1px solid rgb(51, 102, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#336666</span></td><td class="ColorCell" style="background-color: rgb(51, 153, 102); border: 1px solid rgb(51, 153, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#339966</span></td><td class="ColorCell" style="background-color: rgb(51, 204, 102); border: 1px solid rgb(51, 204, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#33cc66</span></td><td class="ColorCell" style="background-color: rgb(51, 255, 102); border: 1px solid rgb(51, 255, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#33ff66</span></td><td class="ColorCell" style="background-color: rgb(102, 0, 102); border: 1px solid rgb(102, 0, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#660066</span></td><td class="ColorCell" style="background-color: rgb(102, 51, 102); border: 1px solid rgb(102, 51, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#663366</span></td><td class="ColorCell" style="background-color: rgb(102, 102, 102); border: 1px solid rgb(102, 102, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#666666</span></td><td class="ColorCell" style="background-color: rgb(102, 153, 102); border: 1px solid rgb(102, 153, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#669966</span></td><td class="ColorCell" style="background-color: rgb(102, 204, 102); border: 1px solid rgb(102, 204, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#66cc66</span></td><td class="ColorCell" style="background-color: rgb(102, 255, 102); border: 1px solid rgb(102, 255, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#66ff66</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(0, 0, 153); border: 1px solid rgb(0, 0, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#000099</span></td><td class="ColorCell" style="background-color: rgb(0, 51, 153); border: 1px solid rgb(0, 51, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#003399</span></td><td class="ColorCell" style="background-color: rgb(0, 102, 153); border: 1px solid rgb(0, 102, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#006699</span></td><td class="ColorCell" style="background-color: rgb(0, 153, 153); border: 1px solid rgb(0, 153, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#009999</span></td><td class="ColorCell" style="background-color: rgb(0, 204, 153); border: 1px solid rgb(0, 204, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#00cc99</span></td><td class="ColorCell" style="background-color: rgb(0, 255, 153); border: 1px solid rgb(0, 255, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#00ff99</span></td><td class="ColorCell" style="background-color: rgb(51, 0, 153); border: 1px solid rgb(51, 0, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#330099</span></td><td class="ColorCell" style="background-color: rgb(51, 51, 153); border: 1px solid rgb(51, 51, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#333399</span></td><td class="ColorCell" style="background-color: rgb(51, 102, 153); border: 1px solid rgb(51, 102, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#336699</span></td><td class="ColorCell" style="background-color: rgb(51, 153, 153); border: 1px solid rgb(51, 153, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#339999</span></td><td class="ColorCell" style="background-color: rgb(51, 204, 153); border: 1px solid rgb(51, 204, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#33cc99</span></td><td class="ColorCell" style="background-color: rgb(51, 255, 153); border: 1px solid rgb(51, 255, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#33ff99</span></td><td class="ColorCell" style="background-color: rgb(102, 0, 153); border: 1px solid rgb(102, 0, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#660099</span></td><td class="ColorCell" style="background-color: rgb(102, 51, 153); border: 1px solid rgb(102, 51, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#663399</span></td><td class="ColorCell" style="background-color: rgb(102, 102, 153); border: 1px solid rgb(102, 102, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#666699</span></td><td class="ColorCell" style="background-color: rgb(102, 153, 153); border: 1px solid rgb(102, 153, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#669999</span></td><td class="ColorCell" style="background-color: rgb(102, 204, 153); border: 1px solid rgb(102, 204, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#66cc99</span></td><td class="ColorCell" style="background-color: rgb(102, 255, 153); border: 1px solid rgb(102, 255, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#66ff99</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(0, 0, 204); border: 1px solid rgb(0, 0, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#0000cc</span></td><td class="ColorCell" style="background-color: rgb(0, 51, 204); border: 1px solid rgb(0, 51, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#0033cc</span></td><td class="ColorCell" style="background-color: rgb(0, 102, 204); border: 1px solid rgb(0, 102, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#0066cc</span></td><td class="ColorCell" style="background-color: rgb(0, 153, 204); border: 1px solid rgb(0, 153, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#0099cc</span></td><td class="ColorCell" style="background-color: rgb(0, 204, 204); border: 1px solid rgb(0, 204, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#00cccc</span></td><td class="ColorCell" style="background-color: rgb(0, 255, 204); border: 1px solid rgb(0, 255, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#00ffcc</span></td><td class="ColorCell" style="background-color: rgb(51, 0, 204); border: 1px solid rgb(51, 0, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#3300cc</span></td><td class="ColorCell" style="background-color: rgb(51, 51, 204); border: 1px solid rgb(51, 51, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#3333cc</span></td><td class="ColorCell" style="background-color: rgb(51, 102, 204); border: 1px solid rgb(51, 102, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#3366cc</span></td><td class="ColorCell" style="background-color: rgb(51, 153, 204); border: 1px solid rgb(51, 153, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#3399cc</span></td><td class="ColorCell" style="background-color: rgb(51, 204, 204); border: 1px solid rgb(51, 204, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#33cccc</span></td><td class="ColorCell" style="background-color: rgb(51, 255, 204); border: 1px solid rgb(51, 255, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#33ffcc</span></td><td class="ColorCell" style="background-color: rgb(102, 0, 204); border: 1px solid rgb(102, 0, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#6600cc</span></td><td class="ColorCell" style="background-color: rgb(102, 51, 204); border: 1px solid rgb(102, 51, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#6633cc</span></td><td class="ColorCell" style="background-color: rgb(102, 102, 204); border: 1px solid rgb(102, 102, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#6666cc</span></td><td class="ColorCell" style="background-color: rgb(102, 153, 204); border: 1px solid rgb(102, 153, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#6699cc</span></td><td class="ColorCell" style="background-color: rgb(102, 204, 204); border: 1px solid rgb(102, 204, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#66cccc</span></td><td class="ColorCell" style="background-color: rgb(102, 255, 204); border: 1px solid rgb(102, 255, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#66ffcc</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(0, 0, 255); border: 1px solid rgb(0, 0, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#0000ff</span></td><td class="ColorCell" style="background-color: rgb(0, 51, 255); border: 1px solid rgb(0, 51, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#0033ff</span></td><td class="ColorCell" style="background-color: rgb(0, 102, 255); border: 1px solid rgb(0, 102, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#0066ff</span></td><td class="ColorCell" style="background-color: rgb(0, 153, 255); border: 1px solid rgb(0, 153, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#0099ff</span></td><td class="ColorCell" style="background-color: rgb(0, 204, 255); border: 1px solid rgb(0, 204, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#00ccff</span></td><td class="ColorCell" style="background-color: rgb(0, 255, 255); border: 1px solid rgb(0, 255, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#00ffff</span></td><td class="ColorCell" style="background-color: rgb(51, 0, 255); border: 1px solid rgb(51, 0, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#3300ff</span></td><td class="ColorCell" style="background-color: rgb(51, 51, 255); border: 1px solid rgb(51, 51, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#3333ff</span></td><td class="ColorCell" style="background-color: rgb(51, 102, 255); border: 1px solid rgb(51, 102, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#3366ff</span></td><td class="ColorCell" style="background-color: rgb(51, 153, 255); border: 1px solid rgb(51, 153, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#3399ff</span></td><td class="ColorCell" style="background-color: rgb(51, 204, 255); border: 1px solid rgb(51, 204, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#33ccff</span></td><td class="ColorCell" style="background-color: rgb(51, 255, 255); border: 1px solid rgb(51, 255, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#33ffff</span></td><td class="ColorCell" style="background-color: rgb(102, 0, 255); border: 1px solid rgb(102, 0, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#6600ff</span></td><td class="ColorCell" style="background-color: rgb(102, 51, 255); border: 1px solid rgb(102, 51, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#6633ff</span></td><td class="ColorCell" style="background-color: rgb(102, 102, 255); border: 1px solid rgb(102, 102, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#6666ff</span></td><td class="ColorCell" style="background-color: rgb(102, 153, 255); border: 1px solid rgb(102, 153, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#6699ff</span></td><td class="ColorCell" style="background-color: rgb(102, 204, 255); border: 1px solid rgb(102, 204, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#66ccff</span></td><td class="ColorCell" style="background-color: rgb(102, 255, 255); border: 1px solid rgb(102, 255, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#66ffff</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(153, 0, 0); border: 1px solid rgb(153, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#990000</span></td><td class="ColorCell" style="background-color: rgb(153, 51, 0); border: 1px solid rgb(153, 51, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#993300</span></td><td class="ColorCell" style="background-color: rgb(153, 102, 0); border: 1px solid rgb(153, 102, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#996600</span></td><td class="ColorCell" style="background-color: rgb(153, 153, 0); border: 1px solid rgb(153, 153, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#999900</span></td><td class="ColorCell" style="background-color: rgb(153, 204, 0); border: 1px solid rgb(153, 204, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#99cc00</span></td><td class="ColorCell" style="background-color: rgb(153, 255, 0); border: 1px solid rgb(153, 255, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#99ff00</span></td><td class="ColorCell" style="background-color: rgb(204, 0, 0); border: 1px solid rgb(204, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#cc0000</span></td><td class="ColorCell" style="background-color: rgb(204, 51, 0); border: 1px solid rgb(204, 51, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#cc3300</span></td><td class="ColorCell" style="background-color: rgb(204, 102, 0); border: 1px solid rgb(204, 102, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#cc6600</span></td><td class="ColorCell" style="background-color: rgb(204, 153, 0); border: 1px solid rgb(204, 153, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#cc9900</span></td><td class="ColorCell" style="background-color: rgb(204, 204, 0); border: 1px solid rgb(204, 204, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#cccc00</span></td><td class="ColorCell" style="background-color: rgb(204, 255, 0); border: 1px solid rgb(204, 255, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#ccff00</span></td><td class="ColorCell" style="background-color: rgb(255, 0, 0); border: 1px solid rgb(255, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#ff0000</span></td><td class="ColorCell" style="background-color: rgb(255, 51, 0); border: 1px solid rgb(255, 51, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#ff3300</span></td><td class="ColorCell" style="background-color: rgb(255, 102, 0); border: 1px solid rgb(255, 102, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#ff6600</span></td><td class="ColorCell" style="background-color: rgb(255, 153, 0); border: 1px solid rgb(255, 153, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#ff9900</span></td><td class="ColorCell" style="background-color: rgb(255, 204, 0); border: 1px solid rgb(255, 204, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#ffcc00</span></td><td class="ColorCell" style="background-color: rgb(255, 255, 0); border: 1px solid rgb(255, 255, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#ffff00</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(153, 0, 51); border: 1px solid rgb(153, 0, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#990033</span></td><td class="ColorCell" style="background-color: rgb(153, 51, 51); border: 1px solid rgb(153, 51, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#993333</span></td><td class="ColorCell" style="background-color: rgb(153, 102, 51); border: 1px solid rgb(153, 102, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#996633</span></td><td class="ColorCell" style="background-color: rgb(153, 153, 51); border: 1px solid rgb(153, 153, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#999933</span></td><td class="ColorCell" style="background-color: rgb(153, 204, 51); border: 1px solid rgb(153, 204, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#99cc33</span></td><td class="ColorCell" style="background-color: rgb(153, 255, 51); border: 1px solid rgb(153, 255, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#99ff33</span></td><td class="ColorCell" style="background-color: rgb(204, 0, 51); border: 1px solid rgb(204, 0, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#cc0033</span></td><td class="ColorCell" style="background-color: rgb(204, 51, 51); border: 1px solid rgb(204, 51, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#cc3333</span></td><td class="ColorCell" style="background-color: rgb(204, 102, 51); border: 1px solid rgb(204, 102, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#cc6633</span></td><td class="ColorCell" style="background-color: rgb(204, 153, 51); border: 1px solid rgb(204, 153, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#cc9933</span></td><td class="ColorCell" style="background-color: rgb(204, 204, 51); border: 1px solid rgb(204, 204, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#cccc33</span></td><td class="ColorCell" style="background-color: rgb(204, 255, 51); border: 1px solid rgb(204, 255, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#ccff33</span></td><td class="ColorCell" style="background-color: rgb(255, 0, 51); border: 1px solid rgb(255, 0, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#ff0033</span></td><td class="ColorCell" style="background-color: rgb(255, 51, 51); border: 1px solid rgb(255, 51, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#ff3333</span></td><td class="ColorCell" style="background-color: rgb(255, 102, 51); border: 1px solid rgb(255, 102, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#ff6633</span></td><td class="ColorCell" style="background-color: rgb(255, 153, 51); border: 1px solid rgb(255, 153, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#ff9933</span></td><td class="ColorCell" style="background-color: rgb(255, 204, 51); border: 1px solid rgb(255, 204, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#ffcc33</span></td><td class="ColorCell" style="background-color: rgb(255, 255, 51); border: 1px solid rgb(255, 255, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#ffff33</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(153, 0, 102); border: 1px solid rgb(153, 0, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#990066</span></td><td class="ColorCell" style="background-color: rgb(153, 51, 102); border: 1px solid rgb(153, 51, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#993366</span></td><td class="ColorCell" style="background-color: rgb(153, 102, 102); border: 1px solid rgb(153, 102, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#996666</span></td><td class="ColorCell" style="background-color: rgb(153, 153, 102); border: 1px solid rgb(153, 153, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#999966</span></td><td class="ColorCell" style="background-color: rgb(153, 204, 102); border: 1px solid rgb(153, 204, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#99cc66</span></td><td class="ColorCell" style="background-color: rgb(153, 255, 102); border: 1px solid rgb(153, 255, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#99ff66</span></td><td class="ColorCell" style="background-color: rgb(204, 0, 102); border: 1px solid rgb(204, 0, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#cc0066</span></td><td class="ColorCell" style="background-color: rgb(204, 51, 102); border: 1px solid rgb(204, 51, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#cc3366</span></td><td class="ColorCell" style="background-color: rgb(204, 102, 102); border: 1px solid rgb(204, 102, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#cc6666</span></td><td class="ColorCell" style="background-color: rgb(204, 153, 102); border: 1px solid rgb(204, 153, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#cc9966</span></td><td class="ColorCell" style="background-color: rgb(204, 204, 102); border: 1px solid rgb(204, 204, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#cccc66</span></td><td class="ColorCell" style="background-color: rgb(204, 255, 102); border: 1px solid rgb(204, 255, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#ccff66</span></td><td class="ColorCell" style="background-color: rgb(255, 0, 102); border: 1px solid rgb(255, 0, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#ff0066</span></td><td class="ColorCell" style="background-color: rgb(255, 51, 102); border: 1px solid rgb(255, 51, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#ff3366</span></td><td class="ColorCell" style="background-color: rgb(255, 102, 102); border: 1px solid rgb(255, 102, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#ff6666</span></td><td class="ColorCell" style="background-color: rgb(255, 153, 102); border: 1px solid rgb(255, 153, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#ff9966</span></td><td class="ColorCell" style="background-color: rgb(255, 204, 102); border: 1px solid rgb(255, 204, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#ffcc66</span></td><td class="ColorCell" style="background-color: rgb(255, 255, 102); border: 1px solid rgb(255, 255, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#ffff66</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(153, 0, 153); border: 1px solid rgb(153, 0, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#990099</span></td><td class="ColorCell" style="background-color: rgb(153, 51, 153); border: 1px solid rgb(153, 51, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#993399</span></td><td class="ColorCell" style="background-color: rgb(153, 102, 153); border: 1px solid rgb(153, 102, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#996699</span></td><td class="ColorCell" style="background-color: rgb(153, 153, 153); border: 1px solid rgb(153, 153, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#999999</span></td><td class="ColorCell" style="background-color: rgb(153, 204, 153); border: 1px solid rgb(153, 204, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#99cc99</span></td><td class="ColorCell" style="background-color: rgb(153, 255, 153); border: 1px solid rgb(153, 255, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#99ff99</span></td><td class="ColorCell" style="background-color: rgb(204, 0, 153); border: 1px solid rgb(204, 0, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#cc0099</span></td><td class="ColorCell" style="background-color: rgb(204, 51, 153); border: 1px solid rgb(204, 51, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#cc3399</span></td><td class="ColorCell" style="background-color: rgb(204, 102, 153); border: 1px solid rgb(204, 102, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#cc6699</span></td><td class="ColorCell" style="background-color: rgb(204, 153, 153); border: 1px solid rgb(204, 153, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#cc9999</span></td><td class="ColorCell" style="background-color: rgb(204, 204, 153); border: 1px solid rgb(204, 204, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#cccc99</span></td><td class="ColorCell" style="background-color: rgb(204, 255, 153); border: 1px solid rgb(204, 255, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#ccff99</span></td><td class="ColorCell" style="background-color: rgb(255, 0, 153); border: 1px solid rgb(255, 0, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#ff0099</span></td><td class="ColorCell" style="background-color: rgb(255, 51, 153); border: 1px solid rgb(255, 51, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#ff3399</span></td><td class="ColorCell" style="background-color: rgb(255, 102, 153); border: 1px solid rgb(255, 102, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#ff6699</span></td><td class="ColorCell" style="background-color: rgb(255, 153, 153); border: 1px solid rgb(255, 153, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#ff9999</span></td><td class="ColorCell" style="background-color: rgb(255, 204, 153); border: 1px solid rgb(255, 204, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#ffcc99</span></td><td class="ColorCell" style="background-color: rgb(255, 255, 153); border: 1px solid rgb(255, 255, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#ffff99</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(153, 0, 204); border: 1px solid rgb(153, 0, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#9900cc</span></td><td class="ColorCell" style="background-color: rgb(153, 51, 204); border: 1px solid rgb(153, 51, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#9933cc</span></td><td class="ColorCell" style="background-color: rgb(153, 102, 204); border: 1px solid rgb(153, 102, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#9966cc</span></td><td class="ColorCell" style="background-color: rgb(153, 153, 204); border: 1px solid rgb(153, 153, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#9999cc</span></td><td class="ColorCell" style="background-color: rgb(153, 204, 204); border: 1px solid rgb(153, 204, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#99cccc</span></td><td class="ColorCell" style="background-color: rgb(153, 255, 204); border: 1px solid rgb(153, 255, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#99ffcc</span></td><td class="ColorCell" style="background-color: rgb(204, 0, 204); border: 1px solid rgb(204, 0, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#cc00cc</span></td><td class="ColorCell" style="background-color: rgb(204, 51, 204); border: 1px solid rgb(204, 51, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#cc33cc</span></td><td class="ColorCell" style="background-color: rgb(204, 102, 204); border: 1px solid rgb(204, 102, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#cc66cc</span></td><td class="ColorCell" style="background-color: rgb(204, 153, 204); border: 1px solid rgb(204, 153, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#cc99cc</span></td><td class="ColorCell" style="background-color: rgb(204, 204, 204); border: 1px solid rgb(204, 204, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#cccccc</span></td><td class="ColorCell" style="background-color: rgb(204, 255, 204); border: 1px solid rgb(204, 255, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#ccffcc</span></td><td class="ColorCell" style="background-color: rgb(255, 0, 204); border: 1px solid rgb(255, 0, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#ff00cc</span></td><td class="ColorCell" style="background-color: rgb(255, 51, 204); border: 1px solid rgb(255, 51, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#ff33cc</span></td><td class="ColorCell" style="background-color: rgb(255, 102, 204); border: 1px solid rgb(255, 102, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#ff66cc</span></td><td class="ColorCell" style="background-color: rgb(255, 153, 204); border: 1px solid rgb(255, 153, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#ff99cc</span></td><td class="ColorCell" style="background-color: rgb(255, 204, 204); border: 1px solid rgb(255, 204, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#ffcccc</span></td><td class="ColorCell" style="background-color: rgb(255, 255, 204); border: 1px solid rgb(255, 255, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#ffffcc</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(153, 0, 255); border: 1px solid rgb(153, 0, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#9900ff</span></td><td class="ColorCell" style="background-color: rgb(153, 51, 255); border: 1px solid rgb(153, 51, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#9933ff</span></td><td class="ColorCell" style="background-color: rgb(153, 102, 255); border: 1px solid rgb(153, 102, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#9966ff</span></td><td class="ColorCell" style="background-color: rgb(153, 153, 255); border: 1px solid rgb(153, 153, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#9999ff</span></td><td class="ColorCell" style="background-color: rgb(153, 204, 255); border: 1px solid rgb(153, 204, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#99ccff</span></td><td class="ColorCell" style="background-color: rgb(153, 255, 255); border: 1px solid rgb(153, 255, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#99ffff</span></td><td class="ColorCell" style="background-color: rgb(204, 0, 255); border: 1px solid rgb(204, 0, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#cc00ff</span></td><td class="ColorCell" style="background-color: rgb(204, 51, 255); border: 1px solid rgb(204, 51, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#cc33ff</span></td><td class="ColorCell" style="background-color: rgb(204, 102, 255); border: 1px solid rgb(204, 102, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#cc66ff</span></td><td class="ColorCell" style="background-color: rgb(204, 153, 255); border: 1px solid rgb(204, 153, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#cc99ff</span></td><td class="ColorCell" style="background-color: rgb(204, 204, 255); border: 1px solid rgb(204, 204, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ccccff</span></td><td class="ColorCell" style="background-color: rgb(204, 255, 255); border: 1px solid rgb(204, 255, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ccffff</span></td><td class="ColorCell" style="background-color: rgb(255, 0, 255); border: 1px solid rgb(255, 0, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ff00ff</span></td><td class="ColorCell" style="background-color: rgb(255, 51, 255); border: 1px solid rgb(255, 51, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ff33ff</span></td><td class="ColorCell" style="background-color: rgb(255, 102, 255); border: 1px solid rgb(255, 102, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ff66ff</span></td><td class="ColorCell" style="background-color: rgb(255, 153, 255); border: 1px solid rgb(255, 153, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ff99ff</span></td><td class="ColorCell" style="background-color: rgb(255, 204, 255); border: 1px solid rgb(255, 204, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ffccff</span></td><td class="ColorCell" style="background-color: rgb(255, 255, 255); border: 1px solid rgb(255, 255, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ffffff</span></td></tr><tr><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(51, 51, 51); border: 1px solid rgb(51, 51, 51); width: 14px; height: 14px;"><span class="cke_voice_label">#333333</span></td><td class="ColorCell" style="background-color: rgb(102, 102, 102); border: 1px solid rgb(102, 102, 102); width: 14px; height: 14px;"><span class="cke_voice_label">#666666</span></td><td class="ColorCell" style="background-color: rgb(153, 153, 153); border: 1px solid rgb(153, 153, 153); width: 14px; height: 14px;"><span class="cke_voice_label">#999999</span></td><td class="ColorCell" style="background-color: rgb(204, 204, 204); border: 1px solid rgb(204, 204, 204); width: 14px; height: 14px;"><span class="cke_voice_label">#cccccc</span></td><td class="ColorCell" style="background-color: rgb(255, 255, 255); border: 1px solid rgb(255, 255, 255); width: 14px; height: 14px;"><span class="cke_voice_label">#ffffff</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td><td class="ColorCell" style="background-color: rgb(0, 0, 0); border: 1px solid rgb(0, 0, 0); width: 14px; height: 14px;"><span class="cke_voice_label">#000000</span></td></tr></tbody></table></div></td><td class="cke_dialog_ui_hbox_child" style="width:10%; padding:0"><span class="cke_dialog_ui_html">&nbsp;</span></td><td class="cke_dialog_ui_hbox_last" style="width:30%; padding:0"><div class="cke_dialog_ui_vbox"><table cellspacing="0" border="0" style="width:100%;" align="left"><tbody><tr><td style="padding:0" class="cke_dialog_ui_vbox_child"><span class="cke_dialog_ui_html">Highlight</span><div style="border: 1px solid; height: 74px; width: 74px; background-color: #000;" class="color-preview"></div><div>#000000</div><span>Selected Color</span><div style="border: 1px solid; height: 20px; width: 74px;" class="selected-preview"></div></td></tr><tr><td style="padding:0" class="cke_dialog_ui_vbox_child"><div class="cke_dialog_ui_text" style="width: 74px"><label class="cke_dialog_ui_labeled_label" for="cke_561_textInput" style="display:none">Selected Color</label><div class="cke_dialog_ui_labeled_content"><div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text more_colors-input" type="text"></div></div></div></td></tr><tr><td style="padding:0" class="cke_dialog_ui_vbox_child"><span class="cke_dialog_ui_html">&nbsp;</span></td></tr><tr><td style="padding:0" class="cke_dialog_ui_vbox_child"><a style="margin-top: 5px" href="javascript:void(0)" title="Clear" hidefocus="true" class="cke_dialog_ui_button"><span class="cke_dialog_ui_button">Clear</span></a></td></tr></tbody></table></div></td></tr></tbody></table></td></tr></tbody></table></div></td></tr><tr><td class="cke_dialog_footer"><table class="cke_dialog_ui_hbox cke_dialog_footer_buttons"><tbody><tr class="cke_dialog_ui_hbox"><td class="cke_dialog_ui_hbox_first" style="padding-right: 10px;"><a href="javascript:void(0)" title="OK" hidefocus="true" class="cke_dialog_ui_button cke_dialog_ui_button_ok"><span class="cke_dialog_ui_button">OK</span></a></td><td class="cke_dialog_ui_hbox_last"><a href="javascript:void(0)" title="Cancel" hidefocus="true" class="cke_dialog_ui_button cke_dialog_ui_button_cancel"><span class="cke_dialog_ui_button">Cancel</span></a></td></tr></tbody></table></td></tr></tbody></table></div>');
		jQuery('body').prepend(main);
		
		var requestDrag = new Draggable('more_colors-request', { handle: 'request-type', starteffect: null, endeffect: null });
		
		if (jQuery('#request-background').length < 1) {
			var requestbackground = document.createElement('div');
			jQuery(requestbackground).attr('id', 'request-background');
			jQuery(requestbackground).addClass('cke_dialog_background_cover');
			jQuery(requestbackground).css({
				'position': 'fixed',
				'z-index': 10000,
				'top': '0px',
				'left': '0px',
				'opacity': 0.5,
				'width': '100%',
				'height': '100%',
				'display': 'none'
			});
			jQuery('body').prepend(requestbackground);
		}
		
		jQuery('.more_colors-request .ColorCell').mouseenter(function() {
			jQuery('.more_colors-request .color-preview').css('background-color', jQuery(this).find('span').text());
			jQuery('.more_colors-request .color-preview').next('div').text(jQuery(this).find('span').text());
		});
		
		jQuery('.more_colors-request .ColorCell').on('click', function() {
			jQuery('.more_colors-request .selected-cell').css('border', '1px solid ' + jQuery('.more_colors-request .selected-cell').css('background-color')).removeClass('selected-cell');
			jQuery('.more_colors-request .selected-preview').css('background-color', jQuery(this).find('span').text());
			jQuery('.more_colors-request .more_colors-input').val(jQuery(this).find('span').text());
			jQuery(this).css('border', '1px dotted #fff').addClass('selected-cell').focus();
		});
			
		jQuery('.more_colors-request .cke_dialog_ui_button[title=Clear]').on('click', function() {
			jQuery('.more_colors-request .selected-cell').css('border', '1px solid ' + jQuery('.more_colors-request .selected-cell').css('background-color')).removeClass('selected-cell').blur();
			jQuery('.more_colors-request .selected-preview').css('background-color', '');
			jQuery('.more_colors-request .selected-preview').css('background-color', jQuery(this).find('span').text());
			jQuery('.more_colors-request .more_colors-input').val('');
		});
			
		
		jQuery('.more_colors-request .cke_dialog_close_button, .more_colors-request .cke_dialog_ui_button[title=Cancel], .more_colors-request .cke_dialog_ui_button[title=OK]').on('click', function() {
			jQuery('.more_colors-request').hide();
			jQuery('#request-background').hide();
		});
	}

	if (editor.find('.cke_button_ipssource').hasClass('cke_on')) {
		editor.find('.cke_button_ipsbbcode, .cke_font, .cke_fontSize, .cke_button_textcolor, .cke_button_ipsemoticon, .cke_button_bold, .cke_button_italic, .cke_button_underline, .cke_button_strike, .cke_button_subscript, .cke_button_superscript, .cke_button_bulletedlist, .cke_button_numberedlist, .cke_button_link, .cke_button_image, .cke_button_ipscode, .cke_button_ipsquote, .cke_button_indent, .cke_button_justifycenter, .cke_button_justifyright').removeClass('cke_disabled');
		if (!editor.find('.cke_button_ipssource').hasClass('bbcode-parsed')) {
			plaintextParser();
		}
	}


	editor.find('.cke_button_ipssource').on('click', function() {
		setTimeout(function() {
			if (editor.find('.cke_button_ipssource').attr('aria-pressed') == 'true') {
				var checker = setInterval(function() {
					if (editor.find('.cke_button_ipssource').attr('aria-pressed') == 'true' && editor.find('.cke_button_removeFormat').hasClass('cke_disabled')) {
						editor.find('.cke_button_ipsbbcode, .cke_font, .cke_fontSize, .cke_button_textcolor, .cke_button_ipsemoticon, .cke_button_bold, .cke_button_italic, .cke_button_underline, .cke_button_strike, .cke_button_subscript, .cke_button_superscript, .cke_button_blletedlist, .cke_button_numberedlist, .cke_button_link, .cke_button_image, .cke_button_ipscode, .cke_button_ipsquote, .cke_button_indent, .cke_button_justifycenter, .cke_button_justifyright').removeClass('cke_disabled');
						if (!editor.find('.cke_button_ipssource').hasClass('bbcode-parsed')) {
							plaintextParser();
						}
						clearTimeout(checker);
					}
				}, 10);
			}
		}, 100);
		editor.find('.ipsSmileyTray').slideUp('fast');
	});


	jQuery.fn.selectRange = function(start, end) {
		return this.each(function() {
			if (this.setSelectionRange) {
				this.focus();
				this.setSelectionRange(start, end);
			} else if (this.createTextRange) {
				var range = this.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
		});
	};

	function wrapText(elementSelector, openTag, closeTag, contentField) {
		var textArea = editor.find(elementSelector),
		len = textArea.val().length,
		start = textArea[0].selectionStart,
		end = textArea[0].selectionEnd,
		selectedText = textArea.val().substring(start, end),
		replacement,
		paste = document.createEvent('TextEvent');
		if (contentField != null) {
			replacement = openTag + contentField.value + closeTag;
		} else {
			replacement = openTag + selectedText + closeTag;
		}
		if (paste.initTextEvent) {
			paste.initTextEvent('textInput', true, true, null, replacement);
			textArea[0].dispatchEvent(paste);
		} else {
			textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
		}
		textArea.selectRange(start + openTag.length, end + openTag.length);
	}

	function plaintextParser() {
		editor.find('.cke_button > a, .cke_rcombo > span > a').click(function(event) {
			if (editor.find('.cke_contents > textarea').is(':visible')) {
				switch (jQuery(this).attr('title')) {
					case 'Special BBCode':
						if (jQuery('.plaintext-request').length < 1) {
							createRequest();
						}
						jQuery('.plaintext-request .request-type').text('Special BBCode');
						jQuery('.plaintext-request .spec').html('BBCode');
						jQuery('.plaintext-request .fields').html('<select class="cke_dialog_ui_input_select sp_BBCode"><option value="Default"> Please select</option><option value="Acronym"> Acronym</option><option value="Background-color"> Background-color</option><option value="Blog Entry Link"> Blog Entry Link</option><option value="Blog Link"> Blog Link</option><option value="Extract Blog Entry"> Extract Blog Entry</option><option value="Horizontal Rule"> Horizontal Rule</option><option value="Media"> Media</option><option value="Member"> Member</option><option value="Optional"> Optional</option><option value="Post Link"> Post Link</option><option value="Spoiler"> Spoiler</option><option value="Topic Link"> Topic Link</option><option value="Twitter"> Twitter</option></select><div class="sp_BBCode_fields" style="padding-top: 5px;"></div>');
						jQuery('.plaintext-request .fields .sp_BBCode').on('change', function() {
							switch (jQuery('.plaintext-request .fields .sp_BBCode').val()) {
								case 'Acronym':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">Allows you to make an acronym that will display a description when moused over.</div><div class="cke_dialog_ui_vbox_child">Enter the description for this acronym (EG: Laugh Out Loud)<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Enter the acronym (EG: lol)<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Background-color':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">Adds a background color behind the text.</div><div class="cke_dialog_ui_vbox_child">Option<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Content<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Blog Entry Link':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">This tag provides an easy way to link to a blog entry.</div><div class="cke_dialog_ui_vbox_child">Option<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Content<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Blog Link':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">This tag provides an easy way to link to a blog.</div><div class="cke_dialog_ui_vbox_child">Option<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Content<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Extract Blog Entry':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">This will allow users to define an extract for an entry. Only this piece of the entry will be displayed on the main blog page and will show up in the RSS feed.</div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Content<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Horizontal Rule':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">Adds a horizontal rule to separate text.</div>');
								break;
								case 'Media':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">Allows a user to post media content from certain common media sites.</div><div class="cke_dialog_ui_vbox_child">Dimensions (Flash Only)<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Media URL<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Member':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">Given a member name, a link is automatically generated to the member\'s profile.</div><div class="cke_dialog_ui_vbox_child">Member Name<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div>');
								break;
								case 'Optional':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Content<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Post Link':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">This tag provides an easy way to link to a post.</div><div class="cke_dialog_ui_vbox_child">Enter the Post ID<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Enter the title for this link<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Spoiler':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">Spoiler tag.</div><div class="cke_dialog_ui_vbox_child">Option<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Enter the text to be masked<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Topic Link':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">This tag provides an easy way to link to a topic.</div><div class="cke_dialog_ui_vbox_child">Enter the Topic ID<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Enter the title for this link<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								case 'Twitter':
									jQuery(this).next('.sp_BBCode_fields').html('<div class="cke_dialog_ui_vbox_child" style="color: #666 !important; white-space: normal !important; word-wrap: break-word;">A tag to link to a user\'s twitter account.</div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;">Twitter Username<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" rows="5" cols="20"></textarea></div></div>');
								break;
								default:
									jQuery(this).next('.sp_BBCode_fields').html('');
							}
							var textArea = editor.find('.cke_contents > textarea');
							var start = textArea[0].selectionStart;
							var end = textArea[0].selectionEnd;
							var selectedText = textArea.val().substring(start, end);
							if (jQuery('.plaintext-request .sp_BBCode_fields textarea').length && selectedText.length > 0) {
								jQuery('.plaintext-request .sp_BBCode_fields textarea').val(selectedText);
							}
						});
						jQuery('.plaintext-request .cke_dialog_ui_button[title=OK]').on('click.specialbbcode', function() {
							switch (jQuery('.plaintext-request .sp_BBCode').val()) {
								case 'Acronym':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[acronym=' + input + ']', '[/acronym]', textarea);
								break;
								case 'Background-color':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[background=' + input + ']', '[/background]', textarea);
								break;
								case 'Blog Entry Link':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[entry=' + input + ']', '[/entry]', textarea);
								break;
								case 'Blog Link':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[blog=' + input + ']', '[/blog]', textarea);
								break;
								case 'Extract Blog Entry':
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[extract]', '[/extract]', textarea);
								break;
								case 'Horizontal Rule':
									wrapText('.cke_contents > textarea', '[hr]', '');
								break;
								case 'Media':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[media=' + input + ']', '[/media]', textarea);
								break;
								case 'Member':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									wrapText('.cke_contents > textarea', '[member=' + input + ']', '');
								break;
								case 'Optional':
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[optional]', '[/optional]', textarea);
								break;
								case 'Post Link':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[post=' + input + ']', '[/post]', textarea);
								break;
								case 'Spoiler':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									if (input.length) {
										wrapText('.cke_contents > textarea', '[spoiler=' + input + ']', '[/spoiler]', textarea);
									} else {
										wrapText('.cke_contents > textarea', '[spoiler]', '[/spoiler]', textarea);
									}
								break;
								case 'Topic Link':
									var input = jQuery('.plaintext-request .sp_BBCode_fields input')[0].value;
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[topic=' + input + ']', '[/topic]', textarea);
								break;
								case 'Twitter':
									var textarea = jQuery('.plaintext-request .sp_BBCode_fields textarea')[0];
									wrapText('.cke_contents > textarea', '[twitter]', '[/twitter]', textarea);
								break;
							}
							jQuery(this).off('click.specialbbcode');
						});
						jQuery('#request-background').show();
						jQuery('.plaintext-request').show();
						
						var top = '0px';
						if (jQuery(window).height() > jQuery('#plaintext-request').outerHeight()) {
							top = (jQuery(window).height() / 2) - (jQuery('#plaintext-request').outerHeight() / 2) + 'px';
						}
						
						jQuery('#plaintext-request').css({
							'top': top,
							'left': (jQuery(window).width() / 2) - 200 + 'px',
							'width': '400px'
						});
						jQuery('.plaintext-request .fields .sp_BBCode').focus();
					break;
				
					case 'Font Name':
						if (jQuery('.font-dropdown').length < 1) {
							createFontDropdown();
						}
						
						if (!jQuery('.font-dropdown').is(':visible')) {
							editor.find('.cke_font').removeClass('cke_off');
							editor.find('.cke_font').addClass('cke_on');
							jQuery('.font-dropdown .main-list a').on('click.fonts', function() {
								wrapText('.cke_contents > textarea', '[font=' + jQuery(this).find('span').css('font-family').replace(/'/g, "").replace(/, /g, ",") + ']', '[/font]');
							});
						} else {
							editor.find('.cke_font').removeClass('cke_on');
							editor.find('.cke_font').addClass('cke_off');
							jQuery('.font-dropdown .main-list a').off('click.fonts');
						}
						
						if (jQuery('.font-dropdown').is(':visible')) {
							jQuery('.font-dropdown').hide();
						} else {
							jQuery('.font-dropdown').show();
							setTimeout(function() {
								jQuery('html').one('click', function() {
									if (jQuery('.font-dropdown').is(':visible')) {
										jQuery('.font-dropdown').hide();
										editor.find('.cke_font').removeClass('cke_on');
										editor.find('.cke_font').addClass('cke_off');
										jQuery('.font-dropdown .main-list a').off('click.fonts');
									}
								});
							}, 1);
						}
						
						var top = '0px';
						if ((jQuery(window).scrollTop() + jQuery(window).height()) - (editor.find('.cke_font > a').offset().top + editor.find('.cke_font > a').height() - 1) >= jQuery('.font-dropdown').outerHeight()) {
							top = editor.find('.cke_font > a').offset().top + editor.find('.cke_font > a').height() - 1 + 'px';
						} else if ((jQuery(window).scrollTop() + jQuery(window).height()) - (editor.find('.cke_font > a').offset().top + editor.find('.cke_font > a').height() - 1) < jQuery('.font-dropdown').outerHeight() && (editor.find('.cke_font > a').offset().top + editor.find('.cke_font > a').height() - 1) - jQuery(window).scrollTop() > jQuery('.font-dropdown').outerHeight()) {
							top = editor.find('.cke_font > a').offset().top + editor.find('.cke_font > a').height() - 1 - jQuery('.font-dropdown').outerHeight() + 'px';
						} else {
							top = jQuery(window).scrollTop() + 'px';
						}
						
						jQuery('.font-dropdown').css({
							'top': top,
							'left': editor.find('.cke_font > a').offset().left + 'px'
						});
					break;
	
					case 'Font Size':
						if (jQuery('.size-dropdown').length < 1) {
							createSizeDropdown();
						}
						
						if (!jQuery('.size-dropdown').is(':visible')) {
							editor.find('.cke_fontSize').removeClass('cke_off');
							editor.find('.cke_fontSize').addClass('cke_on');
							jQuery('.size-dropdown .main-list a').on('click.sizes', function() {
								wrapText('.cke_contents > textarea', '[size=' + jQuery(this).attr('id').split('Size_')[1] + ']', '[/size]');
							});
						} else {
							editor.find('.cke_fontSize').removeClass('cke_on');
							editor.find('.cke_fontSize').addClass('cke_off');
							jQuery('.size-dropdown .main-list a').off('click.sizes');
						}
						
						if (jQuery('.size-dropdown').is(':visible')) {
							jQuery('.size-dropdown').hide();
						} else {
							jQuery('.size-dropdown').show();
							setTimeout(function() {
								jQuery('html').one('click', function() {
									if (jQuery('.size-dropdown').is(':visible')) {
										jQuery('.size-dropdown').hide();
										editor.find('.cke_fontSize').removeClass('cke_on');
										editor.find('.cke_fontSize').addClass('cke_off');
										jQuery('.size-dropdown .main-list a').off('click.sizes');
									}
								});
							}, 1);
						}
						
						var top = '0px';
						if ((jQuery(window).scrollTop() + jQuery(window).height()) - (editor.find('.cke_fontSize > a').offset().top + editor.find('.cke_fontSize > a').height() - 1) >= jQuery('.size-dropdown').outerHeight()) {
							top = editor.find('.cke_fontSize > a').offset().top + editor.find('.cke_fontSize > a').height() - 1 + 'px';
						} else if ((jQuery(window).scrollTop() + jQuery(window).height()) - (jQuery('.cke_fontSize > a').offset().top + jQuery('.cke_fontSize > a').height() - 1) < jQuery('.size-dropdown').outerHeight() && (editor.find('.cke_fontSize > a').offset().top + editor.find('.cke_fontSize > a').height() - 1) - jQuery(window).scrollTop() > jQuery('.size-dropdown').outerHeight()) {
							top = editor.find('.cke_fontSize > a').offset().top + editor.find('.cke_fontSize > a').height() - 1 - jQuery('.size-dropdown').outerHeight() + 'px';
						} else {
							top = jQuery(window).scrollTop() + 'px';
						}
						
						jQuery('.size-dropdown').css({
							'top': top,
							'left': editor.find('.cke_fontSize > a').offset().left + 'px',
						});
					break; 
	
					case 'Text Color':
						if (jQuery('.color-dropdown').length < 1) {
							createColorDropdown();
						}
						
						jQuery('.color-dropdown a.cke_colorauto').on('click.colorauto', function() {
								wrapText('.cke_contents > textarea', '[color=' + jQuery(this).find('span').css('background-color') + ']', '[/color]');
						});
						
						jQuery('.color-dropdown a.cke_colorbox').on('click.colorbox', function() {
							wrapText('.cke_contents > textarea', '[color=' + jQuery(this).find('span').css('background-color') + ']', '[/color]');
						});
						
						jQuery('.color-dropdown a.cke_colormore').on('click.colormore', function() {
							if (jQuery('.more_colors-request').length < 1) {
								createMoreColorsPicker();
							}
							jQuery('.more_colors-request .cke_dialog_ui_button[title=OK]').on('click.morecolors', function() {
								var color = jQuery('.more_colors-request .more_colors-input')[0].value;
								wrapText('.cke_contents > textarea', '[color=' + color + ']', '[/color]');
								jQuery(this).off('click.morecolors');
							});
							jQuery('#request-background').show();
							jQuery('.more_colors-request').show();
							
							var top = '0px';
							if (jQuery(window).height() > jQuery('#more_colors-request').outerHeight()) {
								top = (jQuery(window).height() / 2) - (jQuery('#more_colors-request').outerHeight() / 2) + 'px';
							}
							
							jQuery('#more_colors-request').css({
								'top': top,
								'left': (jQuery(window).width() / 2) - 190 + 'px',
							});
							jQuery('.more_colors-request .selected-cell').css('border', '1px solid ' + jQuery('.more_colors-request .selected-cell').css('background-color')).removeClass('selected-cell').blur();
							jQuery('.more_colors-request .ColorCell:first').css('border', '1px dotted #fff').addClass('selected-cell').focus();
						});
						
						if (!jQuery('.color-dropdown').is(':visible')) {
							editor.find('.cke_button_textcolor').removeClass('cke_off');
							editor.find('.cke_button_textcolor').addClass('cke_on');
						} else {
							editor.find('.cke_button_textcolor').removeClass('cke_on');
							editor.find('.cke_button_textcolor').addClass('cke_off');
						}
						
						if (jQuery('.color-dropdown').is(':visible')) {
							jQuery('.color-dropdown').hide();
							jQuery('.color-dropdown a.cke_colorauto').off('click.colorauto');
							jQuery('.color-dropdown a.cke_colorbox').off('click.colorbox');
							jQuery('.color-dropdown a.cke_colormore').off('click.colormore');
						} else {
							jQuery('.color-dropdown').show();
							setTimeout(function() {
								jQuery('html').one('click', function() {
									if (jQuery('.color-dropdown').is(':visible')) {
										jQuery('.color-dropdown').hide();
										editor.find('.cke_button_textcolor').removeClass('cke_on');
										editor.find('.cke_button_textcolor').addClass('cke_off');
										jQuery('.color-dropdown a.cke_colorauto').off('click.colorauto');
										jQuery('.color-dropdown a.cke_colorbox').off('click.colorbox');
										jQuery('.color-dropdown a.cke_colormore').off('click.colormore');
									}
								});
							}, 1);
						}
						
						var top = '0px';
						if ((jQuery(window).scrollTop() + jQuery(window).height()) - (editor.find('.cke_button_textcolor').offset().top + editor.find('.cke_button_textcolor').outerHeight() - 1) >= jQuery('.color-dropdown').outerHeight()) {
							top = editor.find('.cke_button_textcolor').offset().top + editor.find('.cke_button_textcolor').outerHeight() - 1 + 'px';
						} else if ((jQuery(window).scrollTop() + jQuery(window).height()) - (jQuery('.cke_button_textcolor').offset().top + jQuery('.cke_button_textcolor').outerHeight() - 1) < jQuery('.color-dropdown').outerHeight() && (editor.find('.cke_button_textcolor').offset().top + editor.find('.cke_button_textcolor').outerHeight() - 1) - jQuery(window).scrollTop() > jQuery('.color-dropdown').outerHeight()) {
							top = editor.find('.cke_button_textcolor').offset().top + editor.find('.cke_button_textcolor').outerHeight() - 1 - jQuery('.color-dropdown').outerHeight() + 'px';
						} else {
							top = jQuery(window).scrollTop() + 'px';
						}
						
						jQuery('.color-dropdown').css({
							'top': top,
							'left': editor.find('.cke_button_textcolor').offset().left + 'px',
						});
					break;
	
					case 'Smiley':
						if (!editor.find('.ipsSmileyTray')[0]) {
							var textAreaRestore = editor.find('.cke_contents > textarea');
							var restoreContent = textAreaRestore.val();
							var RestoreStart = textAreaRestore[0].selectionStart;
							var RestoreEnd = textAreaRestore[0].selectionEnd;
							editor.find('.cke_button_ipssource').click();
							var smileyMain = setInterval(function() {
								if (editor.find('.cke_button_ipssource').attr('aria-pressed') != 'true' && !editor.find('.cke_button_removeFormat').hasClass('cke_disabled')) {
									editor.find('.cke_button_ipsemoticon').click();
									editor.on('click.smileys', '.ipsSmileyTray img', function() {
										wrapText('.cke_contents > textarea', ' ' + jQuery(this).attr('title') + ' ', '');
									});
									editor.find('.cke_button_ipssource').click();
									editor.find('.ipsSmileyTray').next('.ipsSmileyTray_all').remove();
									var checker = setInterval(function() {
										if (editor.find('.cke_button_ipssource').attr('aria-pressed') == 'true' && editor.find('.cke_button_removeFormat').hasClass('cke_disabled')) {
											editor.find('.cke_button_ipsbbcode, .cke_font, .cke_fontSize, .cke_button_textcolor, .cke_button_ipsemoticon, .cke_button_bold, .cke_button_italic, .cke_button_underline, .cke_button_strike, .cke_button_subscript, .cke_button_superscript, .cke_button_bulletedlist, .cke_button_numberedlist, .cke_button_link, .cke_button_image, .cke_button_ipscode, .cke_button_ipsquote, .cke_button_indent, .cke_button_justifycenter, .cke_button_justifyright').removeClass('cke_disabled');
											editor.find('.ipsSmileyTray').slideDown('fast');
											clearTimeout(checker);
										}
									}, 10);
									if (editor.find('.cke_contents > textarea').is(':visible')) {
										editor.find('.cke_contents > textarea').focus();
										editor.find('.cke_contents > textarea').val(restoreContent);
										editor.find('.cke_contents > textarea').selectRange(RestoreStart, RestoreEnd);
									}
								clearTimeout(smileyMain);
								}
							}, 100);
						} else {
							editor.find('.ipsSmileyTray').slideToggle('fast');
						}
					break;
	
					case 'Bold':
						wrapText('.cke_contents > textarea', '[b]', '[/b]');
					break;

					case 'Italic':
						wrapText('.cke_contents > textarea', '[i]', '[/i]');
					break;
	
					case 'Underline':
						wrapText('.cke_contents > textarea', '[u]', '[/u]');
					break;
	
					case 'Strike Through':
						wrapText('.cke_contents > textarea', '[s]', '[/s]');
					break;
	
					case 'Subscript':
						wrapText('.cke_contents > textarea', '[sub]', '[/sub]');
					break;
	
					case 'Superscript':
						wrapText('.cke_contents > textarea', '[sup]', '[/sup]');
					break;
					
					case 'Insert/Remove Bulleted List':
						wrapText('.cke_contents > textarea', '[list]\n[*]', '[/*]\n[/list]');
					break;
	
					case 'Insert/Remove Numbered List':
						wrapText('.cke_contents > textarea', '[list=1]\n[*]', '[/*]\n[/list]');
					break;
	
					case 'Link':
						var textArea = editor.find('.cke_contents > textarea');
						var start = textArea[0].selectionStart;
						var end = textArea[0].selectionEnd;
						var selectedText = textArea.val().substring(start, end);
						if (start !== null && end !== null && selectedText.match(/http/)) {
							wrapText('.cke_contents > textarea', '[url=' + selectedText + ']', '[/url]');
						} else {
							if (jQuery('.plaintext-request').length < 1) {
								createRequest();
							}
							jQuery('.plaintext-request .request-type').text('Link');
							jQuery('.plaintext-request .spec').html('<span style="font-weight: bolder;">URL</span>');
							jQuery('.plaintext-request .fields').html('<div class="cke_dialog_ui_input_text"><input type="text" class="cke_dialog_ui_input_text" /></div>');
							jQuery('.plaintext-request .cke_dialog_ui_button[title=OK]').on('click.link', function() {
								var link = jQuery('.plaintext-request .fields input')[0].value;
								var textArea = jQuery('.cke_contents > textarea');
								var start = textArea[0].selectionStart;
								var end = textArea[0].selectionEnd;
								var selectedText = textArea.val().substring(start, end);
								if (selectedText.length > 0) {
									wrapText('.cke_contents > textarea', '[url=' + link + ']', '[/url]');
								} else {
									wrapText('.cke_contents > textarea', '[url=' + link + ']' + link, '[/url]');
								}
								jQuery(this).off('click.link');
							});
							jQuery('#request-background').show();
							jQuery('.plaintext-request').show();
							
							var top = '0px';
							if (jQuery(window).height() > jQuery('#plaintext-request').outerHeight()) {
								top = (jQuery(window).height() / 2) - (jQuery('#plaintext-request').outerHeight() / 2) + 'px';
							}
						
							jQuery('#plaintext-request').css({
								'top': top,
								'left': (jQuery(window).width() / 2) - 200 + 'px',
								'width': '400px'
							});							
							jQuery('.plaintext-request .fields input').focus();
						}
					break;
	
					case 'Image':
						var textArea = editor.find('.cke_contents > textarea');
						var start = textArea[0].selectionStart;
						var end = textArea[0].selectionEnd;
						var selectedText = textArea.val().substring(start, end);
						if (start !== null && end !== null && selectedText.match(/http/)) {
							wrapText('.cke_contents > textarea', '[img=', ']');
						} else {
							if (jQuery('.plaintext-request').length < 1) {
								createRequest();
							}
							jQuery('.plaintext-request .request-type').text('Image');
							jQuery('.plaintext-request .spec').html('<span style="font-weight: bolder;">URL</span>');
							jQuery('.plaintext-request .fields').html('<div class="cke_dialog_ui_input_text"><input type="text" class="cke_dialog_ui_input_text" /></div>');
							jQuery('.plaintext-request .cke_dialog_ui_button[title=OK]').on('click.image', function() {
								var link = jQuery('.plaintext-request .fields input')[0].value;
								wrapText('.cke_contents > textarea', '[img=' + link + ']', '');
								jQuery(this).off('click.image');
							});
							jQuery('#request-background').show();
							jQuery('.plaintext-request').show();
							
							var top = '0px';
							if (jQuery(window).height() > jQuery('#plaintext-request').outerHeight()) {
								top = (jQuery(window).height() / 2) - (jQuery('#plaintext-request').outerHeight() / 2) + 'px';
							}
						
							jQuery('#plaintext-request').css({
								'top': top,
								'left': (jQuery(window).width() / 2) - 200 + 'px',
								'width': '400px'
							});
							jQuery('.plaintext-request .fields input').focus();
						}
					break;
	
					case 'Code':
						var textArea = editor.find('.cke_contents > textarea');
						var start = textArea[0].selectionStart;
						var end = textArea[0].selectionEnd;
						var selectedText = textArea.val().substring(start, end);
						if (selectedText.length < 1) {
							if (jQuery('.plaintext-request').length < 1) {
								createRequest();
							}
							jQuery('.plaintext-request .request-type').text('Code');
							jQuery('.plaintext-request .spec').html('Code Type');
							jQuery('.plaintext-request .fields').html('<select class="cke_dialog_ui_input_select"><option value="auto"> PHP/Generic/Auto Detect</option><option value="js"> Javascript</option><option value="html"> HTML</option><option value="sql"> SQL</option><option value="css"> CSS</option><option value="xml"> XML</option><option value="nocode"> None</option></select><div class="cke_dialog_ui_vbox_child">Starting Line Number<div class="cke_dialog_ui_input_text"><input class="cke_dialog_ui_input_text code-line-number" type="text"></div></div><div class="cke_dialog_ui_vbox_child" style="padding-bottom: 0px;"><div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea code-body" rows="5" cols="20" style="height: 240px; direction: ltr; font-family: monospace; font-size: 13px;"></textarea></div></div>');
							jQuery('.plaintext-request .cke_dialog_ui_button[title=OK]').on('click.code', function() {
								var type = jQuery('.plaintext-request .fields select').val();
								var line = jQuery('.plaintext-request .fields .code-line-number')[0].value;
								if (line.length < 1) {
									line = 0;
								}
								var body = jQuery('.plaintext-request .fields .code-body')[0].value;
								wrapText('.cke_contents > textarea', '[code=' + type + ':' + line + ']' + body + '[/code]', '');
								jQuery(this).off('click.code');
							});
							jQuery('#request-background').show();
							jQuery('.plaintext-request').show();
						
							var top = '0px';
							if (jQuery(window).height() > jQuery('#plaintext-request').outerHeight()) {
								top = (jQuery(window).height() / 2) - (jQuery('#plaintext-request').outerHeight() / 2) + 'px';
							}
						
							jQuery('#plaintext-request').css({
								'top': top,
								'left': (jQuery(window).width() / 2) - 385 + 'px',
								'width': '770px'
							});
							jQuery('.plaintext-request .fields .code-body').focus();
						} else {
							wrapText('.cke_contents > textarea', '[code=auto:0]', '[/code]');
						}
					break;
	
					case 'Quote':
						wrapText('.cke_contents > textarea', '[quote]', '[/quote]');
					break;
	
					case 'Increase Indent':
						wrapText('.cke_contents > textarea', '[indent=1]', '[/indent]');
					break;
	
					case 'Center':
						wrapText('.cke_contents > textarea', '[center]', '[/center]');
					break;
	
					case 'Align Right':
						wrapText('.cke_contents > textarea', '[right]', '[/right]');
					break;
	
					default:
						return false;
				}
			}
		});
		editor.find('.cke_button_ipssource').addClass('bbcode-parsed');
	}
}

function initializeBBCode() {
	jQuery(document).on('mouseover.bbCode', '.cke_editor', function() {
		var instance = jQuery(this);

		if (instance.hasClass('plaintextBBCode')) {
			return false;
		}

		if (instance.find('.cke_button_ipssource').hasClass('cke_on') && instance.find('.cke_button_bold').hasClass('cke_disabled')) {
			plaintextBBCode(instance);
			console.log('Plaintext BBCode initilized on:', instance);
			instance.addClass('plaintextBBCode');
		}
	});
}

if (typeof jQuery == 'undefined') {
	function addJQuery() {
		var jQueryScript = document.createElement("script");
		jQueryScript.setAttribute("type", "text/javascript");
		jQueryScript.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
		jQueryScript.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent =
				'$.noConflict();' +
				plaintextBBCode.toString() +
				initializeBBCode.toString() +
				'initializeBBCode();';
			document.getElementsByTagName('head')[0].appendChild(script);
		}, false);
		document.getElementsByTagName('head')[0].appendChild(jQueryScript);
	}
	addJQuery();
} else {
	$.noConflict();
	initializeBBCode();
}