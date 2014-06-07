// ==UserScript==
// @name           IMDB enlarge actor and film pictures on hover -modified
// @author         Anand kumar A
// @namespace      http://myxp.blogspot.com
// @description    Enlarges actor/film pictures in IMDB lists when you hover over that row.
// @include        http://*.imdb.com/title/*
// @include        http://*.imdb.com/name/*
// @include        http://*.imdb.com/chart/*
// @include        http://*.imdb.com/search/*
// @include        http://*.imdb.com/find?*
// @include        http://*.imdb.com/keyword/*
// @include        http://*.imdb.com/*/gallery/*
// @include        http://*.imdb.com/*/mediaindex*
// @include        http://*.imdb.com/*list/*
// ==/UserScript==

var gid = 0;
var iid = 0;
var newWidth   = "200";
var newHeight  = "200";
var GMImg_position = "absolute";
var GMImg_marginleft = "-155";
var GMImg_margintop  = "-101";
var GMImg_left = "";
var GMImg_top  = "";
var GMImg_right = "";
var GMImg_bottom  = "";
var primary_photo = "//td[contains(@class,'primary_photo') or contains(@class,'image') or @class='hs']/a/img";
var title_cast_name = "//td[contains(@class,'name')  or @class='nm']/a[contains(@href,'/name/')]";
var search_photo  = "//td[contains(@class,'image')]/a/img[not(contains(@src,'nopicture'))]";
var filmo_poster  = "//div[contains(@class,'filmo-row')]/img[contains(@class,'filmo_poster') and not(contains(@src,'nopicture'))]";
var chart_photos  = "//table//tr/td//img[contains(@src,'/images/M/')]";
var find_photos   = "//table/tbody/tr/td/a/img[contains(@src,'/images/M/') and not(contains(@src,'/images/b.gif'))]";
var keyword_photos= "//table[@class='results']/tbody/tr/td/a/img[not(contains(@src,'/nophoto'))]";
var gallery_photos= "//div[@class='thumbs' or @class='thumb_list']//img";
var title_mediastrip = "//div[@class='mediastrip']/a/img";
var name_mediastrip = "//div[@class='mediastrip']/a/img";
var name_knownfor   = "//div[@id='knownfor']//img";
var title_recommend = "//div[@id='recommend']//a/img";
var find_mediastrip = "//div[@class='media_strip_thumb']/a/img";
var list_photos     = "//div[contains(@class,'list') and contains(@class,'detail')]//div[@class='image']/a/img";

var googleImagesLogo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAADTFuDTJzDzZ1DzeBDzeHFEGEFUKFGEqVGEuYFUaoGEygGk+lGEupG1ChGlGyHVe0GlG7GVC/HVe4HFa9IV2mG1XGHlrAHlrBH1vDH1zFHVjJHlrLIF7LIWDKIWDMKW/HImLRKnPPKXHQKnHRKXHcN3XILHn0Ln36Ln75R2iVUXeeL4D5L4D6NozgMIH5MID6MIL5MIL6MYX5MYT6Mob5M4b6NIn5NIn6No35No36N476N5D5N5D6O5byOJL5OJL6OZT6Opb6PJn6PZr6PZz6Pp76P6D6VpTdXZvmQKH6QaP6QqX6Qqb6Qqb7Q6j6RKn6RKn7RKr6Raz6Rq76Rq77RrD6R7D7SLL6SbT6SbT7Srb6Srf7T7P6S7n6S7j7TLn7TLv6Uq/3aZvQT8D6UMP6csD7d8b7hLftpr7WpL/apb/eksz7kt37n+f8p8HbosTvo8nuo8j0odD8ptX8rNb8q976qN38r938scvntcnhttD1vdf1vNX4v+H7wNXowtTqwNvxxN3zzeH6zef90Oj93u773/j+4e374O76AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDn1IgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjVJivzgAAABCklEQVQoU2P4jwkYcIq1hwX7uDk5WbeAVUDU5aamJMZEhQWnQcXy4uIjQ4L9gyK87a1NTTSNioHqEqIjw0Njyuozq+qCzPxyzIyAYmERIcHRTVqMLKyilb6xrbb6QLHgoKDAcm1mNg4eLrVGDQMDA6BYgK+PVwcTO5+AhKRIjZ2OoS5QzN3dzbWNhVNYSlZOqFbPSNcQKObq6uzcyc0rLq8ordysZGQEssPRydEhvYBfUEZMNiNb3cgIZJ6NraWVQ0W1h4pnUYOCkZEmSJ2FlbmFsWFSYVZ+sqqhoQ7YXhcTEyNdAyMdHU0jXV1DAwNnoFipsYmRgYGuLlAcSBkYlEDDADXAcIcfqjoAy3HCScaD4CkAAAAASUVORK5CYII=";

//For Title pages
if(document.baseURI.match(/imdb.com\/title\/tt\d+(\/)*/) != null){
  GM_addStyle(
    "table.cast_list tr:hover a img.GM_actorPicture, table.cast tr:hover a img.GM_actorPicture { display:block !important; }"+
    "table.cast_list tr:hover,table.cast tr:hover { background-color:#eee; text-shadow:0 1px 1px lightgrey; }"+
    "table.cast_list tr:hover a,table.cast tr:hover a { color:black; text-shadow:0 1px 1px lightgrey; }"+
    "table.cast_list tr:hover a:hover,table.cast tr:hover a:hover { color:black; text-shadow:0 1px 1px lightgrey; }"+
    "table.cast_list tr:hover td.character div, table.cast tr:hover td.character div { color:black !important; text-shadow:0 1px 1px lightgrey; }"
  );
  GM_addStyle(
    "table tr       a.GM_GoogleImageLink {display:inline;visibility:hidden; float:right;}"+
    "table tr:hover a.GM_GoogleImageLink {visibility:visible !important;}"+
    "table tr a.GM_GoogleImageLink:hover {background-color:lightgrey !important;}"
  );
  
  $x(primary_photo).forEach(function(img) {
    attachGMNode(img);
  });
  $x(title_cast_name).forEach(function(a) {
    addGoogleImageSearchName(a);
  });
  
  addMediaStripEffects(title_mediastrip);
  
  addRecommendEffects(title_recommend);
  
}


//For Name pages
if(document.baseURI.match("imdb.com/name/") != null){
  GM_addStyle(
    "div#filmography div.filmo-row:hover img.GM_actorPicture { display:block !important; }"+
    "div#filmography:hover div.filmo-row:hover a { color: black; text-shadow:0 1px 1px lightgrey; }"+
    "div#filmography:hover div.filmo-row:hover { background-color: #eee; text-shadow:0 1px 1px lightgrey; }"
  );

  $x(filmo_poster).forEach(function(img) {
    attachGMNode(img);
  });
  
  addMediaStripEffects(name_mediastrip);
  
  var kfParent;
  try{
    kfParent = getParentByTagName(document.getElementById('knownfor'),'div');
    addMediaStripEffects(name_knownfor,'#knownfor', kfParent);
  }
  catch(e){
  }
}


//For search pages
if(document.baseURI.match("imdb.com/search/") != null){
  GM_addStyle(
    "table.results tr:hover a img.GM_actorPicture { display:block !important; }"+
    "table.results:hover tr { color:#999; }"+
    "table.results tr:hover { background-color:#eee; color:black; }"
  );

  //Change the position of popup image
  newWidth   = 500;
  newHeight  = 500;
  GMImg_marginleft = 600;
  GMImg_margintop  = -180;  

  $x(search_photo).forEach(function(img) {
    attachGMNode(img);
  });
}


//For Find pages
if(document.baseURI.match("imdb.com/find?") != null){
  GM_addStyle(
    "table tr:hover a img.GM_actorPicture { display:block !important; }"+
    "table tr:hover { background-color:#eee; color:black; text-shadow:0 1px 1px lightgrey;}"+
    "table tr:hover a { text-shadow:0 1px 1px lightgrey; }"+
    "table {width:100%;}"
  );
  
  newWidth   = 500;
  newHeight  = 500;
  GMImg_marginleft = 670;
  GMImg_margintop  = -180;
  
  $x(find_photos).forEach(function(img) {
    attachGMNode(img);
  });
  
  var parentElement;
  if(parentElement != null){
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    parentElement = document.getElementsByClassName('media_strip_thumbs')[0];
    parentElement = getParentByTagName(parentElement,'tbody');
    parentElement.appendChild(tr);
    tr.appendChild(td);
    addMediaStripEffects(find_mediastrip,'.media_strip_thumbs',td);
  }
    
}


//For chart pages
if(document.baseURI.match("imdb.com/chart/") != null){
  GM_addStyle(
    "tr.gm_hover {background-color:#EEEEEE; color:black; text-shadow:0 1px 1px lightgrey;}"+
    "tr.gm_hover img.GM_actorPicture { display:block !important; }"+
    "tr.gm_hover>td.chart_odd_row  {background-color:transparent !important;}"+
    "tr.gm_hover>td.chart_even_row {background-color:transparent !important;}"+
    "tr.gm_hover a {color:black;}"
  );
  
  //Change the position of popup image
  //GMImg_marginleft = '-185';  
  newWidth         = 500;
  newHeight        = 500;
  GMImg_left       = 900;
  GMImg_marginleft = 0;
  GMImg_margintop  = -200;

  $x(chart_photos).forEach(function(img) {
    attachGMNode(img);
    
    var parent_tr = getParentByTagName(img,'tr');
    if(parent_tr != null){
      try{
        parent_tr.addEventListener('mouseover',function(e){addClass(this,'gm_hover');   }, false );
        parent_tr.addEventListener('mouseout' ,function(e){removeClass(this,'gm_hover');}, false );
      }catch(e){
        GM_log(e);
      }
    }

  });
}

//For Keyword pages
if(document.baseURI.match("imdb.com/keyword/") != null){
  GM_addStyle(
    "table.results tr:hover img.GM_actorPicture { display:block !important; }"+
    "table.results:hover tr { color:#444 }"+
    "table.results tr:hover { color:black; text-shadow:0 1px 1px lightgrey; }"+
    "table.results tr:hover a { color:black; text-shadow:0 1px 1px lightgrey; }"+
    "table.results tr:hover a:hover { color:black; text-shadow:0 1px 1px lightgrey; }"
  );
  $x(keyword_photos).forEach(function(img) {
    attachGMNode(img);
  });
  
  //Change the position of popup image
  GMImg_marginleft = '-190';
}

//For Photo Gallery pages and MediaIndex
if(document.baseURI.match("/gallery/") != null || document.baseURI.match("/mediaindex") != null){
  GM_addStyle(
    "div.thumb_list:hover a:hover img.GM_actorPicture, div.thumbs:hover a:hover img.GM_actorPicture { opacity:1.0;display:block !important; }"+
    "div.thumb_list:hover img, div.thumbs:hover img { opacity:0.70; }"+
    "div.thumb_list:hover img:hover, div.thumbs:hover img:hover { opacity:1.0; }"
  );
  
  //Change the position of popup image
  GMImg_position   = 'fixed';
  GMImg_marginleft = '0';  
  newWidth         = '550';
  newHeight        = '550';
  /*GMImg_left       = 840;*/
  GMImg_top        = '100';
  GMImg_right      = '0';
  GMImg_marginleft = '0';
  GMImg_margintop  = '0';

  var zoomimg;
  $x(gallery_photos).forEach(function(img) {
    attachGMNode(img,"after");
  });
}


//For List pages
if(document.baseURI.match("imdb.com/list/") != null){
  GM_addStyle(
    "div.list div.list_item:hover img.GM_actorPicture { display:block !important; }"+
    "div.list:hover div.list_item:hover a { color: black; text-shadow:0 1px 1px lightgrey; }"+
    "div.list:hover div.list_item:hover { background-color: #eee; text-shadow:0 1px 1px lightgrey; }"
  );
  
  newWidth   = 500;
  newHeight  = 500;
  GMImg_marginleft = 620;
  GMImg_margintop  = -160;
  
  $x(list_photos).forEach(function(img) {
    attachGMNode(img);
  });

}


//Common style
var GM_actorPicture = 
  "img.GM_actorPicture { display:none; "+
	"height:auto !important;"+
	"max-height:" + newHeight + "px !important; "+
	"max-width:"  + newWidth  + "px !important; "+
	"width:auto !important; "+
	"position:   " + GMImg_position   + "   !important; " +
	"margin-left:" + GMImg_marginleft + "px !important; " +
	"margin-top:"  + GMImg_margintop  + "px !important; " +
	"z-index:999;"+
	"background-color:transparent !important;"+
	(GMImg_left  ==""?"":"left:"  +GMImg_left  + "px !important; ") +
	(GMImg_top   ==""?"":"top:"   +GMImg_top   + "px !important; ") +
	(GMImg_bottom==""?"":"bottom:"+GMImg_bottom+ "px !important; ") +
	(GMImg_right ==""?"":"right:" +GMImg_right + "px !important; ") +
	"} ";
GM_addStyle(GM_actorPicture);


function attachGMNode(img,insertPos,containerTag){
  var img_src = getRealImgSrc(img);
  if(insertPos == null){insertPos = "before";}
  if(img_src.toLowerCase().search("/nopicture/") > -1 || img_src.toLowerCase().search("/no_photo/") > -1 || img_src.toLowerCase().search("/no_photo.png") > -1){
    return;
  }
  
  var newContainer = null;
  if(containerTag != null && containerTag != ''){
    newContainer = document.createElement(containerTag);
  }
  
  var zoomimg = document.createElement('img');
  zoomimg.src = img_src;
  zoomimg.id  = 'GM_actorPicture_'+gid;
	/*zoomimg.src = zoomimg.src.replace(/_SY\d+_/, "_SY" + newHeight + "_");
	zoomimg.src = zoomimg.src.replace(/_SX\d+_/, "_SX" + newWidth  + "_");
	zoomimg.src = zoomimg.src.replace(/,\d+,\d+_\.jpg$/, "," + newWidth + "," + newHeight + "_.jpg");
	*/
	zoomimg.src = zoomUrl(zoomimg.src,newWidth,img.width,img.height);

	zoomimg.className = "GM_actorPicture";
	zoomimg.height = zoomimg.width = null;
	
	if(newContainer!= null){
    newContainer.appendChild(zoomimg);
	}
	else{
    newContainer = zoomimg;
	}
	
	if (insertPos == "before"){
    img.parentNode.insertBefore(newContainer,img);
  }
  else{
    if(img.parentNode.lastchild == img) {
      img.parentNode.appendChild(newContainer);
    }
    else{
      img.parentNode.insertBefore(newContainer,img.nextSibling);
    }
  }
  
  return zoomimg;
}

function addGoogleImageSearchName(a){
  var googleImgLink = document.createElement('a');
  var td = getParentByTagName(a,'td');
  var lastTd = lastSibling(td); //Should return the td with class name 'character'
  var targetDiv = lastTd.getElementsByTagName('div')[0];  
  if(targetDiv == null){
     targetDiv = lastTd;
  }
  googleImgLink.href = "http://www.google.com/images?q=" + a.text;
  //googleImgLink.innerHTML = "(Google Images)";
  googleImgLink.innerHTML = "<img src='"+googleImagesLogo+"' title='Google Images Search for "+a.text+"'/>";
  googleImgLink.className = "GM_GoogleImageLink";

  targetDiv.appendChild(googleImgLink);
}

function addMediaStripEffects(evalstr,div_class,parentElement){
  if (div_class == null){
    div_class = '.mediastrip';
  }
  GM_addStyle(
  "div"+div_class+":hover img {opacity:0.5;}"+
  "div"+div_class+":hover img:hover {opacity:1.0;}"+
  "div"+div_class+"       img.GMMediastripThumb {display:none;width:auto;max-width:100%;height:auto;}"+
  "div"+div_class+":hover img.GMMediastripThumb {display:block; opacity:1.0;}"
  );
  try{
    $x(evalstr).forEach(function(img) {
      var img_src = getRealImgSrc(img);
      if(img_src.toLowerCase().search("/nopicture/") > -1){
        return;
      }
      
      var zoomimg = document.createElement('img');
      var newid = "GMMediastripThumbId_"+iid++;
      var div_mediastrip;
      if (parentElement == null){
        div_mediastrip = getParentByTagName(img,'div');
      }
      else{
        div_mediastrip = parentElement;
      }
      zoomimg.src = img_src;

      /*zoomimg.src = zoomimg.src.replace(/_SY\d+_/, "_");
      zoomimg.src = zoomimg.src.replace(/_SX\d+_/, "_");
      zoomimg.src = zoomimg.src.replace(/BO.+png_/, "");
      zoomimg.src = zoomimg.src.replace(/_SS\d+_/, "_SS" + "0" + "_");*/
      zoomimg.src = zoomUrl(zoomimg.src, 620,img.width,img.height);
      zoomimg.id = newid;
      zoomimg.height = zoomimg.width = null;
      zoomimg.className = "GMMediastripThumb";
      zoomimg.style.display  = "none";
      zoomimg.style.width    = "auto";
      zoomimg.style.maxWidth = "100%";
      zoomimg.style.height   = "auto";

      div_mediastrip.appendChild(zoomimg);
      
        img.addEventListener('mouseover',function(e){document.getElementById(newid).style.display="block";}, false );
        img.parentNode.addEventListener('mouseout' ,function(e){document.getElementById(newid).style.display="none" ;}, false );

    });
   }catch(e){
    GM_log(e);
  }
}


function addRecommendEffects(evalstr){
  GM_addStyle(
  "div#recommend:hover img {opacity:0.5;}"+
  "div#recommend div:hover img {opacity:1.0;}"+
  "div#recommend       img.GMRecommendThumb {width:auto;max-width:100%;height:auto;}"+
  "div#recommend:hover img.GMRecommendThumb {display:inline-block; opacity:1.0;}"
  );
  
  $x(evalstr).forEach(function(img) {
    var  img_src = getRealImgSrc(img);
      GM_log('addRecommendEffects: '+img.outerHTML);
    if(img_src.toLowerCase().search("/nopicture/") > -1){
      return;
    }
    
    var zoomimg = document.createElement('img');
    var newid = "GMRecommendThumbId_"+iid++;
    var div_recommend = document.getElementById('recommend');
    var div_recommend_childdiv = getParentByTagName(img,'div');
    zoomimg.src = img_src;

    /*zoomimg.src = zoomimg.src.replace(/_SY\d+_/, "_");
    zoomimg.src = zoomimg.src.replace(/_SX\d+_/, "_");
    zoomimg.src = zoomimg.src.replace(/_CR\d+,\d+,\d+,\d+_/, "_CR0,0,0,0_SS500_");
    */
    zoomimg.src = zoomUrl(zoomimg.src, 600,img.width,img.height);

    zoomimg.height = zoomimg.width = null;
    zoomimg.className = "GMRecommendThumb";
    zoomimg.id = newid;
    zoomimg.style.display = "none";

    div_recommend.appendChild(zoomimg);
    try{
      div_recommend_childdiv.addEventListener('mouseover',function(e){document.getElementById(newid).style.display="inline-block";}, false );
      div_recommend_childdiv.addEventListener('mouseout' ,function(e){document.getElementById(newid).style.display="none"        ;}, false );
    }catch(e){
      GM_log(e);
    }
  });
 
}

function getRealImgSrc(img){
  var realSrc = img.src;
  try{
    if (img.src.toLowerCase().search("/nopicture/") > -1 && img.getAttribute('loadlate') != null){
      realSrc = img.getAttribute('loadlate');
    }
  }catch(e){
  }
  return realSrc;
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

function zoomUrl(url,newSize,imgWidth,imgHeight){
  var urlSX = url.match(/_SX(\d+)/)==null?"":url.match(/_SX(\d+)/)[1];
  var urlSY = url.match(/_SY(\d+)/)==null?"":url.match(/_SY(\d+)/)[1];
  var urlSS = url.match(/_SS(\d+)/)==null?"":url.match(/_SS(\d+)/)[1];;
  //var imgType = url.split('.').pop();
  var urlC1 = "", urlC2 = "", urlC3 = "", urlC4 = "";
  var zoomedUrl;
  var urlRatio, imgRatio;
  var newX, newY, newWidth, newHeight;
  var cropArr = url.match(/_CR(\d+),(\d+),(\d+),(\d+)/);
  if (cropArr != null){
    urlC1 = cropArr[1];
    urlC2 = cropArr[2];
    urlC3 = cropArr[3];
    urlC4 = cropArr[4];
    newX = urlC1;
    newY = urlC2;
    /*urlRatio  = 1.00;
    newWidth  = urlC3;
    newHeight = urlC4;
    if (urlC1 != ""){
      urlRatio = newWidth/newHeight;
    }*/
  }
  else if(urlSX !="" || urlSY != ""){
    //No CR found. Using SX, SY
    /*newWidth  = parseInt(urlSX==""?newSize:urlSX);
    newHeight = parseInt(urlSY==""?newSize:urlSY);
    urlRatio  = newWidth / newHeight;*/
  }
  
  imgWidth  = parseInt(imgWidth);
  imgHeight = parseInt(imgHeight);
  imgRatio  = imgWidth / imgHeight;
  
  //Actual Zooming takes place here
  if (imgRatio < 1.0){
    newHeight  = newSize;
    newWidth = Math.round(newSize * imgRatio);
  }
  else if (imgRatio > 1.0){
    newWidth  = newSize;
    newHeight = Math.round(newSize / imgRatio);
  }
  else{
    newWidth  = newSize;
    newHeight = newSize;
  }
  
  if(urlC1 != "" && urlC1 != "0") {
    newX = parseInt(urlC1) + parseInt(newWidth);
  }
  if(urlC2 != "" && urlC2 != "0") {
    newY = 0 + parseInt(urlC2) + parseInt(newHeight);
  }

  /*
  GM_log("urlC1 = "+urlC1+", urlC2 = "+urlC2+", urlC3 = "+urlC3+", urlC4 = "+urlC4);
  GM_log( "urlRatio="+urlRatio+" , newWidth="+newWidth+" newHeight="+newHeight );
  */
  zoomedUrl = url;
  /*If we have both the CR and SS, just change the SS to preserve correct cropping.*/
  if(zoomedUrl.match(/_CR\d+/) != null && zoomedUrl.match(/_SS\d+_/) != null){
    zoomedUrl = zoomedUrl.replace(/_SS\d+_/, "_SS"+newSize+"_");
  }
  else{
    zoomedUrl = zoomedUrl.replace(/_CR\d+,\d+,\d+,\d+_/, "_CR" + newX + "," + newY + "," + newWidth + "," + newHeight + "_");
    zoomedUrl = zoomedUrl.replace(/_SS\d+_/, "");
  }
  /*Always replace SX and SY, if present.*/
  zoomedUrl = zoomedUrl.replace(/_SY\d+_/, "_SY"+newHeight+"_");
  zoomedUrl = zoomedUrl.replace(/_SX\d+_/, "_SX"+newWidth+"_");
  /*Prevent too large an image from being used by Squaring it.*/
  if(zoomedUrl.match(/_CR\d+/) != null){
    if(urlC3 < newWidth || urlC4 < newHeight){
      zoomedUrl = zoomedUrl.replace(/_SS\d+_/, "");
    }
    else{
      zoomedUrl = zoomedUrl.replace(/_SS\d+_/, "_SS"+newSize+"_");
    }
  }
  
  /*Erase any Border Overlays in the URL to get a clean image*/
  zoomedUrl = zoomedUrl.replace(/BO.+png_/, "");

  return zoomedUrl;
}

function getParentByTagName(ele,parentTagName){
    var retEle = ele;
    var i = 5;//Safety limit
    while(i>=0 && retEle.parentNode){ 
      retEle = retEle.parentNode;
      if(retEle.tagName.toLowerCase() == parentTagName.toLowerCase()){
        break;
      }
      i--;
    }
    return retEle;
}

function lastSibling(node){
    var tempObj=node.parentNode.lastChild; 
    while(tempObj.nodeType!=1 && tempObj.previousSibling!=null){  
    tempObj=tempObj.previousSibling;   
    }  
    return (tempObj.nodeType==1)?tempObj:false; 
}


/*helpers
source:http://www.openjs.com/scripts/dom/class_manipulation.php
*/

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

/**End helpers**/
