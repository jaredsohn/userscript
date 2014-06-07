// ==UserScript==
// @name           YouTube Loop
// @namespace      http://d.hatena.ne.jp/youpy/
// @include        http://*youtube.com/watch?v=*
// ==/UserScript==

var ytplayer;

var p = createElement('p', {
  id: 'loop-controller'
}, 'Loop: ');

var seek_buttons = {
  seek_from: createElement('button', {
    id: 'seek_from'
  }, '0'),
  seek_to: createElement('button', {
    id: 'seek_to'
  }, '-')
};

var reset_button = createElement('button', {
  id: 'reset'
}, 'reset');

var permalink = createElement('a', {
  id: 'loop-permalink',
  href: location.href
}, 'permalink');

p.appendChild(seek_buttons.seek_from);
p.appendChild(seek_buttons.seek_to);
p.appendChild(reset_button);
p.appendChild(permalink);

unsafeWindow.onYouTubePlayerReady = function(playerId) {
  ytplayer = unsafeWindow.document.getElementById('myytplayer');

  $('watch-player-div').appendChild(p);

  var loopMaker = new LoopMaker(ytplayer);

  ['seek_from', 'seek_to'].forEach(function(which) {
    seek_buttons[which].addEventListener('click', function(event) {
      event.target.innerHTML = loopMaker.setSeek(which);
      loopMaker.setHash();
      permalink.href = location.href;
    }, false);
  });

  reset_button.addEventListener('click', function(event) {
    setSeek('seek_from', 0);
    setSeek('seek_to', null);

    loopMaker.setHash();
    permalink.href = location.href;
  }, false);

  var tid = setInterval(function(){
    if (ytplayer) {
      clearInterval(tid);

      var hash = location.hash.slice(1);
      var values  = hash.split('-');

      if(values.length > 1) {
	var from_sec = values[0];
	var to_sec = values[1];

	setSeek('seek_from', from_sec)
	setSeek('seek_to', to_sec)
      }

      loopMaker.loop(true);
    }    
  }, 100);

  function setSeek(which, sec) {
    sec = loopMaker.setSeek(which, sec);
    seek_buttons[which].innerHTML = (sec == null) ? '-' : sec;
  }
}

var LoopMaker = function(ytplayer) {
  this.ytplayer = ytplayer;
  this.seek_from = 0;
  this.seek_to = null;
};

LoopMaker.prototype.setSeek = function(which, sec) {
  if(arguments.length == 1)
    return this[which] = parseInt(ytplayer.getCurrentTime());

  var s = parseInt(sec);
  return this[which] = isNaN(s) ? null : s;
};

LoopMaker.prototype.setHash = function() {
  location.hash = [this.seek_from, this.seek_to].join('-');
};

LoopMaker.prototype.loop = function(infinite) {
  var self = this;
  this.ytplayer.seekTo(this.seek_from, true);
  this.ytplayer.playVideo();

  var tid = setInterval(function(){
    if((self.seek_to || self.ytplayer.getDuration()) <= self.ytplayer.getCurrentTime()) {
      if(infinite) {
	clearInterval(tid);
	self.loop(infinite);
      } else {
	clearInterval(tid);
	self.ytplayer.pauseVideo();
      }
    }
  }, 100);
}

addEventListener('load', function() {
  var so = new unsafeWindow.SWFObject(
				      'http://www.youtube.com/v/' + unsafeWindow.pageVideoId + '&enablejsapi=1&playerapiid=ytplayer',
				      'myytplayer',
				      '480',
				      '395',
				      '8',
				      '#ffffff');
  so.addParam('allowScriptAccess', 'always');
  so.write('watch-player-div');
}, false);

function $(id) {
  return document.getElementById(id);
}

function $x(exp, context) {
  if (!context) context = document;
    var resolver = function (prefix) {
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
  var exp = context.createExpression(exp, resolver);

  var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
    case XPathResult.STRING_TYPE : return result.stringValue;
    case XPathResult.NUMBER_TYPE : return result.numberValue;
    case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
      result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var ret = [];
      for (var i = 0, len = result.snapshotLength; i < len ; i++) {
        ret.push(result.snapshotItem(i));
      }
      return len != 0 ? ret : null;
    }
  }
  return null;
}

function createElement(tagName, attrs, innerHTML) {
  var element = document.createElement(tagName);
  for(var k in attrs) {
    element.setAttribute(k, attrs[k]);
  }
  element.innerHTML = innerHTML;

  return element;
}

GM_addStyle(<><![CDATA[
		       #loop-controller {
			 margin: 0.5em 0 0;
			 padding: 0.5em;
			 border: #fc3 1px solid;
			 background: #ffc;
		       }
		       
		       #loop-permalink {
			 font-weight: bold;
			 margin: 0 0 0 0.5em;
		       }

		       #reset {
			 margin: 0 0 0 0.5em;
		       }

		       ]]></>);
