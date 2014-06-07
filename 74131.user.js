// ==UserScript==
// @name           IFClean
// @namespace      www.abc.com
// @description    Clean Imagefap document titles and add user to galleryname
// @include        http://www.imagefap.com/
// @include        http://www.imagefap.com/random.php*
// @include        http://www.imagefap.com/gallery.php?*
// @include        http://www.imagefap.com/gallery.php
// @include        http://www.imagefap.com/gallery/*
// @include        http://www.imagefap.com/profile.php*
// @include        http://www.imagefap.com/image.php*
// @include        http://www.imagefap.com/pictures/*
// @include        http://www.imagefap.com/photo*
// @include        http://www.imagefap.com/pics*
// @include        http://www.imagefap.com/categories.php
// @include        http://www.imagefap.com/profile*
// @include        http://www.imagefap.com/showfavorites.php*
// @include        http://www.imagefap.com/fanbase.php*
// @include        http://www.imagefap.com/showclubs.php*
// ==/UserScript==
// v1.5 (06DEC10)  Tweaked to work with new imagefap picture location
//                 Extended to cover user profiles, favourites and galleries
// v1.6 (29JUL13)  Now works when logged in

//
// Clean document title
//
var title = document.title;
//alert('Title: "' + title + '"');

if (title.substr(0, 9) == 'Free Porn'){ //www.imagefap.com
  document.title = 'Home';
//  alert ('Home');
}
else if (title.substr(0, 9) == 'Free porn'){ //www.imagefap.com/gallery.php
  document.title = 'Forums';
//  alert ('Forum');
}
else if (title.substr(0, 13) == 'Random images'){ //www.imagefap.com/random.php
  document.title = 'Random';
//  alert ('Random');
}
else if (title.substr(0, 14) == 'All categories'){ //www.imagefap.com/categories.php
  document.title = 'Categories';
//  alert ('Categories');
}
else if (title.substr(0, 9) == 'Porn pics'){ //www.imagefap.com/gallery/*  www.imagefap.com/gallery.php?*
  document.title = 'Forum';
//alert ('Forum');

  //
  // Find the username and gallery dynamically (works for logged when in or out
  // http://www.imagefap.com/pictures/467283/1967-Mustang
  //
  var ele = document.getElementsByTagName('b');
  var l = ele.length;
//  alert('Length: "' + l + '"');
  var i = 0;

  while(i < l) {
//alert('Element ' + i + ': "' + ele[i].firstChild.innerHTML + '"')

    if (!(typeof ele[i].firstChild.innerHTML === 'undefined')) {
//      alert('POTENTIAL ' + i + ': "' + ele[i].firstChild.innerHTML.substr(0, 11) + '"');

      if(ele[i].firstChild.innerHTML.substr(0, 11) == 'Uploaded by') {
//        alert('FOUND ' + i);
        var userName = ele[i].firstChild.innerHTML;
        var gallery = ele[i - 1].firstChild;
        i = l;
      }
    }
    i = i + 1;
  }



//alert('User: "' + userName + '"');
//alert('Gallery: "' + gallery + '"');

  if (userName) {
    // Strip out the 'Uploaded by ' string
    userName = userName.substr(12);
  }
  else userName = 'unknown';
//  alert('User: "' + userName + '"');

  var galleryName = gallery.innerHTML;
//  alert('Gallery Name: "' + galleryName + '"');

  // Remove unwanted characters
  galleryName = galleryName.replace(/\//g, '-');
  galleryName = galleryName.replace(/\:+/g, '-');
  galleryName = galleryName.replace(/\|+/g, '-');
  galleryName = galleryName.replace(/\"+/g, '\'');
  galleryName = galleryName.replace(/\*+/g, '');
  galleryName = galleryName.replace(/\?+/g, '');
  galleryName = galleryName.replace(/\.+/g, '');
  galleryName = galleryName.replace(/^\s+/, '');
  galleryName = galleryName.replace(/\s+$/, '');
//  alert('Gallery: "' + galleryName + '"');

  var galleryId = new Array();
  var query = new Array();
  galleryId = window.location.pathname.split('/');
//  alert ('Path: "' + galleryId + '"')
//  alert ('QueryString: "' + window.location.search + '""');
  var page = ''
  if (window.location.search != '') {
    query = window.location.search.split('&');
//    alert ('Query: "' + query[1] + '"');
    if (query.length > 1) {
//       alert ('HERE')
       query = query[1].split('=')
//     alert ('Page: "' + query[0] + '""');

      if (query[0] == 'page') {
         var page = '[' + (+query[1] + 1) + ']'
      }
    }
  }

  // put all together
  galleryName = '\\' + userName + '\\' + galleryName + ' [' + galleryId[2] + ']' + page + '\\';
//  alert('Gallery: "' + galleryName + '"');
  gallery.innerHTML = galleryName;
}
else if (title.indexOf('profile') > 0){
  document.title = 'Profile';
//  alert ('Profile');
}
else if (title.indexOf('uploaded by') > 0){
  document.title = 'Comment';
//  alert ('Comment');
}
else if (title.indexOf('Fanbase') > 0){
  document.title = 'Fanbase';
//  alert ('Fanbase');
}
else if (title.indexOf('Clubs') > 0){
  document.title = 'Clubs';
//  alert ('Clubs');
}else {
//  alert ('Found At: ' +  title.indexOf('profile'));
}

  //
  // Attempt to click the Thumbs2Links 1.9 button to auto-fetch links
  // FIREFOX ONLY AT THE MOMENT!!
  //
  var thmbs = document.getElementById('t2l-span-1')
//alert('Thumbs2Link: "' + document.getElementById('t2l-span-1') + '"')
//  thmbs.onclick();
  var event = new MouseEvent('click', {'view': window, 'bubbles': true});
  thmbs.dispatchEvent(event);


  //
  // Find the side banner and reduce width to manageable size
  // HAS CHANGED NOW
  //
//alert('BEFORE Banner');
  var bnr = document.getElementById('cntBanner')
  var w = parseFloat(bnr.style.width);
//alert('Banner Width: "' + w + '"');

  var ele = document.getElementsByTagName('td');
  var l = ele.length;
//  alert('Length: "' + l + '"');
  var i = 0;

  while(i < l) {
    if (ele[i].width == w) {
//  alert('Element ' + i + ': "' + ele[i].width + '"')
      ele[i].width = 0
      bnr.style.width = '0px'
      i = l
    }
    i = i + 1;
  }


