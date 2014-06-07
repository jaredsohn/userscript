// ==UserScript==
// @author	  Stephen Fernandez aka Steeev http://steeev.freehostia.com + http://flickr.com/photos/steeev
// @name          geotag.flickr.googleearth
// @description	  Adds "Add GeoTags" link to photo pages + batch edit page, which lets you add GeoTags via Google Earth.
// @namespace     http://steeev.freehostia.com/flickr/
// @include       http://www.flickr.com/photos/*/*
// @include       http://flickr.com/photos/*/*
// @include       http://www.flickr.com/organize*
// @include       http://flickr.com/organize*
// @version       0.7  ( 13-Mar-2009 )
// ==/UserScript==

///////////////////////////////////

// This is a Greasemonkey user script.

// To install, you need FireFox  http://www.mozilla.org/firefox and 
// the firefox extension called Greasemonkey: http://www.greasespot.net/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "geotag.flickr.googleearth", and click Uninstall.

///////////////////////////////////
/*

 Usage Instructions 
 ==================

1) In order for this script to work properly, you also need to install Google Earth http://earth.google.com

2) If you are running any of my other GeoTagging GM scripts, and wish to try this script out, you should disable them
   in the Tools/Manage User Scripts window. If you wish to go back to using the other GM script/s at some point, you 
   need to disable or uninstall this one, then re-enable the previously disabled scripts.

3) Open Google Earth, then goto the Places window on the left, right click "My Places" and then select 
   "New Network Link" For the name enter "Flick'rin GeoTagger" and For the location enter the following URL:
   http://steeev.890m.com/flickr/gearth.php?user=[Put Your Flickr Username Here] 

   eg if you were me you would use the following URL: http://steeev.890m.com/flickr/gearth.php?user=steeev

4) Leave all the other options in the default settings then click OK.

5) Now Install this script and you will have a new link on your Flickr photo pages and batch edit pages called "Add GeoTags"

6) Clicking that link will display an input box. Enter the address of where the photo/s were taken, then click submit.

7) You will then be sent to a page explaining what to do next, and also a KML file will be sent to your browser

8) you need to open the KML file with Google Earth.

9) Once you have opened the KML file, it will display a marker showing the approximate location of the area you wish to
   GeoTag.

10) You now need to move to the exact spot you wish to GeoTag, once you have identified the right location, you
    should zoom right in on it, so its right at the center of the screeen. You should also ensure that your view point is
    not tilted, you can do this by clicking the "reset tilt" button. 

11) Now right click on the "Flick'rin GeoTagger" network link in the Places window and select "Refresh". A new placemarker
    will now be displayed at the point you just specified, click the placemarkers icon, and it will pop up a HTML window,
    now simply click the "Add GeoTags" link and the geotags will be added to your image/s.

12) You then need to either add the "GeoTagged" link to the description or if its not your image, to the comments.
    So just click the appropriate button. You can also add a link to "Fly to that location in Google Earth" See RobRoyAus's
    post here for more info: http://flickr.com/groups/topic/60830/ for more info: 
    


 Credits
 =======
 Many Thanks to Stefan Geens ( http://go.ogleearth.com ) who pointed me to the code that gets the centerpoint from the BBOX paramater

 Changelog:
 ==========
 v0.5    26-Jul-2005 : Initial Release
 v0.6    17-May-2007 : you need to update your flickrin geotagger network link to http://steev.freehostia.com
 v0.7    13-Mar-2009 : you need to update your flickrin geotagger network link to http://steev.890.com (See usage instructions above)
                       updated batch tagging code, to activate go to organizer, then the location menu

*/




window.addEventListener(
    'load',function(){unsafeWindow.sfpagestarter()},
    true);

(function() {

unsafeWindow.blurbflag=0;
unsafeWindow.sfpagestarter=function() {

  geotaggingsnippet="<a id='gtlink' title='Add GeoTags using Google Earth + Steeevs Flickrin Geotagger' style=\"text-decoration: none;\" href='' onclick='displaylocationfield();return false;' >Add GeoTags via G.E.</a><p><form id='sfgeotaggingform' style='display:none' onsubmit='steeevsgeotagger()' name='sfgeotagger' method='post' action='http://steeev.890m.com/flickr/gearthinit.php'><input type='hidden' name='apikey' value='" + unsafeWindow.global_magisterLudi + "'><input type='hidden' name='mode' value='address'><input name='address' id='sfphotolocation' type=text><input name='photo_id' type='hidden' value=''/><input name='photo_server' type='hidden' value=''/><input name='photo_secret' type='hidden' value=''/><input name='title' type='hidden' value=''/><input name='description' type='hidden' value=''/><input name='auth_hash' id='authohasho' type='hidden' value=''/>&nbsp;<input id='sfsubmit' type='submit' value='SUBMIT' class='Butt'></form></p>";
  if (location.href.match(/\/organize/))
    {
    
    unsafeWindow.sendtoGoogleEarth = function (batchids) {
      //alert(batchids);
      //document.getElementById('authohasho').value=document.;
      
      //document.getElementById('sfgeotaggingform').photo_id.value = batchids;
      //document.getElementById('sfgeotaggingform').sfphotolocation.value = prompt('Please enter the address you took the photo at');
      //document.getElementById('sfgeotaggingform').submit();
      
      //unsafeWindow.document.sfgeotagger.apikey=unsafeWindow.global_magisterLudi;
      unsafeWindow.document.sfgeotagger.auth_hash.value= unsafeWindow.global_auth_hash;
      unsafeWindow.document.sfgeotagger.photo_id.value = batchids;
      unsafeWindow.document.sfgeotagger.sfphotolocation.value = prompt('Please enter the address you took the photo at');
      unsafeWindow.document.sfgeotagger.submit();
    }
    
    unsafeWindow.getbatchidsGE = function() {
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

    // we gonna add a "geotag with Google Earth" as a submenu item of "Location"
    locmenu=document.getElementById('candy_menu_o_location');

    geommlink=document.createElement('a');
    geommlink.textContent='Geotag with GoogleEarth';
    geommlink.setAttribute('onClick','sendtoGoogleEarth(getbatchidsGE())');
    locmenu.appendChild(geommlink);


    //unsafeWindow.ps_photo_id=getstring('name="ids" value="','"',document.getElementsByTagName('body')[0].innerHTML);

    //alert(ps_photo_id);
    //geotaggingsnippet +="<div id='tagadderlink'></div>";
    holderdiv=document.createElement("span"); 
    holderdiv.style.visibility='none';
    //holderdiv.setAttribute("class", "TabOut");
    //document.getElementById('gtlink').setAttribute('style','text-decoration:underline');
    holderdiv.innerHTML=geotaggingsnippet;

    //var bagtagger=document.getElementsByClassName('batch_photo');//
    //bagtagger[0].parentNode.insertBefore(holderdiv, bagtagger.nextSibling);
    document.getElementsByTagName('body')[0].appendChild(holderdiv);
    }
   else
    {
    if(!unsafeWindow.page_photo_id)
      return;
    unsafeWindow.ps_photo_id=unsafeWindow.page_photo_id;

    var bagtagger=document.getElementById('tagadderlink');
    if ((bagtagger) && bagtagger.innerHTML) 
      bagtagger.innerHTML+=" | " + geotaggingsnippet;
    }

}

unsafeWindow.getstring = function (startstring, endstring, bodystring)
  {
  startstr = bodystring.indexOf(startstring) + startstring.length; 
  endstr = bodystring.indexOf(endstring,startstr);
  str=bodystring.substring(startstr, endstr);
  return str;
  }



unsafeWindow.steeevsgeotagger = function()
  {
  //alert('we called');
  if(!location.href.match(/\/organize\//))
    unsafeWindow.document.sfgeotagger.photo_id.value = unsafeWindow.ps_photo_id;
    
  unsafeWindow.document.sfgeotagger.photo_server.value = '';  
  unsafeWindow.document.sfgeotagger.photo_secret.value = '';  
  unsafeWindow.document.sfgeotagger.title.value = ''; 
  unsafeWindow.document.sfgeotagger.description.value = ''; 
  unsafeWindow.document.sfgeotagger.auth_hash.value= unsafeWindow.global_auth_hash;  
  return true;
  }

unsafeWindow.displaylocationfield = function()
  {
  //document.sfgeotagger.address.focus();
  document.forms.namedItem("sfgeotagger").elements.namedItem("address").focus();
  if (unsafeWindow.blurbflag==0)
    {
    document.getElementById('sfgeotaggingform').style.display = "inline"; 
    //document.getElementById('sfsubmit').style.display ="inline";
    document.getElementById('tagadderlink').innerHTML+="<p><font color='blue'>Enter the postcode/zipcode or place name where the photo was taken, then click submit.</font></p>";
    unsafeWindow.blurbflag=1;
    }
  return false;
  }

unsafeWindow.getElementsByClassName = function(clsName) 
{ 
  var elems = document.getElementsByTagName("*");
  for ( var cls, i = 0; ( elem = elems[i] ); i++ )
    if ( elem.className == clsName )
        arr = elem;
  if (typeof(arr) != 'undefined')
    return arr;
  else
    return 'undefined';
}


})();