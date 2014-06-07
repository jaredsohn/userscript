// ==UserScript==
// @name			IMDB: Also works with...
// @description		Reveals a still active feature, "Also worked with", that that used to be linked on actor bio page yet seems to have disappeared.
// @namespace		http://www.imdb.com/
// @include			http://*imdb.com/*
// @version			1.2
// ==/UserScript==

/*
had to make a chage.
imdb started adding a query to the url.
*/

addEventListener( 'DOMContentLoaded', function(event)  
	{

	function log(m) {if ( window.console ) {console.log(m); }  }

	// parseUri 1.2.2
	// (c) Steven Levithan <stevenlevithan.com>
	// MIT License
	
	function parseUri (str) {
		var	o   = parseUri.options,
			m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i   = 14;
	
		while (i--) uri[o.key[i]] = m[i] || "";
	
		uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});
	
		return uri;
	};
	
	parseUri.options = {
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:   {
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	};

	function imdbMagic()
		{ 
		var	imdbMagic_url = parseUri(document.location),
			imdbMagic_x = document.getElementById("overview-top");
		var imdbMagic_u = "http://" + imdbMagic_url.authority + imdbMagic_url.directory;

		if (  /\/nm[0-9]+\//.test(imdbMagic_u)  &&  imdbMagic_x )
			{
				
			imdbMagic_head = document.getElementsByTagName('head')[0];
			imdbMagic_newCSS = document.createElement('style');
			imdbMagic_newCSS.type = "text/css";		
			
			imdbMagic_rulesText =	'a#workedWithA:hover { background-image:none;background-color:#F3CE00; }'
									+' a#workedWithA { font-size:16px; color:#000000; text-decoration:none;background-image: url(/images/SFbce02818410b74c641cd33cc68fcf6c2/wheel/gradient-bg.png); background-color:#F3CE00; border:1px solid #E6B800; padding:5px; border-radius:4px;}'
									+' #workedWith { margin:20px 0px; }';
			
			imdbMagic_rules = document.createTextNode(imdbMagic_rulesText);
				
			imdbMagic_newCSS.appendChild(imdbMagic_rules);
			imdbMagic_head.appendChild(imdbMagic_newCSS);
			
			var imdbMagic_newDiv = document.createElement('div');
    		imdbMagic_newDiv.id = 'workedWith';
			var imdbMagic_newHref =  document.createElement('a');
 			imdbMagic_newHref.id = "workedWithA";
 			imdbMagic_newHref.href = imdbMagic_u+"workedwith";
 			imdbMagic_hrefText = document.createTextNode("Worked with...");
 			imdbMagic_newHref.appendChild(imdbMagic_hrefText);
			imdbMagic_newDiv.appendChild(imdbMagic_newHref);
			imdbMagic_x.appendChild(imdbMagic_newDiv);
			}
		}
	
	imdbMagic();

	}, false
);
