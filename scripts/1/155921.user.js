// ==UserScript==
// @name        555
// @namespace   555
// @include     http://vendettaproject.org/s3/village1.php
// @version     1
// ==/UserScript==
//var WebSite="localhost";
//var FirstPage="village1.php";
//var SecondPage="village2.php";

var WebSite="vendettaproject.org";
var FirstPage="village1.php";
var SecondPage="village2.php";

var BuildPage="build.php?id=";
var DisablePage=new Array("login.php");

var Villages=new Array();
var Resources=new Array();
var Buildings=new Array();
var MBuildings=new Array("Woodcutter","Clay Pit","Iron Mine","Cropland","Sawmill","Brickyard","Iron Foundry","Grain Mill","Bakery","Warehouse","Granary","Blacksmith","Armoury","Tournament Square","Main Building","Rally Point","Marketplace","Embassy","Barracks","Stable","Workshop","Academy","Cranny","Town Hall","Residence","Palace","Treasury","Trade Office","Great Barracks","Great Stable","-","-","-","Stonemason's Lodge","Brewery","Trapper","Hero's Mansion","Great Warehouse","Great Granary","Wonder Of The World","Horse Drinking Trough");
///////////////////////////////////////////////////////////////////////////////////////////////
if (document.body) {
  //setTimeout(function() {GM_deleteValue("JScommand");},0);
  if(window.location.href.indexOf(WebSite)==-1 || IsDisablePage()) return;
  Initial();
  CheckCommand();
}
///////////////////////////////////////////////////////////////////////////////////////////////
function Initial(){
  InitialButton();
  if(window.location.href.indexOf(FirstPage)>-1) InitialFirstPage();
  InitialVillage(); 
}
///////////////////////////////////////////////////////////////////////////////////////////////
function InitialResource(){
    Resources=[];
    var _item;
    _item=xpath("//div[@id='resWrap']//td[@id='l4']");
    var _wood=new Array(_item.snapshotItem(0).innerHTML.split("/")[0],_item.snapshotItem(0).innerHTML.split("/")[1],parseInt(_item.snapshotItem(0).getAttribute("title")));
    Resources.push(_wood);
    _item=xpath("//div[@id='resWrap']//td[@id='l3']");
    var _cray=new Array(_item.snapshotItem(0).innerHTML.split("/")[0],_item.snapshotItem(0).innerHTML.split("/")[1],parseInt(_item.snapshotItem(0).getAttribute("title")));
    Resources.push(_cray);
    _item=xpath("//div[@id='resWrap']//td[@id='l2']");
    var _iron=new Array(_item.snapshotItem(0).innerHTML.split("/")[0],_item.snapshotItem(0).innerHTML.split("/")[1],parseInt(_item.snapshotItem(0).getAttribute("title")));
    Resources.push(_iron);
    _item=xpath("//div[@id='resWrap']//td[@id='l1']");
    var _crop=new Array(_item.snapshotItem(0).innerHTML.split("/")[0],_item.snapshotItem(0).innerHTML.split("/")[1],parseInt(_item.snapshotItem(0).getAttribute("title")));
    Resources.push(_crop);
}
function InitialBuilding(){
    Buildings=[];
    var _building=xpath("//map[@id='map2']/area");
    for(_i=0;_i<_building.snapshotLength;_i++){
      if (_building.snapshotItem(_i).getAttribute("title")=="Building site") continue;
      for(_j=0;_j<MBuildings.length;_j++){
        if (_building.snapshotItem(_i).getAttribute("title").indexOf(MBuildings[_j])>-1) {
          var _level = parseInt(_building.snapshotItem(_i).getAttribute("title").substr(_building.snapshotItem(_i).getAttribute("title").toUpperCase().indexOf("LEVEL")+6));
          Buildings[_i]=new Array(MBuildings[_j],_j,_level,_building.snapshotItem(_i).getAttribute("href"));
        }
      }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////
function InitialButton(){
  var _obj=xpath("//div[@id='side_info']");
  var _show="";
    
  _show+="<table cellspacing='1' cellpadding='1' id='JScommand'>";
  _show+="<thead><tr><td colspan='3'><b>Auto Upgrade:</b></td></tr></thead>";
  _show+="<tbody>";
  _show+="<tr><td class='dot'>•</td><td class='link'><div><a class='JScommand' JS='Troop'>Troop " + (GM_getValue("JScommand")!=undefined&&GM_getValue("JScommand")=="Troop"?"Open":"Close") + "</a></div></td></tr>";
  _show+="<tr><td class='dot'>•</td><td class='link'><div><a class='JScommand' JS='TroopSend'>TroopSend " + (GM_getValue("JScommand")!=undefined&&GM_getValue("JScommand")=="TroopSend"?"Open":"Close") + "</a></div></td></tr>";
  _show+="</tbody>";
  _show+="</table>";
  
  _obj.snapshotItem(0).innerHTML=_show+_obj.snapshotItem(0).innerHTML;
}
function InitialFirstPage(){
  InitialResource();
  for(_i=0;_i<4;_i++){
    var _item=xpath("//table[@id='production']/tbody/tr[" + (_i+1) + "]/td[@class='per']");
    var _hour=parseFloat((Resources[_i][1]-Resources[_i][0])/Resources[_i][2]);
    _item.snapshotItem(0).innerHTML=_hour; 
  }
}
function InitialVillage(){
  var _villages=xpath("//table[@id='vlist']//a");
  if (_villages.snapshotLength>0){
    for(_i=0;_i<_villages.snapshotLength;_i++){
      Villages.push(_villages.snapshotItem(_i).outerHTML.split("=")[2].split("\"")[0].split("&")[0]);  
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
function CheckCommand(){
    var _command=GM_getValue("JScommand");
    if (_command==undefined) return;
    if (_command=="Troop") JScommand_Troop(GM_getValue("Step"));
    if (_command=="TroopSend") JScommand_TroopSend(GM_getValue("Step"));
}
function JScommand_Troop(_step){
  if(_step==1){
    setTimeout(function() {GM_setValue("VillageID",1);},0);
      
    Step(++_step);
    window.location.href=SecondPage;
  }else if(_step==2){
    if(CheckPage(SecondPage)) { return; }
    
    InitialBuilding();
    
    if(GetBuilding(18)!=-1){
      Step(++_step);
      window.location.href=Buildings[GetBuilding(18)][3]; 
    }
  }else if(_step==3){
    var _txttroop=xpath("//table[@class='build_details']/tbody/tr");
    if(_txttroop.snapshotLength==0) { DisableUpdate("Building"); return; }
    
    for(var _i=1;_i<=_txttroop.snapshotLength;_i++){
      var __txttroop=xpath("//table[@class='build_details']/tbody/tr[" + _i + "]/td[@class='val']/input");
      if(__txttroop.snapshotItem(0).getAttribute("id")=="__tf21"){
        var _troopnumber=xpath("//table[@class='build_details']/tbody/tr[" + _i + "]/td[@class='max']/a");
        __txttroop.snapshotItem(0).setAttribute("value",_troopnumber.snapshotItem(0).getAttribute("onclick").split("=")[1].split(";")[0]);        
        
        Step(++_step);
        Click("#btn_train");
        
        DisableUpdate("Troop"); return; 
      }
    }
  }
}
function JScommand_TroopSend(_step){
  if(_step==1){
    
    setTimeout(function() {GM_setValue("VillageID",1);},0);
  }
}
function Click(_link){
    var _doc=xpath("//body");
    _doc.snapshotItem(0).innerHTML="<div id=JSclick style='display:none'>" + _link + "</div>" + _doc.snapshotItem(0).innerHTML;
}
function Get(_data){
  if(window.location.href.indexOf(_data+"=")>0) {
    return parseInt(window.location.href.substr(window.location.href.indexOf(_data+"=")+9));
  }
  return undefined;
}
function GetBuilding(_buildind){
  for(_i=0;_i<Buildings.length;_i++){
    if(Buildings[_i]!=undefined&&Buildings[_i][1]==_buildind) return _i;
  }
  return -1;
}
function CheckPage(_page){
    if(window.location.href.indexOf(_page)==-1) { window.location.href=FirstPage; Step(1); return true; }
    else return false;
}
function DisableUpdate(_update){
  setTimeout(function() {GM_deleteValue("JScommand");},0);
  setTimeout(function() {GM_deleteValue("Step");},0);
      
  var _div=xpath("//a[@JS='" + _update + "']");
  if (_div.snapshotLength>0) _div.snapshotItem(0).innerHTML=_update + " Close";
}
function IsDisablePage(){
  for(_i=0;_i<DisablePage.length;_i++){
    if(window.location.href.indexOf(DisablePage[_i])>0) return true; 
  }
  return false;
}
function Step(_step){
  setTimeout(function() {GM_setValue("Step",_step);},0);
}
///////////////////////////////////////////////////////////////////////////////////////////////
var $; (function(){ if (typeof unsafeWindow.jQuery == 'undefined') { var GM_Head=document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ=document.createElement('script'); GM_JQ.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'; GM_JQ.type='text/javascript'; GM_JQ.async=true; GM_Head.insertBefore(GM_JQ, GM_Head.firstChild); } GM_wait(); })(); function GM_wait() { if (typeof unsafeWindow.jQuery == 'undefined') window.setTimeout(GM_wait, 100); else { $=unsafeWindow.jQuery.noConflict(true); jqueryload(); } }
function xpath(query, object) { if(!object) var object=document; return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
///////////////////////////////////////////////////////////////////////////////////////////////
function jqueryload(){
  $("a.JScommand").attr("href", "javascript:void(0);");
  $("a.JScommand").click(function(){
    var _command=$(this).attr("JS");
    if($("a.JScommand[JS=" + _command + "]").html()==_command + " Open"){
      setTimeout(function() {GM_deleteValue("JScommand");},0);
      setTimeout(function() {GM_deleteValue("Step");},0);
      $("a.JScommand[JS=" + _command + "]").html(_command + " Close");
    }else{
      setTimeout(function() {GM_setValue("JScommand",_command);},0);
      setTimeout(function() {GM_setValue("Step",1);},0);
      eval("JScommand_" + _command + "(1)");
      $(this).html(_command + " Open");
    }
  });
  if ($("#JSclick").length>0) $($("#JSclick").html()).click();
}