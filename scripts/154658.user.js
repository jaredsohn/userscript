// ==UserScript==
// @name        Just Eat Meal Search
// @namespace   http://andysouter.net/greasemonkey/just-eat.co.uk/mealsearch
// @description Add a search box to Just Eat's menu page
// @include     http://www.just-eat.co.uk/*/menu*
// @version     1
// @grant		none
// ==/UserScript==

(function(){

	var catBox = document.getElementById("divCategoriesContent");
	var catBoxFirst = catBox.children[0];
	var searchBox = document.createElement("input");
	searchBox.setAttribute("style", "width:98%; margin-top:4px");
	searchBox.placeholder = "Search";
	catBox.insertBefore(searchBox, catBoxFirst);
	var search = function(event){
		var getTrElementsByClassNameRegex = function(rex){
			var els = document.getElementsByTagName("tr");
			var res = [];
			for(var i = 0; i < els.length; i++){
				var classes = els[i].className.split(/\s+/);
				for(var ii = 0; ii < classes.length; ii++){
					if(rex.test(classes[ii])) res.push(els[i]);
				}
			}
			return res;
		}
		var term = event.target.value.toLowerCase();
		var lis = getTrElementsByClassNameRegex(/prdLi\d/);
		var alt = true;
		var lastDisplay = "none";
		var lastClass = "prdLi1";
		var lastTitle = "none";
		for(var i = 0; i < lis.length; i++){
			var el = lis[i];
			var prdDe = el.getElementsByClassName("prdDe");
			if(prdDe.length > 0){
				var title = prdDe[0].getElementsByTagName("h6")[0].innerHTML;
				var divs = prdDe[0].getElementsByTagName("div");
				var desc = divs.length > 0 ? divs[0].innerHTML : "";
				if((title.toLowerCase().indexOf(term) == -1) && (desc.toLowerCase().indexOf(term) == -1)){
					lastDisplay = el.style.display = "none";
				} else {
					lastDisplay = el.style.display = "table-row";
					lastClass = el.className = (alt ? "prdLi1" : "prdLi2");
					alt = !alt;
				}
			} else {
				el.style.display = lastDisplay;
				el.className = lastClass;
			}
		}
	}

	delaySearch = function(event){
		setTimeout(search, 1, event);
	}

	searchBox.onkeyup = searchBox.onblur = searchBox.onpaste = delaySearch;


})();