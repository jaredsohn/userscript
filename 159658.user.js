// ==UserScript==
// @name            ViewTubePlus
// @icon            http://heliotropium.it/ViewTubePornLogo.png
// @author          Artur Lutz
// @version         2014.05.01
// @namespace	    hamsterbacke
// @description	    Addon to the Viewtube UserScript by sebaro that adds support for various sites
// @updateURL       https://heliotropium.it/ViewTubePlus.meta.js
// @downloadURL     https://heliotropium.it/ViewTubePlus.user.js
// @run-at          document-end

// @require         http://heliotropium.it/aes.js
// @require         http://heliotropium.it/md5.js
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require         https://gist.github.com/BrockA/2625891/raw/waitForKeyElements.js
// @include         http://www.xtube.com*
// @include         http://www.redtube.com*
// @include         http://www.youporn.com*
// @include         http://www.youporngay.com*
// @include         http://xhamster.com*
// @include         http://www.xhamster.com*
// @include         http://www.xvideos.com*
// @include         http://www.porntube.com/videos/*
// @include         /^https?://(www\.)?hornoxe\.com/.*/
// @include         /^https?://(www\.)?tube8\.com/.*/(.*/)?.*/([0-9]{7,})/
// @include         /^https?://(www\.)?pornhub\.com/view_video.php\?viewkey=([0-9]+)/
// @include         /^https?://(www\.)?gaytube\.com/media/([0-9]+)/.*/
// @include         /^https?://(www\.)?porn\.to/video/.*/
// @include         /^https?://(www\.)?4tube\.com/videos/([0-9]+)/.*/
// @include         /^https?://(www\.)?beeg\.com/([0-9]+)/
// @include         /^https?://(www\.)?behentai.com/galleries/([0-9]+)/([0-9]+)/.*\.php/
// @include         /^https?://(www\.)?realgfporn\.com/videos/.*\.html/
// @include         /^https?://(www\.)?(movshare\.net|divxstage\.eu|novamov\.com)/(video|file)/.*/
// @include         /^https?://(www\.)?nowvideo\.(co|eu|sx|ch)/video/(.*)/
// @include         /^https?://(www\.)?faststream\.in/.*/
// @include         /^https?://(www\.)?myvideo\.de/watch/([0-9]+)/.*/
// @include         /^https?://(www\.)?(hostingbulk\.com|xvidstage\.com|videozed\.net|filenuke\.com|flashstream\.in|daclips\.in|gorillavid\.in|sharesix\.com)/.*/
// @include         /^https?://(www\.)?streamcloud\.eu/.*/.*\.html/
// @include         /^https?://(www\.)?gayroyal.com/videogalerie/.*/
// @include         /^https?://(www\.)?(sockshare|putlocker)\.com/file/.*/
// @include         /^https?://(www\.)?zalaa\.com/.*/.*\.htm/
// @include         /^https?://(www\.)?primeshare\.tv/download/.*/
// @include         /^https?://(www\.)?rai\.tv/*/
// @include         /^https?://(www\.)?video.repubblica\.it/*/
// include         /^https?://(www\.)?wat\.tv/*/
// @include         /^https?://(www\.)?vporn\.com/.*/.*/([0-9]+)/
// @include         /^https?://(www\.)?manhub\.com/watch/([0-9]+)/.*/
// @include         /^https?://(www\.)?hotpornshow\.com/watch/([0-9]+)/.*\.html/
// @include         /^https?://(www\.)?canalplus\.fr/*/
// @include         /^https?://(www\.)?videos\.tf1\.fr/*/
// @include         /^https?://(www\.)?ina\.fr/*/
// @include         /^https?://(www\.)?nicovideo\.jp/*/
// @include         /^https?://(www\.)?buni\.tv/*/
// @include         /^https?://(www\.)?v\.youku\.com/*/
// @include         /^https?://(www\.)?.*\.iqiyi\.com/*/
// @include         /^https?://(www\.)?sexykarma.com/gonewild/video/*/
// @include         /^https?://(www\.)?.*\.jpopsuki\.tv/video*/
// @include         /^https?://(www\.)?.*\.empflix\.com/videos/*/
// @include         /^https?://(www\.)?.*\.ashemaletube\.com/videos/*/
// @include         /^https?://(www\.)?vplay\.ro/*/
// @include         /^https?://(www\.)?trilulilu\.ro/*/
// @include         /^https?://(www\.)?veehd\.com/*/
// @include         /^https?://(www\.)?svtplay\.se/*/
// @include         /^https?://(www\.)?euronews\.com/*/
// @include         /^https?://(www\.)?flashx\.tv/video/*/
// @include         /^https?://(www\.)?bitshare\.com/files/*/
// @include         /^https?://(www\.)?v\.ifeng\.com/*/
// @include         /^https?://(www\.)?56\.com/*/
// @include         /^https?://(www\.)?telemadrid\.es/*/
// @grant		   GM_xmlhttpRequest
// ==/UserScript==


/*
  
  Copyright (C) 2010 - 2013 Sebastian Luncan

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program. If not, see <http://www.gnu.org/licenses/>.
  
  Website: http://isebaro.com/viewtube
  Contact: http://isebaro.com/contact
  
  Modified by hamsterbacke
  Thanks to Tobias Rupf for sending fixed code fragments and porntube code
*/


(function() {
// ==========Variables========== //
var GM_Debug = 1;

// required for the myvideo decoding
var SBOX = new Array(255);
var GEN_KEY = new Array(255);

// Userscript
var userscript = 'ViewTubePlus';

// Page
var page = {win: window, doc: document, body: document.body, url: window.location.href};

// Player
var player = {};
var feature = {'autoplay': true, 'definition': true, 'container': true, 'widesize': true, 'fullsize': true, 'lightsout': true};
var option = {'plugin': 'Auto', 'autoplay': false, 'autoget': false, 'definition': 'HD', 'container': 'MP4', 'widesize': false, 'fullsize': false};
var plugins = ['Auto', 'Alt', 'HTML5', 'MPEG', 'MP4', 'FLV', 'VLC'];
if (navigator.platform.indexOf('Win') != -1) plugins = plugins.concat(['WMP', 'WMP2', 'QT']);
else if (navigator.platform.indexOf('Mac') != -1) plugins = plugins.concat(['QT']);
else plugins = plugins.concat(['Totem', 'Xine']);
var mimetypes = {
  'MPEG': 'video/mpeg',
  'MP4': 'video/mp4',
  'WebM': 'video/webm',
  'FLV': 'video/x-flv',
  'MOV': 'video/quicktime',
  'M4V': 'video/x-m4v',
  'AVI': 'video/x-msvideo',
  '3GP': 'video/3gpp',
  'WMP': 'application/x-ms-wmp',
  'WMP2': 'application/x-mplayer2',
  'WMV': 'video/x-ms-wmv',
  'QT': 'video/quicktime',
  'MKV': 'video/x-matroska',
  'VLC': 'application/x-vlc-plugin',
  'Totem': 'application/x-totem-plugin',
  'Xine': 'application/x-xine-plugin'
};

// Links
var website = 'http://userscripts.org/scripts/show/159658';
var contact = 'mailto:hamsterbacke@inbox.lv';


// ==========Fixes========== //

// Don't run on frames or iframes
if (window.top != window.self)  return;

// ==========Functions========== //
function createVideoElement (type, content) {
  function createPlayerElement (type, content) {
    player['contentVideo'] = createMyElement (type, content, '', '', '');
    player['contentVideo'].width = player['contentWidth'];
    player['contentVideo'].height = player['contentHeight'];
    styleMyElement (player['contentVideo'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px'});
    modifyMyElement (player['playerContent'], 'div', '', true);
    appendMyElement (player['playerContent'], player['contentVideo']); 
  }
  /* Resolve redirects, if possible */
    //console.log("before " + content);
    try {
    var GM_xml = GM_xmlhttpRequest({
        method: "HEAD",
        url: content,
        synchronous: false,
        onload: function(response) {
          content = (response.finalUrl.indexOf('http') == 0) ? response.finalUrl : content;
          //console.log("after " + content);
          createPlayerElement(type, content);
        },
        onabort: function(response) {
          content = (response.finalUrl.indexOf('http') == 0) ? response.finalUrl : content;
          //console.log("after " + content);
          createPlayerElement(type, content);
        },
        onprogress: function(response) {    // for testing the abort. This is required in Greasemonkey as it will dowload complete content despite the "HEAD" request method!!!
          GM_xml.abort();
        }
      });
    }
    catch(e) { 
      createPlayerElement(type, content);
    }    
}

function createMyElement (type, content, event, action, target) {
  var obj = page.doc.createElement(type);
  if (content) {
    if (type == 'div') obj.innerHTML = content;
    else if (type == 'img') obj.src = content;
    else if (type == 'option') {
      obj.value = content;
      obj.innerHTML = content;
    }
    else if (type == 'video') {
      obj.src = content;
      obj.controls = 'controls';
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure your browser supports HTML5\'s Video and this video codec. If you think it\'s a script issue, please report it <a href="' + contact + '">here</a>.';
    }
    else if (type == 'object') {
      obj.data = content;
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure a video plugin is installed. If you think it\'s a script issue, please report it <a href="' + contact + '">here</a>.<param name="scale" value="tofit"><param name="scale" value="exactfit"><param name="stretchtofit" value="true"><param name="autostart" value="true"><param name="autoplay" value="true">';
    }
    else if (type == 'embed') {
      if (option['plugin'] == 'VLC') obj.setAttribute('target', content);
      else obj.src = content;
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure a video plugin is installed. If you think it\'s a script issue, please report it <a href="' + contact + '">here</a>.<param name="scale" value="tofit"><param name="scale" value="exactfit"><param name="stretchtofit" value="true"><param name="autostart" value="true"><param name="autoplay" value="true">';
    }
  }
  if (type == 'video' || type == 'object' || type == 'embed') {
    if (option['plugin'] == 'Auto' || option['plugin'] == 'Alt' || option['plugin'] == 'HTML5') {
      obj.type = mimetypes[player['videoPlay'].replace(/.*\s/, '')];
    }
    else {
      obj.type = mimetypes[option['plugin']];
    }
    obj.id = 'vtVideo';
  }
  if (type == 'video') {
    obj.controls = 'controls';
    obj.autoplay = 'autoplay';
  }
  if (event == 'change') {
    if (target == 'video') {
      obj.addEventListener ('change', function () {
	player['videoPlay'] = this.value;
	if (player['isGetting']) {
	  modifyMyElement (player['buttonGet'] , 'div', 'Get', false);
	  player['isGetting'] = false;
	}
	if (player['isPlaying']) playMyVideo(option['autoplay']);
      }, false);
    }
    else if (target == 'plugin') {
          obj.addEventListener ('change', function () {
    	option['plugin'] = this.value;
    	setMyOptions ('viewtube_plugin', option['plugin']);
    	if (player['isPlaying']) playMyVideo(true);
          }, false);
    }
  }
  else if (event == 'click') {
    obj.addEventListener ('click', function () {
        if (action == 'close') {
            removeMyElement(page.body, target);
        }
        else if (action == 'logo') {
            page.win.location.href = website;
        }
        else if (action == 'play') {
            playMyVideo(!player['isPlaying']);
        }
        else if (action == 'get') {
            getMyVideo();
        }
        else if (action == 'autoplay') {
            option['autoplay'] = (option['autoplay']) ? false : true;
        	if (option['autoplay']) {
                styleMyElement (player['buttonPlay'], {display: 'none'});
                styleMyElement (player['buttonAutoplay'], {color: '#008080', textShadow: '0px 1px 1px #CCCCCC'});  
                if (!player['isPlaying']) playMyVideo(true);
        	} else {
        	  styleMyElement (player['buttonPlay'], {display: 'inline'});
        	  styleMyElement (player['buttonAutoplay'], {color: '#CCCCCC', textShadow: '0px 0px 0px'});
        	  playMyVideo(false);
        	}
    	setMyOptions ('viewtube_autoplay', option['autoplay']);
        }
        else if (action == 'definition') {
        	for (var itemDef = 0; itemDef < option['definitions'].length; itemDef++) {
                if (option['definitions'][itemDef].match(/[A-Z]/g).join('') == option['definition']) {
        	       var nextDef = (itemDef + 1 < option['definitions'].length) ? itemDef + 1 : 0;
                    option['definition'] = option['definitions'][nextDef].match(/[A-Z]/g).join('');
                    break;
                }
        	}
        	modifyMyElement (player['buttonDefinition'], 'div', option['definition'], false);
        	setMyOptions ('viewtube_definition', option['definition']);
        	if (player['isGetting']) {
                modifyMyElement (player['buttonGet'] , 'div', 'Get', false);
                player['isGetting'] = false;
        	}
    	selectMyVideo ();
    	if (player['isPlaying']) playMyVideo(true);
        }
        else if (action == 'container') {
            for (var itemCont = 0; itemCont < option['containers'].length; itemCont++) {
                if (option['containers'][itemCont] == option['container']) {
                    var nextCont = (itemCont + 1 < option['containers'].length) ? itemCont + 1 : 0;
            	    option['container'] = option['containers'][nextCont];
            	    break;
                }
            }
            modifyMyElement (player['buttonContainer'], 'div', option['container'], false);
        	setMyOptions ('viewtube_container', option['container']);
        	if (player['isGetting']) {
                modifyMyElement (player['buttonGet'] , 'div', 'Get', false);
                player['isGetting'] = false;
            }
            selectMyVideo ();
            if (player['isPlaying']) playMyVideo(true);
        }
        else if (action == 'widesize') {
            option['widesize'] = (option['widesize']) ? false : true;
            setMyOptions ('viewtube_widesize', option['widesize']);
            resizeMyPlayer('widesize');
        }
        else if (action == 'fullsize') {
    	   option['fullsize'] = (option['fullsize']) ? false : true;
    	   setMyOptions ('viewtube_fullsize', option['fullsize']);
    	   resizeMyPlayer('fullsize');
        }
        else if (action == 'lightsout') {
            option['lightsout'] = (option['lightsout']) ? false : true;
            var actualLightsOffDiv = page.doc.getElementById('actualLightsOff');
            if(actualLightsOffDiv) {
                removeMyElement(page.body, actualLightsOffDiv);
                modifyMyElement (player['buttonLightsOut'], 'div', 'lights off', false);
            } else {
                var lightsOutDiv = page.doc.createElement("div");
                lightsOutDiv.style.width = "100%";
                lightsOutDiv.style.height = "100%";
                lightsOutDiv.style.background = "rgba(0,0,0,0.9)";
                //lightsOutDiv.style.zIndex = "999999"; // somehow it's not working with all sites so dont use it
                lightsOutDiv.style.position = "fixed";
                lightsOutDiv.style.top = "0px";
                lightsOutDiv.style.left = "0px";
                lightsOutDiv.setAttribute('id', 'actualLightsOff');
                page.body.appendChild(lightsOutDiv);
                modifyMyElement (player['buttonLightsOut'], 'div', 'lights on', false);
            }
        }
    }, false);
  }
  return obj;
}

function getMyElement (obj, type, from, value, child, content) {
  var getObj, chObj, coObj;
  var pObj = (!obj) ? page.doc : obj;
  if (type == 'body') getObj = pObj.body;
  else {
    if (from == 'id') getObj = pObj.getElementById(value);
    else if (from == 'class') getObj = pObj.getElementsByClassName(value);
    else if (from == 'tag') getObj = pObj.getElementsByTagName(type);
    else if (from == 'ns') getObj = pObj.getElementsByTagNameNS(value, type);
  }
  chObj = (child >= 0) ? getObj[child] : getObj;
  if (content) {
    if (type == 'body' || type == 'div' || type == 'option') coObj = chObj.innerHTML;
    else if (type == 'object') coObj = chObj.data;
    else if (type == 'img' || type == 'video' || type == 'embed') coObj = chObj.src;
    else coObj = chObj.textContent;
    return coObj;
  }
  else {
    return chObj;
  }
}

function modifyMyElement (obj, type, content, clear) {
  if (content) {
    if (type == 'div') obj.innerHTML = content;
    else if (type == 'option') {
      obj.value = content;
      obj.innerHTML = content;
    }
    else if (type == 'object') obj.data = content;
    else if (type == 'img' || type == 'video' || type == 'embed') obj.src = content;
  }
  if (clear) {
    if (obj.hasChildNodes()) {
      while (obj.childNodes.length >= 1) {
        obj.removeChild(obj.firstChild);
      }
    }
  }
}

function styleMyElement (obj, styles) {
  for (var property in styles) {
    if (styles.hasOwnProperty(property)) obj.style[property] = styles[property];
  }
}

function appendMyElement (parent, child) {
  parent.appendChild(child);
}

function removeMyElement (parent, child) {
  parent.removeChild(child);
}

function replaceMyElement (parent, orphan, child) {
//  parent.replaceChild(orphan, child);
  var myNewPlayerWindow = createMyElement ('div', '', '', '', '');
  parent.replaceChild(myNewPlayerWindow, child);
  myNewPlayerWindow.parentNode.insertBefore(orphan,myNewPlayerWindow);
  return (myNewPlayerWindow);
}

function createMyPlayer () {
  /* Get My Options */
  getMyOptions ();

  /* Player Settings */
  player['panelHeight'] = 18;
  player['panelPadding'] = 2;

  /* The Panel */
  var panelWidth = player['playerWidth'] - player['panelPadding'] * 2;
  player['playerPanel'] = createMyElement ('div', '', '', '', '');
  styleMyElement (player['playerPanel'], {width: panelWidth + 'px', height: player['panelHeight'] + 'px', padding: player['panelPadding'] + 'px', backgroundColor: '#F4F4F4', textAlign: 'center'});
  appendMyElement (player['playerWindow'], player['playerPanel']);

  /* Panel Items */
  var panelItemBorder = 1;
  var panelItemHeight = player['panelHeight'] - panelItemBorder * 2;
  
  /* Panel Logo */
  player['panelLogo'] = createMyElement ('div', userscript + ':', 'click', 'logo', '');
  styleMyElement (player['panelLogo'], {height: panelItemHeight + 'px', border: '1px solid #F4F4F4', borderRadius: '3px', padding: '0px', display: 'inline', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
  appendMyElement (player['playerPanel'], player['panelLogo']);

  /* Panel Video Menu */
  player['videoMenu'] = createMyElement ('select', '', 'change', '', 'video');
  styleMyElement (player['videoMenu'], {width: '200px', height: panelItemHeight + 'px', border: '1px solid #F4F4F4', borderRadius: '3px', padding: '0px', display: 'inline', backgroundColor: '#F4F4F4', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', verticalAlign: 'baseline', cursor: 'pointer'});
  appendMyElement (player['playerPanel'], player['videoMenu'] );
  for (var videoCode in player['videoList']) {
    player['videoItem'] = createMyElement ('option', videoCode, '', '', '');
    styleMyElement (player['videoItem'], {padding: '0px', display: 'block', backgroundColor: '#F4F4F4', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement (player['videoMenu'], player['videoItem']);
  }

  /* Panel Plugin Menu */
  player['pluginMenu'] = createMyElement ('select', '', 'change', '', 'plugin');
  styleMyElement (player['pluginMenu'], {width: '70px', height: panelItemHeight + 'px', border: '1px solid #F4F4F4', borderRadius: '3px', padding: '0px', display: 'inline', backgroundColor: '#F4F4F4', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', verticalAlign: 'baseline', cursor: 'pointer'});
  appendMyElement (player['playerPanel'], player['pluginMenu'] );
  for (var p = 0; p < plugins.length; p++) {
    player['pluginItem'] = createMyElement ('option', plugins[p], '', '', '');
    styleMyElement (player['pluginItem'], {padding: '0px', display: 'block', backgroundColor: '#F4F4F4', color: '#336699', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement (player['pluginMenu'], player['pluginItem']);
  }
  player['pluginMenu'].value = option['plugin'];
    
  /* Panel Play Button */
  player['buttonPlay'] = createMyElement ('div', 'Play', 'click', 'play', '');
  styleMyElement (player['buttonPlay'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#37B704', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
  if (option['autoplay']) styleMyElement (player['buttonPlay'], {display: 'none'});
  appendMyElement (player['playerPanel'], player['buttonPlay']);
  
  /* Panel Get Button */
  player['buttonGet'] = createMyElement ('div', 'Get', 'click', 'get', '');
  styleMyElement (player['buttonGet'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#C000C0', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
  appendMyElement (player['playerPanel'], player['buttonGet']);

  /* Panel Autoplay Button */
  if (feature['autoplay']) {
    var bAutoPlay = (player['playerWidth'] > 600) ? 'Autoplay' : 'AP';
    player['buttonAutoplay'] = createMyElement ('div', bAutoPlay, 'click', 'autoplay', '');
    styleMyElement (player['buttonAutoplay'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#CCCCCC', fontSize: '12px', cursor: 'pointer'});
    if (option['autoplay']) styleMyElement (player['buttonAutoplay'], {color: '#008080', textShadow: '0px 1px 1px #CCCCCC'});
    appendMyElement (player['playerPanel'], player['buttonAutoplay']);
  }

  /* Panel Definition Button */
  if (feature['definition']) {
    player['buttonDefinition'] = createMyElement ('div', option['definition'], 'click', 'definition', '');
    styleMyElement (player['buttonDefinition'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#008000', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement (player['playerPanel'], player['buttonDefinition']);
  }

  /* Panel Container Button */
  if (feature['container']) {
    player['buttonContainer'] = createMyElement ('div', option['container'], 'click', 'container', '');
    styleMyElement (player['buttonContainer'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#008000', fontSize: '12px', textShadow: '0px 1px 1px #CCCCCC', cursor: 'pointer'});
    appendMyElement (player['playerPanel'], player['buttonContainer']);
  }

  /* Panel Widesize Button */
  if (feature['widesize']) {
    if (option['widesize']) player['buttonWidesize'] = createMyElement ('div', '&lt;', 'click', 'widesize', '');
    else player['buttonWidesize'] = createMyElement ('div', '&gt;', 'click', 'widesize', '');
    styleMyElement (player['buttonWidesize'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#C05800', fontSize: '12px', textShadow: '1px 1px 2px #CCCCCC', cursor: 'pointer'});
    appendMyElement (player['playerPanel'], player['buttonWidesize']);
  }
  
  /* Panel Fullsize Button */
  if (feature['fullsize']) {
    if (option['fullsize']) player['buttonFullsize'] = createMyElement ('div', '-', 'click', 'fullsize', '');
    else player['buttonFullsize'] = createMyElement ('div', '+', 'click', 'fullsize', '');
    styleMyElement (player['buttonFullsize'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#C05800', fontSize: '12px', textShadow: '1px 1px 2px #CCCCCC', cursor: 'pointer'});
    appendMyElement (player['playerPanel'], player['buttonFullsize']);
  }
    /* Panel lights out Button */
    player['buttonLightsOut'] = createMyElement ('div', 'lights out', 'click', 'lightsout', '');
    styleMyElement (player['buttonLightsOut'], {height: panelItemHeight + 'px', border: '1px solid #CCCCCC', borderRadius: '3px', padding: '0px 5px', display: 'inline', color: '#000000', fontSize: '12px', textShadow: '1px 1px 2px #CCCCCC', cursor: 'pointer'});
    appendMyElement (player['playerPanel'], player['buttonLightsOut']);

  /* The Content */
  player['contentWidth'] = player['playerWidth'];
  player['contentHeight'] = player['playerHeight'] - player['panelHeight'] - player['panelPadding'] * 2;
  player['playerContent'] = createMyElement ('div', '', '', '', '');
  styleMyElement (player['playerContent'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px', backgroundColor: '#F4F4F4', color: '#AD0000', fontSize: '14px', textAlign: 'center'});
  appendMyElement (player['playerWindow'], player['playerContent']);
  
  /* The Video Thumbnail */
  if (player['videoThumb']) {
    player['contentImage'] = createMyElement ('img', player['videoThumb'], 'click', 'play', '');
    styleMyElement (player['contentImage'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px', border: '0px', cursor: 'pointer'});
  }

  /* Disabled Features */
  if (!feature['autoplay']) option['autoplay'] = false;
  if (!feature['widesize']) option['widesize'] = false;
  if (!feature['fullsize']) option['fullsize'] = false;
  
  /* Resize My Player */
  if (option['widesize']) resizeMyPlayer('widesize');
  if (option['fullsize']) resizeMyPlayer('fullsize');
 
  /* Select My Video */
  if (feature['definition'] || feature['container']) selectMyVideo ();
 
  /* Play My Video */ 
  playMyVideo (option['autoplay']);
}

function selectMyVideo () {
  var vdoCont = (option['container'] != 'Any') ? [option['container']] : option['containers'];
  var vdoDef = option['definitions'];
  var vdoList = {};
  for (var vC = 0; vC < vdoCont.length; vC++) {
    if (vdoCont[vC] != 'Any') {
      for (var vD = 0; vD < vdoDef.length; vD++) {
	var format = vdoDef[vD] + ' ' + vdoCont[vC];
	if (!vdoList[vdoDef[vD]]) {
	  for (var vL in player['videoList']) {
	    if (vL == format) {
	      vdoList[vdoDef[vD]] = vL;
	      break;
	    }
	  }
	}
      }
    }
  }
  if (option['definition'] == 'UHD') {
    if (vdoList['Ultra High Definition']) player['videoPlay'] = vdoList['Ultra High Definition'];
    else if (vdoList['Full High Definition']) player['videoPlay'] = vdoList['Full High Definition'];
    else if (vdoList['High Definition']) player['videoPlay'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) player['videoPlay'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'FHD') {
    if (vdoList['Full High Definition']) player['videoPlay'] = vdoList['Full High Definition'];
    else if (vdoList['High Definition']) player['videoPlay'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) player['videoPlay'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'HD') {
    if (vdoList['High Definition']) player['videoPlay'] = vdoList['High Definition'];
    else if (vdoList['Standard Definition']) player['videoPlay'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'SD') {
    if (vdoList['Standard Definition']) player['videoPlay'] = vdoList['Standard Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'LD') {
    if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
    else if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
  }
  else if (option['definition'] == 'VLD') {
    if (vdoList['Very Low Definition']) player['videoPlay'] = vdoList['Very Low Definition'];
    else if (vdoList['Low Definition']) player['videoPlay'] = vdoList['Low Definition'];
  }
  player['videoMenu'].value = player['videoPlay'];
}

function playMyVideo (play) {
  if (play) {
    player['isPlaying'] = true;
    modifyMyElement (player['buttonPlay'], 'div', 'Stop', false);
    styleMyElement (player['buttonPlay'], {color: '#AD0000'});
    if (option['plugin'] == 'HTML5') player['contentVideo'] = createVideoElement('video', player['videoList'][player['videoPlay']]);
    else if (option['plugin'] == 'Alt' || option['plugin'] == 'VLC' || (navigator.appName == 'Netscape' && navigator.userAgent.indexOf("AppleWebKit") == -1)) player['contentVideo'] = createVideoElement ('embed', player['videoList'][player['videoPlay']]);
    else player['contentVideo'] = createVideoElement('object', player['videoList'][player['videoPlay']]);
    player['contentVideo'].width = player['contentWidth'];
    player['contentVideo'].height = player['contentHeight'];
    styleMyElement (player['contentVideo'], {position: 'relative', width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px'});
    modifyMyElement (player['playerContent'], 'div', '', true);
    appendMyElement (player['playerContent'], player['contentVideo']);
  }
  else {
    player['isPlaying'] = false;
    modifyMyElement (player['buttonPlay'], 'div', 'Play', false);
    styleMyElement (player['buttonPlay'], {color: '#37B704'});
    modifyMyElement (player['playerContent'], 'div', '', true);
    if (player['contentImage']) appendMyElement (player['playerContent'], player['contentImage']);
    else showMyMessage ('!thumb');
  }
}

function getMyVideo () {
  var vdoURL = player['videoList'][player['videoPlay']];
  if (player['videoTitle']) {
    var vdoD = ' (' + player['videoPlay'] + ')';
    vdoD = vdoD.replace(/Full High Definition/, 'FHD');
    vdoD = vdoD.replace(/High Definition/, 'HD');
    vdoD = vdoD.replace(/Standard Definition/, 'SD');
    vdoD = vdoD.replace(/Very Low Definition/, 'VLD');
    vdoD = vdoD.replace(/Low Definition/, 'LD');
    vdoD = vdoD.replace(/\sFLV|\sMP4|\sWebM|\s3GP/g, '');
    vdoURL = vdoURL + '&title=' + player['videoTitle'] + vdoD;
  }
  if (option['autoget']) page.win.location.href = vdoURL;
  else {
    var vdoLink = 'Get <a href="' + vdoURL + '">Link</a>';
    modifyMyElement (player['buttonGet'] , 'div', vdoLink, false);
    player['isGetting'] = true;
  }
}

function resizeMyPlayer (size) {
  if (size == 'widesize') {
    if (option['widesize']) {
      modifyMyElement (player['buttonWidesize'], 'div', '&lt;', false);
      var playerWidth = player['playerWideWidth'];
      var playerHeight= player['playerWideHeight'];
      var sidebarMargin = player['sidebarMarginWide'];
    }
    else {
      modifyMyElement (player['buttonWidesize'], 'div', '&gt;', false);
      var playerWidth = player['playerWidth'];
      var playerHeight= player['playerHeight'];
      var sidebarMargin = player['sidebarMarginNormal'];
    }
  }
  else if (size == 'fullsize') {
    if (option['fullsize']) {
      // avoid being stuck with black screen, remove the lights off div first
      if(page.doc.getElementById('actualLightsOff')) removeMyElement(page.body, page.doc.getElementById('actualLightsOff'));
      var playerPosition = 'fixed';
      var playerWidth = page.win.innerWidth || page.doc.documentElement.clientWidth;
      var playerHeight = page.win.innerHeight || page.doc.documentElement.clientHeight;
      if (!player['isFullsize']) {
	if (feature['widesize']) styleMyElement (player['buttonWidesize'], {display: 'none'});
	modifyMyElement (player['buttonFullsize'], 'div', '-', false);
	appendMyElement (page.body, player['playerWindow']);
	styleMyElement (page.body, {overflow: 'hidden'});
	if (!player['resizeListener']) player['resizeListener'] = function() {resizeMyPlayer('fullsize')};
	page.win.addEventListener ('resize', player['resizeListener'], false);
	player['isFullsize'] = true;
      }
    }
    else {
      var playerPosition = 'relative';
      var playerWidth = (option['widesize']) ? player['playerWideWidth'] : player['playerWidth'];
      var playerHeight = (option['widesize']) ? player['playerWideHeight'] : player['playerHeight'];
      if (feature['widesize']) styleMyElement (player['buttonWidesize'], {display: 'inline'});
      modifyMyElement (player['buttonFullsize'], 'div', '+', false);
      appendMyElement (player['playerSocket'], player['playerWindow']);
      styleMyElement (page.body, {overflow: 'auto'});
      page.win.removeEventListener ('resize', player['resizeListener'], false);
      player['isFullsize'] = false;
    }
  }

  /* Resize The Player */
  if (size == 'widesize') {
    styleMyElement (player['sidebarWindow'], {marginTop: sidebarMargin + 'px'});
    styleMyElement (player['playerWindow'], {width: playerWidth + 'px', height: playerHeight + 'px'});
  }
  else styleMyElement (player['playerWindow'], {position: playerPosition, top: '0px', left: '0px', width: playerWidth + 'px', height: playerHeight + 'px'});
  
  /* Resize The Panel */
  var panelWidth = playerWidth - player['panelPadding'] * 2;
  styleMyElement (player['playerPanel'], {width: panelWidth + 'px'});

  /* Resize The Content */
  player['contentWidth'] = playerWidth;
  player['contentHeight'] = playerHeight - player['panelHeight'] - player['panelPadding'] * 2;
  styleMyElement (player['playerContent'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px'});
  if (player['contentImage']) styleMyElement (player['contentImage'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px', border: '0px'});
  if (player['isPlaying']) {
    player['contentVideo'].width = player['contentWidth'];
    player['contentVideo'].height = player['contentHeight'];
    styleMyElement (player['contentVideo'], {width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px'});
  }
}

function cleanMyContent (content, unesc) {
  var myNewContent = content;
  if (unesc) myNewContent = unescape (myNewContent);
  myNewContent = myNewContent.replace (/\\u0025/g,'%');
  myNewContent = myNewContent.replace (/\\u0026/g,'&');
  myNewContent = myNewContent.replace (/\\/g,'');
  myNewContent = myNewContent.replace (/\n/g,'');
  return myNewContent;
}

function getMyContent (url, pattern, clean) {
  var myPageContent, myVideosParse, myVideosContent;
  var isIE = (navigator.appName.indexOf('Internet Explorer') != -1) ? true : false;
  var getMethod = (url != page.url || isIE) ? 'XHR' : 'DOM';
  if (getMethod == 'DOM') {
    myPageContent = getMyElement ('', 'body', '', '', -1, true);
    if (clean) myPageContent = cleanMyContent (myPageContent, true);
    myVideosParse = myPageContent.match (pattern);
    myVideosContent = (myVideosParse) ? myVideosParse[1] : null;
    if (myVideosContent) return myVideosContent;
    else getMethod = 'XHR';
  }
  if (getMethod == 'XHR') {
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url, false);
    xmlHTTP.send();
    if (pattern == 'XML') {
      myVideosContent = xmlHTTP.responseXML;
    }
    else if (pattern == 'TEXT') {
      myVideosContent = xmlHTTP.responseText;
    }
    else {
      myPageContent = xmlHTTP.responseText;
      if (clean) myPageContent = cleanMyContent (myPageContent, true);
      myVideosParse = myPageContent.match (pattern);
      myVideosContent = (myVideosParse) ? myVideosParse[1] : null;
    }
    return myVideosContent;
  }
}

function getMyContentGM (url, pattern, clean, callback) {
  /* since "synchronous: true" is not supported in most addons like scriptish (firefox) and tampermonkey (chrome)
   * there has to be done some workarounds to get it "synchronised". its neccessary because without it the url is fetched much
   * too late and the code is already finished before we have the movie link
   */
  var myPageContent, myVideosParse, myVideosContent;  
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(response) {
        if (pattern == 'TEXT') {
            myVideosContent = response.responseText;
        }
        else {
            myPageContent = response.responseText;
            if (clean) myPageContent = cleanMyContent (myPageContent, true);
            myVideosParse = myPageContent.match (pattern);
            myVideosContent = (myVideosParse) ? myVideosParse[1] : null;
        }
       callback(myVideosContent);
    }
  });
}

function setMyOptions (key, value) {
  try {
    localStorage.setItem(key, value);
  }
  catch(e) {
    var date = new Date();
    date.setTime(date.getTime() + (356*24*60*60*1000));
    var expires = '; expires=' + date.toGMTString();
    page.doc.cookie = key + '=' + value + expires + '; path=/';
  }
}

function getMyOptions () {
  var vtPlugin = 'viewtube_plugin';
  var vtAutoplay = 'viewtube_autoplay';
  var vtDefinition = 'viewtube_definition';
  var vtContainer = 'viewtube_container';
  var vtWidesize = 'viewtube_widesize';
  var vtFullsize = 'viewtube_fullsize';
  try {
    if (localStorage.getItem(vtPlugin)) option['plugin'] = localStorage.getItem(vtPlugin);
    if (localStorage.getItem(vtAutoplay)) option['autoplay'] = localStorage.getItem(vtAutoplay);
    if (localStorage.getItem(vtDefinition)) option['definition'] = localStorage.getItem(vtDefinition);
    if (localStorage.getItem(vtContainer)) option['container'] = localStorage.getItem(vtContainer);
    if (localStorage.getItem(vtWidesize)) option['widesize'] = localStorage.getItem(vtWidesize);
    if (localStorage.getItem(vtFullsize)) option['fullsize'] = localStorage.getItem(vtFullsize);
  }
  catch(e) {
    var cookies = page.doc.cookie.split(';');
    for (var i=0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(vtPlugin) == 0) option['plugin'] = cookie.substring(vtPlugin.length + 1, cookie.length);
      if (cookie.indexOf(vtAutoplay) == 0) option['autoplay'] = cookie.substring(vtAutoplay.length + 1, cookie.length);
      if (cookie.indexOf(vtDefinition) == 0) option['definition'] = cookie.substring(vtDefinition.length + 1, cookie.length);
      if (cookie.indexOf(vtContainer) == 0) option['container'] = cookie.substring(vtContainer.length + 1, cookie.length);
      if (cookie.indexOf(vtWidesize) == 0) option['widesize'] = cookie.substring(vtWidesize.length + 1, cookie.length);
      if (cookie.indexOf(vtFullsize) == 0) option['fullsize'] = cookie.substring(vtFullsize.length + 1, cookie.length);
    }
  }
  option['autoplay'] = (option['autoplay'] == 'true') ? true : false;
  option['widesize'] = (option['widesize'] == 'true') ? true : false;
  option['fullsize'] = (option['fullsize'] == 'true') ? true : false;
}

function showMyMessage (cause, content) {
  var myScriptLogo = createMyElement ('div', userscript, '', '', '');
  styleMyElement (myScriptLogo, {margin: '0px auto', padding: '10px', color: '#666666', fontSize: '24px', textAlign: 'center', textShadow: '#FFFFFF -1px -1px 2px'});
  var myScriptMess = createMyElement ('div', '', '', '', '');
  styleMyElement (myScriptMess, {border: '1px solid #F4F4F4', margin: '5px auto 5px auto', padding: '10px', backgroundColor: '#FFFFFF', color: '#AD0000', textAlign: 'center'});
  if (cause == '!player') {
    var myScriptAlert = createMyElement ('div', '', '', '', '');
    styleMyElement (myScriptAlert, {position: 'absolute', top: '30%', left: '35%', border: '1px solid #F4F4F4', borderRadius: '3px', padding: '10px', backgroundColor: '#F8F8F8', fontSize: '14px', textAlign: 'center', zIndex: '99999'});
    appendMyElement (myScriptAlert, myScriptLogo);
    var myNoPlayerMess = 'Couldn\'t get the player element. Please report it <a href="' + contact + '">here</a>.';
    modifyMyElement (myScriptMess, 'div', myNoPlayerMess, false);
    appendMyElement (myScriptAlert, myScriptMess);
    var myScriptAlertButton = createMyElement ('div', 'OK', 'click', 'close', myScriptAlert);
    styleMyElement (myScriptAlertButton, {width: '100px', border: '3px solid #EEEEEE', borderRadius: '5px', margin: '0px auto', backgroundColor: '#EEEEEE', color: '#666666', fontSize: '18px', textAlign: 'center', textShadow: '#FFFFFF -1px -1px 2px', cursor: 'pointer'});
    appendMyElement (myScriptAlert, myScriptAlertButton);
    appendMyElement (page.body, myScriptAlert);
  }
  else if (cause == '!thumb') {
    var myNoThumbMess = '<br><br>Couldn\'t get the thumbnail for this video. Please report it <a href="' + contact + '">here</a>.';
    modifyMyElement (player['playerContent'], 'div', myNoThumbMess, false);
  }
  else {
    appendMyElement (myPlayerWindow, myScriptLogo);
    if (cause == '!content') {
      var myNoContentMess = 'Couldn\'t get the videos content. Please report it <a href="' + contact + '">here</a>.';
      modifyMyElement (myScriptMess, 'div', myNoContentMess, false);
    }
    else if (cause == '!videos') {
      var myNoVideosMess = 'Couldn\'t get any video. Please report it <a href="' + contact + '">here</a>.';
      modifyMyElement (myScriptMess, 'div', myNoVideosMess, false);
    }
    else if (cause == '!support') {
      var myNoSupportMess = 'This video uses the RTMP protocol and is not supported.';
      modifyMyElement (myScriptMess, 'div', myNoSupportMess, false);
    }
    else if (cause == 'embed') {
      var myEmbedMess = 'This is an embedded video. You can watch it <a href="' + content + '">here</a>.';
      modifyMyElement (myScriptMess, 'div', myEmbedMess, false);
    }
    appendMyElement (myPlayerWindow, myScriptMess);
  }
}

function removeSiteVideos () {
  var h5Videos = getMyElement ('', 'video', 'tag', '', -1, false);
  for (var v = 0; v < h5Videos.length; v++) {
    var h5Video = h5Videos[v];
    if (h5Video.id != 'vtVideoElement') {
      h5Video.addEventListener('play', function() {
	modifyMyElement (h5Video, 'video', 'novideoplease', true);
	if (h5Video.parentNode) removeMyElement (h5Video.parentNode, h5Video);
      }, false);
      return;
    }
  }
  var obVideos = getMyElement ('', 'object', 'tag', '', -1, false);
  for (var v = 0; v < obVideos.length; v++) {
    var obVideo = obVideos[v];
    if (obVideo.id != 'vtObjectElement') {
      modifyMyElement (obVideo, 'object', 'novideoplease', true);
      if (obVideo.parentNode) removeMyElement (obVideo.parentNode, obVideo);
      return;
    }
  }
  var emVideo = getMyElement ('', 'embed', 'tag', '', 0, false);
  if (emVideo) {
    modifyMyElement (emVideo, 'embed', 'novideoplease', true);
    if (emVideo.parentNode) removeMyElement (emVideo.parentNode, emVideo);
    return;
  }
  removeTryouts--;
  if (removeTryouts > 0) page.win.setTimeout(removeSiteVideos, 500);
}

function calculate(arg1, arg2){
	var loc4 = null;
	var loc5 = null;
	var loc6 = null;
	var loc8 = null;
	initialize(arg2);
	var loc1 = 0;
	var loc2 = 0;
	var loc3 = new Array();
	var loc7 = 0;
	while(loc7 < arg1.length){
		loc1 = (loc1 + 1) % 256;
		loc2 = (loc2 + SBOX[loc1]) % 256;
		loc5 = SBOX[loc1];
		SBOX[loc1] = SBOX[loc2];
		SBOX[loc2] = loc5;
		loc8 = (SBOX[loc1] + SBOX[loc2]) % 256;
		loc4 = SBOX[loc8];
		loc6 = arg1[loc7] ^ loc4;
		loc3.push(loc6);
		loc7++;
	}
	return loc3;
}
function initialize(arg1){
	var loc2 = null;
	var loc1 = 0;
	var loc3 = arg1.length;
	var loc4 = 0;
	while(loc4 <= 255){
		GEN_KEY[loc4] = arg1[loc4 % loc3];
		SBOX[loc4] = loc4;
		loc4++;
	}
	loc4 = 0
	while(loc4 <= 255){
		loc1 = (loc1 + SBOX[loc4] + GEN_KEY[loc4]) % 256;
		loc2 = SBOX[loc4];
		SBOX[loc4] = SBOX[loc1];
		SBOX[loc1] = loc2;
		loc4++;
	}
	return;
}
function hexToChars(arg1){
	var loc1 = new Array();
	var loc2 = arg1.substr(0, 2) != "0x" ? 0 : 2;
	while (loc2 < arg1.length){
		loc1.push(parseInt(arg1.substr(loc2, 2), 16));
		loc2 = loc2 + 2;
	}
	return loc1;
}
function charsToStr(arg1){
	var loc1 = new String("");
	var loc2 = 0;
	while (loc2 < arg1.length){
		loc1 = loc1 + String.fromCharCode(arg1[loc2]);
		loc2++;
	}
	return loc1;
}
function strToChars(arg1){
	var loc1 = new Array();
	var loc2 = 0;
	while (loc2 < arg1.length){
		loc1.push(arg1.charCodeAt(loc2));
		loc2++;
	}
	return loc1;
}
function decode_filename(code) {
    var v2 = '@!_GayRoyal.com_hides_filenames_!@';
    var v7 = '';
    var v8 = parseInt(code.substring(0, 2), 16);
    var v1 = 2;
    while (v1 < code.length) {
        var v4 = parseInt(code.substring(v1, v1 + 2), 16);
        var v5 = fixedCharCodeAt(v2.substring((v1 / 2 - 1) % v2.length, (v1 / 2 - 1) % v2.length + 1));
        var v3 = v4 ^ v5 ^ v8;
        v7 += String.fromCharCode(v3);
        v1 += 2;
    }
    return v7;
}
function fixedCharCodeAt (str, idx) {
    // ex. fixedCharCodeAt ('\uD800\uDC00', 0); // 65536
    // ex. fixedCharCodeAt ('\uD800\uDC00', 1); // 65536
    idx = idx || 0;
    var code = str.charCodeAt(idx);
    var hi, low;
    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
        hi = code;
        low = str.charCodeAt(idx+1);
        if (isNaN(low)) {
            throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
        }
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
    }
    if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
        // We return false to allow loops to skip this iteration since should have already handled high surrogate above in the previous iteration
        return false;
        /*hi = str.charCodeAt(idx-1);
        low = code;
        return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;*/
    }
    return code;
}

// ==========Websites========== //

// =====XTUBE===== //
if (page.url.indexOf('xtube.com/watch') != -1) {
	/* Get Player Window */
	var xtubePlayerWindow = getMyElement ('', 'div', 'id', 'flash_holder', -1, false);
	if (!xtubePlayerWindow) {
		showMyMessage ('!player');
	}
	else {
		/* My Player Window */
		var myPlayerWindow = createMyElement ('div', '', '', '', '');
		styleMyElement (myPlayerWindow, {position: 'relative', width: '600px', height: '473px', backgroundColor: '#F4F4F4', zIndex: '99999'});
		modifyMyElement (xtubePlayerWindow, 'div', '', true);
		//appendMyElement (xtubePlayerWindow, myPlayerWindow);
		xtubePlayerWindow = replaceMyElement (xtubePlayerWindow.parentNode, myPlayerWindow, xtubePlayerWindow);
	
    	/* Get Videos Content */
    	var xtubeVideoList = {};
    	var xtubeVideoFormats = {'1': 'Standard Definition MP4'};
    	var xtubeVideoID, xtubeClipID, xtubeRealVideoUrl;
    	var xtubeVideoFound = false;
    	xtubeVideoID = getMyContent (page.url, 'so_s.addVariable\\("video_id",\\s+"(.*?)"\\);', false);
    	xtubeClipID = getMyContent (page.url, 'so_s.addVariable\\("clip_id",\\s+"(.*?)"\\);', false);
    	xtubeRealVideoUrl = getMyContent("http://www.xtube.com/find_video.php?video_id="+ xtubeVideoID +"&clip_id="+ xtubeClipID +"&user_id=undefined", 'TEXT', true);
    	xtubeRealVideoUrl = cleanMyContent (xtubeRealVideoUrl.replace(/&filename=/,""), true);
        var xtubeThumb = xtubeRealVideoUrl.replace("publicvideo","videothumbs");
        if (xtubeThumb.match(/\.flv/)) {
           xtubeThumb = xtubeThumb.replace("videos","video_thumb").replace(".mp4",".flv").split(".flv")[0] + "-0000.jpg";
        } else {
           var xtubeyear = xtubeThumb.replace(/.*videos\//,"").replace(/\/.*/,"").substr(0,4);
            if (xtubeyear >= 2012) {
                xtubeThumb = xtubeThumb.split(xtubeVideoID)[0] + xtubeVideoID + "/240X180/2.jpg";
            } else {
                // no connection to thumb known, but lets show a dummy picture....
                xtubeThumb = xtubeThumb.replace("videos","video_thumb").replace(".mp4",".flv").split(".flv")[0] + "-0000.jpg";
            };
        };

    	if (xtubeVideoID && xtubeClipID) {
    		xtubeVideoFound = true;
    		xtubeVideoList[xtubeVideoFormats[1]] = xtubeRealVideoUrl;
    	}
    	if (xtubeVideoFound) {
    		/* Create Player */
    		player = {
    		'playerSocket': xtubePlayerWindow,
    		'playerWindow': myPlayerWindow,
    		'videoList': xtubeVideoList,
    		'videoPlay': xtubeVideoFormats[1],
    		'videoThumb': xtubeThumb,
    		'playerWidth': 600,
    		'playerHeight': 473,
    		'sidebarMarginNormal': 7
    		};
    		feature['container'] = true;
    		feature['widesize'] = false;
    		feature['autoplay'] = true;
    		feature['fullscreen'] = true;
    		feature['definition'] = false;
    		option['definition'] = 'SD';
    		option['definitions'] = ['Standard Definition'];
    		option['container'] = 'FLV';
    		option['containers'] = ['FLV','Auto'];
    		createMyPlayer ();
    	}
    	else {
    		showMyMessage ('!videos');
    	}
    }
}   
// =====REDTUBE===== //
else if (page.url.search(/redtube.com\/\d+/) != -1) {
    /* Get Player Window */
	var redtubePlayerWindow = getMyElement ('', 'div', 'class', 'videoPlayer', 0, false);
	if (!redtubePlayerWindow) {
		showMyMessage ('!player');
	}
	else {
		/* My Player Window */
		var myPlayerWindow = createMyElement ('div', '', '', '', '');
		styleMyElement (myPlayerWindow, {position: 'relative', width: '584px', height: '468px', backgroundColor: '#F4F4F4', zIndex: '99999'});
		modifyMyElement (redtubePlayerWindow, 'div', '', true);
		appendMyElement (redtubePlayerWindow, myPlayerWindow);
	

    	/* Get Videos Content */
    	var redtubeVideoList = {};
    	var redtubeVideoFormats = {'1': 'Standard Definition MP4', '2': 'Standard Definition FLV'};
    	var redtubeVideoFound = false;
    	var redtubeThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);
    	var redtubeVideoURLmp4 = getMyContent (page.url, 'source\\s+src="(.*?)"', false);
    	var redtubeVideoURLflv = getMyContent (page.url, 'flv_h264_url=(.*?)"', true);
    
    	if (redtubeVideoURLmp4 || redtubeVideoURLflv) {
    		redtubeVideoFound = true;
    		redtubeVideoList[redtubeVideoFormats[1]] = redtubeVideoURLmp4;
    		redtubeVideoList[redtubeVideoFormats[2]] = redtubeVideoURLflv;
    	}
    	if (redtubeVideoFound) {
    		/* Create Player */
    		player = {
    		'playerSocket': redtubePlayerWindow,
    		'playerWindow': myPlayerWindow,
    		'videoList': redtubeVideoList,
    		'videoPlay': redtubeVideoFormats[2],
    		'videoThumb': redtubeThumb,
    		'playerWidth': 584,
    		'playerHeight': 468
    		};
    		feature['container'] = true;
    		feature['widesize'] = false;
    		feature['autoplay'] = true;
    		feature['fullscreen'] = true;
    		feature['definition'] = false;
    		option['definition'] = 'SD';
    		option['definitions'] = ['Standard Definition'];
    		option['container'] = 'MP4';
    		option['containers'] = ['FLV', 'MP4', 'Auto'];
    		createMyPlayer ();
    	}
    	else {
    		showMyMessage ('!videos');
    	}
	}
} 
// =====YOUPORN===== //
else if (page.url.search(/youporn(gay)?.com\/watch/) != -1) {
    /* Get Player Window */
    var youpornPlayerWindow = getMyElement ('', 'div', 'class', 'grid_10', -1, false);
    youpornPlayerWindow = youpornPlayerWindow[0];
    if (!youpornPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '600px', height: '470px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (youpornPlayerWindow, 'div', '', true);
   		appendMyElement (youpornPlayerWindow, myPlayerWindow);

       	/* Get Videos Content */
       	var youpornVideoList = {};
       	var youpornVideoFormats = {'1': 'High Definition MP4', '2': 'Standard Definition MP4', '3': 'Low Definition MP4', '4': 'Standard Definition MPEG'};
       	var youpornVideoFound = false;
       	var youpornThumb = getMyContent (page.url, "image_url\'\\s+:\\s+\'(.*?)'", false);
	
       	var youpornVideoURLTitle = getMyContent (page.url,'\'video_title\'.*: "(.*?)"', false);
	    var youpornVideoURLmp4High = getMyContent (page.url, "var encryptedQuality720URL = \'(.*?)\'", false);
       	if (youpornVideoURLmp4High) youpornVideoURLmp4High = Aes.Ctr.decrypt(youpornVideoURLmp4High, youpornVideoURLTitle, 256);
       	if (youpornVideoURLmp4High) youpornVideoList[youpornVideoFormats[1]] = youpornVideoURLmp4High.replace(/&amp;/g, '&');
       	
	    var youpornVideoURLmp4Standard = getMyContent (page.url, "var encryptedQuality480URL = \'(.*?)\'", false);
       	if (youpornVideoURLmp4Standard) youpornVideoURLmp4Standard = Aes.Ctr.decrypt(youpornVideoURLmp4Standard, youpornVideoURLTitle, 256);
	    if (!youpornVideoURLmp4Standard) youpornVideoURLmp4Standard = getMyContent (page.url, 'span><a\\shref="(http://\\S+480p_370k.*?)"', true);
       	if (youpornVideoURLmp4Standard) youpornVideoList[youpornVideoFormats[2]] = youpornVideoURLmp4Standard.replace(/&amp;/g, '&');
       	
	    var youpornVideoURLmp4Low = getMyContent (page.url, "var encryptedQuality240URL = \'(.*?)\'", false);
       	if (youpornVideoURLmp4Low) youpornVideoURLmp4Low = Aes.Ctr.decrypt(youpornVideoURLmp4Low, youpornVideoURLTitle, 256);
       	if (!youpornVideoURLmp4Low) youpornVideoURLmp4Low = getMyContent (page.url, 'span><a\\shref="(http://\\S+240p.*?)"', true);
       	if (youpornVideoURLmp4Low) youpornVideoList[youpornVideoFormats[3]] = youpornVideoURLmp4Low.replace(/&amp;/g, '&');
 
       	var youpornVideoURLmpeg = getMyContent (page.url, 'span><a\\shref="(.*?480p_1200k.*?)"', true);
       	if (youpornVideoURLmpeg) youpornVideoList[youpornVideoFormats[4]] = youpornVideoURLmpeg.replace(/&amp;/g, '&');

       	if (youpornVideoURLmp4High || youpornVideoURLmp4Standard || youpornVideoURLmp4Low || youpornVideoURLmpeg) youpornVideoFound = true;

       	if (youpornVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': youpornPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': youpornVideoList,
       		'videoPlay': youpornVideoFormats[1],
       		'videoThumb': youpornThumb,
       		'playerWidth': 600,
       		'playerHeight': 470
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = true;
       		option['definitions'] = ['High Definition', 'Standard Definition', 'Low Definition'];
       		option['containers'] = ['MP4', 'MPEG', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   	}
}
// =====xhamster===== //
else if (page.url.indexOf('xhamster.com/movies') != -1) {
    /* Get Player Window */
    var xhamsterPlayerWindow = page.doc.getElementById('playerSwf');
    if (!xhamsterPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   	/* My Player Window */
   	var myPlayerWindow = createMyElement ('div', '', '', '', '');
   	styleMyElement (myPlayerWindow, {position: 'relative', width: '638px', height: '505px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (xhamsterPlayerWindow, 'div', '', true);
    appendMyElement (xhamsterPlayerWindow, myPlayerWindow);

       	/* Get Videos Content */
       	var xhamsterVideoList = {};
       	var xhamsterVideoFormats = {'1': 'Standard Definition MP4', '2': 'Standard Definition FLV'};
       	var xhamsterVideoFound = false;
       	var xhamsterThumb = unescape(getMyContent(page.url, "image\\s*=\\s*(.*?)&", false));
       	//var xhamsterThumb = getMyContent (page.url, 'src="(http://.*?)"\\s+alt="Play', false);
       	var xhamsterVideoURLmp4Standard = getMyContent(page.url, '<a\\s+href="(http://.*?\.mp4)"', true);
       	var xhamsterGetServerInformationForFLV = unescape(getMyContent (page.url, "srv=\\s*(.*?)&", false));
       	var xhamsterVideoURLflv = getMyContent(page.url, "file=\\s*(.*?)&", true);
        xhamsterVideoURLflv = xhamsterGetServerInformationForFLV +"/key="+ xhamsterVideoURLflv;

        if (xhamsterVideoURLmp4Standard || xhamsterVideoURLflv) {
        	xhamsterVideoFound = true;
        	xhamsterVideoList[xhamsterVideoFormats[1]] = xhamsterVideoURLmp4Standard;
       		xhamsterVideoList[xhamsterVideoFormats[2]] = xhamsterVideoURLflv;
       	}
       	if (xhamsterVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': xhamsterPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': xhamsterVideoList,
       		'videoPlay': xhamsterVideoFormats[1],
       		'videoThumb': xhamsterThumb,
       		'playerWidth': 638,
       		'playerHeight': 505
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'FLV', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   	}
}
// =====xvideos===== //
else if (page.url.indexOf('xvideos.com/video') !== -1) {
    /* Get Player Window */
    var xvideosPlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
    if (!xvideosPlayerWindow) {
    	showMyMessage ('!player');
    }

    else {
   	/* My Player Window */
   	var myPlayerWindow = createMyElement ('div', '', '', '', '');
   	styleMyElement (myPlayerWindow, {position: 'relative', width: '588px', height: '456px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   	modifyMyElement (xvideosPlayerWindow, 'div', '', true);
   	appendMyElement (xvideosPlayerWindow, myPlayerWindow);

       	/* Get Videos Content */
       	var xvideosVideoList = {};
       	var xvideosVideoFormats = {'1': 'Standard Definition MP4'};
       	var xvideosVideoFound = false;
       	var xvideosThumb = getMyContent (page.url, 'url_bigthumb=([^&]+?)&', false);
       	var xvideosVideoURL = getMyContent (page.url, 'flv_url=(.*?)&amp;', true);

        if (xvideosVideoURL) {
        	xvideosVideoFound = true;
        	xvideosVideoList[xvideosVideoFormats[1]] = xvideosVideoURL;
       	}
       	if (xvideosVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': xvideosPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': xvideosVideoList,
       		'videoPlay': xvideosVideoFormats[1],
       		'videoThumb': xvideosThumb,
       		'playerWidth': 588,
       		'playerHeight': 456
       		};
       		feature['container'] = false;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
            feature['definition'] = false;
            option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
            option['container'] = 'FLV';
       		option['containers'] = ['FLV', 'Any'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   	}
}
// =====hornoxe===== //
else if (page.url.indexOf('hornoxe.com') != -1) {
    /* Get Player Window */
    var hornoxePlayerWindow = getMyElement ('', 'div', 'id', 'jwplayer-3_wrapper', -1, false);

    if (!hornoxePlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   	/* My Player Window */
   	var myPlayerWindow = createMyElement ('div', '', '', '', '');
   	styleMyElement (myPlayerWindow, {position: 'relative', width: '510px', height: '405px', backgroundColor: '#F4F4F4', zIndex: '99999'});
   	modifyMyElement (hornoxePlayerWindow, 'div', '', true);
   	appendMyElement (hornoxePlayerWindow, myPlayerWindow);

       	/* Get Videos Content */
       	var hornoxeVideoList = {};
       	var hornoxeVideoFormats = {'1': 'Standard Definition MP4'};
       	var hornoxeVideoFound = false;
       	var hornoxeThumb = getMyContent (page.url, 'image":"(.*?)"', true);
       	var hornoxeVideoURLmp4Standard = getMyContent (page.url, 'file":"(http.*?\.mp4)"', true);

        if (hornoxeVideoURLmp4Standard) {
        	hornoxeVideoFound = true;
        	hornoxeVideoList[hornoxeVideoFormats[1]] = hornoxeVideoURLmp4Standard;
       	}
       	if (hornoxeVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': hornoxePlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': hornoxeVideoList,
       		'videoPlay': hornoxeVideoFormats[1],
       		'videoThumb': hornoxeThumb,
       		'playerWidth': 510,
       		'playerHeight': 405
       		};
       		feature['container'] = false;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = false;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   	}
}
// =====tube8===== //
else if (page.url.match(/tube8\.com/)) {
    /* Get Player Window */
    var tube8PlayerWindow = page.doc.getElementById('flvplayer');
    
    if (!tube8PlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '608px', height: '481px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (tube8PlayerWindow, 'div', '', true);
   		appendMyElement (tube8PlayerWindow, myPlayerWindow);

       	/* Get Videos Content */
       	var tube8VideoList = {};
       	var tube8VideoFormats = {'1': 'Standard Definition MP4'};
       	var tube8VideoFound = false;
       	var tube8Thumb = getMyContent (page.url, 'image_url":"(.*?)"', true);
       	var tube8VideoURLmp4Standard = getMyContent(page.url, 'video_url":"(.*?)"', true);
    	var tube8VideoURLTitle = getMyContent(page.url, 'video_title":"(.*?)"', true);
    	tube8VideoURLmp4Standard = Aes.Ctr.decrypt(tube8VideoURLmp4Standard, tube8VideoURLTitle, 256);

        if (tube8VideoURLmp4Standard) {
        	tube8VideoFound = true;
        	tube8VideoList[tube8VideoFormats[1]] = tube8VideoURLmp4Standard;
       	}
       	if (tube8VideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': tube8PlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': tube8VideoList,
       		'videoPlay': tube8VideoFormats[1],
       		'videoThumb': tube8Thumb,
       		'playerWidth': 608,
       		'playerHeight': 481
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		feature['lightsout'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   	}
}
else if (page.url.match(/pornhub\.com/)) {
    /* Get Player Window */
    var pornhubPlayerWindow = getMyElement ('', 'div', 'id', 'player-hd', -1, false);
  if (!pornhubPlayerWindow) {
      var videoDiv = getMyContent(page.url, 'id="(playerDiv_.*?)"', true);
      var pornhubPlayerWindow = getMyElement ('', 'div', 'id', videoDiv, -1, false);
      var pornhubSidebarWindow = getMyElement ('', 'div', 'id', 'rightColVideoPage', -1, false);
      var pornhubPlayerWidth = 610;
      var pornhubPlayerHeight = 480;
  } else {
      var pornhubPlayerWidth = pornhubPlayerWindow.offsetWidth-22;
      var pornhubPlayerHeight = pornhubPlayerWindow.offsetHeight;
      var pornhubSidebarWindow = getMyElement ('', 'div', 'id', 'hd-rightColVideoPage', -1, false);
  }

    if (!pornhubPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');

       	/* Get Videos Content */
       	var pornhubVideoList = {};
       	var pornhubVideoFormats = {'1': 'Standard Definition MP4'};
       	var pornhubVideoFound = false;
        var pornhubVideoContent = getMyContent(page.url, '<iframe src="(.*?)"', true);
        var pornhubThumb = getMyContent(pornhubVideoContent, '<video autoplay="autoplay" id="playerDiv_.*?" poster="(.*?)"', true);
        var pornhubVideoURLmp4Standard = getMyContent(pornhubVideoContent, '<video autoplay="autoplay" id="playerDiv_.*?" src="(.*?)"', true);
        console.log(pornhubVideoURLmp4Standard);
        
        if (pornhubVideoURLmp4Standard != "null") {
           pornhubVideoFound = true;
           pornhubVideoList[pornhubVideoFormats[1]] = pornhubVideoURLmp4Standard;
        }

        if (pornhubPlayerWindow.id == videoDiv) {
          styleMyElement (myPlayerWindow, {position: 'relative', width: pornhubPlayerWidth+'px', height: pornhubPlayerHeight+'px', backgroundColor: '#F4F4F4', zIndex: '999999', marginTop: '30px', marginBottom: '6px'});
          pornhubPlayerWindow.pause();
          pornhubPlayerWindow = replaceMyElement (pornhubPlayerWindow.parentNode, myPlayerWindow, pornhubPlayerWindow);
        } else {
          styleMyElement (myPlayerWindow, {position: 'relative', width: pornhubPlayerWidth+'px', height: pornhubPlayerHeight+'px', backgroundColor: '#F4F4F4', zIndex: '999999'});
          var phVideoElement = getMyElement (pornhubPlayerWindow, 'video', 'tag', '', 0, false);
          phVideoElement.pause();
          modifyMyElement (pornhubPlayerWindow, 'div', '', true);
          styleMyElement (pornhubPlayerWindow, {height: pornhubPlayerHeight+'px', width: pornhubPlayerWidth+'px'});
          appendMyElement (pornhubPlayerWindow, myPlayerWindow);
        }

        if (pornhubVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': pornhubPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': pornhubVideoList,
       		'videoPlay': pornhubVideoFormats[1],
       		'videoThumb': pornhubThumb,
       		'playerWidth': pornhubPlayerWidth,
            'playerHeight': pornhubPlayerHeight,
            'playerWideWidth': 1070,
            'playerWideHeight': 842,
            'sidebarWindow': pornhubSidebarWindow,
            'sidebarMarginNormal': 0,
            'sidebarMarginWide': 898
       		};
       		feature['container'] = true;
       		feature['widesize'] = true;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
            option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   	}
}

else if (page.url.match(/gaytube\.com/)) {
    /* Get Player Window */
    var gaytubePlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
    
    if (!gaytubePlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '540px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (gaytubePlayerWindow, 'div', '', true);
   		appendMyElement (gaytubePlayerWindow, myPlayerWindow);

       	/* Get Videos Content */
       	var gaytubeVideoList = {};
       	var gaytubeVideoFormats = {'1': 'Standard Definition MP4'};
       	var gaytubeVideoFound = false;
       	var gaytubeThumb = getMyContent (page.url, 'poster="(.*?)"', true);
    	var gaytubeVideoURLmp4 = getMyContent(page.url, 'src="(http://.*?)"\\s+controls', false);

        if (gaytubeVideoURLmp4) {
        	gaytubeVideoFound = true;
        	gaytubeVideoList[gaytubeVideoFormats[1]] = gaytubeVideoURLmp4;
       	}
       	if (gaytubeVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': gaytubePlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': gaytubeVideoList,
       		'videoPlay': gaytubeVideoFormats[1],
       		'videoThumb': gaytubeThumb,
       		'playerWidth': 640,
       		'playerHeight': 540
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   	}
}
else if (page.url.match(/porn\.to/)) {
    /* Get Player Window */
    var porntoPlayerWindow = getMyElement ('', 'div', 'id', 'vidwrapper', -1, false);
    
    if (!porntoPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '664px', height: '500px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (porntoPlayerWindow, 'div', '', true);
   		appendMyElement (porntoPlayerWindow, myPlayerWindow);

       	/* Get Videos Content */
       	var porntoVideoList = {};
       	var porntoVideoFormats = {'1': 'Standard Definition MP4'};
       	var porntoVideoFound = false;
       	var porntoThumb = getMyContent (page.url, ".mp4','(http://.*?.jpg)'", false);
    	var porntoVideoURLmp4 = getMyContent(page.url, "'(http://.*?.mp4)',", false);

        if (porntoVideoURLmp4) {
        	porntoVideoFound = true;
        	porntoVideoList[porntoVideoFormats[1]] = porntoVideoURLmp4;
       	}
       	if (porntoVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': porntoPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': porntoVideoList,
       		'videoPlay': porntoVideoFormats[1],
       		'videoThumb': porntoThumb,
       		'playerWidth': 664,
       		'playerHeight': 500
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   	}
}
else if (page.url.match(/4tube\.com/)) {
    waitForKeyElements ("#playerID",
                         function () {
    /* Get Player Window */
    var fourtubePlayerWindow = getMyElement('', 'div', 'id', 'videoPlayer', -1, false);
    
    var fourtubePlayerWindowHTML = cleanMyContent (fourtubePlayerWindow.innerHTML, true).replace(/&amp;/g,"&");
                 
    if (!fourtubePlayerWindow) {
    	showMyMessage ('!player');
    }
    else {   	
        /* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '616px', height: '504px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (fourtubePlayerWindow, 'div', '', true);
   		appendMyElement (fourtubePlayerWindow, myPlayerWindow);
                          
       	/* Get Videos Content */
       	var fourtubeVideoList = {};
        var fourtubeVideoFormats = { '1':'High Definition 720p', '2':'Standard Definition 480p', '3':'Low Definition 360p', '4':'Very Low Definition 240p' };
       	var fourtubeVideoFound = false;
       	var fourtubeThumb = getMyContent (page.url, 'thumb"\\s+src="(.*?)"', true);
    	var fourtubeVideoURLmp4 = getMyContent(page.url, "file=(.*?\.mp4)", true);
        var fourtubeVideo720p = fourtubePlayerWindowHTML.match("<file>(http://cdn\\d+.720p.video.*?\.p720.mp4?.*?)</file>")[1];
        var fourtubeVideo480p = fourtubePlayerWindowHTML.match("<file>(http://cdn\\d+.480p.video.*?\.p480.mp4?.*?)</file>")[1];
        var fourtubeVideo360p = fourtubePlayerWindowHTML.match("<file>(http://cdn\\d+.360p.video.*?\.p360.mp4?.*?)</file>")[1];
        var fourtubeVideo240p = fourtubePlayerWindowHTML.match("<file>(http://cdn\\d+.240p.video.*?\.p240.mp4?.*?)</file>")[1];
        console.log(fourtubeThumb);
        
        if (fourtubeVideo720p) { fourtubeVideoFound = true; fourtubeVideoList[fourtubeVideoFormats[1]] = fourtubeVideo720p; }
        if (fourtubeVideo480p) { fourtubeVideoFound = true; fourtubeVideoList[fourtubeVideoFormats[2]] = fourtubeVideo480p; }
        if (fourtubeVideo360p) { fourtubeVideoFound = true; fourtubeVideoList[fourtubeVideoFormats[3]] = fourtubeVideo360p; }
        if (fourtubeVideo240p) { fourtubeVideoFound = true; fourtubeVideoList[fourtubeVideoFormats[4]] = fourtubeVideo240p; }
        console.log(fourtubeVideo720p);
        console.log(fourtubeVideo480p);
        console.log(fourtubeVideo360p);
        console.log(fourtubeVideo240p);
        
       	if (fourtubeVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': fourtubePlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': fourtubeVideoList,
       		'videoPlay': fourtubeVideoFormats[2],
       		'videoThumb': fourtubeThumb,
       		'playerWidth': 616,
       		'playerHeight': 504
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definitions'] = ['High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
                         });
}
else if (page.url.match(/beeg\.com/)) {
    /* Get Player Window */
    var beegPlayerWindow = getMyElement('', 'div', 'id', 'player_wrapper', -1, false);

    if (!beegPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '854px', height: '512px', backgroundColor: '#F4F4F4', zIndex: '999999'});
        modifyMyElement(beegPlayerWindow, 'div', '', true);
        beegPlayerWindow = replaceMyElement (beegPlayerWindow.parentNode, myPlayerWindow, beegPlayerWindow);
   	
       	/* Get Videos Content */
       	var beegVideoList = {};
       	var beegVideoFormats = {'1': 'Standard Definition MP4'};
       	var beegVideoFound = false;
        var beegVideoID = getMyContent(page.url, 'previewer\.url\'\\s*:\\s*"http://.*?/preview/.*?/(.*?)\.jpg"', true);
       	var beegThumb = "http://cdn.anythumb.com/413x232/" + beegVideoID +".jpg";
    	var beegVideoURLmp4 = getMyContent(page.url, "file':\\s+'(.*?)'", true);
        console.log(beegThumb);
        console.log(beegVideoURLmp4);

        if (beegVideoURLmp4) {
        	beegVideoFound = true;
        	beegVideoList[beegVideoFormats[1]] = beegVideoURLmp4;
       	}
       	if (beegVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': beegPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': beegVideoList,
       		'videoPlay': beegVideoFormats[1],
       		'videoThumb': beegThumb,
       		'playerWidth': 854,
       		'playerHeight': 512
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.match(/behentai\.com/)) {
    /* Get Player Window */
    var behentaiPlayerWindow = getMyElement('', 'div', 'id', 'player', -1, false);
    
    if (!behentaiPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '620px', height: '465px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (behentaiPlayerWindow, 'div', '', true);
   		appendMyElement (behentaiPlayerWindow, myPlayerWindow);
   	
       	/* Get Videos Content */
       	var behentaiVideoList = {};
       	var behentaiVideoFormats = {'1': 'Standard Definition MP4'};
       	var behentaiVideoFound = false;
    	var behentaiVideoURL = getMyContent(page.url, "file','(.*?)'", false);
        behentaiVideoURL = getMyContent(behentaiVideoURL, 'TEXT', true);
        var behentaiThumb = behentaiVideoURL.match('image>(.*?)<\/image>')[1];
        behentaiVideoURL = behentaiVideoURL.match('location>(.*?)<\/location>')[1];

        if (behentaiVideoURL) {
        	behentaiVideoFound = true;
        	behentaiVideoList[behentaiVideoFormats[1]] = behentaiVideoURL;
       	}
       	if (behentaiVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': behentaiPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': behentaiVideoList,
       		'videoPlay': behentaiVideoFormats[1],
       		'videoThumb': behentaiThumb,
       		'playerWidth': 620,
       		'playerHeight': 465
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'FLV';
       		option['containers'] = ['FLV', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.match(/realgfporn\.com/)) {
    /* Get Player Window */
    var realgfpornPlayerWindow = getMyElement('', 'div', 'id', 'mediaspace', -1, false);
    
    if (!realgfpornPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '869px', height: '523px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (realgfpornPlayerWindow, 'div', '', true);
   		appendMyElement (realgfpornPlayerWindow, myPlayerWindow);
   	
       	/* Get Videos Content */
       	var realgfpornVideoList = {};
       	var realgfpornVideoFormats = {'1': 'Standard Definition MP4'};
       	var realgfpornVideoFound = false;
        var realgfpornThumb = null;
    	var realgfpornVideoURL = getMyContent(page.url, "file','(.*?)'", false);

        if (realgfpornVideoURL) {
        	realgfpornVideoFound = true;
        	realgfpornThumb = realgfpornVideoURL.split("/")[(realgfpornVideoURL.split("/").length-1)];
            realgfpornThumb = realgfpornVideoURL.replace("media/videos","media/thumbs").replace(/\.flv/,"") + '/' + realgfpornThumb + '-3.jpg';

        	realgfpornVideoList[realgfpornVideoFormats[1]] = realgfpornVideoURL;
       	}
       	if (realgfpornVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': realgfpornPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': realgfpornVideoList,
       		'videoPlay': realgfpornVideoFormats[1],
       		'videoThumb': realgfpornThumb,
       		'playerWidth': 869,
       		'playerHeight': 523
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.match(/divxstage\.eu/)) {
    var divxstagePlayerWindow;

    /* Get Player Window */
    waitForKeyElements ("#videoPlayer",
        function () {
		divxstagePlayerWindow = document.getElementById('videoPlayer');
		var playerHTML = divxstagePlayerWindow.innerHTML;
		console.log(playerHTML);
	    var width=650;
		var height=450;
	    
		if (!divxstagePlayerWindow) {
			showMyMessage ('!player');
		}
		else {
	       		/* My Player Window */
	       		var myPlayerWindow = createMyElement ('div', '', '', '', '');
	       		styleMyElement (myPlayerWindow, {position: 'relative', width: "\""+width+"px", height: "\""+height+"px", backgroundColor: '#F4F4F4', zIndex: '999999'});
	       	    modifyMyElement (divxstagePlayerWindow, 'div', '', true);
	       	    divxstagePlayerWindow = replaceMyElement (divxstagePlayerWindow.parentNode, myPlayerWindow, divxstagePlayerWindow);
	    
		    /* Get Videos Content */
		   	var divxstageVideoList = {};
		   	var divxstageVideoFormats = {'1': 'Standard Definition FLV'};
		   	var divxstageVideoFound = false;
		    var divxstageThumb = null;
	    		var divxstageDomain = playerHTML.match('domain=(.*?)&')[1];
	    		console.log(divxstageDomain);
	    		var divxstageFile = playerHTML.match('file=(.*?)&')[1];
	    		console.log(divxstageFile);
	    		var divxstageKey = playerHTML.match('filekey=(.*?)&')[1];
	    		console.log(divxstageKey);
	    		var divxstageCID = playerHTML.match('cid=(.*?)&')[1];
	    		console.log(divxstageCID);
			var divxstageVideoURL = getMyContent(divxstageDomain + "/api/player.api.php?cid=" + divxstageCID + "&file=" +divxstageFile + "&key=" + divxstageKey, 'TEXT', false);
	    		console.log(divxstageVideoURL);
	    		divxstageVideoURL = divxstageVideoURL.match('[domain|url]=(.*?)&')[1];
	    		console.log(divxstageVideoURL);
	    
		    if (divxstageVideoURL) {
		      	divxstageVideoFound = true;
		    	divxstageVideoList[divxstageVideoFormats[1]] = divxstageVideoURL;
		   	}
		   	if (divxstageVideoFound) {
		   		/* Create Player */
		   		player = {
		  		'playerSocket': divxstagePlayerWindow,
		  		'playerWindow': myPlayerWindow,
		   		'videoList': divxstageVideoList,
		   		'videoPlay': divxstageVideoFormats[1],
		  		'videoThumb': divxstageThumb,
		   		'playerWidth': width,
		   		'playerHeight': height
		   		};
		   		feature['container'] = true;
		   		feature['widesize'] = false;
		   		feature['autoplay'] = true;
		   		feature['fullscreen'] = true;
		   		feature['definition'] = false;
		   		option['definition'] = 'SD';
		   		option['definitions'] = ['Standard Definition'];
		   		option['container'] = 'FLV';
		   		option['containers'] = ['FLV', 'Auto'];
		   		createMyPlayer ();
		   	}
		   	else {
		   		showMyMessage ('!videos');
		   	}
	       }
    });
}
else if (page.url.match(/movshare\.net/) || page.url.match(/nowvideo\.(eu|co|sx|ch|com)/) || page.url.match(/novamov\.com/)) {
    var movsharePlayerWindow;

    /* Get Player Window */
    //movsharePlayerWindow = getMyElement('', 'div', 'id', 'mediaspace', -1, false);
    waitForKeyElements ("#videoPlayer",
        function () {
            movsharePlayerWindow = document.getElementById('videoPlayer');
            var playerHTML = movsharePlayerWindow.innerHTML;
            console.log(playerHTML);
    
        if(page.url.match(/novamov\.com/)){var width=600;var height=450;}
        else if(page.url.match(/movshare\.net/)){var width=650;var height=450;}
        else {var width=640;var height=450;}
    
        if (!movsharePlayerWindow) {
        	showMyMessage ('!player');
        }
        else {
       		/* My Player Window */
       		var myPlayerWindow = createMyElement ('div', '', '', '', '');
       		styleMyElement (myPlayerWindow, {position: 'relative', width: "\""+width+"px", height: "\""+height+"px", backgroundColor: '#F4F4F4', zIndex: '999999'});
       	    modifyMyElement (movsharePlayerWindow, 'div', '', true);
       	    movsharePlayerWindow = replaceMyElement (movsharePlayerWindow.parentNode, myPlayerWindow, movsharePlayerWindow);
    
            /* Get Videos Content */
           	var movshareVideoList = {};
           	var movshareVideoFormats = {'1': 'Standard Definition FLV'};
           	var movshareVideoFound = false;
            var movshareThumb = null;
    		var movshareDomain = playerHTML.match('domain=(.*?)&')[1];
    		console.log(movshareDomain);
    		var movshareFile = playerHTML.match('file=(.*?)&')[1];
    		console.log(movshareFile);
    		var movshareKey = playerHTML.match('filekey=(.*?)&')[1];
    		console.log(movshareKey);
    		var movshareCID = playerHTML.match('cid=(.*?)&')[1];
    		console.log(movshareCID);
        	var movshareVideoURL = getMyContent(movshareDomain + "/api/player.api.php?cid=" + movshareCID + "&file=" +movshareFile + "&key=" + movshareKey, 'TEXT', false);
    		console.log(movshareVideoURL);
    		movshareVideoURL = decodeURIComponent(movshareVideoURL.match('[domain|url]=(.*?)&')[1]);
    		console.log(movshareVideoURL);
    
            if (movshareVideoURL) {
              	movshareVideoFound = true;
            	movshareVideoList[movshareVideoFormats[1]] = movshareVideoURL;
           	}
           	if (movshareVideoFound) {
           		/* Create Player */
           		player = {
          		'playerSocket': movsharePlayerWindow,
          		'playerWindow': myPlayerWindow,
           		'videoList': movshareVideoList,
           		'videoPlay': movshareVideoFormats[1],
          		'videoThumb': movshareThumb,
           		'playerWidth': width,
           		'playerHeight': height
           		};
           		feature['container'] = true;
           		feature['widesize'] = false;
           		feature['autoplay'] = true;
           		feature['fullscreen'] = true;
           		feature['definition'] = false;
           		option['definition'] = 'SD';
           		option['definitions'] = ['Standard Definition'];
           		option['container'] = 'FLV';
           		option['containers'] = ['FLV', 'Auto'];
           		createMyPlayer ();
           	}
           	else {
           		showMyMessage ('!videos');
           	}
       }
    });
}
else if (page.url.match(/faststream\.in/)) {
    /* check if button check is passed */
    if(!page.doc.getElementById('flvplayer_wrapper')) return;

    /* Get Player Window */
    var faststreamPlayerWindow = page.doc.getElementById('flvplayer_wrapper');

    if (!faststreamPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '720px', height: '480px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (faststreamPlayerWindow, 'div', '', true);
	   	faststreamPlayerWindow = replaceMyElement (faststreamPlayerWindow.parentNode, myPlayerWindow, faststreamPlayerWindow);

       	/* Get Videos Content */
       	var faststreamVideoList = {};
       	var faststreamVideoFormats = {'1': 'Standard Definition MP4'};
       	var faststreamVideoFound = false;
        var faststreamThumb = getMyContent(page.url, 'image:\\s+"(.*?)"', false);
    	var faststreamVideoURL = getMyContent(page.url, 'file:\\s+"(.*?)"', false);
 
	   console.log(faststreamThumb);
	   console.log(faststreamVideoURL);

        if (faststreamVideoURL) {
          	faststreamVideoFound = true;
        	faststreamVideoList[faststreamVideoFormats[1]] = faststreamVideoURL;
       	}
       	if (faststreamVideoFound) {
       		/* Create Player */
       		player = {
      		'playerSocket': faststreamPlayerWindow,
      		'playerWindow': myPlayerWindow,
       		'videoList': faststreamVideoList,
       		'videoPlay': faststreamVideoFormats[1],
      		'videoThumb': faststreamThumb,
       		'playerWidth': 720,
       		'playerHeight': 480
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.match(/myvideo\.de/)) {
    var documentSource = document.body.innerHTML;
    /* get all the infos needed for decrypting the config xml file */
    var myvideoVideoID = documentSource.match("ID:'(.*?)'")[1];
    var myvideoVideoFlashPlayerType = documentSource.match("flash_playertype:'(.*?)'")[1];
    var myvideoVideoAutorun = documentSource.match("autorun:'(.*?)'")[1];
    var myvideoVideoDS = documentSource.match("ds:'(.*?)'")[1];
    var myvideoVideoCountLimit = documentSource.match("_countlimit:'(.*?)'")[1];
    var myvideoVideoURL = decodeURIComponent(documentSource.match("_encxml:'(.*?)'")[1]);
    var myvideoVideoURLswf = documentSource.match("embedSWF\\('(.*?)'")[1];
    var requestURL = myvideoVideoURL + "?ID=" + myvideoVideoID + "&_countlimit=" + myvideoVideoCountLimit + "&flash_playertype=" + myvideoVideoFlashPlayerType + "&autorun=" + myvideoVideoAutorun + "&ds=" + myvideoVideoDS + "&domain=www.myvideo.de";
    
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', requestURL, false);
    xmlHTTP.send();
    myvideoVideoURL = xmlHTTP.responseText;
    myvideoVideoURL = myvideoVideoURL.replace('_encxml=', '');
    
    /* 
    ** the first md5 hash is the masterkey hidden in the ming.swf file
    ** it has to be be concatinated with the md5 hash of the videoID
    ** the rest of the procedure is just taken from the swf file
    */
    var loc1 = hex_md5("c8407a08b3c71ea418ec9dc662f2a56e40cbd6d5a114aa50fb1e1079e17f2b83"+hex_md5(myvideoVideoID));
    var loc2 = hexToChars(myvideoVideoURL);
    var loc3 = strToChars(loc1); 
    var loc4 = calculate(loc2, loc3);
    myvideoVideoURL = charsToStr(loc4);
    myvideoVideoURL = decodeURIComponent(myvideoVideoURL);
    console.log(myvideoVideoURL);
    //(myvideoVideoURL.match("connectionurl='(.*?)'")[1] != null) ? ;
    
    var myvideoVideoURLrtmp = myvideoVideoURL.match("connectionurl='(.*?)'")[1];
    var myvideoVideoURLserver = myvideoVideoURL.match("<destserver>(.*?)</destserver>")[1];
    var myvideoVideoURLsource = myvideoVideoURL.match("source='(.*?)'")[1];
    var myvideoVideoURLVideoPage = myvideoVideoURLserver + myvideoVideoURL.match("video_link='(.*?)'")[1];
    var myvideoVideoURLTitle = myvideoVideoURL.match("title='(.*?)'")[1];
    var myvideoVideoURLextension = myvideoVideoURLsource.split('.')[1];
    var myvideoVideoURLpath = myvideoVideoURL.match("path='(.*?)'")[1];
    var myvideoThumb = myvideoVideoURL.match("preview='(.*?)'")[1];
    console.log(myvideoVideoURLrtmp);
    console.log(myvideoVideoURLserver);
    console.log(myvideoVideoURLsource);
    console.log(myvideoVideoURLVideoPage);
    console.log(myvideoVideoURLTitle);
    console.log(myvideoVideoURLextension);
    console.log(myvideoVideoURLpath);
    
    if (myvideoVideoURL.match(/(.*rtmp.*)/)){
        
        var allComined = myvideoVideoURLrtmp + " swfVfy=" + myvideoVideoURLswf + "  tcUrl=" + myvideoVideoURLrtmp + " --swfVfy=" + myvideoVideoURLswf + " pageUrl=" + myvideoVideoURLVideoPage + " playpath=" + myvideoVideoURLsource;
        var allCominedrtmpdump = "rtmpdump -r " + myvideoVideoURLrtmp + " --tcUrl=" + myvideoVideoURLrtmp + " --swfVfy=" + myvideoVideoURLswf + " --pageUrl=" + myvideoVideoURLVideoPage + " --playpath=" + myvideoVideoURLsource + " --live -o \"" + myvideoVideoURLTitle+"."+myvideoVideoURLextension + "\"";
        
        /* Display a download button */
        var downloadButton = document.createElement( 'input' );
        with( downloadButton ) {
          setAttribute( 'onclick', 'triggerOnClick();' );
          setAttribute( 'value', 'Download' );
          setAttribute( 'type', 'button' );
        }
        downloadButton.onclick = function() { alert(allCominedrtmpdump) };
        
        window.onload = function () {
          // Wait for the DOM to build and append the button on the page
          downloadButton.className = "vds_video_actions_btn vds_video_actions_btn_no_bg globalBxBorder globalBx";
          document.getElementById('vds_video_actions_box').appendChild(downloadButton);
        }
    } else if (!myvideoVideoURL.match(/(.*f4m.*)/)){
        /*
        ** We have found a non rtmpe video. A player can stream that file.
        ** so lets get the player window
        */
        var myvideoPlayerWindow = page.doc.getElementById('video_player_swf');
        if (!myvideoPlayerWindow) myvideoPlayerWindow = page.doc.getElementById('series_player_swf');

        if (!myvideoPlayerWindow) {
            showMyMessage ('!player');
        }
        else {
            /* My Player Window */
            var myPlayerWindow = createMyElement ('div', '', '', '', '');
            styleMyElement (myPlayerWindow, {position: 'relative', width: '611px', height: '383px', backgroundColor: '#F4F4F4'});
            modifyMyElement (myvideoPlayerWindow, 'div', '', true);
            myvideoPlayerWindow = replaceMyElement (myvideoPlayerWindow.parentNode, myPlayerWindow, myvideoPlayerWindow);
            
            /* concat video link from decrypted xml file */
            var myvideoVideoList = {};
           	var myvideoVideoFormats = {'1': 'Standard Definition MP4'};
           	var myvideoVideoFound = false;
            myvideoVideoURL = myvideoVideoURLpath + myvideoVideoURLsource;
            console.log(myvideoVideoURL);
            
            if (myvideoVideoURL) {
        	   myvideoVideoFound = true;
        	   myvideoVideoList[myvideoVideoFormats[1]] = myvideoVideoURL;
       	    }
       	    if (myvideoVideoFound) {
           		/* Create Player */
           		player = {
           		'playerSocket': myvideoPlayerWindow,
           		'playerWindow': myPlayerWindow,
           		'videoList': myvideoVideoList,
           		'videoPlay': myvideoVideoFormats[1],
           		'videoThumb': myvideoThumb,
           		'playerWidth': 611,
           		'playerHeight': 383
           		};
           		feature['container'] = true;
           		feature['widesize'] = false;
           		feature['autoplay'] = true;
           		feature['fullscreen'] = true;
           		feature['definition'] = false;
           		option['definition'] = 'SD';
           		option['definitions'] = ['Standard Definition'];
           		option['container'] = 'Auto';
           		option['containers'] = ['FLV', 'MP4', 'Auto'];
           		createMyPlayer ();
           	}
           	else {
           		showMyMessage ('!videos');
           	}
        }
    }
}
else if (page.url.match(/hostingbulk\.com/) || page.url.match(/xvidstage\.com/) || page.url.match(/videozed\.net/) || page.url.match(/filenuke\.com/) || page.url.match(/flashstream\.in/) || page.url.match(/daclips\.in/) || page.url.match(/gorillavid\.in/) || page.url.match(/zalaa\.com/) || page.url.match(/sharesix\.com/)) {
    /* check if button check is passed */
    if(!document.getElementById('player_code')) return;
    if(page.url.match(/xvidstage\.com/)){var width=640;var height=340;}
    else if(page.url.match(/daclips\.in/)){var width=960;var height=511;}
    else if(page.url.match(/gorillavid\.in/)){var width=960;var height=480;}
    else if(page.url.match(/zalaa\.com/)){var width=700;var height=389;}
    else if(page.url.match(/sharesix\.com/)){var width=728;var height=400;}
    else if(page.url.match(/hostingbulk\.com/)){var width=1024;var height=562;}
    else{var width=730;var height=420;}
    
    var xvidstagePlayerWindow;
    /* Get Player Window */
    waitForKeyElements ("div#player_code",
    function () {
        //if(!document.getElementById('vid_play')) document.getElementById('vid_play').click();
        xvidstagePlayerWindow = document.getElementById('player_code');
        if( page.url.match(/filenuke\.com/) ) var player_code_innerHTML = xvidstagePlayerWindow.innerHTML;
        console.log(player_code_innerHTML);
        
        if (!xvidstagePlayerWindow) {
        	showMyMessage ('!player');
        }
        else {
            /* Get Videos Content */
            if( page.url.match(/hostingbulk\.com/) ) var hosting_html = document.body.innerHTML;
           	var xvidstageVideoList = {};
           	var xvidstageVideoFormats = {'1': 'Standard Definition'};
           	var xvidstageVideoFound = false;
            var xvidstageThumb = getMyContent(page.url, 'value="(http://.*\.jpg)"', false);
            if(xvidstageThumb != null) xvidstageThumb = xvidstageThumb.split('">')[0];
            if( page.url.match(/sharesix\.com/) ) xvidstageThumb = getMyContent(page.url, 'image=(http://.*?\.jpg)', false);
            if( page.url.match(/daclips\.in/) ) xvidstageThumb = getMyContent(page.url, 'image:\\s*"(http://.*?\.jpg)"\\s*', false);
            if( page.url.match(/gorillavid\.in/) ) xvidstageThumb = getMyContent(page.url, 'image:\\s+"(http://.*?\.jpg)"', false);
            if( page.url.match(/hostingbulk\.com/) ) xvidstageThumb = hosting_html.match('image=(.*?\.jpg)&')[1]; xvidstageThumb = decodeURIComponent(xvidstageThumb);

        	var xvidstageVideoURL = getMyContent(page.url, '(http://.*?\/video.{4})', false);
        	if( xvidstageVideoURL != null ) xvidstageVideoURL = xvidstageVideoURL.split('="')[18];
        	if( page.url.match(/sharesix\.com/) ) xvidstageVideoURL = getMyContent(page.url, 'file=(http://.*?\/video.{4})', false);
        	if( page.url.match(/daclips\.in/) ) xvidstageVideoURL = getMyContent(page.url, 'file:\\s*"(http://.*?\/.*?.{4})"\\s*', false);
        	if( page.url.match(/gorillavid\.in/) ) xvidstageVideoURL = getMyContent(page.url, 'file:\\s+"(http://.*?\/.*?\/.*?.{4})"', false);
        	if( page.url.match(/zalaa\.com/) ) xvidstageVideoURL = getMyContent(page.url, 'value="(http://.*?\/.*?\/.*?\..{3})"', false);
            if( page.url.match(/hostingbulk\.com/) ) xvidstageVideoURL = hosting_html.match('file=(.*?video\..{3})&')[1]; xvidstageVideoURL = decodeURIComponent(xvidstageVideoURL);
        	if( page.url.match(/filenuke\.com/ ) && player_code_innerHTML != null ) {
        	   xvidstageVideoURL = player_code_innerHTML.match('file=(http://.*?\/video\..{3})');
        	   if (xvidstageVideoURL) xvidstageVideoURL = xvidstageVideoURL[1];
        	}
        	if (xvidstageVideoURL == null && player_code_innerHTML != null)  {
        	   xvidstageVideoURL = player_code_innerHTML.match('param\\s+name="src"\\s+value="(http://.*?\/video.{4})"');
        	   if (xvidstageVideoURL) xvidstageVideoURL = xvidstageVideoURL[1];
        	}
        	
    
       		/* My Player Window */
       		var myPlayerWindow = createMyElement ('div', '', '', '', '');
       		styleMyElement (myPlayerWindow, {position: 'relative', width: "\""+width+"px", height: "\""+height+"px", backgroundColor: '#F4F4F4', zIndex: '999999'});
       		modifyMyElement (xvidstagePlayerWindow, 'div', '', true);
       		xvidstagePlayerWindow = replaceMyElement (xvidstagePlayerWindow.parentNode, myPlayerWindow, xvidstagePlayerWindow);
        	
            console.log(xvidstageThumb);
            console.log(xvidstageVideoURL);
    
            if (xvidstageVideoURL) {
              	xvidstageVideoFound = true;
            	xvidstageVideoList[xvidstageVideoFormats[1]] = xvidstageVideoURL;
           	}
           	if (xvidstageVideoFound) {
           		/* Create Player */
           		player = {
          		'playerSocket': xvidstagePlayerWindow,
          		'playerWindow': myPlayerWindow,
           		'videoList': xvidstageVideoList,
           		'videoPlay': xvidstageVideoFormats[1],
          		'videoThumb': xvidstageThumb,
           		'playerWidth': width,
           		'playerHeight': height
           		};
           		feature['container'] = true;
           		feature['widesize'] = false;
           		feature['autoplay'] = true;
           		feature['fullscreen'] = true;
           		feature['definition'] = false;
           		option['definition'] = 'SD';
           		option['definitions'] = ['Standard Definition'];
           		option['container'] = 'Auto';
           		option['containers'] = ['MP4', 'Auto'];
           		createMyPlayer ();
           	}
           	else {
           		showMyMessage ('!videos');
           	}
       }
    });
}
else if (page.url.match(/streamcloud\.eu/)) {
    /* check if button check is passed */
    if(!document.getElementById('player_code')) return;
    
    /* Get Player Window */
    var streamcloudPlayerWindow = document.getElementById('player_code');

    if (!streamcloudPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
        /* Get Videos Content */
       	var streamcloudVideoList = {};
       	var streamcloudVideoFormats = {'1': 'Standard Definition MP4'};
       	var streamcloudVideoFound = false;
        var streamcloudThumb = getMyContent(page.url, 'image:\\s+"(.*?)"', false);
    	var streamcloudVideoURL = getMyContent(page.url, 'file:\\s+"(.*?)"', false);
        
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '900px', height: '537px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (streamcloudPlayerWindow, 'div', '', true);
		streamcloudPlayerWindow = replaceMyElement (streamcloudPlayerWindow.parentNode, myPlayerWindow, streamcloudPlayerWindow);
    	
        console.log(streamcloudThumb);
        console.log(streamcloudVideoURL);

        if (streamcloudVideoURL) {
          	streamcloudVideoFound = true;
        	streamcloudVideoList[streamcloudVideoFormats[1]] = streamcloudVideoURL;
       	}
       	if (streamcloudVideoFound) {
       		/* Create Player */
       		player = {
      		'playerSocket': streamcloudPlayerWindow,
      		'playerWindow': myPlayerWindow,
       		'videoList': streamcloudVideoList,
       		'videoPlay': streamcloudVideoFormats[1],
      		'videoThumb': streamcloudThumb,
       		'playerWidth': 900,
       		'playerHeight': 537
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.match(/gayroyal\.com/)) {
    /* Get Player Window */
    var gayroyalPlayerWindow = page.doc.getElementById('myplayer');

    if (!gayroyalPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
        /* Get Videos Content */
       	var gayroyalVideoList = {};
       	var gayroyalVideoFormats = {'1': 'Standard Definition MP4'};
       	var gayroyalVideoFound = false;
        var gayroyalThumb = null;
    	var gayroyalVideoURL = getMyContent(page.url, "file:\\s+'(.*?)'", false);
    	//gayroyalVideoURL = decode_filename(gayroyalVideoURL);
        //http://gayroyal.com/videogalerie/flvplayer.swf?efile=275196 can always be watched without limitations
        //http://max.gayroyal.com/flash.flv?id=160933 <- always can be downloaded
        //marvin.gayroyal.com for thumbs
        //max.gayroyal.com for videos
        
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '480px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (gayroyalPlayerWindow, 'div', '', true);
   		gayroyalPlayerWindow = replaceMyElement (gayroyalPlayerWindow.parentNode, myPlayerWindow, gayroyalPlayerWindow);
    	
        console.log(gayroyalThumb);
        console.log(gayroyalVideoURL);

        if (gayroyalVideoURL) {
          	gayroyalVideoFound = true;
        	gayroyalVideoList[gayroyalVideoFormats[1]] = gayroyalVideoURL;
       	}
       	if (gayroyalVideoFound) {
       		/* Create Player */
       		player = {
      		'playerSocket': gayroyalPlayerWindow,
      		'playerWindow': myPlayerWindow,
       		'videoList': gayroyalVideoList,
       		'videoPlay': gayroyalVideoFormats[1],
      		'videoThumb': gayroyalThumb,
       		'playerWidth': 640,
       		'playerHeight': 480
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.match(/sockshare\.com/) || page.url.match(/putlocker\.com/)) {
    var documentSource = document.body.innerHTML;
    
    if(page.url.match(/sockshare\.com/)){var width=960;var height=405;} else if(page.url.match(/putlocker\.com/)){var width=960;var height=542;}
    /* check if button check is passed */
    if(!page.doc.getElementsByClassName('video_player').item(0)) return;
    
    /* Get Player Window */
    var socksharePlayerWindow = page.doc.getElementsByClassName('video_player').item(0);
    console.log(socksharePlayerWindow);

    if (!socksharePlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
        /* Get Videos Content */
       	var sockshareVideoList = {};
       	var sockshareVideoFormats = {'1': 'Standard Definition FLV', '2': 'Standard Definition Original'};
       	var sockshareVideoFound = false;
        var sockshareThumb = getMyContent(page.url, '(http://.*?/previews/.*?.jpg)', false);
    	var sockshareVideoStreamHash = documentSource.match("stream=(.*?)&")[1];
        var sockshareVideoURL = getMyContent("http://"+ document.location.hostname +"/get_file.php?stream="+sockshareVideoStreamHash, "TEXT", false);
        sockshareVideoURL = sockshareVideoURL.match('url="(http://.*?\.flv)"')[1];
        sockshareVideoURL = sockshareVideoURL.replace(/amp;/g,'');
        
        var sockshareVideoURLOriginal = getMyContent("http://"+ document.location.hostname +"/get_file.php?stream="+sockshareVideoStreamHash+"&original=1", "TEXT", false);
        sockshareVideoURLOriginal = sockshareVideoURLOriginal.match('url="(http://.*?\..{3})"')[1];
        sockshareVideoURLOriginal = sockshareVideoURLOriginal.replace(/amp;/g,'');
        console.log(sockshareThumb);
        console.log(sockshareVideoURL);
        console.log(sockshareVideoURLOriginal);
        
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: "\""+width+"px", height: "\""+height+"px", backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (socksharePlayerWindow, 'div', '', true);
   		socksharePlayerWindow = replaceMyElement (socksharePlayerWindow.parentNode, myPlayerWindow, socksharePlayerWindow);
    	
        if (sockshareVideoURL) {
          	sockshareVideoFound = true;
        	sockshareVideoList[sockshareVideoFormats[1]] = sockshareVideoURL;
        	sockshareVideoList[sockshareVideoFormats[2]] = sockshareVideoURLOriginal;
       	}
       	if (sockshareVideoFound) {
       		/* Create Player */
       		player = {
      		'playerSocket': socksharePlayerWindow,
      		'playerWindow': myPlayerWindow,
       		'videoList': sockshareVideoList,
       		'videoPlay': sockshareVideoFormats[1],
      		'videoThumb': sockshareThumb,
       		'playerWidth': width,
       		'playerHeight': height
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition FLV'];
       		option['container'] = 'FLV';
       		option['containers'] = ['FLV', 'MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.match(/primeshare\.tv/)) {
    /* check if button check is passed */
    if(!page.doc.getElementById('player_api')) return;
    
    /* Get Player Window */
    var primesharePlayerWindow = page.doc.getElementById('player_api');

    if (!primesharePlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
        /* Get Videos Content */
       	var primeshareVideoList = {};
       	var primeshareVideoFormats = {'1': 'Standard Definition MP4'};
       	var primeshareVideoFound = false;
        var primeshareThumb = null;
    	var primeshareVideoURL = getMyContent(page.url, 'url:\\s+\'(http://.*?/.*?/.*?/[0-9]+)\'', false);

   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '941px', height: '518px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (primesharePlayerWindow, 'div', '', true);
		primesharePlayerWindow = replaceMyElement (primesharePlayerWindow.parentNode, myPlayerWindow, primesharePlayerWindow);
    	
        console.log(primeshareThumb);
        console.log(primeshareVideoURL);

        if (primeshareVideoURL) {
          	primeshareVideoFound = true;
        	primeshareVideoList[primeshareVideoFormats[1]] = primeshareVideoURL;
       	}
       	if (primeshareVideoFound) {
       		/* Create Player */
       		player = {
      		'playerSocket': primesharePlayerWindow,
      		'playerWindow': myPlayerWindow,
       		'videoList': primeshareVideoList,
       		'videoPlay': primeshareVideoFormats[1],
      		'videoThumb': primeshareThumb,
       		'playerWidth': 941,
       		'playerHeight': 518
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition MP4'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
// =====RAI===== thanks to sebaro for the code //
if (page.url.indexOf('rai.tv/dl/RaiTV') != -1) {

  /* Get Player Window */
  var raiPlayerWindow = getMyElement ('', 'div', 'class', 'Player', 0, false);
  if (!raiPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */ 
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '648px', height: '400px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (raiPlayerWindow, 'div', '', true);
    appendMyElement (raiPlayerWindow, myPlayerWindow);

    /* Get Video Thumb */
    var raiVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

    /* Get Videos Content */
    var raiVideoList = {};
    var raiVideoFound, raiDefaultVideo;
    var raiVideoDef = getMyContent (page.url, 'videoURL\\s+=\\s+"(.*?)";', true);
    var raiVideoMP4 = getMyContent (page.url, 'videoURL_MP4\\s+=\\s+"(.*?)";', true);
    if (raiVideoMP4) {
      raiVideoFound = true;
      raiVideoList['Low Definition MP4'] = raiVideoMP4;
      raiDefaultVideo = 'Low Definition MP4';
    }
    if (raiVideoDef && raiVideoDef != raiVideoMP4) {
      if (!raiVideoFound) raiVideoFound = true;
      raiVideoList['Low Definition WMV'] = raiVideoDef;
      if (!raiDefaultVideo) raiDefaultVideo = 'Low Definition WMV';
    }

    if (raiVideoFound) {
      /* Get Watch Sidebar */
      var raiSidebarWindow = getMyElement ('', 'div', 'id', 'evidenzaSpalla', -1, false);
      
      /* Create Player */
      player = {
	'playerSocket': raiPlayerWindow,
	'playerWindow': myPlayerWindow,
	'videoList': raiVideoList,
	'videoPlay': raiDefaultVideo,
	'videoThumb': raiVideoThumb,
	'playerWidth': 648,
	'playerHeight': 400,
	'playerWideWidth': 970,
	'playerWideHeight': 510,
	'sidebarWindow': raiSidebarWindow,
	'sidebarMarginNormal': 0,
	'sidebarMarginWide': 530
      };
      feature['widesize'] = false;
      feature['definition'] = false;
      option['definition'] = 'LD';
      option['definitions'] = ['Low Definition'];
      option['containers'] = ['MP4', 'WMV', 'Any'];
      createMyPlayer ();
    }
    else {
      showMyMessage ('!videos');
    }
  }
  
}
// =====Repubblica===== thanks to sebaro for the code //
else if (page.url.indexOf('video.repubblica.it') != -1) {
    // there is a intro when entering the website. avoid displaying error message that video element can't be fetched
    if(!getMyElement ('', 'div', 'id', 'player', -1, false)) return;
    
  /* Get Player Window */
  var repPlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
  if (!repPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */ 
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '360px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (repPlayerWindow, 'div', '', true);
    appendMyElement (repPlayerWindow, myPlayerWindow);

    /* Get Video Thumb */
    var repVideoThumb = getMyContent (page.url, '\'param\',\\s+\'image\',\\s+\'(.*?)\'', false);

    /* Get Videos Content */
    var repVideoList = {};
    var repVideoFound, repDefaultVideo;
    var repVideo = getMyContent (page.url, '\'format\',\\s+\'mp4\',\\s+\'(.*?)\'', true);
    if (repVideo) {
      repVideoFound = true;
      repVideoList['Low Definition MP4'] = repVideo;
      repDefaultVideo = 'Low Definition MP4';
    }

    if (repVideoFound) {
      /* Get Watch Sidebar */
      var repSidebarWindow = getMyElement ('', 'div', 'id', 'contB', -1, false);
      
      /* Create Player */
      player = {
	'playerSocket': repPlayerWindow,
	'playerWindow': myPlayerWindow,
	'videoList': repVideoList,
	'videoPlay': repDefaultVideo,
	'videoThumb': repVideoThumb,
	'playerWidth': 640,
	'playerHeight': 360,
	'playerWideWidth': 970,
	'playerWideHeight': 510,
	'sidebarWindow': repSidebarWindow,
	'sidebarMarginNormal': 0,
	'sidebarMarginWide': 530
      };
      feature['definition'] = false;
      feature['container'] = false;
      option['definition'] = 'LD';
      option['definitions'] = ['Low Definition'];
      option['containers'] = ['MP4'];
      createMyPlayer ();
    }
    else {
      showMyMessage ('!videos');
    }
  }
}
/* =====Wat.TV===== //
else if (page.url.indexOf('wat.tv/video') != -1) {

  // Remove Top Ads 
  var watTopAds = getMyElement ('', 'div', 'id', 'pub_top', -1, false);
  if (watTopAds) modifyMyElement (watTopAds, 'div', '', true);

  // Get Player Window
  var watPlayerWindow = getMyElement ('', 'div', 'id', 'video-container', -1, false);
  if (!watPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    // My Player Window
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '360px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (watPlayerWindow, 'div', '', true);
    appendMyElement (watPlayerWindow, myPlayerWindow);
    
    // Get Video Thumbnail
    var watVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

    // Get Video
    var watVideoList = {};
    var watServerTime = getMyContent('http://www.wat.tv/servertime', 'TEXT', false);
    watServerTime = parseInt(watServerTime.split('|')[0]);
    watServerTime = watServerTime.toString(16)
    var watKey = "9b673b13fa4682ed14c3cfa5af5310274b514c4133e9b3a81e6e3aba00912564";
    
    var watVideoID = getMyContent (page.url, 'xtpage\\s+=\\s+"cinema::comedie::20thcenturyfoxfrance::20thcenturyfoxfrance-video-(.*)"', false);
    //var watVideoID = getMyContent (page.url, 'oasUvid\\s+=\\s+\'(.*?)\';', false);
    var watVideoLocation = "/web/" + watVideoID;
    //http://www.wat.tv/get/web/10725583?token=4e7bd7beb6683000fe9d582be89b4406/52156771&context=playerWat&getURL=1&version=LNX%2011,2,202,297
    //http://www.wat.tv/get/web/10725583?token=8e6792315906f8091c32ddf4c5236acc/521566f2&domain=www.wat.tv&refererURL=www.wat.tv&revision=04.00.202%0A&synd=0&helios=1&context=playerWat&country=FR&sitepage=WAT%2Fcinema%2Fp%2F20thcenturyfoxfrance&lieu=wat&playerContext=CONTEXT_WAT&getURL=1&version=LNX%2011,2,202,297
    var watRequestURL = "http://www.wat.tv/get" + watVideoLocation + "?token=" + hex_md5(watKey + watVideoLocation + watServerTime) + "/" + watServerTime + "&domain=www.wat.tv&refererURL=www.wat.tv&revision=04.00.202&synd=0&helios=1&context=playerWat&country=FR&sitepage=WAT-cinema-p-20thcenturyfoxfrance&lieu=wat&playerContext=CONTEXT_WAT&getURL=1&version=LNX 11,2,202,297";
    //var watRequestURL = "http://www.wat.tv/get" + watVideoLocation + "?token=" + hex_md5(watKey + watVideoLocation + watServerTime) + "/" + watServerTime + "&context=swf2&getURL=1&version=LNX 11,2,202,275";
    var watVideo = getMyContent (watRequestURL, 'TEXT', false);
    watVideoList['Standard Definition MP4'] = watVideo;
    
    var watVideoIDMobile = getMyContent (page.url, 'iphoneId\\s+:\\s+"(.*?)"', false);
    if (watVideoIDMobile){
        var watVideoMobile= 'http://www.wat.tv/get/android5/' + watVideoID + '.mp4';
        watVideoList['Low Definition MP4'] = watVideoMobile;
    }
    console.log(watVideo);
    console.log(watVideoMobile);
    
    if (watVideoIDMobile || watVideo) {
      // Get Watch Sidebar
      var watSidebarWindow = getMyElement ('', 'div', 'class', 'right', 0, false);

      // Create Player
      var watDefaultVideo = 'Standard Definition MP4';
      player = {
	'playerSocket': watPlayerWindow,
	'playerWindow': myPlayerWindow,
	'videoList': watVideoList,
	'videoPlay': watDefaultVideo,
	'videoThumb': watVideoThumb,
	'playerWidth': 640,
	'playerHeight': 360,
	'playerWideWidth': 970,
	'playerWideHeight': 510,
	'sidebarWindow': watSidebarWindow,
	'sidebarMarginNormal': 5,
	'sidebarMarginWide': 600
      };
      feature['definition'] = false;
      feature['container'] = false;
      option['definition'] = 'SD';
      option['definitions'] = ['Standard Definition MP4'];
      option['containers'] = ['MP4'];
      createMyPlayer ();
    }
    else {
      showMyMessage ('!videos');
    }
  }
}*/
else if (page.url.match(/porntube\.com\/videos\/.*([0-9]+)/)) {
    /* Get Player Window */
    waitForKeyElements ("#playerID",
    function () {
    var porntubePlayerWindow = page.doc.getElementById('playerID');
    var porntubePlayerConfig = decodeURIComponent(porntubePlayerWindow.innerHTML).replace(/amp;/g, '');;

    if (!porntubePlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '760px', height: '554px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (porntubePlayerWindow, 'div', '', true);
   		porntubePlayerWindow = replaceMyElement (porntubePlayerWindow.parentNode, myPlayerWindow, porntubePlayerWindow);
        //appendMyElement (porntubePlayerWindow, myPlayerWindow);
   	
       	/* Get Videos Content */
       	var porntubeVideoList = {};
       	var porntubeVideoFound = false;
        var porntubeVideoFormats;
       	var porntubeThumb = getMyContent (page.url, 'image:\\s*"(.*?)"', true);
        console.log(porntubeThumb);
        var porntubeVideoURLmp4_240 = (porntubePlayerConfig.match('<file>(http://\\w+\.240p\..*?)</file>')) ? porntubePlayerConfig.match('<file>(http://\\w+\.240p\..*?)</file>')[1] : false;
        var porntubeVideoURLmp4_360 = (porntubePlayerConfig.match('<file>(http://\\w+\.360p\..*?)</file>')) ? porntubePlayerConfig.match('<file>(http://\\w+\.360p\..*?)</file>')[1] : false;
        var porntubeVideoURLmp4_480 = (porntubePlayerConfig.match('<file>(http://\\w+\.480p\..*?)</file>')) ? porntubePlayerConfig.match('<file>(http://\\w+\.480p\..*?)</file>')[1] : false;
        var porntubeVideoURLmp4_720 = (porntubePlayerConfig.match('<file>(http://\\w+\.720p\..*?)</file>')) ? porntubePlayerConfig.match('<file>(http://\\w+\.720p\..*?)</file>')[1] : false;
        var porntubeVideoURLmp4_1080 = (porntubePlayerConfig.match('<file>(http://\\w+\.1080p\..*?)</file>')) ? porntubePlayerConfig.match('<file>(http://\\w+\.1080p\..*?)</file>')[1] : false;
        console.log(porntubeVideoURLmp4_240);
        console.log(porntubeVideoURLmp4_360);
        console.log(porntubeVideoURLmp4_480);
        console.log(porntubeVideoURLmp4_720);
        console.log(porntubeVideoURLmp4_1080);

        if (porntubeVideoURLmp4_240) {
            porntubeVideoFormats = {'1': '240p MP4'};
            porntubeVideoFound = true;
            porntubeVideoList[porntubeVideoFormats[1]] = porntubeVideoURLmp4_240;
        }
        if (porntubeVideoURLmp4_360) {
            porntubeVideoFormats = {'2': '360p MP4'};
            porntubeVideoFound = true;
            porntubeVideoList[porntubeVideoFormats[2]] = porntubeVideoURLmp4_360;
        }
        if (porntubeVideoURLmp4_480) {
            porntubeVideoFormats = {'3': '480p MP4'};
            porntubeVideoFound = true;
            porntubeVideoList[porntubeVideoFormats[3]] = porntubeVideoURLmp4_480;
        }
        if (porntubeVideoURLmp4_720) {
            videoCounter = videoCounter + 1;
            porntubeVideoFormats = {'4': '720p MP4'};
            porntubeVideoFound = true;
            porntubeVideoList[porntubeVideoFormats[4]] = porntubeVideoURLmp4_720;
        }
        if (porntubeVideoURLmp4_1080) {
            videoCounter = videoCounter + 1;
            porntubeVideoFormats = {'5': '1080p MP4'};
            porntubeVideoFound = true;
            porntubeVideoList[porntubeVideoFormats[5]] = porntubeVideoURLmp4_1080;
        }

       	if (porntubeVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': porntubePlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': porntubeVideoList,
       		'videoPlay': porntubeVideoFormats[2],
       		'videoThumb': porntubeThumb,
       		'playerWidth': 760,
       		'playerHeight': 554
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
});
}
                        
else if (page.url.indexOf('vporn.com') != -1) {
    /* Get Player Window */
    var vpornPlayerWindow = getMyElement ('', 'div', 'class', 'playerholder', 0, false);

    if (!vpornPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '720px', height: '405px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (vpornPlayerWindow, 'div', '', true);
   		appendMyElement (vpornPlayerWindow, myPlayerWindow);
   	
       	/* Get Videos Content */
       	var vpornVideoList = {};
       	var vpornVideoFormats = {'1': 'Low Definition MP4', '2': 'Low Definition MP4 Mirror', '3': 'Standard Definition MP4', '4': 'Standard Definition MP4 Backup', '5': 'High Definition MP4', '6': 'High Definition MP4 Backup'};
       	var vpornVideoFound = false;
       	var vpornThumb = getMyContent (page.url, 'flashvars.imageUrl\\s+=\\s+"(.*?)"', true);
    	var vpornLowVideoURLmp4 = getMyContent(page.url, 'flashvars.videoUrlLow\\s+=\\s+"(.*?)"', true);
    	var vpornMediumVideoURLmp4 = getMyContent(page.url, 'flashvars.videoUrlMedium\\s+=\\s+"(.*?)"', true);
    	var vpornHighVideoURLmp4 = getMyContent(page.url, 'flashvars.videoUrlHD\\s+=\\s+"(.*?)"', true);
    	var vpornLowVideoURLmp4_2 = getMyContent(page.url, 'flashvars.videoUrlLow2\\s+=\\s+"(.*?)"', true);
    	var vpornMediumVideoURLmp4_2 = getMyContent(page.url, 'flashvars.videoUrlMedium2\\s+=\\s+"(.*?)"', true);
    	var vpornHighVideoURLmp4_2 = getMyContent(page.url, 'flashvars.videoUrlHD2\\s+=\\s+"(.*?)"', true);

        if (vpornLowVideoURLmp4) { vpornVideoFound = true; vpornVideoList[vpornVideoFormats[1]] = vpornLowVideoURLmp4; }
    	if (vpornLowVideoURLmp4_2) { vpornVideoFound = true; vpornVideoList[vpornVideoFormats[2]] = vpornLowVideoURLmp4_2; }
    	if (vpornMediumVideoURLmp4) { vpornVideoFound = true; vpornVideoList[vpornVideoFormats[3]] = vpornMediumVideoURLmp4; }
    	if (vpornMediumVideoURLmp4_2) { vpornVideoFound = true; vpornVideoList[vpornVideoFormats[4]] = vpornMediumVideoURLmp4_2; }
    	if (vpornHighVideoURLmp4) { vpornVideoFound = true; vpornVideoList[vpornVideoFormats[5]] = vpornHighVideoURLmp4; }
    	if (vpornHighVideoURLmp4_2) { vpornVideoFound = true; vpornVideoList[vpornVideoFormats[6]] = vpornHighVideoURLmp4_2; }

       	if (vpornVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': vpornPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': vpornVideoList,
       		'videoPlay': vpornVideoFormats[3],
       		'videoThumb': vpornThumb,
       		'playerWidth': 720,
       		'playerHeight': 405
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		option['definitions'] = ['Low Definition','Standard Definition','High Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.indexOf('manhub.com') != -1) {
    /* Get Player Window */
    var manhubPlayerWindow = getMyElement ('', 'div', 'id', 'player-container_wrapper', -1, false);

    if (!manhubPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '505px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (manhubPlayerWindow, 'div', '', true);
   		appendMyElement (manhubPlayerWindow, myPlayerWindow);
   	
       	/* Get Videos Content */
       	var manhubVideoList = {};
       	var manhubVideoFormats = {'1': 'Standard Definition MP4'};
       	var manhubVideoFound = false;
       	var manhubThumb = null;
    	var manhubVideoURLmp4 = getMyContent(page.url, 'var\\s+url\\s+=\\s+"(.*?)"', true);

        if (manhubVideoURLmp4) { manhubVideoFound = true; manhubVideoList[manhubVideoFormats[1]] = manhubVideoURLmp4; }

       	if (manhubVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': manhubPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': manhubVideoList,
       		'videoPlay': manhubVideoFormats[1],
       		'videoThumb': manhubThumb,
       		'playerWidth': 640,
       		'playerHeight': 505
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'MP4';
       		option['containers'] = ['MP4', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}
else if (page.url.indexOf('hotpornshow.com') != -1) {
    /* Get Player Window */
    var hotpornshowPlayerWindow = getMyElement ('', 'div', 'id', 'kt_player', -1, false);
    console.log(hotpornshowPlayerWindow);

    if (!hotpornshowPlayerWindow) {
    	showMyMessage ('!player');
    }
    else {
   		/* My Player Window */
   		var myPlayerWindow = createMyElement ('div', '', '', '', '');
   		styleMyElement (myPlayerWindow, {position: 'relative', width: '675px', height: '376px', backgroundColor: '#F4F4F4', zIndex: '999999'});
   		modifyMyElement (hotpornshowPlayerWindow, 'div', '', true);
   		appendMyElement (hotpornshowPlayerWindow, myPlayerWindow);
   		// player wrapper is too small for player... modify width
   		var content_div = getMyElement('', 'div', 'id', 'content_main', -1, false);
   		console.log(content_div);
   		content_div.style.width = null;
   		hotpornshowPlayerWindow.style.width = null;
   	
       	/* Get Videos Content */
       	var hotpornshowVideoList = {};
       	var hotpornshowVideoFormats = {'1': 'Standard Definition MP4'};
       	var hotpornshowVideoFound = false;
       	var hotpornshowThumb = getMyContent(page.url, "preview_url:\\s+'(.*?)'", true);
    	var hotpornshowVideoURLmp4 = getMyContent(page.url, "video_url:\\s+'(.*?)'", true);

        if (hotpornshowVideoURLmp4) { hotpornshowVideoFound = true; hotpornshowVideoList[hotpornshowVideoFormats[1]] = hotpornshowVideoURLmp4; }

       	if (hotpornshowVideoFound) {
       		/* Create Player */
       		player = {
       		'playerSocket': hotpornshowPlayerWindow,
       		'playerWindow': myPlayerWindow,
       		'videoList': hotpornshowVideoList,
       		'videoPlay': hotpornshowVideoFormats[1],
       		'videoThumb': hotpornshowThumb,
       		'playerWidth': 675,
       		'playerHeight': 376
       		};
       		feature['container'] = true;
       		feature['widesize'] = false;
       		feature['autoplay'] = true;
       		feature['fullscreen'] = true;
       		feature['definition'] = false;
       		option['definition'] = 'SD';
       		option['definitions'] = ['Standard Definition'];
       		option['container'] = 'FLV';
       		option['containers'] = ['FLV', 'Auto'];
       		createMyPlayer ();
       	}
       	else {
       		showMyMessage ('!videos');
       	}
   }
}

// =====CanalPlus===== //

if (page.url.indexOf('canalplus.fr') != -1) {

  /* Get Player Window */
  var cpPlayerID = getMyContent (page.url, 'canal:player.*?\\s+id="(.*?)"', false);
  if (cpPlayerID)  var cpPlayerWindow = getMyElement ('', '', 'id', cpPlayerID, -1, false);
  else return;
 
  if (!cpPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '360px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    cpPlayerWindow = cpPlayerWindow.parentNode;
    modifyMyElement (cpPlayerWindow, 'div', '', true);
    styleMyElement (cpPlayerWindow, {height: '100%', overflow: 'visible', padding: '0px 0px 20px 0px'});
    appendMyElement (cpPlayerWindow, myPlayerWindow);
    
    /* Get Video ID */
    var cpVideoID = getMyContent (page.url, 'videoId\\s+=\\s+"(.*?)"', false);

    /* Get Videos Content GM */
    var cpVideosContent;
    getMyContentGM('http://service.canal-plus.com/video/rest/getvideos/cplus/' + cpVideoID, 'TEXT', false, function (text) {
        cpVideosContent = text;
        /* Get Videos */
        if (cpVideosContent) {
          var cpVideoList = {};
          var cpVideoFound = false;
          var cpVideo, cpVideoURL, cpVideoType, cpVideoRTMP, cpVideoHTTP, cpVideoSecret, cpDefaultVideo;
          cpVideoType = (cpVideosContent.indexOf('VOD STREAM') != -1) ? 'STREAMING' : 'PROGRESSIF';
          cpVideoRTMP = 'rtmp://vod-fms.canalplus.fr/ondemand/videos/';
          cpVideoHTTP = 'http://vod-flash.canalplus.fr/WWWPLUS/' + cpVideoType + '/';
          cpVideoURL = cpVideosContent.match (/<HAUT_DEBIT>(.*?)<\/HAUT_DEBIT>/);
          cpVideoURL = (cpVideoURL) ? cpVideoURL[1] : null;
          cpVideoSecret = '?secret=pqzerjlsmdkjfoiuerhsdlfknaes';
          cpDefaultVideo = 'Low Definition MP4';
          if (cpVideoURL) {
    	  cpVideoFound = true;
    	  cpVideoURL = cpVideoURL.replace(cpVideoRTMP, cpVideoHTTP);
    	  cpVideo = cpVideoURL + cpVideoSecret;
    	  cpVideoList[cpDefaultVideo] = cpVideo;
          }
          
          if (cpVideoFound) {
    	/* Get Video Thumbnail */
    	var cpVideoThumb = cpVideosContent.match (/<GRAND>(.*?)<\/GRAND>/);
    	cpVideoThumb = (cpVideoThumb) ? cpVideoThumb[1] : null;
    	
    	/* Get Watch Sidebar */
    	var cpSidebarWindow = getMyElement ('', 'div', 'id', 'rightSection', -1, false);
    	var cpMainSection = getMyElement ('', 'div', 'id', 'mainSection', -1, false);
    	if (cpMainSection) styleMyElement (cpMainSection, {overflow: 'visible'});
    	
    	/* Create Player */
    	player = {
    	  'playerSocket': cpPlayerWindow,
    	  'playerWindow': myPlayerWindow,
    	  'videoList': cpVideoList,
    	  'videoPlay': cpDefaultVideo,
    	  'videoThumb': cpVideoThumb,
    	  'playerWidth': 640,
    	  'playerHeight': 360,
    	  'playerWideWidth': 970,
    	  'playerWideHeight': 510,
    	  'sidebarWindow': cpSidebarWindow,
    	  'sidebarMarginNormal': 0,
    	  'sidebarMarginWide': 820
    	};
    	feature['definition'] = false;
    	feature['container'] = false;
    	option['definition'] = 'LD';
    	option['definitions'] = ['Low Definition'];
    	option['containers'] = ['MP4'];
    	createMyPlayer ();
          }
          else {
    	showMyMessage ('!videos');
          }
        }
        else {
          showMyMessage ('!content');
        }
    });
  }
}

// =====TF1===== //

else if (page.url.indexOf('videos.tf1.fr') != -1) {

  /* Get Page Type */
  var tf1PageType = getMyContent (page.url, 'meta\\s+property="og:type"\\s+content="(.*?)"', false);
  if (!tf1PageType || tf1PageType != 'video.episode') return;

  /* Get Player Window */
  var tf1PlayerWindow = getMyElement ('', 'div', 'id', 'FlashPlayer', -1, false);
  if (!tf1PlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '360px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (tf1PlayerWindow, 'div', '', true);
    styleMyElement (tf1PlayerWindow, {height: '100%', overflow: 'visible'});
    appendMyElement (tf1PlayerWindow, myPlayerWindow);
    
    /* Get Video Thumbnail */
    var tf1VideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

    /* Get Video ID */
    var tf1VideoID = getMyContent (page.url, 'mediaId\\s+:\\s+(.*?),', false);

    /* Get Videos */
    if (tf1VideoID) {
      var tf1VideoList = {};
      var tf1Video = 'http://www.wat.tv/get/android5/' + tf1VideoID + '.mp4';
      tf1VideoList['Low Definition MP4'] = tf1Video;

      /* Get Watch Sidebar */
      var tf1SidebarWindow = getMyElement ('', 'div', 'id', 'ible164496', -1, false);
      var tf1MainSection = getMyElement ('', 'div', 'id', 'iblbt150171', -1, false);
      if (tf1MainSection) styleMyElement (tf1MainSection, {overflow: 'visible'});
      var tf1MainSection2 = getMyElement ('', 'div', 'id', 'ibl150171', -1, false);
      if (tf1MainSection2) styleMyElement (tf1MainSection2, {overflow: 'visible'});
      var tf1MainSection3 = getMyElement ('', 'div', 'class', 'unique', 0, false);
      if (tf1MainSection3) styleMyElement (tf1MainSection3, {overflow: 'visible'});

      /* Create Player */
      var tf1DefaultVideo = 'Low Definition MP4';
      player = {
	'playerSocket': tf1PlayerWindow,
	'playerWindow': myPlayerWindow,
	'videoList': tf1VideoList,
	'videoPlay': tf1DefaultVideo,
	'videoThumb': tf1VideoThumb,
	'playerWidth': 640,
	'playerHeight': 360,
	'playerWideWidth': 960,
	'playerWideHeight': 510,
	'sidebarWindow': tf1SidebarWindow,
	'sidebarMarginNormal': 0,
	'sidebarMarginWide': 530
      };
      feature['definition'] = false;
      feature['container'] = false;
      option['definition'] = 'LD';
      option['definitions'] = ['Low Definition'];
      option['containers'] = ['MP4'];
      createMyPlayer ();
    }
    else {
      showMyMessage ('!videos');
    }
  }
}

// =====INA===== //

else if (page.url.indexOf('ina.fr/video') != -1 || page.url.indexOf('ina.fr/notice') != -1) {

  /* Get Player Window */
  var inaPlayerWindow = getMyElement ('', 'div', 'class', 'media', 0, false);
  if (!inaPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '620px', height: '346px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (inaPlayerWindow, 'div', '', true);
    styleMyElement (inaPlayerWindow, {height: '100%'});
    appendMyElement (inaPlayerWindow, myPlayerWindow);
    
    /* Get Video Thumbnail */
    var inaVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);
    if (inaVideoThumb) inaVideoThumb = inaVideoThumb.replace (/300x225/, '620x349');

    /* Get Video ID */
    var inaVideoID = page.url.match (/ina.fr\/video\/(.*?)(\/|$)/);
    if (!inaVideoID) inaVideoID = page.url.match (/ina.fr\/notice\/voir\/(.*?)(\/|$)/);
    inaVideoID = (inaVideoID) ? inaVideoID[1] : null;
    
    /* Get Videos Content GM */
    var inaVideosContent;
    getMyContentGM('http://player.ina.fr/notices/' + inaVideoID + '.mrss', 'TEXT', false, function (text) {
        inaVideosContent = text;
        /* Get Videos */
        if (inaVideosContent) {
          var inaVideoList = {};
          var inaVideo = inaVideosContent.match (/media:content\s+url="(.*?)"/);
          inaVideo = (inaVideo) ? inaVideo[1] : null;
    
          if (inaVideo) {
    	/* Get Watch Sidebar */
    	var inaSidebarWindow = getMyElement ('', 'div', 'class', 'pub300-250', 0, false);
    	var inaStackMedias = getMyElement ('', 'section', 'id', 'stackMedias', -1, false);
    	if (inaStackMedias) styleMyElement (inaStackMedias, {height: '100%'});
    
    	/* Create Player */
    	var inaDefaultVideo = 'Low Definition MP4';
    	inaVideoList[inaDefaultVideo] = inaVideo;
    	player = {
    	  'playerSocket': inaPlayerWindow,
    	  'playerWindow': myPlayerWindow,
    	  'videoList': inaVideoList,
    	  'videoPlay': inaDefaultVideo,
    	  'videoThumb': inaVideoThumb,
    	  'playerWidth': 620,
    	  'playerHeight': 346,
    	  'playerWideWidth': 960,
    	  'playerWideHeight': 510,
    	  'sidebarWindow': inaSidebarWindow,
    	  'sidebarMarginNormal': 0,
    	  'sidebarMarginWide': 530
    	};
    	feature['definition'] = false;
    	feature['container'] = false;
    	option['definition'] = 'LD';
    	option['definitions'] = ['Low Definition'];
    	option['containers'] = ['MP4'];
    	createMyPlayer ();
          }
          else {
    	showMyMessage ('!videos');
          }
        }
        else {
          showMyMessage ('!content');
        }
    });
  }
}

// =====NicoVideo===== //

else if (page.url.indexOf('nicovideo.jp/watch') != -1) {

  /* Get Player Window */
  var nicoPlayerWindow = getMyElement ('', 'div', 'id', 'nicoplayerContainerInner', -1, false);
  if (!nicoPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Block Flash Message */
    var nicoFlashMessage = getMyElement ('', 'div', 'class', 'notify_update_flash_player', 0, false);
    if (nicoFlashMessage && nicoFlashMessage.parentNode) removeMyElement(nicoFlashMessage.parentNode, nicoFlashMessage);

    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '672px', height: '465px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (nicoPlayerWindow, 'div', '', true);
    styleMyElement (nicoPlayerWindow, {marginTop: '-120px', width: '672px', height: '465px', backgroundColor: '#F4F4F4'});
    appendMyElement (nicoPlayerWindow, myPlayerWindow);
    
    /* Get Video ID */
    var nicoVideoID = page.url.match(/\/watch\/(sm\d+)/);
    nicoVideoID = (nicoVideoID) ? nicoVideoID[1] : null;
    
    /* Get Videos Content GM */
    var nicoVideo;
    if (nicoVideoID) getMyContentGM('http://flapi.nicovideo.jp/api/getflv/' + nicoVideoID, 'url=(.*?)(&|$)', true, function (text) {
        nicoVideo = text;
        /* Get Videos */
        if (nicoVideo) {
          var nicoVideoList = {};
          
          /* Get Video Thumbnail */
          var nicoVideoThumb = getMyContent (page.url, 'thumbImage&quot;:&quot;(.*?)&', true);
          
          /* Create Player */
          var nicoDefaultVideo = 'Low Definition MP4';
          nicoVideoList[nicoDefaultVideo] = nicoVideo;
          player = {
    	'playerSocket': nicoPlayerWindow,
    	'playerWindow': myPlayerWindow,
    	'videoList': nicoVideoList,
    	'videoPlay': nicoDefaultVideo,
    	'videoThumb': nicoVideoThumb,
    	'playerWidth': 672,
    	'playerHeight': 465
          };
          feature['definition'] = false;
          feature['container'] = false;
          feature['widesize'] = false;
          option['definition'] = 'LD';
          option['definitions'] = ['Low Definition'];
          option['containers'] = ['MP4'];
          createMyPlayer ();
        }
        else {
          showMyMessage ('!videos');
        }
    });
  }
}

// =====BuniTV===== //

else if (page.url.indexOf('buni.tv/video') != -1) {

  /* Get Player Window */
  var buniEmbed = false;
  var buniPlayerWindow = getMyElement ('', 'div', 'class', 'video-wrapper', 0, false);
  if (!buniPlayerWindow) {
    buniPlayerWindow = getMyElement ('', 'div', 'class', 'player', 0, false);
    buniEmbed = true;
  }
  if (!buniPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
      /* Get Video Source */
      var buniVideoID = getMyContent(page.url, 'bitsontherun.com/players/(.*?)-');
      
      /* Get Video Thumbnail */
      var buniVideoThumb
      if (buniVideoID) buniVideoThumb = 'http://content.bitsontherun.com/thumbs/' + buniVideoID + '-720.jpg';

      /* if it's not a embedded video (almost the same as no buniVideoID) proceed with a xhr request. otherwise show message with youtube link */
      var buniVideo;
      if (buniVideoID) {
            getMyContentGM('http://content.bitsontherun.com/jw6/' + buniVideoID + '.xml', 'source\\s+file="(http://v.*?)"', true, function (text) {
                buniVideo = text;
        
                /* My Player Window */
                var myPlayerWindow = createMyElement ('div', '', '', '', '');
                styleMyElement (myPlayerWindow, {position: 'relative', width: '690px', height: '470px', backgroundColor: '#F4F4F4', zIndex: '99999'});
                modifyMyElement (buniPlayerWindow, 'div', '', true);
                appendMyElement (buniPlayerWindow, myPlayerWindow);
                
                /* Get Videos */
                if (buniVideo) {
                  var buniVideoList = {};
                  
                  /* Create Player */
                  var buniDefaultVideo = 'Low Definition MP4';
                  buniVideoList[buniDefaultVideo] = buniVideo;
                  player = {
            	'playerSocket': buniPlayerWindow,
            	'playerWindow': myPlayerWindow,
            	'videoList': buniVideoList,
            	'videoPlay': buniDefaultVideo,
            	'videoThumb': buniVideoThumb,
            	'playerWidth': 690,
            	'playerHeight': 470
                  };
                  feature['definition'] = false;
                  feature['container'] = false;
                  feature['widesize'] = false;
                  option['definition'] = 'LD';
                  option['definitions'] = ['Low Definition'];
                  option['containers'] = ['MP4'];
                  createMyPlayer ();
                }
                else {
                  showMyMessage ('!videos');
                }
            });
          } else {
                var ytVideoID = buniPlayerWindow.innerHTML.match(/\/embed\/(.*?)(\?|&)/);
                
                /* My Player Window */
                var myPlayerWindow = createMyElement ('div', '', '', '', '');
                styleMyElement (myPlayerWindow, {position: 'relative', width: '690px', height: '470px', backgroundColor: '#F4F4F4', zIndex: '99999'});
                modifyMyElement (buniPlayerWindow, 'div', '', true);
                appendMyElement (buniPlayerWindow, myPlayerWindow);
            
                ytVideoID = (ytVideoID) ? ytVideoID[1] : null;
                if (ytVideoID) {
                    var ytVideoLink = 'http://youtube.com/watch?v=' + ytVideoID;
                    showMyMessage ('embed', ytVideoLink);
                }
                else showMyMessage ('!videos');
                return;
          }
     }
}

// =====Youku===== //

else if (page.url.indexOf('v.youku.com') != -1) {

  /* Get Player Window */
  var ykPlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
  if (!ykPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '458px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (ykPlayerWindow, 'div', '', true);
    appendMyElement (ykPlayerWindow, myPlayerWindow);
    
    /* Get Video ID */
    var ykVideoID = page.url.match(/show\/id_(.*?)\./);
    ykVideoID = (ykVideoID) ? ykVideoID[1] : null;
    
    /* Get Videos */
    if (ykVideoID) {
      /* Video */
      var ykVideoList = {};
      ykVideoList['Very Low Definition MP4'] = 'http://3g.youku.com/pvs?id=' + ykVideoID + '&format=3gphd';
      ykVideoList['Very Low Definition FLV'] = 'http://v.youku.com/player/getM3U8/vid/' + ykVideoID + '/type/flv/ts/' + (new Date).getTime().toString().substring(0,10) + '/sc/2/useKeyframe/0/v.m3u8';
      ykVideoList['Low Definition MP4'] = 'http://v.youku.com/player/getM3U8/vid/' + ykVideoID + '/type/mp4/ts/' + (new Date).getTime().toString().substring(0,10) + '/sc/2/useKeyframe/0/v.m3u8';
      ykVideoList['High Definition MP4'] = 'http://v.youku.com/player/getM3U8/vid/' + ykVideoID + '/type/hd2/ts/' + (new Date).getTime().toString().substring(0,10) + '/sc/2/useKeyframe/0/v.m3u8';
      
      /* Get Video Thumbnail */
      var ykVideoThumb = getMyContent (page.url, 'thumbImage&quot;:&quot;(.*?)&', true);
      
      /* Create Player */
      var ykDefaultVideo = 'Low Definition MP4';
      player = {
	'playerSocket': ykPlayerWindow,
	'playerWindow': myPlayerWindow,
	'videoList': ykVideoList,
	'videoPlay': ykDefaultVideo,
	'videoThumb': ykVideoThumb,
	'playerWidth': 640,
	'playerHeight': 458
      };
      feature['widesize'] = false;
      option['definitions'] = ['Very Low Definition', 'Low Definition', 'High Definition'];
      option['containers'] = ['MP4', 'FLV', 'Any'];
      createMyPlayer ();
    }
    else {
      showMyMessage ('!videos');
    }
  }
}
// =====iQIYI===== //
else if (page.url.indexOf('iqiyi.com') != -1) {

  /* Get Player Window */
  var iqPlayerWindow = getMyElement ('', 'div', 'id', 'flashbox', -1, false);
  if (!iqPlayerWindow) {
    //showMyMessage ('!player');
  }
  else {
    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '854px', height: '518px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (iqPlayerWindow, 'div', '', true);
    appendMyElement (iqPlayerWindow, myPlayerWindow);

    /* Get Video Thumbnail */
    var iqVideoThumb = getMyContent (page.url, 'thumbImage&quot;:&quot;(.*?)&', true);
    
    /* Get Video ID */
    var iqTVID = getMyContent(page.url, 'data-player-tvid="(.*?)"', false);
    console.log(iqTVID);
    var iqVideoID = getMyContent(page.url, 'data-player-videoid="(.*?)"', false);
    console.log(iqVideoID);
    
    /* Get Videos Content */
    var iqVideosContent = (iqTVID && iqVideoID) ? getMyContentGM('http://cache.video.qiyi.com/m/' +iqTVID + '/' + iqVideoID + '/', 'TEXT', false, function (text) {
        iqVideosContent = text;
        console.log(iqVideosContent);
        /* Get Videos */
        if (iqVideosContent) {
          var iqVideoList = {};
          var iqVideoFormats = {'"vd":96': 'Very Low Definition MP4', '"vd":1': 'Low Definition MP4', '"vd":2': 'Standard Definition MP4', '"vd":3': 'High Definition MP4'};
          var iqVideoFound = false;
//          var iqVideoAsMP4 = iqVideosContent.match('"mp4Url":"(http://.*?\.mp4)"')[1];
//            console.log(iqVideoAsMP4);
//            if(iqVideoAsMP4) {
//                iqVideoFound = true;
//                iqVideoList['"vd":2'] = iqVideoAsMP4;
//            } else {
              var iqParser, iqVideo, iqVideoCode;
              for (var videoCode in iqVideoFormats) {
                iqParser = '"m3u":"(.*?)",' + videoCode + ',';
                iqVideo = iqVideosContent.match(iqParser);
                if (iqVideo) {
                  if (!iqVideoFound) iqVideoFound = true;
                  iqVideoCode = iqVideoFormats[videoCode];
                  iqVideoList[iqVideoCode] = iqVideo[1];
                }
             }
        //}
          
          if (iqVideoFound) {
        /* Create Player */
        var iqDefaultVideo = 'Standard Definition MP4';
        player = {
          'playerSocket': iqPlayerWindow,
          'playerWindow': myPlayerWindow,
          'videoList': iqVideoList,
          'videoPlay': iqDefaultVideo,
          'videoThumb': iqVideoThumb,
          'playerWidth': 854,
          'playerHeight': 518
        };
        feature['widesize'] = false;
        feature['containers'] = false;
        option['definitions'] = ['Very Low Definition', 'Low Definition', 'Standard Definition', 'High Definition'];
        option['containers'] = ['MP4'];
        createMyPlayer ();
        styleMyElement(player['panelLogo'], {display: 'inline-block'});
        styleMyElement(player['buttonPlay'], {display: 'inline-block'});
        styleMyElement(player['buttonGet'], {display: 'inline-block'});
        styleMyElement(player['buttonAutoplay'], {display: 'inline-block'});
        styleMyElement(player['buttonDefinition'], {display: 'inline-block'});
        styleMyElement(player['buttonContainer'], {display: 'inline-block'});
        styleMyElement(player['buttonFullsize'], {display: 'inline-block'});
          }
          else {
        showMyMessage ('!videos');
          }
        }
        else {
          showMyMessage ('!content');
        }
    }) : null;
    }
}
// =====SEXYKARMA===== //
else if (page.url.indexOf('sexykarma.com') != -1) {
        /* Get Player Window */
       var sexykarmaPlayerWindow = getMyElement ('', 'div', 'id', 'player_div', -1, false);
       if (!sexykarmaPlayerWindow) {
               showMyMessage ('!player');
       }
       else {
               /* My Player Window */
               var myPlayerWindow = createMyElement ('div', '', '', '', '');
               styleMyElement (myPlayerWindow, {position: 'relative', width: '512px', height: '408px', backgroundColor: '#F4F4F4', zIndex: '99999'});
               modifyMyElement (sexykarmaPlayerWindow, 'div', '', true);
               appendMyElement (sexykarmaPlayerWindow, myPlayerWindow);

       /* Get Videos Content */
       var sexykarmaVideoList = {};
       var sexykarmaVideoFormats = {'1': 'Standard Definition MP4'};
       var sexykarmaVideoURLmp4 = document.body.innerHTML.match("(https?://(www\.)?sexykarma.com/gonewild/.*/\\d+/\\d+/default.mp4)")[1];
       console.log(sexykarmaVideoURLmp4);
       var sexykarmaThumb = sexykarmaVideoURLmp4.replace('/flv/', '/images/videos/').replace('.mp4', '.jpg');
       console.log(sexykarmaThumb);
    
        sexykarmaVideoList[sexykarmaVideoFormats[1]] = sexykarmaVideoURLmp4;

        /* Create Player */
        player = {
        'playerSocket': sexykarmaPlayerWindow,
        'playerWindow': myPlayerWindow,
        'videoList': sexykarmaVideoList,
        'videoPlay': sexykarmaVideoList[1],
        'videoThumb': sexykarmaThumb,
        'playerWidth': 512,
        'playerHeight': 408
        };
        feature['container'] = true;
        feature['widesize'] = false;
        feature['autoplay'] = true;
        feature['fullscreen'] = true;
        feature['definition'] = false;
        option['definition'] = 'SD';
        option['definitions'] = ['Standard Definition'];
        option['container'] = 'MP4';
        option['containers'] = ['MP4', 'Auto'];
        createMyPlayer ();
        styleMyElement(player['playerPanel'], {height: '28px'});
       }
}
// =====JPopsuki===== //

else if (page.url.indexOf('jpopsuki.tv/video') != -1) {

    var player = page.doc.getElementById("flash");
    if(!player)
    {
        return;
    }
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: "\""+width+"px", height: "\""+height+"px", backgroundColor: '#F4F4F4', zIndex: '999999'});
    modifyMyElement (player, 'div', '', true);
    player = replaceMyElement (player.parentNode, myPlayerWindow, player);
 
    var jpopsukiSource = getMyContent(page.url, "TEXT", false);
    jpopsukiVideoURL = jpopsukiSource.match('src="(.*?\.mp4)"')[1];
    jpopsukiVideoURL = "http://" + page.doc.location.hostname + jpopsukiVideoURL;
    jpopsukiThumb = jpopsukiSource.match('poster="(.*?\.jpg)"')[1];
    jpopsukiThumb = "http://" + page.doc.location.hostname + jpopsukiThumb;
    
    var jpopsukiVideoList = {};
    var jpopsukiVideoFormats = {'1': 'Low Definition MP4'};
    var jpopsukiVideoFound = false;
    
    var width=720;
    var height=445;
 
    if (jpopsukiVideoURL) {
        jpopsukiVideoFound = true;
        jpopsukiVideoList[jpopsukiVideoFormats[1]] = jpopsukiVideoURL;
    }
    
    if (jpopsukiVideoFound) {
        /* Create Player */
        player = {
            'playerSocket': player,
            'playerWindow': myPlayerWindow,
            'videoList': jpopsukiVideoList,
            'videoPlay': jpopsukiVideoFormats[1],
            'videoThumb': jpopsukiThumb,
            'playerWidth': width,
            'playerHeight': height
            };
        feature['container'] = true;
        feature['widesize'] = false;
        feature['autoplay'] = true;
        feature['fullscreen'] = true;
        feature['definition'] = false;
        option['definition'] = 'LD';
        option['definitions'] = ['Low Definition'];
        option['container'] = 'MP4';
        option['containers'] = ['MP4', 'Auto'];
        createMyPlayer ();
    }
}
// =====empflix===== //
else if (page.url.indexOf('empflix.com') != -1) {
        /* Get Player Window */
       var empflixPlayerWindow = page.doc.getElementById('movie');
       console.log(empflixPlayerWindow);
       if (!empflixPlayerWindow) {
               showMyMessage ('!player');
       }
       else {
               /* My Player Window */
               var myPlayerWindow = createMyElement ('div', '', '', '', '');
               styleMyElement (myPlayerWindow, {position: 'relative', width: '688px', height: '470x', backgroundColor: '#F4F4F4', zIndex: '99999'});
               modifyMyElement (empflixPlayerWindow, 'div', '', true);
               appendMyElement (empflixPlayerWindow, myPlayerWindow);
               empflixPlayerWindow = replaceMyElement (empflixPlayerWindow.parentNode, myPlayerWindow, empflixPlayerWindow);

       /* Get Videos Content */
       var empflixVideoList = {};
       var empflixVideoFormats = {'1': 'Standard Definition FLV'};
       var empflixVideoConfigUrl = getMyContent(page.url, 'name="config"\\s*value="(.*?)"', false).replace(/&amp;/g, '&');
       console.log(empflixVideoConfigUrl);
       var empflixVideoConfig = getMyContentGM(empflixVideoConfigUrl, 'TEXT', false, function(text){
               var empflixVideoConfig = text;
               //console.log(empflixVideoConfig);
               var empflixVideoURLmp4 = empflixVideoConfig.match('<videoLink>\\s*(.*?)\\s*</videoLink>')[1];
               console.log(empflixVideoURLmp4);
               var empflixThumb = empflixVideoConfig.match('<startThumb>\\s*(.*?)\\s*</startThumb>')[1];
               console.log(empflixThumb);
            
                empflixVideoList[empflixVideoFormats[1]] = empflixVideoURLmp4.replace(/&amp;/g, '&');
        
                /* Create Player */
                player = {
                'playerSocket': empflixPlayerWindow,
                'playerWindow': myPlayerWindow,
                'videoList': empflixVideoList,
                'videoPlay': empflixVideoList[1],
                'videoThumb': empflixThumb,
                'playerWidth': 688,
                'playerHeight': 470
                };
                feature['container'] = true;
                feature['widesize'] = false;
                feature['autoplay'] = true;
                feature['fullscreen'] = true;
                feature['definition'] = false;
                option['definition'] = 'SD';
                option['definitions'] = ['Standard Definition'];
                option['container'] = 'FLV';
                option['containers'] = ['FLV', 'Auto'];
                option['plugin'] = 'FLV';
                createMyPlayer ();
          ;});
       }
}
// =====ashemaletube===== //
else if (page.url.indexOf('ashemaletube.com') != -1) {
        /* Get Player Window */
       var ashemaletubePlayerWindow = getMyElement ('', 'div', 'id', 'mediaplayer_wrapper', -1, false);
       if (!ashemaletubePlayerWindow) {
               showMyMessage ('!player');
       }
       else {
		/* My Player Window */
               var myPlayerWindow = createMyElement ('div', '', '', '', '');
               styleMyElement (myPlayerWindow, {position: 'relative', width: '668px', height: '533px', backgroundColor: '#F4F4F4', zIndex: '99999'});
               modifyMyElement (ashemaletubePlayerWindow, 'div', '', true);
               appendMyElement (ashemaletubePlayerWindow, myPlayerWindow);

       /* Get Videos Content */
       var ashemaletubeVideoList = {};
       var ashemaletubeVideoFormats = {'1': 'Standard Definition FLV'};
       var ashemaletubeVideoURLmp4 = getMyContent (page.url, '\'file\'\\s*:\\s*"(.*?)"', false);
       console.log(ashemaletubeVideoURLmp4);
       var ashemaletubeThumb = getMyContent (page.url, '\'image\'\\s*:\\s*"(.*?)"', false);
       console.log(ashemaletubeThumb);
    
        ashemaletubeVideoList[ashemaletubeVideoFormats[1]] = ashemaletubeVideoURLmp4;

        /* Create Player */
        player = {
        'playerSocket': ashemaletubePlayerWindow,
        'playerWindow': myPlayerWindow,
        'videoList': ashemaletubeVideoList,
        'videoPlay': ashemaletubeVideoList[1],
        'videoThumb': ashemaletubeThumb,
        'playerWidth': 668,
        'playerHeight': 533
        };
        feature['container'] = true;
        feature['widesize'] = false;
        feature['autoplay'] = true;
        feature['fullscreen'] = true;
        feature['definition'] = false;
        option['definition'] = 'SD';
        option['definitions'] = ['Standard Definition'];
        option['container'] = 'FLV';
        option['containers'] = ['FLV', 'Auto'];
        createMyPlayer ();
       }
}
// =====VPlay===== //

else if (page.url.indexOf('vplay.ro/watch') != -1) {
  
  /* Get Player Window */
  var vpPlayerWindow = getMyElement ('', 'div', 'class', 'video_back', 0, false);
  if (!vpPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '980px', height: '573px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (vpPlayerWindow, 'div', '', true);
    appendMyElement (vpPlayerWindow, myPlayerWindow);
    
    /* Get Video Thumbnail */
    var vpVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);
    
    /* Get Video ID */
    var vpVideoID = getMyContent (page.url, 'meta\\s+property="og:url"\\s+content=".*?vplay.ro/watch/(.*?)/"', false);
    
    /* Get Videos Content */
    var vpVideosContent;
    if (vpVideoID) {
      var vpGetURL = page.win.location.protocol + '//' + page.win.location.hostname + '/play/dinosaur.do';
      var vpGetParams = 'key=' + vpVideoID;
      var http = new XMLHttpRequest();
      http.open('POST', vpGetURL, false);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.send(vpGetParams);
      vpVideosContent = http.responseText;
    }
    if (vpVideosContent) {
      var vpVideoList = {};
      var vpVideoFormats = {'nqURL': 'Standard Definition MP4', 'hdURL': 'High Definition MP4'};
      var vpVideoFound = false;
      var vpParser, vpVideo, vpVideoCode;
      for (var videoCode in vpVideoFormats) {
	vpParser = videoCode + '=(.*?)&';
	vpVideo = vpVideosContent.match(vpParser);
	if (vpVideo) {
	  if (!vpVideoFound) vpVideoFound = true;
	  vpVideoCode = vpVideoFormats[videoCode];
	  vpVideoList[vpVideoCode] = vpVideo[1];
	}
      }

      if (vpVideoFound) {
	/* Create Player */
	var vpDefaultVideo = 'Standard Definition MP4';
	player = {
	  'playerSocket': vpPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': vpVideoList,
	  'videoPlay': vpDefaultVideo,
	  'videoThumb': vpVideoThumb,
	  'playerWidth': 980,
	  'playerHeight': 573
	};
	feature['widesize'] = false;
	option['definitions'] = ['Standard Definition', 'High Definition'];
	option['containers'] = ['MP4'];
	createMyPlayer ();
      }
      else {
	showMyMessage ('!videos');
      }
    }
    else {
      showMyMessage ('!content');
    }
  }
  
}

// =====Trilulilu===== //

else if (page.url.indexOf('trilulilu.ro') != -1) {
  
  /* Check Page Type */
  var triPageType = getMyContent (page.url, 'meta\\s+property="og:type"\\s+content="(.*?)"', false);
  if (!triPageType || triPageType.indexOf('video') == -1) return;
  
  /* Get Player Window */
  var triPlayerWindow = getMyElement ('', 'div', 'class', 'player', 0, false);
  if (!triPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '728px', height: '432px', backgroundColor: '#FFFFFF', zIndex: '99999'});
    modifyMyElement (triPlayerWindow, 'div', '', true);
    appendMyElement (triPlayerWindow, myPlayerWindow);
      
    /* Get Video Thumbnail */
    var triVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);
      
    /* Get Videos Content */
    var triVideosContents = getMyContent (page.url, 'block_flash_vars\\s+=\\s+\\{(.*?)\\}', false);
    
    /* Get Videos Content */
    if (triVideosContents) {
      var triUser = triVideosContents.match(/"userid":"(.*?)"/);
      triUser = (triUser) ? triUser[1] : null;
      var triHash = triVideosContents.match(/"hash":"(.*?)"/);
      triHash = (triHash) ? triHash[1] : null;
      var triServer = triVideosContents.match(/"server":"(.*?)"/);
      triServer = (triServer) ? triServer[1] : null;
      var triFormatsURL = 'http://fs' + triServer + '.trilulilu.ro/' + triHash + '/video-formats';
      var triFormatsContent = getMyContentGM(triFormatsURL, 'TEXT', false);
      
      if (triUser && triHash && triServer && triFormatsContent) {
	var triVideoList = {};
	var triVideoFound = false;
	var triVideosFormats = {'flv-vp6': 'Low Definition FLV', 'mp4-360p': 'Low Definition MP4', 'mp4-720p': 'High Definition MP4'};
	var triFormatsMatcher = /<format>.*?<\/format>/g;
	var triFormats = triFormatsContent.match(triFormatsMatcher);
	var triVideo, triFormat, triVideoCode;
	var triDefaultVideo = 'Low Definition FLV';
	for (var f = 0; f < triFormats.length; f++) {
	  triFormat = triFormats[f].replace(/<format>/, '').replace(/<\/format>/, '');
	  triVideo = 'http://fs' + triServer + '.trilulilu.ro/stream.php?type=video&source=site&hash=' + triHash + '&username=' + triUser + '&key=ministhebest&format=' + triFormat + 'p&start=';
	  triVideoCode = triVideosFormats[triFormat];
	  if (triVideoCode) {
	    if (triVideoCode == 'Low Definition MP4') triDefaultVideo = triVideoCode;
	    if (!triVideoFound) triVideoFound = true;
	    triVideoList[triVideoCode] = triVideo; 
	  }
	}
	
	if (triVideoFound) {
	  /* Create Player */
	  player = {
	    'playerSocket': triPlayerWindow,
	    'playerWindow': myPlayerWindow,
	    'videoList': triVideoList,
	    'videoPlay': triDefaultVideo,
	    'videoThumb': triVideoThumb,
	    'playerWidth': 728,
	    'playerHeight': 432
	  };
	  feature['widesize'] = false;
	  option['definitions'] = ['Low Definition', 'High Definition'];
	  option['containers'] = ['MP4', 'FLV', 'Any'];
	  createMyPlayer ();
	  styleMyElement(player['playerContent'], {marginTop: '3px'});
	}
	else {
	  showMyMessage ('!videos');
	}
      }
      else {
	showMyMessage ('!content');
      }
    }
    else {
      showMyMessage ('!content');
    }
  }
  
}

// =====VeeHD===== //

else if (page.url.indexOf('veehd.com/video/') != -1) {
  
  /* Get Player Window */
  var veePlayerWindow = getMyElement ('', 'div', 'class', 'videoHolder', 0, false);
  if (!veePlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Video Thumb */
    var veeVideoThumb = getMyContent (page.url, 'img\\s+id="veehdpreview"\\s+src="(.*?)"', false);
      
    /* Get Videos Content */
    var veeVideosContent = getMyContent (page.url, '"(\/vpi\\?h=.*?)"', false);
      
    /* My Player Window */ 
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '990px', height: '480px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (veePlayerWindow, 'div', '', true);
    styleMyElement (veePlayerWindow, {height: '100%'});
    appendMyElement (veePlayerWindow, myPlayerWindow);
      
    /* Get Videos */
    if (veeVideosContent) {
      var veeVideoList = {};
      var veeVideoFound = false;
      var veeVideoType = getMyContent (page.url, 'type:\\s+(.*?)<', false);
      var veeVideo, veeVideoContainer, veeVideoSize, veeVideoDefinition, veeDefaultVideo;
      if (veeVideoType == 'divx') {
	veeVideo = getMyContent (veeVideosContent, 'param\\s+name="src"\\s+value="(.*?)"', true);
	veeVideoContainer = 'AVI';
      }
      else {
	veeVideo = getMyContent (veeVideosContent, '"url":"(.*?)"', true);
	veeVideoContainer = 'MP4';
      }
      veeVideoSize = getMyContent (page.url, 'resolution:.*?x(.*?)<', false);
      veeVideoDefinition = 'Low Definition';
      if (veeVideoSize > 400) veeVideoDefinition = 'Standard Definition';
      if (veeVideoSize > 700) veeVideoDefinition = 'High Definition';
      if (veeVideoSize > 1000) veeVideoDefinition = 'Full High Definition';
      veeDefaultVideo = veeVideoDefinition + ' ' + veeVideoContainer;
      if (veeVideo) {
	if (!veeVideoFound) veeVideoFound = true;
	veeVideoList[veeDefaultVideo] = veeVideo;
      }
       
      if (veeVideoFound) {
	/* Create Player */
	player = {'playerSocket': veePlayerWindow, 'playerWindow': myPlayerWindow, 'videoList': veeVideoList, 'videoPlay': veeDefaultVideo, 'videoThumb': veeVideoThumb, 'playerWidth': 990, 'playerHeight': 480};
	feature['definition'] = false;
	feature['container'] = false;
	feature['widesize'] = false;
	option['definitions'] = [veeVideoDefinition];
	option['containers'] = ['MP4', 'AVI', 'Any'];
	createMyPlayer ();
      }
      else {
	showMyMessage ('!videos');
      }
    }
    else {
      showMyMessage ('!content');
    }
  }
      
}

// =====SVTPlay===== //

else if (page.url.indexOf('svtplay.se/') != -1) {
  
  /* Get Player Window */
  var svtPlayerWindow = getMyElement ('', 'a', 'id', 'player', -1, false);
  if (!svtPlayerWindow) {
    //showMyMessage ('!player');
  }
  else {
    /* Get Video Thumb */
    var svtVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);
    
    /* Get Videos Content */
    var svtVideosContent = getMyContent (page.url + '?output=json', 'TEXT', false);
    
    /* My Player Window */ 
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '988px', height: '580px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (svtPlayerWindow, 'div', '', true);
    appendMyElement (svtPlayerWindow, myPlayerWindow);
    
    /* Get Videos */
    if (svtVideosContent) {
      var svtVideoList = {};
      var svtVideoFound = false;
      var svtVideoPattern= /"url":".*?"/g;
      var svtVideoMatcher = svtVideosContent.match(svtVideoPattern);
      var svtVideoHLS, svtVideo;
      if (svtVideoMatcher && svtVideoMatcher[1]) {
	svtVideoFound = true;
	svtVideoHLS = svtVideoMatcher[1].match(/"url":"(.*?)"/);
	svtVideoHLS = (svtVideoHLS) ? svtVideoHLS[1] : null;
	svtVideoHLS = svtVideoHLS.replace(/\?.*$/, '');
	if (svtVideoHLS.indexOf(',900,') != -1) {
	  svtVideo = svtVideoHLS.replace(/master.m3u8/, 'index_0_av.m3u8');
	  svtVideoList['Low Definition MP4'] = svtVideo;
	}
	else if (svtVideoHLS.indexOf(',348,') != -1) {
	  svtVideo = svtVideoHLS.replace(/master.m3u8/, 'index_1_av.m3u8');
	  svtVideoList['Very Low Definition MP4'] = svtVideo;
	}
	else if (svtVideoHLS.indexOf(',1680,') != -1) {
	  svtVideo = svtVideoHLS.replace(/master.m3u8/, 'index_3_av.m3u8');
	  svtVideoList['Standard Definition MP4'] = svtVideo;
	}
	else if (svtVideoHLS.indexOf(',2800,') != -1) {
	  svtVideo = svtVideoHLS.replace(/master.m3u8/, 'index_4_av.m3u8');
	  svtVideoList['High Definition MP4'] = svtVideo;
	}
	else {
	  svtVideoFound = false;
	}
      }
      
      if (svtVideoFound) {
	/* Create Player */
	svtDefaultVideo = 'Low Definition MP4';
	player = {'playerSocket': svtPlayerWindow, 'playerWindow': myPlayerWindow, 'videoList': svtVideoList, 'videoPlay': svtDefaultVideo, 'videoThumb': svtVideoThumb, 'playerWidth': 988, 'playerHeight': 580};
	feature['container'] = false;
	feature['widesize'] = false;
	option['definitions'] = ['Very Low Definition', 'Low Definition', 'Standard Definition', 'High Definition'];
	option['containers'] = ['MP4'];
	createMyPlayer ();
      }
      else {
	showMyMessage ('!videos');
      }
    }
    else {
      showMyMessage ('!content');
    }      
  }
}

// =====Euronews===== //

else if (page.url.indexOf('euronews.com/') != -1) {
  
  /* Get Player Window */
  var enPlayerWindow = getMyElement ('', 'div', 'class', 'videoWrapper', 0, false);
  if (!enPlayerWindow) {
    //showMyMessage ('!player');
  }
    else {
      /* Get Video Thumb */
      var enVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);
      
      /* Get Video */
      var enVideo = getMyContent (page.url, 'file:\\s+"(.*?)"', false);
      
      /* My Player Window */ 
      var myPlayerWindow = createMyElement ('div', '', '', '', '');
      styleMyElement (myPlayerWindow, {position: 'relative', width: '600px', height: '360px', backgroundColor: '#F4F4F4'});
      modifyMyElement (enPlayerWindow, 'div', '', true);
      styleMyElement (enPlayerWindow, {height: '100%'});
      appendMyElement (enPlayerWindow, myPlayerWindow);
      
      /* Get Videos */
      if (enVideo) {
	var enVideoList = {};
	var enDefaultVideo = 'Low Definition MP4';
	if (enVideo.indexOf('.flv') != -1) enDefaultVideo = 'Low Definition FLV';
	enVideoList[enDefaultVideo] = enVideo;
	
	/* Create Player */
	player = {'playerSocket': enPlayerWindow, 'playerWindow': myPlayerWindow, 'videoList': enVideoList, 'videoPlay': enDefaultVideo, 'videoThumb': enVideoThumb, 'playerWidth': 600, 'playerHeight': 360};
	feature['container'] = false;
	feature['definition'] = false;
	feature['widesize'] = false;
	option['definitions'] = ['Low Definition'];
	option['containers'] = ['MP4', 'FLV', 'Any'];
	createMyPlayer ();
      }
      else {
	showMyMessage ('!videos');
      }
    }
}
// =====flashx===== //
else if (page.url.indexOf('flashx.tv/video') != -1) {

    var player = getMyElement ('', 'div', 'id', 'normal_player_cont', -1, false);
    if(!player)
    {
        return;
    }
    var width=620;
    var height=400;
 
    var flashxSource = getMyContent(page.url, "TEXT", false);
    
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: "\""+width+"px", height: "\""+height+"px", backgroundColor: '#F4F4F4', zIndex: '999999'});
    modifyMyElement (player, 'div', '', true);
    appendMyElement (player, myPlayerWindow);
    
    flashxEmbedSourceURL = flashxSource.match('src="(http://.*?embed.php.*?)"')[1];
    console.log(flashxEmbedSourceURL);
    flashxEmbedSource = getMyContentGM(flashxEmbedSourceURL, 'TEXT', false, function (text) {
        flashxEmbedSource = text;
        //console.log(flashxEmbedSource);
       
        var flashxHash = flashxEmbedSource.match('name="hash"\\s*type="hidden"\\s*value="(.*?)"')[1];
        console.log(flashxHash);
        var flashxSecHash = flashxEmbedSource.match('name="sechash"\\s*type="hidden"\\s*value="(.*?)"')[1];
        console.log(flashxSecHash);
        var flashxSecWidth = flashxEmbedSource.match('name="width"\\s*type="hidden"\\s*value="(.*?)"')[1];
        console.log(flashxSecWidth);
        var flashxSecHeight = flashxEmbedSource.match('name="height"\\s*type="hidden"\\s*value="(.*?)"')[1];
        console.log(flashxSecHeight);
        var flashxVideoConfig;
        GM_xmlhttpRequest({
             method: "POST",
             url: "http://play.flashx.tv/player/captcha.php",
             data: "hash="+flashxHash+"&sechash="+flashxSecHash+"&width="+flashxSecWidth+"&height="+flashxSecHeight,
             headers: { "Content-Type": "application/x-www-form-urlencoded" },
             onload: function(response){
                  flashxVideoConfig = response.responseText;
                  flashxVideoConfig = flashxVideoConfig.match('config=(.*?)"')[1];
                  flashxVideoConfig = getMyContentGM(flashxVideoConfig, 'TEXT', false, function (text) {
                     flashxVideoConfig = text;
                     //console.log(flashxVideoConfig);
                     flashxVideoURL = flashxVideoConfig.match('<file>\\s*(.*?\.flv)\\s*</file>')[1];
                     console.log(flashxVideoURL);
                     flashxThumb = flashxVideoConfig.match('<image>\\s*(.*?\..{3})\\s*</image>')[1];
                     console.log(flashxThumb);
    
                     var flashxVideoList = {};
                     var flashxVideoFormats = {'1': 'Low Definition FLV'};
                     var flashxVideoFound = false;

                     if (flashxVideoURL) {
                         flashxVideoFound = true;
                         flashxVideoList[flashxVideoFormats[1]] = flashxVideoURL;
                     }

                    if (flashxVideoFound) {
                        /* Create Player */
                        player = {
                            'playerSocket': player,
                            'playerWindow': myPlayerWindow,
                            'videoList': flashxVideoList,
                            'videoPlay': flashxVideoFormats[1],
                            'videoThumb': flashxThumb,
                            'playerWidth': width,
                            'playerHeight': height
                        };
                        feature['container'] = true;
                        feature['widesize'] = false;
                        feature['autoplay'] = true;
                        feature['fullscreen'] = true;
                        feature['definition'] = false;
                        option['definition'] = 'LD';
                        option['definitions'] = ['Low Definition'];
                        option['container'] = 'FLV';
                        option['containers'] = ['FLV', 'Auto'];
                        createMyPlayer ();
                   }
              });
          }
       });
    });
}
// =====bitshare===== //
else if (page.url.indexOf('bitshare.com') != -1) {
       /* Get Player Window */
       var bitsharePlayerWindow = getMyElement ('', 'div', 'id', 'stream_player', -1, false);
    
       if (!bitsharePlayerWindow) {
               showMyMessage ('!player');
       }
       else {
           /* Get Videos Content */
           var bitshareVideoList = {};
           var bitshareVideoFormats = {'1': 'Standard Definition AVI'};
           document.getElementById('activdownloadbutton').click();
           var ajaxdl = getMyContent (page.url, 'ajaxdl\\s*=\\s*"(.*?)"', false);
           console.log("ajaxdl: " + ajaxdl);
           
           GM_xmlhttpRequest({
             method: "POST",
             url: "http://bitshare.com/files-ajax/ay2r3rc0/request.html",
             data: "request=generateID&ajaxid="+ajaxdl,
             headers: { "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': document.cookie },
             onload: function(response){
                  bitshareConfig = response.responseText;
                 var waitingTime = bitshareConfig.split(':')[1];
                 console.log(bitshareConfig);
                 window.setTimeout(function(){
                         var bitshareBodyHTML = document.documentElement.innerHTML;
                         var bitshareVideoURLmp4 = bitshareBodyHTML.match("url:\\s*'(.*?\.avi)'")[1];
                         console.log(bitshareVideoURLmp4);
                         
                         /* My Player Window */
                         var myPlayerWindow = createMyElement ('div', '', '', '', '');
                         styleMyElement (myPlayerWindow, {position: 'relative', width: '920px', height: '500px', backgroundColor: '#F4F4F4', zIndex: '99999'});
                         modifyMyElement (bitsharePlayerWindow, 'div', '', true);
                         appendMyElement (bitsharePlayerWindow, myPlayerWindow);
                         
                         var bitshareThumb = null;
                         console.log(bitshareThumb);
                         bitshareVideoList[bitshareVideoFormats[1]] = bitshareVideoURLmp4;

                        /* Create Player */
                        player = {
                        'playerSocket': bitsharePlayerWindow,
                        'playerWindow': myPlayerWindow,
                        'videoList': bitshareVideoList,
                        'videoPlay': bitshareVideoList[1],
                        'videoThumb': bitshareThumb,
                        'playerWidth': 920,
                        'playerHeight': 500
                        };
                        feature['container'] = true;
                        feature['widesize'] = false;
                        feature['autoplay'] = true;
                        feature['fullscreen'] = true;
                        feature['definition'] = false;
                        option['definition'] = 'SD';
                        option['definitions'] = ['Standard Definition'];
                        option['container'] = 'AVI';
                        option['containers'] = ['AVI', 'Auto'];
                        createMyPlayer ();
                 }, waitingTime * 1000);
             }
             });
      }
}
    // =====iFeng===== //
else if (page.url.indexOf('ifeng.com/') != -1) {
  
  /* Get Player Window */
  var ifPlayerWindow = getMyElement ('', 'div', 'class', 'long_video', 0, false);
  if (!ifPlayerWindow) ifPlayerWindow = getMyElement ('', 'div', 'class', 'player_main', 0, false);
  var ifPlayerWidth = '1000';
  if (!ifPlayerWindow) {
    ifPlayerWindow = getMyElement ('', 'div', 'class', 'video', 0, false);
    ifPlayerWidth = '600';
  }
  if (!ifPlayerWindow) {
    //showMyMessage ('!player');
  }
  else {
    /* Get Video Thumb */
    var ifVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

    /* Get Video ID */
    var ifVideoIDP1, ifVideoIDP2;
    var ifVideoID  = getMyContent (page.url, '"id":\\s+"(.*?)"', false);
    if (!ifVideoID) ifVideoID  = getMyContent (page.url, '"vid":"(.*?)"', false);
    if (!ifVideoID) ifVideoID = window.location.hash.replace(/#/, '');
    if (ifVideoID) {
      ifVideoIDP1 = ifVideoID.substr(34,1);
      ifVideoIDP2 = ifVideoID.substr(34,2);
    }
    else {
      return;
    }
    var ifVideoPath = ifVideoIDP1 + '/' + ifVideoIDP2 + '/' + ifVideoID + '.xml';

    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {width: ifPlayerWidth + 'px', height: '455px', backgroundColor: '#F4F4F4'});
    modifyMyElement (ifPlayerWindow, 'div', '', true);
    styleMyElement (ifPlayerWindow, {width: ifPlayerWidth + 'px', height: '455px', backgroundColor: '#F4F4F4'});
    appendMyElement (ifPlayerWindow, myPlayerWindow);

    /* Get Videos Content*/
    var ifVideo;
    if (window.location.hostname != 'v.ifeng.com') ifVideo = getMyContentGM ('http://v.ifeng.com/video_info_new/' + ifVideoPath, 'VideoPlayUrl="(.*?)"', false);
    else ifVideo = getMyContent ('http://v.ifeng.com/video_info_new/' + ifVideoPath, 'VideoPlayUrl="(.*?)"', false);
    
    /* Get Videos */
    if (ifVideo) {
      var ifVideoList = {};
      var ifDefaultVideo = 'Standard Definition MP4';
      ifVideoList[ifDefaultVideo] = ifVideo;
 
      /* Create Player */
      player = {'playerSocket': ifPlayerWindow, 'playerWindow': myPlayerWindow, 'videoList': ifVideoList, 'videoPlay': ifDefaultVideo, 'videoThumb': ifVideoThumb, 'playerWidth': ifPlayerWidth, 'playerHeight': 455};
      feature['container'] = false;
      feature['definition'] = false;
      feature['widesize'] = false;
      option['definitions'] = ['Low Definition'];
      option['containers'] = ['MP4', 'FLV', 'Any'];
      createMyPlayer ();
    }
    else {
      showMyMessage ('!videos');
    }
  }
}

// =====56===== //
else if (page.url.indexOf('56.com/') != -1) {
  
  /* Get Player Window */
  var fsPlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
  if (!fsPlayerWindow) {
    //showMyMessage ('!player');
  }
  else {
    /* Get Video ID */
    var fsVideoID, fsAlbumID;
    if (/v_([a-zA-Z0-9]+)\.html/.test(window.location.pathname)) fsVideoID = RegExp.$1;
    else if (/play_album-aid-(\d+)_vid-([a-zA-Z0-9]+)(_o-\d)?\.html/.test(window.location.pathname)) {
      fsAlbumID = RegExp.$1;
      fsVideoID = RegExp.$2;
    }
    
    /* Get Videos Content */
      var fsVideosContent = getMyContentGM ('http://vxml.56.com/json/' + fsVideoID + '/', 'TEXT', false, function(text){
          fsVideosContent = text;
        /* My Player Window */ 
        var myPlayerWindow = createMyElement ('div', '', '', '', '');
        styleMyElement (myPlayerWindow, {position: 'relative', width: '600px', height: '500px', backgroundColor: '#F4F4F4'});
        modifyMyElement (fsPlayerWindow, 'div', '', true);
        styleMyElement (fsPlayerWindow, {height: '100%'});
        appendMyElement (fsPlayerWindow, myPlayerWindow);
        
        /* Get Videos */
        if (fsVideosContent) {
          var fsVideoList = {};
          var fsVideoFound = false;
          var fsVideoFormats = {'normal': 'Very Low Definition FLV', 'clear': 'Low Definition FLV', 'super': 'Standard Definition FLV'};
          var fsVideoParser, fsVideo, fsVideoCode;
          for (var videoCode in fsVideoFormats) {
        fsVideoParser = '"url":"([^"]*?)","type":"' + videoCode + '"';
        fsVideo = fsVideosContent.match(fsVideoParser);
        if (fsVideo) {
          if (!fsVideoFound) fsVideoFound = true;
          fsVideoCode = fsVideoFormats[videoCode];
          fsVideoList[fsVideoCode] = fsVideo[1];
        }
          }
          var fsHTML5Video = 'http://vxml.56.com/html5/' + fsVideoID + '/';
          if (fsVideoList['Standard Definition FLV']) fsVideoList['Standard Definition MP4'] = fsHTML5Video;
          else if (fsVideoList['Low Definition FLV']) fsVideoList['Low Definition MP4'] = fsHTML5Video;
          else fsVideoList['Very Low Definition MP4'] = fsHTML5Video;
          var fsVideoThumb = fsVideosContent.match(/"bimg":"(.*?)"/);
          fsVideoThumb = (fsVideoThumb) ? fsVideoThumb[1] : null;
     
          if (fsVideoFound) {
        /* Create Player */
        var fsDefaultVideo = 'Very Low Definition FLV';
        player = {'playerSocket': fsPlayerWindow, 'playerWindow': myPlayerWindow, 'videoList': fsVideoList, 'videoPlay': fsDefaultVideo, 'videoThumb': fsVideoThumb, 'playerWidth': 600, 'playerHeight': 500};
        feature['widesize'] = false;
        option['definitions'] = ['Very Low Definition', 'Low Definition', 'Standard Definition'];
        option['containers'] = ['MP4', 'FLV', 'Any'];
        createMyPlayer ();
          }
          else {
        showMyMessage ('!videos');
          }
        }
        else {
          showMyMessage ('!content');
        }
      });


  }    
}

// =====TeleMadrid===== //
else if (page.url.indexOf('telemadrid.es/') != -1) {
  
  /* Get Player Window */
  var tmPlayerWindow = getMyElement ('', 'div', 'class', 'field-items', 0, false);
  if (!tmPlayerWindow) {
    //showMyMessage ('!player');
  }
  else {
    /* Get Videos Content URL */
    var tmFlashID, tmPlayerID, tmPublisherID, tmIsVid, tmIsUI, tmDynamicStreaming, tmVideoPlayer;
    var tmVideoObject = getMyContent (page.url, '<object(.*?)/object>', false);
    if (tmVideoObject) {
      tmFlashID = tmVideoObject.match(/\s+id="(.*?)"/);
      tmFlashID = (tmFlashID) ? tmFlashID[1] : null;
      tmPlayerID = tmVideoObject.match(/name="playerID"\s+value="(.*?)"/);
      tmPlayerID = (tmPlayerID) ? tmPlayerID[1] : null;
      tmPublisherID = tmVideoObject.match(/name="publisherID"\s+value="(.*?)"/);
      tmPublisherID = (tmPublisherID) ? tmPublisherID[1] : null;
      tmIsVid = tmVideoObject.match(/name="isVid"\s+value="(.*?)"/);
      tmIsVid = (tmIsVid) ? tmIsVid[1] : null;
      tmIsUI = tmVideoObject.match(/name="isUI"\s+value="(.*?)"/);
      tmIsUI = (tmIsUI) ? tmIsUI[1] : null;
      tmDynamicStreaming = tmVideoObject.match(/name="dynamicStreaming"\s+value="(.*?)"/);
      tmDynamicStreaming = (tmDynamicStreaming) ? tmDynamicStreaming[1] : null;
      tmVideoPlayer = tmVideoObject.match(/name="@videoPlayer"\s+value="(.*?)"/);
      tmVideoPlayer = (tmVideoPlayer) ? tmVideoPlayer[1] : null;
    }
    
    /* Get Videos Content */
    var tmVideosContentURL, tmVideosContent;
    if (tmFlashID && tmPlayerID && tmPublisherID && tmIsVid && tmIsUI && tmDynamicStreaming && tmVideoPlayer) {
      tmVideosContentURL = 'http://c.brightcove.com/services/viewer/htmlFederated?flashID=' + tmFlashID +'&playerID=' + tmPlayerID + '&publisherID=' + tmPublisherID + '&isVid=' + tmIsVid + '&isUI=' + tmIsUI + '&dynamicStreaming=' + tmDynamicStreaming + '&@videoPlayer=' + tmVideoPlayer;
        tmVideosContent = getMyContentGM(tmVideosContentURL, 'TEXT', false, function(text){
        tmVideosContent = text;
        /* My Player Window */
        var myPlayerWindow = createMyElement ('div', '', '', '', '');
        styleMyElement (myPlayerWindow, {position: 'relative', width: '630px', height: '370px', backgroundColor: '#F4F4F4'});
        modifyMyElement (tmPlayerWindow, 'div', '', true);
        styleMyElement (tmPlayerWindow, {height: '100%'});
        appendMyElement (tmPlayerWindow, myPlayerWindow); 
    
        /* Get Videos */
        if (tmVideosContent) {
          var tmVideoThumb = tmVideosContent.match(/"thumbnailURL":"(.*?)"/);
          tmVideoThumb = (tmVideoThumb) ? cleanMyContent(tmVideoThumb[1], false) : null;
          var tmVideos = tmVideosContent.match(/"renditions":\[\{(.*?)\}\]/);
          tmVideos = (tmVideos) ? tmVideos[1] : null;
          var tmVideo;
          var tmVideoList = {};
          if (tmVideos) {
        var tmVideo = tmVideos.match(/"defaultURL":"(.*?)"/);
        tmVideo = (tmVideo) ? tmVideo[1] : null;
          }
          
          if (tmVideo) {
        /* Create Player */
        var tmDefaultVideo = 'Low Definition MP4';
        tmVideoList[tmDefaultVideo] = cleanMyContent(tmVideo, false);
        player = {'playerSocket': tmPlayerWindow, 'playerWindow': myPlayerWindow, 'videoList': tmVideoList, 'videoPlay': tmDefaultVideo, 'videoThumb': tmVideoThumb, 'playerWidth': 630, 'playerHeight': 370};
        feature['container'] = false;
        feature['definition'] = false;
        feature['widesize'] = false;
        option['definition'] = 'LD';
        option['container'] = 'MP4';
        option['definitions'] = ['Low Definition'];
        option['containers'] = ['MP4'];
        createMyPlayer ();
          }
          else {
        showMyMessage ('!videos');
          }
        }
        else {
          showMyMessage ('!content');
        }
        });
    }
    else return;
  }            
}
})();