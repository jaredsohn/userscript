// ==UserScript==
// @name			Userscripts.org Testing
// @namespace		#Cletus
// @description		Allows advanced searching on Userscripts.org without any fussing.
// @copyright		2011+, Ryan Chatham (http://userscripts.org/users/cletus)
// @license			(CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==



function getValues(objName)
{  
	var arr = new Array();
	arr = document.getElementsByName(objName);
       
	alert("total objects with name \"textfield\" = \n" + arr.length);
           
	for(var i = 0; i < arr.length; i++)
	{
		var obj = document.getElementsByName(objName).item(i);
		alert(obj.id + " =  " + obj.value);
	}
}