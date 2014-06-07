// ==UserScript==
// @name           Rotten Tomatoes Sorter
// @namespace      http://m0.to/
// @description    Sorts movies inside tables by year/rating/votes/name.
// @include        http://www.rottentomatoes.com/m/*/movies_like_*/*
// @version        1.04
// ==/UserScript==

if(localStorage==undefined)
	localStorage = {};
	
function yearSort(a,b) {
	return a.year - b.year;
}
function movieSort(a,b)	{
	return a.link.name>b.link.name?-1:1;
}
function ratingSort(a,b){
	return a.rating - b.rating;
}

function voteSort(a,b){
	return a.votes - b.votes;
}

var sortTypes = [yearSort,movieSort,ratingSort,voteSort];

function Link(link){
	this.href = link.href;
	this.name = link.innerHTML;
}

function Entry(tr){
	if(tr.getElementsByClassName("tMeterScore")[0])
		this.rating = parseInt(tr.getElementsByClassName("tMeterScore")[0].innerHTML);
	else
		this.rating = 50;
		
	var link = tr.getElementsByTagName("td")[1].getElementsByTagName("a")[0];
	
	this.link = new Link(link);
	
	this.year = parseInt(link.nextSibling.nodeValue.replace(/[\s\(\)]/g,''));
	if(!this.year){
		this.year = -1;
	}
	
	this.sugg = new Link(tr.getElementsByTagName("td")[2].getElementsByTagName("a")[0]);
	
	if(tr.getElementsByTagName("td")[3])
		this.votes = parseInt(tr.getElementsByTagName("td")[3].innerHTML)||0;
	else
		this.votes = 0;
}

Entry.prototype = {
	putInto:function(body){
		var tr = document.createElement("Tr");
		{ //Rating
			var rating = document.createElement("td");
			var iconSpan = document.createElement("span");
			iconSpan.setAttribute("class","tMeterIcon tiny");
			var iconIcon = document.createElement("span");
			if(this.rating<=50){
				iconIcon.setAttribute("title","Rotten");
				iconIcon.setAttribute("class","icon tiny rotten");
			}
			else{
				iconIcon.setAttribute("title","Fresh");
				iconIcon.setAttribute("class","icon tiny fresh");
			}
			var scoreSpan = document.createElement("span");
			scoreSpan.setAttribute("class","tMeterScore");
			scoreSpan.innerHTML = this.rating+"%";
			
			iconSpan.appendChild(iconIcon);
			iconSpan.appendChild(scoreSpan);
			rating.appendChild(iconSpan);
			tr.appendChild(rating);
		}
		{ //Movie
			var movie = document.createElement("td");
			var link = document.createElement("a");
			link.innerHTML = this.link.name;
			link.href = this.link.href;
			movie.appendChild(link);
			tr.appendChild(movie);
		}
		{ //Year
			var year = document.createElement("td");
			if(this.year==-1)
				year.innerHTML = 'unknown';
			else
				year.innerHTML = this.year;
			tr.appendChild(year);
		}
		{ //Suggested By
			var sugg = document.createElement("td");
			var link = document.createElement("a");
			link.innerHTML = this.sugg.name;
			link.href = this.sugg.href;
			sugg.appendChild(link);
			tr.appendChild(sugg);
		}
		{ //Votes
			var votes = document.createElement("td");
			votes.setAttribute("sub","voteCount");
			votes.innerHTML = (this.votes>=0?"+":"")+this.votes;
			tr.appendChild(votes);
		}
		body.appendChild(tr);
	}
}

function Table(table){	
	if(!table)
		return;
	
	if(table.table){
		return table.table;
	}
	this.table = table;
	this.entries = [];
		
	var trs = table.getElementsByTagName("tr");
	
	if(!trs)
		return;
	
	for(var i=1;i<trs.length;i++){
		this.entries.push(new Entry(trs[i]));
	}
	
	table.table = this;
	
	if(localStorage.lastSort==undefined)
		localStorage.lastSort = sortTypes.indexOf(voteSort);
	if(localStorage.ascending==undefined)
		localStorage.ascending = 1;
	
	this.sortedAscending = localStorage.ascending;
	
	this.lastSort = sortTypes[localStorage.lastSort];
	this.sort(sortTypes[localStorage.lastSort]);
	
	this.reconstruct();
}

var tableHeadings = [{text:"Rating",sorter:ratingSort},{text:"Movie",sorter:movieSort},{text:"Year",sorter:yearSort},{text:"Suggested By"},{text:"Votes",sorter:voteSort}];
Table.prototype = {
	sort:function(sorter){
		localStorage.lastSort = sortTypes.indexOf(sorter);
	
		this.entries.sort(sorter);
		
		if(this.lastSort==sorter)
			this.sortedAscending ^= true;
		else
			this.sortedAscending = false;
		
		localStorage.ascending = this.sortedAscending^true;
		
		if(!this.sortedAscending){
			this.entries.reverse();
		}
		
		this.lastSort = sorter;
		
		var settingsDiv = document.createElement("div");
		this.table.parentNode.insertBefore(settingsDiv,this.table);
		
		this.reconstruct();
	},
	reconstruct:function(){
		this.table.innerHTML = '';
		
		var headings = document.createElement("thead");
		for(var i=0;i<tableHeadings.length;i++){
			var th = document.createElement("th");
			if(tableHeadings[i].sorter){
				var link = document.createElement("a");
				link.innerHTML = tableHeadings[i].text;
				link.href = '#';
				link.style.color = '#285CAB';
				
				th.sorter = tableHeadings[i].sorter;
				link.onclick = function(){	
					return false;
				}
				th.appendChild(link);
				th.style.cursor = 'pointer';
				
				th.onclick = function(){
					var table = this.parentNode.parentNode.table;
					table.sort(this.sorter);
				}
				
				if(this.lastSort==tableHeadings[i].sorter){
					if(!this.sortedAscending)
						th.style.backgroundColor = 'rgba(125,255,125,0.4)';
					else
						th.style.backgroundColor = 'rgba(255,125,125,0.4)';
				}
			}
			else{
				th.innerHTML = tableHeadings[i].text;
			}
			headings.appendChild(th);
		}
		
		this.table.appendChild(headings);
		
		var body = document.createElement("tbody");
		for(var i=0;i<this.entries.length;i++){
			var currentEntry = this.entries[i];
			currentEntry.putInto(body);
		}
		
		this.table.appendChild(body);
	}
}

var mainTable = new Table(document.getElementsByClassName("rt_table")[0]);