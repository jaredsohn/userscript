// ==UserScript==
// @id             forums.whirlpool.net.au-8300a4ff-0309-4121-a609-852f656f850d@meh
// @name           Whirlpool search page - default to list view and relevance by last post date
// @version        1.5
// @namespace      meh
// @author         Yansky
// @description    Whirlpool search page - default to list view and relevance by last post date
// @updateURL		https://userscripts.org/scripts/source/177350.user.js
// @include        http://forums.whirlpool.net.au/forum*
// @include        https://forums.whirlpool.net.au/forum*
// @run-at         document-end
// ==/UserScript==

function firstRunCheck(){

	//first run - default to true
	if(!localStorage["userscript_listSearchSetting"]){

		localStorage["userscript_listSearchSetting"] = "true";

	}

	//first run - default to false
	if(!localStorage["userscript_sortSetting"]){

		localStorage["userscript_sortSetting"] = "false";

	}
	
	//first run - default to false
	if(!localStorage["userscript_searchByTitle"]){

		localStorage["userscript_searchByTitle"] = "false";

	}

	
}

if(window.location.href.indexOf('://forums.whirlpool.net.au/forum/?action=search')>-1){

	var listViewText = document.createTextNode(' default to list view');
	var searchTickBox = document.createElement('input');
	var listViewInput = document.createElement('input');
	var sortContainer = document.createElement('div');
	var sortButton = document.createElement('button');
	var sortTickBox = document.createElement('input');
	var sortText = document.createTextNode(' default to sort by last post date');
	var getForm = document.querySelector('form');
	var searchBoxParent = document.querySelector('#searchbox');
	var beforeThisEle = searchBoxParent.querySelector('br');
	var olResults = document.querySelector('.results');
	var liResults = document.querySelectorAll('.results>li');


	searchTickBox.setAttribute('type','checkbox');

	listViewInput.setAttribute('type','hidden');
	listViewInput.setAttribute('name','o');
	listViewInput.setAttribute('value','list');

	searchBoxParent.insertBefore(searchTickBox, beforeThisEle);
	searchBoxParent.insertBefore(listViewText, beforeThisEle);

	sortTickBox.setAttribute('type','checkbox');
	sortButton.textContent = 'Sort By Last Post';
	sortContainer.appendChild(sortButton);
	sortContainer.appendChild(sortTickBox);
	sortContainer.appendChild(sortText);

	firstRunCheck();

	if(localStorage["userscript_listSearchSetting"] === "true"){

		searchTickBox.checked=true;
		
		if(!document.querySelector('input[type="Hidden"][value="list"][name="o"]')){
		
			getForm.appendChild(listViewInput);
			
		}
				
	}

	searchTickBox.addEventListener('change', function(e){

		if(!e.target.checked){
		
			localStorage["userscript_listSearchSetting"] = "false";
			removeListViewInput();
		
		}
		else{
		
			localStorage["userscript_listSearchSetting"] = "true";
			
			if(!document.querySelector('input[type="Hidden"][value="list"][name="o"]')){
			
				getForm.appendChild(listViewInput);
				
			}		
		
		}

	},false);


	function removeListViewInput(){

		[].forEach.call(document.querySelectorAll('input[type="Hidden"][value="list"][name="o"]'), function(item,index,arr){
		
			item.parentNode.removeChild(item);
		
		});

	}

	if(olResults){

		olResults.parentNode.insertBefore(sortContainer, olResults);
		
		if(localStorage["userscript_sortSetting"] === "true"){

			sortTickBox.checked=true;
			sortResults();
				
		}
		
		sortTickBox.addEventListener('change', function(e){

			if(!e.target.checked){
			
				localStorage["userscript_sortSetting"] = "false";
			
			}
			else{
			
				localStorage["userscript_sortSetting"] = "true";
			
			}

		},false);	
		
		sortButton.addEventListener('click', function(e){

			sortResults();

		},false);	

	}

	function sortResults(){

		var toSort = {
		
			notSortedArrays : {
			
				todays : [],
				yesterdays : [],
				aWeekAgo : [],
				aMonthAgo : []
			},
			sortedArrays : {
			
				daysAgo : [],
				weeksAgo : [],
				monthsAgo : [],
				yearsAgo : []		

			}
		
		};

		[].forEach.call(liResults, function(item,index,arr){
		
			var detailTexCon = item.querySelector('.detail').textContent;
			var detailLastA = item.querySelector('.detail>a:last-of-type').textContent;
			var scSplit = detailTexCon.split(detailLastA);
			var timeText = scSplit[scSplit.length-1].trim();		
		
			if(timeText.indexOf('→')>-1){
			
				timeText = timeText.split('→ ')[1];

			}
			
			if(timeText.indexOf('today') > -1){
			
				toSort.notSortedArrays.todays.push(item);
			
			}
			else if(timeText.indexOf('yesterday') > -1){
			
				toSort.notSortedArrays.yesterdays.push(item);
			
			}
			else if(timeText.indexOf('week ago') > -1){
			
				toSort.notSortedArrays.aWeekAgo.push(item);
			
			}
			else if(timeText.indexOf('month ago') > -1){
			
				toSort.notSortedArrays.aMonthAgo.push(item);
			
			}
			else if(timeText.indexOf('days ago') > -1){
				
				toSort.sortedArrays.daysAgo.push(
				
					{
						num : Number(timeText.split(' ')[0]),
						elem : item
					}
					
				);
			
			}
			else if(timeText.indexOf('weeks ago') > -1){

				toSort.sortedArrays.weeksAgo.push(
				
					{
						num : Number(timeText.split(' ')[0]),
						elem : item
					}
					
				);
			
			}
			else if(timeText.indexOf('months ago') > -1){
			
				toSort.sortedArrays.monthsAgo.push(
				
					{
						num : Number(timeText.split(' ')[0]),
						elem : item
					}
					
				);
			
			}
			else if(timeText.indexOf('years ago') > -1){
			
				toSort.sortedArrays.yearsAgo.push(
				
					{
						num : Number(timeText.split(' ')[0]),
						elem : item
					}
					
				);
			
			}
		
		});
		
		toSort.sortedArrays.daysAgo.sort(function (a, b) {
		
			if (a.num > b.num)
			  return 1;
			if (a.num < b.num)
			  return -1;
			// a must be equal to b
			return 0;
			
		});
		
		toSort.sortedArrays.weeksAgo.sort(function (a, b) {
		
			if (a.num > b.num)
			  return 1;
			if (a.num < b.num)
			  return -1;
			// a must be equal to b
			return 0;
			
		});
		
		toSort.sortedArrays.monthsAgo.sort(function (a, b) {
		
			if (a.num > b.num)
			  return 1;
			if (a.num < b.num)
			  return -1;
			// a must be equal to b
			return 0;
			
		});
		
		toSort.sortedArrays.yearsAgo.sort(function (a, b) {
		
			if (a.num > b.num)
			  return 1;
			if (a.num < b.num)
			  return -1;
			// a must be equal to b
			return 0;
			
		});

		//append all the processed results
		
		toSort.notSortedArrays.todays.forEach(function(item,index,arr){
		
			olResults.appendChild(item);
			
		});

		toSort.notSortedArrays.yesterdays.forEach(function(item,index,arr){
		
			olResults.appendChild(item);
			
		});

		toSort.sortedArrays.daysAgo.forEach(function(item,index,arr){
		
			olResults.appendChild(item.elem);
			
		});
		
		toSort.notSortedArrays.aWeekAgo.forEach(function(item,index,arr){
		
			olResults.appendChild(item);
			
		});

		toSort.sortedArrays.weeksAgo.forEach(function(item,index,arr){
		
			olResults.appendChild(item.elem);
			
		});
		
		toSort.notSortedArrays.aMonthAgo.forEach(function(item,index,arr){
		
			olResults.appendChild(item);
			
		});

		toSort.sortedArrays.monthsAgo.forEach(function(item,index,arr){
		
			olResults.appendChild(item.elem);
			
		});

		toSort.sortedArrays.yearsAgo.forEach(function(item,index,arr){
		
			olResults.appendChild(item.elem);
			
		});
					
		
		
	}

}
else if(window.location.href.indexOf('://forums.whirlpool.net.au/forum')>-1){

	var searchMini = document.querySelector('.search_mini');

	if(searchMini){

		firstRunCheck();
			
		var listViewInput = document.createElement('input'),
			searchByTitleTick = document.createElement('input'),
			searchByTitleText = document.createTextNode(' search by title');
		
		listViewInput.setAttribute('type','hidden');
		listViewInput.setAttribute('name','o');
		listViewInput.setAttribute('value','list');		
		
		searchByTitleTick.setAttribute('type','checkbox');
		searchByTitleTick.setAttribute('name','w');
		searchByTitleTick.setAttribute('value','t');	
		
		if(localStorage["userscript_listSearchSetting"] === "true"){
		
			searchMini.querySelector('form').appendChild(listViewInput);
		
		}
		
		searchMini.querySelector('form').appendChild(searchByTitleTick);
		searchMini.querySelector('form').appendChild(searchByTitleText);
		
		if(localStorage["userscript_searchByTitle"] === "true"){

			searchByTitleTick.checked=true;
					
		}
		
		searchByTitleTick.addEventListener('change', function(e){

			if(e.target.checked){
			
				localStorage["userscript_searchByTitle"] = "true";
			
			}
			else{
			
				localStorage["userscript_searchByTitle"] = "false";		
			
			}

		},false);	
	
	}
	
}





