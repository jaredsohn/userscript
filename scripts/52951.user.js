// ==UserScript==
// @name           Drudge Style
// @namespace      http://userscripts.org/users/89142
// @description    Updates the lack of style on the Drudge Report so it looks cleaner
// @version        1.8
// @include        http://www.drudgereport.com*
// @include        http://drudgereport.com*
// ==/UserScript==

// Version History:
// 1.0 - initial release
// 1.1 - improved image handling, changed default font
// 1.2 - fixed columns due to website change
// 1.3 - added code to remove bottom links (enhanced version of DrudgeReport script)
// 1.4 - updated handling for removing bottom links
// 1.5 - updated error handling and fixed 3rd column
// 1.6 - removed some bottom links that were added & removed the annoying red flash-update that's been implemented
// 1.7 - Fixed due to change in the page.
// 1.8 - Added version number

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}




/* Removes the built in gray column seperators */
var members = document.getElementsByTagName('td');
if (members.length > 0){
	for(var i=0; i< members.length; i++){
		if(members[i].width == 3){
			//alert(members[i].src);
			members[i].parentNode.removeChild(members[i]);
		}
	}
}



/* Changes the style elements for the tags */
addGlobalStyle(
	'a {font-family:Verdana,Helvetica,serif;font-weight:normal }' + 
	'a:link {text-decoration: none; border-bottom:0px;}' + 
	'a:visited {text-decoration: none; border-bottom:0px;}' + 
	'a:hover {text-decoration: none; border-bottom:0px;}' + 
	'td {background-color:#EEEEEE; width:33%; padding:10px;border:1px solid #555555;}' +
	'table {border-spacing: 10px;}' +
	'table.agTable {display:none;}' +
	'table * img {display:block; margin:auto;margin-bottom:-1.5em;width:100%;max-width:300px;max-height:500px;}'
);



/* Remove the crap at the bottom of the page */
var src = document.body.innerHTML;
var buffer = "";

var first  = src.indexOf("drudgeTopHeadlines") - 9;
var second = src.indexOf("SECOND COLUMN BEGINS HERE",first) - 5;
var third  = src.indexOf("THIRD COLUMN",second) - 5;

var firstlinks  = src.indexOf("JavaScript Tag",first) - 4;
var secondlinks = src.indexOf("L I N K S      S E C O N D     C O L U M N", firstlinks) - 5;
var thirdlinks  = src.indexOf("JavaScript Tag",secondlinks) - 4;

//alert(first+"-"+firstlinks+"   +   "+second+"-"+secondlinks+"   +   "+third+"-"+thirdlinks);
//alert(src.substring(first,firstlinks));
if(first > 50 && second > 50 && third > 50 && firstlinks > 50 && secondlinks > 50 && thirdlinks > 50){
	buffer = src.substring(first,firstlinks) + src.substring(second,secondlinks) + src.substring(third,thirdlinks);
	document.body.innerHTML = buffer;
}



/* Removes annoying DrudgeUpdater */
var metaCollection = document.getElementsByTagName("META");
for (var i = 0; i < metaCollection.length; i++) {
	metaCollection[i].parentNode.removeChild(metaCollection[i]);
}