// ==UserScript==
// @name		Flickr Super Hero Challenge admin tool
// @namespace		http://www.flickr.com/groups/superchallenge/
// @description		An admin tool for the Flickr Super Hero Challenges group - V0.1
// @version		0.1
// @identifier	
// @date		03/09/2009
// @creator		Allan Bruce (charminbayurr)
// 
// @include		http://www.flickr.com/groups/superchallenge/discuss/*
// @include		http://www.flickr.com/groups/superchallenge/discuss/
// @include		http://flickr.com/groups/superchallenge/discuss/*
// @include		http://flickr.com/groups/superchallenge/discuss/
// @include		http://www.flickr.com/groups_newtopic.gne?id=1134256@N23
// @include		http://*flickr.com/photos/*/*
// @include		http://*flickr.com//photos/*/*
// @include		http://www.flickr.com/groups/superchallenge/discuss/*/edit/
// @exclude		http://www.flickr.com/groups/superchallenge/discuss/*/lock/
//
// ==/UserScript==
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------

(function superadmintool( ) 
{
	var superStartTime = new Date( );
	var supertoolversion = "V0.1";
	var supertoolDBversion = "V0.1";

	var topicidpos = 9;
	var postidpos = 10;

	var help1;
	var help2;

	var iChallengeVoteScore = 5;
	var sChallengeVoteScore = "" + iChallengeVoteScore;

	var iUpgradeChallengeVoteScore = 10;
	var sUpgradeChallengeVoteScore = "" + iUpgradeChallengeVoteScore;

	var iRockOnVoteScore = 10;
	var sRockOnChallengeVoteScore = "" + iRockOnVoteScore;

	//global variables for adding new challenges
	var challengetxtval = [ '',											// 0
				'Error uploading header from the back room, please use copy paste to update.',		// 1
				'Error uploading header from the back room, please use copy paste to update.' ];	// 2

	var challengetxtnode;

	challengethemeval = [ 	'',
				'ERROR loading themes from backroom',
				'Please update theme manually',
				'' ];

	var challengethemenode;

	//global variables for adding medals
	var val = [ '',															//0

		'<a href="http://www.flickr.com/groups/superchallenge/">'
		+ '<img src="http://farm4.static.flickr.com/3357/3548796568_35777e5c83_t.jpg" width="175" height="150"" />'
		+ '</a>'
		+ '\n~~ Congratulations! ~~'
		+ '\nThis Super Image shows Heroic Talent! <a href="http://www.flickr.com/groups/superchallenge/">'
		+ '<b>Super Hero Challenge Group</b>!'
		+ '\nPlease post it to our pool.</a>',											//1

		'<a href="http://www.flickr.com/groups/superchallenge/">'
		+ '<img src="http://static.flickr.com/2472/3548796564_6e17c87f74_m.jpg"  />'
		+ '</a>'
		+ '\n~~ Congratulations! ~~'
		+ '\nSuper Congratulations! This image has defeated other hero winners and has attained ULTRA HERO status! <a href="http://www.flickr.com/groups/superchallenge/">'
		+ '<b>Super Hero Challenge Group</b>!'
		+ '\nPlease post it to our pool.</a>']											//2


	var node;
	var processforsuper;

	// *******************
	// start of some help functions copied out of inline forum post edit (steeev)
	// *******************

	function TrimString( str ) 
	{
		str = str.replace( /^[\s]+/, '' ); // Trims leading spaces
		str = str.replace( /[\s]+$/, '' ); // Trims trailing spaces
		return str;
	}

	function $x( xpath, root ) 
	{
		var doc = root ? ( root.evaluate ? root : root.ownerDocument ) : document;
		var got = doc.evaluate( xpath, root || doc, null, 0, null ), next;
		var result = [ ];
		while( next = got.iterateNext() )
		{
			result.push( next );
		}
		return result;
	}

	function detectNoSpaces( vote )
	{
		// inside challenge - decode last vote if no spaces
		var voteNoSpaces = parseInt( "9" + vote );
		var result = vote;
		if ( voteNoSpaces >= 9000 && voteNoSpaces <=9999 )
		{
			voteNoSpaces -= 9000;

			vote1 = parseInt( voteNoSpaces / 100 );
			voteNoSpaces -= vote1 * 100;

			vote2 = parseInt( voteNoSpaces / 10 );
			voteNoSpaces -= vote2 * 10;

			vote3 = parseInt( voteNoSpaces );
			voteNoSpaces -= vote3;

			var splitvar = "-";
			result = "" + vote1 + splitvar + vote2 + splitvar + vote3;
			GM_log( "vote with no spaces detected! " + result );
		}
		return result;
	}

	// *******************
	// start of checkskipchallenge
	// *******************

	function checkskipchallenge( text )
	{
		var csc=0; 

		var checktext = new Array();
		checktext[ 0 ] = "Daily Chat";
		checktext[ 1 ] = "The Mother of All Challenge Groups Staff";
		checktext[ 2 ] = "The Mother of the Month Winners";
		checktext[ 3 ] = "The Rules of the Game";
		checktext[ 4 ] = "Definitions of Terms";
		checktext[ 5 ] = "super FAQ";
		checktext[ 6 ] = "Mother of the Month - Grand Mother Winners Only!";
		checktext[ 7 ] = "INFORMATION";
		checktext[ 8 ] = "Information";
		checktext[ 9 ] = "information";

		var bMatch = false;
		for ( csc = 0; csc < checktext.length; csc++ )
		{
			if ( text.match( checktext[csc] ) == checktext [ csc ] )
			{
				bMatch = true;
				break;
			}
		}

		return bMatch;

	}

	// *******************
	// end of checkskipchallenge
	// *******************


	// *******************
	// start of convert to time functions
	// *******************

	function getTimeAgo( challengeopentime )
	{
		var addhours = 0;
		var splittext = "";
		if ( challengeopentime.match( "AM" ) == "AM" )
		{
			splittext = "AM";
		}
		else
		{
			splittext = "PM";
			addhours = 12;
		}
		var time = challengeopentime.split( splittext )[ 0 ];
		var date = challengeopentime.split( splittext )[ 1 ];
		date = date.substr( 2, date.length );
		var dateportions = date.split( " " );
		date = dateportions[ 0 ] + " " + dateportions[ 1 ] + " " + dateportions[ 2 ] + " ";
		
		if ( addhours > 0 )
		{
			var timeportions = time.split( ":" );
			time = "" + ( parseInt( timeportions[ 0 ] ) + addhours ) + ":" + timeportions[ 1 ];
		}
		date += time;
		var challengeopendate = Date.parse( date );
		return challengeopendate;
	}

	function converttoseconds( elaps )
	{
		if ( elaps == " " )
		{
			return elaps; //return if nothing filled in
		}

		var t = 0;
		timevalue = elaps.split( " " )[ 0 ];

		if ( elaps.match( "moment" ) == "moment" ) t = 0;
		else if ( elaps.match( "second" ) == "second" ) t = timevalue;
		else if ( elaps.match( "minute" ) == "minute" ) t = ( timevalue - 0.5 ) * 60;
		else if ( elaps.match( "hour" ) == "hour" ) t = ( timevalue - 0.5 ) * 60 * 60;
		else if ( elaps.match( "day" ) == "day" ) t = ( timevalue - 0.5 ) * 60 * 60 * 24;
		else if ( elaps.match( "week" ) == "week" ) t = ( timevalue - 0.5 ) * 60 * 60 * 24 * 7;
		else if ( elaps.match( "month" ) == "month" ) t = ( timevalue - 0.5 ) * 60 * 60 * 24 * 7 * 30;

		return t;
	}

	function converttotime( elaps )
	{
		if ( elaps == " " )
		{
			return elaps; //return if nothing filled in
		}

		var mytime = new Date( );
		var t = 0;
		supertime = superStartTime.getTime( );
		timevalue = elaps.split( " " )[ 0 ];

		if ( elaps.match( "moment" ) == "moment" ) t = supertime;
		else if ( elaps.match( "second" ) == "second" ) t = supertime - timevalue * 1000;
		else if ( elaps.match( "minute" ) == "minute" ) t = supertime - ( timevalue - 0.5 ) * 1000 * 60;
		else if ( elaps.match( "hour" ) == "hour" ) t = supertime - ( timevalue - 0.5 ) * 1000 * 60 * 60;
		else if ( elaps.match( "day" ) == "day" ) t = supertime - ( timevalue - 0.5 ) * 1000 * 60 * 60 * 24;
		else if ( elaps.match( "week" ) == "week" ) t = supertime - ( timevalue - 0.5 ) * 1000 * 60 * 60 * 24 * 7;
		else if ( elaps.match( "month" ) == "month" ) t = supertime - ( timevalue - 0.5 ) * 1000 * 60 * 60 * 24 * 7 * 30;

		mytime.setTime( t );
		x = mytime.toString( );

		split1 = x.split( " " )[ 0 ];
		split2 = x.split( " " )[ 5 ];

		y = x.split( split1 + " " )[ 1 ].split( split2 )[ 0 ];
		z = y.split( ":" )[ 0 ] + ":" + y.split( ":" )[ 1 ] + " " + y.split( " " )[ 4 ];

		return z;
	}

	// *******************
	// end of convert to time function
	// *******************


	// *******************
	// start of award functions
	// *******************

	Award = 
	{
		init: function Awardinit()
		{
			if (GM_getValue("super.postedcomment")=="true")
			{
				//alert('in set tag');
				var tagtext = "";
				if ( GM_getValue( "super.postedmedal" ) == "1" ) tagtext = "Hero Winner"; //currently no tags set yet
				if ( GM_getValue( "super.postedmedal" ) == "2" ) tagtext = "Ultra Hero Winner";

				document.getElementById( 'addtagbox' ).value = tagtext;
				if ( tagtext != "" ) 
				{
					//document.getElementById( 'tagadderform' ).submit( );
					document.getElementById( 'tagadderform' ).elements[ 2 ].click( );

				}
				GM_setValue( "super.postedcomment", "false" );
				return;
			}

			processforsuper = false;
			if ( ( document.referrer.match( "superchallenge/discuss" ) == "superchallenge/discuss" ) ||
				 ( document.referrer.match( "superchallenge/discuss" ) == "superchallenge/discuss" ) ||
				 ( GM_getValue( "super.paginate" ) == "true" )	) 
			{
				processforsuper = true;
				
				GM_setValue( "super.paginate", "false" ); // switch off paginateswitch
				this.textarea = document.getElementById( 'DiscussPhoto' ).getElementsByTagName( 'TEXTAREA' )[ 0 ];
				posts = document.getElementById( 'DiscussPhoto' ).innerHTML;
				if ( posts.match( '<div class="Paginator">' ) == '<div class="Paginator">' )
				{
					alert( "photo has more then 1 page of posts, please check all pages" );

					//start checking for click on page hrefs to catch click on next page    
					window.addEventListener ( 'mousedown', function eventawardclickme(e) { Award.clickme (e); }, false );
				}
				// Check for medals
				chcktxt = '/groups/super';
				chcktxt21 = 'You have beaten two other Medal Winners and earned:';
				chcktxt22 = 'Your photo finished second in You Rock';
				chcktxt3 = 'Your photo won unanimously in You Rock'; //newer platinum
				alerttxt  ="";

				if ( ( posts.match( chcktxt ) == chcktxt ) ) 
				{
					if ( posts.match( chcktxt21 ) == chcktxt21 )
					{
						var since = posts.split( chcktxt21 )[ 1 ].split( "Posted" )[ 1 ].split( "ago" )[ 0 ];
						alerttxt = alerttxt + "PHOTO HAS MEDAL" +	"\nPosted" + since + "ago.";
					}
					else if( posts.match( chcktxt22 ) == chcktxt22 )
					{
						var since = posts.split( chcktxt22 )[ 1 ].split( "Posted" )[ 1 ].split( "ago" )[ 0 ];
						alerttxt = alerttxt + "PHOTO HAS MEDAL" + "\nPosted" + since + "ago.";
					}
					else if ( posts.match( chcktxt3 ) == chcktxt3 ) 
					{
						var since = posts.split( chcktxt3 )[ 1 ].split( "Posted" )[ 1 ].split( "ago" )[ 0 ];
						alerttxt = alerttxt + "\n\nPHOTO HAS MEDAL" + "\nPosted" + since + "ago.";
					}
					else if ( ( posts.match( chcktxt ) == chcktxt ) && ( posts.match( chcktxt4 ) == chcktxt4 ) ) 
					{
						var since = posts.split( chcktxt4 )[ 1 ].split( "Posted" )[ 1 ].split( "ago" )[ 0 ];
						alerttxt = alerttxt + "\n\nPHOTO HAS MEDAL" + "\nPosted" + since + "ago.";
					}
				}

				if ( alerttxt != "" )
				{
					alert( alerttxt );
				}

				// Check for public
				photoid = unsafeWindow.page_photo_id;
				if ( unsafeWindow.global_photos[ unsafeWindow.page_photo_id ].isPublic == 0 ) 
				{
					alert( "PHOTO SEEMS NOT TO BE PUBLIC, PLEASE CHECK" );
				}

				// Create medal award box
				var n = document.createElement ( 'SELECT' );

				n.addEventListener ( 'change', function eventawardchangeaward(e) { Award.insertAward (); }, false );

				n.innerHTML = '<option value="0"></option>'
					+ '<option value="1">Hero medal</option>'
					+ '<option value="2">Ultra Hero medal</option>';		

				//GM_log(document.getElementById ('DiscussPhoto').innerHTML);

				this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
				this.textarea.parentNode.insertBefore( document.createTextNode( 'super Awards: ' ), this.textarea );
				this.textarea.parentNode.insertBefore( n, this.textarea );
				this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
				this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );

				node = n;

				//code to trap post button

				document.getElementById( 'btn_post_comment' ).addEventListener( 'mousedown', function postcommentclickme(e) { Award.clickpostcomment (e); }, false );
			}

			// GM_log(document.getElementById ('DiscussPhoto').innerHTML);

		},

		insertAward: function Awardinsert( )
		{
			this.textarea.value = val[ node.value ] + this.textarea.value;
			GM_setValue( "super.postedmedal", node.value );
		},

		clickpostcomment: function Awardclickpostcomment( )
		{
			//alert( 'in postcomment' );       
			GM_setValue( "super.postedcomment", "true" );
		},

		clickme: function Awardclickme( e ) 
		{
			//GM_log( "process: " + processforsuper );
			if ( processforsuper )
			{
				var targ;
				if ( !e ) 
				{
					var e = window.event;
				}

				if ( e.target ) 
				{
					targ = e.target;
				}
				else if ( e.srcElement )
				{
					targ = e.srcElement;
				}
				if ( targ.nodeType == 3 ) // defeat Safari bug
				{
					targ = targ.parentNode;
				}

				var tname = targ.tagName;
				reference = targ.href;
				if ( tname == "A" )
				{
					if ( reference.match( "/page" ) == "/page" )
					{
						GM_setValue( "super.paginate", "true" );
						//GM_log( tname + " : " + reference );
					}
					//alert( "You clicked on a " + tname + " element." );
				}
			}
		}
	}

	// *******************
	// end of award functions
	// *******************


	// *******************
	// Start of load theme list
	// *******************

	function loadthemelist( )
	{
		d = new Date( );
		thistime = d.getTime( ).toString( );
		GM_setValue( "super.themelisttime", thistime );

		GM_log( "super: Started loading new themelist (in background)" );

		var url = "http://www.flickr.com/groups/1129391@N22/discuss/72157619266773244/";

		GM_xmlhttpRequest(
			{
				method:"GET",
				url:url,
				headers:
				{
					"User-Agent":"monkeyagent",
					"Accept":"text/monkey,text/xml"
				},
				onload:function( responseDetails ) 
				{
					themelist = responseDetails.responseText.split( "===Start of theme list===" )[ 1 ].split( "===End of theme list===" )[ 0 ];
					var themearray = new Array( );
					themearray = themelist.split( "<br />" ); //into array
					themestring = themearray.join( "||" ).replace( /\n/g, "" ); //cleanup
					GM_setValue( "super.themelist", themestring );
					challengethemeval = themestring.split( "||" );

					GM_log( "super: Loading new themelist complete" );
				}
			} );
	}

	// *******************
	// end of load theme list
	// *******************

	// *******************
	// Start of load challenge headers
	// *******************

	function loadchlgheader( )
	{
		d = new Date( );
		thistime = d.getTime( ).toString( );
		GM_setValue( "super.themelisttime", thistime );

		GM_log( "super: Started loading new challengeheaders (in background)" );

		var url = "http://www.flickr.com/groups/1129391@N22/discuss/72157620829573582/?locked=1";

		GM_xmlhttpRequest(
		{
			method:"GET",
			url:url,
			headers:{
				"User-Agent":"monkeyagent",
				"Accept":"text/monkey,text/xml"
		},

		onload:function( responseDetails ) 
		{
			var headernormal = responseDetails.responseText.split( "<b>Regular Theme Header</b><br />" )[ 1 ];
			headernormal = headernormal.split( "<small>" )[ 0 ];			
			headernormal = headernormal.replace( "\n", "", "g" ).replace("\r","","g");
			headernormal = headernormal.replace( "<br />", "" );  //remove first <br />
			headernormal = headernormal.replace( "<br />", "\n", "g" );
			headernormal = headernormal.replace( "&lt;", "<", "g" );
			headernormal = headernormal.replace( "&gt;", ">", "g" );
			headernormal = headernormal.replace( "&amp;", "&", "g" );
			headernormal = headernormal.replace( "&quot;", '"', "g" );
			headernormal = headernormal.replace( "1796", sChallengeVoteScore, "g" );
			headernormal = headernormal.replace( "1784", sChallengeVoteScore, "g" );
			headernormal = headernormal.substr( 0, headernormal.length-2 );  //remove trailing \n's
			GM_setValue( "super.normalchlgheader", headernormal );

			var headermedal = responseDetails.responseText.split( "<b>Ultra Hero Challenge Header</b><br />" )[ 1 ];
			headermedal = headermedal.split( "<small>" )[ 0 ];
			headermedal = headermedal.replace( "\n", "", "g" ).replace( "\r", "", "g" );
			headermedal = headermedal.replace( "<br />", "" );  //remove first <br />
			headermedal = headermedal.replace( "<br />", "\n", "g" );
			headermedal = headermedal.replace( "&lt;", "<", "g" );
			headermedal = headermedal.replace( "&gt;", ">", "g" );
			headermedal = headermedal.replace( "&amp;", "&", "g" );
			headermedal = headermedal.replace( "&quot;", '"', "g" );
			headermedal = headermedal.replace( "1796", sChallengeVoteScore, "g" );
			headermedal = headermedal.replace( "1784", sChallengeVoteScore, "g" );
			headermedal = headermedal.substr( 0, headermedal.length-2 );  //remove trailing \n's
			GM_setValue( "super.medalchlgheader", headermedal );		

			GM_log( "super: Loading new challengeheaders complete" );
		}} ); // end GM_xmlhttpRequest

	}

	// *******************
	// end of load challenge headers
	// *******************



	// *******************
	// Start of bump me up
	// *******************

	function submittext( )
	{
		try
		{
			foundforms = unsafeWindow.document.forms;
			myform = false;
			for ( i = 0; i < foundforms.length; i++ )
			{
				//GM_log(foundforms[ i ].action);
				//GM_log(foundforms[ i ].innerHTML);
				if ( foundforms[ i ].action.match( "/groups/superchallenge/" ) == "/groups/superchallenge/" ) 
				{
					myform = true;
					formnumber = i;
					break;
				}
			}

			if ( myform )
			{
				unsafeWindow.document.forms[ formnumber ].message.value = "Bump to the top";
				unsafeWindow.document.forms[ formnumber ].submit( );
				GM_setValue( "super.bumping", "true" );
			}
			else
			{
				alert( "Can't find a reference to super group, No input form available?" );
				GM_setValue( "super.bumping", "false" );
			}
		}
		catch ( err )
		{
			alert( "something went wrong during bump posting.\nCould be missing posting form" );
			alert( "debug info: myform = " + myform + ", formnumber = " + formnumber );
			GM_setValue( "super.bumping", "false" );
		}
	}

	bumpmeup = function bumpmeup( ) 
	{
		// post a message

		var url = thislocation.href;

		if ( GM_getValue( "super.bumping" ) == "finished" )
		{
			GM_setValue( "super.bumping", "false" );
			newurl = url.split( "discuss" )[ 0 ] + "discuss/";
			thislocation.replace( newurl );
			return;
		}

		if ( ( url.match( "#comment" ) != "#comment" ) && ( url.match( "delete" ) != "delete" ) )
		{
			//alert( "phase1\n" + url );
			submittext( );
		}
		else if ( url.match( "#comment" ) == "#comment" )
		{
			//alert( "phase2\n" + url );
			if ( GM_getValue( "super.bumping" ) == "false" )
			{
				//came here from a '#comment' url while bump was clicked
				//so execute first phase bump code
				submittext( );
			}
			else 
			{
				newurl = url.replace( "#comment", "" ) + "/delete/";
				newurl = newurl.replace( "page2/", "" );
				newurl = newurl.replace( "page3/", "" );
				newurl = newurl.replace( "page4/", "" );
				thislocation.replace( newurl );
			}
		}
		else // on a page with delete in url
		{
			if ( GM_getValue( "super.bumping" ) == "false" )
			{
				//came here from a 'deleted' url while bump was clicked
				//so execute first phase bump code
				submittext( );
			}
			else
			{
				//alert( "phase3\n" + url );
				try
				{
					foundforms = unsafeWindow.document.forms;
					myform = false;
					for ( i = 0; i < foundforms.length; i++ )
					{
						//GM_log( foundforms[ i ].action );
						//GM_log( foundforms[ i ].innerHTML );
						if ( foundforms[ i ].action.match( "/groups/superchallenge/" ) == "/groups/superchallenge/" )
						{
							myform = true;
							formnumber = i;
							break;
						}
					}

					if ( myform )
					{
						unsafeWindow.document.forms[ formnumber ].submit( );
						GM_setValue( "super.bumping", "finished" );       
					}
					else
					{
						alert( "Can't find a the confirm delete button" );
						GM_setValue( "super.bumping", "false" );
					}
				}
				catch ( err )
				{
					alert( "something went wrong during delete phase./nCould be missing delete button" );
					alert( "debug info: myform = " + myform + ", formnumber = " + formnumber );
					GM_setValue( "super.bumping", "false" );
				}
			}
		}

		return;
	}

	initbumpall = function initbumpall( )
	{
		GM_setValue( "super.bumpAllMethod", "All" );
		GM_setValue( "super.bumpAllNr", 1 )
		GM_setValue( "super.bumpAllState", "processing" ); 
		bumpall( );
	}

	initbumpopen = function initbumpopen( )
	{
		GM_setValue( "super.bumpAllMethod", "Open" );
		GM_setValue( "super.bumpAllNr", 1 )
		GM_setValue( "super.bumpAllState", "processing" ); 
		bumpall( );
	}

	bumpall = function bumpall( )
	{
		if ( GM_getValue( "super.bumpAllState" ) == "processing" )
		{
			var iChallenge = parseInt( GM_getValue( "super.bumpAllNr" ) );
	
			for ( ; iChallenge <= 12; iChallenge++ )
			{
				GM_setValue( "super.bumpAllNr", "" + ( iChallenge + 1 ) );
				var sBase = "super." + ( iChallenge < 10 ? "0" : "" ) + iChallenge;
				var sKey = sBase + ".threadnr";
				var sThreadNr = GM_getValue( sKey );
				var sStatus = GM_getValue( sBase + ".chlgstatus" );

				if ( ( GM_getValue( "super.bumpAllMethod" ) == "All" && ( sStatus == "VOT" || sStatus == "OK" ) ) ||
				     ( GM_getValue( "super.bumpAllMethod" ) == "Open" && decodeURIComponent( GM_getValue( sBase + ".status" ) ).match( " OPEN " ) == " OPEN " ) )
				{
					var sBumpURL = thislocation.href.split( "/discuss/" )[ 0 ] + "/discuss/" + sThreadNr;
					thislocation.replace( sBumpURL );
					GM_setValue( "super.bumping", "true" );
					return;
				}
			}

			var dailyChatURL = GM_getValue( "super.DailyChatUrl" );
			if ( dailyChatURL != "" && GM_getValue( "super.bumpAllMethod" ) == "All" )
			{
				GM_setValue( "super.bumping", "true" );
				GM_setValue( "super.DailyChatUrl", "" );
				thislocation.replace( dailyChatURL );
				return;
			}
		}

		GM_setValue( "super.bumpAllState", "done" );		
		alert( "Done Bumping " + GM_getValue( "super.bumpAllMethod" ) + "!" );
		runsuperTool( );
	}

	// *******************
	// End of bump me up
	// *******************

	// *******************
	// Start of display functions
	// *******************

	function checkvotes( challenge, verbose ) 
	{
GM_log( "checking: " + challenge );

		var mylist = new Array();

		mylist[ 0 ] = "super.01";
		mylist[ 1 ] = "super.02";
		mylist[ 2 ] = "super.03";
		mylist[ 3 ] = "super.04";
		mylist[ 4 ] = "super.05";
		mylist[ 5 ] = "super.06";
		mylist[ 6 ] = "super.07";
		mylist[ 7 ] = "super.08";
		mylist[ 8 ] = "super.09";
		mylist[ 9 ] = "super.10";
		mylist[ 10 ] = "super.11";

		myalert1 = "";
		alert1count = 0;
		myalert2 = "";
		myalert = "";

		var x = 0;

		for ( x in mylist ) 
		{
			voted=false;
			othertovotetime = new Date( "Jan 01, 2900 01:00:00" ); //init date

			if ( ( GM_getValue( mylist[ x ] + ".chlgstatus" ) != "FIN" ) && ( GM_getValue( mylist[ x ] + ".chlgstatus" ) != "WT" ) )
			{
				ddtovotetime = GM_getValue( mylist[ x ] + ".tovotetime" );
				if ( ddtovotetime != " " )
				{
					othertovotetime = new Date( GM_getValue( mylist[ x ] + ".tovotetime" ) );
				}

				//alert( mylist[ x ] + "\n" + othertovotetime );

				for ( voter = 1; voter <= 3; voter++ )
				{
					ddphototime = new Date( GM_getValue( challenge + ".photo" + voter + "time" ) );
					ddphoto = decodeURIComponent( GM_getValue( challenge + ".photo" + voter ) );

					if ( othertovotetime < ddphototime )
					{
						//alert( "checking photo" + voter );
						for ( num = 1; num <= 3; num++ )
						{
							if ( ddphoto == decodeURIComponent( GM_getValue( mylist[ x ] + ".photo" + num ) ) ) 
							{
								voted = true;
								break;
							}
						}

						if ( decodeURIComponent( GM_getValue( mylist[x]+".photovoter" ) ).indexOf ( ddphoto ) !=-1 ) 
						{
							voted=true;
						}

						if ( voted == false ) 
						{
							myalert2 = myalert2 + ddphoto + " did possibly not vote in challenge " + mylist[ x ].split( "." )[ 1 ] + " yet.\n";
						}

						voted = false;
					}
				}

			} // end of if chlgstatus == OK

			if ( GM_getValue( mylist[ x ] + ".chlgstatus" ) == "UPD" ) 
			{
				myalert1 = myalert1 + mylist[ x ].split( "." )[ 1 ] + " ";
				alert1count++;
			}

		} // end of challengesfor

		if ( verbose )
		{
			if ( alert1count > 1 ) 
				myalert1 = "Challenges " + myalert1 + "have";
			else if ( alert1count != 0 ) 
				myalert1 = "Challenge " + myalert1 + "has";
	
			if ( myalert1 != "" ) 
				myalert = myalert1 + " status UPD!\n" + "Update all challenges for a good votecheck\n\n";
			if ( myalert2 != "" ) 
				myalert = myalert + 
					myalert2 + "\nPlease check votes in these challenges and make sure\n" +
					"you allow for AT LEAST 30 minutes to pass before taking action\n" +
					"Above you see the photo posting times. If these are less then 30\n" +
					"minutes ago just keep an eye on the missed challenges for now\n";
	
			if ( myalert == "" ) 
				myalert = "Players voted in all challenges\n";
		}
		else
			myalert += myalert2;

		return myalert;
	}

	function checktriplephoto( ) 
	{
		var mylist = new Array( );

		mylist[ 0 ] = "super.01";
		mylist[ 1 ] = "super.02";
		mylist[ 2 ] = "super.03";
		mylist[ 3 ] = "super.04";
		mylist[ 4 ] = "super.05";
		mylist[ 5 ] = "super.06";
		mylist[ 6 ] = "super.07";
		mylist[ 7 ] = "super.08";
		mylist[ 8 ] = "super.09";
		mylist[ 9 ] = "super.10";
		mylist[ 10 ] = "super.11";

		myalert = "";
		myalert1 = "";
		alert1count = 0;

		var x=0;
		var y=0;
		photolist=new Array( );
		gotphoto=new Array( );

		for ( x in mylist ) 
		{
			if ( GM_getValue( mylist[ x ] + ".chlgstatus" ) != "FIN" )
			{
				ddphoto1 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo1" ) );
				ddphoto2 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo2" ) );
				ddphoto3 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo3" ) );
				if ( ddphoto1 != " " ) photolist[ y++ ] = ddphoto1;
				if ( ddphoto2 != " " ) photolist[ y++ ] = ddphoto2;
				if ( ddphoto3 != " " ) photolist[ y++ ] = ddphoto3;
			}

			if ( GM_getValue( mylist[ x ] + ".chlgstatus" ) == "UPD" ) 
			{
				myalert1 = myalert1 + mylist[ x ].split( "." )[ 1 ] + " ";
				alert1count++;
			}
		}

		//GM_log( y );

		x = 0;
		for ( x=0; x < y; x++ )
		{
			//GM_log( photolist[ x ] );
			//GM_log( x );
			if ( gotphoto[ photolist[ x ] ] == undefined )
			{
				//GM_log( photolist[ x ] + " undefined");
				gotphoto[ photolist [ x ] ] = 1;
			}
			else 
			{
				gotphoto[ photolist [ x ] ] += 1;
			}

			if ( gotphoto[ photolist [ x ] ] > 3 ) 
			{
				myalert = myalert + photolist[ x ] + " entered in " + gotphoto[ photolist[ x ] ] + " challenges.\n";
			}

		}

		if ( alert1count > 1 )
		{
			myalert1 = "Challenges " + myalert1 + "have"
		}
		else if ( alert1count != 0 ) 
		{
			myalert1 = "Challenge " + myalert1 + "has"
		}

		if ( myalert1 != "" )
		{
			myalert1 = myalert1 + " status UPD!\n" + "Update all challenges for an up-to-date challenge overview\n\n";
		}

		if ( myalert != "" )
		{
			alert( myalert1 + myalert + "\nCheck on next page which ones...")
		}
		else if ( myalert1 != "" ) 
		{
			alert( myalert1 );
		}
	}

	bumpmenow = function bumpmenow( e ) 
	{
		var targ;
		if ( !e )
		{
			e = window.event;
		}
		if ( e.target )
		{
			targ = e.target;
		}
		else if ( e.srcElement )
		{
			targ = e.srcElement;
		}
		if ( targ.nodeType==3 ) // defeat Safari bug
		{
			targ = targ.parentNode;
		}

		e.stopPropagation( );

		url = targ.href;

		if ( e.metaKey || e.ctrlKey ) //ctrl + click means let's bump
		{
			GM_setValue( "super.bumping", "start" );
		}
		location.href = url;
		return true;
	}

	function displayplatinumdata( e )
	{
		var targ;
		if ( !e )
		{
			e = window.event;
		}
		if ( e.target )
		{
			targ = e.target;
		}
		else if ( e.srcElement )
		{
			targ = e.srcElement;
		}
		if ( targ.nodeType == 3 ) // defeat Safari bug
		{
			targ = targ.parentNode;
		}

		e.stopPropagation( );

		superchlgnr = targ.id;
		url = targ.href;

		if ( e.metaKey || e.ctrlKey ) //ctrl + click means let's bump
		{
			GM_setValue( "super.bumping", "start" );
			location.href = url;
			return true;
		}

		ddthreadnr = GM_getValue( superchlgnr + ".threadnr" );
		ddchlgnr = GM_getValue( superchlgnr + ".challengenr" );
		ddcommentcounter = GM_getValue( superchlgnr + ".commentcounter" );
		ddstatus = decodeURIComponent( GM_getValue( superchlgnr + ".status" ) );
		ddphoto1 = decodeURIComponent( GM_getValue( superchlgnr + ".photo1" ) );
		ddphotovoter = decodeURIComponent( GM_getValue( superchlgnr + ".photovoter" ) );

		myWindow = window.open( '', 'Stats page', 'top = 50, left = 100, width = 800, height = 600, scrollbars = yes, resizable = yes' )
		//myWindow.document.write( "This is 'myWindow'" )
		myWindow.document.open( "text/html", "replace" );
		myWindow.document.write( "<P><h1>Brackets voting board</h1></p><p>" + '<table border="1"><tr>' ); 
		myWindow.document.write( ddchlgnr + ": " + ddthreadnr + "</br>Title: " + ddstatus  );
		myWindow.document.write( "</tr><tr>" );
		myWindow.document.write( '<td valign="top"><table border="1"><tr>Players</tr><tr><td>' + ddphoto1.replace(/,/g,"</td></tr><tr><td>") + "</table></td>" );
		//myWindow.document.write( "</tr><tr>" );
		myWindow.document.write( '<td valign="top"><table border="1"><tr>Voters & votes</tr><tr><td>' + 
			ddphotovoter.replace(/:/g,"</td><td>").replace(/\n/g,"</td></tr><tr><td>")+"</table></td>");
		myWindow.document.write( "</tr></table></p>" );
		myWindow.document.close( );
		myWindow.focus( );
		//ddphotovoter.replace(/:/g,"&nbsp").replace(/\n/g,"</p><p>") + "</p>" );

	}


	displaydata = function displaydata( e )
	{
GM_log( "Here - displaydata" );
		var targ;
		if ( !e )
		{
			e = window.event;
		}
		if ( e.target )
		{
			targ = e.target;
		}
		else if ( e.srcElement )
		{
			targ = e.srcElement;
		}
		if ( targ.nodeType == 3 ) // defeat Safari bug
		{
			targ = targ.parentNode;
		}

		e.stopPropagation( );

		superchlgnr = targ.id;
		url = targ.href;

		if ( e.metaKey || e.ctrlKey ) //ctrl + click means let's bump
		{
			GM_setValue( "super.bumping", "start" );
			location.href = url;
			return true;
		}

		votealert = checkvotes( superchlgnr, true );

		ddthreadnr = GM_getValue( superchlgnr + ".threadnr" );
		ddchlgnr = GM_getValue( superchlgnr + ".challengenr" );
		ddcommentcounter = GM_getValue( superchlgnr + ".commentcounter" );
		ddstatus = decodeURIComponent( GM_getValue( superchlgnr + ".status" ) );
		ddwinner = decodeURIComponent( GM_getValue( superchlgnr + ".winner" ) );
		ddphoto1 = decodeURIComponent( GM_getValue( superchlgnr + ".photo1" ) );
		ddphoto2 = decodeURIComponent( GM_getValue( superchlgnr + ".photo2" ) );
		ddphoto3 = decodeURIComponent( GM_getValue( superchlgnr + ".photo3" ) );
		ddphotovoter = decodeURIComponent( GM_getValue( superchlgnr + ".photovoter" ) );
		var ddlastvote = GM_getValue( superchlgnr + ".lastvote");
		ddchlgstatus = GM_getValue( superchlgnr + ".chlgstatus" );
		ddtovotetime = GM_getValue( superchlgnr + ".tovotetime" );
		ddphoto1time = GM_getValue( superchlgnr + ".photo1time" );
		ddphoto2time = GM_getValue( superchlgnr + ".photo2time" );
		ddphoto3time = GM_getValue( superchlgnr + ".photo3time" );

		if ( ( ( ddphoto1 != " " ) && ( ddwinner.indexOf( ddphoto1 ) != -1 ) ) ||
		     ( ( ddphoto2 != " " ) && ( ddwinner.indexOf( ddphoto2 ) != -1 ) ) ||
		     ( ( ddphoto3 != " " ) && ( ddwinner.indexOf( ddphoto3 ) != -1 ) ) )
		{
			alert( "WINNER POSTED PHOTO !!!" );
		}

		// if normal challenges
		if ( true )
		{
			var splitvar;

			if ( ddlastvote.match( "=" ) == "=" ) splitvar = "=";
			else if ( ddlastvote.match( " " ) == " " ) splitvar = " ";
			else if ( ddlastvote.match( "-" ) == "-" ) splitvar = "-";
			else if ( ddlastvote.match( "." ) == "." ) splitvar = ".";

			var lastvotevalues = ddlastvote.split( splitvar );

			var winner = "";
			if ( lastvotevalues.length == 3 )
			{
				var challengenumber = parseInt( superchlgnr.split( "." )[ 1 ] );

				var requiredScore = iChallengeVoteScore;
				if ( ddstatus.toUpperCase( ).match( "UPGRADE" ) == "UPGRADE" )
					requiredScore = iUpgradeChallengeVoteScore;
				else if  ( ddstatus.toUpperCase( ).match( "Ultra Hero" ) == "Ultra Hero" )
					requiredScore = iRockOnVoteScore;

				for ( iVote = 0; iVote < 3; iVote++ )
				{
					if ( parseInt( lastvotevalues[ iVote ] ) >= requiredScore )
					{
						winner = "" + decodeURIComponent( GM_getValue( superchlgnr + ".photo" + ( iVote + 1 ) ) ) +
							" has won the challenge!!\n\n";
						break;
					}
				}
			}

			alert( "status: " + ddchlgstatus + "\n" +
				"thread: " + ddthreadnr + "\n" + 
				"challengenr: " + ddchlgnr + "\n" + 
				"commentcounter: " + ddcommentcounter + "\n" +
				"full challenge: " + ddstatus + "\n" + "\n" +
				"last change time: " + ddtovotetime + "\n" + "\n" +
				winner +
				"previous winner: " + ddwinner + "\n" + "\n" +
				"photo 1 (" + ddphoto1time + "): " + ddphoto1 + "\n" +
				"photo 2 (" + ddphoto2time + "): " + ddphoto2 + "\n" +
				"photo 3 (" + ddphoto3time + "): " + ddphoto3 + "\n" + "\n" +
				votealert + "\n" +
				"lastvote: " + ddlastvote + "\n\n" + 
				"voters: \n" + ddphotovoter );
		}
		else 
		{

			myWindow = window.open( '' , 'Stats page', 'top = 50, left = 300, width = 500, height = 600, scrollbars = yes, resizable = yes' )
			//myWindow.document.write( "This is 'myWindow'" )
			myWindow.document.open( "text/html","replace");
			myWindow.document.write( "<P><h1>Mother of the Month voting board</h1></p><p>" + '<table border="1"><tr>' ); 
			myWindow.document.write( ddchlgnr + ": " + ddchlgstatus + "</br>Title: " + ddstatus );
			myWindow.document.write( "</tr><tr>" );
			myWindow.document.write( '<td valign="top"><table border="1"><tr>Voters & votes</tr><tr><td>' 
				+ ddphotovoter.replace(/:/g,"</td><td>").replace(/<br>\n/g,'</td></tr><tr><td></td><td>').replace(/\n/g,'</td></tr><tr><td>')+"</table></td>" );
			myWindow.document.write( "</tr></table></p>" );
			myWindow.document.close( );
			myWindow.focus( );
			//ddphotovoter.replace(/:/g,"&nbsp").replace(/\n/g,"</p><p>")+"</p>");
		}
	}

	displayfulldata = function displayfulldata( )
	{
GM_log( "Here - displayfulldata" );
		checktriplephoto( );

		var mylist = new Array( );

		if ( GM_getValue( "super.brackets" ) != "false" )
		{
			var mybracketlist = new Array( );
			// do some specific brackets coding
		}

		mylist[ 0 ] = "super.01";
		mylist[ 1 ] = "super.02";
		mylist[ 2 ] = "super.03";
		mylist[ 3 ] = "super.04";
		mylist[ 4 ] = "super.05";
		mylist[ 5 ] = "super.06";
		mylist[ 6 ] = "super.07";
		mylist[ 7 ] = "super.08";
		mylist[ 8 ] = "super.09";
		mylist[ 9 ] = "super.10";
		mylist[ 10 ] = "super.11";
		mylist[ 11 ] = "super.12";

		myalert = "";

		var x = 0;

		for ( x in mylist ) 
		{
			ddstatus = decodeURIComponent( GM_getValue( mylist[ x ] + ".status" ) );
			ddwinner = decodeURIComponent( GM_getValue( mylist[ x ] + ".winner" ) );
			ddphoto1 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo1" ) );
			ddphoto2 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo2" ) );
			ddphoto3 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo3" ) );
			ddlastvote = GM_getValue( mylist[ x ] + ".lastvote" );
			ddchlgstatus = GM_getValue( mylist[ x ] + ".chlgstatus" );

			for ( i = 0, filler = ""; i < 20 - ddlastvote.length; i++ ) 
			{
				filler += " ";
			}

			myalert = myalert + ddchlgstatus + ":    " + ddstatus + "\n" + 
				"vote: " + ddlastvote + " " + filler +
				"prev. winner: " + ddwinner + "\n" + 
				"photo's: " + ddphoto1 + " - " +
				ddphoto2 + " - " + ddphoto3 + "\n";

			myalert += checkvotes( mylist[ x ], false );
			myalert += "\n";

		}

		var idleChallenges = "";
		for ( x in mylist ) 
		{
			var idleAlert = GM_getValue( mylist[ x ] + ".idleAlert", "" );
			if ( idleAlert.length > 1 )
			{
				idleChallenges += idleAlert + "\n";
			}
		}
		if ( idleChallenges.length > 1 )
		{
			myalert += "IDLE CHALLENGES:\n" + idleChallenges;
		}

		alert( myalert ); 
	}

	// *******************
	//  End of display functions
	// *******************


	// *******************
	// Start of update full data
	// *******************

	updatedata = function updatedata( e )
	{
		if ( !e )
		{
			e = window.event;
		}

		e.stopPropagation( );

		url=targ.id;
		GM_setValue( "super.update", "true" );
		thislocation.replace( url );

		return;
	}

	updatealldata = function updatealldata() 
	{
		GM_setValue( "super.updatealldata","true" );
		var updfound = false;

		maxupdates = GM_getValue( "super.maxupdate" );
		maxupdates++;
		//GM_log( maxupdates );

		if ( maxupdates > 15 ) 
		{
			GM_setValue( "super.maxupdate", 0 );
			GM_setValue( "super.updatealldata", "false" );
			alert( "Stopped updating: possible loop due to double challenges" );
			return;
		}
		else
		{
			GM_setValue( "super.maxupdate", maxupdates );
		}

		for ( i = 1; i < discusstrs.length; i++ )
		{
			//GM_log( "in updateall" );
			//GM_log( discusstrs[ i ].innerHTML );

			var tds = discusstrs[ i ].getElementsByTagName( "td" );
			var mnchlgnr=tds[ 0 ].innerHTML.split( "<b>" )[ 1 ].split( " " )[ 0 ];
			var superchlgnr = "super." + mnchlgnr;
			var chlgstatus = tds[ 4 ].innerHTML;
			var url = "http://www.flickr.com" + tds[ 0 ].innerHTML.split( "href=\"" )[ 1 ].split( "\"" )[ 0 ];
			//GM_log( "url: " + url );

			if ( chlgstatus.match( "UPD" ) == "UPD" )
			{
				GM_setValue( "super.update", "true" );
				updfound = true;
				thislocation.replace( url );
				break;
			}
		}
		if ( !updfound )
		{
			GM_setValue( "super.updatealldata", "false" );
		}
		//alert( GM_getValue( "super.updatealldata" ) );

		return;
	}


	// *******************
	// End of update full data
	// *******************


	// *******************
	// Start of init data
	// *******************

	initdatafrommenu = function initdatafrommenu( )
	{
		initdata( );
		alert( 'SuperChallenge data initialised.\nThemes and challenge headers are being loaded in background.'
			+ '\nThis may take up to half a minute depending on Flickr response times' 
			+ 'n\n(you can check loading status under tools - Error Console - Messages tab)'
			+ '\n\nPlease refresh the page to start using them.' );

	}

	initdata = function initdata( )
	{
		GM_log( "super: init data started" );

		var mylist = new Array( );

		mylist[ 0 ] = "super.01";
		mylist[ 1 ] = "super.02";
		mylist[ 2 ] = "super.03";
		mylist[ 3 ] = "super.04";
		mylist[ 4 ] = "super.05";
		mylist[ 5 ] = "super.06";
		mylist[ 6 ] = "super.07";
		mylist[ 7 ] = "super.08";
		mylist[ 8 ] = "super.09";
		mylist[ 9 ] = "super.10";
		mylist[ 10 ] = "super.11";

		myalert = "";

		GM_setValue( "super.updatealldata", "false" );
		GM_setValue( "super.update", "false" );
		GM_setValue( "super.maxupdate", 0 );
		GM_setValue( "super.bumping", "false" );
		GM_setValue( "super.bumpAllState", "none" );
		GM_setValue( "super.version", supertoolversion );
		GM_setValue( "super.brackets", "false" );
		GM_setValue( "super.lastwinner", encodeURIComponent( " " ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
		GM_setValue( "super.lastsecond", encodeURIComponent( " " ) );
		GM_setValue( "super.lastsecond2", encodeURIComponent( " " ) );
		GM_setValue( "super.lastmedalsplayers", encodeURIComponent( " " ) );
		GM_setValue( "super.lastchallenge", "" );
		GM_setValue( "super.currentchallenge", "" );
		GM_setValue( "super.themelist", "" );
		GM_setValue( "super.themelisttime", "" );
		GM_setValue( "super.normalchlgheader", "Error uploading header from the back room, please use copy paste to update." );
		GM_setValue( "super.medalchlgheader", "Error uploading header from the back room, please use copy paste to update." );
		GM_setValue( "super.upgradechlgheader", "Error uploading header from the back room, please use copy paste to update." );
		GM_setValue( "super.racechlgheader", "Error uploading header from the back room, please use copy paste to update." );

		var x = 0;

		for ( x in mylist )
		{
			GM_setValue( mylist[ x ] + ".startdate", encodeURIComponent( "" ) );
			GM_setValue( mylist[ x ] + ".threadnr", x );
			GM_setValue( mylist[ x ] + ".challengenr", "99" );
			GM_setValue( mylist[ x ] + ".commentcounter", "100" );
			GM_setValue( mylist[ x ] + ".status", encodeURIComponent( mylist[ x ].split( "super." )[ 1 ] + " - not found or not updated with new info yet" ) );
			GM_setValue( mylist[ x ] + ".winner", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".photo1", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".photo2", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".photo3", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".photovoter", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".lastvote", " " );
			GM_setValue( mylist[ x ] + ".chlgstatus", "---" );
			GM_setValue( mylist[ x ] + ".tovotetime", " " );
			GM_setValue( mylist[ x ] + ".photo1time", " " );
			GM_setValue( mylist[ x ] + ".photo2time", " " );
			GM_setValue( mylist[ x ] + ".photo3time", " " );
			GM_setValue( mylist[ x ] + ".photo1timesince", " " );
			GM_setValue( mylist[ x ] + ".photo2timesince", " " );
			GM_setValue( mylist[ x ] + ".photo3timesince", " " );
		}

		GM_log( "super: init data complete" );

		loadthemelist( );
		loadchlgheader( );
	}

	// *******************
	// End of init data
	// *******************


	// *******************
	// Start of write header
	// *******************

	addsuperheader = function addsuperheader( )
	{
		var topbar = thisdocument.getElementById( "TopBar" );
		var tables = topbar.getElementsByTagName( "table" );
		var trs = tables[ 0 ].getElementsByTagName( "tr" );
		var tds = trs[ 0 ].getElementsByTagName( "td" );

		var superEndTime = new Date( );
		var superExecutionTime = superEndTime - superStartTime;

		if ( unsafeWindow.global_name == 'KVangeel' || unsafeWindow.global_name == 'charminbayurr' )
			tds[ 1 ].innerHTML = "super Admin tool " + supertoolversion + " (" + superExecutionTime + "ms)" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[ 1 ].innerHTML;
		else
			tds[ 1 ].innerHTML = "super Admin tool " + supertoolversion + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[1].innerHTML;
	}

	// *******************
	// End of write header
	// *******************


	// *******************
	// start of main discuss page processing
	// *******************

	function ProcessMainDoc( )
	{
		var foundchlg = new Array();

		// select main table

		var main = thisdocument.getElementById( "Main" );
		var tables = main.getElementsByTagName( "table" );
		var trs = tables[ 2 ].getElementsByTagName( "tr" );
		discusstrs = trs; // save trs for update function later on

		// add 5th element to the table
		var mylink = trs[ 0 ]; //.insertCell( 4 );
		// add new table header
		var tds = trs[ 0 ].getElementsByTagName( "th" );
		tds[ 3 ].width = "12%";
		myanchor = thisdocument.createElement( 'th' );
		myanchor.innerHTML = "status";
		myanchor.width = "5%";
		mylink.appendChild( myanchor );

		var ddlastvote = "";
		var i = 0;

		for ( i = 1; i < trs.length; i++ )
		{
			chlgstatus = "UPD";
			insertstatus = true;

			tds = trs[ i ].getElementsByTagName( "td" );
			mnchlgnr = tds[ 0 ].innerHTML.split( "<b>" )[ 1 ].split( " - " )[ 0 ]
			mnstatus = tds[ 0 ].innerHTML.split( "<b>" )[ 1 ].split( "</b>" )[ 0 ].replace(/&amp;/g,"&");

			if ( mnstatus.match( "Daily Chat" ) == "Daily Chat" )
			{
				var url = "http://www.flickr.com" + tds[ 0 ].innerHTML.split( "a href=\"" )[ 1 ].split( "\"><b>" )[ 0 ];
				GM_setValue( "super.DailyChatUrl", url );
			}

			if ( mnchlgnr.length == 2 ) //only process if chlgnr is correct format
			{
				superchlgnr = "super." + mnchlgnr;

				ddcommentcounter= GM_getValue( superchlgnr + ".commentcounter" );
				ddstatus 	= decodeURIComponent( GM_getValue( superchlgnr + ".status" ) );
				ddwinner 	= decodeURIComponent( GM_getValue( superchlgnr + ".winner" ) );
				ddphoto1 	= decodeURIComponent( GM_getValue( superchlgnr + ".photo1" ) );
				ddphoto2 	= decodeURIComponent( GM_getValue( superchlgnr + ".photo2" ) );
				ddphoto3 	= decodeURIComponent( GM_getValue( superchlgnr + ".photo3" ) );
				ddphoto1time 	= decodeURIComponent( GM_getValue( superchlgnr + ".photo1time" ) );
				ddphoto2time 	= decodeURIComponent( GM_getValue( superchlgnr + ".photo2time" ) );
				ddphoto3time 	= decodeURIComponent( GM_getValue( superchlgnr + ".photo3time" ) );
				ddlastvote 	= GM_getValue( superchlgnr + ".lastvote" );
				ddthreadnr 	= GM_getValue( superchlgnr + ".threadnr" );

				var votetime = decodeURIComponent( GM_getValue( superchlgnr + ".tovotetimesince" ) );
				var phototime1 = decodeURIComponent( GM_getValue( superchlgnr + ".photo1timesince" ) );
				var phototime2 = decodeURIComponent( GM_getValue( superchlgnr + ".photo2timesince" ) );
				var phototime3 = decodeURIComponent( GM_getValue( superchlgnr + ".photo3timesince" ) );

				var ddlastphototime = "";
				if ( phototime3.length < 2 )
				{
					if ( phototime2.length < 2 )
					{
						if ( phototime1.length < 2 )
						{
							challengeopendate = decodeURIComponent( GM_getValue( superchlgnr + ".startdate" ) );
							hours = ( superStartTime.getTime( ) - challengeopendate ) / ( 1000 * 60 * 60 );
							ddlastphototime = "" + hours + " hours ago";
						}
						else
						{
							ddlastphototime = phototime1;
						}	
					}
					else
					{
						ddlastphototime = phototime2;
					}
				}
				
				var sAlert = "";
				if ( ddlastphototime.length > 2 )
				{
					if ( converttoseconds( ddlastphototime ) > 7200 )
					{
						 sAlert = ddstatus;// + "\nNo activity in past 2 hours";
					}
				}
				GM_setValue( superchlgnr + ".idleAlert", sAlert );

				ddlastvote = detectNoSpaces( ddlastvote );

				var thread = tds[ 0 ].innerHTML.split( "href" )[ 1 ].split( "/" )[ 4 ].split( "/" )[ 0 ];

				mncommentcounter = tds[ 2 ].innerHTML;
				var bUpgrade = false;
				var bRockOn = false;
				if ( ddstatus.toUpperCase( ).match( "UPGRADE" ) == "UPGRADE" )
					bUpgrade = true;
				else if ( ddstatus.toUpperCase( ).match( "ROCK ON" ) == "ROCK ON" )
					bRockOn = true;

				if ( checkskipchallenge( tds[ 0 ].innerHTML ) ) chlgstatus = "---";  //handle non challenges with a challenge number 
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "AWARDED" ) == "AWARDED" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "Daily Chat" ) == "HERO CHATTER" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "VOID" ) == "VOID" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "AWAITING" ) == "AWAITING" ) chlgstatus = "---";
				else if ( thread != ddthreadnr ) chlgstatus = "UPD";
				else if ( ( ddstatus.toUpperCase( ).match( "WAIT" ) == "WAIT" ) && ( mncommentcounter == ddcommentcounter ) ) chlgstatus = "WT";
				else if ( ( ddlastvote.match( sChallengeVoteScore ) == sChallengeVoteScore ) && ( mncommentcounter == ddcommentcounter ) && ( !bUpgrade && !bRockOn ) && ( ddphoto3 != " " ) ) chlgstatus = "FIN";
				else if ( ( ddlastvote.match( sUpgradeChallengeVoteScore ) == sUpgradeChallengeVoteScore ) && ( mncommentcounter == ddcommentcounter ) && ( bUpgrade || ( ddphoto3 == " ") ) ) chlgstatus = "FIN";
				else if ( ( ddlastvote.match( sRockOnChallengeVoteScore ) == sRockOnChallengeVoteScore ) && ( mncommentcounter == ddcommentcounter ) && ( bRockOn || ( ddphoto3 == " ") ) ) chlgstatus = "FIN";
				else if ( ( ddphoto3 != " " ) && ( ddstatus.match( "VOTE" ) != "VOTE" ) && ( mncommentcounter == ddcommentcounter ) ) chlgstatus = "VOT";
				else if ( mncommentcounter == ddcommentcounter ) chlgstatus = "OK";

				//overruling statusses
				if ( chlgstatus != "---" )
				{ 
					if ( ( ( ddphoto1 != " " ) && ( ddwinner.indexOf( ddphoto1 ) != -1 ) ) ||
					     ( ( ddphoto2 != " " ) && ( ddwinner.indexOf( ddphoto2 ) != -1 ) ) ||
					     ( ( ddphoto3 != " " ) && ( ddwinner.indexOf( ddphoto3 ) != -1 ) ) )  
					{
						chlgstatus="ERR";
					}
				}

				//check if somebody changed challenge title of a "VOT" challenge already      
				if ( chlgstatus == "VOT" )  
				{
					if ( mnstatus.match( "VOTE" ) == "VOTE" ) //VOTE found, so update needed
					{
						chlgstatus = "OK"; // set to OK (will be written later)
						GM_setValue( superchlgnr + ".status", encodeURIComponent( mnstatus ) ); // write new full status
					}
				} 

				//write status if there is a status & set challenge number to processed if status different from "---"
				if ( chlgstatus != "---" ) 
				{
					GM_setValue ( superchlgnr + ".chlgstatus", chlgstatus);
					foundchlg[ mnchlgnr ] = "OK";
				}


			}  // end of processing chlgnr
			else 
			{
				chlgstatus = "FMT"; // if chlgnr length not 2 then format issue.
			}

			// overwrite status for some threads
			if ( checkskipchallenge( tds[ 0 ].innerHTML ) ) 
			{
				chlgstatus = "---";
			}

			// add statusses  
			var url = "http://www.flickr.com" + tds[ 0 ].innerHTML.split( "href=\"" )[ 1 ].split( "\"" )[ 0 ]; // get URL
			mylink = trs[ i ].insertCell( tds.length ); 
			mylink.setAttribute( 'style', "text-align: center" );

			if ( chlgstatus == "---" )
			{
				if ( checkskipchallenge( tds[ 0 ].innerHTML ) ) // allow these to be bumped
				{
					myanchor = thisdocument.createElement( 'a' );
					myanchor.innerHTML = chlgstatus;
					myanchor.id = url;
					myanchor.href = url;
					myanchor.setAttribute( 'style', 'text-decoration: none' );
					myanchor.setAttribute( 'onClick', 'return false;' );
					myanchor.addEventListener( 'click', function eventclickmain( e ){ bumpmenow( e ); }, false );
					mysmall = thisdocument.createElement( 'small' );
					mysmall.appendChild( myanchor );
					mylink.appendChild( mysmall );
				}
				else 
				{
					mylink.innerHTML = "<small>" + chlgstatus + "</small>";
				}
			}
			else if ( chlgstatus == "UPD" /*|| chlgstatus == "OK"*/ ) // xxx - do not need check for OK - debugging
			{
				myanchor = thisdocument.createElement( 'a' );
				myanchor.innerHTML = '<img src="http://l.yimg.com/www.flickr.com/images/pulser2.gif" ' + 'alt="" width="21" height="10" border="0">';
				myanchor.id = url;
				myanchor.href = "#";
				myanchor.setAttribute( 'style', 'text-decoration: none' );
				myanchor.setAttribute( 'onClick', 'return false;' );
				/*myanchor.addEventListener( 'click', function eventclickupdate( e ){ updatedata( e ); }, false );*/
				mysmall = thisdocument.createElement( 'small' );
				mysmall.appendChild( myanchor );
				mylink.appendChild( mysmall );
				ProcessDetailDocInline( url, mnstatus );
			}
			else if ( chlgstatus == "FMT" )
			{
				mylink.innerHTML = "<small><a href=\"\" onclick=\"alert(\'Challenge number formatted wrong," + 
					" please check challenge\');return false;\">" + chlgstatus + "</a></small>"; 
			}
			else 
			{   
				myanchor = thisdocument.createElement( 'a' );
				myanchor.innerHTML = chlgstatus;
				myanchor.title = ddlastvote;
				myanchor.id = superchlgnr;
				myanchor.href = url;
				myanchor.setAttribute( 'style', 'text-decoration: none' );
				myanchor.setAttribute( 'onClick', 'return false;' );
				myanchor.addEventListener( 'click', function eventclickmain( e ){ displaydata( e ); }, false );
				mysmall = thisdocument.createElement( 'small' );
				mysmall.appendChild( myanchor );
				mylink.appendChild( mysmall );
			}

		}

		// check for global update
		update = GM_getValue( "super.updatealldata" );
		if ( update.match( "true" ) == "true" )
			updatealldata( );
		else 
			GM_setValue( "super.maxupdate", 0 );

		// add super info & update headers
		var trs = tables[ 0 ].getElementsByTagName( "tr" );
		var tds = trs[ 0 ].getElementsByTagName( "td" );
		var h1 = tds[ 1 ].getElementsByTagName( "h1" );

		//add displayfulldata
		h1[ 0 ].appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "super-Info";
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickmain( e ){ displayfulldata( ); }, false);
		h1[ 0 ].appendChild( myanchor );

		//add updatealldata
		/*h1[ 0 ].appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "super-Update";
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickmain( e ){ updatealldata( ); }, false );
		h1[ 0 ].appendChild( myanchor );*/

		//add super bump header
		var place = thisdocument.getElementById( "Tertiary" );

		//add super Bump
		h1[ 0 ].appendChild( thisdocument.createTextNode(' / ') );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "super-BumpAll";
		myanchor.href = "#";
		myanchor.addEventListener( 'click', function eventclickchallenge( e ) {	initbumpall( ); }, false );
		h1[ 0 ].appendChild( myanchor );

		//add super Bump open
		h1[ 0 ].appendChild( thisdocument.createTextNode(' / ') );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "super-BumpOpen";
		myanchor.href = "#";
		myanchor.addEventListener( 'click', function eventclickchallenge( e ) {	initbumpopen( ); }, false );
		h1[ 0 ].appendChild( myanchor );

		// erase statusses of challenges not found + set all active themes
		// only do this on the first page...
		if ( thislocation.href.match( "superchallenge/discuss/page" ) != "superchallenge/discuss/page" )
		{
			var activethemes = "";
			for ( i = 1; i < 13; i++ )
			{
				if ( i < 10 ) 
					chkchlg = "0" + i
				else
					chkchlg = i;

				if ( foundchlg[ chkchlg ] != "OK" )
				{
					GM_setValue( "super." + chkchlg + ".status", encodeURIComponent( chkchlg + " - not found or not updated with new info yet" ) );
					GM_setValue( "super." + chkchlg + ".winner", encodeURIComponent( " " ) );
					GM_setValue( "super." + chkchlg + ".photo1", encodeURIComponent( " " ) );
					GM_setValue( "super." + chkchlg + ".photo2", encodeURIComponent( " " ) );
					GM_setValue( "super." + chkchlg + ".photo3", encodeURIComponent( " " ) );
					GM_setValue( "super." + chkchlg + ".photovoter", encodeURIComponent( " " ) );
					GM_setValue( "super." + chkchlg + ".commentcounter", "100" );
					GM_setValue( "super." + chkchlg + ".lastvote", " " );
					GM_setValue( "super." + chkchlg + ".chlgstatus", "---" );
					GM_setValue( "super." + chkchlg + ".tovotetime", " " );
					GM_setValue( "super." + chkchlg + ".photo1time", " " );
					GM_setValue( "super." + chkchlg + ".photo2time", " " );
					GM_setValue( "super." + chkchlg + ".photo3time", " " );
					GM_setValue( "super." + chkchlg + ".photo1timesince", " " );
					GM_setValue( "super." + chkchlg + ".photo2timesince", " " );
					GM_setValue( "super." + chkchlg + ".photo3timesince", " " );
				}
				else
				{
					activethemes = activethemes + decodeURIComponent( GM_getValue( "super." + chkchlg + ".status" ) ).split( 'Theme: ' )[ 1 ] + "||";
				} 
			}

			GM_setValue( "super.activethemes", encodeURIComponent( activethemes ) );
		}

		//GM_log( "End of processing main discuss page" );
		return;
	}

	// *******************
	//  End of main discuss page processing
	// *******************


	// *******************
	//  Start of detail processing
	// *******************

	function ProcessDetailDoc( ) 
	{
GM_log( "Here - ProcessDetailDoc" );
		var inbrackets = false;

		var threadnr = thislocation.href.split( '/' )[ 6 ];
		//GM_log( "detaildoc threadnr: " + threadnr );

		// select goodstuff

		var title = thisdocument.getElementById( "GoodStuff" ).innerHTML;

		// extract challengenr and status out of title

		var chlgnr = title.split( "<h2>" )[ 1 ].split( " " )[ 0 ];
		var status = title.split( "<h2>" )[ 1 ].split( "<" )[ 0 ].replace( /&amp;/g, "&" );
		//var status = title.split( " - " )[ 1 ].split( " - " )[ 0 ];

		// check for non challenge threads
		if ( checkskipchallenge( status ) )
		{
			//add super bump header & leave
			var place = thisdocument.getElementById( "Tertiary" );

			//add super Bump
			place.appendChild( thisdocument.createTextNode(' / ') );
			myanchor=thisdocument.createElement( 'a' );
			myanchor.innerHTML = "super-Bump";
			myanchor.href = "#";
			myanchor.addEventListener( 'click', function eventclickchallenge( e ) {	bumpmeup( ); },	false );
			place.appendChild( myanchor );

			//get edit links ready for inline editing
			EditSetEvents( );

			return;
		}

		//check for correct challenge title
		var alerttxt = "";
		tst = status.split( " - " )[ 0 ].replace( " ", "" );
		if ( tst.length != 2 )
			alerttxt = "Challengenumber is not 2-digit\n";
		tst = 0;
		if ( status.match( "OPEN" ) == "OPEN" ) tst = 1;
		if ( status.match( "VOTE" ) == "VOTE" ) tst = 1;
		if ( status.match( "AWARDED" ) == "AWARDED" ) tst = 1;
		if ( status.match( "WAIT" ) == "WAIT" ) tst = 1;
		if ( status.match( "VOID" ) == "VOID" ) tst = 1;
		if ( tst == 0 ) 
			alerttxt = alerttxt + "Can't find OPEN, TO VOTE, AWARDED, VOID or WAIT in challenge\n";

		if ( alerttxt != "" )
		{
			alerttxt = alerttxt + "\nFormat should be:\n\nXX - YYYYYY - Theme: zzzzzzzzzzzz";
			alert( alerttxt );
		}

		//GM_log( chlgnr );

		// get td's out of discusstopic

		var discuss = thisdocument.getElementById( "DiscussTopic" );
		var tds = discuss.getElementsByTagName( "td" );

		// set commentcounter
		var commentcounter = ( tds.length - 3 ) / 2;

		// alert( tds.length );

		if ( tds[ 0 ] == null )
			return; // no tds in discusstopic... shouldn't happen

		// get the winner out of the 2nd td

		//GM_log( discuss.innerHTML );
		var winner = " ";
		var votetime = " ";
		var challengeopendate = getTimeAgo( discuss.innerHTML.split( "osted at " )[ 1 ].split( "\n" )[ 0 ] );

		/*if ( !inbrackets ) //stuff below doesn't exist in brackets
		{
			winner = tds[ 1 ].innerHTML.split( "challenge is open" )[ 1 ].split( "<b>" )[ 1 ].split( "<" )[ 0 ];
			winner = winner.replace( /<br>/, "" ).replace( /\n/, "" ); //cleanup string removed .replace(" ","")
			if ( status.match( "OPEN" ) != "OPEN" ) 
			{
				votetime = tds[ 1 ].innerHTML.split( "edited this topic " )[ 1 ].split( " ago." )[ 0 ];
			}
		}*/

		endofbrackets = 0;
		if ( inbrackets && ( tds.length > 3 ) ) //happens only in brackets
		{
			votetime = tds[ 3 ].innerHTML.split( "osted " )[ 1 ].split( " ago." )[ 0 ];
			if ( commentcounter != Math.round( commentcounter ) ) // we get this when we overflow to page 2
			{
				commentcounter = Math.round( commentcounter );
				endofbrackets = 1;
			}
		}

		// start looping td's from number 3 [2] & fetch all photos
		var i = 0;
		var tdnr = 0;
		var photoposter = new Array( );
		photoposter[ 0 ] = " ";
		photoposter[ 1 ] = " ";
		photoposter[ 2 ] = " ";
		var phototime = new Array( );
		phototime[ 0 ] = " ";
		phototime[ 1 ] = " ";
		phototime[ 2 ] = " ";
		var photonumber = 0;
		var photovoter = "";
		var lastvote = "no votes";

		for ( i = 2; i < tds.length - 1 + endofbrackets; i++)
		{
			txt = tds[ i ].innerHTML;

			if ( txt.match( "says" ) == "says" )
			{
				txt2 = txt.split( "</h4>" )[ 1 ].split( "<small>" )[ 0 ]; //check on 2nd part because of extra img title for admins
				//alert( i + " / " + txt );
				//alert( i + " / " + txt2 );

				if ( txt2.match( "img" ) == "img" )
				{
					// photo found, now get username
					photoposter[ photonumber ] = txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ];
					photoposter[ photonumber ] = photoposter[ photonumber ].replace( /&amp;/g, "&" );
					phototime[ photonumber ] = txt.split( "osted " )[ 1 ].split( " ago." )[ 0 ];
					//alert( photonumber + " / " + photoposter[ photonumber ] );
					photonumber++;
					tdnr = i; //remember position of last td
					//alert( photonumber + " / " + tdnr );

				}

				if ( ( tdnr != i ) && ( ( photonumber == 3 ) || ( status.match( "TO VOTE" ) == "TO VOTE" ) || inbrackets ) )
				{
					// voter found, now get username
					photovoter = photovoter + txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ].replace( /&amp;/g, "&" ) + ": ";
					//alert( photovoter );
					// add the vote to string
					var ptag = tds[ i ].getElementsByTagName( 'p' );
					photovoter = photovoter + ptag[ 0 ].innerHTML.split( "\t" )[ 8 ].split( "\t" )[ 0 ].replace( /&gt;/g, ">" );
				}
			}
		}

		// get last comment if available
		if ( ( tdnr < tds.length - 1 ) && ( commentcounter > 3 ) && ( !inbrackets ) )
		{
			var ptag = tds[ tds.length - 2 ].getElementsByTagName( 'p' );
			lastvote = ptag[ 0 ].innerHTML.split( "\t" )[ 8 ].split( "\t" )[ 0 ].split( "\n" )[ 0 ];
			lastvote = lastvote.replace( /<br>/, "" ).replace( /\n/, "" ).replace( /&gt;/g, ">" ); //cleanup string
			if ( lastvote.match( "<img" ) == "<img" )	
				lastvote = "no votes"; //capture error lastvote when text comment before last photo
		} 
		else
			lastvote = "no votes";

		superchlgnr = "super." + chlgnr;

		//alert( superchlgnr );

		GM_setValue( superchlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
		GM_setValue( superchlgnr + ".threadnr", threadnr );
		GM_setValue( superchlgnr + ".challengenr", chlgnr );
		GM_setValue( superchlgnr + ".commentcounter", commentcounter );
		GM_setValue( superchlgnr + ".status", encodeURIComponent( status ) );
		GM_setValue( superchlgnr + ".winner", encodeURIComponent( winner ) );
		GM_setValue( superchlgnr + ".photo1", encodeURIComponent( photoposter[ 0 ] ) );
		GM_setValue( superchlgnr + ".photo2", encodeURIComponent( photoposter[ 1 ] ) );
		GM_setValue( superchlgnr + ".photo3", encodeURIComponent( photoposter[ 2 ] ) );
		GM_setValue( superchlgnr + ".photovoter", encodeURIComponent( photovoter ) );

		// inside challenge - decode last vote if no spaces
		lastvote = detectNoSpaces( lastvote );

		GM_setValue( superchlgnr + ".lastvote", lastvote );
		GM_setValue( superchlgnr + ".chlgstatus", "OK" );
		GM_setValue( "super.currentchallenge", chlgnr );

		GM_setValue( superchlgnr + ".tovotetime", converttotime( votetime ) );
		GM_setValue( superchlgnr + ".photo1time", converttotime( phototime[ 0 ] ) );
		GM_setValue( superchlgnr + ".photo2time", converttotime( phototime[ 1 ] ) );
		GM_setValue( superchlgnr + ".photo3time", converttotime( phototime[ 2 ] ) );

		GM_setValue( superchlgnr + ".tovotetimesince", encodeURIComponent( votetime ) );
		GM_setValue( superchlgnr + ".photo1timesince", encodeURIComponent( phototime[ 0 ] ) );
		GM_setValue( superchlgnr + ".photo2timesince", encodeURIComponent( phototime[ 1 ] ) );
		GM_setValue( superchlgnr + ".photo3timesince", encodeURIComponent( phototime[ 2 ] ) );

		update = GM_getValue( "super.update" );

		if ( update.match( "true" ) == "true" )
		{
			GM_setValue( "super.update", "false" );
			thislocation.replace( "http://www.flickr.com/groups/super/discuss/" );
			return;
		}

		//if closed & in voting, let's autocopy winners
		maintext = thisdocument.getElementById( "Main" );
		closedtext = maintext.getElementsByTagName( "p" )[ 0 ].innerHTML;
		var isclosed = false;

		if ( closedtext.match( "This thread has been closed" ) == "This thread has been closed" )
			isclosed = true;

		if ( !isclosed )  //just reset lastwinners if challenge not closed
		{ 
			GM_setValue( "super.lastwinner", encodeURIComponent( " " ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
			GM_setValue( "super.lastsecond", encodeURIComponent( " " ) );
			GM_setValue( "super.lastsecond2", encodeURIComponent( " " ) );
			GM_setValue( "super.lastmedalsplayers", encodeURIComponent( " " ) );
			GM_setValue( "super.lastchallenge", "" );
		}

		if ( ( status.match( "TO VOTE" ) == "TO VOTE" ) && ( isclosed ) && ( !inbrackets ) ) //only process if closed & in vote staus
		{
			GM_setValue( "super.lastwinner", encodeURIComponent( " " ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
			GM_setValue( "super.lastsecond", encodeURIComponent( " " ) );
			GM_setValue( "super.lastsecond2", encodeURIComponent( " " ) );
			if ( status.toUpperCase( ).match( "ROCK ON" )  == "ROCK ON" )
				GM_setValue( "super.lastmedalsplayers", encodeURIComponent( photoposter[ 0 ] + ' / ' + photoposter[ 1 ] + ' / ' + photoposter[ 2 ] ) );
			else
				GM_setValue( "super.lastmedalsplayers", encodeURIComponent( " " ) );

			GM_setValue( "super.lastchallenge", chlgnr );

			//autocheck votes
			splitvar = "";
			vote1 = "0";
			vote2 = "0";
			vote3 = "0";
			if ( lastvote.match( "=" ) == "=" ) splitvar = "=";
			else if ( lastvote.match( " " ) == " " ) splitvar = " ";
			else if ( lastvote.match( "-" ) == "-" ) splitvar = "-";
			else if ( lastvote.match( "." ) == "." ) splitvar = ".";

			var dualplay = false;
			if ( photoposter[ 2 ] == " " ) 
				dualplay = true;

			//pick up votes
			if ( splitvar != "" )
			{
				vote1 = lastvote.split( splitvar )[ 0 ];
				vote2 = lastvote.split( splitvar )[ 1 ];
				if ( photoposter[ 2 ] != " " )
					vote3 = lastvote.split( splitvar )[ 2 ];  // only if we have 3 photos
			}

			//create the input form
			myform = document.createElement( 'form' ); 
			myform.id = "Medalform";

			if ( dualplay )
			{
				//create table
				mytable = document.createElement( 'table' );

				//fill row 1
				mytr = mytable.insertRow( 0 );

				//fill cell 1
				mytd = mytr.insertCell( 0 ); 
				mytd.innerHTML = "<b>" + photoposter[ 0 ] + ": </b>";

				//fill cell 2
				mytd = mytr.insertCell( 1 );
				mytd = createCheckbox( "C11", "lastwinner", photoposter[ 0 ], " " + sChallengeVoteScore + " ", mytd );

				//fill cell 3
				mytd = mytr.insertCell( 2 );
				mytd = createCheckbox( "C12", "lastsecond", photoposter[ 0 ], " " + ( sChallengeVoteScore - 1 ) + " ", mytd );

				//fill row 2
				mytr = mytable.insertRow( 1 );

				//fill cell 1
				mytd = mytr.insertCell( 0 ); 
				mytd.innerHTML = "<b>" + photoposter[ 1 ] + ": </b>";

				//fill cell 2
				mytd = mytr.insertCell( 1 );
				mytd = createCheckbox( "C21", "lastwinner", photoposter[ 1 ], " " + sChallengeVoteScore + " ", mytd );

				//fill cell 3
				mytd = mytr.insertCell( 2 );
				mytd = createCheckbox( "C22", "lastsecond", photoposter[ 1 ], " " + ( sChallengeVoteScore - 1 ) + " ", mytd );
			}
			else if ( status.match( "GRAND MOTHER" ) != "GRAND MOTHER" ) //regular
			{
				//create table
				mytable = document.createElement( 'table' );

				//fill row 1
				mytr = mytable.insertRow( 0 );

				//fill cell 1
				mytd = mytr.insertCell( 0 ); 
				mytd.innerHTML = "<b>" + photoposter[ 0 ] + ": </b>";

				//fill cell 2
				mytd = mytr.insertCell( 1 );
				mytd = createCheckbox( "C11", "lastwinner", photoposter[ 0 ], " " + sChallengeVoteScore + " ", mytd );

				//fill cell 3
				mytd = mytr.insertCell( 2 );
				mytd = createCheckbox( "C12", "lastsecond", photoposter[ 0 ], " " + ( sChallengeVoteScore - 1 ) + " ", mytd ); 

				//fill row 2
				mytr = mytable.insertRow( 1 );

				//fill cell 1
				mytd = mytr.insertCell( 0 );
				mytd.innerHTML = "<b>" + photoposter[ 1 ] + ": </b>";

				//fill cell 2
				mytd = mytr.insertCell( 1 );
				mytd = createCheckbox( "C21", "lastwinner", photoposter[ 1 ], " " + sChallengeVoteScore + " ", mytd); 

				//fill cell 3
				mytd = mytr.insertCell( 2 );
				mytd = createCheckbox( "C22", "lastsecond", photoposter[ 1 ], " " + ( sChallengeVoteScore - 1 ) + " ", mytd );

				//fill row 3
				mytr = mytable.insertRow( 2 );

				//fill cell 1
				mytd = mytr.insertCell( 0 );
				mytd.innerHTML = "<b>" + photoposter[ 2 ] + ": </b>";

				//fill cell 2
				mytd = mytr.insertCell( 1 );
				mytd = createCheckbox( "C31", "lastwinner", photoposter[ 2 ], " " + sChallengeVoteScore + " ", mytd );

				//fill cell 3
				mytd = mytr.insertCell( 2 );
				mytd = createCheckbox( "C32", "lastsecond", photoposter[ 2 ], " " + ( sChallengeVoteScore - 1 ) + " ", mytd );
			}
			else //medals
			{
				//create table
				mytable = document.createElement( 'table' );

				//fill row 1
				mytr = mytable.insertRow( 0 );

				//fill cell 1
				mytd = mytr.insertCell( 0 );
				mytd.innerHTML = "<b>" + photoposter[ 0 ] + ": </b>";

				//fill cell 2
				mytd = mytr.insertCell( 1 );
				mytd = createCheckbox( "C11", "lastwinner", photoposter[ 0 ], " " + sGrandMotherVoteScore + " ", mytd);

				//fill row 2
				mytr = mytable.insertRow( 1 );

				//fill cell 1
				mytd = mytr.insertCell( 0 );
				mytd.innerHTML = "<b>" + photoposter[ 1 ] + ": </b>";

				//fill cell 2
				mytd = mytr.insertCell( 1 );
				mytd = createCheckbox( "C21", "lastwinner", photoposter[ 1 ], " " + sGrandMotherVoteScore + " ", mytd );

				//fill row 3
				mytr = mytable.insertRow( 2 );

				//fill cell 1
				mytd = mytr.insertCell( 0 );
				mytd.innerHTML = "<b>" + photoposter[ 2 ] + ": </b>";

				//fill cell 2
				mytd = mytr.insertCell( 1 );
				mytd = createCheckbox( "C31", "lastwinner", photoposter[ 2 ], " " + sGrandMotherVoteScore + " ", mytd );
			}

			//attach table to form
			myform.appendChild( mytable );

			//attach form to correct cell on page
			tds[ 1 ].appendChild( myform );

			//add eventhandlers (doesn't work if added during construction)
			for ( i = 0; i < myform.length; i++ )
			{
				myform.elements[ i ].addEventListener( 'click', function eventchangecheckbox( e ) { entermedal( ); }, false);
			}

			//set checked flags (also doesn't work if added during construction)
			sec1check = "";
			var bUpgrade = false;
			var bRockOn = false;
			if ( status.toUpperCase( ).match( "UPGRADE" ) == "UPGRADE" )
				bUpgrade = true;
			else if ( status.toUpperCase( ).match( "ROCK ON" ) == "ROCK ON" )
				bRockOn = true;

			if ( ( ( vote1 == sChallengeVoteScore ) && ( !bRockOn && !bUpgrade ) ) || ( ( vote1 == sUpgradeChallengeVoteScore ) && ( bUpgrade ) ) || ( ( vote1 == sRockOnChallengeVoteScore ) && ( bRockOn ) ) ) 
			{
				document.getElementById( "C11" ).checked = true;
				GM_setValue( "super.lastwinner", encodeURIComponent( photoposter[ 0 ] ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
			}
			else if ( ( vote1 == "" + ( iChallengeVoteScore - 1 ) ) && !bUpgrade && !bRockOn ) 
			{
				document.getElementById( "C12" ).checked = true;
				GM_setValue( "super.lastsecond", encodeURIComponent( photoposter [ 0 ] ) );
				sec1check = "set";
			}

			if ( ( ( vote2 == sChallengeVoteScore ) && ( !bRockOn && !bUpgrade ) ) || ( ( vote2 == sUpgradeChallengeVoteScore ) && ( bUpgrade ) ) || ( ( vote2 == sRockOnChallengeVoteScore ) && ( bRockOn ) ) ) 
			{
				document.getElementById( "C21" ).checked = true; 
				GM_setValue( "super.lastwinner", encodeURIComponent( photoposter[ 1 ] ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
			}
			else if ( ( vote2 == "" + ( iChallengeVoteScore - 1 ) ) && !bUpgrade && !bRockOn ) 
			{
				document.getElementById( "C22" ).checked = true;
				if ( sec1check == "" ) 
				{
					GM_setValue( "super.lastsecond", encodeURIComponent( photoposter[ 1 ] ) );
					sec1check = "set";
				}
				else 
					GM_setValue( "super.lastsecond2", encodeURIComponent( photoposter[ 1 ] ) );
			}

			if ( ( ( vote3 == sChallengeVoteScore ) && ( !bRockOn && !bUpgrade ) ) || ( ( vote3 == sUpgradeChallengeVoteScore ) && ( bUpgrade ) ) || ( ( vote3 == sRockOnChallengeVoteScore ) && ( bRockOn ) ) ) 
			{
				document.getElementById( "C31" ).checked = true;
				GM_setValue( "super.lastwinner", encodeURIComponent( photoposter[ 2 ] ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
			}
			else if ( ( vote3 == "" + ( iChallengeVoteScore - 1 ) ) && !bUpgrade && !bRockOn ) 
			{
				document.getElementById( "C32" ).checked = true;
				if ( sec1check == "" )
					GM_setValue( "super.lastsecond", encodeURIComponent( photoposter[ 2 ] ) )
				else
					GM_setValue( "super.lastsecond2", encodeURIComponent( photoposter[ 2 ] ) )
			}

		} // end of if is closed & status to vote


		//add headers

		var place = thisdocument.getElementById( "Tertiary" );

		//alert( place.innerHTML );

		//add super info
		place.appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "super-Info";
		myanchor.id = superchlgnr;
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickchallenge( e ) { displaydata( e ); }, false );
		place.appendChild( myanchor );

		//add super Bump
		place.appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "super-Bump";
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickchallenge( e ) { bumpmeup( );}, false );
		place.appendChild( myanchor );

		// add edit and delete functions to onclick property of all edit and delete links
		// copied originally from inline forum edit post
		EditSetEvents( );

		return;
	}

	function ProcessDetailDocInline( thread, title )
	{
GM_log( "Here - ProcessDetailDocInline" );
		var inbrackets = false;

		GM_xmlhttpRequest({
			method:"GET",
			url:thread,
			headers:{
				"User-Agent":"monkeyagent",
				"Accept":"text/monkey,text/xml"
			   },
			onload:function( responseDetails )
			{
				// extract challengenr and status out of title
				var threadnr = thread.split( '/' )[ 6 ];
				var chlgnr = title.split( " " )[ 0 ];
				var status = title;

				//GM_log( threadnr + "!" + chlgnr + "!" + status);

				// get td's out of discusstopic
				content = responseDetails.responseText.split('<div id="DiscussTopic">')[ 1 ].split('</div>')[ 0 ];
				tables = content.split('<table');
				challengetxt = tables[ 1 ].split('says:')[ 1 ].split('</small>')[ 0 ];
				tds = tables[ 2 ].split('<td class');

				// set commentcounter
				var commentcounter = ( tds.length - 1 ) / 2;

				// alert( tds.length );

				if ( tds[ 0 ] == null )
					return; // no tds in discusstopic... shouldn't happen

				// get the winner out of the 2nd td

				var winner = " ";
				var votetime = " ";
				var challengeopendate = getTimeAgo( content.split( "osted at " )[ 1 ].split( "\n" )[ 0 ] );

				/*if ( !inbrackets ) //stuff below doesn't exist in brackets
				{
					winner = challengetxt.split( "challenge is open" )[ 1 ].split( "<b>" )[ 1 ].split( "<" )[ 0 ];
					winner = winner.replace( /<br>/, "" ).replace( /\n/, "" ); //cleanup string removed .replace(" ","")
					if ( status.match( "OPEN" ) != "OPEN" ) 
					{
						votetime = challengetxt.split( "edited this topic " )[ 1 ].split( " ago." )[ 0 ];
					}
				}*/

				endofbrackets = 0;
				if ( inbrackets && ( tds.length > 3 ) ) //happens only in brackets
				{
					votetime = tds[ 2 ].split( "osted " )[ 1 ].split( " ago." )[ 0 ];
					if ( commentcounter != Math.round( commentcounter ) ) // we get this when we overflow to page 2
					{
						commentcounter = Math.round( commentcounter );
						endofbrackets = 1;
					}
				}

				// start looping td's from number 3 [2] & fetch all photos
				var i = 0;
				var tdnr = 0;
				var photoposter = new Array( );
				photoposter[ 0 ] = " ";
				photoposter[ 1 ] = " ";
				photoposter[ 2 ] = " ";
				var phototime = new Array( );
				phototime[ 0 ] = " ";
				phototime[ 1 ] = " ";
				phototime[ 2 ] = " ";
				var photonumber = 0;
				var photovoter = "";
				var lastvote = "no votes"

				for ( i = 2; i < tds.length + endofbrackets; i++ )
				{
					txt = tds[ i ];

					if ( txt.match( "says" ) == "says" ) 
					{
						txt2 = txt.split( "</h4>" )[ 1 ].split( "<small>" )[ 0 ]; //check on 2nd part because of extra img title for admins
						//alert( i + " / " + txt );
						//alert( i + " / " + txt2 );

						if ( txt2.match( "img" ) == "img" ) 
						{
							// photo found, now get username
							photoposter[ photonumber ] = txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ];
							photoposter[ photonumber ] = photoposter[ photonumber ].replace( /&amp;/g, "&" );

							if ( txt.match( "osted " ) == ( "osted " ) )
							{
								phototime[ photonumber ] = txt.split( "osted " )[ 1 ].split( " ago." )[ 0 ];
								//alert(photonumber + " / " + photoposter[ photonumber ] );
								photonumber++;
								tdnr = i; //remember position of last td
								//alert( photonumber + " / " + tdnr );
							}

						}

						if ( ( tdnr != i ) && ( ( photonumber == 3 ) || ( status.match( "TO VOTE" ) == "TO VOTE" ) || inbrackets ) ) 
						{
							// voter found, now get username
							photovoter = photovoter + txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ].replace( /&amp;/g, "&" ) + ": ";
							//alert( photovoter );
							// add the vote to string
							var ptag = tds[ i ].split( "<p>" )[ 1 ].split( "<small>" )[ 0 ];
							lastvote = ptag.split( "\t" )[ 8 ].split( "\t" )[ 0 ].replace( /&gt;/g, ">" );
							photovoter = photovoter + lastvote;
						}
					}
				} //end of for

				// get last comment if available
				if ( ( tdnr < tds.length - 1 ) && ( commentcounter > 3 ) && ( !inbrackets ) )
				{
					lastvote = lastvote.split( "\n" )[ 0 ];
					lastvote = lastvote.replace( /<br>/, "" ).replace( /\n/,"" ).replace( /&gt;/g, ">" ); //cleanup string
					if ( lastvote.match( "<img" ) == "<img" )
						lastvote = "no votes"; //capture error lastvote when text comment before last photo

					//.innerHTML.split( " " )[ 1 ].split( " " )[ 0 ];
				} 

				ddphoto1 = photoposter[ 0 ];
				ddphoto2 = photoposter[ 1 ];
				ddphoto3 = photoposter[ 2 ];

				if ( ddphoto1 != " " ) if ( ddwinner.indexOf( ddphoto1 ) != -1 ) chlgstatus = "ERR";
				if ( ddphoto2 != " " ) if ( ddwinner.indexOf( ddphoto2 ) != -1 ) chlgstatus = "ERR";
				if ( ddphoto3 != " " ) if ( ddwinner.indexOf( ddphoto3 ) != -1 ) chlgstatus = "ERR";

				// inside challenge - decode last vote if no spaces
				lastvote = detectNoSpaces( lastvote );

				var bUpgrade = false;
				var bRockOn = false;
				if ( status.toUpperCase( ).match( "UPGRADE" ) == "UPGRADE" )
					bUpgrade = true;
				if ( status.toUpperCase( ).match( "ROCK ON" ) == "ROCK ON" )
					bRockOn = true;

				if ( (lastvote.match( sUpgradeChallengeVoteScore ) == sUpgradeChallengeVoteScore ) && bUpgrade ) 
					chlgstatus = "FIN";
				else if ( (lastvote.match( sRockOnChallengeVoteScore ) == sRockOnChallengeVoteScore ) && bRockOn ) 
					chlgstatus = "FIN";
				else if ( ( ddphoto3 != " " ) && ( status.match( "VOTE" ) != "VOTE" ) )
					chlgstatus = "VOT";
				else
					chlgstatus = "OK";

				if ( inbrackets )
				{
					if ( chlgstatus == "FIN" ) chlgstatus = "OK"; // have to reset from before to check for fin again
					if ( commentcounter > 100 ) chlgstatus = "MAN"; // set manual flag
				}

				superchlgnr = "super." + chlgnr;
				GM_setValue( superchlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
				GM_setValue( superchlgnr + ".threadnr", threadnr );
				GM_setValue( superchlgnr + ".challengenr", chlgnr );
				GM_setValue( superchlgnr + ".commentcounter", commentcounter );
		 		GM_setValue( superchlgnr + ".status", encodeURIComponent( status ) );
				GM_setValue( superchlgnr + ".winner", encodeURIComponent( winner ) );
				GM_setValue( superchlgnr + ".photo1", encodeURIComponent( photoposter[ 0 ] ) );
				GM_setValue( superchlgnr + ".photo2", encodeURIComponent( photoposter[ 1 ] ) );
				GM_setValue( superchlgnr + ".photo3", encodeURIComponent( photoposter[ 2 ] ) );
				GM_setValue( superchlgnr + ".photovoter", encodeURIComponent( photovoter ) );

				// only tests these when new votes come in (others are cached)
				// have to bodge the string as it may start with a 0 which wont get counted
				lastvote = detectNoSpaces( lastvote );

				GM_setValue( superchlgnr+".lastvote", lastvote );
				GM_setValue( superchlgnr+".chlgstatus", chlgstatus );
				GM_setValue( "super.currentchallenge", chlgnr );

				GM_setValue( superchlgnr + ".tovotetime", converttotime( votetime ) );
				GM_setValue( superchlgnr + ".photo1time", converttotime( phototime[ 0 ] ) );
				GM_setValue( superchlgnr + ".photo2time", converttotime( phototime[ 1 ] ) );
				GM_setValue( superchlgnr + ".photo3time", converttotime( phototime[ 2 ] ) );

				GM_setValue( superchlgnr + ".tovotetimesince", encodeURIComponent( votetime ) );
				GM_setValue( superchlgnr + ".photo1timesince", encodeURIComponent( phototime[ 0 ] ) );
				GM_setValue( superchlgnr + ".photo2timesince", encodeURIComponent( phototime[ 1 ] ) );
				GM_setValue( superchlgnr + ".photo3timesince", encodeURIComponent( phototime[ 2 ] ) );

				var anchor = thisdocument.getElementById( thread );
				anchor.innerHTML = chlgstatus;
				anchor.title = lastvote;
				anchor.id = superchlgnr;
				anchor.href = thread;
				anchor.addEventListener( 'click', function eventclickmain( e ){ displaydata( e ); }, false );
			}
		} ); // end of GM_xmlhttpRequest
	}

	// *******************
	//  End of detail processing
	// *******************

	createCheckbox = function createCheckbox( cid, cname, cvalue, cinner, cell )
	{
		mycheckbox = document.createElement( "input" );
		mycheckbox.id = cid;
		mycheckbox.type = "checkbox";
		mycheckbox.name = cname;
		mycheckbox.value = cvalue;
		cell.appendChild( mycheckbox );
		cell.innerHTML += cinner;
		return cell;
	}

	// *******************
	//  Start of winner processing
	// *******************

	entermedal = function entermedal( ) //gets called when tickboxes are changed
	{
		winner = " ";
		second = " ";
		second2 = " ";

		medalform = document.getElementById( "Medalform" );


		for ( i = 0; i < medalform.length; ++i ) // run thru winner
		{
			if ( medalform.elements[ i ].checked )
			{
				if ( medalform.elements[ i ].name == "lastwinner" ) 
				{
					if ( winner == " " )
						winner = medalform.elements[ i ].value;
					else
						alert( "You entered more then 1 winner. Please check" );
				}
			}
		}

		for ( i = 0; i < medalform.length; ++i ) // run thru second
		{
			if ( medalform.elements[ i ].checked )
			{
				if ( medalform.elements[ i ].name == "lastsecond" )
				{
					if ( winner == medalform.elements[ i ].value )
						alert( "You cannot place somebody 1st and 2nd. Please check" );

					if ( second == " " )
						second = medalform.elements[ i ].value;
					else if ( second2 == " " )
						second2 = medalform.elements[ i ].value;
					else 
						alert( "You entered 3 photos in second place. Please check" );
				}
			}
		}

		GM_setValue( "super.lastwinner",encodeURIComponent( winner ) );
		GM_setValue( "super.lastsecond",encodeURIComponent( second ) );
		GM_setValue( "super.lastsecond2",encodeURIComponent( second2 ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );

	}

	// *******************
	// End of winner processing
	// *******************

	function Editchallenge( ) //gets called after a page for editing a challenge is opened
	{
		titlearea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'INPUT' )[ 2 ];
		lastwinner = decodeURIComponent( GM_getValue( "super.lastwinner" ) );
		lastsecond = decodeURIComponent( GM_getValue( "super.lastsecond" ) );
		lastsecond2 = decodeURIComponent( GM_getValue( "super.lastsecond2" ) );
		currentchlgnr = GM_getValue( "super.currentchallenge" );

		if ( ( titlearea.value.match( "TO VOTE" ) == "TO VOTE" ) && ( titlearea.name == "subject" ) && ( lastwinner != " " ) )
		{
			newtxt = "AWARDED (" + lastwinner;
			if ( lastsecond != " " )
				newtxt = newtxt + "/" + lastsecond;
			if ( lastsecond2 != " " )
				newtxt = newtxt + "/" + lastsecond2;
			newtxt = newtxt + ")";
			titlearea.value = titlearea.value.replace( "TO VOTE", newtxt );
		}

		if ( decodeURIComponent( GM_getValue( "super." + currentchlgnr + ".photo3" ) ) != " " )
			if ( titlearea.value.match( "OPEN" ) == "OPEN" )
				titlearea.value = titlearea.value.replace( "OPEN", "TO VOTE" );
	}

	Editchallengedeltarea = function Editchallengedeltarea( theeditor )
	{
		tas = theeditor.parentNode.getElementsByTagName( 'textarea' );
		theeditor.parentNode.innerHTML = tas[ 1 ].value;
		EditSetEvents( );
	}

	EditSetEvents = function EditSetEvents( )
	{
		//restore edit events
		/*allDivs = $x( '//small/a' );

		for ( var i = 0; i < allDivs.length; i++ )
		{
			thisDiv = allDivs[ i ];
			if( thisDiv.innerHTML == 'edit' )
			{
				thisDiv.addEventListener( "click", function( e ) { Editchallengeinline( this, e ); }, false );
				thisDiv.setAttribute( 'onClick', 'return false;' );
			}
		}*/
	}

	Editchallengeinline = function Editchallengeinline( link,e ) //initially taken from inline forum edit post by Steeev
	{
		if ( !e )
		{
			var e = window.event;
		}

		e.stopPropagation( );

		if ( e.metaKey || e.ctrlKey ) //ctrl + click means let's bump
		{
			location.href = link.href;
			return true;
		}

		supermotm = false;
		if ( link.getAttribute( 'href' ).match( "supermotm" ) == "supermotm" )
			supermotm = true;

		if ( document.getElementById( 'ined_' + link.getAttribute('href').split('/')[ topicidpos ] + link.getAttribute('href').split('/')[ postidpos ] ) )
			return false;

		if( link.parentNode.parentNode.innerHTML.match('<h4>') )
			blockquote = 1; //post contains a blockquote, which means the innerHTML is screwed up
		else
			blockquote = 0; 

		topicid = link.getAttribute('href').split('/')[ topicidpos ];
		postid = link.getAttribute('href').split('/')[ postidpos ];
		if( postid == 'edit' )
		{
			postid = '';
			mode = 'firstpost';
		}
		else
		{
			mode = 'anypost';
		}

		eddiv = document.createElement( 'div' );
		eddiv.setAttribute( 'id', 'ined_' + link.getAttribute( 'href' ).split( '/' )[ topicidpos ] + link.getAttribute( 'href' ).split( '/' )[ postidpos ] );
		eddiv.style.display = 'block !important';

		subbut = document.createElement( 'button' );
		subbut.setAttribute( 'class', 'Butt' );
		subbut.textContent = 'SAVE';
		subbut.addEventListener( "click", function( e ) { Editchallengepostitbaby( this.parentNode,link.getAttribute( 'href' ) ); }, false );
		//subbut.setAttribute('onclick','postitbaby(this.parentNode,"' + link.getAttribute('href') + '")');

		cancelbut = document.createElement( 'button' );
		cancelbut.setAttribute( 'class', 'DeleteButt' );
		cancelbut.textContent = 'Cancel';
		cancelbut.addEventListener( "click", function( e ) { Editchallengedeltarea( this.parentNode ); }, false );
		//cancelbut.setAttribute( 'onclick', 'deltarea( this.parentNode )' );

		fulledit = document.createElement( 'a' );
		fulledit.setAttribute( 'href', link );
		fulledit.textContent = 'Full Edit';

		tarea = document.createElement( 'textarea' );
		tarea.setAttribute( 'id', 'tarea' );
		tarea.setAttribute( 'name', 'textarea' );
		if ( mode == "firstpost" )
			tarea.setAttribute( 'rows', '15' );
		else
			tarea.setAttribute( 'rows', '4' );
		tarea.style.width = '410px';

		// store the old html in here
		tarea2 = document.createElement( 'textarea' );
		tarea2.setAttribute( 'id', 'tmptarea' );
		tarea2.style.display = 'none';
		//tarea2.setAttribute( 'rows', '10' );
		//tarea2.style.width = '400px';

		if ( mode == 'firstpost' )
		{
			topic_title = $x( "//td[@id='GoodStuff']/h2[1]" )[ 0 ].textContent;

			//super admin add ons
			titlearea = topic_title;

			lastwinner = decodeURIComponent( GM_getValue( "super.lastwinner" ) );
			lastsecond = decodeURIComponent( GM_getValue( "super.lastsecond" ) );
			lastsecond2 = decodeURIComponent(GM_getValue("super.lastsecond2" ) );
			currentchlgnr = GM_getValue( "super.currentchallenge" );

			if ( ( titlearea.match( "TO VOTE" ) == "TO VOTE" ) && ( lastwinner != " " ) && !supermotm )
			{
				newtxt = "AWARDED (" + lastwinner;

				if ( lastsecond != " " )
					newtxt = newtxt + "/" + lastsecond;
				if ( lastsecond2 != " " )
					newtxt = newtxt + "/" + lastsecond2;

				newtxt = newtxt + ")";
				titlearea = titlearea.replace( "TO VOTE", newtxt );
			}

			if ( decodeURIComponent( GM_getValue( "super." + currentchlgnr + ".photo3" ) ) != " " )
				if ( ( titlearea.match( "OPEN" ) == "OPEN" ) && !supermotm )
					titlearea = titlearea.replace( "OPEN", "TO VOTE" );

			topic_title = titlearea;
			//super add ons till here

			subjbox = document.createElement( 'input' );
			subjbox.setAttribute( 'type', 'text' );
			subjbox.setAttribute( 'id', 'tbox' );
			subjbox.style.width = '400px';
			subjbox.value = topic_title;
			eddiv.appendChild( subjbox );
			eddiv.appendChild( document.createElement( '<br>' ) );
		}

		eddiv.appendChild( fulledit );
		eddiv.appendChild( document.createElement('<br>') );
		eddiv.appendChild( tarea );
		eddiv.appendChild( tarea2 );
		eddiv.appendChild( document.createElement('<br>') );
		eddiv.appendChild( subbut );
		eddiv.appendChild( document.createTextNode(' OR ') );
		eddiv.appendChild( cancelbut );

		if( blockquote )
		{
			link.parentNode.parentNode.setAttribute( 'id', ( 'td_' + topicid ) + postid );
			aitch4 = '<h4>' + TrimString( link.parentNode.parentNode.innerHTML.split( '<h4>' )[ 1 ].split( '</h4>' )[ 0 ] ) + '</h4>';
			small = '<small>' + TrimString( link.parentNode.innerHTML ) + '</small>';
			content = link.parentNode.parentNode.innerHTML.split( '</h4>' )[ 1 ].split( '<small>' )[ 0 ];
		}
		else
		{
			link.parentNode.parentNode.parentNode.setAttribute( 'id', ( 'td_' + topicid ) + postid );
			aitch4 = '<h4>' + TrimString( link.parentNode.parentNode.parentNode.innerHTML.split( '<h4>' )[ 1 ].split( '</h4>' )[ 0 ] ) + '</h4>';
			small = '<small>' + TrimString( link.parentNode.innerHTML ) + '</small>';
			content = link.parentNode.parentNode.parentNode.innerHTML.split('</h4>')[ 1 ].split('<small>')[ 0 ];
		}

		content = content.replace( /<span[^>]*/g, "<span", 'g' ).replace( /<span>|<\/span>/g, '', 'g' );
		content = content.replace( '<p>', '', 'g' );
		content = content.replace( '</p>', '', 'g' );
		content = content.replace( '<p/>' ,'' ,'g' );
		content = TrimString( content );

		tarea.innerHTML = TrimString( content.replace( '<br>', '', 'g' ).replace( '<br/>', '', 'g' ) );

		tdcontents = aitch4 + content + small;
		tarea2.innerHTML = tdcontents;
		thetd = document.getElementById( ( 'td_' + topicid ) + postid );
		thetd.innerHTML = aitch4 + small;
		theh4 = thetd.getElementsByTagName( 'h4' )[ 0 ];
		theh4.parentNode.insertBefore( eddiv, theh4.nextSibling );  

		tarea.focus( );

		return;

	} // end inlineedit function

	Editchallengepostitbaby = function Editchallengepostitbaby( node, editlink )
	{
		if( node.innerHTML.match( /<input/ ) )
		{
			subject = encodeURIComponent( node.getElementsByTagName( 'input' )[ 0 ].value );
			fullsubject = '&subject=' + subject;
		}
		else
		{
			subject = '';
			fullsubject = '';
		}

		message = encodeURIComponent( node.getElementsByTagName( 'textarea' )[ 0 ].value );

		fullmessage = '&message=' + message;

		data = 'magic_cookie=' + unsafeWindow.global_auth_hash + "&done=1" + fullmessage  + fullsubject;
		hostname = unsafeWindow.document.location.href.split( '/' )[ 2 ];

		apiurl = "http://" + hostname + editlink;

		p = new XMLHttpRequest( );
		p.open( "POST", apiurl, false );
		p.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
		p.setRequestHeader( "Referer", apiurl );
		p.setRequestHeader( "User-agent", "Mozilla/4.0 (compatible) Greasemonkey - Flickr Inline Forum Post Editor" );
		p.send( data );

		if( p.status != 200 )
		{
			alert( 'Error saving changes!' );
			//unsafeWindow.deltarea( node );
			//node.previousSibling.style.display = 'block';
			//node.parentNode.removeChild( node );
			return false;
		}

		//delete textarea + substitute old text with new;
		if( editlink.split( '/' )[ postidpos ] == 'edit' ) 
			postid = '';
		else
			postid = editlink.split( '/' )[ postidpos ];
		topicid = editlink.split( '/' )[ topicidpos ];


		aitch4 = '<h4>' + TrimString($x('//textarea',node)[ 1 ].value.split('<h4>')[ 1 ].split('</h4>')[ 0 ]) + '</h4>';
		small='<small>'+ TrimString($x('//textarea',node)[ 1 ].value.split('<small>')[ 1 ].split('</small>')[ 0 ]) +'</small>';
		//smallago=small.split( 'ago' )[ 1 ];
		//small=small.split('edited this ')[ 0 ] + " edited this post 1 nano second ago " + smallago;

		thetd = document.getElementById( ( 'td_' + topicid ) + postid );
		thetd.innerHTML = aitch4 + $x('//textarea',node)[ 0 ].value.replace('\n','\n<br\>','g') + "<br/>" +  small;

		if( !postid )
			$x("//td[@id='GoodStuff']/h2[1]")[ 0 ].innerHTML = decodeURIComponent( subject );

		EditSetEvents( );

		if ( decodeURIComponent( subject ).indexOf( "TO VOTE" ) != -1 ) 
		{
			GM_setValue( "super." + decodeURIComponent( subject ).split( " " )[ 0 ] + ".tovotetime", converttotime( "a moment" ) );

			//GM_setValue( superchlgnr + ".tovotetime", converttotime( "Posted 1 second ago." ) );
		}

		return;
	}// end postitbaby function

	// *******************
	// Start of Createnewchallenge
	// *******************

	insertChallengetxt = function insertChallengetxt( )
	{
		t = document.getElementById( 'themeselect' );
		challengetxtval[ 1 ] = GM_getValue( "super.normalchlgheader" );
		challengetxtval[ 2 ] = GM_getValue( "super.medalchlgheader" );

		//check if variables are filled in + alert
		if ( decodeURIComponent( GM_getValue( "super.lastwinner" ) ) == " " )
		{
			if ( GM_getValue( "super.lastchallenge" ) == "" )
				alert( "No last challenge found: \nplease fill in challenge number \nand winner name or medals player names" );
			else
				alert( "Please fill in winner name or medals player names" ); 
		}

		this.textarea.value = challengetxtval[ challengetxtnode.value ] ;
		if ( challengetxtnode.value == "3" )
			this.titlearea.value = "11 - OPEN - Theme: UPGRADE CHALLENGE"/* + t.options[ t.selectedIndex ].text*/;
		else if ( challengetxtnode.value == "4" )
			this.titlearea.value = "12 - OPEN - Theme: ROCK ON! CHALLENGE"/* + t.options[ t.selectedIndex ].text*/;
		else
			this.titlearea.value = GM_getValue( "super.lastchallenge" ) + " - OPEN - Theme: " + t.options[ t.selectedIndex ].text;

		//replace winner field
		if ( decodeURIComponent( GM_getValue( "super.lastwinner" ) ) != " " && challengetxtnode.value == 1 ) 
		{
			this.textarea.value = this.textarea.value.replace( "winner", decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
		}
		else if ( decodeURIComponent( GM_getValue( "super.lastmedalsplayers" ) ) != " " )
			this.textarea.value = this.textarea.value.replace( "Challenger 1 / Challenger 2 / Challenger 3", decodeURIComponent( GM_getValue( "super.lastmedalsplayers" ) ) );
	}

	insertChallengetheme = function insertChallengetheme( )
	{
		t = document.getElementById( 'themeselect' );
		if ( challengetxtnode.value == "1" )
		{
			var sThemeString = t.options[ t.selectedIndex ].text;
			this.titlearea.value = this.titlearea.value.split( "Theme:" )[ 0 ] + "Theme: " + sThemeString;

			if ( sThemeString.match( "Race for the Medals" ) == "Race for the Medals" )
			{
				this.textarea.value = GM_getValue( "super.racechlgheader" );
			}
			else if ( sThemeString.match( "Upgrade Challenge" ) == "Upgrade Challenge" )
			{
				this.textarea.value = GM_getValue( "super.upgradechlgheader" );
			}
			else
			{
				this.textarea.value = GM_getValue( "super.normalchlgheader" );
			}

			// replace winner
			this.textarea.value = this.textarea.value.replace( "Previous Winner", decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
		}
	}


	Createnewchallenge = function Createnewchallenge( )
	{
		//myWindow = window.open( '', 'Log page', 'top=50, left=100, width=800, height=600, scrollbars=yes, resizable = yes' )
		//myWindow.document.open( "text/html", "replace" );
		//myWindow.document.write( "<P><h1>super Admin tool log</h1></p>" );

		themelist = GM_getValue( "super.themelist" );
		if ( themelist != "" )
			challengethemeval = themelist.split( "||" );

		challengetxtval[ 1 ] = GM_getValue( "super.normalchlgheader" );
		challengetxtval[ 2 ] = GM_getValue( "super.medalchlgheader" );

		//myWindow.document.write( "<p>"+themelist+"</p>" );

		var activethemeval = new Array( );
		activethemes = decodeURIComponent( GM_getValue( "super.activethemes" ) );
		if ( activethemes != "" )
			activethemeval = activethemes.split( "||" );

		//myWindow.document.write( "<p>"+activethemes+"</p>" );

		var v1 = "";
		var v2 = "";

		//GM_log( "Start of Active themes" );
		//for ( j = 0; j < activethemeval.length - 1; j++ )
		//    {
		//    v2 = activethemeval[ j ].replace(/in /i,"In_").replace(/the /i,"the_").split(" ")[ 0 ].split("/s")[ 0 ];
		//    GM_log( v2 );
		//    }
		//GM_log( "End of Active themes" );

		//alert( encodeURI( challengethemeval[ 5 ].substr( 0, 4 ).replace(/\r/, "" ) ) );

		//GM_log("Start Comparison Themelist - Active themes");
		for ( i = 1; i < challengethemeval.length; i++ )
		{
			for ( j = 0; j < activethemeval.length - 1; j++ )
			{
				v1 = challengethemeval[ i ].replace(/\r/,"").replace(/^\s+/, '').replace(/&amp;/g,"&").replace(/in /i,"In_").replace( /the /i, "the_" ).split( " " )[ 0 ].split( "/s" )[ 0 ];  //skip linefeed in first char
				v2 = activethemeval[ j ].replace(/^\s+/, '').replace(/in /i,"In_").replace(/the /i,"the_").split( " " )[ 0 ].split( "/s" )[ 0 ];
				//myWindow.document.write("<p>|"+v1+"|"+v2+"|</p>");
				if ( v1 == v2 ) 
				{
					//myWindow.document.writeln("<p><h1>*"+challengethemeval[i]+"*"+activethemeval[j]+"*</h1></p>");
					//GM_log("Match found - Themelist: '" + v1 + "', from: '" + challengethemeval[i] + "'");
					//GM_log("Match found - Active: '" + v2 + "', Active: '" + activethemeval[j] + "'");

					challengethemeval[ i ] = "*** " + challengethemeval[ i ] + " *** (in play)";
				}
			}
		}

		//GM_log("End Comparison Themelist - Active themes");

		//myWindow.document.close( );
		//myWindow.focus( );

		lastchallenge = GM_getValue( "super.lastchallenge" );

		//check if variables are filled in + alert
		if ( decodeURIComponent( GM_getValue( "super.lastwinner" ) ) == " " )
		{
			if ( lastchallenge == "" )
				alert( "No last challenge found: \nplease fill in challenge number \nand winner name or medals player names" ); 
			else
				alert( "Please fill in winner name" );
		}

		//start inserting pull down lists
		this.textarea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'TEXTAREA' )[ 0 ];
		var n = document.createElement( 'SELECT' );

		this.titlearea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'INPUT' )[ 3 ];
		var m = document.createElement( 'SELECT' );

		n.addEventListener( 'change', function eventchangeinsertchallengetheme( e ){ insertChallengetxt( ); insertChallengetheme( ); }, false );
		m.addEventListener( 'change', function eventchangeinsertchallengetheme( e ){ insertChallengetheme( ); }, false );

		n.innerHTML = '<option value="1">Regular challenge</option>' + '<option value="2">Medals challenge</option>';

		m.innerHTML = '';
		m.id = 'themeselect';

		for ( i = 0; i < challengethemeval.length; i++ )
		{
			m.innerHTML = m.innerHTML + '<option value="' + i + ">" + challengethemeval[ i ] + '</option>';
		}

		var sRand = "0";
		if ( challengethemeval.length > 0 )
		{
			var bValid = false;
			while ( !bValid )
			{
				var iTheme = parseInt( Math.random( ) * challengethemeval.length );
				sRand = "" + iTheme;
				if ( challengethemeval[ iTheme ].length > 1 )
				{
					bValid = true;
				}
			}
		}
		m.value = sRand;

		//start filling up textarea
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
		this.textarea.parentNode.insertBefore( document.createTextNode( 'super challenge type: ' ), this.textarea );
		this.textarea.parentNode.insertBefore( n, this.textarea );
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );

		challengetxtnode = n;

		if ( lastchallenge != "11" )
			challengetxtnode.value = "1";
		else
			challengetxtnode.value = "2";
		this.textarea.value = challengetxtval[ challengetxtnode.value ];

		//replace winner name
		if ( decodeURIComponent( GM_getValue( "super.lastwinner" ) ) != " " )
		{
			if ( challengetxtnode.value == 1 )
				this.textarea.value = this.textarea.value.replace( "winner", decodeURIComponent( GM_getValue( "super.lastwinner" ) ) );
			else if ( decodeURIComponent( GM_getValue( "super.lastmedalsplayers" ) ) != " " )
				this.textarea.value = this.textarea.value.replace( "Challenger 1 / Challenger 2 / Challenger 3", decodeURIComponent( GM_getValue( "super.lastmedalsplayers" ) ) );
		}
		
		//start filling up textarea
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createTextNode( 'super theme: ' ), this.titlearea );
		this.titlearea.parentNode.insertBefore( m, this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );

		if ( lastChallenge == "11" )
		{
			this.titlearea.value = lastchallenge + " - OPEN - Theme: UPGRADE CHALLENGE";
		}
		else if ( lastChallenge == "12" )
		{
			this.titlearea.value = lastchallenge + " - OPEN - Theme: ROCK ON! CHALLENGE";
		}

		else
		{ 
			this.titlearea.value = lastchallenge + " - OPEN - Theme: [select from list]";
		}

		insertChallengetheme( );
	}

	// *******************
	//  End of Createnewchallenge
	// *******************

	// *******************
	//  Start of Platinum processing
	// *******************

	function ProcessPlatinumDetailDoc( )
	{
		var threadnr = thislocation.href.split( '/' )[ 6 ];
		//GM_log( "detaildoc threadnr: " + threadnr );

		// select goodstuff

		var title = thisdocument.getElementById( "GoodStuff" ).innerHTML;

		// extract challengenr and status out of title

		var chlgnr = title.split( "<h2>" )[ 1 ].split( " " )[ 0 ];
		var status = title.split( "<h2>" )[ 1 ].split( "<" )[ 0 ].replace( /&amp;/g, "&" );
		//var status = title.split( " - " )[ 1 ].split( " - " )[ 0 ];

		superchlgnr = "super." + chlgnr;

		//GM_log( chlgnr );

		if ( status.match( "Category" ) == "Category" ) //only process brackets
		{
			// get td's out of discusstopic

			var discuss = thisdocument.getElementById( "DiscussTopic" );
			var tds = discuss.getElementsByTagName( "td" );

			// set commentcounter
			var commentcounter = ( tds.length - 3 ) / 2;

			endofbrackets = 0;
			if ( commentcounter != Math.round( commentcounter ) ) // we get this when we overflow to page 2
			{
				commentcounter = Math.round( commentcounter );
				endofbrackets = 1;
			}

			// alert( tds.length );

			if ( tds[ 0 ] == null )
				return; // no tds in discusstopic... shouldn't happen

			// get the winner out of the 2nd td

			//GM_log( discuss.innerHTML );
			var winner = " ";
			var votetime = " ";
			var challengeopendate = getTimeAgo( discuss.split( "osted at " )[ 1 ].split( "\n" )[ 0 ] );

			// start looping td's from number 3 [2] & fetch all photos
			var i = 0;
			var tdnr = 0;
			var photoposter = new Array( );
			photoposter[ 0 ] = " ";
			photoposter[ 1 ] = " ";
			photoposter[ 2 ] = " ";
			var photonumber = 0;
			var photovoter = "";

			for ( i = 2; i < tds.length - 1 + endofbrackets; i++ )
			{
				txt = tds[ i ].innerHTML;

				if ( txt.match( "says" ) == "says" )
				{
					txt2 = txt.split( "</h4>" )[ 1 ].split( "<small>" )[ 0 ]; //check on 2nd part because of extra img title for admins
					//alert( i + " / " + txt );
					//alert( i + " / " + txt2 );

					if ( txt2.match( "img" ) == "img" )
					{
						// photo found, now get username
						photoposter[ photonumber ] = ( photonumber + 1 ) + ". " + txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ];
						photoposter[ photonumber ] = photoposter[ photonumber ].replace( /&amp;/g, "&" );
						//phototime[ photonumber ] = txt.split( "osted " )[ 1 ].split( " ago." )[ 0 ];
						//alert( photonumber + " / " + photoposter[ photonumber] );
						photonumber++;
						tdnr = i; //remember position of last td
						//alert( photonumber + " / " + tdnr );

					}
					else
					{
						// voter found, now get username
						photovoter = photovoter + txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ].replace( /&amp;/g, "&" ) + ": ";
						//alert( photovoter );

						// add the vote to string
						var ptag = tds[ i ].getElementsByTagName( 'p' );
						photovoter = photovoter + ptag[ 0 ].innerHTML.split( "\t" )[ 8 ].split( "\t" )[ 0 ].replace( /&gt;/g, ">" );
					}
				}
			}

			GM_setValue( superchlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
			GM_setValue( superchlgnr + ".threadnr", threadnr );
			GM_setValue( superchlgnr + ".challengenr", chlgnr );
			GM_setValue( superchlgnr + ".commentcounter", commentcounter );
			GM_setValue( superchlgnr + ".status", encodeURIComponent( status ) );
			GM_setValue( superchlgnr + ".photo1", encodeURIComponent( photoposter ) );
			GM_setValue( superchlgnr + ".photovoter", encodeURIComponent( photovoter ) );
			GM_setValue( "super.currentchallenge", chlgnr );

			//add headers

			var place = thisdocument.getElementById( "Tertiary" );

			//alert( place.innerHTML );

			//add super info
			place.appendChild( thisdocument.createTextNode( ' / ' ) );
			myanchor = thisdocument.createElement( 'a' );
			myanchor.innerHTML = "super-Info";
			myanchor.id = superchlgnr;
			myanchor.href = "#";
			myanchor.setAttribute( 'onClick', 'return false;' );
			myanchor.addEventListener( 'click', function eventclickchallenge( e ){ displayplatinumdata( e ); }, false );
			place.appendChild( myanchor );

			//add super Bump
			place.appendChild( thisdocument.createTextNode( ' / ' ) );
			myanchor = thisdocument.createElement( 'a' );
			myanchor.innerHTML = "super-Bump";
			myanchor.href = "#";
			myanchor.setAttribute( 'onClick', 'return false;' );
			myanchor.addEventListener( 'click', function eventclickchallenge( e ){ bumpmeup( ); }, false );
			place.appendChild( myanchor );
		}
		// add edit and delete functions to onclick property of all edit and delete links
		// copied originally from inline forum edit post
		EditSetEvents( );

		return;
	}

	runsuperTool = function runsuperTool( )
	{
		// check if we have GM variables
		if ( GM_getValue( "super.version" ) == undefined )
			initdata( );
	
		if ( GM_getValue( "super.version" ) != supertoolDBversion )
			initdata( );

		// check themelist & chlgheaders

		themelisttime = GM_getValue( "super.themelisttime" );
		if ( ( themelisttime == undefined ) || ( themelisttime == "" ) ) 
		{
			loadthemelist( );
			loadchlgheader( );
		}  
		themelisttime = GM_getValue( "super.themelisttime" );
		elapstime = superStartTime.getTime( ) - themelisttime;
		if ( elapstime > 1000 * 60 * 60 * 24 ) 
		{
			loadthemelist( );
			loadchlgheader( );
		}  

		if (GM_getValue("super.brackets")!="false")
		{
			GM_setValue("super.brackets","false"); //reset brackets status when we start
		}

		if ( ( thislocation.href.match( "flickr.com/photos/" ) == "flickr.com/photos/" ) ||
			( thislocation.href.match( "flickr.com//photos/" ) == "flickr.com//photos/" ) ) 
		{
			// ************************
			// check for awards on photo page
			// ************************
			Award.init( );
		}
		else if ( thislocation.href.match( "/groups/superplatinum/" ) == "/groups/superplatinum/" )
		{
			// in super platinum for brackets qualifying.
			if ( thisdocument.title.split( " " )[ 1 ] == "Discussing")
			{
				// ***********
				// detail page
				// ***********
				ProcessPlatinumDetailDoc( );
			}
		}
		else if ( GM_getValue( "super.bumping" ) != "false" )
		{
			bumpmeup( ); //if in bumping mode, go to bump processing
		}
		else if ( GM_getValue( "super.bumpAllState" ) == "processing" )
		{
			bumpall( );
			return;
		}
		else if ( thisdocument.title.match( "discussion topics" ) == "discussion topics" )
		{
			// ************************
			// main photo super page
			// ************************
			//alert( "in main" );
			if ( GM_getValue( "super.bumping" ) != "false" )
			{
				GM_setValue( "super.bumping", "false" ); //reset bumping status if we're in discuss
			}
			GM_setValue( "super.postedcomment", "false" );
	
			ProcessMainDoc( );
		}
		else if ( thisdocument.title.split( " " )[ 1 ] == "Discussing" )
		{
			// ***********
			// detail page
			// ***********
			//alert( "in detail" );
	
			GM_setValue( "super.postedcomment", "false" );
			ProcessDetailDoc( );
		}
		else if ( thislocation == "http://www.flickr.com/groups_newtopic.gne?id=809007@N22" )
		{
			Createnewchallenge( );
		}
		else if ( thislocation.href.match( "/edit/" ) == "/edit/" )
		{
			Editchallenge( );
		}
	
		addsuperheader( );
	
		GM_registerMenuCommand( "Initialise super Admin data (themes, headers, ...)", initdatafrommenu );
	}


	// *******************
	// Start of processing
	// *******************

	if ( window.name == 'Log page' )
		return; //don't process log page

	var thislocation = location;
	var thisdocument = document;
	var discusstrs;

	runsuperTool( );

	return;

	// *******************
	//  End of processing
	// *******************

} )( );