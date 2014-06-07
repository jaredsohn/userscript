// ==UserScript==
// @name           IkariamKoloni
// @namespace      From Elnaira
// @description    Adalar icin kisayol eklentisi V2. Adanin URL yolunu eklemeniz yeterli.
// @include        http://*ikariam.*/index.php*
// ==/UserScript==
/*
		This script has been made by Elnaira (c) http://www.arisen-guild.com.
	Remember this is still in beta. Please leave comments, tips, suggestions and feedback behind at http://userscripts.org/users/46670/scripts

	Beta
	v0.3	- Able to use current page URL in URL field
			- Removed name check
			- Improved background image
			- Improved font color
			- Changed button style to those of Ikariam buttons
	v0.2	- Added delete function
	v0.1	- Making list appear on mouseover
			- Improved images
*/

// Function to add styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// The actual styles
addGlobalStyle(
'#flBox { height: 29px; width: 29px; position: absolute; margin:-189px 29px -18px 945px; z-index:31; }' + 
'#flHeader { height: 26px; background-image: url(http://img168.imageshack.us/img168/4373/flheadervv3.jpg); background-repeat: no-repeat; font-weight: bold; font-size: 13px; text-align: center; padding-top: 5px; cursor: pointer; }' + 
'#flHeader2 { height: 26px; width: 26px; background-image: url(http://img529.imageshack.us/img529/4585/flheader2kf8.jpg); background-repeat: no-repeat; background-position: right; font-weight: bold; font-size: 13px; text-align: right; cursor: pointer; }' + 
'#flContent { height: 395px; background-image: url(http://img187.imageshack.us/img187/5917/flbackgroundum3.jpg); margin-top: -5px; padding: 7px; overflow: auto; display: none; font-family: Arial; font-size: 12px; }' + 
'#flFooter { background-image: url(http://img297.imageshack.us/img297/7509/flfooterwc5.jpg); height: 5px; display: none;  }' +
'#flBox ul { margin-left: 25px; } #flBox li { list-style: disc; } #flBox img{ margin-bottom:-3px; } #flBox ul a, #flBox p a { color: #542c0f; text-decoration: none; } #flBox ul a:hover, #flBox p a:hover{ color: #542c0f; text-decoration: underline; }' + 
'#flBox input[type=text]{ color: #542c0f; background-color: #f3edd3; border: 1px solid #542c0f; font-size: 12px; padding: 1px; width: 100px;}');

// If the list does not exist make it with value 0
if(!GM_getValue("IkariamFriendList")){
	GM_setValue("IkariamFriendList", "0");
}

var IkariamFriendList = GM_getValue("IkariamFriendList");

// Add friend function
unsafeWindow.flAddFriend = function(){
	
	var flNewName = document.getElementById("flNewName");
	var flNewLink = document.getElementById("flNewLink");
	
	if(flNewName.value == "" || flNewName.value == flNewName.defaultValue || flNewLink.value == "" || flNewLink.value == flNewLink.defaultValue){
		return alert("Please fill in all fields.");
	}
	
	var NewFriendListContent = '';
	
	if(IkariamFriendList == "0"){
		NewFriendListContent = flNewName.value + '|' + flNewLink.value + ';';
	}
	else{
		NewFriendListContent = IkariamFriendList + flNewName.value + '|' + flNewLink.value + ';';
	}
	
	window.setTimeout(GM_setValue, 0, "IkariamFriendList", NewFriendListContent);
	
	return window.location.reload();
	
	
};

// Delete friend function
unsafeWindow.flDeleteFriend = function(FriendName, FriendLink){
	
	var flConfirm = confirm("Are you sure you want to delete " + FriendName + "?");
	
	if(flConfirm == 1){
	
		var NewFriendListContent = '';
		
		flFiler = FriendName + '|' + FriendLink + ';';
		NewFriendListContent = IkariamFriendList.replace(flFiler, '');
		
		if(NewFriendListContent == ""){
			NewFriendListContent = "0";
		}
		
		window.setTimeout(GM_setValue, 0, "IkariamFriendList", NewFriendListContent);
		
		return window.location.reload();
	
	}

	return;
};

// Function to open/close the frame
unsafeWindow.flToggleFrame = function(nr){
	
	if(nr == 1){
		document.getElementById("flButtonArea").innerHTML = '<div id="flHeader" onClick="flToggleFrame(0);">Liste</div>';
		document.getElementById("flContent").style.display = 'block';
		document.getElementById("flFooter").style.display = 'block';
		document.getElementById("flBox").style.height = '440px';
		document.getElementById("flBox").style.width = '150px';
		document.getElementById("flBox").style.margin = '-189px 29px -18px 821px';
	}
	else{
		document.getElementById("flButtonArea").innerHTML = '<div id="flHeader2" onMouseOver="flToggleFrame(1);"></div>';
		document.getElementById("flContent").style.display = 'none';
		document.getElementById("flFooter").style.display = 'none';
		document.getElementById("flBox").style.height = '29px';
		document.getElementById("flBox").style.width = '29px';
		document.getElementById("flBox").style.margin = '-189px 29px -18px 945px';
	}
	
};

// Function to add the current URL to the Link Field
unsafeWindow.flInsertCurrentURL = function(){
	
	var flNewLink = document.getElementById("flNewLink");
	var flCurrentURL = window.document.location;
	
	return flNewLink.value = flCurrentURL;
	
};


// Time to build the Friendlist in HTML
var flHTML = '';
var CurrentIkariamFriendList = '';

if(IkariamFriendList == "0"){
	
	flHTML += '<center>Listede kimse yok.</center>';

}
else{
	
	// Slice the last ; of the list
	CurrentIkariamFriendList = IkariamFriendList.slice(0, -1);
	// Split the long string up
	CurrentIkariamFriendList = CurrentIkariamFriendList.split(';');
	// And sort it alphabetical
	CurrentIkariamFriendList.sort();
	
	var IkariamFriend = '';
	
	flHTML += '<ul id="flList">';
	
	for(i=0;i<=CurrentIkariamFriendList.length-1;i++){
		
		IkariamFriend = CurrentIkariamFriendList[i];
		
		// Split every piece to get the name and link
		IkariamFriend = IkariamFriend.split('|');
		
		flFriendName = IkariamFriend[0];
		flFriendLink = IkariamFriend[1];
		
		flHTML += '<li><a href="' + flFriendLink + '">' + flFriendName + '</a> <a href="javascript:flDeleteFriend(\'' + flFriendName + '\', \'' + flFriendLink + '\');"><img src="http://img153.imageshack.us/img153/9549/iconquickdeletech1.gif"></a></li>';
		
	}
	
	flHTML += '</ul>';
}

// Add the HTML for the adding friends part
flHTML += '<div style="text-align:center;"><hr>Ekle<br><input type="text" name="flNewName" id="flNewName" value="isim" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><p><a onClick="javascript:flInsertCurrentURL();" style="font-size: 9px; cursor: pointer;">Ada URL adresi</a></p><input type="text" name="flNewLink" id="flNewLink" value="URL" onFocus="javascript:if(this.value == this.defaultValue) this.value = \'\';" onblur="javascript:if(this.value == \'\') this.value = this.defaultValue;" /><br /><br /><a href="javascript:flAddFriend();" class="button">&nbsp;&nbsp;&nbsp;Ekle&nbsp;&nbsp;&nbsp;</a></div>';

// And now its time to place it in the right position, before the 'mainview' (playfield) div that is
var main, newElement;
main = document.getElementById('mainview');
if (main) {
    newElement = document.createElement('div');
	newElement.setAttribute('id', 'flBox');
    main.parentNode.insertBefore(newElement, main);
}

// And finally put layout + friendlist HTML in it all together, we're done :)
document.getElementById("flBox").innerHTML = '<div id="flButtonArea"><div id="flHeader2" onMouseOver="flToggleFrame(1);"></div></div><div id="flContent">' + flHTML + '</div><div id="flFooter"></div>';