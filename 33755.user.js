// ==UserScript==
// @name          Newzbin IMDB Ratings (number), descriptions and rate filtering (with saving)
// @description   Shows IMDB rating as number and descriptions. Its nzbstatus compatible and minimalistic. Based on http://userscripts.org/scripts/show/23675. Now also allows you to filter good and/or bad movies. Settings are also saved.
// @include       http*://*.newzbin2.es/*
// @version       4.0 added support for newzbin2.es
// ==/UserScript==

var script_version = "3.0";
var setting_LowRating = 6;
var setting_HighRating = 8;
var setting_visualizenl = 1;
var setting_showgerman = 0;
var settings_url= "http://imdb.decrypted.de";
var setting_updatenotify = 1;
var setting_updatepresent = 0;

var movies = document.evaluate(
   "//tbody[@class='odd' or @class='odd-new' or @class='even' or @class='even-new']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);


var imdbLinkRegex = new RegExp("http://[a-z.]+\.imdb\.com/[a-zA-Z0-9/+_-]+");
var titleRegex = new RegExp('<meta name="title" content="(.+)">');
//var ratingRegex = new RegExp("<b>([0-9]\.[0-9]+)(?=/10)");
var ratingRegex = new RegExp("<span class=\"rating-rating\">([0-9]\.[0-9]+)(<span>/10)");
var descRegex = new RegExp("name=\"description\" content=\"[^\.]+\.[^\.]+\.(.*?)/>");
var newzBinTitleRegex = new RegExp("^http[s]*:\/\/(v3|www)\.newzbin\.com\/browse\/post\/[0-9]+\/$");
var newzBinGroupRegex = new RegExp("<span style=");
var nlRegex = new RegExp("alt\.binaries\.nl");

function do_parsing() 
{
  for (var i = 0; i < movies.snapshotLength; i++)
  {
	movieBody = movies.snapshotItem(i);
	var imdbLink = movieBody.innerHTML.match(imdbLinkRegex);
	if (imdbLink) {
		if (setting_showgerman ==1) getGermanAddon(movieBody, imdbLink.toString());
		getRating(movieBody, imdbLink.toString());
        }
  }
}

function getsettings() {
   GM_xmlhttpRequest({
      method: 'GET',
      url: settings_url,
	  headers: {'Referer': script_version, Version: script_version, 'Accept': 'text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
      onload: function (responseDetails)
      {
         if (responseDetails.status == 200)
         {
	    var parser=new DOMParser();
	    var xmldoc=parser.parseFromString(responseDetails.responseText,"text/xml");
            var root = xmldoc.getElementsByTagName('root').item(0);
            for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
               var node = root.childNodes.item(iNode);
	       //alert ("setting_"+node.getAttribute("name")+"="+node.getAttribute("value")+";");
	       eval ("setting_"+node.getAttribute("name")+"=\""+node.getAttribute("value")+"\";");
            }
         }
         add_settings();
	 do_parsing();
	 check_update();
      }
   });
}

function ignore_updates() {
   GM_xmlhttpRequest({
      method: 'GET',
      url: settings_url,
	  headers: {'Referer': script_version, Version: script_version, IgnoreU: '1', 'Accept': 'text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
      onload: function (responseDetails)
      {
      }
   });
}

function check_update () {
  if (setting_updatenotify==1) {
	if (setting_updatepresent==1) {
		if (confirm("Update Present. Visit the Homepage? (Updates can be ignore with a setting there)")) {  
			document.location=settings_url+"/about.php";
		}
	}
  }
}

function getRating(movieBody, imdbLink)
{

   GM_xmlhttpRequest({
      method: 'GET',
      url: imdbLink,
	  headers: {'Referer': imdbLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
      onload: function (responseDetails)
      {
         if (responseDetails.status == 200)
         {

            var ratingMatch = responseDetails.responseText.match(ratingRegex);
	    var descMatch = responseDetails.responseText.match(descRegex);
	    var curLink;
	    var star = "";

	    if (descMatch)
	      description = descMatch[1].replace("href=\"/", "href=\"http://www.imdb.com/");

	    rating = 0;
	    isnl = 0;
            if (ratingMatch)
            {
            	rating = parseFloat(ratingMatch[1]);
                // we got our IMDB rating => insert it in the original page using an other regular expression
                var allLinks = movieBody.getElementsByTagName("a");
                for (var i = 0; i < allLinks.length; i++)
                {
                	curLink = allLinks[i];
                    if (newzBinTitleRegex.exec(curLink) != null)
                    {
			curLink.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + rating + "/10";
			curLink.title += "" + rating + "/10.0";			
                	break;
		    }
            	}
            }
	    if (rating < setting_LowRating)
	    {
    	        movieBody.style.opacity = "0.7";
	    }
	    if (rating >= setting_HighRating)
	    {
 		var alltd = movieBody.getElementsByTagName("td");
              	for (var i = 0; i < alltd.length; i++)
             	{     
                  curtd = alltd[i];
		  if (curtd.className="link") {
                     curtd.style.backgroundColor = "#FFCCCC";
		  }
      		} 
	    }

            if (setting_visualizenl==1) 
	      if (movieBody.innerHTML.match(nlRegex) != null) isnl=1;
	    if (isnl)
	    {
    	        movieBody.style.opacity = "0.3";
	    } 
            
            if (descMatch)
            {
                //add description for different layout
                //ugly but does the job
                var description = descMatch[1].replace("href=\"/", "href=\"http://www.imdb.com/");
                if (curLink)
                    curLink.title = curLink.title + " - " + description;
                
                var allLinks = movieBody.getElementsByTagName("td");
                for (var i = 0; i < allLinks.length; i++)
                {
                    curLink = allLinks[i];
                    if (newzBinGroupRegex.exec(curLink.innerHTML) != null)
                    { 
			curLink.innerHTML += "<span>" + description + "</span>";
                        break;
		    }
            	}
            }
         }
      }
   });
}

function getGermanAddon(movieBody, imdbLink)
{
   imdbLink = imdbLink.replace("www.imdb.com","www.imdb.de"); 
   GM_xmlhttpRequest({
      method: 'GET',
      url: imdbLink,
	  headers: {'Referer': imdbLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
      onload: function (responseDetails)
      {
         if (responseDetails.status == 200)
         {

            var titleMatch= responseDetails.responseText.match(titleRegex);
	    var curLink;
            if (titleMatch)
            {
            	var newtitle = titleMatch[1];
                var allLinks = movieBody.getElementsByTagName("a");
                for (var i = 0; i < allLinks.length; i++)
                {
                	curLink = allLinks[i];
                    if (newzBinTitleRegex.exec(curLink) != null)
                    {
			curLink.innerHTML += "&nbsp;&nbsp;(" + newtitle + ")";
			curLink.title += " (" + newtitle + ") ";			
                	break;
		    }
            	}
            }
         }
      }
   });
}

function add_settings()
{
  var trigger = document.createElement("div");
  trigger.style.background = "#fff";
  trigger.style.border= "1px solid #000";
  trigger.style.position = "fixed";
  trigger.style.top = "0";
  trigger.style.padding = "5px";
  trigger.style.right = "0";
  trigger.innerHTML = "imdb script settings show/hide";
  trigger.addEventListener("click", showHideSetRating, false);

  var popup = document.createElement("div");
  var tmpstr = "";
  tmpstr    += "<center><a href='"+settings_url+"/about.php'>About</a></center><br/><br/>";
  tmpstr    += "<form name='imdb_f_s' action='"+settings_url+"' method='post'>";
  tmpstr    += "Mark Movies as Good: <input size='5' type='text' name='HighRating' value='"+setting_HighRating+"'/><br/><br/>";
  tmpstr    += "Mark Movies as Bad: <input size='5' type='text' name='LowRating' value='"+setting_LowRating+"'/><br/><br/>";

  tmpstr    += "Mark NL Movies: YES <input type='radio' name='visualizenl' value='1' ";
  if (setting_visualizenl==1) tmpstr += " checked ";  
  tmpstr    += "'/>";
  tmpstr    += " NO <input type='radio' name='visualizenl' value='0' ";
  if (setting_visualizenl==0) tmpstr += " checked ";  
  tmpstr    += "'/><br/><br/>";

  tmpstr    += "Add German Information: YES <input type='radio' name='showgerman' value='1' ";
  if (setting_showgerman==1) tmpstr += " checked ";  
  tmpstr    += "'/>";
  tmpstr    += " NO <input type='radio' name='showgerman' value='0' ";
  if (setting_showgerman==0) tmpstr += " checked ";  
  tmpstr    += "'/><br/><br/>";

  tmpstr    += "<input name='loc' value='"+document.location+"' type='hidden'/>";
  tmpstr    += "<center><input value=' save settings ' type='submit'/></center>";
  tmpstr    += "</form>";
  popup.innerHTML = tmpstr;

  popup.style.background = "#fff";
  popup.style.border= "1px solid #000";
  popup.style.padding = "20px";
  popup.style.position = "fixed";
  popup.style.top = "45% ";
  popup.style.left = "45%";
  popup.style.display = "none";
  popup.id = "setLowRating";

  document.getElementById("newzbin").appendChild(popup);
  document.getElementById("newzbin").appendChild(trigger);
}

function showHideSetRating(){
 var popup = document.getElementById("setLowRating");
 if (popup.style.display == "none")  popup.style.display = "block"; else popup.style.display = "none";
}

//only activate the script if we found movies
var movies_present=0;
for (var i = 0; i < movies.snapshotLength; i++)
{
	movieBody = movies.snapshotItem(i);
	var imdbLink = movieBody.innerHTML.match(imdbLinkRegex);
	if (imdbLink) {
	  movies_present = 1;
	  break;
        }
}
if (movies_present) getsettings();
