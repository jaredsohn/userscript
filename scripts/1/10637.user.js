// ==UserScript==
// @name           TradeMe NicePost
// @namespace      http://www.girlza.com/
// @include        http://www.trademe.co.nz/Community/MessageBoard/Post.aspx*
// ==/UserScript==

//Remove the ads and evil trackers
//(for those who don't use AdBlock)

var ad = document.getElementById('topAd');
if (ad) {
    ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('rsTrackingBug');
if (ad) {
    ad.parentNode.removeChild(ad);
}

var ad = document.getElementById('sideAd');
if (ad) {
    ad.parentNode.removeChild(ad);
}



head=document.getElementsByTagName('head')[0];


tds = document.evaluate(
	"//td[@id='mainContent']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
tdMainContent=tds.snapshotItem(0);

formMainContent=tdMainContent.getElementsByTagName('form')[0];

tableMainContent=formMainContent.getElementsByTagName('table')[0];
tableMainContent.width="90%";

tbodyMainContent=tableMainContent.getElementsByTagName('tbody')[0];
trMainContent=tbodyMainContent.getElementsByTagName('tr')[0];

tdPostingBlurb=trMainContent.getElementsByTagName('td')[0];

for (var i = 0; i < tdPostingBlurb.childNodes.length; i++) {

	if(tdPostingBlurb.childNodes[i].nodeName!="CENTER") {
		tdPostingBlurb.removeChild(tdPostingBlurb.childNodes[i]);
		i--;
	}
}

firstCentre=tdPostingBlurb.getElementsByTagName('center')[0];
secondCentre=tdPostingBlurb.getElementsByTagName('center')[1];
firstHR=firstCentre.getElementsByTagName('hr')[0];

    previewTitle= document.createElement('div');
	firstHR.parentNode.insertBefore(previewTitle, firstHR.nextSibling);
	
	previewTitle.setAttribute("id", "previewDiv");
	previewTitle.setAttribute("style", "display:none");
	previewTitle.innerHTML="<p align=\"left\"><img id=\"previewIcon\"><b><font color=\"#800080\" id=\"previewTitle\"></font></b><br/><span id=\"previewMessage\"></span></p>";
	today = new Date( );
	hours=today.getHours( );
	minutes=today.getMinutes( );
	if (minutes<10) {minutes="0"+String(minutes);}
	merid="am";
	if (hours>12) {hours-=12; merid="pm";}
	if (hours==12) {merid="pm";}
	date=today.getDate( );
	month=today.getMonth( );
	var monthname=new Array;
	monthname[1]="Jan";
	monthname[2]="Feb";
	monthname[3]="Mar";
	monthname[4]="Apr";
	monthname[5]="May";
	monthname[6]="Jun";
	monthname[7]="Jul";
	monthname[8]="Aug";
	monthname[9]="Sep";
	monthname[10]="Oct";
	monthname[11]="Nov";
	monthname[12]="Dec";
	previewTitle.innerHTML+="<div align=\"right\" width=300><font color=\"#666666\">Previewed at <span id=\"date\">"+hours+":"+minutes+" "+merid+", "+date+" "+monthname[month+1]+"</span></font></div><hr>";

tableForMessage=tdPostingBlurb.getElementsByTagName('table')[0];
tableForMessage.width="90%";

textArea=tableForMessage.getElementsByTagName('textarea')[0];
textArea.style.width="99%";
textArea.setAttribute("id", "messagebox");
textArea.setAttribute("onchange", "document.getElementById(\"previewMessage\").innerHTML=document.getElementById(\"messagebox\").value.replace(/</g,\"&lt;\");");

subjectbox=tableForMessage.getElementsByTagName('input')[0];
subjectbox.style.width="99%";
subjectbox.setAttribute("id", "subjectbox");
subjectbox.setAttribute("onchange", "document.getElementById(\"previewTitle\").innerHTML=document.getElementById(\"subjectbox\").value.replace(/</g,\"&lt;\");");


//Add code to show or hide preview
secondCentre.innerHTML+="<input type=\"checkbox\" id=\"previewcheck\" >Show Preview</input>";
previewcheck=document.getElementById("previewcheck");
previewcheck.setAttribute("onchange", "if(previewcheck.checked==false) {document.getElementById(\"previewDiv\").style.display='none';} else {document.getElementById(\"previewDiv\").style.display='';}");

/* Smileys */
IconsDiv=document.getElementById("IconsDiv");
MoreIconsDiv=document.getElementById("MoreIconsDiv");

//show a link that hides extra smileys
MoreIconsDiv.innerHTML+="<small><a href=\"#\" onclick=\"ToggleLayer('MoreIconsDiv', 0); ToggleLayer('IconsDiv', 1);	ToggleRadio('0');\">less...</a></small>";

//get smileys to update stuff
Smileys=IconsDiv.getElementsByTagName("input");
MoreSmileys=MoreIconsDiv.getElementsByTagName("input");
for (var e = 0; e < Smileys.length; e++) {
	//Smileys
	Smileys[e].setAttribute("onchange", "document.getElementById(\"previewIcon\").src=\"http://www.trademe.co.nz/images/icons/"+Smileys[e].value+".gif\"");
}
for (var e = 0; e < MoreSmileys.length; e++) {
	//More Smileys
	MoreSmileys[e].setAttribute("onchange", "document.getElementById(\"previewIcon\").src=\"http://www.trademe.co.nz/images/icons/"+MoreSmileys[e].value+".gif\"");
}