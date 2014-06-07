// ==UserScript==
// @name        Userscripts.org - "New Message" Formatting Options
// @namespace   http://userscripts.org/users/23652
// @description Adds several different formatting options when sending a new message
// @include     http://userscripts.org/messages/new?*user_id=*
// @include     http://userscripts.org/topics/new?*forum_id=*
// @include     http://userscripts.org/topics/new?*script_id=*
// @copyright   JoeSimmons
// @version     1.0.5
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://usocheckup.dune.net/171139.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

/* ------- CHANGELOG ----------------------------------------------------------------

1.0.5
    - highlighting text and clicking LINK will now make your cursor go to the href attribute's quotes
        so you can immediately start pasting a url for the link text you selected

1.0.4
	- fixed double-quote escaping. it now handles 3 different kinds of double-quotes

1.0.3
	- started this changelog
	- simplified coding a little
	- cleaned up code a little, as well
	- modified self-closing tags to comply with XHTML standards
	- added improved handling for self-closing tags (should detect a self-closing tag and add the ending slash if necessary)
	- it now works on new topic pages (forum & script discussion)

----------------------------------------------------------------------------------- */

(function uso_newmsg_format_options() {

// Make sure the page is not in a frame (return method, for anonymous function wrapper)
if(window.self !== window.top) return;

var tags, repl, div = document.createElement("div");






// --------------- USER INPUT SECTION ------------------------------------------------------------------------

// format   [ 'display name' , '<start>' , '</end>' ],     <-- for regular tags
// or       [ 'display name' , '<start />' ],              <-- for self-closing tags
tags = [

	[   'LINK' ,       '<a href="">' ,      '</a>'                  ],
	[   'IMG' ,        '<img src="' ,       '" alt="" />'           ],
	[   'PRE' ,        '<pre>' ,            '</pre>'                ],
	[   'QUOTE' ,      '<blockquote>' ,     '</blockquote>'         ],
	[   'BOLD' ,       '<strong>' ,         '</strong>'             ],
	[   'ITALIC' ,     '<em>' ,             '</em>'                 ],
	[   'CODE' ,       '<code>' ,           '</code>'               ],
	[   'BREAK' ,      '<br />'                                     ],
	[   'HR' ,         '<hr />'                                     ],
	[   'UL' ,         '<ul>' ,             '</ul>'                 ],
	[   'LI' ,         '<li>' ,             '</li>'                 ],

0]; tags.pop();

// characters to replace when un-escaping
repl = [

	[   '&' ,                        '&amp;'       ], // escape ampersand character
	[   '<' ,                        '&lt;'        ], // escape less than character
	[   '>' ,                        '&gt;'        ], // escape greater than character
	[   '[\u201c\u201d"]' ,          '&quot;'      ], // escape 3 kinds of double-quotes

0]; repl.pop();

// --------------- STOP USER INPUT ---------------------------------------------------------------------------






// $q by JoeSimmons. Supply it a string and it will return a querySelector with that selector
function $q(sel) {
	return (typeof sel === "string" ? document.querySelector(sel) : null);
}

// Created by avg, modified by JoeSimmons
function create(elemName, attr, kids) {
	if(typeof elemName !== "string") return false;
		else if(elemName === "text" && typeof attr === "string") return document.createTextNode( attr );
	var i, l, prop, ret = document.createElement( elemName.toLowerCase() );
	if(typeof attr === "object" && JSON.stringify(attr) !== "{}") {
		for(prop in attr) {
			if(prop.indexOf("on") === 0 && typeof attr[prop] === "function") ret.addEventListener(prop.substring(2), attr[prop], false);
				else if(",style,accesskey,id,name,src,href,type,target,class".indexOf("," + prop.toLowerCase()) !== -1) ret.setAttribute(prop.toLowerCase(), attr[prop]);
				else ret[prop] = attr[prop];
		}
	}
	if(typeof kids === "object" && typeof kids.push === "function") for(i = 0; i < kids.length; i++) ret.appendChild( kids[i] );
	return ret;
}

// Define GM_addStyle if it's undefined
var GM_addStyle = (typeof GM_addStyle !== "undefined" ? GM_addStyle : function(css) {
    var head = document.getElementsByTagName('head'), style = document.createElement('style');
    if(head.length !== 0 && (head=head[0])) {
		style.setAttribute("type",  "text/css");
		if(typeof style.innerHTML !== "undefined") style.innerHTML = css;
			else if(style.textContent !== "undefined") style.textContent = css;
			else if(style.innerText !== "undefined") style.innerText = css;
		head.appendChild(style);
		return true;
	} else return false;
});

// formatCSS by JoeSimmons. Supply it a string of CSS and it will beautify it (new lines, indentations, etc)
String.prototype.formatCSS = function() {
	var css = this + "";
	if(typeof css !== "string" || (css = css.trim()) === "") return "";
	return css.replace(/;(?!})/g, ";\n\t").replace(/;}/g, ";\n}").replace(/{/g, "{\n\t").replace(/}(?!$)/g, "}\n\n").replace(/(?! ){/, " {");
};

function change(tag, escape) {
	var ta = $q("#message_body, #post_body"),
		obj = {},
		start, end, place, i, tmpRegex;
	
	if((typeof escape === "undefined" || escape === false) && (ta === null || ta.nodeType !== 1 || typeof tag.push !== "function")) return;

	place = ta.scrollTop;
	obj["start"] = ta.value.slice(0, ta.selectionStart);
	obj["selected"] = ta.value.slice(ta.selectionStart, ta.selectionEnd);
	obj["end"] = ta.value.substring(ta.selectionEnd);

	if(typeof escape === "undefined" || escape === false) {

		if(tag.length < 3) {
			ta.value = obj["start"] + obj["selected"] + tag[1] + obj["end"];
			ta.setSelectionRange((obj["start"].length + obj["selected"].length + tag[1].length), (obj["start"].length + obj["selected"].length + tag[1].length));
		} else {
            if (tag[2] === '</a>') {
                ta.value = obj["start"] + tag[1] + obj["selected"] + tag[2] + obj["end"];
                ta.setSelectionRange( (obj["start"].length + tag[1].length) - 2, (obj["start"].length + tag[1].length) - 2);
            } else {
                ta.value = obj["start"] + tag[1] + obj["selected"] + tag[2] + obj["end"];
                ta.setSelectionRange((obj["start"].length + tag[1].length), (obj["start"].length + tag[1].length + obj["selected"].length));
            }
		}

	} else if(typeof escape === "boolean" && escape === true && ta.selectionEnd > ta.selectionStart) {

		for(i = 0; i < repl.length; i++) {

			obj["selected"] = obj["selected"].replace(repl[i][0], repl[i][1]);

		}

		ta.value = obj["start"] + obj["selected"] + obj["end"];
		ta.setSelectionRange(obj["start"].length, (obj["start"].length + obj["selected"].length));

	}

	ta.scrollTop = place;
	ta.focus();
}

GM_addStyle(("" +
// -------------------------------------------------
	"#root div.container {" +
		"width: 75% !important;" +
	"}" +
	"#content {" +
		"display: block !important;" +
		"width: 100% !important;" +
	"}" +
	"#content form {" +
		"width: 100% !important;" +
	"}" +
	"#message_body, #post_body {" +
		"width: 80% !important;" +
		"height: 400px !important;" +
	"}" +
	"#msg_format_opts input[type=\"button\"], #msg_format_opts a {" +
		"padding: 4px;" +
		"margin-bottom: 6px;" +
		"display: block;" +
		"font-family: sans-serif, serif, arial;" +
		"font-size: 8pt;" +
	"}" +
	"#msg_format_opts #a, #msg_format_opts #link {" +
		"color: #0066CC;" +
	"}" +
	"#msg_format_opts #bold {" +
		"font-weight: bold;" +
	"}" +
	"#msg_format_opts #italic {" +
		"font-style: italic;" +
	"}"
// -------------------------------------------------
).formatCSS() );



var content = $q("#content form"), i, j, tag,
	div = create("div", {id: "msg_format_opts", style: "position: absolute; top: 22%; right: 4%; text-align: left;"}),
	selfClosingReplace = /[\s\/]*>$/;

if(content !== null && $q("#message_body, #post_body")) {

	for(i = 0; i < tags.length; i++) {

		tag = tags[i];

		if(tag.length < 2) continue;

		// make sure the tags are lowercase for XHTML compliance
		tag[1] = tag[1].toLowerCase();
		if(tag.length > 2) tag[2] = tag[2].toLowerCase();

		// remove an empty closing tag entry
		if(tag.length > 2 && tag[2].trim() === "") tag.splice(2, 1);
		
		// fix improper self-closing tags (i.e., the user didn't add a closing forward slash)
		if(tag.length < 3) {

			if(tag[1].indexOf(" />") !== (tag[1].length - 3)) tag[1] = tag[1].replace(selfClosingReplace, " />");

		}

		(function(tag) { // workaround for closure problem ("tag" is always the same in the event listener)

			div.appendChild(
				create("input", {"type" : "button", "value": tag[0], "id": tag[0].toLowerCase(), "onclick": function(e) {
					e.preventDefault();
					e.stopPropagation();
					change(tag);
				}})
			);

		})(tag); // end workaround

	}
	
	// add the "escape selection" button
	div.appendChild(
		create("a", {href: "javascript:void(0);", style: "padding: 2px;", onclick:function() {
			change(null, true);
		}}, [
			create("text", "Escape HTML in selection")
		])
	);

	content.appendChild( div );

	// prepare the replacement regexps and correct self-closing tags if necessary
	for(j = 0; j < repl.length; j++) {

		repl[j][0] = new RegExp(repl[j][0], "g");

	}

}

}());