// ==UserScript==
// @name           Linkedin twitter blocker
// @namespace      linkedin
// @description    Blocks twitter updates from contacts
// @include        http://www.linkedin.com/
// @include        http://www.linkedin.com/home*
// ==/UserScript==

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
    var className = ulFeedContainer.childNodes[i].className;
    if(typeof className != 'undefined'){
        var myArray = className.search(/newto*/g);
        if(myArray != -1){
            //if the class is newto* then check if the message really is an twitter message
            //alert(ulFeedContainer.childNodes[i].style.display);
            //ulFeedContainer.childNodes[i].style.display = 'none';
            //this -> div (index 1) -> div classname = feed-content -> span index 2 classname contains twitter?
            var listItem = ulFeedContainer.childNodes[i];
            var divFeedBody = null;
            for(var j = 0; j < listItem.childNodes.length; j++){
                className = listItem.childNodes[j].className;
                if(typeof className != 'undefined'){
                    myArray = className.search(/feed-body*/g);
                    if(myArray != -1){
                        divFeedBody = listItem.childNodes[j];
                        break;
                    }
                }
            }
                
            var divFeedContent = null;
            if(divFeedBody != null){
                for(var j = 0; j < divFeedBody.childNodes.length; j++){
                    className = divFeedBody.childNodes[j].className;
                    if(typeof className != 'undefined'){
                        if(className == 'feed-content'){
                            divFeedContent = divFeedBody.childNodes[j];
                            break;
                        }
                    }
                }
            }
            var spanMessageFrom = null;    
            if(divFeedContent != null){
                for(var j = 0; j < divFeedContent.childNodes.length; j++){
                    content = divFeedContent.childNodes[j].innerHTML;
                    if(typeof content != "undefined"){
                        var myArray = content.search(/Twitter*/g);
                        if(myArray != -1){
                            listItem.style.display = "none";
                            break;
                        }
                    }
                }
            }            
        }
    }
}

