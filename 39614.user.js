// ==UserScript==
// @name           Restore Comment Block
// @namespace      http://www.okcupid.com
// @include        http://*.okcupid.com/profile/*/journal*
// ==/UserScript==

//No point in doing anything until the page has loaded and okc's javascript loads up
window.addEventListener ("load", addCommentEventListener, false);


// Watch functions for getting notifications of when journal comment blocks have loaded

function watchProfileJournal(node) {
    //GM_log('watchProfileJournal ' + node.getAttribute('id'));
    watchJournal(node);
    watchObject(node.wrappedJSObject, 'innerHTML', function (prop, oldVal, newVal) {
            //GM_log('profileJournalChanged ' + node.getAttribute('id'));
            setTimeout(function(){watchJournal(node);}, 0);
            return newVal;
        }
    );
}

function watchJournal(node) {
    //GM_log('watchJournal');
    //select the divs with numeric ids
    var boards = document.evaluate(
        "descendant::div[@class='comment_load_shell']",
        node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      //GM_log('boards: ' + boards.snapshotLength);
    for (var i = 0; i <  boards.snapshotLength; i++) {
        watchBoard(boards.snapshotItem(i));
    }
}

function watchBoard(node) {
    //GM_log('watchBoard' + node.getAttribute('id'));
    addBlock(node);
    watchObject(node.wrappedJSObject, 'innerHTML', function(a, b, c) {
        //GM_log('board changed ' + node.getAttribute('id'));
        setTimeout(function(){addBlock(node)}, 0);
        return c;
    });
}

function watchObject(obj, prop, func) {
    //cascading watch...
    var old = obj['_watch_' + prop];
    if (old) {
        obj['_watch_' + prop] = function(prop, oldVal, newVal) {
            //how to communicate old and new values is a puzzle
            newVal = old(prop, oldVal, newVal);
            newVal = func(prop, oldVal, newVal);
            return newVal;
        }
    } else {
        obj['_watch_' + prop] = func;
    }
    obj.watch(prop, obj['_watch_' + prop]);
}


function addCommentEventListener(){
	watchJournal(document);
}


//Add the block button to every comment that was loaded
function addBlock(parent){	

   allDivs = document.evaluate(
    	"//div[@class='actions']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);   
	
    
  for (var i = 0; i < allDivs.snapshotLength; i++) {
      thisDiv = allDivs.snapshotItem(i);
      var existingBlock = document.evaluate(
      		"./a[contains(@href,'delblock')]",thisDiv, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
     
      //Only add the block button if it's not already there
      if(existingBlock == null){
      	var reject = document.evaluate(
      			"./a",thisDiv, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

      	var block = buildBlock(reject);	
      
      	var slash = document.createElement("span");
      	slash.innerHTML='/ ';
      	thisDiv.insertBefore(slash,null);
      	thisDiv.insertBefore(block,null);    
     }
 
  }
}
  
  
//Builds a block button from an existing reject link  
function buildBlock(existing){

 var params = existing.href.split(',');
 paramVals = convertParams(params);
 
 var block = document.createElement("a");
 block.href='javascript:boardActionInline(\'delblock\',\'' + paramVals.join('\',\'') + '\');';
 block.innerHTML='Reject & Block';
 return block;

}

//Convert the paramaters to values without quotes, commas etc
function convertParams(params){
 var convertedParams = new Array();
 //Ignore the first parameter since we're changing it
 for(var i = 1; i< params.length;i++){
   convertedParams[i - 1 ] = extractParamValue(params[i]);
  
 }
 
 return convertedParams;
}

//Extracts just the paramater value
function extractParamValue(param){  
  startIndex = param.indexOf('\'');
  endIndex = param.indexOf('\'',startIndex +1 )  
  return param.substring(startIndex+1,endIndex)

}

