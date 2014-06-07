// ==UserScript==



// @name           Vu's Post Counter



// @namespace      BM



// @description    Counts your posts



// @include        http://www.basilmarket.com/*



// ==/UserScript==







window.addEventListener('submit', newsubmit, true);



if (!GM_getValue('VuCounter')) {



	GM_setValue('VuCounter', 0);



}







var username = readCookie("name").toLowerCase();



var OrgTitle = document.title





if (document.URL.toLowerCase().match(username)) {



	document.title= readCookie("name") + "'s BasilID - My post count: " + GM_getValue('VuCounter');



}



else{



	document.title = (document.title + " - [My post count: " + GM_getValue('VuCounter') + "]");



}







var KeyCheck=new Boolean();



document.addEventListener("keypress", function(e) {



	if(e.which == '96'){



		if(KeyCheck == false){



			KeyCheck = true;



		}



		else if (KeyCheck == true){



			NewCount = prompt("Your current post count is " + GM_getValue('VuCounter') + ". What should your new post count be?","0");



			if(IsNumeric(NewCount) == true){



				GM_setValue('VuCounter', NewCount);



				alert("Your post count is now " + NewCount);



				KeyCheck = false;



			}



			else{



				alert("'" + NewCount + "' isn't a number");



				KeyCheck = false;



			}



		}



	}



	else{



		KeyCheck = false;



	}



}, false); 



function newsubmit(event) {



	var target = event ? event.target : this;



		if ((target.action.match("func-submit_forum.php")) && !(document.URL.match("edit"))){

			var addone = new Number(GM_getValue('VuCounter'));

			addone += 1;

			GM_setValue('VuCounter', addone);



		}		



    this._submit();



}





function readCookie(name) {



	var nameEQ = name + "=";



	var ca = document.cookie.split(';');



	for(var i=0;i < ca.length;i++) {



		var c = ca[i];



		while (c.charAt(0)==' ') c = c.substring(1,c.length);



		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);



	}



	return null;



}







function IsNumeric(sText)

{



   var ValidChars = "0123456789.";



   var IsNumber=true;



   var Char;



   for (i = 0; i < sText.length && IsNumber == true; i++) 



      { 



      Char = sText.charAt(i); 



      if (ValidChars.indexOf(Char) == -1) 



         {



         IsNumber = false;



         }



      }



   return IsNumber;



}