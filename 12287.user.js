// Copyright 2007 Uday Pandey. All Rights Reserved.
// Version 0.1 beta

// ==UserScript==
// @name          Google Reader Sort On Unread Items
// @namespace     tag://udaypandey.com/greasemonkey
// @description	  Keyboard shortcuts to sort feed based on unread items.
// @include       http://www.google.com/reader/view/*
// ==/UserScript==

const SORT_MODE_NO_SORT       = 1
const SORT_MODE_SHOW_ALL      = 2
const SORT_MODE_SHOW_UNREAD   = 3

var origEntryList = null;

// Constants
const SIMPLE_ACTIONS = {
    // "3": Sort on unread feed, show only unread items
    51: function() {
         // Init Orig Feed the first time
         storeOrigFeed()

         // Sort feed
         sortFeed()
         showFeed(SORT_MODE_SHOW_UNREAD)
    },
    // "4": Sort on unread feed, show all items
    52: function() {
         // Init Orig Feed the first time
         if (storeOrigFeed() == false)
            restoreOrigFeed()

         sortFeed()
         showFeed(SORT_MODE_SHOW_ALL)
    },
    // "5": Restore original feed and sort order
    // Same as 1 and 2 shortcuts in GR 
    53: function() {
         restoreOrigFeed()

         showFeed(SORT_MODE_NO_SORT)
    },
};


function sortFeed()
{
   // Find the entries element in the page.
   var entries = window.document.getElementById('entries')
   if (entries == null)
       return true;

   var entryList = entries.childNodes;
   var len = entryList.length;
   /*-- Return if no feed --*/
   if (len == 0) return true;

   var regPatt = /read/;
   /*-- There may be more read items than unread items in a feed, hence it
        may make more sense to just push the unread items to the beginning
        of the feed instead of moving the read items around --*/

   /*-- Hopefully this should be faster approach than moving read items --*/
   var insertElem = null;
   var readItemFound = false;
   /*-- Iterate original length time --*/
   for (var i = 0; i < len - 1; i++)
   {
      if (entryList[i].nodeName != 'DIV')
           continue;

      // Get the class attribute
      classAttr = entryList[i].getAttribute('class')

      // If already read item, put it to the end
      if (regPatt.test(classAttr) == false)
      {
          // Skip till first read item is found, there is no need
          // to move the unread items at the beginning of the list
          // to be moved around
          if (readItemFound == true)
          {
             // Remove the child and append at the end
             elem = entries.removeChild(entryList[i])

             entries.insertBefore(elem, insertElem)
          }
      }
      else
      {
         // If first time
         if (readItemFound == false)
         {
            insertElem = entryList[i];
            readItemFound = true;
         }
      }
   }

   return true;
}

function keyHandler(event) {
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return false;
  }

  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
        (targetNodeName == "input" && event.target.type &&
         event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }

  var k = event.keyCode;

  if (k in SIMPLE_ACTIONS) {
    SIMPLE_ACTIONS[k]();
    return true;
  }

  return false;
}

// main() invocation 
window.addEventListener('keydown', keyHandler, false);

function storeOrigFeed()
{
   if (origEntryList != null)
      return false

   // Store displayed entry in a document fragment
   storeEntryList()

   return true;
}

function storeEntryList()
{
   // Store displayed entry in a document fragment
   origEntryList = new Array();

   // Find the entries element in the page.
   var entries = window.document.getElementById('entries')
   if (entries == null)
       return true;

   var entryList = entries.childNodes;
   var len = entryList.length;
   /*-- Return if no feed --*/
   if (len == 0) return true;

   /*-- Iterate original length time --*/
   for (var i = 0; i < len; i++)
      origEntryList.push(entryList[i]);

   return true;
}

function restoreEntryList()
{
   // Find the entries element in the page.
   var entries = window.document.getElementById('entries')
   if (entries == null)
       return true;

   var items = document.createDocumentFragment()

   for (var i = 0; i < origEntryList.length; i++)
      items.appendChild(origEntryList[i]);

   // Replace with original list
   while (entries.firstChild) 
      entries.removeChild(entries.firstChild);

   entries.appendChild(items);
}

function restoreOrigFeed()
{
   if (origEntryList == null)
      return false

   restoreEntryList()

   return true
}

function showFeed(sortMode)
{
   // Find the entries element in the page.
   var entries = window.document.getElementById('entries')
   if (entries == null)
       return true;

   var entryList = entries.childNodes;
   var len = entryList.length;
   /*-- Return if no feed --*/
   if (len == 0) return true;

   /*-- Iterate original length time --*/
   for (var i = 0; i < len - 1; i++)
   {
       if (entryList[i].nodeName != 'DIV')
           continue;

       // Alread read item, are we on hide read item mode
       if (sortMode == SORT_MODE_SHOW_UNREAD)
       {
          var regPatt = /read/;
          var attribRegPatt = /hidden/;

          // Get the class attribute
          classAttr = entryList[i].getAttribute('class')

             // If not a read item, ignore
             if (regPatt.test(classAttr) == false)
                continue;

          if (classAttr.length != 0)
          {
             // Add only if not already present
             if (attribRegPatt.test(classAttr) == false)
             {
                entryList[i].setAttribute('class', classAttr + ' hidden')
             }
          }
          else
             entryList[i].setAttribute('class', 'hidden')
       }
       else
       {
          // Remove the hidden attribute

          // Get the class attribute
          classAttr = entryList[i].getAttribute('class')

          classAttr = classAttr.replace(' hidden', '')
          classAttr = classAttr.replace('hidden', '')

          entryList[i].setAttribute('class', classAttr)
       }
   }

   return true;
}

