// ==UserScript==
// @license        GNU GPLv3 http://www.gnu.org/licenses/quick-guide-gplv3.html
// @version        3.0
// @copyright      Aydın Yerlikaya
// @description    Travian 4.0 Dorf1 Sayfasinda Ganimet Gosterir, Rapor Sayfasında Yeşil Yağma/Saldırıları Siler.
// @description    Shows the amount of incoming bounty on Dorf1 Page. Also Clicks/Checks Green -Raid/Attack- Reports on Berichte Page ( for deleting... )
// @author         Aydın Yerlikaya
// @namespace      travian4ganimet
// @name           travian4ganimet_v3_0
// @include        http://*.travian.*.*/*dorf1.php*
// @include        http://*.travian.*/*dorf1.php*
// @include        http://*.travian.*.*/berichte.php
// @include        http://*.travian.*.*/berichte.php?&o=*&page=*
// @include        http://*.travian.*/berichte.php
// @include        http://*.travian.*/berichte.php?&o=*&page=*
// @exclude        http://*.travian.*.*/berichte.php?id=
// @exclude        http://*.travian.*/berichte.php?id=
// ==/UserScript==
// NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
// http://userscripts.org/scripts/source/101384.meta.js
// http://userscripts.org/scripts/show/101384
// http://userscripts.org/scripts/source/109874.meta.js << My other script
// http://userscripts.org/scripts/show/109874

// Works on Opera 11.50,
//          Google Chrome 12.0.742.112 ( NinjaKit, TamperMonkey or GreaseGoogle ),
//          Apple Safari 5.0.5 [7533.21.1] ( NinjaKit ) and
//          Mozilla Firefox 3.6.17 ( GreaseMonkey )
//
// Note : For Opera, Google Chrome and Apple Safari jsonParse's code appended to this script, not
//                                                                                       linked as require.


	if(window.location.href.indexOf("dorf1.php")>0&&!(window.location.href.indexOf("dorf2.php")>0)) {
		fL00G_g2D();
	}
	if(window.location.href.indexOf("berichte.php")>0&&!(window.location.href.indexOf("berichte.php?id=")>0)) {
		fL00G_GRD();
	}

	function fL00G_GRD() {
		var fB001 = document.body.innerHTML;
		var fB002 = 1;
		var fB003;
		if(fB001.indexOf("name=\"n"+fB002+"\"")>-1) {
			while(fB001.indexOf("name=\"n"+fB002+"\"")>-1) {
				fB001 = fB001.substr(fB001.search("name=\"n"+fB002+"\""));
				fB003 = fB001.substr(fB001.search("<img src=\"img/x.gif\" class=\""));
				fB003 = fB003.substr(0,fB003.search(">"));
				if(fB003.indexOf("<img src=\"img/x.gif\" class=\"iReport iReport1\"")>-1) { eval("document.getElementsByName(\"n"+fB002+"\")[0].checked = true;"); }
				fB002++;
			}
		}
		fB001 = fB002 = fB003 = null;
	}	
	function fL00G_g2D() {
		var fL999 = 200; // How much line read? Must be at least 20 and multiple of 10.
		var fL771 = document.body.innerHTML;
		var fL997 = 0;
		var fL881 = fL882 = fL883 = fL884 = fL885 = fL886 = fL887 = fL888 = 0;
		if(fL771.search("<table id=\"movements\"")) {
			fL771 = fL771.substr(fL771.search("<table id=\"movements\""));
			if(fL771.search("<div class=\"mov\"><span class=\"d1\">")) {
				var fL772 = fL771.substr(fL771.search("<div class=\"mov\"><span class=\"d1\">")+34);
				fL772 = parseInt(fL772.substr(0,fL772.search("&")));
				var fL773 = document.getElementById('villageList');
				var fL774 = fL773.innerHTML;
				fL774 = fL774.substr(fL774.search("<li class=\"entry active\" title=\"\">"));
				fL774 = fL774.substr(fL774.search("<a"));
				fL774 = fL774.substr(fL774.search("href=\"?newdid=")+18);
				fL774 = fL774.substr(0,fL774.search("\""));
				var fL775 = parseInt(fL774);
				if(isNaN(fL775)) {
					fL774 = document.body.innerHTML.substr(document.body.innerHTML.search("<li class=\"entry attack active\" title=\""));
					fL774 = fL774.substr(fL774.search("<a"));
					fL774 = fL774.substr(fL774.search("href=\"?newdid=")+18);
					fL774 = fL774.substr(0,fL774.search("\""));
					fL775 = parseInt(fL774);
				}
				if(isNaN(fL775)) {
					fL774 = document.body.innerHTML.substr(document.body.innerHTML.search("<li class=\"entry active\" title=\""));
					fL774 = fL774.substr(fL774.search("<a"));
					fL774 = fL774.substr(fL774.search("href=\"?newdid=")+18);
					fL774 = fL774.substr(0,fL774.search("\""));
					fL775 = parseInt(fL774);
				}
				var fL996, fL998, fL776, fL777, fL778;
				var fL897, fL893, fL895, fL891, fL899;
				var fL837 = "<img class=\"r4\" src=\"img/x.gif\">";
				var fL835 = "<img class=\"r3\" src=\"img/x.gif\">";
				var fL833 = "<img class=\"r2\" src=\"img/x.gif\">";
				var fL831 = "<img class=\"r1\" src=\"img/x.gif\">";
				var fL821 = "#00aa00";
				var fL823 = "#ee0000";
				var fL825 = "#0000aa";
				var fL827 = "#cc9900";
				var fL555;
				var fL556 = new XMLHttpRequest();
				var fL557 = "ajax.php";
				var fL558 = "cmd=loadTroopsOnTheWay&qid=1&limit=10&offset=0&fromOrTo=to&timer=0&did="+fL775+"&showAllIncoming=1&showAllOutgoing=";
				fL556.abort();
				fL556.open("POST", fL557, true);
				fL556.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				fL556.setRequestHeader("Content-length", fL558.length);
				fL556.setRequestHeader("Connection", "close");
				fL556.onreadystatechange = function() { fL00G_g2D_1(); }
				fL556.send(fL558);
			}
		}
		function fL00G_g2D_1() {
			if(fL556.readyState == 4 && fL556.status == 200) {
				fL555 = jsonParse(fL556.responseText);
				fL996 = parseInt(fL555.data.amount);
				fL998 = parseInt(fL555.data.shown);
				fL776 = fL555.data.troopHtml;
				fL778 = fL776;
				fL777 = "";
				fL997 = fL997 + fL998;
				for(fL547=0;fL547<fL998;fL547++) {
					fL777 = fL778.substr(fL778.search("<table class=\"troop_details inReturn\"")+37);
					fL777 = fL777.substr(0,fL777.search("</table>"));
					fL777 = fL777.substr(fL777.search("<tbody class=\"infos\">")+21);
					fL777 = fL777.substr(fL777.search("<span class=\"resource\" title=\"\">")+32);
					fL777 = fL777.substr(fL777.search("/>")+2);
					fL881 = parseInt(fL777.substr(0,fL777.search("<")-1));
					fL777 = fL777.substr(fL777.search("<span class=\"resource\" title=\"\">")+32);
					fL777 = fL777.substr(fL777.search("/>")+2);
					fL883 = parseInt(fL777.substr(0,fL777.search("<")-1));
					fL777 = fL777.substr(fL777.search("<span class=\"resource\" title=\"\">")+32);
					fL777 = fL777.substr(fL777.search("/>")+2);
					fL885 = parseInt(fL777.substr(0,fL777.search("<")-1));
					fL777 = fL777.substr(fL777.search("<span class=\"resource\" title=\"\">")+32);
					fL777 = fL777.substr(fL777.search("/>")+2);
					fL887 = parseInt(fL777.substr(0,fL777.search("<")-1));
					fL778 = fL778.substr(fL778.search("<table class=\"troop_details inReturn\"")+37);
					if(!isNaN(fL881)) { fL882 = fL882+fL881; }
					if(!isNaN(fL883)) { fL884 = fL884+fL883; }
					if(!isNaN(fL885)) { fL886 = fL886+fL885; }
					if(!isNaN(fL887)) { fL888 = fL888+fL887; }
					if(isNaN(fL881)) { fL881 = 0; }
					if(isNaN(fL883)) { fL883 = 0; }
					if(isNaN(fL885)) { fL885 = 0; }
					if(isNaN(fL887)) { fL887 = 0; }
				}
				var fL546, fL545, fL544;
				fL544=document.getElementById('movements').insertRow(2);
				fL546=fL544.insertCell(0); fL546.setAttribute("class","typ"); fL546.innerHTML="<span class=\"d1\">&nbsp;&nbsp;&nbsp;&nbsp;»&nbsp;&nbsp;</span>";
				fL545=fL544.insertCell(1); fL545.innerHTML="<div id=\"fL00G_g2D_fL899\" class=\"mov\"><span class=\"d1\" style=\"color:"+fL823+"\">&#931;("+fL998+") : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:"+fL821+"\">"+(fL888+fL886+fL884+fL882)+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				fL544=document.getElementById('movements').insertRow(2);
				fL546=fL544.insertCell(0); fL546.setAttribute("class","typ"); fL546.innerHTML="<span class=\"d1\">&nbsp;&nbsp;&nbsp;&nbsp;»&nbsp;&nbsp;</span>";
				fL545=fL544.insertCell(1); fL545.innerHTML="<div id=\"fL00G_g2D_fL897\" class=\"mov\"><span class=\"d1\" style=\"color:"+fL827+"\">"+fL837+" : "+fL888+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				fL544=document.getElementById('movements').insertRow(2);
				fL546=fL544.insertCell(0); fL546.setAttribute("class","typ"); fL546.innerHTML="<span class=\"d1\">&nbsp;&nbsp;&nbsp;&nbsp;»&nbsp;&nbsp;</span>";
				fL545=fL544.insertCell(1); fL545.innerHTML="<div id=\"fL00G_g2D_fL895\" class=\"mov\"><span class=\"d1\" style=\"color:"+fL825+"\">"+fL835+" : "+fL886+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				fL544=document.getElementById('movements').insertRow(2);
				fL546=fL544.insertCell(0); fL546.setAttribute("class","typ"); fL546.innerHTML="<span class=\"d1\">&nbsp;&nbsp;&nbsp;&nbsp;»&nbsp;&nbsp;</span>";
				fL545=fL544.insertCell(1); fL545.innerHTML="<div id=\"fL00G_g2D_fL893\" class=\"mov\"><span class=\"d1\" style=\"color:"+fL823+"\">"+fL833+" : "+fL884+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				fL544=document.getElementById('movements').insertRow(2);
				fL546=fL544.insertCell(0); fL546.setAttribute("class","typ"); fL546.innerHTML="<span class=\"d1\">&nbsp;&nbsp;&nbsp;&nbsp;»&nbsp;&nbsp;</span>";
				fL545=fL544.insertCell(1); fL545.innerHTML="<div id=\"fL00G_g2D_fL891\" class=\"mov\"><span class=\"d1\" style=\"color:"+fL821+"\">"+fL831+" : "+fL882+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>";
				fL556 = fL547 = fL546 = fL545 = fL544 = null;
				if(fL997<fL996) {
					fL897 = document.getElementById('fL00G_g2D_fL897');
					fL895 = document.getElementById('fL00G_g2D_fL895');
					fL893 = document.getElementById('fL00G_g2D_fL893');
					fL899 = document.getElementById('fL00G_g2D_fL899');
					fL891 = document.getElementById('fL00G_g2D_fL891');			
					fL556 = new XMLHttpRequest();
					fL558 = "cmd=loadTroopsOnTheWay&qid=1&limit=10&offset="+fL998+"&fromOrTo=to&timer=0&did="+fL775+"&showAllIncoming=1&showAllOutgoing=";
					fL556.abort();
					fL556.open("POST", fL557, true);
					fL556.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					fL556.setRequestHeader("Content-length", fL558.length);
					fL556.setRequestHeader("Connection", "close");
					fL556.onreadystatechange = function() { fL00G_g2D_2(); }
					fL556.send(fL558);
				}
			}
		}
		function fL00G_g2D_2() {
			if(fL556.readyState == 4 && fL556.status == 200) {
				fL555 = jsonParse(fL556.responseText);
				fL996 = parseInt(fL555.data.amount);
				fL998 = parseInt(fL555.data.shown);
				fL776 = fL555.data.troopHtml;
				fL778 = fL776;
				fL777 = "";
				fL997 = fL997 + fL998;
				for(fL547=0;fL547<fL998;fL547++) {
					fL777 = fL778.substr(fL778.search("<table class=\"troop_details inReturn\"")+37);
					fL777 = fL777.substr(0,fL777.search("</table>"));
					fL777 = fL777.substr(fL777.search("<tbody class=\"infos\">")+21);
					fL777 = fL777.substr(fL777.search("<span class=\"resource\" title=\"\">")+32);
					fL777 = fL777.substr(fL777.search("/>")+2);
					fL881 = parseInt(fL777.substr(0,fL777.search("<")-1));
					fL777 = fL777.substr(fL777.search("<span class=\"resource\" title=\"\">")+32);
					fL777 = fL777.substr(fL777.search("/>")+2);
					fL883 = parseInt(fL777.substr(0,fL777.search("<")-1));
					fL777 = fL777.substr(fL777.search("<span class=\"resource\" title=\"\">")+32);
					fL777 = fL777.substr(fL777.search("/>")+2);
					fL885 = parseInt(fL777.substr(0,fL777.search("<")-1));
					fL777 = fL777.substr(fL777.search("<span class=\"resource\" title=\"\">")+32);
					fL777 = fL777.substr(fL777.search("/>")+2);
					fL887 = parseInt(fL777.substr(0,fL777.search("<")-1));
					fL778 = fL778.substr(fL778.search("<table class=\"troop_details inReturn\"")+37);
					if(!isNaN(fL881)) { fL882 = fL882+fL881; }
					if(!isNaN(fL883)) { fL884 = fL884+fL883; }
					if(!isNaN(fL885)) { fL886 = fL886+fL885; }
					if(!isNaN(fL887)) { fL888 = fL888+fL887; }
					if(isNaN(fL881)) { fL881 = 0; }
					if(isNaN(fL883)) { fL883 = 0; }
					if(isNaN(fL885)) { fL885 = 0; }
					if(isNaN(fL887)) { fL887 = 0; }
				}
				fL547 = null;
				if(fL997<(fL999-9) ) fL899.innerHTML = "<span class=\"d1\" style=\"color:"+fL823+"\">&#931;("+fL997+") : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:"+fL821+"\">"+(fL888+fL886+fL884+fL882)+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				if(fL997>(fL999-10)) fL899.innerHTML = "<span class=\"d1\" style=\"color:"+fL823+"\">***&#931;("+fL997+")*** : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:"+fL821+"\">"+(fL888+fL886+fL884+fL882)+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				fL897.innerHTML = "<span class=\"d1\" style=\"color:"+fL827+"\">"+fL837+" : "+fL888+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				fL895.innerHTML = "<span class=\"d1\" style=\"color:"+fL825+"\">"+fL835+" : "+fL886+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				fL893.innerHTML = "<span class=\"d1\" style=\"color:"+fL823+"\">"+fL833+" : "+fL884+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				fL891.innerHTML = "<span class=\"d1\" style=\"color:"+fL821+"\">"+fL831+" : "+fL882+" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
				fL556 = null;
				if((fL997<fL996) && (fL997<(fL999-9))) {
					fL556 = new XMLHttpRequest();
					fL558 = "cmd=loadTroopsOnTheWay&qid=1&limit=10&offset="+fL997+"&fromOrTo=to&timer=0&did="+fL775+"&showAllIncoming=1&showAllOutgoing=";
					fL556.abort();
					fL556.open("POST", fL557, true);
					fL556.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					fL556.setRequestHeader("Content-length", fL558.length);
					fL556.setRequestHeader("Connection", "close");
					fL556.onreadystatechange = function() { fL00G_g2D_2(); }
					fL556.send(fL558);
				}
			}
		}
		//fL558 = fL557 = fL555 = fL837 = fL835 = fL833 = fL831 = fL821 = fL823 = fL825 = fL827 = fL897 = fL893 = fL895 = fL891 = fL899 = fL996 = fL998 = fL776 = fL777 = fL778 = fL775 = fL774 = fL773 = fL772 = fL881 = fL882 = fL883 = fL884 = fL885 = fL886 = fL887 = fL888 = fL997 = fL771 = fL999 = null;
	}


// ----------------------------------------------------------------------------------------------------------------

// json-sans-eval code : began
// This source code is free for use in the public domain.
// NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
// http://code.google.com/p/json-sans-eval/
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
 * @param {function (this:Object, string, *):*} opt_reviver optional function
 *     that reworks JSON objects post-parse per Chapter 15.12 of EcmaScript3.1.
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
    var topLevelPrimitive = false;
    if ('{' === tok) {
      result = {};
    } else if ('[' === tok) {
      result = [];
    } else {
      // The RFC only allows arrays or objects at the top level, but the JSON.parse
      // defined by the EcmaScript 5 draft does allow strings, booleans, numbers, and null
      // at the top level.
      result = [];
      topLevelPrimitive = true;
    }

    // If undefined, the key in an object key/value record to use for the next
    // value parsed.
    var key;
    // Loop over remaining tokens maintaining a stack of uncompleted objects and
    // arrays.
    var stack = [result];
    for (var i = 1 - topLevelPrimitive, n = toks.length; i < n; ++i) {
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
    if (topLevelPrimitive) {
      if (stack.length !== 1) { throw new Error(); }
      result = result[0];
    } else {
      if (stack.length) { throw new Error(); }
    }

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
// json-sans-eval code : ended