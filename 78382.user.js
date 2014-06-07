// ==UserScript==
// @name           Userscripts - Previewer V2
// @namespace      Userscripts - Previewer V2
// @include        http://userscripts.org/scripts/show/*
// @include        http://userscripts.org/scripts/admin/*
// @include        http://userscripts.org/scripts/review/*
// @include        http://userscripts.org/scripts/reviews/*
// @include        http://userscripts.org/scripts/discuss/*
// @include        http://userscripts.org/scripts/fans/*
// @include        http://userscripts.org/scripts/issues/*
// @include		   http://userscripts.org/scripts/versions/*
// @include		   http://userscripts.org/topics/*
// @include		   http://userscripts.org/reviews/*
// @include        *#GMPreview_*
// @include        *?GMPreviewContinue=*
// @exclude        

// ==/UserScript==

var googleLogo = "data:image/png;base64,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%3D%3D";
var searching = "data:image/gif;base64,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";
var tickImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAodJREFUeNqkk0tME0Ecxr/Z3b4ADZRqAqQ2hJJSmhAfxKjUqIlXLujJqAe96NGee+Bi4kE5edHIyRhOcsEY4sGDotGEgxEBCUQpTVqgD0262310dtaZlcL25MFJvs3M7P/37X+y8xHHcfA/QxEP8jwCyIRLLEgvCCb4bIwruleX5/oAB7NwnAJsvrIdODfKfw08Yzyo+DOJvkQ8FomGOwIdQdGfZqonNku59Fph/YrZMKf41lxLB034cODQ5MXUhaQCOUQtCtVSm+/a4t0DbdGuaPe7lfeTNd3dd02kvYLegOTPnB8aS1p1M6SqKgzDaNHLwWegeiN0Jn466Se+jGAODKgzMdgzEDdUI6RpGnRdb9GDgaxbNn98hpvQUCwcjQvGa3Au0h4J12o1mKbpSnSxvbuNO8Hr6Ky0I5/P4+bru1heWQYzWFgwXoNjMuSgbdv4fGkexUoRuZ0cYqQPZ7tGoSgKpjdf4FX5DRpSA4ZlBAXjNQC1KW73X8PS0hLmh2dwMjKCJyMPXfhteQGPC9NACK6oQl3mwKDhbJW1kpH9eh+yLMPn8+Hp0CP4FB/W6z9wbzML1sH4v4Ari5iGYLwdfNwuFatyWEb6+7j71aaurt8COrEPCxm1elUwXoPZ31uVDQlEJ30Ep75dduHUYho40gozZutmUd8QzIEBcwq2Rqcqn4qrDmU6iRGkvnA4hv1zC7EG1dXF6iqr21OCcWMgwkQIz0GMB2FUGpf65Yw/2R73J9rCcpcSFEX2L2pYa/WqtaptsJ8cXmRzyNlw2T0DcaW7uSLolXowjDSOIsXD5d42Hp4CdrGMFSygwHb4TomrzFnaNJA8J1X+kWCRRY2rzln2R4ABABpvPoBuuSpnAAAAAElFTkSuQmCC";
var loadingThumbnailImg = "data:image/png;base64,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%3D%3D";

var googleKeys = new Array();
googleKeys[0] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BSuWkgXNFs9ODZBmpD2MI4L63N08xTkWqmp44aYO-m_rLx6V_IJ1KYSjQ";
googleKeys[1] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BQTAKdeigGBgoBsbJ78Ec88CMQKbRRhnUDJljYk6nVROz7ocjyfInEdfw";
googleKeys[2] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BSL8gV_6Pz9VPdDX8ZmNkORT1NCMBRWGCXOEyzJIAKjkQkH9bqZUWFgCQ";
googleKeys[3] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BSX59-gjahmmNUX0GCeK_9kwuvxXxQWnzIBQSL2Mf_Q0QHxv31_buaM8A";
googleKeys[4] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BToTEYnD2XF39xiTUk5mK2LYVg0RhQETNmWxL7xKAPTD2Xe4dei6CnQ0w";
googleKeys[5] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BTaygQXBMBVFSfnPV4C1AUFsz80vRRloiTMAu3DLHmsIOxcyDd2iMy-nA";
googleKeys[6] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BT0BcuIk14Q-7GjuN4fgQG7DHJ5LRRG9quB39nFmwEbuZWDoOSjkvHAYA";
googleKeys[7] = "ABQIAAAA2_mp69xkXF8wYqsiUJjD3BSOQQ1c9OZmmLp2Molan2Owrh-xUxRUMLZeMKhaVrmmnpWoW8D1Dwq4hg";
//add more keys on here to reduce the amount of errors
//you can sign up for keys here:
//http://code.google.com/apis/ajaxsearch/signup.html

function randomGoogleKey() {
    return googleKeys[(Math.ceil(Math.random() * googleKeys.length - 1))];
}


function receiveGoogleURLResults(link) {
    var linkBak = link;
    var url = "";
    var linkSplit = link.split("*");

    for (e = 0; e < linkSplit.length; e++) {
        url += "inurl:\"" + linkSplit[e] + "\" ";
    }


    var googleLink = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + encodeURIComponent(url) + "&key=";

    addCompatibleLinks(googleLink, linkBak);

}

// Read a page's GET URL variables and return them as an associative array.


function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}





function getStringBetween(s, prefix, suffix) {
    var i = s.indexOf(prefix);
    if (i >= 0) {
        s = s.substring(i + prefix.length);
    }
    else {
        return '';
    }
    if (suffix) {
        i = s.indexOf(suffix);
        if (i >= 0) {
            s = s.substring(0, i);
        }
        else {
            return '';
        }
    }
    return s;
}

function AJAX($constructor) {
    if (!document.GM_xmlhttpRequest) return GM_xmlhttpRequest($constructor);
    else return new XHR($constructor);
}

function addPopularLinks(linkBakSplit) {
    var popularCSV = "http://www.yahoo.com,http://www.wikipedia.com,http://www.google.com,http://www.ask.com,http://www.runescape.com,http://www.userscripts.org,http://www.youtube.com,http://www.live.com,http://www.microsoft.com,http://www.bbc.co.uk,http://www.bing.com,http://www.myspace.com,http://www.msn.com";

    var popular = popularCSV.split(",");
    for (i = 0; i < popular.length; i++) {
        makeValidURL(popular[i], popular[i], "Popular Webpage", linkBakSplit, colourCodeInclude("*"));
    }
}

function addCompatibleLinks(url1, linkBak) {

    if (googleKeys.length == 0) {
        document.getElementById("links").innerHTML = "<span id='nolinks'>All <img style='position:relative; top:3px;' src='"+googleLogo+"'> AJAX Keys are invalid.<br/>You can either edit the script and add new ones, or <a style='color:#ff0101;' href='http://userscripts.org/messages/new?user_id=109606'>contact the developer of this script</a> and ask it to be updated with new keys.</span>";
        document.getElementById("links").style.backgroundColor = "#FBEFEF";
        document.getElementById("links").style.borderColor = "#F8E0E0";
        document.getElementById("links").style.color = "#DF0101";
        return;
    }

    var gooKey = randomGoogleKey();
    url1 += gooKey + "&GMPreviewContinue=" + getScriptID();
    //document.getElementById("links").innerHTML = "<span id='yeslinks'><h2>Below is a selection of pages that the script can be previewed on, courtesy of Google Search.<br />Click on a link to preview the script with that page.</h2></span>";
    GM_xmlhttpRequest({
        method: "GET",
        url: url1,
        onload: function (resp) {
            var response1 = JSON.parse(resp.responseText);

            var linkBakSplit = linkBak.split("*");

            if (linkBak.trim() == "*") {
                document.getElementById("links").innerHTML = "<span style='color:#000000;'>"+getScriptName()+" works on any page. Below are a selection of popular webpages to preview "+getScriptName()+" with.<br/>Click on a link to preview "+getScriptName()+" with a page.</span><hr style='width:700px;'/><ul></ul>";

                addPopularLinks(linkBakSplit);
                return;
            }

            if (linkBak.indexOf("*") == -1) {
                document.getElementById("links").innerHTML = "<span style='color:#000000;'>The following links have been found by a <img style='position:relative; top:3px;' src='"+googleLogo+"'> search and are compatible with "+getScriptName()+".<br/>Click on a link to preview "+getScriptName()+" with a page.</span><hr style='width:700px;'/><ul></ul>";
                makeValidURL(linkBak, linkBak, linkBakSplit, linkBak);
                return;
            }
            if (response1.responseStatus == "403" || response1.responseStatus == "400") {
                var idx = googleKeys.indexOf(gooKey); // Find the index
                if (idx != -1) {
                    googleKeys.splice(idx, 1); // Remove it if really found!
                }
                addCompatibleLinks(url1.split("&key=")[0] + "&key=", linkBak);
                return;
            }

            if (response1.responseData.results.length == 0 && document.getElementById("links").getElementsByTagName("li").length == 0) {
                document.getElementById("links").innerHTML = "<span id='nolinks'>The <img style='position:relative; top:3px;' src='"+googleLogo+"'> search returned no results. "+getScriptName()+" cannot be previewed.</span>";
                document.getElementById("links").style.backgroundColor = "#FBEFEF";
                document.getElementById("links").style.borderColor = "#F8E0E0";
                document.getElementById("links").style.color = "#DF0101";
            }

            if (response1.responseData.results.length > 0 && document.getElementById("links").getElementsByTagName("li").length == 0) {
                document.getElementById("links").innerHTML = "<span style='color:#000000;'>The following links have been found by a <img style='position:relative; top:3px;' src='"+googleLogo+"'> search and are compatible with "+getScriptName()+".<br/>Click on a link to preview "+getScriptName()+" with a page.</span><hr style='width:700px;'/><ul></ul>";
                document.getElementById("links").style.backgroundColor = "#ECF8E0";
                document.getElementById("links").style.borderColor = "#D0F5A9";
                document.getElementById("links").style.color = "#5FB404";
            }

            for (i = 0; i < response1.responseData.results.length; i++) {
                var currentURL = response1.responseData.results[i].unescapedUrl;
				var currentText = response1.responseData.results[i].titleNoFormatting;
				var currentExtra = response1.responseData.results[i].content;
                var counter = 0;
                for (e = 0; e < linkBakSplit.length; e++) {
                    if (currentURL.indexOf(linkBakSplit[e]) > -1) {
                        counter = counter + 1;
                    }
                }
                if (counter > 0) {
                    makeValidURL(currentURL, currentText,currentExtra, linkBakSplit, linkBak);
                }
            }

        }
    });
}

var delayThumbnail;
addStyle(".urlHL{background-color:yellow;}");

function highlightIncludes(text,linkBakSplit){
	/*for(a=0; a<linkBakSplit.length; a++){
		if(linkBakSplit[a] != null){
		text = text.replace(linkBakSplit[a],"<span class='urlHL'>"+linkBakSplit[a]+"</span>");
		}
	}*/
	return text;
}

function colourCodeInclude(include){
	include = include.replace(/\*/g, "<span style='color:red;'>*</span>");
	return include;
}
function makeValidURL(url, text,extra, linkBakSplit, obide) {
	obide = colourCodeInclude(obide);
    if (text.length > 120) {
        text = text.substr(0, 120) + "...";
    }
	
    if (extra.length > 120) {
        extra = extra.substr(0, 120) + "...";
    }
	
	var url2;
	url2 = highlightIncludes(url,linkBakSplit);
    if (text == null) {
        text = url;
    }

    if (url.indexOf("http://") != 0 && url.indexOf("https://") != 0) {
        url = "http://" + url;
    }

    var linkcolor, hovercolor, extraColor;
    linkcolor = "#243B0B";
    hovercolor = "#4B8A08";
	extraColor = "#5F5F5F";


	var newLI = document.createElement("li");
	newLI.style.cursor = "pointer";
	newLI.style.listStyleType = "none";
	newLI.innerHTML = "<table border=1 style='color:black; background-color:#ffffff;'>\
			<tr>\
			<td rowspan='2' class='thumb' style='width:120px; height:90px; background-image:url("+loadingThumbnailImg+"); background-repeat:no-repeat; background-position:center center;' ><img src='http://image.picoshot.com/thumbnail.php?url="+url+"'></td>\
			<td style='width:50px; background-color:#EEEEEE;' class='hd'>Link:</td><td class='link' style='color:#13005F;'>"+url+"</td>\
			</tr>\
			<tr>\
			<td style='background-color:#EEEEEE;' class='hd'>Obides by @include:</td><td class='obides'>"+obide+"</td>\
			</tr>\
		</table>";

	var oldUL = document.getElementById("links").getElementsByTagName("UL")[0];
	oldUL.appendChild(newLI);
	
	newLI.addEventListener('click', LIonClick, false);
	
	function LIonClick(event){
        window.open(url + "#GMPreview_" + getScriptID(),"_blank");

		getElementsByClassName("link",null,this)[0].innerHTML = "<span style='float:right;'><img style='position:relative; top:2px;' src='"+tickImg+"'> Loaded in another tab.</span>" + getElementsByClassName("link",null,this)[0].innerHTML;
		
		var headers = getElementsByClassName("hd",null,this);
		for(e=0; e<headers.length; e++){
			headers[e].style.backgroundColor = "#E0EFD1";
		}
		this.removeEventListener('click', LIonClick, false);
		this.removeEventListener('mouseover', LIonMouseOver, false);
		this.removeEventListener('mouseout', LIonMouseOut, false);
		this.style.cursor = "";
		this.getElementsByTagName("table")[0].style.backgroundColor = "#DFFFBF";
	}
	
	newLI.addEventListener('mouseover', LIonMouseOver, false);
	
	function LIonMouseOver(event){
        this.getElementsByTagName("table")[0].style.backgroundColor = "#FFF9DF";
		var headers = getElementsByClassName("hd",null,this);
		for(e=0; e<headers.length; e++){
			headers[e].style.backgroundColor = "#F6F8E0";
		}
	}

	newLI.addEventListener('mouseout', LIonMouseOut, false);
	
	function LIonMouseOut(event){
        this.getElementsByTagName("table")[0].style.backgroundColor = "#ffffff";
		var headers = getElementsByClassName("hd",null,this);
		for(e=0; e<headers.length; e++){
			headers[e].style.backgroundColor = "#EEEEEE";
		}
	}
	
}

function delayThumb(what, url) {
    what.parentNode.style.backgroundImage = "url('http://image.picoshot.com/thumbnail.php?url=" + url + "')";
}












/*
if(location.href.indexOf("?GMPreviewContinue=") > -1){
  var hash = getUrlVars();
  location.href = "http://userscripts.org/scripts/review/" + hash['GMPreviewContinue'] + "?preview";
} */


if (location.href.indexOf("userscripts.org/scripts/") > -1 || location.href.indexOf("userscripts.org/topics/") > -1) {
    drawPreviewButton();
}else if (location.href.indexOf("userscripts.org/reviews/") > -1 || location.href.indexOf("userscripts.org/topics/") > -1) {
    drawPreviewButton();
}

if (location.href.indexOf("#GMPreview_") > -1) {
    previewLoader(location.href.substr(location.href.indexOf("#GMPreview_") + 11));
}

if (location.href.indexOf("?preview") > -1) {
    clearStuff();
    getIncludeList();
}



function clearStuff() {
    document.getElementById("source").innerHTML = "<img style='position:relative; top:3px;' src='"+searching+"'> Receiving compatible links from <img style='position:relative; top:3px;' src='"+googleLogo+"'>...";
	document.getElementById("source").style.fontFamily = "Helvetica";
	document.getElementById("source").style.overflow = "hidden";
	document.getElementById("source").id = "links";
	
    if (getElementsByClassName("notice").length > 0) {
        for (i = 0; i < getElementsByClassName("notice").length; i++) {
            getElementsByClassName("notice")[i].style.display = "none";
        }
    }
    var h3s = document.getElementsByTagName("h3");
    for (i = 0; i < h3s.length; i++) {
        h3s[i].style.display = "none";
    }

    unsafeWindow.sh_highlightDocument = function () {}
}

function getScriptName(){
	var title = getElementsByClassName("title")[0];
    if(typeof title !== "undefined"){
		return "<b>"+title.innerHTML.replace(/(<([^>]+)>)/ig, "")+"</b>";
	}else{
		return "this script";
	}
}

function getScriptID() {
/*var title = getElementsByClassName("title")[0];

    if(typeof title.getElementsByTagName("a")[0].href !== "undefined"){ //for topic pages
        return title.getElementsByTagName("a")[0].href.replace(/[^0-9]/g, '');
    }else{*/
    //return document.location.href.replace(/[^0-9]/g, ''); //for everything else
    //}
	
	var current = document.getElementById("script-nav");
	var as = current.getElementsByTagName("a");
	for(o=0; o<as.length; o++){
		if(as[o].href.indexOf("/scripts/show/")>-1){
			return as[o].href.replace(/[^0-9]/g, '');
		}
	}
}

function getIncludeList() {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            handleIncludeList(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", "../source/" + getScriptID() + ".meta.js", true);
    xmlhttp.send();
}

function handleIncludeList(string) {

    var eachLine = string.split("\n");

	var count = 0;
    for (i = 0; i < eachLine.length; i++) {

        if (eachLine[i].indexOf("// @include") == 0) {
			count++;
            var link = eachLine[i].replace("// @include", "").trim();
            receiveGoogleURLResults(link);
        }
    }
	
	if(count == 0){
        document.getElementById("links").innerHTML = "<span id='nolinks'>"+getScriptName()+" doesn't seem to have any includes.. how very odd.</span>";
        document.getElementById("links").style.backgroundColor = "#FBEFEF";
        document.getElementById("links").style.borderColor = "#F8E0E0";
        document.getElementById("links").style.color = "#DF0101";
	}


}


function previewLoader(scriptID) {
	addFakeGMFunctions();
    addExternalStyle("http://userscripts.org/scripts/review/"+scriptID+"?format=txt");
    var body = document.getElementsByTagName("body")[0];

    var preview_header = document.createElement('div');
    preview_header.id = "previewHeader";
    preview_header.style.width = "280px";
    preview_header.style.height = "50px";
    preview_header.style.padding = "0px";
    preview_header.style.paddingLeft = "60px";
    preview_header.style.paddingTop = "25px";
    preview_header.style.margin = "0px";
    preview_header.style.backgroundColor = "#F5F4F5";
    preview_header.style.zIndex = "999";
    preview_header.style.position = "fixed";
    preview_header.style.top = "0px";
    preview_header.style.fontSize = "12pt";
    preview_header.style.fontFamily = "arial";
    preview_header.style.color = "#000";
    preview_header.style.borderBottom = "1px solid #000";
    preview_header.style.borderRight = "1px solid #000";
    preview_header.style.opacity = "0.9";
    preview_header.style.backgroundImage = "url('http://icons.iconarchive.com/icons/deleket/sleek-xp-basic/48/Preview-icon.png')";
    preview_header.style.backgroundRepeat = "no-repeat";
    preview_header.style.backgroundPosition = "10px center";
    preview_header.innerHTML = "This is a preview <a style='color:#000022; font-weight:normal;' href='http://userscripts.org/scripts/review/" + scriptID + "?preview'>Click here to go back.</a>"

    body.parentNode.insertBefore(preview_header, body);


}



function drawPreviewButton() {

    if (location.href.indexOf("?preview") > -1) {
        var current = getElementsByClassName("menu current")[0];
        current.className = "menu";

        current.innerHTML = "<a href='" + location.href.replace("?preview", "") + "'>" + current.innerHTML + "</a>";

    }

    var beforeBtn = findInsertButton();

    var preview_script = document.createElement('li');


    if (location.href.indexOf("?preview") > -1) {
        preview_script.className = "menu current";
        preview_script.innerHTML = "Preview";
    } else {
        preview_script.className = "menu";
        preview_script.innerHTML = "<a href='#' rel='nofollow'>Preview</a>";
    }

    preview_script.addEventListener('mouseup', function (event) {
        if (getScriptID() == 78382 || getScriptID() == 77992) {
            alert("You cannot preview the preview script.");
        } else {
            document.location.href = "http://userscripts.org/scripts/review/" + getScriptID() + "?preview";
        }
    }, true);

    beforeBtn.parentNode.insertBefore(preview_script, beforeBtn);


}

function findInsertButton() {
    var menuButtons = getElementsByClassName("menu");
    for (i = 0; i < menuButtons.length; i++) {
        if (menuButtons[i].innerHTML.indexOf("Reviews") > -1) {
            return menuButtons[i];
        }
    }

}


function addStyle(style) {
    var head = document.getElementsByTagName("HEAD")[0];
    var ele = head.appendChild(window.document.createElement('style'));
    ele.innerHTML = style;
    return ele;
}

function addFakeGMFunctions(){
	//fakes GM functions

	addScript("function GM_addStyle(style){\
			  var head = document.getElementsByTagName('HEAD')[0];\
			  var ele = window.document.createElement('style');\
			  ele.type = 'text/css';\
			  ele.innerHTML = style;\
			  head.appendChild(ele);\
			}");
			//fake GM_addStyle
  
	addScript("unsafeWindow = window;");
			//fake unsafe window
			
	addScript("function GM_log(str){\
			}");
			//fake GM_log
			
	addScript("function GM_openInTab(url){\
				window.open(url,'_blank');\
			}");
			//fake GM_openInTab
			
			
			
	addScript("var GM_values = new Array();\
			function GM_getValue(name){\
				for (i in GM_values){\
					if(i == name){\
					return GM_values[name];\
					}\
				}\
			}");
			//fake GM_getValue 
			
	addScript("function GM_setValue(name,val){\
				GM_values[name] = val;\
			}");
			//fake GM_setValue 
			
	addScript("function GM_deleteValue(name){\
                var idx = GM_values.indexOf(name);\
                if (idx != -1) {\
                    GM_values.splice(idx, 1);\
                }\
			}");
			//fake GM_deleteValue
			
			
	addScript("function GM_listValues(){\
				var retArr = new Array();\
				for (i in GM_values){\
					retArr.push(i);\
				}\
				return retArr;\
			}");
			//fake GM_listValues
			
	addScript("function GM_getResourceText(name){\
			}");
			//fake GM_getResourceText 
			
	addScript("function GM_getResourceURL(name){\
			}");
			//fake GM_getResourceURL 
			
	addScript("function GM_xmlhttpRequest(name){\
			}");
			//fake GM_xmlhttpRequest
			
	addScript("function GM_registerMenuCommand(caption,commandFunc,accelKey,accelModifiers,accessKey){\
			}");
			//fake GM_registerMenuCommand

}




function addScript(style){
  var head = document.getElementsByTagName("HEAD")[0];
  var ele = window.document.createElement('script');
  ele.type = "application/javascript";
  ele.innerHTML = style;
  head.appendChild(ele);
  //head.removeChild(ele);
}

function addExternalStyle(src) {
  
  var head = document.getElementsByTagName("HEAD")[0];
  var ele = window.document.createElement('script');
  ele.type = "application/javascript";
  ele.src = src;
  head.appendChild(ele);
  head.removeChild(ele);
  
  return;
}





function isUrl(url) {
    var RegExp = /^(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,4}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?$/;
    if (RegExp.test(url)) {
        return true;
    } else {
        return false;
    }
}



function getElementsByClassName(className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
                nodeName = (tag) ? new RegExp("\\b" + tag + "\\b", "i") : null,
                returnElements = [],
                current;
            for (var i = 0, il = elements.length; i < il; i += 1) {
                current = elements[i];
                if (!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    } else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = "",
                xhtmlNamespace = "http://www.w3.org/1999/xhtml",
                namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace) ? xhtmlNamespace : null,
                returnElements = [],
                elements, node;
            for (var j = 0, jl = classes.length; j < jl; j += 1) {
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    } else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
                classesToCheck = [],
                elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag),
                current, returnElements = [],
                match;
            for (var k = 0, kl = classes.length; k < kl; k += 1) {
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for (var l = 0, ll = elements.length; l < ll; l += 1) {
                current = elements[l];
                match = false;
                for (var m = 0, ml = classesToCheck.length; m < ml; m += 1) {
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
} /*   paste in your code and press Beautify button   */
