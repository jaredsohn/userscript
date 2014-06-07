// Facebook - Show Ages v2
//
// ==UserScript==
// @name          Facebook - Show Ages v2
// @namespace     http://userscripts.org/users/109606
// @description     Shows ages of your friends if they publicize their full Date of Birth
// @include           *.facebook.com*
// ==/UserScript==

yourProfileLink = document.getElementById("fb_menu_profile").getElementsByTagName("a")[0].href;

checkIfAgeFound = GM_getValue('myAge', true);
if(checkIfAgeFound.length > 0){ }else{
GetYourAge(yourProfileLink);
}


function getAgeHolder(){

dds = getElementsByClassName("birthday","div")[0];
DOB = dds.innerHTML.split("<dd>")[1].replace("</dd>","");

if(document.getElementById("label_basic_info_options_birthday")){
 if(document.getElementById("label_basic_info_options_birthday").innerHTML == "Birthday"){
  document.getElementById("label_basic_info_options_birthday").innerHTML = "Birthday/Age";
 }
}

if(DOB.length < 20 && getAge(DOB).length > 1){
getA = getAge(DOB);

var relation = "";
if(document.getElementById("label_basic_info_options_birthday")){ }else{
            getA2 = getAge(GM_getValue('myAge', true),DOB);

            if(getA2[4] == "o"){
              oldOrYoung = "older";
            }else{
              oldOrYoung = "younger";
            }

              if(getA2[0] == 1){
              relation = relation + getA2[0] + " Year ";
              }else if(getA2[0] > 1){
              relation = relation + getA2[0] + " Years ";
              }
              if(getA2[1] == 1){
              relation = relation + getA2[1] + " Month ";
              }else if(getA2[1] > 1){
              relation = relation + getA2[1] + " Months ";
              }
              if(getA2[2] == 1){
              relation = relation + getA2[2] + " Days ";
              }else if(getA2[2] > 1){
              relation = relation + getA2[2] + " Days ";
              }
              relation = relation + " " + oldOrYoung + " than you." 
              
              if(getA2[0] == 0 && getA2[1] == 0 && getA2[2] == 0){
               relation = "You are the same age as this person.";
              }
}  
            
            
            
code = "<dt>Age:</dt><dd>" + getA[0] + " Years ";
if(getA[1] == 1){
 code = code + getA[1] + " Month " ;
}else if(getA[1] > 1){
code = code + getA[1] + " Months " ;
}
if(getA[2] == 1){
 code = code + getA[2] + " Day ";
}else if(getA[2] > 1){
code = code + getA[2] + " Days " ;
}

code = code + "old.<BR>" + relation + "</dd><div class=\"birthday2\"><dt>Birthday:</dt><dd>" + DOB + " (" + getA[3] + " days time)</dd></div>";

dds.innerHTML = code;
            
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






function getAge(TheDate,TheDate2) {

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
  
  if(TheDate2){
    for (var i=0; i<toreplace.length; i++) {
       TheDate2 = TheDate2.replace(toreplace[i], "|"+withthis[i]+"|");
    }
        parts2 = TheDate2.split("|"); 
        curday = calday;
        curmon = calmon;
        curyear = calyear;
                
        calday = parts2[0];
        calmon = parts2[1];
        calyear = parts2[2];
  }


if(calyear){
	if(curday == "" || curmon=="" || curyear=="" || calday=="" || calmon=="" || calyear=="")
	{
		alert("error");
	}	
	else
	{
    var ag;
		var curd = new Date(curyear,curmon-1,curday);
		var cald = new Date(calyear,calmon-1,calday);
		
		var diff =  Date.UTC(curyear,curmon,curday,0,0,0) - Date.UTC(calyear,calmon,calday,0,0,0);
	
  	if(diff.toString() < 0){
		ag = "y";
		}else{
    ag = "o";
    }
    
		if(ag == "y"){

    var cald = new Date(curyear,curmon-1,curday);
		var curd = new Date(calyear,calmon-1,calday);
    }

		var dife = datediff(curd,cald);
		var age = dife[0]+" years, "+dife[1]+" months, & "+dife[2]+" days old.";

		var as = parseInt(calyear)+dife[0]+1;
		var diff =  Date.UTC(as,calmon,calday,0,0,0) - Date.UTC(curyear,curmon,curday,0,0,0);
		
		
		var datee = diff/1000/60/60/24;
		var DaysTill=datee;

      
    years = dife[0];
    months = dife[1];
    days = dife[2];
    
    var output = [years,months,days,DaysTill,ag];
		return output;

	}
}
}

function GetYourAge(link){

GM_xmlhttpRequest({
    method: 'GET',
    url: link,
    headers: {
        'User-agent': window.navigator.userAgent,
        'Accept': 'text/html',
        'Content-Type':'application/x-www-form-urlencoded',
    }, 

    onload: function(responseDetails) {
            response=responseDetails.responseText;

            holder = document.createElement('div');
            holder.innerHTML = response;
            
            dds = holder.getElementsByClassName("birthday","div")[0];
            DOB = dds.innerHTML.split("<dd>")[1].replace("</dd>","");
            GM_setValue('myAge', DOB);


    }
});

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