// ==UserScript==
// @name           Digg Picture Preview
// @namespace      DiggPics
// @description    Preview pictures on digg when submitted.
// @include        http://www.digg.com/*
// ==/UserScript==


 var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='news-body']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv 
	if(!(thisDiv.firstChild.firstChild==null)) {
		if(checkImage(thisDiv.firstChild.firstChild.toString())) {
			thisDiv.firstChild.firstChild.innerHTML +="<span class=\"news-img\" style=\"background: transparent url("+thisDiv.firstChild.firstChild.toString()+") repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\"><em>watch!</em></span>";
			//alert(thisDiv.parentNode.attributes.getNamedItem("class").toString());
			thisDiv.parentNode.attributes.setNamedItem(MakeAttribute("class",thisDiv.parentNode.attributes.getNamedItem("class").value+" v"));
		}
	}
}
       
   function MakeAttribute(attName, attValue)
   {
    var objAttribute=document.createAttribute(attName);
    objAttribute.value = attValue;
    return objAttribute;
   }
   
  function checkImage(str) 
  {
  if (str.indexOf('.jpg')>-1) return true;
  if (str.indexOf('.gif')>-1) return true;
  if (str.indexOf('.bmp')>-1) return true;
  if (str.indexOf('.png')>-1) return true;
  //if (str.indexOf('.html')>-1) return true;
 // if (str.indexOf('.htm')>-1) return true;
return false;  
  }

