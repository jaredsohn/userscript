// ==UserScript==
// @name				状态警告
// @namespace   hvztjg
// @match				http://hentaiverse.org/?s=Battle*
// @version          1.2
// @author           ggxxsol
// ==/UserScript==

hp=40          //弹窗警告阈值,当三围某数值低于一定值时,会给与弹窗警告,默认是20,hp/mp/sp任意数值少于20%时发出警告
mp=10
sp=30
hzjg=0.2          //红字警告,当一回合内hp收到一定伤害以上时,会给予红字显示,默认0.2,即被打掉20%以上的hp的话,就变红字了,法师可以调高一些,否则次次都是红吧....

if(!document.getElementById("monsterpane"))return
if(localStorage.hp==undefined){
localStorage.hp=0
localStorage.mp=0
localStorage.sp=0
}
var bbb = new Array();
var a = new Array();
zhuangtai()
cldpan = document.createElement("div");
cldpan.innerHTML='HP:'+localStorage.hpb+'/'+a[0]+'%<br>MP:'+localStorage.mpb+'/'+a[1]+'%<br>SP:'+localStorage.spb+'/'+a[2]+'%'
 cldpan.style.cssText='position:absolute; top:200px; left:700px;text-align:left;font-size:15px';
if (jinggao==1) cldpan.style.cssText += "color:red; ";
document.body.appendChild(cldpan);
function zhuangtai(){
aaa=document.querySelector(".clb").innerHTML
aaaa=aaa.match(/\d{1,5} \/ \d{1,5}/g)
if(aaaa.length!=3) aaaa.splice(0,1)
for(i=0;i<3;i++){
ccc=aaaa[i].match(/\d{1,5}/g)
bbb=bbb.concat(ccc)
}
localStorage.hpb=bbb[0]-localStorage.hp
localStorage.mpb=bbb[2]-localStorage.mp
localStorage.spb=bbb[4]-localStorage.sp
localStorage.hp=bbb[0]
localStorage.mp=bbb[2]
localStorage.sp=bbb[4]
 jgao=0
for(i=0;i<3;i++){
a[i]=(bbb[2*i]/bbb[2*i+1]*100).toFixed(0)
}
if(a[0]<hp) jgao=1
if(a[1]<mp) jgao=1
if(a[2]<sp) jgao=1
if(localStorage.hpb/bbb[1]<-hzjg)	jinggao=1
	else jinggao=0
if(jgao==1&&localStorage.vtjg==0) {
		alert("注意状态!")
		localStorage.vtjg=1
	}
	else localStorage.vtjg=0
return
}