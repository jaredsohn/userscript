// ==UserScript==
// @name           Feministe Comment Preview
// @namespace      http://twilite.org/~xtina
// @description    Creates a "preview comment" button to the right of the Submit button.
// @include        http://www.feministe.us/blog/archives/*
// ==/UserScript==

/* ## INDIV. SETTINGS ## */

// I changed the comment-box text colour to black.  Change to "false" (w/o
// quotes) if you don't share my dislike.
var changeColour = true;

// The text of the Preview "button", alt, and title text.
var btnText = "Preview Comment!";
var btnAlt = "Preview your comment before posting.";
var btnTitle = "Preview your comment before posting.";

// Preview button before, or after?  Specifically, "before" or "after", sans
// quotes.
var btnWhere = "before";

/* ## STOP EDITING ## */


// Only bother scriptifying if you *can* comment.
if (document.getElementById("respond")) {

// I have an unholy hatred of the greyinating of the internet.
if (changeColour) document.getElementById("comment").style.color = "#000";

// The main container.
var pvwHolder = document.createElement("div");
pvwHolder.setAttribute("id", "gmx-holder");
pvwHolder.style.display = "none";

// The Preview title.
var pvwTitle = document.createElement("div");
pvwTitle.setAttribute("id", "gmx-header");
pvwTitle.setAttribute("style", "font-size: 16px; font-weight: bold; color: #252; margin: -15px 0 15px 0;");
pvwTitle.appendChild(document.createTextNode("Preview: "));

// The Close "link".
var pvwClose = document.createElement("span");
pvwClose.setAttribute("id", "gmx-hider");
pvwClose.setAttribute("style", "font-size: 10px; font-weight: normal; color: #300; cursor: pointer; float: right; border: 1px solid #333; padding: 2px; margin-right: -5px;");
pvwClose.setAttribute("onClick", "javascript:this.parentNode.parentNode.style.display = 'none'");
pvwClose.appendChild(document.createTextNode("Close [x]"));

// Put it all together, and put it all into the container.
pvwTitle.appendChild(pvwClose);
pvwHolder.appendChild(pvwTitle);

// Get the form.
var commForm = document.getElementById("commentform");

// The preview div.
var pvwBox = document.createElement("div");
pvwBox.setAttribute("id", "gmx-preview");
pvwBox.setAttribute("style", "border: 1px dotted #369; margin: -5px -5px 5px -5px; padding: 5px;");

// Add the comment stuff to the new div.
pvwHolder.appendChild(pvwBox);

// Craft the Preview "button".
var pvwLink = document.createElement("a");
pvwLink.appendChild(document.createTextNode(btnText));
pvwLink.setAttribute("style", "border: 3px double #999; border-top-color: #ccc; border-left-color: #ccc; padding: 6px 8px; font-weight: bold; background: url('http://www.feministe.us/blog/wp-content/themes/thesis_16/lib/images/submit-bg.gif'); text-decoration: none; color: #111; font-size: 15px;");
if (btnAlt) pvwLink.setAttribute("title", btnAlt);
if (btnTitle) pvwLink.setAttribute("title", btnTitle);

// Whew, the onclick stuff.
pvwLink.href = "javascript:(" + function() {
	// Get the basic elements.
	var commForm = document.getElementById("commentform");
	var commEntry = document.getElementById("comment").value;

	// Is there anything to preview, even?
	if (commEntry == '') {
		alert("You should enter a comment first.");
	} else {
		var commName = document.getElementById("author").value;
		var commUrl = document.getElementById("url").value;
		var pvwHolder = document.getElementById("gmx-holder");
		var pvwBox = document.getElementById("gmx-preview");

		// Display the block.
		pvwHolder.style.display = "block";

		// The comment header.
		var pvwHtm = '<dt style="font-size: 12px;"><span style="color: #444;" class="comment_num">##</span>';
		pvwHtm += '<span style="font-size: 16px; font-weight: bold;">';
		if (commUrl)
			pvwHtm += '<a href="' + commUrl + '">' + commName + '</a>';
		else
			pvwHtm += commName;
		pvwHtm += '</span> &nbsp; ';

		// Date/time stamp.  I really dislike date/time formatting in p. much any language.
		var d = new Date();
		var sStamp = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear() + ' at ';
		d.getHours() > 12 ? sStamp += (d.getHours() - 12) + ':xx pm' : sStamp += d.getHours() + ':xx am';
		if (d.getHours() == 12) sStamp = sStamp.replace('am', 'pm');
		sStamp = sStamp.replace('xx', ('0' + d.getMinutes()).substr(-2));

		pvwHtm += '<span class="comment_time">' + sStamp + '</span></dt><br />\n';

		// The comment itself.
		var tmp = document.getElementById("comment").value;
		tmp = tmp.split(/\n/);
		pvwHtm += '<dd><div class="format_text">';
		for (var x = 0; x < tmp.length; x++) {
			pvwHtm += '<p>' + tmp[x] + "</p>\n";
		}
		pvwHtm += '</div></dd>';

		// Add the comment stuff to the new div.
		pvwBox.innerHTML = pvwHtm;
		pvwHolder.appendChild(pvwBox);
	}
} + ")();";

// Append the preview "button" and the div container bit.
var btnRow = commForm.childNodes[16].childNodes[1];
var btnTab = parseInt(btnRow.getAttribute("tabindex"));
if (btnWhere.toLowerCase() == "before") {
	btnRow.style.marginLeft = "5px";
	btnRow.setAttribute("tabindex", (btnTab + 1));
	pvwLink.setAttribute("tabindex", btnTab);
	btnRow.parentNode.insertBefore(pvwLink, btnRow);
} else {
	pvwLink.setAttribute("tabindex", (btnTab + 1));
	btnRow.parentNode.appendChild(pvwLink);
}
commForm.parentNode.appendChild(pvwHolder);

}
