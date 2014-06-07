// ==UserScript==
// @name		Challenge Sandbox admin tool
// @namespace		http://www.flickr.com/groups/challengesandbox/
// @description		An admin tool for the Flickr Challenge Sandbox group - V0.4
// @version		0.4s
// @identifier	
// @date		    08 Nov. 2010
// @modified by		RKho (pipeguru) for Ease Game group
// @contributor     Alesa Dam (http://flickr.com/alesadam): v0.4
// @contributor     Martin Heimburger (http://flickr.com/vispillo): admin invite
// @modified date   	8 Nov. 2010
// 
// @include		http://www.flickr.com/groups/challengesandbox/discuss/*
// @include		http://www.flickr.com/groups/challengesandbox/discuss/        
// @include		http://flickr.com/groups/challengesandbox/discuss/*
// @include		http://flickr.com/groups/challengesandbox/discuss/
// @include		http://www.flickr.com/groups_newtopic.gne?id=1515341@N25
// @include		http://*flickr.com/photos/*/*
// @include		http://*flickr.com//photos/*/*
// @include		http://www.flickr.com/groups/challengesandbox/discuss/*/edit/
// @exclude		http://www.flickr.com/groups/challengesandbox/discuss/*/lock/
//
// Revision history
//
// v0.4p: initial version - clone of pre*Game admin tool v0.4p
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

(function ChallengeSandboxAdmintool( ) 
{
	var ChallengeSandboxStartTime = new Date( );
	var ChallengeSandboxtoolversion = "V0.4s";

	var topicidpos = 9;
	var postidpos = 10;

	var help1;
	var help2;

	var iChallengeSandboxVoteScore = 5;
	var sChallengeSandboxVoteScore = "" + iChallengeSandboxVoteScore;

	//global variables for adding new challenges
    var nHeaders = parseInt(GM_getValue("ChallengeSandbox.headers"));
    if (isNaN(nHeaders)) {
        alert("You will need to (re-)initialize the Challenge Sandbox Admin tool data");
    }

	var challengetxtnode;

	var challengethemeval;
	var challengethemenode;

	var node;
	var processforChallengeSandbox;

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

			var splitvar = "-";
			result = "" + vote1 + splitvar + vote2;
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
		checktext[ 2 ] = "Photo Gallery";
		checktext[ 3 ] = "Meet";
		checktext[ 4 ] = "Game Icon";
        checktext[ 5 ] = "The Official";
        checktext[ 6 ] = "What you need to do now ";

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
		Gametime = ChallengeSandboxStartTime.getTime( );
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
			processforChallengeSandbox = false;
			if ( ( document.referrer.match( "challengesandbox/discuss" ) == "challengesandbox/discuss" ) ||
				 ( document.referrer.match( "challengesandbox/discuss" ) == "challengesandbox/discuss" ) ||
				 ( GM_getValue( "ChallengeSandbox.paginate" ) == "true" )	) 
			{
				processforChallengeSandbox = true;
				
				GM_setValue( "ChallengeSandbox.paginate", "false" ); // switch off paginateswitch
				this.textarea = document.getElementById( 'comments' ).getElementsByTagName( 'TEXTAREA' )[ 0 ];
				posts = document.getElementById( 'comments' ).innerHTML;
				if ( posts.match( /<div.*class="Paginator"/ ))
				{
					alert( "photo has more then 1 page of posts, please check all pages for a medal" );

					//start checking for click on page hrefs to catch click on next page    
					window.addEventListener ( 'mousedown', function eventawardclickme(e) { Award.clickme (e); }, false );
				}
				// Check for medals
				chcktxt = '/groups/challengesandbox';
				chcktxt3 = /is eligible[^]*to compete in.+yes_or_no.*Game Challenge/;
                alerttxt  ="";

				if ( posts.match( chcktxt ) ) 
				{
					if ( posts.match( chcktxt3 ) ) 
					{
						//var since = posts.split( chcktxt3 )[ 1 ].split( "Posted" )[ 1 ].split( "ago" )[ 0 ];
                        var since = " some time "; // TODO
						alerttxt = alerttxt + "\n\nPHOTO HAS MEDAL" + "\nPosted" + since + "ago.";
					}
				}

				if ( alerttxt != "" )
				{
					alert( alerttxt );
				}

                photoid = document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/(\d+)/)[0];
				// Check for public: could be replaced with an API call
/*				photoid = unsafeWindow.page_photo_id;
				if ( unsafeWindow.global_photos[ unsafeWindow.page_photo_id ].isPublic == 0 ) 
				{
					alert( "PHOTO SEEMS NOT TO BE PUBLIC, PLEASE CHECK" );
				}
*/
				// Create medal award box
				var n = document.createElement ( 'SELECT' );
                // Clear 'history'
			    GM_setValue( "ChallengeSandbox.postedmedal", 0 );

				n.addEventListener ( 'change', function eventawardchangeaward(e) { Award.insertAward (); }, false );

                var nMedals = parseInt(GM_getValue("ChallengeSandbox.medals"));
                var emptyMedalOption = document.createElement('option');
                emptyMedalOption.value = 0;
                n.appendChild(emptyMedalOption);
                for (var i = 1; i <= nMedals; ++i) {
                    var medalOption = document.createElement('option');
                    medalOption.value = i;
                    medalOption.innerHTML = GM_getValue("ChallengeSandbox.medal." + i + ".title");
                    n.appendChild(medalOption);
                }

				//GM_log(document.getElementById ('DiscussPhoto').innerHTML);

				this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
				this.textarea.parentNode.insertBefore( document.createTextNode( 'Challenge Sandbox Awards: ' ), this.textarea );
				this.textarea.parentNode.insertBefore( n, this.textarea );
				this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
				this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );

				node = n;

				//code to trap post button

                var postCommentButton = document.evaluate("//input[contains(@class, 'comment-button-post')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				/*document.getElementById( 'btn_post_comment' )*/postCommentButton.addEventListener( 'mousedown', function postcommentclickme(e) { Award.clickpostcomment (e); }, false );
			}

			// GM_log(document.getElementById ('DiscussPhoto').innerHTML);

		},

		insertAward: function Awardinsert( )
		{
			this.textarea.value = GM_getValue("ChallengeSandbox.medal." + node.value + ".medal") + this.textarea.value;
			GM_setValue( "ChallengeSandbox.postedmedal", node.value );
		},

		clickpostcomment: function Awardclickpostcomment( )
		{
			//alert( 'in postcomment' );       
				var tagtext = "";
				if ( GM_getValue( "ChallengeSandbox.postedmedal" ) == "1" ) tagtext = '"Challenge Sandbox Winner"'; //currently no tags set yet
				if ( GM_getValue( "ChallengeSandbox.postedmedal" ) == "2" ) tagtext = '"Challenge Sandbox Sweep Winner"';
            try {
				if ( tagtext != "" ) 
				{
  				  // We're adding a tag (i.e. a medal), so it's okay to send an admin invite too
  				  var photoid = document.location.href.split('/')[5];
			      sendAdminInvite('1515341@N25',photoid);
				    document.getElementById( 'addtagbox' ).value = tagtext;
					//document.getElementById( 'tagadderform' ).submit( );
					document.getElementById( 'tagadderform' ).elements[ 2 ].click( );
				}
            } catch (e) {
                GM_log("unable to add tag '" + tagtext + "'");
            }
		},

		clickme: function Awardclickme( e ) 
		{
			//GM_log( "process: " + processforChallengeSandbox );
			if ( processforChallengeSandbox )
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
						GM_setValue( "ChallengeSandbox.paginate", "true" );
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
		GM_setValue( "ChallengeSandbox.themelisttime", thistime );

		GM_log( "ChallengeSandbox: Started loading new themelist (in background)" );

		//var url = "http://www.flickr.com/groups/1129391@N22/discuss/72157619266773244/";
        var url = "http://www.flickr.com/groups/challengesandbox/discuss/72157625341614646/";

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
					GM_setValue( "ChallengeSandbox.themelist", themestring );
					challengethemeval = themestring.split( "||" );

					GM_log( "ChallengeSandbox: Loading new themelist complete" );
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
		GM_setValue( "ChallengeSandbox.themelisttime", thistime );

		GM_log( "ChallengeSandbox: Started loading new challengeheaders (in background)" );

		//var url = "http://www.flickr.com/groups/1129391@N22/discuss/72157620829573582/?locked=1";
        //var url = "http://www.flickr.com/groups/1343581@N20/discuss/72157623547058736/"; v0.4 - v0.4g
        var url = "http://www.flickr.com/groups/challengesandbox/discuss/72157625216643231/";

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
          try {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = responseDetails.responseText;

            var replies = document.evaluate(".//div[@id='DiscussTopic']//table[@class='TopicReply']//td[@class='Said']",
                tempDiv, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            var nHeaders = 0;
            for (var i = 0, len = replies.snapshotLength; i < len; ++i) {
                var reply = replies.snapshotItem(i);
                try {
                    var title = reply.innerHTML.split("===Start of Title===")[1]
                                               .split("===End of Title===")[0]
                                               .replace(/<[^>]+>/g, '');
                    var header = reply.innerHTML.split("===Start of Header===")[1]
                                                .split("===End of Header===")[0];
                    GM_setValue( "ChallengeSandbox.header." + (nHeaders+1) + ".title", title);
                    GM_setValue( "ChallengeSandbox.header." + (nHeaders+1) + ".text", header); // 1-based
                    if (reply.innerHTML.match("===Start of Theme===")) {
                        var theme = reply.innerHTML.split("===Start of Theme===")[1]
                                                   .split("===End of Theme===")[0]
                                                   .replace(/<[^>]+>/g, '');
                        GM_setValue( "ChallengeSandbox.header." + (nHeaders+1) + ".theme", theme);
                    } else { // in case there was one previously
                        GM_deleteValue("ChallengeSandbox.header." + (nHeaders+1) + ".theme");
                    }
                    ++nHeaders; // in case there is a reply that throws an exception
                } catch (e) {
                    GM_log("error reading header entry - skipping (" + e + ")");
                }
            }
            GM_setValue( "ChallengeSandbox.headers", nHeaders );
			//GM_setValue( "ChallengeSandbox.Gamechlgheader", headerChallengeSandbox );

			GM_log( "ChallengeSandbox: Loading new challengeheaders complete" );
          } catch (e) {
            GM_log("error loading headers: " + e);
          }
		}} ); // end GM_xmlhttpRequest

	}

	// *******************
	// end of load challenge headers
	// *******************


	// *******************
	// Start of load medals
	// *******************

	function loadmedals( )
	{
		d = new Date( );
		thistime = d.getTime( ).toString( );
		GM_setValue( "ChallengeSandbox.themelisttime", thistime );

		GM_log( "ChallengeSandbox: Started loading new medals (in background)" );

        var url = "http://www.flickr.com/groups/challengesandbox/discuss/72157625216618353/";

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
          try {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = responseDetails.responseText;

            var replies = document.evaluate(".//div[@id='DiscussTopic']//table[@class='TopicReply']//td[@class='Said']",
                tempDiv, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            var nMedals = 0;
            for (var i = 0, len = replies.snapshotLength; i < len; ++i) {
                var reply = replies.snapshotItem(i);
                try {
                    var title = reply.innerHTML.split("===Start of Title===")[1]
                                               .split("===End of Title===")[0]
                                               .replace(/<[^>]+>/g, '');
                    var medal = reply.innerHTML.split("===Start of Medal===")[1]
                                                .split("===End of Medal===")[0]
                                                .replace(/<br>/g, '\n');
                    GM_setValue( "ChallengeSandbox.medal." + (nMedals+1) + ".title", title);
                    GM_setValue( "ChallengeSandbox.medal." + (nMedals+1) + ".medal", medal); // 1-based
                    ++nMedals; // in case there is a reply that throws an error
                } catch (e) {
                    GM_log("error reading medal entry - skipping (" + e + ")");
                }
            }
            GM_setValue( "ChallengeSandbox.medals", nMedals );

			GM_log( "ChallengeSandbox: Loading new medals complete" );
          } catch (e) {
            GM_log("error loading headers: " + e);
          }
		}} ); // end GM_xmlhttpRequest

	}

	// *******************
	// end of load medals
	// *******************


	// *******************
	// Start of display functions
	// *******************

	function checkvotes( challenge, verbose ) 
	{
GM_log( "checking: " + challenge );

		var mylist = new Array();

		mylist[ 0 ] = "ChallengeSandbox.01";
		mylist[ 1 ] = "ChallengeSandbox.02";
		mylist[ 2 ] = "ChallengeSandbox.03";
		mylist[ 3 ] = "ChallengeSandbox.04";
		mylist[ 4 ] = "ChallengeSandbox.05";
		mylist[ 5 ] = "ChallengeSandbox.06";
		mylist[ 6 ] = "ChallengeSandbox.07";
		mylist[ 7 ] = "ChallengeSandbox.08";
		mylist[ 8 ] = "ChallengeSandbox.09";
		mylist[ 9 ] = "ChallengeSandbox.10";
		mylist[ 10 ] = "ChallengeSandbox.11";
		mylist[ 11 ] = "ChallengeSandbox.12";
		mylist[ 12 ] = "ChallengeSandbox.13";
		mylist[ 13 ] = "ChallengeSandbox.14";
		mylist[ 14 ] = "ChallengeSandbox.15";
		

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

		mylist[ 0 ] = "ChallengeSandbox.01";
		mylist[ 1 ] = "ChallengeSandbox.02";
		mylist[ 2 ] = "ChallengeSandbox.03";
		mylist[ 3 ] = "ChallengeSandbox.04";
		mylist[ 4 ] = "ChallengeSandbox.05";
		mylist[ 5 ] = "ChallengeSandbox.06";
		mylist[ 6 ] = "ChallengeSandbox.07";
		mylist[ 7 ] = "ChallengeSandbox.08";
		mylist[ 8 ] = "ChallengeSandbox.09";
		mylist[ 9 ] = "ChallengeSandbox.10";
		mylist[ 10 ] = "ChallengeSandbox.11";
		mylist[ 11 ] = "ChallengeSandbox.12";
		mylist[ 12 ] = "ChallengeSandbox.13";
		mylist[ 13 ] = "ChallengeSandbox.14";
		mylist[ 14 ] = "ChallengeSandbox.15";

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
				if ( ddphoto1 != " " ) photolist[ y++ ] = ddphoto1;
				if ( ddphoto2 != " " ) photolist[ y++ ] = ddphoto2;
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

		ChallengeSandboxchlgnr = targ.id;
		url = targ.href;

		ddthreadnr = GM_getValue( ChallengeSandboxchlgnr + ".threadnr" );
		ddchlgnr = GM_getValue( ChallengeSandboxchlgnr + ".challengenr" );
		ddcommentcounter = GM_getValue( ChallengeSandboxchlgnr + ".commentcounter" );
		ddstatus = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".status" ) );
		ddphoto1 = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo1" ) );
		ddphotovoter = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photovoter" ) );

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

		ChallengeSandboxchlgnr = targ.id;
		url = targ.href;

		votealert = checkvotes( ChallengeSandboxchlgnr, true );

		ddthreadnr = GM_getValue( ChallengeSandboxchlgnr + ".threadnr" );
		ddchlgnr = GM_getValue( ChallengeSandboxchlgnr + ".challengenr" );
		ddcommentcounter = GM_getValue( ChallengeSandboxchlgnr + ".commentcounter" );
		ddstatus = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".status" ) );
		ddwinner = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".winner" ) );
		ddphoto1 = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo1" ) );
		ddphoto2 = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo2" ) );
		ddphotovoter = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photovoter" ) );
		var ddlastvote = GM_getValue( ChallengeSandboxchlgnr + ".lastvote");
		ddchlgstatus = GM_getValue( ChallengeSandboxchlgnr + ".chlgstatus" );
		ddtovotetime = GM_getValue( ChallengeSandboxchlgnr + ".tovotetime" );
		ddphoto1time = GM_getValue( ChallengeSandboxchlgnr + ".photo1time" );
		ddphoto2time = GM_getValue( ChallengeSandboxchlgnr + ".photo2time" );

		if ( ( ( ddphoto1 != " " ) && ( ddwinner.indexOf( ddphoto1 ) != -1 ) ) ||
		     ( ( ddphoto2 != " " ) && ( ddwinner.indexOf( ddphoto2 ) != -1 ) ) )
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
				var challengenumber = parseInt( ChallengeSandboxchlgnr.split( "." )[ 1 ] );

				var requiredScore = iChallengeSandboxVoteScore;

				for ( iVote = 0; iVote < 3; iVote++ )
				{
					if ( parseInt( lastvotevalues[ iVote ] ) >= requiredScore )
					{
						winner = "" + decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo" + ( iVote + 1 ) ) ) +
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

		if ( GM_getValue( "ChallengeSandbox.brackets" ) != "false" )
		{
			var mybracketlist = new Array( );
			// do some specific brackets coding
		}

		mylist[ 0 ] = "ChallengeSandbox.01";
		mylist[ 1 ] = "ChallengeSandbox.02";
		mylist[ 2 ] = "ChallengeSandbox.03";
		mylist[ 3 ] = "ChallengeSandbox.04";
		mylist[ 4 ] = "ChallengeSandbox.05";
		mylist[ 5 ] = "ChallengeSandbox.06";
		mylist[ 6 ] = "ChallengeSandbox.07";
		mylist[ 7 ] = "ChallengeSandbox.08";
		mylist[ 8 ] = "ChallengeSandbox.09";
		mylist[ 9 ] = "ChallengeSandbox.10";
		mylist[ 10 ] = "ChallengeSandbox.11";
		mylist[ 11 ] = "ChallengeSandbox.12";
		mylist[ 12 ] = "ChallengeSandbox.13";
		mylist[ 13 ] = "ChallengeSandbox.14";
		mylist[ 14 ] = "ChallengeSandbox.15";

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
		GM_setValue( "ChallengeSandbox.update", "true" );
		thislocation.replace( url );

		return;
	}

	updatealldata = function updatealldata() 
	{
		GM_setValue( "ChallengeSandbox.updatealldata","true" );
		var updfound = false;

		maxupdates = parseInt(GM_getValue( "ChallengeSandbox.maxupdate" ));
		maxupdates++;
		//GM_log( maxupdates );

		if ( maxupdates > 15 ) 
		{
			GM_setValue( "ChallengeSandbox.maxupdate", 0 );
			GM_setValue( "ChallengeSandbox.updatealldata", "false" );
			alert( "Stopped updating: possible loop due to double challenges" );
			return;
		}
		else
		{
			GM_setValue( "ChallengeSandbox.maxupdate", maxupdates );
		}

		for ( i = 1; i < discusstrs.length; i++ )
		{
			//GM_log( "in updateall" );
			//GM_log( discusstrs[ i ].innerHTML );

			var tds = discusstrs[ i ].getElementsByTagName( "td" );
			var mnchlgnr=tds[ 0 ].innerHTML.split( "<b>" )[ 1 ].split( " " )[ 0 ];
			var ChallengeSandboxchlgnr = "ChallengeSandbox." + mnchlgnr;
			var chlgstatus = tds[ 4 ].innerHTML;
			var url = "http://www.flickr.com" + tds[ 0 ].innerHTML.split( "href=\"" )[ 1 ].split( "\"" )[ 0 ];
			//GM_log( "url: " + url );

			if ( chlgstatus.match( "UPD" ) == "UPD" )
			{
				GM_setValue( "ChallengeSandbox.update", "true" );
				updfound = true;
				thislocation.replace( url );
				break;
			}
		}
		if ( !updfound )
		{
			GM_setValue( "ChallengeSandbox.updatealldata", "false" );
		}
		//alert( GM_getValue( "ChallengeSandbox.updatealldata" ) );

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
		alert( 'ChallengeSandbox data initialised.\nThemes and challenge headers are being loaded in background.'
			+ '\nThis may take up to half a minute depending on Flickr response times' 
			+ '\n\nPlease refresh the page to start using them.' );

	}

	initdata = function initdata( )
	{
		GM_log( "ChallengeSandbox: init data started" );

		var mylist = new Array( );

		mylist[ 0 ] = "ChallengeSandbox.01";
		mylist[ 1 ] = "ChallengeSandbox.02";
		mylist[ 2 ] = "ChallengeSandbox.03";
		mylist[ 3 ] = "ChallengeSandbox.04";
		mylist[ 4 ] = "ChallengeSandbox.05";
		mylist[ 5 ] = "ChallengeSandbox.06";
		mylist[ 6 ] = "ChallengeSandbox.07";
		mylist[ 7 ] = "ChallengeSandbox.08";
		mylist[ 8 ] = "ChallengeSandbox.09";
		mylist[ 9 ] = "ChallengeSandbox.10";
		mylist[ 10 ] = "ChallengeSandbox.11";
		mylist[ 11 ] = "ChallengeSandbox.12";
		mylist[ 12 ] = "ChallengeSandbox.13";
		mylist[ 13 ] = "ChallengeSandbox.14";
		mylist[ 14 ] = "ChallengeSandbox.15";

		myalert = "";

		GM_setValue( "ChallengeSandbox.updatealldata", "false" );
		GM_setValue( "ChallengeSandbox.update", "false" );
		GM_setValue( "ChallengeSandbox.maxupdate", 0 );
		GM_setValue( "ChallengeSandbox.version", ChallengeSandboxtoolversion );
		GM_setValue( "ChallengeSandbox.brackets", "false" );
		GM_setValue( "ChallengeSandbox.lastwinner", encodeURIComponent( " " ) );
GM_log( "Clearing last winner: " + decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) );
		GM_setValue( "ChallengeSandbox.lastchallenge", "" );
		GM_setValue( "ChallengeSandbox.currentchallenge", "" );
		GM_setValue( "ChallengeSandbox.themelist", "" );
		GM_setValue( "ChallengeSandbox.themelisttime", "" );
		
        var x = 0;

		for ( x in mylist )
		{
			GM_setValue( mylist[ x ] + ".startdate", encodeURIComponent( "" ) );
			GM_setValue( mylist[ x ] + ".threadnr", x );
			GM_setValue( mylist[ x ] + ".challengenr", "99" );
			GM_setValue( mylist[ x ] + ".commentcounter", "100" );
			GM_setValue( mylist[ x ] + ".status", encodeURIComponent( mylist[ x ].split( "ChallengeSandbox." )[ 1 ] + " - not found or not updated with new info yet" ) );
			GM_setValue( mylist[ x ] + ".winner", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".photo1", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".photo2", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".photovoter", encodeURIComponent( " " ) );
			GM_setValue( mylist[ x ] + ".lastvote", " " );
			GM_setValue( mylist[ x ] + ".chlgstatus", "---" );
			GM_setValue( mylist[ x ] + ".tovotetime", " " );
			GM_setValue( mylist[ x ] + ".photo1time", " " );
			GM_setValue( mylist[ x ] + ".photo2time", " " );
			GM_setValue( mylist[ x ] + ".photo1timesince", " " );
			GM_setValue( mylist[ x ] + ".photo2timesince", " " );
		}

		GM_log( "ChallengeSandbox: init data complete" );

		loadthemelist( );
		loadchlgheader( );
        loadmedals( );
	}

	// *******************
	// End of init data
	// *******************


	// *******************
	// Start of write header
	// *******************

	addChallengeSandboxheader = function addChallengeSandboxheader( )
	{
		var topbar = thisdocument.getElementById( "TopBar" );
        if (topbar) { // don't show banner on photo pages (new layout)
    		var tables = topbar.getElementsByTagName( "table" );
	    	var trs = tables[ 0 ].getElementsByTagName( "tr" );
		    var tds = trs[ 0 ].getElementsByTagName( "td" );

    		var GameEndTime = new Date( );
	    	var GameExecutionTime = GameEndTime - ChallengeSandboxStartTime;

		    if ( unsafeWindow.global_name == 'Ray' || unsafeWindow.global_name == 'pipeguru' )
			    tds[ 1 ].innerHTML = "Challenge Sandbox Admin tool " + ChallengeSandboxtoolversion + " (" + GameExecutionTime + "ms)" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[ 1 ].innerHTML;
    		else
	    		tds[ 1 ].innerHTML = "Challenge Sandbox Admin tool " + ChallengeSandboxtoolversion + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + tds[1].innerHTML;
        }
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
        GM_setValue( "ChallengeSandbox.DailyChatUrl", url );
			}

			if ( mnchlgnr.length == 2 ) //only process if chlgnr is correct format
			{
				ChallengeSandboxchlgnr = "ChallengeSandbox." + mnchlgnr;

				ddcommentcounter= GM_getValue( ChallengeSandboxchlgnr + ".commentcounter" );
				ddstatus 	= decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".status" ) );
				ddwinner 	= decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".winner" ) );
				ddphoto1 	= decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo1" ) );
				ddphoto2 	= decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo2" ) );
				ddphoto1time 	= decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo1time" ) );
				ddphoto2time 	= decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo2time" ) );
				ddlastvote 	= GM_getValue( ChallengeSandboxchlgnr + ".lastvote" );
				ddthreadnr 	= GM_getValue( ChallengeSandboxchlgnr + ".threadnr" );

				var votetime = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".tovotetimesince" ) );
				var phototime1 = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo1timesince" ) );
				var phototime2 = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".photo2timesince" ) );

				var ddlastphototime = "";
				{
					if ( phototime2.length < 2 )
					{
						if ( phototime1.length < 2 )
						{
							challengeopendate = decodeURIComponent( GM_getValue( ChallengeSandboxchlgnr + ".startdate" ) );
							hours = ( ChallengeSandboxStartTime.getTime( ) - challengeopendate ) / ( 1000 * 60 * 60 );
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
					if ( ddstatus.match(/[\s-]+OPEN[\s-]+/) && converttoseconds( ddlastphototime ) > 7200 )
					{
						 sAlert = ddstatus;// + "\nNo activity in past 2 hours";
                    }
				}

				ddlastvote = detectNoSpaces( ddlastvote );

				var thread = tds[ 0 ].innerHTML.split( "href" )[ 1 ].split( "/" )[ 4 ].split( "/" )[ 0 ];

				mncommentcounter = tds[ 2 ].innerHTML;

				if ( checkskipchallenge( tds[ 0 ].innerHTML ) ) chlgstatus = "---";  //handle non challenges with a challenge number 
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "CLOSED" ) == "CLOSED" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "Daily Chat" ) == "Daily Chat" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "VOID" ) == "VOID" ) chlgstatus = "---";
				else if ( tds[ 0 ].innerHTML.toUpperCase( ).match( "AWAITING" ) == "AWAITING" ) chlgstatus = "---";
				else if ( thread != ddthreadnr ) chlgstatus = "UPD";
				else if ( ( ddstatus.toUpperCase( ).match( "WAIT" ) == "WAIT" ) && ( mncommentcounter == ddcommentcounter ) ) chlgstatus = "WT";
				else if ( ( ddlastvote.match( sChallengeSandboxVoteScore ) == sChallengeSandboxVoteScore ) && ( mncommentcounter == ddcommentcounter ) && ( ddphoto2 != " " ) ) chlgstatus = "FIN";
				else if ( ( ddphoto2 != " " ) && ( ddstatus.match( "VOTE" ) != "VOTE" ) && ( mncommentcounter == ddcommentcounter ) ) chlgstatus = "VOT";
				else if ( mncommentcounter == ddcommentcounter ) chlgstatus = "OK";

// rxk change ddphoto3 to ddphoto2 for 2 photos challenge

				//overruling statusses
				if ( chlgstatus != "---" )
				{ 
					if ( ( ( ddphoto1 != " " ) && ( ddwinner.indexOf( ddphoto1 ) != -1 ) ) ||
					     ( ( ddphoto2 != " " ) && ( ddwinner.indexOf( ddphoto2 ) != -1 ) ) )
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
						GM_setValue( ChallengeSandboxchlgnr + ".status", encodeURIComponent( mnstatus ) ); // write new full status
					}
				} 

				//write status if there is a status & set challenge number to processed if status different from "---"
				if ( chlgstatus != "---" ) 
				{
					GM_setValue ( ChallengeSandboxchlgnr + ".chlgstatus", chlgstatus);
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
				myanchor.id = ChallengeSandboxchlgnr;
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
		update = GM_getValue( "ChallengeSandbox.updatealldata" );
		if ( update.match( "true" ) == "true" )
			updatealldata( );
		else 
			GM_setValue( "ChallengeSandbox.maxupdate", 0 );

		// add Challenge Sandbox info & update headers
		var trs = tables[ 0 ].getElementsByTagName( "tr" );
		var tds = trs[ 0 ].getElementsByTagName( "td" );
		var h1 = tds[ 1 ].getElementsByTagName( "h1" );

		//add initialise ChallengeSandbox Admin Data
		h1[ 0 ].appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "PG-Init";
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickmain( e ){ initdatafrommenu( ); }, false);
		h1[ 0 ].appendChild( myanchor );

		//add displayfulldata
		h1[ 0 ].appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "PG-Info";
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickmain( e ){ displayfulldata( ); }, false);
		h1[ 0 ].appendChild( myanchor );

		//add updatealldata
		h1[ 0 ].appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "PG-Update";
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickmain( e ){ updatealldata( ); }, false );
		h1[ 0 ].appendChild( myanchor );

		// erase statusses of challenges not found + set all active themes
		// only do this on the first page...
		if ( thislocation.href.match( "challengesandbox/discuss/page" ) != "challengesandbox/discuss/page" )
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
					GM_setValue( "ChallengeSandbox." + chkchlg + ".status", encodeURIComponent( chkchlg + " - not found or not updated with new info yet" ) );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".winner", encodeURIComponent( " " ) );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".photo1", encodeURIComponent( " " ) );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".photo2", encodeURIComponent( " " ) );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".photovoter", encodeURIComponent( " " ) );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".commentcounter", "100" );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".lastvote", " " );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".chlgstatus", "---" );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".tovotetime", " " );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".photo1time", " " );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".photo2time", " " );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".photo1timesince", " " );
					GM_setValue( "ChallengeSandbox." + chkchlg + ".photo2timesince", " " );
				}
				else
				{
					activethemes = activethemes + decodeURIComponent( GM_getValue( "ChallengeSandbox." + chkchlg + ".status" ) ).split( 'Theme: ' )[ 1 ] + "||";
				} 
			}

			GM_setValue( "ChallengeSandbox.activethemes", encodeURIComponent( activethemes ) );
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

		var threadnr = thislocation.href.split( '/' )[ 6 ];
		//GM_log( "detaildoc threadnr: " + threadnr );

		// select goodstuff

		var title = thisdocument.getElementById( "GoodStuff" ).innerHTML;

		// extract challengenr and status out of title

		var chlgnr = title.split( /<h2[^>]*>/ )[ 1 ].split( " " )[ 0 ];
		var status = title.split( /<h2[^>]*>/ )[ 1 ].split( "<" )[ 0 ].replace( /&amp;/g, "&" );
		//var status = title.split( " - " )[ 1 ].split( " - " )[ 0 ];

		// check for non challenge threads
		if ( checkskipchallenge( status ) )
		{
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
        // only consider the Flickr tds, not the ones from the photo information table (UCP) !!
        var posts = document.evaluate("./table//td[@class='Said']", discuss, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var tds = discuss.getElementsByTagName( "td" );

		// set commentcounter
		var commentcounter = posts.snapshotLength - 3; // -3: OP and 2 entries

		if ( commentcounter < 0 )
			return; // no tds in discusstopic... shouldn't happen

		// get the winner out of the 2nd td

		//GM_log( discuss.innerHTML );
		var winner = " ";
		var votetime = " ";
//		var challengeopendate = getTimeAgo( discuss.innerHTML.split( "osted at " )[ 1 ].split( "\n" )[ 0 ] );
        var challengeOpenDateSmall = document.evaluate(".//small", posts.snapshotItem(0), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var challengeopendate = getTimeAgo( challengeOpenDateSmall.innerHTML.split( /osted at /i )[ 1 ].split( "\n" )[ 0 ] );
		endofbrackets = 0;

		// start looping td's from number 3 [2] & fetch all photos
		var i = 0;
        var nrOfLastPostWithPhoto = 0;
		var photoposter = new Array( );
		photoposter[ 0 ] = " ";
		photoposter[ 1 ] = " ";
		var phototime = new Array( );
		phototime[ 0 ] = " ";
		phototime[ 1 ] = " ";
		var photonumber = 0;
		var photovoter = "";
		var lastvote = "no votes";

		for (var i = 1, len = posts.snapshotLength; i < len; ++i) // posts[0]: OP
		{
            var reply = posts.snapshotItem(i);
			txt = reply.innerHTML;

			if ( txt.match( "says" ) == "says" )
			{
				txt2 = txt.split( "</h4>" )[ 1 ].split( "<small>" )[ 0 ]; //check on 2nd part because of extra img title for admins
				//alert( i + " / " + txt );
				//alert( i + " / " + txt2 );

				if ( txt2.match( "img" ) == "img" && txt2.match( "UCPANG:bump" ) != "UCPANG:bump" )
				{
					// photo found, now get username
					photoposter[ photonumber ] = txt.split( "<a href" )[ 1 ].split( ">" )[ 1 ].split( "<" )[ 0 ];
					photoposter[ photonumber ] = photoposter[ photonumber ].replace( /&amp;/g, "&" );
					phototime[ photonumber ] = txt.split( "osted " )[ 1 ].split( " ago." )[ 0 ];
					//alert( photonumber + " / " + photoposter[ photonumber ] );
					photonumber++;
					//remember position of last td
                    nrOfLastPostWithPhoto = i;

				}

			}
		}

		// get last comment if available
		if ( ( nrOfLastPostWithPhoto < posts.snapshotLength - 1 ) && ( commentcounter > 3 ) ) 
		{
            var lastReply = posts.snapshotItem(posts.snapshotLength - 1);
			var ptag = lastReply.getElementsByTagName( 'p' );
			lastvote = ptag[ 0 ].innerHTML.split( "\t" )[ 8 ].split( "\t" )[ 0 ].split( "\n" )[ 0 ];
			lastvote = lastvote.replace( /<br>/, "" ).replace( /\n/, "" ).replace( /&gt;/g, ">" ); //cleanup string
			if ( lastvote.match( "<img" ) == "<img" && lastvote.match( "UCPANG:bump" ) != "UCPANG:bump" )
				lastvote = "no votes"; //capture error lastvote when text comment before last photo
		} 
		else
			lastvote = "no votes";

		ChallengeSandboxchlgnr = "ChallengeSandbox." + chlgnr;

		//alert( ChallengeSandboxchlgnr );

		GM_setValue( ChallengeSandboxchlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
		GM_setValue( ChallengeSandboxchlgnr + ".threadnr", threadnr );
		GM_setValue( ChallengeSandboxchlgnr + ".challengenr", chlgnr );
		GM_setValue( ChallengeSandboxchlgnr + ".commentcounter", commentcounter );
		GM_setValue( ChallengeSandboxchlgnr + ".status", encodeURIComponent( status ) );
		GM_setValue( ChallengeSandboxchlgnr + ".winner", encodeURIComponent( winner ) );
		GM_setValue( ChallengeSandboxchlgnr + ".photo1", encodeURIComponent( photoposter[ 0 ] ) );
		GM_setValue( ChallengeSandboxchlgnr + ".photo2", encodeURIComponent( photoposter[ 1 ] ) );
		GM_setValue( ChallengeSandboxchlgnr + ".photovoter", encodeURIComponent( photovoter ) );

		// inside challenge - decode last vote if no spaces
		lastvote = detectNoSpaces( lastvote );

		GM_setValue( ChallengeSandboxchlgnr + ".lastvote", lastvote );
		GM_setValue( ChallengeSandboxchlgnr + ".chlgstatus", "OK" );
		GM_setValue( "ChallengeSandbox.currentchallenge", chlgnr );

		GM_setValue( ChallengeSandboxchlgnr + ".tovotetime", converttotime( votetime ) );
		GM_setValue( ChallengeSandboxchlgnr + ".photo1time", converttotime( phototime[ 0 ] ) );
		GM_setValue( ChallengeSandboxchlgnr + ".photo2time", converttotime( phototime[ 1 ] ) );

		GM_setValue( ChallengeSandboxchlgnr + ".tovotetimesince", encodeURIComponent( votetime ) );
		GM_setValue( ChallengeSandboxchlgnr + ".photo1timesince", encodeURIComponent( phototime[ 0 ] ) );
		GM_setValue( ChallengeSandboxchlgnr + ".photo2timesince", encodeURIComponent( phototime[ 1 ] ) );

		update = GM_getValue( "ChallengeSandbox.update" );

		if ( update.match( "true" ) == "true" )
		{
			GM_setValue( "ChallengeSandbox.update", "false" );
			thislocation.replace( "http://www.flickr.com/groups/challengesandbox/discuss/" );
			return;
		}

		//if closed & in voting, let's autocopy winners
		maintext = thisdocument.getElementById( "Main" );
		closedtext = maintext.getElementsByTagName( "p" )[ 0 ].innerHTML;
        var closedtextP = document.evaluate("./p[@class='Focus']", maintext, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var closedtext = "";
        try {
            closedtext = closedtextP.innerHTML;
        } catch (e) {
            // ignore
        }
		var isclosed = false;

		if ( closedtext.match( "This thread has been closed" ) == "This thread has been closed" )
			isclosed = true;

		if ( !isclosed )  //just reset lastwinners if challenge not closed
		{ 
			GM_setValue( "ChallengeSandbox.lastwinner", encodeURIComponent( " " ) );
GM_log( "Clearing last winner: " + decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) );
			GM_setValue( "ChallengeSandbox.lastchallenge", "" );
		}

		if ( ( status.match( "VOTE" ) == "VOTE" ) && ( isclosed ) ) //only process if closed & in vote staus
		{
			GM_setValue( "ChallengeSandbox.lastwinner", encodeURIComponent( " " ) );
GM_log( "Clearing last winner: " + decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) );

			GM_setValue( "ChallengeSandbox.lastchallenge", chlgnr );

			//autocheck votes
			splitvar = "";
			vote1 = "0";
			vote2 = "0";
			if ( lastvote.match( "=" ) == "=" ) splitvar = "=";
			else if ( lastvote.match( " " ) == " " ) splitvar = " ";
			else if ( lastvote.match( "-" ) == "-" ) splitvar = "-";
			else if ( lastvote.match( "." ) == "." ) splitvar = ".";

			//pick up votes
			if ( splitvar != "" )
			{
				vote1 = lastvote.split( splitvar )[ 0 ];
				vote2 = lastvote.split( splitvar )[ 1 ];
			}

			//create the input form
			myform = document.createElement( 'form' ); 
			myform.id = "Medalform";

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

				//fill cell 3
				mytd = mytr.insertCell( 2 ); 
				mytd.innerHTML = "<b>" + photoposter[ 1 ] + ": </b>";

				//fill cell 4
				mytd = mytr.insertCell( 3 );
				mytd = createCheckbox( "C21", "lastwinner", photoposter[ 1 ], " " + " WINNER " + " ", mytd );

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

			if ( ( vote1 == sChallengeSandboxVoteScore ) ) 
			{
				document.getElementById( "C11" ).checked = true;
				GM_setValue( "ChallengeSandbox.lastwinner", encodeURIComponent( photoposter[ 0 ] ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) );
			}

			if ( ( vote2 == sChallengeSandboxVoteScore ) ) 
			{
				document.getElementById( "C21" ).checked = true; 
				GM_setValue( "ChallengeSandbox.lastwinner", encodeURIComponent( photoposter[ 1 ] ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) );
			}


		} // end of if is closed & status vote

		//add headers

		var place = thisdocument.getElementById( "Tertiary" );

		//alert( place.innerHTML );

		//add Challenge Sandbox info
		place.appendChild( thisdocument.createTextNode( ' / ' ) );
		myanchor = thisdocument.createElement( 'a' );
		myanchor.innerHTML = "PG-Info";
		myanchor.id = ChallengeSandboxchlgnr;
		myanchor.href = "#";
		myanchor.setAttribute( 'onClick', 'return false;' );
		myanchor.addEventListener( 'click', function eventclickchallenge( e ) { displaydata( e ); }, false );
		place.appendChild( myanchor );

		return;
	}

	function ProcessDetailDocInline( thread, title )
	{
GM_log( "Here - ProcessDetailDocInline" );

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
				/*if ( inbrackets && ( tds.length > 3 ) ) //happens only in brackets
				{
					votetime = tds[ 2 ].split( "osted " )[ 1 ].split( " ago." )[ 0 ];
					if ( commentcounter != Math.round( commentcounter ) ) // we get this when we overflow to page 2
					{
						commentcounter = Math.round( commentcounter );
						endofbrackets = 1;
					}
				}*/

				// start looping td's from number 3 [2] & fetch all photos
				var i = 0;
				var tdnr = 0;
				var photoposter = new Array( );
				photoposter[ 0 ] = " ";
				photoposter[ 1 ] = " ";
				var phototime = new Array( );
				phototime[ 0 ] = " ";
				phototime[ 1 ] = " ";
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

						if ( txt2.match( "img" ) == "img" && txt2.match( "UCPANG:bump" ) != "UCPANG:bump" )
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

						if ( ( tdnr != i ) && ( ( photonumber == 2 ) || ( status.match( "VOTE" ) == "VOTE" ) ) ) 
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
				if ( ( tdnr < tds.length - 1 ) && ( commentcounter > 3 ) )
				{
					lastvote = lastvote.split( "\n" )[ 0 ];
					lastvote = lastvote.replace( /<br>/, "" ).replace( /\n/,"" ).replace( /&gt;/g, ">" ); //cleanup string
					if ( lastvote.match( "<img" ) == "<img" && lastvote.match( "UCPANG:bump" ) != "UCPANG:bump" )
						lastvote = "no votes"; //capture error lastvote when text comment before last photo

					//.innerHTML.split( " " )[ 1 ].split( " " )[ 0 ];
				} 

				ddphoto1 = photoposter[ 0 ];
				ddphoto2 = photoposter[ 1 ];

				if ( ddphoto1 != " " ) if ( ddwinner.indexOf( ddphoto1 ) != -1 ) chlgstatus = "ERR";
				if ( ddphoto2 != " " ) if ( ddwinner.indexOf( ddphoto2 ) != -1 ) chlgstatus = "ERR";

				// inside challenge - decode last vote if no spaces
				lastvote = detectNoSpaces( lastvote );

				if ( ( ddphoto2 != " " ) && ( status.match( "VOTE" ) != "VOTE" ) )
					chlgstatus = "VOT";
				else
					chlgstatus = "OK";

// rxk change ddphoto3 to ddphoto2 for 2 photos challenge

				ChallengeSandboxchlgnr = "ChallengeSandbox." + chlgnr;
				GM_setValue( ChallengeSandboxchlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
				GM_setValue( ChallengeSandboxchlgnr + ".threadnr", threadnr );
				GM_setValue( ChallengeSandboxchlgnr + ".challengenr", chlgnr );
				GM_setValue( ChallengeSandboxchlgnr + ".commentcounter", commentcounter );
		 		GM_setValue( ChallengeSandboxchlgnr + ".status", encodeURIComponent( status ) );
				GM_setValue( ChallengeSandboxchlgnr + ".winner", encodeURIComponent( winner ) );
				GM_setValue( ChallengeSandboxchlgnr + ".photo1", encodeURIComponent( photoposter[ 0 ] ) );
				GM_setValue( ChallengeSandboxchlgnr + ".photo2", encodeURIComponent( photoposter[ 1 ] ) );
				GM_setValue( ChallengeSandboxchlgnr + ".photovoter", encodeURIComponent( photovoter ) );

				// only tests these when new votes come in (others are cached)
				// have to bodge the string as it may start with a 0 which wont get counted
				lastvote = detectNoSpaces( lastvote );

				GM_setValue( ChallengeSandboxchlgnr+".lastvote", lastvote );
				GM_setValue( ChallengeSandboxchlgnr+".chlgstatus", chlgstatus );
				GM_setValue( "ChallengeSandbox.currentchallenge", chlgnr );

				GM_setValue( ChallengeSandboxchlgnr + ".tovotetime", converttotime( votetime ) );
				GM_setValue( ChallengeSandboxchlgnr + ".photo1time", converttotime( phototime[ 0 ] ) );
				GM_setValue( ChallengeSandboxchlgnr + ".photo2time", converttotime( phototime[ 1 ] ) );

				GM_setValue( ChallengeSandboxchlgnr + ".tovotetimesince", encodeURIComponent( votetime ) );
				GM_setValue( ChallengeSandboxchlgnr + ".photo1timesince", encodeURIComponent( phototime[ 0 ] ) );
				GM_setValue( ChallengeSandboxchlgnr + ".photo2timesince", encodeURIComponent( phototime[ 1 ] ) );

				var anchor = thisdocument.getElementById( thread );
				anchor.innerHTML = chlgstatus;
				anchor.title = lastvote;
				anchor.id = ChallengeSandboxchlgnr;
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

		GM_setValue( "ChallengeSandbox.lastwinner",encodeURIComponent( winner ) );
GM_log( "Setting last winner: " + decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) );

	}

	// *******************
	// End of winner processing
	// *******************

	function Editchallenge( ) //gets called after a page for editing a challenge is opened
	{
		titlearea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'INPUT' )[ 2 ];
		lastwinner = decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) );

		currentchlgnr = GM_getValue( "ChallengeSandbox.currentchallenge" );

		if ( ( titlearea.value.match( "VOTE" ) == "VOTE" ) && ( titlearea.name == "subject" ) && ( lastwinner != " " ) )
		{
			newtxt = "CLOSED (" + lastwinner;
			newtxt = newtxt + ")";
			titlearea.value = titlearea.value.replace( "VOTE", newtxt );
		}

		if ( decodeURIComponent( GM_getValue( "ChallengeSandbox." + currentchlgnr + ".photo2" ) ) != " " )   //rxk previous 3
			if ( titlearea.value.match( "OPEN" ) == "OPEN" )
				titlearea.value = titlearea.value.replace( "OPEN", "VOTE" );
	}

	Editchallengedeltarea = function Editchallengedeltarea( theeditor )
	{
		tas = theeditor.parentNode.getElementsByTagName( 'textarea' );
		theeditor.parentNode.innerHTML = tas[ 1 ].value;
	}

	Editchallengeinline = function Editchallengeinline( link,e ) //initially taken from inline forum edit post by Steeev
	{
		if ( !e )
		{
			var e = window.event;
		}

		e.stopPropagation( );

		ChallengeSandboxmotm = false;
		if ( link.getAttribute( 'href' ).match( "ChallengeSandboxmotm" ) == "ChallengeSandboxmotm" )
			ChallengeSandboxmotm = true;

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

			//Challenge Sandbox admin add ons
			titlearea = topic_title;

			lastwinner = decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) );
			currentchlgnr = GM_getValue( "ChallengeSandbox.currentchallenge" );

			if ( ( titlearea.match( "VOTE" ) == "VOTE" ) && ( lastwinner != " " ) && !ChallengeSandboxmotm )
			{
				newtxt = "CLOSED (" + lastwinner;

				newtxt = newtxt + ")";
				titlearea = titlearea.replace( "VOTE", newtxt );
			}

			if ( decodeURIComponent( GM_getValue( "ChallengeSandbox." + currentchlgnr + ".photo2" ) ) != " " ) //rxk previous 3
				if ( ( titlearea.match( "OPEN" ) == "OPEN" ) && !ChallengeSandboxmotm )
					titlearea = titlearea.replace( "OPEN", "VOTE" );

			topic_title = titlearea;
			//Challenge Sandbox add ons till here

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

		if ( decodeURIComponent( subject ).indexOf( "VOTE" ) != -1 ) 
		{
			GM_setValue( "ChallengeSandbox." + decodeURIComponent( subject ).split( " " )[ 0 ] + ".tovotetime", converttotime( "a moment" ) );

			//GM_setValue( ChallengeSandboxchlgnr + ".tovotetime", converttotime( "Posted 1 second ago." ) );
		}

		return;
	}// end postitbaby function

	// *******************
	// Start of Createnewchallenge
	// *******************

	insertChallengetxt = function insertChallengetxt( )
	{
		t = document.getElementById( 'typelist' );
        var header = GM_getValue("ChallengeSandbox.header." + t.value + ".text");
        this.textarea.innerHTML = "";
        if (header) {
            this.textarea.innerHTML = header;
        }
        var fixedTheme = GM_getValue("ChallengeSandbox.header." + t.value + ".theme");
        if (fixedTheme) {
            this.titlearea.value = fixedTheme;
        } else {
    		this.titlearea.value = GM_getValue( "ChallengeSandbox.lastchallenge" ) + " - OPEN - Theme: "/* + t.options[ t.selectedIndex ].text*/;
            insertChallengetheme();
        }
	}
	
	insertChallengetheme = function insertChallengetheme( )
	{
		t = document.getElementById( 'themeselect' );
		var sThemeString = t.options[ t.selectedIndex ].text;
		this.titlearea.value = this.titlearea.value.split( "Theme:" )[ 0 ] + "Theme: " + sThemeString;

		//this.textarea.value = GM_getValue( "ChallengeSandbox.Gamechlgheader" );

		// replace winner
//rxk			this.textarea.value = this.textarea.value.replace( "Previous Winner", decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) );
	}


	Createnewchallenge = function Createnewchallenge( )
	{
		//myWindow = window.open( '', 'Log page', 'top=50, left=100, width=800, height=600, scrollbars=yes, resizable = yes' )
		//myWindow.document.open( "text/html", "replace" );
		//myWindow.document.write( "<P><h1>Challenge Sandbox Admin tool log</h1></p>" );

		themelist = GM_getValue( "ChallengeSandbox.themelist" );
		if ( themelist != "" )
			challengethemeval = themelist.split( "||" );

        if (challengethemeval == undefined) {
            alert('no theme data available\nhave you run the "Initialize data" script?"');
        }

		//myWindow.document.write( "<p>"+themelist+"</p>" );

		var activethemeval = new Array( );
		activethemes = decodeURIComponent( GM_getValue( "ChallengeSandbox.activethemes" ) );
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

		lastchallenge = GM_getValue( "ChallengeSandbox.lastchallenge" );

		//check if variables are filled in + alert
//rxk
/*		if ( decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) == " " )
		{
			if ( lastchallenge == "" )
				alert( "No last challenge found: \nplease fill in challenge number \nand winner name or medals player names" ); 
			else
				alert( "Please fill in winner name" );
		}
*/
		//start inserting pull down lists
		this.textarea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'TEXTAREA' )[ 0 ];
		var typeList = document.createElement( 'SELECT' );
        typeList.id = 'typelist';

		this.titlearea = document.getElementById( 'GoodStuff' ).getElementsByTagName( 'INPUT' )[ 3 ];
		var themeList = document.createElement( 'SELECT' );

		typeList.addEventListener( 'change', function eventchangeinsertchallengetheme( e ){ insertChallengetxt( ); }, false );
		themeList.addEventListener( 'change', function eventchangeinsertchallengetheme( e ){ insertChallengetheme( ); }, false );

        var challengeOption = document.createElement( 'option' ); // first is empty
        challengeOption.value = 0;
        typeList.appendChild(challengeOption);
        for (var i = 1; i <= nHeaders; ++i) { // 1-based
            var challengeOption = document.createElement( 'option' );
            challengeOption.value = i; // 0 is the empty one
            var title = GM_getValue("ChallengeSandbox.header." + i + ".title");
            challengeOption.appendChild(document.createTextNode(title));

            typeList.appendChild(challengeOption);
        }


		themeList.innerHTML = '';
		themeList.id = 'themeselect';

		for ( i = 0; i < challengethemeval.length; i++ )
		{
			themeList.innerHTML = themeList.innerHTML + '<option value="' + i + ">" + challengethemeval[ i ] + '</option>';
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
		themeList.value = sRand;
*/
		//start filling up textarea
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
		this.textarea.parentNode.insertBefore( document.createTextNode( 'Challenge Sandbox challenge type: ' ), this.textarea );
		this.textarea.parentNode.insertBefore( typeList, this.textarea );
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );
		this.textarea.parentNode.insertBefore( document.createElement( "br" ), this.textarea );

		challengetxtnode = typeList;

		//replace winner name
//rxk
/*		if ( decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) != " " )
		{
			if ( challengetxtnode.value == 1 )
				this.textarea.value = this.textarea.value.replace( "winner", decodeURIComponent( GM_getValue( "ChallengeSandbox.lastwinner" ) ) );
		}
*/		
		//start filling up textarea
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createTextNode( 'Challenge Sandbox theme: ' ), this.titlearea );
		this.titlearea.parentNode.insertBefore( themeList, this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );
		this.titlearea.parentNode.insertBefore( document.createElement( "br" ), this.titlearea );

		this.titlearea.value = lastchallenge + " - OPEN - Theme: [select from list]";

		insertChallengetheme( );
	}

	// *******************
	//  End of Createnewchallenge
	// *******************

  function sendAdminInvite (groupid,photoid) {
    var magicCookie = getJSVariable(/auth_hash[ :]+\'([^\']+)\'/);
    var listener = {
      flickr_groups_invite_photo_invite_onLoad: function(success, responseXML, responseText, params){
        if(success){
          frag_url = 'http://www.flickr.com/photo_group_invites_fragment.gne?id='+photoid+'&cachebust='+(new Date()).getTime();
    	  	GM_xmlhttpRequest({
						method:"GET",
						url:frag_url,
						onload:function (response) {
							console.log(response);
							document.getElementById('invites').setAttribute('class','');
							document.getElementById('invites').innerHTML=response.responseText;
						}
					});
    		}else{
   	    }
      }
    };    
    apiCall('flickr.groups.invite.photo.invite', {group_id:groupid,photo_id:photoid, auth_hash:magicCookie }, listener);  
  }
  
  function apiCall (apimethod, params , callback) {
    var self = this;
    var argstring = '';
    var key = getJSVariable(/api_key[ :]+\'([^\']+)\'/);
    var callbackstring = apimethod.replace(/\./g,'_');
    callbackstring += '_onLoad';
    for (var arg in params) {
      argstring += '&'+arg+'='+params[arg];
    }
    url = 'http://www.flickr.com/services/rest/?method='+apimethod+argstring+'&api_key='+key;
    GM_xmlhttpRequest({
		  method:"GET",
		  url:url,
		  onload:function (response) {
			  var doc=(new DOMParser).parseFromString(response.responseText, "text/xml");
			  status_elem = doc.getElementsByTagName('rsp')[0];
			  status = status_elem.getAttribute('stat') == 'ok'? 1 : 0;
			  callback[callbackstring](status,doc,response.responseText,null);
		  }
	  });
  }

  function getJSVariable (regex) {
    // Adapted from Alesa Dam's key-extraction function
    // CAREFUL - this is a truncated version, it's ony meant to
    // work on photopages. Do not use this elsewhere, it will break.
    var retval;
    var scripttags = document.getElementsByTagName('script');
    for (i=0;i<scripttags.length;i++) {
      if (retval != undefined) {
        return;
      }
      var html = scripttags[i].innerHTML;
      try {
        retval = html.match(regex)[1];
      } catch (e) {
      }
    }
    return retval;
  }
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

		ChallengeSandboxchlgnr = "ChallengeSandbox." + chlgnr;

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

					if ( txt2.match( "img" ) == "img" && txt2.match( "UCPANG:bump" ) != "UCPANG:bump" )
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

			GM_setValue( ChallengeSandboxchlgnr + ".startdate", encodeURIComponent( challengeopendate ) );
			GM_setValue( ChallengeSandboxchlgnr + ".threadnr", threadnr );
			GM_setValue( ChallengeSandboxchlgnr + ".challengenr", chlgnr );
			GM_setValue( ChallengeSandboxchlgnr + ".commentcounter", commentcounter );
			GM_setValue( ChallengeSandboxchlgnr + ".status", encodeURIComponent( status ) );
			GM_setValue( ChallengeSandboxchlgnr + ".photo1", encodeURIComponent( photoposter ) );
			GM_setValue( ChallengeSandboxchlgnr + ".photovoter", encodeURIComponent( photovoter ) );
			GM_setValue( "ChallengeSandbox.currentchallenge", chlgnr );

			//add headers

			var place = thisdocument.getElementById( "Tertiary" );

			//alert( place.innerHTML );

			//add Challenge Sandbox info
			place.appendChild( thisdocument.createTextNode( ' / ' ) );
			myanchor = thisdocument.createElement( 'a' );
			myanchor.innerHTML = "PG-Info";
			myanchor.id = ChallengeSandboxchlgnr;
			myanchor.href = "#";
			myanchor.setAttribute( 'onClick', 'return false;' );
			myanchor.addEventListener( 'click', function eventclickchallenge( e ){ displayplatinumdata( e ); }, false );
			place.appendChild( myanchor );

		}

		return;
	}

	runChallengeSandboxTool = function runChallengeSandboxTool( )
	{
		// check if we have GM variables
		if ( GM_getValue( "ChallengeSandbox.version" ) == undefined )
			initdata( );
	
		if ( GM_getValue( "ChallengeSandbox.version" ) != ChallengeSandboxtoolversion )
			initdata( );

		// check themelist & chlgheaders

		themelisttime = GM_getValue( "ChallengeSandbox.themelisttime" );
		if ( ( themelisttime == undefined ) || ( themelisttime == "" ) ) 
		{
			loadthemelist( );
			loadchlgheader( );
            loadmedals( );
		}  
		themelisttime = GM_getValue( "ChallengeSandbox.themelisttime" );
		elapstime = ChallengeSandboxStartTime.getTime( ) - themelisttime;
		if ( elapstime > 1000 * 60 * 60 * 24 ) 
		{
			loadthemelist( );
			loadchlgheader( );
            loadmedals( );
		}  

		if (GM_getValue("ChallengeSandbox.brackets")!="false")
		{
			GM_setValue("ChallengeSandbox.brackets","false"); //reset brackets status when we start
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
			// in Challenge Sandbox platinum for brackets qualifying.
			if ( thisdocument.title.split( " " )[ 1 ] == "Discussing")
			{
				// ***********
				// detail page
				// ***********
				ProcessPlatinumDetailDoc( );
			}
		}
		else if ( thisdocument.title.match( "discussion topics" ) == "discussion topics" )
		{
			// ************************
			// main photo Challenge Sandbox page
			// ************************
			//alert( "in main" );
			ProcessMainDoc( );
		}
		else if ( thisdocument.title.split( " " )[ 1 ] == "Discussing" )
		{
			// ***********
			// detail page
			// ***********
			//alert( "in detail" );
	
			ProcessDetailDoc( );
		}
		else if ( thislocation == "http://www.flickr.com/groups_newtopic.gne?id=1515341@N25" )
		{
			Createnewchallenge( );
		}
		else if ( thislocation.href.match( "/edit/" ) == "/edit/" )
		{
			Editchallenge( );
		}
	
		addChallengeSandboxheader( );
	
		GM_registerMenuCommand( "Initialise Challenge Sandbox Admin data (themes, headers, ...)", initdatafrommenu );
	}


	// *******************
	// Start of processing
	// *******************

	if ( window.name == 'Log page' )
		return; //don't process log page

	var thislocation = location;
	var thisdocument = document;
	var discusstrs;

	runChallengeSandboxTool( );

	return;

	// *******************
	//  End of processing
	// *******************

} )( );
