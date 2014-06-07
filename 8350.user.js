// ==UserScript==
// @name          PrintableForum
// @author        Joshua Heyer
// @namespace  http://shog9.com/greasemonkey/scripts/
// @description   add a working "Printer friendly" link to every forum on CodeProject
// @version        0.1.2
// @include       http://*.codeproject.com/*
// @include       http://*.codetools.com/*
// @include       http://*.thecodeproject.com/*
// ==/UserScript==

// no sense loading anything if this isn't even a forum - do a quick test for a forum table
var forumTable = document.getElementById("ForumTable");
if ( forumTable )
{   
   var faqLink = document.evaluate("//a[@href='/script/comments/faq.asp']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   if ( faqLink && faqLink.snapshotLength > 0 )
   {
      var newLink = document.createElement('a');
      newLink.href = "#";
      newLink.style.marginLeft=".25em";
      newLink.title="Show a printable version of this forum";
      newLink.innerHTML = "<img src='/images/print.gif' border='0' align='absmiddle'>&nbsp; <b>Printer friendly</b> &nbsp;";
      newLink.addEventListener("click", function(event)
      {
         var status1 = document.createTextNode("...");
         newLink.parentNode.replaceChild(status1, newLink);
         var status2 = document.createTextNode("Loading");
         status1.parentNode.insertBefore(status2, status1);
         var wrapper = new XPCNativeWrapper(window, "XSLTProcessor");
         var processor = new wrapper.XSLTProcessor();
         var testTransform = document.implementation.createDocument("", "test", null);
         testTransform.addEventListener("progress", function()
         {
            status1.textContent += ".";
            if ( status1.textContent.length > 3 )
               status1.textContent = "";
         }, false);
         testTransform.addEventListener("load", function()
         {
            processor.importStylesheet(testTransform);
         
            var processor2 = new wrapper.XSLTProcessor();
            var printTransform = document.implementation.createDocument("", "test", null);
            printTransform.addEventListener("progress", function()
            {
               status1.textContent += ".";
               if ( status1.textContent.length > 3 )
                  status1.textContent = "";
            }, false);
            printTransform.addEventListener("load", function()
            {
               processor2.importStylesheet(printTransform);
               var newDocument = processor.transformToDocument(document);
               document.documentElement.innerHTML = "";
               document.documentElement.appendChild(processor2.transformToFragment (newDocument, document));
            }, false);
            printTransform.load("/jscript/greasebob/cpforumPrint.xml");
         }, false);
         testTransform.load("/jscript/greasebob/cpforum.xml");
      
         event.preventDefault();
      }, true);
      faqLink.snapshotItem(0).parentNode.insertBefore(newLink, null);
   }
}   
