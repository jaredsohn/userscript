// ==UserScript==
// @name          Newzbin V3 sorted IMDB
// @description   Sorts IMDB Rating
// @include       http://v3.newzbin.com/* + 400 results per page
// ==/UserScript==


var movies = document.evaluate(
   "//tbody[@class='odd' or @class='odd-new' or @class='even' or @class='even-new']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);



var total = 400;
var imdbLinkRegex = new RegExp("http://[a-z.]+\.imdb\.com/[a-zA-Z0-9/+_-]+");
var regRegex = new RegExp("http://[a-z.]+\.com/[a-zA-Z0-9/+_-]+");
var minuteRegex = new RegExp("[0-9]+ hours|[0-9]+ minutes|[0-9]+ seconds|[0-9]+ days", "g");
var ratingRegex = new RegExp("[0-9]\.[0-9]+(?=/10)");
var descRegex = new RegExp("<h5>Plot[^<>]*</h5>([^]*?)(?=</div>)");
var newzBinTitleRegex = new RegExp("^http:\/\/v3\.newzbin\.com\/browse\/post\/[0-9]+\/$");
var findNumber = new RegExp("[0-9]+");
var test = new Array();
var color0 = "000000";
var color1 = "000f18";
var color2 = "01324e";
var color3 = "01324e";
var color4 = "02456c";
var color5 = "025b8e";
var color6 = "0171b2";
var color7 = "018bda";
var color8 = "00a2ff";
var seconds = -1; 
var age = "null";



function orderRows()
{
       alert("hello");
	   var rowArray = [];
       var iRows = document.getElementById("bam2").rows;
    
       for(r = 0; r < iRows.length; r ++){
          rowArray.push([iRows.item(r).cells.item(0).firstChild.data, iRows.item(r)]);
          iRows.item(r).parentNode.removeChild(iRows.item(r));
          r --;
       }
    
       //rowArray.sort();
    
       var iTbody = document.getElementById("mytable").firstChild;
    
       for(o = 0; o < rowArray.length; o ++){
          iTbody.appendChild(rowArray[o][1]);
       }
 }
function Element(ib, ob, rating, link, secs, age) {
    this._ib = ib;
	this._ob = ob;
	this._rating = rating;
	this._link = link;
	this._secs = secs;
	this._age = age;
}
Element.prototype._ib;
Element.prototype._ob;
Element.prototype._rating;
Element.prototype._link;
Element.prototype._secs;
Element.prototype._age;

Element.prototype.getIb = function() {
    return this._ib;
}
Element.prototype.getOb = function() {
    return this._ob;
}
Element.prototype.getRating2 = function() {
    return this._rating;
}

for (var i = 0; i < movies.snapshotLength; i++)
{
	movieBody = movies.snapshotItem(i);
	var imdbLink = movieBody.innerHTML.match(imdbLinkRegex);
	var regLink = movieBody.innerHTML.match(regRegex);
	var minTime = movieBody.innerHTML.match(minuteRegex);

	
	if(minTime)
	{
		var temp6 = minTime.toString();
		var commaPlace = temp6.indexOf(',') + 1;
		var timeString = temp6.substring(commaPlace);
		age = timeString;
		seconds = timeString.match(findNumber);
		
		
		if(timeString.indexOf('c') != -1)
			seconds = seconds;
		else if(timeString.indexOf('m') != -1)
			seconds *= 60;
		else if(timeString.indexOf('h') != -1)
			seconds *= 60 * 60;
		else
			seconds *= 60 * 60 * 60;
		//alert(seconds + " seconds");
		
	} 
	if (imdbLink)
	{		
		//alert("go " + imdbLink);
		getRating(movieBody, imdbLink.toString(), seconds, age);
		
	}	
	else
	{	
		
		if(regLink != null)
			var p = new Element(regLink.toString(), regLink.toString(), 0, "negative", seconds, age);
		else
			var p = new Element("Invalid Link", "Invalid Link", 0, "negative", seconds, age);
		
		test.push(p);
		
		if (test.length == total)
			print();
		
	}
		
	
		
}


function getRating(movieBody, imdbLink, seconds, age)
{
   GM_xmlhttpRequest({
      method: 'GET',
      url: imdbLink,
	  headers: {'Referer': imdbLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
      onload: function (responseDetails)
      {
         if (responseDetails.status == 200)
         {
			var p = new Element("null", imdbLink,  0, "negative", seconds, age);
			var ratingMatch = responseDetails.responseText.match(ratingRegex);
			var descMatch = responseDetails.responseText.match(descRegex);
			var curLink;
			if (descMatch)
				description = descMatch[1].replace("href=\"/", "href=\"http://www.imdb.com/");
			var star = "";
            if (ratingMatch)
            {
            	rating = parseFloat(ratingMatch);
                // we got our IMDB rating => insert it in the original page using an other regular expression
                var allLinks = movieBody.getElementsByTagName("a");
                for (var i = 0; i < allLinks.length; i++)
                {
                	curLink = allLinks[i];
					var tempLink = curLink;
					
                    if (newzBinTitleRegex.exec(curLink) != null)
                    {
						for (var x = 0; x < Math.round(rating/2); x++)
							star += "<img src='http://v3.newzbin.com/m/i/i/star.png'/>";
						p._ib = curLink.innerHTML;
						var ifMatch = 0;
						for(var y = 0; y < test.length; y ++)
						{
							if(p._ob == test[y]._ob || p._ib == test[y]._ib)
							{
								ifMatch = 1;
								//alert("Match " + p._ib);
							}
						
						}
						curLink.innerHTML += " " + star;
						curLink.title += "" + rating + "/10.0";
						if(ifMatch ==1)
						{
							p._ib = "match";
							p._rating = -1;
						}
						else{
						p._rating = rating;
						p._link = tempLink + "nzb";
						}
						
						
                        break;
					}
            	}
            }
            
            if (descMatch)
            {
                //add description for different layout
                //ugly but does the job
                var description = descMatch[1].replace("href=\"/", "href=\"http://www.imdb.com/");
                if (curLink)
                    curLink.title = curLink.title + " - " + description;
                
                if (movieBody.rows.length > 2)
                {
                    var tr = movieBody.rows[movieBody.rows.length - 1]
                    if (tr.cells.length > 3)
                        // cypher tables
                        movieBody.innerHTML += "<tr><td colspan='2'/><td colspan='2'>" + description + "</td></tr>";
                    else
                        // V3
                        tr.cells[tr.cells.length - 1].innerHTML += "<p/>" + description;
                }
                else if (movieBody.rows.length > 1)
                {
                    // cypher
                    movieBody.innerHTML += "<tr><td colspan='3'/><td colspan='3'>" + description + "</td></tr>";
                }
                else
                {
                    //lite
                    movieBody.innerHTML += "<tr><td colspan='4'/><td>" + description + "</td></tr>";
                }
            }
         }
			
	
		num = test.push(p);
		
		 if (test.length == total)
		 {
			printMaster();
							
		}
      }
   });
}


function printMaster()
{
	test.sort(callbackFunc);
	printHeader();
	document.writeln("<table id =\"bam\" width=\"720\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
	
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"></div></td>" 
			+ "<td width=\"639\" class=\"" + "text style4" + "\"><div align=\"center\"> &nbsp; Movies Ranked By IMDB In Descending Order</div></td>"
			+ "<td width=\"100\" class=\"text\">" + " " + "</td>");
	document.writeln("</tr>");
	
	
	printToday();
	//printWeek();
	endPrint();	
	document.close();
}

function printWeek(){
	
	
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"></div></td>" 
			+ "<td width=\"639\" class=\"" + "text" + "\"><div align=\"center\"> &nbsp; In The Last Week</div></td>"
			+ "<td width=\"100\" class=\"text\">" + " " + "</td>");
	document.writeln("</tr>");
	
	
	
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"> Rating </div></td>" 
			+ "<td width=\"639\" class=\"" + "text" + "\"> &nbsp; Movie</td>"
			+ "<td width=\"100\" class=\"text\">" + "Age" + "</td>");
	document.writeln("</tr></td>");
	
	document.writeln("<table id =\"bam2\" width=\"720\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
	for (var j = 0; j < test.length; j++)
	{
				
		if(test[j]._rating != -1 && test[j]._secs <= 604800 && test[j]._ib != "Invalid Link")
		{
			document.writeln("<tr>");
			colorPrint(test[j]);		
			document.writeln("</tr>");
		}
	}
	document.writeln("</table>");  
	
	
}

function printToday(){
	
	
	
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"></div></td>" 
			+ "<td width=\"639\" class=\"" + "text" + "\"><div align=\"center\"> &nbsp; In The Last 24 Hours</div></td>"
			+ "<td width=\"100\" class=\"text\">" + " " + "</td>");
	document.writeln("</tr>");
	
	
	
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"> Rating </div></td>" 
			+ "<td width=\"639\" class=\"" + "text" + "\"> &nbsp; Movie</td>"
			+ "<td width=\"100\" class=\"text\">" + "Age" + "</td>");
	document.writeln("</tr></td>");
	
	document.writeln("<table id =\"bam2\" width=\"720\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
	for (var j = 0; j < test.length; j++)
	{
				
		if(test[j]._rating != -1 && test[j]._secs <= 86400  && test[j]._ib != "Invalid Link")
		{
			document.writeln("<tr>");
			colorPrint(test[j]);		
			document.writeln("</tr>");
		}
	}
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"> &nbsp;</div></td>"
			+ "<td width=\"639\" class=\"" + "text" + "\"> &nbsp;</td>" 
			+ "<td width=\"100\" class=\"text\"> &nbsp;</td>");
	document.writeln("</tr>");
	
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"> &nbsp;</div></td>"
			+ "<td width=\"639\" class=\"" + "text" + "\"><div align=\"center\"> This Week </div></td>"
			+ "<td width=\"100\" class=\"text\"> &nbsp;</td>");
	document.writeln("</tr>");
	
	for (var j = 0; j < test.length; j++)
	{
				
		if(test[j]._rating != -1 && test[j]._secs <= 604800 && test[j]._ib != "Invalid Link")
		{
			document.writeln("<tr>");
			colorPrint(test[j]);		
			document.writeln("</tr>");
		}
	}
	
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"> &nbsp;</div></td>"
			+ "<td width=\"639\" class=\"" + "text" + "\"> &nbsp;</td>" 
			+ "<td width=\"100\" class=\"text\"> &nbsp;</td>");
	document.writeln("</tr>");
	
	document.writeln("<tr>");
	document.writeln("<td width=\"41\" class=\"" + "text" + "\"><div align=\"center\"> &nbsp;</div></td>"
			+ "<td width=\"639\" class=\"" + "text" + "\"><div align=\"center\"> All Time </div></td>"
			+ "<td width=\"100\" class=\"text\"> &nbsp;</td>");
	document.writeln("</tr>");
	
	for (var j = 0; j < test.length; j++)
	{
				
		if(test[j]._rating != -1 && test[j]._ib != "Invalid Link")
		{
			document.writeln("<tr>");
			colorPrint(test[j]);		
			document.writeln("</tr>");
		}
	}
	document.writeln("</table>");  
	
	
}

function colorTag(rating)
{
	if(rating >= 9 && rating <= 10)
		return("text8");
	else if(rating >= 8.0)
		return("text7");
	else if(rating >= 7.0)
		return("text6");
	else if(rating >= 6.0)
		return("text5");
	else if(rating >= 5.0)
		return("text4");
	else if(rating >= 4.0)
		return("text3");
	else if(rating >= 3.0)
		return("text2");
	else if(rating >= 2.0)
		return("text1");
	else if(rating >= 1.0)
		return("text0");
	else
		return("text0");
}

function colorPrint(temp3)
{
	 var tempString = temp3._rating.toString();
	 var classString = colorTag(temp3._rating);
	 //alert(classString);
	 if(tempString.length == 1)
		tempString += ".0";
	 document.writeln("<td width=\"41\" class=\"" + classString + "\"><div align=\"center\"><a class=\"" + classString + "\" href=\"" + temp3._link + "\">" + tempString + "</a></div></td>"
			+ "<td width=\"639\" class=\"" + classString + "\"> &nbsp;<a class=\"" + classString + "\" href=\"" + temp3._ob + "\">" + temp3._ib + "</a></td>" 
			+ "<td width=\"100\" class=\"text\">" + temp3._age + "</td>");

}
function printHeader(){
	document.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">" +
"<html xmlns=\"http://www.w3.org/1999/xhtml\">"+
"<head>" +
"<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />" + 
"<title>Untitled Document</title>" +
"<style type=\"text/css\">" +
"<!--" +
"body {" +
	"background-color: #FFFFFF;" +
"}" +
".text {" +
	"font-family: Arial, Helvetica, sans-serif;" +
	"font-size: 13px;" +
	"background-color: #FFFFFF;" +
	"color: #2C293A;" +
	"border-top-style: dotted;" +
	"border-top-color: #1D2022;" +
	"border-top-width: 1px;" +
	"font-weight: normal;" +
"}" +
"a.text:link { color:#2C293A; }" +
"a.text:visited { color: #2C293A; }" +
"a.text:hover { color: #2C293A; }");
colorText10();
document.write("a:link {" +
"	text-decoration: none;" +
"}" +
"a:visited {" +
"	text-decoration: none;" +
"}" +
"a:hover {" +
	"text-decoration: none;" +
"}" +
"a:active {" +
	"text-decoration: none;" +
"}" +
".style4 {" +
	"font-size: 24px;" +
	"color: #201F3A;" +
	"font-weight: bold;" +
"}" +
"function test()" +
"{" +
"	alert('test');" +
"}" +
"--> " +
"</style></head>" +
"<body>" +
"<table width=\"719\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">" +
  "<tr>" +
    "<td height=\"31\" colspan=\"2\" bgcolor=\"#1a1a27\"></td>" +
  "</tr>" +
  "<tr>" +
    "<td width=\"719\" height=\"176\"><a href=\"http://www.iit.edu/~cohojes/hackers.jpg\"><img src=\"http://www.iit.edu/~cohojes/hackers.jpg\" width=\"720\" height=\"176\" /></a></td>" +
  "</tr>" +
  "<tr>" +
    "<td width=\"12\" bgcolor=\"#1D2022\"><table width=\"724\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">" +
     " <tr>" +
        "<td width=\"4\" align=\"left\" valign=\"top\"></td>" +
        "<td width=\"720\" align=\"left\" valign=\"top\" bgcolor=\"#FFFFFF\">");

}
function colorText10()
{
	for(var h = 0; h < 9; h++)
	{
	document.write(".text" + h + " {" +
	"font-family: Arial, Helvetica, sans-serif;" +
	"font-size: 13px;" +
	"background-color: #FFFFFF;" +
	"color: #");
	cP(h); 
	document.write("; " +
	"border-top-style: dotted;" +
	"border-top-color: #1D2022;" +
	"border-top-width: 1px;" +
	"font-weight: normal;" +
	"}" +
	"a.text"+ h +":link { color:#");
	cP(h);
	document.write(";" + "}" +
	"a.text"+ h +":visited { color: #");
	cP(h);
	document.write("; " + "}" +
	"a.text"+ h +":hover { color: #");
	cP(h);
	document.write("; " + "}"); 
	}
}

function cP(it)
{
	 if(it == 0)
		document.write(color0);
	else if(it == 1)
		document.write(color1);
	else if(it == 2)
		document.write(color2);
	else if(it == 3)
		document.write(color3);
	else if(it == 4)
		document.write(color4);
	else if(it == 5)
		document.write(color5);
	else if(it == 6)
		document.write(color6);
	else if(it == 7)
		document.write(color7);
	else if(it == 8)
		document.write(color8);
	else
		document.write(color9);
}
function endPrint()
{
	document.write("</td>" +
"<td width=\"1\" align=\"left\" valign=\"top\" bordercolor=\"#1D2022\" bgcolor=\"#1D2022\"></td>" +
      "</tr>" +
    "</table></td>" +
    "<td bgcolor=\"#2f3e3e\"></td>" +
  "</tr>" +
  "<tr>" +
    "<td height=\"25\" colspan=\"2\" bgcolor=\"#1D2022\"></td>" +
  "</tr>" +
"</table>" +
"</body>" +
"</html>");
}

function callbackFunc(a,b){

	if(a._rating == b._rating){

		if(a._ib == b._ib){
			return 0;
		}

		return (a._ib < b._ib) ? -1 : 1;
	}

	return (a._rating > b._rating) ? -1 : 1;
}




function openInNewWindow() {
// Change "_blank" to something like "newWindow" to load all links in the same new window
var newWindow = window.open(this.getAttribute('href'), '_blank');
newWindow.focus();
return false;
}