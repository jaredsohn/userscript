//  
// ==UserScript==  
// @name          Renderosity thumbs  
// @namespace     http://sparcman.net/Documents/  
// @author        SparcMan  
// @description	  Loads full-size pics instead of thumbnails.  
// @include       http://www.renderosity.com/mod/gallery/*  
// ==/UserScript==  
  
// A quick and dirty script to change all of the thumb images in the Renderosity  
// gallery pages into full size images. This is the first script I've  
// created. As a reference, I used the gallery.aethereality.net script by yoshi314.  
  
// 3/13/07 - Small update to assume jpg image even when thumbnail is  
//           a gif file  
// 3/14/07 - Updated the script to change the layout of the thumbnail page from  
//           three columns of images to just one which makes this script far more  
//           useful. There were some problems I didn't quite figure out, but  
//           I managed to hack in some solutions that don't look pretty, but they  
//           work.  
// 1/12/09 - Nearly 2 years later and just one update. Something was changed on the
//           Renderosity website that broke the part of script that puts all the
//           images in a single column so I've updated it to fix the problem.
  
  var imgTables = document.evaluate(  
      "//table[@class='gallery_images_table']",  
      document,  
      null,  
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  
      null);  
  var thisTable ;  
  var newRow ;
  var newRow2 ;
  var newRow3 ;
  var newCell1 ;
  var newCell2 ;
  var newCell3 ;
  var dataCell ;
  
  for (var ind=0; ind < imgTables.snapshotLength; ind++) {  
    thisTable = imgTables.snapshotItem(ind); 
    for (var ind2 = thisTable.tBodies[0].rows.length - 1; ind2 >= 0 ; ind2--) {
	  newRow = document.createElement('tr') ;
          newCell1 = document.createElement('td') ;
          dataCell = thisTable.tBodies[0].rows[ind2].cells[0] ;
	  if (dataCell.getAttribute("class") == "gallery_images_cell") {
            newCell1.innerHTML = dataCell.innerHTML
	    newRow.appendChild(newCell1);
	  }
	  newRow2 = document.createElement('tr') ;
          newCell2 = document.createElement('td') ;
          if (dataCell.nextSibling) {
            dataCell = dataCell.nextSibling ;
	    if (dataCell.getAttribute("class") == "gallery_images_cell") {
              newCell2.innerHTML = dataCell.innerHTML
	      newRow2.appendChild(newCell2);
	    }
          }
	  newRow3 = document.createElement('tr') ;
          newCell3 = document.createElement('td') ;
          if (dataCell.nextSibling) {
            dataCell = dataCell.nextSibling ;
	    if (dataCell.getAttribute("class") == "gallery_images_cell") {
              newCell3.innerHTML = dataCell.innerHTML
	      newRow3.appendChild(newCell3);
	    }
          }
          thisTable.tBodies[0].insertBefore(newRow, thisTable.tBodies[0].rows[ind2]);
          thisTable.tBodies[0].deleteRow(ind2 + 1) ;
	  if (ind2 < thisTable.tBodies[0].rows.length) {
	    thisTable.tBodies[0].insertBefore(newRow2, thisTable.tBodies[0].rows[ind2 + 1]);
	    thisTable.tBodies[0].insertBefore(newRow3, thisTable.tBodies[0].rows[ind2 + 1]);

	  } else {
	    thisTable.tBodies[0].appendChild(newRow2);
		thisTable.tBodies[0].appendChild(newRow3);
	  }
	}
  }
   
  var pics = document.getElementsByTagName("img");  
  
  for (var i=0; i < pics.length; i++) {  
    var thisPic = pics[i];  
  
    if (thisPic.src.indexOf("media/folder") > -1) {  
  
    var idx = thisPic.src.indexOf("/thumb_");  
  
    if (idx > -1) {  
  
        thisPic.src = thisPic.src.substr(0,idx) + "/file_" + thisPic.src.substr(idx+7);  
        var gifidx = thisPic.src.indexOf(".gif");  
        if (gifidx > -1) thisPic.src = thisPic.src.substr(0,gifidx) + ".jpg" ;  
        }  
  
      }  
    }  

