// ==UserScript==
// @name           Posting helper for Japanese Users of Veoh
// @namespace      http://userscripts.org/users/76078
// @version        1.0
// @author         charmy
// @description    Adds charset or changes text code to post in Japanese
// @include        http://www.veoh.com/*
// ==/UserScript==
// 
// 1. Adds Accept-charset="ISO-8859-1" to the profile form and the message form.
//    (1) http://www.veoh.com/messages/compose
//    (2) http://www.veoh.com/myaccount/profile
//    (3) http://www.veoh.com/publish/group/*
// 2. Changes character code to decimal value in comment forms.
//    (1) http://www.veoh.com/group/*/discuss*
//    (2) http://www.veoh.com/users/*
//    (3) http://www.veoh.com/myprofile
//    (4) http://www.veoh.com/collection/*
//    (5) http://www.veoh.com/group/*
//    (6) http://www.veoh.com/browse/*
//    (7) http://www.veoh.com/publish/video/*
// 
(function() {

if(window.location.href.indexOf('http://www.veoh.com/') < 0) {
	return;
}

var ADD_CONVERT_BUTTON = 0;
var ADD_CHARSET = 1;

var ADD_APPEND_CHILD = 0;
var ADD_INSERT_BEFORE = 1;

var add_type;
var interval = 0;	// 500-10000:interval time(msec);
var min_interval = 500;
var max_interval = 10000;
var max_loop = 5;
var convert_utf8 = false;
var convert_specified = false;
var form_id;
var addpoint_id;
var watch_id;
var addpoint_type;
var input_id;
var textarea_id;
var max_check = true;
var input_maxnum = 48;
var textarea_maxnum = 512;
var conv_btn;
var inverse_btn;
var message_box;
var org_subject;
var org_comment;
var id_btn = "gm_textconv";
var id_btn2 = "gm_textconv2";
var added_msg;

// You can customize following style
//
var base_style = 'float: left; margin: 5px; margin-left: 20px; z-index:99999; width: auto;';
var convert_style = base_style + '';
var inverse_style = base_style + '';
var msgbox_style = 'float: left; margin: 5px; z-index:65535; color: red; width: auto;';


Init();

function Nop(){}

// initialize
function	Init() {
	interval = GM_getValue("Interval", interval);
	max_loop = GM_getValue("max_loop", max_loop);
	convert_utf8 = GM_getValue("convert_utf8", convert_utf8);

	addpoint_type = ADD_APPEND_CHILD;
	addpoint_id = "";
	input_id = "commentSubject";
	textarea_id = "comment";
	window.addEventListener(
	    "load",
	    function() {
		var	nodes = document.getElementsByTagName('body');
		if(nodes && nodes.length > 0) {
			nodes[0].addEventListener('DOMNodeInserted', nodeInserted, false);
		}
		var	node = document.getElementById('contentInner');
		if(node) {
			node.addEventListener('DOMSubtreeModified', subtreeModified, false);
		}
		var	node = document.getElementById('comments_content');
		if(node) {
			node.addEventListener('DOMSubtreeModified', subtreeModified, false);
		}

		if(window.location.href.indexOf('http://www.veoh.com/messages/compose') >= 0) {
			form_id = "composeForm";
			add_type = ADD_CHARSET;
		} else if(window.location.href.indexOf('http://www.veoh.com/myaccount/profile') >= 0 ) {
			form_id = "form-edit-profile";
			addCharset(form_id);
			add_type = ADD_CHARSET;
		} else if(window.location.href.indexOf('http://www.veoh.com/publish/group/') >= 0 ) {
			form_id = "create-group-form";
			add_type = ADD_CHARSET;
		} else if(window.location.href.indexOf('http://www.veoh.com/publish/video/') >= 0 ) {
			form_id = "publishForm";
			addpoint_id = "description";
			add_type = ADD_CONVERT_BUTTON;
			addpoint_type = ADD_INSERT_BEFORE;
			input_id = "title";
			textarea_id = "description";
			max_check = false;
		} else if(window.location.href.indexOf('http://www.veoh.com/collection/') >= 0 ||
			  window.location.href.indexOf('http://www.veoh.com/browse/') >= 0 ) {
			form_id = "commentForm";
			add_type = ADD_CONVERT_BUTTON;
			watch_id = "comments_content";
		} else if(window.location.href.indexOf('http://www.veoh.com/group/') >= 0 ) {
			if(window.location.href.indexOf('/discuss') >= 0) {
				form_id = "commentForm-g";
			} else {
				form_id = "commentForm";
			}
			add_type = ADD_CONVERT_BUTTON;
		} else if(window.location.href.indexOf('http://www.veoh.com/users/') >= 0 ||
			  window.location.href.indexOf('http://www.veoh.com/myprofile') >= 0 ) {
			form_id = "commentForm";
			add_type = ADD_CONVERT_BUTTON;
			watch_id = "user-comments-content";
		}
		if(addpoint_id == "") {
			addpoint_id = form_id;
		}
		if(add_type == ADD_CHARSET) {
			addCharset(form_id);
		} else if(add_type == ADD_CONVERT_BUTTON) {
			createButton();
			addConvButton(addpoint_id);
			Watch_Over_Convert_Button();
			if(watch_id) {
				var	node = document.getElementById(watch_id);
				if(node) {
					node.addEventListener('DOMSubtreeModified', watchNodeModified, false);
				}
			}
//		} else {
//			return;
		}
		if(convert_utf8 == true) {
			ConvertString();
		}
// Add menu
		GM_registerMenuCommand( "----Posting helper for Japanese Users of Veoh----", Nop);
		GM_registerMenuCommand( "Set interval to watch over the form changing", SetInterval);
		if(add_type == ADD_CONVERT_BUTTON) {
			GM_registerMenuCommand( "Add convert button to the form", AddConvertButton);
		}
		GM_registerMenuCommand( "Convert unreadable UTF-8 characters", ConvertUTF8String);
		GM_registerMenuCommand( "Enable automatic conversion mode of unreadable UTF-8 characters", Enable_Converting_UTF8);
		GM_registerMenuCommand( "Disable automatic conversion mode of unreadable UTF-8 characters", Disable_Converting_UTF8);
	    },
	    false);


}

var	added_now = false;
function watchNodeModified() {
//GM_log("watchNodeModified");
	if(added_now == false) {
		added_now = true;
		createButton();
		addConvButton(addpoint_id);
		added_now = false;
	}
}

function nodeInserted() {
//GM_log("nodeInserted");
	var	node = document.getElementById('bodyLevelThumbTip');
	if(node) {
		node.addEventListener('DOMSubtreeModified', subtreeModified, false);
	}
}

function subtreeModified() {
//GM_log("subtreeModified");
	if(convert_utf8 == true || convert_specified == true) {
		ConvertString();
	}
}

function SetInterval() {
	var val = window.prompt("Input interval(msec) for watching over the changing form(0=disable or from 500 to 10000)",interval);
	if(val == null) {
		return;
	}
	val = Number(val);
	if(val == 0) {
		interval = val;
		GM_setValue("Interval", interval);
		return;
	}
	if(val < min_interval || val > max_interval) {
		window.alert("Out of range");
		return;
	}
	var old_interval = interval;
	interval = val;
	GM_setValue("Interval", interval);
	if(old_interval == 0) {
		Watch_Over_Convert_Button();
	}
}

function Watch_Over_Convert_Button() {
	var form = document.getElementById(form_id);
	if(form) {
		var btn = document.getElementById(id_btn);
		if(!btn) {
			createButton();
			addConvButton(addpoint_id);
		}
	}
	if(interval>= min_interval && interval <= max_interval ) {
		setTimeout(Watch_Over_Convert_Button, interval);
	}
}

function convComment() {
	convToDecimal(input_id, textarea_id);
}

function inverseComment() {
	convToCharacter(input_id, textarea_id);
}

function convToDecimal(input_id, textarea_id) {
	var	subject,comment;
	var	node;
	var	ret;
	var	maxnum;
	var	msg = '';
	var	length;

	if(input_id) {
		node = document.getElementById(input_id);
		if(node) {
			org_subject = node.value;
			maxnum = input_maxnum;
			ret = decstr(org_subject);
			length = UTF_8_length(ret);
			if(max_check == true) {
				if(length > maxnum) {
					window.alert('The text length become longer than '+maxnum+' characters.');
				} else {
					node.value = ret;
					msg = length + " of " + maxnum + " and ";
				}
			} else {
				node.value = ret;
				msg = length + " and ";
			}
		}
	}
	if(textarea_id) {
		node = document.getElementById(textarea_id);
		if(node) {
			org_comment = node.value;
			maxnum = textarea_maxnum;
			ret = decstr(org_comment);
			length = UTF_8_length(ret);
			if(max_check == true) {
				if(length > maxnum) {
					window.alert('The text length become longer than '+maxnum+' characters.');
				} else {
					node.value = ret;
					msg = msg + length + " of " + maxnum;
				}
			} else {
				node.value = ret;
				msg = msg + length;
			}
		}
	}
	message_box.innerHTML = msg +" characters";
}

function convToCharacter(input_id, textarea_id) {
	var	subject,comment;
	var	node;
	var	ret;
	var	maxnum;
	var	msg = '';
	var	length;

	if(input_id) {
		node = document.getElementById(input_id);
		if(node) {
			maxnum = input_maxnum;
			ret = normalstr(node.value);
			length = UTF_8_length(ret);
			node.value = ret;
			if(max_check == true) {
				msg = length + " of " + maxnum + " and ";
			} else {
				msg = length + " and ";
			}
		}
	}
	if(textarea_id) {
		node = document.getElementById(textarea_id);
		if(node) {
			maxnum = textarea_maxnum;
			ret = normalstr(node.value);
			length = UTF_8_length(ret);
			node.value = ret;
			if(max_check == true) {
				msg = msg + length + " of " + maxnum;
			} else {
				msg = msg + length;
			}
		}
	}
	message_box.innerHTML = msg +" characters";
}

function addCharset(id) {
	var	node = document.getElementById(id);
	if(node) {
		node.setAttribute("Accept-charset","ISO-8859-1");
		if(!added_msg) {
			added_msg = document.createElement('span');
			added_msg.innerHTML = 'Posting Helper has added the accept-charset attribute to this form.';
			added_msg.setAttribute('style','color: red;');
			node.insertBefore(added_msg, node.childNodes[0]);
		}
	}
}

function createButton() {

	if(!conv_btn) {
		conv_btn = document.createElement('input');
		conv_btn.innerHTML = '';
		conv_btn.type = 'button';
		conv_btn.id = id_btn;
		conv_btn.value = 'Convert';
		conv_btn.setAttribute('style', convert_style);
	}
	if(!inverse_btn) {
		inverse_btn = document.createElement('input');
		inverse_btn.innerHTML = '';
		inverse_btn.type = 'button';
		inverse_btn.id = id_btn2;
		inverse_btn.value = 'Inverse';
		inverse_btn.setAttribute('style', inverse_style);
	}
	if(!message_box) {
		message_box = document.createElement('p');
		message_box.innerHTML = '';
		message_box.setAttribute('style', msgbox_style);
	}
	conv_btn.addEventListener('click', convComment, false);
	inverse_btn.addEventListener('click', inverseComment, false);
}

function addConvButton(id) {
	var	node = document.getElementById(id);
	if(node) {
		if(addpoint_type == ADD_APPEND_CHILD) {
			node.appendChild(conv_btn);
			node.appendChild(inverse_btn);
			node.appendChild(message_box);
		} else {
			node.parentNode.insertBefore(message_box, node.nextSibling);
			node.parentNode.insertBefore(inverse_btn, message_box);
			node.parentNode.insertBefore(conv_btn, inverse_btn);
		}
	}
}

function AddAcceptCharset(){
	addCharset(form_id)
}

function AddConvertButton() {
	createButton();
	addConvButton(addpoint_id);
	Watch_Over_Convert_Button();
}


function decstr(str){
	var	i;
	var	decstr='';
	var	temp;
	for(i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		if(c >= 0 && c < 32) {
			decstr = decstr + " ";
		} else if(c >= 32 && c < 127) {
			decstr = decstr + str.charAt(i);
		} else {
			temp = "&#"+c+";";
			decstr = decstr + temp;
		}
	}
	return decstr;
}

function normalstr(str){
	str = str.replace(/&#(\d+);/g, function(all, part, num) {
			return String.fromCharCode(parseInt(part));
			}
		);
	return str;
}

// Calculate length of UTF-8 string from unicode string
function UTF_8_length(str) {
	var	i;
	var	length = 0;
	for(i = 0; i < str.length; i++) {
		c = str.charCodeAt(i);
		if(c < 0x80) {
			length++;
		} else if(c < 0x800 || (c > 0xd7ff && c < 0xe000)) {
			length += 2;
		} else {
			length += 3;
		}
	}
	return length;
}

function getTextNodes(){
	var xpq = [
		'//*[@class="comment-subject"]',
		'//*[@class="comment-body"]',
		'//*[@id="playerTopTitle"]',
		'//*[@id="playerInfo-description"]',
		'//div[@class="collection-head-mid"]/h1',
		'//*[@id="collection-description"]',
		'//div[@class="create-group-panel"]/h1',
		'//textarea[@id="description"]',
		'//textarea[@id="message"]',
//		'//ul[@id="browseList"]/li/textarea',
		'//span[@class="message-subject"]',
		'//div[@class="messageRight floatL"]/p',
		'//div[@id="messageDetail"]/form/div[7]',
		'//div[@class="messageBody"]',
		'//p[@class="maxLines5"]',
		'//td[@class="title"]/a[@class="floatL"]',
		'//dd[@class="tags"]',
		'//dd[@class="url"]',
		'//title'
	];
	var xpq2 = [
		'//a[@class="thumbTitle maxLines2"]',
		'//input[@id="title"]',
		'//input[@id="subject"]',
		'//input[@id="newTags"]'
	];
	var array = new Array();
	k = 0;
	for(i = 0; i < xpq.length; i++) {
		var xp = document.evaluate(xpq[i]+'/text()', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var l=xp.snapshotLength;
		for (var j=0; j<l; j++, k++) {
			array[k] = xp.snapshotItem(j);
		}
	}
	for(i = 0; i < xpq2.length; i++) {
		var xp = document.evaluate(xpq2[i], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var l=xp.snapshotLength;
		for (var j=0; j<l; j++, k++) {
			array[k] = xp.snapshotItem(j);
		}
	}
	var ownerDoc = document.getElementsByTagName('html')[0].ownerDocument;
	if(ownerDoc) {
		array[k] = ownerDoc;
	}
	return array;
}

function ConvertUTF8String() {
	convert_specified = true;
	ConvertString();
}

// re-convert up to max_loop while the string code is UTF-8
function DoConversion(str) {
	var loop = 0;
	do {
		str = _from_utf8(str);
		if(_is_utf8(str) == false) break;
		loop++;
	} while(loop < max_loop);
	return str;
}

function ConvertString() {
	var nodes = getTextNodes();
	for(i = 0; i < nodes.length; i++) {
		outlog = 0;
		if(nodes[i].nodeType == 1) {
			if(nodes[i].nodeName == 'INPUT') {
				if(_is_utf8(nodes[i].value) == true) {
					nodes[i].value = DoConversion(nodes[i].value);
				}
			} else if(nodes[i].nodeName == 'A') {
				if(_is_utf8(nodes[i].textContent) == true) {
					nodes[i].textContent = DoConversion(nodes[i].textContent);
				}
				if(_is_utf8(nodes[i].title) == true) {
					nodes[i].title = DoConversion(nodes[i].title);
				}
			}
		} else if(nodes[i].nodeType == 3) {
			if(_is_utf8(nodes[i].nodeValue) == true) {
				nodes[i].nodeValue = DoConversion(nodes[i].nodeValue);
			}
		} else if(nodes[i].nodeType == 9) {
			if(_is_utf8(nodes[i].title) == true) {
				nodes[i].title = DoConversion(nodes[i].title);
			} else {
				nodes[i].title = normalstr(nodes[i].title);
			}
		}
	}
}

// Enable converting UTF8
function Enable_Converting_UTF8() {
	convert_utf8 = true;
	GM_setValue("convert_utf8", convert_utf8);
}

// Disable converting UTF8
function Disable_Converting_UTF8() {
	convert_utf8 = false;
	GM_setValue("convert_utf8", convert_utf8);
}

// Copy from AOK's JavaScript Library. Thanks AOK.
function _from_utf8(s) {
	var c, d = "", flag = 0, tmp;
	for (var i = 0; i < s.length; i++) {
		c = s.charCodeAt(i);
		if (flag == 0) {
			if(c == 0xfeff) {	// UTF-16
			} else
			if ((c & 0xe0) == 0xe0) {
				flag = 2;
				tmp = (c & 0x0f) << 12;
			} else if ((c & 0xc0) == 0xc0) {
				flag = 1;
				tmp = (c & 0x1f) << 6;
			} else if ((c & 0x80) == 0) {
				d += s.charAt(i);
			} else {
				flag = 0;
			}
		} else if (flag == 1) {
			flag = 0;
			d += String.fromCharCode(tmp | (c & 0x3f));
		} else if (flag == 2) {
			flag = 3;
			tmp |= (c & 0x3f) << 6;
		} else if (flag == 3) {
			flag = 0;
			d += String.fromCharCode(tmp | (c & 0x3f));
		} else {
			flag = 0;
		}
	}
	return d;
}

// I created this check routine from _from_utf8
function _is_utf8(s) {
	var c, flag = 0;
	var	utf8 = false;
	for (var i = 0; i < s.length; i++) {
		c = s.charCodeAt(i);
		if (flag == 0) {
			if(c == 0xfeff) {	// UTF-16
			} else
			if ((c & 0xe0) == 0xe0) {
				flag = 2;
			} else if(c >= 0xc2 && c <= 0xdf) {
				flag = 1;
			} else {
				flag = 0;
			}
		} else if (flag == 1) {
			if(c >= 0x80 && c <= 0xBF) {
				utf8 = true;
				break;
			}
			flag = 0;
		} else if (flag == 2) {
			flag = 3;
		} else if (flag == 3) {
			if(c >= 0x80 && c <= 0xBF) {
				utf8 = true;
				break;
			}
			flag = 0;
		} else {
			flag = 0;
		}
	}
	return utf8;
}

})();
