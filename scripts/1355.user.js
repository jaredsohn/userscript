// ==UserScript==
// @name          quickSUBMIT
// @namespace     net.moeffju.dA
// @description	  Faster submission process
// @include       http://www.deviantart.com/submit/*
// ==/UserScript==

// ÃÂ© 2005 Matthias Bauer <http://moeffju.deviantart.com/>

/* 
  Version 0.4
  ===========
  
  0.32 -> 0.4
   - Store bookmarks seperate for each dA account
  
  0.2 -> 0.32
   - Don't flash single elements after removing
   - Double-clicking now really works
   - Don't show bookmarks bar in Print Submission
  
  0.1 -> 0.2
   - Double-clicking a category now selects and proceeds

  0.1
   - First release

*/

(function() {

/*
 * quickSUBMIT is ÃÂ© 2005 Matthias Bauer <http://moeffju.net/>
 * Licensed under the GNU General Public License, version 2 (but no later version!)
 */
var quickSUBMIT = {

  SCRIPT_NAME : 'quickSUBMIT',
  SCRIPT_URL : 'http://moeffju.net/dA/hack/js/quickSUBMIT/',
  
  UPDATE_URL : 'http://moeffju.net/dA/hack/js/update',
  VERSION : '0.4',
  
  STEP_ONE_KEEP : ['Deviation', 'Scrap', 'Print', 'deviantID'],
  
  FADE_FPS : 30,
  FADE_DURATION : 1000,
  FADE_COLOR : '#FFFFFF',
  FADE_BG : '#FF0000',
  
//  IMG_ADD : 'data:image/gif;base64,R0lGODlhCgAKAMIEAK%2Bvr7CwsLW1tbu7u%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEKAAQALAAAAAAKAAoAAAMZSLrMAG0JEdVsIIQxNCTZ1gWfRFVX9VRVAgA7',
  IMG_REMOVE : 'data:image/gif;base64,R0lGODlhEgASANUAAP%2F%2F%2F97e39nc2dPW0tXU1bCwsKarpKWopqKnoKGmn5uhmJedlJSXlI%2BWjouRiYWNgoqLiX%2BHfXmAd3l8eHV8cXF4b25wbGlwZmhrZmJnYFtjWV1hWllhVkpNSEJFQT9DPTxDOTo6OjU6My4yLCsvKSgtJv%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUACYALAAAAAASABIAAAaNQJNwSCwaj8ikUqjxhEbQqOijMXoSBoVWwWgoGh5jqPBoOCSSx0OiCBdHh0UgoBbQGx8jvBEACAQAARF4eggVEgMAAAMUGQ4gegsXFYmLFhwRkG9ngAQEixcSIUYknAQWFgMCFRWjRSIMGBSXHJMbEXlFHRANEb4REhXAHUYTHSIkycklIh0TS9DR0kdBADs%3D',
  
  xpath : function (query, contextNode, resultType) {
    if (null == contextNode) contextNode = document;
    if (null == resultType) resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
    return document.evaluate(query, contextNode, null, resultType, null);
  },
  
  removeNode : function (node) {
    if (node && node.parentNode) node.parentNode.removeChild(node);
  },
  
  getUsername : function () {
    if (!document.getElementsByName("deviantMETA")) return;
    // Check whether we are on the user's own page.
    eval("var dm = " + document.getElementsByName("deviantMETA")[0].getAttribute('content'));
    if (!dm || !dm.username) return;
    
    return dm.username;
  },
  
  loadBookmarks : function () {
    var u = this.getUsername();
    if (!u) return [];
    
    if (GM_getValue('bookmarks')) {
      // Convert from old versions (<= 0.32)
      var t = GM_getValue('bookmarks');
      GM_setValue('bookmarks', '');
      GM_setValue(['bookmarks',u].join('.'), t);
      GM_log('Converted bookmarks from pre-0.4');
    }
    
    var records = GM_getValue(['bookmarks',u].join('.'));
    if (!records) return [];
    records = records.split('\n');
    
    var b = [];
    var rs;
    for (var i = 0, r; r = records[i]; i++) {
      rs = r.split('\t');
      b[rs[0]] = rs;
    }
    
    return b;
  },
  
  saveBookmarks : function (records) {
    var u = this.getUsername();
    if (!u) return;
    
    var t = [];
    for (var x in records) t.push(records[x].join('\t'));
    GM_setValue(['bookmarks',u].join('.'), t.join('\n'));
  },
  
  addBookmark : function (x) {
    var a = x.getElementsByTagName('a');
    
    var catid = document.getElementsByName('devcatid')[0].value;
    var icon = x.getElementsByTagName('img')[0].src;
    var name = x.textContent.replace(/^\s*(.*)\s*$/,'$1');
    var link = a[a.length-1].href;
    
    var records = this.loadBookmarks();
    records[catid] = [catid, icon, name, link];
    this.saveBookmarks(records);
    this.updateBookmarkBar();
    this.highlightItem(catid);
  },
  
  removeBookmark : function (catid) {
    var self = quickSUBMIT;
    var records = self.loadBookmarks();
    
    delete records[catid];
    self.saveBookmarks(records);
    self.updateBookmarkBar();
    self.highlightItem(-1);
  },
  
  highlightItem : function (n) {
    var b = document.getElementById('quicksubmit-bookmarks');
    if (!b) return;

    var x = (-1 == n ? b.getElementsByTagName('h2')[0] : document.getElementById('qsi-'+n));
    Fat.fade_element(x, this.FADE_FPS, this.FADE_DURATION, this.FADE_COLOR);
  },
  
  addBookmarkBar : function () {
    var c = document.getElementById('content');
    var d = document.createElement('div');
    
    d.id = 'quicksubmit-bookmarks';
    d.className = 'section bmb';
    
    c.insertBefore(d, c.firstChild);
    
    return d;
  },
  
  updateBookmarkBar : function () {
    var d = document.getElementById('quicksubmit-bookmarks') || this.addBookmarkBar();
    var self = quickSUBMIT;
    
    // innerHTML is bad, but I'm lazy, and work when lazy is more bad, so:
    d.innerHTML = ['<style>.bmb a{display:block;} .bmb .l{float:left;} .bmb .r{float:right;} .bmb .m{margin:2px 2px;} .bmb .p{cursor:pointer;}</style><h2 class="section-head">Los Nifty Bookmarkos!</h2><div class="section-block trailing"><ul class="beacon bmb">', self.getBookmarkbarItems(), '</ul></div>'].join('');
  },
  
  getBookmarkbarItems : function () {
    var items = '';
    var records = this.loadBookmarks();
    if (!records.length) return '<li style="text-align:center;"><b>No bookmarks added yet.</b><br>Choose a section, then click the \'Add Bookmark\' button next to the section name to bookmark it.</li>';
    
    var t = [];
    var i = 0;
    var cs, rs;
    for (var x in records) {
      rs = records[x];
      cs = (i%2?'even':'odd');
      if (0==i) cs = 'first '+cs;
      
      t.push(['<li id="qsi-', rs[0], '" class="', cs, '"><a class="l m" href="', rs[3], '"><img src="', rs[1], '"/></a><img class="r m p" title="Remove from bookmarks" onclick="removeBookmark(',rs[0],')" src="', this.IMG_REMOVE, '"/><a href="http://www.deviantart.com/submit/step2?devcatid=', rs[0], '">', rs[2], '</a></li>'].join(''));
      
      i++;
    }
    
    return t.join('');
  },
  
  handle : function (step) {
    var u = this.getUsername();
    if (!u) return; // actually not needed because of determineStep
    var c = document.getElementById('content');
    
    switch (step) {
      // Step 1
      case 1:
        // Remove unneeded types
        var lis = c.getElementsByTagName('li');
        var re = new RegExp(['^(',this.STEP_ONE_KEEP.join('|'),')'].join(''));
        
        for (var i = 0, li; li = lis[i]; i++) {
          if (!li.textContent.match(re))
            this.removeNode(li);
        }
        
        // Double-click proceeds
        var f = c.getElementsByTagName('form')[0];
        ForEachItem(
          f.getElementsByTagName("label"),
          function (x) { x.addEventListener('dblclick', function() { f.submit(); }, false); }
        );

        break;
        
      case 2:
        // Double-click proceeds
        var f = c.getElementsByTagName('form')[0];
        ForEachItem(
          f.getElementsByTagName("label"),
          function (x) { x.addEventListener('dblclick', function() { f.submit(); }, false); }
        );
        // Remove description
        //this.removeNode(document.getElementById('submission-description'));  // XXX this breaks the event hook, but I don't care
        break;
        
      case 3:
        // Remove yadda-yadda
        // XXX TODO
        break;
      
      // Step 2
      case 4:
        // Category selected -- add "Bookmark" button
        var x = this.xpath("id('content')/FORM[1]/DIV[1]/DIV[1]/DL[1]/DD[1]", document, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        var d = document.createElement('div');
        var b = document.createElement('input');
        
        b.type = 'button';
        b.className = 'button';
        b.value = 'Bookmark';
        b.title = 'Add to quickSUBMIT bookmarks';
        //b.href = '#';
        { var self = this;
          b.onclick = function(){ self.addBookmark(x); return false; };
        }; // Closures are the Yin and the Yang
        
        d.style.display = 'block';
        d.style.marginRight = '-2px';
        d.style.cssFloat = 'right'; // the float yanks the block box. bling bling.
        d.appendChild(b);
        
        x.parentNode.insertBefore(d, x.previousSibling);
        
        break;
    }

    if (step)
      this.updateBookmarkBar();
  },
  
  determineStep : function () {
    var c = document.getElementById('content');
    var f = c.getElementsByTagName('form')[0];
    var h = f.getElementsByTagName('h2')[0] || f.getElementsByTagName('h3')[0];
    
    // Step 1.1: Choose what you want to submit
    if (h.textContent == 'Deviation Submission, Step 1' && f.name == 'galform') return 1;
      
    // Step 1.2: Choose category
    if (h.textContent == 'Deviation Submission, Step 1') return 2;
    
    // Step 1.3: Confirm category
    if (h.textContent == 'Gallery Description') return 3;
    
    // Step 2
    if (h.textContent == 'Deviation Submission, Step 2') return 4;
    
    return void(0);
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
    
    var step = this.determineStep();
    if (step) this.handle(step);
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

/*
 * Fat (Fade Anything Technique) is ÃÂ© 2005 Adam Michela <http://www.axentric.com/posts/default/7>
 * Licensed under Creative Commons Share-Alike 2.0
 *
 * Changes ÃÂ© 2005 Matthias Bauer <http://moeffju.net/>
 */
var Fat = {
  make_hex : function (r,g,b) 
  {
    r = r.toString(16); if (r.length == 1) r = '0' + r;
    g = g.toString(16); if (g.length == 1) g = '0' + g;
    b = b.toString(16); if (b.length == 1) b = '0' + b;
    return "#" + r + g + b;
  },
  
  fade_element : function (elem, fps, duration, from, to) 
  {
    if (!fps) fps = 30;
    if (!duration) duration = 3000;
    if (!from || from=="#") from = "#FFFF33";
    if (!to) to = this.get_bgcolor(elem);
    
    var frames = Math.round(fps * (duration / 1000));
    var interval = duration / frames;
    var delay = interval;
    var frame = 0;
    
    if (from.length < 7) from += from.substr(1,3);
    if (to.length < 7) to += to.substr(1,3);
    
    var rf = parseInt(from.substr(1,2),16);
    var gf = parseInt(from.substr(3,2),16);
    var bf = parseInt(from.substr(5,2),16);
    var rt = parseInt(to.substr(1,2),16);
    var gt = parseInt(to.substr(3,2),16);
    var bt = parseInt(to.substr(5,2),16);
    
    var r,g,b,h;
    var fa = [];
    while (frame < frames)
    {
      r = Math.floor(rf * ((frames-frame)/frames) + rt * (frame/frames));
      g = Math.floor(gf * ((frames-frame)/frames) + gt * (frame/frames));
      b = Math.floor(bf * ((frames-frame)/frames) + bt * (frame/frames));
      h = this.make_hex(r,g,b);
      
      fa.push(h);
      
      frame++;
    }
    fa.push(to);
    setTimeout(function() { Fat.update_fade(elem, delay, fa); }, delay);
  },
  
  update_fade : function (elem, delay, fa)
  {
    Fat.set_bgcolor(elem, fa.shift());
    if (fa.length)
      setTimeout(function() { Fat.update_fade(elem, delay, fa); }, delay);
  },
  
  set_bgcolor : function (o, c)
  {
    o.style.backgroundColor = c;
  },
  
  get_bgcolor : function (o)
  {
    while (o) {
      var c;
      if (window.getComputedStyle) c = window.getComputedStyle(o,null).getPropertyValue("background-color");
      if (o.currentStyle) c = o.currentStyle.backgroundColor;
      if ((c != "" && c != "transparent") || o.tagName == "BODY") { break; }
      o = o.parentNode;
    }
    if (c == undefined || c == "" || c == "transparent") c = "#FFFFFF";
    var rgb = c.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
    if (rgb) c = this.make_hex(parseInt(rgb[1]),parseInt(rgb[2]),parseInt(rgb[3]));
    return c;
  }
};

if (!window.NoticeHandler || (window.NoticeHandler && parseFloat(window.NoticeHandler.VERSION) < parseFloat(NoticeHandler.VERSION)))
  window.NoticeHandler = NoticeHandler;

window.Fat = Fat;

window.removeBookmark = quickSUBMIT.removeBookmark;

quickSUBMIT.init();

})();
