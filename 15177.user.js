// ==UserScript==
// @name           One - photoVoter
// @namespace      http://www.one.lv/
// @description    adds (re)voting capability
// @include        http://c*.one.lv/viewPhoto.do*
// ==/UserScript==

function get_all(a_parent, a_tag, a_class) {
	var q = a_parent.getElementsByTagName(a_tag);
	var res = new Array;
	for (var i = 0; q[i]; i++) {
		if (q[i].className == a_class) {
			res.push(q[i]);
		}
	}
	return res;
}

//optimized
function get_first(a_parent, a_tag, a_class) {
	var q = a_parent.getElementsByTagName(a_tag);
	var ret;
	for (var i = 0; q[i]; i++) {
		if (q[i].className == a_class) {
			ret = q[i];
			break;
		}
	}
	return ret;
}

//optimized
function get_next(a_parent, a_tag, a_class, seq) {
	var q = a_parent.getElementsByTagName(a_tag);
	var ret;
	var idx = 0;
	for (var i = 0; q[i]; i++) {
		if (q[i].className == a_class) {
			idx++;
			if (idx == seq)
			{
				ret = q[i];
				break;
			}
		}
	}
	return ret;
}

function get_url_param(url, name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  if( results == null )
    return "";
  else
    return results[1];
}

function createHiddenInput(form, name, value) {
	var hiddenInput = document.createElement('input');
	hiddenInput.type='hidden';
	hiddenInput.name=name;
	hiddenInput.value=value;
	form.appendChild(hiddenInput);
	return hiddenInput;
}
 
var img = get_first(document, "img", "");
var photoId = get_url_param(img.src, "photoId");

if (!photoId) {
	var preloc = get_first(document, "td", "smallnormal");
	img = get_first(preloc, "img", "");
	photoId = get_url_param(img.src, "photoId");
}

var f_anchor = get_first(document, "a", "");
var friendId = get_url_param(f_anchor, "friendUserId");

if (!friendId)
{
	f_anchor = get_next(document, "a", "", 2);
	friendId = get_url_param(f_anchor, "friendUserId");
}

var onto = get_first(document, "div", "mark30small");
if (!onto)
	onto = get_first(document, "div", "mark5small");

if (onto)
	onto = onto.parentNode.parentNode.parentNode.parentNode;
else
{
   	onto = get_first(document, "form", "");
	if (onto)
	{
		onto.style.display='none';
		onto = onto.parentNode.parentNode.parentNode;
	}
}


if (onto)
{
	var tn = Math.floor(Math.random()*9999999);
	var sequence = get_url_param(window.location.href, "sequence");
	var tbody = onto;
	
	//hidden form
	var new_form = document.createElement('form');
	new_form.method='post';
	new_form.name="markPhotoForm2";
	new_form.action="/viewPhoto.do";
	
	createHiddenInput(new_form, "photoId", photoId);
	createHiddenInput(new_form, "tn", tn);
	createHiddenInput(new_form, "userId", friendId);
	createHiddenInput(new_form, "bonusMark", "yes");
	createHiddenInput(new_form, "sequence", sequence);
	
	var comment = document.createElement("input");
	comment.type="text";
	comment.name="commentary";
	comment.maxlength="255";
	comment.size="55";
	new_form.appendChild(comment);

	createHiddenInput(new_form, "eventId", "");
	createHiddenInput(new_form, "mark", "10.0");

	var new_button = document.createElement('input');
	new_button.type='submit';
	new_button.name='button.performMark'
	new_button.value="button.performMark"
	new_form.appendChild(new_button);

	var new_tr = document.createElement('tr');
	var new_td = document.createElement('td');
	new_td.appendChild(new_form);
	new_tr.appendChild(new_td);
	tbody.appendChild(new_tr);
}
