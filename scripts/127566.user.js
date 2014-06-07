// ==UserScript==
// @name            NewKaskus Simple Reply
// @author          edit by me
// @description     Simple post reply interface on LiveBeta by Ndilallah
// @license         Creative Commons Attribution License
// @version	        1.1
// @released        2012-03-05
// @compatible      Greasemonkey
// @include         http://livebeta.kaskus.us/post_reply/*
// ==/UserScript==
     
    
    (function () {
           
    // Removes all occurences of elements whose XPath is provided from the document.
    function removeElement(ElementXpath)
    {
            var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
            for (i=0; i<alltags.snapshotLength; i++)
            {
            element = alltags.snapshotItem(i);
            element.parentNode.removeChild(element); // Remove this element from its parent.
            }
    }
     
    // Set an attribute for all elements in an XPath
    function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
    {
            var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
            for (i=0; i<alltags.snapshotLength; i++)
                    alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
    }
     
    //Do the dirty work
    try
    {
            //Totally delete elements 
            //and fix that simple interface 
			removeElement ('.//select[@name="folderid"]');
            removeElement ('.//select[@name="emailupdate"]');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[8]/DIV[2]');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[7]');
			removeElement ('.//DIV[@id="header-wrapper"]');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[1]/LABEL');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[2]/LABEL');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[3]/LABEL');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[4]/LABEL');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[5]/FIELDSET/LEGEND');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[3]/DIV/DIV');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[4]/DIV');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[7]/DIV[1]/LABEL');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[7]/DIV[1]/DIV/DIV/LABEL');
			removeElement ('.//DIV[@id="content-wrapper"]/DIV/DIV/H2');
			removeElement ('.//FORM[@name="postreply"]/FIELDSET/DIV[7]/DIV[2]/LABEL');
			setAttributeOfElement ('style', 'padding:3px; width:470px; font-size:14px', ".//INPUT[@id='reply-title']");
            setAttributeOfElement ('style', 'height:120px', ".//TEXTAREA[@id='reply-messsage']");
           

    }   
	
    catch (e)
    {
            alert("UserScript exception:\n" + e);
    }
     
    })();
	
var elmDeleted = document.evaluate('.//input[@name="sbutton"][1]',
        document, null, 9, null).singleNodeValue;
		elmDeleted.parentNode.removeChild(elmDeleted);
		
var elmDeleted = document.evaluate('.//input[@name="preview"][1]',
        document, null, 9, null).singleNodeValue;
		elmDeleted.parentNode.removeChild(elmDeleted);
		
GM_addStyle(" body{background: none repeat scroll 0 0 #FAF2E4;} .quick-reply{width:730px !important;padding:10px !important;border:4px solid #E6E6E6;border-radius:5px 5px 5px 5px;} .quick-reply .form, .capctha, .quick-reply .reply-header{background:transparent !important;border-bottom:0px solid #FFFFFF !important;} .smiley-wrapper{left:485px !important;top:0px !important;} .quick-reply .form {padding:2px !important;margin:0px !important;} .in-reply{float:left !important;padding-top:5px !important;font-size:13px !important;} .quick-reply .reply-form{padding-bottom:0px !important;}");

var image = document.evaluate(
  './/img[contains(@src, "clear.gif")]',
  document,
  null,
  9,
  null ).singleNodeValue;
image.parentNode.removeChild( image );		

/* thx to Ndilallah */