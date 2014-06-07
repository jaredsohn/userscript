// ==UserScript==
// @name               HV掉落检测
// @namespace      HVgame
// @description      检测掉落物品,小马记录,自动进入下一层
// @author             ggxxsol
// @match              http://hentaiverse.org/?s=Battle*
// @match              http://alt.hentaiverse.org/?s=Battle*
// @version            3.5.2
// ==/UserScript==

function changecolor(eqname)
{
	var redword = ['Legendary','Ethereal','of Slaughter','Peerless']  //物品标红,请用逗号加单引号添加自己想要的内容
	for (var i = 0 ; i < redword.length ; i++ )eqname = eqname.replace(redword[i],'<span style=\"color:red\">'+redword[i]+'</span>')
	return eqname
}
delaytime=0	
if(!localStorage.crydata)
{
	alert('初次运行或者更新版本请先进行设定.')
	localStorage.gdjlz=50
	localStorage.item='掉落列表:';
	localStorage.eqsl=1
	localStorage.itemo=localStorage.item='掉落列表:';
	localStorage.gd=0;
	localStorage.ctoken=0;
	localStorage.btoken=0;
	localStorage.rounds=0;
	localStorage.money=0;
	localStorage.moneyt=0;
	localStorage.jingli1=''
	localStorage.jingli2=''
	localStorage.jingli3=''
	localStorage.crydata='力0<br>灵0<br>敏0<br>体0<br>智0<br>聪0<br>火0<br>冰0<br>雷0<br>风0<br>圣0<br>暗0<br>'
	hvcsetting()
}
if(!document.getElementById("togpane_log"))
{
	//setting
	setting = document.createElement("a");
	setting.style.cssText = "font-size:15px; position:absolute; top:30px; left:1242px ;text-align:left;color:red;";
	setting.innerHTML = "SCID设置"
	setting.onclick = hvcsetting
	document.body.appendChild(setting)
}
//pane
localStorage.hckg=='true'?ztsj="<span style=\"color:blue\">是<\/span>":ztsj="<span style=\"color:red\">否<\/span>"
rightpan = document.createElement("stat");

if (localStorage.showBelow=='true')
{
	rightpan.style.cssText = "font-size:13px;color:black; position:absolute; top:710px; left:10px ;text-align:left;";
	rightpan.innerHTML=/*"精力:"+localStorage.gdjlz+"||*/"检测:"+ztsj+"|||装备:"+localStorage.qtext+'|||Round:<span style=\"color:blue\">'+localStorage.rounds+
'<\/span>|||C:'+localStorage.money+'/'+(localStorage.moneyt/localStorage.rounds).toFixed(0)+'/<span style=\"color:darkred\">'+localStorage.moneyt+'<\/span>|||<span style=\"color:blue\">Artifact:'+localStorage.gd+'<\/span><span style=\"color:darkgreen\">Token(C/B):'+localStorage.ctoken+'/'+localStorage.btoken+'<\/span><br>'+'上回合宝石掉落:<\/span><span style=\"color:red\">'+localStorage.crynow
}
else{
	rightpan.style.cssText = "font-size:13px;color:black; position:absolute; top:50px; left:1242px ;text-align:left;";
	rightpan.innerHTML=/*"精力:"+localStorage.gdjlz+"||*/"检测:"+ztsj+"<br>装备:"+localStorage.qtext+'<br>Round:<span style=\"color:blue\">'+localStorage.rounds+
'<\/span><br>C:'+localStorage.money+'/'+(localStorage.moneyt/localStorage.rounds).toFixed(0)+'/<span style=\"color:darkred\">'+localStorage.moneyt+'<\/span><br><span style=\"color:blue\">Artifact:'+localStorage.gd+'<\/span><span style=\"color:darkgreen\"><br>Token(C/B):'+localStorage.ctoken+'/'+localStorage.btoken+'<\/span><br>'+'上回合宝石掉落:<\/span><span style=\"color:red\">'+localStorage.crynow+'<\/span><br>'+'选错日志（最近三次）：<br>'+localStorage.jingli1+localStorage.jingli2+localStorage.jingli3
}
rightpan.onclick = qingchu

if(localStorage.yincang=='true'/*&&localStorage.showBelow!='true'*/)
{
if(localStorage.itemo!=localStorage.item)rightpan.innerHTML+='!!!新掉落!!!'
rightpan.onmouseover = paneapper
rightpan.onmouseout = panedisapp
}
if(localStorage.yincang!='true')
{
	rightpan.innerHTML+='<\/span><br>宝石掉落统计<br>'+localStorage.crydata+localStorage.item
	}
if (document.getElementById('riddlemaster')==null)document.body.appendChild(rightpan);

if (document.getElementById("riddlemaster"))
{
localStorage.jinglijiance=1
aaa=document.querySelector(".clb").innerHTML.match(/Stamina: (\d+)/)
if(aaa==null) alert("<HV精力检测>脚本需要在自定义字体的情况下才能正常工作,请在游戏中更改成自定义字体,给您带来的不便非常抱歉...")
localStorage.jinglidianshu=aaa[1]
//alert(localStorage.jinglidianshu)
}
else	if (!document.getElementById("riddlemaster")&&localStorage.jinglijiance==1)
{
localStorage.jinglijiance=0
aaa=document.querySelector(".clb").innerHTML.match(/Stamina: (\d+)/)
if(aaa==null) alert("<HV精力检测>脚本需要在自定义字体的情况下才能正常工作,请在游戏中更改成自定义字体,给您带来的不便非常抱歉...")
bbb = localStorage.jinglidianshu - aaa[1]
//alert(bbb)
if(bbb>=1)
{
if(bbb>5)
{
if(confirm('你的精力值降低了'+bbb+',真可怜,要摸摸头吗?'))	alert('你感觉有人摸了摸你的头,并且听见有人对你说:"不要气馁,下次细心一点吧~"')
localStorage.jinglidianshu=aaa[0];
return
}	
tempalert="上回合你的精力(Stamina)可能降低了"
alert(tempalert+bbb)
var myDate = new Date();
localStorage.jingli3=localStorage.jingli2
localStorage.jingli2=localStorage.jingli1
localStorage.jingli1=myDate.getMonth()+1+'月'+myDate.getDate()+'日,'+myDate.toLocaleTimeString()+'<br>'
}
}

if (document.querySelector(".btcp"))
{
/***********************************Stamina*******************************************/
/*	if(localStorage.jinglidianshu<=localStorage.gdjlz&&localStorage.jinggaokaiguan==0)
{
alert("!!注意!!你的精力(Stamina)低于"+localStorage.gdjlz)    
localStorage.jinggaokaiguan=1
}
if(localStorage.jinglidianshu>localStorage.gdjlz) localStorage.jinggaokaiguan=0;*/
localStorage.rounds=localStorage.rounds*1+1

if(localStorage.hckg=='true'){
stop_states=stop()
//	alert('1')
var timer=setTimeout(autoclicka,delaytime);
}
else {
//stop_states=stop()
document.getElementById("ckey_continue").click();
}
return;
}

/***********************************function*************************************************/
//情除数据
function qingchu(){if(!localStorage.gdjlz||confirm('确定要清除目前的数据吗?(需要刷新页面)')){localStorage.item='掉落列表:';localStorage.itemo=localStorage.item='掉落列表:';localStorage.gd=0;localStorage.ctoken=0;localStorage.btoken=0;localStorage.rounds=0;localStorage.money=0;localStorage.moneyt=0;localStorage.crydata='力0<br>灵0<br>敏0<br>体0<br>智0<br>聪0<br>火0<br>冰0<br>雷0<br>风0<br>圣0<br>暗0<br>';
}}
function autoclicka(){ a=document.querySelector(".btci");	var b = a.getAttribute("onclick");if(b=="battle.battle_continue()")document.getElementById("ckey_continue").click()}
function stop()
{
var CrystalType=['Crystal of Vigor','Crystal of Finesse','Crystal of Swiftness','Crystal of Fortitude','Crystal of Cunning','Crystal of Knowledge','Crystal of Flames','Crystal of Frost','Crystal of Lightning','Crystal of Tempest','Crystal of Devotion','Crystal of Corruption']
var CrystalH=['力','灵','敏','体','智','聪','火','冰','雷','风','圣','暗']
var CrystalNo=[0,0,0,0,0,0,0,0,0,0,0,0,]
var itemname = new Array();
function addit(temptext) {itemname = itemname.concat(temptext)}
var temp;

tempa =document.querySelector("#togpane_log").innerHTML;

tempmoney = tempa.match(/\d+ Credits/g)
if (tempmoney)
{
rndmoney=0
for (var j=0; j<tempmoney.length; j++)
{
tmoney=tempmoney[j].match(/\d+/)
rndmoney+=parseInt(tmoney)
}
localStorage.money=rndmoney
localStorage.moneyt=localStorage.moneyt*1+parseInt(rndmoney)
}
else localStorage.money=0
if(localStorage.itemsl=='true')	addit(/[[]Elixir[ a-zA-Z]+]/g)
switch (localStorage.eqsl){
case '1':
addit(/[[]Fine[ a-zA-Z-]+]/g)
case '2':
addit(/[[]Superior[ a-zA-Z-]+]/g)
case '3':
addit(/[[]Exquisite[ a-zA-Z-]+]/g)
case '4':
addit(/[[]Magnificent[ a-zA-Z-]+]/g)
default:
addit(/[[]Legendary[ a-zA-Z-]+]/g)
addit(/[[]Peerless[ a-zA-Z-]+]/g)
break;
}
//请在下方添加自定义掉落,请直接替换下一行的问号,不要有空格,多个掉落请复制多行填写,比方说想定义粗大的棒子的话,就把???改成Club,注意大小写!
//addit(/[[][ a-zA-Z-]+???[ a-zA-Z-]+]/g)  
//addit(/[[][ a-zA-Z-]+Power Armor[ a-zA-Z-]+]/g)  
//addit(/[[][ a-zA-Z-]+Ethereal[ a-zA-Z-]+]/g)   //虚空前缀
//请在上方添加自定义掉落
for (var i=0; i<itemname.length; i++)
{	
temp = tempa.match(itemname[i])

if (temp!=null) 
{
for (var j=0; j<temp.length; j++)
{
if(localStorage.eqt3=='false'||temp[j].match(/(Elixir|Wakizashi|Katana|Katalox|Phase|Shade|Power|Tower Shield)/)||i>5)//i去除自定义
{
if (localStorage.zbtc=='true')alert('掉落了'+temp[j])
temp[j] = changecolor(temp[j])
if (localStorage.showBelow=='true')
{				
localStorage.item+=temp[j]+'***';
}
else	localStorage.item+='<br>'+temp[j];
delaytime+=3000
}
}
}
}


localStorage.crynow=''
for(i=0;i<12;i++)
{
var reg=new RegExp('[0-9]+x '+CrystalType[i],"g");
temp=tempa.match(reg)

if(temp==null)continue;
var cryno=0;
for(j=0;j<temp.length;j++)
{
//if(temp.length!=1)alert(temp.length);
temp1=temp[j].match(/[0-9]+/)
//alert(CrystalType[i]+":"+temp)
cryno=cryno*1+temp1*1
}
localStorage.crynow=localStorage.crynow+CrystalH[i]+cryno
var reg=new RegExp(CrystalH[i]+'([0-9]+)');			
temp=localStorage.crydata.match(reg)[1]		

temp1=localStorage.crydata.replace(reg,'***')


//	
temp=temp*1+cryno
localStorage.crydata=temp1.replace('***',CrystalH[i]+temp)


}
temp = tempa.match(/Token of Blood/g)
if(temp) localStorage.btoken=localStorage.btoken*1+temp.length*1
temp = tempa.match(/Chaos Token/g)
if(temp) localStorage.ctoken=localStorage.ctoken*1+temp.length*1
var itemname = new Array();
addit(/[[][ a-zA-Z-]+ Artifact]/g)
for (var i=0; i<itemname.length; i++)
{	
temp = tempa.match(itemname[i])
if (temp!=null)localStorage.gd=localStorage.gd*1+temp.length*1
}
}



function hvcsetting()
{
table = document.createElement('table');
temp= document.createElement('div');
temp.style.cursor='pointer'
temp.innerHTML='设置向导(点我)'
temp.onclick=ileadyou
x=table.insertRow(0)
x.insertCell(0).appendChild(temp)
x.insertCell(1).innerHTML=''
//第二行
ip2 = document.createElement('input');
ip2.type='checkbox'
localStorage.hckg=='true'?ip2.checked=true:ip2.checked=false

x=table.insertRow(-1)
x.insertCell(0).innerHTML='物品检测:'
x.insertCell(1).appendChild(ip2)
//3
ip3 = document.createElement('input');
ip3.type='checkbox'
ip3.id='ipvalue3'
ip3.checked=true	
localStorage.itemsl=='true'?ip3.checked=true:ip3.checked=false
x=table.insertRow(-1)
x.insertCell(0).innerHTML='Elixir药水:'
x.insertCell(1).appendChild(ip3)

ip4 = document.createElement('input');
ip4.id='ipvalue4'
ip4.checked=true
x=table.insertRow(-1)
temp10= document.createElement('div');
temp10.style.cursor='pointer'
temp10.innerHTML='装备检测?:'
temp10.onclick=function(){i=1;while(i==1){localStorage.eqsl=prompt("装备:\n1:Fine及以上;\n2:Sup及以上;\n3:EX及以上;\n4:Mag及以上。\nLeg以上必定暂停\n请输入：1、2、3或4",localStorage.eqsl);if(localStorage.eqsl>=0&&localStorage.eqsl<=4)i=0;else alert('别玩我了,你输入的不对!');	}table.rows[3].cells[1].innerHTML=localStorage.eqsl}
x.insertCell(0).appendChild(temp10)
ip4.size="2";
x.insertCell(1).innerHTML=localStorage.qtext

ip5 = document.createElement('input');
ip5.type='checkbox'
ip5.id='ipvalue5'	
localStorage.eqt3=='true'?ip5.checked=true:ip5.checked=false
x=table.insertRow(-1)
x.insertCell(0).innerHTML='只记录T3装备:'
x.insertCell(1).appendChild(ip5)

ip6 = document.createElement('input');
ip6.type='checkbox'
ip6.id='ipvalue6'	 
localStorage.zbtc=='true'?ip6.checked=true:ip6.checked=false
x=table.insertRow(-1)
x.insertCell(0).innerHTML='掉落弹窗:'
x.insertCell(1).appendChild(ip6)

ip7 = document.createElement('input');
ip7.type='checkbox'
ip7.id='ipvalue7'

localStorage.yincang=='true'?ip7.checked=true:ip7.checked=false
x=table.insertRow(-1)
x.insertCell(0).innerHTML='隐藏列表:'
x.insertCell(1).appendChild(ip7)

ip9 = document.createElement('button');
ip9.innerHTML='确定'
ip9.onclick=confi
x=table.insertRow(-1)
x.insertCell(0).appendChild(ip9)
ip8 = document.createElement('button');
ip8.innerHTML='取消'

ip8.onclick=function(){table.style.display = "none"}
x.insertCell(1).appendChild(ip8)
table.style.cssText = "z-index:1000;position:absolute; width:200px;height:50px;top:10px; left:1142px  ;font-size: 17px; color: black;background : #c6f0fa";
document.body.appendChild(table)
}
function confi()
{
localStorage.hckg=ip2.checked
localStorage.itemsl = ip3.checked
localStorage.eqt3 = ip5.checked
localStorage.zbtc = ip6.checked
localStorage.yincang=ip7.checked
table.style.display = "none"
switch (localStorage.eqsl)
{
case '1':
localStorage.qtext='Fine'
break
case '2':
localStorage.qtext='Sup'
break
case '3':
localStorage.qtext='Ex'
break
case '4':
localStorage.qtext='Mag'
break
default:
}
}
function paneapper()
{
if (temp=document.getElementById('itemlist'))
{
temp.style.display = "block";
temp=document.getElementById('itemlist1')
temp.style.display = "block";
}
else	{
templist = document.createElement("div");
templist.setAttribute('id','itemlist1')
templist.innerHTML="宝石掉落<br>"+localStorage.crydata
templist.onmouseout = panedisapp
templist.onclick = qingchu
templist.style.cssText = "z-index:1000;font-size:15px;color:black; position:absolute; top:50px; left:730px  ;text-align:left; min-width: 100px; min-height: 50px; background : #FFCC99";
document.body.appendChild(templist)
localStorage.itemo=localStorage.item
if(localStorage.showBelow=="true")
{templist.style.top="500px"
templist.style.left="450px"}
templist = document.createElement("div");
templist.setAttribute('id','itemlist')
templist.innerHTML=localStorage.item
templist.onmouseout = panedisapp
templist.onclick = qingchu
templist.style.cssText = "z-index:1000;font-size:15px;color:black; position:absolute; top:50px; left:830px  ;text-align:left; min-width: 400px; min-height: 200px; background : #98fb98";
if(localStorage.showBelow=="true")
{templist.style.top="500px"
templist.style.left="550px"}
document.body.appendChild(templist)
localStorage.itemo=localStorage.item
}
}
function panedisapp()
{
if(temp=document.getElementById('itemlist')) 
{
temp.style.display = "none";
temp=document.getElementById('itemlist1')
temp.style.display = "none";
}
}



function ileadyou()
{
localStorage.showBelow=confirm("要让该插件在下方显示?点击确定就会显示在下方,而不是画面右侧,17存显示器建议下方显示")
ip2.checked=confirm("是否开启物品检测?不开启的话只有自动跳过胜利画面的功能.建议开启")
ip3.checked=confirm("是否检测Elixir药水?")
try
{

i=1;
while(i==1){
localStorage.eqsl=prompt("装备品质检测:\n1:Fine及以上;\n2:Sup及以上;\n3:EX及以上;\n4:Mag及以上。\nLeg级别必定暂停\n请输入：1、2、3或4",localStorage.eqsl);
if(localStorage.eqsl>=0&&localStorage.eqsl<=4)i=0;
else alert('别玩我了,你输入的不对!');	
}
table.rows[3].cells[1].innerHTML=localStorage.eqsl
ip5.checked=confirm("只记录原T3装备?如果你觉着T3以外的都是渣渣的可以点确定了.")
ip6.checked=confirm("检测到掉落物品后弹窗提示?因为每次弹窗都很麻烦,建议点取消")
ip7.checked=confirm("隐藏装备掉落列表吗?当检测到装备的时候,会有提示的,鼠标移到该提示处即可查看,挺方便的")
alert('设置完毕,如果有不满意的地方可以直接在面板选择,最后别忘点面板的确定保存设置哦!')
}
catch (e)
{
}
}