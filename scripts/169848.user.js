// ==UserScript==
// @name        喂怪快捷键
// @namespace   monFeed
// @author      ggxxsol
// @include     http://hentaiverse.org/?s=Bazaar&ss=ml&slot=*
// @exclude    http://hentaiverse.org/?s=Bazaar&ss=ml&slot=0
// @exclude    http://hentaiverse.org/?s=Bazaar&ss=ml&slot=*&pane=skills
// @version     1.4
// ==/UserScript==


nonno=document.location.href.match(/\d+/)
if (gift=document.getElementById('messagebox'))
{
		gift=gift.innerHTML.match(/Received [a-zA-Z \-]+/g)
		for (i = 0 ; i < gift.length ; i++ )
		{
		 gifts=gift[i].match(/Received ([a-zA-Z \-]+)/)[1]
			if(!localStorage.getItem("mon["+nonno+"]"))localStorage.setItem("mon["+nonno+"]",nonno+'号:<br>'); 
			temp=localStorage.getItem("mon["+nonno+"]")
			localStorage.setItem("mon["+nonno+"]",temp+gifts+'<br>'); 
		}
		temp=localStorage.getItem("mon["+nonno+"]")
}
if(!localStorage.getItem("mon["+nonno+"]"))localStorage.setItem("mon["+nonno+"]",nonno+'号:<br>'); 
temp=localStorage.getItem("mon["+nonno+"]")
giftlist = document.createElement("div");
giftlist.style.cssText = "font-size:13px;color:black; position:absolute; top:30px; left:1250px ;text-align:left";
giftlist.onclick=function (){localStorage.setItem("mon["+nonno+"]",nonno+'号:<br>');  }
giftlist.innerHTML=temp
document.body.appendChild(giftlist);
monfeed=document.getElementById('feed_pane')
if(monfeed){
	monHunger=monfeed.innerHTML.match(/This restores (\d+) hunger/)
	monMorale=monfeed.innerHTML.match(/Restores (\d+) morale/)
}
else	document.location='http://hentaiverse.org/?s=Bazaar&ss=ml&slot=1'
if (!monHunger)monHunger=[0,0]
if (!monMorale)monMorale=[0,0]
stat = document.createElement('div');
stat.innerHTML='下次喂食恢复:'+monHunger[1]+' <br>使用H. P.恢复:'+monMorale[1]+'<br>快捷键:<br>上一个:<<br>下一个:><br>喂食:/<br>快乐片:L'
stat.style.cssText = "font-size:15px; position:absolute; top:285px; left:180px ;text-align:left;color:red;";
   document.body.appendChild(stat);
document.addEventListener('keyup',function(e) {
	switch (e.which){
		case 188:   
		temp=document.location.href.match(/\d+/)
		temp=temp*1-1
		document.location='http://hentaiverse.org/?s=Bazaar&ss=ml&slot='+temp
		break
		case 190:  
		temp=document.location.href.match(/\d+/)
		temp=temp*1+1
		document.location='http://hentaiverse.org/?s=Bazaar&ss=ml&slot='+temp
		break
		case 76: 
		if (monMorale[1]<1500){alert("得不偿失了,不要喂药片了");break}
		if (monMorale[1]<6000&&confirm('只能恢复斗气值'+monMorale[1]+',仍要喂片吗?')){alert('好吧,这是你的选择,不过现在关掉本页面还来得及!');document.getElementById('food_action').value='happyhappyjoyjoy'; document.getElementById('food_form').submit()}
		else break		
		document.getElementById('food_action').value='happyhappyjoyjoy'; 
		document.getElementById('food_form').submit()
		break		
		case 191:
		if (monHunger[1]<300){alert("已经饱了!");break}
		document.getElementById('food_action').value='feedmax'; document.getElementById('food_form').submit()
		break
		}
},false);