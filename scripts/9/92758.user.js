
// ==UserScript==
// @name           TeX the world
// @namespace      http://thewe.net/tex
// @description    TeX the world
// @include        *
// ==/UserScript==

// regexp for splitting a matched string into parts
var splitRegexp = /([\s\S]*?)\[;([\s\S]*?);\]([\s\S]*)/m;

// regexp for quickly testing if a text node contains our format
var matchRegexp = /\[;([\s\S]*?);\]/m;

// regexp for finding all TeX formulas in textContent
var matchRegexpGlobal = /\[;([\s\S]*?);\]/mg;

// signature to be typed when clicking ctrl-shift-;
var signature = '[To see formulas: http://thewe.net/tex]';

// create an image element for a given expression
function createTeXifiedImageElement(expr) {
    var imgElement = document.createElement('img');

    //imgElement.src = "http://thewe.net/tex/" + expr;

    var cacheServer = "";
    formulaCaching = getFormulaCachingPreference();

    //Ignore this if the user doesn't want caching to be on
    if(formulaCaching)
    {
       //If the user is requesting a reTeXify, they want a new uncached image.
       if(arguments.callee.caller.name.toString() == "reTeXifyImage")
          cacheServer = "";
       else
          cacheServer = ".nyud.net";
    }

    if(expr.length > 200)
       imgElement.src = "http://www.codecogs.com" + cacheServer + "/gif.latex?" + expr; // BS 20081227 - use Code Cogs better renderer
    else
       imgElement.src = "http://chart.apis.google.com" + cacheServer + "/chart?cht=tx&chl=" + escape(expr).replace(/\+/g,"%2B");  // If it's short, send to Google Chart API.

    imgElement.title = expr;
    imgElement.alt = "[;" + expr + ";]";
    imgElement.style.display = "inline";
    imgElement.addEventListener('dblclick', unTeXifyImage, false);
    return imgElement;
}

// TeXifies a range
function TeXifyRange(startNode, startNodeOpen, endNode, endNodeClose) {
    if (startNode == endNode) {
        var textNode = startNode;
        
        if (textNode.parentNode.nodeName == 'TEXTAREA')
            return;
        
        // infinite loop. it will break when there's nothing else matching the regexp.
        while (textNode.nodeValue.match(matchRegexp)) {
            textNodeSplit = splitRegexp.exec(textNode.nodeValue);
            
            // it matched. clear the text node and create the three
            // nodes before it - text, img, text (according to regexp match).
            // NOTE: the reason we clear the node value instead of using it for
            // the right part of the expression it to keep the cursor located
            // at the end of the node if the cursor is on it
            textNode.nodeValue = '';
            
            // create the text node that should be after the image and insert it
            var rightHalfNode = document.createTextNode(textNodeSplit[3]);
            textNode.parentNode.insertBefore(rightHalfNode, textNode);        

            // create the image and insert it
            var imgElement = createTeXifiedImageElement(textNodeSplit[2]);
            textNode.parentNode.insertBefore(imgElement, rightHalfNode);        

            // create the text node that should be before the image and insert it
            textNode.parentNode.insertBefore(document.createTextNode(textNodeSplit[1]), imgElement);
            
            // set the new textNode to be what was left. maybe there's more
            // to match (for example "[;A = B;] thus [;A \subseteq B;]")
            textNode = rightHalfNode;
        }    
    }
    else {
        // if the common ancestor is not the direct parent, stop immediately
        if (startNode.parentNode != endNode.parentNode)
            return;
    
        // verify that the only tags in the range are <br> and <wbr>
        var node;
        
        for (node = startNode; node != endNode; node = node.nextSibling)
          if (node.nodeType == 1 && node.tagName != 'BR' && node.tagName != 'WBR')
                break;
                
        if (node != endNode)
            return;

        // create the range and TeXify it                        
        var texRange = document.createRange();
        texRange.setStart(startNode, startNodeOpen);
        texRange.setEnd(endNode, endNodeClose);
		
        var tex = texRange.toString();
        tex = tex.substring(2, tex.length - 2);
        
        texRange.detach();
        
        var deleteRange = document.createRange();
        deleteRange.setStart(startNode, startNodeOpen);
        deleteRange.setEndBefore(endNode);
        
        deleteRange.deleteContents();
        deleteRange.insertNode(createTeXifiedImageElement(tex));
        
        var lastString = endNode.nodeValue.substring(endNodeClose);
        endNode.parentNode.insertBefore(document.createTextNode(lastString), endNode);
        endNode.nodeValue = '';
        
        deleteRange.detach();
    }
}

// translates a list of indexes in a node's textContent into node/offset
// pairs matching to the actual DOM tree
textContentData = function(baseNode, relevantIndexes, riIndex, index, result) {
    var relIndex = relevantIndexes[riIndex];
    
    // go through all children and check their textContent. in the meanwhile
    // remember which index we are currently in, and then recurse until finding
    // the actual node which contains the relevant index
    
    // implementation is based on the definition of textContent on
    // http://developer.mozilla.org/en/docs/DOM:element.textContent#Notes
    for (var child = baseNode.firstChild; child != null && riIndex < relevantIndexes.length; child = child.nextSibling) {
        if (child.nodeType == 7 || child.nodeType == 8)
            continue;
            
        var newIndex = index + child.textContent.length;
        
        while (newIndex > relIndex) {
            if (child.nodeType == 3 || child.nodeType == 4) {
                result.push({node: child, offset: relIndex - index});
                riIndex++;
            }
            else {
                result = textContentData(child, relevantIndexes, riIndex, index, result);
                riIndex = result.length;
            }

            if (riIndex >= relevantIndexes.length)
                break;

            relIndex = relevantIndexes[riIndex];
        }
        
        index = newIndex;
    }
    
    return result;
}

// TeXify a single window/frame
function TeXAFrame(win) {
    try {
        // register our keydown listener if this is a new frame
        if (!win.document.body.hasAttribute('_texified')) {
            win.document.addEventListener('keydown', onKeyDown, true);
            win.document.body.setAttribute('_texified', true);
        }
    
        var text = win.document.body.textContent;
        var relevantIndexes = [];
        
        // calculate the relevant indexes to search for afterwards
        // (the indexes of [; and ;])
        while ((theMatch = matchRegexpGlobal.exec(text)) != null) {
            relevantIndexes.push(theMatch.index);
            relevantIndexes.push(theMatch.index + theMatch[0].length - 1);
        }
        
        // get the mapping from these indexes to nodes/offset pairs
        var data = textContentData(win.document.body, relevantIndexes, 0, 0, []);
        
        for (var i = 0; i < data.length; i += 2)
            TeXifyRange(data[i].node, data[i].offset, data[i+1].node, data[i+1].offset + 1);
		
		 // BS 20081227
		// add listeners to images. these may have been lost during saves in Google Docs
		addunTeXifyImageEventListeners(win);
    }
    catch (e) { // security exception
    }
        
    // do the same for all frames in this window/frame
    for (var i = 0, n = win.frames.length; i < n; i++)
        TeXAFrame(win.frames[i]);
}


// TeXify a node that was previously unTeXified
function reTeXifyImage(event) {
    //var text = event.currentTarget.innerHTML;
    var text = event.currentTarget.textContent;  // BS 20081227 - fix bug where certain HTML escape chars are not handled correct
    var imgElement = createTeXifiedImageElement(text.substring(1, text.length - 1));
    event.currentTarget.parentNode.replaceChild(imgElement, event.currentTarget);    
}

// switch an image that was TeXified back to text.
// removes the ;s so that it doesn't get re-TeXified immediately
// double-click will re-TeXify is, and also adding the ;s back will do the job.
function unTeXifyImage(event) {
    var imgElement = event.currentTarget;
    
    var newSpanElement = document.createElement('span');
    newSpanElement.appendChild(document.createTextNode('[' + imgElement.title + ']'));
    newSpanElement.addEventListener('dblclick', reTeXifyImage, false);
    
    var newOuterSpanElement = document.createElement('span');
    newOuterSpanElement.appendChild(newSpanElement);

    imgElement.parentNode.replaceChild(newOuterSpanElement, imgElement);    
}

// simulate the user typing a string
function simulateTextTyping(target, str) {
    for (var i = 0; i < str.length; i++) {
        var keyEvent = document.createEvent("KeyboardEvent");
        keyEvent.initKeyEvent("keypress", true, true, null, false, false, false, false, 0, str.charCodeAt(i));
        target.dispatchEvent(keyEvent);
    }
}

// handle the keydown event -- if the key was ctrl-shift-; write our signature
function onKeyDown(event) {
    // ctrl-shift-;
    if (event.keyCode == 59 && (event.ctrlKey || event.metaKey) && event.shiftKey) { 
        // we use typing simulation in order to it to work not only in "regular" html components but also in 
        // high-tech javascript hacks like gmail and hotmail
        simulateTextTyping(event.target, signature);
    }
}

// TeXifies the world
function TeXTheWorld() {
    var startTime = new Date();
    TeXAFrame(window.top);
}

 // BS 20081227
// adds Event Listener to images
function addunTeXifyImageEventListeners(win) {
	
	var allDivs = win.document.evaluate(
		"//img[contains(@alt, '[;')]",
		win.document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	for (var i = 0; i < allDivs.snapshotLength; i++)
		allDivs.snapshotItem(i).addEventListener('dblclick', unTeXifyImage, false);

}

if (self == top) { // run only in the top frame. we do our own frame parsing

   //************************************************************
   //This part only runs on Reddit
   if(document.location.href.indexOf('reddit.com') != -1)
   {
      //Set the script to run after the page is loaded so it can find elements
      setTimeout(loadmathbox,500);
   }
   //************************************************************

    TeXTheWorld(); // since we must handle dynamically created frames
    setInterval(TeXTheWorld, 3000);
}
      
// ********************************************************************
// Code added for Reddit /r/math users
// ********************************************************************



//Find any element which is tagged with the class name given.
function getElementsByClass(searchClass,node,tag)
{
   //Code for this function by Dustin Diaz
   //http://www.dustindiaz.com/getelementsbyclass/

   try
   {
      var classElements = new Array();
      if ( node == null )
         node = document;
      if ( tag == null )
         tag = '*';

      var els = node.getElementsByTagName(tag);
      var elsLen = els.length;
      var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');

      for(i = 0, j = 0; i < elsLen; i++)
      {
         if(pattern.test(els[i].className))
         {
            classElements[j] = els[i];
            j++;
         }
      }

      return classElements;
   }
   catch(err)
   {
      alert("Error in getElementsByClass:\n\n" + err);
   }
}

//Adds a settings box to the sidebar for Reddit.
function loadmathbox()
{
   //Localize globals for performance
   var doc = document;
   var windoc = window.document;
   var pageFooter = getElementsByClass("footer rounded");

   //If the page footer has not yet loaded, refresh

   if(pageFooter.length == 0 && !windoc.body.hasAttribute('_loadsuccess'))
   {
      //Once the page has sufficiently loaded, don't run this script again (used like a global var)
      windoc.body.setAttribute('_loadsuccess',true);

      setTimeout(loadmathbox,500);
      return;
   }

   var pageSide = getElementsByClass("side");

   //The inbox does not have a sidebar.
   if(pageSide.length > 0)
   {
      var mathBox = doc.createElement("div");
      var mathBoxContent = doc.createElement("div");
      var mathBoxHeader = doc.createElement("H1");

      mathBoxHeader.innerHTML = "TexTheWorld";

      mathBox.setAttribute('class','sidecontentbox');
      mathBoxContent.setAttribute('class','content');
      mathBox.appendChild(mathBoxHeader);
      mathBox.appendChild(mathBoxContent);

      var disableCacheLink = doc.createElement("a");

      formulaCaching = getFormulaCachingPreference();

      if(formulaCaching)
         disableCacheLink.appendChild(doc.createTextNode("Turn off formula caching."));
      else
         disableCacheLink.appendChild(doc.createTextNode("Turn on formula caching."));

      //Create a closure to pass userName by value instead of by reference
      disableCacheLink.addEventListener("click", toggleFormulaCaching, false);

      //The mouse cursor won't become a "hand" unless there's something in the href
      disableCacheLink.setAttribute("href","javascript:void();");

      mathBoxContent.appendChild(disableCacheLink);
      mathBoxContent.appendChild(doc.createElement("br"));

      pageSide[0].appendChild(mathBox);
   }
}

//Turn on/off the formula caching feature (it causes problems with work firewalls for some users)
function toggleFormulaCaching()
{
   if(localStorage.getItem("formulaCaching"))
   {
      var formulaCaching = localStorage.getItem("formulaCaching");

      //Store it to local storage
      if(formulaCaching == "true")
         localStorage.setItem('formulaCaching', false);
      else
         localStorage.setItem('formulaCaching', true);
   }
   else
   {
      //It defaults to have caching on
      localStorage.setItem('formulaCaching', false);
   }

   //Reload the page without formula caching on.
   window.location.reload();
}


//Returns the user's preference for math formula caching
function getFormulaCachingPreference()
{
   if(localStorage.getItem("formulaCaching"))
   {
      formulaCaching = localStorage.getItem("formulaCaching");

      if(formulaCaching == "true")
         return true;
      else
         return false;
   }
   else
   {
      //Default to on.
      window.localStorage.setItem('formulaCaching', true);
      return true;
   }
}

