// ==UserScript==
// @name           eRDF
// @namespace      http://semwebdev.keithalexander.co.uk/greasemonkey/
// @description    detects eRDF and inserts Exhibit
// @include        ^.*$
// ==/UserScript==

if(document.getElementsByTagName('head')[0].getAttribute('profile')){
	if(document.getElementsByTagName('head')[0].getAttribute('profile').match('http://purl.org/NET/erdf/profile'))
	{
	
			make_div(" this page contains eRDF ");
	}
}
GM_registerMenuCommand("eRDF to RDF/XML", parse_erdf , "r","control shift", "r");


function parse_erdf()
{
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://research.talis.com/2005/erdf/extract?uri='+location.href,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/rdf+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	         var show = window.open();
			show.document.write('<pre style="font-size:105%;font-family:monaco,monospace">'+responseDetails.responseText.htmlEntities()+'</pre>');
			// show.document.write('Request for RDF returned ' + responseDetails.status +
			//               ' ' + responseDetails.statusText + '\n\n' +
			//               'RDF data:\n' + responseDetails.responseText);
			 show.document.close();
	    }
	});
}

function make_div(text)
{
	var div = document.createElement('div');
	div.innerHTML=text;
	div.style.position = 'absolute !important';
	div.style.padding = '2em';
	div.style.right = 0;
	div.style.background = '#000';
	div.style.color = '#fff';
	div.style.border = '3px dotted #fff';
	div.style.opacity = '0.9';
	div.style.MozBorderRadius = '1em';
	div.style.zIndex = '999999999';

	var removeMeLink = document.createElement('a');
	removeMeLink.innerHTML = ' (Close)';
	removeMeLink.addEventListener('click', function(event){ event.target.parentNode.parentNode.removeChild(event.target.parentNode) 
		}, true
	);
	div.appendChild(removeMeLink);
	
	var parseRDFLink = document.createElement('a');
	parseRDFLink.innerHTML = '<p style="padding:0.5em; margin:0.1em"> (show RDF) </p> ';
	parseRDFLink.addEventListener('click', function(event){ 
		parse_erdf();
		}, true
	);
	div.appendChild(parseRDFLink);
	document.getElementsByTagName('body')[0].insertBefore(div,	document.getElementsByTagName('body')[0].firstChild);
}

String.prototype.htmlEntities = function()
{
  var chars = new Array ('<','>');

  var entities = new Array ('&lt;','&gt;');

  newString = this;
  for (var i = 0; i < chars.length; i++)
  {
    myRegExp = new RegExp();
    myRegExp.compile(chars[i],'g')
    newString = newString.replace (myRegExp,  entities[i]);
  }
  return newString;
}

