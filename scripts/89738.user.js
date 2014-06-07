// ==UserScript==
// @name           Xbox.com Forum Cleaner
// @namespace     *.xbox.com
// @description    Cleans up the xbox forums after Nov 2010 'update'. Makes Unread/Read posts different, changes Forums link to go to My Forums, and expands post width on rhs. Hides troll posts.
// @include    http://*.xbox.com/*
// ==/UserScript==
// 29 October, 2010
// Neillydun 

var fontFamily='Candara,Arial,sans-serif;';
var readPostColour = 'color:#a49d7e';  // Use an online RGB colour picker to set a colour you like 

// Name ID of link to Forums in global (xbox.com) drop-down menu. View page source, find 'Forums' link and insert 'name' value
var forumsElementId = "en_US_4_3";     // For US Site
//var forumsElementId = "en_GB_4"      // For UK Site

// Gamertag array of known Xbox.com forum trolls/idiots. Format: trollList = new Array('GT1','GT2',..,'GTn');
//var trollList = new Array('EXIT 909', 'NY722');
var trollList = new Array();

function cleanup() {

	// Replaces global 'Forums' link with link to 'My Forums'
	replaceForumsLink();
	
	// Expand post width to fill area
	addCss('div.postBody {width: 720px!important;}');
	addCss('div.report {width: 720px !important;}');
	addCss('div#subjArea {width: 720px !important;}');
	addCss('div#bodycolumn {background-image:url("http://209.85.62.24/326/148/0/p371641/bodycolumn.png")!important;}');
	addCss('hr {background-color: #141414!important;border: 0;color: #141414!important;}');
	
	// Set read topics (class = 'lnk3' ) to different colour
	addCss('a.lnk3 {color:#a49d7e !important;}');
	colourReadLastPostNames();

	//If Troll List is not empty, hide the listed trolls
	if(trollList.length > 0){
	   hideTrolls(trollList);
	}
};

function replaceForumsLink() {
	// Link name is that used by the US forums, so might vary on which version you use.
	// Just view the page source and search for 'Forums', and use the associated Name
	var link = document.getElementsByName(forumsElementId)[0];
	link.href = 'http://forums.xbox.com/user/MyForums.aspx';
};


function addCss(cstring) {
	var bdy = document.getElementById('bodycolumn');
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cstring;
	bdy.appendChild(newCss);
};

function colourReadLastPostNames(){
    
	// Find table instances of read posts (indicated by 'lnk3')
	var tables = document.evaluate("//a[@class='lnk3']/ancestor::tr[2]",document,null,6,null);

	var i = 0;
	while( (ref = tables.snapshotItem(i) ) != null) {   
	  //Only interested in profile links of the Last Post section
	  var links = document.evaluate(".//a[contains(@href,'Profile')]",
                      ref, null,
                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        
	  var k = 0;
	  while ((link = links.snapshotItem(k)) != null) {
	    // Set the colour of the name link
	    links.snapshotItem(k).setAttribute('style', readPostColour);
	    k++;
	  }
	  i++;
	}
}; 

function hideTrolls(listOfTrolls){

	for(e=0;e<listOfTrolls.length;e++){
    
	  XPath = '//iframe[contains(.,"'+ listOfTrolls[e] +'")]/ancestor::table[1]';
	  var trollElements = document.evaluate(XPath,document,null,6,null); 
	  var i = 0;
	  while( (ref = trollElements.snapshotItem(i) ) != null) {   
	    ref.style.display = 'none';
	    i++
	  }
	}
};


window.addEventListener("load", function() { cleanup() }, false);
