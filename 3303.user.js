// ==UserScript==
// @name         Postbank zakelijk default rekening
// @namespace    http://gruntbuggly.blogspot.com/
// @description  v0.1 - Postbank zakelijk aanpassen standaard rekening bij overschrijvingen
// @include      https://gto.postbank.nl/*
// ==/UserScript==

/*

	Author: Niels Vrolijk
	Date:   2006-02-21

*/

var selBox = document.getElementsByName('selRekNummer').item(0);
var voorkeurNummer = '1234567';

if (selBox.hasChildNodes())
// So, first we check if the object is not empty, if the object has child nodes
{
    var children = selBox.childNodes;
    
    //run only if selBox has no onChange attribute
    if ((selBox.getAttribute('onChange') == null ))
    {
        for (var i = 0; i < children.length; i++) 
	{
	    // First, let's verify that children[i] has some attributes  
	    if (children[i].hasAttributes())
	    {
                var chilAtt = children[i].attributes;  

                if (children[i].tagName == 'OPTION')
		{
		    children[i].removeAttribute('selected');
		    
		    for (var j = 0; j < chilAtt.length; j++)
		    {
		        if (chilAtt[j].name == 'value' && chilAtt[j].value == voorkeurNummer)
		        {
		            children[i].setAttribute('selected','');
		            selBox.selectedIndex = i - 1;
		        }
                    };
		};
	    };
        };
    };
};