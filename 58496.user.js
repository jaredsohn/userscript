   // Facebook - Show Ages v1
//
// ==UserScript==
// @name          Facebook - Show Ages
// @namespace     http://userscripts.org/users/109606
// @description     Shows ages of your friends if they publicize their full Date of Birth
// @include           *.facebook.com*
// ==/UserScript==


function getAgeHolder(){

dds = getElementsByClassName("birthday","div")[0];
DOB = dds.innerHTML.split("<dd>")[1].replace("</dd>","");

if(document.getElementById("label_basic_info_options_birthday")){
 if(document.getElementById("label_basic_info_options_birthday").innerHTML == "Birthday"){
  document.getElementById("label_basic_info_options_birthday").innerHTML = "Birthday/Age";
 }
}

if(DOB.length < 20 && getAge(DOB).length > 1){
dds.innerHTML = "<dt>Age:</dt><dd>" + getAge(DOB) + "</dd><div class=\"birthday2\"><dt>Birthday:</dt><dd>" + DOB + "</dd></div>";
}

}




function checkleapyear(datea)
{
	if(datea.getYear()%4 == 0)
	{
		if(datea.getYear()% 10 != 0)
		{
			return true;
		}
		else
		{
			if(datea.getYear()% 400 == 0)
				return true;
			else
				return false;
		}
	}
return false;
}

function DaysInMonth(Y, M) {
    with (new Date(Y, M, 1, 12)) {
        setDate(0);
        return getDate();
    }
}

function datediff(date1, date2) {
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
	 y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();

    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth(y2, m2);
    }
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}






function getAge(TheDate) {

var dat = new Date();
var curday = dat.getDate();
var curmon = dat.getMonth()+1;
var curyear = dat.getFullYear();

  var toreplace = [" January "," February "," March "," April "
  ," May "," June "," July "," August "," September "," October "," November "," December "];

  var withthis = ["1","2","3","4","5","6","7","8","9","10","11","12"];

  for (var i=0; i<toreplace.length; i++) {
     TheDate = TheDate.replace(toreplace[i], "|"+withthis[i]+"|");
  }



  parts = TheDate.split("|"); 
  calday = parts[0];
  calmon = parts[1];
  calyear = parts[2];

if(calyear){
	if(curday == "" || curmon=="" || curyear=="" || calday=="" || calmon=="" || calyear=="")
	{
		alert("error");
	}	
	else
	{

		var curd = new Date(curyear,curmon-1,curday);
		var cald = new Date(calyear,calmon-1,calday);
		
		var diff =  Date.UTC(curyear,curmon,curday,0,0,0) - Date.UTC(calyear,calmon,calday,0,0,0);

		var dife = datediff(curd,cald);
		var age = dife[0]+" years, "+dife[1]+" months, & "+dife[2]+" days old.";

		var as = parseInt(calyear)+dife[0]+1;
		var diff =  Date.UTC(as,calmon,calday,0,0,0) - Date.UTC(curyear,curmon,curday,0,0,0);
		var datee = diff/1000/60/60/24;
		var DaysTill=(dife[0]+1) + " in "+ datee+" days.";

		return age + "<BR>" + DaysTill;

	}
}
}



function getElementsByClassName(tclass,tag){
//class items function scripted entirely by JamesPoel.
var classItems = new Array();

 tags = document.getElementsByTagName(tag);
 for (i=0; i < tags.length; i++)
  {
	if(tags[i].className.indexOf(tclass) > -1){ // && tags[i].className.length == tclass.length){
	classItems.push(tags[i]);
	}
  }

return classItems;

}


function checkForUpdate() {
  document.documentElement.removeEventListener('DOMNodeInserted', checkForUpdate, false);
  setTimeout(getAgeHolder, 0);
  document.documentElement.addEventListener("DOMNodeInserted", checkForUpdate, false);
}

checkForUpdate();