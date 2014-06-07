// ==UserScript==
// @name           Linkedin twitter blocker dreamsandlogic
// @namespace      linkedin
// @description    Blocks twitter updates from contacts
// @include        http://www.linkedin.com/*
// @include        http://linkedin.com/*
// @include        http://www.linkedin.com/home*
// @include        http://linkedin.com/home*
// @include        https://www.linkedin.com/*
// @include        https://linkedin.com/*
// @include        https://www.linkedin.com/home*
// @include        https://linkedin.com/home*
// ==/UserScript==

function TwitterNodeHide(node) {
    var className = node.className;
    if(typeof className != 'undefined'){
        var myArray = className.search(/newto*/g);
        if(myArray != -1){
            //if the class is newto* then check if the message really is an twitter message
            //alert(ulFeedContainer.childNodes[i].style.display);
            //ulFeedContainer.childNodes[i].style.display = 'none';
            //this -> div (index 1) -> div classname = feed-content -> span index 2 classname contains twitter?
            var listItem = node;
            for(var j = 0; j < listItem.childNodes.length; j++){
                className = listItem.childNodes[j].className;
                if(typeof className != 'undefined'){
                    myArray = className.search(/feed-tweet*/g);
                    if(myArray != -1){
//						alert("break?");
						listItem.style.display = "none";
                        break;
					}
				}
			}
        }
    }
}

function TwitterNodeHideTree() {
	//get the feedcontainer
	var feedContainer = document.getElementById('feed-content');
	var ulFeedContainer = null;

	//get the ul element
	for(var i = 0; i < feedContainer.childNodes.length; i++){
		if(feedContainer.childNodes[i].className == 'chron'){
			ulFeedContainer = feedContainer.childNodes[i];
			break;
		}
	}

	//check each update
	for(var i = 0; i < ulFeedContainer.childNodes.length; i++){
		//continue if the classname contains newto
		//we are sure that the annoying updates have a newto* classname
		TwitterNodeHide(ulFeedContainer.childNodes[i]);
	}
}

TwitterNodeHideTree();


var elmLink = document;
elmLink.addEventListener("DOMSubtreeModified", TwitterNodeHideTree, true);
