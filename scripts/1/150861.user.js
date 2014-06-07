// ==UserScript==
// @name           Newgrounds Flash Download
// @namespace      http://userscripts.org/users/490210
// @description    Adds a download button to flash movie and game pages in Newgrounds.com.
// @version        1.2.0
// @author         gatorshark
// @downloadURL    https://userscripts.org/scripts/source/150861.user.js
// @updateURL      https://userscripts.org/scripts/source/150861.meta.js
// @include        http://www.newgrounds.com/portal/view/*
// @match          http://www.newgrounds.com/portal/view/*
// @run-at         document-end
// ==/UserScript==


// The script is wrapped in an anonymous function
(function(){

  // Creates the Download Button
  function createDownloadButton(root){
    if(document.getElementById("download_btn") != null){return;}
    var oLinkEl = root.insertBefore(createNode("a", {id: "download_btn", href: flashLink}, {className: "downarrow"}), root.firstChild);
    var oSpan1 = oLinkEl.appendChild(createNode("span", null, {textContent: "Download"}));
    var oSpan2 = oLinkEl.appendChild(createNode("span", null, {className: "hovertext"}));
    var oSpan3 = oSpan2.appendChild(createNode("span", null, {textContent: "Download"}));
    addStyle("\ndiv.podtop a.downarrow span {background-position: -375px 0px;}\n" +
      "div.podtop a.downarrow:hover span {background-position: -375px -15px;}\n" +
      "div.podtop div a span.hovertext {display: none;}\n");
  }


  //-- START OF RUNNING SCRIPT --//

  var flashLink;
  if(document.getElementById("flash_embed") != null){
    flashLink = document.getElementById("flash_embed").getAttribute("data");
    console.log("flash_embed flash link: "+flashLink);
  }else{
    return;  // quit execution of userscript
  }

  // Detect a video from flashvars and fix link
  var flash_vars = getParamTags(document.getElementById("flash_embed"), "flashvars");
  flash_vars = (flash_vars != null) ? parseParams(flash_vars.getAttribute("value")) : null;
  if(flash_vars && flash_vars.url){
    flashLink = encodeURI(unescape(flash_vars.url));
    ////alert("Video: " + unescape(flash_vars.title) + flash_vars.url.match(/(?:\.)([\w]+)$/i)[0]);
    console.log("flashvars video link: "+flashLink);
    console.log("video: " + unescape(flash_vars.title) + flash_vars.url.match(/(?:\.)([\w]+)$/i)[0]);
  }

  // [Alternative]: Detect video player and fix link
  ////if(flashLink.indexOf("\/video_player\/videoplayer.swf") >= 0){
  ////  var paramTags = getParamTags(document.getElementById("flash_embed"));
  ////  var flash_vars = parseParams(paramTags.flashvars.getAttribute("value"));
  ////  flashLink = encodeURI(unescape(flash_vars.url));
  ////}

  // Get header containing the buttons and add download button
  var refNode;
  if(document.getElementById("flash_header") != null){
    refNode = document.getElementById("flash_header").getElementsByTagName("div")[0];
  }else if(typeof (document.getElementsByClassName) == "function" && document.getElementsByClassName("podtop")[0] != null){
    // likely in popup window
    refNode = document.getElementsByClassName("podtop")[0].getElementsByTagName("div")[0];
    addStyle("\ndiv.podtop div {text-align:right;}\ndiv.podtop div a {text-align:left;}\n");
  }else{
    console.error("reference node not found");
    return;  // quit execution of userscript
  }
  createDownloadButton(refNode);

  // Detect blockade and fix link
  if(flashLink && flashLink.indexOf("\/content_blockers\/ADULT.swf") >= 0){
    var oScriptEl = createNode("script", {type: "text/javascript"}, {textContent: "\nif(typeof flash_params != \"undefined\"){" +
      "if(document.getElementById(\"download_btn\") != null){document.getElementById(\"download_btn\").href = flash_params.src; " +
      "console.log(\"flash link: \" + flash_params.src);}}\n"});
    document.getElementsByTagName("head")[0].appendChild(oScriptEl);
  }

  //-- END OF RUNNING SCRIPT --//


  //-- START OF HELPER FUNCTIONS --//

  // Creates a new node with the given attributes, properties and event listeners
  function createNode(type, attributes, props, eventlisteners){
    // "createNode" borrowed from http://userscripts.org/scripts/show/13333
    // Usage example: createNode("div", {id: "myid", class: "myclass"}, {textContent: "string"}, [ ["click", clickListen, false], ["keypress", keyListen, false] ])
    var node = document.createElement(type);
    if(attributes){
      for(var attr in attributes){
        if(attributes.hasOwnProperty(attr)){node.setAttribute(attr, attributes[attr])};
      }
    }
    if(props){
      for(var prop in props){
        if((props.hasOwnProperty(prop)) && (prop in node)){node[prop] = props[prop]};
      }
    }
    if(typeof Array.isArray === "undefined"){Array.isArray = function(o){return Object.prototype.toString.call(o) === "[object Array]";};}
    if(Array.isArray(eventlisteners)){
      eventlisteners.forEach(function(eventlistener){
        if(Array.isArray(eventlistener)){node.addEventListener.apply(node, eventlistener)};
      });
    }
    return node;
  }

  // Adds stylesheet rules to the page
  function addStyle(newStyle){
    var styleId = "style_ngfd",
        styleElement = document.getElementById(styleId);
    if(!styleElement){
      styleElement = document.createElement("style");
      styleElement.setAttribute("type", "text/css");
      styleElement.setAttribute("id", styleId);
      document.getElementsByTagName("head")[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
  }

  // Parses URI component parameters into properties of an object (values are NOT decoded)
  function parseParams(query){
    if(!query){return;}
    var params = new Object(), match, regEx = /([^&=]+)=?([^&]*)/g;
    while((match = regEx.exec(query)) != null){
      params[match[1]] = match[2];
    }
    return params;
  }

  // Returns all <Param> elements as properties of an object (referenced by "name" attribute)
  // Note: If more than one element has same "name" attribute, the final one is used
  function getParamTags(element, name){
    if(!element){return (!name) ? {} : null;}
    var objTags = new Object(), prop,
        arrTags = element.getElementsByTagName("param");
    for(var i = 0; i < arrTags.length; i++){
      prop = arrTags[i].getAttribute("name");
      if(prop != null){
        objTags[prop] = arrTags[i];
      }
    }
    if(typeof (name) == "string"){
      return objTags[name] || null;
    }
    return objTags;
  }

  //-- END OF HELPER FUNCTIONS --//

})();