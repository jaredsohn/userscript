// ==UserScript==
// @name           e-sim Commander
// @author         Kaszanka
// @version        1.0
// @include        http://e-sim.org/index.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js

// ==/UserScript==
//Made by Kaszanka. Do not use any part of this script without my approval. Please, respect it.

function makeFrame() {
   ifrm = document.createElement("IFRAME");
   ifrm.setAttribute("src", "http://givemestats.bugs3.com/Commander/receiver2.php");
   ifrm.setAttribute("id", "polishIframe");
   
   div = document.createElement("div");
   div.setAttribute("id","commanderContain");
   div.setAttribute("style","display: none;");
   
   image = document.createElement('img');
   image.setAttribute('src','http://givemestats.bugs3.com/Commander/PolandMED.png');
   image.setAttribute('id','polskaFlaga');
   
   div2 = document.createElement("div");
   div2.setAttribute("id","frameContain");
   
   
   div2.appendChild(ifrm);  

   div.appendChild(div2)
   $('#contentRow').children()[2].appendChild(image);
   $('#contentRow').children()[2].appendChild(div);

   return div2
} 
function getNewSubmitForm(divElem){
 var submitForm = document.createElement("FORM");
 divElem.appendChild(submitForm);
 submitForm.method = "POST";
 submitForm.setAttribute("name", "form");
  submitForm.setAttribute("id", "postform");
 return submitForm;
}

//helper function to add elements to the form
function createNewFormElement(inputForm){
 var newElement = document.createElement("input");
 newElement.setAttribute("type", "hidden");
 newElement.setAttribute("name", "msg");
 newElement.setAttribute("value", "checkorders");
 inputForm.appendChild(newElement);
 var newSubmit = document.createElement("input");
 newSubmit.setAttribute("type", "submit");
 newSubmit.setAttribute("id", "orderssubmitbutton");
 newSubmit.setAttribute("value", "Pomoc");
 inputForm.appendChild(newSubmit);

}

//function that creates the form, adds some elements
//and then submits it
function createFormAndSubmit(divElem){

 var submitForm = getNewSubmitForm(divElem);
 createNewFormElement(submitForm);

}
function addCSS(){
    var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('link');
	newScript.type = 'text/css';
	newScript.rel ='stylesheet';
	newScript.href = 'http://givemestats.bugs3.com/Commander/IframeCSS.css';
	headID.appendChild(newScript);


}
$(document).ready(function() {
    addCSS();
    var divElem = makeFrame()
	createFormAndSubmit(divElem)
	
	/*jquery part*/
	var show = false;
	var button = false;
	
	$("#polskaFlaga").click(function(){
		    if (!show) {
			    $('#polskaFlaga').animate( {'right': '20px'},'fast');
				$('#polskaFlaga').animate( {'width': '345px'},'fast',function(){$('#commanderContain').slideDown('fast')});
				show = true;
			}else {				
				$('#commanderContain').slideUp('fast',function(){$('#polskaFlaga').attr('style','');});				
				show = false;
			}
	
	    })
	$('#orderssubmitbutton').click(function(){
	    if (!button){
            $('#orderssubmitbutton').attr('value','Rozkazy');
			button = true;
        } else {
	        $('#orderssubmitbutton').attr('value','Pomoc');
			button = false;
	    }
    });	
		


	var win = document.getElementById("polishIframe").contentWindow 
	document.forms.form.onsubmit = function() {
			win.postMessage(
			  this.elements.msg.value,
			  "http://givemestats.bugs3.com/Commander/receiver2.php"
			)
		  return false
		  }
})
