// ==UserScript==
// @name           CN_Advisor
// @namespace      http://userscripts.org/users/59925
// @description    Helps
// @include        *cybernations.net/nation_drill_display.asp?Nation_ID=*
// @include        *cybernations.net/pay_bills.asp?Nation_ID=*
// @include        *cybernations.net/national_wonders_purchase.asp?Nation_ID=*
// ==/UserScript==

// Original concept by Rinkx
// Originally developed by Rinkx, TiMBuS, Vtheh
// Redesigned, and maintained by Vtheh
// Hijacked for goons by TiMBuS :D
// Re-Highjacked by Capn Henry for House of Lords and GOONS

tdcolor = "000000";



function appendToTop(html, tobottom){
  var oldtext = document.getElementById('nationmessages').innerHTML;
  if (tobottom) oldtext += '<div style="margin-top:1.5em">'+html+'</div>';
  else oldtext = '<div style="margin-bottom:1.5em">'+html+'</div>'+oldtext;
  
  document.getElementById('nationmessages').innerHTML = oldtext;
}

function InjectScriptalicious(){
  var scripts = [

//=======HERE IS PROTOTYPE:==========
/*  Prototype JavaScript framework, version 1.5.0
 *  (c) 2005-2007 Sam Stephenson
 *
 *  Prototype is freely distributable under the terms of an MIT-style license.
 *  For details, see the Prototype web site: http://prototype.conio.net/
 *
/*--------------------------------------------------------------------------*/

var Prototype = {
  Version: '1.5.0',
  BrowserFeatures: {
    XPath: !!document.evaluate
  },

  ScriptFragment: '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)',
  emptyFunction: function() {},
  K: function(x) { return x }
}

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

var Abstract = new Object();

Object.extend = function(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
  return destination;
}

Object.extend(Object, {
  inspect: function(object) {
    try {
      if (object === undefined) return 'undefined';
      if (object === null) return 'null';
      return object.inspect ? object.inspect() : object.toString();
    } catch (e) {
      if (e instanceof RangeError) return '...';
      throw e;
    }
  },

  keys: function(object) {
    var keys = [];
    for (var property in object)
      keys.push(property);
    return keys;
  },

  values: function(object) {
    var values = [];
    for (var property in object)
      values.push(object[property]);
    return values;
  },

  clone: function(object) {
    return Object.extend({}, object);
  }
});

Function.prototype.bind = function() {
  var __method = this, args = $A(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($A(arguments)));
  }
}

Function.prototype.bindAsEventListener = function(object) {
  var __method = this, args = $A(arguments), object = args.shift();
  return function(event) {
    return __method.apply(object, [( event || window.event)].concat(args).concat($A(arguments)));
  }
}

Object.extend(Number.prototype, {
  toColorPart: function() {
    var digits = this.toString(16);
    if (this < 16) return '0' + digits;
    return digits;
  },

  succ: function() {
    return this + 1;
  },

  times: function(iterator) {
    $R(0, this, true).each(iterator);
    return this;
  }
});

var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) {}
    }

    return returnValue;
  }
}

/*--------------------------------------------------------------------------*/

var PeriodicalExecuter = Class.create();
PeriodicalExecuter.prototype = {
  initialize: function(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.registerCallback();
  },

  registerCallback: function() {
    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
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
        this.callback(this);
      } finally {
        this.currentlyExecuting = false;
      }
    }
  }
}
String.interpret = function(value){
  return value == null ? '' : String(value);
}

Object.extend(String.prototype, {
  gsub: function(pattern, replacement) {
    var result = '', source = this, match;
    replacement = arguments.callee.prepareReplacement(replacement);

    while (source.length > 0) {
      if (match = source.match(pattern)) {
        result += source.slice(0, match.index);
        result += String.interpret(replacement(match));
        source  = source.slice(match.index + match[0].length);
      } else {
        result += source, source = '';
      }
    }
    return result;

  },

  sub: function(pattern, replacement, count) {
    replacement = this.gsub.prepareReplacement(replacement);
    count = count === undefined ? 1 : count;

    return this.gsub(pattern, function(match) {
      if (--count < 0) return match[0];
      return replacement(match);
    });
  },

  scan: function(pattern, iterator) {
    this.gsub(pattern, iterator);
    return this;
  },

  truncate: function(length, truncation) {
    length = length || 30;
    truncation = truncation === undefined ? '...' : truncation;
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : this;
  },

  strip: function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  },

  stripTags: function() {
    return this.replace(/<\/?[^>]+>/gi, '');
  },

  stripScripts: function() {
    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');
  },

  extractScripts: function() {
    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');
    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');
    return (this.match(matchAll) || []).map(function(scriptTag) {
      return (scriptTag.match(matchOne) || ['', ''])[1];
    });
  },

  evalScripts: function() {
    return this.extractScripts().map(function(script) { return eval(script) });
  },

  escapeHTML: function() {
    var div = document.createElement('div');
    var text = document.createTextNode(this);
    div.appendChild(text);
    return div.innerHTML;
  },

  unescapeHTML: function() {
    var div = document.createElement('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0] ? (div.childNodes.length > 1 ?
      $A(div.childNodes).inject('',function(memo,node){ return memo+node.nodeValue }) :
      div.childNodes[0].nodeValue) : '';
  },

  toQueryParams: function(separator) {
    var match = this.strip().match(/([^?#]*)(#.*)?$/);
    if (!match) return {};

    return match[1].split(separator || '&').inject({}, function(hash, pair) {
      if ((pair = pair.split('='))[0]) {
        var name = decodeURIComponent(pair[0]);
        var value = pair[1] ? decodeURIComponent(pair[1]) : undefined;

        if (hash[name] !== undefined) {
          if (hash[name].constructor != Array)
            hash[name] = [hash[name]];
          if (value) hash[name].push(value);
        }
        else hash[name] = value;
      }
      return hash;
    });
  },

  toArray: function() {
    return this.split('');
  },

  succ: function() {
    return this.slice(0, this.length - 1) +
      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);
  },

  camelize: function() {
    var parts = this.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = this.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
  },

  capitalize: function(){
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
  },

  underscore: function() {
    return this.gsub(/::/, '/').gsub(/([A-Z]+)([A-Z][a-z])/,'#{1}_#{2}').gsub(/([a-z\d])([A-Z])/,'#{1}_#{2}').gsub(/-/,'_').toLowerCase();
  },

  dasherize: function() {
    return this.gsub(/_/,'-');
  },

  inspect: function(useDoubleQuotes) {
    var escapedString = this.replace(/\\/g, '\\\\');
    if (useDoubleQuotes)
      return '"' + escapedString.replace(/"/g, '\\"') + '"';
    else
      return "'" + escapedString.replace(/'/g, '\\\'') + "'";
  }
});

String.prototype.gsub.prepareReplacement = function(replacement) {
  if (typeof replacement == 'function') return replacement;
  var template = new Template(replacement);
  return function(match) { return template.evaluate(match) };
}

String.prototype.parseQuery = String.prototype.toQueryParams;

var Template = Class.create();
Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\})/;
Template.prototype = {
  initialize: function(template, pattern) {
    this.template = template.toString();
    this.pattern  = pattern || Template.Pattern;
  },


  evaluate: function(object) {
    return this.template.gsub(this.pattern, function(match) {
      var before = match[1];
      if (before == '\\') return match[2];
      return before + String.interpret(object[match[3]]);
    });
  }
}

var $break    = new Object();
var $continue = new Object();

var Enumerable = {
  each: function(iterator) {
    var index = 0;
    try {
      this._each(function(value) {
        try {
          iterator(value, index++);
        } catch (e) {
          if (e != $continue) throw e;
        }
      });
    } catch (e) {
      if (e != $break) throw e;
    }
    return this;
  },

  eachSlice: function(number, iterator) {
    var index = -number, slices = [], array = this.toArray();
    while ((index += number) < array.length)
      slices.push(array.slice(index, index+number));
    return slices.map(iterator);
  },

  all: function(iterator) {
    var result = true;
    this.each(function(value, index) {
      result = result && !!(iterator || Prototype.K)(value, index);
      if (!result) throw $break;
    });
    return result;
  },

  any: function(iterator) {
    var result = false;
    this.each(function(value, index) {
      if (result = !!(iterator || Prototype.K)(value, index))
        throw $break;
    });
    return result;
  },

  collect: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      results.push((iterator || Prototype.K)(value, index));
    });
    return results;
  },

  detect: function(iterator) {
    var result;
    this.each(function(value, index) {
      if (iterator(value, index)) {
        result = value;
        throw $break;
      }
    });
    return result;
  },

  findAll: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (iterator(value, index))
        results.push(value);
    });
    return results;
  },

  grep: function(pattern, iterator) {
    var results = [];
    this.each(function(value, index) {
      var stringValue = value.toString();
      if (stringValue.match(pattern))
        results.push((iterator || Prototype.K)(value, index));
    })
    return results;
  },

  include: function(object) {
    var found = false;
    this.each(function(value) {
      if (value == object) {
        found = true;
        throw $break;
      }
    });
    return found;
  },

  inGroupsOf: function(number, fillWith) {
    fillWith = fillWith === undefined ? null : fillWith;
    return this.eachSlice(number, function(slice) {
      while(slice.length < number) slice.push(fillWith);
      return slice;
    });
  },

  inject: function(memo, iterator) {
    this.each(function(value, index) {
      memo = iterator(memo, value, index);
    });
    return memo;
  },

  invoke: function(method) {
    var args = $A(arguments).slice(1);
    return this.map(function(value) {
      return value[method].apply(value, args);
    });
  },

  max: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (result == undefined || value >= result)
        result = value;
    });
    return result;
  },

  min: function(iterator) {
    var result;
    this.each(function(value, index) {
      value = (iterator || Prototype.K)(value, index);
      if (result == undefined || value < result)
        result = value;
    });
    return result;
  },

  partition: function(iterator) {
    var trues = [], falses = [];
    this.each(function(value, index) {
      ((iterator || Prototype.K)(value, index) ?
        trues : falses).push(value);
    });
    return [trues, falses];
  },

  pluck: function(property) {
    var results = [];
    this.each(function(value, index) {
      results.push(value[property]);
    });
    return results;
  },

  reject: function(iterator) {
    var results = [];
    this.each(function(value, index) {
      if (!iterator(value, index))
        results.push(value);
    });
    return results;
  },

  sortBy: function(iterator) {
    return this.map(function(value, index) {


      return {value: value, criteria: iterator(value, index)};
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;

      return a < b ? -1 : a > b ? 1 : 0;
    }).pluck('value');
  },

  toArray: function() {
    return this.map();
  },

  zip: function() {
    var iterator = Prototype.K, args = $A(arguments);
    if (typeof args.last() == 'function')
      iterator = args.pop();

    var collections = [this].concat(args).map($A);
    return this.map(function(value, index) {
      return iterator(collections.pluck(index));
    });
  },

  size: function() {
    return this.toArray().length;
  },

  inspect: function() {
    return '#<Enumerable:' + this.toArray().inspect() + '>';
  }
}

Object.extend(Enumerable, {
  map:     Enumerable.collect,
  find:    Enumerable.detect,
  select:  Enumerable.findAll,
  member:  Enumerable.include,
  entries: Enumerable.toArray
});
var $A = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0, length = iterable.length; i < length; i++)
      results.push(iterable[i]);
    return results;
  }
}

Object.extend(Array.prototype, Enumerable);

if (!Array.prototype._reverse)
  Array.prototype._reverse = Array.prototype.reverse;

Object.extend(Array.prototype, {
  _each: function(iterator) {
    for (var i = 0, length = this.length; i < length; i++)
      iterator(this[i]);
  },

  clear: function() {
    this.length = 0;
    return this;
  },

  first: function() {
    return this[0];
  },

  last: function() {
    return this[this.length - 1];
  },

  compact: function() {
    return this.select(function(value) {
      return value != null;
    });
  },

  flatten: function() {
    return this.inject([], function(array, value) {
      return array.concat(value && value.constructor == Array ?
        value.flatten() : [value]);
    });
  },

  without: function() {
    var values = $A(arguments);
    return this.select(function(value) {
      return !values.include(value);
    });
  },

  indexOf: function(object) {
    for (var i = 0, length = this.length; i < length; i++)
      if (this[i] == object) return i;
    return -1;
  },

  reverse: function(inline) {
    return (inline !== false ? this : this.toArray())._reverse();
  },

  reduce: function() {
    return this.length > 1 ? this : this[0];
  },

  uniq: function() {
    return this.inject([], function(array, value) {
      return array.include(value) ? array : array.concat([value]);
    });
  },

  clone: function() {
    return [].concat(this);
  },

  size: function() {
    return this.length;
  },

  inspect: function() {
    return '[' + this.map(Object.inspect).join(', ') + ']';
  }
});

Array.prototype.toArray = Array.prototype.clone;

function $w(string){
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

if(window.opera){
  Array.prototype.concat = function(){
    var array = [];
    for(var i = 0, length = this.length; i < length; i++) array.push(this[i]);
    for(var i = 0, length = arguments.length; i < length; i++) {
      if(arguments[i].constructor == Array) {
        for(var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++)
          array.push(arguments[i][j]);
      } else {
        array.push(arguments[i]);
      }
    }
    return array;
  }
}
var Hash = function(obj) {
  Object.extend(this, obj || {});
};

Object.extend(Hash, {
  toQueryString: function(obj) {
    var parts = [];

	  this.prototype._each.call(obj, function(pair) {
      if (!pair.key) return;

      if (pair.value && pair.value.constructor == Array) {
        var values = pair.value.compact();
        if (values.length < 2) pair.value = values.reduce();
        else {
        	key = encodeURIComponent(pair.key);
          values.each(function(value) {
            value = value != undefined ? encodeURIComponent(value) : '';
            parts.push(key + '=' + encodeURIComponent(value));
          });
          return;
        }
      }
      if (pair.value == undefined) pair[1] = '';
      parts.push(pair.map(encodeURIComponent).join('='));
	  });

    return parts.join('&');
  }
});

Object.extend(Hash.prototype, Enumerable);
Object.extend(Hash.prototype, {
  _each: function(iterator) {
    for (var key in this) {
      var value = this[key];
      if (value && value == Hash.prototype[key]) continue;

      var pair = [key, value];
      pair.key = key;
      pair.value = value;
      iterator(pair);
    }
  },

  keys: function() {
    return this.pluck('key');
  },

  values: function() {
    return this.pluck('value');
  },

  merge: function(hash) {
    return $H(hash).inject(this, function(mergedHash, pair) {
      mergedHash[pair.key] = pair.value;
      return mergedHash;
    });
  },

  remove: function() {
    var result;
    for(var i = 0, length = arguments.length; i < length; i++) {
      var value = this[arguments[i]];
      if (value !== undefined){
        if (result === undefined) result = value;
        else {
          if (result.constructor != Array) result = [result];
          result.push(value)
        }
      }
      delete this[arguments[i]];
    }
    return result;
  },

  toQueryString: function() {
    return Hash.toQueryString(this);
  },

  inspect: function() {
    return '#<Hash:{' + this.map(function(pair) {
      return pair.map(Object.inspect).join(': ');
    }).join(', ') + '}>';
  }
});

function $H(object) {
  if (object && object.constructor == Hash) return object;
  return new Hash(object);
};
ObjectRange = Class.create();
Object.extend(ObjectRange.prototype, Enumerable);
Object.extend(ObjectRange.prototype, {
  initialize: function(start, end, exclusive) {
    this.start = start;
    this.end = end;
    this.exclusive = exclusive;
  },

  _each: function(iterator) {
    var value = this.start;
    while (this.include(value)) {
      iterator(value);
      value = value.succ();
    }
  },

  include: function(value) {
    if (value < this.start)
      return false;
    if (this.exclusive)
      return value < this.end;
    return value <= this.end;
  }
});

var $R = function(start, end, exclusive) {
  return new ObjectRange(start, end, exclusive);
}

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
}

Ajax.Responders = {
  responders: [],

  _each: function(iterator) {
    this.responders._each(iterator);
  },

  register: function(responder) {
    if (!this.include(responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    this.each(function(responder) {
      if (typeof responder[callback] == 'function') {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) {}
      }
    });
  }
};

Object.extend(Ajax.Responders, Enumerable);

Ajax.Responders.register({
  onCreate: function() {
    Ajax.activeRequestCount++;
  },
  onComplete: function() {
    Ajax.activeRequestCount--;
  }
});

Ajax.Base = function() {};
Ajax.Base.prototype = {
  setOptions: function(options) {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   ''
    }
    Object.extend(this.options, options || {});

    this.options.method = this.options.method.toLowerCase();
    if (typeof this.options.parameters == 'string')
      this.options.parameters = this.options.parameters.toQueryParams();
  }
}

Ajax.Request = Class.create();
Ajax.Request.Events =
  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

Ajax.Request.prototype = Object.extend(new Ajax.Base(), {
  _complete: false,

  initialize: function(url, options) {
    this.transport = Ajax.getTransport();
    this.setOptions(options);
    this.request(url);

  },

  request: function(url) {
    this.url = url;
    this.method = this.options.method;
    var params = this.options.parameters;

    if (!['get', 'post'].include(this.method)) {
      // simulate other verbs over post
      params['_method'] = this.method;
      this.method = 'post';
    }

    params = Hash.toQueryString(params);
    if (params && /Konqueror|Safari|KHTML/.test(navigator.userAgent)) params += '&_='

    // when GET, append parameters to URL
    if (this.method == 'get' && params)
      this.url += (this.url.indexOf('?') > -1 ? '&' : '?') + params;

    try {
      Ajax.Responders.dispatch('onCreate', this, this.transport);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous)
        setTimeout(function() { this.respondToReadyState(1) }.bind(this), 10);

      this.transport.onreadystatechange = this.onStateChange.bind(this);
      this.setRequestHeaders();

      var body = this.method == 'post' ? (this.options.postBody || params) : null;

      this.transport.send(body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  },

  onStateChange: function() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  },

  setRequestHeaders: function() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-Prototype-Version': Prototype.Version,
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    // user-defined headers
    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (typeof extras.push == 'function')
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  },

  success: function() {
    return !this.transport.status
        || (this.transport.status >= 200 && this.transport.status < 300);
  },

  respondToReadyState: function(readyState) {
    var state = Ajax.Request.Events[readyState];
    var transport = this.transport, json = this.evalJSON();

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + this.transport.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || Prototype.emptyFunction)(transport, json);
      } catch (e) {
        this.dispatchException(e);
      }

      if ((this.getHeader('Content-type') || 'text/javascript').strip().
        match(/^(text|application)\/(x-)?(java|ecma)script(;.*)?$/i))
          this.evalResponse();
    }

    try {
      (this.options['on' + state] || Prototype.emptyFunction)(transport, json);
      Ajax.Responders.dispatch('on' + state, this, transport, json);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      // avoid memory leak in MSIE: clean up
      this.transport.onreadystatechange = Prototype.emptyFunction;
    }
  },

  getHeader: function(name) {
    try {
      return this.transport.getResponseHeader(name);
    } catch (e) { return null }
  },

  evalJSON: function() {
    try {
      var json = this.getHeader('X-JSON');
      return json ? eval('(' + json + ')') : null;
    } catch (e) { return null }
  },

  evalResponse: function() {
    try {
      return eval(this.transport.responseText);
    } catch (e) {
      this.dispatchException(e);
    }
  },

  dispatchException: function(exception) {
    (this.options.onException || Prototype.emptyFunction)(this, exception);
    Ajax.Responders.dispatch('onException', this, exception);
  }
});

Ajax.Updater = Class.create();

Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {
  initialize: function(container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    }

    this.transport = Ajax.getTransport();
    this.setOptions(options);

    var onComplete = this.options.onComplete || Prototype.emptyFunction;
    this.options.onComplete = (function(transport, param) {
      this.updateContent();
      onComplete(transport, param);
    }).bind(this);

    this.request(url);
  },

  updateContent: function() {
    var receiver = this.container[this.success() ? 'success' : 'failure'];
    var response = this.transport.responseText;

    if (!this.options.evalScripts) response = response.stripScripts();

    if (receiver = $(receiver)) {
      if (this.options.insertion)
        new this.options.insertion(receiver, response);
      else
        receiver.update(response);
    }

    if (this.success()) {
      if (this.onComplete)
        setTimeout(this.onComplete.bind(this), 10);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create();
Ajax.PeriodicalUpdater.prototype = Object.extend(new Ajax.Base(), {
  initialize: function(container, url, options) {
    this.setOptions(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = {};
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);
  },

  updateComplete: function(request) {
    if (this.options.decay) {
      this.decay = (request.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = request.responseText;
    }
    this.timer = setTimeout(this.onTimerEvent.bind(this),
      this.decay * this.frequency * 1000);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});
function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (typeof element == 'string')
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(query.snapshotItem(i));
    return results;
  };
}

document.getElementsByClassName = function(className, parentElement) {
  if (Prototype.BrowserFeatures.XPath) {
    var q = ".//*[contains(concat(' ', @class, ' '), ' " + className + " ')]";
    return document._getElementsByXPath(q, parentElement);
  } else {
    var children = ($(parentElement) || document.body).getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
      child = children[i];
      if (Element.hasClassName(child, className))
        elements.push(Element.extend(child));
    }
    return elements;
  }
};

/*--------------------------------------------------------------------------*/

if (!window.Element)
  var Element = new Object();

Element.extend = function(element) {
  if (!element || _nativeExtensions || element.nodeType == 3) return element;

  if (!element._extended && element.tagName && element != window) {
    var methods = Object.clone(Element.Methods), cache = Element.extend.cache;

    if (element.tagName == 'FORM')
      Object.extend(methods, Form.Methods);
    if (['INPUT', 'TEXTAREA', 'SELECT'].include(element.tagName))
      Object.extend(methods, Form.Element.Methods);

    Object.extend(methods, Element.Methods.Simulated);

    for (var property in methods) {
      var value = methods[property];
      if (typeof value == 'function' && !(property in element))
        element[property] = cache.findOrStore(value);
    }
  }

  element._extended = true;
  return element;
};

Element.extend.cache = {
  findOrStore: function(value) {
    return this[value] = this[value] || function() {
      return value.apply(null, [this].concat($A(arguments)));
    }
  }
};

Element.Methods = {
  visible: function(element) {
    return $(element).style.display != 'none';
  },

  toggle: function(element) {
    element = $(element);
    Element[Element.visible(element) ? 'hide' : 'show'](element);
    return element;
  },

  hide: function(element) {
    $(element).style.display = 'none';
    return element;
  },

  show: function(element) {
    $(element).style.display = '';
    return element;
  },

  remove: function(element) {
    element = $(element);
    element.parentNode.removeChild(element);
    return element;
  },

  update: function(element, html) {
    html = typeof html == 'undefined' ? '' : html.toString();
    $(element).innerHTML = html.stripScripts();
    setTimeout(function() {html.evalScripts()}, 10);
    return element;
  },

  replace: function(element, html) {
    element = $(element);
    html = typeof html == 'undefined' ? '' : html.toString();
    if (element.outerHTML) {
      element.outerHTML = html.stripScripts();
    } else {
      var range = element.ownerDocument.createRange();
      range.selectNodeContents(element);
      element.parentNode.replaceChild(
        range.createContextualFragment(html.stripScripts()), element);
    }
    setTimeout(function() {html.evalScripts()}, 10);
    return element;
  },

  inspect: function(element) {
    element = $(element);
    var result = '<' + element.tagName.toLowerCase();
    $H({'id': 'id', 'className': 'class'}).each(function(pair) {
      var property = pair.first(), attribute = pair.last();
      var value = (element[property] || '').toString();
      if (value) result += ' ' + attribute + '=' + value.inspect(true);
    });
    return result + '>';
  },

  recursivelyCollect: function(element, property) {
    element = $(element);
    var elements = [];
    while (element = element[property])
      if (element.nodeType == 1)
        elements.push(Element.extend(element));
    return elements;
  },

  ancestors: function(element) {
    return $(element).recursivelyCollect('parentNode');
  },

  descendants: function(element) {
    return $A($(element).getElementsByTagName('*'));
  },

  immediateDescendants: function(element) {
    if (!(element = $(element).firstChild)) return [];
    while (element && element.nodeType != 1) element = element.nextSibling;
    if (element) return [element].concat($(element).nextSiblings());
    return [];
  },

  previousSiblings: function(element) {
    return $(element).recursivelyCollect('previousSibling');
  },

  nextSiblings: function(element) {
    return $(element).recursivelyCollect('nextSibling');
  },

  siblings: function(element) {
    element = $(element);
    return element.previousSiblings().reverse().concat(element.nextSiblings());
  },

  match: function(element, selector) {
    if (typeof selector == 'string')
      selector = new Selector(selector);
    return selector.match($(element));
  },

  up: function(element, expression, index) {
    return Selector.findElement($(element).ancestors(), expression, index);
  },

  down: function(element, expression, index) {
    return Selector.findElement($(element).descendants(), expression, index);
  },

  previous: function(element, expression, index) {
    return Selector.findElement($(element).previousSiblings(), expression, index);
  },

  next: function(element, expression, index) {
    return Selector.findElement($(element).nextSiblings(), expression, index);
  },

  getElementsBySelector: function() {
    var args = $A(arguments), element = $(args.shift());
    return Selector.findChildElements(element, args);
  },

  getElementsByClassName: function(element, className) {
    return document.getElementsByClassName(className, element);
  },

  readAttribute: function(element, name) {
    element = $(element);
    if (document.all && !window.opera) {
      var t = Element._attributeTranslations;
      if (t.values[name]) return t.values[name](element, name);
      if (t.names[name])  name = t.names[name];
      var attribute = element.attributes[name];
      if(attribute) return attribute.nodeValue;
    }
    return element.getAttribute(name);
  },

  getHeight: function(element) {
    return $(element).getDimensions().height;
  },

  getWidth: function(element) {
    return $(element).getDimensions().width;
  },

  classNames: function(element) {
    return new Element.ClassNames(element);
  },

  hasClassName: function(element, className) {
    if (!(element = $(element))) return;
    var elementClassName = element.className;
    if (elementClassName.length == 0) return false;
    if (elementClassName == className ||
        elementClassName.match(new RegExp("(^|\\s)" + className + "(\\s|$)")))
      return true;
    return false;
  },

  addClassName: function(element, className) {
    if (!(element = $(element))) return;
    Element.classNames(element).add(className);
    return element;
  },

  removeClassName: function(element, className) {
    if (!(element = $(element))) return;
    Element.classNames(element).remove(className);
    return element;
  },

  toggleClassName: function(element, className) {
    if (!(element = $(element))) return;
    Element.classNames(element)[element.hasClassName(className) ? 'remove' : 'add'](className);
    return element;
  },

  observe: function() {
    Event.observe.apply(Event, arguments);
    return $A(arguments).first();
  },

  stopObserving: function() {
    Event.stopObserving.apply(Event, arguments);
    return $A(arguments).first();
  },

  // removes whitespace-only text node children
  cleanWhitespace: function(element) {
    element = $(element);
    var node = element.firstChild;
    while (node) {
      var nextNode = node.nextSibling;
      if (node.nodeType == 3 && !/\S/.test(node.nodeValue))
        element.removeChild(node);
      node = nextNode;
    }
    return element;
  },

  empty: function(element) {
    return $(element).innerHTML.match(/^\s*$/);
  },

  descendantOf: function(element, ancestor) {
    element = $(element), ancestor = $(ancestor);
    while (element = element.parentNode)
      if (element == ancestor) return true;
    return false;
  },

  scrollTo: function(element) {
    element = $(element);
    var pos = Position.cumulativeOffset(element);
    window.scrollTo(pos[0], pos[1]);
    return element;
  },

  getStyle: function(element, style) {
    element = $(element);
    if (['float','cssFloat'].include(style))
      style = (typeof element.style.styleFloat != 'undefined' ? 'styleFloat' : 'cssFloat');
    style = style.camelize();
    var value = element.style[style];
    if (!value) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        var css = document.defaultView.getComputedStyle(element, null);
        value = css ? css[style] : null;
      } else if (element.currentStyle) {
        value = element.currentStyle[style];
      }
    }

    if((value == 'auto') && ['width','height'].include(style) && (element.getStyle('display') != 'none'))
      value = element['offset'+style.capitalize()] + 'px';

    if (window.opera && ['left', 'top', 'right', 'bottom'].include(style))
      if (Element.getStyle(element, 'position') == 'static') value = 'auto';
    if(style == 'opacity') {
      if(value) return parseFloat(value);
      if(value = (element.getStyle('filter') || '').match(/alpha\(opacity=(.*)\)/))
        if(value[1]) return parseFloat(value[1]) / 100;
      return 1.0;
    }
    return value == 'auto' ? null : value;
  },

  setStyle: function(element, style) {
    element = $(element);
    for (var name in style) {
      var value = style[name];
      if(name == 'opacity') {
        if (value == 1) {
          value = (/Gecko/.test(navigator.userAgent) &&
            !/Konqueror|Safari|KHTML/.test(navigator.userAgent)) ? 0.999999 : 1.0;
          if(/MSIE/.test(navigator.userAgent) && !window.opera)
            element.style.filter = element.getStyle('filter').replace(/alpha\([^\)]*\)/gi,'');
        } else if(value === '') {
          if(/MSIE/.test(navigator.userAgent) && !window.opera)
            element.style.filter = element.getStyle('filter').replace(/alpha\([^\)]*\)/gi,'');
        } else {
          if(value < 0.00001) value = 0;
          if(/MSIE/.test(navigator.userAgent) && !window.opera)
            element.style.filter = element.getStyle('filter').replace(/alpha\([^\)]*\)/gi,'') +
              'alpha(opacity='+value*100+')';
        }
      } else if(['float','cssFloat'].include(name)) name = (typeof element.style.styleFloat != 'undefined') ? 'styleFloat' : 'cssFloat';
      element.style[name.camelize()] = value;
    }
    return element;
  },

  getDimensions: function(element) {
    element = $(element);
    var display = $(element).getStyle('display');
    if (display != 'none' && display != null) // Safari bug
      return {width: element.offsetWidth, height: element.offsetHeight};

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
    var els = element.style;
    var originalVisibility = els.visibility;
    var originalPosition = els.position;
    var originalDisplay = els.display;
    els.visibility = 'hidden';
    els.position = 'absolute';
    els.display = 'block';
    var originalWidth = element.clientWidth;
    var originalHeight = element.clientHeight;
    els.display = originalDisplay;
    els.position = originalPosition;
    els.visibility = originalVisibility;
    return {width: originalWidth, height: originalHeight};
  },

  makePositioned: function(element) {
    element = $(element);
    var pos = Element.getStyle(element, 'position');
    if (pos == 'static' || !pos) {
      element._madePositioned = true;
      element.style.position = 'relative';
      // Opera returns the offset relative to the positioning context, when an
      // element is position relative but top and left have not been defined
      if (window.opera) {
        element.style.top = 0;
        element.style.left = 0;
      }
    }
    return element;
  },

  undoPositioned: function(element) {
    element = $(element);
    if (element._madePositioned) {
      element._madePositioned = undefined;
      element.style.position =
        element.style.top =
        element.style.left =
        element.style.bottom =
        element.style.right = '';
    }
    return element;
  },

  makeClipping: function(element) {
    element = $(element);
    if (element._overflow) return element;
    element._overflow = element.style.overflow || 'auto';
    if ((Element.getStyle(element, 'overflow') || 'visible') != 'hidden')
      element.style.overflow = 'hidden';
    return element;
  },

  undoClipping: function(element) {
    element = $(element);
    if (!element._overflow) return element;
    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;
    element._overflow = null;
    return element;
  }
};

Object.extend(Element.Methods, {childOf: Element.Methods.descendantOf});

Element._attributeTranslations = {};

Element._attributeTranslations.names = {
  colspan:   "colSpan",
  rowspan:   "rowSpan",
  valign:    "vAlign",
  datetime:  "dateTime",
  accesskey: "accessKey",
  tabindex:  "tabIndex",
  enctype:   "encType",
  maxlength: "maxLength",
  readonly:  "readOnly",
  longdesc:  "longDesc"
};

Element._attributeTranslations.values = {
  _getAttr: function(element, attribute) {
    return element.getAttribute(attribute, 2);
  },

  _flag: function(element, attribute) {
    return $(element).hasAttribute(attribute) ? attribute : null;
  },

  style: function(element) {
    return element.style.cssText.toLowerCase();
  },

  title: function(element) {
    var node = element.getAttributeNode('title');
    return node.specified ? node.nodeValue : null;
  }
};

Object.extend(Element._attributeTranslations.values, {
  href: Element._attributeTranslations.values._getAttr,
  src:  Element._attributeTranslations.values._getAttr,
  disabled: Element._attributeTranslations.values._flag,
  checked:  Element._attributeTranslations.values._flag,
  readonly: Element._attributeTranslations.values._flag,
  multiple: Element._attributeTranslations.values._flag
});

Element.Methods.Simulated = {
  hasAttribute: function(element, attribute) {
    var t = Element._attributeTranslations;
    attribute = t.names[attribute] || attribute;
    return $(element).getAttributeNode(attribute).specified;
  }
};

// IE is missing .innerHTML support for TABLE-related elements
if (document.all && !window.opera){
  Element.Methods.update = function(element, html) {
    element = $(element);
    html = typeof html == 'undefined' ? '' : html.toString();
    var tagName = element.tagName.toUpperCase();
    if (['THEAD','TBODY','TR','TD'].include(tagName)) {
      var div = document.createElement('div');
      switch (tagName) {
        case 'THEAD':
        case 'TBODY':
          div.innerHTML = '<table><tbody>' +  html.stripScripts() + '</tbody></table>';
          depth = 2;
          break;
        case 'TR':
          div.innerHTML = '<table><tbody><tr>' +  html.stripScripts() + '</tr></tbody></table>';
          depth = 3;
          break;
        case 'TD':
          div.innerHTML = '<table><tbody><tr><td>' +  html.stripScripts() + '</td></tr></tbody></table>';
          depth = 4;
      }
      $A(element.childNodes).each(function(node){
        element.removeChild(node)
      });
      depth.times(function(){ div = div.firstChild });

      $A(div.childNodes).each(
        function(node){ element.appendChild(node) });
    } else {
      element.innerHTML = html.stripScripts();
    }
    setTimeout(function() {html.evalScripts()}, 10);
    return element;
  }
};

Object.extend(Element, Element.Methods);

var _nativeExtensions = false;

if(/Konqueror|Safari|KHTML/.test(navigator.userAgent))
  ['', 'Form', 'Input', 'TextArea', 'Select'].each(function(tag) {
    var className = 'HTML' + tag + 'Element';
    if(window[className]) return;
    var klass = window[className] = {};
    klass.prototype = document.createElement(tag ? tag.toLowerCase() : 'div').__proto__;
  });

Element.addMethods = function(methods) {
  Object.extend(Element.Methods, methods || {});

  function copy(methods, destination, onlyIfAbsent) {
    onlyIfAbsent = onlyIfAbsent || false;
    var cache = Element.extend.cache;
    for (var property in methods) {
      var value = methods[property];
      if (!onlyIfAbsent || !(property in destination))
        destination[property] = cache.findOrStore(value);
    }
  }

  if (typeof HTMLElement != 'undefined') {
    copy(Element.Methods, HTMLElement.prototype);
    copy(Element.Methods.Simulated, HTMLElement.prototype, true);
    copy(Form.Methods, HTMLFormElement.prototype);
    [HTMLInputElement, HTMLTextAreaElement, HTMLSelectElement].each(function(klass) {
      copy(Form.Element.Methods, klass.prototype);
    });
    _nativeExtensions = true;
  }
}

var Toggle = new Object();
Toggle.display = Element.toggle;

/*--------------------------------------------------------------------------*/

Abstract.Insertion = function(adjacency) {
  this.adjacency = adjacency;
}

Abstract.Insertion.prototype = {
  initialize: function(element, content) {
    this.element = $(element);

    this.content = content.stripScripts();

    if (this.adjacency && this.element.insertAdjacentHTML) {
      try {
        this.element.insertAdjacentHTML(this.adjacency, this.content);
      } catch (e) {
        var tagName = this.element.tagName.toUpperCase();
        if (['TBODY', 'TR'].include(tagName)) {
          this.insertContent(this.contentFromAnonymousTable());
        } else {
          throw e;
        }
      }
    } else {
      this.range = this.element.ownerDocument.createRange();
      if (this.initializeRange) this.initializeRange();
      this.insertContent([this.range.createContextualFragment(this.content)]);
    }

    setTimeout(function() {content.evalScripts()}, 10);
  },

  contentFromAnonymousTable: function() {
    var div = document.createElement('div');
    div.innerHTML = '<table><tbody>' + this.content + '</tbody></table>';
    return $A(div.childNodes[0].childNodes[0].childNodes);
  }
}


var Insertion = new Object();

Insertion.Before = Class.create();
Insertion.Before.prototype = Object.extend(new Abstract.Insertion('beforeBegin'), {
  initializeRange: function() {
    this.range.setStartBefore(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment, this.element);
    }).bind(this));
  }
});

Insertion.Top = Class.create();
Insertion.Top.prototype = Object.extend(new Abstract.Insertion('afterBegin'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(true);
  },

  insertContent: function(fragments) {
    fragments.reverse(false).each((function(fragment) {
      this.element.insertBefore(fragment, this.element.firstChild);
    }).bind(this));
  }
});

Insertion.Bottom = Class.create();
Insertion.Bottom.prototype = Object.extend(new Abstract.Insertion('beforeEnd'), {
  initializeRange: function() {
    this.range.selectNodeContents(this.element);
    this.range.collapse(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.appendChild(fragment);
    }).bind(this));
  }
});

Insertion.After = Class.create();
Insertion.After.prototype = Object.extend(new Abstract.Insertion('afterEnd'), {
  initializeRange: function() {
    this.range.setStartAfter(this.element);
  },

  insertContent: function(fragments) {
    fragments.each((function(fragment) {
      this.element.parentNode.insertBefore(fragment,
        this.element.nextSibling);
    }).bind(this));
  }
});

/*--------------------------------------------------------------------------*/

Element.ClassNames = Class.create();
Element.ClassNames.prototype = {
  initialize: function(element) {
    this.element = $(element);
  },

  _each: function(iterator) {
    this.element.className.split(/\s+/).select(function(name) {
      return name.length > 0;
    })._each(iterator);
  },

  set: function(className) {
    this.element.className = className;
  },

  add: function(classNameToAdd) {
    if (this.include(classNameToAdd)) return;
    this.set($A(this).concat(classNameToAdd).join(' '));
  },

  remove: function(classNameToRemove) {
    if (!this.include(classNameToRemove)) return;
    this.set($A(this).without(classNameToRemove).join(' '));
  },

  toString: function() {
    return $A(this).join(' ');
  }
};

Object.extend(Element.ClassNames.prototype, Enumerable);
var Selector = Class.create();
Selector.prototype = {
  initialize: function(expression) {
    this.params = {classNames: []};
    this.expression = expression.toString().strip();
    this.parseExpression();
    this.compileMatcher();
  },

  parseExpression: function() {
    function abort(message) { throw 'Parse error in selector: ' + message; }

    if (this.expression == '')  abort('empty expression');

    var params = this.params, expr = this.expression, match, modifier, clause, rest;
    while (match = expr.match(/^(.*)\[([a-z0-9_:-]+?)(?:([~\|!]?=)(?:"([^"]*)"|([^\]\s]*)))?\]$/i)) {
      params.attributes = params.attributes || [];
      params.attributes.push({name: match[2], operator: match[3], value: match[4] || match[5] || ''});
      expr = match[1];
    }

    if (expr == '*') return this.params.wildcard = true;

    while (match = expr.match(/^([^a-z0-9_-])?([a-z0-9_-]+)(.*)/i)) {
      modifier = match[1], clause = match[2], rest = match[3];
      switch (modifier) {
        case '#':       params.id = clause; break;
        case '.':       params.classNames.push(clause); break;
        case '':
        case undefined: params.tagName = clause.toUpperCase(); break;
        default:        abort(expr.inspect());
      }
      expr = rest;
    }

    if (expr.length > 0) abort(expr.inspect());
  },

  buildMatchExpression: function() {
    var params = this.params, conditions = [], clause;

    if (params.wildcard)
      conditions.push('true');
    if (clause = params.id)
      conditions.push('element.readAttribute("id") == ' + clause.inspect());
    if (clause = params.tagName)
      conditions.push('element.tagName.toUpperCase() == ' + clause.inspect());
    if ((clause = params.classNames).length > 0)
      for (var i = 0, length = clause.length; i < length; i++)
        conditions.push('element.hasClassName(' + clause[i].inspect() + ')');
    if (clause = params.attributes) {
      clause.each(function(attribute) {
        var value = 'element.readAttribute(' + attribute.name.inspect() + ')';
        var splitValueBy = function(delimiter) {
          return value + ' && ' + value + '.split(' + delimiter.inspect() + ')';
        }

        switch (attribute.operator) {
          case '=':       conditions.push(value + ' == ' + attribute.value.inspect()); break;
          case '~=':      conditions.push(splitValueBy(' ') + '.include(' + attribute.value.inspect() + ')'); break;
          case '|=':      conditions.push(
                            splitValueBy('-') + '.first().toUpperCase() == ' + attribute.value.toUpperCase().inspect()
                          ); break;
          case '!=':      conditions.push(value + ' != ' + attribute.value.inspect()); break;
          case '':
          case undefined: conditions.push('element.hasAttribute(' + attribute.name.inspect() + ')'); break;
          default:        throw 'Unknown operator ' + attribute.operator + ' in selector';
        }
      });
    }

    return conditions.join(' && ');
  },

  compileMatcher: function() {
    this.match = new Function('element', 'if (!element.tagName) return false; \
      element = $(element); \
      return ' + this.buildMatchExpression());
  },

  findElements: function(scope) {
    var element;

    if (element = $(this.params.id))
      if (this.match(element))
        if (!scope || Element.childOf(element, scope))
          return [element];

    scope = (scope || document).getElementsByTagName(this.params.tagName || '*');

    var results = [];
    for (var i = 0, length = scope.length; i < length; i++)
      if (this.match(element = scope[i]))
        results.push(Element.extend(element));

    return results;
  },

  toString: function() {
    return this.expression;
  }
}

Object.extend(Selector, {
  matchElements: function(elements, expression) {
    var selector = new Selector(expression);
    return elements.select(selector.match.bind(selector)).map(Element.extend);
  },

  findElement: function(elements, expression, index) {
    if (typeof expression == 'number') index = expression, expression = false;
    return Selector.matchElements(elements, expression || '*')[index || 0];
  },

  findChildElements: function(element, expressions) {
    return expressions.map(function(expression) {
      return expression.match(/[^\s"]+(?:"[^"]*"[^\s"]+)*/g).inject([null], function(results, expr) {
        var selector = new Selector(expr);
        return results.inject([], function(elements, result) {
          return elements.concat(selector.findElements(result || element));
        });
      });
    }).flatten();
  }
});

function $$() {
  return Selector.findChildElements(document, $A(arguments));
}
var Form = {


  reset: function(form) {
    $(form).reset();
    return form;
  },

  serializeElements: function(elements, getHash) {
    var data = elements.inject({}, function(result, element) {
      if (!element.disabled && element.name) {
        var key = element.name, value = $(element).getValue();
        if (value != undefined) {
          if (result[key]) {
            if (result[key].constructor != Array) result[key] = [result[key]];
            result[key].push(value);
          }
          else result[key] = value;
        }
      }
      return result;
    });

    return getHash ? data : Hash.toQueryString(data);
  }
};

Form.Methods = {
  serialize: function(form, getHash) {
    return Form.serializeElements(Form.getElements(form), getHash);
  },

  getElements: function(form) {
    return $A($(form).getElementsByTagName('*')).inject([],
      function(elements, child) {
        if (Form.Element.Serializers[child.tagName.toLowerCase()])
          elements.push(Element.extend(child));
        return elements;
      }
    );
  },

  getInputs: function(form, typeName, name) {
    form = $(form);
    var inputs = form.getElementsByTagName('input');

    if (!typeName && !name) return $A(inputs).map(Element.extend);

    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {
      var input = inputs[i];
      if ((typeName && input.type != typeName) || (name && input.name != name))
        continue;
      matchingInputs.push(Element.extend(input));
    }

    return matchingInputs;
  },

  disable: function(form) {
    form = $(form);
    form.getElements().each(function(element) {
      element.blur();
      element.disabled = 'true';
    });
    return form;
  },

  enable: function(form) {
    form = $(form);
    form.getElements().each(function(element) {
      element.disabled = '';
    });
    return form;
  },

  findFirstElement: function(form) {
    return $(form).getElements().find(function(element) {
      return element.type != 'hidden' && !element.disabled &&
        ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());
    });
  },

  focusFirstElement: function(form) {
    form = $(form);
    form.findFirstElement().activate();
    return form;
  }
}

Object.extend(Form, Form.Methods);

/*--------------------------------------------------------------------------*/

Form.Element = {
  focus: function(element) {
    $(element).focus();
    return element;
  },

  select: function(element) {
    $(element).select();
    return element;
  }
}

Form.Element.Methods = {
  serialize: function(element) {
    element = $(element);
    if (!element.disabled && element.name) {
      var value = element.getValue();
      if (value != undefined) {
        var pair = {};
        pair[element.name] = value;
        return Hash.toQueryString(pair);
      }
    }
    return '';
  },

  getValue: function(element) {
    element = $(element);
    var method = element.tagName.toLowerCase();
    return Form.Element.Serializers[method](element);
  },

  clear: function(element) {
    $(element).value = '';
    return element;
  },

  present: function(element) {
    return $(element).value != '';
  },

  activate: function(element) {
    element = $(element);
    element.focus();
    if (element.select && ( element.tagName.toLowerCase() != 'input' ||
      !['button', 'reset', 'submit'].include(element.type) ) )
      element.select();
    return element;
  },

  disable: function(element) {
    element = $(element);
    element.disabled = true;
    return element;
  },

  enable: function(element) {
    element = $(element);
    element.blur();
    element.disabled = false;
    return element;
  }
}

Object.extend(Form.Element, Form.Element.Methods);
var Field = Form.Element;
var $F = Form.Element.getValue;

/*--------------------------------------------------------------------------*/

Form.Element.Serializers = {
  input: function(element) {
    switch (element.type.toLowerCase()) {
      case 'checkbox':
      case 'radio':
        return Form.Element.Serializers.inputSelector(element);
      default:
        return Form.Element.Serializers.textarea(element);
    }
  },

  inputSelector: function(element) {
    return element.checked ? element.value : null;
  },

  textarea: function(element) {
    return element.value;
  },

  select: function(element) {
    return this[element.type == 'select-one' ?
      'selectOne' : 'selectMany'](element);
  },

  selectOne: function(element) {
    var index = element.selectedIndex;
    return index >= 0 ? this.optionValue(element.options[index]) : null;
  },

  selectMany: function(element) {
    var values, length = element.length;
    if (!length) return null;

    for (var i = 0, values = []; i < length; i++) {
      var opt = element.options[i];
      if (opt.selected) values.push(this.optionValue(opt));
    }
    return values;
  },

  optionValue: function(opt) {
    // extend element because hasAttribute may not be native
    return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;
  }
}

/*--------------------------------------------------------------------------*/

Abstract.TimedObserver = function() {}
Abstract.TimedObserver.prototype = {
  initialize: function(element, frequency, callback) {
    this.frequency = frequency;
    this.element   = $(element);
    this.callback  = callback;

    this.lastValue = this.getValue();
    this.registerCallback();
  },

  registerCallback: function() {
    setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
  },

  onTimerEvent: function() {
    var value = this.getValue();
    var changed = ('string' == typeof this.lastValue && 'string' == typeof value
      ? this.lastValue != value : String(this.lastValue) != String(value));
    if (changed) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  }
}

Form.Element.Observer = Class.create();
Form.Element.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.Observer = Class.create();
Form.Observer.prototype = Object.extend(new Abstract.TimedObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});

/*--------------------------------------------------------------------------*/

Abstract.EventObserver = function() {}
Abstract.EventObserver.prototype = {
  initialize: function(element, callback) {
    this.element  = $(element);
    this.callback = callback;

    this.lastValue = this.getValue();
    if (this.element.tagName.toLowerCase() == 'form')
      this.registerFormCallbacks();
    else
      this.registerCallback(this.element);
  },

  onElementEvent: function() {
    var value = this.getValue();
    if (this.lastValue != value) {
      this.callback(this.element, value);
      this.lastValue = value;
    }
  },

  registerFormCallbacks: function() {
    Form.getElements(this.element).each(this.registerCallback.bind(this));
  },

  registerCallback: function(element) {
    if (element.type) {
      switch (element.type.toLowerCase()) {
        case 'checkbox':
        case 'radio':
          Event.observe(element, 'click', this.onElementEvent.bind(this));
          break;
        default:
          Event.observe(element, 'change', this.onElementEvent.bind(this));
          break;
      }
    }
  }
}

Form.Element.EventObserver = Class.create();
Form.Element.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.Element.getValue(this.element);
  }
});

Form.EventObserver = Class.create();
Form.EventObserver.prototype = Object.extend(new Abstract.EventObserver(), {
  getValue: function() {
    return Form.serialize(this.element);
  }
});
if (!window.Event) {
  var Event = new Object();
}

Object.extend(Event, {
  KEY_BACKSPACE: 8,
  KEY_TAB:       9,
  KEY_RETURN:   13,
  KEY_ESC:      27,
  KEY_LEFT:     37,
  KEY_UP:       38,
  KEY_RIGHT:    39,
  KEY_DOWN:     40,
  KEY_DELETE:   46,
  KEY_HOME:     36,
  KEY_END:      35,
  KEY_PAGEUP:   33,
  KEY_PAGEDOWN: 34,

  element: function(event) {
    return event.target || event.srcElement;
  },

  isLeftClick: function(event) {
    return (((event.which) && (event.which == 1)) ||
            ((event.button) && (event.button == 1)));
  },

  pointerX: function(event) {
    return event.pageX || (event.clientX +
      (document.documentElement.scrollLeft || document.body.scrollLeft));
  },

  pointerY: function(event) {
    return event.pageY || (event.clientY +
      (document.documentElement.scrollTop || document.body.scrollTop));
  },

  stop: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }
  },

  // find the first node with the given tagName, starting from the
  // node the event was triggered on; traverses the DOM upwards
  findElement: function(event, tagName) {
    var element = Event.element(event);
    while (element.parentNode && (!element.tagName ||
        (element.tagName.toUpperCase() != tagName.toUpperCase())))
      element = element.parentNode;
    return element;
  },

  observers: false,

  _observeAndCache: function(element, name, observer, useCapture) {
    if (!this.observers) this.observers = [];
    if (element.addEventListener) {
      this.observers.push([element, name, observer, useCapture]);
      element.addEventListener(name, observer, useCapture);
    } else if (element.attachEvent) {
      this.observers.push([element, name, observer, useCapture]);
      element.attachEvent('on' + name, observer);
    }
  },

  unloadCache: function() {
    if (!Event.observers) return;
    for (var i = 0, length = Event.observers.length; i < length; i++) {
      Event.stopObserving.apply(this, Event.observers[i]);
      Event.observers[i][0] = null;
    }
    Event.observers = false;
  },

  observe: function(element, name, observer, useCapture) {
    element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.attachEvent))
      name = 'keydown';

    Event._observeAndCache(element, name, observer, useCapture);
  },

  stopObserving: function(element, name, observer, useCapture) {
    element = $(element);
    useCapture = useCapture || false;

    if (name == 'keypress' &&
        (navigator.appVersion.match(/Konqueror|Safari|KHTML/)
        || element.detachEvent))
      name = 'keydown';

    if (element.removeEventListener) {
      element.removeEventListener(name, observer, useCapture);
    } else if (element.detachEvent) {
      try {
        element.detachEvent('on' + name, observer);
      } catch (e) {}
    }
  }
});

/* prevent memory leaks in IE */
if (navigator.appVersion.match(/\bMSIE\b/))
  Event.observe(window, 'unload', Event.unloadCache, false);
var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,

  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  realOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return [valueL, valueT];
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        if(element.tagName=='BODY') break;
        var p = Element.getStyle(element, 'position');
        if (p == 'relative' || p == 'absolute') break;
      }
    } while (element);
    return [valueL, valueT];
  },

  offsetParent: function(element) {
    if (element.offsetParent) return element.offsetParent;
    if (element == document.body) return element;

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return element;

    return document.body;
  },

  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = this.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = this.realOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = this.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },

  page: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent==document.body)
        if (Element.getStyle(element,'position')=='absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      if (!window.opera || element.tagName=='BODY') {
        valueT -= element.scrollTop  || 0;
        valueL -= element.scrollLeft || 0;
      }
    } while (element = element.parentNode);

    return [valueL, valueT];
  },

  clone: function(source, target) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || {})

    // find page position of source
    source = $(source);
    var p = Position.page(source);

    // find coordinate system to use
    target = $(target);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(target,'position') == 'absolute') {
      parent = Position.offsetParent(target);
      delta = Position.page(parent);
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    // set position
    if(options.setLeft)   target.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if(options.setTop)    target.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if(options.setWidth)  target.style.width = source.offsetWidth + 'px';
    if(options.setHeight) target.style.height = source.offsetHeight + 'px';
  },

  absolutize: function(element) {
    element = $(element);
    if (element.style.position == 'absolute') return;
    Position.prepare();

    var offsets = Position.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.width  = width + 'px';
    element.style.height = height + 'px';
  },

  relativize: function(element) {
    element = $(element);
    if (element.style.position == 'relative') return;
    Position.prepare();

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
  }
}

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return [valueL, valueT];
  }
}

Element.addMethods();
//=======PROTOTYPE ENDS HERE=========

//=======EFFECTS STARTS HERE===========
// script.aculo.us effects.js v1.7.0, Fri Jan 19 19:16:36 CET 2007

// Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
// Contributors:
//  Justin Palmer (http://encytemedia.com/)
//  Mark Pilgrim (http://diveintomark.org/)
//  Martin Bialasinki
// 
// script.aculo.us is freely distributable under the terms of an MIT-style license.
// For details, see the script.aculo.us web site: http://script.aculo.us/ 

// converts rgb() and #xxx to #xxxxxx format,  
// returns self (or first argument) if not convertable  
String.prototype.parseColor = function() {  
  var color = '#';
  if(this.slice(0,4) == 'rgb(') {  
    var cols = this.slice(4,this.length-1).split(',');  
    var i=0; do { color += parseInt(cols[i]).toColorPart() } while (++i<3);  
  } else {  
    if(this.slice(0,1) == '#') {  
      if(this.length==4) for(var i=1;i<4;i++) color += (this.charAt(i) + this.charAt(i)).toLowerCase();  
      if(this.length==7) color = this.toLowerCase();  
    }  
  }  
  return(color.length==7 ? color : (arguments[0] || this));  
}

/*--------------------------------------------------------------------------*/

Element.collectTextNodes = function(element) {  
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue : 
      (node.hasChildNodes() ? Element.collectTextNodes(node) : ''));
  }).flatten().join('');
}

Element.collectTextNodesIgnoreClass = function(element, className) {  
  return $A($(element).childNodes).collect( function(node) {
    return (node.nodeType==3 ? node.nodeValue : 
      ((node.hasChildNodes() && !Element.hasClassName(node,className)) ? 
        Element.collectTextNodesIgnoreClass(node, className) : ''));
  }).flatten().join('');
}

Element.setContentZoom = function(element, percent) {
  element = $(element);  
  element.setStyle({fontSize: (percent/100) + 'em'});   
  if(navigator.appVersion.indexOf('AppleWebKit')>0) window.scrollBy(0,0);
  return element;
}

Element.getOpacity = function(element){
  return $(element).getStyle('opacity');
}

Element.setOpacity = function(element, value){
  return $(element).setStyle({opacity:value});
}

Element.getInlineOpacity = function(element){
  return $(element).style.opacity || '';
}

Element.forceRerendering = function(element) {
  try {
    element = $(element);
    var n = document.createTextNode(' ');
    element.appendChild(n);
    element.removeChild(n);
  } catch(e) { }
};

/*--------------------------------------------------------------------------*/

Array.prototype.call = function() {
  var args = arguments;
  this.each(function(f){ f.apply(this, args) });
}

/*--------------------------------------------------------------------------*/

var Effect = {
  _elementDoesNotExistError: {
    name: 'ElementDoesNotExistError',
    message: 'The specified DOM element does not exist, but is required for this effect to operate'
  },
  tagifyText: function(element) {
    if(typeof Builder == 'undefined')
      throw("Effect.tagifyText requires including script.aculo.us' builder.js library");
      
    var tagifyStyle = 'position:relative';
    if(/MSIE/.test(navigator.userAgent) && !window.opera) tagifyStyle += ';zoom:1';
    
    element = $(element);
    $A(element.childNodes).each( function(child) {
      if(child.nodeType==3) {
        child.nodeValue.toArray().each( function(character) {
          element.insertBefore(
            Builder.node('span',{style: tagifyStyle},
              character == ' ' ? String.fromCharCode(160) : character), 
              child);
        });
        Element.remove(child);
      }
    });
  },
  multiple: function(element, effect) {
    var elements;
    if(((typeof element == 'object') || 
        (typeof element == 'function')) && 
       (element.length))
      elements = element;
    else
      elements = $(element).childNodes;
      
    var options = Object.extend({
      speed: 0.1,
      delay: 0.0
    }, arguments[2] || {});
    var masterDelay = options.delay;

    $A(elements).each( function(element, index) {
      new effect(element, Object.extend(options, { delay: index * options.speed + masterDelay }));
    });
  },
  PAIRS: {
    'slide':  ['SlideDown','SlideUp'],
    'blind':  ['BlindDown','BlindUp'],
    'appear': ['Appear','Fade']
  },
  toggle: function(element, effect) {
    element = $(element);
    effect = (effect || 'appear').toLowerCase();
    var options = Object.extend({
      queue: { position:'end', scope:(element.id || 'global'), limit: 1 }
    }, arguments[2] || {});
    Effect[element.visible() ? 
      Effect.PAIRS[effect][1] : Effect.PAIRS[effect][0]](element, options);
  }
};

var Effect2 = Effect; // deprecated

/* ------------- transitions ------------- */

Effect.Transitions = {
  linear: Prototype.K,
  sinoidal: function(pos) {
    return (-Math.cos(pos*Math.PI)/2) + 0.5;
  },
  reverse: function(pos) {
    return 1-pos;
  },
  flicker: function(pos) {
    return ((-Math.cos(pos*Math.PI)/4) + 0.75) + Math.random()/4;
  },
  wobble: function(pos) {
    return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
  },
  pulse: function(pos, pulses) { 
    pulses = pulses || 5; 
    return (
      Math.round((pos % (1/pulses)) * pulses) == 0 ? 
            ((pos * pulses * 2) - Math.floor(pos * pulses * 2)) : 
        1 - ((pos * pulses * 2) - Math.floor(pos * pulses * 2))
      );
  },
  none: function(pos) {
    return 0;
  },
  full: function(pos) {
    return 1;
  }
};

/* ------------- core effects ------------- */

Effect.ScopedQueue = Class.create();
Object.extend(Object.extend(Effect.ScopedQueue.prototype, Enumerable), {
  initialize: function() {
    this.effects  = [];
    this.interval = null;
  },
  _each: function(iterator) {
    this.effects._each(iterator);
  },
  add: function(effect) {
    var timestamp = new Date().getTime();
    
    var position = (typeof effect.options.queue == 'string') ? 
      effect.options.queue : effect.options.queue.position;
    
    switch(position) {
      case 'front':
        // move unstarted effects after this effect  
        this.effects.findAll(function(e){ return e.state=='idle' }).each( function(e) {
            e.startOn  += effect.finishOn;
            e.finishOn += effect.finishOn;
          });
        break;
      case 'with-last':
        timestamp = this.effects.pluck('startOn').max() || timestamp;
        break;
      case 'end':
        // start effect after last queued effect has finished
        timestamp = this.effects.pluck('finishOn').max() || timestamp;
        break;
    }
    
    effect.startOn  += timestamp;
    effect.finishOn += timestamp;

    if(!effect.options.queue.limit || (this.effects.length < effect.options.queue.limit))
      this.effects.push(effect);
    
    if(!this.interval) 
      this.interval = setInterval(this.loop.bind(this), 15);
  },
  remove: function(effect) {
    this.effects = this.effects.reject(function(e) { return e==effect });
    if(this.effects.length == 0) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  loop: function() {
    var timePos = new Date().getTime();
    for(var i=0, len=this.effects.length;i<len;i++) 
      if(this.effects[i]) this.effects[i].loop(timePos);
  }
});

Effect.Queues = {
  instances: $H(),
  get: function(queueName) {
    if(typeof queueName != 'string') return queueName;
    
    if(!this.instances[queueName])
      this.instances[queueName] = new Effect.ScopedQueue();
      
    return this.instances[queueName];
  }
}
Effect.Queue = Effect.Queues.get('global');

Effect.DefaultOptions = {
  transition: Effect.Transitions.sinoidal,
  duration:   1.0,   // seconds
  fps:        60.0,  // max. 60fps due to Effect.Queue implementation
  sync:       false, // true for combining
  from:       0.0,
  to:         1.0,
  delay:      0.0,
  queue:      'parallel'
}

Effect.Base = function() {};
Effect.Base.prototype = {
  position: null,
  start: function(options) {
    this.options      = Object.extend(Object.extend({},Effect.DefaultOptions), options || {});
    this.currentFrame = 0;
    this.state        = 'idle';
    this.startOn      = this.options.delay*1000;
    this.finishOn     = this.startOn + (this.options.duration*1000);
    this.event('beforeStart');
    if(!this.options.sync)
      Effect.Queues.get(typeof this.options.queue == 'string' ? 
        'global' : this.options.queue.scope).add(this);
  },
  loop: function(timePos) {
    if(timePos >= this.startOn) {
      if(timePos >= this.finishOn) {
        this.render(1.0);
        this.cancel();
        this.event('beforeFinish');
        if(this.finish) this.finish(); 
        this.event('afterFinish');
        return;  
      }
      var pos   = (timePos - this.startOn) / (this.finishOn - this.startOn);
      var frame = Math.round(pos * this.options.fps * this.options.duration);
      if(frame > this.currentFrame) {
        this.render(pos);
        this.currentFrame = frame;
      }
    }
  },
  render: function(pos) {
    if(this.state == 'idle') {
      this.state = 'running';
      this.event('beforeSetup');
      if(this.setup) this.setup();
      this.event('afterSetup');
    }
    if(this.state == 'running') {
      if(this.options.transition) pos = this.options.transition(pos);
      pos *= (this.options.to-this.options.from);
      pos += this.options.from;
      this.position = pos;
      this.event('beforeUpdate');
      if(this.update) this.update(pos);
      this.event('afterUpdate');
    }
  },
  cancel: function() {
    if(!this.options.sync)
      Effect.Queues.get(typeof this.options.queue == 'string' ? 
        'global' : this.options.queue.scope).remove(this);
    this.state = 'finished';
  },
  event: function(eventName) {
    if(this.options[eventName + 'Internal']) this.options[eventName + 'Internal'](this);
    if(this.options[eventName]) this.options[eventName](this);
  },
  inspect: function() {
    var data = $H();
    for(property in this)
      if(typeof this[property] != 'function') data[property] = this[property];
    return '#<Effect:' + data.inspect() + ',options:' + $H(this.options).inspect() + '>';
  }
}

Effect.Parallel = Class.create();
Object.extend(Object.extend(Effect.Parallel.prototype, Effect.Base.prototype), {
  initialize: function(effects) {
    this.effects = effects || [];
    this.start(arguments[1]);
  },
  update: function(position) {
    this.effects.invoke('render', position);
  },
  finish: function(position) {
    this.effects.each( function(effect) {
      effect.render(1.0);
      effect.cancel();
      effect.event('beforeFinish');
      if(effect.finish) effect.finish(position);
      effect.event('afterFinish');
    });
  }
});

Effect.Event = Class.create();
Object.extend(Object.extend(Effect.Event.prototype, Effect.Base.prototype), {
  initialize: function() {
    var options = Object.extend({
      duration: 0
    }, arguments[0] || {});
    this.start(options);
  },
  update: Prototype.emptyFunction
});

Effect.Opacity = Class.create();
Object.extend(Object.extend(Effect.Opacity.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    if(!this.element) throw(Effect._elementDoesNotExistError);
    // make this work on IE on elements without 'layout'
    if(/MSIE/.test(navigator.userAgent) && !window.opera && (!this.element.currentStyle.hasLayout))
      this.element.setStyle({zoom: 1});
    var options = Object.extend({
      from: this.element.getOpacity() || 0.0,
      to:   1.0
    }, arguments[1] || {});
    this.start(options);
  },
  update: function(position) {
    this.element.setOpacity(position);
  }
});

Effect.Move = Class.create();
Object.extend(Object.extend(Effect.Move.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    if(!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      x:    0,
      y:    0,
      mode: 'relative'
    }, arguments[1] || {});
    this.start(options);
  },
  setup: function() {
    // Bug in Opera: Opera returns the "real" position of a static element or
    // relative element that does not have top/left explicitly set.
    // ==> Always set top and left for position relative elements in your stylesheets 
    // (to 0 if you do not need them) 
    this.element.makePositioned();
    this.originalLeft = parseFloat(this.element.getStyle('left') || '0');
    this.originalTop  = parseFloat(this.element.getStyle('top')  || '0');
    if(this.options.mode == 'absolute') {
      // absolute movement, so we need to calc deltaX and deltaY
      this.options.x = this.options.x - this.originalLeft;
      this.options.y = this.options.y - this.originalTop;
    }
  },
  update: function(position) {
    this.element.setStyle({
      left: Math.round(this.options.x  * position + this.originalLeft) + 'px',
      top:  Math.round(this.options.y  * position + this.originalTop)  + 'px'
    });
  }
});

// for backwards compatibility
Effect.MoveBy = function(element, toTop, toLeft) {
  return new Effect.Move(element, 
    Object.extend({ x: toLeft, y: toTop }, arguments[3] || {}));
};

Effect.Scale = Class.create();
Object.extend(Object.extend(Effect.Scale.prototype, Effect.Base.prototype), {
  initialize: function(element, percent) {
    this.element = $(element);
    if(!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      scaleX: true,
      scaleY: true,
      scaleContent: true,
      scaleFromCenter: false,
      scaleMode: 'box',        // 'box' or 'contents' or {} with provided values
      scaleFrom: 100.0,
      scaleTo:   percent
    }, arguments[2] || {});
    this.start(options);
  },
  setup: function() {
    this.restoreAfterFinish = this.options.restoreAfterFinish || false;
    this.elementPositioning = this.element.getStyle('position');
    
    this.originalStyle = {};
    ['top','left','width','height','fontSize'].each( function(k) {
      this.originalStyle[k] = this.element.style[k];
    }.bind(this));
      
    this.originalTop  = this.element.offsetTop;
    this.originalLeft = this.element.offsetLeft;
    
    var fontSize = this.element.getStyle('font-size') || '100%';
    ['em','px','%','pt'].each( function(fontSizeType) {
      if(fontSize.indexOf(fontSizeType)>0) {
        this.fontSize     = parseFloat(fontSize);
        this.fontSizeType = fontSizeType;
      }
    }.bind(this));
    
    this.factor = (this.options.scaleTo - this.options.scaleFrom)/100;
    
    this.dims = null;
    if(this.options.scaleMode=='box')
      this.dims = [this.element.offsetHeight, this.element.offsetWidth];
    if(/^content/.test(this.options.scaleMode))
      this.dims = [this.element.scrollHeight, this.element.scrollWidth];
    if(!this.dims)
      this.dims = [this.options.scaleMode.originalHeight,
                   this.options.scaleMode.originalWidth];
  },
  update: function(position) {
    var currentScale = (this.options.scaleFrom/100.0) + (this.factor * position);
    if(this.options.scaleContent && this.fontSize)
      this.element.setStyle({fontSize: this.fontSize * currentScale + this.fontSizeType });
    this.setDimensions(this.dims[0] * currentScale, this.dims[1] * currentScale);
  },
  finish: function(position) {
    if(this.restoreAfterFinish) this.element.setStyle(this.originalStyle);
  },
  setDimensions: function(height, width) {
    var d = {};
    if(this.options.scaleX) d.width = Math.round(width) + 'px';
    if(this.options.scaleY) d.height = Math.round(height) + 'px';
    if(this.options.scaleFromCenter) {
      var topd  = (height - this.dims[0])/2;
      var leftd = (width  - this.dims[1])/2;
      if(this.elementPositioning == 'absolute') {
        if(this.options.scaleY) d.top = this.originalTop-topd + 'px';
        if(this.options.scaleX) d.left = this.originalLeft-leftd + 'px';
      } else {
        if(this.options.scaleY) d.top = -topd + 'px';
        if(this.options.scaleX) d.left = -leftd + 'px';
      }
    }
    this.element.setStyle(d);
  }
});

Effect.Highlight = Class.create();
Object.extend(Object.extend(Effect.Highlight.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    if(!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({ startcolor: '#ffff99' }, arguments[1] || {});
    this.start(options);
  },
  setup: function() {
    // Prevent executing on elements not in the layout flow
    if(this.element.getStyle('display')=='none') { this.cancel(); return; }
    // Disable background image during the effect
    this.oldStyle = {};
    if (!this.options.keepBackgroundImage) {
      this.oldStyle.backgroundImage = this.element.getStyle('background-image');
      this.element.setStyle({backgroundImage: 'none'});
    }
    if(!this.options.endcolor)
      this.options.endcolor = this.element.getStyle('background-color').parseColor('#ffffff');
    if(!this.options.restorecolor)
      this.options.restorecolor = this.element.getStyle('background-color');
    // init color calculations
    this._base  = $R(0,2).map(function(i){ return parseInt(this.options.startcolor.slice(i*2+1,i*2+3),16) }.bind(this));
    this._delta = $R(0,2).map(function(i){ return parseInt(this.options.endcolor.slice(i*2+1,i*2+3),16)-this._base[i] }.bind(this));
  },
  update: function(position) {
    this.element.setStyle({backgroundColor: $R(0,2).inject('#',function(m,v,i){
      return m+(Math.round(this._base[i]+(this._delta[i]*position)).toColorPart()); }.bind(this)) });
  },
  finish: function() {
    this.element.setStyle(Object.extend(this.oldStyle, {
      backgroundColor: this.options.restorecolor
    }));
  }
});

Effect.ScrollTo = Class.create();
Object.extend(Object.extend(Effect.ScrollTo.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    this.start(arguments[1] || {});
  },
  setup: function() {
    Position.prepare();
    var offsets = Position.cumulativeOffset(this.element);
    if(this.options.offset) offsets[1] += this.options.offset;
    var max = window.innerHeight ? 
      window.height - window.innerHeight :
      document.body.scrollHeight - 
        (document.documentElement.clientHeight ? 
          document.documentElement.clientHeight : document.body.clientHeight);
    this.scrollStart = Position.deltaY;
    this.delta = (offsets[1] > max ? max : offsets[1]) - this.scrollStart;
  },
  update: function(position) {
    Position.prepare();
    window.scrollTo(Position.deltaX, 
      this.scrollStart + (position*this.delta));
  }
});

/* ------------- combination effects ------------- */

Effect.Fade = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  var options = Object.extend({
  from: element.getOpacity() || 1.0,
  to:   0.0,
  afterFinishInternal: function(effect) { 
    if(effect.options.to!=0) return;
    effect.element.hide().setStyle({opacity: oldOpacity}); 
  }}, arguments[1] || {});
  return new Effect.Opacity(element,options);
}

Effect.Appear = function(element) {
  element = $(element);
  var options = Object.extend({
  from: (element.getStyle('display') == 'none' ? 0.0 : element.getOpacity() || 0.0),
  to:   1.0,
  // force Safari to render floated elements properly
  afterFinishInternal: function(effect) {
    effect.element.forceRerendering();
  },
  beforeSetup: function(effect) {
    effect.element.setOpacity(effect.options.from).show(); 
  }}, arguments[1] || {});
  return new Effect.Opacity(element,options);
}

Effect.Puff = function(element) {
  element = $(element);
  var oldStyle = { 
    opacity: element.getInlineOpacity(), 
    position: element.getStyle('position'),
    top:  element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height
  };
  return new Effect.Parallel(
   [ new Effect.Scale(element, 200, 
      { sync: true, scaleFromCenter: true, scaleContent: true, restoreAfterFinish: true }), 
     new Effect.Opacity(element, { sync: true, to: 0.0 } ) ], 
     Object.extend({ duration: 1.0, 
      beforeSetupInternal: function(effect) {
        Position.absolutize(effect.effects[0].element)
      },
      afterFinishInternal: function(effect) {

         effect.effects[0].element.hide().setStyle(oldStyle); }
     }, arguments[1] || {})
   );
}

Effect.BlindUp = function(element) {
  element = $(element);
  element.makeClipping();
  return new Effect.Scale(element, 0,
    Object.extend({ scaleContent: false, 
      scaleX: false, 
      restoreAfterFinish: true,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping();
      } 
    }, arguments[1] || {})
  );
}

Effect.BlindDown = function(element) {
  element = $(element);
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({ 
    scaleContent: false, 
    scaleX: false,
    scaleFrom: 0,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makeClipping().setStyle({height: '0px'}).show(); 
    },  
    afterFinishInternal: function(effect) {
      effect.element.undoClipping();
    }
  }, arguments[1] || {}));
}

Effect.SwitchOff = function(element) {
  element = $(element);
  var oldOpacity = element.getInlineOpacity();
  return new Effect.Appear(element, Object.extend({
    duration: 0.4,
    from: 0,
    transition: Effect.Transitions.flicker,
    afterFinishInternal: function(effect) {
      new Effect.Scale(effect.element, 1, { 
        duration: 0.3, scaleFromCenter: true,
        scaleX: false, scaleContent: false, restoreAfterFinish: true,
        beforeSetup: function(effect) { 
          effect.element.makePositioned().makeClipping();
        },
        afterFinishInternal: function(effect) {
          effect.element.hide().undoClipping().undoPositioned().setStyle({opacity: oldOpacity});
        }
      })
    }
  }, arguments[1] || {}));
}

Effect.DropOut = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left'),
    opacity: element.getInlineOpacity() };
  return new Effect.Parallel(
    [ new Effect.Move(element, {x: 0, y: 100, sync: true }), 
      new Effect.Opacity(element, { sync: true, to: 0.0 }) ],
    Object.extend(
      { duration: 0.5,
        beforeSetup: function(effect) {
          effect.effects[0].element.makePositioned(); 
        },
        afterFinishInternal: function(effect) {
          effect.effects[0].element.hide().undoPositioned().setStyle(oldStyle);
        } 
      }, arguments[1] || {}));
}

Effect.Shake = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.getStyle('top'),
    left: element.getStyle('left') };
    return new Effect.Move(element, 
      { x:  20, y: 0, duration: 0.05, afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -40, y: 0, duration: 0.1,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  40, y: 0, duration: 0.1,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -40, y: 0, duration: 0.1,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x:  40, y: 0, duration: 0.1,  afterFinishInternal: function(effect) {
    new Effect.Move(effect.element,
      { x: -20, y: 0, duration: 0.05, afterFinishInternal: function(effect) {
        effect.element.undoPositioned().setStyle(oldStyle);
  }}) }}) }}) }}) }}) }});
}

Effect.SlideDown = function(element) {
  element = $(element).cleanWhitespace();
  // SlideDown need to have the content of the element wrapped in a container element with fixed height!
  var oldInnerBottom = element.down().getStyle('bottom');
  var elementDimensions = element.getDimensions();
  return new Effect.Scale(element, 100, Object.extend({ 
    scaleContent: false, 
    scaleX: false, 
    scaleFrom: window.opera ? 0 : 1,
    scaleMode: {originalHeight: elementDimensions.height, originalWidth: elementDimensions.width},
    restoreAfterFinish: true,
    afterSetup: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if(window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().setStyle({height: '0px'}).show(); 
    },
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' }); 
    },
    afterFinishInternal: function(effect) {
      effect.element.undoClipping().undoPositioned();
      effect.element.down().undoPositioned().setStyle({bottom: oldInnerBottom}); }
    }, arguments[1] || {})
  );
}

Effect.SlideUp = function(element) {
  element = $(element).cleanWhitespace();
  var oldInnerBottom = element.down().getStyle('bottom');
  return new Effect.Scale(element, window.opera ? 0 : 1,
   Object.extend({ scaleContent: false, 
    scaleX: false, 
    scaleMode: 'box',
    scaleFrom: 100,
    restoreAfterFinish: true,
    beforeStartInternal: function(effect) {
      effect.element.makePositioned();
      effect.element.down().makePositioned();
      if(window.opera) effect.element.setStyle({top: ''});
      effect.element.makeClipping().show();
    },  
    afterUpdateInternal: function(effect) {
      effect.element.down().setStyle({bottom:
        (effect.dims[0] - effect.element.clientHeight) + 'px' });
    },
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping().undoPositioned().setStyle({bottom: oldInnerBottom});
      effect.element.down().undoPositioned();
    }
   }, arguments[1] || {})
  );
}

// Bug in opera makes the TD containing this element expand for a instance after finish 
Effect.Squish = function(element) {
  return new Effect.Scale(element, window.opera ? 1 : 0, { 
    restoreAfterFinish: true,
    beforeSetup: function(effect) {
      effect.element.makeClipping(); 
    },  
    afterFinishInternal: function(effect) {
      effect.element.hide().undoClipping(); 
    }
  });
}

Effect.Grow = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.full
  }, arguments[1] || {});
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();    
  var initialMoveX, initialMoveY;
  var moveX, moveY;
  
  switch (options.direction) {
    case 'top-left':
      initialMoveX = initialMoveY = moveX = moveY = 0; 
      break;
    case 'top-right':
      initialMoveX = dims.width;
      initialMoveY = moveY = 0;
      moveX = -dims.width;
      break;
    case 'bottom-left':
      initialMoveX = moveX = 0;
      initialMoveY = dims.height;
      moveY = -dims.height;
      break;
    case 'bottom-right':
      initialMoveX = dims.width;
      initialMoveY = dims.height;
      moveX = -dims.width;
      moveY = -dims.height;
      break;
    case 'center':
      initialMoveX = dims.width / 2;
      initialMoveY = dims.height / 2;
      moveX = -dims.width / 2;
      moveY = -dims.height / 2;
      break;
  }
  
  return new Effect.Move(element, {
    x: initialMoveX,
    y: initialMoveY,
    duration: 0.01, 
    beforeSetup: function(effect) {
      effect.element.hide().makeClipping().makePositioned();
    },
    afterFinishInternal: function(effect) {
      new Effect.Parallel(
        [ new Effect.Opacity(effect.element, { sync: true, to: 1.0, from: 0.0, transition: options.opacityTransition }),
          new Effect.Move(effect.element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition }),
          new Effect.Scale(effect.element, 100, {
            scaleMode: { originalHeight: dims.height, originalWidth: dims.width }, 
            sync: true, scaleFrom: window.opera ? 1 : 0, transition: options.scaleTransition, restoreAfterFinish: true})
        ], Object.extend({
             beforeSetup: function(effect) {
               effect.effects[0].element.setStyle({height: '0px'}).show(); 
             },
             afterFinishInternal: function(effect) {
               effect.effects[0].element.undoClipping().undoPositioned().setStyle(oldStyle); 
             }
           }, options)
      )
    }
  });
}

Effect.Shrink = function(element) {
  element = $(element);
  var options = Object.extend({
    direction: 'center',
    moveTransition: Effect.Transitions.sinoidal,
    scaleTransition: Effect.Transitions.sinoidal,
    opacityTransition: Effect.Transitions.none
  }, arguments[1] || {});
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    height: element.style.height,
    width: element.style.width,
    opacity: element.getInlineOpacity() };

  var dims = element.getDimensions();
  var moveX, moveY;
  
  switch (options.direction) {
    case 'top-left':
      moveX = moveY = 0;
      break;
    case 'top-right':
      moveX = dims.width;
      moveY = 0;
      break;
    case 'bottom-left':
      moveX = 0;
      moveY = dims.height;
      break;
    case 'bottom-right':
      moveX = dims.width;
      moveY = dims.height;
      break;
    case 'center':  
      moveX = dims.width / 2;
      moveY = dims.height / 2;
      break;
  }
  
  return new Effect.Parallel(
    [ new Effect.Opacity(element, { sync: true, to: 0.0, from: 1.0, transition: options.opacityTransition }),
      new Effect.Scale(element, window.opera ? 1 : 0, { sync: true, transition: options.scaleTransition, restoreAfterFinish: true}),
      new Effect.Move(element, { x: moveX, y: moveY, sync: true, transition: options.moveTransition })
    ], Object.extend({            
         beforeStartInternal: function(effect) {
           effect.effects[0].element.makePositioned().makeClipping(); 
         },
         afterFinishInternal: function(effect) {
           effect.effects[0].element.hide().undoClipping().undoPositioned().setStyle(oldStyle); }
       }, options)
  );
}

Effect.Pulsate = function(element) {
  element = $(element);
  var options    = arguments[1] || {};
  var oldOpacity = element.getInlineOpacity();
  var transition = options.transition || Effect.Transitions.sinoidal;
  var reverser   = function(pos){ return transition(1-Effect.Transitions.pulse(pos, options.pulses)) };
  reverser.bind(transition);
  return new Effect.Opacity(element, 
    Object.extend(Object.extend({  duration: 2.0, from: 0,
      afterFinishInternal: function(effect) { effect.element.setStyle({opacity: oldOpacity}); }
    }, options), {transition: reverser}));
}

Effect.Fold = function(element) {
  element = $(element);
  var oldStyle = {
    top: element.style.top,
    left: element.style.left,
    width: element.style.width,
    height: element.style.height };
  element.makeClipping();
  return new Effect.Scale(element, 5, Object.extend({   
    scaleContent: false,
    scaleX: false,
    afterFinishInternal: function(effect) {
    new Effect.Scale(element, 1, { 
      scaleContent: false, 
      scaleY: false,
      afterFinishInternal: function(effect) {
        effect.element.hide().undoClipping().setStyle(oldStyle);
      } });
  }}, arguments[1] || {}));
};

Effect.Morph = Class.create();
Object.extend(Object.extend(Effect.Morph.prototype, Effect.Base.prototype), {
  initialize: function(element) {
    this.element = $(element);
    if(!this.element) throw(Effect._elementDoesNotExistError);
    var options = Object.extend({
      style: {}
    }, arguments[1] || {});
    if (typeof options.style == 'string') {
      if(options.style.indexOf(':') == -1) {
        var cssText = '', selector = '.' + options.style;
        $A(document.styleSheets).reverse().each(function(styleSheet) {
          if (styleSheet.cssRules) cssRules = styleSheet.cssRules;
          else if (styleSheet.rules) cssRules = styleSheet.rules;
          $A(cssRules).reverse().each(function(rule) {
            if (selector == rule.selectorText) {
              cssText = rule.style.cssText;
              throw $break;
            }
          });
          if (cssText) throw $break;
        });
        this.style = cssText.parseStyle();
        options.afterFinishInternal = function(effect){
          effect.element.addClassName(effect.options.style);
          effect.transforms.each(function(transform) {
            if(transform.style != 'opacity')
              effect.element.style[transform.style.camelize()] = '';
          });
        }
      } else this.style = options.style.parseStyle();
    } else this.style = $H(options.style)
    this.start(options);
  },
  setup: function(){
    function parseColor(color){
      if(!color || ['rgba(0, 0, 0, 0)','transparent'].include(color)) color = '#ffffff';
      color = color.parseColor();
      return $R(0,2).map(function(i){
        return parseInt( color.slice(i*2+1,i*2+3), 16 ) 
      });
    }
    this.transforms = this.style.map(function(pair){
      var property = pair[0].underscore().dasherize(), value = pair[1], unit = null;

      if(value.parseColor('#zzzzzz') != '#zzzzzz') {
        value = value.parseColor();
        unit  = 'color';
      } else if(property == 'opacity') {
        value = parseFloat(value);
        if(/MSIE/.test(navigator.userAgent) && !window.opera && (!this.element.currentStyle.hasLayout))
          this.element.setStyle({zoom: 1});
      } else if(Element.CSS_LENGTH.test(value)) 
        var components = value.match(/^([\+\-]?[0-9\.]+)(.*)$/),
          value = parseFloat(components[1]), unit = (components.length == 3) ? components[2] : null;

      var originalValue = this.element.getStyle(property);
      return $H({ 
        style: property, 
        originalValue: unit=='color' ? parseColor(originalValue) : parseFloat(originalValue || 0), 
        targetValue: unit=='color' ? parseColor(value) : value,
        unit: unit
      });
    }.bind(this)).reject(function(transform){
      return (
        (transform.originalValue == transform.targetValue) ||
        (
          transform.unit != 'color' &&
          (isNaN(transform.originalValue) || isNaN(transform.targetValue))
        )
      )
    });
  },
  update: function(position) {
    var style = $H(), value = null;
    this.transforms.each(function(transform){
      value = transform.unit=='color' ?
        $R(0,2).inject('#',function(m,v,i){
          return m+(Math.round(transform.originalValue[i]+
            (transform.targetValue[i] - transform.originalValue[i])*position)).toColorPart() }) : 
        transform.originalValue + Math.round(
          ((transform.targetValue - transform.originalValue) * position) * 1000)/1000 + transform.unit;
      style[transform.style] = value;
    });
    this.element.setStyle(style);
  }
});

Effect.Transform = Class.create();
Object.extend(Effect.Transform.prototype, {
  initialize: function(tracks){
    this.tracks  = [];
    this.options = arguments[1] || {};
    this.addTracks(tracks);
  },
  addTracks: function(tracks){
    tracks.each(function(track){
      var data = $H(track).values().first();
      this.tracks.push($H({
        ids:     $H(track).keys().first(),
        effect:  Effect.Morph,
        options: { style: data }
      }));
    }.bind(this));
    return this;
  },
  play: function(){
    return new Effect.Parallel(
      this.tracks.map(function(track){
        var elements = [$(track.ids) || $$(track.ids)].flatten();
        return elements.map(function(e){ return new track.effect(e, Object.extend({ sync:true }, track.options)) });
      }).flatten(),
      this.options
    );
  }
});

Element.CSS_PROPERTIES = $w(
  'backgroundColor backgroundPosition borderBottomColor borderBottomStyle ' + 
  'borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth ' +
  'borderRightColor borderRightStyle borderRightWidth borderSpacing ' +
  'borderTopColor borderTopStyle borderTopWidth bottom clip color ' +
  'fontSize fontWeight height left letterSpacing lineHeight ' +
  'marginBottom marginLeft marginRight marginTop markerOffset maxHeight '+
  'maxWidth minHeight minWidth opacity outlineColor outlineOffset ' +
  'outlineWidth paddingBottom paddingLeft paddingRight paddingTop ' +
  'right textIndent top width wordSpacing zIndex');
  
Element.CSS_LENGTH = /^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;

String.prototype.parseStyle = function(){
  var element = Element.extend(document.createElement('div'));
  element.innerHTML = '<div style="' + this + '"></div>';
  var style = element.down().style, styleRules = $H();
  
  Element.CSS_PROPERTIES.each(function(property){
    if(style[property]) styleRules[property] = style[property]; 
  });
  if(/MSIE/.test(navigator.userAgent) && !window.opera && this.indexOf('opacity') > -1) {
    styleRules.opacity = this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1];
  }
  return styleRules;
};

Element.morph = function(element, style) {
  new Effect.Morph(element, Object.extend({ style: style }, arguments[2] || {}));
  return element;
};

['setOpacity','getOpacity','getInlineOpacity','forceRerendering','setContentZoom',
 'collectTextNodes','collectTextNodesIgnoreClass','morph'].each( 
  function(f) { Element.Methods[f] = Element[f]; }
);

Element.Methods.visualEffect = function(element, effect, options) {
  s = effect.gsub(/_/, '-').camelize();
  effect_class = s.charAt(0).toUpperCase() + s.substring(1);
  new Effect[effect_class](element, options);
  return $(element);
};

Element.addMethods();
//=======EFFECTS ENDS HERE=============

//=======CONTROLS STARTS HERE===================
// script.aculo.us controls.js v1.7.0, Fri Jan 19 19:16:36 CET 2007

// Copyright (c) 2005, 2006 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us)
//           (c) 2005, 2006 Ivan Krstic (http://blogs.law.harvard.edu/ivan)
//           (c) 2005, 2006 Jon Tirsen (http://www.tirsen.com)
// Contributors:
//  Richard Livsey
//  Rahul Bhargava
//  Rob Wills
// 
// script.aculo.us is freely distributable under the terms of an MIT-style license.
// For details, see the script.aculo.us web site: http://script.aculo.us/

// Autocompleter.Base handles all the autocompletion functionality 
// that's independent of the data source for autocompletion. This
// includes drawing the autocompletion menu, observing keyboard
// and mouse events, and similar.
//
// Specific autocompleters need to provide, at the very least, 
// a getUpdatedChoices function that will be invoked every time
// the text inside the monitored textbox changes. This method 
// should get the text for which to provide autocompletion by
// invoking this.getToken(), NOT by directly accessing
// this.element.value. This is to allow incremental tokenized
// autocompletion. Specific auto-completion logic (AJAX, etc)
// belongs in getUpdatedChoices.
//
// Tokenized incremental autocompletion is enabled automatically
// when an autocompleter is instantiated with the 'tokens' option
// in the options parameter, e.g.:
// new Ajax.Autocompleter('id','upd', '/url/', { tokens: ',' });
// will incrementally autocomplete with a comma as the token.
// Additionally, ',' in the above example can be replaced with
// a token array, e.g. { tokens: [',', '\n'] } which
// enables autocompletion on multiple tokens. This is most 
// useful when one of the tokens is \n (a newline), as it 
// allows smart autocompletion after linebreaks.

if(typeof Effect == 'undefined')
  throw("controls.js requires including script.aculo.us' effects.js library");

var Autocompleter = {}
Autocompleter.Base = function() {};
Autocompleter.Base.prototype = {
  baseInitialize: function(element, update, options) {
    this.element     = $(element); 
    this.update      = $(update);  
    this.hasFocus    = false; 
    this.changed     = false; 
    this.active      = false; 
    this.index       = 0;     
    this.entryCount  = 0;

    if(this.setOptions)
      this.setOptions(options);
    else
      this.options = options || {};

    this.options.paramName    = this.options.paramName || this.element.name;
    this.options.tokens       = this.options.tokens || [];
    this.options.frequency    = this.options.frequency || 0.4;
    this.options.minChars     = this.options.minChars || 1;
    this.options.onShow       = this.options.onShow || 
      function(element, update){ 
        if(!update.style.position || update.style.position=='absolute') {
          update.style.position = 'absolute';
          Position.clone(element, update, {
            setHeight: false, 
            offsetTop: element.offsetHeight
          });
        }
        Effect.Appear(update,{duration:0.15});
      };
    this.options.onHide = this.options.onHide || 
      function(element, update){ new Effect.Fade(update,{duration:0.15}) };

    if(typeof(this.options.tokens) == 'string') 
      this.options.tokens = new Array(this.options.tokens);

    this.observer = null;
    
    this.element.setAttribute('autocomplete','off');

    Element.hide(this.update);

    Event.observe(this.element, "blur", this.onBlur.bindAsEventListener(this));
    Event.observe(this.element, "keypress", this.onKeyPress.bindAsEventListener(this));
  },

  show: function() {
    if(Element.getStyle(this.update, 'display')=='none') this.options.onShow(this.element, this.update);
    if(!this.iefix && 
      (navigator.appVersion.indexOf('MSIE')>0) &&
      (navigator.userAgent.indexOf('Opera')<0) &&
      (Element.getStyle(this.update, 'position')=='absolute')) {
      new Insertion.After(this.update, 
       '<iframe id="' + this.update.id + '_iefix" '+
       'style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" ' +
       'src="javascript:false;" frameborder="0" scrolling="no"></iframe>');
      this.iefix = $(this.update.id+'_iefix');
    }
    if(this.iefix) setTimeout(this.fixIEOverlapping.bind(this), 50);
  },
  
  fixIEOverlapping: function() {
    Position.clone(this.update, this.iefix, {setTop:(!this.update.style.height)});
    this.iefix.style.zIndex = 1;
    this.update.style.zIndex = 2;
    Element.show(this.iefix);
  },

  hide: function() {
    this.stopIndicator();
    if(Element.getStyle(this.update, 'display')!='none') this.options.onHide(this.element, this.update);
    if(this.iefix) Element.hide(this.iefix);
  },

  startIndicator: function() {
    if(this.options.indicator) Element.show(this.options.indicator);
  },

  stopIndicator: function() {
    if(this.options.indicator) Element.hide(this.options.indicator);
  },

  onKeyPress: function(event) {
    if(this.active)
      switch(event.keyCode) {
       case Event.KEY_TAB:
       case Event.KEY_RETURN:
         this.selectEntry();
         Event.stop(event);
       case Event.KEY_ESC:
         this.hide();
         this.active = false;
         Event.stop(event);
         return;
       case Event.KEY_LEFT:
       case Event.KEY_RIGHT:
         return;
       case Event.KEY_UP:
         this.markPrevious();
         this.render();
         if(navigator.appVersion.indexOf('AppleWebKit')>0) Event.stop(event);
         return;
       case Event.KEY_DOWN:
         this.markNext();
         this.render();
         if(navigator.appVersion.indexOf('AppleWebKit')>0) Event.stop(event);
         return;
      }
     else 
       if(event.keyCode==Event.KEY_TAB || event.keyCode==Event.KEY_RETURN || 
         (navigator.appVersion.indexOf('AppleWebKit') > 0 && event.keyCode == 0)) return;

    this.changed = true;
    this.hasFocus = true;

    if(this.observer) clearTimeout(this.observer);
      this.observer = 
        setTimeout(this.onObserverEvent.bind(this), this.options.frequency*1000);
  },

  activate: function() {
    this.changed = false;
    this.hasFocus = true;
    this.getUpdatedChoices();
  },

  onHover: function(event) {
    var element = Event.findElement(event, 'LI');
    if(this.index != element.autocompleteIndex) 
    {
        this.index = element.autocompleteIndex;
        this.render();
    }
    Event.stop(event);
  },
  
  onClick: function(event) {
    var element = Event.findElement(event, 'LI');
    this.index = element.autocompleteIndex;
    this.selectEntry();
    this.hide();
  },
  
  onBlur: function(event) {
    // needed to make click events working
    setTimeout(this.hide.bind(this), 250);
    this.hasFocus = false;
    this.active = false;     
  }, 
  
  render: function() {
    if(this.entryCount > 0) {
      for (var i = 0; i < this.entryCount; i++)
        this.index==i ? 
          Element.addClassName(this.getEntry(i),"selected") : 
          Element.removeClassName(this.getEntry(i),"selected");
        
      if(this.hasFocus) { 
        this.show();
        this.active = true;
      }
    } else {
      this.active = false;
      this.hide();
    }
  },
  
  markPrevious: function() {
    if(this.index > 0) this.index--
      else this.index = this.entryCount-1;
    this.getEntry(this.index).scrollIntoView(true);
  },
  
  markNext: function() {
    if(this.index < this.entryCount-1) this.index++
      else this.index = 0;
    this.getEntry(this.index).scrollIntoView(false);
  },
  
  getEntry: function(index) {
    return this.update.firstChild.childNodes[index];
  },
  
  getCurrentEntry: function() {
    return this.getEntry(this.index);
  },
  
  selectEntry: function() {
    this.active = false;
    this.updateElement(this.getCurrentEntry());
  },

  updateElement: function(selectedElement) {
    if (this.options.updateElement) {
      this.options.updateElement(selectedElement);
      return;
    }
    var value = '';
    if (this.options.select) {
      var nodes = document.getElementsByClassName(this.options.select, selectedElement) || [];
      if(nodes.length>0) value = Element.collectTextNodes(nodes[0], this.options.select);
    } else
      value = Element.collectTextNodesIgnoreClass(selectedElement, 'informal');
    
    var lastTokenPos = this.findLastToken();
    if (lastTokenPos != -1) {
      var newValue = this.element.value.substr(0, lastTokenPos + 1);
      var whitespace = this.element.value.substr(lastTokenPos + 1).match(/^\s+/);
      if (whitespace)
        newValue += whitespace[0];
      this.element.value = newValue + value;
    } else {
      this.element.value = value;
    }
    this.element.focus();
    
    if (this.options.afterUpdateElement)
      this.options.afterUpdateElement(this.element, selectedElement);
  },

  updateChoices: function(choices) {
    if(!this.changed && this.hasFocus) {
      this.update.innerHTML = choices;
      Element.cleanWhitespace(this.update);
      Element.cleanWhitespace(this.update.down());

      if(this.update.firstChild && this.update.down().childNodes) {
        this.entryCount = 
          this.update.down().childNodes.length;
        for (var i = 0; i < this.entryCount; i++) {
          var entry = this.getEntry(i);
          entry.autocompleteIndex = i;
          this.addObservers(entry);
        }
      } else { 
        this.entryCount = 0;
      }

      this.stopIndicator();
      this.index = 0;
      
      if(this.entryCount==1 && this.options.autoSelect) {
        this.selectEntry();
        this.hide();
      } else {
        this.render();
      }
    }
  },

  addObservers: function(element) {
    Event.observe(element, "mouseover", this.onHover.bindAsEventListener(this));
    Event.observe(element, "click", this.onClick.bindAsEventListener(this));
  },

  onObserverEvent: function() {
    this.changed = false;   
    if(this.getToken().length>=this.options.minChars) {
      this.startIndicator();
      this.getUpdatedChoices();
    } else {
      this.active = false;
      this.hide();
    }
  },

  getToken: function() {
    var tokenPos = this.findLastToken();
    if (tokenPos != -1)
      var ret = this.element.value.substr(tokenPos + 1).replace(/^\s+/,'').replace(/\s+$/,'');
    else
      var ret = this.element.value;

    return /\n/.test(ret) ? '' : ret;
  },

  findLastToken: function() {
    var lastTokenPos = -1;

    for (var i=0; i<this.options.tokens.length; i++) {
      var thisTokenPos = this.element.value.lastIndexOf(this.options.tokens[i]);
      if (thisTokenPos > lastTokenPos)
        lastTokenPos = thisTokenPos;
    }
    return lastTokenPos;
  }
}

Ajax.Autocompleter = Class.create();
Object.extend(Object.extend(Ajax.Autocompleter.prototype, Autocompleter.Base.prototype), {
  initialize: function(element, update, url, options) {
    this.baseInitialize(element, update, options);
    this.options.asynchronous  = true;
    this.options.onComplete    = this.onComplete.bind(this);
    this.options.defaultParams = this.options.parameters || null;
    this.url                   = url;
  },

  getUpdatedChoices: function() {
    entry = encodeURIComponent(this.options.paramName) + '=' + 
      encodeURIComponent(this.getToken());

    this.options.parameters = this.options.callback ?
      this.options.callback(this.element, entry) : entry;

    if(this.options.defaultParams) 
      this.options.parameters += '&' + this.options.defaultParams;

    new Ajax.Request(this.url, this.options);
  },

  onComplete: function(request) {
    this.updateChoices(request.responseText);
  }

});

// The local array autocompleter. Used when you'd prefer to
// inject an array of autocompletion options into the page, rather
// than sending out Ajax queries, which can be quite slow sometimes.
//
// The constructor takes four parameters. The first two are, as usual,
// the id of the monitored textbox, and id of the autocompletion menu.
// The third is the array you want to autocomplete from, and the fourth
// is the options block.
//
// Extra local autocompletion options:
// - choices - How many autocompletion choices to offer
//
// - partialSearch - If false, the autocompleter will match entered
//                    text only at the beginning of strings in the 
//                    autocomplete array. Defaults to true, which will
//                    match text at the beginning of any *word* in the
//                    strings in the autocomplete array. If you want to
//                    search anywhere in the string, additionally set
//                    the option fullSearch to true (default: off).
//
// - fullSsearch - Search anywhere in autocomplete array strings.
//
// - partialChars - How many characters to enter before triggering
//                   a partial match (unlike minChars, which defines
//                   how many characters are required to do any match
//                   at all). Defaults to 2.
//
// - ignoreCase - Whether to ignore case when autocompleting.
//                 Defaults to true.
//
// It's possible to pass in a custom function as the 'selector' 
// option, if you prefer to write your own autocompletion logic.
// In that case, the other options above will not apply unless
// you support them.

Autocompleter.Local = Class.create();
Autocompleter.Local.prototype = Object.extend(new Autocompleter.Base(), {
  initialize: function(element, update, array, options) {
    this.baseInitialize(element, update, options);
    this.options.array = array;
  },

  getUpdatedChoices: function() {
    this.updateChoices(this.options.selector(this));
  },

  setOptions: function(options) {
    this.options = Object.extend({
      choices: 10,
      partialSearch: true,
      partialChars: 2,
      ignoreCase: true,
      fullSearch: false,
      selector: function(instance) {
        var ret       = []; // Beginning matches
        var partial   = []; // Inside matches
        var entry     = instance.getToken();
        var count     = 0;

        for (var i = 0; i < instance.options.array.length &&  
          ret.length < instance.options.choices ; i++) { 

          var elem = instance.options.array[i];
          var foundPos = instance.options.ignoreCase ? 
            elem.toLowerCase().indexOf(entry.toLowerCase()) : 
            elem.indexOf(entry);

          while (foundPos != -1) {
            if (foundPos == 0 && elem.length != entry.length) { 
              ret.push("<li><strong>" + elem.substr(0, entry.length) + "</strong>" + 
                elem.substr(entry.length) + "</li>");
              break;
            } else if (entry.length >= instance.options.partialChars && 
              instance.options.partialSearch && foundPos != -1) {
              if (instance.options.fullSearch || /\s/.test(elem.substr(foundPos-1,1))) {
                partial.push("<li>" + elem.substr(0, foundPos) + "<strong>" +
                  elem.substr(foundPos, entry.length) + "</strong>" + elem.substr(
                  foundPos + entry.length) + "</li>");
                break;
              }
            }

            foundPos = instance.options.ignoreCase ? 
              elem.toLowerCase().indexOf(entry.toLowerCase(), foundPos + 1) : 
              elem.indexOf(entry, foundPos + 1);

          }
        }
        if (partial.length)
          ret = ret.concat(partial.slice(0, instance.options.choices - ret.length))
        return "<ul>" + ret.join('') + "</ul>";
      }
    }, options || {});
  }
});

// AJAX in-place editor
//
// see documentation on http://wiki.script.aculo.us/scriptaculous/show/Ajax.InPlaceEditor

// Use this if you notice weird scrolling problems on some browsers,
// the DOM might be a bit confused when this gets called so do this
// waits 1 ms (with setTimeout) until it does the activation
Field.scrollFreeActivate = function(field) {
  setTimeout(function() {
    Field.activate(field);
  }, 1);
}

Ajax.InPlaceEditor = Class.create();
Ajax.InPlaceEditor.defaultHighlightColor = "#FFFF99";
Ajax.InPlaceEditor.prototype = {
  initialize: function(element, url, options) {
    this.url = url;
    this.element = $(element);

    this.options = Object.extend({
      paramName: "value",


      okButton: true,
      okText: "ok",
      cancelLink: true,
      cancelText: "cancel",
      savingText: "Saving...",
      clickToEditText: "Click to edit",
      okText: "ok",
      rows: 1,
      onComplete: function(transport, element) {
        new Effect.Highlight(element, {startcolor: this.options.highlightcolor});
      },
      onFailure: function(transport) {
        alert("Error communicating with the server: " + transport.responseText.stripTags());
      },
      callback: function(form) {
        return Form.serialize(form);
      },
      handleLineBreaks: true,
      loadingText: 'Loading...',
      savingClassName: 'inplaceeditor-saving',
      loadingClassName: 'inplaceeditor-loading',
      formClassName: 'inplaceeditor-form',
      highlightcolor: Ajax.InPlaceEditor.defaultHighlightColor,
      highlightendcolor: "#FFFFFF",
      externalControl: null,
      submitOnBlur: false,
      ajaxOptions: {},
      evalScripts: false
    }, options || {});

    if(!this.options.formId && this.element.id) {
      this.options.formId = this.element.id + "-inplaceeditor";
      if ($(this.options.formId)) {
        // there's already a form with that name, don't specify an id
        this.options.formId = null;
      }
    }
    
    if (this.options.externalControl) {
      this.options.externalControl = $(this.options.externalControl);
    }
    
    this.originalBackground = Element.getStyle(this.element, 'background-color');
    if (!this.originalBackground) {
      this.originalBackground = "transparent";
    }
    
    this.element.title = this.options.clickToEditText;
    
    this.onclickListener = this.enterEditMode.bindAsEventListener(this);
    this.mouseoverListener = this.enterHover.bindAsEventListener(this);
    this.mouseoutListener = this.leaveHover.bindAsEventListener(this);
    Event.observe(this.element, 'click', this.onclickListener);
    Event.observe(this.element, 'mouseover', this.mouseoverListener);
    Event.observe(this.element, 'mouseout', this.mouseoutListener);
    if (this.options.externalControl) {
      Event.observe(this.options.externalControl, 'click', this.onclickListener);
      Event.observe(this.options.externalControl, 'mouseover', this.mouseoverListener);
      Event.observe(this.options.externalControl, 'mouseout', this.mouseoutListener);
    }
  },
  enterEditMode: function(evt) {
    if (this.saving) return;
    if (this.editing) return;
    this.editing = true;
    this.onEnterEditMode();
    if (this.options.externalControl) {
      Element.hide(this.options.externalControl);
    }
    Element.hide(this.element);
    this.createForm();
    this.element.parentNode.insertBefore(this.form, this.element);
    if (!this.options.loadTextURL) Field.scrollFreeActivate(this.editField);
    // stop the event to avoid a page refresh in Safari
    if (evt) {
      Event.stop(evt);
    }
    return false;
  },
  createForm: function() {
    this.form = document.createElement("form");
    this.form.id = this.options.formId;
    Element.addClassName(this.form, this.options.formClassName)
    this.form.onsubmit = this.onSubmit.bind(this);

    this.createEditField();

    if (this.options.textarea) {
      var br = document.createElement("br");
      this.form.appendChild(br);
    }

    if (this.options.okButton) {
      okButton = document.createElement("input");
      okButton.type = "submit";
      okButton.value = this.options.okText;
      okButton.className = 'editor_ok_button';
      this.form.appendChild(okButton);
    }

    if (this.options.cancelLink) {
      cancelLink = document.createElement("a");
      cancelLink.href = "#";
      cancelLink.appendChild(document.createTextNode(this.options.cancelText));
      cancelLink.onclick = this.onclickCancel.bind(this);
      cancelLink.className = 'editor_cancel';      
      this.form.appendChild(cancelLink);
    }
  },
  hasHTMLLineBreaks: function(string) {
    if (!this.options.handleLineBreaks) return false;
    return string.match(/<br/i) || string.match(/<p>/i);
  },
  convertHTMLLineBreaks: function(string) {

    return string.replace(/<br>/gi, "\n").replace(/<br\/>/gi, "\n").replace(/<\/p>/gi, "\n").replace(/<p>/gi, "");
  },
  createEditField: function() {
    var text;
    if(this.options.loadTextURL) {
      text = this.options.loadingText;
    } else {
      text = this.getText();
    }

    var obj = this;
    
    if (this.options.rows == 1 && !this.hasHTMLLineBreaks(text)) {
      this.options.textarea = false;
      var textField = document.createElement("input");
      textField.obj = this;
      textField.type = "text";
      textField.name = this.options.paramName;
      textField.value = text;
      textField.style.backgroundColor = this.options.highlightcolor;
      textField.className = 'editor_field';
      var size = this.options.size || this.options.cols || 0;
      if (size != 0) textField.size = size;
      if (this.options.submitOnBlur)
        textField.onblur = this.onSubmit.bind(this);
      this.editField = textField;
    } else {
      this.options.textarea = true;
      var textArea = document.createElement("textarea");
      textArea.obj = this;
      textArea.name = this.options.paramName;
      textArea.value = this.convertHTMLLineBreaks(text);
      textArea.rows = this.options.rows;
      textArea.cols = this.options.cols || 40;
      textArea.className = 'editor_field';      
      if (this.options.submitOnBlur)
        textArea.onblur = this.onSubmit.bind(this);
      this.editField = textArea;
    }
    
    if(this.options.loadTextURL) {
      this.loadExternalText();
    }
    this.form.appendChild(this.editField);
  },
  getText: function() {
    return this.element.innerHTML;
  },
  loadExternalText: function() {
    Element.addClassName(this.form, this.options.loadingClassName);
    this.editField.disabled = true;
    new Ajax.Request(
      this.options.loadTextURL,
      Object.extend({
        asynchronous: true,
        onComplete: this.onLoadedExternalText.bind(this)
      }, this.options.ajaxOptions)
    );
  },
  onLoadedExternalText: function(transport) {
    Element.removeClassName(this.form, this.options.loadingClassName);
    this.editField.disabled = false;
    this.editField.value = transport.responseText.stripTags();
    Field.scrollFreeActivate(this.editField);
  },
  onclickCancel: function() {
    this.onComplete();
    this.leaveEditMode();
    return false;
  },
  onFailure: function(transport) {
    this.options.onFailure(transport);
    if (this.oldInnerHTML) {
      this.element.innerHTML = this.oldInnerHTML;
      this.oldInnerHTML = null;
    }
    return false;
  },
  onSubmit: function() {
    // onLoading resets these so we need to save them away for the Ajax call
    var form = this.form;
    var value = this.editField.value;
    
    // do this first, sometimes the ajax call returns before we get a chance to switch on Saving...
    // which means this will actually switch on Saving... *after* we've left edit mode causing Saving...
    // to be displayed indefinitely
    this.onLoading();
    
    if (this.options.evalScripts) {
      new Ajax.Request(
        this.url, Object.extend({
          parameters: this.options.callback(form, value),
          onComplete: this.onComplete.bind(this),
          onFailure: this.onFailure.bind(this),
          asynchronous:true, 
          evalScripts:true
        }, this.options.ajaxOptions));
    } else  {
      new Ajax.Updater(
        { success: this.element,
          // don't update on failure (this could be an option)
          failure: null }, 
        this.url, Object.extend({
          parameters: this.options.callback(form, value),
          onComplete: this.onComplete.bind(this),
          onFailure: this.onFailure.bind(this)
        }, this.options.ajaxOptions));
    }
    // stop the event to avoid a page refresh in Safari
    if (arguments.length > 1) {
      Event.stop(arguments[0]);
    }
    return false;
  },
  onLoading: function() {
    this.saving = true;
    this.removeForm();
    this.leaveHover();
    this.showSaving();
  },
  showSaving: function() {
    this.oldInnerHTML = this.element.innerHTML;
    this.element.innerHTML = this.options.savingText;
    Element.addClassName(this.element, this.options.savingClassName);
    this.element.style.backgroundColor = this.originalBackground;
    Element.show(this.element);
  },
  removeForm: function() {
    if(this.form) {
      if (this.form.parentNode) Element.remove(this.form);
      this.form = null;
    }
  },
  enterHover: function() {
    if (this.saving) return;
    this.element.style.backgroundColor = this.options.highlightcolor;
    if (this.effect) {
      this.effect.cancel();
    }
    Element.addClassName(this.element, this.options.hoverClassName)
  },
  leaveHover: function() {
    if (this.options.backgroundColor) {
      this.element.style.backgroundColor = this.oldBackground;
    }
    Element.removeClassName(this.element, this.options.hoverClassName)
    if (this.saving) return;
    this.effect = new Effect.Highlight(this.element, {
      startcolor: this.options.highlightcolor,
      endcolor: this.options.highlightendcolor,
      restorecolor: this.originalBackground
    });
  },
  leaveEditMode: function() {
    Element.removeClassName(this.element, this.options.savingClassName);
    this.removeForm();
    this.leaveHover();
    this.element.style.backgroundColor = this.originalBackground;
    Element.show(this.element);
    if (this.options.externalControl) {
      Element.show(this.options.externalControl);
    }
    this.editing = false;
    this.saving = false;
    this.oldInnerHTML = null;
    this.onLeaveEditMode();
  },
  onComplete: function(transport) {
    this.leaveEditMode();
    this.options.onComplete.bind(this)(transport, this.element);
  },
  onEnterEditMode: function() {},
  onLeaveEditMode: function() {},
  dispose: function() {
    if (this.oldInnerHTML) {
      this.element.innerHTML = this.oldInnerHTML;
    }
    this.leaveEditMode();
    Event.stopObserving(this.element, 'click', this.onclickListener);
    Event.stopObserving(this.element, 'mouseover', this.mouseoverListener);
    Event.stopObserving(this.element, 'mouseout', this.mouseoutListener);
    if (this.options.externalControl) {
      Event.stopObserving(this.options.externalControl, 'click', this.onclickListener);
      Event.stopObserving(this.options.externalControl, 'mouseover', this.mouseoverListener);
      Event.stopObserving(this.options.externalControl, 'mouseout', this.mouseoutListener);
    }
  }
};

Ajax.InPlaceCollectionEditor = Class.create();
Object.extend(Ajax.InPlaceCollectionEditor.prototype, Ajax.InPlaceEditor.prototype);
Object.extend(Ajax.InPlaceCollectionEditor.prototype, {
  createEditField: function() {
    if (!this.cached_selectTag) {
      var selectTag = document.createElement("select");
      var collection = this.options.collection || [];
      var optionTag;
      collection.each(function(e,i) {
        optionTag = document.createElement("option");
        optionTag.value = (e instanceof Array) ? e[0] : e;
        if((typeof this.options.value == 'undefined') && 
          ((e instanceof Array) ? this.element.innerHTML == e[1] : e == optionTag.value)) optionTag.selected = true;
        if(this.options.value==optionTag.value) optionTag.selected = true;
        optionTag.appendChild(document.createTextNode((e instanceof Array) ? e[1] : e));
        selectTag.appendChild(optionTag);
      }.bind(this));
      this.cached_selectTag = selectTag;
    }

    this.editField = this.cached_selectTag;
    if(this.options.loadTextURL) this.loadExternalText();
    this.form.appendChild(this.editField);
    this.options.callback = function(form, value) {
      return "value=" + encodeURIComponent(value);
    }
  }
});

// Delayed observer, like Form.Element.Observer, 
// but waits for delay after last key input
// Ideal for live-search fields

Form.Element.DelayedObserver = Class.create();
Form.Element.DelayedObserver.prototype = {
  initialize: function(element, delay, callback) {
    this.delay     = delay || 0.5;
    this.element   = $(element);
    this.callback  = callback;
    this.timer     = null;
    this.lastValue = $F(this.element); 
    Event.observe(this.element,'keyup',this.delayedListener.bindAsEventListener(this));
  },
  delayedListener: function(event) {
    if(this.lastValue == $F(this.element)) return;
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(this.onTimerEvent.bind(this), this.delay * 1000);
    this.lastValue = $F(this.element);
  },
  onTimerEvent: function() {
    this.timer = null;
    this.callback(this.element, $F(this.element));
  }
};
//=======CONTROLS ENDS HERE=====================

  ];
//        '30248.user.js',
//        '30249.user.js',
//        '30250.user.js'
	  
//      'http://userscripts.org/scripts/source/30248.user.js',
//      'http://userscripts.org/scripts/source/30249.user.js',
//      'http://userscripts.org/scripts/source/30250.user.js'
//        'http://www.iol.ie/~moshea/prototype.js',
//        'http://www.iol.ie/~moshea/effects.js',
//        'http://www.iol.ie/~moshea/controls.js'

      for (i in scripts) {
	var script = document.createElement('script');
	script.src = scripts[i];
	document.getElementsByTagName('head')[0].appendChild(script);
     }
      window.addEventListener('load', function(event) {
	Effect = unsafeWindow['Effect']; 
      }, 'false');
}

//alert('Hello world!');
function MakePagePretty(){
  strTmp = document.body.innerHTML;
	
  strTmp = strTmp.replace(/Government Type<\/a>:(.|\n)*Nation Team<\/a>:<\/td>/, replaceFields(strTmp.match(/Government Type<\/a>:(.|\n)*Nation Team<\/a>:<\/td>/)[0]));

  strTmp = strTmp.replace(/000080/g,tdcolor);
  strTmp = strTmp.replace(/<font color="#FFFFFF">([\d\.-]+)<\/font>/i, "$1");
  strTmp = strTmp.replace(/<font color="white">([\d\.]+)<\/font>/i, "$1");
  
  strTmp = strTmp.replace(/(([A-Za-z ]+:\s*\d,\s*)+)/, "$1" + "<br/>Total: " + NationInfo["ImprovementCount"] + "/" + Math.floor(NationInfo["Citizens"]/1000) + ".");
  
  strTmp = strTmp.replace("Last Donation</a>:", "Car Payment</a>:");
  strTmp = strTmp.replace("Alliance Affiliation</a>:", "AA</a>:");
  strTmp = strTmp.replace("Government Type</a>:", "Government</a>:");
  strTmp = strTmp.replace("National Religion</a>:", "Religion</a>:");
  strTmp = strTmp.replace("Nation Team</a>:", "Team</a>:");
  strTmp = strTmp.replace("Infrastructure</a>:", "Infra</a>:");
  strTmp = strTmp.replace("Area of Influence:", "Land:");
  strTmp = strTmp.replace("War/Peace Preference", "War Mode");
  strTmp = strTmp.replace("Resources</a>:", "Trades</a>:");
  strTmp = strTmp.replace("Connected Resources", "Foreign Trades");
  strTmp = strTmp.replace("Bonus Resources</a>:", "Bonuses</a>:");
  strTmp = strTmp.replace("National Wonders</a>:", "Wonders</a>:");
  strTmp = strTmp.replace("Environment</a>:", "Environ</a>:");
  strTmp = strTmp.replace("Nation Strength</a>:", "NS</a>:");
  strTmp = strTmp.replace("DEFCON Level</a>:", "DEFCON</a>:");
  strTmp = strTmp.replace("Number of Soldiers</a>:", "Soldiers</a>:");
  strTmp = strTmp.replace("Number of Tanks</a>:", "Tanks</a>:");
  strTmp = strTmp.replace("Number of Cruise Missiles</a>:", "CMs</a>:");
  strTmp = strTmp.replace("Number of Nuclear Weapons</a>:", "Nukes</a>:");
  strTmp = strTmp.replace("Number of Soldiers Lost in All Wars.", "Soldiers Lost:");
  strTmp = strTmp.replace("Primary Ethnic Group:", "Ethnic:");
  strTmp = strTmp.replace("Population Happiness</a>:", "Happiness</a>:");
  strTmp = strTmp.replace("Avg. Gross Income Per Individual Per Day:", "Citizen Income Per Day:");
  strTmp = strTmp.replace("Avg. Individual Income Taxes Paid Per Day", "Your Income Per Citizen");
  strTmp = strTmp.replace("Avg. Net Daily Population Income (After Taxes)", "Citizen Income Per Day (After Taxes):");

  document.body.innerHTML = strTmp;
}
function addCommas(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];


  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
function countAmt(str, toFind){
  var count = 0;
  var pos = str.indexOf(toFind);
  while ( pos != -1 ) {
    ++count;
    pos = str.indexOf(toFind,pos+1);
  }
  return count;
}
function getInfra(){
  if (!(document.location.href.match(/infrastructurebuysell.asp/))) { return; }
	/*
  myregexp = new RegExp(/Infrastructure Costs Per Level:<\/td>\n.*\$([\.,0-9]*)/);
  desu = myregexp.exec(document.getElementById("table2").innerHTML);
  if(desu){GM_setValue("InfraCostPerLevel",desu[1].replace(/,/g,""));}
	
  myregexp = new RegExp(/Daily Infrastructure Cost to Maintain.*\n.*\$([\.,0-9]*)/);
  desu = myregexp.exec(document.getElementById("table2").innerHTML);
  if(desu){GM_setValue("InfraUpkeepPerLevel",desu[1].replace(/,/g,""));}
	*/
  document.getElementsByName("purchase_land")[0].value = 10;
}
getInfra();
function getBillsInfo(){
  if (!(document.location.href.match(/pay_bills.asp/))) { return; }
  strTmp = document.body.innerHTML;

  if (desu = strTmp.match(/Daily Soldier Cost \(Per 1 Unit\)<\/td>\n.*\n.*\$([\.,0-9]*)/)){
    GM_setValue("SoldierUpkeep",desu[1].replace(/,/g,""));
  }
  if (desu = strTmp.match(/Missiles Cost \(Per 1 Unit\)<\/td>\n.*\n.*\$([\.,0-9]*)/)){
    GM_setValue("CruiseUpkeep",desu[1].replace(/,/g,""));
  }
  if (desu = strTmp.match(/Daily Nuclear Weapon Cost \(Per 1 Unit\)<\/td>\n.*\n.*\$([\.,0-9]*)/)){
    GM_setValue("NukeUpkeep",desu[1].replace(/,/g,""));
  }
  if (desu = strTmp.match(/Daily Tank Cost \(Per 1 Unit\)<\/td>\n.*\n.*\$([\.,\d]+)/)){
    GM_setValue("TankUpkeep",desu[1].replace(/,/g,""));
  }
  if (desu = strTmp.match(/Improvement Bill<\/td>\n.*\n.*\$([\.,\d]+)/)){
    GM_setValue("ImprovementUpkeep",desu[1].replace(/,/g,""));
  }
  if (desu = strTmp.match(/Total Cost of All Bills<\/i><\/td>.*\n.*\n<i>.*\n.*\n.*\$([\.,0-9]*)<\/i><\/td>/)){
    if (parseFloat(desu[1].replace(/,/g,"")) != 0){
      GM_setValue("LastBills",parseFloat(desu[1].replace(/,/g,"")));
    }
  }
  /*
  if (desu = strTmp.match(/Daily Infrastructure Cost \(Per 1 Unit\)<\/td>\n.*\n.*\$([\.,0-9]*)/)){
  GM_setValue("InfraUpkeepPerLevel",desu[1].replace(/,/g,""));
}
  if (desu = strTmp.match(/Nation Improvements<\/td>\n.*\n[^\d]*(\d+)<\/td>/)){
  GM_setValue("ImprovementNumber",desu[1].replace(/,/g,""));
}
  if (desu = strTmp.match(/National Wonders<\/td>\n.*\n[^\d]*(\d+)<\/td>/)){
  GM_setValue("WonderCount",desu[1].replace(/,/g,""));
}
  if (desu = strTmp.match(/Wonders Bill<\/td>\n.*\n.*\$([\.,\d]+)<\/td>/)){
  GM_setValue("WonderUpkeep",desu[1].replace(/,/g,""));
}
  */
}
getBillsInfo();

function defineTables(){ 
//	if (!(document.location.href.match(/nation_drill_display.asp/))) { return; }
  itable = document.getElementById("table54").nextSibling.nextSibling.nextSibling.nextSibling;
  itable.setAttribute('id','informationtable');
  itable.firstChild.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.setAttribute('id','nationmessages');
}
function pushTrToInformationTable(id,content) //used to push stuff into the information table. needs to have the table defined first.
{
  informationtable = document.getElementById("informationtable");
  var objPushTr = document.createElement("tr"); objPushTr.setAttribute('id',id);	informationtable.appendChild(objPushTr);
  document.getElementById(id).innerHTML = content;
}
function registerEvents(){
  var resCalc = document.getElementById('resourceCalc');
  if(resCalc){resCalc.addEventListener("click", ResourceCalcProcess, true);}
  var resCalcSave = document.getElementById('resourceCalcSave');
  if(resCalcSave){resCalcSave.addEventListener("click", SaveResourceCalcProcess, true);}
  
  
  var div = document.getElementById("improvementswitch");
  div.innerHTML="Improvements [click to display]";
  div.addEventListener('click', function(event) {
    if(div.innerHTML=="Improvements [click to hide]:"){
      Effect.BlindUp('improvementcalc');
      div.innerHTML="Improvements [click to display]";
    }else{
      Effect.BlindDown('improvementcalc');
      div.innerHTML="Improvements [click to hide]:";
    }
  }, false);
  
  var div2 = document.getElementById("billslink"); 
  div2.addEventListener('click', function(event) {
    if (div2.innerHTML=="Click here to hide the bills pie"){
      Effect.Fade('billspie');
      div2.innerHTML = "Click here to show the bills pie";
    } else {
      document.getElementById("billspie").innerHTML = "<img src='"+graphlink+"'/>";
      Effect.Appear('billspie');
      div2.innerHTML = "Click here to hide the bills pie";
    }
    return false;
  }, false);
  
  var div3 = document.getElementById("rsswitch");
  div3.innerHTML="Resource Calculator [click to display]";
  div3.addEventListener('click', function(event) {
    if (div3.innerHTML=="Resource Calculator [click to hide]"){
      Effect.BlindUp('rscalc');
      div3.innerHTML="Resource Calculator [click to display]";
    }else{
      Effect.BlindDown('rscalc');
      div3.innerHTML="Resource Calculator [click to hide]";
    }
  }, false);
  var div4 = document.getElementById("wonderswitch");
  div4.innerHTML="Wonders [click to display]";
  div4.addEventListener('click', function(event) {
    if (div4.innerHTML=="Wonders [click to hide]:"){
      Effect.BlindUp('wondercalc');
      div4.innerHTML="Wonders [click to display]";
    }else{
      Effect.BlindDown('wondercalc');
      div4.innerHTML="Wonders [click to hide]:";
    }
  }, false);
  
  var div5 = document.getElementById('infraswitch');
  div5.innerHTML="Infra Calc [click to display]";
  div5.addEventListener('click', function(event) {
    if (div5.innerHTML=="Infra Calc [click to hide]:"){
      Effect.BlindUp('infracalc');
      div5.innerHTML="Infra Calc [click to display]";
      div5.style.marginTop="0";
    }else{
      Effect.BlindDown('infracalc');
      div5.innerHTML="Infra Calc [click to hide]:";
      div5.style.marginTop="1em";
    }
  }, false);
  
  //Global divs = less DOM stuff.. erk.
  div6 = document.getElementById("currentinfra");
  div7 = document.getElementById("buyingamount");
  div8 = document.getElementById("factorylist");
  div6.addEventListener('keyup', CalcInfraCost, false);
  div7.addEventListener('keyup', CalcInfraCost, false);
  div8.addEventListener('change', CalcInfraCost, false);
  
}
function CalcInfraCost(event){
  var InfraAmount = parseFloat(div6.value.replace(/,/g, ''));
  var AmountBuying = parseFloat(div7.value.replace(/,/g, ''));
  if (AmountBuying >= 10000){
    AmountBuying = 9999.99;
    div7.value = 9999.99;
  }
  var AmtBuyingCopy = AmountBuying;
  
  var InfraReduction = (1-NationInfo["Resources"]["iron"]*.05) * (1-NationInfo["Resources"]["lumber"]*.06) * (1-NationInfo["Resources"]["marble"]*.1) * (1-NationInfo["Resources"]["aluminum"]*.07) * (1-NationInfo["Resources"]["coal"]*.04) * (1-NationInfo["Resources"]["rubber"]*.03) * (1 - div8.selectedIndex*.08);
  if (NationInfo["Tech"] >= 5 && NationInfo["Resources"]["lumber"] && NationInfo["Resources"]["iron"] && NationInfo["Resources"]["marble"] && NationInfo["Resources"]["aluminum"]) InfraReduction *= .95;
  if (NationInfo["Resources"]["coal"] && NationInfo["Resources"]["iron"]) InfraReduction *= .98;
  if (NationInfo["Government"] == "Capitalist" || NationInfo["Government"] == "Dictatorship" || NationInfo["Government"] == "Federal" || NationInfo["Government"] == "Monarchy" || NationInfo["Government"] == "Republic" || NationInfo["Government"] == "Revolutionary") InfraReduction *= .95;
  if (NationInfo["strWonders"].match("Interstate")) InfraReduction *= .92;
  
  var Cost = 0;
  while (AmountBuying > 0){
    var K;
    if (InfraAmount < 20) {K = 1;}
    else if (InfraAmount < 100){K = 12;}
    else if (InfraAmount < 200){K = 15;}
    else if (InfraAmount < 1000){K = 20;}
    else if (InfraAmount < 3000){K = 25;}
    else if (InfraAmount < 4000){K = 30;}
    else if (InfraAmount < 5000){K = 40;}
    else if (InfraAmount < 8000){K = 60;}
    else {K = 70;}
    
    
    var tmpAmount = (AmountBuying > 10) ? 10 : AmountBuying;
    Cost += (500+InfraAmount*K) * InfraReduction * tmpAmount;
    
    AmountBuying -= 10;
    InfraAmount += 10;
  }
  
  document.getElementById("insertinfracost").innerHTML = 'At your specified level of infra, with your current trade/improvement setup, <strong>'+addCommas(AmtBuyingCopy)+'</strong> levels of infrastructure will cost you <strong>$'+addCommas(Math.round(Cost*100)/100)+'</strong> to purchase.';
}
function getPageInfo(){ //Returns an array filled with all the infos you need.
  infoStr = document.getElementById("informationtable").innerHTML;
  var NationInfo = new Array();
  NationInfo["Happiness"] = parseFloat(infoStr.match(/<font color="#FFFFFF">([\d\.-]+)<\/font>/i)[1]);
  NationInfo["TaxRate"] = parseInt(infoStr.match(/<td bgcolor="#FFFFFF">([0-9][0-9])%/i)[1]);
  NationInfo["GrossIncome"] = parseFloat(infoStr.match(/Avg. Gross Income Per Individual Per Day:<\/td>\n.*\$([0-9]*\.[0-9][0-9])/)[1]);
  NationInfo["NetIncome"] = parseFloat(infoStr.match(/Avg. Individual Income Taxes Paid Per Day<\/td>\n.*\$([0-9]*\.[0-9][0-9])/)[1]);
  NationInfo["Citizens"] = parseInt(infoStr.match(/([\-,0-9]*) Working Citizens/)[1].replace(/,/g,""));  
  NationInfo["Soldiers"] = parseInt(infoStr.match(/<i>([\-,0-9]*) \(([\-,0-9]*)\) Soldiers<\/i>/)[2].replace(/,/g,""));
    
  NationInfo["Money"] = parseFloat(infoStr.match(/Current .+ Available:(.|\n)*\$([\-0-9,\.]*)\n/)[2].replace(/,/g,""));
  NationInfo["strImprovements"] = infoStr.match(/Improvements<\/a>:<\/td>\n.*\n(.*)\n<\/td>/)[1];
  NationInfo["Tech"] = parseFloat(infoStr.match(/Technology<\/a>: <\/td>\n<td bgcolor="#ffffff">([0-9,]*\.[0-9]*)/i)[1].replace(/,/g,""));
  NationInfo["NS"] = parseFloat(infoStr.match(/Nation Strength<\/a>:<\/td>\n<td bgcolor="#ffffff">.*\n([,0-9]*[.0-9]*)/)[1].replace(/,/g,""));
  NationInfo["Aircraft"] = parseInt(infoStr.match(/Aircraft<\/a>:<\/td>\n<td bgcolor="#ffffff">.*\n(.*)\n.*<\/td>/)[1]);
  NationInfo["CruiseMissiles"] = parseInt(infoStr.match(/Number of Cruise Missiles<\/a>:<\/td>\n<td bgcolor="#ffffff">(.*)\n/)[1]);
  NationInfo["Tanks"] = parseInt(infoStr.match(/Number of Tanks<\/a>:<\/td>\n<td bgcolor="#ffffff">.*\n(.*)\n.*<\/td>/)[1].replace(/,/g,""));
  NationInfo["Nukes"] = parseInt(infoStr.match(/Number of Nuclear Weapons<\/a>:<\/td>\n<td bgcolor="#ffffff">(.*)/)[1]);
  NationInfo["Infra"] = parseFloat(infoStr.match(/Infrastructure<\/a>:<\/td>\n<td bgcolor="#ffffff">([\-0-9,]*\.[0-9]*)/)[1].replace(/,/g,""));
  NationInfo["strWonders"] = infoStr.match(/National Wonders<\/a>:.*\n.*\n.*\n(.*)/)[1];
  NationInfo["Government"] = infoStr.match(infoStr.match(/images\/government\/(\w+)/)[1]);
  
  NationInfo["strResources"] = "";
  if (desu = infoStr.match(/Connected Resources:<\/td>\n.*\n.*\n<\/td>/)) NationInfo["strResources"] += desu[0];
  if (desu = infoStr.match(/Bonus Resources<\/a>:<\/td>\n.*\n.*\n<\/td>/)) NationInfo["strResources"] += desu[0];
  
  NationInfo["Resources"] = sortThroughResources(NationInfo["strResources"]);
  NationInfo["Improvements"] = sortThroughImprovements(NationInfo["strImprovements"]);

  NationInfo["WonderCount"] = countAmt(NationInfo["strWonders"], ',');
  var impList = NationInfo["strImprovements"].split(',');
  NationInfo["ImprovementCount"] = 0;
  for (i in impList){
    NationInfo["ImprovementCount"] += (desu = impList[i].match(/: (\d)/)) ? parseInt(desu[1]) : 0;
  }
  NationInfo["InfraCost"] = getInfraCost(NationInfo["Resources"], NationInfo["Improvements"]["Factories"], NationInfo["Government"], NationInfo["Tech"], NationInfo["Infra"], NationInfo["strWonders"]);//parseFloat(GM_getValue("InfraCostPerLevel",0)); //Replace with formulaz
  NationInfo["InfraUpkeep"] = getInfraUpkeep(NationInfo["Resources"], NationInfo["Improvements"]["LCs"], NationInfo["Tech"], NationInfo["NS"], NationInfo["Infra"], NationInfo["strWonders"]);//parseFloat(GM_getValue("InfraUpkeepPerLevel",0)); //This one too
	
  NationInfo["NukeUpkeep"] = parseFloat(GM_getValue("NukeUpkeep",0));
  NationInfo["SoldierUpkeep"] = parseFloat(GM_getValue("SoldierUpkeep",0));
  NationInfo["ImprovementUpkeep"] = parseFloat(GM_getValue("ImprovementUpkeep",0));
  NationInfo["CruiseUpkeep"] = parseFloat(GM_getValue("CruiseUpkeep",0));
  NationInfo["TankUpkeep"] = parseFloat(GM_getValue("TankUpkeep",0));
  NationInfo["LastBills"] = parseFloat(GM_getValue("LastBills",0));
  NationInfo["WonderUpkeep"] = 5000;//parseFloat(GM_getValue("WonderUpkeep",0));
  NationInfo["AircraftUpkeep"] = NationInfo["Resources"]["Lead"] ? 150 : 200;
  return NationInfo;
}
function sortThroughResources(strResources){ //returns an array
  arResources = new Array();
  arResources["aluminum"] = (strResources.match("Aluminum")) ? 1 : 0;
  arResources["cattle"] = (strResources.match("Cattle")) ? 1 : 0;
  arResources["coal"] = (strResources.match("Coal")) ? 1 : 0;
  arResources["fish"] = (strResources.match("Fish")) ? 1 : 0;
  arResources["furs"] = (strResources.match("Furs")) ? 1 : 0;
  arResources["gold"] = (strResources.match("Gold")) ? 1 : 0;
  arResources["gems"] = (strResources.match("Gems")) ? 1 : 0;
  arResources["iron"] = (strResources.match("Iron")) ? 1 : 0;
  arResources["lead"] = (strResources.match("Lead")) ? 1 : 0;
  arResources["lumber"] = (strResources.match("Lumber")) ? 1 : 0;
  arResources["marble"] = (strResources.match("Marble")) ? 1 : 0;
  arResources["oil"] = (strResources.match("Oil")) ? 1 : 0;
  arResources["pigs"] = (strResources.match("Pigs")) ? 1 : 0;
  arResources["rubber"] = (strResources.match("Rubber")) ? 1 : 0;
  arResources["silver"] = (strResources.match("Silver")) ? 1 : 0;
  arResources["spices"] = (strResources.match("Spices")) ? 1 : 0;
  arResources["sugar"] = (strResources.match("Sugar")) ? 1 : 0;
  arResources["uranium"] = (strResources.match("Uranium")) ? 1 : 0;
  arResources["water"] = (strResources.match("Water")) ? 1 : 0;
  arResources["wheat"] = (strResources.match("Wheat")) ? 1 : 0;
  arResources["wine"] = (strResources.match("Wine")) ? 1 : 0;
	//bonus resources
  arResources["affluent population"] = (strResources.match("Affluent Population")) ? 1 : 0;
  arResources["asphalt"] = (strResources.match("Asphalt")) ? 1 : 0;
  arResources["automobiles"] = (strResources.match("Automobiles")) ? 1 : 0;
  arResources["beer"] = (strResources.match("Beer")) ? 1 : 0;
  arResources["construction"] = (strResources.match("Construction")) ? 1 : 0;
  arResources["fast food"] = (strResources.match("Fast Food")) ? 1 : 0;
  arResources["fine jewelry"] = (strResources.match("Fine Jewelry")) ? 1 : 0;
  arResources["microchips"] = (strResources.match("Microchips")) ? 1 : 0;
  arResources["radiation cleanup"] = (strResources.match("Radiation Cleanup")) ? 1 : 0;
  arResources["scholars"] = (strResources.match("Scholars")) ? 1 : 0;
  arResources["steel"] = (strResources.match("Steel")) ? 1 : 0;
  return arResources;
}
function sortThroughImprovements(strImprovements){
  arImprovements = new Array();
  arImprovements["Banks"] = (desu = strImprovements.match(/Banks: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["Schools"] = (desu = strImprovements.match(/Schools: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["Harbors"] = (desu = strImprovements.match(/Harbors: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["FMs"] = (desu = strImprovements.match(/Foreign Ministries: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["Unis"] = (desu = strImprovements.match(/Universities: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["Stadiums"] = (desu = strImprovements.match(/Stadiums: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["PHQs"] = (desu = strImprovements.match(/Police Headquarters: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["Churches"] = (desu = strImprovements.match(/Churches: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["Clinics"] = (desu = strImprovements.match(/Clinics: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["Hospitals"] = (desu = strImprovements.match(/Hospitals: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["Factories"] = (desu = strImprovements.match(/Factories: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["LCs"] = (desu = strImprovements.match(/Labor Camps: ([0-9])/)) ? parseInt(desu[1]) : 0;
  arImprovements["IAs"] = (desu = strImprovements.match(/Intelligence Agencies: ([0-9])/)) ? parseInt(desu[1]) : 0;
  //Add any more improvements here if they seem necessary
  return arImprovements;
}
 
function getInfraCost(arRes, intFactories, strGov, intTech, intInfra, strWonders){
  var K;
  if (intInfra < 20) {K = 1;}
  else if (intInfra < 100){K = 12;}
  else if (intInfra < 200){K = 15;}
  else if (intInfra < 1000){K = 20;}
  else if (intInfra < 3000){K = 25;}
  else if (intInfra < 4000){K = 30;}
  else if (intInfra < 5000){K = 40;}
  else if (intInfra < 8000){K = 60;}
  else {K = 70;}
  
  var InfraReduction = (1-arRes["iron"]*.05) * (1-arRes["lumber"]*.06) * (1-arRes["marble"]*.1) * (1-arRes["aluminum"]*.07) * (1-arRes["coal"]*.04) * (1-arRes["rubber"]*.03) * (1 - intFactories*.08);
  if (intTech >= 5 && arRes["lumber"] && arRes["iron"] && arRes["marble"] && arRes["aluminum"]) InfraReduction *= .95;
  if (arRes["coal"] && arRes["iron"]) InfraReduction *= .98;
  if (strWonders.match("Interstate")) InfraReduction *= .92;
  
  if (strGov == "Capitalist" || strGov == "Dictatorship" || strGov == "Federal" || strGov == "Monarchy" || strGov == "Republic" || strGov == "Revolutionary") InfraReduction *= .95;

  return Math.round(((500+intInfra*K) * InfraReduction) * 100)/100;
}
function getInfraUpkeep(arRes, intCamps, intTech, intNS, intInfra, strWonders){
  var K;
  if (intInfra < 100){K = .04;}
  else if (intInfra < 200){K = .05;}
  else if (intInfra < 300){K = .06;}
  else if (intInfra < 500){K = .07;}
  else if (intInfra < 700){K = .08;}
  else if (intInfra < 1000){K = .09;}
  else if (intInfra < 2000){K = .11;}
  else if (intInfra < 3000){K = .13;}
  else if (intInfra < 4000){K = .15;}
  else if (intInfra < 5000){K = .16;}
  else if (intInfra < 8000){K = .1725;}
  else {K = .18;}
  
  var InfraReduction = (1-arRes["lumber"]*.08) * (1-arRes["iron"]*.10) * (1-arRes["uranium"]*.03) * (1-intCamps*.1);
  if (intTech >= 5 && arRes["lumber"] && arRes["iron"] && arRes["marble"] && arRes["aluminum"] && arRes["oil"] && arRes["rubber"]) InfraReduction *= .95;
  if (strWonders.match("Interstate")) InfraReduction *= .92;
  InfraReduction *= 1-((intTech*2)/intNS);

  return Math.round(((20+intInfra*K)* InfraReduction) * 100)/100;
}
function replaceFields(html){
  //*===ITT we create arrays. works better. lawlcopypasta
  var replacing = [
      "Perhaps they do not desire a religion.", "<font color=\"ff0000\">No religion</font>",
      "They cannot make up their minds when it comes to religion.","<font color=\"ff0000\">Mixed</font>",
      "They desire a modern middle eastern religion that focuses on monotheism.", "<font color=\"ff0000\">Baha'i faith</font>",
      "They desire a national religion but do not care to worship a supreme deity.", "<font color=\"ff0000\">Buddhism</font>",
      "They desire to follow a religion that seeks freedom from greed, hatred and delusion, and enlightenment through realizing the Four Noble Truths and following the Eightfold Path.", "<font color=\"ff0000\">Buddhism</font>",
      "The majority of your people desire a religion that worships a divine savior.", "<font color=\"ff0000\">Christianity</font>",
      "They desire a monotheistic system of beliefs and practices based on the Old Testament and the teachings of Jesus Christ as embodied in the New Testament", "<font color=\"ff0000\">Christianity</font>",
      "They desire a Far Eastern philosophical religion emphasizing love for humanity, high value given to learning and to devotion to family and ancestors, peace, justice, and respect for traditional culture.", "<font color=\"ff0000\">Confucianism</font>",
      "They believe in reincarnation and Karma and desire a religion that supports this philosophy.","<font color=\"ff0000\">Hinduism</font>",
      "They wish to worship a supreme being that they call Allah.","<font color=\"ff0000\">Islam</font>",
      /They are primarily non-materialistic and wish for a national religion that supports atheism and that teaches that every single living thing is an individual and eternal soul, called J.va, which is responsible for its own actions\./,"<font color=\"ff0000\">Jainism</font>",
      "They desire a religion that follows divine scriptures.","<font color=\"ff0000\">Judaism</font>",
      "They believe that God is present in all walks of life, both in living and non-living things.","<font color=\"ff0000\">Shinto</font>",
      "They believe in reincarnation and the wish to worship a supreme being that they call Allah.","<font color=\"ff0000\">Sikhism</font>",
      "They do not believe in a single God but instead believe in oneness and freedom from personal desires.","<font color=\"ff0000\">Taoism</font>",
      "They believe in the conjuring of dead spirits and desire a national religion that supports this.","<font color=\"ff0000\">Voodoo</font>",
      "They wish to follow an ancient religion followed by Germanic tribes living in Nordic countries under pre-Christian period.","<font color=\"ff0000\">Norse</font>",
      "They desire a government that will invest heavily in business ventures.","Capitalist.",
      "They desire a government that supports common ownership of all national possessions.","Communist. <br/>Recommended: Monarchy.",
      "They desire a government that makes decisions based on fair elective processes.","Democracy. <br/>Recommended: Monarchy.",
      "They desire a supreme ruler who is in charge of all national matters.","Dictatorship. <br/>Recommended: Monarchy.",
      "They desire a government of strong central powers that will preside over issues such as national defense, disaster relief, and foreign affairs.","Federal Government.",
      "They desire a government of strong central powers that will reside over issues such as national defense, disaster relief, and foreign affairs.","Federal Government.",
      "They wish to be ruled by a royal family.","Monarchy.",
      "They wish to be ruled by the people themselves and more specifically do not want to be ruled by a royal family.","Republic",
      "They desire a government that is based on radical change.","Revolutionary Government. <br/>Recommended: Monarchy.",
      "They desire a government that exercises total control over its subjects.","Totalitarian. <br/>Recommended: Monarchy.",
      "They do not desire a permanent government but instead prefer something more temporary.","Transitional. <br/>Recommended: Monarchy.",
      "They wish to worship a supreme being that they call Allah and follow the teaching of a prophet recorded in their sacred text called the Quran.","Islam",
      /Anarchy - /g,"Anarchy [no bonuses]",
      /Capitalist - /g,"Capitalist [+5% <acronym title='area/land'>ar</acronym>|-5% <acronym title='Inititial Infrastructure Cost'>ic</acronym>]",
      /Communist - /g,"Communist [+5% <acronym title='area/land'>ar</acronym>|+8% <acronym title='Soldier count'>sc</acronym>|-1 <acronym title='Environment'>en</acronym>]",
      /Democracy - /g,"Democracy [+1 <acronym title='Happiness'>hp</acronym>|+8% <acronym title='Soldier count'>sc</acronym>]",
      /Dictatorship - /g,"Dictatorship [+8% <acronym title='Soldier count'>sc</acronym>|-5% <acronym title='Inititial Infrastructure Cost'>ic</acronym>|-2 <acronym title='Environment'>en</acronym>]",
      /Federal Government - /g,"Federal [+8% <acronym title='Soldier count'>sc</acronym>|-5% <acronym title='Inititial Infrastructure Cost'>ic</acronym>|-1 <acronym title='Environment'>en</acronym>]",
      /Monarchy - /g, "Monarchy [+1 <acronym title='Happiness'>hp</acronym>|-5% <acronym title='Inititial Infrastructure Cost'>ic</acronym>]",
      /Republic - /g,"Republic [+5% <acronym title='area/land'>ar</acronym>|-5% <acronym title='Inititial Infrastructure Cost'>ic</acronym>]",
      /Revolutionary Government - /g,"Revolutionary [+1 <acronym title='Happiness'>hp</acronym>|-5% <acronym title='Inititial Infrastructure Cost'>ic</acronym>|-1 <acronym title='Environment'>en</acronym>]",
      /Totalitarian - /g,"Totalitarian [+1 <acronym title='Happiness'>hp</acronym>|+5% <acronym title='area/land'>ar</acronym>|-1 <acronym title='Environment'>en</acronym>]",
      /Transitional - /g,"Transitional [+5% <acronym title='area/land'>ar</acronym>|+8% <acronym title='Soldier count'>sc</acronym>|-2 <acronym title='Environment'>en</acronym>]",      
      "Your people approve of this form of government but the majority of","",
      "your people would prefer something else.","Your people want:",
      "Your people approve of this national religion but the majority of","",
      "your people would prefer something else.","Your people want:"
     ]
	 for (i=0;i<replacing.length;i+=2) { html = html.replace(replacing[i],replacing[i+1]); }
     return html;
}
function buildGraphics(){
  var graphics = new Array();
  graphics["aluminum"] = '<img src="images/resources/aluminum.GIF" alt="[Aluminum]" title="Aluminum">';
  graphics["cattle"] = '<img src="images/resources/cattle.GIF" alt="[Cattle]" title="Cattle">';
  graphics["coal"] = '<img src="images/resources/coal.GIF" alt="[Coal]" title="Coal">';
  graphics["fish"] = '<img src="images/resources/fish.GIF" alt="[Fish]" title="Fish">';
  graphics["furs"] = '<img src="images/resources/furs.GIF" alt="[Furs]" title="Furs">';
  graphics["gold"] = '<img src="images/resources/gold.GIF" alt="[Gold]" title="Gold">';
  graphics["gems"] = '<img src="images/resources/gems.GIF" alt="[Gems]" title="Gems">';
  graphics["iron"] = '<img src="images/resources/iron.GIF" alt="[Iron]" title="Iron">';
  graphics["lead"] = '<img src="images/resources/lead.GIF" alt="[Lead]" title="Lead">';
  graphics["lumber"] = '<img src="images/resources/lumber.GIF" alt="[Lumber]" title="Lumber">';
  graphics["marble"] = '<img src="images/resources/marble.GIF" alt="[Marble]" title="Marble">';
  graphics["oil"] = '<img src="images/resources/oil.GIF" alt="[Oil]" title="Oil">';
  graphics["pigs"] = '<img src="images/resources/pigs.GIF" alt="[Pigs]" title="Pigs">';
  graphics["rubber"] = '<img src="images/resources/rubber.GIF" alt="[Rubber]" title="Rubber">';
  graphics["silver"] = '<img src="images/resources/silver.GIF" alt="[Silver]" title="Silver">';
  graphics["spices"] = '<img src="images/resources/spices.GIF" alt="[Spices]" title="Spices">';
  graphics["sugar"] = '<img src="images/resources/sugar.GIF" alt="[Sugar]" title="Sugar">';
  graphics["uranium"] = '<img src="images/resources/uranium.GIF" alt="[Uranium]" title="Uranium">';
  graphics["water"] = '<img src="images/resources/water.GIF" alt="[Water]" title="Water">';
  graphics["wheat"] = '<img src="images/resources/wheat.GIF" alt="[Wheat]" title="Wheat">';
  graphics["wine"] = '<img src="images/resources/wine.GIF" alt="[Wine]" title="Wine">';
  graphics["affluent population"] = '<img src="images/resources/affluent.GIF" alt="[Affluent Population]" title="Affluent Population">';
  graphics["asphalt"] = '<img src="images/resources/asphalt.GIF" alt="[Asphalt]" title="Asphalt">';
  graphics["automobiles"] = '<img src="images/resources/automobile.GIF" alt="[Automobile]" title="Automobile">';
  graphics["beer"] = '<img src="images/resources/beer.GIF" alt="[Beer]" title="Beer">';
  graphics["construction"] = '<img src="images/resources/construction.GIF" alt="[Construction]" title="Construction">';
  graphics["fast food"] = '<img src="images/resources/fastfood.GIF" alt="[Fast Food]" title="Fast Food">';
  graphics["fine jewelry"] = '<img src="images/resources/jewelry.GIF" alt="[Fine Jewelry]" title="Fine Jewelry">';
  graphics["microchips"] = '<img src="images/resources/microchip.GIF" alt="[Microchip]" title="Microchip">';
  graphics["radiation cleanup"] = '<img src="images/resources/radiation.GIF" alt="[Radiation Cleanup]" title="Radiation Cleanup">';
  graphics["scholars"] = '<img src="images/resources/scholar.GIF" alt="[Scholars]" title="Scholars">';
  graphics["steel"] = '<img src="images/resources/steel.GIF" alt="[Steel]" title="Steel">';
  return graphics;
}

function SaveResourceCalcProcess(){ //Dammit javascript and your shitty limited options for event handlers..
  ResourceCalcProcess("Save");

}
function ResourceCalcProcess(Reason){
  var resourceCalcString=document.getElementById('resourceCalcString');
  for(i in arResourcesall){
    tmp=document.getElementById(arResourcesall[i]);

    arDesu[arResourcesall[i]] = tmp.checked ? 1 : 0;
  }
  if(arDesu["iron"]==1&&arDesu["coal"]==1){arDesu["steel"]=1;}else{arDesu["steel"]=0;}
  if(arDesu["lumber"]==1&&arDesu["lead"]==1){arDesu["scholars"]=1;}else{arDesu["scholars"]=0;}
  if(arDesu["gold"]==1&&arDesu["lead"]==1&&arDesu["oil"]==1){arDesu["microchips"]=1;}else{arDesu["microchips"]=0;}
  if(arDesu["gold"]==1&&arDesu["silver"]==1&&arDesu["gems"]==1&&arDesu["coal"]==1){arDesu["fine jewelry"]=1;}else{arDesu["fine jewelry"]=0;}
  if(arDesu["cattle"]==1&&arDesu["sugar"]==1&&arDesu["spices"]==1&&arDesu["pigs"]==1){arDesu["fast food"]=1;}else{arDesu["fast food"]=0;}
  if(arDesu["lumber"]==1&&arDesu["iron"]==1&&arDesu["marble"]==1&&arDesu["aluminum"]==1){arDesu["construction"]=1;}else{arDesu["construction"]=0;}
  if(arDesu["aluminum"]==1&&arDesu["water"]==1&&arDesu["wheat"]==1&&arDesu["lumber"]==1){arDesu["beer"]=1;}else{arDesu["beer"]=0;}
  if(arDesu["construction"]==1&&arDesu["oil"]==1&&arDesu["rubber"]==1){arDesu["asphalt"]=1;}else{arDesu["asphalt"]=0;}
  if(arDesu["asphalt"]==1&&arDesu["steel"]==1){arDesu["automobiles"]=1;}else{arDesu["automobiles"]=0;}
  if(arDesu["construction"]==1&&arDesu["microchips"]==1&&arDesu["steel"]==1){arDesu["radiation cleanup"]=1;}else{arDesu["radiation cleanup"]=0;}

  resourceCalcString.innerHTML = CalculateResources(Reason);
}
function CalculateResources(Reason){
  intHapMod = intIncomeMod = intSoldierCost = 0; //Addition variables.
  intInfraUpkeep = intLandCost = intInfraCost = intTechCost = 1; //Negative multipliers
  intCitizenMod = intSoldierAmount = intAircraftCost = intLandArea = 1; //Positive multipliers
	
  strMiscBonuses=""; bonusStr=""; NumberResources=0; NumberResourcesStr="";
	
  if(arDesu["aluminum"]==1) { intInfraCost *= .93; intSoldierAmount *= 1.20; intAircraftCost *= .92; }
  if(arDesu["cattle"]==1) { intCitizenMod *= 1.05; intLandCost *= .9;}
  if(arDesu["coal"]==1) { intHapMod -= .4; intInfraCost *= .96; intLandArea *= 1.15; intSoldierAmount *= 1.08; strMiscBonuses += "Coal: Lowered environment & triple infra value when selling<br/>";}
  if(arDesu["fish"]==1) { intCitizenMod *= 1.08; intLandCost *= .95;}
  if(arDesu["furs"]==1) { intIncomeMod += 3; strMiscBonuses += "Furs: +10% Natural Growth<br/>";}
  if(arDesu["gold"]==1) { intIncomeMod += 3; intTechCost *= .95;}
  if(arDesu["gems"]==1) { intIncomeMod += 1.5; intHapMod += 2.5;}
  if(arDesu["iron"]==1) { intInfraCost *= .95; intInfraUpkeep *= .90; intSoldierCost -= 3; strMiscBonuses += "Iron: -5% Tank Cost/Upkeep<br/>";}
  if(arDesu["lead"]==1) { strMiscBonuses += "Lead: Lower inital cruise missile cost -10%, nuclear cost -10%, cruise missile upkeep cost -20%, and lowers nuclear upkeep costs -20%.<br/>";}
  if(arDesu["lumber"]==1) { intInfraCost *= .94; intInfraUpkeep *= .92;}
  if(arDesu["marble"]==1) { intInfraCost *= .90;}
  if(arDesu["oil"]==1) { intHapMod += 1.1; intSoldierCost -= 3; intSoldierAmount *= 1.10; intAircraftCost *= .96; strMiscBonuses += "Oil: Lowered Environment<br/>"; }
  if(arDesu["pigs"]==1) { intCitizenMod *= 1.035; intSoldierAmount *= 1.15; }
  if(arDesu["rubber"]==1) { intInfraCost *= .97; intLandCost *= .90; intLandArea *= 1.20; intAircraftCost *= .96; strMiscBonuses += "Rubber: Natural Growth +10%, land sale value tripled<br/>"; }
  if(arDesu["silver"]==1) { intHapMod += 2; intIncomeMod += 2; }
  if(arDesu["spices"]==1) { intHapMod += 2; intLandArea *= 1.08; }
  if(arDesu["sugar"]==1) { intHapMod += 1; intCitizenMod *= 1.03; intLandArea *= 1.05; }
  if(arDesu["uranium"]==1) { intHapMod -= 1.8; intIncomeMod += 7.5; intInfraUpkeep *= .97; strMiscBonuses += "Uranium Bonuses<br/>";}
  if(arDesu["water"]==1) { intHapMod += 2.9; strMiscBonuses += "Water: Pop density+50, environment+10%<br/>"; }
  if(arDesu["wheat"]==1) { intCitizenMod *= 1.08; intLandArea *= 1.05; }


  if(arDesu["wine"]==1) { intHapMod += 3; }
	//rest is bonus resources

  if(arDesu["affluent population"]==1) { intHapMod += 2; bonusStr += graphics["affluent population"];}
  if(arDesu["asphalt"]==1) { intInfraUpkeep *= .95; bonusStr += graphics["asphalt"];}
  if(arDesu["automobiles"]==1) { intHapMod=intHapMod+3; bonusStr += graphics["automobiles"];}
  if(arDesu["beer"]==1) { intHapMod += 2; bonusStr += graphics["beer"];}
  if(arDesu["construction"]==1) { intInfraCost *= .95; bonusStr += graphics["construction"]; strMiscBonuses += "Construction: Raises the aircraft limit from 50 to 60<br/>";}
  if(arDesu["fast food"]==1) { intHapMod += 2; bonusStr += graphics["fast food"];}
  if(arDesu["fine jewelry"]==1) { intHapMod += 1.5; bonusStr += graphics["fine jewelry"];}
  if(arDesu["microchips"]==1) { intHapMod=intHapMod+2; intTechCost=intTechCost-8;bonusStr=bonusStr+graphics["microchips"];}
  if(arDesu["radiation cleanup"]==1) { bonusStr += graphics["radiation cleanup"]; strMiscBonuses += "Radiation Cleanup: Reduces global radiation effect on an individual nation -50%<br/>";}
  if(arDesu["scholars"]==1) { intIncomeMod += 3; bonusStr += graphics["scholars"];}
  if(arDesu["steel"]==1) { intInfraCost *= .98; bonusStr += graphics["steel"];}

  intInfraUpkeep-=1; intInfraUpkeep = Math.round(intInfraUpkeep*10000)/100; 
  intLandCost-=1; intLandCost = Math.round(intLandCost*10000)/100;
  intInfraCost-=1; intInfraCost = Math.round(intInfraCost*10000)/100;
  intTechCost-=1; intTechCost = Math.round(intTechCost*10000)/100;
	
  intCitizenMod-=1; intCitizenMod = Math.round(intCitizenMod*10000)/100; 
  intSoldierAmount-=1; intSoldierAmount = Math.round(intSoldierAmount*10000)/100;
  intAircraftCost-=1; intAircraftCost = Math.round(intAircraftCost*10000)/100;
  intLandArea-=1; intLandArea = Math.round(intLandArea*10000)/100;

  for(i in arResourcesall){
    if(arDesu[arResourcesall[i]] == 1){
      NumberResources++;
    }
  }
	
  var TradeAmount = NationInfo["Improvements"]["Harbors"] ? 12 : 10;
  if(NumberResources>TradeAmount){var TooMany=NumberResources-TradeAmount;NumberResourcesStr='<font color="#ff0000"><strong>'+NumberResources+'</strong></font> | You have selected <font color="#ff0000"><strong>'+TooMany+'</strong></font> too many resources';}
  else if(NumberResources<TradeAmount){var TooFew=TradeAmount-NumberResources;NumberResourcesStr='<font color="#ff0000"><strong>'+NumberResources+'</strong></font> | You appear to have <font color="#ff0000"><strong>'+TooFew+'</strong></font> too few resources';}
  else NumberResourcesStr='<strong>'+NumberResources+'</strong>';
	
  if (Reason == "Save"){
    GM_setValue("savedintHapMod",intHapMod+'');
    GM_setValue("savedintIncomeMod",intIncomeMod+'');
    GM_setValue("savedintCitizenMod",intCitizenMod+'');
    GM_setValue("savedintInfraCost",intInfraCost+'');
    GM_setValue("savedintInfraUpkeep",intInfraUpkeep+'');
    GM_setValue("savedintLandCost",intLandCost+'');
    GM_setValue("savedintLandArea",intLandArea+'');
    GM_setValue("savedintSoldierCost",intSoldierCost+'');
    GM_setValue("savedintSoldierAmount",intSoldierAmount+'');
    GM_setValue("savedintAircraftCost",intAircraftCost+'');
    GM_setValue("savedintTechCost",intTechCost+'');
  }

  var sr=' style="color:#ff0000;">';
  var sg=' style="color:#30b306;">';
  var grey=' style="color:#000000;">';
  if(intHapMod<parseFloat(GM_getValue("savedintHapMod",0))){h1=sr;h2=sg;}else if(intHapMod>parseFloat(GM_getValue("savedintHapMod",0))){h1=sg;h2=sr;}else{h1=grey;h2=grey;}
  if(intIncomeMod<parseFloat(GM_getValue("savedintIncomeMod",0))){inc1=sr;inc2=sg;}else if(intIncomeMod>parseFloat(GM_getValue("savedintIncomeMod",0))){inc1=sg;inc2=sr;}else{inc1=grey;inc2=grey;}
  if(intCitizenMod<parseFloat(GM_getValue("savedintCitizenMod",0))){cit1=sr;cit2=sg;}else if(intCitizenMod>parseFloat(GM_getValue("savedintCitizenMod",0))){cit1=sg;cit2=sr;}else{cit1=grey;cit2=grey;}
  if(intInfraCost<parseFloat(GM_getValue("savedintInfraCost",0))){infc1=sg;infc2=sr;}else if(intInfraCost>parseFloat(GM_getValue("savedintInfraCost",0))){infc1=sr;infc2=sg;}else{infc1=grey;infc2=grey;}
  if(intInfraUpkeep<parseFloat(GM_getValue("savedintInfraUpkeep",0))){infu1=sg;infu2=sr;}else if(intInfraUpkeep>parseFloat(GM_getValue("savedintInfraUpkeep",0))){infu1=sr;infu2=sg;}else{infu1=grey;infu2=grey;}
  if(intLandCost<parseFloat(GM_getValue("savedintLandCost",0))){lc1=sg;lc2=sr;}else if(intLandCost>parseFloat(GM_getValue("savedintLandCost",0))){lc1=sr;lc2=sg;}else{lc1=grey;lc2=grey;}
  if(intLandArea<parseFloat(GM_getValue("savedintLandArea",0))){la1=sr;la2=sg;}else if(intLandArea>parseFloat(GM_getValue("savedintLandArea",0))){la1=sg;la2=sr;}else{la1=grey;la2=grey;}
	
  if(intSoldierCost<parseFloat(GM_getValue("savedintSoldierCost",0))){solc1=sg;solc2=sr;}else if(intSoldierCost>parseFloat(GM_getValue("savedintSoldierCost",0))){solc1=sr;solc2=sg;}else{solc1=grey;solc2=grey;}
  if(intSoldierAmount<parseFloat(GM_getValue("savedintSoldierAmount",0))){sola1=sr;sola2=sg;}else if(intSoldierAmount>parseFloat(GM_getValue("savedintSoldierAmount",0))){sola1=sg;sola2=sr;}else{sola1=grey;sola2=grey;}
  if(intAircraftCost<parseFloat(GM_getValue("savedintAircraftCost",0))){air1=sg;air2=sr;}else if(intAircraftCost>parseFloat(GM_getValue("savedintAircraftCost",0))){air1=sr;air2=sg;}else{air1=grey;air2=grey;}
  if(intTechCost<parseFloat(GM_getValue("savedintTechCost",0))){tech1=sg;tech2=sr;}else if(intTechCost>parseFloat(GM_getValue("savedintTechCost",0))){tech1=sr;tech2=sg;}else{tech1=grey;tech2=grey;}
		
  NumberResourcesStr=NumberResourcesStr+'<strong>';
  ResourceString = '<table width="100%" border="1" cellspacing="0" cellpadding="1">'+
      '<tr><td>Number of Resources</td><td colspan="2">'+	NumberResourcesStr+'</td></tr>'+
      '<tr><td width="8%">Bonuses</td><td colspan="2">'+bonusStr+'</td></tr>'+
      '<tr><td></td><td align="right">Current</td><td width="50%" align="left">Saved</td></tr>'+
      '<tr><td>Happiness</td><td align="right"'+h1+			intHapMod+'</span></td><td width="50%" align="left"'+h2+	parseFloat(GM_getValue("savedintHapMod",0))+'</span></td></tr>'+
      '<tr><td>Income</td><td align="right"'+inc1+			intIncomeMod+'</span></td><td align="left"'+inc2+			parseFloat(GM_getValue("savedintIncomeMod",0))+'</span></td></tr>'+
	  '<tr><td>Citizen Amount </td><td align="right"'+cit1+	intCitizenMod+'%</td><td align="left"'+cit2+				parseFloat(GM_getValue("savedintCitizenMod",0))+'%</td></tr>'+
	      '<tr><td>Infra Cost </td><td align="right"'+infc1+		intInfraCost+'%</td><td align="left"'+infc2+				parseFloat(GM_getValue("savedintInfraCost",0))+'%</td></tr>'+
		  '<tr><td>Infra Upkeep</td><td align="right"'+infu1+		intInfraUpkeep+'%</td><td align="left"'+infu2+				parseFloat(GM_getValue("savedintInfraUpkeep",0))+'%</td></tr>'+
		      '<tr><td>Land Cost </td><td align="right"'+lc1+			intLandCost+'%</td><td align="left"'+lc2+					parseFloat(GM_getValue("savedintLandCost",0))+'%</td></tr>'+
			  '<tr><td>Land Area </td><td align="right"'+la1+			intLandArea+'%</td><td align="left"'+la2+					parseFloat(GM_getValue("savedintLandArea",0))+'%</td></tr>'+
			      '<tr><td>Soldier Cost </td><td align="right"'+solc1+	intSoldierCost+'</td><td align="left"'+solc2+				parseFloat(GM_getValue("savedintSoldierCost",0))+'</td></tr>'+
				  '<tr><td>Soldier Amount </td><td align="right"'+sola1+	intSoldierAmount+'%</td><td align="left"'+sola2+			parseFloat(GM_getValue("savedintSoldierAmount",0))+'%</td></tr>'+
				      '<tr><td>Aircraft Cost </td><td align="right"'+air1+	intAircraftCost+'%</td><td align="left"'+air2+				parseFloat(GM_getValue("savedintAircraftCost",0))+'%</td></tr>'+
					  '<tr><td>Tech Cost </td><td align="right"'+tech1+		intTechCost+'%</td><td align="left"'+tech2+					parseFloat(GM_getValue("savedintTechCost",0))+'%</td></tr>'+
					      '<tr><td>Miscellaneous</td><td colspan="2">'+			strMiscBonuses+'</td></tr></table>';
  
					      return ResourceString;
}

function calculateWonders(){
  var strTableOutput = "";
  intInternet=Math.round((5*intHappinessMod+NationInfo["GrossIncome"])*(NationInfo["TaxRate"]/100)*NationInfo["Citizens"]-intNetIncome);
  intInternetPf=Math.round(35000000/(intNetIncome-intTotalBills));
  intInternetBe=Math.round(35000000/intInternet);
  strTableOutput += "<tr><td width=\"30%\">Internet:</td><td>$"+addCommas(intInternet)+"</td><td>"+addCommas(intInternetBe)+" Days</td><td>"+addCommas(intInternetPf)+" Days</td></tr>";
  intSpace=Math.round((3*intHappinessMod+NationInfo["GrossIncome"])*(NationInfo["TaxRate"]/100)*NationInfo["Citizens"]-intNetIncome);
  intSpacePf=Math.round(30000000/(intNetIncome-intTotalBills));
  intSpaceBe=Math.round(30000000/intSpace);
  strTableOutput += "<tr><td width=\"30%\">Space Program:</td><td>$"+addCommas(intSpace)+"</td><td>"+addCommas(intSpaceBe)+" Days</td><td>"+addCommas(intSpacePf)+" Days</td></tr>";
  intMonument=Math.round((4*intHappinessMod+NationInfo["GrossIncome"])*(NationInfo["TaxRate"]/100)*NationInfo["Citizens"]-intNetIncome);
  intMonumentPf=Math.round(35000000/(intNetIncome-intTotalBills));
  intMonumentBe=Math.round(35000000/intMonument);
  strTableOutput += "<tr><td width=\"30%\">Great Monument:</td><td>$"+addCommas(intMonument)+"</td><td>"+addCommas(intMonumentBe)+" Days</td><td>"+addCommas(intMonumentPf)+" Days</td></tr>";
  intMovie=Math.round((3*intHappinessMod+NationInfo["GrossIncome"])*(NationInfo["TaxRate"]/100)*NationInfo["Citizens"]-intNetIncome);
  intMoviePf=Math.round(26000000/(intNetIncome-intTotalBills));
  intMovieBe=Math.round(26000000/intMovie);
  strTableOutput += "<tr><td width=\"30%\">Movie Industry:</td><td>$"+addCommas(intMovie)+"</td><td>"+addCommas(intMovieBe)+" Days</td><td>"+addCommas(intMoviePf)+" Days</td></tr>";
  tmpTech=(NationInfo["Tech"]>200)?(NationInfo["Tech"]-200):0; tmpTech = (tmpTech > 1800)?1800:tmpTech;
  intGUniversity=Math.round((tmpTech*0.002*intHappinessMod+NationInfo["GrossIncome"])*(NationInfo["TaxRate"]/100)*NationInfo["Citizens"]-intNetIncome);
  intGUniversityPf=Math.round(35000000/(intNetIncome-intTotalBills));
  intGUniversityBe=Math.round(35000000/intGUniversity);
  strTableOutput += "<tr><td width=\"30%\">Great University:</td><td>$"+addCommas(intGUniversity)+"</td><td>"+addCommas(intGUniversityBe)+" Days</td><td>"+addCommas(intGUniversityPf)+" Days</td></tr>";
  intResearch=Math.round(NationInfo["GrossIncome"]*(NationInfo["TaxRate"]/100)*(NationInfo["Citizens"]*.05));
  intResearchPf=Math.round(35000000/(intNetIncome-intTotalBills));
  intResearchBe=Math.round(35000000/intResearch);
  strTableOutput += "<tr><td width=\"30%\">National Research Lab:</td><td>$"+addCommas(intMovie)+"</td><td>"+addCommas(intMovieBe)+" Days</td><td>"+addCommas(intMoviePf)+" Days</td></tr>";
  intSSS=Math.round(NationInfo["GrossIncome"]*(NationInfo["TaxRate"]/100+.02)*NationInfo["Citizens"]-intNetIncome);
  intSSSPf=Math.round(40000000/(intNetIncome-intTotalBills));
  intSSSBe=Math.round(40000000/intSSS);
  strTableOutput += "<tr><td width=\"30%\">Social Security System:</td><td>$"+addCommas(intSSS)+"</td><td>"+addCommas(intSSSBe)+" Days</td><td>"+addCommas(intSSSPf)+" Days</td></tr>";
  intDisaster=Math.round(NationInfo["GrossIncome"]*(NationInfo["TaxRate"]/100)*(NationInfo["Citizens"]*.03));
  intDisasterPf=Math.round(40000000/(intNetIncome-intTotalBills));
  intDisasterBe=Math.round(40000000/intDisaster);
  strTableOutput += "<tr><td width=\"30%\">Disaster Relief Agency:</td><td>$"+addCommas(intDisaster)+"</td><td>"+addCommas(intDisasterBe)+" Days</td><td>"+addCommas(intDisasterPf)+" Days</td></tr>";
  intInterstate=Math.round(intInfraBill-(NationInfo["InfraUpkeep"]-NationInfo["InfraUpkeep"]*.08)*NationInfo["Infra"]);
  intInterstateInfra=Math.round(NationInfo["InfraCost"]*.08*10);
  intInterstatePf=Math.round(45000000/(intNetIncome-intTotalBills));
  intInterstateBe=Math.round(45000000/intDisaster);
  strTableOutput += "<tr><td width=\"30%\">Interstate System:</td><td>$"+addCommas(intInterstate)+"<br/>$"+addCommas(intInterstateInfra)+" off 10 infra</td><td>"+addCommas(intInterstateBe)+" Days</td><td>"+addCommas(intInterstatePf)+" Days</td></tr>";	
  intTemple=Math.round((5*intHappinessMod+NationInfo["GrossIncome"])*(NationInfo["TaxRate"]/100)*NationInfo["Citizens"]-intNetIncome);
  intTemplePf=Math.round(35000000/(intNetIncome-intTotalBills));
  intTempleBe=Math.round(35000000/intTemple);
  strTableOutput += "<tr><td width=\"30%\">Great Temple:</td><td>$"+addCommas(intTemple)+"</td><td>"+addCommas(intTempleBe)+" Days</td><td>"+addCommas(intTemplePf)+" Days</td></tr>";
  intMemorial=Math.round((4*intHappinessMod+NationInfo["GrossIncome"])*(NationInfo["TaxRate"]/100)*NationInfo["Citizens"]-intNetIncome);
  intMemorialPf=Math.round(27000000/(intNetIncome-intTotalBills));
  intMemorialBe=Math.round(27000000/intMemorial);
  strTableOutput += "<tr><td width=\"30%\">War Memorial:</td><td>$"+addCommas(intMemorial)+"</td><td>"+addCommas(intMemorialBe)+" Days</td><td>"+addCommas(intMemorialPf)+" Days</td></tr>";
  intStockMarket=Math.round((5*intHappinessMod+NationInfo["GrossIncome"])*(NationInfo["TaxRate"]/100)*NationInfo["Citizens"]-intNetIncome);
  intStockMarketPf=Math.round(30000000/(intNetIncome-intTotalBills));
  intStockMarketBe=Math.round(30000000/intStockMarket);
  strTableOutput += "<tr><td width=\"30%\">Stock Market:</td><td>$"+addCommas(intStockMarket)+"</td><td>"+addCommas(intStockMarketBe)+" Days</td><td>"+addCommas(intStockMarketPf)+" Days</td></tr>";

  return strTableOutput;
}

function calculateImprovs(){
  var strTableOutput="";
	
  if(NationInfo["Improvements"]["Factories"] < 5){
    var intFactoryReduce = Math.round(NationInfo["InfraCost"] / (1 - NationInfo["Improvements"]["Factories"] * 0.08) * (1 - (NationInfo["Improvements"]["Factories"]+1) * 0.08));
    var intFactorySavings = Math.round(NationInfo["InfraCost"] - intFactoryReduce);
    strTableOutput += "<tr><td width=\"30%\">Factory - savings per 10 Infra:</td><td>$"+addCommas(Math.round(intFactorySavings * 10))+"</td><td>"+Math.round((intNetIncome/intFactoryReduce-intNetIncome/NationInfo["InfraCost"])*10)/10+"</td></tr>";
  }
  if(NationInfo["Improvements"]["Unis"] < 2){
    var intUniversitiesIncrease = Math.round((intNetIncome / (1+NationInfo["Improvements"]["Unis"]*0.08) * (1+(NationInfo["Improvements"]["Unis"]+1)*0.08)) - intNetIncome);
    var intUniversities_f = Math.round((intUniversitiesIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">University:</td><td>$"+addCommas(intUniversitiesIncrease)+"</td><td>"+intUniversities_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["Banks"] < 5){
    var intBankIncrease = Math.round((intNetIncome / (1+NationInfo["Improvements"]["Banks"]*0.07) * (1+(NationInfo["Improvements"]["Banks"]+1)*0.07)) - intNetIncome);
    var intBank_f = Math.round((intBankIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Bank:</td><td>$"+addCommas(intBankIncrease)+"</td><td>"+intBank_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["Schools"] < 5){
    var intSchoolIncrease = Math.round((intNetIncome / (1+NationInfo["Improvements"]["Schools"]*0.05) * (1+(NationInfo["Improvements"]["Schools"]+1)*0.05)) - intNetIncome);
    var intSchool_f = Math.round((intSchoolIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">School:</td><td>$"+addCommas(intSchoolIncrease)+"</td><td>"+intSchool_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["FMs"] < 1){
    var intForeignMIncrease = Math.round(intNetIncome * 1.05 - intNetIncome);
    var intForeignM_f = Math.round((intForeignMIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Foreign Ministry:</td><td>$"+addCommas(intForeignMIncrease)+"</td><td>"+intForeignM_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["Harbors"] < 1){
    var intHarborIncrease = Math.round(intNetIncome * 1.01 - intNetIncome);
    var intHarbor_f = Math.round((intHarborIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Harbor:</td><td>$"+addCommas(intHarborIncrease)+"</td><td>"+intHarbor_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["Stadiums"] < 5){
    var intStadiumIncrease = Math.round((((3 * intHappinessMod + NationInfo["GrossIncome"]) * (NationInfo["TaxRate"] / 100)) * NationInfo["Citizens"]) - intNetIncome);
    var intStadium_f = Math.round((intStadiumIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Stadium:</td><td>$"+addCommas(intStadiumIncrease)+"</td><td>"+intStadium_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["PHQs"] < 5){
    var intPHQIncrease = Math.round((((2 * intHappinessMod + NationInfo["GrossIncome"]) * (NationInfo["TaxRate"] / 100)) * NationInfo["Citizens"]) - intNetIncome);
    var intPHQ_f = Math.round((intPHQIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Police Headquarters:</td><td>$"+addCommas(intPHQIncrease)+"</td><td>"+intPHQ_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["Church"] < 5){
    var intChurchIncrease = Math.round((((intHappinessMod + NationInfo["GrossIncome"]) * (NationInfo["TaxRate"] / 100)) * NationInfo["Citizens"]) - intNetIncome);
    var intChurch_f = Math.round((intChurchIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Church:</td><td>$"+addCommas(intChurchIncrease)+"</td><td>"+intChurch_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["IAs"] < 5){
    var intIAIncrease = Math.round((((intHappinessMod + NationInfo["GrossIncome"]) * (NationInfo["TaxRate"] / 100)) * NationInfo["Citizens"]) - intNetIncome);
    var intIA_f = Math.round((intIAIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Intelligence Agency:</td><td>$"+addCommas(intIAIncrease)+"</td><td>"+intIA_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["Hospitals"] < 1){
    var intHospitalIncrease = Math.round(intNetIncome * 1.06 - intNetIncome);
    var intHospital_f = Math.round((intHospitalIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Hospital:</td><td>$"+addCommas(intHospitalIncrease)+"</td><td>"+intHospital_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["Clinics"] < 5){
    var intClinicIncrease = Math.round((intNetIncome / (1+NationInfo["Improvements"]["Clinics"]*0.02) * (1+(NationInfo["Improvements"]["Clinics"]+1)*0.02)) - intNetIncome);
    var intClinic_f = Math.round((intClinicIncrease / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Clinic:</td><td>$"+addCommas(intClinicIncrease)+"</td><td>"+intClinic_f+"</td></tr>";
  }
  if(NationInfo["Improvements"]["LCs"] < 5){
    var intLaborCampLosses = Math.round(intNetIncome - (((NationInfo["GrossIncome"] - intHappinessMod)*(NationInfo["TaxRate"]/100))*NationInfo["Citizens"]));
    var intInfraBills = (NationInfo["InfraUpkeep"] * NationInfo["Infra"]);
    var intLaborCampSavings = Math.round(intInfraBills - ((intInfraBills) / (1 - (NationInfo["Improvements"]["LCs"]*0.1)) * (1-(NationInfo["Improvements"]["LCs"]+1)*0.1)));
    var intLaborCamp_f = Math.round(((intLaborCampSavings-intLaborCampLosses) / NationInfo["InfraCost"])*10)/10;
    strTableOutput += "<tr><td width=\"30%\">Labor Camp:</td><td>Bills Saved: $"+addCommas(intLaborCampSavings)+"<br/>Money Lost: $"+addCommas(intLaborCampLosses)+"</td><td>"+intLaborCamp_f+"</td></tr>";
  }
	
  return strTableOutput;
}

function refreshContent() { //aka main()
   if (!(document.location.href.match(/nation_drill_display/) && document.body.innerHTML.match(/Private Nation Messages/) )) { return; } //make sure we're on the main page
   
  InjectScriptalicious();
  defineTables();
  //Here be globals!
  //If you truely wanted a good code layout you'd have CalculateStuff(); followed by OutputNewPage(); Making it a customisable 'step' system.
  
  NationInfo = getPageInfo(); //Grab -everything- we'll ever need from the page. 
  
   
  graphics = buildGraphics();
  arResourcesall = ["aluminum","cattle","coal","fish","furs","gold","gems","iron","lead","lumber","marble","oil","pigs","rubber","silver","spices","sugar","uranium","water","wheat","wine"];

  // Important global math.
  intHappinessMod = Math.round((2 * (1 + NationInfo["Improvements"]["Harbors"] * 0.01) * (1 + NationInfo["Improvements"]["Banks"] * 0.07) * (1 + NationInfo["Improvements"]["Unis"] * 0.08) * (1 + NationInfo["Improvements"]["Schools"] * 0.05) * (1 + NationInfo["Improvements"]["FMs"] * 0.05)) *100)/100;
  intNetIncome = Math.round((NationInfo["NetIncome"] * NationInfo["Citizens"])*100)/100;
  
  
  //Now to screw with the htmls.  
  //******************** Header ********************
  pushTrToInformationTable('header','<td bgcolor="#'+tdcolor+'" colspan="2"><b><font color="#'+tdcolor+'"><a name="advisor">_</a></font><font color="#FFFFFF">:. CN Advisor</font></b></td>');

	//******************** Income/Bills ********************
  intInfraBill = Math.round(NationInfo["Infra"] * NationInfo["InfraUpkeep"]);
  //intInfraBill = Math.round(NationInfo["InfraUpkeep"]);
  //intInfraBill = Math.round(NationInfo["Infra"] * NationInfo["InfraUpkeep"]);
  intSoldierBill = Math.round(NationInfo["Soldiers"] * NationInfo["SoldierUpkeep"]);
  intAircraftBill = Math.round(NationInfo["Aircraft"] * NationInfo["AircraftUpkeep"]);
  intTankBill = Math.round(NationInfo["Tanks"] * NationInfo["TankUpkeep"]);
  intImproveBill = Math.round(NationInfo["ImprovementCount"] * NationInfo["ImprovementUpkeep"]);
  intNukeBill = Math.round(NationInfo["Nukes"] * NationInfo["NukeUpkeep"]);
  intCruiseMBill = Math.round(NationInfo["CruiseMissiles"] * NationInfo["CruiseUpkeep"]);
  intWonderBill = Math.round(NationInfo["WonderCount"] * NationInfo["WonderUpkeep"]);
  graphlink = "http://www.vtheh.net/bmember/billpie.php?nuk="+intNukeBill+"&imp="+intImproveBill+"&inf="+intInfraBill+"&sol="+intSoldierBill+"&tank="+intTankBill+"&cm="+intCruiseMBill+"&air="+intAircraftBill+"&won="+intWonderBill;
	
  intTotalBills = intInfraBill+intSoldierBill+intAircraftBill+intTankBill+intImproveBill+intNukeBill+intCruiseMBill+intWonderBill;
  //intTotalBills = intSoldierBill;
  var intBillsChange = Math.round((intTotalBills-NationInfo["LastBills"])*100)/100;
  var intEstimatedIncome = Math.round((intNetIncome - intTotalBills)*100)/100;
  var intIncomePercent = Math.round(intEstimatedIncome/intNetIncome*100);
	
  var strFinance = 'Finances:</td><td bgcolor="#FFFFFF"><p style="font-size:12"><strong>Estimated Collection Amount: </strong>$'+addCommas(intNetIncome)+'<br/><br/><strong>Current Estimated Bills: </strong>$'+addCommas(intTotalBills)+'<br/>';
  if((Math.round(intTotalBills/100)*100) != (Math.round(NationInfo["LastBills"]/100)*100)){ strFinance += '<b>Previously: </b>$'+addCommas(NationInfo["LastBills"])+'<br/><b>Change: </b>$'+addCommas(intBillsChange)+'<br/>';}
  strFinance += '<br/><b>Estimated clear income: </b>$'+addCommas(intEstimatedIncome)+' ('+intIncomePercent+'% of your whole income)<br/>';
  pushTrToInformationTable('estincome','<td bgcolor="#FFFFFF" width="18%">'+strFinance+'</p><div id="billslink" style=\"cursor: pointer;\">Click here to show the bills pie</div><div id="billspie" style="display:none"></div><br/></td>');
	
	//******************** Soldiers ********************
  var strSoldier = "";
  var intCurrentSoldierCount = Math.round((NationInfo["Soldiers"]/NationInfo["Citizens"]*100));
  var intCivExpand = Math.round((NationInfo["Soldiers"]/.2)-1);
  intCivExpand = intCivExpand - NationInfo["Citizens"];
  intInfraExpand = Math.round(intCivExpand/7*1000)/1000;
	
  if (intCurrentSoldierCount > 80) { strSoldier = "Your soldier count is at "+intCurrentSoldierCount+"%. <acronym title='Over 80% of working population'>This is too high</acronym>. To fix this you need "+Math.round((NationInfo["Citizens"]*.8))+" soldiers or less";}
  else if (intCurrentSoldierCount > 60) { strSoldier = "Your soldier count is at "+intCurrentSoldierCount+"%. <acronym title='Over 60% of working population'>This is hurting your environment</acronym>. To fix this you need "+Math.round((NationInfo["Citizens"]*.6))+" soldiers or less";}
  else if (intCurrentSoldierCount < 20) { strSoldier = "Your soldier count is at "+intCurrentSoldierCount+"%. <acronym title='Under 20% of working population'>This is too low</acronym>. To fix this you need "+Math.round((NationInfo["Citizens"]*.2))+" soldiers or more";}
  else { strSoldier = "Your soldier count is fine. It is currently standing at "+intCurrentSoldierCount+"%."; }
  pushTrToInformationTable('optimalsoldiers','<td bgcolor="#FFFFFF" width="18%">Soldier count:</td><td bgcolor="#FFFFFF"><p style="font-size:12">'+strSoldier+'<br/></p></td>');

	
	//******************** Infra and shit ********************
	//intCanBuyInfra = Math.round(NationInfo["Money"]/NationInfo["InfraCost"]*100)/100; //LOLO YA RITE
	//strExpanding = '<b>Current dongs: </b>'+addCommas(NationInfo["Money"])+'<br/><b>You can buy: </b>'+addCommas(intCanBuyInfra)+' Levels of infra.';
	
  var strExpanding = '<strong>Current dongs level: </strong>$'+addCommas(NationInfo["Money"])+'<br/><strong>Current Infra Amount: </strong>'+addCommas(Math.round(NationInfo["Infra"]*100)/100)+'<div id="infracalc" style="font-size:11; display:none"><table width="100%" style="background-color:#FFFFFF"><tr><td align="right" width="30%">Buyers infra level:<br/><br/>Infra being purchased:</td><td width="18%"><input type="text" value="'+NationInfo["Infra"]+'" id="currentinfra" size="8" maxlength="8" /><br/><input align="right" type="text" value="10" id="buyingamount" size="8" maxlength="8" /></td><td>Amount of factories: <select id="factorylist"><option value ="0">No Factories</option><option value ="1">1 Factory</option><option value ="2">2 Factories</option><option value ="3">3 Factories</option><option value ="4">4 Factories</option><option value ="5">5 Factories</option></select></td></tr></table><div id="insertinfracost" style="margin-top:1em">At your specified level of infra, with your current trade/improvement setup, <strong>10</strong> levels of infrastructure will cost you <strong>$'+addCommas(Math.round(NationInfo["InfraCost"]*1000)/100)+'</strong> to purchase.</div></div><div id="infraswitch" style="cursor:pointer"></div>';
  pushTrToInformationTable('expandinfra','<td bgcolor="#FFFFFF" width="18%">Expanding:</td><td bgcolor="#FFFFFF"><p style="font-size:12">'+strExpanding+'</p></td>');

  document.getElementById('factorylist').options[NationInfo["Improvements"]["Factories"]].defaultSelected = true;

	// ******************** Resource Calculations ********************
  arDesu = new Array(); //Global declaration for the array that keeps the checkbox values
  for (i in NationInfo["Resources"]){
    arDesu[i] = NationInfo["Resources"][i];
  }
  var ResourceCalcInputs = '<table border="0" cellspacing="5" cellpadding="5"><tr>';
  a=0;
  var TradeCount = 0;
  for (i in arResourcesall){
    if(a==4){ResourceCalcInputs=ResourceCalcInputs+'</tr><tr>';a=0;}
    ResourceCalcInputs+='<td align="right">'+graphics[arResourcesall[i]]+' <input type="checkbox" value="1" id="'+arResourcesall[i]+'"';
    if(arDesu[arResourcesall[i]]==1){
      ResourceCalcInputs+=' checked';
      ++TradeCount;
    }
    ResourceCalcInputs+='></td>';
    ++a;
  }
  ResourceCalcInputs+='</tr></table><br/><br/>';
  ResourceString = CalculateResources();
  pushTrToInformationTable('ressourcecalc','<td bgcolor="#FFFFFF" width="18%">Resource calculator:</td><td bgcolor="#FFFFFF"><div style="font-size:12; display:none" id="rscalc">'+ResourceCalcInputs+'<div align="center"><input type="button" value="Save" id="resourceCalcSave"> '+'<input type="button" value="Calculate" id="resourceCalc"></div><br/>'+'<div id="resourceCalcString">'+ResourceString+'</div><br/></div><div id="rsswitch" style=\"cursor: pointer;\">Click here to expand this section</div></td>');
  
  var TradeAmount = NationInfo["Improvements"]["Harbors"] ? 12 : 10;
  if(TradeCount<TradeAmount) appendToTop('<span style="color:#ff0000"><strong>Warning: You are a few resources short. I suggest you fix your trades before you collect taxes.</strong></span>', true);
  
  // ******************** Improvement Calculations ********************
  var strImprovOutput = calculateImprovs();
  pushTrToInformationTable('impcalc','<td bgcolor="#FFFFFF" width="18%">Improvements:</td><td bgcolor="#FFFFFF"><div style="font-size:12; display:none" id="improvementcalc"><table width="100%" border="1"><tr><td colspan="3"><strong>To get the Factory/Labor Camp savings to display properly you must first open your Infrastructure purchasing screen. If things still do not display properly make sure you are running the latest version of the advisor</strong></td></tr><tr><td colspan="2">One point of happiness is worth <strong>$'+intHappinessMod+'</strong> for you.<br/>Without any improvements one point of happiness is worth <strong>$2.00</strong></td><td>Approximate amount of extra infrastructure you will be able to purchase with this improvement:</td></tr>'+strImprovOutput+'</table><br/></div><div id="improvementswitch" style=\"cursor: pointer;\">Click here to expand this section</div></td>');
  
  // ********** Wonder Calculations **********
  var strWondersOutput = calculateWonders();
  pushTrToInformationTable('wondcalc','<td bgcolor="#FFFFFF" width="18%">Wonders:</td><td bgcolor="#FFFFFF"><div style="font-size:12; display:none" id="wondercalc"><table width="100%" border="1"><tr><td colspan="4">If any of the following numbers are negative the wonder will not be paying for itself any time soon.</td></tr><tr><td></td><td>Income/Savings bonus</td><td>Estimated time before the wonder will pay for itself.</td><td>Estimated time to save for the wonder given current income.</td></tr>'+strWondersOutput+'</table><br/></div><div id="wonderswitch" style=\"cursor: pointer;\">Click here to expand this section</div></td>');
	
	// ******************** Change the HTML around ********************
  MakePagePretty();
	
  // ******************** Register event handlers ********************
  registerEvents();
  
}
refreshContent();