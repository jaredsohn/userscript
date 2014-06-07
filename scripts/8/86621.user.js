// Change these values for marking some websites in Google results:
//
var linksUnderTheSupervision = new Array(
'http://habrahabr.ru/',
'http://www.techcrunch.com/',
'http://en.wikipedia.org/'
);
//
// ==UserScript==
// @name          Tuned Google SERPs
// @namespace     tunedGoogleSERPs
// @description	  Script numbering websites in Google search results, marking websites
// @description	  which you had placed to "linksUnderTheSupervision" list, adding "Cached Text-only" link to snippets (from v.1.9 marking includs also flying markers, if marked website out of view, idea taken from Gmail)
// @description	  Also script adds new search operators, which you can use in queries:
// @description	  co:us - set your location (good if you want to check your site positions for country different than your current
// @description	  lang:en - set language of webpages in results
// @description	  loc:uk - set physical location of websites in results
// @description	  num:30 - set number of pages in results
// @description	
// @include       http*://www.google.*/search?*
// @include       http*://www.google.*/custom?*
// @include       http*://www.google.*/
// @version       1.9.3
// @source       http://with.in/
// @author       samlowry
// ==/UserScript==
 (function() {
	// If instant search has enabled
	if(document.getElementById('misspell')) return;
	
    var p_result = document.getElementById('res');
    if (!p_result) return;
    var i;

    //Create Array of All HTML Tags
    var allLiTags = p_result.getElementsByTagName("li");

    //Loop through all tags using a for loop
    for (i = 0; i < allLiTags.length; i++)
    {
        //if ( /\bg\b/.test(allLiTags[i].className)){alert(allLiTags[i].className)};
        //Get all tags with the specified class name.
        if (allLiTags[i].className == 'g' || allLiTags[i].className == 'g w0')
        {
            var h3 = allLiTags[i].getElementsByTagName('h3');
			if(!h3[0]) continue; // an bag!!!
            var match = allLiTags[i].innerHTML.match(/return (?:rwt|clk)\(this(?:\.href)?,'','','','(\d+)',/i);
            if (match)
            {
                var num = match[1];
                h3[0].innerHTML = num + '.&nbsp;' + h3[0].innerHTML;
            }
            for (var j = 0; j < linksUnderTheSupervision.length; j++)
            {
                var re = new RegExp('<a href=".*?' + linksUnderTheSupervision[j] + '.*?"\\s', 'i');
                if (re.test(h3[0].innerHTML))
                {
                    //Yes, this is on of links under supervision
                    h3[0].style.background = '#FCEBEB';
					// Marker
					var an= document.createElement('a');
					an.setAttribute('id', 'marker');
					an.setAttribute('txt', h3[0].textContent);
					an.setAttribute('name', 'item' + (match ? match[1] : (Math.floor(Math.random()*10000 + 100))));
					h3[0].insertBefore(an, h3[0].firstChild);
                    break;
                }
            }

            var allSpanTags = allLiTags[i].getElementsByTagName("span");
            for (var j = 0; j < allSpanTags.length; j++) {
                if (allSpanTags[j].className == 'gl')
                {
                    allSpanTags[j].innerHTML = allSpanTags[j].innerHTML.replace(
                    /<a href="(.*?search\?q=cache.*?)"(?:.*?)>(.*?)<\/a>/i,
                    '$& - <a href="$1&amp;strip=1">$2 Text-only</a>'
                    );
                }
            }

        }

    }

})();

// Markers
(function() {
// If instant search has enabled
if(document.getElementById('misspell')) return;

// If is set "site:"
str = document.getElementsByName("q");
if(str[0]) if(str[0].value.search(/(^|\s)site:/) >= 0) return;

var showMarkers = '\
\
	function getOffsetSum(elem) {\
		var top=0;\
		while(elem) {\
			top = top + parseInt(elem.offsetTop);\
			elem = elem.offsetParent;\
		}\
		return top;\
	}\
	var m_links = document.getElementById("res").getElementsByTagName("a");\
	var marker_array = [];\
	for(var i = 0; i < m_links.length; i++)\
		if(m_links[i].id == "marker")\
			marker_array.push(m_links[i]);\
	var block1 = document.getElementById("block1");\
	if(!block1) {\
		block1 = document.createElement("div");\
		block1.setAttribute("id", "block1");\
		block1.setAttribute("style", "top:0px; right:0px; position:fixed; background-color:orange; z-index:99;");\
		document.body.appendChild(block1);\
	}\
	var block2 = document.getElementById("block2");\
	if(!block2) {\
		block2 = document.createElement("div");\
		block2.setAttribute("id", "block2");\
		block2.setAttribute("style", "bottom:0px; right:0px; position:fixed; background-color:orange; z-index:99;");\
		document.body.appendChild(block2);\
	}\
\
	block1.innerHTML = "";\
	block2.innerHTML = "";\
	for(var i = 0; i < marker_array.length; i++) {\
		if(getOffsetSum(marker_array[i]) < window.scrollY) {\
			block1.innerHTML += "<a href=\'#"+marker_array[i].name+"\'>▲ "+marker_array[i].getAttribute(\'txt\')+"</a><br />";\
		} else if(getOffsetSum(marker_array[i]) > window.scrollY + window.innerHeight) {\
			block2.innerHTML += "<a href=\'#"+marker_array[i].name+"\'>▼ "+marker_array[i].getAttribute(\'txt\')+"</a><br />";\
		}\
	}\
';
document.body.setAttribute("onscroll", showMarkers);
eval(showMarkers);
})();

 (function() {
	// If instant search has enabled
	if(document.getElementById('misspell')) return;

    var searchButtonFunction = '\
		var q=this.q.value;\
		this.qq.value=this.q.value;\
		var queryWords=q.split(/\\s+/);\
		var operatorExp=/^(co|lang|loc|num):(.+)$/;\
		for (i=0; i<queryWords.length; i++)\
		{\
			if( operatorExp.test(queryWords[i])==true )\
			{\
				switch(RegExp.$1)\
				{\
					case "co":\
						var paramName="cr";\
						var paramValue="country"+RegExp.$2.toUpperCase();\
						break;\
					case "lang":\
						var paramName="lr";\
						var paramValue="lang_"+RegExp.$2.toLowerCase();\
						break;\
					case "loc":\
						var paramName="gl";\
						var paramValue=RegExp.$2.toLowerCase();\
						break;\
					case "num":\
						var paramName="num";\
						var paramValue=RegExp.$2;\
						break;\
					default:\
				}\
				var allInputs=this.getElementsByTagName("input");\
				var valueWasSet=0;\
				for (j=0; j<allInputs.length; j++)\
				{\
					if(allInputs[j].getAttribute("name")==paramName)\
					{\
						allInputs[j].setAttribute("value", paramValue);\
						valueWasSet=1;\
					}\
				}\
				if(!valueWasSet)\
				{\
					var input = document.createElement("input");\
					input.setAttribute("type", "hidden");\
					input.setAttribute("name", paramName);\
					input.setAttribute("value", paramValue);\
					this.appendChild(input);\
				}\
			queryWords[i]="";\
			}\
			this.q.value = queryWords.join(" ");\
		}\
	this.q.value = this.q.value.replace(\/^\\s+|\\s+$\/g, "");\
	';


    if (/(?:\?|&)qq=([^&]+)(?:&|$)/.test(document.location) == true)
    {
        var rawQQ = RegExp.$1;
        var qq = unescape(decodeURI(RegExp.$1.replace(/\+/g, ' ')));
    }

    var allForms = document.getElementsByTagName("form");
    for (i = 0; i < allForms.length; i++)
    {
        allForms[i].setAttribute('onsubmit', searchButtonFunction);
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "qq");
        allForms[i].appendChild(input);
        if (qq) {
            allForms[i].elements.namedItem("qq").setAttribute('value', qq);
            allForms[i].elements.namedItem("q").setAttribute('value', qq);
        }
    }

    if (rawQQ) {
        var paginatorBlock = document.getElementById('nav');
        var paginatorLinks = paginatorBlock.getElementsByTagName("a");
        for (i = 0; i < paginatorLinks.length; i++) {
            //alert(paginatorLinks[i]);
            paginatorLinks[i].setAttribute('href', paginatorLinks[i].href + "&qq=" + rawQQ);
        }
    }


})();

// set fucus on search field
try {
	document.getElementsByName("q")[0].focus();
}
catch (e) {};
