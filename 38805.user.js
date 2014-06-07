// ==UserScript==
// @name	Page Scroll Marker
// @namespace	http://userscripts.org/users/mstm
// @description	Adds translucent bars to the top and bottom of the viewport, which indicates the previous viewport position when the page is scrolled. This tool will prevents you from getting lost when you press the Page Up/Down keys.
// @version	0.9
// @include	*
// @grant	GM_addStyle
// @grant	GM_getValue
// @grant	GM_setValue
// ==/UserScript==

(function () {
  if (document.designMode == 'on' || document.body instanceof HTMLFrameSetElement || document.URL.indexOf(location.protocol) != 0) return;

  const generalName = GM_info.script.name;
  const containerID = GM_info.script.namespace.concat(generalName).replace(/\W/g, '');

  GM_addStyle('.' + containerID + ' { display: none !important; background: transparent !important; border: none !important; } .' + containerID + '.active { display: block !important; } .' + containerID + ' div { position: absolute !important; width: 100% !important; height: 8px !important; background: #808080 !important; z-index: 65535 !important; opacity: 0.25 !important; font: 8px/1 sans-serif !important; color: #ffffff !important; text-align: center !important; border: none !important; } .' + containerID + ' div:after { content: attr(title); }');

  var ScrollNode = function (target) {
    this.initialize(target);
  };

  ScrollNode.prototype = {
    update: function () {
      clearTimeout(this.tid);
      this.lines.className = this.lines.className.replace(/\bactive\b/g, '').replace(/\s+/, ' ').replace(/^\s?(.*?)\s?$/, '$1');
      this.upper.style.top = + this.owner.scrollTop + 'px';
      this.lower.style.bottom = - this.owner.scrollTop + 'px';
    },

    scroll: function () {
      clearTimeout(this.tid);
      this.upper.style.left = this.lower.style.left = this.owner.scrollLeft + 'px';
      this.lines.className = this.lines.className.split(' ').concat('active').join(' ');
      this.tid = setTimeout((function (o, f) {
        return function () {
          f.call(o);
        };
      })(this, this.update), 1000);

      if (GM_getValue('wrap_bars', true)) {
        if (this.lower.offsetTop + this.lower.offsetHeight < this.owner.scrollTop) {
          this.upper.style.top = parseInt(this.upper.style.top) + this.owner.clientHeight + 'px';
          this.lower.style.bottom = parseInt(this.lower.style.bottom) - this.owner.clientHeight + 'px';
        }

        if (this.upper.offsetTop - this.owner.clientHeight > this.owner.scrollTop) {
          this.upper.style.top = parseInt(this.upper.style.top) - this.owner.clientHeight + 'px';
          this.lower.style.bottom = parseInt(this.lower.style.bottom) + this.owner.clientHeight + 'px';
        }
      }
    },

    initialize: function (target) {
      this.isTop = target.nodeName == document.nodeName;
      this.owner = this.isTop ? target.body : target;
      this.lines = this.owner.appendChild(document.createElement('DIV'));
      this.lines.className = containerID;
      this.lines.title = generalName;
      this.upper = this.lines.appendChild(document.createElement('DIV'));
      this.upper.title = '\u25bc';
      this.lower = this.lines.appendChild(document.createElement('DIV'));
      this.lower.title = '\u25b2';

      if (this.isTop) {
        if (document.compatMode != 'BackCompat') {
          this.owner = document.documentElement;
        }
      }
      else {
        if (document.defaultView.getComputedStyle(this.owner, null).getPropertyValue('position') == 'static') {
          this.owner.style.position = 'relative';
        }

        this.lines.addEventListener('DOMNodeRemoved', function (e) {
          ScrollNode.put(e.relatedNode);
        }, false);
        
        this.lines.addEventListener('DOMNodeRemoved', function (e) {
          e.stopPropagation();
        }, true);
      }
      
      this.update();
    }
  };

  ScrollNode.instances = {};
  ScrollNode.remaining = 10;

  ScrollNode.put = function (target) {
    if (--this.remaining < 0) {
      return this.get(document);
    }

    var s = new ScrollNode(target);
    this.instances[s.isTop ? target.nodeName : (target.id = target.id || '__id__' + (this.uid = (this.uid || 0) + 1))] = s;
    return s;
  };

  ScrollNode.get = function (target) {
    return this.instances[target.nodeName] || this.instances[target.id];
  };

  ScrollNode.put(document);

  document.addEventListener('scroll', function (e) {
    if (GM_getValue('recursive', true) && !('value' in e.target)) {
      (ScrollNode.get(e.target) || ScrollNode.put(e.target)).scroll();
    }
  }, true);

  document.addEventListener('resize', function (e) {
    for (var e in ScrollNode.instances) {
      ScrollNode.instances[e].update();
    }
  }, true);

  GM_setValue('wrap_bars', GM_getValue('wrap_bars', true));
  GM_setValue('recursive', GM_getValue('recursive', true));
})()

