// ==UserScript==
// @name          Flickr Scout Link
// @description	  This script adds a link to fd's scout page (http://flagrantdisregard.com/flickr/scout.php) on photo stream pages. It is based on netomer (http://netomer.de) and steeev's (http://steeev.f2o.org/) scripts.
// @author        Maciej Lesniewski (mlesn)
// @version       0.1 (18/08/07)
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// @exclude       http://www.flickr.com/photos/friends/*
// ==/UserScript==


// v0.1 initial release
// v0.2 excluded /photos/friends/

(function() {

var getElementsByClassName = function (classname,tagname) {
   //N.B tagname is optional
   return unsafeWindow.Y.U.Dom.getElementsByClassName(classname,tagname);
   //return unsafeWindow.document.getElementsByClass(classname,tagname)
}

grabuserid = function(text) {
  buddyid = 'undefined';
  if (text.indexOf('buddyicon.jpg') != -1) { // no proper icon
    buddiarr = text.split('buddyicon.jpg?');
    if (buddiarr[1] != null) {
      buddyid = (buddiarr[1].split('"'))[0];
    }
  } else {
    buddiarr = text.split('/buddyicons/');
    if (buddiarr[1] != null) {
      buddyid = buddiarr[1].split('.jpg')[0];
    }
  }
  if ((buddyid == 'undefined') || (buddyid == null)) {
    buddyid = (text.split('/'))[2];
  }
  return (buddyid == null) ? 'undefined' : buddyid;
}


var go = function()
{
	// the include wildcards match too many pages. we only want the index.
	var onlyIndexRE = /.*\/photos\/([^\/]*)(\/)?$/gi;
	if (!document.location.href.match(onlyIndexRE)) return;

	var links, buddyhtml, buddyid, img, link;

	links = getElementsByClassName("Links");

	if (!links) return;
	else links = links[0];

	buddyhtml = getElementsByClassName('Buddy')[0].innerHTML;
	buddyid = grabuserid(buddyhtml);

	img = document.createElement('img');
	img.src = '/images/subnavi_dots.gif';
	img.alt = '';
	img.width = '1';
	img.height = '11';

	link = document.createElement('a');
	link.href = 'http://flagrantdisregard.com/flickr/scout.php?username=' + buddyid + '&sort=date&year=0';
	link.appendChild(document.createTextNode(' Scout'));

	links.appendChild(img);
	links.appendChild(link);

}

go();

})();
