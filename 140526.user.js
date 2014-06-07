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
// @version        1.42
// ==/UserScript==

// ==ChangeLog==
// @history        1.42 Script fix: Searches multiple download links if more than one, for proper link (where h unequal to -1).
// @history        1.41 Changed user-agent check to look for any version of Opera..
// @history        1.40 SCRIPT FIX: youtube-mp3's website no longer supported direct redirection to link pages. Updated script to fill in form/autosubmit, then get download link.
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
//if (navigator.userAgent != 'Opera/9.80 (Windows NT 6.1; U; en) Presto/2.10.289 Version/12.02')
if (navigator.userAgent.indexOf('OPR') == null)
{
  if (document.URL.indexOf("www.youtube-mp3.org") != -1 && unsafeWindow.top != unsafeWindow.self) { 
    var scrSpot = document.createElement('script');
    scrSpot.innerHTML="function haltSearch() { clearInterval(lookForLink); var scrCounter = 0; } function haltClick() { clearInterval(clickthelink); var clkCounter = 0; } function clickButton(obj) { var evt = document.createEvent(\"MouseEvents\"); evt.initMouseEvent(\"click\", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); var cancelled = !obj.dispatchEvent(evt); } function gup(py,pz) { if (location.search) { if (pz == undefined) { var parts = location.search.substring(1).split(\'&\'); } if (pz != undefined) { var parts = pz.search.substring(1).split(\'&\'); } for (var i = 0; i <= parts.length; i++) { var nv = null; var nv = parts[i].split(\'=\');  if (nv[0]==py) { return nv[1]; } nv[1]=null; } } return \'nope\'; } function linkSearch() { scrCounter++; if (scrCounter == 400) { alert(\'Could not find link in a timely manner. Page may not be responding.\'); haltSearch(); } var submissive = document.getElementById(\'submit\').value; var dllink = document.getElementById(\'dl_link\'); var theAs = dllink.getElementsByTagName(\"a\"); if (submissive != null && theAs[0] == null) { var ytpointer = gup(\'v\'); document.getElementById(\'youtube-url\').value=\"http://www.youtube.com/watch?v=\"+ytpointer; clickButton(document.getElementById(\'submit\')); } if (theAs[0] != null) { var aslen = theAs.length; for(var j = 0; j <= aslen; j++) { if (gup(\'h\',theAs[j]) != -1) { clickButton(theAs[j]); haltSearch(); } } } if (document.getElementById(\'error_text\').innerHTML.length > 5) { alert(\'Google Inc. may not be allowing you to convert this link to mp3 due to copyright issues. Please try another service.\'); haltSearch(); } } var scrCounter = 0; setTimeout(function() { lookForLink = setInterval(linkSearch,100);},500);"
    document.body.insertBefore(scrSpot,document.body.firstChild);
  }
}
else
{
  if (document.URL.indexOf("www.youtube-mp3.org") != -1 && window.top != window.self) { 
    var scrSpot = document.createElement('script');
    scrSpot.innerHTML="function haltSearch() { clearInterval(lookForLink); var scrCounter = 0; } function haltClick() { clearInterval(clickthelink); var clkCounter = 0; } function clickButton(obj) { var evt = document.createEvent(\"MouseEvents\"); evt.initMouseEvent(\"click\", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); var cancelled = !obj.dispatchEvent(evt); } function gup(py,pz) { if (location.search) { if (pz == undefined) { var parts = location.search.substring(1).split(\'&\'); } if (pz != undefined) { var parts = pz.search.substring(1).split(\'&\'); } for (var i = 0; i <= parts.length; i++) { var nv = null; var nv = parts[i].split(\'=\');  if (nv[0]==py) { return nv[1]; } nv[1]=null; } } return \'nope\'; } function linkSearch() { scrCounter++; if (scrCounter == 400) { alert(\'Could not find link in a timely manner. Page may not be responding.\'); haltSearch(); } var submissive = document.getElementById(\'submit\').value; var dllink = document.getElementById(\'dl_link\'); var theAs = dllink.getElementsByTagName(\"a\"); if (submissive != null && theAs[0] == null) { var ytpointer = gup(\'v\'); document.getElementById(\'youtube-url\').value=\"http://www.youtube.com/watch?v=\"+ytpointer; clickButton(document.getElementById(\'submit\')); } if (theAs[0] != null) { var aslen = theAs.length; for(var j = 0; j <= aslen; j++) { if (gup(\'h\',theAs[j]) != -1) { clickButton(theAs[j]); haltSearch(); } } } if (document.getElementById(\'error_text\').innerHTML.length > 5) { alert(\'Google Inc. may not be allowing you to convert this link to mp3 due to copyright issues. Please try another service.\'); haltSearch(); } } var scrCounter = 0; setTimeout(function() { lookForLink = setInterval(linkSearch,100);},500);"
    document.body.insertBefore(scrSpot,document.body.firstChild);
  }
}

//---Adds script to youtube.com---//
if (document.URL.indexOf(".youtube.") != -1) {

  var container = document.getElementById('watch7-user-header');

  if (container && !document.getElementById('watch-download')) {
    var btn = document.createElement('button'),
    lastContainerChild = container.lastElementChild;
    btn.id = 'watch-download';
    btn.setAttribute('type', 'button');
    btn.setAttribute('title', 'Download audio');
    btn.setAttribute('data-tooltip', 'Download audio');
    btn.setAttribute('data-tooltip-title', 'Download audio');
    btn.setAttribute('class', 'yt-subscription-button yt-uix-button yt-uix-button-subscribe-branded');

    var txt = document.createElement('span');
    txt.setAttribute('id','dlmp3button');      
    txt.appendChild(document.createTextNode('Download MP3'));
    txt.setAttribute('class', 'yt-uix-button-content');

    btn.appendChild(txt);

    btn.addEventListener('click', function () {
      if (document.getElementById('ytiframe') != null) { 
        var conElem = document.getElementById("ytiframe");
        conElem.parentNode.removeChild(conElem);
      }
      var videoID = location.search.split('v=')[1].split('&')[0]
      var ifSpot = document.createElement('iframe');
      ifSpot.id = "ytiframe";
      ifSpot.src="http://www.youtube-mp3.org/?v="+videoID;
      document.getElementById('dlmp3button').innerHTML='Please Wait...';
      btn.disabled=true;
      setTimeout(function() { document.getElementById('dlmp3button').innerHTML='Download MP3'; btn.disabled=false; },6500);
      document.body.insertBefore(ifSpot,document.body.firstChild);
      var tframe = document.getElementById('ytiframe');
      tframe.style.visibility="hidden";
      tframe.style.position="relative";
      tframe.height="2px";
      tframe.width="2px";
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