// ==UserScript==
// @name          VK_ExUserMenu
// @description   (by KiberInfinity id13391307)
// @include       http://*vkontakte.ru/*
// @include       http://*vk.com/*
// ==/UserScript==


//////////////////////////////////
// ExUserMenu by KiberInfinity //
/////////////////////////////////
function ChangeUserMenuSet(){
  var res="";
  var cnt=ge('vkUMsettCnt').value;
  for (var i=0; i<cnt;i++){
   res+=(ge('ums'+i).checked)?'1':'0'; 
  }
  //alert(res);
  vksetCookie('remixumbit', res);
}
function GetUserMenuSett() {
    makeCbox = function(idx, name, state) {
        var cb = (state == '1') ? 'checked': '';
        return '<input type="checkbox" onclick="ChangeUserMenuSet();" id="ums' + idx + '" ' + cb + ' value=""> ' + name + '<br>';
    }
    var ItemNames = [
                     IDL("seAltProfile"),
                     IDL('txMessage'), 
                     IDL("clWa"), 
                     IDL("clPhW"), 
                     IDL("clViW"), 
                     IDL("clPh"), 
                     IDL("clAu"), 
                     'player ' + IDL("clAu"), 
                     IDL("clVi"), 
                     IDL("clGr"), 
                     IDL("fris"), 
                     IDL("clQu"), 
                     IDL("clAp"), 
                     IDL("clEv"), 
                     IDL("clNo"), 
                     IDL("clGi"), 
                     IDL("clRa"), 
                     IDL("clAddFr"), 
                     IDL("clAddToFav"), 
                     IDL("addblack")
                    ];
    
    var res="";
    var bits = vkgetCookie('remixumbit');
    if (!bits) {
        bits = DefExUserMenuCfg;
        vksetCookie('remixumbit', DefExUserMenuCfg);
    }
    var ExUserMenuCfg = bits.split('');

    for (var i = 0; i < ItemNames.length; i++) {
        res+=makeCbox(i, ItemNames[i], ExUserMenuCfg[i]);
    }

    return '<div style="text-align:left;">'+res+'</div><input type="hidden" id="vkUMsettCnt" value="'+ItemNames.length+'" /> ';
}
function GetUserMenuCfg(){
  var bits=vkgetCookie('remixumbit');
  if (!bits) {bits=DefExUserMenuCfg; vksetCookie('remixumbit',DefExUserMenuCfg);}
  ExUserMenuCfg=bits.split('');
}

function vkExUMlinks(){
 if(ge('pageBody').getElementsByTagName('a')){
  var links=ge("pageBody").getElementsByTagName('a');
  i=0;
  while(links[i]){
    var tmp1=links[i];
    var tmp2=tmp1.href.match(/\/id(\d+)$/);
    if (!tmp2) tmp2=tmp1.href.match(/\/profile.php\?id=(\d+)$/);

    if(tmp2){
      var uid=tmp2[1];
       var tes=tmp1.innerHTML
       var mask=new Array();
       mask['small']=/[^<]*<small>[^<]*<\/small>/i;
       mask['strong']=/[^<]*<strong>[^<]*<\/strong>/i;
       mask['em']=/[^<]*<em>[^<]*<\/em>/i;
       mask['img']=/[^<]*<img/i;

       //inelem='<img id="pup'+id+'_'+i+'" onmouseover="pupShow(\''+id+'_'+i+'\','+id+');" src="'+img_sr2+'">';
       var adid=uid+'_'+i;
       var mev=(getSet(56)=='y')?'onclick':'onmouseover';                                                      //&#9687;             &#9662;
       inelem='<a style="font-size:6px;" id="pup'+adid+'" '+mev+'="pupShow(\''+adid+'\','+uid+'); return false;">&#9660; </a>';
                                         //                           //
        if (!tmp1.innerHTML.match('pupShow') && !tmp1.getAttribute('exuser')){
        if (((tes.match(mask['small']) || tes.match(mask['strong']) || tes.match(mask['em'])) && !tes.match(mask['img'])) || !tes.match('<')){
          //tmp1.innerHTML+=inelem;
          //tmp1.onclick="AlternativeProfile("+uid+");return false";
          tmp1.setAttribute('exuser',true);
          tmp1.outerHTML=tmp1.outerHTML+inelem;
        }/*else if(!tes.match('<')){
          //tmp1.innerHTML+=inelem;
          //tmp1.onclick="AlternativeProfile("+uid+");return false";
          tmp1.setAttribute('exuser',true);
          tmp1.outerHTML=tmp1.outerHTML+inelem;
          }*/
        }
      //}
    }//*/
    i++;
  }}
}
var PUPCss= //position: fixed;
'#pupMenu { background: #FFFFFF; position:absolute; display: none; cursor: pointer; z-index: 200000;}'+
'.pupBody { background: #FFFFFF; border: 1px solid #96AABE; width: 156px; _width: 157px;}'+
'.pupBottom, .pupBottom2 { height: 1px; overflow: hidden; background: #000; opacity: 0.12; filter:alpha(opacity=12);}'+
'.pupBottom2 { opacity: 0.05; filter:alpha(opacity=5); height: 1px;}'+
'.pupSide { width: 1px; overflow: hidden; background: #000; opacity: 0.06; filter:alpha(opacity=6);}'+
'.pupItem, .pupItemOn { padding: 3px 3px 3px 5px; background-color: #FFF; color: #2C587D; _width:132px;}'+
'.pupItemOn { background-color: #EEF2F6;}';
var pup_over = 0;
var pup_show_delay=1500;
var pup_tout;
function pupShow(pid,id) {
 var pup_menu = ge('pupMenu');
   pup_menu.style.left=window.event.pageX;
   pup_menu.style.top=window.event.pageY;
 var str = "<table cellpadding=0 cellspacing=0><tr><td class='pupSide'></td><td><div class='pupBody'>";
 str += ExUserItems(id);//pupItems(pid);
 str += "</div><div class='pupBottom'></div><div class='pupBottom2'></div></td><td class='pupSide'></td></tr>";
 pup_menu.innerHTML = str;
 show(pup_menu);
 pup_menu.style.visible='visible';
 clearTimeout(pup_tout);
 pup_tout=setTimeout(pupHide, pup_show_delay);
}

function pupItems(fid) {
 var str = "", cl_name = "";
  cl_name = "pupItem";
  for (var i=0;i<10;i++)
  str += "<div id='pupdead"+i+"' onmouseover='pupOverItem("+i+")' onmouseout='pupOutItem("+i+")' class='"+cl_name+"'>Item "+i+"</div>";
 return str;
}

function mkExItem(id,text){
var str = "<div id='pupdead"+id+"' onmouseover='pupOverItem("+id+")' onmouseout='pupOutItem("+id+")' class='pupItem'>"+text+"</div>";
return str;
}
function ExUserItems(id){
var i=0;
var uitems='';
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="id'+id+'" onclick="AlternativeProfile('+id+'); return false;">'+IDL('seAltProfile')+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="mail.php?act=write&to='+id+'" onclick="return AjMsgFormTo('+id+');">'+IDL('txMessage')+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="wall.php?id='+id+'">'+IDL("clWa")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="photos.php?act=user&id='+id+'">'+IDL("clPhW")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="video.php?act=tagview&id='+id+'">'+IDL("clViW")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="photos.php?id='+id+'">'+IDL("clPh")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="audio.php?id='+id+'">'+IDL("clAu")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="app545941_'+id+'">player '+IDL("clAu")+'</a>'):i++; //audio application
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="video.php?id='+id+'">'+IDL("clVi")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="groups.php?id='+id+'">'+IDL("clGr")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="friends.php?id='+id+'">'+IDL("fris")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="questions.php?mid='+id+'">'+IDL("clQu")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="apps.php?mid='+id+'">'+IDL("clAp")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="events.php?id='+id+'">'+IDL("clEv")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="notes.php?id='+id+'">'+IDL("clNo")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="gifts.php?id='+id+'">'+IDL("clGi")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="rate.php?act=vote&id='+id+'">'+IDL("clRa")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="javascript:Vk_addToFriends('+id+');">'+IDL("clAddFr")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a href="javascript:vkFave('+id+',1);">'+IDL("clAddToFav")+'</a>'):i++;
(ExUserMenuCfg[i]==1)?uitems+=mkExItem(i++,'<a style="cursor: hand;" onClick=\"IDIgnor_set('+id+');\">'+IDL("addblack")+'</a>'):i++;

return uitems;}

function pupOverItem(n) {
 clearTimeout(pup_tout);
  ge('pupdead'+n).className = 'pupItemOn';
 pup_over=1;}

function pupOutItem(n) {
  ge('pupdead'+n).className = 'pupItem';
 pupRemove();
 pup_over=0;}

function pupRemove() {
 setTimeout(pupHide, 50);}

function pupHide() {
 if (pup_over) {
  return;
 }
 ge('pupMenu').style.left='-200px';
 ge('pupMenu').style.top='-300px';
 hide('pupMenu');

 }
  ///////////////////////
 // End of ExUserMenu //
///////////////////////

function AddExUserMenu(){
 if (getSet(50)=='y') //&& !ge('phototags') && !ge('videotags')
    {
    vkExUMlinks();
     }
}

function HideWarningWrongInfo(){
var style=
//'#userProfile > div[style] a {display:none !important;}'+
'#userProfile > div[style] > div {visibility:hidden !important; text-align:center !important; font-weight:bold !important;}'+
'#userProfile > div[style] {height:30px !important; width:30px !important; background:transparent url(http://s124.wen9.com/usercss3/warning.png) no-repeat center !important; overflow:hidden !important; border:0px !important; margin:5px 5px 5px 5px !important; float:right !important;}'+
'#userProfile > div[style]:hover {height:auto !important; width:57% !important; background:transparent url(http://s124.wen9.com/usercss3/darkContent.png) !important; border:1px solid #030 !important; cursor:help !important; margin:5px !important;}'+
'#userProfile > div[style]:hover > div {visibility:visible !important;}'
vkaddcss2(style);
}

function vk_user_init(){
if (ge('pageLayout')){
 if (getSet(51)=='y') HideWarningWrongInfo();
 if (getSet(50)=='y'){
    GetUserMenuCfg();
    var addbg=' .pupBody { background:'+getStyle(document.body, 'background')+' !important;}';
    vkaddcss(PUPCss+addbg);
    phdiv=document.createElement('div');
    phdiv.id='pupHead';
    pmdiv=document.createElement('div');
    pmdiv.id='pupMenu';
    ge('pageLayout').appendChild(phdiv);
    ge('pageLayout').appendChild(pmdiv);
    vkExUMlinks();
 }
 //AddExUserMenu();
}}

(function(){
document.addEventListener('DOMContentLoaded',vk_user_init, false);
})();
