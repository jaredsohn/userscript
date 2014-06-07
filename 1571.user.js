// ==UserScript==
// @name          Photobox export to flickr
// @description	  Lets you export your photos from your photobox.co.uk account into your flickr account
// @author        Stephen Fernandez http://steeev.freehostia.com/
// @namespace     http://steeev.freehostia.com/flickr
// @include       http://www.photobox.co.uk/my/albums
// @include       http://www.photobox.co.uk/my
// @include       http://photobox.co.uk/my/albums/
// @include       http://photobox.co.uk/my/
// @include       http://www.photobox.co.uk/my/album?*
// @include       http://photobox.co.uk/my/album?*
// @version       0.72  (06/03/2009)
// ==/UserScript==
/* --------------------------------------------------------------------

(c) 2008 Stephen Fernandez - Excellatronic Communications

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
 select "Photobox export to flickr", and click Uninstall.


 DESCRIPTION
 ===========
 This script adds "Export Album to Flickr" links for each album on your photobox albums page
 clicking the "Export Album to Flickr" link sends all the photos in that album to your flickr account 
 You need to be logged into flickr and your photobox account simultaneously.
 A link is also added to individual album pages, where you can select the images you want to upload using the checkboxes
 then click the export to flickr link


 ChangeLog
 =========
 28/04/06 updated script to work with GM 0.6.4 + FF 1.5
 06/06/08 updated script to work with new site layout
 06/03/09 fixed wrong number of images in album detected

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
  unsafeWindow.timedelay=3000;
  //alert(serverURL);

  function $x( xpath, root ) {
    var doc = root ? root.evaluate?root:root.ownerDocument : document;
    var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
    var result = [];
    while( next = got.iterateNext() )
      result.push( next );
    return result;
  }
 
 _getElementsByClassName = function(class_name) {
    var docList = document.all || document.getElementsByTagName('*');
    var matchArray = new Array();

    /*Create a regular expression object for class*/
    var re = new RegExp("(?:^|\\s)"+class_name+"(?:\\s|$)");
    for (var i = 0; i < docList.length; i++) {
        if (re.test(docList[i].className) ) {
            matchArray[matchArray.length] = docList[i];
        }
    }

	return matchArray;
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


delay = function(ms)
{
    date = new Date();
    curDate = null;
    do { var curDate = new Date(); }
    while ( curDate - date < ms);
}


unsafeWindow.enableflickr = function () {

}

unsafeWindow.do_onload_script=function()
{
  if (location.href.match(/photobox\.co\.uk\/my\/album\?/)) {
    
    //document.getElementById('pbx_toolbar_actions').innerHTML+='&nbsp;<a onclick=\"exportalbum(this, ' + location.href.split('album_id=\?')[1].split('&')[0] + ');return false;\" href=\"javascript:;\"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG9SURBVHjaLMpBCgAQEEDRGXIWS%2BX4yjEcQxErKb6yeLunOeUgIhUTCwoLgw6Hgw2PiIby%2FzOuAGIBEjeA%2BC8Qq1x%2Fw%2BCx7QFnPweQY6Xw%2FYKhCEM6kHkeKs8seOXDdcnD78FGPncVvPBeQ6ANKP4AiG8CBBAj0EUgFxjMvcJwbtllQQZkEKX7Y36yzvdSIPOf4vz77xSXv0CRvx8pceF%2BomIRkHkGIICYgKaznn%2BBaQgILLvOYXj%2FBYMH540P8eiGgABQzEDw8It0oBlsAAHE8oPlh9K%2BJxwMOIDB8RcMS6yuv8clzyB55n34c1uB1wABxMLxh8OYgYETl7oPQCuOA%2BU%2FAdnhWFX84fgINOMpQACBYuahk8x3XAZdMZRgqPtgyFGBy6LnFpxLgfQmgAACGXQeGDsXojR%2FYKiKUv3xWlGE4e13FYHv90MlVqLLAwN743tLiS4g8x1AALFAxdqAsVOlJfDd4NgbiDetRL5%2FtJRh2A1kPgelLWDs5H3QEPwGDBNVIJ%2FnuQmnINCQaUD2YyB2Bgggxr3b9ooDGdLQRGePZOFraBriBWKQ3%2B8CsTA0UTJAE%2BU1qJwVQIABAI13lMuSRStxAAAAAElFTkSuQmCC"> Export 2 Flickr</a>'
    flkli=document.createElement('p');
    id= location.href.split('\?album_id=')[1].split('&')[0];
    flkli.innerHTML='&nbsp;<a onclick=\"exportalbum(this, ' + id + ');return false;\" href=\"javascript:;\"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG9SURBVHjaLMpBCgAQEEDRGXIWS%2BX4yjEcQxErKb6yeLunOeUgIhUTCwoLgw6Hgw2PiIby%2FzOuAGIBEjeA%2BC8Qq1x%2Fw%2BCx7QFnPweQY6Xw%2FYKhCEM6kHkeKs8seOXDdcnD78FGPncVvPBeQ6ANKP4AiG8CBBAj0EUgFxjMvcJwbtllQQZkEKX7Y36yzvdSIPOf4vz77xSXv0CRvx8pceF%2BomIRkHkGIICYgKaznn%2BBaQgILLvOYXj%2FBYMH540P8eiGgABQzEDw8It0oBlsAAHE8oPlh9K%2BJxwMOIDB8RcMS6yuv8clzyB55n34c1uB1wABxMLxh8OYgYETl7oPQCuOA%2BU%2FAdnhWFX84fgINOMpQACBYuahk8x3XAZdMZRgqPtgyFGBy6LnFpxLgfQmgAACGXQeGDsXojR%2FYKiKUv3xWlGE4e13FYHv90MlVqLLAwN743tLiS4g8x1AALFAxdqAsVOlJfDd4NgbiDetRL5%2FtJRh2A1kPgelLWDs5H3QEPwGDBNVIJ%2FnuQmnINCQaUD2YyB2Bgggxr3b9ooDGdLQRGePZOFraBriBWKQ3%2B8CsTA0UTJAE%2BU1qJwVQIABAI13lMuSRStxAAAAAElFTkSuQmCC"> Export 2 Flickr</a>';
    ulu = _getElementsByClassName("pbx_options_inside")[0].getElementsByTagName('ul')[0];
    ulu.parentNode.insertBefore(flkli, ulu.nextSibling);
  }
  else {
    allalb=document.getElementById('pbx_all_albums');
    if(!allalb)
      allalb=document.getElementById('pbx_recent_albums');
    unsafeWindow.alla=allalb.getElementsByTagName('a');
    //console.log(unsafeWindow.alla);
    for (i in unsafeWindow.alla) {
      var tmplink=unsafeWindow.alla[i].textContent;
      if (tmplink.match(/Share/) || tmplink.match(/This is a Shared Album/) || unsafeWindow.alla[i].href.match(/\/album\/share\?album_id/)) {
        //alert('we found one');
        id=unsafeWindow.alla[i].getAttribute("href").split('\?album_id=')[1].split('&')[0]; 
        unsafeWindow.alla[i].parentNode.innerHTML=unsafeWindow.alla[i].parentNode.innerHTML+'&nbsp;&nbsp;<a onclick=\"exportalbum(this, ' + id + ');return false;\" href=\"javascript:;\"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAKCAYAAAC5Sw6hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG9SURBVHjaLMpBCgAQEEDRGXIWS%2BX4yjEcQxErKb6yeLunOeUgIhUTCwoLgw6Hgw2PiIby%2FzOuAGIBEjeA%2BC8Qq1x%2Fw%2BCx7QFnPweQY6Xw%2FYKhCEM6kHkeKs8seOXDdcnD78FGPncVvPBeQ6ANKP4AiG8CBBAj0EUgFxjMvcJwbtllQQZkEKX7Y36yzvdSIPOf4vz77xSXv0CRvx8pceF%2BomIRkHkGIICYgKaznn%2BBaQgILLvOYXj%2FBYMH540P8eiGgABQzEDw8It0oBlsAAHE8oPlh9K%2BJxwMOIDB8RcMS6yuv8clzyB55n34c1uB1wABxMLxh8OYgYETl7oPQCuOA%2BU%2FAdnhWFX84fgINOMpQACBYuahk8x3XAZdMZRgqPtgyFGBy6LnFpxLgfQmgAACGXQeGDsXojR%2FYKiKUv3xWlGE4e13FYHv90MlVqLLAwN743tLiS4g8x1AALFAxdqAsVOlJfDd4NgbiDetRL5%2FtJRh2A1kPgelLWDs5H3QEPwGDBNVIJ%2FnuQmnINCQaUD2YyB2Bgggxr3b9ooDGdLQRGePZOFraBriBWKQ3%2B8CsTA0UTJAE%2BU1qJwVQIABAI13lMuSRStxAAAAAElFTkSuQmCC"> Export 2 Flickr</a>';
      }
    }
  }// end else
}


unsafeWindow.displaylist= function(rsp) {
  //alert(rsp);
  var idlist='';
  if(rsp.match('<div')) {
    var tmpidarr=rsp.split('<div id=\"pbx_photo_');
    //alert('This album has: ' + (idarr.length)-1) + ' images in it.';
    for (a=1;a<tmpidarr.length;a++) {
      tmpid=tmpidarr[a].split('"')[0];
      if(parseInt(tmpid))
        idlist+=tmpid+'\n';
    }
  }
  else
    idlist=rsp;
    
  //alert(idlist);
  idarr=idlist.split("\n");
  unsafeWindow.photostosend=idarr.length-1;
  
  if(!confirm('You are about to export ' + unsafeWindow.photostosend + ' images\n\nThe transfer process might take a few minutes, please be patient...'))
    return false;
  
  document.getElementById('flickruploadstatus').innerHTML='<img src="http://flickr.com/images/pulser2.gif">';
  
  for (a=0;a<idarr.length-1;a++) {
    if(idarr[a]!='') {
      unsafeWindow.getimageurl( unsafeWindow.serverURL + '/my/photo/full?photo_id=' + idarr[a], unsafeWindow.timedelay*a );
      //http://www.photobox.co.uk/my/photo/full?photo_id=1696131231
      //delay(1000);
      //delay(1000);
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

unsafeWindow.sendphototoflickr=function(url, title, timedelay) {
 imagefilename=url.split('/')[3].split('\.')[0];
 //alert(imagefilename);
 window.setTimeout(function(timedelay) {
  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://www.flickr.com/tools/sendto_upload.gne',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Content-type': 'application/x-www-form-urlencoded',
      'Accept': 'application/atom+xml,application/xml,text/xml',
      'Referer': 'http://flickr.com/messages_write.gne',
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
 } , timedelay );// end settimeout;

}

unsafeWindow.getimageurl=function(url, tdelay) {
  var xmlHttpReq = false;
  xmlHttpReq = new XMLHttpRequest();
  //xmlHttpReq.overrideMimeType('text/xml');
  xmlHttpReq.open('GET', url, true);
  xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlHttpReq.onreadystatechange = function() {
  if (xmlHttpReq.readyState == 4) {
    if (xmlHttpReq.status == 200) {
      purl=xmlHttpReq.responseText.split(/<img/)[1].split(/src=\"/)[1].split(/\"/)[0];
      title=xmlHttpReq.responseText.split(/Original Photo: /i)[1].split(/\n/)[0];
      document.getElementsByTagName('body')[0].innerHTML+=url + ' ' +  purl + ' ' + title + '<br>';
      //alert(purl);
      unsafeWindow.sendphototoflickr(purl,title, tdelay)
      } else {
        alert("There was a problem retrieving the web page:\n" + xmlHttpReq.statusText);
      }
    }
  }
  xmlHttpReq.send('');
}

unsafeWindow.exportalbum =function(linknode, id)
  {
  if(!unsafeWindow.flickrauth) {
    alert('You need to be logged into flickr first. Log into flickr then reload this page');
    return;
  }
  if(!document.getElementById('flickruploadstatus')) {
    uploadstatusdiv=document.createElement('div');
    uploadstatusdiv.setAttribute('id','flickruploadstatus');
    linknode.parentNode.appendChild(uploadstatusdiv);
  }
  
  if (document.location.href.match(/\/my\/album\?/) ) {
     selimageA=$x('//div[@class="pbx_thumb pbx_selected"]');
     if(selimageA.length) {
       idlist='';
       for (j in selimageA)
         idlist+=selimageA[j].getAttribute('id').split(/pbx_photo_/)[1]+'\n';
       unsafeWindow.displaylist(idlist);
       return;
     }
         
  }
  
  var xmlHttpReq = false;
  xmlHttpReq = new XMLHttpRequest();
  //xmlHttpReq.overrideMimeType('text/xml');
  //xmlHttpReq.open('GET',  unsafeWindow.serverURL + '/album/album_contact.html?c_album=' + id + '&page=all', true);
  xmlHttpReq.open('GET',  unsafeWindow.serverURL + '/my/album?album_id=' + id ,true);// '&page=all', true);
  xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlHttpReq.onreadystatechange = function() {
  if (xmlHttpReq.readyState == 4) {
    if (xmlHttpReq.status == 200) {
      unsafeWindow.displaylist(xmlHttpReq.responseText);
      } else {
	        alert("There was a problem retrieving the web page:\n" + xmlHttpReq.statusText);
      }
    }
  }
  xmlHttpReq.send('');
}

})();