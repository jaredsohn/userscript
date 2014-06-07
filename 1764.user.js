/*
 *	Author:		Victor Levin
 *				viclevin at rogers dot com
 *	Date: 		September 20, 2005
 *
 *	Summary:   	Especially when using Foxylicious Firefox extention, 
 *				the "Add to Del.icio.us" popup form doesn't focus anywhere 
 *				and user has to make extra move to put cursor into a field. 
 *				This script solves the problem by focusing on description or tag field.
 *
 *	Licence: 	Creative Commons Attribution-NonCommercial 2.5
 *				http://www.creativecommons.org/licenses/by-nc/2.5/
 */

// ==UserScript==
// @name		Add To Delicious Focus 2.0
// @description	Script focuses on description or tag field in 'Add To Delicious' popup form.
// @include		http://del.icio.us/*
// ==/UserScript==

if (document.delForm){

	//focus on tag field
	if(document.delForm.tags){	
		document.delForm.tags.focus();
	}

	//if description field empty, focus there (description is required)
	if(document.delForm.description){	
		if(isEmpty(document.delForm.description.value)){
			document.delForm.description.focus();
		}
	}
}

/*
 * Function checks whether or not 
 * the string is a whitespace.
 *
 * Params:	String s
 * Return:	Boolean
 */ 
function isEmpty (s){

	//simple length check
	if((s == null) || (s.length == 0)) return true;

	var whitespace = " \t\n\r", i;

	//check every char in the string 
	for(i=0; i<s.length; i++){
		var c = s.charAt(i);
		if (whitespace.indexOf(c) == -1) return false;
	}

	return true;
}



