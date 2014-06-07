// ==UserScript==
// @name          Against the Clock Flash Code Bruteforcer
// @description   Bruteforces a code for Flash CS5
// ==/UserScript==



if (document.getElementById("block-block-23").getElementsByTagName("div")[1].innerHTML.substr(0,10) == "The follow") {
		
	var code = document.getElementById("edit-profile-cs5fl").value;

	var newcode = code.substr(11,3)+ code.substr(15,3) + code.substr(19,3);
	newcode = parseInt(newcode)+1;
	newcode = newcode.toString();
	
	document.getElementById("edit-profile-cs5fl").value = "ATC-FL-CS5-" + newcode.substr(0,3) + "-" + newcode.substr(3,3) + "-" + newcode.substr(6,3);

	document.getElementById("edit-submit").click();
	
		
}