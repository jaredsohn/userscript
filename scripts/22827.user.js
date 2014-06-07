// <h1>SchülerVZ-Script von Michael Zangl</h1>
// <p style="color:red;margin-bottom:100%">Wenn du diesen Text siehst hast du Greasemonkey deaktiviert oder nicht Installiert!</p>
//
//
// Schülervz
// version 0.1 BETA!
// start: 2007-06-25
// aktuell: 2007-12-31
// Copyright (c) 2007, Michael zangl
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
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
// Änderungen mit 0.1.3.1: Besserer Werbeblocker
//
// ==UserScript==
// @name          SchülerVZ-Script 0.1.4
// @namespace     http://schuelervz.fam-zangl.net
// @description   SchülerVZ-Script des Change it Yourself Teams.
// @include       http*://*schuelervz.net*
// @exclude       *login_s.php*
// @version       0.1.4.0
// ==/UserScript==

var imgprefix="http://www.oyla19.de/userdaten/81448731/bilder/";



var settings={
  box:1,//.announcetb, [0:nicht anzeigen, 1:normal;2:witz;3:rss-feed]
  rss:"http://schuelervzblog.blogspot.com/feeds/posts/default",//for box
  theme:0,//theme
  layout:0,//0=normal, 1=breit
  userinfo:2,//0:nein;1:ja;2:mit bild
  userinfo2:"Name:+Letztes Update:+Schule:+Status:+Geschlecht:+Ich bin:+Lieblingsfach:+Hassfach:+Auf der Suche nach:+Hobbies:+Clubs Vereine:",//names for the Elements, serperated by +
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




/********************************** Bei Gruppe immer Ja ***************************/
if(location.href.indexOf("groupjoin.php?del=1")>-1 && settings["hide_group_quit"] && document.getElementById("dialog"))
{
  //klicke auf button im Dialog
  inputs=document.getElementById("dialog").getElementsByTagName("input")
  for(var i=0;i<inputs.length;i++)
    if(inputs[i].value=="Gruppe verlassen"){
      inputs[i].click();
      alert();abcdefg()//make an error
    }
}
if(location.href.indexOf("groupjoin.php")>-1 && settings["hide_group_accept"] && document.getElementById("dialog"))
{
  //klicke auf button im Dialog
  inputs=document.getElementById("dialog").getElementsByTagName("input")
  for(var i=0;i<inputs.length;i++)
    if(inputs[i].value=="Mitglied werden"){
      inputs[i].click();
      abcdefg()//make an error
    }
}

if(location.href.indexOf("gru.php")>-1 && settings["hide_gru_accept"] && document.getElementById("dialog"))
{
  //klicke auf button im Dialog
  inputs=document.getElementById("dialog").getElementsByTagName("input")
  for(var i=0;i<inputs.length;i++)
    if(inputs[i].value.indexOf("gruscheln")>0){
      inputs[i].click();
      abcdefg()//make an error
    }
}
if(location.href.indexOf("groupinvite.php?ids=")>-1 && settings["hide_invite_accept"] && document.getElementById("dialog")){
  inputs=document.getElementById("dialog").getElementsByTagName("input")
  for(var i=0;i<inputs.length;i++)
    if(inputs[i].value.indexOf("einladen")>-1){
      inputs[i].click();
      alert();abcdefg()//make an error
    }
}

/*************globale, nicht durch Optionen beeinflusste Optionen**************/

//werbung
css+=".yahoo_leftnav,#yahoo_powered_by_yahoo,#yahoo_hotspot_anzeige,.yahoo_prop,.yahoo_clear,.yahoo_box,#yahoo_hotspot_groups,#yahoo_hotspot_websearch,.yahoo_sponsored_links, #zaehlpixel + div, #FLASH_AD, #allIn > div[style*='margin: 0px 7px 0px 770px'], #allIn > div[style*='width: 140px;'], .staticContent{display:none;}";
document.getElementById("allIn").style.width="";
if(location.href.indexOf("home.php")>-1){
  /*var h2s=document.getElementsByTagName("h2");
  for(var i=0;i<h2s.length;i++){
    if(h2s[i].innerHTML.indexOf("Anzeige")<0)
      continue;
    var next=h2s[i]
    do{
      if(next.style)
        next.style.display="none";
      var next=next.nextSibling;
    }while(next && next.tagName!="H2")
  }*/
}
//  document.getElementById("content").innerHTML = document.getElementById("content").innerHTML .replace(/<h2>.*?Anzeige.*?<\/h2>[\\r\\n\\s]*<table(.*[\\n\\r]+)*?.*<\/table>/,"") .replace(/<h2>.*?Anzeige.*?<\/h2>.*/g,"");



/*********************************erweiterte Sidebar*********************************/

if(document.getElementById("leftbar"))
  var leftbar=document.getElementById("leftbar")
else{
  var elms=document.getElementsByTagName("div")
  for( var i=0;i<elms.length;i++)
    if(elms[i].getAttribute("class")=="leftbar"){
      var leftbar=elms[i];
      break;
    }
}
if(leftbar){
  //aktuelle Seite hervorheben (class=active)
  var elms=leftbar.getElementsByTagName("a")
  var tosearch=location.href;
  for(var i=0;i<elms.length;i++)
    if(elms[i].href==tosearch)
      elms[i].setAttribute("class",elms[i].getAttribute("class")+" active");



  //favoriten
  var elms=leftbar.getElementsByTagName("div")
  for(var i=0;i<elms.length;i++)
    if(elms[i].getAttribute("class")=="leftnav"){
      //add favorites
      for(var j=0;  j<favs.length; j++)
        elms[i].innerHTML+=(favs[j][0]==location.href)
              ?"<a href='" + favs[j][0] + "' class=\"active\">" + favs[j][1] + "</a>"
              :"<a href='" + favs[j][0] + "'>" + favs[j][1] + "</a>";

      if(elms[i].innerHTML.search(/class=\"[^\"]*active[^\"]*\"/)<0){
        /*var func=" var title=prompt('Gib eine Namen an:','"+document.title.replace("Schülerverzeichnis | ", '')+"'); if(!title) return; this.style.float='none';this.style.display=\"none\"; var arr=eval('"+favs.toSource()+"'); arr.push(['"+location.href+"',title]); document.cookie='favs='+encodeURIComponent(arr.toSource())+'; expires=Mon, 31 Dec 2012 12:00:00 GMT';this.parentNode.innerHTML+='<a href=\"#\" class=\"active\">'+title+'</a>'; alert('Zu Favoriten Hinzugefügt!')"
        elms[i].innerHTML+="<font style=\"float:left\" title=\"\" onclick=\""+func.replace(/\"/g,"&quot;")+"\">Zu Favoriten hinzufügen</font>"*/
        var font=document.createElement("font")
        font.title="Hier klicken um die aktuelle Seite dem Menü hinzuzufügen";
        font.innerHTML="Zu Favoriten hinzufügen"
        elms[i].appendChild(font);
        font.addEventListener("click",function(evt){
          var title=prompt('Gib eine Namen an:', document.title.replace("Schülerverzeichnis | ", ''));
          if(!title) return;
          this.style.display="none";
          favs.push([location.href,title])
          GM_setValue("favs",favs.toSource())
          this.parentNode.innerHTML+='<a href="#" class="active">'+title+'</a>';
          alert('Zu Favoriten Hinzugefügt!')
        },false)
      }

      //pos der announcetb anpassen
      //css+=".leftmess, #leftmess {padding-top:"+(elms[i].offsetHeight-105)+"px}"
      css+=".leftmess, #leftmess {clear:left;padding-top:10px}"
      break;
    }
}

//nachrichten
var now=new Date();
var as=document.getElementsByTagName("a")
for(var i=0;i<as.length;i++)
  if(as[i].href.indexOf("mailbox.php")>-1){
    as[i].innerHTML="Nachrichten <b id='msgcount'></b>"
    break;
  }
var request=new XMLHttpRequest();
request.open("GET","http://www.schuelervz.net/mailbox.php",true);
request.onreadystatechange=function(req){
  if (request.readyState != 4 || request.status != 200)
    return;
  var start=request.responseText.indexOf("<table id=\"messagetable\"");
  var end  =request.responseText.substr(start).indexOf("</table>");
  var text =request.responseText.substr(start,end)
  var matches=text.match(/\">neu<\/span>/g);//if nothing was found : null
  var lastmsgcount=matches ? matches.length : 0;
  if(lastmsgcount>0)
    document.getElementById("msgcount").innerHTML="("+lastmsgcount+")"
};
request.send(null);




/*********************************  box  *********************************/

/*if(parseInt(settings["box"])==0)
  document.getElementsByTagName("table")[0].style.display="none"
else if(parseInt(settings["box"])==2)
{
  document.getElementsByTagName("table")[0].style.display="block"
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.hahaha.de/witze/witzdestages.xml',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
      var arr=responseDetails.responseText.split("</item>")
      do {
      var i=Math.floor(Math.random()*arr.length)
      var content=arr[i].substr(arr[i].indexOf("<item "))
      } while(content.indexOf("<description>")<0)
      document.getElementsByTagName("table")[0].innerHTML="<b>ein Witz:</b><br /> <br />"+content.substring(content.indexOf("<description>")+13,content.indexOf("</description>"))
    }
  });
}
else if(parseInt(settings["box"])==3 && settings["rss"].substr(0,7)=="http://")
{
  document.getElementsByTagName("table")[0].style.display="block"
  document.getElementsByTagName("table")[0].innerHTML="lade RSS-Feed ..."
  GM_xmlhttpRequest({
    method: 'GET',
    url: settings["rss"]+"",
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
      var elm=document.createElement("div");
      elm.innerHTML=responseDetails.responseText.replace(/(\<\/?)link\>/g,"$1shouldbelink>");//Firefox macht probleme mit <link>-Tags
      var nodes=elm.getElementsByTagName("item");
      if(!nodes||nodes.length<1)
        return;
      document.getElementsByTagName("table")[0].innerHTML="<p onclick=\"window.open('" +nodes[0].getElementsByTagName("shouldbelink")[0].innerHTML+ "','rssfeed')\" style=\"font-weight:bold;cursor:pointer;\">" + nodes[0].getElementsByTagName("title")[0].innerHTML + "</a></p><p>" +nodes[0].getElementsByTagName("description")[0].innerHTML+ "</p>";
    }
  });
}
/************************************************************ variable breite ***************************************************/

/*if(parseInt(settings["layout"])>0){
  css+="html{height:100%;overflow:hidden}";
  css+="body{height:100%;overflow:hidden}";
  css+="#allIn         { padding: 0; margin: 0; height:100%; width: auto; right:5px; left:5px;bottom:0px;top:0px;position: absolute; overflow:hidden}";

  css+="#leftlogo2{margin-bottom:8px;top:0}";

  css+="#pagefooter{ position:fixed;bottom:0;width:100%;left:0}";
  css+="#content, #contentx{ position:fixed; bottom:25px; top:64px; left:137px; right:5px; overflow:auto; width:auto !important;; height:auto; margin:0; padding-top:30px !important; padding-bottom:40px !important;}";
  if(document.getElementById("content"))
    document.getElementById("content").style.position="fixed"
  if(document.getElementById("contentx")){
    document.getElementById("contentx").style.position="fixed"
    document.getElementById("contentx").style.width="auto"
  }
  css+="#headline{position:fixed;top:40px;right:5px;left:137px}";
  css+="#subheadline2 h2{display:inline;}  #subheadline2 br{display:none;}";

//Bild oben
  document.getElementById("homelink").innerHTML="<B>SCHÜLER</B>VERZEICHNIS"
  css+="#homelink{color:white;padding:10px 0 0 20px;font-size:18px;left:0;}";
  css+="#topheader{position:absolute;left:132px;right:0;width:auto;background-repeat:repeat-x;}";
  if(settings["farbe"]==2)
    css+="#topheader{background-image:url("+imgprefix+"top.png);}";
  css+="#topnav, .topnav{top:0;left:auto;right:0px;padding-right:20px;background-repeat:no-repeat;background-position:right top;}";
  if(settings["farbe"]==2)
    css+="#topnav, .topnav{background-image:url("+imgprefix+"top2.png);}";

  css+="#profileganzbreit{ position:absolute;left:220px;right:10px; margin:0;float:none;width:auto !important;}";
  if(location.href.indexOf("group.php")>-1)
    css+="#profileganzbreit{ left:10px;right:220px; margin:0;}";
  if(document.getElementById("friendtable"))
    document.getElementById("friendtable").style.width="auto";
  //oveflow von content
  var elm=document.createElement("div")
  elm.id="topoverflow"
  document.getElementsByTagName("body")[0].appendChild(elm)
  css+="#topoverflow{ position:fixed;left:138px;top:64px;right:21px;height:10px;padding:7px;width:auto;background-position:top;background-repeat:repeat-x;}";

  var elm=document.createElement("div")
  elm.id="bottomoverflow"
  document.getElementsByTagName("body")[0].appendChild(elm)
  css+="#bottomoverflow{ position:fixed;left:138px;bottom:25px;right:21px;height:10px;padding:7px;width:auto;background-position:bottom;background-repeat:repeat-x;}";

  //Kasten
  css+=".announcetb{ padding:2px;overflow:auto;min-height:100px;max-height:"+(window.innerHeight-290)+"px}";

  if(document.getElementById("subheadline2"))
    css+="#content,#contentx,#topoverflow { top:98px;} #subheadline2{ position:fixed;left:137px;top:64px;right:5px;height:20px;padding:7px;width:auto;}";

  //fotoalben
//  css+=".myalbumspreviewcontainer {float:none;width:auto;margin:0 5px;}  .myalbumpreview {float:none;width:auto;override:auto;margin:8px;padding:5px;}";
  css+=".myalbumspreviewcontainer {float:left;width:auto;margin:0 5px;} .albumphotocount {display:block}";
}


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
  css         : "#topHeader {margin-left:-132px;padding-left:132px;background:no-repeat bottom right url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvgAAAAoCAYAAACLg47lAAAABHNCSVQICAgIfAhkiAAACAZJREFU eJzt3X+MFGcdx/HP7O79oAfLQUksUlJKawkYDQV7cNUYgdUYbRVISGPb8xItBXLlD020TWlMSAye mmhiK9qW2qKtwZwt/qVWj9OY1mIFSmLInVCw/HGeqHCw/NrbnXke/5id3Znd2fb2MKW7vF/J3S43 8zzzzPLPZ77zzLOOJCugKJlM6kf3z9HGVXOu9lAAAABQj/Fjcr6SlyMCPkJe2HiD7u2eJTmJqz0U AAAA1OvsMQI+osyzS672EAAAAHAFUld7AHhvsVzuAQAANDQCPiqQ8AEAABoZAR8RVPABAAAaGwEf EZaEDwAA0NAI+Igg4AMAADQ2Aj4iiPcAAACNjYCPCCr4AAAAjY2AjwgCPgAAQGMj4COCfA8AANDY CPiIoIIPAADQ2Aj4U/Dw525U/xcWlP9gjTbtOq6nhk5Nuo/fP7pEmQ+mJRnJeJL19MlvH9fgkfP+ 9q/frMyS6yRrqn9kQ/8OvQ/15f8YnfiPq1u+mZ/0uAj4AAAAjY2APxXWSKag0poz1koy9fVhCpKX K4Zzr/wqKbPkOmUWpSS3YrtsRaC3MRcAnh/yZWWtZEx9gZ2ADwAA0NgI+FNhjWRclQK3rGTqDPhe QfLykWp7MAF+/KKrRwZOlSfEB2E+ckEROnZxn4XXO9q4MhHZbOscFvEeAACgsRHwpyIc8EtBu94k 7UkmX+zLK7b3+zh4Mq+DJyc/rSaw5raEHljhB/xSob/OxE4FHwAAoLER8KfEStaNVtjrDcbGi86X N1Poo8LyeY5/IyEI+FY6fbG+Pgj4AAAAje1dC/jzZqW07e45mtGWUM/T/3y3Dls+fmdC2z7doRlt Us/u81fWWanqHq7e11vBdyWTiM6dv4IJMstudPzqfXEYQcB/8W/1jouADwAA0MjeMeCnpyVqbste nnx4XDy3VV0L2jU8NjHpNv9Pi29IqWtBSsNjhSvvzJpiBT+oulstn1/ntZJxJc+JPmAbmjD/cKZF /XelSvPvg8AuVbxW/D14FGD8kvTYb10989f6Av5Mb6y+8wAAAMB7SmwqTbcn9OhnO7V4bovmdSbL Gxyn9DZ72WjtE6c09LW51VXf0n6OXj+R0yMvnpH/IGpei9/n6MBj748dzEuHLmrHr88ps7hd/es7 NTyWV89PzlTtt3V1h3pXdujxoQvaezin/nXT1XVT+FRCT5daq2zOaMfLueKcd6/iXB31392irpsS ocSsSF/ZnLT2mYL29bVIkpKJSzoz3qLZ6bZiOJce/GibFl4/W5teOKcT/40eI5YpSF4Q7IPpOv6B H+xO6FufcWSNVw72Vnp6v9GJ0+XBVX7stvjrjVGroeN1Vu4BAADQFGID/rrb25VZlNLgSE49u+Kn s2RzRun2hL8ajKxWf++0srloqNy6qkO93R16aFWHXn8rL3l5Df+roJ5nz1X11792utZ/uFWjZ9o1 etb4S0R6bvyoPU9yL0vWVW9XSl3zPe3+c06P/6n6wdShvtbis7BGcvOyXjQVf/EOR3fMt3puf15P vFIdivdtaSnl/aBgv+aHE8pO/FsblrVr131ppaf5GzO3OTq+vVObfn5BT736DncqjFuehx9U6Iub Oqc5wXVDKeB/9w+etv1mEhcOAAAAuKbVqOBLskbpNqve7vbYqeHZnNHewxPR1WQqDI/5S0GmW4vT T0yhZmgfPVOQjJRuNRoNrzATx7r+lHfr+Yd1pWyuxsWAtaXRmZhhBqvNZHPxzcNtKlfCHDiU0+DI hAYf6tCy+SkFn8OT97Rqw9KkNu3J6cTpGudgXMk45RVvKlbBNNGbEBq/FN8NAAAAEBYb8F96I6fh sSC4F4Xe9n9+miSr0XE3+oVPFQZH8vrIiF9VzyxKltd9j2NdyQ1Wp5HkFaqq7aVdrZHxPFlb/jKn vjuT6rszWRpruOW+Y8bfz6sO6db4f9vSndSW7qTiDL3pN4pb6n78ktXy71zQhqUpPXlPi2ZN8weQ udXqwFdbtGmgoIHD1Q2ttTLhgB/epThWfz9FqvsAAADA24kN+KNnjc7n4h9GndHmlJeIDKry1mre TEfZ3NvEUGsl48rW+GZVa62MLU9VMUaa3lqjq+CLXI1f6TZG2vmqp58erD3vfPWtCRkjdbRUbzOe tPM1T88fqt1+RptKNyrizmDgsKvBv7v6RW9Kaz7gP5g8s13a05PSnvtDbULtvfBKm6GHZU0x4NvS /lbbMwltzyTKVf7Sr+qHb0vHKL7+8R9W656vcYcDAAAATSU24G/9eEq9XamYh06Lb7yC/nLSaPCo 0Y7f5dX3saR235uUFFMBt9LgUaN9b1o/tNaasWLKFfZ9R42emyP1LE/qta0tsSs3ep4fhEdO+e02 r0xq84pkeJQRXxpw9bMDnu67PaFXthRP25G+8bKRsVabVyS0eUVCcmIaW+nLv/RkalycBMYvS5/6 sasHViS0c335ow2PP24lnOBORLAGvTVWrmerVsip7Kvyv6aU70NBX5J+dYQHbgEAAK4VjmrM/ki3 F9/UyLTZq7PaZcO4ebaj9R8KLTFateJNOZEHgXzvEau3xq0+sdDR0rlOpF3Fwj6xbI1tP9g/+YBv v1/jtgkAAAAaQs2Aj2sTAR8AAKCx1f4WKwAAAAANh4APAAAANBECPgAAANBECPgAAABAEyHgAwAA AE2EgA8AAAA0EQI+AAAA0EQI+AAAAEATIeADAAAATYSADwAAADQRAj4AAADQRAj4AAAAQBP5H1SF CummarPvAAAAAElFTkSuQmCC')} a[href*=\"group.php\"]:before,a[href*=\"groups.php\"]:before,a[href*=\"friends.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_group.png')\" \";} a[href*=\"home.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_home.png')\" \";} a[href*=\"privacy.php\"]:before,a[href*=\"account.php\"]:before,a[href*=\"groupopts.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_config.png')\" \";} a[href*=\"info.php\"]:before,a[href*=\"groupadmin.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_config.png')\" \";} a[href*=\"mailbox.php\"]:before,a[href*=\"message.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_message.png')\" \";} a[href*=\"addfriend.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_add.png')\" \";} a[href*=\"addfriend.php\"][href*=\"del=1\"]:before,a[href*=\"delete_album\"]:before{content:url('"+imgprefix+"darkgreen_icon_bomb.png')\" \";} a[href*=\"photos.php\"]:before,a[href*=\"album.php\"]:before,a[href*=\"groupadmin.php?page=pic\"]:before{content:url('"+imgprefix+"darkgreen_icon_image.png')\" \";} .leftnav a[href*=\"basicinfo.php\"]:before,.PageTabs a:before, a.hasimage:before{content:\"\" !important;} a[href*=\"groups.php?\"]:before,a[href*=\"search.php\"]:before{content:url('"+imgprefix+"darkgreen_icon_search.png')\" \";}",
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

/************************************************ hover-Effekt für Benutzer ***************************************************/

if(settings["userinfo"]>0){
  var elm=document.createElement("table")
  elm.id="userinfo"
  elm.setAttribute("show",settings["userinfo2"])
  elm.style.display     ="none";
  elm.style.width       ="400px";
  elm.style.background  ="#efff65";
  elm.style.position    ="absolute";
  elm.style.border      ="2px solid black";
  elm.style.color       ="black";
  elm.style.opacity     =0.9;
  elm.innerHTML="<tr> <td style=\"vertical-align:top;\"><img id=\"userinfo_img\" style=\"width:130px;margin:10px\"></td> <td><table id=\"userinfo_table\"></table></td> </tr>"
  document.getElementsByTagName("body")[0].appendChild(elm);

  document.addEventListener("mousemove", function(evt){
    var elm=document.getElementById("userinfo")
    elm.style.left=(evt.pageX>window.innerWidth-409)               ? (evt.pageX-409)+"px"              : (evt.pageX+5)+"px";//evt.clientX
    if(elm.offsetHeight*2>window.innerHeight)
      elm.style.top="5px"
    else
      elm.style.top =(evt.pageY+elm.offsetHeight>window.innerHeight) ? (evt.pageY-elm.offsetHeight)+"px" : evt.pageY+"px";//evt.clientY
  },true)

  if(settings["userinfo"]<2)
    document.getElementById("userinfo_img").style.display="none"

  if(settings["userinfokey"]>1)
    document.addEventListener("keydown",function(evt){
          if(evt.keyCode!=18)
            return;
          var event = document.createEvent("MouseEvents");
          event.initMouseEvent("mouseover", true, true, window,  0, 0, 0,
                     parseInt(document.getElementById("userinfo").style.left),
                     parseInt(document.getElementById("userinfo").style.top),
                     (event.keyCode==17), (event.keyCode==18), (event.keyCode==16), false, 0, null);
        },true)

  function setUserElement(elm,ids){
    elm.setAttribute("user_ids",ids);
    function startRequest(evt){
      if( (settings["userinfokey"]==1 && !evt.ctrlKey) || (settings["userinfokey"]==2 && !evt.altKey) || (settings["userinfokey"]==3 && !evt.shiftKey) )
        return;
      document.getElementById("userinfo").style.display="block";
      if(document.getElementById("userinfo").getAttribute("activeid")==evt.currentTarget.getAttribute("user_ids"))
        return;
      document.getElementById("userinfo_table").innerHTML="<tr><td>&nbsp;<br>Lade...</td></tr>";
      if(document.getElementById("userinfo_img").style.display!="none")
        document.getElementById("userinfo_img").src="http://static.ak.schuelervz.net/images/loading.gif";
      document.getElementById("userinfo").setAttribute("activeid",evt.currentTarget.getAttribute("user_ids"));
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.schuelervz.net/profile.php?ids='+evt.currentTarget.getAttribute("user_ids"),
        headers: {
          //'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'User-agent': 'Opera/8.51 (Windows NT 5.1; U; en)',
          'Accept': 'text/html'
        },
        onload: function(responseDetails) {//get User data
          var all=responseDetails.responseText
          if(all.indexOf("<a href='profile.php?ids="+document.getElementById("userinfo").getAttribute("activeid")+"'><img src=")
               !=all.search(/<a href='profile.php\?ids=[^']+'><img src=/))
            return;//zu spät!, benutzer hat schon neues Profil angefordert
          var toshow=document.getElementById("userinfo").getAttribute("show")+"";

          ///image
          if(document.getElementById("userinfo_img").style.display!="none"){
            var img=all.match(/'><img src="[^"]+/)+""
            if(img!="")
              document.getElementById("userinfo_img").src=img.substring(12);
          }

          ///data
          var html=all.substr(all.indexOf("<div class=\"slimcolbox\">"),all.indexOf("<input id=\"ajax_profile_ids\""))
          var tmp=document.createElement("body") ///will never be displayed
          tmp.innerHTML=html;
          var tables=tmp.getElementsByTagName("table");
          var str=""
          for (var i=0;i<tables.length;i++){
            if(tables[i].getAttribute("class")!="profileTable")
              continue;
            var lines=tables[i].getElementsByTagName("tr");
            for (var j=0;j<lines.length;j++){
              var tds=lines[j].getElementsByTagName("td");
              if(toshow.indexOf(tds[0].innerHTML.replace(",",""))>-1)
                str+="<tr><td>"+tds[0].innerHTML+"</td> <td>"+tds[1].innerHTML.replace(/<[^>]+>/g,"")+"</td></tr>";
            }
          }
          document.getElementById("userinfo_table").innerHTML=str;
        }
      });
    }
    elm.addEventListener("mouseover",startRequest , true);
    elm.title=ids;
    elm.addEventListener("mouseout", function(evt){//spricht auch bei KIndelementen an!
      document.getElementById("userinfo").style.display="none";
    },false);
  }


  if(document.getElementById("group_members")){
    var elms=document.getElementById("group_members").getElementsByTagName("a");
    for (var i=0;i<elms.length;i++){
      if(!elms[i].hasAttribute("href"))
        continue;
      if(elms[i].childNodes[0].tagName&&elms[i].childNodes[0].tagName.toLowerCase()=="img")
        continue;

      var tdelm=elms[i].parentNode.parentNode.parentNode.parentNode.parentNode
      setUserElement(tdelm,elms[i].getAttribute("href").replace("profile.php?ids=",""));
    }
  }
  //Profielseite
  if(location.href.indexOf("profile.php")>-1){
    var tables=document.getElementById("slimcol").getElementsByTagName("table");
    for(var i=0;i<tables.length;i++){
      if(tables[i].getAttribute("class")!="PrfFriendTbl")
        continue;
      var tables2=tables[i].getElementsByTagName("table");
      GM_log(ids+";"+tables[i])
      for(var j=0;j<tables2.length;j++){
        var ids=tables2[j].getElementsByTagName("a")[0].getAttribute("href").replace("profile.php?ids=","");
        GM_log(ids+";"+tables2[j])
        setUserElement(tables2[j],ids);
      }
    }
    //pinnwand
    if(document.getElementById("innerPinn")){//manche Leute verstecken ihre Pinnwand vor nicht-Freunden
      var links=document.getElementById("innerPinn").getElementsByTagName("a");
      for(var i=0;i<links.length;i++){
        if(links[i].getAttribute("href").indexOf("profile.php")<0)
          continue;
          var ids=links[i].getAttribute("href").replace("profile.php?ids=","");
          setUserElement(links[i],ids);
      }
    }
  }
  else if(location.href.indexOf("home.php")>-1){
    var imgs=document.getElementsByTagName("img")
    for(var i=0;i<imgs.length;i++){
      if( !imgs[i].parentNode.hasAttribute("href") || imgs[i].parentNode.getAttribute("href").indexOf("profile.php")<0 )
        continue;
      var ids=imgs[i].parentNode.getAttribute("href").replace("profile.php?ids=","");
      setUserElement(imgs[i].parentNode.parentNode.parentNode,ids);
    }
  }
  else if(location.href.indexOf("group_forum_comments.php")>-1||location.href.indexOf("group_forum_threads.php")>-1){
    var links=document.getElementById("friendtables").getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
      if(links[i].getAttribute("href").indexOf("profile.php")<0)
        continue;
        var ids=links[i].getAttribute("href").replace("profile.php?ids=","");
        setUserElement(links[i],ids);
    }
  }
}


/******************************** verbesserte Einstellungen bei fließtext (Links, ...)**********************/
function markup(text){
  //delete all \n
  text=text.replace(/[\r\n]/g, " ").replace(/<br>/g, "\n");

  //hinweis
  text=text.replace(/\[hidden\][\w\W]+?\[\/hidden\]/igm,"")

  //nbs und nws
  text=text.replace(/\[nb\]([\w\W]*?)\[\/nb\]/gi,function(a,b){return b.replace(/[\r\n]/g,"")})
  text=text.replace(/\[nw\]([\w\W]*?)\[\/nw\]/gi,function(a,b){return b.replace(/\s/g,"")})

  //listen, BBcode
  var lists=text.match(/\[list\](.*\n)*?.*?\[\/list\]/g)
  if(lists)
    for(var i=0;i<lists.length;i++)//jeweils erstes [*] abschneiden
      text=text.replace(lists[i], "<li> "+lists[i].substring( lists[i].indexOf("[*]")+3, lists[i].length-7 ).replace(/\[\*\]/g," </li><li> ")+" </li>")

  //Zitate
  text=text.replace(/\[quote\]([\w\W]+?)\[\/quote\]/igm,"<div class=\"bb_quoteh\">Zitat:</div><div class=\"bb_quote\">$1</div>")
  text=text.replace(/\[quote\s([^\]]+)\]([\d\D]+?)\[\/quote\]/igm,"<div class=\"bb_quoteh\">$1:</div><div class=\"bb_quote\">$2</div>")

  //hervorhebungen, BBcode
  text=text.replace(/\[(\/?[bius])\]/g,"<$1>")
  text=text.replace(/\[color=\"?([^\]\"]+)\"?\](.*?)\[\/color\]/gim,"<font color=\"$1\">$2</font>")
  //bilder
  text=text.replace(/\[img\]([^\"]+?)\[\/img\]/ig, "<img src=\"$1\" class=\"bbcodeimg\">")
  //links
  text=text.replace(/\[(https?:\/\/[^\]\|"]+)\|([^\]]+)\]/g,"<a href=\"$1\">$2</a>")
  text=text.replace(/\[(https?:\/\/[^\]\s"]+)\s([^\]]+)\]/g,"<a href=\"$1\">$2</a>")
  //kurzformen
  text=text.replace(/\[g:(\w+)\s([^\]]+)\]/g,        "<a href=\"group.php?ids=$1\">$2</a>")//gruppe
  text=text.replace(/\[u:(\w+)\s([^\]]+)\]/g,        "<a href=\"profile.php?ids=$1\">$2</a>")//Benutzer
  text=text.replace(/\[d:(\w+):(\w+)\s([^\]]+)\]/g,  "<a href=\"group_forum_comments.php?data%5Bgroup_ids%5D=$1&data%5Bthread_ids%5D=$2\">$3</a>")//diskussion
  text=text.replace(/\[a:(\w+)\s([^\]]+)\]/g,  "<a href=\"showalbum.php?id=$1\">$2</a>")//album
  text=text.replace(/\[p:(\w+):(\w+)\s([^\]]+)\]/g,  "<a href=\"showalbum.php?id=$1&pid=$2\">$3</a>")//Photo
  text=text.replace(/([^"])(https?:\/\/[^\s"\|\]]+)/g,"$1<a href=\"$2\">$2</a>")

  text=text.replace(/\[\{\]/g,                       "&lt;")//<
  text=text.replace(/\[\}\]/g,                       "&gt;")//>
  text=text.replace(/\n/g, "<br>")
  return text;
}

css+=(".bbcodeimg {max-width:300px;max-height:300px;}")


if(location.href.indexOf("profile.php")>-1)
{
  if(document.getElementById("profile_left_opacity"))
    document.getElementById("profile_left_opacity").innerHTML=markup(document.getElementById("profile_left_opacity").innerHTML.replace(/(https?:\/\/[^\s]+)\s([^\s]+(\.[\d\w]{1,5}|\/))/g,"$1$2"))
}
else if(location.href.indexOf("group.php")>-1){
  var elm = document.evaluate( '//div[@class="slimcolbox"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue;// /html/body/div[2]/div[3]/div[2]/div/div/div[2]
  if(elm)
    elm.innerHTML=markup(elm.innerHTML)
  var elm = document.evaluate( '//div[@id="slimcol"]/div[@class="slimcolbox"][2]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null ).singleNodeValue;
  if(elm)
    elm.innerHTML=markup(elm.innerHTML)
}
else if(location.href.indexOf("group_forum_comments.php")>-1){
  var elms=document.getElementById("friendtable").getElementsByTagName("div")
  for(var i=0;i<elms.length;i++){
    if(!elms[i].id || elms[i].id.substr(0,8)!="comments")
      continue;
    var start=elms[i].innerHTML.lastIndexOf("type=\"hidden\">")+14
    elms[i].innerHTML=elms[i].innerHTML.substr(0,start)+"<div>"+elms[i].innerHTML.substr(start)+"</div>"
    var elm=elms[i].getElementsByTagName("div")[0]
    elm.innerHTML=markup(elm.innerHTML)
  }
}




/******************************** Backup-Funktion für Gruppen **************************************/
//noch nicht fertig

//aber das: bearbeiten von beschreibung auf der Gruppenseite

if(location.href.indexOf("group.php")>-1 && document.getElementById("slimcol").innerHTML.indexOf("groupadmin.php?ids=")>-1)
{
  //kleines extra: Bearbeiten-button bei Beschreibung+Aktuelles
  var h2s=document.getElementsByTagName("h2");
  var hasannounce=false;
  for(var i=0;i<h2s.length;i++){
    if(h2s[i].innerHTML.indexOf("Beschreibung")>-1){
      var elm=document.createElement("div");
      elm.innerHTML="<a href=\"javascript:editgroupinfo('descr')\">[ bearbeiten ]</a>";
      elm.className="edit"
      elm.id="editdescrbutton"
      h2s[i].appendChild(elm)
    }
    else if(h2s[i].innerHTML.indexOf("Infos")>-1){
      var elm=document.createElement("div");
      elm.innerHTML="<a href=\"javascript:editgroupinfo('actual')\">[ bearbeiten ]</a>";
      elm.className="edit"
      elm.id="editactualbutton"
      h2s[i].appendChild(elm)
      hasannounce=true
    }
  }
  if(!hasannounce){
    var div=document.createElement("div");
    div.className="secheader"
    div.innerHTML="<h2>Aktuelle Infos <div class='edit' id=\"editactualbutton\"><a href=\"javascript:editgroupinfo('actual')\">[ bearbeiten ]</a></div></h2>"
    document.getElementById("slimcol").appendChild(div)

    var div=document.createElement("div");
    div.className="slimcolbox"
    div.innerHTML=" "
    document.getElementById("slimcol").appendChild(div)

    var div=document.createElement("div");
    div.className="clear"
    document.getElementById("slimcol").appendChild(div)
  }

  unsafeWindow.editgroupinfo=function(type){//type="descr"|"actual"
    var elm=false;
    if(type=="descr"){
      var divs=document.getElementById("profileganzbreit").getElementsByTagName("div");
      for(var i=0;i<divs.length;i++)
        if(divs[i].innerHTML.indexOf("Beschreibung")){
          elm=divs[i+2]
          break;
        }
    }
    else if(type=="actual"){
      var divs=document.getElementById("slimcol").getElementsByTagName("div");
      var elm=divs[divs.length-2];//vorletzter div
      //todo: mit For-schleife auswählen

    }
    if(!elm)
      return false;
    //bearbeiten-Button ausblenden
    document.getElementById("edit"+type+"button").style.display="none";

    //form vorbereiten
    var form=document.createElement("form");
    form.name=type;
    var request=new XMLHttpRequest();
    request.open('GET', 'groupadmin.php?ids='+document.getElementById("group_ids").value, false);
    request.overrideMimeType("text/html")
    request.send(null);
    var start=request.responseText.indexOf("<form method=\"post\" action=\"groupadmin.php")
    var end  =request.responseText.substr(start).indexOf("</form>")+5
    var tmp=document.createElement("div");
    tmp.innerHTML=request.responseText.substr(start,end);
    var form_orginal=tmp.getElementsByTagName("form")[0];

    //Beibehalten:
    var fields= [ "save", "checkcode", "group_category", "homepage", "office", "visibility", "access" ]
    if(type=="descr")
      fields.push("announcement")
    else
      fields.push("description")
    for(var j=0;j<fields.length;j++){
      var input=document.createElement("input");
      input.name=fields[j];
      //alert(fields[i])
      input.value=form_orginal.elements.namedItem(fields[j]).value;
      input.type="hidden";
      form.appendChild(input);
    }


    var input=document.createElement("textarea");
    input.name=(type=="descr") ? "description" : "announcement";
    input.defaultValue=input.value=form_orginal.elements.namedItem(input.name).value;
    input.className="textarea";
    input.style.width=elm.offsetWidth-20+"px"
    input.style.height=elm.offsetHeight-25+"px"
    input.style.minHeight="100px";
    form.appendChild(input);

    var input=document.createElement("input");
    input.name="savex";
    input.value="Ändern";
    input.type="submit";
    input.className="inputsubmit";
    form.appendChild(input);

    var input=document.createElement("input");
    input.value="Doch nicht!";
    input.type="submit";
    input.className="inputsubmit";
    form.appendChild(input);
    input.addEventListener("click",function(evt){
      var form=evt.currentTarget.form;
      var elm=form.parentNode;
      if(form.name=="descr")
        var textarea=form.elements.namedItem("description")
      else
        var textarea=form.elements.namedItem("announcement")
      elm.innerHTML=textarea.defaultValue.replace(/\n/g,"<br>")+"<div class=\"clear\"></div>"
      document.getElementById("edit"+form.name+"button").style.display="";
      evt.preventDefault()
    },true)

    form.style.height=elm.offsetHeight+"px"
    form.style.width=elm.offsetWidth+"px"
    form.style.minHeight="125px";

    elm.innerHTML=""
    elm.appendChild(form)

    form.addEventListener("submit",function(evt){
      evt.preventDefault()
      var form=evt.currentTarget;
      var data="";
      for(var i=0;i<form.elements.length;i++)
        data+="&"+form.elements[i].name+"="+encodeURIComponent(form.elements[i].value)
      data=data.substr(1);
      var request=new XMLHttpRequest();
      request.open('POST', 'groupadmin.php?ids='+document.getElementById("group_ids").value, false);
      request.overrideMimeType("text/html")
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded") ;
      request.setRequestHeader("Content-length", data.length);
      request.send(data);
      var div=form.parentNode
      div.innerHTML=markup(form.elements.namedItem((form.name=="descr") ? "description" : "announcement").value.replace(/\n/g,"<br>"))+"<div class=\"clear\"></div>"
      document.getElementById("edit"+form.name+"button").style.display="";
      alert((request.status==200) ? "Geändert!" : "Es trat ein unbekannter Fehler auf\n\nDer Server meldet:\n"+request.statusText);
    },true)
  }
}//end if location.href.indexOf("group.php")






/************************************************************ Einstellungsseite ***************************************************/

if(location.href.indexOf("Privacy")>-1)///optionen
{


  /*var elm=document.createElement("form")
  elm.setAttribute("name","more_settings")
  //elm.setAttribute("onsubmit",'setCookie(); return false;');

  function setCookie(form){
    var elements=form.elements
    var vals=new Object();
    function getRadiobutton(elm){
      for(var i=0;i<elm.length;i++)
        if(elm[i].checked)
          return elm[i].value;
      return false;
    }
    function register(name,val){
      vals[name]=encodeURIComponent(val);
      return true;
    }
    register("box",getRadiobutton(elements["kasten"]));
    register("rss",elements["kasten_rss"].value);
    register("theme",getRadiobutton(elements["farbe"]));
    register("layout",getRadiobutton(elements["breit"]));
    if(elements["userinfo_show"].checked){
      register("userinfo",elements["userinfo_showimg"].checked ? 2 : 1);
      values=new Array();
      for(var i=0;i<elements["userinfo_showelms"].options.length;i++){
        if(elements["userinfo_showelms"].options[i].selected)
          values.push(elements["userinfo_showelms"].options[i].value)}
      register("userinfo2",values.join("+"));
      register("userinfokey",elements["userinfo_key"].selectedIndex);
    }
    else
      register("userinfo",0);

    for(var i=0;i<elements.length;i++){
      if(elements[i].name.substr(0,4)=="fav_")
        register(elements[i].name,elements[i].value);
    }

    if(elements["hide_group_accept"].checked)
      register("hide_group_accept","1")
    if(elements["hide_group_quit"].checked)
      register("hide_group_quit","1")
    if(elements["hide_gru_accept"].checked)
      register("hide_gru_accept","1")
    if(elements["hide_invite_accept"].checked)
      register("hide_invite_accept","1")

    var arr=new Array();
    for(i in vals)
      arr.push(i+"="+vals[i])

    //document.cookie="settings="+arr.join(",")+"; expires=Mon, 31 Dec 2012 12:00:00 GMT";
    GM_setValue("settings",arr.join(","));
    location.reload();
  }
  elm.addEventListener("submit",function(evt){
    setCookie(this);
    evt.preventDefault();
  },true)



  //var str='<script type="text/javascript">'+setCookie.toSource()+'</script>'
  var str='';
  str+='<div class="center" style="width: 450px; padding: 10px 0px 20px 0px;"><div class="secheader"><h2>Kasten</h2></div><div class="bluebox"><p><input name="kasten" type="radio" value="0" id="kasten_0"'
  if(parseInt(settings["box"])==0)
    str+=' checked'
  str+=' /><label for="kasten_0"> Nicht anzeigen </label><br /><input name="kasten" type="radio" value="1" id="kasten_1"'
  if(parseInt(settings["box"])==1)
    str+=' checked'
  str+=' /><label for="kasten_1"> Normal anzeigen </label><br /><input name="kasten" type="radio" value="2" id="kasten_2"'
  if(parseInt(settings["box"])==2)
    str+=' checked'
  str+=' /><label for="kasten_2"> Witz des Tages anzeigen </label><br /><input name="kasten" type="radio" value="3" id="kasten_3"'
  if(parseInt(settings["box"])==3)
    str+=' checked'
  str+=' /><label for="kasten_3" id="kasten_3_label"> Rss-Feed anzeigen: </label><input name="kasten_rss" id="kasten_rss" type="text" value="'+settings["rss"]+'" style="width:400px;">'
  str+='</p></div></div><br>'



  //Farbe
  /*not finished yet
  str+='<div class="center" style="width: 450px; padding: 10px 0px 20px 0px;"><div class="secheader"><h2>Farben</h2></div><div class="bluebox"><p>'
  str+='<script>function getColor(code){ code=code.replace(" ",""); var color=new Array(0,0,0); var hexcodes=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]; if(code.substr(0,1)=="#"){ code=code.toLowerCase(); if(code.length==4) for (var i=0;i<3;i++){ for (j=0; j <= 16; j++) { if (code.substr(i+1, 1) == hexcodes[j]) { color[i]=j*j; } } } else if(code.length==7){ } } return color; }</script>'
  str+='<input type="text" onkeyup="getColor(this.value)">'
  str+='</p></div></div>'* /



  str+='<div class="center" style="width: 450px;"><div class="secheader"><h2>Farben</h2></div><div class="bluebox"><p>'
  if(parseInt(settings["theme"])==settings["theme"])
    str+= '<input name="farbe" type="radio" value="'+i+'" id="design_'+i+'" checked /><label for="design_'+i+'"/>normal</label><br>';
  else
    str+= '<input name="farbe" type="radio" value="'+i+'" id="design_'+i+'" /><label for="design_'+i+'"/>normal</label><br>' ;
  css+="div > .abc {display:none;float:right;max-width:150px;max-height:100px} div:hover > .abc {display:inherit}";
  for(var i in styles){
    str+='<div style="margin:0;padding:0"><img class="abc" src="'+styles[i].image+'"> <input name="farbe" type="radio" value="'+i+'" id="design_'+i+'"';
    if(settings["theme"]==i)
      str+='  checked';
    str+='/><label for="design_'+i+'">'+styles[i].name+' ('+styles[i].description+')</label></div>' ;
  }

  str+='</p><p>Wenn du noch Ideen hast, schick sie mir. Alle Styles sind noch Verbesserungswürdig ;-).<br>Wenn du einen Style entworfen hast oder Entwerfen willst, melde dich auch bei mir...</p></div></div><br>'

  //Layout
  str+='<div class="center" style="width: 450px;"><div class="secheader"><h2>Layout</h2></div><div class="bluebox">'
  str+='<p><input name="breit" type="radio" value="0" id="breit_0"'
  if(parseInt(settings["layout"])!=1)
    str+=' checked'
  str+=' /><label for="breit_0"/> Normal </label><br /><input name="breit" type="radio" value="1" id="breit_1"'
  if(parseInt(settings["layout"])==1)
    str+=' checked'
  str+=' /><label for="breit_1"/> Volle Breite. Achtung! Es kann zu Darstellungsproblemen kommen!</label>'
  str+='</p></div></div><br>'


  //Benutzerinfo, 2 Felder: 1. Feld:0=nicht anzeigen;1=ohne Bild;2=mit Bild
  str+='<div class="center" style="width: 450px;"><div class="secheader"><h2>Benutzerinformationen</h2></div><div class="bluebox">'
  str+='<p><input name="userinfo_show" type="checkbox" id="userinfo_show" onclick="document.getElementById(\'userinfo_div\').style.color=(this.checked)?\'\':\'gray\'" '
  if(settings["userinfo"]>0)
    str+=' checked'
  str+='><label for="userinfo_show">Benutzerinformationen beim Bewegen der Maus über einem Benutzer Anzeigen</label></p>'
  str+='<div id="userinfo_div" style="margin-left:20px;'
  if(settings["userinfo"]<1)
    str+='color:gray;'
  str+='">'
  str+='<p><input name="userinfo_showimg" type="checkbox" id="userinfo_showimg"'
  if(settings["userinfo"]>1)
    str+=' checked'
  str+='><label for="userinfo_showimg"> Bild Anzeigen</label></p>'
  str+='<p><label for="userinfo_key"> Nur Anzeigen wenn folgende Taste Gedrückt wird:</label> <select name="userinfo_key"id="userinfo_key">'
  str+=((settings["userinfokey"]==0)?'<option selected value="0">keine </option>':'<option value="0">keine </option>');
  str+=((settings["userinfokey"]==1)?'<option selected value="1">Strg  </option>':'<option value="1">Strg  </option>');
  str+=((settings["userinfokey"]==2)?'<option selected value="2">Alt   </option>':'<option value="2">Alt   </option>');
  str+=((settings["userinfokey"]==3)?'<option selected value="3">Shift </option>':'<option value="3">Shift </option>');
  str+='</select></p>'
  str+='<p>Angezeigte Felder: <br><select name="userinfo_showelms" multiple size="8" style="min-width:200px;color:inherit">'
  var allowed=["-Account", "Name:", "Mitglied seit:", "Letztes Update:", "-Allgemeines", "Schule:", "Status:", "Geschlecht:", "An der Schule seit: ", "Heimatland:", "-Schule", "Ich bin:", "Lieblingsfach:", "Hassfach:", "Nebenjob:", "Was ich da mache:", "-Kontakt", "ICQ-Nummer:", "AIM-Name:", "Skype-Name:", "Handy-Nummer:", "Telefon:", "Adresse:", "PLZ, Ort:", "Land:", "Webseite:", "-Personliches", "Auf der Suche nach:", "Beziehung:", "Politisch:", "Hobbies:", "Clubs, Vereine:", "Lieblingsmusik:", "Lieblingsbücher:", "Lieblingsfilme:", "Lieblingsspruch:", "Ich mag:", "Ich mag nicht:", "Über mich:"];
  for(var i=0;i<allowed.length;i++){
    if(allowed[i].substr(0,1)=="-")//headline
      str+="<option disabled style=\"color:blue;font-weight:bold\">"+allowed[i].substr(1)+"</option>"
    else
      str+=((settings["userinfo2"] && settings["userinfo2"].indexOf(allowed[i].replace(",",""))>-1)
             ?"<option style=\"color:inherit\" value=\""+allowed[i].replace(",","")+"\" selected>"+allowed[i]+"</option>"
             :"<option style=\"color:inherit\" value=\""+allowed[i].replace(",","")+"\">"+allowed[i]+"</option>");
  }
  str+='</select></p></div></div><br>'


  str+='<div class="center" style="width: 450px; "><div class="secheader"><h2>Sonstiges</h2></div><div class="bluebox">'
  str+='<p><input type="checkbox" name="hide_group_accept" id="hide_group_accept" '
  if(settings["hide_group_accept"])
    str+=" checked"
  str+='><label for="hide_group_accept">Keine Bestätigung beim hinzfügen einer Gruppe</label></p>'

  str+='<p><input type="checkbox" name="hide_group_quit" id="hide_group_quit" '
  if(settings["hide_group_quit"])
    str+=" checked"
  str+='><label for="hide_group_quit">Keine Bestätigung beim verlassen einer Gruppe</label></p>'

  str+='<p><input type="checkbox" name="hide_gru_accept" id="hide_gru_accept" '
  if(settings["hide_gru_accept"])
    str+=" checked"
  str+='><label for="hide_gru_accept">Keine Bestätigung beim gruscheln</label></p>'

  str+='<p><input type="checkbox" name="hide_invite_accept" id="hide_invite_accept" '
  if(settings["hide_invite_accept"])
    str+=" checked"
  str+='><label for="hide_invite_accept">Keine Bestätigung beim einladen neuer Mitglieder in Gruppen</label></p>'
  str+='</div></div><br>'

  //end of form
  str+='     <div style="text-align:center"><input type="submit" class="inputsubmit" value="Zurücksetzen" oncklick="this.form.reset();return false;" />&nbsp;&nbsp;<input type="submit" class="inputsubmit" value="OK" /></div><br><br>'



// ---------------------------------


  //favs
  str+='<div class="center" style="width: 450px;"><div class="secheader"><h2><a name="favs"></a>Favoriten</h2></div><div class="bluebox"><p>Folgende Favoriten werden zur Zeit angezeigt</p>'
  str+='<ul id="favs_ul" class="ul_red"></ul>'

  str+='<p>Wenn du eine Seite zu den Favoriten hinzufügen möchtest, kannst du, wenn du die entsprechende Seite geöffnet hast, auf den dann erscheineneden Link klicken. Du kannst jede Seite nur einmal zu den Favoriten hinzufügen</p></div></div><br>'
  str+='<p id="favs_submitarea"></p>';


  //über
  str+='<div class="center" style="width: 450px; padding: 10px 0px 20px 0px;"><div class="secheader"><h2>Über</h2></div><div class="bluebox"><p>Michael\'s SchülerVZ Script<br>Version 0.1.3.2<br>28.01.2008<br><br>Fehler bitte als <a href="message.php?data[to_user_ids]=631e52f18f442b1e&data[mode]=new">Private Nachricht</a> oder in der <a href="http://www.schuelervz.net/group.php?ids=08d17dbb8a8c52e8">alternativen Hilfegruppe</a></p></div></div><br>'

  elm.innerHTML=str;
  document.getElementById("content").appendChild(elm)


  var favs_backups=[];
  function renderFavs(){
    favs=unsafeWindow.favs;
    var ul=document.getElementById("favs_ul");
    ul.innerHTML="";
    for(var i=0;i<favs.length;i++){
      var elm=document.createElement("li");
      var str="<input class=\"inputsubmit\" value=\"Löschen\" type=\"submit\" style=\"float:right;margin-left:20px\" onclick=\"favs.splice("+i+",1);renderFavs();return false\"><input class=\"inputsubmit\" value=\"Ändern\" type=\"submit\" style=\"float:right;margin-left:20px\" onclick=\"favs["+i+"][1]=prompt('Gib den neuen Namen ein',favs["+i+"][1]);renderFavs();return false\"><input class=\"inputsubmit\" value=\"Ab\" type=\"submit\" style=\"float:right;margin-left:6px\""
      if(i>favs.length-2)
        str+=" disabled"
      else
        str+=" onclick=\"var tmp=favs["+i+"+1];favs["+i+"+1]=favs["+i+"];favs["+i+"]=tmp;renderFavs();return false\""
      str+="><input class=\"inputsubmit\" value=\"Auf\" type=\"submit\" style=\"float:right;\""
      if(i<1)
        str+=" disabled"
      else
        str+=" onclick=\"var tmp=favs["+i+"-1];favs["+i+"-1]=favs["+i+"];favs["+i+"]=tmp;renderFavs();return false\""
      str+="><span>"+(i+1)+": <font title=\"Ziel: "+favs[i][0]+"\" style=\"position:relative;width:200px;\">"+favs[i][1]+"</font> </span>"
      elm.innerHTML=str;
      elm.style.clear="both"
      ul.appendChild(elm);
    }
    if(ul.innerHTML=="")
      ul.innerHTML="Keine Favoriten angelegt!"
    if(favs_backups.length>1)
      document.getElementById("favs_submitbutton").disabled=false
    favs_backups.push(favs)
  }
  unsafeWindow.renderFavs=renderFavs;
  unsafeWindow.favs=favs;
  window.addEventListener("load",renderFavs,true);


  var input=document.createElement("input");
  input.value="Zurücksetzen";
  input.className="inputsubmit"
  input.type="submit";
  input.addEventListener("click",function(evt){
    favs=unsafeWindow.favs;
    if(favs_backups.length>0)
      favs=favs_backups[0];
    renderFavs();
    unsafeWindow.favs=favs;
    evt.preventDefault();
  },true)
  document.getElementById("favs_submitarea").appendChild(input)


  var input=document.createElement("input");
  input.value="OK";
  input.className="inputsubmit"
  input.type="submit";
  input.addEventListener("click",function(evt){
    favs=unsafeWindow.favs;
    GM_setValue("favs",favs.toSource());
    alert("Favoriten gespeichert")
    evt.preventDefault();
  },true)
  document.getElementById("favs_submitarea").appendChild(input)

//  str+='<p><input value="Rückgängig" class=\"inputsubmit\" type=\"submit\" onclick="if(backups.length>1) {backups.pop(); favs=backups[backups.length-1];backups.pop();renderFavs();}else alert(\'nichts verändert\'); return false"></p>' not working
  /*str+='<p><input type="submit" class="inputsubmit" value="Zurücksetzen" oncklick="favs=backups[0];renderFavs();return false;" />&nbsp;&nbsp;<input type="submit" class="inputsubmit" value="OK" id="favs_submitbutton" onclick="document.cookie=\'favs=\'+encodeURIComponent(favs.toSource())+\'; expires=Mon, 31 Dec 2012 12:00:00 GMT\';document.location.href=\'privacy.php#favs\'" />';
  str+='<p>Wenn du eine Seite zu den Favoriten hinzufügen möchtst kannst du, wenn du die entsprechende Seite geöffnet hast auf den dann erscheineneden Link klicken. Du kannst jede Seite nur ein mal zu den Favoriten hinzufügen</p></div></div><br>'
  str+='<script>var favs='+favs.toSource()+',backups=new Array();'+renderFavs.toSource()+';renderFavs()</script>'

  str+='<div class="center" style="width: 450px; padding: 10px 0px 20px 0px;"><div class="secheader"><h2>Über</h2></div><div class="bluebox"><p>Michael\'s SchülerVZ Script<br>Version 0.1.3.2<br>28.01.2008<br><br>Fehler bitte als <a href="message.php?data[to_user_ids]=631e52f18f442b1e&data[mode]=new">Private Nachricht</a> oder in der <a href="http://www.schuelervz.net/group.php?ids=08d17dbb8a8c52e8">alternativen Hilfegruppe</a></p></div></div><br>'* /


  document.getElementById("kasten_rss").style.width=(400-document.getElementById("kasten_3_label").offsetWidth)+"px";



  var divs=document.getElementById("content").getElementsByTagName("div")
  for(var i=0;i<divs.length;i++){
    if(divs[i].getAttribute("class")!="secheader")
      continue
    //next box has to be resized
    if(divs[i+1].getAttribute("class")!="bluebox")
      continue

    var headline=divs[i]
    var content=divs[i+1]

    var elm=document.createElement("font")
    elm.innerHTML="<b>↓</b>"
    elm.style.position="absolute"
    elm.style.right="10px"
    elm.style.top="1px"
    elm.style.cursor="pointer"
    elm.setAttribute("for","content_"+i);
    elm.addEventListener("click",function(evt){
      var contentelm=document.getElementById(evt.currentTarget.getAttribute("for"))
      if(contentelm.getAttribute("step")<1){
        evt.currentTarget.innerHTML="<b>↑</b>"
        contentelm.setAttribute("up","false");
        renderheight(contentelm.id)
      }
      else{
        evt.currentTarget.innerHTML="<b>↓</b>"
        contentelm.setAttribute("up","true");
        renderheight(contentelm.id)
      }
    },true)
    headline.style.position="relative"
    headline.appendChild(elm)
    content.setAttribute("oldheight",content.offsetHeight);
    content.setAttribute("step","0");
    content.id="content_"+i
    content.style.display="none"
    content.style.overflow="hidden"
    content.style.position="relative"
  }
  function renderheight(id){
    var elm=document.getElementById(id)
    var step=parseInt(elm.getAttribute("step"));/*ausfahr-zustand: 0:eingefahren;10:ausgefahren* /
    var putup=(elm.getAttribute("up")=="true");
    step+=putup ? -1 : 1;
    window.status=step+"-"+putup+elm.getAttribute("up")
    elm.setAttribute("step",step)
    if(step<1){
      elm.style.display="none";
      return;
    }
    elm.style.display="";
    if(step>9){
      elm.style.height="";
      return;
    }
    var height=elm.getAttribute("oldheight")
    elm.style.height=(Math.sin(step/Math.PI-Math.PI/2)+1)*height/2+"px";//(sin(x/3.14-1.57)+1)*50
    setTimeout("renderheight('"+id+"')",100)
  }

  /*script that can be used every time* /
  var elm=document.createElement("script")
  elm.innerHTML=renderheight.toSource()
  document.getElementsByTagName("head")[0].appendChild(elm)*/


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

    /*var input=document.createElement("input");
    input.name="farbe";
    input.type="radio";
    if(GM_getValue("theme","0")=="0")
      input.selected=true;
    input.value="0";
    input.id="farbe_0"
    div.appendChild(input)

    var label=document.createElement("label");
    label.appendChild(document.createTextNode("Orginalfarbe"));
    label.htmlFor="farbe_0";
    div.appendChild(label);

    for(var i in styles){
      div.appendChild(document.createElement("br"))

      var input=document.createElement("input");
      input.name="farbe";
      input.id="farbe_"+i;
      input.type="radio";
      if(GM_getValue("theme","0")==i)
        input.selected=true;
      input.value=i;
      div.appendChild(input)

      var label=document.createElement("label");
      label.appendChild(document.createTextNode(styles[i].name + " (von "+ (styles[i].author ? styles[i].author : "Unbekannt") + ")" ));
      label.title=styles[i].description;
      label.htmlFor="farbe_"+i;
      div.appendChild(label);
    }*/
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
  a.appendChild(document.createTextNode("Scripteinstellungen"))
  a.href="#"
  document.getElementById("tabBar").appendChild(li);
}
GM_addStyle(css);

