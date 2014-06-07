// Pootle Google Translate
// version 1
// 2012-11-7
// Copyright (c) 2012, Carlos Ramirez
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Pootle Google Translate
// @namespace      http://www.crramirez.com
// @description    Includes a button to include the translation from Google Translate
// @include        http://pootle.winehq.org/es/*
// ==/UserScript==


var iframe = null;

function pootleTranslate() {
    var originalText = document.getElementById("id_source_f_0").value;
    var textArea = document.getElementById("id_target_f_0");

    if( textArea.value == "" && !document.getElementById("translate-suggestion-container")) {
    /*  Comment here to automatically translate, uncomment to gewnerate a button */
	var link = document.createElement("button");
	link.innerHTML = "Google Translate";
	link.originalText = originalText;
	link.textArea = textArea;
	link.styleClass = "common-buttons-block";
	link.onclick = function() {
	    var translated = translate(this.originalText, link.textArea, true);
	    
	    
	    return false;
	}
	
	textArea.parentNode.appendChild(link);
    /* Comment end */


//        translate(originalText, textArea, true); //Uncomment this for automatic translation
    }

}

setTimeout(pootleTranslate, 5000);

function translate(whatToTranslate, textArea, suggest) {
	
	
        var cel = window.location.pathname;
	cel = cel.substring(1, 3);
	
        var httpRequest = null;

        var baseUrl = "http://translate.google.hu/translate_t";
        var urlParams = "text="+encodeURIComponent(whatToTranslate)+"&hl="+cel+"&langpair=auto|"+cel+"&tbb=1";

        function removeHTMLTags(mitkell) { //string megtisztitasa a HTML-tagektol
           var strTagStrippedText = mitkell.replace(/<\/?[^>]+(>|$)/g, "");
           return strTagStrippedText;
        }

        function infoReceived() {  //ha erkezett valasz a Google-tol, akkor a forditas megjelenitese
           var allstring = document.getElementById("translator-strings");
           var output = httpRequest.responseText;
           if (whatToTranslate[0]==" ") { var kezdospace=" "; } else { var kezdospace=""; } //ha a kijelolt szoveg elso karaktere space, akkor a leforditott ele is teszunk
           if (whatToTranslate[whatToTranslate.length-1]==" ") { var vegespace=" "; } else { var vegespace=""; } //ha a kijelolt szoveg utolso karaktere space, akkor a leforditott ele is teszunk
           if (output.length) { //kimeneti string felepitese
              output = output.replace(/&quot;/gi,'"');
              output = output.replace(/&lt;/gi,'<');
              output = output.replace(/&gt;/gi,'>');
              output = output.replace(/&amp;/gi,'&');
              output = output.replace(/&#39;/gi,"'");
              var fieldArray = output.split('</head>');
              if (fieldArray[1].search('class="short_text"')!=-1) {
                 var tempResz = fieldArray[1].split('<span id=result_box class="short_text">');
              }
              else if (fieldArray[1].search('class="medium_text"')!=-1) {
                 var tempResz = fieldArray[1].split('<span id=result_box class="medium_text">');
              }
              else {
                 var tempResz = fieldArray[1].split('<span id=result_box class="long_text">');
              }
              var kimenet = tempResz[1].split('</span></div>');

	      textArea.value = kezdospace+removeHTMLTags(kimenet[0])+vegespace;

//	      document.getElementById("translate").elements["suggest"].click(); //uncomment it for automated suggestion submission
           }
        }

        httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", baseUrl, true);
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpRequest.onload = infoReceived;
        httpRequest.send(urlParams);
  }