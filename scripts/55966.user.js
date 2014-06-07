// ==UserScript==
// @name           HumanReadableJSON
// @namespace      com.ap
// ==/UserScript==

/*
This greasemonkey script is a combination of 4 efforts:
1. prettyJSON code from http://www.matsblog.com/stories/2075888 [to format json (primarily indentation)]
2. Brenton Flechers code from http://json.bloople.net [for json to HTML conversion]
3. My own effort to handle the GM integration for plain text and html responses, all the CSS, and additional features like array count etc (pandeyas)
4. JSONPath code from http://code.google.com/p/jsonpath/ [for json query/navigation]
5. My own effort to handle the GM integration for JSONPath eval and themes etc (sinja)

To install, just add it as a GM script in FF and setup your JSON vending URLs as include list
*/

var maxArrayRows = 10;

/*
JSON pretty print borrowed and slightly modified from http://www.matsblog.com/stories/2075888/
*/
(function () {
    var INTEND = "    ";
    var NEWLINE = "\n";
    var pPr = false;
    var intendLevel = 0;
    var intend = function(a) {
        if (!pPr) return a;
        for (var l=0; l<intendLevel; l++) {
            a[a.length] = INTEND;
        }
        return a;
    };

    var newline = function(a) {
        if (pPr) a[a.length] = NEWLINE;
        return a;
    };

    var m = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        s = {
            array: function (x) {
                var a = ['['], b, f, i, l = x.length, v;
                a = newline(a);
                intendLevel++;
                for (i = 0; i < l; i += 1) {
                    v = x[i];
                    f = s[typeof v];
                    if (f) {
                        v = f(v);
                        if (typeof v == 'string') {
                            if (b) {
                                a[a.length] = ',';
                                a = newline(a);
                            }
                            a = intend(a);
                            a[a.length] = v;
                            b = true;
                        }
                    }
                }
                intendLevel--;
                a = newline(a);
                a = intend(a);
                a[a.length] = ']';
                return a.join('');
            },
            'boolean': function (x) {
                return String(x);
            },
            'null': function (x) {
                return "null";
            },
            number: function (x) {
                return isFinite(x) ? String(x) : 'null';
            },
            object: function (x, formatedOutput) {
                if (x) {
                    if (x instanceof Array) {
                        return s.array(x);
                    }
                    var a = ['{'], b, f, i, v;
                    a = newline(a);
                    intendLevel++;
                    for (i in x) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == 'string') {
                                if (b) {
                                    a[a.length] = ',';
                                    a = newline(a);
                                }
                                a = intend(a);
                                a.push(s.string(i), ((pPr) ? ': ' : ':'), v);
                                b = true;
                            }
                        }
                    }
                    intendLevel--;
                    a = newline(a);
                    a = intend(a);
                    a[a.length] = '}';
                    return a.join('');
                }
                return 'null';
            },
            string: function (x) {
                if (/["\\\x00-\x1f]/.test(x)) {
                    x = x.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                        var c = m[b];
                        if (c) {
                            return c;
                        }
                        c = b.charCodeAt();
                        return '\\u00' +
                            Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    });
                }
                return '"' + x + '"';
            }
        };

    Object.prototype.toJSONString = function (prettyPrint) {
        pPr = prettyPrint;
        return s.object(this);
    };

    Array.prototype.toJSONString = function (prettyPrint) {
        pPr = prettyPrint;
        return s.array(this);
    };
})();


//Code copyright (c) Brenton Fletcher 2006-2007.
//Check out my portfolio at http://www.3tree.info

function $(ele)
{
   var t = document.getElementById(ele);
   if(t == null) t = document.getElementsByName(ele);
   if(t.length == 1) t = t.item(0);
   return t;
}

function escapeHTML(str)
{
   //code portion borrowed from prototype library
   var div = document.createElement('div');
   var text = document.createTextNode(str);
   div.appendChild(text);
   return div.innerHTML;
   //end portion
}

function wordwrap(str)
{
   parts = str.split(" ");
   for(i = 0; i < parts.length; i++)
   {
      if(parts[i].length <= 255) continue;

      t = parts[i].length;
      p = "";

      while(t > 255)
      {
          p += parts[i].substr(t - 255, t) + "<wbr />";
          t -= 255;
      }
      parts[i] = p;
   }
   return parts.join(" ");
}

var elementCount = 0;
var arrayCount = 0;
var objectCount = 0;
var nestingLevel = 0;

function parseValue(val, parent, level)
{
   elementCount++;
   if(parent == null) parent = "";
   if(level == null) level = 1;

   if(typeof(val) == "object")
   {
      if(level > nestingLevel) nestingLevel = level;
      if(val instanceof Array)
      {
         arrayCount++;
         parent = parent + (parent != "" ? " > " : "") + "Array (" + val.length + " item" + (val.length != 1 ? "s)" : ")");

         var out = "<div class='wrap'>\n";

         if(val.length > 0)
         {
            out += "<table class='arraytable'>\n";
            var elementCount = 0;
            
            var isLargeArray = (val.length > maxArrayRows);
            
            for(prop in val)
            {
               if(typeof(val[prop]) == "function") continue;
               if( isLargeArray) {
               	arraySizeCell = (elementCount == 0) ? "<td class='arraysize' rowspan='" + (maxArrayRows+1) + "'>" + maxArrayRows + " (" + val.length + ")</td>" : ""
               }
               else {
               	arraySizeCell = (elementCount == 0) ? "<td class='arraysize' rowspan='" + val.length + "'>" + val.length + "</td>" : ""
               }
               
               out += "<tr class='arrayrow'>" + arraySizeCell + "<td class='arraycell'>" + parseValue(val[prop], parent, level + 1) + "</td></tr>\n";
               elementCount++;
               
               if(isLargeArray && elementCount == maxArrayRows) {
               	out += "<tr class='arrayrow'>" + arraySizeCell + "<td class='arraycell'>... " + (val.length-maxArrayRows) + " more Array Rows ...</td></tr>\n";
               	break;
               }               
            }
            
            out += "</table>\n";
         }
         else
         {
            
            return "(empty <span class='titled' title='" + parent + "'>Array</span>)\n";
         }
         
         out += "</div>\n</div>\n";
         return out;
      }
      else
      {
         objectCount++;
         i = 0;
         for(prop in val)
         {
            if(typeof(val[prop]) != "function") i++;
         }

         parent = parent + (parent != "" ? " > " : "") + "Object (" + i + " item" + (i != 1 ? "s)" : ")");

         var out = "<div class='wrap'>\n";
         
         if(i > 0)
         {
            out += "<table class='objecttable'>\n";
            for(prop in val)
            {
               if(typeof(val[prop]) == "function") continue;
               out += "<tr><td class='propCell'>" + prop + "</td><td class='valueCell'>" + parseValue(val[prop], parent, level + 1) + "</td></tr>\n";
            }
            
            out += "</table><div class='clear'></div>\n";
         }
         else
         {
            return "(empty <span class='titled' title='" + parent + "'>Object</span>)\n";
         }
         
         out += "</div>\n</div>\n";
         return out;
      }
   }
   else
   {
      if(typeof(val) == "string") return "<span class='string'>" + wordwrap(val.replace(/\n/g, "<br />")) + "</span>";
      else if(typeof(val) == "number") return "<span class='number'>" + val + "</span>";
      else if(typeof(val) == "boolean") return "<span class='boolean'>" + val + "</span>";
      else return "<span class='void'>(null)</span>";
   }
}

function parse(str)
{
   elementCount = 0;
   arrayCount = 0;
   objectCount = 0;

   var obj = null;
   try
   {
      obj = str.parseJSON();
   }
   catch(e)
   {
      if(e instanceof SyntaxError)
      {
         alert("There was a syntax error in your JSON string.\n" + e.message + "\nPlease check your syntax and try again.");
         return;
      }

      alert("There was an unknown error. Perhaps the JSON string contained a deep level of nesting." + e);
      return
   }

   var parsed = {};
   parsed.obj = obj;
   parsed.html = parseValue(obj, null, null);
   return parsed;
}

String.prototype.parseJSON = function () {
    try {
        return !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(
                this.replace(/"(\\.|[^"\\])*"/g, ''))) &&
            eval('(' + this + ')');
    } catch (e) {
        return false;
    }
};


/* JSONPath 0.8.0 - XPath for JSON
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 * http://code.google.com/p/jsonpath/
 */
/*
function jsonPath(obj, expr, arg) {
   var P = {
      resultType: arg && arg.resultType || "VALUE",
      result: [],
      normalize: function(expr) {
         var subx = [];
         return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
      },
      asPath: function(path) {
         var x = path.split(";"), p = "$";
         for (var i=1,n=x.length; i<n; i++)
            p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
         return p;
      },
      store: function(p, v) {
         if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
         return !!p;
      },
      trace: function(expr, val, path) {
         if (expr) {
            var x = expr.split(";"), loc = x.shift();
            x = x.join(";");
            if (val && val.hasOwnProperty(loc))
               P.trace(x, val[loc], path + ";" + loc);
            else if (loc === "*")
               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
            else if (loc === "..") {
               P.trace(x, val, path);
               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
            }
            else if (/,/.test(loc)) { // [name1,name2,...]
               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                  P.trace(s[i]+";"+x, val, path);
            }
            else if (/^\(.*?\)$/.test(loc)) // [(expr)]
               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
            else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
               P.slice(loc, x, val, path);
         }
         else
            P.store(path, val);
      },
      walk: function(loc, expr, val, path, f) {
         if (val instanceof Array) {
            for (var i=0,n=val.length; i<n; i++)
               if (i in val)
                  f(i,loc,expr,val,path);
         }
         else if (typeof val === "object") {
            for (var m in val)
               if (val.hasOwnProperty(m))
                  f(m,loc,expr,val,path);
         }
      },
      slice: function(loc, expr, val, path) {
         if (val instanceof Array) {
            var len=val.length, start=0, end=len, step=1;
            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
            for (var i=start; i<end; i+=step)
               P.trace(i+";"+expr, val, path);
         }
      },
      eval: function(x, _v, _vname) {
         try { return $ && _v && eval(x.replace(/@/g, "_v")); }
         catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
      }
   };

   var $ = obj;
   if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
      P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
      return P.result.length ? P.result : false;
   }
} 
*/

/*
 * Custom GM scripts start here
 */

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "");
}

function togglePanel(myBtn, panelId) {
    var panel = $(panelId)
    if( panel.style.display == 'none') {
        myBtn.innerHTML = myBtn.innerHTML.replace('Show ', '');
        panel.style.display = '';
    } else {
        myBtn.innerHTML = "Show " + myBtn.innerHTML;
        panel.style.display = 'none';
    }
}

/*
function updateJsonPathResultPanel() {
        var expr = $('jsonPathExpr').value.trim();
        var resultPanel = $('jsonPathResultPanel');
        if (expr.length != 0 ) {
            //raw JSON printing
            resultPanel.innerHTML = parse(jsonPath(parsedResult.obj, expr).toJSONString(), null).html;
            resultPanel.style.display = '';
        } else {
            resultPanel.innerHTML = ''
            resultPanel.style.display = 'none';
        }
}

function addJSONPathPanel(result) {
    var jsonPathHeader = document.createElement('div');
    jsonPathHeader.innerHTML = 'JSONPath : ';
    jsonPathHeader.id = "jsonPathToggleBtn";
    jsonPathHeader.className = "panelHeader";
    
    var jsonPathInput = document.createElement('input');
    jsonPathInput.type = "text";
    jsonPathInput.id = "jsonPathExpr";
    jsonPathInput.style.width = "75%";
    jsonPathInput.style.bgcolor = "#AAAAAA";
    jsonPathInput.addEventListener("blur", function(e) { updateJsonPathResultPanel(); }, false);
    
    var jsonPathResultPanel = document.createElement('div');
    jsonPathResultPanel.id = "jsonPathResultPanel";
    jsonPathResultPanel.className = "panelBody";
    jsonPathResultPanel.style.display = "none";
    
    document.body.appendChild(jsonPathHeader);
    document.body.appendChild(jsonPathResultPanel);
    jsonPathHeader.appendChild(jsonPathInput);
}
*/

function addResultPanel(result) {
    var myHeader = document.createElement('div');
    myHeader.className = "panelHeader";

    var resultPanel = document.createElement('div');
    resultPanel.id = "resultPanel";
    resultPanel.innerHTML = result.html;
    
    document.body.appendChild(myHeader);
    document.body.appendChild(resultPanel);
}


function addOrigJSONPanels(jsonText) {
    var myBtn = document.createElement('div');
    myBtn.innerHTML = "Show Original JSON";
    myBtn.id = "origToggleBtn";
    myBtn.className = "panelHeader";
    myBtn.addEventListener("click", function(e) { togglePanel(e.target, "origJSONPanel"); }, false);
    
    var origPanel = document.createElement('div');
    origPanel.id = "origJSONPanel";
    origPanel.innerHTML = jsonText;
    origPanel.className = "panelBody";
    origPanel.style.display = "none";
    
    document.body.appendChild(myBtn);
    document.body.appendChild(origPanel);
}

function addPrettyJSONPanel(jsonText) {
    var myBtn = document.createElement('div');
    myBtn.innerHTML = "Show Pretty JSON";
    myBtn.id = "pjToggleBtn";
    myBtn.className = "panelHeader";
    myBtn.addEventListener("click", function(e) { togglePanel(e.target, "prettyJSONPanel"); }, false);
    
    var pjPanel = document.createElement('div');
    pjPanel.id = "prettyJSONPanel";
    pjPanel.className = "panelBody";
    pjPanel.style.display = "none";
    
    document.body.appendChild(myBtn);
    document.body.appendChild(pjPanel);
    
    setPrettyJson(jsonText);
}

function setPrettyJson(jsonText) {
		document.getElementById('prettyJSONPanel').innerHTML = '<pre class="panelBody">' + jsonText.parseJSON().toJSONString(true) + '</pre>';
}

function addCustomJSONPanel() {
    var myBtn = document.createElement('div');
    myBtn.innerHTML = "Render Custom JSON";
    myBtn.id = "cjToggleBtn";
    myBtn.className = "panelHeader";
    myBtn.addEventListener("click", function(e) { togglePanel(e.target, "customJSONPanel"); }, false);
    
    var cjPanel = document.createElement('div');
    cjPanel.id = "customJSONPanel";
    cjPanel.innerHTML = '<textarea style="margin-bottom: 10px;" id="cjTxtArea" rows="10" cols="100">' + jsonText.parseJSON().toJSONString(true) + 
    												'</textarea><br>'; 
    cjPanel.className = "panelBody";    
    cjPanel.style.display = "none";
    
    var renderBtn = document.createElement('span');
    renderBtn.innerHTML = "Render Custom JSON";
    renderBtn.id = "cjRenderBtn";
    renderBtn.className = "pushButton";
    renderBtn.addEventListener("click", loadCustomJson, false);
    cjPanel.appendChild(renderBtn);
    
    document.body.appendChild(myBtn);
    document.body.appendChild(cjPanel);
}

function loadCustomJson() {
		var jsonText = document.getElementById('cjTxtArea').value;
		var result = parse(jsonText, null);
		
		if( !isValidJsonHtml(parsedResult)) {
				alert("not valid json");
				return;
		}
		
		// refresh formatted json
		document.getElementById('resultPanel').innerHTML = result.html;
		
		// refresh pretty json
		setPrettyJson(jsonText);
		
		// refresh raw json
		document.getElementById('origJSONPanel').innerHTML = jsonText;	
}

function overideDocBodyInnerHtml(innerHtml) {
        if( document.contentType == 'text/html') {
                document.body.innerHTML = innerHtml;
        }
        else {
                document.write(innerHtml);
                document.close();
        } 
}

function addControlPanel() {
    var myBtn = document.createElement('div');
    myBtn.innerHTML = "Control Panel";
    myBtn.id = "cpToggleBtn";
    myBtn.className = "panelHeader";
    myBtn.addEventListener("click", function(e) { togglePanel(e.target, "controlPanel"); }, false);
    
    var cpPanel = document.createElement('div');
    cpPanel.id = "controlPanel";
    cpPanel.innerHTML = "<input type='text' class='textInput' size='8' id='arrLotSizeInp' value='" + maxArrayRows + "'/> ";
    cpPanel.className = "panelBody";    
    cpPanel.style.display = "none";
    
    var resizeArrLimitBtn = document.createElement('span');
    resizeArrLimitBtn.innerHTML = "Reset Max Array Limit";
    resizeArrLimitBtn.id = "cpResizeArrBtn";
    resizeArrLimitBtn.className = "pushButton";
    resizeArrLimitBtn.addEventListener("click", resetMaxArraySize, false);
    cpPanel.appendChild(resizeArrLimitBtn);
    
    document.body.appendChild(myBtn);
    document.body.appendChild(cpPanel);
}

function resetMaxArraySize() {
		var newLimit = 10;
		newLimit = tryParseInt( document.getElementById('arrLotSizeInp').value, 10);
		document.getElementById('arrLotSizeInp').value = "" + newLimit;
		
		maxArrayRows = newLimit;

		// read back orig json, and format it again
		var origJson = document.getElementById('origJSONPanel').innerHTML;
		var result = parse(origJson, null);
		
		if( !isValidJsonHtml(parsedResult)) {
				alert("not valid json");
				return;
		}
		
		// refresh formatted json
		document.getElementById('resultPanel').innerHTML = result.html;				
}

function tryParseInt(str,defaultValue){

		var retValue = defaultValue;

		if(typeof str != 'undefined' && str!=null && str.length>0){
				if (!isNaN(str)){
						retValue = parseInt(str);
				}
		}

		return retValue;
}

function addTheme(gmTheme) {
        for (i in gmTheme.styles) {
            GM_addStyle(gmTheme.styles[i]);
        }
}

function GMTheme(name, styles){
    this.name=name;
    this.styles=styles;
}

GMTheme.DEFAULT = new GMTheme("Default",[
        'body { color: #ffffff; background-color: #333333; font-family: monospace; font-size: small; font-style: normal; font-weight: normal; word-wrap: break-word;}',
        '.objecttable td { margin: 0px; padding: 0px 0px 0px 5px; background-color: #444444; }',
        '.wrap { background-color: #336666; display: table; margin: 0px; width: 100%; }',
        'table.arrayTable { margin: 0 0 0 0px; border-right: 5px solid #334444; }',
        'table.arrayTable tr.arrayrow { padding: 0px; }',
        'table.arrayTable td.firstcell { border-top: 2px solid #336666; }',
        'table.arrayTable td.arraycell { margin-left: 2px; padding: 0px 0px 2px 0px; background-color: #336666; }',
        'table.arrayTable td.arraysize { padding: 3px; width: 5px; background-color: #334444; vertical-align: top; color: ff9900; font-weight: bold; border-left: 1px solid #336666;}',
        'td.propCell { padding: 1px 2px; }',
        'td.valueCell { font-weight: bold; background-color: #222222; border-bottom: 1px solid #333333; width: 100%; }',
        '.string { margin: 0px; color: #ffffff; }',
        '.number { color: #00ffff; }',
        '.boolean { color: #ff8000; }',
        '.void { color: #000fff; }',
        'table { border: 0px solid #000000; width: 100%; border-collapse: collapse;}',
        'table td, table th { padding: 0px; border-bottom: 1px solid #333333; vertical-align: middle; }',
        '.clear { clear: both; }',
        '.lfloat { float: left; }',
        '.rfloat { float: right; }',
        'div.panelHeader { width: 98%; background-color: #444444; border-bottom: 1px solid #333333; color: #cccccc; padding: 0 10px; margin-top: 20px; font-size: x-large; font-weight: bold; }',
        'div.panelBody { width: 98%; background-color: #222222; margin: 0px; padding: 10px; }',
        'pre.panelBody { font-family: monospace; font-size: large; font-weight: normal; padding: 0; margin: 0; }',
        '.textInput { border: 1px solid #ccc; background-color: #aaa; }',
        'span.pushButton { background-color: #000000; border: 1px solid #aaaaaa; font-family: arial; font-size: 12px; font-weight: bold; padding: 4px; }'
]);

GMTheme.TEAM_CITY = new GMTheme("TeamCity",[
        'body { color: #3F72D0; background-color: #ffffff; font-family: monospace; font-size: small; font-style: normal; font-weight: normal; word-wrap: break-word;}',
        '.objecttable td { margin: 0px; padding: 0px 0px 0px 5px; background-color: #E3E9EF; }',
        '.wrap { background-color: #BFCFE2; display: table; margin: 0px; width: 100%; }',
        'table.arrayTable { margin: 0 0 0 0px; border-right: 5px solid #BFCFE2;}',
        'table.arrayTable tr.arrayrow { padding: 0px; }',
        'table.arrayTable td.firstcell { border-top: 2px solid #BFCFE2; }',
        'table.arrayTable td.arraycell { margin-left: 2px; padding: 0px 0px 2px 0px; background-color: #BFCFE2; }',
        'table.arrayTable td.arraysize { padding: 3px; width: 5px; background-color: #666769; vertical-align: top; color: #ff8000; font-weight: bold; border-left: 1px solid #BFCFE2;}', //border-bottom: 1px solid #BFCFE2; 
        'td.propCell { padding: 1px 2px; }',
        'td.valueCell { font-weight: bold; background-color: #ffffff; border-bottom: 1px solid #BFCFE2; width: 100%; }',
        '.string { margin: 0px; color: #3F72D0; }',
        '.number { color: #3F72D0; }',
        '.boolean { color: #ff8000; }',
        '.void { color: #000fff; }',
        'table { border: 0px solid #000000; width: 100%; border-collapse: collapse;}',
        'table td, table th { padding: 0px; border-bottom: 1px solid #BFCFE2; vertical-align: middle; }',
        '.clear { clear: both; }',
        '.lfloat { float: left; }',
        '.rfloat { float: right; }',
        'div.panelHeader { width: 98%; background-color: #666769; border-bottom: 1px solid #BFCFE2; color: #cccccc; padding: 0 10px; margin-top: 20px; font-size: x-large; font-weight: bold; }',
        'div.panelBody { width: 98%; background-color: #E3E9EF; margin: 0px; padding: 10px; }',
        'pre.panelBody { font-family: monospace; font-size: 10px; font-weight: normal; padding: 0; margin: 0; }',
        'span.pushButton { background-color: #000000; border: 1px solid #aaaaaa; font-family: arial; font-size: 12px; font-weight: bold; padding: 4px; }'
]);

function isValidJsonHtml( jsonHtml) {
		if(jsonHtml.html == "<span class='boolean'>false</span>") {        
			return false;
		}
		return true;
}

var parsedResult;

window.addEventListener(
    'load', 
	  function() {

    	jsonTag = document.getElementsByTagName('pre')[0];
    	if (!jsonTag) {
                        if(document.contentType == 'text/html' || 
                        	 document.contentType == 'application/json') {
                                jsonTag = document.body;
                        } else if (!jsonTag) {
                                return;
                        }
        }
        jsonText = jsonTag.textContent;

        if(jsonText == '') {
            return;
        }
        
        parsedResult = parse(jsonText, null);
        
        if( !isValidJsonHtml(parsedResult)) {
            return;
        }
        
        if(parsedResult.html != null) {
            overideDocBodyInnerHtml('');
            
            // addJSONPathPanel(parsedResult);                
            addResultPanel(parsedResult);                    
            addPrettyJSONPanel(jsonText);            
            addOrigJSONPanels(jsonText);      
        }
        
        addCustomJSONPanel();
        addControlPanel();
        
				// addTheme(GMTheme.TEAM_CITY);
		    addTheme(GMTheme.DEFAULT);
    },
    true);

// vim: ts=4 sw=4 expandtab