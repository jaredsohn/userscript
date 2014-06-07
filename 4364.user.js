// ==UserScript==
// @name          eHarmony_Showpics
// @description   replaces "info" icon in the general listing w/thumbnail pic of match from the match details page
// @include       http://www.eharmony.com/singles/servlet/user/mymatches/*
// @include       http://*.eharmony.com/singles/servlet/user/mymatches
// ==/UserScript==

    anchors = new Array();
var allCells, thisCell;
var id;
var page;

//    GM_log('-----Beginning eHarmony info-icon replacement ');
    
    // look for table cells containing the image "ic-info.gif"
    allCells = document.evaluate(
        "//img[@src='http://static.eharmony.com:80/static/images/mymatches/ic-info.gif']/parent::*",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    for (var i = 0; i < allCells.snapshotLength; i++) {
        thisCell = allCells.snapshotItem(i);
        page = thisCell.getAttribute('page');
        id = 'id' + page.match(/[0-9]+/);
        anchors[id]=thisCell;
        
//        GM_log('-----retrieveing member page ' + id);
        
        GM_xmlhttpRequest({
           method : 'GET',
           url : 'http://www.eharmony.com/singles' + page,
             
           onload: function(responseDetails) {
                   var refText = responseDetails.responseText;
                   var imgURI  = refText.match(/(http:\/\/photos.eharmony.com[^"]+)/g); 
                   var Height  = refText.match(/http:\/\/photos.eharmony.com\/.+height="([0-9]+)"/)[1];
                   var Width   = refText.match(/http:\/\/photos.eharmony.com\/.+width="([0-9]+)"/)[1];
                   var id2     = refText.match(/<input type="hidden" name="set" value="([0-9]+)">/)[1];
                       id2     = 'id' + id2;
                       
//                   GM_log('-----Retrieved member page ' + id2 + '\n'
//                        + '     New URI: ' + imgURI);
                        
                   if (imgURI != null){
                       // only replace the icon if found -- some members don't have
                       // pics or have chosen not to share them just yet
                       var oldImg = anchors[id2].firstChild;
                       oldImg.setAttribute('src', imgURI);
                       oldImg.setAttribute('width',Width);
                       oldImg.setAttribute('height',Height);
                       }
                   }
           }
        )
	};
//    GM_log('-----End of    eHarmony info-icon replacement ');
;