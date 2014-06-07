// ==UserScript==
// @name           Stuff NZ Gallery Enhancer
// @namespace      http://userscripts.org/users/124800
// @description    Simply scroll to view photos. No more clicking "Next".
// @include        http://*.stuff.co.nz/*
// @version        1.0.1
// ==/UserScript==



// Functions!

/*
	getElementsByClassName() - Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
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
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
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
};

function gebi(el)
{
	return document.getElementById(el);
}

// End functions

if (gebi("gallery"))
{
	gebi("gallery-container").style.height = "auto";
	gebi("gallery-container").style.lineHeight = "auto";
	var imgs = getElementsByClassName("photoborder","img");
	var newHTML = "";
	var imgNumber = "";
	for (keyVar in imgs)
	{
		if (imgs[keyVar].className != "photoborder poll-image")
		{
			imgNumber = imgs[keyVar].id.substr(8);
			if (gebi("photocredittext"+imgNumber) != null)
			{
				newHTML += '<div style="text-align:center; margin-top:10px"><img src="'+imgs[keyVar].src+'" alt="" class="photoborder" style="max-width:600px" /></div>';
				newHTML += '<div style="text-align:right;float:right;font-size:10px;line-height:10px;padding:6px 11px 11px 15px;opacity:.7">'+imgNumber+' of '+gebi("lastslide").innerHTML+'<br />'+gebi("photocredittext"+imgNumber).innerHTML+'</div>';
				newHTML += '<div style="padding:4px 10px 5px 10px; line-height:11px; height:auto">'+gebi("slideshowimagecaption"+imgNumber).innerHTML+'</div>';
			}
		}
	}
	gebi("slideshowbottompanel").style.display = "none";
	
	//Here's some code to make a link to jump down to the bottom of the photos, but I've decided not to enable it for now:
	// newHTML += '<a name="bottom_article"></a>';
	// getElementsByClassName("slideshow_top")[0].style.cssFloat = "left";
	// getElementsByClassName("slideshow_top")[0].innerHTML = '<a href="#bottom_article">Jump to the article</a>';
	
	getElementsByClassName("photo_number")[0].style.display = "none";
	
	if (getElementsByClassName(" jcarousel-skin-stuff")[0] != null)
	{
		getElementsByClassName(" jcarousel-skin-stuff")[0].style.display = "none";
	}
	
	gebi("gallery-container").innerHTML = newHTML;
}