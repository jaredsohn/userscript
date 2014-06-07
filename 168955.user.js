// ==UserScript==
// @name        HV 装备链接
// @namespace   UEL
// @include     http://hentaiverse.org/?s=Character&ss=in
// @version     1.7
// ==/UserScript==
var myDate = new Date();
mon=myDate.getMonth()
day=myDate.getDate()
all= document.createElement('div');
shuoMing= document.createElement('div');
unl= document.createElement('div');
eqlpan= document.createElement('div');
eqlpan.style.cssText = "position:absolute;font-size:15px; left: 20px;align:left"
eqlpan.id='eqpan'
all.textContent='未锁装备'
unl.textContent='所有装备'
shuoMing.textContent='说明(新)'
all.style.cssText = "position:absolute;font-size:15px; left: 700px;top:705px;";
shuoMing.style.cssText = "position:absolute;font-size:15px; left: 880px;top:705px;";
unl.style.cssText = "position:absolute;max-height: 100px;font-size:15px; color: black;top:705px; left: 780px;";
all.onclick=uleq
unl.onclick=alleq
shuoMing.onclick=function(){alert("说明:\n点击左侧相应的文字来分析装备,\n下方会出现装备分类,右侧则生成简单的单件装备连接和名称,\n添加了一个新功能,可以让所想要的装备名字变色,官方论坛功能,也在下方使用\n目前的装备序数是当前日期加序号生成的,避免了第二次生成装备时造成的序数紊乱")}
document.body.appendChild(unl)
document.body.appendChild(all)

document.body.appendChild(shuoMing)

function uleq(){	//未锁
	all.textContent=''
	unl.textContent=''
	aaa= document.querySelectorAll('.iup')
	aaa2= document.querySelectorAll('.iu')
	var ab=new Array();
	var bb=new Array();
	var eq=new Array();
	 for(var i=0;i<4;i++)  eq[i]=new Array(); 
	if(aaa!=null)for (var i =0; i < aaa.length ; i++ ) ab[i]=aaa[i].outerHTML.match(/\d+/)
	if(aaa2!=null)for (var i =0; i < aaa2.length ; i++ ) bb[i]=aaa2[i].outerHTML.match(/\d+/)
	eq[1]=ab.concat(bb)
	eq=creatlink(eq)
	shengcheng(eq)
	sloteq(eq) 
}

function alleq(){	//全部
	all.textContent=''
	unl.textContent=''
	aaa= document.querySelectorAll('.eqpp')
	aaa2= document.querySelectorAll('.eqp')
	var ab=new Array();
	var bb=new Array();
	var eq=new Array();
	 for(var i=0;i<4;i++)  eq[i]=new Array(); 
	if(aaa!=null)for (var i =0; i < aaa.length ; i++ ) ab[i]=aaa[i].outerHTML.match(/equips.lock\((\d+)/)[1]
	if(aaa2!=null)for (var i =0; i < aaa2.length ; i++ ) bb[i]=aaa2[i].outerHTML.match(/equips.lock\((\d+)/)[1]
	eq[1]=ab.concat(bb)
	eq=creatlink(eq)
	shengcheng(eq)
	sloteq(eq)	
}
	
function creatp()        //列出所有分类表
{
	var tb=new Array()
	temp =  document.createElement('div');
	temp.style.cursor='pointer'
	var tbct=['单手(请点击)','*双手*','**盾**','**杖**','*布甲*','*轻甲*','*重甲*']
	for (var i = 0; i < 7 ; i++ )
	{
		tb[i] =  document.createElement('textarea');
		tb[i].id='eqlst'+i
		//tb[i].onclick=function(){  this.select();  };
		tb[i].style.cssText ='position:absolute;background:#EDEBDF;font-size: 14px;color:#5C0D11;top: 0px;left: 100px;width: 1210px;height: 200px;overflow: scroll;display:none;'
		//temp.innerHTML=tbct[i]
		temp.innerHTML+='<div id=\"eqlsts'+i+'\"  style=\"font-size: 15px;text-align:left;color: black\"'+'onmouseover=\"this.style.color= \'red\'\"'+'onmouseout=\"this.style.color= \'black\'\"'+ 'onclick=\"for (var j = 0; j < 7 ; j++ )document.getElementById(\'eqlst\'+j).style.display=\'none\';document.getElementById(\'eqlst'+i+'\').style.display=\'inline\';document.getElementById(\'eqlst'+i+'\').select\(\)\">'+tbct[i]+'</div>'
		eqlpan.appendChild(tb[i])
	}
		changeColor =  document.createElement('div');
		changeColor.innerHTML="改变颜色"
		changeColor.onclick=function(){
		beforeWord=prompt("请输入需要变色的装备单词,要注意大小写!\n仅限于单个完整的单词,比如Elementalist",'')
		colorSelet=prompt("请输入需要改变的颜色,目前支持红,粉\(偏暗\),紫,蓝,请输入单个汉字,如红色就输入红!\n注意,请不要对同一单词多次变色,会出现错误的!!",'红')
		switch (colorSelet)
		{
		case '红':
		colorSelet='[color\=#FF0000]';
		break;
		case '粉':
		colorSelet='[color\=#CC33CC]';
		break;
		case '紫':
		colorSelet='[color\=#9999FF]';
		break;
		case '蓝':
		colorSelet='[color\=#33CCFF]';
		break;
		default:
			alert("输入不对!");
			return
		}
		var changeWord=new RegExp(beforeWord,'g');
		for (var i = 0; i < 7 ; i++ )
		{
			tb[i].value=tb[i].value.replace(changeWord,colorSelet+beforeWord+'[\/color]')
		}
		}
	eqlpan.appendChild(changeColor)	
	eqlpan.appendChild(temp)
	return tb
}

function creatlink(eq) //创建装备属性
{
	for (var i =0; i < eq[1].length ; i++ )	
	{
		temp=document.getElementById(eq[1][i]+"inv_equip")
		eq[0][i]=temp.textContent
		eq[2][i]=temp.getAttribute("onmouseover").match(/equips.set['0-9,\(]+ '([0-9a-z]+)/)[1]
		eq[3][i]='http://hentaiverse.org/pages/showequip.php?eid='+eq[1][i]+'&key='+eq[2][i]
	}
	return eq   //0名字1id2key3url
}


function sloteq(eq) //判断装备类别
{
	var eqcount=[0,0,0,0,0,0,0]
	//alert('一共'+eq[0].length+'件装备')
	tb= creatp() 
	var eqsn=['Wakizashi','Rapier','Axe','Club','Dagger','Shortsword','Katana','Scythe','Mace','Estoc','Longsword','Katalox','Willow','Oak','Redwood','Tower','Kite','Buckler','Phase','Gossamer','Cotton','Shade','Kevlar','Leather','Plate','Power','Shield Helmet']
	for (var j =0; j < eqsn.length ; j++ )	
		{
			for (var i =0; i < eq[1].length ; i++ )	
			{
				temp=eq[0][i].match(eqsn[j])
					if (temp) 
					{
						switch (j)
						{
							case 0:
							case 1:
							case 2:
							case 3:
							case 4:
							case 5:
							eqcount[0]=eqcount[0]*1+1
							tb[0].value+='[url='+eq[3][i]+'][1H'+mon+day+eqcount[0]+']'+eq[0][i]+'[/url](One-handed Weapon)Price: \n'   //单手
							break;	
							case 6:
							case 7	:			
							case 8	:		
							case 9	:		
							case 10:
							eqcount[1]=eqcount[1]*1+1
							tb[1].value+='[url='+eq[3][i]+'][2H'+mon+day+eqcount[1]+']'+eq[0][i]+'[/url](Two-handed Weapon)Price: \n'  	 //双手
							break;	
							case 11:
							case 12:		
							case 13:		
							case 14:
							eqcount[3]=eqcount[3]*1+1
							tb[3].value+='[url='+eq[3][i]+'][S'+mon+day+eqcount[3]+']'+eq[0][i]+'[/url]('+temp+' Staff)Price: \n'  	//杖
							break;		
							case 15:
							case 16:	
							case 17:
							eqcount[2]=eqcount[2]*1+1
							tb[2].value+='[url='+eq[3][i]+'][Sh'+mon+day+eqcount[2]+']'+eq[0][i]+'[/url](Shield)Price: \n'  //盾
							break;		
							case 18:
							case 19:
							case 20:
							eqcount[4]=eqcount[4]*1+1
							tb[4].value+='[url='+eq[3][i]+'][C'+mon+day+eqcount[4]+']'+eq[0][i]+'[/url](Cloth Armor)Price: \n'  	//布甲
							break;
							case 21:
							case 22:
							case 23:	
							eqcount[5]=eqcount[5]*1+1
							tb[5].value+='[url='+eq[3][i]+'][L'+mon+day+eqcount[5]+']'+eq[0][i]+'[/url](Light Armor)Price: \n'   	//轻甲
							break;
							case 24:
							case 25:
							case 26:
							eqcount[6]=eqcount[6]*1+1
							tb[6].value+='[url='+eq[3][i]+'][H'+mon+day+eqcount[6]+']'+eq[0][i]+'[/url](Heavy Armor)Price: \n'  	//重甲
							break;
							default:
							alert('有问题')
						}
					}
			}
		}
		
	document.body.appendChild(eqlpan)	
document.getElementById('eqlsts0').innerHTML+='('+eqcount[0]+')'
document.getElementById('eqlsts1').innerHTML+='('+eqcount[1]+')'
document.getElementById('eqlsts2').innerHTML+='('+eqcount[2]+')'
document.getElementById('eqlsts3').innerHTML+='('+eqcount[3]+')'
document.getElementById('eqlsts4').innerHTML+='('+eqcount[4]+')'
document.getElementById('eqlsts5').innerHTML+='('+eqcount[5]+')'
//alert(document.getElementById('eqlsts6').innerHTML)
aaaaaa=document.getElementById('eqlsts6').innerHTML+='('+eqcount[6]+')'
//alert(aaaaaa)
}

function shengcheng(eq){   //生成面板
	var uleql = document.createElement('div');   //装备列表
	var eqlist = document.createElement('textarea');  //单独列表
	eqlist.style.cssText = "  position:absolute; left: 1850px;top: -690px;width: 500px;height:600px; color: black;overflow: scroll";
	eqlist.value = "单独连接\n下面还有装备分类\n";
	//eqlist.onmouseover=function(){  this.select();  };
	uleql.style.cssText = "position:absolute; line-height: 200%;width: 500px;height: 650px;top:-690px;left: 1250px;overflow: scroll";
	for (var i =0; i < eq[1].length ; i++ )	{
	temp=document.getElementById(eq[1][i]+"inv_equip")
	temp=temp.getAttribute("onmouseover")
	temp=temp.replace('212,200,360,300','852,200,360,300')
	eqname = document.createElement('div');
	eqname.align="left"
	eqname.textContent='['+eq[0][i]+']'+eq[3][i]
	eqname.style.cssText = " min-width: 890px";
	eqname.setAttribute("onmouseover",temp)
	eqname.setAttribute("onmouseout","common.hide_popup_box()")
	eqname.onclick=   function(){eqlist.value+= this.textContent+'\n'}
	uleql.appendChild(eqname)
	}
	eqlpan.appendChild(uleql)
	eqlpan.appendChild(eqlist)
}