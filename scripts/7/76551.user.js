/*
    IJ Light Links Rewriter
    
    This script rewrites entry and month list links on IJ to display
    the light format.

    Thank you to:
    Patrick Cavit, pcavit@gmail.com
    http://patcavit.com

    from whose Google Image Relinker this script is base.  He, in turn, 
    thanks Eric Hamiter, since the GIR is just a quick modification of 
    his extension at:
    http://roachfiend.com/
    
    Also thanks to Dive Into Greasemonkey's Guide:
    
    http://diveintogreasemonkey.org/
    
    COPY, USE, MODIFY, and SPREAD as you see fit.
    
    CURRENT LOCATION: http://skittisheclipse.com/geek/greasemonkey/ljlightlinks.user.js
*/

// ==UserScript==
// @name                IJ Light Links Rewriter
// @namespace       http://tearex.nfshost.com/gm/
// @description       Rewrites applicable IJ links to point to the "light" format version of the page.
// @attribution        Firefoxfey (http://skittisheclipse.com/geek/greasemonkey/ljlightlinks.user.js)
// @contributor       Firefoxfey (http://skittisheclipse.com/geek/greasemonkey)
// @contributor		Nox (http://userscripts.org/users/Nox)
// @include       http://*.insanejournal.com/*
// ==/UserScript==

(function() 
{
  //Text for the link back to using the regular style
  var heavy_link_text = ""
  
  //Selects nodes in the document with the required characteristics in xpath
  function selectNodes(doc, context, xpath) 
  {
     var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     var result = new Array( nodes.snapshotLength );
     
     for (var x=0; x<result.length; x++) 
     {
        result[x] = nodes.snapshotItem(x);
     }
     
     return result;
  }
  
  //This nifty little function will add a get option to a link. If the option
  // already exists, its value will be replaced.
  function addLinkOption( link, name, value )
  {
    //GM_log( 'addLinkOption: '+link+' with value "'+value+'" for get option "'+name+'"' );
    
    //If there's an anchor tag, split it off; we'll add it at the end
    var split = link.split("#");
    link = split[0];
    var anchor = split[1];
    
		//If there's a trailing ? at the end of our URL now, we'll remove it
		// since there's no more options if there's nothing after the ?
		if( link.charAt( link.length - 1 ) == '?' )
		{
			//GM_log( "Trailing ? found" );
			link = link.substr( 0, link.length-1);
		}
		
    //If we already have a question mark, options already exist
    if( link.match(/\?/) )
    {
      //GM_log( '? found; determining whether option already exists' );
      
      //Split off the options from the URL
      var split = link.split("?");
      var URL = split[0];
      var options = split[1];
      
      //We're looking for this pattern to determine if the option exists
      var pattern = '(\\?|&)'+name;
      
      //GM_log('looking for existing option with pattern: "'+pattern+'"');
      
      var regex = new RegExp( pattern );
      
      if( link.match(regex))
      {
        //If we've found the pattern, this regex will help us replace the 
        // option's current value with the new value
        var pattern = '(\\?|&)'+name+'=([^&]+)';
        var regex = new RegExp( pattern );
        var replace = "$1"+name+"="+value;
        
        //GM_log( 'pattern to replace: "'+pattern+'" with "'+replace+'"' );
        
        link = link.replace( regex, replace );
        
        //GM_log( 'option replaced; returning '+link );
      }
      else
      {
        //We haven't found the option, so it's okay to add it onto the end
        link += '&' + name + '=' + value;
        //GM_log( name+' not found; returning '+link );
      }
    }
    else
    {
      //No current options--add the ? and the option
      link += '?' + name + '=' + value;
      //GM_log( 'No current get options; returning '+link );
    }
    
    //If the anchor exists, add it back on with its #
    if( anchor != undefined )
    {
       link += '#' + anchor;
    }
    
    //Tada!  We can return our link now.
    return link;
  }
  
  //This function will remove a get option from a URL
  function removeLinkOption( link, option_name )
  {
    //This pattern will identify the parts of an option that would need
    // to be removed if it was found--note that only & is marked for
    // removal if it exists.  If there is a trailing ?, we will deal
    // with it later.  This pattern will also remove the option as a name
    // by itself--the value part is optional
    var pattern = '(&)?'+option_name+'(=[^&]+)?';
    var regex = new RegExp( pattern );
    
    //If there's an anchor tag, split it off; we'll add it at the end
    var split = link.split("#");
    link = split[0];
    var anchor = split[1];
    
    //GM_log('Removing pattern "'+pattern+'" from link: '+link );
    
    //We replace what we find with nothing
    link = link.replace( regex, "" );
    
    //If there's a trailing ? at the end of our URL now, we'll remove it.
    if( link.charAt( link.length - 1 ) == '?' )
    {
      //GM_log( "Trailing ? found" );
      link = link.substr( 0, link.length-1);
    }
    
    //If the anchor exists, add it back on with its #
    if( anchor != undefined )
    {
       link += '#' + anchor;
    }
    
    //GM_log( "Link is now: "+link );
    
    //Tada!  We can return our link now.
    return link;
  }
  
  //for ease of reference
  doc = window.document;
  
  // Get a list of all A tags that point to entry pages--which end in .html
  var LJEntryLinks = selectNodes(doc, doc.body, "//A[contains(@href,'.html')][contains(@href,'insanejournal.com')]");
  
  //IF WE'RE ON A FORMAT=LIGHT PAGE, OFFER A LINK WITHOUT FORMAT=LIGHT
  
  //Our currennt location's URL.  Use this to analyze what else we
  // should add to the page.
  var url = doc.location.href;
  
  //GM_log( "Working with URL: "+url );
  
  //REWRITE ALL ENTRY LINKS
  for (var x=0; x<LJEntryLinks.length; x++) 
  {
    LJEntryLinks[x].href = addLinkOption( LJEntryLinks[x].href, "format", "light");
  }
  //END REWRITE ALL ENTRY LINKS
  
  //REWRITE ALL CALENDAR MONTH LIST LINKS
  var months=["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  
  for( var month=0; month<months.length; month++ )
  {
    var contains="//A[contains(@href,'/"+months[month]+"/')][contains(@href,'insanejournal.com')]";
    var LJMonthListLinks = selectNodes(doc, doc.body, contains);
    
    for (var x=0; x<LJMonthListLinks.length; x++) 
    {
      //only rewrite if we match a calendar month link
      if( LJMonthListLinks[x].href.match(/\/[0-9]{4}\/[0-9]{2}\/$/) )
      {
        //GM_log( "Rewriting: "+LJMonthListLinks[x].href );
        LJMonthListLinks[x].href = addLinkOption( LJMonthListLinks[x].href, "format", "light");
      }
      else
      {
        //GM_log( "NOT rewriting: "+LJMonthListLinks[x].href );
      }
    }
  }
  //END REWRITE ALL CALENDAR MONTH LIST LINKS
  
  //If we're on a format=light page, we want to add a link somewhere that
  // will link to the same page without format=light
  // Doing this AFTER the rewrites so we don't accidentally overwrite our link
  if( url.match( "format=light" ) )
  {
    //GM_log( "This is a format=light page" );
    //Remove the format option from the link
    var new_link = removeLinkOption( url, "format" );
    //GM_log( "Heavy link would be: "+new_link );
    
    //This link will link to the styled format--or, the link minus format=light
    var heavy_link = document.createElement('a');
    heavy_link.setAttribute('href', new_link);
    heavy_link.appendChild( document.createTextNode(heavy_link_text));
    
    //Let's bold the link to make it easy to see
    var heavy_bold = document.createElement('b');
    heavy_bold.appendChild( heavy_link );
    heavy_link = heavy_bold;
    
    if( url.match( /[0-9]+\.html/ ) ) //for entry pages
    {
      //GM_log( "Inserting heavy link for an entry page" );
      
      //Insert right after the the next link
      var find_next_page = selectNodes( doc, doc.body, "//A[contains(@href,'dir=next')]");
      
      //It returns an array--our link is at the first index
      var find_next_page_link = find_next_page[0];
      
      //Inserting before the next sibling will insert after the next page button
      find_next_page_link.parentNode.insertBefore( heavy_link, find_next_page_link.nextSibling );
      
      //Insert a space for niceness
      find_next_page_link.parentNode.insertBefore( document.createTextNode(" "), heavy_link );
    }
    else if( url.match(/\/[0-9]{4}\/[0-9]{2}\/[?#]?/) ) //for month calendar pages
    {
      //GM_log( "Inserting heavy link for a calendar page" );
      
      //want to find the image and go from there
      find_next_page = selectNodes( doc, doc.body, "//IMG[contains(@src,'btn_next.gif')]");
      
      //Want to get the table cell containing the next page button
      // and add a cell after it
      // IMG->A->B->TD = three parent nodes
      var find_next_page_cell = find_next_page[0].parentNode.parentNode.parentNode;
      
      //GM_log( "Cell tag: "+find_next_page_cell.tagName ); //doublecheck
      
      //test the link!  Why is it still format=light!?
      //GM_log( "Heavy Link Href: "+heavy_link.getAttribute('href') );
      
      //Make a cell to add after the next page cell
      var heavy_cell = document.createElement('td');
      heavy_cell.appendChild( heavy_link );
      
      //Inserting before the next page cell's next sibling will insert
      // the link after the next page button
      find_next_page_cell.parentNode.insertBefore( heavy_cell, find_next_page_cell.nextSibling );
    }
		
		var pattern = '#(cutid[0-9]+)';
		var regex = new RegExp( pattern );
		
		if( url.match( regex ) ) //if we're in an LJ-cut, insert one there too
		{
			//GM_log( "URL is an LJ-cut" );
			
			//get what cut ID we're under
			var match = regex.exec( url );
			var cutid = match[1];
			
			//GM_log( "CutID: " + cutid );
			
			var cutlink = selectNodes(doc, doc.body, "//A[contains(@name,'"+cutid+"')]");
			cutlink = cutlink[0];
			
			//This link will link to the styled format--or, the link minus format=light
			var cut_heavy_link = document.createElement('a');
			cut_heavy_link.setAttribute('href', new_link);
			cut_heavy_link.appendChild( document.createTextNode("( "+heavy_link_text+" )"));
			
			//Let's bold the link to make it easy to see
			var heavy_bold = document.createElement('b');
			heavy_bold.appendChild( document.createTextNode( " " ));
			heavy_bold.appendChild( cut_heavy_link );
			heavy_bold.appendChild( document.createTextNode( " " ));
			cut_heavy_link = heavy_bold;
			
			cutlink.parentNode.insertBefore( cut_heavy_link, cutlink );
		}
  }
})();
