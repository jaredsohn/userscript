// ==UserScript==
// @name           Tard's KoL Scripts - Framework
// @namespace      http://groups.google.com/group/tards-kol-greasemonkey-scripts?hl=en
// @description    A community fixed version of Tard's Framework script pending the original author's return.
// @include        *kingdomofloathing.com/game.php*
// @include        *kingdomofloathing.com/main_c.html*
// @include        *kingdomofloathing.com/main.html*
// @include        *kingdomofloathing.com/login.php*
// @include        *127.0.0.1:*/game.php*
// @include        *127.0.0.1:*/main_c.html*
// @include        *127.0.0.1:*/main.html*
// @exclude        *forums.kingdomofloathing.com*
// ==/UserScript==

/**************************************
 Tard's KoL Scripts
 Copyright (c) 2008, Byung Kim
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html
***************************************/

/**************************************
 Further modified by clump, Feb. 12, 2011
 - adapt to new options menu, disable missing script pieces
 Further modified by clump, Aug. 29, 2010
 - update choice adventures to Hellion's 3.02 version
 Further modified by clump, Jul. 24, 2010
 - compatibility with mr. script, stop the framework from
   grabbing way too much stuff from the charpane as the
   the last adventure
 Further modified by clump, Jul. 14, 2010
 - fix it so the leaflet script runs if the inventory
   is loaded in the main tab
 - fix broken url to Tard's (old) description
 Further modified by clump, Apr. 19, 2010
 - embed the leaflet script
 - fix a typo in recognizing a PM class
 Further modified by clump, Mar. 28, 2010
 - embed Hellion's updated choice adventure script
 Further modified by clump, Dec. 18, 2009
 - attempt to fix compact mode
 Modified by clump (mostly based on iamgnat's changes), Dec. 11, 2009
 - fixes to accommodate change in main game page url pathname
 - inline similarly fixed framework.js and prototype.js scripts
***************************************/

(function() {
    var fms = window.parent.frames;
    var notcompactmode = true;
    fms = fms.document.getElementById('mainset');
    if (fms) {
        var cols = fms.getAttribute('cols');
        if (cols=='120,*')
            notcompactmode = false;
    }
    //GM_log("compactmode="+String(!notcompactmode));

    // Remove the default frameset UI
    if (window.location.pathname.match(/(main)|(game)/)) {
        var aFS = document.getElementsByTagName('frameset');
        if (aFS[0]) aFS[0].parentNode.removeChild(aFS[0]);
    }

    // Runtime Mode
  //var runtimeMode = "dev";
    var runtimeMode = "prod";

    // Inject prototype & framework scripts
    var scriptHostProd = "http://kolscripts.googlecode.com/svn/trunk/tard/";
    var scriptHostDev = "http://kolscripts.googlecode.com/svn/branches/tard/dev/";

    setTimeout('' +
        'window["tardFrameworkRuntimeMode"] = "' + runtimeMode + '";' +
        'window["tardFrameworkScriptHostDev"] = "' + scriptHostDev + '";' +
    '',10);


    var scripts = [
"/*  Prototype JavaScript framework, version 1.6.0.3\n"+
" *  (c) 2005-2008 Sam Stephenson\n"+
" *\n"+
" *  Prototype is freely distributable under the terms of an MIT-style license.\n"+
" *  For details, see the Prototype web site: http://www.prototypejs.org/\n"+
" *\n"+
" *--------------------------------------------------------------------------*/\n"+
"\n"+
"var Prototype = {\n"+
"  Version: '1.6.0.3',\n"+
"\n"+
"  Browser: {\n"+
"    IE:     !!(window.attachEvent &&\n"+
"      navigator.userAgent.indexOf('Opera') === -1),\n"+
"    Opera:  navigator.userAgent.indexOf('Opera') > -1,\n"+
"    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,\n"+
"    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 &&\n"+
"      navigator.userAgent.indexOf('KHTML') === -1,\n"+
"    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)\n"+
"  },\n"+
"\n"+
"  BrowserFeatures: {\n"+
"    XPath: !!document.evaluate,\n"+
"    SelectorsAPI: !!document.querySelector,\n"+
"    ElementExtensions: !!window.HTMLElement,\n"+
"    SpecificElementExtensions:\n"+
"      document.createElement('div')['__proto__'] &&\n"+
"      document.createElement('div')['__proto__'] !==\n"+
"        document.createElement('form')['__proto__']\n"+
"  },\n"+
"\n"+
"  ScriptFragment: '<script[^>]*>([\\\\S\\\\s]*?)<\\/script>',\n"+
"  JSONFilter: /^\\/\\*-secure-([\\s\\S]*)\\*\\/\\s*$/,\n"+
"\n"+
"  emptyFunction: function() { },\n"+
"  K: function(x) { return x }\n"+
"};\n"+
"\n"+
"if (Prototype.Browser.MobileSafari)\n"+
"  Prototype.BrowserFeatures.SpecificElementExtensions = false;\n"+
"\n"+
"\n"+
"/* Based on Alex Arnell's inheritance implementation. */\n"+
"var Class = {\n"+
"  create: function() {\n"+
"    var parent = null, properties = $A(arguments);\n"+
"    if (Object.isFunction(properties[0]))\n"+
"      parent = properties.shift();\n"+
"\n"+
"    function klass() {\n"+
"      this.initialize.apply(this, arguments);\n"+
"    }\n"+
"\n"+
"    Object.extend(klass, Class.Methods);\n"+
"    klass.superclass = parent;\n"+
"    klass.subclasses = [];\n"+
"\n"+
"    if (parent) {\n"+
"      var subclass = function() { };\n"+
"      subclass.prototype = parent.prototype;\n"+
"      klass.prototype = new subclass;\n"+
"      parent.subclasses.push(klass);\n"+
"    }\n"+
"\n"+
"    for (var i = 0; i < properties.length; i++)\n"+
"      klass.addMethods(properties[i]);\n"+
"\n"+
"    if (!klass.prototype.initialize)\n"+
"      klass.prototype.initialize = Prototype.emptyFunction;\n"+
"\n"+
"    klass.prototype.constructor = klass;\n"+
"\n"+
"    return klass;\n"+
"  }\n"+
"};\n"+
"\n"+
"Class.Methods = {\n"+
"  addMethods: function(source) {\n"+
"    var ancestor   = this.superclass && this.superclass.prototype;\n"+
"    var properties = Object.keys(source);\n"+
"\n"+
"    if (!Object.keys({ toString: true }).length)\n"+
"      properties.push(\"toString\", \"valueOf\");\n"+
"\n"+
"    for (var i = 0, length = properties.length; i < length; i++) {\n"+
"      var property = properties[i], value = source[property];\n"+
"      if (ancestor && Object.isFunction(value) &&\n"+
"          value.argumentNames().first() == \"$super\") {\n"+
"        var method = value;\n"+
"        value = (function(m) {\n"+
"          return function() { return ancestor[m].apply(this, arguments) };\n"+
"        })(property).wrap(method);\n"+
"\n"+
"        value.valueOf = method.valueOf.bind(method);\n"+
"        value.toString = method.toString.bind(method);\n"+
"      }\n"+
"      this.prototype[property] = value;\n"+
"    }\n"+
"\n"+
"    return this;\n"+
"  }\n"+
"};\n"+
"\n"+
"var Abstract = { };\n"+
"\n"+
"Object.extend = function(destination, source) {\n"+
"  for (var property in source)\n"+
"    destination[property] = source[property];\n"+
"  return destination;\n"+
"};\n"+
"\n"+
"Object.extend(Object, {\n"+
"  inspect: function(object) {\n"+
"    try {\n"+
"      if (Object.isUndefined(object)) return 'undefined';\n"+
"      if (object === null) return 'null';\n"+
"      return object.inspect ? object.inspect() : String(object);\n"+
"    } catch (e) {\n"+
"      if (e instanceof RangeError) return '...';\n"+
"      throw e;\n"+
"    }\n"+
"  },\n"+
"\n"+
"  toJSON: function(object) {\n"+
"    var type = typeof object;\n"+
"    switch (type) {\n"+
"      case 'undefined':\n"+
"      case 'function':\n"+
"      case 'unknown': return;\n"+
"      case 'boolean': return object.toString();\n"+
"    }\n"+
"\n"+
"    if (object === null) return 'null';\n"+
"    if (object.toJSON) return object.toJSON();\n"+
"    if (Object.isElement(object)) return;\n"+
"\n"+
"    var results = [];\n"+
"    for (var property in object) {\n"+
"      var value = Object.toJSON(object[property]);\n"+
"      if (!Object.isUndefined(value))\n"+
"        results.push(property.toJSON() + ': ' + value);\n"+
"    }\n"+
"\n"+
"    return '{' + results.join(', ') + '}';\n"+
"  },\n"+
"\n"+
"  toQueryString: function(object) {\n"+
"    return $H(object).toQueryString();\n"+
"  },\n"+
"\n"+
"  toHTML: function(object) {\n"+
"    return object && object.toHTML ? object.toHTML() : String.interpret(object);\n"+
"  },\n"+
"\n"+
"  keys: function(object) {\n"+
"    var keys = [];\n"+
"    for (var property in object)\n"+
"      keys.push(property);\n"+
"    return keys;\n"+
"  },\n"+
"\n"+
"  values: function(object) {\n"+
"    var values = [];\n"+
"    for (var property in object)\n"+
"      values.push(object[property]);\n"+
"    return values;\n"+
"  },\n"+
"\n"+
"  clone: function(object) {\n"+
"    return Object.extend({ }, object);\n"+
"  },\n"+
"\n"+
"  isElement: function(object) {\n"+
"    return !!(object && object.nodeType == 1);\n"+
"  },\n"+
"\n"+
"  isArray: function(object) {\n"+
"    return object != null && typeof object == \"object\" &&\n"+
"      'splice' in object && 'join' in object;\n"+
"  },\n"+
"\n"+
"  isHash: function(object) {\n"+
"    return object instanceof Hash;\n"+
"  },\n"+
"\n"+
"  isFunction: function(object) {\n"+
"    return typeof object == \"function\";\n"+
"  },\n"+
"\n"+
"  isString: function(object) {\n"+
"    return typeof object == \"string\";\n"+
"  },\n"+
"\n"+
"  isNumber: function(object) {\n"+
"    return typeof object == \"number\";\n"+
"  },\n"+
"\n"+
"  isUndefined: function(object) {\n"+
"    return typeof object == \"undefined\";\n"+
"  }\n"+
"});\n"+
"\n"+
"Object.extend(Function.prototype, {\n"+
"  argumentNames: function() {\n"+
"    var names = this.toString().match(/^[\\s\\(]*function[^(]*\\(([^\\)]*)\\)/)[1]\n"+
"      .replace(/\\s+/g, '').split(',');\n"+
"    return names.length == 1 && !names[0] ? [] : names;\n"+
"  },\n"+
"\n"+
"  bind: function() {\n"+
"    if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;\n"+
"    var __method = this, args = $A(arguments), object = args.shift();\n"+
"    return function() {\n"+
"      return __method.apply(object, args.concat($A(arguments)));\n"+
"    }\n"+
"  },\n"+
"\n"+
"  bindAsEventListener: function() {\n"+
"    var __method = this, args = $A(arguments), object = args.shift();\n"+
"    return function(event) {\n"+
"      return __method.apply(object, [event || window.event].concat(args));\n"+
"    }\n"+
"  },\n"+
"\n"+
"  curry: function() {\n"+
"    if (!arguments.length) return this;\n"+
"    var __method = this, args = $A(arguments);\n"+
"    return function() {\n"+
"      return __method.apply(this, args.concat($A(arguments)));\n"+
"    }\n"+
"  },\n"+
"\n"+
"  delay: function() {\n"+
"    var __method = this, args = $A(arguments), timeout = args.shift() * 1000;\n"+
"    return window.setTimeout(function() {\n"+
"      return __method.apply(__method, args);\n"+
"    }, timeout);\n"+
"  },\n"+
"\n"+
"  defer: function() {\n"+
"    var args = [0.01].concat($A(arguments));\n"+
"    return this.delay.apply(this, args);\n"+
"  },\n"+
"\n"+
"  wrap: function(wrapper) {\n"+
"    var __method = this;\n"+
"    return function() {\n"+
"      return wrapper.apply(this, [__method.bind(this)].concat($A(arguments)));\n"+
"    }\n"+
"  },\n"+
"\n"+
"  methodize: function() {\n"+
"    if (this._methodized) return this._methodized;\n"+
"    var __method = this;\n"+
"    return this._methodized = function() {\n"+
"      return __method.apply(null, [this].concat($A(arguments)));\n"+
"    };\n"+
"  }\n"+
"});\n"+
"\n"+
"Date.prototype.toJSON = function() {\n"+
"  return '\"' + this.getUTCFullYear() + '-' +\n"+
"    (this.getUTCMonth() + 1).toPaddedString(2) + '-' +\n"+
"    this.getUTCDate().toPaddedString(2) + 'T' +\n"+
"    this.getUTCHours().toPaddedString(2) + ':' +\n"+
"    this.getUTCMinutes().toPaddedString(2) + ':' +\n"+
"    this.getUTCSeconds().toPaddedString(2) + 'Z\"';\n"+
"};\n"+
"\n"+
"var Try = {\n"+
"  these: function() {\n"+
"    var returnValue;\n"+
"\n"+
"    for (var i = 0, length = arguments.length; i < length; i++) {\n"+
"      var lambda = arguments[i];\n"+
"      try {\n"+
"        returnValue = lambda();\n"+
"        break;\n"+
"      } catch (e) { }\n"+
"    }\n"+
"\n"+
"    return returnValue;\n"+
"  }\n"+
"};\n"+
"\n"+
"RegExp.prototype.match = RegExp.prototype.test;\n"+
"\n"+
"RegExp.escape = function(str) {\n"+
"  return String(str).replace(/([.*+?^=!:${}()|[\\]\\/\\\\])/g, '\\\\$1');\n"+
"};\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"var PeriodicalExecuter = Class.create({\n"+
"  initialize: function(callback, frequency) {\n"+
"    this.callback = callback;\n"+
"    this.frequency = frequency;\n"+
"    this.currentlyExecuting = false;\n"+
"\n"+
"    this.registerCallback();\n"+
"  },\n"+
"\n"+
"  registerCallback: function() {\n"+
"    this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);\n"+
"  },\n"+
"\n"+
"  execute: function() {\n"+
"    this.callback(this);\n"+
"  },\n"+
"\n"+
"  stop: function() {\n"+
"    if (!this.timer) return;\n"+
"    clearInterval(this.timer);\n"+
"    this.timer = null;\n"+
"  },\n"+
"\n"+
"  onTimerEvent: function() {\n"+
"    if (!this.currentlyExecuting) {\n"+
"      try {\n"+
"        this.currentlyExecuting = true;\n"+
"        this.execute();\n"+
"      } finally {\n"+
"        this.currentlyExecuting = false;\n"+
"      }\n"+
"    }\n"+
"  }\n"+
"});\n"+
"Object.extend(String, {\n"+
"  interpret: function(value) {\n"+
"    return value == null ? '' : String(value);\n"+
"  },\n"+
"  specialChar: {\n"+
"    '\\b': '\\\\b',\n"+
"    '\\t': '\\\\t',\n"+
"    '\\n': '\\\\n',\n"+
"    '\\f': '\\\\f',\n"+
"    '\\r': '\\\\r',\n"+
"    '\\\\': '\\\\\\\\'\n"+
"  }\n"+
"});\n"+
"\n"+
"Object.extend(String.prototype, {\n"+
"  gsub: function(pattern, replacement) {\n"+
"    var result = '', source = this, match;\n"+
"    replacement = arguments.callee.prepareReplacement(replacement);\n"+
"\n"+
"    while (source.length > 0) {\n"+
"      if (match = source.match(pattern)) {\n"+
"        result += source.slice(0, match.index);\n"+
"        result += String.interpret(replacement(match));\n"+
"        source  = source.slice(match.index + match[0].length);\n"+
"      } else {\n"+
"        result += source, source = '';\n"+
"      }\n"+
"    }\n"+
"    return result;\n"+
"  },\n"+
"\n"+
"  sub: function(pattern, replacement, count) {\n"+
"    replacement = this.gsub.prepareReplacement(replacement);\n"+
"    count = Object.isUndefined(count) ? 1 : count;\n"+
"\n"+
"    return this.gsub(pattern, function(match) {\n"+
"      if (--count < 0) return match[0];\n"+
"      return replacement(match);\n"+
"    });\n"+
"  },\n"+
"\n"+
"  scan: function(pattern, iterator) {\n"+
"    this.gsub(pattern, iterator);\n"+
"    return String(this);\n"+
"  },\n"+
"\n"+
"  truncate: function(length, truncation) {\n"+
"    length = length || 30;\n"+
"    truncation = Object.isUndefined(truncation) ? '...' : truncation;\n"+
"    return this.length > length ?\n"+
"      this.slice(0, length - truncation.length) + truncation : String(this);\n"+
"  },\n"+
"\n"+
"  strip: function() {\n"+
"    return this.replace(/^\\s+/, '').replace(/\\s+$/, '');\n"+
"  },\n"+
"\n"+
"  stripTags: function() {\n"+
"    return this.replace(/<\\/?[^>]+>/gi, '');\n"+
"  },\n"+
"\n"+
"  stripScripts: function() {\n"+
"    return this.replace(new RegExp(Prototype.ScriptFragment, 'img'), '');\n"+
"  },\n"+
"\n"+
"  extractScripts: function() {\n"+
"    var matchAll = new RegExp(Prototype.ScriptFragment, 'img');\n"+
"    var matchOne = new RegExp(Prototype.ScriptFragment, 'im');\n"+
"    return (this.match(matchAll) || []).map(function(scriptTag) {\n"+
"      return (scriptTag.match(matchOne) || ['', ''])[1];\n"+
"    });\n"+
"  },\n"+
"\n"+
"  evalScripts: function() {\n"+
"    return this.extractScripts().map(function(script) { return eval(script) });\n"+
"  },\n"+
"\n"+
"  escapeHTML: function() {\n"+
"    var self = arguments.callee;\n"+
"    self.text.data = this;\n"+
"    return self.div.innerHTML;\n"+
"  },\n"+
"\n"+
"  unescapeHTML: function() {\n"+
"    var div = new Element('div');\n"+
"    div.innerHTML = this.stripTags();\n"+
"    return div.childNodes[0] ? (div.childNodes.length > 1 ?\n"+
"      $A(div.childNodes).inject('', function(memo, node) { return memo+node.nodeValue }) :\n"+
"      div.childNodes[0].nodeValue) : '';\n"+
"  },\n"+
"\n"+
"  toQueryParams: function(separator) {\n"+
"    var match = this.strip().match(/([^?#]*)(#.*)?$/);\n"+
"    if (!match) return { };\n"+
"\n"+
"    return match[1].split(separator || '&').inject({ }, function(hash, pair) {\n"+
"      if ((pair = pair.split('='))[0]) {\n"+
"        var key = decodeURIComponent(pair.shift());\n"+
"        var value = pair.length > 1 ? pair.join('=') : pair[0];\n"+
"        if (value != undefined) value = decodeURIComponent(value);\n"+
"\n"+
"        if (key in hash) {\n"+
"          if (!Object.isArray(hash[key])) hash[key] = [hash[key]];\n"+
"          hash[key].push(value);\n"+
"        }\n"+
"        else hash[key] = value;\n"+
"      }\n"+
"      return hash;\n"+
"    });\n"+
"  },\n"+
"\n"+
"  toArray: function() {\n"+
"    return this.split('');\n"+
"  },\n"+
"\n"+
"  succ: function() {\n"+
"    return this.slice(0, this.length - 1) +\n"+
"      String.fromCharCode(this.charCodeAt(this.length - 1) + 1);\n"+
"  },\n"+
"\n"+
"  times: function(count) {\n"+
"    return count < 1 ? '' : new Array(count + 1).join(this);\n"+
"  },\n"+
"\n"+
"  camelize: function() {\n"+
"    var parts = this.split('-'), len = parts.length;\n"+
"    if (len == 1) return parts[0];\n"+
"\n"+
"    var camelized = this.charAt(0) == '-'\n"+
"      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)\n"+
"      : parts[0];\n"+
"\n"+
"    for (var i = 1; i < len; i++)\n"+
"      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);\n"+
"\n"+
"    return camelized;\n"+
"  },\n"+
"\n"+
"  capitalize: function() {\n"+
"    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();\n"+
"  },\n"+
"\n"+
"  underscore: function() {\n"+
"    return this.gsub(/::/, '/').gsub(/([A-Z]+)([A-Z][a-z])/,'#{1}_#{2}').gsub(/([a-z\\d])([A-Z])/,'#{1}_#{2}').gsub(/-/,'_').toLowerCase();\n"+
"  },\n"+
"\n"+
"  dasherize: function() {\n"+
"    return this.gsub(/_/,'-');\n"+
"  },\n"+
"\n"+
"  inspect: function(useDoubleQuotes) {\n"+
"    var escapedString = this.gsub(/[\\x00-\\x1f\\\\]/, function(match) {\n"+
"      var character = String.specialChar[match[0]];\n"+
"      return character ? character : '\\\\u00' + match[0].charCodeAt().toPaddedString(2, 16);\n"+
"    });\n"+
"    if (useDoubleQuotes) return '\"' + escapedString.replace(/\"/g, '\\\\\"') + '\"';\n"+
"    return \"'\" + escapedString.replace(/'/g, '\\\\\\'') + \"'\";\n"+
"  },\n"+
"\n"+
"  toJSON: function() {\n"+
"    return this.inspect(true);\n"+
"  },\n"+
"\n"+
"  unfilterJSON: function(filter) {\n"+
"    return this.sub(filter || Prototype.JSONFilter, '#{1}');\n"+
"  },\n"+
"\n"+
"  isJSON: function() {\n"+
"    var str = this;\n"+
"    if (str.blank()) return false;\n"+
"    str = this.replace(/\\\\./g, '@').replace(/\"[^\"\\\\\\n\\r]*\"/g, '');\n"+
"    return (/^[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t]*$/).test(str);\n"+
"  },\n"+
"\n"+
"  evalJSON: function(sanitize) {\n"+
"    var json = this.unfilterJSON();\n"+
"    try {\n"+
"      if (!sanitize || json.isJSON()) return eval('(' + json + ')');\n"+
"    } catch (e) { }\n"+
"    throw new SyntaxError('Badly formed JSON string: ' + this.inspect());\n"+
"  },\n"+
"\n"+
"  include: function(pattern) {\n"+
"    return this.indexOf(pattern) > -1;\n"+
"  },\n"+
"\n"+
"  startsWith: function(pattern) {\n"+
"    return this.indexOf(pattern) === 0;\n"+
"  },\n"+
"\n"+
"  endsWith: function(pattern) {\n"+
"    var d = this.length - pattern.length;\n"+
"    return d >= 0 && this.lastIndexOf(pattern) === d;\n"+
"  },\n"+
"\n"+
"  empty: function() {\n"+
"    return this == '';\n"+
"  },\n"+
"\n"+
"  blank: function() {\n"+
"    return /^\\s*$/.test(this);\n"+
"  },\n"+
"\n"+
"  interpolate: function(object, pattern) {\n"+
"    return new Template(this, pattern).evaluate(object);\n"+
"  }\n"+
"});\n"+
"\n"+
"if (Prototype.Browser.WebKit || Prototype.Browser.IE) Object.extend(String.prototype, {\n"+
"  escapeHTML: function() {\n"+
"    return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');\n"+
"  },\n"+
"  unescapeHTML: function() {\n"+
"    return this.stripTags().replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');\n"+
"  }\n"+
"});\n"+
"\n"+
"String.prototype.gsub.prepareReplacement = function(replacement) {\n"+
"  if (Object.isFunction(replacement)) return replacement;\n"+
"  var template = new Template(replacement);\n"+
"  return function(match) { return template.evaluate(match) };\n"+
"};\n"+
"\n"+
"String.prototype.parseQuery = String.prototype.toQueryParams;\n"+
"\n"+
"Object.extend(String.prototype.escapeHTML, {\n"+
"  div:  document.createElement('div'),\n"+
"  text: document.createTextNode('')\n"+
"});\n"+
"\n"+
"String.prototype.escapeHTML.div.appendChild(String.prototype.escapeHTML.text);\n"+
"\n"+
"var Template = Class.create({\n"+
"  initialize: function(template, pattern) {\n"+
"    this.template = template.toString();\n"+
"    this.pattern = pattern || Template.Pattern;\n"+
"  },\n"+
"\n"+
"  evaluate: function(object) {\n"+
"    if (Object.isFunction(object.toTemplateReplacements))\n"+
"      object = object.toTemplateReplacements();\n"+
"\n"+
"    return this.template.gsub(this.pattern, function(match) {\n"+
"      if (object == null) return '';\n"+
"\n"+
"      var before = match[1] || '';\n"+
"      if (before == '\\\\') return match[2];\n"+
"\n"+
"      var ctx = object, expr = match[3];\n"+
"      var pattern = /^([^.[]+|\\[((?:.*?[^\\\\])?)\\])(\\.|\\[|$)/;\n"+
"      match = pattern.exec(expr);\n"+
"      if (match == null) return before;\n"+
"\n"+
"      while (match != null) {\n"+
"        var comp = match[1].startsWith('[') ? match[2].gsub('\\\\\\\\]', ']') : match[1];\n"+
"        ctx = ctx[comp];\n"+
"        if (null == ctx || '' == match[3]) break;\n"+
"        expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);\n"+
"        match = pattern.exec(expr);\n"+
"      }\n"+
"\n"+
"      return before + String.interpret(ctx);\n"+
"    });\n"+
"  }\n"+
"});\n"+
"Template.Pattern = /(^|.|\\r|\\n)(#\\{(.*?)\\})/;\n"+
"\n"+
"var $break = { };\n"+
"\n"+
"var Enumerable = {\n"+
"  each: function(iterator, context) {\n"+
"    var index = 0;\n"+
"    try {\n"+
"      this._each(function(value) {\n"+
"        iterator.call(context, value, index++);\n"+
"      });\n"+
"    } catch (e) {\n"+
"      if (e != $break) throw e;\n"+
"    }\n"+
"    return this;\n"+
"  },\n"+
"\n"+
"  eachSlice: function(number, iterator, context) {\n"+
"    var index = -number, slices = [], array = this.toArray();\n"+
"    if (number < 1) return array;\n"+
"    while ((index += number) < array.length)\n"+
"      slices.push(array.slice(index, index+number));\n"+
"    return slices.collect(iterator, context);\n"+
"  },\n"+
"\n"+
"  all: function(iterator, context) {\n"+
"    iterator = iterator || Prototype.K;\n"+
"    var result = true;\n"+
"    this.each(function(value, index) {\n"+
"      result = result && !!iterator.call(context, value, index);\n"+
"      if (!result) throw $break;\n"+
"    });\n"+
"    return result;\n"+
"  },\n"+
"\n"+
"  any: function(iterator, context) {\n"+
"    iterator = iterator || Prototype.K;\n"+
"    var result = false;\n"+
"    this.each(function(value, index) {\n"+
"      if (result = !!iterator.call(context, value, index))\n"+
"        throw $break;\n"+
"    });\n"+
"    return result;\n"+
"  },\n"+
"\n"+
"  collect: function(iterator, context) {\n"+
"    iterator = iterator || Prototype.K;\n"+
"    var results = [];\n"+
"    this.each(function(value, index) {\n"+
"      results.push(iterator.call(context, value, index));\n"+
"    });\n"+
"    return results;\n"+
"  },\n"+
"\n"+
"  detect: function(iterator, context) {\n"+
"    var result;\n"+
"    this.each(function(value, index) {\n"+
"      if (iterator.call(context, value, index)) {\n"+
"        result = value;\n"+
"        throw $break;\n"+
"      }\n"+
"    });\n"+
"    return result;\n"+
"  },\n"+
"\n"+
"  findAll: function(iterator, context) {\n"+
"    var results = [];\n"+
"    this.each(function(value, index) {\n"+
"      if (iterator.call(context, value, index))\n"+
"        results.push(value);\n"+
"    });\n"+
"    return results;\n"+
"  },\n"+
"\n"+
"  grep: function(filter, iterator, context) {\n"+
"    iterator = iterator || Prototype.K;\n"+
"    var results = [];\n"+
"\n"+
"    if (Object.isString(filter))\n"+
"      filter = new RegExp(filter);\n"+
"\n"+
"    this.each(function(value, index) {\n"+
"      if (filter.match(value))\n"+
"        results.push(iterator.call(context, value, index));\n"+
"    });\n"+
"    return results;\n"+
"  },\n"+
"\n"+
"  include: function(object) {\n"+
"    if (Object.isFunction(this.indexOf))\n"+
"      if (this.indexOf(object) != -1) return true;\n"+
"\n"+
"    var found = false;\n"+
"    this.each(function(value) {\n"+
"      if (value == object) {\n"+
"        found = true;\n"+
"        throw $break;\n"+
"      }\n"+
"    });\n"+
"    return found;\n"+
"  },\n"+
"\n"+
"  inGroupsOf: function(number, fillWith) {\n"+
"    fillWith = Object.isUndefined(fillWith) ? null : fillWith;\n"+
"    return this.eachSlice(number, function(slice) {\n"+
"      while(slice.length < number) slice.push(fillWith);\n"+
"      return slice;\n"+
"    });\n"+
"  },\n"+
"\n"+
"  inject: function(memo, iterator, context) {\n"+
"    this.each(function(value, index) {\n"+
"      memo = iterator.call(context, memo, value, index);\n"+
"    });\n"+
"    return memo;\n"+
"  },\n"+
"\n"+
"  invoke: function(method) {\n"+
"    var args = $A(arguments).slice(1);\n"+
"    return this.map(function(value) {\n"+
"      return value[method].apply(value, args);\n"+
"    });\n"+
"  },\n"+
"\n"+
"  max: function(iterator, context) {\n"+
"    iterator = iterator || Prototype.K;\n"+
"    var result;\n"+
"    this.each(function(value, index) {\n"+
"      value = iterator.call(context, value, index);\n"+
"      if (result == null || value >= result)\n"+
"        result = value;\n"+
"    });\n"+
"    return result;\n"+
"  },\n"+
"\n"+
"  min: function(iterator, context) {\n"+
"    iterator = iterator || Prototype.K;\n"+
"    var result;\n"+
"    this.each(function(value, index) {\n"+
"      value = iterator.call(context, value, index);\n"+
"      if (result == null || value < result)\n"+
"        result = value;\n"+
"    });\n"+
"    return result;\n"+
"  },\n"+
"\n"+
"  partition: function(iterator, context) {\n"+
"    iterator = iterator || Prototype.K;\n"+
"    var trues = [], falses = [];\n"+
"    this.each(function(value, index) {\n"+
"      (iterator.call(context, value, index) ?\n"+
"        trues : falses).push(value);\n"+
"    });\n"+
"    return [trues, falses];\n"+
"  },\n"+
"\n"+
"  pluck: function(property) {\n"+
"    var results = [];\n"+
"    this.each(function(value) {\n"+
"      results.push(value[property]);\n"+
"    });\n"+
"    return results;\n"+
"  },\n"+
"\n"+
"  reject: function(iterator, context) {\n"+
"    var results = [];\n"+
"    this.each(function(value, index) {\n"+
"      if (!iterator.call(context, value, index))\n"+
"        results.push(value);\n"+
"    });\n"+
"    return results;\n"+
"  },\n"+
"\n"+
"  sortBy: function(iterator, context) {\n"+
"    return this.map(function(value, index) {\n"+
"      return {\n"+
"        value: value,\n"+
"        criteria: iterator.call(context, value, index)\n"+
"      };\n"+
"    }).sort(function(left, right) {\n"+
"      var a = left.criteria, b = right.criteria;\n"+
"      return a < b ? -1 : a > b ? 1 : 0;\n"+
"    }).pluck('value');\n"+
"  },\n"+
"\n"+
"  toArray: function() {\n"+
"    return this.map();\n"+
"  },\n"+
"\n"+
"  zip: function() {\n"+
"    var iterator = Prototype.K, args = $A(arguments);\n"+
"    if (Object.isFunction(args.last()))\n"+
"      iterator = args.pop();\n"+
"\n"+
"    var collections = [this].concat(args).map($A);\n"+
"    return this.map(function(value, index) {\n"+
"      return iterator(collections.pluck(index));\n"+
"    });\n"+
"  },\n"+
"\n"+
"  size: function() {\n"+
"    return this.toArray().length;\n"+
"  },\n"+
"\n"+
"  inspect: function() {\n"+
"    return '#<Enumerable:' + this.toArray().inspect() + '>';\n"+
"  }\n"+
"};\n"+
"\n"+
"Object.extend(Enumerable, {\n"+
"  map:     Enumerable.collect,\n"+
"  find:    Enumerable.detect,\n"+
"  select:  Enumerable.findAll,\n"+
"  filter:  Enumerable.findAll,\n"+
"  member:  Enumerable.include,\n"+
"  entries: Enumerable.toArray,\n"+
"  every:   Enumerable.all,\n"+
"  some:    Enumerable.any\n"+
"});\n"+
"function $A(iterable) {\n"+
"  if (!iterable) return [];\n"+
"  if (iterable.toArray) return iterable.toArray();\n"+
"  var length = iterable.length || 0, results = new Array(length);\n"+
"  while (length--) results[length] = iterable[length];\n"+
"  return results;\n"+
"}\n"+
"\n"+
"if (Prototype.Browser.WebKit) {\n"+
"  $A = function(iterable) {\n"+
"    if (!iterable) return [];\n"+
"    // In Safari, only use the `toArray` method if it's not a NodeList.\n"+
"    // A NodeList is a function, has an function `item` property, and a numeric\n"+
"    // `length` property. Adapted from Google Doctype.\n"+
"    if (!(typeof iterable === 'function' && typeof iterable.length ===\n"+
"        'number' && typeof iterable.item === 'function') && iterable.toArray)\n"+
"      return iterable.toArray();\n"+
"    var length = iterable.length || 0, results = new Array(length);\n"+
"    while (length--) results[length] = iterable[length];\n"+
"    return results;\n"+
"  };\n"+
"}\n"+
"\n"+
"Array.from = $A;\n"+
"\n"+
"Object.extend(Array.prototype, Enumerable);\n"+
"\n"+
"if (!Array.prototype._reverse) Array.prototype._reverse = Array.prototype.reverse;\n"+
"\n"+
"Object.extend(Array.prototype, {\n"+
"  _each: function(iterator) {\n"+
"    for (var i = 0, length = this.length; i < length; i++)\n"+
"      iterator(this[i]);\n"+
"  },\n"+
"\n"+
"  clear: function() {\n"+
"    this.length = 0;\n"+
"    return this;\n"+
"  },\n"+
"\n"+
"  first: function() {\n"+
"    return this[0];\n"+
"  },\n"+
"\n"+
"  last: function() {\n"+
"    return this[this.length - 1];\n"+
"  },\n"+
"\n"+
"  compact: function() {\n"+
"    return this.select(function(value) {\n"+
"      return value != null;\n"+
"    });\n"+
"  },\n"+
"\n"+
"  flatten: function() {\n"+
"    return this.inject([], function(array, value) {\n"+
"      return array.concat(Object.isArray(value) ?\n"+
"        value.flatten() : [value]);\n"+
"    });\n"+
"  },\n"+
"\n"+
"  without: function() {\n"+
"    var values = $A(arguments);\n"+
"    return this.select(function(value) {\n"+
"      return !values.include(value);\n"+
"    });\n"+
"  },\n"+
"\n"+
"  reverse: function(inline) {\n"+
"    return (inline !== false ? this : this.toArray())._reverse();\n"+
"  },\n"+
"\n"+
"  reduce: function() {\n"+
"    return this.length > 1 ? this : this[0];\n"+
"  },\n"+
"\n"+
"  uniq: function(sorted) {\n"+
"    return this.inject([], function(array, value, index) {\n"+
"      if (0 == index || (sorted ? array.last() != value : !array.include(value)))\n"+
"        array.push(value);\n"+
"      return array;\n"+
"    });\n"+
"  },\n"+
"\n"+
"  intersect: function(array) {\n"+
"    return this.uniq().findAll(function(item) {\n"+
"      return array.detect(function(value) { return item === value });\n"+
"    });\n"+
"  },\n"+
"\n"+
"  clone: function() {\n"+
"    return [].concat(this);\n"+
"  },\n"+
"\n"+
"  size: function() {\n"+
"    return this.length;\n"+
"  },\n"+
"\n"+
"  inspect: function() {\n"+
"    return '[' + this.map(Object.inspect).join(', ') + ']';\n"+
"  },\n"+
"\n"+
"  toJSON: function() {\n"+
"    var results = [];\n"+
"    this.each(function(object) {\n"+
"      var value = Object.toJSON(object);\n"+
"      if (!Object.isUndefined(value)) results.push(value);\n"+
"    });\n"+
"    return '[' + results.join(', ') + ']';\n"+
"  }\n"+
"});\n"+
"\n"+
"// use native browser JS 1.6 implementation if available\n"+
"if (Object.isFunction(Array.prototype.forEach))\n"+
"  Array.prototype._each = Array.prototype.forEach;\n"+
"\n"+
"if (!Array.prototype.indexOf) Array.prototype.indexOf = function(item, i) {\n"+
"  i || (i = 0);\n"+
"  var length = this.length;\n"+
"  if (i < 0) i = length + i;\n"+
"  for (; i < length; i++)\n"+
"    if (this[i] === item) return i;\n"+
"  return -1;\n"+
"};\n"+
"\n"+
"if (!Array.prototype.lastIndexOf) Array.prototype.lastIndexOf = function(item, i) {\n"+
"  i = isNaN(i) ? this.length : (i < 0 ? this.length + i : i) + 1;\n"+
"  var n = this.slice(0, i).reverse().indexOf(item);\n"+
"  return (n < 0) ? n : i - n - 1;\n"+
"};\n"+
"\n"+
"Array.prototype.toArray = Array.prototype.clone;\n"+
"\n"+
"function $w(string) {\n"+
"  if (!Object.isString(string)) return [];\n"+
"  string = string.strip();\n"+
"  return string ? string.split(/\\s+/) : [];\n"+
"}\n"+
"\n"+
"if (Prototype.Browser.Opera){\n"+
"  Array.prototype.concat = function() {\n"+
"    var array = [];\n"+
"    for (var i = 0, length = this.length; i < length; i++) array.push(this[i]);\n"+
"    for (var i = 0, length = arguments.length; i < length; i++) {\n"+
"      if (Object.isArray(arguments[i])) {\n"+
"        for (var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++)\n"+
"          array.push(arguments[i][j]);\n"+
"      } else {\n"+
"        array.push(arguments[i]);\n"+
"      }\n"+
"    }\n"+
"    return array;\n"+
"  };\n"+
"}\n"+
"Object.extend(Number.prototype, {\n"+
"  toColorPart: function() {\n"+
"    return this.toPaddedString(2, 16);\n"+
"  },\n"+
"\n"+
"  succ: function() {\n"+
"    return this + 1;\n"+
"  },\n"+
"\n"+
"  times: function(iterator, context) {\n"+
"    $R(0, this, true).each(iterator, context);\n"+
"    return this;\n"+
"  },\n"+
"\n"+
"  toPaddedString: function(length, radix) {\n"+
"    var string = this.toString(radix || 10);\n"+
"    return '0'.times(length - string.length) + string;\n"+
"  },\n"+
"\n"+
"  toJSON: function() {\n"+
"    return isFinite(this) ? this.toString() : 'null';\n"+
"  }\n"+
"});\n"+
"\n"+
"$w('abs round ceil floor').each(function(method){\n"+
"  Number.prototype[method] = Math[method].methodize();\n"+
"});\n"+
"function $H(object) {\n"+
"  return new Hash(object);\n"+
"};\n"+
"\n"+
"var Hash = Class.create(Enumerable, (function() {\n"+
"\n"+
"  function toQueryPair(key, value) {\n"+
"    if (Object.isUndefined(value)) return key;\n"+
"    return key + '=' + encodeURIComponent(String.interpret(value));\n"+
"  }\n"+
"\n"+
"  return {\n"+
"    initialize: function(object) {\n"+
"      this._object = Object.isHash(object) ? object.toObject() : Object.clone(object);\n"+
"    },\n"+
"\n"+
"    _each: function(iterator) {\n"+
"      for (var key in this._object) {\n"+
"        var value = this._object[key], pair = [key, value];\n"+
"        pair.key = key;\n"+
"        pair.value = value;\n"+
"        iterator(pair);\n"+
"      }\n"+
"    },\n"+
"\n"+
"    set: function(key, value) {\n"+
"      return this._object[key] = value;\n"+
"    },\n"+
"\n"+
"    get: function(key) {\n"+
"      // simulating poorly supported hasOwnProperty\n"+
"      if (this._object[key] !== Object.prototype[key])\n"+
"        return this._object[key];\n"+
"    },\n"+
"\n"+
"    unset: function(key) {\n"+
"      var value = this._object[key];\n"+
"      delete this._object[key];\n"+
"      return value;\n"+
"    },\n"+
"\n"+
"    toObject: function() {\n"+
"      return Object.clone(this._object);\n"+
"    },\n"+
"\n"+
"    keys: function() {\n"+
"      return this.pluck('key');\n"+
"    },\n"+
"\n"+
"    values: function() {\n"+
"      return this.pluck('value');\n"+
"    },\n"+
"\n"+
"    index: function(value) {\n"+
"      var match = this.detect(function(pair) {\n"+
"        return pair.value === value;\n"+
"      });\n"+
"      return match && match.key;\n"+
"    },\n"+
"\n"+
"    merge: function(object) {\n"+
"      return this.clone().update(object);\n"+
"    },\n"+
"\n"+
"    update: function(object) {\n"+
"      return new Hash(object).inject(this, function(result, pair) {\n"+
"        result.set(pair.key, pair.value);\n"+
"        return result;\n"+
"      });\n"+
"    },\n"+
"\n"+
"    toQueryString: function() {\n"+
"      return this.inject([], function(results, pair) {\n"+
"        var key = encodeURIComponent(pair.key), values = pair.value;\n"+
"\n"+
"        if (values && typeof values == 'object') {\n"+
"          if (Object.isArray(values))\n"+
"            return results.concat(values.map(toQueryPair.curry(key)));\n"+
"        } else results.push(toQueryPair(key, values));\n"+
"        return results;\n"+
"      }).join('&');\n"+
"    },\n"+
"\n"+
"    inspect: function() {\n"+
"      return '#<Hash:{' + this.map(function(pair) {\n"+
"        return pair.map(Object.inspect).join(': ');\n"+
"      }).join(', ') + '}>';\n"+
"    },\n"+
"\n"+
"    toJSON: function() {\n"+
"      return Object.toJSON(this.toObject());\n"+
"    },\n"+
"\n"+
"    clone: function() {\n"+
"      return new Hash(this);\n"+
"    }\n"+
"  }\n"+
"})());\n"+
"\n"+
"Hash.prototype.toTemplateReplacements = Hash.prototype.toObject;\n"+
"Hash.from = $H;\n"+
"var ObjectRange = Class.create(Enumerable, {\n"+
"  initialize: function(start, end, exclusive) {\n"+
"    this.start = start;\n"+
"    this.end = end;\n"+
"    this.exclusive = exclusive;\n"+
"  },\n"+
"\n"+
"  _each: function(iterator) {\n"+
"    var value = this.start;\n"+
"    while (this.include(value)) {\n"+
"      iterator(value);\n"+
"      value = value.succ();\n"+
"    }\n"+
"  },\n"+
"\n"+
"  include: function(value) {\n"+
"    if (value < this.start)\n"+
"      return false;\n"+
"    if (this.exclusive)\n"+
"      return value < this.end;\n"+
"    return value <= this.end;\n"+
"  }\n"+
"});\n"+
"\n"+
"var $R = function(start, end, exclusive) {\n"+
"  return new ObjectRange(start, end, exclusive);\n"+
"};\n"+
"\n"+
"var Ajax = {\n"+
"  getTransport: function() {\n"+
"    return Try.these(\n"+
"      function() {return new XMLHttpRequest()},\n"+
"      function() {return new ActiveXObject('Msxml2.XMLHTTP')},\n"+
"      function() {return new ActiveXObject('Microsoft.XMLHTTP')}\n"+
"    ) || false;\n"+
"  },\n"+
"\n"+
"  activeRequestCount: 0\n"+
"};\n"+
"\n"+
"Ajax.Responders = {\n"+
"  responders: [],\n"+
"\n"+
"  _each: function(iterator) {\n"+
"    this.responders._each(iterator);\n"+
"  },\n"+
"\n"+
"  register: function(responder) {\n"+
"    if (!this.include(responder))\n"+
"      this.responders.push(responder);\n"+
"  },\n"+
"\n"+
"  unregister: function(responder) {\n"+
"    this.responders = this.responders.without(responder);\n"+
"  },\n"+
"\n"+
"  dispatch: function(callback, request, transport, json) {\n"+
"    this.each(function(responder) {\n"+
"      if (Object.isFunction(responder[callback])) {\n"+
"        try {\n"+
"          responder[callback].apply(responder, [request, transport, json]);\n"+
"        } catch (e) { }\n"+
"      }\n"+
"    });\n"+
"  }\n"+
"};\n"+
"\n"+
"Object.extend(Ajax.Responders, Enumerable);\n"+
"\n"+
"Ajax.Responders.register({\n"+
"  onCreate:   function() { Ajax.activeRequestCount++ },\n"+
"  onComplete: function() { Ajax.activeRequestCount-- }\n"+
"});\n"+
"\n"+
"Ajax.Base = Class.create({\n"+
"  initialize: function(options) {\n"+
"    this.options = {\n"+
"      method:       'post',\n"+
"      asynchronous: true,\n"+
"      contentType:  'application/x-www-form-urlencoded',\n"+
"      encoding:     'UTF-8',\n"+
"      parameters:   '',\n"+
"      evalJSON:     true,\n"+
"      evalJS:       true\n"+
"    };\n"+
"    Object.extend(this.options, options || { });\n"+
"\n"+
"    this.options.method = this.options.method.toLowerCase();\n"+
"\n"+
"    if (Object.isString(this.options.parameters))\n"+
"      this.options.parameters = this.options.parameters.toQueryParams();\n"+
"    else if (Object.isHash(this.options.parameters))\n"+
"      this.options.parameters = this.options.parameters.toObject();\n"+
"  }\n"+
"});\n"+
"\n"+
"Ajax.Request = Class.create(Ajax.Base, {\n"+
"  _complete: false,\n"+
"\n"+
"  initialize: function($super, url, options) {\n"+
"    $super(options);\n"+
"    this.transport = Ajax.getTransport();\n"+
"    this.request(url);\n"+
"  },\n"+
"\n"+
"  request: function(url) {\n"+
"    this.url = url;\n"+
"    this.method = this.options.method;\n"+
"    var params = Object.clone(this.options.parameters);\n"+
"\n"+
"    if (!['get', 'post'].include(this.method)) {\n"+
"      // simulate other verbs over post\n"+
"      params['_method'] = this.method;\n"+
"      this.method = 'post';\n"+
"    }\n"+
"\n"+
"    this.parameters = params;\n"+
"\n"+
"    if (params = Object.toQueryString(params)) {\n"+
"      // when GET, append parameters to URL\n"+
"      if (this.method == 'get')\n"+
"        this.url += (this.url.include('?') ? '&' : '?') + params;\n"+
"      else if (/Konqueror|Safari|KHTML/.test(navigator.userAgent))\n"+
"        params += '&_=';\n"+
"    }\n"+
"\n"+
"    try {\n"+
"      var response = new Ajax.Response(this);\n"+
"      if (this.options.onCreate) this.options.onCreate(response);\n"+
"      Ajax.Responders.dispatch('onCreate', this, response);\n"+
"\n"+
"      this.transport.open(this.method.toUpperCase(), this.url,\n"+
"        this.options.asynchronous);\n"+
"\n"+
"      if (this.options.asynchronous) this.respondToReadyState.bind(this).defer(1);\n"+
"\n"+
"      this.transport.onreadystatechange = this.onStateChange.bind(this);\n"+
"      this.setRequestHeaders();\n"+
"\n"+
"      this.body = this.method == 'post' ? (this.options.postBody || params) : null;\n"+
"      this.transport.send(this.body);\n"+
"\n"+
"      /* Force Firefox to handle ready state 4 for synchronous requests */\n"+
"      if (!this.options.asynchronous && this.transport.overrideMimeType)\n"+
"        this.onStateChange();\n"+
"\n"+
"    }\n"+
"    catch (e) {\n"+
"      this.dispatchException(e);\n"+
"    }\n"+
"  },\n"+
"\n"+
"  onStateChange: function() {\n"+
"    var readyState = this.transport.readyState;\n"+
"    if (readyState > 1 && !((readyState == 4) && this._complete))\n"+
"      this.respondToReadyState(this.transport.readyState);\n"+
"  },\n"+
"\n"+
"  setRequestHeaders: function() {\n"+
"    var headers = {\n"+
"      'X-Requested-With': 'XMLHttpRequest',\n"+
"      'X-Prototype-Version': Prototype.Version,\n"+
"      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'\n"+
"    };\n"+
"\n"+
"    if (this.method == 'post') {\n"+
"      headers['Content-type'] = this.options.contentType +\n"+
"        (this.options.encoding ? '; charset=' + this.options.encoding : '');\n"+
"\n"+
"      /* Force \"Connection: close\" for older Mozilla browsers to work\n"+
"       * around a bug where XMLHttpRequest sends an incorrect\n"+
"       * Content-length header. See Mozilla Bugzilla #246651.\n"+
"       */\n"+
"      if (this.transport.overrideMimeType &&\n"+
"          (navigator.userAgent.match(/Gecko\\/(\\d{4})/) || [0,2005])[1] < 2005)\n"+
"            headers['Connection'] = 'close';\n"+
"    }\n"+
"\n"+
"    // user-defined headers\n"+
"    if (typeof this.options.requestHeaders == 'object') {\n"+
"      var extras = this.options.requestHeaders;\n"+
"\n"+
"      if (Object.isFunction(extras.push))\n"+
"        for (var i = 0, length = extras.length; i < length; i += 2)\n"+
"          headers[extras[i]] = extras[i+1];\n"+
"      else\n"+
"        $H(extras).each(function(pair) { headers[pair.key] = pair.value });\n"+
"    }\n"+
"\n"+
"    for (var name in headers)\n"+
"      this.transport.setRequestHeader(name, headers[name]);\n"+
"  },\n"+
"\n"+
"  success: function() {\n"+
"    var status = this.getStatus();\n"+
"    return !status || (status >= 200 && status < 300);\n"+
"  },\n"+
"\n"+
"  getStatus: function() {\n"+
"    try {\n"+
"      return this.transport.status || 0;\n"+
"    } catch (e) { return 0 }\n"+
"  },\n"+
"\n"+
"  respondToReadyState: function(readyState) {\n"+
"    var state = Ajax.Request.Events[readyState], response = new Ajax.Response(this);\n"+
"\n"+
"    if (state == 'Complete') {\n"+
"      try {\n"+
"        this._complete = true;\n"+
"        (this.options['on' + response.status]\n"+
"         || this.options['on' + (this.success() ? 'Success' : 'Failure')]\n"+
"         || Prototype.emptyFunction)(response, response.headerJSON);\n"+
"      } catch (e) {\n"+
"        this.dispatchException(e);\n"+
"      }\n"+
"\n"+
"      var contentType = response.getHeader('Content-type');\n"+
"      if (this.options.evalJS == 'force'\n"+
"          || (this.options.evalJS && this.isSameOrigin() && contentType\n"+
"          && contentType.match(/^\\s*(text|application)\\/(x-)?(java|ecma)script(;.*)?\\s*$/i)))\n"+
"        this.evalResponse();\n"+
"    }\n"+
"\n"+
"    try {\n"+
"      (this.options['on' + state] || Prototype.emptyFunction)(response, response.headerJSON);\n"+
"      Ajax.Responders.dispatch('on' + state, this, response, response.headerJSON);\n"+
"    } catch (e) {\n"+
"      this.dispatchException(e);\n"+
"    }\n"+
"\n"+
"    if (state == 'Complete') {\n"+
"      // avoid memory leak in MSIE: clean up\n"+
"      this.transport.onreadystatechange = Prototype.emptyFunction;\n"+
"    }\n"+
"  },\n"+
"\n"+
"  isSameOrigin: function() {\n"+
"    var m = this.url.match(/^\\s*https?:\\/\\/[^\\/]*/);\n"+
"    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({\n"+
"      protocol: location.protocol,\n"+
"      domain: document.domain,\n"+
"      port: location.port ? ':' + location.port : ''\n"+
"    }));\n"+
"  },\n"+
"\n"+
"  getHeader: function(name) {\n"+
"    try {\n"+
"      return this.transport.getResponseHeader(name) || null;\n"+
"    } catch (e) { return null }\n"+
"  },\n"+
"\n"+
"  evalResponse: function() {\n"+
"    try {\n"+
"      return eval((this.transport.responseText || '').unfilterJSON());\n"+
"    } catch (e) {\n"+
"      this.dispatchException(e);\n"+
"    }\n"+
"  },\n"+
"\n"+
"  dispatchException: function(exception) {\n"+
"    (this.options.onException || Prototype.emptyFunction)(this, exception);\n"+
"    Ajax.Responders.dispatch('onException', this, exception);\n"+
"  }\n"+
"});\n"+
"\n"+
"Ajax.Request.Events =\n"+
"  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];\n"+
"\n"+
"Ajax.Response = Class.create({\n"+
"  initialize: function(request){\n"+
"    this.request = request;\n"+
"    var transport  = this.transport  = request.transport,\n"+
"        readyState = this.readyState = transport.readyState;\n"+
"\n"+
"    if((readyState > 2 && !Prototype.Browser.IE) || readyState == 4) {\n"+
"      this.status       = this.getStatus();\n"+
"      this.statusText   = this.getStatusText();\n"+
"      this.responseText = String.interpret(transport.responseText);\n"+
"      this.headerJSON   = this._getHeaderJSON();\n"+
"    }\n"+
"\n"+
"    if(readyState == 4) {\n"+
"      var xml = transport.responseXML;\n"+
"      this.responseXML  = Object.isUndefined(xml) ? null : xml;\n"+
"      this.responseJSON = this._getResponseJSON();\n"+
"    }\n"+
"  },\n"+
"\n"+
"  status:      0,\n"+
"  statusText: '',\n"+
"\n"+
"  getStatus: Ajax.Request.prototype.getStatus,\n"+
"\n"+
"  getStatusText: function() {\n"+
"    try {\n"+
"      return this.transport.statusText || '';\n"+
"    } catch (e) { return '' }\n"+
"  },\n"+
"\n"+
"  getHeader: Ajax.Request.prototype.getHeader,\n"+
"\n"+
"  getAllHeaders: function() {\n"+
"    try {\n"+
"      return this.getAllResponseHeaders();\n"+
"    } catch (e) { return null }\n"+
"  },\n"+
"\n"+
"  getResponseHeader: function(name) {\n"+
"    return this.transport.getResponseHeader(name);\n"+
"  },\n"+
"\n"+
"  getAllResponseHeaders: function() {\n"+
"    return this.transport.getAllResponseHeaders();\n"+
"  },\n"+
"\n"+
"  _getHeaderJSON: function() {\n"+
"    var json = this.getHeader('X-JSON');\n"+
"    if (!json) return null;\n"+
"    json = decodeURIComponent(escape(json));\n"+
"    try {\n"+
"      return json.evalJSON(this.request.options.sanitizeJSON ||\n"+
"        !this.request.isSameOrigin());\n"+
"    } catch (e) {\n"+
"      this.request.dispatchException(e);\n"+
"    }\n"+
"  },\n"+
"\n"+
"  _getResponseJSON: function() {\n"+
"    var options = this.request.options;\n"+
"    if (!options.evalJSON || (options.evalJSON != 'force' &&\n"+
"      !(this.getHeader('Content-type') || '').include('application/json')) ||\n"+
"        this.responseText.blank())\n"+
"          return null;\n"+
"    try {\n"+
"      return this.responseText.evalJSON(options.sanitizeJSON ||\n"+
"        !this.request.isSameOrigin());\n"+
"    } catch (e) {\n"+
"      this.request.dispatchException(e);\n"+
"    }\n"+
"  }\n"+
"});\n"+
"\n"+
"Ajax.Updater = Class.create(Ajax.Request, {\n"+
"  initialize: function($super, container, url, options) {\n"+
"    this.container = {\n"+
"      success: (container.success || container),\n"+
"      failure: (container.failure || (container.success ? null : container))\n"+
"    };\n"+
"\n"+
"    options = Object.clone(options);\n"+
"    var onComplete = options.onComplete;\n"+
"    options.onComplete = (function(response, json) {\n"+
"      this.updateContent(response.responseText);\n"+
"      if (Object.isFunction(onComplete)) onComplete(response, json);\n"+
"    }).bind(this);\n"+
"\n"+
"    $super(url, options);\n"+
"  },\n"+
"\n"+
"  updateContent: function(responseText) {\n"+
"    var receiver = this.container[this.success() ? 'success' : 'failure'],\n"+
"        options = this.options;\n"+
"\n"+
"    if (!options.evalScripts) responseText = responseText.stripScripts();\n"+
"\n"+
"    if (receiver = $(receiver)) {\n"+
"      if (options.insertion) {\n"+
"        if (Object.isString(options.insertion)) {\n"+
"          var insertion = { }; insertion[options.insertion] = responseText;\n"+
"          receiver.insert(insertion);\n"+
"        }\n"+
"        else options.insertion(receiver, responseText);\n"+
"      }\n"+
"      else receiver.update(responseText);\n"+
"    }\n"+
"  }\n"+
"});\n"+
"\n"+
"Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {\n"+
"  initialize: function($super, container, url, options) {\n"+
"    $super(options);\n"+
"    this.onComplete = this.options.onComplete;\n"+
"\n"+
"    this.frequency = (this.options.frequency || 2);\n"+
"    this.decay = (this.options.decay || 1);\n"+
"\n"+
"    this.updater = { };\n"+
"    this.container = container;\n"+
"    this.url = url;\n"+
"\n"+
"    this.start();\n"+
"  },\n"+
"\n"+
"  start: function() {\n"+
"    this.options.onComplete = this.updateComplete.bind(this);\n"+
"    this.onTimerEvent();\n"+
"  },\n"+
"\n"+
"  stop: function() {\n"+
"    this.updater.options.onComplete = undefined;\n"+
"    clearTimeout(this.timer);\n"+
"    (this.onComplete || Prototype.emptyFunction).apply(this, arguments);\n"+
"  },\n"+
"\n"+
"  updateComplete: function(response) {\n"+
"    if (this.options.decay) {\n"+
"      this.decay = (response.responseText == this.lastText ?\n"+
"        this.decay * this.options.decay : 1);\n"+
"\n"+
"      this.lastText = response.responseText;\n"+
"    }\n"+
"    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);\n"+
"  },\n"+
"\n"+
"  onTimerEvent: function() {\n"+
"    this.updater = new Ajax.Updater(this.container, this.url, this.options);\n"+
"  }\n"+
"});\n"+
"function $(element) {\n"+
"  if (arguments.length > 1) {\n"+
"    for (var i = 0, elements = [], length = arguments.length; i < length; i++)\n"+
"      elements.push($(arguments[i]));\n"+
"    return elements;\n"+
"  }\n"+
"  if (Object.isString(element))\n"+
"    element = document.getElementById(element);\n"+
"  return Element.extend(element);\n"+
"}\n"+
"\n"+
"if (Prototype.BrowserFeatures.XPath) {\n"+
"  document._getElementsByXPath = function(expression, parentElement) {\n"+
"    var results = [];\n"+
"    var query = document.evaluate(expression, $(parentElement) || document,\n"+
"      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\n"+
"    for (var i = 0, length = query.snapshotLength; i < length; i++)\n"+
"      results.push(Element.extend(query.snapshotItem(i)));\n"+
"    return results;\n"+
"  };\n"+
"}\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"if (!window.Node) var Node = { };\n"+
"\n"+
"if (!Node.ELEMENT_NODE) {\n"+
"  // DOM level 2 ECMAScript Language Binding\n"+
"  Object.extend(Node, {\n"+
"    ELEMENT_NODE: 1,\n"+
"    ATTRIBUTE_NODE: 2,\n"+
"    TEXT_NODE: 3,\n"+
"    CDATA_SECTION_NODE: 4,\n"+
"    ENTITY_REFERENCE_NODE: 5,\n"+
"    ENTITY_NODE: 6,\n"+
"    PROCESSING_INSTRUCTION_NODE: 7,\n"+
"    COMMENT_NODE: 8,\n"+
"    DOCUMENT_NODE: 9,\n"+
"    DOCUMENT_TYPE_NODE: 10,\n"+
"    DOCUMENT_FRAGMENT_NODE: 11,\n"+
"    NOTATION_NODE: 12\n"+
"  });\n"+
"}\n"+
"\n"+
"(function() {\n"+
"  var element = this.Element;\n"+
"  this.Element = function(tagName, attributes) {\n"+
"    attributes = attributes || { };\n"+
"    tagName = tagName.toLowerCase();\n"+
"    var cache = Element.cache;\n"+
"    if (Prototype.Browser.IE && attributes.name) {\n"+
"      tagName = '<' + tagName + ' name=\"' + attributes.name + '\">';\n"+
"      delete attributes.name;\n"+
"      return Element.writeAttribute(document.createElement(tagName), attributes);\n"+
"    }\n"+
"    if (!cache[tagName]) cache[tagName] = Element.extend(document.createElement(tagName));\n"+
"    return Element.writeAttribute(cache[tagName].cloneNode(false), attributes);\n"+
"  };\n"+
"  Object.extend(this.Element, element || { });\n"+
"  if (element) this.Element.prototype = element.prototype;\n"+
"}).call(window);\n"+
"\n"+
"Element.cache = { };\n"+
"\n"+
"Element.Methods = {\n"+
"  visible: function(element) {\n"+
"    return $(element).style.display != 'none';\n"+
"  },\n"+
"\n"+
"  toggle: function(element) {\n"+
"    element = $(element);\n"+
"    Element[Element.visible(element) ? 'hide' : 'show'](element);\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  hide: function(element) {\n"+
"    element = $(element);\n"+
"    element.style.display = 'none';\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  show: function(element) {\n"+
"    element = $(element);\n"+
"    element.style.display = '';\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  remove: function(element) {\n"+
"    element = $(element);\n"+
"    element.parentNode.removeChild(element);\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  update: function(element, content) {\n"+
"    element = $(element);\n"+
"    if (content && content.toElement) content = content.toElement();\n"+
"    if (Object.isElement(content)) return element.update().insert(content);\n"+
"    content = Object.toHTML(content);\n"+
"    element.innerHTML = content.stripScripts();\n"+
"    content.evalScripts.bind(content).defer();\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  replace: function(element, content) {\n"+
"    element = $(element);\n"+
"    if (content && content.toElement) content = content.toElement();\n"+
"    else if (!Object.isElement(content)) {\n"+
"      content = Object.toHTML(content);\n"+
"      var range = element.ownerDocument.createRange();\n"+
"      range.selectNode(element);\n"+
"      content.evalScripts.bind(content).defer();\n"+
"      content = range.createContextualFragment(content.stripScripts());\n"+
"    }\n"+
"    element.parentNode.replaceChild(content, element);\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  insert: function(element, insertions) {\n"+
"    element = $(element);\n"+
"\n"+
"    if (Object.isString(insertions) || Object.isNumber(insertions) ||\n"+
"        Object.isElement(insertions) || (insertions && (insertions.toElement || insertions.toHTML)))\n"+
"          insertions = {bottom:insertions};\n"+
"\n"+
"    var content, insert, tagName, childNodes;\n"+
"\n"+
"    for (var position in insertions) {\n"+
"      content  = insertions[position];\n"+
"      position = position.toLowerCase();\n"+
"      insert = Element._insertionTranslations[position];\n"+
"\n"+
"      if (content && content.toElement) content = content.toElement();\n"+
"      if (Object.isElement(content)) {\n"+
"        insert(element, content);\n"+
"        continue;\n"+
"      }\n"+
"\n"+
"      content = Object.toHTML(content);\n"+
"\n"+
"      tagName = ((position == 'before' || position == 'after')\n"+
"        ? element.parentNode : element).tagName.toUpperCase();\n"+
"\n"+
"      childNodes = Element._getContentFromAnonymousElement(tagName, content.stripScripts());\n"+
"\n"+
"      if (position == 'top' || position == 'after') childNodes.reverse();\n"+
"      childNodes.each(insert.curry(element));\n"+
"\n"+
"      content.evalScripts.bind(content).defer();\n"+
"    }\n"+
"\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  wrap: function(element, wrapper, attributes) {\n"+
"    element = $(element);\n"+
"    if (Object.isElement(wrapper))\n"+
"      $(wrapper).writeAttribute(attributes || { });\n"+
"    else if (Object.isString(wrapper)) wrapper = new Element(wrapper, attributes);\n"+
"    else wrapper = new Element('div', wrapper);\n"+
"    if (element.parentNode)\n"+
"      element.parentNode.replaceChild(wrapper, element);\n"+
"    wrapper.appendChild(element);\n"+
"    return wrapper;\n"+
"  },\n"+
"\n"+
"  inspect: function(element) {\n"+
"    element = $(element);\n"+
"    var result = '<' + element.tagName.toLowerCase();\n"+
"    $H({'id': 'id', 'className': 'class'}).each(function(pair) {\n"+
"      var property = pair.first(), attribute = pair.last();\n"+
"      var value = (element[property] || '').toString();\n"+
"      if (value) result += ' ' + attribute + '=' + value.inspect(true);\n"+
"    });\n"+
"    return result + '>';\n"+
"  },\n"+
"\n"+
"  recursivelyCollect: function(element, property) {\n"+
"    element = $(element);\n"+
"    var elements = [];\n"+
"    while (element = element[property])\n"+
"      if (element.nodeType == 1)\n"+
"        elements.push(Element.extend(element));\n"+
"    return elements;\n"+
"  },\n"+
"\n"+
"  ancestors: function(element) {\n"+
"    return $(element).recursivelyCollect('parentNode');\n"+
"  },\n"+
"\n"+
"  descendants: function(element) {\n"+
"    return $(element).select(\"*\");\n"+
"  },\n"+
"\n"+
"  firstDescendant: function(element) {\n"+
"    element = $(element).firstChild;\n"+
"    while (element && element.nodeType != 1) element = element.nextSibling;\n"+
"    return $(element);\n"+
"  },\n"+
"\n"+
"  immediateDescendants: function(element) {\n"+
"    if (!(element = $(element).firstChild)) return [];\n"+
"    while (element && element.nodeType != 1) element = element.nextSibling;\n"+
"    if (element) return [element].concat($(element).nextSiblings());\n"+
"    return [];\n"+
"  },\n"+
"\n"+
"  previousSiblings: function(element) {\n"+
"    return $(element).recursivelyCollect('previousSibling');\n"+
"  },\n"+
"\n"+
"  nextSiblings: function(element) {\n"+
"    return $(element).recursivelyCollect('nextSibling');\n"+
"  },\n"+
"\n"+
"  siblings: function(element) {\n"+
"    element = $(element);\n"+
"    return element.previousSiblings().reverse().concat(element.nextSiblings());\n"+
"  },\n"+
"\n"+
"  match: function(element, selector) {\n"+
"    if (Object.isString(selector))\n"+
"      selector = new Selector(selector);\n"+
"    return selector.match($(element));\n"+
"  },\n"+
"\n"+
"  up: function(element, expression, index) {\n"+
"    element = $(element);\n"+
"    if (arguments.length == 1) return $(element.parentNode);\n"+
"    var ancestors = element.ancestors();\n"+
"    return Object.isNumber(expression) ? ancestors[expression] :\n"+
"      Selector.findElement(ancestors, expression, index);\n"+
"  },\n"+
"\n"+
"  down: function(element, expression, index) {\n"+
"    element = $(element);\n"+
"    if (arguments.length == 1) return element.firstDescendant();\n"+
"    return Object.isNumber(expression) ? element.descendants()[expression] :\n"+
"      Element.select(element, expression)[index || 0];\n"+
"  },\n"+
"\n"+
"  previous: function(element, expression, index) {\n"+
"    element = $(element);\n"+
"    if (arguments.length == 1) return $(Selector.handlers.previousElementSibling(element));\n"+
"    var previousSiblings = element.previousSiblings();\n"+
"    return Object.isNumber(expression) ? previousSiblings[expression] :\n"+
"      Selector.findElement(previousSiblings, expression, index);\n"+
"  },\n"+
"\n"+
"  next: function(element, expression, index) {\n"+
"    element = $(element);\n"+
"    if (arguments.length == 1) return $(Selector.handlers.nextElementSibling(element));\n"+
"    var nextSiblings = element.nextSiblings();\n"+
"    return Object.isNumber(expression) ? nextSiblings[expression] :\n"+
"      Selector.findElement(nextSiblings, expression, index);\n"+
"  },\n"+
"\n"+
"  select: function() {\n"+
"    var args = $A(arguments), element = $(args.shift());\n"+
"    return Selector.findChildElements(element, args);\n"+
"  },\n"+
"\n"+
"  adjacent: function() {\n"+
"    var args = $A(arguments), element = $(args.shift());\n"+
"    return Selector.findChildElements(element.parentNode, args).without(element);\n"+
"  },\n"+
"\n"+
"  identify: function(element) {\n"+
"    element = $(element);\n"+
"    var id = element.readAttribute('id'), self = arguments.callee;\n"+
"    if (id) return id;\n"+
"    do { id = 'anonymous_element_' + self.counter++ } while ($(id));\n"+
"    element.writeAttribute('id', id);\n"+
"    return id;\n"+
"  },\n"+
"\n"+
"  readAttribute: function(element, name) {\n"+
"    element = $(element);\n"+
"    if (Prototype.Browser.IE) {\n"+
"      var t = Element._attributeTranslations.read;\n"+
"      if (t.values[name]) return t.values[name](element, name);\n"+
"      if (t.names[name]) name = t.names[name];\n"+
"      if (name.include(':')) {\n"+
"        return (!element.attributes || !element.attributes[name]) ? null :\n"+
"         element.attributes[name].value;\n"+
"      }\n"+
"    }\n"+
"    return element.getAttribute(name);\n"+
"  },\n"+
"\n"+
"  writeAttribute: function(element, name, value) {\n"+
"    element = $(element);\n"+
"    var attributes = { }, t = Element._attributeTranslations.write;\n"+
"\n"+
"    if (typeof name == 'object') attributes = name;\n"+
"    else attributes[name] = Object.isUndefined(value) ? true : value;\n"+
"\n"+
"    for (var attr in attributes) {\n"+
"      name = t.names[attr] || attr;\n"+
"      value = attributes[attr];\n"+
"      if (t.values[attr]) name = t.values[attr](element, value);\n"+
"      if (value === false || value === null)\n"+
"        element.removeAttribute(name);\n"+
"      else if (value === true)\n"+
"        element.setAttribute(name, name);\n"+
"      else element.setAttribute(name, value);\n"+
"    }\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  getHeight: function(element) {\n"+
"    return $(element).getDimensions().height;\n"+
"  },\n"+
"\n"+
"  getWidth: function(element) {\n"+
"    return $(element).getDimensions().width;\n"+
"  },\n"+
"\n"+
"  classNames: function(element) {\n"+
"    return new Element.ClassNames(element);\n"+
"  },\n"+
"\n"+
"  hasClassName: function(element, className) {\n"+
"    if (!(element = $(element))) return;\n"+
"    var elementClassName = element.className;\n"+
"    return (elementClassName.length > 0 && (elementClassName == className ||\n"+
"      new RegExp(\"(^|\\\\s)\" + className + \"(\\\\s|$)\").test(elementClassName)));\n"+
"  },\n"+
"\n"+
"  addClassName: function(element, className) {\n"+
"    if (!(element = $(element))) return;\n"+
"    if (!element.hasClassName(className))\n"+
"      element.className += (element.className ? ' ' : '') + className;\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  removeClassName: function(element, className) {\n"+
"    if (!(element = $(element))) return;\n"+
"    element.className = element.className.replace(\n"+
"      new RegExp(\"(^|\\\\s+)\" + className + \"(\\\\s+|$)\"), ' ').strip();\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  toggleClassName: function(element, className) {\n"+
"    if (!(element = $(element))) return;\n"+
"    return element[element.hasClassName(className) ?\n"+
"      'removeClassName' : 'addClassName'](className);\n"+
"  },\n"+
"\n"+
"  // removes whitespace-only text node children\n"+
"  cleanWhitespace: function(element) {\n"+
"    element = $(element);\n"+
"    var node = element.firstChild;\n"+
"    while (node) {\n"+
"      var nextNode = node.nextSibling;\n"+
"      if (node.nodeType == 3 && !/\\S/.test(node.nodeValue))\n"+
"        element.removeChild(node);\n"+
"      node = nextNode;\n"+
"    }\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  empty: function(element) {\n"+
"    return $(element).innerHTML.blank();\n"+
"  },\n"+
"\n"+
"  descendantOf: function(element, ancestor) {\n"+
"    element = $(element), ancestor = $(ancestor);\n"+
"\n"+
"    if (element.compareDocumentPosition)\n"+
"      return (element.compareDocumentPosition(ancestor) & 8) === 8;\n"+
"\n"+
"    if (ancestor.contains)\n"+
"      return ancestor.contains(element) && ancestor !== element;\n"+
"\n"+
"    while (element = element.parentNode)\n"+
"      if (element == ancestor) return true;\n"+
"\n"+
"    return false;\n"+
"  },\n"+
"\n"+
"  scrollTo: function(element) {\n"+
"    element = $(element);\n"+
"    var pos = element.cumulativeOffset();\n"+
"    window.scrollTo(pos[0], pos[1]);\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  getStyle: function(element, style) {\n"+
"    element = $(element);\n"+
"    style = style == 'float' ? 'cssFloat' : style.camelize();\n"+
"    var value = element.style[style];\n"+
"    if (!value || value == 'auto') {\n"+
"      var css = document.defaultView.getComputedStyle(element, null);\n"+
"      value = css ? css[style] : null;\n"+
"    }\n"+
"    if (style == 'opacity') return value ? parseFloat(value) : 1.0;\n"+
"    return value == 'auto' ? null : value;\n"+
"  },\n"+
"\n"+
"  getOpacity: function(element) {\n"+
"    return $(element).getStyle('opacity');\n"+
"  },\n"+
"\n"+
"  setStyle: function(element, styles) {\n"+
"    element = $(element);\n"+
"    var elementStyle = element.style, match;\n"+
"    if (Object.isString(styles)) {\n"+
"      element.style.cssText += ';' + styles;\n"+
"      return styles.include('opacity') ?\n"+
"        element.setOpacity(styles.match(/opacity:\\s*(\\d?\\.?\\d*)/)[1]) : element;\n"+
"    }\n"+
"    for (var property in styles)\n"+
"      if (property == 'opacity') element.setOpacity(styles[property]);\n"+
"      else\n"+
"        elementStyle[(property == 'float' || property == 'cssFloat') ?\n"+
"          (Object.isUndefined(elementStyle.styleFloat) ? 'cssFloat' : 'styleFloat') :\n"+
"            property] = styles[property];\n"+
"\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  setOpacity: function(element, value) {\n"+
"    element = $(element);\n"+
"    element.style.opacity = (value == 1 || value === '') ? '' :\n"+
"      (value < 0.00001) ? 0 : value;\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  getDimensions: function(element) {\n"+
"    element = $(element);\n"+
"    var display = element.getStyle('display');\n"+
"    if (display != 'none' && display != null) // Safari bug\n"+
"      return {width: element.offsetWidth, height: element.offsetHeight};\n"+
"\n"+
"    // All *Width and *Height properties give 0 on elements with display none,\n"+
"    // so enable the element temporarily\n"+
"    var els = element.style;\n"+
"    var originalVisibility = els.visibility;\n"+
"    var originalPosition = els.position;\n"+
"    var originalDisplay = els.display;\n"+
"    els.visibility = 'hidden';\n"+
"    els.position = 'absolute';\n"+
"    els.display = 'block';\n"+
"    var originalWidth = element.clientWidth;\n"+
"    var originalHeight = element.clientHeight;\n"+
"    els.display = originalDisplay;\n"+
"    els.position = originalPosition;\n"+
"    els.visibility = originalVisibility;\n"+
"    return {width: originalWidth, height: originalHeight};\n"+
"  },\n"+
"\n"+
"  makePositioned: function(element) {\n"+
"    element = $(element);\n"+
"    var pos = Element.getStyle(element, 'position');\n"+
"    if (pos == 'static' || !pos) {\n"+
"      element._madePositioned = true;\n"+
"      element.style.position = 'relative';\n"+
"      // Opera returns the offset relative to the positioning context, when an\n"+
"      // element is position relative but top and left have not been defined\n"+
"      if (Prototype.Browser.Opera) {\n"+
"        element.style.top = 0;\n"+
"        element.style.left = 0;\n"+
"      }\n"+
"    }\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  undoPositioned: function(element) {\n"+
"    element = $(element);\n"+
"    if (element._madePositioned) {\n"+
"      element._madePositioned = undefined;\n"+
"      element.style.position =\n"+
"        element.style.top =\n"+
"        element.style.left =\n"+
"        element.style.bottom =\n"+
"        element.style.right = '';\n"+
"    }\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  makeClipping: function(element) {\n"+
"    element = $(element);\n"+
"    if (element._overflow) return element;\n"+
"    element._overflow = Element.getStyle(element, 'overflow') || 'auto';\n"+
"    if (element._overflow !== 'hidden')\n"+
"      element.style.overflow = 'hidden';\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  undoClipping: function(element) {\n"+
"    element = $(element);\n"+
"    if (!element._overflow) return element;\n"+
"    element.style.overflow = element._overflow == 'auto' ? '' : element._overflow;\n"+
"    element._overflow = null;\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  cumulativeOffset: function(element) {\n"+
"    var valueT = 0, valueL = 0;\n"+
"    do {\n"+
"      valueT += element.offsetTop  || 0;\n"+
"      valueL += element.offsetLeft || 0;\n"+
"      element = element.offsetParent;\n"+
"    } while (element);\n"+
"    return Element._returnOffset(valueL, valueT);\n"+
"  },\n"+
"\n"+
"  positionedOffset: function(element) {\n"+
"    var valueT = 0, valueL = 0;\n"+
"    do {\n"+
"      valueT += element.offsetTop  || 0;\n"+
"      valueL += element.offsetLeft || 0;\n"+
"      element = element.offsetParent;\n"+
"      if (element) {\n"+
"        if (element.tagName.toUpperCase() == 'BODY') break;\n"+
"        var p = Element.getStyle(element, 'position');\n"+
"        if (p !== 'static') break;\n"+
"      }\n"+
"    } while (element);\n"+
"    return Element._returnOffset(valueL, valueT);\n"+
"  },\n"+
"\n"+
"  absolutize: function(element) {\n"+
"    element = $(element);\n"+
"    if (element.getStyle('position') == 'absolute') return element;\n"+
"    // Position.prepare(); // To be done manually by Scripty when it needs it.\n"+
"\n"+
"    var offsets = element.positionedOffset();\n"+
"    var top     = offsets[1];\n"+
"    var left    = offsets[0];\n"+
"    var width   = element.clientWidth;\n"+
"    var height  = element.clientHeight;\n"+
"\n"+
"    element._originalLeft   = left - parseFloat(element.style.left  || 0);\n"+
"    element._originalTop    = top  - parseFloat(element.style.top || 0);\n"+
"    element._originalWidth  = element.style.width;\n"+
"    element._originalHeight = element.style.height;\n"+
"\n"+
"    element.style.position = 'absolute';\n"+
"    element.style.top    = top + 'px';\n"+
"    element.style.left   = left + 'px';\n"+
"    element.style.width  = width + 'px';\n"+
"    element.style.height = height + 'px';\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  relativize: function(element) {\n"+
"    element = $(element);\n"+
"    if (element.getStyle('position') == 'relative') return element;\n"+
"    // Position.prepare(); // To be done manually by Scripty when it needs it.\n"+
"\n"+
"    element.style.position = 'relative';\n"+
"    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);\n"+
"    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);\n"+
"\n"+
"    element.style.top    = top + 'px';\n"+
"    element.style.left   = left + 'px';\n"+
"    element.style.height = element._originalHeight;\n"+
"    element.style.width  = element._originalWidth;\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  cumulativeScrollOffset: function(element) {\n"+
"    var valueT = 0, valueL = 0;\n"+
"    do {\n"+
"      valueT += element.scrollTop  || 0;\n"+
"      valueL += element.scrollLeft || 0;\n"+
"      element = element.parentNode;\n"+
"    } while (element);\n"+
"    return Element._returnOffset(valueL, valueT);\n"+
"  },\n"+
"\n"+
"  getOffsetParent: function(element) {\n"+
"    if (element.offsetParent) return $(element.offsetParent);\n"+
"    if (element == document.body) return $(element);\n"+
"\n"+
"    while ((element = element.parentNode) && element != document.body)\n"+
"      if (Element.getStyle(element, 'position') != 'static')\n"+
"        return $(element);\n"+
"\n"+
"    return $(document.body);\n"+
"  },\n"+
"\n"+
"  viewportOffset: function(forElement) {\n"+
"    var valueT = 0, valueL = 0;\n"+
"\n"+
"    var element = forElement;\n"+
"    do {\n"+
"      valueT += element.offsetTop  || 0;\n"+
"      valueL += element.offsetLeft || 0;\n"+
"\n"+
"      // Safari fix\n"+
"      if (element.offsetParent == document.body &&\n"+
"        Element.getStyle(element, 'position') == 'absolute') break;\n"+
"\n"+
"    } while (element = element.offsetParent);\n"+
"\n"+
"    element = forElement;\n"+
"    do {\n"+
"      if (!Prototype.Browser.Opera || (element.tagName && (element.tagName.toUpperCase() == 'BODY'))) {\n"+
"        valueT -= element.scrollTop  || 0;\n"+
"        valueL -= element.scrollLeft || 0;\n"+
"      }\n"+
"    } while (element = element.parentNode);\n"+
"\n"+
"    return Element._returnOffset(valueL, valueT);\n"+
"  },\n"+
"\n"+
"  clonePosition: function(element, source) {\n"+
"    var options = Object.extend({\n"+
"      setLeft:    true,\n"+
"      setTop:     true,\n"+
"      setWidth:   true,\n"+
"      setHeight:  true,\n"+
"      offsetTop:  0,\n"+
"      offsetLeft: 0\n"+
"    }, arguments[2] || { });\n"+
"\n"+
"    // find page position of source\n"+
"    source = $(source);\n"+
"    var p = source.viewportOffset();\n"+
"\n"+
"    // find coordinate system to use\n"+
"    element = $(element);\n"+
"    var delta = [0, 0];\n"+
"    var parent = null;\n"+
"    // delta [0,0] will do fine with position: fixed elements,\n"+
"    // position:absolute needs offsetParent deltas\n"+
"    if (Element.getStyle(element, 'position') == 'absolute') {\n"+
"      parent = element.getOffsetParent();\n"+
"      delta = parent.viewportOffset();\n"+
"    }\n"+
"\n"+
"    // correct by body offsets (fixes Safari)\n"+
"    if (parent == document.body) {\n"+
"      delta[0] -= document.body.offsetLeft;\n"+
"      delta[1] -= document.body.offsetTop;\n"+
"    }\n"+
"\n"+
"    // set position\n"+
"    if (options.setLeft)   element.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';\n"+
"    if (options.setTop)    element.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';\n"+
"    if (options.setWidth)  element.style.width = source.offsetWidth + 'px';\n"+
"    if (options.setHeight) element.style.height = source.offsetHeight + 'px';\n"+
"    return element;\n"+
"  }\n"+
"};\n"+
"\n"+
"Element.Methods.identify.counter = 1;\n"+
"\n"+
"Object.extend(Element.Methods, {\n"+
"  getElementsBySelector: Element.Methods.select,\n"+
"  childElements: Element.Methods.immediateDescendants\n"+
"});\n"+
"\n"+
"Element._attributeTranslations = {\n"+
"  write: {\n"+
"    names: {\n"+
"      className: 'class',\n"+
"      htmlFor:   'for'\n"+
"    },\n"+
"    values: { }\n"+
"  }\n"+
"};\n"+
"\n"+
"if (Prototype.Browser.Opera) {\n"+
"  Element.Methods.getStyle = Element.Methods.getStyle.wrap(\n"+
"    function(proceed, element, style) {\n"+
"      switch (style) {\n"+
"        case 'left': case 'top': case 'right': case 'bottom':\n"+
"          if (proceed(element, 'position') === 'static') return null;\n"+
"        case 'height': case 'width':\n"+
"          // returns '0px' for hidden elements; we want it to return null\n"+
"          if (!Element.visible(element)) return null;\n"+
"\n"+
"          // returns the border-box dimensions rather than the content-box\n"+
"          // dimensions, so we subtract padding and borders from the value\n"+
"          var dim = parseInt(proceed(element, style), 10);\n"+
"\n"+
"          if (dim !== element['offset' + style.capitalize()])\n"+
"            return dim + 'px';\n"+
"\n"+
"          var properties;\n"+
"          if (style === 'height') {\n"+
"            properties = ['border-top-width', 'padding-top',\n"+
"             'padding-bottom', 'border-bottom-width'];\n"+
"          }\n"+
"          else {\n"+
"            properties = ['border-left-width', 'padding-left',\n"+
"             'padding-right', 'border-right-width'];\n"+
"          }\n"+
"          return properties.inject(dim, function(memo, property) {\n"+
"            var val = proceed(element, property);\n"+
"            return val === null ? memo : memo - parseInt(val, 10);\n"+
"          }) + 'px';\n"+
"        default: return proceed(element, style);\n"+
"      }\n"+
"    }\n"+
"  );\n"+
"\n"+
"  Element.Methods.readAttribute = Element.Methods.readAttribute.wrap(\n"+
"    function(proceed, element, attribute) {\n"+
"      if (attribute === 'title') return element.title;\n"+
"      return proceed(element, attribute);\n"+
"    }\n"+
"  );\n"+
"}\n"+
"\n"+
"else if (Prototype.Browser.IE) {\n"+
"  // IE doesn't report offsets correctly for static elements, so we change them\n"+
"  // to \"relative\" to get the values, then change them back.\n"+
"  Element.Methods.getOffsetParent = Element.Methods.getOffsetParent.wrap(\n"+
"    function(proceed, element) {\n"+
"      element = $(element);\n"+
"      // IE throws an error if element is not in document\n"+
"      try { element.offsetParent }\n"+
"      catch(e) { return $(document.body) }\n"+
"      var position = element.getStyle('position');\n"+
"      if (position !== 'static') return proceed(element);\n"+
"      element.setStyle({ position: 'relative' });\n"+
"      var value = proceed(element);\n"+
"      element.setStyle({ position: position });\n"+
"      return value;\n"+
"    }\n"+
"  );\n"+
"\n"+
"  $w('positionedOffset viewportOffset').each(function(method) {\n"+
"    Element.Methods[method] = Element.Methods[method].wrap(\n"+
"      function(proceed, element) {\n"+
"        element = $(element);\n"+
"        try { element.offsetParent }\n"+
"        catch(e) { return Element._returnOffset(0,0) }\n"+
"        var position = element.getStyle('position');\n"+
"        if (position !== 'static') return proceed(element);\n"+
"        // Trigger hasLayout on the offset parent so that IE6 reports\n"+
"        // accurate offsetTop and offsetLeft values for position: fixed.\n"+
"        var offsetParent = element.getOffsetParent();\n"+
"        if (offsetParent && offsetParent.getStyle('position') === 'fixed')\n"+
"          offsetParent.setStyle({ zoom: 1 });\n"+
"        element.setStyle({ position: 'relative' });\n"+
"        var value = proceed(element);\n"+
"        element.setStyle({ position: position });\n"+
"        return value;\n"+
"      }\n"+
"    );\n"+
"  });\n"+
"\n"+
"  Element.Methods.cumulativeOffset = Element.Methods.cumulativeOffset.wrap(\n"+
"    function(proceed, element) {\n"+
"      try { element.offsetParent }\n"+
"      catch(e) { return Element._returnOffset(0,0) }\n"+
"      return proceed(element);\n"+
"    }\n"+
"  );\n"+
"\n"+
"  Element.Methods.getStyle = function(element, style) {\n"+
"    element = $(element);\n"+
"    style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();\n"+
"    var value = element.style[style];\n"+
"    if (!value && element.currentStyle) value = element.currentStyle[style];\n"+
"\n"+
"    if (style == 'opacity') {\n"+
"      if (value = (element.getStyle('filter') || '').match(/alpha\\(opacity=(.*)\\)/))\n"+
"        if (value[1]) return parseFloat(value[1]) / 100;\n"+
"      return 1.0;\n"+
"    }\n"+
"\n"+
"    if (value == 'auto') {\n"+
"      if ((style == 'width' || style == 'height') && (element.getStyle('display') != 'none'))\n"+
"        return element['offset' + style.capitalize()] + 'px';\n"+
"      return null;\n"+
"    }\n"+
"    return value;\n"+
"  };\n"+
"\n"+
"  Element.Methods.setOpacity = function(element, value) {\n"+
"    function stripAlpha(filter){\n"+
"      return filter.replace(/alpha\\([^\\)]*\\)/gi,'');\n"+
"    }\n"+
"    element = $(element);\n"+
"    var currentStyle = element.currentStyle;\n"+
"    if ((currentStyle && !currentStyle.hasLayout) ||\n"+
"      (!currentStyle && element.style.zoom == 'normal'))\n"+
"        element.style.zoom = 1;\n"+
"\n"+
"    var filter = element.getStyle('filter'), style = element.style;\n"+
"    if (value == 1 || value === '') {\n"+
"      (filter = stripAlpha(filter)) ?\n"+
"        style.filter = filter : style.removeAttribute('filter');\n"+
"      return element;\n"+
"    } else if (value < 0.00001) value = 0;\n"+
"    style.filter = stripAlpha(filter) +\n"+
"      'alpha(opacity=' + (value * 100) + ')';\n"+
"    return element;\n"+
"  };\n"+
"\n"+
"  Element._attributeTranslations = {\n"+
"    read: {\n"+
"      names: {\n"+
"        'class': 'className',\n"+
"        'for':   'htmlFor'\n"+
"      },\n"+
"      values: {\n"+
"        _getAttr: function(element, attribute) {\n"+
"          return element.getAttribute(attribute, 2);\n"+
"        },\n"+
"        _getAttrNode: function(element, attribute) {\n"+
"          var node = element.getAttributeNode(attribute);\n"+
"          return node ? node.value : \"\";\n"+
"        },\n"+
"        _getEv: function(element, attribute) {\n"+
"          attribute = element.getAttribute(attribute);\n"+
"          return attribute ? attribute.toString().slice(23, -2) : null;\n"+
"        },\n"+
"        _flag: function(element, attribute) {\n"+
"          return $(element).hasAttribute(attribute) ? attribute : null;\n"+
"        },\n"+
"        style: function(element) {\n"+
"          return element.style.cssText.toLowerCase();\n"+
"        },\n"+
"        title: function(element) {\n"+
"          return element.title;\n"+
"        }\n"+
"      }\n"+
"    }\n"+
"  };\n"+
"\n"+
"  Element._attributeTranslations.write = {\n"+
"    names: Object.extend({\n"+
"      cellpadding: 'cellPadding',\n"+
"      cellspacing: 'cellSpacing'\n"+
"    }, Element._attributeTranslations.read.names),\n"+
"    values: {\n"+
"      checked: function(element, value) {\n"+
"        element.checked = !!value;\n"+
"      },\n"+
"\n"+
"      style: function(element, value) {\n"+
"        element.style.cssText = value ? value : '';\n"+
"      }\n"+
"    }\n"+
"  };\n"+
"\n"+
"  Element._attributeTranslations.has = {};\n"+
"\n"+
"  $w('colSpan rowSpan vAlign dateTime accessKey tabIndex ' +\n"+
"      'encType maxLength readOnly longDesc frameBorder').each(function(attr) {\n"+
"    Element._attributeTranslations.write.names[attr.toLowerCase()] = attr;\n"+
"    Element._attributeTranslations.has[attr.toLowerCase()] = attr;\n"+
"  });\n"+
"\n"+
"  (function(v) {\n"+
"    Object.extend(v, {\n"+
"      href:        v._getAttr,\n"+
"      src:         v._getAttr,\n"+
"      type:        v._getAttr,\n"+
"      action:      v._getAttrNode,\n"+
"      disabled:    v._flag,\n"+
"      checked:     v._flag,\n"+
"      readonly:    v._flag,\n"+
"      multiple:    v._flag,\n"+
"      onload:      v._getEv,\n"+
"      onunload:    v._getEv,\n"+
"      onclick:     v._getEv,\n"+
"      ondblclick:  v._getEv,\n"+
"      onmousedown: v._getEv,\n"+
"      onmouseup:   v._getEv,\n"+
"      onmouseover: v._getEv,\n"+
"      onmousemove: v._getEv,\n"+
"      onmouseout:  v._getEv,\n"+
"      onfocus:     v._getEv,\n"+
"      onblur:      v._getEv,\n"+
"      onkeypress:  v._getEv,\n"+
"      onkeydown:   v._getEv,\n"+
"      onkeyup:     v._getEv,\n"+
"      onsubmit:    v._getEv,\n"+
"      onreset:     v._getEv,\n"+
"      onselect:    v._getEv,\n"+
"      onchange:    v._getEv\n"+
"    });\n"+
"  })(Element._attributeTranslations.read.values);\n"+
"}\n"+
"\n"+
"else if (Prototype.Browser.Gecko && /rv:1\\.8\\.0/.test(navigator.userAgent)) {\n"+
"  Element.Methods.setOpacity = function(element, value) {\n"+
"    element = $(element);\n"+
"    element.style.opacity = (value == 1) ? 0.999999 :\n"+
"      (value === '') ? '' : (value < 0.00001) ? 0 : value;\n"+
"    return element;\n"+
"  };\n"+
"}\n"+
"\n"+
"else if (Prototype.Browser.WebKit) {\n"+
"  Element.Methods.setOpacity = function(element, value) {\n"+
"    element = $(element);\n"+
"    element.style.opacity = (value == 1 || value === '') ? '' :\n"+
"      (value < 0.00001) ? 0 : value;\n"+
"\n"+
"    if (value == 1)\n"+
"      if(element.tagName.toUpperCase() == 'IMG' && element.width) {\n"+
"        element.width++; element.width--;\n"+
"      } else try {\n"+
"        var n = document.createTextNode(' ');\n"+
"        element.appendChild(n);\n"+
"        element.removeChild(n);\n"+
"      } catch (e) { }\n"+
"\n"+
"    return element;\n"+
"  };\n"+
"\n"+
"  // Safari returns margins on body which is incorrect if the child is absolutely\n"+
"  // positioned.  For performance reasons, redefine Element#cumulativeOffset for\n"+
"  // KHTML/WebKit only.\n"+
"  Element.Methods.cumulativeOffset = function(element) {\n"+
"    var valueT = 0, valueL = 0;\n"+
"    do {\n"+
"      valueT += element.offsetTop  || 0;\n"+
"      valueL += element.offsetLeft || 0;\n"+
"      if (element.offsetParent == document.body)\n"+
"        if (Element.getStyle(element, 'position') == 'absolute') break;\n"+
"\n"+
"      element = element.offsetParent;\n"+
"    } while (element);\n"+
"\n"+
"    return Element._returnOffset(valueL, valueT);\n"+
"  };\n"+
"}\n"+
"\n"+
"if (Prototype.Browser.IE || Prototype.Browser.Opera) {\n"+
"  // IE and Opera are missing .innerHTML support for TABLE-related and SELECT elements\n"+
"  Element.Methods.update = function(element, content) {\n"+
"    element = $(element);\n"+
"\n"+
"    if (content && content.toElement) content = content.toElement();\n"+
"    if (Object.isElement(content)) return element.update().insert(content);\n"+
"\n"+
"    content = Object.toHTML(content);\n"+
"    var tagName = element.tagName.toUpperCase();\n"+
"\n"+
"    if (tagName in Element._insertionTranslations.tags) {\n"+
"      $A(element.childNodes).each(function(node) { element.removeChild(node) });\n"+
"      Element._getContentFromAnonymousElement(tagName, content.stripScripts())\n"+
"        .each(function(node) { element.appendChild(node) });\n"+
"    }\n"+
"    else element.innerHTML = content.stripScripts();\n"+
"\n"+
"    content.evalScripts.bind(content).defer();\n"+
"    return element;\n"+
"  };\n"+
"}\n"+
"\n"+
"if ('outerHTML' in document.createElement('div')) {\n"+
"  Element.Methods.replace = function(element, content) {\n"+
"    element = $(element);\n"+
"\n"+
"    if (content && content.toElement) content = content.toElement();\n"+
"    if (Object.isElement(content)) {\n"+
"      element.parentNode.replaceChild(content, element);\n"+
"      return element;\n"+
"    }\n"+
"\n"+
"    content = Object.toHTML(content);\n"+
"    var parent = element.parentNode, tagName = parent.tagName.toUpperCase();\n"+
"\n"+
"    if (Element._insertionTranslations.tags[tagName]) {\n"+
"      var nextSibling = element.next();\n"+
"      var fragments = Element._getContentFromAnonymousElement(tagName, content.stripScripts());\n"+
"      parent.removeChild(element);\n"+
"      if (nextSibling)\n"+
"        fragments.each(function(node) { parent.insertBefore(node, nextSibling) });\n"+
"      else\n"+
"        fragments.each(function(node) { parent.appendChild(node) });\n"+
"    }\n"+
"    else element.outerHTML = content.stripScripts();\n"+
"\n"+
"    content.evalScripts.bind(content).defer();\n"+
"    return element;\n"+
"  };\n"+
"}\n"+
"\n"+
"Element._returnOffset = function(l, t) {\n"+
"  var result = [l, t];\n"+
"  result.left = l;\n"+
"  result.top = t;\n"+
"  return result;\n"+
"};\n"+
"\n"+
"Element._getContentFromAnonymousElement = function(tagName, html) {\n"+
"  var div = new Element('div'), t = Element._insertionTranslations.tags[tagName];\n"+
"  if (t) {\n"+
"    div.innerHTML = t[0] + html + t[1];\n"+
"    t[2].times(function() { div = div.firstChild });\n"+
"  } else div.innerHTML = html;\n"+
"  return $A(div.childNodes);\n"+
"};\n"+
"\n"+
"Element._insertionTranslations = {\n"+
"  before: function(element, node) {\n"+
"    element.parentNode.insertBefore(node, element);\n"+
"  },\n"+
"  top: function(element, node) {\n"+
"    element.insertBefore(node, element.firstChild);\n"+
"  },\n"+
"  bottom: function(element, node) {\n"+
"    element.appendChild(node);\n"+
"  },\n"+
"  after: function(element, node) {\n"+
"    element.parentNode.insertBefore(node, element.nextSibling);\n"+
"  },\n"+
"  tags: {\n"+
"    TABLE:  ['<table>',                '</table>',                   1],\n"+
"    TBODY:  ['<table><tbody>',         '</tbody></table>',           2],\n"+
"    TR:     ['<table><tbody><tr>',     '</tr></tbody></table>',      3],\n"+
"    TD:     ['<table><tbody><tr><td>', '</td></tr></tbody></table>', 4],\n"+
"    SELECT: ['<select>',               '</select>',                  1]\n"+
"  }\n"+
"};\n"+
"\n"+
"(function() {\n"+
"  Object.extend(this.tags, {\n"+
"    THEAD: this.tags.TBODY,\n"+
"    TFOOT: this.tags.TBODY,\n"+
"    TH:    this.tags.TD\n"+
"  });\n"+
"}).call(Element._insertionTranslations);\n"+
"\n"+
"Element.Methods.Simulated = {\n"+
"  hasAttribute: function(element, attribute) {\n"+
"    attribute = Element._attributeTranslations.has[attribute] || attribute;\n"+
"    var node = $(element).getAttributeNode(attribute);\n"+
"    return !!(node && node.specified);\n"+
"  }\n"+
"};\n"+
"\n"+
"Element.Methods.ByTag = { };\n"+
"\n"+
"Object.extend(Element, Element.Methods);\n"+
"\n"+
"if (!Prototype.BrowserFeatures.ElementExtensions &&\n"+
"    document.createElement('div')['__proto__']) {\n"+
"  window.HTMLElement = { };\n"+
"  window.HTMLElement.prototype = document.createElement('div')['__proto__'];\n"+
"  Prototype.BrowserFeatures.ElementExtensions = true;\n"+
"}\n"+
"\n"+
"Element.extend = (function() {\n"+
"  if (Prototype.BrowserFeatures.SpecificElementExtensions)\n"+
"    return Prototype.K;\n"+
"\n"+
"  var Methods = { }, ByTag = Element.Methods.ByTag;\n"+
"\n"+
"  var extend = Object.extend(function(element) {\n"+
"    if (!element || element._extendedByPrototype ||\n"+
"        element.nodeType != 1 || element == window) return element;\n"+
"\n"+
"    var methods = Object.clone(Methods),\n"+
"      tagName = element.tagName.toUpperCase(), property, value;\n"+
"\n"+
"    // extend methods for specific tags\n"+
"    if (ByTag[tagName]) Object.extend(methods, ByTag[tagName]);\n"+
"\n"+
"    for (property in methods) {\n"+
"      value = methods[property];\n"+
"      if (Object.isFunction(value) && !(property in element))\n"+
"        element[property] = value.methodize();\n"+
"    }\n"+
"\n"+
"    element._extendedByPrototype = Prototype.emptyFunction;\n"+
"    return element;\n"+
"\n"+
"  }, {\n"+
"    refresh: function() {\n"+
"      // extend methods for all tags (Safari doesn't need this)\n"+
"      if (!Prototype.BrowserFeatures.ElementExtensions) {\n"+
"        Object.extend(Methods, Element.Methods);\n"+
"        Object.extend(Methods, Element.Methods.Simulated);\n"+
"      }\n"+
"    }\n"+
"  });\n"+
"\n"+
"  extend.refresh();\n"+
"  return extend;\n"+
"})();\n"+
"\n"+
"Element.hasAttribute = function(element, attribute) {\n"+
"  if (element.hasAttribute) return element.hasAttribute(attribute);\n"+
"  return Element.Methods.Simulated.hasAttribute(element, attribute);\n"+
"};\n"+
"\n"+
"Element.addMethods = function(methods) {\n"+
"  var F = Prototype.BrowserFeatures, T = Element.Methods.ByTag;\n"+
"\n"+
"  if (!methods) {\n"+
"    Object.extend(Form, Form.Methods);\n"+
"    Object.extend(Form.Element, Form.Element.Methods);\n"+
"    Object.extend(Element.Methods.ByTag, {\n"+
"      \"FORM\":     Object.clone(Form.Methods),\n"+
"      \"INPUT\":    Object.clone(Form.Element.Methods),\n"+
"      \"SELECT\":   Object.clone(Form.Element.Methods),\n"+
"      \"TEXTAREA\": Object.clone(Form.Element.Methods)\n"+
"    });\n"+
"  }\n"+
"\n"+
"  if (arguments.length == 2) {\n"+
"    var tagName = methods;\n"+
"    methods = arguments[1];\n"+
"  }\n"+
"\n"+
"  if (!tagName) Object.extend(Element.Methods, methods || { });\n"+
"  else {\n"+
"    if (Object.isArray(tagName)) tagName.each(extend);\n"+
"    else extend(tagName);\n"+
"  }\n"+
"\n"+
"  function extend(tagName) {\n"+
"    tagName = tagName.toUpperCase();\n"+
"    if (!Element.Methods.ByTag[tagName])\n"+
"      Element.Methods.ByTag[tagName] = { };\n"+
"    Object.extend(Element.Methods.ByTag[tagName], methods);\n"+
"  }\n"+
"\n"+
"  function copy(methods, destination, onlyIfAbsent) {\n"+
"    onlyIfAbsent = onlyIfAbsent || false;\n"+
"    for (var property in methods) {\n"+
"      var value = methods[property];\n"+
"      if (!Object.isFunction(value)) continue;\n"+
"      if (!onlyIfAbsent || !(property in destination))\n"+
"        destination[property] = value.methodize();\n"+
"    }\n"+
"  }\n"+
"\n"+
"  function findDOMClass(tagName) {\n"+
"    var klass;\n"+
"    var trans = {\n"+
"      \"OPTGROUP\": \"OptGroup\", \"TEXTAREA\": \"TextArea\", \"P\": \"Paragraph\",\n"+
"      \"FIELDSET\": \"FieldSet\", \"UL\": \"UList\", \"OL\": \"OList\", \"DL\": \"DList\",\n"+
"      \"DIR\": \"Directory\", \"H1\": \"Heading\", \"H2\": \"Heading\", \"H3\": \"Heading\",\n"+
"      \"H4\": \"Heading\", \"H5\": \"Heading\", \"H6\": \"Heading\", \"Q\": \"Quote\",\n"+
"      \"INS\": \"Mod\", \"DEL\": \"Mod\", \"A\": \"Anchor\", \"IMG\": \"Image\", \"CAPTION\":\n"+
"      \"TableCaption\", \"COL\": \"TableCol\", \"COLGROUP\": \"TableCol\", \"THEAD\":\n"+
"      \"TableSection\", \"TFOOT\": \"TableSection\", \"TBODY\": \"TableSection\", \"TR\":\n"+
"      \"TableRow\", \"TH\": \"TableCell\", \"TD\": \"TableCell\", \"FRAMESET\":\n"+
"      \"FrameSet\", \"IFRAME\": \"IFrame\"\n"+
"    };\n"+
"    if (trans[tagName]) klass = 'HTML' + trans[tagName] + 'Element';\n"+
"    if (window[klass]) return window[klass];\n"+
"    klass = 'HTML' + tagName + 'Element';\n"+
"    if (window[klass]) return window[klass];\n"+
"    klass = 'HTML' + tagName.capitalize() + 'Element';\n"+
"    if (window[klass]) return window[klass];\n"+
"\n"+
"    window[klass] = { };\n"+
"    window[klass].prototype = document.createElement(tagName)['__proto__'];\n"+
"    return window[klass];\n"+
"  }\n"+
"\n"+
"  if (F.ElementExtensions) {\n"+
"    copy(Element.Methods, HTMLElement.prototype);\n"+
"    copy(Element.Methods.Simulated, HTMLElement.prototype, true);\n"+
"  }\n"+
"\n"+
"  if (F.SpecificElementExtensions) {\n"+
"    for (var tag in Element.Methods.ByTag) {\n"+
"      var klass = findDOMClass(tag);\n"+
"      if (Object.isUndefined(klass)) continue;\n"+
"      copy(T[tag], klass.prototype);\n"+
"    }\n"+
"  }\n"+
"\n"+
"  Object.extend(Element, Element.Methods);\n"+
"  delete Element.ByTag;\n"+
"\n"+
"  if (Element.extend.refresh) Element.extend.refresh();\n"+
"  Element.cache = { };\n"+
"};\n"+
"\n"+
"document.viewport = {\n"+
"  getDimensions: function() {\n"+
"    var dimensions = { }, B = Prototype.Browser;\n"+
"    $w('width height').each(function(d) {\n"+
"      var D = d.capitalize();\n"+
"      if (B.WebKit && !document.evaluate) {\n"+
"        // Safari <3.0 needs self.innerWidth/Height\n"+
"        dimensions[d] = self['inner' + D];\n"+
"      } else if (B.Opera && parseFloat(window.opera.version()) < 9.5) {\n"+
"        // Opera <9.5 needs document.body.clientWidth/Height\n"+
"        dimensions[d] = document.body['client' + D]\n"+
"      } else {\n"+
"        dimensions[d] = document.documentElement['client' + D];\n"+
"      }\n"+
"    });\n"+
"    return dimensions;\n"+
"  },\n"+
"\n"+
"  getWidth: function() {\n"+
"    return this.getDimensions().width;\n"+
"  },\n"+
"\n"+
"  getHeight: function() {\n"+
"    return this.getDimensions().height;\n"+
"  },\n"+
"\n"+
"  getScrollOffsets: function() {\n"+
"    return Element._returnOffset(\n"+
"      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,\n"+
"      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);\n"+
"  }\n"+
"};\n"+
"/* Portions of the Selector class are derived from Jack Slocum's DomQuery,\n"+
" * part of YUI-Ext version 0.40, distributed under the terms of an MIT-style\n"+
" * license.  Please see http://www.yui-ext.com/ for more information. */\n"+
"\n"+
"var Selector = Class.create({\n"+
"  initialize: function(expression) {\n"+
"    this.expression = expression.strip();\n"+
"\n"+
"    if (this.shouldUseSelectorsAPI()) {\n"+
"      this.mode = 'selectorsAPI';\n"+
"    } else if (this.shouldUseXPath()) {\n"+
"      this.mode = 'xpath';\n"+
"      this.compileXPathMatcher();\n"+
"    } else {\n"+
"      this.mode = \"normal\";\n"+
"      this.compileMatcher();\n"+
"    }\n"+
"\n"+
"  },\n"+
"\n"+
"  shouldUseXPath: function() {\n"+
"    if (!Prototype.BrowserFeatures.XPath) return false;\n"+
"\n"+
"    var e = this.expression;\n"+
"\n"+
"    // Safari 3 chokes on :*-of-type and :empty\n"+
"    if (Prototype.Browser.WebKit &&\n"+
"     (e.include(\"-of-type\") || e.include(\":empty\")))\n"+
"      return false;\n"+
"\n"+
"    // XPath can't do namespaced attributes, nor can it read\n"+
"    // the \"checked\" property from DOM nodes\n"+
"    if ((/(\\[[\\w-]*?:|:checked)/).test(e))\n"+
"      return false;\n"+
"\n"+
"    return true;\n"+
"  },\n"+
"\n"+
"  shouldUseSelectorsAPI: function() {\n"+
"    if (!Prototype.BrowserFeatures.SelectorsAPI) return false;\n"+
"\n"+
"    if (!Selector._div) Selector._div = new Element('div');\n"+
"\n"+
"    // Make sure the browser treats the selector as valid. Test on an\n"+
"    // isolated element to minimize cost of this check.\n"+
"    try {\n"+
"      Selector._div.querySelector(this.expression);\n"+
"    } catch(e) {\n"+
"      return false;\n"+
"    }\n"+
"\n"+
"    return true;\n"+
"  },\n"+
"\n"+
"  compileMatcher: function() {\n"+
"    var e = this.expression, ps = Selector.patterns, h = Selector.handlers,\n"+
"        c = Selector.criteria, le, p, m;\n"+
"\n"+
"    if (Selector._cache[e]) {\n"+
"      this.matcher = Selector._cache[e];\n"+
"      return;\n"+
"    }\n"+
"\n"+
"    this.matcher = [\"this.matcher = function(root) {\",\n"+
"                    \"var r = root, h = Selector.handlers, c = false, n;\"];\n"+
"\n"+
"    while (e && le != e && (/\\S/).test(e)) {\n"+
"      le = e;\n"+
"      for (var i in ps) {\n"+
"        p = ps[i];\n"+
"        if (m = e.match(p)) {\n"+
"          this.matcher.push(Object.isFunction(c[i]) ? c[i](m) :\n"+
"            new Template(c[i]).evaluate(m));\n"+
"          e = e.replace(m[0], '');\n"+
"          break;\n"+
"        }\n"+
"      }\n"+
"    }\n"+
"\n"+
"    this.matcher.push(\"return h.unique(n);\\n}\");\n"+
"    eval(this.matcher.join('\\n'));\n"+
"    Selector._cache[this.expression] = this.matcher;\n"+
"  },\n"+
"\n"+
"  compileXPathMatcher: function() {\n"+
"    var e = this.expression, ps = Selector.patterns,\n"+
"        x = Selector.xpath, le, m;\n"+
"\n"+
"    if (Selector._cache[e]) {\n"+
"      this.xpath = Selector._cache[e]; return;\n"+
"    }\n"+
"\n"+
"    this.matcher = ['.//*'];\n"+
"    while (e && le != e && (/\\S/).test(e)) {\n"+
"      le = e;\n"+
"      for (var i in ps) {\n"+
"        if (m = e.match(ps[i])) {\n"+
"          this.matcher.push(Object.isFunction(x[i]) ? x[i](m) :\n"+
"            new Template(x[i]).evaluate(m));\n"+
"          e = e.replace(m[0], '');\n"+
"          break;\n"+
"        }\n"+
"      }\n"+
"    }\n"+
"\n"+
"    this.xpath = this.matcher.join('');\n"+
"    Selector._cache[this.expression] = this.xpath;\n"+
"  },\n"+
"\n"+
"  findElements: function(root) {\n"+
"    root = root || document;\n"+
"    var e = this.expression, results;\n"+
"\n"+
"    switch (this.mode) {\n"+
"      case 'selectorsAPI':\n"+
"        // querySelectorAll queries document-wide, then filters to descendants\n"+
"        // of the context element. That's not what we want.\n"+
"        // Add an explicit context to the selector if necessary.\n"+
"        if (root !== document) {\n"+
"          var oldId = root.id, id = $(root).identify();\n"+
"          e = \"#\" + id + \" \" + e;\n"+
"        }\n"+
"\n"+
"        results = $A(root.querySelectorAll(e)).map(Element.extend);\n"+
"        root.id = oldId;\n"+
"\n"+
"        return results;\n"+
"      case 'xpath':\n"+
"        return document._getElementsByXPath(this.xpath, root);\n"+
"      default:\n"+
"       return this.matcher(root);\n"+
"    }\n"+
"  },\n"+
"\n"+
"  match: function(element) {\n"+
"    this.tokens = [];\n"+
"\n"+
"    var e = this.expression, ps = Selector.patterns, as = Selector.assertions;\n"+
"    var le, p, m;\n"+
"\n"+
"    while (e && le !== e && (/\\S/).test(e)) {\n"+
"      le = e;\n"+
"      for (var i in ps) {\n"+
"        p = ps[i];\n"+
"        if (m = e.match(p)) {\n"+
"          // use the Selector.assertions methods unless the selector\n"+
"          // is too complex.\n"+
"          if (as[i]) {\n"+
"            this.tokens.push([i, Object.clone(m)]);\n"+
"            e = e.replace(m[0], '');\n"+
"          } else {\n"+
"            // reluctantly do a document-wide search\n"+
"            // and look for a match in the array\n"+
"            return this.findElements(document).include(element);\n"+
"          }\n"+
"        }\n"+
"      }\n"+
"    }\n"+
"\n"+
"    var match = true, name, matches;\n"+
"    for (var i = 0, token; token = this.tokens[i]; i++) {\n"+
"      name = token[0], matches = token[1];\n"+
"      if (!Selector.assertions[name](element, matches)) {\n"+
"        match = false; break;\n"+
"      }\n"+
"    }\n"+
"\n"+
"    return match;\n"+
"  },\n"+
"\n"+
"  toString: function() {\n"+
"    return this.expression;\n"+
"  },\n"+
"\n"+
"  inspect: function() {\n"+
"    return \"#<Selector:\" + this.expression.inspect() + \">\";\n"+
"  }\n"+
"});\n"+
"\n"+
"Object.extend(Selector, {\n"+
"  _cache: { },\n"+
"\n"+
"  xpath: {\n"+
"    descendant:   \"//*\",\n"+
"    child:        \"/*\",\n"+
"    adjacent:     \"/following-sibling::*[1]\",\n"+
"    laterSibling: '/following-sibling::*',\n"+
"    tagName:      function(m) {\n"+
"      if (m[1] == '*') return '';\n"+
"      return \"[local-name()='\" + m[1].toLowerCase() +\n"+
"             \"' or local-name()='\" + m[1].toUpperCase() + \"']\";\n"+
"    },\n"+
"    className:    \"[contains(concat(' ', @class, ' '), ' #{1} ')]\",\n"+
"    id:           \"[@id='#{1}']\",\n"+
"    attrPresence: function(m) {\n"+
"      m[1] = m[1].toLowerCase();\n"+
"      return new Template(\"[@#{1}]\").evaluate(m);\n"+
"    },\n"+
"    attr: function(m) {\n"+
"      m[1] = m[1].toLowerCase();\n"+
"      m[3] = m[5] || m[6];\n"+
"      return new Template(Selector.xpath.operators[m[2]]).evaluate(m);\n"+
"    },\n"+
"    pseudo: function(m) {\n"+
"      var h = Selector.xpath.pseudos[m[1]];\n"+
"      if (!h) return '';\n"+
"      if (Object.isFunction(h)) return h(m);\n"+
"      return new Template(Selector.xpath.pseudos[m[1]]).evaluate(m);\n"+
"    },\n"+
"    operators: {\n"+
"      '=':  \"[@#{1}='#{3}']\",\n"+
"      '!=': \"[@#{1}!='#{3}']\",\n"+
"      '^=': \"[starts-with(@#{1}, '#{3}')]\",\n"+
"      '$=': \"[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']\",\n"+
"      '*=': \"[contains(@#{1}, '#{3}')]\",\n"+
"      '~=': \"[contains(concat(' ', @#{1}, ' '), ' #{3} ')]\",\n"+
"      '|=': \"[contains(concat('-', @#{1}, '-'), '-#{3}-')]\"\n"+
"    },\n"+
"    pseudos: {\n"+
"      'first-child': '[not(preceding-sibling::*)]',\n"+
"      'last-child':  '[not(following-sibling::*)]',\n"+
"      'only-child':  '[not(preceding-sibling::* or following-sibling::*)]',\n"+
"      'empty':       \"[count(*) = 0 and (count(text()) = 0)]\",\n"+
"      'checked':     \"[@checked]\",\n"+
"      'disabled':    \"[(@disabled) and (@type!='hidden')]\",\n"+
"      'enabled':     \"[not(@disabled) and (@type!='hidden')]\",\n"+
"      'not': function(m) {\n"+
"        var e = m[6], p = Selector.patterns,\n"+
"            x = Selector.xpath, le, v;\n"+
"\n"+
"        var exclusion = [];\n"+
"        while (e && le != e && (/\\S/).test(e)) {\n"+
"          le = e;\n"+
"          for (var i in p) {\n"+
"            if (m = e.match(p[i])) {\n"+
"              v = Object.isFunction(x[i]) ? x[i](m) : new Template(x[i]).evaluate(m);\n"+
"              exclusion.push(\"(\" + v.substring(1, v.length - 1) + \")\");\n"+
"              e = e.replace(m[0], '');\n"+
"              break;\n"+
"            }\n"+
"          }\n"+
"        }\n"+
"        return \"[not(\" + exclusion.join(\" and \") + \")]\";\n"+
"      },\n"+
"      'nth-child':      function(m) {\n"+
"        return Selector.xpath.pseudos.nth(\"(count(./preceding-sibling::*) + 1) \", m);\n"+
"      },\n"+
"      'nth-last-child': function(m) {\n"+
"        return Selector.xpath.pseudos.nth(\"(count(./following-sibling::*) + 1) \", m);\n"+
"      },\n"+
"      'nth-of-type':    function(m) {\n"+
"        return Selector.xpath.pseudos.nth(\"position() \", m);\n"+
"      },\n"+
"      'nth-last-of-type': function(m) {\n"+
"        return Selector.xpath.pseudos.nth(\"(last() + 1 - position()) \", m);\n"+
"      },\n"+
"      'first-of-type':  function(m) {\n"+
"        m[6] = \"1\"; return Selector.xpath.pseudos['nth-of-type'](m);\n"+
"      },\n"+
"      'last-of-type':   function(m) {\n"+
"        m[6] = \"1\"; return Selector.xpath.pseudos['nth-last-of-type'](m);\n"+
"      },\n"+
"      'only-of-type':   function(m) {\n"+
"        var p = Selector.xpath.pseudos; return p['first-of-type'](m) + p['last-of-type'](m);\n"+
"      },\n"+
"      nth: function(fragment, m) {\n"+
"        var mm, formula = m[6], predicate;\n"+
"        if (formula == 'even') formula = '2n+0';\n"+
"        if (formula == 'odd')  formula = '2n+1';\n"+
"        if (mm = formula.match(/^(\\d+)$/)) // digit only\n"+
"          return '[' + fragment + \"= \" + mm[1] + ']';\n"+
"        if (mm = formula.match(/^(-?\\d*)?n(([+-])(\\d+))?/)) { // an+b\n"+
"          if (mm[1] == \"-\") mm[1] = -1;\n"+
"          var a = mm[1] ? Number(mm[1]) : 1;\n"+
"          var b = mm[2] ? Number(mm[2]) : 0;\n"+
"          predicate = \"[((#{fragment} - #{b}) mod #{a} = 0) and \" +\n"+
"          \"((#{fragment} - #{b}) div #{a} >= 0)]\";\n"+
"          return new Template(predicate).evaluate({\n"+
"            fragment: fragment, a: a, b: b });\n"+
"        }\n"+
"      }\n"+
"    }\n"+
"  },\n"+
"\n"+
"  criteria: {\n"+
"    tagName:      'n = h.tagName(n, r, \"#{1}\", c);      c = false;',\n"+
"    className:    'n = h.className(n, r, \"#{1}\", c);    c = false;',\n"+
"    id:           'n = h.id(n, r, \"#{1}\", c);           c = false;',\n"+
"    attrPresence: 'n = h.attrPresence(n, r, \"#{1}\", c); c = false;',\n"+
"    attr: function(m) {\n"+
"      m[3] = (m[5] || m[6]);\n"+
"      return new Template('n = h.attr(n, r, \"#{1}\", \"#{3}\", \"#{2}\", c); c = false;').evaluate(m);\n"+
"    },\n"+
"    pseudo: function(m) {\n"+
"      if (m[6]) m[6] = m[6].replace(/\"/g, '\\\\\"');\n"+
"      return new Template('n = h.pseudo(n, \"#{1}\", \"#{6}\", r, c); c = false;').evaluate(m);\n"+
"    },\n"+
"    descendant:   'c = \"descendant\";',\n"+
"    child:        'c = \"child\";',\n"+
"    adjacent:     'c = \"adjacent\";',\n"+
"    laterSibling: 'c = \"laterSibling\";'\n"+
"  },\n"+
"\n"+
"  patterns: {\n"+
"    // combinators must be listed first\n"+
"    // (and descendant needs to be last combinator)\n"+
"    laterSibling: /^\\s*~\\s*/,\n"+
"    child:        /^\\s*>\\s*/,\n"+
"    adjacent:     /^\\s*\\+\\s*/,\n"+
"    descendant:   /^\\s/,\n"+
"\n"+
"    // selectors follow\n"+
"    tagName:      /^\\s*(\\*|[\\w\\-]+)(\\b|$)?/,\n"+
"    id:           /^#([\\w\\-\\*]+)(\\b|$)/,\n"+
"    className:    /^\\.([\\w\\-\\*]+)(\\b|$)/,\n"+
"    pseudo:\n"+
"/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\\((.*?)\\))?(\\b|$|(?=\\s|[:+~>]))/,\n"+
"    attrPresence: /^\\[((?:[\\w]+:)?[\\w]+)\\]/,\n"+
"    attr:         /\\[((?:[\\w-]*:)?[\\w-]+)\\s*(?:([!^$*~|]?=)\\s*((['\"])([^\\4]*?)\\4|([^'\"][^\\]]*?)))?\\]/\n"+
"  },\n"+
"\n"+
"  // for Selector.match and Element#match\n"+
"  assertions: {\n"+
"    tagName: function(element, matches) {\n"+
"      return matches[1].toUpperCase() == element.tagName.toUpperCase();\n"+
"    },\n"+
"\n"+
"    className: function(element, matches) {\n"+
"      return Element.hasClassName(element, matches[1]);\n"+
"    },\n"+
"\n"+
"    id: function(element, matches) {\n"+
"      return element.id === matches[1];\n"+
"    },\n"+
"\n"+
"    attrPresence: function(element, matches) {\n"+
"      return Element.hasAttribute(element, matches[1]);\n"+
"    },\n"+
"\n"+
"    attr: function(element, matches) {\n"+
"      var nodeValue = Element.readAttribute(element, matches[1]);\n"+
"      return nodeValue && Selector.operators[matches[2]](nodeValue, matches[5] || matches[6]);\n"+
"    }\n"+
"  },\n"+
"\n"+
"  handlers: {\n"+
"    // UTILITY FUNCTIONS\n"+
"    // joins two collections\n"+
"    concat: function(a, b) {\n"+
"      for (var i = 0, node; node = b[i]; i++)\n"+
"        a.push(node);\n"+
"      return a;\n"+
"    },\n"+
"\n"+
"    // marks an array of nodes for counting\n"+
"    mark: function(nodes) {\n"+
"      var _true = Prototype.emptyFunction;\n"+
"      for (var i = 0, node; node = nodes[i]; i++)\n"+
"        node._countedByPrototype = _true;\n"+
"      return nodes;\n"+
"    },\n"+
"\n"+
"    unmark: function(nodes) {\n"+
"      for (var i = 0, node; node = nodes[i]; i++)\n"+
"        node._countedByPrototype = undefined;\n"+
"      return nodes;\n"+
"    },\n"+
"\n"+
"    // mark each child node with its position (for nth calls)\n"+
"    // \"ofType\" flag indicates whether we're indexing for nth-of-type\n"+
"    // rather than nth-child\n"+
"    index: function(parentNode, reverse, ofType) {\n"+
"      parentNode._countedByPrototype = Prototype.emptyFunction;\n"+
"      if (reverse) {\n"+
"        for (var nodes = parentNode.childNodes, i = nodes.length - 1, j = 1; i >= 0; i--) {\n"+
"          var node = nodes[i];\n"+
"          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;\n"+
"        }\n"+
"      } else {\n"+
"        for (var i = 0, j = 1, nodes = parentNode.childNodes; node = nodes[i]; i++)\n"+
"          if (node.nodeType == 1 && (!ofType || node._countedByPrototype)) node.nodeIndex = j++;\n"+
"      }\n"+
"    },\n"+
"\n"+
"    // filters out duplicates and extends all nodes\n"+
"    unique: function(nodes) {\n"+
"      if (nodes.length == 0) return nodes;\n"+
"      var results = [], n;\n"+
"      for (var i = 0, l = nodes.length; i < l; i++)\n"+
"        if (!(n = nodes[i])._countedByPrototype) {\n"+
"          n._countedByPrototype = Prototype.emptyFunction;\n"+
"          results.push(Element.extend(n));\n"+
"        }\n"+
"      return Selector.handlers.unmark(results);\n"+
"    },\n"+
"\n"+
"    // COMBINATOR FUNCTIONS\n"+
"    descendant: function(nodes) {\n"+
"      var h = Selector.handlers;\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++)\n"+
"        h.concat(results, node.getElementsByTagName('*'));\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    child: function(nodes) {\n"+
"      var h = Selector.handlers;\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++) {\n"+
"        for (var j = 0, child; child = node.childNodes[j]; j++)\n"+
"          if (child.nodeType == 1 && child.tagName != '!') results.push(child);\n"+
"      }\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    adjacent: function(nodes) {\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++) {\n"+
"        var next = this.nextElementSibling(node);\n"+
"        if (next) results.push(next);\n"+
"      }\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    laterSibling: function(nodes) {\n"+
"      var h = Selector.handlers;\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++)\n"+
"        h.concat(results, Element.nextSiblings(node));\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    nextElementSibling: function(node) {\n"+
"      while (node = node.nextSibling)\n"+
"        if (node.nodeType == 1) return node;\n"+
"      return null;\n"+
"    },\n"+
"\n"+
"    previousElementSibling: function(node) {\n"+
"      while (node = node.previousSibling)\n"+
"        if (node.nodeType == 1) return node;\n"+
"      return null;\n"+
"    },\n"+
"\n"+
"    // TOKEN FUNCTIONS\n"+
"    tagName: function(nodes, root, tagName, combinator) {\n"+
"      var uTagName = tagName.toUpperCase();\n"+
"      var results = [], h = Selector.handlers;\n"+
"      if (nodes) {\n"+
"        if (combinator) {\n"+
"          // fastlane for ordinary descendant combinators\n"+
"          if (combinator == \"descendant\") {\n"+
"            for (var i = 0, node; node = nodes[i]; i++)\n"+
"              h.concat(results, node.getElementsByTagName(tagName));\n"+
"            return results;\n"+
"          } else nodes = this[combinator](nodes);\n"+
"          if (tagName == \"*\") return nodes;\n"+
"        }\n"+
"        for (var i = 0, node; node = nodes[i]; i++)\n"+
"          if (node.tagName.toUpperCase() === uTagName) results.push(node);\n"+
"        return results;\n"+
"      } else return root.getElementsByTagName(tagName);\n"+
"    },\n"+
"\n"+
"    id: function(nodes, root, id, combinator) {\n"+
"      var targetNode = $(id), h = Selector.handlers;\n"+
"      if (!targetNode) return [];\n"+
"      if (!nodes && root == document) return [targetNode];\n"+
"      if (nodes) {\n"+
"        if (combinator) {\n"+
"          if (combinator == 'child') {\n"+
"            for (var i = 0, node; node = nodes[i]; i++)\n"+
"              if (targetNode.parentNode == node) return [targetNode];\n"+
"          } else if (combinator == 'descendant') {\n"+
"            for (var i = 0, node; node = nodes[i]; i++)\n"+
"              if (Element.descendantOf(targetNode, node)) return [targetNode];\n"+
"          } else if (combinator == 'adjacent') {\n"+
"            for (var i = 0, node; node = nodes[i]; i++)\n"+
"              if (Selector.handlers.previousElementSibling(targetNode) == node)\n"+
"                return [targetNode];\n"+
"          } else nodes = h[combinator](nodes);\n"+
"        }\n"+
"        for (var i = 0, node; node = nodes[i]; i++)\n"+
"          if (node == targetNode) return [targetNode];\n"+
"        return [];\n"+
"      }\n"+
"      return (targetNode && Element.descendantOf(targetNode, root)) ? [targetNode] : [];\n"+
"    },\n"+
"\n"+
"    className: function(nodes, root, className, combinator) {\n"+
"      if (nodes && combinator) nodes = this[combinator](nodes);\n"+
"      return Selector.handlers.byClassName(nodes, root, className);\n"+
"    },\n"+
"\n"+
"    byClassName: function(nodes, root, className) {\n"+
"      if (!nodes) nodes = Selector.handlers.descendant([root]);\n"+
"      var needle = ' ' + className + ' ';\n"+
"      for (var i = 0, results = [], node, nodeClassName; node = nodes[i]; i++) {\n"+
"        nodeClassName = node.className;\n"+
"        if (nodeClassName.length == 0) continue;\n"+
"        if (nodeClassName == className || (' ' + nodeClassName + ' ').include(needle))\n"+
"          results.push(node);\n"+
"      }\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    attrPresence: function(nodes, root, attr, combinator) {\n"+
"      if (!nodes) nodes = root.getElementsByTagName(\"*\");\n"+
"      if (nodes && combinator) nodes = this[combinator](nodes);\n"+
"      var results = [];\n"+
"      for (var i = 0, node; node = nodes[i]; i++)\n"+
"        if (Element.hasAttribute(node, attr)) results.push(node);\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    attr: function(nodes, root, attr, value, operator, combinator) {\n"+
"      if (!nodes) nodes = root.getElementsByTagName(\"*\");\n"+
"      if (nodes && combinator) nodes = this[combinator](nodes);\n"+
"      var handler = Selector.operators[operator], results = [];\n"+
"      for (var i = 0, node; node = nodes[i]; i++) {\n"+
"        var nodeValue = Element.readAttribute(node, attr);\n"+
"        if (nodeValue === null) continue;\n"+
"        if (handler(nodeValue, value)) results.push(node);\n"+
"      }\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    pseudo: function(nodes, name, value, root, combinator) {\n"+
"      if (nodes && combinator) nodes = this[combinator](nodes);\n"+
"      if (!nodes) nodes = root.getElementsByTagName(\"*\");\n"+
"      return Selector.pseudos[name](nodes, value, root);\n"+
"    }\n"+
"  },\n"+
"\n"+
"  pseudos: {\n"+
"    'first-child': function(nodes, value, root) {\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++) {\n"+
"        if (Selector.handlers.previousElementSibling(node)) continue;\n"+
"          results.push(node);\n"+
"      }\n"+
"      return results;\n"+
"    },\n"+
"    'last-child': function(nodes, value, root) {\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++) {\n"+
"        if (Selector.handlers.nextElementSibling(node)) continue;\n"+
"          results.push(node);\n"+
"      }\n"+
"      return results;\n"+
"    },\n"+
"    'only-child': function(nodes, value, root) {\n"+
"      var h = Selector.handlers;\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++)\n"+
"        if (!h.previousElementSibling(node) && !h.nextElementSibling(node))\n"+
"          results.push(node);\n"+
"      return results;\n"+
"    },\n"+
"    'nth-child':        function(nodes, formula, root) {\n"+
"      return Selector.pseudos.nth(nodes, formula, root);\n"+
"    },\n"+
"    'nth-last-child':   function(nodes, formula, root) {\n"+
"      return Selector.pseudos.nth(nodes, formula, root, true);\n"+
"    },\n"+
"    'nth-of-type':      function(nodes, formula, root) {\n"+
"      return Selector.pseudos.nth(nodes, formula, root, false, true);\n"+
"    },\n"+
"    'nth-last-of-type': function(nodes, formula, root) {\n"+
"      return Selector.pseudos.nth(nodes, formula, root, true, true);\n"+
"    },\n"+
"    'first-of-type':    function(nodes, formula, root) {\n"+
"      return Selector.pseudos.nth(nodes, \"1\", root, false, true);\n"+
"    },\n"+
"    'last-of-type':     function(nodes, formula, root) {\n"+
"      return Selector.pseudos.nth(nodes, \"1\", root, true, true);\n"+
"    },\n"+
"    'only-of-type':     function(nodes, formula, root) {\n"+
"      var p = Selector.pseudos;\n"+
"      return p['last-of-type'](p['first-of-type'](nodes, formula, root), formula, root);\n"+
"    },\n"+
"\n"+
"    // handles the an+b logic\n"+
"    getIndices: function(a, b, total) {\n"+
"      if (a == 0) return b > 0 ? [b] : [];\n"+
"      return $R(1, total).inject([], function(memo, i) {\n"+
"        if (0 == (i - b) % a && (i - b) / a >= 0) memo.push(i);\n"+
"        return memo;\n"+
"      });\n"+
"    },\n"+
"\n"+
"    // handles nth(-last)-child, nth(-last)-of-type, and (first|last)-of-type\n"+
"    nth: function(nodes, formula, root, reverse, ofType) {\n"+
"      if (nodes.length == 0) return [];\n"+
"      if (formula == 'even') formula = '2n+0';\n"+
"      if (formula == 'odd')  formula = '2n+1';\n"+
"      var h = Selector.handlers, results = [], indexed = [], m;\n"+
"      h.mark(nodes);\n"+
"      for (var i = 0, node; node = nodes[i]; i++) {\n"+
"        if (!node.parentNode._countedByPrototype) {\n"+
"          h.index(node.parentNode, reverse, ofType);\n"+
"          indexed.push(node.parentNode);\n"+
"        }\n"+
"      }\n"+
"      if (formula.match(/^\\d+$/)) { // just a number\n"+
"        formula = Number(formula);\n"+
"        for (var i = 0, node; node = nodes[i]; i++)\n"+
"          if (node.nodeIndex == formula) results.push(node);\n"+
"      } else if (m = formula.match(/^(-?\\d*)?n(([+-])(\\d+))?/)) { // an+b\n"+
"        if (m[1] == \"-\") m[1] = -1;\n"+
"        var a = m[1] ? Number(m[1]) : 1;\n"+
"        var b = m[2] ? Number(m[2]) : 0;\n"+
"        var indices = Selector.pseudos.getIndices(a, b, nodes.length);\n"+
"        for (var i = 0, node, l = indices.length; node = nodes[i]; i++) {\n"+
"          for (var j = 0; j < l; j++)\n"+
"            if (node.nodeIndex == indices[j]) results.push(node);\n"+
"        }\n"+
"      }\n"+
"      h.unmark(nodes);\n"+
"      h.unmark(indexed);\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    'empty': function(nodes, value, root) {\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++) {\n"+
"        // IE treats comments as element nodes\n"+
"        if (node.tagName == '!' || node.firstChild) continue;\n"+
"        results.push(node);\n"+
"      }\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    'not': function(nodes, selector, root) {\n"+
"      var h = Selector.handlers, selectorType, m;\n"+
"      var exclusions = new Selector(selector).findElements(root);\n"+
"      h.mark(exclusions);\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++)\n"+
"        if (!node._countedByPrototype) results.push(node);\n"+
"      h.unmark(exclusions);\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    'enabled': function(nodes, value, root) {\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++)\n"+
"        if (!node.disabled && (!node.type || node.type !== 'hidden'))\n"+
"          results.push(node);\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    'disabled': function(nodes, value, root) {\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++)\n"+
"        if (node.disabled) results.push(node);\n"+
"      return results;\n"+
"    },\n"+
"\n"+
"    'checked': function(nodes, value, root) {\n"+
"      for (var i = 0, results = [], node; node = nodes[i]; i++)\n"+
"        if (node.checked) results.push(node);\n"+
"      return results;\n"+
"    }\n"+
"  },\n"+
"\n"+
"  operators: {\n"+
"    '=':  function(nv, v) { return nv == v; },\n"+
"    '!=': function(nv, v) { return nv != v; },\n"+
"    '^=': function(nv, v) { return nv == v || nv && nv.startsWith(v); },\n"+
"    '$=': function(nv, v) { return nv == v || nv && nv.endsWith(v); },\n"+
"    '*=': function(nv, v) { return nv == v || nv && nv.include(v); },\n"+
"    '$=': function(nv, v) { return nv.endsWith(v); },\n"+
"    '*=': function(nv, v) { return nv.include(v); },\n"+
"    '~=': function(nv, v) { return (' ' + nv + ' ').include(' ' + v + ' '); },\n"+
"    '|=': function(nv, v) { return ('-' + (nv || \"\").toUpperCase() +\n"+
"     '-').include('-' + (v || \"\").toUpperCase() + '-'); }\n"+
"  },\n"+
"\n"+
"  split: function(expression) {\n"+
"    var expressions = [];\n"+
"    expression.scan(/(([\\w#:.~>+()\\s-]+|\\*|\\[.*?\\])+)\\s*(,|$)/, function(m) {\n"+
"      expressions.push(m[1].strip());\n"+
"    });\n"+
"    return expressions;\n"+
"  },\n"+
"\n"+
"  matchElements: function(elements, expression) {\n"+
"    var matches = $$(expression), h = Selector.handlers;\n"+
"    h.mark(matches);\n"+
"    for (var i = 0, results = [], element; element = elements[i]; i++)\n"+
"      if (element._countedByPrototype) results.push(element);\n"+
"    h.unmark(matches);\n"+
"    return results;\n"+
"  },\n"+
"\n"+
"  findElement: function(elements, expression, index) {\n"+
"    if (Object.isNumber(expression)) {\n"+
"      index = expression; expression = false;\n"+
"    }\n"+
"    return Selector.matchElements(elements, expression || '*')[index || 0];\n"+
"  },\n"+
"\n"+
"  findChildElements: function(element, expressions) {\n"+
"    expressions = Selector.split(expressions.join(','));\n"+
"    var results = [], h = Selector.handlers;\n"+
"    for (var i = 0, l = expressions.length, selector; i < l; i++) {\n"+
"      selector = new Selector(expressions[i].strip());\n"+
"      h.concat(results, selector.findElements(element));\n"+
"    }\n"+
"    return (l > 1) ? h.unique(results) : results;\n"+
"  }\n"+
"});\n"+
"\n"+
"if (Prototype.Browser.IE) {\n"+
"  Object.extend(Selector.handlers, {\n"+
"    // IE returns comment nodes on getElementsByTagName(\"*\").\n"+
"    // Filter them out.\n"+
"    concat: function(a, b) {\n"+
"      for (var i = 0, node; node = b[i]; i++)\n"+
"        if (node.tagName !== \"!\") a.push(node);\n"+
"      return a;\n"+
"    },\n"+
"\n"+
"    // IE improperly serializes _countedByPrototype in (inner|outer)HTML.\n"+
"    unmark: function(nodes) {\n"+
"      for (var i = 0, node; node = nodes[i]; i++)\n"+
"        node.removeAttribute('_countedByPrototype');\n"+
"      return nodes;\n"+
"    }\n"+
"  });\n"+
"}\n"+
"\n"+
"function $$() {\n"+
"  return Selector.findChildElements(document, $A(arguments));\n"+
"}\n"+
"var Form = {\n"+
"  reset: function(form) {\n"+
"    $(form).reset();\n"+
"    return form;\n"+
"  },\n"+
"\n"+
"  serializeElements: function(elements, options) {\n"+
"    if (typeof options != 'object') options = { hash: !!options };\n"+
"    else if (Object.isUndefined(options.hash)) options.hash = true;\n"+
"    var key, value, submitted = false, submit = options.submit;\n"+
"\n"+
"    var data = elements.inject({ }, function(result, element) {\n"+
"      if (!element.disabled && element.name) {\n"+
"        key = element.name; value = $(element).getValue();\n"+
"        if (value != null && element.type != 'file' && (element.type != 'submit' || (!submitted &&\n"+
"            submit !== false && (!submit || key == submit) && (submitted = true)))) {\n"+
"          if (key in result) {\n"+
"            // a key is already present; construct an array of values\n"+
"            if (!Object.isArray(result[key])) result[key] = [result[key]];\n"+
"            result[key].push(value);\n"+
"          }\n"+
"          else result[key] = value;\n"+
"        }\n"+
"      }\n"+
"      return result;\n"+
"    });\n"+
"\n"+
"    return options.hash ? data : Object.toQueryString(data);\n"+
"  }\n"+
"};\n"+
"\n"+
"Form.Methods = {\n"+
"  serialize: function(form, options) {\n"+
"    return Form.serializeElements(Form.getElements(form), options);\n"+
"  },\n"+
"\n"+
"  getElements: function(form) {\n"+
"    return $A($(form).getElementsByTagName('*')).inject([],\n"+
"      function(elements, child) {\n"+
"        if (Form.Element.Serializers[child.tagName.toLowerCase()])\n"+
"          elements.push(Element.extend(child));\n"+
"        return elements;\n"+
"      }\n"+
"    );\n"+
"  },\n"+
"\n"+
"  getInputs: function(form, typeName, name) {\n"+
"    form = $(form);\n"+
"    var inputs = form.getElementsByTagName('input');\n"+
"\n"+
"    if (!typeName && !name) return $A(inputs).map(Element.extend);\n"+
"\n"+
"    for (var i = 0, matchingInputs = [], length = inputs.length; i < length; i++) {\n"+
"      var input = inputs[i];\n"+
"      if ((typeName && input.type != typeName) || (name && input.name != name))\n"+
"        continue;\n"+
"      matchingInputs.push(Element.extend(input));\n"+
"    }\n"+
"\n"+
"    return matchingInputs;\n"+
"  },\n"+
"\n"+
"  disable: function(form) {\n"+
"    form = $(form);\n"+
"    Form.getElements(form).invoke('disable');\n"+
"    return form;\n"+
"  },\n"+
"\n"+
"  enable: function(form) {\n"+
"    form = $(form);\n"+
"    Form.getElements(form).invoke('enable');\n"+
"    return form;\n"+
"  },\n"+
"\n"+
"  findFirstElement: function(form) {\n"+
"    var elements = $(form).getElements().findAll(function(element) {\n"+
"      return 'hidden' != element.type && !element.disabled;\n"+
"    });\n"+
"    var firstByIndex = elements.findAll(function(element) {\n"+
"      return element.hasAttribute('tabIndex') && element.tabIndex >= 0;\n"+
"    }).sortBy(function(element) { return element.tabIndex }).first();\n"+
"\n"+
"    return firstByIndex ? firstByIndex : elements.find(function(element) {\n"+
"      return ['input', 'select', 'textarea'].include(element.tagName.toLowerCase());\n"+
"    });\n"+
"  },\n"+
"\n"+
"  focusFirstElement: function(form) {\n"+
"    form = $(form);\n"+
"    form.findFirstElement().activate();\n"+
"    return form;\n"+
"  },\n"+
"\n"+
"  request: function(form, options) {\n"+
"    form = $(form), options = Object.clone(options || { });\n"+
"\n"+
"    var params = options.parameters, action = form.readAttribute('action') || '';\n"+
"    if (action.blank()) action = window.location.href;\n"+
"    options.parameters = form.serialize(true);\n"+
"\n"+
"    if (params) {\n"+
"      if (Object.isString(params)) params = params.toQueryParams();\n"+
"      Object.extend(options.parameters, params);\n"+
"    }\n"+
"\n"+
"    if (form.hasAttribute('method') && !options.method)\n"+
"      options.method = form.method;\n"+
"\n"+
"    return new Ajax.Request(action, options);\n"+
"  }\n"+
"};\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"Form.Element = {\n"+
"  focus: function(element) {\n"+
"    $(element).focus();\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  select: function(element) {\n"+
"    $(element).select();\n"+
"    return element;\n"+
"  }\n"+
"};\n"+
"\n"+
"Form.Element.Methods = {\n"+
"  serialize: function(element) {\n"+
"    element = $(element);\n"+
"    if (!element.disabled && element.name) {\n"+
"      var value = element.getValue();\n"+
"      if (value != undefined) {\n"+
"        var pair = { };\n"+
"        pair[element.name] = value;\n"+
"        return Object.toQueryString(pair);\n"+
"      }\n"+
"    }\n"+
"    return '';\n"+
"  },\n"+
"\n"+
"  getValue: function(element) {\n"+
"    element = $(element);\n"+
"    var method = element.tagName.toLowerCase();\n"+
"    return Form.Element.Serializers[method](element);\n"+
"  },\n"+
"\n"+
"  setValue: function(element, value) {\n"+
"    element = $(element);\n"+
"    var method = element.tagName.toLowerCase();\n"+
"    Form.Element.Serializers[method](element, value);\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  clear: function(element) {\n"+
"    $(element).value = '';\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  present: function(element) {\n"+
"    return $(element).value != '';\n"+
"  },\n"+
"\n"+
"  activate: function(element) {\n"+
"    element = $(element);\n"+
"    try {\n"+
"      element.focus();\n"+
"      if (element.select && (element.tagName.toLowerCase() != 'input' ||\n"+
"          !['button', 'reset', 'submit'].include(element.type)))\n"+
"        element.select();\n"+
"    } catch (e) { }\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  disable: function(element) {\n"+
"    element = $(element);\n"+
"    element.disabled = true;\n"+
"    return element;\n"+
"  },\n"+
"\n"+
"  enable: function(element) {\n"+
"    element = $(element);\n"+
"    element.disabled = false;\n"+
"    return element;\n"+
"  }\n"+
"};\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"var Field = Form.Element;\n"+
"var $F = Form.Element.Methods.getValue;\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"Form.Element.Serializers = {\n"+
"  input: function(element, value) {\n"+
"    switch (element.type.toLowerCase()) {\n"+
"      case 'checkbox':\n"+
"      case 'radio':\n"+
"        return Form.Element.Serializers.inputSelector(element, value);\n"+
"      default:\n"+
"        return Form.Element.Serializers.textarea(element, value);\n"+
"    }\n"+
"  },\n"+
"\n"+
"  inputSelector: function(element, value) {\n"+
"    if (Object.isUndefined(value)) return element.checked ? element.value : null;\n"+
"    else element.checked = !!value;\n"+
"  },\n"+
"\n"+
"  textarea: function(element, value) {\n"+
"    if (Object.isUndefined(value)) return element.value;\n"+
"    else element.value = value;\n"+
"  },\n"+
"\n"+
"  select: function(element, value) {\n"+
"    if (Object.isUndefined(value))\n"+
"      return this[element.type == 'select-one' ?\n"+
"        'selectOne' : 'selectMany'](element);\n"+
"    else {\n"+
"      var opt, currentValue, single = !Object.isArray(value);\n"+
"      for (var i = 0, length = element.length; i < length; i++) {\n"+
"        opt = element.options[i];\n"+
"        currentValue = this.optionValue(opt);\n"+
"        if (single) {\n"+
"          if (currentValue == value) {\n"+
"            opt.selected = true;\n"+
"            return;\n"+
"          }\n"+
"        }\n"+
"        else opt.selected = value.include(currentValue);\n"+
"      }\n"+
"    }\n"+
"  },\n"+
"\n"+
"  selectOne: function(element) {\n"+
"    var index = element.selectedIndex;\n"+
"    return index >= 0 ? this.optionValue(element.options[index]) : null;\n"+
"  },\n"+
"\n"+
"  selectMany: function(element) {\n"+
"    var values, length = element.length;\n"+
"    if (!length) return null;\n"+
"\n"+
"    for (var i = 0, values = []; i < length; i++) {\n"+
"      var opt = element.options[i];\n"+
"      if (opt.selected) values.push(this.optionValue(opt));\n"+
"    }\n"+
"    return values;\n"+
"  },\n"+
"\n"+
"  optionValue: function(opt) {\n"+
"    // extend element because hasAttribute may not be native\n"+
"    return Element.extend(opt).hasAttribute('value') ? opt.value : opt.text;\n"+
"  }\n"+
"};\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"Abstract.TimedObserver = Class.create(PeriodicalExecuter, {\n"+
"  initialize: function($super, element, frequency, callback) {\n"+
"    $super(callback, frequency);\n"+
"    this.element   = $(element);\n"+
"    this.lastValue = this.getValue();\n"+
"  },\n"+
"\n"+
"  execute: function() {\n"+
"    var value = this.getValue();\n"+
"    if (Object.isString(this.lastValue) && Object.isString(value) ?\n"+
"        this.lastValue != value : String(this.lastValue) != String(value)) {\n"+
"      this.callback(this.element, value);\n"+
"      this.lastValue = value;\n"+
"    }\n"+
"  }\n"+
"});\n"+
"\n"+
"Form.Element.Observer = Class.create(Abstract.TimedObserver, {\n"+
"  getValue: function() {\n"+
"    return Form.Element.getValue(this.element);\n"+
"  }\n"+
"});\n"+
"\n"+
"Form.Observer = Class.create(Abstract.TimedObserver, {\n"+
"  getValue: function() {\n"+
"    return Form.serialize(this.element);\n"+
"  }\n"+
"});\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"Abstract.EventObserver = Class.create({\n"+
"  initialize: function(element, callback) {\n"+
"    this.element  = $(element);\n"+
"    this.callback = callback;\n"+
"\n"+
"    this.lastValue = this.getValue();\n"+
"    if (this.element.tagName.toLowerCase() == 'form')\n"+
"      this.registerFormCallbacks();\n"+
"    else\n"+
"      this.registerCallback(this.element);\n"+
"  },\n"+
"\n"+
"  onElementEvent: function() {\n"+
"    var value = this.getValue();\n"+
"    if (this.lastValue != value) {\n"+
"      this.callback(this.element, value);\n"+
"      this.lastValue = value;\n"+
"    }\n"+
"  },\n"+
"\n"+
"  registerFormCallbacks: function() {\n"+
"    Form.getElements(this.element).each(this.registerCallback, this);\n"+
"  },\n"+
"\n"+
"  registerCallback: function(element) {\n"+
"    if (element.type) {\n"+
"      switch (element.type.toLowerCase()) {\n"+
"        case 'checkbox':\n"+
"        case 'radio':\n"+
"          Event.observe(element, 'click', this.onElementEvent.bind(this));\n"+
"          break;\n"+
"        default:\n"+
"          Event.observe(element, 'change', this.onElementEvent.bind(this));\n"+
"          break;\n"+
"      }\n"+
"    }\n"+
"  }\n"+
"});\n"+
"\n"+
"Form.Element.EventObserver = Class.create(Abstract.EventObserver, {\n"+
"  getValue: function() {\n"+
"    return Form.Element.getValue(this.element);\n"+
"  }\n"+
"});\n"+
"\n"+
"Form.EventObserver = Class.create(Abstract.EventObserver, {\n"+
"  getValue: function() {\n"+
"    return Form.serialize(this.element);\n"+
"  }\n"+
"});\n"+
"if (!window.Event) var Event = { };\n"+
"\n"+
"Object.extend(Event, {\n"+
"  KEY_BACKSPACE: 8,\n"+
"  KEY_TAB:       9,\n"+
"  KEY_RETURN:   13,\n"+
"  KEY_ESC:      27,\n"+
"  KEY_LEFT:     37,\n"+
"  KEY_UP:       38,\n"+
"  KEY_RIGHT:    39,\n"+
"  KEY_DOWN:     40,\n"+
"  KEY_DELETE:   46,\n"+
"  KEY_HOME:     36,\n"+
"  KEY_END:      35,\n"+
"  KEY_PAGEUP:   33,\n"+
"  KEY_PAGEDOWN: 34,\n"+
"  KEY_INSERT:   45,\n"+
"\n"+
"  cache: { },\n"+
"\n"+
"  relatedTarget: function(event) {\n"+
"    var element;\n"+
"    switch(event.type) {\n"+
"      case 'mouseover': element = event.fromElement; break;\n"+
"      case 'mouseout':  element = event.toElement;   break;\n"+
"      default: return null;\n"+
"    }\n"+
"    return Element.extend(element);\n"+
"  }\n"+
"});\n"+
"\n"+
"Event.Methods = (function() {\n"+
"  var isButton;\n"+
"\n"+
"  if (Prototype.Browser.IE) {\n"+
"    var buttonMap = { 0: 1, 1: 4, 2: 2 };\n"+
"    isButton = function(event, code) {\n"+
"      return event.button == buttonMap[code];\n"+
"    };\n"+
"\n"+
"  } else if (Prototype.Browser.WebKit) {\n"+
"    isButton = function(event, code) {\n"+
"      switch (code) {\n"+
"        case 0: return event.which == 1 && !event.metaKey;\n"+
"        case 1: return event.which == 1 && event.metaKey;\n"+
"        default: return false;\n"+
"      }\n"+
"    };\n"+
"\n"+
"  } else {\n"+
"    isButton = function(event, code) {\n"+
"      return event.which ? (event.which === code + 1) : (event.button === code);\n"+
"    };\n"+
"  }\n"+
"\n"+
"  return {\n"+
"    isLeftClick:   function(event) { return isButton(event, 0) },\n"+
"    isMiddleClick: function(event) { return isButton(event, 1) },\n"+
"    isRightClick:  function(event) { return isButton(event, 2) },\n"+
"\n"+
"    element: function(event) {\n"+
"      event = Event.extend(event);\n"+
"\n"+
"      var node          = event.target,\n"+
"          type          = event.type,\n"+
"          currentTarget = event.currentTarget;\n"+
"\n"+
"      if (currentTarget && currentTarget.tagName) {\n"+
"        // Firefox screws up the \"click\" event when moving between radio buttons\n"+
"        // via arrow keys. It also screws up the \"load\" and \"error\" events on images,\n"+
"        // reporting the document as the target instead of the original image.\n"+
"        if (type === 'load' || type === 'error' ||\n"+
"          (type === 'click' && currentTarget.tagName.toLowerCase() === 'input'\n"+
"            && currentTarget.type === 'radio'))\n"+
"              node = currentTarget;\n"+
"      }\n"+
"      if (node.nodeType == Node.TEXT_NODE) node = node.parentNode;\n"+
"      return Element.extend(node);\n"+
"    },\n"+
"\n"+
"    findElement: function(event, expression) {\n"+
"      var element = Event.element(event);\n"+
"      if (!expression) return element;\n"+
"      var elements = [element].concat(element.ancestors());\n"+
"      return Selector.findElement(elements, expression, 0);\n"+
"    },\n"+
"\n"+
"    pointer: function(event) {\n"+
"      var docElement = document.documentElement,\n"+
"      body = document.body || { scrollLeft: 0, scrollTop: 0 };\n"+
"      return {\n"+
"        x: event.pageX || (event.clientX +\n"+
"          (docElement.scrollLeft || body.scrollLeft) -\n"+
"          (docElement.clientLeft || 0)),\n"+
"        y: event.pageY || (event.clientY +\n"+
"          (docElement.scrollTop || body.scrollTop) -\n"+
"          (docElement.clientTop || 0))\n"+
"      };\n"+
"    },\n"+
"\n"+
"    pointerX: function(event) { return Event.pointer(event).x },\n"+
"    pointerY: function(event) { return Event.pointer(event).y },\n"+
"\n"+
"    stop: function(event) {\n"+
"      Event.extend(event);\n"+
"      event.preventDefault();\n"+
"      event.stopPropagation();\n"+
"      event.stopped = true;\n"+
"    }\n"+
"  };\n"+
"})();\n"+
"\n"+
"Event.extend = (function() {\n"+
"  var methods = Object.keys(Event.Methods).inject({ }, function(m, name) {\n"+
"    m[name] = Event.Methods[name].methodize();\n"+
"    return m;\n"+
"  });\n"+
"\n"+
"  if (Prototype.Browser.IE) {\n"+
"    Object.extend(methods, {\n"+
"      stopPropagation: function() { this.cancelBubble = true },\n"+
"      preventDefault:  function() { this.returnValue = false },\n"+
"      inspect: function() { return \"[object Event]\" }\n"+
"    });\n"+
"\n"+
"    return function(event) {\n"+
"      if (!event) return false;\n"+
"      if (event._extendedByPrototype) return event;\n"+
"\n"+
"      event._extendedByPrototype = Prototype.emptyFunction;\n"+
"      var pointer = Event.pointer(event);\n"+
"      Object.extend(event, {\n"+
"        target: event.srcElement,\n"+
"        relatedTarget: Event.relatedTarget(event),\n"+
"        pageX:  pointer.x,\n"+
"        pageY:  pointer.y\n"+
"      });\n"+
"      return Object.extend(event, methods);\n"+
"    };\n"+
"\n"+
"  } else {\n"+
"    Event.prototype = Event.prototype || document.createEvent(\"HTMLEvents\")['__proto__'];\n"+
"    Object.extend(Event.prototype, methods);\n"+
"    return Prototype.K;\n"+
"  }\n"+
"})();\n"+
"\n"+
"Object.extend(Event, (function() {\n"+
"  var cache = Event.cache;\n"+
"\n"+
"  function getEventID(element) {\n"+
"    if (element._prototypeEventID) return element._prototypeEventID[0];\n"+
"    arguments.callee.id = arguments.callee.id || 1;\n"+
"    return element._prototypeEventID = [++arguments.callee.id];\n"+
"  }\n"+
"\n"+
"  function getDOMEventName(eventName) {\n"+
"    if (eventName && eventName.include(':')) return \"dataavailable\";\n"+
"    return eventName;\n"+
"  }\n"+
"\n"+
"  function getCacheForID(id) {\n"+
"    return cache[id] = cache[id] || { };\n"+
"  }\n"+
"\n"+
"  function getWrappersForEventName(id, eventName) {\n"+
"    var c = getCacheForID(id);\n"+
"    return c[eventName] = c[eventName] || [];\n"+
"  }\n"+
"\n"+
"  function createWrapper(element, eventName, handler) {\n"+
"    var id = getEventID(element);\n"+
"    var c = getWrappersForEventName(id, eventName);\n"+
"    if (c.pluck(\"handler\").include(handler)) return false;\n"+
"\n"+
"    var wrapper = function(event) {\n"+
"      if (!Event || !Event.extend ||\n"+
"        (event.eventName && event.eventName != eventName))\n"+
"          return false;\n"+
"\n"+
"      Event.extend(event);\n"+
"      handler.call(element, event);\n"+
"    };\n"+
"\n"+
"    wrapper.handler = handler;\n"+
"    c.push(wrapper);\n"+
"    return wrapper;\n"+
"  }\n"+
"\n"+
"  function findWrapper(id, eventName, handler) {\n"+
"    var c = getWrappersForEventName(id, eventName);\n"+
"    return c.find(function(wrapper) { return wrapper.handler == handler });\n"+
"  }\n"+
"\n"+
"  function destroyWrapper(id, eventName, handler) {\n"+
"    var c = getCacheForID(id);\n"+
"    if (!c[eventName]) return false;\n"+
"    c[eventName] = c[eventName].without(findWrapper(id, eventName, handler));\n"+
"  }\n"+
"\n"+
"  function destroyCache() {\n"+
"    for (var id in cache)\n"+
"      for (var eventName in cache[id])\n"+
"        cache[id][eventName] = null;\n"+
"  }\n"+
"\n"+
"\n"+
"  // Internet Explorer needs to remove event handlers on page unload\n"+
"  // in order to avoid memory leaks.\n"+
"  if (window.attachEvent) {\n"+
"    window.attachEvent(\"onunload\", destroyCache);\n"+
"  }\n"+
"\n"+
"  // Safari has a dummy event handler on page unload so that it won't\n"+
"  // use its bfcache. Safari <= 3.1 has an issue with restoring the \"document\"\n"+
"  // object when page is returned to via the back button using its bfcache.\n"+
"  if (Prototype.Browser.WebKit) {\n"+
"    window.addEventListener('unload', Prototype.emptyFunction, false);\n"+
"  }\n"+
"\n"+
"  return {\n"+
"    observe: function(element, eventName, handler) {\n"+
"      element = $(element);\n"+
"      var name = getDOMEventName(eventName);\n"+
"\n"+
"      var wrapper = createWrapper(element, eventName, handler);\n"+
"      if (!wrapper) return element;\n"+
"\n"+
"      if (element.addEventListener) {\n"+
"        element.addEventListener(name, wrapper, false);\n"+
"      } else {\n"+
"        element.attachEvent(\"on\" + name, wrapper);\n"+
"      }\n"+
"\n"+
"      return element;\n"+
"    },\n"+
"\n"+
"    stopObserving: function(element, eventName, handler) {\n"+
"      element = $(element);\n"+
"      var id = getEventID(element), name = getDOMEventName(eventName);\n"+
"\n"+
"      if (!handler && eventName) {\n"+
"        getWrappersForEventName(id, eventName).each(function(wrapper) {\n"+
"          element.stopObserving(eventName, wrapper.handler);\n"+
"        });\n"+
"        return element;\n"+
"\n"+
"      } else if (!eventName) {\n"+
"        Object.keys(getCacheForID(id)).each(function(eventName) {\n"+
"          element.stopObserving(eventName);\n"+
"        });\n"+
"        return element;\n"+
"      }\n"+
"\n"+
"      var wrapper = findWrapper(id, eventName, handler);\n"+
"      if (!wrapper) return element;\n"+
"\n"+
"      if (element.removeEventListener) {\n"+
"        element.removeEventListener(name, wrapper, false);\n"+
"      } else {\n"+
"        element.detachEvent(\"on\" + name, wrapper);\n"+
"      }\n"+
"\n"+
"      destroyWrapper(id, eventName, handler);\n"+
"\n"+
"      return element;\n"+
"    },\n"+
"\n"+
"    fire: function(element, eventName, memo) {\n"+
"      element = $(element);\n"+
"      if (element == document && document.createEvent && !element.dispatchEvent)\n"+
"        element = document.documentElement;\n"+
"\n"+
"      var event;\n"+
"      if (document.createEvent) {\n"+
"        event = document.createEvent(\"HTMLEvents\");\n"+
"        event.initEvent(\"dataavailable\", true, true);\n"+
"      } else {\n"+
"        event = document.createEventObject();\n"+
"        event.eventType = \"ondataavailable\";\n"+
"      }\n"+
"\n"+
"      event.eventName = eventName;\n"+
"      event.memo = memo || { };\n"+
"\n"+
"      if (document.createEvent) {\n"+
"        element.dispatchEvent(event);\n"+
"      } else {\n"+
"        element.fireEvent(event.eventType, event);\n"+
"      }\n"+
"\n"+
"      return Event.extend(event);\n"+
"    }\n"+
"  };\n"+
"})());\n"+
"\n"+
"Object.extend(Event, Event.Methods);\n"+
"\n"+
"Element.addMethods({\n"+
"  fire:          Event.fire,\n"+
"  observe:       Event.observe,\n"+
"  stopObserving: Event.stopObserving\n"+
"});\n"+
"\n"+
"Object.extend(document, {\n"+
"  fire:          Element.Methods.fire.methodize(),\n"+
"  observe:       Element.Methods.observe.methodize(),\n"+
"  stopObserving: Element.Methods.stopObserving.methodize(),\n"+
"  loaded:        false\n"+
"});\n"+
"\n"+
"(function() {\n"+
"  /* Support for the DOMContentLoaded event is based on work by Dan Webb,\n"+
"     Matthias Miller, Dean Edwards and John Resig. */\n"+
"\n"+
"  var timer;\n"+
"\n"+
"  function fireContentLoadedEvent() {\n"+
"    if (document.loaded) return;\n"+
"    if (timer) window.clearInterval(timer);\n"+
"    document.fire(\"dom:loaded\");\n"+
"    document.loaded = true;\n"+
"  }\n"+
"\n"+
"  if (document.addEventListener) {\n"+
"    if (Prototype.Browser.WebKit) {\n"+
"      timer = window.setInterval(function() {\n"+
"        if (/loaded|complete/.test(document.readyState))\n"+
"          fireContentLoadedEvent();\n"+
"      }, 0);\n"+
"\n"+
"      Event.observe(window, \"load\", fireContentLoadedEvent);\n"+
"\n"+
"    } else {\n"+
"      document.addEventListener(\"DOMContentLoaded\",\n"+
"        fireContentLoadedEvent, false);\n"+
"    }\n"+
"\n"+
"  } else {\n"+
"    document.write(\"<script id=__onDOMContentLoaded defer src=//:><\\/script>\");\n"+
"    $(\"__onDOMContentLoaded\").onreadystatechange = function() {\n"+
"      if (this.readyState == \"complete\") {\n"+
"        this.onreadystatechange = null;\n"+
"        fireContentLoadedEvent();\n"+
"      }\n"+
"    };\n"+
"  }\n"+
"})();\n"+
"/*------------------------------- DEPRECATED -------------------------------*/\n"+
"\n"+
"Hash.toQueryString = Object.toQueryString;\n"+
"\n"+
"var Toggle = { display: Element.toggle };\n"+
"\n"+
"Element.Methods.childOf = Element.Methods.descendantOf;\n"+
"\n"+
"var Insertion = {\n"+
"  Before: function(element, content) {\n"+
"    return Element.insert(element, {before:content});\n"+
"  },\n"+
"\n"+
"  Top: function(element, content) {\n"+
"    return Element.insert(element, {top:content});\n"+
"  },\n"+
"\n"+
"  Bottom: function(element, content) {\n"+
"    return Element.insert(element, {bottom:content});\n"+
"  },\n"+
"\n"+
"  After: function(element, content) {\n"+
"    return Element.insert(element, {after:content});\n"+
"  }\n"+
"};\n"+
"\n"+
"var $continue = new Error('\"throw $continue\" is deprecated, use \"return\" instead');\n"+
"\n"+
"// This should be moved to script.aculo.us; notice the deprecated methods\n"+
"// further below, that map to the newer Element methods.\n"+
"var Position = {\n"+
"  // set to true if needed, warning: firefox performance problems\n"+
"  // NOT neeeded for page scrolling, only if draggable contained in\n"+
"  // scrollable elements\n"+
"  includeScrollOffsets: false,\n"+
"\n"+
"  // must be called before calling withinIncludingScrolloffset, every time the\n"+
"  // page is scrolled\n"+
"  prepare: function() {\n"+
"    this.deltaX =  window.pageXOffset\n"+
"                || document.documentElement.scrollLeft\n"+
"                || document.body.scrollLeft\n"+
"                || 0;\n"+
"    this.deltaY =  window.pageYOffset\n"+
"                || document.documentElement.scrollTop\n"+
"                || document.body.scrollTop\n"+
"                || 0;\n"+
"  },\n"+
"\n"+
"  // caches x/y coordinate pair to use with overlap\n"+
"  within: function(element, x, y) {\n"+
"    if (this.includeScrollOffsets)\n"+
"      return this.withinIncludingScrolloffsets(element, x, y);\n"+
"    this.xcomp = x;\n"+
"    this.ycomp = y;\n"+
"    this.offset = Element.cumulativeOffset(element);\n"+
"\n"+
"    return (y >= this.offset[1] &&\n"+
"            y <  this.offset[1] + element.offsetHeight &&\n"+
"            x >= this.offset[0] &&\n"+
"            x <  this.offset[0] + element.offsetWidth);\n"+
"  },\n"+
"\n"+
"  withinIncludingScrolloffsets: function(element, x, y) {\n"+
"    var offsetcache = Element.cumulativeScrollOffset(element);\n"+
"\n"+
"    this.xcomp = x + offsetcache[0] - this.deltaX;\n"+
"    this.ycomp = y + offsetcache[1] - this.deltaY;\n"+
"    this.offset = Element.cumulativeOffset(element);\n"+
"\n"+
"    return (this.ycomp >= this.offset[1] &&\n"+
"            this.ycomp <  this.offset[1] + element.offsetHeight &&\n"+
"            this.xcomp >= this.offset[0] &&\n"+
"            this.xcomp <  this.offset[0] + element.offsetWidth);\n"+
"  },\n"+
"\n"+
"  // within must be called directly before\n"+
"  overlap: function(mode, element) {\n"+
"    if (!mode) return 0;\n"+
"    if (mode == 'vertical')\n"+
"      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /\n"+
"        element.offsetHeight;\n"+
"    if (mode == 'horizontal')\n"+
"      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /\n"+
"        element.offsetWidth;\n"+
"  },\n"+
"\n"+
"  // Deprecation layer -- use newer Element methods now (1.5.2).\n"+
"\n"+
"  cumulativeOffset: Element.Methods.cumulativeOffset,\n"+
"\n"+
"  positionedOffset: Element.Methods.positionedOffset,\n"+
"\n"+
"  absolutize: function(element) {\n"+
"    Position.prepare();\n"+
"    return Element.absolutize(element);\n"+
"  },\n"+
"\n"+
"  relativize: function(element) {\n"+
"    Position.prepare();\n"+
"    return Element.relativize(element);\n"+
"  },\n"+
"\n"+
"  realOffset: Element.Methods.cumulativeScrollOffset,\n"+
"\n"+
"  offsetParent: Element.Methods.getOffsetParent,\n"+
"\n"+
"  page: Element.Methods.viewportOffset,\n"+
"\n"+
"  clone: function(source, target, options) {\n"+
"    options = options || { };\n"+
"    return Element.clonePosition(target, source, options);\n"+
"  }\n"+
"};\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"if (!document.getElementsByClassName) document.getElementsByClassName = function(instanceMethods){\n"+
"  function iter(name) {\n"+
"    return name.blank() ? null : \"[contains(concat(' ', @class, ' '), ' \" + name + \" ')]\";\n"+
"  }\n"+
"\n"+
"  instanceMethods.getElementsByClassName = Prototype.BrowserFeatures.XPath ?\n"+
"  function(element, className) {\n"+
"    className = className.toString().strip();\n"+
"    var cond = /\\s/.test(className) ? $w(className).map(iter).join('') : iter(className);\n"+
"    return cond ? document._getElementsByXPath('.//*' + cond, element) : [];\n"+
"  } : function(element, className) {\n"+
"    className = className.toString().strip();\n"+
"    var elements = [], classNames = (/\\s/.test(className) ? $w(className) : null);\n"+
"    if (!classNames && !className) return elements;\n"+
"\n"+
"    var nodes = $(element).getElementsByTagName('*');\n"+
"    className = ' ' + className + ' ';\n"+
"\n"+
"    for (var i = 0, child, cn; child = nodes[i]; i++) {\n"+
"      if (child.className && (cn = ' ' + child.className + ' ') && (cn.include(className) ||\n"+
"          (classNames && classNames.all(function(name) {\n"+
"            return !name.toString().blank() && cn.include(' ' + name + ' ');\n"+
"          }))))\n"+
"        elements.push(Element.extend(child));\n"+
"    }\n"+
"    return elements;\n"+
"  };\n"+
"\n"+
"  return function(className, parentElement) {\n"+
"    return $(parentElement || document.body).getElementsByClassName(className);\n"+
"  };\n"+
"}(Element.Methods);\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"Element.ClassNames = Class.create();\n"+
"Element.ClassNames.prototype = {\n"+
"  initialize: function(element) {\n"+
"    this.element = $(element);\n"+
"  },\n"+
"\n"+
"  _each: function(iterator) {\n"+
"    this.element.className.split(/\\s+/).select(function(name) {\n"+
"      return name.length > 0;\n"+
"    })._each(iterator);\n"+
"  },\n"+
"\n"+
"  set: function(className) {\n"+
"    this.element.className = className;\n"+
"  },\n"+
"\n"+
"  add: function(classNameToAdd) {\n"+
"    if (this.include(classNameToAdd)) return;\n"+
"    this.set($A(this).concat(classNameToAdd).join(' '));\n"+
"  },\n"+
"\n"+
"  remove: function(classNameToRemove) {\n"+
"    if (!this.include(classNameToRemove)) return;\n"+
"    this.set($A(this).without(classNameToRemove).join(' '));\n"+
"  },\n"+
"\n"+
"  toString: function() {\n"+
"    return $A(this).join(' ');\n"+
"  }\n"+
"};\n"+
"\n"+
"Object.extend(Element.ClassNames.prototype, Enumerable);\n"+
"\n"+
"/*--------------------------------------------------------------------------*/\n"+
"\n"+
"Element.addMethods();\n"+
"\n",
"/**************************************\n"+
" Tard's KoL Scripts\n"+
" Copyright (c) 2008, Byung Kim\n"+
" Released under the GPL license\n"+
" http://www.gnu.org/copyleft/gpl.html\n"+
"\n"+
" Go to http://groups.google.com/group/tards-kol-greasemonkey-scripts?hl=en for more info.\n"+
"***************************************/\n"+
"\n"+
"/**************************************\n"+
" Name: Framework Script\n"+
" Revision: 5.8\n"+
" \n"+
" Changes in this revision:\n"+
" * update tab behavior\n"+
" \n"+
"***************************************/\n"+
"\n"+
"\n"+
"var Framework = Class.create();\n"+
"Framework.prototype = {\n"+
"   initialize : function() {},\n"+
"   model : {},\n"+
"   view : {},\n"+
"   controller : {}\n"+
"};\n"+
"var framework = new Framework();\n"+
"\n"+
"\n"+
"\n"+
"Object.extend(framework.model,{\n"+
"   pageState : null,\n"+
"   interfaceData : {\n"+
"       currentTab : \"main\",\n"+
"       currentPane : null,\n"+
"       rolloverTab: \"\",\n"+
"       isFighting : false,\n"+
"       fightTurns : 1,\n"+
"       currentConfigPanelTab : \"framework\",\n"+
"       isTabChatActive : true,\n"+
"       customTabs : [],\n"+
"       tabAutoLoad : \"\",\n"+
"       tabInteraction : 0,\n"+
"       quickSkillPref : 0,\n"+
"       scriptsTotal : 0,\n"+
"       scriptsLoaded : 0,\n"+
"       scriptQueue : {\n"+
"           'menu' : [],\n"+
"           'main' : [],\n"+
"           'char' : [],\n"+
"           'inv' : [],\n"+
"           'store' : [],\n"+
"           'mall' : [],\n"+
"           'ctab' : [],\n"+
"           'panel' : []\n"+
"       },\n"+
"       commandsQueue : [],\n"+
"       commandsHistory : [],\n"+
"       commandsHistoryIndex : 0,\n"+
"       isCommandsQueueActive : false\n"+
"   },\n"+
"   userData : {\n"+
"       isLoaded : false,\n"+
"       lastAdventure : \"\",\n"+
"       advArray : [],\n"+
"       pwd : \"\",\n"+
"       cName : \"\",\n"+
"       cc : \"\",\n"+
"       ctype : \"\",\n"+
"       lvl : \"\",\n"+
"       sign : \"\",\n"+
"       playerId : \"\"\n"+
"   },\n"+
"   actions : {\n"+
"       tabs : {\n"+
"           \"inv\":\"inventory.php?which=1\",\n"+
"           \"store\":\"town_market.php\",\n"+
"           \"skill\":\"skills.php\",\n"+
"           \"mall\":\"mall.php\",\n"+
"           \"msg\":\"messages.php\",\n"+
"           \"tinyskill\":\"skills.php?tiny=1\"\n"+
"       },\n"+
"       mcd : {\n"+
"           check : {\n"+
"               \"Mys\" : \"canadia.php?place=machine\",\n"+
"               \"Mox\" : \"AOT5K</a>\",\n"+
"               \"Mus\" : \"Radio</a>\"\n"+
"           },\n"+
"           set : {\n"+
"               \"Mys\" : \"canadia.php?action=changedial&whichlevel=\",\n"+
"               \"Mox\" : \"gnomes.php?action=changedial&whichlevel=\",\n"+
"               \"Mus\" : \"inv_use.php?whichitem=2682&which=3&tuneradio=\"\n"+
"           }\n"+
"       }\n"+
"   },\n"+
"   character : {\n"+
"       classes : {\n"+
"           \"Lemming Trampler\":\"SC\",\"Tern Slapper\":\"SC\",\"Puffin Intimidator\":\"SC\",\"Ermine Thumper\":\"SC\",\"Penguin Frightener\":\"SC\",\"Malamute Basher\":\"SC\",\"Narwhal Pummeler\":\"SC\",\"Otter Crusher\":\"SC\",\"Caribou Smacker\":\"SC\",\"Moose Harasser\":\"SC\",\"Reindeer Threatener\":\"SC\",\"Ox Wrestler\":\"SC\",\"Walrus Bludgeoner\":\"SC\",\"Whale Boxer\":\"SC\",\"Seal Clubber\":\"SC\",\n"+
"           \"Toad Coach\":\"TT\",\"Skink Trainer\":\"TT\",\"Frog Director\":\"TT\",\"Gecko Supervisor\":\"TT\",\"Newt Herder\":\"TT\",\"Frog Boss\":\"TT\",\"Iguana Driver\":\"TT\",\"Salamander Subduer\":\"TT\",\"Bullfrog Overseer\":\"TT\",\"Rattlesnake Chief\":\"TT\",\"Crocodile Lord\":\"TT\",\"Cobra Commander\":\"TT\",\"Alligator Subjugator\":\"TT\",\"Asp Master\":\"TT\",\"Turtle Tamer\":\"TT\",\n"+
"           \"Dough Acolyte\":\"PM\",\"Yeast Scholar\":\"PM\",\"Noodle Neophyte\":\"PM\",\"Starch Savant\":\"PM\",\"Carbohydrate Cognoscenti\":\"PM\",\"Spaghetti Sage\":\"PM\",\"Macaroni Magician\":\"PM\",\"Vermicelli Enchanter\":\"PM\",\"Linguini Thaumaturge\":\"PM\",\"Ravioli Sorcerer\":\"PM\",\"Manicotti Magus\":\"PM\",\"Spaghetti Spellbinder\":\"PM\",\"Cannelloni Conjurer\":\"PM\",\"Angel-Hair Archmage\":\"PM\",\"Pastamancer\":\"PM\",\n"+
"           \"Allspice Acolyte\":\"SR\",\"Cilantro Seer\":\"SR\",\"Parsley Enchanter\":\"SR\",\"Sage Sage\":\"SR\",\"Rosemary Diviner\":\"SR\",\"Thyme Wizard\":\"SR\",\"Tarragon Thaumaturge\":\"SR\",\"Oreganoccultist\":\"SR\",\"Basillusionist\":\"SR\",\"Coriander Conjurer\":\"SR\",\"Bay Leaf Brujo\":\"SR\",\"Sesame Soothsayer\":\"SR\",\"Marinara Mage\":\"SR\",\"Alfredo Archmage\":\"SR\",\"Sauceror\":\"SR\",\n"+
"           \"Polka Criminal\":\"AT\",\"Mariachi Larcenist\":\"AT\",\"Zydeco Rogue\":\"AT\",\"Chord Horker\":\"AT\",\"Chromatic Crook\":\"AT\",\"Squeezebox Scoundrel\":\"AT\",\"Concertina Con Artist\":\"AT\",\"Button Box Burglar\":\"AT\",\"Hurdy-Gurdy Hooligan\":\"AT\",\"Sub-Sub-Apprentice Accordion Thief\":\"AT\",\"Sub-Apprentice Accordion Thief\":\"AT\",\"Pseudo-Apprentice Accordion Thief \":\"AT\",\"Hemi-Apprentice Accordion Thief\":\"AT\",\"Apprentice Accordion Thief\":\"AT\",\"Accordion Thief\":\"AT\",\n"+
"           \"Funk Footpad\":\"DB\",\"Rhythm Rogue\":\"DB\",\"Chill Crook\":\"DB\",\"Jiggy Grifter\":\"DB\",\"Beat Snatcher\":\"DB\",\"Sample Swindler\":\"DB\",\"Move Buster\":\"DB\",\"Jam Horker\":\"DB\",\"Groove Filcher\":\"DB\",\"Vibe Robber\":\"DB\",\"Boogie Brigand\":\"DB\",\"Flow Purloiner\":\"DB\",\"Jive Pillager\":\"DB\",\"Rhymer and Stealer\":\"DB\",\"Disco Bandit\":\"DB\"\n"+
"       },\n"+
"       signs : {\n"+
"           \"Mongoose\":\"Mus\",\"Wallaby\":\"Mus\",\"Vole\":\"Mus\",\n"+
"           \"Platypus\":\"Mys\",\"Opossum\":\"Mys\",\"Marmot\":\"Mys\",\n"+
"           \"Wombat\":\"Mox\",\"Blender\":\"Mox\",\"Packrat\":\"Mox\"\n"+
"       }\n"+
"   },\n"+
"   scripts : {\n"+
"       scriptHost : null,\n"+
"        scriptHostProd : \"http://kolscripts.googlecode.com/svn/trunk/tard/\",\n"+
"       \n"+
// [clump] comment out these pieces for now---seem to have vanished.
//"       compactModeFlatNav : \"compactModeFlatNav.js\",\n"+
"       choiceAdventures : \"*\",\n"+ //[clump] embedded
//"       itemTools : \"itemTools.js\",\n"+
"       strangeLeaflet : \"*\",\n"+ //[clump] embedded
//"       petRack : \"petRack.js\",\n"+
//"       adventureTools : \"adventureTools.js\"\n"+
"\n"+
"   }\n"+
"});\n"+
"\n"+
"Object.extend(framework.view,{\n"+
"   templates : {\n"+
"       main : {\n"+
"           stylesheet : new Template('' +\n"+
"               'body {margin:0px;padding:0px;font-family:Arial,Verdana,Helvetica;}' +\n"+
"               'table{border:0px;margin:0px;padding:0px;font-size:10px;font-weight:normal;}' +\n"+
"               'td,th {padding:2px;}' +\n"+
"               'th {font-size:11px;font-weight:bold;text-align:left;}' +\n"+
"               'table{border-collapse:collapse;}' +\n"+
"               'iframe {border:0px;}' +\n"+
"               'a {font-size:10px;color:#000;}' +\n"+
"               '.clearfix:after{content:\".\";display:block;height:0;clear:both;visibility:hidden;}' +\n"+
"       \n"+
"               '#menupane {width:#{menupaneW}px;height:#{menupaneH}px;}' +\n"+
"               '#charpane {width:#{charpaneW}px;height:#{charpaneH}px;}' +\n"+
"               '#chatpane {width:#{chatpaneW}px;height:#{chatpaneH}px;}' +\n"+
"               '.mainpane {width:#{mainpaneW}px;height:#{mainpaneH}px;}' +\n"+
"               \n"+
"               '.tabContainer{position:absolute;left:5000px;}' +\n"+
"               '.paneTools {display:none;padding:5px 0px 5px 10px;line-height:15px;#{paneToolsBackground}font-size:11px;border-bottom:#{paneToolsBorder};}' +\n"+
"               '#mainTools{display:block;}' +\n"+
"               \n"+
"               '#col1 {width:#{col1W}px;float:left;}' +\n"+
"               '#col2 {width:#{col2W}px;float:left;}' +\n"+
"               '#col3 {width:#{col3W}px;float:left;}' +\n"+
"               '#col4 {width:#{col4W}px;float:left;}' +\n"+
"       \n"+
"               '#menuResizer {height:#{menuResizerH}px;border-bottom:#{menuResizerBorder}cursor:n-resize;}' +\n"+
"               '#charResizer {width:#{charResizerW}px;border-right:#{charResizerBorder}cursor:w-resize;float:left;height:#{charResizerH}px;}' +\n"+
"               '#chatResizer {width:#{chatResizerW}px;border-left:#{chatResizerBorder}cursor:w-resize;float:left;height:#{chatResizerH}px;}' +\n"+
"               \n"+
"               '#tabNav {margin-top:2px;border-bottom:#{tabNavBorder};font-size:11px;}' +\n"+
"               '#tabNav ul {margin:0px 0px 0px 10px;padding:0px;list-style:none;height:19px;}' +\n"+
"               '#tabNav li {height:19px;float:left;cursor:pointer;}' +\n"+
"               '#tabNav li .tab{margin:0px 3px;padding:3px 12px;;height:12px;background:#ccc;border:#{tabNavLiTabBorder};font-weight:normal;}' +\n"+
"               '#tabNav li.active {cursor:default;}' +\n"+
"               '#tabNav li.active .tab {height:13px;#{tabNavLiActiveTabBackground}border-bottom:0px;font-weight:bold;}' +\n"+
"               '#tabNav li.rollover .tab {height:13px;#{tabNavLiActiveTabBackground}border-bottom:0px;}' +\n"+
"               '#tabNav li.blink .tab {height:13px;background:#DAAE81;border-bottom:0px;font-weight:bold;}' +\n"+
"       \n"+
"               '#advTools1{float:left;}' +\n"+
"               '#advTools2{float:right;padding-right:10px;}' +\n"+
"               '.mcdControl{font-size:10px;height:18px;width:40px;}' +\n"+
"                '.mallControl{font-size:10px;height:18px;width:130px;}' +\n"+
"               '#autoAttack{font-size:10px;height:18px;width:100px;}' +\n"+
"       \n"+
"               '#invTools ul {margin:0px;padding:0px;list-style:none;}' +\n"+
"               '#invTools li {float:left;margin-right:5px;}' +\n"+
"       \n"+
"               \n"+
"               '.layerTable {padding:0px;border:1px solid #000;position:absolute;top:0px;left:0px;width:350px;#{layerTableBackground}font-size:10px;}' +\n"+
"               '.layerTable table {width:350px;}' +\n"+
"               '.layerTable table tr.tr0 {background:#fcfcfc;}' +\n"+
"               '#moonInfo,#moonInfo table {width:300px;}' +\n"+
"               \n"+
"               '#advAgainLinks {float:left;padding-right:5px;}' +\n"+
"               '#lastAdv {float:left;}' +\n"+
"               '#lastAdv a {font-size:11px;}' +\n"+
"               '#advHistory {display:none;position:absolute;top:0px;left:0px;padding:0px 4px 4px 4px;#{advHistoryBackground}border:1px solid #000;border-top:0px;}' +\n"+
"               '#advHistory a{font-size:11px;line-height:14px;}' +\n"+
"               \n"+
"               '#tinySkillPaneContainer {margin-top:5px;}' +\n"+
"               '#tinySkillPane {width:99%;height:24px;}' +\n"+
"               \n"+
"               '.MusSignTools,.MysSignTools,.MoxSignTools,.MoxClassTools,.ATClassTools {display:none;}' +\n"+
"       \n"+
"               '#msgLog{margin:10px 10px 0px 0px;font-size:12px;overflow:auto;max-height:65px;line-height:13px;}' +\n"+
"               '#msgLog a{font-size:12px;}' +\n"+
"\n"+
"               '#configPanel {position:absolute;top:10px;left:10px;width:700px;height:550px;background-color:#fff;border:4px solid blue;overflow:auto;}' +\n"+
"\n"+
"               '#configPanel h1{font-size:14px;margin:5px 0px 5px 5px;padding:0px;}' +\n"+
"               '#configPanel ul {margin:0px 0px 0px 10px;padding:0px;}' +\n"+
"               '#configPanel #tabNav {margin-top:2px;border-bottom:1px solid #aaa;font-size:11px;}' +\n"+
"               '#configPanel #tabNav ul {margin:0px 0px 0px 5px;list-style:none;height:19px;}' +\n"+
"               '#configPanel #tabNav li {height:19px;float:left;cursor:pointer;}' +\n"+
"               '#configPanel #tabNav li .tab{margin:0px 2px;padding:3px 12px;height:12px;background:#ccc;border:1px solid #aaa;font-weight:normal;}' +\n"+
"               '#configPanel #tabNav li.active {cursor:default;}' +\n"+
"               '#configPanel #tabNav li.active .tab {height:13px;background:#fff;border-bottom:0px;font-weight:bold;}' +\n"+
"               '#configPanel #tabNav li.blink .tab {height:13px;background:#DAAE81;border-bottom:0px;font-weight:bold;}' +\n"+
"               '#configPanel select,input {font-size:11px;}' +\n"+
"       \n"+
"               '#configPanel .menuOptions {list-style:none;}' +\n"+
"               '#configPanel .menuOptions select {font-size:12px;}' +\n"+
"               '#configPanel .menuOptions input {font-size:12px;}' +\n"+
"               '#configPanel .menuOptions label {padding-left:5px;}' +\n"+
"               \n"+
"               '#configPanel label.tabAL {margin-right:10px;}' +\n"+
"               \n"+
"               '#configPanel .tabContainer{position:static;display:none;font-size:12px;padding:10px;}' +\n"+
"               '#configPanel #frameworkConfigPanelContainer{display:block;}' +\n"+
"               '#configPanel #configPanelHeader {float:left;width:400px;}' +\n"+
"               '#configPanel #configPanelCloseButton {float:right;padding:10px 10px 0px;}' +\n"+
"               '#configPanel #configPanelInfo {padding:25px 15px 15px 15px;font-size:10px;border-top:1px solid #ccc;}' +\n"+
"               \n"+
"               '#configPanel .sectionHeader {font-weight:bold;margin:15px 0px 0px 0px;background:blue;padding:3px 3px 3px 10px;color:white;}' +\n"+
"               '#configPanel .sectionContainer {padding:10px;border:1px solid blue;border-top:0px;}' +\n"+
"               '#configPanel .subSectionHeader {font-weight:bold;background-color:#ececec;padding:3px 3px 3px 10px;}' +\n"+
"               '#configPanel .firstSectionHeader {margin-top:0px;}' +\n"+
"               \n"+
"               '#effdiv {background-color:#fff;position:absolute;top:35px;left:0px;}' +\n"+
"               \n"+
"               '#chatCommand {position:absolute;top:5px;left:5px;}' + \n"+
"               '#chatCommandInput {display:none;width:140px;}' + \n"+
"\n"+
"           ''),\n"+
"           \n"+
"           framework : new Template('' +\n"+
"               '<div id=\"KoLFramework\" class=\"clearfix\">' + \n"+
"                   '<div id=\"col1\">' +\n"+
"                       '<div id=\"row1\">' +\n"+
"                           '<iframe class=\"menupane\" src=\"#{menupaneSrc}\" id=\"menupane\" name=\"menupane\" onload=\"framework.controller.handlers.menuPaneFunctions()\"></iframe>' +\n"+
"                           '<div id=\"menuResizer\"></div>' +\n"+
"                       '</div>' +\n"+
"                       '<div id=\"row2\" class=\"clearfix\">' +\n"+
"                           '<div id=\"col3\">' +\n"+
"                               '<iframe class=\"charpane\" src=\"charpane.php\" id=\"charpane\" name=\"charpane\" onload=\"framework.controller.handlers.charPaneFunctions()\"></iframe>' +\n"+
"                           '</div>' +\n"+
"                           '<div id=\"charResizer\"></div>' +\n"+
"                           '<div id=\"col4\">' +\n"+
"                               '<div id=\"tabNav\">' +\n"+
"                                   '<ul class=\"clearfix\">' +\n"+
"                                       '<li id=\"mainTab\" class=\"active\" onclick=\"framework.controller.handlers.setTab(\\'main\\');\"><div class=\"tab\">Adventure</div></li>' +\n"+
"                                       '<li id=\"invTab\" #{invTabInteraction}><div class=\"tab\">Inventory</div></li>' +\n"+
"                                       '<li id=\"storeTab\" #{storeTabInteraction}><div class=\"tab\">Stores</div></li>' +\n"+
"                                       '<li id=\"skillTab\" onclick=\"framework.controller.handlers.setTab(\\'skill\\');\"><div class=\"tab\">Skills</div></li>' +\n"+
"                                       '<li id=\"mallTab\" onclick=\"framework.controller.handlers.setTab(\\'mall\\');\" ><div class=\"tab\">Mall</div></li>' +\n"+
"                                       '#{chatTab}' +\n"+
"                                       '<li id=\"msgTab\" onclick=\"framework.controller.handlers.setTab(\\'msg\\');\"><div class=\"tab\">Messages</div></li>' + \n"+
"                                       '#{customTabs}' +\n"+
"                                   '</ul>' +\n"+
"                               '</div>' +\n"+
"                               '<div id=\"toolsNav\">' +\n"+
"                                   '<div id=\"mainTools\" class=\"paneTools\">' +\n"+
"                                       '<div class=\"clearfix\">' +\n"+
"                                           '<div id=\"advTools1\" class=\"clearfix\">' +\n"+
"                                               '<div id=\"advAgainLinks\">' +\n"+
"                                                   '<a href=\"#\" target=\"mainpane\" onClick=\"framework.view.main.advAgain(\\'attack\\');return false;\">adv again</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                                   '<a href=\"#\" target=\"mainpane\" onClick=\"framework.view.main.advAgain(\\'useitem\\');return false;\">adv using item</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                                   '<a href=\"#\" target=\"mainpane\" onClick=\"framework.view.main.advAgain(\\'skill\\');return false;\">adv using skill</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                               '</div>' +\n"+
"\n"+
"                                               '<div id=\"lastAdv\"></div>' +\n"+
"                                           '</div>' +\n"+
"                                           '<div id=\"advTools2\">' +\n"+
"                                               'auto attack <select id=\"autoAttack\" onchange=\"framework.controller.handlers.setAA(this.value)\"></select>&nbsp;&nbsp;' +\n"+
"                                               '<span class=\"MysSignTools\">MCD <select class=\"mcdControl\" id=\"mcdControlMys\" onchange=\"framework.controller.handlers.setMCD(this.selectedIndex,\\'Mys\\')\"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option></select></span>' +\n"+
"                                               '<span class=\"MoxSignTools\">AOT5K <select class=\"mcdControl\" id=\"mcdControlMox\" onchange=\"framework.controller.handlers.setMCD(this.selectedIndex,\\'Mox\\')\"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select></span>' +\n"+
"                                               '<span class=\"MusSignTools\">Radio <select class=\"mcdControl\" id=\"mcdControlMus\" onchange=\"framework.controller.handlers.setMCD(this.selectedIndex,\\'Mus\\')\"><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select></span>' +\n"+
"                                           '</div>' +\n"+
"                                       '</div>' +\n"+
"                                       '#{tinySkill}' +\n"+
"                                   '</div>' +\n"+
"                                   '<div id=\"invTools\" class=\"paneTools\" onmouseover=\"framework.controller.handlers.tabToolsOver(\\'inv\\');\" onmouseout=\"framework.controller.handlers.tabToolsOut(\\'inv\\',this,event);\">' +\n"+
"                                       '<ul class=\"clearfix\">' +\n"+
"                                           '<li>inventory:</li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'inventory.php?which=1\\');return false;\">[consumables]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'inventory.php?which=2\\');return false;\">[equipment]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'inventory.php?which=3\\');return false;\">[misc]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'inventory.php?which=4\\');return false;\">[fav]</a></li>' +\n"+
"                                           '<li>&nbsp;&nbsp;storage:</li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'storage.php\\');return false;\">[hagnk]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'managecollection.php\\');return false;\">[display]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'closet.php\\');return false;\">[closet]</a></li>' +\n"+
"                                       '</ul>' +\n"+
"                                       '<ul class=\"clearfix\">' +\n"+
"                                           '<li>actions:</li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'sellstuff.php\\');return false;\">[sell]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\');framework.controller.handlers.goCombine();return false;\">[combine]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'cook.php\\');return false;\">[cook]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'cocktail.php\\');return false;\">[bartend]</a></li>' +\n"+
"                                           '<li class=\"MoxClassTools\"><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'guild.php?place=still\\');return false;\">[still]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'smith.php\\');return false;\">[smith]</a></li>' +\n"+
"                                           '<li class=\"MysSignTools\"><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'jewelry.php\\');return false;\">[jewelry]</a></li>' +\n"+
"                                           '<li class=\"MoxSignTools\"><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'gnomes.php?place=tinker\\');return false;\">[supertinker]</a></li>' +\n"+
"                                           '<li class=\"MusSignTools\"><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'knoll.php?place=smith\\');return false;\">[innabox]</a></li>' +\n"+
"                                           '<li class=\"MusSignTools\"><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'knoll_mushrooms.php\\');return false;\">[mushrooms]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'multiuse.php\\');return false;\">[use multi]</a></li>' +\n"+
"                                           '<li>&nbsp;&nbsp;&nbsp;discoveries:</li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'craft.php?mode=discoveries&what=combine\\');return false;\">[meat pastables]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'craft.php?mode=discoveries&what=cook\\');return false;\">[foods]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'craft.php?mode=discoveries&what=smith\\');return false;\">[arms & armor]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'craft.php?mode=discoveries&what=cocktail\\');return false;\">[booze]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'craft.php?mode=discoveries&what=jewelry\\');return false;\">[jewelry]</a></li>' +\n"+
"                                           '<li><a target=\"invpane\" href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'inv\\',\\'craft.php?mode=discoveries&what=multi\\');return false;\">[miscellaneous]</a></li>' +\n"+
"                                       '</ul>' +\n"+
"                                   '</div>' +\n"+
"                                   '<div id=\"storeTools\" class=\"paneTools\" onmouseover=\"framework.controller.handlers.tabToolsOver(\\'store\\');\" onmouseout=\"framework.controller.handlers.tabToolsOut(\\'store\\',this,event);\">' +\n"+
"                                       '<span style=\"font-size:10px;\">town stores:</span>&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'town_market.php\\');return false;\" target=\"storepane\">market square</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=m\\');return false;\" target=\"storepane\">demon market</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=s\\');return false;\" target=\"storepane\">meatsmith</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'galaktik.php\\');return false;\" target=\"storepane\">doc\\'s</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'guild.php?place=trainer\\');return false;\" target=\"storepane\">guild trainer</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\');framework.controller.handlers.goGuildStore();return false;\" target=\"storepane\">guild store</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<span class=\"ATClassTools\"><a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=2\\');return false;\" target=\"storepane\">mys store</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=3\\');return false;\" target=\"storepane\">mus store</a></span>' +\n"+
"                                       '<br/>' +\n"+
"                                       '<span style=\"font-size:10px;\">other stores:</span>&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=h\\');return false;\" target=\"storepane\">hippy store</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=g\\');return false;\" target=\"storepane\">knob lab</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'mystic.php\\');return false;\" target=\"storepane\">mystic shed</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'hermit.php\\');return false;\" target=\"storepane\">the hermitage</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<span class=\"MoxSignTools\">' +\n"+
"                                           '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'gnomes.php?place=skills\\');return false;\" target=\"storepane\">gnome skills</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'cafe.php?cafeid=2\\');return false;\" target=\"storepane\">gnomish brewery</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=n\\');return false;\" target=\"storepane\">gno-mart</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '</span>' +\n"+
"                                       '<span class=\"MysSignTools\">' +\n"+
"                                           '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=j\\');return false;\" target=\"storepane\">jewelers</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'cafe.php?cafeid=1\\');return false;\" target=\"storepane\">chez snootee</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '</span>' +\n"+
"                                       '<span class=\"MusSignTools\">' +\n"+
"                                           '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=5\\');return false;\" target=\"storepane\">degrassi general</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=4\\');return false;\" target=\"storepane\">degrassi bakery</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '</span>' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'store.php?whichstore=w\\');return false;\" target=\"storepane\">white citadel</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                   '</div>' +\n"+
"                                   '<div id=\"skillTools\" class=\"paneTools\">' +\n"+
"                                       '<a href=\"skills.php\" target=\"skillpane\">use skills</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                   '</div>' +\n"+
"                                   '<div id=\"mallTools\" class=\"paneTools\">' +\n"+
"                                       '<div class=\"clearfix\">' +\n"+
"                                           '<div style=\"float:left;padding-right:15px;\"><a href=\"managestore.php\" target=\"mallpane\">manage your store</a></div>' +\n"+
"                                            '<form name=\"searchform\" id=\"searchform\" action=\"searchmall.php\" target=\"mallpane\" method=\"post\" style=\"margin:0px;\">' +\n"+
"                                               '<div style=\"float:left;border-left:1px dotted #aaa;padding-left:10px;text-align:right;\">Search for an item: <input name=\"didadv\" value=\"0\" type=\"hidden\"><input class=\"text\" name=\"pudnuggler\" id=\"pudnuggler\" value=\"\" size=\"30\" type=\"text\"> in <select name=\"category\" id=\"category\" class=\"mallControl\"> <option selected=\"selected\" value=\"allitems\">All Categories</option><optgroup label=\"Consumables\"><option value=\"food\">Food and Beverages</option><option value=\"booze\">Booze</option><option value=\"othercon\">Other Consumables</option></optgroup><optgroup label=\"Equipment\"><option value=\"weapons\">Weapons</option><option value=\"hats\">Hats</option><option value=\"shirts\">Shirts</option><option value=\"pants\">Pants</option><option value=\"acc\">Accessories</option><option value=\"offhand\">Off-hand Items</option><option value=\"famequip\">Familiar Equipment</option></optgroup><optgroup label=\"Usable\"><option value=\"combat\">Combat Items</option><option value=\"potions\">Potions</option><option value=\"hprestore\">HP Restorers</option><option value=\"mprestore\">MP Restorers</option><option value=\"familiars\">Familiars</option></optgroup></select><br/>(show only the cheapest <input name=\"x_cheapest\" size=\"2\" class=\"text\" value=\"5\" type=\"text\"> price(s))</div>' +\n"+
"                                                '<div style=\"float:left;margin-left:2px;\"><input class=\"button\" value=\"Search\" type=\"submit\"></div>' +\n"+
"                                            '</form>' +\n"+
"                                       '</div>' +\n"+
"                                   '</div>' +\n"+
"                                   '<div id=\"chat2Tools\" class=\"paneTools\">' +\n"+
"                                       '<a href=\"lchat.php\" target=\"chat2pane\">enter chat</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"chatlaunch.php\"  target=\"chat2pane\">leave chat</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"account_chatcolors.php\"  target=\"mainpane\">manage chat colors</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"account_macros.php\"  target=\"mainpane\">manage chat macros</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '<a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'msg\\',\\'makeoffer.php\\');return false;\" >propose or accept trade</a>' +\n"+
"                                   '</div>' +\n"+
"                                   '<div id=\"msgTools\" class=\"paneTools\">' +\n"+
"                                       '<div>' +\n"+
"                                           '<a href=\"messages.php?box=inbox\" target=\"msgpane\">inbox</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"account_contactlist.php\"  target=\"msgpane\">manage contacts</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"searchplayer.php\"  target=\"msgpane\">search players</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"town_sendgift.php\"  target=\"msgpane\">send a gift</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"questlog.php?which=4\"  target=\"msgpane\">notes</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                           '<a href=\"#\" onclick=\"$(\\'msgLog\\').update();return false;\" target=\"msgpane\">clear event log</a>&nbsp;&nbsp;&nbsp;' +\n"+
"                                       '</div>' +\n"+
"                                       '<div id=\"msgLog\"></div>' +\n"+
"                                   '</div>' +\n"+
"                                   '#{ctabTools}' +\n"+
"                               '</div>' + \n"+
"                               '<div id=\"tabContainerPositioner\"></div>' +\n"+
"                               '<div id=\"mainContainer\" class=\"tabContainer\">' +\n"+
"                                   '<iframe class=\"mainpane\" src=\"main.php\" id=\"mainpane\" name=\"mainpane\" onload=\"framework.controller.handlers.mainPaneFunctions()\"></iframe>' +\n"+
"                               '</div>' +\n"+
"                               '<div id=\"invContainer\" class=\"tabContainer\">' +\n"+
"                                   '<iframe class=\"mainpane\" src=\"#\" id=\"invpane\" name=\"invpane\" onload=\"framework.controller.handlers.invPaneFunctions()\"></iframe>' +\n"+
"                               '</div>' +\n"+
"                               '<div id=\"storeContainer\" class=\"tabContainer\">' +\n"+
"                                   '<iframe class=\"mainpane\" src=\"#\" id=\"storepane\" name=\"storepane\" onload=\"framework.controller.handlers.storePaneFunctions()\"></iframe>' +\n"+
"                               '</div>' +\n"+
"                               '<div id=\"skillContainer\" class=\"tabContainer\">' +\n"+
"                                   '<iframe class=\"mainpane\" src=\"#\" id=\"skillpane\" name=\"skillpane\" onload=\"framework.controller.handlers.skillPaneFunctions()\"></iframe>' +\n"+
"                               '</div>' +\n"+
"                               '<div id=\"mallContainer\" class=\"tabContainer\">' +\n"+
"                                   '<iframe class=\"mainpane\" src=\"#\" id=\"mallpane\" name=\"mallpane\" onload=\"framework.controller.handlers.mallPaneFunctions()\"></iframe>' +\n"+
"                               '</div>' +\n"+
"                               '<div id=\"chat2Container\" class=\"tabContainer\">' +\n"+
"                                   '<iframe class=\"mainpane\" src=\"chatlaunch.php\" id=\"chat2pane\" name=\"chat2pane\" onload=\"framework.controller.handlers.chat2PaneFunctions()\"></iframe>' +\n"+
"                               '</div>' +\n"+
"                               '<div id=\"msgContainer\" class=\"tabContainer\">' +\n"+
"                                   '<iframe class=\"mainpane\" src=\"#\" id=\"msgpane\" name=\"msgpane\" onload=\"framework.controller.handlers.msgPaneFunctions()\"></iframe>' +\n"+
"                               '</div>' +\n"+
"                               '#{ctabContainers}' +\n"+
"                           '</div>' +\n"+
"                       '</div>' +\n"+
"                   '</div>' +\n"+
"                   '<div id=\"chatResizer\"></div>' +\n"+
"                   '<div id=\"col2\">' +\n"+
"                       '<iframe class=\"mainpane\" src=\"chatlaunch.php\" id=\"chatpane\" name=\"chatpane\" onload=\"framework.controller.handlers.chatPaneFunctions();\"></iframe>' +\n"+
"                   '</div>' +\n"+
"               '</div>' +\n"+
"               '<div id=\"moonInfo\" class=\"layerTable\" style=\"display:none;\"></div>' +\n"+
"               '<div id=\"advHistory\" onMouseout=\"framework.view.main.hideAdvHistory();\" onMouseover=\"clearTimeout(framework.controller.timers.advHistoryTimer)\"></div>' +\n"+
"               '<div id=\"effdiv\" style=\"display:none;\" onclick=\"this.style.display=\\'none\\';\"></div>' +\n"+
"               '<div id=\"chatCommand\"><form onsubmit=\"framework.controller.handlers.submitChatCommandForm();return false;\"><input type=\"text\" id=\"chatCommandInput\" onblur=\"this.style.display=\\'none\\'\"/></form></div>' +\n"+
"\n"+
"               // Tard's Framework Script Configuration Panel\n"+
"               '<div id=\"configPanel\" style=\"display:none;\">' +\n"+
"                   '<div class=\"clearfix\">' +\n"+
"                       '<h1 id=\"configPanelHeader\">Tard\\'s Framework Script Configuration Panel</h1>' +\n"+
"                       '<div id=\"configPanelCloseButton\"><a href=\"#\" onclick=\"framework.controller.handlers.closeConfigPanel();return false;\">close</a></div>' +\n"+
"                   '</div>' +\n"+
"                   '<div id=\"tabNav\">' +\n"+
"                       '<ul id=\"configPanelTabs\" class=\"clearfix\">' +\n"+
"                           '<li id=\"frameworkConfigPanelTab\" class=\"active\" onclick=\"framework.controller.handlers.setConfigPanelTab(\\'framework\\');\"><div class=\"tab\">Framework Config</div></li>' +\n"+
"                       '</ul>' +\n"+
"                   '</div>' +\n"+
"                   '<div id=\"configPanelContainers\">' +\n"+
"                       '<div id=\"frameworkConfigPanelContainer\" class=\"tabContainer\">' +\n"+
"                           '<p class=\"sectionHeader firstSectionHeader\">Optional Features</p>' +\n"+
"                           '<div class=\"sectionContainer\">' +\n"+
"                               '<p style=\"padding:0px;margin:5px 0px;\">Click on the checkbox corresponding to the additional feature you want to enable.  Click \\'save\\' to save your settings.</p>' +\n"+
"                               '<input type=\"checkbox\" class=\"optionalFeatures\" id=\"compactModeFlatNav\"/>&#160;&#160;<label for=\"compactModeFlatNav\">Compact Mode Flat Navigation (broken)</label><br/>' +\n"+
"                               '<input type=\"checkbox\" class=\"optionalFeatures\" id=\"choiceAdventures\"/>&#160;&#160;<label for=\"choiceAdventures\">Choice Adventures</label><br/>' +\n"+
"                               '<input type=\"checkbox\" class=\"optionalFeatures\" id=\"itemTools\"/>&#160;&#160;<label for=\"itemTools\">Item Tools (broken)</label><br/>' +\n"+
"                               '<input type=\"checkbox\" class=\"optionalFeatures\" id=\"strangeLeaflet\"/>&#160;&#160;<label for=\"strangeLeaflet\">Strange Leaflet Spoiler</label><br/>' +\n"+
"                               '<input type=\"checkbox\" class=\"optionalFeatures\" id=\"petRack\"/>&#160;&#160;<label for=\"petRack\">Pet Rack (broken)</label><br/>' +\n"+
"                               '<input type=\"checkbox\" class=\"optionalFeatures\" id=\"adventureTools\"/>&#160;&#160;<label for=\"adventureTools\">Adventure Tools (broken)</label><br/>' +\n"+
"                               '<input type=\"button\" style=\"margin-top:10px;\" value=\"Save Optional Features\" onclick=\"framework.controller.handlers.setOptionalFeatures();return false;\"/>' +\n"+
"                           '</div>' +\n"+
"   \n"+
"                           '<p class=\"sectionHeader\">Quick Skills Options</p>' +\n"+
"                           '<div class=\"sectionContainer\">' +\n"+
"                               '<input type=\"checkbox\" id=\"quickSkillDisplayAdv\" style=\"\" value=\"1\"/><label for=\"quickSkillDisplayAdv\" class=\"\">Enable Adventure Tab Quick Skill Tool</label><br/><br/>' +\n"+
"                               'NOTE: If you enable this, Quick Skills will not display in your Menu pane regardless of whether you have the option enabled in your Account Menu > Skill Options.<br/>' +\n"+
"                               '<br/><input type=\"button\" value=\"Save Quick Skill Preferences\" onclick=\"framework.controller.handlers.setQuickSkillPref();return false;\"/>' +\n"+
"                           '</div>' +\n"+
"               \n"+
"                           '<p class=\"sectionHeader\">Tab Settings</p>' +\n"+
"                           '<div class=\"sectionContainer\">' +\n"+
"                               '<div class=\"subSectionHeader\">Custom Tabs</div>' +\n"+
"                               '<p style=\"padding:5px 0px;\">Click on the checkbox to activate a new custom tab.  Enter the display name of the tab.  Pick the page you want the tab to load when you click on it.  Hit the Save button.  You can enable up to 3 custom tabs with a variety of links to choose from.  Use the Compact Flat Nav Script to customize it even further.</p>' +\n"+
"                               '<input type=\"checkbox\" id=\"ctabChatEnable\" onclick=\"framework.controller.handlers.toggleCTab(\\'Chat\\')\"/>&#160;&#160;<label for=\"ctabChatEnable\">Enable Chat Tab?</label><br/>' +\n"+
"                               '#{customTabConfig}' +\n"+
"                               '<input id=\"ctabSave\" type=\"button\" value=\"Save Your Custom Tab Settings\" style=\"margin-top:10px;\" onclick=\"framework.controller.handlers.setCustomTabs();return false;\"/><br/><br/>' +\n"+
"\n"+
"                               '<div class=\"subSectionHeader\">Tab Autoload</div>' +\n"+
"                               '<p style=\"padding:5px 0px;\">Check the tabs that you want to autoloading enabled:</p>' +\n"+
"                               '<input type=\"checkbox\" id=\"invAL\" style=\"\" /><label for=\"invAL\" class=\"tabAL\">Inventory</label>' +\n"+
"                               '<input type=\"checkbox\" id=\"skillsAL\" style=\"\" /><label for=\"skillsAL\" class=\"tabAL\">Skills</label>' +\n"+
"                               '<input type=\"checkbox\" id=\"chatAL\" style=\"\" /><label for=\"chatAL\" class=\"tabAL\">Chat</label>' +\n"+
"                               '<input type=\"checkbox\" id=\"msgAL\" style=\"\" /><label for=\"msgAL\" class=\"tabAL\">Messages</label><br/>' +\n"+
"                               '<input type=\"checkbox\" id=\"c1AL\" style=\"\" /><label for=\"c1AL\" class=\"tabAL\">Custom Tab 1</label>' +\n"+
"                               '<input type=\"checkbox\" id=\"c2AL\" style=\"\" /><label for=\"c2AL\" class=\"tabAL\">Custom Tab 2</label>' +\n"+
"                               '<input type=\"checkbox\" id=\"c3AL\" style=\"\" /><label for=\"c3AL\" class=\"tabAL\">Custom Tab 3</label>' +\n"+
"                               '<br/><input type=\"button\" value=\"Save Autoload Options\" onclick=\"framework.controller.handlers.setAutoLoad();return false;\"/><br/><br/>' +\n"+
"\n"+
"                               '<div class=\"subSectionHeader\">Tab Interaction</div>' +\n"+
"                               '<p style=\"padding:5px 0px;\">You can access tab links without loading the tab itself by rolling over or clicking on the tab.  Or you can disable this completely.  Select your preference below.  NOTE: This only applies to the Inventory and Store tabs.</p>' +\n"+
"                               '<select id=\"tabInteractionSelect\">' +\n"+
"                                   '<option value=\"0\">Disabled</option>' +\n"+
"                                   '<option value=\"1\">Left Click</option>' +\n"+
"                                   '<option value=\"2\">Rollover</option>' +\n"+
"                               '</select> ' +\n"+
"                               '&nbsp; <input type=\"button\" value=\"Save Tab Interaction Setting\" onclick=\"framework.controller.handlers.setTabInteraction();return false;\"/>' +\n"+
"                           '</div>' +\n"+
"               \n"+
"                           '<p class=\"sectionHeader\">Interface Tools</p>' +\n"+
"                           '<div class=\"sectionContainer\">' +\n"+
"                               'Reset frame sizes to the default values.<br/>' +\n"+
"                               '<input type=\"button\" style=\"margin-right:5px;\" value=\"Reset Frame Sizes\" onclick=\"framework.controller.utils.setCookieVar(\\'tardFramework\\',\\'menuH\\',\\'\\');framework.controller.utils.setCookieVar(\\'tardFramework\\',\\'charW\\',\\'\\');framework.controller.utils.setCookieVar(\\'tardFramework\\',\\'chatW\\',\\'\\');window.location.reload();return false;\"/><br/><br/>' +\n"+
"                               'Close the right most chat pane.<br/>' +\n"+
"                               '<input type=\"button\" style=\"\" value=\"Close Chat Pane\" onclick=\"framework.controller.utils.setCookieVar(\\'tardFramework\\',\\'chatW\\',\\'0\\');window.location.reload();return false;\"/><br/><br/>' +\n"+
"                               'Backup Framework settings to Notes.<br/>' +\n"+
"                               '<input type=\"button\" style=\"\" value=\"Backup Settings to Notes\" onclick=\"framework.controller.saveCookiesToNotes();return false;\"/><br/><br/>' +\n"+
"                               'Restore Framework settings from Notes.<br/>' +\n"+
"                               '<input type=\"button\" style=\"\" value=\"Restore Settings from Notes\" onclick=\"framework.controller.restoreCookiesFromNotes();return false;\"/><br/><br/>' +\n"+
"                               'Reset all Framework cookies.<br/>' +\n"+
"                               '<input type=\"button\" style=\"\" value=\"Reset Your Cookie\" onclick=\"framework.controller.utils.clearAllCookies();return false;\"/><br/>' +\n"+
"                               '<span style=\"color:red;font-size:10px;text-decoration:italic;\">** Warning: This will remove ALL your custom settings across all your characters.</span>' +\n"+
"                           '</div>' +\n"+
"                       '</div>' +\n"+
"                   '</div>' +\n"+
"                   '<div id=\"configPanelInfo\">' +\n"+
"                       'If you\\'re experiencing technical difficulties:<br/>' +\n"+
"                       '<ul>' +\n"+
"                           '<li>Go to <a href=\"http://web.archive.org/web/20080624082434/kol.dashida.com/\" target=\"_new\">my site</a> and check the Known Issues & Bugs page or</li>' +\n"+
"                           '<li>Visit the my <a href=\"http://forums.kingdomofloathing.com/vb/showthread.php?t=161084\" target=\"_new\">forum thread</a> or</li>' +\n"+
"                           '<li>Send me a <a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'msg\\',\\'sendmessage.php?toid=22680\\');framework.controller.handlers.closeConfigPanel();return false;\">KMail</a>.</li>' +\n"+
"                       '</ul>' +\n"+
"                       '<br><br>If you like my scripts, you can <a href=\"#\" onclick=\"framework.controller.handlers.setTab(\\'store\\',\\'town_sendgift.php?towho=22680\\');framework.controller.handlers.closeConfigPanel();return false;\">send me a token of your appreciation</a>.' +\n"+
"                   '</div>' +\n"+
"               '</div>' +\n"+
"           ''),\n"+
"           \n"+
"           customTabConfig : new Template('' +\n"+
"               '<input type=\"checkbox\" id=\"ctab#{i}Enable\" onclick=\"framework.controller.handlers.toggleCTab(#{i})\"/>&#160;&#160;' +\n"+
"               '<label for=\"ctab#{i}Name\">Tab Name: </label><input id=\"ctab#{i}Name\" name=\"ctab#{i}Name\" type=\"text\" style=\"width:100px;margin-right:10px;\"/>' +\n"+
"               '<label for=\"ctab#{i}Link\">Tab Opens: </label><select id=\"ctab#{i}Link\">' +\n"+
"                   '<option value=\"main.php\">main map</option>' +\n"+
"                   '<option value=\"charsheet.php\">character sheet</option>' +\n"+
"                   '<option value=\"inventory.php?which=1\">inventory (consumables)</option>' +\n"+
"                   '<option value=\"inventory.php?which=2\">inventory (equipment)</option>' +\n"+
"                   '<option value=\"inventory.php?which=3\">inventory (misc)</option>' +\n"+
"                   '<option value=\"inventory.php?which=4\">inventory (fav)</option>' +\n"+
"                   '<option value=\"clan_hall.php\">clan</option>' +\n"+
"                   '<option value=\"clan_stash.php\">clan - stash</option>' +\n"+
"                   '<option value=\"clan_board.php\">clan - message board</option>' +\n"+
"                   '<option value=\"clan_log.php\">clan - log</option>' +\n"+
"                   '<option value=\"account.php\">account</option>' +\n"+
"                   '<option value=\"town.php\">town</option>' +\n"+
"                   '<option value=\"campground.php\">campground</option>' +\n"+
"                   '<option value=\"town_wrong.php?place=crackpot\">crackpot mystics shed</option>' +\n"+
"                   '<option value=\"casino.php\">casino</option>' +\n"+
"                   '<option value=\"bhh.php\">bounty hunters shack</option>' +\n"+
"                   '<option value=\"town_right.php?place=untinker\">untinkers cottage</option>' +\n"+
"                   '<option value=\"storage.php\">hagnk</option>' +\n"+
"                   '<option value=\"town_right.php?place=gourd\">gourd tower</option>' +\n"+
"                   '<option value=\"dungeons.php\">dungeon full of dungeons</option>' +\n"+
"                   '<option value=\"council.php\">council of loathing</option>' +\n"+
"                   '<option value=\"store.php?whichstore=b\">bugbear bakery</option>' +\n"+
"                   '<option value=\"store.php?whichstore=z\">armory & leggery</option>' +\n"+
"                   '<option value=\"familiar.php\">familiars</option>' +\n"+
"                   '<option value=\"lair.php\">naughty sorceress tower</option>' +\n"+
"                   '<option value=\"hermit.php\">the hermitage</option>' +\n"+
"                   '<option value=\"raffle.php\">raffle house</option>' +\n"+
"                   '<option value=\"manor.php\">spookyraven manor</option>' +\n"+
"               '</select><br/>' +\n"+
"           ''),\n"+
"           \n"+
"           tinySkill : new Template('' + \n"+
"               '<div id=\"tinySkillPaneContainer\">' +\n"+
"                   '<iframe id=\"tinySkillPane\" name=\"tinySkillPane\" style=\"#{iframeStyle}\" src=\"#{src}\" onload=\"framework.controller.handlers.tinySkillPaneFunctions()\"></iframe>' +\n"+
"               '</div>' + \n"+
"           ''),\n"+
"           \n"+
"           tabInteraction0 : new Template('onclick=\"framework.controller.handlers.setTab(\\'#{tab}\\');\"'),\n"+
"           tabInteraction1 : new Template('onclick=\"framework.controller.handlers.tabOver(\\'#{tab}\\');\" onmouseout=\"framework.controller.handlers.tabOut(\\'#{tab}\\');\"'),\n"+
"           tabInteraction2 : new Template('onclick=\"framework.controller.handlers.setTab(\\'#{tab}\\');\" onmouseover=\"framework.controller.handlers.tabOver(\\'#{tab}\\');\" onmouseout=\"framework.controller.handlers.tabOut(\\'#{tab}\\');\"')\n"+
"\n"+
"       }\n"+
"   },\n"+
"   \n"+
"   login : {\n"+
"       initializeLoginPage : function() {\n"+
"           var ptag = $$(\"p\");\n"+
"           var host = window.location.host;\n"+
"           \n"+
"           var newTR = new Element(\"tr\",{\n"+
"               style:\"text-align:center;\"\n"+
"           });\n"+
"           \n"+
"           var newTD1 = new Element(\"td\",{\n"+
"               style:\"text-align:right;\",\n"+
"               className : \"small\"\n"+
"           });\n"+
"           newTD1.update(\"Server:\");\n"+
"           \n"+
"           var newTD2 = new Element(\"td\",{\n"+
"               style:\"text-align:left\"\n"+
"           });\n"+
"           newTD2.update('<select onchange=\"document.Login.action=\\'http://www\\'+(this.selectedIndex+1)+\\'.kingdomofloathing.com/login.php\\';\" style=\"border:1px solid black;width:129px;font-size:13px;\">' +\n"+
"                   '<option value=\"\" ' + (host.indexOf(\"www.\") == 0 || host.indexOf(\"k\") == 0 ? \"selected\" : \"\" ) + '>www.kingdomofloathing.com</option>' +\n"+
"                   '<option value=\"2\" ' + (host.indexOf(\"www2.\") == 0 ? \"selected\" : \"\" ) + '>www2.kingdomofloathing.com</option>' +\n"+
"                   '<option value=\"3\" ' + (host.indexOf(\"www3.\") == 0 ? \"selected\" : \"\" ) + '>www3.kingdomofloathing.com</option>' +\n"+
"                   '<option value=\"4\" ' + (host.indexOf(\"www4.\") == 0 ? \"selected\" : \"\" ) + '>www4.kingdomofloathing.com</option>' +\n"+
"                   '<option value=\"5\" ' + (host.indexOf(\"www5.\") == 0 ? \"selected\" : \"\" ) + '>www5.kingdomofloathing.com</option>' +\n"+
"                   '<option value=\"6\" ' + (host.indexOf(\"www6.\") == 0 ? \"selected\" : \"\" ) + '>www6.kingdomofloathing.com</option>' +\n"+
"                   '<option value=\"7\" ' + (host.indexOf(\"www7.\") == 0 ? \"selected\" : \"\" ) + '>www7.kingdomofloathing.com</option>' +\n"+
"                   '</select>');\n"+
"\n"+
"           newTR.appendChild(newTD1);\n"+
"           newTR.appendChild(newTD2);\n"+
"\n"+
"           var bodyHTML = document.body.innerHTML;\n"+
"           if (bodyHTML.indexOf('Login failed.') != -1 || bodyHTML.indexOf('Not logged in.') != -1 || bodyHTML.indexOf('Invalid Session ID') != -1) {\n"+
"               ptag[2].parentNode.parentNode.parentNode.insertBefore(newTR,ptag[2].parentNode.parentNode);\n"+
"           }\n"+
"           else if($$('center')[0].innerHTML.indexOf('Too many login') == -1) {\n"+
"               ptag[0].parentNode.parentNode.parentNode.insertBefore(newTR,ptag[0].parentNode.parentNode);\n"+
"           }\n"+
"       }\n"+
"   },\n"+
"   \n"+
"   main : {\n"+
"       initializeMainPage : function() {\n"+
"           this.getUserPreferences();\n"+
"           this.setInterface();\n"+
"           this.setStylesheet();\n"+
"           this.setMainFramework();\n"+
"           this.initializeConfigPanel();\n"+
"           this.initUserData();\n"+
"           this.initHandlers();\n"+
"       },\n"+
"       \n"+
"       getUserPreferences : function() {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           var utils = framework.controller.utils;\n"+
"           interfaceData.isFullMode = "+String(notcompactmode)+";\n"+
"           if (interfaceData.isFullMode != undefined && eval(interfaceData.isFullMode) == "+String(notcompactmode)+") {\n"+
"               interfaceData.menuH = utils.getCookieVar(\"tardFramework\",\"menuH\"); if (interfaceData.menuH == \"\") interfaceData.menuH = undefined;\n"+
"               interfaceData.charW = utils.getCookieVar(\"tardFramework\",\"charW\"); if (interfaceData.charW == \"\") interfaceData.charW = undefined;\n"+
"               interfaceData.chatW = utils.getCookieVar(\"tardFramework\",\"chatW\"); if (interfaceData.chatW == \"\") interfaceData.chatW = undefined;\n"+
"           } else {\n"+
"               interfaceData.isFullMode = "+String(notcompactmode)+";\n"+
"               utils.setCookieVar(\"tardFramework\",\"isFullMode\",interfaceData.isFullMode);\n"+
"               utils.setCookieVar(\"tardFramework\",\"menuH\",\"\");\n"+
"               utils.setCookieVar(\"tardFramework\",\"charW\",\"\");\n"+
"               utils.setCookieVar(\"tardFramework\",\"chatW\",\"\");\n"+
"           }\n"+
"           \n"+
"           // init isTabChatActive\n"+
"           interfaceData.isTabChatActive = (utils.getCookieVar(\"tardFramework\",\"isTabChatActive\") == \"true\");\n"+
"           \n"+
"           // init customTabs\n"+
"           for (var i=1;i<=3;i++) {\n"+
"               var strName = utils.getCookieVar(\"tardFramework\",\"tab\"+i+\"Name\");\n"+
"               var strLink = utils.getCookieVar(\"tardFramework\",\"tab\"+i+\"Link\");\n"+
"               var isActive = utils.getCookieVar(\"tardFramework\",\"isTab\"+i+\"Active\");\n"+
"               interfaceData.customTabs.push({'name':strName,'link':strLink,'isActive':(isActive == \"true\")});\n"+
"               if (isActive == \"true\") framework.model.actions.tabs[\"ctab\"+i] = strLink;\n"+
"           }\n"+
"           \n"+
"           // init autoload\n"+
"           interfaceData.tabAutoLoad = utils.getCookieVar(\"tardFramework\",\"tabAL\");\n"+
"           \n"+
"           // init tab interaction\n"+
"           interfaceData.tabInteraction = utils.getCookieVar(\"tardFramework\",\"tabInter\");\n"+
"           if (interfaceData.tabInteraction == \"\") interfaceData.tabInteraction = 0;\n"+
"           interfaceData.tabInteraction = parseInt(interfaceData.tabInteraction);\n"+
"           \n"+
"           // init Quick Skill Pref\n"+
"           interfaceData.quickSkillPref = utils.getCookieVar(\"tardFramework\",\"QSPref\");\n"+
"           if (interfaceData.quickSkillPref == \"\") interfaceData.quickSkillPref = 0;\n"+
"           interfaceData.quickSkillPref = parseInt(interfaceData.quickSkillPref);\n"+
"       },\n"+
"       \n"+
"       initializeConfigPanel : function() {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           var utils = framework.controller.utils;\n"+
"\n"+
"           // Chat Tab\n"+
"           var oCheck = $(\"ctabChatEnable\");\n"+
"           oCheck.checked = (interfaceData.isTabChatActive == true);\n"+
"\n"+
"           // Custom Tabs\n"+
"           interfaceData.customTabs.each(function(ctab,i){\n"+
"               var j = i+1;\n"+
"               var oCheck = $(\"ctab\"+j+\"Enable\");\n"+
"               oCheck.checked = ctab.isActive;\n"+
"               $(\"ctab\"+j+\"Name\").value = ctab.name;\n"+
"               $(\"ctab\"+j+\"Link\").value = ctab.link;\n"+
"               framework.controller.handlers.toggleCTab(j);\n"+
"           });\n"+
"\n"+
"           // Auto Load\n"+
"           var strAL = interfaceData.tabAutoLoad;\n"+
"           if (strAL.indexOf(\"^\") != -1) {\n"+
"               $(\"invAL\").checked = (strAL.indexOf(\"inv,\") != -1);\n"+
"               $(\"skillsAL\").checked = (strAL.indexOf(\"skill,\") != -1);\n"+
"               $(\"chatAL\").checked = (strAL.indexOf(\"chat2,\") != -1);\n"+
"               $(\"msgAL\").checked = (strAL.indexOf(\"msg,\") != -1);\n"+
"               $(\"c1AL\").checked = (strAL.indexOf(\"ctab1,\") != -1);\n"+
"               $(\"c2AL\").checked = (strAL.indexOf(\"ctab2,\") != -1);\n"+
"               $(\"c3AL\").checked = (strAL.indexOf(\"ctab3,\") != -1);\n"+
"           } else {\n"+
"               $(\"invAL\").checked = true;\n"+
"               $(\"skillsAL\").checked = true;\n"+
"               $(\"msgAL\").checked = true;\n"+
"               $(\"c1AL\").checked = true;\n"+
"               $(\"c2AL\").checked = true;\n"+
"               $(\"c3AL\").checked = true;\n"+
"           }\n"+
"           \n"+
"           // Tab Interaction\n"+
"           $('tabInteractionSelect').selectedIndex = interfaceData.tabInteraction;\n"+
"           \n"+
"           \n"+
"           // Quick Skill Pref\n"+
"           $('quickSkillDisplayAdv').checked = (interfaceData.quickSkillPref);\n"+
"           \n"+
"           \n"+
"           // Optional Features\n"+
"           var features = $$('input.optionalFeatures');\n"+
"           featureIterator = function(feature) {\n"+
"               feature.checked = (utils.getCookieVar(\"tardFramework\",feature.id) == \"true\");\n"+
"           };\n"+
"           features.each(featureIterator);\n"+
"           \n"+
"       },\n"+
"\n"+
"       initUserData : function() {\n"+
"           framework.controller.getPlayerPwd();\n"+
"       },\n"+
"       \n"+
"       initHandlers : function() {\n"+
"           framework.controller.handlers.setDocumentHandlers();\n"+
"           framework.controller.handlers.setChatCommandHandlers();\n"+
"           new PeriodicalExecuter(framework.controller.checkResultsDisplay,0.5);\n"+
"       },\n"+
"\n"+
"       setInterface : function() {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           interfaceData.isFullMode = "+String(notcompactmode)+";\n"+
"           interfaceData.wW = window.innerWidth;\n"+
"           interfaceData.wH = window.innerHeight;\n"+
"           interfaceData.menuResizerH = 4;\n"+
"           interfaceData.charResizerW = 4;\n"+
"           interfaceData.chatResizerW = 4;\n"+
"           interfaceData.menuH = (interfaceData.menuH != undefined ? interfaceData.menuH : (!interfaceData.isFullMode ? 41 : 45) + interfaceData.menuResizerH);\n"+
"           interfaceData.charW = (interfaceData.charW != undefined ? interfaceData.charW : (!interfaceData.isFullMode ? 140 : 200));\n"+
"           interfaceData.chatW = (interfaceData.chatW != undefined ? interfaceData.chatW : 200);\n"+
"           interfaceData.menuW = interfaceData.wW - interfaceData.chatW - interfaceData.chatResizerW;\n"+
"           interfaceData.charH = interfaceData.wH - interfaceData.menuH;\n"+
"           interfaceData.mainW = interfaceData.wW - interfaceData.charW - interfaceData.chatW - interfaceData.chatResizerW - interfaceData.charResizerW;\n"+
"           interfaceData.mainH = interfaceData.wH - interfaceData.menuH;\n"+
"           interfaceData.strB = '1px solid #aaa;';\n"+
"           interfaceData.strB2 = '1px dashed #666;';\n"+
"           interfaceData.bkg = 'background:#ececec;';\n"+
"       },\n"+
"       \n"+
"       setStylesheet : function() {\n"+
"           var template = framework.view.templates.main.stylesheet;\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           var stylesheet = template.evaluate({\n"+
"               menupaneW : interfaceData.menuW,\n"+
"               menupaneH : Math.max(Number(interfaceData.menuH)-1,0),\n"+
"               charpaneW : Math.max(Number(interfaceData.charW)-1,0),\n"+
"               charpaneH : interfaceData.charH,\n"+
"               chatpaneW : Math.max(Number(interfaceData.chatW)-1,0),\n"+
"               chatpaneH : Math.max(Number(interfaceData.wW)-20,0),\n"+
"               mainpaneW : Math.max(Number(interfaceData.mainW)-1,0),\n"+
"               mainpaneH : interfaceData.mainH,\n"+
"               col1W : interfaceData.menuW,\n"+
"               col2W : Math.max(Number(interfaceData.chatW)-1,0),\n"+
"               col3W : Math.max(Number(interfaceData.charW)-1,0),\n"+
"               col4W : interfaceData.mainW,\n"+
"               menuResizerH : (Number(interfaceData.menuResizerH)-1),\n"+
"               menuResizerBorder : interfaceData.strB2,\n"+
"               charResizerW : (Number(interfaceData.charResizerW)-1),\n"+
"               charResizerH : interfaceData.mainH,\n"+
"               charResizerBorder : interfaceData.strB2,\n"+
"               chatResizerW : (Number(interfaceData.chatResizerW)-1),\n"+
"               chatResizerH : (interfaceData.mainH + interfaceData.menuH),\n"+
"               chatResizerBorder : interfaceData.strB2,\n"+
"               tabNavBorder : interfaceData.strB,\n"+
"               tabNavLiTabBorder : interfaceData.strB,\n"+
"               tabNavLiActiveTabBackground : interfaceData.bkg,\n"+
"               invToolsBackground : interfaceData.bkg,\n"+
"               paneToolsBackground : interfaceData.bkg,\n"+
"               paneToolsBorder : interfaceData.strB,\n"+
"               layerTableBackground : interfaceData.bkg,\n"+
"               advHistoryBackground : interfaceData.bkg,\n"+
"               monHistoryBackground : interfaceData.bkg\n"+
"           });\n"+
"           \n"+
"           framework.controller.utils.addStyle(stylesheet);\n"+
"       },\n"+
"       \n"+
"       setMainFramework : function() {\n"+
"           var template = framework.view.templates.main.framework;\n"+
"           var utils = framework.controller.utils;\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"\n"+
"           // Chat Tab\n"+
"           var chatTab = \"\";\n"+
"           if (interfaceData.isTabChatActive) {\n"+
"               chatTab +='<li id=\"chat2Tab\" onclick=\"framework.controller.handlers.setTab(\\'chat2\\');\"><div class=\"tab\">Chat</div></li>';\n"+
"           }\n"+
"           \n"+
"           // Custom Tabs\n"+
"           var customTabs = \"\";\n"+
"           var ctabContainers = \"\";\n"+
"           var ctabTools = \"\";\n"+
"           interfaceData.customTabs.each(function(ctab,i){\n"+
"               var j = i+1;\n"+
"               if (ctab.isActive) {\n"+
"                   customTabs +='<li id=\"ctab'+j+'Tab\" onclick=\"framework.controller.handlers.setTab(\\'ctab'+j+'\\');\"><div class=\"tab\">'+ctab.name+'</div></li>';\n"+
"                   ctabContainers +='' +\n"+
"                       '<div id=\"ctab'+j+'Container\" class=\"tabContainer\">' +\n"+
"                           '<iframe class=\"mainpane\" src=\"#\" id=\"ctab'+j+'pane\" name=\"ctab'+j+'pane\" onload=\"framework.controller.handlers.ctabPaneFunctions('+j+')\"></iframe>' +\n"+
"                       '</div>';\n"+
"                   ctabTools += '' +\n"+
"                           '<div id=\"ctab'+j+'Tools\" class=\"paneTools\">' +\n"+
"                               '<a href=\"'+ctab.link+'\" target=\"ctab'+j+'pane\">return to default page</a>' +\n"+
"                           '</div>';\n"+
"               }\n"+
"           });\n"+
"\n"+
"           // Custom Tab Config Panel\n"+
"           var customTabConfigHTML = \"\";\n"+
"           var customTabConfigTemplate = framework.view.templates.main.customTabConfig;\n"+
"           for (var i=1;i<=3;i++) {\n"+
"               customTabConfigHTML += customTabConfigTemplate.evaluate({\"i\":i});\n"+
"           }\n"+
"           \n"+
"           // Quick Skill Adventure Tool\n"+
"           var tinySkillHTML = \"\";\n"+
"           if (interfaceData.quickSkillPref == 1) {\n"+
"               tinySkillHTML = framework.view.templates.main.tinySkill.evaluate({\n"+
"                   iframeStyle : (interfaceData.isFullMode ? \"height:42px;\" : \"\"),\n"+
"                   src : framework.model.actions.tabs.tinyskill\n"+
"               });\n"+
"           }\n"+
"           \n"+
"           // Tab Interaction\n"+
"           var invTabInteraction = \"\";\n"+
"           var storeTabInteraction = \"\";\n"+
"           var tabInteractionSetting = interfaceData.tabInteraction;\n"+
"           if (tabInteractionSetting == 0) {\n"+
"               invTabInteraction = framework.view.templates.main.tabInteraction0.evaluate({'tab':'inv'});\n"+
"               storeTabInteraction = framework.view.templates.main.tabInteraction0.evaluate({'tab':'store'});\n"+
"           } else if (tabInteractionSetting == 1) {\n"+
"               invTabInteraction = framework.view.templates.main.tabInteraction1.evaluate({'tab':'inv'});\n"+
"               storeTabInteraction = framework.view.templates.main.tabInteraction1.evaluate({'tab':'store'});\n"+
"           } else if (tabInteractionSetting == 2) {\n"+
"               invTabInteraction = framework.view.templates.main.tabInteraction2.evaluate({'tab':'inv'});\n"+
"               storeTabInteraction = framework.view.templates.main.tabInteraction2.evaluate({'tab':'store'});\n"+
"           }\n"+
"           \n"+
"           var mainFramework = template.evaluate({\n"+
"               menupaneSrc : (!interfaceData.isFullMode ? \"compactmenu.php\" : \"topmenu.php\"),\n"+
"               chatTab : chatTab,\n"+
"               customTabs : customTabs,\n"+
"               ctabContainers : ctabContainers,\n"+
"               ctabTools : ctabTools,\n"+
"               customTabConfig : customTabConfigHTML,\n"+
"               tinySkill : tinySkillHTML,\n"+
"               invTabInteraction : invTabInteraction,\n"+
"               storeTabInteraction : storeTabInteraction\n"+
"           });\n"+
"           \n"+
"           var html = $$('html')[0];\n"+
"           var newBody = (new Element('body',{\n"+
"               style:\"height:\"+window.innerHeight+\";width:\"+window.innerWidth\n"+
"           })).update(mainFramework);\n"+
"           html.appendChild(newBody);\n"+
"           \n"+
"           framework.controller.setToolsMinHeight();\n"+
"           framework.controller.positionTabContainer(\"main\");\n"+
"           interfaceData.currentPane = window[interfaceData.currentTab+\"pane\"];\n"+
"       },\n"+
"       \n"+
"       updateAdvHistory : function() {\n"+
"           if (charpane && charpane.document) {\n"+
"               var interfaceData = framework.model.interfaceData;\n"+
"               if (interfaceData.isFullMode) {\n"+
"                   var bodyHTML = charpane.document.body.innerHTML;\n"+
"                   var i0 = bodyHTML.indexOf(\"Last Adventure\");\n"+
"                   var i1 = bodyHTML.indexOf('href=\"',i0);\n"+
"                   var i2  = bodyHTML.indexOf('\"',i1+6);\n"+
"                   var o0  = bodyHTML.indexOf(\"</a><br>\",i2);\n"+
"                   var o1 = bodyHTML.substring(i2,o0);\n"+
"                   var o2 = o1.replace('\">',\"\");\n"+
"                   var lastAdvText = \"Last Adventure: \" + o2;\n"+
"                   if (i1 != -1 && i2 != -1) {\n"+
"                       framework.model.userData.lastAdventure = bodyHTML.substring(i1+6,i2);\n"+
"                   }\n"+
"               } else {\n"+
"                   var aTags = charpane.document.getElementsByTagName(\"a\");\n"+
"                   var a;\n"+
"                   \n"+
"                   $A(aTags).each(function(aT) {\n"+
"                       if (aT.title && aT.title.indexOf(\"Last Adventure\") != -1) {\n"+
"                           a = aT;\n"+
"                           $break;\n"+
"                       }\n"+
"                   });\n"+
"                   \n"+
"                   if (a) {\n"+
"                       framework.model.userData.lastAdventure = a.href.replace(\"http://\"+location.host+\"/\",\"\");\n"+
"                       var lastAdvText = a.title;\n"+
"                   }\n"+
"               }\n"+
"               framework.view.main.addLastAdv(framework.model.userData.lastAdventure,lastAdvText);\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       addLastAdv : function(lastAdventure,lastAdvText) {\n"+
"           var advArray = framework.model.userData.advArray;\n"+
"           if (advArray.length > 0) {\n"+
"               if (advArray.length == 1 && lastAdventure != advArray[advArray.length-1].url) advArray.push({\"url\":lastAdventure,\"text\":lastAdvText});\n"+
"               if (advArray.length > 1) $(\"lastAdv\").update('<a href=\"#\" onclick=\"framework.view.main.showAdvHistory();return false;\"  onMouseout=\"framework.view.main.hideAdvHistory();\" onMouseover=\"clearTimeout(framework.controller.timers.advHistoryTimer)\">' + lastAdvText + '</a>');\n"+
"               if (lastAdventure != advArray[advArray.length-1].url) {\n"+
"                   advArray.each(function(adv,i){\n"+
"                       if (lastAdventure == adv.url) {advArray.splice(i,1);}\n"+
"                   });\n"+
"\n"+
"                   if (advArray.length > 5) advArray.shift();\n"+
"                   advArray.push({\"url\":lastAdventure,\"text\":lastAdvText});\n"+
"               }\n"+
"           } else {\n"+
"               $(\"lastAdv\").update(lastAdvText);\n"+
"               advArray.push({\"url\":lastAdventure,\"text\":lastAdvText});\n"+
"           }\n"+
"       },\n"+
"\n"+
"       showAdvHistory : function() {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           var advArray = framework.model.userData.advArray;\n"+
"           var str = \"\";\n"+
"           var div = $(\"advHistory\");\n"+
"           div.update();\n"+
"           var target = $('lastAdv');\n"+
"           var position = Position.cumulativeOffset(target);\n"+
"           div.style.top = (position[1] + target.offsetHeight) + \"px\";\n"+
"           div.style.left = (position[0]-5) + \"px\";\n"+
"           for (var i=advArray.length-2;i>=0;i--) {\n"+
"               if (advArray[i] && advArray[i].url) {\n"+
"                   div.innerHTML += '<a href=\"' + advArray[i].url + '\" target=\"mainpane\" onclick=\"$(\\'advHistory\\').style.display=\\'none\\'\">' + advArray[i].text + '</a><br/>';\n"+
"               }\n"+
"           }\n"+
"           div.style.display = \"block\";\n"+
"       },\n"+
"       \n"+
"       hideAdvHistory : function() {\n"+
"           framework.controller.timers.advHistoryTimer = setTimeout(\"$('advHistory').style.display='none'\",500);\n"+
"       },\n"+
"       \n"+
"       advAgain : function(via) {\n"+
"           var bodyHTML = charpane.document.body.innerHTML;\n"+
"           var lastAdventure = framework.model.userData.lastAdventure;\n"+
"           var i1 = bodyHTML.indexOf(\"adventure.php?snarfblat=\");\n"+
"           var i2 = bodyHTML.indexOf('\">',i1);\n"+
"           var advAgain = i1 > 0 ? bodyHTML.substring(i1,i2) : \"\";\n"+
"           var form = mainpane.document.forms[via];\n"+
"           if (form && framework.model.interfaceData.isFighting == true) {\n"+
"               form.submit();\n"+
"           } else {\n"+
"               mainpane.document.location.href = (advAgain != \"\" ? advAgain : lastAdventure);\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       // Moon Calendar\n"+
"       setMoonCalendar : function() {\n"+
"           // The following array indicates the brightness generated by either moon\n"+
"           // based on the moon's image number.  So the first element is for moon0\n"+
"           // (which does not exist-- it's a placeholder) and the next for moon1, etc.\n"+
"           // For each element, there are 3 sub-elements.  The first is for the normal\n"+
"           // moon graphic, say moon1.gif.  The second is for the a-version\n"+
"           // (moon1a.gif) and the third for the b-version (moon1b.gif).  Take the\n"+
"           // brightness for each moon and then add in the brightness for the\n"+
"           // minimoon if it is not currently overlapping a major moon.\n"+
"           var moonBrightness = [[0,0,0],[0,1,1],[1,0,2],[2,1,3],[3,2,4],[4,3,3],[3,4,2],[2,3,1],[1,2,0]];\n"+
"               \n"+
"           // If the mini-moon graphic is not present, use index 0.  If it is, use the\n"+
"           // appropriate element (minimoon1.gif = 1, minimoon2.gif =2)\n"+
"           var freestandingMiniMoonBrightness = [[0,0,0,0,0,0,0],[1,1,1,1,1,1,2],[0,0,0,0,0,0,0]];\n"+
"   \n"+
"           // Now for the grimacite units.  These are more complicated, but work\n"+
"           // roughly the same way.  The key difference is that Grimace and\n"+
"           // Ronald impact things differently.  Mostly you have one unit per\n"+
"           // dark segment of grimace, with the minimoon counting as part of\n"+
"           // grimace unless it is bright and obscuring a dark section of grimace.\n"+
"           //                    Moon      0(fake) 1       2       3       4       5       6       7       8\n"+
"           var grimaciteUnitsRonald =  [[0,0,0],[0,0,0],[0,1,2],[0,1,0],[0,1,0],[0,1,1],[0,0,1],[0,0,1],[0,0,1]];\n"+
"           var grimaciteUnitsGrimace = [[0,0,0],[4,3,3],[3,4,2],[2,3,1],[1,2,0],[0,1,1],[1,0,2],[2,1,3],[3,2,4]];\n"+
"           var freestandingMiniMoonGrimaciteUnits = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,1,1,1,1,1,2]];\n"+
"   \n"+
"           // Certain moon configurations indicate stat days.  This is an easy decoder.\n"+
"           // Decoder: [[Moon Combination], Musc_Day, Mys_Day, Mox_Day], ...\n"+
"           var statDays = [[\"1,1\",\"Mox\"],[\"5,3\",\"Mys\"],[\"1,5\",\"Mus\"],[\"2,5\",\"Mus\"],[\"5,7\",\"Mys\"],[\"8,8\",\"Mox\"]];\n"+
"   \n"+
"           //5-8 on the left and 2-5 on the right gives a bonus brightness\n"+
"           //This array allows the pinpointing of the current moon formation, therefore allowing the following day's moon formation to be found.\n"+
"           var moonPositionFinder = {\"1,1,2,1\":\"1\",\"2b,1,0,0\":\"2\",\"3,2a,0,0\":\"3\",\"4,2,2,5\":\"4\",\"5,3,1,4\":\"5\",\"6,3,0,0\":\"6\",\"7a,4,0,0\":\"7\",\"8,4,1,6\":\"8\",\"1,5b,0,0\":\"9\",\"2,5,0,0\":\"10\",\"3,6,2,2\":\"11\",\"4,6,1,1\":\"12\",\"5b,7,0,0\":\"13\",\"6,7a,0,0\":\"14\",\"7,8,1,5\":\"15\",\"8,8,2,4\":\"16\",\"1,1,0,0\":\"17\",\"2a,1,0,0\":\"18\",\"3,2,1,3\":\"19\",\"4,2b,0,0\":\"20\",\"5,3,0,0\":\"21\",\"6,3,1,2\":\"22\",\"7,4,2,1\":\"23\",\"8b,4,0,0\":\"24\",\"1,5a,0,0\":\"25\",\"2,5,1,5\":\"26\",\"3,6,2,4\":\"27\",\"4,6,0,0\":\"28\",\"5a,7,0,0\":\"29\",\"6,7,1,3\":\"30\",\"7,8b,0,0\":\"31\",\"8,8,0,0\":\"32\",\"1,1,2,2\":\"33\",\"2,1,1,1\":\"34\",\"3b,2,0,0\":\"35\",\"4,2a,0,0\":\"36\",\"5,3,2,5\":\"37\",\"6,3,1,4\":\"38\",\"7,4,0,0\":\"39\",\"8a,4,0,0\":\"40\",\"1,5,1,3\":\"41\",\"2,5b,0,0\":\"42\",\"3,6,0,0\":\"43\",\"4,6,2,2\":\"44\",\"5,7,1,1\":\"45\",\"6b,7,0,0\":\"46\",\"7,8a,0,0\":\"47\",\"8,8,1,5\":\"48\",\"1,1,2,4\":\"49\",\"2,1,0,0\":\"50\",\"3a,2,0,0\":\"51\",\"4,2,1,3\":\"52\",\"5,3b,0,0\":\"53\",\"6,3,0,0\":\"54\",\"7,4,1,2\":\"55\",\"8,4,2,1\":\"56\",\"1b,5,0,0\":\"57\",\"2,5a,0,0\":\"58\",\"3,6,1,5\":\"59\",\"4,6,2,4\":\"60\",\"5,7,0,0\":\"61\",\"6a,7,0,0\":\"62\",\"7,8,1,3\":\"63\",\"8,8b,0,0\":\"64\",\"1,1,0,0\":\"65\",\"2,1,2,2\":\"66\",\"3,2,1,1\":\"67\",\"4b,2,0,0\":\"68\",\"5,3a,0,0\":\"69\",\"6,3,2,5\":\"70\",\"7,4,1,4\":\"71\",\"8,4,0,0\":\"72\",\"1a,5,0,0\":\"73\",\"2,5,1,3\":\"74\",\"3,6b,0,0\":\"75\",\"4,6,0,0\":\"76\",\"5,7,1,2\":\"77\",\"6,7,2,1\":\"78\",\"7b,8,0,0\":\"79\",\"8,8a,0,0\":\"80\",\"1,1,2,5\":\"81\",\"2,1,2,4\":\"82\",\"3,2,0,0\":\"83\",\"4a,2,0,0\":\"84\",\"5,3,1,6\":\"85\",\"6,3b,0,0\":\"86\",\"7,4,0,0\":\"87\",\"8,4,1,2\":\"88\",\"1,5,2,1\":\"89\",\"2b,5,0,0\":\"90\",\"3,6a,0,0\":\"91\",\"4,6,1,5\":\"92\",\"5,7,2,4\":\"93\",\"6,7,0,0\":\"94\",\"7a,8,0,0\":\"95\",\"8,8,1,3\":\"96\",\"1,1b,0,0\":\"97\",\"2,1,0,0\":\"98\",\"3,2,2,2\":\"99\",\"4,2,1,1\":\"100\",\"5b,3,0,0\":\"101\",\"6,3a,0,0\":\"102\",\"7,4,2,5\":\"103\",\"8,4,1,4\":\"104\",\"1,5,0,0\":\"105\",\"2a,5,0,0\":\"106\",\"3,6,2,3\":\"107\",\"4,6b,0,0\":\"108\",\"5,7,0,0\":\"109\",\"6,7,1,2\":\"110\",\"7,8,2,1\":\"111\",\"8b,8,0,0\":\"112\",\"1,1a,0,0\":\"113\",\"2,1,2,5\":\"114\",\"3,2,1,4\":\"115\",\"4,2,0,0\":\"116\",\"5a,3,0,0\":\"117\",\"6,3,1,6\":\"118\",\"7,4b,0,0\":\"119\",\"8,4,0,0\":\"120\",\"1,5,2,2\":\"121\",\"2,5,1,1\":\"122\",\"3b,6,0,0\":\"123\",\"4,6a,0,0\":\"124\",\"5,7,1,5\":\"125\",\"6,7,2,4\":\"126\",\"7,8,0,0\":\"127\",\"8a,8,0,0\":\"128\",\"1,1,2,3\":\"129\",\"2,1b,0,0\":\"130\",\"3,2,0,0\":\"131\",\"4,2,2,2\":\"132\",\"5,3,1,1\":\"133\",\"6b,3,0,0\":\"134\",\"7,4a,0,0\":\"135\",\"8,4,2,5\":\"136\",\"1,5,1,4\":\"137\",\"2,5,0,0\":\"138\",\"3a,6,0,0\":\"139\",\"4,6,2,3\":\"140\",\"5,7b,0,0\":\"141\",\"6,7,0,0\":\"142\",\"7,8,1,2\":\"143\",\"8,8,2,1\":\"144\",\"1b,1,0,0\":\"145\",\"2,1a,0,0\":\"146\",\"3,2,2,5\":\"147\",\"4,2,1,4\":\"148\",\"5,3,0,0\":\"149\",\"6a,3,0,0\":\"150\",\"7,4,1,6\":\"151\",\"8,4b,0,0\":\"152\",\"1,5,0,0\":\"153\",\"2,5,2,2\":\"154\",\"3,6,1,1\":\"155\",\"4b,6,0,0\":\"156\",\"5,7a,0,0\":\"157\",\"6,7,1,5\":\"158\",\"7,8,2,4\":\"159\",\"8,8,0,0\":\"160\",\"1a,1,0,0\":\"161\",\"2,1,2,3\":\"162\",\"3,2b,0,0\":\"163\",\"4,2,0,0\":\"164\",\"5,3,1,2\":\"165\",\"6,3,2,1\":\"166\",\"7b,4,0,0\":\"167\",\"8,4a,0,0\":\"168\",\"1,5,1,5\":\"169\",\"2,5,1,4\":\"170\",\"3,6,0,0\":\"171\",\"4a,6,0,0\":\"172\",\"5,7,1,3\":\"173\",\"6,7b,0,0\":\"174\",\"7,8,0,0\":\"175\",\"8,8,1,2\":\"176\"};\n"+
"           var moonFutureDayPredictions = [[\"1,1,2,1\"],[\"2b,1,0,0\"],[\"3,2a,0,0\"],[\"4,2,2,5\"],[\"5,3,1,4\"],[\"6,3,0,0\"],[\"7a,4,0,0\"],[\"8,4,1,6\"],[\"1,5b,0,0\"],[\"2,5,0,0\"],[\"3,6,2,2\"],[\"4,6,1,1\"],[\"5b,7,0,0\"],[\"6,7a,0,0\"],[\"7,8,1,5\"],[\"8,8,2,4\"],[\"1,1,0,0\"],[\"2a,1,0,0\"],[\"3,2,1,3\"],[\"4,2b,0,0\"],[\"5,3,0,0\"],[\"6,3,1,2\"],[\"7,4,2,1\"],[\"8b,4,0,0\"],[\"1,5a,0,0\"],[\"2,5,1,5\"],[\"3,6,2,4\"],[\"4,6,0,0\"],[\"5a,7,0,0\"],[\"6,7,1,3\"],[\"7,8b,0,0\"],[\"8,8,0,0\"],[\"1,1,2,2\"],[\"2,1,1,1\"],[\"3b,2,0,0\"],[\"4,2a,0,0\"],[\"5,3,2,5\"],[\"6,3,1,4\"],[\"7,4,0,0\"],[\"8a,4,0,0\"],[\"1,5,1,3\"],[\"2,5b,0,0\"],[\"3,6,0,0\"],[\"4,6,2,2\"],[\"5,7,1,1\"],[\"6b,7,0,0\"],[\"7,8a,0,0\"],[\"8,8,1,5\"],[\"1,1,2,4\"],[\"2,1,0,0\"],[\"3a,2,0,0\"],[\"4,2,1,3\"],[\"5,3b,0,0\"],[\"6,3,0,0\"],[\"7,4,1,2\"],[\"8,4,2,1\"],[\"1b,5,0,0\"],[\"2,5a,0,0\"],[\"3,6,1,5\"],[\"4,6,2,4\"],[\"5,7,0,0\"],[\"6a,7,0,0\"],[\"7,8,1,3\"],[\"8,8b,0,0\"],[\"1,1,0,0\"],[\"2,1,2,2\"],[\"3,2,1,1\"],[\"4b,2,0,0\"],[\"5,3a,0,0\"],[\"6,3,2,5\"],[\"7,4,1,4\"],[\"8,4,0,0\"],[\"1a,5,0,0\"],[\"2,5,1,3\"],[\"3,6b,0,0\"],[\"4,6,0,0\"],[\"5,7,1,2\"],[\"6,7,2,1\"],[\"7b,8,0,0\"],[\"8,8a,0,0\"],[\"1,1,2,5\"],[\"2,1,2,4\"],[\"3,2,0,0\"],[\"4a,2,0,0\"],[\"5,3,1,6\"],[\"6,3b,0,0\"],[\"7,4,0,0\"],[\"8,4,1,2\"],[\"1,5,2,1\"],[\"2b,5,0,0\"],[\"3,6a,0,0\"],[\"4,6,1,5\"],[\"5,7,2,4\"],[\"6,7,0,0\"],[\"7a,8,0,0\"],[\"8,8,1,3\"],[\"1,1b,0,0\"],[\"2,1,0,0\"],[\"3,2,2,2\"],[\"4,2,1,1\"],[\"5b,3,0,0\"],[\"6,3a,0,0\"],[\"7,4,2,5\"],[\"8,4,1,4\"],[\"1,5,0,0\"],[\"2a,5,0,0\"],[\"3,6,2,3\"],[\"4,6b,0,0\"],[\"5,7,0,0\"],[\"6,7,1,2\"],[\"7,8,2,1\"],[\"8b,8,0,0\"],[\"1,1a,0,0\"],[\"2,1,2,5\"],[\"3,2,1,4\"],[\"4,2,0,0\"],[\"5a,3,0,0\"],[\"6,3,1,6\"],[\"7,4b,0,0\"],[\"8,4,0,0\"],[\"1,5,2,2\"],[\"2,5,1,1\"],[\"3b,6,0,0\"],[\"4,6a,0,0\"],[\"5,7,1,5\"],[\"6,7,2,4\"],[\"7,8,0,0\"],[\"8a,8,0,0\"],[\"1,1,2,3\"],[\"2,1b,0,0\"],[\"3,2,0,0\"],[\"4,2,2,2\"],[\"5,3,1,1\"],[\"6b,3,0,0\"],[\"7,4a,0,0\"],[\"8,4,2,5\"],[\"1,5,1,4\"],[\"2,5,0,0\"],[\"3a,6,0,0\"],[\"4,6,2,3\"],[\"5,7b,0,0\"],[\"6,7,0,0\"],[\"7,8,1,2\"],[\"8,8,2,1\"],[\"1b,1,0,0\"],[\"2,1a,0,0\"],[\"3,2,2,5\"],[\"4,2,1,4\"],[\"5,3,0,0\"],[\"6a,3,0,0\"],[\"7,4,1,6\"],[\"8,4b,0,0\"],[\"1,5,0,0\"],[\"2,5,2,2\"],[\"3,6,1,1\"],[\"4b,6,0,0\"],[\"5,7a,0,0\"],[\"6,7,1,5\"],[\"7,8,2,4\"],[\"8,8,0,0\"],[\"1a,1,0,0\"],[\"2,1,2,3\"],[\"3,2b,0,0\"],[\"4,2,0,0\"],[\"5,3,1,2\"],[\"6,3,2,1\"],[\"7b,4,0,0\"],[\"8,4a,0,0\"],[\"1,5,1,5\"],[\"2,5,1,4\"],[\"3,6,0,0\"],[\"4a,6,0,0\"],[\"5,7,1,3\"],[\"6,7b,0,0\"],[\"7,8,0,0\"],[\"8,8,1,2\"]];\n"+
"   \n"+
"           var tmp = [];\n"+
"           tmp.push(\"<table><thead><tr><th>Day</th><th>Stat</th><th>Grue</th><th>Wereseal</th><th>Baio</th><th>Jekyllin</th><th>Grimacite</th></tr></thead><tbody>\");\n"+
"           var m1 = 0; // Moon 1 Brightness (Ronald)\n"+
"           var m2 = 0; // Moon 2 Brightness (Grimace)\n"+
"           var m3 = 0; // Moon 3 Brightness (Hamburgler color)\n"+
"           var m4 = 0; // Hamburgler exact Position (1-5) (6 = moon is in the middle and worth double)\n"+
"           var moons = menupane.document.body.innerHTML.match(/\\/s?moon\\d\\w*/gi);\n"+
"           var miniMoon = menupane.document.body.innerHTML.match(/s?minimoon\\d*/gi);\n"+
"           var allMoons = menupane.document.body.innerHTML.match(/m?i?n?i?moon\\d*\\w*/gi);\n"+
"           var m1 = moons[0].match(/\\d\\w?/);\n"+
"           var m2 = moons[1].match(/\\d\\w?/);\n"+
"           if (miniMoon && (miniMoon.length > 0)) {\n"+
"               if (miniMoon[0].indexOf(\"2\") > -1) { m3 = \"2\"; }\n"+
"               else { m3 = \"1\";}\n"+
"           }\n"+
"           var n1 = moons[0].match(/\\d/);\n"+
"           var n2 = moons[1].match(/\\d/);\n"+
"   \n"+
"           // This checks to see whether or not we are in compact mode (Compact mode has an extra word \"Moons\" which we need to get rid of by offsetting everything else.)\n"+
"           var m = allMoons[0].indexOf(\"M\") == -1 ? 1 : 0; \n"+
"           \n"+
"           // Determine the exact position of the minimoon\n"+
"           //'alert(menupanedocument.innerHTML.match(/width=14 align=\\d/));\n"+
"           if (allMoons[1-m].indexOf(\"mini\") != -1) { m4 = 1; }\n"+
"           var td = menupane.document.getElementsByTagName(\"td\")[6].align;\n"+
"           if (allMoons[2-m].indexOf(\"mini\") != -1 && td == \"left\" ) { m4 = 2;}\n"+
"           if (allMoons[2-m].indexOf(\"mini\") != -1 && td == \"center\") { m4 = 3;}\n"+
"           if (allMoons[2-m].indexOf(\"mini\") != -1 && td == \"right\") { m4 = 4;}\n"+
"           if (allMoons[3-m] && allMoons[2].length > 0) {\n"+
"               if (allMoons[3-m].indexOf(\"mini\") != -1) { m4 = 5; }\n"+
"           }\n"+
"           if (m4 == 3 && n1 >= 5 && n1 <= 8 && n2 >= 2 && n2 <= 5) { m4 = 6;}\n"+
"           \n"+
"           var now = new Date();\n"+
"           var then = new Date(2006,5,1); //for some stupid reason, month is 0-11, but day is 1-31 - so this is June 1st, 2006\n"+
"           var days = (Math.round((now - then) / 86400000) - 3) > 174 ? days = days/2 : days = (Math.round((now - then) / 86400000) - 3); // 86,400,000 milliseconds in a day\n"+
"           if(days == 174) {\n"+
"               days = -2;\n"+
"           }\n"+
"           \n"+
"           // Find which part of the moon cycle we are currently on (if we are far in the moon phase this can take awhile)\n"+
"           //'alert(m1 +\",\" + m2 + \",\" + m3 + \",\" + m4);\n"+
"           if(moonPositionFinder[m1 +\",\" + m2 + \",\" + m3 + \",\" + m4] != undefined) {\n"+
"               var moonPosition = moonPositionFinder[m1 +\",\" + m2 + \",\" + m3 + \",\" + m4];\n"+
"           }\n"+
"           \n"+
"           //run a for loop to generate the next 14 days of moon data'\n"+
"           for (var n=0;n<=14;n++) {\n"+
"               var thismoon = String(moonFutureDayPredictions[moonPosition-1]);\n"+
"               //'alert(thismoon + \":\" + moonPosition);\n"+
"               thismoon = thismoon.split(\",\");\n"+
"               var o1 = thismoon[0].length > 1 ? thismoon[0].match(/\\d/) : thismoon[0];\n"+
"               var o1ModifierIndex = 0;\n"+
"               if (thismoon[0].indexOf(\"a\") != -1) { o1ModifierIndex = 1; }\n"+
"               if (thismoon[0].indexOf(\"b\") != -1) { o1ModifierIndex = 2; }\n"+
"               \n"+
"               var o2 = thismoon[1].length > 1 ? thismoon[1].match(/\\d/) : thismoon[1];\n"+
"               var o2ModifierIndex = 0;\n"+
"               if (thismoon[1].indexOf(\"a\") != -1) { o2ModifierIndex = 1; }\n"+
"               if (thismoon[1].indexOf(\"b\") != -1) { o2ModifierIndex = 2; }\n"+
"               \n"+
"               var o3 = thismoon[2];\n"+
"               var o4 = thismoon[3];\n"+
"           \n"+
"               var curMoonBrightness = moonBrightness[o1] [o1ModifierIndex] + moonBrightness[o2] [o2ModifierIndex] + freestandingMiniMoonBrightness[o3] [o4];\n"+
"               var curGrimaciteUnits = grimaciteUnitsRonald[o1] [o1ModifierIndex] + grimaciteUnitsGrimace[o2] [o2ModifierIndex] + freestandingMiniMoonGrimaciteUnits[o3] [o4];\n"+
"               \n"+
"               var today = new Date().valueOf();\n"+
"               var t = new Date(today+n*86400000);\n"+
"               var m = t.getMonth()+1;\n"+
"               var d = t.getDate();\n"+
"               \n"+
"               // Check whether it is currently a stat day and generate the result in a variable \"curStatDay\"\n"+
"               var curStatDay = \"\";\n"+
"               for (i in statDays) {\n"+
"                   if (statDays[i] [0] == o1+\",\"+o2) {\n"+
"                       curStatDay = statDays[i] [1] ;\n"+
"                       break;\n"+
"                   }\n"+
"               }\n"+
"               tmp.push(\"<tr class=tr\" + (n % 2) + \"><td>\" + (n == 0 ? \"Today\" : m + \"/\" + d));\n"+
"               tmp.push(\"</td><td>\" + (curStatDay));\n"+
"               tmp.push(\"</td><td>\" + (curMoonBrightness <= 5 ? \"Yes\" : \"No\"));\n"+
"               tmp.push(\"</td><td>\" + (curMoonBrightness >= 4 ? \"+\" : \"\") + (curMoonBrightness - 4)*25 + \"%\");\n"+
"               tmp.push(\"</td><td>\" + (curMoonBrightness*10) + \"%\");\n"+
"               tmp.push(\"</td><td>\" + (9-curMoonBrightness) + \" / \" + (15 + 5*curMoonBrightness) + \"%\");\n"+
"               tmp.push(\"</td><td>\" + \"+\" + (10*curGrimaciteUnits) + \"%\");\n"+
"               tmp.push(\"</td></tr>\");\n"+
"               moonPosition = moonPosition < 176 ? Number(moonPosition) + 1 : 1;\n"+
"           }\n"+
"           tmp.push(\"</tbody></table>\");\n"+
"           var strMoon = tmp.join(\"\");\n"+
"           var moonDiv = $(\"moonInfo\");\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           moonDiv.innerHTML = strMoon;\n"+
"           moonDiv.style.left = Number(window.innerWidth-interfaceData.chatW)/2-150 + \"px\";\n"+
"           moonDiv.style.top = interfaceData.menuH + \"px\";\n"+
"           var moonImgs = menupane.document.getElementsByTagName(\"img\");\n"+
"           for (var i in moonImgs) {\n"+
"               var moonImg = moonImgs[i];\n"+
"               if (moonImg.src && moonImg.src.indexOf(\"moon\") != -1) {\n"+
"                   moonImg.style.cursor = \"pointer\";\n"+
"                   moonImg.onmouseover = function() {\n"+
"                       top.framework.controller.handlers.openMoonCalendar();\n"+
"                   };\n"+
"                   moonImg.onmouseout = function() {\n"+
"                       top.framework.controller.handlers.closeMoonCalendar();\n"+
"                   };\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       initializeMenuQuickSkill : function() {\n"+
"           // add loading element for Quick skill option compatibility\n"+
"           if (!menupane.document.getElementById(\"loading\")) {\n"+
"               var div = menupane.document.createElement(\"div\");\n"+
"               div.id = \"loading\";\n"+
"               div.style.display = \"none\";\n"+
"               menupane.document.body.appendChild(div);\n"+
"           }\n"+
"           \n"+
"           // Disable menu QS if Adventure QS enabled\n"+
"           if (framework.model.interfaceData.quickSkillPref == 1) {\n"+
"               var skillbit = menupane.document.getElementById(\"skillbit\");\n"+
"               if (skillbit) {\n"+
"                   if (skillbit.parentNode.previousSibling.style) skillbit.parentNode.previousSibling.style.display=\"none\";\n"+
"                   skillbit.innerHTML = \"\";\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       setAccountPage : function() {\n"+
"           if (mainpane.location.pathname == \"/account.php\") {\n"+
"           	var s = mainpane.document.querySelector('ul').appendChild(mainpane.document.createElement('li'));\n"+
"           	s.id = 'tardoptions';\n"+
"               var a = s.appendChild(mainpane.document.createElement('a'));\n"+
"               a.href = '#';\n"+
"               var img = a.appendChild(document.createElement('img'));\n"+
"               img.src = 'http://images.kingdomofloathing.com/itemimages/obtuseangel.gif';\n"+
"               img.align = 'absmiddle';\n"+
"               img.border = '0';\n"+
"               img.style.paddingRight = '10px';\n"+
"               a.appendChild(mainpane.document.createTextNode('Tard\\'s'));\n"+
"               a.addEventListener('click', function (e) {\n"+
"                   e.stopPropagation();\n"+
"                   mainpane.document.querySelector('.active').className = '';\n"+
"                   mainpane.document.querySelector('#tardoptions').className = 'active';\n"+
"                   mainpane.document.querySelector('#guts').innerHTML = '<div class=\"scaffold\"></div>';\n"+
"                   mainpane.document.querySelector('#guts').appendChild(getSettings());\n"+
"               }, false);\n"+
"               function getSettings() {\n"+
"                  var guts = mainpane.document.createElement('div');\n"+
"                  guts.innerHTML = '<center>' + \n"+
"                                   '<a href=\"#\" onclick=\"top.framework.controller.handlers.openConfigPanel();return false;\">Open Tard\\'s Framework Config Panel</a>' +\n"+
"                                   '</center>';\n"+
"                  return guts;\n"+
"               }\n"+
"           }\n"+
"           \n"+
"       }\n"+
"\n"+
"   }\n"+
"   \n"+
"});\n"+
"\n"+ // [clump] insert choiceadv options
"Object.extend(framework.view,{\n"+
"       choiceAdventures : {\n"+
"           init : function() {\n"+
"               framework.controller.utils.addToScriptQueue(\"main\",framework.view.choiceAdventures.checkChoiceAdventure);\n"+
"               framework.controller.utils.addToScriptQueue(\"inv\",framework.view.choiceAdventures.checkChoiceAdventure);\n"+
"           },\n"+
"           checkChoiceAdventure : function() {\n"+
"// Tard's KoL Scripts\n"+
"// Copyright (c) 2006, Byung Kim\n"+
"// Released under the GPL license\n"+
"// http://www.gnu.org/copyleft/gpl.html\n"+
"//\n"+
"// version history:\n"+
"// @version        3.02\n"+
"// @author        Tard\n"+
"// @author         Hellion\n"+
"// @author         Aelsa\n"+
"   // [clump: change url search]\n"+
"   var localp = framework.model.interfaceData.currentPane;\n"+
"   var fname = localp.location.pathname+localp.location.search;\n"+
"   if (fname == \"/choice.php\") { // for regular choices, we use the standardized whichchoice value.\n"+
"       // format, if it wasn't already painfully obvious:\n"+
"       // whichchoiceID:[\"adventure name\",\"choice 1 hints\",\"choice 2 hints\",\"choice 3 hints\",\"choice 4 hints\"]\n"+
"       // n.b. the \"adventure name\" value is optional for these choices.\n"+
"       var advOptions = {\n"+
"       // The Dungeons of Doom\n"+
"       3:[\"The Oracle Will See You Now\",\"nothing\",\"nothing\",\"enable reading of plus sign\"],\n"+
"       25:[\"Ouch! You bump into a door\",\"magic lamp\",\"Monster: mimic\",\"nothing (no adv loss)\"],\n"+
"\n"+
"       // South of the Border\n"+
"       4:[\"Finger-Lickin'... Death.\",\"+500 meat or -500 meat\",\"-500 meat; chance of poultrygeist\",\"nothing\"],\n"+
"\n"+
"       // Spooky Gravy Barrow\n"+
"       5:[\"Heart of Very, Very Dark Darkness\",\"without inexplicably glowing rock: proceed to choice of (lose all HP/nothing)\\n with rock: proceed to choice of (Continue to Felonia/nothing)\",\"nothing\",\"\"],\n"+
"       6:[\"Darker Than Dark\",\"-all HP\",\"nothing\",\"\"],\n"+
"       7:[\"How Depressing\",\"with spooky glove equipped: proceed to Continue to Felonia\\n without glove equipped: nothing\",\"nothing\",\"\"],\n"+
"       8:[\"On the Verge of a Dirge\",\"proceed to Queen Felonia\",\"proceed to Queen Felonia\",\"proceed to Queen Felonia\"],\n"+
"\n"+
"       // Castle (Wheel)\n"+
"       9:[\"cwheel1\",\"Pay the Bills (Mysticality Bonus)\",\"Feed the Cat (Moxie Bonus)\",\"Take out the Garbage (Muscle Bonus)\"],\n"+
"       10:[\"cwheel2\",\"Guard the Back Door\",\"Take out the Garbage (Muscle Bonus)\",\"Pay the Bills (Mysticality Bonus)\"],\n"+
"       11:[\"cwheel3\",\"Feed the Cat (Moxie Bonus)\",\"Pay the Bills (Mysticality Bonus)\",\"Guard the Back Door\"],\n"+
"       12:[\"cwheel4\",\"Take out the Garbage (Muscle Bonus)\",\"Guard the Back Door\",\"Feed the Cat (Moxie Bonus)\"],\n"+
"\n"+
"       // Knob Harem\n"+
"       14:[\"A Bard Day's Night\",\"Knob Goblin harem veil\",\"Knob Goblin harem pants\",\"+90-110 meat\"],\n"+
"       \n"+
"       // The eXtreme Slope\n"+
"       15:[\"Yeti Nother Hippy\",\"eXtreme mittens\",\"eXtreme scarf\",\"+200 meat\"],\n"+
"       16:[\"Saint Beernard\",\"snowboarder pants\",\"eXtreme scarf\",\"+200 meat\"],\n"+
"       17:[\"Generic Teen Comedy Snowboarding Adventure\",\"eXtreme mittens\",\"snowboarder pants\",\"+200 meat\"],\n"+
"       \n"+
"       // Itznotyerzitz Mine\n"+
"       18:[\"A Flat Miner\",\"miner's pants\",\"7-Foot Dwarven mattock\",\"+100 meat\"],\n"+
"       19:[\"100% Legal\",\"miner's helmet\",\"miner's pants\",\"+100 meat\"],\n"+
"       20:[\"See You Next Fall\",\"miner's helmet\",\"7-Foot Dwarven mattock\",\"+100 meat\"],\n"+
"\n"+
"       // Pirate's Cove\n"+
"       22:[\"The Arrrbitrator\",\"eyepatch\",\"swashbuckling pants\",\"+100 meat\"],\n"+
"       23:[\"Barrie Me at Sea\",\"stuffed shoulder parrot, -5 meat\",\"swashbuckling pants\",\"+100 meat\"],\n"+
"       24:[\"Amatearrr Night\",\"stuffed shoulder parrot, -3 HP\",\"+100 meat\",\"eyepatch\"],\n"+
"\n"+
"       // Spooky Forest\n"+
"       26:[\"A Three-Tined Fork\",\"Proceed to choice of SC/TT starter items\",\"Proceed to choice of PM/S starter items\",\"Proceed to choice of DB/AT starter items\"],\n"+
"       27:[\"Footprints\",\"seal-skull helmet, seal-clubbing club\",\"helmet turtle, turtle totem\"],\n"+
"       28:[\"A Pair of Craters\",\"pasta spoon, ravioli hat\",\"saucepan, spices\"],\n"+
"       29:[\"The Road Less Visible\",\"disco ball, disco mask\",\"mariachi pants, stolen accordion\"],\n"+
"       45:[\"Maps and Legends\",\"Spooky Temple map\",\"nothing (no adv loss)\",\"nothing (no adv loss)\"],\n"+
"       46:[\"An Interesting Choice\",\"+5-10 Mox\",\"+5-10 Mus\",\"Monster: spooky vampire\"],\n"+
"       47:[\"Have a Heart\",\"bottle(s) of used blood\",\"nothing (no adv loss)\"],\n"+
"       502:[\"Arboreal Respite\",\"\\nProceed to choice of meat/vampire hearts/barskin&Sapling\",\"\\nProceed to choice of (spooky mushrooms or larva)/(Meat & coin)/(mox/mus/vampire)\",\"\\nProceed to choice of \\n(choice of class starter items)/Spooky-Gro Fertilizer/Spooky Temple Map\"],\n"+
"       503:[\"The Road Less Traveled\",\"Gain (some) Meat\",\"Talk to Vampire Hunter:\\nreceive wooden stakes (1st time only)\\nOR Trade in hearts/nothing\",\"talk to Hunter\\n(Sell bar skins/buy sapling)\"],\n"+
"       504:[\"Tree's Last Stand\",\"\\nSell 1 skin\",\"\\nSell all skins\",\"\\nacquire Spooky Sapling\",\"nothing\"],\n"+
"       505:[\"Consciousness of a Stream\",\"\\nMosquito larva (first time after quest) OR 3 spooky mushrooms\",\"\\n300 meat and tree-holed coin (first time) OR nothing\",\"Proceed to choice of Mox/Mus/Fight a Vampire\"],\n"+
"       506:[\"Through Thicket and Thinnet\",\"\\nProceed to choice of class starting items\",\"\\nAcquire spooky-gro fertilizer\",\"\\nProceed to choice of Spooky Temple Map/nothing/nothing\"],\n"+
"       507:[\"O Olith, Mon\",\"acquire Spooky Temple Map\",\"nothing (no turn loss)\",\"nothing (no turn loss)\"],\n"+
"       \n"+
"       //48-71 are the Violet Fog; can't really label those.\n"+
"       \n"+
"       // Cola Battlefield\n"+
"       40:[\"The Effervescent Fray\",\"Cloaca-Cola fatigues\",\"Dyspepsi-Cola shield\",\"+15 Mys\"],\n"+
"       41:[\"Smells Like Team Spirit\",\"Dyspepsi-Cola fatigues\",\"Cloaca-Cola helmet\",\"+15 Mus\"],\n"+
"       42:[\"What is it Good For?\",\"Dyspepsi-Cola helmet\",\"Cloaca-Cola shield\",\"+15 Mox\"],\n"+
"\n"+
"       // Whitey's Grove\n"+
"       73:[\"Don't Fence Me In\",\"+20-30 Mus\",\"white picket fence\",\"piece of wedding cake (always)\\n also white rice (first 3 or 5 times/day)\"],\n"+
"       74:[\"The Only Thing About Him is the Way That He Walks\",\"+20-30 Mox\",\"3 boxes of wine\",\"mullet wig\"],\n"+
"       75:[\"Rapido!\",\"+20-30 Mys\",\"3 jars of white lightning\",\"white collar\"],\n"+
"\n"+
"       // Knob Shaft\n"+
"       76:[\"Junction in the Trunction\",\"3 chunks of cardboard ore\",\"3 chunks of styrofoam ore\",\"3 chunks of bubblewrap ore\"],\n"+
"\n"+
"       // Haunted Billiards Room\n"+
"       77:[\"Minnesota Incorporeals\",\"+(mainstat) Mox (max 50)\",\"Proceed to choice of (Mys/key/nothing)/Mus/nothing\",\"Leave (no adventure loss)\"],\n"+
"       78:[\"Broken\",\"Proceed to choice of +Mys, Spookyraven library key, or nothing\",\"+(mainstat) Mus (max 50)\",\"Leave (no adventure loss)\"],\n"+
"       79:[\"A Hustle Here, a Hustle There\",\"\\n with Chalky Hand effect: Acquire Spookyraven library key (one time drop)\\nwithout Chalky Hand effect: No Reward (lose an adventure)\",\"+(mainstat) Mys (max 50)\",\"Leave (no adventure loss)\"],\n"+
"       330:[\"A Shark's Chum\",\"\\n+10 Mus, +10 Mys, +10 Mox, improve VIP Pool table skill\",\"Monster: hustled spectre\"],\n"+
"\n"+
"       // The Haunted Bedroom\n"+
"       82:[\"nightstand\",\"old leather wallet\",\"+(mainstat) Mus (max 200)\",\"Monster: animated nightstand\"],\n"+
"       83:[\"darkstand\",\"old coin purse\",\"Monster: animated nightstand\",\"\\ntattered wolf standard (SC)\\ntattered snake standard (TT)\\nEnglish to A. F. U. E. Dictionary (PM or S)\\nbizarre illegible sheet music (DB or AT)\\n All can only be found with Lord Spookyraven's spectacles equipped\\n(all are one time drops)\"],\n"+
"       84:[\"carvestand\",\"400-600 meat\",\"+(mainstat) Mys (max 200)\",\"Lord Spookyraven's spectacles (one time drop)\"],\n"+
"       85:[\"woodstand\",\"+(mainstat) Mox (max 200)\",\"Spookyraven ballroom key \\n(only after choosing top drawer; one time drop)\",\"Monster: remains of a jilted mistress\"],\n"+
"\n"+
"       // The Haunted Gallery\n"+
"       89:[\"Out in the Garden\",\"\\nwithout tattered wolf standard: Monster: Knight (wolf)\\nwith tattered wolf standard and SC class: Gain Snarl of the Timberwolf skill (one time)\",\"without tattered snake standard: Monster: Knight (snake)\\nwith tattered snake standard and TT class: gain Spectral Snapper skill (one time)\",\"without Dreams and Lights effect: Effect: Dreams and Lights;\\nwith Dreams and Lights effect: lose 24-30 HP\"],\n"+
"\n"+
"       // The Haunted Library (Take A Look, It's In A Book\")\n"+
"       80:[\"Rise of the House\",\"\\nproceed to choice of nothing/nothing/nothing\",\"\\nLearn a random cooking recipe\",\"\\nProceed to choice of Mox/Mys/Skill for Myst classes\",\"nothing (no adv loss)\"],\n"+
"       81:[\"Fall of the House\",\"\\nproceed to choice of unlock gallery-key adventure/nothing/nothing\",\"\\nLearn a random cocktailcrafting recipe\",\"\\n+(mainstat) Mus (max 75) and lose 10-15 HP (Spooky)\",\"nothing (no adv loss)\"],\n"+
"       86:[\"Read Chapter 1: The Arrival\",\"nothing\",\"nothing\",\"nothing\"],\n"+
"       87:[\"Chapter 2: Stephen and Elizabeth\",\"nothing\",\"\\nunlock Gallery Key adventure in Conservatory\",\"nothing\"],\n"+
"       88:[\"Naughty, Naughty...\",\"\\n+(mainstat) Mys (max 75)\",\"\\n+(mainstat) Mox (max 75)\",\"\\nwithout English to A. F. U. E. Dictionary: -10-15 HP (Spooky), \\nwith Dictionary and P/SR class: gain new Skill (one time)\"],\n"+
"       163:[\"Melvil Dewey Would Be Ashamed\",\"\\nNecrotelicomnicon (spooky cookbook)\",\"\\nCookbook of the Damned (stinky cookbook)\",\"\\nSinful Desires (sleazy cookbook)\",\"nothing (no adventure loss)\"],\n"+
"\n"+
"       // The Haunted Ballroom\n"+
"       90:[\"Curtains\",\"\\nwith bizarre illegible sheet music as DB: unlock Tango of Terror\\nwith sheet music as AT: unlock Dirge of Dreadfulness\\notherwise: Monster: Ghastly Organist\",\"+(mainstat) Mox (max 150)\",\"nothing (no adventure loss)\"],\n"+
"       //91-105 are the Louvre... can't really label those.\n"+
"       106:[\"Strung-Up Quartet\",\"+5 ML\",\"+5% Noncombat\",\"+5% item drops\",\"turn song off\"],\n"+
"\n"+
"       // The Haunted Bathroom\n"+
"       105:[\"Having a Medicine Ball\",\"with antique hand mirror, +(mainstat*1.2) Mys (max 300)\\notherwise +(mainstat) Mys (max 200)\",\"Proceed to choice of Mus/Mys/Mox spleen items\",\"(every five times until defeat) Monster: Guy Made of Bees\"],\n"+
"       107:[\"Bad Medicine is What You Need\",\"antique bottle of cough syrup (Mys spleen item)\",\"tube of hair oil (Mox spleen item)\",\"bottle of ultravitamins (Mus spleen item)\",\"nothing (no adventure loss)\"],\n"+
"       402:[\"Don't Hold a Grudge\",\"+(2x mainstat?) Mus (max 125)\",\"+(2-2.5x mainstat) myst (max 250)\",\"+(2x mainstat?) Mox (max 125)\"],\n"+
"\n"+
"       // Sleazy Back Alley\n"+
"       21:[\"Under the Knife\",\"Change gender of character\",\"nothing\",\"\"],\n"+
"       108:[\"Aww, Craps\",\"+4-5 Mox\",\"randomly +31-40 meat and +6-8 Mox or -2 HP\",\"randomly +41-49 meat. +6-8 Mox and Effect: Smugness or -ALL HP\",\"nothing (no adv loss)\"],\n"+
"       109:[\"Dumpster Diving\",\"Monster: drunken half-orc hobo\",\"+4-5 Mox and +3-4 meat\",\"Mad Train wine\"],\n"+
"       110:[\"The Entertainer\",\"+4-5 Mox\",\"+2-4 Mox and +2-4 Mus\",\"+15 meat and sometimes +6-8 Mys\",\"nothing (no adv loss)\"],\n"+
"       112:[\"Please, Hammer\",\"Harold's hammer head and Harold's hammer handle (start miniquest)\",\"nothing (no adv loss)\",\"+5-6 Mus\"],\n"+
"       \n"+
"       // Outskirts of Cobb's Knob\n"+
"       111:[\"Malice in Chains\",\"+4-5 Mus\",\"randomly +6-8 Mus or -1-? HP\",\"Monster: sleeping Knob Goblin Guard\"],\n"+
"       113:[\"Knob Goblin BBQ\",\"\\nwithout unlit birthday cake: -2 HP\\nwith unlit birthday cake: light cake and -2 HP\", \"Monster: Knob Goblin Barbecue Team\", \"randomly one of: bowl of cottage cheese,\\nKnob Goblin pants, Knob Goblin tongs, or Kiss the Knob apron\", \"\"],\n"+
"       118:[\"When Rocks Attack\", \"+30 meat\", \"nothing (no adv loss)\", \"\", \"\"],\n"+
"       120:[\"Ennui is Wasted on the Young\", \"randomly +4-5 Mus and -2 HP \\nor +7-8 Mus and Effect: Pumped Up\", \"\\nice-cold Sir Schlitz\", \"\\n+2-3 Mox and a lemon\", \"\\nnothing (no adv loss)\"],\n"+
"       \n"+
"       // The Haunted Pantry\n"+
"       114:[\"The Baker's Dilemma\", \"unlit birthday cake (start miniquest)\", \"nothing (no adv loss)\", \"+4-5 Mox and +16-19 meat\"],\n"+
"       115:[\"Oh No, Hobo\",\"Monster: drunken half-orc hobo\",\"\\nwithout at least 6 meat: nothing\\nwith at least 6 meat, -5 meat and Effect: Good Karma\",\"+3-4 Mys, +3-4 Mox, and +5-10 meat\",\"\"],\n"+
"       116:[\"The Singing Tree\", \"\\nwith at least 1 meat: +4-5 Mys and -1 meat\\nwith no meat: nothing\", \"\\nwith at least 1 meat: +4-5 Mox and -1 meat\\nwith 0 meat: nothing\", \"with at least 1 meat, -1 meat and randomly one of:\\nwhiskey and soda or +4-5 Mys and -2 HP or +7-8 Mys\\nwith no meat: nothing\", \"nothing (no adv loss)\"],\n"+
"       117:[\"Trespasser\", \"Monster: Knob Goblin Assistant Chef\", \"+6-8 Mys or +4 Mys and -2 HP\", \"Get 1-4 of:\\nasparagus knife, chef's hat,\\nmagicalness-in-a-can, razor-sharp can lid,\\nor stalk of asparagus\"],\n"+
"\n"+
"       // The Hidden Temple\n"+
"       123:[\"At Least It's Not Full Of Trash\",\"lose all HP\",\"unlock Dvorak's Revenge adventure\",\"lose all HP\"],\n"+
"       125:[\"No Visible Means of Support\",\"lose all HP\",\"lose all HP\",\"unlock the Hidden City\"],\n"+
"\n"+
"       // The Palindome\n"+
"       2:[\"Denim Axes Examined\",\"with rubber axe: trade for denim axe \\nwithout: nothing\",\"nothing\",\"\"],\n"+
"       126:[\"Sun at Noon, Tan Us\",\"+(mainstat) Mox (max 250)\",\"+(1.5*mainstat) Mox (max 350) OR Effect: Sunburned\",\"Effect: Sunburned\"],\n"+
"       127:[\"No sir, away!\",\"3 papayas\",\"\\nwith at least 3 papayas: +(mainstat) all stats (max 300), lose 3 papayas \\nwithout: lose 60-68 HP\",\"+(mainstat) all stats (max 100)\"],\n"+
"       129:[\"Do Geese See God?\",\"get photograph of God\",\"nothing (no adv loss?)\"],\n"+
"       130:[\"Rod Nevada, Vendor\",\"get hard rock candy\",\"nothing (no adv loss?)\"],\n"+
"       131:[\"Dr. Awkward\",\"Monster: Dr. Awkward\",\"Monster: Dr. Awkward\",\"Monster: Dr. Awkward\"],\n"+
"       180:[\"A Pre-War Dresser Drawer, Pa!\",\"with Torso Awaregness: Ye Olde Navy Fleece \\nwithout: +200-300 meat\",\"nothing (no adv loss)\"],\n"+
"\n"+
"       // The Arid, Extra-Dry Desert\n"+
"       132:[\"Let's Make a Deal!\",\"broken carburetor\",\"unlock An Oasis\"],\n"+
"       \n"+
"       // Pyramid\n"+
"       134:[\"Wheel in the Pyramid,\",\"move lower chamber\",\"nothing (no adv loss)\"],\n"+
"       135:[\"Wheel in the Pyramid,\",\"move lower chamber\",\"nothing (no adv loss)\"],\n"+
"\n"+
"       // The Hippy Camp\n"+
"       136:[\"Peace Wants Love\",\"filthy corduroys\",\"filthy knitted dread sack\",\"+210-300 meat\"],\n"+
"       137:[\"An Inconvenient Truth\",\"filthy knitted dread sack\",\"filthy corduroys\",\"+207-296 meat\"],\n"+
"       139:[\"Bait and Switch\",\"+50 Mus\",\"2-5 handfuls of ferret bait\",\"Monster: War Hippy (space) cadet\"],\n"+
"       140:[\"The Thin Tie-Dyed Line\",\"2-5 water pipe bombs\",\"+50 Mox\",\"Monster: War Hippy drill sergeant\"],\n"+
"       141:[\"Blockin' Out the Scenery\",\"+50 Myst\",\" 2 of: \\ncruelty-free wine, handful of walnuts, Genalen Bottle, mixed wildflower greens, thistle wine\",\"nothing (put on your Frat Warrior outfit, doofus!)\"],\n"+
"       142:[\"Blockin' Out the Scenery\",\"+50 Myst\",\" 2 of: \\ncruelty-free wine, handful of walnuts, Genalen Bottle, mixed wildflower greens, thistle wine\",\"start the war\"],\n"+
"\n"+
"       // The Orcish Frat House\n"+
"       72:[\"Lording Over The Flies\",\"trade flies for around the worlds\",\"nothing\",\"\"],\n"+
"       138:[\"Purple Hazers\",\"Orcish cargo shorts\",\"Orcish baseball cap\",\"homoerotic frat-paddle\"],\n"+
"       143:[\"Catching Some Zetas\",\"+50 Mus\",\"6-7 sake bombers\",\"Monster: War Pledge\"],\n"+
"       144:[\"One Less Room Than In That Movie\",\"+50 Mus\",\"2-5 beer bombs\",\"Monster: Frat Warrior drill sergeant\"],\n"+
"       145:[\"Fratacombs\",\"+50 Mus\",\"2 of: brain-meltingly-hot chicken wings, frat brats, \\nknob ka-bobs, can of Swiller, melted Jell-o shot\",\"nothing (put on your War Hippy Outfit, doofus!)\"],\n"+
"       146:[\"Fratacombs\",\"+50 Mus\",\"2 of: brain-meltingly-hot chicken wings, frat brats, \\nknob ka-bobs, can of Swiller, melted Jell-o shot\",\"start the war\"],\n"+
"       181:[\"Chieftain of the Flies\",\"trade flies for around the worlds\",\"nothing\"],\n"+
"\n"+
"       // The Barn\n"+
"       147:[\"Cornered!\",\"send ducks to the Granary\",\"send ducks to the Bog\",\"send ducks to the Pond \\n(step 1 of the shortcut--USE CHAOS BUTTERFLY IN COMBAT)\"],\n"+
"       148:[\"Cornered Again!\",\"send ducks to the Back 40 \\n(step 2 of the shortcut--USE CHAOS BUTTERFLY IN COMBAT)\",\"send ducks to the Family Plot\"],\n"+
"       149:[\"How Many Corners Does this Stupid Barn Have!?\",\"send ducks to the Shady Thicket\",\"send ducks to the Other Back 40 \\nIf you've used a chaos butterfly in combat and done steps 1 and 2: \\nhalve number of ducks in each area \"],\n"+
"\n"+
"       //The Fun House\n"+
"       151:[\"Adventurer, $1.99\",\"\\nwith at least 4 Clownosity: continue towards Beelzebozo \\notherwise: take damage\",\"nothing (no adventure loss)\"],\n"+
"       152:[\"Lurking at the Threshold\",\"Monster: Beelzebozo\",\"nothing\"],\n"+
"\n"+
"       // The Defiled Alcove\n"+
"       153:[\"Turn Your Head and Coffin\",\"+40-60 Mus\",\"+200-300 meat\",\"half-rotten brain\",\"nothing (no adv loss)\"],\n"+
"       154:[\"Doublewide\",\"Monster: conjoined zmombie\",\"nothing\"],\n"+
"\n"+
"       // The Defiled Nook\n"+
"       155:[\"Skull, Skull, Skull\",\"+40-60 Mox\",\"+200-300 meat\",\"rusty bonesaw\",\"nothing (no adv loss)\"],\n"+
"       156:[\"Pileup\",\"Monster: giant skeelton\",\"nothing\"],\n"+
"\n"+
"       // The Defiled Niche\n"+
"       157:[\"Urning Your Keep\",\"+40-70 Mys\",\"plus-sized phylactery (first time only)\",\"+200-300 meat\",\"nothing (no adv loss)\"],\n"+
"       158:[\"Lich in the Niche\",\"Monster: gargantulihc\",\"nothing\"],\n"+
"\n"+
"       // The Defiled Cranny\n"+
"       159:[\"Go Slow Past the Drawers\",\"+200-300 meat\",\"+40-50 HP/MP, +20-30 Mus, Mys and Mox\",\"can of Ghuol-B-Gone\",\"nothing (no adv loss)\"],\n"+
"       160:[\"Lunchtime\",\"Monster: huge ghuol\",\"nothing\"],\n"+
"\n"+
"       // The Deep Fat Friars' Gate\n"+
"       161:[\"Bureaucracy of the Damned\",\"\\nwith Azazel's 3 items, gain Steel reward \\nwithout: nothing\",\"\\nwith Azazel's three items, gain Steel reward \\nwithout: nothing\",\"\\nwith Azazel's three items, gain Steel reward \\nwithout: nothing\",\"\\nnothing (no adv loss)\"],\n"+
"\n"+
"       // The Goatlet\n"+
"       162:[\"Between a Rock and Some Other Rocks\",\"in Mining gear: allow access to the Goatlet \\notherwise, nothing\",\"nothing (no adv loss)\"],\n"+
"\n"+
"       // The Stately Pleasure Dome\n"+
"       164:[\"Down by the Riverside\",\n"+
"            \"\\n+(mainstat) Mus (max 150)\",\n"+
"            \"\\n+80-100 MP and Effect: Spirit of Alph\\n(step 1 of not-a-pipe (go to Mansion) or fancy ball mask (go to Windmill))\",\n"+
"            \"\\nMonster: Roller-skating Muse\"],\n"+
"       165:[\"Beyond Any Measure\",\n"+
"            \"\\nwith Rat-Faced, Effect: Night Vision (step 2 of flask of amontillado (go to Mansion))\\nwithout, nothing\",\n"+
"            \"\\nwith Bats in the Belfry, Effect: Good with the Ladies (step 2 of Can-Can skirt (go to Windmill))\\nwithout, nothing\",\n"+
"            \"\\n+(mainstat) Myst (max 150)\",\"nothing (no adventure loss)\"],\n"+
"       166:[\"Death is a Boat\",\n"+
"            \"\\nwith No Vertigo: S.T.L.T \\nwithout: nothing\",\n"+
"            \"\\n+(mainstat) Mox (max 150)\",\n"+
"            \"\\nwith Unusual Fashion Sense: albatross necklace \\nwithout: nothing\"],\n"+
"       \n"+
"       // The Mouldering Mansion\n"+
"       167:[\"It's a Fixer-Upper\",\n"+
"            \"\\nMonster: raven\",\n"+
"            \"\\n+(mainstat) Myst (max 150)\",\n"+
"            \"\\n+40-49 HP and MP, Effect: Bats in the Belfry\\n(step 1 of S.T.L.T. (go to Windmill) or Can-Can skirt (go to Dome))\"],\n"+
"       168:[\"Midst the Pallor of the Parlor\",\n"+
"            \"\\n+(mainstat) Mox (max 150)\",\n"+
"            \"\\nwith Spirit of Alph, Effect: Feelin' Philosophical (step 2 of not-a-pipe (go to Windmill)\\nwithout, Monster: Black Cat\",\n"+
"            \"\\nwith Rat-Faced, Effect: Unusual Fashion Sense (step 2 of albatross necklace (go to Dome))\\nwithout, nothing\"],\n"+
"       169:[\"A Few Chintz Curtains, Some Throw Pillows...\",\n"+
"            \"\\nwith Night Vision: flask of Amontillado \\nwithout: nothing\",\n"+
"            \"\\n+(mainstat) Mus (max 150)\",\n"+
"            \"\\nwith Dancing Prowess: fancy ball mask \\nwithout: nothing\"],\n"+
"\n"+
"       // The Rogue Windmill\n"+
"       170:[\"La Vie Boheme\",\n"+
"            \"\\n+80-100 HP and Effect: Rat-Faced\\n(step 1 of flask of Amontillado (go to Dome) or albatross necklace (go to Mansion))\",\n"+
"            \"\\nMonster: Sensitive poet-type\",\n"+
"            \"\\n+(mainstat) Mox (max 150)\"],\n"+
"       171:[\"Backstage at the Rogue Windmill\",\n"+
"            \"\\nwith Bats in the Belfry, Effect: No Vertigo (step 2 of S.T.L.T (go to Dome))\\nwithout, nothing\",\n"+
"            \"\\n+(mainstat) Mus (max 150)\",\n"+
"            \"\\nwith Spirit of Alph, Effect: Dancing Prowess (Step 2 of fancy ball mask (go to Mansion))\\nwithout, nothing\"],\n"+
"       172:[\"Up in the Hippo Room\",\n"+
"            \"\\nwith Good with the Ladies, acquire Can-Can skirt \\nwithout, Monster: Can-can dancer\",\n"+
"            \"\\nwith Feelin' Philosophical, acquire not-a-pipe \\nwithout, nothing\",\n"+
"            \"\\n+(mainstat) Myst (max 150)\"],\n"+
"\n"+
"       //The Penultimate Fantasy Airship\n"+
"       178:[\"Hammering the Armory\",\"get bronze breastplate\",\"nothing (no adv loss)\"],\n"+
"       182:[\"Random Lack of an Encounter\",\"with +20 ML or more: Monster: MagiMechTech MechaMech\\notherwise: Monster: (a random airship monster that is not the Mech)\",\"Penultimate Fantasy chest\",\"+18-39 to all stats, lose 40-50 HP\"],\n"+
"\n"+
"       // Barrrney's Bar\n"+
"       184:[\"That Explains All The Eyepatches\",\"\\nMyst class: +(1-2x Myst) offstats (max 300), +(2-3x Myst) Myst (max 400), gain 3 drunkenness \\notherwise: Monster: tipsy pirate\",\"\\nMoxie class: +(1-2x Mox) offstats (max 300), +(2-3x Mox) Mox (max 400), gain 3 drunkenness \\notherwise, acquire shot of rotgut\",\"\\nMuscle class: +(1-2x Mus) offstats (max 300), +(2-3x Mus) Mus (max 400), gain 3 drunkenness \\notherwise, acquire shot of rotgut\"],\n"+
"       185:[\"Yes, You're a Rock Starrr\",\"\\n2-5 bottles of gin, rum, vodka, and/or whiskey\",\"\\n2-3 of grog, monkey wrench, redrum, rum and cola, spiced rum, strawberry daiquiri\",\"\\n+50-100 to each stat (scales with drunkenness) OR Monster: tetchy pirate (if at exactly 1 drunkenness)\"],\n"+
"       186:[\"A Test of Testarrrsterone\",\"\\nMyst class: +(some) all stats (max 100)\\notherwise: +(some) Mus and Mox (max 100)\",\"+(some) all stats (max 300), gain 3 drunkenness\",\"+(2x mainstat) Mox (max 150)\"],\n"+
"       187:[\"Arrr You Man Enough?\",\"Play Insult Beer Pong\",\"nothing (no adv loss)\"],\n"+
"       188:[\"The Infiltrationist\",\"\\nin frat outfit: Cap'm Caronch's dentures \\notherwise -95-105 HP\",\"\\nin mullet wig and with briefcase: Cap'm Caronch's dentures \\notherwise -95-105 HP\",\"\\nin frilly skirt and with 3 hot wings: Cap'm Caronch's dentures \\notherwise -90-100 HP\"],\n"+
"       \n"+
"       // The F'c'le\n"+
"       189:[\"O Cap'm, My Cap'm\",\"gain stats or items from the Sea\",\"nothing (no adv loss)\",\"open Nemesis Lair area\"],\n"+
"       191:[\"Chatterboxing\",\"+~110 Mox\",\"\\nwith valuable trinket:\\nbanish Chatty Pirate for 20 adventures (no adv loss)\\nwithout: lose ~14 HP \",\"+~110 Mus\",\"+~110 Myst, lose ~15 HP\"],\n"+
"       \n"+
"       // Sewers\n"+
"       197:[\"Somewhat Higher and Mostly Dry\",\"gain sewer exploration points\",\"fight a sewer monster\",\"increase sewer noncombat rate\"],\n"+
"       198:[\"Disgustin' Junction\",\"gain sewer exploration points\",\"fight a sewer monster\",\"improve sewer exploration point gain\"],\n"+
"       199:[\"The Former or the Ladder\",\"gain sewer exploration points\",\"fight a sewer monster\",\"with someone in cage: free them \\nwith nobody in cage: waste a turn\"],\n"+
"       \n"+
"       // Hobopolis\n"+
"       200:[\"Enter The Hoboverlord\",\"Monster: Hodgman\",\"nothing (no adv loss)\"],\n"+
"       201:[\"Home in the Range\",\"Monster: Ol' Scratch\",\"nothing (no adv loss)\"],\n"+
"       202:[\"Bumpity Bump Bump\",\"Monster: Frosty\",\"nothing (no adv loss)\"],\n"+
"       203:[\"\",\"Monster: Oscus\",\"nothing (no adv loss)\"],\n"+
"       204:[\"\",\"Monster: Zombo\",\"nothing (no adv loss)\"],\n"+
"       205:[\"\",\"Monster: Chester\",\"nothing (no adv loss)\"],\n"+
"       206:[\"Getting Tired\",\"cause Tirevalanche (multikills hot hobos)\",\"increase size of impending Tirevalanche\",\"nothing (no adv loss)\"],\n"+
"       207:[\"Hot Dog!\",\"9000-11000 meat to your clan coffers OR a lot of hot damage\",\"nothing (no adv loss)\"],\n"+
"       208:[\"Ah, So That's Where They've All Gone\",\"decrease stench level of the Heap\",\"nothing (no adv loss)\"],\n"+
"       213:[\"Piping Hot\",\"decrease heat level of Burnbarrel Blvd\",\"nothing (no adv loss)\"],\n"+
"       214:[\"You vs. The Volcano\",\"increase stench level of the Heap\",\"nothing (no adv loss)\"],\n"+
"       215:[\"Piping Cold\",\"decrease heat level of Burnbarrel Blvd\",\"reduce crowd size in PLD\\n(makes it easier to get into the club)\",\"increase cold level in Exposure Esplanade\"],\n"+
"       216:[\"The Compostal Service\",\"decrease spook level of the Burial Ground\",\"nothing (no adv loss)\"],\n"+
"       217:[\"There Goes Fritz!\",\"multikill frozen hobos (repeatable)\",\"multikill frozen hobos (repeatable)\",\"multikill as many frozen hobos as possible (1 time only)\"],\n"+
"       218:[\"I Refuse!\",\"acquire 3 random items and set stench level to 0\",\"set stench level to 0 (no adv loss?)\"],\n"+
"       219:[\"The Furtivity of My City\",\"monster: sleaze hobo\",\"increase stench level of the Heap\",\"4000-6000 meat to your clan coffers\"],\n"+
"       220:[\"Returning to the Tomb\",\"9000-11000 meat to your clan coffers\",\"nothing (no adv loss)\"],\n"+
"       221:[\"A Chiller Night\",\"learn some dance moves\",\"waste a turn\",\"nothing (no adv loss)\"],\n"+
"       222:[\"A Chiller Night\",\"multikill zombie hobos\",\"nothing (no adv loss)\"],\n"+
"       223:[\"Getting Clubbed\",\"if crowd level is low enough, Proceed to Exclusive! (fight, multikill, or stats) \\notherwise: nothing\",\"lower the crowd level\",\"enable dancing in the Burial Ground\"],\n"+
"       224:[\"Exclusive!\",\"Monster: Sleaze Hobo\",\"multikill 10% of remaining sleazy hobos\",\"+(3x mainstat) all stats (max 1000)\"],\n"+
"       225:[\"Attention -- A Tent!\",\"with instrument and no other same-class player already there, get on stage to perform\\n otherwise, nothing (no adv loss)\",\"Proceed to Working the Crowd (view performance, multikill, or collect nickels)\",\"nothing (no adv loss)\"],\n"+
"       226:[\"Here You Are, Up On Stage\",\"gauge the size of the crowd and assist with the multikill\",\"screw up the run\"],\n"+
"       227:[\"Working the Crowd\",\"gauge the size of the crowd\",\"multikill normal hobos\",\"farm nickels\",\"nothing (no adv loss)\"],\n"+
"       231:[\"The Hobo Marketplace\",\"Proceed to choice of (food/booze/a mugging)\",\"Proceed to choice of ((hats/pants/accessories), (combat items/muggers/entertainment), or (valuable trinkets))\",\"Proceed to choice of buffs/tattoo/muggers/MP restore\"],\n"+
"       233:[\"Food Went A-Courtin'\",\"Proceed to choice of Mus/Mys/Mox foods\",\"Proceed to choice of Mus/Mys/Mox boozes\",\"Monster: gang of hobo muggers\"],\n"+
"       235:[\"Food, Glorious Food\",\"Proceed to buy Muscle food\",\"Proceed to buy Mysticality food\",\"Proceed to buy Moxie food\"],\n"+
"       240:[\"Booze, Glorious Booze\",\"Proceed to buy Muscle booze\",\"Proceed to buy Mysticality booze\",\"Proceed to buy Moxie food\"],\n"+
"       245:[\"Math Is Hard\",\"Proceed to choice of (hats/pants/accessories)\",\"Proceed to choice of (combat items/muggers/entertainment)\",\"Proceed to choice of (valuable trinkets/nothing)\"],\n"+
"       248:[\"Garment District\",\"Proceed to choice of (fedora/tophat/wide-brimmed hat)\",\"Proceed to choice of (leggings/dungarees/suit-pants)\",\"Proceed to choice of (shoes/stogie/soap)\"],\n"+
"       253:[\"Housewares\",\"Proceed to choice of (hubcap/caltrop/6-pack of pain)\",\"Monster: gang of hobo muggers\",\"Proceed to choice of (music/pets/muggers)\"],\n"+
"       256:[\"Entertainment\",\"Proceed to buy instrument\",\"Proceed to try for a hobo monkey\",\"Monster: gang of hobo muggers\"],\n"+
"       259:[\"We'll Make Great...\",\"hobo monkey OR +200 to each stat OR Monster: muggers\",\"hobo monkey OR +200 to each stat OR Monster: muggers\",\"hobo monkey OR +200 to each stat OR Monster: muggers\"],\n"+
"       262:[\"Salud\",\"+50% spell damage, +50 spell damage, lose 30-50MP per combat (20 turns)\",\"Proceed to choice of (tanning/paling)\",\"Proceed to choice of (buffs/other buffs/tattoos etc.)\"],\n"+
"       264:[\"Tanning Salon\",\"+50% Moxie (20 turns)\",\"+50% Mysticality (20 turns)\"],\n"+
"       265:[\"Another Part of the Market\",\"Proceed to choice of (spooky resistance/sleaze resistance)\",\"Proceed to choice of (stench resistance/+50% Muscle)\",\"Proceed to choice of (tattoo/muggers/MP restore)\"],\n"+
"       267:[\"Let's All Go To The Movies\",\"Superhuman Spooky Resistance (20 adv)\",\"Superhuman Sleaze Resistance (20 adv)\",\"nothing\"],\n"+
"       268:[\"It's fun to stay there\",\"Superhuman Stench resistance (20 adv)\",\"+50% Muscle (20 adv)\",\"nothing\"],\n"+
"       269:[\"Body Modifications\",\"Proceed to choice of (tattoo/nothing)\",\"Monster: gang of hobo muggers\",\"refill all MP and Buff: -100% Moxie, gain MP during combat (20 adv)\"],\n"+
"       273:[\"The Frigid Air\",\"frozen banquet\",\"8000-12000 meat to your clan coffers\",\"nothing (no adv loss)\"],\n"+
"       276:[\"The Gong Has Been Bung\",\"spend 3 turns at Roachform\",\"spend 12 turns at Mt. Molehill\",\"Form of...Bird! (15 adv)\"],\n"+
"\n"+
"       // Roachform\n"+
"       278:[\"Enter the Roach\",\"+(mainstat) Mus (max 200)\\n leads to choice of Mox/Mus/MP, then to Mus/allstat/itemdrop/ML buffs\", \"+(mainstat) myst (max 200)\\n leads to choice of Mys/Mus/MP, then to Myst/allstat/itemdrop/ML buffs\",\"+(mainstat) Mox (max 200)\\n leads to choice of Mox/Mys/MP, then to Mox/allstat/itemdrop/ML buffs\"],\n"+
"       279:[\"It's Nukyuhlur - the 'S' is Silent.\",\"+(mainstat) Mox (max 200)\\n leads to choice of +30% Mus/+10% all stats/+30 ML\",\"+(mainstat) Mus (max 200)\\n leads to choice of +30% Mus/+10% all stats/+50% item drops\",\"+(mainstat) MP (max 200)\\n leads to choice of +30% Mus/+50% item drops/+30 ML\"],\n"+
"       280:[\"Eek!  Eek!\",\"+(mainstat) myst (max 200)\\n leads to choice of +30% Myst/+30 ML/+10% all stats\",\"+(mainstat) Mus (max 200)\\n leads to choice of +50% item drops/+10% all stats/+30% Myst\",\"+(mainstat) MP (max 200)\\n leads to choice of +30 ML/+30% Myst/+50% item drops\"],\n"+
"       281:[\"A Meta-Metamorphosis\",\"+(mainstat) Mox (max 200)\\n leads to choice of +30 ML/+30% Mox/+10% all stats\",\"+(mainstat) myst (max 200)\\n leads to choice of +30 ML/+30% Mox/+50% item drops\",\"+(mainstat) MP (max 200)\\n leads to choice of +30% Mox/+10% all stats/+50% item drops\"],\n"+
"       282:[\"You've Got Wings, But No Wingman\",\"+30% Muscle (20 turns)\",\"+10% all stats (20 turns)\",\"+30 ML (20 turns)\"],\n"+
"       283:[\"Time Enough At Last!\",\"+30% Muscle (20 turns)\",\"+10% all stats (20 turns)\",\"+50% item drops (20 turns)\"],\n"+
"       284:[\"Scavenger is your Middle Name\",\"+30% Muscle (20 turns)\",\"+50% item drops (20 turns)\",\"+30 ML (20 turns)\"],\n"+
"       285:[\"Bugging Out\",\"+30% myst (20 turns)\",\"+30 ML (20 turns)\",\"+10% all stats (20 turns)\"],\n"+
"       286:[\"A Sweeping Generalization\",\"+50% item drops (20 turns)\",\"+10% all stats (20 turns)\",\"+30% myst (20 turns)\"],\n"+
"       287:[\"In the Frigid Aire\",\"+30 ML (20 turns)\",\"+30% myst (20 turns)\",\"+50% item drops (20 turns)\"],\n"+
"       288:[\"Our House\",\"+30 ML (20 turns)\",\"+30% Moxie (20 turns)\",\"+10% all stats (20 turns)\"],  \n"+
"       289:[\"Workin' For the Man\",\"+30 ML (20 turns)\",\"+30% Moxie (20 turns)\",\"+50% item drops (20 turns)\"],   \n"+
"       290:[\"The World's Not Fair\",\"+30% Moxie (20 turns)\",\"+10% all stats (20 turns)\",\"+50% item drops (20 turns)\"],\n"+
"       \n"+
"       //Haiku Dungeon\n"+
"       297:[\"Gravy Fairy Ring\",\"2-3 of Knob, Knoll, and/or spooky mushroom\",\"fairy gravy boat\",\"nothing (no adv loss)\"],\n"+
"       \n"+
"       //underwater\n"+
"       298:[\"In the Shade\",\"with soggy seed packet and glob of green slime: acquire 1 sea fruit \\nwithout: nothing\",\"nothing (no adv loss?\"],\n"+
"       299:[\"Down at the Hatch\",\"first time: free Big Brother\\nafterward: upgrade monsters in the Wreck for 20 turns\",\"nothing (no adv loss)\"],\n"+
"       304:[\"A Vent Horizon\",\"first 3 times: summon bubbling tempura batter\",\"nothing (no adv loss)\"],\n"+
"       305:[\"There is Sauce at the Bottom of the Ocean\",\"with Mer-kin pressureglobe: acquire globe of Deep Sauce\\n without: nothing (no adv loss)\",\"nothing (no adv loss)\"],\n"+
"       309:[\"Barback\",\"first 3 times: acquire Seaode\",\"nothing (no adv loss)\"],\n"+
"       311:[\"Heavily Invested in Pun Futures\",\"Proceed to trade dull/rough fish scales\",\"nothing (no adv loss)\"],\n"+
"       403:[\"Picking Sides\",\"skate blade (allows fighting ice skates)\",\"brand new key (allows fighting roller skates)\"],\n"+
"       \n"+
"       //slimetube\n"+
"       326:[\"Showdown\",\"Monster: Mother Slime\",\"nothing (no adv loss)\"],\n"+
"       337:[\"Engulfed!\",\"\\nfirst time: enable an equipment-sliming\\nafterward: nothing (no adv loss)\",\"\\nfirst time (and only 5 times per tube, total): increase tube ML by 20\\nafterward: nothing (no adv loss)\",\"nothing (no adv loss)\"],\n"+
"       \n"+
"       //agua bottle\n"+
"       349:[\"The Primordial Directive\",\"after using memory of some delicious amino acids: progress to fight monsters\\nbefore: nothing\",\"+10 Mox\",\"without memory of some delicious amino acids: acquire memory of some delicious etc.\\nwith: nothing\"],\n"+
"       350:[\"Soupercharged\",\"Monster: Cyrus\",\"nothing\"],\n"+
"       352:[\"Savior Faire\",\"+25 Mox\",\"+25 Mus\",\"+25 Myst\"],\n"+
"       353:[\"Bad Reception Down Here\",\"Indigo Party Invitation (leads to Moxie choices)\",\"Violet Hunt Invitation (leads to stat/fam wt choices)\"],\n"+
"       354:[\"\",\"+some Mox (max 200?)\",\"+15% Moxie (20 turns)\"],\n"+
"       355:[\"\",\"+some mus, myst, and mox (max ???)\",\"+4 lb familiar weight (20 turns)\"],\n"+
"       356:[\"A Diseased Procurer\",\"Blue Milk Club Card (leads to stats/item drop buff)\",\"Mecha Mayhem Club Card (leads to Muscle choices)\"],\n"+
"       357:[\"Painful, Circuitous Logic\",\"+some Mus (max 200?)\",\"+15% Muscle (20 turns)\"],\n"+
"       358:[\"Brings All the Boys to the Blue Yard\",\"+some Mus, Myst, Mox (max 200 each)\",\"+20% item drops (20 turns)\"],\n"+
"       361:[\"Give it a Shot\",\"'Smuggler Shot First' button (leads to Myst choices)\",\"Spacefleet Communicator Badge (leads to stats/meat drop buff)\"],\n"+
"       362:[\"A Bridge Too Far\",\"+some mus, myst, and mox (max 200?)\",\"+35% meat drops (20 turns)\"],\n"+
"       363:[\"\",\"+some Myst (max 200?)\",\"+15% Myst (20 turns)\"],\n"+
"       364:[\"\",\"+some Mox (max 200?)\",\"Supreme Being Glossary (advance quest state)\",\"+some Mus (max 200?)\"],\n"+
"       365:[\"None Shall Pass\",\"-30 meat, +50 Mus\",\"-60 meat, multi-pass (advance quest state)\",\"nothing (no adv loss??)\"],\n"+
"       \n"+
"       //marbles\n"+
"       393:[\"The Collector\",\"lose 1 of each marble, gain 32768 meat, qualify for trophy\",\"nothing\"],\n"+
"       \n"+
"       //Down the rabbit hole\n"+
"       441:[\"The Mad Tea Party\",\"\\nacquire a buff based on your hat name\",\"nothing\"],\n"+
"       442:[\"A Moment of Reflection\",\n"+
"           \"\\nas Seal Clubber: Walrus Ice Cream or yellow matter custard\\nas Pastamancer: eggman noodles or yellow matter custard\\notherwise: yellow matter custard\",\n"+
"           \"\\nas Sauceror: vial of jus de larmes or delicious comfit\\nas Accordion Thief: missing wine or delicious comfit\\notherwise: delicious comfit\",\n"+
"           \"\\nas Disco Bandit: Lobster qua Grill or monster: croqueteer\\nas Turtle Tamer: beautiful soup or monster: croqueteer\\notherwise: monster: croqueteer\",\n"+
"           \"\\nwith beautiful soup, lobster qua grill, missing wine, walrus ice cream, and humpty dumplings:\\nacquire ittah bittah hookah\\n(if you already have an ittah bittah hookah: 20 turns of a random effect)\\nwithout all 5 courses: nothing\",\n"+
"           \"\\nplay a chess puzzle\",\n"+
"           \"\\nnothing\"],\n"+
"           //Seal Clubber\n"+
"       444:[\"The Field of Strawberries\",\"walrus ice cream\",\"yellow matter custard\"],\n"+
"           //Pastamancer\n"+
"       445:[\"The Field of Strawberries\",\"eggman noodles\",\"yellow matter custard\"],\n"+
"           //Accordion Thief\n"+
"       446:[\"A Caucus Racetrack\",\"missing wine\",\"delicious comfit\"],\n"+
"           //Sauceror\n"+
"       447:[\"A Caucus Racetrack\",\"vial of jus de larmes\",\"delicious comfit\"],\n"+
"           //Turtle Tamer\n"+
"       448:[\"The Croquet Grounds\",\"beautiful soup\",\"monster: croqueteer\"],\n"+
"           //Disco Bandit\n"+
"       449:[\"The Croquet Grounds\",\"Lobster qua Grill\",\"monster: croqueteer\"],\n"+
"       450:[\"The Duchess' Cottage\",\n"+
"           \"\\nwith beautiful soup, lobster qua grill, missing wine, walrus ice cream, and humpty dumplings: \\nacquire ittah bittah hookah\\n(if you already have an ittah bittah hookah: 20 turns of a random effect)\\nwithout all 5 courses: nothing\",\n"+
"           \"nothing\"],\n"+
"           \n"+
"       //Enormous > sign\n"+
"       451:[\"Typographical Clutter\",\"acquire (\",\"lose 30 meat, +10-15 Mox\\nOR\\ngain 500 meat, +10-15 Mox\",\"acquire + (first time) or +10-15 Mus\",\"+10-15 myst, +100 MP\",\"teleportitis (5 turns)\"],\n"+
"           \n"+
"       //Professor Jacking\n"+
"       452:[\"Leave a message and I'll call you back\",\"\\nwith raisin in machine: kill spider\\nwithout: lose (all?) HP\",\n"+
"                                                     \"\\nif spider alive: tiny fly glasses\\nif spider dead: Flyest of Shirts (if torso-aware)/nothing\",\n"+
"                                                     \"\\nif fruit in machine: 3 fruit\\notherwise nothing\"],\n"+
"       453:[\"Getting a leg up\",\"fight jungle scabie\",\"gain 30-40 mus, mys, and mox\",\"acquire hair of the calf\"],\n"+
"       454:[\"Just Like the Ocean Under the Moon\",\"fight smooth jazz scabie\",\"gain 90-100 HP and 90-100 MP\"],\n"+
"       455:[\"Double Trouble in the Stubble\",\"gain 50-60 mus, mys, and mox\",\"\\mwith can-you-dig-it:acquire legendary beat\\nwithout: lose (lots of) HP\"],\n"+
"       456:[\"Made it, Ma!  Top of the world!\",\"Fight The Whole Kingdom\",\"effect: Hurricane Force\",\"acquire a dance upon the palate (first time only)\",\"gain 31-40 mus, mys, and mox\"],\n"+
"       \n"+
"                                           \n"+
"       //Kegger in the woods\n"+
"       457:[\"Oh no!  Five-Oh!\",\"\\nClose area and receive reward:\\n<10 numbers: Bronze Handcuffs\\n10-19: cuffs, Silver Keg\\n20+:cuffs, keg, bottle of GoldSchnockered\",\"nothing (keep area open)\"],\n"+
"       \n"+
"       //Neckback Crick\n"+
"       497:[\"SHAFT!\",\"Fight unearthed monstrosity\",\"nothing\"]\n"+
"       };\n"+
"       \n"+
"       var inputs = localp.document.getElementsByTagName('input'); // [clump]\n"+
"       var choicenumber = 0;\n"+
"       var cval = -1;\n"+
"       var thisopt;\n"+
"       if (inputs) {\n"+
"           for (var n=0; n<inputs.length;n++)  {\n"+
"               if (inputs[n].name==\"whichchoice\" && choicenumber == 0) {     // identify adventure!\n"+
"                   choicenumber = inputs[n].value;\n"+
"                   thisopt = advOptions[choicenumber];\n"+
"               } else if (inputs[n].name==\"option\") {                            // identify button!\n"+
"                   cval = inputs[n].value;\n"+
"               } else if (choicenumber != 0 && inputs[n].type == \"submit\") { // modify button!\n"+
"                   inputs[n].value += \" -- \" + thisopt[cval] + \"\";\n"+
"               }\n"+
"           }\n"+
"       }\n"+
"   } else  if (fname == \"/basement.php\") {   // for the basement, we use the image name to figure out the choice.\n"+
"       var basementOptions = {\n"+
"       \"twojackets.gif\":[\"twojackets\",\"+(mainstat) Mox\",\"+(mainstat) Mus\"],\n"+
"       \"twopills.gif\":[\"twopills\",\"+(mainstat) Mus\",\"+(mainstat) Myst\"],\n"+
"       \"figurecard.gif\":[\"figurecard\",\"+(mainstat) Myst\",\"+(mainstat) Mox\"]\n"+
"       };\n"+
"       // pick off \"filename.gif\" from \"http://images.kingdomofloathing.com/adventureimages/filename.gif\"\n"+
"       var imgfile = localp.document.getElementsByTagName('img')[0].src.split('/')[4];  // [clump]\n"+
"       var inputs = localp.document.getElementsByTagName('input');  // [clump]\n"+
"       var choicenumber = 1;\n"+
"       var thisopt = basementOptions[imgfile];\n"+
"       if (inputs.length && thisopt) {\n"+
"           for (var n=0; n<inputs.length; n++) {\n"+
"               if (inputs[n] && inputs[n].type == \"submit\") inputs[n].value += \" -- \" + thisopt[choicenumber++];\n"+
"           }\n"+
"       }\n"+
"   } else {    // for other stuff, we brute-force a string search since the buff areas aren't standardized.\n"+
"       // Buff areas\n"+
"       var otherOptions = {\n"+
"           // The Friars\n"+
"           0:[\"Brother Flying Burrito, the Deep Fat Friar\",\"+30% food drops (20 adv)\"],\n"+
"           1:[\"Brother Corsican, the Deep Fat Friar\",\"+2 familiar experience per combat (20 adv)\"],\n"+
"           2:[\"Brother Smothers, the Deep Fat Friar\",\"+30% booze drops (20 adv)\"],\n"+
"           // The Nuns\n"+
"           3:[\"Get Healed\",\"+1,000 HP\"],\n"+
"           4:[\"Get a Massage\",\"+1,000 HP, +1,000 MP\"],\n"+
"           // The Arena\n"+
"           5:[\"Party with the free spirits\",\"+5 stats per combat (20 adv)\",\"+~20% item drops (20 adv)\",\"+5lb familiar weight (20 adv)\"],\n"+
"           6:[\"Try to get into the music\",\"+10% all stats (20 adv)\",\"+40% meat drops (20 adv)\",\"+50% initiative (20 adv)\"],\n"+
"           // Clan VIP Pool Table\n"+
"           7:[\"You approach the pool table.\",\"+5 lb familiar weight/+50% weapon damage (10 adv)\",\"+10 MP/turn, +50% spell damage (10 adv)\",\"+10% item drops, +50% initiative (10 adv)\"],\n"+
"           // funky choice in the palindome--apparently the listboxes make this use its own palinshelves.php page instead of choice.php.\n"+
"           8:[\"Drawn Onward\",\"\\nwith photo of God, hard rock candy, ketchup hound and ostrich egg on the shelves: \\nmeet Dr. Awkward and get beaten up \\nwithout: nothing (no adv loss)\",\"nothing (no adv loss)\"],\n"+
"           // Rumpus Room: jukebox, ballpit, chips\n"+
"           9:[\"This jukebox has a staggering\",\"+10% meat drops (10 turns)\",\"+3 stats per combat (10 turns)\",\"+10% item drops (10 turns)\",\"+20% initiative (10 turns)\"],\n"+
"           10:[\"There's a ball pit here with\",\"+(balls/100)% to all stats (20 turns)\"],\n"+
"           11:[\"Unfortunately for you, only the three least popular flavors\",\"an item giving +30 Mox (10 turns)\",\"an item giving +30 Mus (10 turns)\",\"an item giving +30 Mysticality (10 turns)\"]\n"+
"       };\n"+
"//     GM_log(\"checking for buff areas\");\n"+
"       bodyHTML = localp.document.getElementsByTagName('body')[0].innerHTML;  // [clump]\n"+
"       for (var i in otherOptions) {\n"+
"           if (bodyHTML.indexOf(otherOptions[i][0]) != -1) {\n"+
"               var inputs = localp.document.getElementsByTagName('input');  // [clump]\n"+
"               n = 1;\n"+
"               for (var j=0;j<inputs.length;j++) {\n"+
"                   if (inputs[j] && inputs[j].type == \"submit\") {\n"+
"                       inputs[j].value += \" -- \" + otherOptions[i][n++];\n"+
"                   }\n"+
"               }\n"+
"               break;\n"+
"           }\n"+
"       }\n"+
"   }\n"+
"}\n"+
"       }\n"+
"   });\n"+
"\n"+ // [clump] end of insert choiceadv options
"Object.extend(framework.view,{\n"+  // [clump] start of insert leaflet
"   strangeLeaflet : {\n"+
"       init : function() {\n"+
"           framework.controller.utils.addToScriptQueue(\"inv\",framework.view.strangeLeaflet.executeStrangeLeaflet);\n"+
"           framework.controller.utils.addToScriptQueue(\"main\",framework.view.strangeLeaflet.executeStrangeLeaflet);\n"+
"       },\n"+
"       slState : \"preChest\",\n"+
"       pages : {\n"+
"           \"West of House\" : {\n"+
"               preChest : {\n"+
"                   \"The house's front door is closed.\" : \"open door\",\n"+
"                   \"You open the door.\" : \"east\",\n"+
"                   \"The front door of the house is standing open.\" : \"east\",\n"+
"                   \"You leave the house.\" : \"north\"\n"+
"               },\n"+
"               postChest : {\n"+
"                   \"*\" : \"east\",\n"+
"                   \"You leave the house.\" : \"south\"\n"+
"               }\n"+
"           },\n"+
"\n"+
"           \"In the House\" : {\n"+
"               preChest : {\n"+
"                   \"An ornate sword hangs above the mantel.\" : \"get sword\",\n"+
"                   \"*\" : \"west\"\n"+
"               },\n"+
"               postChest : {\n"+
"                   \"You enter the house\" : \"look tinder\",\n"+
"                   \"The fireplace is unlit.\" : \"look tinder\",\n"+
"                   \"Bits of torn and wadded newspaper\" : \"look fireplace\",\n"+
"                   \"large pair of boots\" : \"get boots\",\n"+
"                   \"At this point, it's not so much tinder as ash\" : \"get boots\",\n"+
"                   \"Okay, got 'em\" : \"wear boots\",\n"+
"                   \"You've already got the boots\" : \"wear boots\",\n"+
"                   \"With some difficulty, you strap on the boots\" : \"west\",\n"+
"                   \"Since you're already wearing them\" : \"west\",\n"+
"\n"+
"                   \"A model ship inside a bottle sits on the mantelpiece.\" : function() {\n"+
"                       alert(\"WRITE THIS DOWN. Your Secret Code is: yoho\");\n"+
"                       return \"light fireplace\";\n"+
"                   },\n"+
"                   \"A carved driftwood bird sits on the mantelpiece.\" : function() {\n"+
"                       alert(\"WRITE THIS DOWN. Your Secret Code is: plover\");\n"+
"                       return \"light fireplace\";\n"+
"                   },\n"+
"                   \"A ceramic model of a small white house sits on the mantelpiece.\" : function() {\n"+
"                       alert(\"WRITE THIS DOWN. Your Secret Code is: xyzzy\");\n"+
"                       return \"light fireplace\";\n"+
"                   },\n"+
"                   \"A ceramic model of a small brick building sits on the mantelpiece.\" : function() {\n"+
"                       alert(\"WRITE THIS DOWN. Your Secret Code is: plugh\");\n"+
"                       return \"light fireplace\";\n"+
"                   },\n"+
"                   \"A brass bowling trophy sits on the mantelpiece.\" : function() {\n"+
"                       return \"take trophy\";\n"+
"                   }\n"+
"               }\n"+
"           },\n"+
"\n"+
"           \"North of the Field\" : {\n"+
"               preChest : {\n"+
"                   \"*\" : \"west\",\n"+
"                   \"You pick up the stick.\" : \"cut hedge\",\n"+
"                   \"A thick hedge blocks the way to the west.\" : \"cut hedge\",\n"+
"                   \"You walk north from the field.\" : \"get stick\",\n"+
"                   \"A hefty stick lies on the ground.\" : \"get stick\",\n"+
"                   \"You leave the clearing.\" : \"north\"\n"+
"               },\n"+
"               postChest : {\n"+
"                   \"You exit the cave.\" : \"south\"\n"+
"               }\n"+
"           },\n"+
"           \"Forest Clearing\" : {\n"+
"               preChest : {\n"+
"                   \"There is a huge, crackling bonfire here.\" : \"light stick\",\n"+
"                   \"You don't know what words mean, do you?\" : \"east\",\n"+
"                   \"I don't understand that...\" : \"east\",\n"+
"                   \"You're using words I don't know...\" : \"east\",\n"+
"                   \"Do what with the what, now?\" : \"east\",\n"+
"                   \"You hold the stick in the flames until it lights.\" : \"east\",\n"+
"                   \"You go west.\" : \"light stick\"\n"+
"               }\n"+
"           },\n"+
"           \"Cave\" : {\n"+
"               preChest : {\n"+
"                   \"You walk into the cave, your torch aloft.\" : \"kill serpent\",\n"+
"                   \"dangerous-looking serpent coiled around it\" : \"kill serpent\",\n"+
"                   \"surrounded by hacked-up serpent bits\" : \"open chest\",\n"+
"                   \"An empty treasure chest sits near the rear wall.\" : \"look behind chest\",\n"+
"                   \"You discover a tiny hole in the wall behind the chest.\" : \"look in hole\",\n"+
"                   \"You check to make sure the hole is still there.\" : \"look in hole\",\n"+
"                   \"You find a grue egg in the hole!\" : function() {\n"+
"                       framework.view.strangeLeaflet.slState = \"postChest\";\n"+
"                       return \"south\";\n"+
"                   },\n"+
"                   \"There's nothing else in the hole.\" : function() {\n"+
"                       framework.view.strangeLeaflet.slState = \"postChest\";\n"+
"                       return \"south\";\n"+
"                   }\n"+
"               }\n"+
"           },\n"+
"           \"South Bank\" : {\n"+
"               commands : {\n"+
"                   \"You are on the southern bank of a wide stream\" : function() {\n"+
"                       framework.view.strangeLeaflet.addNote(\"WARNING: Proceeding further will eliminate your opportunity for using the secret code.\");\n"+
"                       return \"south\";\n"+
"                   }\n"+
"               }\n"+
"           },\n"+
"           \"Forest\" : {\n"+
"               commands : {\n"+
"          \"foliage lead north\" : \"north\",\n"+
"          \"foliage lead south\" : \"south\",\n"+
"          \"foliage lead east\" : \"east\",\n"+
"          \"foliage lead west\" : \"west\"\n"+
"               }\n"+
"           },\n"+
"           \"On the other side of the forest maze...\" : {\n"+
"               commands : {\n"+
"                   \"*\" : \"up\",\n"+
"                   \"You carefully make your way back down to the forest floor\" : \"look in leaves\"\n"+
"               }\n"+
"           },\n"+
"           \"Halfway Up The Tree\" : {\n"+
"               commands : {\n"+
"                   \"You hoist yourself into the lower branches of the tree and start climbing.\" : \"throw ruby bowl\",\n"+
"                   \"large egg encrusted with precious jewels\" : \"get egg\",\n"+
"                   \"manage to get the egg without losing your grip on the tree\" : \"throw egg roadrunner\",\n"+
"                   \"You've already got the egg\" : \"throw egg roadrunner\",\n"+
"                   \"the ruby, which plummets past you\" : \"down\",\n"+
"                   \"You don't have a ruby\" : \"down\",\n"+
"                   \"You snatch the scroll out of the air as it flutters down\" : \"gnusto cleesh\",\n"+
"                   \"Both the Gnusto scroll and the Cleesh scroll crumble into dust\" : \"up\"\n"+
"               }\n"+
"           },\n"+
"\n"+
"           \"Tabletop\" : {\n"+
"               commands : {\n"+
"                   \"How about a guessing game?\" : \"cleesh giant\",\n"+
"                   \"Giant's pinky ring\" : \"get ring\",\n"+
"                   \"You acquire an item\" : function() {\n"+
"                       framework.view.strangeLeaflet.addNote(\"DONE!\");\n"+
"                       return \"exit\";\n"+
"                   }\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"\n"+
"       addNote : function(txt) {\n"+
"           var currentPane = framework.model.interfaceData.currentPane;\n"+
"           var tds = currentPane.document.getElementsByTagName(\"td\");\n"+
"           var element = tds[2];\n"+
"           var html = tds[2].innerHTML;\n"+
"           element.innerHTML = \"<div style=\\\"color:red;font-weight:bold;padding:10px;\\\">\" + txt + \"</div>\" + html;\n"+
"       },\n"+
"       \n"+
"       executeStrangeLeaflet : function() {\n"+
"           var localp = (invpane.location.pathname.indexOf(\"/leaflet.php\")==0) ? invpane :\n"+
"                         ((mainpane.location.pathname.indexOf(\"/leaflet.php\")==0) ? mainpane : null);\n"+
"           if (localp) {\n"+
"               var body = localp.document.body;\n"+
"               var bodyHTML = body.innerHTML;\n"+
"               var tds = localp.document.getElementsByTagName(\"td\");\n"+
"               var pageTitle = tds[0].innerHTML.replace(/<.{0,1}b>/gi,\"\");\n"+
"               var pageDesc = tds[2].innerHTML;\n"+
"               var command = \"\";\n"+
"               \n"+
"               var page = framework.view.strangeLeaflet.pages[pageTitle];\n"+
"               if (page) {\n"+
"                   var commandSet = page[framework.view.strangeLeaflet.slState];\n"+
"                   if (!commandSet) commandSet = page[\"commands\"];\n"+
"                   Object.keys(commandSet).each(function(key) {\n"+
"                       if (pageDesc.indexOf(key) != -1) {\n"+
"                           command = commandSet[key];\n"+
"                           $break;\n"+
"                       }\n"+
"                   });\n"+
"                   if (!command && commandSet[\"*\"]) {\n"+
"                       command = commandSet[\"*\"];\n"+
"                    }\n"+
"                   if (typeof command == \"function\") {\n"+
"                       command = command();\n"+
"                   }\n"+
"               }\n"+
"               localp.document.forms[\"whatnow\"].command.value = command;\n"+
"           }\n"+
"       }\n"+
"   }\n"+
"});\n"+
"\n"+ // [clump] end of insert leaflet
"Object.extend(framework.controller,{\n"+
"   timers : {\n"+
"       advHistoryTimer : null,\n"+
"       tabRolloverTimer : null,\n"+
"       loadEffTimer : null\n"+
"   },\n"+
"   \n"+
"   lastResultsDisplay : \"\",\n"+
"\n"+
"   resize : {\n"+
"       menuW : 0,\n"+
"       dragTarget : null,\n"+
"   },\n"+
"       \n"+
"   constants : {\n"+
"       pageStates : {\n"+
"           \"/game.php\" : \"main\",\n"+
"           \"/main_c.html\" : \"main\",\n"+
"           \"/main.html\" : \"main\",\n"+
"           \"/login.php\" : \"login\",\n"+
"           \"/desc_item.php\" : \"panel\"\n"+
"       }\n"+
"   },\n"+
"\n"+
"   init : {\n"+
"       main : function() {\n"+
"           this.data();\n"+
"           if (framework.model.interfaceData.scriptsTotal == 0) this.view();\n"+
"       },\n"+
"       \n"+
"       data : function() {\n"+
"           framework.controller.setPageState();\n"+
"           framework.controller.setUserScripts();\n"+
"       },\n"+
"       \n"+
"       view : function() {\n"+
"           var pageState = framework.model.pageState;\n"+
"           if (pageState == \"login\") {\n"+
"               framework.view.login.initializeLoginPage();\n"+
"           } else if (pageState == \"main\") {\n"+
"               framework.view.main.initializeMainPage();\n"+
"               framework.controller.setResizeHandler();\n"+
"           }\n"+
"       }\n"+
"   },\n"+
"\n"+
"   utils : {\n"+
"       getCookie : function(cName) {\n"+
"           var strC = document.cookie;\n"+
"           var s = cName + \"=\";\n"+
"           var i1 = strC.indexOf(\"; \" + s);\n"+
"           if (i1 == -1) {\n"+
"               i1 = strC.indexOf(s);\n"+
"               if (i1 != 0) return null;\n"+
"           } else {\n"+
"               i1 += 2;\n"+
"           }\n"+
"           var i2 = document.cookie.indexOf(\";\", i1);\n"+
"           if (i2 == -1) i2 = strC.length;\n"+
"           return unescape(strC.substring(i1 + s.length, i2));\n"+
"       },\n"+
"       \n"+
"       getCookieVar : function(cName, arg) {\n"+
"           var cVal = this.getCookie(cName);\n"+
"           var cStr = (cVal == 0 ? \"\" : cVal);\n"+
"           if (cStr && cStr.indexOf(arg) != -1) {\n"+
"               var i1 = cStr.indexOf(arg);\n"+
"               var i2 = cStr.indexOf(\"&\", i1);\n"+
"               if (i2 == -1) i2 = cStr.length;\n"+
"               var strVars = cStr.substring(i1,i2);\n"+
"               var i1 = (strVars.indexOf(\"=\") + 1);\n"+
"               var i2 = strVars.length;\n"+
"               var strVars = strVars.substring(i1,i2);\n"+
"               strVars = unescape(strVars);\n"+
"           } else {\n"+
"               var strVars = \"\";\n"+
"           }\n"+
"           return strVars;\n"+
"       },\n"+
"       \n"+
"       setCookieVar : function(cName,arg,val) {\n"+
"           var strC = document.cookie;\n"+
"           var s = cName + \"=\";\n"+
"           var g1 = strC.indexOf(\"; \" + s);\n"+
"           if (g1 == -1) {\n"+
"               g1 = strC.indexOf(s);\n"+
"               if (g1 != 0) strC = \"\";\n"+
"           } else {\n"+
"               g1 += 2;\n"+
"           }\n"+
"           var g2 = document.cookie.indexOf(\";\", g1);\n"+
"           if (g2 == -1) g2 = strC.length;\n"+
"           strC = unescape(strC.substring(g1 + s.length, g2));\n"+
"           var i1 = strC.indexOf(arg+\"=\");\n"+
"           if (i1 != -1) {\n"+
"               i1 += arg.length+1;\n"+
"               var i2 = strC.indexOf(\"&\",i1);\n"+
"               if (i2 == -1) i2 = strC.length;\n"+
"               var strC1 = strC.substring(0,i1) + val + strC.substring(i2,strC.length);\n"+
"           } else {\n"+
"               strC1 = strC + (strC.length > 0 ? \"&\" : \"\") + arg + \"=\" + val;\n"+
"           }\n"+
"           this.setCookie(cName,strC1);\n"+
"       },\n"+
"       \n"+
"       setCookie : function(cName,val) {\n"+
"           var today = new Date().valueOf();\n"+
"           var t = new Date(today+200*86400000);\n"+
"           var domain = (location.hostname.indexOf(\"kingdomofloathing.com\") != -1 ? \"kingdomofloathing.com\" : location.hostname)\n"+
"           document.cookie = cName + \"=\" + escape(val) + \"; expires=\" + t + \"; domain=\" + domain;\n"+
"       },\n"+
"       \n"+
"       clearAllCookies : function() {\n"+
"           var utils = framework.controller.utils;\n"+
"           utils.setCookie('tardFramework','');\n"+
"           utils.setCookie('tardMenu','');\n"+
"           utils.setCookie('tardPetRack','');\n"+
"           window.location.reload();\n"+
"       },\n"+
"       \n"+
"       addStyle : function(css) {\n"+
"           var head, style;\n"+
"           head = $$('head')[0];\n"+
"           if (head) {\n"+
"               style = (new Element('style',{\n"+
"                   type : \"text/css\"\n"+
"               })).update(css);\n"+
"               head.appendChild(style);\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       loadScript : function(src,callBack) {\n"+
"           var head = $$('head')[0];\n"+
"           if (head) {\n"+
"               var script = new Element('script',{\n"+
"                   type : \"text/javascript\",\n"+
"                   src : src\n"+
"               });\n"+
"               script.onload = function() {\n"+
"                   var interfaceData = framework.model.interfaceData;\n"+
"                   interfaceData.scriptsLoaded++;\n"+
"                   if (callBack) callBack();\n"+
"                   if (interfaceData.scriptsLoaded == interfaceData.scriptsTotal) framework.controller.init.view();\n"+
"               }\n"+
"\n"+
"               head.appendChild(script);\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       addToScriptQueue : function(pane, method) {\n"+
"           framework.model.interfaceData.scriptQueue[pane].push(method);\n"+
"       },\n"+
"       \n"+
"       checkScriptQueue : function(pane) {\n"+
"           if (pane == \"all\") {\n"+
"               var panes = Object.keys(framework.model.interfaceData.scriptQueue);\n"+
"               panes.each(function(pane) {\n"+
"                   var methods = framework.model.interfaceData.scriptQueue[pane];\n"+
"                   if (methods) {\n"+
"                       methods.each(function(method) {\n"+
"                           method();\n"+
"                       });\n"+
"                   }\n"+
"               });\n"+
"           } else {\n"+
"               if (framework.model.userData.isLoaded == true) {\n"+
"                   var methods = framework.model.interfaceData.scriptQueue[pane];\n"+
"                   if (methods) {\n"+
"                       methods.each(function(method) {\n"+
"                           method();\n"+
"                       });\n"+
"                   }\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       addPanelTab : function(tabHTML, containerHTML) {\n"+
"           $('configPanelTabs').innerHTML += tabHTML;\n"+
"           $('configPanelContainers').innerHTML += containerHTML;\n"+
"           framework.view.main.initializeConfigPanel();\n"+
"       },\n"+
"       \n"+
"       getCharMP : function() {\n"+
"           var bodyHTML = charpane.document.body.innerHTML;\n"+
"           if (framework.model.interfaceData.isFullMode) {\n"+
"               var i1 = bodyHTML.indexOf(\"mp.gif\");\n"+
"               var i2 = bodyHTML.indexOf('\"black\">',i1)+8;\n"+
"               var i3 = bodyHTML.indexOf(\"&nbsp;/\",i2);\n"+
"           } else {\n"+
"               var i1 = bodyHTML.indexOf(\"MP:\");\n"+
"               var i2 = bodyHTML.indexOf(\"<b>\",i1)+3;\n"+
"               var i3 = bodyHTML.indexOf(\"/\",i2);\n"+
"           }\n"+
"           var charMP = bodyHTML.substring(i2,i3);\n"+
"           return charMP;\n"+
"       },\n"+
"\n"+
"       // ====================================================================\n"+
"       //       URLEncode and URLDecode functions\n"+
"       //\n"+
"       // Copyright Albion Research Ltd. 2002\n"+
"       // http://www.albionresearch.com/\n"+
"       //\n"+
"       // You may copy these functions providing that \n"+
"       // (a) you leave this copyright notice intact, and \n"+
"       // (b) if you use these functions on a publicly accessible\n"+
"       //     web site you include a credit somewhere on the web site \n"+
"       //     with a link back to http://www.albionresarch.com/\n"+
"       //\n"+
"       // If you find or fix any bugs, please let us know at albionresearch.com\n"+
"       //\n"+
"       // SpecialThanks to Neelesh Thakur for being the first to\n"+
"       // report a bug in URLDecode() - now fixed 2003-02-19.\n"+
"       // ====================================================================\n"+
"       URLEncode : function(x) {\n"+
"           // The Javascript escape and unescape functions do not correspond\n"+
"           // with what browsers actually do...\n"+
"           var SAFECHARS = \"0123456789\" +                    // Numeric\n"+
"                           \"ABCDEFGHIJKLMNOPQRSTUVWXYZ\" +    // Alphabetic\n"+
"                           \"abcdefghijklmnopqrstuvwxyz\" +\n"+
"                           \"-_.!~*'()\";                  // RFC2396 Mark characters\n"+
"           var HEX = \"0123456789ABCDEF\";\n"+
"       \n"+
"           var plaintext = x;\n"+
"           var encoded = \"\";\n"+
"           for (var i = 0; i < plaintext.length; i++ ) {\n"+
"               var ch = plaintext.charAt(i);\n"+
"               if (ch==\"+\") {\n"+
"                   encoded+=\"%2B\";\n"+
"               } else if (ch == \" \") {\n"+
"                   encoded += \"+\";               // x-www-urlencoded, rather than %20\n"+
"               } else if (SAFECHARS.indexOf(ch) != -1) {\n"+
"                   encoded += ch;\n"+
"               } else {\n"+
"                   var charCode = ch.charCodeAt(0);\n"+
"                   if (charCode > 255) {\n"+
"                       alert( \"Unicode Character '\" + ch + \"' cannot be encoded using standard URL encoding.\\n\" +\n"+
"                               \"(URL encoding only supports 8-bit characters.)\\n\" +\n"+
"                               \"A space (+) will be substituted.\" );\n"+
"                       encoded += \"+\";\n"+
"                   } else {\n"+
"                       encoded += \"%\";\n"+
"                       encoded += HEX.charAt((charCode >> 4) & 0xF);\n"+
"                       encoded += HEX.charAt(charCode & 0xF);\n"+
"                   }\n"+
"               }\n"+
"           } // for\n"+
"       \n"+
"           return encoded;\n"+
"       },\n"+
"       \n"+
"       URLDecode : function(x) {\n"+
"          // Replace + with ' '\n"+
"          // Replace %xx with equivalent character\n"+
"          // Put [ERROR] in output if %xx is invalid.\n"+
"          var HEXCHARS = \"0123456789ABCDEFabcdef\"; \n"+
"          var encoded = x;\n"+
"          var plaintext = \"\";\n"+
"          var i = 0;\n"+
"          while (i < encoded.length) {\n"+
"              var ch = encoded.charAt(i);\n"+
"              if (ch == \"+\") {\n"+
"                  plaintext += \" \";\n"+
"                  i++;\n"+
"              } else if (ch == \"%\") {\n"+
"                   if (i < (encoded.length-2) \n"+
"                           && HEXCHARS.indexOf(encoded.charAt(i+1)) != -1 \n"+
"                           && HEXCHARS.indexOf(encoded.charAt(i+2)) != -1 ) {\n"+
"                       plaintext += unescape( encoded.substr(i,3) );\n"+
"                       i += 3;\n"+
"                   } else {\n"+
"                       alert( 'Bad escape combination near ...' + encoded.substr(i) );\n"+
"                       plaintext += \"%[ERROR]\";\n"+
"                       i++;\n"+
"                   }\n"+
"               } else {\n"+
"                  plaintext += ch;\n"+
"                  i++;\n"+
"               }\n"+
"           } // while\n"+
"          return plaintext;\n"+
"       }\n"+
"\n"+
"\n"+
"   },\n"+
"\n"+
"   handlers : {\n"+
"       setDocumentHandlers : function(pane) {\n"+
"           var doc = (pane ? window[pane+\"pane\"].document : document);\n"+
"           Event.observe(doc,'keydown',framework.controller.handlers.chatCommandKeyDownHandler);\n"+
"       },\n"+
"       chatCommandKeyDownHandler : function(e) {\n"+
"           if (e.altKey && e.which == \"67\") {\n"+
"               var input = top.$('chatCommandInput');\n"+
"               input.style.display = \"block\";\n"+
"               if (input.value == \"\") input.value = \"/\";\n"+
"               input.focus();\n"+
"           }\n"+
"       },\n"+
"       setChatCommandHandlers : function() {\n"+
"           Event.observe($('chatCommandInput'),'keydown',framework.controller.handlers.chatCommandHistoryScrollHandler);\n"+
"       },\n"+
"       chatCommandHistoryScrollHandler : function(e) {\n"+
"           var commandsHistory = framework.model.interfaceData.commandsHistory;\n"+
"           var input = $('chatCommandInput');\n"+
"           if ((e.which == \"38\" || e.which == \"40\") && commandsHistory.length > 0) {\n"+
"               if (e.which == \"38\") { // up\n"+
"                   framework.model.interfaceData.commandsHistoryIndex--;\n"+
"                   if (framework.model.interfaceData.commandsHistoryIndex < 0) framework.model.interfaceData.commandsHistoryIndex = commandsHistory.length-1;\n"+
"               } else if (e.which == \"40\") { // down\n"+
"                   framework.model.interfaceData.commandsHistoryIndex++;\n"+
"                   if (framework.model.interfaceData.commandsHistoryIndex > commandsHistory.length-1) framework.model.interfaceData.commandsHistoryIndex = 0;\n"+
"               }\n"+
"               input.value = commandsHistory[framework.model.interfaceData.commandsHistoryIndex];\n"+
"           }\n"+
"       },\n"+
"       wResize : function() {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           var body = document.body;\n"+
"           var currentTab = interfaceData.currentTab;\n"+
"           body.style.height=window.innerHeight;\n"+
"           body.style.width=window.innerWidth;\n"+
"           var wW = window.innerWidth;\n"+
"           var wH = window.innerHeight;\n"+
"           var chatH = wH;\n"+
"           var menuW = wW - interfaceData.chatW - interfaceData.chatResizerW;\n"+
"           var charH = wH - interfaceData.menuH;\n"+
"           var mainW = wW - interfaceData.charW - interfaceData.chatW - (interfaceData.charResizerW + interfaceData.chatResizerW);\n"+
"           var mainH = wH - interfaceData.menuH - $(\"tabNav\").offsetHeight - ($(currentTab+\"Tools\") ? $(currentTab+\"Tools\").offsetHeight : 0) - 5;\n"+
"           $(\"menupane\").setStyle({\n"+
"               width : menuW + \"px\",\n"+
"               height : (Number(interfaceData.menuH)-1) + \"px\"\n"+
"           });\n"+
"           $(\"charpane\").setStyle({\n"+
"               width : (Number(interfaceData.charW)-1) + \"px\",\n"+
"               height : charH + \"px\"\n"+
"           });\n"+
"           $(\"chatpane\").setStyle({\n"+
"               width : (Number(interfaceData.chatW) - (interfaceData.chatW != 0 ? 1 : 0)) + \"px\",\n"+
"               height : chatH + \"px\"\n"+
"           });\n"+
"           $(currentTab+\"pane\").setStyle({\n"+
"               width : (Number(mainW)-1) + \"px\",\n"+
"               height : mainH + \"px\"\n"+
"           });\n"+
"           $(\"col1\").setStyle({\n"+
"               width : menuW + \"px\"\n"+
"           });\n"+
"           \n"+
"           if (chatpane.document.getElementById(\"ChatWindow\")) {\n"+
"               sH = chatpane.document.getElementById(\"ChatWindow\").scrollHeight;\n"+
"               chatpane.document.getElementById(\"ChatWindow\").scrollTop = sH; \n"+
"           }\n"+
"           $(\"col3\").setStyle({\n"+
"               width : (Number(interfaceData.charW)-1) + \"px\"\n"+
"           });\n"+
"           $(\"col4\").setStyle({\n"+
"               width : mainW + \"px\"\n"+
"           });\n"+
"           $(\"charResizer\").setStyle({\n"+
"               height : charH + \"px\"\n"+
"           });\n"+
"       },\n"+
"       \n"+
"       setTab : function(tab,goUrl,noReload) {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           if (interfaceData.currentTab != tab) {\n"+
"               if (!interfaceData.isFighting || tab == \"main\") {\n"+
"                   var pane = window[tab+\"pane\"];\n"+
"                   if (pane) {\n"+
"                       if (goUrl) {\n"+
"                           if (noReload != true) pane.location.href = goUrl;\n"+
"                       } else if (pane.location.href == \"about:blank\") {\n"+
"                           pane.location.href = framework.model.actions.tabs[tab];\n"+
"                       } else {\n"+
"                           if (noReload != true) framework.controller.handlers.tabReload(tab);\n"+
"                       }\n"+
"                   }\n"+
"\n"+
"                   // ensure that any rollover tab has been cleared\n"+
"                   framework.controller.handlers.tabOutHelper();\n"+
"                   \n"+
"                   $(interfaceData.currentTab+\"Tools\").style.display = \"none\";\n"+
"                   $(interfaceData.currentTab+\"Tab\").className = \"\";\n"+
"\n"+
"                   $(tab+\"Tools\").style.display = \"block\";\n"+
"                   $(tab+\"Tab\").className = \"active\";\n"+
"\n"+
"                   $(interfaceData.currentTab+\"Container\").setStyle({\n"+
"                       visibility : \"hidden\",\n"+
"                       left:\"5000px\"\n"+
"                   });\n"+
"                   framework.controller.positionTabContainer(tab);\n"+
"                   if (tab == \"chat2\" && chat2pane.document.getElementById(\"ChatWindow\")) {\n"+
"                       sH = chat2pane.document.getElementById(\"ChatWindow\").scrollHeight;\n"+
"                       chat2pane.document.getElementById(\"ChatWindow\").scrollTop = sH; \n"+
"                   }\n"+
"                   interfaceData.currentTab = tab;\n"+
"                   interfaceData.currentPane = window[tab+\"pane\"];\n"+
"                   \n"+
"                   // Reload TinySkillPane\n"+
"                   if (tab == \"main\") {\n"+
"                       framework.controller.handlers.reloadTinySkillPane();\n"+
"                   }\n"+
"               } else {\n"+
"                   alert(\"You\\'re currently fighting.\");\n"+
"               }\n"+
"               framework.controller.handlers.wResize();\n"+
"           } else {\n"+
"               if (goUrl && noReload != true) {\n"+
"                   var pane = window[interfaceData.currentTab+\"pane\"];\n"+
"                   if (pane) pane.location.href = goUrl;\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"\n"+
"       tabReload : function(tab) {\n"+
"           var strAL = framework.model.interfaceData.tabAutoLoad;\n"+
"           var pane = eval(tab+\"pane\");\n"+
"           var doReload = false;\n"+
"           if (strAL.indexOf(\"^\") != -1) {\n"+
"               if (strAL.indexOf(tab+\",\") != -1) doReload = true;\n"+
"           } else if (tab == \"inv\" || tab == \"skill\" || tab == \"msg\" || tab.indexOf(\"ctab\") != -1) {\n"+
"               doReload = true;\n"+
"           }\n"+
"\n"+
"           var href = pane.location.href;\n"+
"\n"+
"           // prevent redoing actions on these pages\n"+
"           if (href.indexOf(\"bedazzle.php\") != -1 || \n"+
"               href.indexOf(\"craft.php?mode=\") != -1 ||\n"+
"               href.indexOf(\"wand.php\") != -1 ||\n"+
"               href.indexOf(\"questlog.php?which=4\") != -1 || \n"+
"               href.indexOf(\"makeoffer.php\") != -1\n"+
"           ) {\n"+
"               doReload = false;\n"+
"           }\n"+
"           \n"+
"           if (doReload) {\n"+
"               var reloadUrl = href;\n"+
"               // prevent redoing actions on the inv & multiuse pages by stripping args.\n"+
"               if (href.indexOf(\"inventory.php?\") != -1 ||\n"+
"            href.indexOf(\"multiuse.php?\") != -1) {\n"+
"                   reloadUrl = href.substring(0,href.indexOf(\"?\"));\n"+
"               }\n"+
"               \n"+
"               pane.location.href = reloadUrl;\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       tabAlert : function(tab) {\n"+
"           if (framework.model.interfaceData.currentTab != tab) {\n"+
"               $(tab+\"Tab\").className = \"blink\";\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       tabOver : function(tab) {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           if (interfaceData.isFighting == false) {\n"+
"               if (interfaceData.rolloverTab == tab) {\n"+
"                   framework.controller.handlers.setTab(tab,\"\",true);\n"+
"               } else {\n"+
"                   if (interfaceData.rolloverTab != \"\" && interfaceData.rolloverTab != tab) framework.controller.handlers.tabOutHelper();\n"+
"                   clearTimeout(framework.controller.timers.tabRolloverTimer);\n"+
"                   if (interfaceData.currentTab != tab && interfaceData.rolloverTab != tab) {\n"+
"                       $(interfaceData.currentTab+\"Tools\").style.display = \"none\";\n"+
"                       $(tab+\"Tools\").style.display = \"block\";\n"+
"                       $(tab+\"Tab\").className = \"rollover\";\n"+
"                       interfaceData.rolloverTab = tab;\n"+
"                   }\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       tabOut : function(tab) {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           if (interfaceData.isFighting == false) {\n"+
"               clearTimeout(framework.controller.timers.tabRolloverTimer);\n"+
"               if (interfaceData.currentTab != tab) {\n"+
"                   framework.controller.timers.tabRolloverTimer = setTimeout(\"framework.controller.handlers.tabOutHelper()\",100);\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       tabToolsOver : function(tab) {\n"+
"           clearTimeout(framework.controller.timers.tabRolloverTimer);\n"+
"       },\n"+
"\n"+
"       tabToolsOut : function(tab,element,event) {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           if (interfaceData.isFighting == false) {\n"+
"               if (interfaceData.currentTab != tab) {\n"+
"                   if (element == event.originalTarget) {\n"+
"                       framework.controller.timers.tabRolloverTimer = setTimeout(\"framework.controller.handlers.tabOutHelper()\",100);\n"+
"                   }\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       tabOutHelper : function() {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           clearTimeout(framework.controller.timers.tabRolloverTimer);\n"+
"           $(interfaceData.currentTab+\"Tools\").style.display = \"block\";\n"+
"           if (interfaceData.rolloverTab != \"\") {\n"+
"               $(interfaceData.rolloverTab+\"Tools\").style.display = \"none\";\n"+
"               $(interfaceData.rolloverTab+\"Tab\").className = \"\";\n"+
"           }\n"+
"           interfaceData.rolloverTab = \"\";\n"+
"       },\n"+
"\n"+
"       checkFighting : function() {\n"+
"           var div = mainpane.document.getElementsByTagName(\"b\")[0];\n"+
"           var mainpaneHTML = mainpane.document.body.innerHTML.toLowerCase();\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           if (mainpane.location.pathname == \"/fight.php\") {\n"+
"               var combatTitleIndex = mainpaneHTML.indexOf(\"combat!\");\n"+
"               if (mainpaneHTML.indexOf(\"go back to\",combatTitleIndex) == -1 && \n"+
"                   mainpaneHTML.indexOf(\"adventure again\",combatTitleIndex) == -1 && \n"+
"                   mainpaneHTML.indexOf(\"you cram it in your pack\",combatTitleIndex) == -1 && \n"+
"                   mainpaneHTML.indexOf(\"a cloud of black mist begins to gather about her as she writhes on the floor..\",combatTitleIndex) == -1 ) {\n"+
"                   interfaceData.isFighting = true;\n"+
"                   var strTurns = \" - \" + (interfaceData.fightTurns > 25 ? '<span style=\"color:red\">Round '+interfaceData.fightTurns+\"</span>\" : \"Round \"+interfaceData.fightTurns);\n"+
"                   div.innerHTML += strTurns;\n"+
"                   interfaceData.fightTurns++;\n"+
"               } else {\n"+
"                   interfaceData.isFighting = false;\n"+
"                   interfaceData.fightTurns = 1;\n"+
"               }\n"+
"               if (interfaceData.currentTab != \"main\") framework.controller.handlers.setTab(\"main\");\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       \n"+
"       \n"+
"       getFightStatus : function() {\n"+
"           return framework.model.interfaceData.isFighting;\n"+
"       },\n"+
"\n"+
"       checkEvents : function(win) {\n"+
"           var tds = win.document.getElementsByTagName(\"td\");\n"+
"           if (tds[0] && tds[0].innerHTML.indexOf(\"New Events\") != -1) {\n"+
"               var msg = tds[2].innerHTML;\n"+
"               var msgLog = $(\"msgLog\");\n"+
"               msgLog.innerHTML += msg;\n"+
"               if (framework.model.interfaceData.currentTab + \"pane\" != win.name) framework.controller.handlers.tabAlert(\"msg\");\n"+
"           }\n"+
"       },\n"+
"\n"+
"       setAA : function(n) {\n"+
"           var strURL = \"account.php?action=autoattack&pwd=\" + framework.model.userData.pwd + \"&value=\"+n;\n"+
"           var request = new Ajax.Request(strURL);\n"+
"       },\n"+
"\n"+
"       setMCD : function(n,sign) {\n"+
"           var strURL = framework.model.actions.mcd.set[sign]+n + (sign == \"Mus\" ? \"&pwd=\" + framework.model.userData.pwd : \"\");\n"+
"           var request = new Ajax.Request(strURL,{\n"+
"               onComplete : function() {\n"+
"                   charpane.location.reload();\n"+
"               }\n"+
"           });\n"+
"       },\n"+
"\n"+
"       setResizer : function(e0) {\n"+
"           var oM = framework.controller.resize;\n"+
"           if (e0.target.id && e0.target.id.indexOf(\"Resizer\") != -1) {\n"+
"               var iframes = $$(\"iframe\");\n"+
"               for (var i in iframes) if (iframes[i] && iframes[i].style) iframes[i].style.visibility=\"hidden\";\n"+
"               oM.dragTarget = e0.target.id.replace(/Resizer/,\"\");\n"+
"               oM.chatX0 = window.innerWidth - $(\"col2\").offsetWidth;\n"+
"               oM.chatW0 = $(\"col2\").offsetWidth;\n"+
"               return false;\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       dragResizer : function(e0) {\n"+
"           var oM = framework.controller.resize;\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           if (oM.dragTarget != \"\") {\n"+
"               var x = e0.pageX;\n"+
"               var y = e0.pageY;\n"+
"               if (oM.dragTarget == \"menu\") {\n"+
"                   if (y > 5) interfaceData.menuH = y;\n"+
"               } else if (oM.dragTarget == \"char\") {\n"+
"                   if (x > 5) interfaceData.charW = x;\n"+
"               } else if (oM.dragTarget == \"chat\") {\n"+
"                   var w = (oM.chatX0 - x + oM.chatW0);\n"+
"                   if (w > 5) interfaceData.chatW = w;\n"+
"               }\n"+
"               framework.controller.handlers.wResize();\n"+
"               return false;\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       clearResizer : function() {\n"+
"           var oM = framework.controller.resize;\n"+
"           var utils = framework.controller.utils;\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           var iframes = $$(\"iframe\");\n"+
"           for (var i in iframes) if (iframes[i] && iframes[i].style) iframes[i].style.visibility=\"visible\";\n"+
"           oM.dragTarget = \"\";\n"+
"           utils.setCookieVar(\"tardFramework\",\"isFullMode\",interfaceData.isFullMode);\n"+
"           utils.setCookieVar(\"tardFramework\",\"menuH\",interfaceData.menuH);\n"+
"           utils.setCookieVar(\"tardFramework\",\"charW\",interfaceData.charW);\n"+
"           utils.setCookieVar(\"tardFramework\",\"chatW\",interfaceData.chatW);\n"+
"       },\n"+
"       \n"+
"       goGuildStore : function() {\n"+
"           var userData = framework.model.userData;\n"+
"           if (userData && userData.cc) {\n"+
"               if (userData.cc == \"SC\" || userData.cc == \"TT\") strS = 3;\n"+
"               if (userData.cc == \"DB\" || userData.cc == \"AT\") strS = 1;\n"+
"               if (userData.cc == \"PM\" || userData.cc == \"SR\") strS = 2;\n"+
"           }\n"+
"           storepane.location.href=\"store.php?whichstore=\"+strS;\n"+
"       },\n"+
"\n"+
"       setConfigPanelTab : function(tab) {\n"+
"           var interfaceData = framework.model.interfaceData;\n"+
"           if (interfaceData.currentConfigPanelTab != tab) {\n"+
"               if (!interfaceData.isFighting) {\n"+
"                   $(interfaceData.currentConfigPanelTab+\"ConfigPanelContainer\").style.display = \"none\";\n"+
"                   $(interfaceData.currentConfigPanelTab+\"ConfigPanelTab\").className = \"\";\n"+
"                   $(tab+\"ConfigPanelContainer\").style.display = \"block\";\n"+
"                   $(tab+\"ConfigPanelTab\").className = \"active\";\n"+
"                   interfaceData.currentConfigPanelTab = tab;\n"+
"                   $(tab+\"ConfigPanelContainer\").fire('tard:configPanelTabShow');\n"+
"               } else {\n"+
"                   alert(\"You\\'re currently fighting.\");\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"\n"+
"       toggleCTab : function(n) {\n"+
"           if (n != \"Chat\") {\n"+
"               var checkBox = $(\"ctab\"+n+\"Enable\");\n"+
"               var tName = $(\"ctab\"+n+\"Name\");\n"+
"               var tLink = $(\"ctab\"+n+\"Link\");\n"+
"               tName.disabled = !checkBox.checked;\n"+
"               tLink.disabled = !checkBox.checked;\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       setCustomTabs : function() {\n"+
"           var isChecked = $(\"ctabChatEnable\").checked;\n"+
"           var utils = framework.controller.utils;\n"+
"           utils.setCookieVar(\"tardFramework\",\"isTabChatActive\",isChecked);\n"+
"           for (var i=1;i<=3;i++) {\n"+
"               var strName = $(\"ctab\"+i+\"Name\").value;\n"+
"               var strLink = $(\"ctab\"+i+\"Link\").value;\n"+
"               var isChecked = $(\"ctab\"+i+\"Enable\").checked;\n"+
"               utils.setCookieVar(\"tardFramework\",\"isTab\"+i+\"Active\",isChecked);\n"+
"               utils.setCookieVar(\"tardFramework\",\"tab\"+i+\"Name\",strName);\n"+
"               utils.setCookieVar(\"tardFramework\",\"tab\"+i+\"Link\",strLink);\n"+
"               window.location.reload();\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       setAutoLoad : function() {\n"+
"           var strAL = \"^\";\n"+
"           if ($(\"invAL\").checked) strAL += \"inv,\";\n"+
"           if ($(\"skillsAL\").checked) strAL += \"skill,\";\n"+
"           if ($(\"chatAL\").checked) strAL += \"chat2,\";\n"+
"           if ($(\"msgAL\").checked) strAL += \"msg,\";\n"+
"           if ($(\"c1AL\").checked) strAL += \"ctab1,\";\n"+
"           if ($(\"c2AL\").checked) strAL += \"ctab2,\";\n"+
"           if ($(\"c3AL\").checked) strAL += \"ctab3,\";\n"+
"           framework.controller.utils.setCookieVar(\"tardFramework\",\"tabAL\",strAL);\n"+
"           window.location.reload();\n"+
"       },\n"+
"       \n"+
"       setTabInteraction : function() {\n"+
"           var select = $('tabInteractionSelect');\n"+
"           var setting = select.options[select.selectedIndex].value;\n"+
"           framework.controller.utils.setCookieVar(\"tardFramework\",\"tabInter\",setting);\n"+
"           window.location.reload();\n"+
"       },\n"+
"       \n"+
"       openConfigPanel : function(tab) {\n"+
"           if (!framework.model.interfaceData.isFighting) {\n"+
"               $('configPanel').setStyle({\n"+
"                   height : (window.innerHeight - 20) + \"px\"\n"+
"               });\n"+
"               $('configPanel').show()\n"+
"               if (tab) framework.controller.handlers.setConfigPanelTab(tab);\n"+
"           } else {\n"+
"               alert(\"Can't open Config Panel while fighting.\");\n"+
"           }\n"+
"       },\n"+
"\n"+
"       closeConfigPanel : function() {\n"+
"           $('configPanel').hide();\n"+
"       },\n"+
"       \n"+
"       setOptionalFeatures : function() {\n"+
"           var features = $$(\"input.optionalFeatures\");\n"+
"           featureIterator = function(feature) {\n"+
"               if (feature) {\n"+
"                   framework.controller.utils.setCookieVar(\"tardFramework\",feature.id,feature.checked);\n"+
"               }\n"+
"           };\n"+
"           features.each(featureIterator);\n"+
"           window.location.reload();\n"+
"       },\n"+
"       \n"+
"       goCombine : function() {\n"+
"           var url = \"\";\n"+
"           if (framework.model.userData.sign == \"Mus\") {\n"+
"               url = \"knoll.php?place=paster\";\n"+
"           } else {\n"+
"               url = \"combine.php\";\n"+
"           }\n"+
"           invpane.location.href = url;\n"+
"       },\n"+
"       \n"+
"       setQuickSkillPref : function() {\n"+
"           var isActive = $(\"quickSkillDisplayAdv\").checked;\n"+
"           framework.controller.utils.setCookieVar(\"tardFramework\",\"QSPref\",(isActive ? \"1\" : \"\"));\n"+
"           window.location.reload();\n"+
"       },\n"+
"       \n"+
"       tinySkillPaneCastMax : function() {\n"+
"           var skillForm = tinySkillPane.document.forms[\"skillform\"];\n"+
"           var selectedIndex = skillForm.whichskill.selectedIndex;\n"+
"           if (selectedIndex) {\n"+
"               var selectedSkill = skillForm.whichskill.options[selectedIndex];\n"+
"               var selectedSkillMP = Number(selectedSkill.innerHTML.match(/\\d+(?=\\sMP)/)[0]);\n"+
"               var charMP = framework.controller.utils.getCharMP();\n"+
"               var times = Math.floor(charMP/selectedSkillMP);\n"+
"               skillForm.quantity.value = times;\n"+
"\n"+
"               if (window.confirm(\"Cast \" + times + \" of \" + selectedSkill.innerHTML + \"?\")) {\n"+
"                   tinySkillPane.submitter(skillForm);\n"+
"               } else {\n"+
"                   skillForm.quantity.value = 1;\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       reloadTinySkillPane : function() {\n"+
"           if (window[\"tinySkillPane\"]) {\n"+
"               tinySkillPane.location.href = framework.model.actions.tabs.tinyskill;\n"+
"           }\n"+
"       },\n"+
"\n"+
"       openMoonCalendar : function() {\n"+
"           $('moonInfo').show();\n"+
"       },\n"+
"       \n"+
"       closeMoonCalendar : function() {\n"+
"           $('moonInfo').hide();\n"+
"       },\n"+
"       \n"+
"       submitChatCommandForm : function() {\n"+
"           var input = $('chatCommandInput');\n"+
"           if (input && input.value && !input.value.empty()) {\n"+
"               var val = input.value;\n"+
"               framework.controller.handlers.submitChatCommand(val);\n"+
"               framework.controller.handlers.addChatCommandHistory(val);\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       addChatCommandHistory : function(val) {\n"+
"           var commandsHistory = framework.model.interfaceData.commandsHistory;\n"+
"           if (commandsHistory.length > 0) {\n"+
"               if (commandsHistory.length == 1 && val != commandsHistory[commandsHistory.length-1]) commandsHistory.push(val);\n"+
"               if (val != commandsHistory[commandsHistory.length-1]) {\n"+
"                   commandsHistory.each(function(cmd,i){\n"+
"                       if (val == cmd) {commandsHistory.splice(i,1);}\n"+
"                   });\n"+
"\n"+
"                   if (commandsHistory.length > 10) commandsHistory.shift();\n"+
"                   commandsHistory.push(val);\n"+
"               }\n"+
"           } else {\n"+
"               commandsHistory.push(val);\n"+
"           }\n"+
"           framework.model.interfaceData.commandsHistoryIndex = commandsHistory.length;\n"+
"       },\n"+
"       \n"+
"       submitChatCommand : function(command, args) {\n"+
"           var isInvalidCommand =  (/^[^\\/]/).test(command) ||\n"+
"                                   (/\\/quit(\\s|$)/).test(command) ||\n"+
"                                   (/\\/exit(\\s|$)/).test(command) ||\n"+
"                                   (/\\/join(\\s|$)/).test(command) ||\n"+
"                                   (/\\/channel(\\s|$)/).test(command) ||\n"+
"                                   (/\\/who(\\s|$)/).test(command) ||\n"+
"                                   (/\\/w(\\s|$)/).test(command) ||\n"+
"                                   (/\\/em(\\s|$)/).test(command) ||\n"+
"                                   (/\\/me(\\s|$)/).test(command) ||\n"+
"                                   (/\\/help(\\s|$)/).test(command);\n"+
"           if (isInvalidCommand == false) {\n"+
"               var userData = framework.model.userData;\n"+
"               var url = \"/submitnewchat.php?playerid=\" + userData.playerId + \"&pwd=\" + userData.pwd + \"&graf=\"+ framework.controller.utils.URLEncode(command);\n"+
"               \n"+
"               new Ajax.Request(url,{\n"+
"                   method : 'get',\n"+
"                   onComplete : framework.controller.handlers.parseChatCommandResponse.bind(this,args)\n"+
"               });\n"+
"               $('chatCommandInput').value = \"\";\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       parseChatCommandResponse : function(args,transport) {\n"+
"           var response = transport.responseText;\n"+
"           var hideInitialResponse = (args && args.hideInitialResponse == true); \n"+
"           // console.log(response);\n"+
"           if (framework.model.interfaceData.currentPane) {\n"+
"               if (!hideInitialResponse) framework.controller.loadEffResults('<div style=\"text-align:center;padding:5px;font-size:10px;\">'+response+'</div>');\n"+
"               var initialQueueSize = framework.model.interfaceData.commandsQueue.length;\n"+
"               framework.model.interfaceData.commandsQueue = framework.model.interfaceData.commandsQueue.concat((response.split(\"<br>\")).without(\"\")); \n"+
"               if (initialQueueSize == 0) {\n"+
"                   framework.model.interfaceData.isCommandsQueueActive = true;\n"+
"                   framework.controller.handlers.executeNextChatCommand(args);\n"+
"               }\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       executeNextChatCommand : function(args) {\n"+
"           var command = (framework.model.interfaceData.commandsQueue.splice(0,1)).toString();\n"+
"           if (command && !command.empty()) {\n"+
"               if (command.indexOf(\"<!--js(dojax\") != -1) {\n"+
"                   var str1 = \"<!--js(dojax('\";\n"+
"                   var i1 = command.indexOf(str1);\n"+
"                   if (i1 != -1) {\n"+
"                       var i2 = command.indexOf(\"');)-->\",i1);\n"+
"                       var js = command.substring(i1+str1.length,i2);\n"+
"                       framework.controller.handlers.submitDojax(js,args);\n"+
"                   }\n"+
"               } else if (command.indexOf(\"<!--js(\") != -1) {\n"+
"                   var str1 = \"<!--js(\";\n"+
"                   var i1 = command.indexOf(str1);\n"+
"                   if (i1 != -1) {\n"+
"                       var i2 = command.indexOf(\")-->\",i1);\n"+
"                       var js = command.substring(i1+str1.length,i2);\n"+
"                       framework.controller.handlers.parseJsCommand(js,args);\n"+
"                   }\n"+
"               } else {\n"+
"                   framework.controller.handlers.submitChatCommandAfterFinish(args);\n"+
"               }\n"+
"           } else {\n"+
"               framework.controller.handlers.submitChatCommandAfterFinish(args);\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       submitDojax : function(url,args) {\n"+
"           new Ajax.Request(url,{\n"+
"               method : 'get',\n"+
"               onComplete : framework.controller.handlers.parseDojaxResponse.bind(this,args)\n"+
"           });\n"+
"       },\n"+
"       \n"+
"       parseDojaxResponse : function(args,transport) {\n"+
"           var hideFinalResponse = (args && args.hideFinalResponse == true); \n"+
"           if (!hideFinalResponse) framework.controller.loadEffResults('<center>'+transport.responseText+'</center>');\n"+
"           framework.controller.handlers.submitChatCommandAfterFinish(args);\n"+
"       },\n"+
"       \n"+
"       parseJsCommand : function(js,args) {\n"+
"           eval(js);\n"+
"           framework.controller.handlers.submitChatCommandAfterFinish(args);\n"+
"       },\n"+
"       \n"+
"       submitChatCommandAfterFinish : function(args) {\n"+
"           if (framework.model.interfaceData.commandsQueue.length > 0) {\n"+
"               framework.controller.handlers.executeNextChatCommand(args);\n"+
"           } else {\n"+
"               if (args) {\n"+
"                   var callBack = args.callBack;\n"+
"                   var callBackArgs = args.callBackArgs;\n"+
"                   if (callBack) {\n"+
"                       callBack(callBackArgs);\n"+
"                   }\n"+
"               }\n"+
"               framework.model.interfaceData.isCommandsQueueActive = false;\n"+
"               charpane.location.reload();\n"+
"           }\n"+
"       },\n"+
"       \n"+
"       commonPaneFunctions : function(paneName) {\n"+
"           framework.controller.utils.checkScriptQueue(paneName);\n"+
"           if (framework.model.interfaceData.isFighting == false) framework.controller.handlers.setDocumentHandlers(paneName);\n"+
"       },\n"+
"       \n"+
"       menuPaneFunctions : function() {\n"+
"           framework.view.main.initializeMenuQuickSkill();\n"+
"           framework.view.main.setMoonCalendar();\n"+
"           framework.controller.handlers.commonPaneFunctions(\"menu\");\n"+
"       },\n"+
"       \n"+
"       charPaneFunctions : function() {\n"+
"           framework.view.main.updateAdvHistory();\n"+
"           framework.controller.checkMCD();\n"+
"           framework.controller.handlers.commonPaneFunctions(\"char\");\n"+
"       },\n"+
"       \n"+
"       mainPaneFunctions : function() {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.checkFighting();\n"+
"           handlers.setTab(\"main\");\n"+
"           if (framework.model.interfaceData.isFighting == false) handlers.reloadTinySkillPane();\n"+
"           framework.view.main.setAccountPage();\n"+
"           handlers.commonPaneFunctions(\"main\");\n"+
"       },\n"+
"       invPaneFunctions : function() {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.commonPaneFunctions(\"inv\");\n"+
"       },\n"+
"       storePaneFunctions : function() {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.commonPaneFunctions(\"store\");\n"+
"       },\n"+
"       skillPaneFunctions : function() {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.commonPaneFunctions(\"skill\");\n"+
"       },\n"+
"       mallPaneFunctions : function() {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.commonPaneFunctions(\"mall\");\n"+
"       },\n"+
"       msgPaneFunctions : function() {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.commonPaneFunctions(\"msg\");\n"+
"       },\n"+
"       chatPaneFunctions : function() {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.commonPaneFunctions(\"chat\");\n"+
"       },\n"+
"       chat2PaneFunctions : function() {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.commonPaneFunctions(\"chat2\");\n"+
"       },\n"+
"       ctabPaneFunctions : function(ctabNum) {\n"+
"           var handlers = framework.controller.handlers;\n"+
"           handlers.commonPaneFunctions(\"ctab\"+ctabNum);\n"+
"       },\n"+
"       \n"+
"       tinySkillPaneFunctions : function() {\n"+
"           // Modify styling\n"+
"           tinySkillPane.document.body.style.backgroundColor = \"#ececec\";\n"+
"           var style = tinySkillPane.document.createElement(\"style\");\n"+
"           style.type = \"text/css\";\n"+
"           style.innerHTML = '' +\n"+
"               '#itemspan {float:left;margin:-3px 0px 0px 10px;padding:2px;}' +\n"+
"               '#skillspan {float:left;padding:2px;}' +\n"+
"           '';\n"+
"           tinySkillPane.document.getElementsByTagName(\"head\")[0].appendChild(style);\n"+
"           \n"+
"           var div = tinySkillPane.document.getElementsByTagName(\"div\")[0];\n"+
"           if (div) div.style.textAlign = \"left\";\n"+
"           \n"+
"           var skillspan = tinySkillPane.document.getElementById(\"skillspan\");\n"+
"           if (skillspan) skillspan.style.display = \"block\";\n"+
"\n"+
"           var itemspan = tinySkillPane.document.getElementById(\"itemspan\");\n"+
"           if (itemspan) itemspan.style.display = \"block\";\n"+
"\n"+
"           // Add Cast Max\n"+
"           var skillForm = tinySkillPane.document.forms[\"skillform\"];\n"+
"           var castButton = skillForm.elements[6];\n"+
"           castButton.value = \"Cast\";\n"+
"           var castMaxButton = new Element(\"input\",{\n"+
"               'type':\"button\",\n"+
"               'value':\"Cast Max\",\n"+
"               'class':\"tinybutton\"\n"+
"           });\n"+
"           castMaxButton.setStyle({margin:\"0px 0px 0px 5px\"});\n"+
"           castMaxButton.onclick = function() {\n"+
"               top.framework.controller.handlers.tinySkillPaneCastMax();\n"+
"           }\n"+
"           castButton.parentNode.appendChild(castMaxButton);\n"+
"       }\n"+
"   },\n"+
"   \n"+
"   setPageState : function() {\n"+
"       framework.model.pageState = framework.controller.constants.pageStates[window.location.pathname];\n"+
"   },\n"+
"   \n"+
"   setUserScripts : function() {\n"+
"       var scriptsCount = 0;\n"+
"       var utils = framework.controller.utils;\n"+
"       var scripts = framework.model.scripts;\n"+
"       var loadQueue = [];\n"+
"       var scriptHost = \"\";\n"+
"       \n"+
"       if (scripts.scriptHost == null) {\n"+
"           scriptHost = (window[\"tardFrameworkRuntimeMode\"] == \"dev\" ? window[\"tardFrameworkScriptHostDev\"] : scripts.scriptHostProd);\n"+
"           scripts.scriptHost = scriptHost;\n"+
"       } else {\n"+
"           scriptHost = scripts.scriptHost;\n"+
"       }\n"+
"       \n"+
"       scriptIterator = function(script) {\n"+
"           var isEnabled = (utils.getCookieVar(\"tardFramework\",script) == \"true\");\n"+
"           if (isEnabled) {\n"+
"               var isEmbedded = (scripts[script].indexOf('*')==0) ? true : false;\n"+
"               if (!isEmbedded) {\n"+
"                  var src = scriptHost + scripts[script];\n"+
"                  loadQueue.push(src);\n"+
"                  scriptsCount++;\n"+
"               } else {\n"+
"                  framework.view[script].init();\n"+
"               }\n"+
"           }\n"+
"       };\n"+
"       Object.keys(scripts).each(scriptIterator);\n"+
"\n"+
"       framework.model.interfaceData.scriptsTotal = scriptsCount;\n"+
"       \n"+
"       loadQueue.each(function(script) {\n"+
"           framework.controller.utils.loadScript(script);\n"+
"       });\n"+
"       \n"+
"   },\n"+
"   \n"+
"   setResizeHandler : function() {\n"+
"       Event.observe(window,\"resize\",framework.controller.handlers.wResize);\n"+
"       document.onmousedown = function(e0) {framework.controller.handlers.setResizer(e0);};\n"+
"       document.onmousemove = function(e0) {framework.controller.handlers.dragResizer(e0);};\n"+
"       document.onmouseup = function(e0) {framework.controller.handlers.clearResizer(e0);};\n"+
"   },\n"+
"   \n"+
"   checkResultsDisplay : function() {\n"+
"       var mainpane = window[\"mainpane\"];\n"+
"       if (mainpane && mainpane.document) {\n"+
"           var mainpaneEffDiv = mainpane.document.getElementById('effdiv');\n"+
"           if (mainpaneEffDiv) {\n"+
"               var mainpaneEffDivContent = mainpaneEffDiv.innerHTML;\n"+
"               var currentTab = framework.model.interfaceData.currentTab;\n"+
"               if (currentTab != \"main\") {\n"+
"                   if (mainpaneEffDivContent != framework.controller.lastResultsDisplay && mainpaneEffDivContent != \"<!-- blanked by tard's framework -->\") {\n"+
"                       var currentPane = top.window[currentTab+\"pane\"];\n"+
"                       var currentPaneEffDiv = currentPane.document.getElementById('effdiv');\n"+
"                       if (currentPaneEffDiv) {\n"+
"                           currentPaneEffDiv.innerHTML = mainpaneEffDivContent;\n"+
"                           mainpaneEffDiv.innerHTML = \"<!-- blanked by tard's framework -->\";\n"+
"                       } else {\n"+
"                           framework.controller.loadEffResults(mainpaneEffDivContent);\n"+
"                       }\n"+
"                   }\n"+
"               }\n"+
"               framework.controller.lastResultsDisplay = mainpaneEffDivContent;\n"+
"           }\n"+
"       }\n"+
"   },\n"+
"\n"+
"   loadEffResults : function(content) {\n"+
"       var currentTab = framework.model.interfaceData.currentTab;\n"+
"       if (currentTab != \"chat2\") {\n"+
"           var currentPane = framework.model.interfaceData.currentPane;\n"+
"           var currentEffDiv = currentPane.document.getElementById('effdiv');\n"+
"           if (currentEffDiv) {\n"+
"               currentEffDiv.innerHTML = (framework.model.interfaceData.isCommandsQueueActive == true ? currentEffDiv.innerHTML + content : content);\n"+
"               currentEffDiv.style.display = \"block\";\n"+
"           } else {\n"+
"               var effdiv = (new Element('div',{\n"+
"                   'id' : 'effdiv'\n"+
"               })).update(content);\n"+
"               currentPane.document.body.insertBefore(effdiv, currentPane.document.body.firstChild);\n"+
"           }\n"+
"       } else {\n"+
"           clearTimeout(framework.controller.timers.loadEffTimer);\n"+
"           $('effdiv').update(content);\n"+
"           $('effdiv').show();\n"+
"           framework.controller.timers.loadEffTimer = setTimeout(\"$('effdiv').hide();\",5000);\n"+
"       }\n"+
"   },      \n"+
"\n"+
"   getPlayerPwd : function() {\n"+
"       var autoReq = new XMLHttpRequest();\n"+
"       autoReq.open(\"GET\", \"http://\" + window.location.host + \"/api.php?what=status&for=tards+framework\", true);\n"+
"       autoReq.onload = function () {\n"+
"               if(autoReq.status == 200) {\n"+
"                   var strHTML = JSON.parse(autoReq.responseText ? autoReq.responseText : '{}');\n"+
"                   if (strHTML && strHTML.pwd) {\n"+
"                       framework.model.userData.pwd = strHTML.pwd;\n"+
"                       framework.controller.getAutoData();\n"+
"                   }\n"+
"                   framework.controller.getCharData();\n"+
"               }\n"+
"       };\n"+
"       autoReq.send(null);\n"+
"   },\n"+
"\n"+
"   getAutoData : function() {\n"+
"       var autoReq = new XMLHttpRequest();\n"+
"       autoReq.open(\"GET\", \"http://\" + window.location.host + \"/account.php?action=loadtab&value=combat&pwd=\"+framework.model.userData.pwd, true);\n"+
"       autoReq.onreadystatechange = function () {\n"+
"           if (autoReq.readyState == 4) {\n"+
"               if(autoReq.status == 200) {\n"+
"                   var strHTML = autoReq.responseText;\n"+
"                   strHTML = strHTML.split(/<select name=[\"]autoattack[\"]>/)[1];\n"+
"                   strHTML = strHTML.split(\"</select>\")[0];\n"+
"                   $(\"autoAttack\").update(strHTML);\n"+
"               }\n"+
"           }\n"+
"       };\n"+
"       autoReq.send(null);\n"+
"   },\n"+
"\n"+
"   checkMCD : function() {\n"+
"       var bodyHTML = charpane.document.body.innerHTML;\n"+
"       var mcds = framework.model.actions.mcd.check;\n"+
"       \n"+
"       var mcdIterator = function(sign) {\n"+
"           var action = mcds[sign];\n"+
"           var i1 = bodyHTML.indexOf(action);\n"+
"           if (i1 != -1) {\n"+
"               var i2 = bodyHTML.indexOf(\"<b>\",i1);\n"+
"               var i3 = bodyHTML.indexOf(\"</b>\",i2);\n"+
"               var level = Number(bodyHTML.substring(i2+3,i3));\n"+
"               $(\"mcdControl\"+sign).selectedIndex = level;\n"+
"           }\n"+
"       }\n"+
"       \n"+
"       Object.keys(mcds).each(mcdIterator);\n"+
"   },\n"+
"\n"+
"   getCharData : function() {\n"+
"       var utils = framework.controller.utils;\n"+
"       var charClasses = framework.model.character.classes;\n"+
"       var charSigns = framework.model.character.signs;\n"+
"       var interfaceData = framework.model.interfaceData;\n"+
"       var userData = framework.model.userData;\n"+
"       if (userData.isLoaded == false && interfaceData.isFighting == false) { \n"+
"           var charReq = new XMLHttpRequest();\n"+
"           charReq.open(\"GET\", \"http://\" + window.location.host + \"/charsheet.php\", true);\n"+
"           charReq.onreadystatechange = function () {\n"+
"               if (charReq.readyState == 4) {\n"+
"                   if(charReq.status == 200) {\n"+
"                       var strHTML = charReq.responseText;\n"+
"                       for (var i in charClasses) {\n"+
"                           if (strHTML.indexOf(i) != -1) {\n"+
"                               userData.cc = charClasses[i];\n"+
"                               break;\n"+
"                           }\n"+
"                       }\n"+
"                       userData.ctype = (userData.cc == \"DB\" || userData.cc == \"AT\" ? \"Mox\" : (userData.cc == \"SC\" || userData.cc == \"TT\" ? \"Mus\" : \"Mys\" ));\n"+
"                       userData.lvl = strHTML.match(/Level \\d+/)[0].replace(/Level /,\"\");\n"+
"                       userData.sign = \"\";\n"+
"                       for (var i in charSigns) {\n"+
"                           if (strHTML.indexOf(i+\"</b>\") != -1) {\n"+
"                               userData.sign = charSigns[i];\n"+
"                               break;\n"+
"                           }\n"+
"                       }\n"+
"                       var i1 = strHTML.indexOf(\"bgcolor=blue><b>\")+16;\n"+
"                       var i2 = strHTML.indexOf(\"</b>\",i1);\n"+
"                       userData.cName = strHTML.substring(i1,i2);\n"+
"\n"+
"                       var i1 = strHTML.indexOf(\"</b> (#\")+7;\n"+
"                       var i2 = strHTML.indexOf(\")\",i1);\n"+
"                       userData.playerId = strHTML.substring(i1,i2);\n"+
"\n"+
"                       framework.controller.setCharTools();\n"+
"                       document.title = document.title + \" - \" + userData.cName;\n"+
"                       \n"+
"                       // Get pwd\n"+
"                       if (!framework.model.userData.pwd) {\n"+
"                         new Ajax.Request(\"multiuse.php\", {\n"+
"                           method: 'get',\n"+
"                           onComplete : function(transport) {\n"+
"                               var response = transport.responseText;\n"+
"                               var str1 = \"type=hidden name=pwd value='\";\n"+
"                               var i1 = response.indexOf(str1)+str1.length;\n"+
"                               var i2 = response.indexOf(\"'\",i1);\n"+
"                               framework.model.userData.pwd = response.substring(i1,i2);\n"+
"                               framework.controller.getAutoData();\n"+
"                               userData.isLoaded = true;\n"+
"                               framework.controller.utils.checkScriptQueue(\"all\");\n"+
"                           }\n"+
"                         });\n"+
"                       } else {\n"+
"                           userData.isLoaded = true;\n"+
"                           framework.controller.utils.checkScriptQueue(\"all\");\n"+
"                       }\n"+
"                   }\n"+
"               }\n"+
"           };\n"+
"           charReq.send(null);\n"+
"       }\n"+
"   },\n"+
"\n"+
"   setCharTools : function() {\n"+
"       var userData = framework.model.userData;\n"+
"       \n"+
"       var elementIterator = function(element) {\n"+
"           var displayType = (element.tagName.toLowerCase() == \"span\" ? \"inline\" : \"block\");\n"+
"           element.setStyle({\"display\":displayType});\n"+
"       }\n"+
"       \n"+
"       $$('.'+userData.sign+'SignTools').each(elementIterator);\n"+
"       $$('.'+userData.ctype+'ClassTools').each(elementIterator);\n"+
"       $$('.'+userData.cc+'ClassTools').each(elementIterator);\n"+
"   },\n"+
"   \n"+
"   positionTabContainer : function(tab) {\n"+
"       var tabContainerPosition = $('tabContainerPositioner').cumulativeOffset();\n"+
"       $(tab+\"Container\").setStyle({\n"+
"           visibility : \"visible\",\n"+
"           left:tabContainerPosition[0]+\"px\",\n"+
"           top:tabContainerPosition[1]+\"px\"\n"+
"       });\n"+
"   },\n"+
"   \n"+
"   setToolsMinHeight : function() {\n"+
"       $('invTools','storeTools').each(function(element){\n"+
"           element.setStyle({\n"+
"               'visibility' : 'hidden',\n"+
"               'position' : 'absolute',\n"+
"               'display' : 'block'\n"+
"           });\n"+
"       });\n"+
"       var minHeight = Math.max($('invTools').offsetHeight,$('storeTools').offsetHeight);\n"+
"       $$('.paneTools').each(function(element){\n"+
"           element.setStyle({'minHeight':(minHeight-10)+\"px\"});\n"+
"       });\n"+
"       $('invTools','storeTools').each(function(element){\n"+
"           element.setStyle({\n"+
"               'visibility' : 'visible',\n"+
"               'position' : 'static',\n"+
"               'display' : 'none'\n"+
"           });\n"+
"       });\n"+
"   },\n"+
"   \n"+
"   saveCookiesToNotes : function() {\n"+
"       framework.controller.getCurrentNotesHelper(function(notes) {\n"+
"           var utils = framework.controller.utils;\n"+
"           var charName = framework.model.userData.cName.replace(/\\s/,\"\");\n"+
"           var cookieMarkBegin = \"-=BEGIN: Framework Cookies=-\";\n"+
"           var cookieMarkEnd = \"-=END: Framework Cookies=-\";\n"+
"           \n"+
"           var n1 = notes.indexOf(cookieMarkBegin);\n"+
"           \n"+
"           var tardMenuString = \"\";\n"+
"           var tardMenu = utils.getCookie(\"tardMenu\");\n"+
"           if (tardMenu) {\n"+
"               tardMenu = tardMenu.toQueryParams();\n"+
"               var tardMenuKey = charName.toLowerCase() + \"Links\";\n"+
"               var tardMenuVal = tardMenu[tardMenuKey];\n"+
"               tardMenuString = (tardMenuVal ? \"tardMenu|||\" + tardMenuKey + \"=\" + escape(tardMenuVal) + \"\\n\" : \"\");\n"+
"           }\n"+
"           \n"+
"           var tardPetRackString = \"\";\n"+
"           var tardPetRack = utils.getCookie(\"tardPetRack\");\n"+
"           if (tardPetRack) {\n"+
"               tardPetRack = tardPetRack.toQueryParams();\n"+
"               var tardPetRackKey = charName;\n"+
"               var tardPetRackVal = tardPetRack[tardPetRackKey];\n"+
"               var tardPetRackFamEqKey = charName+\"FamEq\";\n"+
"               var tardPetRackFamEqVal = tardPetRack[tardPetRackFamEqKey];\n"+
"               var tardPetRackFamEqString = (tardPetRackFamEqVal ? \"&\" + tardPetRackFamEqKey + \"=\" + tardPetRackFamEqVal : \"\");\n"+
"               tardPetRackString = (tardPetRackVal ? \"tardPetRack|||\" + tardPetRackKey + \"=\" + tardPetRackVal + tardPetRackFamEqString + \"\\n\" : \"\");\n"+
"           }\n"+
"           \n"+
"           var newCookies = \"\\n\" +\n"+
"               \"tardFramework|||\" + utils.getCookie(\"tardFramework\") + \"\\n\" +\n"+
"               tardMenuString +\n"+
"               tardPetRackString + \n"+
"               \"tardItem|||\" + utils.getCookie(\"tardItem\") + \"\\n\";\n"+
"           \n"+
"           var newNotes = \"\";\n"+
"           \n"+
"           if (n1 != -1) {\n"+
"               var n2 = notes.indexOf(cookieMarkEnd,n1 + cookieMarkBegin.length);\n"+
"               newNotes = notes.substring(0,n1+cookieMarkBegin.length) + newCookies + notes.substr(n2);\n"+
"           } else {\n"+
"               newNotes = notes + \"\\n\" + cookieMarkBegin + newCookies + cookieMarkEnd + \"\\n\";\n"+
"           }\n"+
"           \n"+
"           newNotes = escape(newNotes);\n"+
"           \n"+
"           new Ajax.Request(\"questlog.php?which=4&action=updatenotes&notes=\"+newNotes,{\n"+
"               method : 'post',\n"+
"               onComplete : function() {\n"+
"                   framework.controller.loadEffResults('<center><span style=\"font-weight:bold;\">Your Framework settings have been saved to your Notes.</span></center>');\n"+
"                   framework.controller.handlers.closeConfigPanel();\n"+
"                   framework.model.interfaceData.currentPane.window.scroll(0,0);\n"+
"               }\n"+
"           });\n"+
"       });\n"+
"   },\n"+
"   \n"+
"   restoreCookiesFromNotes : function() {\n"+
"       framework.controller.getCurrentNotesHelper(function(notes) {\n"+
"           var utils = framework.controller.utils;\n"+
"           var cookieMarkBegin = \"-=BEGIN: Framework Cookies=-\";\n"+
"           var cookieMarkEnd = \"-=END: Framework Cookies=-\";\n"+
"           \n"+
"           var n1 = notes.indexOf(cookieMarkBegin);\n"+
"           \n"+
"           if (n1 != -1) {\n"+
"               var n2 = notes.indexOf(cookieMarkEnd,n1);\n"+
"               if (n2 != -1) {\n"+
"                   var cookies = notes.substring(n1+cookieMarkBegin.length,n2).replace(/&amp;/g,\"&\").replace(/\\r/g,\"\").split(\"\\n\");\n"+
"                   cookies.each(function(cookie){\n"+
"                       var hash = cookie.split('|||');\n"+
"                       var cookieKey = hash[0];\n"+
"                       var cookieVal = hash[1];\n"+
"                       if (cookieKey && cookieKey != \"\" && cookieVal) {\n"+
"                           utils.setCookie(cookieKey,cookieVal);\n"+
"                       }\n"+
"                   });\n"+
"                   window.location.reload();\n"+
"               }\n"+
"           }\n"+
"       });\n"+
"   },\n"+
"   \n"+
"   getCurrentNotesHelper : function(callBack) {\n"+
"       new Ajax.Request(\"questlog.php?which=4\",{\n"+
"           method : 'get',\n"+
"           onComplete : function(transport) {\n"+
"               var response = transport.responseText;\n"+
"               var r0 = response.indexOf(\"<textarea\");\n"+
"               var r1 = response.indexOf(\">\",r0)+1;\n"+
"               var r2 = response.indexOf(\"</textarea\",r1);\n"+
"               var notes = response.substring(r1,r2);\n"+
"               callBack(notes);\n"+
"           }\n"+
"       });\n"+
"   }\n"+
"\n"+
"   \n"+
"});\n"+
"\n"+
"Event.observe(window,\"load\",function(){\n"+
"   setTimeout(\"framework.controller.init.main()\",500)\n"+
"});\n"+
"\n"
    ];
    for (i in scripts) {
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.setAttribute('language','JavaScript');
        script.innerHTML = scripts[i];
        //script.src = (runtimeMode == "prod" ? scriptHostProd : scriptHostDev) + scripts[i];
        document.getElementsByTagName('head')[0].appendChild(script);
    }
})();
