// ==UserScript==
// @name           flashkitcodeformat
// @namespace      NA
// @include        *board.flashkit.com/board/*
// ==/UserScript==


var scriptname = "flashkitcodeformat";
var version = 1.20;


if (document.addEventListener) {
document.addEventListener("DOMContentLoaded", init(), false);
}



function init() {
var browser=navigator.userAgent;
var blueString = "add,and,break,case,catch,class,continue,default,delete,do,dynamic,else,eq,extends,false,finally,for,function,ge,get,gt,if,ifFrameLoaded,implements,import,in,instanceof,interface,intrinsic,le,it,ne,new,not,null,on,onClipEvent,or,private,public,return,set,static,super,switch,tellTarget,this,throw,try,typeof,undefined,var,void,while,with,as,abstract,Boolean,bytes,char,const,debugger,double,enum,export,final,float,goto,is,long,namespace,native,package,protected,short,synchronized,throws,transient,use,volatile";
var newBlueString = blueString.replace(/,/g,"|");

var codearray2 = document.body.getElementsByTagName('code');
var codearray3 = [];
for (var i=0;i<codearray2.length;i++) {
	if (codearray2[i].innerHTML.length > 3) {
		codearray3[codearray3.length] = codearray2[i];
	}
}
for (i=0;i<codearray3.length;i++) {
	var myPhp = codearray3[i];
//alert (myPhp.innerHTML.indexOf("&lt;?php")+"\n"+myPhp.innerHTML);
	if (myPhp.innerHTML.indexOf("&lt;?php") == -1) {
	var brRegExp = /<br&gt;/g;
	var brRegExp2 = /<br>/;

	var nbspRegExp = /&nbsp;/g;
	var myCode = myPhp.innerHTML;

	var myPhpPre = document.createElement('pre');
	var myPhpDiv = document.createElement('div');
	myPhpPre.appendChild(myPhpDiv);
	if (browser.indexOf("Chrome") > -1) {
	myPhpPre.style.setProperty("margin","0px");
	myPhpPre.style.setProperty("padding","6px");
	myPhpPre.style.setProperty("border","1px inset");
	myPhpPre.style.setProperty("width",myPhp.parentNode.parentNode.style.height+"px");
	myPhpPre.style.setProperty("height",myPhp.parentNode.parentNode.style.width+"px");
	myPhpPre.style.setProperty("overflow","auto");
	myPhpDiv.style.setProperty("text-align","left");
	} else {
	myPhpPre.style.setProperty("margin","0px","important");
	myPhpPre.style.setProperty("padding","6px","important");
	myPhpPre.style.setProperty("border","1px inset","important");
	myPhpPre.style.setProperty("width",myPhp.parentNode.parentNode.style.height+"px","important");
	myPhpPre.style.setProperty("height",myPhp.parentNode.parentNode.style.height+"px","important");
	myPhpPre.style.setProperty("overflow","auto","important");
	myPhpDiv.style.setProperty("text-align","left","important");
	}
	//alert (myPhp.innerHTML);
	myPhp.innerHTML = myPhp.innerHTML.replace(brRegExp,"\r");
	myPhp.innerHTML = myPhp.innerHTML.replace(brRegExp2,"\r");
	myPhp.innerHTML = myPhp.innerHTML.replace(nbspRegExp,"");
	var innerDivs = myPhp.getElementsByTagName('*');
	
	//alert (myPhp.innerHTML);

	var phpstring = "";
	/*for (var j=0;j<innerDivs.length;j++) {
		var innerDiv = innerDivs[j];
		if (innerDiv.tagName == "br") {
			phpstring = phpstring+"\n"
		} else {
			phpstring = phpstring+innerDiv.textContent;
		}
	}*/

	phpstring = myPhp.textContent;
	//alert(phpstring);

	//phpstring = phpstring.replace(nbspRegExp,"");
	//myCode = myCode.replace(brRegExp,"SPACEGOESHERE");
	//myPhp.innerHTML = myCode;
	
	myPhpDiv.textContent = phpstring;


	//myPhpDiv.innerHTML = phpstring;
	//alert(myPhp.parentNode.parentNode.parentNode);
	//myPhp.parentNode.parentNode.parentNode.replaceChild(myPhpDiv,myPhp.parentNode.parentNode);
	//myPhp.appendChild(myPhpPre);
	//var spaceRegExp = /[ ]{3,}([^ ])/g;
	//phpstring= phpstring.replace(spaceRegExp,"$1");
	//phpstring = phpstring.replace(new RegExp("SPACEGOESHERE","g"),"\n");
	//myPhp.innerHTML = "";
	//myPhpDiv.textContent = phpstring;
	//var phpDiv = document.createElement('div');
	var newPhpDiv = myPhp.parentNode.parentNode;
	var newPhpDivParent = newPhpDiv.parentNode;
	newPhpDivParent.replaceChild(myPhpPre,newPhpDiv);
	//appendChild(myPhpDiv);
	//alert("phpstring "+phpstring.length+"\n"+phpstring);

	}
}



var codearray = document.body.getElementsByTagName('pre');
for (i=0;i<codearray.length;i++) {
	var myPre = codearray[i];
	var newDiv = myPre.previousSibling.previousSibling;
	newDiv.setAttribute("class","nameDiv");
	newDiv.innerHTML = "<table><tr><td>ActionScript Code:</td></tr></table>";
	//myPre.parentNode.insertBefore(newDiv,myPre);
	if (browser.indexOf("Chrome") > -1) {
		myPre.style.setProperty("background-color","#ffffff");
	} else {
		myPre.style.setProperty("background-color","#ffffff","important");
	}
	var myDiv = myPre.getElementsByTagName('div')[0];
	myCode = myDiv.innerHTML;
	var dollarRegExp = /\$/g;
	var tabRegExp = /\t/g;
	myCode = myCode.replace(tabRegExp,"");
	myCode = myCode.replace(dollarRegExp,"DOLLARSIGNHOLDER");	

	var slashRegExp = /\/\/[^\n\r]*[\n\r]/;
	var slashs = [];
	var slashCheck = slashRegExp.exec(myCode);	
	while (slashCheck != null) {
		slashs.push(slashCheck[0]);
		//alert (slashCheck[0]);
		myCode = myCode.replace(slashCheck[0],"TEMPORARYSLASH"+(slashs.length-1)+"\n");
		slashCheck = slashRegExp.exec(myCode);
	}


	var quoteRegExp = /"[^"]*"/;
	var quotes = [];
	var quoteCheck = quoteRegExp.exec(myCode);

	while (quoteCheck != null) {
		quotes.push(quoteCheck[0]);		
		myCode = myCode.replace(quoteCheck[0],"TEMPORARYQUOTE"+(quotes.length-1));
		quoteCheck = quoteRegExp.exec(myCode);
	}


	myCode = myCode.replace(new RegExp("(\\b)("+newBlueString +")(\\b)","g"),"$1<span style=\"color:#0000ff\">$2</span>$3");

	var tabString = "";
	var lineNumber = 0;
	var spaceRegExp = /[ ]{3,}([^ ])/g;
	myCode = myCode.replace(spaceRegExp,"$1");

	for (j=0;j<myCode.length;j++) {
		if (myCode.charAt(j) == "{") {
			tabString = tabString + "\t";
		} else if (myCode.charAt(j) == "}") {
			tabString = tabString.substring(0,tabString.length-1);
			myCode = myCode.substring(0,myCode.lastIndexOf("\n",j)+1) + myCode.substring(myCode.lastIndexOf("\n",j)+2,myCode.length);
		} else if ((myCode.charAt(j) == "\n")||(myCode.charAt(j) == "\r")) {
			lineNumber++;
			myCode = myCode.substring(0,j+1)+tabString+myCode.substring(j+1,myCode.length);
			j += tabString.length;
		} 
	}
//alert("5");
	for (j=0;j<quotes.length;j++) {
		myCode = myCode.replace("TEMPORARYQUOTE"+j,"<span style=\"color:#00AA00\">"+quotes[j]+"</span>");
	}
	//alert (myCode);
	for (j=0;j<slashs.length;j++) {
		myCode = myCode.replace("TEMPORARYSLASH"+j+"\n","<span style=\"color:#444444\">"+slashs[j]+"</span>");
	}
	var dollarRegExp2 = /DOLLARSIGNHOLDER/g;
	myCode = myCode.replace(dollarRegExp2,"/$");	
	//alert (myCode);
	myDiv.innerHTML = myCode;

	
}

  checkForUpdate();
	
}


function getElementsByAttribute(frst,attrN,attrV,multi){
	attrV=attrV.replace(/\|/g,'\\|').replace(/\[/g,'\\[').replace(/\(/g,'\\(').replace(/\+/g,'\\+').replace(/\./g,'\\.').replace(/\*/g,'\\*').replace(/\?/g,'\\?').replace(/\//g,'\\/');
    	var multi=typeof multi!='undefined'?
            multi:
            false,
        cIterate=frst.getElementsByTagName('*'),
        aResponse=[],
        attr,
        re=new RegExp(multi?'\\b'+attrV+'\\b':'^'+attrV+'$'),
        i=0,
        elm;
    while((elm=cIterate.item(i++))){
        attr=elm.getAttributeNode(attrN);
        if(attr &&
            attr.specified &&
            re.test(attr.value)
        )
            aResponse.push(elm);
    }
    return aResponse;
}






function checkForUpdate() {


var escapeurl = ("http://www.wesisgood.com/UpdateScripts/index.php?name="+scriptname+"&version="+version);
GM_xmlhttpRequest({
method: 'GET',
url: escapeurl,
headers: {
'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
'Accept': 'application/atom+xml,application/xml,text/xml',
},

onload: function(responseDetails) {


var myText = responseDetails.responseText;


var errorRegExp = /Error:.*/;
if (errorRegExp.test(myText)) {

} else if (myText == "0") {

} else if (myText == "-1") {

} else {
var codeArray = getElementsByAttribute(document,"class","nameDiv",false);
for (var i=0;i<codeArray.length;i++) {
	
	var nameDiv = codeArray[i];
	var newTdDiv = document.createElement('div');
	var tbodyDiv = swfDiv.getElementsByTagName('table')[0];
	newTdDiv.innerHTML = "[<a href=\""+myText+"\" title=\"an update for this script is available\">*</a>]";
	nameDiv .appendChild(newTdDiv);	
	tbodyDiv.getElementsByTagName('td')[0].parentNode.insertBefore(newTdDiv,tbodyDiv.getElementsByTagName('td')[0]);
}
}
}


});
}








