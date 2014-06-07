// ==UserScript==
// @name           Eurosport Fantasy Tennis text navigation
// @namespace      http://www.maeki.org
// @description    Hide big top image and navigation bar and replace with simple text links.
// @include        http://fantasy.tennis.*.eurosport.com/*
// ==/UserScript==

var theImage, newLinks;
theImage = document.getElementById('ctl06_imgHead');
if (theImage) {
    newLinks = document.createElement('p');
    
    var homeLink = document.createElement('a');
    homeLink.href = 'default.aspx';
    homeLink.textContent = ' Home ';
    homeLink.style.fontSize = '130%';
    homeLink.style.fontWeight = 'bold';
    homeLink.style.color = 'white';
    homeLink.style.textDecoration = 'none';
    newLinks.appendChild(homeLink); 
    var teamLink = document.createElement('a');
    teamLink.href = 'team.aspx';
    teamLink.textContent = ' Team ';
    teamLink.style.fontSize = '130%';
    teamLink.style.fontWeight = 'bold';
    teamLink.style.color = 'white';
    teamLink.style.textDecoration = 'none';
    newLinks.appendChild(teamLink); 
    var leagueLink = document.createElement('a');
    leagueLink.href = 'league.aspx';
    leagueLink.textContent = ' League ';
    leagueLink.style.fontSize = '130%';
    leagueLink.style.fontWeight = 'bold';
    leagueLink.style.color = 'white';
    leagueLink.style.textDecoration = 'none';
    newLinks.appendChild(leagueLink); 
    var statLink = document.createElement('a');
    statLink.href = 'stats.aspx';
    statLink.textContent = ' Stats ';
    statLink.style.fontSize = '130%';
    statLink.style.fontWeight = 'bold';
    statLink.style.color = 'white';
    statLink.style.textDecoration = 'none';	
    newLinks.appendChild(statLink); 

    theImage.parentNode.replaceChild(newLinks, theImage);
}