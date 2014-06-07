// ==UserScript==
// @name		ViewTube_GM
// @version		2014.03.29
// @description		Watch videos from video sharing websites without Flash Player.
// @author		trupf
// @namespace		https://userscripts.org/users/trupf
// @downloadURL		https://userscripts.org/scripts/source/169665.user.js
// @updateURL		https://userscripts.org/scripts/source/169665.meta.js
// @icon		http://s3.amazonaws.com/uso_ss/icon/87011/large.png
// @include		http://youtube.com*
// @include		http://www.youtube.com*
// @include		https://youtube.com*
// @include		https://www.youtube.com*
// @include		http://dailymotion.com*
// @include		http://www.dailymotion.com*
// @include		https://dailymotion.com*
// @include		https://www.dailymotion.com*
// @include		http://vimeo.com*
// @include		http://www.vimeo.com*
// @include		https://vimeo.com*
// @include		https://www.vimeo.com*
// @include		http://metacafe.com*
// @include		http://www.metacafe.com*
// @include		https://metacafe.com*
// @include		https://www.metacafe.com*
// @include		http://break.com*
// @include		http://www.break.com*
// @include		https://break.com*
// @include		https://www.break.com*
// @include		http://funnyordie.com*
// @include		http://www.funnyordie.com*
// @include		https://funnyordie.com*
// @include		https://www.funnyordie.com*
// @include		http://videojug.com*
// @include		http://www.videojug.com*
// @include		https://videojug.com*
// @include		https://www.videojug.com*
// @include		http://mevio.com*
// @include		http://*.mevio.com*
// @include		https://mevio.com*
// @include		https://*.mevio.com*
// @include		http://blip.tv*
// @include		http://www.blip.tv*
// @include		https://blip.tv*
// @include		https://www.blip.tv*
// @include		http://veoh.com*
// @include		http://www.veoh.com*
// @include		https://veoh.com*
// @include		https://www.veoh.com*
// @include		http://veehd.com*
// @include		http://www.veehd.com*
// @include		https://veehd.com*
// @include		https://www.veehd.com*
// @include		http://imdb.com/video*
// @include		http://www.imdb.com/video*
// @include		https://imdb.com/video*
// @include		https://www.imdb.com/video*
// @include		http://crackle.com*
// @include		http://www.crackle.com*
// @include		https://crackle.com*
// @include		https://www.crackle.com*
// @include		http://vevo.com*
// @include		http://www.vevo.com*
// @include		https://vevo.com*
// @include		https://www.vevo.com*
// @include		http://facebook.com*
// @include		http://www.facebook.com*
// @include		https://facebook.com*
// @include		https://www.facebook.com*
// @license		GPLv3
// @grant 		GM_xmlhttpRequest
// @grant 		GM_setValue
// @grant 		GM_getValue
// @run-at      document-end

// ==/UserScript==


/*
  
  Copyright (C) 2010 - 2013 Tobias Rupf

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
  
  This Program is mainly based on the work of Sebastian Luncan
  (Website: http://isebaro.com/viewtube)
  
  Youtube Signature decryption and mutation observers by Gantt.
  (see http://userscripts.org/scripts/show/25105)
  
*/

// ==========Variables========== //

// Userscript
var userscript = 'ViewTube_GM';

// Page
var page = {win: window, doc: document, body: document.body, url: window.location.href};

// Player
var player = {};
var myPlayerWindow;
var feature = {'autoplay': true, 'definition': true, 'container': true, 'widesize': true, 'fullsize': true};
var option = {'plugin': 'Auto', 'autoplay': false, 'autoget': false, 'definition': 'HD', 'container': 'MP4', 'widesize': false, 'fullsize': false};
var plugins = ['Auto', 'HTML5', 'MPEG', 'MP4', 'FLV', 'VLC'];
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
  'QT': 'video/quicktime',
  'VLC': 'application/x-vlc-plugin',
  'Totem': 'application/x-totem-plugin',
  'Xine': 'application/x-xine-plugin'
};

// Links
var website = 'http://userscripts.org/scripts/show/169665';
var contact = 'http://userscripts.org/scripts/issues/169665';


// ==========Fixes========== //

// Don't run on frames or iframes
if (window.top != window.self)  return;

 
// ==========Functions========== //

function createVideoElement (type, content) {
  function createPlayerElement (type, content) {
    player['contentVideo'] = createMyElement (type, content, '', '', '');
    player['contentVideo'].width = player['contentWidth'];
    player['contentVideo'].height = player['contentHeight'];
    styleMyElement (player['contentVideo'], {position: 'relative', width: player['contentWidth'] + 'px', height: player['contentHeight'] + 'px'});
    modifyMyElement (player['playerContent'], 'div', '', true);
    appendMyElement (player['playerContent'], player['contentVideo']); 
  }
  /* Resolve redirects, if possible */
//  2013-10-25 Since lastest changes on Vimeo not more required 
/*    if (typeof(GM_xmlhttpRequest) == "function") {
    var GM_xml = GM_xmlhttpRequest({
        method: "HEAD",
        headers: {
          "Referer": page.url
        },
        url: content,
        synchronous: false,
        onload: function(response) {
          content = (typeof(response.finalUrl) == "string") ? (response.finalUrl.indexOf('http') == 0) ? response.finalUrl : content : content;
          createPlayerElement(type, content);
        },
        onabort: function(response) {
          content = (typeof(response.finalUrl) == "string") ? (response.finalUrl.indexOf('http') == 0) ? response.finalUrl : content : content;
          createPlayerElement(type, content);
        },
        onprogress: function(response) {    // this is required in older Greasemonkey as it will dowload complete content despite the "HEAD" request method!!!
          GM_xml.abort();
        }
      });
    }
    else */ { 
      setTimeout(function() { createPlayerElement(type, content); }, 0);
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
      obj.autoplay = 'autoplay';
      obj.volume = 0.5;
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure your browser supports HTML5\'s Video and this video codec. If you think it\'s a script issue, please report it <a href="' + contact + '">here</a>.';
    }
    else if (type == 'object') {
      obj.data = content;
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure a video plugin is installed. If you think it\'s a script issue, please report it <a href="' + contact + '">here</a>.<param name="scale" value="aspect"><param name="stretchtofit" value="true"><param name="autostart" value="true"><param name="autoplay" value="true">';
    }
    else if (type == 'embed') {
      if (option['plugin'] == 'VLC') obj.setAttribute('target', content);
      else obj.src = content;
      obj.innerHTML = '<br><br>The video should be loading. If it doesn\'t load, make sure a video plugin is installed. If you think it\'s a script issue, please report it <a href="' + contact + '">here</a>.<param name="scale" value="aspect"><param name="stretchtofit" value="true"><param name="autostart" value="true"><param name="autoplay" value="true">';
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
	}
	else {
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
  if (content && chObj) {
    if (type == 'html' || type == 'body' || type == 'div' || type == 'option') coObj = chObj.innerHTML;
    else if (type == 'object') coObj = chObj.data;
    else if (type == 'img' || type == 'video' || type == 'embed') coObj = chObj.src;
    else coObj = chObj.textContent;
    return coObj;
  }
  else {
    return chObj;
  }
}

function modifyMyElement (obj, type, content, clear, hide) {
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
  if (hide) {
    for(var i = 0; i < obj.children.length; i++) {
      styleMyElement(obj.children[i], {display: 'none'});
    }
  }
}

function cleanMyElement (element, hide) {
  var elEmbed, elVideo;
  if (hide) styleMyElement (element, {display: 'none'});
  elEmbed = getMyElement (element, 'embed', 'tag', '', 0, false) || getMyElement (element, 'object', 'tag', '', 0, false);
  if (elEmbed && elEmbed.parentNode) {
    removeMyElement (elEmbed.parentNode, elEmbed);
    if (!hide) return;
  }
  elVideo = getMyElement (element, 'video', 'tag', '', 0, false);
//  if (elVideo && elVideo.currentSrc) {
  if (elVideo && elVideo.src && elVideo.currentSrc) {
    modifyMyElement (elVideo, 'video', 'none', true);
//    if (!hide && elVideo.parentNode) removeMyElement (elVideo.parentNode, elVideo);
//    if (!hide && elVideo.parentNode) elVideo.pause();
    if (elVideo.parentNode) try {elVideo.pause()} catch(e) {};
    return;
  }
  var elWait = 50;
  var elRemove = page.win.setInterval (function () {
    if (!elVideo) {
      elVideo = getMyElement (element, 'video', 'tag', '', 0, false);
      if (!elVideo) {
	elEmbed = getMyElement (element, 'embed', 'tag', '', 0, false) || getMyElement (element, 'object', 'tag', '', 0, false);
	if (elEmbed && elEmbed.id != 'vtVideo' && elEmbed.parentNode) {
	  removeMyElement (elEmbed.parentNode, elEmbed);
	  page.win.clearInterval (elRemove);
	}
      }
    }
    if (elVideo && elVideo.id != 'vtVideo' && elVideo.currentSrc) {
      modifyMyElement (elVideo, 'video', 'none', true);
      if (!hide && elVideo.parentNode) removeMyElement (elVideo.parentNode, elVideo);
      page.win.clearInterval (elRemove);
    }
    if (elWait > 0) elWait--;
    else page.win.clearInterval (elRemove);
  }, 500);
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
  parent.replaceChild(orphan, child);
}

function createHiddenElem(tag, id) {
  var elem=document.createElement(tag);
  elem.setAttribute('id', id);
  elem.setAttribute('style', 'display:none;');
  page.doc.body.appendChild(elem);
  return elem;
}

function injectScript(code) {
  var script=document.createElement('script');
  script.type='application/javascript';
  script.textContent=code;
  page.doc.body.appendChild(script);
  page.doc.body.removeChild(script);
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
    if (option['plugin'] == 'HTML5') player['contentVideo'] = createVideoElement ('video', player['videoList'][player['videoPlay']]);
//    else if ((navigator.appName == 'Netscape') && (navigator.userAgent.indexOf("AppleWebKit") == -1)) player['contentVideo'] = createVideoElement ('embed', player['videoList'][player['videoPlay']]);
    else if (navigator.appName == 'Netscape') player['contentVideo'] = createVideoElement ('embed', player['videoList'][player['videoPlay']]);
    else createVideoElement ('object', player['videoList'][player['videoPlay']]);
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
    vdoD = vdoD.replace(/Ultra High Definition/, 'UHD');
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
      var playerPosition = 'fixed';
      var playerWidth = page.win.innerWidth || page.doc.documentElement.clientWidth;
      var playerHeight = page.win.innerHeight || page.doc.documentElement.clientHeight;
      var playerIndex = '9999999999';
      if (!player['isFullsize']) {
        if (feature['widesize']) styleMyElement (player['buttonWidesize'], {display: 'none'});
        modifyMyElement (player['buttonFullsize'], 'div', '-', false);
//        appendMyElement (page.body, player['playerWindow']);
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
      var playerIndex = 'auto';
      if (feature['widesize']) styleMyElement (player['buttonWidesize'], {display: 'inline'});
      modifyMyElement (player['buttonFullsize'], 'div', '+', false);
//      appendMyElement (player['playerSocket'], player['playerWindow']);
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
  else  styleMyElement (player['playerWindow'], {position: playerPosition, top: '0px', left: '0px', width: playerWidth + 'px', height: playerHeight + 'px', zIndex: playerIndex});
    
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
    myPageContent = getMyElement ('', 'html', 'tag', '', 0, true);
    if (!myPageContent) myPageContent = getMyElement ('', 'body', '', '', -1, true);
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

function setMyOptions (key, value) {
  var key_extended = key + "_" + page.url.match(/https?:\/\/(www\.)?(.*?)\//)[2];
  if (typeof GM_setValue === 'function') {
    GM_setValue(key_extended, value);
  }
  else {
    try {
      localStorage.setItem(key_extended, value);
    }
    catch(e) {
      var date = new Date();
      date.setTime(date.getTime() + (356*24*60*60*1000));
      var expires = '; expires=' + date.toGMTString();
      page.doc.cookie = key_extended + '=' + value + expires + '; path=/';
    }
  }
}

function getMyOption (key) {
  var key_extended = key + "_" + page.url.match(/https?:\/\/(www\.)?(.*?)\//)[2];
  if ((typeof GM_getValue === 'function')   ){
      return GM_getValue(key_extended, null);
  }
  else
  try {
    return localStorage.setItem(key_extended);
  }
  catch(e) {
    var cookies = page.doc.cookie.split(';');
    for (var i=0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(key) == 0) {
        return cookie.substring(key.length + 1, cookie.length);
      }
    }
  }
}

function getMyOptions () {
  var tmpOption;
  tmpOption = getMyOption('viewtube_plugin');
  option['plugin'] = tmpOption ? tmpOption : option['plugin'];
  option['autoplay'] = getMyOption('viewtube_autoplay');
  option['autoplay'] = (option['autoplay'] == 'true' || option['autoplay'] == true) ? true : false;
  tmpOption = getMyOption('viewtube_definition');
  option['definition'] = tmpOption ? tmpOption : option['definition'];
  tmpOption = getMyOption('viewtube_container');
  option['container'] = tmpOption ? tmpOption : option['container'];
  option['widesize'] = getMyOption('viewtube_widesize');
  option['widesize'] = (option['widesize'] == 'true' || option['widesize'] == true) ? true : false;
  option['fullsize'] = getMyOption('viewtube_fullsize');
  option['fullsize'] = (option['fullsize'] == 'true' || option['fullsize'] == true) ? true : false;
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

function crossXmlHttpRequest(details) { // cross-browser GM_xmlhttpRequest
  if (typeof GM_xmlhttpRequest === 'function') { // Greasemonkey, Tampermonkey, Firefox extension, Chrome script
    GM_xmlhttpRequest(details);
  }  else if (typeof window.opera !== 'undefined' && window.opera && typeof opera.extension !== 'undefined' && 
             typeof opera.extension.postMessage !== 'undefined') { // Opera 12 extension
      opera.extension.postMessage({'action':'xhr', 'url':details.url});
      opera.extension.onmessage = function(event) {
        if (event.data.action === 'xhr-response' && event.data.error === false) {
          if (details['onload']) {
            details['onload']({responseText:event.data.response, readyState:4, status:200});
          }
        }
      }
  } else if (typeof window.opera === 'undefined' && typeof XMLHttpRequest === 'function') { // Opera 15+ extension
      var xhr=new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (details['onload'] && xhr.status >= 200 && xhr.status < 300) {
            details['onload']({responseText:xhr.responseText, readyState:xhr.readyState, status:xhr.status});
          }
        }
      }
      xhr.open(details.method, details.url, true);
      xhr.send();
  }
}
    
function getMyContentGM(url, pattern, clean, callback) {
  var myPageContent, myVideosParse, myVideosContent;  
  crossXmlHttpRequest({
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


// ==========Websites========== //

// =====YouTube===== //

if (page.url.indexOf('youtube.com/watch\?v=') != -1) {
  var decodeArray=[];
    
  function findSignatureCode(sourceCode) {
    var arr=[];
    var functionName=sourceCode.match(/\.signature\s*=\s*(\w+)\(\w+\)/);
     if (functionName==null) return; else functionName = functionName[1];
    var regCode=new RegExp('function '+functionName+'\\s*\\(\\w+\\)\\s*{\\w+=\\w+\\.split\\(""\\);(.+);return \\w+\\.join');
    var functionCode=sourceCode.match(regCode)[1];
    if (functionCode==null) return;
    var regSlice=new RegExp('slice\\s*\\(\\s*(.+)\\s*\\)');
    var regSwap=new RegExp('\\w+\\s*\\(\\s*\\w+\\s*,\\s*([0-9]+)\\s*\\)');
    var regInline=new RegExp('\\w+\\[0\\]\\s*=\\s*\\w+\\[([0-9]+)\\s*%\\s*\\w+\\.length\\]');
    var functionCodePieces=functionCode.split(';');
    for (var i=0; i<functionCodePieces.length; i++) {
      functionCodePieces[i]=functionCodePieces[i].trim();
      if (functionCodePieces[i].length>0) 
        if (functionCodePieces[i].indexOf('slice') >= 0) { // slice
        var slice=functionCodePieces[i].match(regSlice)[1];
        slice=parseInt(slice, 10);
        if (typeof slice === 'number'){ 
          arr.push(-slice);
          } else return;
      } else if (functionCodePieces[i].indexOf('reverse') >= 0) {
        arr.push(0);
      } else if (functionCodePieces[i].indexOf('[0]') >= 0) {
          if (i+2<functionCodePieces.length &&
          functionCodePieces[i+1].indexOf('.length') >= 0 &&
          functionCodePieces[i+1].indexOf('[0]') >= 0) {
            var inline=functionCodePieces[i+1].match(regInline)[1];
            inline=parseInt(inline, 10);
            arr.push(inline);
            i+=2;
          } else return;
      } else if (functionCodePieces[i].indexOf(',') >= 0) {
        var swap=functionCodePieces[i].match(regSwap)[1];      
        swap=parseInt(swap, 10);
        if (typeof swap === 'number'){
          arr.push(swap);
        } else return;
      } else return;
    }
    return arr;
  }

  function decryptSignature(sig) {
    function swap(a,b){var c=a[0];a[0]=a[b%a.length];a[b]=c;return a};
    function decode(sig, arr) { // encoded decryption
      if (typeof sig !== 'string') return null;
      var sigA=sig.split('');
      for (var i=0;i<arr.length;i++) {
        var act=parseInt(arr[i]);
        if (typeof act !== 'number') return null;
        sigA=(act>0)?swap(sigA, act):((act==0)?sigA.reverse():sigA.slice(-act));
      }
      var result=sigA.join('');
      return (result.length==81)?result:sig;
    }
    if (sig==null) return ''; 
    if (decodeArray) {
      var sig2=decode(sig, decodeArray);
      if (sig2 && sig2.length==81) return sig2;
    }
    return sig; 
  }  
  
  function yt_run(isMutation) {
    page = {win: window, doc: document, body: document.body, url: window.location.href}
    /* Get Player Window */
    var ytPlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
    if (!ytPlayerWindow) {
      ytPlayerWindow = getMyElement ('', 'div', 'id', 'p', -1, false);
    }
    if (!ytPlayerWindow) {
      showMyMessage ('!player');
    }
    else {
      var ytVideoID = null;
      var ytVideosContent = null;
      var ytVideosEncodedFmts = null;
      var ytVideosAdaptiveFmts = null;
      var ytVideosDashmpd;

      /* Clean Player Window */
      var ytWatchPlayer = getMyElement ('', 'div', 'id', 'player-api', -1, false);
      if (ytWatchPlayer) cleanMyElement(ytWatchPlayer, true);

      //var ytAutoplayButton = getMyElement ('', 'div', 'class', 'watch7-playlist-bar-secondary-controls', 1, false);
      var ytNavControl = getMyElement ('', 'div', 'class', 'playlist-nav-controls', 0, false);
      if (ytNavControl) {
        if (ytNavControl.children[0].title == "Autoplay") {
          var ytAutoplayButton = ytNavControl.children[0];
          if (ytAutoplayButton.className.indexOf('yt-uix-button-toggled') != -1) {
            ytAutoplayButton.className = ytAutoplayButton.className.replace(' yt-uix-button-toggled','');
            setTimeout(function(){document.getElementsByClassName('playlist-nav-controls')[0].children[0].click(); document.getElementsByClassName('playlist-nav-controls')[0].children[0].click();},5500);
          }
        } else {  // create missing buttons
/*          var ytRandomplayButtonnew = document.createElement('button');
          ytRandomplayButtonnew.className = "shuffle-playlist yt-uix-tooltip yt-uix-button yt-uix-button-player-controls yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip yt-uix-button-empty"
          ytRandomplayButtonnew.innerHTML = '<span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-appbar-shuffle-video-list" src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Zufallswiedergabe" title=""></span>'
          ytRandomplayButtonnew.setAttribute("role","button");
          ytRandomplayButtonnew.setAttribute("data-button-toggle", "true");
          ytRandomplayButtonnew.setAttribute("onclick"," ;return false;");
          ytRandomplayButtonnew.setAttribute("title","Random");
          ytRandomplayButtonnew.setAttribute("type","button");
          ytRandomplayButtonnew.setAttribute("data-tooltip-text","Random");
          ytNavControl.insertBefore(ytRandomplayButtonnew,ytNavControl.children[0]);
*/
          var ytAutoplayButtonnew = document.createElement('button');
          ytAutoplayButtonnew.className = "yt-uix-tooltip toggle-autoplay yt-uix-button yt-uix-button-toggled yt-uix-button-player-controls yt-uix-button-size-default yt-uix-button-has-icon yt-uix-tooltip yt-uix-button-empty"
          ytAutoplayButtonnew.innerHTML = '<span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-appbar-autoplay" src="http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Autoplay" title=""></span>'
          ytAutoplayButtonnew.setAttribute("role","button");
          ytAutoplayButtonnew.setAttribute("data-button-toggle", "true");
          ytAutoplayButtonnew.setAttribute("onclick"," ;return false;");
          ytAutoplayButtonnew.setAttribute("title","Autoplay");
          ytAutoplayButtonnew.setAttribute("type","button");
          ytAutoplayButtonnew.setAttribute("data-tooltip-text","Autoplay");
          ytNavControl.insertBefore(ytAutoplayButtonnew,ytNavControl.children[0]);
          setTimeout(function(){if (document.getElementsByClassName('playlist-nav-controls')[0].children[0].className.indexOf('yt-uix-button-toggled') != -1) document.getElementsByClassName('playlist-nav-controls')[0].children[0].click();},5000);
        }
      }

      /* Get Video Thumbnail */
      ytVideoID = page.url.match (/watch\?v=(.*?)(&|$)/)[1];
      var ytVideoThumb = getMyContent (page.url, 'link\\s+itemprop="thumbnailUrl"\\s+href="(.*?)"', false);
      if (!ytVideoThumb) ytVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);
      if (!ytVideoThumb) {
        if (ytVideoID) ytVideoThumb = page.win.location.protocol + '//img.youtube.com/vi/' + ytVideoID + '/0.jpg';
      }

      /* Get Video Title */
      var ytVideoTitle = getMyContent (page.url, 'meta\\s+itemprop="name"\\s+content="(.*?)"', false);
      if (!ytVideoTitle) ytVideoTitle = getMyContent (page.url, 'meta\\s+property="og:title"\\s+content="(.*?)"', false);
      if (!ytVideoTitle) ytVideoTitle = page.doc.title;
      if (ytVideoTitle) {
        ytVideoTitle = ytVideoTitle.replace(/&quot;/g, '\'').replace(/&#34;/g, '\'').replace(/"/g, '\'');
        ytVideoTitle = ytVideoTitle.replace(/&#39;/g, '\'').replace(/'/g, '\'');
        ytVideoTitle = ytVideoTitle.replace(/&amp;/g, 'and').replace(/&/g, 'and');
        ytVideoTitle = ytVideoTitle.replace(/\?/g, '').replace(/[#:\*]/g, '-').replace(/\//g, '-');
        ytVideoTitle = ytVideoTitle.replace(/^\s+|\s+$/, '').replace(/\.+$/g, '');
        ytVideoTitle = ytVideoTitle.replace(/^YouTube\s-\s/, '');
      }
      var ytVideoAvailable = getMyElement ('', 'div', 'id', 'player-unavailable', -1, false);
      if (ytVideoAvailable && ytVideoAvailable.className.indexOf('hid') == -1) styleMyElement (ytVideoAvailable, {display: 'inline'});
      myPlayerWindow = getMyElement ('', 'div', 'id', 'MyytWindow', -1, false);
      if (myPlayerWindow) removeMyElement(myPlayerWindow.parentNode,myPlayerWindow);

      /* Get Videos Content */
      var ytScriptURL;
      if (ytVideoAvailable && ytVideoAvailable.className.indexOf('hid') != -1) {
        styleMyElement (ytVideoAvailable, {display: 'none'});
        if (isMutation) {
          var injectedElement = document.getElementById('download-youtube-video-debug-info9');
          if (injectedElement==null) {
            injectedElement = createHiddenElem('pre', 'download-youtube-video-debug-info9');
          }
            injectScript ('if (typeof ytplayer.config == "object" && ytplayer.config != null) document.getElementById("download-youtube-video-debug-info9").appendChild(document.createTextNode(\'"video_id":"\'+ytplayer.config.args.video_id+\'", "js":"\'+ytplayer.config.assets.js+\'", "adaptive_fmts":"\'+ytplayer.config.args.adaptive_fmts+\'", "dashmpd":"\'+ytplayer.config.args.dashmpd+\'", "url_encoded_fmt_stream_map":"\'+ytplayer.config.args.url_encoded_fmt_stream_map+\'"\'));');            
          var code = getMyElement('','pre','id','download-youtube-video-debug-info9',-1,false).innerHTML;
          if (code) {
            if (ytVideoID == code.match(/\"video_id\":\s*\"([^\"]+)\"/)[1]) {
              ytVideosEncodedFmts=code.match(/\"url_encoded_fmt_stream_map\":\s*\"([^\"]+)\"/)[1].replace(/&amp;/g,'\\u0026');
              if (ytVideosEncodedFmts == 'undefined') ytVideosEncodedFmts = null;
              if (ytVideosEncodedFmts) ytVideosEncodedFmts = cleanMyContent(ytVideosEncodedFmts, false);
              ytVideosAdaptiveFmts=code.match(/\"adaptive_fmts\":\s*\"([^\"]+)\"/)[1].replace(/&amp;/g,'\\u0026');
              if (ytVideosAdaptiveFmts == 'undefined') ytVideosAdaptiveFmts = null;
              if (ytVideosAdaptiveFmts) ytVideosAdaptiveFmts = cleanMyContent(ytVideosAdaptiveFmts, false);
              ytVideosDashmpd=code.match(/\"dashmpd\":\s*\"([^\"]+)\"/)[1].replace(/&amp;/g,'\\u0026');
              ytScriptURL=code.match(/\"js\":\s*\"([^\"]+)\"/)[1];
            }
            removeMyElement(injectedElement.parentNode, injectedElement);
          } 
        }
        else if (!ytVideosEncodedFmts && !ytVideosAdaptiveFmts) {
          ytVideosEncodedFmts = getMyContent(page.url, '"url_encoded_fmt_stream_map":\\s+"(.*?)"', false);
          if (ytVideosEncodedFmts) ytVideosEncodedFmts = cleanMyContent(ytVideosEncodedFmts, false);
          ytVideosAdaptiveFmts = getMyContent(page.url, '"adaptive_fmts":\\s+"(.*?)"', false);
          if (ytVideosAdaptiveFmts) ytVideosAdaptiveFmts = cleanMyContent(ytVideosAdaptiveFmts, false);
          ytVideosDashmpd = getMyContent(page.url, '"dashmpd":\\s+"(.*?)"', false);
          if (ytVideosDashmpd) ytVideosDashmpd = cleanMyContent(ytVideosDashmpd, false);
        }
      }
      if (ytVideosEncodedFmts) {
        ytVideosContent = ytVideosEncodedFmts;
      }
      if (ytVideosAdaptiveFmts) {
        if (ytVideosContent) ytVideosContent += ',' + ytVideosAdaptiveFmts;
        else ytVideosContent = ytVideosAdaptiveFmts;
      }
     
      function getYoutubeVideos(ytVideosContent, yturl) {
        if (yturl != page.url) return;

        /* Parse HLS */
        function ytHLS(ytHLSVideos) {
          var ytHLSFormats = {
            '92': 'Very Low Definition MP4',
            '93': 'Low Definition MP4',
            '94': 'Standard Definition MP4',
            '95': 'High Definition MP4'
          };
          ytVideoList["Any Definition MP4"] = ytHLSVideos;
          var ytHLSContent = getMyContent(ytHLSVideos, 'TEXT', false);
          if (ytHLSContent) {
            var ytHLSMatcher = new RegExp('(http.*?m3u8)', 'g');
            ytHLSVideos = ytHLSContent.match(ytHLSMatcher);
            var ytHLSVideo, ytVideoCodeParse, ytVideoCode, myVideoCode;
            if (ytHLSVideos) {
              for (var i = 0; i < ytHLSVideos.length; i++) {
                ytHLSVideo = ytHLSVideos[i];
                ytVideoCodeParse = ytHLSVideo.match(/\/itag\/(\d{1,3})\//);
                ytVideoCode = (ytVideoCodeParse) ? ytVideoCodeParse[1] : null;
                if (ytVideoCode) {
                  myVideoCode = ytHLSFormats[ytVideoCode];
                  if (myVideoCode && ytHLSVideo) {
                    ytVideoList[myVideoCode] = ytHLSVideo;
                  }
                }
              }
            }
          }
          ytVideoTitle = null;
          ytPlayer();
          option['definitions'] = ['High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
          option['containers'] = ['MP4'];
          createMyPlayer ();
        }

        function createMyytPlayer (yturl) {
            if (yturl != page.url) return;
            /* Get Watch Sidebar */
            var ytSidebarWindow = getMyElement ('', 'div', 'id', 'watch7-sidebar', -1, false);
            if (!ytSidebarWindow) ytSidebarWindow = getMyElement ('', 'div', 'id', 'rc', -1, false);

            /* Create Player */
            var ytDefaultVideo = 'Low Definition MP4';
            player = {
              'playerSocket': ytPlayerWindow,
              'playerWindow': myPlayerWindow,
              'videoList': ytVideoList,
              'videoPlay': ytDefaultVideo,
              'videoThumb': ytVideoThumb,
              'videoTitle': ytVideoTitle,
              'playerWidth': 640,
              'playerHeight': 390,
              'playerWideWidth': 1040,
              'playerWideHeight': 612,
              'sidebarWindow': ytSidebarWindow,
              'sidebarMarginNormal': -390,
              'sidebarMarginWide': 10
            };
            option['definitions'] = ['Ultra High Definition', 'Full High Definition', 'High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
            option['containers'] = ['MP4', 'WebM', 'FLV', '3GP', 'Any'];
            createMyPlayer ();
        }

        /* Playlist Window */
        var ytPlaylistWindow = getMyElement ('', 'div', 'id', 'playlist-tray', -1, false);
        if (ytPlaylistWindow) {
          var ytPlaylistWidth = ytPlaylistWindow.clientWidth;
          if (ytPlaylistWidth > 940)  ytPlaylistWidth = ytPlaylistWidth - 640;
          styleMyElement (ytPlaylistWindow, {width: ytPlaylistWidth + 'px', position: 'absolute', margin: '0px 0px 0px 640px'});
        }

        /* My Player Window */
        myPlayerWindow = createMyElement ('div', '', '', '', '');
        myPlayerWindow.id = 'MyytWindow';
        styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '390px', backgroundColor: '#F4F4F4', zIndex: '99999'});
        appendMyElement(ytPlayerWindow, myPlayerWindow);

        /* Get Videos */
        var ytVideoAvailable = getMyElement ('', 'div', 'id', 'player-unavailable', -1, false);
        if (ytVideosContent && !ytVideosContent.match(/"statusCode":[^0]/)) {
          var ytVideoList = {};
          var ytVideoFound = false;
          var veVideoFound = false;
          if (ytVideosContent.match(/VevoImages/)) {
            var veVideoFormats = {
               'High': 'Standard Definition MP4'
              ,'Med': 'Low Definition MP4'
              ,'Low': 'Ultra Low Definition MP4'
              ,'HTTP Live Streaming': 'HTTP Live Streaming'
              ,'564000': 'Very Low Definition MP4'
              ,'864000': 'Low Definition MP4'
              ,'1328000':'Standard Definition MP4'
              ,'1728000':'Standard Definition HBR MP4'
              ,'2528000':'High Definition MP4'
              ,'3328000':'High Definition HBR MP4'
              ,'4392000':'Full High Definition MP4'
              ,'5392000':'Full High Definition HBR MP4'
            }
            var veVideosJSON = JSON.parse(ytVideosContent);
            if (veVideosJSON) {
            if (ytVideoAvailable) cleanMyElement (ytVideoAvailable, true);
            var veVideo, veVideoVersion;
            for (var i = 0; i < veVideosJSON.video.videoVersions.length - 1; i++) {
              if (veVideosJSON.video.videoVersions[i].sourceType == 2) {
                if (veVideosJSON.video.videoVersions[i].version in {3:1,4:1}) {
                  for (var veVideoFormat in veVideoFormats) {
                    veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="' + veVideoFormat + '" url="(.*?)"');
                    if (veVideo) {
                      if (!ytVideoFound) ytVideoFound = true;
                      if (!veVideoFound) veVideoFound = true;
                      ytVideoList[veVideoFormats[veVideoFormat]] = veVideo[1];
                    }
                  }
                }
              }
              if (veVideoFound) break;
            }
            veVideoFound = false;
            for (var i = 0; i < veVideosJSON.video.videoVersions.length - 1; i++) {
              if (veVideosJSON.video.videoVersions[i].sourceType == 3) {
                for (var veVideoFormat in veVideoFormats) {
                  veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="' + veVideoFormat + '" url="(.*?)"');
                  if (veVideo) {
                    if (!ytVideoFound) ytVideoFound = true;
                    if (!veVideoFound) veVideoFound = true;
                    ytVideoList[veVideoFormats[veVideoFormat] + ' MP4'] = veVideo[1];
                  }
                }
              }
              if (veVideoFound) break;
            }
            veVideoFound = false;
            for (var i = 0; i < veVideosJSON.video.videoVersions.length - 1; i++) {
              if (veVideosJSON.video.videoVersions[i].sourceType == 4) {
                for (var veVideoFormat in veVideoFormats) {
                  veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="' + veVideoFormat + '" url="(.*?)"');
                  if (veVideo) {
                    if (!ytVideoFound) ytVideoFound = true;
                    if (!veVideoFound) veVideoFound = true;
                    ytVideoList[veVideoFormats[veVideoFormat] + ' HD MP4'] = veVideo[1];
                  }
                }
              }
              if (veVideoFound) break;
            }
            veVideoFound = false;
            for (var i = 0; i < veVideosJSON.video.videoVersions.length - 1; i++) {
              if (veVideosJSON.video.videoVersions[i].sourceType == 5 && veVideosJSON.video.videoVersions[i].version == 1) {
                veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="HTTP Level3" url="(.*?)"');
                if (!veVideo) veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="HTTPLevel3" url="(.*?)"');
                if (veVideo) veVideoFound = true;
                if (veVideo) getMyContentGM(veVideo[1],'TEXT',false, function (vesmilfile) {
                    var veurl = yturl;
                    for (veVideoFormat in veVideoFormats) {
                    if (vesmilfile.match(veVideoFormat)) {
                      ytVideoList[veVideoFormats[veVideoFormat]] = "http://smil.lvl3.vevo.com" + vesmilfile.match('video src="mp4:(.*?)" system-bitrate="' + veVideoFormat + '"')[1];
                    }
                  }
                  createMyytPlayer(veurl);
                });
              }
            }
            if (!veVideoFound) if (ytVideoFound) createMyytPlayer(yturl); else showMyMessage ('!videos');
          }
        } else {
            var ytVideoFormats = {
              '5': 'Very Low Definition FLV',
              '17': 'Very Low Definition 3GP',
              '18': 'Low Definition MP4',
              '22': 'High Definition MP4',
              '34': 'Low Definition FLV',
              '35': 'Standard Definition FLV',
              '36': 'Low Definition 3GP',
              '37': 'Full High Definition MP4',
              '38': 'Ultra High Definition MP4',
              '43': 'Low Definition WebM',
              '44': 'Standard Definition WebM',
              '45': 'High Definition WebM',
              '46': 'Full High Definition WebM',
              '82': 'Low Definition 3D MP4',
              '83': 'Standard Definition 3D MP4',
              '84': 'High Definition 3D MP4',
              '85': 'Full High Definition 3D MP4',
              '100': 'Low Definition 3D WebM',
              '101': 'Standard Definition 3D WebM',
              '102': 'High Definition 3D WebM',
              '135': 'Standard Definition Video MP4',
              '136': 'High Definition Video MP4',
              '137': 'Full High Definition Video MP4',
              '138': 'Ultra High Definition Video MP4',
              '139': 'Low Bitrate Audio MP4',
              '140': 'Medium Bitrate Audio MP4',
              '141': 'High Bitrate Audio MP4',
              '171': 'Medium Bitrate Audio WebM',
              '172': 'High Bitrate Audio WebM' 
            };
            var ytVideos = ytVideosContent.split(',');
            var ytVideoParse, ytVideoCodeParse, ytVideoCode, myVideoCode, ytVideo;
            for (var i = 0; i < ytVideos.length; i++) {
              if (!ytVideos[i].match(/^url/)) {
                ytVideoParse = ytVideos[i].match(/(.*)(url=.*$)/);
                if (ytVideoParse) ytVideos[i] = ytVideoParse[2] + '&' + ytVideoParse[1];
            }
            ytVideoCodeParse = ytVideos[i].match (/itag=(\d{1,3})/);
            ytVideoCode = (ytVideoCodeParse) ? ytVideoCodeParse[1] : null;
            if (ytVideoCode) {
              myVideoCode = ytVideoFormats[ytVideoCode];
              if (myVideoCode) {
                ytVideo = ytVideos[i].replace (/url=/, '').replace(/&$/, '').replace(/&itag=\d{1,3}/, '');
                if (ytVideo.match(/type=.*?&/)) ytVideo = ytVideo.replace(/type=.*?&/, '');
                else ytVideo = ytVideo.replace(/&type=.*$/, '');
                if (ytVideo.match(/&sig=/)) ytVideo = ytVideo.replace (/&sig=/, '&signature=');
                else if (ytVideo.match(/&s=/)) {
                  var ytSig = ytVideo.match(/&s=(.*?)(&|$)/);
                  if (ytSig) {
                    var s = decryptSignature(ytSig[1]);
                    ytVideo = ytVideo.replace(/&s=.*?(&|$)/, '&signature=' + s + '$1');
                  }
                  else ytVideo = '';
                }
                ytVideo = cleanMyContent (ytVideo, true);
                if (ytVideo && ytVideo.indexOf('http') == 0) {
                  if (!ytVideoFound) ytVideoFound = true;
                    ytVideoList[myVideoCode] = ytVideo;
                  }
                }
              }
            }
//            if (ytVideosDashmpd) ytVideoList['DASH MP4'] = ytVideosDashmpd;

            if (ytVideoFound) {
              createMyytPlayer(yturl);
            }
            else {
              if (ytVideosContent.indexOf('conn=rtmp') != -1) showMyMessage ('!support');
              else showMyMessage ('!videos');
            } /* End Create Player */
          }
        }
        else {
          var ytHLSVideos = getMyElement ('', 'body', '', '', -1, true).match('"hlsvp":\\s*"(.*?)"');
          if (ytHLSVideos) {
            ytHLSVideos = cleanMyContent(ytHLSVideos[1], false);
            ytHLS(ytHLSVideos);
          }
          else {
            if (ytVideoAvailable && ytVideoAvailable.className.indexOf('hid') == -1) removeMyElement(ytPlayerWindow, myPlayerWindow)
            else showMyMessage ('!content');
          }
        }
      }

      /* Get Script URL */
      if (!ytScriptURL) ytScriptURL = getMyContent (page.url, '"assets":\\s+\{.*"js":\\s+"(.*?)"', false);
      ytScriptURL = page.win.location.protocol + unescape(escape(ytScriptURL).replace(/%5C/g, ''));
      var DECODEARRDAT = 'decodeArrayData';
      decodeArray = getMyOption(DECODEARRDAT);
      if (decodeArray) decodeArray = decodeArray.split(',');

//        if (!ytVideosContent && getMyElement('', 'div', 'id', 'unavailable-message', -1, false).innerHTML.match(/GEMA/)) {
        if (!ytVideosContent) {
          // try getting the video from VEVO directly if content is blocked due to geolocation filtering
          var searchitem = ytVideoTitle.replace(/\ -\ .*/g,'/').replace(/\ |\./g,'-').replace(/--/g,'-').replace(/-$/,'').replace(/\'|\)|\(|\[|\]/g,'').toLowerCase();
          searchitem = searchitem.replace(/é|è|ê|ë/g,'e').replace(/á|à|â|ä|å|æ/g,'a').replace(/ó|ò|ô|ö|ø/g,'o').replace(/í|ì|î|ï/g,'i').replace(/ú|ù|û|ü/g,'u').replace(/ç/g,'c').replace(/ý|ÿ/g,'y');
          searchitem = searchitem + ytVideoTitle.replace(/.*?\ -\ /g,'').replace(/\ |\./g,'-').replace(/--/g,'').replace(/-$/,'').replace(/\'|,|:|\)|\(|\[|\]/g,'').toLowerCase();
          if (ytVideoTitle.indexOf('\ -\ ') !=-1) {
          var searchstring = ytVideoTitle.replace(/\ -\ .*/g,' ').replace(/\ official\ ((music)|(video)).*|(\ ft.*)|$/i,'') + ytVideoTitle.replace(/.*?\ -\ /g,'').replace(/\ official\ ((music)|(video)).*|(\ ft.*)|$/i,'');
            
          }
          else {
          var searchstring = '"' + ytVideoTitle.replace(/\ official\ ((music)|(video)).*|(\ ft.*)|$/i,'');
          }
          var yahoosearch = "http://search.yahoo.com/search?p=site:vevo.com+" + escape(searchstring.replace(/\'|\)|\(|\[|\]/g,'').replace(/\'|\)|\(|\[|\]/g,''));
          var googlesearch = "https://www.google.com/search?q=site:vevo.com+" + escape(searchstring.replace(/\'|\)|\(|\[|\]/g,'').replace(/\'|\)|\(|\[|\]/g,'').replace(/\ /g,'+'));
          getMyContentGM(yahoosearch,'TEXT',false,function(textYahoo) {
            getMyContentGM(googlesearch,'TEXT',false,function(textGoogle) {
              var docurl = page.url;
              var searchitem = '';
              var searchartist = '';
              var searchtitle = '';
              var vevomatch = false;
              if (ytVideoTitle.indexOf('\ -\ ') !=-1) {
                  searchartist = ytVideoTitle.replace(/\ -\ .*/g,'').replace(/\ /g,'-').replace(/--/g,'-').replace(/-$/,'').replace(/\.|\'|\)|\(|\[|\]/g,'').toLowerCase();
                  searchartist = searchartist.replace(/é|è|ê|ë/g,'e').replace(/á|à|â|ä|å|æ/g,'a').replace(/ó|ò|ô|ö|ø/g,'o').replace(/í|ì|î|ï/g,'i').replace(/ú|ù|û|ü/g,'u').replace(/ç/g,'c').replace(/ý|ÿ/g,'y');
                  searchitem = '/' + searchartist;
              }
              searchtitle = ytVideoTitle.replace(/.*?\ -\ /g,'').replace(/\ /g,'-').replace(/--/g,'').replace(/-$/,'').replace(/\.|\'|,|:|\)|\(|\[|\]/g,'').toLowerCase();
              searchitem = searchitem + '/' + searchtitle  + '/';
              var searchitem1 = searchitem.replace(/é|è|ê|ë/g,'e').replace(/á|à|â|ä|å|æ/g,'a').replace(/ó|ò|ô|ö|ø/g,'o').replace(/í|ì|î|ï/g,'i').replace(/ú|ù|û|ü/g,'u').replace(/ç/g,'c').replace(/ý|ÿ/g,'y');
              var YahooSearchResult = document.createElement( 'div' );
              YahooSearchResult.innerHTML = textYahoo;
              var GoogleSearchResult = document.createElement( 'div' );
              GoogleSearchResult.innerHTML = textGoogle;
              var veVideoURL, mySearchItem, mySearchElement;
              var mySearchRes1 = getMyElement (YahooSearchResult, 'ol', 'tag', '', 0, false);
              if (mySearchRes1 && !mySearchRes1.hasAttribute('data-bns')) mySearchRes1 = getMyElement (YahooSearchResult, 'ol', 'tag', '', 1, false);
              YahooSearchResult = mySearchRes1;
              for (var i = 0; i < 10; i++) {
                try {mySearchItem = YahooSearchResult.children[i]} catch (e) {break;};
                if (mySearchItem) mySearchElement = unescape(getMyElement (mySearchItem, 'a', 'tag', '', 0, false).href).match(/(https?:\/\/(\w{1,5}\.)?vevo\.com.*)/); else break;
                if (mySearchElement) mySearchElement = mySearchElement[1];
                if (mySearchElement) veVideoURL = mySearchElement.match(/(https?:\/\/(.*?\.)?vevo.com\/watch.*\/)(\w{12,12})(\?|\/|$|&|#)/)
                if (veVideoURL && (veVideoURL[1].match(searchitem) || veVideoURL[1].match(searchitem.replace(/-official-((music)|(video)).*/,'/').replace(/(-ft.*)|(-featuring.*)/,'/')) || veVideoURL[1].match(searchitem.replace(/-live/,'-(live)').replace(/-official-((music)|(video)).*/,'/').replace(/(-ft.*)|(-featuring.*)/,'/')) 
                                   || veVideoURL[1].match(searchitem1) || veVideoURL[1].match(searchitem1.replace(/-official-((music)|(video)).*/,'/').replace(/(-ft.*)|(-featuring.*)/,'/')) || veVideoURL[1].match(searchitem1.replace(/-live/,'-(live)').replace(/-official-((music)|(video)).*/,'/').replace(/(-ft.*)|(-featuring.*)/,'/')))) {
                  vevomatch = true;
                  break;
                }
                mySearchItem = getMyElement (GoogleSearchResult, 'div', 'class', 'g', i, false) 
                if (mySearchItem) mySearchElement =  getMyElement (mySearchItem, 'div', 'class', 'r', 0, false).children[0].href; else break;
                if (mySearchElement) veVideoURL = mySearchElement.match(/(https?:\/\/(.*?\.)?vevo.com\/watch.*\/)(\w{12,12})(\?|\/|$|&|#)/)
                if (veVideoURL && (veVideoURL[1].match(searchitem) || veVideoURL[1].match(searchitem.replace(/-official-((music)|(video)).*/,'/').replace(/(-ft.*)|(-featuring.*)/,'/')) || veVideoURL[1].match(searchitem.replace(/-live/,'-(live)').replace(/-official-((music)|(video)).*/,'/').replace(/(-ft.*)|(-featuring.*)/,'/')) 
                                   || veVideoURL[1].match(searchitem1) || veVideoURL[1].match(searchitem1.replace(/-official-((music)|(video)).*/,'/').replace(/(-ft.*)|(-featuring.*)/,'/')) || veVideoURL[1].match(searchitem1.replace(/-live/,'-(live)').replace(/-official-((music)|(video)).*/,'/').replace(/(-ft.*)|(-featuring.*)/,'/')))) {
                  vevomatch = true;
                  break;
                }
              }
              if (!vevomatch) {  //best fit from Yahoo
                var searchwords = ( (searchartist ? searchartist.replace(/(-ft.*)|(-featuring.*)/,'') + '-':"") + searchtitle.replace(/-official-((music)|(video)).*/,'').replace(/(-ft.*)|(-featuring.*)/,'')).split('-');
                for (var i = 0; i < 5; i++) {
                  try {mySearchItem = YahooSearchResult.children[i]} catch (e) {break;};
                  if (mySearchItem) mySearchElement = unescape(getMyElement (mySearchItem, 'a', 'tag', '', 0, false).href).match(/(https?:\/\/(\w{1,5}\.)?vevo\.com.*)/); else break;
                  if (mySearchElement) mySearchElement = mySearchElement[1];
                  if (mySearchElement) veVideoURL = mySearchElement.match(/(https?:\/\/(.*?\.)?vevo.com\/watch.*\/)(\w{12,12})(\?|\/|$|&|#)/)
                  if (veVideoURL) {
                    var searchcount = 0;
                    for (var j = 0; j < searchwords.length; j++) {
                      if (veVideoURL[1].indexOf(searchwords[j]) != -1) searchcount++;
                    }
                    if (searchcount >= (Math.max(1,parseInt(2 * searchwords.length / 3)))) {
                      vevomatch = true;
                      break;
                    }
                  }
                }
              }
              if (!vevomatch) {  //best fit from Google
                for (var i = 0; i < 5; i++) {
                  mySearchItem = getMyElement (GoogleSearchResult, 'div', 'class', 'g', i, false) 
                  if (mySearchItem) mySearchElement =  getMyElement (mySearchItem, 'div', 'class', 'r', 0, false).children[0].href; else break;
                  if (mySearchElement) veVideoURL = mySearchElement.match(/(https?:\/\/(.*?\.)?vevo.com\/watch.*\/)(\w{12,12})(\?|\/|$|&|#)/)
                  if (veVideoURL) {
                    var searchcount = 0;
                    for (var j = 0; j < searchwords.length; j++) {
                      if (veVideoURL[1].indexOf(searchwords[j]) != -1) searchcount++;
                    }
                    if (searchcount >= (Math.max(1,parseInt(2 * searchwords.length / 3)))) {
                      vevomatch = true;
                      break;
                    }
                  }
                }
              }
              if (vevomatch && veVideoURL) {
                var veVideoID = veVideoURL[3];
                veVideoURL = 'http://videoplayer.vevo.com/VideoService/AuthenticateVideo?isrc=' + veVideoID;
                getMyContentGM(veVideoURL,'TEXT',false,function (text){
                   ytVideosContent = text;
                   getYoutubeVideos(ytVideosContent, docurl);
                });
              } else {
                ytVideosContent = null;
              }  
             });
           });
        } else if (ytScriptURL && ytVideosContent && ytVideosContent.match(/&s=/) && (!decodeArray || decodeArray.length==0)) {
        try {
          crossXmlHttpRequest({
            method:'GET',
            url:ytScriptURL,
            onload:function(response) {
              if (response.readyState === 4 && response.status === 200) {
                decodeArray = findSignatureCode(response.responseText);
                setMyOptions(DECODEARRDAT, decodeArray.toString());
                getYoutubeVideos(ytVideosContent, page.url);
              } 
            }
          });
        } catch(e) { }
      } else {
        getYoutubeVideos(ytVideosContent, page.url);
        try {
          crossXmlHttpRequest({
            method:'GET',
            url:ytScriptURL,
            onload:function(response) {
                   if (response.readyState === 4 && response.status === 200) {
                     var retArray = findSignatureCode(response.responseText);
                     if (retArray && (retArray.toString() != decodeArray.toString()) && ytVideosContent.match(/&s=/)) {
                       decodeArray = retArray;
                       setMyOptions(DECODEARRDAT, decodeArray.toString());
                       myPlayerWindow = getMyElement ('', 'div', 'id', 'MyytWindow', -1, false);
                       if (myPlayerWindow) removeMyElement(myPlayerWindow.parentNode,myPlayerWindow);
                       getYoutubeVideos(ytVideosContent, page.url);
                     }
                   }
            }
          });
        } catch(e) { }
      }
    }
  }

  function onNodeInserted(e) { 
    if (page.url != window.location.href) {
      myPlayerWindow = getMyElement ('', 'div', 'id', 'MyytWindow', -1, false);
      if (myPlayerWindow) removeMyElement(myPlayerWindow.parentNode,myPlayerWindow);
    }
    if (e && e.target && e.target.id=='watch7-container') {
      setTimeout(function() { yt_run("NodeInserted"); }, 0);
    }
  }
  yt_run();
  var pagecontainer=document.getElementById('page-container');
  var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
  var content=document.getElementById('content');
  if (isAjax && content) { // Ajax UI    
      var mo=window.MutationObserver||window.MozMutationObserver||window.WebKitMutationObserver;
      if(typeof mo!=='undefined') {
        var observer=new mo(function(mutations) {
          mutations.forEach(function(mutation) {
              if(mutation.addedNodes!==null) {
                for (var i=0; i<mutation.addedNodes.length; i++) {
                    if (mutation.addedNodes[i].id=='watch7-container') { 
                      yt_run("Mutation"); 
                      break;
                    }
                }
              }
          });
          if (page.url != window.location.href) {
            myPlayerWindow = getMyElement ('', 'div', 'id', 'MyytWindow', -1, false);
            if (myPlayerWindow) removeMyElement(myPlayerWindow.parentNode,myPlayerWindow);
          }
        });
        observer.observe(content, {childList: true, subtree: true}); 
      } else  { // MutationObserver fallback for old browsers
        if (document.implementation.hasFeature('MutationEvents','2.0')) {
          pagecontainer.addEventListener('DOMNodeInserted', onNodeInserted, false);
        } else {
          page.win.setInterval(function() {
            nurl = window.location.href;
            if (page.url != nurl) window.location.href = nurl;
          }, 500) 
        } 
     }
  } 
}

// =====DailyMotion===== //

else if (page.url.indexOf('dailymotion.com/video') != -1) {

  /* Get Player Window */
  var dmPlayerWindow = getMyElement ('', 'div', 'id', 'player_main', -1, false);
  if (!dmPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Video Thumbnail */
    var dmVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

    /* Get Videos Content */
    var dmEmbed = page.url.replace(/\/video\//, "/embed/video/");
    dmVideosContent =  getMyContent (dmEmbed, 'info\\s+=\\s+\\{(.*?)\\}', false);

    /* My Player Window */
    myPlayerWindow = createMyElement ('div', '', '', '', '');
    var PlayerHeight = dmPlayerWindow.clientHeight + 22;
    var PlayerWidth = dmPlayerWindow.clientWidth;
    styleMyElement (myPlayerWindow, {position: 'relative',width: PlayerWidth + 'px', height: PlayerHeight + 'px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (dmPlayerWindow, 'div', '', true);
    styleMyElement (dmPlayerWindow, {height: '100%'});
    appendMyElement (dmPlayerWindow, myPlayerWindow);
    document.getElementById('topwrapper').addEventListener('click', function(e) {if (e.target.id == 'vtVideo' || (e.target.tagName == 'DIV' && !e.target.innerHTML.match(/^\s*more\s*$/))) { e.stopPropagation();}});

    /* Get Videos */
    if (dmVideosContent) {
      var dmVideoFormats = {'stream_h264_hd1080_url': 'Full High Definition MP4', 'stream_h264_hd_url': 'High Definition MP4',
	  'stream_h264_hq_url': 'Standard Definition MP4', 'stream_h264_url': 'Low Definition MP4',
	  'stream_h264_ld_url': 'Very Low Definition MP4', 'stream_live_hls_url': "Standard Definition Live M3U8"}; 
      var dmVideoList = {};
      var dmVideoFound = false;
      var dmVideoParser, dmVideoParse, myVideoCode, dmVideo;
      for (var dmVideoCode in dmVideoFormats) {
	dmVideoParser = '"' + dmVideoCode + '":"(.*?)"';
	dmVideoParse = dmVideosContent.match (dmVideoParser);
	dmVideo = (dmVideoParse) ? dmVideoParse[1] : null;
	if (dmVideo) {
	  if (!dmVideoFound) dmVideoFound = true;
	  dmVideo = cleanMyContent(dmVideo, true);
	  myVideoCode = dmVideoFormats[dmVideoCode];
	  if (!dmVideoList[myVideoCode]) dmVideoList[myVideoCode] = dmVideo;
	}
      }

      if (dmVideoFound) {
	/* Get Watch Sidebar */
	var dmSidebarWindow = getMyElement ('', 'div', 'id', 'right_content_box', -1, false);
	
	/* Create Player */
	var dmDefaultVideo = 'Low Definition MP4';
	player = {
	  'playerSocket': dmPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': dmVideoList,
	  'videoPlay': dmDefaultVideo,
	  'videoThumb': dmVideoThumb,
	  'playerWidth': PlayerWidth,
	  'playerHeight': PlayerHeight,
	  'playerWideWidth': 940,
	  'playerWideHeight': 552,
	  'sidebarWindow': dmSidebarWindow,
	  'sidebarMarginNormal': (dmSidebarWindow && dmSidebarWindow.style.marginTop) ? -416 : 0,
	  'sidebarMarginWide': (dmSidebarWindow && dmSidebarWindow.style.marginTop) ? 10 : 570
	};
	feature['container'] = false;
	option['definitions'] = ['Full High Definition', 'High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
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

// =====Vimeo===== //

else if (page.url.match(/https?:\/\/(www\.)?vimeo.com\//)) {

  function vimeo_run(viPlayerId) {
    var PlayerHeight, PlayerWidth, viVideo, myVideoCode;
    var viVideoID = null;
    var viVideoSignature = null;
    var viVideoTimestamp = null;
    var viVideoQualities = null;
    var viVideoThumb = null;
    var viVideoFormats = {'hd': 'High Definition MP4', 'sd': 'Low Definition MP4', 'mobile': 'Very Low Definition MP4'};
    var viVideoList = {};
    var viVideoFound = false;

    /* Get Player Window */
    var viPlayerWindow = getMyElement ('', 'div', 'class', 'player_container', 0, false);
    PlayerHeight = viPlayerWindow.clientHeight + 22;
    PlayerWidth = viPlayerWindow.clientWidth;
    if (!viPlayerWindow) {
      showMyMessage ('!player');
    }
    else {
      {
        /* Get Videos Content */
          viVideoID = viPlayerWindow.children[0].getAttribute('data-fallback-url').match(/video\/(\d{1,8})/)[1]
          viVideoURL = page.win.location.protocol + "//vimeo.com/" + viVideoID;
          crossXmlHttpRequest({
            method:'GET',
            url: viVideoURL,
            onload:function(response) {
              var viVideoSource = response.responseText.match('data-config-url="(.*?)"')[1].replace(/&amp;/g, '&');
              crossXmlHttpRequest({
                method:'GET',
                url: viVideoSource,
                onload:function(response) { //asynchronous
                    if (response.readyState === 4 && response.status === 200) {
                      /* Get Videos */
                      var viVideosContent = JSON.parse(response.responseText);
                      if (viVideosContent) {
                        viVideoQualities = viVideosContent.request.files.h264;
                        if (!viVideosContent) viVideosContent = getMyContent(viVideoSource, '"vp6":\\{(.*?)\\}\\}', false);
                        viVideoThumb = viVideosContent.video.thumbs['960'];
                        if (!viVideoThumb) viVideoThumb = viVideosContent.video.thumbs['1280'];
                        if (!viVideoThumb) viVideoThumb = viVideosContent.video.thumbs['640'];
                      }
                      else {
                        showMyMessage ('!content');
                      } 
                    }
                    /* My Player Window */
                    myPlayerWindow = createMyElement ('div', '', '', '', '');
                    styleMyElement (myPlayerWindow, {position: 'relative', width: PlayerWidth + 'px', height: PlayerHeight + 'px', backgroundColor: '#F4F4F4', zIndex: '99999'});
                    modifyMyElement (viPlayerWindow, 'div', '', true);
                    styleMyElement (viPlayerWindow, {height: '100%'});
                    appendMyElement (viPlayerWindow, myPlayerWindow);

                    if (viVideosContent && viVideoQualities) {
                      for (var viVideoCode in viVideoFormats) {
                        viPattern = '"h264":\\{.*"' + viVideoCode + '":\\{.*?"url":"(.*?)"';
                        viMatcher = response.responseText.match(viPattern);
                        viVideo = (viMatcher) ? viMatcher[1] : null;
                        if (viVideo) {
                          if (!viVideoFound) viVideoFound = true;
                          myVideoCode = viVideoFormats[viVideoCode];
                          viVideoList[myVideoCode] = viVideo;
                        }
                      }
                    }

                    if (viVideoFound) {
                      /* Create Player */
                      var viDefaultVideo = 'Low Definition MP4';
                      player = {
                        'playerSocket': viPlayerWindow,
                        'playerWindow': myPlayerWindow,
                        'videoList': viVideoList,
                        'videoPlay': viDefaultVideo,
                        'videoThumb': viVideoThumb,
                        'playerWidth': PlayerWidth,
                        'playerHeight': PlayerHeight
                      };
                      feature['container'] = false;
                      feature['widesize'] = false;
                      option['definitions'] = ['High Definition', 'Low Definition', 'Very Low Definition'];
                      option['containers'] = ['MP4'];
                      createMyPlayer ();
                    }
                    else {
                      showMyMessage ('!videos');
                    }
                 
              }
            });
          }
        });
      }
    }
  }

  function onNodeInserted(e) { 
    if (e && e.target && (typeof e.target.className !== 'undefined') && e.target.className.substring(0,6)=='player') {
      setTimeout(function() { vimeo_run(); }, 0);
    }
  }

  var pagecontainer = getMyElement ('', 'div', 'class', 'player_container', 0, false);
  vimeo_run();
  var content=document.getElementById('content');
  if (content) {
      var mo=window.MutationObserver||window.MozMutationObserver||window.WebKitMutationObserver;
      if(typeof mo!=='undefined') {
        var observer=new mo(function(mutations) {
          mutations.forEach(function(mutation) {
              if(mutation.addedNodes!==null && mutation.addedNodes.length > 0) {
                for (var i=0; i<mutation.addedNodes.length; i++) {
                    if (typeof mutation.addedNodes[i].className !== 'undefined') if (mutation.addedNodes[i].className.substring(0,6) == 'player') {
                      vimeo_run(mutation.addedNodes); 
                      break;
                    }
                }
              }
          });
        });
        observer.observe(content, {childList: true, subtree: true}); 
      } else { // MutationObserver fallback for old browsers
        pagecontainer.parentNode.addEventListener('DOMNodeInserted', onNodeInserted, false);
      } 
  } 
  
}

// VEVO
else if (page.url.match(/https?:\/\/(www\.)?vevo.com\//)) {
  var oldurl;
  var vePlayerWindow
    
  function vevo_run(vePlayerId) {
    if (oldurl == page.url) return;
    oldurl = page.url;

    function createMyvePlayer() {
       var veDefaultVideo = 'Standard Definition MP4';
       player = {
         'playerSocket': vePlayerWindow,
         'playerWindow': myPlayerWindow,
         'videoList': veVideoList,
         'videoPlay': veDefaultVideo,
         'videoThumb': veVideoThumb,
         'playerWidth': PlayerWidth,
         'playerHeight': PlayerHeight
       };
       feature['container'] = false;
       feature['widesize'] = false;
       feature['fullsize'] = false;
       option['definitions'] = ['Ultra High Definition', 'Full High Definition', 'High Definition', 'Standard Definition', 'Low Definition', 'Very Low Definition'];
       option['containers'] = ['MP4'];
       createMyPlayer ();
       styleMyElement (myPlayerWindow.children[0], {height: '22px', 'textAlign': 'left', 'marginLeft': '10px'});
       styleMyElement (myPlayerWindow.children[1], {backgroundColor:'#000000'});
    }

    var PlayerHeight, PlayerWidth, veVideo, myVideoCode;
    var veVideoFormats = {
        'High': 'High Definition MP4'
        ,'Med': 'Standard Definition MP4'
        ,'Low': 'Ultra Low Definition MP4'
        ,'564000': 'Very Low Definition MP4'
        ,'864000': 'Low Definition MP4'
        ,'1328000':'Standard Definition MP4'
        ,'1728000':'Standard Definition HBR MP4'
        ,'2528000':'High Definition MP4'
        ,'3328000':'High Definition HBR MP4'
        ,'4392000':'Full High Definition MP4'
        ,'5392000':'Full High Definition HBR MP4'
    };
    var veVideoList = {};
    var veVideoFound1 = false;
    var veVideoFound2 = false;
    /* Get Player Window */
    vePlayerWindow = getMyElement ('', 'vm-player', 'tag', '', 0, false);
    PlayerHeight = 529;
    PlayerWidth = 940;
    var PlayerLeft = (vePlayerWindow.parentNode.clientWidth - PlayerWidth) / 2.0;
    var PlayerTop = 50;
    if (!vePlayerWindow) {
      showMyMessage ('!player');
    }
    else {
      {
        /* Get Videos Content */
          var veVideoID = getMyContent(page.url,'content="http.*videoId=(.*?)\&amp;',false);
          if (!veVideoID) veVideoID = page.url.match(/((https?:\/\/(www\.)?vevo.com\/watch.*\/)|(vevo:))(.*?)(\?|$)/)[5];
          var veVideoURL = 'http://videoplayer.vevo.com/VideoService/AuthenticateVideo?isrc=' + veVideoID;
          var veVideosContent = getMyContent(veVideoURL, 'TEXT', false);
          if (veVideosContent) {
             var veVideosJSON = JSON.parse(veVideosContent);
//             var veVideoThumb = veVideosJSON.video.imageUrl;
             var veVideoThumb = veVideosContent.match('"imageUrl":"(.*?)"');
             if (veVideoThumb) veVideoThumb = veVideoThumb[1];
          }
          else {
            showMyMessage ('!content');
          }
          styleMyElement (vePlayerWindow, {top: PlayerTop + 'px', left: PlayerLeft + 'px', width: PlayerWidth + 'px', height: PlayerHeight + 'px'});
          var vePlayer = vePlayerWindow.children[0];
          var vePlaylistOverlay = vePlayerWindow.children[1];
          styleMyElement (vePlaylistOverlay, { backgroundColor: '#111111'});
          var heroplayer = getMyElement ('', 'div', 'class', 'hero-player', 0, false);
          styleMyElement (heroplayer.children[1],{display: 'block', height: PlayerHeight + 'px'});
          styleMyElement (heroplayer.children[2],{display: 'none', height: '0px'});
          /* My Player Window */
          myPlayerWindow = createMyElement ('div', '', '', '', '');
          styleMyElement (myPlayerWindow, {position: 'relative', width: PlayerWidth + 'px', height: PlayerHeight + 'px', backgroundColor: '#F4F4F4', zIndex: '18',fontFamily: '"Arial","Helvetica","sans-serif"'});
          vePlayer.parentNode.replaceChild(myPlayerWindow, vePlayer);
          var vePlayerControls = getMyElement ('', 'div', 'class', 'video-controls-directive',0,false);
          removeMyElement(vePlayerControls.parentNode, vePlayerControls);
          if (veVideosJSON) {
            var veVideo, veVideoVersion;
            for (var i = 0; i < veVideosJSON.video.videoVersions.length - 1; i++) {
              if (veVideosJSON.video.videoVersions[i].sourceType == 2) {
                if (veVideosJSON.video.videoVersions[i].version in {3:1,4:1}) {
                  for (var veVideoFormat in veVideoFormats) {
                    veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="' + veVideoFormat + '" url="(.*?)"');
                    if (veVideo) {
                      if (!veVideoFound1) veVideoFound1 = true;
                      if (!veVideoFound2) veVideoFound2 = true;
                      veVideoList[veVideoFormats[veVideoFormat]] = veVideo[1];
                    }
                  }
                }
              }
              if (veVideoFound) break;
            }
            veVideoFound = false;
            for (var i = 0; i < veVideosJSON.video.videoVersions.length - 1; i++) {
              if (veVideosJSON.video.videoVersions[i].sourceType == 3) {
                for (var veVideoFormat in veVideoFormats) {
                  veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="' + veVideoFormat + '" url="(.*?)"');
                  if (veVideo) {
                    if (!veVideoFound1) veVideoFound1 = true;
                    if (!veVideoFound2) veVideoFound2 = true;
                    veVideoList[veVideoFormats[veVideoFormat] + ' MP4'] = veVideo[1];
                  }
                }
              }
              if (veVideoFound) break;
            }
            veVideoFound = false;
            for (var i = 0; i < veVideosJSON.video.videoVersions.length - 1; i++) {
              if (veVideosJSON.video.videoVersions[i].sourceType == 4) {
                for (var veVideoFormat in veVideoFormats) {
                  veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="' + veVideoFormat + '" url="(.*?)"');
                  if (veVideo) {
                    if (!veVideoFound1) veVideoFound1 = true;
                    if (!veVideoFound2) veVideoFound2 = true;
                    veVideoList[veVideoFormats[veVideoFormat] + ' HD MP4'] = veVideo[1];
                  }
                }
              }
              if (veVideoFound2) break;
            }
            veVideoFound2 = false;
            for (var i = 0; i < veVideosJSON.video.videoVersions.length - 1; i++) {
              if (veVideosJSON.video.videoVersions[i].sourceType == 5 && veVideosJSON.video.videoVersions[i].version == 1) {
                veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="HTTP Level3" url="(.*?)"');
                if (!veVideo) veVideo = veVideosJSON.video.videoVersions[i].data.match('rendition name="HTTP Level3" url="(.*?)"');
                if (veVideo) veVideoFound2 = true;
                if (veVideo) getMyContentGM(veVideo[1],'TEXT',false, function (vesmilfile) {
                    for (veVideoFormat in veVideoFormats) {
                    if (vesmilfile.match(veVideoFormat)) {
                      veVideoList[veVideoFormats[veVideoFormat]] = "http://smil.lvl3.vevo.com" + vesmilfile.match('video src="mp4:(.*?)" system-bitrate="' + veVideoFormat + '"')[1];
                    }
                  }
                  createMyvePlayer();
                });
              }
            }
            if (!veVideoFound2) if (veVideoFound1) createMyvePlayer(); else showMyMessage ('!videos');
          }
       }
    }
  }

  function start_vevo() {
    var elWait = 50;
    page = {win: window, doc: document, body: document.body, url: window.location.href}
    var refreshIntervalId = page.win.setInterval(function() {
      if (getMyElement('', 'vm-player', 'tag', '', 0, false) && getMyElement('', 'vm-player', 'tag', '', 0, false).children[0] 
          && (getMyContent(page.url,'content="http.*videoId=(.*?)\&amp;',false) || window.location.href.match(/((https?:\/\/(www\.)?vevo.com\/watch.*\/)|(vevo:))(\w{10,12})(\?|$)/))) {
        page.win.clearInterval(refreshIntervalId);
        vevo_run();
      } else if (elWait > 0) {
	    elWait--; 
      } else page.win.clearInterval(refreshIntervalId);
    }, 500);
  }
  
  start_vevo();

  function onNodeInserted(e) { 
    if (e && e.target && (typeof e.target.className !== 'undefined')) {
      if (e.target.className == 'watch-page ng-scope') {
        if (window.location.href.match(/((https?:\/\/(www\.)?vevo.com\/watch.*\/)|(vevo:))(.*?)(\?|$)/)) {
          setTimeout(function() { start_vevo(); }, 0);
        }
      } else if (e.target.className == 'page-loading') {
        vePlayerWindow = getMyElement ('', 'vm-player', 'tag', '', 0, false);
        if (vePlayerWindow) styleMyElement (vePlayerWindow, {width: '0px', height: '0px'});
      }
    }
  }

  var content = getMyElement('','div','id','main-view',-1,false);
  if (content) {
      var mo=window.MutationObserver||window.MozMutationObserver||window.WebKitMutationObserver;
      if(typeof mo!=='undefined') {
        var observer=new mo(function(mutations) {
          mutations.forEach(function(mutation) {
              if(mutation.addedNodes!==null && mutation.addedNodes.length > 0) {
                for (var i=0; i<mutation.addedNodes.length; i++) {
                    if (typeof mutation.addedNodes[i].className !== 'undefined') {
                      if (mutation.addedNodes[i].className == 'watch-page ng-scope') {
                        if (window.location.href.match(/((https?:\/\/(www\.)?vevo.com\/watch.*\/)|(vevo:))(.*?)(\?|$)/)) {
                          start_vevo();
                          break;
                        } else {
                          vePlayerWindow = getMyElement ('', 'vm-player', 'tag', '', 0, false);
                          if (vePlayerWindow) styleMyElement (vePlayerWindow, {width: '0px', height: '0px'});
                      }
                    } else if (mutation.addedNodes[i].className == 'page-loading'){
                      vePlayerWindow = getMyElement ('', 'vm-player', 'tag', '', 0, false);
                      if (vePlayerWindow) styleMyElement (vePlayerWindow, {width: '0px', height: '0px'});
                    }
		  }
                }
              }
          });
        });
        observer.observe(content, {childList: true, subtree: true}); 
      } else { // MutationObserver fallback for old browsers
        if (document.implementation.hasFeature('MutationEvents','2.0')) {
          content.addEventListener('DOMSubtreeModified', onNodeInserted, false);
        } else {
          page.win.setInterval(function() {
            nurl = window.location.href;
            if (page.url != nurl) window.location.href = nurl;
          }, 500) 
        } 
      }
  }  
  
}
    
// =====MetaCafe===== //

else if (page.url.indexOf('metacafe.com/watch') != -1) {

  /* Get Player Window */
  var mcPlayerWindow = getMyElement ('', 'div', 'id', 'FlashWrap', -1, false);
  if (!mcPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Check Video Availability */
    var mcVideoAvailable = getMyElement ('', 'div', 'id', 'FlashWrap', -1, true);
    if (mcVideoAvailable.indexOf('This Video cannot be played on this device.') != -1) return;
    
    /* Get Video Thumbnail */
    var mcVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

    /* Get Videos Content */
    var mcVideosContent, mcVideoH5;
    var mcFlashVideo = getMyElement (mcPlayerWindow, 'embed', 'tag', '', 0, false) || getMyElement (mcPlayerWindow, 'object', 'tag', '', 0, false);
    if (mcFlashVideo) mcVideosContent = getMyContent (page.url, '"mediaData":"(.*?)"', false);
    else mcVideoH5 = getMyContent (page.url, 'video\\s+src="(.*?)"', false);


    /* My Player Window */
    myPlayerWindow = createMyElement ('div', '', '', '', '');
    var PlayerHeight = mcPlayerWindow.clientHeight + 22;
    var PlayerWidth = mcPlayerWindow.clientWidth;
    styleMyElement (myPlayerWindow, {position: 'relative', width: PlayerWidth + 'px', height: PlayerHeight + 'px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (mcPlayerWindow, 'div', '', true);
    styleMyElement (mcPlayerWindow, {height: '100%'});
    appendMyElement (mcPlayerWindow, myPlayerWindow);
    var mcHeader = getMyElement ('', 'div', 'id', 'HeaderContainer', -1, false);
    styleMyElement (mcHeader , {zIndex: '0'});

    /* Get Videos */
    if (mcVideosContent || mcVideoH5) {
      var mcVideoList = {};
      var mcVideoFound = false;
      if (mcVideosContent) {
	mcVideosContent = cleanMyContent(mcVideosContent, true);
	var mcVideoFormats = {'highDefinitionMP4': 'High Definition MP4', 'MP4': 'Low Definition MP4', 'flv': 'Low Definition FLV'};
	var mcVideoParser, mcVideoParse, myVideoCode, mcVideoPath, mcVideoKey, mcVideo;
	for (var mcVideoCode in mcVideoFormats) {
	  mcVideoParser = '"' + mcVideoCode + '":\\{.*?"mediaURL":"(.*?)","access":\\[\\{"key":"(.*?)","value":"(.*?)"\\}\\]\\}';
	  mcVideoParse = mcVideosContent.match (mcVideoParser);
	  mcVideoPath = (mcVideoParse) ? mcVideoParse[1] : null;
	  mcVideoKeyName = (mcVideoParse) ? mcVideoParse[2] : null;
	  mcVideoKeyValue = (mcVideoParse) ? mcVideoParse[3] : null;
	  if (mcVideoPath && mcVideoKeyName && mcVideoKeyValue) {
	    if (!mcVideoFound) mcVideoFound = true;
	    myVideoCode = mcVideoFormats[mcVideoCode];
	    mcVideo = mcVideoPath + '?' + mcVideoKeyName + '=' + mcVideoKeyValue;
	    mcVideoList[myVideoCode] = mcVideo;
	  }
	}
      }
      else {
	mcVideoList['Low Definition MP4'] = mcVideoH5;
	mcVideoFound = true;
	feature['definition'] = false;
	feature['container'] = false;
      }
      
      if (mcVideoFound) {
	/* Get Watch Sidebar */
	var mcSidebarWindow = getMyElement ('', 'div', 'id', 'Sidebar', -1, false);
	
	/* Create Player */
	var mcDefaultVideo = (mcVideoList['Low Definition MP4']) ? 'Low Definition MP4' : 'Low Definition FLV';
	player = {
	  'playerSocket': mcPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': mcVideoList,
	  'videoPlay': mcDefaultVideo,
	  'videoThumb': mcVideoThumb,
	  'playerWidth': PlayerWidth,
	  'playerHeight': PlayerHeight,
	  'playerWideWidth': 960,
	  'playerWideHeight': 564,
	  'sidebarWindow': mcSidebarWindow,
	  'sidebarMarginNormal': 0,
	  'sidebarMarginWide': 576
	};
	option['definitions'] = ['High Definition', 'Low Definition'];
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
  }
  
}

// =====Break===== //

else if (page.url.indexOf('break.com/video') != -1) {

  /* Get Player Window */
  var brPlayerWindow = getMyElement ('', 'div', 'id', 'video-player', -1, false);
  if (!brPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Video ID */
    var brVideoID = page.url.match(/(\d+)$/);
    brVideoID = (brVideoID) ? brVideoID[1] : null;

    /* Get Videos Content */
    var brSource = page.win.location.protocol + '//' + page.win.location.hostname + '/embed/' + brVideoID;
    var brVideosContent = getMyContent (brSource, 'TEXT', false);

    /* My Player Window */
    myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '592px', height: '356px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (brPlayerWindow, 'div', '', true);
    styleMyElement (brPlayerWindow, {height: '100%', overflow: 'visible'});
    appendMyElement (brPlayerWindow, myPlayerWindow);

    /* Get Videos */
    if (brVideosContent) {
      var brVideoList = {};
      var brVideoFormats = {};
      var brVideoFound = false;
      var brVideoPath, brVideoToken, brVideoThumb, brVideo, brCodeCheck, myVideoCode;
      brVideoPath = brVideosContent.match (/"videoUri":\s"(.*?)"/);
      brVideoPath = (brVideoPath) ? brVideoPath[1] : null;
      if (brVideoPath) {
	if (brVideoPath.match(/.wmv$/)) {
	  brVideoFormats = {'.flv': 'Low Definition FLV', '.mp4': 'Low Definition MP4'};
	  brVideoPath = brVideoPath.replace(/.wmv$/, '');
	}
	else if (brVideoPath.match(/.flv$/)) {
	  brVideoFormats = {'6.mp4': 'Very Low Definition MP4', '1.flv': 'Low Definition FLV', '1.mp4': 'Low Definition MP4', '2.mp4': 'Standard Definition MP4', '3.mp4': 'High Definition MP4'};
	  brVideoPath = brVideoPath.replace(/1.flv$/, '');
	}
	else if (brVideoPath.match(/.mp4$/)) {
	  brVideoFormats = {'240.mp4': 'Very Low Definition MP4', '360.mp4': 'Low Definition MP4', '480.mp4': 'Standard Definition MP4', '720.mp4': 'High Definition MP4',};
	  brVideoPath = brVideoPath.replace(/360.mp4$/, '');
	}
	else brVideoPath = null;
      }
      brVideoToken = brVideosContent.match (/"AuthToken":\s"(.*?)"/);
      brVideoToken = (brVideoToken) ? brVideoToken[1] : null;
      brVideoThumb = brVideosContent.match (/"thumbUri":\s"(.*?)"/);
      brVideoThumb = (brVideoThumb) ? brVideoThumb[1] : null;
      if (brVideoPath && brVideoToken) {
	for (var brVideoCode in brVideoFormats) {
	  brCodeCheck = brVideoCode.replace(/\.(flv|mp4)$/, '');
	  if (brVideosContent.match(brVideoPath + brCodeCheck)) {
	    if (!brVideoFound) brVideoFound = true;
	    myVideoCode = brVideoFormats[brVideoCode];
	    brVideo = brVideoPath + brVideoCode + '?' + brVideoToken;
	    brVideoList[myVideoCode] = brVideo;
	  }
	}
      }
      
      if (brVideoFound) {
	/* Get Watch Sidebar */
	var brSidebarWindow = getMyElement ('', 'aside', 'class', 'sidebar', 0, false);

	/* Create Player */
	var brDefaultVideo = 'Low Definition MP4';
	var brWindowWidth = page.win.innerWidth || page.doc.documentElement.clientWidth;
	var brPlayerWidth, brPlayerHeight;
	if (brWindowWidth > 1400) {
	  brPlayerWidth = 832;
	  brPlayerHeight = 490;
	}
	else {
	  brPlayerWidth = 592;
	  brPlayerHeight = 356;
	}
	player = {
	  'playerSocket': brPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': brVideoList,
	  'videoPlay': brDefaultVideo,
	  'videoThumb': brVideoThumb,
	  'playerWidth': brPlayerWidth,
	  'playerHeight': brPlayerHeight,
	  'playerWideWidth': 910,
	  'playerWideHeight': 534,
	  'sidebarWindow': brSidebarWindow,
	  'sidebarMarginNormal': 10,
	  'sidebarMarginWide': 634
	};
	if (brWindowWidth > 1400) feature['widesize'] = false;
	option['definitions'] = ['Very Low Definition', 'Low Definition', 'Standard Definition', 'High Definition'];
	option['containers'] = ['MP4', 'FLV', 'Any'];
	createMyPlayer ();
      }
      else {
	var ytVideoId =  brVideosContent.match (/"youtubeId":\s"(.*?)"/);
	if (ytVideoId && ytVideoId[1]) {
	  var ytVideoLink = 'http://youtube.com/watch?v=' + ytVideoId[1];
	  showMyMessage ('embed', ytVideoLink);
	}
	else {
	showMyMessage ('!videos');
	}
      }
    }
    else {
      showMyMessage ('!content');
    }
  }
  
}

// =====FunnyOrDie===== //

else if (page.url.match(/https?:\/\/(www\.)?funnyordie.com\/videos\/[0-9a-z]{3,10}\//)) {
  
  function fod_run(viPlayerId) {
    /* Get Player Window */
    var fodPlayerWindow = getMyElement ('', 'div', 'id', 'player-container', -1, false);
    if (!fodPlayerWindow) {
      showMyMessage ('!player');
    }
    else {
      /* Get Video Thumbnail */
      var fodVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);
      if (fodVideoThumb) fodVideoThumb = fodVideoThumb.replace (/large/, 'fullsize');

      /* Get Videos Content */
      var fodVideosContent = getMyContent (page.url, '<video([\\s\\S]*?)video>', false);

      /* Clean Player Window */
      var fodPlayerContainer = getMyElement ('', 'div', 'id', 'videoContainer', -1, false);
      var PlayerHeight = fodPlayerContainer.clientHeight + 22;
      var PlayerWidth = fodPlayerContainer.clientWidth;
      modifyMyElement (fodPlayerContainer, 'div', '', true);
      if (fodPlayerContainer) cleanMyElement (fodPlayerContainer, true);

      /* My Player Window */
      myPlayerWindow = createMyElement ('div', '', '', '', '');
      styleMyElement (myPlayerWindow, {position: 'relative', width: PlayerWidth + 'px', height: PlayerHeight + 'px', backgroundColor: '#F4F4F4', margin: '0px auto'});
      styleMyElement (fodPlayerWindow, {height: '100%', overflow: 'visible'});
      fodPlayerContainer.parentNode.insertBefore (myPlayerWindow, fodPlayerContainer);
    
      /* Get Videos */
      if (fodVideosContent) {
        var fodVideoFormats = {'v2500.mp4': 'High Definition MP4', 'v1800.mp4': 'Standard Definition MP4', 'v600.mp4': 'Low Definition MP4', 'v600.webm': 'Low Definition WebM', 'v110.mp4': 'Very Low Definition MP4'};
        var fodVideoList = {};
        var fodVideoFound = false;
        var fodVideoPath, fodVideoCodes, fodVideo, myVideoCode;
        fodVideoPath = fodVideosContent.match(/src="(.*?)v\d+.mp4"/);
        fodVideoPath = (fodVideoPath) ? fodVideoPath[1] : null;
        fodVideoCodes = fodVideosContent.match (/src=".*?\/v,(.*?),\./);
        if (!fodVideoCodes) fodVideoCodes = fodVideosContent.match (/src=".*?\/v(\d{3,4})\./);
        fodVideoCodes = (fodVideoCodes) ? fodVideoCodes[1] : '';
        if (fodVideoPath && fodVideoCodes) {
          for (var fodVideoCode in fodVideoFormats) {
            if (fodVideoCodes.indexOf(fodVideoCode.replace(/v/, '').replace(/\..*/, "")) != -1) {
              if (!fodVideoFound) fodVideoFound = true;
              fodVideo = fodVideoPath + fodVideoCode;
              myVideoCode = fodVideoFormats[fodVideoCode];
              fodVideoList[myVideoCode] = fodVideo;
            }
          }
        }
        else {
          fodVideoPath = fodVideosContent.match(/href="(.*?)v\d+.mp4"/);
          fodVideoPath = (fodVideoPath) ? fodVideoPath[1] : null;
          if (fodVideoPath) {
            if (!fodVideoFound) fodVideoFound = true;
            for (var fodVideoCode in fodVideoFormats) {
              fodVideo = fodVideoPath + fodVideoCode;
              myVideoCode = fodVideoFormats[fodVideoCode];
              fodVideoList[myVideoCode] = fodVideo;
            }
          }
        }

        if (fodVideoFound) {
          /* Create Player */
          fodDefaultVideo = 'Low Definition MP4';
          player = {
            'playerSocket': fodPlayerWindow,
            'playerWindow': myPlayerWindow,
            'videoList': fodVideoList,
            'videoPlay': fodDefaultVideo,
            'videoThumb': fodVideoThumb,
            'playerWidth': PlayerWidth,
            'playerHeight': PlayerHeight
          };
          feature['container'] = false;
          feature['widesize'] = false;
          option['definitions'] = ['High Definition', 'Low Definition'];
          option['containers'] = ['MP4'];
          createMyPlayer ();
          styleMyElement (player['playerPanel'], {height: '24px'}); 
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

  function onNodeInserted(e) { 
    if (e && e.target && e.target.textContent == "10") {
      nurl = window.location.href;
      if (page.url != nurl) window.location.href = nurl;
    }
  }

  fod_run();
  var pagecontainer = getMyElement ('', 'div', 'id', 'player-container', -1, false)
  if (pagecontainer) {
    var mo=window.MutationObserver||window.MozMutationObserver||window.WebKitMutationObserver;
    if(typeof mo!=='undefined') {
      var observer=new mo(function(mutations) {
        mutations.forEach(function(mutation) {
            if(mutation.addedNodes!==null && mutation.addedNodes.length > 0) {
              for (var i=0; i<mutation.addedNodes.length; i++) {
                  if (mutation.addedNodes[0].textContent == "10") {
//                    fod_run(mutation.addedNodes);
//                      setTimeout(function() { fod_run(); }, 5000);
                    nurl = window.location.href;
                    if (page.url != nurl) window.location.href = nurl;
                    break;
                  }
              }
            }
        });
      });
      observer.observe(pagecontainer, {childList: true, subtree: true}); 
    } else { // MutationObserver fallback for old browsers
      pagecontainer.parentNode.addEventListener('DOMNodeInserted', onNodeInserted, false);
    }
  }
}

// =====Videojug===== //

else if (page.url.indexOf('videojug.com/film') != -1) {

  /* Get Player Window */
  var vjPlayerWindow = getMyElement ('', 'div', 'id', 'player', -1, false);
  if (!vjPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Videos Content */
    var vjVideosContent = getMyContent (page.url, 'new\\s+Player\\((.*?)\\)', true);

    /* My Player Window */
    myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '384px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (vjPlayerWindow, 'div', '', true);
    styleMyElement (vjPlayerWindow, {height: '100%', backgroundColor: '#FFFFFF'});
    appendMyElement (vjPlayerWindow, myPlayerWindow);

    /* Get Videos */
    if (vjVideosContent) {
      vjVideosContent = vjVideosContent.replace(/'/g, '').replace(/\s/g, '');
      var vjVideosParts = vjVideosContent.split(',');
      var vjVideoToken = vjVideosParts[3];
      var vjVideoToken2 = vjVideoToken.substring(0,2);
      var vjVideoTitle = vjVideosParts[7];
      var vjVideoProtocol = page.win.location.protocol;
      var vjVideoSource = vjVideoProtocol + '//' + page.win.location.hostname + '/views/film/playlist.aspx?id=' + vjVideoToken;
      var vjVideoShapes = getMyContent(vjVideoSource, '<Shapes>(.*?)<\/Shapes>', false); 
      var vjVideoFormats = {'VJ480PENG.mp4': 'Standard Definition MP4', 'VJ360PENG.mp4': 'Low Definition MP4', 'PHOENG.mp4': 'Very Low Definition MP4', 'FW8ENG.flv': 'Low Definition FLV', 'FS8ENG.flv': 'Very Low Definition FLV'};
      var vjVideoList = {};
      var vjVideoFound = false;
      var vjVideoPart, myVideoCode, vjVideo, vjVideoThumb, vjVideoCodePart, vjVideoPattern, vjVideoLocation;
      if (vjVideoToken && vjVideoTitle && vjVideoShapes) {
        vjVideoPart = vjVideoToken2 + '/' + vjVideoToken + '/' + vjVideoTitle;
        for (var vjVideoCode in vjVideoFormats) {
          if (vjVideoCode.indexOf('VJ') != -1) vjVideoCodePart = vjVideoCode.substring(0, 6);
          else vjVideoCodePart = vjVideoCode.substring(0, 3);
          vjVideoPattern = 'Code="' + vjVideoCodePart + '"\\s+Locations="(.*?),';
          vjVideoLocation = vjVideoShapes.match(vjVideoPattern);
          vjVideoLocation = (vjVideoLocation) ? vjVideoProtocol + '//' + vjVideoLocation[1] : null;
          if (vjVideoLocation) {
            if (!vjVideoFound) vjVideoFound = true;
            vjVideo = vjVideoLocation + '/' + vjVideoPart + '__' + vjVideoCode; 
            myVideoCode = vjVideoFormats[vjVideoCode];
            vjVideoList[myVideoCode] = vjVideo;
          }
        }
        vjVideoThumb = 'http://content5.videojug.com/' + vjVideoPart + '.WidePlayer.jpg'; 
      }
      
      if (vjVideoFound) {
	/* Get Watch Sidebar */
	var vjSidebarWindow = getMyElement ('', 'aside', 'id', 'side-bar', -1, false);
	
	/* Create Player */
	var vjDefaultVideo = 'Low Definition MP4';
	player = {
	  'playerSocket': vjPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': vjVideoList,
	  'videoPlay': vjDefaultVideo,
	  'videoThumb': vjVideoThumb,
	  'playerWidth': 640,
	  'playerHeight': 384,
	  'playerWideWidth': 954,
	  'playerWideHeight': 562,
	  'sidebarWindow': vjSidebarWindow,
	  'sidebarMarginNormal': 5,
	  'sidebarMarginWide': 580
	};
	option['definition'] = 'SD';
	option['definitions'] = ['Standard Definition', 'Low Definition', 'Very Low Definition'];
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
  }
  
}

// =====Mevio===== //

else if (page.url.indexOf('mevio.com') != -1) {

  /* Get Player Window */
  var mePlayerWindow = getMyElement ('', 'div', 'id', 'player-zone', -1, false);
  if (!mePlayerWindow) {
      //showMyMessage ('!player');
  }
  else {
    /* Get Data Content */
    var meDataContent = getMyContent (page.url, 'args.default_media\\s+=\\s+\\{(.*?)\\};', false);
    meDataContent = cleanMyContent (meDataContent, true);

    /* Get Video Thumbnail */
    var meVideoThumb = meDataContent.match(/"large":"(.*?)"/);
    meVideoThumb = (meVideoThumb) ? meVideoThumb[1] : null;

    /* Get Videos Content */
    var meVideosContent = meDataContent.match(/"media_urls":\{(.*?)\}/);
    meVideosContent = (meVideosContent) ? meVideosContent[1] : null;

    /* My Player Window */
    myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '915px', height: '538px', margin: '0px auto', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (mePlayerWindow, 'div', '', true);
    styleMyElement (mePlayerWindow, {backgroundImage: 'none !important', backgroundColor: '#656665 !important'});
    appendMyElement(mePlayerWindow, myPlayerWindow);

    /* Get Videos */
    if (meVideosContent) {
      var meVideoFormats = {'mp4': 'High Definition MP4', 'm4v': 'High Definition M4V',  'mov': 'High Definition MOV', 'h264': 'Low Definition MP4', 'flv': 'Low Definition FLV'};
      var meVideoList = {};
      var meVideoFound = false;
      var meVideoParser, meVideoParse, meVideo, myVideoCode;
      for (var meVideoCode in meVideoFormats) {
	meVideoParser = meVideoCode + '":"(.*?)"';
	meVideoParse = meVideosContent.match (meVideoParser);
	meVideo = (meVideoParse) ? meVideoParse[1] : null;
	if (meVideo) {
	  if (!meVideoFound) meVideoFound = true;
	  myVideoCode = meVideoFormats[meVideoCode];
	  meVideoList[myVideoCode] = meVideo;
	}
      }

      if (meVideoFound) {
	/* Create Player */
	var meDefaultVideo = 'Low Definition FLV';
	player = {
      'playerSocket': mePlayerWindow,
      'playerWindow': myPlayerWindow,
      'videoList': meVideoList,
      'videoPlay': meDefaultVideo,
      'videoThumb': meVideoThumb,
      'playerWidth': 915,
      'playerHeight': 538
	};
	feature['widesize'] = false;
	option['definitions'] = ['High Definition', 'Low Definition'];
	option['containers'] = ['MP4', 'M4V', 'MOV', 'FLV', 'Any'];
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

// =====Blip===== //

else if (page.url.indexOf('blip.tv') != -1) {

  /* Get Page Type */
  var blipPageType = getMyContent (page.url, 'meta\\s+property="og:type"\\s+content="(.*?)"', false);
  if (!blipPageType || blipPageType != 'video.episode') return;

  /* Get Player Window */
  var blipPlayerWidth, blipPlayerHeight;
  var blipPlayerWindow = getMyElement ('', 'div', 'class', 'EpisodePlayer', 0, false) || getMyElement ('', 'div', 'id', 'ErrorWrap', -1, false);
  if (!blipPlayerWindow) {
    blipPlayerWindow = getMyElement ('', 'div', 'id', 'PlayerEmbed', -1, false);
    blipPlayerWidth = 596;
    blipPlayerHeight = 334;
  }
  else {
    blipPlayerWidth = 960;
    blipPlayerHeight = 565;
  }
  if (!blipPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Video Thumbnail */
    var blipVideoThumb = getMyContent (page.url, 'meta\\s+property="og:image"\\s+content="(.*?)"', false);

    /* Get Videos Content */
    var blipVideosContent = getMyContent(page.url + '?skin=json', '"additionalMedia":\\[(.*?)\\]', false);

    /* My Player Window */    
    myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: blipPlayerWidth + 'px', height: blipPlayerHeight + 'px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (blipPlayerWindow, 'div', '', true);
    styleMyElement (blipPlayerWindow, {paddingTop: '0px'});
    appendMyElement (blipPlayerWindow, myPlayerWindow);
    var blipHeader = getMyElement ('', 'div', 'id', 'Header', -1, false);
    styleMyElement (blipHeader , {zIndex: '0'});


    /* Get Videos */
    if (blipVideosContent) {
      var blipVideoList = {};
      var blipVideoFound = false;
      var blipMimeTypes = {'video/x-m4v': 'M4V', 'video/quicktime': 'MOV', 'video/mp4': 'MP4', 'video/x-flv': 'FLV'};
      var blipVideos = blipVideosContent.split(',{');
      var blipVideoURL, blipVideoMime, blipVideoHeight, blipVideoRole, blipVideoDef, blipVideoCode;
      var blipDefaultVideo = 'Low Definition MP4';
      for (var blipV = 0; blipV < blipVideos.length; blipV++) {
	blipVideoMime = blipVideos[blipV].match(/"primary_mime_type":"(.*?)"/);
	blipVideoMime = (blipVideoMime) ? blipVideoMime[1] : null;
	if (blipMimeTypes[blipVideoMime]) {
	  blipVideoURL = blipVideos[blipV].match(/"url":"(.*?)"/);
	  blipVideoURL = (blipVideoURL) ? blipVideoURL[1] : null;
	  blipVideoHeight = blipVideos[blipV].match(/"media_height":"(.*?)"/);
	  blipVideoHeight = (blipVideoHeight) ? blipVideoHeight[1] : null;
	  blipVideoRole = blipVideos[blipV].match(/"role":"(.*?)"/);
	  blipVideoRole = (blipVideoRole) ? blipVideoRole[1] : null;
	  if (blipVideoURL && blipVideoHeight && blipVideoRole) {
	    if (!blipVideoFound) blipVideoFound = true;
	    if (blipVideoHeight >= 200 && blipVideoHeight < 400) blipVideoDef = 'Low Definition';
	    else if (blipVideoHeight >= 400 && blipVideoHeight < 700) blipVideoDef = 'Standard Definition';
	    else if (blipVideoHeight >= 700) blipVideoDef = 'High Definition';
	    blipVideoCode = blipVideoDef + ' ' + blipMimeTypes[blipVideoMime];
	    blipVideoList[blipVideoCode] = blipVideoURL;
	    if (blipVideoRole == 'Source') blipDefaultVideo = blipVideoCode;
	  }
	}
      }

      if (blipVideoFound) {
	/* Create Player */
	player = {'playerSocket': blipPlayerWindow, 'playerWindow': myPlayerWindow, 'videoList': blipVideoList, 'videoPlay': blipDefaultVideo, 'videoThumb': blipVideoThumb, 'playerWidth': blipPlayerWidth, 'playerHeight': blipPlayerHeight};
	feature['widesize'] = false;
	option['definitions'] = ['High Definition', 'Standard Definition', 'Low Definition'];
	option['containers'] = ['MP4', 'M4V', 'MOV', 'FLV', 'Any'];
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

// =====Veoh===== //

else if (page.url.indexOf('veoh.com/watch') != -1) {

  /* Get Video Availability */
  if (getMyElement ('', 'div', 'class', 'veoh-video-player-error', 0, false)) return;
 
  /* Get Player Window */
  var vePlayerWindow = getMyElement ('', 'div', 'id', 'videoPlayerContainer', -1, false);
  if (!vePlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Videos Content */
    var veVideosContent = getMyContent (page.url, '__watch.videoDetailsJSON = \'\\{(.*?)\\}', false);
    veVideosContent = cleanMyContent (veVideosContent, true);
    
    /* Get Video Thumbnail */
    var veVideoThumbGet = veVideosContent.match (/"highResImage":"(.*?)"/);
    var veVideoThumb = (veVideoThumbGet) ? veVideoThumbGet[1] : null;

    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '640px', height: '382px', backgroundColor: '#F4F4F4', zIndex: '99999'});
    modifyMyElement (vePlayerWindow, 'div', '', true);
    styleMyElement (vePlayerWindow, {height: '100%'});
    appendMyElement (vePlayerWindow, myPlayerWindow);

    /* Get Videos */
    if (veVideosContent) {
      var veVideoFormats = {'fullPreviewHashLowPath': 'Very Low Definition MP4', 'fullPreviewHashHighPath': 'Low Definition MP4'};
      var veVideoList = {};
      var veVideoFound = false;
      var veVideoParser, veVideoParse, veVideo, myVideoCode;
      for (var veVideoCode in veVideoFormats) {
	veVideoParser = veVideoCode + '":"(.*?)"';
	veVideoParse = veVideosContent.match (veVideoParser);
	veVideo = (veVideoParse) ? veVideoParse[1] : null;
	if (veVideo) {
	  if (!veVideoFound) veVideoFound = true;
	  myVideoCode = veVideoFormats[veVideoCode];
	  veVideoList[myVideoCode] = veVideo;
	}
      }

      if (veVideoFound) {
	/* Get Watch Sidebar */
	var veSidebarWindow = getMyElement ('', 'div', 'id', 'videoToolsContainer', -1, false);
	if (veSidebarWindow) styleMyElement(veSidebarWindow, {marginTop: '-380px'});

	/* Create Player */
	var veDefaultVideo = 'Low Definition MP4';
	player = {
	  'playerSocket': vePlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': veVideoList,
	  'videoPlay': veDefaultVideo,
	  'videoThumb': veVideoThumb,
	  'playerWidth': 640,
	  'playerHeight': 382,
	  'playerWideWidth': 970,
	  'playerWideHeight': 568,
	  'sidebarWindow': veSidebarWindow,
	  'sidebarMarginNormal': -380,
	  'sidebarMarginWide': 20
	};
	feature['container'] = false;
	option['definition'] = 'LD';
	option['definitions'] = ['Low Definition', 'Very Low Definition'];
	option['containers'] = ['MP4'];
	createMyPlayer ();
      }
      else {
	var veVideoSource = getMyContent(page.url, '"videoContentSource":"(.*?)"', false);
	if (veVideoSource == 'YouTube') var ytVideoId = getMyContent(page.url, '"videoId":"yapi-(.*?)"', false);
	if (ytVideoId) {
	  var ytVideoLink = 'http://youtube.com/watch?v=' + ytVideoId;
	  showMyMessage ('embed', ytVideoLink);
	}
	else {
	  showMyMessage ('!videos');
	}
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
    myPlayerWindow = createMyElement ('div', '', '', '', '');
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

// =====IMDB===== //

else if (page.url.indexOf('imdb.com/video/') != -1) {

  /* Get Player Window */
  var imdbPlayerWindow = getMyElement ('', 'div', 'id', 'player-article', -1, false);
  if (!imdbPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* My Player Window */ 
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '670px', height: '398px', backgroundColor: '#F4F4F4'});
    modifyMyElement (imdbPlayerWindow, 'div', '', true);
    appendMyElement (imdbPlayerWindow, myPlayerWindow);

    /* Get Videos Content */
    var imdbVideoList = {};
    var imdbVideoFormats = {'1': 'Low Definition MP4', '2': 'Standard Definition MP4', '3': 'High Definition MP4'};
    var imdbVideoThumb, imdbDefaultVideo, imdbURL, imdbVideo, myVideoCode;
    var imdbVideoFound = false;
    var imdbVideoRTMP = false;
    var imdbPageURL = page.url.replace(/\?.*$/, '').replace(/\/$/, '');
    for (var imdbVideoCode in imdbVideoFormats) {
      imdbURL = imdbPageURL + '/player?uff=' + imdbVideoCode;
      imdbVideo = getMyContent (imdbURL, 'so.addVariable\\("file",\\s+"(.*?)"\\);', true);
      if (!imdbVideoThumb) imdbVideoThumb = getMyContent (imdbURL, 'so.addVariable\\("image",\\s+"(.*?)"\\);', true);
      if (imdbVideo) {
	if (imdbVideo.indexOf('rtmp') != -1) {
	  if (!imdbVideoRTMP) imdbVideoRTMP = true;
	}
	else {
	  if (!imdbVideoFound) imdbVideoFound = true;
	  myVideoCode = imdbVideoFormats[imdbVideoCode];
	  imdbVideoList[myVideoCode] = imdbVideo;
	  if (!imdbDefaultVideo) imdbDefaultVideo = myVideoCode;
	}
      }
    }

    if (imdbVideoFound) {
      /* Get Watch Sidebar */
      var imdbSidebarWindow = getMyElement ('', 'div', 'id', 'sidebar', -1, false);
      styleMyElement (imdbSidebarWindow, {marginTop: '-400px'});
      
      /* Create Player */
      player = {
	'playerSocket': imdbPlayerWindow,
	'playerWindow': myPlayerWindow,
	'videoList': imdbVideoList,
	'videoPlay': imdbDefaultVideo,
	'videoThumb': imdbVideoThumb,
	'playerWidth': 670,
	'playerHeight': 398,
	'playerWideWidth': 1010,
	'playerWideHeight': 594,
	'sidebarWindow': imdbSidebarWindow,
	'sidebarMarginNormal': -400,
	'sidebarMarginWide': 0
      };
      feature['container'] = false;
      option['definitions'] = ['High Definition', 'Standard Definition', 'Low Definition'];
      option['containers'] = ['MP4'];
      createMyPlayer ();
    }
    else {
      if (imdbVideoRTMP) showMyMessage ('!support');
      else showMyMessage ('!videos');
    }
  }
  
}

// =====Crackle===== //

else if (page.url.indexOf('crackle.com/') != -1) {
  
  /* Get Page Type */
  var crPageType = getMyContent (page.url, 'meta\\s+property="og:type"\\s+content="(.*?)"', false);
  if (!crPageType || crPageType.indexOf('video') == -1) return;
 
  /* Get Player Window */
  var crPlayerWindow = getMyElement ('', 'div', 'id', 'main', -1, false);
  if (!crPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Video ID */
    var crVideoID = getMyContent (page.url, 'StartPlayer\\s+\\((.*?),', false);
     
    /* Get Videos Content */
    var crVideoPath = getMyContent (page.url, 'images-us-am.crackle.com\/(.*?_)tnl', false);
    if (!crVideoPath) {
      var crVidWallCache = page.win.location.protocol + '//' + page.win.location.hostname + '/app/vidwallcache.aspx?flags=-1&fm=' + crVideoID + '&partner=20';
      crVideoPath = getMyContent (crVidWallCache, '\\sp="(.*?)"', false);
    }
         
    /* My Player Window */
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '970px', height: '570px', backgroundColor: '#F4F4F4'});
    modifyMyElement (crPlayerWindow, 'div', '', true);
    styleMyElement (crPlayerWindow, {width: '970px', height: '570px', backgroundColor: '#FFFFFF'});
    appendMyElement (crPlayerWindow, myPlayerWindow);
     
    /* Get Videos */
    if (crVideoPath) {
      var crVideoList = {};
      var crVideoFormats = {'360p.mp4': 'Low Definition MP4', '480p.mp4': 'Standard Definition MP4'};
      var crVideoThumb, crVideo, myVideoCode;
      for (var crVideoCode in crVideoFormats) {
	crVideo = 'http://media-us-am.crackle.com/' + crVideoPath + crVideoCode;
	myVideoCode = crVideoFormats[crVideoCode];
	crVideoList[myVideoCode] = crVideo;
      }
      crVideoThumb = 'http://images-us-am.crackle.com/' + crVideoPath + 'tnl.jpg';

      /* Create Player */
      var crDefaultVideo = 'Low Definition MP4';
      player = {
	'playerSocket': crPlayerWindow,
	'playerWindow': myPlayerWindow,
	'videoList': crVideoList,
	'videoPlay': crDefaultVideo,
	'videoThumb': crVideoThumb,
	'playerWidth': 970,
	'playerHeight': 570,
      };
      feature['container'] = false;
      feature['widesize'] = false;
      option['definition'] = 'SD';
      option['definitions'] = ['Standard Definition', 'Low Definition'];
      option['containers'] = ['MP4'];
      createMyPlayer ();
   
      /* Fix Thumbnails */
      var crThumbs = getMyElement('', 'div', 'class', 'thumbnail', -1, false);
      for (var crT = 0; crT < crThumbs.length; crT++) {
	if (crThumbs[crT].innerHTML.indexOf('updateWatchPage') != -1) {
	  var crLink = crThumbs[crT].innerHTML.match(/,\s+\d+,\s+'(.*?)'/);
	  crLink = (crLink) ? crLink[1] : null;
	  var crImg = crThumbs[crT].innerHTML.match(/src="(.*?)"/);
	  crImg = (crImg) ? crImg[1] : null;
	  crThumbs[crT].innerHTML = '<img src="' + crImg + '" onclick="window.location.href=\'' + crLink + '\'" style="cursor:pointer">';
	}
      }
    }
    else {
      showMyMessage ('!videos');
    }
  }
   
}

// =====Facebook===== //

else if (page.url.indexOf('facebook.com/photo') != -1) {
  
  /* Get Player Window */
  var fbPlayerWindow = getMyElement ('', 'div', 'class', 'stageWrapper', 0, false);
  if (!fbPlayerWindow) {
    showMyMessage ('!player');
  }
  else {
    /* Get Videos Content */
    var fbVideosContent = getMyContent(page.url, '"params","(.*?)"', false);
    var fbPattern = /\\u([\d\w]{4})/gi;
    fbVideosContent = fbVideosContent.replace(fbPattern, function (match, group) {
      return String.fromCharCode(parseInt(group, 16));
    });
    fbVideosContent = unescape(fbVideosContent);
      
    /* My Player Window */ 
    var myPlayerWindow = createMyElement ('div', '', '', '', '');
    styleMyElement (myPlayerWindow, {position: 'relative', width: '720px', height: '428px', backgroundColor: '#F4F4F4'});
    modifyMyElement (fbPlayerWindow, 'div', '', true);
    appendMyElement (fbPlayerWindow, myPlayerWindow);
    
    /* Get Videos */
    if (fbVideosContent) {
      var fbVideoList = {};
      var fbVideoFormats = {'sd_src': 'Low Definition MP4', 'hd_src': 'High Definition MP4'};
      var fbVideoFound = false;
      var fbVideoPattern, fbVideo, myVideoCode, fbVideoThumb, fbDefaultVideo;
      for (var fbVideoCode in fbVideoFormats) {
	fbVideoPattern = '"' + fbVideoCode + '":"(.*?)"';
	fbVideo = fbVideosContent.match(fbVideoPattern);
	fbVideo = (fbVideo) ? fbVideo[1] : null;
	if (fbVideo) {
	  fbVideo = cleanMyContent(fbVideo, false);
	  if (!fbVideoFound) fbVideoFound = true;
	  myVideoCode = fbVideoFormats[fbVideoCode];
	  if (fbVideo.indexOf('.flv') != -1) myVideoCode = myVideoCode.replace('MP4', 'FLV');
	  fbVideoList[myVideoCode] = fbVideo;
	  if (!fbDefaultVideo) fbDefaultVideo = myVideoCode;
	}
	fbVideoThumb = fbVideosContent.match(/"thumbnail_src":"(.*?)"/);
	fbVideoThumb = (fbVideoThumb) ? fbVideoThumb[1] : null;
	fbVideoThumb = cleanMyContent(fbVideoThumb, false);
      }
	
      if (fbVideoFound) {
	/* Create Player */
	player = {
	  'playerSocket': fbPlayerWindow,
	  'playerWindow': myPlayerWindow,
	  'videoList': fbVideoList,
	  'videoPlay': fbDefaultVideo,
	  'videoThumb': fbVideoThumb,
	  'playerWidth': 720,
	  'playerHeight': 428
	};
	feature['widesize'] = false;
	option['definitions'] = ['High Definition', 'Low Definition'];
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
  }
};
