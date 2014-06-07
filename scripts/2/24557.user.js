// ==UserScript==
// @name           About Forum Reformatter
// @namespace      http://forums.about.com
// @description    v0.2.12 (7/08/2011 WvW) This script reformats the About.com forum pages. You can customize the functionality through the Tools->GreaseMonkey->User Script Commands. 
// @include        http://forums.about.com/n/pfx/forum.aspx?tsn=*&nav=messages&webtag=*
// @include        http://forums.about.com/n/pfx/forum.aspx?*msg=*&webtag=*
// @include        http://forums.about.com/n/pfx/forum.aspx?webtag=*&msg=*
// @include        http://forums.about.com/n/pfx/forum.aspx?*nav=post*
// @include        http://forums.about.com/n/pfx/forum.aspx?*nav=edit*
// @include        http://forums.about.com/n/pfx/forum.aspx?tsn=*&nav=display*
// @include        http://forums.about.com/n/pfx/forum.aspx?folderId=*&listMode=*
// @include        http://forums.about.com/n/pfx/forum.aspx?nav=messages&webtag=*
// @include        http://forums.about.com/n/pfx/forum.aspx?listmode=*&nav=messages&webtag
// @include        http://forums.about.com/n/pfx/forum.aspx?nav=search&webtag=*
// @include        http://forums.about.com/n/pfx/forum.aspx?webtag=*&nav=search* 
// @include        http://forums.about.com/*/messages?msg=*

// @grant          GM_info 
// @grant          GM_deleteValue 
// @grant          GM_getValue 
// @grant          GM_listValues 
// @grant          GM_setValue 
// @grant          GM_getResourceText 
// @grant          GM_getResourceURL 
// @grant          GM_addStyle 
// @grant          GM_xmlhttpRequest 
// @grant          unsafeWindow 
// @grant          GM_log 
// @grant          GM_openInTab 
// @grant          GM_registerMenuCommand 
// 
// ==/UserScript==
// 
// Comments: http://forums.delphiforums.com/agnosticism/messages?msg=20.1
// Author: W. van Wageningen
// 
//
// History:
// 
// v0.0.1   Initial Proof Of Concept
// 
// v0.0.2
// 
// New functionality:
// 
//     * Reformat the 'Reply' page.
//     * Add 'Quick Quote' button to reply page. Just select some text 
//       from the original message and press this button to quote it in 
//       your reply window. The quote style can be changed in the 
//       Configuration window.
//     * Turn on the Firefox Spell Checker in the reply window.
// 
// Bug fixes:
// 
//     * Script now works on all About.com Forums.
// 
// 
// v0.1.0
// 
// New functionality:
// 
//     * The script can now update itself if a new version is available.
//       Turned off by default. The version check will only be done once 
//       a day at max to reduce overhead. Once a new version is denied by 
//       the user, the update function will ignore that version in future 
//       checks.
//     * Right-hand part of the messages window can now be removed without
//       turning on the threadlist on the left. The searchbox and visitor 
//       list is moved to the bottom of the messages.
//     * Added a Refresh button to the thread list on the left. It will 
//       refresh the list without reloading the whole page.
//     * Display the thread-temperature icons on the thread list page.
// 
// Bug fixes:
// 
//     * Restored the messages tools. Moved them to the bottom of the 
//       message.
//     * Restored the 'report violation' link.
//     * Added a small icon to the reply link.
//     * Restored the style for signatures.
//     * Removed additional space between message and signature.
//     * Reformat the 'View Full Message' page.
//     * Reformat the thread list page.
// 
// 
// v0.1.1
// 
// Bug fixes:
// 
//     * Attachments would remove the reply button. Corrected.
//     * Added a URL About.com uses for threadlists
//
// v0.1.2
// 
// New functionality:
// 
//     * Make the thread-temperature icon user-selectable (configuration).
//     * Bypass the 'continue' page after posting a message.
// 
// Bug fixes:
// 
//     * Eabled script on the Edit Message page.
//     * Added URL pattern About.com uses when you're re-directed from the
//       Edit->Apply page.
//     * Changed the layout of the message tool buttons at the bottom of 
//       each message.
//     * Added code to display the full member name [nickname + (login name)]
//       Code is currently turned off (due to potential speed impact)
// 
// v0.1.3
// 
// Bug fixes:
// 
//     * Last Version Check was updated incorrectly, resulting in no updates
//       if the script was used without a gap of at least 24 hours.
// 
// v0.1.4
// 
// New functionality:
// 
//     * In the Delphi layout
//       - Clicking on thread-group headers refreshes the thread list on the 
//         left side instead of opening it in a new window.
//       - Posts are loaded in the background and refreshed in the window 
//         without reloading the whole page. This removes the flickering of 
//         the message window and the original page layout will not be visible 
//         at all. It also speeds up the loading of messages significantly. The
//         objects that will be removed do not need to be rendered first, 
//         resulting in a faster response.
//         Caveat: the URL of the browser doesn't change. So a refresh will
//         take you back to the page you started at.
// 
// Bug fixes:
// 
//     * In the Delphi layout, the 'Show Discussions' option has been restored.
//     * Image resizing bug that caused distortions is now fixed.
// 
// v0.1.5
// 
// Bug fixes:
// 
//     * Render polls correctly.
//
// v0.1.6
// 
// Bug fixes:
// 
//     * Background loading of pages in the Delphi Style mode caused errors with
//       the About.com ads. This stopped the rendering of pages. Using AdBlockPlus 
//       will prevent this error. Those without ABP can turn the background loading
//       off in the configuration.
//
// v0.1.7
// 
// Bug fixes:
// 
//     * Render ignored poster headers correctly.
//     * Fix configuration save problem.
//
// v0.1.8
// 
// New functionality:
// 
//     * Member Full Name can now be displayed
//     * 'Prev/Next Discussion' links can be removed
//     * Search Results page added to processed pages
//     * Change the discussion navigation icons with smaller, higher contrast ones.
//     * Added 'Started by ...' to the popup of links in the treadlist of the
//       Delphi view.
// 
// Bug fixes:
// 
//     * Remove 'Hello, ....' from all pages
//     * Posts accessed through search-results were not reformatted. This is now 
//       corrected.
//
// v0.1.9
// 
// Bug fixes:
// 
//     * Added another URL include for email notification links
// 
//     * About.com changed the post editor, breaking the code used to implement
//       the Quote button. Fixed.
//
// v0.2.0
// 
// Bug fixes:
// 
//     * Redesign because of changes in About.com's forum formatting
//
// v0.2.1
// 
// Bug fixes:
// 
//     * Fixed edit page
//     * Tweaked 'Delphy style' layout
//     * Added URL for links from notification emails
//
// v0.2.2
// 
// New functionality:
// 
//     * Allow HTML in signatures if HTML is turned off in the forum
//
// v0.2.3
// 
// New functionality:
// 
//     * Automatically add font style information when posting.
//       Configurable.
//
// v0.2.4
// v0.2.5
// 
// New functionality:
// 
//     * Add 'Set privileges' link for moderators
//
// v0.2.6
// 
// New functionality:
// 
//     * Add search box at bottom of thread list
//
// v0.2.7
// 
// New functionality:
// 
//     * Added a maximum width for the edit window.
//
// Bug fixes:
// 
//     * Avatar resizing fixed
//
// v0.2.8
// 
// New functionality:
// 
//     * Added insert image button to the reply window.
//
// v0.2.9
// 
// Bug fixes:
// 
//     * window size errors
//
// v0.2.10
// 
// New functionality:
// 
//     * Replace truncated posts with their full content.
//
// v0.2.11
// 
// Bug fixes:
// 
//     * Posting new message fix
//
// v0.2.12
// 
// New functionality:
// 
//     * Added two options for truncated posts: Indicator and Manual toggle
//
// v0.2.13
// 
// Made Chromium compatible
//
// v0.2.14
// 
// Bug fixes:
// 
//     * Avatar resizing fixed (Firefox 17)
//     * Edit window resize bug
//
// v0.2.15
// 
// New functionality / Bug fix:
// 
//     * Added support for the new About.com editor
//
// v0.2.16
// 
// Bug fix:
// 
//     * Quote quotation marks fix
//


var gVersion = "0.2.16" ;

var gScriptURL = "http://userscripts.org/scripts/source/24557.user.js" ;

var No_GM = false ;


///////////////////////// HANDY DANDY FUNCTIONS /////////////////////////

function MakeBoolean( variable )
{
   if( typeof( variable ) == "string")
      return( variable.toLowerCase() == "true" ) ;
   return( variable ) ;
}

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) 
{
   No_GM = true ;

   this.GM_getValue=function (key,def) 
   {
      return localStorage[ key ] || def;
   };

   this.GM_setValue=function (key,value) 
   {
      return localStorage[key]=value;
   };

   this.GM_deleteValue=function (key) 
   {
      return delete localStorage[key];
   };
}
if (typeof GM_log == "undefined") 
{
   GM_log = (window.opera) ? opera.postError : console.log;
}

//GM_log( 'No_GM=' +No_GM ) ;

// Return the result of a regular expression
function GetRegExpResult( sStr, sReg )
{
   var re = new RegExp( sReg );
   var m = re.exec( sStr );

   if (m == null) 
      return "" ;
   else 
      return m[0] ;
}


function AddDefaultStyle( editor )
{
   if( gDefaultStyleColor )
      editor.document.execCommand('forecolor',    false, gDefaultStyleColor);
   if( gDefaultStyleFont )
      editor.document.execCommand('fontname',     false, gDefaultStyleFont);
   if( gDefaultStyleSize )
      editor.document.execCommand('fontsize',     false, gDefaultStyleSize);
   if( gDefaultStyleBold )
      editor.document.execCommand('bold',         false, null);
   if( gDefaultStyleItalic )
      editor.document.execCommand('italic',       false, null);
}


///////////////////////// DOM RELATED FUNCTIONS /////////////////////////

// Shortcut to document.getElementById
function $( id ) 
{
   return document.getElementById( id ) ;
}

// Add a global style
function addGlobalStyle(css) 
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Remove a whole element (and everything underneath)
function RemoveElementByID( sID )
{
   var oElement = $( sID ) ;
   if( oElement )
      oElement.parentNode.removeChild( oElement ) ;
}

// Creates a new node with the given attributes
function createNode( type, attributes ) 
{
   var node = document.createElement( type ) ;
   for( var attr in attributes )
      node.setAttribute( attr, attributes[ attr ] ) ;

   return node ;
}

// Return the first item from an xEval
function GetFirstFromEval( sEval, oObject, lOrdered )
{
   var nOrder = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE ;
   
   if( lOrdered )
      nOrder = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ;

   var dom = document.evaluate( sEval, oObject, null, nOrder, null ) ;

   if( dom.snapshotLength )
      return dom.snapshotItem( 0 ) ;
   else
      return 0 ;
}
function GetLastFromEval( sEval, oObject, lOrdered )
{
   var nOrder = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE ;
   
   if( lOrdered )
      nOrder = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE ;

   var dom = document.evaluate( sEval, oObject, null, nOrder, null ) ;

   if( dom.snapshotLength )
      return dom.snapshotItem( dom.snapshotLength -1 ) ;
   else
      return 0 ;
}


// Remove all items that conform to an xEval
function RemoveAllEval( sEval, oObject )
{
   var d = document.evaluate( sEval, oObject, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ) ;
   for( i = 0 ; i < d.snapshotLength ; i ++ )
      d.snapshotItem( i ).parentNode.removeChild( d.snapshotItem( i ) );
}

// Remove everything underneath an element
function RemoveAllChildren( oObject )
{
   while( oObject.firstChild )
      oObject.removeChild( oObject.firstChild ) ;
}


///////////////////////// EDITOR FUNCTIONS /////////////////////////

// Create the Quote button and add event handler to get back to this script
function CreatePushButton( name, text ) 
{
   var domButton;
   domButton = document.createElement('button');
   domButton.type = 'button';
   domButton.name = name;
   domButton.innerHTML = text;
   domButton.addEventListener("click", ClickPushButton, true);
   return domButton;
}

// Event handler for the quote button
function ClickPushButton( event ) 
{
   var cmd, link;
   link = event.currentTarget;
   cmd = link.name.toLowerCase();

   switch( cmd )
   {
   case "quickquoteabout":
      var aboutEditor;

      var editor = document.getElementById('CE_mMsg_body_ID');

      if( window.getSelection().toString().length > 0 )
      {
//         aboutEditor = document.getElementById("mMsg_body_Editor").contentWindow ;

         var domNode = document.createElement("blockquote");
//
// Different quote style. Probably better to make multiple quote variables:
// - Pre quote text
// - Quote style
// - Post quote text
// - Pre post text
// 
//          if( gBlockQuoteStyle.match( /\%POSTNAME\%/i ) )
//          {
//             GM_log( "Found it! " + gBlockQuoteStyle.match( /\%POSTNAME\%/i )  ) ;
//             dList = document.evaluate(".//a[@class='ptcListLink']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//             if( dList.snapshotLength )
//                sReplace = dList.snapshotItem(0).text.toUpperCase() ;
//             else
//                sReplace = "" ;
//
//             GM_log( "sReplace [" + sReplace + "]" ) ;
//
//             sQuote = gBlockQuoteStyle.replace( /\%POSTNAME\%/i, "" ) ;
//
//             domNode.appendChild( document.createTextNode(sReplace + ": ") );
//          }
//          else
//             sQuote = gBlockQuoteStyle ;

         domNode.appendChild(window.getSelection().getRangeAt(0).cloneContents());

         domNode.setAttribute('style', gBlockQuoteStyle );
         
         var tempNode = document.createElement("div");
         tempNode.appendChild( domNode ) ; 
         tempNode.appendChild( document.createElement("br") ); 

         location.assign("javascript:var editor = document.getElementById('CE_mMsg_body_ID');editor.PasteHTML( '" + tempNode.innerHTML.replace( /'/g, "&rsquo;" ) + "' ) ;void(0)");
//         aboutEditor.document.execCommand( 'inserthtml', false, tempNode.innerHTML ) ;
//
//         aboutEditor.focus();
//
//         if( gDefaultStyle )
//            AddDefaultStyle(aboutEditor ) ;
      }
      break ;

   } // end switch
   event.preventDefault() ; 
}


///////////////////////// EVENT HANDLING FUNCTIONS /////////////////////////

// Event handler for the thread list refresh icon
function RefreshThreadListHandler( event )
{
//   GM_log( "RefreshThreadListHandler" ) ;
//   LoadThreadList( gNavigate ) ;
   LoadThreadList( gNavigate ) ;

   //event.preventDefault() ;
}

// Adds event handlers to all the <a href> tags in the discussion navigation pane 
function AddHandlersToThreadNavigation( oElement ) 
{
   // Find the navigation pane
//   var oNav = GetFirstFromEval(".//div[@class='pfDiscPageNavigator']",oElement,false ) ;
   var oNav = GetFirstFromEval(".//div[@class='ptcMsgNavGroup']",oElement,false ) ;
   if( oNav )
   {
      // Loop through all links (if any)
      var linkList = document.evaluate(".//a[@class='navLink']",oNav,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      for( var i = 0 ; i < linkList.snapshotLength ; i ++ )
      {
         linkList.snapshotItem(i).addEventListener("click", ThreadListLinkHandler, true);
      }
   }
}

// Refresh the postings (right-side of the Delphi layout)
function ThreadListLinkHandler( event )
{
   gBody = $( "ptcBodyContents" ) ;

   if( gLoadInBackground )
      LoadBody( this.href ) ;
   else
      window.location.href = this.href ;

   event.preventDefault() ;
}

// Refresh the thread headers (left-side of the Delphi layout)
function ThreadListHeaderLinkHandler( event )
{
   gThreadListURL = this.href ;

   LoadThreadList( gNavigate ) ;

   ThreadListAddHandlers() ;

   event.preventDefault() ;
}


function ThreadListAddHandlers()
{
   var domList, oLink ;

   domList = document.evaluate(".//a[@class='navLink']",gNavigate,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for( i = 0 ; i < domList.snapshotLength ; i ++ )
   {
      oLink = domList.snapshotItem(i) ;
      oLink.addEventListener("click", ThreadListLinkHandler, true);
   }

   domList = document.evaluate(".//span[@class='ptbFolderName']",gNavigate,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for( i = 0 ; i < domList.snapshotLength ; i ++ )
   {
      oLink = domList.snapshotItem(i).firstChild ;
      oLink.addEventListener("click", ThreadListHeaderLinkHandler, true);
   }
}

// Handle events from the 'Show Discussions' option
function ShowDiscussionHandler( event ) 
{
   var theForm, Url, BtnCmd, BtnVal, BtnCCOId, ViewState ;

//   GM_log( "ShowDiscussionHandler" ) ;

   theForm = $( "_org_pttmf" ) ;

   Url = theForm.action ;

   // onclick = [return PTButtonCmd('mbListGoValue(0)', true, '');]
   sBtn = GetRegExpResult( this.getAttribute("_onclick"), "[\'].*[\']" ) ;
   if( sBtn != "" )
   {
      sBtn = sBtn.replace( /[\']/g, "" ) ;
   }
   BtnCmd = sBtn ;

   BtnVal = $("ptButtonValidate").value ;
   BtnCCOId = $("ptButtonCCOId").value ;
   ViewState = $("__VIEWSTATE").value ;


//   GM_log( "Url: " +Url +", BtnCmd: " +BtnCmd +", BtnVal: " +BtnVal +", BtnCCOId: " +BtnCCOId +", ViewState: " +ViewState ) ;

   GM_xmlhttpRequest({'method':'POST',
                      'url':Url,
                      'headers':{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'},
                      'onload':function(response){ReformatThreadList(response);},
                      'data':'ptButtonCmd='+encodeURIComponent(BtnCmd)
                            +'&ptButtonValidate=' +encodeURIComponent(BtnVal)
                            +'&ptButtonCCOId=' +encodeURIComponent(BtnCCOId)
                            +'&__VIEWSTATE=' +encodeURIComponent(ViewState)
                      }) ;

   event.preventDefault() ;
}


function ShowDiscussionAddHandlers( oMenu )
{
   aChoices = oMenu.getElementsByTagName("A") ;

   for( i = 0 ; i < aChoices.length ; i ++ )
   {
      oTag = aChoices[i] ;

      if( oTag.getAttribute("onclick") )
      {
         oTag.setAttribute("_onclick", oTag.getAttribute("onclick") ) ;
         oTag.removeAttribute("onclick") ;
      }
      oTag.addEventListener("click", ShowDiscussionHandler, true);
   }
}

// Toggle funtion for turning off individual signatures
function BlockSigHandler()
{
   GM_setValue( this.name, ! GM_getValue( this.name, 0 ) ) ;
   window.location.reload( false ) ;
}

// Not using this
function UnloadHandler() 
{
   GM_log( "Unload handler" ) ;
   GM_log( "Unload handler href " + window.location.href ) ;
   GM_log( "Unload handler hash " + document.location.hash ) ;
   GM_log( "Unload handler gHref " + gHref ) ;
//   window.setTimeout(function(){window.location = gHref;},50);
//   window.location.href = gHref ;
//   GM_log( "Unload handler href" + window.location.href ) ;
//   alert( "Unload handler" ) ;

//   return false ;
}



///////////////////////// LAYOUT CHANGING FUNCTIONS /////////////////////////

// Loop through all the postings
function ChangeAllPostings( oMessages )
{
   var domMsg ;
   var msgDiv, msgDivP ;

   RemoveElementByID( 'pfBelowMsgsHtml' ) ;

   var domList = document.evaluate( ".//div[@class='pfMessage']",oMessages,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for( var i = 0 ; i < domList.snapshotLength ; i ++ )
   {
      domMsg = domList.snapshotItem( i ) ;
      msgDiv = document.createElement('div' ) ;
      msgDiv.className = 'pfMessage' ;
      msgDivP = document.createElement('div' ) ;
      msgDivP.className = 'pfMessageDisplayPictureFrame' ;
      msgDiv.appendChild( msgDivP ) ;
   
      ChangePosting( domMsg, msgDivP ) ;

      // Swap opriginal emelent with our tweaked one
      domMsg.parentNode.insertBefore( msgDiv, domMsg ) ;
   
      domMsg.parentNode.removeChild( domMsg ) ;
   }
   
   if( gRemoveDiscButt )
   {
      RemoveAllEval( ".//span[@class='pfPrevDiscussion']", oMessages ) ;
      RemoveAllEval( ".//span[@class='pfPrevDiscussionGray']", oMessages ) ;
      RemoveAllEval( ".//span[@class='pfNextDiscussion']", oMessages ) ;
      RemoveAllEval( ".//span[@class='pfNextDiscussionGray']", oMessages ) ;
   }

   // Change discussion navigation icons
   oIconLists = document.evaluate( ".//ul[@class='ptcListFlow']",oMessages,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for( var i = 0 ; i < oIconLists.snapshotLength ; i ++ )
   {
      oIcons = document.evaluate( ".//img",oIconLists.snapshotItem( i ),null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      for( var j = 0 ; j < oIcons.snapshotLength ; j ++ )
      {
         oIcon = oIcons.snapshotItem( j ) ;
         oIcon.src = oIcon.src.replace( /\/146\//, "/" +nIconStyle +"/" ) ;
         oIcon.removeAttribute( "width" ) ;
         oIcon.removeAttribute( "height" ) ;
      }
   }

   if( No_GM )
   {
      //GM_log( 'Adding menu' ) ;
      var bottomTD = GetLastFromEval( ".//td[@class='ptcListContainerCellLeft']",oMessages, false ) ;
   
      if( bottomTD )
      {
         var GM_td = document.createElement( "td" ) ;
         var GM_menu = document.createElement( "a" ) ;
      
         GM_menu.appendChild( document.createTextNode( "About Forum Reformatter Configuration" ) ) ;
         GM_menu.title = "About Forum Reformatter Configuration" ;
         GM_menu.setAttribute( 'href', '#' ) ;
         GM_menu.onclick = function(){GM_log( 'Before menu' ) ; configureScript(null) ; GM_log( 'After menu' );} ;
      
         GM_td.appendChild( GM_menu );
         bottomTD.parentNode.appendChild( GM_td );
      }
   }


// To move the prev/next discussion links:
// 
//    else
//    {
//       oPrevDisc = GetFirstFromEval( ".//span[@class='pfPrevDiscussion']", oMessages, true ) ;
//       if( ! oPrevDisc )
//          oPrevDisc = GetFirstFromEval( ".//span[@class='pfPrevDiscussionGray']", oMessages, true ) ;
//       oNextDisc = GetFirstFromEval( ".//span[@class='pfNextDiscussion']", oMessages, true ) ;
//       if( ! oNextDisc )
//          oNextDisc = GetFirstFromEval( ".//span[@class='pfNextDiscussionGray']", oMessages, true ) ;
//
//       oPrevDisc.parentNode.removeChild( oPrevDisc ) ;
//       oNextDisc.parentNode.removeChild( oNextDisc ) ;
//
//       oDiv = document.createElement( "div" ) ;
//       oDiv.appendChild( oPrevDisc ) ;
//       oDiv.appendChild( oNextDisc ) ;
//
//       oNav = GetFirstFromEval( ".//div[@class='ptcMsgNavGroup']", oMessages, true ) ;
//
//       if( oNav )
//       {
//          if( oNav.nextSibling )
//             oNav.parentNode.insertBefore( oDiv, oNav.nextSibling ) ;
//          else
//             oNav.parentNode.appendChild( oDiv ) ;
//       }
//    }
}

// Reformat an individual posting
function ChangePosting( domMsg, msgDiv )
{
   GM_log( "ChangePosting1" ) ;

   var isPoll = false ;
   // test for deleted message
   dList = document.evaluate(".//table[@class='ptMsgAltered']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( dList.snapshotLength )
   {
      oDiv = document.createElement( "div" ) ;
      oDiv.className = "pfDiscInfoBar" ;
      //table.setAttribute('border = 0' ) ;
      oDiv.appendChild( dList.snapshotItem(0) ) ;      
      msgDiv.appendChild( oDiv ) ;

      return ;
   } 

// test for ignored message
   dList = document.evaluate(".//td[@class='pfMsgBody']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( dList.snapshotLength == 0 )
   {
      table = GetFirstFromEval( ".//table[@class='msgtable']", domMsg, false ) ;
      table.parentNode.removeChild( table ) ;
      table.className = "ptcTableContainer" ;
      table.border="0" ;
      td = GetFirstFromEval( ".//td", table, true ) ;
      td.parentNode.removeChild( td ) ;
      oDiv = document.createElement( "div" ) ;
      oDiv.className = "pfDiscInfoBar" ;
      //table.setAttribute('border = 0' ) ;
      oDiv.appendChild( table ) ;      
      msgDiv.appendChild( oDiv ) ;
      // do nothing
      return ;
   } 

   divMsg = msgDiv ;

   oMemberImage = 0 ;

   if( gShowFullName )
   {
      oFullName    = 0 ;

      dList = document.evaluate(".//td[@class='pfMsgBio']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      if( dList.snapshotLength )
      {
         if( ! gBlockAvatars )
         {
            oImg = dList.snapshotItem(0).getElementsByTagName( "IMG" )
            if( oImg.length )
               oMemberImage = oImg[0] ;
         }

         oFullName = GetFirstFromEval( ".//a[@class='ptcListLink']", dList.snapshotItem(0), false )
      }
   }
   else
   {
      if( ! gBlockAvatars )
      {
         dList = document.evaluate(".//td[@class='pfMsgBio']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
         if( dList.snapshotLength )
         {
            oImg = dList.snapshotItem(0).getElementsByTagName( "IMG" )
            if( oImg.length )
               oMemberImage = oImg[0] ;
         }
      }
   }

   dList = document.evaluate(".//input[@id='MBpoll_tid']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( dList.snapshotLength )
   {
      isPoll = true ;

      oMsg = dList.snapshotItem(0) ;
   } 
   else
   {
      //dList = document.evaluate(".//div[@id='PTID-messageList-messageDisplay-body']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      dList = document.evaluate(".//table[@class='ptPollResultsTable']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      //GM_log( "IsPoll? " + dList.snapshotLength ) ;
      if( dList.snapshotLength )
      {
         // Poll Results
         isPoll = true ;
      }
   }

   if( isPoll )
   {
      //GM_log( "IsPoll!" ) ;
      dList = GetFirstFromEval( ".//td[@class='pfMsgBio']", domMsg, false );
      if( dList )
      {
         oFromText = document.createTextNode( "From: " ) ;
         oFromUID = GetFirstFromEval( ".//a[@class='ptcListLink']", dList, false ) ;

         dList = GetFirstFromEval( ".//td[@class='pfMsgEnvelope']", domMsg, false );
         dListContainer = GetFirstFromEval(".//td[@class='ptcListContainerCell']", dList, false ) ;

         oMessageText = GetFirstFromEval( ".//span[@class='ptcPrefix']", dListContainer, false ) ;
         oMessageVal  = GetFirstFromEval( ".//span[@class='ptcListLink']", dListContainer, false ) ;
         oNrMessages  = GetFirstFromEval( ".//span[@class='ptcListText']", dListContainer, false ) ;

         dListContainer = GetFirstFromEval(".//td[@class='ptcListContainerCellLeft']", dList, false ) ;
         tempE = document.evaluate(".//span[@class='ptcPrefix']",dListContainer,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

         if( tempE.snapshotLength > 1 )
         {
            oPostedText = tempE.snapshotItem(1) ;
            oPostedVal  = oPostedText.nextSibling ;
         }
      }
      else
      {
         oFromText    = document.createTextNode( "" ) ;
         oFromUID     = document.createTextNode( "" ) ;
         oMessageText = document.createTextNode( "" ) ;
         oMessageVal  = document.createTextNode( "" ) ;
         oNrMessages  = document.createTextNode( "" ) ;
         oPostedText  = document.createTextNode( "" ) ;
         oPostedVal   = document.createTextNode( "" ) ;
      }
      oGavel = 0 ;
      oToText = document.createTextNode( "To: " ) ;
      oToUID = document.createTextNode( "All" ) ;
      oUnread = 0 ;

      oReplytoText = 0 ;

      oMsgBody = document.createElement( "div" ) ;
      tempE = GetFirstFromEval(".//td[@class='pfMsgBody']", domMsg, false ) ;
      if( tempE )
      {
         tempChild = tempE.firstChild ;

         while( tempChild )
         {
            nextChild = tempChild.nextSibling ;

            tempChild.parentNode.removeChild( tempChild ) ;

            oMsgBody.appendChild( tempChild ) ;

            tempChild = nextChild ;
         }

//          tempE.width = "100%" ;
//          while( tempTR = GetFirstFromEval( "./td", tempE, false ) )
//          {
//             tempE.width = "100%" ;
//             tempE = tempE.nextSibling ;
//          }
//
//
//          oMsgBody.appendChild( tempE ) ;
      }
      else
         oMsgBody.appendChild( document.createTextNode( " " ) ) ;


//       dlist = document.evaluate(".//td[@class='pfMsgBody']",domMsg,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
//       if( dList.snapshotLength )
//       {
//          oElement = dlist.snapshotItem(0) ;
//
//          while( oElement.firstChild )
//          {
//             tempE = oElement.firstChild ;
//             oElement.removeChild( tempE ) ;
//
//             oMsgBody.appendChild( tempE ) ;
//          }
//       }
      oMsgSig = document.createElement( "div" ) ;
      oEdit = 0 ;
      oAttachment = 0 ;
      sUser = "" ;

      oReply  = GetFirstFromEval( ".//span[@class='ptbReply']", domMsg, false ) ;
      oEditBtn   = GetFirstFromEval( ".//span[@class='ptbEdit']", domMsg, false ) ;
      oDeleteBtn = GetFirstFromEval( ".//span[@class='ptbDelete']", domMsg, false ) ;

   } 
   else
   {
      dList = document.evaluate(".//td[@class='pfMsgBio']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      if( dList.snapshotLength )
      {
         oFromText = document.createTextNode( "From: " ) ;
         oFromUID = GetFirstFromEval( ".//a[@class='ptcListLink']", dList.snapshotItem(0), false ) ;
      }
      else
      {
         oFromText = document.createTextNode( "" ) ;
         oFromUID = document.createTextNode( "" ) ;
      }

//      if( n.nodeName == "IMG" )
//      {
//         oGavel = n ;
//         n = n.nextSibling ;
//         n = n.nextSibling ;
//      } else
         oGavel = 0 ;
      
      dList = GetFirstFromEval(".//td[@class='pfMsgEnvelope']", domMsg, false ) ;

      oToText = GetFirstFromEval( ".//span[@class='ptcPrefix']", dList, false ) ;
      oToUID  = GetFirstFromEval( ".//a[@class='ptcMemberLink']", dList, false ) ;
      if( !oToUID )
         oToUID  = GetFirstFromEval( ".//span[@class='ptcMemberLink']", dList, false ) ;

      oUnread = GetFirstFromEval( ".//span[@class='pfUnread']", dList, false ) ;

      if( oUnread )
         n = oUnread.parentNode.nextSibling ;
      else
         n = oToText.parentNode.nextSibling ;

      oPostedText = n.firstChild ;
      oPostedVal  = oPostedText.nextSibling ;

      dListContainer = GetFirstFromEval(".//td[@class='ptcListContainerCell']", dList, false ) ;

      oMessageText = GetFirstFromEval( ".//span[@class='ptcPrefix']", dListContainer, false ) ;
      oMessageVal  = GetFirstFromEval( ".//span[@class='ptcListLink']", dListContainer, false ) ;
      oReplytoText = GetFirstFromEval( ".//span[@class='ptcListHead']", dListContainer, false ) ;
      oReplytoVal  = oReplytoText.nextSibling ;
      oNrMessages  = GetFirstFromEval( ".//span[@class='ptcListText']", dListContainer, false ) ;

      oMsgBody = GetFirstFromEval( ".//div[@class='pfMsgText']", domMsg, false ) ;
      oMsgSig  = GetFirstFromEval( ".//div[@class='pfMsgSig']", domMsg, false ) ;
      if( oMsgSig )
         oMsgSig.setAttribute('style', "padding-top: 5px !important; padding-bottom: 0 !important;");
      
      oEdit = GetFirstFromEval( ".//div[@class='pfMsgEditHistory']", domMsg, false ) ;
      
      oAttachment = GetFirstFromEval( ".//div[@class='pfMsgAttachments']", domMsg, false ) ;

      oReply  = GetFirstFromEval( ".//span[@class='ptbReply']", domMsg, false ) ;
      oEditBtn   = GetFirstFromEval( ".//span[@class='ptbEdit']", domMsg, false ) ;
      oDeleteBtn = GetFirstFromEval( ".//span[@class='ptbDelete']", domMsg, false ) ;
      
      if( oFromUID.text )
         sUser = oFromUID.text ;
      else
         sUser = "" ;
   }
   oGavel = oFromUID.nextSibling ;

   // Rebuild

   if( gReplaceTruncated && oMsgBody.innerHTML.indexOf( "View Full Message</a>" ) != -1 )
   {
      //GM_log(oMsgBody.innerHTML);
      //href="/n/pfx/forum.aspx

      var iBegin = oMsgBody.innerHTML.indexOf( "href=\"/n/pfx/forum.aspx" ) ;
      if( iBegin != -1 )
      {
         //<a class="ptbAction" href="/n/pfx/forum.aspx?tsn=2&amp;nav=display&amp;webtag=ab-atheism&amp;tid=46189" onmouseout="this.blur();return true;">View Full Message</a>

         var t = oMsgBody.innerHTML.substr( iBegin +6 ) ;
         var iEnd = t.indexOf( "\"" ) ;
         var url = "http://forums.about.com" +t.substr( 0, iEnd ) ;

         LoadTruncated( gTruncatedIndex, url.replace(/\&amp;/g,'&') ) ;
         if( gReplaceTruncatedT )
         {
            oMsgBody.innerHTML = "<div id=pfMsgBody" +gTruncatedIndex +">" +oMsgBody.innerHTML.substr( 0, iBegin +6 ) +"#\" onclick=\"document.getElementById('TruncatedMsg" +gTruncatedIndex +"').style.display='block';document.getElementById('pfMsgBody" +gTruncatedIndex +"').style.display='none';\"" +t.substr( iEnd +1 ) +"</div>";
            oMsgBody.innerHTML += "<div style=\"display:none\" id=\"TruncatedMsg" +gTruncatedIndex +"\">&nbsp;</div>"  ;
         }
         else
         {
            oMsgBody.innerHTML = "<div id=\"TruncatedMsg" +gTruncatedIndex +"\">&nbsp;</div>"  ;
         }
         gTruncatedIndex ++ ;
      }
   }

   table = document.createElement("table");
   table.className = "ptcTableContainer" ;
   table.setAttribute('style', "background-color: rgb(243,250,252)" );

   tr = document.createElement("tr");
   td = document.createElement("td");
   td.appendChild( oNrMessages ) ;
   td.appendChild( document.createTextNode("\u00a0\u00a0") ) ;
   td.appendChild( oPostedText ) ;
   td.appendChild( oPostedVal ) ;
   tr.appendChild( td ) ;
   td = document.createElement("td");
   td.appendChild( oMessageText ) ;
   if( gDualList && ! isPoll ) // Add event handlers
      oMessageVal.firstChild.addEventListener("click", ThreadListLinkHandler, true);
   td.appendChild( oMessageVal ) ;
   if( oReplytoText )
   {
      td.appendChild( document.createTextNode(" ") ) ;
      td.appendChild( oReplytoText ) ;
      if( gDualList ) // Add event handlers
         oReplytoVal.firstChild.addEventListener("click", ThreadListLinkHandler, true);
      td.appendChild( oReplytoVal ) ;
   }
   tr.appendChild( td ) ;
   if( ! gBlockAvatars && oMemberImage )
   {
      if( gResizeAvatar )
      {
         //GM_log( "-Avatar: " + oFromUID.firstChild.nodeValue ) ;
         //GM_log( "-Width: " +oMemberImage.width + ", height:" +oMemberImage.height ) ;
         //GM_log( "-cWidth: " +oMemberImage.clientWidth + ", cheight:" +oMemberImage.clientHeight ) ;
         //GM_log( "-nWidth: " +oMemberImage.naturalWidth + ", nheight:" +oMemberImage.naturalHeight ) ;

         if( oMemberImage.height < 50 && oMemberImage.naturalHeight > 50 )
         {
            //nothing
         }
         else
         {
            //oMemberImage.style.maxHeight = 50 ;
            oMemberImage.style.maxHeight = "50px" ;
            oMemberImage.removeAttribute('width');
         }
      
         if( false )
         {
            if( oMemberImage.clientHeight > 5 && oMemberImage.clientHeight < 50 )
            {
               oMemberImage.height = oMemberImage.clientHeight ;
               GM_log( "Adjust to clientHeight" ) ;
            }
            if( oMemberImage.naturalHeight > 50 )
            {
               oMemberImage.removeAttribute('width');
               oMemberImage.height = 50 ;
               GM_log( "Adjust because of naturalHeight" ) ;
            }
            
            if( oMemberImage.height > 50 )
            {
               oMemberImage.removeAttribute('width');
               oMemberImage.height = 50 ;
               GM_log( "Adjust" ) ;
            }
         }
         //GM_log( "=Width: " +oMemberImage.width + ", height:" +oMemberImage.height ) ;
         //GM_log( "=Width: " +oMemberImage.clientWidth + ", height:" +oMemberImage.clientHeight ) ;
      }
      td = document.createElement("td");
      td.appendChild( oMemberImage ) ;
      td.rowSpan = 3 ;
      td.align="right" ;
      tr.appendChild( td ) ;
   }
   table.appendChild( tr ) ;
   tr = document.createElement("tr");
   td = document.createElement("td");
   td.colSpan = 2 ;
   td.appendChild( oFromText ) ;
   td.appendChild( oFromUID ) ;
   if( oGavel )
      td.appendChild( oGavel ) ;
   td.appendChild( document.createElement("br") ) ;
   td.appendChild( oToText ) ;
   td.appendChild( oToUID ) ;
   if( oUnread )
   {
      oUnread.innerHTML = "  " + oUnread.innerHTML ;
      td.appendChild( oUnread ) ;
   }
   tr.appendChild( td ) ;
   table.appendChild( tr ) ;

   div1 = document.createElement("div");
   div1.className = "pfDiscInfoBar" ;
   div1.appendChild( table ) ;
   div1.setAttribute('style', "border-color: rgb(185,209,215); border-width: 3px; border-bottom-width: 1px;" );
   
   divMsg.appendChild( div1 ) ;


   table = document.createElement("table");
   table.className = "pfMsgDisplayTable" ;
   table.setAttribute('style', "border-color: rgb(185,209,215); border-width: 3px; border-top-width: 0px;" );

   tr = document.createElement("tr");
   td = document.createElement("td");
   td.className = "pfMsgBody" ;
   td.width = "100%" ;
   div = document.createElement("div");
   div.id='PTID-messageList-messageDisplay-body' ;

   oMsgBody.className = "pfMsgText" ;
   oMsgBody.setAttribute('style', "padding-bottom: 0px;width: auto");

   if( gRemoveFormatting )
   {
      var html = oMsgBody.innerHTML ;
      oMsgBody.innerHTML = html.replace(/<[/]?(font|span|u|i|b|strong|em|[ovwxp]:\w+)[^>]*?>/gi, '') ; 
   }

   div.appendChild( oMsgBody ) ;
   
   if( oMsgSig.style )
      oMsgSig.style.width = "auto" ;
   oMsgSig.setAttribute('style', "padding-top: 0px;width: auto");

   if( gHTMLSigs )
   {
      if( oMsgSig.textContent )
      {
         if( oMsgSig.textContent.match(/<[/]?(font|span|u|i|b|strong|em|img src|p[ovwxp]:\w+)[^>]*?>/gi ) )
            oMsgSig.innerHTML = oMsgSig.textContent ; 
      }
   }
   
   if( ! gBlockSigs )
   {
      if( gBlockUserSigs )
      {
         if( ! GM_getValue( "BlockSig-" + sUser, 0 ) )
            div.appendChild( oMsgSig ) ;
      } else
         div.appendChild( oMsgSig ) ;
   }

   if( oEdit )
   {
      div.appendChild( oEdit );
      oEdit.className = "pfMsgText" ;
      oEdit.style.width = "auto" ;
   }

   if( oAttachment )
   {
      div.appendChild( oAttachment );
//         oEdit.className = "pfMsgText" ;
//         oEdit.style.width = "auto" ;
   }

   var tempdiv = document.createElement("div");
   var temptable = document.createElement("table");
   var temptr = document.createElement("tr");
   var temptd = document.createElement("td");
   temptd.setAttribute('style', "vertical-align: middle; text-align: left!important;");
   temptr.appendChild( temptd ) ;
   
   if( ! isPoll && oReply )
   {
      oReply.firstChild.innerHTML = "Reply" ;
      oReply.setAttribute('style', "display: inline;line-height: 16px;vertical-align: baseline;background-repeat: no-repeat;background-position: left center;padding-top: 2px;padding-bottom: 0px;padding-left: 22px;background-image: url(" +replyIcon.src +");" ) ;

      temptd.appendChild( oReply ) ;
   }

   if( oEditBtn )
      temptd.appendChild( oEditBtn ) ;
   if( oDeleteBtn )
      temptd.appendChild( oDeleteBtn ) ;


   var toolList = document.evaluate(".//td[@class='ptcListContainerCellRight']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( toolList.snapshotLength )
   {
      oTool = toolList.snapshotItem(0).firstChild ;

//      while( oTool )
//      {
//         nextTool = oTool.nextSibling ;

//         oTool.parentNode.removeChild( oTool ) ;

         temptd.appendChild( oTool ) ;

//         oTool = nextTool ;
//      }
   }



   if( ! gBlockSigs && gBlockUserSigs )
   {
      tempdd = document.createElement("span");
      
      var sHTML = "<input type=checkbox align=right name='BlockSig-" + sUser + "' id='BlockSig-" + sUser + "'" ;
      if( GM_getValue( "BlockSig-" + sUser, 0 ) )
         sHTML = sHTML + " checked='checked'" ;
      sHTML = sHTML + "><label for='BlockSig-" + sUser + "' style='color:rgb(51, 102, 204)'>Block&nbsp;Sig</label>" ;
      tempdd.innerHTML = sHTML ;
      
      tempinp = tempdd.getElementsByTagName( "INPUT" )[0] ;
      tempinp.addEventListener('click',BlockSigHandler,false);
      
      temptd.appendChild( tempdd ) ;
   }
   toolList = document.evaluate(".//span[@class='ptbSetPrivs']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( toolList.snapshotLength )
   {
      tempdd = document.createElement("td");
      tempdd.className = "pfMsgActionBar" ;
      tempdd.setAttribute('style', "text-align: right;");
      tempdd.appendChild( toolList.snapshotItem(0) ) ;
      temptr.appendChild( tempdd ) ;
   }
   toolList = document.evaluate(".//span[@class='ptbReportViolation']",domMsg,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( toolList.snapshotLength )
   {
      tempdd = document.createElement("td");
      tempdd.className = "pfMsgActionBar" ;
      tempdd.setAttribute('style', "text-align: right;");
      tempdd.appendChild( toolList.snapshotItem(0) ) ;
      temptr.appendChild( tempdd ) ;
   }
   temptable.appendChild( temptr ) ;
   temptable.width = "100%" ;
   temptable.className = "ptcTableContainer" ;

   td.appendChild( div ) ;
   tr.appendChild( td ) ;
   table.appendChild( tr ) ;
   divMsg.appendChild( table ) ;

   tempdiv.appendChild( temptable ) ;

   div.appendChild( tempdiv ) ;

   tempdiv = document.createElement("div");
   tempdiv.innerHTML = "&nbsp;" ;
   divMsg.appendChild( tempdiv ) ;
}

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};


function FixReplyPage()
{
   var aboutEditor ;
   var domList, domMsg, msgDiv, msgDivP, domElement ;

   // Check to see if this is the 'Continue' page
   // If so, just press the one and only button (change the location to the href value)
   domList = document.evaluate( "//a[@class='vBtn']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( domList.snapshotLength )
   {
      window.location = domList.snapshotItem(0).href ;

      return ;
   }

   GM_log( "In Editor" ) ;

//   domMsg = GetFirstFromEval( ".//img[@title='Underline']", document, false ) ;
//   if( domMsg )
//   {
//      GM_log( "found button") ;
//   }

   domMsg = GetFirstFromEval( ".//div[@class='pfMessageDisplayPostcard']", document, false ) ;

   if( domMsg )
   {
      GM_log( domMsg ) ;
   
      msgDiv = document.createElement('div' ) ;
      msgDiv.className = 'pfMessage' ;
      msgDivP = document.createElement('div' ) ;
      msgDivP.className = 'pfMessageDisplayPictureFrame' ;
      msgDiv.appendChild( msgDivP ) ;
   
      ChangePosting( domMsg, msgDivP ) ;
   
      // Swap opriginal emelent with our tweaked one
      domMsg.parentNode.insertBefore( msgDiv, domMsg ) ;
   
      domMsg.parentNode.removeChild( domMsg ) ;
   }

   RemoveElementByID( 'ptcBrandHeader' ) ;
   RemoveElementByID( 'ptcBrandFooter' ) ;
   RemoveElementByID( 'ptcContentTop' ) ;
   
   RemoveElementByID( "PTID-messageList-header-messageNavBar" ) ;
   RemoveElementByID( "ptcBodyRight" ) ;
   RemoveElementByID( 'pfBelowMsgsHtml' ) ;

   
//    domList = document.evaluate( "//div[@class='pfMessageDisplayPictureFrame']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//    if( domList.snapshotLength )
//    {
//       domMsg = domList.snapshotItem( 0 ) ;
//       msgDiv = document.createElement( 'div' ) ;
//       msgDiv.className = 'pfMessage' ;
//       msgDivP = document.createElement( 'div' ) ;
//       msgDivP.className = 'pfMessageDisplayPictureFrame' ;
//       msgDiv.appendChild( msgDivP ) ;
//
//       ChangePosting( domMsg, msgDivP ) ;
//
//       domMsg.parentNode.insertBefore( msgDiv, domMsg ) ;
//
//       domMsg.parentNode.removeChild( domMsg ) ;
//    }


   // Turn off the options dialog
   domElement = document.getElementById( 'csPostOptionsDiv' ) ;
   if( domElement )
      document.getElementById('csPostOptionsDiv').style.display = "none" ;

   // Turn on Firefox SpellChecker
//   AboutEditor = document.getElementById( 'mMsg_body_Editor' ) ;

//   editor = document.getElementById("mMsg_body_Editor").contentWindow;
//   editor.focus();

//   if( gDefaultStyle )
//   {
      // Add private posting style
//      editor.document.execCommand('removeformat', false, null);
      //editor.document.execCommand('styleWithCSS', false, true);
//      AddDefaultStyle( editor ) ;
//   }

//   AboutEditor.contentDocument.body.spellcheck = true ;
   
   if( document.getElementById( 'mMsg_signature' ) )
   {
      var main ;
      main = document.getElementById( 'csPostReplyDiv' ) ;
      if( main )
      {
         var oElement = document.createElement( "center" ) ;
         oElement.appendChild(CreatePushButton( 'QuickQuoteAbout', 'Quick Quote' ) ) ;
         main.parentNode.insertBefore( oElement, main ) ;

      }
   }

   domList = document.evaluate( "//ul[@class='ptcListFlow']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( domList.snapshotLength )
   {
      var oScript = document.createElement("script");
      oScript.type = "application/javascript";
      oScript.textContent = "" ;
      oScript.textContent += "function InsertPicture(){";
      oScript.textContent += "var pictureURL = prompt(\"Please enter the URL of the picture\", \"\");" ;
      oScript.textContent += "if(pictureURL != null ){";
      oScript.textContent += "var editor = document.getElementById('CE_mMsg_body_ID');" ;
      oScript.textContent += "editor.PasteHTML( \"<img src='\" +pictureURL+\"'>\" ) ;" ;
      oScript.textContent += "}}";
      domList.snapshotItem( 0 ).appendChild( oScript ) ;

      var oLi = document.createElement("li");
      var oSpan = document.createElement("span");
      oSpan.className = 'pfPostOptions' ;
      var oLink = document.createElement("a");
      oLink.href = "javascript:InsertPicture()" ;
      oLink.title = "Insert Image" ;
      oLink.appendChild( insertImageIcon ) ;
      oLink.appendChild( document.createTextNode( "Insert Image" ) ) ;
      oSpan.appendChild( oLink ) ;
      oLi.appendChild( oSpan ) ;

      domList.snapshotItem( 0 ).appendChild( oLi ) ;

   }

   GM_log( "gEditWindowSize: " +gEditWindowSize ) ;

   if( gEditWindowSize.valueOf() > 0 )
   {
      var oEditDiv = document.getElementById( 'ptcMainTemplate' ) ;
      if( oEditDiv )
      {
         GM_log( "setting size" ) ;
         oEditDiv.setAttribute('style', "width: " +gEditWindowSize +";");
      }
   }
}


function FixEditPage()
{
   var aboutEditor ;
   var domList, domMsg, msgDiv, msgDivP, domElement ;

   // Check to see if this is the 'Continue' page
   // If so, just press the one and only button (change the location to the href value)
   domList = document.evaluate( "//a[@class='vBtn']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( domList.snapshotLength )
   {
      window.location = domList.snapshotItem(0).href ;

      return ;
   }

   GM_log( "In Editor" ) ;

   RemoveElementByID( 'ptcBrandHeader' ) ;
   RemoveElementByID( 'ptcBrandFooter' ) ;
   RemoveElementByID( 'ptcContentTop' ) ;
   
   RemoveElementByID( "PTID-messageList-header-messageNavBar" ) ;
   RemoveElementByID( "ptcBodyRight" ) ;
   RemoveElementByID( 'pfBelowMsgsHtml' ) ;

   
//    domList = document.evaluate( "//div[@class='pfMessageDisplayPictureFrame']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
//    if( domList.snapshotLength )
//    {
//       domMsg = domList.snapshotItem( 0 ) ;
//       msgDiv = document.createElement( 'div' ) ;
//       msgDiv.className = 'pfMessage' ;
//       msgDivP = document.createElement( 'div' ) ;
//       msgDivP.className = 'pfMessageDisplayPictureFrame' ;
//       msgDiv.appendChild( msgDivP ) ;
//
//       ChangePosting( domMsg, msgDivP ) ;
//
//       domMsg.parentNode.insertBefore( msgDiv, domMsg ) ;
//
//       domMsg.parentNode.removeChild( domMsg ) ;
//    }


   // Turn off the options dialog
   domElement = document.getElementById( 'csPostOptionsDiv' ) ;
   if( domElement )
      document.getElementById('csPostOptionsDiv').style.display = "none" ;

   // Turn on Firefox SpellChecker
   AboutEditor = document.getElementById( 'mMsg_body_Editor' ) ;
   //AboutEditor = document.getElementById( 'mMsg_body' ) ;
   //AboutEditor.spellcheck = true ;
   AboutEditor.contentDocument.body.spellcheck = true ;
   
   if( document.getElementById( 'mMsg_signature' ) )
   {
      var main ;
      main = document.getElementById( 'csPostReplyDiv' ) ;
      if( main )
      {
         var oElement = document.createElement( "center" ) ;
         oElement.appendChild(CreatePushButton( 'QuickQuoteAbout', 'Quick Quote' ) ) ;
         main.parentNode.insertBefore( oElement, main ) ;
      }
   }

   GM_log( "gEditWindowSize: " +gEditWindowSize ) ;

   if( gEditWindowSize.valueOf() > 0 )
   {
      var oEditDiv = document.getElementById( 'ptcMainTemplate' ) ;
      if( oEditDiv )
      {
         oEditDiv.setAttribute('style', "width: " +gEditWindowSize +";");
      }
   }
}


function FixFullPage()
{
   var domList, domMsg, msgDiv, msgDivP ;

   RemoveElementByID( 'ptcBrandHeader' ) ;
   RemoveElementByID( 'ptcBrandFooter' ) ;
   RemoveElementByID( 'ptcContentTop' ) ;
   
   RemoveElementByID( "PTID-messageList-header-messageNavBar" ) ;
   RemoveElementByID( "ptcBodyRight" ) ;
   
   domList = document.evaluate( "//div[@id='ptcBodyDiv']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( domList.snapshotLength )
   {
      domMsg = domList.snapshotItem( 0 ) ;
      msgDiv = document.createElement( 'div' ) ;
      msgDiv.className = 'pfMessage' ;
      msgDivP = document.createElement( 'div' ) ;
      msgDivP.className = 'pfMessageDisplayPictureFrame' ;
      msgDiv.appendChild( msgDivP ) ;

      ChangePosting( domMsg, msgDivP ) ;

      domMsg.parentNode.insertBefore( msgDiv, domMsg ) ;
      
      domMsg.parentNode.removeChild( domMsg ) ;
   }
}


function FixThreadList()
{
   var domList ;

   var oSearch = GetFirstFromEval( ".//div[@class='ptcSearch']", document, 0 ) ;

   RemoveElementByID( 'ptcBrandHeader' ) ;
   RemoveElementByID( 'ptcBrandFooter' ) ;

   RemoveAllEval( "//span[@class='ptcWelcome']",document ) ;
   RemoveElementByID( "ptcLogout" )

//   RemoveElementByID( 'ptcContentTop' ) ;
   
//   RemoveElementByID( "PTID-messageList-header-messageNavBar" ) ;
   RemoveElementByID( "ptcBodyRight" ) ;

   if( ! gBlockTemperature )
   {
      domList = document.evaluate("//td[@class='ptcTemperature']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      for( i = 0 ; i < domList.snapshotLength ;  i ++ )
         domList.snapshotItem(i).className = 'ptcTemperatureModified' ;
   }
   $('PTID-discussionList-footer').appendChild( oSearch ) ;
}


function ReformatThreadList( response )
{
   var nav, oThreadMenu, doc, div, domList, domList2, theForm ;
//   GM_log( "ReformatThreadList" ) ;

   nav = gNavigate ;

   RemoveAllChildren( nav ) ;

   doc = document.createElement( "div" ) ;

   doc.innerHTML = response.responseText ;

   // Mask this extra form. The names are identical to one in the message body
   theForm = GetFirstFromEval( ".//form[@id='_pttmf']", doc, false ) 
   theForm.id = "_org_pttmf" ;
   theForm.name = "_org_pttmf" ;
   theForm = GetFirstFromEval( ".//input[@id='ptButtonCmd']", doc, false ) 
   theForm.id = "_org_ptButtonCmd" ;
   theForm.name = "_org_ptButtonCmd" ;

   // Get the menu and add the hidden UL to the div
   oThreadMenu = GetFirstFromEval( ".//ul[@id='listModeChooserMenu']", doc, false ) ;
   if( oThreadMenu ) 
   {
      if( gDualList )
         ShowDiscussionAddHandlers( oThreadMenu ) ;

      nav.appendChild( oThreadMenu ) ;
   }

   div = doc.getElementsByTagName('FORM');

   nav.setAttribute( 'style', "overflow: auto; width: 364px; height:" +(window.innerHeight -2)) ;
   nav.appendChild( div[0] ) ;


   if( oSearch )
      nav.appendChild( oSearch ) ;
   if( oVisitorHeader )
      nav.appendChild( oVisitorHeader ) ;
   if( oVisitorList )
      nav.appendChild( oVisitorList ) ;

   domList = document.evaluate("//span[@class='ptcListLink']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   if( domList.snapshotLength )
   {
      var br, aLink, sp, dv, scr ;

      br = document.createElement("br");
      domList.snapshotItem(0).parentNode.parentNode.insertBefore(br, domList.snapshotItem(0).parentNode);
      dv = document.createElement("div");
      //dv.setAttribute('style', "padding-top:6px;" );
      //refreshIcon.setAttribute('style', "padding-top:6px;" );
      aLink = document.createElement("a");
      aLink.href = "javascript:SetRefreshIconText()" ;
      aLink.title = "Refresh" ;
      aLink.appendChild( refreshIcon ) ;
      aLink.addEventListener("click", RefreshThreadListHandler, true);
      domList.snapshotItem(0).parentNode.parentNode.appendChild( document.createTextNode("  ") ) ;
      dv.appendChild( aLink ) ;
      domList.snapshotItem(0).parentNode.appendChild( dv ) ;
      sp = document.createElement("span");
      sp.appendChild( document.createTextNode( " Refreshing..." ) ) ;
      sp.setAttribute('style', "color:red;display:none;" );
      sp.setAttribute('id', "RefreshIconText" );
      domList.snapshotItem(0).parentNode.parentNode.appendChild( sp ) ;
      
      scr = document.createElement("script");
      scr.type="text/javascript";
      scr.text = "function SetRefreshIconText(){document.getElementById('RefreshIconText').setAttribute('style','color:red;display:inline;');}";
      document.body.appendChild(scr);
   }

   RemoveAllEval( "//tr[@class='ptcNameRow']",document ) ;
   RemoveAllEval( "//span[@class='ptcDelimiter']", document ) ;
   RemoveAllEval( "//span[@class='ptbCreatePoll']", document ) ;
//   RemoveAllEval( "//td[@class='ptcValueCell']", document ) ;
   RemoveAllEval( "//td[@class='ptcDiscColViews ptcValueCell']", document ) ;

   domList = document.evaluate("//td[@class='ptcDiscColSubject ptcValueCell']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for( i = 0 ; i < domList.snapshotLength ;  i ++ )
   {
      domItem = domList.snapshotItem( i ) ;

      domItem.firstChild.firstChild.title = "Started by " + domItem.nextSibling.firstChild.text ;
      domItem.parentNode.removeChild( domItem.nextSibling );

      domItem.innerHTML = domItem.innerHTML + "<br>&nbsp;&nbsp;&nbsp;" + domItem.nextSibling.innerHTML ;
      domList2 = document.evaluate(".//img",domItem.previousSibling,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      for( j = 0 ; j < domList2.snapshotLength ;  j ++ )
      {
         if( domList2.snapshotItem(j).parentNode.className != "ptcTemperature" )
            domItem.appendChild( domList2.snapshotItem(j) ) ;
      }
      domItem.parentNode.removeChild( domItem.nextSibling );
   }
   RemoveAllEval( "//td[@class='ptcDiscColStatus ptcValueCell']", document ) ;

   RemoveElementByID( "PTID-discussionList-footer" ) ;


   domList = document.evaluate("//tr[@class='ptcHeadRow']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for( i = 0 ; i < domList.snapshotLength ; i ++ )
   {
      domItem = domList.snapshotItem( i ) ;
      dNew = document.evaluate(".//span[@class='ptbPostNew']",domItem,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
      if( dNew.snapshotLength )
      {
         oPostNew = dNew.snapshotItem(0);

         oTd = oPostNew.parentNode.parentNode.parentNode ;
         oPostNew.firstChild.innerHTML = "New" ;
         oPostNew.firstChild.setAttribute( 'style', "width: 30 !important;" ) ;

         oLi = oTd.previousSibling.firstChild.firstChild.nextSibling.nextSibling ;

         oLi.innerHTML = oLi.innerHTML + "&nbsp;&nbsp;&nbsp;" + oPostNew.innerHTML ;

         oTd.parentNode.removeChild( oTd ) ;
      }
   }
   domList = document.evaluate("//td[@class='ptcDiscColLatest ptcValueCell']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
   for( i = 0 ; i < domList.snapshotLength ;  i ++ )
   {
      domList.snapshotItem( i ).setAttribute('style', "width: 50px;");
   }   
   
   ThreadListAddHandlers();
}
 

function ReformatBody( response )
{
//   GM_log( "ReformatBody" ) ;

   RemoveAllChildren( gBody ) ;

   doc = document.createElement( "div" ) ;

   doc.innerHTML = response.responseText ;

   oNewBody = $('ptcMainTemplate') ;

   oBodyRight = $( 'PTID-messageList-header-messageNavBar' ) ;
   oBodyRight.parentNode.removeChild(oBodyRight);

   ChangeAllPostings( oNewBody ) ;

   if( oNewBody ) 
   {
      gBody.appendChild( oNewBody ) ;
   }

   $( "ptcMainTemplate" ).setAttribute( 'style', "padding-right: 5px; overflow: auto; height:" +window.innerHeight ) ;

   if( gDualList )
      AddHandlersToThreadNavigation( gBody ) ;

   window.setTimeout(function(){LoadThreadList( gNavigate )},1250);
//   LoadThreadList( gNavigate ) ;
}

function ReplaceBody( index, url, response )
{
   GM_log( "ReplaceBody" ) ;

   doc = document.createElement( "div" ) ;

   doc.innerHTML = response.responseText ;

   var oMsgBody = GetFirstFromEval( ".//div[@class='pfMsgText']", doc, false ) ;

   if( gRemoveFormatting )
   {
      var html = oMsgBody.innerHTML ;
      oMsgBody.innerHTML = html.replace(/<[/]?(font|span|u|i|b|strong|em|[ovwxp]:\w+)[^>]*?>/gi, '') ; 
   }
   //RemoveAllEval( "//a[@class='ptbAction']", oMsgBody ) ;

   var oTrunc = $( "TruncatedMsg" +index ) ;
   if( gReplaceTruncatedI )
      oMsgBody.innerHTML += "<Hr><center><span class=\"ptcPrefix\">Originally truncated message</span></center>"  ;

   oTrunc.innerHTML = oMsgBody.innerHTML ;
}



///////////////////////// BACKGROUND LOAD FUNCTIONS /////////////////////////


function LoadThreadList( nav )
{
//   GM_log( "LoadThreadList" ) ;

   // Load ThreadList 
   GM_xmlhttpRequest({
                     method:"GET",
                     url:gThreadListURL,
                     headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},
                     onload:function(response){ReformatThreadList(response);}
                     }) ;
}



function LoadBody( href )
{
//   GM_log( "LoadBody" ) ;

   // Load ThreadList 
   GM_xmlhttpRequest({
                     method:"GET",
                     url:href,
                     headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},
                     onload:function(response){ReformatBody(response);}
                     }) ;

//   window.location.href = href ;
   document.location.hash = href ;
   gHref = href ;
}


function LoadTruncated( index, href )
{
   GM_log( "LoadTruncated (" +index +") [" +href +"]" ) ;

   GM_xmlhttpRequest({
                     method:"GET",
                     url:href,
                     headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},
                     onload:function(response){ReplaceBody(index,href,response);}
                     }) ;
}



///////////////////////// GLOBAL VARIABLES /////////////////////////


var replyIcon = document.createElement('img');
replyIcon.setAttribute('border', 0);
replyIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAv1QTFRFH0aDI0Z+IEqHI0yII06KJU6KL1aOLVeNSlRdN1eLVVdTNVuSP1qHQ2GSPmKXRGaYYmRgZGZiSWmZZmhkaWhla21pT3KhbnBsR3axSHeySXexRniwR3ivSXizV3ajU3mpS3uxTHuydXdzT321UoC0V3+zeXt3VYS5foB7W4e5W4e9g4WAYo2+ZY2+cYyxiIqFaY+9dI2xfZOzk5GNb5fEc5nEc5nFdJrFeZrFeJvCfZvBmpiSfaDJgKLHiKPHiqTFi6jLi6nNk6rHjqzOpau2q6upl6/Jk7LWmbHRmLLSmLLUsrKwrbjJvbu5rsLaw8HAucPVscXdw8PBxcTDtsjeusjcwMjUyMjIusvew8rVysrKzc3Nv8/jzs7Ox8/ZwdDjztHWzdTf0dXSzNfjzNjk1Nzl29/b4N/c3+Hf4eHg2+Lp5OTk5ubm6urq6+vr7Ozs7e3t7u7u7+/v8PDw8fHx8vLy8/Lx8/Px8/Pz8/P19PT09fX19vb29/f09/f3+Pj4+fn5+fn7+vr6+vv5+/v7/Pv6/vz0/Pz6/Pz7/Pz8/f39/v78////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////y+SadQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH2AMREQsmsaHruQAAAMpJREFUGNNjYEAH1vooQIRBvwcF6DNoR7d01tfX19XX1dU1lkRrM2j0RHfWVdfUAWFVh2uPBoNST2V0U2lpaUlJVXd0cY8SUKC4JLqrpCjRsDsoCyQg3lNUWBDc1c3E5pueHNAjziDaU5CfnebPlMKUWRuq1yPKINyTm1EWyRQYwc3MZ8nZI8wg2JPTFMYU4unoZWuhy9MjyCAAdA2Tn4Gmgoy0pCpvjwCDMRcQMClLy8pKyTNycMF8xGRnwsrCguxHJncmNF8zQQUAR/Y+W/0vOnAAAAAASUVORK5CYII=';
var replyIconDiv = document.createElement('div');
replyIconDiv.appendChild( replyIcon ) ;

var refreshIcon = document.createElement('img');
refreshIcon.setAttribute('border', 0);
refreshIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMiSURBVDiNbVJNbFRlFD33e++V+a0zbQdbqLYKhhKmoaIzjX/RmEY3xGBYqLxEjJCB8LNhBxsMTQwRdGGi4AOjMUwlmDQBN/wEIZLUwqtx0dCS1NLGAUY7tB3ozLTz3vu+66LzkllwkpvcxT0nJ+dcYmb4SGWyzzTo2hEQ3vSkatWEmCfCuOPKEwAu2Jbp1t0eBHCCfIF0JrtF08RAT9cqfV1ns9HWFAGYUShWMDJ2v3xn+qEnFe+2LfNselc2w4zvAMSImZHKZNcbuhjZ2tcdiseC0InQHA0gHNARDRkIGgIzxUUczw5XCsWKHQ019D4uVw1mNBEz49U9Z0/1rGv7NBgwxK3RHKquB0PX5JrVscW+9PPh3vWtpAmCEIRfrk2ot15sFwe+vuo4rmzRAYCZP7wzXRCup1gxLzLjM8eVZ8anZ5MT9+aPXu9o7tq3dVMoEQvh43e7RC0GAqAEAEipwlXH85IvPPuDlOoRgEHbMvO2ZV7549uPXhqdLOzdfewS7j8sYXqmDKkYAAMACyyvqumpSH9jJPBVZ/vKbgBTdWnruiZ2bnsn6XY+HUWicQU0Qb4D1mt38V8/37yAJ+O0J9VrF4cnq1ftqSXfvOOqAAD2W6gCMGoErpvfAOwE4D5BWLct854v4J0/+r4GEJgZF+1/1Knzf+WkVD22ZRbrWYezY6tK5aWO30fGbwCI6QBABBAR7v5XhiEYJwf/JABf1JNTmWyYiO72blx7Jj8zlwKgAagKABBEBAAdiRBWt4Tx5f63qa0lcuyVPT/fSmWy6ZrG9hWGrufyswfyheLrmkaubZmuWHZAeFxxcWFoij2P0b4yisM73gh90Jd8ubU5ci29a8A1dPGNVDI+92gBTY1B0oQYBAD/kaj/x6Glidzc5KXhyc7Mlk3hRCyI7rUJeq49HiqWXfw7W4LjeBQJGjh3ebTiSXUEAJYfSTFN5OZO3zy5LfmgsPBJ//c35o8P3CwN384jP1tG1ZUQRCjMl+S5y6OLUqmMbZljAOC38BOA7bZlci0wA8B7DYa2VzFvkFLFDV2bIcJQ1ZGHbMv82w/3fy5VdmoTZczGAAAAAElFTkSuQmCC" ;
var refreshIconDiv = document.createElement('div');
refreshIconDiv.appendChild( refreshIcon ) ;

var insertImageIcon = document.createElement('img');
insertImageIcon.setAttribute('border', 0);
insertImageIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1wESDxIlPDPTOgAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAABCElEQVR42q2UvW3DMBCFv2dphaQw4g1cuDRcaQRnIh0nygqsApUqtIEBF8kKMZiCCvRjiVGsXHOAgPv03iOPauoqA56AnMfrC/jMgWfgDdiugF2B1xzIgO3+cNw9SmrqCiAbWAsBIABa3KVufjP8R3rQOUOKAOdc+70rNXX1ArzvD8fdb8okYRYHzaITCZq6ugCnPym7r6Gy0XVIZ2TmsFZa7ErB0srKMlCWNqt4k1L2E/ZS67PKYtjRkmSE0IFDmAZOZtYHmRlmhmR471t4H5i4Z31QF3TsRVEA4L1H0t1pDmBjRcuAM7AxYGx1Cji7ASsW/QKccuAGXNvNX/ME3XLgAzj/x+P4DdCJjDzhNlZvAAAAAElFTkSuQmCC" ;
var insertImageIconDiv = document.createElement('div');
insertImageIconDiv.appendChild( insertImageIcon ) ;

var gNavigate ;
var gThreadListURL ;
var gBody ;
var gHref ;
var gTruncatedIndex ;

var gURL = window.location.href ;

var gAboutForum = gURL.replace( /.*webtag=/, "" ) ;
gAboutForum = gAboutForum.replace( /\&.*/, "" ) ;

nIconStyle = "82" ;


///////////////////////// USER CONFIGURATION /////////////////////////


//var gCheckVersion      = MakeBoolean( GM_getValue( "CheckVersion",     0 ) ) ;
//var gForceUpdate       = MakeBoolean( GM_getValue( "ForceUpdate",      0 ) ) ;
var gDualList          = MakeBoolean( GM_getValue( "DualList",         0 ) ) ;
var gHTMLSigs          = MakeBoolean( GM_getValue( "HTMLSigs",         0 ) ) ;
var gBlockSigs         = MakeBoolean( GM_getValue( "BlockSigs",        0 ) ) ;
var gBlockUserSigs     = MakeBoolean( GM_getValue( "BlockUserSigs",    0 ) ) ;
var gBlockAvatars      = MakeBoolean( GM_getValue( "BlockAvatars",     0 ) ) ;
var gBlockRightHand    = MakeBoolean( GM_getValue( "BlockRightHand",   0 ) ) ;
var gBlockTemperature  = MakeBoolean( GM_getValue( "BlockTemperature", 1 ) ) ;
var gRemoveFormatting  = MakeBoolean( GM_getValue( "RemoveFormatting", 0 ) ) ;
var gResizeAvatar      = MakeBoolean( GM_getValue( "ResizeAvatar",     0 ) ) ;
var gBlockQuoteStyle   = GM_getValue( "BlockQuoteStyle",  "{border-left: 5px solid #ccc; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; margin-left: 1.5em;padding-left: 5px; font-style: italic;}" ) ;
var gLoadInBackground  = MakeBoolean( GM_getValue( "LoadInBackground", 0 ) ) ;
var gRemoveDiscButt    = MakeBoolean( GM_getValue( "RemoveDiscussionButtons", 1 ) ) ;
var gShowFullName      = MakeBoolean( GM_getValue( "ShowFullName",     1 ) ) ;
var gEditWindowSize    = GM_getValue( "gEditWindowSize",  0 ) ;
var gReplaceTruncated  = MakeBoolean( GM_getValue( "ReplaceTruncated", 1 ) ) ;
var gReplaceTruncatedI = MakeBoolean( GM_getValue( "ReplaceTruncatedIndicator", 1 ) ) ;
var gReplaceTruncatedT = MakeBoolean( GM_getValue( "ReplaceTruncatedToggle", 0 ) ) ;
var gDefaultStyle      = MakeBoolean( GM_getValue( "DefaultStyle",       0 ) ) ;
var gDefaultStyleSize  = GM_getValue( "DefaultStyleSize",   "" ) ;
var gDefaultStyleColor = GM_getValue( "DefaultStyleColor",  "" ) ;
var gDefaultStyleFont  = GM_getValue( "DefaultStyleFont",   "" ) ;
var gDefaultStyleBold  = MakeBoolean( GM_getValue( "DefaultStyleBold",   0 ) ) ;
var gDefaultStyleItalic= MakeBoolean( GM_getValue( "DefaultStyleItalic", 0 ) ) ;

// Adds styles and classes for the configuration layers and its contents
GM_addStyle(("#gsmaskLayer {background-color: black; opacity: 0.5; z-index: 100; " +
             "position: fixed; left: 0px; top: 0px; width: 100%; height: 100%}"));
GM_addStyle(("#gsdialogLayer {background-color: #EEEEEE; overflow: auto; padding: 5px; z-index: 101; " +
             "outline: black solid thin; position: fixed; left: 30%; top: 7%; width: 40%; height: 85%}"));
GM_addStyle("#gsdialogLayer > * {margin: 20px 0px; text-aling: left}");
GM_addStyle("#gsdialogLayer {text-align: left}");
GM_addStyle("#gsdialogLayer li {margin: 15px 0px 7px; font-style: italic}");
GM_addStyle("#gsdialogLayer input {vertical-align: middle}");
GM_addStyle("#gsconfTitle {cursor: default; font-size: 150%; font-weight: bold; text-align: center}");
GM_addStyle("#gsconfButDiv {text-align: center}");
GM_addStyle("#gsconfButDiv input {margin: 5px}");

function checkedString( lVar )
{
   if( lVar ) return( " checked='checked'" ) ;
   return( "" ) ;
}

// Configuration function
function configureScript(evt) 
{
   GM_log( 'In Configuration' ) ;
   // Gets the layers
   var maskLayer   = $("gsmaskLayer");
   var dialogLayer = $("gsdialogLayer");
   
   // Checks the layers state
   // Creates the layers if they don't exist or displays them if they are hidden
   if( (maskLayer) && (dialogLayer) )
   {
      if( (maskLayer.style.display == "none") && (dialogLayer.style.display == "none") )
      {
         setDialogInputState(true); // Makes sure the input fields are enabled
         maskLayer.style.display   = "";
         dialogLayer.style.display = "";
      }
      dialogLayer.focus();
   } 
   else
   {
      createLayers();
   }
   
   return; // Exit function
   
   // Creates the configuration layers
   // It is a nested function
   function createLayers() 
   {
      GM_log( 'createLayers()' ) ;
      //GM_log( gBlockSigs ) ;

      // Creates a layer to mask the page during configuration
      maskLayer = createNode("div",{id: "gsmaskLayer", title: "Click here to return to the page"});
      
      // Creates a layer for the configuration dialog
      dialogLayer = createNode("div",{id: "gsdialogLayer"});
      
      // Creates the configuration dialog HTML
      dialogLayer.innerHTML = "<div id='gsconfTitle'>About Forum Reformatter Configuration</div>" +
                              "<ul>" +
                              "<li>Remove:</li>" +
                              "<input type='checkbox' id='gHTMLSigs'" + checkedString( gHTMLSigs ) + ">Restore HTML in Signatures<br>" +
                              "<input type='checkbox' id='gBlockSigs'" + checkedString( gBlockSigs ) + ">Block Signatures<br>" +
                              "<input type='checkbox' id='gBlockUserSigs'" + checkedString( gBlockUserSigs ) + ">Allow blocking of individual Signatures<br>" +
                              "<input type='checkbox' id='gBlockAvatars'" + checkedString( gBlockAvatars ) + ">Block Avatars<br>" +
                              "<input type='checkbox' id='gBlockRightHand'" + checkedString( gBlockRightHand ) + ">Block right-hand part of the message window<br>" +
                              "<input type='checkbox' id='gBlockTemperature'" + checkedString( gBlockTemperature ) + ">Block the thread-temperature icon<br>" +
                              "<input type='checkbox' id='gRemoveFormatting'" + checkedString( gRemoveFormatting ) + ">Remove Message Formatting<br>" +
                              "<input type='checkbox' id='gRemoveDiscButt'" + checkedString( gRemoveDiscButt ) + ">Remove Prev/Next Discussion Buttons<br>" +
                              "<li>Display:</li>" +
                              "<input type='checkbox' id='gResizeAvatar'" + checkedString( gResizeAvatar ) + ">Resize Avatar<br>" +
                              "<input type='checkbox' id='gShowFullName'" + checkedString( gShowFullName ) + ">Show Member's Full Name<br>" +
                              "<input type='checkbox' id='gReplaceTruncated'" + checkedString( gReplaceTruncated ) + ">Replace truncated posts with the full message<br>" +
                              "&nbsp;&nbsp;&nbsp;<input type='checkbox' id='gReplaceTruncatedI'" + checkedString( gReplaceTruncatedI ) + ">Indicate an originally truncated post<br>" +
                              "&nbsp;&nbsp;&nbsp;<input type='checkbox' id='gReplaceTruncatedT'" + checkedString( gReplaceTruncatedT ) + ">Replace only after clicking on link<br>" +
                              "<input type='checkbox' id='gDualList'" + checkedString( gDualList ) + ">Thread List on the left (Delphi style)<br>" +
                              "<input type='checkbox' id='gLoadInBackground'" + checkedString( gLoadInBackground ) + ">(Delphi style) Load pages in the background<br>" +
                              "Editor window size (0 is max size) <input type='text'     id='gEditWindowSize' value='" + gEditWindowSize +"' size=4><br>" +
                              "<li>Default style for posting:</li>" +
                              "<input type='checkbox' id='gDefaultStyle'" + checkedString( gDefaultStyle ) + ">Add posting style<br>" +
                              "<table>" +
                              "<tr><td><td>&nbsp;&nbsp;&nbsp;</td>Color</td><td><input type='text'     id='gDefaultStyleColor' value='" + gDefaultStyleColor +"' size=10></td></tr>" +
                              "<tr><td><td>&nbsp;&nbsp;&nbsp;</td>Font</td><td><input type='text'     id='gDefaultStyleFont' value='" + gDefaultStyleFont +"' size=20></td></tr>" +
                              "<tr><td><td>&nbsp;&nbsp;&nbsp;</td>Size</td><td><input type='text'     id='gDefaultStyleSize' value='" + gDefaultStyleSize +"' size=3></td></tr>" +
                              "<tr><td><td>&nbsp;&nbsp;&nbsp;</td>Bold</td><td><input type='checkbox' id='gDefaultStyleBold'" + checkedString( gDefaultStyleBold ) + "</td></tr>" +
                              "<tr><td><td>&nbsp;&nbsp;&nbsp;</td>Italic</td><td><input type='checkbox' id='gDefaultStyleItalic'" + checkedString( gDefaultStyleItalic ) + "</td></tr>" +
                              "</table>" +
                              "<li>Style for quoted text:</li>" +
                              "<input type='text'     id='gBlockQuoteStyle' value='" + gBlockQuoteStyle +"' size=50>" +
//                            "<li>Other:</li>" +
//                            "<input type='checkbox' id='gCheckVersion'" + checkedString( gCheckVersion ) + ">Check for Updates " +
//                            "<input type='checkbox' id='gForceUpdate'" + checkedString( gForceUpdate ) + ">Force Update" +
                              "</ul>" +
                              "<div id='gsconfButDiv'>" +
                              "<input type='button' id='gsconfOKBut' value='OK' title='Save the current configuration'>" +
                              "<input type='button' id='gsconfCancelBut' value='Cancel' title='Return to the page without saving'>" +
                              "</div>";
      
      // Appends the layers to the document
      document.body.appendChild(maskLayer);
      document.body.appendChild(dialogLayer);
      
      // Adds the necessary event listeners
      maskLayer.addEventListener("click", hideLayers, false);
      $("gsconfOKBut").addEventListener("click", saveConfiguration, false);
      $("gsconfCancelBut").addEventListener("click", hideLayers, false);
      
   }
   
   // Changes the enabled state of all input fields of the dialog layer. If newState is undefined or not boolean, it does nothing
   // It is a nested function
   function setDialogInputState(newState) 
   {
      if( typeof(newState) != "boolean" )
         return;

      var allInputs = dialogLayer.getElementsByTagName("input");
      for( var i = 0; i < allInputs.length; i++ )
         allInputs[i].disabled = !newState;
   }
   
   // Exits the configuration by hiding the layers
   // It is called by the Cancel button and the maskLayer event listeners
   // It is a nested function
   function hideLayers(evt) 
   {
      dialogLayer.style.display = "none";
      maskLayer.style.display   = "none";
   }
   
   // Checks and saves the configuration to the configuration variables
   // It is called by the Ok button event listener
   // It is a nested function
   function saveConfiguration(evt) 
   {
      // Disables the input fields
      setDialogInputState(false);
      
      // Sets other configuration variables
      //GM_setValue("CheckVersion",            $("gCheckVersion").checked);
      //GM_setValue("ForceUpdate",             $("gForceUpdate").checked);
      GM_setValue("DualList",                  $("gDualList").checked);
      GM_setValue("ReplaceTruncated",          $("gReplaceTruncated").checked);
      GM_setValue("ReplaceTruncatedIndicator", $("gReplaceTruncatedI").checked);
      GM_setValue("ReplaceTruncatedToggle",    $("gReplaceTruncatedT").checked);
      GM_setValue("HTMLSigs",                  $("gHTMLSigs").checked);
      GM_setValue("BlockSigs",                 $("gBlockSigs").checked);
      GM_setValue("BlockUserSigs",             $("gBlockUserSigs").checked);
      GM_setValue("BlockAvatars",              $("gBlockAvatars").checked);
      GM_setValue("BlockRightHand",            $("gBlockRightHand").checked);
      GM_setValue("BlockTemperature",          $("gBlockTemperature").checked);
      GM_setValue("RemoveFormatting",          $("gRemoveFormatting").checked);
      GM_setValue("ResizeAvatar",              $("gResizeAvatar").checked);
      GM_setValue("BlockQuoteStyle",           $("gBlockQuoteStyle").value);
      GM_setValue("LoadInBackground",          $("gLoadInBackground").checked);
      GM_setValue("RemoveDiscussionButtons",   $("gRemoveDiscButt").checked);
      GM_setValue("ShowFullName",              $("gShowFullName").checked);
      GM_setValue("gEditWindowSize",           $("gEditWindowSize").value);
      GM_setValue("DefaultStyle",              $("gDefaultStyle").checked) ;
      GM_setValue("DefaultStyleSize",          $("gDefaultStyleSize").value);
      GM_setValue("DefaultStyleColor",         $("gDefaultStyleColor").value);
      GM_setValue("DefaultStyleFont",          $("gDefaultStyleFont").value);
      GM_setValue("DefaultStyleBold",          $("gDefaultStyleBold").checked);
      GM_setValue("DefaultStyleItalic",        $("gDefaultStyleItalic").checked);
         
      // Reloads page and script
      window.location.reload();
   }
}

// Register configuration menu command
if( !No_GM)
   GM_registerMenuCommand("About Forum Reformatter Configuration", configureScript, null, null, "A");

////////////////////////// END OF USER CONFIGURATION //////////////////////////



///////////////////////// MAIN /////////////////////////

GM_log( "Tag: " + gAboutForum ) ;

// Test for reply or edit window
if( gURL.match( /http:\/\/forums\.about\.com\/n\/pfx\/forum\.aspx\?.*nav\=post.*/i ) )
{
   GM_log( "Editor" ) ;

   FixReplyPage() ;

   $( "ptWrapDiv" ).setAttribute('style', "width: 100%;");

   return ;
}
if( gURL.match( /http:\/\/forums\.about\.com\/n\/pfx\/forum\.aspx\?.*nav\=edit.*/i ) )
{
//   GM_log( "Editor" ) ;

   FixEditPage() ;

   $( "ptWrapDiv" ).setAttribute('style', "width: 100%;");

   return ;
}
// Test for "display full message"
if( gURL.match( /http:\/\/forums\.about\.com\/n\/pfx\/forum\.aspx\?.*nav\=display.*/i ) )
{
//   GM_log( "Full Message" ) ;

   FixFullPage() ;

   return ;
}
// Test for thread lists
if( gURL.match( /http:\/\/forums\.about\.com\/n\/pfx\/forum\.aspx\?nav\=messages\&webtag=.*/i ) || 
    gURL.match( /http:\/\/forums\.about\.com\/n\/pfx\/forum\.aspx\?folderId=.*\&listMode=.*/i ) ||
    gURL.match( /http:\/\/forums\.about\.com\/n\/pfx\/forum\.aspx\?listmode=.*\&nav=messages\&webtag=.*/i ) ||
    gURL.match( /http:\/\/forums\.about\.com\/n\/pfx\/forum\.aspx\?nav=search\&webtag=.*/i ) ||
    gURL.match( /http:\/\/forums\.about\.com\/n\/pfx\/forum\.aspx\?webtag=.*\&nav=search/i ))
{
//   GM_log( "Thread List" ) ;

   FixThreadList() ;

   return ;
}

// Normal postings window

domList = document.evaluate("//div[@class='ptNavmessageList']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
domList.snapshotItem(0).setAttribute('style', "width: 100%;");

$( "ptWrapDiv"  ).setAttribute('style', "width: 100%;");
$( "ptcBodyDiv" ).setAttribute('style', "width: 100%;");

mainWindowHeight = window.innerHeight -2;

if( gDualList )
   $( "ptcMainTemplate" ).setAttribute( 'style', "padding-right: 5px; overflow: auto; height:" +mainWindowHeight ) ;

if( gDualList )
{
   oBodyRight = $( "PTID-messageList-header-messageNavBar" ) ;
   oBodyRight.parentNode.removeChild(oBodyRight);
}

if( gDualList || gBlockRightHand )
{
   oBodyRight = $( "ptcBodyRight" ) ;
   oSearch =         GetFirstFromEval( ".//div[@class='ptcSearch']",            oBodyRight, 0 ) ;
   oVisitorHeader =  GetFirstFromEval( ".//div[@class='ptForumFoldersHeader']", oBodyRight, 0 ) ;
   oVisitorList =    GetFirstFromEval( ".//div[@class='ptBlueBody']",           oBodyRight, 0 ) ;

   oBodyRight.parentNode.removeChild( oBodyRight ) ;
}

if( gDualList )
{
   td = document.createElement("td");
//   td.width = "250px" ;
   gNavigate = document.createElement("div");
   gNavigate.setAttribute( 'style', "overflow: auto; width: 364px; height:" +mainWindowHeight ) ;
   td.appendChild( gNavigate ) ;
   body = $( "ptcBodyContents" ) ;

   body.setAttribute('style', "width: auto; padding-right: 0px;");

//   body.width = "73%" ;
   body.parentNode.insertBefore( td, body );
}

RemoveElementByID( 'ptcBrandHeader' ) ;
RemoveElementByID( 'ptcBrandFooter' ) ;
RemoveElementByID( 'ptcLogout' ) ;
if( gDualList )
   RemoveElementByID( 'ptcContentTop' ) ;

RemoveAllEval( "//div[@class='ptcAdSpace']",document ) ;
RemoveAllEval( "//span[@class='ptcWelcome']",document ) ;


gTruncatedIndex = 0 ;


ChangeAllPostings( document ) ;


if( gDualList )
{
//   unsafeWindow.onbeforeunload = UnloadHandler ;

   AddHandlersToThreadNavigation( document ) ;
}


if( gBlockRightHand )
{
   domList = document.evaluate( "//div[@class='ptcMsgNavGroup']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   if( domList.snapshotLength > 1 )
   {
      if( oSearch )
         domList.snapshotItem(1).parentNode.appendChild( oSearch ) ;
      if( oVisitorHeader )
         domList.snapshotItem(1).parentNode.appendChild( oVisitorHeader ) ;
      if( oVisitorList )
         domList.snapshotItem(1).parentNode.appendChild( oVisitorList ) ;
   }
}

if( gDualList )
{
   gThreadListURL = "http://forums.about.com/n/pfx/forum.aspx?nav=messages&webtag=" +gAboutForum ;
   //gThreadListURL = "http://forums.about.com/n/pfx/forum.aspx?folderId=0&listMode=13&nav=messages&webtag="+gAboutForum ;

   LoadThreadList( gNavigate ) ;
}

///////////////////////// VERSION CHECK /////////////////////////

//Version check routine
//if( gCheckVersion )
//{
//   dNow = new Date() ;
//   lastCheck = Date.parse( GM_getValue( "LastVersionCheck", "1/1/1980" ) ) ;
//   nowCheck  = dNow.getTime() ;
//
//   if( (nowCheck - lastCheck) > (24*60*60*1000) || gForceUpdate )
//   {
//      nVersion = parseInt( gVersion.replace( /\./ig,"" ) ) ;
//
//      GM_xmlhttpRequest(
//      {
//         method:"GET",
//         url:gScriptURL,
//         headers:
//         {
//           "User-Agent":"Mozilla/5.0",
//           "Accept":"text/xml"
//         },
//         onload:function(response)
//         {
//             sText = response.responseText ;
//             sLine = GetRegExpResult( sText, "\@description\.*v.\..\.. " ) ;
//             sLine = GetRegExpResult( sLine, "v.\..\.." ) ;
//             newVersion = parseInt( sLine.replace( /\.|v/ig,"" ) ) ;
//
//             if( (newVersion > nVersion && newVersion != GM_getValue( "LastCheckedVersion", 0 )) || gForceUpdate )
//             {
//                if( confirm( "A new version of the About Forum Reformatter script is available (" +sLine +"). Would you like to upgrade?" ) )
//                {
//                   window.open( gScriptURL ) ;
//                }
//
//                GM_setValue( "ForceUpdate", gForceUpdate = false ) ;
//                GM_setValue( "LastCheckedVersion", newVersion ) ;
//             }
//         }
//      });
//
//      GM_setValue( "LastVersionCheck", Date() )
//   }
//}

///////////////////////// END OF MAIN /////////////////////////









