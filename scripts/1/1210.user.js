// ==UserScript==
// @name           Geotag Flickr with Multimap
// @author         Stephen Fernandez http://steeev.freehostia.com/flickr   http://flickr.com/steeev
// @namespace      http://steeev.freehostia.com/flickr/
// @description    Script lets you geotag your Flickr Images with Multimap.com
// @include        http://flickr.com/photos/organize/
// @include        http://www.flickr.com/photos/organize
// @include        http://flickr.com/photos/organize/
// @include        http://www.flickr.com/photos/organize
// @include        http://flickr.com/photos/*
// @include        http://www.flickr.com/photos/*
// @include        https://multimap.com/*
// @include        https://www.multimap.com/*
// @include        http://multimap.com/*
// @include        http://www.multimap.com/*
// @version        2.1 - 26-Jun-2008
// ==/UserScript==

/*

(C) 2008 Stephen Fernandez

DISCLAIMER
----------

Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
i cannot be held responsible for anything bad that happens regarding usage of this script.
 
INSTALLATION
------------
This is a greasemonkey script, to run it you need to have the firefox web browser: http://mozilla.org/firefox
with the greasemonkey extension installed: http://greasespot.net 
If you visit this script in firefox and have the gm extension enabled, you will be able to install the script.

To uninstall, go to the greasemonkey scripts manager, select "Geotag Flickr With Multimap" and click the uninstall button

USAGE
-----

You can geotag single images by clicking the geotag this image with multimap link besides your photo.
or you can geotag batches of images from flickr's organizer: first select the batch of photos you wish to geotag
then click the "Location" menu, then select "geotag with multimap", then follow the instructions given.

HISTORY
-------
0.7 02/05/06
0.8 31/08/06 merged the 2 separate scripts into a single one for simplicitys sake
0.9 16/09/06 switched to using flickr geo api calls
2.0 22/06/08 rewrote the script from scratch over the weekend for Mashed 08 event at alexandra palace

*/

if (location.href.match(/multimap\.com/)) {

var flickrdots="data:image/gif;base64,R0lGODlhEAAQACIAACH5BAEAAAAALAAAAAAQABAAogEAAP8AhABjyABlyf8Ag%2FgDhhZbwgAAAAMvCLrc%2FjDKKapgIYdl61CElgGdZxShGJTCcKYi66LqWs6wRnYfkG%2BKDkY3KRqPyAQAOw%3D%3D";

  function $x( xpath, root ) {
    var doc = root ? root.evaluate?root:root.ownerDocument : document;
    var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
    var result = [];
    while( next = got.iterateNext() )
      result.push( next );
    return result;
  }

unsafeWindow.geotagFlickrImages = function() {
  // these vals arent always accurate, for instance after we call and follow the link from the link function
  //piclon=unsafeWindow.MMWCore.LocationSearch.current_location.coords.lon;
  //piclat=unsafeWindow.MMWCore.LocationSearch.current_location.coords.lat;

  piclat=$x("//span[@class='latitude']")[0].textContent;
  piclon=$x("//span[@class='longitude']")[0].textContent;
  //alert(piclat + ' ' + piclon);
  if(piclon=='' || piclat=='') {
    alert('Wait a second or 2, then click the geotag button again, as the coordinates have not yet been calculated');
    document.getElementById('geotagflickrbutton').setAttribute('onclick','geotagFlickrImages();this.setAttribute("onclick",null);return false;');
    return false;
  }

  photo_ids=unsafeWindow.picidsetc.split('|')[0];
  photo_ids=photo_ids.replace(/\,$/,""); 
  photo_ids=photo_ids.replace(/\,/,"%2C")
  
  auth_hash=unsafeWindow.picidsetc.split('|')[1];
  oldlocation=unsafeWindow.picidsetc.split('|')[2];
  apikey=unsafeWindow.picidsetc.split('|')[3];
  
  url="http://www.flickr.com/services/rest/" 
  pdata= "lat=" + piclat + "&lon=" + piclon + "&accuracy=16&photo_ids=" + photo_ids + "&method=flickr.photos.geo.setLocation&src=js&api_key=" + apikey + "&auth_hash=" + auth_hash; 
  
  //alert(piclat + ' ' + piclon);
  //return false;
  
  window.setTimeout(function() { GM_xmlhttpRequest({
    method: 'POST',
    url: url,
    headers: {
             'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey / Geotag With Multimap',
             'Accept': 'application/atom+xml,application/xml,text/xml',
             'Content-type': 'application/x-www-form-urlencoded',
             'Referer': 'http://www.flickr.com/photos/organize/'
             },
    data: pdata,
    onload: function(responseDetails) 
           {
           if(responseDetails.responseText.match(/rsp stat\=\"ok\"/))
             alert('GeoTags added.\n\nNow returning to Flickr...');
           else
             alert('Error adding Geotags: Reason : \n\n'  + responseDetails.responseText );
             
           location.href='http://www.flickr.com' + oldlocation;
           //http://www.flickr.com/photos/organize/?ids=2607485174,2607485644
           //http://www.flickr.com/photos/organize/?batch_geotag=1&ids=178234341
           }
  }); } , 0 );
  
  return false;
}
  

}
  if (location.href.match(/\?geotagflickr/))
    {
    
    div2insert=document.createElement('div');
    div2insert.style.fontSize='17px';
    div2insert.style.color='white';
    div2insert.style.fontFamily='Helvetica Neue,Helvetica,Arial';
    div2insert.style.fontWeight='bold';    
    div2insert.innerHTML="Now, using the search box locate the place the photo was taken, then click the 'GeoTag Flickr Image/s' button.<br>";
    
    mapinpoint=$x('//label[@for="location"]')[0];
    mapinpoint.style.display='none';
    mapinpoint.parentNode.insertBefore(div2insert, mapinpoint);
    }
    
if (location.href.match(/multimap\.com\/maps\//)) {
  
  unsafeWindow.picidsetc=GM_getValue('picidsetc');
  
  document.getElementById('header').style.display='none'; // enlarge the map
  document.getElementById('under_map').style.display='none';
  document.getElementById('mpu').style.display='none'; 
  
  thenavbar=document.getElementById('mainNav');
  flickrli=document.createElement('li');
  geotagflickr=document.createElement('a');
  geotagflickr.setAttribute('id','geotagflickrbutton');
  geotagflickr.innerHTML='<img style="vertical-align:middle" src="' + flickrdots + '"> Geotag Flickr Image/s';
  geotagflickr.href='javascript:;';

  geotagflickr.title='Locate the position on the map that the photo was taken then click this button to geotag your flickr image/s';
  geotagflickr.setAttribute('onclick','geotagFlickrImages();this.setAttribute("onclick",null);return false;');
  geotagflickr.setAttribute('style','padding-bottom:2px !important');
  document.getElementById('header').style.display='none !imortant';
  
  flickrli.appendChild(geotagflickr);
  
  thenavbar.appendChild(flickrli);
  
}

if (location.href.match(/flickr\.com/)) {
  unsafeWindow.sendtomultimap=function (picidsetc) {
    if(picidsetc) {
      if(location.href.match(/\/organize/))
        currentlocation='http://flickr.com/photos/organize/' + '?ids=' + picidsetc;
      else
        currentlocation=location.href;
        
      currentlocation=encodeURI(currentlocation.replace('http://www.flickr.com','').replace('http://flickr.com',''));
      
      window.setTimeout(function() { GM_setValue('picidsetc',picidsetc + '|' + unsafeWindow.global_auth_hash + '|' + currentlocation + '|' + unsafeWindow.global_magisterLudi); }, 0 );
      alert('You will now be redirected to MultiMap.com where you need to locate the position on the map map that you took the photos, then click the "Add Geotags" button.');
      location.href="http://www.multimap.com/?geotagflickr";
      
    }
  }
}
if (location.href.match(/flickr\.com\/photos\/organize/)) {

  unsafeWindow.getbatchids = function() {
    bidlist='';
    bdiv=document.getElementById('batch_photos_div')
    if(bdiv) {
      bphotos=unsafeWindow.Y.U.Dom.getElementsByClassName('batch_photo');
      if (bphotos.length)
        for(i in bphotos)
          bidlist+=bphotos[i].getAttribute('id').split('batch_photo')[1]+',';     
    }
    if (bidlist)
      return bidlist;
    else {
      alert("You need to drag some images to the batch editor first");
      return null;
    }
  }

  // we gonna add a "geotag with multimap" as a submenu item of "Location"
  locmenu=document.getElementById('candy_menu_o_location');

  geommlink=document.createElement('a');
  geommlink.textContent='Geotag with Multimap';
  geommlink.setAttribute('onClick','sendtomultimap(getbatchids())');
  locmenu.appendChild(geommlink);

}
else if (location.href.match(/flickr\.com\/photos\//)) {

  unsafeWindow.blurbflag=0;


 unsafeWindow.displaylocationfield = function()
  {
  if (unsafeWindow.blurbflag==0)
    {
    document.getElementById('tagadderlink').innerHTML+="<p><font color='red'>You will now be redirected to MultiMap.com where you should locate the position the photo was taken and then click the \"Add GeoTags\" Link above the Map.</font></p>";
    unsafeWindow.blurbflag=1;
    sfhaharr= location.href.split('/');
    unsafeWindow.ps_photo_id=sfhaharr[5];
    unsafeWindow.currLoc=location.href.replace('http://www.flickr.com','').replace('http://flickr.com','');
    //alert(unsafeWindow.currLoc);
    window.setTimeout(function() { GM_setValue('picidsetc',unsafeWindow.ps_photo_id + '|' + unsafeWindow.global_auth_hash + '|' + encodeURI(unsafeWindow.currLoc) + '|' + unsafeWindow.global_magisterLudi ); } , 0 );
    //alert('You will now be redirected to MultiMap.com where you need to locate the position on the map where you took the photo, then click the "Add Geotags" button located above the map.');
    setTimeout("location.href='http://www.multimap.com/?geotagflickr'",1200);
    }
  return false;
  }


 var bagtagger=document.getElementById('tagadderlink');
 if ((bagtagger!= null) && bagtagger.innerHTML) 
	 bagtagger.innerHTML+=" | <a title='Add GeoTags via MultiMap.com' style=\"text-decoration: none;\" href='' onclick='displaylocationfield();return false;' >GeoTag via MultiMap.com</a>";


} // end if we are on a photo page

