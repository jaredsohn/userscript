// ==UserScript==
// @name           erepHelp
// @namespace      taguri.com
// @include		http://ww*.erepublik.com/*
// @include		http://*erepublik.com/*
// ==/UserScript==

var countryList = new Array("Argentina", "Australia", "Austria", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Egypt", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Indonesia", "India", "Iran", "Ireland", "Israel", "Italy", "Japan", "Latvia", "Lithuania", "Malaysia", "Mexico", "Montenegro", "Netherlands", "New Zealand", "North Korea", "Norway", "Pakistan", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Republic of China (Taiwan)", "Republic of Macedonia (FYROM)", "Republic of Moldova", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "USA", "Venezuela");

var SUC_script_num = 111019; // Change this to the number given to the script by userscripts.org (check the address bar)

//get user name
var userInfo = GetUserName();

if(window.location.href == userInfo[1]){
	mercenaryCheck();
}

ShowLastMercenaryUpdate();
HideInvite();
window.setTimeout(removeExclamation, 100);

//show mercenary Countries
var allAnchorTags=document.getElementsByTagName("a");
// Loop through all tags using a for loop
for (i=0; i<allAnchorTags.length; i++){
	if ("logout" == allAnchorTags[i].className) 
	{
		var doneCountry = 0;
		for(j=0;j<countryList.length;j++)
		{		
			var killValue = GM_getValue(countryList[j], "0/25");
			if((killValue != "0/25") && (killValue != "25/25"))
			{
				newElement = document.createElement("span");
				newElement.innerHTML = '<br><span style="font-weight:bold; margin: 0 auto 0 auto; border-bottom: 0px solid #000000; margin-bottom: 0px; font-size: small;color: #FF6633;">' + '' +' '+countryList[j]+': '+GM_getValue(countryList[j], "0/0")+'</span>';
				allAnchorTags[i].parentNode.insertBefore(newElement, allAnchorTags[i].nextSibling)
			}
			else if((killValue == "25/25"))
			{
				doneCountry = doneCountry + 1;
			}
		}
		newElement = document.createElement("span");
		newElement.innerHTML = '<br><span style="font-weight:bold; margin: 0 auto 0 auto; border-bottom: 0px solid #000000; margin-bottom: 0px; font-size: small;color: #FF9933;"> Done: ' +doneCountry+'<br></span>';
		allAnchorTags[i].parentNode.insertBefore(newElement, allAnchorTags[i].nextSibling)	
	}
}
function ShowLastMercenaryUpdate(){
	var allAnchorTags=document.getElementsByTagName("a");
	// Loop through all tags using a for loop
	for (i=0; i<allAnchorTags.length; i++){
		if ("logout" == allAnchorTags[i].className) 
		{
			var datum = new Date(parseInt(GM_getValue('MERCENARY_last_update','0')));
			newElement = document.createElement("span");
			newElement.innerHTML = '<br><span style="font-weight:bold; margin: 0 auto 0 auto; border-bottom: 0px solid #000000; margin-bottom: 0px; font-size: small;color: #348017;">Mercenary Update: <br>' + datum.toDateString() + '<br/>' + datum.toLocaleTimeString() +'</span><br>';
			allAnchorTags[i].parentNode.insertBefore(newElement, allAnchorTags[i].previousSibling);
		}
	}
}
function UpdateMercenaryList(){
	var allLiTags=document.getElementsByTagName("li");
	for (index=0; index<allLiTags.length; index++) 
	{
		if (Contains(countryList, allLiTags[index].title)) 
		{
			GM_setValue(allLiTags[index].title, allLiTags[index].childNodes[5].innerHTML);
		}
	}
}
function removeExclamation() {
	//remove kicsi felkiáltójel
	var pointImgTag=document.getElementById("point");
	pointImgTag.parentNode.removeChild(pointImgTag);
	
	var newPointImgTag=document.getElementById("point");
	if(newPointImgTag != null)
	{
		window.setTimeout(removeExclamation, 500);
	}
}
// show resolved countries in Campain and partly resolved countries
//if(window.location.href == "http://www.erepublik.com/en/military/campaigns"){
if(true){
	var allImgTags=document.getElementsByTagName("img");
	for (k=0; k<allImgTags.length; k++) 
	{
		if ("side_flags" == allImgTags[k].className) 
		{
			var killValue = GM_getValue(allImgTags[k].title, "0/25");
			if((killValue != "0/25") && (killValue != "25/25"))
			{
				newElement = document.createElement("span");
				newElement.innerHTML = '<img class="xbig" style="display: inline;" src="http://www.erepublik.com/images/modules/missions/pop.png" alt="" width="18">';
				allImgTags[k].parentNode.insertBefore(newElement, allImgTags[k].nextSibling);	
			}
		}
	}
	//done countries
	var allImgTags=document.getElementsByTagName("img");
	for (k=0; k<allImgTags.length; k++) 
	{
		if ("side_flags" == allImgTags[k].className) 
		{
			var killValue = GM_getValue(allImgTags[k].title, "0/25");
			if(killValue == "25/25")
			{
				newElement = document.createElement("img");
				newElement.setAttribute('src', 'http://www.erepublik.com/images/modules/news/icons/cat_7.png');
				newElement.setAttribute('class', '"mpp_sign one"');
				newElement.setAttribute('style', '"display: inline;"');
				newElement.setAttribute('border', '"5"');
				
				allImgTags[k].parentNode.insertBefore(newElement, allImgTags[k].nextSibling);
				
				allImgTags[k].setAttribute('border', '"5"');
				
			}
		}
	}
}

function Contains(myArray, strToCheck){
	var contains = false;
	for(idx=0;idx<myArray.length;idx++)
	{
		if(myArray[idx] == strToCheck)
		{
			contains = true;
		}
	}
	return contains;
}
function HideInvite(){
	var allDivTags=document.getElementsByTagName("div");
	for (i=0; i<allDivTags.length; i++){
		if ("user_invite" == allDivTags[i].className) 
		{
			allDivTags[i].style.display = "none";
		}
	}
}
function GetUserName(){
	var elem = new Array("", "");
	var allDivTags=document.getElementsByTagName("div");
	// Loop through all tags using a for loop
	for (idx1=0;idx1<allDivTags.length;idx1++){
		if ("user_info" == allDivTags[idx1].className) 
		{
			elem[0] = allDivTags[idx1].childNodes[1].innerHTML;
			elem[1] = allDivTags[idx1].childNodes[1].href; 
		}
	}
	return elem;
}	

function mercenaryCheck(){
	if ((parseInt(GM_getValue('MERCENARY_last_update', '0')) + 60000 <= (new Date().getTime()))) // Checks every minute (60 s * 1000 ms)
	{
		GM_setValue('MERCENARY_last_update', new Date().getTime()+'');
		UpdateMercenaryList();
	}
}	
function updateCheck(forced){
	if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
	{
		try
		{
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp)
				{
					var local_version, remote_version, rt, script_name;
					
					rt=resp.responseText;
					GM_setValue('SUC_last_update', new Date().getTime()+'');
					remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
					local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
					if(local_version!=-1)
					{
						script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
						GM_setValue('SUC_target_script_name', script_name);
						if (remote_version > local_version)
						{
							if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
							{
								GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
								GM_setValue('SUC_current_version', remote_version);
							}
						}
						else if (forced)
							alert('No update is available for "'+script_name+'."');
					}
					else
						GM_setValue('SUC_current_version', remote_version+'');
				}
			});
		}
		catch (err)
		{
			if (forced)
				alert('An error occurred while checking for updates:\n'+err);
		}
	}
}
updateCheck(false);
