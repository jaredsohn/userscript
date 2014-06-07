// ==UserScript==
// @name        Edmunds True Market Value and Reliability Rating on Cars.com
// @namespace   http://userscripts.org/users/tawalu
// @description Displays the True Market Value from Edmunds and the vehicle's Identifix reliability rating on the Cars.com search results page.
// @include		http://www.cars.com/for-sale/*
// @version     1.03
// @downloadURL https://userscripts.org/scripts/source/160686.user.js
// @updateURL	https://userscripts.org/scripts/source/160686.meta.js
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @grant		GM_xmlhttpRequest
// ==/UserScript==

//Determine number of cars displayed
console.log("1");
var numOfCars = document.querySelectorAll("span.modelYearSort").length;
console.log(numOfCars);
//Start of link creation

for(var i=0;i<numOfCars;i++){
	var CarInputLoc = $('span.modelYearSort').eq(i);
	//Determine Year
	var year = CarInputLoc.html();
	//Determine Make
	var makeModelString = CarInputLoc.next().html();
	var makeModelData = makeModelString.split(" ");
	var make = makeModelData[0];
	//Determine Model
	var modelIn = makeModelData.splice(1,4);
	var modelOut='';
	if (modelIn[1].length>3&&modelIn[1]!=="Type"&&modelIn[1]!=="Base"&&modelIn[1]!=="Limited"&&modelIn[1]!=="Sport"&&modelIn[1]!=="Custom"&&modelIn[1]!=="Car"){
		modelOut=modelIn[0]+"-"+modelIn[1];
		}else{
		modelOut=modelIn[0];
	}

	//Determine Links
	var tmvLoc = 'http://www.edmunds.com/'+make.toLowerCase()+'/'+modelOut.toLowerCase()+'/'+year+'/';
	var reliabilityLoc = tmvLoc+'reliability.html';
	tmvFetch = function(i, tmvLoc){
		GM_xmlhttpRequest({
			method:"GET",
			url:tmvLoc,
			onload: function(response){
				var tmvInfoIn = new DOMParser().parseFromString(response.responseText, 'text/html');
				var tmvInfoOut = tmvInfoIn.querySelector('li.price em').innerHTML;
				//Post Link
				$('.description')
					.eq(i)
					.append('<br><a href="'+tmvLoc+'">Edmunds TMV from '+tmvInfoOut+'</a> ');
			}
		})
	};
	
	reliabilityFetch = function(i, reliabilityLoc){
		GM_xmlhttpRequest({
			method:"GET",
			url:reliabilityLoc,
			onload: function(response){
				var reliabilityInfoIn = new DOMParser().parseFromString(response.responseText, 'text/html');
				var reliabilityInfoProcess = reliabilityInfoIn.querySelector('table.reliability-data').innerHTML;
				var reliabilityInfoOut = $(reliabilityInfoProcess).find('tr').eq(8).text();
				//Style Link
				switch(reliabilityInfoOut[26]){
					case "0":
					case "1":
					var reliabilityColor = 'style= "color:black; background-color:red;"';
					break;
					case "2":
					case "3":
					var reliabilityColor = 'style= "color:black; background-color:yellow;"';
					break;
					case "4":
					case "5":
					var reliabilityColor = 'style= "color:white; background-color:green;"';
					break;
					default:
					var reliabilityColor = "";
				}
				//Post Link
				$('.description')
					.eq(i)
					.append('<br><a href="'+reliabilityLoc+'"'+reliabilityColor+'>'+'Reliability: '+reliabilityInfoOut+'</a>');			
			}
		})
	};
	
	//Run Function
	tmvFetch(i, tmvLoc);
	reliabilityFetch(i, reliabilityLoc);
}