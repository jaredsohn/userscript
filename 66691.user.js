// ==UserScript==
// @name           MS IMDb Info
// @namespace      http://sferris.net/
// @description    Downloads info from IMDb and displays it on torrent pages with IMDb links.
// @include        https://www.midnight-scene.com/details.php?*

// ==/UserScript==

GM_addStyle("#imdbTable { width: 600px; margin: 10px auto; } .imdbHeading { font-weight: bold; padding: 5px; width: 100px; vertical-align: top; text-align: center; } .imdbValue { padding: 

5px; }")

var tds = document.getElementsByTagName("td")
for(var i=0; i<tds.length; i++)
{
if(tds[i].innerHTML == "Description")
	{
var link = tds[i].nextSibling.innerHTML.match(/(?:http:\/\/)?(?:[a-z\.]{0,6})?imdb.com\/title\/tt[0-9]{7}(?:\/)?/i)
if(link !== null)
		{
link = link[0]
if(link.indexOf("http://") != 0)
	link = "http://"+link
newRow = tds[i].parentNode.parentNode.insertRow(-1)
var newCell = newRow.insertCell(0)
newCell.innerHTML = "IMDb Info"
newCell.className = "heading"
newCell.style.textAlign = "right"
newCell.style.verticalAlign = "top"
newCell.title = link

var newCell = newRow.insertCell(1)
newCell.innerHTML = "Loading data from IMDb..."
newCell.id = "imdbInfo"

GM_xmlhttpRequest({
method: "GET",
url: link,
onload: function(req)
			{
document.getElementById("imdbInfo").innerHTML = "There was an error gathering data."
function xpath(path)
				{
return document.evaluate(path, imdb, null, XPathResult.STRING_TYPE, null).stringValue
				}
function xpath2(path)
				{
return document.evaluate(path, imdb, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)
				}
function addRow(title)
				{
info += "<tr><td class=\"imdbHeading\">"+title+":</td><td class=\"imdbValue\">"
				}
function killRow()
				{
info += "</td></tr>"
				}

var imdb = document.createElement("div")
var t = req.responseText.replace(/[\r\n\t]/g, "")
t = t.substr(t.indexOf("<div id=\"wrapper\">"))
t = t.substr(0, t.indexOf("<!-- id=\"wrapper\" -->"))
t = t.replace(/<script.*?<\/script>/g, "")
t = t.replace(/<!--.*?-->/g, "")
t = t.replace(/ onclick=".*?"/g, "")
imdb.innerHTML = t
var info = "<table border=\"1\" cellpadding=\"2\" cellspacing=\"2\" id=\"imdbTable\">"
var extraCont = xpath2("//div[@class='info']")
var extraContA = []

while(curNode = extraCont.iterateNext())
				{
var curT = curNode.textContent
if(curT.indexOf(":") > 0)
	extraContA[curT.substr(0, curT.indexOf(":")).replace(/ /g, "").toLowerCase()] = curT.substr(curT.indexOf(":")+1)
				}


addRow("Title")
var title = xpath("//div[@id='tn15title']/h1/text()")
info += title
killRow()

addRow("Year")
var year = xpath("//div[@id='tn15title']/h1/span/a")
info += year
killRow()

addRow("Rating")
var rating = xpath("//div[@class='starbar-meta']/b")
var votes = xpath("//div[@class='starbar-meta']/a")
info += rating ? rating+" ("+votes+")" : "No rating available."
killRow()

addRow("Genre")
var genre = extraContA['genre']
if(genre)
				{
genre = genre.indexOf(" more") == genre.length-5 ? genre.substr(0, genre.length-5) : genre
genre = genre.replace(/ \| /g, ", ")
				}
info += genre ? genre : "No genre available."
killRow()

addRow("Tagline")
var tagline = extraContA['tagline']
if(tagline)
	tagline = tagline.indexOf(" more") == tagline.length-5 ? tagline.substr(0, tagline.length-5) : tagline
info += tagline ? tagline : "No tagline available."
killRow()

addRow("Plot")
var plot = extraContA['plot']
if(plot)
	plot = plot.replace(/(more)?((full|add) summary)?[\| ]{0,5}((full|add) synopsis)?$/, "")
info += plot ? plot : "No plot available."
killRow()

addRow("Director")
var director = xpath("//div[@id='director-info']/div/a")
info += director ? director : "No director available."
killRow()

addRow("Country")
var country = extraContA['country']
if(country)
	country = country.replace(/ \| /g, ", ")
info += country ? country : "No country available."
killRow()

addRow("Cast")
var cast = []
while(cast.length < 10)
				{
var curCast = xpath("//table[@class='cast']/tbody/tr["+(cast.length+1)+"]")
if(curCast)
	cast.push(curCast.replace("...", "-"))
else
	break
				}
info += cast.length ? cast.join("<br />") : "No cast available."
killRow()

if(window.location.protocol != "http:")
				{
addRow("Pictures")
info += "<img src=\""+xpath("//div[@id='tn15lhs']/div/a/img/@src")+"\" /> "
var thumb1 = xpath("//div[@class='media_strip_thumbs']/div[1]/a/img/@src")
info += thumb1 ? "<img src=\""+thumb1+"\" /> " : ""
var thumb2 = xpath("//div[@class='media_strip_thumbs']/div[2]/a/img/@src")
info += thumb2 ? "<img src=\""+thumb2+"\" /> " : ""
var thumb3 = xpath("//div[@class='media_strip_thumbs']/div[3]/a/img/@src")
info += thumb3 ? "<img src=\""+thumb3+"\" /> " : ""
var thumb4 = xpath("//div[@class='media_strip_thumbs']/div[4]/a/img/@src")
info += thumb4 ? "<img src=\""+thumb4+"\" /> " : ""
killRow()
				}

addRow("Links")
info += "<a href=\""+req.finalUrl+"\">IMDb</a> - <a href=\"http://images.google.com/images?q="+escape(title+year)+"\">Google Images</a>"
killRow()

document.getElementById("imdbInfo").innerHTML = info + "</table>"
			}
})
		}
break
	}
}