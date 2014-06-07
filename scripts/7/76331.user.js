// ==UserScript==  
// @resource	 pos		http://stashbox.org/879221/database_collapsed.txt 
// @name           Truthiness
// @namespace      truthiness
// @description    Evaluate accuracy of web pages
// @include        about:blank
// ==/UserScript==
//TODO:Fix this so it doesn't use global objects. Also write a song about global objects. Also sleep.


window.wait=function(msecs)
{
var start = new Date().getTime();
var cur = start
while(cur - start < msecs)
{
cur = new Date().getTime();
} 
} 


window.symbolicReduction=function(statement) {
//do some symbolic reductions
while(statement.indexOf(" was ") > -1) {
statement=statement.replace(" was "," is ")
}
while (statement.indexOf(" will be ")>-1) {
statement=statement.replace(" will be "," is ")
}
while (statement.indexOf(" will ")>-1) {
statement=statement.replace(" will "," is ")
}
while(statement.indexOf(" can be ") > -1) {
statement=statement.replace(" can be "," is ")
}
while(statement.indexOf(" are ")>-1) {
statement=statement.replace(" are "," is ")
}
while(statement.indexOf(" were ") >-1) {
statement=statement.replace(" were "," is ")
}
while(statement.indexOf(" am ") >-1) {
statement=statement.replace(" am "," is ")
}
while(statement.indexOf(" said ") >-1) {
statement=statement.replace(" said "," is ")
}
while(statement.indexOf(" can ") >-1) {
statement=statement.replace(" can "," is ")
}
while(statement.indexOf(" could ") >-1) {
statement=statement.replace(" could "," is ")
}
while(statement.indexOf(" has ") >-1) {
statement=statement.replace(" has "," is ")
}
while (statement.indexOf(" a ") > -1) {

statement=statement.replace(" a "," ")
}
while (statement.indexOf(" an ") > -1) {
statement=statement.replace(" an ","  ")
}
while (statement.indexOf(" some ") > -1) {
statement=statement.replace(" some ","  ")
}
while (statement.indexOf(" often ") > -1) {
statement=statement.replace(" often "," ")
}
while (statement.indexOf(" sometimes ") > -1) {
statement=statement.replace(" sometimes "," ")
}
while (statement.indexOf(" many ") > -1) {
statement=statement.replace(" many "," ")
}
while (statement.indexOf(" most ") > -1) {
statement=statement.replace(" most "," ")
}
while (statement.indexOf(" few ") > -1) {
statement=statement.replace(" few "," ")
}
while (statement.indexOf(" in ") > -1) {
statement=statement.replace(" in "," ")
}
while(statement.indexOf(" A ")>-1) {
statement=statement.replace(" A "," ")
}
while (statement.indexOf(" used ") > -1) {
statement=statement.replace(" used "," ")
}
while (statement.indexOf(" for ") > -1) {
statement=statement.replace(" for "," ")
}
while (statement.indexOf(" the ") > -1) {
statement=statement.replace(" the "," ")
}
while (statement.indexOf(" The ")>-1) {
statement=statement.replace(" The "," ")
}
while (statement.indexOf(" they ")>-1) {
statement=statement.replace(" they "," it ")
}
//take out html stuff too
while (statement.indexOf(">")>-1) {
statement=statement.replace(">"," ")
}
while (statement.indexOf("<")>-1) {
statement=statement.replace("<"," ")
}
while (statement.indexOf("/")>-1) {
statement=statement.replace("/"," ")
}



//now scan through each word and figure out what it's listed as in wordnet


newStatement=""
//alert(statement)
//alert("non-posed:"+statement)
statement=searchPOS(statement)
return statement
}




window.searchPOS=function(statement) {

newStatement=""
posDB=GM_getResourceText("pos");
list=statement.split(" ")
for (c=0;c<list.length;c++) {
posDB=GM_getResourceText("pos");
//alert(list[c])
cacheStart=POScache.indexOf("	"+list[c]+"	")
if (cacheStart==-1) {
statementStart=posDB.indexOf("	"+list[c]+"	")
posDB=posDB.substring(statementStart, posDB.length-1)
statementEnd=posDB.indexOf("xyzzy")
//alert(posDB.substring(0, statementEnd))
body=posDB.substring(0, statementEnd)
POScache=POScache+"	"+body+"	xyzzy"
}
else {
//alert("Using cache for" + list[c])
statementStart=POScache.indexOf("	"+list[c]+"	")

mini=POScache.substring(statementStart, POScache.length-1)
statementEnd=mini.indexOf("xyzzy")
//alert(POScache.substring(0, statementEnd))
body=mini.substring(0, statementEnd)
}

flag=body.substring(body.indexOf(list[c])+list[c].length,body.length-1)

//alert(body)
if ((flag.indexOf("N")>-1 || flag.indexOf("P")>-1 || flag.indexOf("p")>-1  || flag.indexOf("t")>-1 || flag.indexOf("i")>-1 || list[c]=="is") || body.indexOf("22")>-1)  {
list[c]=list[c]+" "
list[c]=list[c].replace("ing "," ")
if (flag.indexOf("P")>-1 || flag.indexOf("p")>-1) {

list[c]=list[c].replace("es "," ")
list[c]=list[c].replace("s "," ")
}

newStatement=newStatement+list[c]
//alert(newStatement)
}

if (c % 2000==0) {
//alert("symred complete="+(c/list.length)*100)
}
}
//alert(newStatement)
return newStatement
}




//validity checking code should go here
window.checkValidity = function(statements, v) {
totalPhraseScore=0
subjectiveScore=0
done=0
statement=statements[v]
//alert("processing:"+statement+"    v="+v)
preserved=statement
statement=" "+ statement
statement=window.symbolicReduction(statement)
//alert("Symbolic reduction of statement complete")
//alert(statement)
boss=statement.replace(" is "," ")
boss=boss.replace(" ","%20")

bossRequest='http://boss.yahooapis.com/ysearch/web/v1/'+boss+'?appid=zG8c2tfV34GKbuSoalOhSvM4Zhkb8.fsLlINaLn_wwHORScZud3UOXIGw34wUFv582qBKblP&format=xml'

if (testMode==true) {

}
if (statement.indexOf(" is ") > -1) {
subject=statement.substring(0,statement.indexOf(" is "))
check=statement.substring(statement.indexOf(" is ")+4, statement.length)
request='http://en.wikipedia.org/wiki/'+encodeURI(subject)
cNetRequest='http://openmind.media.mit.edu/api/en/concept/'+encodeURI(subject.substring(1,subject.length))+'/assertions/limit:100/query.xml'
boss=statement.replace(" is "," ")
boss=boss.replace(" ","%20")

bossRequest='http://boss.yahooapis.com/ysearch/web/v1/'+boss+'?appid=zG8c2tfV34GKbuSoalOhSvM4Zhkb8.fsLlINaLn_wwHORScZud3UOXIGw34wUFv582qBKblP&format=xml'

//alert(bossRequest)
cNetNotFound=wikiNotFound=false
done=0
GM_xmlhttpRequest({
    method: 'GET',
    url: cNetRequest,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {

conceptnetResponse=responseDetails.responseText
	if (conceptnetResponse.indexOf("Not Found") == -1) {
conceptnetResponse=conceptnetResponse.toLowerCase()
	//conceptnetResponse=window.symbolicReduction(conceptnetResponse)
score=(conceptnetResponse.split(check).length - 1)
	if (score >=1) {
totalPhraseScore=totalPhraseScore+5
	}
}	//end if
else {
cNetNotFound=true
totalPhraseScore=totalPhraseScore+2.5
}
//start nested section
GM_xmlhttpRequest({
    method: 'GET',
    url: request,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
	done=1
//alert("Wiki data recieved")
       //all right everybody, now here we go
       //it's a brand new version of the doe-si-doe
	returnedPage=responseDetails.responseText
	if (returnedPage.indexOf("Wikipedia does not have an article with this exact name")>-1) {
	wikiNotFound=true
	totalPhraseScore=totalPhraseScore+2.5
	}
	else {
	returnedPage=returnedPage.toLowerCase()
//alert("Lowercase conversion")
	returnedPage=returnedPage.substring(returnedPage.indexOf("<body"),returnedPage.length)
//alert("substringing")
	holdopen=false
	parsed=""
	for (x=0;x<returnedPage.length;x++) {
	letter=returnedPage.charAt(x)
	if (letter=="<") {
	holdopen=true
	}
	if (letter==">") {
	holdopen=false
	}
else if (holdopen==false) {
parsed=parsed+letter
}

if (x % 7000==0) {
//alert("parsing complete="+(x/returnedPage.length)*100)
}

}
//alert("parsing")
returnedPage=parsed
//alert(returnedPage)
wikiSen=returnedPage.split(".")
check=check+""
checkWords=check.split(" ")
wordHit=false
minimalChain=""
cachedLength=returnedPage.length
for (i=0;i<wikiSen.length;i++) {
 
wordHit=false
for (x=0;x<checkWords.length;x++) {
//alert("Check:"+checkWords[x]+"|Sentence:"+wikiSen[i])
if (wikiSen[i].indexOf(checkWords[x])>-1 && checkWords[x] != "") {
wordHit=true
}
}
if (wordHit==true) {
minimalChain=minimalChain+wikiSen[i]
}
}
//alert("Prelimilary screening")
//alert(minimalChain)

	returnedPage=window.symbolicReduction(minimalChain) //No, dammit, we don't need this!!!
//alert("Symbolic reduction")
	//while(returnedPage.indexOf(" it ") > -1) {
	//returnedPage=returnedPage.replace(" it ", subject)
	//}
	score=(returnedPage.split(check).length - 1)
	if (score >= 1) {
	totalPhraseScore=totalPhraseScore+3
		if (score > 5) {
	score=5
	}
	totalPhraseScore=totalPhraseScore+score
	}
	}

//the next xhmlttprequest will go here
GM_xmlhttpRequest({
  method: "GET",
  url: bossRequest,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload: function(response) {
	yahoo=response.responseText
	number=yahoo.substring(yahoo.indexOf("totalhits")+11,yahoo.indexOf("deephits")-2)
	//alert(number)
	if (number>53000) { //was 900000
	subjectiveScore=10
	}
	else {
	subjectiveScore=0
	}





if (testMode==true) {
wikiNotFound=cNetNotFound=true
writeBuffer=writeBuffer+preserved+"<hr>"
}
if (subjectiveScore>5) {
preserved="<FONT style=\"BACKGROUND-COLOR: green\">"+preserved+"</FONT>"
}
else {
preserved="<FONT style=\"BACKGROUND-COLOR: yellow\">"+preserved+"</FONT>"
}	
if (wikiNotFound==false || cNetNotFound==false) {
if (totalPhraseScore < 1) { //was 3
	writeBuffer=writeBuffer+("<font color=#ff0000>"+preserved+"</font>")	
	}
	else  if (totalPhraseScore >=1 && totalPhraseScore < 4){
	writeBuffer=writeBuffer+("<font color=#ffff00>"+preserved+"</font>")
	}
	else {
	writeBuffer=writeBuffer+("<font color=#00ff00>"+preserved+"</font>")
	}
}
else {
writeBuffer=writeBuffer+(preserved)
}
v++
	if(v>statements.length) {
	window.open(writeBuffer,'Validation') 
	}
else {
	window.checkValidity(statements,v)
}


    
//closing should go here

  }
});


} //end of onload function
});
//end nested section
    } //end of onload function
});
}
else {
GM_log("Invalid query, skipping grade")
writeBuffer=writeBuffer+(preserved)
v++
if(v>statements.length) {
	writeBuffer=writeBuffer+"</body></html>"
	window.open(writeBuffer,'Validation') 
	}
else {
	window.checkValidity(statements,v)
}
}
}



window.startup=function() {
if (window==top) { //make sure we're not running in a frame
writeBuffer="data:text//html,<html><head></head><body>"
keepRunning=true
testMode=false
input=prompt("Enter the statement")
if (input.length > 3000) {
accept=confirm("Warning:You have asked to check a very large block of text. Checking text is computationally expensive, so this process may take some time. Do you want to continue?")
if (accept==false) {
keepRunning=false
}
}
if (keepRunning) {
input=input.toLowerCase()
temp=""
for (i=0;i<input.length;i++) {
if (input.charAt(i)=="\(") {
tester=input.substring(i,input.length)
i=i+tester.indexOf("\)")+1
}
temp=temp+input.charAt(i)
}
while(input.indexOf("\"") > -1) {
input=input.replace("\"",".")
}
while(input.indexOf("(") > -1) {
input=input.replace("(",".")
}
while(input.indexOf(")") > -1) {
input=input.replace(")",".")
}
while(input.indexOf("\;") > -1) {
input=input.replace("\;",".")
}
while(input.indexOf("?") > -1) {
input=input.replace("?",".")
}
while(input.indexOf("!") > -1) {
input=input.replace("!",".")
}
while(input.indexOf(":") > -1) {
input=input.replace(":",".")
}
while(input.indexOf("’") > -1) {
input=input.replace("’","\'")
}
while(input.indexOf(",") > -1) {
input=input.replace(",",".")
}
while(input.indexOf(" that ") > -1) {
input=input.replace(" that ",".")
}
while(input.indexOf(" say ") > -1) {
input=input.replace(" say ",".")
}
var statements=input.split(".")
alert("Split complete with "+statements.length + " logical chunks. Truthiness will now look up information online.")
POScache=""
window.checkValidity(statements,0)
}
}
}
window.startup() //sorry, I couldn't get ANYTHING to work with this, so the only way to turn the extension on or off is to disable/enable it in greasemonkey. Or you could change the source code each time.