// ==UserScript==
// @name           Reddit - account switcher
// @namespace      http://reddit.com
// @description    Switch between multiple accounts
// @include        http://*.reddit.com/*
// ==/UserScript==

function GM_wait() {  
  jq = navigator.appVersion.search("Safari") != -1 ? jQuery : unsafeWindow.jQuery;
  if(typeof jq == 'undefined'){
    window.setTimeout(GM_wait,100);
  } else {
    $ = jq;
    init();
  }
}
GM_wait();

function init() {

  var users = [
 // 
["DavidChen", "poopoo"],
["Mike856", "lollol"],
["SmurfFan", "lalala"],
["BBWLover56", "lalala"],
["KoreanPride62", "hahaha"],
["BillyBob66", "hahaha"],
["ProudAtheist88", "gagaga"],
["PortlandDude85", "kekeke"],
["Goon4Lyfe", "goonygoon"],
["MrLOL87", "fatty6"],
["JewLover77", "fatty7"],
["ZackParsonsFan", "fatty69"],
["MangosteenDrinker", "steeen"],
["Billy763", "steeene"],
["ObamaIsGod84", "ste521"],
["Jimzor82", "ste526"],
["MikeyTwo2", "sgast5"],
["NatutoFan67", "526dxb"],
["SunBright72", "gshs46"],
["Gateway2000", "fah3sb"],
["FurFag62", "ugs626"],
["Geoff80", "fgsd62"],
["Jill769", "fgs148"],
["Terry68", "gdshd6"],
["Bobby686", "gdsfd6"],
["supermarketvodka", "newshoe"],
["keepitfalse", "winecooler"],
["zonsgf", "wer908"],
["spirxd", "bgr4512"],
["aaronarronsen", "awawawa"],
["DearLichard", "clickmylinks"],
["CarTalkFan", "mangosteen"],
["Setsuna11", "qwerty2"],
["TiptopTuna", "goragora"],
["MorkLevin", "worrier"],
["Avatar62", "wfsdha"],
["Avast63", "shgshjs"],
["Acer73", "gagajx"],
["alleeboo", "weeweewee"],
["Furryfan94", "awesome"],
["Deadman20", "weepingbell"],
["IndorilNeravar", "asdf"],
["AsianWifu", "zxcvb"],
["TheNewEfart", "hangle"],
["CONGRESSIONALAFFAIRS", "hughcort"],
["Shambo", "wertwert"],
["KyleAlgays", "andfagstoo"],
["Nudelady", "nekkid"],
["Brolover3", "notgay"],
["Honkytonk", "seed"],
["seemerollin", "hatin"],
["suckmylinks", "tyty"],
["notachetter", "lies"],
["radatfan", "dddd"],
["avid_athiest", "nerfball99"],
["dawkins1988", "nerfball99"],
["gothslut", "nerfball99"],
["Welland", "haakw"],
["LARPerPride", "ns7vm"],
["SoniqQTM200", "jerabxa"],
["RecallRedial", "gzik5v"],
["Turion", "ASfgagau"],
["Kambrook", "sfdhshsx"],
["SuddenImpact", "Ahxncr4"],
["BluePoo", "dgsammcczx"],
["Elizabeth2nd", "jdsjdjdjd"],
["PlusThreeDagger", "hahsnccc"],
["TypingWand", "hshyqbx"],
["ArtlineBrown", "hayha67"],
["FatRightsNow", "hay22nb"],
["DameEdna", "hdsjsqj"],
["XMS145", "hsfdhjsa"],
["DDL7000", "yekkdsa"],
["GenderQueerAbo", "gsdhki"],
["ObamaIsAHomo", "hfshjsj"],
["CatInsurance", "gasgsj"],
["MrToshiba", "dgsdgshg"],
["sensisFBS", "hgxsbxnbi"],
["SanDiskPlus", "chsy12"],
["BrownFingersSF", "afgam3"],
["AnusMicrophone", "dsg6t5612"],
["EP31DS3L", "hxbcvb4"],
["enitarp", "gzcbxc"],
["XYLENO", "dsgsxbx4"],
["Secamiento", "fadsvbxc"],
["Shachihata", "bcxb43"],
["Wasserfest", "cxb5dk"],
["Trocknend", "dgxbcxc4"],
["Faserspitze", "c2xvxc"],
["LorR2dT", "vzxcvz34"],
["M2Fts", "xzvz31"],
["SseriesDES", "bxbx5ma"],
["PoisonedPickles", "vcxv31"],
["WhiteCircle", "vxzvzx5"],
["Resiste", "vcxbxc52"],
["HornySamoan", "bxcbx521"],
["PeterBrock", "bxmxbx48"],
["DavidBoonJr", "vmv6432"],
["JuliaGillard", "nvcncv54"],

  ];

  if ( users.length == 0 ) {
    alert("Reddit Account Switcher\n\nYou don't appear to have set any accounts to switch between.\nPlease edit the script around line 21 to add them.");
  };
    
  if ( $("form[action='/logout']").length == 0 || users.length == 0 ) { return true; };
  
  if($("#user_switch").length == 0){
    var string = "<span class='separator'>|</span>Change user: <select id='user_switch' class='spacer' style='font-size:10px;'>";
    for (var i=0; i < users.length; i++) {
      selected = "";
      if ( $(".user").text().split("(")[0].trim() == users[i][0]) { selected = ' selected="selected"'; };
      string = string + "<option"+selected+">"+users[i][0]+"</option>";
    };
    string = string + "</select><image id='user_switch_spinner' style='margin:0 0 -4px 5px; display:none;' src='http://squidcdn.s3.amazonaws.com/images/ajax-loader-spinner.gif'/>";
    $("#header-bottom-right").append(string);
  };

  $("#user_switch").change(function(el){
    for (var i=0; i < users.length; i++) { if(users[i][0] == $(this).val()){ user = users[i]; }; };    
    
    $("#user_switch_spinner").show();
    $.post("/logout", $(".logout:eq(0)").serialize(), function(){
      $.post("/post/login", { user: user[0], passwd: user[1] }, function(){
        window.location.reload();
      });
    });
    
  });
  
}