// ==UserScript==
// @name           LA - Total Stamina
// @namespace      Legendarena
// @description    Calculates the total stamina of a clan
// @include        http://legendarena.com/clan.php?action=members
// @include        http://legendarena.com/clanlist.php?showclan=*
// ==/UserScript==


var allLinks, thisLink, newElement,xmlhttp,profile, per ,s, stam, total, total2, avg;

function getStamina(url)
{
	xmlhttp=new XMLHttpRequest()
	xmlhttp.open("GET",url,false);
	xmlhttp.send(null);
	
	profile=xmlhttp.responseText;
	a=profile.lastIndexOf("Stamina:");
	
	profile=profile.substring(a+2,a+25);
	
	
	
	b=profile.lastIndexOf("/");
	a=profile.indexOf(":");
	
	
	return parseInt(profile.substring(a+6,b));
	
}

function loadRating (url)
{
	xmlhttp=new XMLHttpRequest()
	xmlhttp.open("GET",url,false);
	xmlhttp.send(null);
	
	profile=xmlhttp.responseText;
	a=profile.indexOf("Win Percent:");
	b=profile.indexOf("Latest Win");
	
	
	return profile.substring(a+17,b-7);
}


function stamina(text)
{
	b=text.lastIndexOf("/");
	a=text.indexOf(":");
	return parseInt(text.substring(a+2,b));
}	


if (document.location.href=='http://legendarena.com/clan.php?action=members')
{

total=0;
total2=0;
avg=0;

allLinks = document.evaluate(
    '//tr//td[@width="30%"]//a[@title]',
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

	//loadRating (thisLink.href);
	percentage=loadRating (thisLink.href);
	thisLink.innerHTML=thisLink.innerHTML+' <font color="white">'+percentage+'</font>';
	//GM_log (thisLink.title);
	stam=stamina(thisLink.title);
	total+=stam;
	total2+=stam*parseFloat(percentage)/100*8;
	avg+=parseFloat(percentage);

}
	
	avg/=i;
    newElement = document.createElement('text');
	newElement.innerHTML="</br>The clan's average offensive win rate is: "+avg.toFixed(2)+"</br></br>The combined stamina of all members is <b>"+total+"</b> which equals to a maximum of <b>"+total*8+"</b> warpoints</br></br>Based on the curent win percentage the estimated WP gain would be <b>"+Math.round(total2)+"</b>";
    thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(newElement, thisLink.parentNode.parentNode.parentNode.parentNode.nextSibling);
}
else
{

	total=0;
	
	allLinks = document.evaluate(
    '//td[@width="70%"]//a[@href]',
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	thisLink = allLinks.snapshotItem(1);
	
	newElement = document.createElement('text');
	newElement.innerHTML="CALCULATING TOTAL STAMINA. PLEASE WAIT...</BR></BR>";
    thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(newElement, thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);	
	
	
	for (var i = 1; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	stam=getStamina(thisLink.href);	
	total+=stam;
	newElement.innerHTML="CALCULATING TOTAL STAMINA. PLEASE WAIT..."+parseInt((i+1)/allLinks.snapshotLength*100)+"%</BR></BR>";
	
	}
	
	//newElement = document.createElement('text');
	newElement.innerHTML="</b>The combined stamina of all members is <b>"+total+"</b> which equals to a maximum of <b>"+total*8+"</b> warpoints</br></br>";
    //thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(newElement, thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);	
}