// ==UserScript==
// @name           changeElements
// @namespace      tag:a_hal89@hotmail.com,2008-05-22:Ahal
// @description    Allows you to modify Links, Buttons and Images.
// @include        http://*.google.*,http://*.indowebster.*,http://*cdn.x.indowebster.com*
// ==/UserScript==

/* Do not modify this unless you know what you're doing */
var lnk=document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var btn=document.evaluate("//input[@value]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var img=document.evaluate("//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var toReplace = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
var modifyLink = new Links(); 
var modifyButton = new Buttons();
var modifyImage = new Images();

/* ---Instructions---
   1. Find a link, button or image on Google (or another site you included) that you wish to change.
   2. If it is a button, go to the button section.  If it is a link, go to the link section.  If it is an image, go to the image section.
   3. Copy the template function call, or create a new function call.  A complete list of templates is commented below.
   4. Fill the parameters with the values you want, make sure they are in quotes (except for RegexEnabled).
   5. Leave the field blank ("") if you wish it to remain unchanged.
   6. If you want to use regular expressions to search for a match instead of plain text, set RegexEnabled to 1.	
   
   Note: In the case of images, byText refers to the image's alternate text.
*/


/* ---Link Section--- */
modifyLink.byText ("ExpectedText", "DesiredText");



/* ---Button Section--- */   	
modifyButton.byText ("ExpectedText", "DesiredText");



/* ---Image Section---*/
modifyImage.byText ("ExpectedText", "DesiredSource");



/* Complete list of valid function calls:

modifyLink.byText (ExpectedText, DesiredText);
modifyLink.byText (ExpectedText, DesiredText, RegexEnabled);
modifyLink.byText (ExpectedText, DesiredText, DesiredTarget, RegexEnabled);
modifyLink.byTarget (ExpectedTarget, DesiredTarget);
modifyLink.byTarget (ExpectedTarget, DesiredTarget, RegexEnabled);
modifyLink.byTarget (ExpectedTarget, DesiredText, DesiredTarget, RegexEnabled);

modifyButton.byText (ExpectedText, DesiredText);
modifyButton.byText (ExpectedText, DesiredText, RegexEnabled);

modifyImage.byText (ExpectedText, DesiredSource);
modifyImage.byText (ExpectedText, DesiredSource, RegexEnabled);
modifyImage.byText (ExpectedText, DesiredSource, DesiredHeight, DesiredWidth);
modifyImage.byText (ExpectedText, DesiredSource, DesiredHeight, DesiredWidth, RegexEnabled);
modifyImage.bySource (ExpectedSource, DesiredSource);
modifyImage.bySource (ExpectedSource, DesiredSource, RegexEnabled);
modifyImage.bySource (ExpectedSource, DesiredSource, DesiredHeight, DesiredWidth);
modifyImage.bySource (ExpectedSource, DesiredSource, DesiredHeight, DesiredWidth, RegexEnabled);
*/


/* Do not modify the section below unless you know what you're doing */

/* Links */
function Links (){
	addMethod(this, "byText", function(ExpectedName, DesiredName){
		ExpectedName = "^" + ExpectedName.replace(toReplace, "\\$1") + "$";
		re = new RegExp(ExpectedName)
		for(i = 0; i < lnk.snapshotLength; i++) {
			tmp = lnk.snapshotItem(i);
			if(re.test(tmp.innerHTML)){
				if (DesiredName != ""){
					tmp.innerHTML = DesiredName;
				}
			}
		}				
	});
	
	addMethod(this, "byText", function(ExpectedName, DesiredName, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedName = "^" + ExpectedName.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedName)
		for(i = 0; i < lnk.snapshotLength; i++) {
			tmp = lnk.snapshotItem(i);
			if(re.test(tmp.innerHTML)){
				if (DesiredName != ""){
					tmp.innerHTML = DesiredName;
				}
			}
		}				
	});
	
	addMethod(this, "byText", function(ExpectedName, DesiredName, DesiredTarget, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedName = "^" + ExpectedName.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedName)
		for(i = 0; i < lnk.snapshotLength; i++) {
			tmp = lnk.snapshotItem(i);
			if(re.test(tmp.innerHTML)){
				if (DesiredName != ""){
					tmp.innerHTML = DesiredName;
				}
				if (DesiredTarget != ""){
					tmp.href = DesiredTarget;
				}
			}
					else if(re.test(tmp.href)){
				if (DesiredName != ""){
					tmp.innerHTML = DesiredName;
				}
				if (DesiredTarget != ""){
					tmp.href = DesiredTarget;
				}
			}
		}				
	});
	
	addMethod(this, "byTarget", function (ExpectedTarget, DesiredTarget){
		ExpectedTarget = "^" + ExpectedTarget.replace(toReplace, "\\$1") + "$";
		re = new RegExp(ExpectedTarget);
		for(i = 0; i < lnk.snapshotLength; i++) {
			tmp = lnk.snapshotItem(i);
			if(re.test(tmp.href)){
				if (DesiredTarget != ""){
					tmp.href = DesiredTarget;
				}
			}
		}				
	});
	
	addMethod(this, "byTarget", function (ExpectedTarget, DesiredTarget, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedTarget = "^" + ExpectedTarget.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedTarget);
		for(i = 0; i < lnk.snapshotLength; i++) {
			tmp = lnk.snapshotItem(i);
			if(re.test(tmp.href)){
				if (DesiredTarget != ""){
					tmp.href = DesiredTarget;
				}
			}
		}				
	});
	
	addMethod(this, "byTarget", function (ExpectedTarget, DesiredName, DesiredTarget, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedTarget = "^" + ExpectedTarget.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedTarget);
		for(i = 0; i < lnk.snapshotLength; i++) {
			tmp = lnk.snapshotItem(i);
			if(re.test(tmp.href)){
				if (DesiredName != ""){
					tmp.innerHTML = DesiredName;
				}
				if (DesiredTarget != ""){
					tmp.href = DesiredTarget;
				}
			}
		}				
	});
}


/* Buttons */
function Buttons (){

addMethod (this, "byText", function(ExpectedName, DesiredName){
		ExpectedName = "^" + ExpectedName.replace(toReplace, "\\$1") + "$";
		re = new RegExp(ExpectedName)
		for(i = 0; i < btn.snapshotLength; i++) {
			tmp = btn.snapshotItem(i)
			if(re.test(tmp.value)){
				if (DesiredName != ""){
					tmp.value = DesiredName;
				}
			}
		}				
	});

addMethod (this, "byText", function(ExpectedName, DesiredName, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedName = "^" + ExpectedName.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedName)
		for(i = 0; i < btn.snapshotLength; i++) {
			tmp = btn.snapshotItem(i)
			if(re.test(tmp.value)){
				if (DesiredName != ""){
					tmp.value = DesiredName;
				}
			}
		}				
	});
}	

/* Images */
function Images (){

addMethod (this, "byText", function(ExpectedText, DesiredSource){
		ExpectedText = "^" + ExpectedText.replace(toReplace, "\\$1") + "$";
		re = new RegExp(ExpectedText)
		for(i = 0; i < img.snapshotLength; i++) {
			tmp = img.snapshotItem(i)
			if(re.test(tmp.alt)){
				if (DesiredSource != ""){
					tmp.src = DesiredSource;
				}
			}
		}				
	});
	
addMethod (this, "byText", function(ExpectedText, DesiredSource, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedText = "^" + ExpectedText.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedText)
		for(i = 0; i < img.snapshotLength; i++) {
			tmp = img.snapshotItem(i)
			if(re.test(tmp.alt)){
				if (DesiredSource != ""){
					tmp.src = DesiredSource;
				}
			}
		}				
	});
addMethod (this, "byText", function(ExpectedText, DesiredSource, DesiredHeight, DesiredWidth){
		ExpectedText = "^" + ExpectedText.replace(toReplace, "\\$1") + "$";
		re = new RegExp(ExpectedText)
		for(i = 0; i < img.snapshotLength; i++) {
			tmp = img.snapshotItem(i)
			if(re.test(tmp.alt)){
				if (DesiredSource != ""){
					tmp.src = DesiredSource;
				}
				if (DesiredHeight != ""){
					tmp.height = DesiredHeight;
				}
				if (DesiredWidth != ""){
					tmp.width = DesiredWidth;
				}
			}
		}				
	});
addMethod (this, "byText", function(ExpectedText, DesiredSource, DesiredHeight, DesiredWidth, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedText = "^" + ExpectedText.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedText)
		for(i = 0; i < img.snapshotLength; i++) {
			tmp = img.snapshotItem(i)
			if(re.test(tmp.alt)){
				if (DesiredSource != ""){
					tmp.src = DesiredSource;
				}
				if (DesiredHeight != ""){
					tmp.height = DesiredHeight;
				}
				if (DesiredWidth != ""){
					tmp.width = DesiredWidth;
				}
			}
		}				
	});
addMethod (this, "bySource", function(ExpectedSource, DesiredSource){
		ExpectedSource = "^" + ExpectedSource.replace(toReplace, "\\$1") + "$";
		re = new RegExp(ExpectedSource)
		for(i = 0; i < img.snapshotLength; i++) {
			tmp = img.snapshotItem(i)
			if(re.test(tmp.src)){
				if (DesiredSource != ""){
					tmp.src = DesiredSource;
				}
			}
		}				
	});
addMethod (this, "bySource", function(ExpectedSource, DesiredSource, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedSource = "^" + ExpectedSource.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedSource)
		for(i = 0; i < img.snapshotLength; i++) {
			tmp = img.snapshotItem(i)
			if(re.test(tmp.src)){
				if (DesiredSource != ""){
					tmp.src = DesiredSource;
				}
			}
		}				
	});
	
addMethod (this, "bySource", function(ExpectedSource, DesiredSource, DesiredHeight, DesiredWidth){
		ExpectedSource = "^" + ExpectedSource.replace(toReplace, "\\$1") + "$";
		re = new RegExp(ExpectedSource)
		for(i = 0; i < img.snapshotLength; i++) {
			tmp = img.snapshotItem(i)
			if(re.test(tmp.src)){
				if (DesiredSource != ""){
					tmp.src = DesiredSource;
				}
				if (DesiredHeight != ""){
					tmp.height = DesiredHeight;
				}
				if (DesiredWidth != ""){
					tmp.width = DesiredWidth;
				}
			}
		}				
	});
	
addMethod (this, "bySource", function(ExpectedSource, DesiredSource, DesiredHeight, DesiredWidth, RegexEnabled){
		if (RegexEnabled != 1){
			ExpectedSource = "^" + ExpectedSource.replace(toReplace, "\\$1") + "$";
		}
		re = new RegExp(ExpectedSource)
		for(i = 0; i < img.snapshotLength; i++) {
			tmp = img.snapshotItem(i)
			if(re.test(tmp.src)){
				if (DesiredSource != ""){
					tmp.src = DesiredSource;
				}
				if (DesiredHeight != ""){
					tmp.height = DesiredHeight;
				}
				if (DesiredWidth != ""){
					tmp.width = DesiredWidth;
				}
			}
		}				
	});

}	

//Used for overloading methods, by John Resig
function addMethod(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
        if ( fn.length == arguments.length )
            return fn.apply( this, arguments );
        else if ( typeof old == 'function' )
            return old.apply( this, arguments );
    };
}

// ==/UserScript==