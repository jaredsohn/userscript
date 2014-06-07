// ==UserScript==
// @name Fnord
// @author Thomas E. Kammeyer
// @namespace http://kemosabi.reductio.com
// @version 1.0.0
// @description  See the Fnords in the New York Times!
// @include http://*.nytimes.com/*
// 
// Just browse to www.nytimes.com and see all of the Fnords
// you've been missing!  Warning:  may only make sense to
// readers of Shea and Wilson's Illuminatus trilogy.
//
// ==/UserScript==
(function () {
   // Add words that should have a "FNORD" inserted before them
   // to this list.  These will be made into regex's like
   //       /(fnordword)/gi
   // below, so you can use regex symbols and escapes if you
   // remember to escape them appropriately for use in a string.
   var fnordwords = [
      "iraq", "\\bwar\\b", "insurgen", "extremis", "osama bin laden",
      "\\bwmd\\b", "weapons of mass destruction", "middle east", "terroris",
      "improvised explosive device", "north korea", "nuclear test",
      "syria", "iran", "baghdad", "palestin", "somalia", "obituar",
      "hurricane katrina", "interest rates", "alert level",
      "threat level", "pandemic", "unemployment", "mideast",
      "china", "abortion", "choice", "immigration",
      "\\bc\\.?i\\.?a\\.?\\b", "central intelligence agency",
      "\\bf\\.?b\\.?i\\.?\\b", "federal bureau of investigation",
      "\\bn\\.?s\\.?a\\.?\\b", "national security agency",
      "\\bd\\.?h\\.?s\\.?\\b", "department of homeland security"
   ];

   // Simple recursive node walk.  I only did it this way because
   // I'm no javascript expert, and I wasn't sure whether my
   // for-loop-based variant would visit some nodes twice.
   function walknode(n, cbfn) {
      for (var i = 0; i < n.childNodes.length; i++) {
         var cn = n.childNodes[i];
         cbfn(cn);
         walknode(cn, cbfn);
      }
   }

   // A simple node callback to do the FNORD insertions
   // if the node passed is a non-empty text node.
   function nodecb(n) {
      if (n.nodeType==3 && n.nodeValue.length > 0) {
         for (var i = 0; i < fnordwords.length; i++) {
            n.nodeValue = n.nodeValue.replace(
               new RegExp("(" + fnordwords[i] + ")", "gi"),
               "FNORD $1"
            );
         }
      }
   }

   walknode(document.documentElement, nodecb);
})();
