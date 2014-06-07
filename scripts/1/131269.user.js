// ==UserScript==
// @name           Zevera Auto Linker V10
// @namespace      Changes all Links to "Zevera Links". 
// @description    Changes all Links to "Zevera Links". 
// @include        *
// @exclude        http://google.com/*
// @By Antonio Monteiro
// ==/UserScript==

//MODIFIED FOR ZEVERA

/* Do not modify this unless you know what you're doing */
var lnk=document.evaluate("//a[@href]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var btn=document.evaluate("//input[@value]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
var img=document.evaluate("//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var toReplace = /(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\^|\$)/g;
var modifyLink = new Links(); 
var modifyButton = new Buttons();
var modifyImage = new Images();

modifyLink.byTarget ("2shared.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("4shared.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("asfile.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("bayfiles.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("bitshare.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("bulletupload.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("crocko.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("easybytez.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("extabit.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("fiberupload.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("fileape.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("filebox.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("filedino.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("fileduct.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("filefactory.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("filemonster.net/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("filepost.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("filereactor.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("fileserving.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("filesmonster.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("filevelocity.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("freakshare.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("furk.net/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("hotfile.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("ifile.it/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("jumbofiles.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("kickload.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("letitbit.net/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("mediafire.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("megashare.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("megashares.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("netload.in/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("rapidgator.net/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("rarefile.net/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("rapidshare.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("sendspace.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("shareflare.net/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("share-online.biz/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("shragle.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("turbobit.net/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("unibytes.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("ul.to/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("uploaded.to/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);
modifyLink.byTarget ("uploading.com/*", "http://www.zevera.com/getFiles.aspx?ourl=", 1);

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
					tmp.href = DesiredTarget + lnk.snapshotItem(i);
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