// ==UserScript==
// @name           MySpacePicenlarge++
// @namespace      MySpacePicenlarge++
// @description    As you scroll over small MySpace photos, this script displays the enlarged photo plus a ton of user information with it.
// @include        *.myspace.com/*
// ==/UserScript==

//this ads a two second delay for other scripts to process.
if (window.location.href.indexOf("friends.myspace.com") > 0 ){
	window.setTimeout(process,0)
	}
else{
	window.setTimeout(process,2500)
}

function process(){
var CampaignID = "100";
var Capture = false;

//set this to true if you want data to be prefetched.
var preFetch = false;
var preFetchImages = false;

var bImageLinks = false;

var myID = '8200240'; //Put your own ID here.

var maxImgHeight = 450;
var maxImgWidth = 450;

//What to highlight
var hl_Gender = 'Female';  			//What gender to highlight, Male or Female
var hl_AgeMin = 16;					//What Minimum age to highlight
var hl_AgeMax = 39;					//What Maximum age to highlight
var hl_State = 'California';		//What State to highlight
var hl_Country = 'United States';	//What Country to highlight
var hl_loginDays = 15;				//Highlight if hasn't logged in, in these many days
var hl_friendCount = 3000;			//Hightlight if more than these many friends

//transparency for Image links
imgTrans = ".5";


//Don't edit bellow this line, unless you know what you're doing
//============================================================================================================================================

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#trailimageid {color: black !important; font-size: 10px !important; position: absolute; text-align: left !important; ' +
            'display: none; left:0px; top:0px; height: 0px; z-index: 2000 !important;} .searchImg {border: 1px solid #E0E0E0;}' +
			'#imageLinks {display:block; text-align:center !important; 1px solid !important; position:relative !important; top:-18px !important; z-index:100 !important; height:16px !important;}')

var allImages, thisImage, largeImage, largeImageHeight, myImage, theObj, thisLink, allLinks, description, thisDiv, allDivs, currentimageheight;
var friendStatus = '';
var globalTimer;

var circleIcon = document.createElement('img');
circleIcon.src = 'http://localhost/images/circle.gif'

var imgAdd = document.createElement('img');
imgAdd.src = 'http://localhost/images/add.png';

var imgFriends = document.createElement('img');
imgFriends.src = 'http://localhost/images/friends.png'

var imgPictures = document.createElement('img');
imgPictures.src = 'http://localhost/images/pics.png'

var newDiv2 = document.createElement('div');
newDiv2.id = 'trailimageid';
document.body.appendChild(newDiv2);

var friendInfo = ""

var newPathHolderDiv = document.createElement('div');
newPathHolderDiv.style.display="none";
newPathHolderDiv.id = 'pathHolderDiv';
var html2 = "";
newPathHolderDiv.innerHTML = html2;
document.body.appendChild(newPathHolderDiv);

//this Div is used for when we prefetch data
var imageHolderDiv = document.createElement('div');
imageHolderDiv.style.display="none";
imageHolderDiv.id = 'imageHolderDiv';
imageHolderDiv.style.visibility = "hidden";
document.body.appendChild(imageHolderDiv);

//this Div fills the entire screen and it's used for screen measurement
var fillDiv = document.createElement('div');
fillDiv.id = 'fillDiv';
fillDiv.style.visibility = "hidden";
//fillDiv.style.z-index = -1;
fillDiv.style.left = 0;
fillDiv.style.top = 0;
fillDiv.style.position = "fixed";
fillDiv.style.width = "100%";
fillDiv.style.height = "100%";
document.body.appendChild(fillDiv);

// on view more pics pages, this will remove the annoying titles
allLinks = document.evaluate(
    '//a[contains(@id, "UserViewPictureControl") or contains(@class, "msProfileLink")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null); 
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.title = '';
}
// removes the new friend helper on the new friend list.
allDivs = document.evaluate(
    '//div[contains(@class, "friendHelperBox")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);	
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	thisDiv.className = "";
    thisDiv.removeAttribute('onmouseover');
    thisDiv.removeAttribute('onmouseout');
}

var html3 = ""
var largeImageSrc = ""

//we gather up all images here
allImages = document.evaluate(
    '//img[contains(@src, "ac-images")]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null); 
 
for (var i = 0; i < allImages.snapshotLength; i++) {
    thisImage = allImages.snapshotItem(i);
    var src = thisImage.src;
    smallImage = thisImage.src;
    thisImage.id = "searchImg";
    thisImage.alt = "t" + i;

	if (thisImage.parentNode.href) {
	    var parentHref = thisImage.parentNode.href.toLowerCase();
	    var friendID = parentHref.substring(parentHref.indexOf('friendid=') + 9);
	    if (friendID.indexOf(friendID.match(/\D/)) > 0) {
	        friendID = friendID.substring(0, friendID.indexOf(friendID.match(/\D/)));
	    }
		//Add the image links for adding friend
		
		if (bImageLinks == true) {	
				var newDiv6 = document.createElement('div');
				newDiv6.id = 'imageLinks'
				//let's not show on very small images
				if (thisImage.width < 46 || thisImage.parentNode.href.indexOf(myID) > 0 ){
					newDiv6.style.visibility = "hidden"
				}
				newDiv6.style.width = thisImage.width + 'px';
				//newDiv6.style.left = findPosX(thisImage) + 'px';
				
				
				newDiv6.innerHTML = '<a href="http://friends.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID=' + friendID.replace(/^\s+|\s+$/g, '') + '"><img border="0" style="border:none !important; z-index:10 !important; width:16px; height:16px; opacity:' + imgTrans + ';" src="' + imgAdd.src + '" /></a>' +
									'&nbsp;<a href="http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends2&friendID=' + friendID.replace(/^\s+|\s+$/g, '') + '"><img border="0" style="border:none !important; z-index:10 !important; width:16px; height:16px; opacity:' + imgTrans + ';" src="' + imgFriends.src + '" /></a>' +
									'&nbsp;<a href="http://friends.myspace.com/index.cfm?fuseaction=user.viewAlbums&friendID=' + friendID.replace(/^\s+|\s+$/g, '') + '"><img border="0" style="border:none !important; z-index:10 !important; width:16px; height:16px; opacity:' + imgTrans + ';" src="' + imgPictures.src + '" /></a>';
				thisImage.parentNode.parentNode.insertBefore(newDiv6,thisImage.parentNode.nextSibling);
		}
	}
	thisImage.title = "";
    //store all image sources in the hidden Div
	largeImageSrc = getLargeSrc(thisImage.src);
    html2 = html2 + '\nLIt' + i + " " + largeImageSrc + '<br>';
    html2 = html2 + '\nFIt' + i + " " + friendID + '<br>';
	newPathHolderDiv.innerHTML = html2 + '\n';
	
	// this is run when we prefetch data
	if (preFetch == true) {
		var imgID = thisImage.alt;
		friendStat = '';
		getFriendship(imgID);
		fFetchData(imgID,friendID);
		if (preFetchImages == true){
			imageHolderDiv.innerHTML = imageHolderDiv.innerHTML + "\n<img src='" + largeImageSrc + "'><br>";
		}
	}
	 
    // set the mouseover and mouseout event listeners
    thisImage.addEventListener(
        'mouseover',
        function(event) {
            var imgID = this.alt;
			document.getElementById("trailimageid").innerHTML = "";
			document.getElementById("trailimageid").style.visibility = "visible";
			unsafeWindow.document.onmousemove = followmouse;
			globalTimer = window.setTimeout(function() { showtrail(imgID,this,friendID);}, 0);			
        },
        true);
 
    thisImage.addEventListener(
        'mouseout',
        function(event) {
			window.clearTimeout(globalTimer);
			document.getElementById("trailimageid").style.visibility = "hidden";
			description = "";
			unsafeWindow.document.onmousemove = followmouse2;
            window.setTimeout(function() { hidetrail(); }, true);
        },
        true);
	//imgID = this.alt;
	//window.setTimeout(function() { getDetail(imgID,this); }, 0);
}

//newPathHolderDiv.innerHTML = html2 + '\n';

function getLargeSrc(imgSrc){
    largeImage = imgSrc.replace("_m.jpg","_l.jpg");
    largeImage = largeImage.replace("/m_","/l_");
    largeImage = largeImage.replace("_s.jpg","_l.jpg");
    largeImage = largeImage.replace("/s_","/l_");
 
    return largeImage;
}

//this function find left position of element
function findPosX(obj)
  {
    var curleft = 0;
    if(obj.offsetParent)
        while(1) 
        {
          curleft += obj.offsetLeft;
          if(!obj.offsetParent)
            break;
          obj = obj.offsetParent;
        }
    else if(obj.x)
        curleft += obj.x;
    return curleft;
  }

//lets get the source from our storrage.
function getImgSrc(imgID){
	imgSrc = friendInfo.substring(friendInfo.indexOf("LI" + imgID) + ("LI" + imgID).length + 1,friendInfo.indexOf("<br>",friendInfo.indexOf("LI" + imgID)));
	return imgSrc;
}

function getFriendID(imgID){
	friendInfo = document.getElementById("pathHolderDiv").innerHTML;
	friendID = friendInfo.substring(friendInfo.indexOf("FI" + imgID) + ("FI" + imgID).length + 1,friendInfo.indexOf("<br>",friendInfo.indexOf("FI" + imgID)));
	return friendID;
}

function showtrail(imgID,me){
	friendStatus = '';
	getFriendship(imgID);
	friendID = getFriendID(imgID)
    imgSrc = getImgSrc(imgID);
    newLargeImage = new Image();
    newLargeImage.src = getImgSrc(imgID);
	waitFor(newLargeImage);
    getDetail(imgID,me,friendID);
}
function hidetrail(){
	//document.onmousemove="";
    document.getElementById("trailimageid").style.innerHTML = " ";
    document.getElementById("trailimageid").style.display="none";
    document.getElementById("trailimageid").left="-500px";
	document.getElementById("trailimageid").innerHTML = "";
	description = "";
}

function waitFor(img){
	currentimageheight = '';
    currentimagewidth = '';
    if(!img.complete){
        imgWait=window.setTimeout(function(){waitFor(img);}, 50);
    }
    else{
        height = newLargeImage.height;
        width = newLargeImage.width;
        if (height > maxImgHeight) {
            width = width * (maxImgHeight / height);
            height = maxImgHeight;
        }
        if (width > maxImgWidth) {
            height = height * (maxImgWidth / width);
            width = maxImgWidth;
        }
		if (height < 300){
			height = 300;
		}
    currentimageheight = height;
    currentimagewidth = width;
    }
}

//this function will get friendship status
function getFriendship(imgID){
var html;
html = '';
GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://friends.myspace.com/index.cfm?fuseaction=user.viewProfile_commentForm&friendID=' + getFriendID(imgID),
		headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
		onload: function(responseDetails) {
			friendStatus = '';
			var html = responseDetails.responseText.replace(/\t|\r|\n|\s\s/g,'');
			if (html.indexOf('friend to make comments about them') > 0){
				friendStatus = '<font color="green">Is NOT a friend</font>';
			}
			else {
				friendStatus = '<font color="green">Is a friend</font>';
			}
		},
	})
}

//this function will be used for date comparison
function getDateObject(dateString,dateSeperator)
{
	//This function return a date object after accepting 
	//a date string ans dateseparator as arguments
	var curValue=dateString;
	var sepChar=dateSeperator;
	var curPos=0;
	var cDay,cMonth,cYear;

	//extract day portion
	curPos=dateString.indexOf(sepChar);
	cMonth=dateString.substring(0,curPos);
	
	//extract month portion				
	endPos=dateString.indexOf(sepChar,curPos+1);			
	cDay=dateString.substring(curPos+1,endPos);

	//extract year portion				
	curPos=endPos;
	endPos=curPos+5;			
	cYear=curValue.substring(curPos+1,endPos);
	
	//Create Date Object
	dtObject=new Date(cYear,cMonth - 1,cDay);	
	return dtObject;
}

//this is where we gather up the information			
function getDetail(imgID,me,friendID){
	description = '';
	newHTML = '';
	newHTML = '<div style="padding: 5px; border:0px;">';
	newHTML = newHTML + '<div align="center" style="padding: 2px 2px 2px 2px;">';
	newHTML = newHTML + '<img src="' + circleIcon.src + '" border="0"></div>';
	newHTML = newHTML + '</div>';
	document.getElementById("trailimageid").innerHTML = newHTML;
	document.getElementById("trailimageid").style.display="inline";
    var fiInfo = document.getElementById("pathHolderDiv").innerHTML;
    if (fiInfo.indexOf('<fi' + friendID + '>') > 0) {  
        description = fiInfo.substring(fiInfo.indexOf('<fi' + friendID + '>') + friendID.length + 4,fiInfo.indexOf('</fi', fiInfo.indexOf('<fi' + friendID + '>')));
        finalDiv(imgID,imgSrc,description,me,friendID,'');
    }
    else{
        theObj=me;
		window.setTimeout(function() {finalDiv(imgID,imgSrc,'',me,friendID,newHTML);},0);
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=' + friendID,
            headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
            onload: function(responseDetails) {
                var html = responseDetails.responseText.replace(/\t|\r|\n|\s\s/g,'');
				fParseData(html,friendID);				
				window.setTimeout(function() {finalDiv(imgID,imgSrc,description,me,friendID,'');},0);
				
                newPathHolderDiv.innerHTML = newPathHolderDiv.innerHTML + '<FI' + friendID + '>' + description + '</FI' + friendID + '>\n';
				friendID = "";
            },
        });
    }
}

function fPostData(friendID, name, gender2, age2, city, state2, country2, lastLogin2, friendCount, commentCount, status, orientation, hometown, bodyType, ethnicity2, religion2, zodiac, drink, children, education, occupation, income, friendStatus){
	var data = ""
	data = "CampaignID=" + CampaignID + "&MemberID=" + friendID + "&Name=" + name + "&Gender=" + gender2 + "&Age=" + age2 + "&City=" + city + "&State=" + state2 + "&Country=" + country2;
	data = data + "&LastLogin=" + lastLogin2 + "&Friends=" + friendCount + "&Comments=" + commentCount + "&Status=" + status + "&Orientation=" + orientation;
	data = data + "&HomeTown=" + hometown + "&BodyType=" + bodyType + "&Ethnicity=" + ethnicity2 + "&Religion=" + religion2 + "&Zodiac=" + zodiac;
	data = data + "&Drink=" + drink + "&Children=" + children + "&Education=" + education + "&Occupation=" + occupation + "&Income=" + income;
	data = data + "&FriendStat=" + friendStatus;
	data = data.replace(/\'/g,"''").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/<wbr>/g,"");
	//GM_log(data);
	GM_xmlhttpRequest({
    method: "POST",
    url: "http://localhost/FriendUpdate.asp",
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
		//GM_log(responseDetails.responseText);	
	},
  });
}


function fFetchData(imgID,friendID){
	description = '';
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://friends.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=' + friendID,
		headers: {'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8) Gecko/20071008 Firefox/2.0.0.8'},
		onload: function(responseDetails) {
			var html = responseDetails.responseText.replace(/\t|\r|\n|\s\s/g,'');
			fParseData(html,friendID);			
			newPathHolderDiv.innerHTML = newPathHolderDiv.innerHTML + '<FI' + friendID + '>' + description + '</FI' + friendID + '>\n';
			friendID = "";
			
		},
	});
} 

function fParseData(html,friendID) {
	
	if (html.indexOf("Profile Views") > 0 || html.indexOf("Invalid Friend ID") >0 || html.indexOf('<div class="basicInfoDetails"><h2>') > 0) {
		description = '<font style="color:red;" color="red">Band Or Invalid ID Or Profile 2.0</font>';
	} else {				
		//break up the basic info and apply highlighting
		var gender = "";
		var age = "";
		var city = "";
		var state = "";
		var country = "";
		var lastLogin = "";
		var gender2 = "";
		var gender2 = "";
		var age2 = "";
		var city2 = "";
		var state2 = "";
		var country2 = "";
		var lastLogin2 = "";
		var str1 = '<td class="text" width="193" bgcolor="#ffffff" height="75" align="left">';
		var isOnline = '<br><img src="http://x.myspace.com/images/onlinenow.gif" id="ctl00_Main_ctl00_UserBasicInformation1_OLNClient_OnlineImage" class="ImgOnlineNow" alt="Is Online" /><br>';
		description = html.substring(html.indexOf("<br /><br />", html.indexOf(str1)) + 12,html.indexOf("</td>",html.indexOf("Last Login:",
						html.indexOf(str1)))).replace(/<br \/>/g,'<br>').replace(/<br><br><br><br>/g,
						'<br>').replace('Last Login:', 'Last Login:<br />').replace(isOnline + '<br>', '');
		gender2 = description.substring(0, description.indexOf('<br>'));
		description = description.replace(gender2 + '<br>', '');
		age2 = description.substring(0,description.indexOf(' years old<br>'));
		description = description.replace(age2 + ' years old<br>','');
		city = description.substring(0,description.lastIndexOf(','));
		description = description.replace(city + ', ','');
		state2 = description.substring(0,description.indexOf('<br>'));
		description = description.replace(state2 + '<br>','');
		country2 = description.substring(0,description.indexOf('<br>'));
		description = description.replace(country2 + '<br>Last Login:<br />','');
		lastLogin2 = description.substring(0,description.indexOf('<br>')).replace('<span class="searchMonkey-lastLogin">','').replace('</span>','');
		if (gender2 == hl_Gender){
			gender = '<font color="green">' + gender2 + '</font><br>';
		}else{
			gender = '<font color="green">' + gender2 + '</font><br>';
		}
		
		if ((age2 >= hl_AgeMin && age2 <= hl_AgeMax) || age2 >= 60){
			age = '<font color="green">' + age2 + ' years old</font><br>';
		}else{
			age = '<font color="red">' + age2 + ' years old</font><br>';
		}
		if (state2.toLowerCase() == hl_State.toLowerCase()){
			state = '<font color="green">' + state2 + '</font><br>';
		}else{
			state = '<font color="red">' + state2 + '</font><br>';
		}
		if (country2.toLowerCase() == hl_Country.toLowerCase()){
			country = '<font color="green">' + country2 + '</font><br>';
		}else{
			country = '<font color="red">' + country2 + '</font><br>';
		}
		//This is where we calculate the login date
		today = new Date();
		dt1=getDateObject(lastLogin2,"/");
		if (((today - dt1) / 86400000) < hl_loginDays) {
			lastLogin = '<font color="green">' + lastLogin2 + '</font>';
		}else{
			lastLogin = '<font color="red">' + lastLogin2 + '</font>';
		}
		var name = "";
		var hasFriends = "";
		var hasComments = "";
		var status = "";
		var orientation = "";
		var hometown = "";
		var bodyType = "";
		var ethnicity = "";
		var religion = "";
		var ethnicity2 = "";
		var religion2 = "";
		var zodiac = "";
		var drink = "";
		var children = "";
		var education = "";
		var occupation = "";
		var income = "";
		var friendStat = "";
		
		friendStat = getFriendship(imgID);
		if (html.indexOf('"myspace:friendCount">') > 0){
			friendCount = html.substring(html.indexOf('"myspace:friendCount">') + 22, html.indexOf('</span>', html.indexOf('"myspace:friendCount">')));
			if (friendCount < hl_friendCount && friendCount > 15) {					
				hasFriends = '<hr color="#b2b4bf"><font color="green">' + friendCount + ' friends</font>';
			}else{
				hasFriends = '<hr color="#b2b4bf"><font color="red">' + friendCount + ' friends</font>';
			}
			if (html.indexOf('f<span class="redtext">') > 0){						
				commentCount = html.substring(html.indexOf('f<span class="redtext">') + 24, html.indexOf(' </span>', html.indexOf('f<span class="redtext">')));
				if (parseInt(friendCount) < parseInt(commentCount) * 3) {
					hasComments = '<br><font color="green">' + commentCount + ' comments</font><hr color="#b2b4bf">';
				}else {
					hasComments = '<br><font color="red">' + commentCount + ' comments</font><hr color="#b2b4bf">';
				}
			}
			if (html.indexOf('ProfileStatus') > 0){
				status = html.substring(html.indexOf('>',html.indexOf('ProfileStatus')) + 1, html.indexOf('</td>', html.indexOf('ProfileStatus')));
			}
			if (html.indexOf('ProfileOrientation') > 0){
				
				orientation = html.substring(html.indexOf('>',html.indexOf('ProfileOrientation')) + 1, html.indexOf('</td>', html.indexOf('ProfileOrientation')));
			}
			if (html.indexOf('ProfileHometown') > 0){
				hometown = html.substring(html.indexOf('>',html.indexOf('ProfileHometown')) + 1, html.indexOf('</td>', html.indexOf('ProfileHometown')));
			}
			if (html.indexOf('ProfileBody type') > 0){
				bodyType = html.substring(html.indexOf('>',html.indexOf('ProfileBody type')) + 1, html.indexOf('</td>', html.indexOf('ProfileBody type')));
			}
			if (html.indexOf('ProfileEthnicity') > 0){
				ethnicity2 = html.substring(html.indexOf('>',html.indexOf('ProfileEthnicity')) + 1, html.indexOf('</td>', html.indexOf('ProfileEthnicity')));
				if (ethnicity2 == 'Middle Eastern') {
					ethnicity = "<font color='green'>" + ethnicity2 + "</font>";
				} else {
					ethnicity = "<font color='red'>" + ethnicity2 + "</font>";
				}
			}
			if (html.indexOf('ProfileReligion') > 0){
				religion2 = html.substring(html.indexOf('>',html.indexOf('ProfileReligion')) + 1, html.indexOf('</td>', html.indexOf('ProfileReligion')));
				if (religion2 == 'Muslim') {
					religion = "<font color='green'>" + religion2 + "</font>";
				}else {
					religion = religion2;
				}
			}
			if (html.indexOf('ProfileZodiac') > 0){
				zodiac = html.substring(html.indexOf('>',html.indexOf('ProfileZodiac')) + 1, html.indexOf('</td>', html.indexOf('ProfileZodiac')));
				zodiac = zodiac.replace(zodiac.substring(zodiac.indexOf('<a href='),zodiac.indexOf('>',zodiac.indexOf('<a href=')) + 1),'').replace('</a>','');
			}
			if (html.indexOf('ProfileSmoke') > 0){
				drink = html.substring(html.indexOf('>',html.indexOf('ProfileSmoke')) + 1, html.indexOf('</td>', html.indexOf('ProfileSmoke')));
			}
			if (html.indexOf('ProfileChildren') > 0){
				children = html.substring(html.indexOf('>',html.indexOf('ProfileChildren')) + 1, html.indexOf('</td>', html.indexOf('ProfileChildren')));
			}
			if (html.indexOf('ProfileEducation') > 0){
				education = html.substring(html.indexOf('>',html.indexOf('ProfileEducation')) + 1, html.indexOf('</td>', html.indexOf('ProfileEducation')));
			}
			if (html.indexOf('ProfileOccupation') > 0){
				occupation = html.substring(html.indexOf('>',html.indexOf('ProfileOccupation')) + 1, html.indexOf('</td>', html.indexOf('ProfileOccupation')));
			}
			if (html.indexOf('ProfileIncome') > 0){
				income = html.substring(html.indexOf('>',html.indexOf('ProfileIncome')) + 1, html.indexOf('</td>', html.indexOf('ProfileIncome')));
			}
		}
		name = html.substring(html.indexOf('class="nametext">') + 17, html.indexOf('</span>',html.indexOf('class="nametext">')));
		description = '<font style="color:black;" color="black">' + name + '<hr color="#b2b4bf">' + gender + age + city + '<br>' + state + country + lastLogin + '<br>' +
					friendStatus + '<br>' + hasFriends + hasComments + status + '<br>' + orientation + '<br>' + hometown + '<br>' + 
					bodyType + '<br>' + ethnicity + '<br>' + religion + '<br>' + zodiac + '<br>' + drink + '<br>' + children + '<br>' + education + '<br>' +
					occupation + '<br>' + income + '<hr color="#b2b4bf"></font>';
		description = description.replace(/<br><br>/g,'<br>').replace(/<br><br>/g,'<br>');
		
		if (Capture == true) {
			fPostData(friendID, name.replace('<br />',''), gender2, age2, city, state2, country2, lastLogin2, friendCount, commentCount, status, orientation, hometown, bodyType, ethnicity2, religion2, zodiac, drink, children, education, occupation, income, friendStatus.replace('<font color="green">','').replace('</font>',''));
		}
		
		// GM_log(gender);
		// GM_log(name);
		// GM_log(city);
		// GM_log(age);
	}
}

function finalDiv(imgID,imgSrc,description,me,friendID,newHTML2){
    newHTML = '<div style="color: black !important; padding: 5px; background-color: #FFF; border: 5px solid #6698cb;">';
    newHTML = newHTML + '<table id="tableID" border="0" cellpadding="0" cellspacing="0">';
    newHTML = newHTML + '<tr><td width="120" style="padding-right:4px; vertical-align:top !important; color:black !important; font-size:10px !important; line-height:13px !important;" valign="top"><b><font style="color:black !important; font-size:10px !important">' + newHTML2 + description + '</font></b><br><img height="1" width="120" src="http://x.myspace.com/images/spacer.gif"></td>';
    newHTML = newHTML + '<td valign="top"><div align="center" style="padding: 2px 2px 2px 2px;">';
    newHTML = newHTML + '<img style="min-height:300px; border:1px solid #6698cb; max-height:' + maxImgHeight + 'px; max-width:' + maxImgWidth + 'px;" src="' + imgSrc + '" border="0"></div>';
    newHTML = newHTML + '</td></tr></table></div>';
	GM_log(newHTML);
	document.getElementById("trailimageid").innerHTML = newHTML;
    document.getElementById("trailimageid").style.display="inline";
}

//from here on, we create the mouse over effect.
var plusFactor = 41
var scrollerWidth = ((window.outerWidth - window.innerWidth));
var div = document.getElementById("fillDiv");
var docwidth= div.scrollWidth;
var docheight= div.scrollHeight;

function truebody(){
	return (!window.opera && document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function followmouse(){
    var e=arguments[0]?arguments[0]:event;
    var xcoord=15
    var ycoord=15 
	currentimagewidth = document.getElementById("trailimageid").scrollWidth + 7; 
    if (typeof e != "undefined"){
        if ((docwidth - scrollerWidth) - e.pageX < currentimagewidth){
            xcoord = e.pageX - xcoord - (currentimagewidth) + 10; // Move to the left side of the cursor
        } else {
            xcoord += e.pageX;
        }
        if (docheight - e.pageY < (currentimageheight + plusFactor)){
            ycoord += e.pageY - Math.max(0,(plusFactor + currentimageheight + e.pageY - docheight - truebody().scrollTop));
        } else {
            ycoord += e.pageY;
        }
    } 
    if(ycoord < 0) { ycoord = ycoord*-1; }
    document.getElementById("trailimageid").style.left=xcoord+"px"
    document.getElementById("trailimageid").style.top=ycoord+"px"
}

function followmouse2(){
	document.getElementById("trailimageid").style.visibility = "hidden";
    var e=arguments[0]?arguments[0]:event;
	xcoord= e.pageX + 15;
	ycoord= e.pageY + 15;
    document.getElementById("trailimageid").style.left=xcoord+"px"
    document.getElementById("trailimageid").style.top=ycoord+"px"
}
}