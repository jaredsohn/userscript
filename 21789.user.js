// ==UserScript==
// @name           Universal Discuz forum auto sort by date
// @namespace      http://www.xanga.com/gandalf__zoro
// @description    autosort date
// @include        *
// ==/UserScript==
function init() {
      var tmp = GM_getValue('autosort');
      if (!tmp)
         tmp = 'd';  
      GM_setValue('autosort', window.prompt('Enter the method of sort \n d = date \n r = latest reply \n vt = view times\n rt = reply times', tmp).toLowerCase());
}   
   
function defaultsort() { 
  var tar1 = document.location.href;
  var method = GM_getValue('autosort');
  var pattern = /forumdisplay.php[?]fid[=][0-9]+$/i;
  var pattern2 = new RegExp("forum[-]([0-9]+)[-][0-9]+.html$");
  var sort="";
   switch (method) {
    case 'd':
      sort="dateline";
      break;
    case 'r':
      sort="lastpost";
      break;
    case 'vt':
       sort="views";
      break;
    case 'rt':
      sort="replies";
      break;  
  }
  
  if (pattern.test(tar1)) {
   document.setTimeout(location.href += '&filter=0&orderby='+sort+'&ascdesc=DESC', 1800 );
  }
 
  if (pattern2.test(tar1)) {
    tar2 = RegExp.leftContext + "forumdisplay.php?fid="+RegExp.$1;
    window.setTimeout(function() {location.href = tar2 + '&filter=0&orderby='+sort+'&ascdesc=DESC' }, 1800 );
  }
}


defaultsort();  
GM_registerMenuCommand('Autosort method', init);