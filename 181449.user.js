// ==UserScript==
// @name       FeedlyTags
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://cloud.feedly.com/*
// @copyright  2012+, You
// ==/UserScript==


addGlobalStyle('div.block-2 { background-color: white !important; position: fixed; top: 5px; left: 5px; z-index:5; }');


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.tobetagged.highlightableicon { background-color: red !important; position: fixed; top: 5px; left: 5px; }');
addGlobalStyle('div.popup.picker div:first-of-type { max-height: 550px !important; }');
addGlobalStyle('div.u100entry { margin-left: 0px !important; margin-right: 0px !important; }');
addGlobalStyle('div.content { width: 1277px; }');

var i;
var first;

function KeyCheck(e)
{
//alert(e.keyCode);
    //alert(String.fromCharCode(e.keyCode));
    
    if (String.fromCharCode(e.keyCode) == 1 || String.fromCharCode(e.keyCode) == 2 || String.fromCharCode(e.keyCode) == 3 || String.fromCharCode(e.keyCode) == 4 || String.fromCharCode(e.keyCode) == 5 || String.fromCharCode(e.keyCode) == 6 || String.fromCharCode(e.keyCode) == 7 || String.fromCharCode(e.keyCode) == 8 || String.fromCharCode(e.keyCode) == 9 || String.fromCharCode(e.keyCode) == 0)
    {
        if(first == 0){
          second = String.fromCharCode(e.keyCode);
           //alert(second);
            
            var matches = document.querySelectorAll("div.toBeTagged.highlightableIcon");
        matches[0].click();
    	var pageActionMarkAsRead = document.querySelectorAll('div.popup.picker div:first-of-type div:nth-of-type(' + second + ')');
		pageActionMarkAsRead[0].click();
        
            
            first=undefined;
            return;
        };
        
        if(first != undefined && first != 0 ){
          second = String.fromCharCode(e.keyCode);
//        alert(second);
            
                var matches = document.querySelectorAll("div.toBeTagged.highlightableIcon");
        matches[0].click();
    	var pageActionMarkAsRead = document.querySelectorAll('div.popup.picker div:first-of-type div:nth-of-type(' + first + second + ')');
		pageActionMarkAsRead[0].click();
            
            //alert(first + second);
            first=undefined;
            return;
        };
        
        if(first == undefined){
          first = String.fromCharCode(e.keyCode);
          //  alert("hello");
 		};
        
        
        
        //if (String.fromCharCode(e.keyCode) == 0) {
            
    	//}
        //else
          //  alert(first);
        //if (i==1) {
            //alert(first + second);
        //}
        //i=1;
        //var matches = document.querySelectorAll("div.toBeTagged.highlightableIcon");
        //matches[0].click();
    	//var pageActionMarkAsRead = document.querySelectorAll('div.popup.picker div:first-of-type div:nth-of-type(' + String.fromCharCode(e.keyCode) + ')');
		//pageActionMarkAsRead[0].click();
        //first === 'undefined';
    }
    
}

window.addEventListener('keydown', KeyCheck, true);


var keyActions = {
  's66' : function() {
    // shift+b - bookmark
      //alert("Hello");
      
      //var matches = document.querySelectorAll("div.toBeTagged.highlightableIcon");
      //console.log(matches);
      //qmatches[0].click();
      
      var theDiv = document.getElementById("floatingBar");
      //var theDiv2 = document.getElementById("section0");
var content = document.createTextNode("You may record tag numbers here, before remembering which are where");
var innerDiv = document.createElement('div');
innerDiv.className = 'block-2';
innerDiv.appendChild(content);
      //theDiv2.appendChild(innerDiv);
theDiv.appendChild(innerDiv);
      

  	    
      
  },
    
    's67' : function() {
        //alert("Hello");
    	//var pageActionMarkAsRead = document.getElementById('tag_!_picker');
        
        var matches = document.querySelectorAll("div.toBeTagged.highlightableIcon");
        matches[0].click();
        //var nums=prompt("Please enter your name","Harry Potter");
        
        
        
        //var pageActionMarkAsRead = document.querySelectorAll('div.popup.picker div:first-of-type div:nth-of-type(' + nums + ')');
		//pageActionMarkAsRead[0].click();

    },
  
    
    
  's88' : function() {
    // shift + x -- expand/collapse selected category
      alert("X pressed");
    var selcat = document.querySelector('#left');
    
    if (selcat != null) {
      var handle = selcat.querySelector('.handle');
      if (handle != null) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        handle.dispatchEvent(evt);
      }
    }
  }
};

var getPressedKeys = function(e) {
	var keys = '';

	e.shiftKey && (keys += 's');
	e.ctrlKey && (keys += 'c');
	e.metaKey && (keys += 'm');
	e.altKey && (keys += 'a');

	keys += e.keyCode;

	return keys;
};

document.addEventListener('keydown', function(e) {
	var pressedKeys = getPressedKeys(e);

	var handler = keyActions[pressedKeys];
	if (handler) {
		handler();

		// stop event propagation
		e.stopPropagation();
		e.preventDefault();
	}
}, false);


//were wrong
//addGlobalStyle('#popupPart { width: 367px !important; }'); //div.popup.picker
//var matches2 = document.querySelectorAll("div.popup.picker/div/div[1]");
//console.log(matches2);

//var pageActionMarkAsRead = document.getElementByClassName('toBeTagged');
//pageActionMarkAsRead.click();
      