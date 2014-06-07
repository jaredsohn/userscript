// ==UserScript==
// @name        FP_search_results
// @namespace   yellowbluebus.com
// @include     http://focalpoint.*.net/fp/servlet/ForwardController?file=/search/searchResult.jsp*
// @version     1
// ==/UserScript==

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
//scriptCode3.push('    alert(parent.window.frames[2].name);');
scriptCode3.push('    parent.window.frames["center"].location=url;');
scriptCode3.push('}    ');

var script3 = document.createElement('script');    // create the script element
script3.innerHTML = scriptCode3.join('\n');         // add the script code to it
script3.setAttribute('type', 'text/javascript');
scriptCode3.length = 0;                            // recover the memory we used to build the script
document.getElementsByTagName('head')[0].appendChild(script3); 

