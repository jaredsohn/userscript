// ==UserScript==
// @name           HatenaBottoleViewer
// @namespace      www.nakarika.com/hatena/bottle
// @include        http://bottle.hatelabo.jp/
// @version        0.01
// @author         reedom <fujinaka.tohru@gmail.com>
// @description    Hatena Bottle Viewer.
// @todo           enable user to modify configuration via browser and persist them.
// @comment        I've been burn out; anyone update this script, please. ;-)
// ==/UserScript==

function jQueryLoader() { this.initialize.apply(this, arguments); };
var Util = {
  bind: function() {
    if (arguments.length < 3 && arguments[1] === undefined) return arguments[0];
    var args = Util.toArray(arguments), __method = args.shift(), object = args.shift();
    return function() {
      return __method.apply(object, args.concat(Util.toArray(arguments)));
    }
  },

  toArray: function(iterable) {
    if (!iterable) return [];
    var length = iterable.length || 0, results = new Array(length);
    while (length--) results[length] = iterable[length];
    return results;
  },

  extend: function(dist, source) {
    for (var property in source) {
      if(dist == source[property]) continue;
      if(source[property] !== undefined) dist[property] = source[property];
    }
    return dist;
  },

  each: function(iteratorable, iterator) {
    if(iteratorable.length === undefined)
      for(var i in iteratorable) iterator.call( iteratorable[i], i, iteratorable[i] );
    else
      for(var i = 0, l = iteratorable.length, val = iteratorable[0];
        i < l && iterator.call(val,i,val) !== false; val = iteratorable[++i] );
  },

  map: function(elems, callback) {
    var ret = [];
    for(var i=0,l=elems.length; i<l; i++) {
      var value = callback(elems[i], i);
      if(value !== null && value != undefined) {
        if(value.constructor != Array) value = [value];
        ret = ret.concat(value);
      }
    }
    return ret;
  },

  parseQueryString: function(str) {
    var memo = str.split('&');
    for(var i=0,obj={},l=memo.length; i<l; i++) {
      var pair = memo[i];
      if((pair = pair.split('='))[0]) {
        var name = decodeURIComponent(pair[0]);
        var value = pair[1] ? decodeURIComponent(pair[1]) :undefined;
        if(obj[name] !== undefined) {
          if(obj[name].constructor != Array) obj[name] = [obj[name]];
          if(value) obj[name].push(value);
        } else {
          var dummy = parseInt(new Number(value), 10);
          obj[name] = isNaN(dummy) ? value : dummy;
        }
      }
    }
    return obj;
  },

  periodicalExecuter: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;
    Util.extend(this, {
      registerCallback: function() {
        this.timer = setInterval(Util.bind(this.onTimerEvent, this), this.frequency * 1000);
      },

      execute: function() {
        this.callback(this);
      },

      stop: function() {
        if (!this.timer) return;
        clearInterval(this.timer);
        this.timer = null;
      },

      onTimerEvent: function() {
        if (!this.currentlyExecuting) {
          try {
            this.currentlyExecuting = true;
            this.execute();
          } finally {
            this.currentlyExecuting = false;
          }
        }
      }
    });

    this.registerCallback();
  }
};

jQueryLoader.prototype = {
  cacheName: 'jQuery.Libraries',
  namespace: 'jQueryLoader',

  initialize: function(jquery, plugins) {
    this.jquery = jquery;
    this.plugins = plugins || [];
    this.downloaded = 0;
    this.permanents = eval(GM_getValue(this.cacheName, '({})'));
  },

  load: function(callback) {
    if(typeof callback != 'function') return;
    this.callback = callback;
    this._load(this.jquery);
    Util.each(this.plugins, Util.bind(function(i,lib) { this._load(lib); }, this));
    this.eval();
  },

  _load: function(lib) {
    lib.version = lib.version ? lib.version : '1.0';
    if(!this.permanents[lib.name] || !this.permanents[lib.name].script ||
       this.permanents[lib.name].version &&
       this.compareVersion(this.permanents[lib.name].version, lib.version) < 0) {
      if(!this.permanents[lib.name]) this.permanents[lib.name] = {};
      Util.extend(this.permanents[lib.name], lib);
      var self = this;
      GM_xmlhttpRequest({
        method: 'GET',
        url: this.permanents[lib.name].url,
        onload: function(res) {
          self.permanents[lib.name].script = encodeURI(res.responseText);
          GM_setValue(self.cacheName, self.permanents.toSource());
          self.downloaded++;
        },
        onerror: function(res) { GM_log(res.status + ':' + res.responseText); }
      });
    } else { this.downloaded++; }
  },

  eval: function() {
    if(this.plugins.length + 1 == this.downloaded) {
      this.insert(this.permanents['jQuery'].script);
      if(!unsafeWindow.__jQuery) unsafeWindow.__jQuery = {};
      this.insert("__jQuery['" + this.namespace + "'] = jQuery.noConflict(true);");
      var plugins = Util.map(this.plugins, Util.bind(function(plugin) {
        return this.permanents[plugin.name].script;
      }, this)).join("\n");
      this.insert([
        '(function(jQuery,$) {', plugins, "})(__jQuery['",
        this.namespace, "'],__jQuery['", this.namespace, "']);"
      ].join(''));
      this.wait();
    } else {
      setTimeout(Util.bind(function() { this.eval(); }, this), 10);
    }
  },

  wait: function() {
    if(unsafeWindow.__jQuery && unsafeWindow.__jQuery[this.namespace] &&
       unsafeWindow.__jQuery[this.namespace]().jquery == this.permanents['jQuery'].version) {
      this.callback(unsafeWindow.__jQuery[this.namespace]);
    } else {
      setTimeout(Util.bind(function() { this.wait(); }, this), 10);
    }
  },

  insert: function(script) {
    var lib = document.createElement('script');
    lib.setAttribute('type', 'text/javascript');
    lib.appendChild(document.createTextNode(decodeURI(script)));
    document.getElementsByTagName('head')[0].appendChild(lib);
  },

  compareVersion: function(current, latest) {
    var delta = 0;
    var curr = current.split('.');
    var ltst = latest.split('.');
    for(var i=0, len = curr.length >= ltst.length ? curr.length : ltst.length; i<len; i++) {
      var curr_num = parseInt(curr[i], 10);
      var ltst_num = parseInt(ltst[i], 10);
      if(isNaN(ltst_num) || curr_num > ltst_num) {
        delta = 1;
        break;
      } else if(isNaN(curr_num) || curr_num < ltst_num) {
        delta = -1;
        break;
      }
    }
    return delta;
  }
};

var loader = new jQueryLoader({
    name: 'jQuery',
    version: '1.2.6',
    url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js'
});

loader.load(function($) {

  var config = {
    // maximum count of entries in the browser page.
    maxEntries: 50,
    // delay time, in second, to fetch new html content from the server.
    fetchInterval: 180,
    // delay time, in second, to insert a new entry into the browser page.
    updateInterval: 30
  };

  var updator = {
    timer_id: undefined,

    start: function() {
      if (this.timer_id) return;

      // publish a new entry instead of starting timer.
      // if there are some new entries left, then start the updating timer.
      if (0 < entryManipulator.publishNewEntry()) {
        this._startTimer();
      }
    },

    restart: function() {
      this.stop();
      this._startTimer();
    },

    stop: function() {
      if (this.timer_id) {
        clearInterval(this.timer_id);
        this.timer_id = undefined;
      }
    },

    _startTimer: function() {
      this.timer_id = setInterval(this._insertOne, config.updateInterval * 1000);
    },

    _insertOne: function() {
      if (!entryManipulator.publishNewEntry()) {
        this.stop();
      }
    }
  };

  var entryRetriever = {
    timer_id: undefined,
    lastDate: undefined,

    start: function() {
      if (this.timer_id) return;
      this.timer_id = setInterval(this.fetchMessages, config.fetchInterval * 1000);
    },

    restart: function() {
      this.stop();
      this.start();
    },

    stop: function() {
      if (this.timer_id) {
        clearInterval(this.timer_id);
        this.timer_id = undefined;
      }
    },

    fetchMessages: function() {
      var self = this;
      $.ajax({
        url: location.href,
        dataType: 'html',
        cache: false,
        //ifModified: true,          // unusable; will be set only unix origin time (1970-01-01 ...)
        beforeSend: function(xhr) {
          if (self.lastDate) {
            xhr.setRequestHeader('If-Modified-Since', self.lastDate);
          }
        },
        complete: function(xhr) {
          // cache the receive date for the next request.
          self.lastDate = xhr.getResponseHeader('Date') || self.lastDate;
        },
        success: function(html) {
          if (entryManipulator.mergeMessages(html)) {
            updator.start();
          }
        }
      });
    }
  };

  var entryManipulator = {  
    visibleEntries: undefined,
    newEntries: { orders: [], contents: new Object() },

    initialize: function() {
      this.visibleEntries = this._parseEntries($());
    },

    _parseEntries: function(html) {
      var orders = [];
      var contents = new Object();
      $('div.entry', html).each(function() {
        var $elm = $(this);
        var eid = $elm.find('a.hatena-star-uri').attr('href');
        if (eid) {
          orders.unshift(eid);
          contents[eid] = $elm.add($elm.next());
        }
      });
      return contents ? { orders: orders, contents: contents } : undefined;
    },

    // parse new entries from HTML, then merge them to `newEntries'.
    // return: count of new entries found in HTML.
    mergeMessages: function(html) {
      var entries = this._parseEntries(html);
      if (!entries) return 0;

      var addedCount = 0;
      var orders = entries.orders;
      var contents = entries.contents;
      var end = orders.length;
      for (var i = 0; i < end; ++i) {
        var eid = orders[i];
        if (this.visibleEntries.contents[eid]) continue;
        this.newEntries.orders.push(eid);
        this.newEntries.contents[eid] = contents[eid];
        ++addedCount;
      }
      return addedCount;
    },

    // insert a new entry at the top of browser page.
    // return: count of rest of new entries.
    publishNewEntry: function() {
      // pop a new entry from `this.newEntries'.
      var eid = this.newEntries.orders.shift();
      if (!eid) return 0;
      var content = this.newEntries.contents[eid];
      delete this.newEntries.contents[eid];

      // add the new entry to `this.visibleEntries'.
      this.visibleEntries.orders.push(eid);
      this.visibleEntries.contents[eid] = content;

      // if there are more entry count than `config.maxEntries' in `this.visibleEntries',
      // remove them from `this.visibleEntries' and the browser page.
      while (config.maxEntries < this.visibleEntries.orders.length) {
        var oldEid = this.visibleEntries.orders.shift();
        var oldContent = this.visibleEntries.contents[oldEid];

	// fade out and remove the content.
	// at first I tried to do it with this code:
        //  oldContent.fadeOut(1000, function() { $(this).remove(); });
	// however, it caused an error in jQuery library, like 
	// options.easing is not a function - I think it passes a exact
	// function, though.
	// so I wrote an alternative code: fade out first, then remove
        // later. 
	if (oldContent) {
	  oldContent.fadeOut('slow'); // fade out first
          delete this.visibleEntries.contents[oldEid];
        }
      }
      $('div.entry:hidden').remove(); // remove later
                                      // (animating content is not hidden yet)

      // display the new entry in the browser page
      $('div.entry:first').before(content);
      $('div.entry:first').hide().slideDown('slow');

      return this.newEntries.orders.length;
    }
  };

  function initialize() {
    //$('ul.menu>li:first').prepend('<input type="button" name="refresh" value="refresh" id="gmhbv_refresh"/>');
    //$('#gmhbv_refresh').click(entryRetriever.fetchMessages);
    entryManipulator.initialize();
    entryRetriever.start();
  }

  initialize();
});
