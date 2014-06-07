// ==UserScript==
// @name          FatWallet Sage de-n00ber
// @namespace     http://webwesen.com
// @description   Based on the digg de-n00ber script. Filters out deals with negative rating.
// @include       file://*sage.html
// ==/UserScript==

// TODO link to text only : http://www.fatwallet.com/forums/textthread.php?catid=52&threadid=573709 instead of http://www.fatwallet.com/t/52/573709

( function() {
 
	var fw_filter = new Object();
        
	fw_filter.init = function () 
	{
	
		var parent = document.createElement ( "div" );
		parent.id = "parent";
	
		document.getElementById ( "rss-header" ).appendChild ( parent );

		var hiddenStories = new Array();
		var fontSize = ".9em";
		var xpathResult = document.evaluate("//div[@class = 'item']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
 
		for ( var n = 0 ; n < xpathResult.snapshotLength ; n++ )
		{
			story = xpathResult.snapshotItem ( n );
			var title = document.evaluate ( "div[@class = 'item-desc']/text()" , story , null , XPathResult.STRING_TYPE , null ).stringValue;
   
			var tt = title.split ( /Rating: /g );

			if ( tt[1] < 0 ) 
			{
				hiddenStories.push ( story );
				story.style.border = "solid 1px #ccc";
				story.style.background = "#fff";
				story.style.display = "none";
			} 
			else // if ( story.style.display == "none" ) 
			{
				if ( tt[1] > 10 )
				{
					story.style.border = "solid 1px red";
					story.style.background = "#fdd";
				}
				else if ( tt[1] > 5 )
				{
					story.style.border = "solid 1px blue";
					story.style.background = "#ddf";
				}
				else if ( tt[1] > 1 )
				{
					story.style.border = "solid 1px green";
					story.style.background = "#dfd";
				}
				else if ( tt[1] >= 0 )
				{
					story.style.background = "#ffffdd";
					story.style.border = "solid 1px #bbb";
				}

				story.style.display = "block";
			}
		}
 
		var container = document.createElement ( "div" );
		container.id = "fw_filter_head";
		container.style.paddingTop = "10px";
		container.style.color = "yellow";
    
		var span = document.createElement ( 'span' );
		container.appendChild ( span );
	
		if ( hiddenStories.length == 0 )
		{
			span.appendChild ( document.createTextNode ("No negative rating posts found." ) );
		} 
		else 
		{
			var b = document.createElement ( "b" );
			b.appendChild ( document.createTextNode ( hiddenStories.length ) );
			span.appendChild ( b );

			if ( hiddenStories.length == 1 ) 
			{
				var post_string = "deal";
			}
			else 
			{
				var post_string = "deals";
			}
  
			span.appendChild ( document.createTextNode ( " " + post_string + " hidden " ) );
  
			var toggle = document.createElement ( 'span' );
			toggle.className = 'tool';
   
			var a = document.createElement ( "a" );
			a.appendChild(document.createTextNode ( "Show all deals" ) );
			a.style.cursor = "pointer";
			a.style.textDecoration = "underline";
            
			a.addEventListener ( 'click', function () 
			{
				if ( this.textContent == "Show all deals" ) 
				{
					var newText = "Hide negative rating deals";
					var display = "block";
				}
				else 
				{
					var newText = "Show all deals";
					var display = "none";
				}
      
				for ( var i = 0; story = hiddenStories[i]; i++ ) 
				{
					story.style.display = display;
				}

				this.textContent = newText;
			}, true);
   
			toggle.appendChild ( a );
			container.appendChild ( toggle );
		}
  
		parent.insertBefore ( container , parent.firstChild );
	};

	var rss_title = document.evaluate ( "//div[@id = 'rss-header']/h1/a" , document , null , XPathResult.STRING_TYPE , null ).stringValue;
	var fw_regex = /^Fatwallet/g;
	
	if ( fw_regex.test ( rss_title ) )
		fw_filter.init ();
	else
		exit ();
}) ();

