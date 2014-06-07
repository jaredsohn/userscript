// ==UserScript==
// @name			Google Search Filter Plus
// @description			Filters google search results
// @namespace			smk
// @include			http://www.google.tld/
// @include			https://www.google.tld/
// @include			https://encrypted.google.com/
// @include			http://www.google.tld/search?*
// @include			https://www.google.tld/search?*
// @include			https://encrypted.google.com/search?*
// @include			http://www.google.tld/#*&q=*
// @include			https://www.google.tld/#*&q=*
// @include			http://www.google.tld/#q=*
// @include			https://www.google.tld/#q=*
// @include			https://encrypted.google.com/#*&q=*
// @include			http://www.google.tld/cse?*
// @include			https://www.google.tld/cse?*
// @include			http://www.google.tld/custom?*
// @include			https://www.google.tld/custom?*
// @license			MPL 1.1; http://www.mozilla.org/MPL/MPL-1.1.html
// ==/UserScript===

/**
thanks to:
	adblock plus
	cho45
	ekbookworldwide
	marti
	sizzlemctwizzle
	webismymind
*/

let config={
	//blocked sites (default, use the config dialog to edit this)
	filters: [
		'||daniweb.com^',
		'||velocityreviews.com^',
	],
	
	//completely hide filter results (default)
	resHidden: false,
	
	//enabled extensions
	ext: ['gmonkeyr','customSearch','instant'],
	
	//log component times
	logTime: true,
}

function $X(x, t, r) {
    if (t && t.tagName) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case XPathResult.NUMBER_TYPE:
        p = 'numberValue';
        break;
    case XPathResult.STRING_TYPE:
        p = 'stringValue';
        break;
    case XPathResult.BOOLEAN_TYPE:
        p = 'booleanValue';
        break;
    case XPathResult.ANY_UNORDERED_NODE_TYPE: 
    case XPathResult.FIRST_ORDERED_NODE_TYPE:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}

function isInDom(element){
	while (element = element.parentNode) {
		if (element == document) {
			return true;
		}
	}
	return false;
}

let logger={
	msg: GM_log,
	
	error: function(msg) GM_log('Error: '+msg),
	
	init: function(){
		if(!config.logTime){
			for(let key in logTime){
				if(logTime[key].constructor==Function){
					logTime[key]=function(){};
				}
			}
		}
	},
}

let logTime={
	currTime: null,
	
	start: function(){
		logTime.currTime=new Date().getTime();
	},
	
	snap: function(msg){
		GM_log(msg+': '+(new Date().getTime()-logTime.currTime)+'ms');
	},
	
	end: function(msg){
		logTime.snap(msg);
		logTime.currTime=null;
	},
	
	restart: function(msg){
		logTime.snap(msg);
		logTime.start();
	},
	
	profile: function(parent,funcName){
		let tTime=0;
		let func=parent[funcName];
		
		parent[funcName]=function(){
			let currTime=new Date().getTime();
			let ret=func.apply(this,arguments);
			tTime+=new Date().getTime()-currTime;
			return ret;
		};
		
		this.snap=function(msg){
			GM_log(msg+': '+tTime+'ms');
		};
		
		this.end=function(msg){
			this.snap(msg);
			tTime=0;
		};
	},
};


/**
adblock plus matching classes
*/
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Adblock Plus.
 *
 * The Initial Developer of the Original Code is
 * Wladimir Palant.
 * Portions created by the Initial Developer are Copyright (C) 2006-2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * @fileOverview Definition of Filter class and its subclasses.
 */

var EXPORTED_SYMBOLS = ["Filter", "InvalidFilter", "CommentFilter", "ActiveFilter", "RegExpFilter", "BlockingFilter", "WhitelistFilter", "ElemHideFilter"];

/**
 * Abstract base class for filters
 *
 * @param {String} text   string representation of the filter
 * @constructor
 */
function Filter(text)
{
  this.text = text;
  this.subscriptions = [];
}
Filter.prototype =
{
  /**
   * String representation of the filter
   * @type String
   */
  text: null,

  /**
   * Filter subscriptions the filter belongs to
   * @type Array of Subscription
   */
  subscriptions: null,

  /**
   * Serializes the filter to an array of strings for writing out on the disk.
   * @param {Array of String} buffer  buffer to push the serialization results into
   */
  serialize: function(buffer)
  {
    buffer.push("[Filter]");
    buffer.push("text=" + this.text);
  },

  toString: function()
  {
    return this.text;
  }
};

/**
 * Cache for known filters, maps string representation to filter objects.
 * @type Object
 */
Filter.knownFilters = {__proto__: null};

/**
 * Regular expression that element hiding filters should match
 * @type RegExp
 */
Filter.elemhideRegExp = /^([^\/\*\|\@"!]*?)#(?:([\w\-]+|\*)((?:\([\w\-]+(?:[$^*]?=[^\(\)"]*)?\))*)|#([^{}]+))$/;
/**
 * Regular expression that RegExp filters specified as RegExps should match
 * @type RegExp
 */
Filter.regexpRegExp = /^(@@)?\/.*\/(?:\$~?[\w\-]+(?:=[^,\s]+)?(?:,~?[\w\-]+(?:=[^,\s]+)?)*)?$/;
/**
 * Regular expression that options on a RegExp filter should match
 * @type RegExp
 */
Filter.optionsRegExp = /\$(~?[\w\-]+(?:=[^,\s]+)?(?:,~?[\w\-]+(?:=[^,\s]+)?)*)$/;

/**
 * Creates a filter of correct type from its text representation - does the basic parsing and
 * calls the right constructor then.
 *
 * @param {String} text   as in Filter()
 * @return {Filter} filter or null if the filter couldn't be created
 */
Filter.fromText = function(text)
{
  if (!/\S/.test(text))
    return null;

  if (text in Filter.knownFilters)
    return Filter.knownFilters[text];

  let ret;
  if (Filter.elemhideRegExp.test(text))
    ret = ElemHideFilter.fromText(text, RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4);
  else if (text[0] == "!")
    ret = new CommentFilter(text);
  else
    ret = RegExpFilter.fromText(text);

  Filter.knownFilters[ret.text] = ret;
  return ret;
}

/**
 * Deserializes a filter
 *
 * @param {Object}  obj map of serialized properties and their values
 * @return {Filter} filter or null if the filter couldn't be created
 */
Filter.fromObject = function(obj)
{
  let ret = Filter.fromText(obj.text);
  if (ret instanceof ActiveFilter)
  {
    if ("disabled" in obj)
      ret.disabled = (obj.disabled == "true");
    if ("hitCount" in obj)
      ret.hitCount = parseInt(obj.hitCount) || 0;
    if ("lastHit" in obj)
      ret.lastHit = parseInt(obj.lastHit) || 0;
  }
  return ret;
}

/**
 * Removes unnecessary whitespaces from filter text, will only return null if
 * the input parameter is null.
 */
Filter.normalize = function(/**String*/ text) /**String*/
{
  if (!text)
    return text;

  // Remove line breaks and such
  text = text.replace(/[^\S ]/g, "");

  if (/^\s*!/.test(text)) {
    // Don't remove spaces inside comments
    return text.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  else if (Filter.elemhideRegExp.test(text)) {
    // Special treatment for element hiding filters, right side is allowed to contain spaces
    /^(.*?)(#+)(.*)$/.test(text);   // .split(..., 2) will cut off the end of the string
    var domain = RegExp.$1;
    var separator = RegExp.$2;
    var selector = RegExp.$3;
    return domain.replace(/\s/g, "") + separator + selector.replace(/^\s+/, "").replace(/\s+$/, "");
  }
  else
    return text.replace(/\s/g, "");
}

/**
 * Class for invalid filters
 * @param {String} text see Filter()
 * @param {String} reason Reason why this filter is invalid
 * @constructor
 * @augments Filter
 */
function InvalidFilter(text, reason)
{
  Filter.call(this, text);

  this.reason = reason;
}
InvalidFilter.prototype =
{
  __proto__: Filter.prototype,

  /**
   * Reason why this filter is invalid
   * @type String
   */
  reason: null,

  /**
   * See Filter.serialize()
   */
  serialize: function(buffer) {}
};

/**
 * Class for comments
 * @param {String} text see Filter()
 * @constructor
 * @augments Filter
 */
function CommentFilter(text)
{
  Filter.call(this, text);
}
CommentFilter.prototype =
{
  __proto__: Filter.prototype,

  /**
   * See Filter.serialize()
   */
  serialize: function(buffer) {}
};

/**
 * Abstract base class for filters that can get hits
 * @param {String} text see Filter()
 * @param {String} domains  (optional) Domains that the filter is restricted to separated by domainSeparator e.g. "foo.com|bar.com|~baz.com"
 * @constructor
 * @augments Filter
 */
function ActiveFilter(text, domains)
{
  Filter.call(this, text);

  if (domains)
  {
    this.domainSource = domains;
    this.__defineGetter__("includeDomains", this._getIncludeDomains);
    this.__defineGetter__("excludeDomains", this._getExcludeDomains);
  }
}
ActiveFilter.prototype =
{
  __proto__: Filter.prototype,

  /**
   * Defines whether the filter is disabled
   * @type Boolean
   */
  disabled: false,
  /**
   * Number of hits on the filter since the last reset
   * @type Number
   */
  hitCount: 0,
  /**
   * Last time the filter had a hit (in milliseconds since the beginning of the epoch)
   * @type Number
   */
  lastHit: 0,

  /**
   * String that the includeDomains and excludeDomains properties should be generated from
   * @type String
   */
  domainSource: null,

  /**
   * Separator character used in domainSource property, must be overridden by subclasses
   * @type String
   */
  domainSeparator: null,

  /**
   * Map containing domains that this filter should match on or null if the filter should match on all domains
   * @type Object
   */
  includeDomains: null,
  /**
   * Map containing domains that this filter should not match on or null if the filter should match on all domains
   * @type Object
   */
  excludeDomains: null,

  /**
   * Called first time includeDomains property is requested, triggers _generateDomains method.
   */
  _getIncludeDomains: function()
  {
    this._generateDomains();
    return this.includeDomains;
  },
  /**
   * Called first time excludeDomains property is requested, triggers _generateDomains method.
   */
  _getExcludeDomains: function()
  {
    this._generateDomains();
    return this.excludeDomains;
  },

  /**
   * Generates includeDomains and excludeDomains properties when one of them is requested for the first time.
   */
  _generateDomains: function()
  {
    let domains = this.domainSource.split(this.domainSeparator);

    delete this.domainSource;
    delete this.includeDomains;
    delete this.excludeDomains;

    if (domains.length == 1 && domains[0][0] != "~")
    {
      // Fast track for the common one-domain scenario
      this.includeDomains = {__proto__: null};
      this.includeDomains[domains[0]] = true;
    }
    else
    {
      for each (let domain in domains)
      {
        if (domain == "")
          continue;
  
        let hash = "includeDomains";
        if (domain[0] == "~")
        {
          hash = "excludeDomains";
          domain = domain.substr(1);
        }
  
        if (!this[hash])
          this[hash] = {__proto__: null};
  
        this[hash][domain] = true;
      }
    }
  },

  /**
   * Checks whether this filter is active on a domain.
   */
  isActiveOnDomain: function(/**String*/ docDomain) /**Boolean*/
  {
    // If the document has no host name, match only if the filter isn't restricted to specific domains
    if (!docDomain)
      return (!this.includeDomains);

    if (!this.includeDomains && !this.excludeDomains)
      return true;

    docDomain = docDomain.replace(/\.+$/, "").toUpperCase();

    while (true)
    {
      if (this.includeDomains && docDomain in this.includeDomains)
        return true;
      if (this.excludeDomains && docDomain in this.excludeDomains)
        return false;

      let nextDot = docDomain.indexOf(".");
      if (nextDot < 0)
        break;
      docDomain = docDomain.substr(nextDot + 1);
    }
    return (this.includeDomains == null);
  },

  /**
   * Checks whether this filter is active only on a domain and its subdomains.
   */
  isActiveOnlyOnDomain: function(/**String*/ docDomain) /**Boolean*/
  {
    if (!docDomain || !this.includeDomains)
      return false;

    docDomain = docDomain.replace(/\.+$/, "").toUpperCase();

    for (let domain in this.includeDomains)
      if (domain != docDomain && (domain.length <= docDomain.length || domain.indexOf("." + docDomain) != domain.length - docDomain.length - 1))
        return false;

    return true;
  },

  /**
   * See Filter.serialize()
   */
  serialize: function(buffer)
  {
    if (this.disabled || this.hitCount || this.lastHit)
    {
      Filter.prototype.serialize.call(this, buffer);
      if (this.disabled)
        buffer.push("disabled=true");
      if (this.hitCount)
        buffer.push("hitCount=" + this.hitCount);
      if (this.lastHit)
        buffer.push("lastHit=" + this.lastHit);
    }
  }
};

/**
 * Abstract base class for RegExp-based filters
 * @param {String} text see Filter()
 * @param {String} regexpSource filter part that the regular expression should be build from
 * @param {Number} contentType  (optional) Content types the filter applies to, combination of values from RegExpFilter.typeMap
 * @param {Boolean} matchCase   (optional) Defines whether the filter should distinguish between lower and upper case letters
 * @param {String} domains      (optional) Domains that the filter is restricted to, e.g. "foo.com|bar.com|~baz.com"
 * @param {Boolean} thirdParty  (optional) Defines whether the filter should apply to third-party or first-party content only
 * @constructor
 * @augments ActiveFilter
 */
function RegExpFilter(text, regexpSource, contentType, matchCase, domains, thirdParty)
{
  ActiveFilter.call(this, text, domains);

  if (contentType != null)
    this.contentType = contentType;
  if (matchCase)
    this.matchCase = matchCase;
  if (thirdParty != null)
    this.thirdParty = thirdParty;

  if (regexpSource[0] == "/" && regexpSource[regexpSource.length - 1] == "/")
  {
    // The filter is a regular expression - convert it immediately to catch syntax errors
    this.regexp = new RegExp(regexpSource.substr(1, regexpSource.length - 2), this.matchCase ? "" : "i");
  }
  else
  {
    // No need to convert this filter to regular expression yet, do it on demand
    this.regexpSource = regexpSource;
    this.__defineGetter__("regexp", this._generateRegExp);
  }
}
RegExpFilter.prototype =
{
  __proto__: ActiveFilter.prototype,

  /**
   * @see ActiveFilter.domainSeparator
   */
  domainSeparator: "|",

  /**
   * Number of filters contained in this filter group
   * @type Integer
   */
  filterCount: 1,
  /**
   * Expression from which a regular expression should be generated - for delayed creation of the regexp property
   * @type String
   */
  regexpSource: null,
  /**
   * Regular expression to be used when testing against this filter
   * @type RegExp
   */
  regexp: null,
  /**
   * 8 character string identifying this filter for faster matching
   * @type String
   */
  shortcut: null,
  /**
   * Content types the filter applies to, combination of values from RegExpFilter.typeMap
   * @type Number
   */
  contentType: 0x7FFFFFFF,
  /**
   * Defines whether the filter should distinguish between lower and upper case letters
   * @type Boolean
   */
  matchCase: false,
  /**
   * Defines whether the filter should apply to third-party or first-party content only. Can be null (apply to all content).
   * @type Boolean
   */
  thirdParty: null,

  /**
   * Generates regexp property when it is requested for the first time.
   * @return {RegExp}
   */
  _generateRegExp: function()
  {
    // Remove multiple wildcards
    let source = this.regexpSource.replace(/\*+/g, "*");

    // Remove leading wildcards
    if (source[0] == "*")
      source = source.substr(1);

    // Remove trailing wildcards
    let pos = source.length - 1;
    if (pos >= 0 && source[pos] == "*")
      source = source.substr(0, pos);

    source = source.replace(/\^\|$/, "^")       // remove anchors following separator placeholder
                   .replace(/\W/g, "\\$&")    // escape special symbols
                   .replace(/\\\*/g, ".*")      // replace wildcards by .*
                   // process separator placeholders (all ANSI charaters but alphanumeric characters and _%.-)
                   .replace(/\\\^/g, "(?:[\\x00-\\x24\\x26-\\x2C\\x2F\\x3A-\\x40\\x5B-\\x5E\\x60\\x7B-\\x80]|$)")
                   .replace(/^\\\|\\\|/, "^[\\w\\-]+:\\/+(?!\\/)(?:[^\\/]+\\.)?") // process extended anchor at expression start
                   .replace(/^\\\|/, "^")       // process anchor at expression start
                   .replace(/\\\|$/, "$");      // process anchor at expression end

    let regexp = new RegExp(source, this.matchCase ? "" : "i");

    delete this.regexp;
    delete this.regexpSource;
    return (this.regexp = regexp);
  },

  /**
   * Tests whether the URL matches this filter
   * @param {String} location URL to be tested
   * @param {String} contentType content type identifier of the URL
   * @param {String} docDomain domain name of the document that loads the URL
   * @param {Boolean} thirdParty should be true if the URL is a third-party request
   * @return {RegExpFilter} this filter in case of a match or null
   */
  matches: function(location, contentType, docDomain, thirdParty)
  {
    if (this.regexp.test(location) &&
        (RegExpFilter.typeMap[contentType] & this.contentType) != 0 &&
        (this.thirdParty == null || this.thirdParty == thirdParty) &&
        this.isActiveOnDomain(docDomain))
    {
      return this;
    }

    return null;
  },

  /**
   * Adds a filter to this filter group
   * @param {RegExpFilter} filter to be added
   * @return {RegExpFilterGroup} the combined filter group
   */
  pushFilter: function(filter)
  {
    return new RegExpFilterGroup(this, filter);
  }
};

/**
 * Creates a RegExp filter from its text representation
 * @param {String} text   same as in Filter()
 */
RegExpFilter.fromText = function(text)
{
  let constructor = BlockingFilter;
  let origText = text;
  if (text.indexOf("@@") == 0)
  {
    constructor = WhitelistFilter;
    text = text.substr(2);
  }

  let contentType = null;
  let matchCase = null;
  let domains = null;
  let thirdParty = null;
  let collapse = null;
  let options;
  if (Filter.optionsRegExp.test(text))
  {
    options = RegExp.$1.toUpperCase().split(",");
    text = RegExp.leftContext;
    for each (let option in options)
    {
      let value;
      [option, value] = option.split("=", 2);
      option = option.replace(/-/, "_");
      if (option in RegExpFilter.typeMap)
      {
        if (contentType == null)
          contentType = 0;
        contentType |= RegExpFilter.typeMap[option];
      }
      else if (option[0] == "~" && option.substr(1) in RegExpFilter.typeMap)
      {
        if (contentType == null)
          contentType = RegExpFilter.prototype.contentType;
        contentType &= ~RegExpFilter.typeMap[option.substr(1)];
      }
      else if (option == "MATCH_CASE")
        matchCase = true;
      else if (option == "DOMAIN" && typeof value != "undefined")
        domains = value;
      else if (option == "THIRD_PARTY")
        thirdParty = true;
      else if (option == "~THIRD_PARTY")
        thirdParty = false;
      else if (option == "COLLAPSE")
        collapse = true;
      else if (option == "~COLLAPSE")
        collapse = false;
    }
  }

  if (constructor == WhitelistFilter && (contentType == null || (contentType & RegExpFilter.typeMap.DOCUMENT)) &&
      (!options || options.indexOf("DOCUMENT") < 0) && !/^\|?[\w\-]+:/.test(text))
  {
    // Exception filters shouldn't apply to pages by default unless they start with a protocol name
    if (contentType == null)
      contentType = RegExpFilter.prototype.contentType;
    contentType &= ~RegExpFilter.typeMap.DOCUMENT;
  }

  try
  {
    return new constructor(origText, text, contentType, matchCase, domains, thirdParty, collapse);
  }
  catch (e)
  {
    return new InvalidFilter(text, e);
  }
}

/**
 * Maps type strings like "SCRIPT" or "OBJECT" to bit masks
 */
RegExpFilter.typeMap = {
  OTHER: 1,
  SCRIPT: 2,
  IMAGE: 4,
  STYLESHEET: 8,
  OBJECT: 16,
  SUBDOCUMENT: 32,
  DOCUMENT: 64,
  XBL: 512,
  PING: 1024,
  XMLHTTPREQUEST: 2048,
  OBJECT_SUBREQUEST: 4096,
  DTD: 8192,
  MEDIA: 16384,
  FONT: 32768,

  BACKGROUND: 4,    // Backwards compat, same as IMAGE

  DONOTTRACK: 0x20000000,
  ELEMHIDE: 0x40000000
};

// ELEMHIDE and DONOTTRACK option shouldn't be there by default
RegExpFilter.prototype.contentType &= ~(RegExpFilter.typeMap.ELEMHIDE | RegExpFilter.typeMap.DONOTTRACK);

/**
 * Class for blocking filters
 * @param {String} text see Filter()
 * @param {String} regexpSource see RegExpFilter()
 * @param {Number} contentType see RegExpFilter()
 * @param {Boolean} matchCase see RegExpFilter()
 * @param {String} domains see RegExpFilter()
 * @param {Boolean} thirdParty see RegExpFilter()
 * @param {Boolean} collapse  defines whether the filter should collapse blocked content, can be null
 * @constructor
 * @augments RegExpFilter
 */
function BlockingFilter(text, regexpSource, contentType, matchCase, domains, thirdParty, collapse)
{
  RegExpFilter.call(this, text, regexpSource, contentType, matchCase, domains, thirdParty);

  this.collapse = collapse;
}
BlockingFilter.prototype =
{
  __proto__: RegExpFilter.prototype,

  /**
   * Defines whether the filter should collapse blocked content. Can be null (use the global preference).
   * @type Boolean
   */
  collapse: null
};

/**
 * Class for whitelist filters
 * @param {String} text see Filter()
 * @param {String} regexpSource see RegExpFilter()
 * @param {Number} contentType see RegExpFilter()
 * @param {Boolean} matchCase see RegExpFilter()
 * @param {String} domains see RegExpFilter()
 * @param {Boolean} thirdParty see RegExpFilter()
 * @constructor
 * @augments RegExpFilter
 */
function WhitelistFilter(text, regexpSource, contentType, matchCase, domains, thirdParty)
{
  RegExpFilter.call(this, text, regexpSource, contentType, matchCase, domains, thirdParty);
}
WhitelistFilter.prototype =
{
  __proto__: RegExpFilter.prototype
}

/**
 * Class for element hiding filters
 * @param {String} text see Filter()
 * @param {String} domains    (optional) Host names or domains the filter should be restricted to
 * @param {String} selector   CSS selector for the HTML elements that should be hidden
 * @constructor
 * @augments ActiveFilter
 */
function ElemHideFilter(text, domains, selector)
{
  ActiveFilter.call(this, text, domains ? domains.toUpperCase() : null);

  if (domains)
    this.selectorDomain = domains.replace(/,~[^,]+/g, "").replace(/^~[^,]+,?/, "").toLowerCase();
  this.selector = selector;
}
ElemHideFilter.prototype =
{
  __proto__: ActiveFilter.prototype,

  /**
   * @see ActiveFilter.domainSeparator
   */
  domainSeparator: ",",

  /**
   * Host name or domain the filter should be restricted to (can be null for no restriction)
   * @type String
   */
  selectorDomain: null,
  /**
   * CSS selector for the HTML elements that should be hidden
   * @type String
   */
  selector: null,

  /**
   * Random key associated with the filter - used to register hits from element hiding filters
   * @type String
   */
  key: null
};

/**
 * Creates an element hiding filter from a pre-parsed text representation
 *
 * @param {String} text       same as in Filter()
 * @param {String} domain     domain part of the text representation (can be empty)
 * @param {String} tagName    tag name part (can be empty)
 * @param {String} attrRules  attribute matching rules (can be empty)
 * @param {String} selector   raw CSS selector (can be empty)
 * @return {ElemHideFilter or InvalidFilter}
 */
ElemHideFilter.fromText = function(text, domain, tagName, attrRules, selector)
{
  if (!selector)
  {
    if (tagName == "*")
      tagName = "";

    let id = null;
    let additional = "";
    if (attrRules) {
      attrRules = attrRules.match(/\([\w\-]+(?:[$^*]?=[^\(\)"]*)?\)/g);
      for each (let rule in attrRules) {
        rule = rule.substr(1, rule.length - 2);
        let separatorPos = rule.indexOf("=");
        if (separatorPos > 0) {
          rule = rule.replace(/=/, '="') + '"';
          additional += "[" + rule + "]";
        }
        else {
          if (id)
            return new InvalidFilter(text, Utils.getString("filter_elemhide_duplicate_id"));
          else
            id = rule;
        }
      }
    }

    if (id)
      selector = tagName + "." + id + additional + "," + tagName + "#" + id + additional;
    else if (tagName || additional)
      selector = tagName + additional;
    else
      return new InvalidFilter(text, Utils.getString("filter_elemhide_nocriteria"));
  }
  return new ElemHideFilter(text, domain, selector);
}

function RegExpFilterGroup(filter1, filter2)
{
  this.filters = [filter1, filter2];
}
RegExpFilterGroup.prototype = {
  /**
   * Filters contained in this filter group.
   * @type Array of RegExpFilter
   */
  filters: null,

  /**
   * Number of filters contained in this filter group
   * @type Integer
   */
  filterCount: 2,

  /**
   * Tests whether the URL matches any of the filters
   * @param {String} location URL to be tested
   * @param {String} contentType content type identifier of the URL
   * @param {String} docDomain domain name of the document that loads the URL
   * @param {Boolean} thirdParty should be true if the URL is a third-party request
   * @return {RegExpFilter} the filter matching the URL or null if none of the filters match
   */
  matches: function(location, contentType, docDomain, thirdParty)
  {
    for (let i = 0, l = this.filters.length; i < l; i++)
    {
      let result = this.filters[i].matches(location, contentType, docDomain, thirdParty);
      if (result)
        return result;
    }

    return null;
  },

  /**
   * Adds a filter to this filter group
   * @param {RegExpFilter} filter to be added
   * @return {RegExpFilterGroup} the combined filter group
   */
  pushFilter: function(filter)
  {
    this.filters.push(filter);
    this.count++;
    return this;
  }
}
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Adblock Plus.
 *
 * The Initial Developer of the Original Code is
 * Wladimir Palant.
 * Portions created by the Initial Developer are Copyright (C) 2006-2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * ***** END LICENSE BLOCK ***** */

/**
 * @fileOverview Matcher class implementing matching addresses against a list of filters.
 */

var EXPORTED_SYMBOLS = ["Matcher", "CombinedMatcher", "defaultMatcher"];

/**
 * Blacklist/whitelist filter matching
 * @constructor
 */
function Matcher()
{
  this.clear();
}

Matcher.prototype = {
  /**
   * Lookup table for filters by their shortcut
   * @type Object
   */
  shortcutHash: null,

  /**
   * Should be true if shortcutHash has any entries
   * @type Boolean
   */
  hasShortcuts: false,

  /**
   * Filters without a shortcut
   * @type Array of RegExpFilter
   */
  regexps: null,

  /**
   * Lookup table, has keys for all filters already added
   * @type Object
   */
  knownFilters: null,

  /**
   * Removes all known filters
   */
  clear: function()
  {
    this.shortcutHash = {__proto__: null};
    this.hasShortcuts = false;
    this.regexps = [];
    this.knownFilters = {__proto__: null};
  },

  /**
   * Adds a filter to the matcher
   * @param {RegExpFilter} filter
   */
  add: function(filter)
  {
    if (filter.text in this.knownFilters)
      return;

    // Look for a suitable shortcut if the filter doesn't have one
    if (!filter.shortcut)
      filter.shortcut = this.findShortcut(filter);

    if (filter.shortcut)
    {
      if (filter.shortcut in this.shortcutHash)
        this.shortcutHash[filter.shortcut] = this.shortcutHash[filter.shortcut].pushFilter(filter);
      else
        this.shortcutHash[filter.shortcut] = filter;
      this.hasShortcuts = true;
    }
    else
      this.regexps.push(filter);

    this.knownFilters[filter.text] = true;
  },

  /**
   * Removes a filter from the matcher
   * @param {RegExpFilter} filter
   */
  remove: function(filter)
  {
    if (!(filter.text in this.knownFilters))
      return;

    if (filter.shortcut)
    {
      if ("filters" in this.shortcutHash[filter.shortcut])
      {
        let list = this.shortcutHash[filter.shortcut].filters;
        for (let i = 0, l = list.length; i < l; i++)
          if (list[i] == filter)
            list.splice(i--, 1);
      }
      else
        delete this.shortcutHash[filter.shortcut];
    }
    else
    {
      let i = this.regexps.indexOf(filter);
      if (i >= 0)
        this.regexps.splice(i, 1);
    }

    delete this.knownFilters[filter.text];
  },

  /**
   * Looks up a free shortcut for a filter
   * @param {String} text text representation of the filter
   * @return {String} shortcut or null
   */
  findShortcut: function(filter)
  {
    // For donottrack filters use "donottrack" as keyword if nothing else matches
    let defaultResult = (filter.contentType & RegExpFilter.typeMap.DONOTTRACK ? "donottrack" : null);

    let text = filter.text;
    if (Filter.regexpRegExp.test(text))
      return defaultResult;

    // Remove options
    if (Filter.optionsRegExp.test(text))
      text = RegExp.leftContext;

    // Remove whitelist marker
    if (text.substr(0, 2) == "@@")
      text = text.substr(2);

    let candidates = text.toLowerCase().match(/[^a-z0-9%*][a-z0-9%]{3,}(?=[^a-z0-9%*])/g);
    if (!candidates)
      return defaultResult;

    let hash = this.shortcutHash;
    let result = defaultResult;
    let resultCount = 0xFFFFFF;
    let resultLength = 0;
    for (let i = 0, l = candidates.length; i < l; i++)
    {
      let candidate = candidates[i].substr(1);
      let count = candidate in hash ? hash[candidate].filterCount : 0;
      if (count < resultCount || (count == resultCount && candidate.length > resultLength))
      {
        result = candidate;
        resultCount = count;
        resultLength = candidate.length;
      }
    }
    return result;
  },

  /**
   * Tests whether the URL matches any of the known filters
   * @param {String} location URL to be tested
   * @param {String} contentType content type identifier of the URL
   * @param {String} docDomain domain name of the document that loads the URL
   * @param {Boolean} thirdParty should be true if the URL is a third-party request
   * @return {RegExpFilter} matching filter or null
   */
  matchesAny: function(location, contentType, docDomain, thirdParty)
  {
    if (this.hasShortcuts)
    {
      // Optimized matching using shortcuts
      let candidates = location.toLowerCase().match(/[a-z0-9%]{3,}/g);
      if (contentType == "DONOTTRACK")
        candidates.unshift("donottrack");
      if (candidates)
      {
        for (let i = 0, l = candidates.length; i < l; i++)
        {
          let substr = candidates[i];
          if (substr in this.shortcutHash)
          {
            let result = this.shortcutHash[substr].matches(location, contentType, docDomain, thirdParty);
            if (result)
              return result;
          }
        }
      }
    }

    // Slow matching for filters without shortcut
    for each (let filter in this.regexps)
      if (filter.matches(location, contentType, docDomain, thirdParty))
        return filter;

    return null;
  }
};

/**
 * Combines a matcher for blocking and exception rules, automatically sorts
 * rules into two Matcher instances.
 * @constructor
 */
function CombinedMatcher()
{
  this.blacklist = new Matcher();
  this.whitelist = new Matcher();
  this.resultCache = {__proto__: null};
}

/**
 * Maximal number of matching cache entries to be kept
 * @type Number
 */
CombinedMatcher.maxCacheEntries = 1000;

CombinedMatcher.prototype =
{
  /**
   * Matcher for blocking rules.
   * @type Matcher
   */
  blacklist: null,

  /**
   * Matcher for exception rules.
   * @type Matcher
   */
  whitelist: null,

  /**
   * Lookup table of previous matchesAny results
   * @type Object
   */
  resultCache: null,

  /**
   * Number of entries in resultCache
   * @type Number
   */
  cacheEntries: 0,

  /**
   * @see Matcher#clear
   */
  clear: function()
  {
    this.blacklist.clear();
    this.whitelist.clear();
    this.resultCache = {__proto__: null};
    this.cacheEntries = 0;
  },

  /**
   * @see Matcher#add
   */
  add: function(filter)
  {
    if (filter instanceof WhitelistFilter)
      this.whitelist.add(filter);
    else
      this.blacklist.add(filter);

    if (this.cacheEntries > 0)
    {
      this.resultCache = {__proto__: null};
      this.cacheEntries = 0;
    }
  },

  /**
   * @see Matcher#remove
   */
  remove: function(filter)
  {
    if (filter instanceof WhitelistFilter)
      this.whitelist.remove(filter);
    else
      this.blacklist.remove(filter);

    if (this.cacheEntries > 0)
    {
      this.resultCache = {__proto__: null};
      this.cacheEntries = 0;
    }
  },

  /**
   * @see Matcher#findShortcut
   */
  findShortcut: function(filter)
  {
    if (filter instanceof WhitelistFilter)
      return this.whitelist.findShortcut(filter);
    else
      return this.blacklist.findShortcut(filter);
  },

  /**
   * Optimized filter matching testing both whitelist and blacklist matchers
   * simultaneously. For parameters see Matcher.matchesAny().
   * @see Matcher#matchesAny
   */
  matchesAnyInternal: function(location, contentType, docDomain, thirdParty)
  {
    let blacklistHit = null;
    if (this.whitelist.hasShortcuts || this.blacklist.hasShortcuts)
    {
      // Optimized matching using shortcuts
      let hashWhite = this.whitelist.shortcutHash;
      let hashBlack = this.blacklist.shortcutHash;

      let candidates = location.toLowerCase().match(/[a-z0-9%]{3,}/g);
      if (contentType == "DONOTTRACK")
        candidates.unshift("donottrack");
      if (candidates)
      {
        for (let i = 0, l = candidates.length; i < l; i++)
        {
          let substr = candidates[i];
          if (substr in hashWhite)
          {
            let result = hashWhite[substr].matches(location, contentType, docDomain, thirdParty);
            if (result)
              return result;
          }
          if (substr in hashBlack)
          {
            let result = hashBlack[substr].matches(location, contentType, docDomain, thirdParty);
            if (result)
              blacklistHit = result;
          }
        }
      }
    }

    // Slow matching for filters without shortcut
    for each (let filter in this.whitelist.regexps)
      if (filter.matches(location, contentType, docDomain, thirdParty))
        return filter;

    if (blacklistHit)
      return blacklistHit;

    for each (let filter in this.blacklist.regexps)
      if (filter.matches(location, contentType, docDomain, thirdParty))
        return filter;

    return null;
  },

  /**
   * @see Matcher#matchesAny
   */
  matchesAny: function(location, contentType, docDomain, thirdParty)
  {
    let key = location + " " + contentType + " " + docDomain + " " + thirdParty;
    if (key in this.resultCache)
      return this.resultCache[key];

    let result = this.matchesAnyInternal(location, contentType, docDomain, thirdParty);

    if (this.cacheEntries >= CombinedMatcher.maxCacheEntries)
    {
      this.resultCache = {__proto__: null};
      this.cacheEntries = 0;
    }

    this.resultCache[key] = result;
    this.cacheEntries++;

    return result;
  }
}


/**
 * Shared CombinedMatcher instance that should usually be used.
 * @type CombinedMatcher
 */
var defaultMatcher = new CombinedMatcher();


/**
google search filter plus
*/

/**
extension of adblock plus Filter class
	provides subfilter classes, filter storage
*/

let gfpFilter={
	//split options regexp
	optionsRegExp: /\$([\w,]*?)(?:\$|$)/,
	
	//getter methods
	
	isDummy: function(filter){
		return 'text' in filter;
	},
	
	isDuplicateText: function(text1,text2){
		//checking startsWith is enough, since different options are considered as different filters
		if(text1.length>text2.length){
			return text1.substr(0,text2.length)==text2;
		}else{
			return text2.substr(0,text1.length)==text1;
		}
	},
	
	isDuplicate: function(keys,filters){
		/**
		checks if filter has a duplicate in filters
		e.g.
			a$$b is a duplicate of a$$b$$c and vice versa
			a$$b$$c is not a duplicate of a$$b$$d
		returns:
			deepest duplicate level reached (<=0 if no duplicates found, positive otherwise)
		*/
		let filter;
		if(keys[0] && (keys[0] in filters)){
			filter=filters[keys[0]];
		}else{
			return 0;
		}
		for(let i=1;i<keys.length;i++){
			if('subfilters' in filter){
				filters=filter.subfilters;
			}else{
				return i;
			}
			if(keys[i] in filters){
				filter=filters[keys[i]];
			}else{
				return -i;
			}
		}
		return keys.length;
	},
	
	getSubfilter: function(keys,filters,pop){
		/**
		gets a subfilter from filters
		assumes filters are compiled
		doesn't assume keys are all valid
		*/
		let filter;
		if(keys[0] && (keys[0] in filters)){
			filter=filters[keys[0]];
		}else{
			return null;
		}
		for(let i=1;i<keys.length;i++){
			if('subfilters' in filter){
				filters=filter.subfilters;
			}else{
				return null;
			}
			if(keys[i] in filters){
				filter=filters[keys[i]];
			}else{
				return null;
			}
		}
		if(pop){
			delete filters[keys[keys.length-1]];
		}
		return filter;
	},
	
	popSubfilter: function(keys,filters){
		/**
		assumes filters are compiled
		*/
		return gfpFilter.getSubfilter(keys,filters,true);
	},
	
	isSlowFilter: function(filter,filterParts){
		/**
		args:
			filter: last subfilter
			filterParts: parts of filter excluding filter
		*/
		if((filterParts[0]||filter) instanceof CommentFilter) return false;
		for(let i=0;i<filterParts.length;i++){
			if(filterParts[i] instanceof InvalidFilter) return false;
			if(defaultMatcher.findShortcut(filterParts[i])==null) return true;
		}
		if(filter instanceof InvalidFilter) return false;
		if(defaultMatcher.findShortcut(filter)==null) return true;
		return false;
	},
	
	isSlowFilterKeys: function(keys,filters){
		/**
		assumes filters are compiled
		assumes keys exist in filters
		args:
			filter: a filter with maximum of 1 subfilter
		*/
		let filter=filters[keys[0]];
		if(filter instanceof CommentFilter) return false;
		for(let i=1;;i++){
			if(filter instanceof InvalidFilter) return false;
			if(defaultMatcher.findShortcut(filter)==null) return true;
			if(i==keys.length) return false;
			if(!('subfilters' in filter)) return false;
			filter=filter.subfilters[keys[i]];
		}
	},
	
	getKeys: function(text){
		/**
		get subfilter keys from filterText
		*/
		if(!/\S/.test(text)){
			return [];
		}
		if(text[0]=='!'){
			return [text];
		}
		let ret=[];
		let textParts=gfpFilter.str2textParts(text);
		while(textParts.length!=0){
			let text=textParts.shift();
			let option=textParts.shift();
			if(option){
				ret.push(text+'$'+option);
			}else{
				ret.push(text);
			}
		}
		return ret;
	},
	
	iterate: function(filters,callback,filterParts){
		/**
		iterates over filters
		assumes filters are compiled
		callback: [filter,filterParts]
		*/
		if(filterParts==undefined) filterParts=[];
		for each(let filter in filters){
			if('subfilters' in filter){
				filterParts.push(filter);
				gfpFilter.iterate(filter.subfilters,callback,filterParts);
				filterParts.pop();
			}else{
				callback(filter,filterParts);
			}
		}
	},
	
	//setter methods
	
	str2options: function(option,filter){
		let options=option.toUpperCase().split(',');
		for(let i=0;i<options.length;i++){
			switch(options[i]){
				case 'MATCH_CASE':
					filter.matchCase=true;
					break;
				default:
					return new InvalidFilter(filter.text,'invalid filter option');
			}
		}
		return filter;
	},
	
	str2textParts: function(text){
		let ret=text.split(gfpFilter.optionsRegExp);
		if(ret[ret.length-1].length==0){
			ret.pop();
		}
		return ret;
	},
	
	fromTextParts: function(text,option,filters){
		/**
		converts a single filter part from text, option
		stores filter into filters
		*/
		if(option){
			text+='$'+option;
		}
		if(text in filters){
			return filters[text];
		}else{
			let filter=RegExpFilter.fromText(text);
			if(option){
				filter.text=text;
				filter=gfpFilter.str2options(option,filter);
			}
			filters[text]=filter;
			return filter;
		}
	},
	
	fromText: function(text,filters){
		/**
		assumes no filters are compiled
		returns:
			if has subfilters, dummy object for filter (end of textParts)
			if no subfilters, actual filter object
		*/
		if(!/\S/.test(text)){
			return null;
		}
		if(text[0]=='!'){
			let filter=new CommentFilter(text);
			filters[text]=filter;
			return filter;
		}
		let textParts=gfpFilter.str2textParts(text);
		let filter=gfpFilter.fromTextParts(textParts.shift(),textParts.shift(),filters);
		if(filter instanceof InvalidFilter){
			return filter;
		}
		if(textParts.length==0){
			return filter;
		}
		if(!('subfilters' in filter)){
			filter.subfilters={};
			filter.compiled=false;
		}
		let dummyFilter={};
		textParts.push(dummyFilter);
		filter.subfilters[text]=textParts;
		return dummyFilter;
	},
	
	fromTextCompiled: function(text,filters){
		/**
		filters can be in any compiled state
		prefers subfilters to be compiled
		returns:
			last subfilter
		*/
		if(!/\S/.test(text)){
			return null;
		}
		if(text[0]=='!'){
			let filter=new CommentFilter(text);
			filters[text]=filter;
			return filter;
		}
		let textParts=gfpFilter.str2textParts(text);
		for(let i=0;;i=1){
			let filter=gfpFilter.fromTextParts(textParts.shift(),textParts.shift(),filters);
			if(filter instanceof InvalidFilter){
				return filter;
			}
			if(textParts.length==0){
				if(i==1){
					filter.fullText=text;
				}
				//remove subfilters so the added filter isn't a parent filter
				delete filter.subfilters;
				return filter;
			}
			if('subfilters' in filter){				
				if(!filter.compiled){
					let dummyFilter={};
					textParts.push(dummyFilter);
					filter.subfilters[text]=textParts;
					return dummyFilter;
				}
			}else{
				filter.subfilters={};
				filter.compiled=true;
			}
			filters=filter.subfilters;
		}
	},
	
	clone: function(filter){
		/**
		clones a subfilter without cloning its subfilters
		*/
		let ret=RegExpFilter.fromText(filter.text);
		if(ret instanceof ActiveFilter){
			if('disabled' in filter)
				ret.disabled=filter.disabled;
			if('hitCount' in filter)
				ret.hitCount=filter.hitCount;
			if('lastHit' in filter)
				ret.lastHit=filter.lastHit;
		}
		return ret;
	},
	
	setSubfilter: function(n,keys,filters){
		/**
		sets a subfilter to a value with given keys
		assumes that keys exist
		returns:
			final subfilter
		*/
		for(let i=0;i<keys.length-1;i++){
			filters=filters[keys[i]].subfilters;
		}
		filters[keys[keys.length-1]]=n;
		return n;
	},
	
	compileSubfilters: function(filter){
		let filters=filter.subfilters;
		let ret={};
		for(let text in filters){
			let textParts=filters[text];
			let l=textParts.length;
			let filter;
			if(l==2){
				filter=gfpFilter.fromTextParts(textParts.shift(),'',ret);
			}else{
				filter=gfpFilter.fromTextParts(textParts.shift(),textParts.shift(),ret);
			}
			if(filter instanceof InvalidFilter){
				continue;
			}
			if(l<=3){
				//copy properties of dummyFilter into actual filter
				let dummyFilter=textParts.shift();
				for(let key in dummyFilter){
					filter[key]=dummyFilter[key];
				}
				filter.fullText=text;
				continue;
			}
			if(!('subfilters' in filter)){
				filter.subfilters={};
				filter.compiled=false;
			}
			filter.subfilters[text]=textParts;
		}
		filter.compiled=true;
		filter.subfilters=ret;
		return ret;
	},
	
	compileAll: function(filters){
		/**
		compiles all filters
		*/
		for each(let filter in filters){
			if('subfilters' in filter){
				if(!filter.compiled){
					gfpFilter.compileAll(gfpFilter.compileSubfilters(filter));
				}
			}
		}
		return filters;
	},
	
	getSubfilters: function(filter){
		if(filter.compiled) return filter.subfilters;
		return gfpFilter.compileSubfilters(filter);
	},
	
	//string operations
	
	stringifyRawS: function(filters,buffer,simpleStore){
		/**
		stringify a sub, uncompiled filter
		*/
		let serialize=ActiveFilter.prototype.serialize;
		for(let text in filters){
			let filter=filters[text];
			filter=filter[filter.length-1];
			let o_len=buffer.length;
			filter.text=escape(text);
			serialize.call(filter,buffer);
			if(buffer.length==o_len){
				simpleStore.push(text);
			}
		}
	},
	
	stringifyRawC: function(filters,buffer,simpleStore,isSub){
		/**
		stringify a compiled filter
		*/
		for each(let filter in filters){
			if('subfilters' in filter){
				if(filter.compiled){
					gfpFilter.stringifyRawC(filter.subfilters,buffer,simpleStore,true);
				}else{
					gfpFilter.stringifyRawS(filter.subfilters,buffer,simpleStore);
				}
			}else{
				let o_len=buffer.length;
				let text=isSub?filter.fullText:filter.text;
				filter.text=escape(text);
				filter.serialize(buffer);
				filter.text=text;
				if(buffer.length==o_len){
					//simpleStore does not need escaping
					simpleStore.push(text);
				}
			}
		}
	},
	
	stringify: function(filters){
		let buffer=[];
		let simpleStore=['[Simple Store]'];
		gfpFilter.stringifyRawC(filters,buffer,simpleStore,false);
		let ret='';
		if(buffer.length!=0) ret+=buffer.join('\n')+'\n';
		ret+=simpleStore.join('\n');
		return ret;
	},
	
	_parse: function(s,fromObject){
		/**
		verifies s
		returns: parsed filters
		*/
		let ret={};
		let buffer=s.split('\n');
		let i=0;
		for(i=0;i<buffer.length;){
			if(buffer[i]=='[Filter]'){
				let filter={};
				for(i++;buffer[i][0]!='[' && i<buffer.length;i++){
					let [key,val]=buffer[i].split('=');
					filter[key]=val;
				}
				if(filter.text==undefined){
					throw 'invalid serialized string';
				}
				filter.text=unescape(filter.text);
				fromObject(filter,ret);
			}else if(buffer[i]=='[Simple Store]'){
				i++;
				break;
			}else{
				throw 'invalid serialized string';
			}
		}
		if(i==0 && i<buffer.length){
			throw 'invalid serialized string';
		}
		for(;i<buffer.length;i++){
			gfpFilter.fromText(buffer[i],ret);
		}
		return ret;
	},
	
	parse: function(s){
		return gfpFilter._parse(s,gfpFilter.fromObject);
	},
	
	parseCompiled: function(s){
		return gfpFilter._parse(s,gfpFilter.fromObjectCompiled);
	},
	
	//Filter class hooks
	
	fromObject: function(obj,filters){
		let ret=gfpFilter.fromText(obj.text,filters);
		if(ret instanceof ActiveFilter || ret.constructor==Object){
			if('disabled' in obj)
				ret.disabled=(obj.disabled=='true');
			if('hitCount' in obj)
				ret.hitCount=parseInt(obj.hitCount)||0;
			if('lastHit' in obj)
				ret.lastHit=parseInt(obj.lastHit)||0;
		}
		return ret;
	},
	
	fromObjectCompiled: function(obj,filters){
		let ret=gfpFilter.fromTextCompiled(obj.text,filters);
		if(!ret) return null;
		if(ret instanceof ActiveFilter || ret.constructor==Object){
			if('disabled' in obj)
				ret.disabled=(obj.disabled=='true');
			if('hitCount' in obj)
				ret.hitCount=parseInt(obj.hitCount)||0;
			if('lastHit' in obj)
				ret.lastHit=parseInt(obj.lastHit)||0;
		}
		return ret;
	},
	
	//storage
	
	flush: function(filters){
		/**
		flushes filters to Filter.knownFilters
		*/
		Filter.knownFilters=filters;
	},
	
	isPtr: function(filters){
		return Filter.knownFilters==filters;
	},
	
	save: function(){
		GM_setValue('filters',gfpFilter.stringify(Filter.knownFilters));
	},
	
	load: function(){
		let s=GM_getValue('filters');
		if(s==undefined){
			//load filters from default config
			let textFilters=config.filters;
			let filters=Filter.knownFilters;
			for(let i=0;i<textFilters.length;i++){
				gfpFilter.fromText(textFilters[i],filters);
			}
			gfpFilter.save();
		}else{
			gfpFilter.flush(gfpFilter.parse(s));
		}
	},
	
	//init
	
	init: function(){
		//save some time by removing some abp parsing
		let emptyRegex={'test': function() false};
		Filter.optionsRegExp=emptyRegex;
		Filter.elemhideRegExp=emptyRegex;
		gfpFilter.load();
	},
}

/**
core filter matcher operations
	uses adblock plus Matcher class
*/

let gfpMatcher={
	add: function(filter,keys){
		/**
		adds filter matcher to parent filter's submatcher, if it exists
		checks if filter is a dummy filter
		args:
			keys: filter's keys
		*/
		if(!(filter instanceof ActiveFilter)) return;
		if(keys.length==1){
			defaultMatcher.add(filter);
			return;
		}
		defaultMatcher.add(Filter.knownFilters[keys[0]]);
		if(!gfpFilter.isDummy(filter)){
			//filter is not a dummy filter, parent is compiled
			keys.pop();
			let parentFilter=gfpFilter.getSubfilter(keys);
			if('submatcher' in parentFilter){
				parentFilter.submatcher.add(filter);
			}
		}
	},
	
	getSubmatcher: function(filter){
		if('submatcher' in filter) return filter.submatcher;
		let submatcher=new CombinedMatcher();
		for each(let subfilter in gfpFilter.getSubfilters(filter)){
			if(filter instanceof ActiveFilter){
				submatcher.add(subfilter);
			}
		}
		filter.submatcher=submatcher;
		return submatcher;
	},
	
	matchesAny: function(nodeData){
		return this._matchesAny(nodeData.url,nodeData,gfpMatcher.matchesUrl);
	},
	
	matchesUrl: function(filter,url,nodeData){
		/**
		replaces ActiveFilter.matches
		*/
		if(!filter.regexp.test(url)) return null;
		if(!('subfilters' in filter)) return filter;
		//check if matches title
		return gfpMatcher.getSubmatcher(filter)._matchesAny(nodeData.title,nodeData,gfpMatcher.matchesTitle);
	},
	
	matchesTitle: function(filter,title,nodeData){
		/**
		replaces ActiveFilter.matches
		*/
		if(!filter.regexp.test(title)) return null;
		if(!('subfilters' in filter)) return filter;
		//check if matches summary
		return gfpMatcher.getSubmatcher(filter)._matchesAny(nodeData.summary,nodeData,gfpMatcher.matchesSummary);
	},
	
	matchesSummary: function(filter,summary,nodeData){
		/**
		replaces ActiveFilter.matches
		*/
		if(!filter.regexp.test(summary)) return null;
		return filter;
	},
	
	_matchesAny: function(text,nodeData,matchesFunc){
		if(!text) return null;
		let blacklistHit=null;
		if(this.whitelist.hasShortcuts || this.blacklist.hasShortcuts){
			//optimized matching using shortcuts
			let hashWhite=this.whitelist.shortcutHash;
			let hashBlack=this.blacklist.shortcutHash;

			let candidates=text.toLowerCase().match(/[a-z0-9%]{3,}/g);
			if(candidates){
				for(let i=0,l=candidates.length;i<l;i++){
					let substr=candidates[i];
					if(substr in hashWhite){
						let ret=hashWhite[substr].matches(text,nodeData,matchesFunc);
						if(ret) return ret;
					}
					if(substr in hashBlack && !blacklistHit){
						let ret=hashBlack[substr].matches(text,nodeData,matchesFunc);
						if(ret) blacklistHit=ret;
					}
				}
			}
		}
		
		//slow matching for filters without shortcut
		for each(let filter in this.whitelist.regexps){
			let ret=matchesFunc(filter,text,nodeData);
			if(ret) return ret;
		}
		if(blacklistHit) return blacklistHit;
		for each(let filter in this.blacklist.regexps){
			let ret=matchesFunc(filter,text,nodeData);
			if(ret) return ret;
		}
		return null;
	},

	init: function(){
		//initialize defaultMatcher
		for each(let filter in Filter.knownFilters){
			if(filter instanceof ActiveFilter && !filter.disabled){
				defaultMatcher.add(filter);
			}
		}
	},
}

CombinedMatcher.prototype.matchesAny=gfpMatcher.matchesAny;

CombinedMatcher.prototype._matchesAny=gfpMatcher._matchesAny;

RegExpFilterGroup.prototype.matches=function(text,nodeData,matchesFunc){
	for(let i=0,l=this.filters.length;i<l;i++){
		let ret=matchesFunc(this.filters[i],text,nodeData);
		if(ret) return ret;
	}
	return null;
}

RegExpFilter.prototype.matches=function(text,nodeData,matchesFunc){
	return matchesFunc(this,text,nodeData);
}


/**
pref metadata class
*/

let prefMeta={
	//if the pref grid has changed (e.g. hitcounts, new filters are added) so pref requires to be re-rendered
	isUpdated: false,
};

/**
search results gui
	hiding search results, adding filter dialog
*/

let searchGui={
	resHidden: false,
	//remNodes is an array-based tree of 'remNode's
	remNodes: null,
	initialized: false,
	
	isHomePage: function(){
		let loc=window.location.href;
		return loc[loc.length-1]=='/';
	},
	
	isSearchPage: function(){
		return !searchGui.isHomePage();
	},
	
	getQuery: function(){
		return document.querySelector('input[type="text"][title="Search"]');
	},
	
	getResults: function(){
		return _$('ires');
	},
	
	directLink: function(url){
		if(!(url[0]=='/')) return url;
		return url.substring(7,url.indexOf('&')||url.length);
	},
	
	r: {
		res: {
			getResults: function(node) node.querySelectorAll('li.g'),
			getLinkArea: function() null,
			getUrl: function() null,
			getTitle: function() null,
			getSummary: function() null,
		},
		text: {
			getResults: function() null,
			getLinkArea: function(node) node.querySelector('cite').parentNode,
			getUrl: function(node) node.querySelector('h3.r>a').href,
			getTitle: function(node) (node.querySelector('h2.r')||node.querySelector('h3.r')).textContent,
			getSummary: function(node) node.querySelector('div.s').textContent,
		},
		book: {
			getResults: function() null,
			getLinkArea: function(node) node.querySelector('cite').parentNode,
			getUrl: function(node) node.querySelector('h3.r>a').href,
			getTitle: function(node) node.querySelector('h3.r').textContent,
			getSummary: function(node) node.querySelector('div.s').textContent,
		},
		videoCtn: {
			getResults: function(node) node.querySelectorAll('div.vresult'),
			getLinkArea: function() null,
			getUrl: function() null,
			getTitle: function(node) node.querySelector('h3.r').textContent,
			getSummary: function() null,
		},
		video: {
			getResults: function() null,
			getLinkArea: function(node) node.querySelector('cite'),
			getUrl: function(node) node.querySelector('h3.r>a').href,
			getTitle: function(node) node.querySelector('h3.r').textContent,
			getSummary: function(node) node.querySelector('span.st').textContent,
		},
		imageCtn: {
			getResults: function(node) node.querySelectorAll('div>a'),
			getLinkArea: function() null,
			getUrl: function() null,
			getTitle: function(node) node.querySelector('h3.r').textContent,
			getSummary: function() null,
		},
		image: {
			getResults: function() null,
			getLinkArea: function() null,
			getUrl: function(node) node.href,
			getTitle: function() null,
			getSummary: function() null,
		},
		newsCtn: {
			getResults: function(node) node.querySelectorAll('li.w0>div'),
			getLinkArea: function() null,
			getUrl: function() null,
			getTitle: function(node) node.querySelector('h3.r').textContent,
			getSummary: function() null,
		},
		news: {
			getResults: function() null,
			getLinkArea: function(node) node.querySelector('.gl'),
			getUrl: function(node) node.querySelector('a.l').href,
			getTitle: function(node) node.querySelector('a.l').textContent,
			getSummary: function(node) node.querySelector('div[style]').textContent,
		},
	},
	
	nodeData: function(node,filterClass){
		this.__defineGetter__('linkArea',function(){let linkArea=filterClass.getLinkArea(node); this.linkArea=linkArea; return linkArea;});
		this.__defineGetter__('url',function(){let url=filterClass.getUrl(node); this.url=url; return url;});
		this.__defineGetter__('title',function(){let title=filterClass.getTitle(node); this.title=title; return title;});
		this.__defineGetter__('summary',function(){let summary=filterClass.getSummary(node); this.summary=summary; return summary;});
	},
	
	remNode: function(node,filterClass){
		this.node=node;
		this.filterClass=filterClass;
	},
	
	getResultType: function(node,filterClass){
		/**
		args:
			filterClass: parent result filter class
		returns: resultClass
		*/
		switch(filterClass){
			case searchGui.r.videoCtn:
				return searchGui.r.video;
			case searchGui.r.imageCtn:
				return searchGui.r.image;
			case searchGui.r.newsCtn:
				return searchGui.r.news;
		}
		switch(node.id){
			case 'ires':
				return searchGui.r.res;
			case 'imagebox':
			case 'imagebox_bigimages':
				return searchGui.r.imageCtn;
			case 'videobox':
				return searchGui.r.videoCtn;
			case 'newsbox':
				return searchGui.r.newsCtn;
		}
		if(node.firstElementChild.childElementCount>2)
			return searchGui.r.text;
		else if(node.firstElementChild.childElementCount>=1){
			if(node.querySelector('div.th')){
				return searchGui.r.video;
			}else{
				return null;
			}
		}
		return null;
	},
	
	addStyles: function(){
		GM_addStyle(
			'.filterAdd{color: #1122CC !important; font-size="90%"; text-decoration: none;} .filterAdd:hover{text-decoration: underline;}'+
			'.showTitle{color: #999999 !important; font-size="90%";}'+
			'.showLink{color: #999999 !important; font-size="90%"; text-decoration: none;}}'
		);
	},
	
	initNodes: function(){
		/**
		buffer nodes
		*/
		//dash
		let dash=document.createElement('span');
		with(dash){
			innerHTML='&nbsp;-&nbsp;';
		}
		searchGui.dash=dash;
		//add filter link
		let addLink=document.createElement('a');
		with(addLink){
			innerHTML='Filter';
			href='javascript:void(0);';
			setAttribute('class','filterAdd');
		}
		searchGui.addLink=addLink;
		//add filter container
		let addCtn=document.createElement('span');
		with(addCtn){
			appendChild(dash.cloneNode(true));
			appendChild(addLink.cloneNode(true));
		}
		searchGui.addCtn=addCtn;
		//hidden result title
		let showTitle=document.createElement('span');
		with(showTitle){
			setAttribute('class','showTitle');
		}
		searchGui.showTitle=showTitle;
		//hidden result 'show' link
		let showLink=document.createElement('a');
		with(showLink){
			href='javascript:void(0);';
			setAttribute('class','showLink');
		}
		searchGui.showLink=showLink;
	},
	
	showResult: function(node,contentNodes,showTitle,showLink){
		/**
		re-show hidden filtered result
		*/
		if(searchGui.resHidden){
			node.style.display='';
		}else{
			for(let i=0;i<contentNodes.length;i++){
				contentNodes[i].style.display='';
			}
			showTitle.style.display='none';
			showLink.innerHTML='hide';
			let hideListener=function(e){
				searchGui.hideResult(node,null,null,contentNodes,showTitle,showLink);
				e.preventDefault();
				this.removeEventListener('click',hideListener,false);
			};
			showLink.addEventListener('click',hideListener,false);
		}
	},
	
	hideResult: function(node,filter,nodeData,contentNodes,showTitle,showLink){
		/**
		hide filtered result
		args:
			contentNodes (optional): content nodes that will be hidden
			showTitle (optional): title that will be shown
			showLink (optional): link that will be shown, changed to 'hide'
		*/
		//hide node
		if(searchGui.resHidden){
			node.style.display='none';
		}else{
			//show only title and 'show' link
			if(filter){
				contentNodes=[];
				for(let i=0;i<node.childNodes.length;i++){
					let childNode=node.childNodes[i];
					if(childNode.style){
						childNode.style.display='none';
						contentNodes.push(childNode);
					}
				}
				showTitle=searchGui.showTitle.cloneNode(false);
				let title=nodeData.title;
				if(title){
					showTitle.innerHTML=title+'&nbsp;&nbsp;';
				}
				node.appendChild(showTitle);
				showLink=searchGui.showLink.cloneNode(false);
				showLink.innerHTML='show';
				showLink.title=filter.fullText||filter.text;
				node.appendChild(showLink);
			}else{
				for(let i=0;i<contentNodes.length;i++){
					contentNodes[i].style.display='none';
				}
				showTitle.style.display='';
				showLink.innerHTML='show';
			}
			let showListener=function(e){
				searchGui.showResult(node,contentNodes,showTitle,showLink);
				e.preventDefault();
				this.removeEventListener('click',showListener,false);
			};
			showLink.addEventListener('click',showListener,false);
		}
		return true;
	},
	
	createAddLink: function(node,nodeData){
		let linkArea=nodeData.linkArea;
		if(!linkArea) return;
		linkArea.appendChild(searchGui.dash.cloneNode(true));
		let addLink=searchGui.addLink.cloneNode(true);
		linkArea.appendChild(addLink);
		let addListener=function(e){
			searchGui.addFromResult(nodeData);
		}
		addLink.addEventListener('click',addListener,false);
	},
	
	removeAddLink: function(nodeData){
		let linkArea=nodeData.linkArea;
		if(!linkArea) return;
		linkArea.removeChild(linkArea.lastChild);
		linkArea.removeChild(linkArea.lastChild);
	},
	
	addFromResult: function(nodeData){
		//trim domainUrl
		let domainUrl='||'+nodeData.url.replace(/^[\w\-]+:\/+(?:www\.)?/,'');
		let text=prompt('Filter: ',domainUrl);
		if(text==null) return;
		let keys=gfpFilter.getKeys(text);
		if(gfpFilter.isDuplicate(keys,Filter.knownFilters)){
			alert('Filter already exists');
			return;
		}
		//add filter
		let filter=gfpFilter.fromTextCompiled(text,Filter.knownFilters);
		gfpMatcher.add(filter,keys);
		prefMeta.isUpdated=false;
		searchGui.filterResultsRem();
	},
	
	_filterResultsRem: function(remNodes){
		/**
		filters 'remNode's in the remNodes tree
		returns:
			if all nodes in remNodes are hidden
		*/
		let node,remNode,rnChildren,filterClass;
		if(remNodes.constructor==Array){
			//check if parent node needs to be hidden
			rnChildren=remNodes;
			remNode=remNodes[0];
		}else{
			remNode=remNodes;
		}
		node=remNode.node;
		filterClass=remNode.filterClass;
		let _nodeData=new searchGui.nodeData(node,filterClass);
		let filter=defaultMatcher.matchesAny(_nodeData);
		if(filter){
			filter.hitCount++;
			if(!(filter instanceof WhitelistFilter)){
				searchGui.removeAddLink(_nodeData);
				searchGui.hideResult(node,filter,_nodeData);
				return true;
			}else{
				return false;
			}
		}
		if(rnChildren){
			//hide child nodes
			let allHidden=true;
			for(let i=1;i<rnChildren.length;i++){
				let res=searchGui._filterResultsRem(rnChildren[i]);
				if(res){
					rnChildren.splice(i,1);
					i--;
				}else{
					allHidden=false;
				}
			}
			if(allHidden){
				if(searchGui.resHidden){
					//hide parent node
					searchGui.hideResult(node,null,_nodeData);
				}
			}
			return allHidden;
		}else{
			return false;
		}
	},
	
	_filterResults: function(node,filterClass){
		/**
		parses a html node into a remNodes tree and filters the 'remNode's
		returns:
			filtered remNodes tree
		*/
		let filterClass=searchGui.getResultType(node,filterClass);
		if(filterClass==null){
			//unkown node type
			return null;
		}
		let _nodeData=new searchGui.nodeData(node,filterClass);
		let filter=defaultMatcher.matchesAny(_nodeData);
		if(filter){
			filter.hitCount++;
			if(!(filter instanceof WhitelistFilter)){
				searchGui.hideResult(node,filter,_nodeData);
			}
			return null;
		}
		searchGui.createAddLink(node,_nodeData);
		//html resNodes
		let resNodes=filterClass.getResults(node);
		if(!resNodes){
			return new searchGui.remNode(node,filterClass);
		}
		//filter subnodes
		let remNodes=[new searchGui.remNode(node,filterClass)];
		for(let i=0;i<resNodes.length;i++){
			let _node=resNodes[i];
			let res=searchGui._filterResults(_node,filterClass);
			if(res){
				remNodes.push(res);
			}
		}
		if(remNodes.length==1){
			if(searchGui.resHidden){
				//hide parent node
				searchGui.hideResult(node,null,_nodeData);
			}
			return null;
		}
		return remNodes;
	},
	
	filterResultsRem: function(){
		searchGui._filterResultsRem(searchGui.remNodes);
		gfpFilter.save();
	},
	
	filterResults: function(){
		searchGui.remNodes=searchGui._filterResults(searchGui.getResults());
		gfpFilter.save();
	},
	
	init: function(){
		let resHidden=GM_getValue('resHidden');
		if(resHidden==undefined){
			resHidden=config.resHidden;
			GM_setValue('resHidden',resHidden);
		}
		searchGui.resHidden=resHidden;
		searchGui.addStyles();
		searchGui.initNodes();
		searchGui.initialized=true;
	},
}

let prefLink={
	createLink: function(linkT){
		//create a link with settings cloned from link template
		let link=document.createElement('a');
		link.setAttribute('class',linkT.getAttribute('class'));
		link.setAttribute('style',linkT.getAttribute('style'));
		link.setAttribute('href','javascript:void(0);');
		link.appendChild(document.createTextNode('Config Filters'));
		link.addEventListener('click',prefLink.prefOpen,false);
		return link;
	},
	
	createLinkAccount: function(){
		/**
		create a link in the account menu when logged in
		*/
		let linkT=document.querySelector('a.gbmlb[href*="/ManageAccount?"]');
		if(!linkT)
			return null;
		let link=prefLink.createLink(linkT);
		let linkParent=linkT.parentNode;
		linkParent.appendChild(document.createTextNode('\u2013'));
		linkParent.appendChild(link);
		return link;
	},
	
	createLinkSettings: function(){
		/**
		create a link in the gear icon dropdown menu
		*/
		let linkTCont=document.querySelector('#ab_options > ul > li.ab_dropdownitem:nth-child(2)');
		if(!linkTCont)
			return null;
		let linkT=linkTCont.firstElementChild;
		let link=prefLink.createLink(linkT);
		let linkCont=linkTCont.cloneNode(false);
		linkCont.appendChild(link);
		linkTCont.parentNode.insertBefore(linkCont,linkTCont.nextElementSibling);
		return link;
	},
	
	prefOpen: function(){
		if(prefMeta.isUpdated){
			pref.show();
		}else{
			//renderAll resets the gui first if it's already open
			pref.renderAll();
			prefMeta.isUpdated=true;
		}
	},
	
	init: function(){
		prefLink.createLinkAccount();
		prefLink.createLinkSettings();
		GM_registerMenuCommand('GoogleSearchFilter+',prefLink.prefOpen,null);
	},
}

let ext={
	gmonkeyr: {
		/**
		filters results whenever googlemonkeyr adds a results page
		the initial results page (including the initial page of instant results) is not processed by this extension
		*/
		
		init: function(){
			o_getResults=searchGui.getResults;
			searchGui.getResults=function(){
				return _$('GoogleTabledResults') || o_getResults();
			};
			
			let o_getResultType=searchGui.getResultType;
			searchGui.getResultType=function(node,filterClass){
				if(node==null)
					return null;
				else if(node.id=='GoogleTabledResults')
					return searchGui.r.res;
				else
					return o_getResultType(node,filterClass);
			};
		},
		
		loaded: function(){
			let isDescendent=function(node,ancestor){
				while(node){
					if(node==ancestor)
						return true;
					node=node.parentNode;
				}
				return false;
			}
			
			let procNodeNum=0;
			
			let resultsObserver=new MutationObserver(function(mutations){
				mutations.forEach(function(mutation){
					for(let i=0;i<mutation.addedNodes.length;i++){
						node=mutation.addedNodes[i];
						if(!node || node.nodeName!='LI'){
							continue;
						}
						if(procNodeNum>0){
							procNodeNum--;
							continue;
						}
						let res=searchGui._filterResults(node,searchGui.r.res);
						if(res){
							searchGui.remNodes.push(res);
						}
						//the pref window could be opened before loading the next page
						//	and it isn't known whether there are new hits, so default to this being false
						prefMeta.isUpdated=false;
						gfpFilter.save();
					}
				});
			});
			
			let observeResults=function(results){
				//use parentNode, since googlemonkeyr creates the 'GoogleTabledResults' node and add results there, the results node won't have anything added to it
				resultsObserver.observe(results.parentNode,{childList: true, subtree: true});
			};
			
			let results=searchGui.getResults();
			if(results){
				if(!_$('GoogleMonkeyRLink')){
					procNodeNum=searchGui.r.res.getResults(results).length;
				}
				observeResults(results);
			}
			//use instant if the extension's enabled
			if(config.ext.indexOf('instant')>-1){
				window.addEventListener('instantResults',function(e){
					results=searchGui.getResults();
					//googlemonkeyr moves existing results nodes into the 'GoogleTabledResults' node created by it, these are already processed so don't process them again
					//we run after googlemnokeyr due to our own event being triggered
					procNodeNum=searchGui.r.res.getResults(results).length;
					observeResults(results);
				},false);
			}
		},
	},
	
	customSearch: {
		init: function(){
			//check if url is a google custom search url
			let location=window.location.href;
			if(location.indexOf('/cse?')==-1 && location.indexOf('/custom?')==-1){
				return;
			}
			
			//set searchGui first so searchGui.filterResults() produces no errors
			searchGui.getResultType=function() null;
			
			//wait when ajax loads search results
			let cse=document.getElementById('cse');
			
			let resultsCallback=function(e){
				searchGui.getResults=function() document.querySelector('.gsc-results');
				searchGui.r={
					res: {
						getResults: function(node) node.querySelectorAll('.gsc-table-result'),
						getLinkArea: function() null,
						getUrl: function() null,
						getTitle: function() null,
						getSummary: function() null,
					},
					text: {
						getResults: function() null,
						getLinkArea: function(node) node.querySelector('.gsc-url-bottom'),
						getUrl: function(node) node.querySelector('a.gs-title').href,
						getTitle: function(node) node.querySelector('a.gs-title').textContent,
						getSummary: function(node) node.querySelector('.gs-snippet').textContent,
					},
				}
				searchGui.getResultType=function(node,filterClass){
					if(node.classList.contains('gsc-results')){
						return searchGui.r.res;
					}else if(node.classList.contains('gsc-table-result')){
						return searchGui.r.text;
					}
				}
				
				//google custom search layout
				prefLink.createLink=function(){
					let linkParent=searchGui.getResults();
					let link=document.createElement('a');
					link.setAttribute('style','float:right; margin-top:10px; color:#0000CC; font-size:14px; text-decoration:none;');
					link.setAttribute('href','javascript:void(0);');
					link.appendChild(document.createTextNode('Config Filters'));
					linkParent.insertBefore(document.createElement('br'),linkParent.firstElementChild);
					linkParent.insertBefore(link,linkParent.firstElementChild);
					return link;
				}
				prefLink.init();
				GM_addStyle('.gs-visibleUrl-long{display: inline !important}');
				
				//there are no previous results, filter directly
				searchGui.filterResults();
			};
			//hook draw
			CustomSearchControl=unsafeWindow.google.search.CustomSearchControl;
			let o_draw=CustomSearchControl.prototype.draw;
			CustomSearchControl.prototype.draw=function(){
				//privileged code
				o_draw.apply(this,arguments);
				let cse=document.querySelector('#cse');
				
				let o_resultsTable=null;
				//observer callback after loading the first set of results
				let loadNextCallback=function(mutations){
					/**
					returns:
						whether new results have loaded
					*/
					let resultsTable=cse.querySelector('.gsc-table-result');
					if(resultsTable==null || o_resultsTable==resultsTable)
						return false;
					o_resultsTable=resultsTable;
					window.dispatchEvent(new CustomEvent('results'));
					return true;
				}
				let loadNextObserver=new MutationObserver(loadNextCallback);
				
				//observer callback when loading the first set of results
				let loadFirstCallback=function(mutations){
					//wait until the first results have loaded before disconnecting
					if(!loadNextCallback())
						return false;
					loadFirstObserver.disconnect();
					let results=cse.querySelector('.gsc-results');
					if(results==null)
						return;
					loadNextObserver.observe(results,{attributes: true});
				}
				let loadFirstObserver=new MutationObserver(loadFirstCallback);
				
				//wait until the first set of results have loaded
				loadFirstObserver.observe(cse,{subtree: true, childList: true});
			}
			//resultsCallback needs privileged functions
			window.addEventListener('results',resultsCallback,false);
		},
	},
	
	instant: {
		init: function(){
			//initialize searchGui if we haven't already (e.g. on the home page)
			if(!searchGui.initialized)
				searchGui.init();
			
			//results parent node
			let resultsNode;
			//pref link
			let _prefLink;
			
			let resultsObserver=new MutationObserver(function(mutations){
				mutations.forEach(function(mutation) {
					//filter nodes whenever they are added, instead of doing batch filters
					for(let i=0;i<mutation.addedNodes.length;i++){
						addedNode=mutation.addedNodes[i];
						if(addedNode.id=='ires'){
							//update prefLink (google instant inserts a new one every time)
							if(!_prefLink || !isInDom(_prefLink))
								_prefLink=prefLink.createLinkSettings();
							//we have a new query, google only adds this node with all results added (to test this properly, disable all other userscripts)
							searchGui.filterResults();
							prefMeta.isUpdated=false;
							//other extensions might use this
							window.dispatchEvent(new CustomEvent('instantResults'));
						}
					};
				});
			});
			
			let mainNode=document.getElementById('main');
			if(!mainNode)
				return false;
			resultsObserver.observe(mainNode,{subtree: true, childList: true});
		},
	},
	
	init: function(){
		for(let i=0;i<config.ext.length;i++){
			let e=ext[config.ext[i]];
			if('init' in e) e.init();
		}
	},
	
	loaded: function(){
		for(let i=0;i<config.ext.length;i++){
			let e=ext[config.ext[i]];
			if('loaded' in e) e.loaded();
		}
	},
}

function init(){
	logger.init();
	logTime.start();
	if(ext.init()==false){logger.error('ext.init()'); return;}
	if(gfpFilter.init()==false){logger.error('gfpFilter.init()'); return;}
	if(gfpMatcher.init()==false){logger.error('gfpMatcher.init()'); return;}
	if(prefLink.init()==false){logger.error('prefLink.init()'); return;}
	if(searchGui.isSearchPage()){
		if(searchGui.init()==false){logger.error('searchGui.init()'); return;}
		if(searchGui.filterResults()==false){logger.error('searchGui.filterResults()'); return;}
	}
	if(ext.loaded()==false){logger.error('ext.loaded()'); return;}
	logTime.end('Total init time');
}


/**
editable grid
*/
/*
 * EditableGrid.js
 * 
 * Copyright 2010 Webismymind SPRL
 *
 * This file is part of EditableGrid.
 * 
 * EditableGrid is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or 
 * any later version.
 * 
 * EditableGrid is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with EditableGrid. If not, see http://www.gnu.org/licenses.
 * 
 */

if (typeof _$ == 'undefined') {
	function _$(elementId) { return document.getElementById(elementId); }
}

/**
 * Creates a new column
 * @constructor
 * @class Represents a column in the editable grid
 * @param {Object} config
 */
function Column(config)
{
	// default properties
    var props = {
        name: "",
        label: "",
		editable: true,
		renderable: true,
        datatype: "string",
        unit: null,
        precision: null,
        nansymbol: '',
        bar: true, // is the column to be displayed in a bar chart ? relevant only for numerical columns 
        headerRenderer: null,
        headerEditor: null,
        cellRenderer: null,
		cellEditor: null,
		cellValidators: [],
		enumProvider: null,
		optionValues: null,
        columnIndex: -1
    };

    // override default properties with the ones given
    for (var p in props) this[p] = (typeof config == 'undefined' || typeof config[p] == 'undefined') ? props[p] : config[p];
}

Column.prototype.getOptionValuesForRender = function(rowIndex) { 
	var values = this.enumProvider.getOptionValuesForRender(this.editablegrid, this, rowIndex);
	return values ? values : this.optionValues;
};

Column.prototype.getOptionValuesForEdit = function(rowIndex) { 
	var values = this.enumProvider.getOptionValuesForEdit(this.editablegrid, this, rowIndex);
	return values ? values : this.optionValues;
};

Column.prototype.isValid = function(value) {
	for (var i = 0; i < this.cellValidators.length; i++) if (!this.cellValidators[i].isValid(value)) return false;
	return true;
};

Column.prototype.isNumerical = function() {
	return this.datatype =='double' || this.datatype =='integer';
};

/**
 * Creates a new enumeration provider 
 * @constructor
 * @class Base class for all enumeration providers
 * @param {Object} config
 */
function EnumProvider(config)
{
	// default properties
    this.getOptionValuesForRender = function(grid, column, rowIndex) { return null; };
    this.getOptionValuesForEdit = function(grid, column, rowIndex) { return null; };

    // override default properties with the ones given
    for (var p in config) this[p] = config[p];
}

/**
 * Creates a new EditableGrid.
 * <p>You can specify here some configuration options (optional).
 * <br/>You can also set these same configuration options afterwards.
 * <p>These options are:
 * <ul>
 * <li>enableSort: enable sorting when clicking on column headers (default=true)</li>
 * <li>doubleclick: use double click to edit cells (default=false)</li>
 * <li>editmode: can be one of
 * <ul>
 * 		<li>absolute: cell editor comes over the cell (default)</li>
 * 		<li>static: cell editor comes inside the cell</li>
 * 		<li>fixed: cell editor comes in an external div</li>
 * </ul>
 * </li>
 * <li>editorzoneid: used only when editmode is set to fixed, it is the id of the div to use for cell editors</li>
 * <li>allowSimultaneousEdition: tells if several cells can be edited at the same time (default=false)<br/>
 * Warning: on some Linux browsers (eg. Epiphany), a blur event is sent when the user clicks on a 'select' input to expand it.
 * So practically, in these browsers you should set allowSimultaneousEdition to true if you want to use columns with option values and/or enum providers.
 * This also used to happen in older versions of Google Chrome Linux but it has been fixed, so upgrade if needed.</li>
 * <li>invalidClassName: CSS class to apply to text fields when the entered value is invalid (default="invalid")</li>
 * <li>ignoreLastRow: ignore last row when sorting and charting the data (typically for a 'total' row)</li>
 * <li>caption: text to use as the grid's caption</li>
 * </ul>
 * @constructor
 * @class EditableGrid
 */
function EditableGrid(name, config)
{
	if (typeof name != "string" || typeof config != "object") {
		alert("The EditableGrid constructor takes two arguments:\n- name (string)\n- config (object)\n\nGot instead " + (typeof name) + " and " + (typeof config) + ".");
	};
	
	// default properties
    var props = 
    {
   		enableSort: true,
		doubleclick: false,
        editmode: "absolute",
        editorzoneid: "",
		allowSimultaneousEdition: false,
		saveOnBlur: true,
   		invalidClassName: "invalid",
   		ignoreLastRow: false, // ignore last row for sorting and pie/bar charts
   		caption: null    
    };
    
	// override default properties with the ones given
	for (var p in props) this[p] = props[p];
	for (var p in config) this[p] = config[p];
    
    this.Browser = {
    		IE:  !!(window.attachEvent && navigator.userAgent.indexOf('Opera') === -1),
    		Opera: navigator.userAgent.indexOf('Opera') > -1,
    		WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    		Gecko: navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
    		MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
    };
    
    // private data
    this.name = name;
    this.columns = [];
    this.data = [];
    this.xmlDoc = null;
    this.sortedColumnName = -1;
    this.sortDescending = false;
    this.baseUrl = this.detectDir();
    this.nbHeaderRows = 1;
    this.lastSelectedRowIndex = -1;
    
    if (this.enableSort) {
    	this.sortUpImage = new Image();
    	this.sortUpImage.src = this.baseUrl + "/images/bullet_arrow_up.png";
    	this.sortDownImage = new Image();
    	this.sortDownImage.src = this.baseUrl + "/images/bullet_arrow_down.png";
    }
	
	var _this=this;
	//sets new mouseClickedWrapper for each individual grid object
	if(!this.mouseClickedWrapper) this.mouseClickedWrapper=function(e){ _this.mouseClicked(e); };
}

/**
 * Callback functions
 */

EditableGrid.prototype.tableLoaded = function() {};
EditableGrid.prototype.chartRendered = function() {};
EditableGrid.prototype.tableRendered = function(containerid, className, tableid) {};
EditableGrid.prototype.tableSorted = function() {};
EditableGrid.prototype.tableFiltered = function() {};
EditableGrid.prototype.modelChanged = function(rowIndex, columnIndex, oldValue, newValue, row) {};
EditableGrid.prototype.rowSelected = function(oldRowIndex, newRowIndex) {};
EditableGrid.prototype.isHeaderEditable = function(rowIndex, columnIndex) { return false; };
EditableGrid.prototype.isEditable =function(rowIndex, columnIndex) { return true; };
EditableGrid.prototype.readonlyWarning = function() {};

/**
 * Load metadata and data from an XML url
 */
EditableGrid.prototype.loadXML = function(url)
{
	// we use a trick to avoid getting an old version from the browser's cache
	var orig_url = url;
	var sep = url.indexOf('?') >= 0 ? '&' : '?'; 
	url += sep + Math.floor(Math.random() * 100000);
		
    with (this) {
    	
    	// IE
        if (window.ActiveXObject) 
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.addEventListener('readystatechange', function() {
                if (xmlDoc.readyState == 4) {
                    processXML();
                    tableLoaded();
                }
            }, false);
            xmlDoc.load(url);
        }
        
        // Safari
        else if (/*Browser.WebKit && */ window.XMLHttpRequest) 
        {
           	xmlDoc = new XMLHttpRequest();
           	xmlDoc.addEventListener('readystatechange', function () {
           		if (xmlDoc.readyState == 4) {
       				xmlDoc = xmlDoc.responseXML;
       				if (!xmlDoc) { /* alert("Could not load XML from url '" + orig_url + "'"); */ return false; }
       				processXML();
       				tableLoaded();
       			}
       		}, false);
           	xmlDoc.open("GET", url, true);
           	xmlDoc.send("");
        }
        
        // Firefox (and other browsers) 
        else if (document.implementation && document.implementation.createDocument) 
        {
        	xmlDoc = document.implementation.createDocument("", "", null);
        	xmlDoc.addEventListener('load', function() {
        		processXML();
                tableLoaded();
        	}, false);
            xmlDoc.load(url);
        }
        
        // should never happen
        else { 
        	alert("Cannot load XML file with this browser!"); 
        	return false;
        }
    
        return true;
    }
};

/**
 * Process the XML content
 * @private
 */
EditableGrid.prototype.processXML = function()
{
	with (this) {
    	
		// clear model and pointer to current table
	    this.columns = [];
	    this.data = [];
		this.table = null;

        // load metadata (only one tag <metadata> --> metadata[0])
        var metadata = xmlDoc.getElementsByTagName("metadata");
        if (!metadata || metadata.length < 1) return false;
        var columnDeclarations = metadata[0].getElementsByTagName("column");
        for (var i = 0; i < columnDeclarations.length; i++) {
        	
        	// get column type
            var col = columnDeclarations[i];
            var datatype = col.getAttribute("datatype");

            // get enumerated values if any
        	var optionValues = null;
            var enumValues = col.getElementsByTagName("values");
            if (enumValues.length > 0) {
            	optionValues = {};
                enumValues = enumValues[0].getElementsByTagName("value");
                for (var v = 0; v < enumValues.length; v++) {
                	optionValues[enumValues[v].getAttribute("value")] = enumValues[v].firstChild ? enumValues[v].firstChild.nodeValue : "";
                }
            }

            // create new column           
            var column = new Column({
            	name: col.getAttribute("name"),
            	label: typeof col.getAttribute("label") == 'string' ? col.getAttribute("label") : col.getAttribute("name"),
            	datatype: col.getAttribute("datatype") ? col.getAttribute("datatype") : "string",
                editable : col.getAttribute("editable") == "true",
                bar : col.getAttribute("bar") ? col.getAttribute("bar") == "true" : true,
            	optionValues: optionValues,
            	enumProvider: (optionValues ? new EnumProvider() : null),
            	columnIndex: i
            });

            // parse column type
            parseColumnType(column);

			// create suited cell renderer
            _createCellRenderer(column);
			_createHeaderRenderer(column);
			
			// create suited cell editor
            _createCellEditor(column);  
			_createHeaderEditor(column);

			// add default cell validators based on the column type
			_addDefaultCellValidators(column);

            // add column
			column.editablegrid = this;
            columns.push(column);
        }
        
        // load content
        var rows = xmlDoc.getElementsByTagName("row");
        for (var i = 0; i < rows.length; i++) 
        {
        	// get all defined cell values
            var cellValues = {};
            var cols = rows[i].getElementsByTagName("column");
            for (var j = 0; j < cols.length; j++) {
            	var colname = cols[j].getAttribute("name");
            	if (!colname) {
            		if (j >= columns.length) alert("You defined too many columns for row " + (i+1));
            		else colname = columns[j].name; 
            	}
            	cellValues[colname] = cols[j].firstChild ? cols[j].firstChild.nodeValue : "";
            }

            // for each row we keep the orginal index, the id and all other attributes that may have been set in the XML
            var rowData = { originalIndex: i, id: rows[i].getAttribute("id") ? rows[i].getAttribute("id") : "" };  
            for (var attrIndex = 0; attrIndex < rows[i].attributes.length; attrIndex++) {
            	var node = rows[i].attributes.item(attrIndex);
            	if (node.nodeName != "id") rowData[node.nodeName] = node.nodeValue; 
            }

            // get column values for this rows
            rowData.columns = [];
            for (var c = 0; c < columns.length; c++) {
            	var cellValue = columns[c].name in cellValues ? cellValues[columns[c].name] : "";
            	rowData.columns.push(getTypedValue(c, cellValue));
            }
            
            // add row data in our model
       		data.push(rowData);
        }
    }
};

/**
 * Parse column type
 * @private
 */

EditableGrid.prototype.parseColumnType = function(column)
{
    // extract precision, unit and nansymbol from type if two given
    if (column.datatype.match(/(.*)\((.*),(.*),(.*)\)$/)) {
    	column.datatype = RegExp.$1;
    	column.unit = RegExp.$2.trim();
    	column.precision = parseInt(RegExp.$3);
    	column.nansymbol = RegExp.$4.trim();
    }

    // extract precision and unit from type if two given
    if (column.datatype.match(/(.*)\((.*),(.*)\)$/)) {
    	column.datatype = RegExp.$1.trim();
    	column.unit = RegExp.$2.trim();
    	column.precision = parseInt(RegExp.$3);
    }

    // extract precision or unit from type if any given
    if (column.datatype.match(/(.*)\((.*)\)$/)) {
    	column.datatype = RegExp.$1.trim();
    	var unit_or_precision = RegExp.$2.trim();
    	if (unit_or_precision.match(/^[0-9]*$/)) column.precision = parseInt(unit_or_precision);
    	else column.unit = unit_or_precision;
    }
    
    if (isNaN(column.precision)) column.precision = null;
    if (column.unit == '') column.unit = null;
    if (column.nansymbol == '') column.nansymbol = null;
};

/**
 * Get typed value
 * @private
 */

EditableGrid.prototype.getTypedValue = function(columnIndex, cellValue) 
{
	var colType = this.getColumnType(columnIndex);
	if (colType == 'boolean') cellValue = (cellValue && cellValue != 0 && cellValue != "false") ? true : false;
	if (colType == 'integer') { cellValue = parseInt(cellValue); } 
	if (colType == 'double') { cellValue = parseFloat(cellValue); }
	if (colType == 'string') { cellValue = "" + cellValue; }
	return cellValue;
};

/**
 * Attach to an existing HTML table, using given column definitions
 */
EditableGrid.prototype.attachToHTMLTable = function(_table, _columns)
{
    with (this) {

    	// we have our new columns
        columns = _columns;
        for (var c = 0; c < columns.length; c++) {
        	
        	// set column index and back pointer
        	var column = columns[c];
			column.editablegrid = this;
        	column.columnIndex = c;

            // parse column type
            parseColumnType(column);

			// create suited enum provider, renderer and editor if none given
        	if (!column.enumProvider) column.enumProvider = column.optionValues ? new EnumProvider() : null;
            if (!column.cellRenderer) _createCellRenderer(column);
            if (!column.headerRenderer) _createHeaderRenderer(column);
            if (!column.cellEditor) _createCellEditor(column);  
            if (!column.headerEditor) _createHeaderEditor(column);

			// add default cell validators based on the column type
			_addDefaultCellValidators(column);
        }

        // get pointers to table components
        this.table = _table;
        this.tHead = _table.tHead;
        this.tBody = _table.tBodies[0];
        
        // create table body if needed
        if (!tBody) {
        	tBody = document.createElement("TBODY");
        	table.insertBefore(tBody, table.firstChild);
        }

        // create table header if needed
        if (!tHead) {
        	tHead = document.createElement("THEAD");
        	table.insertBefore(tHead, tBody);
        }

        // if header is empty use first body row as header
        if (tHead.rows.length == 0 && tBody.rows.length > 0) 
        	tHead.appendChild(tBody.rows[0]);

        // check that header has exactly one row
        this.nbHeaderRows = tHead.rows.length;
        /*if (tHead.rows.length != 1) {
        	alert("You table header must have exactly row!");
        	return false;
        }*/

        // load header labels
       	var rows = tHead.rows;
       	for (var i = 0; i < rows.length; i++) {
       		var cols = rows[i].cells;
       		var columnIndexInModel = 0;
       		for (var j = 0; j < cols.length && columnIndexInModel < columns.length; j++) {
       			if (!columns[columnIndexInModel].label) columns[columnIndexInModel].label = cols[j].innerHTML;
       			var colspan = parseInt(cols[j].getAttribute("colspan"));
       			columnIndexInModel += colspan > 1 ? colspan : 1;
       		}
       	}

        // load content
        var rows = tBody.rows;
        for (var i = 0; i < rows.length; i++) {
            var rowData = [];
            var cols = rows[i].cells;
            for (var j = 0; j < cols.length && j < columns.length; j++) rowData.push(this.getTypedValue(j, cols[j].innerHTML));
       		data.push({originalIndex: i, id: rows[i].id, columns: rowData});
       		rows[i].id = this.name + '_' + rows[i].id;
        }
    }
};

/**
 * Creates a suitable cell renderer for the column
 * @private
 */
EditableGrid.prototype._createCellRenderer = function(column)
{
	column.cellRenderer = 
		column.enumProvider ? new EnumCellRenderer() :
		column.datatype == "integer" || column.datatype == "double" ? new NumberCellRenderer() :
    	column.datatype == "boolean" ? new CheckboxCellRenderer() : 
    	column.datatype == "email" ? new EmailCellRenderer() : 
        column.datatype == "website" || column.datatype == "url" ? new WebsiteCellRenderer() : 
        column.datatype == "date" ? new DateCellRenderer() : 
    	new CellRenderer();

	// give access to the column from the cell renderer
	if (column.cellRenderer) {
		column.cellRenderer.editablegrid = this;
		column.cellRenderer.column = column;
	}
};

/**
 * Creates a suitable header cell renderer for the column
 * @private
 */
EditableGrid.prototype._createHeaderRenderer = function(column)
{
	column.headerRenderer = (this.enableSort && column.datatype != "html") ? new SortHeaderRenderer(column.name) : new CellRenderer();

	// give access to the column from the header cell renderer
	if (column.headerRenderer) {
		column.headerRenderer.editablegrid = this;
		column.headerRenderer.column = column;
	}		
};

/**
 * Creates a suitable cell editor for the column
 * @private
 */
EditableGrid.prototype._createCellEditor = function(column)
{
	column.cellEditor = 
		column.enumProvider ? new SelectCellEditor() :
		column.datatype == "integer" || column.datatype == "double" ? new NumberCellEditor(column.datatype) :
		column.datatype == "boolean" ? null :
		column.datatype == "email" ? new TextCellEditor(column.precision) :
		column.datatype == "website" || column.datatype == "url" ? new TextCellEditor(column.precision) :
		column.datatype == "date" ? new TextCellEditor(column.precision, 10) :
		new TextCellEditor(column.precision);  
		
	// give access to the column from the cell editor
	if (column.cellEditor) {
		column.cellEditor.editablegrid = this;
		column.cellEditor.column = column;
	}
};

/**
 * Creates a suitable header cell editor for the column
 * @private
 */
EditableGrid.prototype._createHeaderEditor = function(column)
{
	column.headerEditor =  new TextCellEditor();  
		
	// give access to the column from the cell editor
	if (column.headerEditor) {
		column.headerEditor.editablegrid = this;
		column.headerEditor.column = column;
	}
};

/**
 * Returns the number of rows
 */
EditableGrid.prototype.getRowCount = function()
{
	return this.data.length;
};

/**
 * Returns the number of columns
 */
EditableGrid.prototype.getColumnCount = function()
{
	return this.columns.length;
};

/**
 * Returns the column
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.getColumn = function(columnIndexOrName)
{
	var colIndex = this.getColumnIndex(columnIndexOrName);
	if (colIndex < 0) { alert("[getColumn] Column not found with index or name " + columnIndexOrName); return null; }
	return this.columns[colIndex];
};

/**
 * Returns the name of a column
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.getColumnName = function(columnIndexOrName)
{
	return this.getColumn(columnIndexOrName).name;
};

/**
 * Returns the label of a column
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.getColumnLabel = function(columnIndexOrName)
{
	return this.getColumn(columnIndexOrName).label;
};

/**
 * Returns the type of a column
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.getColumnType = function(columnIndexOrName)
{
	return this.getColumn(columnIndexOrName).datatype;
};

/**
 * Returns the unit of a column
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.getColumnUnit = function(columnIndexOrName)
{
	return this.getColumn(columnIndexOrName).unit;
};

/**
 * Returns the precision of a column
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.getColumnPrecision = function(columnIndexOrName)
{
	return this.getColumn(columnIndexOrName).precision;
};

/**
 * Returns true if the column is to be displayed in a bar chart
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.isColumnBar = function(columnIndexOrName)
{
	var column = this.getColumn(columnIndexOrName);
	return (column.bar && column.isNumerical());
};

/**
 * Returns true if the column is numerical (double or integer)
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.isColumnNumerical = function(columnIndexOrName)
{
	var column = this.getColumn(columnIndexOrName);
	return column.isNumerical();;
};

/**
 * Returns the value at the specified index
 * @param {Integer} rowIndex
 * @param {Integer} columnIndex
 */
EditableGrid.prototype.getValueAt = function(rowIndex, columnIndex)
{
	// check and get column
	if (columnIndex < 0 || columnIndex >= this.columns.length) { alert("[getValueAt] Invalid column index " + columnIndex); return null; }
	var column = this.columns[columnIndex];
	
	// get value in model
	if (rowIndex < 0) return column.label;
	
	var rowData = this.data[rowIndex]['columns'];
	return rowData ? rowData[columnIndex] : null;
};

/**
 * Sets the value at the specified index
 * @param {Integer} rowIndex
 * @param {Integer} columnIndex
 * @param {Object} value
 * @param {Boolean} render
 */
EditableGrid.prototype.setValueAt = function(rowIndex, columnIndex, value, render)
{
	if (typeof render == "undefined") render = true;
	var previousValue = null;;
	
	// check and get column
	if (columnIndex < 0 || columnIndex >= this.columns.length) { alert("[setValueAt] Invalid column index " + columnIndex); return null; }
	var column = this.columns[columnIndex];
	
	// set new value in model
	if (rowIndex < 0) {
		previousValue = column.label;
		column.label = value;
	}
	else {
		var rowData = this.data[rowIndex]['columns'];
		previousValue = rowData[columnIndex];
		if (rowData) rowData[columnIndex] = this.getTypedValue(columnIndex, value);
	}
	
	// render new value
	if (render) {
		var renderer = rowIndex < 0 ? column.headerRenderer : column.cellRenderer;  
		renderer._render(rowIndex, columnIndex, this.getCell(rowIndex, columnIndex), value);
	}
	
	return previousValue;
};

/**
 * Find column index from its name
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.getColumnIndex = function(columnIndexOrName)
{
	if (typeof columnIndexOrName == "undefined" || columnIndexOrName === "") return -1;
	
	// TODO: problem because the name of a column could be a valid index, and we cannot make the distinction here!
	
	// if columnIndexOrName is a number which is a valid index return it
	if (!isNaN(columnIndexOrName) && columnIndexOrName >= 0 && columnIndexOrName < this.columns.length) return columnIndexOrName;
	
	// otherwise search for the name
	for (var c = 0; c < this.columns.length; c++) if (this.columns[c].name == columnIndexOrName) return c;

	return -1;
};

/**
 * Get row object at given index
 * @param {Integer} index of the row
 */
EditableGrid.prototype.getRow = function(rowIndex)
{
	if (rowIndex < 0) return this.tHead.rows[rowIndex + this.nbHeaderRows];
	return this.tBody.rows[rowIndex];
};

/**
 * Get row id specified in XML or HTML
 * @param {Integer} index of the row
 */
EditableGrid.prototype.getRowId = function(rowIndex)
{
	return (rowIndex < 0 || rowIndex >= this.data.length) ? null : this.data[rowIndex]['id'];
};

/**
 * Get custom row attribute specified in XML
 * @param {Integer} index of the row
 * @param {String} name of the attribute
 */
EditableGrid.prototype.getRowAttribute = function(rowIndex, attributeName)
{
	return this.data[rowIndex][attributeName];
};

/**
 * Set custom row attribute
 * @param {Integer} index of the row
 * @param {String} name of the attribute
 * @param value of the attribute
 */
EditableGrid.prototype.setRowAttribute = function(rowIndex, attributeName, attributeValue)
{
	this.data[rowIndex][attributeName] = attributeValue;
};

/**
 * Remove row with given id
 * @param {Integer} rowId
 */
EditableGrid.prototype.removeRow = function(rowId)
{
	var tr = _$(this.name + "_" + rowId);
	var rowIndex = tr.rowIndex - this.nbHeaderRows; // remove header rows
	this.tBody.removeChild(tr);
	this.data.splice(rowIndex, 1);
};

/**
 * Get index of row with given id
 * @param {Integer} rowId or row object
 */
EditableGrid.prototype.getRowIndex = function(rowId) 
{
	var tr = typeof rowId == 'object' ? rowId : _$(this.name + "_" + rowId);
	return tr ? tr.rowIndex - this.nbHeaderRows : -1; // remove header rows
};

/**
 * Add row with given id and data
 * @param {Integer} rowId
 * @param {Integer} columns
 * @param {Boolean} dontSort
 */
EditableGrid.prototype.addRow = function(rowId, cellValues, dontSort)
{
	with (this) {
		
		// add row in data
		var rowData = [];
        for (var c = 0; c < columns.length; c++) {
        	var cellValue = columns[c].name in cellValues ? cellValues[columns[c].name] : "";
        	rowData.push(getTypedValue(c, cellValue));
        }
		var rowIndex = data.length;
		data.push({originalIndex: rowIndex, id: rowId, columns: rowData});
		
		// create row in table and render content
		var tr = tBody.insertRow(rowIndex);
		tr.id = this.name + "_" + rowId;
		for (var c = 0; c < columns.length; c++) {
			var td = tr.insertCell(c);
			columns[c].cellRenderer._render(rowIndex, c, td, getValueAt(rowIndex,c));
		}

		// resort table
		if (!dontSort) sort();
	}
};

/**
 * Sets the column header cell renderer for the specified column index
 * @param {Object} columnIndexOrName index or name of the column
 * @param {CellRenderer} cellRenderer
 */
EditableGrid.prototype.setHeaderRenderer = function(columnIndexOrName, cellRenderer)
{
	var columnIndex = this.getColumnIndex(columnIndexOrName);
	if (columnIndex < 0) alert("[setHedareRenderer] Invalid column: " + columnIndexOrName);
	else {
		var column = this.columns[columnIndex];
		column.headerRenderer = (this.enableSort && column.datatype != "html") ? new SortHeaderRenderer(column.name, cellRenderer) : cellRenderer;

		// give access to the column from the cell renderer
		if (cellRenderer) {
			if (this.enableSort && column.datatype != "html") {
				column.headerRenderer.editablegrid = this;
				column.headerRenderer.column = column;
			}
			cellRenderer.editablegrid = this;
			cellRenderer.column = column;
		}
	}
};

/**
 * Sets the cell renderer for the specified column index
 * @param {Object} columnIndexOrName index or name of the column
 * @param {CellRenderer} cellRenderer
 */
EditableGrid.prototype.setCellRenderer = function(columnIndexOrName, cellRenderer)
{
	var columnIndex = this.getColumnIndex(columnIndexOrName);
	if (columnIndex < 0) alert("[setCellRenderer] Invalid column: " + columnIndexOrName);
	else {
		var column = this.columns[columnIndex];
		column.cellRenderer = cellRenderer;
	
		// give access to the column from the cell renderer
		if (cellRenderer) {
			cellRenderer.editablegrid = this;
			cellRenderer.column = column;
		}
	}
};

/**
 * Sets the cell editor for the specified column index
 * @param {Object} columnIndexOrName index or name of the column
 * @param {CellEditor} cellEditor
 */
EditableGrid.prototype.setCellEditor = function(columnIndexOrName, cellEditor)
{
	var columnIndex = this.getColumnIndex(columnIndexOrName);
	if (columnIndex < 0) alert("[setCellEditor] Invalid column: " + columnIndexOrName);
	else {
		var column = this.columns[columnIndex];
		column.cellEditor = cellEditor;
	
		// give access to the column from the cell editor
		if (cellEditor) {
			cellEditor.editablegrid = this;
			cellEditor.column = column;
		}
	}
};

/**
 * Sets the header cell editor for the specified column index
 * @param {Object} columnIndexOrName index or name of the column
 * @param {CellEditor} cellEditor
 */
EditableGrid.prototype.setHeaderEditor = function(columnIndexOrName, cellEditor)
{
	var columnIndex = this.getColumnIndex(columnIndexOrName);
	if (columnIndex < 0) alert("[setHeaderEditor] Invalid column: " + columnIndexOrName);
	else {
		var column = this.columns[columnIndex];
		column.headerEditor = cellEditor;
	
		// give access to the column from the cell editor
		if (cellEditor) {
			cellEditor.editablegrid = this;
			cellEditor.column = column;
		}
	}
};

/**
 * Sets the enum provider for the specified column index
 * @param {Object} columnIndexOrName index or name of the column
 * @param {EnumProvider} enumProvider
 */
EditableGrid.prototype.setEnumProvider = function(columnIndexOrName, enumProvider)
{
	var columnIndex = this.getColumnIndex(columnIndexOrName);
	if (columnIndex < 0) alert("[setEnumProvider] Invalid column: " + columnIndexOrName);
	else this.columns[columnIndex].enumProvider = enumProvider;
	
	// we must recreate the cell renderer and editor for this column
	this._createCellRenderer(this.columns[columnIndex]);
	this._createCellEditor(this.columns[columnIndex]);
};

/**
 * Clear all cell validators for the specified column index
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.clearCellValidators = function(columnIndexOrName)
{
	var columnIndex = this.getColumnIndex(columnIndexOrName);
	if (columnIndex < 0) alert("[clearCellValidators] Invalid column: " + columnIndexOrName);
	else this.columns[columnIndex].cellValidators = [];
};

/**
 * Adds default cell validators for the specified column index (according to the column type)
 * @param {Object} columnIndexOrName index or name of the column
 */
EditableGrid.prototype.addDefaultCellValidators = function(columnIndexOrName)
{
	var columnIndex = this.getColumnIndex(columnIndexOrName);
	if (columnIndex < 0) alert("[addDefaultCellValidators] Invalid column: " + columnIndexOrName);
	return this._addDefaultCellValidators(this.columns[columnIndex]);
};

/**
 * Adds default cell validators for the specified column
 * @private
 */
EditableGrid.prototype._addDefaultCellValidators = function(column)
{
	if (column.datatype == "integer" || column.datatype == "double") column.cellValidators.push(new NumberCellValidator(column.datatype));
	else if (column.datatype == "email") column.cellValidators.push(new EmailCellValidator());
	else if (column.datatype == "website" || column.datatype == "url") column.cellValidators.push(new WebsiteCellValidator());
	else if (column.datatype == "date") column.cellValidators.push(new DateCellValidator(this));
};

/**
 * Adds a cell validator for the specified column index
 * @param {Object} columnIndexOrName index or name of the column
 * @param {CellValidator} cellValidator
 */
EditableGrid.prototype.addCellValidator = function(columnIndexOrName, cellValidator)
{
	var columnIndex = this.getColumnIndex(columnIndexOrName);
	if (columnIndex < 0) alert("[addCellValidator] Invalid column: " + columnIndexOrName);
	else this.columns[columnIndex].cellValidators.push(cellValidator);
};

/**
 * Sets the table caption: set as null to remove
 * @param columnIndexOrName
 * @param caption
 * @return
 */
EditableGrid.prototype.setCaption = function(caption)
{
	this.caption = caption;
};

/**
 * Get cell element at given row and column
 */
EditableGrid.prototype.getCell = function(rowIndex, columnIndex)
{
	var row = this.getRow(rowIndex);
	return row.cells[columnIndex];
};

/**
 * Get cell X position relative to the first non static offset parent
 * @private
 */
EditableGrid.prototype.getCellX = function(oElement)
{
	var iReturnValue = 0;
	while (oElement != null && this.isStatic(oElement)) try {
		iReturnValue += oElement.offsetLeft;
		oElement = oElement.offsetParent;
	} catch(err) { oElement = null; }
	return iReturnValue;
};

/**
 * Get cell Y position relative to the first non static offset parent
 * @private
 */
EditableGrid.prototype.getCellY = function(oElement)
{
	var iReturnValue = 0;
	while (oElement != null && this.isStatic(oElement)) try {
		iReturnValue += oElement.offsetTop;
		oElement = oElement.offsetParent;
	} catch(err) { oElement = null; }
	return iReturnValue;
};

/**
 * Renders the grid as an HTML table in the document
 * @param {String} containerid 
 * id of the div in which you wish to render the HTML table (this parameter is ignored if you used attachToHTMLTable)
 * @param {String} className 
 * CSS class name to be applied to the table (this parameter is ignored if you used attachToHTMLTable)
 * @param {String} tableid
 * ID to give to the table (this parameter is ignored if you used attachToHTMLTable)
 * @see EditableGrid#attachToHTMLTable
 * @see EditableGrid#loadXML
 */
EditableGrid.prototype.renderGrid = function(containerid, className, tableid)
{
    with (this) {

    	// if we are already attached to an existing table, just update the cell contents
    	if (typeof table != "undefined" && table) {
    		
    		// render headers
    		_renderHeaders();
			   
    		// render content
            var rows = tBody.rows;
            for (var i = 0; i < rows.length; i++) {
                var rowData = [];
                var cols = rows[i].cells;
                for (var j = 0; j < cols.length && j < columns.length; j++) 
                	if (columns[j].renderable) columns[j].cellRenderer._render(i, j, cols[j], getValueAt(i,j));
            }

            // attach handler on click or double click 
        	if (doubleclick) table.addEventListener('dblclick', mouseClickedWrapper, false);
        	else table.addEventListener('click', mouseClickedWrapper, false);
    	}
    	
    	// we must render a whole new table
    	else {
    		
    		if (!_$(containerid)) return alert("Unable to get element [" + containerid + "]");

    		// create editablegrid table and add it to our container 
    		this.table = document.createElement("table");
    		table.className = className || "editablegrid";          
			if (typeof tableid != "undefined") table.id = tableid;
    		while (_$(containerid).hasChildNodes()) _$(containerid).removeChild(_$(containerid).firstChild);
    		_$(containerid).appendChild(table);
        
    		// create header
    		if (caption) {
    			var captionElement = document.createElement("CAPTION");
    			captionElement.innerHTML = this.caption;
    			table.appendChild(captionElement);
    		}
    		
    		this.tHead = document.createElement("THEAD");
    		table.appendChild(tHead);
    		var trHeader = tHead.insertRow(0);
    		var columnCount = getColumnCount();
    		for (var c = 0; c < columnCount; c++) {
    			var headerCell = document.createElement("TH");
    			var td = trHeader.appendChild(headerCell);
        		columns[c].headerRenderer._render(-1, c, td, columns[c].label);
    		}
        
    		// create body and rows
    		this.tBody = document.createElement("TBODY");
    		table.appendChild(tBody);
    		var rowCount = getRowCount();
    		for (i = 0; i < rowCount; i++) {
    			var tr = tBody.insertRow(i);
    			tr.id = this.name + "_" + data[i]['id'];
    			for (j = 0; j < columnCount; j++) {
        		
    				// create cell and render its content
    				var td = tr.insertCell(j);
    				columns[j].cellRenderer._render(i, j, td, getValueAt(i,j));
    			}
    		}

    		// attach handler on click or double click 
        	if (doubleclick) _$(containerid).addEventListener('dblclick', mouseClickedWrapper, false);
        	else _$(containerid).addEventListener('click', mouseClickedWrapper, false);
    	}
    	
		// resort table
		sort();
		
		// callback
		tableRendered(containerid, className, tableid);
    }
};

/**
 * Render all column headers 
 * @private
 */
EditableGrid.prototype._renderHeaders = function() 
{
	with (this) {
		var rows = tHead.rows;
		for (var i = 0; i < 1 /*rows.length*/; i++) {
			var rowData = [];
			var cols = rows[i].cells;
       		var columnIndexInModel = 0;
       		for (var j = 0; j < cols.length && columnIndexInModel < columns.length; j++) {
				columns[columnIndexInModel].headerRenderer._render(-1, columnIndexInModel, cols[j], columns[columnIndexInModel].label);
       			var colspan = parseInt(cols[j].getAttribute("colspan"));
       			columnIndexInModel += colspan > 1 ? colspan : 1;
       		}
		}
	}
};

EditableGrid.prototype.unattach = function()
{
    with (this) {
		if (doubleclick) table.removeEventListener('dblclick', mouseClickedWrapper, false);
		else table.removeEventListener('click', mouseClickedWrapper, false);
	}
};

/**
 * Mouse click handler
 * @param {Object} e
 * @private
 */
EditableGrid.prototype.mouseClicked = function(e) 
{
	e = e || window.event;
	with (this) {
		
		// get row and column index from the clicked cell
		var target = e.target || e.srcElement;
		
		// go up parents to find a cell or a link under the clicked position
		while (target) if (target.tagName == "A" || target.tagName == "TD" || target.tagName == "TH") break; else target = target.parentNode;
		if (!target || !target.parentNode || !target.parentNode.parentNode || (target.parentNode.parentNode.tagName != "TBODY" && target.parentNode.parentNode.tagName != "THEAD") || target.hasAttribute('isEditing')) return;
		
		// don't handle clicks on links
		if (target.tagName == "A") return;
		
		// get cell position in table
		var rowIndex = target.parentNode.rowIndex - nbHeaderRows; // remove header rows
		var columnIndex = target.cellIndex;

		var column = columns[columnIndex];
		if (column) {
			
			// if another row has been selected: callback
			if (rowIndex > -1 && rowIndex != lastSelectedRowIndex) {
				rowSelected(lastSelectedRowIndex, rowIndex);				
				lastSelectedRowIndex = rowIndex;
			}
			
			// edit current cell value
			if (!column.editable) { readonlyWarning(column); }
			else {
				if (rowIndex < 0) { 
					if (column.headerEditor && isHeaderEditable(rowIndex, columnIndex)) 
						column.headerEditor.edit(rowIndex, columnIndex, target, column.label);
				}
				else if (column.cellEditor && isEditable(rowIndex, columnIndex))
					column.cellEditor.edit(rowIndex, columnIndex, target, getValueAt(rowIndex, columnIndex));
			}
		}
	}
};

/**
 * Sort on a column
 * @param {Object} columnIndexOrName index or name of the column
 * @param {Boolean} descending
 */
EditableGrid.prototype.sort = function(columnIndexOrName, descending)
{
	with (this) {
		
		if (typeof columnIndexOrName  == 'undefined') columnIndexOrName = sortedColumnName;
		if (typeof descending  == 'undefined') descending = sortDescending;

		var columnIndex = columnIndexOrName;
		if (columnIndex !== -1) {
			columnIndex = this.getColumnIndex(columnIndexOrName);
			if (columnIndex < 0) {
				alert("[sort] Invalid column: " + columnIndexOrName);
				return false;
			}
		}
		
		var type = columnIndex < 0 ? "" : getColumnType(columnIndex);
		var row_array = [];
		var rows = tBody.rows;
		for (var i = 0; i < rows.length - (ignoreLastRow ? 1 : 0); i++) row_array.push([columnIndex < 0 ? null : getValueAt(i, columnIndex), i, rows[i], data[i].originalIndex]);
		row_array.sort(columnIndex < 0 ? unsort :
					   type == "integer" || type == "double" ? sort_numeric :
					   type == "boolean" ? sort_boolean :
					   type == "date" ? sort_date :
					   sort_alpha);
		
		if (descending) row_array = row_array.reverse();
		if (ignoreLastRow) row_array.push([columnIndex < 0 ? null : getValueAt(rows.length - 1, columnIndex), rows.length - 1, rows[rows.length - 1], data[rows.length - 1].originalIndex]);
		
		var _data = data;
		data = [];
		for (var i = 0; i < row_array.length; i++) {
			data.push(_data[row_array[i][1]]);
			tBody.appendChild(row_array[i][2]);
		}
		delete row_array;
		
		// callback
		tableSorted();
	}
};


/**
 * Filter the content of the table
 * @param {Element} filter Element input element used to filter
 */
EditableGrid.prototype.filter = function(str)
{
	with (this) {
    	var words = str.toLowerCase().split(" ");
		var ele;
		for (var r = 1; r < table.rows.length; r++){
			ele = table.rows[r].innerHTML.replace(/<[^>]+>/g,"");
		    var displayStyle = 'none';
	        for (var i = 0; i < words.length; i++) {
		    	if (ele.toLowerCase().indexOf(words[i])>=0)
						displayStyle = '';
		    	 else {
					displayStyle = 'none';
					break;
			    }
	        }   
			table.rows[r].style.display = displayStyle;
		}
   		// callback
		tableFiltered();  
		
	}
};
/*
 * EditableGrid_charts.js
 * 
 * Copyright 2010 Webismymind SPRL
 *
 * This file is part of EditableGrid.
 * 
 * EditableGrid is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or 
 * any later version.
 * 
 * EditableGrid is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with EditableGrid. If not, see http://www.gnu.org/licenses.
 * 
 */

var EditableGrid_pending_charts = {};
var EditableGrid_check_lib = true;

function EditableGrid_loadChart(divId)
{
	var swf = findSWF(divId);
	if (swf && typeof swf.load == "function") swf.load(JSON.stringify(EditableGrid_pending_charts[divId]));
	else setTimeout("EditableGrid_loadChart('"+divId+"');", 100);
}

function EditableGrid_get_chart_data(divId) 
{
	setTimeout("EditableGrid_loadChart('"+divId+"');", 100);
	return JSON.stringify(EditableGrid_pending_charts[divId]);
}

var smartColors1 = ["#dc243c","#4040f6","#00f629","#efe100","#f93fb1","#6f8183","#111111"];
var smartColors2 = ["#FF0000","#00FF00","#0000FF","#FFD700","#FF00FF","#00FFFF","#800080"];

EditableGrid.prototype.checkChartLib = function()
{
	EditableGrid_check_lib = false;
	if (typeof JSON.stringify == 'undefined') { alert('This method needs the JSON javascript library'); return false; }
	else if (typeof findSWF == 'undefined') { alert('This method needs the open flash chart javascript library (findSWF)'); return false; }
	else if (typeof ofc_chart == 'undefined') { alert('This method needs the open flash chart javascript library (ofc_chart)'); return false; }
	else if (typeof swfobject == 'undefined') { alert('This method needs the swfobject javascript library'); return false; }
	else return true;
};

/**
 * renderBarChart
 * Render open flash bar chart for the data contained in the table model
 * @param divId
 * @return
 */
EditableGrid.prototype.renderBarChart = function(divId, title, labelColumnIndexOrName, legend, bgColor, alpha)
{
	with (this) {

		if (EditableGrid_check_lib && !checkChartLib()) return false;

		if (typeof bgColor == 'undefined') bgColor = "#ffffff";
		if (typeof alpha == 'undefined') alpha = 0.9;

		labelColumnIndexOrName = labelColumnIndexOrName || 0;
		var cLabel = getColumnIndex(labelColumnIndexOrName);

		var chart = new ofc_chart();
		chart.bg_colour = bgColor;
		chart.set_title({text: title || '', style: "{font-size: 20px; color:#0000ff; font-family: Verdana; text-align: center;}"});
	
		var columnCount = getColumnCount();
		var rowCount = getRowCount();
	
		var maxvalue = 0;
		for (var c = 0; c < columnCount; c++) {
			if (!isColumnBar(c)) continue;
			var bar = new ofc_element("bar_3d");
			bar.alpha = alpha;
			bar.colour = smartColors1[chart.elements.length % smartColors1.length];
			bar.fill = "transparent";
			bar.text = getColumnLabel(c);
			for (var r = 0; r < rowCount - (ignoreLastRow ? 1 : 0); r++) {
				var value = getValueAt(r,c);
				if (value > maxvalue) maxvalue = value; 
				bar.values.push(value);
			}
			chart.add_element(bar);
		}
		
		// round the y max value
		var ymax = 10;
		while (ymax < maxvalue) ymax *= 10;
		var dec_step = ymax / 10;
		while (ymax - dec_step > maxvalue) ymax -= dec_step;
		
		var xLabels = [];
		for (var r = 0; r < rowCount - (ignoreLastRow ? 1 : 0); r++) xLabels.push(getValueAt(r,cLabel));
	
		chart.x_axis = {
		    stroke: 1,
		    tick_height:  10,
			colour: "#E2E2E2",
			"grid-colour": "#E2E2E2",
		    labels: { labels: xLabels },
		    "3d": 5
		};

		chart.y_axis = {
			 stroke: 4,
			 tick_length: 3,
			 colour: "#428BC7",
			 "grid-colour": "#E2E2E2",
			 offset: 0,
			 steps: ymax / 10.0,
			 max: ymax
		};
			
		// chart.num_decimals = 0;
		
		chart.x_legend = {
			text: legend || getColumnLabel(labelColumnIndexOrName),
			style: "{font-size: 11px; color: #000033}"
		};

		chart.y_legend = {
			text: "",
			style: "{font-size: 11px; color: #000033}"
		};

		updateChart(divId, chart);
	}
};

/**
 * renderPieChart
 * @param columnIndexOrName
 * @param divId
 * @return
 */
EditableGrid.prototype.renderPieChart = function(divId, title, valueColumnIndexOrName, labelColumnIndexOrName, startAngle, bgColor, alpha, gradientFill) 
{
	with (this) {

		if (EditableGrid_check_lib && !checkChartLib()) return false;

		if (typeof gradientFill == 'undefined') gradientFill = true;
		if (typeof bgColor == 'undefined') bgColor = "#ffffff";
		if (typeof alpha == 'undefined') alpha = 0.5;

		var type = getColumnType(valueColumnIndexOrName);
		if (type != "double" && type != "integer") return;

		labelColumnIndexOrName = labelColumnIndexOrName || 0;
		title = (typeof title == 'undefined' || title === null) ? getColumnLabel(valueColumnIndexOrName) : title;
		
		var cValue = getColumnIndex(valueColumnIndexOrName);
		var cLabel = getColumnIndex(labelColumnIndexOrName);
		
		var chart = new ofc_chart();
		chart.bg_colour = bgColor;
		chart.set_title({text: title, style: "{font-size: 20px; color:#0000ff; font-family: Verdana; text-align: center;}"});
	
		var rowCount = getRowCount();
	
		var pie = new ofc_element("pie");
		pie.colours = smartColors2;
		pie.alpha = alpha;
		pie['gradient-fill'] = gradientFill;
		
		if (typeof startAngle != 'undefined') pie['start-angle'] = startAngle;

		var total = 0; 
		for (var r = 0; r < rowCount - (ignoreLastRow ? 1 : 0); r++) {
			var rowValue = getValueAt(r,cValue);
			total += isNaN(rowValue) ? 0 : rowValue;
		}
		
		for (var r = 0; r < rowCount - (ignoreLastRow ? 1 : 0); r++) {
			var value = getValueAt(r,cValue);
			var label = getValueAt(r,cLabel);
			if (!isNaN(value)) pie.values.push({value : value, label: label + ' (' + (100 * (value / total)).toFixed(1) + '%)'});
		}
		chart.add_element(pie);
		
		if (pie.values.length > 0) updateChart(divId, chart);
		return pie.values.length;
	}
};

/**
 * updateChart
 * @param divId
 * @param chart
 * @return
 */
EditableGrid.prototype.updateChart = function(divId, chart) 
{
	if (typeof this.ofcSwf == 'undefined' || !this.ofcSwf) {

		// detect openflashchart swf location
		this.ofcSwf = 'open-flash-chart.swf'; // defaults to current directory
		var e = document.getElementsByTagName('script');
		for (var i = 0; i < e.length; i++) {
			var index = e[i].src.indexOf('openflashchart');
			if (index != -1) {
				this.ofcSwf = e[i].src.substr(0, index + 15) + this.ofcSwf;
				break;
			}
		};
	}
	
	with (this) {

		// reload or create new swf chart
		var swf = findSWF(divId);
		if (swf && typeof swf.load == "function") swf.load(JSON.stringify(chart));
		else {
			var div = _$(divId);
			EditableGrid_pending_charts[divId] = chart;
			
			// get chart dimensions
			var w = parseInt(getStyle(div, 'width'));
			var h = parseInt(getStyle(div, 'height'));
			w = Math.max(isNaN(w)?0:w, div.offsetWidth);
			h = Math.max(isNaN(h)?0:h, div.offsetHeight);
			
			swfobject.embedSWF(this.ofcSwf, 
					divId, 
					"" + (w || 500), 
					"" + (h || 200), 
					"9.0.0", "expressInstall.swf", { "get-data": "EditableGrid_get_chart_data", "id": divId }, null, 
					{ wmode: "Opaque", salign: "l", AllowScriptAccess:"always"}
			);
		}
		
		chartRendered();
	}
};

/**
 * clearChart
 * @param divId
 * @return
 */
EditableGrid.prototype.clearChart = function(divId) 
{
	// how ?
};/*
 * EditableGrid_editors.js
 * 
 * Copyright 2010 Webismymind SPRL
 *
 * This file is part of EditableGrid.
 * 
 * EditableGrid is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or 
 * any later version.
 * 
 * EditableGrid is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with EditableGrid. If not, see http://www.gnu.org/licenses.
 * 
 */

/**
 * Abstract cell editor
 * @constructor
 * @class Base class for all cell editors
 */

function CellEditor(config) { this.init(config); }

CellEditor.prototype.init = function(config) 
{
	// override default properties with the ones given
	if (config) for (var p in config) this[p] = config[p];
};

CellEditor.prototype.edit = function(rowIndex, columnIndex, element, value) 
{
	// tag element and remember all the things we need to apply/cancel edition
	element.setAttribute('isEditing','true');
	
	// call the specialized getEditor method
	var editorInput = this.getEditor(element, value);
	this.editorInput=editorInput;
	if (!editorInput) return false;
	
	var _this=this;
	
	// listen to pressed keys
	// - tab does not work with onkeyup (it's too late)
	// - on Safari escape does not work with onkeypress
	// - with onkeydown everything is fine (but don't forget to return false)
	var keydownListener = function(event) {

		event = event || window.event;
		
		// ENTER or TAB: apply value
		if (event.keyCode == 13 || event.keyCode == 9) {
			if(blurListener) editorInput.removeEventListener('blur',blurListener,false);
			editorInput.removeEventListener('keydown',keydownListener,false);
			_this.applyEditing(element, _this.getEditorValue(editorInput));
			event.preventDefault();
		}
		
		// ESC: cancel editing
		if (event.keyCode == 27) { 
			if(blurListener) editorInput.removeEventListener('blur',blurListener,false);
			editorInput.removeEventListener('keydown',keydownListener,false);
			_this.cancelEditing(element); 
			event.preventDefault();
		}
	};
	editorInput.addEventListener('keydown',keydownListener,false);

	// if simultaneous edition is not allowed, we cancel edition when focus is lost
	var blurListener = null;
	
	if (!this.editablegrid.allowSimultaneousEdition) {
		if (this.editablegrid.saveOnBlur) {
			blurListener=function(event) {
				editorInput.removeEventListener('blur',blurListener,false);
				_this.applyEditing(element, _this.getEditorValue(editorInput));
			}
		}else{
			blurListener=function(event) {
				editorInput.removeEventListener('blur',blurListener,false);
				_this.cancelEditing(element);
			}
		}
		editorInput.addEventListener('blur',blurListener,false);
	}
	this.blurListener=blurListener;

	// display the resulting editor widget
	this.displayEditor(element, editorInput);
	
	// give focus to the created editor
	editorInput.focus();
};

CellEditor.prototype.getEditor = function(element, value) {
	return null;
};

CellEditor.prototype.getEditorValue = function(editorInput) {
	return editorInput.value;
};

CellEditor.prototype.formatValue = function(value) {
	return value;
};

CellEditor.prototype.displayEditor = function(element, editorInput) 
{
	// use same font in input as in cell content
	editorInput.style.fontFamily = this.editablegrid.getStyle(element, "fontFamily", "font-family"); 
	editorInput.style.fontSize = this.editablegrid.getStyle(element, "fontSize", "font-size"); 
	
	// static mode: add input field in the table cell
	if (this.editablegrid.editmode == "static") {
		while (element.hasChildNodes()) element.removeChild(element.firstChild);
		element.appendChild(editorInput);
	}
	
	// absolute mode: add input field in absolute position over table cell, leaving current content
	if (this.editablegrid.editmode == "absolute") {
		element.appendChild(editorInput);
		editorInput.style.position = "absolute";

		// position editor input on the cell with the same padding as the actual cell content
		var paddingLeft = parseInt(this.editablegrid.getStyle(element, "paddingLeft", "padding-left"));
		var paddingTop = parseInt(this.editablegrid.getStyle(element, "paddingTop", "padding-top"));
		if (isNaN(paddingLeft)) paddingLeft = 0; else paddingLeft = Math.max(0, paddingLeft - 3);
		if (isNaN(paddingTop)) paddingTop = 0; else paddingTop = Math.max(0, paddingTop - 3);
		
		var offsetScrollX = this.editablegrid.table.parentNode ? parseInt(this.editablegrid.table.parentNode.scrollLeft) : 0;
		var offsetScrollY = this.editablegrid.table.parentNode ? parseInt(this.editablegrid.table.parentNode.scrollTop) : 0;
		
		editorInput.style.left = (this.editablegrid.getCellX(element) - offsetScrollX + paddingLeft) + "px";
		editorInput.style.top = (this.editablegrid.getCellY(element) - offsetScrollY + paddingTop) + "px";

		// if number type: align field and its content to the right
		if (this.column.datatype == 'integer' || this.column.datatype == 'double') {
			var rightPadding = this.editablegrid.getCellX(element) - offsetScrollX + element.offsetWidth - (parseInt(editorInput.style.left) + editorInput.offsetWidth);
			editorInput.style.left = (parseInt(editorInput.style.left) + rightPadding) + "px";
			editorInput.style.textAlign = "right";
		}
	}

	// fixed mode: don't show input field in the cell 
	if (this.editablegrid.editmode == "fixed") {
		var editorzone = _$(this.editablegrid.editorzoneid);
		while (editorzone.hasChildNodes()) editorzone.removeChild(editorzone.firstChild);
		editorzone.appendChild(editorInput);
	}
};

CellEditor.prototype._clearEditor = function(element) 
{
	// untag element
	element.removeAttribute('isEditing');

	// clear fixed editor zone if any
	if (this.editablegrid.editmode == "fixed") {
		var editorzone = _$(this.editablegrid.editorzoneid);
		while (editorzone.hasChildNodes()) editorzone.removeChild(editorzone.firstChild);
	}	
};

CellEditor.prototype.cancelEditing = function(element) 
{
	with (this) {
		
		// check that the element is still being edited (otherwise onblur will be called on textfields that have been closed when we go to another tab in Firefox) 
		if (element && element.hasAttribute('isEditing')) {

			// render value before editon
			var renderer = this == column.headerEditor ? column.headerRenderer : column.cellRenderer;
			var rowIndex=element.parentNode.rowIndex - this.editableGrid.nbHeaderRows;
			var columnIndex=element.cellIndex;
			renderer._render(rowIndex, columnIndex, element, editablegrid.getValueAt(rowIndex, columnIndex));
		
			_clearEditor(element);
		}
	}
};

CellEditor.prototype.applyEditing = function(element, newValue) 
{
	with (this) {

		// check that the element is still being edited (otherwise onblur will be called on textfields that have been closed when we go to another tab in Firefox) 
		if (element && element.hasAttribute('isEditing')) {

			// do nothing if the value is rejected by at least one validator
			if (!column.isValid(newValue)) return false;

			// format the value before applying
			var formattedValue = formatValue(newValue);

			var rowIndex=element.parentNode.rowIndex - this.editablegrid.nbHeaderRows;
			var columnIndex=element.cellIndex;
			
			// update model and render cell (keeping previous value)
			var previousValue = editablegrid.setValueAt(rowIndex, columnIndex, formattedValue);

			// if the new value is different than the previous one, let the user handle the model change
			var newValue = editablegrid.getValueAt(rowIndex, columnIndex);
			if (!this.editablegrid.isSame(newValue, previousValue)) {
				editablegrid.modelChanged(rowIndex, columnIndex, previousValue, newValue, editablegrid.getRow(rowIndex));
			}
		
			_clearEditor(element);	
		}
	}
};

/**
 * Text cell editor
 * @constructor
 * @class Class to edit a cell with an HTML text input 
 */

function TextCellEditor(size, maxlen, config) { this.fieldSize = size || -1; this.maxLength = maxlen || 1024; if (config) this.init(config); };
TextCellEditor.prototype = new CellEditor();

TextCellEditor.prototype.editorValue = function(value) {
	return value;
};

TextCellEditor.prototype.updateStyle = function(htmlInput)
{
	// change style for invalid values
	if (this.column.isValid(this.getEditorValue(htmlInput))) this.editablegrid.removeClassName(htmlInput, this.editablegrid.invalidClassName);
	else this.editablegrid.addClassName(htmlInput, this.editablegrid.invalidClassName);
};

TextCellEditor.prototype.getEditor = function(element, value)
{
	// create and initialize text field
	var htmlInput = document.createElement("input"); 
	htmlInput.setAttribute("type", "text");
	if (this.maxLength > 0) htmlInput.setAttribute("maxlength", this.maxLength);
	if (this.fieldSize > 0) htmlInput.setAttribute("size", this.fieldSize);
	else htmlInput.style.width = this.editablegrid.autoWidth(element) + 'px'; // auto-adapt width to cell, if no length specified 
	var autoHeight = this.editablegrid.autoHeight(element);
	if (this.editablegrid.Browser.Gecko) autoHeight -= 2; // Firefox: input higher then given size in px!
	htmlInput.style.height = autoHeight + 'px'; // auto-adapt height to cell
	htmlInput.value = this.editorValue(value);

	// listen to keyup to check validity and update style of input field 
	var _this=this;
	this.keyUpListener=function(event) {
		_this.updateStyle(this);
	};
	htmlInput.addEventListener('keyup',this.keyUpListener,false);
	
	this.htmlInput=htmlInput;
	return htmlInput; 
};

TextCellEditor.prototype.displayEditor = function(element, htmlInput) 
{
	// call base method
	CellEditor.prototype.displayEditor.call(this, element, htmlInput);

	// update style of input field
	this.updateStyle(htmlInput);
	
	// select text
	htmlInput.select();
};

TextCellEditor.prototype._cancelEditing=TextCellEditor.prototype.cancelEditing;
TextCellEditor.prototype._applyEditing=TextCellEditor.prototype.applyEditing;

TextCellEditor.prototype.cancelEditing = function() {
	this.htmlInput.removeEventListener('keyup',this.keyUpListener,false);
	this._cancelEditing.apply(this,arguments);
};

TextCellEditor.prototype.applyEditing = function() {
	this.htmlInput.removeEventListener('keyup',this.keyUpListener,false);
	this._applyEditing.apply(this,arguments);
};

/**
 * Number cell editor
 * @constructor
 * @class Class to edit a numeric cell with an HTML text input 
 */

function NumberCellEditor(type) { this.type = type; }
NumberCellEditor.prototype = new TextCellEditor(-1, 32);

NumberCellEditor.prototype.editorValue = function(value) {
	return isNaN(value) ? "" : value;
};

NumberCellEditor.prototype.formatValue = function(value)
{
	return this.type == 'integer' ? parseInt(value) : parseFloat(value);
};

/**
 * Select cell editor
 * @constructor
 * @class Class to edit a cell with an HTML select input 
 */

function SelectCellEditor() { this.minWidth = 100; this.minHeight = 22; this.adaptHeight = true; this.adaptWidth = true;}
SelectCellEditor.prototype = new CellEditor();

SelectCellEditor.prototype.getEditor = function(element, value)
{
	// create select list
	var htmlInput = document.createElement("select");

	// auto adapt dimensions to cell, with a min width
	if (this.adaptWidth) htmlInput.style.width = Math.max(this.minWidth, this.editablegrid.autoWidth(element)) + 'px'; 
	if (this.adaptHeight) htmlInput.style.height = Math.max(this.minHeight, this.editablegrid.autoHeight(element)) + 'px';

	// get column option values for this row 
	var optionValues = this.column.getOptionValuesForEdit(element.parentNode.rowIndex - this.editablegrid.nbHeaderRows);
	
	// add these options, selecting the current one
	var index = 0, valueFound = false;
	for (var optionValue in optionValues) {
	    var option = document.createElement('option');
	    option.text = optionValues[optionValue];
	    option.value = optionValue;
	    // add does not work as expected in IE7 (cf. second arg)
		try { htmlInput.add(option, null); } catch (e) { htmlInput.add(option); } 
        if (optionValue == value) { htmlInput.selectedIndex = index; valueFound = true; }
        index++;
	}
	
	// if the current value is not in the list add it to the front
	if (!valueFound) {
	    var option = document.createElement('option');
	    option.text = value ? value : "";
	    option.value = value ? value : "";
	    // add does not work as expected in IE7 (cf. second arg)
		try { htmlInput.add(option, htmlInput.options[0]); } catch (e) { htmlInput.add(option); } 
		htmlInput.selectedIndex = 0;
	}
	                  
	// when a new value is selected we apply it
	var _this=this;
	this.changeListener=function(event) {
		_this.editorInput.removeEventListener('blur',_this.blurListener,false);
		_this.applyEditing(element, this.value);
	};
	htmlInput.addEventListener('change',this.changeListener,false);
	
	this.htmlInput=htmlInput;
	return htmlInput; 
};

SelectCellEditor.prototype._cancelEditing=SelectCellEditor.prototype.cancelEditing;
SelectCellEditor.prototype._applyEditing=SelectCellEditor.prototype.applyEditing;

SelectCellEditor.prototype.cancelEditing = function() {
	this.htmlInput.removeEventListener('change',this.changeListener,false);
	this._cancelEditing.apply(this,arguments);
};

SelectCellEditor.prototype.applyEditing = function() {
	this.htmlInput.removeEventListener('change',this.changeListener,false);
	this._applyEditing.apply(this,arguments);
};
/*
 * EditableGrid_renderers.js
 * 
 * Copyright 2010 Webismymind SPRL
 *
 * This file is part of EditableGrid.
 * 
 * EditableGrid is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or 
 * any later version.
 * 
 * EditableGrid is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with EditableGrid. If not, see http://www.gnu.org/licenses.
 * 
 */

/**
 * Abstract cell renderer
 * @constructor
 * @class Base class for all cell renderers
 * @param {Object} config
 */

function CellRenderer(config) { this.init(config); }

CellRenderer.prototype.init = function(config) 
{
	// override default properties with the ones given
	for (var p in config) this[p] = config[p];
};

CellRenderer.prototype._render = function(rowIndex, columnIndex, element, value) 
{
	// remove existing content	
	while (element.hasChildNodes()) element.removeChild(element.firstChild);

	// always apply the number style to numerical cells and column headers
	if (this.column.isNumerical()) EditableGrid.prototype.addClassName(element, "number");

	// call the specialized render method
	return this.render(element, typeof value == 'string' ? htmlspecialchars(value, 'ENT_NOQUOTES').replace(/\s\s/g, '&nbsp; ') : value);
};

CellRenderer.prototype.render = function(element, value) 
{
	element.innerHTML = value ? value : "";
};

/**
 * Enum cell renderer
 * @constructor
 * @class Class to render a cell with enum values
 */

function EnumCellRenderer(config) { this.init(config); }
EnumCellRenderer.prototype = new CellRenderer();
EnumCellRenderer.prototype.render = function(element, value)
{
	var optionValues = this.column.getOptionValuesForRender(element.parentNode.rowIndex - this.editablegrid.nbHeaderRows);
	element.innerHTML = (typeof value != 'undefined' ? (value in optionValues ? optionValues[value] : value) : "");
};

/**
 * Number cell renderer
 * @constructor
 * @class Class to render a cell with numerical values
 */

function NumberCellRenderer(config) { this.init(config); }
NumberCellRenderer.prototype = new CellRenderer();
NumberCellRenderer.prototype.render = function(element, value)
{
	var column = this.column || {}; // in case somebody calls new NumberCellRenderer().render(..)

	var isNAN = typeof value == 'number' && isNaN(value);
	var displayValue = isNAN ? (column.nansymbol || "") : value;
	if (typeof displayValue == 'number') {
		if (column.precision !== null) displayValue = displayValue.toFixed(column.precision);
		if (column.unit !== null) displayValue += ' ' + column.unit;
	}
	
	element.innerHTML = displayValue;
	element.style.fontWeight = isNAN ? "normal" : "";
};

/**
 * Checkbox cell renderer
 * @constructor
 * @class Class to render a cell with an HTML checkbox
 */

function CheckboxCellRenderer(config) { this.init(config); }
CheckboxCellRenderer.prototype = new CellRenderer();

CheckboxCellRenderer.prototype._render = function(rowIndex, columnIndex, element, value) 
{
	// if a checkbox already exists keep it, otherwise clear current content
	if (element.firstChild && (typeof element.firstChild.getAttribute != "function" || element.firstChild.getAttribute("type") != "checkbox"))
		while (element.hasChildNodes()) element.removeChild(element.firstChild);

	// call the specialized render method
	return this.render(element, value);
};

CheckboxCellRenderer.prototype.render = function(element, value)
{
	// convert value to boolean just in case
	value = (value && value != 0 && value != "false") ? true : false;

	// if check box already created, just update its state
	if (element.firstChild) { element.firstChild.checked = value; return; }
	
	// create and initialize checkbox
	var htmlInput = document.createElement("input"); 
	htmlInput.setAttribute("type", "checkbox");

	// this renderer is a little special because it allows direct edition
	var cellEditor = new CellEditor();
	cellEditor.editablegrid = this.editablegrid;
	cellEditor.column = this.column;
	var _this=this;
	var clickListener=function(event) { 
		// in case it has changed due to sorting or remove
		element.setAttribute('isEditing','true');
		cellEditor.applyEditing(element, htmlInput.checked ? true : false); 
	};
	htmlInput.addEventListener('click',clickListener,false);
	
	element.appendChild(htmlInput);
	htmlInput.checked = value;
	htmlInput.disabled = (!this.column.editable || !this.editablegrid.isEditable(element.parentNode.rowIndex - this.editablegrid.nbHeaderRows, element.cellIndex));

	element.className = "boolean";
};

/**
 * Email cell renderer
 * @constructor
 * @class Class to render a cell with emails
 */

function EmailCellRenderer(config) { this.init(config); }
EmailCellRenderer.prototype = new CellRenderer();
EmailCellRenderer.prototype.render = function(element, value)
{
	element.innerHTML = value ? "<a href='mailto:" + value + "'>" + value + "</a>" : "";
};

/**
 * Website cell renderer
 * @constructor
 * @class Class to render a cell with websites
 */

function WebsiteCellRenderer(config) { this.init(config); }
WebsiteCellRenderer.prototype = new CellRenderer();
WebsiteCellRenderer.prototype.render = function(element, value)
{
	element.innerHTML = value ? "<a href='" + (value.indexOf("//") == -1 ? "http://" + value : value) + "'>" + value + "</a>" : "";
};

/**
 * Date cell renderer
 * @constructor
 * @class Class to render a cell containing a date
 */

function DateCellRenderer(config) { this.init(config); }
DateCellRenderer.prototype = new CellRenderer;

DateCellRenderer.prototype.render = function(cell, value) 
{
	var date = this.editablegrid.checkDate(value);
	if (typeof date == "object") cell.innerHTML = date.formattedDate;
	else cell.innerHTML = value;
};

/**
 * Sort header renderer
 * @constructor
 * @class Class to add sorting functionalities to headers
 */

function SortHeaderRenderer(columnName, cellRenderer) { this.columnName = columnName; this.cellRenderer = cellRenderer; };
SortHeaderRenderer.prototype = new CellRenderer();
SortHeaderRenderer.prototype.render = function(cell, value) 
{
	if (!value) { if (this.cellRenderer) this.cellRenderer.render(cell, value); }
	else {
						
		// create a link that will sort (alternatively ascending/descending)
		var link = document.createElement("a");
		cell.appendChild(link);
		link.style.cursor = "pointer";
		link.innerHTML = value;
		var _this=this;
		var clickListener=function() {
			with (_this.editablegrid) {

				var cols = tHead.rows[0].cells;
				var clearPrevious = -1;
				
				if (sortedColumnName != _this.columnName) {
					clearPrevious = sortedColumnName;
					sortedColumnName = _this.columnName;
					sortDescending = false;
				}
				else {
					if (!sortDescending) sortDescending = true;
					else { 					
						clearPrevious = sortedColumnName;
						sortedColumnName = -1; 
						sortDescending = false; 
					}
				} 
				
				// render header for previous sort column
				var j = getColumnIndex(clearPrevious);
				if (j >= 0) columns[j].headerRenderer._render(-1, j, cols[j], columns[j].label);

				sort(sortedColumnName, sortDescending);

				// render header for new sort column
				var j = getColumnIndex(sortedColumnName);
				if (j >= 0) columns[j].headerRenderer._render(-1, j, cols[j], columns[j].label);
			}
		};
		link.addEventListener('click',clickListener,false);

		// add an arrow to indicate if sort is ascending or descending
		if (this.editablegrid.sortedColumnName == this.columnName) {
			cell.appendChild(document.createTextNode("\u00a0"));
			cell.appendChild(this.editablegrid.sortDescending ? this.editablegrid.sortDownImage: this.editablegrid.sortUpImage);
		}

		// call user renderer if any
		if (this.cellRenderer) this.cellRenderer.render(cell, value);
	}
};
/*
 * EditableGrid_utils.js
 * 
 * Copyright 2010 Webismymind SPRL
 *
 * This file is part of EditableGrid.
 * 
 * EditableGrid is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or 
 * any later version.
 * 
 * EditableGrid is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with EditableGrid. If not, see http://www.gnu.org/licenses.
 * 
 */

EditableGrid.prototype.unsort = function(a,b) 
{
	aa = isNaN(a[3]) ? 0 : parseFloat(a[3]);
	bb = isNaN(b[3]) ? 0 : parseFloat(b[3]);
	return aa-bb;
};

EditableGrid.prototype.sort_numeric = function(a,b) 
{
	aa = isNaN(a[0]) ? 0 : parseFloat(a[0]);
	bb = isNaN(b[0]) ? 0 : parseFloat(b[0]);
	return aa-bb;
};

EditableGrid.prototype.sort_boolean = function(a,b) 
{
	aa = !a[0] || a[0] == "false" ? 0 : 1;
	bb = !b[0] || b[0] == "false" ? 0 : 1;
	return aa-bb;
};

EditableGrid.prototype.sort_alpha = function(a,b) 
{
	if (a[0]==b[0]) return 0;
	if (a[0]<b[0]) return -1;
	return 1;
};

EditableGrid.prototype.sort_date = function(a,b) 
{
	date = EditableGrid.prototype.checkDate(a[0]);
	aa = typeof date == "object" ? date.sortDate : 0;
	date = EditableGrid.prototype.checkDate(b[0]);
	bb = typeof date == "object" ? date.sortDate : 0;
	return aa-bb;
};

/**
 * Returns computed style property for element
 * @private
 */
EditableGrid.prototype.getStyle = function(element, stylePropCamelStyle, stylePropCSSStyle)
{
	stylePropCSSStyle = stylePropCSSStyle || stylePropCamelStyle;
	if (element.currentStyle) return element.currentStyle[stylePropCamelStyle];
	else if (window.getComputedStyle) return document.defaultView.getComputedStyle(element,null).getPropertyValue(stylePropCSSStyle);
	return element.style[stylePropCamelStyle];
};

/**
 * Returns true if the element has a static positioning
 * @private
 */
EditableGrid.prototype.isStatic = function (element) 
{
	var position = this.getStyle(element, 'position');
	return (!position || position == "static");
};

/**
 * Returns auto width for editor
 * @private
 */
EditableGrid.prototype.autoWidth = function (element) 
{
	var paddingLeft = parseInt(this.getStyle(element, "paddingLeft", "padding-left"));
	var paddingRight = parseInt(this.getStyle(element, "paddingRight", "padding-right"));
	var borderLeft = parseInt(this.getStyle(element, "borderLeftWidth", "border-left-width"));
	var borderRight = parseInt(this.getStyle(element, "borderRightWidth", "border-right-width"));

	paddingLeft = isNaN(paddingLeft) ? 0 : paddingLeft;
	paddingRight = isNaN(paddingRight) ? 0 : paddingRight;
	borderLeft = isNaN(borderLeft) ? 0 : borderLeft;
	borderRight = isNaN(borderRight) ? 0 : borderRight;
	
	if (this.Browser.Gecko) paddingLeft += 3; // Firefox: input larger then given size in px!
	return element.offsetWidth - paddingLeft - paddingRight - borderLeft - borderRight;
};

/**
 * Returns auto height for editor
 * @private
 */
EditableGrid.prototype.autoHeight = function (element) 
{
	var paddingTop = parseInt(this.getStyle(element, "paddingTop", "padding-top"));
	var paddingBottom = parseInt(this.getStyle(element, "paddingBottom", "padding-bottom"));
	var borderTop = parseInt(this.getStyle(element, "borderTopWidth", "border-top-width"));
	var borderBottom = parseInt(this.getStyle(element, "borderBottomWidth", "border-bottom-width"));
	
	paddingTop = isNaN(paddingTop) ? 0 : paddingTop;
	paddingBottom = isNaN(paddingBottom) ? 0 : paddingBottom;
	borderTop = isNaN(borderTop) ? 0 : borderTop;
	borderBottom = isNaN(borderBottom) ? 0 : borderBottom;

	return element.offsetHeight - paddingTop - paddingBottom - borderTop - borderBottom;
};

/**
 * Detects the directory when the js sources can be found
 * @private
 */
EditableGrid.prototype.detectDir = function() 
{
	var base = location.href;
	var e = document.getElementsByTagName('base');
	for (var i=0; i<e.length; i++) if(e[i].href) base = e[i].href;

	var e = document.getElementsByTagName('script');
	for (var i=0; i<e.length; i++) {
		if (e[i].src && /(^|\/)editablegrid.*\.js([?#].*)?$/i.test(e[i].src)) {
			var src = new URI(e[i].src);
			var srcAbs = src.toAbsolute(base);
			srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
			delete srcAbs.query;
			delete srcAbs.fragment;
			return srcAbs.toString();
		}
	}
	
	return false;
};

/**
 * Detect is 2 values are exactly the same (type and value). Numeric NaN are considered the same.
 * @param v1
 * @param v2
 * @return boolean
 */
EditableGrid.prototype.isSame = function(v1, v2) 
{ 
	if (v1 === v2) return true;
	if (typeof v1 == 'number' && isNaN(v1) && typeof v2 == 'number' && isNaN(v2)) return true;
	return false;
};

/**
 * class name manipulation
 * @private
 */
EditableGrid.prototype.strip = function(str) { return str.replace(/^\s+/, '').replace(/\s+$/, ''); };
EditableGrid.prototype.hasClassName = function(element, className) { return (element.className.length > 0 && (element.className == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(element.className))); };
EditableGrid.prototype.addClassName = function(element, className) { if (!this.hasClassName(element, className)) element.className += (element.className ? ' ' : '') + className; };
EditableGrid.prototype.removeClassName = function(element, className) { element.className = this.strip(element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ')); };

/**
 * Useful string methods 
 * @private
 */
String.prototype.trim = function() { return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")); };
String.prototype.startsWith = function(str) { return (this.match("^"+str)==str); };
String.prototype.endsWith = function(str) { return (this.match(str+"$")==str); };
	
// Accepted formats: (for EU just switch month and day)
//
// mm-dd-yyyy
// mm/dd/yyyy
// mm.dd.yyyy
// mm dd yyyy
// mmm dd yyyy
// mmddyyyy
//
// m-d-yyyy
// m/d/yyyy
// m.d.yyyy,
// m d yyyy
// mmm d yyyy
//
// // m-d-yy
// // m/d/yy
// // m.d.yy
// // m d yy,
// // mmm d yy (yy is 20yy) 

/**
 * Checks validity of a date string 
 * @private
 */
EditableGrid.prototype.checkDate = function(strDate, strDatestyle) 
{
	strDatestyle = strDatestyle || "EU";
	var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intday;
	var intMonth;
	var intYear;
	var booFound = false;
	var strSeparatorArray = new Array("-"," ","/",".");
	var intElementNr;
	var err = 0;
	var strMonthArray = new Array(12);
	
	strMonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	if (!strDate || strDate.length < 1) return 0;

	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
			strDateArray = strDate.split(strSeparatorArray[intElementNr]);
			if (strDateArray.length != 3) return 1;
			else {
				strDay = strDateArray[0];
				strMonth = strDateArray[1];
				strYear = strDateArray[2];
			}
			booFound = true;
		}
	}
	
	if (booFound == false) {
		if (strDate.length <= 5) return 1;
		strDay = strDate.substr(0, 2);
		strMonth = strDate.substr(2, 2);
		strYear = strDate.substr(4);
	}

	// if (strYear.length == 2) strYear = '20' + strYear;

	// US style
	if (strDatestyle == "US") {
		strTemp = strDay;
		strDay = strMonth;
		strMonth = strTemp;
	}
	
	// get and check day
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) return 2;

	// get and check month
	intMonth = parseInt(strMonth, 10);
	if (isNaN(intMonth)) {
		for (i = 0;i<12;i++) {
			if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
				intMonth = i+1;
				strMonth = strMonthArray[i];
				i = 12;
			}
		}
		if (isNaN(intMonth)) return 3;
	}
	if (intMonth>12 || intMonth<1) return 5;

	// get and check year
	intYear = parseInt(strYear, 10);
	if (isNaN(intYear)) return 4;
	if (intYear < 1900 || intYear > 2100) return 11;
	
	// check day in month
	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) return 6;
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) return 7;
	if (intMonth == 2) {
		if (intday < 1) return 8;
		if (LeapYear(intYear) == true) { if (intday > 29) return 9; }
		else if (intday > 28) return 10;
	}

	// return formatted date
	return { 
		formattedDate: (strDatestyle == "US" ? strMonthArray[intMonth-1] + " " + intday+" " + strYear : intday + " " + strMonthArray[intMonth-1]/*.toLowerCase()*/ + " " + strYear),
		sortDate: Date.parse(intMonth + "/" + intday + "/" + intYear),
		dbDate: intYear + "-" + intMonth + "-" + intday 
	};
};

function LeapYear(intYear) 
{
	if (intYear % 100 == 0) { if (intYear % 400 == 0) return true; }
	else if ((intYear % 4) == 0) return true;
	return false;
}

// See RFC3986
URI = function(uri) 
{ 
	this.scheme = null;
	this.authority = null;
	this.path = '';
	this.query = null;
	this.fragment = null;

	this.parse = function(uri) {
		var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
		this.scheme = m[3] ? m[2] : null;
		this.authority = m[5] ? m[6] : null;
		this.path = m[7];
		this.query = m[9] ? m[10] : null;
		this.fragment = m[12] ? m[13] : null;
		return this;
	};

	this.toString = function() {
		var result = '';
		if(this.scheme != null) result = result + this.scheme + ':';
		if(this.authority != null) result = result + '//' + this.authority;
		if(this.path != null) result = result + this.path;
		if(this.query != null) result = result + '?' + this.query;
		if(this.fragment != null) result = result + '#' + this.fragment;
		return result;
	};

	this.toAbsolute = function(base) {
		var base = new URI(base);
		var r = this;
		var t = new URI;

		if(base.scheme == null) return false;

		if(r.scheme != null && r.scheme.toLowerCase() == base.scheme.toLowerCase()) {
			r.scheme = null;
		}

		if(r.scheme != null) {
			t.scheme = r.scheme;
			t.authority = r.authority;
			t.path = removeDotSegments(r.path);
			t.query = r.query;
		} else {
			if(r.authority != null) {
				t.authority = r.authority;
				t.path = removeDotSegments(r.path);
				t.query = r.query;
			} else {
				if(r.path == '') {
					t.path = base.path;
					if(r.query != null) {
						t.query = r.query;
					} else {
						t.query = base.query;
					}
				} else {
					if(r.path.substr(0,1) == '/') {
						t.path = removeDotSegments(r.path);
					} else {
						if(base.authority != null && base.path == '') {
							t.path = '/'+r.path;
						} else {
							t.path = base.path.replace(/[^\/]+$/,'')+r.path;
						}
						t.path = removeDotSegments(t.path);
					}
					t.query = r.query;
				}
				t.authority = base.authority;
			}
			t.scheme = base.scheme;
		}
		t.fragment = r.fragment;

		return t;
	};

	function removeDotSegments(path) {
		var out = '';
		while(path) {
			if(path.substr(0,3)=='../' || path.substr(0,2)=='./') {
				path = path.replace(/^\.+/,'').substr(1);
			} else if(path.substr(0,3)=='/./' || path=='/.') {
				path = '/'+path.substr(3);
			} else if(path.substr(0,4)=='/../' || path=='/..') {
				path = '/'+path.substr(4);
				out = out.replace(/\/?[^\/]*$/, '');
			} else if(path=='.' || path=='..') {
				path = '';
			} else {
				var rm = path.match(/^\/?[^\/]*/)[0];
				path = path.substr(rm.length);
				out = out + rm;
			}
		}
		return out;
	}

	if(uri) {
		this.parse(uri);
	}
};

function get_html_translation_table (table, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    
    var entities = {}, hash_map = {}, decimal = 0, symbol = '';
    var constMappingTable = {}, constMappingQuoteStyle = {};
    var useTable = {}, useQuoteStyle = {};
    
    // Translate arguments
    constMappingTable[0]      = 'HTML_SPECIALCHARS';
    constMappingTable[1]      = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable       = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: "+useTable+' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        symbol = String.fromCharCode(decimal);
        hash_map[symbol] = entities[decimal];
    }
    
    return hash_map;
}

function htmlentities(string, quote_style) 
{
    var hash_map = {}, symbol = '', tmp_str = '';
    tmp_str = string.toString();
    if (false === (hash_map = get_html_translation_table('HTML_ENTITIES', quote_style))) return false;
    hash_map["'"] = '&#039;';
    for (symbol in hash_map) tmp_str = tmp_str.split(symbol).join(hash_map[symbol]);
    return tmp_str;
}

function htmlspecialchars(string, quote_style) 
{
    var hash_map = {}, symbol = '', tmp_str = '';
    tmp_str = string.toString();
    if (false === (hash_map = get_html_translation_table('HTML_SPECIALCHARS', quote_style))) return false;
    for (symbol in hash_map) tmp_str = tmp_str.split(symbol).join(hash_map[symbol]);
    return tmp_str;
}/*
 * EditableGrid_validators.js
 * 
 * Copyright 2010 Webismymind SPRL
 *
 * This file is part of EditableGrid.
 * 
 * EditableGrid is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or 
 * any later version.
 * 
 * EditableGrid is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with EditableGrid. If not, see http://www.gnu.org/licenses.
 * 
 */

/**
 * Abstract cell validator
 * @constructor
 * @class Base class for all cell validators
 */

function CellValidator(config) 
{
	// default properties
    var props = { isValid: null };

    // override default properties with the ones given
    for (var p in props) if (typeof config != 'undefined' && typeof config[p] != 'undefined') this[p] = config[p];
}

CellValidator.prototype.isValid = function(value) 
{
	return true;
};

/**
 * Number cell validator
 * @constructor
 * @class Class to validate a numeric cell
 */

function NumberCellValidator(type) { this.type = type; }
NumberCellValidator.prototype = new CellValidator;
NumberCellValidator.prototype.isValid = function(value) 
{
	// check that it is a valid number
	if (isNaN(value)) return false;
	
	// for integers check that it's not a float
	if (this.type == "integer" && value != "" && parseInt(value) != parseFloat(value)) return false;
	
	// the integer or double is valid
	return true;
};

/**
 * Email cell validator
 * @constructor
 * @class Class to validate a cell containing an email
 */

function EmailCellValidator() {}
EmailCellValidator.prototype = new CellValidator;
EmailCellValidator.prototype.isValid = function(value) { return value == "" || /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value); };

/**
 * Website cell validator
 * @constructor
 * @class Class to validate a cell containing a website
 */

function WebsiteCellValidator() {}
WebsiteCellValidator.prototype = new CellValidator;
WebsiteCellValidator.prototype.isValid = function(value) { return value == "" || (value.indexOf(".") > 0 && value.indexOf(".") < (value.length - 2)); };

/**
 * Date cell validator
 * @constructor
 * @augments CellValidator
 * @class Class to validate a cell containing a date
 */

function DateCellValidator(grid) { this.grid = grid; }
DateCellValidator.prototype = new CellValidator;

DateCellValidator.prototype.isValid = function(value) 
{
	return value == "" || typeof this.grid.checkDate(value) == "object";
};

/**
pref
*/

/**
base classes
*/

function draggable(dragButton,dragObj){
	let obj=this;
	this.dragBegin=function(e){
		let dragObj=obj.dragObj;
		if(isNaN(parseInt(dragObj.style.left))) dragObj.style.left='0px';
		if(isNaN(parseInt(dragObj.style.top))) dragObj.style.top='0px';
		let x=parseInt(dragObj.style.left);
		let y=parseInt(dragObj.style.top);
		obj.mouseX=e.clientX;
		obj.mouseY=e.clientY;
		window.addEventListener('mousemove',obj.drag,false);
		window.addEventListener('mouseup',obj.dragEnd,false);
		return false;
	};
	
	this.drag=function(e){
		let dragObj=obj.dragObj;
		let x=parseInt(dragObj.style.left);
		let y=parseInt(dragObj.style.top);
		dragObj.style.left=x+(e.clientX-obj.mouseX)+'px';
		dragObj.style.top=y+(e.clientY-obj.mouseY)+'px';
		obj.mouseX=e.clientX;
		obj.mouseY=e.clientY;
		return false;
	};
	
	this.dragEnd=function(){
		window.removeEventListener('mousemove',obj.drag,false);
		window.removeEventListener('mouseup',obj.dragEnd,false);
	};
	
	this.finalize=function(){
		this.dragButton.removeEventListener('mousedown',this.dragBegin,false);
	};
	
	dragButton.addEventListener('mousedown',this.dragBegin,false);
	
	//fields
	this.dragButton=dragButton;
	this.dragObj=dragObj;
	this.mouseX=0;
	this.mouseY=0;
}

/**
attaches draggable and exit functions to a pref modal dialog
*/

let prefModalObjs=[];

function prefModal(prefObj,titleBar,titleExitButton,exitButton,exitFunc){
	if(exitFunc==undefined) exitFunc=new Function();
	
	function _exitFunc(){
		exitFunc();
		dragObj.finalize();
		titleExitButton.removeEventListener('click',_exitFunc,false);
		exitButton.removeEventListener('click',_exitFunc,false);
		titleExitButton.removeEventListener('mousedown',titleNoDrag,false);
		if(prefModalObjs.length==1){
			window.removeEventListener('keypress',escapeKeyPress,false);
		}
		prefObj.style.display='none';
	}
	
	function titleNoDrag(e){
		//prevent dragging exit button
		e.preventDefault();
		//prevent dragging prefs using exit button
		e.stopPropagation();
	}
	
	function escapeKeyPress(e){
		//detect some event simulation which bubbles up to window
		if(e.target!=document.body) return;
		if(e.keyCode==27){
			//close current pref dialog only
			prefModalObjs[prefModalObjs.length-1].exit();
			prefModalObjs.pop();
		}
		e.stopPropagation();
	}
	
	titleExitButton.addEventListener('click',_exitFunc,false);
	exitButton.addEventListener('click',_exitFunc,false);
	titleExitButton.addEventListener('mousedown',titleNoDrag,false);
	if(prefModalObjs.length==0){
		window.addEventListener('keypress',escapeKeyPress,false);
	}
	
	//add dragging to titleBar
	let dragObj=new draggable(titleBar,prefObj);
	//display modal dialog
	prefObj.style.display='';
	//fields
	this.exit=_exitFunc;
	//update objects
	prefModalObjs.push(this);
}

/**
preferences
*/

let pref={};

/**
constants
*/

pref.c={
	guiNodeId: 'googleSearchFilterPlus',
	tGuiNodeId: 'tGoogleSearchFilterPlus',
	guiSettings: 'guiSettings',
}

/**
globals
*/

pref.guiObj=null;
pref.tGuiObj=null;

/**
pref settings:
	everything except for individual filters
*/

pref.settings={
	load: function(){
		let res=GM_getValue(pref.c.guiSettings);
		if(res==undefined){
			pref.s={}
			pref.settings.save();
		}else{
			pref.s=JSON.parse(res);
		}
	},
	
	save: function(){
		GM_setValue(pref.c.guiSettings,JSON.stringify(pref.s));
	},
}

/**
optional function, use when html needs to be loaded dynamically
only called once at init()
*/

pref.loadHTML=function(){

}

/**
main pref gui
*/

pref.gui={
	modalObj: null,
	
	init: function(){
		pref.gui.modalObj=new prefModal(pref.guiObj,_$('titleBar'),_$('exitButton'),_$('cancelButton'),pref.gui.close);
		pref.gui.load();
		_$('saveButton').addEventListener('click',pref.gui.save,false);
	},
	
	load: function(){
		let guiObj=pref.guiObj;
		let mouseX=pref.s.mouseX;
		let mouseY=pref.s.mouseY;
		if(!mouseX || !mouseY){
			//default x to middle of page, y to upper half of page
			mouseX=(window.innerWidth-guiObj.clientWidth)/2;
			mouseY=(window.innerHeight-guiObj.clientHeight)/3;
		}
		guiObj.style.left=mouseX+'px';
		guiObj.style.top=mouseY+'px';
	},
	
	save: function(){
		//grid gui settings are flushed when pref is closed
		pref.grid.grid2filters();
		gfpFilter.save();
	},
	
	close: function(){
		let guiObj=pref.guiObj;
		pref.s.mouseX=guiObj.offsetLeft;
		pref.s.mouseY=guiObj.offsetTop;
		pref.grid.save();
		pref.settings.save();
		if(!pref.chg.isEmpty()){
			pref.grid.finalize();
		}
	},
}

/**
import/export modal dialog
*/

pref.tGui={
	modalObj: null,
	
	init: function(titleStr,saveFunc){
		if(pref.tGui.modalObj) return null;
		_$('tTitle').innerHTML=titleStr;
		let modalObj=new prefModal(pref.tGuiObj,_$('tTitleBar'),_$('tExitButton'),_$('tCancelButton'),function(){
			_$('tText').value='';
			_$('tTitle').innerHTML='';
			pref.tGui.modalObj=null;
			saveButton.removeEventListener('click',_saveFunc,false);
		});
		let saveButton=_$('tOkButton');
		function _saveFunc(){
			saveFunc();
			modalObj.exit();
		}
		saveButton.addEventListener('click',_saveFunc,false);
		pref.tGui.modalObj=modalObj;
		pref.tGui.load();
		return modalObj;
	},
	
	load: function(){
		let tGuiObj=pref.tGuiObj;
		//default x, y to middle of page
		mouseX=(window.innerWidth-tGuiObj.clientWidth)/2;
		mouseY=(window.innerHeight-tGuiObj.clientHeight)/2;
		tGuiObj.style.left=mouseX+'px';
		tGuiObj.style.top=mouseY+'px';
	},
}

/**
tracks and merges filter changes in prefGui
	prefGui can change filters, but knownFilters is only updated after saving
	this is needed so a deep-copy of knownFilters isn't necessary everytime the filter dialog is opened
*/

pref.chg={
	//current filters (added/changed filters)
	filters: {},
	//removed filters
	removed: {},
	//currFilters==knownFilters, used so knownFilters only need to be copied once
	//	when this is true, filters is the changes need to be made to knownFilters to make it current
	//	when this is false, filters is a copy of the current filters
	currIsDelta: true,
	
	isRemoved: function(keys,len){
		return pref.chg.getRemoved(keys,len)==true;
	},
	
	getRemoved: function(keys,len){
		/**
		returns removed (does not have to be true/false)
		*/
		if(!len) len=keys.length;
		let removed=pref.chg.removed;
		for(let i=0;i<len;i++){
			removed=removed[keys[i]];
			if(!removed) return null;
		}
		return removed;
	},
	
	setRemoved: function(keys,len){
		if(!len) len=keys.length;
		len--;
		let removed=pref.chg.removed;
		for(let i=0;i<len;i++){
			if(keys[i] in removed){
				removed=removed[keys[i]];
			}else{
				for(;i<len;i++){
					let tmp={};
					removed[keys[i]]=tmp;
					removed=tmp;
				}
				break;
			}
		}
		removed[keys[len]]=true;
	},
	
	removeFilters: function(filters,removed){
		for(let key in removed){
			if(removed[key]==true){
				delete filters[key];
			}else if(removed[key]!=undefined){
				pref.chg.removeFilters(filters[key].subfilters,removed[key]);
			}
		}
	},
	
	removeFilter: function(text){
		/**
		doesn't assume text exists
		*/
		let keys=gfpFilter.getKeys(text);
		if(pref.chg.currIsDelta){
			let ret=gfpFilter.getSubfilter(keys,Filter.knownFilters);
			if(ret){
				pref.chg.setRemoved(keys);
				return ret;
			}else{
				return gfpFilter.popSubfilter(keys,pref.chg.filters);
			}
		}else{
			return gfpFilter.popSubfilter(keys,pref.chg.filters);
		}
	},
	
	getFilter: function(text){
		/**
		doesn't assume text exists
		*/
		let keys=gfpFilter.getKeys(text);
		if(pref.chg.currIsDelta){
			let ret=gfpFilter.getSubfilter(keys,Filter.knownFilters);
			//check if filter is removed
			if(ret){
				if(!pref.chg.isRemoved(keys)){
					return ret;
				}
			}
			return gfpFilter.getSubfilter(keys,pref.chg.filters);
		}else{
			return gfpFilter.getSubfilter(keys,pref.chg.filters);
		}
	},
	
	hasFilter: function(text){
		let keys=gfpFilter.getKeys(text);
		let level=gfpFilter.isDuplicate(keys,Filter.knownFilters);
		if(level){
			if(!pref.chg.isRemoved(keys,level)){
				return true;
			}
		}
		return gfpFilter.isDuplicate(keys,pref.chg.filters)>0;
	},
	
	addFilter: function(filter){
		/**
		args:
			filter: filter text object
		*/
		return gfpFilter.fromObjectCompiled(filter,pref.chg.filters);
	},
	
	mergeFiltersFlush: function(filters,filtersM,removed){
		pref.chg.removeFilters(filters,removed);
		pref.chg._mergeFiltersFlush(filters,filtersM);
	},
	
	_mergeFiltersFlush: function(filters,filtersM){
		/**
		merges filters and flushes to filters
		uses pointers from filtersM
		*/
		//faster going through filtersM as this is likely to be smaller
		for(let text in filtersM){
			if(text in filters){
				let filter=filters[text];
				let filterM=filtersM[text];
				if('subfilters' in filterM){
					//can't check if subfilters is empty without a loop
					if('subfilters' in filter){
						//go deeper
						pref.chg._mergeFiltersFlush(filter.subfilters,filterM.subfilters);
					}else{
						//copy to filter
						filter.subfilters=filterM.subfilters;
					}
				}else{
					//filters are not necessarily equal if final subfilter (hitcount, etc.)
					filters[text]=filterM;
				}
			}else{
				filters[text]=filtersM[text];
			}
		}
	},
	
	mergeFiltersFlushM: function(filters,filtersM,removed){
		/**
		merges filters
		uses pointers from filtersM
		*/
		//javascript doesn't care if the iterator is changed when iterating, so can flush to filtersM directly
		for(let text in filters){
			let rem=removed[text];
			if(rem!=true){
				if(text in filtersM){
					let filter=filters[text];
					let filterM=filtersM[text];
					if('subfilters' in filter){
						if('subfilters' in filterM){
							//will not happen when 'a$$b$$c' --> 'a$$b'
							pref.chg.mergeFiltersFlushM(filter.subfilters,filterM.subfilters,rem||{});
						}
					}
				}else if(rem==undefined){
					filtersM[text]=filters[text];
				}else{
					//clone filter, since it can't be modified
					let filter=gfpFilter.clone(filters[text]);
					filter.subfilters={};
					filtersM[text]=filter;
					pref.chg.mergeFiltersFlushM(filter.subfilters,{},rem);
				}
			}
		}
		return filtersM;
	},
	
	mergeFilters: function(filters){
		/**
		merges filters with currFilters
		*/
		pref.chg.filters=pref.chg.mergeFiltersFlushM(pref.chg.filters,filters,{});
		return pref.chg.filters;
	},
	
	flush: function(flush2known){
		/**
		flushes changes (removes filters delta)
		args:
			flush2known: if true, flushes to knownFilters; if false, makes filters a copy of currFilters
		*/
		if(flush2known){
			if(pref.chg.currIsDelta){
				pref.chg.mergeFiltersFlush(Filter.knownFilters,pref.chg.filters,pref.chg.removed);
			}else{
				Filter.knownFilters=pref.chg.filters;
			}
			pref.chg.clear();
			return Filter.knownFilters;
		}else{
			if(pref.chg.currIsDelta){
				pref.chg.mergeFiltersFlushM(Filter.knownFilters,pref.chg.filters,pref.chg.removed);
				pref.chg.currIsDelta=false;
			}
			return pref.chg.filters;
		}
	},
	
	isEmpty: function(){
		for(let key in pref.chg.filters) return false;
		if(pref.chg.currIsDelta){
			for(let key in pref.chg.removed) return false;
		}
		return true;
	},
	
	clear: function(){
		pref.chg.filters={};
		pref.chg.removed={};
		pref.chg.currIsDelta=true;
	},
	
	init: function(filters){
		/**
		initializes filters to filters
		assumes this is not a pointer to knownFilters
		*/
		pref.chg.filters=filters;
		pref.chg.removed={};
		pref.chg.currIsDelta=false;
	},
}

/**
filterGrid
	grid gui, add, import, export, load, save
*/

pref.grid={
	//current row index, used to specify the next inserted row id
	currRowId: 0,
	//editableGrid obj
	editableGrid: null,
	//html of header before render
	headerHTML: null,
	//last td column style node
	lastColumnStyle: [],
	cellWidthSub: null,
	lastCellWidth: 0,
	
	filterGrid: null,
	
	load: function(){
		/**
		loads grid gui information: column sort
		this and filters2grid should be independant, since the save button saves the filter settings,
			and doesn't need to save the gui information
		*/
		let editableGrid=pref.grid.editableGrid;
		let sortedColumnName=pref.s.sortedColumnName;
		let sortDescending=pref.s.sortDescending;
		if(sortedColumnName==undefined || sortDescending==undefined){
			sortedColumnName='filter';
			sortDescending=false;
		}
		editableGrid.sortedColumnName=sortedColumnName;
		editableGrid.sortDescending=sortDescending;
		editableGrid.sort();
		editableGrid.columns[0].headerRenderer._render(-1,0,editableGrid.tHead.rows[0].cells[0],editableGrid.columns[0].label);
	},
	
	save: function(){
		/**
		saves grid gui information
		*/
		let editableGrid=pref.grid.editableGrid;
		pref.s.sortedColumnName=editableGrid.sortedColumnName;
		pref.s.sortDescending=editableGrid.sortDescending;
	},
	
	grid2filters: function(flush){
		/**
		pref.chg.flush
		defaults flush to true
		*/
		if(flush==undefined) flush=true;
		return pref.chg.flush(flush);
	},

	filters2grid: function(filters){
		/**
		if grid exists: swap gui filters with filters
		else: render new grid from filters
		*/
		let editableGrid=pref.grid.editableGrid;
		if(editableGrid){
			//save grid gui info
			pref.grid.save();
		}
		let filterGridBody=pref.grid.filterGrid.childNodes[3];
		let currRowId=0;
		let rowsHTML='';
		gfpFilter.iterate(filters,function(filter,filterParts){
			rowsHTML+=pref.grid.renderRowHTML(filter,filterParts,currRowId);
			currRowId++;
		});
		filterGridBody.innerHTML=rowsHTML;
		//reset changes
		if(gfpFilter.isPtr(filters)){
			pref.chg.clear();
		}else{
			pref.chg.init(filters);
		}
		pref.grid.currRowId=currRowId;
		//render grid
		pref.grid.gridInit();
	},
	
	addFilter: function(){
		let editableGrid=pref.grid.editableGrid;
		let currRowId=pref.grid.currRowId;
		pref.grid.addRow(currRowId.toString(),{
			'filter': '',
			'slow': false,
			'enabled': true,
			'hits': 0,
			'action': currRowId.toString(),
		});
		pref.grid.currRowId++;
		let rowIndex=editableGrid.getRowIndex(currRowId);
		let row=editableGrid.getRow(rowIndex);
		//hook isSame to make sure modelChanged always fires
		let o_isSame=editableGrid.isSame;
		editableGrid.isSame=function() false;
		//override modelChanged to get added filter
		let o_modelChanged=editableGrid.modelChanged;
		editableGrid.modelChanged=function(rowIndex,columnIndex,oldValue,newValue,row){
			//create new filter object
			let filterText=newValue;
			if(pref.chg.hasFilter(filterText)){
				alert('Filter already exists');
				pref.grid.removeRow(currRowId);
				//restore isSame
				editableGrid.isSame=o_isSame;
				//restore modelChanged
				editableGrid.modelChanged=o_modelChanged;
				return;
			}
			let filterTextObj={'text':filterText};
			let filter=pref.chg.addFilter(filterTextObj);
			//if filter is empty
			if(filter==null){
				pref.grid.removeRow(currRowId);
				//restore isSame
				editableGrid.isSame=o_isSame;
				//restore modelChanged
				editableGrid.modelChanged=o_modelChanged;
				return;
			}
			//render new filter row
			pref.grid.renderRow(filter,pref.chg.filters,row);
			//re-sort table
			pref.grid.editableGrid.sort();
			row.scrollIntoView(false);
			//restore isSame
			editableGrid.isSame=o_isSame;
			//restore modelChanged
			editableGrid.modelChanged=o_modelChanged;
		};
		//edit filter
		row.scrollIntoView(false);
		editableGrid.columns[0].cellEditor.edit(rowIndex,0,row.childNodes[0],'');
	},
	
	importFilters: function(){
		pref.tGui.init('Import Filters',function(){
			let newFilters;
			try{
				newFilters=gfpFilter.parseCompiled(_$('tText').value);
			}catch(e){
				alert('Invalid import format');
				return;
			}
			let mergeFilters=confirm('Merge with current filters?');
			if(mergeFilters){
				//merge changes
				pref.grid.grid2filters(false);
				newFilters=pref.chg.mergeFilters(newFilters);
			}else{
				pref.chg.init(newFilters);
			}
			//render new grid
			pref.grid.filters2grid(newFilters);
		});
	},
	
	exportFilters: function(){
		let res=pref.tGui.init('Export Filters',new Function());
		if(res){
			_$('tText').value=gfpFilter.stringify(pref.grid.grid2filters(false));
		}
	},
	
	updateLastColumnWidth: function(){
		/**
		adjusts right-most column (header, body) to fill up all space
		*/
		let filterGrid=pref.grid.filterGrid;
		let cellWidthSub;
		if(!pref.grid.cellWidthSub){
			//initialize width for the first time
			let lastHeaderCell=filterGrid.tHead.firstElementChild.lastElementChild;
			//cell border+padding
			let cStyles=window.getComputedStyle(lastHeaderCell,null);
			let cellWidthBP=lastHeaderCell.offsetWidth-lastHeaderCell.clientWidth+parseInt(cStyles.paddingLeft)+parseInt(cStyles.paddingRight);
			cellWidthSub=cellWidthBP+lastHeaderCell.offsetLeft;
			pref.grid.cellWidthSub=cellWidthSub;
			//add last header style
			let style=document.createElement('style');
			style.innerHTML='.gfp .filterGrid>thead>tr>th:last-child {width: '+(filterGrid.tHead.clientWidth-cellWidthSub)+'px;}';
			pref.grid.lastColumnStyle.push(style);
			document.body.appendChild(style);
			//add last cell style
			style=document.createElement('style');
			pref.grid.lastColumnStyle.push(style);
			document.body.appendChild(style);
		}else{
			cellWidthSub=pref.grid.cellWidthSub;
		}
		let lastCellWidth=filterGrid.childNodes[3].clientWidth-cellWidthSub;
		if(lastCellWidth!=pref.grid.lastCellWidth){
			//update last cell style node
			pref.grid.lastColumnStyle[1].innerHTML='.gfp .filterGrid>tbody>tr>td:last-child {width: '+lastCellWidth+'px;}';
			pref.grid.lastCellWidth=lastCellWidth;
		}
	},
	
	getFilterClass: function(filter){
		if(filter instanceof WhitelistFilter){
			return 'whitelistFilter';
		}else if(filter instanceof InvalidFilter){
			return 'invalidFilter';
		}else if(filter instanceof CommentFilter){
			return 'commentFilter';
		}
	},
	
	renderRow: function(filter,filters,row){
		/**
		render an existing row
		processes filter to determine if filter is slow
		args:
			filters: filters which contain filter
			row: the row element if exists, renders the element; if not, returns the html
		*/
		let editableGrid=pref.grid.editableGrid;
		let text=(filter.fullText||filter.text);
		let keys=gfpFilter.getKeys(text);
		let isDisabled=(filter.disabled==undefined?false:filter.disabled);
		if(isDisabled){
			row.classList.add('disabledFilter');
		}else{
			row.classList.remove('disabledFilter');
		}
		let className=pref.grid.getFilterClass(filter);
		let rowIndex=row.rowIndex-editableGrid.nbHeaderRows;
		row.childNodes[0].setAttribute('class',className);
		editableGrid.setValueAt(rowIndex,0,text);
		editableGrid.setValueAt(rowIndex,1,gfpFilter.isSlowFilterKeys(keys,filters));
		editableGrid.setValueAt(rowIndex,2,!isDisabled);
		editableGrid.setValueAt(rowIndex,3,filter.hitCount||0);
	},
	
	renderRowHTML: function(filter,filterParts,rowId){
		/**
		render raw html of row
		args:
			rowId: row's id
		*/
		let rowHTML='';
		let text=(filter.fullText||filter.text);
		let isDisabled=(filter.disabled==undefined?false:filter.disabled);
		if(isDisabled){
			rowHTML+='<tr id="'+rowId.toString()+'" class="disabledFilter">';
		}else{
			rowHTML+='<tr id="'+rowId.toString()+'">';
		}
		let className=pref.grid.getFilterClass(filter);
		if(className){
			rowHTML+='<td class="'+className+'">'+text+'</td>';
		}else{
			rowHTML+='<td>'+text+'</td>';
		}
		rowHTML+='<td>'+gfpFilter.isSlowFilter(filter,filterParts).toString()+'</td>';
		rowHTML+='<td>'+(!isDisabled).toString()+'</td>';
		rowHTML+='<td>'+(filter.hitCount||0).toString()+'</td>';
		rowHTML+='<td>'+rowId.toString()+'</td>';
		rowHTML+='</tr>';
		return rowHTML;
	},
	
	addRow: function(rowId,data){
		pref.grid.editableGrid.addRow(rowId,data);
		pref.grid.updateLastColumnWidth();
	},	
	
	removeRow: function(rowId){
		pref.grid.editableGrid.removeRow(rowId);
		pref.grid.updateLastColumnWidth();
	},
	
	removeRowFilter: function(row,rowId){
		let filterText=row.childNodes[0].textContent;
		pref.chg.removeFilter(filterText);
		pref.grid.removeRow(rowId);
	},
	
	gridInit: function(){
		let filterGrid=pref.grid.filterGrid;
		//check if header is already rendered
		if(pref.grid.headerHTML){
			filterGrid.tHead.innerHTML=pref.grid.headerHTML;
		}else{
			pref.grid.headerHTML=filterGrid.tHead.innerHTML;
		}
		if(pref.grid.editableGrid){
			//unattach previous grid from table
			pref.grid.editableGrid.unattach();
		}
		let editableGrid=new EditableGrid('filterGrid',{
			enableSort: true,
			editmode: 'static',				//static, fixed, absolute
			editorzoneid: 'edition',		//used only if editmode is set to 'fixed'
		});
        editableGrid.sortUpImage.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAQAAABwkq/rAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QoQCjY2qH0pQwAAAF9JREFUCNdj/M+ADpgg1BaJNa8XyyEJbZD4fJ9B5OONLjmo0BqJz3eYONgY2Dg/3ihSZGBgYmD4dJeZm53hBwMnAw/nl3UMDCwMDB+5njN8Y/jO8IPhJ8MvdQYGRkwbAY5kGttJJR0zAAAAAElFTkSuQmCC';
        editableGrid.sortDownImage.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAQAAABwkq/rAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QoQCjYJHhsEfgAAAGhJREFUCNddyLEJg0AYhuFXchxGHcA+TXo3cRNrtxDJPpnBKhAIuSqtIP932lwakZCnfLLEPwf3tLESEYapKxzITkWFJ2djfoCD5aKnL898eEstZAkYa3uVeZCuQ9gL+lpTbG4Bjvr1BdwZJPIY3iMMAAAAAElFTkSuQmCC';
		editableGrid.attachToHTMLTable(filterGrid,[
				new Column({name: 'filter',		datatype: 'string'}),
				new Column({name: 'slow',		datatype: 'boolean'}),
				new Column({name: 'enabled',	datatype: 'boolean'}),
				new Column({name: 'hits',		datatype: 'integer'}),
				new Column({name: 'action',		datatype: 'html', editable: false})
		]);
		with(editableGrid){
			setCellRenderer('slow',new CellRenderer({
				render: function(cell,value){
					cell.innerHTML=value?'<div class="gfpImage_7"/>':'';
				}
			}));
			addCellValidator('hits',new CellValidator({
				isValid: function(value){
					return parseInt(value)>=0;
				}
			}));
			//render delete filter column
			setCellRenderer('action',new CellRenderer({render: function(cell,value){
				let node=document.createElement('a');
				node.setAttribute('style','cursor:pointer;');
				node.innerHTML='<div alt="Delete filter" border="0" class="gfpImage_3" title="Delete filter"/>';
				node.addEventListener('click',function(){
					if(confirm('Are you sure you want to delete this filter?')){
						pref.grid.removeRowFilter(cell.parentNode,value);
					}
				},false);
				cell.appendChild(node);
			}}));
			modelChanged=function(rowIndex,columnIndex,oldValue,newValue,row){
				//save filter changes
				//save old filter to copy it's properties
				let o_filter;
				let filterText;
				if(columnIndex==0){
					let o_filterText=oldValue;
					filterText=newValue;
					//check if filterText already exists
					if(pref.chg.hasFilter(filterText) && !gfpFilter.isDuplicateText(o_filterText,filterText)){
						alert('Filter already exists');
						this.setValueAt(rowIndex,columnIndex,oldValue);
						return;
					}
					//remove old filter since filter name has changed
					o_filter=pref.chg.removeFilter(o_filterText);
				}else{
					filterText=row.childNodes[0].textContent;
					o_filter=pref.chg.getFilter(filterText);
				}
				//create new filter object
				let filterTextObj={};
				filterTextObj.text=(o_filter.fullText||o_filter.text);
				filterTextObj.disabled=(o_filter.disabled||false).toString();
				filterTextObj.hitCount=(o_filter.hitCount||0).toString();
				switch(columnIndex){
					case 0: filterTextObj.text=newValue; break;
					case 2: filterTextObj.disabled=(!newValue).toString(); break;
					case 3: filterTextObj.hitCount=newValue.toString(); break;
				}
				let filter=pref.chg.addFilter(filterTextObj);
				//if filter is empty
				if(filter==null){
					pref.grid.removeRow(editableGrid.getRowId(rowIndex));
					return;
				}
				//render new filter row
				pref.grid.renderRow(filter,pref.chg.filters,row);
				if(columnIndex==0){
					//re-sort table
					pref.grid.editableGrid.sort();
					row.scrollIntoView(false);
				}
			};
			renderGrid();
		}
		pref.grid.editableGrid=editableGrid;
		//render first then update, since this might add a previously not present scrollbar
		pref.grid.updateLastColumnWidth();
		pref.grid.load();
	},
	
	init: function(){
		pref.grid.filterGrid=_$('filterGrid');
		pref.chg.init({});
		pref.grid.filters2grid(Filter.knownFilters);
		_$('addFilterButton').addEventListener('click',pref.grid.addFilter,false);
		_$('importFiltersButton').addEventListener('click',pref.grid.importFilters,false);
		_$('exportFiltersButton').addEventListener('click',pref.grid.exportFilters,false);
	},
	
	finalize: function(){
		//restore default values
		with(pref.grid){
			currRowId=0;
			editableGrid=null;
			cellWidthSub=null;
			lastCellWidth=0;
		}
		let lastColumnStyle=pref.grid.lastColumnStyle;
		for(let i=0;i<lastColumnStyle.length;i++){
			let style=lastColumnStyle[i];
			style.parentNode.removeChild(style);
		}
		pref.grid.lastColumnStyle=[];
		pref.chg.clear();
		_$('addFilterButton').removeEventListener('click',pref.grid.addFilter,false);
		_$('importFiltersButton').removeEventListener('click',pref.grid.importFilters,false);
		_$('exportFiltersButton').removeEventListener('click',pref.grid.exportFilters,false);
	},
}

/**
init
*/

pref.init=function(){
	pref.loadHTML();
	pref.guiObj=_$(pref.c.guiNodeId);
	pref.tGuiObj=_$(pref.c.tGuiNodeId);
	gfpFilter.compileAll(Filter.knownFilters);
}

pref.renderAll=function(){
	if(pref.grid.editableGrid){
		pref.grid.finalize();
	}else{
		pref.init();
	}
	pref.settings.load();
	pref.gui.init();
	pref.grid.init();
}

pref.show=function(){
	if(pref.grid.editableGrid){
		if(pref.guiObj.style.display!='none') return;
	}else{
		pref.init();
	}
	pref.settings.load();
	pref.gui.init();
	if(!pref.grid.editableGrid){
		pref.grid.init();
	}
}

init();

pref.loadHTML=function(){let node=document.createElement("div");node.innerHTML="<style>.gfpImage_0{width:9px;height:7px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAQAAABwkq/rAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QoQCjYJHhsEfgAAAGhJREFUCNddyLEJg0AYhuFXchxGHcA+TXo3cRNrtxDJPpnBKhAIuSqtIP932lwakZCnfLLEPwf3tLESEYapKxzITkWFJ2djfoCD5aKnL898eEstZAkYa3uVeZCuQ9gL+lpTbG4Bjvr1BdwZJPIY3iMMAAAAAElFTkSuQmCC);background-size:100%;}\n.gfpImage_1{width:9px;height:7px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAQAAABwkq/rAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QoQCjY2qH0pQwAAAF9JREFUCNdj/M+ADpgg1BaJNa8XyyEJbZD4fJ9B5OONLjmo0BqJz3eYONgY2Dg/3ihSZGBgYmD4dJeZm53hBwMnAw/nl3UMDCwMDB+5njN8Y/jO8IPhJ8MvdQYGRkwbAY5kGttJJR0zAAAAAElFTkSuQmCC);background-size:100%;}\n.gfpImage_2{width:0px;height:0px;background-image:url(data:image/gif;base64,R0lGODlhAQAWAMQAAMjKysXHx9/h4c/R0ePl5cbIyNPV1c3Pz+fp6d7h4e7w8Ovt7cvNzdfZ2eHj49vd3fDy8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABYAAAUSICQqC0IIT3MEBcAMRvMkjhMCADs=);background-size:100%;}\n.gfpImage_3{width:16px;height:16px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJdSURBVDjLpZP7S1NhGMf9W7YfogSJboSEUVCY8zJ31trcps6zTI9bLGJpjp1hmkGNxVz4Q6ildtXKXzJNbJRaRmrXoeWx8tJOTWptnrNryre5YCYuI3rh+8vL+/m8PA/PkwIg5X+y5mJWrxfOUBXm91QZM6UluUmthntHqplxUml2lciF6wrmdHriI0Wx3xw2hAediLwZRWRkCPzdDswaSvGqkGCfq8VEUsEyPF1O8Qu3O7A09RbRvjuIttsRbT6HHzebsDjcB4/JgFFlNv9MnkmsEszodIIY7Oaut2OJcSF68Qx8dgv8tmqEL1gQaaARtp5A+N4NzB0lMXxon/uxbI8gIYjB9HytGYuusfiPIQcN71kjgnW6VeFOkgh3XcHLvAwMSDPohOADdYQJdF1FtLMZPmslvhZJk2ahkgRvq4HHUoWHRDqTEDDl2mDkfheiDgt8pw340/EocuClCuFvboQzb0cwIZgki4KhzlaE6w0InipbVzBfqoK/qRH94i0rgokSFeO11iBkp8EdV8cfJo0yD75aE2ZNRvSJ0lZKcBXLaUYmQrCzDT6tDN5SyRqYlWeDLZAg0H4JQ+Jt6M3atNLE10VSwQsN4Z6r0CBwqzXesHmV+BeoyAUri8EyMfi2FowXS5dhd7doo2DVII0V5BAjigP89GEVAtda8b2ehodU4rNaAW+dGfzlFkyo89GTlcrHYCLpKD+V7yeeHNzLjkp24Uu1Ed6G8/F8qjqGRzlbl2H2dzjpMg1KdwsHxOlmJ7GTeZC/nesXbeZ6c9OYnuxUc3fmBuFft/Ff8xMd0s65SXIb/gAAAABJRU5ErkJggg==);background-size:100%;}\n.gfpImage_4{width:32px;height:32px;background-image:url(data:image/png;base64,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);background-size:100%;}\n.gfpImage_5{width:32px;height:32px;background-image:url(data:image/png;base64,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);background-size:100%;}\n.gfpImage_6{width:32px;height:32px;background-image:url(data:image/png;base64,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);background-size:100%;}\n.gfpImage_7{width:26px;height:16px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAMAAAA/D5+aAAABWVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACheQDX19c8LgCIZgCVlZUaGhoiIiJuUwBYWFh/XwByVgBmTQAuLi6WcQAqKiodHR3Jyck0JwBtUgCLaAAgGAAyJgBUQACCgoK4uLhzVgAaEwB3WgBYQgAqHwAeHh4jIyNkZGR1WABAMAC/v78pHwCEYwBMOQBOOgB5WwCFZACWlpaSbgCDYgATExNHR0cFBQUwJQCGZQCIZwBRPQAMCQCXl5c7LAAWFhaFhYUhISFhYWE2NjZDMwAHBweSkpJ6XABLS0sVFRUKCABISEhrUQBJNwAdFgBOOwCYmJgUFBQA9R6HAAAAKHRSTlMAgpRMfYSBS36Zut28HF0Ua2ppmyWcOpGKPGXCYaHhibauhm11LYAjiwhFZAAAAPxJREFUeF5lzVVTAzEYRuEUaFF3dzlf6oq7u7u76/8XkixDLzgXO/Puk0yUVy6uAjfyMR9yPCmEVDIZgxJnVJmzpU6qWRZXiGZLRagWnJSRkN928Rmqo7y43hEpke2Vzztre+40PiqsVCLyyMvbB0Fj3+Z5H/EBagzlGeLCvTQsslirYFVrAoZ6kOkZsWUQScPgkDbU4N3KEBMZGZWx8Qkmp7Tpi0ZDTYjMEpwjJPMshC0sRWhVpjbWRNY3NrfknR1tC9NuoWM/og8OjxLHJ6dnnGsXncoGl1d2wfWN9rpF/dbFfVxne0gbydYdf4LnKECUV/W/Xn+gz9//Bz+04TZYU20HQAAAAABJRU5ErkJggg==);background-size:100%;}</style>\n\n<style>/*\n * EditableGrid.css\n * \n * Copyright 2010 Webismymind SPRL\n *\n * This file is part of EditableGrid.\n * \n * EditableGrid is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or \n * any later version.\n * \n * EditableGrid is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n * GNU General Public License for more details.\n * \n * You should have received a copy of the GNU General Public License\n * along with EditableGrid. If not, see http://www.gnu.org/licenses.\n * \n */\n \ntd.number {\n\ttext-align: right;\n\tfont-weight: bold;\n\tpadding-right: 5px;\n\twhite-space: nowrap;\n}\n\n.boolean {\n\ttext-align: center;\n}\n</style>\n\n<style type=\"text/css\">\n.gfp {\n\tcolor: #333333;\n\tborder: 1px solid #CCCCCC;\n\tbackground-color: #FFFFFF;\n\tfont-family: \"Lucida Grande\",\"Bitstream Vera Sans\",Verdana,Arial,sans-serif;\n\tfont-size: 12px;\n\tpadding: 0;\n\twidth: 550px;\n\tposition: absolute;\n\tz-index: 9999;\n}\n\n.gfp a {\n\ttext-decoration: none;\n\tcolor: #999999;\n\tfont-size: 11px;\n}\n\n.gfp .prefRow {\n\tmargin-top: 3px;\n\toverflow: hidden;\n\tpadding: 8px 12px;\n}\n\n.gfp .caption {\n\tmargin: 0;\n\tpadding: 2px 5px 3px 5px;\n\tfont-size: 11px;\n\tfont-weight: bold;\n\tbackground: #CCCCCC url('data:image/gif;base64,R0lGODlhAQAWAMQAAMjKysXHx9/h4c/R0ePl5cbIyNPV1c3Pz+fp6d7h4e7w8Ovt7cvNzdfZ2eHj49vd3fDy8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABYAAAUSICQqC0IIT3MEBcAMRvMkjhMCADs=') top left repeat-x;\n\tcolor: #666666;\n\tborder-bottom: 0;\n}\n\n.gfp .iconButton {\n\tborder-style: none;\n\theight: 16px;\n\twidth: 16px;\n}\n\n/* buttons */\n\n.gfp input[type=\"button\"] {\n\tpadding: 0px 10px 0px 10px;\n\tcolor: #999999;\n\tbackground-color: White;\n\tfont-weight: bold;\n\tborder: solid 1px #CCCCCC;\n\ttext-align: center;\n\tfont-size:12px;\n}\n.gfp input[type=\"button\"]:hover {\n\tpadding: 1px 11px 1px 11px;\n\tcolor: #333333;\n\tborder-color: #666666;\n}\n\n/* filterGrid */\n\n.gfp .filterGrid {\n\tborder-collapse: collapse;\n\tborder: 1px solid #D5D5D5;\n\twidth: 100%;\n}\n\n.gfp .whitelistFilter{\n\tcolor: #008800;\n}\n.gfp .invalidFilter{\n\tcolor: #C00000;\n}\n.gfp .commentFilter{\n\tcolor: #808080;\n}\n.gfp .disabledFilter{\n\tbackground-color: #E0E0E0;\n}\n\n.gfp .filterGrid input.invalid {\n\tbackground: red;\n\tcolor: #FDFDFD;\n}\n\n/**/\n\n.gfp .filterGrid>thead {\n\tfont-size: 11px;\n\tdisplay: block;\n}\n\n.gfp .filterGrid th {\n\tbackground: #E5E5E5;\n\tborder: 1px solid #D5D5D5;\n\tcolor: #555;\n\ttext-align: left;\n}\n\n.gfp .filterGrid a:hover {\n\ttext-decoration: underline;\n}\n\n.gfp .filterGrid>tbody {\n\tdisplay: block;\n\theight: 150px;\n\toverflow-x: hidden;\n\toverflow-y: auto;\n\tcolor: black;\n}\n\n.gfp .filterGrid>tbody tr:hover {\n\tbackground-color: #888888;\n\tcolor: white;\n}\n\n.gfp .filterGrid td {\n\tborder-left: 1px solid #E0E0E0;\n\tborder-right: 1px solid #E0E0E0;\n\tfont-size: 11px;\n}\n\n/**/\n\n.gfp .filterGrid th:nth-child(1), .gfp .filterGrid td:nth-child(1) {\n\twidth: 320px;\n\tmax-width: 320px;\n\toverflow: hidden;\n\twhite-space: nowrap;\n}\n.gfp .filterGrid th:nth-child(2), .gfp .filterGrid td:nth-child(2) {\n\twidth: 30px;\n}\n.gfp .filterGrid th:nth-child(3), .gfp .filterGrid td:nth-child(3) {\n\twidth: 70px;\n}\n.gfp .filterGrid th:nth-child(4), .gfp .filterGrid td:nth-child(4) {\n\tpadding-right: 5px;\n\twidth: 40px;\n\tmax-width: 40px;\n\toverflow-x: hidden;\n}\n\n#edition {\n\tpadding-top: 5px;\n\twidth: 600px;\n\tborder: 0px;\n}\n\n</style>\n\n<!-- preferences !-->\n<div id=\"googleSearchFilterPlus\" class=\"gfp\" style=\"display:none;\">\n\t<h2 id=\"titleBar\" class=\"caption\" style=\"-moz-user-select:none;\">\n\t\t<span style=\"cursor:default\">Google Search Filter Plus</span>\n\t\t<a id=\"exitButton\" href=\"javascript:void(0);\" style=\"float:right;\">[X]</a>\n\t</h2>\n\t\n\t<div class=\"prefRow\">\n\t\t<a class=\"iconButton gfpImage_4\" href=\"javascript:void(0);\" style=\"display:inline-block\" id=\"addFilterButton\" title=\"Add filter\"></a>\n\t\t<a class=\"iconButton gfpImage_6\" href=\"javascript:void(0);\" style=\"display:inline-block\" id=\"importFiltersButton\" title=\"Import filters\"></a>\n\t\t<a class=\"iconButton gfpImage_5\" href=\"javascript:void(0);\" style=\"display:inline-block\" id=\"exportFiltersButton\" title=\"Export filters\"></a>\n\t\t\n\t\t<table id=\"filterGrid\" class=\"filterGrid\">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Filter rule</th>\n\t\t\t\t\t<th>!</th>\n\t\t\t\t\t<th>Enabled</th>\n\t\t\t\t\t<th>Hits</th>\n\t\t\t\t\t<th></th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t<tr id=\"1\">\n\t\t\t\t\t<td>test1</td>\n\t\t\t\t\t<td>true</td>\n\t\t\t\t\t<td>true</td>\n\t\t\t\t\t<td>1</td>\n\t\t\t\t\t<td>1</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr id=\"2\">\n\t\t\t\t\t<td>test2</td>\n\t\t\t\t\t<td>false</td>\n\t\t\t\t\t<td>true</td>\n\t\t\t\t\t<td>2</td>\n\t\t\t\t\t<td>2</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr id=\"3\">\n\t\t\t\t\t<td>test3</td>\n\t\t\t\t\t<td>false</td>\n\t\t\t\t\t<td>true</td>\n\t\t\t\t\t<td>3</td>\n\t\t\t\t\t<td>3</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr id=\"4\">\n\t\t\t\t\t<td>test4</td>\n\t\t\t\t\t<td>false</td>\n\t\t\t\t\t<td>true</td>\n\t\t\t\t\t<td>4</td>\n\t\t\t\t\t<td>4</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr id=\"5\">\n\t\t\t\t\t<td>test5</td>\n\t\t\t\t\t<td>false</td>\n\t\t\t\t\t<td>true</td>\n\t\t\t\t\t<td>5</td>\n\t\t\t\t\t<td>5</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div id=\"edition\"></div>\n\t</div>\n\t\n\t<div class=\"prefRow\">\n\t\t<input id=\"cancelButton\" type=\"button\" value=\"Cancel\" style=\"float:right;\"></input>\n\t\t<input id=\"saveButton\" type=\"button\" value=\"Save\" style=\"float:right; margin-right:8px;\"></input>\n\t</div>\n</div>\n\n<!-- import/export textarea !-->\n<div id=\"tGoogleSearchFilterPlus\" class=\"gfp\" style=\"display:none;\">\n\t<h2 id=\"tTitleBar\" class=\"caption\" style=\"-moz-user-select:none;\">\n\t\t<span id=\"tTitle\" style=\"cursor:default\">&nbsp;</span>\n\t\t<a id=\"tExitButton\" href=\"javascript:void(0);\" style=\"float:right;\">[X]</a>\n\t</h2>\n\t<div class=\"prefRow\">\n\t\t<textarea id=\"tText\" wrap=\"off\" spellcheck=\"false\" style=\"height:200px; width:100%;\"></textarea>\n\t</div>\n\t<div class=\"prefRow\">\n\t\t<input id=\"tCancelButton\" type=\"button\" value=\"Cancel\" style=\"float:right;\"></input>\n\t\t<input id=\"tOkButton\" type=\"button\" value=\"OK\" style=\"float:right; margin-right:8px;\"></input>\n\t</div>\n</div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";document.body.appendChild(node);};