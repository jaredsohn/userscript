// ==UserScript==
// @name        KORecord
// @namespace   LastDeath
// @include     http://portal.nttgame.com/Support/Supports/TICKET/Validation
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1.1
// ==/UserScript==


window.addEventListener( 
'load', 
	function() { 
		setValues();

	}
, true);
function degerOku(){
    var deger;
    deger=GM_getValue('dyil',1980);
    
}
function setValues(){
    var bird=GM_getValue('dyil',1980);
    var reg=GM_getValue('dreg',2006);
    var email= GM_getValue('email','');
    var nickname= GM_getValue('nickname','');
		
       
    
    $("#t_birthday").val(bird);
    $("#t_regdate").val(reg);
    $("#email").val(email);
    $("#nickname").val(nickname);
  
    

    var regOwner = document.getElementById('t_regdate').parentNode;
    var regButton = document.createElement('input');
        regButton.setAttribute("type", "button");
        regButton.setAttribute("value", "+");
    regOwner.appendChild(regButton);
    regButton.addEventListener("click", regClick, false);
    
    var saveButton = document.createElement('input');
        saveButton.setAttribute("type", "button");
        saveButton.setAttribute("value", "Kaydet");
    regOwner.appendChild(saveButton);
    saveButton.addEventListener("click", saveClick, false);  
    
    var plusOwner =document.getElementById('t_birthday').parentNode;
    
    
    var plusButton = document.createElement('input');
        plusButton.setAttribute("type", "button");
        plusButton.setAttribute("value", "+");
    plusOwner.appendChild(plusButton);
    plusButton.addEventListener("click", plusClick, false);
}

function saveClick(){
    var reg = $("#t_regdate").val();
    var bird= $("#t_birthday").val();
    var email= $("#email").val();
    var nickname= $("#nickname").val();
		
        GM_setValue('dreg',reg);
        GM_setValue('byil',bird);
        GM_setValue('email',email);
        GM_setValue('nickname',nickname);
}


function regClick(){
    var va = $("#t_regdate").val()*1;
        va = va+1;
		$("#t_regdate").val(va);
		//$('#form').submit();
        GM_setValue('dreg',va);
}


function plusClick(){
    var va = $("#t_birthday").val()*1;
        va = va+1;
		$("#t_birthday").val(va);
		//$('#form').submit();
        GM_setValue('dyil',va);
}
