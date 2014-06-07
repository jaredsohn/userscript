// ==UserScript==
// @name           4shared Download Helper
// @author         Ben Beadle
// @namespace      http://userscripts.org/scripts/show/61267
// @description    This script will automatically start the download process for all 4shared.com files.
// @version        2.4
// @include        http://*.4shared.com/*
// ==/UserScript==
//Create the variables used no matter what page the user is on.
var currentVersion = parseFloat(2.4); //The current version of 4shared Download Helper
var thisMessage = '';
var fileLocation = "http://userscripts.org/scripts/source/61267.user.js";
var docLocation = document.location.toString();
var location = getLocation(docLocation);

var myGM = {get: function (name, value){return GM_getValue(name, value);},set: function (name, value){GM_setValue(name, value);},remove: function (name){GM_deleteValue(name);},getAndRemove: function (name, value){var get = GM_getValue(name, value);GM_deleteValue(name);return get;}}

if (location == "")
{
    if (myGM.get("devMode", false)) alert("Page Unknown:\n" + docLocation);
	return;
}
else if(location == "lameframe")
{
	return;
}

//Save the last page
myGM.set("lastPage", docLocation);

//Message for new versions
var savedVersion = parseFloat(myGM.get("lastVersion", -1));
if (savedVersion != -1)
{

    if (savedVersion < currentVersion)
    {
        if (thisMessage != "") alert(thisMessage);
        myGM.set("lastVersion", currentVersion.toString());
    }
}
else
{
    myGM.set("lastVersion", currentVersion.toString());
}


if (location == "file" || location == "audio" || location == "document")
{
    //Create the variables only used on the "file" page
	if(document.getElementsByClassName("dbtn").length == 0)
	{
		if (myGM.get("devMode", false)) alert("dbtn is NULL");
        return;
	}
	
    var getUrl = document.getElementsByClassName("dbtn")[0].href;
	
    //Check for errors and execute accordingly
    if (docLocation.match("cau2=401w") || docLocation.match("401waitm"))
    { //The user tried to download the file, but must wait. Set forceWait to true and go to the url
        myGM.set("forceWait", true);
        document.location = getUrl;
    }
    else if (docLocation.match("err=no-sess") || docLocation.match("403tNull"))
    { //The user tried going to /get/ without going to /file/ so go back to the /get/
        document.location = getUrl;
    }
}
else if (location == "get")
{
    if (!document.getElementById("divDLStart") && document.getElementById("divDLStart").getElementsByTagName("a").length != 0)
    {
        if (myGM.get("devMode", false)) alert("divDLStart is NULL or no A tags found");
        return;
    }

    var div = document.getElementById("divDLStart"); //The download link div
	var href = document.getElementById("divDLStart").getElementsByTagName("a")[0].href;
    unsafeWindow.fcwait = function (){return;}
    var forceWait = myGM.getAndRemove("forceWait", false); //True if the user must wait for the countdown to end
    var horizRule = '<hr style="border: none; border-bottom: 1px dotted #333333; margin: 5px;" />';
    var circle = '<div class="wait_circle"><div id="secs" class="sec">' + unsafeWindow.c + '</div><div class="smald">Remaining</div></div>';
	var split = document.getElementsByClassName("blue xlargen")[0].innerHTML.split(".");
	var fileType = "";
	var title = "";
	for(var i = 0; i < split.length; i++)
	{
		if(i + 1 != split.length)
		{
			title += split[i];
		}
		else
		{
			fileType = split[i];
		}
	}
	
	if (document.getElementById("divDLWait")) document.getElementById("divDLWait").parentNode.removeChild(document.getElementById("divDLWait"));
	
	//Edit the divDLStart information
    div.style.display = "inline";
    div.setAttribute("style", "font-size: small");
    div.innerHTML = "Loading...";
	
	if(fileType == "mp3")
	{
		//Create the lyricsDiv and all element
		var lyricsDiv = document.createElement("div");
		lyricsDiv.id = "lyricsDiv";
		lyricsDiv.innerHTML = "";		
		document.getElementById("divDLStart").parentNode.appendChild(lyricsDiv);
		var input = document.createElement("input");
		input.id = "lyricsText";
		input.value = title.replace(/- /gmi,"");
		input.size = 60;
		document.getElementById("lyricsDiv").appendChild(input);
		var select = document.createElement("select");
		select.id = "lyricsSelect";
		select.innerHTML = '<option value="">Loading...</option>';
		document.getElementById("lyricsDiv").appendChild(select);
		var hr = document.createElement("hr");
		hr.setAttribute("style", "border: none; border-bottom: 1px dotted #333333; margin: 5px;");
		document.getElementById("divDLStart").parentNode.appendChild(hr);
		var lyricDiv = document.createElement("div");
		lyricDiv.id = "lyricsStatus";
		lyricDiv.setAttribute("style", "font-size: 20px;");
		document.getElementById("lyricsDiv").appendChild(lyricDiv);
		var textarea = document.createElement("textarea");
		textarea.id = "lyricsArea";
		textarea.setAttribute("style", "width: 95%; display: none; height: 400px;");
		document.getElementById("lyricsDiv").appendChild(textarea);
		var span = document.createElement("span");
		span.id = "lyricsSpan";
		span.setAttribute("style", "display: none;");
		span.innerHTML = 'Source: <a id="lyricsSource" target="_blank" href="#">SongMeanings.net</a>';
		document.getElementById("lyricsDiv").appendChild(span);
		

		function loadLyric()
		{
			document.getElementById("lyricsArea").value = "";
			document.getElementById("lyricsArea").style.display = "none";
			document.getElementById("lyricsSpan").style.display = "none";
			var lyricsSelect = document.getElementById("lyricsSelect");
			var url = lyricsSelect.options[lyricsSelect.selectedIndex].value;
			
			document.getElementById("lyricsText").innerHTML = "Loading lyrics for: " + lyricsSelect.options[lyricsSelect.selectedIndex].text;
			
			if(url != "")
			{
				GM_xmlhttpRequest(
				{
					method: "GET",
					url: url,
					headers: {
						'User-agent': 'Mozilla/5.0 (Compatible) GreaseMonkey',
						'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
						'Content-type': 'application/x-www-form-urlencoded'
					},
					data: '',
					onload: function (result)
					{
						//Code snippets taken from: http://userscripts.org/topics/56276
						function decodeHTML(text) {var array1 = [["&quot;", "\""], ["&#34;", "\""], ["&apos;", "'"], ["&#39;", "'"], ["&lt;", "<"], ["&#60;", "<"],
							["&gt;", ">"], ["&#62;", ">"], ["&nbsp;", " "], ["&#160;", " "], ["&amp;", "&"], ["&#38;", "&"]];for (var num1 = 0; num1 < array1.length; num1++)
							{text = text.replace(new RegExp(array1[num1][0], "gmi"), array1[num1][1]);}return text;}
						
						var titleRegExp = new RegExp(/<title>\s+SongMeanings\s+\|\s+Lyrics\s+\|\s+(.*)\s+<\/title>/gim);
						var lyricsRegExp = new RegExp(/<!-- end ringtones -->((?:.|\s)*?)<!--/gim);
						var titleMatch = titleRegExp.exec(result.responseText);
						var lyricsMatch = lyricsRegExp.exec(result.responseText);
						
						if (titleMatch && lyricsMatch) 
						{
							if (titleMatch.length!=1)
								titleMatch.shift();
							if (lyricsMatch.length!=1)
								lyricsMatch.shift();
							
							var titleText = titleMatch.join(" ").replace(/<br ?\/?>/gmi,"");
							var lyricsText = lyricsMatch.join(" ");
							
							if (result.responseText.match(/<\/pre>/gmi))
								lyricsText = lyricsText.replace(/\n/gmi,"<br/>").replace(/\r/gmi,"");
							lyricsText = lyricsText.replace(/<br ?\/?>/gmi,"").replace(/<br\/>(?:\s*<br\/>)+/gmi,"").replace(/^\s*(?:<br\/>\s*)+/gi,"").replace(/^\s+|\s+$/g,"");
							
							document.getElementById("lyricsText").innerHTML = titleText;
							document.getElementById("lyricsArea").value = lyricsText;
							document.getElementById("lyricsArea").style.display = "";
							document.getElementById("lyricsSource").href = this.url;
							document.getElementById("lyricsSpan").style.display = "";
						}
						else
						{
							document.getElementById("lyricsText").innerHTML = "There was an error parsing the lyrics.";
						}
					}
				});
			}
			else
			{
				document.getElementById("lyricsText").innerHTML = "Please select a title from above.";
			}
		}
		
		function loadList()
		{
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: "http://www.google.com/search?num=20&q=site%3Asongmeanings.net+" + encodeURIComponent(document.getElementById("lyricsText").value).replace(/%20/gmi,"+"),
				headers: {
					'User-agent': 'Mozilla/5.0 (Compatible) GreaseMonkey',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
					'Content-type': 'application/x-www-form-urlencoded'
				},
				data: '',
				onload: function (result)
				{
					//Code snippets taken from: http://userscripts.org/topics/56276
					function decodeHTML(text) {var array1 = [["&quot;", "\""], ["&#34;", "\""], ["&apos;", "'"], ["&#39;", "'"], ["&lt;", "<"], ["&#60;", "<"],
						["&gt;", ">"], ["&#62;", ">"], ["&nbsp;", " "], ["&#160;", " "], ["&amp;", "&"], ["&#38;", "&"]];for (var num1 = 0; num1 < array1.length; num1++)
						{text = text.replace(new RegExp(array1[num1][0], "gmi"), array1[num1][1]);}return text;}
					
					var listRegExp = new RegExp(/<a.*?href="(http:\/\/www.songmeanings.net.*?)".*?>(?:SongMeanings . lyrics . )(.*?)<\/a>/gim);
					var matchArray = new Array();
					var match = listRegExp.exec(result.responseText);
					var lyricSelect = document.getElementById("lyricsSelect");
					
					while(match)
					{
						matchArray.push([decodeHTML(match[1]), match[2].replace(/<\/?(b|em)>/gmi,"")]);
						match=listRegExp.exec(result.responseText);
					}
					
					if(matchArray.length != 0)
					{
						lyricSelect.options.length = 0;
						for(var i = 0; i < matchArray.length; i++)
						{
							lyricSelect.add(new Option(matchArray[i][1], matchArray[i][0]), null);
						}
						loadLyric();
					}
					else
					{
						lyricSelect.options[0].text = "No Results Where Found";
					}
				}
			});
		}
		
		document.getElementById("lyricsSelect").addEventListener("change", loadLyric, false);
		document.getElementById("lyricsText").addEventListener("keypress", function(e){if(e.keyCode==13)loadList();}, false);
		window.addEventListener("load", loadList, false);
	}
	
	unsafeWindow.c++;
	
    (function countdown()
    {
        if (document.getElementById("skipscreen"))
        {
            document.getElementById("divDLStart").innerHTML = horizRule + "It seems that you have SkipScreen installed.<br />I'll let SkipScreen take over.<br />" + horizRule;
            return;
        }

        unsafeWindow.c--;

        if (unsafeWindow.c <= 0)
        {
            document.getElementById("divDLStart").innerHTML = horizRule + '<a href="' + href + '">Download Now.</a><br />' + horizRule;
            document.title = "Ready For Download";
            window.location.href = href;
            return;
        }

        var minutes = 0;
        var seconds = unsafeWindow.c;

        while (seconds >= 60)
        {
            minutes++;
            seconds -= 60;
        }

        seconds += "";

        if (seconds.length == 1) seconds = "0" + seconds;

        var html = horizRule;

        if (forceWait)
        {
            html += circle;
        }
        else
        {
            html += circle + '<a href="' + href + '">Or Try Skipping The Timer.</a><br />';
        }

        html += horizRule;
        div.innerHTML = html;
        document.title = minutes + ":" + seconds + " Remaining.";
        document.getElementById("secs").innerHTML = minutes + ":" + seconds;

        setTimeout(countdown, 1000);
    })();
	
	var items = document.getElementsByClassName("rightColMargin");
	for(var i = 0; i < items.length; i++)
	{
		items[i].style.display = "none";
	}
}
else if(location == "search")
{
	if(document.getElementsByClassName("teaser").length != 0)
		document.getElementsByClassName("teaser")[0].parentNode.removeChild(document.getElementsByClassName("teaser")[0]);
	
	if(document.getElementsByClassName("bluegrdbg1").length != 0)
		document.getElementsByClassName("bluegrdbg1")[0].parentNode.removeChild(document.getElementsByClassName("bluegrdbg1")[0]);
	
	var elements = document.getElementsByClassName("fname");
	for(var i = 0; i < elements.length; i++)
	//for(var i = 0; i < 1; i++)
	{
		var split = elements[i].getElementsByTagName("a")[0].innerHTML.split(".");
		var type = split[split.length - 1];
		if(type == "mp3")
		{
			var href = elements[i].getElementsByTagName("a")[0].href;
			var id = Math.floor(Math.random()*1000);
			
			var div = document.createElement("div");
			div.id = id;
			div.innerHTML = "Loading Preview";
			div.setAttribute("style", "color: #000000");
			elements[i].appendChild(div);
			
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: href,
				id: id,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Content-type': 'application/x-www-form-urlencoded'
				},
				data: '',
				onload: function (result)
				{
					if(document.getElementById(this.id))
					{
						//var objectRegExp = new RegExp(/new SWFObject\((.*?)\);/);
						var paramsRegExp = new RegExp(/so.addParam\('flashvars', '(.*?)'\);/);
						var getRegExp = new RegExp(/<a href="(.*?)" class="dbtn" tabindex="1">/);
						
						var paramsExec = paramsRegExp.exec(result.responseText);
						if(paramsExec)
						{
							var getExec = getRegExp.exec(result.responseText);
							document.getElementById(this.id).innerHTML = '<embed width="470" height="20" flashvars="' + paramsExec[1] + '" wmode="opaque" allowfullscreen="false" allowscriptaccess="always" quality="high" style="" src="http://www.4shared.com/flash/player.swf?ver=9092" type="application/x-shockwave-flash"><br /><a href="' + (getExec?getExec[1]:this.url+'?err=no-sess') + '">Go Straight To Download Page</a>';
						}
						else
						{
							document.getElementById(this.id).innerHTML = "Error Loading Preview";
						}
					}
				}
			});
		}
	}
}

//Check to check for new version of the script
var date = getDate();
var lastCheck = myGM.get("versionCheck", 0);
if (date > lastCheck)
{
    myGM.set("versionCheck", date);
    GM_xmlhttpRequest(
    {
        method: "GET",
        url: fileLocation,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: '',
        onload: function (result)
        {
            var text = result.responseText;
            var lines = text.split("\n");
            var version = -1;

            for (var i = 0; i < lines.length; i++)
            {
                if (lines[i].match("@version"))
                {
                    version = lines[i].split(" ")[lines[i].split(" ").length - 1];
                    break;
                }
            }

            if (version > currentVersion)
            {
                //if(true) {
                alert('There is a new version of 4shared Download Helper. A popup will now ask\nfor you to install the new script. Once the countdown stops, click "Install"');
                document.location = fileLocation;
            }
        }
    });
}


/*if(myGM.get("showReviewTab", true))
{
	var div = document.createElement("div");
	var h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;
	
	div.style.cssText = 'display:block;position:absolute;margin:0px;padding:0px;font-size:18px;font-family:Arial;text-align:center;font-size:14px;font-weight:bold;color:#000000;background: #FFFFFF;border:1px solid #333333;z-index:100000;padding:25px';
	document.body.appendChild(div);
	//div.style.fontSize = scale ? (h * 0.06) + 'px' : '18px';
	//div.style.fontSize = (h * 0.06) + 'px';
	div.innerHTML = "Test";

	var y = window.pageYOffset ? window.pageYOffset : document.body.scrollLeft;
	var x = window.pageXOffset ? window.pageXOffset : document.body.scrollTop;
	var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;

	div.style.top = (y + (h * 0.40 - div.clientHeight / 2)) + 'px';
	duv.style.left = (x + (w / 2 - div.clientWidth / 2)) + 'px';
}*/

//Create the link style for the div
var style = document.createElement("style");
style.setAttribute("type", "text/css");
style.innerHTML = "#benbeadle a:link {color: #000;text-decoration: underline;}#benbeadle a:visited {text-decoration: underline;color: #000;}#benbeadle a:hover {text-decoration: none;color: #000;}#benbeadle a:active {text-decoration: underline;color: #000;}";
document.getElementsByTagName("head")[0].appendChild(style);

//This is the div that shows in the bottom left
var div = document.createElement("div");
div.setAttribute("style", "position: fixed;z-index: 999;bottom: 0px;left: 0px;background: #2B90C4;color: #185574;border: 1px solid #185574;text-align: left;font-size: 9px;font-family: verdana; font-weight: bold;");
div.setAttribute("id", "benbeadle");
div.innerHTML = '<p style="margin: 0;padding: 5px 10px; float: left;max-width: 97%;"><span id="contact-message">4shared Download Helper brought to you by <a href="http://userscripts.org/users/114018/scripts" target="_blank">Ben Beadle</a>. <a href="http://www.benbeadle.com/programming/greasemonkey/4shared/contact.php" target="_blank">Bugs/Comments</a>?</span></p></div>';
//document.body.appendChild(div);


//These are common functions used throughout the script

function parseData(data, prefix, suffix)
{
    function esc(s)
    {
        return s.replace(/([\W])/g, "\\$1");
    }
    var re = new RegExp(esc(prefix) + '([\\s\\S]*?)' + esc(suffix), "g");
    var found = data.match(re);
    //alert("Reg = " + re.toString() + "\nPrefixLength = " + prefix.length + "\nFound-Suffix = " + (found.toString().length - suffix.length));
    if (found)
    {
        for (var i = 0; i < found.length; i += 1)
        {
            found[i] = found[i].substring(prefix.length, found[i].length - suffix.length);
        }
    }
    return found;
}

function getLocation(docLocation)
{
    if (docLocation == "http://www.4shared.com/") return "home";
    else if (docLocation.match("4shared.com/file")) return "file";
    else if (docLocation.match("4shared.com/get")) return "get";
    else if (docLocation.match("4shared.com/audio")) return "audio";
    else if (docLocation.match("4shared.com/document")) return "document";
    else if (docLocation.match("4shared.com/main/frame")) return "lameframe";
    else if (docLocation.match("search.4shared.com")) return "search";
    return "";

}

function getDate()
{
    var date = new Date();
    var year = new String(date.getFullYear());
    var month = new String(date.getMonth() + 1);
    var day = new String(date.getDate());
    if (month.length == 1) month = "0" + month;
    if (day.length == 1) day = "0" + day;
    date = parseFloat(year + month + day);
    return date;
}

/*
Version History

2.4:
* Fixed bug that incorrectly loaded mp3 previews

2.3:
* Loads lyrics for mp3 files on the download page
* Removes right nav bar on download page
* Loads the mp3 preview while still on the search page

2.2:
* Fixed a couple bugs

2.1:
* Page which loads the script a second time removed
* Changed how script schecks for SkipScreen

2.0:
* Huge Facelift
*/