/*
// ==UserScript==
// @author        Stephen Fernandez aka Steeev http://steeev.freehostia.com + http://flickr.com/photos/steeev
// @name          Flickr Shades
// @description	  Lets you change Flickr's colour scheme, the default is white text on black background.
// @namespace     http://steeev.f2o.org/flickr/
// @include       http://www.flickr.com/*
// @include       http://flickr.com/*
// @exclude       http://www.flickr.com/photos/organize*
// @exclude       http://flickr.com/photos/organize*
// @version       2.22 (30-Jun-2008)
// ==/UserScript==

// (c) 2008 Excellatronic Communications
// --------------------------------------------------------------------
//
// DISCLAIMER
// ----------
//
// Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
// i cannot be held responsible for anything bad that happens regarding usage of this script.
//
// INSTALLATION
// ------------
//
// This is a Greasemonkey user script. To install it, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Shades", and click Uninstall.
//
//
// USAGE
// -----
// After you have installed the script, you can access the colour scheme editor panel, 
// via "Tools / Greasemonkey / UserScript Commands" menu in Firefox.
// you can enter colours as words (full list of available colour names is here: http://www.computerhope.com/htmcolor.htm )
// or as hexadecimal colour codes.
// You can also change the flickr logo if you wish, you need to enter a valid URL that points to the image you wish to use
//
// If you wish to disable the script temporarily to restore the original flickr colours, you can right click on the monkey
// icon at the bottom right corner of the browser, then untick "Flickr Shades" this will disable the script, you can 
// re-enable the script by following the same procedure, but this time ticking the script.

// DONATE
// ======
// If you wish to thank me for all the work i have put into writing/testing/supporting this script,  
// and would like to support further updates and bug fixes, you can send me a few pounds/dollars etc
// via PayPal, my paypal donation link can be found here http://steeev.freehostia.com/donate/
                                   
 CHANGELOG:
 ----------
 30Jun08 2.22 - fixed blank graph on stats page
 27Jun08 2.21 - fixed blank thumnails on sets page issue
 04Jun08 v2.2 - fixed completely blank photostreams that have spaceball.gifs also fixed blank gap beneath certain photos
 03Jun08 v2.1 - added identifier letters for international button bar buttons, also added identifier to show if image is faved or not
 03Jun08 v2.0 - added configuration panel, accessible via the "Tools/Greasemonkey/User Script Commands" menu, that lets you change the flickr shades colour scheme
 02Jun08 v1.7 - script now works on all sizes page
 02Jun08 v1.6 - fixed button bar on photo pages
 09Apr07 v1.5 - flickr changed graphical root menu to text links, so i removed the redundant code
 22Mar07 v1.4 - factored colours out to variables, for easier editing. also replaced the main flickr menu's graphical roots. flickr logo now has transparent background
 20Mar07 v1.32- re-replaced flickr logo, and refactored code
 17May06 v1.31- replaced new flickr logo
 12Oct05 v1.3 - removed border from images
 17Aug05 v1.2 - fixed small bug with buddyicons not displaying properly
 16Aug05 v1.1 - fixed bug with notes not displaying properly.

 KNOWN ISSUES
 ------------
 images "protected" with a spaceball, have a big gap between the image and the comments for some reason
 
 TO DO LIST
 ----------
 Allow saving of multiple colour schemes, add a restore to Flickr's original colour scheme
 
 CREDITS
 -------
 This script is based on the Zap Colours Bookmarklet by Jesse Ruderman at http://www.squarefree.com/bookmarklets/zap.html
 Cheers Jesse!
 This script utilises the excellent JS Color Picker script by Alf Magne Kalleland available from http://www.dhtmlgoodies.com/index.html?showDownload=true&whichScript=js_color_picker_v2
                                    JS Color Picker script is Copyright (C) October 2005,  http://www.DHTMLGoodies.com, Alf Magne Kalleland
*/

( function() {
	    
  var fsVersion="2.22";
  var defaultbgcolour="black";
  var defaulttextcolour="white";
  var defaultlinkcolour="#3333FF";
  var defaultvlinkcolour="#9933FF";
  var defaultflickrlogo='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAAAjCAMAAABLqG8BAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAJUExURf8AnABlzv%2F%2F%2FyW6vtkAAAADdFJOU%2F%2F%2FANfKDUEAAAFYSURBVHjaYmCiGwAIIAb6WQUQQHS0CiCA6GgVQADR0SqAAKKjVQABREerAAIIYRUjGKCyUNkYAK8kBgAIIAYUXTS1CiCAGFBtoqVVAAHEgGoTLa0CCCAUq7CYQEWrAAKIAYseok0gzSqAAKKjVQABREerAAKIASlJEJMsUFQiSSKJMoABlIFkFUAAkWYVmkp0LahWMaBZBRBAJFnFSNAqJoRVDOhWAQQQKVYx4rQKWTfUDgYMqwACiFCywBIdmFah2ITTKoAAIsMqjBSIJoHVHiAACCDircK0Cc0qJjSr0BM7QACRbBVmvkKXwGETE0AA0dEqgACimVWYpQVAANHRKoAAop5VjISsAgggKqZARgJWAQQQzbIwplUAAUSCVYQLJvxWAQQQVa1ixGsVQACRYhVpJTsGAAggkqzCXV8xEWEVQACRZhXuWpgJSy2MBgACiI5tdoAAAwAqnRfV3rxkqQAAAABJRU5ErkJggg%3D%3D';

  // setup some global variables
  unsafeWindow.FSbackgroundcolour='';
  unsafeWindow.FStextcolour='';
  unsafeWindow.FSlinkcolour='';
  unsafeWindow.FSvisitedlinkcolour='';
  unsafeWindow.FSflickrlogo='';
  unsafeWindow.tempbody='';
     
  var getElementsByClassName = function (classname) {
  //return unsafeWindow.document.getElementsByClass(classname)
  if (unsafeWindow.Y)
    return unsafeWindow.Y.U.Dom.getElementsByClassName(classname);
  else
    return false;
  }  
  
  unsafeWindow.testColours=function () {
    teststyle=document.createElement('style');
    teststyle.setAttribute('id','teststyle1');
    
    tc=document.getElementById('tc').value;
    bgc=document.getElementById('bgc').value;
    vlc=document.getElementById('vlc').value;
    lc=document.getElementById('lc').value;
    
    if(!tc || !bgc || !vlc || !lc) {
      alert('Please enter a value for each colour.');
      return false;
    }
    backgroundcolour=bgc;
    textcolour=tc;
    linkcolour=lc;
    visitedlinkcolour=vlc;
    
    testbgtd=document.getElementById('testbg');
    testbgtd.style.backgroundColor=backgroundcolour;
    
    testlinktd=document.getElementById('testlink');
    testlinktd.style.backgroundColor=backgroundcolour;
    testlinktd.style.color=linkcolour;
    
    testtexttd=document.getElementById('testtext');
    testtexttd.style.backgroundColor=backgroundcolour;
    testtexttd.style.color=textcolour;
    
    testvlinktd=document.getElementById('testvlink');
    testvlinktd.style.backgroundColor=backgroundcolour;
    testvlinktd.style.color=visitedlinkcolour;
    
    tlogotd=document.getElementById('testlogotd');
    tlogotd.style.backgroundColor=backgroundcolour;
    
    unsafeWindow.testLogo();
    /*
    var styles='* { background: ' + backgroundcolour + ' ! important; color: ' + textcolour + ' !important } :link, :link * { color: ' + linkcolour +' !important } :visited, :visited * { color: ' + visitedlinkcolour + ' !important } #photo_notes {background: transparent ! important} .photo_note *{background: transparent ! important} img {border:0px ! important}}';
    teststyle.innerHTML=styles;
    document.getElementsByTagName('head')[0].appendChild(teststyle);
    */
    
  }
  
  unsafeWindow.flickrshadesmenurestore=function () {
    //if(!confirm('Are you sure you want to restore the default Flickr Shades Colours?'))
    //  return;  
    unsafeWindow.flickrshadesconfig();
    unsafeWindow.restoreDefaultColours();
  }
  
  unsafeWindow.restoreDefaultColours=function() {

    testbgtd=document.getElementById('testbg');
    testbgtd.style.backgroundColor=defaultbgcolour;
    document.getElementById('bgc').value=defaultbgcolour;
    
    testlinktd=document.getElementById('testlink');
    testlinktd.style.backgroundColor=defaultbgcolour;
    testlinktd.style.color=defaultlinkcolour;
    document.getElementById('lc').value=defaultlinkcolour;
    
    testtexttd=document.getElementById('testtext');
    testtexttd.style.backgroundColor=defaultbgcolour;
    testtexttd.style.color=defaulttextcolour;;
    document.getElementById('tc').value=defaulttextcolour;
    
    testvlinktd=document.getElementById('testvlink');
    testvlinktd.style.backgroundColor=defaultbgcolour;
    testvlinktd.style.color=defaultvlinkcolour;
    document.getElementById('vlc').value=defaultvlinkcolour;
    
    tlogotd=document.getElementById('testlogotd').style.backgroundColor=defaultbgcolour;
    document.getElementById('testlogoimg').src=defaultflickrlogo;
    document.getElementById('flo').value=defaultflickrlogo;
    
    unsafeWindow.testColours();
    unsafeWindow.saveColours();

  }
  
  unsafeWindow.saveColours=function () {
 
    bgc=document.getElementById('bgc').value;  
    tc=document.getElementById('tc').value;
    lc=document.getElementById('lc').value;
    vlc=document.getElementById('vlc').value;
    
    if(!tc || !bgc || !vlc || !lc) {
      alert('Please enter a value for each colour.');
      return false;
    }

    if(!confirm('Are you sure you want to save and use this set of colours?'))
      return false;

    window.setTimeout(function() { GM_setValue("savedcolours",bgc + ',' + tc + ','  + lc + ',' + vlc); }, 0);
    
    if (document.getElementById('flo').value)
      window.setTimeout(function() { GM_setValue("savedflickrlogo",document.getElementById('flo').value); }, 0);
      
    //alert('Colour scheme has been saved. Reloading page...');
    document.location.reload();

  }
  
  unsafeWindow.testLogo=function () {
    if(document.getElementById('flo').value)
      document.getElementById('testlogoimg').src=document.getElementById('flo').value;  
    else
      document.getElementById('testlogoimg').src=defaultflickrlogo;
  }
  
  ///////////////////////////////////
  //BEGIN flickrshadesconfig function
  ///////////////////////////////////
  unsafeWindow.flickrshadesconfig= function () {
    //alert('hahaa');
    if (!document.getElementById('fsConfigDiv')) {
      fsConfigDiv = document.createElement('div');
      fsConfigDiv.setAttribute('id','fsConfigDiv');
      fsConfigDiv.style.position = 'absolute';
      fsConfigDiv.style.overflow = 'hidden';
      fsConfigDiv.style.width = '490px';
      fsConfigDiv.style.padding = '10px';
      //fsConfigDiv.style.paddingRight = '0px !important';

      fsConfigDiv.style.margin = '4px';
      fsConfigDiv.style.top =  document.body.scrollTop + 100;
      fsConfigDiv.style.left = (1*document.body.clientWidth-550)/2 + 'px';

      //fsConfigDiv.style.zIndex = 2;
      fsConfigDiv.style.display = 'none';
      fsConfigDiv.style.border = '2px solid #000';
      fsConfigDiv.style.backgroundColor = 'white !important';
      fsConfigDiv.style.color = 'black !important';
  /* 
      document.getElementsByTagName('head')[0].innerHTML +='<link rel="stylesheet" href="http://steeev.freehostia.com/jscolorpicker/js_color_picker_v2.css" media="screen">' +
        '<script type="text/javascript" src="http://steeev.freehostia.com/jscolorpicker/color_functions.js"></script>' +
        '<script type="text/javascript" src="http://steeev.freehostia.com/jscolorpicker/js_color_picker_v2.js"></script>' ;
  */
  
      // backup body contents
      unsafeWindow.tempbody=document.body.innerHTML;
      
      // create editor form
      fsConfigDiv.innerHTML = '<link rel="stylesheet" href="http://steeev.freehostia.com/jscolorpicker/js_color_picker_v2.css" media="screen">' +
        '<script type="text/javascript" src="http://steeev.freehostia.com/jscolorpicker/color_functions.js"></script>' +
        '<script type="text/javascript" src="http://steeev.freehostia.com/jscolorpicker/js_color_picker_v2.js"></script>' +
        
        '<style>span.sfhead { font-weight:bold; font-size: x-large } span.sfhead2 {font-weight:bold; font-size: large; color:#F52887} a.poplnk {text-decoration:none} a.poplnk:hover {color: red !important} </style>' +
        '<span class="sfhead">Flickr Shades</span> - v' + fsVersion +' by <a class="poplnk" href="/photos/steeev/">Steeev</a><p><span class="sfhead2">Change the Flickr Colour Scheme</span></p>' +
        '<a href="javascript:;" title="Close Window" onclick="this.parentNode.style.display=\'none\';document.body.innerHTML=tempbody;return false;"><img style="float: right; position: relative; top:-77; margin: 0; padding: 0; border:0px !important; vertical-align: top;" src="http://flickr.com/images/window_close_grey.gif"/></a>' +
        '<form style="background-color:white"><table style="background-color:white">' +
        '<tr><td id="td1">Background Colour</td><Td><input onchange="document.body.style.backgroundColor=this.value" name="bgc" id="bgc"><input  type="button" class="Butt" value="Color picker" onclick="showColorPicker(this,document.forms[0].bgc)"></td><td id="testbg">&nbsp;</td></tr>' +
        '<tr><td id="td2">Text Colour</td><Td><input onchange="document.getElementById(\"td2\").style.color=this.value" name="tc" id="tc"><input type="button" class="Butt" value="Color picker" onclick="showColorPicker(this,document.forms[0].tc)"></td><td id="testtext">Example Text</td></tr>' +
        '<tr><td id="td3">Link Colour</td><Td><input onchange="document.getElementById(\"td3\").style.color=this.value" name="lc" id="lc"><input type="button" class="Butt" value="Color picker" onclick="showColorPicker(this,document.forms[0].lc)"></td><td id="testlink">Example Link</td></tr>' +
        '<tr><td id="td4">Visited Link Colour</td><Td><input onchange="document.getElementById(\"td4\").style.color=this.value" name="vlc" id="vlc"><input type="button" class="Butt" value="Color picker" onclick="showColorPicker(this,document.forms[0].vlc)"></td><td id="testvlink">Example Visited Link</td></tr>' +
        '<tr><td id="td5">Flickr Logo URL</td><Td><input size="38" onchange="document.getElementById(\"td5\").style.color=this.value" name="flo" id="flo"></td><td id="testlogotd"><img border="0" id="testlogoimg" src="' + defaultflickrlogo + '"></td></tr>' +
        '</table>' +
        '<br><input id="testbutt" class="Butt" type="button" value="Test Colour Scheme" onClick="testColours();return false;"> <input id="restorebutt" type="button" class="Butt" value="Restore Defaults" onClick="restoreDefaultColours();return false;"> <input id="savebutt" type="button" class="Butt" value="Save Colour Scheme" onClick="saveColours();return false;">' +
        '</form>' +
        '<p align="center">If you appreciate Steeevs <a class="poplnk" href="http://steeev.freehostia.com/flickr/">Flickr Projects</a>. Please make a <a class="poplnk" href="http://steeev.freehostia.com/donate">donation</a> :)</p>' +
        '<p/><span><span style="float:left"><a class="poplnk" target="_new" href="http://www.flickr.com/photos/steeev/29736810/in/set-72157594251194523/">Help? / Discuss</a></span><span  style="float:right"><a class="poplnk" href="" onclick=""this.parentNode.style.display=\'none\';document.body.innerHTML=tempbody;return false;">Close</a></span></span>';
        
      document.body.innerHTML='<div></div>';
      
      document.getElementsByTagName('div')[0].parentNode.insertBefore(fsConfigDiv,document.getElementsByTagName('div')[0]);
      fsConfigDiv.style.display='block';
      
      // display current values
      document.getElementById('bgc').value= unsafeWindow.FSbackgroundcolour;
      document.getElementById('tc').value= unsafeWindow.FStextcolour;
      document.getElementById('lc').value= unsafeWindow.FSlinkcolour;
      document.getElementById('vlc').value= unsafeWindow.FSvisitedlinkcolour;
      document.getElementById('flo').value=unsafeWindow.FSflickrlogo;
      
      // show flickrs normal colours so we can display the config box (note this might break if another script adds a style element after this script)
      //stylesA=document.getElementsByTagName('head')[0].getElementsByTagName('style');
      //stylesA[stylesA.length-1].innerHTML='';
      tmpfstyle=document.getElementById('flickrShadesStyle');
      tmpfstyle.parentNode.removeChild(tmpfstyle);

      
    }
    else
      document.getElementById('fsConfigDiv').style.display='block';
        
  } //END flickrshadesconfig function
  ///////////////////////////////////
  
  GM_registerMenuCommand("Flickr Shades - Colour Scheme Editor", unsafeWindow.flickrshadesconfig); 
  GM_registerMenuCommand("Flickr Shades - Restore Default Colour Scheme", unsafeWindow.flickrshadesmenurestore); 
  
  if (GM_getValue("savedcolours")) { 
    arrcolours=GM_getValue("savedcolours").split(','); 
    unsafeWindow.FSbackgroundcolour=arrcolours[0];
    unsafeWindow.FStextcolour=arrcolours[1];
    unsafeWindow.FSlinkcolour=arrcolours[2];
    unsafeWindow.FSvisitedlinkcolour=arrcolours[3];
  }
  else {
    // default colours
    unsafeWindow.FSbackgroundcolour=defaultbgcolour;
    unsafeWindow.FStextcolour=defaulttextcolour;
    unsafeWindow.FSlinkcolour=defaultlinkcolour;
    unsafeWindow.FSvisitedlinkcolour=defaultvlinkcolour;
  }
  
  if (GM_getValue("savedflickrlogo")) 
    unsafeWindow.FSflickrlogo=GM_getValue("savedflickrlogo"); 
  else
    unsafeWindow.FSflickrlogo=defaultflickrlogo;
 
  if (getElementsByClassName('FlickrLogo'))
    getElementsByClassName('FlickrLogo')[0].getElementsByTagName('img')[0].src=unsafeWindow.FSflickrlogo;

  var styles='* { background: ' + unsafeWindow.FSbackgroundcolour + ' ! important; color: ' + unsafeWindow.FStextcolour + ' !important } :link, :link * { color: ' + unsafeWindow.FSlinkcolour +' !important } :visited, :visited * { color: ' + unsafeWindow.FSvisitedlinkcolour + ' !important } #photo_notes {background: transparent ! important} .photo_note *{background: transparent ! important} img {border:0px ! important}}';
  //styles+=" #button_bar a { font-size : 6px !important} ;// background:#FFFFFF url(http://l.yimg.com/www.flickr.com/images/en-us/photo-button-bar-sprite2.gif) no-repeat scroll 0px 0px !important; }";
  //GM_addStyle(styles);
  fsstyle=document.createElement('style');
  fsstyle.setAttribute('id','flickrShadesStyle');
  fsstyle.innerHTML=styles;
  document.getElementsByTagName('head')[0].appendChild(fsstyle);
  

/*  
  // fix spaceball issue
  var dimgs=document.getElementsByTagName('img');
  
  // fix blank images
  for (a=0;a<dimgs.length;a++)
    if (dimgs[a].getAttribute('src') && dimgs[a].getAttribute('src').match(/images\/spaceball\.gif/)) {
	    dimgs[a].setAttribute('style','background-color:transparent !important;border:0px solid transparent; !important');
      break;
    }
*/    
    
  // fix blank images 1 (photo page)
  spackballsa=document.getElementsByClassName('photoImgDiv');
  if (spackballsa.length) {
    imgsA=spackballsa[0].getElementsByTagName('img');
    if(imgsA.length==2)
      imgsA[1].style.display='none';
      //imgsA[1].style.backgroundColor='transparent !important';
  }
  
  // fix blank images 2 (photo stream)
  if (!location.href.match(/\/sets\//)) {
    spackballs=document.getElementsByClassName('image_link');
    if (spackballs.length)
      for (i=0;i<spackballs.length;i++)
        spackballs[i].setAttribute('style','position: absolute; z-index: 1; top: 0px; left: 0px; display: none;');
  }
      
  // fix stats page
  if(location.href.match (/\/stats/))
    GM_addStyle('#graph-canvas-proxy { background : transparent !important}');
    //document.getElementById('graph-canvas-proxy').style.background='transparent !important';
  
  // if its a photo page, fix the button bar
  if (unsafeWindow.page_photo_id) { 
    bbarlinks=document.getElementById('button_bar').getElementsByTagName('a');
    if (document.getElementById('button_bar').getAttribute('class')!='intl button_bar_notext')
      for (i=0;i<bbarlinks.length;i++) {
        if(!bbarlinks[i].getAttribute('class').match('fave'))
          bbarlinks[i].textContent=bbarlinks[i].getAttribute('alt').replace('Add','+').replace('Send to','+').replace('this','').replace('& more','etc').replace('Order p','P');
        else {
          if (!bbarlinks[i].getAttribute('class').match('sprite-add_to_faves'))
            bbarlinks[i].innerHTML='&#9733; a fave';
          else
            bbarlinks[i].innerHTML='&#9734; + fave';
        }
      }
    else // "fix" button bar for international sites
      for (i=0;i<bbarlinks.length;i++) {
        if(bbarlinks[i].getAttribute('class').match('fave')) {
          if (!bbarlinks[i].getAttribute('class').match('sprite-add_to_faves'))
            bbarlinks[i].innerHTML='&#9733;';
          else
            bbarlinks[i].innerHTML='&#9734;';
        }
        else if (bbarlinks[i].getAttribute('class').match('zoom'))
          bbarlinks[i].innerHTML='<b>Z</b>';
        else if (bbarlinks[i].getAttribute('class').match('note'))
          bbarlinks[i].innerHTML='<b>N</b>';
        else if (bbarlinks[i].getAttribute('class').match('set'))
          bbarlinks[i].innerHTML='<b>S</b>';
        else if (bbarlinks[i].getAttribute('class').match('group'))
          bbarlinks[i].innerHTML='<b>G</b>';
        else if (bbarlinks[i].getAttribute('class').match('blog'))
          bbarlinks[i].innerHTML='<b>B</b>';
        else if (bbarlinks[i].getAttribute('class').match('print'))
          bbarlinks[i].innerHTML='<b>P</b>';
        else if (bbarlinks[i].getAttribute('class').match('rotate'))
          bbarlinks[i].innerHTML='<b>R</b>';
        else if (bbarlinks[i].getAttribute('class').match('edit'))
          bbarlinks[i].innerHTML='<b>E</b>';
        else if (bbarlinks[i].getAttribute('class').match('delete'))
          bbarlinks[i].innerHTML='<b>X</b>';
        
      }    
  }
  
  // the home button is pretty pointless for most people so lets surgically remove it
  if (document.getElementById('candy_nav_button_bar')) {
    homeli=document.getElementById('candy_nav_button_bar').getElementsByTagName('li')[0];
    if(homeli)
      homeli.parentNode.removeChild(homeli);
    
    // add a link to steeev's flickr tools and greasemonkey scripts page
    newli=document.createElement('li');
    newli.setAttribute('class','menu_li')
    
    sftlink=document.createElement('a');
    sftlink.setAttribute('href','http://steeev.freehostia.com/flickr/')
    sftlink.textContent="Flickr Tools";
  
    blahspan=document.createElement('span');
    blahspan.appendChild(sftlink);
  
    cnav=document.getElementById('candy_nav_button_bar');
    newli.appendChild(blahspan);
    cnav.getElementsByTagName('ul')[0].appendChild(newli);
  }
    
})()
