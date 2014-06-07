// ==UserScript==
// @name           RapidShare & HotFile dl manager
// @description    Click on free button and redirect your download when the time pass (RS & HotFile)
// @namespace      LocalHost
// @include        *
// @exclude        *rapidshare.com/cgi-bin/*
// ==/UserScript==

var winHandle='';
var resetWin=true;
var maxWinTime=360; //Reset the active window every x mins
var checkDL=true;
var dlMaxTime=180; //Reset the download permit every x mins
var loaderXtitle=" {RS mgr}"; //Don't put double space in the front

var winID='',iHandler=0;
setWinId();

onGlobalExit(function(){
GM_setValue('winIDs', '');
});

setInterval(function(){
//resetTitleIds();
previousWin();
if(resetWin) errorResetWin();
if(!GM_getValue('loaded', false))
{
loadMgrSets();
initMgr();
}
}, 35000);

GM_registerMenuCommand('Add RS links', AddRSlinks);


var sleepTime,i;
var waitError={
"3":5,  //minutes to wait if the ip is already downloading (in minutes)
"4":2,  //No free slots for country (in minutes)
"5":2,  //No free slots for free users (in minutes)
"-1":4}; //Unknown error (in minutes)

window.addEventListener('load', function()
{
var host=new Array();
var f=new Array();
host.push("rapidshare.com");f.push(_0);
//host.push("hotfile.com");f.push(_1);
var index=arraySearch(host, document.location.hostname);
if(index>-1) f[index]();
}, false);

function _0()
{
var message,execute=true,f;
var freeB=firstXPathResult('//input[@value="Free user"]');
if(freeB){
freeB.click();
} else { 
GM_setValue('dlStartTime', String(getTime()));
GM_setValue('dl', true);
window.addEventListener('unload', function(){
if (document.title.indexOf('Ticket ready')>-1) LinkRemover();
}, false)
f=function(){clearInterval(i);document.location='http://rapidshare.com'+document.location.pathname+'#rsMGR'};
var _ErrorArray=messages=new Array;
var messages=new Array;
_ErrorArray.push("Advanced download settingsDownload");messages.push("Ticket ready");
_ErrorArray.push("seconds remaining");messages.push("DL waiting, ready in: ~");
_ErrorArray.push("Or try again in");messages.push("Limitations, retry in: ");
_ErrorArray.push("Your IP");messages.push("Already Downloading, wait: ");
_ErrorArray.push("no available slots for free users");messages.push("Lack of Slots, retry in: ");
_ErrorArray.push("Currently a lot of users");messages.push("Lack of Slots, retry in: ");
_ErrorArray.push("This limit is reached.");messages.push("Can't download the file");
try
{
if(!document.querySelector) error=firstXPathResult("/html/body/center/div[2]/div/p[2]").textContent
else error=document.querySelector("div .klappbox>*:nth-child(2)").textContent;
}catch(e){
document.title='File does not Exist';
LinkRemover(true);
return
}
var code=arraySearch(_ErrorArray, error);
switch (code)
{
case 0:
document.title=messages[code];
document.location=$('dl').childNodes[0].action;
clearInterval(i);
execute=false;
setTimeout(function(){LinkRemover()}, 20000);
break;

case 1:
var zeit=$('zeit');
if (zeit) sleepTime=parseInt(zeit.innerHTML, 10);
sleepTime=sleepTime?sleepTime:0;
f=function(){clearInterval(i);_0()};
break;

case 2:
var ind=error.indexOf('in about ');
sleepTime=parseInt(error.substr(ind+8))*60;
if(sleepTime>0x78) sleepTime-=0x3C; //if minutes are > 2 then subtract 1 minutes from the time.(it is always end faster than it say)
break;

case 6:
document.title=messages[code];
execute=false;
LinkRemover(true);
break;

case 3:
case 4:
case 5:
default:
sleepTime=waitError[String(code)]*60;
}
if(execute){
mes=(code>-1)?messages[code]:"Unknown Error: ";
setTimeout(f, sleepTime*1000);
setI(function(){document.title=mes + fixT(sleepTime);--sleepTime}, 1);
}
}
}

function _1() //hotfile.com
{
var freeB=firstXPathResult('//input[@class="disabled" and @type="button"]');
if (freeB){
GM_addStyle('input.disabled {text-decoration: none}');
}else{
var freeB=firstXPathResult('//input[@onclick="starttimer();"]');
}
if(freeB){
//Henry 'Pi' James o Idea
firstXPathResult('//input[@name="tm"]').value='1245072880'; 
firstXPathResult('//input[@name="tmhash"]').value='e5b845119f0055c5d8554ee5f2ffc7b2d5ef86d7';
firstXPathResult('//input[@name="wait"]').value='30';
firstXPathResult('//input[@name="waithash"]').value='3bf07c5d83f2e652ff22eeaee00a6f08d4d2409a';
$('f', true).submit();
} else {
document.location=(firstXPathResult('//a[contains(@href,"/get/")]').href);
}
}

function arraySearch(array, value)
{
for (var i=0;i<array.length;i++) if(value.indexOf(array[i])>-1) return i;
return -1;
}

function fixT(secc)
{
if(secc<0) return;
var h,m,s,hstr='',mstr='',str;
h=parseInt(secc/3600);
m=parseInt((secc % 3600) / 60);
s=secc % 60;
if (h!=0) hstr=h+':';
if (m!=0 || h!=0) mstr=m + ':';
if (m<10 && h!=0) mstr='0'+mstr;
if (s<10 && (m!=0 || h!=0)) s='0'+s; 
return hstr + mstr + s;
}

function setI(func, secconds)
{
i=setInterval(func, secconds*1000);
}

function $(id, name)
{
name = typeof(name) != 'undefined' ? name : false;
if (!name){
return document.getElementById(id);
} else { return document.getElementsByName(id)[0] };
}

function firstXPathResult(xpath, against)
{
against = (typeof against == 'undefined')?document:against;
return document.evaluate(xpath, against, null, 9, null).singleNodeValue;
}

function initMgr()
{
document.title+=loaderXtitle;
iHandler=setInterval(page, 30000);
}

function page()
{

if(checkDL) errorResetDl();
if(GM_getValue('dl')) return
clearwinHandle();
var links=GM_getValue('rsLinks','');
if(!links) return
link=links.split(/;/);
if(link){
GM_setValue('dl', true);
winHandle=window.open(link[0]+'#rsMGR');
GM_setValue('tempLink', link[0]);
}
}

function clearwinHandle()
{

if(winHandle)winHandle.close();
winHandle='';

}

function AddRSlinks()
{
var center=new Array(self.innerHeight/2,self.innerWidth/2);
var autoDestroy=function(){
var b=document.body;
b.removeChild($('_rsDiv'));
};
var button1=create('input', {type:'button', value:'Save', style:'position:fixed;width:60px;height:24px;top:'+parseInt(center[0]+150)+'px;left:'+ parseInt(center[1]-300)+'px;', onclick:function(){
var text=$('_rsTextArea').value;
var totalLinks=GM_getValue('rsLinks', '');
var seperate=text.split(/\n/im);
var n='';
for each(var link in seperate)
{
if(link && n.indexOf(link)<0) if(isRsLink(link)) n+=link+';';
}
GM_setValue('rsLinks', n);
autoDestroy()
}});
var button2=create('input', {type:'button', value:'Cancel', style:'position:fixed;width:60px;height:24px;top:'+parseInt(center[0]+150)+'px;left:'+ parseInt(center[1]-240)+'px;', onclick:function(){
autoDestroy()
}});
var input=create('textarea', {id:'_rsTextArea', style:'color:blue;border:red solid thin;background:#909090;position:fixed;height:300px;width:600px;top:'+parseInt(center[0]-150)+'px; left:'+ parseInt(center[1]-300)+'px;',value:GM_getValue('rsLinks','').replace(/;/g, "\n")});
input.setAttribute('wrap', 'off');
var div=create('div', {id:'_rsDiv', style:'opacity: 0.35', onmouseover:function(){this.style.opacity='0.95'}, onmouseout:function(){this.style.opacity='0.4'}});
div.appendChild(input);
div.appendChild(button1);
div.appendChild(button2);
document.body.appendChild(div);
input.focus();
}

//check if the initiated time of mgr. If is bigger than 5 minutes then it auto reset mgr window. Currently disabled.
//It is useful when the key is not modified correctly, by preventing the mgr to never be loaded.
function errorResetWin() 
{
if(GM_getValue('loaded') && (getTime()-parseInt(GM_getValue('TimeLoaded', 0))>maxWinTime*60*1000)) uLoadMgrSets();
}

function errorResetDl() 
{
if(GM_getValue('dl') && (getTime()-parseInt(GM_getValue('dlStartTime', 0))>dlMaxTime*60*1000)) LinkRemover(true);
}

function uLoadMgrSets()
{
clearInterval(iHandler);
GM_setValue('loaded', false);
GM_deleteValue('TimeLoaded');
GM_setValue('prevWinId', GM_getValue('WinId', ''))
GM_deleteValue('WinId');
}

function loadMgrSets()
{
GM_setValue('loaded', true);
GM_setValue('TimeLoaded', String(getTime()));
GM_setValue('WinId', winID);
window.addEventListener('unload', uLoadMgrSets, false);
}

function removeFirst()
{
var x=GM_getValue('rsLinks','');
var s=x.split(/;/g);
var n='';
for (var i=1;i<s.length-1;i++) n+=s[i]+';';
GM_setValue('rsLinks', n);
}

function getTime()
{
return new Date().getTime()
}

function isRsLink(link)
{
if(/(htt(p|ps):\/\/)?rapidshare.com\/files\/\d+\//im.test(link)) return true;
return false;
}

function LinkRemover(log)
{
GM_setValue('dl', false);
if(GM_getValue('tempLink', '').indexOf(document.location.pathname.replace(/#rsMGR/,''))>-1)
{
if(log) GM_setValue('errorLinks', GM_getValue('errorLinks', '')+';'+GM_getValue('tempLink', ''));
removeFirst();
GM_setValue('tempLink', '');
}
}

function setWinId(){
var exist=GM_getValue('winIDs', '_')+','.indexOf(','+winID+',')>-1?true:false;
if(exist || parent.top!=this) return;
var registeredIds=GM_getValue('winIDs', ',')+',';
var currNum=1;
var found=false;
while (!found){

if(registeredIds.indexOf(','+currNum+',')==-1){
found=true;
GM_setValue('winIDs', registeredIds+currNum);
winID=currNum;
}
currNum++;
}
f=function(){GM_setValue('winIDs', GM_getValue('winIDs', '').replace(new RegExp(','+winID+'(?=,|$)'), ''))};
window.addEventListener('unload', f, false);

}

function previousWin()
{
if(parseInt(GM_getValue('prevWinId', ''))==winID && document.title.indexOf(loaderXtitle)>-1){
document.title=document.title.substr(0,document.title.indexOf(loaderXtitle));
}
if(parseInt(GM_getValue('prevWinId',''))==winID) GM_deleteValue('prevWinId');
}

function create(a,b) {
	if(!a || a=="" || !b) return;
	var ret=typeof a=='object'?a:document.createElement(a);
	for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for each(var p in prop) ret.appendChild(p);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop)!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	return ret;
}

function onGlobalExit(func) //When multiple tabs are closed the func is executed
{
GM_setValue('execute', true);
window.addEventListener('unload', function(){

if(!GM_getValue('execute', false)) return;
if(GM_getValue('timeOfEnd', '_')=='_') GM_setValue('timeOfEnd', String(new Date().getTime()));
else {
var dt=new Date().getTime()-parseInt(GM_getValue('timeOfEnd', '_'))
GM_setValue('timeOfEnd', String(new Date().getTime()));
if (dt<50){
GM_deleteValue('timeOfEnd');
GM_setValue('execute', false);
func();
}
}

}, false);
}