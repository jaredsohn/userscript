// ==UserScript==
// @name           mutual_friends_xiaonei
// @version        1.00
// @description    Show the mutual friends at xiaonei.com between you and the user you are browsing. If it doesn't work, plz let me know and I will fix it!
// @namespace      wangyuantao[at]msn.com
// @include        http://xiaonei.com/profile.do?*id=*
// ==/UserScript==

//count of friends of $fid
var count = 0;

//create a sidebar to display the mutual friends
function createMutualPanel(){
	var tempdiv = document.createElement('div');
	tempdiv.id = "mutualBox";
	tempdiv.className = "profile-friends box";
	var htm = '<h4 class="box-header"><span>Mutual Friends</span>&nbsp;<a class="count" id="mutualFriendsCount"> (0</a></h4>';
	htm +='<div class="box-body"><div class="clearfix"><ul class="people-list" id="mutualFriends">';
	htm +='</ul></div></div>';
	tempdiv.innerHTML = htm;
	var targetbox = document.getElementsByClassName("profile-friends")[0];
    targetbox.parentNode.insertBefore(tempdiv, targetbox);
}

//push one array to callback, each of which is (id, name)
function loadFriendsOf(fid, page, callback, myfs){
	GM_xmlhttpRequest({
        method: 'GET',
        url: "http://friend.xiaonei.com/GetFriendList.do?curpage=" + page + "&id=" + fid,
		onload: function(res) {
			var htm = res.responseText;
			var rs = new Array();
			var re = /doPoke\(event,\'(\d+)\',\'(.+?)\'\)/ig;
			var mm;
			while(mm = re.exec(htm)){
				rs.push({id:mm[1],name:mm[2]});
			}
			if(rs.length > 0){
				callback(rs, myfs);//append more to display
				loadFriendsOf(fid, page + 1, callback, myfs);//recursive show next page
			}else{
				document.getElementById("mutualFriendsCount").innerHTML += ")";//stop until no more friends
			}
		}
	});
}

//append one page friends, filter the mutual ones
function appendMutualFriend(friends, myfs){
	var box = document.getElementById("mutualFriends");
	var htm = "";
	for(var i=0; i < friends.length; i++){
		var mutual = false;
		for(var j=0;j<myfs.length;j++){
			if(myfs[j].id == friends[i].id){
				mutual = true;
			}
		}
		if(mutual){
			count++;
			htm	+= "<li style=\"height: 18px; width: 90px;\">";
			htm += "<a style=\"height: 18px; width: 90px;\" href=\"http://xiaonei.com/profile.do?id="+ friends[i].id + "\">" + friends[i].name + "</a>";
			htm += "</li>\n";
		}
	}
	if(htm != ""){
		box.innerHTML += htm;
		box = document.getElementById("mutualFriendsCount");
		box.innerHTML = "(" + count;
	}
}

//push one array to callback, each item of which is (id, name), name encoded, never used
function loadMyFriends(fid, callback){
	GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://photo.xiaonei.com/gettagfriends.do',
		onload: function(res) {
			var raw;
			eval("raw = "+ res.responseText);
			callback(fid, raw.friends_ajax);
		}
	});
}

//after load my friends, do these
function afterLoadMyF(fid, friends){
	createMutualPanel();
	loadFriendsOf(fid, 1, appendMutualFriend, friends);
}

//read cookie value by name
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//get my id from cookie
function getMyId(){
	return readCookie("hostid");
}

//get friend id from location.href
function getFid(){
	var ahref = location.href;
	var i = ahref.indexOf("id=")+3;
	var j = ahref.indexOf("&",i+1);
	if(j == -1)
		return ahref.substr(i);
	else
		return ahref.substr(i, j-i);
}

function main(){
	var fid = getFid();
	var mid = getMyId();
	if(fid != mid){//ignore my self
		loadMyFriends(fid, afterLoadMyF);
	}
}

main();