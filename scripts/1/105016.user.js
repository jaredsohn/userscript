// Created by Wolverinex02 (http://wolverinex02.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// transform latex equation between '$$' in LaTeX pics by using http://www.codecogs.com/gif.latex?
// This script works thanks the excellent site: http://www.forkosh.com

// Jan-30-2009: Undo added by Mathman (http://lifeandmath.blogspot.com/)
// mimeTeX server forkosh.com has closed its hosting to the public. As of this
// editing time, codecogs.com has been generous enough to offer this service.
// We blogger-ers without private mimeTeX servers are in debt to you, codecogs.

// Dec-16-2009: Works in Edit HTML modes and Compose mode of the updated editor by stmct. (htpp://satomacoto.blogspot.com/)

// Jun-18-2011: Uses Google Chart API instead of CodeCogs.
// by Kuribo (http://www.kuribo.info/)

// ==UserScript==
// @name           LaTeX for Blogger with Google Chart
// @namespace      http://www.kuribo.info
// @description    You can use LaTeX in Blogger with Google Chart.
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

(function(){

function setlatex(domname) 
{
    var editbar = document.getElementById(domname);
    if (editbar) {
        var latexbar = document.createElement('div');
        latexbar.setAttribute("id", "latexbar");
        latexbar.setAttribute("class", "goog-toolbar goog-toolbar-horizontal");

        var buttons = latexButton("Latex", "http://wolverinex02.googlepages.com/latex.gif");
        buttons += separator();
        buttons += unlatexButton("Unlatex", "http://www.codecogs.com/gif.latex?Un%5CLaTeX");
            
        latexbar.innerHTML = buttons;
        editbar.appendChild(latexbar);
    }
}

function latexButton(name, url) {
    var button = " \
    <div class='goog-inline-block goog-toolbar-button' id='htmlbar_undefined' onmousedown=' \
    (function latex_compilator() { \
        var rich_edit = document.getElementById(\"postingComposeBox\"); \
        var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\"); \
        var content = rich_body[0].innerHTML; \
        content = content.replace(/\\$\\$(.+?)\\$\\$/g,function(total,tex){ \
        var t = encodeURIComponent(tex).replace(/\\(/g,\"%28\").replace(/\\)/g,\"%29\").replace(/%26amp%3B/g, \"%26\").replace(/%26nbsp%3B/g, \"%20\"); \
        return \"<img src=\\\"http://chart.googleapis.com/chart?cht=tx&chl=\"+t+\"\\\" border=0 align=middle />\"; \
        }); \
        rich_body[0].innerHTML = content; \
        var html_edit = document.getElementById(\"postingHtmlBox\"); \
        var content_html = html_edit.value; \
        content_html = content_html.replace(/\\$\\$(.+?)\\$\\$/g,function(total,tex){ \
        var t = encodeURIComponent(tex).replace(/\\(/g,\"%28\").replace(/\\)/g,\"%29\").replace(/%26amp%3B/g, \"%26\").replace(/%26nbsp%3B/g, \"%20\"); \
        return \"<img src=\\\"http://chart.googleapis.com/chart?cht=tx&chl=\"+t+\"\\\" border=0 align=middle />\"; \
        }); \
        html_edit.value = content_html; \
    })();'> \
        <img src='" + url + "' alt='" + name + "' border='0'> \
    </div> \
    ";
 return button;
}

function unlatexButton(name, url) {
    var button = " \
    <div class='goog-inline-block goog-toolbar-button' id='htmlbar_undefined' onmousedown=' \
    (function latex_decompilator() { \
        var rich_edit = document.getElementById(\"postingComposeBox\"); \
        var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\"); \
        var content = rich_body[0].innerHTML; \
        content = content.replace(/<img(.+?)chl=(.+?)\\\"(.*?)>/g, \"$$$$$2$$$$\"); \
        rich_body[0].innerHTML = decodeURIComponent(content); \
        var html_edit = document.getElementById(\"postingHtmlBox\"); \
        var content_html = html_edit.value; \
        content_html = content_html.replace(/<img(.+?)chl=(.+?)\\\"(.*?)>/g, \"$$$$$2$$$$\"); \
        html_edit.value = decodeURIComponent(content_html); \
    })();'> \
        <img src='" + url + "' alt='" + name + "' border='0'> \
    </div> \
    ";
 return button;
}

function separator() {
  return '<div class="goog-toolbar-separator goog-inline-block">&nbsp;</div>';
}

setlatex("postingComposeToolbar");
setlatex("postingHtmlToolbar");

})();
