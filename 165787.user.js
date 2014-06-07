// ==UserScript==
// @name           HV -get eid & BBCode
// @namespace      smishe
// @version        1.1
// @match          http://hentaiverse.org/?s=Bazaar&ss=es*
// @match          http://hentaiverse.org/?s=Bazaar&ss=fr*
// ==/UserScript==

//get equipment
var alleqdp,thiseqdp;
alleqdp = document.evaluate(
	".//div[@class='eqdp']",
	document.getElementById("item_pane"),
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

	
//add checkbox
for (var i = 0; i < alleqdp.snapshotLength; i++) {
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.style.cursor = "pointer";
	checkbox.style.position = "absolute";
	checkbox.style.left = 450 + "px"; 
	
	thiseqdp = alleqdp.snapshotItem(i);
	thiseqdp.parentNode.insertBefore(checkbox, thiseqdp.nextSibling);
}


//add get eid buttons 
var button1 = document.createElement("input");
button1.type = "button";
button1.value = "Get eid";
button1.id = "bn1";
button1.style.cursor = "pointer";
button1.style.position = "absolute";
button1.style.top = 0 + "px";
button1.style.left = 10 + "px";
document.getElementById("item_pane").appendChild(button1);


button1.onclick = function (){
	var eidlist = "";
	for(var i = 0; i < alleqdp.snapshotLength; i++){
		if(alleqdp.snapshotItem(i).nextSibling.checked){
			eidlist = eidlist + geteid(alleqdp.snapshotItem(i))+"<br />";
		}
	}
	if(eidlist!=""){
		sAlert(eidlist);
	}
}


//add get BBCode button
var button2 = document.createElement("input");
button2.type = "button";
button2.value = "Get BBCode";
button2.id = "bn2";
button2.style.cursor = "pointer";
button2.style.position = "absolute";
button2.style.top = 0 + "px";
button2.style.left = 90 + "px";
document.getElementById("item_pane").appendChild(button2);

button2.onclick = function (){
	var BBCodeList = "";
	for(var i = 0; i < alleqdp.snapshotLength; i++){
		if(alleqdp.snapshotItem(i).nextSibling.checked){
			var BBCode =  "[url=http://hentaiverse.org/pages/showequip.php?" + geteid(alleqdp.snapshotItem(i)) + "]"+ alleqdp.snapshotItem(i).textContent +"[/url]" ;
			BBCodeList = BBCodeList + BBCode + "<br />"
		}
	}if(BBCodeList!=""){
		sAlert(BBCodeList);
	}
}


//add selectAll checkbox
var checkboxall = document.createElement("input");
checkboxall.type = "checkbox";
checkboxall.style.cursor = "pointer";
checkboxall.style.position = "absolute";
checkboxall.style.top = 0 + "px";
checkboxall.style.left = 450 + "px";
document.getElementById("item_pane").appendChild(checkboxall);

checkboxall.onclick  = function (){
	if(checkboxall.checked){
		for(var i = 0; i < alleqdp.snapshotLength; i++){
			alleqdp.snapshotItem(i).nextSibling.checked =true;
		}
	}else{
		for(var i = 0; i < alleqdp.snapshotLength; i++){
			alleqdp.snapshotItem(i).nextSibling.checked =false;
		}
	}
}

//get eid and key
function geteid(item){
	var eid =  item.getAttribute("onmouseover").match(/equips.+/)[0].match(/\(.+\)/)[0].match(/\w+/g)[0];
	var key =  item.getAttribute("onmouseover").match(/equips.+/)[0].match(/\(.+\)/)[0].match(/\w+/g)[1];
	return ("eid="+eid + "&key=" + key);
}



////////////////////////////////////////////////////////////////////////////////////
//below is a copied js alert function ,thanks to the original author !

function sAlert(str){
   var msgw,msgh,bordercolor;

   titleheight=25 
   bordercolor="#336699";
   titlecolor="#99CCFF";
 
   var sWidth,sHeight;
   sWidth=document.body.offsetWidth;
   sHeight=screen.height;
   var bgObj=document.createElement("div");
   bgObj.setAttribute('id','bgDiv');
   bgObj.style.position="absolute";
   bgObj.style.top="0";
   bgObj.style.background="#777";
   bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
   bgObj.style.opacity="0.6";
   bgObj.style.left="0";
   bgObj.style.width=sWidth + "px";
   bgObj.style.height=sHeight + "px";
   bgObj.style.zIndex = "10000";
   document.body.appendChild(bgObj);
   
   var msgObj=document.createElement("div")
   msgObj.setAttribute("id","msgDiv");
   msgObj.setAttribute("align","center");
   msgObj.style.background="white";
   msgObj.style.border="1px solid " + bordercolor;
   msgObj.style.position = "absolute";
   msgObj.style.left = "50%";
   msgObj.style.top = "50%";
   msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
   msgObj.style.marginLeft = "-340px" ;
   msgObj.style.marginTop = -300+document.documentElement.scrollTop+"px";

   msgObj.style.textAlign = "center";
   msgObj.style.lineHeight ="25px";
   msgObj.style.zIndex = "10001";
   
   var title=document.createElement("h4");
   title.setAttribute("id","msgTitle");
   title.setAttribute("align","right");
   title.style.margin="0";
   title.style.padding="3px";
   title.style.background=bordercolor;
   title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
   title.style.opacity="0.75";
   title.style.border="1px solid " + bordercolor;
   title.style.height="18px";
   title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
   title.style.color="white";
   title.style.cursor="pointer";
   title.innerHTML="Close";
   title.onclick=function(){
          document.body.removeChild(bgObj);
          document.getElementById("msgDiv").removeChild(title);
          document.body.removeChild(msgObj);
        }
   document.body.appendChild(msgObj);
   document.getElementById("msgDiv").appendChild(title);
   var txt=document.createElement("p");
   txt.style.margin="1em 0"
   txt.setAttribute("id","msgTxt");
   txt.innerHTML=str;
   document.getElementById("msgDiv").appendChild(txt);
}