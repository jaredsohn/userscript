// ==UserScript==
// @name           GayRomeo Optimizer +
// @namespace      http://marvinate.wordpress.com
// @description    Optimize GayRomeo (and PlanetRomeo) pages
//
// - For the GR-Search result -
// @_include        /https?://(www\.(gay|planet)romeo.com|83\.98\.143\.20)/.*search/.*/
// @match        *://*.gayromeo.com/*search/*
// @match        *://*.planetromeo.com/*search/*
// @match        *://83.98.143.20/*search/*
//                ^--that's for the search list enhancements
// 'include /.../ ' with RegExp is not supported by Chrome -
//  since Greasemonkey 0.9.8 (Aug 2011) also supports 'match' I don't use 'include'
//
// - For the Myuser -
// @match        *://*.gayromeo.com/*myuser/*
// @match        *://*.planetromeo.com/*myuser/*
// @match        *://83.98.143.20/*myuser/*
//
// - For the Messages -
// @match        *://*.gayromeo.com/*messages/*
// @match        *://*.planetromeo.com/*messages/*
// @match        *://83.98.143.20/*messages/*
//
// - For the Forum -
// @match        *://*.gayromeo.com/*auswertung/setcard/club/forum*
// @match        *://*.planetromeo.com/*auswertung/setcard/club/forum*
// @match        *://83.98.143.20/*auswertung/setcard/club/forum*
//
// @_include        /https?://(www\.(gay|planet)romeo.com|83\.98\.143\.20)/.*auswertung/pix/popup.*/
// @match        *://*.gayromeo.com/*auswertung/pix/popup*
// @match        *://*.planetromeo.com/*auswertung/pix/popup*
// @match        *://83.98.143.20/*auswertung/pix/popup*
//                ^--For close picture by clicking on it.
//
// @grant          GM_xmlhttpRequest
// @version        1.6
// ==/UserScript==
// Version 1.1 [2011-11-14]
// [*] Changed internal system to use real objects instead of procedural stuff
//
// Version 1.1a [2011-11-23]
// [*] Optimized JavaScript code - yes, back to procedural stuff... just shut up ;-)
//
// Version 1.2 [2012-01-14]
// [+] Integrated callback to GR-Tools
//
// Version 1.2.1 [2012-02-01]
// [*] Added GayRomeo IP address as default include
// [*] Special handling for club pages (thanks to gymnazein)
//
// Version 1.2.1a [2012-02-02]
// [*] Correct useof window.location instead of document.location
//
// Version 1.2.2 [2012-10-31]
// [*] Small DOM adjustments (thanks to gymnazein)
//
// Version 1.3 [2012-11-24]
// [*] Detect last page (thanks to djamana)
// [*] Optimized generated DOM (thanks to djamana)
// [*] Refactored internal logics
//
// Version 1.3a [2012-12-06]
// [*] Copied code from ver 1.2.2 to remove ads-Banner('#div-gpt-ad') from search results
// [*] also update the 'Next »'                 (by djamana)
// some source code edits/optimisation          (by djamana)
//
// Version 1.4 [2013-02-20]
// [*] Updated retrigger-function for GR-Tools v3
//
// Version 1.5 [2013-12-14]
// [*] review & compared to original version 1.4 (Feb 10, 2013 00:01)
// [*] fix match pattern
//      ...planetromeo.com/*/search/* ... does not match url like this:
//      ...planetromeo.com/search/inde...
//
// Version 1.6 [2013-12-30]
// [*] added support for User Center & Messages
// [*] added support for User Center & Messages
//


// -----------------------------------------------------------------------------
// ---  Close a picture in a popup Window by clicking on it. -------------------
// -----------------------------------------------------------------------------
if ( location.pathname.indexOf("/auswertung/pix/popup") > -1) {

    var imageElementsResult = MV_getElementsByPath("//img");
    //    var imageElementsResult = document.evaluate("//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //
    // add close on click to all Profile pictures
    for( var i = 0; i < imageElementsResult.snapshotLength; i++) {

        imageElementsResult.snapshotItem(i).
        addEventListener("click",
                         function() {
                             window.close();
                         }, false
                        );

    }
}





















// -----------------------------------------------------------------------------
// ---  Search list enhancements  ----------------------------------------------
// -----------------------------------------------------------------------------

isMyUser = !!( location.pathname.indexOf("/myuser/") > -1 )
isMessages = !!( location.pathname.indexOf("/messages/") > -1 )
isForum = !!( location.pathname.indexOf("/club/forum") > -1 )
isForumThread = !!( location.pathname.indexOf("/club/forum_thread") > -1 )

itemsPerPage =
               isForumThread ? 20 :
               isForum ? 30 :
               isMessages ? 50 :
               isMyUser ? 1 :
               1

if (( location.pathname.indexOf("/search/") > -1 ) ||
      isForum ||
      isMyUser ||
      isMessages) {
    ///////////////////////////////////////////////
    // String.format  -  makes java support format strings like this
    // Example: alert( "Hello {0}".format("world") );
    String.prototype.format = function() {
        var formatted = this;
        for(arg in arguments) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    ///////////////////////////////////////////////
    // String.ToInt  -  convert a integer string to a Integer Number
    // Example: "19".ToInt()
    // > 19
    // Attention about a possible Typo-error:
    // >        "19".ToInt
    // Will NOT cause a syntax or runtime error and return the function itself!
    String.prototype.ToInt = function() {
        // '*1' will convert a stringNumber to int
        return this *1;
    };

    var MSG_LOAD           = "Load next page (page {0})";
    var MSG_LOAD_STYLE     = "display: block; text-align: left; border: 1px solid #ffffff; padding: 5px 5px 5px 5px;";

    var MSG_LOADING        = "Loading next page (page {0})...";
    var MSG_LOADING_STYLE  = "border: 1px solid #ffffff; padding: 5px 5px 5px 5px;";

    var MSG_RESULT        = "Result list page {0}";
    var MSG_RESULT_STYLE  = MSG_LOADING_STYLE;
    var MSG_ERR_RETRY      = "Retry loading page";
    var MSG_ERROR          = "Cannot load next page [{1}]<br>{0}<br>" + MSG_ERR_RETRY + "?";
    var MSG_ERROR_STYLE    = "border: 1px solid red; padding: 5px 5px 5px; background-color: red; font-weight: bold;";



    ///////////////////////////////////////////////
    // GrListOptimizer - Constructor/Init for SGrListOptimizer
    function GrListOptimizer() {


        // Initial search url:
        // http://www.planetromeo.com/search/?action=execute& searchType=userOnlineIn&direct_area=1

        // first search page url:
        // http://www.planetromeo.com/myuser/?page=romeo&filterSpecial=favourites&pageId=1
        // http://www.planetromeo.com/mitglieder/messages/uebersicht.php?seite=1
        // http://www.planetromeo.com/search/?action=showPage&searchType=userOnlineIn&searchR
        //        esultId=4&resultPage=1
        // Get              ^^^^^^^^^^-'resultPage=' from url to see what's the current page.
        var currentPageRegexArray   = /(?:resultPage|pageId|seite|offset)=(\d+)/.exec(location.search)
        this.currentPageIndex       = currentPageRegexArray ? currentPageRegexArray[1].ToInt() : this.GetFirstIndex();


        // Find url to next page  by looking for a the link 'Next »' - assuming that it's the last in the table
        // Seite 1 | 2 | ... | 20 | Nächste »
        //                         ^^^^^^^^^ Last "a"ncor in table{2]
        this.nextPageLink = MV_getElementByPath ( "\
                //div[@class='paginationContainer']//a[last()] | \
                //table[@class='messageCenter']//tr[last()]//a[last()] | \
                //body/table[last()]/tbody/tr[last()]/td/a[last()]  \
                ");
        debugger;

        if (isMessages) {
         // <td width="350">&nbsp;
        // 50 Gesendet&nbsp;|&nbsp;<a href="uebersicht.php?view=sent">135</a>&nbsp;Insgesamt  </td>
            this.lastPageIndex = MV_getElementByPath("//a[@href='uebersicht.php?view=sent']")
                                                 .textContent.match(/\d+/)[0]  .ToInt()
                                                    || 2
            this.lastPageIndex = Math.floor (this.lastPageIndex / itemsPerPage ) // i.e. 30 MessagesPerPage

        } else if (isForum) {
            this.lastPageIndex = MV_getElementByPath("\
                                //div[@class='menuBox']/div/a[last()] | \
                                //body/table[last()]/tbody/tr[last()]/td[last()]/a[last()] \
                                ")
                                .textContent.match(/\d+/)[0]  .ToInt()
                                || 2;
           this.lastPageIndex    --

           this.currentPageIndex = Math.floor (this.currentPageIndex / itemsPerPage ) // i.e. 50 ThreadperPage

        } else {
      //    var lastPageLink = MV_getElementByPath("//table[@class='searchLayout']//tr[last()]/td[last()]/a[last()]");
      //   this.lastPageIndex = lastPageLink == null ? -1 : parseInt(lastPageLink.innerHTML);
           // ... and the text of the link item before 'Next >>' is how many pages there are
           // (the RE is for the case that it may look like 'Page 20')
           this.lastPageIndex              = this.nextPageLink.previousElementSibling
                                                 .textContent.match(/\d+/)[0]  .ToInt()
                                             || 20;
           if ( isMyUser) {
         // MyUser & Messages is base 0
            this.lastPageIndex    --

            }
        }


        this.GetNavElement()
    }

    GrListOptimizer.prototype.GetFirstIndex = function () {
       return ( (isMyUser || isMessages) ? 0 :
                                           1
           )
    }

    GrListOptimizer.prototype.GetNavElement = function () {

        this.navigationTableElementOld = this.navigationTableElement
        this.navigationTableElement = MV_getElementByPath("//body/table[last()]/tbody/tr[last()]") ||
                                      MV_getElementByPath("//div[@class='paginationContainer'][2]") ||
                                      MV_getElementByPath("//table[@class='messageCenter']/tbody[last()]//tr[last()]");

        if (isMessages | isForum) {

          var insertTarget = this.navigationTableElement.parentNode.parentNode

          if (isForum)
             insertTarget = insertTarget.parentNode


          insertTarget
              .insertBefore( this.navigationTableElement )

          if (this.navigationTableElementOld)
              this.navigationTableElementOld.remove()

        }

    }




    // Append the given element to the currently displayed content on the screen.
    // The content is always added before the pagination table
    GrListOptimizer.prototype.appendContent = function(pElement) {
        this.navigationTableElement.parentNode.insertBefore(pElement, this.navigationTableElement);

        // Add 'replaceContent' function to the element
        pElement.replaceContent = function(pNewContent) {
            this.parentElement.insertBefore(pNewContent, this);
            this.parentElement.removeChild(              this);

            pNewContent.replaceContent = this.replaceContent;
        };
    }

    GrListOptimizer.prototype.hasNextPage = function (pNextPageIndex) {
        return (
           ( this.lastPageIndex > (isMyUser ? 0 : 1) )
        && ( this.lastPageIndex >= pNextPageIndex) )
    }

    ///////////////////////////////////////////////
    ////
    ///  L O A D
    //
    // Append the link to the next page (if there is a next page, otherwise, we'll
    // do nothing)
    GrListOptimizer.prototype.appendNextPageLink = function(pNextPageIndex) {
        debugger
        // Did we reached the end ? ...
        if( this.hasNextPage( pNextPageIndex ) ) {

            // ...no - So generate url for the new page...
            this.nextPageLink.search = this.nextPageLink.search
               .replace(/((?:resultPage|pageId|seite|offset)=)\d*/, "$1" +
                        (isForum ? (pNextPageIndex * itemsPerPage )  :
                                   pNextPageIndex )) ;

            // ... and append a new MouseOver-QuickloadElement
            var loadMessageDiv = MV_createElement( "a", {
                "style": MSG_LOAD_STYLE,
                "href": this.nextPageLink.href
            } , MSG_LOAD.format( pNextPageIndex ) ) ;

            var thisOptimizer = this;
            loadMessageDiv.addEventListener("mouseover", function() {
                thisOptimizer.appendResultPage(loadMessageDiv, pNextPageIndex); }, true);

            this.appendContent(loadMessageDiv);
        }
    }

    ///////////////////////////////////////////////
    ////
    ///  L O A D I N G
    //
    // Load the content for the page with the specified index and append it to
    // the current page
    GrListOptimizer.prototype.appendResultPage = function(pSourceLinkElement, pPageIndex) {
debugger
     // Loading next page (page {0})...
        var loadingMessageDiv = MV_createElement( "div", {
            "style": MSG_LOADING_STYLE} ,
                     MSG_LOADING.format( pPageIndex ));

        pSourceLinkElement.replaceContent (loadingMessageDiv);

     // Load next page
        var thisOptimizer = this;

        MV_sendRequest({
            url: this.nextPageLink.href,

            xpath: "\
                    //table[@class='messageCenter']/tbody | \
                    //table[@class='user-table'] | \
                    //td/table[1] | \
                    //body/table[1] \
                    ",

            onComplete: function(pElement, pRequest, pResponse) {
                thisOptimizer.appendResultFromResponse(loadingMessageDiv,
                                                       pElement, pRequest, pResponse);
            },

            onError: function(pRequest, pResponse, pException) {
                thisOptimizer.appendResultFromError(loadingMessageDiv,
                                                    pRequest, pResponse, pException);
            },

            pageIndex: pPageIndex

        });

    }

    ///////////////////////////////////////////////
    ////
    ///  R E S U L T
    //
    GrListOptimizer.prototype.appendResultFromResponse = function(pLoadingElement, pElement, pRequest, pResponse)
    {
      // Replace the "loading" message with "Result list (page 3)"
        var divLabel_Result = MV_createElement("div" , {
            "style": MSG_RESULT_STYLE },
                     MSG_RESULT.format(pRequest.pageIndex));

        pLoadingElement.replaceContent (divLabel_Result);



     // Append the content we've received for the next page
        this.appendContent(pElement);

        if (isMessages) {

           // replace old NavEl with new one
           this.GetNavElement()
        }

        this.appendNextPageLink(pRequest.pageIndex + 1);


    // retrigger GRT-Tools if installed
    // (http://userscripts.org/scripts/show/33184)
       var grtEvent = document.createEvent('Event');
       grtEvent.initEvent('GRT_RETRIGGER', false, false);
       document.dispatchEvent(grtEvent);

    }


    ///////////////////////////////////////////////
    ////
    ///  E R R O R  O N  L O A D I N G
    //
    //////////////////////////////////////////////
    GrListOptimizer.prototype.appendResultFromError = function(pLoadingElement, pRequest, pResponse, pException) {

        var errorElement = MV_createElement("div", {
            "style": MSG_ERROR_STYLE },
                     MSG_ERROR.format(pRequest.url, pException || "-" ) );

       // var retryLink = document.createElement("a");
       // retryLink.appendChild(document.createTextNode(MSG_ERR_RETRY));
       // errorElement.appendChild(document.createTextNode(" ("));
       // errorElement.appendChild(retryLink);
       // errorElement.appendChild(document.createTextNode(")"));

        var thisOptimizer = this;

        errorElement.addEventListener("click", function() {
            thisOptimizer.appendResultPage(errorElement, pRequest.pageIndex); }
                                      , true);

        pLoadingElement.replaceContent (errorElement);
    }


    // Remove Ads
    MV_removeElementsByPath("//div[contains(@id, 'div-gpt-ad')]");

    // Start/Create GR-Optimizer
    var listOptimizer = new GrListOptimizer();
    listOptimizer.appendNextPageLink(  listOptimizer.currentPageIndex + 1 );
}
// -----------------------------------------------------------------------------
// ---  Includes  --------------------------------------------------------------
// -----------------------------------------------------------------------------
// Include start [xmlhttpUtil.js]
/**
* Sends the request to the remote system and evaluates the response which
* must be valid HTML and contain a specified element identifiable by an XPath
* expression
*
* Expected properties in the request are:
* url
*   the URL to which the request will be made
* xpath
*   the XPath expression that must evaluate to an element that will be
*   extracted from the response received by the remote system
* onComplete
*   a function that will be called when the result has been received and the
*   content should be displayed
* onError
*   a function that will be called if the request cannot be sent or the
*   response received is invalid
*/
function MV_sendRequest(pRequest) {
    var processResponse = function(pResponse) {
        var responseHtmlStart = pResponse.responseText.indexOf("<html");
        var responseHtmlEnd = pResponse.responseText.indexOf("</html>");

        if(  ( responseHtmlStart < 0)
           || ( responseHtmlEnd   < 0) ) {

            pRequest.onError(pRequest, pResponse, "Invalid HTML document received");
        } else {
            var responseHtmlElement = document.createElement("html");
            responseHtmlElement.innerHTML = pResponse.responseText.substring(responseHtmlStart, responseHtmlEnd + "</html>".length);
            var responseXpathResult = document.evaluate(pRequest.xpath, responseHtmlElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if(responseXpathResult.snapshotLength <= 0) {
                pRequest.onError(pRequest, pResponse, "Invalid HTML document received");
            } else {
                pRequest.onComplete(responseXpathResult.snapshotItem(0), pRequest, pResponse);
            }
        }
    };
    try {
        GM_xmlhttpRequest({
            method: "GET",
            url: pRequest.url,
            onload: processResponse,
            onerror: function(pResponse) { pRequest.onError(pRequest, pResponse, null); }
        });
    } catch(e) {
        pRequest.onError(pRequest, null, e);
        //  pRequest.onError(pRequest, pResponse, null);
        //  TODO: ^^-old Version ; Check
    }
}
// Include end [xmlhttpUtil.js]
// Include start [domUtil.js]
function MV_removeElementsByPath(pPath) {
    var pathResult = document.evaluate(
        pPath,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if(pathResult.snapshotLength > 0) {
        for(var i=0; i < pathResult.snapshotLength; i++) {
            var pathNode = pathResult.snapshotItem(i);
            pathNode.parentNode.removeChild(pathNode);
        }
    }
}
function MV_getElementByPath(pPath ,opt_startNode) {

    var pathResult   =  MV_getElementsByPath(pPath ,opt_startNode);
    return pathResult.snapshotLength <= 0 ? null : pathResult.snapshotItem(0);
}
function MV_getElementsByPath(pPath ,opt_startNode) {

    opt_startNode  = opt_startNode || document;

    return   document.evaluate(    pPath,
                               opt_startNode,
                               null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function MV_createButton(pAttributes, pClickListener) {
    pAttributes.type = "button";
    var resultElement = MV_createElement("input", pAttributes);
    if(pClickListener != null) {
        resultElement.addEventListener("click", pClickListener, true);
    }
    return resultElement;
}
function MV_createElement(pElementName, pAttributes, pInnerHtml) {
    if (isMessages) {
        pElementName= "td"
        pAttributes.Colspan = "5"
    }

    var resultElement = document.createElement(pElementName);
    for(attributeName in pAttributes) {
        resultElement.setAttribute(attributeName, pAttributes[attributeName]);
    }
    if(pInnerHtml) {
        resultElement.innerHTML = pInnerHtml;
    }
    return resultElement;
}
// Include end [domUtil.js]
