// ==UserScript==
// @name           Better Webwereld
// @copyright      2009, Peter Koopman
// @namespace      gmPeterKoopmanScripts
// @description    Mijn verbeteringen aan Webwereld
// @include        http://webwereld.nl/article/comments/id/*
// ==/UserScript==
/*================================================================================

Changelog:

0.1 (NB)
+ Eerste release

0.2 (29-06-2010)
+ Eindelijk de extra noindent CSS code aangepakt
- Eigen import van jQuery verwijderd omdat Webwereld het nu zelf ook gebruikt
- Ignore mode toegevoegd en trollen minder zichtbaar gemaakt


================================================================================*/
/*--------------------------------------------------------------------------------
Logging
--------------------------------------------------------------------------------*/
function PKO_log( text ) {
  var logTimerNow = new Date();
  var logTimerDiff = (logTimerNow.getTime() - logTimer.getTime()) / 1000;
  text += ( logTimerDiff == 0 ? '' : ' (' + logTimerDiff + 's)' ); 
  
  if ( typeof PRO_log != 'undefined' ) {
    PRO_log(text);
  }
  else if ( typeof GM_log != 'undefined' ) {
    GM_log(text);
  }
  else if ( window.opera && window.opera.postError ) {
    window.opera.postError(text);
  }
}
/*--------------------------------------------------------------------------------
Stylesheet toevoegen
--------------------------------------------------------------------------------*/
function PKO_loadCSS_inline( text ) {
  if ( typeof GM_addStyle != "undefined" ) {
    GM_addStyle( text );
  } 
  else if ( typeof PRO_addStyle != "undefined" ) {
    PRO_addStyle( text );
  } 
  else if ( typeof addStyle != "undefined" ) {
    addStyle( text );
  } 
  else {
    var aoHeads = document.getElementsByTagName( 'head' );
    if (aoHeads.length > 0) {
      var oNode = document.createElement( "style" );
      oNode.type = "text/css";
      oNode.appendChild(document.createTextNode( text ));
      aoHeads[0].appendChild( oNode ); 
    }
  }
}
/*--------------------------------------------------------------------------------
Javascript code inline toevoegen
--------------------------------------------------------------------------------*/
function PKO_loadJavascript_inline( text ) {
  var aoHeads = document.getElementsByTagName( 'head' );
  if (aoHeads.length > 0) {
    var oNode = document.createElement('script');
    oNode.type = 'text/javascript';
    oNode.appendChild(document.createTextNode( text ));
    aoHeads[0].appendChild( oNode ); 
  }
}
/*--------------------------------------------------------------------------------
Javascript code toevoegen
--------------------------------------------------------------------------------*/
function PKO_loadJavascript( uri ) {
  var aoHeads = document.getElementsByTagName( 'head' );
  if (aoHeads.length > 0) {
    var oNode = document.createElement('script');
    oNode.type = 'text/javascript';
    oNode.src = uri;
    aoHeads[0].appendChild( oNode ); 
  }
}
/*---------------------------------------------------------------------------------
Event listener toevoegen
---------------------------------------------------------------------------------*/
function PKO_addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e" + type + fn] = fn;
    obj[type + fn] = function() { obj["e" + type + fn]( window.event ); return false;}
    obj.attachEvent( "on" + type, obj[type + fn] );
  } 
  else {
    obj.addEventListener( type, fn, false );
  }
}
/*--------------------------------------------------------------------------------
Logging starten
--------------------------------------------------------------------------------*/
var logTimer = new Date();
PKO_log("Better Webwereld loading");
/*--------------------------------------------------------------------------------
Event listener voor page onload event afhandelen
--------------------------------------------------------------------------------*/
PKO_addEvent( self, 'load', function(event) { var t = new Date(); document.cookie = '_bw_sL=' + escape( t.getTime() ) + '; path=/'; });

/*--------------------------------------------------------------------------------
Check if jQuery's loaded
--------------------------------------------------------------------------------*/
function PKO_jQuery_wait() {
  if( typeof unsafeWindow != 'undefined' ) { 
    if( typeof unsafeWindow.jQuery == 'undefined' ) { 
      window.setTimeout( PKO_jQuery_wait, 100); 
    }
    else { 
      PKO_jQuery_Start( unsafeWindow.jQuery ); 
    }
  }
  else if( typeof window.opera != 'undefined' ) { 
    if( typeof window.jQuery == 'undefined' ) { 
      window.setTimeout( PKO_jQuery_wait, 100); 
    }
    else { 
      PKO_jQuery_Start( window.jQuery ); 
    }
  }
}
PKO_jQuery_wait();
/*================================================================================
All your GM code must be inside this function
================================================================================*/
function PKO_jQuery_Start( $jQ ) {   
  var dDateNow = new Date();
  var dDateDay = new Date();
  var dDateWeek = new Date();
  var dDateFront = new Date();
  
  var aColorSet = new Array();
  
  /*================================================================================
  PROTOTYPES
  ================================================================================*/
  String.prototype.ltrim = function () { return this.replace(/^ */,""); }
  String.prototype.rtrim = function () { return this.replace(/ *$/,""); }
  String.prototype.trim = function () { return this.ltrim().rtrim(); }

  /*================================================================================
  MAINLINE
  ================================================================================*/
  PKO_log("Better Webwereld started");

  // Starttijd script bewaren
  setCookie( '_bw_sS', logTimer.getTime() );
  
  // De diverse cookies uitlezen
  var sUserIgnore      = getCookie( '_bw_uI' );
  var sUserTroll       = getCookie( '_bw_uT' );
  var sUserPlus        = getCookie( '_bw_uP' );
  var sUserMin         = getCookie( '_bw_uM' );
  var sCommentPlus     = getCookie( '_bw_cP' );
  var sCommentMin      = getCookie( '_bw_cM' );
  var sCommentIgnore   = getCookie( '_bw_cI' );
  var bNumberedThreads = userPrefBoolean( 'numThread', true  );
  var bHeaderColor     = userPrefBoolean( 'headColor', true  );
  var bAltScoring      = userPrefBoolean( 'scoring',   false );
  var bDateColor       = userPrefBoolean( 'dateColor', true  );
  var bDateTag         = userPrefBoolean( 'dateTag',   true  );
  var bDateShort       = userPrefBoolean( 'dateShort', true  );
  var bSmilies         = userPrefBoolean( 'smile',     true  );
  var bSmiliesPopup    = userPrefBoolean( 'smilePop',  true  );
  var bTextLinks       = userPrefBoolean( 'TextLink',  true  );
  PKO_log("Cookies read");

  // Controleer of de auteur te achterhalen is in deze pagina
  var oAuthor = $jQ( "ul.articleFooter li.comment[id^='comment_edit_']" ).parent().siblings( "h2" ).children( "a[href^='/user/']:first" ).get(0);
  if (oAuthor != null ) {
    var oClassUser = new ClassUser();
    oClassUser.parse( oAuthor );
    setCookie( '_bw_uA', numEncode( oClassUser.id ), 365 );
  }
  var sUserAuthor = getCookie( '_bw_uA' );

  // Overrides van CSS
  setCSS();
  PKO_log("CSS replaced");
  
  // Javascript toevoegen
  setScript();
  PKO_log("Javascript added");
  
  // Initialiseer variabelen
  initialize();
  PKO_log("Data initialized");

  // Extra footers toevoegen
  $jQ( '.articleFooter' ).after( '<ul class="bwArticleFooterH"/>' );
  
  // Start de node analyse
  analyzeNodes( false, document.getElementById('mainColumn'), 1 );
  PKO_log("Comments analyzed");

  // Vervang textsmilies door grafische smilies
  if ( bSmilies || bTextLinks ) {
    var oIsCommentText = new RegExp( '^comment_[0-9]+_text$' );
    var oaNodes = document.getElementsByTagName( 'P' );
    for ( var i = 0; i < oaNodes.length; i++ ) {
      if ( oIsCommentText.test( oaNodes[i].id ) ) {
        oSmilies.transform( oaNodes[i], bTextLinks );
      }
    }
    PKO_log("Smilies & links analyzed");
  }

  // Open de links in de commentaren in een extern venster
  $jQ('p a[href^="http://"]').attr({ target: "_blank" }).append('^');
  PKO_log("Links transformed");
  
  // Extra footers toevoegen
  if ( bAltScoring ) {
    $jQ( '.articleFooter' ).hide();
    $jQ( '.bwArticleFooterH' ).show();
    PKO_log("Footers replaced");
  }
    
  // Locatie resetten
  var anchor = location.hash
  if ( anchor != '' ) {
    window.location.hash = anchor;
    PKO_log("Window location reset");
  }  
    
  // Menu opbouwen
  createMenu();
  PKO_log("Menu created");
  
  if ( bSmiliesPopup ) {
    $jQ(".bwSmily").hover( bwShowSmilyPopUp, false );
    PKO_log("Smily hover events added");
  }

  // Popup sluiter maken
  $jQ("#bwPopUp").hover( false, bwHidePopUp );
  PKO_log("Popup close event set");

  // Eindtijd script bewaren
  var endTimer = new Date();
  setCookie( '_bw_sE', endTimer.getTime() );
  
  PKO_log("Better Webwereld finished");
  /*================================================================================
  FUNCTIONS
  ================================================================================*/
  /*--------------------------------------------------------------------------------
  Initialiseer datums en tijdafhandeling
  --------------------------------------------------------------------------------*/
  function initialize() {
    // Systeemtijd afkappen op minuten
    dDateNow.setMilliseconds( 0 );
    dDateNow.setSeconds( 0 );
    
    // Begin van de dag berekenen
    dDateDay.setTime( dDateNow.getTime() );
    dDateDay.setHours(0);
    dDateDay.setMinutes(0);
    
    // Begin van de week berekenen
    dDateWeek.setDate( dDateDay.getDate() - dDateNow.getDay() );
    
    // De kleurentabel voor tijdlabels vullen
    fillColorArray();
    
    oSmilies = new ClassSmilies();
  }
  /*--------------------------------------------------------------------------------
  Analyseer de nodes
  --------------------------------------------------------------------------------*/
  function analyzeNodes( oPrevNode, oCurrNode, nLevel ) {
    var oChildNodes = oCurrNode.childNodes;
    var oIsCommentId = new RegExp( '^articleComment_[0-9]+$' );
    
    for ( var i = 0; i < oChildNodes.length; i++ ) {
      if ( oChildNodes[i].nodeName == 'DIV' && oIsCommentId.test( oChildNodes[i].id ) ) {
        oChildNodes[i].insertBefore( document.createComment( 'key=unkeyed' ), oChildNodes[i].childNodes[0] );
        analyzeComment( oPrevNode, oChildNodes[i], nLevel );
      }
    }
  }
  /*--------------------------------------------------------------------------------
  Comment bijwerken
  --------------------------------------------------------------------------------*/
  function analyzeComment( oPrevNode, oCurrNode, nLevel ) {
    var oChildNodes = oCurrNode.childNodes;

    var oComment = new ClassComment();
    oComment.id = oCurrNode.id;
    oComment.node = oCurrNode;
    oComment.prevNode = oPrevNode;
    oComment.level = nLevel;
    
    for ( var i = 0; i < oChildNodes.length; i++ ) {
      if ( oChildNodes[i].nodeName == 'H2' ) {
        oComment.nodeHeader = oChildNodes[i];
      }
      else if ( oChildNodes[i].nodeName == 'DIV' && oChildNodes[i].className == 'articleBody' ) {
        oComment.nodeBody = oChildNodes[i];
      }
      else if ( oChildNodes[i].nodeName == 'UL'  && oChildNodes[i].className == 'articleFooter' ) {
        oComment.nodeFooter = oChildNodes[i];
        oComment.parse( oCurrNode );
        oComment.transform();
      }
      else if ( oChildNodes[i].nodeName == 'DIV' && (oChildNodes[i].className == 'child' || oChildNodes[i].className == 'child noindent') ) {
        analyzeNodes( oCurrNode, oChildNodes[i], nLevel + 1 );
      }
    }
  }
  /*================================================================================
  MENU
  ================================================================================*/
  /*--------------------------------------------------------------------------------
  On screen menu opbouwen
  --------------------------------------------------------------------------------*/
  function createMenu() {
    $jQ( 'body' ).prepend(
      '<div id="bwPopUp"></div>' +
      '<a hRef="#" onclick="javascript:bwToggleUserMenu(); return false;" id="bwUserMenuButton" class="bwUserMenu">?</a>' + 
      '<span id="bwUserMenu" class="bwUserMenuH" style="width: 340px; height:100%">' +
        '' +
        '<div style="font-size:8pt;"><span style="color:#D5100B; font-weight:bold; font-size:10pt;">Better Webwereld</span> - door Peter Koopman</div><br/>' +
        '<a href="#" onClick="javascript:$jQ(\'#bwUserMenuMisc\').slideToggle(\'fast\'); return false;" style="outline:none; text-decoration:none;">' +
        '<div class="bwUserMenuHeader">Algemeen</div></a>' +
        '<div id="bwUserMenuMisc" class="bwUserMenuData" style="height:120px;">Geen informatie</div>' +
        '<ul class="bwUserMenuFooter"/>' +
        '' +
        '<div id="bwUserMenuButtons" class="bwMenuButtons">' +
          '<a href="#" onClick="javascript:bwCreateUserList(\'Type\'); return false;">Type</a> ' +
          '<a href="#" onClick="javascript:bwCreateUserList(\'User\'); return false;">Naam</a> ' +
          '<a href="#" onClick="javascript:bwCreateUserList(\'Score\'); return false;">Score</a> ' +
          '<a href="#" onClick="javascript:bwCreateUserList(\'Comments\'); return false;">Reacties</a>' +
        '</div>'+
        '<a href="#" onClick="javascript:$jQ(\'#bwUserMenuUsers\').slideToggle(\'fast\'); return false;" style="outline:none; text-decoration:none;">' +
        '<div class="bwUserMenuHeader">Gebruikers</div></a>' +
        '<div id="bwUserMenuUsers" class="bwUserMenuData" style="height:150px;">Geen gebruikers</div>' +
        '<ul class="bwUserMenuFooter" style="display:block;"/>' +
        '' +
        '<a href="#" onClick="javascript:$jQ(\'#bwUserMenuComments\').slideToggle(\'fast\'); return false;" style="outline:none; text-decoration:none;">' +
        '<div class="bwUserMenuHeader">Reacties</div></a>' +
        '<div id="bwUserMenuComments" class="bwUserMenuData" style="height:150px;">Geen reacties</div>' +
        '<ul class="bwUserMenuFooter" style="display:block;"/>' +
        '' +
        '<a href="#" onClick="javascript:$jQ(\'#bwUserMenuSettings\').slideToggle(\'fast\'); return false;" style="outline:none; text-decoration:none;">' +
        '<div class="bwUserMenuHeader">Instellingen</div></a>' +
        '<div id="bwUserMenuSettings" class="bwUserMenuData" style="height:80px;">Geen instellingen</div>' +
        '<ul class="bwUserMenuFooter" style="display:block;"/>' +
        '' +
      '</span>' + 
    '' );
  }
  /*--------------------------------------------------------------------------------
  TODO: Score
  --------------------------------------------------------------------------------*/
  function createScore( oUser ) {
    var sText =
    '<a class="ThumbsUp" href="#"><span class="icon"><span class="text">Plus</span></span></a><br/>' +
    '<a class="ThumbsDown" href="#"><span class="icon"><span class="text">Min</span></span></a><br/>' +
    '<a class="Warning" href="#"><span class="icon"><span class="text">Redactie</span></span></a><br/>' +
    '<a class="Comment" href="#"><span class="icon"><span class="text">Reageer</span></span></a><br/>';
  }
  /*--------------------------------------------------------------------------------
  Vul de array met kleurtags voor datering van berichten
  --------------------------------------------------------------------------------*/
  function fillColorArray() {
    var localTime = new Date().getTime();
    var minuten = 0;
    var uren = 1;
    var index = 0;
  
    // Eerste uur gradaties van rood
    var r = 255; var g = 192; var b = 192;
    
    for (i = 0; i < 12; i++) {
      localTime -= 300000; // 5 minuten
      minuten += 5;
      
      aColorSet[index] = [new Date().setTime(localTime), 
                         r + ', ' + g + ', ' + b,
                         minuten.toString() + 'm'];
      index += 1;
      
      if (g > 0) {
        g -= 24;
        b -= 24;
      }
      else {
        r -= 24;
      }
    }
    
    // Daarna een gradatie van geel via groen naar blauw
    r = 255; g = 255; b = 0;
    
    for (i = 0; i < 10; i++) {
      localTime -= 3600000; // 1 uur
      uren += 1;
      
      aColorSet[index] = [new Date().setTime(localTime), 
                         r + ', ' + g + ', ' + b,
                         uren.toString() + 'u'];
      index += 1;
      r -= 14; g -= 5; b += 5;
    }
    for (i = 0; i < 10; i++) {
      localTime -= 3600000; // 1 uur
      uren += 1;
      
      aColorSet[index] = [new Date().setTime(localTime), 
                         r + ', ' + g + ', ' + b,
                         uren.toString() + 'u'];
      index += 1;
      r -= 11; g -= 10; b += 15;
    }
    
    dDateFront.setTime(localTime)
  } 
  /*================================================================================
  DATA CLASSES
  ================================================================================*/
  /*--------------------------------------------------------------------------------
  Comment
  --------------------------------------------------------------------------------*/
  function ClassComment() {
    this.id         = "";
    this.level      = 0;
    this.node       = null;
    this.prevNode   = null;
    this.nodeHeader = null;
    this.nodeBody   = null;
    this.nodeFooter = null;
    this.date       = new ClassDate();
    this.user       = new ClassUser();
    this.score      = new ClassScore(); 
    
    this.parse = function( oNode ) {
      this.user.parse( $jQ( this.nodeHeader ).children( 'a:first' )[0] );
      this.date.parse( $jQ( this.nodeHeader ).children( 'span:first' )[0] );
      this.score.parse( document.getElementById( 'rating_' + this.getMsgId() ) );
      this.score.id = this.getMsgId();
    }
    this.asString = function() {
      return createKey( 'id',  this.getMsgId() ) +
             createKey( 'lvl', this.level ) +
             createKey( 'vis', ( this.isVisible() ? 'T' : 'F' ) ) +
             ( this.level == 1 ? '' : createKey( 'prv',  this.prevNode.id.substring( 15 ) ) ) +
             this.date.asString() +
             this.user.asString() +
             this.score.asString();
    }
    this.getMsgId = function() {
      return parseInt( this.id.substring( 15 ) );
    }
    this.isVisible = function() {
      var sId = numEncode( this.getMsgId() );
      if ( inList( sCommentIgnore,  sId ) ) return false;
      else return this.user.isVisible();
    }
    this.isIgnored = function() {
      return this.user.isIgnored();
    }
    this.isReact = function() {
      return this.user.isReact();
    }
    this.transform = function() {
      this.node.childNodes[0].nodeValue = this.asString()

      // Thread diepte in de header weergeven
      if ( bNumberedThreads && !this.isIgnored() ) {
        $jQ( this.nodeHeader )
          .prepend( '<span>' + 
                    ( this.prevNode != false ? 
                      '<a class="bwNumberedThreads" href="#' + this.prevNode.childNodes[2].name + '">&lt;</a> ' : 
                      '' ) + 
                    '<a class="bwNumberedThreads" href="#' + this.node.childNodes[2].name + '">' + this.level + '</a> ' +
                    '<a class="bwNumberedThreads" onclick="javascript:bwChangeStateComment(\'' + this.node.id + '\'); return false;" href="#">x</a>' +
                    '</span>'
                  );
      }
      
      // Afhankelijk van de gebruiker state kleur instellen
      this.nodeHeader.className = 'bwBack' + ( bHeaderColor ? this.user.type : 'Neutraal' );
      
      // Indien nodig reactie verbergen
      if ( !this.isVisible() || this.isIgnored() ) {
        $jQ( this.nodeBody ).hide();
      }
      
      if ( this.isIgnored() ) {
        $jQ( this.nodeFooter ).hide().next().show();
      }
	  
      // Indien nodig reactie knop verbergen
      if ( !this.isReact() ) {
        $jQ( this.nodeFooter ).children( 'li.comment:last' ).hide();
      }
      
      // Alternative score weergeven
      if ( bAltScoring ) {
        $jQ( this.nodeHeader )
          .prepend( '<span id="bwRating_' + this.getMsgId() + '" style="float:right; margin-right:5px; font-weight:bold;"></span>');
        this.score.transform();
      }
      
      // datum van de reactie opmaken 
      this.date.transform();
    }
  }
  /*--------------------------------------------------------------------------------
  Score
  --------------------------------------------------------------------------------*/
  function ClassScore() {
    this.comments = 0;
    this.score    = 0;
    this.count    = 0;
    this.id       = 0;
    
    this.parse = function( oNode ) {
      var sText = oNode.textContent;
      var sSign = '+';
      var nPos = 0;
      var nScore = 0;
      var nCount = 0;
      
      if ( sText != '0 / 0' ) {
        if ( sText.substr( 0, 1 ) == '-' ) {
          sText = sText.substring( 1 );
          sSign = '-';
        }
        nPos = sText.indexOf(' / ');
        if ( nPos > 0 ) {
          nScore = parseInt( sText.substr( 0, nPos ) );
          nCount = parseInt( sText.substr( nPos + 3 ) );
        }
        if ( sSign == '-' && nScore != 0 )
          nScore = 0 - nScore;
        
        if ( nScore != nCount )
          nScore = (nCount + nScore) / 2;
      }
      
      this.comments += 1;
      this.count    += nCount;
      this.score    += nScore;
      
      if ( this.comments > 1 )
        this.id = -1;
    }
    this.asString = function() {
      return createKey( 'scr', this.score ) +
             createKey( 'cnt', this.count ) +
             createKey( 'sts', this.getMyScore() );
    }
    this.getScoreNode = function() {
      return ( this.id == -1 ? null : document.getElementById( 'rating_' + this.id ) );
    }
    this.getPlusNode = function() {
      return ( this.id == -1 ? null : document.getElementById( 'thumbsUp_' + this.id ) );
    }
    this.getMinNode = function() {
      return ( this.id == -1 ? null : document.getElementById( 'thumbsDown_' + this.id ) );
    }
    this.getBwScoreNode = function() {
      return ( this.id == -1 ? null : document.getElementById( 'bwRating_' + this.id ) );
    }
    this.getBwPlusNode = function() {
      return ( this.id == -1 ? null : document.getElementById( 'bwThumbsUp_' + this.id ) );
    }
    this.getBwMinNode = function() {
      return ( this.id == -1 ? null : document.getElementById( 'bwThumbsDown_' + this.id ) );
    }
    this.getBwEditNode = function() {
      return ( this.id == -1 ? null : document.getElementById( 'comment_edit_' + this.id ) );
    }
    this.getMyScore = function() {
      var sReturn = 'N';
      
      if ( this.id != -1 ) {
        var sEnc = numEncode( this.id );
        if ( inList( sCommentPlus, sEnc ) )     sReturn = 'P';
        else if ( inList( sCommentMin, sEnc ) ) sReturn = 'M';
      }
      return sReturn;
    }
    this.asText = function() {
      if ( this.score == 0 ) return '0';
      else return '+' + this.score;
    }
    this.transform = function() {
      if ( this.id != -1 )
        this.getBwScoreNode().innerHTML = this.asText();
    }
  }
  /*--------------------------------------------------------------------------------
  User
  --------------------------------------------------------------------------------*/
  function ClassUser() {
    this.id    = 0;
    this.name  = "";
    this.path  = "";
    this.type  = "";
    this.score = new ClassScore();
    
    this.parse = function( oNode ) {
      this.name = oNode.textContent;
      this.path = oNode.pathname;
      this.id = parseInt( this.path.substring( 6 ) )
      this.getType();
    }
    this.asString = function() {
      return createKey( 'uid', this.id ) +
             createKey( 'usr', this.name ) +
             createKey( 'pth', this.path ) +
             createKey( 'typ', this.type.substr( 0, 1 ) );
    }
    this.getType = function() {
    var sEnc = numEncode( this.id );
      if      ( sUserAuthor == sEnc )        this.type = "Author";
      else if ( inList( sUserIgnore, sEnc) ) this.type = "Ignore";
      else if ( inList( sUserTroll,  sEnc) ) this.type = "Troll";
      else if ( inList( sUserPlus,   sEnc) ) this.type = "Plus";
      else if ( inList( sUserMin,    sEnc) ) this.type = "Min";
      else                                   this.type = "Neutraal";
      return this.type;
    }
    this.isTroll = function() {
      return this.type == "Troll";
    }
    this.isIgnored = function() {
      return this.type == "Ignore";
    }
    this.isPlus = function() {
      return this.type == "Plus";
    }
    this.isMin = function() {
      return this.type == "Min";
    }
    this.isAuthor = function() {
      return this.type == "Author";
    }
    this.isNeutraal = function() {
      return this.type == "Neutraal";
    }
    this.isUser = function() {
      return false;
    }
    this.isVisible = function() {
      return !this.isTroll();
    }
    this.isReact = function() {
      return !this.isIgnored();
    }
  }
  /*--------------------------------------------------------------------------------
  Date
  --------------------------------------------------------------------------------*/
  function ClassDate() {
    this.node = null;
    this.text = '';
    this.date = new Date();
    this.color = '';
    this.tag = '';
    
    this.parse = function( oNode ) {
      this.node = oNode;
      this.text = oNode.textContent;
      this.date = textToDate( this.text );

      if ( this.date >= dDateFront ) {
        for ( j = 0; j < aColorSet.length; j++ ) {
          if ( this.date > aColorSet[j][0] ) {
            this.color = aColorSet[j][1];
            this.tag = aColorSet[j][2];
            break;
          }
        }
      }
    }
    this.asString = function() {
      return createKey( 'dat', this.date.getTime() / 100000 );
    }
    this.asText = function() {
      return ' ' + dateToText( this.date );
    }
    this.transform = function() {
      if ( this.date.getTime() != 0 ) {
        if ( bDateColor && this.color != '' ) {
          $jQ( this.node ).before( '<span class="bwColoredThreads" style="background:rgb(' + this.color + ');"/>&nbsp</span>' );
        }
        if ( bDateTag && this.tag   != '' ) {
          $jQ( this.node ).after( '<span style="font-size:8pt;"> -' + this.tag + '</span>' );
        }
        if ( bDateShort ) {
          this.node.innerHTML = this.asText();
        }
      }
    }
  }
  /*--------------------------------------------------------------------------------
  Smilies
  --------------------------------------------------------------------------------*/
  function ClassSmilies() {
    var aSmile = [
        [":-?D",                   "Laugh",            ":-D",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ/0EkJKpjY1bHWqBnAdeQ3iWTqXZqqXuhSdfMKkHUt3+6LWsCb6YZ4GI8IGYVzKD4Qh9VphEhKMZvOh5XRWDIRADs="],
        ["X-?D",                   "Hard Laugh",       "X-D",    14, 14, "R0lGODlhDgAOAIQLAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD/////////AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//ACH5BAEAAA4ALAAAAAAOAA4AAAVEoCOKQAmMqFMOyzKUKcC29DvKLp3bat3OixOuBnSVWibkMQjQOWkrpilpayIe2CwiSGIdrg/EwXibIbZkVNR4SpFMqRAAOw=="],
        [":'-?\\(",                "Crying",           ":'(",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAARDsEkJKpi41bHWqBnAdeQ3id44cKbmkeVyoR7Q0Z996xXZEwwDzMDYDYowEsOElFmUQJTudjuNYMwGQ4MDSbYnC4YRAQA7"],
        [":-?\\|",                 "Indifferent",      ":-|",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ20EkJKpjY1bHWqBnAdeQ3iWTqXZqqXuhSdfMKkHUt3+4b96uWZXhj/VQmyiiVPMU+rIzGkokAADs="],
        [":-?\\)",                 "Smile",            ":-)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ30EkJKpjY1bHWqBnAdeQ3iWTqXZqqXuhSdfMKkHUt3+4b96vWjsZjxT5HlmaUMmE2HWTmZMlEAAA7"],
        [":-?\\(",                 "Sad",              ":-(",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ30EkJKpjY1bHWqBnAdeQ3iWTqXZqqXujaxR9AVrOdu+5W+h2TDrcgskSxIPI0SpkwwFrmZMlEAAA7"],
        [":-?\\\\",                "Sceptical",        ":-\\",   14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ10EkJKpjY1bHWqBnAdeQ3iWTqXZqqXuhSdfMKkHUt3+4bp5tVC/djxX5CyihlwgRtmZMlEwEAOw=="],
        [":-?o",                   "Shocked",          ":-o",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ+0EkJKpjY1bHWqBngceNyUV6npqdoulV3AWT8dp+77rdq6a/aYXhwfTSyw+NRlFFqFtxJQ1odMRvpNGTJRAAAOw=="],
        [":-?[pP]",                "Tongue",           ":-P",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ70EkJKpjY1bHWqBnAdeQ3iWTqXZqqXuhSdfMKkHUt3+6LWsCbiddJGBM0ymhxRJqUJOMqFPuwMhpLJgIAOw=="],
        ["=-?\\)",                 "Big Eyes",         "=)",     14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAARF0EkJKpjY1bHWqBnAdeQ3iQiAdCliasgjI/F8icCTV7r+AYvagyYbLiosVXJ1FJGepVsH2ZxSRj/s5Qr1bE9O7zdkyUQAADs="],
        ["8-?\\)",                 "Cool",             "8-)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ40EkJKpjY1bHWqBnAdeQ3iWTqXZqqXqIlWx/QWXeVl+MwLhtXymQDFnVASi+4Ov1KrBNqFQ1ZMhEAOw=="],
        [";-?\\)",                 "Wink",             ";-)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ30EkJKpjY1bHWqBnAdeQ3iWTqXZqqXijaVd0HkPSS67f7xiOVqZcrUkY2JEsTLC0pMlvmZMlEAAA7"],
        ["LOL",                    "LOL",              "LOL",    14, 14, "R0lGODlhDgAOAIQAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAA4ALAAAAAAOAA4AAAVJoCOKQAmMqFMOyzKUKcC29DvKdO6ealv6AJ9qpqv9AAiTKbn4NR/QaLCJMwUCpl0vGUgksIgmiYWIPsK28SKJ1KJWrRcvpTKlQgA7"],
        [":[\\*o\+]\\)",           "Clown",            ":+)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAARE0EkJKpjYVXQOqhlwPE9HHheFkJzHpuLzdcCKatxnbV7V0YmE6Of7BYM/VM14/H00KA5yBuMUfU8VbZid8HqpjMaSiQAAOw=="],
        ["\\}:-?[\\)>]",           "Devil",            ">:-)",   14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAARG0AVHgQVU0mnHWoOlOUnifehQVuVxDkeJOQAKnh8GnDXah70FIPFJBC22pG/3OdicIF2uhxRWXp1PKMNMbjO0LhAMvswyEQA7"],
        [":-?x",                   "Sick",             ":-x",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ+0EkJKpjYVaGUqBnAdeQ3id4ocKbmkaVyiVzV2at9Ex0BkDqYUIZyvF5G0w+4vFFUHdXlOWydUB5QhmLJRAAAOw=="],
        ["=-?\\|",                 "Big Indifferent",  "=|",     14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAARE0EkJKpjY1bHWqBnAdeQ3iQiAdCliasgjI/F8icCTV7r+AYvagyYbLiosVXJ1FJGepRsUetGMLEBP1Tp9nZzabciSiQAAOw=="],
        ["=-?\\(",                 "Big Sad",          "=(",     14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAARHsEkJKpi41bHWqBnAdeQ3iQiAdCliasgjI/F8icCTV7r+AQuEY0gbOlYVlkq5WmxI0NJNKiJdNJxPp/rCAq1dStUDyojLkwgAOw=="],
        ["=-?[oO]",                "Big Shocked",      "=o",     14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAARH0EkJKpjY1bHWqBnAdeQ3iQiAdCliasgjI/F8icCTV7r+AYvagyYbLiosVXJ1FJGaTxOwk9ORLppRdfrKUrnYk9MDylAsmQgAOw=="],
        ["=-?[pP]",                "Big Tongue",       "=P",     14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAARC0EkJKpjY1bHWqBnAdeQ3iVZnmRrwvNX7gOg8u/gHLC7cz7xdUJgKjkhIz2VnaTIpx4Q0oTyNpgnWSbSQgjIUSyYCADs="],
        [":-?\\*",                 "Kiss",             ":-*",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAARA0EkJKpjYVTTWqBnAHUvpXdRomh81kKt5ie9S2UD5ATXul5VeTMaDlQJI3axjSjiBLuMioZwUYy0Mj7nLWC2ZCAA7"],
        [";-?\\(",                 "Sad Wink",         ";-(",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ30EkJKpjY1bHWqBnAdeQ3iWTqXZqqXijayR9AVrOdu+5W+h2TDrcgskSyIPI0SpkwwFrmZMlEAAA7"],
        [":-?X",                   "Shut Up!",         ":-X",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ70EkJKpjY1bHWqBnAdeQ3iUvVqaa2Au+qjWTtqcuB3kfcfQcdbVMi/i4wnlA2W/JaM9sttPtcMhRLJgIAOw=="],
        ["[\\|:]-?[zZ]",           "Sleep",            ":-Z",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ30EkJKpjY1cFHzcCwjKQ3hWS6mNpajdtyoWrqAXX9khbO0zzRyORzqS4aYW+ITNZYJ9otE/1gIgA7"],
        ["\\|-?O",                 "Yawn",             ":-O",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ90EkJKpjY1cFHzcCwjKQ3hR4wbqZGvuQVjulGV7dlLzivW6vZD2hSWQIB4EXDASSeCdSSWZOCUM3p9YOJAAA7"],
        [":-?[sS]",                "What",             ":-s",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ60EkJKpjY1bHWqBnAdeQ3id44cKbmkeVyiVzV2at9Azupw0AZKlia+XiyG6XW81yWwdZp+HlmNJZMBAA7"],
        ["=-?[sS]",                "Big What",         "=-s",    14, 14, "R0lGODlhDgAOAIQLAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD/////////AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//AP//ACH5BAEAAA4ALAAAAAAOAA4AAAVKoCOKQAmMqFMOyzKUKcC29DvKCIC0OWKriIcQERyeZIBHsqRUvgCL4oMonC5KPF12d5XRvrUjDXttnVQsaLf1Q4Nd55sXHo+ZUiEAOw=="],
        [":'-?\\)",                "Sad Smile",        ":')",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAARDsEkJKpi41bHWqBnAdeQ3iWTqXZqqXuhSdfMKkAzT5c4h367FofcbpYaOHowGBBgcDwNl9BENDSyNsZSlxKqZkyUTAQA7"],
        ["\\(\\+\\)",              "Plus",             "(+)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQpsMlJKxXCVqFU1hPngWH3SViKdSPKvqyqwnEj0vWMf/eOpj4XLXWRnSIAOw=="],
        ["\\(-\\)",                "Minus",            "(-)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQqsMlJ6ww4BxuS/0kmaeC3NV0JbqQaou6qpSoWe/NsWhfOj75f6vRDESkRADs="],
        ["\\(!\\)|!!!+",           "Exclaim",          "(!)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQ2sEkJKpi41bHWqBnAdeQ3iWRVXhq5qKk2dnD3Ae6Lu7U906icy7QD8iizmgkpXJ6Ct8wThIkAADs="],
        ["\\(\\?\\)|\\?\\?\\?+",   "Question",         "(?)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQ5sEkJKpi41bHWqBnAdeQ3icthAYd3aV0VA7E2lqhLk+69yDwgacMrumDDXc2WxJ18HROGqMucLJkIADs="],
        ["#-?\\)",                 "Block Eyes",       "#-)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQ7sEk56pgS6M37+58GhsD4iCNanmu7gij8kmZnd8Oi7/wANACdRhhc/IC5hQ+Q9E2YPJ0To2lqMNQNNgIAOw=="],
        ["\\(v\\)",                "Calimero",         "(v)",    14, 18, "R0lGODlhDgASAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOABIAAARPsMkGqp0YoHPeQQBGbd3jgRlnrkcoaeV6uoAqm+1r3zl8s6Ba7NcS/liWCiK4TFIqJujj8gQYplYsLcmtvCyL8ML5BQzCA+oEnPaKyq5JBAA7"],
        ["<\\|-?\\)",              "Chinese",          "<|-)",   18, 14, "R0lGODlhEgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAASAA4AAARFsMkpQ6AY25RsphsnelognuPVWGzrthIwzHQ9AxSwLIC8D70dbqLbGY/C3ACJBGKKQOHS+VwugD7esMqkfnpW7OfZ21IiADs="],
        ["\\[:-?\\)",              "Cowboy",           "[:-)",   18, 18, "R0lGODlhEgASAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAASABIAAARUsMlJq5UHgJP3nQDSHQjwSRunml+oqmX7vqwkovOKIaXm/8AQaEAsGmuowWKhWTYXAyRgyZxWqVKqditVbrXRivVJtgC80fMybPaCkWI1VHMC+S4RADs="],
        ["o-?\\)",                 "Cyclops",          "o-)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQ9sEkJKpi41bHWqBnAdeQ3id1RHZ2pkcDzACSijUtclTupAiwYjUQkbopF07DHpIw+KM/FiXSdotDMFYSJAAA7"],
        ["\\[\\|-?\\)",            "Cylon",            "[|)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQ9sEkJKpi4VXQOqhnAdeQ3iWTqXZqqssABBEkSWDJF1q/ukrBUReiTdWLHImI5ymk4saXRREFJP6yTZTuJAAA7"],
        ["\\{:-?\\)",              "French hat",       "{:-)",   14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQ6sMnZAJUHgc07yhsijmLYnWe1rGxrAcO6ycA6zHSut/yyxT3WTeWrFWUSmO23nCh5QwpzcbNckpxLBAA7"],
        ["B-?\\)",                 "Glasses",          "B-)",    14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQ8sEkJKpi41bHWqBnAdeQ3iWTqXdpivYCrVcfzIIh9vB1gV79eTEgUjlSly7BSZKFWTxPlmAxFQRmKJRMBADs="],
        ["<:-?\\)",                "Party hat",        "<:-)",   14, 18, "R0lGODlhDgASAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOABIAAARLsMkZwrwXvYcwDklieZK2cWQDhiIJHHAMYMCw3PgwSzXuLzre7zfrLQCAG/KmSyqdy+dwiLRNmUXpEcqzNr27htEXvFSxYRoy3YgAADs="],
        ["\"-?\\)",                "Picasso",          "\"-)",   14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOAA4AAAQ2sEkJKpi41bHWqBnAdeQ3ieRSdaaWqgB5oW/6xTXcrTm/5aWZbqiicG4jz8VYa51ot8wThIkAADs="],
        ["O:-?\\)",                "Saint",            "O:-)",   14, 18, "R0lGODlhDgASAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAAOABIAAARVsMkzqj1yVpzp4EMmZmHjcdonepY6fk/8UCPwLDeOAxkw6DHdgNcA6BZI5I3nWxyQh6dzMTQiAVZsUpvsdrE/b3dYvGazkiYVjCSnw2NiT10dzbGjCAA7"],
        [":-?!",                   "What Exclaim",     ":-!",    18, 14, "R0lGODlhEgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAASAA4AAARMsEkJKpjzgDPrWMtQYRb1gajYjcA3nG94NQiANECIpsusabEKSPia3XJDpHBI2jlRPtzpCVL9cFAlU8KR9pLVGcbrVI1XsNF5bBGfIwA7"],
        [":-?\\?",                 "What Question",    ":-?",    18, 14, "R0lGODlhEgAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAMAAA0ALAAAAAASAA4AAARTsEkJKpjt2DPrWMtQZQDSIFcDfGArZpKmfgNbh+l5AWHrLinU7FMBFWsADYdnZBaNp6Vv2rpwZlSfSGNSVZ3QzHUFbIJeGApLm0uryLi2m2KZSyIAOw=="],
        [">:-?[\\)>]",             "Angry Smile",      ">:-)",   14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAMAAAAAAgIAAgACAgMDAwICAgP8AAAD/AP+AgAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ+0EkJKpjY1bHWqBnAdeQ3iUsQdKp3aWS6khe62F/3AfQc8J3KbRTLbYZFnglosQQpxJjrFNW9TjhQhmLJRAAAOw=="],
        [">:-?\\(",                "Angry",            ">:-(",   14, 14, "R0lGODlhDgAOAIMAAAAAAIAAAACAAMAAAAAAgIAAgACAgMDAwICAgP8AAAD/AP+AgAAA//8A/wD//////yH5BAMAAA4ALAAAAAAOAA4AAAQ80EkJKpjY1bHWqBnAdeQ3iUsQdKp3aWS6khe62F/3AfQc8J1KbEizEXW1oEV4o3xGSJOTKD3hQBmKJRMBADs="],
        ["[\\[\\(]\\*{3}[\\]\\)]", "Censored",         "(***)",  36, 14, "R0lGODlhJAAOAIMAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAEAAA0ALAAAAAAkAA4AAARgsMlJq7046827/2AoZkBpnmiqrgDyPAjwvnL8tK9d3rcs5zuEy2d6HHywYY+38w2JzSKMWWwunVfp0nXj6pBWIHR8O/SsaPAhVlOeujxhXCl3HnGwH+3qxcf6WSyCgygRADs="]
      ];

    this.regexp = "";
    this.index = 0;
    
    this.count = function() {
      return aSmile.length; 
    }
    
    this.init = function() {
      var sRegexp = "";
      for ( var i = 0; i < this.count(); i++ ) {
        var a = aSmile[i];
        if ( sRegexp == "" )
          sRegexp = a[0];
        else
          sRegexp += "|" + a[0];
      }
      this.regexp = sRegexp;
    }
    this.image = function( vIndex, sAlt ) {
      if ( typeof vIndex == 'number' ) {
        this.index = vIndex;
      }
      else if ( typeof vIndex == 'string' ) {
        for ( var i = 0; i < this.count(); i++ ) {
          var patt = new RegExp( '^' + aSmile[i][0] + '$' );
          if ( patt.test( vIndex ) ) {
            this.index = i;
            break;
          }
        }
      }
      var image = document.createElement('img'); 
      image.src       = 'data:image/gif;base64,' + aSmile[this.index][5],
      image.width     = aSmile[this.index][3],
      image.height    = aSmile[this.index][4],
      image.title     = aSmile[this.index][2] + '  (' + aSmile[this.index][1] + ')';
      image.alt       = ( sAlt != null ? sAlt : aSmile[this.index][2] )
      image.align     = ( aSmile[this.index][4] == 14 ? 'top' : 'bottom' );
      image.className = 'bwSmily';
      return image;
    }
    this.link = function( sRef, sText ) {
      var link = document.createElement('a'); 
      link.href = sRef;
      link.appendChild( document.createTextNode( sText ) );
      return link;
    }
    this.transform = function( oNode, bLinks ) {
      var oChildNodes = oNode.childNodes;
      for ( var i = 0; i < oChildNodes.length; i++ ) {
        switch ( oChildNodes[i].nodeName ) {
          case 'IMG':
          case 'BR':
            break;
          case '#text':
            this.transformTextNode( oChildNodes[i], bLinks );
            break;
          case 'A':
            this.transform( oChildNodes[i], false );
            break;
          default:
            this.transform( oChildNodes[i], bLinks );
            break;
        }
      }
    }
    this.transformTextNode = function( oTextNode, bLinks ) {
      var sIsLink = "\\b(?:[Hh][Tt][Tt][Pp][Ss]?|[Ff][Tt][Pp])://[-A-Za-z0-9+&@#/%?=~_|!:,.;]*[-A-Za-z0-9+&@#/%=~_|]";
      var sText = oTextNode.nodeValue;
      var sLeftContext = "";
      var sLastMatch = "";
      var sRightContext = "";
      var oSpan = null;
      var oIsLink = null;
      var oPattern = null;
      
      if ( bSmilies && bLinks ) {
        oPattern = new RegExp( this.regexp + '|' + sIsLink );
        oIsLink = new RegExp( '^' + sIsLink  + '$' );
      }
      else if ( bLinks ) {
        oPattern = new RegExp( sIsLink );
        oIsLink = new RegExp( '^' + sIsLink  + '$' );
      }
      else {
        oPattern = new RegExp( this.regexp );
      }
      
      sLastMatch = oPattern.exec( sText );
      if ( sLastMatch != null ) {
        oSpan = document.createElement( 'span' );
        while ( sLastMatch != null ) {
          sLastMatch = sLastMatch.toString()
          sLeftContext = RegExp.leftContext;
          sRightContext = RegExp.rightContext;
          if ( bLinks && oIsLink.test( sLastMatch ) ) {
            oSpan.appendChild( document.createTextNode( sLeftContext ) );
            oSpan.appendChild( this.link( sLastMatch, sLastMatch ) );
          }
          else if ( isBlank( sLeftContext, sLeftContext.length - 1 ) && isBlank( sRightContext, 0 ) ) {
            oSpan.appendChild( document.createTextNode( sLeftContext ) );
            oSpan.appendChild( this.image( sLastMatch, sLastMatch ) );
          }
          else {
            oSpan.appendChild( document.createTextNode( sLeftContext + sLastMatch ) );
          }
          sText = sRightContext;
          if ( sText == '') break;
          
          sLastMatch = oPattern.exec( sText );
        }
        if ( sText != '' )
          oSpan.appendChild( document.createTextNode( sText ) );
          
        $jQ( oTextNode ).replaceWith( oSpan );
      }
    }
    this.init();
  }
  /*================================================================================
  FUNCTIONS
  ================================================================================*/
  /*--------------------------------------------------------------------------------
  Text omzetten naar een datum
  --------------------------------------------------------------------------------*/
  function textToDate( sText ) {
    var dReturn = new Date();
    var aMonth = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    var cWord = "";
    var nWordLen = 0;
    var nPos = 0;
    
    dReturn.setTime(0);

    if ( sText.substr( 0, 4 ) == ' op ' ) {
      nPos = sText.indexOf( ' ', 4 ) ;
      sText = sText.substring( nPos + 1 ) + ' @';

      nPos = sText.indexOf( ' ', 0 ) ;
      while ( nPos != -1 ) {

        if ( nPos == 0 ) {
          sText = sText.substring( 1 );
        }
        else {
          cWord = sText.substr( 0, nPos );
          nWordLen = cWord.length;
          sText = sText.substring( nPos + 1 );

          if ( isNaN( cWord ) ) {
            if ( nWordLen == 5 && cWord.substr( 2, 1 ) == ':' ) {
              dReturn.setHours( cWord.substr( 0, 2 ) );
              dReturn.setMinutes( cWord.substr( 3, 2 ) );
            }
            else {
              for ( nPos = 0; nPos < aMonth.length; nPos++ ) {
                if ( cWord == aMonth[nPos] ) {
                  dReturn.setMonth(nPos);
                  break;
                }
              }
            }
          }
          else {
            if ( nWordLen <= 2 ) {
              dReturn.setDate( cWord );
            }
            else if ( nWordLen == 4 ) {
              dReturn.setFullYear( cWord );
            }
          }      
        }
        nPos = sText.indexOf( ' ', 0 ) ;
      }
    }
    return dReturn;
  }
  /*--------------------------------------------------------------------------------
  Datum omzetten naar text
  --------------------------------------------------------------------------------*/
  function dateToText( dDate ) {
    var sText = '';
    var aDow = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
    var aMonth = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
  
    if ( dDate >= dDateDay ) {
      sText = dDate.toTimeString().substr( 0, 5 );
    }
    else if ( dDate >= dDateWeek ) {
      sText = aDow[ dDate.getDay() ] + ' ' + dDate.toTimeString().substr( 0, 5 );
    }
    else if ( dDate.getFullYear() == dDateNow.getFullYear() ) {
      sText = dDate.getDate().toString() + ' ' + aMonth[ dDate.getMonth() ] + ', ' + dDate.toTimeString().substr( 0, 5 );
    }
    else {
      sText = dDate.getDate().toString() + ' ' + aMonth[ dDate.getMonth() ] + ' ' + dDate.getFullYear().toString()  + ', ' + dDate.toTimeString().substr( 0, 5 );
    }
    return sText;
  }
  /*--------------------------------------------------------------------------------
  Sleutel=waarde combinatie maken
  --------------------------------------------------------------------------------*/
  function createKey( sName, sValue ) {
    return sName + '=' + escape( sValue ) + ';';
  }
  /*--------------------------------------------------------------------------------
  Key lezen uit een buffer
  --------------------------------------------------------------------------------*/
  function getKey( sBuffer, sName ) {
    var nStart = 0;
    var nStop  = 0;
    if ( sBuffer.length > 0 ) {
      nStart = sBuffer.indexOf( sName + '=' );
      if ( nStart != -1 ) { 
        nStart = nStart + sName.length + 1; 
        nStop = sBuffer.indexOf( ';', nStart);
        if ( nStop == -1 ) nStop = sBuffer.length;
        return unescape( sBuffer.substring( nStart, nStop ) );
      } 
    }
    return '';
  }
  /*--------------------------------------------------------------------------------
  controleren of een waarde in een lijst zit
  --------------------------------------------------------------------------------*/
  function inList( sList, sValue ) {
    if ( sList == '' ) return false;
    else return ( sList.indexOf( '+' + sValue + '+' ) != -1 );
  }
  /*--------------------------------------------------------------------------------
  Cookie lezen
  --------------------------------------------------------------------------------*/
  function getCookie(sName) {
    return getKey( document.cookie, sName );
  }
  /*--------------------------------------------------------------------------------
  Cookie zetten
  --------------------------------------------------------------------------------*/
  function setCookie( sName, sValue, nExpiredays, lPath) {
    var dExdate = new Date();
    dExdate.setDate( dExdate.getDate() + nExpiredays );
    document.cookie = createKey( sName, sValue ) + " expires=" + dExdate.toGMTString() + '; path=' + ( lPath == null || lPath == false ? '/' : location.pathname );
  }
  /*--------------------------------------------------------------------------------
  Gebruikersinstelling boolean uitvragen of zetten
  --------------------------------------------------------------------------------*/
  function userPrefBoolean( sName, lBoolean ) {
    var sValue = getCookie( '_bw_uS' + sName );
    if ( lBoolean != null ) {
      if ( lBoolean == true )
        sValue = 'Y';
      else
        sValue = 'N';
      setCookie( '_bw_uS' + sName, sValue, 365 );
    }
    else if ( sValue == '' ) { 
      sValue = 'Y';
      setCookie( '_bw_uS' + sName, sValue, 365 );
    }
    return sValue == 'Y';
  }
  /*--------------------------------------------------------------------------------
  controleren of een bepaalde positie leeg is
  --------------------------------------------------------------------------------*/
  function isBlank( sText, nPos ) {
    var oBlank = /^\W$/;
    if ( nPos >= 0 && nPos < sText.length ) 
      return oBlank.test( sText.substr( nPos, 1 ) );
    else
      return true;
  }
  /*----------------------------------------------------------------------------
  Encode id's
  ----------------------------------------------------------------------------*/
  function numEncode( nKey ) {
    var sEnc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890-';

    var nLocal = nKey;
    var sReturn = '';

    while ( nLocal > 0 ) {
      var mod = nLocal & 63
      nLocal >>= 6;
      sReturn = sEnc.substr( mod, 1 ) + sReturn;
    }   
    return sReturn;  
  }
  /*--------------------------------------------------------------------------------
  Algemene popup sluiter
  --------------------------------------------------------------------------------*/
  function bwHidePopUp( event ) {
    event.stopPropagation();
    $jQ("#bwPopUp:hidden").stop( true, true );
    $jQ("#bwPopUp").fadeOut("fast");
  }
  /*--------------------------------------------------------------------------------
  Openen smily popup
  --------------------------------------------------------------------------------*/
  function bwShowSmilyPopUp( event ) {
    var _this = this;
    PKO_log("debug1.1");
	
    event.stopPropagation();
    PKO_log("debug1.2");
	
    $jQ("#bwPopUp:visible").stop( true, true );
    PKO_log("debug1.3");

    var clone = $jQ( this ).clone();
    PKO_log("debug1.4");
    $jQ( clone ).attr({ height: _this.height * 2, width: _this.width * 2, title: '' }).css( 'margin', '5px' );
    PKO_log("debug1.5");

    var offset = $jQ(this).offset();
    $jQ("#bwPopUp").html( clone ).css("top", (offset.top - (_this.height + 10) ) + "px").css("left", (offset.left - (_this.width + 10) ) + "px").fadeIn("fast");
    PKO_log("debug1.6");
  }
  /*================================================================================
  CSS OVERWRITES
  ================================================================================*/
  /*--------------------------------------------------------------------------------
  code om css te plaatsen
  --------------------------------------------------------------------------------*/
  function setCSS( cCSSstring ) {
    var cCSSstring =
      ".bwColoredThreads { display:inline-table; height:9px; width:9px; border:thin solid gray; margin-left:5px; margin-right:0px; background:white; font:6pt arial; clip:rect(7px, 7px, 7px, 7px); overflow:hidden; }\n" +
      ".bwNumberedThreads { font:8pt arial,serif; text-decoration:none; color:rgb(4, 116, 166); outline-style:none; }\n" +
      ".bwUserMenu { z-index:801; position:fixed; right:0px; top:0px; display:block; border-bottom:1px solid #e3e3e3; border-left:1px solid #e3e3e3; background:#5A8BAB url(/images/newsLetterSubscriptionBg.jpg) repeat-x scroll left top; color:white; padding:5px 10px 5px 10px; text-decoration:none; font-weight:bold; }\n" +
      ".bwUserMenuH { z-index:800; position:fixed; right:0px; top:0px; display:none; border-left:1px solid #e3e3e3; padding:8px 8px 0 8px; background:white url(/images/subMenuBg.jpg) repeat-x scroll left top; }\n" +
      ".bwUserMenuHeader { display:block; background-color:#f0f0f0; border:1px solid #e3e3e3; padding:3px 0 3px 10px; color:#0075B2; font-size:1em; font-weight:bold; }\n" +
      ".bwUserMenuData { display:block; overflow:auto; border-left:1px solid #e3e3e3; border-right:1px solid #e3e3e3;  padding:3px 0 3px 10px; }\n" +
      ".bwUserMenuFooter { display:block; background:transparent url(/images/articleCommentFooterBg.jpg) no-repeat scroll 0 -28px; height:10px; margin:0; padding:0; }\n" +
      ".articleComment ul.bwArticleFooterH { display:none; background:transparent url(/images/articleCommentFooterBg.jpg) no-repeat scroll 0 -28px; height:10px; margin:0; padding:0; }\n" +
      "div.Neutraal a, div.Plus a, div.Min a, div.Troll a, div.Ignore a { font-size:8pt; text-decoration:none; outline-style:none; display:block; width:14px; height:14px; background-color:#eee; color:black; text-align:center; border:1px solid #bbb; float:left; margin-right:2px; }\n" +
      "div.Author a { font-size:8pt; text-decoration:none; outline-style:none; display:block; width:14px; height:14px; background-color:#ffc; color:black; text-align:center; border:1px solid black; float:left; margin-right:2px; }\n" +
      "div.Neutraal a.Neutraal { background-color:#ccf; border:1px solid black; }\n" +
      "div.Plus a.Plus { background-color:#cfc; border:1px solid black; }\n" +
      "div.Min a.Min { background-color:#fdb; border:1px solid black; }\n" +
      "div.Troll a.Troll { background-color:#fcc; border:1px solid black; }\n" +
      "div.Ignore a.Ignore { background-color:#fff; border:1px solid black; }\n" +
      ".bwBackNeutraal { background-color:#eee; border:1px solid #e3e3e3; }\n" +
      ".bwBackPlus { background-color:#cfc; border:1px solid #e3e3e3; }\n" +
      ".bwBackMin { background-color:#fdb; border:1px solid #e3e3e3; }\n" +
      ".bwBackTroll { background-color:#fff; border:1px solid #e3e3e3; }\n" +
      ".bwBackAuthor { background-color:#ffb; border:1px solid #e3e3e3; }\n" +
      ".bwBackIgnore { background-color:#fff; border:1px solid #eeeeee; }\n" +
      "a.bwThumbsUp, a.bwThumbsDown, a.bwWarning, a.bwComment { text-decoration:none; }\n" +
      "a.bwThumbsUp span.icon, a.ThumbsDown span.icon, a.Warning span.icon, a.Comment span.icon { height:26px; display:inline-table; padding-left:24px; }\n" +
      "a.bwThumbsUp span.icon { background:transparent url(/images/icons.gif) no-repeat scroll 1px -436px; }\n" +
      "a.bwThumbsDown span.icon { background:transparent url(/images/icons.gif) no-repeat scroll 0px -474px; }\n" +
      "a.bwWarning span.icon { background:transparent url(/images/icons.gif) no-repeat scroll 0px -756px; }\n" +
      "a.bwComment span.icon { background:transparent url(/images/icons.gif) no-repeat scroll 1px -796px; }\n" +
      "a.bwThumbsUp .icon .text, a.bwThumbsDown .icon .text, a.bwWarning .icon .text, a.bwComment .icon .text { display:inline-table; padding-top:6px; text-decoration:underline; }\n" +
      "div#bwPopUp { top:10px; left:10px; display:none; z-index:999; position:absolute; background-color:#eee; border:1px solid #e3e3e3; }\n" +
      ".bwSmily { border:none !important; float:none !important; }\n" +
      "div.bwMenuButtons a { font-size:8pt; text-decoration:none; outline-style:none; display:inline; height:14px; background-color:#eee; color:black; text-align:center; border:1px solid #bbb; margin-right:2px; margin-bottom:2px; padding:0 5px 0 5px; }\n" +
      "div.bwMenuButtons a.Selected { background-color:#ccf; border:1px solid black; }\n" +
      "" +
      ".articleComment { background:none; padding-top:0px; }\n" +
      ".articleComment h2 { padding:4px 0 2px 10px; height:auto; }\n" +
      ".articleComment ul.articleFooter li.rating  { width:auto !important; }\n" +
      ".articleComment ul.articleFooter li.comment { width:auto !important; }\n" +
      ".articleComment ul.articleFooter li.warning { width:17px !important; }\n" +
      ".articleComment q { background:transparent url(/images/articleIntroPanelBg.jpg) repeat-x scroll left top !important; border:1px solid #CCCCCC; display:block; margin:5px; overflow:auto; padding:5px; quotes:\"\" \"\" \"\" \"\"; }\n" +
      ".child { margin-left:6px; }" +
      ".child.noindent { margin-left:3px; }" +
      "#articleForm form textarea { height:240px; border:1px solid #aaa }\n";
      
    var cCSSstringOpera =
      ".articleComment p { margin-left:10px; overflow-x:hidden; overflow-y:hidden; }\n" +
      "#webwereld ul li div.desc table { margin-left:10px; }\n";

    if ( typeof window.opera != 'undefined' )
      PKO_loadCSS_inline( cCSSstring + cCSSstringOpera );
    else
      PKO_loadCSS_inline( cCSSstring );
  }
  /*================================================================================
  JAVASCRIPT
  ================================================================================*/
  /*--------------------------------------------------------------------------------
  code om css te plaatsen
  --------------------------------------------------------------------------------*/
  function setScript() {
    // ------------------------------------------------------------------------------
    var sSourceString = (function () {
      var $jQ = jQuery.noConflict();
      /* Zet het menu aan of uit */
      function bwToggleUserMenu() {
        
        if ( $jQ('#bwUserMenu:animated').length == 1 ) return
        
        if ( $jQ('#bwUserMenu:hidden').length == 1 ) {
          $jQ('#bwUserMenu').slideDown('fast');
          bwCreateInfoList();
          bwCreateUserList();
          bwCreateNewsList();
        }
        else {
          $jQ('#bwUserMenu').slideUp('fast');
        }
      }
      /* Zet state van een gebruiker (State, userid) */
      function bwChangeUserType( o ) {
        if ( o.parentNode.className != o.className ) o.parentNode.className = o.className;
        else o.parentNode.className = 'Neutraal';
        
        var sUserId   = o.parentNode.childNodes[0].nodeValue;
        var sUserType = o.parentNode.className;
        
        if ( sUserType == 'Plus'   ) bwAppendList( '_bw_uP', sUserId ); else bwRemoveList( '_bw_uP', sUserId );
        if ( sUserType == 'Min'    ) bwAppendList( '_bw_uM', sUserId ); else bwRemoveList( '_bw_uM', sUserId );
        if ( sUserType == 'Troll'  ) bwAppendList( '_bw_uT', sUserId ); else bwRemoveList( '_bw_uT', sUserId );
        if ( sUserType == 'Ignore' ) bwAppendList( '_bw_uI', sUserId ); else bwRemoveList( '_bw_uI', sUserId );
        
        var aList = bwGetComments( 'uid', sUserId );
        for ( var i = 0; i < aList.length; i++ ) {
          var jQNode = $jQ( aList[i].node );
          
          jQNode.children( 'h2:first' ).removeClass( 'bwBack' + aList[i].type ).addClass( 'bwBack' + sUserType );
          if ( aList[i].type == 'Troll' ) {
            jQNode.children( '.articleBody:first' ).show();
            //jQNode.children( '.articleFooter:first' ).children( 'li.comment[id=""]' ).show();
          }
          if ( aList[i].type == 'Ignore' ) {
            jQNode.children( '.articleBody:first' ).show();
            jQNode.children( '.articleFooter:first' ).show();
			jQNode.children( '.bwArticleFooterH' ).hide();
          }
          if ( sUserType == 'Troll' ) {
            jQNode.children( '.articleBody:first' ).hide();
            //jQNode.children( '.articleFooter:first' ).children( 'li.comment[id=""]' ).hide();
          }
          if ( sUserType == 'Ignore' ) {
            jQNode.children( '.articleBody:first' ).hide();
            jQNode.children( '.articleFooter:first' ).hide();
			jQNode.children( '.bwArticleFooterH' ).show();
          }
          aList[i].type = sUserType;
          aList[i].save();
        }
      }
      /* Zet state van een commentaar */
      function bwChangeStateComment( sId ) {
        var o = document.getElementById( sId );
        var jQNode = $jQ( o );
        var oComment = new bwClassComment( o, o.childNodes[0] )
        var bVisible = !oComment.visible;
        var sUserType = oComment.type;

        if ( bVisible ) {
          jQNode.children( '.articleBody:first' ).slideDown('fast');
        }
        else {
          jQNode.children( '.articleBody:first' ).slideUp( 'fast' );
        }
 
        if ( bVisible ) bwRemovePathList( '_bw_cI', oComment.nodeId ); else bwAppendPathList( '_bw_cI', oComment.nodeId );
        
        oComment.visible = bVisible;
        oComment.save();
      }
      /* Zet state van een commentaar */
      function bwChangeScoreComment( sId, bScore ) {
        var o = document.getElementById( sId );
        var oComment = new bwClassComment( o, o.childNodes[0] )

        var oPlus = document.getElementById( 'thumbsUp_' + oComment.nodeId );
        if ( oPlus == null ) return;

        var jQNode = $jQ( oPlus );
        if ( jQNode.is(':hidden') ) return;

        if ( !bScore ) bwAppendPathList( '_bw_cI', oComment.nodeId );
        oComment.visible = bVisible;
        oComment.save();
      }
      /* Controleer een value in een cookie (key, value) */
      function bwOnList(c, v) {
        var str = bwGetCookie(c);
        var key = '+' + bwEncode( v ) + '+';
        if (str == '') return false;
        else return (str.indexOf( key ) == -1);
      }
      /* Verwijder een value uit een cookie (key, value) */
      function bwRemoveList(c, v) {
        var str = bwGetCookie(c);
        var key = '+' + bwEncode( v ) + '+';
        if (str != '' && str.indexOf( key ) != -1) { 
          str = str.replace( key, '+' ); 
          bwSetCookie( c, ( str == '+' ? '' : str ), 365 );
        }
      }
      /* Verwijder een value uit een path cookie (key, value) */
      function bwRemovePathList(c, v) {
        var str = bwGetCookie(c);
        var key = '+' + bwEncode( v ) + '+';
        if (str != '' && str.indexOf( key ) != -1) { 
          str = str.replace( key, '+' ); 
          bwSetPathCookie( c, ( str == '+' ? '' : str ), 21 );
        }
      }
      /* Plaats een value in een cookie (key, value) */
      function bwAppendList(c, v) {
        var str = bwGetCookie(c);
        var key = '+' + bwEncode( v ) + '+';
        if ( str.indexOf( key ) == -1 ) {
          if (str == '') str = key; else  str += bwEncode( v ) + '+';
          bwSetCookie( c, str, 365 );
        }
      }
      /* Plaats een value in een path cookie (key, value) */
      function bwAppendPathList(c, v) {
        var str = bwGetCookie(c);
        var key = '+' + bwEncode( v ) + '+';
        if ( str.indexOf( key ) == -1 ) {
          if (str == '') str = key; else  str += bwEncode( v ) + '+';
          bwSetPathCookie( c, str, 21 );
        }
      }
      /* lees een cookie (key) */
      function bwGetCookie(n) {
        if ( document.cookie.length > 0 ) {
          s = document.cookie.indexOf(n+'=');
          if (s != -1) { 
            s += n.length+1; 
            e = document.cookie.indexOf(';', s);
            if (e == -1 ) e = document.cookie.length;
            return unescape( document.cookie.substring(s, e) );
          } 
        }
        return '';
      }
      /* Zet een cookie (key, value, days) */
      function bwSetCookie(n, v, e) {
        var d = new Date();
        if (e != null ) d.setDate( d.getDate() + e );
        document.cookie = n + '=' + escape( v ) + ( (e == null) ? '' : '; expires=' + d.toGMTString()) + '; path=/';
      }
      /* Zet een cookie (key, value, days) */
      function bwSetPathCookie(n, v, e) {
        var d = new Date();
        if (e != null ) d.setDate( d.getDate() + e );
        document.cookie = n + '=' + escape( v ) + ( (e == null) ? '' : '; expires=' + d.toGMTString()) + '; path=' + location.pathname;
      }
      /* Verzamel comments (Key, Value, Generic) */
      function bwGetComments( k, v, b ) {
        if ( k == null ) k = '';
        if ( v == null ) v = '';
        if ( b == null ) b = false;
        
        var e = new RegExp( '^articleComment_[0-9]+$' );
        var n = document.getElementById('mainColumn').getElementsByTagName('div');
        var r = new Array()
        
        for ( var i = 0; i < n.length; i++ ) {
          if ( e.test( n[i].id ) ) {
            var sNodevalue = n[i].childNodes[0].nodeValue;
            if ( k != '' ) {
              if ( v != '' ) {
                if ( b ) {
                  if ( bwGetKey( sNodevalue, k ).find( v ) == -1 ) continue;
                }
                else {
                  if ( bwGetKey( sNodevalue, k ) != v ) continue;
                }
              }
              else {
                if ( bwGetKey( sNodevalue, k ) == '' ) continue;
              }
            }
            r.push( new bwClassComment( n[i], n[i].childNodes[0] ) );
          }
        }
        return r;
      }
      /* Simple commentparser */
      function bwClassComment( oNode, oKey ) {
        var sText = oKey.nodeValue;

        this.node = oNode;
        this.nodeId = bwGetKey( sText, 'id' );
        this.level = bwGetKey( sText, 'lvl' );
        this.visible = ( bwGetKey( sText, 'vis' ) == 'T' ? true : false );
        this.prevId = bwGetKey( sText, 'prv' );
        this.date = new Date();
        this.date.setTime( bwGetKey( sText, 'dat' ) * 100000 );
        this.userId = bwGetKey( sText, 'uid' );
        this.user = bwGetKey( sText, 'usr' );
        this.path = bwGetKey( sText, 'pth' );
        this.type = 'Neutraal';
        this.score = parseInt( bwGetKey( sText, 'scr' ) );
        this.count = parseInt( bwGetKey( sText, 'cnt' ) );
        this.status = 'Neutraal';
        
        switch ( bwGetKey( sText, 'typ' ) ) {
          case 'I': this.type = 'Ignore';  break;
          case 'T': this.type = 'Troll';   break;
          case 'P': this.type = 'Plus';    break;
          case 'M': this.type = 'Min';     break;
          case 'A': this.type = 'Author';  break;
        }
        
        switch ( bwGetKey( sText, 'sts' ) ) {
          case 'P': this.Status = 'Plus'; break;
          case 'M': this.Status = 'Min';  break;
        }
        
        this.save = function() {
          this.node.childNodes[0].nodeValue = bwCreateKey( 'id',  this.nodeId ) +
                                              bwCreateKey( 'lvl', this.level ) +
                                              bwCreateKey( 'vis', ( this.visible ? 'T' : 'F' ) ) +
                                              ( this.level == 1 ? '' : bwCreateKey( 'prv',  this.prevId ) ) +
                                              bwCreateKey( 'uid', this.userId ) +
                                              bwCreateKey( 'usr', this.user ) +
                                              bwCreateKey( 'pth', this.path ) +
                                              bwCreateKey( 'typ', this.type.substr( 0, 1 ) ) +
                                              bwCreateKey( 'scr', this.score ) +
                                              bwCreateKey( 'cnt', this.count ) +
                                              bwCreateKey( 'sts', this.status.substr( 0, 1 ) ) +
                                              bwCreateKey( 'dat', this.date.getTime() / 100000 );
        }
      }
      /* Algemene informatie opbouwen */
      function bwCreateInfoList() {
        var dD = new Date();
        var dS = new Date();
        var dE = new Date();
        var dL = new Date();
        dD.setTime( Date.parse(document.lastModified) );
        dS.setTime( bwGetCookie( '_bw_sS' ) );
        dE.setTime( bwGetCookie( '_bw_sE' ) );
        dL.setTime( bwGetCookie( '_bw_sL' ) );

        document.getElementById( 'bwUserMenuMisc' ).innerHTML = bwToHtml( 
          '&lt;b&gt;Algemeen&lt;/b&gt;&lt;br&gt;' +
          'Draaitijd script: ' + ( ( dE.getTime() - dS.getTime() ) / 1000 ) + ' sec&lt;br&gt;' +
          'Document geladen: ' + ( ( dL.getTime() - dS.getTime() ) / 1000 ) + ' sec&lt;br&gt;' +
          '&lt;br&gt;&lt;b&gt;Cookies&lt;/b&gt;&lt;br&gt;' + 
          document.cookie.replace( /;/g, '&lt;br&gt;' ) );  
      }
      /* Opbouwen gebruikerslijst op basis van sortering */
      function bwCreateUserList( sSortBy ) {
        var aNewsList = bwGetComments();
        var aUserList = new Array();
        var i2 = -1;
        
        if ( aNewsList.length != 0 ) {
          aNewsList.sort( sortCommentPath );
          for ( var i1 = 0; i1 < aNewsList.length; i1++ ) {
            if ( aUserList.length == 0 || aNewsList[i1].path != aUserList[i2].path ) {
              aUserList.push( { user:     aNewsList[i1].user, 
                                path:     aNewsList[i1].path, 
                                userId:   aNewsList[i1].userId, 
                                type:     aNewsList[i1].type, 
                                score:    0, 
                                count:    0, 
                                comments: 0 } );
              i2++;
            }
            aUserList[i2].comments++;
            aUserList[i2].score += parseInt(aNewsList[i1].score);
            aUserList[i2].count += parseInt(aNewsList[i1].count);
          }
          if ( sSortBy == null ) {
            sSortBy = bwGetCookie( '_bw_mUS' );
            if ( sSortBy == "" ) sSortBy = 'User';
          }
          bwSetCookie( '_bw_mUS', sSortBy, 365 );
          
          switch ( sSortBy ) {
            case 'Type': aUserList.sort( sortCommentTypeUserPath ); break;
            case 'Score': aUserList.sort( sortCommentScoreUserPath ); break;
            case 'Count': aUserList.sort( sortCommentCountScoreUserPath ); break;
            case 'Comments': aUserList.sort( sortCommentCommentsCountScoreUserPath ); break;
            default: aUserList.sort( sortCommentUserPath ); break;
          }
          var sInnerHTML = "";
          for ( var i1 = 0; i1 < aUserList.length; i1++ ) {
            var nComments = parseInt( aUserList[i1].comments );
            var sUserId = aUserList[i1].userId;
            var sType = aUserList[i1].type;
            var sPath = aUserList[i1].path;
            var sUser = aUserList[i1].user;
            var nCount = parseInt( aUserList[i1].count );
            var nScore = parseInt( aUserList[i1].score );
            sInnerHTML += bwToHtml( 
              '&lt;div style="height:18px; position:relative; overflow:hidden;"&gt;' +
              '&lt;a class="comment_counter" style="text-decoration:none;" href="#" onClick="javascript:bwCreateNewsList(' + sUserId + '); return false;"&gt;' + 
              nComments + '&lt;/a&gt;' +
              '&lt;span style="float:right; margin-right:5px; width:52px; text-align:right;"&gt;' + ( nScore > 0 ? '+' : '' ) + nScore + '/' + nCount + '&lt;/span&gt;' +
              '&lt;/span&gt;' + bwCreateScoreCode( sType, sUserId ) + 
              '&nbsp;&nbsp;&lt;a href="' + sPath + '" target="_new"&gt;' + sUser + '&lt;/a&gt;' +
              '&lt;/div&gt;' );
          }
          document.getElementById( 'bwUserMenuUsers' ).innerHTML = sInnerHTML;
        }
        aNewsList = null;
        aUserList = null;
      }
      /* Opbouwen nieuwslijst op basis van gebruiker */
      function bwCreateNewsList( sUserId ) {
        var aNewsList = null;
        
        if ( sUserId == null )
          aNewsList = bwGetComments();
        else
          aNewsList = bwGetComments( 'uid', sUserId );
        
        aNewsList.sort( sortCommentDate );
        
        var sInnerHTML = "";
        var sText = "";
        for ( var i1 = 0; i1 < aNewsList.length; i1++ ) {
          sText = $jQ( '#comment_' + aNewsList[i1].nodeId + '_text' ).text().substr( 1, 80 );
          sInnerHTML += bwToHtml( 
            '&lt;div style="height:17px; position:relative; overflow:hidden;"&gt;&lt;b&gt;' +
            bwDateToText( aNewsList[i1].date ) + ' - ' + 
            '&lt;a style="color: rgb(4, 116, 166);" href="' + aNewsList[i1].path + '" target="_new"&gt;' + aNewsList[i1].user + '&lt;/a&gt;' +
            '&lt;/b&gt;&lt;/div&gt;' +
            '&lt;div style="height:17px; position:relative; overflow:hidden; width:99%;"&gt;' +
            '&lt;a style="text-decoration:none;" href="#comment_' + aNewsList[i1].nodeId + '"&gt;' +  sText + '&lt;/a&gt;' +
            '&lt;/div&gt;' );
        }
        document.getElementById( 'bwUserMenuComments' ).innerHTML = sInnerHTML;
        aNewsList = null;
      }
      /* Score code uitwerken */
      function bwCreateScoreCode( cUserType, cUserId ) {
        var sCommand = ( cUserType == 'Author' ? '' : 'javascript:bwChangeUserType(this);' ) + 'return false;'

        return bwToHtml( '&lt;div class="' + cUserType + '" style="position:relative;"&gt;&lt;!--' + cUserId + '--&gt;' +
                         '&lt;a class="Plus" title="Plus" onclick="' + sCommand + '" href="#"&gt;+&lt;/a&gt;' +
                         '&lt;a class="Min" title="Min" onclick="' + sCommand + '" href="#"&gt;-&lt;/a&gt;' +
                         '&lt;a class="Troll" title="Troll" onclick="' + sCommand + '" href="#"&gt;x&lt;/a&gt;' +
                         '&lt;a class="Ignore" title="Ignore" onclick="' + sCommand + '" href="#"&gt;i&lt;/a&gt;' +
                         '&lt;span style="clear:both;"/&gt;&lt;/div&gt;' );
      }
      /* Sleutel=waarde combinatie maken */
      function bwCreateKey( sName, sValue ) {
        return sName + '=' + escape( sValue ) + ';';
      }
      /* Encode id's */
      function bwEncode( nKey ) {
        var sEnc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890-';

        var nLocal = nKey;
        var sReturn = '';
  
        while ( nLocal > 0 ) {
          var mod = nLocal & 63
          nLocal >>= 6;
          sReturn = sEnc.substr( mod, 1 ) + sReturn;
        }   
        return sReturn;  
      }
      /* Decode id's */
      function bwDecode( sKey ) {
        var sEnc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890-';

        var sLocal = sKey;
        var nReturn = 0;
  
        for ( var i = 0; i < sLocal.length; i++ ) {
          if ( nReturn != 0 ) nReturn <<= 6;
          nReturn += sEnc.indexOf( sLocal.substr( i, 1 ) );
        }   
        return nReturn;  
      } 
      /* Key lezen uit een buffer */
      function bwGetKey( sBuffer, sName ) {
        var nStart = 0;
        var nStop  = 0;
        if ( sBuffer.length > 0 ) {
          nStart = sBuffer.indexOf( sName + '=' );
          if ( nStart != -1 ) { 
            nStart = nStart + sName.length + 1; 
            nStop = sBuffer.indexOf( ';', nStart);
            if ( nStop == -1 ) nStop = sBuffer.length;
            return unescape( sBuffer.substring( nStart, nStop ) );
          } 
        }
        return '';
      }
      /* Opera hack om innerHTML werkend te krijgen */
      function bwToHtml( sText ) {
        if ( typeof window.opera != 'undefined' ) {
          return sText;
        }
        else {
          return sText.replace( /&lt;/ig, '<' ).replace( /&gt;/ig, '>' );
        }
      }
      /* Datum omzetten naar text */
      function bwDateToText( dDate ) {
        var aDow = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
        var aMonth = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
        return aDow[ dDate.getDay() ] + ' ' + dDate.getDate().toString() + ' ' + aMonth[ dDate.getMonth() ] + ', ' + dDate.toTimeString().substr( 0, 5 );
      }
      /* Sorteren */
      function sortCommentCommentsCountScoreUserPath( a, b ) {
        var x = a.comments;
        var y = b.comments;
        return ((x < y) ? 1 : ((x > y) ? -1 : sortCommentCountScoreUserPath( a, b ))); 
      }
      function sortCommentCountScoreUserPath( a, b ) {
        var x = a.count;
        var y = b.count;
        return ((x < y) ? 1 : ((x > y) ? -1 : sortCommentScoreUserPath( a, b ))); 
      }
      function sortCommentScoreUserPath( a, b ) {
        var x = a.score;
        var y = b.score;
        return ((x < y) ? 1 : ((x > y) ? -1 : sortCommentUserPath( a, b ))); 
      }
      function sortCommentTypeUserPath( a, b ) {
        var x = ( a.type == 'Author' ? 0 : ( a.type == 'Plus' ? 1 : ( a.type == 'Neutraal' ? 2 : ( a.type == 'Min' ? 3 : ( a.type == 'Troll' ?  4 : 5 ) ) ) ) );
        var y = ( b.type == 'Author' ? 0 : ( b.type == 'Plus' ? 1 : ( b.type == 'Neutraal' ? 2 : ( b.type == 'Min' ? 3 : ( b.type == 'Troll' ?  4 : 5 ) ) ) ) );
        return ((x < y) ? -1 : ((x > y) ? 1 : sortCommentUserPath( a, b ))); 
      }
      function sortCommentUserPath( a, b ) {
        var x = a.user.toUpperCase();
        var y = b.user.toUpperCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : sortCommentPath( a, b ))); 
      }
      function sortCommentPath( a, b ) {
        var x = a.path;
        var y = b.path;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0)); 
      }
      function sortCommentDate( a, b ) {
        var x = a.date;
        var y = b.date;
        return ((x < y) ? 1 : ((x > y) ? -1 : 0)); 
      }
    }).toString().replace( /^function \(\) \{/, "" ).replace( /\}$/, "" );
    // ------------------------------------------------------------------------------

    var aoHeads = document.getElementsByTagName( 'head' );
    if (aoHeads.length > 0) {
      var oNode = document.createElement( "script" );
      oNode.type = "text/javascript";
      oNode.innerHTML = sSourceString;
      aoHeads[0].appendChild( oNode ); 
    }
  }
}
PKO_log("Better Webwereld loaded");
