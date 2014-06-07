// ==UserScript==
// @name           groupt timetable
// @namespace      http://userscripts.org/users/synck
// @description    autoselect a class from the drop down list
// @include        https://mijn.groept.be/WebUntis/Timetable.do?type=1&sid=groep-t-hs-leuven*
// @version        v2
// @license        Creative Commons Attribution-NonCommercial-ShareAlike
// ==/UserScript==
DOM_script();

function DOM_script(){
var script = document.getElementsByTagName('head')[0].appendChild(document.createElement('script'));	//add a script to the document
script.setAttribute('type', 'text/javascript');															//set script attribute
return script.textContent=DOM_script.toString().replace(/[\s\S]*"\$1"\);([\s\S]*)}/,"$1");				//add the code to the script

var defaultClass = getClassFromCookie();						//retrieve the default class from the cookie
var dropDownList = document.getElementById('id');				//store the dropdownlist in a variable
var selected = dropDownList[dropDownList.selectedIndex].text;	//store the text of the selected item in a variable
document.title = selected;										//set html title to selected item

if(selected != defaultClass){						//execute when the selected class is not the desired class
	if(selected.search('Please select') != -1){		//only execute the script when the dropdownlist indicates "please select"
		var classIndex = "0";						//iterator for the dropdownlist
		if(defaultClass != ""){						//test if the desired class is set
			for (classIndex=0;classIndex<(dropDownList.options.length);classIndex++){	//iterate over dropdownlist
				if(defaultClass == dropDownList[classIndex].text){						//test if the current class and the desired class match
					dropDownList.selectedIndex = classIndex;							//make the current class selected
					document.getElementsByTagName('form')[0].submit();					//submit the form
					break;
				} 
			}
		}
		
		if(classIndex == dropDownList.options.length){		//test if at the end of the list
			alert('class not found');						//end of list means the desired class is not in the list
		}
	} else {
		addDefaultButton();		//add defaultbutton
	}
}

//function that retrieves the default class from the cookie
function getClassFromCookie(){
	if (document.cookie.length > 0){
		var c_name = "defaultClass";							//cookie name
		var c_start = document.cookie.indexOf(c_name + "=");	//retrieve the startposition of the cookie parameter
		if (c_start!=-1)
		{
			c_start = c_start + c_name.length+1;						//move startposition to value of the cookie parameter
			var c_end = document.cookie.indexOf(";",c_start);			//retrieve  startposition of the next parameter
			if (c_end == -1)											//test if no next parameter
				c_end=document.cookie.length;							//set endposition to end of cookie
			return unescape(document.cookie.substring(c_start,c_end));	//return the value of the parameter
		}
	}
	return "";
}

//function that sets the default class in the cookie
function setClassInCookie(value){
	var exdate=new Date();					//make a new expirationdate
	exdate.setDate(exdate.getDate()+365);	//set the expirationdate one year in the future
	document.cookie="defaultClass=" +escape(value)+";expires="+exdate.toUTCString();	//store values in the cookie
	removeDefaultClassButton();				//remove the defaultbutton
}

//function that adds a defaultbutton in the table
function addDefaultButton(){
	var tableRow = (document.getElementsByTagName('tr'))[0];	//retrieve tablerow
	var tableCell = tableRow.insertCell(1);						//insert a new cell in the row on the second position
	tableCell.setAttribute('class', "sel");						//set the class of the cell

	defaultButton = document.createElement("input");			//add an input element to the document
	defaultButton.setAttribute('id', "defaultButton");			//set id
	defaultButton.setAttribute('value', "set default");			//set value
	defaultButton.setAttribute('type', "button");				//set type
	defaultButton.setAttribute('onclick', "setClassInCookie('"+selected+"')");	//set onclick

	tableCell.appendChild(defaultButton);						//add the button 
}

//function that removes the cell with the defaultbutton from the table
function removeDefaultClassButton(){
	var element = document.getElementById('defaultButton').parentNode;	//retrieve cell from table
	element.parentNode.removeChild(element);							//remove cell from table
}

}