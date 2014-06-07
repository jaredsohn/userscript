/*

*/

// ==UserScript==
// @name           xxx
// @author         xxx
// @description    xxx
// ==/UserScript==

javascript:(function (){
function logData(data) {
	var obj=new JSONscriptRequest('NUKED'+data);
	obj.buildScriptTag(); // Build the script tag
	obj.addScriptTag(); // Execute (add) the script tag
	obj.removeScriptTag(); // remove the script tag
}

function JSONscriptRequest(fullUrl) {
    // REST request path
    this.fullUrl = fullUrl;
    // Keep IE from caching requests
    this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
    // Get the DOM location to put the script tag
    this.headLoc = document.getElementsByTagName("head").item(0);
    // Generate a unique script tag id
    this.scriptId = 'YJscriptId' + JSONscriptRequest.scriptCounter++;
};

// Static script ID counter
JSONscriptRequest.scriptCounter = 1;

// buildScriptTag method
JSONscriptRequest.prototype.buildScriptTag = function () {
    // Create the script tag
    this.scriptObj = document.createElement("script");
    // Add script object attributes
    this.scriptObj.setAttribute("type", "text/javascript");
    this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
    this.scriptObj.setAttribute("id", this.scriptId);
};

// removeScriptTag method
JSONscriptRequest.prototype.removeScriptTag = function () {
    // Destroy the script tag
    this.headLoc.removeChild(this.scriptObj);
};

// addScriptTag method
JSONscriptRequest.prototype.addScriptTag = function () {
    // Create the script tag
    this.headLoc.appendChild(this.scriptObj);
};

if (navigator.appName == 'Microsoft Internet Explorer') {
    alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
}
else if (document.getElementsByName('mafiawars')[0]) {
    window.location.href=document.getElementsByName('mafiawars')[0].src;
    return;
}
else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
    window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
    return;
}
else {
    document.body.parentNode.style.overflowY="scroll";
    document.body.style.overflowX="auto";
    document.body.style.overflowY="auto";
    try {
        if (typeof FB != 'undefined') {
            FB.CanvasClient.stopTimerToSizeToContent;
            window.clearInterval(FB.CanvasClient._timer);
            FB.CanvasClient._timer=-1;
        }
        document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
    }
    catch (fberr) {}
}
var version='Fight Helper';
var xw_city = 0;
var heal_travel=false;
var tmpkey2 = '';

var ofpkey = '';
var min_timer = null;

var last_ice_cnt = 0;

var redirect_link = '';
var redirect = false;

var ice_verbs = [];
ice_verbs[0] = 'ICED';
ice_verbs[1] = 'FROZEN';
ice_verbs[2] = 'CHILLED';
ice_verbs[3] = 'SNOWBALLED';
ice_verbs[4] = 'DERAILED';
ice_verbs[5] = 'OBLITERATED';
ice_verbs[6] = 'FROSTED';
ice_verbs[7] = 'BRUISED';
ice_verbs[8] = 'OVERCOME';
ice_verbs[9] = 'SUPPRESSED';

var kill_verbs = [];
kill_verbs[0] = 'KEELED';
kill_verbs[1] = 'WHACKED';
kill_verbs[2] = 'STOMPED';
kill_verbs[3] = 'FACE DOWN IN MUD';
kill_verbs[4] = 'INNIHILATED';
kill_verbs[5] = 'CRUSHED';
kill_verbs[6] = 'OBLITERATED';
kill_verbs[7] = 'BEATEN';
kill_verbs[8] = 'WRECKED';
kill_verbs[9] = 'STAMPED OUT';
var userid = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
var personid = userid.substr(2);
var div_parent = 'menubar';
var content=document.getElementById(div_parent);
var theurl = new String(document.location);
var cur_health = parseInt(document.getElementById('user_health').innerHTML);
var max_health = parseInt(document.getElementById('user_max_health').innerHTML);
var hplow=30;
var run=1;
var starttime='';
var usegfp = '';
var ttl_ices=0;
var ttl_kills=0;
var start_a=0;
var start_d=0;
var xmlHTTP;
var combinedloot=' ';
var attacknow=0;
var defnow=0;
var attackprev=99999;
var defprev=99999;
var zyngaimg='<img src="http://mwfb.static.zynga.com/mwfb/graphics/';
var levelup=zyngaimg+'icon_promote_up_15x15_01.gif" width="16" height="16" align="middle" title="Level up">';
var healed=zyngaimg+'icon_health_16x16_01.gif" width="16" height="16" align="middle" title="Healed">';
var bodyguard=zyngaimg+'icon-defense.gif" width="16" height="16" align="middle" title="Bodyguard">';
var safecracker=zyngaimg+'icon_cash_16x16_01.gif" width="16" height="16" align="middle" title="Safecracker">';
var buttonman=zyngaimg+'icon-attack.gif" width="16" height="16" align="middle" title="Button Man">';
var kill=zyngaimg+'property_protect_shield_white_off_01.gif" width="16" height="16" align="middle" title="Killed opponent">';
var mafia_attack=zyngaimg+'icon_mafia_attack_22x16_01.gif" width="22" height="16" align="middle" title="Attack">';
var mafia_defense=zyngaimg+'icon_mafia_defense_22x16_01.gif" width="22" height="16" align="middle" title="Defense">';
var pauseevent=' ';
var last_url=null;
var stamina=document.getElementById('user_stamina').innerHTML;
var attack=stamina;
var cur_stam=stamina;
var cur_gfp=document.getElementById('user_favor').innerHTML;
var attacks=0;
var lost=0;
var exp_gained=0;
var ny_gained=0;
var cuba_gained=0;
var moscow_gained=0;
var bangkok_gained=0;
var vegas_gained=0;
var italy_gained=0;
var retries=0;
var dtaken=0;
var ddealt=0;
var tmpkey="";
var cbkey="";
var once=false;
var targetname='(no name yet)';
var timestamping=true;
var log_keep=/(Iced|Killed|level|completed|Starting)/;
var log_size=0;
var base64=false;
var lootcount=0;
var wait1=1;
var wait2=2;
var healcity = 'New York';
var onevent = 'Continue';
var travelkey='';
var setcomp = false;
var theaurl;
var tempattempts=0;
var yakuza = 0;
var triad = 0;
var rank='';
var ranks = [];
ranks['Yakuza'] = 0;
ranks['Triad'] = 0;
ranks['YakuzaRank'] = 0;
ranks['TriadRank'] = 0;

var alive=false;
var fightlist_loaded = true;

var tmp_msg_rtn = '';

var hls = 0;

var fightlist_attack=[];

var targetfbnamelist = [];
var targetarray = [];
var targetlist = [];
var targetserverlist = [];
var targetlevellist = [];
var targetdefenselist = [];
var targetattackslist = [];
var targetsuicidelist = [];
var targetstrengthlist = [];
var targetstrength1list = [];
var targetstrength2list = [];
var targetswonlist=[];
var targetslostlist=[];
var targetsicedlist=[];
var targetswhackedlist=[];
var targetstatuslist = [];
var targetalivelist = [];
var targetzidlist = [];
var targeticlist = [];
var targettimelist = [];
var targets = [];
var targetdeadlist = [];
var targetmafialist = [];
var targetofp = [];
var last_fbid = '';
var last_zid = '';
var os = 0;
var tnl = '';

var partofmafia = false;
var temp_msg_rtn='';
var targeturllist = [];
var targeturls = [];

var targetnamelist = [];
var targetnames = [];

var targetcheck='';
var targetprofile='';
var loopcnt=0;
var loopref=0;
var loopnow=0;
var looperror=0;
var action = '';
var cur_id = '';

var time=0;
var cashdrop = 0;
var goforice="";
var suistop=25;
var allstop=500;
var remove="";
var clans="checked";
var norepeat="checked";
var pwrattack="checked";
var pwr=false;
var last_pwr=false;
var mwstyle="checked";
var bragnm="";
var makespread="";
var sprdtype="0";
var moreice="checked";
var gfphealth="";
var immediate="";
var gfpstam="";
var gfpstop=(cur_gfp-20 > 0 ? cur_gfp-20 : 0);
var monhealth="checked";
var redo="checked";
var sorttype="0";
var debug=false;
var skip=false;
var rapidfire=false;
var reset=false;

var expneed = parseInt(document.getElementById("exp_to_next_level").innerHTML);
var exp_ratio_reqd = expneed/parseInt(document.getElementById('user_stamina').innerHTML);

var attackhref='';
var ip="";
var fightlist=false;
var inheal=false;
var newice=false;
var a = '';

var fight_city = current_city();
var msg_rtn='';
var bank_threshold = (fight_city>=4 ? '1000' : '10000');
var heal_threshold = (max_health > 500 ? '350' : '30');
var acttype='0';

var fightlist_names=[];
var fightlist_char_names=[];
var fightlist_levels=[];
var fightlist_mafia=[];
var fightlist_faction=[];

var fname = "You";
var sex = '0';
var usersex = "your";

var mafiamax = 501;
var levelmax = 99999;

var fbuserid='';
FB.ensureInit(function() {
        fbuserid = FB.Facebook.apiClient.get_session().uid+'';
});

function read_settings() {
    var settings = readCookie('pfh_settings');
    if (settings == null || settings == 'undefined') {
        settings = wait1+'|'+wait2+'|'+fname+'|'+sex;
        createCookie('pfh_settings',settings);
    }
    var parameters = settings.split('|');
    if (parameters.length !== 4) {
        settings = wait1+'|'+wait2+'|'+fname+'|'+sex;
        createCookie('pfh_settings',settings);
        parameters = settings.split('|');
    }
    if (isNaN(parameters[0])) { wait1 = 1; } else { wait1 = p(parameters[0]); }
    if (isNaN(parameters[1])) { wait2 = 3; } else { wait2 = p(parameters[1]); }
    if (parameters[2].length == 0) {
        fname = "You";
        sex = 0;
        usersex = "your";
    }
    else {
        fname = parameters[2];
        sex = parameters[3];
        switch (sex) {
            case '0':
                usersex = 'your';
                break;
            case '1':
                usersex = 'his';
                break;
            case '2':
                usersex = 'her';
                break;
            default:
                usersex = 'your';
                break;
        }
    }
}

function write_settings() {
    var settings = wait1+'|'+wait2+'|'+fname+'|'+sex;
    createCookie('pfh_settings',settings);
}
read_settings();

// *******************************
// MY SETTINGS
var myid = '';
/*
if (myid !== userid) {
    alert('Sorry folks, due to Zynga code changes the BM is currently down. Check back in a few hours. ~Scruffy');
    return;
}
if (myid !== userid) {
    alert('PFightHelper is running again, however it seems to work better in Chrome right now than it does in FireFox...and Zynga is still having bucketloads of problems on their end, especially with Error 500 responses and regarding exceptions in their jQuery engine...');
}
*/
if (myid==userid) {
    norepeat='';
    bank_threshold = (fight_city==6 ? '10000' : '10000000');
    heal_threshold=500;
    wait2=1;
    clans="";
    goforice="checked";
    suistop=3000;
    gfphealth="checked";
    immediate="checked";
    gfpstam="checked";
    gfpstop=(cur_gfp-100 > 0 ? cur_gfp-100 : 0);
    monhealth="checked";
    allstop=5000;
}

var looterid = "";
if (looterid==userid) {
    norepeat='';
    bank_threshold = (fight_city==6 ? '10000' : '10000000');
    heal_threshold=30;
    wait2=1;
    clans="";
    gfpstam="checked";
    gfpstop=(cur_gfp-100 > 0 ? cur_gfp-100 : 0);
    monhealth="checked";
    suistop=1000;
    allstop=200;
    mafiamax = 450;
    levelmax = 2000;
}

var fbusername='';
function fbreturn2(fbfr){
    if (fbfr && fbfr[0]) {
        fbusername = fbfr[0].name;
    }
}
function getFBName2(id){
    var fql="SELECT uid, name FROM user WHERE uid=" + id + " ORDER BY name";
    try {
        FB.Facebook.apiClient.fql_query(fql, fbreturn2);
    }
    catch (fberr) {}
}

var fbname="";
var curid="";
function fbreturn(fbfr){
    if (fbfr && fbfr[0]) {
        fbname = fbfr[0].name;
        curid = fbfr[0].uid;
        update_name();
    }
}
var cur_os = 0;
function getFBName(id){
    //FB.Facebook.init('ca98fdb0b8bc57827c7e72786e03d68a', 'http://www.exellerate.com/mafia/');
    cur_os = targetlist.length - targets.length;
    var fql="SELECT uid, name FROM user WHERE uid=" + id + " ORDER BY name";
    try {
        FB.Facebook.apiClient.fql_query(fql, fbreturn);
    }
    catch (fberr) {}
}

var fbfname="";
var curuserid="";
function fbreturn2(fbfr){
    if (fbfr && fbfr[0]) {
        fbfname = fbfr[0].name;
        curid = fbfr[0].uid;
    }
}
function getUserName(id){
    var fql="SELECT uid, first_name FROM user WHERE uid=" + id + " ORDER BY name";
    try {
        FB.Facebook.apiClient.fql_query(fql, fbreturn2);
    }
    catch (fberr) {}
}

// from Yevgen Silant'yev, http://joyka.pp.ua/
function getMWURL() {
    str = document.location;
    str = str.toString();
    beg = str.substring(0,str.indexOf('?')+1);
    str = str.substring(str.indexOf('?')+1);
    str = str.split('&');
    mid = '';
    for(var i=0;i<str.length;i++){
        if (str[i].indexOf('sf_xw_')==0){
            mid=mid+str[i]+'&';
        }
    }
    return beg+mid;
}
var MWURL = getMWURL();
var sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(MWURL);
var heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=1&ajax=1&skip_req_frame=1';

function parseCash(cash) {
    var c = cash;
    if (typeof(c) == 'string') {
        c = c.replace(/[A-Z$,'']/g, '');
    }
    return parseInt(c);
}

// createCookie from Vern's Toolkit http://vern.com/mwtools/
function createCookie(name,value) {
    // expire 7 days from now
    var expires = new Date();
    expires.setDate(expires.getDate()+7);
    document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
}

// readCookie from Vern's Toolkit http://vern.com/mwtools/
function readCookie(name) {
    var i,
        cookie,
        nameEQ = name+"=",
        cookieArray = document.cookie.split(";");
    for (i=0; i< cookieArray.length; i++) {
        cookie = cookieArray[i];
        while (cookie.charAt(0)==' ')
            cookie = cookie.substring(1,cookie.length);
        if (cookie.indexOf(nameEQ) == 0)
            return cookie.substring(nameEQ.length,cookie.length);
    }
    return null;
}

// begin opera base64 patch from Yevgen Silant'yev
if (typeof window.atob === "undefined") {
    window.atob= function(input, output, chr1, chr2, chr3, enc1, enc2,enc3, enc4, i) {
        b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        output = '';
        i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = b64.indexOf(input.charAt(i++));
            enc2 = b64.indexOf(input.charAt(i++));
            enc3 = b64.indexOf(input.charAt(i++));
            enc4 = b64.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        return output;
    };
}
if (typeof window.btoa === "undefined") {
    window.btoa= function (input, b64, output, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i) {
        b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        output = '';
        i = 0;
        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else
            if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + b64.charAt(enc1) + b64.charAt(enc2) +b64.charAt(enc3) + b64.charAt(enc4);
        }
        while (i < input.length);
        return output;
    };
}
// end opera base64 patch

try {
    travelbase=atob(document.getElementById('travel_menu').childNodes[1].href.substring(72));
    if ((m=/tmp=([0-9a-f]*)/.exec(travelbase))) {
        travelkey='&tmp='+m[1];
    }
}
catch (err) {
//if (m=/travel.*?tmp=([0-9a-f]*)/.exec(document.getElementById("mw_masthead").innerHTML)) { travelkey='&tmp='m[1]; }
//if (m=/travel.*?sf_xw_user_id=(\d+).*?sf_xw_sig=([a-f0-9]+)/.exec(document.getElementById("mw_masthead").innerHTML)) { travelkey='&sf_xw_user_id='+m[1]+'&sf_xw_sig='+m[2]; }
}

//new city check inspired by attackX ajax
if ((m=/mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className))) {
    if (m[1] == 1) {
        city = 'New York';
        healcity = 'New York';
        fightcity = 'New York';
        xw_city=1;
    }
    if (m[1] == 2) {
        city = 'Cuba';
        healcity = 'Cuba';
        fightcity = 'Cuba';
        xw_city=2;
    }
    if (m[1] == 3) {
        city = 'Moscow';
        healcity = 'Moscow';
        fightcity = 'Moscow';
        xw_city=3;
    }
    if (m[1] == 4) {
        city = 'Bangkok';
        healcity = 'Bangkok';
        fightcity = 'Bangkok';
        xw_city=4;
    }
    if (m[1] == 5) {
        city = 'Las Vegas';
        healcity = 'Las Vegas';
        fightcity = 'Las Vegas';
        xw_city=5;
    }
    if (m[1] == 6) {
        city = 'Italy';
        healcity = 'Italy';
        fightcity = 'Italy';
        xw_city=6;
    }
}

//var wait1 = readCookie('scruffyaX_wait1');
//if (wait1) { wait1=wait1.replace(/[^0-9]/g,''); }
if ((wait1 == null) || (wait1.length == 0)) {
    wait1 = 1;
}
//var wait2 = readCookie('scruffyaX_wait2');
//if (wait2) { wait2=wait2.replace(/[^0-9]/g,''); }
if ((wait2 == null) || (wait2.length == 0)) {
    wait2 = 3;
}
healcity = readCookie('_healcity');
if ((healcity == 'New York') || (healcity == 'Cuba') || (healcity == 'Moscow') || (healcity == 'Bangkok') || (healcity == 'Disabled')) {
    healcity = readCookie('_healcity');
}
else {
    healcity = 'New York';
}
//onevent = readCookie('scruffyaX_onevent');
if ((onevent == 'Continue') || (onevent=='Pause')) { }
else {
    onevent = 'Continue';
}
//log_size = readCookie('scruffyaX_logsize');
//if (log_size) { log_size=log_size.replace(/[^0-9]/g,''); }
//if ((log_size == null) || (log_size.length == 0)) { log_size = 0; }
if (healcity == 'New York') {
    heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=1&ajax=1&skip_req_frame=1';
}
if (healcity == 'Cuba') {
    heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=2&ajax=1&skip_req_frame=1';
}
if (healcity == 'Moscow') {
    heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=3&ajax=1&skip_req_frame=1';
}
if (healcity == 'Bangkok') {
    heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=4&ajax=1&skip_req_frame=1';
}
if (healcity == 'Disabled') {
    heal_url = ' ';
}

var listdata="";

function fill_list() {
	targetarray = [];
	targetlist = [];
	targetdefenselist = [];
	targetserverlist = [];
	targetlevellist = [];
	targetstrengthlist = [];
	targets = [];
	os = 0;
    var cnt=0;
    var i = 0;
	if (/main_table fight_table/.test(document.getElementById("inner_page").innerHTML)) {
        loadfightlist();
		if ((fightlist=(targetlist.length>0))) {
			targets = targetlist;
		}
    } else if (/class="title"/.test(document.getElementById("inner_page").innerHTML)) {
        if ((m=/opponent_id=p%7C([0-9]*)/.exec(document.getElementById("inner_page").innerHTML))) {
            targetlist[cnt] = 'p|'+m[1];
            targetzidlist[cnt] = 'p|'+m[1];
            targetnamelist[cnt] = '';
            targeticlist[cnt] = '';
            targetfbnamelist[cnt]="";
            targetserverlist[cnt] = '';
            targetdefenselist[cnt] = '';
            targetlevellist[cnt] = '';
            targetattackslist[cnt] = 0;
            targetsuicidelist[cnt] = 0;
            targetstrengthlist[cnt] = '';
            targetstrength1list[cnt] = '';
            targetstrength2list[cnt] = '';
            targetstatuslist[cnt] = '';
            targetofp[cnt] = '';
            targetmafialist[cnt] = false;
            targetdeadlist[cnt++] = false;
        }
        fightlist=(targetlist.length>0);
        if (fightlist) {
            targets = targetlist;
        }
    }
}
fill_list();

function field_validate(key_code){
    if ((key_code>=48 && key_code<=57) || key_code==8 || key_code==127 || key_code==9 || key_code==13 || key_code==17){
        return true;
    }
    return false;
}

var config_html =
'<style type="text/css">'+
'.messages img{margin:0 3px;vertical-align:top};'+
'.messages iframe{border:0;margin:0 3px};'+
'#close{display:inline};'+
'</style>'+
'<form action="https://www.paypal.com/cgi-bin/webscr" method="post">' +
'<table>'+
'<tr><td style="text-align:right;font-size:1.1em"><center><span class="good">'+version+''+
'</span>' +
'</center></td></tr></table></form>' +
'<form name="scruffyform">'+
'<table class="messages">'+
'<tr><td colspan="2">Configuration</td>'+
    '<td align="right" valign="middle" style="text-align:right;font-size:0.8em">' +
    '<a href="#" id="close"><img src="http://www.scruffys-mwbm.com/picts/stop.gif" title="Close" width="16" height="16"></a></td></tr>'+
'<tr><td>Delay interval:</td><td><input type="text" name="wait1" id="wait1" value="'+wait1+'" size="2">-<input type="text" name="wait2" id="wait2" value="'+wait2+'" size="2"></td><td>Delay in seconds between actions.</td></tr>'+
'<tr><td>Action:</td><td colspan="3" align="left" style="text-align:left;"><span class="good">I WANT TO</span> '+
'<select name="acttype" id="acttype">'+
'<option value="0" selected>KEEL!</option>'+
'<option value="1">FEED LIVE LINKS</option>'+
'<option value="2">PROFILE</option>'+
'<option value="3">HIT LIST</option>'+
'<option value="4">AUTO HEAL IN NY</option>'+
//    '<option value="5">SUCKER PUNCH</option>'+
'</select></td></tr>'+
'<tr id="manual_list">'+
'<td>Enemy List:</td>'+
'<td colspan="3"><textarea name="targetlist" id="targetlist" class="instructions" rows="5" cols="50">'+
'Enter in this box a list of your enemies.\n'+
'Enter FB ID\'s or Zynga ID\'s, one per line.\n'+
'\n'+
'Examples:\n'+
'123123123123\n'+
'p|27653\n'+
'456456456\n'+
'7898798343\n'+
'</textarea></td>'+
'</tr>'+
'</table>'+
'<table class="messages">'+
'<tr id="limitview"><td>Limit:</td><td>Do not exceed <input type="text" name="allstop" id="allstop" value="'+allstop+'" size="2"> hits on any one target.</td></tr>'+
'<tr id="norepeatview"><td>No Repeat:</td><td><input type="checkbox" name="norepeat" id="norepeat" '+norepeat+'/> Do not ice the same target twice in a row.</td></tr>'+
'<tr id="bankview"><td>Bank:</td><td>Auto bank money when it is over <input type="text" name="bank_threshold" id="bank_threshold" value="'+bank_threshold+'" size="20" onkeydown="return field_validate(event.keyCode);">.</td></tr>'+
'<tr id="cashview"><td>Cash Drop:</td><td>Skip target if they drop less then <input type="text" name="cashdrop" id="cashdrop" value="'+cashdrop+'" size="5" onkeydown="return field_validate(event.keyCode);"> $$$$.</td></tr>'+
'<tr id="healview"><td>Heal:</td><td>Heal when health gets below <input type="text" name="heal_threshold" id="heal_threshold" value="'+heal_threshold+'" size="4" onkeydown="return field_validate(event.keyCode);">.</td></tr>'+
'<tr id="clanview"><td>Clans:</td><td><input type="checkbox" name="clans" id="clans" '+clans+'/> Try to avoid clan tags</td></tr>'+
'<tr id="mafiaview"><td>Mafia:</td><td>Fight mafia with <input type="text" name="mafiamax" id="mafiamax" value="'+mafiamax+'" size="3"> mems or less and level <input type="text" name="levelmax" id="levelmax" value="'+levelmax+'" size="3"> or less.</td></tr>'+
'<tr id="pwrview"><td>Pwr Attack:</td><td><input type="checkbox" name="pwrattack" id="pwrattack" '+pwrattack+'/> Use Power Attack when available. (less chance of loot drops)</td></tr>'+
'<tr id="suiview"><td>Suicide:</td><td><input type="checkbox" name="goforice" id="goforice" '+goforice+'/> Go for Ice if losing, but stop after <input type="text" name="suistop" id="suistop" value="'+suistop+'" size="2" /> hits.</td></tr>'+
'<tr id="removeview"><td>Remove/Attack:</td><td><input type="checkbox" name="remove" id="remove" '+remove+'/> Auto remove target from your Mafia & attack.</td></tr>'+
'<tr id="styleview"><td>MW Style:</td><td><input type="checkbox" name="mwstyle" id="mwstyle" '+mwstyle+'/> Show MW Style text in logs and brags.</td></tr>'+
'<tr id="styleview2"><td>&nbsp;</td><td><input type="text" name="fname" id="fname" value="'+fname+'" size="15">  just brought '+
'<select name="sex" id="sex">'+
    '<option value="0" '+(sex==0?'selected':'')+'>your</option>'+
    '<option value="1" '+(sex==1?'selected':'')+'>his</option>'+
    '<option value="2" '+(sex==2?'selected':'')+'>her</option>'+
    '</select> body count to...</td></tr>'+
'<tr id="bragview"><td>Brag Name:</td><td><input type="checkbox" name="bragnm" id="bragnm" '+bragnm+'/> Add FB name to the brags. (for clans that all have the same MW name)</td></tr>'+
'<tr id="sprdview"><td>Make Spread:</td><td><input type="checkbox" name="makespread" id="makespread" '+makespread+'/> Hit everyone '+
'<select name="sprdtype" id="sprdtype">'+
    '<option value="0" selected>at least</option>'+
    '<option value="1">only</option>'+
    '</select> once for stats.</td></tr>'+
'<tr id="healthview"><td>Health:</td><td><input type="checkbox" name="monhealth" id="monhealth" '+monhealth+'/> Monitor health continuously.</td></tr>'+
'<tr id="gfpview"><td>GFP for Health:</td><td><input type="checkbox" name="gfphealth" id="gfphealth" '+gfphealth+'/> '+
    'Use GFP to heal.  Leave me <input type="text" name="gfpstop" id="gfpstop" value="'+gfpstop+'" size="5" /> GFP. '+
    '<input type="checkbox" name="immediate" id="immediate" '+immediate+' /> Heal immediately! (don\'t try to heal with $$ first)</td></tr>'+
'<tr id="gfp2view"><td>GFP for Stamina:</td><td><input type="checkbox" name="gfpstam" id="gfpstam" '+gfpstam+'/> Use GFP to replenish stamina.</td></tr>'+
'<tr id="moreiceview"><td>Get more Ice:</td><td><input type="checkbox" name="moreice" id="moreice" '+moreice+'/> Load new fight list when done.</td></tr>'+
'<tr id="redoview"><td>Restart:</td><td><input type="checkbox" name="redo" id="redo" '+redo+'/> Rerun list when complete. '+
'<select name="sorttype" id="sorttype">'+
'<option value="0" selected>Do not sort</option>'+
'<option value="1">Sort</option>'+
'</select> alive targets to the top.</td></tr>'+
'<tr><td>Debug:</td><td><input type="checkbox" name="debug" id="debug" /> Output messages for debugging?</td></tr>'+
'<tr><td colspan="3"><a class="sexy_button" id="start">Start</a></td></tr>'+
'</table>'+
'</form>';

var running_html =
'<style type="text/css">'+
'.messages img{margin:0 3px;vertical-align:middle}'+
'.messages iframe{border:0;margin:0 3px}'+
'.messages input {border: 1px solid #FFF;margin 0;padding 0;background: #000; color: #FFF; width: 30px;}'+
'#play{display:none}'+
'#pause{display:inline}'+
'#close{display:inline}'+
'</style>'+
'<form action="https://www.paypal.com/cgi-bin/webscr" method="post">' +
'<table>'+
'<tr><td style="text-align:right;font-size:1.1em"><center><span class="good">'+version+' '+
'</span>' +
'</center></td></tr></table></form>' +
'<iframe id="PIFrame" name="PIFrame"'+
'style="width:0px; height:0px; border: 0px"'+
'src="http://www.scruffys-mwbm.com/blank.html"></iframe>'+
'<table class="messages" width="747px">'+
'<tr>'+
'<td width="8%">Attacks:</td>'+
'<td><span id="attacks">0</span> (<span id="attack">'+attack+'</span> left) &nbsp; <span id="lost"></span>'+
'<span id="progress"></span> &nbsp; (<a href="#" id="remaining">Remain</a>)&nbsp;(<a href="#" id="all">All</a>)&nbsp;(<a href="#" id="spread">Spread Sheet</a>)&nbsp;</td>'+
'<td align="right" style="text-align:right">'+
'<a href="#" id="play"><img src="http://www.scruffys-mwbm.com/picts/play.gif" title="Play" width="16" height="16" /></a> '+
'<a href="#" id="pause"><img src="http://www.scruffys-mwbm.com/picts/pause.gif" title="Pause" width="16" height="16" /></a> '+
'<a href="#" id="close"><img src="http://www.scruffys-mwbm.com/picts/stop.gif" title="Close" width="16" height="16" /></a></td>'+
'</tr>'+
'<tr>'+
'<td>Exp:</td>'+
'<td id="exp_gained"></td>'+
'<td align="right" style="text-align:right;"><a href="#" id="onevent">'+onevent+'</a> on level-up - <a href="#" id="lootshow">Show</a> loot</td>'+
'</tr>'+
'<tr>'+
'<tr>'+
'<td>Money:</td>'+
'<td id="money_gained"></td>'+
'<td align="right" style="text-align:right;"><span id="zecity"></span> Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="4" /> to <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="4" /> sec</td>'+
'</tr>'+
'<tr>'+
'<td id="damagetitle">Damage:</td>'+
'<td id="damage"></td>'+
'<td align="right" style="text-align:right;" name = "hmon" id="hmon">Healing at '+heal_threshold+' in <a href="#" id="heal">'+healcity+'</a></td>'+
'</tr>'+
'<tr>'+
'<td>A & D:</td>'+
'<td id="ad_gained"></td>'+
'<td align="right" style="text-align:right;" id="icekills">Ices 0  Kills 0</td>'+
'</tr>'+
'<tr>'+
'<td>Time:</td>'+
'<td id="timeref"></td>'+
'<td align="right" style="text-align:right;" id="gfpref"></td>'+
'</tr>'+
'<tr>'+
'<td>Status:</td>'+
'<td colspan="2" id="status"></td>'+
'</tr>'+
'<tr id="lootrow">'+
'<td valign="top">Loot:</td>'+
'<td colspan="2" id="loot"></td>'+
'</tr>'+
'</table>'+
'<table class="messages">'+
'<tr>'+
'<td valign="top">Target:</td>'+
'<td align="left" style="text-align:left;" id="fbname"></td>'+
'</tr>'+
'<tr>'+
'<td colspan="2" valign="top" align="center" style="text-align:center;">'+
'List: (<a href="#" id="reset">Over</a>&nbsp;|&nbsp;<a href="#" id="skip">Skip</a>)&nbsp;&nbsp;&nbsp;&nbsp;'+
'Brags: (<a href="#" id="popbrags">Pop</a>&nbsp;|&nbsp;<a href="#" id="clearbrags">Clear</a>)&nbsp;&nbsp;&nbsp;&nbsp;'+
'Links: (<a href="#" id="poplinks">Pop</a>&nbsp;|&nbsp;<a href="#" id="clearlinks">Clear</a>)&nbsp;&nbsp;&nbsp;&nbsp;'+
'<a href="#" id="rapidfire">Rapid Fire</a>&nbsp;&nbsp;&nbsp;&nbsp;'+
'<span id="cur_hit">Target 0 of 0 (0 hits)</span></td>'+
'</tr>'+
'</table>'+
'<table class="messages">'+
'<tr>'+
'<td><a href="#" id="logshow">Showing Log</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" id="clear_log">Clear Log</a></td>'+
'</tr>'+
'<tr>'+
'<td id="log" valign="top"></td>'+
'</tr>'+
'</table>';

function create_div() {
    if (document.getElementById('scruffydiv')) {
        document.getElementById('scruffydiv').innerHTML = config_html;
    }
    else {
        var scruffy_div=document.createElement("div");
        scruffy_div.id = 'scruffydiv';
        scruffy_div.innerHTML = config_html;
        content.appendChild(scruffy_div, content.firstChild);
    }
}

create_div();

document.getElementById('wait1').onkeyup=function() {
    time = parseInt(document.getElementById('wait1').value);
    if((time < 0) || (!time)) { wait1 = 1; }
    else { wait1 = time; }
    document.getElementById('wait1').value = wait1;
    write_settings();
};
document.getElementById('wait2').onkeyup=function() {
    time = parseInt(document.getElementById('wait2').value);
    if((time < 0) || (!time)) { wait2 = 0; }
    else { wait2 = time; }
    document.getElementById('wait2').value = wait2;
    write_settings();
};

document.getElementById('fname').onkeyup=function() {
    fname = document.getElementById('fname').value;
    write_settings();
}

document.getElementById('sex').onchange=function(e) {
    sex = document.getElementById('sex').value;
    switch (sex) {
        case '0':
            usersex = 'your';
            break;
        case '1':
            usersex = 'his';
            break;
        case '2':
            usersex = 'her';
            break;
    }
    write_settings();
}

if (fightlist) {
    document.getElementById("norepeatview").style.display = 'none';
    document.getElementById("targetlist").value="FIGHT LIST OR FIGHT PROFILE";
    document.getElementById("mafiaview").style.display = 'table-row';
    document.getElementById("cashview").style.display = 'table-row';
    document.getElementById("clanview").style.display = 'table-row';
    document.getElementById("sprdtype").style.display = 'none';
    document.getElementById("sprdview").style.display = 'none';
    document.getElementById("moreiceview").style.display = 'table-row';
    document.getElementById("sorttype").style.display = 'none';
    document.getElementById("redoview").style.display = 'none';
} else {
    document.getElementById("norepeatview").style.display = 'table-row';
    document.getElementById("mafiaview").style.display = 'none';
    document.getElementById("cashview").style.display = 'none';
    document.getElementById("clanview").style.display = 'none';
    document.getElementById("sprdtype").style.display = 'inline';
    document.getElementById("sprdview").style.display = 'table-row';
    document.getElementById("moreiceview").style.display = 'none';
    document.getElementById("sorttype").style.display = 'inline';
    document.getElementById("redoview").style.display = 'table-row';
}

//document.getElementById('header_top_promo_banner').innerHTML = '';

document.getElementById('close').onclick=function(e) {
    run = 0;
    document.getElementById(div_parent).removeChild(document.getElementById("scruffydiv"));
    return false;
}

//    document.getElementById("verytop").removeChild(document.getElementById("FB_HiddenContainer"));

document.getElementById("makespread").onclick=function(e) {
    if (document.scruffyform.makespread.checked) {
        document.getElementById("sprdtype").style.display = 'inline';
    } else {
        document.getElementById("sprdtype").style.display = 'none';
    }
}

document.getElementById("targetlist").onfocus=function(e) {
    document.getElementById("targetlist").value="";
    document.getElementById("targetlist").style.color="#000";
    document.getElementById("targetlist").onfocus=null;
    document.getElementById("mafiaview").style.display = 'none';
    document.getElementById("clanview").style.display = 'none';
    fightlist=false;
    moreice="";
    if (document.getElementById('acttype').value=="0") {
        document.getElementById("norepeatview").style.display = 'table-row';
        document.getElementById("cashview").style.display = 'none';
        document.getElementById("sprdview").style.display = 'table-row';
        document.getElementById("moreiceview").style.display = 'none';
        document.getElementById("redoview").style.display = 'table-row';
    }
}

document.getElementById('acttype').onchange=function(e) {
    switch (document.getElementById('acttype').value) {
        case '0':
            // keeel
            if (fightlist) {
                document.getElementById("mafiaview").style.display = 'table-row';
                document.getElementById("cashview").style.display = 'table-row';
            } else {
                document.getElementById("mafiaview").style.display = 'none';
                document.getElementById("cashview").style.display = 'none';
            }
            document.getElementById("targetlist").style.display = 'inline';
            document.getElementById("manual_list").style.display = 'table-row';
            document.getElementById("norepeatview").style.display = 'table-row';
            document.getElementById("limitview").style.display = 'table-row';
            document.getElementById("norepeatview").style.display = 'table-row';
            document.getElementById("bankview").style.display = 'table-row';
            document.getElementById("healview").style.display = 'table-row';
            document.getElementById("clanview").style.display = 'none';
            document.getElementById("pwrview").style.display = 'table-row';
            document.getElementById("suiview").style.display = 'table-row';
            document.getElementById("removeview").style.display = 'table-row';
            document.getElementById("styleview").style.display = 'table-row';
            document.getElementById("styleview2").style.display = 'table-row';
            document.getElementById("bragview").style.display = 'table-row';
            document.getElementById("sprdtype").style.display = 'inline';
            document.getElementById("sprdview").style.display = 'table-row';
            document.getElementById("moreiceview").style.display = 'table-row';
            document.getElementById("immediate").style.display = 'inline';
            document.getElementById("gfpview").style.display = 'table-row';
            document.getElementById("gfp2view").style.display = 'table-row';
            document.getElementById("healthview").style.display = 'table-row';
            document.getElementById("sorttype").style.display = 'inline';
            document.getElementById("redoview").style.display = 'table-row';
            break;
        case '1':
            // feed live links
            document.getElementById("targetlist").style.display = 'inline';
            document.getElementById("mafiaview").style.display = 'none';
            document.getElementById("manual_list").style.display = 'table-row';
            document.getElementById("norepeatview").style.display = 'none';
            document.getElementById("limitview").style.display = 'none';
            document.getElementById("norepeatview").style.display = 'none';
            document.getElementById("bankview").style.display = 'none';
            document.getElementById("cashview").style.display = 'none';
            document.getElementById("healview").style.display = 'none';
            document.getElementById("clanview").style.display = 'none';
            document.getElementById("pwrview").style.display = 'none';
            document.getElementById("suiview").style.display = 'none';
            document.getElementById("removeview").style.display = 'none';
            document.getElementById("styleview").style.display = 'none';
            document.getElementById("styleview2").style.display = 'none';
            document.getElementById("bragview").style.display = 'none';
            document.getElementById("sprdtype").style.display = 'none';
            document.getElementById("sprdview").style.display = 'none';
            document.getElementById("moreiceview").style.display = 'none';
            document.getElementById("immediate").style.display = 'none';
            document.getElementById("gfpview").style.display = 'none';
            document.getElementById("gfp2view").style.display = 'none';
            document.getElementById("healthview").style.display = 'none';
            document.getElementById("sorttype").style.display = 'inline';
            document.getElementById("redoview").style.display = 'table-row';
            break;
        case '2':
            // profile
            document.getElementById("targetlist").style.display = 'inline';
            document.getElementById("mafiaview").style.display = 'none';
            document.getElementById("manual_list").style.display = 'table-row';
            document.getElementById("limitview").style.display = 'none';
            document.getElementById("norepeatview").style.display = 'none';
            document.getElementById("norepeatview").style.display = 'none';
            document.getElementById("bankview").style.display = 'none';
            document.getElementById("cashview").style.display = 'none';
            document.getElementById("healview").style.display = 'none';
            document.getElementById("clanview").style.display = 'none';
            document.getElementById("pwrview").style.display = 'none';
            document.getElementById("suiview").style.display = 'none';
            document.getElementById("removeview").style.display = 'none';
            document.getElementById("styleview").style.display = 'none';
            document.getElementById("styleview2").style.display = 'none';
            document.getElementById("bragview").style.display = 'none';
            document.getElementById("sprdtype").style.display = 'none';
            document.getElementById("sprdview").style.display = 'none';
            document.getElementById("moreiceview").style.display = 'none';
            document.getElementById("immediate").style.display = 'table-row';
            document.getElementById("gfpview").style.display = 'table-row';
            document.getElementById("gfp2view").style.display = 'none';
            document.getElementById("healthview").style.display = 'table-row';
            document.getElementById("sorttype").style.display = 'none';
            document.getElementById("redoview").style.display = 'none';
            break;
        case '3':
            // hit list
            document.getElementById("targetlist").style.display = 'inline';
            document.getElementById("mafiaview").style.display = 'none';
            document.getElementById("manual_list").style.display = 'table-row';
            document.getElementById("limitview").style.display = 'none';
            document.getElementById("norepeatview").style.display = 'none';
            document.getElementById("bankview").style.display = 'none';
            document.getElementById("cashview").style.display = 'none';
            document.getElementById("healview").style.display = 'table-row';
            document.getElementById("clanview").style.display = 'none';
            document.getElementById("pwrview").style.display = 'none';
            document.getElementById("suiview").style.display = 'none';
            document.getElementById("removeview").style.display = 'none';
            document.getElementById("styleview").style.display = 'none';
            document.getElementById("styleview2").style.display = 'none';
            document.getElementById("bragview").style.display = 'none';
            document.getElementById("sprdtype").style.display = 'none';
            document.getElementById("sprdview").style.display = 'none';
            document.getElementById("moreiceview").style.display = 'none';
            document.getElementById("immediate").style.display = 'inline';
            document.getElementById("gfpview").style.display = 'table-row';
            document.getElementById("gfp2view").style.display = 'table-row';
            document.getElementById("healthview").style.display = 'none';
            document.getElementById("sorttype").style.display = 'inline';
            document.getElementById("redoview").style.display = 'table-row';
            break;
        case '4':
            // auto heal
            document.getElementById("targetlist").style.display = 'none';
            document.getElementById("mafiaview").style.display = 'none';
            document.getElementById("manual_list").style.display = 'none';
            document.getElementById("limitview").style.display = 'none';
            document.getElementById("norepeatview").style.display = 'none';
            document.getElementById("bankview").style.display = 'none';
            document.getElementById("cashview").style.display = 'none';
            document.getElementById("healview").style.display = 'table-row';
            document.getElementById("clanview").style.display = 'none';
            document.getElementById("pwrview").style.display = 'none';
            document.getElementById("suiview").style.display = 'none';
            document.getElementById("removeview").style.display = 'none';
            document.getElementById("styleview").style.display = 'none';
            document.getElementById("styleview2").style.display = 'none';
            document.getElementById("bragview").style.display = 'none';
            document.getElementById("sprdtype").style.display = 'none';
            document.getElementById("sprdview").style.display = 'none';
            document.getElementById("moreiceview").style.display = 'none';
            document.getElementById("immediate").style.display = 'none';
            document.getElementById("gfpview").style.display = 'none';
            document.getElementById("gfp2view").style.display = 'none';
            document.getElementById("healthview").style.display = 'none';
            document.getElementById("sorttype").style.display = 'none';
            document.getElementById("redoview").style.display = 'none';
            break;
        case '5':
            // sucker punch
            document.getElementById("targetlist").style.display = 'none';
            document.getElementById("mafiaview").style.display = 'none';
            document.getElementById("manual_list").style.display = 'none';
            document.getElementById("limitview").style.display = 'none';
            document.getElementById("norepeatview").style.display = 'none';
            document.getElementById("bankview").style.display = 'none';
            document.getElementById("cashview").style.display = 'none';
            document.getElementById("healview").style.display = 'table-row';
            document.getElementById("pwrview").style.display = 'none';
            document.getElementById("suiview").style.display = 'none';
            document.getElementById("removeview").style.display = 'none';
            document.getElementById("styleview").style.display = 'none';
            document.getElementById("styleview2").style.display = 'none';
            document.getElementById("bragview").style.display = 'none';
            document.getElementById("sprdtype").style.display = 'none';
            document.getElementById("sprdview").style.display = 'none';
            document.getElementById("moreiceview").style.display = 'none';
            document.getElementById("immediate").style.display = 'inline';
            document.getElementById("gfpview").style.display = 'table-row';
            document.getElementById("gfp2view").style.display = 'table-row';
            document.getElementById("healthview").style.display = 'none';
            document.getElementById("sorttype").style.display = 'none';
            document.getElementById("redoview").style.display = 'none';
            break;
    }
}



var brags='';
function bragpop() {
    var generator=window.open('','bragpopup','height=500,width=1000');
    generator.document.write('<html><head><title>Bragging Rights</title>');
    generator.document.write('</head><body>');
    generator.document.write('<textarea rows="20" cols="100">');
    generator.document.write(brags);
    generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
    generator.document.write('</body></html>');
    generator.document.close();
}

var links='';
function linkpop() {
    var generator=window.open('','linkpopup','height=500,width=1000');
    generator.document.write('<html><head><title>Alive Links</title>');
    generator.document.write('</head><body>');
    generator.document.write('<textarea rows="20" cols="100">');
    generator.document.write(links);
    generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
    generator.document.write('</body></html>');
    generator.document.close();
}

function codepop() {
    var generator=window.open('','codepopup','height=500,width=1000');
    //	generator.document.write('<html><head><title>Unhandled Result Page</title>');
    //	generator.document.write('</head><body>');
    //generator.document.write('<textarea rows="20" cols="180">');
    generator.document.write(msg_rtn);
    //	generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
    //	generator.document.write('</body></html>');
    generator.document.close();
}

function dirtypop() {
    var generator=window.open('','remainingids','height=500,width=500');
    generator.document.write('<html><head><title>Enemies remaining to check</title>');
    generator.document.write('</head><body>');
    generator.document.write('<pre>Number of enemies in this list: '+targets.length+'</pre><textarea rows="20">');
    for(i = 0; i < targets.length; i++) {
        generator.document.write(targets[i]+'\n');
    }
    generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
    generator.document.write('</body></html>');
    generator.document.close();
}

function allpop() {
    var generator=window.open('','allids','height=500,width=500');
    generator.document.write('<html><head><title>All Enemies</title>');
    generator.document.write('</head><body>');
    generator.document.write('<pre>Number of enemies in this list: '+targets.length+'</pre><textarea rows="20">');
    for(i = 0; i < targetlist.length; i++) {
        generator.document.write(targetlist[i]+'\n');
    }
    generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
    generator.document.write('</body></html>');
    generator.document.close();
}

function spreadpop() {
    var generator=window.open('','ss','height=500,width=1500');
    generator.document.write('<html><head><title>Enemy Hit List (paste into a Google spreadsheet)</title>');
    generator.document.write('</head><body>');
    generator.document.write('<pre>Number of enemies in this list: '+targetlist.length+'</pre><textarea rows="20" cols="180">');
    generator.document.write('FBID\tZID\tMW NAME\tSVR\tDEFENSE\tLEVEL\tICE CHK\tMW\tLOWEST GREEN\tHIGHEST RED\tFWON\tFLOST\tWON%\tICES\tWHACKS\tWHACK%\tFB NAME\tFB\tIN MAFIA\tLAST ALIVE\n');
    for(i = 0; i < targetlist.length; i++) {
        if (!targetfbnamelist[i]) {
            targetfbnamelist[i] = '';
        }
    }
    for(i = 0; i < targetlist.length; i++) {
        //http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22MTAwMDAwMTY5Mzc1ODMy%22%7D
        generator.document.write(targetlist[i]+'\t'+targetzidlist[i]+
            '\t'+(targetnamelist[i].substr(0,1)=="=" ? "'" : "") + targetnamelist[i]+
            '\t'+targetserverlist[i]+'\t'+targetdefenselist[i]+'\t'+targetlevellist[i]+
            '\t=HYPERLINK("http://apps.facebook.com/inthemafia/track.php?next_controller=hitlist&next_action=set&next_params=%7B%22target_pid%22:%22'+targetzidlist[i].substr(2)+'%22%7D","Ice Check")'+
			'\t=HYPERLINK("http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa(targetzidlist[i]).replace("=","%3D")+'%22%7D","MW Link")'+
//            '\t=HYPERLINK("http://apps.facebook.com/inthemafia/track.php?next_controller=hitlist&next_action=set&next_params={%22target_id%22:%22"&A'+(i+4)+'&"%22}","Ice Check")'+
//            '\t=HYPERLINK("http://apps.facebook.com/inthemafia/profile.php?id={%22user%22:%22"&A'+(i+4)+'&"%22}","MW Link")'+
            '\t'+targetstrength1list[i]+
            '\t'+targetstrength2list[i]+
            '\t'+targetswonlist[i]+
            '\t'+targetslostlist[i]+
            '\t'+'= (K'+(i+4)+'/(K'+(i+4)+'+L'+(i+4)+'))'+
            '\t'+targetsicedlist[i]+
            '\t'+targetswhackedlist[i]+
            '\t'+'= (O'+(i+4)+'/(N'+(i+4)+'+O'+(i+4)+'))'+
            '\t'+(targetfbnamelist[i].substr(0,1)=="=" ? "'" : "") + targetfbnamelist[i]+
			'\t=HYPERLINK("http://www.facebook.com/profile.php?id='+targetlist[i]+'&ref=profile","FB Link")'+
//            '\t=HYPERLINK("http://www.facebook.com/profile.php?id="&A'+(i+4)+'&"&ref=profile","FB Link")'+
            '\t'+(targetmafialist[i] ? 'Y' : '')+
            '\t'+targettimelist[i]+
            '\n');
    }
    generator.document.write('</textarea><pre><a href="javascript:self.close()">Close</a> the popup.</pre>');
    generator.document.write('</body></html>');
    generator.document.close();
}

function start(){
    run = 1;
    xmlHTTP = get_xmlHTTP();
    if (fightlist==false) {
        targetarray=document.scruffyform.targetlist.value.split("\n");
        var cnt=0;
        for (var i=0; i<targetarray.length; i++) {
            if (/^[0-9]+/.test(targetarray[i]) || /^p\|[0-9]+/.test(targetarray[i])) {
                if (/^[0-9]+/.test(targetarray[i])) {
                    targetlist[cnt] = /^([0-9]+)/.exec(targetarray[i])[1];
                    targetserverlist[cnt] = getserver(targetlist[cnt]);
                }
                else {
                    targetlist[cnt] = /^(p\|[0-9]+)/.exec(targetarray[i])[1];
                    targetserverlist[cnt] = '';
                }
                targetzidlist[cnt] = '';
                targetnamelist[cnt] = '';
                targeticlist[cnt] = '';
                targetfbnamelist[cnt]="";
                targetdefenselist[cnt] = '';
                targetlevellist[cnt] = '';
                targetattackslist[cnt] = 0;
                targetsuicidelist[cnt] = 0;
                targetstrengthlist[cnt] = '';
                targetstrength1list[cnt] = '';
                targetstrength2list[cnt] = '';
                targettimelist[cnt] = '';
                targetstatuslist[cnt] = '';
                targetofp[cnt] = '';
                targetdeadlist[cnt++] = false;
            }
        }
        delete targetarray;
        targets = targetlist;
        if (targets.length == 0) {
            alert('You did not fill in the manual list properly. It should be a list of enemy IDs each on separate lines.');
            return false;
        }
    } else {
        redo = '';
    }
    if (fightlist && targets.length==1) {
        fightlist = false;
    }
    time = parseInt(document.getElementById('wait1').value);
    if ((time < 0) || (!time)) {
        wait1 = 2;
    }
    else {
        wait1 = time;
    }
    time = parseInt(document.getElementById('wait2').value);
    if ((time < 0) || (!time)) {
        wait2 = 5;
    }
    else {
        wait2 = time;
    }
    if (wait1 > wait2) {
        time = wait1;
        wait1 = wait2;
        wait2 = time;
    }
    //createCookie("scruffyjobs_wait1",wait1);
    //createCookie("scruffyjobs_wait2",wait2);
    bank_threshold = parseInt(document.getElementById('bank_threshold').value);
    if (!bank_threshold || bank_threshold < 1) {
        bank_threshold = 10000;
    }
    cashdrop = parseInt(document.getElementById('cashdrop').value);
    if (!fightlist || !cashdrop || cashdrop < 0) {
        cashdrop = 0;
    }
    heal_threshold = parseInt(document.getElementById('heal_threshold').value);
    if (!heal_threshold || heal_threshold < 0) {
        heal_threshold = 30;
    }
    hplow = heal_threshold;
    suistop = parseInt(document.getElementById('suistop').value);
    if (!suistop || suistop < 1) {
        suistop = 25;
    }
    allstop = parseInt(document.getElementById('allstop').value);
    if (!allstop || allstop < 1) {
        allstop = 500;
    }
    mafiamax = parseInt(document.getElementById('mafiamax').value);
    if (!mafiamax || mafiamax < 1) {
        mafiamax = 501;
    }
    levelmax = parseInt(document.getElementById('levelmax').value);
    if (!levelmax || levelmax < 1) {
        levelmax = 9999;
    }
    norepeat = (document.scruffyform.norepeat.checked ? "checked" : "");
    acttype = document.scruffyform.acttype.value;
    clans = (document.scruffyform.clans.checked ? "checked" : "");
    pwrattack = (document.scruffyform.pwrattack.checked ? "checked" : "");
    goforice = (document.scruffyform.goforice.checked ? "checked" : "");
    remove = (document.scruffyform.remove.checked ? "checked" : "");
    mwstyle = (document.scruffyform.mwstyle.checked ? "checked" : "");
    bragnm = (document.scruffyform.bragnm.checked ? "checked" : "");
    makespread = (document.scruffyform.makespread.checked ? "checked" : "");
    sprdtype = document.scruffyform.sprdtype.value;
    moreice = (document.scruffyform.moreice.checked ? "checked" : "");
    gfphealth = (document.scruffyform.gfphealth.checked ? "checked" : "");
    gfpstop = parseInt(document.scruffyform.gfpstop.value);
    immediate = (document.scruffyform.immediate.checked ? "checked" : "");
    gfpstam = (document.scruffyform.gfpstam.checked ? "checked" : "");
    monhealth = (document.scruffyform.monhealth.checked ? "checked" : "");
    redo = (document.scruffyform.redo.checked ? "checked" : "");
    sorttype = document.scruffyform.sorttype.value;
    debug = (document.scruffyform.debug.checked ? true : false);
    if (makespread=="checked") {
        sorttype = "0";
    }
    switch (acttype) {
        case '0':
            // keeel
            if (!fightlist) {
                moreice = "";
            } else {
                redo = "";
                if (targets.length < 2) {
                    norepeat = '';
                }
            }
            break;
        case '1':
            // feed live links
            goforice = '';
            remove = '';
            mwstyle = '';
            makespread = '';
            sprdtype = '0';
            moreice = '';
            break;
        case '2':
            // profile
            goforice = '';
            remove = '';
            mwstyle = '';
            makespread = '';
            sprdtype = '0';
            moreice = '';
            sorttype = '';
            redo = "";
            break;
        case '3':
            // hit list
            goforice = '';
            remove = '';
            mwstyle = '';
            makespread = '';
            sprdtype = '0';
            moreice = '';
            break;
        case '4':
            // auto heal
            goforice = '';
            remove = '';
            mwstyle = '';
            makespread = '';
            sprdtype = '0';
            moreice = '';
            redo = '';
            break;
    }

    document.getElementById('scruffydiv').innerHTML = running_html;
    document.getElementById("play").style.display = 'none';
    document.getElementById('delay1').value=wait1;
    document.getElementById('delay2').value=wait2;
    run = 1;
    starttime=timestamp1().replace(/[\[\]]/g,'').substr(2);
    if (monhealth == "checked") {
        document.getElementById("hmon").innerHTML = 'Monitor heal at '+heal_threshold+' in <a href="#" id="heal">'+healcity+'</a>'
    }
    usegfp = '<a>Not using GFP';
    if (gfphealth=="checked" || gfpstam=="checked") {
        if (gfphealth=="checked" && gfpstam=="checked") {
            usegfp = 'Using GFP for <a>'+(immediate == "checked" ? 'quick ' : '') + 'heal/stamina';
        }
        else if (gfphealth=="checked") {
            usegfp = 'Using GFP for <a>'+(immediate == "checked" ? 'quick ' : '') + 'heal';
        }
        else if (gfpstam=="checked") {
            usegfp = 'Using GFP for <a>stam';
        }
    }
    usegfp += '</a>&nbsp;&nbsp;';
    if (gfphealth=="checked" || gfpstam=="checked") {
        usegfp += 'Leaving <a>'+gfpstop+'</a> GFP';
    }
    document.getElementById("gfpref").innerHTML = usegfp;
    update_icekills()
    start_time = new Date();
    update_time();
    log(timestamp()+'Starting Fight Helper...');
    msg('Starting Fight Helper...');

    log(timestamp()+'Number of targets = '+targets.length);
    log(timestamp()+'Max mafia = '+mafiamax+' Max level = '+levelmax);
    tmpkey = '';
    action = '';
    setTimeout(function(){
        attack_again();
    },2000);

    document.getElementById('pause').onclick=function(e) {
        run = 0;
        pauseevent='Manually paused. Target is <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a>.';
        document.getElementById('pause').style.display = 'none';
        document.getElementById('play').style.display = 'inline';
        return false;
    }
    document.getElementById('play').onclick=function(e) {
        run = 1;
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = 'inline';
        if (acttype=="0" && cur_health < hplow) {
            healing();
        }
        else {
            msg('Resuming attacks on target <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a> (<a href="'+last_url+'">url</a>)');
            attack_again();
        }
        return false;
    }
    document.getElementById("skip").onclick=function(e) {
        skip = true;
    }
    document.getElementById("rapidfire").onclick=function(e) {
        rapidfire = true;
    }
    document.getElementById("reset").onclick=function(e) {
        reset = true;
    }
    document.getElementById("clearbrags").onclick=function(e) {
        brags='';
    }
    document.getElementById("popbrags").onclick=function(e) {
        bragpop();
    }
    document.getElementById("clearlinks").onclick=function(e) {
        links='';
    }
    document.getElementById("poplinks").onclick=function(e) {
        linkpop();
    }
    document.getElementById('delay1').onkeyup=function(e) {
        time = parseInt(document.getElementById('delay1').value);
        if (time < 0) {
            wait1 = 1;
        }
        else {
            wait1 = time;
        }
        //createCookie('scruffyaX_wait1',wait1);
        document.getElementById('delay1').value=wait1;
    }
    document.getElementById('delay2').onkeyup=function(e) {
        time = parseInt(document.getElementById('delay2').value);
        if (time < 0) {
            wait2 = 3;
        }
        else {
            wait2 = time;
        }
        //createCookie('scruffyaX_wait2',wait2);
        document.getElementById('delay2').value=wait2;
    }
    document.getElementById("clear_log").onclick=function(e) {
        clear_log();
    }
    document.getElementById('onevent').onclick=function(e) {
        if (onevent == 'Continue') {
            onevent = 'Pause';
            document.getElementById('onevent').innerHTML = onevent;
        }
        else {
            onevent = 'Continue';
            document.getElementById('onevent').innerHTML = onevent;
        }
        //createCookie('scruffyaX_onevent',onevent);
        return false;
    }
    document.getElementById('close').onclick=function(e) {
        run = 0;
        if (typeof min_timer != 'undefined' && min_timer !== null) {
            clearTimeout(min_timer);
            min_timer = null;
        }
        document.getElementById(div_parent).removeChild(document.getElementById("scruffydiv"));
        return false;
    }
    document.getElementById('lootshow').onclick=function(e) {
        var row = document.getElementById('lootrow');
        if (row.style.display == '') {
            row.style.display = 'none';
            document.getElementById('lootshow').innerHTML = 'Show';
        }
        else {
            row.style.display = '';
            document.getElementById('lootshow').innerHTML = 'Hide';
        }
        return false;
    }
    document.getElementById('logshow').onclick=function(e) {
        var row = document.getElementById('log');
        if (row.style.display == '') {
            row.style.display = 'none';
            document.getElementById('logshow').innerHTML = 'Hiding Log';
        }
        else {
            row.style.display = '';
            document.getElementById('logshow').innerHTML = 'Showing Log';
        }
        return false;
    }
    document.getElementById('remaining').onclick=dirtypop;
    document.getElementById('all').onclick=allpop;
    document.getElementById('spread').onclick=spreadpop;

    document.getElementById('play').style.display = 'none';
    document.getElementById('pause').style.display = 'inline';
    document.getElementById('close').style.display = 'inline';
    document.getElementById('lootrow').style.display = 'none';
    return false;
}
//end start function
document.getElementById("start").onclick=start;

function getserver(id) {
    var test_l = parseInt(id.substr(id.length-2,1));
    var test_r = parseInt(id.substr(id.length-1,1));
    if (test_r == 0) {
        test_r = 10;
    }
    return (test_r * 2 - (test_l%2==0?1:0));
}

function pausecheck(s) {
    if (onevent == 'Pause') {
        run = 0;
        pauseevent=s;
    }
}

function get_xmlHTTP () {
    if (window.XMLHttpRequest)
        return new XMLHttpRequest();
    if (window.ActiveXObject)
        return new ActiveXObject('Microsoft.XMLHTTP');
    return null;
}

function reload_home() {
    log('Going home...');
    if (/tmp=([0-9a-f]+)/.test(document.body.innerHTML)) {
        tmpkey = /tmp=([0-9a-f]+)/.exec(document.body.innerHTML)[1];
    }
    if (/cb=([0-9a-f]+)/.test(document.body.innerHTML)) {
        cbkey = /cb=([0-9a-f]+)/.exec(document.body.innerHTML)[1];
    }
    do_ajax('inner_page','remote/html_server.php?xw_controller=index&xw_action=view&xw_city='+fight_city+'&tmp='+tmpkey+'&cb='+cbkey+'&xw_person'+personid, 1, 0);
    tmpkey = cbkey = '';
}

function reload_fight() {
    log('Going to fight page...');
    var home = document.getElementById('menubar').innerHTML;
    var homes = /xw_city=(\d+).*?tmp=([a-zA-Z0-9]+).*?cb=([0-9]+)/.exec(home);
    //remote/html_server.php?xw_controller=fight&xw_action=view&xw_city=1&tmp=xxx&cb=xxx
    do_ajax('inner_page','remote/html_server.php?xw_controller=index&xw_action=view&xw_city='+homes[1]+'&tmp='+homes[2]+'&cb='+homes[3], 1, 0);
}

function getplayerstats(){
    reload_home();
    if (document.getElementById('mw_city_wrapper')) {
        var Elcity = document.getElementById('mw_city_wrapper');
        if (!Elcity)
            return false;
        cashNYC = document.getElementById('user_cash_nyc');
        cashCuba = document.getElementById('user_cash_cuba');
        cashMoscow = document.getElementById('user_cash_moscow');
        cashBangkok = document.getElementById('user_cash_bangkok');
        usr_health = document.getElementById('user_health');
        max_health = document.getElementById('user_max_health');
        cur_en = document.getElementById('user_energy');
        maxEnergy = document.getElementById('user_max_energy');
        stamina = document.getElementById('user_stamina');
        maxStamina = document.getElementById('user_max_stamina');
        influence = document.getElementById('user_influence');
        maxInfluence = document.getElementById('user_max_influence');
        usrlevel = document.getElementById('user_level');
        expnow = document.getElementById('user_experience');
        expnext = document.getElementById('exp_for_next_level');

        // Update basic player information.
        switch(Elcity.className){
            case 'mw_city1':
                city = 'New York';
                xw_city=1;
                uc = parseCash(cashNYC.innerHTML);
                break;
            case 'mw_city2':
                city = 'Cuba';
                xw_city=2;
                uc = parseCash(cashCuba.innerHTML);
                break;
            case 'mw_city3':
                city = 'Moscow';
                xw_city=3;
                uc = parseCash(cashMoscow.innerHTML);
                break;
            case 'mw_city4':
                city = 'Bangkok';
                xwcity=4
                uc = parseCash(cashBangkok.innerHTML);
                break;
        }

        cur_health = parseInt(usr_health.innerHTML);
        if (cur_health >= hplow) {
            usr_health.className="good";
        } else {
            usr_health.className="bad";
        }
        maxHealth = parseInt(max_health.innerHTML);
        energy = parseInt(cur_en.firstChild.nodeValue);
        maxEnergy = parseInt(maxEnergy.innerHTML);
        cur_stam = parseInt(stamina.innerHTML);
        maxStamina = parseInt(maxStamina.innerHTML);
        document.getElementById('attack').innerHTML=stamina.innerHTML;
        if (maxInfluence) {
            infl = parseInt(influence.firstChild.nodeValue);
            maxInfl = parseInt(maxInfluence.innerHTML);
        }

        // Remove this when influence stat is released to public
        if (isNaN(infl))
            influence = 0;
        if (isNaN(maxInfl))
            maxInfluence = 0;
        level = parseInt(usrlevel.innerHTML);
        expnow = parseInt(expnow.innerHTML);
        expnext = parseInt(expnext.innerHTML);
        expneed = expnext - expnow;
        ratiolvl=eval(expneed/energy);
        ratiolvl2=eval(expneed/cur_stam);
        (Math.abs(ratiolvl)<10)?(d=2):(d=0);
        (Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
        if (ratiolvl=='Infinity') {
            ratiolvl=0; d=0;
        }
        if (ratiolvl2=='Infinity') {
            ratiolvl2=0; d2=0;
        }
        document.getElementById('user_stats').getElementsByClassName('stat_title')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br> (<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">) &nbsp; (<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">)';
    }
    return false;
}

function update_name() {
    if (fbname && fbname.length > 0) {
        targetfbnamelist[cur_os] = fbname;
    } else {
        fbname = '';
    }
    document.getElementById('fbname').innerHTML='<span class="good">'+fbname+'</span><a target="_blank" href="http://www.facebook.com/profile.php?id='+targets[0]+'&ref=profile">(FB)</a> - <span class="good">'+targetname+'</span><a target="_blank" href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa(targets[0])+'%22%7D">(MW)</a>';
}

function msg(s) {
    document.getElementById('status').innerHTML=s;
}

var loglines = 0;
function log(s) {
    ratio = exp_gained/attacks;
    document.getElementById('attacks').innerHTML=attacks;
    document.getElementById('attack').innerHTML=cur_stam;
    if (lost > 0) {
        document.getElementById('lost').innerHTML='<span class="more_in">Lost: '+lost+' &nbsp; ('+(lost/attacks*100).toFixed(1)+'%)</span>';
    }
    document.getElementById('exp_gained').innerHTML=exp_gained+' &nbsp; <span class="more_in">('+(ratio).toFixed(2)+' xp/sta)</span> &nbsp; Req: '+expneed+' &nbsp; <span class="more_in">('+(exp_ratio_reqd).toFixed(2)+' xp/sta)</span>';
    document.getElementById('damage').innerHTML = commas(ddealt)+' dealt / '+commas(dtaken)+' taken';
    if ((ranks['Yakuza'] != 0) || (ranks['Triad'] != 0)) {
        document.getElementById('damagetitle').innerHTML='Rank:';
        document.getElementById('damage').innerHTML = 'Yakuza: '+ranks['YakuzaRank']+' ('+(ranks['Yakuza'] > 0 ? '<span class="good">+' : '<span class="bad">')+ranks['Yakuza']+'</span>) &nbsp; Triad: '+ranks['TriadRank']+' ('+(ranks['Triad'] > 0 ? '<span class="good">+' : '<span class="bad">')+ranks['Triad']+'</span>)';
    }
    money_gained='';
    if (ny_gained < 0) {
        money_gained += '<span class="bad">-$'+commas(Math.abs(ny_gained))+'</span>  ';
    }
    if (ny_gained >= 0) {
        money_gained += '<span class="good">$'+commas(ny_gained)+'</span>  ';
    }
    if (cuba_gained < 0) {
        money_gained += ' &nbsp; <span class="bad">-C$'+commas(Math.abs(cuba_gained))+'</span>  ';
    }
    if (cuba_gained >= 0) {
        money_gained += ' &nbsp; <span class="good">C$'+commas(cuba_gained)+'</span>  ';
    }
    if (moscow_gained < 0) {
        money_gained += ' &nbsp; <span class="bad">-R$'+commas(Math.abs(moscow_gained))+'</span>  ';
    }
    if (moscow_gained >= 0) {
        money_gained += ' &nbsp; <span class="good">R$'+commas(moscow_gained)+'</span>  ';
    }
    if (bangkok_gained < 0) {
        money_gained += ' &nbsp; <span class="bad">-B$'+commas(Math.abs(bangkok_gained))+'</span>  ';
    }
    if (bangkok_gained >= 0) {
        money_gained += ' &nbsp; <span class="good">B$'+commas(bangkok_gained)+'</span>  ';
    }
    if (vegas_gained < 0) {
        money_gained += ' &nbsp; <span class="bad">-V$'+commas(Math.abs(vegas_gained))+'</span>  ';
    }
    if (vegas_gained >= 0) {
        money_gained += ' &nbsp; <span class="good">V$'+commas(vegas_gained)+'</span>  ';
    }
    if (italy_gained < 0) {
        money_gained += ' &nbsp; <span class="bad">-L$'+commas(Math.abs(italy_gained))+'</span>  ';
    }
    if (italy_gained >= 0) {
        money_gained += ' &nbsp; <span class="good">L$'+commas(italy_gained)+'</span>  ';
    }
    money_gained += ' &nbsp; <span class="good">VCoins '+commas(vic_pts-initial_vic_pts)+'</span>  ';
    document.getElementById('money_gained').innerHTML = money_gained;
    var done = targetlist.length-targets.length+1;
    if (done > targetlist.length) {
        document.getElementById('cur_hit').innerHTML='List completed';
    } else {
        os = targetlist.length - targets.length;
        if (typeof(targetattackslist[os])=="undefined") {
            targetattackslist[os]=0;
        }
        document.getElementById('cur_hit').innerHTML='Target '+done+' of '+targetlist.length+' ('+targetattackslist[os]+' hits)';
    }
    if (debug==true || s.substr(0,23)=='<span class="more_in">[') {
        loglines++;
        if (myid==userid && loglines > 100) {
            loglines = 0;
            document.getElementById('log').innerHTML = '';
        }
        var l=document.getElementById('log').innerHTML;
        document.getElementById('log').innerHTML = s + '<br>' + l;
    }
    document.getElementById('loot').innerHTML='' + lootcount + '/' + attacks + ' &nbsp; (' + (lootcount/attacks*100).toFixed(1) + '%) <br/>' + combinedloot;
}

function logadd(s) {
    var l=document.getElementById('log').innerHTML;
    document.getElementById('log').innerHTML = l.substr(0,l.indexOf('<br>'))+'&nbsp;&nbsp;'+s+l.substr(l.indexOf('<br>'));
}


function clear_log() {
    document.getElementById('log').innerHTML = '';
    loglines = 0;
}

function current_city(){
    for (i = 1; i < 20; i++) {
        if ($('#mw_city_wrapper').hasClass('mw_city'+i)){
            return i;
        }
    }
    return 0;
}

var Loots=new Array();
function add_loot(s){
    var f=-1;
    var i;
    for(i=0; i<Loots.length && f==-1; ++i) {
        if (Loots[i][0]==s) {
            f=i;
        }
    }
    if (f!=-1) {
        Loots[f][1]++;
    }
    else {
        Loots[Loots.length]=new Array(s,1);
    }
    var t='';
    Loots.sort();
    for(i=0; i<Loots.length; ++i) {
        t+='<span class="good">'+Loots[i][1]+'x</span> '+Loots[i][0]+'<br />';
    }
    combinedloot=t;
    lootcount++;
}

function realpause(millis) {
    log('realpause = '+millis);
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    } while(curDate-date < millis);
}

function commas(s) {
    while ((d=/(\d+)(\d{3}.*)/.exec(s))) {
        s = d[1] + ',' + d[2];
    }
    return s;
}

function p(s) {
    return parseInt(s.replace(/[^\d]/g,''));
}

function retry(s) {
    if (retries > 9) {
        msg(s + ', not retrying any more.');
    }
    else {
        setTimeout(function(){
            retries++;
            msg(s+'; retry #'+retries+'...');
            attack_again();
        },3000);
    }
}
function myRandom(min,max) {
    return min + Math.floor(Math.round((Math.random() * (max - min))));
}
// deliberate pause from Vern's toolkit.js, http://vern.com/mwtools/
// given a number of seconds, an optional message and a resume
// function, will pause a few seconds and then execute the function
function pausing(seconds,message,resume_func) {
    // if the message was left out, shuffle things a bit
    if (typeof(message) == 'function') {
        resume_func = message;
        message = null;
    }
    if (message)
        message=message;
    else
        message='Pausing';
    msg(message+' <span id="seconds">'+seconds+' second'+(seconds==1?'':'s')+'</span>...');
    //var me = this;
    var timer = setInterval(function(){//)
        seconds--;
        if (document.getElementById('seconds'))
            document.getElementById('seconds').innerHTML=seconds+' second'+(seconds==1?'':'s');
        else
            clearInterval(timer);
        if (seconds<=0) {
            clearInterval(timer);
            if (typeof(resume_func) == 'function')
                resume_func();
        }
    },1000);
}

function timestamp() {
    now = new Date();
    var CurH = now.getHours();
    CurH = (CurH<10?'0'+CurH:CurH);
    var CurM = now.getMinutes();
    CurM = (CurM<10?'0'+CurM:CurM);
    if (timestamping) {
        return '<span class="more_in">['+CurH+':'+CurM+']</span> ';
    }
    else {
        return '';
    }
}

function timestamp1() {
    now = new Date();
    var CurD = now.getFullYear();
    var temp = now.getMonth()+1;
    temp = (temp<10?'0'+temp:temp);
    CurD += '-' + temp;
    temp = now.getDate();
    temp = (temp<10?'0'+temp:temp);
    CurD += '-' + temp;
    var CurH = now.getHours();
    CurH = (CurH<10?'0'+CurH:CurH);
    var CurM = now.getMinutes();
    CurM = (CurM<10?'0'+CurM:CurM);
    return '['+CurD+' '+CurH+':'+CurM+'] ';
}

function timestamp2() {
    now = new Date();
    var CurD = now.getUTCFullYear();
    var temp = now.getUTCMonth()+1;
    temp = (temp<10?'0'+temp:temp);
    CurD += temp.toString();
    temp = now.getUTCDate();
    temp = (temp<10?'0'+temp:temp);
    CurD += temp.toString();
    var CurH = now.getUTCHours();
    CurH = (CurH<10?'0'+CurH:CurH);
    var CurM = now.getUTCMinutes();
    CurM = (CurM<10?'0'+CurM:CurM);
    return '['+CurD+' '+CurH+':'+CurM+'] ';
}

function in_charcode_range(str) {
    for (var i=0; i<str.length; i++) {
        if (str.charCodeAt(i)==226) {
            return true;
        }
    }
    return false;
}

function target_profile_url(id) {
    if (id.substr(0,2)=="p|") {
        return 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user='+escape(btoa(targets[0]));
    }
    else {
        return 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user='+id
    }
}

function ice_check_url(id) {
//    return 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hitlist&xw_action=set&xw_city=1&tmp='+tmpkey+'&cb='+cbkey+'&target_pid='+targetzidlist[os].substr(2)+'&xw_client_id=8&ajax=1&liteload=1&sf_xw_user_id='+userid+'&sf_xw_sig='+local_xw_sig;
    return 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hitlist&xw_action=set&xw_city='+fight_city+'&target_pid='+targetzidlist[os].substr(2);
}

function hl(){
    var params = { 'ajax': 1,
                    'liteload': 1,
                    'sf_xw_user_id': userid,
                    'sf_xw_sig': local_xw_sig
                };
    var home = document.getElementById('menubar').innerHTML;
    var homes = /nav_link_home.*?xw_city=(\d+).*?tmp=([a-zA-Z0-9]+)/.exec(home);
    do_ajax('inner_page','remote/html_server.php?xw_controller=hitlist&xw_action=set&xw_city=1&tmp='+tmpkey+'&cb='+cbkey+'&target_pid='+targetzidlist[os].substr(2), 1, 0);
    req = $.ajax({
        type: "POST",
        data: params,
        timeout: 30000,
        url: link,
        success: function (msg_rtn){
            if (/There is already/.test(document.getElementById("inner_page").innerHTML)) {
                log(timestamp()+'<a target="_blank" href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa(targets[0])+'%22%7D">'+targetname+'</a> ['+targets[0]+'] <span class="good"> already has a bounty on their head...</span>');
            } else {
                aa=document.getElementsByName('addhit');
                for (i=0; i<aa.length; i++) {
                    if (aa[i].type == "submit") {
                        aa[i].click();
                        log(timestamp()+'<a target="_blank" href="http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa(targets[0])+'%22%7D">'+targetname+'</a> ['+targets[0]+'] <span class="good">has been hit listed!</span>');
                        hls++;
                        i = aa.length;
                    }
                }
            }
            targets=targets.slice(1);
            action='';
            alive=true;
            tmpkey='';
            setTimeout(attack_again,250);
        }
    });
}

var attack_link = '';
var pwr_attack_link = '';
var ice_check_link = '';

function remove_from_mafia(link) {
    //http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=remove_and_fight&xw_city=5&tmp=1e2c7bbc85c7239b72059b8d35e58f7c&cb=81838af0a22011dfa7ea0f67c4b6cf20&opponent_id=p%7C59165225
    var params = { 'ajax': 1,
            'liteload': 1,
            'sf_xw_user_id': userid,
            'sf_xw_sig': local_xw_sig
        };
    msg('Removing '+targetname+' from your Mafia to attack...');
    log(timestamp()+'Removing '+targetname+' from your Mafia to attack...');
    req = $.ajax({
        type: "POST",
        data: params,
        url: link,
        success: function (msg_rtn){
            process_fight_results(msg_rtn);
        }
    });
    return;
}

var stamina_timer = null;
var retries1 = 0;
var retries2 = 0;
var retries3 = 0;
var errors = 0;
function attack_again() {
    log('in main: action='+action+' tmpkey='+tmpkey+' cbkey='+cbkey);
    if (typeof stamina_timer != 'undefined' && stamina_timer !== null) {
        clearTimeout(stamina_timer);
        stamina_timer = null;
    }
    os = targetlist.length - targets.length;
    stamina = document.getElementById('user_stamina');
    cur_stam = parseInt(stamina.innerHTML);
    var params = { 'ajax': 1,
            'liteload': 1,
            'sf_xw_user_id': userid,
            'sf_xw_sig': local_xw_sig
        };

    if (run == 0) {
        document.getElementById('play').style.display = 'inline';
        document.getElementById('pause').style.display = 'none';
        if (fightlist && acttype=="0" && cur_stam==0) {
            function f(){
                targets = [];
                reload_home();
                document.getElementById('play').style.display = 'none';
                document.getElementById('pause').style.display = 'inline';
                run = 1;
                attack_again();
            }
            pausing(300,'Out of stamina...retrying in ',f);
        } else {
            msg('Paused...');
        }
        return;
    }
    if (skip==true) {
        skip = false;
        log(timestamp()+'<a href="#">Skipping target...</a>');
        targets=targets.slice(1);
        tmpkey='';
        action='';
        attack_again();
        return;
    }
    if (reset==true) {
        reset = false;
        log(timestamp()+'<a href="#">Resetting list to beginning...</a>');
        targets=targetlist;
        for (i=0; i<targetsuicidelist.length; i++) {
            targetsuicidelist[i] = 0;
        }
        tmpkey='';
        action='';
        attack_again();
        return;
    }
    else if ((acttype=="0" || acttype=="3") && cur_stam == 0 && gfpstam=="checked" && cur_gfp - 9 > gfpstop) {
        msg('Buying stamina refill with GFP...');
        req = $.ajax({
            type: "POST",
            data: params,
            url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city="+xw_city+"&tmp="+tmpkey+"&cb="+cbkey+"&user="+escape(btoa(targets[0]))+"&favor_type=1&favor_id=2&page=stats&xw_client_id=8&ajax=1&liteload=1&sf_xw_user_id="+userid+"&sf_xw_sig="+local_xw_sig,
            success: function (msg_rtn){
                reload_home();
                tmpkey = '';
                action = '';
                attack_again();
                return;
            }
        });
        return;
    }
    else if ((acttype=="0" || acttype=="3") && cur_stam == 0) {
        if (fightlist) {
            msg('Done attacking off the fight list.');
        } else {
            msg('Done attacking. Target was <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a>.');
        }
        run = 0;
        attack_again();
        return;
    }
    else if (run == 1) {
        if (acttype=="4") {
            reload_home();
            function hny() {
                if (document.getElementById('user_health').innerHTML<heal_threshold){
                    healing();
                    return;
                } else {
                    attack_again();
                }
            }
            setTimeout(hny,5000);
            return;
        }
        if (fightlist) {
            while (fightlist_levels[os] > levelmax || fightlist_mafia[os] > mafiamax || targetdeadlist[os]) {
                if (targetdeadlist[os]) {
                    log(timestamp()+'<a href="#">'+targetnamelist[os]+'</a> ['+targets[0]+'] <span class="bad"> is dead or too weak.</span>');
                }
                else {
                    log(timestamp()+'<a href="#">'+targetnamelist[os]+'</a> ['+targets[0]+'] <span class="bad">skipping</span> (mafia: '+fightlist_mafia[os]+'&nbsp;&nbsp;level: '+fightlist_levels[os]+')');
                }
                targets=targets.slice(1);
                os = targetlist.length - targets.length;
            }
        }
        if (targets.length == 0 && redo == "") {
            if (fightlist) {
                if (moreice=="checked") {
                    msg('Loading fresh ice...');
                    document.getElementById('log').innerHTML = '';
                    log(timestamp()+'Loading new fight list...');
                    tmpkey='';
                    action='';
                    links='';
                    loadfightpage();
                    return;
                }
                msg('Done attacking off the fight list.');
            } else {
                if (acttype=="0") {
                    msg('Done attacking. Target was <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a>.');
                }
                else if (acttype=="1") {
                    msg('Done feeding links.');
                }
                else if (acttype=="2") {
                    msg('Done profiling.');
                }
                else if (acttype=="3") {
                    msg('Done hit listing.');
                }
            }
            document.getElementById('play').style.display = 'inline';
            document.getElementById('pause').style.display = 'none';
            return;
        }
        else if (targets.length == 0 && redo == "checked") {
            if (sorttype=="1") {
                log(timestamp()+'Sorting previously dead targets to bottom...');
                targets = targetlist;
                targetlist = [];
                var cnt = 0;
                var tmp = targetattackslist;
                for (i=0; i<targets.length; i++) {
                    if (targetattackslist[i]>0) {
                        targetattackslist[cnt] = tmp[i];
                        targetlist[cnt++]=targets[i];
                    }
                }
                for (i=0; i<targets.length; i++) {
                    if (targetattackslist[i]==0) {
                        targetattackslist[cnt] = tmp[i];
                        targetlist[cnt++]=targets[i];
                    }
                }
                for (i=0; i<targets.length; i++) {
                    targetsuicidelist[i] = 0;
                    targetzidlist[cnt] = '';
                    targeticlist[cnt] = '';
                    targetnamelist[cnt] = '';
                    targetfbnamelist[cnt] = '';
                    targetdefenselist[cnt] = '';
                    targetlevellist[cnt] = '';
                    targetsuicidelist[cnt] = 0;
                    targetstrengthlist[cnt] = '';
                    targetstrength1list[cnt] = '';
                    targetstrength2list[cnt] = '';
                    targetstatuslist[cnt++] = '';
                }
                tmp = [];
            } else {
                if (goforice=="checked") {
                    log(timestamp()+'Clearing suicide hits...');
                }
                for (i=0; i<targetsuicidelist.length; i++) {
                    targetsuicidelist[i] = 0;
                }
            }
            document.getElementById('log').innerHTML = '';
            loglines = 0;
            log(timestamp()+'Starting list again...');
            targets = targetlist;
            action="";
            tmpkey = "";
            attack_again();
            return;
        } else {
            if (!fightlist && tmpkey == "") {
                pwr = false;
                if (action == '' || action == 'profile') {
                    retries3 = 0;
                    log('profile processing '+targets[0]);
                    if (monhealth == "checked" && document.getElementById('user_health').innerHTML<hplow){
                        log('need to heal');
                        healing();
                        return;
                    }
                    targetname='(no name yet)';
                    if (targetnamelist[os].length > 0) {
                        targetname=targetnamelist[os];
                    }
                    fbname = '';
                    if (targetfbnamelist[os].length > 0) {
                        fbname=targetfbnamelist[os];
                    }
                    action = 'profile';
                    link = target_profile_url(targets[0]);
                    msg('Loading target profile... (<a href="'+link+'&skip_req_frame=1">url</a>)');
                    req = $.ajax({
                        type: "POST",
                        data: params,
                        timeout: 30000,
                        url: link,
                        success: function (msg_rtn){
                            if (/403 Forbidden/.test(msg_rtn) || /500 Internal Server Error/.test(msg_rtn) || /response never closed/.test(msg_rtn) || /var ImagePreviewer/.test(msg_rtn) || /top\.location\.href/.test(msg_rtn)) {
                                log(timestamp()+'Zynga server error - ZYNGA! - retrying...');
                                retries1++;
                                if (retries1>5) {
                                    log(timestamp()+'Max retries reached...skipping...');
                                    retries1 = 0;
                                    targets=targets.slice(1);
                                    tmpkey='';
                                    action='';
                                    setTimeout(attack_again,1000);
                                    return;
                                }
                                attack_again();
                                return;
                            }
                            else if (/was not found/.test(msg_rtn)){
                                log(timestamp()+targets[0] + ' is not a valid mafia member, skipping..');
                                targets=targets.slice(1);
                                tmpkey="";
                                action="";
                                setTimeout(attack_again,1000);
                                return;
                            }
                            if (targets[0].substr(0,2)=="p|") {
                                // need fbid
                                targetserverlist[os] = '';
                                targetzidlist[os] = targets[0];
                                if ((m=/user%2522.*?%2522([0-9A-Za-z%]+)%2522/.exec(msg_rtn)) ||
                                        (m=/user%22.*?%22([0-9A-Za-z%]+)%22/.exec(msg_rtn))) {
                                    targets[0] = targetlist[os] = atob(m[1].replace(/%253D/g,'=').replace(/%3D/g,'='));
                                    getFBName(targetlist[os]);
                                    targetserverlist[os] = getserver(targets[0]);
                                }
                            }
                            else {
                                // need zid
                                getFBName(targets[0]);
                                if ((st=/tryBuy.*?opponent_id=p%7C([0-9]+)/.exec(msg_rtn))) {
                                    targetzidlist[os]='p|'+st[1];
                                }
                                else if ((st=/opponent_id=([0-9a-zA-Z%\|]+)/.exec(msg_rtn))) {
                                    var tmp = st[1];
                                    tmp=tmp.replace("%22%7D","");
                                    tmp=tmp.replace(/%3D/g,"=");
                                    targetzidlist[os]=atob(tmp);
                                }
                                else if ((st=/xw_action=title.*?xw_person=([0-9]+)/.exec(msg_rtn))) {
                                    targetzidlist[os]='p|'+st[1];
                                }
                            }
                            if (targetnamelist[os]=="") {
                                if ((thename = /"title">\r[^"]*?"([^"]+)?"/.exec(msg_rtn))) {
                                    targetname=escape(thename[1]);
                                    targetnamelist[os]=thename[1];
                                }
                            }
                            try {
                                name1 = /\x09+(.*?) level ([0-9]+)/.exec(msg_rtn.substr(msg_rtn.indexOf('<div class="title">')))[1];
                                if (name1.indexOf("&#34;") > -1) {
                                    name1 = name1.substr(name1.indexOf("&#34;")+5);
                                    name1 = name1.substr(0, name1.length-5);
                                } else {
                                    name1 = name1.substr(name1.indexOf("\"")+1);
                                    name1 = name1.substr(0, name1.length-1);
                                }
                                if (name1.length > 0) {
                                    targetnamelist[os] = name1;
                                    targetname = targetnamelist[os];
                                }
                            }
                            catch (fberr) {}
                            update_name();
                            if ((m=/ level ([0-9]+)/.exec(msg_rtn.substr(msg_rtn.indexOf('<div class="title">'))))) {
                                targetlevellist[os]=m[1];
                            }
                            try {
                                document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                cur_stam = parseInt(/user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                cur_health = parseInt(/user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                cur_gfp = parseInt(/user_fields\['user_favor'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                document.getElementById('exp_to_next_level').innerHTML = /user_fields\['exp_to_next_level'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                expneed = parseInt(document.getElementById('exp_to_next_level').innerHTML);
                            }
                            catch (fberr) { }
//                            catch (fberr) { log(timestamp()+'PROFILE - ZYNGA RETURNED THIS:<br><plaintext>'+msg_rtn+'</plaintext><br><<<<END>>>>>'); }

                            if (/performing actions/.test(msg_rtn)) {
                                log(timestamp()+'Performing actions too fast...bumping delay settings...');
                                wait1++;
                                wait2++;
                                document.getElementById("dealy1").value = wait1;
                                document.getElementById("dealy2").value = wait2;
                                setTimeout(attack_again,2000);
                                return;
                            }
                            if (/Share your profile/.test(msg_rtn) && targetzidlist[os] != userid) {
                                msg('Ended up on your profile page...skipping...');
                                log(timestamp()+'Ended up on your profile page...skipping...');
                                log(timestamp()+'userid = '+userid+' targetzidlist = '+targetzidlist[os]);
                                targets=targets.slice(1);
                                action='';
                                alive=false;
                                attack_again();
                                return;
                            }
                            else if (/Most consecutive days doing jobs/.test(msg_rtn)) {
                                msg('Parsing profile page...');
                                attack_link = '';
                                // attack =       tryBuy('remote/html_server.php?xw_controller=fight&xw_action=attack&xw_city=1&tmp=0fbbbd14f0a7d492e5a50e19bf9acbb0&cb=4e709ad0ed2b11dfae8d09d681f8c395&xw_person=56062571&opponent_id=p%7C32772345',this);
                                if ((m=/tryBuy\('([^']+)'/.exec(msg_rtn))) {
                                    attack_link = 'http://facebook.mafiawars.zynga.com/mwfb/' + m[1].replace(/&amp;/g,"&");
                                    log('got attack link');
                                }
                                pwr_attack_link = '';
                                // power_attack = tryBuy('remote/html_server.php?xw_controller=fight&amp;xw_action=power_attack&amp;xw_city=1&amp;tmp=2984beddd13288109fb94ebc2c4dd9ef&amp;cb=4e70a570ed2b11dfa7639d6250dab52b&amp;xw_person=56062571&amp;opponent_id=p%7C32772345',this);" href="javascript://">Power Attack</a>
                                if ((m=/Attack.*?tryBuy\('([^']+)'/.exec(msg_rtn))) {
                                    pwr_attack_link = 'http://facebook.mafiawars.zynga.com/mwfb/' + m[1].replace(/&amp;/g,"&");
                                    log('got power attack link');
                                }
                                if (attack_link.length == 0 && pwr_attack_link.length == 0 && userid !== targetzidlist[os]) {
                                    retries1++;
                                    if (retries1 < 5) {
                                        log(timestamp()+'Failed to retrieve attack links - retrying...');
                                    }
                                    else {
                                        log(timestamp()+'Failed to retrieve attack links - skipping...');
                                        retries1 = 0;
                                        targets=targets.slice(1);
                                        tmpkey='';
                                        action='';
                                    }
                                    attack_again();
                                    return;
                                }
                                ice_check_link = '';
                                // hitlist = remote/html_server.php?xw_controller=hitlist&amp;xw_action=set&amp;xw_city=1&amp;tmp=XXX&amp;cb=XXX&amp;xw_person=56062571&amp;target_pid=32772345&amp;mwzy_token=0f5e2c17fd3b2ab30e353c9ea987c82031536ba130ef11001daf592dbe85d0f8', 1, 1, 0, 0); return false; " href="http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hitlist&amp;xw_action=set&amp;xw_city=1&amp;tmp=03ec47df3da816a5d840a46a832d54d7&amp;cb=4e70c740ed2b11df9b68db812dc28e9b&amp;xw_person=56062571&amp;target_pid=32772345&amp;mwzy_token=0f5e2c17fd3b2ab30e353c9ea987c82031536ba130ef11001daf592dbe85d0f8">
                                if (/Sucker Punch.+?<a href="(.+?)".+?>Add to Hitlist/.test(msg_rtn)) {
                                    ice_check_link = /Sucker Punch.+?<a href="(.+?)".+?>Add to Hitlist/.exec(msg_rtn)[1];
                                }
                                if ((d=/Fights Won<\/td>[^>]*?>(\d+)/.exec(msg_rtn))) {
                                    targetswonlist[os]=d[1];
                                }
                                if ((d=/Fights Lost<\/td>[^>]*?>(\d+)/.exec(msg_rtn))) {
                                    targetslostlist[os]=d[1];
                                }
                                if ((d=/Mobsters Iced<\/td>[^>]*?>(\d+)/.exec(msg_rtn))) {
                                    targetsicedlist[os]=d[1];
                                }
                                if ((d=/Mobsters Whacked<\/td>[^>]*?>(\d+)/.exec(msg_rtn))) {
                                    targetswhackedlist[os]=d[1];
                                }
                                if (/Remove from Mafia/.test(msg_rtn)) {
                                    targetmafialist[os]=true;
                                    if (acttype !== "2") {
                                        logadd('</span>&nbsp;<span class="good">(in your Mafia)</span>');
                                    }
                                }
                                rob_link = '';
                                // hitlist = remote/html_server.php?xw_controller=hitlist&amp;xw_action=set&amp;xw_city=1&amp;tmp=XXX&amp;cb=XXX&amp;xw_person=56062571&amp;target_pid=32772345&amp;mwzy_token=0f5e2c17fd3b2ab30e353c9ea987c82031536ba130ef11001daf592dbe85d0f8', 1, 1, 0, 0); return false; " href="http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hitlist&amp;xw_action=set&amp;xw_city=1&amp;tmp=03ec47df3da816a5d840a46a832d54d7&amp;cb=4e70c740ed2b11df9b68db812dc28e9b&amp;xw_person=56062571&amp;target_pid=32772345&amp;mwzy_token=0f5e2c17fd3b2ab30e353c9ea987c82031536ba130ef11001daf592dbe85d0f8">
                                if (/Power Attack.+?<a href="(.+?)".+?>Rob/.test(msg_rtn)) {
                                    rob_link = /Power Attack.+?<a href="(.+?)".+?>Rob/.exec(msg_rtn)[1];
                                    tryfixname = true;
                                    if (tryfixname) {
                                        req = $.ajax({
                                            type: "POST",
                                            url: rob_link,
                                            timeout: 30000,
                                            data: params,
                                            success: function (response){
                                                // <div class="title">Rob from &trade;?CARTEL'Z' PSR</div>
                                                if ((m=/<div class="title">Rob from ([^<]+)</.exec(response))) {
                                                    targetnamelist[os] = unescape(m[1]);
                                                    targetname = m[1];
//                                                    log(timestamp()+'name fixed');
                                                }
                                            }
                                        });
                                    }
                                }
                                update_name();
//*******************************************************
                                if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                                    url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+(alive?'1':'');
                                    logData(url);
                                }
                                if (acttype == "2" || userid == targetzidlist[os]) {
                                    targets=targets.slice(1);
                                    tmpkey='';
                                    action='';
                                    setTimeout(attack_again,1000);
                                    return;
                                }
                                else {
                                    if (cur_gfp < 2) {
                                        hplow = 50;
                                    }
                                    else {
                                        hplow = 500;
                                    }
                                    log(timestamp()+'<a href="#">'+targetname +'</a> ['+targets[0]+']');
                                    if (tmpkey.length == 0) {
                                        if (/tmp=([0-9a-f]+)/.test(document.body.innerHTML)) {
                                            tmpkey = /tmp=([0-9a-f]+)/.exec(document.body.innerHTML)[1];
                                        }
                                        if (/cb=([0-9a-f]+)/.test(document.body.innerHTML)) {
                                            cbkey = /cb=([0-9a-f]+)/.exec(document.body.innerHTML)[1];
                                        }
                                    }
                                    action='fight';
                                    attack_again();
                                    return;
                                }
                            }
                            else if (msg_rtn.replace(/\s*/g,'').length==0) {
                                log(timestamp()+'Zynga returned blank page - ZYNGA! - idiots...');
                                attack_again();
                                return;
                            }
                            else {
                                log(timestamp()+'ZYNGA RETURNED THIS:<br><plaintext>'+msg_rtn+'</plaintext><br><<<<END>>>>>');
                            }
                        }
                    });
                }
                else if (action=='icecheck') {
                    log('ice check processing '+targets[0]);
                    retries1 = 0;
                    if (monhealth == "checked" && document.getElementById('user_health').innerHTML<hplow){
                        healing();
                        return;
                    }
                    link = ice_check_link;
                    msg('Ice Check... (<a href="'+link+'&skip_req_frame=1">url</a>)');
                    req = $.ajax({
                        type: "POST",
                        url: link,
                        timeout: 30000,
                        data: params,
                        success: function (msg_rtn){
                            if ((m = /message_body">([^<]+)</.exec(msg_rtn))) {
                                log(m[1]);
                            }
                            if (/tmp=([0-9a-f]+)/.test(msg_rtn)) {
                                tmpkey = /tmp=([0-9a-f]+)/.exec(msg_rtn)[1];
                            }
                            if (/cb=([0-9a-f]+)/.test(msg_rtn)) {
                                cbkey = /cb=([0-9a-f]+)/.exec(msg_rtn)[1];
                            }
                            try {
                                document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                cur_stam = parseInt(/user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                cur_health = parseInt(/user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                cur_gfp = parseInt(/user_fields\['user_favor'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                document.getElementById('exp_to_next_level').innerHTML = /user_fields\['exp_to_next_level'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                expneed = parseInt(document.getElementById('exp_to_next_level').innerHTML);
                                user_bank_balance = parseInt(/user_fields\['user_bank_balance'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                switch(parseInt(fight_city)){
                                    case 1:
                                        document.getElementById('user_cash_nyc').innerHTML = /user_fields\['user_cash_nyc'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_nyc').innerHTML.replace(/,/g,'').replace(/\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_nyc').innerHTML+'</span>');
                                            bank(cash_in_hand,'nyc');
                                        }
                                        break;
                                    case 2:
                                        document.getElementById('user_cash_cuba').innerHTML = /user_fields\['user_cash_cuba'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_cuba').innerHTML.replace(/,/g,'').replace(/C\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_cuba').innerHTML+'</span>');
                                            bank(cash_in_hand,'cuba');
                                        }
                                        break;
                                    case 3:
                                        document.getElementById('user_cash_moscow').innerHTML = /user_fields\['user_cash_moscow'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_moscow').innerHTML.replace(/,/g,'').replace(/R\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_moscow').innerHTML+'</span>');
                                            bank(cash_in_hand,'moscow');
                                        }
                                        break;
                                    case 4:
                                        document.getElementById('user_cash_bangkok').innerHTML = /user_fields\['user_cash_bangkok'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_bangkok').innerHTML.replace(/,/g,'').replace(/B\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_bangkok').innerHTML+'</span>');
                                            bank(cash_in_hand,'bangkok');
                                        }
                                        break;
                                    case 5:
                                        document.getElementById('user_cash_vegas').innerHTML = /user_fields\['user_cash_vegas'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_vegas').innerHTML.replace(/,/g,'').replace(/V\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_vegas').innerHTML+'</span>');
                                            bank(cash_in_hand,'vegas');
                                            reload_home();
                                        }
                                        break;
                                    case 6:
                                        // user_fields['user_cash_italy'] = "L$1,167,490";
                                        document.getElementById('user_cash_italy').innerHTML = /user_fields\['user_cash_italy'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_italy').innerHTML.replace(/,/g,'').replace(/L\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_italy').innerHTML+'</span>');
                                            bank(cash_in_hand,'italy');
                                            reload_home();
                                        }
                                        break;
                                }
                            }
                            catch (fberr) { }
//                            catch (fberr) { log(timestamp()+'ICE CHECK - ZYNGA RETURNED THIS:<br><plaintext>'+msg_rtn+'</plaintext><br><<<<END>>>>>'); }
                            var start = 0;
                            if (/403 Forbidden/.test(msg_rtn) || /500 Internal Server Error/.test(msg_rtn) || /response never closed/.test(msg_rtn) || /var ImagePreviewer/.test(msg_rtn) || /top\.location\.href/.test(msg_rtn)) {
                                log(timestamp()+'Zynga server error - ZYNGA! - retrying...');
                                retries1++;
                                if (retries1>5) {
                                    log(timestamp()+'Max retries reached...skipping...');
                                    retries1 = 0;
                                    targets=targets.slice(1);
                                    tmpkey='';
                                    action='';
                                    setTimeout(attack_again,1000);
                                    return;
                                }
                                attack_again();
                                return;
                            }
                            else if (/performing actions/.test(msg_rtn)) {
                                log(timestamp()+'Performing actions too fast...bumping delay settings...');
                                wait1++;
                                wait2++;
                                document.getElementById("dealy1").value = wait1;
                                document.getElementById("dealy2").value = wait2;
                                setTimeout(attack_again,2000);
                                return;
                            }
                            else if ((m=/You cannot set a bounty on this user/.test(msg_rtn)) && userid !== targetzidlist[os]) {
                                log(timestamp()+'['+targets[0]+'] <span class="bad"> Bad ID, skipping...</span>please check validity.');
                                targetalivelist[os] = 0;
                                if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                                    url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+(alive?'1':'');
                                    logData(url);
                                }
                                targets=targets.slice(1);
                                tmpkey='';
                                action='';
                                alive=false;
                                attack_again();
                                return;
                            }
                            else if ((m=/You cannot set a bounty on this user/.test(msg_rtn)) && userid == targetzidlist[os]) {
                                log(timestamp()+'['+targets[0]+'] This is your profile...');
                                tmpkey='';
                                action='profile';
                                alive=false;
                                attack_again();
                                return;
                            }
                            else if ((m=/You can't add (.*)? to the/.exec(msg_rtn)) || /The action was not able to be completed/.test(msg_rtn)) {
                                if (/There is already a bounty set for this user/.test(msg_rtn) || /The action was not able to be completed/.test(msg_rtn)) {
                                    m = [];
                                    m[0]='';
                                    m[1]='Target';
                                }
                                if (curid==targets[0] && fbname.length > 0) {
                                    targetfbnamelist[os]=fbname;
                                }
                                targetalivelist[os] = 0;
                                if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                                    url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+targetalivelist[os];
                                    logData(url);
                                }
                                if (makespread=="checked" || acttype == "2") {
                                    if (makespread=="checked") {
                                        log(timestamp()+'<a href="#">'+m[1]+'</a> ['+targets[0]+']<span class="bad"> is dead...</span><a href="#">attacking to get stats...</a>');
                                    } else {
                                        log(timestamp()+'<a href="#">'+m[1]+'</a> ['+targets[0]+'] <span class="bad"> is dead or too weak.</span>');
                                    }
                                    action='fight';
                                    alive=false;
                                    attack_again();
                                    return;
                                } else {
                                    log(timestamp()+'<a href="#">'+m[1]+'</a> ['+targets[0]+'] <span class="bad"> is dead or too weak.</span>');
                                    // link feeding
                                    eachlink = links.split("\n");
                                    links = '';
                                    if (eachlink.length > 1) {
                                        for (i=start; i < eachlink.length; i++) {
                                            if (eachlink[i].substr(0,4)=="http") {
                                                if (eachlink[i].indexOf(btoa(targetzidlist[os]))==-1) {
                                                    links += eachlink[i-1] + '\n'+eachlink[i] + '\n';
                                                }
                                            }
                                        }
                                    }
                                    if (acttype == "1") {
                                        linkpop();
                                    }
                                    if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                                        url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+targetalivelist[os];
                                        logData(url);
                                    }
                                    targets=targets.slice(1);
                                    tmpkey='';
                                    action='';
                                    alive=false;
                                    attack_again();
                                    return;
                                }
                            }
                            else if ((m=/>([^<]+)?<\/a.*?to the Hitlist:/.exec(msg_rtn)) || /Add %NAME to the Hitlist:/.test(msg_rtn) || /There is already a bounty set for this user/.test(msg_rtn)) {
                                targettimelist[os] = timestamp2();
                                targetalivelist[os] = 1;
                                if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                                    url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+(alive?'1':'');
                                    logData(url);
                                }
                                if (targetname.length==0 && fightlist==true) {
                                    log(timestamp()+'<a href="#">Name is not available to do clan check...skipping...<a href="#">');
                                    targets=targets.slice(1);
                                    //reload_home();
                                    action='';
                                    alive=false;
                                    tmpkey='';
                                    attack_again();
                                    return;
                                } else if (fightlist==true && clans == "checked" && (in_charcode_range(targetname) ||
                                    targetname.indexOf("??3?")>-1 ||
                                    targetname.indexOf("{")>-1 ||
                                    targetname.indexOf("<")>-1 ||
                                    targetname.indexOf("(")>-1 ||
                                    targetname.indexOf("[")>-1 ||
                                    targetname.indexOf("~")>-1 ||
                                    targetname.indexOf("\xA9")>-1 ||
                                    targetname.indexOf("\xAE")>-1 ||
                                    targetname.indexOf("=")>-1 ||
                                    targetname.indexOf(";")>-1 ||
                                    targetname.indexOf("\u06E9")>-1 ||  // ?
                                    targetname.indexOf("\u06DE")>-1 ||  // ?
                                    targetname.indexOf("\u2020")>-1 ||  // ?
                                    targetname.indexOf("\u2660")>-1 ||  // ?
                                    targetname.indexOf("\u2661")>-1 ||  // ?
                                    targetname.indexOf("\u2662")>-1 ||  // ?
                                    targetname.indexOf("\u2663")>-1 ||  // ?
                                    targetname.indexOf("\u2721")>-1 ||  // ?
                                    targetname.indexOf("\u2560")>-1 ||  // ?
                                    targetname.indexOf("\u256C")>-1 ||  // ?
                                    targetname.indexOf("\u2591")>-1 ||  // ?
                                    targetname.indexOf("\u2592")>-1 ||  // ?
                                    targetname.indexOf("\u2593")>-1 ||  // ?
                                    targetname.indexOf("\u25C4")>-1 ||  // ?
                                    targetname.indexOf("\u2620")>-1 ||  // ?
                                    targetname.indexOf("\u2646")>-1)) {  // ?
                                    log(timestamp()+'<a href="#">'+m[1]+'</a> ['+targets[0]+'] <a href="#">is part of a clan...skipping</a>');
//*******************************************************
                                    url = '?modify_record=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&defense='+targetdefenselist[os]+'&level='+targetlevellist[os]+'&green='+targetstrength1list[os]+'&red='+targetstrength2list[os]+'&alive='+(alive?'Y':'')+'&time='+timestamp2();
                                    logData(url);
                                    targets=targets.slice(1);
                                    reload_home();
                                    action='';
                                    alive=false;
                                    tmpkey='';
                                    attack_again();
                                    return;
                                } else {
                                    log(timestamp()+'<span class="good">'+targetname+'</span> ['+targets[0]+'] <span class="good">is alive!</span>');
                                    // link feeding
                                    eachlink = links.split("\n");
                                    links = '';
                                    start = 0;
                                    if (eachlink.length > 1) {
                                        for (i=start; i < eachlink.length; i++) {
                                            if (eachlink[i].substr(0,4)=="http") {
                                                if (eachlink[i].indexOf(btoa(targetzidlist[os]))==-1) {
                                                    links += eachlink[i-1] + '\n'+eachlink[i] + '\n';
                                                }
                                            }
                                        }
                                    }
                                    links += timestamp2() + targetname + ' is alive!\nhttp://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22'+btoa(targetzidlist[os])+'%22%7D' + '\n';
                                    if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                                        url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+targetalivelist[os];
                                        logData(url);
                                    }
                                    if (acttype == "1") {
                                        linkpop();
                                        targets=targets.slice(1);
                                        action='';
                                        alive=true;
                                        tmpkey='';
                                        attack_again();
                                        return;
                                    }
                                    else if (acttype == "3") {
                                        // hitlist
                                        if (document.getElementById('user_health').innerHTML<hplow) {
                                            healing();
                                            return;
                                        }
                                        hl();
                                        return;
                                    }
                                    else if (acttype == "0" && norepeat == "checked" && (targets[0] == last_fbid || targetzidlist[os] == last_zid)) {
                                        logadd(' was just iced, skipping...');
                                        targets=targets.slice(1);
                                        action='';
                                        alive=true;
                                        tmpkey='';
                                        attack_again();
                                        return;
                                    }
                                    else {
                                        tmpkey='xxx';
                                        action='fight';
                                        alive=true;
                                        attack_again();
                                        return;
                                    }
                                }
                            }
                            else if (/To put a user on the hitlist/.test(msg_rtn) || /Fighting gives you mastery levels./.test(msg_rtn)) {
                                targetalivelist[os] = 0;
                                if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                                    url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+targetalivelist[os];
                                    logData(url);
                                }
                                if (makespread=="checked" || acttype == "2") {
                                    if (makespread=="checked") {
                                        log(timestamp()+targetname+' ['+targets[0]+']<span class="bad"> is dead...</span><a href="#">attacking to get stats...</a>');
                                    } else {
                                        log(timestamp()+targetname+' ['+targets[0]+'] <span class="bad"> is dead or too weak.</span>');
                                    }
                                    tmpkey='XXX';
                                    action='fight';
                                    alive=false;
                                    attack_again();
                                    return;
                                } else {
                                    log(timestamp()+targetname+' ['+targets[0]+'] <span class="bad"> is dead or too weak.</span>');
//                                    log(timestamp()+'No MW name retrieved for target...');
                                    targets=targets.slice(1);
                                    tmpkey='';
                                    action='';
                                    alive=false;
                                    attack_again();
                                    return;
                                }
                            }
                            else if (msg_rtn.replace(/\s*/g,'').length==0) {
                                log(timestamp()+'Zynga returned blank page - ZYNGA! - idiots...');
                                attack_again();
                                return;
                            }
                            else if (/response never closed/.test(msg_rtn) || /var ImagePreviewer/.test(msg_rtn) || /top\.location\.href/.test(msg_rtn)) {
                                log(timestamp()+'Error 500, response never closed - ZYNGA! - retrying...');
                                retries2++;
                                if (retries2>5) {
                                    log(timestamp()+'Max retries reached...skipping...');
                                    retries2 = 0;
                                    targets=targets.slice(1);
                                    tmpkey='';
                                    action='';
                                    setTimeout(attack_again,1000);
                                    return;
                                }
                                attack_again();
                                return;
                            }
                            else {
                                log(timestamp()+'ZYNGA RETURNED THIS:<br><plaintext>'+msg_rtn+'</plaintext><br><<<<END>>>>>');
                            }
                        }
                    });
                }
            }
            else {
                log('attack processing '+targets[0]);
                if (document.getElementById('user_health').innerHTML<hplow){
                    healing();
                    return;
                }
                if (fightlist) {
                    targetname = fightlist_names[os];
                    targetlevellist[os] = fightlist_levels[os];
                    update_name();
                }
                function f() {
                    log('attack processing call '+targets[0]);
                    retries2 = 0;
                    action = 'fight';
                    if (tmpkey.length == 0) {
                        if (/tmp=([0-9a-f]+)/.test(document.body.innerHTML)) {
                            tmpkey = /tmp=([0-9a-f]+)/.exec(document.body.innerHTML)[1];
                        }
                        if (/cb=([0-9a-f]+)/.test(document.body.innerHTML)) {
                            cbkey = /cb=([0-9a-f]+)/.exec(document.body.innerHTML)[1];
                        }
                    }
                    if (tmpkey.length == 0) {
                        action = '';
                        attack_again();
                        return;
                    }
                    if (fightlist && targetattackslist[os]==0) {
                        log(timestamp()+'<span class="good">'+targetname+'</span> ['+targets[0]+'] <span class="good">is alive!</span>');
                    }
                    var link = '';
                    if (pwrattack=="checked" && ((!fightlist && pwr_attack_link.length > 0) || (fightlist && targetattackslist[os]>0))) {
                        if (fightlist && targetattackslist[os]>0) {
                            link = 'http://facebook.mafiawars.zynga.com/mwfb/' + fightlist_attack[os].replace(/xw_action=attack&/, 'xw_action=power_attack&').replace(/tmp=[0-9a-f]+/,'tmp='+tmpkey2);
                            // .replace(/&origin=fight_page/,'').replace(/&tab=0/,'');
                        } else {
                            link = pwr_attack_link;
                        }
                        msg('Power Attacking '+targetname+' in '+city+'... (<a href="'+theaurl+'skip_req_frame=1">url</a>)');
                    } else {
                        if (fightlist && fightlist_attack[os].length > 0) {
                            link = 'http://facebook.mafiawars.zynga.com/mwfb/' + fightlist_attack[os];
                        } else {
                            link = attack_link;
                        }
                        msg('Attacking '+targetname+' in '+city+'... (<a href="'+theaurl+'skip_req_frame=1">url</a>)');
                    }
                    var rflink = link;
                    log('sending request '+link);
                    params = { 'ajax': 1,
                            'liteload': 1,
                            'sf_xw_user_id': userid,
                            'sf_xw_sig': local_xw_sig,
                            'xw_client_id' : 8
                        };
                    req = $.ajax({
                        type: "POST",
                        data: params,
                        timeout: 30000,
                        url: link,
                        success: function (msg_rtn){
                            log('receiving request data '+targets[0]);
                            last_pwr = pwr;
                            pwr = false;
                            attack_link = '';
                            // attack = reg_fight_view_attack(20, 'remote/html_server.php?xw_controller=fight&xw_action=attack&xw_city=1&tmp=c81fbf2b73f15809212bf250f684d457&cb=23188bb0ed3611df969581fcbb693879&xw_person=56062571&opponent_id=p%7C51428473&tab=0', 'p|51428473', 20,this); return false;
                            if ((m=/reg_fight_view_attack.*?'([^']+)'/.exec(msg_rtn))) {
                                attack_link = 'http://facebook.mafiawars.zynga.com/mwfb/' + m[1].replace(/&amp;/g,"&");
                                log('got attack link');
                            }
                            pwr_attack_link = '';
                            // power_attack =  return do_ajax('inner_page', 'remote/html_server.php?xw_controller=fight&xw_action=power_attack&xw_city=1&tmp=XXX&cb=XXX&xw_person=56062571&opponent_id=p%7C51428473', 1, 1, 0, 0); return false;
                            if ((m=/xw_controller=fight.*?xw_action=power_attack.*?tmp=([0-9a-f]+).*?cb=([0-9a-f]+)/.exec(msg_rtn))) {
                                pwr_attack_link = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=power_attack&xw_city='+fight_city+'&tmp='+m[1]+'&cb='+m[2]+'&xw_person='+personid+'&opponent_id=p%7C'+targetzidlist[os].substr(2);
                                log('got power attack link');
                            }
                            try {
                                last_stam = cur_stam;
                                document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                cur_stam = parseInt(/user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                cur_health = parseInt(/user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                cur_gfp = parseInt(/user_fields\['user_favor'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                document.getElementById('exp_to_next_level').innerHTML = /user_fields\['exp_to_next_level'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                                expneed = parseInt(document.getElementById('exp_to_next_level').innerHTML);
                                user_bank_balance = parseInt(/user_fields\['user_bank_balance'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                switch(parseInt(fight_city)){
                                    case 1:
                                        document.getElementById('user_cash_nyc').innerHTML = /user_fields\['user_cash_nyc'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_nyc').innerHTML.replace(/,/g,'').replace(/\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_nyc').innerHTML+'</span>');
                                            bank(cash_in_hand,'nyc');
                                        }
                                        break;
                                    case 2:
                                        document.getElementById('user_cash_cuba').innerHTML = /user_fields\['user_cash_cuba'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_cuba').innerHTML.replace(/,/g,'').replace(/C\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_cuba').innerHTML+'</span>');
                                            bank(cash_in_hand,'cuba');
                                        }
                                        break;
                                    case 3:
                                        document.getElementById('user_cash_moscow').innerHTML = /user_fields\['user_cash_moscow'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_moscow').innerHTML.replace(/,/g,'').replace(/R\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_moscow').innerHTML+'</span>');
                                            bank(cash_in_hand,'moscow');
                                        }
                                        break;
                                    case 4:
                                        document.getElementById('user_cash_bangkok').innerHTML = /user_fields\['user_cash_bangkok'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_bangkok').innerHTML.replace(/,/g,'').replace(/B\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_bangkok').innerHTML+'</span>');
                                            bank(cash_in_hand,'bangkok');
                                        }
                                        break;
                                    case 5:
                                        document.getElementById('user_cash_vegas').innerHTML = /user_fields\['user_cash_vegas'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_vegas').innerHTML.replace(/,/g,'').replace(/V\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_vegas').innerHTML+'</span>');
                                            bank(cash_in_hand,'vegas');
                                        }
                                        break;
                                    case 6:
                                        document.getElementById('user_cash_italy').innerHTML = /user_fields\['user_cash_italy'\] = "([^"]+)/.exec(msg_rtn)[1];
                                        cash_in_hand = document.getElementById('user_cash_italy').innerHTML.replace(/,/g,'').replace(/L\$/g,'');
                                        if ((parseInt(cash_in_hand) > parseInt(bank_threshold))){
                                            msg('Banking <span class="good">'+document.getElementById('user_cash_italy').innerHTML+'</span>');
                                            bank(cash_in_hand,'italy');
                                        }
                                        break;
                                }
                            }
                            catch (fberr) { log('error in msg_rtn parse...'); }
//                            catch (fberr) { log(timestamp()+'ATTACK - ZYNGA RETURNED THIS:<br><plaintext>'+msg_rtn+'</plaintext><br><<<<END>>>>>'); }
                                if (/performing actions/.test(msg_rtn)) {
                                    log(timestamp()+'Performing actions too fast...bumping delay settings...');
                                    wait1++;
                                    wait2++;
                                    document.getElementById("dealy1").value = wait1;
                                    document.getElementById("dealy2").value = wait2;
                                    setTimeout(attack_again,2000);
                                    return;
                                }
                                if (/Your session has timed out/.test(msg_rtn) || /Current Page: index_controller/.test(msg_rtn)) {
                                    reload_home();
                                    tmpkey='';
                                    action='profile';
                                    attack_again();
                                    return;
                                }
                                if (/This player is currently part of your mafia/.test(msg_rtn)) {
                                    if (remove=="checked") {
                                        keys=/xw_action=remove_and_fight.*?xw_city=(\d).*?tmp=([a-z0-9]+).*?cb=([0-9a-z]+).*?opponent_id=(p%7C[0-9]+)/.exec(msg_rtn);
//                                        link = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=remove_and_fight&xw_city='+homes[1]+'&tmp='+homes[2]+'&cb='+homes[3]+'&opponent_id='+homes[4]+'&xw_client_id=8&ajax=1&liteload=1&sf_xw_user_id='+userid+'&sf_xw_sig='+local_xw_sig;
                                        //      http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=remove_and_fight&xw_city=5&tmp=ad442c69bb66725e86dbe265149fa674&cb=46399e40a22211dfaa40416634adefc0&opponent_id=p%7C59165225
                                        link = 'http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=fight&xw_action=remove_and_fight&xw_city='+keys[1]+'&tmp='+keys[2]+'&cb='+keys[3]+'&opponent_id='+keys[4];
                                        remove_from_mafia(link);
                                        return;
                                    }
                                    else {
                                        log(timestamp()+'<a href="#">'+targetname+'</a> is part of your Mafia, skipping...');
                                        targets=targets.slice(1);
                                        tmpkey="";
                                        action="";
                                        attack_again();
                                        return;
                                    }
                                }
                                if ((/The streets of Bangkok run red with blood/.test(msg_rtn) || /Only your top 501 Mafia members/.test(msg_rtn)) && !/<div class="fight_results">/.test(msg_rtn)) {
                                    //log(timestamp()+'Returned Fight Page for some reason - ZYNGA!');
                                    attack_again();
                                    return;
                                }
                                if (/You will be able to fight again when your health reaches/.test(msg_rtn) || /Heal yourself at the/.test(msg_rtn)) {
                                    healing();
                                    return;
                                }
                                else if (/<div class="fight_results">/.test(msg_rtn)) {
                                    process_fight_results(msg_rtn);
                                    return;
                                }
                                else if (/Master the art of fighting./.test(msg_rtn)) {
                                    log(timestamp()+'Kicked to fight page...multiple people hitting them or you...');
                                    attack_again();
                                    return;
                                }
                                else if (msg_rtn.replace(/\s*/g,'').length==0) {
                                    log(timestamp()+'Zynga returned blank page - ZYNGA! - may have been fight results...');
                                    attack_again();
                                    return;
                                }
                                else if (/response never closed/.test(msg_rtn) || /var ImagePreviewer/.test(msg_rtn) || /top\.location\.href/.test(msg_rtn)) {
                                    log(timestamp()+'Error 500, response never closed - ZYNGA! - retrying...');
                                    retries3++;
                                    if (retries3>5) {
                                        log(timestamp()+'Max retries reached...skipping...');
                                        retries3 = 0;
                                        targets=targets.slice(1);
                                        tmpkey='';
                                        action='';
                                        setTimeout(attack_again,1000);
                                        return;
                                    }
                                    attack_again();
                                    return;
                                }
                                else {
                                    log(timestamp()+'ZYNGA RETURNED THIS:<br><plaintext>'+msg_rtn+'</plaintext><br><<<<END>>>>>');
                                }
                            },
                            error: function(msg_rtn) {
                                if (errors < 3) {
                                    errors++;
                                    log(timestamp()+'Had trouble loading the page, retry #'+errors+' of 3...');
                                    pausing(5,'Retrying page load in ',attack_again);
                                }
                                else {
                                    errors = 0;
                                    targets=targets.slice(1);
                                    tmpkey='';
                                    action='';
                                    attack_again();
                                    return;
                                }
                            }
                        });
                    }
                    if (rapidfire) {
                        rapidfire = false;
                        var time2next = 0;
                        for (i = 1; i < parseInt(document.getElementById('user_health').innerHTML) / 130; i++) {
                            setTimeout(function(){
                                rf(pwr_attack_link);
                            },time2next++ * 250);
                        }
                    }
                    wait = myRandom(parseInt(wait1),parseInt(wait2));
                    pausing(wait, 'Attacking in ', f);
                }
            }
        }
    }

    function rf(link) {
        log(timestamp()+'rf attack processing call '+targets[0]);
        params = { 'ajax': 1,
                'liteload': 1,
                'sf_xw_user_id': userid,
                'sf_xw_sig': local_xw_sig,
                'xw_client_id' : 8
            };
        req = $.ajax({
            type: "POST",
            data: params,
            timeout: 30000,
            url: link,
            success: function (msg_rtn){
                log(timestamp()+'rapidfire result');
                try {
                    last_stam = cur_stam;
                    document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                    document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                    cur_stam = parseInt(/user_fields\['user_stamina'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                    cur_health = parseInt(/user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                    cur_gfp = parseInt(/user_fields\['user_favor'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                    document.getElementById('exp_to_next_level').innerHTML = /user_fields\['exp_to_next_level'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                    expneed = parseInt(document.getElementById('exp_to_next_level').innerHTML);
                    user_bank_balance = parseInt(/user_fields\['user_bank_balance'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                }
                catch (fberr) { log('error in msg_rtn parse...'); }
                    if (/<div class="fight_results">/.test(msg_rtn)) {
                        process_fight_results(msg_rtn,true);
                        return;
                    }
                }
            });
    }

    var vic_pts = 0;
    var initial_vic_pts = 0;
    function process_fight_results(msg_rtn,nomorekill) {
        if (fbusername.length==0 && fbuserid.length>0) {
            getFBName2(fbuserid);
        }
        os = targetlist.length - targets.length;
        if (typeof(targetattackslist[os])=="undefined") {
            targetattackslist[os]=0;
        }
        targetattackslist[os] += (last_stam - cur_stam);
        targetsuicidelist[os] += (last_stam - cur_stam);
        attacks += (last_stam - cur_stam);
        log('');
        loot='';
        money='';
        pre='';
        crit=0;
        doublecash=0;
        jobmoney=0;
        cashdropped=0;
        stats="";
        you='';
        them='';
        if (/Attack Again/.test(msg_rtn)) {
            if (/Attack again 5 times/.test(msg_rtn)) {
                tmpkey2 = /&xw_action=power_attack&xw_city=.+?&tmp=(.+?)&/.exec(msg_rtn)[1];
            }
            pre += '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16.png" width="16" height="16" title="Target alive"> ';
            alive = true;
        }
        else {
            alive = false;
        }
        if ((d=/<div class="fightres_health">Took (\d+) damage<\/div>/.exec(msg_rtn))) {
            dtaken+=parseInt(d[1]);
        }
        if ((d=/<div class="fightres_damage">Dealt (\d+) damage<\/div>/.exec(msg_rtn))) {
            ddealt+=parseInt(d[1]);
        }
        if ((e=/<div class="fightres_experience (good|bad)">\s+\+(\d+)\s+(Experience|Exp)\s+<\/div>/.exec(msg_rtn))) {
            exp='Gained <span class="good">'+parseInt(e[2])+' xp</span>';
            exp_gained+=parseInt(e[2]);
        }
        if (c=/<div class="sexy_new_york_cash good">\s+\+(\s+)?(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            if (doublecash) {
                jobmoney += jobmoney;
            }
            ny_gained += jobmoney;
            if (xw_city == 1) {
                cashdropped = jobmoney;
            }
            money = ' and <span class="good">$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_cuba_cash good">\s+\+(\s+)?C(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            if (doublecash) {
                jobmoney += jobmoney;
            }
            cuba_gained += jobmoney;
            cashdropped = jobmoney;
            money = ' and <span class="good">C$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_moscow_cash good">\s+\+(\s+)?R(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            if (doublecash) {
                jobmoney += jobmoney;
            }
            moscow_gained += jobmoney;
            cashdropped = jobmoney;
            money = ' and <span class="good">R$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_bangkok_cash good">\s+\+(\s+)?B(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            if (doublecash) {
                jobmoney += jobmoney;
            }
            bangkok_gained += jobmoney;
            cashdropped = jobmoney;
            money = ' and <span class="good">B$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_vegas_cash good">\s+\+(\s+)?V(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            if (doublecash) {
                jobmoney += jobmoney;
            }
            vegas_gained += jobmoney;
            cashdropped = jobmoney;
            money = ' and <span class="good">V$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_italy_cash good">\s+\+(\s+)?L(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            if (doublecash) {
                jobmoney += jobmoney;
            }
            italy_gained += jobmoney;
            cashdropped = jobmoney;
            money = ' and <span class="good">L$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_new_york_cash bad">\s+-(\s+)?(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            ny_gained -= jobmoney;
            money = ' and <span class="bad">$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_cuba_cash bad">\s+-(\s+)?C(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            cuba_gained -= jobmoney;
            money = ' and <span class="bad">C$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_moscow_cash bad">\s+-(\s+)?R(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            moscow_gained -= jobmoney;
            money = ' and <span class="bad">R$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_bangkok_cash bad">\s+-(\s+)?B(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            bangkok_gained -= jobmoney;
            money = ' and <span class="bad">B$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_vegas_cash bad">\s+-(\s+)?V(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            vegas_gained -= jobmoney;
            money = ' and <span class="bad">V$'+commas(jobmoney)+'</span>';
        }
        if (c=/<div class="sexy_italy_cash bad">\s+-(\s+)?L(\$([\d,]+))/.exec(msg_rtn)) {
            jobmoney += p(c[3]);
            italy_gained -= jobmoney;
            money = ' and <span class="bad">V$'+commas(jobmoney)+'</span>';
        }
        if ((gained=/found (some|an|a) (.+?) while fighting/.exec(msg_rtn))) {
            if (!loot) {
                loot = '. Loot: ';
            }
            loot += gained[2]+', ';
            add_loot(gained[2]);
            loot=loot.slice(0,loot.length-1);
        }
        if ((gained=/found (some|an|a|\d) (.+?)!/.exec(msg_rtn))) {
            if (!loot) {
                loot = '. Loot: ';
            }
            if ((m=/found (\d) (.+?)!/.exec(msg_rtn)) && m[1] == '2') {
                loot += '2 ' + gained[2]+', ';
                add_loot(gained[2]);
                loot=loot.slice(0,loot.length-1);
            } else {
                loot += gained[2]+', ';
            }
            add_loot(gained[2]);
            loot=loot.slice(0,loot.length-1);
        }
        if ((labor=/You have found (\d+) of (\d+) items/.exec(msg_rtn))) {
            loot += ' ('+labor[1]+' of '+labor[2]+')';
        }
        if ((set=/You have found all 8 items in the/.exec(msg_rtn))) {
            if (!setcomp) {
                loot += '. Set completed!';
            }
            setcomp = true;
        }
        if (jobmoney == 0) {
            money='';
        }
        you = /class="fightres_name"><([^>]+)?>([^<]+)?</.exec(msg_rtn)[2];
        ss=/<div class="fightres_skill_attack (good|bad)">.+> ?([\d,]+)<\/div>/.exec(msg_rtn);
        var ss2 = />([^<]+)?<\/div>/.exec(ss);
        sa=/<div class="fightres_group_attack (good|bad)">.+> ?([\d,]+)<\/div>/.exec(msg_rtn);
        attacknow = p(sa[2]);
        // opponent defense
        if ((od=/<div class="fightres_group_defense">.+> ?([\d,]+)<\/div>/.exec(msg_rtn))) {
            targetdefenselist[os]=od[1];
        }
        sd=/Mafia Defense Strength.+> ?([\d,]+)<\/div>/.exec(msg_rtn);
        defnow = p(sd[1]);
        if (start_a==0 && start_d==0) {
            start_a=attacknow;
            start_d=defnow;
        }
        update_ad();
        if (od) {
            stats = ' vs '+mafia_defense+' '+od[1]+' - Level '+targetlevellist[os];
        }
        if (/fightres_title good/.test(msg_rtn)) {
            targetstrength1list[os]=ss2[1];
            targetstrength2list[os]='';
            targetstrengthlist[os]='W-'+(/fightres_skill_attack good/.test(msg_rtn)?'W':'L')+'-'+(/fightres_group_attack good/.test(msg_rtn)?'W':'L');
            log(timestamp()+pre+exp+money+stats+loot);
//*******************************************************
            if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'').replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+targetalivelist[os];
                logData(url);
            }
//*******************************************************
            url = '?action=2&user='+userid+'&ufbid='+fbuserid+'&umw_name='+escape(you)+'&ufb_name='+escape(fbusername)+'&skills='+ss2[1].replace(/,/g,'')+'&weapons='+sa[2].replace(/,/g,'');
            logData(url);
            if(vic_pts == 0){
                initial_vic_pts = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(msg_rtn)[1];
            }
            vic_pts = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(msg_rtn)[1];
        }
        if (/fightres_title bad/.test(msg_rtn)) {
            targetstrength1list[os]='';
            targetstrength2list[os]=ss2[1];
            targetstrengthlist[os]='L-'+(/fightres_skill_attack good/.test(msg_rtn)?'W':'L')+'-'+(/fightres_group_attack good/.test(msg_rtn)?'W':'L');
            lost += (last_stam - cur_stam);
            log(timestamp()+pre+'<span class="bad">Lost</span> fight '+stats);
//*******************************************************
            if (targetlist[os].length > 0 && targets[0].substr(0,2) !== 'p|') {
                url = '?action=1&user='+userid+'&fbid='+targetlist[os]+'&zid='+targetzidlist[os]+'&mw_name='+escape(targetnamelist[os])+'&fb_name='+escape(targetfbnamelist[os])+'&level='+targetlevellist[os]+'&defense='+targetdefenselist[os].replace(/,/g,'')+'&server='+targetserverlist[os]+'&green='+targetstrength1list[os].replace(/,/g,'')+'&red='+targetstrength2list[os].replace(/,/g,'')+'&fwon='+targetswonlist[os]+'&flost='+targetslostlist[os]+'&ices='+targetsicedlist[os]+'&whacks='+targetswhackedlist[os]+'&alive='+targetalivelist[os];
                logData(url);
            }
            url = '?action=2&user='+userid+'&ufbid='+fbuserid+'&umw_name='+escape(you)+'&ufb_name='+escape(fbusername)+'&skills='+ss2[1].replace(/,/g,'')+'&weapons='+sa[2].replace(/,/g,'');
            logData(url);
        }
        attackprev = p(sa[2]);
        defprev = p(sd[1]);
        var sa2 = />([^<]+)?<\/div>/.exec(sa);
        var od2 = />([^<]+)?<\/div>/.exec(od);
        var verb;
        var bragname = '';
        if (bragnm=="checked") {
            bragname = ' ('+targetfbnamelist[os]+')';
        }
        if ((k=/You killed your opponent, bringing your total body count to (\d+)/.exec(msg_rtn))) {
            last_fbid = targetlist[os];
            last_zid = targetzidlist[os];
            ttl_kills++;
            update_icekills();
            rapidfire = false;
            verb = kill_verbs[myRandom(0,9)];
            if (mwstyle=="checked") {
                log(timestamp()+'You just <span class="good">killed</span> <a href="#">'+targetnamelist[os]+'</a>, bringing your total body count to <span class="good">'+k[1]+'.</span>');
                log(timestamp()+'<a href="#">'+you+'</a> '+sa2[1]+' vs '+od2[1]+' <a href="#">'+targetnamelist[os]+'</a> - Level '+targetlevellist[os]);
                brags += 'You just killed '+targetname+', bringing your total body count to '+k[1]+'.\n';
            } else {
                log(timestamp()+kill+' You killed the opponent. Bodycount killed: '+k[1]);
                brags += targetnamelist[os]+' Level '+targetlevellist[os]+bragname+' << '+verb+' # '+k[1]+'\n';
            }
            if (fightlist==false) {
                bragpop();
            }
            if (brags.length > 8000) {
                brags='';
            }
            targets=targets.slice(1);
            tmpkey="";
            action="";
        }
        else if ((k=/"iced_pop_body_count_number.*?([0-9,]+)/.exec(msg_rtn))) {
            last_fbid = targetlist[os];
            last_zid = targetzidlist[os];
            ttl_ices++;
            update_icekills();
            rapidfire = false;
            verb = ice_verbs[myRandom(0,9)];
            if (mwstyle=="checked") {
                log(timestamp()+fname+' just brought '+usersex+' body count to <span class="good">'+k[1]+'</span> by icing '+'<a href="#">'+targetnamelist[os]+'</a>.');
                log(timestamp()+'<a href="#">'+you+'</a> '+sa2[1]+' vs '+od2[1]+' <a href="#">'+targetnamelist[os]+'</a> - Level '+targetlevellist[os]);
                brags += fname+' just brought '+usersex+' body count to '+k[1]+' by icing '+targetname+'.\n';
            } else {
                log(timestamp()+kill+' You iced the opponent. Bodycount iced: '+k[1]);
                brags += targetnamelist[os]+' Level '+targetlevellist[os]+bragname+' << '+verb+' # '+k[1]+'\n';
            }
            if (fightlist==false) {
                bragpop();
            }
            if (brags.length > 8000) {
                brags='';
            }
            targets=targets.slice(1);
            tmpkey="";
            action="";
        }
        else if (/You took out/.test(msg_rtn)) {
            last_fbid = targetlist[os];
            last_zid = targetzidlist[os];
            ttl_kills++;
            update_icekills();
            rapidfire = false;
            verb = kill_verbs[myRandom(0,9)];
            if (mwstyle=="checked") {
                log(timestamp()+'You just <span class="good">took out</span> <a href="#">'+targetnamelist[os]+'</a>, bringing your total body count to <span class="good">'+k[1]+'.</span>');
                log(timestamp()+'<a href="#">'+you+'</a> '+sa2[1]+' vs '+od2[1]+' <a href="#">'+targetnamelist[os]+'</a> - Level '+targetlevellist[os]);
                brags += 'You just brought your body count to '+k[1]+' by killing '+targetname+'.\n';
            } else {
                log(timestamp()+kill+' You took out the opponent. Bodycount iced: '+k[1]);
                brags += targetnamelist[os]+' Level '+targetlevellist[os]+bragname+' << '+verb+' # '+k[1]+'\n';
            }
            if (fightlist==false) {
                bragpop();
            }
            if (brags.length > 8000) {
                brags='';
            }
            targets=targets.slice(1);
            tmpkey="";
            action="";
        }
        else if (!alive) {
            targets=targets.slice(1);
            tmpkey="";
            action="";
        }
        else if (makespread=="checked" && sprdtype=="1") {
            msg('Only attacking once for spread sheet...');
            targets=targets.slice(1);
            tmpkey="";
            action="";
        }
        else if (cashdrop > 0 && !(cashdropped > cashdrop)) {
            log(timestamp()+'<a href="#">Cheap bastard didn\'t drop enough '+city+' cash...skipping...</a>');
            targets=targets.slice(1);
            tmpkey="";
            action="";
        }
        if ((m=/In recognition of your criminal contribution.*been promoted to Level (\d+)!/.exec(msg_rtn))){
            log(timestamp()+levelup+' Promoted to level '+m[1]);
            pausecheck('Promoted to level '+m[1]+', pausing...');
        }
        if (!(makespread=="checked" && sprdtype=="1") && goforice=="" && /fightres_title bad/.test(msg_rtn)) {
            targets=targets.slice(1);
            tmpkey="";
            action="";
        }
        if (goforice=="checked" && /fightres_title bad/.test(msg_rtn)) {
            if (targetsuicidelist[os] >= suistop) {
                log(timestamp()+'Max number of suicide attemps reached this round...');
                targets=targets.slice(1);
                tmpkey="";
                action="";
            }
        }
/*        if (cur_health < hplow) {
            healing();
            return;
        } */
        if (!nomorekill) {
            attack_again();
        }
        return;
    }

    function update_ad() {
        var ad = mafia_attack + commas(attacknow);
        if (attacknow > start_a) {
            ad += '&nbsp;<span class="good">(+'+commas(attacknow-start_a)+')</span>'
        }
        ad += '&nbsp' + mafia_defense + commas(defnow);
        if (defnow > start_d) {
            ad += '&nbsp;<span class="good">(+'+commas(defnow-start_d)+')</span>'
        }
        document.getElementById("ad_gained").innerHTML = ad;
    }

    function update_icekills() {
        document.getElementById("icekills").innerHTML = 'Mafia <span class="good">'+mafiamax+'</span>&nbsp;&nbsp;Level <span class="good">'+levelmax+'</span>&nbsp;&nbsp;Ices <span class="good">'+commas(ttl_ices)+'</span>&nbsp;&nbsp;Kills <span class="good">'+commas(ttl_kills)+'</span>';
    }

    var CurD = 0;
    var CurH = 0;
    var CurM = -1;
    function update_time() {
        CurM++;
        if (CurM > 59) {
            CurH++;
            CurM = 0;
        }
        if (CurH > 23) {
            CurD++;
            CurH = 0;
        }
        var tformat = CurD + 'd ' + (CurH < 10 ? '0' : '')+CurH+':'+(CurM < 10 ? '0' : '')+CurM;
        document.getElementById("timeref").innerHTML = 'Started: <a>'+starttime+'</a>&nbsp;&nbsp;Elapsed: <span class="good">'+tformat+'</span>';
        min_timer = setTimeout(update_time,60000);
    }

    function bank(amount,city){
        if(fight_city == 5){
            var params = { 'ajax': 1,
                        'liteload': 0,
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                        };
            $.ajax({type: "POST", data: params,
                    url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&xw_person="+person+"&amount="+amount+"&city=5&building_type=6&xw_client_id=8",
                success: function (msg){},error: function (s1,s2,s3){}
            });
            return;
        }
    	do_ajax('','remote/html_server.php?xw_controller=bank&xw_action=deposit&xw_city='+fight_city+'&cb='+userid+UnixTS()+'&amount='+amount+'&city='+city,1,0,0,0);
    }

/*
    function bank(amount,city){
        if (city == 'vegas' && user_bank_balance == 50000000) {
            msg('At vault maximum...');
        }
        else {
            depositAll(amount, city);
        }
    }  */

    function loadfightpage(){
        msg('Loading new fight page...');
        fightlist_loaded = false;
        document.getElementById('inner_page').addEventListener('DOMSubtreeModified',
            function(){
                if (pageLoading == 0){
                    this.removeEventListener('DOMSubtreeModified',arguments.callee,false);
                    setTimeout(loadfightlist,1000);
                    return;
                }
            },false);
        do_ajax('inner_page','remote/html_server.php?xw_controller=fight&xw_action=view&cb='+cbkey,1,1,0,0);
    }

    function loadfightlist(){
        fightlist_names=[];
        fightlist_char_names=[];
        fightlist_levels=[];
        fightlist_mafia=[];
        fightlist_attack=[];
        fightlist_faction=[];

        targetlist = [];
        targetzidlist = [];
        targeticlist = [];
        targetnamelist = [];
        targetfbnamelist = [];
        targetserverlist = [];
        targetdefenselist = [];
        targetlevellist = [];
        targetattackslist = [];
        targetstrengthlist = [];
        targetstrength1list = [];
        targetstrength2list = [];
        targetstatuslist = [];
        targetdeadlist = [];
        targetofp = [];
        fighttable = document.evaluate( "//table[@class=\"main_table fight_table\"]//tr", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        for(i=1; i<fighttable.snapshotLength; i+=2){
            fightlist_names[fightlist_names.length] = /<a.+\/a>/.exec(fighttable.snapshotItem(i).getElementsByTagName('td')[0].innerHTML);
            fightlist_char_names[fightlist_char_names.length] = fighttable.snapshotItem(i).getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML;
            targetnamelist[targetnamelist.length] = fighttable.snapshotItem(i).getElementsByTagName('td')[0].getElementsByTagName('a')[0].innerHTML;
            fightlist_levels[fightlist_levels.length] = parseInt(/Level ([0-9]+)/.exec(fighttable.snapshotItem(i).getElementsByTagName('td')[0].innerHTML)[1]);
            fightlist_mafia[fightlist_mafia.length] = parseInt(/([0-9]+)/.exec(fighttable.snapshotItem(i).getElementsByTagName('td')[1].innerHTML)[1]);
            // width: 400px; color: rgb(102, 102, 102);
            targetdeadlist[targetdeadlist.length] = false;
            if (/102, 102, 102/.test(fighttable.snapshotItem(i).getElementsByTagName('td')[0].style.color)) {
                targetdeadlist[targetdeadlist.length-1] = true;
            }
            if (fight_city==4){
                fightlist_faction[fightlist_faction.length] = fighttable.snapshotItem(i).getElementsByTagName('td')[2].getElementsByTagName('img')[0].alt;
            }
        }
        fighttable = document.evaluate( "//td[@class=\"groupsize\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        for(i=0; i<fighttable.snapshotLength; i++){
            fightlist_mafia[fightlist_mafia.length] = parseInt(fighttable.snapshotItem(i).innerHTML.replace(/\s/g,""));
        }
        fighttable = document.evaluate( "//table[@class=\"main_table fight_table\"]//td[@class=\"action\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        try {
            cnt = 0;
            for(i=0; i<fighttable.snapshotLength; i++){
                fightlist_attack[fightlist_attack.length] = /'([^']+)/.exec(/reg_fight_view_attack\(([^\)]+)\);/.exec(fighttable.snapshotItem(i).innerHTML)[0].replace(/&amp;/g,'&'))[1];
                targetofp[cnt] = /ofp=([0-9a-z])/.exec(fightlist_attack[fightlist_attack.length-1])[1];
                targetlist[cnt] = /opponent_id=(p%7C[0-9]+)/.exec(fightlist_attack[fightlist_attack.length-1])[1].replace("p%7C","p|");
                targetzidlist[cnt] = targetlist[cnt];
                targeticlist[cnt] = '';
                targetfbnamelist[cnt]="";
                targetserverlist[cnt] = '';
                targetdefenselist[cnt] = '';
                targetlevellist[cnt] = '';
                targetattackslist[cnt] = 0;
                targetstrengthlist[cnt] = '';
                targetstrength1list[cnt] = '';
                targetstrength2list[cnt] = '';
                targetmafialist[cnt] = false;
                targetstatuslist[cnt++] = '';
            }
        }
        catch(err){
            alert(fighttable.snapshotItem(i).innerHTML);
        }
        i=0;
        fightlist_loaded = true;
        targets = targetlist;
        if (document.getElementById('status')) {
            msg('Fightlist loaded...');
            log(timestamp()+targets.length+' targets...')
            attack_again();
        }
    }

    function UnixTS(){
        return (Math.round(new Date().getTime() / 1000));
    }

    function healing() {
        var params = { 'ajax': 1,
                        'liteload': 1,
                        'xw_client_id' : 8,
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                    };
        if (gfphealth=="checked" && immediate=="checked" && cur_gfp > gfpstop && cur_gfp > 1) {
            // http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city=1&tmp=XXX&cb=XXX&user=MTc0MjM4NTkwMw%3D%3D&favor_type=1&favor_id=3&page=stats
            msg('Buying health refill for GFP...');
            req = $.ajax({
                type: "POST",
                data: params,
                url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city="+xw_city+"&tmp="+tmpkey+"&cb="+cbkey+"&user="+escape(btoa(targets[0]))+"&favor_type=1&favor_id=3&page=stats",
                success: function (msg_rtn){
                    try {
                        document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1];
                        cur_health = parseInt(/user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                        cur_gfp = parseInt(/user_fields\['user_favor'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                    }
                    catch (fberr) {}
                    reload_home();
                    tmpkey='';
                    action='';
                    attack_again();
                    return;
                }
            });
            return;
        }
        reload_home();
        curr_city = current_city();
        if (city == healcity){
            heal_travel=false;
            log('Going to NY hospital...');
            $.ajax({type: "POST",
                data: params,
                dataType: "json",
                url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb="+cbkey+'&xw_person'+personid,
                success: function (msg_rtn){
                    try {
                        cur_health = parseInt(msg_rtn.user_fields.user_health);
                        cur_gfp = parseInt(msg_rtn.user_fields.user_favor);
                    }
                    catch (fberr) {
                        log(timestamp()+'<span class="bad">Page not loaded properly, retrying...</span>');
                        healing()
                        return;
                    }
                    if (cur_health < hplow) {
                        if (run==0) {
                            attack_again();
                            return;
                        }
                        if (gfphealth=="checked" && cur_gfp - 1 > gfpstop) {
                            // http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city=1&tmp=XXX&cb=XXX&user=MTc0MjM4NTkwMw%3D%3D&favor_type=1&favor_id=3&page=stats
                            msg('Buying health refill with GFP...');
                            $.ajax({type: "POST",
                                data: params,
                                url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city="+xw_city+"&tmp="+tmpkey+"&cb="+cbkey+"&user="+escape(btoa(targets[0]))+"&favor_type=1&favor_id=3&page=stats",
                                success: function (msg_rtn){
                                    try {
                                        cur_health = parseInt(/user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                        cur_gfp = parseInt(/user_fields\['user_favor'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                    }
                                    catch (fberr) {}
                                    if (cur_health < hplow) {
                                        if (run==0) {
                                            attack_again();
                                            return;
                                        }
                                        msg('Cannot heal so fast, retrying in 5 seconds...');
                                        setTimeout(function(){
                                            msg('Retrying healing...');
                                            healing();
                                        },5000);
                                        return;
                                    }
                                    else {
                                        heal_travel=false;
                                        tmpkey='';
                                        action='';
                                        attack_again();
                                        return;
                                    }
                                }
                            });
                            return;
                        }
                        else {
                            msg('Cannot heal so fast, retrying in 5 seconds...');
                            setTimeout(function(){
                                msg('Retrying healing...');
                                healing();
                            },5000);
                            return;
                        }
                    }
                    else {
                        heal_travel=false;
                        tmpkey='';
                        action='';
                        attack_again();
                        return;
                    }
                }
            });
        }
        else if (heal_travel==true){
            log('healing...');
            $.ajax({type: "POST",
                data: params,
                dataType: "json",
                url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb="+cbkey,
                success: function (msg_rtn){
                    try {
                        cur_health = parseInt(msg_rtn.user_fields.user_health);
                        cur_gfp = parseInt(msg_rtn.user_fields.user_favor);
                    }
                    catch (fberr) {
                        log(timestamp()+'<span class="bad">Page not loaded properly, retrying...</span>');
                        healing()
                        return;
                    }
                    if (cur_health < hplow) {
                        if (run==0) {
                            attack_again();
                            return;
                        }
                        if (gfphealth=="checked" && cur_gfp - 1 > gfpstop) {
                            // http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city=1&tmp=XXX&cb=XXX&user=MTc0MjM4NTkwMw%3D%3D&favor_type=1&favor_id=3&page=stats
                            msg('Buying health refill with GFP...');
                            $.ajax({type: "POST",
                                data: params,
                                url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city="+xw_city+"&tmp="+tmpkey+"&cb="+cbkey+"&user="+escape(btoa(targets[0]))+"&favor_type=1&favor_id=3&page=stats",
                                success: function (msg_rtn){
                                    try {
                                        cur_health = parseInt(/user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                        cur_gfp = parseInt(/user_fields\['user_favor'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                    }
                                    catch (fberr) {}
                                    if (cur_health < hplow) {
                                        if (run==0) {
                                            attack_again();
                                            return;
                                        }
                                        msg('Cannot heal so fast, retrying in 5 seconds...');
                                        setTimeout(function(){
                                            msg('Retrying healing...');
                                            healing();
                                        },5000);
                                        return;
                                    }
                                    else {
                                        heal_travel=false;
                                        tmpkey='';
                                        action='';
                                        attack_again();
                                        return;
                                    }
                                }
                            });
                            return;
                        }
                        else {
                            log('can\'t heal...');
                            msg('Cannot heal so fast, retrying in 5 seconds...');
                            setTimeout(function(){
                                msg('Retrying healing...');
                                healing();
                            },5000);
                            return;
                        }
                    }
                    $.ajax({type: "POST",
                        data: params,
                        url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=1&cb="+cbkey+"&destination="+xw_city+"&from=fight",
                        success: function (msg_rtn){
                            msg('Travelling back...');
                            log('travelling back...');
                            heal_travel=false;
                            reload_home();
                            tmpkey='';
                            action='';
                            attack_again();
                            return;
                        }
                    });
                }
            });
        }
        else{
            msg('Travelling to NY hospital...');
            $.ajax({type: "POST",
                data: params,
                url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city="+xw_city+"&cb="+cbkey+"&destination=1&from=fight",
                success: function (msg_rtn){
                    reload_home();
                    heal_travel=true;
                    msg('Healing...');
                    $.ajax({type: "POST",
                        data: params,
                        dataType: "json",
                        url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb="+cbkey,
                        success: function (msg_rtn) {
                            try {
                                cur_health = parseInt(msg_rtn.user_fields.user_health);
                                cur_gfp = parseInt(msg_rtn.user_fields.user_favor);
                            }
                            catch (fberr) {
                                log(timestamp()+'<span class="bad">Page not loaded properly, retrying...</span>');
                                healing()
                                return;
                            }
                            if (cur_health < hplow) {
                                if (run==0) {
                                    attack_again();
                                    return;
                                }
                                if (gfphealth=="checked" && cur_gfp - 1 > gfpstop) {
                                    // http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city=1&tmp=XXX&cb=XXX&user=MTc0MjM4NTkwMw%3D%3D&favor_type=1&favor_id=3&page=stats
                                    msg('Buying health refill with GFP...');
                                    $.ajax({type: "POST",
                                        data: params,
                                        url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=marketplace&xw_action=buy&xw_city="+xw_city+"&tmp="+tmpkey+"&cb="+cbkey+"&user="+escape(btoa(targets[0]))+"&favor_type=1&favor_id=3&page=stats",
                                        success: function (msg_rtn){
                                            try {
                                                cur_health = parseInt(/user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                                cur_gfp = parseInt(/user_fields\['user_favor'\] = parseInt\("([0-9]+)/.exec(msg_rtn)[1].replace(/,/g,""));
                                            }
                                            catch (fberr) {}
                                            if (cur_health < hplow) {
                                                if (run==0) {
                                                    attack_again();
                                                    return;
                                                }
                                                msg('Cannot heal so fast, retrying in 5 seconds...');
                                                setTimeout(function(){
                                                    msg('Retrying healing...');
                                                    healing();
                                                },5000);
                                                return;
                                            }
                                        }
                                    });
                                }
                                else {
                                    msg('Cannot heal so fast, retrying in 5 seconds...');
                                    setTimeout(function(){
                                        msg('Retrying healing...');
                                        healing();
                                    },5000);
                                    return;
                                }
                            }
                            $.ajax({type: "POST",
                                data: params,
                                url: "http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city=1&cb="+cbkey+"&destination="+xw_city+"&from=fight",
                                success: function (msg_rtn){
                                    msg('Travelling back...');
                                    log('travelling back...');
                                    heal_travel=false;
                                    reload_home();
                                    tmpkey='';
                                    action='';
                                    attack_again();
                                    return;
                                }
                            });
                        }
                    });
                }
            });
        }
    }

}())

Because it's your web | Donate

Powered by monkeys and unicorns with the help of many friends

Policy & Guidelines: DMCA Privacy Policy