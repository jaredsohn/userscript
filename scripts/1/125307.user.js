// ==UserScript==
// @name           nodeSelector
// @namespace      nodeSelector
// @description    makes viewing web pages easier
// @include        http://www.stainless-concepts.co.nz/*
// @include        http://*
// ==/UserScript==
/*
	Author: Rowan Schischka
	Email: rowanschischka@gmail.com
*/
var activateL0=false;
var activateL1=false;
// code: [][
document.body.onkeypress = function(event){
	if(activateL1){//third
		if(event.which == 91){
			nodeSelect();
		} else {
			activateL0 = false;
			activateL1 = false;
		}
	} else if(activateL0) {//second
		if(event.which == 93){
			activateL1 = true;
		} else {
			activateL0 = false;
		}
	} else {//first
		if(event.which == 91){
			activateL0 = true;
		}
	}
}

function nodeSelect(){
//add child nodes to the a queue of nodes, avoids recursion through the dom
function addChildrenToList(element){
	for(var n in element.childNodes){
		var x = element.childNodes[n];
		if(x != undefined) elementList.push(x);
	}
}

var colours = Array("blue", "green", "blue", "red", "yellow");
//cycles through colour array
var count = 0;
//makes only on click event active
var zoomRunning = false;

var elementList = Array(document);
//adds a border to every object in the DOM and adds an onclick event to zoom to that object
while(elementList.length > 0){
	var element = elementList.pop();
	if(element.style != undefined && element.innerHTML != undefined && element.innerHTML.length > 500){
		//onclick change body text to the one that was clicked on
		//if the node is not empty and meets a min size
	
            element.onclick = function(event){
			if(!zoomRunning){
				//singleton
				zoomRunning = true;
				document.body.innerHTML = this.innerHTML;
				//go through the body nodes to remove all borders
				elementList = Array(document);
				
				//removes all borders from all objects
				while(elementList.length > 0){
					var element = elementList.pop();
					if(element.style != undefined && typeof(element) === "object"){
						element.style.border = "none";
						element.style.borderWidth = "0px";
                                                element.style.backgroundColor = "white";
                                                element.style.backgroundImage = undefined;
                                                element.style.color = "black";
                                                element.style.fontWeight = "bold";
					}
					addChildrenToList(element);
				}
				setTimeout("zoomRunning = false;", 100);
			}
			return false; 
		};
                element.style.position  = "static";
               // element.style.float = "center";
               // element.width = "100%";
         
		element.style.border = "solid";
		element.style.borderWidth = "3px";
		element.style.borderColor = colours[(count++) % colours.length];
	}
	//queues child nodes
	addChildrenToList(element);
}
return false;
}