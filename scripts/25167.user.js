// ==UserScript==
// @name           edealinfo
// @namespace      edealinfo.com
// @include        http://edealinfo.com/tech.shtml
// ==/UserScript==

var hreftags = document.getElementsByTagName("A");
j=0;
for (var i=0; i< hreftags.length ; i++){
//	hreftags[i].addEventListener("click",funtion(){mytabToggle,false);
	ancTag=hreftags[i];
	if ( ancTag.hasAttribute('onclick')){

		onclick=ancTag.getAttributeNode('onclick').value;
		
		if (onclick.indexOf("mtab") >0 ){

			newonclick=onclick.replace("tabToggle","mytabToggle");
			evalStr="ancTag.removeEventListener('click',function(){"+onclick+";},false);";
			eval(evalStr);
			ancTag.getAttributeNode('onclick').value="";
//			alert(ancTag.getAttributeNode('onclick').value);
		//	ancTag.getAttributeNode('onclick').value=newonclick;
		//	alert(ancTag.getAttributeNode('onclick').value);

			evalStr="ancTag.addEventListener('click',function(){"+ newonclick +" ; },false);";
//			alert(evalStr);
			eval(evalStr);
			/*var onclick=hreftags[i].onclick;
			var mtabIndex =onclick.indexOf("mtab") ;
			var mtabEndIndex=0;
			if ( mtabIndex > 0 ) {
				mtabEndIndex = onclick.indexOf("\"",mtabIndex);
			}
			var mtabID = onclick.substring(mtabIndex,mtabEndIndex);
			var newOnclick=onclick + ";" + "document.getElementById("+mtabID+").style.width='100%';";
			*/
			//hreftags[i].onclick = "";

			j++;
		}
	}
}
// fix the treemenu UL at the top
var treemenu=document.getElementById("anil");
//treemenu.innerHTML="Removed by Narayan";
/*
var ultags = treemenu.getElementsByTagName("ul");
alert(ultags.length);
for (var i=0; i< ultags.length ; i++){
		ultags[i].style.width=80;
		ultags[i].style.backgroundColor="yellow";
		
}
*/
window.addEventListener('resize',gm_setWid,false);
gm_setWid();
function testresizek(e){
	if (!e) e=window.event;
	alert(e.type);
	return true;
}
// blow the first table, advert
var bodytag=document.getElementsByTagName("body");
nl = bodytag[0].childNodes; // get all childnodes
// remove the first root level table

for (i=0; i< nl.length ;i++){
	if ( nl[i].nodeName.toLowerCase()=="table"){
		for (j=0; j<5; j++){
			nl[i+j].parentNode.removeChild(nl[i+j]);
		}
		
		break;
	}
}
nl = bodytag[0].childNodes; // get all childnodes

// blow away last 4 nodes as well
nllength=nl.length;
for (i=nllength-1; i > nllength-5 ;i--){
	nl[i].parentNode.removeChild(nl[i]);
}


//alert("finished");
/*
widthStr="";
var bodytag=document.getElementsByTagName("body");
alert(maxw);
alert(recWidthAnalyse(bodytag[0]));

function recWidthAnalyse(nodeItem){
	var widthStr="";
	//alert(nodeItem.nodeName);
	if ( nodeItem.hasChildNodes() ){
		var cnlist = nodeItem.childNodes;
		var cnlength=cnlist.length;
		for (var i=0; i< cnlist.length ; i++) {
			if (cnlist[i].nodeType==1){
				var wid= recWidthAnalyse(cnlist[i]);
				if(wid != "" ){
					widthStr=widthStr +":  " + wid;
				}
			}
//			alert(i+":"+cnlength);
		}
//		alert('forhere:'+i);
	}//else{ alert('nochild');}
	if ( nodeItem.style.width != "" ){
		var wid=parseInt(nodeItem.style.width);
		if(wid > 0){
		widthStr=wid+"::"+nodeItem.nodeName+":  "+widthStr;			
		if (wid > maxw){
			nodeItem.style.width=100;
			nodeItem.style.borderColor='red';
			nodeItem.style.borderStyle='solid';
			nodeItem.style.borderWidth='medium';
		}
		}
		//alert(widthStr);
	}
	//alert('test');
	return(widthStr);	
}
*/
function gm_setWid(){
	oldWidth=parseInt((screen.width/1.8)) ;
	newWidth=window.innerWidth/1.5;
	ulwidth=window.innerWidth/1.2;
	treeWidth=window.innerWidth/2;
	// get all div tags
	k=0;
	var divtags = document.getElementsByTagName("div");
	for (var i=0; i< divtags.length ; i++){
		curwidth=parseInt(divtags[i].style.width);
		if (curwidth != "" ){
	//	widthInt=curwidth.replace(/\..*px/,"");
//		if (curwidth== oldWidth){
			k++;
			divtags[i].style.width=newWidth;
//		}
		}
	}
	var ultags = document.getElementsByTagName("ul");

	for (var i=0; i< ultags.length ; i++){
			ultags[i].style.width=ulwidth;
		var ulultags = ultags[i].getElementsByTagName("ul");
		for (var j=0; j< ulultags.length ; j++){
				ulultags[j].style.width=60;
		}
	}

	// try re arranging the entire UL tag
	maxw=window.innerWidth-10;
	var pulltags = document.getElementById("idSearchForm");
	// get to the table
	var tabletags=pulltags.getElementsByTagName("table");
	for (var i=0; i< tabletags.length ; i++){
			tabletags[i].style.width=maxw;
	}

}
function mytabToggle(mainTabDivId, mainContentDivId, currTabDivId, currContentDivId)
{

  browser_type = navigator.appName;
  document.getElementById(mainContentDivId).style.width = newWidth;



  var ulobj = document.getElementById(mainTabDivId)
  var ulist = ulobj.getElementsByTagName("li")
  for (var x=0; x<ulist.length; x++)
  {
    var ulistlink = ulist[x].getAttribute("id")
    if(ulistlink == currTabDivId)
      document.getElementById(ulistlink).className = "selected";
    else
      document.getElementById(ulistlink).className = "";
  }

  var divobj  = document.getElementById(mainContentDivId)
  var divlist = divobj.getElementsByTagName("div")
  for (var x=0; x<divlist.length; x++)
  {
    if (browser_type == "Netscape" || browser_type == "Opera")
    {
      if(divlist[x].getAttribute("id") != null)
      {
        var divlistid = divlist[x].getAttribute("id")
        if(divlistid == currContentDivId)
          document.getElementById(divlistid).className = "selected";
        else
          document.getElementById(divlistid).className = "tabcontent";
      }
    }
    else if (browser_type == "Microsoft Internet Explorer")
    {
      if(divlist[x].getAttribute('id').charAt(0) != '')
      {
        var divlistid = divlist[x].getAttribute("id")
        if(divlistid == currContentDivId)
          document.getElementById(divlistid).className = "selected";
        else
          document.getElementById(divlistid).className = "tabcontent";
      }
    }
  }
}

