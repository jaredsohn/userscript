// ==UserScript==
// @name           HelpSpot Admin Links
// @description    Adds a link to the public pages to access the related admin page, and vice-versa.
// @namespace      http://www.lildevil.org/greasemonkey/
// @version        1.2
// @copyright      2010+, Lil Devil http://www.lildevil.org/greasemonkey/
// @license        Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        */index.php?pg=kb*
// @include        */admin.php?pg=kb*
// @include        */index.php?pg=request*
// @include        */admin.php?pg=request*
// ==/UserScript==

(function(){

if (window != window.top) { return; }	// exit if running in iframe

var openLinksInNewWindow = true;
var alwaysShowMoreRequestDetails = true;

Check_for_Update('HelpSpot Admin Links', '1.2');

Add_Prototypes();

var PageURL = document.location.toString();

if (/index\.php/.test(PageURL)) {				// Public page
	var adminLink = PageURL.replace('index.php', 'admin.php');
	var linksTarget, chapter, editLink;
	switch (Get_URL_Parameter('pg')) {
		case 'kb.book' :		adminLink = adminLink.replace('&id=', '&book=');
								break;
		case 'kb.chapter' :		adminLink = adminLink.replace('&id=', '&chapter=');
								break;
		case 'kb.page' :		adminLink = adminLink.replace('&id=', '&page=');
								var result = xPath('//a[contains(@href, "pg=kb.chapter")]',
												document, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
								if (result.snapshotLength == 1) {
									chapter = Get_URL_Parameter('id', result.snapshotItem(0));
									linksTarget = result.snapshotItem(0).parentNode;
								} else if (result.snapshotLength > 1) {
									for (var i=0; i < result.snapshotLength; i++) {
										if (result.snapshotItem(i).previousSibling.data.indexOf('&#8594'.parseHTMLentities()) >= 0) {
											chapter = Get_URL_Parameter('id', result.snapshotItem(i));
											linksTarget = result.snapshotItem(i).parentNode;
											break;
										}
									}
								}
								if (chapter) {
									editLink = adminLink.replace('pg=kb.page', 'pg=kb.modpage&chapter=' + chapter);
								}
								break;
		case 'request.check' :	adminLink = adminLink.replace('http:', 'https:');
								adminLink = adminLink.replace('helpspot.', 'support.');
								adminLink = adminLink.replace('pg=request.check', 'pg=request');
								adminLink = adminLink.replace(/&id=(\d+)(\w+)/, '&reqid=$1');
								linksTarget = getFirstElementByClassName('RequestCheck');
	}
	Add_Links_to_Public_Page(linksTarget, adminLink, editLink);
} else if (/admin\.php/.test(PageURL)) {
	var publicLink = PageURL.replace('admin.php', 'index.php');
	switch (Get_URL_Parameter('pg')) {
		case 'kb.book' :	publicLink = publicLink.replace('&book=', '&id=');
							break;
		case 'kb.chapter' :	publicLink = publicLink.replace('&chapter=', '&id=');
							break;
		case 'kb.page' :	publicLink = publicLink.replace('&page=', '&id=');
							break;
		case 'request' :	publicLink = publicLink.replace('https:', 'http:');
							publicLink = publicLink.replace('support.', 'helpspot.');
							publicLink = publicLink.replace('pg=request', 'pg=request.check');

							var accessKeyRow = document.getElementById('show_accesskey');
							if (accessKeyRow) {
								var accessKeyElement = getFirstElementByTagName('b', accessKeyRow);

								if (alwaysShowMoreRequestDetails) {
									accessKeyRow.style.display = '';
									document.getElementById('show_portalpass').style.display = '';
								}

								publicLink = publicLink.replace(/&reqid=(\w+)/, '&id=' + accessKeyElement.textContent);

								var newLink = newElement('a', {	href	: publicLink,
																target	: (openLinksInNewWindow ? '_blank' : '') },
													newElement(accessKeyElement.textContent) );
								accessKeyElement.replaceChild(newLink, accessKeyElement.firstChild);
							} else {
								var closedRequestTable = document.getElementById('closed_request_table');
								if (closedRequestTable) {
									var accessKeyCell = xPath('.//td[contains(text(), "Access Key:")]',
														closedRequestTable, XPathResult.FIRST_ORDERED_NODE_TYPE);
									if (accessKeyCell) {
										var m = accessKeyCell.textContent.match(/^(.*?:\s)(\w+)(.*)$/);
										if (m) {
											publicLink = publicLink.replace(/&reqid=(\w+)/, '&id=' + m[2]);
											var newLink = newElement('a', {	href	: publicLink,
																			target	: (openLinksInNewWindow ? '_blank' : ''),
																			style	: 'color:#FEF9DC' },
																newElement(m[2]) );
											accessKeyCell.replaceChild(newElement(m[1]), accessKeyCell.firstChild);
											accessKeyCell.appendChild(newLink);
											accessKeyCell.appendChild(newElement(m[3]));
										}
									}
								}
							}
	}
	Add_Links_to_Admin_Page(publicLink);
}

function Add_Links_to_Public_Page(linksTarget, adminLink, editLink) {
	if (!linksTarget) {
		linksTarget = getFirstElementByClassName('breadcrumbs');
	}
	if (!linksTarget) {
		linksTarget = getFirstElementByClassName('Breadcrumbs');
	}
	if (!linksTarget) {
		linksTarget = document.getElementById('feedback_box');
	}
	if (linksTarget) {
		var newLinks = newElement('span', {	style : 'float:right;' },
								newElement('a', {	href	: adminLink,
													target	: (openLinksInNewWindow ? '_blank' : '') },
										newElement('View Admin Page') ) );
		if (editLink) {
			newLinks.appendChild(newElement(' | '));
			newLinks.appendChild(newElement('a', {	href	: editLink,
													target	: (openLinksInNewWindow ? '_blank' : '') },
										newElement('Edit Page') ) );
		}
		linksTarget.insertBefore(newLinks, linksTarget.firstChild);
		linksTarget.style.display = '';
	}
}

function Add_Links_to_Admin_Page(publicLink) {
	var linksTarget = getFirstElementByClassName('kbeditorcontrols');
	if (linksTarget) {
		var newLinks = newElement('span', {	style	: 'float:right;',
											'class'	: 'kbeditorcontrols' },
								newElement('a', {	href	: publicLink,
													target	: (openLinksInNewWindow ? '_blank' : '') },
										newElement('View Page') ) );
		linksTarget.parentNode.insertBefore(newLinks, linksTarget.parentNode.firstChild);
	}
}

function getFirstElementByClassName(theClass) {
	var theElements = document.getElementsByClassName(theClass);
	if (theElements.length) {
		return theElements[0];
	} else {
		return undefined;
	}
}

function getFirstElementByTagName(theTagName, theParent) {
	theParent = theParent || document;
	var theElements = theParent.getElementsByTagName(theTagName);
	if (theElements.length) {
		return theElements[0];
	} else {
		return undefined;
	}
}

function newElement() {
	if (arguments.length == 1) {
		return document.createTextNode(arguments[0]);
	} else {
		var newNode = document.createElement(arguments[0]),
				 newProperties = arguments[1];
		for (var prop in newProperties) {
			if ((prop.indexOf('on') === 0) && (typeof(newProperties[prop]) == 'function')) {
				newNode.addEventListener(prop.substring(2), newProperties[prop], false);
			} else if (',innerHTML,textContent'.indexOf(','+prop) != -1) {
				newNode[prop] = newProperties[prop];
			} else if ((',checked,disabled,selected'.indexOf(','+prop) != -1) && !newProperties[prop]) {
				// value is false, which browsers do not support, so don't set the property at all
			} else if (/\&/.test(newProperties[prop])) {
				newNode.setAttribute(prop, newProperties[prop].parseHTMLentities());
			} else {
				newNode.setAttribute(prop, newProperties[prop]);
			}
		}
		for (var i=2, len=arguments.length; i<len; i++) {
			newNode.appendChild(arguments[i]);
		}
		return newNode;
	}
}

function xPath(expr, context, typ) {
	var result = document.evaluate(	(expr || '//body'),
									(context || document),
									null,
									(typ || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE),
									null);
	switch (typ) {
		case XPathResult.NUMBER_TYPE: return result.numberValue;
		case XPathResult.STRING_TYPE: return result.stringValue;
		case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
		case XPathResult.ANY_UNORDERED_NODE_TYPE:
		case XPathResult.FIRST_ORDERED_NODE_TYPE: return result.singleNodeValue;
		default: return result;
	}
}

function Add_Prototypes() {
	String.prototype.parseHTMLentities = function() {
		var d = document.createElement('div');
		d.innerHTML = this;
		return d.textContent;
	};
}

function Get_URL_Parameter(fieldName, theUrl) {
	var parts = (theUrl || document.location).toString().split(/[?#]/);
	var queryString = parts[1];

	var re = new RegExp('(^|&)' + fieldName + '=(.*?)(&|$)', 'i');
	if (queryString.match(re)) {
		return RegExp.$2;
	}
	return '';
}

function encodeName(str) {
	str = str.replace(/^\s+/,'');		// remove leading spaces
	str = str.replace(/\s+$/,'');		// remove trailing spaces
	str = str.replace(/\s+/g,' ');		// replace interior spaces with single space
	return encodeURIComponent(str).replace(/%20/g, '+');
}

function decodeName(str) {
	str += '';
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

function LD_setCookie(key, val, life) {
	if (!key) { return; }
	if (!life) { life = 31536000; }
	var expires = new Date().getTime() + (1000 * life);
	document.cookie = escape(key) + '=' + escape(val) +
		';expires=' + new Date(expires).toGMTString() + ';path=/';
}

function LD_getCookie(key) {
	var cookieJar = document.cookie.split('; ');
	for (var i=0, len=cookieJar.length; i<len; i++ ) {
		var oneCookie = cookieJar[i].split('=');
		if (oneCookie[0] == escape(key)) {
			return unescape(oneCookie[1]);
		}
	}
	return null;
}

function LD_setValue(key, val, username) {
	if (username !== undefined) {
		if (username) {		// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + encodeName(username);
		} else {
			return;
		}
	}
	if ((typeof(GM_setValue) != 'undefined') &&
		(GM_setValue.toString().indexOf('not supported') < 0) &&
		!window.opera) {	// don't use Opera compatibility script because it probably uses cookies
			GM_setValue(key, val);
			return;
	}
	val = (typeof(val)).toString().substring(0,1) + val;
	try {
		localStorage.setItem(key, val);
	} catch (err) {
		// if we get here, either localStorage doesn't exist, or we got a Security Error using it
		LD_setCookie(key, val);
	}
}

function LD_getValue(key, defVal, username) {
	if (username !== undefined) {
		if (username) {		// if username is supplied, it must not be blank (i.e. not logged in)
			key += '_' + encodeName(username);
		} else {
			return;
		}
	}
	if ((typeof(GM_setValue) != 'undefined') &&
		(GM_setValue.toString().indexOf('not supported') < 0) &&
		!window.opera) {	// don't use Opera compatibility script because it probably uses cookies
			return GM_getValue(key, defVal);
	}
	var val;
	try {
		val = localStorage.getItem(key);
	} catch (err) {
		val = LD_getCookie(key);
	}
	if (typeof(val) != 'string' || val.length === 0) {
		return defVal;
	}
	var type = val.substr(0,1);
		 val = val.substr(1);
	switch (type) {
		case 'b':
			return (val == 'true');
		case 'n':
			return Number(val);
		default:
			return val;
	}
}

function LD_xmlhttpRequest(request) {
	if ((typeof(GM_xmlhttpRequest) != 'undefined') && !window.opera) {
		GM_xmlhttpRequest(request);
	} else {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			var responseState = {	responseXML		: '',
									responseText	: '',
									readyState		: xmlhttp.readyState,
									responseHeaders	: '',
									status			: 0,
									statusText		: ''
								};
			if (xmlhttp.readyState == 4) {
				responseState = {	responseXML		: xmlhttp.responseXML,
									responseText	: xmlhttp.responseText,
									readyState		: xmlhttp.readyState,
									responseHeaders	: xmlhttp.getAllResponseHeaders(),
									status			: xmlhttp.status,
									statusText		: xmlhttp.statusText
								};
			}

			if (request['onreadystatechange']) {
				request['onreadystatechange'](responseState);
			}
			if (xmlhttp.readyState == 4) {
				if (request['onload'] && xmlhttp.status >= 200 && xmlhttp.status < 300) {
					request['onload'](responseState);
				}
				if (request['onerror'] && (xmlhttp.status < 200 || xmlhttp.status >= 300)) {
					request['onerror'](responseState);
				}
			}
		};
		try {
			//cannot do cross domain
			xmlhttp.open(request.method, request.url);
		} catch(e) {
			if(request['onerror']) {
				//simulate a real error
				request['onerror']({responseXML		: '',
									responseText	: '',
									readyState		: 4,
									responseHeaders	: '',
									status			: 403,
									statusText		: 'Forbidden'
									});
			}
			return;
		}
		if (request.headers) {
			for (var prop in request.headers) {
				xmlhttp.setRequestHeader(prop, request.headers[prop]);
			}
		}
		xmlhttp.send((typeof(request.data) != 'undefined') ? request.data : null);
	}
}

function LD_log(str) {
	if ((typeof(GM_log) != 'undefined') && !window.opera) {
		GM_log(str);
		return;
	}
	try {
		console.log(str);
	} catch (err) {}
}

function Check_for_Update(scriptName, scriptVersion) {
	try {
		var checkURL = 'http://www.lildevil.org/greasemonkey/current-versions.txt';
		if (window.opera) {
			// Opera doesn't support cross-domain xmlhttpRequests
			return;
		}

		// avoid a flood of dialogs e.g. when opening a browser with multiple tabs open
		var now = new Date().getTime();
		var DOSpreventionTime = 2 * 60 * 1000;	// two minutes
		var abbrev = scriptName.replace(/[^A-Z]/g, '');
		var lastStart = LD_getValue(abbrev + '_Update_Start', null);
		LD_setValue(abbrev + '_Update_Start', now.toString());
		if (lastStart && (now - lastStart) < DOSpreventionTime) { return; }

		// time to check yet?
		var oneDay = 24 * 60 * 60 * 1000;
		var lastChecked = LD_getValue(abbrev + '_Update_Last', null);
		var checkDays = LD_getValue(abbrev + '_Update_Days', 1);
		if (lastChecked && (now - lastChecked) < (oneDay * checkDays)) { return; }

		LD_xmlhttpRequest({
			method: 'GET',
			url: checkURL,
			headers: { 'User-Agent' : scriptName + ' v' + scriptVersion + ' auto updater' },
			onload: function(result) {
				var matches,
					regex = new RegExp('[\\s\\>]' + scriptName +
										'\\s+v([\\d\\.]+)\\s+(\\d+)\\s+(.+?)[\\<\\s]', 'i');
				if (!(matches = regex.exec(result.responseText))) {
					LD_log(scriptName + ': Updater: response unrecognized');
					return;
				}

				var theOtherVersion = matches[1];
				LD_setValue(abbrev + '_Update_Days', +matches[2]);
				var theOtherURL = matches[3];

				if (theOtherVersion.replace(/\./g, '') <= scriptVersion.replace(/\./g, '')) { return; } // no updates or older version
				if (theOtherURL.indexOf('http') !== 0) { theOtherURL = 'http://' + theOtherURL; }

				if (window.confirm(	'The Greasemonkey script "' + scriptName +
									'" has been updated.\n\n' +
									'The new version is ' + theOtherVersion +
									'\nYou are currently using version ' + scriptVersion +
									'\n\nClick OK for instructions on how to upgrade.')) {
					document.location = theOtherURL;	// open in same window to avoid popup blockers
				}
			}
		});
		LD_setValue(abbrev + '_Update_Last', new Date().getTime().toString());
	}
	catch (err) { }
}

})();
