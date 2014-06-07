// ==UserScript==
// @name          Unitedcats And Uniteddogs Separate Cats And Dogs
// @namespace     http://youngpup.net/userscripts
// @description   Shade cat stories on UD and dog stories on UC home page.
// @include       http://www.unitedcats.com/en/home
// @include       http://www.uniteddogs.com/en/home
// ==/UserScript==

// wait for window to load
window.addEventListener("load", function(e) {myScript();}, false);

// click More button
function myScript() {
	contArray = document.getElementsByClassName("feeder_more_button");
	var contCount = contArray.length;
	//alert(contCount);

	contArray[0].id = "moreButtId";
	//document.getElementById("moreButtId").click();
	//document.getElementById("moreButtId").click();
	hide();
}

// shade/hide dog stories on UC and cat stories on UD home page
function  hide() {
	var varId = "story_";
	var children = document.body.getElementsByTagName('*');
	var elements = [], child;
	for (var i = 0, length = children.length; i < length; i++) {
		child = children[i];
		if (IsNumeric(child.id.substr(6, 1))) {
			if (child.id.substr(0, varId.length) == varId) {
		  		elements.push(child);
		  		//alert (child.id.substr(0, varId.length));
		  		//alert (child.id);
		  		//alert(child.innerHTML);
  			}
		}
	}
	var storyCount = elements.length;
	//alert("story count: "+storyCount);

	dogExp = /uniteddogs/;
	catExp = /unitedcats/;

	var wrongOnes = 0;
	for(i=0;(i<storyCount);i++) {
		//elements[i].innerHTML = elements[i].innerHTML + i;
		//alert(elements[i].innerHTML);
		if (catExp.test(top.location)) {
			if (dogExp.test(elements[i].innerHTML)) {
				//alert("dog found");
				wrongOnes ++;
				//elements[i].style.display = "none";
				elements[i].style.backgroundColor = "#C3FDB8";
			}
		}
		else if(dogExp.test(top.location)) {
			if (catExp.test(elements[i].innerHTML)) {
				//alert("cat found");
				wrongOnes ++;
				//elements[i].style.display = "none";
				elements[i].style.backgroundColor = "#FCDFFF";
			}
		}
	}
	//if (storyCount <= wrongOnes) alert ("Ooops, a very minor, trifling and inconsequential error has occured. The userscript could not separate the cats from dogs. If this bothers you, please refresh your page and hope it works!");
}
function IsNumeric(input){
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}

// end of script