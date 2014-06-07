// ==UserScript==
// @name           Show Imgur Images Button
// @namespace      http://freexe.co.uk/userscripts/show_images
// @description    Shows Imgur Images on linked pictures in the current page
// @version	   1.4
// @include        http://www.reddit.com/*
// @exclude        http://www.reddit.com/ads/*
// ==/UserScript==
//


//	


(function() {

	var header = document.getElementById('header-bottom-left');
	var uls = header.getElementsByTagName('ul');
	var function_string = "function show_images(find_string, gonewild){var gonewild = gonewild || '';var x= $(\".content\").find(find_string).each(function(){var re = new RegExp(\"[^a-zA-Z]\"+gonewild+\"[^a-zA-Z]\",\"i\");var href=$(this).attr(\"href\");var title_text=$(this).text();if((!$(this).hasClass(\"drowsapMorphed\")) && ($(this).next(\".drowsapMorphed\").length==0) && href && (gonewild =='' || title_text.match(re)) &&(href.indexOf('imgur.')>=0 || href.indexOf('.jpeg')>=0 || href.indexOf('.jpg')>=0 || href.indexOf('.gif')>=0)){var ext =(href.indexOf('imgur.')>=0 && href.indexOf('.jpg')<0 && href.indexOf('.png')<0 && href.indexOf('.gif')<0) ? '.jpg' :''; var img = $(\"<a class='drowsapMorphed' href='\"+href+\"' onclick='window.open(this.href);return false;' style='display:block'><img style='display:block;max-width:720px;' src='\"+href+ ext+\"' /></a>\");$(this).after(img);}});};";
	

	for (var i = 0; i < uls.length; i++) {
		if(uls[i].className=='tabmenu ') {		
			var li = document.createElement('li');
			var a = document.createElement('a');
			var text = document.createTextNode('view images');

			//Based on drowsaps (from reddit.com) script
			//var javascript = "javascript: var x= $(\".content\").find(\"#siteTable div.entry p.title a.title\").each(function(){var href=$(this).attr(\"href\");if((!$(this).hasClass(\"drowsapMorphed\")) && ($(this).next(\".drowsapMorphed\").length==0) && href && (href.indexOf('imgur')>=0 || href.indexOf('jpeg')>=0 || href.indexOf('jpg')>=0  || href.indexOf('png')>=0)){var ext =(href.indexOf('imgur')>=0 && href.indexOf('jpg')<0 && href.indexOf('png')<0) ? '.jpg' :''; var img = $(\"<a class='drowsapMorphed' href='\"+href+\"' onclick='window.open(this.href);return false;' style='display:block'><img style='display:block;max-width:720px;' src='\"+href+ ext+\"' /></a>\");$(this).after(img);}});";
			var javascript = "javascript: "+function_string+" show_images(\"#siteTable div.entry p.title a.title\");show_images(\".usertext-body a\");";			

			a.setAttribute('href',javascript);
			a.appendChild(text);
			li.appendChild(a);
			uls[i].appendChild(li);

			if(window.location.href.indexOf('gonewild')>=0){

				var li = document.createElement('li');
				var a = document.createElement('a');
				var text = document.createTextNode('[m]');
				var javascript = "javascript: "+function_string+" show_images(\"#siteTable div.entry p.title a.title\",\"m\");";			


				a.setAttribute('href',javascript);
				a.appendChild(text);
				li.appendChild(a);
				uls[i].appendChild(li);

				var li = document.createElement('li');
				var a = document.createElement('a');
				var text = document.createTextNode('[f]');
				var javascript = "javascript: "+function_string+" show_images(\"#siteTable div.entry p.title a.title\",\"f\");";			

				a.setAttribute('href',javascript);
				a.appendChild(text);
				li.appendChild(a);
				uls[i].appendChild(li);
			}

		}
	}
})();
