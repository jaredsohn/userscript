// ==UserScript==
// @name		ChanChimp Revivied
// @namespace	http://sites.google.com/site/netroscripts/chanchimp
// @description  Intuitive 4chan GUI for fast replies + Forwardlinks/Backlinks snapshots and nesting + Filters with and different filter actions + View all attached images + Auto-threading + more.  Now with Captcha Support!
// @version		1.3.5
// @copyright	  2010, Jenseki Mora / 2010, Thomas Quick
// @license		GPL version 3 ; http://www.gnu.org/copyleft/gpl.html
// @include	http://*.4chan.org/*
// @include	http://4chanarchive.org/*
// @match	http://*.4chan.org/*
// @match	http://4chanarchive.org/*
// @compatibility Firefox 3.5+, Chrome 4, Opera 10.10
// ==/UserScript==
//___________________________________________________________________________
// ---------------------------------------------- DETECT BROWSER ---------------------------------------------------------------------
var browser = '';
if (navigator.userAgent.indexOf('Firefox') > -1) browser = 'Firefox';
else if (navigator.userAgent.indexOf('Chrome') > -1) browser = 'Chrome';
else if (navigator.userAgent.indexOf('Opera') > -1) browser = 'Opera';
else if (navigator.userAgent.indexOf('Safari') > -1) browser = 'Safari';
else browser = 'Others';

// ---------------------------------------------- GM FUNCTIONS FOR NON-FIREFOX---------------------------------------------------------------------
if (browser == 'Chrome') {
	function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}

	function GM_getValue(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (value == 'false') return false;
		else if (value == 'true') return true;
		else return value || defaultValue;
	}

	function GM_log(message) {
		console.log(message);
	}

	function GM_setValue(name, value) {
		localStorage.setItem(name, value + '');
	}
}
// ---------------------------------------------- HELPER FUNCTIONS ---------------------------------------------------------------------
Array.prototype.reset = function () {
	while (this.length > 0) this.remove(-1);
}
Array.prototype.remove = function (from, to) { // Array Remove - By John Resig (MIT Licensed)
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
}
String.prototype.ltrim = function (chars) {
	chars = chars || "\\s";
	return this.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
String.prototype.rtrim = function (chars) {
	chars = chars || "\\s";
	return this.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
String.prototype.trim = function (chars) {
	return this.ltrim().rtrim();
}
String.prototype.isOneOfThese = function (inArray) { //String IsOneOfThese - By Jenseki Mora
	var al = inArray.length;
	for (var fi = 0; fi < al; fi++) {
		if (this == inArray[fi]) return true;
	}
	return false;
}
String.prototype.isNoneOfThese = function (inArray) { //String IsNoneOfThese - By Jenseki Mora
	var al = inArray.length;
	for (var fi = 0; fi < al; fi++) {
		if (this == inArray[fi]) return false;
	}
	return true;
}

function recaptchaUriGet() {
	return document.getElementById("recaptcha_image").firstChild.getAttribute('src');
}

function recaptchaChallengeGet() {
	return document.getElementById("recaptcha_challenge_field_holder").firstChild.getAttribute("value");
}

function uriGet(querry) { //URL guery parameter fetcher
	var bar, out, q, q2, el, e2;
	bar = document.location.href;
	out = '';
	q = bar.indexOf('\?');
	e1 = bar.indexOf('=', q + 1);
	if (q > -1 && bar.substr(q + 1, e1 - q - 1) == querry) {
		out = uriGet2(bar, e1 + 1);
	}
	else if (q > -1) {
		q2 = bar.indexOf('&' + querry + '=', q + 1)
		if (q2 > -1) {
			e2 = bar.indexOf('=', q2 + 1);
			out = uriGet2(bar, e2 + 1);
		}
	} //endallifs
	return out;
}

function uriGet2(url, start) { //subfunction of uriGet()
	var out, end;
	out = '';
	end = url.indexOf('&', start);
	if (end < 0) out = url.substr(start);
	else out = url.substr(start, end - start);
	return out;
}

function notNull(obj) { //checks if object isn't null and undefined
	if (obj != undefined && obj != '') return true;
	else return false;
}

function checkDupe(url) { //for deletion
	var l = pics.length;
	var fi;
	var res = false;
	if (l > 0) {
		for (fi = 0; fi <= l; fi++) {
			if (pics[fi] == url) {
				fi = l + 1;
				res = true;
			}
		}
	}
	return res;
}

function setPrefs() { //sets user preferences
	var temp;
	GM_setValue('cci_postarea_hidden', document.getElementById('cci-postarea-hidden').checked);
	GM_setValue('cci_postarea_popup', document.getElementById('cci-postarea-popup').checked);
	GM_setValue('cci_postarea_twofields', document.getElementById('cci-postarea-twofields').checked);
	GM_setValue('cci_boardlinks', document.getElementById('cci-boardlinks').checked);
	GM_setValue('cci_quotesnapshot', document.getElementById('cci-quotesnapshot').checked);
	GM_setValue('cci_autothread', document.getElementById('cci-autothread').checked);
	GM_setValue('cci_linkify', document.getElementById('cci-linkify').checked);
	//GM_setValue('cci_autogif',document.getElementById('cci-autogif').checked);
	GM_setValue('post_templates', document.getElementById('cci-post-templates').value);
	GM_setValue('repfilter', document.getElementById('cci-post-filters').value); /*GM_setValue('customcss',document.getElementById('cci-customcss').value);*/
	temp = document.getElementById('cci-colorscheme').value;
	if (temp == '') temp = 'red';
	GM_setValue('cci_postarea_color', temp);
	temp = document.getElementById('cci-postarea-opacity').value;
	if (isNaN(parseFloat(temp)) || parseFloat(temp) < 0 || parseFloat(temp) > 1) temp = '1.00';
	GM_setValue('cci_postarea_opacity', temp);
	temp = document.getElementById('cci-onmouseout-opacity').value;
	if (isNaN(parseFloat(temp)) || parseFloat(temp) < 0 || parseFloat(temp) > 1) temp = '1.00';
	GM_setValue('cci_onmouseout_opacity', temp);
	if (document.location.href.indexOf('#') < 0) document.location = document.location.href;
	else document.location = document.location.href.substr(0, document.location.href.indexOf('#')); //if url is with "#"
}

function getRadioValue(radioObj) { //fetches the selected radio button value
	var radioLength, fi;
	if (!radioObj) return "";
	radioLength = radioObj.length;
	if (radioLength == undefined) {
		if (radioObj.checked) return radioObj.value;
		else return "";
	}
	for (fi = 0; fi < radioLength; fi++) {
		if (radioObj[fi].checked) return radioObj[fi].value;
	}
	return "";
}

function checkboxChecked(bool) { //outputs checked attribute to true-valued checkbox input elements
	if (bool === true) return "checked";
	else return "";
}

function colorschemeSelected(color) { //outputs checked attribute to true-valued radio input element
	if (color == GM_getValue('cci_postarea_color', 'red')) return "selected";
	else return "";
}

function addForwardLink(qid, tid) { //ads a forwardlink of a quoting reply to a post
	var bq, e, bqr;
	if (document.getElementById('nothread' + qid) == undefined && document.getElementById(qid) != undefined) //if a reply post and not original post
	bq = document.getElementById(qid).getElementsByTagName('blockquote')[0];
	else if (document.body.innerHTML.indexOf('name=\"' + qid + '\"') > -1) //if original post
	if (web.isOneOfThese(['4chan'])) bq = document.getElementsByName('delform')[0].getElementsByTagName('blockquote')[0];
	else if (web.isOneOfThese(['4chanarchive'])) bq = document.getElementsByTagName('blockquote')[0];
	else return false; //if not found
	if (bq != undefined) {
		if (bq.querySelectorAll('div.forwardlinks')[0] == undefined) {
			e = document.createElement('div');
			e.innerHTML = '<br />------------Replies------------';
			bq.appendChild(e);
			e.setAttribute('class', 'forwardlinks');
		}
		bqr = bq.querySelectorAll('div.forwardlinks')[0];
		bqr.innerHTML = bqr.innerHTML + '<br /><font><a href="javascript: void 0;" onclick="ccr_placequoted(this,\'' + tid + '\');" onmouseover="ccr_showquoted(\'' + tid + '\');" onmouseout="ccr_hidequoted();" class="quotelink-forwardlink">&gt;&gt;' + tid + '</a></font>';
	}
}

function linkify(text) {
	if (text) text = text.replace(/((https?:\/\/|ftp:\/\/)([A-Za-z0-9_:#%$!;,?&=@~"'\/\\\.\-\+\?\[\] ]*(.html?)|[A-Za-z0-9_:#%$!;,?&=@~"'\/\\\.\-\+\?\[\]]*))/g, "<u><a target='_blank' href='$1'>$1</a></u>");
	return text;
}

function linkifyAll() {
	var bq = document.getElementsByTagName('blockquote');
	var ql = bq.length;
	for (var i = 0; i < ql; i++)
	bq[i].innerHTML = linkify(bq[i].innerHTML);
}
//function autogif(text) {
//	if(text)
//		return text.replace(/http:\/\/\d\.thumbs\.4chan\.org\/gif\/thumb\/(\d+)s\.jpg/, "http://images.4chan.org/gif/src/$1.gif");
//}
//function autogifAll() {
//  var links = document.getElementsByTagName('a');
//	for(var i = 0; i < links.length; i++) {
//		links[i].innerHTML = autogif(links[i].innerHTML);
//	}
//}


function filterPosts(start) { //filter each post one by one;
	//global vars postinfo, filters;
	var pl, fl, fi, fj;
	pl = postinfo.length;
	fl = filters.length;
	for (fi = start; fi < pl; fi++) {
		for (fj = 0; fj < fl; fj += 2) {
			if (notNull(filters[fj]) && notNull(filters[fj + 1]) && filters[fj].indexOf('#') !== 0 && inScope(filters[fj])) {
				if (executeCond(filters[fj + 1], fi)) doFilter(filters[fj], fi);
			}
		}
	}
}

function inScope(meta) { //checks if a filter is within scope
	var pos1, po2, scope, res;
	pos1 = meta.indexOf('scope:') + 6;
	pos2 = meta.indexOf(';', pos1);
	scope = meta.substr(pos1, pos2 - pos1).trim();
	res = true;
	if (scope.indexOf('include[*]') > -1); //only set res to false in the final else
	else if (scope.search(eval('/(include\\[)(' + board + '|[a-zA-Z0-9_,]*(' + board + ',|,' + board + ')[a-zA-Z0-9_,]*)(\\])/i')) > -1);
	else if (scope.search(/(exclude\[)[a-zA-Z0-9_,]+(\])/i) > -1 && scope.search(eval('/(exclude\\[)(' + board + '|[a-zA-Z0-9_,]*(' + board + ',|,' + board + ')[a-zA-Z0-9_,]*)(\\])/i')) < 0);
	else res = false;
	return res;
}

function executeCond(cond, fi) { //executes the evaluation of filter condition rules
	var proceed, pos1, pos2, res, input, func, param, mode1, mode2;
	var rulesresarray = new Array();
	var j = 0;
	proceed = 1;
	for (; proceed == 1;) { //loop until proceed becomes zero
		if (notNull(cond) && cond.match(/(@)(postnumber|name|tripcode|nametripcode|email|filename|filesize|imagewidth|imageheight|comment|commenthtml|(out)[0-9]+)(\->)/) == null) //if there are no more condition rules
		proceed = 0;
		else { //if there is a condition rule
			res = undefined;
			pos1 = cond.search(/(@)(postnumber|name|tripcode|nametripcode|email|filename|filesize|imagewidth|imageheight|comment|commenthtml|(out)[0-9]+)(\->)/) + 1;
			pos2 = cond.indexOf('->', pos1 + 1);
			input = cond.substr(pos1, pos2 - pos1); //gets what data is at @data->someFunc->[[param]]->end
			if (input.indexOf('out') === 0) {
				input = '$ ' + rulesresarray[parseInt(input.substr(3)) - 1] + '';
			}
			pos1 = pos2 + 2;
			pos2 = cond.indexOf('->[[', pos1 + 1);
			func = cond.substr(pos1, pos2 - pos1); //gets what someFunc is at @data->someFunc->[[param]]->end
			pos1 = pos2 + 4;
			pos2 = cond.indexOf(']]->end', pos1 + 1);
			param = cond.substr(pos1, pos2 - pos1); //gets what param is at @data->someFunc->[[param]]->end
			if (notNull(input) && notNull(func) && notNull(param)) {
				try { //IMPORTANT
					if (func.indexOf('CS') > -1) {
						func = func.substr(0, func.length - 2);
						mode1 = 'CS';
					}
					else if (func.indexOf('RE') > -1) {
						func = func.substr(0, func.length - 2);
						mode1 = 'RE';
					}
					if (func == 'hasText' || func == 'exactText' || func == 'startsWith' || func == 'endsWith') {
						if (mode1 != 'CS' && mode1 != 'RE') mode1 = 'DE';
						if (eval('f_check_' + func + '(\'' + input + '\',\'' + fi + '\',\'' + param + '\',\'' + mode1 + '\')')) res = true;
						else res = false;
					}
					if (func.indexOf('value') === 0) {
						mode1 = 'value';
					}
					else if (func.indexOf('length') === 0) {
						mode1 = 'length';
					}
					if (func.indexOf('GTE') > -1) {
						func = func.substr(0, func.length - 3);
						mode2 = 'GTE';
					}
					else if (func.indexOf('GT') > -1) {
						func = func.substr(0, func.length - 2);
						mode2 = 'GT';
					}
					else if (func.indexOf('LTE') > -1) {
						func = func.substr(0, func.length - 3);
						mode2 = 'LTE';
					}
					else if (func.indexOf('LT') > -1) {
						func = func.substr(0, func.length - 2);
						mode2 = 'LT';
					}
					if (mode1 == 'value' || mode1 == 'length') {
						if (eval('f_check_compare' + '(\'' + input + '\',\'' + fi + '\',\'' + param + '\',\'' + mode1 + '\',\'' + mode2 + '\')')) res = true;
						else res = false;
					}
					if (func == 'divisibleBy') {
						if (eval('f_check_divisibleBy' + '(\'' + input + '\',\'' + fi + '\',\'' + param + '\')')) res = true;
						else res = false;
					}
					if (func == 'countText') {
						if (mode1 != 'CS' && mode1 != 'RE') mode1 = 'DE';
						res = eval('f_countText' + '(\'' + input + '\',\'' + fi + '\',\'' + param + '\',\'' + mode1 + '\')');
					}
					if (res == undefined) res = false;
				} catch (e) {
					res = false;
				}
			}
			rulesresarray[j++] = res; //save this iteration's result for possible calling later
			cond = cond.substr(pos2 + 7); //remove the current condition rule so we can check if there are still condition rules left in the next loop
			if (cond == '' || res === false) proceed = 0; //if new cond value becomes null then there's no left condition rule to evaluate OR the current rule resulted to false
		}
	}
	if (res == undefined) res = false;
	return res;
}

function selectInput(call, fi) { //returns corresponding value in the postinfo array of the @data in post index fi
	//global var postinfo;
	switch (call) {
	case 'postnumber':
		return postinfo[fi][0];
		break;
	case 'name':
		return postinfo[fi][1];
		break;
	case 'tripcode':
		return postinfo[fi][2];
		break;
	case 'nametripcode':
		return postinfo[fi][1] + ' ' + postinfo[fi][2];
	case 'email':
		return postinfo[fi][3];
		break;
	case 'filename':
		return postinfo[fi][4];
		break;
	case 'filesize':
		return postinfo[fi][5];
		break;
	case 'imagewidth':
		return postinfo[fi][6];
		break;
	case 'imageheight':
		return postinfo[fi][7];
		break;
	case 'comment':
		return postinfo[fi][8].replace(/(<)([a-zA-Z\/])([a-zA-Z0-9_ \\\/"'\.\-\+():;,={}]*)(>)/ig, '');
		break; //do not pass html tag character sequences
	case 'commenthtml':
		return postinfo[fi][8];
	default:
		if (call.indexOf('$ ') === 0) return call.substr(2);
		else return false;
	}
}

function doFilter(meta, fi) { //render the proper filter action
	//global var postinfo, colorscheme[2];
	var pos1, pos2, action, id, obj;
	pos1 = meta.indexOf('id:') + 3;
	pos2 = meta.indexOf(';', pos1);
	id = meta.substr(pos1, pos2 - pos1).trim();
	obj = document.getElementById(postinfo[fi][0]);
	pos1 = meta.indexOf('action:') + 7;
	pos2 = meta.indexOf(';', pos1);
	action = meta.substr(pos1, pos2 - pos1).trim();
	if (action == 'hide') {
		obj.innerHTML = '<div id="filter-hidden-' + postinfo[fi][0] + '" style="display: none;">' + obj.innerHTML + '</div>' + '<div id="filter-note-' + postinfo[fi][0] + '"><small>ID:: ' + id + ' <a href="javascript: void 0;" onclick="ccr_showFiltered(\'' + postinfo[fi][0] + '\');" style="text-decoration: none;">[Show]</a></small></div>';
	}
	else if (action.indexOf('highlight') === 0) {
		if (action.indexOf('-') != 9) obj.setAttribute('class', 'replyhl'); //if color is not specified, render background color same as 4chan's original highligting color
		else obj.style.backgroundColor = action.substr(10);
		obj.innerHTML = '<div><small>ID:: ' + id + '</small></div><div>' + obj.innerHTML + '</div>';
	}
	else if (action.indexOf('border') === 0) {
		if (action.indexOf('-') != 6) obj.style.border = 'solid 2px ' + colorscheme[2]; //if color is not specified render border color same as ChanChimp's darkest color in the user's current ChanChimp color scheme
		else obj.style.border = 'solid 3px ' + action.substr(7);
		obj.innerHTML = '<div><small>ID:: ' + id + '</small></div><div>' + obj.innerHTML + '</div>';
	}
	else if (action == 'smalltext') {
		obj.getElementsByTagName('blockquote')[0].setAttribute('style', 'font-size: 10px');
		obj.innerHTML = '<div><small>ID:: ' + id + ' <a href="javascript: void 0;" onclick="ccr_enlargeFiltered(\'' + postinfo[fi][0] + '\');" style="text-decoration: none;">[Enlarge]</a></small></div>' + '<div style="font-size: 10px;">' + obj.innerHTML + '</div>';
	}
}

function escapeRegExp(param, mode) {
	var str;
	switch (mode) {
	case 'DE':
		str = '/' + param.replace(/(\.|\?|\[|\]|\(|\)|\+|\-|\{|\}|\*|\/|\\)/gi, '\\\$1') + '/i';
		break;
	case 'CS':
		str = '/' + param.replace(/(\.|\?|\[|\]|\(|\)|\+|\-|\{|\}|\*|\/|\\)/gi, '\\\$1') + '/';
		break;
	case 'RE':
		str = param;
		break;
	}
	return str;
}
//the following functions are evaluators of condition rules


function f_check_hasText(inputtxt, fi, param, mode) {
	var input, str;
	input = selectInput(inputtxt, fi);
	if (input === false) return false;
	str = escapeRegExp(param, mode);
	if (input.search(eval(str)) > -1) return true;
	else return false;
}

function f_check_exactText(inputtxt, fi, param, mode) {
	var input, str;
	input = selectInput(inputtxt, fi);
	if (input === false) return false;
	str = escapeRegExp(param, mode);
	if (input.search(str) === 0 && input.length == param.length) return true;
	else return false;
}

function f_check_startsWith(inputtxt, fi, param, mode) {
	var input, str;
	input = selectInput(inputtxt, fi);
	if (input === false) return false;
	str = escapeRegExp(param, mode);
	if (input.search(str) === 0) return true;
	else return false;
}

function f_check_endsWith(inputtxt, fi, param, mode) {
	var input, proceed, pos1, postemp, str;
	input = selectInput(inputtxt, fi);
	if (input === false) return false;
	str = escapeRegExp(param, mode);
	if (input.match(eval(str)) != null) { //if there is a match
		pos = -1;
		for (proceed = 0; proceed == 0;) { //search for the last occurence of a match
			postemp = input.substr(pos + 1).search(eval(str));
			if (postemp > -1) pos = postemp + pos + 1;
			else proceed = 1;
		} //loop again to search for further matches
		if (pos + param.length == input.length) return true; //if position of the match plus its length is equal to length of the whole input/data
		else return false;
	} else {
		return false;
	}
}

function f_countText(inputtxt, fi, param, mode) {
	var input, str;
	var matches = new Array();
	input = selectInput(inputtxt, fi);
	if (input === false) return false;
	str = escapeRegExp(param, mode);
	matches = input.match(eval(str + 'g'));
	if (matches == null) return 0;
	else return matches.length;
}

function f_check_compare(inputtxt, fi, param, mode1, mode2) {
	var input, input2, operator;
	input = selectInput(inputtxt, fi);
	if (input === false) return false;
	switch (mode1) {
	case 'value':
		input2 = parseInt(input);
		break;
	case 'length':
		input2 = input.length;
		break;
	default:
	}
	switch (mode2) {
	case 'GT':
		operator = '>';
		break;
	case 'GTE':
		operator = '>=';
		break;
	case 'LT':
		operator = '<';
		break;
	case 'LTE':
		operator = '<=';
		break;
	}
	if (eval(input2 + operator + parseInt(param) + '')) return true;
	else return false;
}

function f_check_divisibleBy(inputtxt, fi, param) {
	var input;
	input = selectInput(inputtxt, fi);
	if (input === false) return false;
	if (parseInt(input) % parseInt(param) === 0) return true;
	else return false;
}

//checks if a post is quoting one post only


function checkSinglequote(id) {
	var obj;
	obj = document.getElementById(id);
	var ql = new Array();
	try {
		ql = obj.getElementsByTagName('blockquote')[0].querySelectorAll('a.quotelink');
	} catch (e) {
		return false
	}
	if (ql.length > 0) {
		for (var i = 0; i < ql.length; i++) {
			if (ql[i].innerHTML != ql[0].innerHTML) {
				return false;
			}
		}
		return true;
	}
	return false;
}

//moves a post under thepost it replies to


function movePost(id) {
	var obj, tid;
	obj = document.getElementById(id);
	tid = obj.querySelectorAll('a.quotelink')[0].innerHTML.substr(8);
	putUnder(tid, obj);
}

//sunfunction of movePost()


function putUnder(id, obj) {
	var quotedobj, this_level, temp, i;
	if (document.getElementById('nothread' + id) != undefined) { //if quoted post is original post
		quotedobj = 'op';
		this_level = 2;
	} else if (document.getElementById(id) != undefined) { //if quoted post is a reply post
		quotedobj = document.getElementById(id).parentNode.parentNode.parentNode;
		if (quotedobj.getAttribute('level') != null) { //if quoted post has a level already
			this_level = parseInt(quotedobj.getAttribute('level')) + 1;
			if (this_level > 10) this_level = 10;
		} else { //if quoted post has no level
			this_level = 2;
		}
	} else { //if quoted post is not found
		return false;
	}
	obj.setAttribute('level', this_level); //set the level of the table object
	obj.getElementsByTagName('td')[0].setAttribute('style', 'width: ' + (this_level - 1) * 50 + 'px; text-align: right;'); //indent reply post
	crawlAndPut(obj, this_level, quotedobj);
}

function crawlAndPut(obj, this_level, currentunderobj) { //subfunction of crawlAndPut
	var repliesNode, nextObj, nextObjLevel;
	repliesNode = document.body.querySelectorAll('div[class~="4chan_ext_thread_replies"]')[0]; //4chan extension element
	if (repliesNode == undefined) repliesNode = document.getElementById('4chan_thread_replies'); //ChanChimp element
	if (currentunderobj == 'op') {
		nextObj = repliesNode.getElementsByTagName('table')[0];
		if (obj == nextObj) {
			if (repliesNode.getElementsByTagName('table')[1] != undefined) nextObj = repliesNode.getElementsByTagName('table')[1];
			else nextObj = '';
		}
	}
	else {
		if (nextTableElement(currentunderobj) !== false) {
			nextObj = nextTableElement(currentunderobj);
		}
		else {
			nextObj = '';
		}
	}
	if (nextObj != '') {
		nextObjLevel = getLevel(nextObj);
		if (this_level <= nextObjLevel) crawlAndPut(obj, this_level, nextObj);
		else putNow(obj, nextObj);
	}
	else {
		putNow(obj, nextObj)
	}
}

function nextTableElement(obj) { //returns the next table element after obj
	var out, i;
	out = false;
	parentOfElement = obj.parentNode;
	var elementarray = new Array();
	elementarray = parentOfElement.getElementsByTagName('table');
	var el = elementarray.length;
	for (i = 0; i < el; i++) {
		if (obj == elementarray[i] && elementarray[i + 1] != undefined) out = elementarray[i + 1];
	}
	return out;
}

function getLevel(obj) { //gets the level of a table
	if (notNull(obj.getAttribute('level'))) return parseInt(obj.getAttribute('level'));
	else return 1;
}

function putNow(obj, beforeObj) { //puts the to-be-moved object in the current place
	var repliesNode;
	repliesNode = document.body.querySelectorAll('div[class~="4chan_ext_thread_replies"]')[0]; //4chan extension element
	if (repliesNode == undefined) repliesNode = document.getElementById('4chan_thread_replies'); //ChanChimp element
	if (beforeObj != '') repliesNode.insertBefore(obj, beforeObj);
	else repliesNode.appendChild(obj);
}

function savePopUpPosition() {
	GM_setValue('cc_popupx', parseInt(document.getElementById('cc-newpostarea2').style.left));
	GM_setValue('cc_popupy', parseInt(document.getElementById('cc-newpostarea2').style.top));
}

function jumptolast() {
	var uri = document.location.href;
	if (uri.indexOf('#') > -1) uri = uri.substr(0, uri.indexOf('#'));
	if (postarray_t_ids[currentlast_id] == undefined) {
		alert('You reached first reply. You\'ll be reset.');
		resetjump();
	}
	else {
		document.getElementById(postarray_t_ids[currentlast_id].substr(16)).setAttribute('class', 'replyhl');
		document.location = uri + '#' + postarray_t_ids[currentlast_id--].substr(16);
		setTimeout('document.getElementById(\'' + postarray_t_ids[currentlast_id + 1].substr(16) + '\').setAttribute(\'class\',\'reply\');', 1000);
	}
}

function resetjump() {
	currentlast_id = last_id;
	jumptolast();
}

function processInsertedDOM(e) {
	if (e.target.nodeName == 'TABLE' && e.target.getElementsByTagName('tr')[0].getAttribute('placedby') == null) {
		var quotenums = e.target.querySelectorAll('a.quotejs');
		var quotelinks = e.target.querySelectorAll('a.quotelink');
		addQuoteFeatures(quotenums, quotelinks);
		if (GM_getValue('cci_linkify', false) === true) {
			e.target.querySelectorAll('blockquote')[0].innerHTML = linkify(e.target.querySelectorAll('blockquote')[0].innerHTML);
		}
		if (post_filters_str != '') {
			processInfo(e.target.querySelectorAll('td.reply')[0], postinfo.length);
			filterPosts(postinfo.length - 1);
		}
	}
}

function addQuoteFeatures(quotenums, quotelinks) {
	var l = quotenums.length;
	for (i = 0; i < l; i++) {
		if (parseInt(quotenums[i].innerHTML) > 100) {
			var postId = /[0-9]+/.exec(quotenums[i].parentNode.getAttribute("id"));
			quotenums[i].setAttribute('href', 'javascript: void 0;');
			quotenums[i].setAttribute('onclick', 'ccr_showPostArea(); ccr_quote(\'' + postId + '\');');
			quotenums[i].innerHTML = postId;
		}
	}
	if (GM_getValue('cci_quotesnapshot', true)) {
		l = quotelinks.length;
		var qid;
		var tid;
		for (i = 0; i < l; i++) {
			qid = quotelinks[i].href.substr(quotelinks[i].href.indexOf('#') + 1);
			tid = quotelinks[i].parentNode.parentNode.parentNode.getElementsByTagName('input')[0].name;
			quotelinks[i].setAttribute('href', 'javascript: void 0;');
			quotelinks[i].setAttribute('onmouseover', 'ccr_showquoted(\'' + qid + '\');');
			quotelinks[i].setAttribute('onmouseout', 'ccr_hidequoted();');
			quotelinks[i].setAttribute('onclick', 'ccr_placequoted(this,\'' + qid + '\');');
			addForwardLink(qid, tid);
		}
	}
}

function processInfo(tdobj, fk) {
	postinfo[fk] = Array();
	//post id or number
	postinfo[fk][0] = tdobj.id;
	//name
	if (tdobj.querySelectorAll('span.commentpostername')[0] != undefined) postinfo[fk][1] = tdobj.querySelectorAll('span.commentpostername')[0].innerHTML.replace(/((<a|<\/)([a-zA-Z0-9_ =\-\+\/\\\."%;,:]*)(>))|(Anonymous)/g, '');
	//tripcode
	if (tdobj.querySelectorAll('span.postertrip')[0] != undefined) postinfo[fk][2] = tdobj.querySelectorAll('span.postertrip')[0].innerHTML;
	//email
	if (tdobj.querySelectorAll('span.linkmail')[0] != undefined) postinfo[fk][3] = tdobj.querySelectorAll('a.linkmail')[0].href.substr(7);
	//filename
	if (tdobj.querySelectorAll('span.filesize')[0] != undefined && tdobj.querySelectorAll('span.filesize')[0].getElementsByTagName('span')[0] != undefined) postinfo[fk][4] = tdobj.querySelectorAll('span.filesize')[0].getElementsByTagName('span')[0].innerHTML;
	if (tdobj.querySelectorAll('span.filesize')[0] != undefined) {
		temp = tdobj.querySelectorAll('span.filesize')[0].innerHTML;
		//filesize
		pos1 = temp.search(/[(][0-9\.]+( (KB|MB),)/i);
		pos2 = temp.indexOf(',', pos1 + 1);
		temp2 = temp.substr(pos1 + 1, pos2 - pos1 - 1);
		postinfo[fk][5] = temp.substr(pos1 + 1, pos2 - pos1 - 4);
		if (temp2.indexOf('MB') > -1) {
			postinfo[fk][5] = parseFloat(postinfo[fk][5]) * 1000 + '';
		}
		//width
		pos1 = temp.search(/[0-9]+(x)[0-9]+/i);
		pos2 = temp.indexOf('x', pos1 + 1);
		postinfo[fk][6] = temp.substr(pos1, pos2 - pos1);
		//height
		pos1 = pos2 + 1;
		if (cond_isthread) pos2 = temp.indexOf(',', pos1 + 1);
		else pos2 = temp.indexOf(')', pos1 + 1);
		postinfo[fk][7] = temp.substr(pos1, pos2 - pos1);
	}
	else {
		postinfo[fk][5] = '0';
		postinfo[fk][6] = '0';
		postinfo[fk][7] = '0';
	}
	if (tdobj.getElementsByTagName('blockquote')[0] != undefined) postinfo[fk][8] = tdobj.getElementsByTagName('blockquote')[0].innerHTML.replace(/(<div class="forwardlinks">).*(<\/div>)/i, '');
	for (j = 0; j < 9; j++) {
		if (postinfo[fk][j] == undefined) postinfo[fk][j] = '';
		else postinfo[fk][j] = postinfo[fk][j].trim();
	}
}




// ---------------------------------------------- INITIALIZATION ---------------------------------------------------------------------
var this_build = 9;
var body = document.getElementsByTagName("body")[0];
var head = document.getElementsByTagName("head")[0];

var obj, tempobj, e, temp, temp2, temp2, pos, po2, i, j, k, l;
var temparray = new Array();
var uri = document.location.href;
var domain = uri.substr(7, uri.substr(7).indexOf('/'));

//get dir length
l = uri.length;
var dirlength = 0;
for (i = 0; i < l - 1 && uri[i] != '?' && uri[i] != '#'; i++)
if (uri[i] == '/') dirlength++;
dirlength -= 2;

//colorscheme
var colorscheme = Array();
var opacity = GM_getValue('cci_postarea_opacity', '1');
switch (GM_getValue('cci_postarea_color', 'red')) {
case 'red':
	colorscheme[0] = 'rgba(224,64,0,' + opacity + ')';
	colorscheme[1] = 'rgba(240,224,214,' + opacity + ')';
	colorscheme[2] = 'rgba(243,239,235,' + opacity + ')';
	break;
case 'orange':
	colorscheme[0] = 'rgba(255,113,0,' + opacity + ')';
	colorscheme[1] = 'rgba(251,231,128,' + opacity + ')';
	colorscheme[2] = 'rgba(255,246,168,' + opacity + ')';
	break;
case 'yellow':
	colorscheme[0] = 'rgba(255,255,0,' + opacity + ')';
	colorscheme[1] = 'rgba(255,255,183,' + opacity + ')';
	colorscheme[2] = 'rgba(255,255,204,' + opacity + ')';
	break;
case 'green':
	colorscheme[0] = 'rgba(0,195,34,' + opacity + ')';
	colorscheme[1] = 'rgba(214,240,214,' + opacity + ')';
	colorscheme[2] = 'rgba(235,243,235,' + opacity + ')';
	break;
case 'blue':
	colorscheme[0] = 'rgba(73,101,214,' + opacity + ')';
	colorscheme[1] = 'rgba(214,218,240,' + opacity + ')';
	colorscheme[2] = 'rgba(232,235,252,' + opacity + ')';
	break;
case 'purple':
	colorscheme[0] = 'rgba(153,50,204,' + opacity + ')';
	colorscheme[1] = 'rgba(220,208,255,' + opacity + ')';
	colorscheme[2] = 'rgba(235,228,255,' + opacity + ')';
	break;
case 'gray':
	colorscheme[0] = 'rgba(128,128,128,' + opacity + ')';
	colorscheme[1] = 'rgba(221,221,221,' + opacity + ')';
	colorscheme[2] = 'rgba(236,236,236,' + opacity + ')';
	break;
default:
}

//url conditions
var web = '';
if (domain.indexOf('4chan.org') > -1) web = '4chan';
else if (domain.indexOf('4chanarchive.org') > -1) web = '4chanarchive';
else if (domain.indexOf('easymodo.net') > -1) web = 'easymodo';
else if (domain.indexOf('pinoychan.org') > -1) web = 'pinoychan';
var cond_notccvai = true;
if (uriGet('chanchimp') == 'on') cond_notccvai = false;
var cond_isthreadorboard = false;
var cond_isthread = false;
var cond_isboard = false;
switch (web) {
case '4chan':
	if (dirlength >= 1 && uri.indexOf('/res/') < 0 && domain.indexOf('boards') === 0) cond_isboard = true;
	else if (dirlength == 3 && uri.indexOf('/res/') > -1) cond_isthread = true;
	break;
case '4chanarchive':
	if (dirlength == 2 && uri.indexOf('/brchive/archive.php5') > -1) cond_isboard = true;
	if (dirlength == 2 && uri.indexOf('/brchive/dspl_thread.php5') > -1) cond_isthread = true;
	break;
	//below are for future versions
case 'easymodo':
	if (dirlength == 2 && uri.indexOf('/cgi-board.pl/') > -1) cond_isboard = true;
	if (dirlength == 4 && uri.indexOf('/thread/') > -1) cond_isthread = true;
	break;
case 'pinoychan':
	if (dirlength == 2 && uri.indexOf('/boards/') > -1) cond_isboard = true;
	if (dirlength == 4 && uri.indexOf('/res/') > -1) cond_isthread = true;
	break;
default:
}
if (cond_isboard === true || cond_isthread === true) cond_isthreadorboard = true;

//put all replie objects in array;
var postarray = new Array();
var postarray_t = new Array();
postarray = document.body.querySelectorAll('td.reply');
var rl = postarray.length;
for (i = 0; i < rl; i++) {
	postarray_t[i] = postarray[i].parentNode.parentNode.parentNode;
	if (postarray_t[i].id == '') postarray_t[i].setAttribute('id', 'cci_4chan_reply_' + postarray[i].id);
}

//generate filter array
var post_filters_str = GM_getValue('repfilter', '');
post_filters_str = post_filters_str.replace(/\r/g, '');
var filters = new Array();

//customcss
/*var customcss_str=GM_getValue('customcss','');*/

// ---------------------------------------------- MAIN ---------------------------------------------------------------------
(function() {
	// 4chan x quick reply
	document.addEventListener('DOMNodeInserted', function(e) {
		var input = document.evaluate('.//input[@name~="recaptcha_response_field"][1]', e.target, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if(input != undefined) {
			input.addEventListener('keydown', onKeyDown, true);
		}
	}, true);

})();
if (cond_isthreadorboard && cond_notccvai) {

	//monitor-resolution-dependent sizes
	var field_size = Array();
	var table_width = Array();
	var shortwidth = 0;
	field_size[0] = 200;
	field_size[1] = 80;
	field_size[2] = 35;
	field_size[3] = 10;
	field_size[4] = 700;
	field_size[5] = 490;
	table_width[0] = 800;
	table_width[1] = 500;
	table_width[2] = 300;
	if (document.body.clientWidth < 1000) {
		field_size[0] = 150;
		field_size[1] = 40;
		field_size[2] = 30;
		field_size[3] = 5;
		field_size[4] = 630;
		field_size[5] = 420;
		table_width[0] = 700;
		table_width[1] = 440;
		table_width[2] = 260;
	}
	if (document.body.clientWidth < 895) {
		shortwidth = 1;
	}
	//post templates
	var post_templates_str_orig = 'Name:Template A\n\
Template A\n\n\
---separator---\n\
Name:Template B\n\
Template B\n\n\
---separator---\n\
Name:Template C\n\
Template C\n\n\
---separator---\n\
Name:Template D\n\
Template D\n';
	var post_templates_str = "";
	var post_templates = new Array();
	temparray.reset();
	if (GM_getValue('post_templates', false) === false || GM_getValue('post_templates', false).indexOf('Command::Reset') === 0) {
		post_templates_str = post_templates_str_orig;
		GM_setValue('post_templates', post_templates_str);
	}
	else {
		post_templates_str = GM_getValue('post_templates', post_templates_str_orig);
	}
	post_templates_str = post_templates_str.replace(/\r/g, '');
	temparray = post_templates_str.split('\n---separator---\n');
	l = temparray.length;
	for (i = 0; i < l; i++) {
		post_templates[2 * i] = temparray[i].substr(5, temparray[i].indexOf('\n') - 5);
		post_templates[2 * i + 1] = temparray[i].substr(temparray[i].indexOf('\n') + 1);
	}

	//add customstyle
/*
  if(customcss_str!='') {
	try{
	  e= document.createElement('style');
	  e.innerHTML= customcss_str;
	  head.appendChild(e);
	}catch(e) {}
  } */

	//add internal scripts
	try {
		e = document.createElement('script');
		e.type = "text/javascript";
		temp3 = "";
		temp2 = "";
		for (i = 0; i < post_templates.length; i++) {
			temp3 = post_templates[i + 1].replace(/\n/g, '\\n');
			temp3 = temp3.replace(/'/g, '\\\'');
			temp2 += "['" + post_templates[i].replace(/'/g, '\\\'') + "','" + temp3 + "']";
			if (i != post_templates.length - 2) temp2 += ",";
			i++;
		}
		temp = "\
	  function ccr_tempquoted(id) {\
			var temp= Array();\
			if(document.getElementById('nothread'+id)==undefined&&document.getElementById(id)!=undefined) {\
				temp[0]=document.getElementById(id).innerHTML;\
				temp[0]=temp[0].replace(eval('/('+String.fromCharCode(60)+'input)(.*)('+String.fromCharCode(62)+')/i'),'');\
				temp[1]=document.getElementById(id).style.backgroundColor;\
				temp[2]=document.getElementById(id).style.border;\
			}\
			else if(document.body.innerHTML.indexOf('name=\"'+id+'\"')>-1) {\
				var op_img = String.fromCharCode(60)+'img align=\"left\" src=\"'+document.querySelectorAll('span.filesize+br+a>img')[0].src+'\" /'+String.fromCharCode(62);\
				var op_poster = document.querySelectorAll('span.postername')[0].innerHTML;\
				var op_message = String.fromCharCode(60)+'blockquote '+String.fromCharCode(62)+document.getElementsByName('delform')[0].getElementsByTagName('blockquote')[0].innerHTML+String.fromCharCode(60)+'/blockquote'+String.fromCharCode(62);\
				temp[0]=String.fromCharCode(60)+'b'+String.fromCharCode(62)+'[OP]'+String.fromCharCode(60)+'/b'+String.fromCharCode(62)+' '+String.fromCharCode(60)+'span class=\\\"commentpostername\\\"'+String.fromCharCode(62)+''+op_poster+'	  '+String.fromCharCode(60)+'/span'+String.fromCharCode(62)+String.fromCharCode(60)+'br'+String.fromCharCode(62)+op_img+op_message;\
			}\
			else{\
				temp[0]='[Not Found]';\
			}\
			return temp;\
	  }\
	  function ccr_showquoted(id) {\
			var cont=document.getElementById('cc-quotedcontainer');\
			var temp= new Array();\
			temp=ccr_tempquoted(id);\
			cont.innerHTML=temp[0];\
			if(temp[1]!=undefined)\ cont.style.backgroundColor=temp[1];\
			if(temp[2]!=undefined) cont.style.border=temp[2];\
			var cont_t=document.getElementById('cc-quotedcontainer_t');\
			cont_t.style.top=cc_posYf-100+'px';\
			cont_t.style.left=cc_posX+100+'px';\
			cont_t.style.display='';\
	  }\
	  function ccr_hidequoted() {\
			var cont=document.getElementById('cc-quotedcontainer');\
			cont.innerHTML='';\
			cont.style.backgroundColor='';\
			cont.style.border='';\
			var cont_t=document.getElementById('cc-quotedcontainer_t');\
			cont_t.style.display='none';\
	  }\
	  function ccr_placequoted(obj,id) {\
			ccr_hidequoted();\
			var temp=String.fromCharCode(60)+'tr placedby=\"chanchimp\"'+String.fromCharCode(62,60)+'td class=\"reply\" style=\"\"'+String.fromCharCode(62,60)+'/td'+String.fromCharCode(62,60)+'/tr'+String.fromCharCode(62);\
			var e;\
			var objparent=obj.parentNode;\
			obj.setAttribute('onclick','ccr_unplacequoted(this,\\''+id+'\\');');\
			obj.setAttribute('onmouseover','');\
			try{\
				e= document.createElement('table');\
				e.innerHTML = temp;\
				e.style.border = 'dashed 1px black';\
				objparent.appendChild(e);\
				var temp2= new Array();\
				temp2= ccr_tempquoted(id);\
				objparent.getElementsByTagName('td')[0].innerHTML=temp2[0];\
				if(temp2[1]!=undefined) objparent.getElementsByTagName('td')[0].style.backgroundColor=temp2[1];\
				if(temp2[2]!=undefined) objparent.getElementsByTagName('td')[0].style.border=temp2[2];\
			}catch(e) {}\
	  }\
	  function ccr_unplacequoted(obj,id) {\
			obj.setAttribute('onclick','ccr_placequoted(this,\\''+id+'\\');');\
			obj.setAttribute('onmouseover','ccr_showquoted(\\''+id+'\\');');\
			var objparent=obj.parentNode;\
			var p= objparent.getElementsByTagName('table')[0];\
			objparent.removeChild(p);\
			}\
			function ccr_getMouseXY(e) {\
			cc_posX = e.pageX;\
			cc_posY = e.pageY;\
			cc_posYf = e.pageY-window.pageYOffset;\
			cc_nposYf = document.body.clientHeight-cc_posYf;\
			if(cc_beingDragged===true&&cc_dragId!='') {\
				var d=document.getElementById(cc_dragId);\
				if(cc_dragXOffset==-1)\
				cc_dragXOffset=cc_posX-ccr_getObjPosX(d);\
				d.style.left=cc_posX-cc_dragXOffset+'px';\
				d.style.top=cc_posYf-4+'px';\
			}\
	  }\
	  function ccr_getObjPosX(obj) {\
			var curleft = 0; var proceed=1; var obj2=obj;\
			if(obj.x)\
				curleft= obj.x;\
			else{\
				while(proceed==1) {\
				curleft += obj.offsetLeft;\
				if(obj.offsetParent==undefined||obj.offsetParent==null)\
					proceed=-1;\
				obj = obj.offsetParent;\
				}\
			}\
			if(curleft=='0') {\
				var temp= obj2.style.left;\
				if(!isNaN(parseInt(temp)))\
				curleft=parseInt(temp);\
			}\
			return curleft;\
	  }\
	  function ccr_dragBlock(id) {\
			cc_dragId=id; cc_beingDragged= true;\
	  }\
	  function ccr_releaseDrag() {\
			cc_dragId=''; cc_beingDragged= false; cc_dragXOffset=-1;\
	  }\
	  function ccr_handleKey(e) {\
	  	if(e.which) keycode=e.which;\
			else keycode = e.keyCode;\
			switch(keycode) {\
				case 27: ccr_togglePostArea(); break;\
				case 45: ccr_toggleTransform(); break;\
				default:\
			}\
	  }\
	  function ccr_togglePostArea() {\
			if(document.getElementById('cc-showpostarea-toggle').innerHTML=='Show') {\
				document.getElementById('cc-showpostarea-toggle').innerHTML='Hide';\
				if(cc_pfamode=='floater')\
				document.getElementById('cc-newpostarea').style.display='';\
				else \
				document.getElementById('cc-newpostarea2').style.display='';\
			}\
			else{\
				document.getElementById('cc-showpostarea-toggle').innerHTML='Show';\
				if(cc_pfamode=='floater')\
				document.getElementById('cc-newpostarea').style.display='none';\
				else \
				document.getElementById('cc-newpostarea2').style.display='none';\
			}\
	  }\
	  function ccr_showPostArea() {\
			if(document.getElementById('cc-showpostarea-toggle').innerHTML=='Show') {\
				ccr_togglePostArea();\
			}\
	  }\
	  function ccr_forceHidePostArea() {\
		  document.getElementById('cc-showpostarea-toggle').innerHTML='Show';\
		  document.getElementById('cc-newpostarea').style.display='none';\
		  document.getElementById('cc-newpostarea2').style.display='none';\
	  }\
	  function ccr_fieldsToggle() {\
			if(document.getElementById('cc-fields1').style.width=='" + table_width[0] + "px') {\
				if(cc_pfamode=='floater') {\
				document.post.upfile.size='" + field_size[3] + "';\
				document.post.com.style.width='" + field_size[5] + "px';\
				}\
				else{\
				document.post3.upfile3.size='" + field_size[3] + "';\
				document.post3.com3.style.width='" + field_size[5] + "px';\
				}\
				document.getElementById('cc-fields1').style.width='" + table_width[1] + "px';\
				document.getElementById('cc-fields2').style.width='" + table_width[2] + "px';\
				document.getElementById('cc-fields2').getElementsByTagName('table')[0].style.display='';\
				document.getElementById('togglefieldstxt').innerHTML='►';\
			}\
			else{\
				if(cc_pfamode=='floater') {\
				document.post.upfile.size='" + field_size[2] + "';\
				document.post.com.style.width='" + field_size[4] + "px';\
				}\
				else{\
				document.post3.upfile3.size='" + field_size[2] + "';\
				document.post3.com3.style.width='" + field_size[4] + "px';\
				}\
				document.getElementById('cc-fields1').style.width='" + table_width[0] + "px';\
				document.getElementById('cc-fields2').style.width='0px';\
				document.getElementById('cc-fields2').getElementsByTagName('table')[0].style.display='none';\
				document.getElementById('togglefieldstxt').innerHTML='◄';\
			}\
			if(document.getElementById('cc-fields2-2').getElementsByTagName('table')[0].style.display=='none') {\
				document.getElementById('cc-fields2-2').getElementsByTagName('table')[0].style.display='';\
				document.getElementById('cc-fields3-2').getElementsByTagName('table')[0].style.display='';\
				document.getElementById('togglefieldstxt2').innerHTML='►';\
			}\
			else{\
				document.getElementById('cc-fields2-2').getElementsByTagName('table')[0].style.display='none';\
				document.getElementById('cc-fields3-2').getElementsByTagName('table')[0].style.display='none';\
				document.getElementById('togglefieldstxt2').innerHTML='◄';\
			}\
	  }\
	  function ccr_prefToggle() {\
			if(document.getElementById('cc-prefbox').style.display=='none')\
				document.getElementById('cc-prefbox').style.display='';\
			else \
				document.getElementById('cc-prefbox').style.display='none';\
			}\
			function ccr_picsurlsToggle() {\
			if(document.getElementById('cc-picsurls-field').style.display=='none')\
				document.getElementById('cc-picsurls-field').style.display='';\
			else \
				document.getElementById('cc-picsurls-field').style.display='none';\
	  }\
	  function ccr_gotoToggle() {\
			var obj=document.getElementById('cc-newnav');\
			if(obj.style.display=='none') {\
				obj.style.left= cc_posX-210+'px';\
				obj.style.bottom= cc_nposYf+12+'px';\
				obj.style.display='block';\
			 obj.style.width='200px';\
			}\
			else{\
				obj.style.display='none';\
			}\
	  }\
	  function ccr_templatesMenuToggle() {\
			var obj=document.getElementById('cc-templatesmenu');\
			if(obj.style.display=='none') {\
				obj.style.left= cc_posX+12+'px';\
				obj.style.bottom= cc_nposYf+12+'px';\
				obj.style.display='';\
				if(cc_pfamode=='popup')\
				obj.style.bottom= parseInt(obj.style.bottom)-obj.clientHeight-24+'px';\
			}\
			else{\
				obj.style.display='none';\
			}\
	  }\
	  function ccr_postTemplate(i) {\
			var obj=document.getElementsByName('com')[0];\
			val=obj.value;\
			obj.value=val.substr(0,obj.selectionStart)+post_templates[i][1]+val.substr(obj.selectionEnd);\
			ccr_templatesMenuToggle();\
			document.getElementsByName('com')[0].focus();\
	  }\
	  function ccr_quote(id) {\
			var txt= ccr_getSelText('quoteclick');\
			var val= document.getElementsByName('com')[0].value;\
			var obj= document.getElementsByName('com')[0];\
			var s1= obj.selectionStart;\
			temp= val.substr(0,s1)+'>>'+id+'\\n'+val.substr(obj.selectionEnd);\
			obj.value= temp;\
			if(navigator.userAgent.indexOf('WebKit')>-1) obj.setSelectionRange(s1+temp.length,s1+temp.length);\
			if(txt!='') {\
				var obj2=document.getElementsByName('com')[0];\
				val=obj2.value;\
				s1= obj2.selectionStart;\
				temp=val.substr(0,s1)+'>'+txt+'\\n'+val.substr(obj2.selectionEnd);\
				obj2.value= temp;\
				if(navigator.userAgent.indexOf('WebKit')>-1) obj2.setSelectionRange(s1+temp.length,s1+temp.length);\
			}\
			obj.focus();\
	  }\
	  function ccr_quoteInBoard(thread_id,id) {\
			var obj= document.getElementsByName('com')[0];\
			if(obj.value.indexOf('Thread::'+thread_id)<0) {\
				obj.value= 'Thread::'+thread_id+'\\n';\
				if(navigator.userAgent.indexOf('WebKit')>-1) obj.setSelectionRange(obj.value.length,obj.value.length);\
			}\
			ccr_quote(id);\
			}\
			function ccr_spoiler() {\
			var obj=document.getElementsByName('com')[0];\
			var val=obj.value;\
			obj.value=val.substr(0,obj.selectionStart)+'[spoiler]'+val.substr(obj.selectionStart,obj.selectionEnd-obj.selectionStart)+'[/spoiler]'+val.substr(obj.selectionEnd);\
			obj.focus();\
	  }\
	  function ccr_getSelText(mode) {\
			var txt = '';\
			if (window.getSelection) {\
				txt = window.getSelection();\
			}\
			else if (document.getSelection) {\
				txt = document.getSelection();\
			}\
			else if (document.selection) {\
				txt = document.selection.createRange().text;\
			}\
			else return;\
			if(txt!=''&&mode=='') {\
				var obj=document.getElementsByName('com')[0];\
				var val=obj.value;\
				var s1= obj.selectionStart;\
				var temp=val.substr(0,obj.s1)+'>'+txt+'\\n'+val.substr(obj.selectionEnd);\
				if(navigator.userAgent.indexOf('WebKit')>-1) obj.setSelectionRange(s1+temp.length,s1+temp.length);\
				obj.value= temp;\
				obj.focus();\
			}\
			else if(mode=='quoteclick') {\
				return txt;\
			}\
		}\
		function toggleCommentField() {\
			if(document.getElementById('cc-commentfieldtoggle').innerHTML=='[Expand]') {\
				document.getElementById('cc-commentfieldtoggle').innerHTML='[Shrink]';\
				document.post.com.rows='16';\
			}\
			else{\
				document.getElementById('cc-commentfieldtoggle').innerHTML='[Expand]';\
				document.post.com.rows='4';\
			}\
		}\
	  function ccr_toggleTransform() {\
			if(cc_pfamode=='floater')\
				ccr_transformToPopUp();\
			else \
				ccr_transformToFloater();\
			ccr_showPostArea();\
	  }\
		function toggleRecaptchaIds() {\
			var ids = ['recaptcha_image', 'recaptcha_reload_btn', 'recaptcha_reload', 'recaptcha_switch_audio_btn', 'recaptcha_switch_audio', 'recaptcha_switch_img_btn', 'recaptcha_switch_img', 'recaptcha_whatsthis_btn', 'recaptcha_whatsthis', 'recaptcha_challenge_field_holder'];\
			for(var i = 0; i < ids.length; i++) {\
				document.getElementById(ids[i]).setAttribute('id', ids[i] + '3');\
				document.getElementById(ids[i] + '2').setAttribute('id', ids[i]);\
				document.getElementById(ids[i] + '3').setAttribute('id', ids[i] + '2');\
			}\
		}\
	  function ccr_transformToPopUp() {\
			ccr_forceHidePostArea();\
			toggleRecaptchaIds();\
			var form= document.getElementById('post');\
			var form2= document.getElementById('post2');\
			for(var i=0; form.getElementsByTagName('input')[i]!=undefined; i++) {\
						var elemA = form.getElementsByTagName('input')[i];\
						var elemB = form2.getElementsByTagName('input')[i];\
				if(elemA.type != 'submit' && elemA.id != 'cci-newthread-floater') {\
				elemA.name = elemA.name+'3';\
				elemB.name = elemB.name.substr(0,elemB.name.length-1);\
				if(elemA.type != 'file')\
					elemB.value = elemA.value;\
				}\
			}\
			form.getElementsByTagName('textarea')[0].name= form.getElementsByTagName('textarea')[0].name+'3';\
			form2.getElementsByTagName('textarea')[0].name= form2.getElementsByTagName('textarea')[0].name.substr(0,form2.getElementsByTagName('textarea')[0].name.length-1);\
			form2.getElementsByTagName('textarea')[0].value= form.getElementsByTagName('textarea')[0].value;\
			form.setAttribute('name',form.getAttribute('name')+'3');\
			form2.setAttribute('name',form2.getAttribute('name').substr(0,form2.getAttribute('name').length-1));\
			form.setAttribute('id',form.getAttribute('id')+'3');\
			form2.setAttribute('id',form2.getAttribute('id').substr(0,form2.getAttribute('id').length-1));\
			cc_pfamode='popup';\
	  }\
	  function ccr_transformToFloater() {\
			ccr_forceHidePostArea();\
			toggleRecaptchaIds();\
			var form= document.getElementById('post3');\
			var form2= document.getElementById('post');\
			for(var i=0; form2.getElementsByTagName('input')[i]!=undefined; i++) {\
						var elemA = form2.getElementsByTagName('input')[i];\
						var elemB = form.getElementsByTagName('input')[i];\
				if(elemA.type != 'submit' && elemA.id != 'cci-newthread-popup') {\
				elemA.name = elemA.name+'2';\
				elemB.name = elemB.name.substr(0,elemB.name.length-1);\
				if(elemA.type != 'file')\
					elemB.value = elemA.value;\
				}\
			}\
			form2.getElementsByTagName('textarea')[0].name= form2.getElementsByTagName('textarea')[0].name+'2';\
			form.getElementsByTagName('textarea')[0].name= form.getElementsByTagName('textarea')[0].name.substr(0,form.getElementsByTagName('textarea')[0].name.length-1);\
			form.getElementsByTagName('textarea')[0].value= form2.getElementsByTagName('textarea')[0].value;\
			form2.setAttribute('name',form2.getAttribute('name')+'2');\
			form.setAttribute('name',form.getAttribute('name').substr(0,form.getAttribute('name').length-1));\
			form2.setAttribute('id',form2.getAttribute('id')+'2');\
			form.setAttribute('id',form.getAttribute('id').substr(0,form.getAttribute('id').length-1));\
			cc_pfamode='floater';\
	  }\
	  function ccr_submitForm(isthread) {\
			var formobj= document.getElementById('post');\
			var obj= formobj.getElementsByTagName('textarea')[0];\
			var id;\
			var proceed=1;\
					var xx_id = cc_pfamode == 'floater' ? 'cci-newthread-floater' : 'cci-newthread-popup';\
			if(document.getElementById(xx_id).checked) {\
				if(document.getElementsByName('resto')[0]!=undefined) {\
				document.getElementsByName('resto')[0].parentNode.removeChild(document.getElementsByName('resto')[0]);\
				}\
			}\
			else if(!isthread&&obj.value.replace(/\\r/g,'').search(/(Thread::)[0-9]+(\\n)/i)===0) {\
				id= obj.value.substr(8,obj.value.indexOf('\\n')-8);\
				id= parseInt(id)+'';\
				obj.value= obj.value.substr(obj.value.indexOf('\\n')+1);\
				var e= document.createElement('input');\
				e.type= 'hidden';\
				e.name= 'resto';\
				e.value= id;\
				formobj.appendChild(e);\
			}\
			else if(!isthread) {\
				alert('No thread id supplied'); proceed=0;\
			}\
			else{\
				if(document.getElementsByName('resto')[0].value=='') {\
				alert('It seems there is a bug. Moot might have changed 4chan\\'s source again. Disable ChanChimp for the mean time and report this bug.'); proceed=0;\
				}\
			}\
			if(proceed==1) {\
				formobj.submit();\
			}\
	  }\
	  function ccr_pfafocus(num) {\
			cc_pfafocus++;\
			if(cc_pfafocus>2) cc_pfafocus=2;\
			var obj;\
			if(num==1) obj= document.getElementById('cc-newpostarea'); else obj= document.getElementById('cc-newpostarea2');\
			obj.style.opacity='1.00';\
	  }\
	  function ccr_pfablur(num) {\
			cc_pfafocus--;\
			if(cc_pfafocus<0) cc_pfafocus=0;\
			var obj;\
			if(num==1) obj= document.getElementById('cc-newpostarea'); else obj= document.getElementById('cc-newpostarea2');\
			if(cc_pfafocus==0) obj.style.opacity='" + GM_getValue('cci_onmouseout_opacity', '1.00') + "';\
	  }\
	  var post_templates= new Array(\
		" + temp2 + "\
	  );\
	  var cc_posX, cc_posY, cc_posYf, cc_nposYf, cc_obj, cc_dragId;\
	  var cc_dragXOffset=-1;\
	  var cc_beingDragged= false;\
	  var cc_pfamode= 'floater';\
	  var cc_pfafocus= 0;\
	  document.onmousemove = ccr_getMouseXY;\
	  document.onkeydown = ccr_handleKey;\
	";
		e.innerHTML = temp;
		head.appendChild(e);
	} catch (e) {}

	try {
		e = document.createElement('style');
		temp = "\
	  #cc-newpostarea a, #cc-newnav a, #cc-showpostarea a {color: #1142AA;}\
	  #cc-newpostarea a:hover, #cc-newnav a:hover, #cc-showpostarea a:hover {color: red;}\
	";
		e.innerHTML = temp;
		head.appendChild(e);
	} catch (e) {}

	if (1) {
		try {
			e = document.createElement('div');
			e.id = 'cc-showpostarea';
			e.style.width = '50px;';
			e.style.display = 'block';
			e.style.position = 'fixed';
			e.style.right = '0px';
			e.style.bottom = '0px';
			e.style.backgroundColor = colorscheme[1];
			e.style.border = 'solid 1px ' + colorscheme[0];
			e.style.padding = '2px';
			e.style.zIndex = '10';
			e.innerHTML = (cond_isthread && GM_getValue('cci_autothread', false) === true ? '<a id="cci-resetjump" href="javascript: void 0;" style="text-decoration: none;">Reset</a> | <a id="cci-jumptolast" href="javascript: void 0;" style="text-decoration: none;">Jump</a> | ' : '') + '<a id="cc-showpostarea-toggle" style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_togglePostArea();">Show</a>' + (web.isNoneOfThese(['4chanarchive']) ? ' | <a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_toggleTransform();">◆</a>' : '');
			body.appendChild(e);
			e.setAttribute('class', 'chanchimp');
		} catch (e) {}
	}

	if (cond_isthread && GM_getValue('cci_autothread', false) === true) {
		document.getElementById('cci-jumptolast').addEventListener('click', jumptolast, false);
		document.getElementById('cci-resetjump').addEventListener('click', resetjump, false);
	}

	var thread_id, form1_action, board;
	temp = '';
	if (web.isNoneOfThese(['4chanarchive'])) {
		form1_action = document.getElementsByTagName('form')[0].action;
		recaptchaUri = recaptchaUriGet();
		recaptchaChallenge = recaptchaChallengeGet();
		document.getElementsByTagName('form')[0].parentNode.innerHTML = '';
		if (cond_isthread) thread_id = parseInt(uri.substr(uri.indexOf('res/') + 4));
		board = uri.substr(uri.indexOf('4chan.org/') + 10, uri.indexOf('/', uri.indexOf('4chan.org/') + 10) - (uri.indexOf('4chan.org/') + 10));
		temp = '\
	<div style="width: 100%; font-size: 4px; background-color: ' + colorscheme[0] + ';">&nbsp;</div>\
	<div style="padding: 4px; width: 100%;">\
	<form name=post id="post" action="' + form1_action + '" method="POST" enctype="multipart/form-data" target="">\
	  <input type=hidden name="MAX_FILE_SIZE" value="3145728">\
	  ' + (cond_isthread ? '<input type=hidden name=resto value="' + thread_id + '">' : '') + '\
	  <input type=hidden name=mode value="regist">\
	  <table id="cci-form-container" style="width: 100%; display: ;"><tr>\
		<td id="cc-fields2" style="width: 0px;">\
		  <table style="cell-spacing: 2px; display: none;">\
			<tr><td><b>Subject:</b></td><td><input class=inputtext type=text name=sub style="width: ' + field_size[0] + 'px" onfocus="ccr_pfafocus(1);" onblur="ccr_pfablur(1);"></td></tr>\
			<tr><td><b>Name:</b></td><td><input class=inputtext type=text name=name style="width: ' + field_size[0] + 'px" onfocus="ccr_pfafocus(1);" onblur="ccr_pfablur(1);"></td></tr>\
			<tr><td><b>Email:</b></td><td><input class=inputtext type=text name=email style="width: ' + field_size[0] + 'px" onfocus="ccr_pfafocus(1);" onblur="ccr_pfablur(1);"></td></tr>\
			<tr><td><b>Password:</b></td><td><input class=inputtext type=password name="pwd" style="width: ' + field_size[1] + 'px" maxlength=8 value="" onfocus="ccr_pfafocus(1);" onblur="ccr_pfablur(1);"> [<label><input type=checkbox name=spoiler value=on>Spoiler Image?</label>]</td></tr>\
		  </table>\
		</td><td id="cc-fields1" style="width: ' + table_width[0] + 'px;">\
			<a href="javascript: void 0;" onclick="ccr_fieldsToggle();" id="togglefieldstxt" style="text-decoration: none;">◄</a> \
			<b>File:</b><input type=file name=upfile size=' + field_size[2] + '> <input type=button value="Submit" onclick="ccr_submitForm(' + cond_isthread + ');"> <input type=button value="Noko" onclick="document.post.email.value=\'noko\'; ccr_submitForm(' + cond_isthread + ');"> <input type=button value="Sage" onclick="document.post.email.value=\'sage\'; ccr_submitForm(' + cond_isthread + ');">\
			<br /><b>Comment:</b> <a href="javascript: void 0;" style="text-decoration: none;" onclick="ccr_templatesMenuToggle();">[Shortcuts]</a> <a href="javascript: void 0;" style="text-decoration: none;" onclick="ccr_spoiler();">[Spoiler]</a> <a href="javascript: void 0;" style="text-decoration: none;" onclick="ccr_getSelText(\'\');">[Selected]</a> <a href="javascript: void 0;" style="text-decoration: none;" onclick="document.getElementsByName(\'com\')[0].value=\'\'; document.getElementsByName(\'com\')[0].focus();">[Reset]</a> <input type="checkbox" id="cci-newthread-floater"> New thread\
			<br /><textarea class=inputtext name=com style="width: ' + field_size[4] + 'px" rows="4" wrap=soft onfocus="ccr_pfafocus(1);" onblur="ccr_pfablur(1);"></textarea>\
			<br /><div id="recaptcha_image" style="float: left; margin: 1em 0.5em 1em 0pt;"><img src="' + recaptchaUri + '" style="float: left;"/></div>\
			<div style="float: left; margin: 1.3em 1em 0pt 0pt;">\
				<a id="recaptcha_reload_btn" href="javascript:Recaptcha.reload ();" title="Get a new challenge"><img style="border: 0px none; display: block; margin: 0pt;" width="25" height="18" alt="Get a new challenge" id="recaptcha_reload" src="http://www.google.com/recaptcha/api/img/clean/refresh.png"></a>\
				<a class="recaptcha_only_if_image" id="recaptcha_switch_audio_btn" href="javascript:Recaptcha.switch_type("audio");" title="Get an audio challenge"><img style="border: 0px none; display: block; margin: 0pt;" width="25" height="15" alt="Get an audio challenge" id="recaptcha_switch_audio" src="http://www.google.com/recaptcha/api/img/clean/audio.png"></a>\
				<a style="display: none;" class="recaptcha_only_if_audio" id="recaptcha_switch_img_btn" href="javascript:Recaptcha.switch_type("image");" title="Get a visual challenge"><img style="border: 0px none; display: block; margin: 0pt;" width="25" height="15" alt="Get a visual challenge" id="recaptcha_switch_img" src="http://www.google.com/recaptcha/api/img/clean/text.png"></a>\
				<a id="recaptcha_whatsthis_btn" href="http://recaptcha.net/popuphelp/" target="_blank" title="Help"><img style="border: 0px none; display: block; margin: 0pt;" width="25" height="16" id="recaptcha_whatsthis" src="http://www.google.com/recaptcha/api/img/clean/help.png" alt="Help"></a>\
			</div>\
			<span style="float: left; margin-left: 1em; margin-top: 1em; text-align: center;">Verification<br /><input type="text" name="recaptcha_response_field" onkeypress="if(event.keyCode==13) ccr_submitForm(true);" /></span><span id="recaptcha_challenge_field_holder"><input type="hidden" value="' + recaptchaChallenge + '" name="recaptcha_challenge_field" /></span>\
		</td><td style="vertical-align: top;">\
		  <table><tr>\
		  <td>\
			<p><a style="text-decoration: none;" href="javascript: void 0;" onclick="window.scrollTo(0,0);" title="Go to top">▲</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="window.scrollTo(0,1000000);" title="Go to bottom">▼</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_gotoToggle();">GoTo</a>\
			' + (cond_isthread ? '<br />All images: <a style="text-decoration: none;" target="_blank" href="' + document.location.href + '?&chanchimp=on&ccr_n=30&ccr_p=1">View</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_picsurlsToggle();">Links</a>' : '') + '\
			' + (cond_isthread ? '<br /><a style="text-decoration: none;" target="_blank" href="http://4chanarchive.org/brchive/main.php?mode=submit&ccr_id=' + thread_id + '&ccr_board=' + board + '">Submit to 4chanarchive</a>' : '') + '\
			<br /><a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_prefToggle();">Preferences</a>\
			<p><b><a id="updatetext" style="text-decoration: none;" href="http://userscripts.org/scripts/show/86310">ChanChimp Revived</a></b>\
			</td>\
		  <td>\
			<table id="cc-newnav2_t" style="display: none; width: 200px; padding-left: 5px;"><tr><td id="cc-newnav2">\
			</td></tr></table>\
		  </td>\
		  </tr><table>\
		</td>\
	  </tr></table>\
	</form>\
	</div>\
	';
	}
	else if (web.isOneOfThese(['4chanarchive'])) {
		temp = '\
	<div style="padding: 4px; width: 100%; border-top: solid 2px ' + colorscheme[0] + ';">\
	  <a style="text-decoration: none;" href="javascript: void 0;" onclick="window.scrollTo(0,0);" title="Go to top">▲</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="window.scrollTo(0,1000000);" title="Go to bottom">▼</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="cc_obj=document.getElementById(\'cc-newnav\'); if(cc_obj.style.display==\'none\') { cc_obj.style.left= cc_posX+\'px\'; cc_obj.style.top= cc_posYf-130+\'px\'; cc_obj.style.display=\'block\'; cc_obj.style.width=\'200px\';} else{ cc_obj.style.display=\'none\';}">GoTo</a> \
	  ' + (cond_isthread ? '| (All images: <a style="text-decoration: none;" target="_blank" href="' + document.location.href + '?&chanchimp=on&ccr_n=30&ccr_p=1">View</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_picsurlsToggle();">Links</a>)' : '') + '\
	  | <a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_prefToggle();">Preferences</a>\
	  | <b><a id="updatetext" style="text-decoration: none;" href="http://userscripts.org/scripts/show/86310">ChanChimp Revived</a></b> | <small> <a style="text-decoration: none;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=10158704">Donate</a> </small>\
	</div>\
	';
	}
	try {
		e = document.createElement('div');
		e.id = 'cc-newpostarea';
		e.style.position = 'fixed';
		e.style.width = '100%';
		e.style.height = (web.isOneOfThese(['4chanarchive']) ? '30px' : '220px');
		e.style.left = '0px';
		e.style.bottom = '0px';
		e.style.display = 'none';
		e.style.backgroundColor = colorscheme[1];
		e.style.color = 'black';
		e.style.padding = '0px';
		if (web.isOneOfThese(['4chan'])) e.style.opacity = GM_getValue('cci_onmouseout_opacity', '1.00');
		e.innerHTML = temp;
		body.appendChild(e);
		e.setAttribute('class', 'chanchimp');
		if (web.isOneOfThese(['4chan'])) {
			e.setAttribute('onmouseover', 'ccr_pfafocus(1)');
			e.setAttribute('onmouseout', 'ccr_pfablur(1)');
		}
	} catch (e) {}

	if (web.isNoneOfThese(['4chanarchive'])) {
		temp = '\
	<div id="cc-dragpopup" style="width: 100%; font-size: 8px; background-color: ' + colorscheme[0] + '; cursor: move;" onmousedown="ccr_dragBlock(\'cc-newpostarea2\');" onmouseup="ccr_releaseDrag();">\
	  <a href="javascript: void 0;" onclick="ccr_fieldsToggle();" id="togglefieldstxt2" style="text-decoration: none; color: white;">◄</a>&nbsp;&nbsp;\
	  <a href="javascript: void 0;" onclick="ccr_togglePostArea();" style="text-decoration: none; color: white;"><b>—</b></a> \
	</div>\
	<div style="padding: 4px; width: 100%;">\
	<form name=post2 id="post2" action="' + form1_action + '" method="POST" enctype="multipart/form-data" target="" style="display: inline;">\
	  <input type=hidden name="MAX_FILE_SIZE2" value="3145728">\
	  ' + (cond_isthread ? '<input type=hidden name=resto2 value="' + thread_id + '">' : '') + '\
	  <input type=hidden name=mode2 value="regist">\
	  <table id="cci-form-container2" style="width: 600px; display: ;">\
	  <tr>\
		<td id="cc-fields2-2">\
		  <table style="cell-spacing: 2px; display: none;">\
			<tr><td><b>Subject:</b></td><td><input class=inputtext type=text name=sub2 style="width: ' + field_size[0] + 'px" onfocus="ccr_pfafocus(2);" onblur="ccr_pfablur(2);"></td></tr>\
			<tr><td><b>Name:</b></td><td><input class=inputtext type=text name=name2 style="width: ' + field_size[0] + 'px" onfocus="ccr_pfafocus(2);" onblur="ccr_pfablur(2);"></td></tr>\
		  </table>\
		</td>\
		<td id="cc-fields3-2">\
		  <table style="cell-spacing: 2px; display: none;">\
			<tr><td><b>Email:</b></td><td><input class=inputtext type=text name=email2 style="width: ' + field_size[0] + 'px" onfocus="ccr_pfafocus(2);" onblur="ccr_pfablur(2);"></td></tr>\
			<tr><td><b>Password:</b></td><td><input class=inputtext type=password name="pwd2" style="width: ' + field_size[1] + 'px" maxlength=8 value="" onfocus="ccr_pfafocus(2);" onblur="ccr_pfablur(2);"> [<label><input type=checkbox name=spoiler value=on>Spoiler Image?</label>]</td></tr>\
		  </table>\
		</td>\
	  </tr>\
	  <tr>\
		<td id="cc-fields1-2" style="width: ' + table_width[0] + 'px;" colspan=2>\
			<b>File:</b><input type=file name=upfile2 size=' + field_size[2] + '> <input type=button value="Submit" onclick="ccr_submitForm(' + cond_isthread + ');"> <input type=button value="Noko" onclick="document.post.email.value=\'noko\'; ccr_submitForm(' + cond_isthread + ');"> <input type=button value="Sage" onclick="document.post.email.value=\'sage\'; ccr_submitForm(' + cond_isthread + ');">\
			<br /><b>Comment:</b> <a href="javascript: void 0;" style="text-decoration: none;" onclick="ccr_templatesMenuToggle();">[Shortcuts]</a> <a href="javascript: void 0;" style="text-decoration: none;" onclick="ccr_spoiler();">[Spoiler]</a> <a href="javascript: void 0;" style="text-decoration: none;" onclick="ccr_getSelText(\'\');">[Selected]</a> <a href="javascript: void 0;" style="text-decoration: none;" onclick="document.getElementsByName(\'com\')[0].value=\'\'; document.getElementsByName(\'com\')[0].focus();">[Reset]</a> <a id="cc-commentfieldtoggle" href="javascript: void 0;" style="text-decoration: none;" onclick="toggleCommentField();">[Expand]</a> <input type="checkbox" id="cci-newthread-popup"> New Thread\
			<br /><textarea class=inputtext name=com2 rows="4" wrap=soft style="width: 575px;" onfocus="ccr_pfafocus(2);" onblur="ccr_pfablur(2);"></textarea>\
			<br /><div id="recaptcha_image2" style="float: left; margin: 1em 0.5em 1em 0pt;"><img src="' + recaptchaUri + '" /></div>\
			<div style="float: left; margin: 1.3em 1em 0pt 0pt;">\
				<a id="recaptcha_reload_btn2" href="javascript:Recaptcha.reload ();" title="Get a new challenge"><img style="border: 0px none; display: block; margin: 0;" width="25" height="18" alt="Get a new challenge" id="recaptcha_reload2" src="http://www.google.com/recaptcha/api/img/clean/refresh.png"></a>\
				<a class="recaptcha_only_if_image" id="recaptcha_switch_audio_btn2" href="javascript:Recaptcha.switch_type("audio");" title="Get an audio challenge"><img style="border: 0px none; display: block; margin: 0;" width="25" height="15" alt="Get an audio challenge" id="recaptcha_switch_audio2" src="http://www.google.com/recaptcha/api/img/clean/audio.png"></a>\
				<a style="display: none" class="recaptcha_only_if_audio" id="recaptcha_switch_img_btn2" href="javascript:Recaptcha.switch_type("image");" title="Get a visual challenge"><img style="border: 0px none; display: block; margin: 0;" width="25" height="15" alt="Get a visual challenge" id="recaptcha_switch_img2" src="http://www.google.com/recaptcha/api/img/clean/text.png"></a>\
				<a id="recaptcha_whatsthis_btn2" href="http://recaptcha.net/popuphelp/" target="_blank" title="Help"><img style="border: 0px none; display: block; margin: 0;" width="25" height="16" id="recaptcha_whatsthis2" src="http://www.google.com/recaptcha/api/img/clean/help.png" alt="Help"></a>\
			</div>\
			<br /><b>Verification: </b><input type="text" name="recaptcha_response_field2" onkeypress="if(event.keyCode==13) ccr_submitForm(true);" /><span id="recaptcha_challenge_field_holder2"><input type="hidden" value="' + recaptchaChallenge + '" name="recaptcha_challenge_field2" /></span>\
		</td>\
	  </tr>\
	  <tr>\
		<td style="vertical-align: top;" colspan=2>\
			<a style="text-decoration: none;" href="javascript: void 0;" onclick="window.scrollTo(0,0);" title="Go to top">▲</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="window.scrollTo(0,1000000);" title="Go to bottom">▼</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_gotoToggle();">GoTo</a>\
			' + (cond_isthread ? '| (All images: <a style="text-decoration: none;" target="_blank" href="' + document.location.href + '?&chanchimp=on&ccr_n=30&ccr_p=1">View</a> | <a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_picsurlsToggle();">Links</a>)' : '') + '\
			' + (cond_isthread ? '| <a style="text-decoration: none;" target="_blank" href="http://4chanarchive.org/brchive/main.php?mode=submit&ccr_id=' + thread_id + '&ccr_board=' + board + '">Submit to 4chanarchive</a>' : '') + '\
			| <a style="text-decoration: none;" href="javascript: void 0;" onclick="ccr_prefToggle();">Preferences</a>\
			| <b><a id="updatetext" style="text-decoration: none;" href="http://userscripts.org/scripts/show/86310">ChanChimp Revived</a></b>\
		</td>\
	  </tr>\
	  </table>\
	</form>\
	</div>\
	';
		try {
			e = document.createElement('div');
			e.id = 'cc-newpostarea2';
			e.style.position = 'fixed';
			e.style.width = '600px';
			e.style.left = GM_getValue('cc_popupx', 500) + 'px';
			e.style.top = GM_getValue('cc_popupy', 100) + 'px';
			e.style.display = 'none';
			e.style.backgroundColor = colorscheme[1];
			e.style.border = 'solid 3px ' + colorscheme[0];
			e.style.MozBorderRadius = '5px';
			e.style.WebkitBorderRadius = '5px';
			e.style.color = 'black';
			e.style.padding = '0px';
			e.style.opacity = GM_getValue('cci_onmouseout_opacity', '1.00');
			e.innerHTML = temp;
			body.appendChild(e);
			e.setAttribute('class', 'chanchimp');
			e.setAttribute('onmouseover', 'ccr_pfafocus(2)');
			e.setAttribute('onmouseout', 'ccr_pfablur(2)');
		} catch (e) {}
		document.getElementById('cc-dragpopup').addEventListener('mouseup', savePopUpPosition, false);
	}

	//new nav
	try {
		e = document.createElement('div');
		e.id = 'cc-newnav';
		e.style.position = 'fixed';
		e.style.left = '0px';
		e.style.bottom = '0px';
		e.style.display = 'none';
		e.style.backgroundColor = colorscheme[2];
		e.style.border = 'solid ' + colorscheme[0] + ' 1px';
		e.style.width = '200px';
		e.style.MozBorderRadius = '5px';
		e.style.WebkitBorderRadius = '5px';
		e.style.padding = '5px';
		e.style.zIndex = '3';
		e.innerHTML = document.getElementById('navtop').innerHTML;
		body.appendChild(e);
		e.setAttribute('class', 'chanchimp');
	} catch (e) {}

	//templates menu
	try {
		e = document.createElement('div');
		e.id = 'cc-templatesmenu';
		e.style.position = 'fixed';
		e.style.left = '0px';
		e.style.bottom = '0px';
		e.style.display = 'none';
		e.style.backgroundColor = colorscheme[2];
		e.style.border = 'solid ' + colorscheme[0] + ' 1px';
		e.style.minWidth = '200px';
		e.style.maxWidth = '400px';
		e.style.MozBorderRadius = '5px';
		e.style.WebkitBorderRadius = '5px';
		e.style.padding = '5px';
		e.style.zIndex = '3';
		temp = "";
		for (i = 0; i < post_templates.length; i += 2)
		temp += '<div onclick="ccr_postTemplate(' + i / 2 + ');" style="cursor: pointer;" onmouseover="this.style.backgroundColor= \'' + colorscheme[0] + '\';" onmouseout="this.style.backgroundColor= \'\';">' + post_templates[i] + '</div>';
		e.innerHTML = temp;
		body.appendChild(e);
		e.setAttribute('class', 'chanchimp');
	} catch (e) {}

	if (cond_isthread) {
		//autothreading
		if (GM_getValue('cci_autothread', false) === true) {
			var repliesdiv;
			if (document.body.querySelectorAll('div[class~="4chan_ext_thread_replies"]')[0] == undefined) {
				if (web.isOneOfThese(['4chan'])) tempobj = document.getElementsByName('delform')[0]; // if 4chan
				else if (web.isOneOfThese(['4chanarchive'])) tempobj = document.getElementsByTagName('body')[0]; // if 4chanarchive
				temp = tempobj.innerHTML;
				pos1 = temp.toLowerCase().indexOf('</blockquote>') + 13;
				pos2 = temp.toLowerCase().indexOf('<br clear="left">');
				if (web.isOneOfThese(['4chanarchive'])) pos2 = temp.toLowerCase().indexOf('<hr><center>');
				temp = temp.substr(0, pos1) + '<div id="4chan_thread_replies">' + temp.substr(pos1, pos2 - pos1) + '</div>' + temp.substr(pos2);
				tempobj.innerHTML = temp;
				repliesdiv = document.getElementById('4chan_thread_replies');
			} else {
				repliesdiv = document.body.querySelectorAll('div[class~="4chan_ext_thread_replies"]')[0]; //4chan extension element
			}
			var replies_a = new Array();
			replies_a = repliesdiv.getElementsByTagName('a');
			var replies_al = replies_a.length;
			for (i = 0; i < replies_al; i++) { //remove <a> tags
				if (replies_a[i] != undefined && replies_a[i].parentNode == repliesdiv) repliesdiv.removeChild(replies_a[i]);
			}
			repliesdiv.setAttribute('style', 'clear: both;');
			var postarray_t_ids = new Array();
			for (i = 0; i < rl; i++) {
				postarray_t_ids[i] = postarray_t[i].id;
			}
			var last_id = postarray_t_ids.length - 1;
			var currentlast_id = last_id;
			for (i = 0; i < rl; i++) {
				if (checkSinglequote(postarray_t_ids[i])) movePost(postarray_t_ids[i]);
			}
			if (web.isNoneOfThese(['4chanarchive'])) {
				for (i = 0; i < rl; i++) { //return <a> tags
					e = document.createElement('a');
					e.name = repliesdiv.getElementsByTagName('table')[i].getElementsByTagName('td')[1].id;
					repliesdiv.insertBefore(e, repliesdiv.getElementsByTagName('table')[i]);
				}
			}
		}

		//quotelinks actions
		var quotenums = document.body.querySelectorAll('a.quotejs');
		var quotelinks = document.body.querySelectorAll('a.quotelink');
		addQuoteFeatures(quotenums, quotelinks);

		//get all image urls
		var picsurls = new Array();
		picsurls[0] = document.body.querySelectorAll('span.filesize')[0].getElementsByTagName('a')[0].href; //op image
		j = 1;
		for (i = 0; i < rl; i++) {
			if (postarray[i].querySelectorAll('span.filesize')[0] != undefined && postarray[i].querySelectorAll('span.filesize')[0].getElementsByTagName('a')[0] != undefined && postarray[i].querySelectorAll('span.filesize')[0].getElementsByTagName('a')[0].href != '') picsurls[j++] = postarray[i].querySelectorAll('span.filesize')[0].getElementsByTagName('a')[0].href;
		}
		temp = '<div><div style="float: left;"><b>Image URLs:</b></div><div style="float: right"><a style="text-decoration: none;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=10158704" target="_blank">Donate</a> | <a style="text-decoration: none;" href="javascript: void 0;"  onclick="ccr_picsurlsToggle();">Close</a></div><div style="clear: both;"></div></div><textarea style="width:580px; height: 350px;" wrap="off">';
		l = picsurls.length;
		for (i = 0; i < l; i++) {
			temp += picsurls[i] + "\n";
		}
		temp += "</textarea>";
		try {
			e = document.createElement('div');
			e.id = 'cc-picsurls-field';
			e.style.position = 'fixed';
			e.style.top = '80px';
			e.style.right = '50px';
			e.style.display = 'none';
			e.style.backgroundColor = colorscheme[2];
			e.style.padding = '10px';
			e.style.MozBorderRadius = '5px';
			e.style.WebkitBorderRadius = '5px';
			e.style.border = 'solid 3px ' + colorscheme[0];
			e.style.zIndex = '10';
			e.innerHTML = temp;
			body.appendChild(e);
			e.setAttribute('class', 'chanchimp');
		} catch (e) {}

		temp = '<tr><td id="cc-quotedcontainer" class="replyhl" style=""></td></tr>';
		try {
			e = document.createElement('table');
			e.id = 'cc-quotedcontainer_t';
			e.style.position = 'fixed';
			e.style.left = '0px';
			e.style.top = '0px';
			e.style.display = 'none';
			e.style.maxWidth = '700px';
			e.innerHTML = temp;
			body.appendChild(e);
		} catch (e) {}
	} // end if of cond_isthread
	if (cond_isboard && web.isNoneOfThese(['4chanarchive'])) {
		var quotenums = document.body.querySelectorAll('a.quotejs');
		l = quotenums.length;
		for (i = 0; i < l; i++) {
			if (parseInt(quotenums[i].innerHTML) > 100) {
				temp = quotenums[i].parentNode.getAttribute('id');
				temp = temp.substr(temp.length - 9);
				quotenums[i].setAttribute('href', 'javascript: void 0;');
				quotenums[i].setAttribute('onclick', 'ccr_showPostArea(); ccr_quoteInBoard(\'' + temp + '\',\'' + quotenums[i].innerHTML + '\');');
				quotenums[i].innerHTML = temp;
			}
		}
	}

	temp = '\
	<div style="width: 700px; padding: 10px; background-color: ' + colorscheme[2] + '; color: black; border: solid 3px ' + colorscheme[0] + '; -moz-border-radius: 5px; -webkit-border-radius: 5px;">\
	 <div style="border-bottom: solid 1px ' + colorscheme[0] + '; padding-bottom: 3px;">\
		<div style="float: left;"><b>Preferences</b></div>\
		<div style="float: right;"><a style="text-decoration: none;" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=10158704" target="_blank">Donate</a> | <a style="text-decoration: none;" href="javascript: void 0;"  onclick="ccr_prefToggle();">Close</a></div>\
		<div style="clear: both;"></div>\
	  </div>\
	  <form style="display: inline;">\
		<div style="max-height: 350px; overflow: auto;">\
		  <input type="checkbox" id="cci-postarea-hidden" ' + checkboxChecked(GM_getValue('cci_postarea_hidden', true)) + ' /> Initially hide the form area\
		  <br /><input type="checkbox" id="cci-postarea-popup" ' + checkboxChecked(GM_getValue('cci_postarea_popup', false)) + ' /> Use the pop up form area instead of the floater\
		  <br /><input type="checkbox" id="cci-postarea-twofields" ' + checkboxChecked(GM_getValue('cci_postarea_twofields', true)) + ' /> Initially show file and comment fields only\
		  <br />Reply form area color scheme: \
			<select id="cci-colorscheme">\
			  <option value="red" ' + colorschemeSelected('red') + ' />Red</option>\
			  <option value="orange" ' + colorschemeSelected('orange') + ' />Orange</option>\
			  <option value="yellow" ' + colorschemeSelected('yellow') + ' />Yellow</option>\
			  <option value="green" ' + colorschemeSelected('green') + ' />Green</option>\
			  <option value="blue" ' + colorschemeSelected('blue') + ' />Blue</option>\
			  <option value="purple" ' + colorschemeSelected('purple') + ' />Purple</option>\
			  <option value="gray" ' + colorschemeSelected('gray') + ' />Gray</option>\
			</select> \
		  <br />Opacity <small>(Choose between 0.00 to 1.00)</small>: On Focus <input id="cci-postarea-opacity" style="width: 50px;" value="' + GM_getValue('cci_postarea_opacity', '1.00') + '" /> On Blur <input id="cci-onmouseout-opacity" style="width: 50px;" value="' + GM_getValue('cci_onmouseout_opacity', '1.00') + '" />\
		  <br /><small>("On Focus" - Mouse hovers the form area OR text cursor is present in any field. "On Blur" - Mouse is not hovering over the form area AND text cursor is not present in the fields)</small>\
		  <br /><input type="checkbox" id="cci-boardlinks" ' + checkboxChecked(GM_getValue('cci_boardlinks', false)) + ' /> Directly show all board links in the floater. <small>(Your screen resolution width should be at least 1200px to make this work.)</small>\
		  <br /><input type="checkbox" id="cci-quotesnapshot" ' + checkboxChecked(GM_getValue('cci_quotesnapshot', false)) + ' /> Enable forwardlinks/backlinks snapshots and nesting <small>(Nesting takes place when you click the link. It\'s not automatic.)</small>\
		  <br /><input type="checkbox" id="cci-autothread" ' + checkboxChecked(GM_getValue('cci_autothread', false)) + ' /> Enable auto-threading\
		  <br /><input type="checkbox" id="cci-linkify" ' + checkboxChecked(GM_getValue('cci_linkify', false)) + ' /> Linkify non-anchored URLs\
		  <!-- <br /><input type="checkbox" id="cci-autogif" ' + checkboxChecked(GM_getValue('cci_autogif', false)) + ' /> Replace JPG clones of animated GIFs with the real animations -->\
		  <br /><br />Post templates: <a href="javascript: void 0;" style="text-decoration: none;" onclick="document.getElementById(\'cci-post-templates\').value=\'Command::Reset\\n#Save this preference now to reset this.\';">[Reset]</a>\
		  <br /><textarea id="cci-post-templates" style="width: 600px; height: 300px;" wrap="off">' + post_templates_str + '</textarea>\
		  <br /><br />Post Filters: <a href="http://sites.google.com/site/netroscripts/chanchimp/filters" target="_blank" style="text-decoration: none;">[Learn how]</a>\
		  <br /><textarea id="cci-post-filters" style="width: 600px; height: 300px;" wrap="off">' + post_filters_str + '</textarea>\
		  <!-- <br /><br />Custom CSS:\
		  <br /><textarea id="cci-customcss" style="width: 600px; height: 300px;" wrap="off">+customcss_str+</textarea> -->\
		  <br />&nbsp;\
		</div>\
		<div style="border-top: solid 1px ' + colorscheme[0] + '; padding-top: 3px;">\
		  <input style="display: inline" type="button" id="cci-submit" value="Save and Reload" />\
		</div>\
	  </form>\
	</div>\
  ';
	try {
		e = document.createElement('div');
		e.id = 'cc-prefbox';
		e.style.position = 'fixed';
		e.style.right = '50px';
		e.style.top = '30px';
		e.style.display = 'none';
		e.style.zIndex = '10';
		e.innerHTML = temp;
		body.appendChild(e);
		e.setAttribute('class', 'chanchimp');
	} catch (e) {}
	document.getElementById('cci-submit').addEventListener('click', setPrefs, false);

	try { //put blank div at the bottom
		e = document.createElement('div');
		e.style.width = '100%';
		e.style.height = '150px';
		e.innerHTML = '&nbsp;';
		body.appendChild(e);
	} catch (e) {}

	//final script
	try {
		e = document.createElement('script');
		e.type = "text/javascript";
		temp = "";
		if (web.isNoneOfThese(['4chanarchive'])) temp += "document.post.name.value=get_cookie('4chan_name'); document.post.email.value=get_cookie('4chan_email'); document.post.pwd.value=get_pass('4chan_pass');";
		if (web.isNoneOfThese(['4chanarchive']) && (GM_getValue('cci_postarea_popup', false) === true || shortwidth == 1)) temp += " ccr_transformToPopUp();";
		if (GM_getValue('cci_postarea_hidden', true) === false) temp += " ccr_showPostArea();";
		if (GM_getValue('cci_postarea_twofields', true) === false && web.isNoneOfThese(['4chanarchive'])) temp += " ccr_fieldsToggle();";
		if (GM_getValue('cci_boardlinks', false) === true && web.isNoneOfThese(['4chanarchive'])) temp += " document.getElementById('cc-newnav2').innerHTML=document.getElementById('navtop').innerHTML; document.getElementById('cc-newnav2_t').style.display='';";
		e.innerHTML = temp;
		body.appendChild(e);
	} catch (e) {}

	//script for update
	var timeobj = new Date();
	var timenow = timeobj.getTime();
	var last_checkupdate = parseInt(GM_getValue('lastcheckupdate', '0'));
	if ((last_checkupdate + 86400000) < timenow) {
		if (Math.random() <= 0.1) GM_setValue('lastcheckupdate', timenow + '');
		try {
			e = document.createElement('script');
			e.type = "text/javascript";
			e.src = "http://netro.fileave.com/chanchimplatestversion.js"; //this fetches the latest build number
			body.appendChild(e);
		} catch (e) {}
		try {
			e = document.createElement('script');
			e.type = "text/javascript";
			e.innerHTML = "\
		if(" + this_build + "<cc_latest_build) {\
		  document.getElementById('updatetext').innerHTML='<b>Update!!</b>';\
		  if(document.location.href.indexOf('4chanarchive.org')<0)\
			document.getElementById('updatetext2').innerHTML='<b>Update!!</b>';\
		}\
	  ";
			body.appendChild(e);
		} catch (e) {}
	}
	else {
		try {
			e = document.createElement('script');
			e.type = "text/javascript";
			e.innerHTML = '//Last check: ' + GM_getValue('lastcheckupdate', '0');
			body.appendChild(e);
		} catch (e) {}
	}

	// ---------------------------------------------- FILTERS ---------------------------------------------------------------------
	if (post_filters_str != '') {
		filters = post_filters_str.split('\n');
	}

	//gather post info
	if (post_filters_str != '') {
		var postinfo = Array();
		j = 0;
		k = 0;
		for (i = 0; i < rl; i++) {
			if (postarray[i] != undefined && postarray[i].id != '') {
				processInfo(postarray[i], k);
				k++;
			}
		}

		filterPosts(0);

		//scripts again
		temp = "\
	  function ccr_showFiltered(id) {\
		document.getElementById('filter-hidden-'+id).style.display='';\
		document.getElementById('filter-note-'+id).style.display='none';\
	  }\
	  function ccr_enlargeFiltered(id) {\
		document.getElementById(id).getElementsByTagName('div')[0].style.display= 'none';\
		document.getElementById(id).getElementsByTagName('div')[1].style.fontSize= '';\
		document.getElementById(id).getElementsByTagName('div')[1].getElementsByTagName('blockquote')[0].style.fontSize= '';\
	  }\
	";
		try {
			e = document.createElement('script');
			e.type = "text/javascript";
			e.innerHTML = temp;
			body.appendChild(e);
		} catch (e) {}
		if (GM_getValue('cci_linkify', false) === true) linkifyAll();
		//if(GM_getValue('cci_autogif', false) === true) autogifAll();
	}
} // end of main

// ---------------------------------------------- 4CHANARCHIVE SUBMIT ---------------------------------------------------------------------
if (uri.indexOf('http://4chanarchive.org/brchive/main.php?mode=submit') > -1) {
	try {
		e = document.createElement('script');
		e.type = "text/javascript";
		temp = "\
	  document.getElementsByTagName('form')[0].getElementsByTagName('input')[2].value='" + uriGet('ccr_id') + "';\
	  document.getElementsByTagName('form')[0].getElementsByTagName('select')[0].value='" + uriGet('ccr_board').toUpperCase() + "';\
	";
		e.innerHTML = temp;
		body.appendChild(e);
	} catch (e) {}
}

// ---------------------------------------------- VIEW ALL IMAGES ---------------------------------------------------------------------
if (cond_isthread && !cond_notccvai) {
	var board = uri.substr(uri.indexOf('4chan.org/') + 10, uri.indexOf('/', uri.indexOf('4chan.org/') + 10) - (uri.indexOf('4chan.org/') + 10));
	try {
		e = document.createElement('script');
		e.type = "text/javascript";
		temp = "\
	function ccr_go() {\
	  var out='?&chanchimp=on';\
	  out+='&ccr_n='+document.getElementById('chanchimp-select-n').options[document.getElementById('chanchimp-select-n').selectedIndex].value;\
	  out+='&ccr_p=1';\
	  document.location=document.location.href.substr(0,document.location.href.indexOf('?&chanchimp=on'))+out;\
	}\
	function ccr_go_page(str) {\
	  var origloc=document.location.href.substr(0,document.location.href.indexOf('?&chanchimp=on'));\
	  var appendloc=document.location.href.substr(document.location.href.indexOf('?&chanchimp=on'));\
	  var p= parseInt(appendloc.substr(appendloc.indexOf('&ccr_p=')+13));\
	  var out= appendloc.substr(0,appendloc.indexOf('&ccr_p='))+'&ccr_p='+(str=='next'?p+1:p-1);\
	  if(str!='back')\
		document.location=origloc+out;\
	  else \
		document.location=origloc;\
	}\
	function imgShrink(i) {\
	  var img=document.getElementById('img'+i);\
		var a_w=img.width;\
		var a_h=img.height;\
	  if(a_w>800) {\
	  	var s_w=800;\
	  	var s_h=parseInt((s_w/a_w)*a_h);\
	  	img.style.width=s_w+'px';\
	  	img.style.height=s_h+'px';\
		document.getElementById('shrinktxt'+i).style.display='block';\
	  }\
	}\
	";
		e.innerHTML = temp;
		head.appendChild(e);
	} catch (e) {}

	var pics = Array();
	j = 0;
	for (i = 0; document.getElementsByTagName('a')[i] != undefined; i++) {
		obj = document.getElementsByTagName('a')[i];
		if (document.getElementsByTagName('a')[i]) {
			if ((obj.href.indexOf('.jpg') > -1 && obj.href.indexOf('.jpg') + 4 == obj.href.length) || (obj.href.indexOf('.JPG') > -1 && obj.href.indexOf('.JPG') + 4 == obj.href.length) || (obj.href.indexOf('.jpeg') > -1 && obj.href.indexOf('.jpeg') + 5 == obj.href.length) || (obj.href.indexOf('.JPEG') > -1 && obj.href.indexOf('.JPEG') + 5 == obj.href.length) || (obj.href.indexOf('.png') > -1 && obj.href.indexOf('.png') + 4 == obj.href.length) || (obj.href.indexOf('.PNG') > -1 && obj.href.indexOf('.PNG') + 4 == obj.href.length) || (obj.href.indexOf('.gif') > -1 && obj.href.indexOf('.gif') + 4 == obj.href.length) || (obj.href.indexOf('.GIF') > -1 && obj.href.indexOf('.GIF') + 4 == obj.href.length)) {
				if (obj.href != undefined && obj.href != '' && checkDupe(obj.href) === false) pics[j++] = obj.href;
			}
		}
	}

	//generate page
	temp = '<table style="width: 100%; background-color: black; color: white; font-family: Verdana, sans-serif; font-size: 12px;"><tr><td style="text-align: left;"><input type="submit" value="Back" onclick="ccr_go_page(\'back\');" /> Number of Images per page <select id="chanchimp-select-n"><option value="10">10</option><option value="20">20</option><option value="30">30</option><option value="40">40</option><option value="50">50</option><option value="60">60</option><option value="70">70</option><option value="80">80</option><option value="90">90</option><option value="100">100</option></select> <input type="submit" value="Go" onclick="ccr_go();" /></td><td style="width: 350px; vertical-align: top; text-align: right;"><b><a style="color: #EF0E2C; text-decoration: none;" class="chanchimp-anchor" href="http://sites.google.com/site/netroscripts/chanchimp">ChanChimp</a></b>   ||   <a style="color: #EF0E2C; text-decoration: none;" class="chanchimp-anchor" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=10158704">Buy me a beer ' + (uri.indexOf('dspl_thread.php') > -1 ? '/4chanarchive/' : '/' + board + '/') + '</a></td></tr></table>';
	e = document.createElement('div');
	e.id = 'vai-wrapper';
	e.style.position = 'absolute';
	e.style.top = '0px';
	e.style.left = '0px';
	e.style.width = document.body.clientWidth + 'px';
	e.style.height = document.body.offsetHeight + 50 + 'px';
	e.style.display = 'block';
	e.style.zIndex = '10';
	e.style.backgroundColor = colorscheme[2];
	e.style.textAlign = 'center';
	document.body.appendChild(e);
	var p = parseInt(uriGet('ccr_p'));
	var n = parseInt(uriGet('ccr_n'));
	var o = n;
	if (pics.length < p * n) o = pics.length - (p - 1) * n;
	temp += '<br /><b>Page ' + p + ' (Showing ' + o + ' of ' + pics.length + ' images.)</b><br />';
	for (i = (p - 1) * n; i < p * n && pics[i] != undefined && pics[i] != ''; i++) {
		temp += '<br /><small><a href="javascript: void 0;" onclick="document.getElementById(\'img' + i + '\').src=\'' + pics[i] + '?' + Math.random() + '\'">Reload Image</a></small><br /><div id="shrinktxt' + i + '" style="display: none;"><small>This image was shrank. Click image to view full size.</small></div><a target="_blank" class="chanchimp-anchor" href="' + pics[i] + '"><img class="chanchimp-img" id="img' + i + '" src="' + pics[i] + '" style="border: 0px;" onload="imgShrink(' + i + ');" /></a><br /><br />';
	}
	if (i == (p - 1) * n) {
		temp += '<br />If you still see this message after few moments, then it means there\'s no image left to show. You should go back.';
	}
	else {
		temp += '<br /><br />' + (p == 1 ? '' : '<input type="submit" value="Previous Page" onclick="ccr_go_page(\'prev\');" />') + (pics.length > p * n ? '<input type="submit" value="Next Page" onclick="ccr_go_page(\'next\');" />' : '');
	}
	temp += '<br /><hr/><p>No more images below. Don\'t continue.<hr/>'
	document.getElementById('vai-wrapper').innerHTML = temp;

	try {
		e = document.createElement('script');
		e.type = "text/javascript";
		temp = "\
	  document.getElementById('chanchimp-select-n').value='" + n + "';\
	";
		e.innerHTML = temp;
		body.appendChild(e);
	} catch (e) {}

}

// ---------------------------------------------- DOM INSERTED EVENTS ---------------------------------------------------------------------
if (web.isOneOfThese(['4chan']) && cond_isthread) {
	document.body.addEventListener('DOMNodeInserted', function (e) {
		processInsertedDOM(e)
	}, true);
}