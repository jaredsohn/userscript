// ==UserScript==
// @name        Ereplus
// @namespace   Zifc
// @include     http://www.erepublik.com/*
// @include     http://economy.erepublik.com/*
// @require     http://requirejs.org/docs/release/1.0.8/comments/require.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     0.5.1
// @license     http://unlicense.org/
// ==/UserScript==


/**
 * @license RequireJS text 1.0.8 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*jslint regexp: true, plusplus: true, sloppy: true */
/*global require: false, XMLHttpRequest: false, ActiveXObject: false,
  define: false, window: false, process: false, Packages: false,
  java: false, location: false */

(function () {
    var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = [];

    define('text',[],function () {
        var text, fs;

        text = {
            version: '1.0.8',

            strip: function (content) {
                //Strips <?xml ...?> declarations so that external SVG and XML
                //documents can be added to a document without worry. Also, if the string
                //is an HTML document, only the part inside the body tag is returned.
                if (content) {
                    content = content.replace(xmlRegExp, "");
                    var matches = content.match(bodyRegExp);
                    if (matches) {
                        content = matches[1];
                    }
                } else {
                    content = "";
                }
                return content;
            },

            jsEscape: function (content) {
                return content.replace(/(['\\])/g, '\\$1')
                    .replace(/[\f]/g, "\\f")
                    .replace(/[\b]/g, "\\b")
                    .replace(/[\n]/g, "\\n")
                    .replace(/[\t]/g, "\\t")
                    .replace(/[\r]/g, "\\r");
            },

            createXhr: function () {
                //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
                var xhr, i, progId;
                if (typeof XMLHttpRequest !== "undefined") {
                    return new XMLHttpRequest();
                } else if (typeof ActiveXObject !== "undefined") {
                    for (i = 0; i < 3; i++) {
                        progId = progIds[i];
                        try {
                            xhr = new ActiveXObject(progId);
                        } catch (e) {}

                        if (xhr) {
                            progIds = [progId];  // so faster next time
                            break;
                        }
                    }
                }

                return xhr;
            },

            /**
             * Parses a resource name into its component parts. Resource names
             * look like: module/name.ext!strip, where the !strip part is
             * optional.
             * @param {String} name the resource name
             * @returns {Object} with properties "moduleName", "ext" and "strip"
             * where strip is a boolean.
             */
            parseName: function (name) {
                var strip = false, index = name.indexOf("."),
                    modName = name.substring(0, index),
                    ext = name.substring(index + 1, name.length);

                index = ext.indexOf("!");
                if (index !== -1) {
                    //Pull off the strip arg.
                    strip = ext.substring(index + 1, ext.length);
                    strip = strip === "strip";
                    ext = ext.substring(0, index);
                }

                return {
                    moduleName: modName,
                    ext: ext,
                    strip: strip
                };
            },

            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

            /**
             * Is an URL on another domain. Only works for browser use, returns
             * false in non-browser environments. Only used to know if an
             * optimized .js version of a text resource should be loaded
             * instead.
             * @param {String} url
             * @returns Boolean
             */
            useXhr: function (url, protocol, hostname, port) {
                var match = text.xdRegExp.exec(url),
                    uProtocol, uHostName, uPort;
                if (!match) {
                    return true;
                }
                uProtocol = match[2];
                uHostName = match[3];

                uHostName = uHostName.split(':');
                uPort = uHostName[1];
                uHostName = uHostName[0];

                return (!uProtocol || uProtocol === protocol) &&
                       (!uHostName || uHostName === hostname) &&
                       ((!uPort && !uHostName) || uPort === port);
            },

            finishLoad: function (name, strip, content, onLoad, config) {
                content = strip ? text.strip(content) : content;
                if (config.isBuild) {
                    buildMap[name] = content;
                }
                onLoad(content);
            },

            load: function (name, req, onLoad, config) {
                //Name has format: some.module.filext!strip
                //The strip part is optional.
                //if strip is present, then that means only get the string contents
                //inside a body tag in an HTML string. For XML/SVG content it means
                //removing the <?xml ...?> declarations so the content can be inserted
                //into the current doc without problems.

                // Do not bother with the work if a build and text will
                // not be inlined.
                if (config.isBuild && !config.inlineText) {
                    onLoad();
                    return;
                }

                var parsed = text.parseName(name),
                    nonStripName = parsed.moduleName + '.' + parsed.ext,
                    url = req.toUrl(nonStripName),
                    useXhr = (config && config.text && config.text.useXhr) ||
                             text.useXhr;

                //Load the text. Use XHR if possible and in a browser.
                if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                    text.get(url, function (content) {
                        text.finishLoad(name, parsed.strip, content, onLoad, config);
                    });
                } else {
                    //Need to fetch the resource across domains. Assume
                    //the resource has been optimized into a JS module. Fetch
                    //by the module name + extension, but do not include the
                    //!strip part to avoid file system issues.
                    req([nonStripName], function (content) {
                        text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                        parsed.strip, content, onLoad, config);
                    });
                }
            },

            write: function (pluginName, moduleName, write, config) {
                if (buildMap.hasOwnProperty(moduleName)) {
                    var content = text.jsEscape(buildMap[moduleName]);
                    write.asModule(pluginName + "!" + moduleName,
                                   "define(function () { return '" +
                                       content +
                                   "';});\n");
                }
            },

            writeFile: function (pluginName, moduleName, req, write, config) {
                var parsed = text.parseName(moduleName),
                    nonStripName = parsed.moduleName + '.' + parsed.ext,
                    //Use a '.js' file name so that it indicates it is a
                    //script that can be loaded across domains.
                    fileName = req.toUrl(parsed.moduleName + '.' +
                                         parsed.ext) + '.js';

                //Leverage own load() method to load plugin value, but only
                //write out values that do not have the strip argument,
                //to avoid any potential issues with ! in file names.
                text.load(nonStripName, req, function (value) {
                    //Use own write() method to construct full module value.
                    //But need to create shell that translates writeFile's
                    //write() to the right interface.
                    var textWrite = function (contents) {
                        return write(fileName, contents);
                    };
                    textWrite.asModule = function (moduleName, contents) {
                        return write.asModule(moduleName, fileName, contents);
                    };

                    text.write(pluginName, nonStripName, textWrite, config);
                }, config);
            }
        };

        if (text.createXhr()) {
            text.get = function (url, callback) {
                var xhr = text.createXhr();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = function (evt) {
                    //Do not explicitly handle errors, those should be
                    //visible via console output in the browser.
                    if (xhr.readyState === 4) {
                        callback(xhr.responseText);
                    }
                };
                xhr.send(null);
            };
        } else if (typeof process !== "undefined" &&
                 process.versions &&
                 !!process.versions.node) {
            //Using special require.nodeRequire, something added by r.js.
            fs = require.nodeRequire('fs');

            text.get = function (url, callback) {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file.indexOf('\uFEFF') === 0) {
                    file = file.substring(1);
                }
                callback(file);
            };
        } else if (typeof Packages !== 'undefined') {
            //Why Java, why is this so awkward?
            text.get = function (url, callback) {
                var encoding = "utf-8",
                    file = new java.io.File(url),
                    lineSeparator = java.lang.System.getProperty("line.separator"),
                    input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                    stringBuffer, line,
                    content = '';
                try {
                    stringBuffer = new java.lang.StringBuffer();
                    line = input.readLine();

                    // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                    // http://www.unicode.org/faq/utf_bom.html

                    // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                    // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                    if (line && line.length() && line.charAt(0) === 0xfeff) {
                        // Eat the BOM, since we've already found the encoding on this file,
                        // and we plan to concatenating this buffer with others; the BOM should
                        // only appear at the top of a file.
                        line = line.substring(1);
                    }

                    stringBuffer.append(line);

                    while ((line = input.readLine()) !== null) {
                        stringBuffer.append(lineSeparator);
                        stringBuffer.append(line);
                    }
                    //Make sure we return a JavaScript string and not a Java string.
                    content = String(stringBuffer.toString()); //String
                } finally {
                    input.close();
                }
                callback(content);
            };
        }

        return text;
    });
}());

define('text!../style.css',[],function () { return '/* line 4, sass/style.scss */\n.facebook_like {\n  display: none;\n}\n\n/* line 8, sass/style.scss */\n#nav {\n  visibility: hidden;\n}\n\n/* line 13, sass/style.scss */\n.ep-nav-sub, .ep-nav ul:not(.ep-nav-market), .ep-nav-market {\n  -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 10px;\n  -moz-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 10px;\n  box-shadow: rgba(0, 0, 0, 0.2) 0 2px 10px;\n  background-color: white;\n  border: 1px solid #ccc;\n  display: none;\n  font-size: 12px;\n  left: 9px;\n  padding: 2px 0;\n  position: absolute;\n  top: 100%;\n  white-space: nowrap;\n}\n/* line 24, sass/style.scss */\n.ep-nav-sub a, .ep-nav ul:not(.ep-nav-market) a, .ep-nav-market a {\n  color: #333;\n}\n\n/* line 29, sass/style.scss */\n.ep-nav {\n  font-size: 13px;\n  left: 171px;\n  position: absolute;\n  top: 69px;\n  z-index: 20000;\n}\n/* line 35, sass/style.scss */\n.ep-nav a {\n  color: #777;\n}\n/* line 38, sass/style.scss */\n.ep-nav a:hover {\n  color: #333;\n}\n/* line 41, sass/style.scss */\n.ep-nav > li {\n  float: left;\n  position: relative;\n}\n/* line 44, sass/style.scss */\n.ep-nav > li > a {\n  display: block;\n  font-weight: bold;\n  padding: 6px 20px;\n}\n/* line 50, sass/style.scss */\n.ep-nav > li.open > a {\n  color: #333;\n}\n/* line 54, sass/style.scss */\n.ep-nav > li.open ul,\n.ep-nav > li.open .ep-nav-market {\n  display: block;\n}\n/* line 61, sass/style.scss */\n.ep-nav ul:not(.ep-nav-market) a {\n  display: block;\n  padding: 8px 10px;\n}\n/* line 64, sass/style.scss */\n.ep-nav ul:not(.ep-nav-market) a:hover {\n  background-color: #ffe8a4;\n}\n\n/* line 71, sass/style.scss */\n.ep-nav-market {\n  padding: 5px 10px;\n}\n/* line 74, sass/style.scss */\n.ep-nav-market a:hover img {\n  outline: 2px solid #ffe8a4;\n}\n/* line 77, sass/style.scss */\n.ep-nav-market img {\n  vertical-align: middle;\n  padding: 3px;\n}\n\n/* line 83, sass/style.scss */\n.ep-nav-market-non-products {\n  margin-left: 72px;\n}\n\n/* line 87, sass/style.scss */\nimg.ep-nav-market-job {\n  padding: 10px;\n}\n\n/* line 92, sass/style.scss */\n.ep-v {\n  color: #aaa;\n  font-size: 10px;\n  position: relative;\n  top: -1px;\n}\n\n/* line 100, sass/style.scss */\n#ep-links {\n  clear: both;\n  margin-bottom: 2em;\n  text-align: center;\n}\n\n/* line 106, sass/style.scss */\n#ep-settings {\n  -webkit-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 10px;\n  -moz-box-shadow: rgba(0, 0, 0, 0.2) 0 2px 10px;\n  box-shadow: rgba(0, 0, 0, 0.2) 0 2px 10px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  background-color: white;\n  border: 1px solid #ccc;\n  color: #666;\n  display: none;\n  font-size: 14px;\n  margin: -150px -300px 0 0;\n  overflow: auto;\n  padding: 20px;\n  position: fixed;\n  right: 50%;\n  top: 50%;\n  width: 600px;\n  z-index: 79979;\n}\n/* line 123, sass/style.scss */\n#ep-settings p {\n  margin-bottom: 10px;\n}\n/* line 126, sass/style.scss */\n#ep-settings label {\n  display: block;\n  padding: 6px 0;\n}\n/* line 130, sass/style.scss */\n#ep-settings button {\n  -webkit-border-radius: 4px;\n  -moz-border-radius: 4px;\n  -ms-border-radius: 4px;\n  -o-border-radius: 4px;\n  border-radius: 4px;\n  background-color: #e9f5fa;\n  border: none;\n  color: #3C8FA7;\n  cursor: pointer;\n  font-size: 14px;\n  margin: 10px 10px 0 0;\n  padding: 8px;\n}\n/* line 139, sass/style.scss */\n#ep-settings button:hover {\n  background-color: #d6ecf5;\n}\n\n/* line 145, sass/style.scss */\n#ep-settings-close {\n  color: #aaa;\n  font-size: 25px;\n  font-weight: bold;\n  line-height: 18px;\n  position: absolute;\n  right: 10px;\n  top: 10px;\n}\n/* line 153, sass/style.scss */\n#ep-settings-close:hover {\n  color: #333;\n}\n\n/* line 158, sass/style.scss */\n#ep-settings-custom-links {\n  width: 100%;\n}\n\n/* line 162, sass/style.scss */\n#ep-settings-update-hint {\n  font-size: 13px;\n}\n\n/* line 167, sass/style.scss */\n.item_mask li {\n  cursor: pointer !important;\n}\n';});

// Generated by CoffeeScript 1.3.3

define('auto-link',['require','jquery'],function(require) {
  return function() {
    var $;
    $ = require('jquery');
    return $('.buttons a')[1].click();
  };
});

/* ============================================================
 * bootstrap-dropdown.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

   // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , selector
        , isActive

      if ($this.is('.disabled, :disabled')) return

      selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}(window.jQuery);
define("bootstrap-dropdown", function(){});





var jade = (function(exports){
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(obj);
      }
    }
    return arr;
  } 
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj){
  var buf = []
    , terse = obj.terse;
  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;
  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];
      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else {
        buf.push(key + '="' + exports.escape(val) + '"');
      }
    }
  }
  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * `str` of jade, `filename`, and `lineno`.
 *
 * @param {Error} err
 * @param {String} str
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, str, filename, lineno){
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context); 

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno 
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;

})({});





define('jade',{
        version: '0.0.1',
    load: function (name, parentRequire, load, config) {
                    
    }
});
define('jade!../templates/nav', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul');
buf.push(attrs({ "class": ('ep-nav') }, {}));
buf.push('><li><a');
buf.push(attrs({ 'data-toggle':('dropdown'), 'href':('javascript:;') }, {"data-toggle":true,"href":true}));
buf.push('>' + escape((interp = nls.myPlaces) == null ? '' : interp) + '<span');
buf.push(attrs({ "class": ('ep-v') }, {}));
buf.push('> ▾</span></a><ul><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/myCompanies') }, {"href":true}));
buf.push('>' + escape((interp = nls.companies) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/training-grounds') }, {"href":true}));
buf.push('>' + escape((interp = nls.trainingGrounds) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/inventory') }, {"href":true}));
buf.push('>' + escape((interp = nls.storage) == null ? '' : interp) + '</a></li></ul></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/military/campaigns') }, {"href":true}));
buf.push('>' + escape((interp = nls.wars) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'data-toggle':('dropdown'), 'href':('javascript:;') }, {"data-toggle":true,"href":true}));
buf.push('>' + escape((interp = nls.market) == null ? '' : interp) + '<span');
buf.push(attrs({ "class": ('ep-v') }, {}));
buf.push('> ▾</span></a><div');
buf.push(attrs({ "class": ('ep-nav-market') }, {}));
buf.push('><p><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/1/1/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/1/q1_30x30.png'), 'title':('★ ' + (nls.food) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/1/2/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/1/q2_30x30.png'), 'title':('★★ ' + (nls.food) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/1/3/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/1/q3_30x30.png'), 'title':('★★★ ' + (nls.food) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/1/4/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/1/q4_30x30.png'), 'title':('★★★★ ' + (nls.food) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/1/5/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/1/q5_30x30.png'), 'title':('★★★★★ ' + (nls.food) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/1/6/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/1/q6_30x30.png'), 'title':('★★★★★★ ' + (nls.food) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/1/7/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/1/q7_30x30.png'), 'title':('★★★★★★★ ' + (nls.food) + '') }, {"src":true,"title":true}));
buf.push('/></a></p><p><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/2/1/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/2/q1_30x30.png'), 'title':('★ ' + (nls.weapon) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/2/2/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/2/q2_30x30.png'), 'title':('★★ ' + (nls.weapon) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/2/3/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/2/q3_30x30.png'), 'title':('★★★ ' + (nls.weapon) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/2/4/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/2/q4_30x30.png'), 'title':('★★★★ ' + (nls.weapon) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/2/5/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/2/q5_30x30.png'), 'title':('★★★★★ ' + (nls.weapon) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/2/6/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/2/q6_30x30.png'), 'title':('★★★★★★ ' + (nls.weapon) + '') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/2/7/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/2/q7_30x30.png'), 'title':('★★★★★★★ ' + (nls.weapon) + '') }, {"src":true,"title":true}));
buf.push('/></a></p><p><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/7/1/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/7/default_30x30.png'), 'title':(nls.foodRawMaterial) }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/market/' + (countryId) + '/12/1/citizen/0/price_asc/1') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/icons/industry/12/default_30x30.png'), 'title':(nls.weaponRawMaterial) }, {"src":true,"title":true}));
buf.push('/></a><span');
buf.push(attrs({ "class": ('ep-nav-market-non-products') }, {}));
buf.push('><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/job-market/' + (countryId) + '') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/modules/news/icons/cat_4.png'), 'title':(nls.jobMarket), "class": ('ep-nav-market-job') }, {"src":true,"title":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://economy.erepublik.com/en/market/company/' + (countryId) + '') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/modules/misc/companies.png'), 'title':(nls.companiesForSale), 'width':('30'), 'height':('30') }, {"src":true,"title":true,"width":true,"height":true}));
buf.push('/></a><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/economy/exchange-market/') }, {"href":true}));
buf.push('><img');
buf.push(attrs({ 'src':('http://www.erepublik.com/images/modules/_icons/gold_30.png'), 'title':(nls.monetaryMarket) }, {"src":true,"title":true}));
buf.push('/></a></span></p></div></li><li><a');
buf.push(attrs({ 'data-toggle':('dropdown'), 'href':('javascript:;') }, {"data-toggle":true,"href":true}));
buf.push('>' + escape((interp = nls.community) == null ? '' : interp) + '<span');
buf.push(attrs({ "class": ('ep-v') }, {}));
buf.push('> ▾</span></a><ul><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/news/latest/all') }, {"href":true}));
buf.push('>' + escape((interp = nls.newspapers) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/map') }, {"href":true}));
buf.push('>' + escape((interp = nls.worldMap) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/main/my-party') }, {"href":true}));
buf.push('>' + escape((interp = nls.myParty) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/main/elections') }, {"href":true}));
buf.push('>' + escape((interp = nls.elections) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/main/group-home/military') }, {"href":true}));
buf.push('>' + escape((interp = nls.militaryUnit) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/invite-friends') }, {"href":true}));
buf.push('>' + escape((interp = nls.inviteFriends) == null ? '' : interp) + '</a></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/badges') }, {"href":true}));
buf.push('>' + escape((interp = nls.badges) == null ? '' : interp) + '</a></li></ul></li><li><a');
buf.push(attrs({ 'href':('http://www.erepublik.com/en/get-gold/gold') }, {"href":true}));
buf.push('>' + escape((interp = nls.gold) == null ? '' : interp) + '</a></li>');
// iterate customLinks
;(function(){
  if ('number' == typeof customLinks.length) {
    for (var $index = 0, $$l = customLinks.length; $index < $$l; $index++) {
      var link = customLinks[$index];

buf.push('<li><a');
buf.push(attrs({ 'href':(link.url) }, {"href":true}));
buf.push('>' + escape((interp = link.text) == null ? '' : interp) + '</a></li>');
    }
  } else {
    for (var $index in customLinks) {
      if (customLinks.hasOwnProperty($index)){      var link = customLinks[$index];

buf.push('<li><a');
buf.push(attrs({ 'href':(link.url) }, {"href":true}));
buf.push('>' + escape((interp = link.text) == null ? '' : interp) + '</a></li>');
      }

   }
  }
}).call(this);

buf.push('</ul>');
}
return buf.join("");
}});

// Generated by CoffeeScript 1.3.3

define('nls/en',{
  _language: 'en',
  myPlaces: 'My places',
  companies: 'Companies',
  trainingGrounds: 'Training grounds',
  storage: 'Storage',
  wars: 'Wars',
  market: 'Market',
  food: 'Food',
  weapon: 'Weapon',
  foodRawMaterial: 'Food raw material',
  weaponRawMaterial: 'Weapon raw material',
  jobMarket: 'Job market',
  companiesForSale: 'Companies for sale',
  monetaryMarket: 'Monetary market',
  community: 'Community',
  newspapers: 'Newspapers',
  worldMap: 'World map',
  myParty: 'My party',
  elections: 'Elections',
  militaryUnit: 'Military unit',
  inviteFriends: 'Invite friends',
  badges: 'Badges',
  gold: 'Gold',
  ereplusSettings: 'Ereplus settings',
  customLinks: 'Custom Links',
  language: 'Language',
  update: 'Update',
  pageReloadRequired: 'Page reload required'
});

// Generated by CoffeeScript 1.3.3

define('nls/zh-tw',{
  _language: 'zh',
  myPlaces: '我的領域',
  companies: '公司',
  trainingGrounds: '訓練場所',
  storage: '倉庫',
  wars: '戰爭',
  market: '市場',
  food: '食物',
  weapon: '武器',
  foodRawMaterial: '食物原料',
  weaponRawMaterial: '武器原料',
  jobMarket: '就業市場',
  companiesForSale: '二手公司拍賣市場',
  monetaryMarket: '外匯市場',
  community: '玩家交流',
  newspapers: '新聞傳媒',
  worldMap: '世界地圖',
  myParty: '我的政黨',
  elections: '選舉中心',
  militaryUnit: '軍團',
  inviteFriends: '邀請朋友',
  badges: '官方徽章圖',
  gold: '黃金',
  ereplusSettings: 'Ereplus 設定',
  customLinks: '自訂連結',
  language: '語言',
  update: '更新',
  pageReloadRequired: '需重新整理網頁'
});

// Generated by CoffeeScript 1.3.3

define('nls',['require','nls/en','nls/zh-tw'],function(require) {
  var en, nls, zh;
  en = require('nls/en');
  zh = require('nls/zh-tw');
  nls = {
    en: en,
    zh: zh
  }[GM_getValue('language')];
  if (!nls) {
    nls = navigator.language.match(/^zh/) ? zh : en;
  }
  return nls;
});

// Generated by CoffeeScript 1.3.3

define('nav',['require','bootstrap-dropdown','jquery','jade!../templates/nav','nls'],function(require) {
  return function() {
    var $, countryId, customLinks, customLinksStr, line, navTpl, nls, result, _i, _len, _ref;
    require('bootstrap-dropdown');
    $ = require('jquery');
    navTpl = require('jade!../templates/nav');
    nls = require('nls');
    countryId = $('#nav a[href*="job-market"]').attr('href').match(/(\d+)$/)[0];
    customLinksStr = GM_getValue('customLinks');
    customLinks = [];
    if (customLinksStr) {
      _ref = customLinksStr.split('\n');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        result = line.match(/(.*)(https?:.*)/);
        if (result) {
          customLinks.push({
            text: result[1].trim(),
            url: result[2]
          });
        }
      }
    }
    return $(navTpl({
      nls: nls,
      countryId: countryId,
      customLinks: customLinks
    })).appendTo('#header');
  };
});

define('jade!../templates/settings', function(){ return function anonymous(locals, attrs, escape, rethrow) {
var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('ep-links') }, {}));
buf.push('><a');
buf.push(attrs({ 'id':('ep-settings-switcher'), 'href':('javascript:;') }, {"href":true}));
buf.push('>' + escape((interp = nls.ereplusSettings) == null ? '' : interp) + '</a></div><div');
buf.push(attrs({ 'id':('ep-settings') }, {}));
buf.push('><a');
buf.push(attrs({ 'id':('ep-settings-close'), 'href':('javascript:;') }, {"href":true}));
buf.push('>×</a><p><label');
buf.push(attrs({ 'for':('ep-settings-custom-links') }, {"for":true}));
buf.push('>' + escape((interp = nls.customLinks) == null ? '' : interp) + '</label><textarea');
buf.push(attrs({ 'id':('ep-settings-custom-links'), 'rows':('7'), 'wrap':('off') }, {"rows":true,"wrap":true}));
buf.push('>' + escape((interp = customLinks) == null ? '' : interp) + '</textarea></p><p><label');
buf.push(attrs({ 'for':('ep-settings-language') }, {"for":true}));
buf.push('>' + escape((interp = nls.language) == null ? '' : interp) + '</label><select');
buf.push(attrs({ 'id':('ep-settings-language') }, {}));
buf.push('><option');
buf.push(attrs({ 'value':('en') }, {"value":true}));
buf.push('>English</option><option');
buf.push(attrs({ 'value':('zh') }, {"value":true}));
buf.push('>中文</option></select></p><button');
buf.push(attrs({ 'id':('ep-settings-update') }, {}));
buf.push('>' + escape((interp = nls.update) == null ? '' : interp) + '</button><span');
buf.push(attrs({ 'id':('ep-settings-update-hint') }, {}));
buf.push('>' + escape((interp = nls.pageReloadRequired) == null ? '' : interp) + '</span></div>');
}
return buf.join("");
}});

// Generated by CoffeeScript 1.3.3

define('settings',['require','jquery','jade!../templates/settings','nls'],function(require) {
  return function() {
    var $, $settings, customLinks, nls, settingsTpl;
    $ = require('jquery');
    settingsTpl = require('jade!../templates/settings');
    nls = require('nls');
    customLinks = GM_getValue('customLinks');
    $(settingsTpl({
      nls: nls,
      customLinks: customLinks
    })).insertAfter('#footer');
    $('#ep-settings-language').val(nls._language);
    $settings = $('#ep-settings');
    $('#ep-settings-switcher').click(function() {
      return $settings.toggle();
    });
    $('#ep-settings-close').click(function() {
      return $settings.hide();
    });
    return $('#ep-settings-update').click(function() {
      GM_setValue('customLinks', $('#ep-settings-custom-links').val());
      GM_setValue('language', $('#ep-settings-language').val());
      return $settings.hide();
    });
  };
});

// Generated by CoffeeScript 1.3.3

define('battlefield',['require','jquery'],function(require) {
  return function() {
    var $, SERVER_DATA, el, leftCountry, rightCountry, updateTitle, updateTitleId, _ref;
    $ = require('jquery');
    SERVER_DATA = unsafeWindow.SERVER_DATA;
    _ref = (function() {
      var _i, _len, _ref, _results;
      _ref = $('#pvp h3');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        _results.push(el.textContent);
      }
      return _results;
    })(), leftCountry = _ref[0], rightCountry = _ref[1];
    setTimeout(function() {
      var leftFlagSrc;
      leftFlagSrc = $('.left_side img:eq(0)').attr('src').replace('flags_png/L', 'flags_png/S');
      $('link[rel="shortcut icon"]').remove();
      return $('<link/>', {
        rel: 'shortcut icon',
        type: 'image/png',
        href: leftFlagSrc
      }).appendTo('head');
    }, 7000);
    updateTitle = function() {
      var domination, leftScore, rightScore, title, _ref1;
      domination = unsafeWindow.current_domination;
      leftScore = SERVER_DATA.points.defender;
      rightScore = SERVER_DATA.points.attacker;
      if (SERVER_DATA.mustInvert) {
        domination = 100 - domination;
        _ref1 = [rightScore, leftScore], leftScore = _ref1[0], rightScore = _ref1[1];
      }
      domination = parseFloat(domination).toFixed(2);
      title = leftScore >= 1800 ? "W" : rightScore >= 1800 ? "L" : "" + domination + "% " + leftScore + ":" + rightScore;
      document.title = title;
      if (leftScore >= 1800 || rightScore >= 1800) {
        return clearInterval(updateTitleId);
      }
    };
    return updateTitleId = setInterval(updateTitle, 7000);
  };
});

// Generated by CoffeeScript 1.3.3

define('storage',['require','jquery'],function(require) {
  return function() {
    var $, sell;
    $ = require('jquery');
    sell = function(el, icon) {
      var stock;
      icon[0].click();
      stock = $(el).find('strong').text().replace(',', '');
      if (stock >= 9999) {
        stock = 9999;
      }
      $('#sell_amount').val(stock);
      return $('#sell_offers').show();
    };
    $('.product_list li').click(function() {
      var $this, industry, quality;
      $this = $(this);
      quality = $this.attr('quality');
      if (quality === "10") {
        return;
      }
      industry = $this.attr('industry');
      return sell(this, $(".q" + quality + ".industry_quality_selector[industry=" + industry + "]"));
    });
    $('#stock_7_1').parent().click(function() {
      return sell(this, $('.industry_quality_selector[industry=7]'));
    });
    return $('#stock_12_1').parent().click(function() {
      return sell(this, $('.industry_quality_selector[industry=12]'));
    });
  };
});

// Generated by CoffeeScript 1.3.3

define('init',['require','text!../style.css','auto-link','nav','settings','battlefield','storage'],function(require) {
  var match;
  GM_addStyle(require('text!../style.css'));
  match = function(pattern) {
    return location.pathname.match(pattern);
  };
  if (match(/\/get-gold\/|loyalty\/program|\/gold-bonus\//)) {
    return;
  }
  if (match(/main\/warn/)) {
    require('auto-link')();
    return;
  }
  require('nav')();
  require('settings')();
  if (match(/military\/battlefield/)) {
    return require('battlefield')();
  } else if (match(/economy\/inventory/)) {
    return require('storage')();
  }
});

// Generated by CoffeeScript 1.3.3

require(['init'], function() {
  return 'hi';
});

define("main", function(){});