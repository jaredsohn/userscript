// ==UserScript==
// @name           Userscripts - Previewer
// @namespace      Userscripts - Previewer
// @include        http://userscripts.org/scripts/show/*
// @include        http://userscripts.org/scripts/admin/*
// @include        http://userscripts.org/scripts/review/*
// @include        http://userscripts.org/scripts/reviews/*
// @include        http://userscripts.org/scripts/discuss/*
// @include        http://userscripts.org/scripts/fans/*
// @include        http://userscripts.org/scripts/issues/*
// @include        *#GMPreview_*
// ==/UserScript==
   

if(location.href.indexOf("userscripts.org/scripts/") > -1){
  drawPreviewButton();
}
if(location.href.indexOf("#GMPreview_") > -1){
  previewLoader(location.href.substr(location.href.indexOf("#GMPreview_")+11));
}

if(location.href.indexOf("?preview") > -1){
  clearStuff();
  getIncludeList();
}

function clearStuff(){
    document.getElementById("source").innerHTML = "Loading includes...";
    document.getElementById("source").id = "links";
    if(getElementsByClassName("notice").length > 0){
      for(i=0; i<getElementsByClassName("notice").length; i++){
       getElementsByClassName("notice")[i].style.display = "none";
      }
    }
    var h3s = document.getElementsByTagName("h3");
    for(i=0; i<h3s.length; i++){
         h3s[i].style.display = "none";
    }
    
    unsafeWindow.sh_highlightDocument = function(){}
}

function drawPreviewList(includes){
    var holder = document.getElementById("links");
    if(includes.length == 1){ var s = "link has"; }else{ var s = "links have"; }
    holder.innerHTML = "<h2>" + includes.length + " compatible " + s + " been found. Click on a link to preview the script with that page.</h2><hr />";
    for(i=0; i<includes.length; i++){
         var href = includes[i] + "#GMPreview_" + getScriptID();
         holder.innerHTML += "<b>" + (i+1) + "</b> <a href='" + href + "'>" + includes[i] + "</a><br />";
    }
    holder.innerHTML += "<br /><img align='left' src='http://i48.tinypic.com/351wax1.png'><h2><b>Since these links have been automatically generated from the include" +
    " variables of the script,<br/>wildcard replacements have been guessed, and thus, some of these links may not be valid.</b><br/>" +
    "None of these links look right? <a onclick=\"var URL = prompt('Enter a URL to preview this script with:'); if(URL){location.href = URL + '#GMPreview_" + getScriptID() + "'; }\" href='#'>Click here</a> to type your own.</h2>"
}


function getScriptID(){
  return location.href.replace(/[^0-9]/g, '');
}

function getIncludeList(){
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
        handleIncludeList(xmlhttp.responseText);
      }
    }                  
  xmlhttp.open("GET","../review/" + getScriptID() + "?format=txt",true);
  xmlhttp.send();
}

function handleIncludeList(string){
    var includes = []; 
    var eachLine = string.split("\n");
    for(i=0; i<eachLine.length; i++){
          var link = findValidLink(eachLine[i].substr(eachLine[i].indexOf("@include")+8).split(' ').join(''));
          if(eachLine[i].indexOf("@include") >-1 && link != false){
                includes.push(link);
          }
    } 
    
    drawPreviewList(includes);

}

function findValidLink(link){
    link = link.replace(/	/g,"");
    
    if(link == "*"){ return "http://uk.yahoo.com" }
    
    if(link.substr(0,2) == "*."){
       link = "http://" + link.substr(2,link.length);
    }
    
    if(link.indexOf("*") == link.length - 2){
       link = link.substr(0,link.length - 2);
    }
    
    if(link.indexOf(".*") == link.length - 3){
       link = link.substr(0,link.length - 3) + ".com";
    }
    
    
    link = link.replace(".*/",".com");
    link = link.replace("*.","");
    
    link = link.replace(/\*/g,"");
    link = link.replace(/\n/g,"");
    link = link.replace(/(\r\n|\n|\r)/gm,"");
    link = link.replace("/.","/");
    
    if(link.indexOf("htt") != 0){
      link = "http://" + link;
    }
    
    if(isUrl(link)){
        return link;
    }else{
        return false;
    }
}


function previewLoader(scriptID){
  addExternalStyle("http://userscripts.org/scripts/review/" + scriptID + "?format=txt");
  var body = document.getElementsByTagName("body")[0];
  
  var preview_header = document.createElement('div');
  preview_header.id = "previewHeader";
  preview_header.style.width = "100%";
  preview_header.style.height = "30px";
  preview_header.style.padding = "0px";
  preview_header.style.paddingTop = "5px";
  preview_header.style.margin = "0px";
  preview_header.style.backgroundColor = "#F9F8F8";
  preview_header.style.zIndex = "999";
  preview_header.style.position = "fixed";
  preview_header.style.top = "0px";
  preview_header.style.fontSize = "12pt";
  preview_header.style.fontFamily = "arial";
  preview_header.style.color = "#000";
  preview_header.style.borderBottom = "1px solid #ccc";
  preview_header.innerHTML = "<center>This is a preview <a href='http://userscripts.org/scripts/review/" + scriptID + "?preview'>Click here to go back.</a></center>"
  
  body.parentNode.insertBefore(preview_header,body);
  

}   



function drawPreviewButton(){

  if(location.href.indexOf("?preview") > -1){
    var current = getElementsByClassName("menu current")[0];
    current.className = "menu";
    
    current.innerHTML = "<a href='" + location.href.replace("?preview","") + "'>" + current.innerHTML + "</a>";

  }
  
  var beforeBtn = findInsertButton();
  
  var preview_script = document.createElement('li');
  
  
  if(location.href.indexOf("?preview") > -1){  
     preview_script.className = "menu current";
     preview_script.innerHTML = "Preview";
  }else{
     preview_script.className = "menu";
     preview_script.innerHTML = "<a href='http://userscripts.org/scripts/review/" + getScriptID() + "?preview' rel='nofollow'>Preview</a>";
  }
  
  beforeBtn.parentNode.insertBefore(preview_script,beforeBtn);
  

}

function findInsertButton(){
    var menuButtons = getElementsByClassName("menu");
    for(i=0; i<menuButtons.length; i++){
        if(menuButtons[i].innerHTML.indexOf("Reviews") > -1){
           return menuButtons[i];
        }
    }

}
    

function addStyle(style) {
  var head = document.getElementsByTagName("HEAD")[0];
  var ele = head.appendChild(window.document.createElement('style'));
  ele.innerHTML = style;
  return ele;
}

function addExternalStyle(src) {
  var head = document.getElementsByTagName("HEAD")[0];
  var ele = head.appendChild(window.document.createElement('script'));
  ele.type = "text/javascript";
  ele.src = src;
  return ele;
}





function isUrl(url){
    var RegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
    if(RegExp.test(url)){
        return true;
    }else{
        return false;
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
            elements,
            node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch(e) {
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
            current,
            returnElements = [],
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