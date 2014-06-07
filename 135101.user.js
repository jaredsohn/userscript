// ==UserScript==
// @name          Video.de NZB-index Verlinkung
// @description   Auf video.de werden mit Hilfe dieses Scripts direkt unter DVD-Titeln Links zur Suche angezeigt
// @version 1.1
// @uso:version 1.1
// @include      http://*video.de/*
// ==/UserScript==

hm([]);

function getByClassTag(classn, tag){
	var objs = document.getElementsByTagName(tag);
	var arr = new Array();

	
	
	for (var i=0;i<objs.length;i++){
		if (objs[i].className==classn){
			arr.push(objs[i]);
		}
	}

	return arr;
}

function isIn(name,allNames){
    
    for (key in allNames){
        if (allNames[key] == name) 
            return true;
    }
    return false;
}

function hm(allNames){

	var elements = getByClassTag("passepartout","DIV");
	elements = elements.concat(getByClassTag("passepartout big","DIV"));
	
	for (var i=0;i<elements.length;i++){
	
        	var h_el1,h_el2;
        
        	//console.log("ra"+elements[i].parentNode.getElementsByTagName("h3")[0]);
			
			if ((h_el1=elements[i].parentNode.getElementsByTagName("h3")[0]) != undefined ||
               	(h_el2=elements[i].parentNode.getElementsByTagName("h4")[0]) != undefined   ){
			
                var real_el = (h_el1 != undefined) ? h_el1 : h_el2;
                var tagName = (h_el1 != undefined) ? "h5" : "h6";
				
                    
				var name = real_el.firstChild.innerHTML;
                    
                if ("generatedlink" == real_el.firstChild.className) continue;
                if (isIn(name, allNames)) continue;
				if (name==undefined) continue;
                    
				var link = "http://www.nzbindex.nl/search/?q="+convert(name)+"&age=&max=25&minage=&sort=agedesc&minsize=500&dq=&poster=&nfo=&more=1";
				
                var elementtoadd = document.createElement(tagName);
                    
				elementtoadd.innerHTML = "<a target=\"_blank\" class=\"generatedlink\" href=\""+link+"\">Bei NZB-Index suchen</a>";
				
				//real_el.parentNode.insertAfter(elementtoadd, real_el);
                    
                real_el.parentNode.insertBefore(elementtoadd, real_el.nextSibling);
                    
                allNames.push(name);
			
			}
			
	
			
				
				
	}
	window.setTimeout(function(){hm(allNames)},2000);
	
}

function convert(myString){

    //return myString.trim().replace(/,/g,"").replace(/\!/g,"").replace(/\./g," ").replace(/ä/g," ").replace(/ü/g," ").replace(/ö/g," ").replace(/Ä/g," ").replace(/Ü/g," ").replace(/Ö/g," ").replace(/ /g, "+");
    return myString.trim().replace(/[^A-Za-z0-9]/g, " ").replace(/  /g, " ").replace(/  /g, " ").replace(/  /g, " ").replace(/ /g, "+");
}