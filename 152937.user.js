// ==UserScript==
// @name       HV 物品汉化V2
// @namespace hentaiversehhV2
// @icon         http://g.e-hentai.org/favicon.ico
// @match     http://hentaiverse.org/?s=Bazaar&ss=es*
// @match     http://hentaiverse.org/?s=Character&ss=eq*
// @match     http://hentaiverse.org/?s=Character&ss=it
// @match     http://hentaiverse.org/?s=Bazaar&ss=is*
// @match     http://hentaiverse.org/?s=Character&ss=in
// @match     http://hentaiverse.org/?s=Bazaar&ss=fr*
// @match     http://hentaiverse.org/pages/showequip.php?eid*
// @match     http://hentaiverse.org/?s=Battle&ss=iw*
// @match    http://forums.e-hentai.org/*
// @author    ggxxsol
// @version   V2.7.4
// ==/UserScript==

if (document.location.href.match(/ss=iw/)&&!document.getElementById('item_pane'))return

var hanhua=true;
closeH=0
var mhtml = document.body.innerHTML;
var html = document.body.innerHTML;
mainhh();
document.onkeydown = keyDown
function keyDown(e)
 {
	 if(e.which==65&&closeH==0)  //a
	 {
		if(hanhua){
			document.body.innerHTML=mhtml;
			hanhua=false;
			if (document.location.href.match(/forums/)=='forums')closeH=1
			}
		else {
			hanhua=true;
			mainhh();
			}
	}
}

function mainhh(){
		var alertt = document.createElement('div');
		alertt.innerHTML = "如要使用装备比较插件,请先按A键!";
		alertt.style.cssText = "font-size:15px;color:black; ";
		document.body.appendChild(alertt);
		if (document.location.href.match("http://hentaiverse.org/pages/showequip.php")){
			var torep = new Array();
			var repby = new Array();
			html=eqmthh(document.body)
			document.body.innerHTML= html;
			aaa=document.location.href.match(/\?([0-9a-z=?&]+)/);
			var eqqlk = document.createElement('div');
			eqqlk.innerHTML = "装备eid:<br>"+aaa[1]
			eqqlk.style.cssText = "font-size:15px;color:red; ";
			document.body.appendChild(eqqlk);
			return
		}
	var lklist = new Array();
	lklist = lklist.concat('Character&ss=in')   //背包0
	lklist = lklist.concat('Bazaar&ss=is')      //道具店1
	lklist = lklist.concat('Character&ss=eq')  //装备2
	lklist = lklist.concat('Bazaar&ss=es')    //装备店3
	lklist = lklist.concat('Bazaar&ss=fr')    // 锻造店4
	lklist = lklist.concat('Character&ss=it') //战斗道具5
	lklist = lklist.concat('ss=iw') //iw汉化6
	lklist = lklist.concat('forums') //论坛汉化
	for(i=0;i<lklist.length;i++){
		if(document.location.href.match(lklist[i])){
			temp=i;
			break;
		}
	}
	switch (temp){
		case 0:  //背包0
		var torep = new Array();
		var repby = new Array();
		itemdiv=document.querySelector("#inv_item.cspp").innerHTML;
		equipdiv=document.querySelector("#inv_equip.cspp");
		item()
		itemdiv=yhanhua(torep,repby,itemdiv)
		equipdiv=eqmthh(equipdiv)
		document.querySelector("#inv_equip.cspp").innerHTML = equipdiv;
		document.querySelector("#inv_item.cspp").innerHTML = itemdiv;
		break;

		case 1: //道具店1
		var torep = new Array();
		var repby = new Array();
		itemdiv=document.querySelector("#leftpane").innerHTML;
		item()
		itemdiv=yhanhua(torep,repby,itemdiv)
		document.querySelector("#leftpane").innerHTML = itemdiv;
		itemdiv=document.querySelector("#shop_pane.cspp").innerHTML;
		itemdiv=yhanhua(torep,repby,itemdiv)
		document.querySelector("#shop_pane.cspp").innerHTML = itemdiv;
		break;

		case 2: //装备2
		var torep = new Array();
		var repby = new Array();
		equipdiv=document.querySelector("#leftpane.eql");
		equipdiv=eqmthh(equipdiv)
		document.querySelector("#leftpane.eql").innerHTML = equipdiv;
		break;

		case 3: //装备店3
		var torep = new Array();
		var repby = new Array();
		equipdiv=document.querySelector("#shop_pane.cspp");
		equipdiv2=document.querySelector("#item_pane.cspp");
		equipdiv=eqmthh(equipdiv)
		equipdiv2=eqmthh(equipdiv2)
		document.querySelector("#shop_pane.cspp").innerHTML = equipdiv;
		document.querySelector("#item_pane.cspp").innerHTML=equipdiv2
		break;

		case 4: // 锻造店4
		var torep = new Array();
		var repby = new Array();
		equipdiv=document.querySelector("#item_pane");
		equipdiv=eqmthh(equipdiv)
		document.querySelector("#item_pane").innerHTML = equipdiv;
        break;

		case 5: //战斗道具5
		var torep = new Array();
		var repby = new Array();
		itemdiv=document.querySelector("#mainpane").innerHTML;
		item()
		itemdiv=yhanhua(torep,repby,itemdiv)
		document.querySelector("#mainpane").innerHTML = itemdiv;
		break;
		
		case 6: //iw
		var torep = new Array();
		var repby = new Array();
		equipdiv=document.querySelector("#item_pane");
		equipdiv=eqmthh(equipdiv)
		document.querySelector("#item_pane").innerHTML = equipdiv;
		break;
		case 7: //iw
		
		var torep = new Array();
		var repby = new Array();

		equipdiv=document.getElementsByClassName('postcolor');
		for (var ii=0; ii<equipdiv.length ; ii++ ){
			tempequipment=equipdiv[ii]
			tempequipment=eqmthh(tempequipment)
			//alert(i)
			//	alert(document.getElementsByClassName('postcolor')[i].innerHTML)
			document.getElementsByClassName('postcolor')[ii].innerHTML = tempequipment;
		}
		break;
		default:
	}

	function yhanhua(torep,repby,temp){    //源语句，汉化后语句，汉化变量
		for (var i=0; i<torep.length; i++){
			var regex = new RegExp(torep[i],'g');
			temp = temp.replace(regex, repby[i]);
		}
		return temp
		}
function item(){
//道具翻译
torep = torep.concat('Featherweight Shard')
repby = repby.concat('羽毛碎片(装备)')

torep = torep.concat('Voidseeker Shard')
repby = repby.concat('虚空碎片(武器)')

torep = torep.concat('Aether Shard')
repby = repby.concat('以太碎片(魔法)')

torep = torep.concat('Amnesia Shard')
repby = repby.concat('重铸碎片(锻造)')

//药品解释
torep = torep.concat('Restores 10 points of Stamina, up to the maximum of 99. ')
repby = repby.concat('恢复10点精力，但不超过99。')

torep = torep.concat('Restores 20% of Base Health, Mana and Spirit per turn for 10 turns.')
repby = repby.concat('恢复20%的HP、MP、SP，持续10回合。')

torep = torep.concat('Grants the Haste and Protection effects.')
repby = repby.concat('产生加速和保护的效果。')

torep = torep.concat('Grants the Absorb effect.')
repby = repby.concat('使用后获得吸收效果。')

torep = torep.concat('Restores')
repby = repby.concat('恢复')

torep = torep.concat('of Base Mana per Turn for')
repby = repby.concat('的基础法力值并持续')

torep = torep.concat('of Base Spirit per Turn for')
repby = repby.concat('的基础灵力值并持续')

torep = torep.concat('of Base Health per Turn for')
repby = repby.concat('的基础体力，持续')

torep = torep.concat('Base Health')
repby = repby.concat('的基础体力并每回合回复')

torep = torep.concat('Turns')
repby = repby.concat('回合')

//魔药解释
torep = torep.concat('You gain')
repby = repby.concat('你得到')

torep = torep.concat('resistance to ')
repby = repby.concat('的')

torep = torep.concat('elemental attacks and do ')
repby = repby.concat('元素耐性并造成')

torep = torep.concat('more damage with ')
repby = repby.concat('的额外')

torep = torep.concat('spells.')
repby = repby.concat('魔法伤害。')

torep = torep.concat('Melee attacks do additional ')
repby = repby.concat('近战攻击变为')

torep = torep.concat('Grants the Haste effect.')
repby = repby.concat('使用产生加速效果。')

torep = torep.concat('Grants the Protection effect.')
repby = repby.concat('使用产生保护效果。')

torep = torep.concat('Grants the Shadow Veil effect.')
repby = repby.concat('使用产生闪避效果。')

torep = torep.concat('Grants the Spark of Life effect.')
repby = repby.concat('使用产生复活效果。')

torep = torep.concat('Grants the Absorb, Shadow Veil and Spark of Life effects.')
repby = repby.concat('同时产生吸收，加速，闪避，以及复活效果。')

torep = torep.concat('Grants the Absorb Veil effect.')
repby = repby.concat('使用产生吸收效果。')
//药水
torep = torep.concat('Lesser Health Potion')
repby = repby.concat('小型体力药水')

torep = torep.concat('Average Health Potion')
repby = repby.concat('中型体力药水(不再掉落)')

torep = torep.concat('Greater Health Potion')
repby = repby.concat('大型体力药水')

torep = torep.concat('Superior Health Potion')
repby = repby.concat('超级体力药水(不再掉落)')

torep = torep.concat('Heroic Health Potion')
repby = repby.concat('英雄级体力药')

torep = torep.concat('Health Elixir')
repby = repby.concat('长生不老药')

torep = torep.concat('Lesser Mana Potion')
repby = repby.concat('小型法力药水')

torep = torep.concat('Average Mana Potion')
repby = repby.concat('中型法力药水(不再掉落)')

torep = torep.concat('Greater Mana Potion')
repby = repby.concat('大型法力药水')

torep = torep.concat('Superior Mana Potion')
repby = repby.concat('超级法力药水(不再掉落)')

torep = torep.concat('Heroic Mana Potion')
repby = repby.concat('英雄级法力药')

torep = torep.concat('Mana Elixir')
repby = repby.concat('长生法力药')

torep = torep.concat('Spirit Elixir')
repby = repby.concat('长生灵力药')

torep = torep.concat('Energy Drink')
repby = repby.concat('活力饮料(红牛)')

torep = torep.concat('Last Elixir')
repby = repby.concat('终极回复药')

torep = torep.concat('Lesser Spirit Potion')
repby = repby.concat('小型灵力药水')

torep = torep.concat('Average Spirit Potion')
repby = repby.concat('中型灵力药水')

torep = torep.concat('Greater Spirit Potion')
repby = repby.concat('大型灵力药水')

torep = torep.concat('Superior Spirit Potion')
repby = repby.concat('超级灵力药水')

torep = torep.concat('Heroic Spirit Potion')
repby = repby.concat('英雄级灵力药')

torep = torep.concat('Infusion of Darkness')
repby = repby.concat('暗属性附魔')

torep = torep.concat('Infusion of Divinity')
repby = repby.concat('圣属性附魔')

torep = torep.concat('Infusion of Storms')
repby = repby.concat('风属性附魔')

torep = torep.concat('Infusion of Lightning')
repby = repby.concat('雷属性附魔')

torep = torep.concat('Infusion of Frost')
repby = repby.concat('冰属性附魔')

torep = torep.concat('Infusion of Flames')
repby = repby.concat('火属性附魔')

torep = torep.concat('Infusion of Gaia')
repby = repby.concat('盖亚附魔')

torep = torep.concat('Scroll of Swiftness')
repby = repby.concat('加速卷轴')

torep = torep.concat('Scroll of the Avatar')
repby = repby.concat('化身卷轴')

torep = torep.concat('Scroll of Shadows')
repby = repby.concat('幻影卷轴')

torep = torep.concat('Scroll of Absorption')
repby = repby.concat('吸收卷轴')

torep = torep.concat('Scroll of Life')
repby = repby.concat('生命卷轴')

torep = torep.concat('Scroll of Protection')
repby = repby.concat('物防卷轴')

torep = torep.concat('Scroll of the Gods')
repby = repby.concat('神之卷轴')

torep = torep.concat('Soul Stone')
repby = repby.concat('灵魂石')

torep = torep.concat('Bubble-Gum')
repby = repby.concat('泡泡糖')

torep = torep.concat('Flower Vase')
repby = repby.concat('花瓶')

torep = torep.concat('ManBearPig Tail')
repby = repby.concat('ManBearPig Tail 战利品')

torep = torep.concat('Mithra\'s Flower')
repby = repby.concat('Mithra\'s Flower 战利品')

torep = torep.concat('Dalek Voicebox')
repby = repby.concat('Dalek Voicebox 战利品')

torep = torep.concat('Lock of Blue Hair')
repby = repby.concat('Lock of Blue Hair 战利品')

torep = torep.concat('Bunny-Girl Costume')
repby = repby.concat('Bunny-Girl Costume 战利品')

torep = torep.concat('Hinamatsuri Doll')
repby = repby.concat('Hinamatsuri Doll 战利品')

torep = torep.concat('Broken Glasses')
repby = repby.concat('Broken Glasses 战利品')

torep = torep.concat('Sapling')
repby = repby.concat('Sapling 树杯')

torep = torep.concat('Black T-Shirt')
repby = repby.concat('Black T-Shirt 战利品')

torep = torep.concat('Unicorn Horn')
repby = repby.concat('Unicorn Horn 战利品')

torep = torep.concat('Noodly Appendage')
repby = repby.concat('*面杯*')

torep = torep.concat('Figurine')
repby = repby.concat('小马雕像')

torep = torep.concat('Monster Chow')
repby = repby.concat('低级猫粮')

torep = torep.concat('Monster Edibles')
repby = repby.concat('中级猫粮')

torep = torep.concat('Monster Cuisine')
repby = repby.concat('高级猫粮')

torep = torep.concat('Happy Pills')
repby = repby.concat('快乐药片')

torep = torep.concat('Token of Blood')
repby = repby.concat('血之令牌')

torep = torep.concat('Chaos Token')
repby = repby.concat('混沌令牌')

torep = torep.concat('Crystal of Vigor')
repby = repby.concat('力量水晶')

torep = torep.concat('Crystal of Finesse')
repby = repby.concat('灵巧水晶')

torep = torep.concat('Crystal of Swiftness')
repby = repby.concat('敏捷水晶')

torep = torep.concat('Crystal of Fortitude')
repby = repby.concat('体质水晶')

torep = torep.concat('Crystal of Cunning')
repby = repby.concat('智力水晶')

torep = torep.concat('Crystal of Knowledge')
repby = repby.concat('智慧水晶')

torep = torep.concat('Crystal of Flames')
repby = repby.concat('火焰水晶')

torep = torep.concat('Crystal of Frost')
repby = repby.concat('冰冻水晶')

torep = torep.concat('Crystal of Lightning')
repby = repby.concat('雷之水晶')

torep = torep.concat('Crystal of Tempest')
repby = repby.concat('风之水晶')

torep = torep.concat('Crystal of Devotion')
repby = repby.concat('神圣水晶')

torep = torep.concat('Crystal of Corruption')
repby = repby.concat('暗黑水晶')

torep = torep.concat('Crystal of Quintessence')
repby = repby.concat('灵魂水晶')
//物品类型
torep = torep.concat('Trophy')
repby = repby.concat('战利品')

torep = torep.concat('Token')
repby = repby.concat('代币')

torep = torep.concat('Consumable')
repby = repby.concat('消费品')

torep = torep.concat('Crystal')
repby = repby.concat('水晶')

torep = torep.concat('Artifact')
repby = repby.concat('古董')

torep = torep.concat('Material')
repby = repby.concat('素材')

//材料

torep = torep.concat('Binding of')
repby = repby.concat('粘合剂:')

torep = torep.concat('Low-Grade')
repby = repby.concat('低级')

torep = torep.concat('Mid-Grade')
repby = repby.concat('中级')

torep = torep.concat('High-Grade')
repby = repby.concat('高级')

torep = torep.concat('Cloth');
repby = repby.concat('布料');

torep = torep.concat('Leather')
repby = repby.concat('皮革')

torep = torep.concat('Wood')
repby = repby.concat('木材')

torep = torep.concat('Metals')
repby = repby.concat('金属')

repby = repby.concat('Materials')
torep = torep.concat('材料s')
	
repby = repby.concat('Crystals')
torep = torep.concat('水晶s')
}

function eqmthh(eminn){ 
	em=eminn.innerHTML.match(/([>]|[>\[\]0-9A-Z]+)(Fine|Super|Exquisite|Average|Crude|Fair|Magnificent|Legendary|Peerless)[a-zA-Z- ]*/g)
	if(em==null)return eminn.innerHTML
	var eqc1 = new Array();	
	var eqc2 = new Array();	
	var eqc3 = new Array();	
	var eqc4 = new Array();
	var eqac = new Array();	
	var eqe1 = new Array();	
	var eqe2 = new Array();
	var eqe3 = new Array();
	var eqe4 = new Array();
	var eqae = new Array();
	var emc = new Array();
	var eqe5 = new Array();
	var eqc5 = new Array();
	eq1()
	eq2()
	eq3()
	eq4()
	eq5()
    for (i=0;i<em.length;i++){
		e1=eqc(em[i],eqe1)
		e2=eqc(em[i],eqe2)
		e3=eqc(em[i],eqe3)
		e4=eqc(em[i],eqe4)
		e5=eqc(em[i],eqe5)
		emc[i]=eqc1[e1]+' '+eqc2[e2]+' '+eqc3[e3]+' '+eqc4[e4]+' '+eqc5[e5]+'</span>'
    }
	tempeq=eminn.innerHTML
	for(i=0;i<emc.length; i++)	{
		tempeq=tempeq.replace(em[i],'>'+emc[i])
		//bb+=aa[i]+i+'\n'
	}
	eqa()  //道具装载
	for(i=0;i<eqae.length; i++){
		var regex = new RegExp(eqae[i],'g');
		tempeq = tempeq.replace(regex, eqac[i]);
	}
return tempeq

function eqc(temp,eqeq){   //temp 输入装备名称，eqeq列表英文
	temps=temp
	for(j=0;j<eqeq.length;j++){
	aaa=temps.match(eqeq[j])
	if(aaa!=null) return j;
	}
	return 0
}

function eqa(){

    //装备属性
    eqae = eqae.concat('Magic Accuracy')
    eqac = eqac.concat('魔法命中')

    eqae = eqae.concat('Magic Crit Chance')
    eqac = eqac.concat('魔法暴击率')

    eqae = eqae.concat('Attack Crit Chance')
    eqac = eqac.concat('物理暴击率')

    eqae = eqae.concat('Attack Accuracy')
    eqac = eqac.concat('物理命中')

    eqae = eqae.concat('Attack Critical')
    eqac = eqac.concat('物理暴击')

    eqae = eqae.concat('Attack Damage')
    eqac = eqac.concat('攻击伤害')

    eqae = eqae.concat('Damage Mitigations')
    eqac = eqac.concat('伤害减免')

    eqae = eqae.concat('Parry Chance')
    eqac = eqac.concat('招架概率')

    eqae = eqae.concat('Magic Damage')
    eqac = eqac.concat('魔法伤害')

    eqae = eqae.concat('Magic Critical')
    eqac = eqac.concat('魔法暴击')

    eqae = eqae.concat('Mana Conservation')
    eqac = eqac.concat('魔法节省')

    eqae = eqae.concat('Counter-Resist')
    eqac = eqac.concat('无视魔免')

    eqae = eqae.concat('Physical Mitigation')
    eqac = eqac.concat('物理缓伤')

    eqae = eqae.concat('Magical Mitigation')
    eqac = eqac.concat('魔法减伤')

    eqae = eqae.concat('Block Chance')
    eqac = eqac.concat('格挡概率')

    eqae = eqae.concat('Upgrades and Enchantments');
    eqac = eqac.concat('升级与附魔');

    eqae = eqae.concat('Primary Attributes')
    eqac = eqac.concat('属性(PAB)')

    eqae = eqae.concat('Evade Chance')
    eqac = eqac.concat('回避概率')

    eqae = eqae.concat('Casting Speed')
    eqac = eqac.concat('咏唱速度')

    eqae = eqae.concat('Resist Chance')
    eqac = eqac.concat('魔免概率')

    eqae = eqae.concat('Spell Damage')
    eqac = eqac.concat('伤害加成(EDB)')

    eqae = eqae.concat('Siphon Spirit')
    eqac = eqac.concat('灵力吸取')

    eqae = eqae.concat('Siphon Magic');
    eqac = eqac.concat('偷取魔力');

    eqae = eqae.concat('Siphon Health')
    eqac = eqac.concat('生命吸取')

    eqae = eqae.concat('Ether Theft')
    eqac = eqac.concat('魔力回流')

    eqae = eqae.concat('Penetrated Armor');
    eqac = eqac.concat('破甲');

    eqae = eqae.concat('Swift Strike')
    eqac = eqac.concat('迅捷打击')

    eqae = eqae.concat('Attack Speed')
    eqac = eqac.concat('增加攻速')

    eqae = eqae.concat('Current Owner')
    eqac = eqac.concat('持有者')

    eqae = eqae.concat('Ether Tap')
    eqac = eqac.concat('魔力回流')

    eqae = eqae.concat('Elemental Strike')
    eqac = eqac.concat('属性攻击')

    eqae = eqae.concat('Bleeding Wound')
    eqac = eqac.concat('流血')

    eqae = eqae.concat('Lasts for')
    eqac = eqac.concat('持续')

    eqae = eqae.concat('Stunned')
    eqac = eqac.concat('眩晕')

    eqae = eqae.concat('turn')
    eqac = eqac.concat('回合')

    eqae = eqae.concat('Burden')
    eqac = eqac.concat('负重')

    eqae = eqae.concat('Interference')
    eqac = eqac.concat('干涉')

    eqae = eqae.concat('Burden');
    eqac = eqac.concat('负重');

    eqae = eqae.concat('Strength');
    eqac = eqac.concat('力量');

    eqae = eqae.concat('Dexterity');
    eqac = eqac.concat('灵巧');

    eqae = eqae.concat('Agility');
    eqac = eqac.concat('敏捷');

    eqae = eqae.concat('Endurance');
    eqac = eqac.concat('体质');

    eqae = eqae.concat('Intelligence');
    eqac = eqac.concat('智力');

    eqae = eqae.concat('Wisdom');
    eqac = eqac.concat('智慧');

    eqae = eqae.concat('chance');
    eqac = eqac.concat('几率');

    eqae = eqae.concat('Crushing');
    eqac = eqac.concat('破碎');

    eqae = eqae.concat('Piercing');
    eqac = eqac.concat('穿刺');

    eqae = eqae.concat('Slashing');
    eqac = eqac.concat('斩击');

    eqae = eqae.concat('Damage');
    eqac = eqac.concat('伤害');

    eqae = eqae.concat('Proficiency');
    eqac = eqac.concat('熟练度(Pro)');

    eqae = eqae.concat('>Elemental');
    eqac = eqac.concat('>元素');

    eqae = eqae.concat('Divine');
    eqac = eqac.concat('圣');

    eqae = eqae.concat('Forbidden');
    eqac = eqac.concat('暗');

    eqae = eqae.concat('Deprecating');
    eqac = eqac.concat('减益');

    eqae = eqae.concat('Supportive');
    eqac = eqac.concat('增益');

    eqae = eqae.concat('>Fire');
    eqac = eqac.concat('>火焰');

    eqae = eqae.concat('>Cold');
    eqac = eqac.concat('>冰霜');

    eqae = eqae.concat('>Elec');
    eqac = eqac.concat('>闪电');

    eqae = eqae.concat('>Wind');
    eqac = eqac.concat('>狂风');

    eqae = eqae.concat('>Holy');
    eqac = eqac.concat('>神圣');

    eqae = eqae.concat('>Dark');
    eqac = eqac.concat('>黑暗');

    eqae = eqae.concat('Void ');
    eqac = eqac.concat('空灵');

    eqae = eqae.concat('points');
    eqac = eqac.concat('点');

    eqae = eqae.concat('Strike');
    eqac = eqac.concat('冲击');

    eqae = eqae.concat('None');
    eqac = eqac.concat('无');

    eqae = eqae.concat('Butcher');
    eqac = eqac.concat('屠夫');

    eqae = eqae.concat('Hollowforged');
    eqac = eqac.concat('虚空化');

    eqae = eqae.concat('Bonus');
    eqac = eqac.concat('加成');
 
	 
}

function eq5(){

	eqe5 = eqe5.concat('ddsezxcwer')
    eqc5 = eqc5.concat('');  //如果出现问号绝对有问题
    //盾
    eqe5 = eqe5.concat('Buckler');
    eqc5 = eqc5.concat('');

    eqe5 = eqe5.concat('Kite Shield');
    eqc5 = eqc5.concat('');

    eqe5 = eqe5.concat('Tower Shield');
    eqc5 = eqc5.concat('');

    // 单手武器类
    eqe5 = eqe5.concat('Dagger');
    eqc5 = eqc5.concat('匕首(单)');

    eqe5 = eqe5.concat('Shortsword');
    eqc5 = eqc5.concat('短剑(单)');

    eqe5 = eqe5.concat('Wakizashi');
    eqc5 = eqc5.concat('<span style=\"background:#ffa500\" >脇差</span>(单)');

    eqe5 = eqe5.concat('Axe');
    eqc5 = eqc5.concat('斧(单)');

    eqe5 = eqe5.concat('Club');
    eqc5 = eqc5.concat('棍(单)');

    eqe5 = eqe5.concat('Rapier');
    eqc5 = eqc5.concat('西洋剑(单)');

    //双手
    eqe5 = eqe5.concat('Longsword');
    eqc5 = eqc5.concat('长剑(双)');

    eqe5 = eqe5.concat('Scythe');
    eqc5 = eqc5.concat('镰刀(双)');

    eqe5 = eqe5.concat('Katana');
    eqc5 = eqc5.concat('<span style=\"background:#ffa500\" >太刀</span>(双)');

    eqe5 = eqe5.concat('Mace');
    eqc5 = eqc5.concat('重槌(双)');

    eqe5 = eqe5.concat('Estoc');
    eqc5 = eqc5.concat('刺剑(双)');

	//法杖
    eqe5 = eqe5.concat('Staff');
    eqc5 = eqc5.concat('法杖');
    //布甲
    eqe5 = eqe5.concat('Cap');
    eqc5 = eqc5.concat('兜帽');

    eqe5 = eqe5.concat('Robe');
    eqc5 = eqc5.concat('长袍');

    eqe5 = eqe5.concat('Gloves');
    eqc5 = eqc5.concat('手套');

    eqe5 = eqe5.concat('Pants');
    eqc5 = eqc5.concat('短裤');

    eqe5 = eqe5.concat('Shoes');
    eqc5 = eqc5.concat('鞋');
    //轻甲

    eqe5 = eqe5.concat('Helmet');
    eqc5 = eqc5.concat('头盔');

    eqe5 = eqe5.concat('Breastplate');
    eqc5 = eqc5.concat('护胸');

    eqe5 = eqe5.concat('Gauntlets');
    eqc5 = eqc5.concat('手套');

    eqe5 = eqe5.concat('Leggings');
    eqc5 = eqc5.concat('绑腿');

    //重甲

    eqe5 = eqe5.concat('Cuirass');
    eqc5 = eqc5.concat('胸甲');

    eqe5 = eqe5.concat('Armor');
    eqc5 = eqc5.concat('盔甲');

    eqe5 = eqe5.concat('Sabatons');
    eqc5 = eqc5.concat('重靴');

    eqe5 = eqe5.concat('Boots');
    eqc5 = eqc5.concat('长靴');

    eqe5 = eqe5.concat('Greaves');
    eqc5 = eqc5.concat('护腿');
    }

function eq4(){
/////////////////////////////盾或者材料,武器不会出现这个
    eqe4 = eqe4.concat('ddsezxcwer');//防止空缺
    eqc4 = eqc4.concat('');

    //盾
    eqe4 = eqe4.concat('Buckler');
    eqc4 = eqc4.concat('圆盾');

    eqe4 = eqe4.concat('Kite Shield');
    eqc4 = eqc4.concat('鸢盾');

    eqe4 = eqe4.concat('Tower Shield');
    eqc4 = eqc4.concat('塔盾');

	eqe4 = eqe4.concat('Force Shield');
    eqc4 = eqc4.concat('<span style=\"background:#ffa500\" >力场盾</span>');
    ////////////////////////材质前缀////////////////////////

    //布甲
    eqe4 = eqe4.concat('Cotton ');
    eqc4 = eqc4.concat('棉质(布)');

    eqe4 = eqe4.concat('Gossamer');
    eqc4 = eqc4.concat('薄纱(布)');

    eqe4 = eqe4.concat('Phase');
    eqc4 = eqc4.concat('<span style=\"background:#ffa500\" >相位</span><span style=\"background:#FFFFFF;color:#000000\" >(布)</span>');

    //轻甲
    eqe4 = eqe4.concat('Leather');
    eqc4 = eqc4.concat('皮革<span style=\"background:#666666;color:#FFFFFF\" >(轻)</span>');

    eqe4 = eqe4.concat('Kevlar');
    eqc4 = eqc4.concat('凯夫拉<span style=\"background:#666666;color:#FFFFFF\" >(轻)</span>');

    eqe4 = eqe4.concat('Shade');
    eqc4 = eqc4.concat('<span style=\"background:#ffa500\" >暗影</span><span style=\"background:#666666;color:#FFFFFF\" >(轻)</span>');
    //重甲


    eqe4 = eqe4.concat('Plate');
    eqc4 = eqc4.concat('板甲<span style=\"background:#000000;color:#FFFFFF\" >(重)</span>');

    eqe4 = eqe4.concat('Power');
    eqc4 = eqc4.concat('<span style=\"background:#ffa500\" >动力</span><span style=\"background:#000000;color:#FFFFFF\" >(重)</span>');

    //法杖
    eqe4 = eqe4.concat('Ebony');
    eqc4 = eqc4.concat('*乌木');

    eqe4 = eqe4.concat('Redwood');
    eqc4 = eqc4.concat('红木');

    eqe4 = eqe4.concat('Willow');
    eqc4 = eqc4.concat('柳木');

    eqe4 = eqe4.concat('Oak');
    eqc4 = eqc4.concat('橡木');

    eqe4 = eqe4.concat('Katalox');
    eqc4 = eqc4.concat('<span style=\"background:#ffa500\" >铁木</span>(双)');
}
function eq3(){

    eqe3 = eqe3.concat('adfouhasdufojxlkcvo')//防止空缺
    eqc3 = eqc3.concat('')    

///////////////////////////////////////////防具后缀////////////////////////////////////////////

    eqe3 = eqe3.concat('of the Cheetah')
    eqc3 = eqc3.concat('猎豹之')

    eqe3 = eqe3.concat('of Negation')
    eqc3 = eqc3.concat('否定之')

    eqe3 = eqe3.concat('of the Shadowdancer')
    eqc3 = eqc3.concat('影武者')

    eqe3 = eqe3.concat('of the Arcanist')
    eqc3 = eqc3.concat('奥术师')

    eqe3 = eqe3.concat('of the Fleet')
    eqc3 = eqc3.concat('迅捷之')

    eqe3 = eqe3.concat('Spirit-ward')
    eqc3 = eqc3.concat('暗防')

    eqe3 = eqe3.concat('of the Fire-eater')
    eqc3 = eqc3.concat('火防')

    eqe3 = eqe3.concat('Fire-eater')
    eqc3 = eqc3.concat('火防')

    eqe3 = eqe3.concat('of the Thunder-child')
    eqc3 = eqc3.concat('雷防')

    eqe3 = eqe3.concat('of the Wind-waker')
    eqc3 = eqc3.concat('防风')

    eqe3 = eqe3.concat('of the Spirit-ward')
    eqc3 = eqc3.concat('暗防')

    eqe3 = eqe3.concat('of Dampening')
    eqc3 = eqc3.concat('防碎')

    eqe3 = eqe3.concat('of Stoneskin')
    eqc3 = eqc3.concat('防斩')

    eqe3 = eqe3.concat('of Deflection')
    eqc3 = eqc3.concat('防刺')

    eqe3 = eqe3.concat('of the Battlecaster');
    eqc3 = eqc3.concat('战法师');

    eqe3 = eqe3.concat('of the Nimble');
    eqc3 = eqc3.concat('招架');

    eqe3 = eqe3.concat('of the Barrier')
    eqc3 = eqc3.concat('格挡')

    eqe3 = eqe3.concat('of Protection')
    eqc3 = eqc3.concat('物防')

    eqe3 = eqe3.concat('of Warding')
    eqc3 = eqc3.concat('魔抗之')

    eqe3 = eqe3.concat('of the Raccoon')
    eqc3 = eqc3.concat('招架')

    eqe3 = eqe3.concat('of the Frost-born')
    eqc3 = eqc3.concat('寒冰')

////////////////////////////////////////////////////武器后缀/////////////////////////////////

	eqe3 = eqe3.concat('of Slaughter');
    eqc3 = eqc3.concat('<span style=\"background:#FF0000;color:#FFFFFF\" >杀戮</span>');

	eqe3 = eqe3.concat('of Swiftness');
    eqc3 = eqc3.concat('加速');

    eqe3 = eqe3.concat('of Balance');
    eqc3 = eqc3.concat('平衡');

    eqe3 = eqe3.concat('of the Battlecaster');
    eqc3 = eqc3.concat('战法师');


    eqe3 = eqe3.concat('of the Banshee');
    eqc3 = eqc3.concat('夺灵');

    eqe3 = eqe3.concat('of the Illithid');
    eqc3 = eqc3.concat('吸魔');

    eqe3 = eqe3.concat('of the Vampire');
    eqc3 = eqc3.concat('吸血');

    eqe3 = eqe3.concat('of Destruction')
    eqc3 = eqc3.concat('<span style=\"background:#9400d3;color:#FFFFFF\" >毁灭之</span>')

    eqe3 = eqe3.concat('of Surtr')
    eqc3 = eqc3.concat('<span style=\"background:#f97c7c\" >苏尔特之</span>')

    eqe3 = eqe3.concat('of Niflheim')
    eqc3 = eqc3.concat('<span style=\"background:#94c2f5\" >尼芙菲姆之</span>')

    eqe3 = eqe3.concat('of Mjolnir')
    eqc3 = eqc3.concat('<span style=\"background:#f4f375\" >姆乔尔尼尔之</span>')

    eqe3 = eqe3.concat('of Freyr')
    eqc3 = eqc3.concat('<span style=\"background:#7ff97c\" >弗瑞尔之</span>')

    eqe3 = eqe3.concat('of Heimdall')
    eqc3 = eqc3.concat('<span style=\"background:#ffffff\;color:#000000\" >海姆达</span>')

    eqe3 = eqe3.concat('of Fenrir')
    eqc3 = eqc3.concat('<span style=\"background:#000000\;color:#ffffff" >芬里尔</span>')

    eqe3 = eqe3.concat('of Focus')
    eqc3 = eqc3.concat('专注')

    eqe3 = eqe3.concat('of the Elementalist')
    eqc3 = eqc3.concat('元素使')

    eqe3 = eqe3.concat('of the Heaven-sent')
    eqc3 = eqc3.concat('天堂')

    eqe3 = eqe3.concat('of the Demon-fiend')
    eqc3 = eqc3.concat('恶魔')

    eqe3 = eqe3.concat('of the Earth-walker')
    eqc3 = eqc3.concat('地行者')

    eqe3 = eqe3.concat('of the Priestess')
    eqc3 = eqc3.concat('牧师')

    eqe3 = eqe3.concat('of the Curse-weaver')
    eqc3 = eqc3.concat('咒术师')

    eqe3 = eqe3.concat('of the Thrice-blessed')
    eqc3 = eqc3.concat('圣防')
		
}

function eq2(){


///////////////武器或者防具属性/////////////////

    eqe2 = eqe2.concat('dfgdsfgsdge');//防止空缺
    eqc2 = eqc2.concat('');   
	
	eqe2 = eqe2.concat('Radiant');
    eqc2 = eqc2.concat('<span style=\"background:#ffffff\;color:#000000" >魔光的</span>');

	eqe2 = eqe2.concat('Charged');
    eqc2 = eqc2.concat('咏唱');

	eqe2 = eqe2.concat('Charged');
    eqc2 = eqc2.concat('咏唱的');

	eqe2 = eqe2.concat('Amber');
    eqc2 = eqc2.concat('琥珀的');
	
	eqe2 = eqe2.concat('Mithril');
    eqc2 = eqc2.concat('秘银的');

	eqe2 = eqe2.concat('Agile');
    eqc2 = eqc2.concat('俊敏的');

	eqe2 = eqe2.concat('Zircon');
    eqc2 = eqc2.concat('锆石的');

	eqe2 = eqe2.concat('Frugal');
    eqc2 = eqc2.concat('节约的');

	eqe2 = eqe2.concat('Jade');
    eqc2 = eqc2.concat('翡翠的');

	eqe2 = eqe2.concat('Cobalt');
    eqc2 = eqc2.concat('冰蓝的');

	eqe2 = eqe2.concat('Ruby');
    eqc2 = eqc2.concat('红宝石');

	eqe2 = eqe2.concat('Astral');
    eqc2 = eqc2.concat('五芒星');
 
	eqe2 = eqe2.concat('Reinforced');
    eqc2 = eqc2.concat('坚固的');

	eqe2 = eqe2.concat('Shielding');
    eqc2 = eqc2.concat('盾化的');

    eqe2 = eqe2.concat('Arctic')
    eqc2 = eqc2.concat('<span style=\"background:#94c2f5\" >极寒的</span>')

    eqe2 = eqe2.concat('Fiery')
    eqc2 = eqc2.concat('<span style=\"background:#f97c7c\" >灼热的</span>')

    eqe2 = eqe2.concat('Shocking')
    eqc2 = eqc2.concat('<span style=\"background:#f4f375\" >闪电的</span>')

    eqe2 = eqe2.concat('Tempestuous')
    eqc2 = eqc2.concat('<span style=\"background:#7ff97c\" >风暴之</span>')

    eqe2 = eqe2.concat('Hallowed')
    eqc2 = eqc2.concat('<span style=\"background:#ffffff\;color:#000000" >神圣之</span>')

    eqe2 = eqe2.concat('Demonic')
    eqc2 = eqc2.concat('<span style=\"background:#000000\;color:#ffffff" >恶魔之</span>')
/*
    eqe2 = eqe2.concat('Astral')
    eqc2 = eqc2.concat('*灵魂之')
*/
    eqe2 = eqe2.concat('Ethereal')
    eqc2 = eqc2.concat('<span style=\"background:#ffffff\;color:#5c5a5a" >虚空的</span>')

}
function eq1()
{
    /////////////////品质//////////
    eqe1 = eqe1.concat('Crude')
    eqc1 = eqc1.concat('粗糙')
    eqe1 = eqe1.concat('Fair');
    eqc1 = eqc1.concat('较差');
    eqe1 = eqe1.concat('Average');
    eqc1 = eqc1.concat('一般');
    eqe1 = eqe1.concat('Fine')
    eqc1 = eqc1.concat('优质(不再掉落)')
    eqe1 = eqe1.concat('Superior');
    eqc1 = eqc1.concat('<span style=\"background:#ffff80\" >出众</span>'); 
    eqe1 = eqe1.concat('Exquisite');
    eqc1 = eqc1.concat('<span style=\"background:#d7e698\" >☆精良☆</span>'); 
    eqe1 = eqe1.concat('Magnificent');
    eqc1 = eqc1.concat('<span style=\"background:#a6daf6\" >☆史诗☆</span>'); 
    eqe1 = eqe1.concat('Legendary');
    eqc1 = eqc1.concat('<span style=\"background:#f5b9cd\" >★传奇★</span>'); 	
    eqe1 = eqe1.concat('Peerless');
    eqc1 = eqc1.concat('<span style=\"background:#fbc93e\" >★★无双★★</span>'); 
}
}
}