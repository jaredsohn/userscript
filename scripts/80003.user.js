// ==UserScript==
// @name           Facebook - Photo Rollover
// @namespace      Facebook - Photo Rollover
// @include        http*://www.facebook.com/*
// ==/UserScript==

checkForUpdate();

function checkForUpdate() {
    document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
    setTimeout(DoIt, 20);
    document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
}

var widthHold = 0;
var enlargeTimeout;
var delayTimeout;

function delayedMouseOver(what){
if(what.src.indexOf("_s.") > -1){
               widthHold = what.width;
               //clearTimeout(reduceTimeout);
               enlargeImage(what,435);
               what.src = what.src.replace("_s.","_n.");
               var picHolder = what.parentNode.parentNode.parentNode.parentNode;
               var images = picHolder.getElementsByTagName("img");
               for(e=0; e<images.length; e++){
                 if(images[e].width > 32){ 
                   images[e].parentNode.style.display = "none";
                   what.parentNode.style.display = "block";
                 }
               }
               /*var divs = picHolder.getElementsByTagName("div");
               for(a=0; a<divs.length; a++){
                  if(divs[a].getElementsByTagName("img").length == 0 && divs[a].getElementsByTagName("img")[0].className != "uiProfilePhoto profilePic uiProfilePhotoLarge img"){
                    divs[a].style.display = "none";
                  }
               }*/
}
}


function DoIt(){
  var medImages = getElementsByClassName("uiPhotoThumb UIImageBlock_Image UIImageBlock_MED_Image");
  var medImages2 = getElementsByClassName("UIMediaItem_Wrapper");
  var medImages3 = getElementsByClassName("uiStreamAttachments clearfix mvm");
  medImages = medImages.concat(medImages2);
  medImages = medImages.concat(medImages3);
  
  var medHolder = new Array();
  for(i=0; i<medImages.length; i++){
     var images = medImages[i].getElementsByTagName("img");
     for(e=0; e<images.length; e++){
       medHolder.push(images[e]);
     }
  }
  
  for(i=0; i<medHolder.length; i++){
     medHolder[i].addEventListener('mouseover',
        		function(){
        		   var what = this;    
        		   clearTimeout(delayTimeout);     
        		   delayTimeout = setTimeout(function() {delayedMouseOver(what)}, 1000);
            }
            , false);
     medHolder[i].addEventListener('mouseout',
        		function(){
        		  clearTimeout(delayTimeout);
        		  if(this.src.indexOf("_n.") > -1){
        		  
        		   this.src = this.src.replace("_n.","_s.");
               clearTimeout(enlargeTimeout);
               reduceImage(this,widthHold);   
               /*var picHolder = this.parentNode.parentNode.parentNode.parentNode.parentNode;
               var images = picHolder.getElementsByTagName("img");
               for(e=0; e<images.length; e++){  
                 images[e].parentNode.style.display = "block";  
               }*/
               
              }
            }
            , false);


    /* medHolder[i].parentNode.parentNode.parentNode.parentNode.parentNode.addEventListener('mouseout',
        		function(){
        		  //if(this.src.indexOf("_n.") > -1){
        		  
        		   //this.src = this.src.replace("_n.","_s.");
               //clearTimeout(enlargeTimeout);
               //reduceImage(this,widthHold);   
               var picHolder = this;
               var images = picHolder.getElementsByTagName("img");
               for(e=0; e<images.length; e++){  
                 images[e].parentNode.style.display = "block";
                 images[e].width = "130";  
               }
               
              //}
            }
            , false);*/
  }
}


function enlargeImage(what,end){
  what.width = end;
  if(what.width < end){
    what.width = what.width + 20;
    enlargeTimeout = setTimeout(function() {enlargeImage(what,end)}, 1);
  }else{
    what.width = end;
  }
}


function reduceImage(what,end){

  if(what.width > end){
    what.width = what.width - 20;
    setTimeout(function() {reduceImage(what,end)}, 1);
  }else{
    what.width = end;  
               var picHolder = what.parentNode.parentNode.parentNode.parentNode;
               var images = picHolder.getElementsByTagName("img");
               for(e=0; e<images.length; e++){  
                 images[e].parentNode.style.display = "block";  
               }

               /*var divs = picHolder.getElementsByTagName("div");
               for(a=0; a<divs.length; a++){
                  if(divs[a].getElementsByTagName("img").length == 0 && divs[a].getElementsByTagName("img")[0].className != "uiProfilePhoto profilePic uiProfilePhotoLarge img"){
                    divs[a].style.display = "block";
                  }
               }*/ 
  }
}


function getElementsByClassName(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                returnElements = [],
                current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    } else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                returnElements = [],
                elements, node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    } else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                current, returnElements = [],
                match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
}