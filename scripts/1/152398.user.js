// ==UserScript==
// @name           Youtube-MP3 button
// @namespace      http://127.0.0.1
// @author         Qb_Master	
// @description    Button to download mp3s directly from youtube when possible, using the youtube-mp3.org service.
// @include        http://www.youtube-mp3.org/*
// @include        https://www.youtube-mp3.org/*
// @include        http://*.youtube.*/*watch*
// @include        https://*.youtube.*/*watch*
// @exclude        http://www.youtube-mp3.org/*.js
// @exclude        https://www.youtube-mp3.org/*.js
// @exclude        http://www.youtube-mp3.org/*.css
// @exclude        https://www.youtube-mp3.org/*.css
// @exclude        http://www.youtube-mp3.org/*.gif
// @exclude        https://www.youtube-mp3.org/*.gif
// @exclude        http://www.youtube-mp3.org/*.png
// @exclude        https://www.youtube-mp3.org/*.png
// @grant          none
// @version        1.30
// ==/UserScript==

// ==ChangeLog==
// @history        1.30 Updated script to work with new Youtube layout. Yay :)
// @history        1.23 Last version didn't work with Opera..does browser check now.
// @history        1.22 Fixed "Security Manager vetoed action" bug in Firefox.
// @history        1.21 Very minor error correction
// @history        1.20 Cleaned up code
// @history        1.15 Disabled download button for 6.5 seconds once clicked
// @history        1.10 Script now downloads link as soon as available rather than waiting 5 seconds.
// @history        1.05 Fixed button hover text
// @history        1.00 Initial release.
// ==/ChangeLog==


//---Adds script to youtube-mp3.org---//
if (navigator.userAgent != 'Opera/9.80 (Windows NT 6.1; U; en) Presto/2.10.289 Version/12.02')
{
  if (document.URL.indexOf("www.youtube-mp3.org") != -1 && unsafeWindow.top != unsafeWindow.self) { 
    var scrSpot = document.createElement('script');
    scrSpot.innerHTML="function haltSearch() { clearInterval(lookForLink); var scrCounter = 0; } function linkSearch() { scrCounter++; if (scrCounter == 200) { alert(\'Could not find link in a timely manner. Page may not be responding.\'); haltSearch(); } var dllink = document.getElementById(\'dl_link\'); var theAs = dllink.getElementsByTagName(\"a\");  if (theAs[0] != null) {  window.location=theAs[0].href;  haltSearch(); }  if (document.getElementById(\'error_text\').innerHTML.length > 5) {  alert(\'Google Inc. may not be allowing you to convert this link to mp3 due to copyright issues. Please try another service.\');  haltSearch();  }  }  var scrCounter = 0; setTimeout(function() { lookForLink = setInterval(linkSearch,100);},500); "
    document.body.insertBefore(scrSpot,document.body.firstChild);
  }
}
else
{
  if (document.URL.indexOf("www.youtube-mp3.org") != -1 && window.top != window.self) { 
    var scrSpot = document.createElement('script');
    scrSpot.innerHTML="function haltSearch() { clearInterval(lookForLink); var scrCounter = 0; } function linkSearch() { scrCounter++; if (scrCounter == 200) { alert(\'Could not find link in a timely manner. Page may not be responding.\'); haltSearch(); } var dllink = document.getElementById(\'dl_link\'); var theAs = dllink.getElementsByTagName(\"a\");  if (theAs[0] != null) {  window.location=theAs[0].href;  haltSearch(); }  if (document.getElementById(\'error_text\').innerHTML.length > 5) {  alert(\'Google Inc. may not be allowing you to convert this link to mp3 due to copyright issues. Please try another service.\');  haltSearch();  }  }  var scrCounter = 0; setTimeout(function() { lookForLink = setInterval(linkSearch,100);},500); "
    document.body.insertBefore(scrSpot,document.body.firstChild);
  }
}

//---Adds script to youtube.com---//
if (document.URL.indexOf(".youtube.") != -1) {

  var container = document.getElementById('watch-like-dislike-buttons');

  if (container && !document.getElementById('watch-download')) {
    var btn = document.createElement('button'),
    lastContainerChild = container.lastElementChild;
    btn.id = 'watch-download';
    btn.setAttribute('type', 'button');
    btn.setAttribute('title', 'By Zabkas');
    btn.setAttribute('data-tooltip', 'Download audio');
    btn.setAttribute('data-tooltip-title', 'Download audio');
    btn.setAttribute('yt-uix-button-content');

    var txt = document.createElement('span');
    txt.setAttribute('id','dlmp3button');      
    txt.appendChild(document.createTextNode('DOWNLOAD MP3'));
    txt.setAttribute('class', 'yt-uix-clickcard-target yt-uix-button yt-uix-button-hh-text yt-uix-tooltip');

    btn.appendChild(txt);

    btn.addEventListener('click', function () {
      if (document.getElementById('ytiframe') != null) { 
        var conElem = document.getElementById("ytiframe");
        conElem.parentNode.removeChild(conElem);
      }
      var videoID = location.search.split('v=')[1].split('&')[0]
      var ifSpot = document.createElement('iframe');
      ifSpot.id = "ytiframe";
      ifSpot.src="http://www.youtube-mp3.org/get?video_id="+videoID;
      document.getElementById('dlmp3button').innerHTML='Vent litt - <img src="http://www.sjomannsforbundet.no/kunder/NSF/cmsno.nsf/mediaresources/loading.gif/$file/loading.gif">';
      btn.disabled=true;
      setTimeout(function() { document.getElementById('dlmp3button').innerHTML='Ferdig - <img src="http://www.dibs.no/files/icoYes.png">'; btn.disabled=false; },6500);
      document.body.insertBefore(ifSpot,document.body.firstChild);
      var tframe = document.getElementById('ytiframe');
      tframe.style.visibility="hidden";
      tframe.style.position="absolute";
      tframe.height="1px";
      tframe.width="1px";
    }, false);
    
    if (lastContainerChild) {
      container.insertBefore(btn, lastContainerChild.nextSibling);
      lastContainerChild.style.marginRight = '0.5em';
    } 
    else {
      container.appendChild(btn);
    }
    
  }
}