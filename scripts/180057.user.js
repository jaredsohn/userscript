// ==UserScript==
// @name        sc2tv_chat_admin
// @namespace   sc2tv_chat_admin
// @include     http://chat.sc2tv.ru/index.htm
// @version     4.1
// @grant       none
// @run-at      document-start
// ==/UserScript==
window.stop();
var canv=[1220,50,0,0], chnls={};
var CHAN_LIST_REFRESH=600000;//интервал обновления названий каналов и ников стримеров
var MESSAGE_REFRESH=60000;//интервал обновления сообщений
var CHAT_MESSAGE_REFRESH=5000;//интервал обновления сообщений в конкретном чате
//Избранные сктримеры англ. буква с + id
var fav={'c77876':1,'c38809':1,'c18866':1,'c45334':1,'c87917':1,'c29418':1,'c24185':1,'c43245':1,'c50716':1,'c116621':1,'c118729':1,'c67210':1,'c118612':1}
getcl();
document.querySelector('html').appendChild(document.createElement('body'));
with(document.body.style){margin='0 0 0 2px';backgroundColor='black';color='white';fontFamily='Andale Mono';fontSize='12px'}
var maxMessCount=0, bOb=[], last=[0], graph=false, chanCount=0, log=[], chatTimer=-1, span, chanMessNum=0, chn={}, cnvs=document.createElement('CANVAS'), div1=document.createElement('DIV'), div3=document.createElement('DIV'), div2=document.createElement('DIV'), cReq=-1;
cnvs.setAttribute('width',canv[0]);cnvs.setAttribute('height',canv[1]);document.body.appendChild(cnvs);
/*cnvs.onclick=function(){
	var див=document.createElement('INPUT');
	див.setAttribute('type','text');
	див.style.position='fixed';див.style.top='0';див.style.left='0';
	див.onclick=function(){this.parentNode.removeChild(this)}
	див.value=JSON.stringify(megalog);
	document.body.appendChild(див);
	див.focus()
}*/
cnvs.onmouseover=function(){div2.style.display='block'}
cnvs.onmouseout=function(){div2.style.display='none'}
cnvs.onmousemove=function(e){
	if(log.length>0){
		var x=Math.floor(e.layerX/canv[2]);
		div2.textContent=log[x][1]+', +'+log[x][0]+', '+bOb[x]
	}
}
var canvas=cnvs.getContext('2d');
with(div2.style){fontSize='14px';border='3px solid #444';position='absolute';right='0';top='52px';backgroundColor='black';display='none'}
with(div3.style){fontSize='10px';borderLeft='3px solid #444';position='absolute';zIndex='1';width='800px';top='51px';right=0;backgroundColor='black'}
div3.onclick=function(){chatTimer=-1;this.innerHTML=''}
document.body.appendChild(div1);document.body.appendChild(div2);document.body.appendChild(div3);
var reg1=/<b>.+<\/b>,/i, reg2=/:s:[a-z]+:/gi, reg0=/[a-zа-я]+/i, сява=/<b>(.+)<\/b>,/;
function getc(c){if(chnls['c'+c]==undefined)return adLen(c+'',15);return '<span'+(fav['c'+c]?' style="color:red"':'')+'>'+adLen(chnls['c'+c][0]+'',15)+'</span>'}
function getcn(c){if(chnls['c'+c]==undefined)return c;return chnls['c'+c][0]}//получить имя стримера по айди
function getct(c){if(chnls['c'+c]==undefined)return 'link';return chnls['c'+c][1]}//получить заголовок стрима по айди
function adLen(s,l){if(s.length>l)s=s.substr(0,l);return s+new Array(l-s.length+1).join('&nbsp;')}//для выравнивания столбцов
function getcl(){//обновление списка каналов
	var requ=new XMLHttpRequest(), url='http://chat.sc2tv.ru/memfs/channels.json';
	requ.open("GET",url,true);
	requ.onreadystatechange=function(){
		if(requ.readyState==4){
			if(requ.status==200){
				chnls={};
				var resp=JSON.parse(requ.responseText).channel;
				for(var x=resp.length;--x>-1;){
					if(resp[x].channelId=='0')chnls['c0']=['MAIN','MAIN'];
					else chnls['c'+resp[x].channelId]=[resp[x].streamerName,resp[x].channelTitle]
				}
				for(key in chn){chn[key].link=getct(chn[key].cid);chn[key].name=getc(chn[key].cid)}
			}
		}
	}
	requ.send(null);
	setTimeout(getcl,CHAN_LIST_REFRESH)
}
function getm() {//обновление сообщений
	var requ=new XMLHttpRequest(), url='http://chat.sc2tv.ru/memfs/channel-moderator.json';
	requ.open("GET", url, true);
	requ.onreadystatechange=function(){
		if(requ.readyState==4){
			if(requ.status==200){
				var dt=new Date();
				var dta=[dt.getHours(),dt.getMinutes()];
//				console.log(dt.getSeconds())
				cReq++;
				var resp=JSON.parse(requ.responseText).messages, count=200;
				if(cReq>0){
					count=resp[0].id-chanMessNum;
					if(count>canv[3])canv[3]=count
				}
				for(var x=0, cid, s;x<resp.length;x++){
					if (chanMessNum<resp[x].id){
						cid='c'+resp[x].channelId;
						if (chn[cid]==undefined){
							chn[cid] = {'users':{},'tl':[0,0,0,0,0],'pa':0,'chr':[0,0,0,0],'ws':0,'add':0,'o':0, 'q':0,'nm':0,'c':0,'id':0, 'cid':resp[x].channelId, 'date':0, 'name':getc(resp[x].channelId), 'link':getct(resp[x].channelId)};
							if(cReq>0){
								chn[cid].add=totwo(dta[0])+':'+totwo(dta[1]);
								adLog('_____|<span style="color:green">Добавлен</span>: '+getc(resp[x].channelId))
							}
							chanCount++
						}
						if(cReq>0){
							if(resp[x].channelId!='0'){
								if(сява.test(resp[x].message)){//если есть <b>
									if(resp[x].message.match(сява)[1]==getcn(resp[x].channelId))chn[cid].chr[1]++//если обращаются к стримеру то inc
								}
							}
							s=resp[x].message.replace(reg1,'').replace(reg2,'');//Удаляем <b> и смайлы
							if(reg0.test(s)){chn[cid].ws++;chn[cid].chr[0]++}//если есть буквы то inc
							chn[cid].users['u'+resp[x].uid]=cReq;
							chn[cid].nm++;chn[cid].c++;
							chn[cid].tl[0]=Math.round(100/chn[cid].c*chn[cid].chr[0]);//int
							chn[cid].tl[1]=Math.round(100/chn[cid].c*chn[cid].chr[1]);//dia
							chn[cid].tl[3]=Math.round(100/chn[cid].nm*chn[cid].ws);//per min int
						}
						if(chn[cid].id<resp[x].id){chn[cid].id=resp[x].id;chn[cid].date=resp[x].date}
					}
				}
				chanMessNum=resp[0].id;
				if(cReq>0){
					for(key in chn){
						if(chn[key].c>maxMessCount)maxMessCount=chn[key].c;
						for(k in chn[key].users){
							if(cReq-chn[key].users[k]>9)delete chn[key].users[k];
						}
						var anl=[0,0];
						for(k in chn[key].users){anl[0]+=cReq-chn[key].users[k];anl[1]++}
						if(anl[1]==0)chn[key].tl[2]=0;
						else chn[key].tl[2]=Math.round(10*(10-anl[0]/anl[1]));//per min act
						chn[key].q++;
						chn[key].chr[2]++;
						chn[key].chr[3]+=chn[key].tl[2];
						chn[key].tl[2]=Math.round(chn[key].chr[3]/chn[key].chr[2])//act
						chn[key].tl[4]=Math.round(chn[key].c/chn[key].q);//avarage mes
					}
					log.push([count,dta[0]+':'+totwo(dta[1])]);
					var dtc=dta[0]*60+dta[1];
					if(megalog[dtc]==undefined)megalog[dtc]=[0,0];
					megalog[dtc][0]++;
					megalog[dtc][1]+=count;
					megalog[dtc][2]=megalog[dtc][1]/megalog[dtc][0];
					if(graph)makeGraph()
				}
				div1.innerHTML='';
				var max=[0,'',0,0];
				for(key in chn){
					if(chn[key].nm>max[0])max=[chn[key].nm,chn[key],chn[key].ws];
					if(chn[key].nm==0)chn[key].o++;
					else chn[key].o=0;
					if(chn[key].o>10){adLog((chn[key].add!=0?chn[key].add:'_____')+'|<span style="color:red">Удаление</span>: '+getc(chn[key].cid)+' ('+chn[key].c+')');delete chn[key];chanCount--}
					else {
						span=document.createElement('SPAN');
						span.innerHTML=chn[key].date+'|'+(chn[key].add!=0?chn[key].add:'_____')+'|<span'+kpacka(chn[key].tl[0],100)+'>'+adLen(chn[key].tl[0]+'%',4)+'</span>|<span'+kpacka(chn[key].tl[1],100)+'>'+adLen(chn[key].tl[1]+'%',4)+'</span>|<span'+kpacka(chn[key].tl[2],100)+'>'+adLen(chn[key].tl[2]+'%',4)+'</span>|'+chn[key].name+'|<span'+kpacka(chn[key].c,maxMessCount)+'>'+adLen(chn[key].c+'',5)+'</span>'+adLen('('+chn[key].tl[4]+')',5)+(chn[key].nm>0?'<span style="color:green">'+adLen('+'+chn[key].nm+'|'+chn[key].tl[3]+'%',9)+'</span>':adLen('',9))+' <a style="color:dodgerblue" href="http://sc2tv.ru/node/'+chn[key].cid+'">'+chn[key].link+'</a><br>';
						span.setAttribute('alt',chn[key].cid);
						span.style.cursor='pointer';
						span.onclick=function(){chatTimer=this.getAttribute('alt');getm2()}
						span.onmouseover=function(){
							var cid='c'+this.getAttribute('alt');
							div2.innerHTML=getcn(chn[cid].cid)+'<br>intellect <progress value="'+chn[cid].tl[0]+'" max="100"></progress><br>dialogue&nbsp; <progress value="'+chn[cid].tl[1]+'" max="100"></progress><br>activity&nbsp; <progress value="'+chn[cid].tl[2]+'" max="100"></progress>';
							div2.style.display='block'
						}
						span.onmouseout=function(){div2.innerHTML='';div2.style.display='none'}
						if((chn[key].nm>0)&&(cReq>0))div1.insertBefore(span,div1.children[0]);
						else div1.appendChild(span);
						chn[key].nm=0;chn[key].ws=0
					}
				}
				if(cReq>0){
					bOb.push(getcn(max[1].cid)+' +'+max[0]+'|'+Math.round(100/max[0]*max[2])+'%'+'[~'+Math.round(max[1].c/max[1].q)+']/'+max[1].c);
					document.title=bOb[bOb.length-1]+'(+'+count+')'+(max[1].link!='link'?' '+max[1].link:'');
				}

				span=document.createElement('SPAN');
				span.innerHTML='<u>'+adLen('('+chanCount+') Date '+dta[0]+':'+dta[1]+':'+dt.getSeconds(),25)+'|inte|dial|acti|'+adLen('Channel Id',15)+'|Messages (+'+count+')['+cReq+']</u><br>';
				div1.insertBefore(span,div1.children[0])
			}
		}
	}
	requ.send(null);
	last[1]=(new Date()).getTime();
	if(last[0]==0)last[2]=0;
	else last[2]=last[1]-last[0]-MESSAGE_REFRESH+last[2];
	last[0]=last[1];
	setTimeout(getm,MESSAGE_REFRESH-last[2]);
//console.log('start '+(new Date()).getSeconds())
}
function getm2(){//обновление сообщений в выбранном чате
	if(chatTimer==-1)return;
	var requ=new XMLHttpRequest(), url='http://chat.sc2tv.ru/memfs/channel-'+chatTimer+'.json';
	requ.open("GET", url, true);
	requ.onreadystatechange=function(){
		if(requ.readyState==4){
			if(requ.status==200){
				var resp=JSON.parse(requ.responseText).messages, str='';
				for(var x=0,s;x<resp.length;x++){
					s=resp[x].message.replace(reg1,'').replace(reg2,'');
					if(reg0.test(s))str+=resp[x].date+'|<u>'+resp[x].name+'</u>:'+resp[x].message+'<br>';
					else str+='<span style="color:red">'+resp[x].date+'|<u>'+resp[x].name+'</u>:'+resp[x].message+'</span><br>';
				}
				div3.innerHTML='<b>'+chatTimer+'</b><br>'+str
			}
		}
	}
	requ.send(null);
	setTimeout(getm2,CHAT_MESSAGE_REFRESH)
}
function makeGraph(){//построить верхний график
	var temp, yl=[];
	canv[2]=canv[0]/log.length;
	canvas.fillStyle='black';canvas.fillRect(0,0,canv[0],canv[1]);
	for(var x=0;x<log.length;x++)yl[x]=log[x][0];
	var a=[[1,log.length,1],[log.length-2,0,-1],[log.length-2,0,-1],[1,log.length,1]];
	for(var z=0;z<4;z++){
		for(var x=a[z][0],y;;x+=a[z][2]){
			if((a[z][2]==1)&&(x>=a[z][1]))break;
			else if((a[z][2]==-1)&&(x<=a[z][1]))break;
			y=(yl[x]-yl[x-a[z][2]])/2;
			yl[x-a[z][2]]+=y;
			yl[x]-=y
		}
	}
	for(var x=0,t,v=canv[1]/canv[3],z;x<log.length;x++){
		z=canv[2]*x;
		t=v*log[x][0];canvas.fillStyle='rgb(100,0,0)';canvas.fillRect(z,canv[1]-t,canv[2],t);
		t=v*yl[x];canvas.fillStyle='orange';canvas.fillRect(z,canv[1]-t,canv[2],t);
		if((x%10==0)&&(x>0)){canvas.strokeStyle='#444';canvas.beginPath();canvas.moveTo(z,0);canvas.lineTo(z,canv[1]);canvas.stroke();canvas.closePath()}
		if(x%60==0){canvas.strokeStyle='yellow';canvas.strokeText(log[x][1],z,10)}
		if(log[x][0]==canv[3])temp=x
	}
	canvas.strokeStyle='blue';canvas.strokeText('max'+Math.round(log[temp][0]),canv[2]*temp,48);
	canvas.strokeStyle='#444';canvas.beginPath();canvas.moveTo(0,canv[1]/2);canvas.lineTo(canv[0],canv[1]/2);canvas.stroke();canvas.closePath()
}
function totwo(d) {return ((d+'').length==1?'0'+d:d)}
function kpacka(c,l){//окрашивание цифры
	if (c>l) var t=0;
	else var t=Math.round(255-(255*(c/l)));
	return ' style="color:rgb(255,'+t+','+t+')"'
}
getm();
var grBut=document.createElement('BUTTON');grBut.textContent='off';
grBut.style.height='19px';grBut.style.width='19px';grBut.style.position='absolute';grBut.style.top='0';grBut.style.right='0';grBut.style.fontSize='9px';grBut.style.padding='0';
grBut.onclick=function(){graph=!graph;if(graph){this.textContent='on';makeGraph()}else this.textContent='off'}
document.body.appendChild(grBut);
//------------------------------------------------------------------------------------------
if(localStorage['megalog']==undefined)localStorage['megalog']='';
var megalog=JSON.parse(localStorage['megalog']);
//megalog=;

var канвас=document.createElement('CANVAS'), квас=[2880,50,2,0,0], templog=[];
канвас.setAttribute('width',квас[0]);канвас.setAttribute('height',квас[1]);
канвас.onmouseover=function(){notice.style.display='block'}
канвас.onmouseout=function(){notice.style.display='none'}
канвас.onmousemove=function(e){
	var x=Math.floor(e.layerX/квас[2]);
	if((megalog[x]!=null)&&(templog[x]!=null)){
		var h=Math.floor(x/60);
		notice.textContent=h+':'+totwo(x-(h*60))+','+Math.round(megalog[x][2])+','+Math.round(templog[x]);
	}
	else notice.textContent='null';
	if(e.layerY>25)notice.style.bottom='34px';
	else notice.style.bottom='0';
	if(notice.offsetWidth+e.layerX>квас[0])notice.style.left=(квас[0]-notice.offsetWidth)+'px'
	else notice.style.left=e.layerX+'px'
}
var див=document.createElement('DIV');див.style.position='relative';див.style.overflowX='scroll';канвас2д=канвас.getContext('2d');
var notice=document.createElement('DIV');with(notice.style){backgroundColor='black';border='1px solid #555';position='absolute';display='none';bottom='0'}
див.appendChild(notice);див.appendChild(канвас);document.body.appendChild(див);
function сделайГраф(){//строит нижний график
	if(megalog.length==0)return;
	var темп;templog=[];
	квас[3]=0;
	for(var x=0,f=true;x<1440;x++){
		if(megalog[x]==null)continue;
		if(f){f=false;квас[4]=x}
		if(megalog[x][2]>квас[3])квас[3]=megalog[x][2];
		templog[x]=megalog[x][2]
	}
	канвас2д.fillStyle='black';канвас2д.fillRect(0,0,квас[0],квас[1]);
	var a=[[квас[4]+1,1440,1],[1339,квас[4],-1],[1339,квас[4],-1],[квас[4]+1,1440,1]];

	for(var z=0;z<4;z++){
		for(var x=a[z][0],y;;x+=a[z][2]){
			if((a[z][2]==1)&&(x>=a[z][1]))break;
			else if((a[z][2]==-1)&&(x<=a[z][1]))break;
			if(templog[x]==null){x+=a[z][2];continue}
			if(templog[x-a[z][2]]==null)continue;
			y=(templog[x]-templog[x-a[z][2]])/2;templog[x-a[z][2]]+=y;templog[x]-=y
		}
	}
	for(var x=квас[4],мы,вы=квас[1]/квас[3],з;x<1440;x++){
		if(megalog[x]==null)continue;
		мы=вы*megalog[x][2];з=квас[2]*x;
		канвас2д.fillStyle='rgb(100,0,0)';канвас2д.fillRect(з,квас[1]-мы,квас[2],мы);
		мы=вы*templog[x];
		if(megalog[x][2]<templog[x])канвас2д.fillStyle='darkorange';
		else канвас2д.fillStyle='orange';
		канвас2д.fillRect(з,квас[1]-мы,квас[2],мы);
		if(megalog[x][2]==квас[3])темп=x
	}
	for(var x=0,y;x<1440;x+=10){
		y=квас[2]*x;
		if(x>0){канвас2д.strokeStyle='#444';канвас2д.beginPath();канвас2д.moveTo(y,0);канвас2д.lineTo(y,квас[1]);канвас2д.stroke();канвас2д.closePath()}
		if(x%60==0){канвас2д.strokeStyle='yellow';канвас2д.strokeText(x/60,y,10)}
	}
	канвас2д.strokeStyle='blue';канвас2д.strokeText('max'+Math.round(megalog[темп][2]),0,48);
	канвас2д.strokeStyle='#444';канвас2д.beginPath();канвас2д.moveTo(0,квас[1]/2);канвас2д.lineTo(квас[0],квас[1]/2);канвас2д.stroke();канвас2д.closePath();
}
канвас.onclick=сделайГраф;
сделайГраф();
//------------------------------------------------------------------------------------------
function adLog(s){//добавляет сообщения в нижний лог
	var dt=new Date(), d=document.createElement('DIV');
	d.innerHTML=totwo(dt.getHours())+':'+totwo(dt.getMinutes())+'|'+s;
	divLog.insertBefore(d,divLog.children[0])
}
var butSave=document.createElement('BUTTON');butSave.textContent='Сохранить';butSave.style.cssFloat='right';
butSave.onclick=function(){localStorage['megalog']=JSON.stringify(megalog);this.textContent='Сохранено';setTimeout(function(){butSave.textContent='Сохранить'},3000)}
var divLog=document.createElement('DIV');
document.body.appendChild(butSave);document.body.appendChild(divLog);