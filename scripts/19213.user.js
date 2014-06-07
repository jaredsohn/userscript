// ==UserScript==
// @name          Newzbin V3 IMDB Ratings
// @description   Shows IMDB rating next to movie titles
// @include       http://v3.newzbin.com/browse/category/p/movies/*
// ==/UserScript==


// customization begins (these options allow to remove some entries from the listing)
var minRating = '0.0';
var removeUnrated = 0;
var removeImdbPageLoadFails = 0;
var removeNoImdbLink = 0;
// @TODO implement this
//var removeMPAARatings = [];
// IE: var removeMPAARatings = ['NC-17','R'];
// customization ends

var mpaa_logos = {"G": "data:image/gif;base64,R0lGODlhDQAMAIcAAAAAAAQEBAkJCQsLCw8PDxMTEyUlJSgoKCwsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzU1NTY2Njg4ODk5OTo6Ojs7Ozw8PD09PUJCQkREREZGRkdHR0lJSUxMTE1NTVRUVFdXV1xcXGNjY2pqamxsbG1tbXFxcXNzc3R0dHV1dXl5eYeHh5GRkZOTk5+fn6Ghoaqqqq2trbKysra2tri4uLu7u7y8vL+/v8HBwcPDw8/Pz9jY2OTk5OXl5ejo6PHx8fT09Pb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAP8ALAAAAAANAAwAAAikAAksSPBAQoUKEiA8SLCAAAIfQoocMVLEyBEiQXwgUDCExwgFIEp4sHDixxAFDYqkENCBRg8WAwzsCKIAwpEMAFwoUZLkhgwlQBJMQPIAgI0jM1agMAFDSAMKSA4AqGEExwcABWIIcSABCQMAP5W8AHABKIMHRUgEUKEjhwgAG4Am4MjDBIYPITRwaAHk5MOIFCsaGZIRgUCUESRMkBChgYKGAQEAOw==", "PG": "data:image/gif;base64,R0lGODlhFwAMAIcAAAAAAAICAgMDAwUFBQYGBgkJCQwMDA0NDQ8PDxYWFhcXFxoaGh8fHyEhISIiIikpKSoqKisrKy0tLS4uLi8vLzExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PUJCQkNDQ0VFRUtLS0xMTE1NTU5OTlFRUVVVVVZWVldXV1tbW1xcXF1dXV9fX2BgYGFhYWdnZ2hoaGxsbG5ubnJycnNzc3Z2dnt7e3x8fH19fYaGhoeHh4iIiIqKipKSkpaWlpeXl5iYmJqampycnJ6enqOjo6ysrK6urq+vr7CwsLGxsbOzs7S0tL29vb6+vsDAwMHBwcLCwsPDw8zMzM3NzdDQ0Nra2tzc3N3d3eXl5efn5+7u7vLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAP8ALAAAAAAXAAwAAAj/AA1EyLCBQ4cOHj5kmDCBgoYPIDpouMDwgQELXcqgUZPmzBk1aMaAEfPxjBk0acyM6WLBghkqLCR8mAGjAQopbLbIkNCiRgkQOb6QsVAhTJkUAGxwaRKCQA42MwaogMIFSAEIWcRUqACGjQ4ARNiI4QFABxsMAJawYYMGyhM2YLZ2/YHAw5EiIBZMYeMAwBUyTnrguJGEjFw2PQ54MIJkR5EybBIAsDImygkACpgY5srGR4Aha0OzYQCgylohAEaw+bI1zJcbAGh4WSP6hYAeWKa4AGACbgULZ5TEkCAhSBrRWmiIWNGCRAkhYoZiNPNRTRkw2LGTROMRDZoyKy0IFOTw4UMIDhQkMGyIgYMHiRYqGggIADs=","PG13":"data:image/gif;base64,R0lGODlhJgAMAIcAAAAAAAMDAwQEBAUFBQYGBgcHBwoKCgsLCwwMDA0NDQ4ODhAQEBERERMTExQUFBYWFhgYGB4eHh8fHyEhISIiIiMjIygoKCsrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkVFRUlJSUtLS0xMTE9PT1FRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVtbW15eXmVlZWZmZmdnZ2hoaGpqamtra21tbW9vb3V1dXl5eXt7e3x8fH19fX5+foCAgIGBgYKCgoODg4SEhIiIiImJiYuLi4yMjJCQkJSUlJWVlZubm52dnZ6enp+fn6KioqOjo6SkpKenp6ioqKmpqaurq6ysrK2trbGxsbOzs7W1tba2trm5uby8vL+/v8LCwsTExMbGxsfHx8nJycrKyszMzM7Ozs/Pz9DQ0NHR0dLS0tTU1NjY2NnZ2dvb297e3t/f3+Dg4OLi4uPj4+Xl5ebm5ujo6Onp6erq6uzs7O7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAP8ALAAAAAAmAAwAAAj/ABFgCDGCRIkSJk6E0KCBw4gTKEiI8MCwIsMPIjhk6BBCxAeGGBB4ICSp0iVLk0xWetToUSVLlCi9lNSoZk1HlSo5ajTJkqVKkR4V8uCBEpsbGVIM0TFhR5xMeGpkCALkxQoskjJpzSQoBww/lZhoIIHjS6ZIHjo8ihQDQBJBYT4gkFIpRwAhcgIJAWBj0NY+PwosyPMnihUpEEAYgtShg6NMRwCIyZSIiIAqkSoAqKM1kZk3mSDpEcTITQMGdybxyZRGQItMjxo/ygTlgIsuVzxYoMOIwQBEhsBAMYIEzp4YU7RKaMAZEx0eAGZMiq02UxMDLrhwUeIFU6IBBA4ZxjqjAcCIOYCIbNEawQHnTHKcrKBARlLjx08kb+2cAIAgrT8AwMR+3j2gwB2LKJKJJEsAAAUljUGiSBEAHKEIJls5IkMAXNihhgoALLFfI2AkIEAea2SBxhYyZNBGJB14UMkYPlzAgRYYboVHDy70sAMLOZRByVaGUFFDCn7U4UMIJ9BgxllEETIJJSdFYlNNLlUS009W2uRISZY48gglPwEllAcCkXDCCSmMsEEGFXEAAgkmlBBCBxYx5AEIIFDkgQgegYRAQAA7","R": "data:image/gif;base64,R0lGODlhDQAMAIcAAAAAAAEBAQUFBQ4ODg8PDxMTExQUFBgYGBoaGiAgICMjIyQkJCUlJScnJywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzU1NTg4ODk5OTs7Ozw8PD09PT4+PkJCQkNDQ0ZGRktLS0xMTE5OTlFRUVJSUlpaWmJiYmdnZ2xsbHJycnh4eHt7e3x8fIiIiJSUlKenp6ioqKurq62trbS0tMDAwMjIyNbW1tfX19vb2+Tk5Obm5ufn5+jo6Onp6evr6/T09PX19fb29vf39/j4+Pn5+fv7+/z8/P39/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAP8ALAAAAAANAAwAAAiiAAlQyKChoIYMFyZAiEBAAo8iR44UgWhkSBAeDiocYfGggYgPCza4ECJk4ZAZBgS4qFECQIYbQSA8AILEwQAaSGAAiLAjJoQfSCoEMBEjBYITSH5A+BkUwAgSB0DgSCoT6AQDMl4o6LAj6QMJQXIkKBCjSAsAHnQAiYDhCAoJDVT4sBGCwQoiFibwMBKRyA8gEIv0mDDAgoYNHDJMYFuwwoCAADs="};

var movies = document.evaluate(
   "//tbody[@class='odd']|//tbody[@class='odd-new']|//tbody[@class='even']|//tbody[@class='even-new']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);


for (var i = 0; i < movies.snapshotLength; i++)
{
   movieBody = movies.snapshotItem(i);
   var reLink = new RegExp("[^\"]*(http:\/\/[^\"]*imdb\.com\/title\/[^\"]*).*");
   var linkMatch = movieBody.innerHTML.match(reLink);
   if (linkMatch != null) {
      var imdbLink = linkMatch[1];
      getInfo(movieBody, imdbLink);
   }
   else
   {
      if (removeNoImdbLink)
      {
         // no imdb link => remove it from the list
         movieBody.parentNode.removeChild(movieBody);
      }
   }
}

function getInfo(movieBody, imdbLink)
{
   GM_xmlhttpRequest({
      method: 'GET',
      url: imdbLink,
      onload: function (responseDetails)
      {
         if (responseDetails.status == 200)
         {
            var reImbd = new RegExp("<b>([0-9]\.[0-9]/10)</b>");
	    var reMpaa = new RegExp("Rated (.*?) for (.*)","i");
	    var reCert = new RegExp(">USA:(.*?)<\/a>");
            var noteMatch = responseDetails.responseText.match(reImbd);
	    var mpaaMatch = responseDetails.responseText.match(reMpaa);

	    // Not all movies have MPAA data but they do have Certification Info
	    if (mpaaMatch == null)
	    {
		    mpaaMatch = responseDetails.responseText.match(reCert);
		    mpaaMatch[2] = 'N/A';
	    }

	    var mpaaNote;
	    if (mpaaMatch != null)
	    {
	       var img = eval('mpaa_logos.'+mpaaMatch[1].replace(/-/,"","g"));
	       mpaaNote = 'Rated ' +mpaaMatch[1];
	       var ratingLogo = new Image();
	       ratingLogo.src = img;
	       ratingLogo.setAttribute('title', 'Rated ' + mpaaMatch[1] + ' for ' + mpaaMatch[2]);
	       ratingLogo.setAttribute('alt', 'Rated ' + mpaaMatch[1] + ' for ' + mpaaMatch[2]);

	       // Find last TD
	       var tds = movieBody.getElementsByTagName("td");
	       var lastTd = tds[tds.length-1];
	       lastTd.appendChild(ratingLogo);
	    }
	    else
	    {
		    mpaaNote = 'MPAA Rating Unknown';
	    }
            if (noteMatch != null)
            {
               note = noteMatch[1];
               if (note >= minRating)
               {
                  // we got our IMDB rating => insert it in the original page using an other regular expression
                  var reTitle = new RegExp("^http:\/\/v3\.newzbin\.com\/browse\/post\/[0-9]+\/$");
                  var allLinks = movieBody.getElementsByTagName("a");
                  for (var i = 0; i < allLinks.length; i++)
                  {
                     var curLink = allLinks[i];
                     if (reTitle.exec(curLink) != null)
                     {
			// If you want the MPAA rating in the link uncomment next line
                        //curLink.textContent += " - " + note + ' ' + mpaaNote;
                        curLink.textContent += " - " + note;
                        break;
                     }
                  }
                }
                else
                {
                  // the movie is too bad => remove it from the list
                  movieBody.parentNode.removeChild(movieBody);
                }
            }
            else
            {
               if (removeUnrated)
               {
                  // no imdb rating => remove it from the list
                  movieBody.parentNode.removeChild(movieBody);
               }
            }
         }
         else
         {
            if (removeImdbPageLoadFails)
            {
               // imdb link did not work ...
               movieBody.parentNode.removeChild(movieBody);
            }
         }
      }
   });
}

