// ==UserScript==
// @name           Diamond Dynasty Show Uniform Numbers
// @namespace      http://baseballsimulator.com/
// @description View uniform numbers on player pages.
// @include        http://baseballsimulator.com/diamond-dynasty/*
// ==/UserScript==

var thisURL = document.URL;

thisURL = thisURL.substring(thisURL.lastIndexOf('/')+1);

var thisLetter = thisURL.substring(0,1);

var HIDDEN_DIV_ID = 'baseballsimulatorDiv';


GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.baseball-reference.com/players/' + thisLetter + '/' + thisURL + '.shtml',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var s = new String(details.responseText);

	if(s.indexOf('<div class="clear_both no_mobile margin_half">') == -1){

		uniform = '';
	}
	else
	{
	
	
	if(s.indexOf('<div class=uni_holder>') != -1){

		var s = s.substring(s.indexOf('<div class=uni_holder>') + 22, s.indexOf('<div class="clear_both no_mobile margin_half">'));
	}

	if(s.indexOf('<div class="uni_holder">') != -1){

		var s = s.substring(s.indexOf('<div class="uni_holder">') + 22, s.indexOf('<div class="clear_both no_mobile margin_half">'));
	}	

	   

	   patternString = "tip=";
	   var pattern = new RegExp(patternString, "g");

	    var uniform = '';

	   while((result = pattern.exec(s)) != null){	   

		uniform +=  '<div ' + s.substring(result.index,s.indexOf('</div>',result.index) + 6);
		
	   }

	   uniform = uniform.replace(/<div/g,'<td><div');
	   uniform = uniform.replace(/div>/g,'div></td>');

	   uniform = uniform.replace(/tip=/g,'title=');
	}

	
	var document = appendToDocument(uniform);
    }
});


function appendToDocument(html) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }

	html = '<table border="0" ><tr class="text12"><td><b>Uniforms:</b></td>' + html + '</tr></table>'
        div.innerHTML = html;


	var uniformLocation = document.evaluate("//a[@id='script1']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	uniformLocation = uniformLocation.snapshotItem(0);
	var myDiv = document.createElement('div');
	myDiv.innerHTML = div.innerHTML;
	uniformLocation.parentNode.replaceChild(myDiv, uniformLocation);

        return document;
}


