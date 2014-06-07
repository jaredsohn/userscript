// ==UserScript==
// @name           Village Resources
// @namespace      http://horizon.vndv.com/travian
// @include        http://*.travian.*/*
// @uso:version 1.0
// @require http://sizzlemctwizzle.com/updater.php?id=74945
// ==/UserScript==

var avr={
progressImgs:"data:image/png;base64,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",
options: function(opt){
if(opt==false)
GM_deleteValue("TVR_options");
if(typeof(opt)==typeof([]))
GM_setValue("TVR_options",opt.join(".|."));
return GM_getValue("TVR_options","true.|.default").split(".|.");
},
gettime: function(sec){
var hour=0;
var min=0;
while(sec>=60){
min++;
sec=sec-60;
}
while(min>=60){
hour++;
min=min-60;
}
return hour+":"+(min<10?"0":"")+min+":"+(sec<10?"0":"")+sec;
},
starttimer: function(sec,ouin,id){
ouin[0]=(ouin[0]*1)+sec;
if(ouin[0]>ouin[1])
ouin[0]=ouin[1];
var text=Math.round(ouin[0])+"/"+Math.round(ouin[1]);
var perc=((ouin[1]-ouin[0])/ouin[1]);
var time=Math.round((ouin[1]-ouin[0])/sec);
document.getElementById(id).innerHTML='<img src="img/x.gif" class="r'+((id.split("l")[1]*-1)+5)+'"> '+text+' '+this.gettime(time);
if(time<=3600){
document.getElementById(id).setAttribute("style","width: 300px;height: 20px;margin-left: 3px; padding-left:3px; background: url(" + this.progressImgs + ") no-repeat -"+(300*perc)+"px -40px; color: #FFF;");
}else if(time<=10800){
document.getElementById(id).setAttribute("style","width: 300px;height: 20px;margin-left: 3px; padding-left:3px; background: url(" + this.progressImgs + ") no-repeat -"+(300*perc)+"px -20px; color: #000;");
}else{
document.getElementById(id).setAttribute("style","width: 300px;height: 20px;margin-left: 3px; padding-left:3px; background: url(" + this.progressImgs + ") no-repeat -"+(300*perc)+"px 0; color: #000;");
}
setTimeout(function(){avr.starttimer(sec,ouin,id)},1000);
},
loadres: function(vid,stat){
if(stat[0].getAttribute("class").match("dot")){
var surl=stat[1].getElementsByTagName("a")[0].getAttribute("href");
if(stat[0].getAttribute("class").match("hl")){
var a=[];
a[0]=document.getElementsByTagName("a");
a[1]=document.getElementsByTagName("area");
a[2]=document.getElementsByTagName("form");
for(e=0;e<a.length;e++){
for(i=0;i<a[e].length;i++){
if(a[e][i].getAttribute("action")!=null){
a[e][i].setAttribute("action",a[e][i].getAttribute("action")+"?newdid="+surl.split("newdid=")[1].split("&")[0]);
}else if(!a[e][i].getAttribute("href").match("newdid=")){
var nurl=a[e][i].getAttribute("href").split("?");
if(nurl.length==1)
nurl[1]="";
a[e][i].setAttribute("href",nurl[0]+"?newdid="+surl.split("newdid=")[1].split("&")[0]+"&"+nurl[1]);
}}}
return this.sendtimer(document,vid,stat);
}
this.getDOC(window.location.href.split("?")[0]+surl,function(doc){  avr.sendtimer(doc.documentElement,vid,stat); });
return true;
}},
getDOC: function(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
            var doc = document.implementation.createDocument('', '', null),
                html = document.createElement('html');
            html.innerHTML = responseDetails.responseText;
            doc.appendChild(html);
            callback(doc);
        }
    });
},
getbyid: function(data,id){
var tags=data.getElementsByTagName("*");
for(t=0;t<tags.length;t++){
if(tags[t].getAttribute("id")!=null){
if(tags[t].getAttribute("id")==id){
return tags[t];
}}}},
sendtimer: function(data,vid,stat){
for(i=0;i<4;i++){
var res=this.getbyid(data,"l"+(4-i));
var prod=res.getAttribute("title")/3600;
var ouin=res.innerHTML.split("/");
this.starttimer(prod,ouin,"v"+vid+"l"+(4-i));
}
return true;
},
init: function(){
GM_registerMenuCommand("All Villages Resources On/Off",function(){
var opts=avr.options("");
opts[0]=opts[0]=="false"?"true":"false";
avr.options(opts);
});
GM_registerMenuCommand("Change Progress Bar Image.",function(){
var opts=avr.options("");
var name=prompt("Village Resources Progress Bar use full url.(http://url) Set as 'default' otherwise.",opts[1]);
if(name!=null && name!="")
opts[1]=name;
avr.options(opts);
});
GM_registerMenuCommand("Reset Options.",function(){
avr.options(false);
});
document.getElementById("vlist").parentNode.style.width="310px";
var opt=this.options("");
if(opt[1]!="default")
this.progressImgs=opt[1];
var tro=document.getElementById("vlist").getElementsByTagName("tr");
for(p=0;p<tro.length;p++){
GM_log(p);
var tdo=tro[p].getElementsByTagName("td");
if(tdo.length>1){
if(tdo[0].getAttribute("class") != null){
if(tdo[0].getAttribute("class").match(opt[0]=="false"?"hl":"dot")){
for(i=0;i<4;i++){
var tr=document.createElement("tr");
var td=document.createElement("td");
td.setAttribute("id","v"+(1+p)+"l"+(4-i));
td.setAttribute("colspan","3");
td.innerHTML="Loading...";
tr.appendChild(td);
tro[p].parentNode.insertBefore(tr,tro[1+p]);
}
this.loadres(1+p,tdo);
}}}
GM_log(p);
}}
}
avr.init();