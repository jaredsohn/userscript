// ==UserScript==
// @namespace     http://thespook.deviantart.com/
// @name          artist's Gallery Categories
// @description   Adds links on deviations that points to an Artist's Gallery Categories.
// @include       http://*.deviantart.com/*
//
//
// ==/UserScript==

if(document.getElementById('artist-comments')){

var userIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ3SURBVDjLpZNtSNNRFIcNKunF1rZWBMJqKaSiX9RP1dClsjldA42slW0q5oxZiuHrlqllLayoaJa2jbm1Lc3QUZpKFmmaTMsaRp+kMgjBheSmTL2//kqMBJlFHx44XM7vOfdyuH4A/P6HFQ9zo7cpa/mM6RvCrVDzaVDy6C5JJKv6rwSnIhlFd0R0Up/GwF2KWyl01CTSkM/dQoQRzAurCjRCGnRUUE2FaoSL0HExiYVzsQwcj6RNrSqo4W5Gh6Yc4+1qDDTkIy+GhYK4nTgdz0H2PrrHUJzs71NQn86enPn+CVN9GnzruoYR63mMPbkC59gQzDl7pt7rc9f7FNyUhPY6Bx9gwt4E9zszhWWpdg6ZcS8j3O7zCTuEpnXB+3MNZkUUZu0NmHE8XsL91oSWwiiEc3MeseLrN6woYCWa/Zl8ozyQ3w3Hl2lYy0SwlCUvsVi/Gv2JwITnYPDun2Hy6jYuEzAF1jUBCVYpO6kXo+NuGMeBAgcgfwNkvgBOPgUqXgKvP7rBFvRhE1crp8Vq1noFYSlacVyqGk0D86gbART9BDk9BFnPCNJbCY5aCFL1Cyhtp0RWAp74MsKSrkq9guHyvfMTtmLc1togpZoyqYmyNoITzVTYRJCiXYBIQ3CwFqi83o3JDhX6C0M8XsGIMoQ4OyuRlq1DdZcLkmbgGDX1iIEKNxAcbgTEOqC4ZRaJ6Ub86K7CYFEo8Qo+GBQlQyXBczLZpbloaQ9k1NUz/kD2myBBKxRZpa5hVcQslalatoUxizxAVVrN3CW21bFj9F858Q9dnIRmDyeuybM71uxmH9BNBB1q6zybV7H9s1Ue4PM3/gu/AEbfqfWy2twsAAAAAElFTkSuQmCC';

var devartGalleryIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFjSURBVDjLpZPdS8JgFMb9FyUpieiDwoKklUNhUwIJKYhCRFrah1FSzDRaFGFRFHbRF0mSkJX3QTddeKfz9J7z5mbtIpoPPLww9vzOw9leBwA4OrHDOaWOL2jVWnDnDeRt5vQLSJvPENgog3/9CcS1EviSRZhMPICwdAfe+A3Iyasa5ggQyVb1WP4d/msheqkTACfbsWf+Agggp1/BjoZnzzhA2qrQg3DBNErQPIZRy0XTqMHIyTeALawFSJV+AhLFKJ3NZpOCuYoJ6A8fcwBu+68Guq5bGvRNH3EAfqrfwoktY7jdjUaD3ukNHXCAuPpomYhBUFyGMfhZHjWMcsv7HCAo9wYgVVKMyhTOiHTiVAp+rBgAlz/LARPxW0sDqtnWoF6vWxp0iRkO8Maubf0HTp8Krbugji0W6M8amTuHocgpDMzk2ZYPaVHuoAY90h50B3Ks9i6brALLoFUCdHwbOwV8AQoMLgCS+2NeAAAAAElFTkSuQmCC';

var xpath = function (query, contextNode, resultType) {
 if (null == contextNode) contextNode = document;
 if (null == resultType) resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
 return document.evaluate(query, contextNode, null, resultType, null);
}

var catpathDiv   = xpath("//td[contains(@class,'dcats')]");
    catpathDiv   = catpathDiv.snapshotItem(0);

var artist       = ""+window.location;
    artist       = artist.substring(7).split('.')[0];

var catpathLinks = catpathDiv.getElementsByTagName('a');
var newcatpath   = "";

var devartPath   = catpathDiv.innerHTML;

var artistPath   = "Artist's <a href='http://"+ artist +".deviantart.com/gallery/#_browse' class='h'>Gallery</a>: "+ devartPath.replace(/browse\.deviantart.com/g,artist+'.deviantart.com/gallery/#_browse');

var toggleButton = "<img src='"+ userIcon +"' id='spq_artistgallery_toggle' style='position:relative;top:3px;cursor:pointer;width:16px;height:16px;' />";

catpathDiv.innerHTML = toggleButton +"&nbsp; <span id='spq_artistgalley'></span>";

function togglePath(){
 if(GM_getValue("pathState") == "devart"){
  document.getElementById('spq_artistgallery_toggle').src = userIcon;
  document.getElementById('spq_artistgalley').innerHTML = artistPath;
  GM_setValue("pathState", "artist");
 }else{
  document.getElementById('spq_artistgallery_toggle').src = devartGalleryIcon;
  document.getElementById('spq_artistgalley').innerHTML = "deviantART: "+ devartPath;
  GM_setValue("pathState", "devart");
 }
}

if(GM_getValue("pathState", "artist") == "artist"){
  document.getElementById('spq_artistgallery_toggle').src = userIcon;
  document.getElementById('spq_artistgalley').innerHTML = artistPath;
  GM_setValue("pathState", "artist");
}else{
  document.getElementById('spq_artistgallery_toggle').src = devartGalleryIcon;
  document.getElementById('spq_artistgalley').innerHTML = "deviantART: "+ devartPath;
  GM_setValue("pathState", "devart");
}

document.getElementById('spq_artistgallery_toggle').addEventListener('click', function(e){togglePath()}, false);

GM_addStyle("#spq_artistgalley a{text-decoration:none!important} #spq_artistgalley a:hover{text-decoration:underline!important}")
}