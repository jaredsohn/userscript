// ==UserScript==
// @name          Coup d'Magoo
// @author        CAVX & PKF 647
// @description   IMPORTANT: If this isn't working correctly for you, clear your cookies (Ctrl + Shift + Del). -- -- This script allows you to change your personal viewing experience of Bungie.net.
// @include       http://*bungie.net/*
// ==/UserScript==

version = 313;
function checkforupdates() {
    var top, script;
    top = document.getElementsByTagName('head')[0];
    if (!top) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://www.bungiefans.org/favors/fftheme/msupdate.php?version='+version+'';
    top.appendChild(script);
}
checkforupdates();

function addGlobalScripts() {
    var top, script;
    top = document.getElementsByTagName('head')[0];
    if (!top) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "\
	function useIt(box, id) {\n\
		if (box.checked) {//want to block\n\
			oldCookie = String(getCookie('scriptBlockList')); \n\
			if (oldCookie == 'null')\n\
			{\n\
				oldCookie = '';\n\
			}\n\
			newCookie = oldCookie.split(',');\n\
			found = false;\n\
			i = 0;\n\
			while (i < newCookie.length && found == false) {\n\
				if (id == newCookie[i]) {\n\
					found =  true;\n\
				}\n\
				i ++;\n\
			}\n\
			\n\
			if (!found) {\n\
				newCookie.push(id);\n\
				var exdate = new Date();\n\
				exdate.setDate(exdate.getDate() + 100);\n\
				setCookieWithExpires('scriptBlockList', newCookie, exdate);\n\
			}\n\
		} else {\n\
			oldCookie = String(getCookie('scriptBlockList'));\n\
			if (oldCookie == 'null')\n\
			{\n\
				oldCookie = '';\n\
			}\n\
			newCookie = oldCookie.split(',');\n\
			found = false;\n\
			i = 0;\n\
			while (i < newCookie.length && found == false) {\n\
				if (id == newCookie[i]) {\n\
					found =  true;\n\
				}\n\
				i ++;\n\
			}\n\
			\n\
			arrStart = newCookie.slice(0,i-1);\n\
			arrFin = newCookie.slice(i,newCookie.length);\n\
			newCookie = arrStart.concat(arrFin);\n\
			var exdate = new Date();\n\
			exdate.setDate(exdate.getDate() + 100);\n\
			setCookieWithExpires('scriptBlockList', newCookie, exdate);\n\
		}\n\
	}"
    top.appendChild(script);
}
addGlobalScripts();

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
userDetails = [
		//[0.username 1.customTitle 2.customTitleColor 3.titleBarBgColor 4.titleBarBgImg 5.titleBarBgImgRepeat 6.titleBarBorderColor 7.postTextColor 8.avatarURL 9.avatarHeight 10.avatarWidth]
		['PKF_647', 'stalker', '#103349', '#0065a5', 'http://i300.photobucket.com/albums/nn1/Bungiestuff/Avatars/User_Title_Template.jpg', 'repeat', '#103349', '#ffffff', 'http://i300.photobucket.com/albums/nn1/Bungiestuff/Avatars/shadow_mod.jpg', '90', '90'],
		['Magoo27', 'Mr Mythic Member', '#C0C0C0', '#103349', 'Http://image.jpg', 'repeat', '#1b1d1f', '#C0C0C0', 'http://img197.imageshack.us/img197/3139/dare.jpg', '90', '90']
		//[0.username 1.customTitle 2.customTitleColor 3.titleBarBgColor 4.titleBarBgImg 5.titleBarBgImgRepeat 6.titleBarBorderColor 7.postTextColor 8.avatarURL 9.avatarHeight 10.avatarWidth]
		];
function createCSS(){
	settings = userDetails;
	fullCSS = "" 
	i = 0
	while (i < settings.length){
		userInfo = settings[i];				
		//make sure background url exists
		if (!(userInfo[4] == "")){
			bgURL = "background:url("+userInfo[4]+") "+userInfo[5]+" ! important;\n"
		} else {
			bgURL = ""
		}
		//title bar css
		fullCSS = fullCSS + "#user"+i+"postings {"+
			" background-color:"+userInfo[3]+" ! important;"+
			bgURL+
			" border-color:"+userInfo[6]+" ! important;"+
			" border-style:solid ! important;"+
			" border-width:1px ! important;"+
		"}"+ //post css
		"#user"+i+"content {\n"+
		" color: "+userInfo[7]+" ! important;\n"+
		"}\n";
		i+=1;
	}
	return(fullCSS);
}

addGlobalStyle(createCSS());

function getCookie(name) {
	var results = document.cookie.match(name + '=(.*?)(;|$)');
	if (results)
		return (unescape(results[1]));
	else
		return null;
}

function getdivHTML(){
var divArray = document.getElementsByTagName("div");
for (var i = 0; i<divArray.length; i++){
	if(divArray[i].getAttribute("class") == "forumpost"){
		if (!(divArray[i].innerHTML.match(/<empty.*>/))) {
		} else{
			divArray[i].innerHTML = divArray[i].innerHTML.replace(/<empty.*>/,"&nbsp;</span></p>");			
		}
		j = 0;
		found = false;
		while (j < userDetails.length && !found){			
			userInfo = userDetails[j];
			uName = userInfo[0]; //current username
			var tmpexp = new RegExp(">"+uName+"<.a><.li>", "i");
			if (!(divArray[i].innerHTML.match(tmpexp))) {
				j++;
			} else
			{
				found = true;
				blockList = String(getCookie('scriptBlockList'));
				if (blockList == 'null') {
					blockList = '';
				}
				blockList = blockList.split(',');
				k = 0;
				found2 = false;				
				while (k < blockList.length && found2 == false) 
				{
					if (uName == blockList[k])
					{
						found2 = true;
					}
					k++;
				}				
				if (found2) {
					checked = "checked='true'";
				} else {
					checked = ""
				};
				tes = divArray[i].innerHTML.match(/li>user homepage.*<.li/i);
				tes = String(tes) + ">\n<li>Disable UserScript: <input type='checkbox' name='useIts' onChange='useIt(this, \""+uName+"\")' "+checked+"></li";
				divArray[i].innerHTML = divArray[i].innerHTML.replace(/li>user homepage.*<.li/i, tes);
				if (!found2) //if j appears in the block list, don't show colours
				{					
					customTitle = userInfo[1];
					customTitleColor = userInfo[2];		
					if (!(customTitleColor == '')) {
						customTitle = "<font color='"+customTitleColor+"'>"+customTitle+"</font>";
					}
					defaultTitleColor = userInfo[7]; //defaults to same as post text color
					avatar = userInfo[8];
					avatarHeight = userInfo[9];
					avatarWidth = userInfo[10];
					divArray[i].innerHTML = divArray[i].innerHTML.replace(/div class=.forumavatar.>[\s\S]*style=.*><.a>[\s\S][\s\S]?<.div/gi, "div class='forumavatar'><a href='/Account/Profile.aspx'><img src='"+avatar+"' style='height:"+avatarHeight+"px;width:"+avatarWidth+"px;border-width:0px;'/></a></div");
					divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<ul id=.* class=.author_header_block./gi, "<ul id='user"+[j]+"postings' class='author_header_block'");
					divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<li.* class=.title.*>.*<.li>/gi, "<li class='title' style='color:"+defaultTitleColor+" ! important;'>"+customTitle+"</li>");
					divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<p id=.*postControl_skin_PostBlock./gi, "<p id='user"+[j]+"content'");
				}
			}			
		}		
	}
}
}
whatsup = getdivHTML();



//
// o hai
// wat r u doin in hear
//  