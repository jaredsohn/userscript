// ==UserScript==
// @name        Google Search Languages
// @namespace   http://akr.tw/
// @version     1.2.1
//
// @description Switches Google Search to any languages.
// @author      Ming-Hsien Lin
// @license     MIT License
//
// @homepageURL https://userscripts.org/scripts/show/182276
// @downloadURL https://userscripts.org/scripts/source/182276.user.js
// @updateURL   https://userscripts.org/scripts/source/182276.meta.js
//
// @include     http://www.google.*/
// @include     http://www.google.*/?*
// @include     http://www.google.*/#*
// @include     http://www.google.*/search*
// @include     http://www.google.*/webhp*
// @include     https://www.google.*/
// @include     https://www.google.*/?*
// @include     https://www.google.*/#*
// @include     https://www.google.*/search*
// @include     https://www.google.*/webhp*
// @include     https://encrypted.google.*/
// @include     https://encrypted.google.*/?*
// @include     https://encrypted.google.*/#*
// @include     https://encrypted.google.*/search*
// @include     https://encrypted.google.*/webhp*
//
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       unsafeWindow
// ==/UserScript==

/**
 * Namespace of this userscript.
 */
var GSL = {};

/**
 * Initializes userscript.
 */
GSL.init = function () {
  var self = this;

  // Initialize modules.
  self.$ = self.$();
  self.url = self.url();
  self.settings = self.settings();
  self.langs = self.langs();
  self.view = self.view();

  return self;
};

/**
 * Helper functions and DOM methods.
 */
GSL.$ = function () {
  var self = this;

  // Define a local copy of this module.
  var $ = function (query, context) {
    if (!(this instanceof $)) {
      return new $.prototype.find(query, context);
    }
  };

  // Shortcuts of native methods.
  var nativeConcat = Array.prototype.concat;
  var nativePush = Array.prototype.push;
  var nativeSlice = Array.prototype.slice;
  var nativeIsArray = Array.isArray;

  var toString = Object.prototype.toString;
  var keys = Object.keys;

  // Regular expression for CSS selector.
  var idExpr = /^#[\w-]+$/;
  var classExpr = /^\.[\w-]+$/;
  var tagExpr = /^\w+$/;

  /**
   * Converts DOM style name to CSS style.
   * e.g., "fontSize" to "font-size"
   */
  var toCSSName = function (name) {
    return name.replace(/[A-Z]/g, function (match) {
      return '-' + match.toLowerCase();
    });
  };

  /**
   * Converts CSS style name to DOM style.
   * e.g., "font-size" to "fontSize"
   */
  var toDOMName = function (name) {
    return name.replace(/-[a-z]/g, function (match) {
      return match.slice(1).toUpperCase();
    });
  };

  /**
   * Returns true if object is an array.
   */
  var isArray = $.isArray = function (obj) {
    return nativeIsArray(obj);
  };

  /**
   * Returns true if object is a plain object.
   */
  var isObject = $.isObject = function (obj) {
    return toString.call(obj) === '[object Object]';
  };

  /**
   * Returns true if object is a string.
   */
  var isString = $.isString = function (obj) {
    return toString.call(obj) === '[object String]';
  };

  /**
   * Returns true if object is a DOM element.
   */
  var isNode = $.isNode = function (obj) {
    return !!(obj && obj.nodeType);
  };

  /**
   * Returns true if object is a DOM element list.
   */
  var isNodeList = $.isNodeList = function (obj) {
    return (obj.toString() === '[object NodeList]') ||
           (obj.toString() === '[object HTMLCollection]');
  };

  /**
   * Returns a new array comprised of given arrays.
   */
  var concat = $.concat = function (obj, var_args) {
    return nativeConcat.apply(obj, nativeSlice.call(arguments, 1));
  };

  /**
   * Appends new items to an array and returns its new length.
   */
  var push = $.push = function (obj, var_args) {
    return nativePush.apply(obj, nativeSlice.call(arguments, 1));
  };

  /**
   * Returns a copy of a portion of given array.
   */
  var slice = $.slice = function (obj, var_args) {
    return nativeSlice.apply(obj, nativeSlice.call(arguments, 1));
  };

  /**
   * Iterates over a list of elements (array or plain object).
   */
  var each = $.each = function (obj, iterator, context) {
    var i;
    var length;

    if (obj === null) { return this; }
    if (obj.length === +obj.length) {
      for (i = 0, length = obj.length; i < length; i = i + 1) {
        if (iterator.call(context, obj[i], i, obj) === false) {
          break;
        }
      }
    } else {
      var props = keys(obj);
      for (i = 0, length = props.length; i < length; i = i + 1) {
        if (iterator.call(context, obj[props[i]], props[i], obj) === false) {
          break;
        }
      }
    }

    return this;
  };

  /**
   * Maps over a list of elements.
   */
  var map = $.map = function (obj, iterator, context) {
    var results = [];

    if (obj === null) { return results; }

    each(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });

    return results;
  };

  /**
   * Returns a duplicate-free version of an array.
   */
  var uniq = $.uniq = function (obj) {
    var results = [];

    each(obj, function (value) {
      if (results.indexOf(value) === -1) {
        results.push(value);
      }
    });

    return results;
  };

  /**
   * Fills in undefined properties in object with values from the defaults
   * objects, and returns the object.
   */
  var defaults = $.defaults = function (obj, var_args) {
    each(slice(arguments, 1), function (argument) {
      if (argument) {
        for (var prop in argument) {
          if (obj[prop] === void 0) {
            obj[prop] = argument[prop];
          }
        }
      }
    });

    return obj;
  };

  $.prototype = {
    /**
     * Finds DOM elements that match a query string.
     */
    find: function (query, context) {
      var elements = [];

      if (!query) { return this; }

      if (context === void 0 && this.length) {
        each(this, function (element) {
          elements = elements.concat(slice($(query, element)));
        });
        elements = uniq(elements);
      } else {
        context = context || document;

        if (isString(query)) {
          if (idExpr.test(query)) {
            query = query.slice(1);
            elements = [context.getElementById(query)];
            if (elements[0] === null) { elements = []; }
          } else if (classExpr.test(query)) {
            query = query.slice(1);
            elements = context.getElementsByClassName(query);
          } else if (tagExpr.test(query)) {
            elements = context.getElementsByTagName(query);
          } else {
            elements = context.querySelectorAll(query);
          }

          elements = slice(elements);
        } else if (isArray(query)) {
          elements = query;
        } else if (isNode(query)) {
          elements = [query];
        } else if (isNodeList(query)) {
          elements = slice(query);
        }
      }

      return this.set(elements);
    },

    /**
     * Sets the objects in the module.
     */
    set: function (elements) {
      var ret = $();
      ret.cache = slice(this.length ? this : []);
      ret.length = 0;
      nativePush.apply(ret, elements);
      return ret;
    },

    /**
     * Iterates over elements.
     */
    each: function (iterator, context) {
      each(this, iterator, context);
      return this;
    },

    /**
     * Mapping elements.
     */
    map: function (iterator, context) {
      map(this, iterator, context);
      return this;
    },

    /**
     * Sets or gets inner HTML of each elements.
     */
    html: function (html) {
      if (html) {
        each(this, function (element) {
          element.innerHTML = html;
        });
        return this;
      } else {
        return map(this, function (element) {
          return element.innerHTML;
        });
      }
    },

    /**
     * Inserts HTML content after each elements.
     */
    after: function (html) {
      var tempElement = document.createElement('i');
      var childNodes;

      tempElement.innerHTML = html;
      childNodes = tempElement.childNodes;

      each(this, function (element) {
        var parentNode = element.parentNode;
        var nextSibling = element.nextSibling;
        each(childNodes, function (childNode) {
          parentNode.insertBefore(childNode.cloneNode(), nextSibling);
        });
      });

      return this;
    },

    /**
     * Gets or sets an attribute of each elements.
     */
    attr: function (name, value) {
      if (value) {
        each(this, function (element) {
          element.setAttribute(name, value);
        });
        return this;
      } else {
        return map(this, function (element) {
          return element.getAttribute(name);
        });
      }
    },

    /**
     * Gets or sets a style property of each elements.
     */
    css: function (name, value) {
      if (value) {
        name = toDOMName(name);
        each(this, function (element) {
          element.style[name] = value;
        });
        return this;
      } else {
        name = toCSSName(name);
        return map(this, function (element) {
          return document.defaultView.getComputedStyle(element, '').getPropertyValue(name);
        });
      }
    },

    /**
     * Attaches an event handler function for each elements.
     */
    on: function (type, listener) {
      each(this, function (element) {
        element.addEventListener(type, function (event) {
          if (listener.call(element, event) === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        }, false);
      });

      return this;
    }
  };

  // Give the init function the prototype for later instantiation.
  $.prototype.find.prototype = $.prototype;

  return $;
};

/**
 * URL parsing and modifying module.
 */
GSL.url = function () {
  var self = this;

  // Define a local copy.
  var url = function (address) {
    // If address is not given, use current URL.
    address = address || window.location.href;

    if (!(this instanceof url)) {
      return new url.prototype.set(address);
    }
  };

  // Regular Expression to parse URL.
  var urlExpr = /^(?:([A-Za-z]+):)?\/{0,3}([\w.-]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

  /**
   * Parses URL parameters to an plain object.
   */
  var parse = function (query) {
    var result = {};

    self.$.each(query.split('&'), function (part) {
      var name = part.split('=')[0];
      var value = part.split('=').slice(1).join('=');

      if (self.$.isArray(result[name])) {
        result[name].push(value);
      } else {
        result[name] = [value];
      }
    });

    return result;
  };

  /**
   * Parse parameter object to a URL string.
   */
  var join = function (params) {
    var result = '';

    self.$.each(params, function (value, name) {
      self.$.each(value, function (part) {
        result = result + name + '=' + part + '&';
      });
    });

    return result.replace(/^&|&$/, '');
  };

  url.prototype = {
    /**
     * Parses given URL.
     */
    set: function (address) {
      var matches = urlExpr.exec(address);

      this.scheme = matches[1];
      this.host = matches[2];
      this.port = matches[3];
      this.path = matches[4];
      this.search = matches[5] ? parse(matches[5]) : null;
      this.hashes = matches[6] ? parse(matches[6]) : null;

      return this;
    },

    /**
     * Generates URL string.
     */
    get: function () {
      return this.scheme + '://' + this.host +
             (this.port ? '?' + this.port : '') + '/' +
             this.path +
             (this.search ? '?' + join(this.search) : '') +
             (this.hashes ? '#' + join(this.hashes) : '');
    },

    /**
     * Gets or sets a URL parameter.
     */
    param: function (name, value) {
      if (self.$.isString(value)) {
        if (this.search) { this.search[name] = [value]; }
        if (this.hashes) { this.hashes[name] = [value]; }
        return this;
      } else {
        return self.$.concat(this.search ? this.search[name] : [],
                             this.hashes ? this.hashes[name] : []);
      }
    },

    /**
     * Filters URL parameters by deleting parameters that are not in given array.
     */
    filterParam: function (filter) {
      var iterator = function (value, name) {
        if (filter.indexOf(name) === -1) {
          this.search[name] = null;
        }
      };

      self.$.each(this.search, iterator, this);
      self.$.each(this.hashes, iterator, this);
    }
  };

  // Give the init function the prototype for later instantiation.
  url.prototype.set.prototype = url.prototype;

  return url;
};

/**
 * User settings modules.
 */
GSL.settings = function () {
  var self = this;

  var settings = function () {
    return this;
  };

  // The key of GM values API.
  var key = 'settings';

  // Settings values.
  var values = {};

  // Default settings.
  var defaultValues = {
    langs: ['en']
  };

  /**
   * Initializes settings.
   */
  var init = settings.init = function () {
    // Try to read settings from GM storage.
    // If saved settings is not a legal JSON data, fall back to defaults.
    try {
      values = JSON.parse(GM_getValue(key, '{}'));
    } catch (error) {
      values = {};
    } finally {
      values = self.$.defaults(values, defaultValues);
    }

    return this;
  };

  /**
   * Gets settings value by given property name.
   */
  var get = settings.get = function (name) {
    return values[name];
  };

  /**
   * Sets settings value with given value.
   */
  var set = settings.set = function (name, value) {
    values[name] = value;
    GM_setValue(key, JSON.stringify(values));
    return this;
  };

  /**
   * Shortcut for getting or setting value.
   */
  var val = settings.val = function (name, value) {
    if (value) {
      return set(name, value);
    } else {
      return get(name);
    }
  };

  /**
   * Deletes all settings and initializes it again.
   */
  var reset = settings.reset = function () {
    self.$.each(GM_listValues(), function (key) {
      GM_deleteValue(key);
    });
    init();
    return this;
  };

  // Initialize settings for first time use.
  init();

  return settings;
};

/**
 * Languages module.
 */
GSL.langs = function () {
  var self = this;

  var langs = function () {
    return this;
  };

  // Define ISO 639 codes and its name of all languages.
  var data = {
    'de': {name: 'Deutsch', top: true},
    'en': {name: 'English', top: true},
    'es': {name: 'español', top: true},
    'es-419': {name: 'español (Latinoamérica)', top: true},
    'fr': {name: 'français', top: true},
    'hr': {name: 'hrvatski', top: true},
    'it': {name: 'italiano', top: true},
    'nl': {name: 'Nederlands', top: true},
    'pl': {name: 'polski', top: true},
    'pt-BR': {name: 'português (Brasil)', top: true},
    'pt-PT': {name: 'português (Portugal)', top: true},
    'vi': {name: 'Tiếng Việt', top: true},
    'tr': {name: 'Türkçe', top: true},
    'ru': {name: 'русский', top: true},
    'ar': {name: 'العربية', top: true},
    'th': {name: 'ไทย', top: true},
    'ko': {name: '한국어', top: true},
    'zh-CN': {name: '中文 (简体)', top: true},
    'zh-TW': {name: '中文 (繁體)', top: true},
    'ja': {name: '日本語', top: true},
    'ach': {name: 'Acoli', top: false},
    'af': {name: 'Afrikaans', top: false},
    'ak': {name: 'Akan', top: false},
    'az': {name: 'azərbaycanca', top: false},
    'id': {name: 'Bahasa Indonesia', top: false},
    'ms': {name: 'Bahasa Melayu', top: false},
    'ban': {name: 'Balinese', top: false},
    'bh': {name: 'Bihari', top: false},
    'xx-bork': {name: 'Bork, bork, bork!', top: false},
    'bs': {name: 'bosanski', top: false},
    'br': {name: 'brezhoneg', top: false},
    'ca': {name: 'català', top: false},
    'ceb': {name: 'Cebuano', top: false},
    'cs': {name: 'čeština', top: false},
    'sn': {name: 'chiShona', top: false},
    'co': {name: 'Corsican', top: false},
    'cy': {name: 'Cymraeg', top: false},
    'da': {name: 'dansk', top: false},
    'yo': {name: 'Èdè Yorùbá', top: false},
    'et': {name: 'eesti', top: false},
    'xx-elmer': {name: 'Elmer Fudd', top: false},
    'eo': {name: 'esperanto', top: false},
    'eu': {name: 'euskara', top: false},
    'ee': {name: 'eʋegbe', top: false},
    'tl': {name: 'Filipino', top: false},
    'fo': {name: 'føroyskt', top: false},
    'gaa': {name: 'Ga', top: false},
    'ga': {name: 'Gaeilge', top: false},
    'gl': {name: 'galego', top: false},
    'gn': {name: 'Guarani', top: false},
    'xx-hacker': {name: 'Hacker', top: false},
    'ht': {name: 'Haitian', top: false},
    'ha': {name: 'Hausa', top: false},
    'haw': {name: 'ʻŌlelo Hawaiʻi', top: false},
    'bem': {name: 'Ichibemba', top: false},
    'ig': {name: 'Igbo', top: false},
    'rn': {name: 'Ikirundi', top: false},
    'ia': {name: 'Interlingua', top: false},
    'zu': {name: 'isiZulu', top: false},
    'is': {name: 'íslenska', top: false},
    'jw': {name: 'Javanese', top: false},
    'rw': {name: 'Kinyarwanda', top: false},
    'ky': {name: 'Kirghiz', top: false},
    'sw': {name: 'Kiswahili', top: false},
    'xx-klingon': {name: 'Klingon', top: false},
    'kg': {name: 'Kongo', top: false},
    'mfe': {name: 'kreol morisien', top: false},
    'kri': {name: 'Krio (Sierra Leone)', top: false},
    'ku': {name: 'Kurdish', top: false},
    'la': {name: 'Latin', top: false},
    'lv': {name: 'latviešu', top: false},
    'to': {name: 'lea fakatonga', top: false},
    'lt': {name: 'lietuvių', top: false},
    'ln': {name: 'lingála', top: false},
    'loz': {name: 'Lozi', top: false},
    'lua': {name: 'Luba-Lulua', top: false},
    'lg': {name: 'Luganda', top: false},
    'hu': {name: 'magyar', top: false},
    'mg': {name: 'Malagasy', top: false},
    'mt': {name: 'Malti', top: false},
    'mi': {name: 'Maori', top: false},
    'mo': {name: 'Moldovenească', top: false},
    'pcm': {name: 'Nigerian Pidgin', top: false},
    'no': {name: 'norsk', top: false},
    'nso': {name: 'Northern Sotho', top: false},
    'ny': {name: 'Nyanja', top: false},
    'nn': {name: 'nynorsk', top: false},
    'oc': {name: 'Occitan', top: false},
    'om': {name: 'Oromoo', top: false},
    'xx-pirate': {name: 'Pirate', top: false},
    'pt': {name: 'português', top: false},
    'qu': {name: 'Quechua', top: false},
    'ro': {name: 'română', top: false},
    'rm': {name: 'rumantsch', top: false},
    'nyn': {name: 'Runyankore', top: false},
    'gd': {name: 'Scottish Gaelic', top: false},
    'crs': {name: 'Seychellois Creole', top: false},
    'sq': {name: 'shqip', top: false},
    'sd': {name: 'Sindhi', top: false},
    'sk': {name: 'slovenčina', top: false},
    'sl': {name: 'slovenščina', top: false},
    'so': {name: 'Soomaali', top: false},
    'ckb': {name: 'Sorani Kurdish', top: false},
    'st': {name: 'Southern Sotho', top: false},
    'sr-ME': {name: 'Srpski (Crna Gora)', top: false},
    'sh': {name: 'Srpskohrvatski', top: false},
    'su': {name: 'Sundanese', top: false},
    'fi': {name: 'suomi', top: false},
    'sv': {name: 'svenska', top: false},
    'tg': {name: 'Tajik', top: false},
    'tt': {name: 'Tatar', top: false},
    'tn': {name: 'Tswana', top: false},
    'tum': {name: 'Tumbuka', top: false},
    'tk': {name: 'Turkmen', top: false},
    'tw': {name: 'Twi', top: false},
    'ug': {name: 'Uyghur', top: false},
    'fy': {name: 'Western Frisian', top: false},
    'wo': {name: 'Wolof', top: false},
    'xh': {name: 'Xhosa', top: false},
    'yi': {name: 'Yiddish', top: false},
    'el': {name: 'Ελληνικά', top: false},
    'be': {name: 'беларуская', top: false},
    'bg': {name: 'български', top: false},
    'kk': {name: 'қазақ тілі', top: false},
    'mk': {name: 'македонски', top: false},
    'mn': {name: 'монгол', top: false},
    'sr': {name: 'Српски', top: false},
    'uk': {name: 'українська', top: false},
    'uz': {name: 'Ўзбек', top: false},
    'ka': {name: 'ქართული', top: false},
    'hy': {name: 'հայերեն', top: false},
    'iw': {name: 'עברית', top: false},
    'ur': {name: 'اردو', top: false},
    'ps': {name: 'پښتو', top: false},
    'fa': {name: 'فارسی', top: false},
    'ti': {name: 'ትግርኛ', top: false},
    'am': {name: 'አማርኛ', top: false},
    'ne': {name: 'नेपाली', top: false},
    'mr': {name: 'मराठी', top: false},
    'hi': {name: 'हिन्दी', top: false},
    'bn': {name: 'বাংলা', top: false},
    'pa': {name: 'ਪੰਜਾਬੀ', top: false},
    'gu': {name: 'ગુજરાતી', top: false},
    'or': {name: 'ଓଡ଼ିଆ', top: false},
    'ta': {name: 'தமிழ்', top: false},
    'te': {name: 'తెలుగు', top: false},
    'kn': {name: 'ಕನ್ನಡ', top: false},
    'ml': {name: 'മലയാളം', top: false},
    'si': {name: 'සිංහල', top: false},
    'lo': {name: 'ລາວ', top: false},
    'my': {name: 'ဗမာ', top: false},
    'km': {name: 'ខ្មែរ', top: false},
    'chr': {name: 'ᏣᎳᎩ', top: false}
  };

  /**
   * Returns a language data by given ISO 639 code.
   */
  var get = langs.get = function (code) {
    var item = data[code] || data.en;
    item.code = code;
    return item;
  };

  /**
   * Returns what language is used on current page.
   */
  var getCurrentLang = langs.getCurrentLang = function () {
    // unsafeWindow is not pretty good, but this is the fastest and easiest way
    // to get current language of the page.
    var code = unsafeWindow.google.kHL || 'en';
    return get(code);
  };

  /**
   * Returns all languages data.
   */
  var dump = langs.dump = function () {
    return data;
  };

  return langs;
};

/**
 * View module.
 */
GSL.view = function () {
  var self = this;

  /**
   * Initializes view.
   */
  var init = function () {
    addStyle();

    window.addEventListener('load', createMenu, false);

    // Try to add menu if page content is changed.
    var observer = new MutationObserver(createMenu);
    observer.observe(document.querySelector('body'), {childList: true});

    return true;
  };

  /**
   * Injects CSS styles to the page.
   */
  var addStyle = function () {
    GM_addStyle(
        '.GSL {' +
        '  -webkit-box-sizing: border-box;' +
        '     -moz-box-sizing: border-box;' +
        '          box-sizing: border-box;' +
        '}' +

        '.GSL_cf:before,' +
        '.GSL_cf:after {' +
        '  display: table;' +
        '  content: " ";' +
        '}' +

        '.GSL_cf:after {' +
        '  clear: both;' +
        '}' +

        '.GSL_left {' +
        '  float: left;' +
        '}' +

        '.GSL_right {' +
        '  float: right;' +
        '}' +

        '.GSL_btn {' +
        '  padding: 5px 8px;' +
        '  border: 1px solid rgba(0, 0, 0, 0.1);' +
        '  border-radius: 2px;' +
        '  background-color: #F5F5F5;' +
        '  background-image: -webkit-linear-gradient(top, #F5F5F5, #F1F1F1);' +
        '  background-image:    -moz-linear-gradient(top, #F5F5F5, #F1F1F1);' +
        '  background-image:         linear-gradient(top, #F5F5F5, #F1F1F1);' +
        '  color: #222;' +
        '  font-family: inherit;' +
        '  font-size: 11px;' +
        '  font-weight: 700;' +
        '  -webkit-transition: all 200ms ease;' +
        '     -moz-transition: all 200ms ease;' +
        '          transition: all 200ms ease;' +
        '}' +

        '.GSL_btn_primary {' +
        '  background-color: #4D90FE;' +
        '  background-image: -webkit-linear-gradient(top, #4D90FE, #4787ED);' +
        '  background-image:    -moz-linear-gradient(top, #4D90FE, #4787ED);' +
        '  background-image:         linear-gradient(top, #4D90FE, #4787ED);' +
        '  color: #FFF;' +
        '}' +

        '.GSL_btn:hover {' +
        '  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);' +
        '  background-color: #F8F8F8;' +
        '  background-image: -webkit-linear-gradient(top, #F8F8F8, #F1F1F1);' +
        '  background-image:    -moz-linear-gradient(top, #F8F8F8, #F1F1F1);' +
        '  background-image:         linear-gradient(top, #F8F8F8, #F1F1F1);' +
        '}' +

        '.GSL_btn:active {' +
        '  box-shadow: inset 0px 1px 2px rgba(0, 0, 0, 0.1);' +
        '}' +

        '.GSL_btn_primary:hover {' +
        '  background-color: #357AE8;' +
        '  background-image: -webkit-linear-gradient(top, #4D90FE, #357AE8);' +
        '  background-image:    -moz-linear-gradient(top, #4D90FE, #357AE8);' +
        '  background-image:         linear-gradient(top, #4D90FE, #357AE8);' +
        '}' +

        '.GSL_input_checkbox {' +
        '  position: absolute;' +
        '  opacity: 0;' +
        '}' +

        '.GSL_input_checkbox ~ .GSL_checkbox {' +
        '  display: inline-block;' +
        '  position: relative;' +
        '  width: 11px;' +
        '  height: 11px;' +
        '  border: 1px solid rgba(155, 155, 155, 0.57);' +
        '  border-radius: 1px;' +
        '  background-color: #FFF;' +
        '}' +

        '.GSL_input_checkbox ~ .GSL_checkbox:hover {' +
        '  box-shadow: inset 0px 1px 1px rgba(0, 0, 0, 0.1);' +
        '}' +

        '.GSL_input_checkbox:active ~ .GSL_checkbox {' +
        '  background-color: #EBEBEB;' +
        '}' +

        '.GSL_input_checkbox:focus ~ .GSL_checkbox {' +
        '  border: 1px solid #4D90FE;' +
        '}' +

        '.GSL_input_checkbox:checked ~ .GSL_checkbox > .GSL_checkbox_mark {' +
        '  position: relative;' +
        '  top: -3px;' +
        '  left: 0;' +
        '  width: 15px;' +
        '  height: 15px;' +
        '  background-color: transparent;' +
        '  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAtklEQVQ4y2P4//' +
                                 '8/A7Ux1Q0cxoaCADIbCUgCMTvVXAoE5kA8CYidyXYpGrAH4iVAHIXiCwoMDQTimUBcBsRMlBrKCsTpUANzk' +
                                 'C0j11BuIK6EGlgKsoAkQ4FgChD7AzELVI8YEDdDDawDYk6YQaQY6gg1oAqILYC4D8oHGcyLbBAphoJAKtQg' +
                                 'GO4EYiHk2CLHUJAXm6AG9gCxNHoSIMdQEJCFGqiALaGSayjMxQwUGzq0S6nhZygA2ojsbh6J67kAAAAASUV' +
                                 'ORK5CYII=);' +
        '  background-position: -5px -3px;' +
        '}' +

        '#GSL_dialogLink {' +
        '  cursor: pointer;' +
        '  font-size: 80%;' +
        '}' +

        '#GSL_dialogBackground {' +
        '  display: none;' +
        '  position: fixed;' +
        '  top: 0;' +
        '  left: 0;' +
        '  z-index: 9999;' +
        '  width: 100%;' +
        '  height: 100%;' +
        '  background-color: rgba(255, 255, 255, 0.75);' +
        '}' +

        '#GSL_dialog {' +
        '  display: none;' +
        '  position: fixed;' +
        '  top: 100px;' +
        '  left: 50%;' +
        '  z-index: 9999;' +
        '  min-width: 640px;' +
        '  max-height: 480px;' +
        '  margin-left: -320px;' +
        '  padding: 20px;' +
        '  border: 1px solid #C5C5C5;' +
        '  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);' +
        '  background-color: #FFF;' +
        '}' +

        '#GSL_dialog_header {' +
        '  font-size: 20px;' +
        '  font-weight: 400;' +
        '}' +

        '#GSL_dialog_content {' +
        '  margin: 20px 0;' +
        '}' +

        '#GSL_dialog_langList {' +
        '  min-width: 600px;' +
        '  max-width: 600px;' +
        '  min-height: 350px;' +
        '  max-height: 350px;' +
        '  overflow-y: auto;' +
        '}' +

        '.GSL_dialog_langItem {' +
        '  min-width: 30%;' +
        '  max-width: 30%;' +
        '  min-height: 20px;' +
        '  max-height: 20px;' +
        '  margin: 0 5px;' +
        '  font-size: 12px;' +
        '  overflow: hidden;' +
        '  white-space: nowrap;' +
        '}' +

        '.GSL_dialog_langItem_link {' +
        '  color: #999 !important;' +
        '  text-decoration: none !important;' +
        '}'
      );
  };

  /**
   * Binds event handlers to DOM elements.
   */
  var bindEvents = function () {
    self.$('#GSL_dialogLink').on('click', openDialog);
    self.$('#GSL_dialogBackground').on('click', closeDialog);
    self.$('#GSL_button_cancel').on('click', closeDialog);
    self.$('#GSL_button_save').on('click', saveSettings);
    self.$('#GSL_button_reset').on('click', resetSettings);

    self.$('.GSL_menuLink').on('click', function (event) {
      window.location.href = self.$(this).attr('href');
      return false;
    });

    self.$('.GSL_dialog_langItem_link').on('click', function (event) {
      window.open(self.$(this).attr('href'));
      return false;
    });
  };

  /**
   * Appends a language selection menu to Google Search tools.
   */
  var createMenu = function (event) {
    var $position = self.$('#hdtb-mn-gp');
    var $menu = self.$('#GSL_menu');

    if ($position.length !== 0 && $menu.length === 0) {
      $position.after(
          '<div id="GSL_menuButton" class="hdtb-mn-hd" tabindex="0" role="button" aria-haspopup="true">' +
          '  <div class="mn-hd-txt">Languages</div>' +
          '  <span class="mn-dwn-arw"></span>' +
          '</div>' +
          '<ul id="GSL_menu" class="hdtbU hdtb-mn-c">' +
          '</ul>'
        );

      updateMenu(event);
    }
  };

  /**
   * Updates language selection menu content.
   */
  var updateMenu = function (event) {
    var $menuButton = self.$('#GSL_menuButton');
    var $menu = self.$('#GSL_menu');
    var currentLang = self.langs.getCurrentLang();
    var userLangs = self.settings.get('langs');
    var menuHTML = '';

    $menuButton.find('div')
        .attr('lang', currentLang.code)
        .html(currentLang.name);

    self.$.each(userLangs, function (userLang) {
      var lang = self.langs.get(userLang);
      var link = self.url()
                 .param('hl', lang.code)
                 .param('lr', '')
                 .param('start', '')
                 .get();

      if (currentLang.code === lang.code) {
        menuHTML = menuHTML +
                   '<li class="hdtbItm hdtbSel" lang="' + lang.code + '">' +
                   lang.name +
                   '</li>';
      } else {
        menuHTML = menuHTML +
                   '<li class="hdtbItm" lang="' + lang.code + '">' +
                   '  <a href="' + link + '" class="GSL_menuLink q qs">' + lang.name + '</a>' +
                   '</li>';
      }
    });

    menuHTML = menuHTML +
               '<li class="hdtbItm">' +
               '  <div class="cdr_sep"></div>' +
               '  <a id="GSL_dialogLink" class="q qs" title="Open Google Search Languages Settings...">' +
               '    ...' +
               '  </a>' +
               '</li>';

    $menu.html(menuHTML);

    bindEvents();
  };

  /**
   * Creates the settings dialog.
   */
  var createDialog = function (event) {
    var userLangs = self.settings.get('langs');
    var langListHTML = '';

    self.$('#cnt').after(
        '<div id="GSL_dialogBackground"></div>' +
        '<div id="GSL_dialog" class="GSL">' +
        '  <div id="GSL_dialog_header">' +
        '    Google Search Languages' +
        '  </div>' +
        '  <div id="GSL_dialog_content">' +
        '    <div id="GSL_dialog_langText"></div>' +
        '    <div id="GSL_dialog_langList" class="GSL_cf">' +
        '    </div>' +
        '  </div>' +
        '  <div id="GSL_dialog_footer">' +
        '  </div>' +
        '</div>'
      );

    updateDialog(event);
  };

  /**
   * Updates the settings dialog content.
   */
  var updateDialog = function (event) {
    var userLangs = self.settings.get('langs');
    var langListHTML = '';

    self.$('#GSL_dialog_langText').html('');

    self.$.each(self.langs.dump(), function (lang, code) {
      var link = self.url()
                 .param('hl', code)
                 .param('lr', '')
                 .param('tbs', '')
                 .param('start', '')
                 .get();

      langListHTML = langListHTML +
                     '<div class="GSL_dialog_langItem GSL_left">' +
                     '  <div class="GSL_cf">' +
                     '    <div class="GSL_left">' +
                     '      <label for="GSL_dialog_langItem_' + code + '"' +
                     '             title="' + lang.name + ' (' + code + ')">' +
                     '        <input type="checkbox" class="GSL_input_checkbox"' +
                     '               id="GSL_dialog_langItem_' + code + '"' +
                     '               value="' + code + '"' +
                                     (userLangs.indexOf(code) !== -1 ? ' checked' : '') + '>' +
                     '        <div class="GSL_checkbox"><div class="GSL_checkbox_mark"></div></div>' +
                     '        <span lang="' + code + '">' + lang.name + '</span>' +
                     '      </label>' +
                     '    </div>' +
                     '    <div class="GSL_right">' +
                     '      <a href="' + link + '"' +
                     '         class="GSL_dialog_langItem_link"' +
                     '         tabindex="-1"' +
                     '         title="Open search results in ' + lang.name + '">&raquo;</a>' +
                     '    </div>' +
                     '  </div>' +
                     '</div>';
    });

    self.$('#GSL_dialog_langList').html(langListHTML);

    self.$('#GSL_dialog_footer').html(
        '<div class="GSL_cf">' +
        '  <div class="GSL_left">' +
        '    <button id="GSL_button_reset" class="GSL_btn">Reset</button>' +
        '  </div>' +
        '  <div class="GSL_right">' +
        '    <button id="GSL_button_save" class="GSL_btn GSL_btn_primary">Save Settings</button>' +
        '    <button id="GSL_button_cancel" class="GSL_btn">Cancel</button>' +
        '  </div>'
      );

    bindEvents();
  };

  /**
   * Open the settings dialog.
   */
  var openDialog = function (event) {
    // If the settings dialog is not exist, create it.
    if (self.$('#GSL_dialog').length === 0) { createDialog(event); }

    self.$('#GSL_dialog').css('display', 'block');
    self.$('#GSL_dialogBackground').css('display', 'block');
  };

  /**
   * Close the settings dialog.
   */
  var closeDialog = function (event) {
    self.$('#GSL_dialog').css('display', 'none');
    self.$('#GSL_dialogBackground').css('display', 'none');
  };

  /**
   * Saves user settings and closes dialog.
   */
  var saveSettings = function (event) {
    var langs = self.$('#GSL_dialog_langList .GSL_input_checkbox:checked').attr('value');
    langs = self.$.uniq(langs);

    self.settings.set('langs', langs);

    updateMenu(event);
    updateDialog(event);
    closeDialog(event);
  };

  /**
   * Deletes all user settings, resets to defaults and closes dialog.
   */
  var resetSettings = function (event) {
    if (window.confirm('Clear all settings?')) {
      self.settings.reset();

      updateMenu(event);
      updateDialog(event);
      closeDialog(event);
    }
  };

  return init();
};

// Finally, run this userscript.
GSL.init();
