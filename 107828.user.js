// ==UserScript==
// @name           HWM_Kingdom_War
// @namespace      HWM
// @include        http://www.heroeswm.ru/*
//@version  	0.1.7
//@author  	HAPblB
// ==/UserScript==

var version = "0.1.7";

var event_name='goblin';



var hide_map=GM_getValue('hide_map',1);
var klan=GM_getValue('klan_id','');
var show_outklan=GM_getValue('show_outklan',1);
var hide_ico=GM_getValue('hide_ico',1);
var player_id = getPlayerId();
var klan_id='#'+klan;

if(location.href.match(event_name)){
var cssStyle = "";
cssStyle += ".war_options {FONT-SIZE: 10px;BORDER-RIGHT:#020202 2px solid ; BORDER-TOP: #020202 2px solid ;  VERTICAL-ALIGN: top; BORDER-LEFT:#020202 2px solid ;  BORDER-BOTTOM:#020202 2px solid ; padding = '5px';}";
GM_addStyle(cssStyle);

var newdiv = document.createElement('div');
newdiv.className="war_options";
var div_content='';
div_content+='<table border=1 cellspacing=0 width=100%><tr><td width=50%>ID \u043A\u043B\u0430\u043D\u0430:<input type=text id=klan_id  size=4 value='+klan+'></td>';
div_content+='<td width=50%><label for="hdmp" style="cursor:pointer;"><input type=checkbox '+(hide_map?'checked':'')+' id=hdmp>&nbsp;\u0441\u043F\u0440\u044F\u0442\u0430\u0442\u044C \u043F\u043E\u043B\u0435\u0432\u0443\u044E \u043A\u0430\u0440\u0442\u0443</label></td></tr><tr>';
div_content+='<td width=50%><label for="hide_ico" style="cursor:pointer;"><input type=checkbox '+(hide_ico?'checked':'')+' id=hide_ico>&nbsp;\u0441\u043F\u0440\u044F\u0442\u0430\u0442\u044C \u043A\u043B\u0430\u043D-\u0437\u043D\u0430\u0447\u043A\u0438</label></td><td><label for="swout" style="cursor:pointer;"><input type=checkbox '+(show_outklan?'checked':'')+' id=swout>\u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u0432\u043D\u0435\u043A\u043B\u0430\u043D&nbsp;</label><input style="float: right;" type=button value="OK" id="apply_filter"></td>';
div_content+='</tr></table>';
newdiv.innerHTML=div_content;
document.body.appendChild(newdiv);




var obj_fl=document.getElementsByTagName('embed');
//alert(obj_fl.length);
var mn_td;
var top_tbl;
var left_td;
if(obj_fl.length>2){mn_td=obj_fl[2].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.childNodes;obj_fl[2].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.insertBefore(newdiv, mn_td[0]);}
else{
var alli=document.getElementsByTagName('img');
	for(var i=0;i<alli.length;i++)
	//http://im.heroeswm.ru/i/goblin_event.jpg
		//if(alli[i].src.indexOf('/i/'+event_name+'.jpg')>=0)
		if(alli[i].src.indexOf('/i/goblin_event.jpg')>=0)
		{
		//alert(alli[i].parentNode.nextSibling.childNodes[0].innerHTML);
		//mn_td=alli[i].parentNode.parentNode.nextSibling.childNodes;
		mn_td=alli[i].parentNode.nextSibling.childNodes;
		var newhr = document.createElement('hr');
		newhr.setAttribute('style','width: 80%');
		//alli[i].parentNode.parentNode.nextSibling.insertBefore(newhr, mn_td[0]);
		alli[i].parentNode.nextSibling.insertBefore(newhr, mn_td[0]);
		//alli[i].parentNode.parentNode.nextSibling.insertBefore(newdiv, newhr);
		alli[i].parentNode.nextSibling.insertBefore(newdiv, newhr);
		left_td=alli[i].parentNode.parentNode;
		break;
		}
}

document.getElementById('klan_id').addEventListener('blur',function(){GM_setValue('klan_id',document.getElementById('klan_id').value);
klan_id='#'+GM_getValue('klan_id','');},false);
document.getElementById('apply_filter').addEventListener('click',init_war,false);
cut_tables(klan_id,show_outklan,hide_map,hide_ico);
top_tbl=left_td.childNodes[left_td.childNodes.length-2].childNodes[0].childNodes;
for(var y=0;y<top_tbl.length;y++)
	{
	var newtd = document.createElement('td');
	newtd.innerHTML=(y+1);
	top_tbl[y].insertBefore(newtd,top_tbl[y].childNodes[0]);
	if(top_tbl[y].childNodes[1].innerHTML==klan_id)
		{
		var new_style='background: none repeat scroll 0% 0% rgb(224, 170, 170);';
		top_tbl[y].childNodes[0].setAttribute('style',new_style);
		top_tbl[y].childNodes[1].setAttribute('style',new_style);
		top_tbl[y].childNodes[2].setAttribute('style',new_style);
		top_tbl[y].childNodes[3].setAttribute('style',new_style);
		}
	}
}

function init_war(){
GM_setValue('klan_id',document.getElementById('klan_id').value);
klan_id='#'+GM_getValue('klan_id','');
if(document.getElementById('hdmp').checked==true)hide_map=1; else hide_map=0;
if(document.getElementById('hide_ico').checked==true)hide_ico=1; else hide_ico=0;
if(document.getElementById('swout').checked==true)show_outklan=1; else show_outklan=0;
GM_setValue('hide_map',hide_map);
GM_setValue('hide_ico',hide_ico);
GM_setValue('show_outklan',show_outklan);
location.reload();//cut_tables(klan_id,show_outklan,hide_map);
}


function cut_tables(klan_id,show_outklan,hide_map,hide_ico){
if(hide_map&&obj_fl.length>2)obj_fl[2].parentNode.removeChild(obj_fl[2]);
//alert(klan_id +'\n'+show_outklan+'\n'+hide_map);
//alert(mn_td.parentNode.innerHTML);
var tmp_cell;
for(var i=mn_td.length-1; i>0;i--)
{
    if(mn_td[i].nodeName=='TABLE')
        {
         var ttr=mn_td[i].childNodes[0].childNodes;   
			for(var q=0;q< ttr.length;q++){
	
	//alert(ttr[q].childNodes[1].childNodes[0].nodeName);
			
				var tmp_tr=ttr[q].childNodes[1].childNodes[0].childNodes[0].childNodes; 
				for(var j=0;j< tmp_tr.length;j++){
					if(tmp_tr[j].childNodes.length>1){
/*			
				if(tmp_tr[j].childNodes[0].getAttribute('rowspan')){
				tmp_cell=tmp_tr[j].childNodes[0].innerHTML;
				tmp_tr[j].childNodes[0].setAttribute('rowspan','1');
				}else tmp_cell='';


				if(tmp_tr[j].childNodes.length!=3){
				
				var new_td= document.createElement('td');
				new_td.innerHTML=tmp_cell;
				new_td.setAttribute('class','wbwhite');
				tmp_tr[j].insertBefore(new_td, tmp_tr[j].childNodes[0]);				
				}
				
				
				tmp_tr[j].childNodes[0].style.width='0px';
*/				
				tmp_tr[j].childNodes[0].style.width='95px';


				var tmp_tr_inner=tmp_tr[j].childNodes[0].innerHTML;
				//alert(tmp_tr_inner);
				var hidding=true;
				
				if(hide_ico){
				var all_ico=tmp_tr[j].childNodes[1].getElementsByTagName('img');
					 for(e=all_ico.length-1;e>=0;e--)
						if(all_ico[e].src.match('i_clans'))all_ico[e].parentNode.removeChild(all_ico[e]);
				}
				
				if(tmp_tr_inner.match('>'+klan_id+'<')||tmp_tr_inner==klan_id ||klan_id=='#'){
				if(klan_id!='#'){//alert(klan_id);
					 tmp_tr[j].childNodes[0].innerHTML=tmp_tr[j].childNodes[0].innerHTML.replace(klan_id,'&nbsp;<a href="http://www.heroeswm.ru/clan_info.php?id='+klan_id.replace('#','')+'"><img src="http://www.heroeswm.ru/i_clans/l_'+klan_id.replace('#','')+'.gif" border=0></a>'+klan_id);
					 }
				hidding=false;
				} else 
				
				//http://www.heroeswm.ru/goblin_join.php?quest=gobl_event&id=1606286
				if((tmp_tr[j].childNodes[1].innerHTML.match(event_name+'_join'))&&show_outklan)
					{
					 tmp_tr[j].childNodes[0].innerHTML=tmp_tr[j].childNodes[0].innerHTML.replace(klan_id,'&nbsp;<a href="http://www.heroeswm.ru/clan_info.php?id='+klan_id.replace('#','')+'"><img src="http://www.heroeswm.ru/i_clans/l_'+klan_id.replace('#','')+'.gif" border=0></a>'+klan_id);
					 hidding=false;
					} else
				if(tmp_tr[j].childNodes[1].innerHTML.match(event_name+'_create'))hidding=false;
				
				else 
				if(tmp_tr[j].childNodes[1].innerHTML.match('id='+player_id+'">'))
					hidding=false;
				
				if(hidding)tmp_tr[j].style.display='none'; else tmp_tr[j].style.display='';
				//if(obj_fl.length>2)setColoredKKlan(tmp_tr[j]);
				
				if(tmp_tr_inner.match('#')&&!tmp_tr_inner.match('img'))
					{
					var pattern=/(.*)(>#)(\d*)\<(.*)/;
					//alert(pattern.exec(tmp_tr_inner)[3]);
					//&nbsp;<a href="clan_info.php?id=2213" class="pi">#2213</a>&nbsp;
					
					tmp_tr[j].childNodes[0].innerHTML='<a href="http://www.heroeswm.ru/clan_info.php?id='+pattern.exec(tmp_tr_inner)[3]+'"><img src="http://www.heroeswm.ru/i_clans/l_'+pattern.exec(tmp_tr_inner)[3]+'.gif" border=0></a>'+tmp_tr_inner;
					//alert(tmp_tr_inner);
					}
					}
				
				}
		}
        break;
		}
}
}

function getPlayerId(){
	var all_li_subnav = document.evaluate("//li[@class='subnav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var my_li;
	var elm;
	var prev_elm;
	
	// get player ID
	my_li = all_li_subnav.snapshotItem(5);
	prev_elm = my_li.childNodes[1].childNodes[1];
		//alert("Player ID = \n" +prev_elm.innerHTML);
	//
	var ptrn = /<a href="pl_hunter_stat\.php\?id=(.*)">(.*)<\/a>/;
	var pid = prev_elm.innerHTML.replace(ptrn, "$1")
	
	return pid;
}

function setColoredKKlan(my_tr){
     var clan_td = my_tr.childNodes[1];
     var clan_td_str = my_tr.childNodes[1].innerHTML;
     //
     if(clan_td_str.match('#G')){clan_td.style.background = "#FFCCCC";}
     else if(clan_td_str.match('#E')){clan_td.style.background = "#FFFFCC";}
     else if(clan_td_str.match('#I')){clan_td.style.background = "#FFCCFF";}
     else if(clan_td_str.match('#J')){clan_td.style.background = "#ccffcc";}     
     
}

