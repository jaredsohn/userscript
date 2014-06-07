// ==UserScript==
// @name          NZ On Screen download script v0.1
// @namespace     http://www.additiverich.com/gm/
// @description   Insert links to FLV files on http://www.nzonscreen.com/
// @include       http://nzonscreen.com/title/*
// @include       http://www.nzonscreen.com/title/*
// ==/UserScript==

var o = document.getElementsByTagName("param");
for(i = 0; i < o.length; i++) { 
  var t = o[i];
  if(t.name && (t.name == "flashvars")) {
    if(t.value.indexOf("titleID") > -1) {
      var regex = /\btitleID=(.*?)[&|\b]/;
      if((results = regex.exec(t.value)) != null) {
        titleId = results[1];
        url = document.location.protocol + "//" + document.location.hostname + "/related_material_data_output/title_videos/" + titleId;
        GM_xmlhttpRequest({
          method: 'GET',
          url   : url,
          onload : function(r) {
	    var text = r.responseText;
	    var parser = new DOMParser();
	    var dom = parser.parseFromString(text, "application/xml");
	    
	    /* Work out video prefix */
	    var videoPrefix = "";
	    var imageScroller = dom.getElementsByTagName("imageScroller");
	    if(imageScroller.length > 0) {
	    	var element = imageScroller[0];
	    	var attributes = element.attributes;
	    	var a = new Array();
	    	for(j = 0; j < attributes.length; j++) {
	    	  a[attributes[j].nodeName] = attributes[j].nodeValue;
	    	}
	    	
	    	if(a["videoPrefix"]) { videoPrefix = a["videoPrefix"]; }
	    }
	    
  	    var clips = new Array();	    
	    if(videoPrefix.length > 0) {

	    	var imageBoxes = dom.getElementsByTagName("imageBox");
	    	if(imageBoxes.length > 0) {
	    	  /* For each "image box" */

	    	  for(j = 0; j < imageBoxes.length; j++) {
	    	    var element = imageBoxes[j];
	    	    var values = new Array();	    	    
	    	    for(k = 0; k < element.attributes.length; k++) {
	    	      values[element.attributes[k].nodeName] = element.attributes[k].nodeValue;
	    	    }
	    	    clips[j] = values;
	    	  }
	    	}
	    }
	    
	    var result = "";
	    if(clips.length > 0) {
	      for(j = 0; j < clips.length; j++) {
	        vars = clips[j];
	        
	        var label = vars['label'];
	        
	        var loResLink = "(unavailable)";
	        var loSize = vars['videoLoBytes'];
	        if(loSize != "0") {
	          loSize = Math.round(loSize / 1000) + "kb";
	          loRes  = videoPrefix + vars['videoLoRes'];
	          
	          loResLink = "<a href=\"" + loRes + "\">" + loSize + "</a>";
	        }
	        loResLink = "Low-resolution: " + loResLink;
	        
	        var hiResLink = "(unavailable)";
	        var hiSize = vars['videoHiBytes'];
	        if(hiSize != "0") {
	          hiSize = Math.round(hiSize / 1000) + "kb";
	          hiRes  = videoPrefix + vars['videoHiRes'];
	          
	          hiResLink = "<a href=\"" + hiRes + "\">" + hiSize + "</a>";
	        }
	        hiResLink = "High-resolution: " + hiResLink;	        
	        
	        result += label + ": " + loResLink + " | " + hiResLink;
	        result += "<br />";
	      }
	    }
	    
	    if(result.length > 0) {
	      result = "<h2><span>&nbsp;</span>Direct Downloads</h2><div class=\"\"><p>" + result + "</p><div>";
	      var e = document.getElementById("widget_title_synopsis");
	      e.innerHTML = result + e.innerHTML;
	    }
          }
        });

      }
    }
  }
}