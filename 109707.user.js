// ==UserScript==
// @name           mute quote
// @namespace      http://www.kvraudio.com/forum/
// @include        http://www.kvraudio.com/forum/viewtopic.php*
// ==/UserScript==

var foes = [ "*" , '*' , '*' , "*" , "*" ];
//       Edit the bit above, replace asterisks with user names on your foe list
//       e.g. [ "*" , '*' , '*' , "*" , "*" ] -> [ "muted guy" , "right bastard" , "sometroll" , "*" , "*" ] 

//       Add more if necessary.

//       For efficiency, you can delete unused fields in the foes array.















// ============= general stuff ===========================================

// inArray function, from https://mahtonu.wordpress.com/2010/04/01/inarray-in-javascript/ 
Array.prototype.inArray = function( value ) { var i; for ( i = 0; i < this.length; i++ ) { if ( this [ i ] == value ) { return true; } } return false; };
// convert foes array to lowercase (i.e. make it case insensitive)
for ( var i = 0; i < foes.length; i++ ) { foes[ i ] =  foes[ i ].toLowerCase(); }


//============= hide foe posts in print view ================================

if ( document.URL.match(/[\?&]view=print/) ) { 
	
	//get all posts
	var allPosts, thisPost, postAuthor; 
	allPosts = document.evaluate( "//div[@class='post']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	// check for foe posts
	for ( var i = 0; i < allPosts.snapshotLength ; i++ ) {
		thisPost = allPosts.snapshotItem( i );
		// find post author
		postAuthor = thisPost.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerHTML;
		// if author is a foe, ditch the post
		if ( foes.inArray(postAuthor.toLowerCase()) ) {
			thisPost.innerHTML="<b>"+postAuthor+"</b> wrote something but is on your ignore list.";
		}
	}
}


//============= hide quotes from foes ====================================

// find all quotes
var allQuotes, thisQuote;
allQuotes = document.evaluate( "//cite", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

// check for foe quotes
for ( var i = allQuotes.snapshotLength-1; i >= 0; i-- ) { // reverse order to prevent script from crashing on nested quotes
	thisQuote = allQuotes.snapshotItem( i );
	// if author is a foe, ditch the quote
	if ( foes.inArray( thisQuote.innerHTML.slice( 0, -7 ).toLowerCase() ) ) {
		thisQuote.parentNode.innerHTML = "    <b>"+thisQuote.innerHTML.slice( 0, -7 )+"</b> wrote something but is on your ignore list.";
	}
}


//============= THE END! =============================================