// ==UserScript==
// @name            NewKaskus Simple Reply
// @author          Ndilallah
// @description     Simple post reply interface on LiveBeta Gan
// @license         Creative Commons Attribution License
// @icon            http://s3.amazonaws.com/uso_ss/icon/127557/large.jpg?1332108198
// @version	        1.4
// @released        2012-03-05
// @compatible      Greasemonkey
// @include         http://www.kaskus.co.id/post_reply/*
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
			removeElement ('.//HEADER[@id="site-header"]/DIV[1]');
            removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[1]/LABEL');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[2]/LABEL');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[3]');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[3]/LABEL');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[4]/LABEL');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[5]');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[5]/LABEL');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[5]/H4');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/DIV');
			removeElement ('.//SELECT[@name="emailupdate"]');
			removeElement ('.//SELECT[@name="folderid"]');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[5]/DIV[1]');
			removeElement ('.//DIV[@id="edit"]/DIV[2]/FIELDSET/DIV[5]/DIV[2]');
			removeElement ('.//FOOTER[@id="site-footer"]');
			removeElement ('.//DIV[@class="bottom-frame"]');
			removeElement ('.//DIV[@class="post-icon input"]');
			setAttributeOfElement ('style', 'width:470px', ".//INPUT[@id='form-title']");
			setAttributeOfElement ('style', 'top:5px', ".//DIV[@class='smiley-wrapper']");
			setAttributeOfElement ('style', 'margin-left:0px', ".//DIV[@class='input']");
			setAttributeOfElement ('style', 'margin-left:0px', ".//DIV[@class='capctha']");
			setAttributeOfElement ('style', 'width:735px;margin:0 auto', ".//DIV[@id='edit']");
    }   
	
    catch (e)
    {
            alert("UserScript exception:\n" + e);
    }
     
    })();
	GM_addStyle (".reply-form .clearfix{padding:4px 0px;margin:0px}");

/* Ndilallah */