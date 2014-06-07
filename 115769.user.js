// ==UserScript==
// @name           Flickr expand small images
// @namespace      http://myxp.blogspot.com
// @include        http://www.flickr.com/*
// ==/UserScript==
var iid = 0;
var newWidth   = "200";
var newHeight  = "200";
var GMImg_marginleft = "-155";
var GMImg_margintop  = "-101";
var GMImg_left = "";
var stats_photo = "//span[contains(@class,'photo_container') and contains(@class,'pc_tiny')]//img[contains(@src,'_s.jpg')]";


//For Stats pages
if(document.baseURI.match(/flickr.com/) != null){
  GM_addStyle(
    "table tr:hover img.GM_thumbnail { display:block !important; }"+
    "table.detail tr:hover,table.detail tr:hover { background-color:#eee; text-shadow:0 1px 1px lightgrey; }"+
    "table tr:hover td.name { color:black !important; text-shadow:0 1px 1px lightgrey; }"
  );
  
  $x(stats_photo).forEach(function(img) {
    attachGMNode(img);
  });
  
  GMImg_marginleft = "-120";
  GMImg_margintop  = "-30";
}



//Common style
var GM_thumbnail = 
  "img.GM_thumbnail { display:none; "+
	"height:auto !important;"+
	"max-height:" + newHeight + "px !important;"+
	"max-width:"  + newWidth  + "px !important; "+
	"width:auto !important; "+
	"position:absolute !important; " +
	"margin-left:" + GMImg_marginleft + "px !important;" +
	"margin-top:"  + GMImg_margintop  + "px !important; " +
	"z-index:999;"+
	"background-color:transparent !important;"+
	(GMImg_left==""?"":"left:"+ GMImg_left + "px !important; ") +
	"} ";
GM_addStyle(GM_thumbnail);


function attachGMNode(img,insertPos){
  var img_src = img.src;
  if(insertPos == null){insertPos = "before";}
  if(img_src == null || img_src == ''){
    return;
  }
  var zoomimg = document.createElement('img');
  //zoomimg.src = img_src;
	zoomimg.src = zoomUrl(img_src);

	zoomimg.className = "GM_thumbnail";
	zoomimg.height = zoomimg.width = null;
	
	if (insertPos == "before"){
    img.parentNode.insertBefore(zoomimg,img);
  }
  else{
    if(img.parentNode.lastchild == img) {
      img.parentNode.appendChild(zoomimg);
    }
    else{
      img.parentNode.insertBefore(zoomimg,img.nextSibling);
    }
  }
}


function $x(path, root) {
	if (!root) root = document;

	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	//GM_log(path+" ***found matches: "+xpr.snapshotLength);
	for (i = 0; item = xpr.snapshotItem(i); i++) {
    //GM_log(i+": "+item.src);
    arr.push(item);
  }
	return arr;
}

function zoomUrl(url){
  var zoomedUrl;
  
  zoomedUrl = url;
  zoomedUrl = zoomedUrl.replace('_s.jpg','_t.jpg');
  
  return zoomedUrl;
}
