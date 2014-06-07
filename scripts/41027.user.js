// ==UserScript==
// @name           Arabic Twitter
// @description    support Arabic on twitter
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// Remark: this script just edit of script #40005
// we need to loop in order for this to work on edit search pages


var statuses = getElementsByClassName(document,"span","entry-content");

var arbChrs = "ذدجحخهعغإفقثصضشسيبلاأتنمكطظزوةىرؤءئ";



for (var i = 0 ; i < statuses.length ; i++) 
{

	for (k=0; k<arbChrs.length ; k++)
	{

	//alert(arbChrs[k]);

		if (statuses[i].innerHTML.indexOf(arbChrs[k])>-1)
		{

			statuses[i].dir="rtl";

			statuses[i].align = "right";

			statuses[i].style.direction = "rtl";

			statuses[i].style.textAlign = "right";

			break;

		}

	}

}



function getElementsByClassName(oElm, strTagName, strClassName)
{

	var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);

	var arrReturnElements = new Array();

	strClassName = strClassName.replace(/\-/g, "\\-");

	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");

	var oElement;


	for(var i=0; i<arrElements.length; i++)
	{

		oElement = arrElements[i];


		if(oRegExp.test(oElement.className))
			arrReturnElements.push(oElement);

	}


	return (arrReturnElements);

}
