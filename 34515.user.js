// ==UserScript==
// @name           flashkitembedswf
// @namespace      NA
// @include        *board.flashkit.com/board/*
// ==/UserScript==

var scriptname = "flashkitembedswf";
var version = 1.20;

function init() {

  var swfurls = [];
  var swfRegExp = new RegExp("\\[SWF[\^\\[\]*\\]\(\[\^\\[\]*?\)\(\\[\\/SWF\\]\)","gi");
  var postsdiv = document.getElementById('posts');
  if (!postsdiv){
    postsdiv = document.getElementById('post_message_'); //for private messages
  }
  if (!postsdiv){
    return; //nothing to operate on on this page.
  }
  var myCode = postsdiv.innerHTML;
  var counter = 0;
  var swfs = swfRegExp.exec(myCode);
  var htRegExp = new RegExp("height=\(\[\^\\b\\s\\]\]*\)\([\\b\\s\\]]\)","i");
  var wdRegExp = new RegExp("width=\(\[\^\\b\\s\\]\]*\)\([\\b\\s\\]]\)","i");
  while(swfs != null) {
   var swfname = "swfiframe"+counter;
   var btnname = "swfbutton"+counter;
   var divname = "swfdiv"+counter;
  var urlRegExp = new RegExp("^\[http:\\/\\/\|https:\\/\\/\]\.*","i");
var quoteRegExp = /^.*".*$/g;
   if (urlRegExp.test(swfs[1])) {
    swfurls.push(swfs[1]);
	var numCheckRegExp = new RegExp("\^\[\\d\]*\$");
    var ht = htRegExp.exec(swfs[0]);
    if (!ht) {
     ht = "300";
    } else {

	if (numCheckRegExp.test(ht[1])) {
     	ht = ht[1];
	} else {
		ht = "300";
	}
    }
    var wd = wdRegExp.exec(swfs[0]);
    if (!wd) {
     wd = "400";
    } else {
     	if (numCheckRegExp.test(wd[1])) {
     	wd = wd[1];
	} else {
		wd = "400";
	}
    }
	var fakedivname = "blahblahblahfakedivname";
    myCode = myCode.replace(swfs[0],"<div id=\""+fakedivname+"\"></div>");   
	postsdiv.innerHTML = myCode;
	var fakeDiv = document.getElementById(fakedivname);
    var myDiv = document.createElement('div');
	myDiv.setAttribute("class","swfdiv");
	myDiv.setAttribute("id",divname);
	myDiv.setAttribute("wd",wd);	
	myDiv.setAttribute("ht",ht);	
	myDiv.setAttribute("url",swfs[1]);
	//myDiv.innerHTML = "<table><tr><td><input type=\"button\" value=\"Enable\" id=\""+btnname+"\" class=\"swfbutton\"></td><td><div id=\""+divname+"2\">"+swfs[1]+"</div></td></tr></table><iframe width=\"0\" height=\"0\" id=\'"+swfname+"\' name=\'"+swfname+"\'></iframe>";
	var tableDiv = document.createElement('table');
	var tbodyDiv = document.createElement('tbody');
	var trDiv = document.createElement('tr');
	var tdDiv1 = document.createElement('td');
	var tdDiv2 = document.createElement('td');
	var divDiv = document.createElement('div');
	var aDiv = document.createElement('a');
	aDiv.setAttribute("href",swfs[1]);
	aDiv.textContent = swfs[1];
	var buttonDiv = document.createElement('input');
	buttonDiv.setAttribute("type","button");
	buttonDiv.setAttribute("value","Enable");
	buttonDiv.setAttribute("id",btnname);
	buttonDiv.setAttribute("class","swfbutton");
	
	var iframeDiv = document.createElement('iframe');
	iframeDiv.setAttribute("src","about:blank");
	iframeDiv.style.display="none";
	iframeDiv.width = wd;
	iframeDiv.height = ht;

	var trDiv = document.createElement('tr');
	var brDiv = document.createElement('br');
	
	myDiv.appendChild(tableDiv);
	tableDiv.appendChild(tbodyDiv);
	tbodyDiv.appendChild(trDiv);
	trDiv.appendChild(tdDiv1);
	trDiv.appendChild(tdDiv2);
	tdDiv1.appendChild(buttonDiv);
	tdDiv2.appendChild(divDiv);
	divDiv.appendChild(aDiv);
	myDiv.appendChild(brDiv);
	myDiv.appendChild(iframeDiv);

	fakeDiv.parentNode.replaceChild(myDiv,fakeDiv);
	

myCode = postsdiv.innerHTML;
swfs = swfRegExp.exec(myCode);

   } else {
    myCode = myCode.replace(swfs[0],swfs[0]+" Invalid format");
    swfs = swfRegExp.exec(myCode);
   }
  }//end while


var buttonsArray = getElementsByAttribute(document,"class","swfbutton",false);
for (var i=0;i<buttonsArray.length;i++) {

	//var swfButton = buttonsArray[i];
	buttonsArray[i].addEventListener("click", 
      function(ev) { 
      var myButtonDiv = (ev.target);
	var myMyDiv = myButtonDiv.parentNode.parentNode.parentNode.parentNode.parentNode;
	var myIframeDiv = myMyDiv.getElementsByTagName('iframe')[0];
      var ur = myMyDiv.getAttributeNode('url').value;
      var myDivDiv = myMyDiv.getElementsByTagName('div')[0];
      if (myButtonDiv.value == "Disable") { 
	  myButtonDiv.value = "Enable"; 
	  myIframeDiv.style.display="none";
	  myIframeDiv.src = "about:blank";	
	  var myADiv = document.createElement('a');
	  myADiv.setAttribute("href",ur);
	  myADiv.textContent = ur;
	  myDivDiv.textContent = "";
	  myDivDiv.appendChild(myADiv);
      } else {
        myButtonDiv.value = "Disable"; 
	  myIframeDiv.style.display="block";
	  myIframeDiv.src = ur;
	  myDivDiv.removeChild(myDivDiv.getElementsByTagName('a')[0]);
	  myDivDiv.textContent = ur;
      }
     }, false);	
}

  checkForUpdate();

}//end init

init(); //call init



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
var swfsArray = getElementsByAttribute(document,"class","swfdiv",false);
for (var i=0;i<swfsArray.length;i++) {
	var swfDiv = swfsArray[i];
	var newTdDiv = document.createElement('td');
	var tbodyDiv = swfDiv.getElementsByTagName('table')[0];
	newTdDiv.innerHTML = "[<a href=\""+myText+"\" title=\"an update for this script is available\">*</a>]";
	tbodyDiv.getElementsByTagName('td')[0].parentNode.insertBefore(newTdDiv,tbodyDiv.getElementsByTagName('td')[0]);
}
}
}


});
}
