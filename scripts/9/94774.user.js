// ==UserScript==
// @name           trakt.tv - extras
// @namespace      http://userscripts.org/scripts/show/94774
// @description    Adds IMDb rating to movies
// @include        http://trakt.tv/movie/*
// @version        20130527
// ==/UserScript==


function formatNumber(inputI){
	var regexp=/(\d+)(\d{3})/;
	while (regexp.test(inputI)){inputI=inputI.replace(regexp,'$1'+','+'$2')}
	return inputI;
}
function setIMDbValue(inputSID,inputSText){
	document.getElementById(inputSID).innerHTML=inputSText;
}
function getIMDbData(inputS){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.imdbapi.com/?i="+inputS,
		onload: function(xhr){
			var jsonData=eval("("+xhr.responseText+")");
			if(jsonData.Response=="True"){
				if(jsonData.imdbRating=="N/A"){
					setIMDbValue("kju_imdb_rating","<span>IMDb rating</span> n/a");
				}else{
					setIMDbValue("kju_imdb_rating","<span>IMDb rating</span> "+jsonData.imdbRating+" <span>("+formatNumber(jsonData.imdbVotes)+" votes)</span>");
				}
			}
		}
	});
}

// reads TMDb and IMDb id from movie pages
var IMDb_id=document.getElementById("meta-imdb-id").value;
var TMDb_id=document.getElementById("meta-tmdb-id").value;

// adds IMDb rating and actors
if(IMDb_id.len!=0){
    elemID=document.evaluate("//span[.='Rating']",document,null,9,null).singleNodeValue;
    var newElement=document.createElement("p");
    newElement.setAttribute("id","kju_imdb_rating");
    elemID.parentNode.insertBefore(newElement,elemID);
    setIMDbValue("kju_imdb_rating","<span>IMDb rating</span> ...");
    getIMDbData(IMDb_id);
	}