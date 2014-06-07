// ==UserScript==
// @name          goNEXT
// @namespace     net.moeffju.dA
// @description	  Easy gallery navigation
// @include       http://www.deviantart.com/view/*
// @include       http://www.deviantart.com/deviation/*
// @exclude       http://www.deviantart.com/deviation/*/favourites
// ==/UserScript==

// ÃÂ© 2005 Matthias Bauer <http://moeffju.deviantart.com/>

/* 
  Version 0.2
  ===========
  
  0.2
   - Fixed bug with first/last deviation
  
  0.1
   - First release

*/

(function (){

/*
 * goNEXT is ÃÂ© 2005 Matthias Bauer <http://moeffju.net/>
 * Licensed under the GNU General Public License, version 2 (but no later version!)
 */
var goNEXT = {
  
  SCRIPT_NAME : 'goNEXT',
  SCRIPT_URL : 'http://moeffju.net/dA/hack/js/goNEXT/',
  
  UPDATE_URL : 'http://moeffju.net/dA/hack/js/update',
  VERSION : '0.2',
  
  TIMER_GF : null,
  VIEW : null,
  DEVID : null,
  DEVNAME : null,
  PREV : null,
  NEXT : null,
  
  main : function () {
    var self = this;
    var tmp = document.location.href.match(/^http:\/\/www\.deviantart\.com\/(view|deviation)\/(\d+)\//);
    if (tmp.length == 3) {
      self.VIEW = tmp[1];
      self.DEVID = tmp[2];
    } else return;
    
    var tmp = this.xpath('id("content")/DIV[1]/DIV[1]/P/A', document, XPathResult.FIRST_ORDERED_NODE_TYPE);
    if (tmp) self.DEVUSER = tmp.singleNodeValue.textContent;
    
    var gf = document.createElement('script');
    gf.src = ['http://', self.DEVUSER, '.deviantart.com/stats/gallery/script.js.php/gallerystats.js'].join('');
    document.getElementsByTagName('head')[0].appendChild(gf);
	
    self.TIMER_GF = setInterval(function(){self.checkGF(self)}, 100);
  },
  
  getDevLink : function(view, id, text) {
    return ['<a href="http://www.deviantart.com/', view, '/', id, '/">', text, '</a>'].join('');
  },
  
  insertLinks : function(self) {
    var target = self.xpath('id("content")/DIV[1]/DIV[1]', document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    var holder = document.createElement('div');
    var content = [];
    
    holder.style.cssFloat = 'right';
    holder.style.textAlign = 'right';
    if (self.PREV.idx != -1)
      content.push([self.getDevLink(self.VIEW, self.PREV.devid, self.PREV.title),' ', self.getDevLink(self.VIEW, self.PREV.devid, '[&lt;&lt;]')].join(''));
    if (self.NEXT.idx != -1)
      content.push([self.getDevLink(self.VIEW, self.NEXT.devid, self.NEXT.title), ' ', self.getDevLink(self.VIEW, self.NEXT.devid, '[&gt;&gt;]')].join(''));
    
    holder.innerHTML = content.join('<br>');
    target.insertBefore(holder, target.firstChild);
  },
  
  gotGF : function(self, gf) {
    var idx = -1;
    for (var i = 0; i < gf.deviations.length; i++)
      if (gf.deviations[i].id == self.DEVID) idx = i;
    if (idx == -1) return;
    
    var prev = idx - 1;
    var next = idx + 1;
    
    if (next >= gf.deviations.length) next = -1;
    if (prev < 0) prev = -1;
    
    self.PREV = {idx:prev};
    if (prev != -1) self.PREV = {idx: prev, devid: gf.deviations[prev].id, title: gf.deviations[prev].title};
    self.NEXT = {idx:next};
    if (next != -1) self.NEXT = {idx: next, devid: gf.deviations[next].id, title: gf.deviations[next].title};
    
    self.insertLinks(self);
  },
  
  checkGF : function(self) {
    if (window.GalleryFeed) {
      clearInterval(self.TIMER_GF);
      self.gotGF(self, window.GalleryFeed);
    }
  },
  
  xpath : function (query, contextNode, resultType) {
    if (null == contextNode) contextNode = document;
    if (null == resultType) resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    return document.evaluate(query, contextNode, null, resultType, null);
  },
  
  checkVersion : function () {
    var last = GM_getValue('versionCheck.lastOldVersion');
    if (last && last == this.VERSION) {
      this.notifyNewVersion();
      return;
    }
    
    var now = Math.floor(new Date().getTime() / 1000);
    var lastCheckTime = GM_getValue('versionCheck.lastCheckTime', now);
    
    if (now < lastCheckTime + 24 * 60 * 60) {
      return; // want at least one day since last check
    }
    
    var url = [this.UPDATE_URL, '?name=', escape(this.SCRIPT_NAME), '&version=', escape(this.VERSION), '&t=', lastCheckTime].join('');
    var self = this;
    
    GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': [navigator.userAgent, ' Greasemonkey (', this.SCRIPT_NAME, ')'].join(''),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function(response) {
        if (response.status == 200) {
          GM_setValue('versionCheck.lastCheckTime', now);
          eval('var v = '+response.responseText);
          
          if (v && (v.v > parseFloat(self.VERSION))) {
            GM_setValue('versionCheck.lastOldVersion', self.VERSION);
            self.notifyNewVersion();
          }
        }
        else if (response.status == 304) {
          // No change
        }
        else {
          NoticeHandler.displayNotice(
            'Update check failed with status <b>' + response.status + ' ' + response.statusText + '</b><br/>\n\n',
            '#ff8080', '#ff0000', 20, 0.001);
        }
      }
    });
  },
  
  notifyNewVersion : function () {
    NoticeHandler.displayNotice(
      'A newer version of <b>' + this.SCRIPT_NAME + '</b> is available.<br/>\n'+
      '<a style="display:block;" href="' + this.SCRIPT_URL + '"><b>Click here to update</b></a>\n',
      '#fdff7c', '#ffff00', 150, 0.001);
  },

  init : function () {
    this.checkVersion();
    this.main();
  }
  
};

/*
 * NoticeHandler is ÃÂ© 2005 Matthias Bauer <http://moeffju.net/>
 * Licensed under the GNU General Public License, version 2 (and no later version)
 */
var NoticeHandler = {

  VERSION : 0.3,

  fadeNotice : function (elem, delay, step) {
    if (!delay) delay = 50;
    if (!step) step = '.01';
    
    step = parseFloat(step);
    
    if (!elem.style.opacity) {
      elem.style.opacity = '.99999999';
    } else {
      elem.style.opacity = Math.max(parseFloat(elem.style.opacity) - step, 0);
    }
    
    if (parseFloat(elem.style.opacity) > 0.01) {
      var self = this;
      setTimeout(function() { self.fadeNotice(elem, delay, step); }, delay);
    } else {
      var i;
      
      for (i = 0; i < window.notices.length; i++) {
        if (window.notices[i] == elem) {
          window.notices.splice(i, 1);
          setTimeout(function(){ document.body.removeChild(elem); }, 1);
          break;
        }
      }
      
      for (; i < window.notices.length; i++) {
        window.notices[i].style.top = 10 + (i * 50) + 'px';
      }
    }
  },
  
  displayNotice : function (content, bgcol, bordercol, fadeDelay, fadeStep) {
    if (!bgcol) bgcol = '#fdff7c';
    if (!bordercol) bordercol = '#ffff00';
    if (!fadeDelay) fadeDelay = 10;
    if (!fadeStep) fadeStep = 0.001;
    
    var notice = document.createElement('div');
    
    if (!window.notices) window.notices = [];
    window.notices.push(notice);
    
    notice.style.position = 'fixed';
    // notice.style.left = ((document.body.offsetWidth - 300) / 2) + 'px'; // center
    notice.style.right = '10px';
    notice.style.top = 10 + ((window.notices.length-1) * 50) + 'px';
    notice.style.minWidth = '400px';
    notice.style.height = '30px';
    notice.style.padding = '3px 6px';
    notice.style.border = '4px solid';
    notice.style.textAlign = 'center';
    
    notice.style.backgroundColor = bgcol;
    notice.style.borderColor = bordercol;
    
    notice.innerHTML = content;
    
    this.fadeNotice(notice, fadeDelay, fadeStep, true);
    
    document.body.appendChild(notice);
    
    return notice;
  },
  
};

if (!window.NoticeHandler || (window.NoticeHandler && parseFloat(window.NoticeHandler.VERSION) < parseFloat(NoticeHandler.VERSION)))
  window.NoticeHandler = NoticeHandler;

goNEXT.init();

})();
