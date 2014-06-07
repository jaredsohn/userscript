// ==UserScript==
// @name           TD Bank Fix
// @namespace      http://userscripts.org/scripts/show/101526
// @description    Changes username field from a password type to a dropdown type, or to a text type, puts in your username, and locks the field
// @include        https://onlinebanking.tdbank.com/*
// ==/UserScript==

var forms = document.getElementsByTagName('form');
for (var i = 0; i < forms.length; i++)
{
    var form = forms[i];
    var elements = form.elements;
    var dropdown;
    if(forms[i].name == 'details')
    {
	    for (var j = 0; j < elements.length; j++)
	    {
	    	if(elements[j].name=="user")
	    	{
	    		dropdown = document.createElement("select");
	    		dropdown.setAttribute('name','user');
	    		var optionText = new Array();
	    		optionText[0] = "user1_name";
	    		optionText[1] = "user2_name";
	    		var optionValue = new Array();
	    		optionValue[0] = "user1";
	    		optionValue[1] = "user2";
	    		for(var i = 0; i < optionText.length; i++)
	    		{
	    			var opt = document.createElement("option");
	    			opt.text = (optionText[i]);
	    			opt.value = (optionValue[i]);
	    			dropdown.options[i] = opt;
	    		}
    		    elements[j].parentNode.replaceChild(dropdown, elements[j]);
	    	
    		    //old setting
    			//elements[j].setAttribute('value','user1');
    			//elements[j].setAttribute('type','select');
    			//elements[j].setAttribute('readonly','readonly');
	        }
	    }
    }
}