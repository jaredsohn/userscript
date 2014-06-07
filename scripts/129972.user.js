// ==UserScript==
// @name Blacklist front
// @version 0.6.1
// @author gera_b
// @description Script adds some blacklist abilities
// @include http://fotomag.com.ua/admin/*
// @match http://fotomag.com.ua/admin/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
// ==/UserScript==

// works only with main order form
if(window.location.href.indexOf('orderid=') != -1 && window.location.href.indexOf('orders/details') != -1){

//JSON unnative main code
{var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
}

//spin.js 1.2.5 main code starts here
(function(window, document, undefined) {
//fgnass.github.com/spin.js#v1.2.5
/**
 * Copyright (c) 2011 Felix Gnass [fgnass at neteye dot de]
 * Licensed under the MIT license
 */

  var prefixes = ['webkit', 'Moz', 'ms', 'O']; /* Vendor prefixes */
  var animations = {}; /* Animation rules keyed by their name */
  var useCssAnimations;

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div');
    var n;

    for(n in prop) {
      el[n] = prop[n];
    }
    return el;
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++) {
      parent.appendChild(arguments[i]);
    }
    return parent;
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = function() {
    var el = createEl('style');
    ins(document.getElementsByTagName('head')[0], el);
    return el.sheet || el.styleSheet;
  }();

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-');
    var start = 0.01 + i/lines*100;
    var z = Math.max(1-(1-alpha)/trail*(100-start) , alpha);
    var prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase();
    var pre = prefix && '-'+prefix+'-' || '';

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:'+z+'}' +
        start + '%{opacity:'+ alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail)%100 + '%{opacity:'+ alpha + '}' +
        '100%{opacity:'+ z + '}' +
        '}', 0);
      animations[name] = 1;
    }
    return name;
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   **/
  function vendor(el, prop) {
    var s = el.style;
    var pp;
    var i;

    if(s[prop] !== undefined) return prop;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop;
      if(s[pp] !== undefined) return pp;
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n)||n] = prop[n];
    }
    return el;
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i];
      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n];
      }
    }
    return obj;
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = {x:el.offsetLeft, y:el.offsetTop};
    while((el = el.offsetParent)) {
      o.x+=el.offsetLeft;
      o.y+=el.offsetTop;
    }
    return o;
  }

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // rotation offset
    color: '#000',        // #rgb or #rrggbb
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto'          // center horizontally
  };

  /** The constructor */
  var Spinner = function Spinner(o) {
    if (!this.spin) return new Spinner(o);
    this.opts = merge(o || {}, Spinner.defaults, defaults);
  };

  Spinner.defaults = {};
  merge(Spinner.prototype, {
    spin: function(target) {
      this.stop();
      var self = this;
      var o = self.opts;
      var el = self.el = css(createEl(0, {className: o.className}), {position: 'relative', zIndex: o.zIndex});
      var mid = o.radius+o.length+o.width;
      var ep; // element position
      var tp; // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null);
        tp = pos(target);
        ep = pos(el);
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : o.left+mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : o.top+mid)  + 'px'
        });
      }

      el.setAttribute('aria-role', 'progressbar');
      self.lines(el, self.opts);

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0;
        var fps = o.fps;
        var f = fps/o.speed;
        var ostep = (1-o.opacity)/(f*o.trail / 100);
        var astep = f/o.lines;

        !function anim() {
          i++;
          for (var s=o.lines; s; s--) {
            var alpha = Math.max(1-(i+s*astep)%f * ostep, o.opacity);
            self.opacity(el, o.lines-s, alpha, o);
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps));
        }();
      }
      return self;
    },
    stop: function() {
      var el = this.el;
      if (el) {
        clearTimeout(this.timeout);
        if (el.parentNode) el.parentNode.removeChild(el);
        this.el = undefined;
      }
      return this;
    },
    lines: function(el, o) {
      var i = 0;
      var seg;

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.width>>1) + 'px'
        });
      }
      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, i, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        });
        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}));
        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')));
      }
      return el;
    },
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
    }
  });

  /////////////////////////////////////////////////////////////////////////
  // VML rendering for IE
  /////////////////////////////////////////////////////////////////////////

  /**
   * Check and init VML support
   */
  !function() {

    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
    }

    var s = css(createEl('group'), {behavior: 'url(#default#VML)'});

    if (!vendor(s, 'transform') && s.adj) {

      // VML support detected. Insert CSS rule ...
      sheet.addRule('.spin-vml', 'behavior:url(#default#VML)');

      Spinner.prototype.lines = function(el, o) {
        var r = o.length+o.width;
        var s = 2*r;

        function grp() {
          return css(vml('group', {coordsize: s +' '+s, coordorigin: -r +' '+-r}), {width: s, height: s});
        }

        var margin = -(o.width+o.length)*2+'px';
        var g = css(grp(), {position: 'absolute', top: margin, left: margin});

        var i;

        function seg(i, dx, filter) {
          ins(g,
            ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
              ins(css(vml('roundrect', {arcsize: 1}), {
                  width: r,
                  height: o.width,
                  left: o.radius,
                  top: -o.width>>1,
                  filter: filter
                }),
                vml('fill', {color: o.color, opacity: o.opacity}),
                vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
              )
            )
          );
        }

        if (o.shadow) {
          for (i = 1; i <= o.lines; i++) {
            seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
          }
        }
        for (i = 1; i <= o.lines; i++) seg(i);
        return ins(el, g);
      };
      Spinner.prototype.opacity = function(el, i, val, o) {
        var c = el.firstChild;
        o = o.shadow && o.lines || 0;
        if (c && i+o < c.childNodes.length) {
          c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild;
          if (c) c.opacity = val;
        }
      };
    }
    else {
      useCssAnimations = vendor(s, 'animation');
    }
  }();

  window.Spinner = Spinner;

})(window, document);

//spin.js spinner options and init
var spinner;
function spinnerEvent(spEvent){
		if (typeof spEvent == 'string' && spEvent.toLowerCase() === 'spin'){
			var opts = {
					  lines: 10, // The number of lines to draw
					  length: 3, // The length of each line
					  width: 1, // The line thickness
					  radius: 9, // The radius of the inner circle
					  rotate: 0, // The rotation offset
					  color: '#222', // #rgb or #rrggbb
					  speed: 1, // Rounds per second
					  trail: 25, // Afterglow percentage
					  shadow: false, // Whether to render a shadow
					  hwaccel: true, // Whether to use hardware acceleration
					  className: 'spinner', // The CSS class to assign to the spinner
					  zIndex: 2e9, // The z-index (defaults to 2000000000)
					  top: 'auto', // Top position relative to parent in px
					  left: 'auto' // Left position relative to parent in px
					};
			target = document.getElementById('blacklisted_div');
			spinner = new Spinner(opts);
			spinner.spin(target);
			}	
		if (typeof spEvent == 'string' && spEvent.toLowerCase() === 'stop'){
			spinner.stop();
		}
}

function findAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        console.log('No searchText or replacement present!');
        return;
    }
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'i') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,head,style,title,link,meta,script,object,iframe';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(regex, replacement).substring(1),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = '<span id="cellular">' + currentNode.data + '</span>' + html;
					var cellular = currentNode.data;
					cellular = cellular.replace(/[()-/:]/g,'');
					cellular = cellular.replace(/^\s*([\S\s]*?)\s*$/, '$1');
					validate(cellular,JSONfetch);
				while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);

	spinnerEvent('spin');
    }
}

function createBLnode () {
	var categoryNode = document.createElement('select');
		categoryNode.setAttribute('id','bl_category');
			for(i=0;i<6;i++){
				categoryNode.add(new Option());
			}
		categoryNode.options[0].value = 0;
		categoryNode.options[0].text = 	'0 Не установлена';
		categoryNode.options[0].setAttribute('style','background: none repeat scroll 0% 0% rgb(200, 200, 200);'); // серый 
		categoryNode.options[1].value = 1;
		categoryNode.options[1].text = 	'1 Кидала';
		categoryNode.options[1].setAttribute('style','background: none repeat scroll 0% 0% rgb(235, 190, 190);'); // красный
		categoryNode.options[2].value = 2;
		categoryNode.options[2].text = 	'2 Хамло';
		categoryNode.options[2].setAttribute('style','background: none repeat scroll 0% 0% rgb(250, 250, 170);'); // жёлтый
		categoryNode.options[3].value = 3;
		categoryNode.options[3].text =	'3 Перекупщик';
		categoryNode.options[3].setAttribute('style','background: none repeat scroll 0% 0% rgb(160, 205, 250);'); // синий 
		categoryNode.options[4].value = 4;
		categoryNode.options[4].text = 	'4 Постоянный покупатель';
		categoryNode.options[4].setAttribute('style','background: none repeat scroll 0% 0% rgb(105, 230, 250);'); // голубой
		categoryNode.options[5].value = 5;
		categoryNode.options[5].text =	'5 VIC';		
		categoryNode.options[5].setAttribute('style','background: none repeat scroll 0% 0% rgb(150, 255, 160);'); // зелёный 
        categoryNode.setAttribute('style','margin-left: 2px; margin-right: 2px; float: right; font-size: 11px;');

	var blNode = document.createElement('div');
		blNode.setAttribute('id','blacklisted_div');
		
	var txtArea = document.createElement('textarea');
		txtArea.setAttribute('type','text');
		txtArea.setAttribute('rows','4');
		txtArea.setAttribute('cols','60');
		txtArea.setAttribute('maxlength','240');
		// txtArea.setAttribute('disabled','disabled');
		txtArea.setAttribute('id','bl_commentary');
		
	var buttonSave = document.createElement('input');
		buttonSave.setAttribute('type','button');
		buttonSave.setAttribute('value','Save');
		buttonSave.setAttribute('id','blacklisted_but');
	
	var authorNode = document.createElement('span');
		authorNode.setAttribute('id','bl_author');
		authorNode.innerHTML = 'author';
        authorNode.setAttribute('style','margin-left: 2px; margin-right: 2px; float: right;');
		
	var dateNode = document.createElement('span');
		dateNode.setAttribute('id','bl_date');
		dateNode.innerHTML = 'date';
        dateNode.setAttribute('style','margin-left: 2px; margin-right: 2px; float: right;');
	
	blNode.innerHTML = txtArea.outerHTML;
	
	return categoryNode.outerHTML + blNode.outerHTML + buttonSave.outerHTML + authorNode.outerHTML + dateNode.outerHTML;	
}

function changeBgColor() {
this.style.background = this.options[this.selectedIndex].style.background;
}  

function validate(cellular,action){
	if (typeof cellular === 'undefined'){
		console.log('Error in Blacklist.js. Unable to find number.');
	}
	else if (typeof action === 'undefined' && action !== 'fetch' && action !== 'update' && action !== 'delete')
	{
		console.log('Error in Blacklist.js. Please specify action fetch/update/delete.');
	}
	else if (action == 'fetch'){	
		var JSONObject = new Object;
		JSONObject.action = action;
		JSONObject.cel = cellular;
	}	
	else if (action == 'update'){
		var JSONObject = new Object;
		JSONObject.action = action; // action
		
		JSONObject.cel = cellular; // cellular
		var author = document.getElementsByClassName('topmenu')[document.getElementsByClassName('topmenu').length-1].textContent;
			author = String(author.match(/[\(]{1}[\s\S]+[\)]{1}/)).replace(/[()]/gi,'').replace(/^\s*([\S\s]*?)\s*$/, '$1');
		JSONObject.author = escape(author); // author
		JSONObject.commentary = escape(document.getElementById('bl_commentary').value); // commentary
		JSONObject.category = document.getElementById('bl_category').selectedIndex; // category
		
	}
	else if (action == 'delete'){
		var JSONObject = new Object;
		JSONObject.action = action;
		JSONObject.cel = cellular;
	}
	JSONstring = JSON.stringify(JSONObject);
	runAjax(JSONstring);
}

function getHTTPObject(){
    var xhr = false;
    if (window.XMLHttpRequest)
    {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try
        {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e)
        {
            try
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e)
            {
                xhr = false;
            }
        }
    }
    return xhr;
}

function runAjax(JSONstring){
    // function returns "AJAX" object, depending on web browser
    // this is not native JS function!
    if (navigator.userAgent.toLowerCase().indexOf('opera') == -1){
		request = getHTTPObject();
		request.open("GET", "http://"+parserURL+"/parser.php?json="+JSONstring, true);
		request.onreadystatechange = sendData;
		request.send(null);
	}
}
 

//function is executed when var request state changes
var request;
function sendData(){
    // if request object received response
    if(request.readyState == 4)    {
		// parser.php response
		var JSONtext = request.responseText;
		// convert received string to JavaScript object
		var JSONobject = JSON.parse(JSONtext);
				spinnerEvent('stop');
			if (!JSONobject.error) {
				document.getElementById('bl_commentary').value 			= unescape(JSONobject.commentary);
				document.getElementById('bl_category').value			= unescape(JSONobject.category);
				document.getElementById('bl_category').style.background = document.getElementById('bl_category').options[document.getElementById('bl_category').selectedIndex].style.background;
				document.getElementById('bl_author').innerHTML			= unescape(JSONobject.author);
				document.getElementById('bl_date').innerHTML			= unescape(JSONobject.date);
				
				
			}
			else {
				console.log(JSONobject.error);
			}
    }
}

var parserURL = '192.168.2.117';
var rgxpPhone = /[\(]{1}\d{3}[\)]{1}\d{7}/;
var JSONfetch = 'fetch';
var JSONupdate = 'update';
var JSONdelete = 'delete';
findAndReplace(rgxpPhone, createBLnode, document.getElementById('formUpdate'));
document.getElementById('bl_category').addEventListener('change',changeBgColor,false);
document.getElementById('blacklisted_but').addEventListener('click',function(){validate(document.getElementById('cellular').textContent.replace(/[():\s]/gi,''),JSONupdate);},false);

}

/* if(window.location.href == 'http://fotomag.com.ua/admin/us-config.php'){

var blSetDiv = document.createElement('div');
	blSetDiv.setAttribute('style','width: 500px; margin-left:auto; margin-right:auto;');

var numberInput = document.createElement('input');
	numberInput.setAttribute('type','text');
	numberInput.setAttribute('maxlength','10');
	
var inputHint = document.createElement('div');
	inputHint.setAttribute('type','text');
	inputHint.setAttribute('style','font-size: 11px; color: rgb(212,212,212);');
	inputHint.innerHTML = 'формат код1234567';

blSetDiv.innerHTML = numberInput.outerHTML + inputHint.outerHTML + createBLnode();

document.body.innerHTML = '<p>' + blSetDiv.outerHTML + '</p>';

} */