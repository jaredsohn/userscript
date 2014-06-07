// ==UserScript==
// @namespace     http://nimai.smugmug.com/statcounterthumbs
// @name          StatCounter SmugMug Thumbs
// @description   Adds thumbnails to the detailed view of StatCounter
// @include       http://*.statcounter.com/project/standard/*
// ==/UserScript==


// Update on Aug 11, 200 by John Friend
// Modified script so it works with any domain, including custom domains
// Added support for image Keys so it works with new galleries that required image Keys
// Added support for a number of addition URL formats that didn't previously work
// Added a thumbnail display for URLs that only have a gallery ID and key in them (and made them left aligned to distinguish them)
// Removed support for URLs that do not have an imageKey in them (they would only work on old galleries anyway)
// Added support for date query URLs that have an imageID and imageKey
// Combined popular, date and keyword regEx into one common expression



//--------------------------------------------------------------------------------
function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if (node == null)
    node = document;
  if (tag == null)
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}


//--------------------------------------------------------------------------------
var imgRegExp = new RegExp('(^[^/]+/)(?:gallery/[0-9]+_[0-9a-zA-Z]+(?:#|/[0-9]+/)([0-9]+_[0-9a-zA-Z]+)|(?:popular|date|keyword)/.*(?:#|/)([0-9]+_[0-9a-zA-Z]+)(?:(?:/|\-)[A-Za-z\-]+)*$)');
var galleryRegExp = new RegExp('(^[^/]+/)(?:gallery(/[0-9]+_[0-9a-zA-Z]+)(?:$|#P[\-0-9]+$))');

var cells = getElementsByClass( 'tableContent1Left|tableContent2Left' );
for( i=2; i<cells.length; i+=3 ) {
   var links = cells[i].getElementsByTagName('a');
   var link = links?((links.length>1)?links[1]:links[0]):null;
   if( link ) {
      var imgID = imgRegExp.exec( link.textContent );
      if (!imgID) {
          imgID = galleryRegExp.exec( link.textContent );
      }
      if( imgID ) {
         var host = imgID[1];
         // get the first match from the array that isn't null
         var ID = imgID[2]?imgID[2]:imgID[3];
         var ID = ID?ID:imgID[4];
         if (ID) {
           host = imgID[1];
           var thumb = document.createElement('img');
           // if ID starts with a / char, then it's a gallery ID
           if (ID.substr(0,1) == "/") {
               ID = ID.substr(1);                // remove leading slash
               var splitStr = ID.split("_");     // split id and key apart
               thumb.setAttribute( 'src', 'http://' + host + 'photos/random.mg?AlbumID=' + splitStr[0] + '&Size=Tiny&AlbumKey=' + splitStr[1] + '&rand=1');
               thumb.setAttribute( 'align', 'left' );
           } else {
               thumb.setAttribute( 'src', 'http://'+host+'photos/'+ID+'-Ti.jpg');
               thumb.setAttribute( 'align', 'right' );
           }
           thumb.setAttribute( 'border', '0' );
           thumb.setAttribute( 'alt', '' );
           var img = cells[i].getElementsByTagName('img');
           if( img && img[0] ) cells[i].removeChild( img[0] );
           cells[i].appendChild( thumb );
        }
      }
   }
}

// sub-expressions
// 342986767_gsLLX                                    [0-9]+_[0-9a-zA-Z]+                                                   // image ID and key
// 342986767_gsLLX at end                             ([0-9]+_[0-9a-zA-Z]+)$                                                // image ID and key at end of the URL
// http://jfriend.smugmug.com/                        ^http://[^/]+/                                                        // http://domain
// jfriend.smugmug.com/                               ^[^/]+/                                                               // domain
// gallery/5589651_rU4bA                              gallery/[0-9]+_[0-9a-zA-Z]+                                           // gallery number
// gallery/5589651_rU4bA/1/342986767_gsLLX            or
// gallery/5589651_rU4bA/3/342986476_YYeu6/Medium     or
// gallery/5589651_rU4bA#342971777_3GE8Q              or
// gallery/5589651_rU4bA#342992308_jm3Wg-A-LB         or
// gallery/879690_N8UHS/2/66770280_dRonw#P-2-25       gallery/[0-9]+_[0-9a-zA-Z]+(?:#|/[0-9]+/)([0-9]+_[0-9a-zA-Z]+)        // gallery/gallery_number imageID_imageKey
// gallery/5589651_rU4bA#P-4-12                       gallery(/[0-9]+_[0-9a-zA-Z]+)#P[\-0-9]+$                              // just a gallery ID with gallery Key, we include leading slash on matched result so we can tell it's a gallery ID in the code
// gallery/5589651_rU4bA                              gallery(/[0-9]+_[0-9a-zA-Z]+)$

// Way to get random thumb for a gallery: http://jfriend.smugmug.com/photos/random.mg?AlbumID=5646334&Size=Tiny&AlbumKey=jFXoe&rand=1267


//Supported URL types:
// http://jfriend.smugmug.com/gallery/5589651_rU4bA/3/342986476_YYeu6/Medium
// http://jfriend.smugmug.com/gallery/5589651_rU4bA#342971777_3GE8Q
// http://jfriend.smugmug.com/gallery/5589651_rU4bA/1/342986767_gsLLX
// http://jfriend.smugmug.com/gallery/5589651_rU4bA#342992308_jm3Wg-A-LB
// http://jfriend.smugmug.com/gallery/879690_N8UHS/2/66770280_dRonw#P-2-25
// http://jfriend.smugmug.com/popular/#66768822_mLumi
// http://jfriend.smugmug.com/popular/1/66770280_dRonw#39934670_buaG8
// http://jfriend.smugmug.com/popular/8/66769006_dcwFT
// http://jfriend.smugmug.com/popular/1/66770280_dRonw/Large
// http://jfriend.smugmug.com/popular/#66769006_dcwFT-XL-LB
// http://www.moonriverphotography.com/date/2008-01-1/2008-12-1#245318676_gd5X5
// http://www.moonriverphotography.com/date/2008-01-1/2008-12-1#300157250_XXXTa-A-LB
// http://www.moonriverphotography.com/keyword/fine+art#342192111_dsYBa
// http://www.moonriverphotography.com/keyword/fine+art#2332717_QgjEK-A-LB
// http://jfriend.smugmug.com/gallery/5589651_rU4bA#P-4-12
 

// URL types that can't work except on old galleries because there's no image key
// http://jfriend.smugmug.com/gallery/5575096_C3nQ5#342362737
// http://jfriend.smugmug.com/popular/#66768822
 


// URL types that can't work because there's no imageID
// http://jfriend.smugmug.com/gallery/5589651_rU4bA/1
// http://jfriend.smugmug.com/gallery/5571152_5ARMa#P-6-12
// http://jfriend.smugmug.com/gallery/5589651_rU4bA
// http://jfriend.smugmug.com/Kenya
// http://jfriend.smugmug.com
// http://jfriend.smugmug.com/popular/#P-6-12
// http://www.moonriverphotography.com/keyword/fine+art#P-2-25
// 

