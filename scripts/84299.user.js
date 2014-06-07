// ==UserScript==
// @name        RK3
// @namespace   mafiawars
// @description none
// @include     http://mwfb.zynga.com/mwfb/*
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @version     1.0
// ==/UserScript==


javascript: (function () {

var debug = true;
var job_id=prompt("Masukkan ID Job:","Job ID");
var job_tab_high=prompt("Masukkan No. Episode Higher Mastery:","No. EP");
var job_tab_low=prompt("Masukkan No. Episode Lower Mastery:","No. EP");
var job_count=prompt("Berapa kali Do Job?","1");
var t1=0;
var t2=0;
var t3=0;

if (job_count){
var t=setInterval(function(){
job_count--;
if (job_count==-1){
    clearInterval(t);
    alert("Done!");
    }

switch(job_tab_high){
        case '1': var t2=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=1', 0, 0)",1000);
    break;
        case '2': var t2=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=2', 0, 0)",1000);
    break;
        case '3': var t2=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=3', 0, 0)",1000);
    break;
        case '4': var t2=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=4', 0, 0)",1000);
    break;
        case '5': var t2=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=5', 0, 0)",1000);
    break;
        case '6': var t2=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=6', 0, 0)",1000);
    break;
        case '7': var t2=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=5', 0, 0)",1000);
    break;
        case '8': var t2=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=6', 0, 0)",1000);
    break;

    }

switch(job_tab_low){
        case '1': var t1=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=1', 0, 0)",3000);
    break;
        case '2': var t1=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=2', 0, 0)",3000);
    break;
        case '3': var t1=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=3', 0, 0)",3000);
    break;
        case '4': var t1=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=4', 0, 0)",3000);
    break;
        case '5': var t1=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=5', 0, 0)",3000);
    break;
        case '6': var t1=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=6', 0, 0)",3000);
    break;
        case '7': var t1=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=5', 0, 0)",3000);
    break;
        case '8': var t1=setTimeout("do_ajax('mainDiv', 'remote/html_server.php?xw_controller=story&xw_action=view&xw_city=3&story_tab=6', 0, 0)",3000);
    break;
    }
    

request();
    
},6000);
}
    


function state_change(s){
	if (/user_info_update/.test(s)) { s=s.substr(s.indexOf('user_info_update')); }
	if (/<style type="text\/css">/.test(s)) { s=s.substr(0,s.indexOf('<style type="text/css">')); }
	if(/: Completed/.test(s)) {  }
	}


    
function get_userid(){
    var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
    return userid;
}

function get_job_tmp(){
    var job_alt=/xw_controller=(story|job|episode).*xw_city=(\d+).*tmp=([0-9a-f]+).*job=(\d+).*tab=(\d+)/.exec(document.getElementsByClassName("                job_action")[0].innerHTML);
    var job_tmp = job_alt[3];
    return job_tmp;
}

function get_job_url(){
    var job_alt=/xw_controller=(story|job|episode).*xw_city=(\d+).*tmp=([0-9a-f]+).*job=(\d+).*tab=(\d+)/.exec(document.getElementsByClassName("                job_action")[0].innerHTML);
    var xw_controller = job_alt[1];
    var xw_city = job_alt[2];
    var job_tab = job_tab_low;
    var job_url= 'xw_controller='+xw_controller+'&xw_action=dojob&xw_city='+xw_city+'&job='+job_id+'&tab='+job_tab;
    return job_url;
}

function timestamp() {
	now = new Date();
	var CurH = now.getHours();
	CurH = (CurH<10?'0'+CurH:CurH);
	var CurM = now.getMinutes();
	CurM = (CurM<10?'0'+CurM:CurM);
	if (timestamping) { return '<span class="more_in">['+CurH+':'+CurM+']</span> '; }
	else { return ''; }
}

function unix_timestamp() {
	return parseInt(new Date().getTime().toString().substring(0, 10))
}


	

function request(){ 
var preurl = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?';
var tmp=get_job_tmp();
var url=get_job_url();
var userid=get_userid();
var cb = userid+unix_timestamp();
var url2='remote/html_server.php?'+url+'&tmp='+tmp+'&cb='+cb;
do_ajax('mainDiv',url2, 0, 0);
	}



})()
