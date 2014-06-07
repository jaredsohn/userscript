// ==UserScript==
// @name           Bechdel Test
// @namespace      bechdeltest
// @include        http://imdb.com/title/*
// @include        http://www.amazon.de/*
// @include        http://www.amazon.com/*
// @include        http://www.lovefilm.de/film/*
// @include        http://www.netflix.com/Movie/*
// @include        http://www.ofdb.de/film/*
// @exclude        http://www.amazon.com/gp/cart/*
// @exclude        http://www.amazon.de/gp/cart/*
// @exclude        http://www.amazon.com/gp/product/*
// @exclude        http://www.amazon.de/gp/product/*
//
//
// ==/UserScript==

var baseurl="http://bechdeltest.com/api/v1/";

function queryid(id) {
    var url=baseurl + "getMovieByImdbId?imdbid=" + id;
    GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload : function(req) {
                        var job = {}; 
                        job = JSON.parse( req.responseText );
                        styleimdb(job,req.status);
                    }
                    });
}

function queryname(name) {
    var url=baseurl + "getMoviesByTitle?title=" + name;
    GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload : function(req) {
                        var job = [{}]; 
                        job = JSON.parse( req.responseText );
                        styleamazon(job,req.status);
                    }
                    });
}


function setmessage(state) {
    var output="Score:";
    switch (parseInt(state)) {
        case -1: output=output+ "Not rated";
                break;
        case 0: output=output+ "Fail!";
                break;
        case 1: output=output+ "1/3 passed.";
                break;
        case 2: output=output+ "2/3 passed.";
                break;
        case 3: output=output+ "Pass!";
                break;
        
    }
    return output;
}

function styleimdb(job,rstatus) {
    var block="";
    if (rstatus == 404) {
        block+="<h2>Sorry, no review found.</h2>";
    } else if (rstatus == 200) {
        block+="<h2>" + setmessage(job.rating);
        if (job.dubious>0) { block+="(but contested)"; }
        var titleurl=job.title.toLowerCase();
        titleurl=titleurl.replace(/ /g,"_");
        block+=' <a href="http://bechdeltest.com/view/' + job.id + '/' + titleurl + '">Details</a></h2>';
    }    
if (document.location.host=="www.imdb.com") {
        var heading=document.getElementsByTagName('h1')[0].parentNode.innerHTML;
        document.getElementsByTagName('h1')[0].parentNode.innerHTML=heading.substring(0,heading.length - 11)  + block;
} 
if (document.location.host=="www.ofdb.de") {
        var heading=document.getElementsByTagName('h2')[0].parentNode.innerHTML;
        document.getElementsByTagName('h2')[0].parentNode.innerHTML=heading.substring(0,heading.length - 11)  + block;
}
}




function styleamazon(job,rstatus) {
    var block="";
    if (rstatus == 404 || job.length == 0 ) {
        block+="<h2>Sorry, no review found.</h2>";
    } else if (rstatus == 200) {
        for (var i=0;i<job.length;i++) {
            block+="<h2>Found " + job[i].title + ". " + setmessage(job[i].rating);
            if (job[i].dubious>0) { block+="(but contested)"; }
            var titleurl=job[i].title.toLowerCase();
            titleurl=titleurl.replace(/ /g,"_");
            block+=' <a href="http://bechdeltest.com/view/' + job[i].id + '/' + titleurl + '">Details</a></h2>';
        }
    } else {
        block+="<h2>Sorry, unknown error.</h2>";
    }
if (document.location.host=="www.amazon.com" || document.location.host=="www.netflix.com") {
    var heading=document.getElementsByTagName('h1')[0].parentNode.innerHTML;
    document.getElementsByTagName('h1')[0].parentNode.innerHTML=heading.substring(0,heading.length - 11)  + block;
}
if (document.location.host=="www.lovefilm.de") {
    var heading=document.getElementsByTagName('h1')[0].innerHTML;
    document.getElementsByTagName('h1')[0].innerHTML=heading.substring(0,heading.length - 11)  + block;
}
}

//
// Begin execution by finding ID or name
// and executing the relevant query
//

if (document.location.host=="www.imdb.com") {
    var id=document.location.href.match(/\d+/);
    document.getElementsByTagName('h1')[0].parentNode.innerHTML=document.getElementsByTagName('h1')[0].parentNode.innerHTML + "Checking...";
    queryid(id);
}

if (document.location.host=="www.amazon.com") {
    if (document.getElementById('storeID').value=="dvd") {
        var name=document.getElementsByTagName('h1')[0].firstChild.innerHTML;
        name=name.replace(/\[.+\]/g,"");
        name=name.replace(/\(.+\)/g,"");
        name=name.trim();
        document.getElementsByTagName('h1')[0].parentNode.innerHTML=document.getElementsByTagName('h1')[0].parentNode.innerHTML + "Checking...";
        queryname(name);
    }
}

if (document.location.host=="www.lovefilm.de") {
        var name=document.getElementsByTagName('h1')[0].innerHTML;
        name=name.replace(/\[.+\]/g,"");
        name=name.replace(/\<.+\>/g,"");
        name=name.replace(/\(.+\)/g,"");
        name=name.trim();
        alert(name);
        document.getElementsByTagName('h1')[0].innerHTML=document.getElementsByTagName('h1')[0].innerHTML + "Checking...";
        queryname(name);
}

if (document.location.host=="www.netflix.com") {
        var name=document.getElementsByTagName('h1')[0].innerHTML;
        name=name.replace(/\[.+\]/g,"");
        name=name.replace(/\(.+\)/g,"");
        name=name.trim();
        document.getElementsByTagName('h1')[0].parentNode.innerHTML=document.getElementsByTagName('h1')[0].parentNode.innerHTML + "Checking...";
        queryname(name);
}

if (document.location.host=="www.ofdb.de") {
        var id=document.getElementsByTagName('table')[1].getElementsByTagName('a')[0].href;
        id=id.match(/[0-9]+/);
        document.getElementsByTagName('h2')[0].parentNode.innerHTML=document.getElementsByTagName('h2')[0].parentNode.innerHTML + "Checking...";
        queryid(id);
}

