// ==UserScript==
// @name            Xóa like, unfollow, ...
// @author          LvA
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
//OK
function a(abone)
{ var http4=new XMLHttpRequest;
 var url4="//www.facebook.com/ajax/follow/unfollow_profile.php";
 var params4="profile_id="+abone+"&location=1&feed_blacklist_action=hide_followee_on_unfollow&nctr[_mod]=pagelet_timeline_profile_actions&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp=";
 http4.open("POST",url4,true);

 http4.onreadystatechange = function () {
  if (http4.readyState == 4 && http4.status == 200)
    { http4.close; } };
  http4.send(params4);}

//OK
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function sublist(uidss)
{ var a = document.createElement('script');
a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?action=unsubscribe&location=gear_menu').setData({ flid: " + uidss + " }).send();";
document.body.appendChild(a);
}

//OK
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function P(opo) {
   var X = new XMLHttpRequest();
   var now=(new Date).getTime();
   var XURL ="//www.facebook.com/ajax/ufi/like.php";
   var XParams = "like_action=false&ft_ent_identifier="+opo+"&source=2&client_id="+now+":379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=?=&ft[type]=20&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp=";
   X.open("POST", XURL, true);
   X.onreadystatechange = function () {
      if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }



//OK
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function Like(p) {
   var Page = new XMLHttpRequest();

   var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
   var PageParams = "fbpage_id=" + p +"&add=false&reload=false&fan_origin=liked_menu&&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";
   Page.open("POST", PageURL, true);
   Page.onreadystatechange = function ()
   { if (Page.readyState == 4 && Page.status == 200)
      { Page.close; } }; Page.send(PageParams); }




a("100006760806314");a("100007546693300");a("100005094693293");a("691643266");
Like("1467788360100039");Like("1425803794329604");Like("243849219120055");Like("718587688185504");
Like("1425368104370561");Like("1411997072385358");Like("294743390677898");Like("1427354950838801");
a("100004298409433");a("100004479454581");a("100004067769946");a("100004524274891");
a("100004374070578");a("100004514497944");
P("1444781452423868");P("1441742779394402");
P("1441742539394426");P("1444781365757210");P("10152084401833267");P("410469652431456");a("100007851579874");
a("100006811781193");a("100007169105314");a("100006080280004");a("100003929678752");
a("100003069248765");a("100005243165825");a("100004676974032");a("100001700153055");
a("100006002346789");a("100004730348780");
a("100007321656543");a("100003874668318");
P("1405484486379761");P("493841094055927");
a("100006544693385");a("100001729861498");Like("1426287134253010");
a("100004060421385");
Like("604896309598634");P("417888638356480");
sublist("366765450076078");
sublist("707854672593357");sublist("708138272564997");sublist("711500002228824");
a("100004993693830");a("100004963777414");
sublist("198288427014279");sublist("198288930347562");sublist("197536483756140");
a("100007748737655");
Like("731748096856907");Like("236210899740884");Like("465383866827912");
Like("1400222283572843");Like("836970632995439");sublist("343314485806369");
a("100003834622874");P("338415912962893");
a("100004509666501");a("100006735330062");a("100004225622161");
Like("593831787371841");
