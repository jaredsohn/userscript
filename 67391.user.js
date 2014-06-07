/*
* TemplatePreview, Version: 0.1.0beta, Date: 2010-01-27
* Copyright (C) 2009-2010 Frank Rechenberger <revvar@gmx.de>
* Released under the GPL license
* http://www.gnu.org/copyleft/gpl.html
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License version 2 as
* published by the Free Software Foundation.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty
* of MERCHANTABILITY or FITNESS FOR A PARTICULAR * PURPOSE.
* See the GNU General Public License for more details.
*/

// ==UserScript==
// @name           TemplatePreview
// @description    Shows a preview of a template on the right side of the editbox. Just move the cursor into the tempate source and press the new VV button in the toolbar. Tested with the monobook skin.
// @namespace      revvar
// @include http://*.wikipedia.org/w/index.php?title=*&action=submit*
// @include http://*.wikimedia.org/w/index.php?title=*&action=submit*
// @include http://*.wikisource.org/w/index.php?title=*&action=submit*
// @include http://*.wikiquote.org/w/index.php?title=*&action=submit*
// @include http://*.wikipedia.org/w/index.php?title=*&action=edit*
// @include http://*.wikimedia.org/w/index.php?title=*&action=edit*
// @include http://*.wikisource.org/w/index.php?title=*&action=edit*
// @include http://*.wikiquote.org/w/index.php?title=*&action=edit*
// ==/UserScript==

tm_init();

function tm_init() {
	/* check if edit page, otherwise exit*/
	var url=document.location.toString();
	if (url.search(/action=(edit|submit)/g) < 0) return;
	var oEditBox = document.getElementById("wpTextbox1");
	if (oEditBox == null) return;
	if (document.getElementById("wpSave") == null) return;

	// oHTTPRequest  globals
	var HTTPTIMEOUT=30000;
	var iRequestID=0;
	var bBreak=false;

	var toolbar = document.getElementById("toolbar");
	if (toolbar == null) {
		var Textbox = document.getElementById("wpTextbox1");
		var toolbar = cNode(null,"div",null, null);
		Textbox.parentNode.insertBefore(toolbar, Textbox);
	}

	// globals
	var VERSION="0.1.0 beta";
	var is_khtml = navigator.vendor == 'KDE' || ( document.childNodes && !document.all && !navigator.taintEnabled );
	var is_ie = false; //FIXME: !(is_gecko || is_opera || is_safari || is_khtml);
	var act_request = 0;
	var old_template_source = "";
	var isActive = false;
	var Target = new Object();
	Target["Editbox"] = oEditBox;

	var url=document.location.toString();
	sLocal=url.replace(/http[s]{0,1}:\/\/([^\/.]+)\.wiki((p|m)edia|source|quote)\.org[.]{0,1}\/.*/,"$1");
	var sProject=url.replace(/http[s]{0,1}:\/\/[^\/.]+\.(wiki((p|m)edia|source|quote))\.org[.]{0,1}\/.*/,"$1");

	var tp_button = cNode(null, "div", "VV", {"id":"tp_switch_button","style":"backgroundImage:url(http://de.wikipedia.org/skins-1.5/common/images/button_template.png);backgroundRepeat:no-repeat;float:left;width:23px;height:22px;fontSize:9px;fontWeight:bold;color:black;textAlign:center;paddingTop:2px;cursor:pointer;marginRight:2px;"});

	addEventListener(tp_button, "click", function() {
		if (!isActive) {
			show();
			addEventListener(oEditBox, "keyup", eventTPButton);
		} else {
			removeEventListener(oEditBox, "keyup", eventTPButton);
			removePreview();
			old_template_source = "";
		}
		isActive = !isActive;
	});
	if (toolbar.firstChild == null) toolbar.appendChild(tp_button); else toolbar.insertBefore(tp_button, toolbar.firstChild);
	var copywarn = document.getElementById('editpage-copywarn');
	if (copywarn) setStyleAttribute(copywarn, {'clear':'both'});

	return;

	function eventTPButton(e) {
		show();
	}

	function removePreview() {
		var oldPreview = document.getElementById('tp_preview');
		if (oldPreview) {
			saveCursorPos();
			oEditBox.parentNode.removeChild(oEditBox);
			oldPreview.parentNode.insertBefore(oEditBox, oldPreview);
			oldPreview.parentNode.removeChild(oldPreview);
			restoreCursorPos();
		}
	}

	/* shows the template preview */
	function show()
	{

		/* check if cursor within template wikisource and parse it */
		var template_source = null;

		saveCursorPos();

		/* search if cursor within a template */

		/* (1) replace syntax chars within nowiki-tags and html-comments */
		var x_nowiki = /(<nowiki>.*?)[{|}](.*?<\/nowiki>)/g;
		var source = replace_all(oEditBox.value, x_nowiki, "$1#$2");
		var x_htmlcomment = /(<!--.*?)[{|}](.*?-->)/g;
		var source = replace_all(oEditBox.value, x_htmlcomment, "$1#$2");

		/* (2) create a list of all remaining template tags */
		var tag_list = new Array();
		var depth = 0;
		var x_tag = /(\{\{|\}\})/;
		var tag_pos = -2, new_pos = 0;
		do {
			new_pos = (source.substring(tag_pos + 2)).search(x_tag);
			if (new_pos >= 0) {
				tag_pos += new_pos + 2;
				switch (source.substring(tag_pos, tag_pos + 2)) {
					case "{{": {
						tag_list.push({"type":0, "depth":depth, "position":tag_pos});
						depth++;
					}; break;
					case "}}": {
						depth--;
						tag_list.push({"type":1, "depth":depth, "position":tag_pos});
					};break;
					default: alert("Internal error: Searching template tags failed ("+source.substring(tag_pos, tag_pos + 2)+").");return;
				}
			}
		} while (new_pos >= 0);

		/* (3) find nearest tag pair (same depth) around the cursor position */
		var  start = -1, end = -1, act_depth = 0;
		var cursor_pos = Target["start"] ;
		var cursor_depth = 0;
		/* (a) find the depth at cursor pos */
		for (var i = 0; i < tag_list.length; i++) {
			if (cursor_pos < tag_list[i].position) {
				cursor_depth = tag_list[i].depth;
			} else break;
		}

		/* (b) search */
		for (var i = 0; i < tag_list.length; i++) {
			if (cursor_pos >= tag_list[i].position) {
				if ((0 == tag_list[i].type) && (cursor_depth >= tag_list[i].depth)) {
					start = tag_list[i].position;
					act_depth = tag_list[i].depth;
				}
				if ((start > -1 ) && (1 == tag_list[i].type) && (act_depth == tag_list[i].depth)) start = -1;
			} else break;
		}
		if (start > -1) for (var i = tag_list.length - 1; i > 0 ; i--) {
			if (cursor_pos < tag_list[i].position) {
				if (cursor_depth >= tag_list[i].depth) {
					if ((1 == tag_list[i].type) && (act_depth == tag_list[i].depth)) {
						end = tag_list[i].position;
					}
				}
			} else break;
		}

		/* (4) get template source code without the surounding brackets */
		if ((start>=0) && (end>=0)) {
			template_source = oEditBox.value.substring(start + 2, end);
		} else template_source = null;

		/* parse source */
		if (template_source != null && template_source != old_template_source) {
			var requestID = act_request++;
			old_template_source = template_source;
			setTimeout(function() {
				if (requestID+1 != act_request) return;
				oXmlHttpRequest({
					//'method':'GET',
					'method':'POST',
					'url': 'http://'+sLocal+'.'+sProject+'.org/w/index.php?title=Preview_Preview&action=edit',
					'data':'wpPreview&wpTextbox1='+encodeURIComponent('§§§TP_BEGIN§§§{{'+template_source+'}}§§§TP_END§§§'),
					'headers':{'Content-type':'application/x-www-form-urlencoded','User-agent': 'Skript:TP(wp_de_user_Revvar)'},
					'onload': function(rD) {
						if (requestID+1 != act_request) return;

						var rT = rD.responseText;
						//rT = rT.substr(23,rT.length-27);GM_log(rT);
						var posPreview = rT.search('id="wikiPreview');
						var posEditform = rT.search('id="editform"');
						if (posPreview < posEditform) {
							rT = rT.substring(posPreview, posEditform);
						} else {
							rT = rT.substring(posPreview, rT.length);
						}
						var posBegin = rT.search('§§§TP_BEGIN§§§') + 14;
						var posEnd = rT.search('§§§TP_END§§§');
						rT = rT.substring(posBegin, posEnd);

						var oldPreview = document.getElementById('tp_preview');
						if (oldPreview) {
							oldPreview.innerHTML=rT;
							flashDiv(oldPreview);
						} else {
							var divBox = cNode(null, "div", null, {'id':'tp_previewBox'});
							var divBox2 = cNode(divBox, "div", null, {'style':'float:left'});
							oEditBox.parentNode.insertBefore(divBox, oEditBox);
							oEditBox.parentNode.removeChild(oEditBox);
							divBox2.appendChild(oEditBox);

							var preview = cNode(divBox, "div", null, {'id':'tp_preview','style':'float:left'});
							preview.innerHTML=rT;
							if (2*preview.clientWidth < divBox.clientWidth)  {
								setStyleAttribute(divBox2, {'float':'left','width':(divBox.clientWidth-preview.clientWidth-30)+'px'});
							} else {
								setStyleAttribute(divBox2, {'float':''});
								setStyleAttribute(preview, {'float':''});
							}

							restoreCursorPos();
							flashDiv(preview);

						}
					},
					'onerror':function(rD) {
						log_message(locals["sys_load_error"].replace("$1", template_name));
					},
					'onreadystatechange':function (rD) {}
				});
			}, 1000);
		}
	}

	function flashDiv(oDiv) {
		var iOpa=100;
		var oOverlay = cNode(oDiv.parentNode, 'DIV', null, {'style':'position:absolute;left:'+oDiv.offsetLeft+'px;top:'+oDiv.offsetTop+'px;width:'+oDiv.clientWidth+'px;height:'+oDiv.clientHeight+'px;backgroundColor:rgb(255,240,245);opacity:1'});
		setTimeout(flashSub, 0);

		function flashSub() {
			iOpa -= 10;
			if (iOpa > 0) {
				setStyleAttribute(oOverlay, {'opacity':iOpa/100});
				setTimeout(flashSub, 30);
			} else {
				oOverlay.parentNode.removeChild(oOverlay);
			}
		}
	}

	function saveCursorPos() {
		/* get cursor/mark position (browser indendend, depends on wikibits.js) */
		if (is_ie) {
			var marker_start = "####template_master_cursor_marker_start####";
			var marker_end = "####template_master_cursor_marker_end####";
			insertTags(marker_start, marker_end, "");
			Target["start"]  = oEditBox.value.search(marker_start);
			oEditBox.value = oEditBox.value.replace(marker_start,"");
			Target["end"]  = oEditBox.value.search(marker_end) - 1;
			oEditBox.value = oEditBox.value.replace(marker_end,"");
		} else {
			Target["cursor"] = oEditBox.selectionStart;
			Target["start"]  = oEditBox.selectionStart;
			Target["end"] = oEditBox.selectionEnd - 1;
			Target["scroll_top"] = oEditBox.scrollTop;
		}
	}

	function restoreCursorPos() {
		// restore cursor pos
		if (is_ie) {
			var Range = Target["Editbox"].createTextRange();
			Range.collapse(true);
			Range.moveEnd('character', Target["start"]);
			Range.moveStart('character', Target["start"]);
			Range.select();
		} else {
			Target["Editbox"].selectionStart = Target["cursor"];
			Target["Editbox"].selectionEnd = Target["cursor"];
			Target["Editbox"].scrollTop = Target["scroll_top"];
		}
		Target["Editbox"].focus();
	}

	/* ==helper functions===================================================*/
	function replace_all(text, regexp, replacement)
	{
		var count_tmp = 0;
		while (text.search(regexp) >= 0) {
			text = text.replace(regexp, replacement);
			count_tmp++;
			if (count_tmp > 1000) {
				log_message("replace_all: Internal error - endless loop.");
				return null;
			}
		}
		return text;
	}

	function trim(text)
	{
		text = "" + text;
		text = replace_all(text, /^\s+/g, "");
		text = replace_all(text, /^(.*?)\s+$/, "$1");
		text = replace_all(text, "\n\n", "\n");
		if (text.search(/[^\s]/) < 0) text = "";
		return text;
	}

	/**
	Creates a new GUI node.

	@author Frank Rechenberger
	@param nRoot null or reference to the prefered root node object
	@param nType HTML type string ("div" for example)
	@param nText null or string with the text for the text child node
	@param nAttr null or object with attribute attributes, ({style:"...",width:"100%"} for example)
	@return the new node object
	*/
	function cNode(nRoot,nType,nText,nAttr)
	{
		var elem=document.createElement(nType);
		if (nAttr) for (var aid in nAttr) {
			if (aid == "style") {
				var style_attr = nAttr[aid].split(";");
				var style_obj = new Object();
				for (var i = 0; i < style_attr.length; i++) {
					var style_id = style_attr[i].replace(/^\s*([^:]+):.*$/,"$1");
					var style_value = style_attr[i].replace(/^\s*[^:]+:\s*([^\s;]+)[\s;]*$/,"$1");
					if (style_id.length > 0) {
						style_obj[style_id] = style_value;
					}
				}
				setStyleAttribute(elem, style_obj);
			} else {
				if (aid == "class") elem.className = nAttr[aid];
				else elem.setAttribute(aid, nAttr[aid]);
			}
		}
		if (nText) elem.appendChild(document.createTextNode(nText));
		if (nRoot) nRoot.appendChild(elem);
		return elem;
	}


	function setStyleAttribute(Node, Attribute)
	{
		if ((Node) && (Attribute)) {
			for (var aid in Attribute) {
				aid = trim(aid);
				if (aid == 'float') {
					if (is_ie) Node.style.styleFloat = Attribute[aid]; else Node.style.cssFloat = Attribute[aid];
				} else {
					Node.style[aid] = Attribute[aid];
				}
			}
		}
	}

	function addEventListener(Node, event, callback)
	{
		if (is_ie) Node.attachEvent("on"+event, callback);
		else Node.addEventListener(event, callback, false);
	}

	function removeEventListener(Node, event, callback)
	{
		if (is_ie) Node.detachEvent("on"+event, callback);
		else Node.removeEventListener(event, callback, false);
	}

	function log_message(msg)
	{
		alert(msg);
	}

	//XMLHttpRequest wrapper, with timeout support
	function oXmlHttpRequest(data)
	{
		//preconditions
		if ((data.onload==null) || (data.onreadystatechange==null)) throw("oXmlHttpRequest-precondition");
		var orgHandler={id:(iRequestID++),onload:data.onload,onreadystatechange:data.onreadystatechange,onerror:data.onerror,timeout:null,valid:true};

		data.onload=function (rD) {
			if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
			if (bBreak) return; //cancel by user
				if (!orgHandler.valid) return; //old discarded request
					orgHandler.onload(rD);
				orgHandler.valid=false;
			return;
		}

		data.onreadystatechange=function (rD) {
			if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
			if (bBreak) return; //cancel by user
				if (!orgHandler.valid) return; //old discarded request
					orgHandler.onreadystatechange(rD);
				orgHandler.timeout=setTimeout(fTimeout,HTTPTIMEOUT);
		}

		data.onerror=function (rD)
		{
			if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
			if (bBreak) return; //cancel by user
				if (!orgHandler.valid) return; //old discarded request
					orgHandler.valid=false;//discard request
					if (orgHandler.onerror) orgHandler.onerror(rD);
					log_message("HTTP-Error "+rD.status+":"+rD.statusText);
				fRetry("Error: "+rD.status+".");
			return;
		}

		function fRetry(text)
		{
			if (data.silent) return;
			var bRetry=confirm(text+" "+locals["sys_question_repeat_http_request"]);
			if (bRetry==false) {
				bBreak=true;
				if (data.on_cancel) data.on_cancel();
				return;
			}
			//retry request
			setTimeout(function() {oXmlHttpRequest({method:data.method,url:data.url,headers:data.headers,data:data.data,onload:orgHandler.onload,onerror:orgHandler.onerror,onreadystatechange:orgHandler.onreadystatechange})},10);
			return;
		}

		function fTimeout()
		{
			if (orgHandler.timeout) clearTimeout(orgHandler.timeout);
			if (bBreak) return; //cancel by user
				if (!orgHandler.valid) return; //old discarded request
					var bWait=false;
				if (!data.silent) bWait=confirm(locals["sys_question_wait_for_http_response"].replace("$1", Math.round(HTTPTIMEOUT/1000)));
				if (bWait==false) {
					orgHandler.valid=false;//discard request
					fRetry("Timeout: "+data.url+"\n");
				} else {
					if (!orgHandler.valid) return; //old discarded request
						orgHandler.timeout=setTimeout(fTimeout,HTTPTIMEOUT);
				}
				return;
		}
		orgHandler.timeout=setTimeout(fTimeout,HTTPTIMEOUT);
		GM_xmlhttpRequest(data);
		return;
	}

}