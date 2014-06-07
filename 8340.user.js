// ==UserScript==
// @name           getallthreads
// @namespace      asd
// @include        http://diveintogreasemonkey.org/patterns/iterate-one-element.html
// @include        http://www.thecandidboard.com/forums/forumdisplay.php*
// ==/UserScript==

GM_registerMenuCommand("decorate!",
  	  	decorateLinks);
GM_registerMenuCommand("a1();",
  	  	a1);
GM_registerMenuCommand("saveDIV3",
  	  	saveDIV3);




function a1() {
var head = document.getElementsByTagName("head")[0];
var e1 = document.createElement("script");
e1.setAttribute('src','http://script.aculo.us/javascripts/scriptaculous.js');
e1.setAttribute('type', 'text/javascript');

var e2 = document.createElement("script");
e2.setAttribute('src','http://script.aculo.us/javascripts/prototype.js');
e2.setAttribute('type', 'text/javascript');

var x = document.evaluate(
    '//body/table',
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

//x.singleNodeValue.setAttribute('style','display:none');
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);   
    x.setAttribute('style','background-color:red');

}


}

function decorateLinks() {

var a_threadtitle = document.evaluate("//a[starts-with(@id,'thread_title')]", document, null, XPathResult.ANY_TYPE, null);

//var a2 = document.evaluate("/html/body/table[0]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//var thisa2 = a2.iterateNext();
//thisa2.setAttribute('style','display:none;'); 

/* Search the document for all h2 elements.  
 * The result will likely be an unordered node iterator. */

// var thisHeading = headings.iterateNext();
var thisThread = a_threadtitle.iterateNext();
 

var allLinks, allLinks2, thisLink, thisLink2 ;

allLinks2 = document.evaluate(
    '//span[starts-with(@onclick,"window")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


allLinks = document.evaluate(
    '//a[starts-with(@id,"thread_title")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i); 
    thisLink2 = allLinks2.snapshotItem(i);
  
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    div3.setAttribute('id', 'div3');
    div3.setAttribute('style', 'padding:20px;');
    
    div3.appendChild(div2);
    thisLink.parentNode.appendChild(div3);
    var tid = thisLink.getAttribute('id').substring(13,18);
    checkLink(tid, div2);

	var v = GM_getValue(tid, false);
if (v) {
 //alert(tid);
div3.setAttribute('style','background-color:beige;');

} else {
    GM_setValue(tid, true);
}

    thisLink.setAttribute('style','font-size:large;');
    thisLink.innerHTML += '/' + thisLink2.innerHTML;

     

    thisLink.setAttribute('onclick', 'new Effect.SwitchOff(\'div3\')');
} //endfor

} //end decoratelinks

function checkLink(id, LAST2) {
// /html/body/div/div/div/form/table[3]/tbody[2]/tr[5]/td[3]/div[2]/span
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.thecandidboard.com/forums/showthread.php?t=' + id,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
    },
    onload: function(responseDetails) {	 
  		var re = /a\shref=.attachment.php.attachmentid=([0-9]*)./g;

		while ((myArray = re.exec(responseDetails.responseText)) != undefined) {  			
  			var img2 = document.createElement("img");
			var a2 = document.createElement("a");
			a2.setAttribute('href', 'http://www.thecandidboard.com/forums/attachment.php?attachmentid=' + myArray[1]);
			a2.setAttribute('src', 'http://www.thecandidboard.com/forums/attachment.php?attachmentid=' + myArray[1] + '&thumb=1');

  			img2.setAttribute('src', 'http://www.thecandidboard.com/forums/attachment.php?attachmentid=' + myArray[1] + '&thumb=1');
			img2.setAttribute('style', 'padding:20px;');
  			a2.appendChild(img2);
			//LAST2.parentNode.appendChild(a2);
			LAST2.appendChild(a2);
			
			

		}
   	}
});

}




// ---------------
function save(savefile) {
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	} catch (e) {
		alert("Permission to save file was denied.");
	}
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath( savefile );
	if ( file.exists() == false ) {
		alert( "Creating file... " );
		file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420 );
	}
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
		.createInstance( Components.interfaces.nsIFileOutputStream );
	/* Open flags 
	#define PR_RDONLY       0x01
	#define PR_WRONLY       0x02
	#define PR_RDWR         0x04
	#define PR_CREATE_FILE  0x08
	#define PR_APPEND      0x10
	#define PR_TRUNCATE     0x20
	#define PR_SYNC         0x40
	#define PR_EXCL         0x80
	*/
	/*
	** File modes ....
	**
	** CAVEAT: 'mode' is currently only applicable on UNIX platforms.
	** The 'mode' argument may be ignored by PR_Open on other platforms.
	**
	**   00400   Read by owner.
	**   00200   Write by owner.
	**   00100   Execute (search if a directory) by owner.
	**   00040   Read by group.
	**   00020   Write by group.
	**   00010   Execute by group.
	**   00004   Read by others.
	**   00002   Write by others
	**   00001   Execute by others.
	**
	*/
	outputStream.init( file, 0x04 | 0x08 | 0x20, 420, 0 );
//	var output = document.getElementById('div3').value;

    var output = "her is some out";
	var result = outputStream.write( output, output.length );
	outputStream.close();

}

