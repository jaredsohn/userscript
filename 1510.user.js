// ==UserScript==
// @name          Flickr - Publish Your Popular Pages
// @version	  0.6
// @description	  Lets you publish your most popular photos listed (by views/comments/faves/interesting) + also your favourites list by other Flickr users on your PHP enabled website.
// @namespace     http://steeev.f2o.org/flickr
// @author        Steeev : http://steeev.f2o.org : http://flickr.com/photos/steeev
// @include       http://www.flickr.com/photos/steeev/popular-comments/*
// @include       http://www.flickr.com/photos/steeev/popular-views/*
// @include       http://www.flickr.com/photos/steeev/popular-faves/*
// @include       http://www.flickr.com/photos/steeev/popular-interesting/*
// @include       http://www.flickr.com/photos/steeev/favorites/*
// @include       http://flickr.com/photos/steeev/popular-comments/*
// @include       http://flickr.com/photos/steeev/popular-views/*
// @include       http://flickr.com/photos/steeev/popular-faves/*
// @include       http://flickr.com/photos/steeev/popular-interesting/*
// @include       http://flickr.com/photos/steeev/favorites/*
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox  http://www.mozilla.org/firefox and 
// the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr - Publish Your Popular Pages", and click Uninstall.
//
// --------------------------------------------------------------------



(function() {
  serverPHPfileURL = 'http://steeev.f2o.org/flickr/saveyourfaves.php'; // you need to change this URL to the URL of your PHP file on your server.
  password = 'putApasswordHere';//  // you should change the password here and in the php file on the server so they both match

  flickrserver=location.href.split('/')[2];
  flickrusername=location.href.split('/')[4];

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
  }//end function

  unsafeWindow.getnumberofpages=function() {
   /*  pagi=getElementsByClassName('paginator'); //<a href="/photos/steeev/favorites/page14/" class="end">14</a>
    if(pagi!='undefined')
      {
      aarr=pagi.getElementsByClassName('end');
      pages=aarr.innerHTML;
      }
    else
      pages=1
   */
    pagi=unsafeWindow.getElementsByClassName('paginator');
    pages=pagi.innerHTML.split('class="end">')[1].split('</a>')[0];
    //alert(pages);

    return pages;

  }
  
  unsafeWindow.getmode=function () {
    mode=location.href.split('/')[5];
   return mode;
  }
  
  unsafeWindow.initialise = function() {
    h1=document.getElementsByTagName('h1');
    //alert(h1[0].innerHTML);
    linkdiv=document.createElement('div');
    link="<a href='' onclick='processpages();return false;'>Publish</a>";
    linkdiv.innerHTML=link;
    if (h1) {
      h1[0].parentNode.insertBefore(linkdiv, h1[0].nextSibling);
    }
  }

  unsafeWindow.postit = function (pagenum, mode, postdata, password) {
   if (mode!='favorites')
     postdata='password=' + password + '&pagenum=' + pagenum + '&mode=' + mode + '&page='  + encodeURIComponent('<h3 class="Tab">' + postdata + '</div>') ;
   else
     postdata='password=' + password + '&pagenum=' + pagenum + '&mode=' + mode + '&page='  + encodeURIComponent('<table cellspacing="0" align="center" width="530">' + postdata + ' photos)</span></div></div>') ;
   GM_xmlhttpRequest({
    method: 'POST',
    url: serverPHPfileURL,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/html',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    onload: function(responseDetails) {
	//alert(responseDetails.responseText);//responseText
      },
    data: postdata
    });
  }

  unsafeWindow.processpages = function () {
    mode=unsafeWindow.getmode();
    pages=unsafeWindow.getnumberofpages();
 
  //if (mode=='favorites') {
  //  alert('favorites!');
  //  return false;
  // }

  //pages=2; // temp value for testing purposes (uncomment when testing)


   for (i=1;i<=pages;i++) {
      if (i>1)
        pagenum='page' + i + '/';
      else
        pagenum='';

      var xmlHttpReq = false;
      xmlHttpReq = new XMLHttpRequest();
      xmlHttpReq.overrideMimeType('text/xml');
      xmlHttpReq.open('GET', 'http://' + flickrserver + '/photos/' + flickrusername + '/' + mode + '/' + pagenum, true);
      xmlHttpReq.onload=function (evt) {
        //alert(evt.target.responseText);
        if (evt.target.responseText.match(/<h3 class=/)) {
          content=evt.target.responseText.split("<h3 class=\"Tab\">")[1].split('</div>')[0];
          //alert('content='+content);
          thepagenum=evt.target.responseText.split('<span class="this-page">')[1].split('</span>')[0];
          //alert('thepagenum='+thepagenum);
        }
        else {
          content=evt.target.responseText.split("<table cellspacing=\"0\" align=\"center\" width=\"530\">")[1].split('photos)')[0];
          //alert('content='+content);
          thepagenum=evt.target.responseText.split('<span class="this-page">')[1].split('</span>')[0];

        }
        unsafeWindow.postit(thepagenum,mode,content,password);
      }
 
      //setTimeout("xmlHttpReq.send(null)",2000*i);
      xmlHttpReq.send(null);

   }

  }

unsafeWindow.initialise(); 



})();
