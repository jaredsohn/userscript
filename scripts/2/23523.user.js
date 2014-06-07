// ==UserScript==
// @name           Spark Print
// @namespace      http:/klupar.com
// @include        *sparknotes*
// @version        2.0
// ==/UserScript==

var loc = window.location.href;

if  ((loc.search('ad') == -1) && (loc.search('character') != -1 || loc.search('section') != -1 || loc.search('analysis') != -1 || loc.search('summary') != -1)){

	if (loc.search('section') != -1){
		var text = document.getElementById('section').innerHTML;
		document.write("");
	}
	if (loc.search('analysis') != -1){
		var text = document.getElementById('analysis').innerHTML;
		text = text.replace(/<div class="body_text">/g,'∆')
	}
	if (loc.search('character') != -1){		
		var text = document.getElementById('characterlist').innerHTML;
		text = text.replace(/<div class="body_text">/g,'∆')
	}
	if (loc.search('summary') != -1){		
		var text = document.getElementById('plotoverview').innerHTML;
		text = text.replace(/<div class="body_text">/g,'∆')
	}
	
	var lastb = 0;
	var laste = 0;
	
	//remove all code
	while (text.lastIndexOf('<') >= 0){
		//iframe excption
		lastb = text.lastIndexOf('<iframe');
		if (lastb != -1){
			laste = text.lastIndexOf('</iframe>')+9;
			text = text.replace(text.substring(lastb,laste),'');
		}

		lastb = text.lastIndexOf('<');
		if (lastb != -1){
			laste = text.lastIndexOf('>')+1;
			text = text.replace(text.substring(lastb,laste),'');
		}
	}
	if (loc.search('analysis') != -1 || loc.search('character') != -1 || loc.search('summary') != -1){
		if (loc.search('summary') != -1){
			text = text.replace(/Plot Overview/g,'<b>Plot Overview</b>');
		}
		text = text.replace(/∆/g,'<br /> <br />');
	}else{
		if (confirm("For "+loc.substring(loc.indexOf("section"),loc.indexOf("section")+9)+":\nDo you want Both Summary and Analysis?") == false){
			if (confirm("For "+loc.substring(loc.indexOf("section"),loc.indexOf("section")+9)+":\nDo you want Only Summary?") == true){
				text = text.replace(text.substring(text.lastIndexOf("Analysis:"),text.lastIndexOf(".")+1),'');
			}else{
				text = text.replace(text.substring(text.indexOf("Summary:"),text.lastIndexOf("Analysis:")),'');
			}
		}
		text = text.replace(/Chapter/g,'<br />Chapter');
		text = text.replace(/Analysis:/g,'<br /><b>Analysis:</b>');
		text = text.replace(/Summary:/g,'<br /><b>Summary:</b>');
		text = text.replace('Commentary:','<br /><br /><b>Commentary:</b><br />');
	}
	document.write(text);
	setTimeout("window.print();",5000);
	setTimeout("window.close();",5000);
	
}else if (loc.search('ad') != -1 ){
}else{

	if (confirm("Do you want to print all pages") == true){
		windows("summary");
		windows("section");
		windows("character");
		windows("analysis");
	}else{
		if (confirm("Do you want to chapters/acts/sections pages") == true){
			windows("section");
			windows("chapter");
		}
		if (confirm("Do you want to print character discription page") == true){
			windows("characters");
			windows("canalysis");
		}
		if (confirm("Do you want to print summary/analysis pages") == true){
			windows("summary");
			windows("analysis");
		}
	}
}


function windows(s){
	
	var chaps = document.getElementsByTagName('a');

	for(var i=0; i<chaps.length;i++){
		
		if(chaps[i].href.search(s) != -1){
				window.open(chaps[i]);
		}
	}
}