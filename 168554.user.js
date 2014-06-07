// ==UserScript==
// @name			Auto Password Mthai
// @description		Auto Password Mthai
// @version			2013.05.26.002
// @author			Babyapt
// @include			http://video.mthai.com/*

// ==/UserScript==
if (window.top != window.self)  return;
if(!document.getElementById('clip_password')) return;
var te = document.documentElement.innerHTML;
var a = te.split('ผู้โพสต์ :');
var b = a[1].split('title');
var c = b[1].split('</a>');
var d = c[0].split('>');
var user = d[1];



var parts = window.location.search.substr(1).split("&");
var $_GET = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}
if($_GET['try']){
	var tries = parseInt($_GET['try']);
} else {
    var tries = parseInt(0);
}
var tries = tries+1;
if(!pass&&$_GET['pass']){
	if($_GET['pass']=='nopass'){
		var pass = "";
	} else {
		var pass = $_GET['pass'];
	}
}
if(pass){
	if(document.getElementById('clip_password')){
		if(tries<2){
			if($_GET['try']){
				var form = window.location.href;
				var form = form.split('&try');
				var form = form[0];
			} else {
				var form = window.location.href;
			}
	 	   document.write('<center><h1>. . . L O A D I N G . . .</h1></center></br><div style="visibility:hidden;"><form action="'+form+'&try='+tries+'" method="post" accept-charset="utf-8" id="mf"><input class="text" type="password" name="clip_password" id="clip_password" value="'+pass+'" size="15"><input type="submit"></form></div><sc'+'ript>document.getElementById("mf").submit();</sc'+'ript>');
		} else {
			window.location.href = "http://www.nextinfos.com/mthai_pass.php?action=issue&u="+user+"&l="+window.location.href;
		}
	}
} else {
	if($_GET['pass']=='nopass'){
		if($_GET['added']!='true'){
			if(confirm('ไม่พบรหัสผ่านสำหรับ USER : '+user+'\nส่งข้อมูลเพื่อให้ทีมงานเพิ่มรหัสผ่าน/เพิ่มรหัสผ่านสำหรับ USER นี้?\n\n(หากท่านเคยส่งข้อมูลแล้ว/ไมต้องการส่งข้อมูลให้กด "ยกเลิก")')){
				if(confirm("ท่านทราบรหัสผ่านของ USER : "+user+" หรือไม่?")){
					var Upass = prompt ("รหัสผ่านสำหรับ USER : "+user+" คือ?","");
					window.location.href = "http://www.nextinfos.com/mthai_pass.php?action=add&u="+user+"&p="+Upass+"&l="+window.location.href;
				} else {
					if($_GET['asked']!='true'){
						window.location.href = "http://www.nextinfos.com/mthai_pass.php?action=add&u="+user+"&l="+window.location.href;
					}
				}
			}
		}
	} else {
		window.location.href = "http://www.nextinfos.com/mthai_pass.php?action=get&u="+user+"&l="+window.location.href;
	}
    return;
}