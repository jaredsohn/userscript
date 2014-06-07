// ==UserScript==
// @name        FP_search
// @namespace   yellowbluebus.com
// @include     http://focalpoint.*.net/fp/servlet/ElementManager*
// @exclude     http://focalpoint.*.net/fp/servlet/ElementManager?file=/elements/elemEdit.jsp*
// @version     1
// ==/UserScript==

function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}

var scriptCode = new Array();

scriptCode.push('function doHackSearch() {');
scriptCode.push('    getPopupParams("search");');
scriptCode.push('    if (! isNaN(document.postForm.searchString.value)) {');
scriptCode.push('        if (document.postForm.searchString.value.length == 3) {');
scriptCode.push('            document.postForm.searchString.value = "0" + document.postForm.searchString.value;');
scriptCode.push('        }');
scriptCode.push('    }');
scriptCode.push('    var url = "../servlet/ForwardController"');
scriptCode.push('            + "?file=/search/searchIndex.jsp&handleTempFilter=true"');
scriptCode.push('            + "&sId=" + searchId');
scriptCode.push('            + "&winId=searchWindow"');
scriptCode.push('            + "&sString=" + encodeURIComponent(document.postForm.searchString.value)');
scriptCode.push('            + "&" + getCurrentProjectParameter();');
scriptCode.push('    parent.window.frames["main"].location=url;');
scriptCode.push('}');
var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
script.setAttribute('type', 'text/javascript');
scriptCode.length = 0;                            // recover the memory we used to build the script

document.getElementsByTagName('head')[0].appendChild(script); 
//alert(document.getElementsByTagName('head')[0].innerHTML);
//alert('|'+ $x('//html/body/form')[0].name + '|');
var frm = $x('//html/body/form')[0];
if (frm != null) {
    if (frm.name == 'postForm') {
        if (frm.attributes[0].name == 'onsubmit') {
            frm.attributes[0].value = 'doHackSearch(); return false;';
            frm.addEventListener('submit', function(e) {
                doHackSearch();
                e.stopPropagation();
                e.preventDefault();
            }, true);
        }
    }
}

var scriptCode2 = new Array();
scriptCode2.push('function editLinkAttribute1(domId, elemId, attrId, divId) {');
scriptCode2.push('    getPopupParams("linkedit");');
scriptCode2.push('    var url = "../servlet/ElementManager" ');
scriptCode2.push('        + "?file=/elements/attrLinkList.jsp"');
scriptCode2.push('        + "&FPaction=" ');
scriptCode2.push('        + "&domType=" + domType ');
scriptCode2.push('        + "&domId=" + domId');
scriptCode2.push('        + "&elemId=" + elemId ');
scriptCode2.push('        + "&attrId=" + attrId ');
scriptCode2.push('        + "&divId=" + divId');
scriptCode2.push('        + "&isListAttr=false" ');
scriptCode2.push('        + "&fromVerify=" + fromVerify');
scriptCode2.push('        + "&displayHistoryIcons=" + displayHistoryIcons ');
scriptCode2.push('        + "&hasTree=" + hasTree ');
scriptCode2.push('        + "&fromAddMenu=" + fromAddMenu ');
scriptCode2.push('        + "&winId=null"');
scriptCode2.push('        + "&t="+(new Date()).getTime()');
scriptCode2.push('        + "&" + getCurrentProjectParameter();');
scriptCode2.push('    var winName = "linkEditWindow" + "_" + divId;');
scriptCode2.push('    linkEditWindow = open(url, winName, getWinProps());');
scriptCode2.push('    linkEditWindow.opener = self;');
scriptCode2.push('    if (linkEditWindow.opener == null)');
scriptCode2.push('        linkEditWindow.opener = self;');
scriptCode2.push('    linkEditWindow.focus();');
scriptCode2.push('}');
var script2 = document.createElement('script');    // create the script element
script2.innerHTML = scriptCode2.join('\n');         // add the script code to it
script2.setAttribute('type', 'text/javascript');
scriptCode2.length = 0;                            // recover the memory we used to build the script
document.getElementsByTagName('head')[0].appendChild(script2); 

var scriptCode3 = new Array();
scriptCode3.push('function viewLinkedElem(projectId, domId, elemId, pDomType) ');
scriptCode3.push('{');
scriptCode3.push('    if (pDomType == null) {');
scriptCode3.push('        pDomType = "mod";');
scriptCode3.push('    }');
scriptCode3.push('    getPopupParams("popup");');
scriptCode3.push('    var url = "../servlet/ElementManager?file=/elements/";');
scriptCode3.push('    if (projectId != currentProjectId) {');
scriptCode3.push('       url += "displayElementIndex.jsp" ');
scriptCode3.push('            + "&FPaction=getElement"');
scriptCode3.push('            + "&projectId=" + projectId');
scriptCode3.push('            + "&domId=" + domId');
scriptCode3.push('            + "&elemId=" + elemId');
scriptCode3.push('            + "&hasTree=false"');
scriptCode3.push('            + "&domType=" + pDomType');
scriptCode3.push('            + "&useFilter=false"');
scriptCode3.push('            + "&winId=linkedElemWindow"');
scriptCode3.push('            + "&" + getCurrentProjectParameter();');
scriptCode3.push('    } else if (isAdmin) {');
scriptCode3.push('       url += "editModuleElementIndex.jsp" ');
scriptCode3.push('            + "&projectId=" + projectId');
scriptCode3.push('            + "&domId=" + domId');
scriptCode3.push('            + "&elemId=" + elemId');
scriptCode3.push('            + "&fromVerify=true"');
scriptCode3.push('            + "&hasTree=false"');
scriptCode3.push('            + "&domType=" + pDomType');
scriptCode3.push('            + "&useFilter=false"');
scriptCode3.push('            + "&winId=linkedElemWindow"');
scriptCode3.push('            + "&" + getCurrentProjectParameter();');
scriptCode3.push('    } else {');
scriptCode3.push('        url = "../servlet/ElementManager"');
scriptCode3.push('            + "?file=/elements/editFromSearchIndex.jsp"');
scriptCode3.push('            + "&checkDom=true"');
scriptCode3.push('            + "&useFilter=false"');
scriptCode3.push('            + "&projectId=" + projectId');
scriptCode3.push('            + "&domId=" + domId');
scriptCode3.push('            + "&elemId=" + elemId');
scriptCode3.push('            + "&domType=" + pDomType');
scriptCode3.push('            + "&winId=linkedElemWindow"');
scriptCode3.push('            + "&" + getCurrentProjectParameter();');
scriptCode3.push('    }');
scriptCode3.push('    parent.window.frames["main"].location=url;');
scriptCode3.push('}    ');

var script3 = document.createElement('script');    // create the script element
script3.innerHTML = scriptCode3.join('\n');         // add the script code to it
script3.setAttribute('type', 'text/javascript');
scriptCode3.length = 0;                            // recover the memory we used to build the script
document.getElementsByTagName('head')[0].appendChild(script3); 

//alert('ddd');
