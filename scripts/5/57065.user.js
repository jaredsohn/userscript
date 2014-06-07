// ==UserScript==
// @name           TV Calendar Test
// @namespace      localhost
// @include        http://www.pogdesign.co.uk/cat*
// @description	   Adds Newsleach and Binsearch links to each show in tv calendar
// ==/UserScript==
// set up jQuery variable

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function getShowName(showName, episode, date)
{	
	var season = episode.substring(3, episode.search('-') - 1);
	var episode = episode.substring(episode.search('Ep:') + 4);
	
	if(season.length == 1){
		season = "0" + season;
	}
	
	if(episode.length == 1){
		episode = "0" + episode;
	}
	
	if(showName != "The Colbert Report" && showName != "The Daily Show"){
		var searchString = trim(showName) + ' S' + trim(season) + 'E' + trim(episode);
	}else{			
		date = date.substring(2);	
		
		var	firstUnderscore = date.indexOf('_', 0);				
		var	secondUnderscore = date.indexOf('_', firstUnderscore + 1);				
			
		var dateDate = date.substring(0, firstUnderscore);				
		var dateMonth = date.substring(firstUnderscore + 1, secondUnderscore);
		var dateYear = date.substring(secondUnderscore + 1);
				
		if(dateDate.length == 1){
			dateDate = "0" + dateDate;
		}
		
		if(dateMonth.length == 1){
			dateMonth = "0" + dateMonth;
		}
		
		var searchDate = dateYear + "." + dateMonth + "." + dateDate;
		
		var searchString = trim(showName) + '+' + searchDate;
	}
		
	return escape(searchString.replace('(US)', ''));
}

function downloadAllMerlin(e)
{
    e.stopPropagation();
	var shows = this.parentNode.parentNode.getElementsByClassName('eplink');
	for(var y = 0; y < shows.length; y++){
		var showName = shows[y].innerHTML;
		var episodeElement = shows[y].parentNode.getElementsByClassName('seasep')[1];		
		var episode = episodeElement.innerHTML;		
		var date = shows[y].parentNode.parentNode.parentNode.parentNode.parentNode.id;
		
		var searchString = getShowName(showName, episode, date);
	
		
		window.open('http://www.merlins-portal.net/Vbulletin/nzblist.php?pp=250&nzbsearch=' + searchString + '&sortby=postedwhen&sortby2=desc', '_blank');		
	}
}

function downloadAllBS(e)
{
	e.stopPropagation();
	var shows = this.parentNode.parentNode.getElementsByClassName('eplink');
	for(var y = 0; y < shows.length; y++){
		var showName = shows[y].innerHTML;
		var episodeElement = shows[y].parentNode.getElementsByClassName('seasep')[1];		
		var episode = episodeElement.innerHTML;
		var date = shows[y].parentNode.parentNode.parentNode.parentNode.parentNode.id;
		
		var searchString = getShowName(showName, episode, date);
		
		window.open('http://binsearch.info/?q=' + searchString + '&max=250&adv_age=365&server=', '_blank');		
	}
}

var days = document.getElementsByClassName('day');
var today = document.getElementsByClassName('today');

if(today.length == 1){
	today  = today[0];
	
	var allp = document.createElement('p');
	var alla = document.createElement('a');
	
	allp.style.textAlign = "center";
	
	alla.innerHTML = "Open All - Merlins Portal";
	alla.href = "#";
	alla.addEventListener('click', downloadAllMerlin, true);
	
	allp.appendChild(alla);
	today.appendChild(allp);	
	
	var allp = document.createElement('p');
	var alla = document.createElement('a');
	
	allp.style.textAlign = "center";
	
	alla.innerHTML = "Open All - Binsearch";
	alla.href = "#";
	alla.addEventListener('click', downloadAllBS, true);
	
	allp.appendChild(alla);
	today.appendChild(allp);

	var shows = today.getElementsByClassName('eplink');
	for(var y = 0; y < shows.length; y++){	
		var showName = shows[y].innerHTML;
		var episodeElement = shows[y].parentNode.getElementsByClassName('seasep')[1];		
		var episode = episodeElement.innerHTML;				
		var date = shows[y].parentNode.parentNode.parentNode.parentNode.parentNode.id;
					
		var searchString = getShowName(showName, episode, date);
		
		var br = document.createElement('br');		
		
		var binsearch = document.createElement('a');		
		binsearch.href = 'http://binsearch.info/?q=' + searchString + '&max=250&adv_age=365&server=';
		binsearch.innerHTML = "Binsearch | ";
		
		var merlins = document.createElement('a');		
		merlins.href = 'http://www.merlins-portal.net/Vbulletin/nzblist.php?pp=30&nzbsearch=' + searchString + '&sortby=postedwhen&sortby2=desc';	
		merlins.innerHTML = "Merlin ";
				
		episodeElement.parentNode.appendChild(br);
		episodeElement.parentNode.appendChild(binsearch);
		episodeElement.parentNode.appendChild(merlins);
		episodeElement.parentNode.style.paddingBottom = "10px";
		episodeElement.parentNode.style.paddingTop = "10px";
	}
}

for (var i = 0; i < days.length; i++){
	
    var allp = document.createElement('p');
	var alla = document.createElement('a');
	
	allp.style.textAlign = "center";
	
	alla.innerHTML = "Open All - Merlins Portal";
	alla.href = "#";
	alla.addEventListener('click', downloadAllMerlin, true);
	
	allp.appendChild(alla);
	days[i].appendChild(allp);	
	
	var allp = document.createElement('p');
	var alla = document.createElement('a');
	
	allp.style.textAlign = "center";
	
	alla.innerHTML = "Open All - Binsearch";
	alla.href = "#";
	alla.addEventListener('click', downloadAllBS, true);
	
	allp.appendChild(alla);
	days[i].appendChild(allp);

	var shows = days[i].getElementsByClassName('eplink');
	for(var y = 0; y < shows.length; y++){	
		var showName = shows[y].innerHTML;
		var episodeElement = shows[y].parentNode.getElementsByClassName('seasep')[1];		
		var episode = episodeElement.innerHTML;
		var date = shows[y].parentNode.parentNode.parentNode.parentNode.parentNode.id;
					
		var searchString = getShowName(showName, episode, date);
		
		var br = document.createElement('br');		
		
		var binsearch = document.createElement('a');		
		binsearch.href = 'http://binsearch.info/?q=' + searchString + '&max=250&adv_age=365&server=';
		binsearch.innerHTML = "Binsearch | ";
		
		var merlins = document.createElement('a');		
		merlins.href = 'http://www.merlins-portal.net/Vbulletin/nzblist.php?pp=30&nzbsearch=' + searchString + '&sortby=postedwhen&sortby2=desc';	
		merlins.innerHTML = "Merlin ";
				
		episodeElement.parentNode.appendChild(br);
		episodeElement.parentNode.appendChild(binsearch);
		episodeElement.parentNode.appendChild(merlins);
		episodeElement.parentNode.style.paddingBottom = "10px";
		episodeElement.parentNode.style.paddingTop = "10px";
	}
}
//S: 4 - Ep: 3
