// ==UserScript==
// @name           YahooGroups File Links
// @namespace      mikek3332002.wordpress.com
// @version        1.0 
// @description    Rewrites file links in yahoo groups (a) Have Sane Links (b)Don't time out the links
// @include        http://groups.yahoo.com/group/*/files/
// ==/UserScript==
//Licensed Under CC Attribution, Share Alike http://creativecommons.org/licenses/by-sa/3.0/au/deed.en 
//Author mikek3332002


//Grab all rows in the file table
var headings = document.evaluate('/html/body/div[3]/table/tbody/tr/td[2]/div[2]/div/table/tbody/tr/td[2]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//loop through each row
for( var row=0; row<headings.snapshotLength; row++)
{
   //grab hyperlink for the file
   var anchors = headings.snapshotItem(row).getElementsByTagName('a');
   for(var i=0 ; i< anchors.length ;i++)
   {
        //change the location of each href to the current location + inner text of the link
		//assumes filename is the inner text and the location bar point to the containing folder
		var location = anchors[i].getAttribute('href');
		var text = anchors[i].innerHTML
		anchors[i].setAttribute('href',window.location.href + text);
   }
}
