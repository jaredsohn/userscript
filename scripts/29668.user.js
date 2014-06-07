// ==UserScript==
// @name           Youtube to vtunnel linker
// @namespace      nitecs
// @description    Converts youtube links to vtunnel links, its really useful if you live in Turkey :))
// @include        http://*
// @include        https://*
// ==/UserScript==

var allObjects, thisObject;

allObjects = document.getElementsByTagName('param');


for (var i = 0; i < allObjects.length; i++) {
    thisObject = allObjects[i];
    if (thisObject.value.search(/youtube.com/i) != -1)
	{
		var newLink;
		var son;
		newLink = document.createElement('a');
		newLink.href = thisObject.value;	
		son = thisObject.value.search(/&/i);

		if (son == -1)
			{newLink.href = 'http://www.youtube.com/watch?v=' + thisObject.value.substring(25);}
		else
			{newLink.href = 'http://www.youtube.com/watch?v=' + thisObject.value.substring(25,son);}
			
		newLink.innerHTML = '<br><table style="background-color:white; width:350px; font-size:13pt; color:red; font-family:Verdana; font-weight:bold; text-decoration:none; border:solid 2px red;" border="0"><tr><td align="center">Video link ile degistirildi</td></tr><tr><td align="center">Videoyu izlemek için tikla</td></tr></table><br>';
		thisObject.parentNode.parentNode.replaceChild(newLink, thisObject.parentNode);
	}
}

var allLinks, thisLink;

allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if (thisLink.href.search(/youtube.com/i) != -1)
	{
		var oclk;
		
		oclk = 'var submitForm = document.createElement("FORM");';
		oclk += 'document.body.appendChild(submitForm);';
		oclk += 'submitForm.method = "POST";';
		oclk += 'submitForm.target = "_BLANK";';
		oclk += 'submitForm.action = "https://www.vtunnel.com/index.php/1000110A/3e29eb12c571bc78ee2ac81d2d18720";';
		oclk += 'var newElement = document.createElement("input");';
		oclk += 'newElement.type = "hidden";';
		oclk += 'newElement.name = "username";';
		oclk += 'newElement.value = "' + thisLink.href + '";';
		oclk += 'submitForm.appendChild(newElement);';
		oclk += 'submitForm.submit();';
		oclk += 'return false;';
		
		thisLink.setAttribute("onclick",oclk);		
		thisLink.href = '#';		
		thisLink.target = '_blank';
	}
}


