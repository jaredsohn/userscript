// ==UserScript==
// @name           FurAffinity.net PM Priority Renamer
// @namespace      Xijque
// @description    Renames the "high," "medium," "low," and "none" PM priority folders to values of your choice
// @include        http*://www.furaffinity.net/viewmessage/*
// @include        http*://www.furaffinity.net/msg/pms/*
// ==/UserScript==

var btns,xpaths,types,firstRun;

// Call to init() and run() is at the end of the script because of a
// reference error (that shouldn't exist)

function init() {
   firstRun=true;
   btns={
      'high':{'name':"High Priority",  'reg':/high/i  },
      'med': {'name':"Medium Priority",'reg':/medium/i},
      'low': {'name':"Low Priority",   'reg':/low/i   },
      'none':{'name':"No Priority",    'reg':/none/i  }
   };
   xpaths=[
      // "Currently in: xyz" on eache message's page
      "//td[@class='cat']/a[contains(@class,'prio')]",
      // Folders box in left pane of notes page
      "//td[contains(@class,'folders')]/a[contains(@class,'prio')]",
      // Any and all buttons
      "//input[contains(@class,'button') and contains(@class,'priority')]"
   ];
   // Determines how to handle elements, based off their tagName
   types={
      "a":function(elem,first) {
         return "innerHTML";
      },
      "input":function(elem,first) {
         // When clicking on a button, its value determines what it does.
         // Because of this, the ORIGINAL value must be preserved, so that it
         // can be sent to the server to make the requested operation
         elem.addEventListener(
            'click',
            function() {
               this.value=this.getAttribute("origvalue");
            },
            false
         );
         if (first) {
            elem.setAttribute('origvalue',elem.value);
         }
         return "value";
      }
   };
   // Add custom names to btns
   for (var id in btns) {
      var temp;
      if (temp=GM_getValue(id)) {
         btns[id].name=temp;
      }
      GM_registerMenuCommand(
         "Change Display For '"+id+"'",
         changeValueFunc(id)
      );
   }
}
function run() {
   // Modifying an XPathResult element will make the XPathResult unusable.
   // Because of this, the elements needing to be modifided must be cached
   // and edited after the XPathResult is not in use.
   var cache=[];
   for (var i in xpaths) {
      var elem,type,elems=document.evaluate(xpaths[i],document,null,XPathResult.ANY_TYPE,null);
      while (elem=elems.iterateNext()) {
         for (var id in btns) {
            if (
               btns[id].reg.test(elem.className)&&
               typeof(type=types[(""+elem.tagName).toLowerCase()])!="undefinted"
            ) {
               cache.push({'elem':elem,'type':type,'value':btns[id].name});
            }
         }
      }
   }
   for (var i in cache) {
      cache[i].elem[cache[i].type(cache[i].elem,firstRun)]=cache[i].value;
   }
   firstRun=false;
}

function changeValueFunc(id) {
   function changeValue() {
      var exec,temp;
      if (temp=window.prompt("New value for '"+id+"' (changes shown after refresh):",btns[id].name)) {
         GM_setValue(id,temp);
         btns[id].name=temp;
         run();
      }
   }
   return changeValue;
}

init();
run();