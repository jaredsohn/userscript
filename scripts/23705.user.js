// ==UserScript==
// @name           Wakaba Extension 1.0 Alpha 1
// @description    Commonly requested features for Wakaba boards, in particular Desuchan
// @include http://www.desuchan.net/*
// @include http://desuchan.net/*
// @include https://www.desuchan.net/*
// @include https://desuchan.net/*
// @include http://*.420chan.org/*
// @include http://www.not420chan.com/*
// @include http://iichan.net/*
// @include http://*.iichan.net/*
// @include http://*.wakachan.org/*
// @include http://wakachan.org/*
// @include http://*.iiichan.net/*
// @include http://iiichan.net/*
// @include http://secchan.net/*
// @include http://*.secchan.net/*
// @include http://www.pooshlmer.com/wakaba/*
// @include http://pooshlmer.com/wakaba/*
// @include http://ib.rotbrc.com/*
// @include http://2ch.ru/*
// @include http://*.2ch.ru/*
// @include http://*.teamtao.com/*
// @include http://teamtao.com/*
// @include http://shanachan.*/*
// @include http://*.deadgods.net/*
// @include http://deadgods.net/*
// @include http://*.chiyochan.net/*
// @include http://chiyochan.net/*
// @include http://1chan.net/*
// @include http://*.1chan.net/*
// @include http://chupatz.com/*
// @include http://*.chupatz.com/*
// @include http://liarpedia.org/dorifuto/*
// @include http://*.koichan.net/*
// @include http://koichan.net/*
// @include http://raki-suta.com/*
// @include http://*.raki-suta.com/*
// @include http://img.7clams.org/*
// @include http://bokuchan.org/*
// @include http://www.bokuchan.org/*
// @include http://*.gurochan.net/*
// @include http://www.gurochan.net/*
// @include http://server50734.uk2net.com/*
// @include http://www.deltaxxiv.org/*
// @include http://voile.gensokyo.org/*
// @include http://uboachan.net/*
// @include http://*.uboachan.net/*
// @include http://aurorachan.net/*
// @include http://*.aurorachan.net/*
// @include http://sovietrussia.org/*
// ==/UserScript==

// ...and we're back!

/* DEFAULT SETTINGS
 * ----------------
 * This section contains the default, hard-coded options for various features.
 * The end user may edit these as desired.
 *
 * All options here are global, whereas those set by the Options Panel are
 * local to each board, due to cookie limitations.
 */

// TIP for the User: Set this option to false if you want to hard-code the
// options yourself without the options panel showing. All changes will then
// be site wide.
const DO_OPTIONS_PANEL 					= true;

const DO_QUICK_REPLY 					= true;
const DO_THREAD_EXPANSION 				= true;
const DO_POST_EXPANSION 				= true;
const DO_THREAD_HIDING 					= true;
const DO_GLOBAL_EXPANSION 				= true;
// Quick Sage is removed for the moment, so changing this will do nothing.
const DO_QUICK_SAGE 					= false;
const DO_IMAGE_EXPANSION 				= true;
const DO_PARTIAL_THREAD_EXPANSION 			= false;
const PARTIAL_THREAD_EXPANSION_LIMIT 			= 50;
const DO_PARTIAL_IMAGE_EXPANSION 			= true;
const PARTIAL_IMAGE_EXPANSION_WIDTH_LIMIT 		= 600;
const PARTIAL_IMAGE_EXPANSION_HEIGHT_LIMIT 		= 600;
const DO_FULL_IMAGE_EXPANSION_ON_SECOND_CLICK 		= true;
const DO_SHOW_STRETCHED_THUMBNAIL			= true;
const DO_SHOW_SLIDE_SHOW_LINK_ON_IMAGE_HOVER 		= true;
const DO_THREAD_NAVIGATION 				= true;
const DO_REPLY_INDICATOR 				= true;
const DO_QUOTED_POST_PREVIEW 				= false;

/* Version History
 * ---------------
 * 8/30/10 v1.0 Alpha: Rewrote code and lanched new alpha release.
 */

/* TODO
 * ----
 * Fix bugs that users report. (That includes all of you reading this!)
 * Improve display on 420chan's and with Desuchan's custom CSS.
 * Make internal settings and class names consistent with presentation,
   e.g., Discussion Compass is called Reply Indicators now.
 * Work on Quick Sage, or just drop it.
 * Add more try/except clauses and report exceptions more often. 
   (A simple, consistent exception-logging framework might be nice.)
 * = For Later =
 * Implement "Slideshow" feature. (Current section is dead code.)
 * Implement Thread Watcher and Thread Refresher.
 */


/* General-Purpose Objects, Prototypes, and Functions
 */

// The Null Object Pattern: Returning null is not sufficient for objects, so
// use this to return a null object.
var empty = new Object();

// Namespace resolver for document.evaluate()
function nsResolver (strPrefix)
{
  var namespaces = { "h" : "http://www.w3.org/1999/xhtml" };
  return namespaces[strPrefix];
}

// Object for moving elements around with the cursor by means of a handlebar.
function HandleBar( domHandleElement, domElementToMove, strCookieName )
{
  this.domHandle = domHandleElement;
  this.domElementToMove = domElementToMove;
  this._strCookieName = strCookieName;
  this.xOffset = 0;
  this.yOffset = 0;

  var objRef = this;
  domHandleElement.addEventListener( "mousedown", function( event )
  {
    objRef.drag( event )

    event.stopPropagation();
    event.preventDefault();
  }, false );
}

HandleBar.prototype.drag = function( event )
{
  this.xOffset = event.clientX - parseInt( this.domElementToMove.style.left );
  this.yOffset = event.clientY - parseInt( this.domElementToMove.style.top );

  var objRef = this;
  document.addEventListener( "mousemove", objRef.mouseMove = function( event )
  {
    objRef.moveElements( event );
  }, false );

  document.addEventListener( "mouseup", objRef.mouseUp = function( event )
  {
    if ( typeof objRef._strCookieName != "undefined" )
    {
      Cookie.setValue( objRef._strCookieName,
                       objRef.domElementToMove.style.left + ','
                       + objRef.domElementToMove.style.top );
    }
    objRef.cleanUpEventListeners();
  }, false );
};

HandleBar.prototype.moveElements = function( event )
{
  if ( event.button == 0 )
  {
    this.domElementToMove.style.left = ( event.clientX - this.xOffset ) + "px";
    this.domElementToMove.style.top = ( event.clientY - this.yOffset ) + "px";
  }
};

HandleBar.prototype.cleanUpEventListeners = function()
{
  document.removeEventListener( "mousemove", this.mouseMove, false );
  document.removeEventListener( "mouseup", this.mouseUp, false );
}

/* String prototype methods for encoding and decoding UTF-8 strings for cookie
 * storage. Based on code from
 * http://www.webtoolkit.info/javascript-url-decode-encode.html
 */
String.prototype.urlEncode = function()
{
  string = this.replace( /\r\n/g,"\n" );
  var utftext = "";

  for ( var n = 0; n < string.length; n++ )
  {
    var c = string.charCodeAt( n );

    if (c < 128)
    {
      utftext += String.fromCharCode( c );
    }
    else if ( ( c > 127 ) && ( c < 2048 ) )
    {
      utftext += String.fromCharCode( ( c >> 6 ) | 192 );
      utftext += String.fromCharCode( ( c & 63 ) | 128 );
    }
    else
    {
      utftext += String.fromCharCode( ( c >> 12 ) | 224 );
      utftext += String.fromCharCode( ( ( c >> 6 ) & 63 ) | 128 );
      utftext += String.fromCharCode( ( c & 63 ) | 128 );
    }
  }

  return escape(utftext);
}

String.prototype.urlDecode = function()
{
  var utftext = unescape(this);
  var string = "";
  var i = 0;
  var c = c1 = c2 = 0;

  while ( i < utftext.length )
  {
    c = utftext.charCodeAt(i);

    if ( c < 128 )
    {
      string += String.fromCharCode(c);
      i++;
    }
    else if ( ( c > 191 ) && ( c < 224 ) )
    {
      c2 = utftext.charCodeAt( i + 1 );
      string += String.fromCharCode( ( ( c & 31 ) << 6 ) | ( c2 & 63 ) );
      i += 2;
    }
    else
    {
      c2 = utftext.charCodeAt( i + 1 );
      c3 = utftext.charCodeAt( i + 2 );
      string += String.fromCharCode( ( ( c & 15 ) << 12 )
                                     | ( ( c2 & 63 ) << 6 ) | (c3 & 63) );
      i += 3;
    }
  }

  return string;
}

// contains() method for arrays. Returns boolean value indicating whether the
// argument passed is inside the array.
Array.prototype.contains = function( value )
{
  for ( var i = 0; i < this.length; ++i )
  {
    if ( this[i] == value )
      return true;
  }

  return false;
};

// Cookie object, for managing cookies, of course. Based on the algorithm
// from <wakaba3.js>.
var Cookie =
{
  getValue : function( strName )
  {
    var data = RegExp( "(^|;\\s+)" + strName + "=(.*?)(;|$)" )
		 .exec( document.cookie );
    if ( data && data.length > 2 )
      return data[2].toString().urlDecode();
    else
      return "";
  },

  setValue : function( strName, strValue, intDaysUntilExpiration )
  {
    var strExpiration = "";
    if ( intDaysUntilExpiration )
    {
       var dateObject = new Date;
       dateObject.setTime( dateObject.getTime() +
                           intDaysUntilExpiration *  86400000 );
       strExpiration = "; expires=" + dateObject.toGMTString();
    }

    document.cookie = strName + "=" + strValue + strExpiration + "; path=/";
  }
};

// DOM object creator. This should slim down the amount of code for a lot of
// stuff.
function TaggedElement( strTagName, arrAttributes)
{
  var domElement = document.createElement( strTagName );

  for ( var strAttribute in arrAttributes )
  {
    if ( strAttribute == "style" )
    {
     for ( var strStyleAttribute in arrAttributes["style"] )
     {
       var strJsCompliantName = strStyleAttribute;

       // ECMAScript namespace adjustments. z-index -> zIndex, etc.
       var intDashIndex = strJsCompliantName.indexOf("-");
       while ( intDashIndex != -1 )
       {
         strJsCompliantName = strJsCompliantName.substr( 0, intDashIndex )
         + strJsCompliantName.substr( intDashIndex + 1, 1 ).toUpperCase()
	 + strJsCompliantName.substr( intDashIndex + 2 );

         intDashIndex = strJsCompliantName.indexOf("-");
       }

       // float is reserved in ECMAScript.
       if ( strStyleAttribute == "float" )
         domElement.style.cssFloat = arrAttributes["style"][strStyleAttribute];
       else
         domElement.style[strJsCompliantName]
           = arrAttributes["style"][strStyleAttribute];
     }
    }
    else if ( strAttribute == "#text" )
    {
      domElement.textContent = arrAttributes["#text"];
    }
    else
    {
      domElement.setAttribute( strAttribute, arrAttributes[strAttribute] );
    }
  }

  return domElement;
}

// DOM helper function to replace a node with another.
function replaceNode( domNewNode, domNodeToReplace )
{
  domNodeToReplace.parentNode.replaceChild( domNewNode, domNodeToReplace );
}

// DOM helper function to encapsulate an element inside another, say an <img>
// inside a <div>, while maintaining position in the document tree otherwise.
function encapsulateNode( domNode, domNewParentNode )
{
  if ( domNode.parentNode == null )
    return false;

  replaceNode( domNewParentNode, domNode );
  domNewParentNode.appendChild( domNode );

  return true;
}

// DOM helper function to insert an element after another, without calling
// the parentNode.
function insertAfter( domNodeToInsert, domSiblingNode )
{
  if ( domSiblingNode.nextSibling )
    domSiblingNode.parentNode.insertBefore( domNodeToInsert,
                                            domSiblingNode.nextSibling );
  else
    domSiblingNode.parentNode.appendChild( domNodeToInsert );
}

// DOM helper function to insert an element before another, without calling
// the parentNode.
function insertBefore( domNodeToInsert, domSiblingNode )
{
  domSiblingNode.parentNode.insertBefore( domNodeToInsert, domSiblingNode )
}

// DOM function #47: "remove" a node (usually to resurrect it elsewhere).
function removeNode( domNodeToHit )
{
  domNodeToHit.parentNode.removeChild( domNodeToHit );
}

// Another string prototype method: Add a random query parameter
// at the end of the string.
String.prototype.addRandomQueryString = function()
{
  return this + "?desu=" + Math.floor( Math.random() * 399 );
};

// Ajax Functions
function Ajax( strUrl, strMethod )
{
  this._xmlHttp = new XMLHttpRequest();
  var xmlHttp = this._xmlHttp;

  var objRef = this;
  xmlHttp.onreadystatechange = function()
  {
    if ( xmlHttp.readyState == 4 )
    {
      objRef._intStatus = xmlHttp.status;
      objRef._strStatusTxt = xmlHttp.statusText;

      if ( xmlHttp.status == 200 )
      {
        objRef._responseXml = xmlHttp.responseXML;
        objRef._strResponseText = xmlHttp.responseText;

	objRef.onLoad();
      }
      else
      {
        objRef.onError();
      }
    }
  }

  xmlHttp.open( strMethod, strUrl, true );
  xmlHttp.send( null );

  return this;
}

Ajax.prototype.getResponseXml = function()
{
  return this._responseXml;
};

Ajax.prototype.getResponseText = function()
{
  return this._strResponseText;
};

Ajax.prototype.getStatus = function()
{
  return this._intStatus;
};

Ajax.prototype.getStatusCode = function()
{
  return "HTTP " + this._intStatus.toString() + ": " + this._strStatusTxt;
}

Ajax.prototype.abort = function()
{
  this._xmlHttp.abort();
}

// This function specifies the action to take when the XML request succeeds.
// It is to be defined by the calling function/object.
Ajax.prototype.onLoad = function() { };

// This function is the same as above, except it executes on error.
// The default is probably not the best for GUI purposes.
Ajax.prototype.onError = function()
{
  alert( this.getStatusCode() );
};

// Extract path from arbitrary URL.
function getPath( documentLocation )
{
  var regExpPathMatch = new RegExp ("://.*?/(.*)/");

  // Grab the board path via regular expression.
  // "http://www.desuchan.net/dir/subdir" would match as "dir/subdir"
  if ( regExpPathMatch.test( documentLocation ) )
    return regExpPathMatch.exec( documentLocation )[1];
  else
    return "/"; // Root directory. Might be possible somewhere.
}

// Extract the board path from URL to use as an identifier for cookies, etc.
function getBoardPath()
{
  strBoardDir = getPath( window.location.href );
}

/*
 * Global Variables
 */

// Keep track of whether meta or control key is being pressed.
var boolSpecialKeyIsDown = false;

// Namespace prefix for XHTML documents.
var strNs = document.evaluate( "count(/h:html)", document, nsResolver, 1,
             null ).numberValue > 0 ? "h:" : "";

// Is the current page a thread index? (Otherwise, it is a reply page.)
var boolPageIsThreadIndex = false;

// What type of board is this? (See getBoardType().)
var strBoardType = '';

// What board directory is this? (See getBoardPath().)
var strBoardDir = '';

// The path of the current board, as determined by getBoardPath() above.
var strCurrentBoard = "";

// The post field names vary according to the site.
var PostFields =
{
  "name"		: "field1",
  "link" 		: "field2",
  "subject" 		: "field3",
  "comment" 		: "field4",
  "file" 		: "file",
  "password" 		: "password",
  "captcha"		: "captcha",

  // Set field IDs by Wakaba flavor or board type.
  set : function()
  {
    if ( strBoardType == 'desuchan' )
    {
      this.link = "email";
      this.subject = "subject";
      this.comment = "comment";
    }
    else if ( window.location.href.indexOf( "2ch.ru/" ) != -1 )
    {
      this.name = "akane";
      this.link = "nabiki";
      this.subject = "kasumi";
      this.comment = "shampoo";
    }
    else if ( window.location.href.indexOf( "iichan.ru/" ) != -1 )
    {
      this.name = "nya1";
      this.link = "nya2";
      this.subject = "nya3";
      this.comment = "nya4";
    }
    else if ( strBoardType == "wakaba2" )
    {
      this.name = "name";
      this.link = "email";
      this.subject = "subject";
      this.comment = "comment";
    }
  }
};

// Form with ID "delform," which contains all threads and posts.
var domParentForm = null;

// Form with ID "postform," which contains... the post form.
var domPostForm = null;

/*
 * Options
 */

var Options =
{
  // The options themselves.
  doQuickReply			     : DO_QUICK_REPLY,
  doThreadExpansion		     : DO_THREAD_EXPANSION,
  doPostExpansion		     : DO_POST_EXPANSION,
  doThreadHiding		     : DO_THREAD_HIDING,
  doGlobalExpansion		     : DO_GLOBAL_EXPANSION,
  doQuickSage			     : DO_QUICK_SAGE,
  doImageExpansion		     : DO_IMAGE_EXPANSION,
  doPartialThreadExpansion	     : DO_PARTIAL_THREAD_EXPANSION,
  partialThreadExpansionLimit	     : PARTIAL_THREAD_EXPANSION_LIMIT,
  doPartialImageExpansion	     : DO_PARTIAL_IMAGE_EXPANSION,
  partialImageExpansionWidthLimit    : PARTIAL_IMAGE_EXPANSION_WIDTH_LIMIT,
  partialImageExpansionHeightLimit   : PARTIAL_IMAGE_EXPANSION_HEIGHT_LIMIT,
  doFullImageExpansionOnSecondClick  : DO_FULL_IMAGE_EXPANSION_ON_SECOND_CLICK,
  doShowSlideShowLinkOnImageHover    : DO_SHOW_SLIDE_SHOW_LINK_ON_IMAGE_HOVER,
  doShowStretchedThumbnail	     : DO_SHOW_STRETCHED_THUMBNAIL,
  doThreadNavigation		     : DO_THREAD_NAVIGATION,
  doReplyIndicator		     : DO_REPLY_INDICATOR,
  doQuotedPostPreview		     : DO_QUOTED_POST_PREVIEW,

  setOption
  : function( strOptionName, strOptionValue )
  {
    this[strOptionName] = strOptionValue;
    this.saveOptionsToCookie();
  },

  /* Method to save options to cookie. This is done to ensure cross-browser
   * compatibility, at the expense of some limitations. In particular, a
   * format is used to save options as a comma-delimited string:
   *
   * <doQuickReply>,<doThreadExpansion>,<doPostExpansion>,<doThreadHiding>,
   * <doQuickSage>,<doGlobalExpansion>,<doImageExpansion>,
   * <doPartialThreadExpansion>,<partialThreadExpansionLimit>,
   * <doPartialImageExpansion>,<partialImageExpansionWidthLimit>,
   * <partialImageExpansionHeightLimit>,<doFullImageExpansionOnSecondClick>,
   * <doThreadNavigation>,<doShowStretchedThumbnail>,
   * <doShowSlideShowLinkOnImageHover>, <doReplyIndicator>,
   * <doQuotedPostPreview>
   *
   * True values are 1; false values are 0. No spaces or line breaks are in the
   * string. This array naturally expands as new features are introduced; they
   * are in order of introduction since the Options Panel was first introduced,
   * to ensure cookie compatibility with older versions.
   */
  saveOptionsToCookie
  : function()
  {
    var strCookieData =
	Number( this.doQuickReply ).toString() + ","
	+ Number( this.doThreadExpansion ).toString() + ","
	+ Number( this.doPostExpansion ).toString() + ","
	+ Number( this.doThreadHiding ).toString() + ","
	+ Number( this.doQuickSage ).toString() + ","
	+ Number( this.doGlobalExpansion ).toString() + ","
	+ Number( this.doImageExpansion ).toString() + ","
	+ Number( this.doPartialThreadExpansion ).toString() + ","
	+ this.partialThreadExpansionLimit.toString() + ","
	+ Number( this.doPartialImageExpansion ).toString() + ","
	+ this.partialImageExpansionWidthLimit.toString() + ","
	+ this.partialImageExpansionHeightLimit.toString() + ","
	+ Number( this.doFullImageExpansionOnSecondClick ).toString() + ","
	+ Number( this.doThreadNavigation ).toString() + ","
	+ Number( this.doShowStretchedThumbnail ).toString() + ","
	+ Number( this.doShowSlideShowLinkOnImageHover ).toString() + ','
        + Number( this.doReplyIndicator ).toString() + ','
        + Number( this.doQuotedPostPreview ).toString();

    Cookie.setValue( "wkExtOptions", strCookieData, 9001 );
  },

  retrieveOptions
  : function()
  {
    var strCookieData = Cookie.getValue( "wkExtOptions" );
    if ( strCookieData == "" )
      return;

    arrCookieData = strCookieData.split( "," );

    this.doQuickReply = Boolean( parseInt( arrCookieData[0] ) );
    this.doThreadExpansion = Boolean( parseInt( arrCookieData[1] ) );
    this.doPostExpansion = Boolean( parseInt( arrCookieData[2] ) );
    this.doThreadHiding = Boolean( parseInt( arrCookieData[3] ) );
    this.doQuickSage = Boolean( parseInt( arrCookieData[4] ) );
    this.doGlobalExpansion = Boolean( parseInt( arrCookieData[5] ) );
    this.doImageExpansion = Boolean( parseInt( arrCookieData[6] ) );
    this.doPartialThreadExpansion = Boolean( parseInt( arrCookieData[7] ) );
    this.partialThreadExpansionLimit = parseInt( arrCookieData[8] )
				       || PARTIAL_THREAD_EXPANSION_LIMIT;
    this.doPartialImageExpansion = Boolean( parseInt( arrCookieData[9] ) );
    this.partialImageExpansionWidthLimit = parseInt( arrCookieData[10] )
                                        || PARTIAL_IMAGE_EXPANSION_WIDTH_LIMIT;
    this.partialImageExpansionHeightLimit = parseInt( arrCookieData[11] )
                                       || PARTIAL_IMAGE_EXPANSION_HEIGHT_LIMIT;
    this.doFullImageExpansionOnSecondClick
                                   = Boolean( parseInt( arrCookieData[12] ) );
    this.doThreadNavigation = Boolean( parseInt( arrCookieData[13] ) );
    this.doShowStretchedThumbnail = Boolean( parseInt( arrCookieData[14] ) );
    this.doShowSlideShowLinkOnImageHover
                                   = Boolean( parseInt( arrCookieData[15] ) );
    this.doReplyIndicator = Boolean( parseInt( arrCookieData[16] ) );
    this.doQuotedPostPreview = Boolean( parseInt( arrCookieData[17] ) );
  }
};

/* Determine board type.
 * This needs to be run when Wakaba Extension starts!
 */
function getBoardType()
{
  // 420chan custom
  if ( document.evaluate( "count(//" + strNs + "div[@class='hoz'])", document,
                          nsResolver, 1, null ).numberValue > 0 )
    strBoardType = 'taimaba';
  // Desuchan custom
  else if ( document.evaluate( "count(//" + strNs + "a[contains(@href," 
                               + "'wakaba.pl?task=edit')])", domParentForm,
                               nsResolver, 1, null ).numberValue > 0 )
    strBoardType = 'desuchan';
  else
    strBoardType = 'wakaba';
}

/* Option Panel
 */

// Option Widget Object
function OptionWidget( strName, intType, parent, strOption )
{
  this.intNestDepth = 0;
  this.strOptionName = strName;

  if ( parent )
    this.intNestDepth = parent.intNestDepth + 1;

  this.domElement =
    new TaggedElement( "label", { "style" :
    { "margin-left" : this.intNestDepth.toString() * 2 + "em" } } );
  if ( intType == 0 )  // Checkbox.
  {
    var domCheckbox =
      new TaggedElement( "input", { "type" : "checkbox",
                                    "name" : strOption } );

    // Set checkbox to reflect current setting.
    if ( Options[strOption] )
      domCheckbox.setAttribute( "checked", "checked" );

    // Alter setting in realtime as option is checked.
    this.domElement.addEventListener( "mouseup", function( event )
    {
        Options.setOption( strOption, !( Options[strOption] ) );
    }, false );

    this.domElement.appendChild( domCheckbox );
    this.domElement.appendChild( document.createTextNode( strName ) );
  }
  else  // Text field.
  {
    var domTextField =
      new TaggedElement( "input", { "type"  : "text",
                                    "name"  : strOption,
				    "size"  : "2",
                                    "value" : Options[strOption] } );

    domTextField.addEventListener( "keyup", function( event )
    {
      Options.setOption( strOption, event.target.value );
    }, false );

    // "%f" is used in strName parameter to indicate field placement.
    // Each OptionWidget corresponds to only one option, thus only one field.
    var arrSplitText = strName.split( "%f" );

    this.domElement.appendChild( document.createTextNode( arrSplitText[0] ) );
    this.domElement.appendChild( domTextField );
    if ( arrSplitText[1] )
    {
      this.domElement
          .appendChild( document.createTextNode( arrSplitText[1] ) );
    }
  }
}

// Option Panel Object.
function OptionPanel( arrOptions )
{
  // Grab previous coordinates of the option panel, if available/applicable.
  var strCoordinates = Cookie.getValue( "wkExtOptionPanelCoordinates" );
  var arrCoordinates = ( strCoordinates != "" )
			? strCoordinates.split( RegExp( "," ) )
			: new Array ("10px", "300px");

  // Option panel wrapper element.
  var domPanelWrapper = new TaggedElement
			  ( "div", { "class" : "reply",
				     "style" : { "width" : "300px",
						 "font-size" : "small",
						 "position" : "absolute",
						 "left" : arrCoordinates[0],
						 "top" : arrCoordinates[1],
						 "z-index" : "250",
						 "border-style" : "solid",
						 "border-width" : "1px",
						 "padding" : "2px 2px 2px 2px"
						  } } );

  // Title bar.
  var optionPanelHandle = new TaggedElement
			    ( "div", { "style" : { "width" : "100%",
						   // "opacity" : "0.6",
						   "background" : "white",
						   "cursor" : "move" } } );

  // Title bar text.
  var domHeader = new TaggedElement
		    ( "div", { "#text" : "Wakaba Extension",
			       "style" : { "font-weight" : "bold",
					   "font-family" : "sans-serif",
                                           'color'       : 'black' } } );

  // Form.
  var domForm = new TaggedElement
		  ( "form", { "action" : window.location.href,
			      "method" : "get" } );

  // Options pane.
  this.domWidgetDiv = new TaggedElement( "div", { "style" : { "clear" : "both",
					 "display" : "none" } } );

  // Hide/show link.
  this.domToggleLink = new TaggedElement
			( "a", { "href" : "#",
				 "#text" : "Show Options",
				 "style" : { "float" : "left",
					     "margin-right" : "1em" } } );

  // Toggle state of options pane.
  this._boolOptionsShown = false;

  var objRef = this;
  this.domToggleLink.addEventListener( "click", function( event )
  {
    objRef.toggleOptionPaneDisplay();

    event.stopPropagation();
    event.preventDefault();
  }, false );

  // Reload button.
  var domReloadButton = new TaggedElement
			  ( "input", { "type" : "submit",
				       "name" : "panelsubmit",
				       "value" : "Reload Page",
				       "style" : { "float" : "right" } } );

  domReloadButton.addEventListener( "click", function( event )
  {
    window.location.reload();

    event.stopPropagation();	// Do not submit the form.
    event.preventDefault();
  }, false );

  // Create object widgets and attach to domWidgetDiv property.
  var threadExpandOpt = new OptionWidget( "Enable Thread Expansion", 0, null,
                                          "doThreadExpansion" );
  var partialThrExpOpt = new OptionWidget( "Enable Partial Thread Expansion",
                           0, threadExpandOpt, "doPartialThreadExpansion" );
  var imageExpandOpt = new OptionWidget( "Enable Image Expansion", 0, null,
                                         "doImageExpansion" );
  var partialImageExpandOpt =
    new OptionWidget( "Enable Partial Image Expansion", 0, imageExpandOpt,
                      "doPartialImageExpansion" );
  var arrAllOptions = new Array(
    new OptionWidget( "Enable Thread Hiding.", 0, null, "doThreadHiding" ),
    threadExpandOpt,
    partialThrExpOpt,
    new OptionWidget( "Expand to %f posts", 1, partialThrExpOpt,
                      "partialThreadExpansionLimit" ),
    imageExpandOpt,
    new OptionWidget( "Show stretched thumbnail.", 0, imageExpandOpt,
                      "doShowStretchedThumbnail" ),
    partialImageExpandOpt,
    new OptionWidget( "Maximum pixel width: %f", 1, partialImageExpandOpt,
                      "partialImageExpansionWidthLimit" ),
    new OptionWidget( "Maximum pixel height: %f", 1, partialImageExpandOpt,
                      "partialImageExpansionHeightLimit" ),
    new OptionWidget( "Enable Post Expansion", 0, null, "doPostExpansion" ),
    new OptionWidget( "Enable Expand-All Links", 0, null,
                      "doGlobalExpansion" ),
    new OptionWidget( "Enable Quick Reply", 0, null, "doQuickReply" ),
    /* new OptionWidget( "Enable Quick Sage", 0, null, "doQuickSage" ), */
    new OptionWidget( "Enable Thread-Jump Links", 0, null,
                      "doThreadNavigation" ),
    new OptionWidget( "Enable Reply Indicators", 0, null,
                      "doReplyIndicator" ),
    new OptionWidget( "Enable Post Preview", 0, null, "doQuotedPostPreview" )
  );

  for ( var i = 0; i < arrAllOptions.length; ++i )
    this.addOptionWidget( arrAllOptions[i] );

  // Attach all elements together into a single panel.
  domPanelWrapper.appendChild( optionPanelHandle );
  optionPanelHandle.appendChild( domHeader );
  domPanelWrapper.appendChild( domForm );
  domForm.appendChild( this.domToggleLink );
  domForm.appendChild( domReloadButton );
  domForm.appendChild( this.domWidgetDiv );

  // Attach completed Option Panel DOM element.
  domParentForm.appendChild( domPanelWrapper );

  // Make option panel moveable.
  new HandleBar( optionPanelHandle, domPanelWrapper,
                 "wkExtOptionPanelCoordinates" );
}

OptionPanel.prototype.addOptionWidget = function( widget )
{
  // The place to append widget's DOM object depends on its ancestry (if any).
  if ( !widget.parent )
  {
    this.domWidgetDiv.appendChild( widget.domElement );
    this.domWidgetDiv.appendChild( new TaggedElement( "br" ) );  // "Newline."
  }
  else
  {
    widget.parent.appendChild( widget.domElement );
    widget.parent.appendChild( new TaggedElement( "br" ) );
  }
}

OptionPanel.prototype.toggleOptionPaneDisplay = function()
{
  if ( !this._boolOptionsShown )
  {
    this.domToggleLink.textContent = "Hide Options";
    this.domWidgetDiv.style.display = "";
  }
  else
  {
    this.domToggleLink.textContent = "Show Options";
    this.domWidgetDiv.style.display = "none";
  }

  this._boolOptionsShown = !this._boolOptionsShown;
}

/* Inline Image Expander
 */
var InlineImageExpander =
{
  expand   : function( domDivContainingImage, intWidth, intHeight,
                       domFullImage, domThumb )
  {
    // Set up style and size attributes for the expanded image.
    // (Let the method take care of type conversion.)
    domFullImage.setAttribute( "width", intWidth );
    domFullImage.setAttribute( "height", intHeight );

    domFullImage.style.marginLeft = ( -intWidth - 20 ) + 'px';

    // If the image is already attached, simply unhide it. Otherwise, add it.
    if ( !domFullImage.getAttribute( "src" ) )
    {
      domFullImage.setAttribute( "src",
                                domDivContainingImage.getAttribute( "href" ) );
      domFullImage.setAttribute( "class", "thumb expanding" );
      domDivContainingImage.appendChild( domFullImage );

      var domLoadBar = new TaggedElement( "div",
		{ "#text" : "(\u00B4\u30FB\u03C9\u30FB`) Loading!",
		  "style" : { "font-size" : "20px",
			      "background-color" : "red",
			      "color" : "white",
			      "padding" : "5px 5px 5px 5px",
			      "margin" : "2px 20px",
			      "position" : "absolute",
			      "white-space" : "nowrap",
			      "width" : "auto",
			      "opacity" : 0.8,
			      "z-index" : 254 } } );

      insertBefore( domLoadBar, domDivContainingImage );
    }
    else
    {
      domFullImage.style.display = "";

      // Make thumb invisible if full image has loaded.
      if ( domFullImage.getAttribute( "class" ) == "thumb expanded" )
        domThumb.style.visibility = "hidden";
    }

    // Stretch thumbnail accordingly, if option is set.
    domThumb.setAttribute( "width", intWidth );
    domThumb.setAttribute( "height", intHeight );

    if ( !Options.doShowStretchedThumbnail )
      domThumb.style.visibility = "hidden";

    var objRef = this;
    domFullImage.addEventListener( "load", function( event )
    {
      objRef.finishedExpansionHandler( domLoadBar, domThumb, event.target );
    }, false );
  },

  collapse : function( domFullImage, domThumb, originalWidth, originalHeight )
  {
    domFullImage.style.display = "none";
    domThumb.style.visibility = "visible";
    domThumb.setAttribute( "height", originalHeight );
    domThumb.setAttribute( "width", originalWidth );
  },

  finishedExpansionHandler : function( domLoadBar, domThumb, domFullImage )
  {
    // Hide loading message.
    domLoadBar.style.display = "none";

    // Hide thumbnail if the image was not collapsed prior to loading.
    if ( domFullImage.style.display != "none" )
      domThumb.style.visibility = "hidden";

    // Change target's class name.
    domFullImage.setAttribute( "class", "thumb expanded" );
  }
};

/*
 * Slide Show
 */

// The value of each slide node is defined in the SlideContent object.
function SlideContent( strNext, strPrev, DOMDiv )
{
  // Next Image URL
  this.strURLNext	= strNext;

  // Previous URL, for a doubly linked list.
  this.strURLPrevious	= strPrev;

  // Generic comment division.
  this.domCommentDiv	= DOMDiv;
}

// Slide Reel Object (Actually a Doubly-Linked List)
function SlideReel()
{
}

SlideReel.prototype.addSlide = function() { };
SlideReel.prototype.removeSlide = function() { };

var SlideShow =
{
  slideReel		: new Object,

  expand		: function( imageURL )
  {

  },

  collapse 		: function()
  {

  }
};

var SlideProjector =
{
  attachPostLink		: function( intPostNum )
  {

  },

  attachStartLink		: function(  )
  {
  },

  prepare			: function( arrUrls )
  {
  }
};

/*
 * Image Expansion Set Up
 */

function ImageExpansionHandler( domImageToHandle )
{
  this._domImageToHandle = domImageToHandle;
  this._domParentLink = domImageToHandle.parentNode;

  // Is an image attached here?
  var boolFullImageAttached	= false;

  // Grab Source File Dimensions.
  var snapshotFileSize = document.evaluate( "preceding-sibling :: "
        + strNs + "span[@class='filesize']", this._domParentLink,
	nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

  var strFileSizeText = snapshotFileSize.snapshotItem
			 ( snapshotFileSize.snapshotLength - 1 ).textContent;

  var arrDimensions = RegExp( ", (\\d+)\\D(\\d+)" ).exec( strFileSizeText );

  if ( !arrDimensions )
    return;

  this._intSrcWidth = parseInt( arrDimensions[1] );
  this._intSrcHeight = parseInt( arrDimensions[2] );

  // Do not handle non-image files.
  if ( this._intSrcWidth == 0 )
    return empty;

  this._intThumbWidth = parseInt( domImageToHandle.getAttribute( "width" ) );
  this._intThumbHeight = parseInt( domImageToHandle.getAttribute( "height" ) );

  // Element to display the full image.
  this._domFullImage = new TaggedElement( "img", { "style" :
                                     { "z-index" : 128,
                                       "float"   : "left" } } );

  /* Variable describing state of the image. There are three states total!
   *
   * 0: Not Expanded
   * 1: Partially Expanded
   * 2: Fully Expanded
   */
  this._intImageState = 0;

  domImageToHandle.style.zIndex = 1;
  domImageToHandle.style.cssFloat = "left";

  var objRef = this;
  this._domParentLink.addEventListener( "click", function( event )
  {
    event.stopPropagation();
    event.preventDefault();

    // Call in reference to parent ImageExpansionHandler object.
    objRef.toggleImageState();
  }, false );
}

ImageExpansionHandler.prototype.imageState = function()
{
  return this._intImageState;
};

// Enclosed function that expands an image partway by calling an appropriate
// method.
ImageExpansionHandler.prototype.expandImagePartially = function()
{
  var intNewWidth = this._intSrcWidth;
  var intNewHeight = this._intSrcHeight;

  if ( this._intSrcWidth > Options.partialImageExpansionWidthLimit
       && Options.partialImageExpansionWidthLimit > 0 )
  {
    intNewWidth = Options.partialImageExpansionWidthLimit;
    intNewHeight = Math.floor(
		   intNewWidth * ( this._intSrcHeight / this._intSrcWidth ) );
  }

  if ( intNewHeight > Options.partialImageExpansionHeightLimit
       && Options.partialImageExpansionHeightLimit > 0 )
  {
    intNewWidth = Math.floor( Options.partialImageExpansionHeightLimit
	          * ( intNewWidth / intNewHeight ) );
    intNewHeight = Options.partialImageExpansionHeightLimit;
  }

  InlineImageExpander.expand( this._domParentLink, intNewWidth, intNewHeight,
			      this._domFullImage, this._domImageToHandle );
};

// Fully expand an image by calling the appropriate method.
ImageExpansionHandler.prototype.expandImageFully = function()
{
  InlineImageExpander.expand( this._domParentLink, this._intSrcWidth,
		 	      this._intSrcHeight, this._domFullImage,
                              this._domImageToHandle );
};

// Revert an expanded image.
ImageExpansionHandler.prototype.collapseImage = function()
{
  InlineImageExpander.collapse( this._domFullImage, this._domImageToHandle,
				this._intThumbWidth, this._intThumbHeight )
};

// Toggle image expansion. This function is called by an event handler.
ImageExpansionHandler.prototype.toggleImageState = function()
{
  if ( this._intImageState == 2 )
  {
    this.collapseImage();
    this._intImageState = 0;
  }
  else if ( this._intImageState == 1
          || ( this._intImageState == 0 && !Options.doPartialImageExpansion )
          || ( this._intSrcHeight <= Options.partialImageExpansionHeightLimit
            && this._intSrcWidth <= Options.partialImageExpansionWidthLimit ) )
  {
    this.expandImageFully();
    this._intImageState = 2;
  }
  else
  {
    this.expandImagePartially();
    this._intImageState = 1;
  }
};

/* Thread Organizer and Division
 * -----------------------------
 * These objects are necessary to Thread Hiding, Thread Expansion, and Thread
 * Navigation.
 */

// Return an array of threads.
function ThreadArray()
{
  var arrThreadDivs = new Array();

  // XPath string for element used to keep threads separate.
  var strSepElement;
 
  if ( strBoardType == 'desuchan' )
    strSepElement = 'div[@id]';
  else if ( strBoardType == 'taimaba' ) 
    strSepElement = "div[@class='hoz']";
  else
    strSepElement = 'hr';

  // Snapshot of all thread dividers (<hr/>) on the page.
  var snapshotRules =
    document.evaluate( ".//" + strNs + strSepElement, domParentForm, 
                       nsResolver,
                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

  // Account for top thread separately (due to page layout).
  // (Desuchan puts all threads into divs already.)
  if ( strBoardType != 'desuchan' )
    arrThreadDivs.push( new ThreadDivision( null ) );

  for ( var i = 0; i < snapshotRules.snapshotLength; ++i )
  {
    var j = new ThreadDivision( snapshotRules.snapshotItem( i ) );
    // Test for successful thread division through duck-typing.
    if ( j != null && typeof j.domThreadDiv != 'undefined' )
      arrThreadDivs.push( j );
  }

  return arrThreadDivs;
}

function ThreadDivision( domSeparator )
{
  if ( strBoardType == 'desuchan' )
  {
    try
    {
      this.intThreadId = parseInt( RegExp( "^t(\\d+)$" )
                          .exec( domSeparator.getAttribute( 'id' ) )[1] );
      this.domThreadDiv = domSeparator;

      return this;
    }
    catch ( e )
    {
      return empty;
    }
  }
  
  var snapshotAllElementsFollowing;

  if ( domSeparator == null )
  {
    this.intThreadId = document.evaluate( ".//" + strNs + "a[@name][1]",
      domParentForm, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null )
      .singleNodeValue.getAttribute( "name" );

    snapshotAllElementsFollowing = document.evaluate( "./"
      + "node()", domParentForm, nsResolver, 
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
  }
  else
  {
    domSeparator.style.clear = "both";

    try
    {
      this.intThreadId = document.evaluate("following :: " + strNs
			       + "a[@name][1]", domSeparator, nsResolver,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null)
			       .singleNodeValue.getAttribute( "name" );
    }
    catch ( e ) // No node acquired.
    {
      return empty;
    }

    snapshotAllElementsFollowing = document.evaluate( "following-sibling :: "
                + "node()", domSeparator, nsResolver,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
  }

  this.domThreadDiv = new TaggedElement( "div", { "class" : "threaddiv" } );

  for (var i = 0; i < snapshotAllElementsFollowing.snapshotLength; ++i)
  {
    var currentDiv = snapshotAllElementsFollowing.snapshotItem( i );

    // Test 'hr' and 'div' of the 'hoz' class (taimaba).
    if ( currentDiv.nodeName.toLowerCase() == "hr" 
         || currentDiv.nodeName.toLowerCase() == 'div' 
            && currentDiv.getAttribute( 'class' ) == 'hoz' )
      break;
    else
    {
      removeNode( snapshotAllElementsFollowing.snapshotItem( i ) );
      this.domThreadDiv.appendChild
			( snapshotAllElementsFollowing.snapshotItem( i ) );
    }
  }

  if ( domSeparator == null )
    insertBefore( this.domThreadDiv,
		  snapshotAllElementsFollowing.snapshotItem( i ) );
  else
    insertAfter( this.domThreadDiv, domSeparator );

  return this;
}

/*
 * Thread Hider
 */

function ThreadHider( thread )
{
  if ( !thread.domThreadDiv )
    return;

  // Boolean indicating whether thread is hidden or not.
  this._boolThreadHidden = false;

  // Grab pointer to DOM element.
  this._domThreadDiv = thread.domThreadDiv;

  // Hide/show link.
  this._domThreadToggleLink = new TaggedElement( "a",
					{ "#text" : "Hide Thread (\u2212)",
					  "href" : "#",
					  "class" : "threadtoggle",
					  "style" : { "float" : "right" } } );

  // Message to appear when thread is hidden.
  this._domThreadHiddenMsg = new TaggedElement( "div",
				{ "#text" : "Thread " + thread.intThreadId
					     + " Hidden.",
				  "style" : { "float" : "left",
					      "font-weight" : "bold",
				              "display" : "none" } } );

  // Insert new elements.
  insertBefore( this._domThreadToggleLink, this._domThreadDiv );
  insertBefore( this._domThreadHiddenMsg, this._domThreadDiv );

  // Set up thread hiding.
  var objRef = this;
  this._domThreadToggleLink.addEventListener( "click", function( event )
  {
    objRef.toggleThreadState();

    event.stopPropagation();
    event.preventDefault();
  }, false );

  this._intThreadId = thread.intThreadId;

  return this;
}

ThreadHider.prototype.showThread = function()
{
  this._domThreadDiv.style.display = "";  // Hide using style attribute.
  this._domThreadToggleLink.textContent = "Hide Thread (\u2212)";
  this._domThreadHiddenMsg.style.display = "none";

  this._boolThreadHidden = false;
};

ThreadHider.prototype.hideThread = function()
{
  this._domThreadDiv.style.display = "none";
  this._domThreadToggleLink.textContent = "Show Thread (+)";
  this._domThreadHiddenMsg.style.display = "";

  this._boolThreadHidden = true;
};

ThreadHider.prototype.toggleThreadState = function()
{
  if ( !this._boolThreadHidden )
  {
    this.hideThread();
    this.addToCookie();
  }
  else
  {
    this.showThread();
    this.removeFromCookie();
  }
};

/*
 * Methods to add or remove thread ID from cookie, to specify which threads
 * should be hidden when the page is reloaded. Note, however, that it is the
 * responsibility of the caller (WakabaExtension) to hide the threads by
 * calling hideThread().
*/
ThreadHider.prototype.addToCookie = function()
{
  var strCurrentVal = Cookie.getValue( "wkExtHiddenThreads_" + strBoardDir );
  Cookie.setValue( "wkExtHiddenThreads_" + strBoardDir,
		   this._intThreadId.toString() + "," + strCurrentVal );
};

ThreadHider.prototype.removeFromCookie = function()
{
  var strCurrentVal = Cookie.getValue( "wkExtHiddenThreads_" + strBoardDir );
  Cookie.setValue( "wkExtHiddenThreads_" + strBoardDir, strCurrentVal.replace(
	           RegExp( this._intThreadId.toString() + ",", "g" ), "" ) );
};

// Public accessor.
ThreadHider.prototype.getThreadId = function()
{
  return this._intThreadId;
};

/* Thread Expansion
 */

function ThreadExpander( thread )
{
  if ( !thread.domThreadDiv )
    return empty;

  var regExpThreadUrlTest;
  this._strUrlOfReplies = null;
  this._domThreadAnnexDiv = this._createNewThreadAnnexDiv();

  // Copy thread ID for use with Quick Reply in appended posts.
  this._intThreadId = thread.intThreadId;

  /*
   * intThreadStatus describes whether the thread is expanded or is loading
   * new content. Codes:
   * 0 : Not expanded
   * 1 : AJAX instance active (and may be aborted)
   * 2 : Expanded
   * 3 : Partially expanded
   */
  this.intThreadStatus = 0;
  this._domExpandLink = new TaggedElement ( "a", { "href" : "#",
	"class" : "threadexpandlink", "#text" : "Show All" } );
  this._threadDiv = thread;

  this._domOmittedNotice = document.evaluate( ".//" + strNs +
  	"span[@class='omittedposts'][1]", thread.domThreadDiv, nsResolver,
	XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

  // If no posts are omitted, this object is unnecessary.
  if ( !this._domOmittedNotice )
    return empty;

  this._strOriginalNotice = this._domOmittedNotice.textContent;

  var snapshotPostIds = document.evaluate( ".//" + strNs + "table//"
	+ strNs + "a[@name][1]", thread.domThreadDiv,
	nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

  this._intEarliestPost =
    parseInt( snapshotPostIds.snapshotItem( 0 ).getAttribute( "name" ) );

  // Reply URL varies among board types.
  if ( strBoardType != 'kareha' )
  {
    regExpThreadUrlTest
      = new RegExp( "/res/" + thread.intThreadId + ".(?:x?html?$|php)" );
  }
  else
    regExpThreadUrlTest = new RegExp( "/kareha.pl/" + thread.intThreadId );

  var snapshotLinksInside = document.evaluate( ".//" + strNs + "a[@href]",
				thread.domThreadDiv, nsResolver,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

  if ( !snapshotLinksInside )
    return;

  for ( var i = 0; i < snapshotLinksInside.snapshotLength; ++i )
  {
    if ( regExpThreadUrlTest.test( snapshotLinksInside.snapshotItem( i )
				   .getAttribute( "href" ) ) )
    {
      this._strUrlOfReplies = snapshotLinksInside.snapshotItem( i )
			      .getAttribute( "href" );
      break;
    }
  }

  if ( this._strUrlOfReplies == null )
    return;

  // Insert "[Expand]" link.
  var leftBracket = document.createTextNode( "[" );
  insertAfter( leftBracket, this._domOmittedNotice );
  insertAfter( this._domExpandLink, leftBracket );
  var rightBracket = document.createTextNode( "]" )
  insertAfter( rightBracket, this._domExpandLink );
  insertAfter( this._domThreadAnnexDiv, rightBracket );

  var objRef = this;
  this._domExpandLink.addEventListener( "click", function( event )
  {
    objRef.toggle( false );

    event.stopPropagation();
    event.preventDefault();
  }, false );

  this._domPartialExpandLink = empty;

  // Insert "[Expand Partially]" link.
  if ( Options.doPartialThreadExpansion )
  {
    // Check to see if the link is necessary, first.
    var intPostCount = parseInt( RegExp( "\\d+" )
                       .exec( this._domOmittedNotice.textContent )[0] );

    if ( intPostCount > Options.partialThreadExpansionLimit )
    {
      this._domPartialExpandLink =
        new TaggedElement( "a", { "href" : "#",
                        "#text" : "Show " + Options.partialThreadExpansionLimit
                                  + " latest"  } );

      insertBefore( document.createTextNode( "[" ), this._domThreadAnnexDiv );
      insertBefore( this._domPartialExpandLink, this._domThreadAnnexDiv );
      insertBefore( document.createTextNode( "]" ), this._domThreadAnnexDiv );

      this._domPartialExpandLink.addEventListener( "click", function( event )
      {
        objRef.toggle( true );

        event.stopPropagation();
        event.preventDefault();
      }, false );
    }
  }
}

ThreadExpander.prototype.expand = function( boolPartial )
{
  this._ajaxInstance = new Ajax( this._strUrlOfReplies, "GET" );
  var domAnnexDiv = this._domThreadAnnexDiv;
  var intEarliestPost = this._intEarliestPost;
  var intExpandLimit = Options.partialThreadExpansionLimit;

  var domCurrentLink;
  if ( boolPartial )
  {
    domCurrentLink = this._domPartialExpandLink;
    this._domExpandLink.textConent = "Show All";
  }
  else
  {
    domCurrentLink = this._domExpandLink;
    if ( this._domPartialExpandLink != empty )
    {
      this._domPartialExpandLink.textContent = "Show " + intExpandLimit
                                               + " Latest";
    }
  }

  // Set up cancel link.
  domCurrentLink.textContent = "Cancel";
  this.intThreadStatus = 1;

  this._domOmittedNotice.textContent = "Loading! ";

  var objRef = this;
  this._ajaxInstance.onLoad = function()  // Set up behavior on AJAX response.
  {
    var xmlResponse = this.getResponseXml();
    if ( xmlResponse )
    {
      var domThreadPage = xmlResponse.documentElement;

      var snapshotAllReplies = xmlResponse.evaluate( ".//" + strNs
	+ "table[descendant :: " + strNs + "td[@class='reply']]",
	domThreadPage, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null );

      var intReplyCount = snapshotAllReplies.snapshotLength;

      var intStart = ( boolPartial && intReplyCount > intExpandLimit )
		       ? intReplyCount - intExpandLimit : 0;

      for ( var i = intStart; i < intReplyCount; ++i )
        domAnnexDiv.appendChild( snapshotAllReplies.snapshotItem( i ) );
    }
    else
    {
      var strReplyPage = this.getResponseText();
      var strContentToAdd = "";

      // Parse all of the posts on the page through RegExp.
      arrAllPosts = strReplyPage.match( RegExp( "<table>\\s*?<tbody>\\s*?<tr>"
        + "\\s*?<td class=\\\"doubledash\\\">[^\0]*?<td class=\\\"reply\\\" "
        + "id=\\\"reply\\d+\\\">[^\0]*?</table>", "g" ) );

      var intReplyCount = arrAllPosts.length;

      var intStart = ( boolPartial && intReplyCount > intExpandLimit )
		       ? intReplyCount - intExpandLimit : 0;

      for ( var i = intStart; i < intReplyCount; ++i )
      {
        var intPostNumber =
          parseInt( RegExp("<td class=\\\"reply\\\" id=\\\"reply(\\d+)\\\">" )
                    .exec( arrAllPosts[i] )[1] );

        if ( intPostNumber >= intEarliestPost )
          break;

        strContentToAdd += arrAllPosts[i];
      }

      // Add extracted HTML of posts. Ew, I know. :(
      domAnnexDiv.innerHTML = strContentToAdd;
    }

    objRef._domOmittedNotice.textContent =
      ( boolPartial ) ? "Showing last " + intExpandLimit + " posts. "
                        : "Showing All Posts. ";

    domCurrentLink.textContent = "Collapse";
    objRef.intThreadStatus = ( boolPartial ) ? 3 : 2;

    objRef.convertLinks();

    WakabaExtension.initNewContent( objRef._domThreadAnnexDiv,
                                    objRef._intThreadId );
  };
};

ThreadExpander.prototype.collapse = function()
{
  // Replace thread annex with one that is empty.
  removeNode( this._domThreadAnnexDiv );
  this._domThreadAnnexDiv = this._createNewThreadAnnexDiv();
  if ( this._domPartialExpandLink != empty )
  {
    insertAfter( this._domThreadAnnexDiv,
                 this._domPartialExpandLink.nextSibling );
  }
  else
    insertAfter( this._domThreadAnnexDiv, this._domExpandLink.nextSibling );

  // Restore "posts omitted" message.
  this._domOmittedNotice.textContent = this._strOriginalNotice;

  // Update expansion links.
  this._domExpandLink.textContent = "Show All";
  if ( this._domPartialExpandLink != empty )
  {
    this._domPartialExpandLink.textContent =
      "Show " + Options.partialThreadExpansionLimit + " latest";
  }

  this.intThreadStatus = 0;

  this.convertLinks();
};

ThreadExpander.prototype.toggle = function( boolPartial )
{
  switch ( this.intThreadStatus )
  {
    case 3:				// Partially expanded
      this.collapse();
      if ( !boolPartial )
        this.expand( false ); 		// Expand competely.
      break;
    case 2:				// Expanded
      this.collapse();
      if ( boolPartial )
        this.expand( true );		// Expand partially.
      break;
    case 1:				// AJAX active
      this.cancelThreadExpansion();
      break;
    default:				// Unexpanded
      this.expand( boolPartial );
  }
};

ThreadExpander.prototype.cancelThreadExpansion = function()
{
  this._ajaxInstance.abort();
  this.collapse();
};

ThreadExpander.prototype._createNewThreadAnnexDiv = function()
{
  return new TaggedElement ( "div", { "class" : "threadexpand" } );
};

ThreadExpander.prototype.convertLinks = function()
{
  var snapshotLinksToConvert;

  if ( this.intThreadStatus > 1 )
  {
    // Remove reply page references if present.
    snapshotLinksToConvert = document.evaluate( ".//" + strNs
      + "blockquote//" + strNs + "a[contains(@href, '"
      + this._strUrlOfReplies + "') and contains(child::text()[1], '>>')]",
      this._threadDiv.domThreadDiv, nsResolver,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

    for ( var i = 0; i < snapshotLinksToConvert.snapshotLength; ++i )
    {
      var strPostUrl
	= snapshotLinksToConvert.snapshotItem( i ).getAttribute( "href" );

      // Alter reference to thread replies.
      strPostUrl =
	strPostUrl.replace( RegExp( this._strUrlOfReplies + "#" ), "#" );

      // Alter refrences to thread OP.
      strPostUrl =
	strPostUrl.replace( RegExp( this._strUrlOfReplies ),
	"#" + this._threadDiv.intThreadId.toString() );

      snapshotLinksToConvert.snapshotItem( i )
			    .setAttribute( "href", strPostUrl );
    }
  }
  else
  {
    // Add reply page URL back to links.
    snapshotLinksToConvert = document.evaluate( ".//" + strNs
	+ "blockquote//" + strNs + "a[substring(@href,1,1) = '#']",
	this._threadDiv.domThreadDiv, nsResolver,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

    for ( var i = 0; i < snapshotLinksToConvert.snapshotLength; ++i )
    {
      snapshotLinksToConvert.snapshotItem( i )
	.setAttribute( "href", this._strUrlOfReplies
	+ snapshotLinksToConvert.snapshotItem( i ).getAttribute( "href" ) );
    }
  }
};

/*
 * Global Expansion
 */

function GlobalExpansion( arrImgExpanders, arrThreadExpanders )
{
  // Is this a page needing threading?
  var boolThreadExpansion = Options.doThreadExpansion && boolPageIsThreadIndex;

  // My worthiness is dependent on two conditions.
  if ( boolThreadExpansion || Options.doImageExpansion )
  {
    // Save all ImageExpander and ThreadExpander objects as properties.
    this._arrImgExpanders = arrImgExpanders;
    this._arrThreadExpanders = arrThreadExpanders;

    var objRef = this;

    // Grab horizontal rule just below the post area.
    var domFirstHr = document.evaluate( "preceding-sibling :: "
      + strNs + "hr", domParentForm, nsResolver,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

    if ( domFirstHr == null ) // Encountered on one site...
    {
      domFirstHr = new TaggedElement( "hr" );
      insertBefore( domFirstHr, domParentForm );
    }

    insertBefore( new TaggedElement( "hr" ), domFirstHr );

    if ( boolThreadExpansion )
    {
      this._domGlobalThdExp = new TaggedElement( "a",
			{ "href" : "#", "#text" : "Expand all threads" } );

      this._boolExpandThreads = true; // True->expand, false->collapse.

      // Configure global toggling on click.
      this._domGlobalThdExp.addEventListener( "click", function( event )
      {
        objRef.toggleThreadExpansion();

        event.stopPropagation();
        event.preventDefault();
      }, false );

      insertBefore( this._domGlobalThdExp, domFirstHr );
    }

    if ( boolThreadExpansion && Options.doImageExpansion )
      insertBefore( new TaggedElement( "br" ), domFirstHr );

    if ( Options.doImageExpansion )
    {
      this._domGlobalImgExp = new TaggedElement( "a",
			{ "href" : "#", "#text" : "Expand all images" } );

      this._domGlobalImgExp.addEventListener( "click", function( event )
      {
        objRef.toggleImageExpansion();

        event.stopPropagation();
        event.preventDefault();
      }, false );

      insertBefore( this._domGlobalImgExp, domFirstHr );

      this._boolExpandImages = true; // True->expand, false->collapse.
    }
  }
  else  // In this event, my existence is worthless: kill me.
    return empty;
}

GlobalExpansion.prototype.toggleThreadExpansion = function()
{
  if ( this._boolExpandThreads )
  {
    for ( var i = 0; i < this._arrThreadExpanders.length; ++i )
    {
      if ( this._arrThreadExpanders[i] != empty )
        this._arrThreadExpanders[i].expand();
    }

    this._domGlobalThdExp.textContent = "Collapse all threads";
  }
  else
  {
    for ( var i = 0; i < this._arrThreadExpanders.length; ++i )
    {
      if ( this._arrThreadExpanders[i] != empty )
        this._arrThreadExpanders[i].collapse();
    }

    this._domGlobalThdExp.textContent = "Expand all threads";
  }

  this._boolExpandThreads = !this._boolExpandThreads;
};

GlobalExpansion.prototype.toggleImageExpansion = function()
{
  if ( this._boolExpandImages )
  {
    for ( var i = 0; i < this._arrImgExpanders.length; ++i )
    {
      if ( this._arrImgExpanders[i].imageState() == 0 )
        this._arrImgExpanders[i].toggleImageState();
    }

    this._domGlobalImgExp.textContent = "Collapse all images";
  }
  else
  {
    for ( var i = 0; i < this._arrImgExpanders.length; ++i )
      this._arrImgExpanders[i].collapseImage();

    this._domGlobalImgExp.textContent = "Expand all images";
  }

  this._boolExpandImages = !this._boolExpandImages;
};

/*
 * Post Expansion
 */

function PostExpander( domFullPostLink )
{
  this._strReplyUrl = domFullPostLink.getAttribute( "href" );
  this._domBlockQuote = domFullPostLink.parentNode.parentNode;

  try			// Reply?
  {
    this._intPostNum = RegExp( "/\\d+\\..*\\#(\\d+)$" )
	.exec( this._strReplyUrl )[1];
  }
  catch ( e )
  {
    try			// Thread OP?
    {
      this._intPostNum = RegExp( "/(\\d+)\\..*$" )
                         .exec( this._strReplyUrl )[1];
    }
    catch ( e2 )
    {
      return empty;	// Link invalid.
    }
  }

  var objRef = this;
  domFullPostLink.addEventListener( "click", function( event )
  {
    objRef.expand();

    event.stopPropagation();
    event.preventDefault();
  }, false );

  return this;
}

PostExpander.prototype.expand = function()
{
  var ajaxInstance = new Ajax( this._strReplyUrl, "GET" );
  var objRef = this;
  ajaxInstance.onLoad = function()
  {
    var xmlResponse = this.getResponseXml();
    if ( xmlResponse )
    {
      var domThreadPage = xmlResponse.documentElement;

      var snapshotAllReplies = xmlResponse.evaluate( ".//" + strNs
	+ "table[descendant :: " + strNs + "td[@class='reply']]",
	domThreadPage, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null );
    }
    else
    {
      var strReplyPage = this.getResponseText();
      var strNewContent;
      var replyPageReplyQuoteGrab = new RegExp ( "<td class=\\\"reply\\\" id=\\"
	+ "\"reply" + objRef._intPostNum + "\\\">[^\0]*?<blockquote>(([^\0]*?(<"
	+ "blockquote class = \\\"unkfunc\\\">[^\0]*?</blockquote>)*[^\0]*?)*?)"
	+ "</blockquote>[^\0]*</td>" );

      var replyPageOPQuoteGrab = new RegExp ( "[^\0]*?<blockquote>(([^\0]*?(<bl"
	+ "ockquote class = \\\"unkfunc\\\">[^\0]*?</blockquote>)*[^\0]*?)*?)</"
	+ "blockquote>[^\0]*<td>" );

      try
      {
	strNewContent = replyPageReplyQuoteGrab.exec( strReplyPage )[1];
      }
      catch ( e )
      {
        try
        {
          strNewContent = replyPageOPQuoteGrab.exec( strReplyPage )[1];
        }
        catch ( e2 )
        {
          strNewContent = "<p>Post extraction failed.</p>";
        }
      }

      objRef._domBlockQuote.innerHTML = strNewContent;
    }
  };
};

// Add 2ch-style arrows to the top-right of each thread div.
function ThreadNavControls( arrThreadDivs )
{
  for ( var i = 0; i < arrThreadDivs.length; ++i )
  {
    var domPreviousThreadArrow;
    var domNextThreadArrow;

    if ( i == 0 )
      domPreviousThreadArrow = document.createTextNode( "\u25B2" );
    else
      domPreviousThreadArrow = new TaggedElement ( "a",
		{ "#text" : "\u25B2",
		  "href" : "#thn" + arrThreadDivs[i - 1].intThreadId,
		  "style" : { "text-decoration" : "none" } } );

    if ( i == arrThreadDivs.length - 1 )
      domNextThreadArrow = document.createTextNode( "\u25BC" );
    else
    {
      domNextThreadArrow = new TaggedElement ( "a",
		{ "#text" : "\u25BC",
		  "href" : "#thn" + arrThreadDivs[i + 1].intThreadId,
		  "style" : { "text-decoration" : "none" } } );
    }

    var domNavSpan = new TaggedElement ( "span",
				{ "style" : { "float" : "right",
					      "padding-left" : "1em" } } );

    // Tweak due to already-present "Hide Thread" link.
    if ( strBoardType == 'desuchan' )
      domNavSpan.style.clear = 'right';

    domNavSpan.appendChild( domPreviousThreadArrow );
    domNavSpan.appendChild( document.createTextNode( ' ' ) );
    domNavSpan.appendChild( domNextThreadArrow );

    insertBefore( domNavSpan, arrThreadDivs[i].domThreadDiv );
    insertBefore( TaggedElement( "a",
	{ "name" : "thn" + arrThreadDivs[i].intThreadId } ), domNavSpan );
  }
}

/*
 * Quoted Post Tool Tip
 */

function QuotedPostToolTip( domAnchor )
{
  // Boolean to keep track of preview display state.
  this._boolDisplayed = false;

  // Boolean to indicate whether the post in question is already on page.
  this._boolIsLocal = false;

  // Save DOM anchor to object.
  this._domAnchor = domAnchor;

  // Boolean indicating whether a problem occurred while preparing tooltip.
  this._errorOccurred = false;

  // Tooltip DOM element.
  this._domPreviewDiv
    = new TaggedElement( "div", { "class" : "reply",
                                  "style" : { "position" : "fixed",
                                              "border-style" : "solid",
                                              "height" : "auto",
                                              "width" : "auto",
                                              "overflow" : "auto" } } );

  // Mouse-based events.
  var objRef = this;
  this._domAnchor.addEventListener( "mouseover", function( event )
  {
    objRef.show( this.boolIsLocal );
  }, false );

  this._domAnchor.addEventListener( "mouseout", function( event )
  {
    objRef.hide();
  }, false );
}

QuotedPostToolTip.prototype.show = function()
{
  if ( this._boolDisplayed )   // Is there no need?
    return;

  var strUrl = this._domAnchor.getAttribute( "href" );
  if ( strUrl.indexOf( "#" ) != -1 )
  {
    try
    {
      var arr = ( new RegExp( "^(.*)#i?(\\d+)$" ) ).exec( strUrl );
      this._strPostNum = arr[2];

      if ( arr[1] == "" // Link refers to element on page.
           || ( arr[1].match( window.location.pathname ) != null
                && window.location.pathname.match( '/res/' ) != null ) )
        this._boolIsLocal = true;
    }
    catch ( e )
    {
      this.generateErrorMessage( "Exception occurred: " + e );
      return empty;
    }
  }
  else
  {
    try
    {
      this._strPostNum = ( new RegExp( "/res/(\\d+)\\." ) ).exec( strUrl )[1];
    }
    catch ( e )
    {
      this.generateErrorMessage( "Exception occurred: " + e );
      return empty;
    }
  }

  domParentForm.appendChild( this._domPreviewDiv );

  this._boolDisplayed = true;  // Update status.

  var objRef = this;

  document.addEventListener( "mousemove", objRef.mouseMove
  = function( event )
  {
    objRef.updateDivPosition( event );
  }, false );

  if ( this._domPreviewDiv.firstChild != null ) // No need to reload.
    return;

  if ( this._boolIsLocal )
  {
    var domTableToGrab = document.evaluate( "..//" + strNs + "table[descendant"
	+ "::" + strNs + "td[@id='reply" + this._strPostNum + "']]",
	domParentForm, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null )
        .singleNodeValue;

    if ( domTableToGrab != null )  // Attempt to extract as reply passed.
      this._domPreviewDiv.appendChild( domTableToGrab.cloneNode( true ) );
    else // OP?
    {
      try
      {
        var domParentThread = document.evaluate( "ancestor :: " + strNs + "div"
	  + "[@class='threaddiv']", this._domAnchor, nsResolver,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

        var domContainer
          = new TaggedElement( "div", { "style" : { "width" : "100%" } } );

        // Clone every element up to the first blockquote and place into
        // domContainer.
        for ( var i = 0; ; ++i )
        {
          var domNode = domParentThread.childNodes[i];

          domContainer.appendChild( domNode.cloneNode( true ) );

          if ( typeof domNode.tagName != "undefined"
               && domNode.tagName.toLowerCase() == "blockquote" )
            break;
        }

        // No errors means we can now attach new content.
        this._domPreviewDiv.appendChild( domContainer );
      }
      catch ( e )  // Can't do squat, captain.
      {
        this.generateErrorMessage( "Exception occurred: " + e );
        return;
      }
    }
  }
  else
  {
    // Set up AJAX.
    var ajaxInstance = new Ajax( this._domAnchor.getAttribute( "href" ),
				 "GET" );

    ajaxInstance.onLoad = function()
    {
      var xmlResponse = this.getResponseXml();
      if ( xmlResponse )
      {
        var domThreadPage = xmlResponse.documentElement;
        try  // Extract as reply.
        {
          var domResponse = xmlResponse.evaluate( ".//" + strNs
	    + "table[descendant::" + strNs + "td[@class='reply' and @id='reply"
            + objRef._strPostNum + "']]", domThreadPage, nsResolver,
            XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue;

          objRef._domPreviewDiv.appendChild( domResponse );
        }
        catch ( e )
        {
          try  // Extract as OP.
          {
            // Starting with the <span> element, attach the OP piece-by-piece,
            // until the <blockquote> element is reached.
            var domResponseElement = xmlResponse.evaluate( ".//" + strNs
              + "span[@class='filesize']", domThreadPage, nsResolver,
              XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
            
            objRef._domPreviewDiv
                  .appendChild( domResponseElement.cloneNode( true ) );

            while ( true )
            {
              domResponseElement = domResponseElement.nextSibling;
              objRef._domPreviewDiv
                    .appendChild( domResponseElement.cloneNode( true ) );

              if ( domResponseElement.nodeName.toLowerCase() == 'blockquote' )
                break;
            }
          }
          catch ( e1 )  // Will catch in case the while-loop goes berserk.
          {
            objRef.generateErrorMessage( "Post not found." );
            return;
          }
        }
      }
      else
      {
        var strReplyPage = this.getResponseText();
        var strNewContent;

        var replyPageReplyPostGrab = new RegExp ( "(<table><tbody><tr><td class"
	+ "=\\\"doubledash\\\">&gt;&gt;</td> <td class=\\\"reply\\\" id=\\\"rep"
	+ "ly" + objRef._strPostNum + "\\\"[^\0]*?</table>)" );

        var replyPageOPGrab = new RegExp ( "<span class=\\\"filesize\\\">"
                                           + "[^\0]*?<a name=\\\""
					   + objRef._strPostNum
					   + "\\\"[^\0]*?</blockquote>" );

        try  // Extract as reply.
        {
	  strNewContent = replyPageReplyPostGrab.exec( strReplyPage )[1];
        }
        catch ( e )
        {
          try  // Extract as OP.
          {
            strNewContent = replyPageOPGrab.exec( strReplyPage )[0];
          }
          catch ( e1 )
          {
            objRef.generateErrorMessage( "Post not found." );
            return;
          }
        }

        // Update tooltip. Ugh innerHTML.
        if ( typeof strNewContent == 'undefined' )
          objRef.generateErrorMessage( "Post not found." );
        else
          objRef._domPreviewDiv.innerHTML = strNewContent;
      }
    };

    // On error, display the issue in the tooltip instead.
    ajaxInstance.onError = function ()
    {
      var strError;
      switch ( parseInt( ajaxInstance.getStatus() ) )
      {
        // Display custom error messages for certain cases.
        case 400:
          strError = "Thread not found.";
          break;
        case 410:  // I've seen this only once or twice, but here we go.
          strError = "Thread permanently removed.";
          break;
        case 403:
          strError = "HTTP 403: Forbidden. (Ban or bandwidth limit?)";
          break;
        case 500:
          strError = "500-tan says hi. I hope that's not my fault again.";
          break;
        case 0:  // It is assumed that this script is not run on a filesystem.
                 // (Note the integer forcing above.)
          strError = "Connection timeout.";
          break;
        default:
          strError = ajaxInstance.getStatusCode();
      }

      objRef.generateErrorMessage( strError );
    };
  }
};

QuotedPostToolTip.prototype.hide = function()
{
  if ( this._boolDisplayed )  // Execute only if preview is "active."
  {
    removeNode( this._domPreviewDiv );
    this._boolDisplayed = false;
    window.clearInterval( this._to );

    document.removeEventListener( "mousemove", this.mouseMove, false );
  }
};

QuotedPostToolTip.prototype.updateDivPosition = function( event )
{
  var viewWidth =  document.documentElement.clientWidth
                   || document.body.clientWidth || window.innerWidth;
  var viewHeight = document.documentElement.clientHeight
                   || document.body.clientHeight || window.innerHeight;

  if ( event.clientX < viewWidth / 2 )
  {
    this._domPreviewDiv.style.left = ( event.clientX + 20 ).toString() + "px";
    this._domPreviewDiv.style.right = "";
  }
  else
  {
    this._domPreviewDiv.style.right
      = ( viewWidth - event.clientX + 20 ).toString() + "px";
    this._domPreviewDiv.style.left = "";
  }

  if ( event.clientY < viewHeight / 2 )
  {
    this._domPreviewDiv.style.top = ( event.clientY + 20 ).toString() + "px";
    this._domPreviewDiv.style.bottom = "";
  }
  else
  {
    this._domPreviewDiv.style.bottom
      = ( viewHeight - event.clientY + 20 ).toString() + "px";
    this._domPreviewDiv.style.top = "";
  }
}

QuotedPostToolTip.prototype.generateErrorMessage = function( str )
{
  var domError = new TaggedElement( "p", { "#text" : str,
                                           "style" : { "color" : "red" } } );
  this._domPreviewDiv.appendChild( domError );  
}

/*
 * Discussion Compass
 */

// This function is shamelessly based on !WAHa's (free) code.... Yes, I suck.
function highlightPost( strPost )
{
  var cells = document.getElementsByTagName( "td" );

  // Unhighlight replies (ideally just one) already highlighted
  for ( var i = 0; i < cells.length; i++)
  {
    if ( cells[i].getAttribute( "class" ) == "highlight" )
      cells[i].setAttribute( "class", "reply" );
  }

  var reply = document.getElementById( "reply" + post );
  if ( reply )
  {
    reply.setAttribute( "class", "highlight" );
    return true;
  }

  return false;
}

function ReplyListDiv()
{
  return new TaggedElement ( "div", { "class" : "postref",
                             "style" : { 'float'      : 'right',
                                         'clear'      : 'both',
                                         "margin-top" : "0.2em" } } );
}

var DiscussionCompass =
{
  hashTReplies		: new Object,

  init			: function()
  {
    this.updateReferenceLinks( domParentForm );
  },

  updateReferenceLinks	: function( domDivision )
  {
    var arrPostsInThread = new Array();

    var snapshotAllReplies = document.evaluate( ".//" + strNs
	+ "table[descendant :: " + strNs + "td[@class='reply']]",
	domDivision, nsResolver,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

    for ( var i = 0; i < snapshotAllReplies.snapshotLength; ++i )
    {
      var strPostId = document.evaluate( ".//" + strNs + "a[@name][1]",
	snapshotAllReplies.snapshotItem( i ), nsResolver,
	XPathResult.ANY_UNORDERED_NODE_TYPE, null )
	.singleNodeValue.getAttribute( "name" );
      this.hashTReplies[strPostId] = new Array();
      arrPostsInThread.push( strPostId );
    }

    for ( var i = 0; i < arrPostsInThread.length; ++i )
    {
      var snapshotRefLinks = document.evaluate( ".//" + strNs
	+ "blockquote//" + strNs + "a[@href and starts-with(.,'>>')]",
	snapshotAllReplies.snapshotItem( i ), nsResolver,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,	null );

      for ( var j = 0; j < snapshotRefLinks.snapshotLength; ++j )
      {
	var strUrlRef =
		snapshotRefLinks.snapshotItem( j ).getAttribute( "href" );
        try
	{
          var strPostRef = RegExp( "#(\\d+)$" ).exec( strUrlRef )[1];
        }
	catch ( e )	// If regexp does not match, skip link.
	{
	  continue;
	}

        if ( typeof this.hashTReplies[strPostRef] != "undefined" )
	  this.hashTReplies[strPostRef].push( arrPostsInThread[i] );
      }
    }

    for ( var i = 0; i < arrPostsInThread.length; ++i )
    {
      if ( this.hashTReplies[arrPostsInThread[i]].length > 0 )
      {
	var domBlockQuote = document.evaluate( ".//" + strNs
	  + "blockquote[1]", snapshotAllReplies.snapshotItem( i ), nsResolver,
	  XPathResult.FIRST_ORDERED_NODE_TYPE, null )
	  .singleNodeValue;

	var domReplyIndicator = new TaggedElement ( "a",
                { "href" : "#",
                  "#text" : "References to This Post ("
                            + this.hashTReplies[arrPostsInThread[i]].length
                            + ") \u21E9",
                  "style" : { 'float'           : 'right',
			      'font-size'       : 'small',
			      'text-decoration' : 'none',
                              'clear'           : 'both' }
		} );

	var domReplyList = new ReplyListDiv();

	insertAfter( domReplyIndicator, domBlockQuote );
	insertAfter( domReplyList, domReplyIndicator );

	new ReferencesDisplay( domReplyIndicator, arrPostsInThread[i],
			       domReplyList );
      }
    }
  }
};

function ReferencesDisplay( domLink, strPostId, domDivToFill )
{
  this._domLink = domLink;
  this._strPostId = strPostId;
  this._domDivToFill = domDivToFill;
  this._boolDisplayed = false;

  var objRef = this;
  domLink.addEventListener( "click", function( event )
  {
    objRef.toggleDisplay();

    event.stopPropagation();
    event.preventDefault();
  }, false );

  return this;
}

ReferencesDisplay.prototype.toggleDisplay = function()
{
  if ( this._boolDisplayed )
    this.hide();
  else
    this.show();
};

// This function generates a new div each time, in case of changes.
ReferencesDisplay.prototype.show = function()
{
  var arrReferences = DiscussionCompass.hashTReplies[this._strPostId];
  for ( var i = 0; i < arrReferences.length; ++i )
  {
    var strPostNum = arrReferences[i];
    var domNewLink = new TaggedElement( "a", { "#text" : ">>" + strPostNum,
					       "href"  : "#" + strPostNum,
                                               'float' : 'right' } );

    domNewLink.addEventListener( "click", function( event )
    {
      highlightPost( strPostNum );
    }, false );

    this._domDivToFill.appendChild( domNewLink );

    // Post preview for reference links. Nifty, I think.
    if ( Options.doQuotedPostPreview )
      new QuotedPostToolTip( domNewLink );

    this._domDivToFill.appendChild( TaggedElement( "br" ) );
  }

  this._boolDisplayed = true;
};

ReferencesDisplay.prototype.hide = function()
{
  var domNewDiv = new ReplyListDiv();

  insertAfter( domNewDiv, this._domDivToFill );
  removeNode( this._domDivToFill );
  this._domDivToFill = domNewDiv;

  this._boolDisplayed = false;
};

/* Thread Refresher
 * (TODO)
 */

function ThreadRefresher()
{
}

/* Quick Reply
 */

function QuickReply( domBlockQuote, intThreadNumParam )
{
  this._boolIsExpanded		= false;
  var domQRSpan			= new TaggedElement( "span" );
  this._domQRLink		= new TaggedElement( "a",
					{ "href" : "#",
					  "#text" : "Quick Reply" } );

  // Extract URL from nearby "No.#" link to determine post properties.
  try
  {
    var strUrlToPost = document.evaluate( "preceding-sibling :: "
	+ strNs + "span[@class='reflink']//" + strNs
	+ "a[@href]", domBlockQuote, nsResolver,
	XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue.
	getAttribute( "href" );
  }
  catch ( e )
  {
    return empty;
  }

  if ( intThreadNumParam )  // Optional thread number parameter
    this._intThreadNum = intThreadNumParam;
  else
  {
    try
    {
      this._intThreadNum = parseInt( RegExp( "\\/(\\d+)\\."
                           + "(?:x?html?|php)[#$]" ).exec( strUrlToPost )[1] );
    }
    catch ( e )
    {
      domBlockQuote.appendChild(
       new TaggedElement( "p", { "#text" : "Issue creating Quick Reply form: "
         + e.toString() + ".... "
         + "If this occurs after reloading, please contact the script author.",
         "style" : { "font-size" : "small" } } ) );
      return empty;
    }
  }

  this._intPostNum = parseInt( RegExp( "(\\#i?|>>)(\\d+)\\'?\\)?$" )
		               .exec( strUrlToPost )[2])
		     || this._intThreadNum;
  this._strReplyUrl = strUrlToPost.replace( RegExp( "#i?.*$" ) , "" );

  this._domQuickReplyDiv = new TaggedElement
			   ( "div", { "style" : { "margin-left" : "2em" } } );

  domQRSpan.appendChild( document.createTextNode( "\u00A0[" ) );
  domQRSpan.appendChild( this._domQRLink );
  domQRSpan.appendChild( document.createTextNode( "]" ) );

  // Determine the DOM element before which the Quick Reply link should be.
  var domPlaceToPrependLink;

  // If the post to which we are assigning the Quick Reply instance has an
  // image and is a reply, the DOM structure is different.
  if ( document.evaluate( "count(preceding-sibling :: " + strNs + "a/"
	+ strNs + "img[@class='thumb'])", domBlockQuote, nsResolver,
	1, null ).numberValue > 0
       &&  document.evaluate( "count(ancestor :: " + strNs
	+ "td[@class='reply'])", domBlockQuote, nsResolver, 1, null )
	.numberValue > 0 )
  {
    if ( strBoardType == 'desuchan' )
    {
      domPlaceToPrependLink = document.evaluate( "preceding-sibling :: "
		+ strNs + "br[2]", domBlockQuote, nsResolver,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue;
    }
    else
    {
      domPlaceToPrependLink = document.evaluate( "preceding-sibling :: "
		+ strNs + "span[@class='reflink'][1]", domBlockQuote,
		nsResolver, XPathResult.ANY_UNORDERED_NODE_TYPE,
                null ).singleNodeValue.nextSibling;
    }
  }
  else
    domPlaceToPrependLink = domBlockQuote;

  insertBefore( domQRSpan, domPlaceToPrependLink );

  // Determine what element should precede the Quick Reply Table.
  var snapshotParentTable = document.evaluate( "ancestor :: " + strNs
	+ "table", domBlockQuote, nsResolver,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

  if ( snapshotParentTable.snapshotLength > 0 )
  {
    insertAfter( this._domQuickReplyDiv,
                 snapshotParentTable.snapshotItem( 0 ) );
  }
  else
    insertAfter( this._domQuickReplyDiv, domBlockQuote );

  // Prepare Quick Reply link's click event.
  var objRef = this;
  this._domQRLink.addEventListener( "click", function( event )
  {
    objRef.toggleDisplayState();

    event.stopPropagation();
    event.preventDefault();
  }, false );

  return this;
};

QuickReply.prototype.toggleDisplayState = function()
{
  if ( this._boolIsExpanded )
    this.hide();
  else
    this.show();

  this._boolIsExpanded = !this._boolIsExpanded;
};

QuickReply.prototype.generateFormRow
= function( strHead, strField, strType, strSize, strDefaultContent )
{
  var domTableRow = new TaggedElement ( "tr" );
  domTableRow.appendChild( TaggedElement ( "td",
		{ "#text" : strHead, "class" : "postblock" } ) );

  var domInputField = ( strType != "textarea" )
	? new TaggedElement( "input",
 		{ "type"  : strType,
		  "name"  : PostFields[strField],
		  "value" : strDefaultContent,
                  'title' : strHead } )
	: new TaggedElement( "textarea",
		{ "name"  : PostFields[strField],
		  "#text" : strDefaultContent,
                  'title' : strHead } );

  if ( strSize )
  {
    if ( strSize.indexOf( "x" ) != -1 )
    {
      var arrDimensions = RegExp( "^(\\d+)x(\\d+)$" ).exec( strSize );
      domInputField.setAttribute( "cols", arrDimensions[1] );
      domInputField.setAttribute( "rows", arrDimensions[2] );
    }
    else
      domInputField.setAttribute( "size", strSize );
  }

  var domFieldColumn = new TaggedElement( "td",
                                       { "style" : { 'display' : 'block' } } );

  domTableRow.appendChild( domFieldColumn )
	     .appendChild( domInputField );

  if ( strField == "subject" ) // Add Submit button beside the Subject row.
  {
    domFieldColumn.appendChild( TaggedElement
      ( "input", { "type" : "submit", "value" : "Submit" } ) );
  }

  return domTableRow;
};

QuickReply.prototype.generateCaptchaRow = function()
{
  var domCaptchaRow
    = this.generateFormRow( "Verification", "captcha", "text", "30", "" );

  var ajaxInstance = new Ajax( this._strReplyUrl, "GET" );
  ajaxInstance.onLoad = function()
  {
    var xmlResponse = this.getResponseXml();
    var domCaptImg;

    if ( xmlResponse )
    {
      var domThreadPage = xmlResponse.documentElement;

      domCaptImg = xmlResponse.evaluate( ".//" + strNs + "input[@name='"
        + PostFields.captcha + "']", domThreadPage, nsResolver,
        FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.nextSibling;
    }
    else
    {
      var strImgSrc = RegExp( "<input [^\0]*?name=\"captcha\"[^\0]*?>[^\0]*?"
        + "<img [^\0]*?src=\"([^\0]*?)\"" ).exec( this.getResponseText() )[1];

      domCaptImg = TaggedElement( "img", 
                   { "src" : strImgSrc, "alt" : "CAPTCHA image" } );
    }
    
    domCaptchaRow.lastChild.appendChild( domCaptImg );
  };

  return domCaptchaRow;
};

QuickReply.prototype.show = function()
{
  var boolTaskInputPresent = false;

  // Adjust domParentNode ("delform") so that it will instead post to the
  // current thread when submit is hit in Quick Reply.
  var arrInputs = domParentForm.getElementsByTagName( "input" );
  for ( var i = 0; i < arrInputs.length; ++i )
  {
   if ( arrInputs[i].getAttribute( "name" ) == "task"
	&& arrInputs[i].getAttribute( "type" ) != "submit" )
   {
     arrInputs[i].setAttribute( "value", "post" );
     boolTaskInputPresent = true;
   }

   // Filler password field *name.*
   if ( arrInputs[i].getAttribute("name") == "password" )
     arrInputs[i].setAttribute( "name", "desupassworddesu" );
  }

  domParentForm.reset();
  domParentForm.setAttribute ( "enctype", "multipart/form-data" );

  QuickReplyHandler.setActiveQuickReply( this );

  this._domQuickReplyDiv.appendChild( TaggedElement( "input",
    { "type" : "hidden", "name" : "parent", 
                         "value" : this._intThreadNum.toString() } ) );

  if ( !boolTaskInputPresent )
  {
    this._domQuickReplyDiv.appendChild( TaggedElement( "input",
      { "type" : "hidden", "name" : "task", "value" : "post" } ) );
  }

  var domQROuterRow = new TaggedElement( "tr" );
  var domQROuterColumn = new TaggedElement( "td" );

  this._domQuickReplyDiv.appendChild( TaggedElement( "table" ) )
			.appendChild( TaggedElement( "tbody" ) )
			.appendChild( domQROuterRow )
			.appendChild( TaggedElement
				      ( "td", { "class" : "doubledash" } ) )
			.appendChild( TaggedElement
				      ( "span", { "#text" : "\u21B3",
						  "style" :
						{ "font-size" : "2em" } } ) );

  var domQRTBody = new TaggedElement( "tbody" );

  var domCloseLink = new TaggedElement( "a",
                             { "#text" : "\u2612 Cancel", "href" : "#",
                               "style" : { "float" : "right",
                                           "text-decoration" : "none" } } );

  var objRef = this;
  domCloseLink.addEventListener( "click", function( event )
  {
    objRef.toggleDisplayState();

    event.stopPropagation();
    event.preventDefault();
  }, false );

  domQROuterRow.appendChild( domQROuterColumn )

  domQROuterColumn.appendChild( new TaggedElement( "h3",
			     { "#text" : "Responding to No."
					 + this._intPostNum.toString(),
	  		       "style" : { "font-size" : "medium",
					   "font-weight" : "bold",
                                           "float" : "left" } } ) );
  domQROuterColumn.appendChild( domCloseLink );
  domQROuterColumn.appendChild( domQRTBody );

  // Declare array of option DOM elements to generate.
  var arrCustomQR = new Array(
    new Array( "Name", "name", "text", "30", Cookie.getValue( "name" ) ),
    new Array( "Email", "link", "text", "30", Cookie.getValue( "email" ) ),
    new Array( "Subject", "subject", "title", "30", "" ),
    new Array( "Comment", "comment", "textarea", "60x10",
               ( this._intPostNum == this._intThreadNum )
               ? "" : ( ">>" + this._intPostNum.toString() + "\n" ) ),
    new Array( "File", "file", "file", "", "" ),
    new Array( "Password", "password", "password", "30",
	       Cookie.getValue( "password" ) )
  );

  for ( var i = 0; i < arrCustomQR.length; ++i )
  {
    var genFieldName = arrCustomQR[i][1];
    if ( this._fieldExists( PostFields[genFieldName], arrCustomQR[i][2] ) )
    {
      domQRTBody.appendChild( this.generateFormRow(
        arrCustomQR[i][0], genFieldName, arrCustomQR[i][2], arrCustomQR[i][3],
        arrCustomQR[i][4] ) );
    }
  }

  // Determine if CAPTCHA is needed, and, if so, generate respective row.
  if ( document.evaluate( "count(.//" + strNs + "input[@name='captcha'])", 
      document, nsResolver, 1, null ).numberValue > 0 )
    domQRTBody.appendChild( this.generateCaptchaRow() );

  // Add Quick Sage checkbox if the respective option is enabled.
  /* if ( Options.doQuickSage )
    new QuickSage( domQRTBody ); */

  // Set focus to textfield.
  try
  {
    var commentArea = PostFields.comment;
    document.evaluate( ".//" + strNs + "textarea[@name='" + commentArea + "']",
                       domQRTBody, nsResolver, 
                       XPathResult.ANY_UNORDERED_NODE_TYPE, null )
            .singleNodeValue.focus();
  }
  catch ( e )
  {
    return;
  }
};

QuickReply.prototype._fieldExists = function( strFieldId, strFieldType )
{
  try
  {
    var fieldTag = ( strFieldType == 'textarea' ) ? 'textarea' : 'input';
    return document.evaluate( "count(.//" + strNs + fieldTag + "[@name='" 
      + strFieldId + "' and (not(@type) or @type!='hidden')])", domPostForm,
      nsResolver, 1, null ).numberValue > 0;
  }
  catch ( e )
  {
    return false;
  }
}

QuickReply.prototype.hide = function()
{
  if ( !this._domQuickReplyDiv )
    return;

  var arrInputs = domParentForm.getElementsByTagName( "input" );
  for ( var i = 0; i < arrInputs.length; ++i )
  {
   if ( arrInputs[i].getAttribute( "name" ) == "task"
	&& arrInputs[i].getAttribute( "type" ) != "submit" )
     arrInputs[i].setAttribute( "value", "delete" );

   if ( arrInputs[i].getAttribute("name") == "desupassworddesu" )
     arrInputs[i].setAttribute( "name", "password" );
  }

  var domNewDiv = new TaggedElement
		      ( "div", { "style" : { "margin-left" : "2em" } } );

  insertAfter( domNewDiv, this._domQuickReplyDiv );
  removeNode( this._domQuickReplyDiv );
  this._domQuickReplyDiv = domNewDiv;
};

QuickReply.prototype.getState = function()
{
  return this._boolIsExpanded;
}

// Handles multiple quick reply instances so that only one is open at once.
var QuickReplyHandler =
{
  _activeQuickReply : null,

  setActiveQuickReply : function( quickRep )
  {
    if ( this._activeQuickReply != null && this._activeQuickReply.getState() )
      this._activeQuickReply.hide();

    this._activeQuickReply = quickRep;
  }
};

/* Main Routine
 */

var WakabaExtension =
{
  init : function()
  {
    try
    {
      domParentForm = document.getElementById( "delform" );
      domPostForm = document.getElementById( "postform" );

      // Initialization methods setting global variables.
      getBoardType();
      PostFields.set();
      getBoardPath();
    }
    catch ( e )  // Not a valid page.
    {
      return;
    }

    // All replies on the page. (This does not include thread OPs.)
    var arrReplyTables = document.getElementsByTagName( "table" );

    // Snapshot of all images on the page.
    var snapshotImages =
        document.evaluate( ".//" + strNs + "a/" + strNs +
                           "img[@class='thumb']", domParentForm, nsResolver,
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );



    if ( window.location.href.match( "/res/" ) == null )
      boolPageIsThreadIndex = true;

    /* =-=-= Option Panel =-=-= */
    Options.retrieveOptions();
    new OptionPanel();

    /* =-=-= Image Expansion =-=-= */
    var arrImgExpanders = new Array();

    if ( Options.doImageExpansion )
    {
      for ( var i = 0; i < snapshotImages.snapshotLength; ++i )
      {
        arrImgExpanders.push( new ImageExpansionHandler
			      ( snapshotImages.snapshotItem( i ) ) );
      }
    }

    /* =-=-= Divide Threads =-=-= */
    var arrThreadDivs;

    if ( ( Options.doThreadHiding || Options.doThreadExpansion
	   || Options.doThreadNavigation ) && boolPageIsThreadIndex )
      arrThreadDivs = new ThreadArray();

    /* =-=-= Thread Navigation =-=-= */
    if ( Options.doThreadNavigation && boolPageIsThreadIndex )
      ThreadNavControls( arrThreadDivs );

    /* =-=-= Thread Hiding =-=-= */
    if ( Options.doThreadHiding && boolPageIsThreadIndex
                                && strBoardType != 'desuchan' )
    {
      var arrThreadsToAutoHide
	= Cookie.getValue( "wkExtHiddenThreads_" + strBoardDir ).split( "," );

      for ( var i = 0; i < arrThreadDivs.length; ++i )
      {
        var th = new ThreadHider( arrThreadDivs[i] );

	if ( arrThreadsToAutoHide.contains( th.getThreadId() ) )
	  th.hideThread();
      }
    }

    /* =-=-= Thread Expansion =-=-= */
    var arrThreadExpanders = new Array;

    if ( Options.doThreadExpansion && boolPageIsThreadIndex )
    {
      for ( var i = 0; i < arrThreadDivs.length; ++i )
        arrThreadExpanders.push( new ThreadExpander( arrThreadDivs[i] ) );
    }

    /* =-=-= Global Expansion Links =-=-= */
    if ( Options.doGlobalExpansion )
      new GlobalExpansion( arrImgExpanders, arrThreadExpanders );

    /* =-=-= Quick Sage =-=-= */
    // if ( Options.doQuickSage && boolPageIsThreadIndex )
    // { QuickSage( domPostForm ); }

    /* =-=-= Post Expansion =-=-= */
    if ( Options.doPostExpansion )
    {
      var snapshotAbbrevLinks = document.evaluate( ".//" + strNs +
	"div[@class='abbrev']/" + strNs + "a", domParentForm, nsResolver,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

      for ( var i = 0; i < snapshotAbbrevLinks.snapshotLength; ++i )
	new PostExpander( snapshotAbbrevLinks.snapshotItem( i ) );
    }

     /* =-=-= Quick Reply =-=-= */
     if ( Options.doQuickReply && window.location.href.indexOf( "/res/" )
          == -1 )
     {
       var snapshotBlockQuotes = document.evaluate ( ".//" + strNs +
         "blockquote", domParentForm, nsResolver,
   	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

       for ( var i = 0; i < snapshotBlockQuotes.snapshotLength; ++i )
         new QuickReply( snapshotBlockQuotes.snapshotItem( i ) );
     }

      /* =-=-= Discussion Compass =-=-= */
      if ( Options.doReplyIndicator )
        DiscussionCompass.init();

      /* =-=-= Quoted Post Preview =-=-= */
      if( Options.doQuotedPostPreview )
      {
        var snapshotQuoteLinks = document.evaluate( ".//" + strNs +
	  "a[contains(@href,'/res/') and contains(child::text()[1], '>>')]",
	  domParentForm, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null );

        for ( var i = 0; i < snapshotQuoteLinks.snapshotLength; ++i )
	  new QuotedPostToolTip( snapshotQuoteLinks.snapshotItem( i ) );
      }
  },

  initNewContent : function( domElement, intThreadId ) // 2nd arg optional.
  {
    // Snapshot of all images in the division.
    var snapshotImages =
        document.evaluate( ".//" + strNs + "a/" + strNs +
                           "img[@class='thumb']", domElement, nsResolver,
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

    /* =-=-= Image Expansion =-=-= */
    if ( Options.doImageExpansion )
    {
      for ( var i = 0; i < snapshotImages.snapshotLength; ++i )
        new ImageExpansionHandler( snapshotImages.snapshotItem( i ) );
    }

    /* =-=-= Discussion Compass =-=-= */
    if ( Options.doReplyIndicator )
      DiscussionCompass.updateReferenceLinks( domElement );

    /* =-=-= Quick Reply =-=-= */
    if ( Options.doQuickReply && intThreadId)
    {
      var snapshotBlockQuotes = document.evaluate ( ".//" + strNs +
        "blockquote", domElement, nsResolver,
  	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

     for ( var i = 0; i < snapshotBlockQuotes.snapshotLength; ++i )
       new QuickReply( snapshotBlockQuotes.snapshotItem( i ), intThreadId );
    }

    /* =-=-= Quoted Post Preview =-=-= */
    if ( Options.doQuotedPostPreview )
    {
      var snapshotQuoteLinks = document.evaluate( ".//" + strNs +
	"a[(contains(@href,'/res/') or contains(@href,'#')) and "
	+ "contains(child::text()[1], '>>')]", domElement, nsResolver,
  	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

     for ( var i = 0; i < snapshotQuoteLinks.snapshotLength; ++i )
       new QuotedPostToolTip( snapshotQuoteLinks.snapshotItem( i ) );
    }
  }
};

// if __name__ == 'main':
if ( window.location.href.match( "wakaba.pl" ) == null )
  window.addEventListener( "load", WakabaExtension.init, false );

// That's all, folks!