// ==UserScript==
// @name          dynamicRATING
// @namespace     net.moeffju.dA.dynamicRATING
// @description	  Make comment ratings dynamic
// @include       http://forum.deviantart.com/*
// @include       http://*.deviantart.com/journal/forum/*
// ==/UserScript==

// ÃÂ© 2005 Matthias Bauer <http://moeffju.deviantart.com/>
// 
// See: http://moeffju.net/dA/hack/js/dynamicRATING/

/* 
  Version 0.91
  ============
  
  0.9 -> 0.91
    - Fixed forum ratings

  0.81 -> 0.9
    - Now works in user forums
  
  0.8 -> 0.81
    - Version checker was too sophisticated to handle its own sophistication (304 triggered error)

  0.7 -> 0.8
    - Fixed display bug introduced in 0.7
    - Changed fade color to white (like EasyReply)
    - Fixed fading to wrong color if two request were made quickly after each other
    - Real version checker
  
  0.61 -> 0.7
    - Added ability to 0-rate comments for admins
    - Fixed a bug when unrating an already unrated comment

  0.6 -> 0.61
    - Fixed a bug with updating existant rating headers

  0.5 -> 0.6
    - Using ref=xml
    - Fixed the gap after script-added Rating-header
    - NoticeHandler: remove old notices from the DOM

  0.4 -> 0.5
    - Using NoticeHandler
    - Better OOP :)
    - Various small changes
  
  0.3 -> 0.4
    - Titles for stars
    - Fixed rating header generation (though there still is a gap)
    - Basic version checking
  
  0.2 -> 0.3
    - Slowed down yellow fade a little (1500 -> 1750)
    - Show pointer cursor over stars
    - Lower stars opacity when unhovered
  
  0.1 -> 0.2
    - Add Rating header if none exists
    - Added yellow fade
  
  0.1
   - First release

*/

(function() {

/*
 * dynamicRATING is ÃÂ© 2005 Matthias Bauer <http://moeffju.net/>
 * Licensed under the GNU General Public License, version 2 (and no later version)
 */
var dynamicRATING = {

  SCRIPT_NAME : 'dynamicRATING',
  SCRIPT_URL : 'http://moeffju.net/dA/hack/js/dynamicRATING/',
  
  UPDATE_URL : 'http://moeffju.net/dA/hack/js/update',
  VERSION : '0.91',
  
  TITLES : ['No rating', '0 - Hide', '1 - Bad', '2', '3 - Ok', '4', '5 - Good'],
  
  OPACITY_INACTIVE : '.55',
  OPACITY_ACTIVE : '.999',

  FADE_FPS : 30,
  FADE_DURATION : 1600,
  FADE_COLOR : '#FFFFFF',
  FADE_BG : '#FF0000',
  
  STAR_EMPTY : 'data:image/gif;base64,R0lGODlhEQAQANUgAGRkZGVlZV1dXWdnZ2hoaIeHh2xsbH9%2Ff4qKind3d5CQkJGRkYaGhm1tbVpaWmpqaoiIiFtbW4GBgWZmZnh4eJSUlHt7e2lpaVxcXG9vb4mJiY%2BPj2BgYJKSkoyMjGJiYpqkmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAARABAAAAZwQJBwKPwQj8iPx4hsKplNopKzjEo9gurxw%2B16HALAsuv1mL%2BRT0B8rioDggjmM7gQCI%2BEFvQGAAYPGRQSGntFHgMEDQkHCAuGQ0oGBxAeG5CHExYdFQsKDJhKDQpnCAWQkqBeEKdQfGZckUqorrJDQQA7',
  STAR_FULL : 'data:image/gif;base64,R0lGODlhEQAQANUlAPXzAP%2F%2Flf%2F%2FrP39APb0APr5AP%2F%2Fpf%2F%2FlObhAOfjAOnlAP%2F%2FBP%2F%2FWP%2F%2Fqvv6AO3pAP%2F%2FMf%2F%2FsezpAP%2F%2FSvf1AP%2F%2FDPz8AOjjAPPwAPDtAP%2F%2FBv%2F%2FUv%2F%2FF9jRAP%2F%2FFv%2F%2FA%2F%2F%2FAv%2F%2FkNbOAO6YMrxmAJqkmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAARABAAAAZswJJwKCQRj0jSyIhsKplNovKwjEpHoeqRxO2OBAHAsusdmUcRwQREOZuNSkagYdhwKhZMQqQtKQELEB4aAxkifFBFIw8FAw4EHYhOIwQSCgiSSSMfh52ZVxd8Zod9iqJln35vUFxvW4lDXENBADs%3D',
  RECTUM : 'data:image/gif;base64,R0lGODlhDwAPAPcAAAAAABolGh0oHR4pHiUwJScyJzE8MTI9MjI%2BMjRANDdCNzlEOUJNQkRPREdSR0hTSElUSUxWTExYTFBaUFNfU1VfVVhkWFplWlpmWltmW1xmXGBrYGFtYWJtYmVvZWhzaGp1amp2am14bW96b297b3B7cHF8cXR%2FdHSAdHiEeHqFenuFe3yGfH6Jfn%2BJf4CKgIKNgoOOg4SPhIiUiIqVioqWioyXjI6Yjo%2Baj5GbkZGckf%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADsALAAAAAAPAA8AAAiyAHcIFAgAwI6CAxMeBMCAAQAFBRAmBDChQoQJFCo0MBDAIEELJ1RcuADAAwYJCwh4BACihgoPBQGUCJHB4cEJJFSIQFgwhYkOJAFEuLDBw4iYLVr4%2FFCQwYQLH0ywAABDBgylRxlO2BACBQsYOW7QUGqioAIIF7pOzaHDRowURw8mcKBhRAoAOHDMeIFi5QAEDziUALDChQsUcQkKOAChAwAUKEwkHlgwQcwQEhUu3JwwIAA7',
  UNRATED : 'data:image/gif;base64,R0lGODlhDwAPAOZdAP%2FGAP%2FFAf%2BZDf%2BWDv%2BUDv%2BgC%2F%2BaDf%2BcDP%2B2Bf%2ByBv%2BqCP%2FBAv%2BdDP%2FCAf%2B6BP%2FEAf%2BhC%2F%2B%2FBv%2BtJf%2BlEf%2B5B%2F%2BQIP%2BxCf%2B9Cf%2BsJv%2B9A%2F%2B2L%2F%2BhDP%2BlC%2F%2BVAP%2BVDv%2FGS%2F%2BmCf%2BzBv%2BTAP%2BrCP%2BnCf%2B8A%2F%2FCAv%2BYDf%2BoCf%2FGT%2F%2BRAf%2BbDf%2BfC%2F%2FBA%2F%2FDBv%2FEBP%2B%2BMP%2B7Bf%2B%2BA%2F%2BmF%2F%2BpCf%2BzMv%2B0LP%2BTD%2F%2B2HP%2BxBv%2FCTf%2B2O%2F%2B%2FAv%2FBCP%2BkCv%2FDKP%2BQAf%2FARv%2B3Bf%2FAFP%2B9RP%2FDAf%2BUAP%2B1Bv%2BuB%2F%2BeDP%2BOAv%2BvB%2F%2BSD%2F%2FCDv%2BqEv%2BlCf%2BtB%2F%2FEOP%2BgDv%2BkC%2F%2BXDf%2BeDf%2B7Ef%2FACv%2BuDv%2B1DP%2BiCv%2FHAAAAAPLy8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAF0ALAAAAAAPAA8AAAeigF2CglyFhYOIXYVbWwABDYeIXIyNDw08JQ5cg5NbHUYiLSpASggJm4qMAS89VxcURzlIm5OOLoU%2FhRZQCiCFAA8mTYUfhVg0T1qFRQsRQ1EpOkQ2TlMQSYULMjFWMEEVOxITBQwGhRkOQlk4GjUYM1IHAgO0CCGG%2BPOoXAlLIygcNlRZccLDDVSKFJDwQc4AFQJMEBLiwkLeAAKREinClygQADs%3D',
  
  IS_ADMIN: false,
  
  xpath : function (query, contextNode, resultType) {
    return document.evaluate(query, contextNode, null, resultType, null);
  },
  
  getImage : function (i, n) {
    switch (i) {
      case -1:  return this.UNRATED;
      case 0:   return this.RECTUM;
      default:  return (i <= n ? this.STAR_FULL : this.STAR_EMPTY);
    }
  },
  
  createDynamicRating : function (item) {
    var ext = this.xpath(".//span[@class='ext']", item, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    if (!ext) return; // own posts can't be rated
    var select = ext.getElementsByTagName('select')[0];
    if (!select) return; // can't be rated (not a forum post?)
    var button = ext.getElementsByTagName('input')[0];
    var n = select.value; // -1 .. 5
    
    this.IS_ADMIN = (7 == select.options.length); // admins get 6 options (-1 .. 5)
    
    item.initialRating = n;
    
    select.style.display = 'none';
    button.style.display = 'none';

    for (var i = -1; i <= 5; i++) {
      var img = document.createElement('img');
      
      img.src = this.getImage(i, n);
      if (-1 == i) {
        img.style.paddingRight = '4px';
        img.style.borderRight = '1px solid black';
      }
      else if (0 == i) {
        img.style.paddingLeft = '4px';
      }
      else {
        img.style.paddingLeft = (1 == i ? '4px' : '1px');
        img.style.paddingRight = '1px';
      }
      img.value = i;
      img.title = this.TITLES[i + 1];
      
      img.style.cursor = 'pointer';
      img.style.opacity = this.OPACITY_INACTIVE;
      
      img.onclick = this.ratingClicked;
      img.onmouseover = this.mouseOver;
      img.onmouseout = this.mouseOut;
      
      if (0 != i || this.IS_ADMIN)
        select.parentNode.insertBefore(img, null);
    }
  },
  
  mouseOver : function (e) {
    var t = e.target;
    var imgs = t.parentNode.getElementsByTagName('img');
    var before = true;
    
    var self = dynamicRATING;
    
    t.style.opacity = self.OPACITY_ACTIVE;
    
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = self.getImage(imgs[i].value, (before ? imgs.length : 0));
      if (imgs[i] == t) before = false;
    }
  },
  
  mouseOut : function (e) {
    var t = e.target;
    var n = t.parentNode.getElementsByTagName('select')[0].value;
    var imgs = t.parentNode.getElementsByTagName('img');
    
    var self = dynamicRATING;
    
    t.style.opacity = self.OPACITY_INACTIVE;
    
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = self.getImage(imgs[i].value, n);
    }
  },
  
  ratingClicked : function (e) {
    var t = e.target;
    var select = t.parentNode.getElementsByTagName('select')[0];
    
    //select.oldValue = select.value;
    select.value = t.value;
    dynamicRATING.sendNewRating(select, t.value);
  },
  
  ratingSent : function (item, rating) {
    var hdrs = this.xpath(".//div[contains(@class,'item-head')]/strong", item, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    
    if (hdrs.snapshotLength == 3) { // Rating already exists
      var ratingHdr = hdrs.snapshotItem(2);
      var ratingText = ratingHdr.nextSibling;
      var rdat = ratingText.textContent.replace(/\s/g,'').split('/');  // rdat = [ rating, #ratings ]
      
      rdat[0] = parseFloat(rdat[0]);
      rdat[1] = parseInt(rdat[1]);
      rating = parseInt(rating);
      
      if (item.initialRating == -1) {
        rdat[0] = ((rdat[0] * rdat[1]) + rating) / (rdat[1] + 1);
        rdat[1]++;
      } else {
        if (rating == -1) {
          rdat[0] = ((rdat[0] * rdat[1]) - item.initialRating) / (rdat[1] - 1);
          rdat[1]--;
        } else if (rating == 0) {
          rdat[1]++;
        } else {
          rdat[0] = ((rdat[0] * rdat[1]) - item.initialRating + rating) / rdat[1];
        }
      }
    } else {
      var ratingHdr = document.createElement('strong');
      var ratingText = document.createTextNode('');
      var rdat = [parseFloat(rating), 1];
      if (rating == -1) rdat = [-1, 0];
      
      var t = hdrs.snapshotItem(1);
      
      ratingHdr.textContent = 'Rating:';
      t.parentNode.insertBefore(ratingHdr, null);
      t.parentNode.insertBefore(ratingText, null);
      t.parentNode.insertBefore(document.createElement('br'), null);
      t.parentNode.style.height = 'auto';
    }
    item.initialRating = rating;

    var item_head = ratingHdr.parentNode;
    Fat.fade_element(item_head, this.FADE_FPS, this.FADE_DURATION, this.FADE_COLOR, this.FADE_BG);
    
    if (rdat[1] == 0) {
      ratingHdr.parentNode.removeChild(ratingHdr);
      ratingText.parentNode.removeChild(ratingText);
    } else {
      ratingText.textContent = ' ' + (Math.round(rdat[0] * 100) / 100).toFixed(2) + ' / ' + rdat[1];
    }
  },
  
  sendNewRating : function (select, value) {
    var self = this;
    var forum = document.location.href.match(/^http:\/\/forum\.deviantart\.com\//);
    var threadid = document.getElementsByName('threadid')[0].value;
    var ref, url, data;
    
    if (forum) {
      ref = 'xml';
      url = 'http://forum.deviantart.com/rate';
    } else {
      ref = 'http://moeffju.deviantart.com/';
      url = document.location.href.replace(/(^http:\/\/[^\.]*\.deviantart\.com\/).*/, '$1journal/forum/rate');
    }
    data = ['ref='+encodeURIComponent(ref), 'threadid='+encodeURIComponent(threadid), encodeURIComponent(select.name)+'='+encodeURIComponent(value)].join('&');
    
    GM_xmlhttpRequest({
      method: 'POST',
      url: url,
      headers: {
        'User-Agent': navigator.userAgent + ' Greasemonkey (dynamicRATING)',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
      onload: function(response) {
        if (response.status == 200) {
          self.ratingSent(select.parentNode.parentNode.parentNode /* the item */, value);
        } else {
          NoticeHandler.displayNotice(
            'HTTP Request failed with status <b>' + response.status + ' ' + response.statusText + '</b><br/>\n\n',
            '#ff8080', '#ff0000', 20, 0.001);
        }
      }
    });
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
        }
        else {
          NoticeHandler.displayNotice(
            'Update check failed with status <b>' + response.status + ' ' + response.statusText + '</b><br/>\n\n'+
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
    if (!GM_xmlhttpRequest) {
      NoticeHandler.displayNotice(
        'dynamicRATING needs <a href="http://greasemonkey.mozdev.org/"><b>Greasemonkey 0.3.3</b></a> or higher.<br/>\n'+
        '<a style="display:block;" href="http://greasemonkey.mozdev.org/"><b>Greasemonkey Home Page</b></a>',
        '#ff8080', '#ff0000', 50, 0.001);
      return;
    }
    
    this.checkVersion();
    
    this.FADE_BG = Fat.get_bgcolor(this.xpath("//div[@class='item-head']", document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0));
    
    var items = this.xpath("//div[@class='item']", document, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
    var ref = document.getElementsByName('ref')[0];
    var threadid = document.getElementsByName('threadid')[0];
    var item;
    var i;
    
    for (i = 0; (item = items.snapshotItem(i)); ++i) {
      this.createDynamicRating(item);
    }
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

dynamicRATING.init();

})();
