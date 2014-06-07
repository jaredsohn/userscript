
// Strip HTML tags from Kayako posts
// version 0.2 BETA!
// 2006-12-19
// Copyright (c) 2006, Juan R. Pozo
// Released under the MIT license
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Strip HTML tags from Kayako posts", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Strip HTML tags from Kayako posts
// @namespace   http://html.conclase.net/greasemonkey/
// @description Strips HTML tags from Kayako posts
// @include     https://help.site5.com/staff/*
// @exclude     http://html.conclase.net/*
// ==/UserScript==

var d = document

/* Select the cells that contain user/staff posts */

ticket_cells = d.evaluate(
  "//TD[@class='contenttableborder']//TD[starts-with(@class, 'ticketrow') and not(@width=160)]",
  d, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
)

/* Process each cell */

for (i = 0 ; i < ticket_cells.snapshotLength ; i++) {
	
	cell = ticket_cells.snapshotItem(i)
	
	if (res = d.evaluate(
    "TABLE",
    cell, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
  )) {

   	/* Make a copy of the original text */
	  /* Table0/Span contains original */
    /* Table1/Span contains stripped version */
  	originalTable = res.snapshotItem(0)
  	strippedTable = originalTable.cloneNode(true)
  	strippedTable.style.display = 'none'
  	cell.appendChild(strippedTable)
  	
    /* Insert the Buttons */
    btnConvert = d.createElement('BUTTON')
    btnConvert.appendChild(d.createTextNode('Strip HTML Tags'))
    btnConvert.style.fontSize = '10px'
    btnConvert.style.border = '1px solid #6393DF'
    btnConvert.style.background = '#E5F3FE'
  	cell.insertBefore(btnConvert, cell.firstChild)

    btnRestore = btnConvert.cloneNode(true)
    btnRestore.firstChild.nodeValue = 'Restore original'
    btnRestore.style.display = 'none'
  	cell.insertBefore(btnRestore, cell.firstChild)

    /* Get the SPAN element, we are going to strip the tags now */
    
    res2 = d.evaluate(
      ".//SPAN[@class='mediumtext']", strippedTable,
      null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    )
    span = res2.snapshotItem(0)

    /* Get the attachments textfield if one exists */
    attachments = null
		fs = span.getElementsByTagName('FIELDSET')
		if (fs.length > 0) attachments = span.removeChild(fs[0])
			  	
    /* Do the bracket shake */
		t = span.innerHTML
	  /* Remove the BR elements inserted by Kayako */
		t = t.replace(/<br[^>]*>/g, '')
    /* All back to HTML */
		t = t.replace(/&lt;/g, "<")
		t = t.replace(/&gt;/g, ">")
    /* Arrows in Exim log lines */
		t = t.replace(/<[=-]/g, '&lt;$1')
		t = t.replace(/[=-]>/g, '$1&gt;')
		/* E-mail addresses in angle brackets */
		t = t.replace(/<([^\s>]+@[^\s>]+)?>/g, '&lt;$1&gt;')
		/* PHP, ruby, ASP, etc. code */
		t = t.replace(/<(\?[^?]+\?)>/gm, '&lt;$1&gt;')
		t = t.replace(/<(%[^%]+%)>/gm, '&lt;$1&gt;')
		/* Strip all other HTML tags */
		t = t.replace(/<[^>]+>/gm, '')
		/* Quotes and spaces are OK to keep */
		t = t.replace(/&amp;/g, '&')
		/* Convert back any remaining angle brackets (quotations) */
		t = t.replace(/>/g, '&gt;')
		t = t.replace(/</g, '&lt;')
		/* Remove the first new line character */
		t = t.replace(/\n/, '')
		/* Convert new lines to <br> elements, which are now missing */
		t = t.replace(/\n/g, '<br />')
		span.innerHTML = t
			    
    /* Insert the attachments back */
	  if (attachments) span.appendChild(attachments)
			    
    btnConvert.addEventListener('click', function(event) {
      r = d.evaluate(
        "TABLE", event.target.parentNode,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
      )
      r.snapshotItem(0).style.display = 'none'
      r.snapshotItem(1).style.display = 'block'
      r = d.evaluate(
        "BUTTON", event.target.parentNode,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
      )
      r.snapshotItem(1).style.display = 'none'
      r.snapshotItem(0).style.display = 'inline'
  	}, true)
  	
    btnRestore.addEventListener('click', function(event) {
      r = d.evaluate(
        "TABLE", event.target.parentNode,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
      )
      r.snapshotItem(1).style.display = 'none'
      r.snapshotItem(0).style.display = 'block'
      r = d.evaluate(
        "BUTTON", event.target.parentNode,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
      )
      r.snapshotItem(0).style.display = 'none'
      r.snapshotItem(1).style.display = 'inline'
  	}, true)

	}
}
