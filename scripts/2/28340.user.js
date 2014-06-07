// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
//
// ==UserScript==
// @name          DesignWechsler Version 1 (Einfache Styles)
// @namespace     kommtbald
// @description   DesignWechsler by Michael P. ( Mit Scriptteilen aus Jautis 0.1  von Michael Zangl)  Auswahl des Designs unter "meine privatsphäre"
// @include       http*://*schuelervz.net*
// @version       1.0
// ==/UserScript==

var imgprefix="http://www.oyla19.de/userdaten/81448731/bilder/";



var settings={
  theme:0,//theme
}
var css=""




//var val=(document.cookie.match(/settings=[^;]*/)+"").substr(9).split(",",10);
var val=GM_getValue("settings","");

if(val=="")//alte sachen importieren
  var val=(document.cookie.indexOf("settings")>-1)
     ? (document.cookie.match(/settings=[^;]*/)+"").substr(9).split(",")
     : [];
else
  val=val.split(",")

for(var i=0;i<val.length;i++){
  val[i]=val[i].split("=",2);
  if(val[i].length>1)
    settings[val[i][0]]=decodeURIComponent(val[i][1]);
}

var favs=eval(GM_getValue("favs","[]"));
if(typeof favs != "object" || favs.length<1) //abwärtskompatibilität
  favs=eval(decodeURIComponent((document.cookie.match(/favs=[^;]*/)+"").substr(5)))//jeweils array, url=name
if(typeof favs != "object")
  var favs=new Array();



/********************************* styles ******************************************/

function style(obj){
  if(!obj){
    alert("Fehlerhaftes Design gewählt");
    var obj={}
  }
  //Quelltext bereinigen
  var bodyelm=document.getElementById("content")
  if(!bodyelm)
    bodyelm=document.getElementById("contentx")
  if(!bodyelm)
    bodyelm=document.body;

  /*var html=bodyelm.innerHTML.replace( /(style\=\"[^"]*)background-color\s?\:\s?[^;]+([^"]*\")/g, "$1$2" )
  html=html.replace( /(style\=\"[^"]*)background\s?\:\s?[^;]+([^"]*\")/g, "$1$2" )//.replace(/style\=\"[^"]*\"/g,"")
  html=html.replace( /(style\=\"[^"]*)color\s?\:\s?[^;]+([^"]*\")/g, "$1$2" )
  html=html.replace( /(style\=\"[^"]*)border-color\s?\:\s?[^;]+([^"]*\")/g, "$1$2" )
  html=html.replace( /(style\=\"[^"]*border\s?\:\s?\d+px\s[^\s])[^;]+([^"]*\")/g, "$1$2" )
  bodyelm.innerHTML=html*/


//linkcolor, textcolor, leftnavcolor /*lines and links*/,leftnavhovertext, leftnavhoverbg,css
  var bodybg        =obj.bodybg         ? obj.bodybg        : "#fff";
  var contentbg     =obj.contentbg      ? obj.contentbg     : bodybg;
  var bg2           =obj.bg2            ? obj.bg2           : "transparent";//e.g. for each 2nd line in tables
  var bg3           =obj.bg3            ? obj.bg3           : bg2;//zwischen bg1 und bg2
  var textcolor     =obj.textcolor      ? obj.textcolor     : "black";
  var textcolor2    =obj.textcolor2     ? obj.textcolor2    : textcolor;//for subheader, headlines in tables in userinfo, orginal: gray
  var linkcolor     =obj.linkcolor      ? obj.linkcolor     : textcolor;
  var linkstyle     =obj.linkstyle      ? "color:"+linkcolor+";"+obj.linkstyle : "text-decoration:underlined;color:"+linkcolor;
  var highlightcolor=obj.highlightcolor ? obj.highlightcolor: linkcolor;
  var link2hovercolor=obj.link2hovercolor?obj.link2hovercolor:highlightcolor;//orginal:white, for head and foot
  var link2hoverbg  =obj.link2hoverbg   ? obj.link2hoverbg  : textcolor;//orginal:pink
  var borderscolor  =obj.borderscolor   ? obj.borderscolor  : "white"; //for most borders, e.g. menu, searchfield,...
  var borderscolor2 =obj.borderscolor2  ? obj.borderscolor2 : bg2; //für alle hellen Rahmen
  var h1color       =obj.h1color        ? obj.h1color       : textcolor;//e.g xy's Seite
  var h1bg          =obj.h1bg           ? obj.h1bg          : "transparent";
  var h1style       =obj.h1style        ? obj.h1style       : "";
  var h2color       =obj.h2color        ? obj.h2color       : textcolor; //Überschriften
  var h2bg          =obj.h2bg           ? obj.h2bg          : bg2;
  var h2style       =obj.h2style        ? obj.h2style       : "";
  var h3color       =obj.h3color        ? obj.h3color       : textcolor; //kleine überschriften
  var h3bg          =obj.h3bg           ? obj.h3bg          : "inherit";
  //var h3style       =obj.h3border       ? obj.h3border      : h3bg;
  var h3style       =obj.h3style        ? obj.h3style       : "";
/*  var h3subcolor    =obj.h3subcolor     ? obj.h3subcolor    : textcolor;//under the headline for infosection
  var h3subbg       =obj.h3subbg        ? obj.h3subbg       : "transparent";
  var h3substyle    =obj.h3substyle     ? obj.h3substyle    : "";
  var h4color       =obj.h4color        ? obj.h4color       : textcolor2;//little headlines (e.g. Persönliches)
  var h4bg          =obj.h4bg           ? obj.h4bg          : "transparent";
  var h4style       =obj.h4style        ? obj.h4style       : "";*/
  var inputstyle    =obj.inputstyle     ? obj.inputstyle    : "";
  var buttoncolor   =obj.buttoncolor    ? obj.buttoncolor   : h1color;
  var buttonbg      =obj.buttonbg       ? obj.buttonbg      : h1bg;
  var buttonstyle   =obj.buttonstyle    ? obj.buttonstyle   : "border-style:outset;";
  var buttonactstyle=obj.buttonactstyle ? obj.buttonactstyle: "border-style:inset;";//button:active
  var leftlogo      =obj.leftlogo       ? obj.leftlogo      : "none";
  var topheaderbg   =obj.topheaderbg    ? obj.topheaderbg   : "none";
  var topheaderstyle=obj.topheaderstyle ? obj.topheaderstyle: "";
  var topoverflowbg =obj.topoverflowbg  ? obj.topoverflowbg : "none";
  var bottomoverflowbg=obj.bottomoverflowbg  ? obj.bottomoverflowbg : "none";

  //var listelementstyle=obj.listelementstyle?obj.listelementstyle:"";//e.g ont he left site
  var stylecss      =obj.css            ? obj.css           : "";



  //clear some things you don't need
  css+="#logo img {display:none;}";
  css+="input[disabled]      {opacity:0.6}";

/*  if(document.getElementById("kds_form_in"))
    document.getElementById("kds_form_in").setAttribute("style","");*/

  css+="a                    {"+linkstyle+"}";
  css+="body                 {background:"+bodybg+";color:"+textcolor+"}";
  //css+=".label               {color:"+textcolor2+"}";
  //css+="#content, #contentx, .content_notification {border-left-color:"+borderscolor+" ;border-right-color:"+borderscolor+";background:"+contentbg+" }";

  //css+="#yspacer, .yspacer, .wallpost .info .actions, .underlined {border-color:"+borderscolor+";}";

  css+=".highlightBox, .groupsWrap {border-color:"+borderscolor+";background:"+bg2+"}"

  css+="#content, .groupsWrap ul li.clearFix {border-color:"+borderscolor+";background:"+contentbg+"}"
  css+="#pageFooter         {background:"+bg2+";color:"+textcolor+";border-top-color:"+borderscolor+";border-bottom:none;}";

  css+="#topHeader          {background:"+topheaderbg+";"+topheaderstyle+"}";

  //h1
  css+="#pageHeader         {color:"+h1color+";background:"+h1bg+";border-color:"+h1bg+";"+h1style+"}";
  css+="#pageHeader h1      {color:inherit}";

  css+="#shoutbox           {border-color:"+borderscolor+";background:"+contentbg+"}"

  //h2
  css+="h2, .mH             {color:"+h2color+";background:"+h2bg+";border-bottom-color:"+borderscolor2+";border-top-color:"+borderscolor+";"+h2style+"}";

  //h3
  css+="h3                   {color:"+h3color+";background:"+h3bg+";"+h3style+"}";

  //menü
  css+=".linkList li         {border-bottom-color:"+borderscolor+"}";
  css+=".linkList a:hover, #pageFooter a:hover, .linkList a.active {color:"+link2hovercolor+";background:"+link2hoverbg+";}";
  css+="ul.linkList          {border:none;}";

  //tabs
  css+="ul#tabBar            {border-color:"+h1bg+"}";
  css+="#tabBar li.selected  {background:"+h1bg+"}";
  css+="#tabBar li a         {color:inherit !important}";
  css+="#tabBar li:hover     {background:"+bg2+"}";

  //Dialoge
  css+=".phxDialog           {padding:10px;background:"+bg2+";border:1px solid "+bg2+";-moz-border-radius:15px;color:"+textcolor+"}";
  css+=".phxDialogTop, .phxDialogBottom {display:none}";
  css+=".phxDialogBody       {padding:10px;border:3px solid "+borderscolor+"; background:"+contentbg+";width:auto;}";
  css+=".phxDialogTitle      {border-bottom-color:"+borderscolor+"; color:"+textcolor+"}"; //todo: h?

  //startseite
  css+="#startLeft h2        {background:"+contentbg+";color:"+h2color+";border-top:none;border-bottom-color:"+borderscolor+"}";
  css+=".groupStartSnipplets .floatR ul li {border-bottom-color:"+borderscolor+"}";
  css+=".visitorsNavi, #Kds  {border-color:"+borderscolor2+"}";

  //freunde bestätigen
  css+=".confirmInvite li    {background:"+contentbg+";border-color:"+borderscolor+"}";
  css+=".confirmInvite span  {color:"+h3color+";background:"+h3bg+";"+h3style+"}";

  //profil
  css+=".label               {clear:left;color:"+textcolor2+"}";
  css+=".pinboard_Navi, .friendsInfo, .microblogInfo {border-bottom-color:"+borderscolor2+"; background:"+bg2+";}";
  css+=".commentMetaData     {border-bottom-color:"+borderscolor2+";border-top-color:"+borderscolor+";background:inherit;}";
  css+=".pinboard_Entry p a  {"+linkstyle+"}";
  css+="#MicroBlog #historyEntries .microblogHistory,#microblogContent {border-color:"+borderscolor+";}"
  css+=".friendsArrow        {background:inherit !important;}"

  //Nachrichten
  css+="#Messages_List thead th{background:"+bg2+";border-top-color:"+borderscolor+"}";
  css+="#Messages_List td    {border-bottom-color:"+borderscolor+"}"
  css+=".opened td.subject .wrap {background:"+bg2+";border-color:"+borderscolor2+"}"
  css+="#Messages_List tr.status_new {background:"+bg2+";}";

  //meine Freunde
  css+="#FriendsList .pagerCont, .resultsRow, .friendsListLinks, .friendsSearchBox {background:"+bg2+";border-color:"+borderscolor+"}";
  css+="ul.tcl li            {background:"+contentbg+";border-color:"+borderscolor+" }";
  css+=".tcl .Links .linkList li {border-color:"+borderscolor+"}";

  //Gruppen
  css+=".groupsmHNavi, .forummHNavi { background:"+bg3+"; border-color:"+borderscolor2+"}";
  css+=".groupsRightColumns  {border-color:"+borderscolor+"}"

  //Foren
  css+=".threadWrap          {background:"+bg2+";border-color:"+borderscolor+"}";
  css+=".threadWrapBorder    {background:"+contentbg+";border-color:"+borderscolor+" }"
  css+=".threadPageCounter   {background:"+bg2+";border-color:"+borderscolor+"; color:"+textcolor+"}"
  css+=".createNewThread     {background:"+bg2+";border-color:"+borderscolor+";}"
  css+=".dialogueHeader      {border-bottom-color:"+borderscolor+"; color:"+textcolor+"}";

  //Buttos
  css+="a.btnLikeLink:link, a.btnLikeLink:visited, a.btnLikeLink:hover, a.btnLikeLink:focus, a.btnLikeLink:active, input.fieldBtnSubmit, input.fieldBtnCancel {background:"+buttonbg+";border-color:"+buttonbg+"; color:"+buttoncolor+";"+buttonstyle+"}"

  //privatspäre
  css+="#accordion h1        {color:"+h1color+";background:"+h1bg+";"+h1style+"}";
  css+="#accordion h2        {color:"+textcolor+";background-color:"+bg2+";}";
  css+=".miniAccordion       {border-color:"+borderscolor2+"}";
  css+="#accordion li        {color:"+textcolor+";background:"+contentbg+";border-color:"+borderscolor2+"}";

  //Fotos
  css+=".ThumbsOverview, #PhotoAlbums_EditPhotos form .clearFix, .AlbumCont {background:"+bg2+";border-color:"+borderscolor+"}";
  css+=".thumb, #PhotoAlbums_SingleView .ThumbsOverview #tagBar, .AlbumCont .clearFix {background:"+contentbg+"; border-color:"+borderscolor+" }";
  css+=".fn-note-edit, .fn-note-text {background:"+bg2+";border-color:"+borderscolor+";color:"+textcolor+"}";
  css+="#PhotoAlbums_SingleView .pagerCont {border-color:"+borderscolor+" }";
  css+=".editPhotoBox        {background-color:"+contentbg+"; border-color:"+borderscolor+" }";
  css+=".photosmHNavi        {background:"+bg3+";border-color:"+borderscolor2+"}"

  try{
    /*var font=document.createElement("font")
    font.innerHTML="SCHÜLER<b>VERZEICHNIS</b>"
    font.style.cssText="overflow:visble;position:absolute;font-size:20px;"
    document.getElementById("topHeader").insertBefore(font,document.getElementById("topNavi"))*/
  }catch(e){}

  /*css+="ul.ul_red            {color:"+highlightcolor+"}";
  css+="ul.ul_red li span,#leftmess table.announcetb,.leftmess table.announcetb,a.startsitebutton h2,a.startsitebutton_old h2       {color:"+textcolor+";background-color:"+contentbg+"}";
  //inputs
  css+=".inputtext, .inputpassword, input[type~=\"text\"], input[type~=\"password\"], input[type~=\"radio\"], input[type~=\"checkbox\"], #quicksearch input, .quicksearch input, textarea, select  {background:"+contentbg+";color:"+textcolor+";border-color:"+borderscolor+" !important;"+inputstyle+"}";
  css+="input[type~=\"submit\"], input[type~=\"button\"], input[type~=\"reset\"]{background:"+buttonbg+";border-color:"+buttonbg+"; color:"+buttoncolor+";"+buttonstyle+"}";
  css+="input[type~=\"submit\"]:active, input[type~=\"button\"]:active, input[type~=\"reset\"]:active {"+buttonactstyle+"}";
  //headlines
  css+="#headline            {color:"+h1color+"; background:"+h1bg+";border-bottom-color:"+h1bg+";"+h1style+"}";
  css+=".status_notification {}";
  css+="#subheadline2        {border-color:"+borderscolor+";background:"+bg2+"}";
  css+=".iconsection .info h2, .coolh2, .secheader {color:"+h3color+"; background:"+h3bg+";border:none;"+h3style+"}";
  css+=".secheader h2        {color:inherit;}";
  css+=".subheader, .wallpost .info {color:"+h3subcolor+" !important; background:"+h3subbg+";border:none;"+h3substyle+"}";
  css+=".subheader h3        {color:inherit;}";
  css+="h4, h5               {color:"+h4color+"; background:"+h4bg+";border:none;"+h4style+"}";
  //topnav
  css+="#topnav a, .topnav a, #homelink {color:"+h1color+"; background:transparent;}";
  css+="#topnav a:hover, .topnav a:hover {color:"+h1color+"; background:"+h1bg+";}";
  //footer
  css+="#pagefooter          {color:"+h1color+";background:transparent; border-top-color:"+borderscolor+"; border-bottom-color:"+borderscolor+";}";
  css+="#pagefooter a        {color:"+h1color+";}";
  //
  css+="#friendtables, #cat_bottom_table {background:"+bg2+"}";
  css+=".friendtable,#uploadpicture h4,.OverDragBox {border-color:"+borderscolor+";}";
  //dialogs
  css+="";
  css+="#dialog, .status,.confirm,#loginerrorbox,#error {border-color:"+borderscolor+";background:"+bg2+";}";
  css+="#dialog td.dialog    {border-color:"+borderscolor+";}";
  css+="#dialog h4           {border-color:"+borderscolor+";}";
  //tabs
  css+="#mailboxtabbox, .editalbum_TabsWithMargin ,.TabsWithMargin,#tabs {border-color:"+h1bg+"}";
  css+="#editalbum_tabs .inactivetab a:hover, #tabs .inactivetab a:hover {background:"+bg2+"}";
  css+=".PageTabs a:hover, #editalbum_tabs .activetab a, #tabs .activetab a{color:"+h1color+"; background:"+h1bg+";}";
  //images
  css+="#leftlogo2           {background:"+leftlogo+";}";
  css+="#topheader           {background:"+topheaderbg+";"+topheaderstyle+"}";
  //album
  css+=".albumphotocount div {display:inline}";
  css+=".myalbumspreviewcontainer{background:"+bg2+" !important;border-color:"+borderscolor+";}";
  css+=".myalbumpreview,.showpicinfobox, .isbox,.albumdescription {background:"+contentbg+";border-color:"+borderscolor+";color:"+textcolor+";}";
  css+=".photoheader         {border-color:"+borderscolor+";}";
  css+=".albumdescription_overview, .albumlocation_overview, .albumphotocount {color:"+textcolor+";}";
  css+=".myalbumspreviewcontainer td > div{border: 1px solid "+borderscolor+"; margin: 3px; padding: 5px; background: "+contentbg+"}";///todo: hintergrundfarbe änderbar machen

  css+="#topoverflow         {background-image:"+topoverflowbg+"} #bottomoverflow {background-image:"+bottomoverflowbg+"}";

  css+="#kds_form_in          {background:"+contentbg+";border-color:"+borderscolor+";border-style:none none solid solid;border-width: 0pt 0pt 1px 1px;float:right;width:142px;}";

  //vollgetextet
  css+=".helpbox             {background:"+contentbg+";border-color:"+borderscolor+";}";

  //eigene erweiterungen
  css+="#M_dialog            {background:"+bg2+";border-color:"+borderscolor+";}";*/

  //hover for liks


  /*if(document.getElementById("messagetable")){
    var trs=document.getElementById("messagetable").getElementsByTagName("tr");
    for(var i=0;i<trs.length;i++)
      if(trs[i].getAttribute("bgcolor"))
        trs[i].style.background = (trs[i].getAttribute("bgcolor").toLowerCase()=="#ffffff") ? contentbg : bg2;
    //last one
    trs[i-1].style.display="none";
    trs[i-2].style.marginBopttom="10px";
  }

  if(location.href.indexOf("group.php")>-1){
    var elms=document.getElementById("group_members").getElementsByTagName("table")[0].getElementsByTagName("td")
    for(var i=0;i<elms.length;i++)
      if(elms[i].getElementsByTagName("div")[0])
        elms[i].getElementsByTagName("div")[0].style.backgroundColor=bg2;
  }

  if(document.getElementById("friendtable")){
    document.getElementById("friendtable").style.border="1px solid "+borderscolor;
    document.getElementById("friendtable").style.background=contentbg;
  }*/


  if(obj.favicon){//icon
    var elms=document.getElementsByTagName("head")[0].getElementsByTagName("link")
    for(var i=0;i<elms.length;i++)
      if(elms[i].getAttribute("rel")=="shortcut icon")
        elms[i].parentNode.removeChild(elms[i])
    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = imgprefix+obj.favicon;
    document.getElementsByTagName("head")[0].appendChild(link)
  }

  if(obj.jsfunc)
    obj.jsfunc();

  css+=stylecss;
}


var styles=new Object();
styles["darkgreen"]={
  name        :"Darkgreen",
  description :"Schwarzer Hintergrund mit dunkelgrünen Elementen und weißem Text",
  image       :"http://img-a1.ak.imagevz.net/photo2/19/b2/d6f5182b8e78b386031cb13f5df7/6-3ce73a9633ea3d9e.jpg",
  textcolor   :"white",
  bodybg      :"black",
  bg2         :"#222",
  bg3         :"#0e0e0e",
  linkcolor   :"#50c720",
  borderscolor:"#50c720",
  h1color     :"white",
  h1bg        :"#047300",
  link2hovercolor:"white",
  link2hoverbg:"#047300",
  topoverflowbg:"url('"+imgprefix+"transparentoverlay_top.png')",
  bottomoverflowbg:"url('"+imgprefix+"transparentoverlay_bottom.png')",
  css         : "a[href*=\"group.php\"]:before,a[href*=\"groups.php\"]:before,a[href*=\"friends.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_group.png')\" \";} a[href*=\"home.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_home.png')\" \";} a[href*=\"privacy.php\"]:before,a[href*=\"account.php\"]:before,a[href*=\"groupopts.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_config.png')\" \";} a[href*=\"info.php\"]:before,a[href*=\"groupadmin.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_config.png')\" \";} a[href*=\"mailbox.php\"]:before,a[href*=\"message.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_message.png')\" \";} a[href*=\"addfriend.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_add.png')\" \";} a[href*=\"addfriend.php\"][href*=\"del=1\"]:before,a[href*=\"delete_album\"]:before{content:url('"+imgprefix+"darkgreen_icon_bomb.png')\" \";} a[href*=\"photos.php\"]:before,a[href*=\"album.php\"]:before,a[href*=\"groupadmin.php?page=pic\"]:before{content:url('"+imgprefix+"darkgreen_icon_image.png')\" \";} .leftnav a[href*=\"basicinfo.php\"]:before,.PageTabs a:before, a.hasimage:before{content:\"\" !important;} a[href*=\"groups.php?\"]:before,a[href*=\"search.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_search.png')\" \";}",
  jsfunc      :function(){
    var a=document.getElementsByTagName("a")
    for(var i=0;i<a.length;i++)
    //  if(a[i].firstChild&&a[i].firstChild.tagName&& a[i].firstChild.tagName.toUpperCase()=="IMG")
      if(a[i].getElementsByTagName("img").length>0)
        a[i].setAttribute("class",a[i].getAttribute("class")+" hasimage")
    //document.getElementById("leftlogo2").parentNode.setAttribute("class","hasimage")
  }
}
styles["darkorange"]={
  name        :"Dark and Orange",
  description :"Wie Darkgreen, nur orange",
  image       :"",
  textcolor   :"white",
  bodybg      :"black",
  bg2         :"#222",
  linkcolor   :"#e58c00",
  borderscolor:"#e58c00",
  h1color     :"white",
  h1bg        :"#ff8f06",
  link2hovercolor:"black",
  link2hoverbg:"#ff8f06",
  topoverflowbg:"url('"+imgprefix+"transparentoverlay_top.png')",
  bottomoverflowbg:"url('"+imgprefix+"transparentoverlay_bottom.png')",
  css         : "#topHeader {margin-left:-132px;padding-left:132px;background:no-repeat bottom right url('data:image/png;base64,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 CummarPvAAAAAElFTkSuQmCC')} a[href*=\"group.php\"]:before,a[href*=\"groups.php\"]:before,a[href*=\"friends.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_group.png')\" \";} a[href*=\"home.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_home.png')\" \";} a[href*=\"privacy.php\"]:before,a[href*=\"account.php\"]:before,a[href*=\"groupopts.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_config.png')\" \";} a[href*=\"info.php\"]:before,a[href*=\"groupadmin.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_config.png')\" \";} a[href*=\"mailbox.php\"]:before,a[href*=\"message.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_message.png')\" \";} a[href*=\"addfriend.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_add.png')\" \";} a[href*=\"addfriend.php\"][href*=\"del=1\"]:before,a[href*=\"delete_album\"]:before{content:url('"+imgprefix+"darkgreen_icon_bomb.png')\" \";} a[href*=\"photos.php\"]:before,a[href*=\"album.php\"]:before,a[href*=\"groupadmin.php?page=pic\"]:before{content:url('"+imgprefix+"darkgreen_icon_image.png')\" \";} .leftnav a[href*=\"basicinfo.php\"]:before,.PageTabs a:before, a.hasimage:before{content:\"\" !important;} a[href*=\"groups.php?\"]:before,a[href*=\"search.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_search.png')\" \";}",
  jsfunc      :function(){
    var a=document.getElementsByTagName("a")
    for(var i=0;i<a.length;i++)
      if(a[i].getElementsByTagName("img").length>0)
        a[i].setAttribute("class",a[i].getAttribute("class")+" hasimage")
  }
}
styles["blue1"]={/*Darkblue: #020c3e;*/
  name        :"Blau 1",
  author      :"Michel Zangl",
  description :"Blaues design, relativ schlicht",
  icon        :"favicon.ico",
  textcolor   :"black",
  textcolor2  :"white",
  h4color     :"black",
  bodybg      :"#020c3e",
  contentbg   :"#c2c3ef",
  bg2         :"#818ac2",
  linkcolor   :"#00126e",
  link2hovercolor:"white",
  link2hoverbg:"#00126e",
  h3bg        :"#2f4eee",
  h3style     :"border-bottom:1px solid #5f77ee !mportant",
  borderscolor:"transparent",
  h1color     :"white",
  h1bg        :"#6f759d",
  inputstyle  :"border:1px solid #00126e;background-color:white;",
  topoverflowbg:"url('"+imgprefix+"transparentoverlay_top.png')",
  bottomoverflowbg:"url('"+imgprefix+"transparentoverlay_bottom.png')",
  css         :" table.announcetb {border:none;brder-top:1px solid #4160ff !mportant}  .leftnav a {background-color:#c2c3ef}" //4160ff:leftbar
};

styles["advent"]={
  name        :"Advent",
  author      :"Michel Zangl",
  description :"Advent, die Zeit vor Weihnachten.",
  icon        :"",
  textcolor   :"white",
  textcolor2  :"white",
  h4color     :"black",
  bodybg      :"url('"+imgprefix+"skyatnight.png') repeat",
  contentbg   :"#0A145B",
  bg2         :"#112098",
  linkcolor   :"#8BA0FF",
  link2hovercolor:"white",
  link2hoverbg:"#00126e",
  h3bg        :"",
  h3color     :"white",
  h4color     :"white",
  borderscolor:"black",
  h1color     :"white",
  h1bg        :"#112098",
  inputstyle  :"border:1px solid #00126e;background-color:white;color:black;",
  topoverflowbg:"url('"+imgprefix+"transparentoverlay_top.png')",
  bottomoverflowbg:"url('"+imgprefix+"transparentoverlay_bottom.png')",
  css         :"#allIn table.announcetb {background:#1e2faa;color:white} .leftnav a {background-color:#c2c3ef} #leftlogo2{background:url('"+imgprefix+"Weihnachtsbaum_Kiefer_small.png');width:120px;height:160px;margin-left:-5px;} #quicksearch input, .quicksearch input {background:transparent;color:white;text-align:center;padding:2px 3px;margin-top:-50px; margin-bottom:30px;position:relative;z-index:10;border:none;} #quicksearch input:hover, .quicksearch input:hover {background:green;} .leftnav a{background:#0A145B;color:white} .leftnav a:hover, .leftnav a.active{color:#0A145B !important;background:white !important;}" //4160ff:leftbar
};

styles["text"]={
  name        :"Text",
  author      :"Michel Zangl",
  description :"nur Schwarz und Weiß"
}


if(GM_getValue("theme","0")!="0"){
  if(styles[ GM_getValue("theme","0") ])
    style( styles[GM_getValue("theme","0")] )
  else
    alert("Design nicht gefunden:\n\n"+GM_getValue("theme","0"))
}


/************************************************************ Einstellungsseite ***************************************************/

if(location.href.indexOf("Privacy")>-1)///optionen
{





  var jautismenuisshowen=false;
  var jautis_form=false;

  function showJautisMenu(){
    if(jautismenuisshowen)
      return;
    jautismenuisshowen=true

    try{
      document.getElementById("Privacy_Settings").getElementsByTagName("p")[0].style.display="none";
      document.getElementById("Privacy").style.display="none";
    }catch(e){}
    try{
      document.getElementById("AccuseIgnore_Pardon").style.display="none";
    }catch(e){}

    var lis=document.getElementById("tabBar").getElementsByTagName("li")
    for(var i=0;i<lis.length;i++)
      lis[i].className="";

    document.getElementById("jautis_tab").className="selected"

    var mydiv=document.createElement("div")
    mydiv.id="accordion";

    var h1=document.createElement("h1")
    h1.appendChild(document.createTextNode("Aussehen"))
    mydiv.appendChild(h1)

    var ul=document.createElement("ul")
    var li=document.createElement("li")

    var h2=document.createElement("h2")
    h2.appendChild(document.createTextNode("Farbe"))
    li.appendChild(h2)

    var div=document.createElement("div");
    div.className="miniAccordion";


    var select=document.createElement("select");
    select.name="farbe";
    select.addEventListener("blur",function(evt){
        renderbeschreibung(evt.currentTarget.value)
      },true)
    div.appendChild(select)

    var option=document.createElement("option");
    option.value="0"
    option.appendChild(document.createTextNode("Orginalfarbe"));
    if(GM_getValue("theme","0")=="0")
      option.selected=true;
    select.appendChild(option)

    for(var i in styles){
      var option=document.createElement("option");
      option.value=i
      option.appendChild(document.createTextNode(styles[i].name + " (von "+ (styles[i].author ? styles[i].author : "Unbekannt") + ")" ));
      if(GM_getValue("theme","0")==i)
        option.selected=true;
      select.appendChild(option)
      select.addEventListener("mousemove",function(evt){
        renderbeschreibung(evt.currentTarget.value)
      },true)
      select.style.cssFloat="none"
    }
    var beschreibungsdiv=document.createElement("div");
    div.appendChild(beschreibungsdiv);

    function renderbeschreibung(themeid){
      beschreibungsdiv.innerHTML=styles[themeid] ? styles[themeid].description : "";
    }
    renderbeschreibung(GM_getValue("theme","0"));

    li.appendChild(div)

    ul.appendChild(li)

    jautis_form=document.createElement("form");


    jautis_form.addEventListener("submit",function(evt){
      evt.preventDefault();
      jautisSaveSettings();
    }, true)
    jautis_form.appendChild(ul);


    var div=document.createElement("div");
    div.calassName="buttonArea";

    var input=document.createElement("input");
    input.value="Speichern"
    input.className="fieldBtnSubmit"
    input.type="submit"
    div.appendChild(input)

    jautis_form.appendChild(div);


    mydiv.appendChild(jautis_form);

    if(document.getElementById("Privacy_Accuse"))
      document.getElementById("Privacy_Accuse").appendChild(mydiv);
    else if(document.getElementById("Privacy_Settings"))
      document.getElementById("Privacy_Settings").appendChild(mydiv);
    else
      alert("konnte Knoten nicht einhängen!");
  }

  function jautisSaveSettings(){
    GM_setValue("theme",jautis_form.elements.namedItem("farbe").value);
    alert("gespeichert!")
    location.reload();
  }

  if(location.href.toLowerCase().indexOf("jautis")>-1)
    showJautisMenu();
  var li=document.createElement("li")
  li.id="jautis_tab"
  li.addEventListener("click",showJautisMenu,true);
  var a=document.createElement("a")
  li.appendChild(a);
  a.appendChild(document.createTextNode("Design-Wähler"))
  a.href="#"
  document.getElementById("tabBar").appendChild(li);
}
GM_addStyle(css);

