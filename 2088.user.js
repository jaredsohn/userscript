/*  
adds a link to the sourceforge project homepage

[H] links to http://projectname.sourceforge.net 
By default SourceForge only links to http://sourceforge.net/projects/projectname

*/

// ==UserScript==
// @name        	SF Homepage
// @description 	Adds a link to a sourceforge project homepage
// @include 	http://sourceforge.net/new/*
// ==/UserScript==

// no warranty at all 
// just messing around with this

// i know the most active and top downloads section doesn't work with this

		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; ++i)
		{
			var linkNode = links[i];
			
			if(linkNode.href.match('/projects/*')){
				var result = linkNode.href;
				 
				// split the url
				var array = result.split("/");
				var project = array[array.length-1];
				
				if(project != ""){
					// make link to project homepage
					var hp = document.createElement('A');
					hp.setAttribute('href', 'http://'+ project + '.sourceforge.net/');
					hp.appendChild(document.createTextNode(' [H]'));
			
					// not sure if this is the best way to do it
					linkNode.parentNode.insertBefore(hp, linkNode.nextSibling);
					//linkNode.parentNode.appendChild(hp); // not good
				}
			}
		}		
			
			

