// ==UserScript==
// @name           Forum Ados.fr anciens styles
// @namespace      http://forum.ados.fr
// @description    Forum Ados.fr anciens styles
// @include        http://forum.ados.fr*
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
		injectCSS("*{font-family: trebuchet ms,Verdana,Arial,Helvetica,sans-serif;}")
		injectCSS("#site{width:778px;border:1px solid #f86093;margin-top:5px;margin-left:auto;margin-right:auto;}")
		injectCSS("#barre{clear:both;background-color:#e52767;color:white;font-weight:bold;padding:5px;font-family:Arial;font-size:11px;text-align:center;}")
		injectCSS("#barre a{padding:5px 2px 5px 2px;color:white;text-decoration:none;}")
		injectCSS("#barre a:hover{color:#e52767;background-color:#FFFFFF;text-decoration:none;}")
		injectCSS("#header{width:778px;height:260px;background-repeat:no-repeat;background-color:white;}")
		injectCSS("#liens{position:relative;top:180px;color:white;font-weight:bold;text-align:center;font-size:11pt;}")
		injectCSS("#liens a {color:white;text-decoration:none;font-size:10pt;}")
		injectCSS("#liens a:hover {text-decoration:underline;}")
		injectCSS("#mesdiscussions .messCase1 {width:150px;}")
    }
    catch (e)
    {
        alert("Exception:\n" + e);
    }

})();