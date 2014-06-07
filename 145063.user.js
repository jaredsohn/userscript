// ==UserScript==
// @name				Zinio Magazine Viewer
// @author			ScienceOrArt
// @namespace   http://userscripts.org/users/484085
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js 
// @description	Adds ability to view the large thumbnails for any magazine at zinio.com
// @include			http://*.zinio.com/*
// @match				http://*.zinio.com/*
// @version			1.0.2
// ==/UserScript==

function UrlExists(url)
{
	var exists = false;
	$.ajax({
		url: url,
		success: function(data){
			if (data.search(/not found/i) == -1)
			{
				exists = true;
			}
		},
		async: false
	});
  return exists;
}

function GetUrl(a,b,c,pageNumber)
{
	var urlTemplate = "http://secure.zinio.com/repository/%a%/%b%/%b%.%c%/express/page%pagenumber%_350.jpg";
	return urlTemplate.replace('%a%',a).replace(/%b%/g,b).replace('%c%',c).replace('%pagenumber%',pageNumber);
}

//Source: http://papermashup.com/read-url-get-variables-withjavascript/
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

if (window.location.href.match(/secure\.zinio\.com/i))
{
	$('head').append('<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script>');
	$('head').append('<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min.js"></script>');
  $('head').append('<link rel="stylesheet" type="text/css" href="	http://code.jquery.com/ui/jquery-ui-git.css" />');

	a = getUrlVars()["a"];
	b = getUrlVars()["b"];

	var c=0;
	for (i=0;i<=10;i++)
	{
		if (UrlExists(GetUrl(a,b,i,0)))
		{
			c=i;
			break;
		}
	}

	for(pageNumber=0;pageNumber<=500;pageNumber++)
	{
		if (UrlExists(GetUrl(a,b,c,pageNumber)))
		{
			$(document.body).append('<img src="' + GetUrl(a,b,c,pageNumber) + '" /><br />');
		}
		else
		{
			break;
		}
	}
	$('body').append('<script type="text/javascript">$( "img" ).draggable({ snap: true });</script>');
	$('body').prepend('<button onclick="$(function() {$( \'img\' ).draggable({ snap: true });});">Draggable</button><br/>');
}
else
{
	var regA = /(http[s]?:\/\/)imgs\.zinio\.com\/magimages\//i;
	var regB = /(http[s]?:\/\/)imgs\.zinio\.com\/magimages\/\d+\/\d+\//i;
	var reg2 = /\d+/i;

	$('a[href^="/browse/publications/index.jsp?"] img, a[href^="/browse/issues/index.jsp?"] img, a[onclick^="parent.location.href=\'/browse/publications/index.jsp?"] img').each(function(index) {
		var pub = $(this).attr('src');
		var href = 'http://secure.zinio.com/?a=' + reg2.exec(pub.replace(regA, '')) + '&b=' + reg2.exec(pub.replace(regB, ''));
		$(this).parent().wrap('<div style="position: relative" /></div>').parent().append('<div style="position: absolute; top: 0px; left: 0;"><a href="' + href + '">View</a></div>');
	});
}