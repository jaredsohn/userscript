// ==UserScript==
// @name           Flickr You Rock CheckPlayTool
// @namespace      http://www.flickr.com/groups/you_rock/
// @description    A tool to check how many photos you played You Rock, v0.2
// @include        http://www.flickr.com/groups/you_rock/discuss/
// @include        http://flickr.com/groups/you_rock/discuss/
// ==/UserScript==

(function CheckPlay( )
{
	var CPStartTime = new Date( );
	var CPtoolversion = "V0.3";
	var CPtoolDBversion = "V0.3";

	addCPheader = function addCPheader( )
	{
		var topbar = thisdocument.getElementById( "TopBar" );
		var tables = topbar.getElementsByTagName( "table" );
		var trs = tables[ 0 ].getElementsByTagName( "tr" );
		var tds = trs[ 0 ].getElementsByTagName( "td" );
		
		var CPEndTime = new Date( );
		var CPExecutionTime = CPEndTime - CPStartTime;

		tds[ 1 ].innerHTML = "CheckPlay " + CPtoolversion + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[ 1 ].innerHTML;
	}


	function skipchallenge( name )
	{
		if ( name.match( "DAILY CHAT" ) == "DAILY CHAT" )
			return true; 
		if ( name.match( "OPEN" ) == "OPEN" )
			return false;
		if ( name.match( "VOTE" ) == "VOTE" ) 
			return false;
		return true;
	}

	CheckPlayClicked = function CheckPlayClicked( )
	{

		if ( GM_getValue( "CP.auto" ) == "true" )
			automode = true;
		else 
			automode = false;

		playernumber = 0;

		if (automode) 
  		{
			automode = false;
			GM_setValue( "CP.auto", "false" );
			automodetxt = "off";
		}
		else
		{
			automode = true;
			GM_setValue( "CP.auto", "true" );
			automodetxt = "on";
			ProcessMainDoc( );
		}

		checkplayperformed = true;

		link = document.getElementById( "CheckPlay" );
		link.innerHTML = "CheckPlay " + automodetxt; // +" (" + playername +")" ;

		return true;
	}


	function addchlgstatus( newchlgstatus, value )
	{
		// following changes can only occur in order below
		// set winner (before for loops)
		if ( ( newchlgstatus == "none" ) && ( value == "winner" ) ) 
			return "Excluded";
		// set for photoposter (first for loop)
		if ( ( newchlgstatus == "none" ) && ( value == "photoposter" ) ) 
			return "Player";
		if ( ( newchlgstatus == "Excluded" ) && ( value == "photoposter" ) ) 
			return "ErrExclPlay";
		// set for voter (second for loop)
		if ( ( newchlgstatus == "none" ) && ( value == "voter" ) ) 
			return "Voted";
		if ( ( newchlgstatus == "Excluded" ) && ( value == "voter" ) ) 
			return "Voted";
		if ( ( newchlgstatus == "ErrExclPlay" ) && ( value == "voter" ) ) 
			return "ErrExclPlay";
		if ( ( newchlgstatus == "Player" ) && ( value == "voter" ) ) 
			return "Player"; 
		if ( ( newchlgstatus == "Voted" ) && ( value == "voter" ) ) 
			return "Voted"; //catch a comment and a vote from same player
	}


	function setchlgstatuscolor( chlgstatus )
	{
		if ( chlgstatus == "OK" )
			return "Green";
		else if	 ( chlgstatus == "--VOTE--" )
			return "Orange";
		else if ( chlgstatus == "ErrExclPlay" )
			return "Red";	

		return "";
	}

	function setchlgstatustitle( chlgstatus )
	{
	 	if ( chlgstatus == "--VOTE--" ) 
			return "You haven't voted in this challenge yet... Please vote.";
		if ( chlgstatus == "OK" ) 
			return "This challenge is open to play and doesn't require voting yet.";
		if ( chlgstatus == "Excluded" ) 
			return  "You are excluded from entering this challenge, see rules for more information.";
		if ( chlgstatus == "Player" ) 
			return "You are a player in this challenge. Good luck!";
		if ( chlgstatus == "Voted" ) 
			return "You have voted in this challenge. Thank you.";
		if ( chlgstatus == "ErrExclPlay" ) 
			return "You are excluded from this challenge but did enter in it. Please have your entry removed";
		if ( chlgstatus == "---" )
			 return "This thread is closed or contains general information.";
		if ( chlgstatus == "Finished" ) 
			return  "Voting in this thread is finished. Please wait for a mod to close the challenge.";
		if ( chlgstatus == "Filled" ) 
			return "This challenge has 3 photos in it and is waiting to be set to vote by a mod/admin. You may vote in it already if you want.";
	}

	function getHighestVote( vote, splitvar )
	{
		highest = 0;
		votes = vote.split( splitvar );
		for ( i = 0; i < votes.length; i++ )
		{
			thisVote = parseInt( votes[ i ] );
			if ( thisVote > highest )
				highest = thisVote;
		}

		return highest;
	}


	function loadthread( thread, chlgname )
	{
		GM_xmlhttpRequest(
		{
			method:"GET",
			url:thread,
			headers:
			{		
				"User-Agent":"monkeyagent",
				"Accept":"text/monkey,text/xml"
			},
			onload:function( responseDetails ) 
			{
				content = responseDetails.responseText.split( '<div id="DiscussTopic">' )[ 1 ].split( '</div>' )[ 0 ];
				tables  = content.split( '<table' );
				chlgnum = chlgname.split( '<b>' )[ 1 ].split( " " )[ 0 ];
	           
				challengetxt = tables[ 1 ].split( 'says:' )[ 1 ].split( '<small>' )[ 0 ];
				tds = tables[ 2 ].split( '<td class' );
	           
				var newchlgstatus = "none";
				var bUpgradeChallenge = false;
				if ( chlgname.toUpperCase( ).match( "UPGRADE" ) == "UPGRADE" ) 
					bUpgradeChallenge = true;
	
				var bRockOnChallenge = false;
				if ( chlgname.toUpperCase( ).match( "ROCK ON" ) == "ROCK ON" )
					bRockOnChallenge = true;
	           
				challengetxtsplit = challengetxt.split( "challenge is open" );
				if ( challengetxtsplit.length > 1 && challengetxtsplit[ 1 ].match( "<b>" ) == ( "<b>" ) )
				{
					challengetxt = challengetxtsplit[ 1 ].split( "<b>" )[ 1 ].split( "<" )[ 0 ];
					if ( challengetxt.indexOf( playername ) != -1 ) 
						newchlgstatus = addchlgstatus( newchlgstatus, "winner" );
				}
	           
				lastimgplace = 2;
				photosposted = 0;
				var lastvote = "";
	           
				for ( i = 2; i < tds.length; i++ ) 
				{
					txt = tds[ i ];
	    
					if ( txt.match( "says" ) == "says" ) 
					{
						txt2 = txt.split( "</h4>" )[ 1 ].split( "<small>" )[ 0 ]; //check on 2nd part because of extra img title for admins
	
						if ( txt2.match( "img" ) == "img" )
						{
							// photo found, now get username
							photosposted++;
							photoposter = txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ];
							photoposter = photoposter.replace( /&amp;/g, "&" );
							if ( photoposter.indexOf( playername ) != -1 )
							{ 
								newchlgstatus = addchlgstatus( newchlgstatus, "photoposter" );
								playernumber++;
							}
							lastimgplace = i + 1;
						}
					}
				} // end of for
	
				// loop again for voters starting from just behind last image
				if ( chlgname.match( "VOTE" ) == "VOTE" )
				{
					for ( i = lastimgplace; i < tds.length; i++ )
					{
						txt = tds[ i ];
		    
						if ( txt.match( "says" ) == "says" )
		 				{
							voter = txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ].replace( /&amp;/g, "&" );
							if ( voter.indexOf( playername ) != -1 ) 
								newchlgstatus = addchlgstatus( newchlgstatus, "voter" );
		                 
							var ptag = txt.split( "<p>" )[ 1 ].split( "<small>" )[ 0 ];
							lastvote = ptag.split( "\t" )[ 8 ].split( "\t" )[ 0 ].replace( /&gt;/g, ">" );
								
							// inside challenge - decode last vote if no spaces
							var voteNoSpaces = parseInt( "9" + lastvote );
							if ( voteNoSpaces >= 9000 && voteNoSpaces <= 9999 )
							{
								voteNoSpaces -= 9000;
			
								vote1 = parseInt( voteNoSpaces / 100 );
								voteNoSpaces -= vote1 * 100;
			
								vote2 = parseInt( voteNoSpaces / 10 );
								voteNoSpaces -= vote2 * 10;
			
								vote3 = parseInt( voteNoSpaces );
								voteNoSpaces -= vote3;
			
								var splitvar = "-";
								lastvote = "" + vote1 + splitvar + vote2 + splitvar + vote3;
							}
			  			}
					} // end of for
		
					//check for finished votes
					if ( photosposted == 3 )
					{
						highestVote = getHighestVote( lastvote, splitvar );
						if ( bRockOnChallenge )
						{
							if ( highestVote >= 5 )
								newchlgstatus = "Finished";
						}
						else if ( bUpgradeChallenge )
						{
							if ( highestVote >= 5 )
								newchlgstatus = "Finished";
						}			
						else
						{
							if ( highestVote >= 5 )
								newchlgstatus = "Finished";
						}
					}
				} // end of if match vote
	             
				//overwrite some base statusses if challenge is in voting.
				if ( ( newchlgstatus == "none" ) && ( photosposted == 3 ) && ( chlgname.match( "OPEN" ) == "OPEN" ) ) 
					newchlgstatus = "Filled";
				if ( ( ( newchlgstatus == "none" ) || ( newchlgstatus == "Excluded" ) ) && ( chlgname.match( "VOTE" ) == "VOTE" ) ) 
					newchlgstatus = "--VOTE--";
				else if ( newchlgstatus == "none" ) 
					newchlgstatus = "OK";
	           
				//let's go and change the update status on screen
				var anchor = thisdocument.getElementById( "CP."+thread );
				anchor.innerHTML = newchlgstatus;
	           
				//if (newchlgstatus == "--VOTE--" ) 
				//	anchor.innerHTML = '<img src="http://www.lansing.lib.il.us/images/vote.gif" width="28" height="17">'; 
				if ( newchlgstatus == "Voted" ) 
					anchor.innerHTML = '<img src="http://www.flickr.com/images/icon_check.png" width="20" height="17">'; 
				if ( newchlgstatus == "OK" ) 
					anchor.innerHTML = 'OPEN'; 
				if ( newchlgstatus == "ErrExclPlay" ) 
					anchor.innerHTML = '<img src="http://www.flickr.com/images/icon_alert_big.png" width="22" height="17" border=0>'; 
				//if ( newchlgstatus == "Player" ) 
				//	anchor.innerHTML = '<img src="http://www.renosingles.net/images/Playing_Cards.gif" width="28" height="17" border=0>'; 
	           
				anchor.setAttribute( 'style', 'text-decoration: none; color: ' + setchlgstatuscolor( newchlgstatus ) );
				anchor.title = setchlgstatustitle( newchlgstatus );
	
				//if some statusses are reached, let's display a warning on screen
				if ( newchlgstatus == "ErrExclPlay" )  //ErrExclPlay
				{
					anchor = thisdocument.getElementById( "CheckPlayStatusDiv" );
					anchor.style.display = 'block';
					anchor = thisdocument.getElementById( "CheckPlayStatus" );
					anchor.innerHTML = "You entered a challenge you were excluded from (look for the '" +
						newchlgstatus + "' status and ask a mod/admin to remove " + 
						"this entry by leaving a message in Daily Chat";
					anchor.setAttribute( 'style', 'text-decoration: blink; font-weight:bold; color: Red' );
				}
				if ( playernumber == 3 )
				{
					anchor = thisdocument.getElementById( "CheckPlayStatusDiv" );
					anchor.style.display = 'block';
					anchor = thisdocument.getElementById( "CheckPlayStatus" );
					anchor.innerHTML = "You entered 3 challenges and have reached your maximum play limit!";
					anchor.setAttribute( 'style', 'text-decoration: none; color: Red' );
				}
				if ( playernumber > 3 )
				{
					anchor = thisdocument.getElementById( "CheckPlayStatusDiv" );
					anchor.style.display = 'block';
					anchor = thisdocument.getElementById( "CheckPlayStatus" );
					anchor.innerHTML = "You entered over 3 challenges and are thus breaking the rules! " + 
						"Please ask a mod/admin to remove your last entry by leaving a " +
						"message in Daily Chat";
					anchor.setAttribute( 'style', 'text-decoration: blink; font-weight:bold; color: Red' );
				}             
           		}
		}); // End GM_xmlhttpRequest
	} // end function loadthread

	ProcessMainDoc = function ProcessMainDoc( ) 
	{
		// select main table
		var main   = thisdocument.getElementById( "Main" );
		var tables = main.getElementsByTagName( "table" );
		var trs    = tables[ 2 ].getElementsByTagName( "tr" );

		// add new table header to the table
		if ( !checkplayperformed )
		{
			var tds = trs[ 0 ].getElementsByTagName( "th" );
			tds[ 3 ].width = "12%";
			myanchor = thisdocument.createElement( 'th' );
			myanchor.innerHTML = "CP-status";
			myanchor.width = "8%";
			myanchor.setAttribute( 'style', "text-align: center" );
			trs[ 0 ].appendChild( myanchor );
		}

		// let's loop the table and start processing
		var i = 0;
		for ( i = 1 ; i < trs.length; i++ )
		{
			chlgstatus = "UPDATING";
			insertstatus = true;
  
			tds = trs[ i ].getElementsByTagName( "td" );
			if ( statusposition == 0 )
				statusposition = tds.length;
  
			var anchor   = tds[ 0 ].getElementsByTagName( "a" )[ 0 ];
			var thread   = anchor.href;
			var chlgname = anchor.innerHTML;
  
			if ( skipchallenge( chlgname ) )
				chlgstatus = "---";
  
			mncommentcounter = tds[ 2 ].innerHTML;

			//if ( chlgstatus == "UPDATING" )
			//	loadthread( thread, chlgname );

			// add statusses  
			if ( chlgstatus == "UPDATING" ) 
			{   
				if ( !checkplayperformed ) 
					myanchor = thisdocument.createElement( 'a' );
				else 
					myanchor = thisdocument.getElementById( "CP."+thread );
 				myanchor.innerHTML = '<img src="http://l.yimg.com/www.flickr.com/images/pulser2.gif" ' +
                      	  		'alt="" width="21" height="10" border="0">';
				myanchor.id = "CP."+thread;
				myanchor.href = thread;
				myanchor.setAttribute( 'style', 'text-decoration: blink; color: Grey' );
				loadthread( thread, chlgname );
			}
			else 
			{   
				myanchor = thisdocument.createElement( 'a' );
				myanchor.innerHTML = chlgstatus;
				myanchor.title = setchlgstatustitle(chlgstatus);
				myanchor.id = "";
				myanchor.href = thread;
				myanchor.setAttribute( 'style', 'text-decoration: none' );
			}
  
			if ( !checkplayperformed ) //only on first pass we need to create new cells
			{
				mylink = trs[ i ].insertCell( statusposition );
				mylink.setAttribute( 'style',"text-align: center" );
				mysmall = thisdocument.createElement( 'small' );
				mysmall.appendChild( myanchor );
				mylink.appendChild( mysmall );
			}
		}

		checkplayperformed = true; //we've passed here at least once

		return;

	} // end of ProcessMainDoc

	// *******************
	// Start of processing
	// *******************

	if ( window.name == 'Log page' )
		return; //don't process log page

	//alert( 'start' );

	var thislocation = location;
	var thisdocument = document;
	var checkplayperformed = false;
	var playername = unsafeWindow.global_name;
	var automodetxt = "off";
	var playernumber = 0;
	var statusposition = 0;

	//alert( thislocation );

	// check if we have GM variables
	if ( GM_getValue( "CP.auto" ) == undefined )
		GM_setValue( "CP.auto", "true" );

	if ( GM_getValue ( "CP.auto" ) == "true" )
		automode = true;
	else
		automode = false;

	if ( automode )
		automodetxt = "on";

	// check themelist & chlgheaders

	if ( thisdocument.title.match( "discussion topics" ) == "discussion topics" )
	{
		// ************************
		// main You Rock page
		// ************************
		//alert( "in main" );
		  
		if ( automode ) 
			ProcessMainDoc( );
	}

	//add auto on/off link
	var Docmain   = thisdocument.getElementById( "Main" );
	var Doctables = Docmain.getElementsByTagName( "table" );
	var Doctrs    = Doctables[ 0 ].getElementsByTagName( "tr" );
	var Doctds    = Doctrs[ 0 ].getElementsByTagName( "td" );
	var Docp      = Doctds[ 1 ].getElementsByTagName( "p" );

	myanchor = thisdocument.createElement( 'img' );
	myanchor.setAttribute( 'src', 'http://l.yimg.com/www.flickr.com/images/subnavi_dots.gif' );
	myanchor.setAttribute( 'alt', '' );
	myanchor.setAttribute( 'height', '11' );
	myanchor.setAttribute( 'width', '1' );
	Docp[ 0 ].appendChild( myanchor );

	myanchor = thisdocument.createElement( 'a' );
	myanchor.innerHTML = "CheckPlay " + automodetxt; // +" (" + playername + ")" ;
	myanchor.href = "#";
	myanchor.id = "CheckPlay";
	myanchor.setAttribute( 'onClick', 'return false;' );
	myanchor.addEventListener( 'click', function eventclickmain(e) { CheckPlayClicked(); },	false );
	Docp[ 0 ].appendChild( myanchor );

	mydiv = thisdocument.createElement( 'div' );
	mydiv.style.display = 'none';
	mydiv.id = "CheckPlayStatusDiv";
	Doctds[ 1 ].appendChild( mydiv );

	myanchor = thisdocument.createElement( 'p' );
	myanchor.id = "CheckPlayStatus";
	myanchor.innerHTML = "CheckPlay statusfield";
	myanchor.setAttribute( 'style', 'text-decoration: none; color: Red' );
	mydiv.appendChild( myanchor );
	
	addCPheader( );

	return;

	// *******************
	//  End of processing
	// *******************

})();