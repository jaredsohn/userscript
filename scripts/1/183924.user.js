// ==UserScript==
// @name        Save Background Image
// @namespace   Imaging
// @include     *
// @version     1
// ==/UserScript==
(function ()
{
	if (!("contextMenu" in document.documentElement && "HTMLMenuItemElement" in window))
	{
		return;
	}

	var MENU_ID = "userscript-save-bg-image";
	
	var body = document.body;
	
	function initMenu(e) 
	{
		var node = e.target;
		var coords = getClickCoords(e);
		var nodes = [];
		var recurseChildren = function(el)
		{
			for(var i = 0; i < el.children.length; i++)
			{
				var c = el.children[i];
				if(isValidElement(c, coords))
				{
					var img = getBackgroundImage(c, node.nodeName == "IMG");
					if(img) nodes.push(img);
				}
				recurseChildren(c);
			}
		}
		recurseChildren(document.body);
		
		var item = document.querySelector("#" + MENU_ID + " menuitem");
		if (nodes.length != 0) 
		{
			body.setAttribute("contextmenu", MENU_ID);
			item.setAttribute("imageURL", JSON.stringify(nodes));
		} else 
		{
			body.removeAttribute("contextmenu");
			item.removeAttribute("imageURL");
		}
	}
	
	function isValidElement(el, pos)
	{
		if(!el.getBoundingClientRect)
		{
			return false;
		}
		var r = el.getBoundingClientRect();
		return getStyle(el, 'visibility') != 'hidden' 
			&& getStyle(el, 'display') != 'none'
			&& getStyle(el, 'opacity') > 0 
			&& rectContains(r, pos)
	}
	
	function rectContains(rect, x, y) 
	{
		if (x && x.x && !y) 
		{
			y = x.y;
			x = x.x;
		}
		return (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);
	};
	
	function getBackgroundImage(el, isImg)
	{
		return getStyle(el, "backgroundImage").slice(4, -1).replace(/^\"|\"$/g, "") || (!isImg && el.nodeName == "IMG" ? el.src : "");
	}
	
	function getStyle(element, style) 
	{
		style = style == 'float' ? 'cssFloat' : style;
		var value = element.style[style];
		if (!value || value == 'auto') 
		{
			var css = document.defaultView.getComputedStyle(element, null);
			value = css ? css[style] : null;
		}
		if (style == 'opacity') 
		{
			return value ? parseFloat(value) : 1.0;
		}
		return value == 'auto' ? null : value;
	}

	function getClickCoords(e)
	{
		var evt = e ? e : window.event;
		var clickX = 0,
			clickY = 0;

		if((evt.clientX || evt.clientY) &&
			document.body &&
			document.body.scrollLeft != null)
		{
			clickX = evt.clientX + document.body.scrollLeft;
			clickY = evt.clientY + document.body.scrollTop;
		}
		if((evt.clientX || evt.clientY) &&
			document.compatMode == 'CSS1Compat' &&
			document.documentElement &&
			document.documentElement.scrollLeft != null)
		{
			clickX = evt.clientX + document.documentElement.scrollLeft;
			clickY = evt.clientY + document.documentElement.scrollTop;
		}
		if(evt.pageX || evt.pageY)
		{
			clickX = evt.pageX;
			clickY = evt.pageY;
		}

		return {
			x: clickX,
			y: clickY
		}
	}
		
	function findImageNode(node, pos)
	{
		var img = null;
		do
		{
			var img = getComputedStyle(node).backgroundImage.slice(4, -1).replace(/^\"|\"$/g, "");
			node = node.parentNode;
		} while(!img && node != null && isValidElement(node, pos));
		return img;
	}
	
	function saveImage(aEvent) 
	{
		var imgs = JSON.parse(aEvent.target.getAttribute("imageURL"));
		if(imgs.length == 1)
		{
			save(imgs[0]);
		} else
		{
			createPopup(imgs);
		}
	};
	
	function save(img)
	{
		GM_getImageB64Data(img, function (data, url, type)
		{
			var fileName = url.substring(url.lastIndexOf('/') + 1).trim();
			if(fileName.length == 0)
			{
				fileName = "file";
			} else
			{
				var pos = fileName.lastIndexOf(".");
				if(pos > -1)
				{
					fileName = fileName.substr(0, pos);
				}
			}

			saveAs(b64toBlob(data, "image/" + type.id), fileName + type.ext);
		});
	}
	
	function createPopup(images)
	{
		images = images.filter(function(elem, pos, self) {
			return self.indexOf(elem) == pos;
		})
	
		var popup = document.createElement("div");
		popup.setAttribute("style", "cursor: pointer; width: 100%; height: 100%; position: fixed; z-index: 999; background: rgba(0,0,0,0.7); left: 0; top: 0");
		popup.onclick = function()
		{
			this.parentNode.removeChild(this);
			window.onkeydown = null;
		}
		
		window.onkeydown = function(e)
		{
			if(e.keyCode === 27)
			{
				popup.onclick();
			}
		};
		
		var container = document.createElement("div");
		var w = (300 * images.length + 10);
		container.setAttribute("style", "text-align: center; padding: 20px; overflow: auto; cursor: default; border: 2px solid black; border-radius: 10px; background: white; width: " + w + "px; margin: 0 auto; height: auto; margin-top: 200px;");
		
		var list = document.createElement("ul");
		for(var i = 0; i < images.length; i++)
		{
			var item = document.createElement("li");
			var image = document.createElement("div");
			image.setAttribute("style", "cursor: pointer; border: 1px solid black; display: inline-block; width: 300px; height: 300px; background: transparent url(" + images[i] + ") no-repeat center center; background-size: 100%; " + (i == 0 ? "" : "border-left: 0") );
			item.setAttribute("style", "display: inline-block");
			item.appendChild(image);
			list.appendChild(image);
			
			image.onmouseover = function()
			{
				this.style.backgroundSize = "auto";
			}
			image.onmouseout = function()
			{
				this.style.backgroundSize = "100%";
			}
			image.onclick = function(e)
			{
				save(getBackgroundImage(this, false));
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		}
		list.setAttribute("style", "padding: 0; margin: 0; text-align: center");
		container.appendChild(list);
		container.appendChild(document.createElement("br"));
		container.appendChild(document.createTextNode("Click on image to save"));
		
		popup.appendChild(container);
		document.body.appendChild(popup);
	}
	
	
	body.addEventListener("contextmenu", initMenu, false);

	var menu = body.appendChild(document.createElement("menu"));
	menu.outerHTML = '<menu id="' + MENU_ID + '" type="context"><menuitem label="Save background image"icon="data:image/png;base64,\
	iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\
	AAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAEl\
	SURBVDiNY/z//z8DJYCRkIKsthv/kRX9Z2BgmFalARdiIcaGKZXqcH5O+01U+ay2G3MYGBiSiXUm\
	mofnsBDSjEUTMkiBe2Eq1JnZ7TcZBHhZGNythBl0lLkZODmYGX7++sdw/sZnhl3H3zF8+voHwwsY\
	FkR5ijNICLMzTF31hOHnr38MHGxMDJlhMgwv3vxkWL7jJYpaJmzu0lTigWtmYGBg+PHrH8P0VU8Y\
	tJV5MNRiNYCfmxmuGQZ+/PrHwMmOqRyrAX///WfgYEOV4mBjwjAUpwHHL31iyA6XgRvCwcbEkBUm\
	w3DuxmcMtVgDkYONicHLVoTBSJOXgYONieHHz38Ml+98Ydh88DXDtx//CBtACmBiYGCYS4H+OYyU\
	5kasgUgKAADN8WLFzlj9rgAAAABJRU5ErkJggg=="></menuitem></menu>';

	document.querySelector("#" + MENU_ID + " menuitem").addEventListener("click", saveImage, false);
	
	
	var saveAs = saveAs || (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator)) || (function (view)
	{
		"use strict";
		var
		doc = view.document
		// only get URL when necessary in case BlobBuilder.js hasn't overridden it yet
			,
			get_URL = function ()
			{
				return view.URL || view.webkitURL || view;
			}, URL = view.URL || view.webkitURL || view,
			save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
			can_use_save_link = !view.externalHost && "download" in save_link,
			click = function (node)
			{
				var event = doc.createEvent("MouseEvents");
				event.initMouseEvent(
					"click", true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null
				);
				node.dispatchEvent(event);
			}, webkit_req_fs = view.webkitRequestFileSystem,
			req_fs = view.requestFileSystem || webkit_req_fs || view.mozRequestFileSystem,
			throw_outside = function (ex)
			{
				(view.setImmediate || view.setTimeout)(function ()
				{
					throw ex;
				}, 0);
			}, force_saveable_type = "application/octet-stream",
			fs_min_size = 0,
			deletion_queue = [],
			process_deletion_queue = function ()
			{
				var i = deletion_queue.length;
				while(i--)
				{
					var file = deletion_queue[i];
					if(typeof file === "string")
					{ // file is an object URL
						URL.revokeObjectURL(file);
					}
					else
					{ // file is a File
						file.remove();
					}
				}
				deletion_queue.length = 0; // clear queue
			}, dispatch = function (filesaver, event_types, event)
			{
				event_types = [].concat(event_types);
				var i = event_types.length;
				while(i--)
				{
					var listener = filesaver["on" + event_types[i]];
					if(typeof listener === "function")
					{
						try
						{
							listener.call(filesaver, event || filesaver);
						}
						catch(ex)
						{
							throw_outside(ex);
						}
					}
				}
			}, FileSaver = function (blob, name)
			{
				// First try a.download, then web filesystem, then object URLs
				var
				filesaver = this,
					type = blob.type,
					blob_changed = false,
					object_url, target_view, get_object_url = function ()
					{
						var object_url = get_URL().createObjectURL(blob);
						deletion_queue.push(object_url);
						return object_url;
					}, dispatch_all = function ()
					{
						dispatch(filesaver, "writestart progress write writeend".split(" "));
					}
					// on any filesys errors revert to saving with object URLs
					, fs_error = function ()
					{
						// don't create more object URLs than needed
						if(blob_changed || !object_url)
						{
							object_url = get_object_url(blob);
						}
						if(target_view)
						{
							target_view.location.href = object_url;
						}
						else
						{
							window.open(object_url, "_blank");
						}
						filesaver.readyState = filesaver.DONE;
						dispatch_all();
					}, abortable = function (func)
					{
						return function ()
						{
							if(filesaver.readyState !== filesaver.DONE)
							{
								return func.apply(this, arguments);
							}
						};
					}, create_if_not_found = {
						create: true,
						exclusive: false
					}, slice;
				filesaver.readyState = filesaver.INIT;
				if(!name)
				{
					name = "download";
				}
				if(can_use_save_link)
				{
					object_url = get_object_url(blob);
					// FF for Android has a nasty garbage collection mechanism
					// that turns all objects that are not pure javascript into 'deadObject'
					// this means `doc` and `save_link` are unusable and need to be recreated
					// `view` is usable though:
					doc = view.document;
					save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a");
					save_link.href = object_url;
					save_link.download = name;
					var event = doc.createEvent("MouseEvents");
					event.initMouseEvent(
						"click", true, false, view, 0, 0, 0, 0, 0, false, false, false, false, 0, null
					);
					save_link.dispatchEvent(event);
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					return;
				}
				// Object and web filesystem URLs have a problem saving in Google Chrome when
				// viewed in a tab, so I force save with application/octet-stream
				// http://code.google.com/p/chromium/issues/detail?id=91158
				if(view.chrome && type && type !== force_saveable_type)
				{
					slice = blob.slice || blob.webkitSlice;
					blob = slice.call(blob, 0, blob.size, force_saveable_type);
					blob_changed = true;
				}
				// Since I can't be sure that the guessed media type will trigger a download
				// in WebKit, I append .download to the filename.
				// https://bugs.webkit.org/show_bug.cgi?id=65440
				if(webkit_req_fs && name !== "download")
				{
					name += ".download";
				}
				if(type === force_saveable_type || webkit_req_fs)
				{
					target_view = view;
				}
				if(!req_fs)
				{
					fs_error();
					return;
				}
				fs_min_size += blob.size;
				req_fs(view.TEMPORARY, fs_min_size, abortable(function (fs)
				{
					fs.root.getDirectory("saved", create_if_not_found, abortable(function (dir)
					{
						var save = function ()
						{
							dir.getFile(name, create_if_not_found, abortable(function (file)
							{
								file.createWriter(abortable(function (writer)
								{
									writer.onwriteend = function (event)
									{
										target_view.location.href = file.toURL();
										deletion_queue.push(file);
										filesaver.readyState = filesaver.DONE;
										dispatch(filesaver, "writeend", event);
									};
									writer.onerror = function ()
									{
										var error = writer.error;
										if(error.code !== error.ABORT_ERR)
										{
											fs_error();
										}
									};
									"writestart progress write abort".split(" ").forEach(function (event)
									{
										writer["on" + event] = filesaver["on" + event];
									});
									writer.write(blob);
									filesaver.abort = function ()
									{
										writer.abort();
										filesaver.readyState = filesaver.DONE;
									};
									filesaver.readyState = filesaver.WRITING;
								}), fs_error);
							}), fs_error);
						};
						dir.getFile(name,
						{
							create: false
						}, abortable(function (file)
						{
							// delete file if it already exists
							file.remove();
							save();
						}), abortable(function (ex)
						{
							if(ex.code === ex.NOT_FOUND_ERR)
							{
								save();
							}
							else
							{
								fs_error();
							}
						}));
					}), fs_error);
				}), fs_error);
			}, FS_proto = FileSaver.prototype,
			saveAs = function (blob, name)
			{
				return new FileSaver(blob, name);
			};
		FS_proto.abort = function ()
		{
			var filesaver = this;
			filesaver.readyState = filesaver.DONE;
			dispatch(filesaver, "abort");
		};
		FS_proto.readyState = FS_proto.INIT = 0;
		FS_proto.WRITING = 1;
		FS_proto.DONE = 2;

		FS_proto.error =
			FS_proto.onwritestart =
			FS_proto.onprogress =
			FS_proto.onwrite =
			FS_proto.onabort =
			FS_proto.onerror =
			FS_proto.onwriteend =
			null;

		view.addEventListener("unload", process_deletion_queue, false);
		return saveAs;
	}(this.self || this.window || this.content));

	function GM_getImageB64Data(url, callback)
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: url,
			onload: function (respDetails)
			{
				var binResp = customBase64Encode(respDetails.responseText);
				var type = getImageMimeType(binResp);

				callback(binResp, url, type);
			},
			overrideMimeType: 'text/plain; charset=x-user-defined'
		});

	}

	function customBase64Encode(inputStr)
	{
		var
		bbLen = 3,
			enCharLen = 4,
			inpLen = inputStr.length,
			inx = 0,
			jnx,
			keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" + "0123456789+/=",
			output = "",
			paddingBytes = 0;
		var
		bytebuffer = new Array(bbLen),
			encodedCharIndexes = new Array(enCharLen);

		while(inx < inpLen)
		{
			for(jnx = 0; jnx < bbLen; ++jnx)
				if(inx < inpLen)
					bytebuffer[jnx] = inputStr.charCodeAt(inx++) & 0xff;
				else
					bytebuffer[jnx] = 0;

			encodedCharIndexes[0] = bytebuffer[0] >> 2;
			encodedCharIndexes[1] = ((bytebuffer[0] & 0x3) << 4) | (bytebuffer[1] >> 4);
			encodedCharIndexes[2] = ((bytebuffer[1] & 0x0f) << 2) | (bytebuffer[2] >> 6);
			encodedCharIndexes[3] = bytebuffer[2] & 0x3f;

			paddingBytes = inx - (inpLen - 1);
			switch(paddingBytes)
			{
			case 1:
				encodedCharIndexes[3] = 64;
				break;
			case 2:
				encodedCharIndexes[3] = 64;
				encodedCharIndexes[2] = 64;
				break;
			default:
				break;
			}

			for(jnx = 0; jnx < enCharLen; ++jnx)
				output += keyStr.charAt(encodedCharIndexes[jnx]);
		}
		return output;
	}

	function asc2hex(pStr) {
        tempstr = '';
        for (a = 0; a < pStr.length; a = a + 1) {
            tempstr = tempstr + ("0" + pStr.charCodeAt(a).toString(16)).substr(-2);
        }
        return tempstr.toUpperCase();
    }
	
	function getImageMimeType(data)
	{
		var header = asc2hex(atob(data.substr(0, 16)));
	
		var magic = 
		[
			{ id: "jpeg", ext: ".jpg", magic: "FFD8" },
			{ id: "png", ext: ".png", magic: "89504E470D0A1A0A" },
			{ id: "gif", ext: ".gif", magic: "474946" },
			{ id: "bmp", ext: ".bmp", magic: "424D" },
			{ id: "tiff", ext: ".tiff", magic: "4949" },
			{ id: "tiff", ext: ".tiff", magic: "4D4D" },
		];
		
		for(var i = 0; i < magic.length; i++)
		{
			if(header.indexOf(magic[i].magic) == 0)
			{
				return magic[i];
			}
		}
		
		return magic[0];
	}
	
	function b64toBlob(b64Data, contentType, sliceSize) {
		contentType = contentType || '';
		sliceSize = sliceSize || 1024;

		function charCodeFromCharacter(c) 
		{
			return c.charCodeAt(0);
		}

		var byteCharacters = atob(b64Data);
		var byteArrays = [];

		for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) 
		{
			byteArrays.push(new Uint8Array(Array.prototype.map.call(byteCharacters.slice(offset, offset + sliceSize), charCodeFromCharacter)));
		}

		return new Blob(byteArrays, {type: contentType});
	}
})();