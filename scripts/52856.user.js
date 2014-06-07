
// Fudder Userignore
// version 0.6 BETA!
// 2005-05-02
// Copyleft 2009, maddis
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Offsite Blank", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Fudder userignore
// @namespace     http://fudder.de
// @description   hide user comments
// @include       http://fudder.de*
// @include       https://fudder.de*
// @include       http://www.fudder.de*
// @include       https://www.fudder.de*
// ==/UserScript==

//--------------------------------header
var imagebtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAA8PDxAQELdpabllZblmZrhpabd5ebd+frl5ebh6erh+fv8AAP8BAf8CAv8EBP8FBf8ICP8JCf8PD/8REf8SEv8ZGf8fH/8hIf8kJP8lJf8wMP8yMv84OP88PP89Pf9CQv9ERP9GRv9KSv9LS/9OTvZSUvZTU/9QUP9YWP9bW/9cXP9iYv9jY/9kZP9mZv9oaP9qavZycvZzc/d0dP9ycv9zc/94eLeIiLmGhriJif+AgP+EhP+MjP+QkP+UlP+Wlv+YmP+Zmf+amv+cnP+iov+mpv+oqP+srP+trf+ysv+0tP+1tf+/v//AwP/GxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADB2U6kAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAC3SURBVChTVY/XEoJADEWzKCq6NtZesYFiQbD3DiqW//8bdwVHPW/3JJnMBQBAQYUh+xANFE4g+E2c5/4yxqKXGvSZsx2RRxBw990rDxjkeKiaptSzy5K1z8hgtCetojZKPnK3zri+VcBIP5tY1fKbyEU/rZdURBPXAhPhs76rxahYSMuGqon3rN3pY6zAIGOtxHIFd+2SVGVimnIeOhA/oNmPIQKtw30NEZwyH+NmWmc+ZAxCrP4L2OYYzxwkqf0AAAAASUVORK5CYII%3D";


//---------------------------------- MAIN FUNCTION----------------------

//----------init the variables
var ignorelist = GM_getValue('fudderblock.list'); //,ignoreUser.join(";")
var ignoreUser;
if(ignorelist!=null && ignorelist!="") {
	ignoreUser = ignorelist.split(";");
}
else {
	ignoreUser=new Array();
}

//---------end init



//alert(ignoreUser.join(";"));

//------- init userUI
createUI(ignoreUser);

//---------------------------------- MAIN FUNCTION----------------------
blockComments(ignoreUser);
//

function createUI(ignoreUser) {

	createButton();
	createSettings(ignoreUser);

}

function createButton() {
	var btn = document.createElement("a");
	//btn.style.border="1px solid #FF0000";
	btn.style.display="block";
	btn.style.position="fixed";
	btn.style.right="0px";
	btn.style.top="0px";
	btn.style.width="16px";
	btn.style.height="16px";
	btn.href = 'javascript:;';
    btn.addEventListener('click', function(){toggleSettings(); link.blur();}, false);
    
    var image= document.createElement("img");
    image.src = imagebtn;
    btn.appendChild(image);
    
    
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(btn);
	
	
}

function createSettings(ignoreuser) {
	
	var container = document.createElement("div");
	container.id = "fudderblock_container";
	container.style.border="2px solid #FF0000";
	container.style.display="block";
	container.style.position="fixed";
	container.style.right="0px";
	container.style.top="20px";
	container.style.backgroundColor ="#FFFFFF";
	//container.style.width="10px";
	//container.style.height="10px";
	container.style.display="none";
	
	var userlist = document.createElement("div");
	userlist.id = "fudderblock_userlist";
	
	container.appendChild(userlist);
	
	var insertDiv = addInsertForm();
	
	container.appendChild(insertDiv);
	
	var saveDiv = document.createElement("div");
	var saveText = document.createTextNode("SAVE");
	var savelink = document.createElement("a");
	savelink.href = 'javascript:;';
	savelink.addEventListener('click', function(){saveSettings(); link.blur();}, false);
	savelink.appendChild(saveText);
	
	saveDiv.appendChild(savelink);
	
	container.appendChild(saveDiv);
	
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(container);
	
	for(var i = 0; i<ignoreuser.length;i++) {
		addUser(ignoreuser[i]);
	}

}

function addInsertForm() {
	var insertDiv = document.createElement("div");
	
	var inputElem = document.createElement("input");
	inputElem.id = "fudderblock_inputuser";
	
	var nameattr = document.createAttribute("name");
	nameattr.nodeValue = "fudderblock_inputser";
	var typeattr = document.createAttribute("type");
	typeattr.nodeValue = "text";
	var sizeattr = document.createAttribute("size");
	sizeattr.nodeValue = "30";
	
	inputElem.setAttributeNode(nameattr);
	inputElem.setAttributeNode(typeattr);
	inputElem.setAttributeNode(sizeattr);
	
	var instext = document.createTextNode("Insert");
	var insertlink = document.createElement("a");
	insertlink.href = 'javascript:;';
	insertlink.addEventListener('click', function(){insertUser(); link.blur();}, false);
	insertlink.appendChild(instext);
	
	insertDiv.appendChild(inputElem);
	insertDiv.appendChild(insertlink);
	return insertDiv;
}

function insertUser() {

	var insert = document.getElementById("fudderblock_inputuser");
	var user = insert.value;

	addUser(user);

}

function addUser(user) {

	if(document.getElementById("fudderblock_fb_user_"+user)) {
		return;
	}
	var userlist = document.getElementById("fudderblock_userlist");
	var userdiv = document.createElement("div");
	userdiv.style.padding="2px 2px 2px 2px";
	var username = document.createTextNode(user);
	userdiv.appendChild(username);
	
	var x = document.createTextNode("X");
	var dellink = document.createElement("a");
	dellink.style.color="#000000";
	dellink.style.fontSize="12px";
	dellink.style.padding="2px 2px 2px 2px";
	dellink.style.backgroundColor="#ff0000";
	dellink.style.border="1px solid #000000";
	dellink.href = 'javascript:;';
	dellink.id="fb_user_"+user;
	dellink.name = "fb_user_"+user;
	dellink.addEventListener('click', function(event){deleteUser(event); link.blur();}, false);
	dellink.appendChild(x);
	
	userdiv.id = "fudderblock_fb_user_"+user;
	userdiv.appendChild(dellink);
	
	userlist.appendChild(userdiv);
}

function toggleSettings() {

	var settings = document.getElementById("fudderblock_container");

	if(settings.style.display=="none") {
		settings.style.display="block";
	}
	else {
		settings.style.display="none";
	}

}

function deleteUser(event) {
	//alert(event.target.id);
	var userlist = document.getElementById("fudderblock_userlist");
	var toDel = document.getElementById("fudderblock_" + event.target.name);
	userlist.removeChild(toDel);
}

function blockComments(ignoreUser) {

	var commentContainer = document.getElementById("kommentarBoxAll");
	var comments = getElementsByClassName("tt_newsKommentarBoxBeige",commentContainer,"div");

	for(i = 0 ; i < comments.length; i++) {
		
		addBlockBox(comments[i],ignoreUser);
		
		if(isUserBlocked(comments[i],ignoreUser)) {
			//comments[i].style.display = "none";
			comments[i].getElementsByTagName("p")[0].innerHTML = "<font style=\"color:#ff0000;font-size:18px;\">KOMMENTAR GEBLOCKT</font>";
		}
	}

}

function getElementsByClassName(classname, node, tag) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName(tag);
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
}
 
function isUserBlocked(node, userlist) {
	
	var nodetext = getUserName(node);
	
	for(var i = 0; i<userlist.length;i++) {
		if(nodetext.match(userlist[i]) != null) {
			//alert("match"+userlist[i]);
			return true;
		}
		
	}
	return false;
}
 
function saveSettings() {
	alert("save");
	var userlist = document.getElementById("fudderblock_userlist");
	var blocked = userlist.getElementsByTagName("div");
	
	var prepareString = "";
	if(blocked.length>0) {
		prepareString= prepareString += blocked[0].firstChild.nodeValue;
	}
	
	for(var i = 1; i < blocked.length; i++) {
		prepareString += ";";
		prepareString += blocked[i].firstChild.nodeValue;
		
	}
	
	GM_setValue('fudderblock.list',prepareString);
}
 
function addBlockBox(node,ignoreUser) {
	
	var namediv = node.childNodes[3];
	
	var blockdiv = document.createElement("div");
	//alert(getUserName(node));
	var txt = "";
	var blocklink = document.createElement("a");
	blocklink.href = 'javascript:;';

	
	if(isUserBlocked(node,ignoreUser)) {
		blocklink.name = "fb_user_"+getUserName(node);
		blocklink.addEventListener('click', function(event){deleteUser(event); link.blur();}, false);
		txt = "UNBLOCK";
	}
	else {
		blocklink.name = getUserName(node);
		blocklink.addEventListener('click', function(event){blockUser(event); link.blur();}, false);
		txt = "BLOCK";
	}
	
	var text = document.createTextNode(txt);
	blocklink.appendChild(text);
	blockdiv.appendChild(blocklink);
	namediv.appendChild(blockdiv);
	
	//alert(blocklink.getParent().getParent().innerHTML);
	
}

function getUserName(node) {
	var name = "";
	var node = node.childNodes[3].getElementsByTagName("div")[0];
	var iflink = node.getElementsByTagName("a")[0];
	if(iflink) {
		name = iflink.firstChild.nodeValue.replace(/^\s*|\s*$/g, "");
	}
	else {
		name = node.firstChild.nodeValue.replace(/^\s*|\s*$/g, "");
	}
	return name;
}

function blockUser(event) {
	addUser(event.target.name);
}