// ==UserScript==
// @name           Cuevana Download
// @version        0.0.1
// @namespace      http://blog.felipebarriga.cl
// @description    Add a download movie and download subtitles to cuevana movies.
// @include        http://www.cuevana.tv/*
// @author         fbarriga <spam at felipebarriga.cl >
// @date           2011-10-01
// @license        MIT License
// ==/UserScript==


////////////////////////////////////////////////////////
// Utility functions

function createDownloadDiv()
{
	var botmenu_block = document.getElementById('botmenu_block');
	if (botmenu_block != null)
	{
		var new_block = document.createElement("div");
		new_block.style.display = "none"; 
		new_block.setAttribute("id", "custom_download_div");
	
		botmenu_block.parentNode.insertBefore(new_block, botmenu_block);
	}
	
	var download_button = document.getElementById('des_link');
	if (download_button != null)
	{
		download_button.setAttribute("href", "#");
		download_button.setAttribute("onclick", "javascript: document.getElementById('botmenu_block').style.display='block'; return false;");
	}
}

function addToDownloadDiv(name, url)
{
	var download_div = document.getElementById('botmenu_block');
	var new_a = document.createElement("a");
	new_a.setAttribute("href", url);
	new_a.innerHTML = name;
	
	var sep_spaces = document.createElement("span");
	sep_spaces.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	
	download_div.appendChild(new_a);
	download_div.appendChild(sep_spaces);
}

function isSeries()
{
	var url = window.location.pathname;
	if (url.split('/')[1] == "series")
		return true;
	
	return false;
}

function getMovieID()
{
	var url = window.location.pathname;
	return url.split('/')[2];
}

function addDownloadLink(provider, url)
{
	var providerName = "Unknown";
	switch(provider)
	{
		case 'megaupload':
			providerName = "Mega Upload";
			break;
			
		case 'bitshare':
			providerName = "BitShare"
			break;
			
		case 'filefactory':
			providerName = "File Factory";
			break;
			
		default:
			return;
			break;
	}
	
	addToDownloadDiv("Download From " + providerName, url);
}

// get page with download links and wait the callback
function getDownloadCodes()
{
	var base_path_movie_post_series = "";
	if (isSeries())
		base_path_movie_post_series = "&tipo=s";
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: base_path_movie_pre + movieID + base_path_movie_post + base_path_movie_post_series,
		onload: function(responseDetails) {
			// check if it's all ok
			if (responseDetails.status != 200)
				return;

			// get servers with the file (and the id on the server)
			var regEx = new RegExp("goSource\\('([a-z0-9]*)','([a-z]*)'\\)", "g");
			
			var servers = null;
			while ( (servers = regEx.exec(responseDetails.responseText)) != null )
			{
				if (servers == null)
					break;
			
				getRealDownloadLinks(servers[2], servers[1]);
			}
		}
	});
}

// get real ID's
function getRealDownloadLinks(provider, id)
{
	var post_data = 'key=' + id + '&host=' + provider;
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://www.cuevana.tv/player/source_get',
		data: post_data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		onload: function(responseDetails) {
			// check if it's all ok
			if (responseDetails.status != 200)
				return;

			// Check if the length is not stupid...
			// @todo check if it's valid
			if (responseDetails.responseText.length > 256)
				return;
			
			addDownloadLink(provider, responseDetails.responseText);
		}
	});
}
////////////////////////////////////////////////////////



////////////////////////////////////////////////////////
// Executed code

createDownloadDiv();

// some base paths
var base_path_sub_pre  = '/files/sub/';
var base_path_sub_post = '_ES.srt';
var base_path_movie_pre  = 'http://www.cuevana.tv/player/source?id=';
var base_path_movie_post = '&subs=,ES&onstart=yes&sub_pre=ES';

// get movie id
var movieID = getMovieID();

// check if it's a number
if (isNaN(movieID)) {
	return;
}

// add submenu link to download subtitles	
addToDownloadDiv("Download Subtitles Spanish", base_path_sub_pre + movieID + base_path_sub_post);

// check if it's available the function that enable
// us to get movie url
if (!GM_xmlhttpRequest) {
    return;
}

getDownloadCodes();
////////////////////////////////////////////////////////
