// ==UserScript==
// @name          Extended events for ogame
// @namespace     VlnOgame
// @description	  Extended events for ogame
// @author        Voland
// @include       http://*.ogame.*/game/index.php?*
// @version       1.0.9
// @updateURL     http://userscripts.org/scripts/source/130114.meta.js
// @run-at        document-end

// ==/UserScript==
function contentEval(source) {
  source = '(' + source + ')();'
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
}
contentEval(function ()
{
 var $ = ((typeof unsafeWindow) != "undefined") ? unsafeWindow.$ : window.$;
 var url = document.location.href;
 if (!/http:\/\/.*\.ogame\..+/.test(url)) { return; }
 var mc_added=false;
 function VLN_event()
  {
   var V2=false;
   var Events = [];
   var iEvents = [];
   var eventsLoaded=false;
   if (typeof GM_getValue === 'undefined') { GM_getValue = function(key, defaultValue) {  var retValue = localStorage.getItem(key);  if (!retValue) {retValue = defaultValue;}  return retValue;}}
   if (typeof GM_setValue === 'undefined') { GM_setValue = function(key, value) {localStorage.setItem(key, value);}}
   if (typeof GM_deleteValue === 'undefined') {GM_deleteValue = function(key) {localStorage.removeItem(key);}}
   if (typeof GM_addStyle == 'undefined') {GM_addStyle = function (css) {var head = document.getElementsByTagName('head')[0]; if (head) {var style = document.createElement("style");style.type = "text/css";style.appendChild(document.createTextNode(css));head.appendChild(style);}}}
   var PREF=getByName("ogame-universe")+"-"+getByName("ogame-player-id");
   function byId(n,d) {if(!d) d=document; return d.getElementById(n);}
   GM_addStyle(".vlnplc {font-size:11px; position:absolute; right:2px; bottom:5px; color:#DDDD00;}");
   GM_addStyle(".vlnmnc {font-size:11px; position:absolute; left:20px; bottom:5px; color:red;}");
   function addEvent(tm,pl,co,data,pid,nt)
    {
     var e=new Object;
     var dt=new Date; if(VLN_event.IST) dt.setTime(VLN_event.IST);
     if(tm<=dt.getTime()) return undefined;
     e.time=tm; e.pname=pl; e.co=co; e.data=data;
     e.id=e.time+Math.random();
     if(nt) e.nt=nt;
     if(pid) { e.type="p"; e.planet=pid; }
     else e.type="e";
     return insertEvent(e,true);
    }
   function insertEvent(e,stor)
    {
     if(!eventsLoaded) loadEvents();
     var ins=false;
     for (var i = 0; i < Events.length && !ins; i++)
      {
       if(Events[i].time>e.time) { Events.splice(i,0,e); ins=true;}
      }
     if(!ins) {Events.push(e);}
     if(stor) storeEvents();
     iEvents[e.id]=e;
     return e;
    }
   function storeEvents()
    {
     GM_setValue("VLNEvents-"+PREF,JSON.stringify(Events));
    }
   function loadEvents()
    {
     eventsLoaded=true;
     Events=JSON.parse(GM_getValue("VLNEvents-"+PREF,"[]"));
     for (var i = 0; i < Events.length; i++) { iEvents[Events[i].id]=e; }
     deleteOld();
    }
   function deleteOld()
    {
     var delited=false;
     var tm=new Date; tm.setTime(VLN_event.IST);
     for (var i = 0; i < Events.length; i++)
      {
       if(Events[i].time<tm.getTime() && !Events[i].nt)
        {
         var d=byId("eventRow-x"+Events[i].id);
         if(d) d.parentNode.removeChild(d);
         Events.splice(i,1); i--; delited=true;
        }
      }
     if(delited) storeEvents();
    }
   function deleteEvent(id,stor)
    {
     var now=new Date;
     for (var i = 0; i < Events.length; i++)
      {
       if(Events[i].id==id)
        {
         Events.splice(i,1);
         var d=byId("eventRow-x"+id);
         if(d) d.parentNode.removeChild(d);
         if(stor) storeEvents();
         break;
        }
      }
     delete iEvents[id];
    }
   function getPlanetEvent(pid)
    {
     for (var i = 0; i < Events.length; i++)
      {
       if(Events[i].planet==pid) return Events[i];
      }
     return undefined;
    }
   function eventByTag(tag)
    {
     for (var i = 0; i < Events.length; i++)
      {
       if(Events[i].tag==tag) return Events[i];
      }
     return undefined;
    }
   function eventById(id)
    {
     return iEvents[id];
    }
   function createWindow()
    {
     if(url.indexOf("page=showmessage")>-1) return;
     if(url.indexOf("page=phalanx")>-1) return;
     if(url.indexOf("page=combatreport")>-1) return;
     var d=document.createElement("div");
     d.id="VLN_addevent";
     d.style.position="fixed"; d.style.top="10px"; d.style.left="250px";
     d.className="content-box-xl"; d.style.zIndex="9999";
     d.style.opacity="show"; d.style.display="none";
     d.innerHTML='<div class="header" style="background-color:#262D33; height: 22px; align=center"><a class="close_details" style="float: right; margin: 5px;" onclick="document.getElementById(\'VLN_addevent\').style.display = \'none\';" href="#"></a><h3 style="font-weight:bold;" align=center>Добавить событие</h3></div>'+
     '<div class="content" id="VLN_eventWCont" style="background-color:#0D1014; max-height:400px;"></div><div class="footer" style="background-color:#0D1014; height: 7px;"></div>';
     document.body.appendChild(d);
    }
   function getByName(nam)
    {
     var d=document.getElementsByName(nam)[0];
     if(d) return d.content;
     return undefined;
    }
   function showAddWindow()
    {
     var dcont=byId("VLN_eventWCont");
     var tm=new Date;
     tm.setTime(VLN_event.IST);
     var co=getByName("ogame-planet-coordinates").split(':');
     var pnam=getByName("ogame-planet-name");
     var counts='';
     try {
      var a = VLN_event.script;
      if (a) {
        var b = a.innerHTML.match(/baulisteCountdown\(getElementByIdWithCache\(["']\w+["']\)\,\s*\d*/gi); //'
        if (b) for (var c = 0; c < b.length; c++) {
         var d = b[c].match(/["'](\w+)["']\)\,\s*(\d*)/i); //'
         if(d[2])
          {
           var e=byId(d[1]);
           var tab=e.parentNode.parentNode.parentNode;
           if(tab)
            {
             var tfg=tab.firstChild.getElementsByTagName("th")[0].innerHTML;
             counts+="<tr><td><A HREF=\"javascript:VLN_event.selCD("+d[2]+",'"+
             tfg+" "+tab.getElementsByClassName("level")[0].innerHTML+"')\">"+
             tfg+"</A></td><tr>";
            }
          }
        }
       b=shipCountdown();
       if(b) counts+="<tr><td><A HREF=\"javascript:VLN_event.selCD("+b+",'Строительство на верфи')\">Строительство на верфи</A></td><tr>";
      }
     } catch (f) {}
     var plcode="";
     if(getByName("ogame-planet-type")=="planet")
      {
       if(!getPlanetEvent(getByName("ogame-planet-id")))
        {
         plcode="<tr><td>Показывать: <input type=radio name=tp value='e' checked> В списке событий"+
          "&nbsp;&nbsp;<input type=radio name=tp value='p'> У планеты</td></tr>";
        }
      }
     dcont.innerHTML="<form name='VLN_eventForm'><table><tr><td>"+
     "Планета: [<input type='text' name='coG' maxlength=1 style='width:10px' value='"+co[0]+"'>:<input type='text' name='coS' style='width:25px' maxlength=3 value='"+co[1]+"'>:<input type='text' name='coP' style='width:17px' maxlength=2 value='"+co[2]+"'>]<input type='text' name='pname' value='"+pnam+"'>"+
     "&nbsp;&nbsp;Дата: <input type='text' name='dtD' maxlength=2 style='width:17px' value='"+tm.getDate()+"'>/<input type='text' name='dtM' maxlength=2 style='width:17px' value='"+(tm.getMonth()+1).toString()+"'>/<input type='text' name='dtY' maxlength=2 style='width:17px' value='"+(tm.getFullYear()-2000).toString()+"'>"+
     "&nbsp;&nbsp;Время: <input type='text' name='tmH' maxlength=2 style='width:17px' value='"+tm.getHours()+"'>/<input type='text' name='tmM' maxlength=2 style='width:17px' value='"+tm.getMinutes()+"'>/<input type='text' name='tmS' maxlength=2 style='width:17px' value='"+tm.getSeconds()+"'></td></tr>"+
     "<tr><td>Описание: <input type=text name=data size=60>&nbsp;&nbsp;<input type=button onClick='javascript:VLN_event.formSubmit()' value='Добавить' class='buttonSave'></td></tr>"+
     "<tr><td><input type=checkbox name=nt> напоминать при завершении</td></tr>"+
     plcode+counts+
     "<tr><td>&nbsp;</td></tr>"+
     "<tr><td><input type='checkbox' name='autoS' onChange='VLN_event.autoS(this)'"+
     (parseInt(GM_getValue("VLNEvents.autoS-"+PREF,0)) ? "checked" : "")+
     "> Автоматически показывать время работы верфи у планеты</td></tr>"+
     "</table></form>";
     byId("VLN_addevent").style.display="block";
  // d.style.width="400px";
    }
   function shipCountdown()
    {
     var a = VLN_event.script;
     if(!a) return undefined;
     var b;
     if (b = a.innerHTML.match(/shipCountdown\((\s*getElementByIdWithCache\(["']\w+["']\)\,)+(\s*\d*\,){3,3}/i)) //'
      {
       b[2] = b[2].match(/(\d+)/)[0];
       if(b[2]) return b[2];
      }
     return 0;
    }
   function testShipYard()
    {
     if(!parseInt(GM_getValue("VLNEvents.autoS-"+PREF,0))) return;
     var b=shipCountdown();
     if(!b) return;
     var pid=getByName("ogame-planet-id");
     var e=getPlanetEvent(pid);
     var tm=VLN_event.IST*1+b*1000;
     if(e) if(e.time!=tm) {deleteEvent(e.id,true); e=false;}
     if(!e) addEvent(tm,getByName("ogame-planet-name"),getByName("ogame-planet-coordinates"),"Shipyard",pid,false);
    }
   function autoS(a)
    {
     GM_setValue("VLNEvents.autoS-"+PREF,a.checked ? 1 : 0);
    }
   function selCD(t,name)
    {
     var tm=new Date;
     tm.setTime(VLN_event.IST*1+t*1000);
     var f=document.getElementsByName("VLN_eventForm")[0];
     f.data.value=name;
     f.dtD.value=tm.getDate();
     f.dtM.value=tm.getMonth()+1;
     f.dtY.value=tm.getFullYear()-2000;
     f.tmH.value=tm.getHours();
     f.tmM.value=tm.getMinutes();
     f.tmS.value=tm.getSeconds();
    }
   function formSubmit()
    {
     var tm=new Date;
     var f=document.getElementsByName("VLN_eventForm")[0];
     tm.setFullYear(f.dtY.value*1+2000);
     tm.setMonth(f.dtM.value-1);
     tm.setDate(f.dtD.value);
     tm.setHours(f.tmH.value);
     tm.setMinutes(f.tmM.value);
     tm.setSeconds(f.tmS.value);
     var co=f.coG.value+":"+f.coS.value+":"+f.coP.value;
     var pnam=f.pname.value;
     var pid=false;
     if(f.tp && f.tp[1].checked && getByName("ogame-planet-type")=="planet")
      {
       pid=getByName("ogame-planet-id");
       if(getPlanetEvent(pid)) {pid=false;}
      }
     if(addEvent(tm.getTime(),pnam,co,f.data.value,pid,f.nt.checked))
      {
       byId("VLN_addevent").style.display="none";
      }
    }
   function smallStr(pnam,len)
    {
     if(!pnam) return pnam;
     if(pnam.length>len)
      {
       var opnam=pnam;
       if(pnam.indexOf(" ")>0 && pnam.indexOf(" ")<(len+3))
        {
         pnam=pnam.substring(0,pnam.substring(0,len).lastIndexOf(" "))+" ...";
        } else
        {
         pnam=pnam.substring(0,len)+" ...";
        }
       pnam='<span class="tipsStandardMax" title="'+opnam+'">'+pnam+"</span>";
      }
     return pnam;
    }
   function timeInterval(a)
    {
     var d=a.split(" ");
     var tm=0;
     for(var i=0;i<d.length;i++)
      {
       var c=Number(d[i].substring(0,d[i].length-1));
       switch(d[i].substring(d[i].length-1))
        {
         case LocalizationStrings.timeunits.short.day:    tm=tm*1+24*60*60*c; break;
         case LocalizationStrings.timeunits.short.hour:   tm=tm+60*60*c; break;
         case LocalizationStrings.timeunits.short.minute: tm=tm+60*c; break;
         case LocalizationStrings.timeunits.short.second: tm=tm+c; break;
        }
      }
     return tm;
    }
   function twoDig(d)
    {
     if(d>9) return d;
     return "0"+d;
    }
   function checkOgEvents(a)
    {
     if(!V2) return;
     var key=Math.random();
     var b = a.match(/Countdown\(getElementByIdWithCache\("counter-\d+"\), *\d+\)/gi);
     if (b)
      for (var c = 0; c < b.length; c++)
       {
        var d=b[c].match(/counter-(\d+)[^0-9]+(\d+)\)/)
        var e=eventById(d[1]);
        if(!e)
         {
          e=new Object;
          e.id=d[1]; e.time=VLN_event.IST*1+d[2]*1000;
          e.type='o'; e.state=1; e.key=key;
          insertEvent(e,false);
         } else
         {
          e.key=key;
          if(e.time!=(VLN_event.IST*1+d[2]*1000))
           {
            deleteEvent(e.id,false);
            e.time=(VLN_event.IST*1+d[2]*1000);
            insertEvent(e,false);
           }
         }
       }
     for (var i = 0; i < Events.length; i++)
      {
       if(Events[i].type=='o' && Events[i].key!=key)
        {
         deleteEvent(Events[i].id,false); i--;
        } else {delete Events[i].key;}
      }
     var r=getEventbox();
//     if(r) r=r.rows;
//     if(r)
//     for(var i=0;i < r.length; i++)
//      {
       
//      }
     storeEvents();
    }
   function onAjax(e,xhr,settings)
    {
    //alert(settings.url);
     var fox=false;
     if (settings.url.indexOf("page=eventList&") == -1) {return;}
     if(xhr) checkOgEvents(xhr.responseText);
     if(!VLN_event.checkEventList)
      {
       try
        {
         VLN_event.checkEventList=checkEventList;
         checkEventList=function() {VLN_event.checkEventList(); VLN_event.deleteOld();};
        } catch(f) // Firefox 3.x
        {
         fox=true;
         setTimeout(function() {
           if(!VLN_event.checkEventList)
            {try{VLN_event.checkEventList=checkEventList;checkEventList=function() {VLN_event.checkEventList(); VLN_event.deleteOld();};} catch(f) {;}}
          },1000);
        }
      }
     var eh=byId("eventHeader");
     if(eh)
      {
       var sp=document.createElement("span");
       sp.style.fontSize="10px";
       sp.innerHTML="&nbsp;&nbsp;<a href='javascript:VLN_event.addWindow()'>Добавить</a>"+
       "&nbsp;&nbsp;&nbsp;<a href='javascript:VLN_event.showAll()'>Все</a>";
       eh.getElementsByTagName("h4")[0].appendChild(sp);
      }
     if(fox) setTimeout(function () {showEvents(false)},1100);
     else showEvents(false);
    }
   function getEventbox()
    {
     var eb=byId("eventboxContent");
     if(eb)
      {
       eb=eb.getElementsByTagName("table")[0];
       if(eb) eb=eb.getElementsByTagName("tbody")[0];
      }
     return eb;
    }
   function showEvents(all)
    {
     var eb=getEventbox();
     var row=0;
     for (var i = 0; i < Events.length; i++)
      {
       var e=Events[i];
       var tm=new Date; tm.setTime(e.time);
       var tms=twoDig(tm.getHours())+":"+twoDig(tm.getMinutes())+":"+twoDig(tm.getSeconds());
       if(e.co) var co=e.co.split(":"); else co=[];
       var sec=Math.round((e.time-getServerTime())/1000);
       if(!all && !mc_added)
        {
         if(e.moon1)
          {
           addMoonCountdown(e.moon1,sec);
           addMoonCountdown(e.moon2,sec);
          }
         if(e.planet) {addPlanetCountdown(e.planet,sec,e.data,e.nt);}
        }
       if(!all && e.type!='e') continue;
       if(byId("eventRow-x"+e.id)) continue;
       if(!eb) continue;
       var d=document.createElement("tr");
       d.className="eventFleet"; d.id="eventRow-x"+e.id;
       var html='<td class="countDown friendly textBeefy" id="counter-x'+e.id+'">xxx</td>'+
        '<td class="arrivalTime">'+tms+' '+LocalizationStrings.timeunits.short.hour+'</td>'+
        '<td class="missionFleet"></td>'+
        '<td class="originFleet">'+smallStr(e.pname,10)+"</td>"+
        '<td class="coordsOrigin"><a href="http://'+getByName("ogame-universe")+'/game/index.php?page=galaxy&galaxy='+co[0]+'&system='+co[1]+'"'+" target='_top'>["+e.co+']</a></td>'+
        '<td colspan=6>'+smallStr(e.data,28)+'</td>'+
        '<td><a href=\'javascript:VLN_event.del("'+e.id+'",true)\'><img src="http://ogame.hovrino.net/i/trash.gif"></a></td>';
       var ins=false;
       while(row < eb.rows.length)
        {
         if(timeInterval(eb.rows[row].getElementsByTagName("td")[0].innerHTML)>sec)
          {
           eb.insertBefore(d,eb.rows[row]); row++; ins=true; break;
          }
         row++;
        }
       if(!ins) {eb.appendChild(d);}
       d.innerHTML=html;
       new eventboxCountdown(byId("counter-x"+e.id), sec);
      }
     if(!all && !mc_added) mc_added=true;
    }
   function addMoonCountdown(id,sec)
    {
     var a=document.getElementsByClassName("moonlink");
     for(var i=0;i<a.length;i++)
      {
       if(a[i].href.indexOf("&cp="+id)>-1)
        {
         var sp=document.createElement("span");
         sp.className="vlnmnc";
         a[i].parentNode.appendChild(sp);
         new simpleCountdown(sp,sec,
          (function ()
            {
             sp.style.fontSize="14px"; sp.style.fontWeight="bold";
             sp.style.color="#FFFF00";
             setTimeout(function (){sp.parentNode.removeChild(sp);},2000);
            }));
        }
      }
    }
   function addPlanetCountdown(id,sec,data,nt)
    {
     var a=document.getElementsByClassName("planetlink");
     for(var i=0;i<a.length;i++)
      {
       if(a[i].href.indexOf("&cp="+id)>-1)
        {
         var sp=document.createElement("span");
         sp.className="vlnplc";
         sp.title=data;
         a[i].parentNode.appendChild(sp);
         new simpleCountdown(sp,sec,
          (function ()
            {
             sp.style.fontSize="14px"; sp.style.fontWeight="bold";
             sp.style.color="#FFFFFF";
             if(!nt) setTimeout(function (){sp.parentNode.removeChild(sp);},2000);
            }));
        }
      }
    }
   function onJumpgate(e,xhr,settings)
    {
     var b;
     if(b=settings.data.match(/zm=(\d+)\&/))
      {
       GM_setValue("VLNEvent.gate-"+PREF,getByName("ogame-planet-id")+"`"+b[1]+"`"+getByName("ogame-planet-coordinates")+"`"+getByName("ogame-planet-name"));
      }
    }
   function addGateEvent()
    {
     if(!VLN_event.IST) return;
     var jt=GM_getValue("VLNEvents.jumpTime-"+PREF,0);
     if(!jt) return;
     var d=new Date;
     GM_deleteValue("VLNEvents.jumpTime-"+PREF);
     jt=parseInt(jt)-(d.getTime()-VLN_event.IST);
     var a=GM_getValue("VLNEvent.gate-"+PREF,"").split("`");
     if(!a || !a[0] || !a[1]) return;
     var e=addEvent(jt*1+(60000*60/parseInt(getByName("ogame-universe-speed"))),a[3],a[2],"JumpGate");
     if(e) {e.moon1=a[0]; e.moon2=a[1]; e.type="moon"; storeEvents();}
    }
   function saveJumpTime()
    {
     var d=new Date;
     GM_setValue("VLNEvents.jumpTime-"+PREF,d.getTime());
    }
   function jumpToTarget()
    {
     var jt=GM_getValue("VLNEvents.jumpTime-"+PREF,0);
     if(jt)
      {
       var a=GM_getValue("VLNEvent.gate-"+PREF,"").split("`");
       if(!a) return;
       var page=document.location.href;
       page = page.replace("station", "fleet1");
       page = page.replace("&openJumpgate=1", "");
       if(page.indexOf("&cp=") > -1)
        {page=page.substr(0,page.indexOf("&cp="));}
       page = page + "&cp="+a[1];
       window.location=page;
      }
    }
   function decodeMessage()
    {
     if(url.indexOf("page=showmessage")==-1) return;
     var m=byId("messagebox");
     if(!m) return;
     var t=m.getElementsByClassName("infohead")[0].getElementsByTagName("table")[0].
      getElementsByTagName("tbody")[0];
     var subj=t.rows[2].getElementsByTagName("td")[0].innerHTML;
     if(subj=="Приглашение к совместной атаке")
      {
       var msg=m.getElementsByClassName("note")[0].innerHTML;
       var b;
       if(b=msg.match(/на миссию (.+) против игрока ([^ ]+) на планете.*\[(\d:\d+:\d+)\].*Прибытие флота назначено на (\d\d)\.(\d\d)\.(\d\d\d\d) (\d\d):(\d\d):(\d\d)/))
        {
         if(eventByTag(b[1])) return;
         var tm=new Date;
         tm.setFullYear(parseInt(b[6]));
         tm.setMonth(parseInt(b[5])-1);
         tm.setDate(parseInt(b[4]));
         tm.setHours(b[7]);
         tm.setMinutes(b[8]);
         tm.setSeconds(b[9]);
         addEvent(tm.getTime(),b[2],b[3],"САБ "+b[1]).tag=b[1]; storeEvents();
        }
      }
    }
   function postScript()
    {
     loadEvents();
     addGateEvent();
     testShipYard();
     var ec=byId("eventboxContent");
     if(ec && ec.style.display!='none' && getByName("ogame-version").match(/^4\./))
      {
       var s=new Object;
       s.url='page=eventList&';
       onAjax(undefined,undefined,s);
      }
     if(ec && ec.style.display=='none') showEvents(false);
    }
   function getServerTime()
    {
     var tm=new Date;
     return parseInt(VLN_event.IST)+(tm.getTime()-VLN_event.ILT);
    }
   function setGatePageCountdown()
    {
     if(!V2) return;
     var script = document.createElement('script');
     script.setAttribute("type", "application/javascript");
     script.textContent = "window.timerHandler = new TimerHandler();"+
     "var LocalizationStrings="+GM_getValue("VLN_Events.locale."+PREF,"")+";";
     document.body.appendChild(script);
     if(!eventsLoaded) loadEvents();
     var d=byId("jumpgate");
     if(d) d=d.getElementsByTagName("h2")[0];
     if(!d) return;
     for (var i = 0; i < Events.length ; i++)
      {
       if(Events[i].type!='e' && Events[i].type!='o') continue;
       var sec=Math.round((Events[i].time-getServerTime())/1000);
       var sp=document.createElement("span");
       sp.style.marginLeft="70px";
       d.appendChild(sp);
       new simpleCountdown(sp,sec,(function () { return; }));
       break;
      }
    }
   createWindow();
   decodeMessage();
   if(!GM_getValue("VLN_Events.locale."+PREF,""))
    {
     GM_setValue("VLN_Events.locale."+PREF,JSON.stringify(LocalizationStrings));
    }
   VLN_event.postScript=postScript;
   VLN_event.onAjax=onAjax;
   VLN_event.add=addEvent;
   VLN_event.del=deleteEvent;
   VLN_event.deleteOld=deleteOld;
   VLN_event.addWindow=showAddWindow;
   VLN_event.selCD=selCD;
   VLN_event.onJumpgate=onJumpgate;
   VLN_event.formSubmit=formSubmit;
   VLN_event.showAll=function() {showEvents(true);}
   VLN_event.saveJumpTime=saveJumpTime;
   VLN_event.jumpToTarget=jumpToTarget;
   VLN_event.autoS=autoS;
   VLN_event.getByName=getByName;
   VLN_event.setGatePageCountdown=setGatePageCountdown;
  }
 window.VLN_event=VLN_event;
 VLN_event();

  var scripts = document.getElementsByTagName('script');
  this.script = null;
  var a = new Date;
  VLN_event.ILT = a.getTime();
  VLN_event.IST=0;
  for (var i=0; i<scripts.length; i++)
   if (!scripts[i].src) {
   this.script = scripts[i];
   var b = this.script.innerHTML.match(/currTime\.setTime\(\((\d+)-startServerTime/i);
   if(b && 1 < b.length)
    {
     VLN_event.IST = b[1];
     VLN_event.script=this.script;
     VLN_event.postScript();
     break;
    }
   }
  if(!VLN_event.IST)
   {
    VLN_event.IST=VLN_event.getByName("ogame-timestamp")*1000;
    if(!VLN_event.IST) VLN_event.IST=0;
   }

 if(document.location.href.indexOf("page=jumpgate")>-1)
  {
   $("#jumpgate").ajaxSend(function(e,xhr,settings){
      VLN_event.onJumpgate(e,xhr,settings);
     });
   $("#jumpgate").ajaxSuccess(function(e,xhr,settings){
     var a=JSON.parse(xhr.responseText);
     if(a.status) VLN_event.saveJumpTime();
   });
   
   VLN_event.setGatePageCountdown();
  } else
  {
   $("#eventboxContent").ajaxSuccess(function(e,xhr,settings){
    VLN_event.onAjax(e,xhr,settings);
   });
   var OKResponse = document.getElementById('errorBoxNotifyOk');
   if(OKResponse)
    OKResponse.addEventListener("click", function(event)
     {VLN_event.jumpToTarget();},true);
  }
}
);