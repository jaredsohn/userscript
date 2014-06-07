// ==UserScript==
// @name		Flickr Game admin tool
// @namespace		http://www.flickr.com/groups/yes_or_no/
// @description		An admin tool for the Flickr Game group - V0.4
// @version		0.4
// @identifier	
// @date		
// @creator		KVangeel (Kris Vangeel) & Allan Bruce (charminbayurr)
// @modified by		RKho (pipeguru) for Ease Game group
// @modified date   	17 January 2010
// 
// @include		http://www.flickr.com/groups/yes_or_no/discuss/*
// @include		http://www.flickr.com/groups/yes_or_no/discuss/
// @include		http://flickr.com/groups/yes_or_no/discuss/*
// @include		http://flickr.com/groups/yes_or_no/discuss/
// @include		http://www.flickr.com/groups_newtopic.gne?id=537774@N20
// @include		http://*flickr.com/photos/*/*
// @include		http://*flickr.com//photos/*/*
// @include		http://www.flickr.com/groups/yes_or_no/discuss/*/edit/
// @exclude		http://www.flickr.com/groups/yes_or_no/discuss/*/lock/
//
// Revision history
//
// v0.1: modified varibles for Game group
// v0.2: closing challenge allowing only 1 winner
// v0.3: adding pulldown menu for creating new challenge
// v0.3a: bug fix resolving UCI conflict & include *Game Daily Chat to bumpall
// v0.4: added pulldown for varoius Game Themes & Game On Award
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

(function Gameadmintool( ) 
{
	var GameStartTime = new Date( );
	var Gametoolversion = "V0.4";
	var GametoolDBversion = "V0.4";

	var topicidpos = 9;
	var postidpos = 10;

	var help1;
	var help2;

	var iGameVoteScore = 5;
	var sGameVoteScore = "" + iGameVoteScore;

	var iGameX2VoteScore = 10;
	var sGameX2VoteScore = "" + iGameX2VoteScore;

	var iGameX3VoteScore = 10;
	var sGameX3VoteScore = "" + iGameX3VoteScore;

	//global variables for adding new challenges
	var challengetxtval = [ '',											// 0
				'Error uploading header from the back room, please use copy paste to update.',		// 1
				'Error uploading header from the back room, please use copy paste to update.' ];	// 2

	var challengetxtnode;

	challengethemeval = [ 	'',
        'CY Challenge Winners',
        '3Way Challenge Winners',
        'Thumbs Up Challenge Winners',
        'Challenge Group Game Winners',
        'The Challenge Factory Winners',
        'Friendly Challenges Winners',
        'You Rock! Challenge Winners',
        'Super Hero Challenge Winners',
        'A3B Winners',
        '-----',
        'Any Medal + 10-20 faves',
        'At Least 3 Medals',
        'At Least 4 Medals',
        'Any Medal + 5-10 Faves',
        'Any Medal + 15 Faves',
        'Undiscovered Gem (Less than 25 views)',
        'Anything Goes (with medal)',
        '-----',
        'Vanishing Point',
        'Bokeh',
        'Depth of Field (shallow)',
        'Rule of Thirds',
        '-----',
        'From latest Page Medaled of course',
        'Scape',
        'Landscape (mostly land)',
        'Skyscape (mostly sky)',
        'Seascape',
        'Lakescape',
        'Riverscape',
        'Cityscape',
        'City Light/s',
        'Panorama',
        'Outdoors',
        '---',
        'Shoot the Shooter',
        'Person/People in Uniform (or At Work)',
        'Person or People',
        'Person/People - no children',
        'Self Portrait',
        'Candid Portrait',
        'Portrait',
        'B&W Portrait',
        'A Couple of People (just 2)',
        'Children at Play',
        'City Life',
        '-----',
        'Musician/s',
        'Concert',
        'Fireworks',
        '-----',
        'Texture',
        'Wood',
        'Wood (Not Tree/s)',
        'Shiny',
        'Metal',
        'Tree/s',
        'Forest',
        'Blooming Tree/s',
        'Rock/s',
        'Big rocks',
        'Seashell/s',
        '-----',
        'Machinery',
        'Clock/s',
        'Toy/s',
        '-----',
        'In the Water',
        'Waterfall/s',
        'Splash',
        'Wave/s',
        'Wet',
        '-----',
        'Still life',
        'Simple Thing/s',
        'Everyday Item/s',
        'Minimalism (as few things as possible)',
        'Statue/s',
        'Monument/s',
        'Public Art',
        'Graffiti',
        'Billboard/s',
        'Road Sign/s',
        '-----',
        'Wildflower/s',
        'Sunflower/s',
        'Flower/s',
        'Flower/s in a Vase',
        'Tulip/s',
        'Rose/s',
        'Dandelion/s',
        'Leaf/Leaves',
        'Plant/s (no flowers)',
        'Seed(s) or Seedhead',
        '-----',
        'Macro',
        'Macro (in nature)',
        'Macro (manmade)',
        '-----',    
				'First Poster Chooses:' ];

	var challengethemenode;

	//global variables for adding medals
	var val = [ '',														                //0

		'<a href="http://www.flickr.com/groups/yes_or_no/pool/">'
		+ '<img src="http://farm4.static.flickr.com/3024/2907523025_918645b166_m.jpg"height="149"width="240"></a>'
		+ '</a>'
		+ '\nWell done!!!</a>',											                        //1

		'<a href="http://www.flickr.com/groups/yes_or_no/pool/">'
		+ '<img src="http://farm4.static.flickr.com/3338/3447757495_bd140e8342.jpg"height="149"width="240"></a>'
		+ '</a>'
		+ '\nYou beaten other Game winner!!!</a>',								                       //2

		'<a href="http://www.flickr.com/groups/yes_or_no/pool/">'
		+ '<img src="http://farm3.static.flickr.com/2804/4301023543_25d6f0e71d_m.jpg"height="149"width="240"></a>'
		+ '</a>'
		+ '\nWell done!!! You did it again.</a>',				    	                                               //3

		'<a href="http://www.flickr.com/photos/hervcha-itsalongwayto/4327492207/">'
		+ '<img src="http://farm3.static.flickr.com/2771/4327492207_ff33a4e9c6_m.jpg" width="240" height="149" alt="GWX3ok.jpg" /></a>'
		+ '</a>'
		+ '\nExcellent!!! You beaten other GameX2 winner.</a>',								               //4

		'<a href="http://www.flickr.com/photos/tvor/4390586844/">'
		+ '<img src="http://farm5.static.flickr.com/4003/4390586844_6419350a82_m.jpg" width="240" height="149" alt="game Monthly medal" /></a>'
		+ '</a>'
		+ '\nExcellent!!! Your photo beats them all.</a>'                                  //5
    
    ]								               

	var node;
	var processforGame;

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
		checktext[ 0 ] = "Chat";
		checktext[ 1 ] = "Sweeps!!!!!";
		checktext[ 2 ] = "GameX2 Winners Photo Gallery";
		checktext[ 3 ] = "GameX3 Winners Photo Gallery";
		checktext[ 4 ] = "Game Meet";
		checktext[ 5 ] = "Game Icon";
		checktext[ 6 ] = "Game On";
		checktext[ 7 ] = "Game SWEEPS";
		checktext[ 8 ] = "Group Links";


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
		Gametime = GameStartTime.getTime( );
		timevalue = elaps.split( " " )[ 0 ];

		if ( elaps.match( "moment" ) == "moment" ) t = Gametime;
		else if ( elaps.match( "second" ) == "second" ) t = Gametime - timevalue * 1000;
		else if ( elaps.match( "minute" ) == "minute" ) t = Gametime - ( timevalue - 0.5 ) * 1000 * 60;
		else if ( elaps.match( "hour" ) == "hour" ) t = Gametime - ( timevalue - 0.5 ) * 1000 * 60 * 60;
		else if ( elaps.match( "day" ) == "day" ) t = Gametime - ( timevalue - 0.5 ) * 1000 * 60 * 60 * 24;
		else if ( elaps.match( "week" ) == "week" ) t = Gametime - ( timevalue - 0.5 ) * 1000 * 60 * 60 * 24 * 7;
		else if ( elaps.match( "month" ) == "month" ) t = Gametime - ( timevalue - 0.5 ) * 1000 * 60 * 60 * 24 * 7 * 30;

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
			if (GM_getValue("Game.postedcomment")=="true")
			{
				//alert('in set tag');
				var tagtext = "";
				if ( GM_getValue( "Game.postedmedal" ) == "1" ) tagtext = '"Game Winner"'; //currently no tags set yet
				if ( GM_getValue( "Game.postedmedal" ) == "2" ) tagtext = '"GameX2 Winner"';
				if ( GM_getValue( "Game.postedmedal" ) == "3" ) tagtext = '"GameX2 Sweep Winner"';
				if ( GM_getValue( "Game.postedmedal" ) == "4" ) tagtext = '"GameX3 Winner"';
				if ( GM_getValue( "Game.postedmedal" ) == "5" ) tagtext = '"Game On Winner"';

				document.getElementById( 'addtagbox' ).value = tagtext;
				if ( tagtext != "" ) 
				{
					//document.getElementById( 'tagadderform' ).submit( );
					document.getElementById( 'tagadderform' ).elements[ 2 ].click( );

				}
				GM_setValue( "Game.postedcomment", "false" );
				return;
			}

			processforGame = false;
			if ( ( document.referrer.match( "yes_or_no/discuss" ) == "yes_or_no/discuss" ) ||
				 ( document.referrer.match( "yes_or_no/discuss" ) == "yes_or_no/discuss" ) ||
				 ( GM_getValue( "Game.paginate" ) == "true" )	) 
			{
				processforGame = true;
				
				GM_setValue( "Game.paginate", "false" ); // switch off paginateswitch
				this.textarea = document.getElementById( 'DiscussPhoto' ).getElementsByTagName( 'TEXTAREA' )[ 0 ];
				posts = document.getElementById( 'DiscussPhoto' ).innerHTML;
				if ( posts.match( '<div class="Paginator">' ) == '<div class="Paginator">' )
				{
					alert( "photo has more then 1 page of posts, please check all pages" );

					//start checking for click on page hrefs to catch click on next page    
					window.addEventListener ( 'mousedown', function eventawardclickme(e) { Award.clickme (e); }, false );
				}
				// Check for medals
				chcktxt = '/groups/Game';
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
					+ '<option value="1">Game Award</option>'
					+ '<option value="2">GameX2 Award</option>'
					+ '<option value="3">GameX2 Sweep Award</option>'
					+ '<option value="4">GameX3 Award</option>'
          + '<option value="5">Game On Award</option>';		

				//GM_log(document.getElementById ('DiscussPhoto').innerHTML);

				this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
				this.textarea.parentNode.insertBefore( document.createTextNode( 'Game Awards: ' ), this.textarea );
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
			GM_setValue( "Game.postedmedal", node.value );
		},

		clickpostcomment: function Awardclickpostcomment( )
		{
			//alert( 'in postcomment' );       
			GM_setValue( "Game.postedcomment", "true" );
		},

		clickme: function Awardclickme( e ) 
		{
			//GM_log( "process: " + processforGame );
			if ( processforGame )
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
						GM_setValue( "Game.paginate", "true" );
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
		GM_setValue( "Game.themelisttime", thistime );

		GM_log( "Game: Started loading new themelist (in background)" );

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
					GM_setValue( "Game.themelist", themestring );
					challengethemeval = themestring.split( "||" );

					GM_log( "Game: Loading new themelist complete" );
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
		GM_setValue( "Game.themelisttime", thistime );

		GM_log( "Game: Started loading new challengeheaders (in background)" );

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
			var headerGame = responseDetails.responseText.split( "<b>Game Theme Header</b><br />" )[ 1 ];
			headerGame = headerGame.split( "<small>" )[ 0 ];			
			headerGame = headerGame.replace( "\n", "", "g" ).replace("\r","","g");
			headerGame = headerGame.replace( "<br />", "" );  //remove first <br />
			headerGame = headerGame.replace( "<br />", "\n", "g" );
			headerGame = headerGame.replace( "&lt;", "<", "g" );
			headerGame = headerGame.replace( "&gt;", ">", "g" );
			headerGame = headerGame.replace( "&amp;", "&", "g" );
			headerGame = headerGame.replace( "&quot;", '"', "g" );
			headerGame = headerGame.replace( "1796", sGameVoteScore, "g" );
			headerGame = headerGame.replace( "1784", sGameVoteScore, "g" );
			headerGame = headerGame.substr( 0, headerGame.length-2 );  //remove trailing \n's
			GM_setValue( "Game.Gamechlgheader", headerGame );

			var headerGameX2 = responseDetails.responseText.split( "<b>GameX2 Theme Header</b><br />" )[ 1 ];
			headerGameX2 = headerGameX2.split( "<small>" )[ 0 ];
			headerGameX2 = headerGameX2.replace( "\n", "", "g" ).replace( "\r", "", "g" );
			headerGameX2 = headerGameX2.replace( "<br />", "" );  //remove first <br />
			headerGameX2 = headerGameX2.replace( "<br />", "\n", "g" );
			headerGameX2 = headerGameX2.replace( "&lt;", "<", "g" );
			headerGameX2 = headerGameX2.replace( "&gt;", ">", "g" );
			headerGameX2 = headerGameX2.replace( "&amp;", "&", "g" );
			headerGameX2 = headerGameX2.replace( "&quot;", '"', "g" );
			headerGameX2 = headerGameX2.replace( "1796", sGameVoteScore, "g" );
			headerGameX2 = headerGameX2.replace( "1784", sGameVoteScore, "g" );
			headerGameX2 = headerGameX2.substr( 0, headerGameX2.length-2 );  //remove trailing \n's
			GM_setValue( "Game.GameX2chlgheader", headerGameX2 );		
			
			var headerGameX3 = responseDetails.responseText.split( "<b>GameX3 Theme Header</b><br />" )[ 1 ];
			headerGameX3 = headerGameX3.split( "<small>" )[ 0 ];
			headerGameX3 = headerGameX3.replace( "\n", "", "g" ).replace( "\r", "", "g" );
			headerGameX3 = headerGameX3.replace( "<br />", "" );  //remove first <br />
			headerGameX3 = headerGameX3.replace( "<br />", "\n", "g" );
			headerGameX3 = headerGameX3.replace( "&lt;", "<", "g" );
			headerGameX3 = headerGameX3.replace( "&gt;", ">", "g" );
			headerGameX3 = headerGameX3.replace( "&amp;", "&", "g" );
			headerGameX3 = headerGameX3.replace( "&quot;", '"', "g" );
			headerGameX3 = headerGameX3.replace( "1796", sGameVoteScore, "g" );
			headerGameX3 = headerGameX3.replace( "1784", sGameVoteScore, "g" );
			headerGameX3 = headerGameX3.substr( 0, headerGameX3.length-2 );  //remove trailing \n's
			GM_setValue( "Game.GameX3chlgheader", headerGameX3 );		

			GM_log( "Game: Loading new challengeheaders complete" );
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
				if ( foundforms[ i ].action.match( "/groups/yes_or_no/" ) == "/groups/yes_or_no/" ) 
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
				GM_setValue( "Game.bumping", "true" );
			}
			else
			{
				alert( "Can't find a reference to Game group, No input form available?" );
				GM_setValue( "Game.bumping", "false" );
			}
		}
		catch ( err )
		{
			alert( "something went wrong during bump posting.\nCould be missing posting form" );
			alert( "debug info: myform = " + myform + ", formnumber = " + formnumber );
			GM_setValue( "Game.bumping", "false" );
		}
	}

	bumpmeup = function bumpmeup( ) 
	{
		// post a message

		var url = thislocation.href;

		if ( GM_getValue( "Game.bumping" ) == "finished" )
		{
			GM_setValue( "Game.bumping", "false" );
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
			if ( GM_getValue( "Game.bumping" ) == "false" )
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
			if ( GM_getValue( "Game.bumping" ) == "false" )
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
						if ( foundforms[ i ].action.match( "/groups/yes_or_no/" ) == "/groups/yes_or_no/" )
						{
							myform = true;
							formnumber = i;
							break;
						}
					}

					if ( myform )
					{
						unsafeWindow.document.forms[ formnumber ].submit( );
						GM_setValue( "Game.bumping", "finished" );       
					}
					else
					{
						alert( "Can't find a the confirm delete button" );
						GM_setValue( "Game.bumping", "false" );
					}
				}
				catch ( err )
				{
					alert( "something went wrong during delete phase./nCould be missing delete button" );
					alert( "debug info: myform = " + myform + ", formnumber = " + formnumber );
					GM_setValue( "Game.bumping", "false" );
				}
			}
		}

		return;
	}

	initbumpall = function initbumpall( )
	{
		GM_setValue( "Game.bumpAllMethod", "All" );
		GM_setValue( "Game.bumpAllNr", 1 )
		GM_setValue( "Game.bumpAllState", "processing" ); 
		bumpall( );
	}

	initbumpopen = function initbumpopen( )
	{
		GM_setValue( "Game.bumpAllMethod", "Open" );
		GM_setValue( "Game.bumpAllNr", 1 )
		GM_setValue( "Game.bumpAllState", "processing" ); 
		bumpall( );
	}

	bumpall = function bumpall( )
	{
		if ( GM_getValue( "Game.bumpAllState" ) == "processing" )
		{
			var iChallenge = parseInt( GM_getValue( "Game.bumpAllNr" ) );
	
			for ( ; iChallenge <= 15; iChallenge++ )
			{
				GM_setValue( "Game.bumpAllNr", "" + ( iChallenge + 1 ) );
				var sBase = "Game." + ( iChallenge < 10 ? "0" : "" ) + iChallenge;
				var sKey = sBase + ".threadnr";
				var sThreadNr = GM_getValue( sKey );
				var sStatus = GM_getValue( sBase + ".chlgstatus" );

				if ( ( GM_getValue( "Game.bumpAllMethod" ) == "All" && ( sStatus == "VOT" || sStatus == "OK" ) ) ||
				     ( GM_getValue( "Game.bumpAllMethod" ) == "Open" && decodeURIComponent( GM_getValue( sBase + ".status" ) ).match( " OPEN " ) == " OPEN " ) )
				{
					var sBumpURL = thislocation.href.split( "/discuss/" )[ 0 ] + "/discuss/" + sThreadNr;
					thislocation.replace( sBumpURL );
					GM_setValue( "Game.bumping", "true" );
					return;
				}
			}

			var dailyChatURL = GM_getValue( "Game.DailyChatUrl" );
			if ( dailyChatURL != "" && GM_getValue( "Game.bumpAllMethod" ) == "All" )
			{
				GM_setValue( "Game.bumping", "true" );
				GM_setValue( "Game.DailyChatUrl", "" );
				thislocation.replace( dailyChatURL );
				return;
			}
		}

		GM_setValue( "Game.bumpAllState", "done" );		
		alert( "Done Bumping " + GM_getValue( "Game.bumpAllMethod" ) + "!" );
		runGameTool( );
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

		mylist[ 0 ] = "Game.01";
		mylist[ 1 ] = "Game.02";
		mylist[ 2 ] = "Game.03";
		mylist[ 3 ] = "Game.04";
		mylist[ 4 ] = "Game.05";
		mylist[ 5 ] = "Game.06";
		mylist[ 6 ] = "Game.07";
		mylist[ 7 ] = "Game.08";
		mylist[ 8 ] = "Game.09";
		mylist[ 9 ] = "Game.10";
		mylist[ 10 ] = "Game.11";
		mylist[ 11 ] = "Game.12";
		mylist[ 12 ] = "Game.13";
		mylist[ 13 ] = "Game.14";

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

				for ( voter = 1; voter <= 2; voter++ )    //rxk previous value 3
				{
					ddphototime = new Date( GM_getValue( challenge + ".photo" + voter + "time" ) );
					ddphoto = decodeURIComponent( GM_getValue( challenge + ".photo" + voter ) );

					if ( othertovotetime < ddphototime )
					{
						//alert( "checking photo" + voter );
						for ( num = 1; num <= 2; num++ )       //rxk previous value 3
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

		mylist[ 0 ] = "Game.01";
		mylist[ 1 ] = "Game.02";
		mylist[ 2 ] = "Game.03";
		mylist[ 3 ] = "Game.04";
		mylist[ 4 ] = "Game.05";
		mylist[ 5 ] = "Game.06";
		mylist[ 6 ] = "Game.07";
		mylist[ 7 ] = "Game.08";
		mylist[ 8 ] = "Game.09";
		mylist[ 9 ] = "Game.10";
		mylist[ 10 ] = "Game.11";
		mylist[ 11 ] = "Game.12";
		mylist[ 12 ] = "Game.13";
		mylist[ 13 ] = "Game.14";



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
			GM_setValue( "Game.bumping", "start" );
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

		Gamechlgnr = targ.id;
		url = targ.href;

		if ( e.metaKey || e.ctrlKey ) //ctrl + click means let's bump
		{
			GM_setValue( "Game.bumping", "start" );
			location.href = url;
			return true;
		}

		ddthreadnr = GM_getValue( Gamechlgnr + ".threadnr" );
		ddchlgnr = GM_getValue( Gamechlgnr + ".challengenr" );
		ddcommentcounter = GM_getValue( Gamechlgnr + ".commentcounter" );
		ddstatus = decodeURIComponent( GM_getValue( Gamechlgnr + ".status" ) );
		ddphoto1 = decodeURIComponent( GM_getValue( Gamechlgnr + ".photo1" ) );
		ddphotovoter = decodeURIComponent( GM_getValue( Gamechlgnr + ".photovoter" ) );

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

		Gamechlgnr = targ.id;
		url = targ.href;

		if ( e.metaKey || e.ctrlKey ) //ctrl + click means let's bump
		{
			GM_setValue( "Game.bumping", "start" );
			location.href = url;
			return true;
		}

		votealert = checkvotes( Gamechlgnr, true );

		ddthreadnr = GM_getValue( Gamechlgnr + ".threadnr" );
		ddchlgnr = GM_getValue( Gamechlgnr + ".challengenr" );
		ddcommentcounter = GM_getValue( Gamechlgnr + ".commentcounter" );
		ddstatus = decodeURIComponent( GM_getValue( Gamechlgnr + ".status" ) );
		ddwinner = decodeURIComponent( GM_getValue( Gamechlgnr + ".winner" ) );
		ddphoto1 = decodeURIComponent( GM_getValue( Gamechlgnr + ".photo1" ) );
		ddphoto2 = decodeURIComponent( GM_getValue( Gamechlgnr + ".photo2" ) );
		ddphoto3 = decodeURIComponent( GM_getValue( Gamechlgnr + ".photo3" ) );
		ddphotovoter = decodeURIComponent( GM_getValue( Gamechlgnr + ".photovoter" ) );
		var ddlastvote = GM_getValue( Gamechlgnr + ".lastvote");
		ddchlgstatus = GM_getValue( Gamechlgnr + ".chlgstatus" );
		ddtovotetime = GM_getValue( Gamechlgnr + ".tovotetime" );
		ddphoto1time = GM_getValue( Gamechlgnr + ".photo1time" );
		ddphoto2time = GM_getValue( Gamechlgnr + ".photo2time" );
		ddphoto3time = GM_getValue( Gamechlgnr + ".photo3time" );

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
				var challengenumber = parseInt( Gamechlgnr.split( "." )[ 1 ] );

				var requiredScore = iGameVoteScore;
				if ( ddstatus.toUpperCase( ).match( "GAMEX2 - GAME VS GAME" ) == "GAMEX2 - GAME VS GAME" )
					requiredScore = iGameX2VoteScore;
				else if  ( ddstatus.toUpperCase( ).match( "GAMEX2 - GAME VS GAME" ) == "GAMEX2 - GAME VS GAME" )
					requiredScore = iGameX3VoteScore;

				for ( iVote = 0; iVote < 3; iVote++ )
				{
					if ( parseInt( lastvotevalues[ iVote ] ) >= requiredScore )
					{
						winner = "" + decodeURIComponent( GM_getValue( Gamechlgnr + ".photo" + ( iVote + 1 ) ) ) +
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
//rxk not required to display	"last change time: " + ddtovotetime + "\n" + "\n" +
//rxk not required to display	winner +
//rxk not required to display	"previous winner: " + ddwinner + "\n" + "\n" +
				"photo 1 (" + ddphoto1time + "): " + ddphoto1 + "\n" +
				"photo 2 (" + ddphoto2time + "): " + ddphoto2 + "\n" + "\n" +
//rxk not required to display	"photo 3 (" + ddphoto3time + "): " + ddphoto3 + "\n" + "\n" +
				votealert + "\n" +
				"lastvote: " + ddlastvote + "\n\n" + 
				"voters: \n" + ddphotovoter );
		}
/*		else 
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
		}*/
	}

	displayfulldata = function displayfulldata( )
	{
GM_log( "Here - displayfulldata" );
		checktriplephoto( );

		var mylist = new Array( );

		if ( GM_getValue( "Game.brackets" ) != "false" )
		{
			var mybracketlist = new Array( );
			// do some specific brackets coding
		}

		mylist[ 0 ] = "Game.01";
		mylist[ 1 ] = "Game.02";
		mylist[ 2 ] = "Game.03";
		mylist[ 3 ] = "Game.04";
		mylist[ 4 ] = "Game.05";
		mylist[ 5 ] = "Game.06";
		mylist[ 6 ] = "Game.07";
		mylist[ 7 ] = "Game.08";
		mylist[ 8 ] = "Game.09";
		mylist[ 9 ] = "Game.10";
		mylist[ 10 ] = "Game.11";
		mylist[ 11 ] = "Game.12";
		mylist[ 12 ] = "Game.13";
		mylist[ 13 ] = "Game.14";

		myalert = "";

		var x = 0;

		for ( x in mylist ) 
		{
			ddstatus = decodeURIComponent( GM_getValue( mylist[ x ] + ".status" ) );
			ddwinner = decodeURIComponent( GM_getValue( mylist[ x ] + ".winner" ) );
			ddphoto1 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo1" ) );
			ddphoto2 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo2" ) );
//rxk not required	ddphoto3 = decodeURIComponent( GM_getValue( mylist[ x ] + ".photo3" ) );
			ddlastvote = GM_getValue( mylist[ x ] + ".lastvote" );
			ddchlgstatus = GM_getValue( mylist[ x ] + ".chlgstatus" );

			for ( i = 0, filler = ""; i < 20 - ddlastvote.length; i++ ) 
			{
				filler += " ";
			}

			myalert = myalert + ddchlgstatus + ":    " + ddstatus + "\n" + 
				"vote: " + ddlastvote + " " + filler +
//rxk not required		"prev. winner: " + ddwinner + "\n" + 
				"photo's: " + ddphoto1 + " vs " +
				ddphoto2 +"\n";

//rxk remove ddphoto3 orig 	ddphoto2 + " - " + ddphoto3 + "\n";

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
		GM_setValue( "Game.update", "true" );
		thislocation.replace( url );

		return;
	}

	updatealldata = function updatealldata() 
	{
		GM_setValue( "Game.updatealldata","true" );
		var updfound = false;

		maxupdates = GM_getValue( "Game.maxupdate" );
		maxupdates++;
		//GM_log( maxupdates );

		if ( maxupdates > 15 ) 
		{
			GM_setValue( "Game.maxupdate", 0 );
			GM_setValue( "Game.updatealldata", "false" );
			alert( "Stopped updating: possible loop due to double challenges" );
			return;
		}
		else
		{
			GM_setValue( "Game.maxupdate", maxupdates );
		}

		for ( i = 1; i < discusstrs.length; i++ )
		{
			//GM_log( "in updateall" );
			//GM_log( discusstrs[ i ].innerHTML );

			var tds = discusstrs[ i ].getElementsByTagName( "td" );
			var mnchlgnr=tds[ 0 ].innerHTML.split( "<b>" )[ 1 ].split( " " )[ 0 ];
			var Gamechlgnr = "Game." + mnchlgnr;
			var chlgstatus = tds[ 4 ].innerHTML;
			var url = "http://www.flickr.com" + tds[ 0 ].innerHTML.split( "href=\"" )[ 1 ].split( "\"" )[ 0 ];
			//GM_log( "url: " + url );

			if ( chlgstatus.match( "UPD" ) == "UPD" )
			{
				GM_setValue( "Game.update", "true" );
				updfound = true;
				thislocation.replace( url );
				break;
			}
		}
		if ( !updfound )
		{
			GM_setValue( "Game.updatealldata", "false" );
		}
		//alert( GM_getValue( "Game.updatealldata" ) );

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
		alert( 'yes_or_no data initialised.\nThemes and challenge headers are being loaded in background.'
			+ '\nThis may take up to half a minute depending on Flickr response times' 
			+ 'n\n(you can check loading status under tools - Error Console - Messages tab)'
			+ '\n\nPlease refresh the page to start using them.' );

	}

	initdata = function initdata( )
	{
		GM_log( "Game: init data started" );

		var mylist = new Array( );

		mylist[ 0 ] = "Game.01";
		mylist[ 1 ] = "Game.02";
		mylist[ 2 ] = "Game.03";
		mylist[ 3 ] = "Game.04";
		mylist[ 4 ] = "Game.05";
		mylist[ 5 ] = "Game.06";
		mylist[ 6 ] = "Game.07";
		mylist[ 7 ] = "Game.08";
		mylist[ 8 ] = "Game.09";
		mylist[ 9 ] = "Game.10";
		mylist[ 10 ] = "Game.11";
		mylist[ 11 ] = "Game.12";
		mylist[ 12 ] = "Game.13";
		mylist[ 13 ] = "Game.14";

		myalert = "";

		GM_setValue( "Game.updatealldata", "false" );
		GM_setValue( "Game.update", "false" );
		GM_setValue( "Game.maxupdate", 0 );
		GM_setValue( "Game.bumping", "false" );
		GM_setValue( "Game.bumpAllState", "none" );
		GM_setValue( "Game.version", Gametoolversion );
		GM_setValue( "Game.brackets", "false" );
		GM_setValue( "Game.lastwinner", encodeURIComponent( " " ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
		GM_setValue( "Game.lastsecond", encodeURIComponent( " " ) );
		GM_setValue( "Game.lastsecond2", encodeURIComponent( " " ) );
		GM_setValue( "Game.lastmedalsplayers", encodeURIComponent( " " ) );
		GM_setValue( "Game.lastchallenge", "" );
		GM_setValue( "Game.currentchallenge", "" );
		GM_setValue( "Game.themelist", "" );
		GM_setValue( "Game.themelisttime", "" );
		//challenge header for Game group
		GM_setValue( "Game.Gamechlgheader",       '<a href="" rel="nofollow">' +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' +
                                              '<b>*GAME Regular Challenge</b>' + '\n'  +
                                              '<a href="" rel="nofollow">' +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' + '\n' +
                                              '<b>Rules:</b>'   +  '\n' + '\n' +
                                              '1) A <b>Medal</b> from another <a href="http://www.flickr.com/groups/yes_or_no/discuss/72157607586698433/"> Challenge Group </a> in the comments.' +  '\n' + '\n' +
                                              '2) <b>2</b> photos.' +  '\n' + '\n' +
                                              '3)  Post to no more than <b>3</b> challenges at a time; do not remove an entry in another challenge to post one here.'  +  '\n' + '\n' +
                                              '4)<b> 5 </b> votes wins; The *Game Winner Award.'  + '\n' +  '\n' +
                                              '<a href="" rel="nofollow">'  +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' + '\n' +
                                              '<a href="" rel="nofollow">'  +  
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n'  +
                                              '<a href="http://www.urspark.com/lousapps.html#ocgc" target="new_one" rel="nofollow">CodePaster</a>' );
		GM_setValue( "Game.GameX2chlgheader",     '<a href="" rel="nofollow">' +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' +
                                              '<b>*GAME Regular Challenge</b>' + '\n'  +
                                              '<a href="" rel="nofollow">' +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' + '\n' +
                                              '<b>Rules:</b>'   +  '\n' + '\n' +
                                              '1) A <b>Winner Medal</b> from  *Game  in the comments.' +  '\n' + '\n' +
                                              '2) <b>2</b> photos.' +  '\n' + '\n' +
                                              '3)  Posting to this challenge does <b>NOT </b> count toward the 3 challenge limit.'  +  '\n' + '\n' +
                                              '4)<b>10</b> votes wins the *GameX2 Winner Award. There is no second place.  GameX2 Winners are eligible for the *Game of the Month Challenge.'  + '\n' +  '\n' +
                                              '<a href="" rel="nofollow">'  +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' + '\n' +
                                              '<a href="" rel="nofollow">'  +  
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n'  +
                                              '<a href="http://www.urspark.com/lousapps.html#ocgc" target="new_one" rel="nofollow">CodePaster</a>' );
		GM_setValue( "Game.GameX3chlgheader",     '<a href="" rel="nofollow">' +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' +
                                              '<b>*GAME Regular Challenge</b>' + '\n'  +
                                              '<a href="" rel="nofollow">' +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' + '\n' +
                                              '<b>Rules:</b>'   +  '\n' + '\n' +
                                              '1) A <b>a GameX2 Winner Medal</b>  in the comments.' +  '\n' + '\n' +
                                              '2) <b>2</b> photos.' +  '\n' + '\n' +
                                              '3)  Post to no more than <b>3</b> challenges at a time; do not remove an entry in another challenge to post one here.'  +  '\n' + '\n' +
                                              '4)<b>10</b> votes wins the *GameX3 Winner Award. There is no second place.  GameX3 Winners will be eligible for the *GameX of the Month Challenge.'  + '\n' +  '\n' +
                                              '<a href="" rel="nofollow">'  +
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n' + '\n' +
                                              '<a href="" rel="nofollow">'  +  
                                              '<img src="http://farm3.static.flickr.com/2455/3578951527_8cbe3f5416_o.jpg" alt="blueline" height="5" width="482" /></a>' + '\n'  +
                                              '<a href="http://www.urspark.com/lousapps.html#ocgc" target="new_one" rel="nofollow">CodePaster</a>' );          
		

		var x = 0;

		for ( x in mylist )
		{
			GM_setValue( mylist[ x ] + ".startdate", encodeURIComponent( "" ) );
			GM_setValue( mylist[ x ] + ".threadnr", x );
			GM_setValue( mylist[ x ] + ".challengenr", "99" );
			GM_setValue( mylist[ x ] + ".commentcounter", "100" );
			GM_setValue( mylist[ x ] + ".status", encodeURIComponent( mylist[ x ].split( "Game." )[ 1 ] + " - not found or not updated with new info yet" ) );
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

		GM_log( "Game: init data complete" );

		loadthemelist( );
		loadchlgheader( );
	}

	// *******************
	// End of init data
	// *******************


	// *******************
	// Start of write header
	// *******************

	addGameheader = function addGameheader( )
	{
		var topbar = thisdocument.getElementById( "TopBar" );
		var tables = topbar.getElementsByTagName( "table" );
		var trs = tables[ 0 ].getElementsByTagName( "tr" );
		var tds = trs[ 0 ].getElementsByTagName( "td" );

		var GameEndTime = new Date( );
		var GameExecutionTime = GameEndTime - GameStartTime;

		if ( unsafeWindow.global_name == 'Ray' || unsafeWindow.global_name == 'pipeguru' )
			tds[ 1 ].innerHTML = "Game Admin tool " + Gametoolversion + " (" + GameExecutionTime + "ms)" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[ 1 ].innerHTML;
		else
			tds[ 1 ].innerHTML = "Game Admin tool " + Gametoolversion + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[1].innerHTML;
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
//rxk modified to fix UCI conflict
			if ( mnstatus.match( "Daily Chat" ) == "Daily Chat" )
			{
        var url = "http://www.flickr.com" + tds[ 0 ].innerHTML.split( /a\s[^>]*href=\"/ )[ 1 ].split( "\"><b>" )[ 0 ];
        GM_setValue( "Game.DailyChatUrl", url );
			}

			if ( mnchlgnr.length == 2 ) //only process if chlgnr is correct format
			{
				Gamechlgnr = "Game." + mnchlgnr;

				ddcommentcounter= GM_getValue( Gamechlgnr + ".commentcounter" );
				ddstatus 	= decodeURIComponent( GM_getValue( Gamechlgnr + ".status" ) );
				ddwinner 	= decodeURIComponent( GM_getValue( Gamechlgnr + ".winner" ) );
				ddphoto1 	= decodeURIComponent( GM_getValue( Gamechlgnr + ".photo1" ) );
				ddphoto2 	= decodeURIComponent( GM_getValue( Gamechlgnr + ".photo2" ) );
				ddphoto3 	= decodeURIComponent( GM_getValue( Gamechlgnr + ".photo3" ) );
				ddphoto1time 	= decodeURIComponent( GM_getValue( Gamechlgnr + ".photo1time" ) );
				ddphoto2time 	= decodeURIComponent( GM_getValue( Gamechlgnr + ".photo2time" ) );
				ddphoto3time 	= decodeURIComponent( GM_getValue( Gamechlgnr + ".photo3time" ) );
				ddlastvote 	= GM_getValue( Gamechlgnr + ".lastvote" );
				ddthreadnr 	= GM_getValue( Gamechlgnr + ".threadnr" );

				var votetime = decodeURIComponent( GM_getValue( Gamechlgnr + ".tovotetimesince" ) );
				var phototime1 = decodeURIComponent( GM_getValue( Gamechlgnr + ".photo1timesince" ) );
				var phototime2 = decodeURIComponent( GM_getValue( Gamechlgnr + ".photo2timesince" ) );
				var phototime3 = decodeURIComponent( GM_getValue( Gamechlgnr + ".photo3timesince" ) );

				var ddlastphototime = "";
				if ( phototime3.length < 2 )
				{
					if ( phototime2.length < 2 )
					{
						if ( phototime1.length < 2 )
						{
							challengeopendate = decodeURIComponent( GM_getValue( Gamechlgnr + ".startdate" ) );
							hours = ( GameStartTime.getTime( ) - challengeopendate ) / ( 1000 * 60 * 60 );
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
				GM_setValue( Gamechlgnr + ".idleAlert", sAlert );

				ddlastvote = detectNoSpaces( ddlastvote );

				var thread = tds[ 0 ].innerHTML.split( "href" )[ 1 ].split( "/" )[ 4 ].split( "/" )[ 0 ];

				mncommentcounter = tds[ 2 ].innerHTML;
				var bGameX2 = false;
				var bGameX3 = false;
				if ( ddstatus.toUpperCase( ).match( "GAMEX2 - GAME VS GAME" ) == "GAMEX2 - GAME VS GAME" )
					bGameX2 = true;
				else if ( ddstatus.toUpperCase( ).match( "GAMEX3 - GAMEX2 VS GAMEX2" ) == "GAMEX3 - GAMEX2 VS GAMEX2" )
					bGameX3 = true;

				if ( checkskipchallenge( tds[ 0 ].innerHTML ) ) chlgstatus = "---";  //handle non challenges with a challenge number 
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "CLOSED" ) == "CLOSED" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "Daily Chat" ) == "Daily Chat" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "VOID" ) == "VOID" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "AWAITING" ) == "AWAITING" ) chlgstatus = "---";
				else if ( thread != ddthreadnr ) chlgstatus = "UPD";
				else if ( ( ddstatus.toUpperCase( ).match( "WAIT" ) == "WAIT" ) && ( mncommentcounter == ddcommentcounter ) ) chlgstatus = "WT";
				else if ( ( ddlastvote.match( sGameVoteScore ) == sGameVoteScore ) && ( mncommentcounter == ddcommentcounter ) && ( !bGameX2 && !bGameX3 ) && ( ddphoto2 != " " ) ) chlgstatus = "FIN";
				else if ( ( ddlastvote.match( sGameX2VoteScore ) == sGameX2VoteScore ) && ( mncommentcounter == ddcommentcounter ) && ( bGameX2 || ( ddphoto2 == " ") ) ) chlgstatus = "FIN";
				else if ( ( ddlastvote.match( sGameX3VoteScore ) == sGameX3VoteScore ) && ( mncommentcounter == ddcommentcounter ) && ( bGameX3 || ( ddphoto2 == " ") ) ) chlgstatus = "FIN";
				else if ( ( ddphoto2 != " " ) && ( ddstatus.match( "VOTE" ) != "VOTE" ) && ( mncommentcounter == ddcommentcounter ) ) chlgstatus = "VOT";
				else if ( mncommentcounter == ddcommentcounter ) chlgstatus = "OK";

// rxk change ddphoto3 to ddphoto2 for 2 photos challenge

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
						GM_setValue( Gamechlgnr + ".status", encodeURIComponent( mnstatus ) ); // write new full status
					}
				} 

				//write status if there is a status & set challenge number to processed if status different from "---"
				if ( chlgstatus != "---" ) 
				{
					GM_setValue ( Gamechlgnr + ".chlgstatus", chlgstatus);
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
				myanchor.id = Gamechlgnr;
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
		update = GM_getValue( "Game.updatealldata" );
		if ( update.match( "true" ) == "true" )
			updatealldata( );
		else 
			GM_setValue( "Game.maxupdate", 0 );

		// add Game info & update headers
		var trs = tables[ 0 ].getElementsByTagName( "tr" );
		var tds = trs[ 0 ].getElementsByTagName( "td" );
		var h1 = tds[ 1 ].getElementsByTagName( "h1" );

		//add displayfulldata
		h1[ 0 ].appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "Game-Info";
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickmain( e ){ displayfulldata( ); }, false);
		h1[ 0 ].appendChild( myanchor );

		//add updatealldata
		/*h1[ 0 ].appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "Game-Update";
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickmain( e ){ updatealldata( ); }, false );
		h1[ 0 ].appendChild( myanchor );*/

		//add Game bump header
		var place = thisdocument.getElementById( "Tertiary" );

		//add Game Bump
		h1[ 0 ].appendChild( thisdocument.createTextNode(' / ') );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "Game-BumpAll";
		myanchor.href = "#";
		myanchor.addEventListener( 'click', function eventclickchallenge( e ) {	initbumpall( ); }, false );
		h1[ 0 ].appendChild( myanchor );

		//add Game Bump open
		h1[ 0 ].appendChild( thisdocument.createTextNode(' / ') );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "Game-BumpOpen";
		myanchor.href = "#";
		myanchor.addEventListener( 'click', function eventclickchallenge( e ) {	initbumpopen( ); }, false );
		h1[ 0 ].appendChild( myanchor );

		// erase statusses of challenges not found + set all active themes
		// only do this on the first page...
		if ( thislocation.href.match( "yes_or_no/discuss/page" ) != "yes_or_no/discuss/page" )
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
					GM_setValue( "Game." + chkchlg + ".status", encodeURIComponent( chkchlg + " - not found or not updated with new info yet" ) );
					GM_setValue( "Game." + chkchlg + ".winner", encodeURIComponent( " " ) );
					GM_setValue( "Game." + chkchlg + ".photo1", encodeURIComponent( " " ) );
					GM_setValue( "Game." + chkchlg + ".photo2", encodeURIComponent( " " ) );
					GM_setValue( "Game." + chkchlg + ".photo3", encodeURIComponent( " " ) );
					GM_setValue( "Game." + chkchlg + ".photovoter", encodeURIComponent( " " ) );
					GM_setValue( "Game." + chkchlg + ".commentcounter", "100" );
					GM_setValue( "Game." + chkchlg + ".lastvote", " " );
					GM_setValue( "Game." + chkchlg + ".chlgstatus", "---" );
					GM_setValue( "Game." + chkchlg + ".tovotetime", " " );
					GM_setValue( "Game." + chkchlg + ".photo1time", " " );
					GM_setValue( "Game." + chkchlg + ".photo2time", " " );
					GM_setValue( "Game." + chkchlg + ".photo3time", " " );
					GM_setValue( "Game." + chkchlg + ".photo1timesince", " " );
					GM_setValue( "Game." + chkchlg + ".photo2timesince", " " );
					GM_setValue( "Game." + chkchlg + ".photo3timesince", " " );
				}
				else
				{
					activethemes = activethemes + decodeURIComponent( GM_getValue( "Game." + chkchlg + ".status" ) ).split( 'Theme: ' )[ 1 ] + "||";
				} 
			}

			GM_setValue( "Game.activethemes", encodeURIComponent( activethemes ) );
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
			//add Game bump header & leave
			var place = thisdocument.getElementById( "Tertiary" );

			//add Game Bump
			place.appendChild( thisdocument.createTextNode(' / ') );
			myanchor=thisdocument.createElement( 'a' );
			myanchor.innerHTML = "Game-Bump";
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
		if ( status.match( "CLOSED" ) == "CLOSED" ) tst = 1;
		if ( status.match( "WAIT" ) == "WAIT" ) tst = 1;
		if ( status.match( "VOID" ) == "VOID" ) tst = 1;
		if ( tst == 0 ) 
			alerttxt = alerttxt + "Can't find OPEN, VOTE, CLOSED, VOID or WAIT in challenge\n";

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
//		var challengeopendate = getTimeAgo( discuss.innerHTML.split( "osted at " )[ 1 ].split( "\n" )[ 0 ] );
      var challengeopendate = getTimeAgo( discuss.innerHTML.split( /originally posted at /i )[ 1 ].split( "\n" )[ 0 ] );
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

				if ( ( tdnr != i ) && ( ( photonumber == 2 ) || ( status.match( "VOTE" ) == "VOTE" ) || inbrackets ) ) 
// rxk previous photonumber == 3
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

		Gamechlgnr = "Game." + chlgnr;

		//alert( Gamechlgnr );

		GM_setValue( Gamechlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
		GM_setValue( Gamechlgnr + ".threadnr", threadnr );
		GM_setValue( Gamechlgnr + ".challengenr", chlgnr );
		GM_setValue( Gamechlgnr + ".commentcounter", commentcounter );
		GM_setValue( Gamechlgnr + ".status", encodeURIComponent( status ) );
		GM_setValue( Gamechlgnr + ".winner", encodeURIComponent( winner ) );
		GM_setValue( Gamechlgnr + ".photo1", encodeURIComponent( photoposter[ 0 ] ) );
		GM_setValue( Gamechlgnr + ".photo2", encodeURIComponent( photoposter[ 1 ] ) );
		GM_setValue( Gamechlgnr + ".photo3", encodeURIComponent( photoposter[ 2 ] ) );
		GM_setValue( Gamechlgnr + ".photovoter", encodeURIComponent( photovoter ) );

		// inside challenge - decode last vote if no spaces
		lastvote = detectNoSpaces( lastvote );

		GM_setValue( Gamechlgnr + ".lastvote", lastvote );
		GM_setValue( Gamechlgnr + ".chlgstatus", "OK" );
		GM_setValue( "Game.currentchallenge", chlgnr );

		GM_setValue( Gamechlgnr + ".tovotetime", converttotime( votetime ) );
		GM_setValue( Gamechlgnr + ".photo1time", converttotime( phototime[ 0 ] ) );
		GM_setValue( Gamechlgnr + ".photo2time", converttotime( phototime[ 1 ] ) );
		GM_setValue( Gamechlgnr + ".photo3time", converttotime( phototime[ 2 ] ) );

		GM_setValue( Gamechlgnr + ".tovotetimesince", encodeURIComponent( votetime ) );
		GM_setValue( Gamechlgnr + ".photo1timesince", encodeURIComponent( phototime[ 0 ] ) );
		GM_setValue( Gamechlgnr + ".photo2timesince", encodeURIComponent( phototime[ 1 ] ) );
		GM_setValue( Gamechlgnr + ".photo3timesince", encodeURIComponent( phototime[ 2 ] ) );

		update = GM_getValue( "Game.update" );

		if ( update.match( "true" ) == "true" )
		{
			GM_setValue( "Game.update", "false" );
			thislocation.replace( "http://www.flickr.com/groups/Game/discuss/" );
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
			GM_setValue( "Game.lastwinner", encodeURIComponent( " " ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
			GM_setValue( "Game.lastsecond", encodeURIComponent( " " ) );
			GM_setValue( "Game.lastsecond2", encodeURIComponent( " " ) );
			GM_setValue( "Game.lastmedalsplayers", encodeURIComponent( " " ) );
			GM_setValue( "Game.lastchallenge", "" );
		}

		if ( ( status.match( "VOTE" ) == "VOTE" ) && ( isclosed ) && ( !inbrackets ) ) //only process if closed & in vote staus
		{
			GM_setValue( "Game.lastwinner", encodeURIComponent( " " ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
			GM_setValue( "Game.lastsecond", encodeURIComponent( " " ) );
			GM_setValue( "Game.lastsecond2", encodeURIComponent( " " ) );
			if ( status.toUpperCase( ).match( "GAMEX3 - GAMEX2 VS GAMEX2" )  == "GAMEX3 - GAMEX2 VS GAMEX2" )
				GM_setValue( "Game.lastmedalsplayers", encodeURIComponent( photoposter[ 0 ] + ' / ' + photoposter[ 1 ] + ' / ' + photoposter[ 2 ] ) );
			else
				GM_setValue( "Game.lastmedalsplayers", encodeURIComponent( " " ) );

			GM_setValue( "Game.lastchallenge", chlgnr );

			//autocheck votes
			splitvar = "";
			vote1 = "0";
			vote2 = "0";
			vote3 = "0";
			if ( lastvote.match( "=" ) == "=" ) splitvar = "=";
			else if ( lastvote.match( " " ) == " " ) splitvar = " ";
			else if ( lastvote.match( "-" ) == "-" ) splitvar = "-";
			else if ( lastvote.match( "." ) == "." ) splitvar = ".";

//rxk change dualplay to true
			var dualplay = true;
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
				mytd = createCheckbox( "C11", "lastwinner", photoposter[ 0 ], " " + " WINNER " + " ", mytd );

//rxk not required		//fill cell 3
//rxk not required		mytd = mytr.insertCell( 2 );
//rxk not required		mytd = createCheckbox( "C12", "lastsecond", photoposter[ 0 ], " " + ( sGameVoteScore - 1 ) + " ", mytd );

				//fill row 1
//rxk in one row		mytr = mytable.insertRow( 0 );

				//fill cell 3
				mytd = mytr.insertCell( 2 ); 
				mytd.innerHTML = "<b>" + photoposter[ 1 ] + ": </b>";

				//fill cell 4
				mytd = mytr.insertCell( 3 );
				mytd = createCheckbox( "C21", "lastwinner", photoposter[ 1 ], " " + " WINNER " + " ", mytd );

//rxk not required		//fill cell 3
//rxk not required		mytd = mytr.insertCell( 2 );
//rxk not required		mytd = createCheckbox( "C22", "lastsecond", photoposter[ 1 ], " " + ( sGameVoteScore - 1 ) + " ", mytd );
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
			var bGameX2 = false;
			var bGameX3 = false;
			if ( status.toUpperCase( ).match( "GAMEX2 - GAME VS GAME" ) == "GAMEX2 - GAME VS GAME" )
				bGameX2 = true;
			else if ( status.toUpperCase( ).match( "GAMEX3 - GAMEX2 VS GAMEX2" ) == "GAMEX3 - GAMEX2 VS GAMEX2" )
				bGameX3 = true;

			if ( ( ( vote1 == sGameVoteScore ) && ( !bGameX3 && !bGameX2 ) ) || ( ( vote1 == sGameX2VoteScore ) && ( bGameX2 ) ) || ( ( vote1 == sGameX3VoteScore ) && ( bGameX3 ) ) ) 
			{
				document.getElementById( "C11" ).checked = true;
				GM_setValue( "Game.lastwinner", encodeURIComponent( photoposter[ 0 ] ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
			}
			else if ( ( vote1 == "" + ( iGameVoteScore - 1 ) ) && !bGameX2 && !bGameX3 ) 
			{
				document.getElementById( "C12" ).checked = true;
				GM_setValue( "Game.lastsecond", encodeURIComponent( photoposter [ 0 ] ) );
				sec1check = "set";
			}

			if ( ( ( vote2 == sGameVoteScore ) && ( !bGameX3 && !bGameX2 ) ) || ( ( vote2 == sGameX2VoteScore ) && ( bGameX2 ) ) || ( ( vote2 == sGameX3VoteScore ) && ( bGameX3 ) ) ) 
			{
				document.getElementById( "C21" ).checked = true; 
				GM_setValue( "Game.lastwinner", encodeURIComponent( photoposter[ 1 ] ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
			}
			else if ( ( vote2 == "" + ( iGameVoteScore - 1 ) ) && !bGameX2 && !bGameX3 ) 
			{
				document.getElementById( "C22" ).checked = true;
				if ( sec1check == "" ) 
				{
					GM_setValue( "Game.lastsecond", encodeURIComponent( photoposter[ 1 ] ) );
					sec1check = "set";
				}
				else 
					GM_setValue( "Game.lastsecond2", encodeURIComponent( photoposter[ 1 ] ) );
			}

			if ( ( ( vote3 == sGameVoteScore ) && ( !bGameX3 && !bGameX2 ) ) || ( ( vote3 == sGameX2VoteScore ) && ( bGameX2 ) ) || ( ( vote3 == sGameX3VoteScore ) && ( bGameX3 ) ) ) 
			{
				document.getElementById( "C31" ).checked = true;
				GM_setValue( "Game.lastwinner", encodeURIComponent( photoposter[ 2 ] ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
			}
			else if ( ( vote3 == "" + ( iGameVoteScore - 1 ) ) && !bGameX2 && !bGameX3 ) 
			{
				document.getElementById( "C32" ).checked = true;
				if ( sec1check == "" )
					GM_setValue( "Game.lastsecond", encodeURIComponent( photoposter[ 2 ] ) )
				else
					GM_setValue( "Game.lastsecond2", encodeURIComponent( photoposter[ 2 ] ) )
			}

		} // end of if is closed & status vote


		//add headers

		var place = thisdocument.getElementById( "Tertiary" );

		//alert( place.innerHTML );

		//add Game info
		place.appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "Game-Info";
		myanchor.id = Gamechlgnr;
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickchallenge( e ) { displaydata( e ); }, false );
		place.appendChild( myanchor );

		//add Game Bump
		place.appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "Game-Bump";
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

						if ( ( tdnr != i ) && ( ( photonumber == 2 ) || ( status.match( "VOTE" ) == "VOTE" ) || inbrackets ) ) 
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

				var bGameX2 = false;
				var bGameX3 = false;
				if ( status.toUpperCase( ).match( "GAMEX2 - GAME VS GAME" ) == "GAMEX2 - GAME VS GAME" )
					bGameX2 = true;
				if ( status.toUpperCase( ).match( "GAMEX3 - GAMEX2 VS GAMEX2" ) == "GAMEX3 - GAMEX2 VS GAMEX2" )
					bGameX3 = true;

				if ( (lastvote.match( sGameX2VoteScore ) == sGameX2VoteScore ) && bGameX2 ) 
					chlgstatus = "FIN";
				else if ( (lastvote.match( sGameX3VoteScore ) == sGameX3VoteScore ) && bGameX3 ) 
					chlgstatus = "FIN";
				else if ( ( ddphoto2 != " " ) && ( status.match( "VOTE" ) != "VOTE" ) )
					chlgstatus = "VOT";
				else
					chlgstatus = "OK";

				if ( inbrackets )
				{
					if ( chlgstatus == "FIN" ) chlgstatus = "OK"; // have to reset from before to check for fin again
					if ( commentcounter > 100 ) chlgstatus = "MAN"; // set manual flag
				}

// rxk change ddphoto3 to ddphoto2 for 2 photos challenge

				Gamechlgnr = "Game." + chlgnr;
				GM_setValue( Gamechlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
				GM_setValue( Gamechlgnr + ".threadnr", threadnr );
				GM_setValue( Gamechlgnr + ".challengenr", chlgnr );
				GM_setValue( Gamechlgnr + ".commentcounter", commentcounter );
		 		GM_setValue( Gamechlgnr + ".status", encodeURIComponent( status ) );
				GM_setValue( Gamechlgnr + ".winner", encodeURIComponent( winner ) );
				GM_setValue( Gamechlgnr + ".photo1", encodeURIComponent( photoposter[ 0 ] ) );
				GM_setValue( Gamechlgnr + ".photo2", encodeURIComponent( photoposter[ 1 ] ) );
				GM_setValue( Gamechlgnr + ".photo3", encodeURIComponent( photoposter[ 2 ] ) );
				GM_setValue( Gamechlgnr + ".photovoter", encodeURIComponent( photovoter ) );

				// only tests these when new votes come in (others are cached)
				// have to bodge the string as it may start with a 0 which wont get counted
				lastvote = detectNoSpaces( lastvote );

				GM_setValue( Gamechlgnr+".lastvote", lastvote );
				GM_setValue( Gamechlgnr+".chlgstatus", chlgstatus );
				GM_setValue( "Game.currentchallenge", chlgnr );

				GM_setValue( Gamechlgnr + ".tovotetime", converttotime( votetime ) );
				GM_setValue( Gamechlgnr + ".photo1time", converttotime( phototime[ 0 ] ) );
				GM_setValue( Gamechlgnr + ".photo2time", converttotime( phototime[ 1 ] ) );
				GM_setValue( Gamechlgnr + ".photo3time", converttotime( phototime[ 2 ] ) );

				GM_setValue( Gamechlgnr + ".tovotetimesince", encodeURIComponent( votetime ) );
				GM_setValue( Gamechlgnr + ".photo1timesince", encodeURIComponent( phototime[ 0 ] ) );
				GM_setValue( Gamechlgnr + ".photo2timesince", encodeURIComponent( phototime[ 1 ] ) );
				GM_setValue( Gamechlgnr + ".photo3timesince", encodeURIComponent( phototime[ 2 ] ) );

				var anchor = thisdocument.getElementById( thread );
				anchor.innerHTML = chlgstatus;
				anchor.title = lastvote;
				anchor.id = Gamechlgnr;
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

//rxk not required
//		second2 = " ";

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

//rxk not required
//		for ( i = 0; i < medalform.length; ++i ) // run thru second
//		{
//			if ( medalform.elements[ i ].checked )
//			{
//				if ( medalform.elements[ i ].name == "lastsecond" )
//				{
//					if ( winner == medalform.elements[ i ].value )
//						alert( "You cannot place somebody 1st and 2nd. Please check" );
//
//					if ( second == " " )
//						second = medalform.elements[ i ].value;
//					else if ( second2 == " " )
//						second2 = medalform.elements[ i ].value;
//					else 
//						alert( "You entered 3 photos in second place. Please check" );
//				}
//			}
//		}

		GM_setValue( "Game.lastwinner",encodeURIComponent( winner ) );
//		GM_setValue( "Game.lastsecond",encodeURIComponent( second ) );
//		GM_setValue( "Game.lastsecond2",encodeURIComponent( second2 ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );

	}

	// *******************
	// End of winner processing
	// *******************

	function Editchallenge( ) //gets called after a page for editing a challenge is opened
	{
		titlearea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'INPUT' )[ 2 ];
		lastwinner = decodeURIComponent( GM_getValue( "Game.lastwinner" ) );
		lastsecond = decodeURIComponent( GM_getValue( "Game.lastsecond" ) );
//rxk not required
//		lastsecond2 = decodeURIComponent( GM_getValue( "Game.lastsecond2" ) );

		currentchlgnr = GM_getValue( "Game.currentchallenge" );

		if ( ( titlearea.value.match( "VOTE" ) == "VOTE" ) && ( titlearea.name == "subject" ) && ( lastwinner != " " ) )
		{
			newtxt = "CLOSED (" + lastwinner;
//rxk not required
//			if ( lastsecond != " " )
//				newtxt = newtxt + "/" + lastsecond;
//			if ( lastsecond2 != " " )
//				newtxt = newtxt + "/" + lastsecond2;
			newtxt = newtxt + ")";
			titlearea.value = titlearea.value.replace( "VOTE", newtxt );
		}

		if ( decodeURIComponent( GM_getValue( "Game." + currentchlgnr + ".photo2" ) ) != " " )   //rxk previous 3
			if ( titlearea.value.match( "OPEN" ) == "OPEN" )
				titlearea.value = titlearea.value.replace( "OPEN", "VOTE" );
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

		Gamemotm = false;
		if ( link.getAttribute( 'href' ).match( "Gamemotm" ) == "Gamemotm" )
			Gamemotm = true;

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

			//Game admin add ons
			titlearea = topic_title;

			lastwinner = decodeURIComponent( GM_getValue( "Game.lastwinner" ) );
			lastsecond = decodeURIComponent( GM_getValue( "Game.lastsecond" ) );
			lastsecond2 = decodeURIComponent(GM_getValue("Game.lastsecond2" ) );
			currentchlgnr = GM_getValue( "Game.currentchallenge" );

			if ( ( titlearea.match( "VOTE" ) == "VOTE" ) && ( lastwinner != " " ) && !Gamemotm )
			{
				newtxt = "CLOSED (" + lastwinner;

				if ( lastsecond != " " )
					newtxt = newtxt + "/" + lastsecond;
				if ( lastsecond2 != " " )
					newtxt = newtxt + "/" + lastsecond2;

				newtxt = newtxt + ")";
				titlearea = titlearea.replace( "VOTE", newtxt );
			}

			if ( decodeURIComponent( GM_getValue( "Game." + currentchlgnr + ".photo2" ) ) != " " ) //rxk previous 3
				if ( ( titlearea.match( "OPEN" ) == "OPEN" ) && !Gamemotm )
					titlearea = titlearea.replace( "OPEN", "VOTE" );

			topic_title = titlearea;
			//Game add ons till here

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

		if ( decodeURIComponent( subject ).indexOf( "VOTE" ) != -1 ) 
		{
			GM_setValue( "Game." + decodeURIComponent( subject ).split( " " )[ 0 ] + ".tovotetime", converttotime( "a moment" ) );

			//GM_setValue( Gamechlgnr + ".tovotetime", converttotime( "Posted 1 second ago." ) );
		}

		return;
	}// end postitbaby function

	// *******************
	// Start of Createnewchallenge
	// *******************

	insertChallengetxt = function insertChallengetxt( )
	{
		t = document.getElementById( 'themeselect' );
		challengetxtval[ 1 ] = GM_getValue( "Game.Gamechlgheader" );
		challengetxtval[ 2 ] = GM_getValue( "Game.GameX2chlgheader" );
		challengetxtval[ 3 ] = GM_getValue( "Game.GameX3chlgheader" );

		//check if variables are filled in + alert
//rxk
/*		if ( decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) == " " )
		{
			if ( GM_getValue( "Game.lastchallenge" ) == "" )
				alert( "No last challenge found: \nplease fill in challenge number \nand winner name or medals player names" );
			else
				alert( "Please fill in winner name or medals player names" ); 
		}
*/
		this.textarea.value = challengetxtval[ challengetxtnode.value ] ;
		if ( challengetxtnode.value == "2" )
			this.titlearea.value = "13 - OPEN - Theme: *GAMEX2 - GAME VS GAME WINNERS"/* + t.options[ t.selectedIndex ].text*/;
		else if ( challengetxtnode.value == "3" )
			this.titlearea.value = "14 - OPEN - Theme: *GAMEX3 - GAMEX2 VS GAMEX2 WINNERS"/* + t.options[ t.selectedIndex ].text*/;
		else
			this.titlearea.value = GM_getValue( "Game.lastchallenge" ) + " - OPEN - Theme: "/* + t.options[ t.selectedIndex ].text*/;

		//replace winner field
//rxk
/*		if ( decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) != " " && challengetxtnode.value == 1 ) 
		{
			this.textarea.value = this.textarea.value.replace( "winner", decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
		}
		else if ( decodeURIComponent( GM_getValue( "Game.lastmedalsplayers" ) ) != " " )
			this.textarea.value = this.textarea.value.replace( "Challenger 1 / Challenger 2 / Challenger 3", decodeURIComponent( GM_getValue( "Game.lastmedalsplayers" ) ) );
*/
	}
	
	insertChallengetheme = function insertChallengetheme( )
	{
		t = document.getElementById( 'themeselect' );
		if ( challengetxtnode.value == "1" )
		{
			var sThemeString = t.options[ t.selectedIndex ].text;
			this.titlearea.value = this.titlearea.value.split( "Theme:" )[ 0 ] + "Theme: " + sThemeString;

			if ( sThemeString.match( "GAMEX3 - GAMEX2 VS GAMEX2" ) == "GAMEX3 - GAMEX2 VS GAMEX2" )
			{
				this.textarea.value = GM_getValue( "Game.GameX3chlgheader" );
			}
			else if ( sThemeString.match( "GAMEX2 - GAME VS GAME" ) == "GAMEX2 - GAME VS GAME" )
			{
				this.textarea.value = GM_getValue( "Game.GameX2chlgheader" );
			}
			else
			{
				this.textarea.value = GM_getValue( "Game.Gamechlgheader" );
			}

			// replace winner
//rxk			this.textarea.value = this.textarea.value.replace( "Previous Winner", decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
		}
	}


	Createnewchallenge = function Createnewchallenge( )
	{
		//myWindow = window.open( '', 'Log page', 'top=50, left=100, width=800, height=600, scrollbars=yes, resizable = yes' )
		//myWindow.document.open( "text/html", "replace" );
		//myWindow.document.write( "<P><h1>Game Admin tool log</h1></p>" );

		themelist = GM_getValue( "Game.themelist" );
		if ( themelist != "" )
			challengethemeval = themelist.split( "||" );

		challengetxtval[ 1 ] = GM_getValue( "Game.Gamechlgheader" );
		challengetxtval[ 2 ] = GM_getValue( "Game.GameX2chlgheader" );
		challengetxtval[ 3 ] = GM_getValue( "Game.GameX3chlgheader" );

		//myWindow.document.write( "<p>"+themelist+"</p>" );

		var activethemeval = new Array( );
		activethemes = decodeURIComponent( GM_getValue( "Game.activethemes" ) );
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

		lastchallenge = GM_getValue( "Game.lastchallenge" );

		//check if variables are filled in + alert
//rxk
/*		if ( decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) == " " )
		{
			if ( lastchallenge == "" )
				alert( "No last challenge found: \nplease fill in challenge number \nand winner name or medals player names" ); 
			else
				alert( "Please fill in winner name" );
		}
*/
		//start inserting pull down lists
		this.textarea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'TEXTAREA' )[ 0 ];
		var n = document.createElement( 'SELECT' );

		this.titlearea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'INPUT' )[ 3 ];
		var m = document.createElement( 'SELECT' );

		n.addEventListener( 'change', function eventchangeinsertchallengetheme( e ){ insertChallengetxt( ); insertChallengetheme( ); }, false );
		m.addEventListener( 'change', function eventchangeinsertchallengetheme( e ){ insertChallengetheme( ); }, false );
//rxk
		n.innerHTML = '<option value="1">Game challenge</option>' + '<option value="2">GameX2 challenge</option>' + '<option value="3">GameX3 challenge</option>';

		m.innerHTML = '';
		m.id = 'themeselect';

		for ( i = 0; i < challengethemeval.length; i++ )
		{
			m.innerHTML = m.innerHTML + '<option value="' + i + ">" + challengethemeval[ i ] + '</option>';
		}
//rxk
/*		var sRand = "0";
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
*/
		//start filling up textarea
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
		this.textarea.parentNode.insertBefore( document.createTextNode( 'Game challenge type: ' ), this.textarea );
		this.textarea.parentNode.insertBefore( n, this.textarea );
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );

		challengetxtnode = n;

		if ( lastchallenge != "11" )
			challengetxtnode.value = "2";
		else
			challengetxtnode.value = "3";
		this.textarea.value = challengetxtval[ challengetxtnode.value ];

		//replace winner name
//rxk
/*		if ( decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) != " " )
		{
			if ( challengetxtnode.value == 1 )
				this.textarea.value = this.textarea.value.replace( "winner", decodeURIComponent( GM_getValue( "Game.lastwinner" ) ) );
			else if ( decodeURIComponent( GM_getValue( "Game.lastmedalsplayers" ) ) != " " )
				this.textarea.value = this.textarea.value.replace( "Challenger 1 / Challenger 2 / Challenger 3", decodeURIComponent( GM_getValue( "Game.lastmedalsplayers" ) ) );
		}
*/		
		//start filling up textarea
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createTextNode( 'Game theme: ' ), this.titlearea );
		this.titlearea.parentNode.insertBefore( m, this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );

		if ( lastChallenge == "13" )
		{
			this.titlearea.value = lastchallenge + " - OPEN - Theme: *GAMEX2 - GAME VS GAME WINNERS";
		}
		else if ( lastChallenge == "14" )
		{
			this.titlearea.value = lastchallenge + " - OPEN - Theme: *GAMEX3 - GAMEX2 VS GAMEX2 WINNERS";
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

		Gamechlgnr = "Game." + chlgnr;

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

			GM_setValue( Gamechlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
			GM_setValue( Gamechlgnr + ".threadnr", threadnr );
			GM_setValue( Gamechlgnr + ".challengenr", chlgnr );
			GM_setValue( Gamechlgnr + ".commentcounter", commentcounter );
			GM_setValue( Gamechlgnr + ".status", encodeURIComponent( status ) );
			GM_setValue( Gamechlgnr + ".photo1", encodeURIComponent( photoposter ) );
			GM_setValue( Gamechlgnr + ".photovoter", encodeURIComponent( photovoter ) );
			GM_setValue( "Game.currentchallenge", chlgnr );

			//add headers

			var place = thisdocument.getElementById( "Tertiary" );

			//alert( place.innerHTML );

			//add Game info
			place.appendChild( thisdocument.createTextNode( ' / ' ) );
			myanchor = thisdocument.createElement( 'a' );
			myanchor.innerHTML = "Game-Info";
			myanchor.id = Gamechlgnr;
			myanchor.href = "#";
			myanchor.setAttribute( 'onClick', 'return false;' );
			myanchor.addEventListener( 'click', function eventclickchallenge( e ){ displayplatinumdata( e ); }, false );
			place.appendChild( myanchor );

			//add Game Bump
			place.appendChild( thisdocument.createTextNode( ' / ' ) );
			myanchor = thisdocument.createElement( 'a' );
			myanchor.innerHTML = "Game-Bump";
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

	runGameTool = function runGameTool( )
	{
		// check if we have GM variables
		if ( GM_getValue( "Game.version" ) == undefined )
			initdata( );
	
		if ( GM_getValue( "Game.version" ) != GametoolDBversion )
			initdata( );

		// check themelist & chlgheaders

		themelisttime = GM_getValue( "Game.themelisttime" );
		if ( ( themelisttime == undefined ) || ( themelisttime == "" ) ) 
		{
			loadthemelist( );
			loadchlgheader( );
		}  
		themelisttime = GM_getValue( "Game.themelisttime" );
		elapstime = GameStartTime.getTime( ) - themelisttime;
		if ( elapstime > 1000 * 60 * 60 * 24 ) 
		{
			loadthemelist( );
			loadchlgheader( );
		}  

		if (GM_getValue("Game.brackets")!="false")
		{
			GM_setValue("Game.brackets","false"); //reset brackets status when we start
		}

		if ( ( thislocation.href.match( "flickr.com/photos/" ) == "flickr.com/photos/" ) ||
			( thislocation.href.match( "flickr.com//photos/" ) == "flickr.com//photos/" ) ) 
		{
			// ************************
			// check for awards on photo page
			// ************************
			Award.init( );
		}
		else if ( thislocation.href.match( "/groups/Gameplatinum/" ) == "/groups/Gameplatinum/" )
		{
			// in Game platinum for brackets qualifying.
			if ( thisdocument.title.split( " " )[ 1 ] == "Discussing")
			{
				// ***********
				// detail page
				// ***********
				ProcessPlatinumDetailDoc( );
			}
		}
		else if ( GM_getValue( "Game.bumping" ) != "false" )
		{
			bumpmeup( ); //if in bumping mode, go to bump processing
		}
		else if ( GM_getValue( "Game.bumpAllState" ) == "processing" )
		{
			bumpall( );
			return;
		}
		else if ( thisdocument.title.match( "discussion topics" ) == "discussion topics" )
		{
			// ************************
			// main photo Game page
			// ************************
			//alert( "in main" );
			if ( GM_getValue( "Game.bumping" ) != "false" )
			{
				GM_setValue( "Game.bumping", "false" ); //reset bumping status if we're in discuss
			}
			GM_setValue( "Game.postedcomment", "false" );
	
			ProcessMainDoc( );
		}
		else if ( thisdocument.title.split( " " )[ 1 ] == "Discussing" )
		{
			// ***********
			// detail page
			// ***********
			//alert( "in detail" );
	
			GM_setValue( "Game.postedcomment", "false" );
			ProcessDetailDoc( );
		}
		else if ( thislocation == "http://www.flickr.com/groups_newtopic.gne?id=537774@N20" )
		{
			Createnewchallenge( );
		}
		else if ( thislocation.href.match( "/edit/" ) == "/edit/" )
		{
			Editchallenge( );
		}
	
		addGameheader( );
	
		GM_registerMenuCommand( "Initialise Game Admin data (themes, headers, ...)", initdatafrommenu );
	}


	// *******************
	// Start of processing
	// *******************

	if ( window.name == 'Log page' )
		return; //don't process log page

	var thislocation = location;
	var thisdocument = document;
	var discusstrs;

	runGameTool( );

	return;

	// *******************
	//  End of processing
	// *******************

} )( );