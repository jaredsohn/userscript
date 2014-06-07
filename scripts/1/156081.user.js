// ==UserScript==
// @name           Quake Live AutoInvite
// @version        0.101
// @namespace      https://github.com/rulex/ql-autoinvite
// @author         https://github.com/rulex/
// @description    Quake Live Greasemonkey script to auto invite friends to your current game when they come online.
// @include        http://*.quakelive.com/*
// ==/UserScript==

//Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval( source ) {
    if( "function" == typeof( source ) ) {
        source = "(" + source + ")();";
    }
    // Create a script node holding this source code.
    var script = document.createElement( "script" );
    script.setAttribute( "type", "application/javascript" );
    script.textContent = source;
    document.body.appendChild( script );
    document.body.removeChild( script );
}

contentEval( function() {
    var oldOnCvarChanged = OnCvarChanged;
    OnCvarChanged = function( name, val, replicate ) {
        switch( name ) {
            case "cg_lastmsg":
                var nick, msg;
                // user coming online
                if( val.match( /^<QUAKE LIVE> (.*) is now online.$/ ) ) {
                    nick = val.replace( /^<QUAKE LIVE> (.*) is now online.$/, "$1" );
                    nick = nick.replace( /\^[0-9]/g, "" );
                    if( quakelive.cvars.Get( "_ql_autoinvite" ).value == "1" ) {
                        jQuery.ajax( {
                            url: '/request/invite',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                user: nick,
                                server_id: quakelive.currentServerId
                            },
                            success: function( data ) {
								// if data.ECODE == 0
                                qz_instance.SendGameCommand( "print Inviting " + nick + ";" );
                                qz_instance.SendGameCommand( "echo Inviting " + nick + ";" );
                            }
                        } );
                    }
                }
                // user msg
				var reg_msg = /^<QUAKE LIVE> \[(.*)\]: (.*)$/;
                if( val.toLowerCase().indexOf( reg ) != -1 ) {
                    nick = val.replace( reg, "$1" );
                    msg = val.replace( reg, "$2" );
                    if( quakelive.cvars.Get( "_ql_chatinvite" ).value == "1" ) {
                        jQuery.ajax( {
                            url: '/request/invite',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                user: nick,
                                server_id: quakelive.currentServerId
                            },
                            success: function( data ) {
								// if data.ECODE == 0
                                qz_instance.SendGameCommand( "print Inviting " + nick + ";" );
                                qz_instance.SendGameCommand( "echo Inviting " + nick + ";" );
                            }
                        } );
                    }
				}
                break;
        }
        oldOnCvarChanged.call( null, name, val, replicate );
    }
} );


