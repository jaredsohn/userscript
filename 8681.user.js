// ==UserScript==
// @name        Reddit Submit Preview
// @namespace   tag:abuzaim+gm@gmail.com,2007-04:GMRedditPreview
// @description Lets you preview your submission headline before submitting it to reddit.com
// @include     *reddit.com/submit*
// ==/UserScript==

(function() {

	// Functions
	// -----------------------------------------------------------------------
	// get element by id
	function $(id) { return document.getElementById(id);  }
	// create tag element with attr
	function $c(tag, attr) {
		var element = document.createElement(tag);
		if (attr != null) {
			for (key in attr) {
				element.setAttribute(key, attr[key]);
			}
		}
		return element;
	}
	// create textnode
	function $t(text) { return document.createTextNode(text); }
	// toggle display of an element of display type
	function $d(elem, type) {
		if (typeof elem == 'string') elem = $(elem);
		type = type || 'block';
		elem.style.display = elem.style.display!='none' ? elem.style.display='none' : elem.style.display=type;
	}

	// Main script
	// -----------------------------------------------------------------------

	// get username from cookie (or should I get it from #topbar??)
	var cookie = document.cookie;
	var user   = cookie.match(/reddit_options_([^=]+)=/);
	user = (user && user[1]) ? user[1] : null;

	if (!user) return;

	$d('title', 'inline'); // hide default title textbox

	// bigger textarea input for title
	var titleTA = $c("textarea", {
		'cols' : '60',
		'rows' : '3',
		'id'   : 'title-big',
		'name' : 'title',
		'style': 'display: block;'
	});
	titleTA.textContent = $('title').value;
	var parentTD = $('title').parentNode;
	    parentTD.appendChild(titleTA);

	// preview button
	var previewBtn = $c("a", {
		'id'   : 'preview-btn',
		'href' : '#',
		'style' : 'font-size: 0.8em;'
	});
	previewBtn.appendChild($t("preview"));

	// look for the 'title' TD label
	var labelTD = parentTD.previousSibling;
	while (typeof labelTD.tagName == 'undefined' || labelTD.tagName != 'TD') {
		labelTD = labelTD.previousSibling;
	}
	labelTD.appendChild($c('br'));
	labelTD.appendChild(previewBtn);
	labelTD.style.verticalAlign = "top";

	// nope, not going to use DOM for this, sorry.
	var template =
		'<table id="siteTable">' +
		'<tr>' +
			'<td class="oddRow spacing top" colspan="1"></td>' +
			'<td class="oddRow spacing top" colspan="4"></td>' +
		'</tr>' +
		'<tr class="oddRow">' +
			'<td class="numbercol" valign="top" rowspan="3">' +
			'<td valign="top" rowspan="3">' +
				'<div class="arrow up"></div>' +
				'<div class="arrow down"></div>' +
			'</td>' +
			'<td colspan="3">' +
				'<a href="#" id="gm-redditpreview-link"></a> ' +
				'<span class="little" id="gm-redditpreview-domain"></span>' +
			'</td>' +
		'</tr>' +
		'<tr class="oddRow">' +
			'<td class="wide little" valign="top" colspan="3">' +
				'posted 0 seconds ago by <a href="#" id="gm-redditpreview-user"></a>' +
			'</td>' +
		'</tr>' +
		'</table>';
	var previewDiv = $c('div', {id:'gm-redditpreview-div'});
	with (previewDiv.style) {
		display = "none";
		padding = "3px";
		border  = "1px dotted #336699";
	}
	previewDiv.innerHTML = template;
	parentTD.appendChild(previewDiv);

	// event listener for preview button
	previewBtn.addEventListener(
		'click',
		function(e) {
			if (titleTA.style.display == 'block') {
				// get domain from url
				var url = $('url').value;
				var domain = url.match(/:\/\/(www\.)?([^\/:]+)/);
				domain = domain && domain[2] ? domain[2] : '';

				// hide textarea, show preview
				$('gm-redditpreview-link').innerHTML   = titleTA.value;
				$('gm-redditpreview-domain').innerHTML = '('+domain+')';
				$('gm-redditpreview-user').innerHTML   = user;
			} else {
				// hide preview, show textarea
				$('gm-redditpreview-link').innerHTML   = '';
				$('gm-redditpreview-domain').innerHTML = '';
			}

			$d(titleTA); $d(previewDiv);
			previewBtn.innerHTML = previewBtn.innerHTML=='preview' ? 'close' : 'preview';

			titleTA.focus();

			e.stopPropagation();
			e.preventDefault();
			return false;
		},
		true
	);

})();