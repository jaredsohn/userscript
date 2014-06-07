// ==UserScript==
// @name         Evolving Web Workflowy Hacks
// @description  Initially makes exports compatible with Redmine's textile syntax.
// @namespace    http://www.evolvingweb.ca/
// @version      0.2
// @author       Alex Dergachev
// @include      https://workflowy.com/*
// @copyright    2011+, Evolving Web Inc.
// ==/UserScript==


// This script probably only works in Google Chrome with Tampermonkey.
var doStuff = function($){ 
$.fn.exportIt = function() {
    //EWHACK: changes: 
    // - preface everything with unsafeWindow
    // - assign the function to unsafeWindow.fn.exportIt (that's what the $) does
    // - apply toTextile transform on `b`
    // - kill "Created with WorkFlowy.com"
        
    var toTextile = function(s) { 
      s = s.replace(/Created with WorkFlowy.com/, '');
      s = s.replace(/^( *)-/gm, function(_,sp) { var out = '*'; for (var i =0,l=sp.length/2; i<l;i++) { out += '*'; }; return out; });
      return s;
    }
    var a = $(this);
    a = unsafeWindow.projecttree.getProjectReferenceFromDomProject(a);
    unsafeWindow.clearExportPopup();
    var b = a.generateExportData(unsafeWindow.shouldShowCompletedProjects());
    a = b.htmlContainer;
    b = b.textContainer;
    
        //EWHACK:
    b = $("<pre />").text(toTextile($(b).text())); 

    var d = $("#exportPopup");
    d.find(":radio#id_html").attr("checked", true);
    var c = d.children(".previewWindow");
    c.append(a);
    d.children(".textContainer").append(b);
    unsafeWindow.IS_FIREFOX || c.attr("contenteditable", "true");
    d.dialog("open");
    c.focus();
    unsafeWindow.selectElementText(c.get()[0])
};


        
};
                  
window.onload = function() { doStuff(unsafeWindow.jQuery);};