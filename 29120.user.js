// ==UserScript==
// @name          Picasaweb album export to flickr
// @description	  Lets you export your photos from your picasaweb account into your flickr account
// @author        Stephen Fernandez http://steeev.freehostia.com/ http://flickr.com/steeev
// @namespace     http://steeev.freehostia.com/flickr
// @include       http://picasaweb.google.com/*
// @version       0.35  (14/03/2009)
// ==/UserScript==
/* --------------------------------------------------------------------

(c) 2008 Stephen Fernandez - Excellatronic Communications http://steeev.freehostia.com/wp/

 DISCLAIMER
 ==========

 Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
 i cannot be held responsible for anything bad that happens regarding usage of this script.

 INSTALLATION
 ============

 To install, you need FireFox  http://www.mozilla.org/firefox and 
 the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "picasaweb album export to flickr", and click Uninstall.


 DESCRIPTION
 ===========
 This script adds "Export 2 Flickr" links for each album on your picasaweb album pages
 clicking the "Export 2 Flickr" link sends all the photos in that album to your flickr account 
 You need to be logged into flickr and your picasaweb account simultaneously.
 A link is also added to the album organize page, where you can select individual images you want to upload by clicking the 
 thumbnails of the images you wish to export, then clicking the Export 2 Flickr link.


 ChangeLog
 =========
 13/6/08 v0.1  first working version of script created
 25/6/08 v0.2  added function that lets you choose which photos you want to export, you need to go the organize page for the
               album you wish to export from, to see the export to flickr link, select the images, then click the link to 
               upload them to flickr
 25/2/09 v0.3  upload button wasnt showing on album pages, this is now fixed. 
               added function to upload single image from single image display page
 14/3/09 v0.35 fixed logic, so export button works as expected when only a single image is displayed

 DONATE
 .................
 If you wish to thank me for all the work i have put into writing/testing/supporting this script,  
 and would like to support further updates and bug fixes, you can send me a few pounds/dollars/euros etc
 via PayPal, my paypal donation link is http://steeev.freehostia.com/donate/ 
 or else you might like to buy me something from my amazon wishlist http://www.amazon.co.uk/gp/registry/1LAD1VZGDF3XS :)

*/

(function() {
  unsafeWindow.serverURL='http://' + location.href.split('/')[2];
  unsafeWindow.photocounter=0;
  unsafeWindow.photostosend=0;
  unsafeWindow.timedelay = 2500;
  
  //alert(serverURL);

  function $x( xpath, root ) {
    var doc = root ? root.evaluate?root:root.ownerDocument : document;
    var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
    var result = [];
    while( next = got.iterateNext() )
      result.push( next );
    return result;
  }
 
  // check if user is logged into flickr 
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://flickr.com',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Content-type': 'application/x-www-form-urlencoded',
    },
    onload: function(responseDetails) {
      if (!responseDetails.responseText.match('global_auth_hash = ')) 
        unsafeWindow.flickrauth='';
      if(responseDetails.responseText.match("global_auth_hash = '")) {
        unsafeWindow.flickrauth=responseDetails.responseText.split("global_auth_hash = '")[1].split("'")[0];
        unsafeWindow.flickruserid=responseDetails.responseText.split("global_nsid = '")[1].split("'")[0];
      }
    }
  });

  
unsafeWindow.addEventListener("load", function() { unsafeWindow.do_onload_script(); }, false);


unsafeWindow.enableflickr = function () {

}

unsafeWindow.do_onload_script=function()
{
  if (location.href.split('\/').length==5) {
    flkli=document.createElement('span');
    flkli.setAttribute('id','exportflickrbutt');
    id= location.href.split('\/')[4];
    username=location.href.split('\/')[3];
        
    if(location.href.match(/\/lh\/reorder\?/))  {
      ulu=document.getElementById('lhid_sortmenu');
      flkli.innerHTML='&nbsp;<a onclick=\"exportSelectedPhotos();return false;\" href=\"javascript:;\"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG9SURBVHjaLMpBCgAQEEDRGXIWS%2BX4yjEcQxErKb6yeLunOeUgIhUTCwoLgw6Hgw2PiIby%2FzOuAGIBEjeA%2BC8Qq1x%2Fw%2BCx7QFnPweQY6Xw%2FYKhCEM6kHkeKs8seOXDdcnD78FGPncVvPBeQ6ANKP4AiG8CBBAj0EUgFxjMvcJwbtllQQZkEKX7Y36yzvdSIPOf4vz77xSXv0CRvx8pceF%2BomIRkHkGIICYgKaznn%2BBaQgILLvOYXj%2FBYMH540P8eiGgABQzEDw8It0oBlsAAHE8oPlh9K%2BJxwMOIDB8RcMS6yuv8clzyB55n34c1uB1wABxMLxh8OYgYETl7oPQCuOA%2BU%2FAdnhWFX84fgINOMpQACBYuahk8x3XAZdMZRgqPtgyFGBy6LnFpxLgfQmgAACGXQeGDsXojR%2FYKiKUv3xWlGE4e13FYHv90MlVqLLAwN743tLiS4g8x1AALFAxdqAsVOlJfDd4NgbiDetRL5%2FtJRh2A1kPgelLWDs5H3QEPwGDBNVIJ%2FnuQmnINCQaUD2YyB2Bgggxr3b9ooDGdLQRGePZOFraBriBWKQ3%2B8CsTA0UTJAE%2BU1qJwVQIABAI13lMuSRStxAAAAAElFTkSuQmCC"> Export 2 Flickr</a>';
    }
    else {
      ulu = document.getElementById('lhid_feedToolbar').firstChild.lastChild;
      flkli.innerHTML='&nbsp;<a onclick=\"exportSwitcher(this, \'' + username + '\',\'' + id + '\');return false;\" href=\"javascript:;\"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG9SURBVHjaLMpBCgAQEEDRGXIWS%2BX4yjEcQxErKb6yeLunOeUgIhUTCwoLgw6Hgw2PiIby%2FzOuAGIBEjeA%2BC8Qq1x%2Fw%2BCx7QFnPweQY6Xw%2FYKhCEM6kHkeKs8seOXDdcnD78FGPncVvPBeQ6ANKP4AiG8CBBAj0EUgFxjMvcJwbtllQQZkEKX7Y36yzvdSIPOf4vz77xSXv0CRvx8pceF%2BomIRkHkGIICYgKaznn%2BBaQgILLvOYXj%2FBYMH540P8eiGgABQzEDw8It0oBlsAAHE8oPlh9K%2BJxwMOIDB8RcMS6yuv8clzyB55n34c1uB1wABxMLxh8OYgYETl7oPQCuOA%2BU%2FAdnhWFX84fgINOMpQACBYuahk8x3XAZdMZRgqPtgyFGBy6LnFpxLgfQmgAACGXQeGDsXojR%2FYKiKUv3xWlGE4e13FYHv90MlVqLLAwN743tLiS4g8x1AALFAxdqAsVOlJfDd4NgbiDetRL5%2FtJRh2A1kPgelLWDs5H3QEPwGDBNVIJ%2FnuQmnINCQaUD2YyB2Bgggxr3b9ooDGdLQRGePZOFraBriBWKQ3%2B8CsTA0UTJAE%2BU1qJwVQIABAI13lMuSRStxAAAAAElFTkSuQmCC"> Export 2 Flickr</a>';
    }

    if(!ulu) {
      //alert('no ulu');
      return;
    }
      
    ulu.parentNode.insertBefore(flkli, ulu.nextSibling);
    
  }
 
}

unsafeWindow.parse_album_photos = function( response)
{
  function checkForParseError (xmlDocument) {
    var errorNamespace ='http://www.mozilla.org/newlayout/xml/parsererror.xml';
    var documentElement = xmlDocument.documentElement;
    var parseError = { errorCode : 0 };
    if (documentElement.nodeName == 'parsererror' && documentElement.namespaceURI == errorNamespace) {
      parseError.errorCode = 1;
      var sourceText = documentElement.getElementsByTagNameNS(errorNamespace, 'sourcetext')[0];
      if (sourceText != null) 
        parseError.srcText = sourceText.firstChild.data;
      parseError.reason = documentElement.firstChild.data;
    }
    return parseError;
  }

  try
    {
    var parser = new DOMParser();
    var xml = parser.parseFromString(response, "application/xml");
    }
  catch(e) {alert('exception caught: ' + e.message)}
  
    parseError = checkForParseError(xml);
    if (parseError.errorCode == 0) {
      ;// feed is fine so do nothing 
    }
    else {
      //alert('parse error=' + parseError.reason + '\r\n' + parseError.srcText);
      document.getElementById('group_'+groupNameID).innerHTML = 'Error retrieving image feed';
      return;
    }

      var entries = xml.getElementsByTagName('content');
      if (entries.item(0)==null) {
        return;
      }
      imagesA=[];
      for(var p=0;p<entries.length;p++) {
        if (entries.item(p)==null)
          return;
        imagesA[p] = entries.item(p).getAttribute('src') ;
      }
    
    unsafeWindow.photostosend=imagesA.length;
    if (confirm('You are about to export this whole album of ' + unsafeWindow.photostosend + ' images\n\nThe transfer process might take a few minutes, please be patient...')) {
      document.getElementById('flickruploadstatus').innerHTML='<img src="http://flickr.com/images/pulser2.gif">';
      for (i=0;i<imagesA.length;i++) {
        unsafeWindow.sendphototoflickr(imagesA[i],'',unsafeWindow.timedelay*i);
      }
    }     
}

renameflickrphoto = function(photoid,title) {
 apiurl="http://api.flickr.com/services/rest/";
 GM_xmlhttpRequest({
    method: 'POST',
    url: apiurl,
    data: "method=flickr.photos.setMeta&api_key=f8f288742b1bf1bfcf29eb5ef0ae038b&photo_id=" + photoid + "&description=&title=" + title + '&auth_hash=' + unsafeWindow.flickrauth,
    onload: function(responseDetails) { 
      flickrtitle=responseDetails.responseText.split('title="')[1].split('"')[0];
      if(responseDetails.responseText.match('ok'))
        ;
      }
    });
}

checkflickrfilename = function (imagefilename,title) {
  apiurl="http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=f8f288742b1bf1bfcf29eb5ef0ae038b&per_page=1&user_id=" + unsafeWindow.flickruserid;
    GM_xmlhttpRequest({
    method: 'GET',
    url: apiurl,
    data: '',
    onload: function(responseDetails) { 
      document.getElementById('flickruploadstatus').innerHTML+=responseDetails.responseText;
      flickrtitle=responseDetails.responseText.split('title="')[1].split('"')[0];
      flickrphotoid=responseDetails.responseText.split('photo id="')[1].split('"')[0];
      if(imagefilename==flickrtitle)
        renameflickrphoto(flickrphotoid,title);
      }
    });

}

unsafeWindow.sendphototoflickr=function(url, title, tdelay) {
 if (!tdelay)
   tdelay=0;
 imagefilename=url.split('/')[3].split('\.')[0];
 //alert(imagefilename);
 window.setTimeout(function() {
  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://www.flickr.com/tools/sendto_upload.gne',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/atom+xml,application/xml,text/xml',
      'Referer': 'http://flickr.com/',
      },
      data: 'url=' + escape(url) + '&magic_cookie=' + unsafeWindow.flickrauth,
      onload: function(responseDetails) {
        document.getElementById('flickruploadstatus').innerHTML+=responseDetails.responseText;
        if (responseDetails.responseText.match('Photo or Video uploaded!')){
          document.getElementById('flickruploadstatus').innerHTML='Photo ' + unsafeWindow.photocounter + '/' + unsafeWindow.photostosend + ' Uploaded to Flickr.';
          //temporarily commented out, the renaming part of the code, as it doesnt work....
          //checkflickrfilename(imagefilename,title);
        }
        unsafeWindow.photocounter++;
        if(unsafeWindow.photocounter==unsafeWindow.photostosend) {
          document.getElementById('flickruploadstatus').innerHTML='Photo ' + unsafeWindow.photocounter + '/' + unsafeWindow.photostosend + ' Uploaded to Flickr.';
	        alert('Image Transfer Process Complete!' );
	        unsafeWindow.photocounter=0;
        }

      }
    });
 } , tdelay );// end settimeout;

}

unsafeWindow.exportSelectedPhotos = function (button) {

  if(!unsafeWindow.flickrauth) {
    alert('You need to be logged into flickr first. Log into flickr then reload this page');
    return;
  }
  if(!document.getElementById('flickruploadstatus')) {
    uploadstatusdiv=document.createElement('div');
    uploadstatusdiv.setAttribute('id','flickruploadstatus');
    document.getElementById('exportflickrbutt').parentNode.appendChild(uploadstatusdiv);
  }
  
  $x('//div[@class="lhcl_selectBox"][@style=""]');
  selectedImagesA=$x('//div[@class="lhcl_selectBox"][@style=""]');
  if(!selectedImagesA.length) {
    alert('First, you need to select the images you want to export to flickr');
    return false;
  }
  unsafeWindow.photostosend=selectedImagesA.length;
  
  counter=0;
  if (confirm('You are about to export ' + selectedImagesA.length + ' images to Flickr')) {
    document.getElementById('flickruploadstatus').innerHTML='<img src="http://flickr.com/images/pulser2.gif">'; 
    for (i in selectedImagesA) {
      //alert(selectedImagesA[i].parentNode.style.backgroundImage.split(/url\(/)[1].split(/\?/)[0]);
      counter++;
      unsafeWindow.sendphototoflickr(selectedImagesA[i].parentNode.style.backgroundImage.split(/url\(/)[1].split(/\?/)[0],'',(unsafeWindow.timedelay * counter));
      //window.setTimeout("unsafeWindow.sendphototoflickr(selectedImagesA[" + i + "].parentNode.style.backgroundImage.split(/url\(/)[1].split(/\\?/)[0])", delay);
      //window.setTimeout("alert('http:'+selectedImagesA[" + i + "].parentNode.style.backgroundImage.split(/http\:/)[1].split(/\?/)[0])", delay);
    }  
  }
}

unsafeWindow.exportSwitcher = function(linknode, username, id) {

  if(!unsafeWindow.flickrauth) {
    alert('You need to be logged into flickr first. Log into flickr then reload this page');
    return;
  }
  
  if (location.href.split('#')[1].match(/[0-9]+/))
    unsafeWindow.exportsinglephoto(linknode,username,id );
  else
    unsafeWindow.exportalbum(linknode,username,id );
}

unsafeWindow.exportsinglephoto = function(linknode, username, id) {
  
  if (!confirm('Are you sure you want to export this image to Flickr?'))
    return;
    
    
  if(!document.getElementById('flickruploadstatus')) {
    uploadstatusdiv=document.createElement('div');
    uploadstatusdiv.setAttribute('id','flickruploadstatus');
    //uploadstatusdiv.style.align='center';
    linknode.parentNode.appendChild(uploadstatusdiv);
  }
  
  document.getElementById('flickruploadstatus').innerHTML='<img src="http://flickr.com/images/pulser2.gif">'; 
  
  imgArr=document.getElementById('lhid_content').getElementsByTagName('img');
  theimgurl=imgArr[0].getAttribute('src').replace('\/s512\/','\/')
  //alert(imgArr[0].getAttribute('src'));
  unsafeWindow.photostosend=1;
  unsafeWindow.sendphototoflickr(theimgurl,'',0);
}


unsafeWindow.exportalbum =function(linknode, username, id) {

  if(!document.getElementById('flickruploadstatus')) {
    uploadstatusdiv=document.createElement('div');
    uploadstatusdiv.setAttribute('id','flickruploadstatus');
    linknode.parentNode.appendChild(uploadstatusdiv);
  }

  var xmlHttpReq = false;
  
  apiurl="http://picasaweb.google.com/data/feed/api/user/" + username + "/album/" + id + "?kind=photo";
  xmlHttpReq = new XMLHttpRequest(); 
  xmlHttpReq.open('GET',  apiurl);
  xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlHttpReq.onreadystatechange = function() {
  if (xmlHttpReq.readyState == 4) {
    if (xmlHttpReq.status == 200) {
      unsafeWindow.parse_album_photos(xmlHttpReq.responseText);
      } else {
	        alert("There was a problem retrieving the web page:\n" + xmlHttpReq.statusText);
      }
    }
  }
  xmlHttpReq.send('');
}

})();