function usodata_51832() {
// ==UserScript==
// @name           GM_toolkit
// @namespace      http://projects.izzysoft.de/
// @description    Toolkit library
// @version        1.0.5
// @include        *
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @uso:script     51832
// ==/UserScript==
}
var GMSU_meta_51832 = usodata_51832.toString();

// =====================================[ String helpers ]===
// add prototype trim (taken from [uso:script:12107]
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

// ======================================[ Array helpers ]===
/** Is the item part of the array?
 * @function in_array
 * @param mixed needle
 * @param array haystack
 * @return boolean
 */
function in_array(item,arr) {
  for(p=0;p<arr.length;p++) if (item == arr[p]) return true;
  return false;
}
/** Return all the keys of an array
 * @function array_keys
 * @param array arr
 * @return array keys
 */
function array_keys(arr) {
  var keys = new Array();
  for (key in arr) keys.push(key);
  return keys;
}
// ============================[ Common variables helper ]===
/** Is a given variable already defined?
 * Returns FALSE if any of the passed variables is not set,
 * TRUE if all passed variables are set. You can pass as many
 * arguments as you want, e.g. isset(o.var1,o.var2,o.var3)
 * REMEMBER: Checking isset(varname) when varname was not declared yields
 * an JS error "varname is not defined". Use window.varname instead.
 * @function isset
 * @param mixed varname
 * @return boolean
 */
function isset() {
  if (arguments.length===0) return false;
  for (var i=0;i<arguments.length;i++) {
    if (typeof(arguments[i])=='undefined'||arguments[i]===null) return false;
  }
  return true;
}
/** Escape RegExp special chars
 * @function escapeRegExp
 * @param string s
 * @return string escaped
 * @brief taken from Greasespot code snippets
 */
function escapeRegExp(s) {
  return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
}
/** Add style with !important rule to override page defaults
 * (adds "!important" to each rule)
 * @function addForcedStyle
 * @param string css
 * @brief taken from Greasespot code snippets
 */
function addForcedStyle(css) {
  GM_addStyle(css.replace(/;/g,' !important;'));
}
// ========================================[ DOM helpers ]===
/** Get elements by className
 * @function getElementsByClassName
 * @param string className
 * @param optional string tag restrict to specified tag
 * @param optional node restrict to childNodes of specified node
 * @return Array of nodes
 * @author Jonathan Snook, http://www.snook.ca/jonathan
 * @author Robert Nyman, http://www.robertnyman.com
 */
function getElementsByClassName(className, tag, elm){
  var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
  var tag = tag || "*";
  var elm = elm || document;
  var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
  var returnElements = [];
  var current;
  var length = elements.length;
  for(var i=0; i<length; i++){
    current = elements[i];
    if(testClass.test(current.className)){
      returnElements.push(current);
    }
  }
  return returnElements;
}
/** Get elements whose id matches the given regexp
 * @function getElementsByIdRegExp
 * @param RegExp regex
 * @param optional string tag restrict to specified tag
 * @param optional node restrict to childNodes of specified node
 * @return Array nodes
 * @author Arthaey Angosii http://userscripts.org/users/4440
 * @author Izzy http://userscripts.org/users/izzysoft
 */
function getElementsByIdRegExp(regex,tag,elm) {
  var matchingElements = [];
  if (!regex) return matchingElements;

  tag = tag || '*';
  elm = elm || document;
  var elements = (tag=='*' && elm.all)? elm.all : elm.getElementsByTagName(tag);
  for (var i = 0; i < elements.length; i++)
    if (elements[i].id.match(regex))
      matchingElements.push(elements[i]);
  return matchingElements;
}

/** Append an element to a given node
 * @function appendElement
 * @param string nodeID ID of parentNode
 * @param string tag nodeType
 * @param string id ID for the new node
 * @param string className
 * @param string textVal innerHTML
 * @param boolean retEl return the created element?
 */
function appendElement(node,tag,id,classnam,textVal,retEl) {
  if (!document.getElementById(node)) return;
  try {
    var el = document.createElement(tag);
  } catch(e) {
    return;
  }
  id ? el.id = id : null;
  classnam ? el.className = classnam : null;
  el.innerHTML = (textVal ? textVal : '');
  var retNode = document.getElementById(node).appendChild(el);
  if (retEl) return retNode;
}
/** Create new element
 * Example call: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
 * @function createElement
 * @param string type e.g. 'link', 'a', 'p'
 * @param object attributes
 * @return node
 * @brief taken from Greasespot code snippets
 */
function createElement(type, attributes){
 var node = document.createElement(type);
 for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
  node.setAttribute(attr, attributes[attr]);
 }
 return node;
}
/** Insert a node after another
 * @function insertAfter
 * @param node newNode
 * @param node before
 * @brief taken from Greasespot code snippets
 */
function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}
/** Remove an element by ID
 * @function removeElementById
 * @param mixed id string for ID or the node itself
 * @return boolean success
 */
function removeElementById(id) {
  if (!id) return;
  var node = (typeof(id)=='string') ? document.getElementById(id) : id;
  var res = node.parentNode.removeChild(node);
  if (res) return true;
  return false;
}
/** Remove an element by name
 * @function removeElementByName
 * @param string name name of the element to remove (or the node itself)
 * @return boolean success
 */
function removeElementByName(nam) {
  if (!nam) return;
  var node = (typeof(id)=='string') ? document.getElementByName(nam) : nam;
  var res = node.parentNode.removeChild(node);
  if (res) return true;
  return false;
}
/** Remove elements by className
 * @function removeElementsByClassName
 * @param string className
 * @param optional ancestor (default: document)
 * @return boolean success FALSE if one or more elements failed or none found
 */
function removeElementsByClassName(cname,node) {
  node = node || document;
  var elms = node.getElementsByClassName(cname);
  if (elms.length<1) return false;
  for (var i=0;i<elms.length;i++)
    if ( !removeElementById(elms[i]) ) return false;
  return true;
}
/** Remove elements by tag name
 * @function removeElementsByTagName
 * @param string tag name
 * @param optional node ancestor (default: document)
 * @return boolean success FALSE if one or more elements failed or none found
 */
function removeElementsByTagName(tag,node) {
  if (!tag) return false;
  var node = node || document;
  var elms = node.getElementsByTagName(tag);
  if (elms.length<1) return false;
  for (var i=0;i<elms.length;i++)
    if ( !removeElementById(elms[i]) ) return false;
  return true;
}
/** Get next sibling skipping possible whiteSpace(s) in between
 * @function nextSibling
 * @param node startSib
 * @return mixed nextSibling node when found, FALSE otherwise
 * @brief taken from Greasespot code snippets
 */
function nextSibling(startSib) {
  if (!(nextSib=startSib.nextSibling)) return false;
  while (nextSib.nodeType!=1) if (!(nextSib=nextSib.nextSibling)) return false;
  return nextSib;
}
// =======================================[ Translations ]===
/** Translation class
 * @class GM_trans
 */
GM_trans = {
  /** Set desired language
   * @method setLang
   * @param string lang 2-char language code
   */
  setLang: function(lng) {
    this.trans.useLang = lng;
  },
  /** Translations
   * @attribute object trans
   */
  trans: {
    useLang: 'en'
  },
  /** Translate a given string
   * @method lang
   * @param string term to translate
   * @param optional array replaces
   * @return string translated term
   */
  lang: function(term) {
    if (!term) return '';
    var res;
    if (this.trans[this.trans.useLang][term]) res = this.trans[this.trans.useLang][term];
    else if (this.trans['en'][term]) res = this.trans['en'][term];
    else return term;
    if (typeof(arguments[1])!="object") return res;
    for (var i=0;i<arguments[1].length;i++) {
      res = res.replace('%'+(i+1),arguments[1][i]);
    }
    return res;
  },
  /** Set translations for a given language
   * @method setTranslations
   * @param string lang 2-char language code
   * @param object trans translations { string term: string translation }
   */
  setTranslations: function(lang,trans) {
    if (typeof(this.trans[lang])!="object") { // new language?
      this.trans[lang] = trans;
      return;
    }
    for (attrname in trans) { this.trans[lang][attrname] = trans[attrname]; }
  }
}
// ========================[ GreaseMonkey specific stuff ]===
/** Generate a toggle menu entry in the user script menu
 * Useful for booleans, like toggling a feature on/off
 * @function makeMenuToggle
 * @param string key name of the variable to toggle
 * @param boolean defaultVal default value if variable did not exist
 * @param string toggleOn what to display for toggleOn
 * @param string toggleOf what to display for toggleOff
 * @param optional string prefix what to display in front of toggleOn/toggleOff
 * @brief taken from Greasespot code snippets
 */
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

// ==============================[ Miscellaneous helpers ]===
/** Add Script element to the web page
 * @function GMT_addScript
 * @param string script
 * @return boolean success
 * @author JoeSimmons http://userscripts.org/users/JoeSimmons
 * @author Izzy http://userscripts.org/users/izzysoft
 */
function GMT_addScript(script) {
  if ( script && (h=document.getElementsByTagName('head')[0]) ) {
    var aS = document.createElement('script');
    aS.type = 'text/javascript';
    aS.innerHTML = script;
    var res = h.appendChild(aS);
    if (res) return true;
  }
  return false;
}
/** Debug logging
 * Sends the supplied arguments to GM_log only if a global variable DEBUG
 * exists and is set to TRUE or 1
 * @function debug
 * @param mixed msg what to log
 */
function debug(msg) {
  if (typeof(DEBUG)!='undefined' && DEBUG) GM_log(msg);
}
