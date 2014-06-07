/*
// ==UserScript==
// @author	  Stephen Fernandez http://steeev.freehostia.com  http://flickr.com/steeev
// @name          GeoTag Flickr via streetmap.co.uk
// @description	  Lets you geotag your flickr photos via streetmap.co.uk
// @namespace     http://steeev.f2o.org/flickr/
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @include       http://flickr.com/photos/organize/
// @include       http://www.flickr.com/photos/organize
// @include       http://flickr.com/photos/organize/
// @include       http://www.flickr.com/photos/organize
// @include       http://www.streetmap.co.uk/*
// @include       http://streetmap.co.uk/*
// @version 0.95 [ 11th March 2009 ]

///////////////////////////////////

 This is a Greasemonkey user script.
 In order to use it, you need to be using the Firefox web browser, with the Greasemonkey extension installed

///////////////////////////////////


History
=======
03-July-2006 v0.6 merged the 2 smuk gm scripts into a single script, and also fixed the geotagger code so it no longer needs to rely on my server
16-Sept-2006 v0.7 updated script to use Flickr's GeoAPI calls
20-May-2008  v0.8 fixed script, so it works again with latest version of GM + FF
11-Mar-2009  v0.9 fixed script to work with site redesign, batch tagging will come back in the next version
*/


// ==/UserScript==

if (location.href.match(/streetmap\.co\.uk/)) {
(function() {

unsafeWindow.checkcookieexist=function()
{
  acookie=unsafeWindow.readCookie('sfpid');
  //alert(acookie);
  //alert(typeof(acookie));
  if ((typeof(acookie) !='undefined') && (acookie != '') && (acookie != null))
    ;//document.addcomment.geobloggers.value=acookie;
  else
    ;//document.addcomment.geobloggers.value=geobloggerslink;
}

unsafeWindow.createCookie = function(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/; domain=streetmap.co.uk";
}

unsafeWindow.readCookie = function(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

unsafeWindow.geotagging = function() {
 if(location.href.match('\/map.srf\?')) {
  var flickrdots="data:image/gif;base64,R0lGODlhEAAQACIAACH5BAEAAAAALAAAAAAQABAAogEAAP8AhABjyABlyf8Ag%2FgDhhZbwgAAAAMvCLrc%2FjDKKapgIYdl61CElgGdZxShGJTCcKYi66LqWs6wRnYfkG%2BKDkY3KRqPyAQAOw%3D%3D";
  insertstuff  ='<div align="center" style="border:solid:1px"><a title="Add GeoTags to your Flickr Image" href="javascript:latlon(\'' + location.href + '\',' + '\'addgeotags\'' + ');">Add GeoTags <img src="' + flickrdots + '"></a>';
  insertstuff +=' | <a title="Check Flickr.com for geotagged images in the local area" href="javascript:latlon(\'' + location.href + '\',' + '\'checkgeotags\'' + ');">Check Area for GeoTagged Flickr Images</a>'; //this.href=\'latlon(\'' + location.href + '\',' + '\'checkgeotags\'' +');
  insertstuff +=' | <A title="Display Longitude and Latitude" href="javascript:latlon(\'' + location.href + '\',' + '\'showlatlon\'' + ');"">Show Lat + Lon</a>';
  insertstuff +='<br/><span id="splatlon" align="center" style="background-color:white"></span><br/></div>';
  condiv=document.createElement('div');
  condiv.innerHTML=insertstuff;
  smapdiv=document.getElementById('content_wrapper');
  smapdiv.parentNode.insertBefore(condiv, smapdiv.nextSibling);
 }
}


if (document.getElementById('content_wrapper'))
 {
 window.addEventListener("load", function() { unsafeWindow.geotagging() }, false);

 if (location.href.split('?') && location.href.split('?')[1].match(/sfpid/))
  {
  sfpidbeg=location.href.indexOf('sfpid=')+6;
  sfpidend=location.href.indexOf('&',sfpidbeg);
  sfpid=location.href.substr(sfpidbeg,sfpidend-sfpidbeg);
  unsafeWindow.createCookie('sfpid',sfpid,1);
  //alert(sfpid);

  sfpnmbeg=location.href.indexOf('sfpnm=')+6;
  sfpnmend=location.href.length;
  sfpnm=location.href.substr(sfpnmbeg,sfpnmend-sfpnmbeg);
  unsafeWindow.createCookie('sfpnm',sfpnm,1);
  //alert(sfpnm);
  parent.top.location.href='http://streetmap.co.uk/newsearch.srf?mapp=newmap&searchp=newsearch&Submit1=search&type=PostCode&name=' + sfpnm;
  }
}

unsafeWindow.smukaddgeotags=function(lat,lon) {

  tags='geotagged%20geo:lat=' + lat.replace(' ','') + '%20geo:lon=' + lon.replace(' ','');
  auth_hash=unsafeWindow.readCookie('sfpid').split('%7C')[1];
  photo_id=unsafeWindow.readCookie('sfpid').split('%7C')[0];
  oldlocation=unsafeWindow.readCookie('sfpid').split('%7C')[2];
  //alert(auth_hash + ' X ' + photo_id);
 
  // old way to add geotags (adds actual tags)
  //url="http://www.flickr.com/services/rest/?method=flickr.photos.addTags&api_key=9d179414c5491bb965d03dab476a0ef8&photo_id=" + photo_id + "&tags=" + tags + "&auth_hash=" + auth_hash;

  // new way to add geotags
  lat=lat.replace(' ','','g').replace('%20','','g');
  lon=lon.replace(' ','','g').replace('%20','','g');
  url="http://www.flickr.com/services/rest/?method=flickr.photos.geo.setLocation&api_key=9d179414c5491bb965d03dab476a0ef8&photo_id=" + photo_id + "&lat=" + lat + "&lon=" + lon + "&auth_hash=" + auth_hash;


window.setTimeout(function() { 
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    headers: {
             'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
             'Accept': 'application/atom+xml,application/xml,text/xml'
             },
    onload: function(response) 
           {
           //GM_log('Request returned ' + response.status + ' ' + response.statusText + '\n\n' + 'Feed data:\n' + response.responseText);
           //alert('Request returned ' + response.status + ' ' + response.statusText + '\n\n' + 'Feed data:\n' + response.responseText);
           //alert('GeoTags added.\n\nNow returning to Flickr...');
           location.href=unescape(oldlocation);
           }
  })
}, 0);
 
  
  
}

unsafeWindow.latlon = function(href, command) {
  xbeg=href.indexOf('x=')+2;
  xend=href.indexOf('&',xbeg);
  x=href.substr(xbeg,xend-xbeg);
  ybeg=href.indexOf('y=')+2;
  yend=href.indexOf('&',ybeg);
  y=href.substr(ybeg,yend-ybeg);
  //alert('x='+x + ' y=' + y);

window.setTimeout(function() { 
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.streetmap.co.uk/gct.srf?x=' + x + '&y=' + y + '&to=1',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	    lat=responseDetails.responseText.split('(WGS84)')[1].split('(')[1].split(')')[0];
	    lon=responseDetails.responseText.split('(WGS84)')[2].split('(')[1].split(')')[0];
      //alert( 'lat=' +lat + 'lon='+lon);

	if (command=='addgeotags')
		unsafeWindow.smukaddgeotags(lat,lon);
	if (command=='checkgeotags')
		location.href='http://www.flickr.com/map/?&fLat=' + lat.replace(' ','') + '&fLon=' + lon.replace(' ','') + '&zl=1&map_type=hyb' ;//'http://maps.yuan.cc/?lat=' + lat.replace(' ','') + '&lon=' + lon.replace(' ','');
	if (command=='showlatlon')
		//document.getElementById('splatlon').innerHTML='<b>geotagged geo:lat=' + lat.replace(' ','') + '&nbsp;geo:lon=' + lon.replace(' ','') + '</b>';
		document.getElementById('splatlon').innerHTML='<b>latitude: ' + lat.replace(' ','') + '&nbsp;longitude: ' + lon.replace(' ','') + '</b>';
    }
  });
}, 0);

} // end function latlon


})(); 

}// end if we are on streetmap.co.uk
else {

(function() {

unsafeWindow.getElementsByClassName = function (classname,tagname) {
 //N.B tagname is optional
 return unsafeWindow.Y.U.Dom.getElementsByClassName(classname,tagname);
}

unsafeWindow.blurbflag=0;

if (location.href.match(/flickr\.com/)) {
  unsafeWindow.sendtostreetmap=function (picidsetc) {
    if(picidsetc) {
      if(location.href.match(/\/organize/))
        currentlocation='http://flickr.com/photos/organize/' + '?ids=' + picidsetc;
      else
        currentlocation=location.href;
        
      currentlocation=encodeURI(currentlocation.replace('http://www.flickr.com','').replace('http://flickr.com',''));
      
      window.setTimeout(function() { GM_setValue('picidsetc',picidsetc + '|' + unsafeWindow.global_auth_hash + '|' + currentlocation + '|' + unsafeWindow.global_magisterLudi); }, 0 );
      piclocation=prompt('Please enter the location you took the picture at, you can use placenames, road names, postcodes etc. You will then be redirected to streetmap.co.uk where you need to locate the position on the map map that you took the photos, then click the "Add Geotags" link below the map.');
      location.href="http://streetmap.co.uk/newsearch.srf?mapp=newmap&searchp=newsearch&Submit1=search&type=PostCode&name=" + piclocation;
      
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

  // we gonna add a "geotag with streetmap uk" as a submenu item of "Location"
  locmenu=document.getElementById('candy_menu_o_location');

  geosmlink=document.createElement('a');
  geosmlink.textContent='Geotag with StreetMap.co.uk';
  geosmlink.setAttribute('onClick','sendtostreetmap(getbatchids())');
  //locmenu.appendChild(geosmlink); // havent finished this bit of code yet, wait till next version for batch tagging

}

unsafeWindow.steeevsgeotagger = function()
  {
  document.forms.namedItem("sfgeotagger").elements.namedItem("sfpid").value = unsafeWindow.ps_photo_id + '|' + unsafeWindow.global_auth_hash + '|' + location.href.split('?')[0];
  //alert(document.forms.namedItem("sfgeotagger").elements.namedItem("sfpid").value);
  return true;
  }

unsafeWindow.displaylocationfield = function()
  {
  document.forms.namedItem("sfgeotagger").elements.namedItem("sfpnm").focus();
  //document.sfgeotagger.sfpnm.focus();
  if (unsafeWindow.blurbflag==0)
    {
    document.getElementById('sfphotolocation').style.display = "inline"; 
    document.getElementById('sfsubmit').style.display ="inline";
    document.getElementById('tagadderlink').innerHTML+="<p><font color='blue'>Enter the UK place name, road name, or postcode where the photo was taken, then click submit.</font></p>";
    unsafeWindow.blurbflag=1;
    }
  return false;
  }

//alert(location.href);
unsafeWindow.sfhaharr= location.href.split('/');
unsafeWindow.ps_photo_id=unsafeWindow.sfhaharr[5];

unsafeWindow.bagtagger=document.getElementById('tagadderlink');
if ((unsafeWindow.bagtagger!= null) && unsafeWindow.bagtagger.innerHTML) 
	{
	unsafeWindow.bagtagger.innerHTML+=" | <a title='Add UK GeoTags via StreetMap UK' style=\"text-decoration: none;\" href='' onclick='displaylocationfield();return false;' >Add UK GeoTags</a><p><form onsubmit='steeevsgeotagger()' name='sfgeotagger' method='get' target='iffyframe' action='http://streetmap.co.uk'><input name='sfpid' type='hidden' value=''/><input name='sfpnm' id='sfphotolocation' type=text style='display:none'>&nbsp;<input id='sfsubmit' type='submit' value='SUBMIT' class='Butt' style='display:none'></form></p>";
        unsafeWindow.getElementsByClassName('About','p')[0].innerHTML+="<iframe id='iffyframe' name='iffyframe' height=0 width=0></iframe>";
	}

})();

} // end if we are on flickr.com