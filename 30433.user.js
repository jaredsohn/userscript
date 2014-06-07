// ==UserScript==
// @name           GoalLineBlitz Friends List
// @namespace      http://goallineblitz.com
// @description    A script that allows you to easily build and add a list of friends on Goal Line Blitz to your GLB home page.
// @include        http://goallineblitz.com/game/home.pl*
// ==/UserScript==


// URLs that we'll need...
var sAvatarLink = '/game/user_pic.pl?user_id=';
var sFriendLink = '/game/home.pl?user_id=';
var sMessageLink = '/game/new_message.pl?to=';

// Figure out if we are on our home page or another users profile.
var sURL = window.location.search;
var nUser = ( sURL.search( /user_id=/ ) >=0 ) ? sURL.substring( 9 ) : 0;
GM_log("\nUser ID: #" + nUser );

// Call the appropriate function.
if( nUser )  OtherUserPage( nUser );
else MyUserPage( sURL );


/***************************************************************************************\
 * This is the function that gets called when you are on your own GLB user page.
\***************************************************************************************/
function MyUserPage( sURL )
{
	var aFriend;
	//GM_setValue( "friends", "173631:8668:75443:12162:146710:" );
	if( GM_getValue( "friends" ) )
		aFriend = GM_getValue( "friends" ).split( ":" );
	else
		aFriend = new Array();

	// Check to see if we're adding a new friend.
	var nUser = ( sURL.search( /add_friend=/ ) >=0 ) ? sURL.substring( 12 ) : 0;
	if( nUser )
	{
		GM_log( "\nAdd Friend #[" + nUser + "]" );
		aFriend.push( nUser );
	}

	// Check to see if we're removing an existing friend.
	nUser = ( sURL.search( /remove_friend=/ ) >=0 ) ? sURL.substring( 15 ) : 0;
	if( nUser )
	{
		GM_log( "\nRemove Friend #[" + nUser + "]" );
		for( var i = 0; i < aFriend.length; i++ )
			if( aFriend[i] == nUser )  
			{
				aFriend.splice( i, 1 );
				aFriend.pop();
				break;
			}
	}

	// Add the empty friend block to the page...
	var main;
	main = document.getElementById('teams');
	if( main ) 
	{
		var newElement = document.createElement('div');
		newElement.innerHTML = '<div class="medium_head">My Friends</div>'
							 + '<div id="friend_div" class="content_container friend"'
							 + '     style="display:block;margin-right:10px;width:100%;height:140px;margin-bottom:10px;">';
							 + '</div><div class="clear" style="height:10px;">&nbsp;<br/></div>';
		main.parentNode.insertBefore( newElement, main );
	}

	// Loop through our list of friends.
	var aXmlHttp = new Array( aFriend.length );
	var sFriends = "";
	for( var j = 0; j < aFriend.length; j++ )
	{
		if( j ) sFriends += ":";
		sFriends += aFriend[j];
		GM_log( "\nAdding Friend: ["+j+"], ["+aFriend[j]+"], ["+sFriends+"]" );
		
		// Spawn off an XML HTTP Object to go grab our friend's home page.
		aXmlHttp[j] = new XMLHttpRequest();
		aXmlHttp[j].open( 'GET', sFriendLink+aFriend[j], true );
		aXmlHttp[j].onreadystatechange = xmlHttpRequestCallback( aXmlHttp[j], aFriend[j] );
		aXmlHttp[j].send( null ); 
	/*************************************************\
	\*************************************************/
	}
	GM_setValue( 'friends', sFriends );

	GM_log( "\nFriends: [" + GM_getValue('friends') + "]" );
	
}


/***************************************************************************************\
 * This function is called on "other users" pages.  It adds a link to the page to allow
 *  you to add that user to your friend list.
\***************************************************************************************/
function OtherUserPage( nUser )
{	
	// See if this user is already on your friend list.
	var bAlreadyFriend = false;
	var sFriends = "" + GM_getValue( "friends" );
	var aFriend = sFriends.split( ":" );
	for( var i = 0; i < aFriend.length; i++ )
		if( aFriend[i] == nUser ) bAlreadyFriend = true;

	// Build the link to add or remove this user as a friend.
	var oAccountTable = document.getElementById( 'my_account_content' );
	var eRow = document.createElement("tr");
	eRow.innerHTML = "<tr><td colspan='2'>";
	if( bAlreadyFriend )
		eRow.innerHTML += "<a href='/game/home.pl?remove_friend="+nUser+"'>Remove Friend</a>";
	else
		eRow.innerHTML += "<a href='/game/home.pl?add_friend="+nUser+"'>Add as Friend</a>";
	eRow.innerHTML += "</td></tr>";

	// Add the link to the users profile section.
	oAccountTable.getElementsByTagName("tbody")[0].appendChild( eRow );
}


/***************************************************************************************\
 * This is the function called by the HTTP Request Object when it is done loading.  It
 *  will scrape our friends home page for the info we need.
 *
 * FireFox limits the number of XMLHttpRequests to 6:
 *   http://developer.mozilla.org/en/docs/XMLHttpRequest#Limited_number_of_simultaneous_XMLHttpRequest_connections
\***************************************************************************************/
function xmlHttpRequestCallback( oXH, nFriendId )
{
	return function()
	{
		try
		{
			if( oXH.readyState == 4 || oXH.readyState == "complete" )
			{
				// Find the beginning of the table.
				var nPos = 0;
				nPos = oXH.responseText.indexOf('<table id="my_account_content">');

				// Lop off the preceeding characters.
				var sTableBlock = oXH.responseText.substring( nPos );

				// Find the end of the table.
				nPos = sTableBlock.indexOf('</table>') + 8;
				// Lop off the trailing characters.
				sTableBlock = sTableBlock.substring( 0, nPos );

				// Load the account table substring into an XML DOM.
				var parser = new DOMParser();
				var xmlDoc = parser.parseFromString(sTableBlock,"text/xml");			

				// Find all the TD elements in the account table.
				var aTDs = xmlDoc.getElementsByTagName("td");

				// The second TD in the table is user ID, fourth is last logon. 
				GM_log( "\nFriend #"+nFriendId+" - name:["+aTDs[1].firstChild.data+"], "
					  + "last action:["+aTDs[3].firstChild.data+"]" );

				// Add the Friend Div to the page.
				var eDiv = document.createElement("div");
				eDiv.setAttribute("style", "float:left;text-align:center;padding:7px;width:80px;");
				eDiv.innerHTML = '<a href="' + sFriendLink + nFriendId + '"'
				               + ' style="text-decoration:none;">'
						       + '<img src="' + sAvatarLink + nFriendId  + '"'
						       + ' style="border:1px solid black;width:75px;height:75px;">' 
						       + '  <br/>'+aTDs[1].firstChild.data+'<br/>' 
						       + aTDs[3].firstChild.data + '</a>';
				document.getElementById('friend_div').appendChild(eDiv);			
			}
		}
		catch(e)
		{
			GM_log( "\nName: " + e.name
			      + "\nMesg: " + e.message );
		}
	}
}