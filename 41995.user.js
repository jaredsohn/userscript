// ==UserScript==
// @name           Webshots Downloader
// @namespace      http://www.webshots.com/
// @description    Webshots Downloader By Jabernal
// @include        http://www.webshots.com/*
// ==/UserScript==


// this script is based on "Webshots Premium Grabber for Mozilla Firefox" http://dr.fa1k0t.googlepages.com/
var webshotsgrabber = {

  load: function () {
    var allImages, thisImage, i;
    allImages = document.getElementsByTagName('img');
    var premiumOnly = false;
    for (i = 0; i < allImages.length; ++i)
    {
      thisImage = allImages[i];
      if(thisImage.getAttribute('src') == 	'http://p.webshots.net/img/grfk/grfk_unlimitedonly_280x34.gif')
      {
        premiumOnly = true;
        break;
      }
    }
      for (i = 0; i < allImages.length; ++i) 
      {
        thisImage = allImages[i];
        if(thisImage.width == 280 && thisImage.height == 210)
        {
          thisImage.id = 'ToDownloadImage';
           var wImagePremiumURL = webshotsgrabber.getURL(allImages[i].src);
          var linkURLPremium = document.createElement('a');
          var href = document.createAttribute('href');
          linkURLPremium.setAttribute('href', wImagePremiumURL);
          linkURLPremium.innerHTML ='<img src=\'' + allImages[i].src + '\' border=\'0\' />';
          thisImage.parentNode.replaceChild(linkURLPremium, thisImage);
	  var buttonLnk = document.getElementById("hires").parentNode;
buttonLnk.onmouseover = "";
buttonLnk.onmouseout = "";
buttonLnk.href = webshotsgrabber.getURL(allImages[i].src);
          break;
        }
      }
    
  },
  
  getURL: function(wImageURL){
  // this function is based on "WebShots 1999x1333 Loader" for IE by Dubnium@mail.ru
    var wLength=wImageURL.length;
    var wNumber=wImageURL.substring(wLength-22,wLength-17);
    var p=wImageURL.substring(wLength-19,wLength-18);
    var s=wImageURL.substring(wLength-18,wLength-17);

    if(p != 0) wDirectory=p+s; else wDirectory=s;
    wImagePremiumURL = 'http://webshots.com/s/cache1/ProInternalUse/' + wDirectory + '/' + wNumber + '_poster2000.jpg';
    return wImagePremiumURL;
  },
  
  showPopup: function(wImagePremiumURL) {
    alert(wImagePremiumURL);
    var popup = window.open(wImagePremiumURL, "popup", "height=800,width=600");
    popup.focus();
    return false;
  }


};
window.addEventListener("load", webshotsgrabber.load, true);