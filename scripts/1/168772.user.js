// ==UserScript== 

// @name          Blood Wars Add Facilite In Test Page
 
// @namespace     http://r*.fr.bloodwars.net/test_items.php
 
// @description   A Greasemonkey script that show facility of items on bloodwars test page.
 
// @include       http://r*.fr.bloodwars.net/test_items.php*

// @copyright	  Millasseau Mickaël
 
// ==/UserScript==


function getQueryParam(param) {
    var result =  window.location.search.match(
        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
    );
    return result ? result[3] : false;
}

function redirectAbso(nb) {
    var page = document.location.href;
    if (document.location.search != "")
    {
        if (getQueryParam('abso')==false)
        {
            if (nb==1)
               page+="&abso=1";
            if (nb==2)
               page+="&abso=2";
        }
        else
        {
            if (getQueryParam('abso')==1)
            {
                if (nb==2)
                   page=page.replace("&abso=1","&abso=2");
           }
           else
            {
                if (nb==1)
                    page=page.replace("&abso=2","&abso=1");
                }
        }
    window.location.href = page;
    }
}

function writeAbso () {
    var nbDiv = document.getElementsByTagName("div");
    var boxCheck;
    if (getQueryParam("abso") == 1)
        nbDiv[11].innerHTML = '<FORM><INPUT type="checkbox" id="abso" name="abso" value="1" checked > Absorbeur </FORM>';
    else
        nbDiv[11].innerHTML = '<FORM><INPUT type="checkbox" id="abso" name="abso" value="1"  > Absorbeur </FORM>';
    var targetAbso = document.getElementById("abso");
    targetAbso.addEventListener("click",myFunc,false);
}

function myFunc(){
    if(document.getElementById("abso").checked == true){
        redirectAbso(1);
    }
    else{
        redirectAbso(2);
    }
}

function setFacilite () {
	var leLvl =document.getElementById('setLvl').value; 

	if (leLvl < '061'){
		var facilite = 0;
	}else if (leLvl < '063') {
		var facilite = 1;
	}else if (leLvl < '065') {
		var facilite = 2;
	}else if (leLvl < '067') {
		var facilite = 3;
	}else if (leLvl < '069') {
		var facilite = 4;
    } else {
        var facilite = 4 + (leLvl - 69);
    }
    writeAbso();
    if (getQueryParam('abso')==1)
        facilite+=5;
    if (facilite > 50){
		facilite=50;
	}
	var spans = document.getElementsByClassName("error");
		obj = {};

	for (var i = 0, l = spans.length; i < l; i++) {
		var str = spans[i].textContent || spans[i].innerText;
		str = str.replace(/^.*?(\d+).*?$/,'$1');
		str = str * (1 - (facilite/100));
		spans[i].textContent = spans[i].textContent.substring(spans[i].textContent.lastIndexOf(' '),spans[i].textContent.lastIndexOf(','))+ " " + Math.ceil(str);
	}
}

setFacilite();