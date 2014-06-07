// ==UserScript==
// @version 1
// @name Facebook Birthdays Wishes Auto Fill
// @author  www.praveen.net
// @namespace kuchbhi
// @description Updates facebook birthday wish text box with default text
// @include http://www.facebook.com/
// @include https://www.facebook.com/
// ==/UserScript==

var defaulttext = "Happy Birthday";
//Change the value within the quotes above to have your custom message as the default text
/*Alternate declarations for default text*****************************************************
 * "Happy Birthday #name" - This will replace #name with your friend's name
 * "Happy Birthday #fname" - This will replace #fname with your friend's first name
 * "Happy Birthday #lname" - This will replace #lname with your friend's last name
 * The identifiers appearing anywhere in your message will be replaced by appropriate values.
 * They can be at the starting/ending/anywhere in the middle of the message.
 *********************************************************************************************/
function load(){
	var pagelet = document.getElementById("pagelet_current");
	pagelet.addEventListener("click", click, false);  
}

function click(){
	var inputs = document.getElementsByTagName("input");
	for(i=0;i<inputs.length;i++){
		if(inputs[i].getAttribute("name") == "birthday"){
			var bdiv = inputs[i].parentNode;
			var topdiv = bdiv.parentNode.parentNode;
			var name = topdiv.getElementsByTagName("a")[0].innerHTML;
			var sname = name.split(" ");
			var fname = sname[0];
			if(sname.length > 1)
				var lname = sname[sname.length-1];
			else
				var lname = "";
			var copytext = defaulttext;
			copytext = copytext.replace(/#name/g,name);
			copytext = copytext.replace(/#fname/g,fname);
			copytext = copytext.replace(/#lname/g,lname);
			text = bdiv.getElementsByTagName("textarea");
			if(text.length>0){
				text[0].setAttribute("onfocus","if(this.value!='"+copytext+"')this.value='"+copytext+"';this.setAttribute('onfocus','if(this.value==\"\")this.value=\""+copytext+"\"');");
			}
		}
	}
}

load();

//window.addEventListener("load", load, false);  
