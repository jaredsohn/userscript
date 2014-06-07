// ==UserScript==
// @name           Hawt Bar
// @namespace      HB@apocalypexnet
// @description    Adds a hawt navbar to the bottom of the screen.
// @version        2
// @include        http://*bungie.net/*
// @copyright      2010, ApocalypeX, http://www.apocalypex.net
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==
//4 Duardo, yo
//Cleaner code, but the bottom half needs to be less hacked together. Maybe next time.

var Messages = 0;
var Groups;
var Forums = new Array({'fName' : 'Bungie Universe', 'fHref' : 'http://www.bungie.net/Forums/topics.aspx?forumID=1'}, {'fName' : 'Bungie.net Community', 'fHref' : 'http://www.bungie.net/Forums/topics.aspx?forumID=3'}, {'fName' : 'The Flood', 'fHref' : 'http://www.bungie.net/Forums/topics.aspx?forumID=10'}, {'fName' : 'The Gallery', 'fHref' : 'http://www.bungie.net/Forums/topics.aspx?forumID=4'}, {'fName' : 'The Classifieds', 'fHref' : 'http://www.bungie.net/Forums/topics.aspx?forumID=9'}, {'fName' : '', 'fHref' : ''}, {'fName' : 'Halo: REACH', 'fHref' : 'http://www.bungie.net/Forums/topics.aspx?forumID=304365'}, {'fName' : 'Halo 3', 'fHref' : 'http://www.bungie.net/Forums/topics.aspx?forumID=105242'}, {'fName' : 'Optimatch', 'fHref' : 'http://www.bungie.net/Forums/topics.aspx?forumID=5576'});
var open = false;
var $ = unsafeWindow.$telerik.$;
var closeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACC0lEQVR42qSTzWoTURiGn5kmTav2x+ZkccJAhkCDdZvm5wrcFIobNxVFIiIiQegUai8g3bYX4RWIi95BID+4cOWs3NQM2DgTnZicMslxk4Y2LQj2g7P5+M738/C+ptaa2zxDa81tIjabMAxjDtgEHgASGAOnwFfgs9Z6dKX+8gaGYSwDO8B9YAAoILo07BfwUWv9++KPOTP5KbC8v7/ftW27B/SBvpSyX6vVhkAC2JrUXjthE1g9ODjoHh4eph3H6ReLxa5Satxut1NSypWFhYVTx3HuAQ+BL1dOMAzjBbBq23av2WwKIcRdz/P+RFE0sixrKQiCYalUGriuOwROtdafZhu8B3pA37btWKPREKlU6g6A7/uqXC5HrutqIACGWusPVxiYpqknwCKl1LlSakp7MBiMwzBkwkTF4/HoGsRkMukDSClpt9spy7KWfN9XnucN0+n0YqvVMjOZzBjQQoj+tQYbGxvfgJjjOAkp5UoQBMNyuRzl8/mR53kDKeXi7u7uHJAoFAo/p+gvJNnpdKy1tbWXQOXo6OhVLpd7B+wBbzKZzOvj4+O3wJ4Q4pnnedZNUjbr9Xpxe3s7d3Z2Ng/MAaOJmADmhRDnJycnbj6fb04Uyqw5EmEYFiqVylY2m30CPAd21tfXH1er1UdhGBa01ol/mckE0oAAVie5HvAD+D6dfJMX/if+DgC3ySh13L0wFwAAAABJRU5ErkJggg%3D%3D';
addGlobalStyle("#gl ul li{list-style:none; width:150px; text-align:left; margin:5px auto 5px auto;} #exit_gl{background: url("+closeImage+") no-repeat center center; width:15px; height:15px; position:absolute; display:inline-block;}");

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


function Item(id){
	this.obj = document.createElement('div');
	this.obj.id = id;
	this.draw = function(){
		return false;
	}
}

function Bar(id){
	Item.call(this, id);
	(document.getElementsByClassName('messages')[0].getElementsByTagName('a')[0].innerHTML > 0) ? color = "552A07" : color = "14375D";
	this.obj.setAttribute('style', 'background : -moz-linear-gradient(top, #'+color+', #000); background : -webkit-gradient(linear, left top, left bottom, color-stop(0%,#'+color+') color-stop(100%,#000)); border : 1px solid #727272; border-bottom : none; border-right : none; -webkit-border-top-left-radius : 10px; -moz-border-radius-topleft : 10px; min-width : 150px; height : 30px; position : fixed; bottom : 0px; right : 0px; z-index : 9001; padding:0 10px 0 10px;');
	this.draw = function(){
		document.body.appendChild(this.obj);
	}
}

function Button(id, link, icon, type, pos){
	/*
		type{
			0 : Normal button
			1 : Messages/friends button
			2 : Small button
		}
	*/	
	Item.call(this, id);
	this.anchor = document.createElement('a');
	this.anchor.id = id+"_a";
	this.anchor.href = link;
	this.anchor.href = link;
	if(type == 0){
		this.anchor.setAttribute('style', 'display : block; background : url('+icon+') no-repeat center center; width : 20px; height : 20px;');
		this.obj.setAttribute('style', 'margin : 5px; display : inline-block; width : 20px; height : 20px; position : relative; vertical-align : top');
	}
	else if(type == 1){
		this.anchor.setAttribute('style', 'padding-left : 20px; vertical-align : middle');
		this.obj.setAttribute('style', 'background : url('+icon+') no-repeat left center; margin : 5px 10px 5px 5px; display : inline-block; height : 20px; position : relative; vertical-align : top');
	}
	else if(type == 2){
		this.anchor.setAttribute('style', 'display : block; background : url(/images/base_struct_images/sprites/nav-icons.png) 0 '+pos+'px no-repeat; width : 20px; height : 16px;');
		this.obj.setAttribute('style', 'margin : 5px; display : inline-block; width : 20px; height : 20px; position : relative; vertical-align : top');
	}
	this.draw = function(placement){
		this.obj.appendChild(this.anchor);
		placement.appendChild(this.obj);
	}
}

function getGroups(){
	url = "/account/profile.aspx?page=Chapters";
	xmlhttp=null;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
	var doc = document.implementation.createDocument("", "", null);
	var html = document.createElement("html");
	html.innerHTML = xmlhttp.responseText;
	doc.appendChild(html);
	groupsArr = new Array();
	groups = doc.getElementById('ctl00_mainContent_chaptersPanel').getElementsByTagName("a");
	for(var i = 0; i < groups.length-2; i++){
		groupsArr.push({'gName':groups[i].innerHTML.replace('                                                ', ''),'gHref':groups[i].href});
	}
	window.Groups = groupsArr;
}

function getMessages(){
	if(document.getElementsByClassName('messages')[0].getElementsByTagName('a')[0].innerHTML == 0)
		return;
	url = "/Account/Profile.aspx?page=Messages";
	xmlhttp=null;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.send(null);
	var doc = document.implementation.createDocument("", "", null);
	var html = document.createElement("html");
	html.innerHTML = xmlhttp.responseText;
	doc.appendChild(html);
	newMessages = doc.getElementsByClassName('new');
	window.Messages = new Array();
	for(var i = 0; i < newMessages.length; i++){
		window.Messages.push({'mName':newMessages[i].getElementsByTagName('td')[1].getElementsByTagName('a')[0].innerHTML + " : " + newMessages[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0].innerHTML , 'mHref':newMessages[i].getElementsByTagName('td')[2].getElementsByTagName('a')[0].href });
	}
}

function popin(){
	$("#gl").fadeOut(400, function(){
		document.getElementById('gl').parentNode.removeChild(document.getElementById('gl'));
		open = false;
	});
}

var NavBar = new Bar('nav_bar');
var HR = new Button('hr_btn', '/stats/reach/default.aspx', '/images/base_struct_images/search/reach.gif', 0, false);
var H3 = new Button('h3_btn', '/stats/halo3/default.aspx', '/images/base_struct_images/search/halo3.gif', 0, false);
var PR = new Button('pr_btn', '/Account/Profile.aspx', false, 2, '-160');
var FRM = new Button('frm_btn', 'javascript: void(0);', false, 2, '-80');
var GPR = new Button('grp_btn', '/Account/Profile.aspx?page=Chapters', false, 2, '-32');
var MSG = new Button('msg_btn', '/Account/Profile.aspx?page=Messages', '/images/base_struct_images/db_message_icon.gif', 1, false);
MSG.anchor.innerHTML = document.getElementsByClassName('messages')[0].getElementsByTagName('a')[0].innerHTML;
var FLO = document.getElementsByClassName('friendsOnline')[0];
var status;
(FLO) ? status = '/images/base_struct_images/db_friends_online_icon.gif' : status = '/images/base_struct_images/db_friends_offline_icon.gif';
var FL = new Button('fl_btn', '/Stats/LiveFriends.aspx', status, 1, false);
(FLO) ? FL.anchor.innerHTML = FLO.getElementsByTagName('a')[0].innerHTML.replace(/[\( | \)]/g, '') : FL.anchor.innerHTML = "?";
FL.anchor.setAttribute('onclick', "javascript:window.open('/Stats/LiveFriends.aspx', 'FriendsList', 'scrollbars, resizable, width=430, height=520');return false;");
FL.anchor.setAttribute('target', "_blank");
FRM.draw(NavBar.obj);
HR.draw(NavBar.obj);
H3.draw(NavBar.obj);
PR.draw(NavBar.obj);
MSG.draw(NavBar.obj);
FL.draw(NavBar.obj);
GPR.draw(NavBar.obj);
NavBar.draw();
getGroups();
getMessages();

//*remember's he has jQuery at his disposal*
$("#msg_btn").mouseover(function(){
	if(open && Messages == 0)
		return;
	gl = document.createElement('div');
	gl.id ="gl"
	gl.setAttribute('style','background-color: rgba(0, 0, 0, 0.6); -moz-border-radius: 20px; -webkit-box-shadow: 0px 0px 20px #000; -moz-box-shadow: 0px 0px 20px #000; width:200px; position:fixed; bottom:40px; right:10px; padding:10px; z-index:9000; display:none;');
	gl.innerHTML = '<a id="exit_gl" href="javascript:void(0);"></a><ul id="gl_ul"></ul>';
	document.body.appendChild(gl);
	for(m in window.Messages){
		li = document.createElement('li');
		a = document.createElement('a');
		a.href = window.Messages[m].mHref;
		a.innerHTML = window.Messages[m].mName;
		li.appendChild(a);
		document.getElementById('gl_ul').appendChild(li);
	}
	$("#gl").fadeIn(400);
	open = true;
	document.getElementById('exit_gl').addEventListener('click', popin,true);
});

$("#grp_btn").mouseover(function(){
	if(open)
		return;
	gl = document.createElement('div');
	gl.id ="gl"
	gl.setAttribute('style','background-color: rgba(0, 0, 0, 0.6); -moz-border-radius: 20px; -webkit-box-shadow: 0px 0px 20px #000; -moz-box-shadow: 0px 0px 20px #000; width:200px; position:fixed; bottom:40px; right:10px; padding:10px; z-index:9000; display:none;');
	gl.innerHTML = '<a id="exit_gl" href="javascript:void(0);"></a><ul id="gl_ul"></ul>';
	document.body.appendChild(gl);
	for(g in window.Groups){
		li = document.createElement('li');
		a = document.createElement('a');
		a.href = window.Groups[g].gHref;
		a.innerHTML = window.Groups[g].gName;
		li.appendChild(a);
		document.getElementById('gl_ul').appendChild(li);
	}
	$("#gl").fadeIn(400);
	open = true;
	document.getElementById('exit_gl').addEventListener('click', popin,true);
});

$("#frm_btn").mouseover(function(){
	if(open)
		return;
	gl = document.createElement('div');
	gl.id ="gl"
	gl.setAttribute('style','background-color: rgba(0, 0, 0, 0.6); -moz-border-radius: 20px; -webkit-box-shadow: 0px 0px 20px #000; -moz-box-shadow: 0px 0px 20px #000; width:200px; position:fixed; bottom:40px; right:10px; padding:10px; z-index:9000; display:none;');
	gl.innerHTML = '<a id="exit_gl" href="javascript:void(0);"></a><ul id="gl_ul"></ul>';
	document.body.appendChild(gl);
	for(f in Forums){
		li = document.createElement('li');
		a = document.createElement('a');
		a.href = Forums[f].fHref;
		a.innerHTML = Forums[f].fName;
		li.appendChild(a);
		document.getElementById('gl_ul').appendChild(li);
	}
	$("#gl").fadeIn(400);
	open = true;
	document.getElementById('exit_gl').addEventListener('click', popin,true);
});
if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported")>-1) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
};
//0100111101101000001000000111010001101000011001010111001101100101001000000110111101101110011001010111001100100000011000010110111001100100001000000110111101101000011100110010111000100000010101000110100001100101011100110110010100100000011000110110111101100100011001010111001100101110