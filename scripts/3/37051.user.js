// Enhanced World of Warcraft Forums
// version 1.2.1
// 2008-11-22
// Copyright (c) 2008, Kurt Schwarz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Enhanced World of Warcraft Forums", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Enhanced World of Warcraft Forums
// @namespace     N/A
// @description   Improves the World of Warcraft forums
// @include       http://forums.worldofwarcraft.com/*
// ==/UserScript==

eWF = {
    currentVersion : '1.2.1',
    knownKeyloggers: "(mmoworldofwar.com|warcraftm0vies.com|mmo-wow.com|hebwow.com|mmosgame.com|wowttb.com|MM0-Champion.net)",
    
    init: function( ) {
        var curURL = window.location.href;
        var regExp = new RegExp( 'http://forums.worldofwarcraft.com/thread.html(.*?)', 'i' );
        
        eWFOptions.loadValues( );
        
        if ( regExp.test( curURL ) ) {
            eWF.capturePostMessages( );
        }
    },
    
    capturePostMessages: function( ) {
        var blankRegExp = new RegExp( "([\t]{2,})" ),
            lastPostID  = eWF.getPostIDs( document.getElementById( "postbackground" ) );
        
        var lastUsed = '1';
        for ( var countA in lastPostID ) {
            postContent = document.getElementById( "postbody" + lastUsed + "1" ).lastChild;
            postMessage = postContent.getElementsByTagName( "span" );
            postMessage = postMessage[0].innerHTML;
            postMessage = postMessage.toString( );
            postContent = document.getElementById( "postbody" + lastUsed + "1" );
            regExp = new RegExp( eWF.knownKeyloggers, "g" );
            
            if ( regExp.test( postMessage ) ) {
                postContent.innerHTML = '<div style="width: 26px; float: left" title="Shhhhhh... Talking time is over."><div style="width: 26px; height: 26px; position: relative"><div style="position: absolute; z-index: 10000; width: 26px; height: 26px; background: url( http://static.wowhead.com/images/icon_border_small.png ) no-repeat"></div><img style="margin: 4px" src="http://static.wowhead.com/images/icons/small/spell_holy_silence.jpg" /></div></div></div>';
            }
            
            /**
                Zombie Mode
            **/
            
            if ( eWFOptions.curOptions.zombie.status == 'on' ) {
                avatarObj = document.getElementById( "avatar" + lastUsed + "1" );
                avatarObjShell = avatarObj.firstChild.nextSibling;
                avatarObjFrame = avatarObjShell.lastChild.previousSibling;
                avatarObjLvL   = avatarObjShell.nextSibling.nextSibling.nextSibling.firstChild.nextSibling;
                
                eWF.zombieMode( avatarObj );
                avatarObj.setAttribute( "id", "avatar" + lastUsed + "1" + lastPostID[ countA ] );
                avatarObj.style.margin    = '0 auto';
                avatarObj.style.textAlign = 'center';
                avatarObj.style.width     = '200px';
                
                avatarObjShell.style.height   = '64px';
                avatarObjShell.style.margin   = '10px auto';
                avatarObjShell.style.position = 'relative';
                avatarObjShell.style.width    = '64px';
                
                avatarObjFrame.style.background = 'transparent url(/images/portrait-frame.gif) no-repeat scroll 0 0';
                avatarObjFrame.style.height     = '83px';
                avatarObjFrame.style.left       = '-8px';
                avatarObjFrame.style.position   = 'absolute';
                avatarObjFrame.style.top        = '-8px';
                avatarObjFrame.style.width      = '82px';
                avatarObjFrame.style.zIndex     = '200';
                
                avatarObjLvL.style.color = '#FFD823';
                avatarObjLvL.style.position = 'absolute';
                avatarObjLvL.style.right = '61px';
                avatarObjLvL.style.textAlign = 'center';
                avatarObjLvL.style.top = '-22px';
                avatarObjLvL.style.width = '24px';
                avatarObjLvL.style.zIndex = '300';
            }
            
            /**
                End Zombie Mode
            **/
            
            postContent.setAttribute( "id", "postbody" + lastUsed + "1" + lastPostID[ countA ] );
            postContent.style.height  = "130px";
            postContent.style.margin  = "0";
            postContent.style.padding = "0";
            postContent.style.width   = "90%";
            
            lastUsed = ( lastUsed == '1' ? '2' : '1' );
        }
    },
    
    getPostIDs: function( oNode ) {
        var oNode,
            arrElements       = oNode.getElementsByTagName( "a" ),
            arrReturnElements = new Array( ),
            oRegExp = new RegExp( "(^|\\s)([0-9]{1,2})(\\s|$)" ),
            oElement;
        
        for( var i = 0; i < arrElements.length; i++ ) {
            oElement = arrElements[i];     
            
            if ( oElement.hasAttribute( "name" ) ) {
                if( oRegExp.test( oElement.name ) ) {
                    arrReturnElements.push( oElement.name );
                }
            }
        }
        
        return ( arrReturnElements );
    },
    
    zombieMode: function( avatarShellObj ) {
        var avatarShellObj, avatarTDObj;
        avatarShellTD = avatarShellObj.getElementsByTagName( "td" );
        avatarShellTD[0].style.background = 'url( /images/bc/portraits/halloween/wow/character.gif )';
    }
};

eWFOptions = {
    curOptions: { zombie: { status: '' } },
    optPanBuilt: false,
    
    init: function( ) {
        eWFOptions.buildOptionsToggle( );
    },
    
    loadValues: function( ) {
        eWFOptions.curOptions.zombie.status = GM_getValue( 'eWFZombieOpt', 'off' );
    },
    
    toggleOptions: function( imgObj, status ) {
        var imgObj, status;
        
        if ( status == 'on' ) {
            imgObj.addEventListener( 'click', function( ) { eWFOptions.toggleOptions( this, 'off' ); }, false );
            
            if ( eWFOptions.optPanBuilt == true ) {
                document.getElementById( 'eWFUpdateCont' ).style.display = 'none';
            } else {
                eWFOptions.buildOptionsPanel( );
            }
        } else if ( status == 'off' ) {
            document.getElementById( 'eWFUpdateCont' ).style.display = 'block';
            imgObj.addEventListener( 'click', function( ) { eWFOptions.toggleOptions( this, 'on' ); }, false );
        }
    },
    
    toggleZombies: function ( divObj, status ) {
        var divObj, status, spanObj = document.getElementById( 'eWFHTMLOptionsZombieOptStatusText' );
        
        if ( status == 'on' ) {
            spanObj.style.color = "#b1ffad";
            spanObj.textContent = ' (Enabled)';
            
            GM_setValue( 'eWFZombieOpt', 'on' );
            eWFOptions.curOptions.zombie.status = 'on';
            divObj.addEventListener( 'click', function( ) { eWFOptions.toggleZombies( this, 'off' ); }, false );
        } else if ( status == 'off' ) {
            spanObj.style.color = "#ffadad";
            spanObj.textContent = ' (Disabled)';
            
            GM_setValue( 'eWFZombieOpt', 'off' );
            eWFOptions.curOptions.zombie.status = 'off';
            divObj.addEventListener( 'click', function( ) { eWFOptions.toggleZombies( this, 'on' ); }, false );
        }
        
        location.reload( true );
    },
    
    buildOptionsToggle: function( ) {
        htmlStructBody = document.getElementsByTagName( 'body' );
        htmlStructOptionsCont = document.createElement( 'div' );
        htmlStructOptionsCont.style.position = 'fixed';
        htmlStructOptionsCont.style.zIndex   = '9999999999999';
        htmlStructOptionsCont.style.top      = window.innerHeight - 35 + 'px';
        htmlStructOptionsCont.style.left     = window.innerWidth - 55 + 'px';
        
        htmlStructOptionsImg = document.createElement( 'img' );
        htmlStructOptionsImg.setAttribute( 'src', 'http://img209.imageshack.us/img209/17/ewfcj0.png' );
        htmlStructOptionsImg.addEventListener( 'click', function( ) { eWFOptions.toggleOptions( this, 'on' ); }, false );
        
        htmlStructOptionsCont.appendChild( htmlStructOptionsImg );
        htmlStructBody[0].appendChild( htmlStructOptionsCont );
    },
    
    buildOptionsPanel: function( ) {
        htmlStructBody = document.getElementsByTagName( 'body' );
        
        htmlStructOptionsCont = document.createElement( 'div' );
        htmlStructOptionsCont.setAttribute( 'id', 'eWFUpdateCont' );
        htmlStructOptionsCont.style.width      = '300px';
        htmlStructOptionsCont.style.height     = '100px';
        htmlStructOptionsCont.style.position   = 'fixed';
        htmlStructOptionsCont.style.top        = window.innerHeight - 110 + 'px';
        htmlStructOptionsCont.style.left       = window.innerWidth - 330 + 'px';
        htmlStructOptionsCont.style.zIndex     = '999999';
        htmlStructOptionsCont.style.background = '#161616';
        htmlStructOptionsCont.style.border     = 'solid 1px #cccccc';
        
        htmlStructOptionsInn = document.createElement( 'div' );
        htmlStructOptionsInn.setAttribute( 'id', 'eWFUpdateInner' );
        htmlStructOptionsInn.style.padding = '5px';
        htmlStructOptionsInn.style.color   = '#cccccc';
        
        htmlStructOptionsH2 = document.createElement( 'h2' );
        htmlStructOptionsH2.style.color = '#cccccc';
        htmlStructOptionsH2.appendChild( document.createTextNode( 'Options' ) );
        
        htmlStructOptionsInn.appendChild( htmlStructOptionsH2 );
        
        htmlStructOptionsInnZombieOpt = document.createElement( 'div' );
        htmlStructOptionsInnZombieOpt.addEventListener( 'click', function( ) { eWFOptions.toggleZombies( this, ( eWFOptions.curOptions.zombie.status == 'on' ? 'off' : 'on' ) ); }, false );
        htmlStructOptionsInnZombieOpt.style.padding = '3px';
        htmlStructOptionsInnZombieOpt.style.cursor  = 'pointer';
        
        htmlStructOptionsInnZombieOptImgDiv = document.createElement( 'div' );
        htmlStructOptionsInnZombieOptImgDiv.style.cssFloat    = 'left';
        htmlStructOptionsInnZombieOptImgDiv.style.marginRight = '5px';
        
        htmlStructOptionsInnZombieOptImg = document.createElement( 'img' );
        htmlStructOptionsInnZombieOptImg.setAttribute( 'src', 'http://forums.worldofwarcraft.com/images/bc/portraits/halloween/wow/character.gif' );
        
        htmlStructOptionsInnZombieOptImgDiv.appendChild( htmlStructOptionsInnZombieOptImg );
        htmlStructOptionsInnZombieOpt.appendChild( htmlStructOptionsInnZombieOptImgDiv );
        
        htmlStructOptionsInnZombieOptBold = document.createElement( 'b' );
        htmlStructOptionsInnZombieOptBold.appendChild( document.createTextNode( 'Zombie Mode' ) );
        htmlStructOptionsInnZombieOpt.appendChild( htmlStructOptionsInnZombieOptBold );
        
        htmlStructOptionsInnZombieOptStatus = document.createElement( 'span' );
        htmlStructOptionsInnZombieOptStatus.setAttribute( 'id', 'eWFHTMLOptionsZombieOptStatusText' );
        
        if ( eWFOptions.curOptions.zombie.status == 'on' ) {
            htmlStructOptionsInnZombieOptStatus.style.color = "#b1ffad";
            htmlStructOptionsInnZombieOptStatus.style.fontWeight = "bold";
            htmlStructOptionsInnZombieOptStatus.appendChild( document.createTextNode( ' (Enabled)' ) );
        } else {
            htmlStructOptionsInnZombieOptStatus.style.color = "#ffadad";
            htmlStructOptionsInnZombieOptStatus.style.fontWeight = "bold";
            htmlStructOptionsInnZombieOptStatus.appendChild( document.createTextNode( ' (Disabled)' ) );
        }
        
        htmlStructOptionsInnZombieOpt.appendChild( htmlStructOptionsInnZombieOptStatus );
        htmlStructOptionsInnZombieOpt.appendChild( document.createElement( 'br' ) );
        htmlStructOptionsInnZombieOpt.appendChild( document.createTextNode( 'Enabling this will replace all avatars with the zombie avatar used on Halloween.' ) );
        htmlStructOptionsInn.appendChild( htmlStructOptionsInnZombieOpt );
        
        htmlStructOptionsCont.appendChild( htmlStructOptionsInn );
        htmlStructBody[0].appendChild( htmlStructOptionsCont );
        
        eWFOptions.optPanBuilt = true;
    }
};

eWFUpdate = {
    init: function( ) {
        if ( typeof GM_xmlhttpRequest != 'function' ) {
        } else {
        	if ( window == top ) {
                eWFUpdate.check( );
            }
        }
    },
    
    check: function( ) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://userscripts.org/scripts/review/37051',
            headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                       'Accept': 'text/html' },
            onload: function( responseDetails ) {
                var lVersion = responseDetails.responseText.match( /\/\/ Enhanced World of Warcraft Forums\r\n\/\/ version (.*?)\r\n/ );
                
                if ( eWFUpdate.compareVersions( lVersion[1] ) == 1 ) {
                    eWFUpdate.buildUpdateBox( eWF.currentVersion, lVersion[1] );
                }
            }
        });
    },
    
    compareVersions: function( latestVersion ) {
        var latestVersion, a, b;
        a = latestVersion;
        b = eWF.currentVersion;
        
        return ( a < b ? -1 : ( a > b ? 1 : 0 ) );
    },
    
    buildUpdateBox: function( nVersion, cVersion ) {
        var nVersion, cVersion;
        
        htmlStructBody = document.getElementsByTagName( 'body' );
        
        htmlStructUpdateCont = document.createElement( 'div' );
        htmlStructUpdateCont.setAttribute( 'id', 'eWFUpdateCont' );
        htmlStructUpdateCont.style.width      = '300px';
        htmlStructUpdateCont.style.height     = '100px';
        htmlStructUpdateCont.style.position   = 'fixed';
        htmlStructUpdateCont.style.top        = window.innerHeight - 110 + 'px';
        htmlStructUpdateCont.style.left       = window.innerWidth - 330 + 'px';
        htmlStructUpdateCont.style.zIndex     = '999999';
        htmlStructUpdateCont.style.background = '#a7e69b';
        htmlStructUpdateCont.style.border     = 'solid 1px #5a8851';
        
        htmlStructUpdateInn = document.createElement( 'div' );
        htmlStructUpdateInn.setAttribute( 'id', 'eWFUpdateInner' );
        htmlStructUpdateInn.style.padding = '5px';
        htmlStructUpdateInn.style.color   = '#253422';
        
        htmlStructUpdateH2 = document.createElement( 'h2' );
        htmlStructUpdateH2.style.color = '#253422';
        htmlStructUpdateH2.appendChild( document.createTextNode( 'Update Reminder!' ) );
        
        htmlStructUpdateInn.appendChild( htmlStructUpdateH2 );
        htmlStructUpdateInn.appendChild( document.createTextNode( 'Enhanced World of Warcraft Forums has been updated to version' ) );
        
        htmlStructUpdateBold = document.createElement( 'b' );
        htmlStructUpdateBold.appendChild( document.createTextNode( ' ' + nVersion + ' ' ) );
        htmlStructUpdateInn.appendChild( htmlStructUpdateBold );
        
        htmlStructUpdateInn.appendChild( document.createTextNode( 'and your current version is' ) );
        
        htmlStructUpdateBold = document.createElement( 'b' );
        htmlStructUpdateBold.appendChild( document.createTextNode( ' ' + cVersion ) );
        htmlStructUpdateInn.appendChild( htmlStructUpdateBold );
        
        htmlStructUpdateInn.appendChild( document.createTextNode( '.' ) );
        
        htmlStructUpdateLinkDiv = document.createElement( 'div' );
        htmlStructUpdateLinkDiv.style.textAlign  = 'center';
        htmlStructUpdateLinkDiv.style.paddingTop = '3px';
        
        htmlStructUpdateLink = document.createElement( 'a' );
        htmlStructUpdateLink.setAttribute( 'href', 'http://userscripts.org/scripts/source/37051.user.js' );
        htmlStructUpdateLink.style.color = '#000';
        htmlStructUpdateLink.appendChild( document.createTextNode( 'Click Here to install the latest version.' ) );
        
        htmlStructUpdateLinkDiv.appendChild( htmlStructUpdateLink );
        
        htmlStructUpdateInn.appendChild( htmlStructUpdateLinkDiv );
        
        htmlStructUpdateCont.appendChild( htmlStructUpdateInn );
        htmlStructBody[0].appendChild( htmlStructUpdateCont );
    }
}

eWF.init( );
eWFOptions.init( );
eWFUpdate.init( );