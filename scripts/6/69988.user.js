// ==UserScript==
// @name           Final Earth Autoclick
// @namespace      FE
// @description    Final Earth Autoclick
// @include        http://www.finalearth.com/command.php
// ==/UserScript==

function startBlink(){
    window.blinkInterval = setInterval(function(){
								if(document.title != "Captcha"){document.title = "Captcha";}
								else{document.title = "Final Earth";}
							} , 1500);
}

function blink(){	
    //document.addEventListener("blur",function(){},false);
    document.addEventListener("focus",function(){
			clearInterval(window.blinkInterval);
			document.title = "Final Earth";},false);	
	setTimeout(startBlink(),1000);
}

function generateSelect(){
	//Create select element, set id
	var mySelect = document.createElement("select");
	mySelect.id = "mySelect";
	//Create options, set value and text, then append them to select element
	var myOption = document.createElement("option");
	myOption.value = "0";
	myOption.appendChild(document.createTextNode("Strength"));
	mySelect.appendChild(myOption);
	var myOption = document.createElement("option");
	myOption.value = "1";
	myOption.appendChild(document.createTextNode("Leadership"));
	mySelect.appendChild(myOption);
	var myOption = document.createElement("option");
	myOption.value = "2";
	myOption.appendChild(document.createTextNode("Intelligence"));
	mySelect.appendChild(myOption);
	var myOption = document.createElement("option");
	myOption.value = "3";
	myOption.appendChild(document.createTextNode("Communication"));
	mySelect.appendChild(myOption);
	//Set default selected option
	var skill = GM_getValue("skill",0);
	mySelect.options[skill].defaultSelected = true;
	//Append select element to div
	myDiv = document.getElementById("myDiv");
	myDiv.appendChild(mySelect);
}

	//Main function begins
	var captcha = document.body.innerHTML.indexOf("Click the number that the picture below shows");
	if(captcha == -1){
		tables = document.getElementsByTagName("table");
		if(tables[3]){
			var statTrain = tables[3].innerHTML.indexOf("Stats that effect you as a soldier");
			//Check for sure that we are in training area
			if(statTrain != -1){
				//Create a place holder for our select
				var myDiv = document.createElement("div");
				myDiv.id = "myDiv";
				tables[3].appendChild(myDiv);
				//Create our select
				generateSelect();
				var mySelect = document.getElementById("mySelect");
				mySelect.addEventListener('change', function(){
							//Get selected option value
							var value = mySelect.options[this.selectedIndex].value;							
							GM_setValue("skill", value);									
							}, false);
				
				if(tables[3].getElementsByTagName("a")){
					var links = tables[3].getElementsByTagName("a");
					var skill = GM_getValue("skill",0);  //by default will train strength
					if(links[skill]){			
						url = links[skill].href;
						if(url.search("step") != -1){
							window.location = url;
						}
						
					}
				}
			}
		}
	}
	else{
		//Change title repeatedly to get user notice.
		window.addEventListener("load",blink,false);
	}
	