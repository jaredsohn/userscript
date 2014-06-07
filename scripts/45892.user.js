// ==UserScript==
// @name           Quiz-be-gone! v1.1
// @namespace      http://userscripts.org/scripts/show/45892
// @description    Removes quizzes from the facebook news feed and lists the number removed under the filter list.
// @include        http://*.facebook.com*home.php*
// ==/UserScript==

function getElementsByClassName(clsName){
	return getElementsByClassName(clsName, "*");
}

function getElementsByClassName(clsName, tagTypeFilter){
	var retVal = new Array();
	var elements = document.getElementsByTagName(tagTypeFilter);
	for(var i = 0;i < elements.length;i++){
		if(elements[i].className.indexOf(" ") >= 0){
			var classes = elements[i].className.split(" ");
			for(var j = 0;j < classes.length;j++){
				if(classes[j] == clsName)
					retVal.push(elements[i]);
			}
		}
		else if(elements[i].className == clsName)
		retVal.push(elements[i]);
	}
	return retVal;
}

function removeWallPost(div){
	while(div.className.match(/UIStory UIIntentionalStory.+/) == null && div.nodeName != "BODY"){
		div = div.parentNode;
		
	}
	if(div.className.match(/UIStory UIIntentionalStory.+/) != null){
		div.style.display = "none";
		//div.parentNode.removeChild(div);
	}
}

function enumerateFacebookQuizzes(){
	var storydivs = getElementsByClassName("UIMediaItem", "div");
	var quizzes = Array();
	
	for(i = 0; i < storydivs.length; i++){
		div = storydivs[i];
		div = div.childNodes[0]
		if(div.href != undefined){
			if(div.href.match(/http:\/\/apps.+take\?link=.+/) != null){
				quizzes.push(div);
			}
		}
	}	
	
	var storydivs = getElementsByClassName("CopyTitle", "div");
	
	for(i = 0; i < storydivs.length; i++){
		div = storydivs[i];
		if(div.innerHTML.match(/.+ (took|completed) the.+quiz.+/) != null){
			quizzes.push(div);
		}
	}
	
	return quizzes;
}

function unhideFacebookQuiz(div){
	while(div.className.match(/UIStory UIIntentionalStory.+/) == null && div.nodeName != "BODY"){
		div = div.parentNode;
		
	}
	if(div.className.match(/UIStory UIIntentionalStory.+/) != null){
		div.style.display = "";
	}
}

function unhideFacebookQuizzes(){
	newNodesInserted.inhibit = true;
	
	var quizzes = enumerateFacebookQuizzes();
	
	for(i = 0; i < quizzes.length; i++){
		unhideFacebookQuiz(quizzes[i]);
	}	
	
	var newlink = document.createElement("A");
	newlink.href = '#';
	newlink.addEventListener("click", hideFacebookQuizzes, true);
	newlink.innerHTML = "Hide All Quizzes";
	newlink.id = "hidequizzes";
	this.parentNode.appendChild(newlink);
	this.parentNode.removeChild(this);
	
	var nukecount = document.getElementById("quiznukecount");
	if(nukecount != null || nukecount != undefined){
		nukecount.parentNode.removeChild(nukecount);
	}
}

function hideFacebookQuizzes(){
	var quizzes = enumerateFacebookQuizzes();
	
	for(i = 0; i < quizzes.length; i++){
		removeWallPost(quizzes[i]);
	}
	
	
	var qbg = document.getElementById("quiz-be-gone");
	if(qbg == null || qbg == undefined){
		var newdiv = document.createElement("DIV");
		newdiv.id = "quiz-be-gone";
		try{
			document.getElementById("home_filter_list").appendChild(newdiv);
		}catch (e){
			//do nothing
		}
	}
	
	var nukecount = document.getElementById("quiznukecount");
	if(nukecount == null || nukecount == undefined){
		nukecount = document.createElement("DIV");
		nukecount.innerHTML = quizzes.length + " quizzes nuked!";
		nukecount.id = "quiznukecount";
		qbg.appendChild(nukecount);
	}else{
		nukecount.innerHTML = quizzes.length + " quizzes nuked!";
	}
	
	var showquizzes = document.getElementById("showquizzes");
	if(showquizzes == null || showquizzes == undefined){
		showquizzes = document.createElement("A");
		showquizzes.href = '#';
		showquizzes.addEventListener("click", unhideFacebookQuizzes, true);
		showquizzes.innerHTML = "Show Quizzes";
		showquizzes.id = "showquizzes";
		qbg.appendChild(showquizzes);
	}
	
	var hidequizzes = document.getElementById("hidequizzes");
	if(hidequizzes != null && hidequizzes != undefined){
		hidequizzes.parentNode.removeChild(hidequizzes);
	}
	
	newNodesInserted.timer = null;
	newNodesInserted.inhibit = false;
}

function newNodesInserted(event){
	if((newNodesInserted.timer == null || newNodesInserted.timer == undefined) && newNodesInserted.inhibit != true){
		newNodesInserted.timer = setTimeout(hideFacebookQuizzes, 100);
	}
}

(function() {
	var newdiv = document.createElement("DIV");
	newdiv.id = "quiz-be-gone";
	
	document.getElementById("home_filter_list").appendChild(newdiv);
		
	document.addEventListener("DOMNodeInserted", newNodesInserted, true);
})();