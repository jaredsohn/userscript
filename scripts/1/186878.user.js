// ==UserScript==  
// @name          show GA data
// @version       1.0
// @author        Neo 
// @include       http://gaw29.play168.com.tw/web3/mercenary.php
// ==/UserScript==
var att={
'rarity':'階級',
'lv':'等級',
'name':'名稱',
'job':'型號',
'race':'類型',
'action':'能力',
'none1':'',

'cumexp':'此等累積經驗',
'exp':'現在經驗',
'need':'升級所需經驗',
'none2':'',

'gp':'好感度',
'tp':'行動力',
'none3':'',

'point':'能力點數',
'max_point':'已合成點數',
'reinforce':'合成次數',
'none4':'',

'troop':'能源載量',
'base_troop':'空身數值',
'none5':'',

'magic':'基本命中',
'base_magic':'空身數值',
'max_magic':'合成上限',
'none6':'',

'foot':'對空攻擊',
'base_foot':'空身數值',
'max_foot':'合成上限',
'none7':'',

'spear':'對地攻擊',
'base_spear':'空身數值',
'max_spear':'合成上限',
'none8':'',

'rider':'對空防禦',
'base_rider':'空身數值',
'max_rider':'合成上限',
'none9':'',

'bow':'對地防禦',
'base_bow':'空身數值',
'max_bow':'合成上限',
'none10':'',

'attack':'迴避率',
'base_attack':'迴避率基值',
'max_attack':'迴避率上限',
'none11':'',

'skill1':'技能1',
'stip1':'技能1描述',
'none12':'',

'skill2':'技能2',
'stip2':'技能2描述',
'none13':'',

'skill3':'技能3',
'stip3':'技能3描述',
'none14':'',

'skill4':'技能4',
'stip4':'技能4描述',
'none15':'',

'pvp_all':'對戰次數',
'pvp_win':'對戰勝利次數',
'm_rank':'官階',
'mrank':'官階名稱',
'adventure':'探險次數',
'battle':'戰鬥次數',
'win':'戰鬥勝利次數'
};

document.write('<table border=1 cellspacing=0>');
document.write('<tr>');
for(j in att){
	if(att[j].length==0)
		document.write('<td nowrap rowspan='+merc_data.length+1+' width=30>');
	else
		document.write('<td nowrap>'+att[j]+'</td>');
}
document.write('</tr>');
for(i in merc_data){
	document.write('<tr>');
	for(j in att){
		if(att[j].length!=0)document.write('<td nowrap>'+eval('merc_data[i].'+j)+'</td>');
	}
	document.write('</tr>');
}
document.write('</table>');