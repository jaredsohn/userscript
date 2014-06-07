// ==UserScript==
// @name           NetflixInstant HD
// @namespace      http://mst.edu/~jmer43
// @description    Indicate which movies have HD instant watch on Netflix.
// @include        http://www.netflix.com/*
// ==/UserScript==

/*  This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>. */
    
netflix = "http://odata.netflix.com/Catalog/Titles?$filter=Url eq '";

var id_pattern = /(\d)+/gi
page_id = document.URL.match(id_pattern)[0];

title =  /Netflix: (.+)/(document.title)[1];

links = document.getElementsByTagName('link');

for(var i = 0; i < links.length; i++) {
    if(links[i].attributes.getNamedItem('rel').value == 'canonical') {
        url = links[i].attributes.getNamedItem('href').value;
        break;
    }
}

//Must change over to the DVD-tab's formatting
url = url.replace('WiMovie', 'Movie');

var HD_icon = document.createElement("div");
HD_icon.innerHTML = '<div class="bd clearfix"><dl><dt>Streaming</dt><dd><div class="maturityRating mpaaRating mpaaRating-NR clearfix"><a class="value">HD</a><p>High Definition steaming available.</p></div>'

var SD_icon = document.createElement("div");
SD_icon.innerHTML = '<div class="bd clearfix"><dl><dt>Streaming</dt><dd><div class="maturityRating mpaaRating mpaaRating-NR clearfix"><a class="value">SD</a><p>Standard Definition steaming available.</p></div>'

var ratings = document.getElementById('mdp-details');

//search through the DOM for the "Movie Details" section
var ratings_sub = ratings.getElementsByTagName('div');
for(var i = 0; i < ratings_sub.length; i++) {
    if(ratings_sub[i].className == 'module') {
        var module_sub = ratings_sub[i].getElementsByTagName('div');
        for(var j = 0; j < module_sub.length; j++) {
            if(module_sub[i].className == 'hd clearfix') {
                movie_details = module_sub[i];
                break;
            }
        }
        break;
    }
}

ratings = movie_details;

GM_xmlhttpRequest({
    method: 'GET',
    url: netflix + url + "'",
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, 
            "application/xml");
        hd_avail = dom.getElementsByTagName('d:HighDefinitionAvailable')[0].textContent;
        instant = dom.getElementsByTagName('d:Instant')[0];
        avail = instant.getElementsByTagName('d:Available')[0].textContent;
        if(avail == 'true') {
            if(hd_avail == 'true') {
                ratings.parentNode.insertBefore(HD_icon, ratings.nextSibling);
            }
            else {
                ratings.parentNode.insertBefore(SD_icon, ratings.nextSibling);
            }
        }
    }
});

