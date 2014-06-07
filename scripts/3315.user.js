// ==UserScript==
// @name           Linkify Library Elf
// @namespace      http://userscripts.org/people/4764
// @description    turn the Title text on LibraryElf into a link to your local library
// @include        http://libraryelf.com/Items.aspx*
// ==/UserScript==

// This method transforms an item's title into a title search back at
// the library, since the Library Elf doesn't retain the URLs.
// The methods below work for the Waterloo Public Library (www.wpl.ca), but it shouldn't
// be hard to adapt for other sites.
// If Elf displays items from your library as "title / author(s)", the only thing that might
// need to be changed is the makeTitleUrl method.
function  makeTitleUrl(title)
{
   const titleUrlPattern = 'http://books.wpl.ca/search~S3/?searchtype=t&searcharg=%TITLE%&searchscope=3&searchlimits=';

   var urlTitle = title.replace(' [DVD]', '');
   return titleUrlPattern.replace('%TITLE%', urlTitle);
}

function xpath(query, node) 
{
   return document.evaluate(query, node, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

allItemRows = xpath(".//tr[@class='trItem' or @class='trItemAlt']", document);
for ( var i = 0; i < allItemRows.snapshotLength; ++i )
{
   var row = allItemRows.snapshotItem(i);
   try
   {
      // the item's title & author live in the third column of the table
      var titleCell = xpath('td[3]', row).snapshotItem(0);
      var item = titleCell.firstChild.nodeValue;
      var matches = item.match(/([^/]+[^/\s]+)(\s*[/].*)/);
      if ( matches )
      {
         var rest = matches[2];
         var url = makeTitleUrl(matches[1]);
         var newItem = document.createElement('td');
         newItem.innerHTML = '<td><a href="' + url + '">' + matches[1] + '</a> ' + rest + '</td>';
      
         row.replaceChild(newItem, titleCell);
      }
   }
   catch (e)
   {
      GM_log('encountered error: ' + e.message);
   }
}
