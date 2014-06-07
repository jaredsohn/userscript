// ==UserScript==
// @name          Github: JSON reformatter
// @namespace     http://github.com/johan/
// @description   Reformats JSON(P) files in the github tree view for readability.
// @include       https://github.com/*/blob/*/*.json*
// @match         https://github.com/*/blob/*/*.json*
// ==/UserScript==

var $json, $ln, $o_js, $o_ln // json and line numbers jQuery objects + originals
, spc = '                                                                      '
, js_css = // all custom formatting for our node.js-style-indented foldable json
  '.json{white-space:pre-wrap;font-family:monospace;}' +
  '.json .callback{color:Blue;}' +
  '.json .prop{color:DarkGoldenRod;}' +
  '.json .str{color:RosyBrown;}' +
  '.json .null,.json .bool{color:CadetBlue;}' +
  '.json .num{color:#000;}' +
  // let :before rules remain visible but make this essentially "display: none":
  '.json .folded *{height:0;width:0;top:-999cm;left:-999cm;white-space:normal;'+
                  'position:absolute;color:transparent;}' +
  '.json .folded.arr:before{color:#666;content:"[\\002026 ]'+ spc +'";}' +// […]
  '.json .folded.obj:before{color:#666;content:"{\\002026 }'+ spc +'";}' +// {…}
  '.json .folded{background:#FFF;}' +
  '.json .folded:hover{font-weight:700;color:#000;}' +
  '.json .folded{cursor:se-resize;}' +
  '.json .unfolded.hovered{background:rgba(255,192,203,0.5);}' +
  '.json .unfolded{cursor:nw-resize;}';

var JSONFormatter = (function() {
  var toString = Object.prototype.toString, BR = '<br\n/>', re =
    // This regex attempts to match a JSONP structure (ws includes Unicode ws)
    // * optional leading ws
    // * callback name (any valid function name as per ECMA-262 Edition 3 specs)
    // * optional ws
    // * open parenthesis
    // * optional ws
    // * either { or [, the only two valid characters to start a JSON string
    // * any character, any number of times
    // * either } or ], the only two valid closing characters of a JSON string
    // * optional trailing ws and semicolon
    // (this of course misses anything that has comments, more than one callback
    // -- or otherwise requires modification before use by a proper JSON parser)
    /^[\s\u200B\uFEFF]*([\w$\[\]\.]+)[\s\u200B\uFEFF]*\([\s\u200B\uFEFF]*([\[{][\s\S]*[\]}])[\s\u200B\uFEFF]*\)([\s\u200B\uFEFF;]*)$/m;

  function detectJSONP(s) {
    var js = s, cb = '', se = '', match;
    if ('string' !== typeof s) return wrapJSONP(s, cb, se);
    if ((match = re.exec(s)) && 4 === match.length) {
      cb = match[1];
      js = match[2];
      se = match[3].replace(/[^;]+/g, '');
    }

    try {
      return wrapJSONP(JSON.parse(js), cb, se);
    }
    catch (e) {
      return error(e, s);
    }
  }

  // Convert a JSON value / JSONP response into a formatted HTML document
  function wrapJSONP(val, callback, semicolon) {
    var output = span(value(val, callback ? '' : null, callback && BR),
                      'json');
    if (callback)
      output = span(callback +'(', 'callback') + output +
               span(')'+ semicolon, 'callback');
    return output;
  }

  // utility functions

  function isArray(obj) {
    return '[object Array]' === toString.call(obj);
  }

  // Wrap a fragment in a span of class className
  function span(html, className) {
    return '<span class=\''+ className +'\'>'+ html +'</span>';
  }

  // Produce an error document for when parsing fails
  function error(e, data) {
    return span('Error parsing JSON: '+ e, 'error') +'<h1>Content:</h1>'+
           span(html(data), 'json');
  }

  // escaping functions

  function html(s, isAttribute) {
    if (s == null) return '';
    s = (s+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return isAttribute ? s.replace(/'/g, '&apos;') : s;
  }

  var js = JSON.stringify('\b\f\n\r\t').length === 12 ?
    function saneJSEscaper(s, noQuotes) {
      s = html(JSON.stringify(s).slice(1, -1));
      return noQuotes ? s : '&quot;'+ s +'&quot;';
    }
  : function insaneEscaper(s, noQuotes) {
    // undo all damage of an \uXXXX-tastic Mozilla JSON serializer
    var had = { '\b': 'b' // return
              , '\f': 'f' // these
              , '\r': 'r' // to the
              , '\n': 'n' // tidy
              , '\t': 't' // form
              }, ws;      // below
    for (ws in had)
      if (-1 === s.indexOf(ws))
        delete had[ws];

    s = JSON.stringify(s).slice(1, -1);

    for (ws in had)
      s = s.replace(new RegExp('\\\\u000'+(ws.charCodeAt().toString(16)), 'ig'),
                    '\\'+ had[ws]);

    s = html(s);
    return noQuotes ? s : '&quot;'+ s +'&quot;';
  };

  // conversion functions

  // Convert JSON value (Boolean, Number, String, Array, Object, null)
  // into an HTML fragment
  function value(v, indent, nl) {
    var output;
    switch (typeof v) {
      case 'boolean':
        output = span(html(v), 'bool');
      break;

      case 'number':
        output = span(html(v), 'num');
      break;

      case 'string':
        if (/^(\w+):\/\/[^\s]+$/i.test(v)) {
          output = '&quot;<a href=\''+ html(v, !!'attribute') +'\'>' +
                     js(v, 1) +
                   '</a>&quot;';
        } else {
          output = span(js(v), 'str');
        }
      break;

      case 'object':
        if (null === v) {
          output = span('null', 'null');
        } else {
          indent = indent == null ? '' : indent +'&nbsp; ';
          if (isArray(v)) {
            output = array(v, indent, nl);
          } else {
            output = object(v, indent, nl);
          }
        }
      break;
    }
    return output;
  }

  // Convert an Object to an HTML fragment
  function object(obj, indent, nl) {
    var output = '';
    for (var key in obj) {
      if (output) output += BR + indent +', ';
      output += span(js(key), 'prop') +': ' +
        value(obj[key], indent, BR);
    }
    if (!output) return '{}';
    return '<span class=\'unfolded obj\'><span class=content>' +
             (nl ? nl + indent : '') + '{ '+ output + BR + indent + '}' +
           '</span></span>';
  }

  // Convert an Array into an HTML fragment
  function array(a, indent, nl) {
    for (var i = 0, output = ''; i < a.length; i++) {
      if (output) output += BR + indent +', ';
      output += value(a[i], indent, '');
    }
    if (!output) return '[]';
    return '<span class=\'unfolded arr\'><span class=content>' +
             (nl ? nl + indent : '') +'[ '+ output + BR +
                              indent +']</span></span>';
  }

  // Takes a string of JSON and returns a string of HTML.
  // Be sure to call JSONFormatter.init(document) once, too (for styling / UX).
  function JSONFormatter(s) {
    return detectJSONP(s);
  }

  // Pass the document that you render the HTML into, to set up css and events.
  JSONFormatter.init = function init(doc, css) {
    doc = doc || document;
    var head = doc.getElementsByTagName('head')[0] || doc.documentElement
      , node = doc.getElementById('json-format') || doc.createElement('style');
    if (node.id) return; else node.id = 'json-format';
    node.textContent = css || js_css;
    head.appendChild(node);
    doc.addEventListener('click', function folding(e) {
      var elem = e.target, is, is_json = elem;
      while (is_json && is_json.className != 'json')
        is_json = is_json.parentNode;
      if (!is_json) return; // only do folding/unfolding on json nodes

      do {
        if (/^a$/i.test(elem.nodeName)) return;
        is = elem.className || '';
      } while (!/\b(un)?folded /.test(is) && (elem = elem.parentNode));
      if (elem) {
        elem.className = /unfolded /.test(is)
          ? is.replace('unfolded ', 'folded ')
          : is.replace('folded ', 'unfolded ');
      }
    }, false);
  };

  return JSONFormatter;
})();

function mode_switch() {
  $o_ln.toggle(); $ln.toggle();
  $o_js.toggle(); $json.toggle();
}

function mode_pick(to) {
  var json = 'orig' === to ? 'hide' : 'show'
    , orig = 'orig' === to ? 'show' : 'hide';
  return function(e) {
    $json[json](); $ln[json]();
    $o_js[orig](); $o_ln[orig]();
    e.preventDefault();
  };
}

function init() {
  $o_ln = $('#files .file .data .line_numbers');
  $o_js = $('#files .file .data .highlight pre');
  var el_ln = $o_ln.get(0).cloneNode(false)
    , el_js = $o_js.get(0).cloneNode(false)
    , json  = $o_js.text().replace(/\u00A0+/g,'')
    , html;
  if (1 === $o_js.length) try {
    html  = JSONFormatter(json);
    $ln   = $(el_ln).hide(); $o_ln.before($ln);
    $json = $(el_js).hide(); $o_js.before($json);
    $json.css('padding-left', '1em'); // this looks much nicer
    $json.closest('td').css('vertical-align', 'top'); // ditto – not "middle"
    $json.html(html);
    for (var ln = '', lines = 1+$json.find('br').length, n = 1; n <= lines; n++)
      ln += '<span id="L'+ n +'" rel="#L'+ n +'">'+ n +'</span>\n';
    $ln.html(ln);
    JSONFormatter.init(document);
    mode_switch();

    var $actions = $('#files .file .meta .actions');
    $actions.prepend('<li><a id="orig" href="#orig">source</a></li>');
    $actions.prepend('<li><a id="json" href="#json">json</a></li>');
    $actions.find('#orig').click(mode_pick('orig'));
    $actions.find('#json').click(mode_pick('json'));
  } catch(e) { console.error(e); }
}

// This block of code injects our source in the content scope and then calls the
// passed callback there. The whole script runs in both GM and page content, but
// since we have no other code that does anything, the Greasemonkey sandbox does
// nothing at all when it has spawned the page script, which gets to use jQuery.
// (jQuery unfortunately degrades much when run in Mozilla's javascript sandbox)
if ('object' === typeof opera && opera.extension) {
  this.__proto__ = window; // bleed the web page's js into our execution scope
  document.addEventListener('DOMContentLoaded', init, false); // GM-style init
} else (function(run_me_in_page_scope) { // for Chrome or Firefox+Greasemonkey
  if ('undefined' == typeof __RUNS_IN_PAGE_SCOPE__) { // unsandbox, please!
    var src = arguments.callee.caller.toString(),
     script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.innerHTML = "const __RUNS_IN_PAGE_SCOPE__ = true;\n("+ src +')();';
    document.documentElement.appendChild(script);
    document.documentElement.removeChild(script);
  } else { // unsandboxed -- here we go!
    run_me_in_page_scope();
  }
})(init);
