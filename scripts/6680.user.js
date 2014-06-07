// Copyright 2006 David Wilkinson. All Rights Reserved.

// ==UserScript==
// @name          Escape HTML Entities in TextAreas
// @namespace     http://www.dopiaza.org/tools/greasemonkey/escapeentities/
// @description   Escape HTML Entities in TextAreas
// @include       *
// ==/UserScript==

function updateTextAreas()
{
    // Find textareas
    var textareas = document.evaluate(
      "//textarea",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

    for (var i = 0; i < textareas.snapshotLength; i++)
    {
        addHandlerLink(textareas.snapshotItem(i));
    }    
    
}

function addHandlerLink(textarea)
{
    var icon = "data:image/gif,GIF89a%0F%00%0F%00%A2%00%00%CC%CC%CC%D6%D6%D6%FF%FF%FF%E6%E6%E6%DD%DD%DD%EF%EF%EF%FF%FF%FF%00%00%00!%F9%04%05%14%00%06%00%2C%00%00%00%00%0F%00%0F%00%00%03PhjE%F0%A4%AC%25%C2%BB%2F%08z%8B%F8%85%05l%86%A5%85%40%E0%99%CC%238%18Q%01%0D%5D%60%DD%0D%CFc%0F%C8%18%81%EB%22%F4%B9D%C2%22%F0g%C3%3D%0A%BA%DB%08v%19%CC%24%26A(%10%99%05%14E%DAG%8B%A4%88p%9A%89%A2%06%91%2C%12%00%3B";
    var span = document.createElement('span');
    var a = document.createElement('a');
    var img = document.createElement('img');
    img.setAttribute("src", icon);
    img.setAttribute("border", "0");
    img.setAttribute("alt", "Escape HTML Entities");
    img.setAttribute("title", "Escape HTML Entities");
    img.style.marginLeft = "3px";
    a.setAttribute("href", "#");
    a.setAttribute("title", "Escape HTML Entities");        
    a.appendChild(img);
    a.addEventListener("click", function(evt)
    {
        escapeEntities(textarea);
    }, false);    
    span.appendChild(a);
    if (textarea.nextSibling == null)
    {
        textarea.parentNode.appendChild(span);
    }
    else
    {
        textarea.parentNode.insertBefore(span, textarea.nextSibling);
    }
}

function escapeEntities(textarea)
{
    var start = textarea.selectionStart;
    var end = textarea.selectionEnd;
    var val = textarea.value;
    var len = val.length;
    var pos = textarea.scrollTop;
    var selectionMade = true;
    
    if (start == end)
    {
        start = 0;
        end = len;
        selectionMade = false;
    }
    
    var s = val.slice(start, end);
   
    s = s.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/"/g, "&quot;");
    
    var pre = val.slice(0, start);
    var post = val.slice(end, len);
    
    textarea.value = pre + s + post;
    if (selectionMade)
    {
        textarea.selectionStart = start;
        textarea.selectionEnd = start + s.length;
    }   
    textarea.scrollTop = pos;
}

window.addEventListener("load", 
    function () 
    {
        updateTextAreas();
	}, false
);

