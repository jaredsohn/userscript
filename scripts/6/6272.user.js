// ==UserScript==
// @name           Google Interface
// @namespace      (none)
// @description    Allows links to be customized on google.com
// @include        http://*.google.com/
// @include        http://google.com/
// @include        http://www.google.com/webhp
// ==/UserScript==

// Original Links
var Web         = "<a href='http://www.google.com/url?q=/webhp'>Web</a>";
var Images      = "<a href='http://images.google.com/imghp?tab=wi'>Images</a>";
var Video       = "<a href='http://video.google.com/?tab=wv'>Video</a>";
var News        = "<a href='http://news.google.com/nwshp?tab=wn'>News</a>";
var Maps        = "<a href='http://maps.google.com/maps?tab=wl'>Maps</a>";
var Gmail       = "<a href='http://mail.google.com/mail?tab=wm'>Gmail</a>";

// Links listed under the "more" column
var BlogSearch  = "<a href='http://blogsearch.google.com/?tab=wb'>Blog Search</a>";
var Blogger     = "<a href='http://www.blogger.com/?tab=wj'>Blogger</a>";
var Books       = "<a href='http://books.google.com/bkshp?tab=wp'>Books</a>";
var Calendar    = "<a href='http://www.google.com/calendar?tab=wc'>Calendar</a>";
var Documents   = "<a href='http://docs.google.com/?tab=wo'>Documents</a>";
var Finance     = "<a href='http://finance.google.com/finance?tab=we'>Finance</a>";
var Groups      = "<a href='http://groups.google.com/grphp?tab=wg'>Groups</a>";
var Labs        = "<a href='http://labs.google.com/?tab=wz'>Labs</a>";
var Orkut       = "<a href='http://www.orkut.com/?tab=w0'>Orkut</a>";
var Patents     = "<a href='http://www.google.com/ptshp?tab=wt'>Patents</a>";
var Photos      = "<a href='http://picasaweb.google.com/home?tab=wq'>Photos</a>";
var Products    = "<a href='http://www.google.com/prdhp?tab=wf'>Products</a>";
var Reader      = "<a href='http://www.google.com/reader?tab=wy'>Reader</a>";
var Scholar     = "<a href='http://scholar.google.com/schhp?tab=ws'>Scholar</a>";

// Other links
var Linux       = "<a href='http://www.google.com/linux'>Linux</a>";
var Bookmarks   = "<a href='http://www.google.com/bookmarks'>Bookmarks</a>";
var Code        = "<a href='http://www.google.com/codesearch'>Code</a>";
var Directory   = "<a href='http://www.google.com/dirhp?cat=gwd/Top'>Directory</a>";
var Notebook    = "<a href='http://www.google.com/notebook/searchNotebook'>Notebook</a>";

// Set what links you want to appear at the top of Google
var myGoogleLinks = new Array(Web,Images,Video,Maps,Gmail,Reader,News,Linux,Products,Scholar,Groups,Labs);

// Replace old gbar with the new one
var gbar = document.getElementById("gbar");
var newGbar = document.createElement("div");
gbar.parentNode.replaceChild(newGbar,gbar);
newGbar.setAttribute("id","gbar");

// Adds custom links
for(var i=0; i<myGoogleLinks.length; i++) {
	var gb1 = document.createElement("div");
	gb1.setAttribute("class","gb1");
	gb1.innerHTML = myGoogleLinks[i];
	newGbar.appendChild(gb1);
}