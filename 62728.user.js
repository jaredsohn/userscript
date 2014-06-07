//
// This script is in public domain.
// Author: Jorkar
// It reuses Sebsauvage's functions from here : http://sebsauvage.net/temp/ccm/ccm.user.js
//
// ==UserScript==
// @name          Jovanovic
// @namespace     Jorkar
// @description	  Modifie la page blog.htm du site www.jovanovic.com
// @include       http://www.jovanovic.com/blog.htm
// ==/UserScript==


(function () {
    // Removes all occurences of elements whose XPath is provided from the document.
    //
    // Example: Remove all tables which use the CSS class 'toto':
    //          removeElement("//table[@class='toto']");
    function removeElement(ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
        {
            element = alltags.snapshotItem(i);
            element.parentNode.removeChild(element);  // Remove this element from its parent.
        }
    }  
    
    // Removes an attribute from all occurences of elements whose XPath is provided.
    // (All occurences of this elements are processed.)
    //
    // Example: Remove the bgcolor of all <table>:
    //          removeAttributeOfElement('bgcolor',"//table[@bgcolor]")
    //          Remove the fixed with of all tables or cells::
    //          removeAttributeOfElement('width',"//table[@width]|//td[@width]")
    function removeAttributeOfElement(attributeName,ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
            alltags.snapshotItem(i).removeAttribute(attributeName);    
    }
    
    // Set an attribute from all occurences of elements to a specified value.
    // The previous value of this attribute is discarded.
    // (All occurences of this elements are processed.)
    //
    // Example: Set with to 80 columns on all texteareas:
    //          setAttributeOfElement('cols',80,"//textarea")
    function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
            alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
    }    
      
    // Inject your own CSS in the page.
    // Example: Do not underline link:
    //          injectCSS("a{text-decoration: none;}")
    function injectCSS(cssdata)
    {
        head = document.getElementsByTagName("head")[0];
        style = document.createElement("style");
        style.setAttribute("type", 'text/css');
        style.innerHTML = cssdata;
        head.appendChild(style);
    }
      
    try
    {
    	removeElement("//table[position()<=5]");
    	removeElement("//table[last()]");
	removeElement("//img[position()<=12]");
	removeElement("//br[position()<=10]");
	removeElement("//font[@face='arial']");
    }
        
    catch (e)
    {
        alert("UserScript exception:\n" + e);
    }

})();


