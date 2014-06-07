/*

 * LJ Thread Unfolder

 * version 0.4.2

 * 2007-11-24

 * Copyright (c) 2005, Tim Babych, Copyright (c) 2007, MrMord

 * Homepage: http://clear.com.ua/projects/firefox/unfolder

 * Released under the GPL license

 * http://www.gnu.org/copyleft/gpl.html

 *

 * Branched 2006-09-09 by Henrik Nyh <http://henrik.nyh.se>

 * Added "Unfold all".

 *

 * Branched 2007-11-18 by MrMord <http://mrmord.livejournal.com>

 * Removed "Unfold all" and fixed script to work for "Smooth Sailing" layout

 * Will add extra features and cross compatibility if people are interested

 *

 * Update 2007-11-23 by MrMord
 * Fixed layout compatibility and unfolding options, unfold all works again

 * Researching recursive unfold

 *

 * Update 2007-11-24 by MrMord

 * Fixed compatibility with Opera, requires a greasemonkey userjs script found here: http://www.howtocreate.co.uk/operaStuff/userjs/aagmfunctions.js

 * Added insanejournal.com and greatestjournal.com to the included scripts page

 *

 * Update 2007-11-24 by MrMord

 * Made "unfold" link even more generic and able to work on even more layouts

 */



// ==UserScript==

// @name			LJ Thread Unfolder - Unfold All, All layouts 

// @namespace		http://mrmord.livejournal.com/1170.html

// @description		Expands nested discussion threads in place.

// @include			http://*.livejournal.com/*

// @include			http://*.insanejournal.com/*

// @include			http://*.greatestjournal.com/*

// @include			http://*.journalfen.net/*

// ==/UserScript==





/**

 * Insert "Unfold" links

 */
var threadIdRE	= /thread=(\d+)/;


var usernode	= '';

var validnode	= false;
var nodeTrue	= true;

var unfoldNodes	= [];
var allReplies	= $x("//div/a[contains(@href, '?thread')] | //td/a[contains(@href, '?thread')]");




// Loop through all instances that may need an "unfold" link

allReplies.forEach(function( thisReplyLink )

{

	// If there is a sibling node then we're on the right track!

	if ( thisReplyLink.nextSibling )

	{

		// Find the commentors username node

		usernode = thisReplyLink.nextSibling;

		while( !validnode && nodeTrue )

		{

			if ( usernode.nodeType == 1 )

			{

				if ( usernode.getAttribute( 'class' ) == 'ljuser' )

				{

					validnode = usernode;

				}

			}

			usernode = usernode.nextSibling;

				

			if ( usernode == undefined )

			{
				// Set to false to end the while loop gracefully

				nodeTrue = false;

			}

		}
		// Set to true so that the while loop can continue on the next iteration
		nodeTrue = true;

		

		// Display "unfold" link on hidden comments only (wip)

		if ( validnode )

		{

			t = document.createTextNode( ' - ' );

			thisReplyLink.parentNode.insertBefore( t, thisReplyLink.nextSibling );



			var threadId = thisReplyLink.href.match(threadIdRE)[1];

			var replyUrl = thisReplyLink.href.split( "#" )[0];



			a = document.createElement('A');

			with (a)

			{

				innerHTML = "Unfold";

				href = 'javascript:void(0)';

				addEventListener("click", unfold_click, false)

				setAttribute('thread_id', threadId);

				setAttribute('thread_href', replyUrl+'&format=light');

			}



			t.parentNode.insertBefore(a, t.nextSibling);

			unfoldNodes.push(a);

		

			d = document.createElement('div');

			d.style.display = 'none';

			d.id = 'thread_unfolder_temp_div_' + threadId;

			document.body.appendChild(d);

		

		} // End proper display statement

	}
	
	// Make validnode no longer valid (don't want false positives)
	validnode = false;

});





/**

 * Insert "Unfold all" link

 */

if ( unfoldNodes.length )

{

	// Find reply links that contain a <b> tag

	$x("//a[contains(@href, '?mode=reply')]/ancestor::b").forEach(function(b)

	{

		var comma = document.createTextNode(', ');

		b.appendChild(comma);

		

		var newA = document.createElement("A");

		with (newA)

		{

			innerHTML = "Unfold all";

			href = "javascript:void(0)";

			addEventListener("click", unfold_all, false);

		}

	

		b.appendChild( newA );

	});

}





/**

 * Unfolding functions

 */

function unfold_all()

{

	unfoldNodes.forEach( unfold_thread );

}



function unfold_click()

{

	unfold_thread( this );

}

 

function unfold_thread( link )

{

	with ( link )

	{

		className = 'unfold_thread';

		innerHTML = loader;

		blur();

	}

	elem = link;



	(function(elem) {



		GM_xmlhttpRequest({

			method: 'GET',

			url: link.getAttribute('thread_href'),

			onload: function( responseDetails )

			{

				dummy = document.getElementById('thread_unfolder_temp_div_'+elem.getAttribute('thread_id'));

				dummy.innerHTML = responseDetails.responseText.replace( /ljcmt/i, "ljunfold_cmnt" );

				reply = document.getElementById( 'ljunfold_cmnt'+elem.getAttribute( 'thread_id' ) );

				

				try

				{

					// get cell

					td = elem.parentNode;

				

					// Clear place holder

					td.innerHTML = '';



					// Add unfolded comment

					td.appendChild( reply );

				}

				catch(e)

				{

					

				}



				dummy.innerHTML = '';

			}



		}); // End xmlhttpRequest()



	})(elem);

}





/**

 * Loader Image in base64

 */

loader = '<style type="text/css">'+

'a.unfold_thread {color:black; text-decoration:none; cursor:default; }'+

'a.unfold_thread:hover {color:black; text-decoration:none; }'+

'a.unfold_thread img { border:none; }'+

'</style>'+

'<img border=0 src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+

'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+

'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'+

'fySDhGYQdDWGQyUhADs="> Loading...'





/**

 * Global Functions

 */

if( !Array.prototype.forEach )

{

	Array.prototype.forEach = function(callback,thisObject)

	{

		for(var i=0,len=this.length;i<len;i++)

			callback.call(thisObject,this[i],i,this)

	}

	

	Array.prototype.map = function(callback,thisObject)

	{

		for(var i=0,res=[],len=this.length;i<len;i++)

			res[i] = callback.call(thisObject,this[i],i,this);

		return res

	}

	

	Array.prototype.filter = function(callback,thisObject)

	{

		for(var i=0,res=[],len=this.length;i<len;i++)

			callback.call(thisObject,this[i],i,this) && res.push(this[i]);

		return res

	}

	

	Array.prototype.indexOf = function(searchElement,fromIndex)

	{

		var i = (fromIndex < 0) ? this.length+fromIndex : fromIndex || 0;

		for(;i<this.length;i++)

			if(searchElement === this[i]) return i;

		return -1

	}

	

	Array.prototype.lastIndexOf = function(searchElement,fromIndex)

	{

		var max = this.length-1;

		var i = (fromIndex < 0)   ? Math.max(max+1 + fromIndex,0) :

			(fromIndex > max) ? max :

			max-(fromIndex||0) || max;

		for(;i>=0;i--)

			if(searchElement === this[i]) return i;

		return -1

	}

	

	Array.prototype.every = function(callback,thisObject)

	{

		for(var i=0,len=this.length;i<len;i++)

			if(!callback.call(thisObject,this[i],i,this)) return false;

		return true

	}

	

	Array.prototype.some = function(callback,thisObject)

	{

		for(var i=0,len=this.length;i<len;i++)

			if(callback.call(thisObject,this[i],i,this)) return true;

		return false

	}

} // End Prototype additions



function $( id )

{

	return document.getElementById(id);

}



function $x( path, root )

{

	if (!root) root = document;

	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);

	return arr;

}



