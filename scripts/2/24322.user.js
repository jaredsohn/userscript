// ==UserScript==
// @name          StalkerSummary
// @author        sharper00
// @description   Summarises stalker page details
// @include      http://*.okcupid.com/stalker*
// @exclude       
// ==/UserScript==

var males = [0,0,0]; //Straight,bisexual,gay
var females = [0,0,0]; //Straight,bisexual,gay
var maleAges =[0,0,0,0,0,0,0] //under 20,20-30,30-40,40-50,50-60,over 60, Cumulative total
var femaleAges =[0,0,0,0,0,0,0] //under 20,20-30,30-40,40-50,50-60,over 60, Cumulative total
var cumulativeAge =0; //totalAge for average tracking

var stalkersParent= document.evaluate(
		"//div[@class='content grid_8']",
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


var button = document.createElement("button");
button.addEventListener("click", buildSummary, false);
button.name='Summary';
button.innerHTML="Generate Summary"

stalkersParent.insertBefore(button, stalkersParent.firstChild);

//Go through each stalker and summarise their details
function buildSummary(){ 
allDivs = document.evaluate(
    "//div[contains(@class,'stalker')]/div[@class='user_info']/p[@class='aso']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    

for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    var content = thisDiv.textContent;
    //Content format is username:ageGender|Oritentation|Location
   
    var ageStart =0;	
    var ageEnd = content.indexOf('/');	
    var age = content.substring(ageStart,ageEnd);     
    var genderEnd = content.indexOf('/',ageEnd + 1);	
    var gender = content.substring(ageEnd + 1,genderEnd);    
    var orient = content.substring(genderEnd + 1,content.length);  
    var ageValue = parseInt(age); 
    if(gender.indexOf('M') != -1){
	incrementCount(males, orient, maleAges,ageValue);
    } else{
       incrementCount(females, orient, femaleAges, ageValue);
    }
    
  
}

insertResults();
}
    
//Builds a simple HTML table and inserts it into the stalker list.
function insertResults(){
	var totalMaleCount = males[0] + males[1] + males[2];
        var totalFemaleCount = females[0] + females[1] + females[2];
        var totalStalkerCount = totalMaleCount + totalFemaleCount;
	
	var result = document.createElement("div");
result.innerHTML = '<TABLE  border="1">'+
'<TR><TH rowspan="2"><TH colspan="3">Orientation'+
    '<TH rowspan="2">Total'+
'<TR><TH>Straight<TH>Bisexual<TH>Gay'+
'<TR><TH>Males<TD>'+males[0] + '<TD>' + males[1] + '<TD>' + males[2]+ '<TD>' + totalMaleCount   +
'<TR><TH>Females<TD>'+females[0] + '<TD>' + females[1] + '<TD>' + females[2]+ '<TD>' + totalFemaleCount +
'<TR><TH>Total<TD>'+ (males[0] + females[0])  +'<TD>'+ (males[1] + females[1])  +'<TD>'+ (males[2] + females[2])  
+'<TD>'+ (males[0] + females[0] + males[1] + females[1] + males[2] + females[2])  +
'</TABLE>' +
'<TABLE border="1" >'+
'<TR><TH rowspan="2"><TH colspan="6">Ages'+    
 '<TH rowspan="2">Average'+
'<TR><TH>&lt;20<TH>20-30<TH>30-40<TH>40-50<TH>50-60<TH>60+'+
'<TR><TH>Males<TD>'+maleAges[0] + '<TD>' + maleAges [1] + '<TD>' + maleAges[2]+ '<TD>' + maleAges[3] + '<TD>' + 
maleAges[4] + '<TD>' + maleAges[5] + '<TD>' + Math.round(maleAges[6]/totalMaleCount) +
'<TR><TH>Females<TD>'+femaleAges[0] + '<TD>' + femaleAges[1] + '<TD>' + femaleAges[2]+ '<TD>' + femaleAges[3] + 
'<TD>' + femaleAges[4] + '<TD>' + femaleAges[5] + '<TD>' + Math.round(femaleAges[6]/totalFemaleCount) +
'<TR><TH><TD><TD><TD><TD><TD><TD><TD>'+ Math.round(cumulativeAge / totalStalkerCount )  +
'</TABLE>'


stalkersParent.insertBefore(result , stalkersParent.firstChild.nextSibling);
}

//Increment the count of the type we just found
function incrementCount(gender, orientation, ageCounter, ageValue){
  if(orientation.indexOf("straight") != -1){
     gender[0]++;
  } else if(orientation.indexOf("bisexual") != -1){
      gender[1]++;
  } else{
      gender[2]++;
  }

  if(ageValue<20){
    ageCounter[0]++;
  } else if(ageValue>=20 && ageValue<30){
    ageCounter[1]++;
  } else if(ageValue>=30 && ageValue<40){
    ageCounter[2]++;
  } else if(ageValue>=40 && ageValue<50){
    ageCounter[3]++;
  } else if(ageValue>=50 && ageValue<60){
    ageCounter[4]++;
  } else {
    ageCounter[5]++;   
  }

  ageCounter[6]=ageCounter[6] + ageValue;
  cumulativeAge =  cumulativeAge + ageValue;
   
}