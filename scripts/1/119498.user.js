// ==UserScript==
// @name           SendCookeryToReader
// @namespace      SendCookeryToReader
// @description    Convert some Hungarian Web cook book pages for better readibility on eReaders (e.g. Kindle). Unfortunatelly, SENDToREADER converts wrongly these recipe pages, so some modification is needed before sending out the pages. This script still use SENDToREADER (http://sendtoreader.com/), so an account is required for proper functionality. Some more supported websites will be added later. Usage: use two new added links on the recipe pages: "SendToKindle" and "Setup SENDtoREADER".
// @include        http://www.nosalty.hu/recept/*
// ==/UserScript==

var debug = false; // true: only preview, false: normal work

if (window.top != window.self) { //don't run on frames or iframes
    return;
}
var newframe, showframe;
function IFrame(parentElement) {
   // Create the iframe which will be returned
   var iframe = document.createElement("iframe");
   

   // If no parent element is specified then use body as the parent element
   if(parentElement == null) {
      parentElement = document.body;
  }
   // This is necessary in order to initialize the document inside the iframe
   parentElement.appendChild(iframe);

   // Initiate the iframe's document to null
   iframe.doc = null;

   // Depending on browser platform get the iframe's document, this is only
   // available if the iframe has already been appended to an element which
   // has been added to the document
   if(iframe.contentDocument) {
      // Firefox, Opera
      iframe.doc = iframe.contentDocument;
   } else if(iframe.contentWindow) {
      // Internet Explorer
      iframe.doc = iframe.contentWindow.document;
   } else if(iframe.document) {
      // Others?
      iframe.doc = iframe.document;
   }
   // If we did not succeed in finding the document then throw an exception
   if(iframe.doc == null) {
      throw "Document not found, append the parent element to the DOM before creating the IFrame";
   }
   // Create the script inside the iframe's document which will call the
   //iframe.doc.open();
   //iframe.doc.close();
   
   // Return the iframe, now with an extra property iframe.doc containing the
   // iframe's document
   return iframe;
}
function IFrameOnload() {
try
  {
showframe.style.display = 'none';
showframe.parentNode.removeChild( showframe );
newframe.parentNode.removeChild( newframe );
  }
catch(err)
  {
  var txt="There was an error on this page.\n\n";
  txt+="Error description: " + err.description + err+"\n\n";
  txt+="Click OK to continue.\n\n";
  alert(txt);
  }
}
 
function setupSENDtoREADERaccount() {
GM_setValue("SRuser", prompt("SENDtoREADER felhasználó:", GM_getValue("SRuser")));
GM_setValue("SRpassword", prompt("SENDtoREADER jelszó:", ""));
}

function post_to_url(url, params) {
    var i;
	var ret;
	newframe = new IFrame(document.body);
	//newframe.setAttribute('style', 'z-index: 7543234562; position: fixed; left:10px;top:90px;width:162px; height: 80px; border: 1px solid #222;');

	
	showframe = new IFrame(document.body);
	showframe.setAttribute('style', 'z-index: 7543234562; position: fixed; left:10px;top:10px;width:362px; background-color:#FFFFE0;height: 80px; border: 1px solid #222;');

	showframe.doc.write("Küldés könyvolvasóra...");
	var buttonsend =showframe.doc.createElement("li");
	buttonsend.innerHTML = "<a href=\"javascript:void(0)\">SENDToREADER felhasználó és jelszó változtatás</a>";
	buttonsend.addEventListener("click", setupSENDtoREADERaccount, true);
	showframe.contentDocument.body.appendChild(buttonsend);
	
	buttonsend =showframe.doc.createElement("li");
	buttonsend.innerHTML = "<a href=\"http://sendtoreader.com\" target=\"_parent\">Mi a SENDtoREADER?</a>";
	showframe.contentDocument.body.appendChild(buttonsend);
	
	var form = newframe.contentDocument.createElement('form');
    form.action = url;
    form.method = 'POST';
	form.acceptCharset = "utf-8";

    for (i in params) {
        if (params.hasOwnProperty(i)) {
            var input = newframe.contentDocument.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
			ret+="param: "+i+", value: "+params[i]+"<br>";
            form.appendChild(input);
			
        }
    }
	
	newframe.contentDocument.body.appendChild(form);
	
	form.submit();
	setTimeout( IFrameOnload, 5000 );
	
}

function sending(title, author, text) {
if (debug) {
	document.body.innerHTML = "<a href=\""+document.URL+"\"><h1>"+title+"</h1></a><br>"+text;
} else {
 if (!GM_getValue("SRuser") || (!GM_getValue("SRpassword"))) {
    setupSENDtoREADERaccount();
 }
 post_to_url("https://sendtoreader.com/api/send/", { "username" : GM_getValue("SRuser"), "password" : GM_getValue("SRpassword"), "title" : title, "author" : author, "text" : text} );
}
}

function errormsg(err) {
	var txt="There was an error on this page.\n\n";
	if (err.description) {
		txt+="Error description: " + err.description+"\n\n";
	} else {
		txt+="Error: " + err+"\n\n";
	}
	
    txt+="Click OK to continue.\n\n";
	alert(txt);
}

/*
 *  Begin of Custom Parsers
 */

function ParseNoSalty() {
var title = "";
var text = "";
	try {
		title = document.getElementsByTagName("h1")[0].innerHTML;
		text+=document.getElementsByClassName("blk-float field-field-fo-kep")[0].innerHTML;
		text+=document.getElementsByClassName("field-wrapper field-field-hozzavalok")[0].innerHTML;
		text+=document.getElementsByClassName("field-wrapper field-field-elkeszites")[0].innerHTML;
		text+=document.getElementsByClassName("field-wrapper field-field-story")[0].innerHTML;

		text+=document.getElementsByClassName("comment-wrapper comment-wrapper-recept")[0].innerHTML;
	}
	catch(err)
	{
		errormsg(err);
	}

sending(title, "NoSalty", text);
}

function AddButtonNoSalty() {
	var menu = document.getElementsByClassName("tabs primary ns-tabs ns-gomb")[0];
	var buttonsend =document.createElement("li");
	buttonsend.innerHTML = "<a href=\"javascript:void(0)\">könyvolvasóra >></a>";
	buttonsend.addEventListener("click", ParseNoSalty, true);
	menu.insertBefore(buttonsend, menu.childNodes[1]);
}

/*
 *  End of Custom Parsers
 */


var a = AddButtonNoSalty();
