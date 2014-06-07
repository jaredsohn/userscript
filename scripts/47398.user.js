// ==UserScript==
// @name           Twitter Friendly Fark
// @namespace      baseballsimulator.com
// @include        http://www.fark.com/*
// @include	   http://network.yardbarker.com/network/fark_sports
// ==/UserScript==

var innerHTMLofLink, innerHTMLofLink2;

function getTinyAndInsert() {
  var theanchor=this;
  				var theText2 = this.parentNode.previousSibling.textContent;
				
				innerHTMLofLink = this.offsetParent.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
				innerHTMLofLink2 = innerHTMLofLink.substr(9,innerHTMLofLink.indexOf("target=")-11);
								
  GM_xmlhttpRequest({
		method: 'GET',
		url: "http://gohulu.com/1/?save=y&url=" + innerHTMLofLink2,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				
				var theHTML = responseDetails.responseText; 
				var theHTML2 = theHTML.substr(theHTML.indexOf("select_all();")+15,theHTML.indexOf("</textarea>")-theHTML.indexOf("select_all();")-15)
				
				  
				
				if(theText2.length > 111){

					theText2 = theText2.substr(0,111) + "...";
				
				}
				

				var theText = "&nbsp;<textarea name='select1' style='width:400px; height:60px;'>" + theText2 +" "+ theHTML2 + "</textarea>";

			
        theanchor.parentNode.innerHTML='<br>' + theText;

inputs = document.getElementsByName('select1');	
for(var j=0;j<inputs.length;j++){
	inputs[j].addEventListener("mouseover", function(){
		 this.focus(); 
		 this.select(); 
	} , false);
}
			}	
		}
	});
}

var d,rid;
var alinkholder=document.getElementsByTagName('a')
var stories = document.evaluate("//td/span",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<alinkholder.length;i++) {
  var alink=alinkholder[i];
  var alink2=alinkholder[i].textContent;

  var story = stories.snapshotItem(i);

	  
    d=document.createElement('span')
    rid=parseInt(Math.random() * 100 * Math.random()* 100 * Math.random()* 100* Math.random()* 100)
  
    d.innerHTML+="<a title='Make this link into a compact URL!' href='javascript://change this to compact URL' id='"+rid+"'>&otimes;</a>"

    story.parentNode.insertBefore(d,story.nextSibling)
    document.getElementById(rid).addEventListener("click",getTinyAndInsert,false)

}