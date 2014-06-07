function usodata_60203() {
// ==UserScript==
// @name           BugzillaImagePreview
// @version        1.3
// @namespace      http://projects.izzysoft.de/
// @description    Show image attachments in Bugzilla tickets
// @include        http://*bugzilla.*/show_bug.cgi?*
// @include        http://*bugzilla.*/process_bug.cgi*
// @require        http://userscripts.org/scripts/source/51513.user.js
// @history        1.3 Getting rid of E4X dependency so it should work with FF17+
// @history        1.2 Updated for recent Bugzilla versions
// @history        1.1 Rewrite - now language independent
// @history        1.0 Initial version (German only)
// @uso:script     60203
// ==/UserScript==
]]></>;
}
var GMSU_meta_60203 = usodata_60203.toString();
GMSU.init(60203);
var Debug = false;

function debug(msg) {
  if (Debug) GM_log(msg);
}

function checkImages() {
  var rows = document.evaluate("//a[starts-with(@href,'attachment.cgi')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  debug(rows.snapshotLength+' Links to attachments found');
  for (var i=0;i<rows.snapshotLength;i++) {
    debug('Verifying "'+rows.snapshotItem(i).href+'"');
    var res = /(.*attachment\.cgi\?id\=\d+)$/.exec(rows.snapshotItem(i).href);
    if (res!=null) {
	  var typc = rows.snapshotItem(i).parentNode.nextSibling;
	  while (typeof(typc.tagName)=='undefined' && typc.nextSibling) typc = typc.nextSibling;
	  if (!typc.tagName) continue;
	  if ( typc.tagName.toLowerCase()!='td' ) { // old Bugzilla
	    debug('Looks like old Bugzilla');
	    typ = typc.innerHTML.trim();
	  } else if (typc.tagName.toLowerCase()!='span') { // new Bugzilla
	    debug('Looks like new Bugzilla');
	    typc = rows.snapshotItem(i).nextSibling;
		while (typeof(typc.tagName)=='undefined' && typc.nextSibling) typc = typc.nextSibling;
		typ = /\(.*\,\s*(.*)\)/.exec(typc.innerHTML)[1];
		debug(typc.tagName+' '+typ);
	  } else {
	    continue;
	  }
	  debug('Attachment type: "'+typ+'"');
	  if (typ.split('/')[0].toLowerCase()!='image') { // either no image, or newer Bugzilla
	    typc = rows.snapshotItem(i).nextSibling;
		typ = typc.innerHTML.trim();
	    continue;
	  }
	  debug('THIS IS AN IMAGE!');
	  var img = document.createElement('img');
	  img.src = res[0];
	  img.alt = 'Attached image';
	  img.style.maxWidth = '300px';
	  img.style.maxHeight = '100px;';
	  rows.snapshotItem(i).parentNode.appendChild(document.createElement('br'));
	  rows.snapshotItem(i).parentNode.appendChild(img);
	  debug(res[0]);
    }
  }
}

//===============================================[ Main ]===
window.addEventListener(
  "load",
  function() {
    setTimeout(checkImages, 0);
  },
  false
);
