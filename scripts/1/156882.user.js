// ==UserScript==
// @name	经验获得效率计算
// @namespace	hentaiversegamejc
// @match	http://hentaiverse.org/?s=Battle*
// @version	1.52
// @author	ggxxsol
// ==/UserScript==

if(localStorage.totalExp==undefined){
localStorage.totalExp=0
localStorage.expRate=0
localStorage.totalExpRate=0
localStorage.ntime1=1
}

//alert(document.getElementById('monsterpane')!=null)
if(document.getElementById('monsterpane')&&localStorage.meiyoukaishi==1)
{
		localStorage.meiyoukaishi=2
		starttime()        ///开始计时
}



if(money=document.querySelector(".btcp"))
{	
	timecha()
		
		localStorage.meiyoukaishi=1
	getExp=money.innerHTML.match(/gain (\d+) exp/)  //获取经验值
	localStorage.totalExp=localStorage.totalExp*1+getExp[1]*1
	localStorage.expRate=localStorage.expRate*1+getExp[1]*1


	expde=document.querySelector(".clb").innerHTML //获取面板经验
	cexp=expde.match(/Current exp.+[^.].+/)
	needExp=expde.match(/To next level.+[^.].+/)
	cexp=cexp[0].match(/>([0-9,]+)/)
	needExp=needExp[0].match(/>([0-9,]+)/)
	cexp=cexp[1].replace(/,/g,'')						//cexp现在的经验
	needExp=needExp[1].replace(/,/g,'')       //needExp所需经验
	totalExpPane=cexp*1+needExp*1     //totalExp面板总经验
	localStorage.needExpRate=(needExp*100/totalExpPane).toFixed(2)//所需经验百分比
	
	//经验值计算
	//经验值单位换算
	if (localStorage.totalExp>1000000000)
	{
			localStorage.totalExpShow=(localStorage.totalExp/1000000000).toFixed(2)
			localStorage.danWei="Bexp"
	}
	else if (localStorage.totalExp>1000000)
	{
			localStorage.totalExpShow=(localStorage.totalExp/1000000).toFixed(2)
			localStorage.danWei="Mexp"
	}
	else if (localStorage.totalExp>1000)
	{
			localStorage.totalExpShow=(localStorage.totalExp/1000).toFixed(2)
			localStorage.danWei="Kexp"
	}
	else {
			localStorage.totalExpShow=localStorage.totalExp
			localStorage.danWei="exp"
	}

	//经验效率计算
	localStorage.expRate=((localStorage.totalExp/1000)/(localStorage.ntime1/60)).toFixed(2)//经验数值
	localStorage.totalExpRate=(localStorage.expRate*100000/totalExpPane).toFixed(2)//经验百分比

}



charapan = document.createElement("a");
aaa=localStorage.ntime1/60
aaa=aaa.toFixed(0)
charapan.style.cssText = "font-size:15px; cursor:pointer"
charapan.onclick = qingling
charapan.style.cssText = "font-size:15px;color:black; position:absolute; top:520px; left:1250px ;text-align:left";
charapan.innerHTML='经验:<br>总共:'+localStorage.totalExpShow+localStorage.danWei+'<br>还需:'+localStorage.needExpRate+'%'+
										'<br>效率:'+localStorage.expRate+'K/M<br>折合:'+localStorage.totalExpRate+'%/M'+
										'<br>时间:<br>上局:'+localStorage.ntime12+'秒<br>总共:'+(localStorage.ntime1/60).toFixed(0)+'分<br>升级需:'+(localStorage.needExpRate/localStorage.totalExpRate).toFixed(0)+"分"

document.body.appendChild(charapan);

////////////获取时间
function starttime(){
var stime=new Date()
shour=stime.getHours()
smin=stime.getMinutes()
ssec=stime.getSeconds()
localStorage.stime1=shour*3600+smin*60+ssec
}
/////////过关时间
function timecha(){

	var ntime=new Date()   //获取结束时间
	nhour=ntime.getHours()
	nmin=ntime.getMinutes()
	nsec=ntime.getSeconds()
	localStorage.ntime12=nhour*3600+nmin*60+nsec-localStorage.stime1*1
	if(localStorage.ntime12<0)localStorage.ntime12=localStorage.ntime12*1+86400   //超过24点
	localStorage.ntime1=localStorage.ntime1*1+localStorage.ntime12*1		//总时间
	localStorage.stime1=nhour*3600+nmin*60+nsec		//每场时间
}
function qingling(){
localStorage.totalExp=0
localStorage.expRate=0
localStorage.totalExpRate=0
localStorage.ntime1=1
var stime=new Date()
shour=stime.getHours()
smin=stime.getMinutes()
ssec=stime.getSeconds()
localStorage.stime1=shour*3600+smin*60+ssec
charapan.innerHTML='经验:<br>总共:'+localStorage.totalExpShow+localStorage.danWei+'<br>还需:'+localStorage.needExpRate+'%'+
										'<br>效率:'+localStorage.expRate+'K/M<br>折合:'+localStorage.totalExpRate+'%/M'+
										'<br>时间:<br>上局:'+localStorage.ntime12+'秒<br>总共:'+(localStorage.ntime1/60).toFixed(0)+'分<br>升级需:'+(localStorage.needExpRate/localStorage.totalExpRate).toFixed(0)+"分"

//location.reload()
}