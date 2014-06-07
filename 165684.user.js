// ==UserScript==
// @name        Fix pinvoke.net
// @namespace   www.dwedit.org
// @include     http://*.pinvoke.net/*
// @version     1
// ==/UserScript==

var scriptCode = new Array();

scriptCode.push('function fixLinks()');
scriptCode.push('{');
scriptCode.push('');
scriptCode.push('    var documentLinks = document.getElementsByTagName("a");');
scriptCode.push('    var lookFor = "javascript:showFunction";');
scriptCode.push('    ');

scriptCode.push('    for (var i = 0; i < documentLinks.length; i++)');
scriptCode.push('    {');
scriptCode.push('        var docLink = documentLinks[i];');
scriptCode.push('        var url = docLink.href;');
scriptCode.push('        var foundIndex = url.indexOf(lookFor);');
scriptCode.push('        if (foundIndex != -1)');
scriptCode.push('        {');
scriptCode.push('            var indexOfFirstWord = url.indexOf("\'", 0);');
scriptCode.push('            if (indexOfFirstWord == -1) break;');
scriptCode.push('            indexOfFirstWord++;');

scriptCode.push('            var endOfFirstWord = url.indexOf("\'", indexOfFirstWord);');
scriptCode.push('            if (endOfFirstWord == -1) break;');

scriptCode.push('            var indexOfSecondWord = url.indexOf("\'", endOfFirstWord+1);');
scriptCode.push('            if (indexOfSecondWord == -1) break;');
scriptCode.push('            indexOfSecondWord++;');

scriptCode.push('            var endOfSecondWord = url.indexOf("\'", indexOfSecondWord);');
scriptCode.push('            if (endOfSecondWord == -1) break;');

scriptCode.push('            var firstWord = url.substr(indexOfFirstWord,endOfFirstWord-indexOfFirstWord);');
scriptCode.push('            var secondWord = url.substr(indexOfSecondWord,endOfSecondWord-indexOfSecondWord);');

scriptCode.push('            var newUrl = "/default.aspx/" + firstWord + "." + secondWord;');
scriptCode.push('            docLink.href = newUrl;');
scriptCode.push('        }');
scriptCode.push('    }');

scriptCode.push('}');

scriptCode.push('function expandModule(e) {');
scriptCode.push('    if (browser == "IE")');
scriptCode.push('        url = "/GetPagesInModule.aspx?module=" + e.parentElement.children[0].id;');
scriptCode.push('    else');
scriptCode.push('        url = "/GetPagesInModule.aspx?module=" + e.parentNode.childNodes[0].id;');
scriptCode.push('        addLinks(e, url);');
scriptCode.push('        fixLinks();');
scriptCode.push('}');
var script = document.createElement('script'); 
script.type = "text/javascript"; 
script.innerHTML = scriptCode.join('\n');
document.getElementsByTagName('head')[0].appendChild(script);
