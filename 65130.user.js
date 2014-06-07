// ==UserScript==
// @name           Basecamp ToDo Collapse
// @include        http://*.basecamphq.com/*
// @include        https://*.basecamphq.com/*
// @description	  Expand/Collapse Todo lists
// ==/UserScript==

//Last updated: 27-12-2009
//Updated by frey@verk.dk (Rasmus Frey)

var todos, todotitles;

//fetch the main todo items wrappers
todos = document.evaluate("//div[@class='widget page_widget list_wrapper']/div/div[@class='items_wrapper']",
					document, null, 6, null);

//fetch the todo list titles wrappers
todotitleswrapper = document.evaluate("//div[@class='widget page_widget list_wrapper']/div/div[@class='list_title']/h2/span",
					document, null, 6, null);

//fetch the completed todos wrappers
completedtodos = document.evaluate("//div[@class='completed_items_todo_list done']",
					document, null, 6, null);

//looop through all todo lists on page
for(var i = 0; i < todos.snapshotLength; i++) {
	
	//hide each todo list block
	todo = todos.snapshotItem(i);
	todo.style.display = "none";
	
	//hide the complted todo block
	completedtodo = completedtodos.snapshotItem(i);
	completedtodo.style.display = "none";
	
	//create a span for the show/hide button
	var newSpan = document.createElement("span");
	newSpan.id = "openclose"+i;
	todotitlewrap = todotitleswrapper.snapshotItem(i);
	todotitlewrap.appendChild(newSpan);
	button = document.getElementById('openclose'+i);
	button.setAttribute("idx", i);
	button.innerHTML = 'Click to expand';
	button.style.cursor = "pointer";
	button.style.fontSize = '10px';
	button.style.backgroundColor = '#000';
	button.style.color = '#fff';
	button.style.padding = '3px';
	
	//make the button clickable to show/hide the todo lists
	button.addEventListener("click", function(event) {
		var idx = this.getAttribute("idx");

		pTodo = todos.snapshotItem(idx);
		cTodo = completedtodos.snapshotItem(idx);
		if(pTodo.style.display == "none") {
			pTodo.style.display = "block";
			cTodo.style.display = "block"
			this.title = "Click to collapse";
			this.innerHTML = "Click to collapse";
    	} else {
			pTodo.style.display = "none";
			cTodo.style.display = "none";
			this.title = "Click to expand";
			this.innerHTML = "Click to expand";
    	}
	}, false);
}