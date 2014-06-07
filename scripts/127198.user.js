// ==UserScript==
// @name           hex.ro - Media Resizer
// @namespace      @viulian
// @description    Media Resizer
// @include        http://hex.ro/photogallery/*
// ==/UserScript==

// buildLink();
buildExportButton();

function buildLink() {
  // get all a links
  var allAs = document.getElementsByTagName('a');
  for(i = 0; i < allAs.length; i ++) {
    var a = allAs[i];
    if (a.innerHTML == 'View fullsize image') {
      var linkToImage = a.getAttribute("href");
      var newURL = "http://hex.ro/photogallery/image.php?width=480&image=/photogallery/" + linkToImage;
      
      var aResized = document.createElement('a');
      aResized.setAttribute('href', newURL);
      aResized.appendChild(document.createTextNode('View as 480px'));

      var separator = document.createTextNode(' / ');      
      // Append after.
      
      a.parentNode.insertBefore(separator, a.nextSibling);
      a.parentNode.insertBefore(aResized, separator.nextSibling);
      
      break;
    }
  }
}

function buildExportButton() {
  var allImgs = document.getElementsByTagName('img');   
  var centerDiv = document.createElement("div");
  centerDiv.style.textAlign = "center"; 
     
  var input = document.createElement("textarea");
  input.id = "textAreaImgLinks";
  input.name = "post";
  input.maxLength = "5000";
  input.cols = "120";
  input.rows = "10";
  centerDiv.appendChild(input);
  document.body.appendChild(centerDiv);
  
  var text = "";
  
  for(i = 0; i < allImgs.length; i ++) {
    var img = allImgs[i];
    if (img.className == "thumb") {
      // src = pictures/IMG_4421_thumb.JPG
      var regexp = /pictures\/(.*?)_thumb.(JPG|jpg)/g;
      var match = regexp.exec(img.src);
      text += "[img]";
      text += "http://hex.ro/photogallery/image.php?width=480&image=/photogallery/pictures/";
      text += match[1] + "." + match[2];
      text += "[/img]";
      
      if (i % 2 == 1) {
        text += "\n";
      }
    }
  }
  
  input.value = text;
}