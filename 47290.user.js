// ==UserScript==
// @name           Animwallscenter: preload images
// @description    Preloads wallpapers in backgroud on animwallscenter.free.fr
// @autor          Hadogenes
// @namespace      http://userscripts.org/users/87790
// @include        http://animwallscenter.free.fr/WebGallery/*
// ==/UserScript==

// Adding whole code to html visible (requied to use by button)
function a() {
  return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')
}
document.body.appendChild(document.createElement('script')).innerHTML = a();
return;

// Main object
var AWC_preload = {};

function getElementByClass(tagName,className){
  var tags = document.getElementsByTagName(tagName);
  var finds = [];
  
  for(var i = 0, len = tags.length; i < len;++i){
    if(tags[i].className.indexOf(className) != -1)
       finds.push(tags[i]);
  }
   
  return finds;
}

// This function generates InputField value
AWC_preload.generateValue = function (extra_value) {
  var percent = ((AWC_preload.current * 100) / AWC_preload.lists.down.length).toString().split(".")[0] +  "%";
  var possition = AWC_preload.current.toString() + " / " + AWC_preload.lists.down.length.toString();
  
  // Changing InputField value
  AWC_preload.elements.InputField.value = possition + " (" + percent + ")" + (extra_value != null ? (" " + extra_value) : "");
  
  // Adding "downloaded" to title of downladed image
  if ((AWC_preload.current >= 1) && !(/\(downloaded\)$/.test(AWC_preload.lists.thumb[AWC_preload.current - 1].title))) {
    AWC_preload.lists.thumb[AWC_preload.current - 1].title += " (downloaded)";
  }
}

// Function which is called at start
AWC_preload.addElements = function () {
  var mainDiv = document.getElementById("content");
  
  AWC_preload.elements = {};
	AWC_preload.elements.InputField;
	AWC_preload.elements.Button;
  
  // Creating new elements
  AWC_preload.elements.Button = document.createElement("input");
  AWC_preload.elements.InputField = document.createElement("input");
  
  // New buttons properites
  AWC_preload.elements.Button.type = "button";
  AWC_preload.elements.Button.onclick = AWC_preload.startPreload;
  AWC_preload.elements.Button.id = "preload_input";
  AWC_preload.elements.Button.value = "Preload images";
  
  // New InputValue properites
  AWC_preload.elements.InputField.id = "preload_output";
  AWC_preload.elements.InputField.type = "text";
  AWC_preload.elements.InputField.readOnly = true;
  AWC_preload.elements.InputField.value = "stoped"
  AWC_preload.elements.InputField.style.display = 'none';
   
  // Adding elements to site
  mainDiv.appendChild(AWC_preload.elements.InputField);
  mainDiv.appendChild(AWC_preload.elements.Button);
}

// Ignition of preloading
AWC_preload.startPreload = function () {
	// Updating class fields
	AWC_preload.lists = {};
	AWC_preload.lists.down;
	AWC_preload.lists.img;
	AWC_preload.lists.thumb;

	AWC_preload.current;
	AWC_preload.checkInterval = 250;
	AWC_preload.preloadHalt = false;
	
	// Makeing input field visible
  AWC_preload.elements.InputField.style.display = '';


  // Generating images to download
  AWC_preload.lists.down = getElementByClass("span", "wrap2");
  AWC_preload.lists.thumb = getElementByClass("img", "thumbnail");
  
  // List of images in memory which will be downloaded
  AWC_preload.lists.img = new Array(AWC_preload.lists.down.length);
  
  // Changing Button properties
  AWC_preload.elements.Button.value = "Pause";
  AWC_preload.elements.Button.onclick = AWC_preload.pausePreload;
  
  // Start download
  AWC_preload.current = 0;
  AWC_preload.lists.img[0] = new Image();
  AWC_preload.lists.img[0].src = AWC_preload.lists.down[0].firstChild.nextSibling.href
  AWC_preload.generateValue();
  
  // Setting the "sleep"
  setTimeout("AWC_preload.nextPreload()", AWC_preload.checkInterval);
}

AWC_preload.pausePreload = function () {
  // Changing labels
  AWC_preload.elements.InputField.value += " (paused)";
  AWC_preload.elements.Button.value = "Resume";
  AWC_preload.elements.Button.onclick = AWC_preload.resumePreload;
  
  // Pause the download process
  AWC_preload.preloadHalt = true;
}

AWC_preload.resumePreload = function () {
  // Changing labels
  AWC_preload.generateValue();
  AWC_preload.elements.Button.onclick = AWC_preload.pausePreload;
  AWC_preload.elements.Button.value = "Pause";
  
  // Resume the download process
  AWC_preload.preloadHalt = false;
  --AWC_preload.current;
  AWC_preload.nextPreload();
}

AWC_preload.nextPreload = function () {
  // If the current image isn't downloaded yet try again some time later
  if (AWC_preload.lists.img[AWC_preload.current].complete == false) {
    setTimeout("AWC_preload.nextPreload()", AWC_preload.checkInterval);
  }
  // When image is downloaded
  else {
    ++AWC_preload.current;
    // Check if there is something to download (if everythig is downloaded)
    if (AWC_preload.current < AWC_preload.lists.down.length) {
    	// Check if paused
      if (AWC_preload.preloadHalt == false) {
      	// Start download new image
		    AWC_preload.lists.img[AWC_preload.current] = new Image();
		    AWC_preload.lists.img[AWC_preload.current].src = AWC_preload.lists.down[AWC_preload.current].firstChild.nextSibling.href;
		    
		    // Change the value
		    AWC_preload.generateValue();
		    
		    // Set next check
		    setTimeout("AWC_preload.nextPreload()", AWC_preload.checkInterval);
      }
      else {
        AWC_preload.generateValue("(paused)");
      }
    }
    // If everything is downloaded
    else {
      AWC_preload.lists.thumb[AWC_preload.lists.down.length - 1].title += " (downloaded)"
      AWC_preload.elements.InputField.value = "100%"
      AWC_preload.elements.Button.onclick = "";
    }
  }
}

AWC_preload.addElements();