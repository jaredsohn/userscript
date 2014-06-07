// ==UserScript==
// @name           			episodecalendar.com Torrent Search Links (Using Detailed numbering setting).
// @namespace				http://userscripts.org/users/Nemura
// @author					Nemura (Original by Konstantinos Goutsos)
// @description				Just a simple script for episodecalendar.com that adds a Kickass.to search link under each episode in the calendar and unwatched pages. 
// @copyright 				2014
// @license					Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version        			1.0
// @date           			15/03/2014
// @include        			http://*episodecalendar.com/calendar*
// @include        			http://*episodecalendar.com/unwatched*
// ==/UserScript==

//I fixed some things and edited the original script for use with the "No episode title" & "Detailed numbering" settings on EpCalendar.



var baseUrl = 'https://kickass.to/usearch/';
var spaceChar = '%20';

var timer;
var interval = 500;
var currentPage = window.location + '';
currentPage = currentPage.substring(currentPage.indexOf('episodecalendar.com/') + 20);

var slashIndex = currentPage.indexOf('/');
if (slashIndex > 0) {
    currentPage = currentPage.substr(0, slashIndex);
}


switch (currentPage) {
case 'calendar':

    var showCells = document.getElementsByClassName('calendar_cell_content');
    for (var i in showCells)
    {
        var uls = showCells[i].getElementsByTagName('ul');
        var lis = uls[0].getElementsByTagName('li');
        for (j = 0; j < lis.length; j++) {
            var showTitle = lis[j].getElementsByTagName('strong') [0].getElementsByTagName('a') [0].firstChild.data.replace(' ', spaceChar);
            var epId = lis[j].getElementsByTagName('span') [0].firstChild.data;
            epId = epId.substring(2);
            var searchLink = document.createElement('a');
            searchLink.target = '_blank';
            searchLink.href = baseUrl + showTitle + spaceChar + epId + spaceChar + '720';
            searchLink.appendChild(document.createTextNode('Search for torrents'));
            var searchSpan = searchSpan = document.createElement('span');
            searchSpan.appendChild(searchLink);
            lis[j].appendChild(document.createElement('br'));
            lis[j].appendChild(searchSpan);
        }
    }

    break;

case 'unwatched':

    function makeLinks() {
        var addedLinks = document.getElementsByClassName('greaseAdded');
        for (k = addedLinks.length - 1; k >= 0; --k) {
            addedLinks[k].parentElement.removeChild(addedLinks[k]);
        }

        var unDiv = document.getElementById('unwatched_episodes');
        if (unDiv.innerHTML != '') {
            self.clearInterval(timer);
            var title = document.getElementById('show_anchors') .getElementsByTagName('ul') [0].getElementsByClassName('selected') [0].getElementsByTagName('span') [0];
            var showTitle = title.innerHTML;
            var episodesEven = document.getElementsByClassName('episode even');
            var episodesOdd = document.getElementsByClassName('episode odd');
            for (i = 0; i < episodesEven.length; i++)
            {
                var name = episodesEven[i].getElementsByClassName('name') [0];
                var episode = name.getElementsByTagName('strong') [0].innerHTML;
                var searchLink = document.createElement('a');
                searchLink.target = '_blank';
                searchLink.href = baseUrl + showTitle + spaceChar + episode + spaceChar + '720';
                searchLink.appendChild(document.createTextNode('Search for torrents'));
                var searchSpan = document.createElement('span');
                searchSpan.className = 'greaseAdded';
                searchSpan.appendChild(searchLink);
                var addedBreak = document.createElement('br');
                addedBreak.className = 'greaseAdded';
                name.appendChild(addedBreak);
                name.appendChild(searchSpan);
            }
            for (i = 0; i < episodesOdd.length; i++)
            {
                var name = episodesOdd[i].getElementsByClassName('name') [0];
                var episode = name.getElementsByTagName('strong') [0].innerHTML;
                var searchLink = document.createElement('a');
                searchLink.target = '_blank';
                searchLink.href = baseUrl + showTitle + spaceChar + episode + spaceChar + '720';
                searchLink.appendChild(document.createTextNode('Search for torrents'));
                var searchSpan = document.createElement('span');
                searchSpan.className = 'greaseAdded';
                searchSpan.appendChild(searchLink);
                var addedBreak = document.createElement('br');
                addedBreak.className = 'greaseAdded';
                name.appendChild(addedBreak);
                name.appendChild(searchSpan);
            }

        }
    }
    var anchorLinks = document.getElementById('show_anchors') .getElementsByTagName('a');
    for (var i in anchorLinks) {
        anchorLinks[i].onclick = function () {
            self.clearInterval(timer);
            timer = self.setInterval(makeLinks, 800);
        };
    }
    timer = self.setInterval(makeLinks(), 800);

    break;

}
