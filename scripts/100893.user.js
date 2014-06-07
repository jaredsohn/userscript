// ==UserScript==
// @name        Ikariam Inbox Sorter
// @version     1.0
// @copyright   2010, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Displays current level of wine in each town
// @include     http://s*.ikariam.*/*
// @exclude     http://support.ikariam.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @history 1.0 Basic version with minor updates
// ==/UserScript==

// Read messages from inbox view and store unread messages in GM
// display all message categories in GM with count of messages
// user can click on category and unread messages will be displayed
// user clicks on unread message and it is displayed and removed from
//  GM memory

// provide buttons:
// - purge all messages
// - purge all messages in category
// - make message static (stays in GM)

// default categories (provide button on Compose page)
// - SPAM, CT, PM, WAR, URGENT

// Subjects:
// Message
// Circular Message - Alliance
// Remove players from friend list


$( document ).ready( function(){
	function log( msg )
	{
		GM_log( msg );
	}

	var host = window.location.host;
	var hostparts = host.split( "." );
	host = hostparts[ 0 ] + "." + hostparts[ 1 ];
	var gm_messages = "ikainbox_" + host + "_messages";
	var gm_allyId = "ikainbox_" + host + "_allyId";
	var gm_custom_cats = "ikainbox_" + host + "_custom_cats";
    var actionRequest = "";
    var allyId = "";
    var newMsgFound = 0;

    var messages = new Array();


    var Message = function(){
        this.id = "";
        this.from = ""; // username
        this.fromid = 0; // userid
        this.subject = "";
        this.town = "";
        this.date = "";
        this.category = "";
        this.sticky   = 0;
        this.content  = "";
        this.isNew   = 0;

        this.pickle = function()
        {
            this.content = this.content.replace( "|", "\|" );
            return this.id + "|" + 
                   this.from + "|" + 
                   this.fromid + "|" + 
                   this.subject + "|" + 
                   this.town + "|" + 
                   this.date + "|" + 
                   this.category + "|" + 
                   this.sticky + "|" + 
                   this.content;
        }

        this.unpickle = function( s )
        {
            var split = s.split( "|", 8 );
            this.id = split[ 0 ];
            this.from = split[ 1 ];
            this.fromid = split[ 2 ];
            this.subject = split[ 3 ];
            this.town = split[ 4 ];
            this.date = split[ 5 ];
            this.category = split[ 6 ];
            this.sticky = parseInt( split[ 7 ] );
            this.isNew = 1;
            this.content = s.replace( 
                this.id + "|" + 
                this.from + "|" +
                this.fromid + "|" +
                this.subject + "|" +
                this.town + "|" +
                this.date + "|" + 
                this.category + "|" + 
                this.sticky + "|", "" );
        }
    }

    function save()
    {
        var strout = new Array();
        for( var i = 0; i < messages.length; i++ )
        {
            if( messages[ i ].isNew )
            {
                strout.push( messages[ i ].pickle() );
            }
        }
        GM_setValue( gm_messages, strout.join( ";;;" ) );
    }

    function load()
    {
        messages = new Array();
        var str = GM_getValue( gm_messages, "" );
        if( str != "" )
        {
            var split = str.split( ";;;" );
            for( var i = 0; i < split.length; i++ )
            {
                var s = split[ i ];
                var m = new Message();
                m.unpickle( s );
                messages.push( m );
            }
        }

        allyId = GM_getValue( gm_allyId, "" );
    }

    load();


	function isPage( match )
	{
		var href = window.location.search.substring(1);
		return href.indexOf( match ) >= 0;
	}

    unsafeWindow.ikainboxMarkAsRead = function(mid, funcname) {
        var newClass = 'entry globalmessage';
        if (!funcname) { funcname = 'markMessageAsRead'; newClass = 'entry'; }
        callback = null;
        sUrl = '?action=Messages&function='+funcname+'&id='+ mid;
        unsafeWindow.ajaxSendUrl(sUrl);
        document.getElementById('tbl_message'+mid).className=newClass;

        for( var i = 0; i < messages.length; i++ )
        {
            if( messages[ i ].id == mid )
                messages[ i ].isNew = 0;
        }
    }


    function msg2rows( m )
    {
        var clazz = 'entry';
        if( m.isNew ) clazz += ' new';
        var mrows = "";
        mrows += "<tr id='tbl_message" + m.id + "' class='" + clazz + "' bgcolor='#fdf7dd' onclick='ikainboxMarkAsRead(" + m.id + ");' onmouseout='this.bgColor=\"#fdf7dd\"' onmouseover='this.bgColor=\"ecd5ac\"' style='display:none;'>";
        mrows += "<td><input type='checkbox' value='unread' name='deleteId[" + m.id + "]'></td>";
        var td = "<td onclick=\"show_hide_menus('mail" + m.id + "'); show_hide_menus('reply" + m.id + "'); imgtoggle(getElementById('button" + m.id + "'));\">";
        mrows += td;
        mrows += "<img id='button" + m.id + "' class='open' src='skin/layout/down-arrow.gif' name='button" + m.id + "' alt=''/>";
        mrows += "</td>";

        mrows += td;
        mrows += "<a href='#'>" + m.from + "</a>";
        mrows += "</td>";

        mrows += "<td class='subject' onclick=\"show_hide_menus('mail" + m.id + "'); show_hide_menus('reply" + m.id + "'); imgtoggle(getElementById('button" + m.id + "'));\">";
        mrows += m.subject;
        mrows += "</td>";

        mrows += td;
        mrows += m.town;
        mrows += "</td>";

        mrows += td;
        mrows += m.date;
        mrows += "</td>";

        mrows += "</tr>";

        // tbl_mail
        mrows += "<tr id='tbl_mail" + m.id + "' class='text' style='display:none;'>";
        mrows += "<td class='msgText' colspan='6'>";
        mrows += "<div style='overflow: auto; width: 100%'>";
        mrows += m.content.replace( "\n", "<br>" );
        mrows += "</div>";
        mrows += "</td>";
        mrows += "</tr>";

        // tbl_reply
        mrows += "<tr id='tbl_reply" + m.id + "' class='text' style='display:none;'>";
        mrows += "<td class='reply' colspan='6'>";
        mrows += "<span style='float: left; padding: 5px; margin-left: 5px;'>";
        mrows += "<a class='button' href='?view=sendIKMessage&receiverId=" + m.fromid + "&replyTo=" + m.id + "'>Answer</a>";
        if( actionRequest != "" )
        {
            mrows += "<a class='button' href='?action=Messages&function=markAsDeletedByReceiver&id=" + m.id + "&actionRequest=" + actionRequest + "'>Delete</a>";
            mrows += "<a class='button' onclick='return(confirm(\'This function forwards insults and offences to the Game-Operator.  Do you really want to forward this message to the GO?\'))' title='This function forwards insults and offences to the Game-Operator.  Do you really want to forward this message to the GO?' href='?action=Messages&function=forwardToGameOperator&actionRequest=" + actionRequest + "&id=" + m.id + "'>report</a>";
        }
        if( allyId != "" )
        {
            mrows += "<a class='button' href='?view=sendIKMessage&msgType=51&allyId=" + allyId + "&replyTo=" + m.id + "'>Circular Reply</a>";
        }
        mrows += "</span>";
        mrows += "<span style='float: right; padding: 5px; margin-right: 5px;'>";
        // add in archive button
        mrows += "<a class='button' href='?action=Premium&function=archiveReport&id=" + m.id + "&type=3&actionRequest=" + actionRequest + "'>Save in archive</a>";
        mrows += "&nbsp;(";
        mrows += "<span class='costAmbrosia' style=\"padding-top: 5px; padding-bottom: 5px; font-weight: bold; padding-right: 22px; background-image: url('skin/premium/ambrosia_icon.gif'); background-repeat: no-repeat; background-position: 100% 50%;\">1</span>";
        mrows += ")";
        mrows += "</span>";
        mrows += "</td>";
        mrows += "</tr>";
        return mrows;
    }

    // if Game options page
    if( isPage( "view=options" ) && isPage( "page=game" ) )
    {
        var custom_cats = GM_getValue( gm_custom_cats, "" );
        var div = "<div class='contentBox01h'>";
        div += "<h3 class='header'>Inbox Organizer</h3>";
        div += "<div class='content'>";
        div += "<div>";
        div += "<table>";
        div += "<tr>";
        div += "<th>Custom Categories</th>";
        div += "<td><input id='ikainbox_custom_cats' type='text' style='width: 150px;' value='" + custom_cats + "'/></td>";
        div += "</tr>";
        div += "<tr>";
        div += "<td colspan='2'><center><input id='ikainbox_save' type='button' class='button' value='Save Settings'/></center></td>";
        div += "</tr>";
        div += "</table>";
        div += "</div>";
        div += "<div id='ikainbox_settings_display'></div>";
        div += "</div>";
        div += "<div class='footer'></div>";
        $( div ).insertBefore( "#vacationMode" );

        $( "#ikainbox_save" ).click( function(){
            var cats = $( "#ikainbox_custom_cats" ).val();
            GM_setValue( gm_custom_cats, cats );
            $( "#ikainbox_settings_display" ).html( "<center>Settings Saved</center>" );
        });
    }

    // if compose page, add in buttons
    if( isPage( "view=sendIKMessage" ) )
    {
        var addsubject = function( subject ){
            var txt = $( "#text" ).text();
            $( "#text" ).html( "[" + subject + "]\n" + txt );
        }

        var div = "<div id='ikainbox_subject'>";
        div += "<span>";
        div += "<input class='button' type='button' id='ikainbox_CT' value='CT'/>";
        div += "<input class='button' type='button' id='ikainbox_Friend' value='Friend List'/>";
        div += "<input class='button' type='button' id='ikainbox_SPAM' value='Spam'/>";
        div += "<input class='button' type='button' id='ikainbox_War' value='War'/>";
        div += "<input class='button' type='button' id='ikainbox_Custom' value='Custom'/>";
        div += "</span>";

        var custom_cats = GM_getValue( gm_custom_cats, "" );
        if( custom_cats != "" )
        {
            div += "<br><span>";
            var split = custom_cats.split( "," );
            for( var i = 0; i < split.length; i++ )
            {
                var cat = jQuery.trim( split[ i ] );
                if( cat != "" )
                {
                    div += "<input class='button' type='button' id='ikainbox_" + cat + "' value='" + cat + "'/>";
                }
            }
        }
        div += "</span>";
        div += "</div>";
        $( div ).insertAfter( "#mailSubject" );


        $( "#ikainbox_CT" ).click( function(){ addsubject( "CT" ); } );
        $( "#ikainbox_SPAM" ).click( function(){ addsubject( "Spam" ); } );
        $( "#ikainbox_Friend" ).click( function(){ addsubject( "Friend" ); } );
        $( "#ikainbox_War" ).click( function(){ addsubject( "War" ); } );
        $( "#ikainbox_Custom" ).click( function(){ addsubject( "**put your subject here**" ); } );
        if( custom_cats != "" )
        {
            var split = custom_cats.split( "," );
            for( var i = 0; i < split.length; i++ )
            {
                var cat = jQuery.trim( split[ i ] );
                if( cat != "" )
                {
                    $( "#ikainbox_" + cat ).click( function(){ addsubject( $(this).attr("id").replace( "ikainbox_", "" ) ); } );
                }
            }
        }
    }

	// extract new info from webpage
    if( isPage( "view=diplomacyAdvisorAlly" ) && allyId == "" )
    {
        var href = $( "#allyinfo tr:last td:last a" ).attr( "href" );
        var idxof = href.indexOf( "allyId=" );
        if( idxof >= 0 )
        {
            allyId = href.substring( idxof + 7 );
            GM_setValue( gm_allyId, allyId );
        }
    }


    if( isPage( "view=diplomacyAdvisor" ) && 
        !isPage( "view=diplomacyAdvisorAlly" ) && 
        !isPage( "view=diplomacyAdvisorTreaty" ) && 
        !isPage( "view=diplomacyAdvisorOutBox" ) )
    {
        var msgtable = $( "#messages" );
        var entries = $( "tr.entry", msgtable );
        for( var i = 0; i < entries.length; i++ )
        {
            var g = false; // global message
            var isNew = 0;
            if( entries.eq( i ).hasClass( "new" ) )
            {
                isNew = 1;
                newMsgFound = 1;
            }
            var id = entries.eq( i ).attr( "id" );
            if( id.indexOf( 'g' ) === 0 )
            {
                var idnum = id.replace( "gmessage", "" );
                g = true;
            }
            else
                var idnum = id.replace( "message", "" );
            var from = $( "td", entries.eq( i ) ).eq( 2 ).text();
            var subject = $( "td", entries.eq( i ) ).eq( 3 ).text();
            var town = $( "td", entries.eq( i ) ).eq( 4 ).text();
            var date = $( "td:last", entries.eq( i ) ).text();
            var category = "";
            if( g )
            {
                var content = $( "#tbl_gmail" + idnum + " td div" ).html();
            }
            else
            {
                var content = $( "#tbl_mail" + idnum + " td div" ).html();
            }

            if( !g )
            {
                var href = $( "#tbl_reply" + idnum + " td span a:first" ).attr( "href" );
                var idx = href.indexOf( "receiverId=" );
                if( idx >= 0 )
                {
                    var endidx = href.indexOf( "&", idx + 1 );
                    var fromid = href.substring( idx + 11, endidx );
                }
                else
                    var fromid = 0;

                href = $( "#tbl_reply" + idnum + " td span a" ).eq( 1 ).attr( "href" );
                idx = href.indexOf( "actionRequest=" );
                if( idx >= 0 )
                {
                    actionRequest = href.substring( idx + 14 );
                }
            }

            if( content.indexOf( "[" ) == 0 )
            {
                var endindex = content.indexOf( "]", 1 );
                if( endindex >= 0 )
                {
                    category = content.substring( 1, endindex );
                }
            }

            if( content != null )
            {
                content = content.replace( "<br>", "\n" );
                content = content.replace( "<br/>", "\n" );
            }

            subject = jQuery.trim( subject );

            if( subject == "Message" )
                category = "PM";
            else if( g )
                category = "Ikariam";
            else if( subject == "Remove players from friend list" )
                category = "Friend List";
            else if( subject == "Accept cultural treaty" )
                category = "CT";
            else
                category = "MISC";

            var m = new Message();
            m.isNew = isNew;
            m.id = jQuery.trim( idnum );
            m.from = jQuery.trim( from );
            m.fromid = fromid;
            m.subject = jQuery.trim( subject );
            m.date = jQuery.trim( date );
            m.category = jQuery.trim( category );
            m.content = jQuery.trim( content );

            var found = false;
            for( var j = 0; j < messages.length; j++ )
            {
                if( messages[ j ].id == idnum )
                {
                    found = true;
                    break;
                }
            }
            if( !found )
            {
                messages.push( m );
            }

            subject = "";
        }

        $(window).unload( function(){ save(); } );


        // display categories
        var allCats = new Array();
        for( var i = 0; i < messages.length; i++ )
        {
            var found = false;
            for( var j = 0; j < allCats.length; j++ )
            {
                if( messages[ i ].category == allCats[ j ] )
                {
                    found = true;
                    break;
                }
            }
            if( !found && messages[ i ].category != "" )
            {
                allCats.push( messages[ i ].category );
            }
        }

        // group messages into categories
        var catMsgs = new Array();
        for( var i = 0; i < allCats.length; i++ )
        {
            var cat = allCats[ i ];
            catMsgs[ cat ] = new Array();
            for( var j = 0; j < messages.length; j++ )
            {
                if( messages[ j ].category == cat )
                {
                    catMsgs[ cat ].push( messages[ j ] );
                }
            }
        }

        var tbody = "";
        if( !newMsgFound )
        {
            tbody += "<tr>";
            tbody += "<td colspan='3' style='font-size: 12pt'><b>No new messages found</b></td>";
            tbody += "<td colspan='3'></td>";
            tbody += "</tr>";
        }
        for( var i = 0 ; i < allCats.length; i++ )
        {
            var cat = allCats[ i ];
            var msgs = catMsgs[ cat ];

            tbody += "<tr id='cat" + cat + "' class='entry ikainbox_category' bgcolor='#fdf7dd' onmouseout='this.bgColor=\"#fdf7dd\"' onmouseover='this.bgColor=\"ecd5ac\"'>";
            var catrow = "<td colspan='3' onclick=\"";

            var numnew = 0;
            var rows = "";
            for( var j = 0; j < msgs.length; j++ )
            {
                if( msgs[ j ].isNew ) numnew += 1;
                catrow += "show_hide_menus('message" + msgs[ j ].id + "');";
                rows += msg2rows( msgs[ j ] );
            }
            catrow += "\">";
            tbody += catrow + "<span style='font-size: 14pt; font-weight: bold;'>" + cat + ": " + msgs.length + " (" + numnew + ")</span></td>";
            tbody += catrow + "</td>";
            tbody += "</tr>";
            tbody += rows;
        }

        // remove existing entries
        $( '.table01 tr[id^="gmessage"]' ).remove();
        $( '.table01 tr[id^="message"]' ).remove();
        $( '.table01 tr[id^="tbl_gmail"]' ).remove();
        $( '.table01 tr[id^="tbl_mail"]' ).remove();
        $( '.table01 tr[id^="tbl_greply"]' ).remove();
        $( '.table01 tr[id^="tbl_reply"]' ).remove();

        // add in new entries
        $( tbody ).insertAfter( ".table01 tr:first" );

        GM_addStyle( ".table01 td.ikainbox_category{ text-align: left; }" );
    }
});

