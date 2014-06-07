// ==UserScript==
// @name LJ - Bookmark Comments to Pinboard
// @namespace http://murklins.talkoncorners.net/
// @description Adds Pinboard bookmarking forms to comments on LJ entries that use LJ's Minimalism S2 style.
// @include http://*.livejournal.com/*.html*
// @require http://pinboard.in/js/pin-min.js?w=ar
// @grant GM_xmlhttpRequest
// @grant GM_addStyle
// @grant GM_log
// ==/UserScript==

// ***** CODE ******

var gScriptName = "gm_ljCommentsToPinboard";
var gToken = "";
var gUser = "";
var gUsertags = "";
var gDefaultTags = "";
var gDefaultPrivate = false;
var gDefaultToRead = false;
var gUseDefaultsOnTopLevelOnly = false;

var gPinboardIcon = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAMYGlDQ1BJQ0MgcHJvZmlsZQAAeAEB" +
"SAy38wAADEhMaW5vAhAAAG1udHJSR0IgWFlaIAfOAAIACQAGADEAAGFjc3BNU0ZUAAAAAElFQyBz" +
"UkdCAAAAAAAAAAAAAAAAAAD21gABAAAAANMtSFAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAEWNwcnQAAAFQAAAAM2Rlc2MAAAGEAAAAbHd0cHQAAAHwAAAA" +
"FGJrcHQAAAIEAAAAFHJYWVoAAAIYAAAAFGdYWVoAAAIsAAAAFGJYWVoAAAJAAAAAFGRtbmQAAAJU" +
"AAAAcGRtZGQAAALEAAAAiHZ1ZWQAAANMAAAAhnZpZXcAAAPUAAAAJGx1bWkAAAP4AAAAFG1lYXMA" +
"AAQMAAAAJHRlY2gAAAQwAAAADHJUUkMAAAQ8AAAIDGdUUkMAAAQ8AAAIDGJUUkMAAAQ8AAAIDHRl" +
"eHQAAAAAQ29weXJpZ2h0IChjKSAxOTk4IEhld2xldHQtUGFja2FyZCBDb21wYW55AABkZXNjAAAA" +
"AAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAA" +
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAA81EA" +
"AQAAAAEWzFhZWiAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAG+iAAA49QAAA5BYWVogAAAAAAAA" +
"YpkAALeFAAAY2lhZWiAAAAAAAAAkoAAAD4QAALbPZGVzYwAAAAAAAAAWSUVDIGh0dHA6Ly93d3cu" +
"aWVjLmNoAAAAAAAAAAAAAAAWSUVDIGh0dHA6Ly93d3cuaWVjLmNoAAAAAAAAAAAAAAAAAAAAAAAA" +
"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALklFQyA2MTk2Ni0yLjEgRGVm" +
"YXVsdCBSR0IgY29sb3VyIHNwYWNlIC0gc1JHQgAAAAAAAAAAAAAALklFQyA2MTk2Ni0yLjEgRGVm" +
"YXVsdCBSR0IgY29sb3VyIHNwYWNlIC0gc1JHQgAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAA" +
"AAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAA" +
"AAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAA" +
"AAAAAAAAAAAAAAAAAAAAdmlldwAAAAAAE6T+ABRfLgAQzxQAA+3MAAQTCwADXJ4AAAABWFlaIAAA" +
"AAAATAlWAFAAAABXH+dtZWFzAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAACjwAAAAJzaWcgAAAA" +
"AENSVCBjdXJ2AAAAAAAABAAAAAAFAAoADwAUABkAHgAjACgALQAyADcAOwBAAEUASgBPAFQAWQBe" +
"AGMAaABtAHIAdwB8AIEAhgCLAJAAlQCaAJ8ApACpAK4AsgC3ALwAwQDGAMsA0ADVANsA4ADlAOsA" +
"8AD2APsBAQEHAQ0BEwEZAR8BJQErATIBOAE+AUUBTAFSAVkBYAFnAW4BdQF8AYMBiwGSAZoBoQGp" +
"AbEBuQHBAckB0QHZAeEB6QHyAfoCAwIMAhQCHQImAi8COAJBAksCVAJdAmcCcQJ6AoQCjgKYAqIC" +
"rAK2AsECywLVAuAC6wL1AwADCwMWAyEDLQM4A0MDTwNaA2YDcgN+A4oDlgOiA64DugPHA9MD4APs" +
"A/kEBgQTBCAELQQ7BEgEVQRjBHEEfgSMBJoEqAS2BMQE0wThBPAE/gUNBRwFKwU6BUkFWAVnBXcF" +
"hgWWBaYFtQXFBdUF5QX2BgYGFgYnBjcGSAZZBmoGewaMBp0GrwbABtEG4wb1BwcHGQcrBz0HTwdh" +
"B3QHhgeZB6wHvwfSB+UH+AgLCB8IMghGCFoIbgiCCJYIqgi+CNII5wj7CRAJJQk6CU8JZAl5CY8J" +
"pAm6Cc8J5Qn7ChEKJwo9ClQKagqBCpgKrgrFCtwK8wsLCyILOQtRC2kLgAuYC7ALyAvhC/kMEgwq" +
"DEMMXAx1DI4MpwzADNkM8w0NDSYNQA1aDXQNjg2pDcMN3g34DhMOLg5JDmQOfw6bDrYO0g7uDwkP" +
"JQ9BD14Peg+WD7MPzw/sEAkQJhBDEGEQfhCbELkQ1xD1ERMRMRFPEW0RjBGqEckR6BIHEiYSRRJk" +
"EoQSoxLDEuMTAxMjE0MTYxODE6QTxRPlFAYUJxRJFGoUixStFM4U8BUSFTQVVhV4FZsVvRXgFgMW" +
"JhZJFmwWjxayFtYW+hcdF0EXZReJF64X0hf3GBsYQBhlGIoYrxjVGPoZIBlFGWsZkRm3Gd0aBBoq" +
"GlEadxqeGsUa7BsUGzsbYxuKG7Ib2hwCHCocUhx7HKMczBz1HR4dRx1wHZkdwx3sHhYeQB5qHpQe" +
"vh7pHxMfPh9pH5Qfvx/qIBUgQSBsIJggxCDwIRwhSCF1IaEhziH7IiciVSKCIq8i3SMKIzgjZiOU" +
"I8Ij8CQfJE0kfCSrJNolCSU4JWgllyXHJfcmJyZXJocmtyboJxgnSSd6J6sn3CgNKD8ocSiiKNQp" +
"Bik4KWspnSnQKgIqNSpoKpsqzysCKzYraSudK9EsBSw5LG4soizXLQwtQS12Last4S4WLkwugi63" +
"Lu4vJC9aL5Evxy/+MDUwbDCkMNsxEjFKMYIxujHyMioyYzKbMtQzDTNGM38zuDPxNCs0ZTSeNNg1" +
"EzVNNYc1wjX9Njc2cjauNuk3JDdgN5w31zgUOFA4jDjIOQU5Qjl/Obw5+To2OnQ6sjrvOy07azuq" +
"O+g8JzxlPKQ84z0iPWE9oT3gPiA+YD6gPuA/IT9hP6I/4kAjQGRApkDnQSlBakGsQe5CMEJyQrVC" +
"90M6Q31DwEQDREdEikTORRJFVUWaRd5GIkZnRqtG8Ec1R3tHwEgFSEtIkUjXSR1JY0mpSfBKN0p9" +
"SsRLDEtTS5pL4kwqTHJMuk0CTUpNk03cTiVObk63TwBPSU+TT91QJ1BxULtRBlFQUZtR5lIxUnxS" +
"x1MTU19TqlP2VEJUj1TbVShVdVXCVg9WXFapVvdXRFeSV+BYL1h9WMtZGllpWbhaB1pWWqZa9VtF" +
"W5Vb5Vw1XIZc1l0nXXhdyV4aXmxevV8PX2Ffs2AFYFdgqmD8YU9homH1YklinGLwY0Njl2PrZEBk" +
"lGTpZT1lkmXnZj1mkmboZz1nk2fpaD9olmjsaUNpmmnxakhqn2r3a09rp2v/bFdsr20IbWBtuW4S" +
"bmtuxG8eb3hv0XArcIZw4HE6cZVx8HJLcqZzAXNdc7h0FHRwdMx1KHWFdeF2Pnabdvh3VnezeBF4" +
"bnjMeSp5iXnnekZ6pXsEe2N7wnwhfIF84X1BfaF+AX5ifsJ/I3+Ef+WAR4CogQqBa4HNgjCCkoL0" +
"g1eDuoQdhICE44VHhauGDoZyhteHO4efiASIaYjOiTOJmYn+imSKyoswi5aL/IxjjMqNMY2Yjf+O" +
"Zo7OjzaPnpAGkG6Q1pE/kaiSEZJ6kuOTTZO2lCCUipT0lV+VyZY0lp+XCpd1l+CYTJi4mSSZkJn8" +
"mmia1ZtCm6+cHJyJnPedZJ3SnkCerp8dn4uf+qBpoNihR6G2oiailqMGo3aj5qRWpMelOKWpphqm" +
"i6b9p26n4KhSqMSpN6mpqhyqj6sCq3Wr6axcrNCtRK24ri2uoa8Wr4uwALB1sOqxYLHWskuywrM4" +
"s660JbSctRO1irYBtnm28Ldot+C4WbjRuUq5wro7urW7LrunvCG8m70VvY++Cr6Evv+/er/1wHDA" +
"7MFnwePCX8Lbw1jD1MRRxM7FS8XIxkbGw8dBx7/IPci8yTrJuco4yrfLNsu2zDXMtc01zbXONs62" +
"zzfPuNA50LrRPNG+0j/SwdNE08bUSdTL1U7V0dZV1tjXXNfg2GTY6Nls2fHadtr724DcBdyK3RDd" +
"lt4c3qLfKd+v4DbgveFE4cziU+Lb42Pj6+Rz5PzlhOYN5pbnH+ep6DLovOlG6dDqW+rl63Dr++yG" +
"7RHtnO4o7rTvQO/M8Fjw5fFy8f/yjPMZ86f0NPTC9VD13vZt9vv3ivgZ+Kj5OPnH+lf65/t3/Af8" +
"mP0p/br+S/7c/23///eE8/td4Lo8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEA" +
"mpwYAAAAB3RJTUUH3QIKBzAieGB3xwAACSNJREFUSA0BGAnn9gGfAAD/AAAAAAIAAAABAAAAAQAA" +
"AAAAAAD+AAAAEycnAA0hIQDtwsIA//b2AAYAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAA" +
"AwAAAAQAAAAEAAAABAAAAAMAAAAE/wAAAAAAAAD/AAAAAAAAAP0AAAAEAAAAGTw8ABIxMQAB//8A" +
"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";

// action to take when dom mutation event occurs
var gObserver = new MutationObserver( function( mutations )
{
  mutations.forEach( function( mutation )
  {
    for ( var i = 0; i < mutation.addedNodes.length; i++ )
    {
      if( mutation.addedNodes[i].id != null )
      {
        var nodeId = mutation.addedNodes[i].id;
        // was an LJ comment node added?
        if( nodeId.indexOf( "ljcmt" ) == 0 )
        {
          addPinboardIconOnFly( nodeId );
        }
      }
    }
  });   
});

// get all the top-level comments
// <div id="ljcmt23454777" class="comment-wrap" style="margin-left:0px;">
var gComments = document.evaluate( "//div[contains(@class, 'comment-wrap') and contains(@style, 'margin-left:0px;')]", document, null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

if( gComments.snapshotLength == 0 )
{
  // no comments on this page
  GM_log( "No comments on this page. Exiting script." );
  return;
}

// get the current Pinboard user and the form token from the Pinboard add page
GM_xmlhttpRequest(
{
  method: "GET",
  url: "https://pinboard.in/add",
  onload: function( response )
  {    
    // parse out the username
    var usernameRegex = new RegExp( "<div id=\"title\"><a href=\"/\">Pinboard</a> - \\((.*?)\\)</div>" );
    var usernameArr = usernameRegex.exec( response.responseText );
    if( !usernameArr )
    {
      GM_log( "Could not determine current Pinboard username. Exiting script." );
      var initializationDiv = createInitializationDiv();
      
      var errorText = document.createElement("p");
      errorText.innerHTML = "Not logged into <a href='https://pinboard.in'>Pinboard</a>! Can't initialize script.";
      
      initializationDiv.appendChild(errorText);
      return;
    }
    
    // parse out the token value
    var tokenRegex = new RegExp( "<input type=\"hidden\" name=\"form_token\" value=\"(.*?)\"" );
    var tokenArr = tokenRegex.exec( response.responseText );
    if ( !tokenArr )
    {
      GM_log( "Could not get add form token. Exiting script." );
      return;
    }
    
    gToken = tokenArr[1];
    gUser = usernameArr[1];
    
    // continue with script
    getUserTags();
  }
}
);

// need the usertags to build the autocomplete
function getUserTags()
{
  GM_xmlhttpRequest(
  {
    method: "GET",
    url: "https://pinboard.in/user_tag_list/",
    onload: function( response )
    {
      var usertags = null;
      var tagsRegex = new RegExp( "^var usertags\\s*=(\[[\\s\\S]*\];)" );
      var tagsArr = tagsRegex.exec( response.responseText );
      if( tagsArr )
      {
        gUsertags = eval( tagsArr[1] );
      }
        
      // continue with script
      addInitializationWidget()
    }
  }
  );
}

function addInitializationWidget()
{
  var initializationDiv = createInitializationDiv();
  if( initializationDiv )
  {
    var introText = document.createElement("p");
    introText.innerHTML = "Bookmark comments to <b>" + gUser + "'s</b> Pinboard account with the following defaults:";
    
    var formNode = document.createElement("form");
    formNode.id = gScriptName + "InitializationForm";
    
    var tagsLabel = document.createElement("p");
    tagsLabel.innerHTML = "tags";
    
    var tagsInput = document.createElement("input");
    tagsInput.id = gScriptName + "DefaultTags";
    tagsInput.classname = "tags";
    tagsInput.setAttribute("autocomplete", "off");
    tagsInput.setAttribute("size", "90");
    
    var privateInput = document.createElement("input");
    privateInput.type = "checkbox";  
    privateInput.id = gScriptName + "DefaultPrivate";
    privateInput.classname = "private";
    
    var toreadInput = document.createElement("input");
    toreadInput.type = "checkbox";  
    toreadInput.id = gScriptName + "DefaultToRead";
    toreadInput.classname = "toread";
    
    var useDefaultsOnTopLevelOnly = document.createElement("input");
    useDefaultsOnTopLevelOnly.type = "checkbox";  
    useDefaultsOnTopLevelOnly.id = gScriptName + "UseDefaultsOnTopLevelOnly";
    useDefaultsOnTopLevelOnly.classname = "useDefaultsOnTopLevelOnly";
  
    var startLink = document.createElement( "a" );
    startLink.id = gScriptName + "StartLink";
    startLink.innerHTML = "start";
    startLink.href = "";
  
    initializationDiv.appendChild(introText);
    initializationDiv.appendChild(formNode);
    formNode.appendChild(tagsLabel);
    formNode.appendChild(tagsInput);
    formNode.appendChild(document.createElement("br"));
    formNode.appendChild(document.createTextNode("private"));
    formNode.appendChild(privateInput);
    formNode.appendChild(document.createElement("br"));
    formNode.appendChild(document.createTextNode("to read"));
    formNode.appendChild(toreadInput);
    formNode.appendChild(document.createElement("br"));
    formNode.appendChild(document.createElement("br"));
    formNode.appendChild(document.createTextNode("use defaults only on top-level comments"));
    formNode.appendChild(useDefaultsOnTopLevelOnly);
    formNode.appendChild(document.createElement("br"));
    formNode.appendChild(document.createElement("br"));
    formNode.appendChild(startLink);
    
    // Add auto-complete to tags input -- this call is supplied by the external pin-min.js file
    var ac = new Pin.Tags( gScriptName + 'DefaultTags', gUsertags, {circular: true} );
    
    startLink.addEventListener("click",
      function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        startLink.style.display = "none";
        
        gDefaultTags = tagsInput.value;
        gDefaultPrivate = privateInput.checked;
        gDefaultToRead = toreadInput.checked;
        gUseDefaultsOnTopLevelOnly = useDefaultsOnTopLevelOnly.checked;
        
        // add posting forms to the top level comments on the page
        getTopLevelCommentLinks();
        
        // add Piboard icons to remaining full text comments, for individual link checking on demand
        getOtherCommentLinks();
        
        // monitor dom mutation events in the comments
        var target = document.getElementById( "comments" );
        var config = { childList: true, subtree: true };
        gObserver.observe( target, config );
      },
      false
    );
  }
  else
  {
    GM_log( "Could not insert initialization form. Exiting script." );
  }
}

function getTopLevelCommentLinks()
{
  var numComments = gComments.snapshotLength;
  var commentHrefs = new Array();
  var commentIds = new Array();
  var arrayIndex = 0;
  for( var i = 0; i < numComments; i++ )
  {
    // get this comment's link
    var c = gComments.snapshotItem( i );
    var commentLinks = document.evaluate( "./div[contains(@class, 'comment-head')]/div[contains(@class, 'comment-head-in')]/p/a[contains(@class, 'comment-permalink')]/@href",
                                    c, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

    if( commentLinks.snapshotLength == 1 )
    {
      commentHrefs[arrayIndex] = commentLinks.snapshotItem( 0 ).value;
      commentIds[arrayIndex] = c.id;
      arrayIndex++;
    }
  }
  
  if( arrayIndex == 0 )
  {
    GM_log( "Couldn't find any top level comment links. Exiting script." );
    return;
  }
  
  for( var i = 0; i < arrayIndex; i++ )
  {
    // slowly check the pinboard add bookmark page of this comment's link
    checkLinkSlowly( commentHrefs[i], commentIds[i], i * 2000 );
  }
}

function checkLinkSlowly( commentLink, commentId, waitPeriod )
{
  window.setTimeout( function() { checkLinkOnPinboard( commentLink, commentId, true ) }, waitPeriod );
}

function getOtherCommentLinks()
{
  var nonTopCommentLinks = document.evaluate( "//div[contains(@class, 'comment-wrap') and not(contains(@style, 'margin-left:0px;'))]/div[contains(@class, 'comment-head')]/div[contains(@class, 'comment-head-in')]/p/a[contains(@class, 'comment-permalink')]", document, null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
  var numComments = nonTopCommentLinks.snapshotLength;
  
  var commentHrefs = new Array();
  var commentIds = new Array();
  var arrayIndex = 0;
  for( var i = 0; i < numComments; i++ )
  {
    var commentLink = nonTopCommentLinks.snapshotItem( i );
    commentHrefs[arrayIndex] = commentLink;
    commentIds[arrayIndex] = commentLink.parentNode.parentNode.parentNode.parentNode.id;
    arrayIndex++;
  }
  
  if( arrayIndex == 0 )
  {
    GM_log( "Couldn't find any non-top level full comment links. No Pinboard icons added." );
    return;
  }
  
  for( var i = 0; i < arrayIndex; i++ )
  {
    addPinboardIcon( commentIds[i], commentHrefs[i] );
  }
}

function addPinboardIconOnFly( commentId )
{
  var commentNode = document.getElementById( commentId );
  var pinboardNode = document.getElementById( gScriptName + "_" + commentId );
  if( pinboardNode == null )
  {
    var commentLinks = document.evaluate( "./div[contains(@class, 'comment-head')]/div[contains(@class, 'comment-head-in')]/p[not(img)]/a[contains(@class, 'comment-permalink')]",
                                      commentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    if( commentLinks.snapshotLength == 1 )
    {
      var commentLink = commentLinks.snapshotItem( 0 );
      addPinboardIcon( commentId, commentLink );
    }
  }
}

function addPinboardIcon( commentId, commentLink )
{
  // append an icon that triggers the link to be checked on Pinboard.
  var pinboardImg = document.createElement( "img" );
  pinboardImg.className = gScriptName + "PinboardIcon";
  pinboardImg.setAttribute( "src", "data:image/png;base64," + gPinboardIcon );
  
  pinboardImg.addEventListener( "click",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      pinboardImg.style.display = "none";
      checkLinkOnPinboard( commentLink.getAttribute( "href" ), commentId, !gUseDefaultsOnTopLevelOnly );
    },
    false
  );
  
  // add the image
  commentLink.parentNode.appendChild( pinboardImg );
}

function checkLinkOnPinboard( commentLink, commentId, useDefaults )
{
  GM_xmlhttpRequest(
  {
    method: "GET",
    url: "https://pinboard.in/add/?url=" + encodeURIComponent( commentLink ),
    onload: function( response )
    {
      var parser = new DOMParser();
      var responseDoc = parser.parseFromString( response.responseText, "text/html" );
      
      var errText = "";
      if( response.finalUrl.indexOf( "https://pinboard.in/popup_login" ) == 0 )
      {
        GM_log( "No longer logged in to Pinboard." );
        errText = "No longer logged into Pinboard! Please <a href='https://pinboard.in'>log in</a> again then refresh this page.";
      }
      else if( response.finalUrl.indexOf( "https://pinboard.in/add" ) == 0 )
      {
        // got to the add page succesfully, but check to see that still logged in as original user
        var title = responseDoc.getElementById( "title" );
        var currentPinboardUser = "";
        if( title != null )
        {
          var usernameRegex = new RegExp( "\\((.*?)\\)$" );
          var usernameArr = usernameRegex.exec( title.innerHTML );
          if( usernameArr )
          {
            currentPinboardUser = usernameArr[1];
          }
        }
        
        if( currentPinboardUser != gUser )
        {
          GM_log( "No longer logged in to Pinboard as " + gUser + "." );
          errText = "No longer logged into Pinboard as <b>" + gUser + "</b>! Please <a href='https://pinboard.in'>log in</a> again then refresh this page.";
        }
      }
      else
      {
        GM_log( "Could not check link on Pinboard." );
        errText = "Unknown error. Unable to check link on Pinboard.";
      }
      
      if( errText != "" )
      {
        var pinboardDiv = createPinboardDiv( commentId );
        if( pinboardDiv != null )
        {
          var errorText = document.createElement( "p" );
          errorText.innerHTML = errText;
                
          pinboardDiv.appendChild( errorText );
        }
        return;
      }
      
      // logged in and user matches so keep going
      var titleText = "";
      var descText = "";
      var tagsText = "";
      var isPrivate = false;
      var isUnread = false;
      var isSaved = false;
      
      // find out if this link has already been saved
      var prevSavedRegex = new RegExp( "<div class=\"alert\">previously saved" );
      var prevSavedArr = prevSavedRegex.exec( response.responseText );
      if ( prevSavedArr )
      {  
        // already saved, so pull bookmark info from page
        isSaved = true;
        var addForm = responseDoc.forms[1];
        for( i = 0; i < addForm.elements.length; i++ )
        {
          var name = addForm.elements[i].name;
          var value = addForm.elements[i].value;
          if( name == "title" )
          {
            titleText = value;
          }
          else if( name == "description" )
          {
            descText = value;
          }
          else if( name == "tags" )
          {
            tagsText = value;
          }
          else if( name == "private" )
          {
            isPrivate = addForm.elements[i].checked;
          }
          else if( name == "toread" )
          {
            isUnread = addForm.elements[i].checked;
          }
        }
      }
      else
      {
        // not already saved, so get info from comment to populate form
        var commentDiv = document.getElementById( commentId );
        var titleText = "";
        var descText = "";
        
        var titleTextSnap = document.evaluate( "./div[contains(@class, 'comment-head')]/div[contains(@class, 'comment-head-in')]/h3",
                                  commentDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        if( titleTextSnap.snapshotLength != 0 )
        {
          titleText = titleTextSnap.snapshotItem( 0 ).innerHTML.trim();
        }
          
        var descTextSnap = document.evaluate( "./div[contains(@class, 'comment-text')]",
                                  commentDiv, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        if( descTextSnap.snapshotLength != 0 )
        {
          descText = descTextSnap.snapshotItem( 0 ).innerHTML;
        }
        
        // replace br with \n and then strip other html
        titleText = replaceBrWithNewline( titleText );
        descText = replaceBrWithNewline( descText );
        
        // use initialization form inputs for remaining values
        if( useDefaults )
        {
          tagsText = gDefaultTags;
          isPrivate = gDefaultPrivate;
          isUnread = gDefaultToRead;
        }
      }
      
      addPinboardWidget( commentLink, commentId, isSaved, titleText, descText, tagsText, isPrivate, isUnread );
    }
  }
  );
}

function addPinboardWidget( commentLink, commentId, isSaved, titleText, descText, tagsText, isPrivate, isUnread )
{
  var pinboardDiv = createPinboardDiv( commentId );
  if( pinboardDiv != null )
  {    
    var infoDiv = createInfoDiv( commentId );
    var saveForm = createSaveForm( commentLink, commentId );
    
    if( isSaved )
    {
      updateInfoDiv( commentId, titleText, descText, tagsText, isPrivate, isUnread );
      pinboardDiv.className = gScriptName + " " + gScriptName + "Saved";
      infoDiv.style.display = "block";
      saveForm.style.display = "none";
    }
    else
    {
      updateSaveForm( commentId, titleText, descText, tagsText, isPrivate, isUnread );
      pinboardDiv.className = gScriptName + " " + gScriptName + "Unsaved";
      infoDiv.style.display = "none";
      saveForm.style.display = "block";
      document.getElementById( gScriptName + "FormDoCancel_" + commentId ).style.display = "none";
    }
  }
}
                                   
function createInitializationDiv()
{
  var initializationDiv = document.createElement( "div" );
  initializationDiv.id = gScriptName + "Initialization";

  var commentsDiv = document.getElementById( "comments" );
  if( commentsDiv )
  {
    commentsDiv.parentNode.insertBefore( initializationDiv, commentsDiv );
    return initializationDiv;
  }
  
  return null;
}

function createPinboardDiv( commentId )
{
  var pinboardDiv = document.createElement( "div" );
  pinboardDiv.id = gScriptName + "_" + commentId;
  pinboardDiv.className = gScriptName;
  
  var commentDiv = document.getElementById( commentId );
  
  // get style of target comment, so margins match
  var marginStyle = commentDiv.getAttribute( "style" );
  pinboardDiv.setAttribute( "style", marginStyle );
  
  // Because of how LJ's expand/collapse thread code works, need to insert
  // the Pinboard div at the same DOM level as the comments themselves.
  // I first appended within the comments, just after the comment-text div, but
  // when expand was clicked, the Pinboard div just disappeared, only to
  // reappear when collapse was clicked. The workaround is to append between the
  // target comment and the next comment down.
  var nextCommentDiv = commentDiv.nextSibling;
  while( ( nextCommentDiv != null ) && ( nextCommentDiv.nextSibling != null ) && ( nextCommentDiv.nodeName != "DIV" ) )
  {
    nextCommentDiv = nextCommentDiv.nextSibling;
  }
  if( nextCommentDiv.nodeName == "DIV" )
  {
    commentDiv.parentNode.insertBefore( pinboardDiv, nextCommentDiv );
    return pinboardDiv;
  }
  else
  {
    commentDiv.parentNode.appendChild( pinboardDiv );
    return pinboardDiv;
  }
  
  GM_log( "Could not insert comment " + commentId + "'s Pinboard form." );
  return null;
}

function createInfoDiv( commentId )
{         
  var infoDiv = document.createElement( "div" );
  infoDiv.id = gScriptName + "Info_" + commentId;
  infoDiv.className = gScriptName + "Info";
  
  var titleInfoLabel = document.createElement( "p" );
  titleInfoLabel.innerHTML = "title: ";
  titleInfoLabel.style.fontWeight = "bold";
  
  var titleInfo = document.createElement( "span" );
  titleInfo.id = gScriptName + "InfoTitle_" + commentId;
  titleInfo.style.fontWeight = "normal";
  
  var descInfoLabel = document.createElement( "p" );
  descInfoLabel.innerHTML = "description: ";
  descInfoLabel.style.fontWeight = "bold";
  
  var descInfo= document.createElement( "span" );
  descInfo.id = gScriptName + "InfoDesc_" + commentId;
  descInfo.style.fontWeight = "normal";
  
  var tagsInfoLabel = document.createElement( "p" );
  tagsInfoLabel.innerHTML = "tags: ";
  tagsInfoLabel.style.fontWeight = "bold";
  
  var tagsInfo= document.createElement( "span" );
  tagsInfo.id = gScriptName + "InfoTags_" + commentId;
  tagsInfo.style.fontWeight = "normal";
  
  var privateAndUnread = document.createElement( "p" );
  privateAndUnread.style.fontWeight = "bold";
  
  var privateInfo= document.createElement( "span" );
  privateInfo.id = gScriptName + "InfoPrivate_" + commentId;
  
  var unreadInfo= document.createElement( "span" );
  unreadInfo.id = gScriptName + "InfoUnread_" + commentId;

  var editLink = document.createElement( "a" );
  editLink.id = gScriptName + "InfoEditLink_" + commentId;
  editLink.innerHTML = "edit";
  editLink.href = "";

  infoDiv.appendChild( titleInfoLabel );
  titleInfoLabel.appendChild( titleInfo );
  infoDiv.appendChild( descInfoLabel );
  descInfoLabel.appendChild( descInfo );
  infoDiv.appendChild( tagsInfoLabel );
  tagsInfoLabel.appendChild( tagsInfo );
  infoDiv.appendChild( privateAndUnread );
  privateAndUnread.appendChild( privateInfo );
  privateAndUnread.appendChild( unreadInfo );
  infoDiv.appendChild( editLink );
  
  // insert the div
  var pinboardDiv = document.getElementById( gScriptName + "_" + commentId );
  pinboardDiv.appendChild( infoDiv );
  
  editLink.addEventListener("click",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      editLink.style.display = "none";
      
      var titleText = replaceBrWithNewline( titleInfo.innerHTML );
      var descText = replaceBrWithNewline( descInfo.innerHTML );
      var tagsText = replaceBrWithNewline( tagsInfo.innerHTML );
      
      var isPrivate = false;
      if( privateInfo.innerHTML == "private " )
      {
        isPrivate = true;
      }
      
      var isUnread = false;
      if( unreadInfo.innerHTML == "unread" )
      {
        isUnread = true;
      }
      
      updateSaveForm( commentId, titleText, descText, tagsText, isPrivate, isUnread );
      
      var saveForm = document.getElementById( gScriptName + "Form_" + commentId );
      saveForm.style.display = "block";
    },
    false
  );
  
  return infoDiv;
}

function createSaveForm( commentLink, commentId )
{
  var formNode = document.createElement("form");
  formNode.id = gScriptName + "Form_" + commentId;
  formNode.className = gScriptName + "Form";
  
  var titleLabel = document.createElement("p");
  titleLabel.innerHTML = "title";
  
  var titleInput = document.createElement("input");
  titleInput.id = gScriptName + "FormTitle_" + commentId;
  titleInput.classname = "title";
  titleInput.setAttribute("size", "90");
  
  var descLabel = document.createElement("p");
  descLabel.innerHTML = "description";
  
  var descInput = document.createElement("textarea");
  descInput.id = gScriptName + "FormDesc_" + commentId;
  descInput.classname = "description";
  descInput.setAttribute("rows", "10");
  descInput.setAttribute("cols", "90");
  
  var tagsLabel = document.createElement("p");
  tagsLabel.innerHTML = "tags";
  
  var tagsInput = document.createElement("input");
  tagsInput.id = gScriptName + "FormTags_" + commentId;
  tagsInput.classname = "tags";
  tagsInput.setAttribute("autocomplete", "off");
  tagsInput.setAttribute("size", "90");
  
  var privateInput = document.createElement("input");
  privateInput.type = "checkbox";  
  privateInput.id = gScriptName + "FormPrivate_" + commentId;
  privateInput.classname = "private";
  
  var toreadInput = document.createElement("input");
  toreadInput.type = "checkbox";  
  toreadInput.id = gScriptName + "FormToRead_" + commentId;
  toreadInput.classname = "toread";
  
  var saveLink = document.createElement("a");
  saveLink.id = gScriptName + "FormDoSave_" + commentId;
  saveLink.className = gScriptName + "FormDoSave";
  saveLink.innerHTML = "save";
  saveLink.href = "";
  
  var cancelLink = document.createElement("a");
  cancelLink.id = gScriptName + "FormDoCancel_" + commentId;
  cancelLink.innerHTML = "cancel";
  cancelLink.href = "";
  
  var alertSpan = document.createElement("span");
  alertSpan.id = gScriptName + "FormAlert_" + commentId;
  alertSpan.innerHTML = "";
  
  formNode.appendChild(titleLabel);
  formNode.appendChild(titleInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(descLabel);
  formNode.appendChild(descInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(tagsLabel);
  formNode.appendChild(tagsInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(document.createTextNode("private"));
  formNode.appendChild(privateInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(document.createTextNode("to read"));
  formNode.appendChild(toreadInput);
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(document.createElement("br"));
  formNode.appendChild(saveLink);
  formNode.appendChild(document.createTextNode(" "));
  formNode.appendChild(cancelLink);
  formNode.appendChild(document.createTextNode(" "));
  formNode.appendChild(alertSpan);
  
  // insert the form
  var pinboardDiv = document.getElementById( gScriptName + "_" + commentId );
  pinboardDiv.appendChild( formNode );
  
  // Add auto-complete to tags input -- this call is supplied by the external pin-min.js file
  var ac = new Pin.Tags( gScriptName + 'FormTags_' + commentId, gUsertags, {circular: true} );
  
  cancelLink.addEventListener("click",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      alertSpan.innerHTML = "";
      formNode.style.display = "none";
      document.getElementById( gScriptName + "InfoEditLink_" + commentId ).style.display = "inline";
    },
    false
  );
  
  saveLink.addEventListener("click",
    function(event) {
      event.preventDefault();
      event.stopPropagation();
      
      // save current cancel link state
      var origCancelLinkDisplay = cancelLink.style.display;
      
      // hide the save/cancel links, show "saving..." message
      saveLink.style.display = "none";
      cancelLink.style.display = "none";
      alertSpan.innerHTML = "saving...";

      var params = "";
      params += "form_token=" + encodeURIComponent( gToken ) + "&";
      params += "url=" + encodeURIComponent( commentLink ) + "&";
      params += "next=" + encodeURIComponent( 'https://pinboard.in' ) + "&";
      params += "title=" + encodeURIComponent( titleInput.value ) + "&";
      params += "description=" + encodeURIComponent( descInput.value ) + "&";
      params += "tags=" + encodeURIComponent( tagsInput.value ) + "&";
      params += privateInput.checked ? "private=1&" : "";
      params += toreadInput.checked ? "toread=1" : "toread=0";
            
      GM_xmlhttpRequest(
      {
        method: "POST",
        url: "https://pinboard.in/add/",
        data: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function( response )
        {
          var errText = "";
          if( response.finalUrl.indexOf( "https://pinboard.in/popup_login" ) == 0 )
          {
            errText = "No longer logged in to Pinboard; bookmark was not saved. Please <a href='https://pinboard.in'>log in</a> and then refresh this page before trying again.";
          }
          else if( response.responseText == "Please submit this form again (form token error)" )
          {
            errText = "There is a problem with the Pinboard form token; bookmark was not saved. You'll probably need to refresh this page before you try again.";          
          }
          else if( response.finalUrl.indexOf( "https://pinboard.in/u:" ) != 0 )
          {
            errText = "Unknown error; bookmark was not saved.";
          }
          
          if( errText == "" )
          {
            // update the info div with the form values
            updateInfoDiv( commentId, titleInput.value, descInput.value, tagsInput.value, privateInput.checked, toreadInput.checked );
            
            // hide form
            formNode.style.display = "none";
            
            // make sure pinboard parent div has saved class name
            var pbDiv = document.getElementById( gScriptName + "_" + commentId );
            pbDiv.className = gScriptName + " " + gScriptName + "Saved";
            
            // make sure the edit link in the info div is displayed
            var edit = document.getElementById( gScriptName + "InfoEditLink_" + commentId );
            edit.style.display = "inline";
            
            // show info div
            var info = document.getElementById( gScriptName + "Info_" + commentId );
            info.style.display = "block";
            
            // reset form alert message
            alertSpan.innerHTML = "";
            
            // show the save/cancel links
            saveLink.style.display = "inline";
            cancelLink.style.display = "inline";
          }
          else
          {
            // show the error message
            alertSpan.innerHTML = errText;
          
            // show the save link
            saveLink.style.display = "inline";
            
            // put cancel link back to original state
            cancelLink.style.display = origCancelLinkDisplay;
          }
        }
      }
      );
    },
    false
  );
  
  return formNode;
}

function updateInfoDiv( commentId, titleText, descText, tagsText, isPrivate, isUnread )
{
  var titleInfo = document.getElementById( gScriptName + "InfoTitle_" + commentId );
  var descInfo = document.getElementById( gScriptName + "InfoDesc_" + commentId );
  var tagsInfo = document.getElementById( gScriptName + "InfoTags_" + commentId );
  var privateInfo = document.getElementById( gScriptName + "InfoPrivate_" + commentId );
  var unreadInfo = document.getElementById( gScriptName + "InfoUnread_" + commentId );
      
  titleInfo.innerHTML = replaceNewlineWithBr( titleText );
  descInfo.innerHTML = replaceNewlineWithBr( descText );
  tagsInfo.innerHTML = tagsText;
  if( isPrivate )
  {
    privateInfo.innerHTML = "private ";
  }
  if( isUnread )
  {
    unreadInfo.innerHTML = "unread";
  }
}

function updateSaveForm( commentId, titleText, descText, tagsText, isPrivate, isUnread )
{
  var saveFormTitle = document.getElementById( gScriptName + "FormTitle_" + commentId );
  var saveFormDesc = document.getElementById( gScriptName + "FormDesc_" + commentId );
  var saveFormTags = document.getElementById( gScriptName + "FormTags_" + commentId );
  var saveFormPrivate = document.getElementById( gScriptName + "FormPrivate_" + commentId );
  var saveFormUnread = document.getElementById( gScriptName + "FormToRead_" + commentId );
  
  saveFormTitle.value = titleText;
  saveFormDesc.value = descText;
  saveFormTags.value = tagsText;
  saveFormPrivate.checked = isPrivate;
  saveFormUnread.checked = isUnread;
}

function replaceBrWithNewline( text )
{
  if( text != "" )
  {
    var textRegex = new RegExp( "<br\\s*\/?>", "ig" );
    text = text.replace( textRegex, "\r\n");
    
    var tmp = document.createElement( "div" );
    tmp.innerHTML = text;
    text = tmp.textContent || tmp.innerText;
  }
  return text;
}

function replaceNewlineWithBr( text )
{
  if( text != "" )
  {
    var textRegex = new RegExp( "\\n", "g" );
    text = text.replace( textRegex, "<br>");
  }
  return text;
}

GM_addStyle(
  'img.' + gScriptName + 'PinboardIcon { padding-left: 3px; } ' +
  '#' + gScriptName + 'Initialization { background-color: #F5F6CE; width: auto; margin: 10px 50px; padding: 5px; font-size: 13px; } ' +
  '#' + gScriptName + 'Initialization p { margin-bottom: 5px; } ' +
  '#' + gScriptName + 'InitializationForm { position: relative; } ' +
  '#' + gScriptName + 'SaveAllDiv { text-align: right; } ' +
  'div.' + gScriptName + ' { margin: 10px 0px; padding: 5px; background-color: #F5F6CE; } ' +
  'div.' + gScriptName + 'Saved { background-color: #CEF6D8; } ' +
  'div.' + gScriptName + 'Unsaved { background-color: #F5F6CE; } ' +
  'div.' + gScriptName + ' p { margin-bottom: 2px; } ' +
  'form.' + gScriptName + 'Form { position: relative; } ' +
  'form.' + gScriptName + 'Form input { margin-bottom: 3px; } ' +
  'form.' + gScriptName + 'Form textarea { margin-bottom:3px; } ' +
  '.pin-ac { position: absolute; outline: none; z-index: 1; } ' +
  '.pin-ac .bd { position: relative; margin-left:8px; background: #fff; border: 1px solid #aaa; _width: 300px; min-width: 200px; -webkit-box-shadow: 1px 1px 3px rgba(0,0,110,0.33); -moz-box-shadow: 1px 1px 3px rgba(0,0,110,0.33); } ' +
  '.pin-ac .hd { height: 0px; overflow: hidden; } ' +
  '.pin-ac .hd span { margin-left: 20px; display: block; height: 1px; width: 12px; } ' +
  '.pin-ac.off { display: none; z-index: 0; } ' +
  '.pin-ac ul { margin: 0; padding: 0; } ' +
  '.pin-ac li { list-style-type: none; padding: 3px 5px; margin: 0!important; background: #fff; border-bottom: 0px solid #fff; color: #25a; z-index: 1000; } ' +
  '.pin-ac .active { background: rgb(150,150,150); color: #fff; } ' +
  '.pin-ac li.exclude,.pin-ac li.selected { display: none; } '
);