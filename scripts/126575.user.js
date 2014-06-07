// ==UserScript==
// @name           LinkedInTrollRemover
// @namespace      http://www.eviltester.com
// @description    replace comments by 'trolls' on linkedin with a favourite troll saying
// @include        http://www.linkedin.com/groupItem*
// @include        http://*.linkedin.com/groupItem*
// ==/UserScript==

//use the  User Script Commands menu to "edit trolls list" as a csv list of member ids

var trolls=[];
var savedTrolls=GM_getValue("linkedinTrollsList","");

if(savedTrolls!=""){
	trolls=savedTrolls.split(",");
}	

//alert("found " + trolls.length + " trolls " + trolls);


function editTrolls(){
	trollsToSave=prompt("Trolls CSV List",trolls);
	if(trollsToSave!=""){
		trolls=trollsToSave.split(",");
	}else{
		trolls=[];
	}
	trollify();
	GM_setValue("linkedinTrollsList",trollsToSave);
	//alert("saved " + trollsToSave);
}

GM_registerMenuCommand("edit trolls list",editTrolls);

// find all posts by a troll
// set the parent content to a troll saying

function trollify(){

	if(trolls.length==0)return;

var commenters = document.getElementById("content").getElementsByClassName("commenter");

for (commenterloop=0; commenterloop<commenters.length; commenterloop+=1){

	var theHREF = commenters[commenterloop].getAttribute('href');
	
		for (trollindex=0; trollindex<trolls.length; trollindex+=1){
			var theTrollID = trolls[trollindex];
			
			var stringToFind = 'memberID=' + trolls[trollindex];
			
			if(theHREF!=null){
					var commenter=commenters[commenterloop];
					var parent = commenter.parentNode;
					
				if(theHREF.indexOf(stringToFind)!=-1){
					//GM_log("Found a troll " + trolls[trollindex]);
					// hide them
					parent.innerHTML="Who's that trip trapping on my bridge!?!";
					
				}else{
					//GM_log("NO TROLL FOUND " + trolls[trollindex]);
				}
			}

		}

}


}

GM_registerMenuCommand("trollify now",trollify);

trollify();
