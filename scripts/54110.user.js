// ==UserScript==
// @name 			DeeRanged's Mousehunt Smart Hunter
// @namespace		DeeRanged
// @description		Smart Timer and Autohunter with sound alarms.
// @include        	http://apps.facebook.com/mousehunt/*
// ==/UserScript==
//===============================================================================

oldTitle = document.title;

var usr_chk_fr = GM_getValue('usr_chk_fr', false);
var usr_chk_pt = GM_getValue('usr_chk_pt', true);
var usr_chk_rk = GM_getValue('usr_chk_rk', true);
var usr_chk_k = GM_getValue('usr_chk_k', true);
var usr_ld_msg = GM_getValue('usr_ld_msg', true);

var usr_chk_ls = GM_getValue('usr_chk_ls', true);
var usr_chk_lp = GM_getValue('usr_chk_lp', true);
var usr_chk_tm_mh = GM_getValue('usr_chk_tm_mh', true);
var usr_chk_tm_fb = GM_getValue('usr_chk_tm_fb', false);
var usr_rm_fb = GM_getValue('usr_rm_fb', true);

function str2xml(strXML) { 
		//create a DOMParser
		var objDOMParser = new DOMParser();
		//create new document from string
		var objDoc = objDOMParser.parseFromString(strXML, "text/xml");
		return objDoc;
	}

var ALERT_SOUNDS = true; //Not needed just added for possible future use
var AUTO_REFRESH = true; //automatically refreshes browser window (useful when ALERT_SOUNDS is true)
var alertSound     = "http://www.the-earchives.com/wavs/S/simpsn93.wav";
var warningSound   = "http://www.the-earchives.com/wavs/S/simpsn448.wav";
var WARNING_VOLUME = "50";   // "0" = silent "100" = full volume
var ALERT_VOLUME   = "100";   // "0" = silent "100" = full volume

function playSound(sound, volume) {
  var body = document.getElementsByTagName("body")[0];
  var emb = document.createElement("embed");
  emb.src = sound;
  emb.setAttribute("autostart", "true");
  emb.setAttribute("loop", "false");
  emb.setAttribute("hidden", "true");
  emb.setAttribute("volume", volume);
  body.appendChild(emb);
}


//===============================================================================
//			START - Drag Objects -
//===============================================================================

function $(id) {
  return document.getElementById(id);
}

function pausecomp(millis)
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
} 

function setMin()
{
	if (MsgObj==null && sMsg!=null)
		{
		sMsg-=5;
		}
	else if (MsgObj!=null)
		sMsg =MsgObj.value;
	else	sMsg = -99999;

	if (sMsg == -99999)
		{}
		
	else if (document.title.indexOf("Claim a King")!=-1)
	 {playSound(warningSound, ALERT_VOLUME);
	 }
		
	else if (sMsg<=0)
		{document.getElementById('mh_min').innerHTML = '<a href=http://apps.facebook.com/mousehunt/soundthehorn.php>It\'s time to sound the horn!</a>';
		  playSound(alertSound, ALERT_VOLUME);
		  pausecomp(500);
   //calculate timeoutvalue in milliseconds
   //timervalue is in seconds, so convert that, and add on [2,32) seconds randomly 
   //the random time is to help keep it less obvious mostly.
   timeoutvalue = (parseInt(sMsg) + Math.round(Math.random() * 30) + 2) * 1000;
   
   //alert("refresh in " + timeoutvalue );
   setTimeout(function() {document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php';} , timeoutvalue);
}
		  
	else
		{var mh_min = Math.floor(sMsg/60);
		var mh_sec = sMsg%60;
		if (mh_sec<10)
			mh_sec = '0'+mh_sec;
		document.getElementById('mh_min').innerHTML = 'Next horn <span style=font-size:18pt><b>'+mh_min+':'+mh_sec+'</b></span> min';

		}
	

	setTimeout(setMin,5000);	
}

var MsgObj, sMsg;

function printMsg() {

if (document.location.href.indexOf("topic.php?")==-1 && document.location.href.indexOf("board.php?")==-1 && document.location.href.indexOf("apps.facebook.com/mousehunt")==-1 )
	return;

if (MsgObj!=null)
	return;

if (usr_chk_tm_mh)
	{
	var AllInputs = document.getElementsByTagName("input");
	for(i = 0; i< AllInputs.length; i++)
   
		{

		if(AllInputs[i].id.indexOf("hornWaitValue") !=-1)

			{MsgObj=AllInputs[i];
			break;}
		}
	
	if (MsgObj==null && !usr_chk_tm_fb)
		return;
	}
	
	var oDate = new Date();
	var sWhen = oDate.toLocaleString() + "\n";
	var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
	
	// here we generate a link which closes the message
	var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttq_message\").parentNode.removeChild(document.getElementById(\"ttq_message\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' border=0 alt='X' /></a>";
	
	var oMsgBox = document.createElement("div");
	
	//GM_setValue("MSG_POSITION", "50px_50px");
	var msgCoords = GM_getValue("MSG_POSITION", "45px_300px");
	msgCoords = msgCoords.split("_");
	oMsgBox.style.position = 'absolute';
	oMsgBox.style.top = msgCoords[0];
	oMsgBox.style.left = msgCoords[1];

	oMsgBox.id = "ttq_message";
	oMsgBox.innerHTML = "<div id='ttq_draghandle_msg' style='position:absolute; z-index:100; border:1px solid black; padding:5px 5px; color:black; font:10pt Verdana; width:250px;cursor:move;'>" + sLinkClose + " <span id=mh_min></span></div>";
	
	document.body.appendChild(oMsgBox);


	makeDraggable($('ttq_draghandle_msg'));

	//alert(msgCoords);
	//alert(oMsgBox.style.top); 
	setMin();

//var mh_start_date = res.match(/<li><span class=["]label["]>Hunting Since<[/]span>: (.+)<[/]li>/)[1];
		
}




if (usr_chk_tm_mh && document.location.href.indexOf("apps.facebook.com/mousehunt")!=-1)
	printMsg();


/************************ Drag n drop*******************************/
var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
	return {x:ev.pageX, y:ev.pageY};
}

function makeClickable(object){
	object.onmousedown = function(){
		dragObject = this;
	}
}

function getMouseOffset(target, ev){
	var docPos    = getPosition(target);
	var mousePos  = mouseCoords(ev);
	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function getPosition(e){
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	return {x:left, y:top};
}

function mouseMove(ev){
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
		dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
	}
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev){
	if(dragObject) {
		
	GM_setValue("MSG_POSITION", dragObject.style.top +"_"+ dragObject.style.left);
	}
	dragObject = null;
	iMouseDown = false;
}

function mouseDown(ev){	
var mousePos = mouseCoords(ev);
	var target = ev.target;
	iMouseDown = true;	
	if(target.getAttribute('DragObj')){
		return false;
	}	
}

function makeDraggable(item){
	if(!item) return;
	item.addEventListener("mousedown",function(ev){
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this.parentNode, ev);
		return false;
	}, false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);