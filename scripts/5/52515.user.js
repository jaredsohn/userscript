// ==UserScript==
// @name          IzKontakta
// @version       0.3
// @namespace     http://qmax.habrahabr.ru/
// @description   Saves vCards of your friends.
// @include       http://vkontakte.ru/*
// ==/UserScript==

var preferencies = {
  'fn_pattern': '%l %f', // %f = firstname %l = lastname
  'intl': true,
  'intl_code': '+7',
  'strip_local': true,
  'local_code': '383',
  'save_mobilephone': true,
  'save_homephone': true,
};

function parsePhonebook(json) {
  obj = eval("o="+json);
  function filterphone(phone) { return phone.replace(/[\s()-]/g,''); };
  return obj.friends.map(function parseitem(item) {
      names = item[1].split(' ');
      return { 'firstname': names[0], 'lastname': names[1], 'mobilephone': filterphone(item[5]), 'homephone': filterphone(item[6]) };
    });
}

function formatVCard(info) {
  function format_phone(phone) {
    if( phone == "" ) return "";
    if( ! Number(phone) ) return "";
    if( preferencies.intl || preferencies.strip_local ) {
      var local = phone.substr(-7);
      var area = ( phone.length > 7 ) ? phone.substr(-10,3) : "";
      if( preferencies.strip_local && area == preferencies.local_code ) {
        return local;
      }
      if( preferencies.intl ) {
        if( area ) {
          if( (area + local).length == 10 ) 
            return preferencies.intl_code + area + local;
          else
            return phone;
        } else {
          if( (preferencies.local_code + local).length == 10 ) 
            return preferencies.intl_code + preferencies.local_code + local;
          else
            return phone;
        }
      }        
    }
    else 
      return phone;
  };

  function format_fn(item) {
    fn = preferencies.fn_pattern;
    fn = fn.replace('%l',item.lastname);
    fn = fn.replace('%f',item.firstname);
    return fn;
  };
  
  return "BEGIN:VCARD\n"+
    "VERSION:2.1\n"+
    "FN;CHARSET=UTF-8:"+format_fn(info)+"\n"+
    "N;CHARSET=UTF-8:"+info.lastname+";"+info.firstname+"\n"+
    (info.mobilephone && preferencies.save_mobilephone ? "TEL;CELL:"+format_phone(info.mobilephone)+"\n" : "") +
    (info.homephone && preferencies.save_homephone ? "TEL;HOME:"+format_phone(info.homephone)+"\n" : "") +
    "END:VCARD\n";
};

function printVCards(items) {
  for each (item in items) {
      GM_log(formatVCard(item));
    }
}
 
function saveVCards(vcards) {
  var text = "";
  for each (vcard in vcards) {
      text += formatVCard(vcard) + "\n";
    }
  window.location = ("data:text/directory;profile=vcard;charset=utf-8,"+encodeURIComponent(text));
};

function getFriends() {
  m = /^http:\/\/vkontakte.ru\/id([0-9]+)/.exec(window.location.href);
  if( ! m ) {
    alert("Это не страница вконтакте!");
    return;
  }
  
  userid = m[1];

  GM_xmlhttpRequest({ method: 'GET',
        url: "http://vkontakte.ru/friends_ajax.php?filter=phonebook&id="+userid,
        onerror: function (resp) { alert("Не получилось загрузить 'телефонную книгу':\n" + resp.response.status + " " + resp.statusText) },
        onload: function (resp) { saveVCards(parsePhonebook(resp.responseText)); }
    });
}

GM_registerMenuCommand("vCard izkontakta", getFriends);

// Copyright (C) 2008 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Parses a string of well-formed JSON text.
 *
 * If the input is not well-formed, then behavior is undefined, but it is
 * deterministic and is guaranteed not to modify any object other than its
 * return value.
 *
 * This does not use `eval` so is less likely to have obscure security bugs than
 * json2.js.
 * It is optimized for speed, so is much faster than json_parse.js.
 *
 * This library should be used whenever security is a concern (when JSON may
 * come from an untrusted source), speed is a concern, and erroring on malformed
 * JSON is *not* a concern.
 *
 *                      Pros                   Cons
 *                    +-----------------------+-----------------------+
 * json_sans_eval.js  | Fast, secure          | Not validating        |
 *                    +-----------------------+-----------------------+
 * json_parse.js      | Validating, secure    | Slow                  |
 *                    +-----------------------+-----------------------+
 * json2.js           | Fast, some validation | Potentially insecure  |
 *                    +-----------------------+-----------------------+
 *
 * json2.js is very fast, but potentially insecure since it calls `eval` to
 * parse JSON data, so an attacker might be able to supply strange JS that
 * looks like JSON, but that executes arbitrary javascript.
 * If you do have to use json2.js with untrusted data, make sure you keep
 * your version of json2.js up to date so that you get patches as they're
 * released.
 *
 * @param {string} json per RFC 4627
 * @param {function} opt_reviver optional function that reworks JSON objects
 *     post-parse per Chapter 15.12 of EcmaScript3.1.
 *     If supplied, the function is called with a string key, and a value.
 *     The value is the property of 'this'.  The reviver should return
 *     the value to use in its place.  So if dates were serialized as
 *     {@code { "type": "Date", "time": 1234 }}, then a reviver might look like
 *     {@code
 *     function (key, value) {
 *       if (value && typeof value === 'object' && 'Date' === value.type) {
 *         return new Date(value.time);
 *       } else {
 *         return value;
 *       }
 *     }}.
 *     If the reviver returns {@code undefined} then the property named by key
 *     will be deleted from its container.
 *     {@code this} is bound to the object containing the specified property.
 * @return {Object|Array}
 * @author Mike Samuel <mikesamuel@gmail.com>
 */
var jsonParse = (function () {
  var number
      = '(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)';
  var oneChar = '(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]'
      + '|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
  var string = '(?:\"' + oneChar + '*\")';

  // Will match a value in a well-formed JSON file.
  // If the input is not well-formed, may match strangely, but not in an unsafe
  // way.
  // Since this only matches value tokens, it does not match whitespace, colons,
  // or commas.
  var jsonToken = new RegExp(
      '(?:false|true|null|[\\{\\}\\[\\]]'
      + '|' + number
      + '|' + string
      + ')', 'g');

  // Matches escape sequences in a string literal
  var escapeSequence = new RegExp('\\\\(?:([^u])|u(.{4}))', 'g');

  // Decodes escape sequences in object literals
  var escapes = {
    '"': '"',
    '/': '/',
    '\\': '\\',
    'b': '\b',
    'f': '\f',
    'n': '\n',
    'r': '\r',
    't': '\t'
  };
  function unescapeOne(_, ch, hex) {
    return ch ? escapes[ch] : String.fromCharCode(parseInt(hex, 16));
  }

  // A non-falsy value that coerces to the empty string when used as a key.
  var EMPTY_STRING = new String('');
  var SLASH = '\\';

  // Constructor to use based on an open token.
  var firstTokenCtors = { '{': Object, '[': Array };

  var hop = Object.hasOwnProperty;

  return function (json, opt_reviver) {
    // Split into tokens
    var toks = json.match(jsonToken);
    // Construct the object to return
    var result;
    var tok = toks[0];
    if ('{' === tok) {
      result = {};
    } else if ('[' === tok) {
      result = [];
    } else {
      throw new Error(tok);
    }

    // If undefined, the key in an object key/value record to use for the next
    // value parsed.
    var key;
    // Loop over remaining tokens maintaining a stack of uncompleted objects and
    // arrays.
    var stack = [result];
    for (var i = 1, n = toks.length; i < n; ++i) {
      tok = toks[i];

      var cont;
      switch (tok.charCodeAt(0)) {
        default:  // sign or digit
          cont = stack[0];
          cont[key || cont.length] = +(tok);
          key = void 0;
          break;
        case 0x22:  // '"'
          tok = tok.substring(1, tok.length - 1);
          if (tok.indexOf(SLASH) !== -1) {
            tok = tok.replace(escapeSequence, unescapeOne);
          }
          cont = stack[0];
          if (!key) {
            if (cont instanceof Array) {
              key = cont.length;
            } else {
              key = tok || EMPTY_STRING;  // Use as key for next value seen.
              break;
            }
          }
          cont[key] = tok;
          key = void 0;
          break;
        case 0x5b:  // '['
          cont = stack[0];
          stack.unshift(cont[key || cont.length] = []);
          key = void 0;
          break;
        case 0x5d:  // ']'
          stack.shift();
          break;
        case 0x66:  // 'f'
          cont = stack[0];
          cont[key || cont.length] = false;
          key = void 0;
          break;
        case 0x6e:  // 'n'
          cont = stack[0];
          cont[key || cont.length] = null;
          key = void 0;
          break;
        case 0x74:  // 't'
          cont = stack[0];
          cont[key || cont.length] = true;
          key = void 0;
          break;
        case 0x7b:  // '{'
          cont = stack[0];
          stack.unshift(cont[key || cont.length] = {});
          key = void 0;
          break;
        case 0x7d:  // '}'
          stack.shift();
          break;
      }
    }
    // Fail if we've got an uncompleted object.
    if (stack.length) { throw new Error(); }

    if (opt_reviver) {
      // Based on walk as implemented in http://www.json.org/json2.js
      var walk = function (holder, key) {
        var value = holder[key];
        if (value && typeof value === 'object') {
          var toDelete = null;
          for (var k in value) {
            if (hop.call(value, k) && value !== holder) {
              // Recurse to properties first.  This has the effect of causing
              // the reviver to be called on the object graph depth-first.


              // Since 'this' is bound to the holder of the property, the
              // reviver can access sibling properties of k including ones
              // that have not yet been revived.

              // The value returned by the reviver is used in place of the
              // current value of property k.
              // If it returns undefined then the property is deleted.
              var v = walk(value, k);
              if (v !== void 0) {
                value[k] = v;
              } else {
                // Deleting properties inside the loop has vaguely defined
                // semantics in ES3 and ES3.1.
                if (!toDelete) { toDelete = []; }
                toDelete.push(k);
              }
            }
          }
          if (toDelete) {
            for (var i = toDelete.length; --i >= 0;) {
              delete value[toDelete[i]];
            }
          }
        }
        return opt_reviver.call(holder, key, value);
      };
      result = walk({ '': result }, '');
    }

    return result;
  };
})();
