// ==UserScript==
// @name          Tradera user ban
// @description   Adds link to do fast user ban (Spärra budgivare)
// @include       http://www.tradera.com/auction/auction.aspx*
// @include       http://www.tradera.com/trader/trader_grade.aspx*
// ==/UserScript==

//
// Written by Fredrik Sjögren, May 2007. No rights reserved.
//

//
// Some code borrowed from the script by Henrik Nyh, http://userscripts.org/scripts/show/1668
//




var alias = '';

//
// Find alias for user in link <a href="http://www.tradera.com/trader/trader_grade.aspx?ftgnr=XXX">YYY</a> (YYY is alias)
//

links = document.getElementsByTagName('a');

for (var i = 0; i < links.length; i++)
{
  var link = links.item(i);
  
  if (link.href.indexOf("http://www.tradera.com/trader/trader_grade.aspx?ftgnr=") != -1)
  { 
    alias = link.innerHTML;
    	 
    break;
  }
}

//
// If alias found, add ban link.
//

if (alias != '')
{
   for (var i = 0; i < links.length; i++) 
   {
      var link = links.item(i);
	
  	   if (link.href.indexOf("/trader/trader_memorylist_add.aspx?aid=") != -1)
	   { 	
		   // Create a link
		   var rLink = document.createElement('a');
		   rLink.href = 'http://www.tradera.com/trader/block_user.aspx?alias=' + alias;
		   rLink.appendChild(document.createTextNode('Spärra budgivaren'));
		
		   // Icon
		   var img = document.createElement('img');
		   img.src = 'http://www.tradera.com/images/block_bidder.gif';
		
		   // Create and populate table cells
		   var td = document.createElement('td');
		   td.appendChild(img);
		   var td2 = document.createElement('td');
			td2.appendChild(rLink);
			   
		   // Create and populate table row
		   var tr = document.createElement('tr');
		   tr.appendChild(td);
		   tr.appendChild(td2);
		   		
		   // Insert table row
		   link.parentNode.parentNode.parentNode.appendChild(tr);
		   
		   break;
	   }
	   else if (link.href.indexOf("/category/auctionlist_trader.asp?ftgnr=") != -1) 
	   {
  		   // Create a link
		   var rLink = document.createElement('a');
		   rLink.href = 'http://www.tradera.com/trader/block_user.aspx?alias=' + alias;
		   rLink.appendChild(document.createTextNode('Spärra budgivaren'));
		
		   // Icon
		   var img = document.createElement('img');
		   img.src = 'http://www.tradera.com/images/block_bidder.gif';
		
		   // Create and populate table cell
		   var td = document.createElement('td');
		   td.className = 'f11';
		   td.height = '20';
		   td.appendChild(img);
		   td.appendChild(document.createTextNode(' '));
			td.appendChild(rLink);
			   
		   // Create and populate table row
		   var tr = document.createElement('tr');
		   tr.appendChild(td);
		
		   // Insert table row
		   link.parentNode.parentNode.parentNode.appendChild(tr);
		   
		   break;
	   }
   }
}

//
// Adjust the layout
//

imgs = document.getElementsByTagName('img');

for (var i = 0; i < imgs.length; i++)
{
  var img = imgs.item(i);
  
  if (img.src.indexOf("/images/grades_linkwindow_left.gif") != -1 || img.src.indexOf("/images/grades_linkwindow_right.gif") != -1)
  { 
     var width  = img.width;
     img.height = img.height + 26;
     img.width  = width;
  }
}
