// ==UserScript==
// @name        PrimeWire Movie Trailers and Reviews
// @namespace   PMTR
// @description Adds links to movie trailers and reviews from YouTube, IMDB and Rotten Tomatoes for movies and TV shows. Also adds new site features.
// @include     http://www.primewire.ag/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @resource    primefix http://userscripts.org/scripts/source/399456.user.js
// @version     02.28.14.1400
// @author	drhouse
// @contributor arrgee
// @contributor fleshTH
// ==/UserScript==

$(document).ready(function () {
    
    var siteLink,
        siteLink1,
        titleNodeList,
        titleNodeList1,
        title,
        title1,
        videos,
        videos1,
        sites = { IMDB: 'imdb.com', YouTube: 'youtube.com', RottenTomatoes: 'rottentomatoes.com' };
    
    
    videos = document.getElementsByClassName('index_item');
    
    for (var i = 0; i < videos.length; i++) {
        
        titleNodeList = $(videos[i].getElementsByTagName('a'));
        
        var tit = $('div.index_item > a:nth-child(1)'); //site listings
        
        if (titleNodeList.length > 0) {
            title = tit[i].getAttribute("title"); 
        }
        title = title.replace(/^\S+/g, '');
        title = title.replace(/\./g, '+');
        title = title.replace(/(\W)-[\w]*/g, '');
        title = title.replace(/(\W)\++[\w]*/g, '');
        title = title.trim();
        
        for (var site in sites) {
            siteLink = document.createElement('a');
            siteLink.textContent = site;
            siteLink.setAttribute('href', 'https://www.google.com/webhp#btnI&hl=en&safe=off&q=site:' + sites[site] + '+' + title);
            siteLink.setAttribute('class', 'nframe');
            siteLink.style.color = '#0980f4';
            siteLink.style.marginLeft = '5px';
            siteLink.style.fontSize = 'xx-small';
            
            titleNodeList[0].appendChild(siteLink);
        }
        
    }
    
    if (location.href.toString().indexOf("primewire.ag/tv") != -1) { //single TV
        
        if ($('#first > div').text() == 'Doesn\'t look like there are any links'){
            var votive = $('div.stage_navigation.movie_navigation > h1 > span').text(); //episode title
        } else {
            var votive = $('div.stage_navigation.movie_navigation > h1 > span > a').text(); //series title
        }
        
        var year = $('div:nth-child(3).movie_info > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)').text();
        var air = $('div.movie_info > table > tbody > tr:nth-child(3) > td:nth-child(1) > strong').text();
        var released = $('tr:nth-child(2) > td:nth-child(1) > strong').text();
        
        if (released == 'Released:') { //series TV
            var year = $('div:nth-child(3).movie_info > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)').text();
            year = year.replace(/^\S+/g, '');
            year = year.replace(/..\D\D/g, '');
            
        } else if (air == 'Air Date:') {
            var year = $('div:nth-child(3).movie_info > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)').text();
            
        } else {
            year = '';
            
        }
    } else {
        votive = $('div:nth-child(1).stage_navigation.movie_navigation').text(); //single Movie
        votive = votive.replace(/\s{2,}/g, ' ');
        year = $('div:nth-child(3).movie_info > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)').text();
        
    }
    
    year = year.replace(/^\S+/g, '');
    year = year.replace(/..\D\D/g, '');
    year = year.trim();
    
    votive = votive.replace(/\s{2,}/g, ' ');
    votive = votive.trim();
    title1 = votive + ' ' + '(' + year + ')';
    
    videos1 = $('div:nth-child(1).stage_navigation.movie_navigation');
    
    for (var i = 0; i < videos1.length; i++) {
        
        titleNodeList1 = $(videos1[i].getElementsByTagName('a'));
        
        for (var site in sites) {
            siteLink1 = document.createElement('a');
            siteLink1.textContent = site;
            siteLink1.setAttribute('href', 'https://www.google.com/webhp#btnI&hl=en&safe=off&q=site:' + sites[site] + '+' + title1);
            siteLink1.setAttribute('class', 'nframe');
            siteLink1.style.color = '#0980f4';
            siteLink1.style.marginLeft = '0px';
            siteLink1.style.fontSize = 'x-small';
            
            var subtext = $('td .clearer')[0];
            $(subtext).append('[ ');
            $(subtext).append(siteLink1);
            $(subtext).append(' ]');
            
        }
        
        var check = $('#first > div.tv_container > h2 > a:first').text();
        
        if (( location.href.toString().indexOf("primewire.ag/watch") > 1 || location.href.toString().indexOf("primewire.ag/tv") > 1 ) && (check == "Season 1")) {
            
            var lat = $('div.tv_episode_item').not(".transp2");
            var ars = $(lat).last();
            var nu = (ars).find('a').attr('href');
            
            var siteLink2;
            siteLink2 = document.createElement('a');
            siteLink2.textContent = 'Latest';
            siteLink2.setAttribute('href', 'http://www.primewire.ag' + nu);
            siteLink2.setAttribute('class', 'nframe');
            siteLink2.style.color = '#0980f4';
            siteLink2.style.marginLeft = '0px';
            siteLink2.style.fontSize = 'x-small';
            
            $(subtext).append('[ ');
            $(subtext).append(siteLink2);
            $(subtext).append(' ]');
            
        }
    }
    
    $(".mlink_imdb a").addClass("nframe");
    
    $(".nframe").click(function (e) {
        e.preventDefault();
        var url = $(this).attr("href");
        
        var width = screen.width * 0.75;
        var height = screen.height * 0.75;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=yes';
        params += ', scrollbars=yes';
        params += ', status=no';
        params += ', toolbar=no';
        newwin = window.open(url, 'subpop', params);
        if (window.focus) {
            newwin.focus()
        }
        return false;
    })
    
    $('.mlink_buydvd').remove();
    $('.addthis_toolbox').remove();
    
    var check = $('#first > div.tv_container > h2 > a').text();
    
    if ((check != "Season 1")) {eval(GM_getResourceText("primefix"))};
    
})