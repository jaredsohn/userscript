// ==UserScript==
// @name           [HWM] Портал времени
// @namespace      фильтр по БК в прошлом
// @include        http://www.heroeswm.ru/tj_event.php*
// @include        http://178.248.235.15/tj_event.php*
// @include        http://qrator.heroeswm.ru/tj_event.php*
// @version  	0.1.5
// @author  	HAPblB, armin4ik
// ==/UserScript==

var version = "0.1.97";
//tj_event.php
var event_name='tj';
var event_desc='tj_event';



var hide_map=GM_getValue('hide_map',0);
var klan=GM_getValue('klan_id','');
var show_outklan=GM_getValue('show_outklan',1);
var hide_ico=GM_getValue('hide_ico',1);
var player_id = getPlayerId();
var klan_id='#'+klan;
var alli=document.getElementsByTagName('img');

if(location.href.match(event_name+'_event')){
var cssStyle = "";
cssStyle += ".war_options {FONT-SIZE: 10px;BORDER-RIGHT:#020202 0px solid ; BORDER-TOP: #020202 0px solid ;  VERTICAL-ALIGN: top; BORDER-LEFT:#020202 0px solid ;  BORDER-BOTTOM:#020202 0px solid ; padding = '5px';}";
GM_addStyle(cssStyle);

var newdiv = document.createElement('div');
newdiv.className="war_options";
var div_content='';
div_content+='<table border=0 cellspacing=0 width=100%><tr><td width=50%>&nbsp;ID \u043A\u043B\u0430\u043D\u0430:&nbsp;<input type=text id=klan_id  size=4 value='+klan+'></td>';
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

if(obj_fl.length>2)
	{
mn_td=obj_fl[2].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.childNodes;}
else{
	for(var i=0;i<alli.length;i++)
		if(alli[i].src.indexOf('/i/tj_event.jpg')>-1)
		{
           // alert(alli[i].src);
		//alert(alli[i].parentNode.nextSibling.childNodes.length);
		//mn_td=alli[i].parentNode.parentNode.parentNode.parentNode.parentNode.childNodes;
            mn_td=alli[i].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.childNodes;
		var newhr = document.createElement('hr');
		newhr.setAttribute('style','width: 95%');
           // alert(alli[i].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.childNodes[0].nodeName);
		alli[i].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.insertBefore(newhr, mn_td[0]);
		alli[i].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.insertBefore(newdiv, newhr);
		left_td=alli[i].parentNode.parentNode;
		
            break;
		}
}

//obj_fl[2].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.insertBefore(newdiv, mn_td[0]);
document.getElementById('klan_id').addEventListener('blur',function(){GM_setValue('klan_id',document.getElementById('klan_id').value);
klan_id='#'+GM_getValue('klan_id','');},false);
document.getElementById('apply_filter').addEventListener('click',init_war,false);
cut_tables(klan_id,show_outklan,hide_map,hide_ico);
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
location.reload();
}


function cut_tables(klan_id,show_outklan,hide_map,hide_ico){
//if(hide_map&&obj_fl.length>2)obj_fl[2].parentNode.removeChild(obj_fl[2]);


var tmp_cell;
for(var i=mn_td.length-1;i>0; i--)
{
    
  //  alert(mn_td[i].innerHTML);
    if(mn_td[i].nodeName=='TABLE'&&mn_td[i].childNodes.length>0)
        {
			//alert(i+'\n'+mn_td.length+'\n'+mn_td[i].innerHTML);
            
			var tmp_tr=mn_td[i].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes;   
			//alert(tmp_tr.length);
            for(var j=1;j< tmp_tr.length;j++){
				//alert('!!!');
/*					if(tmp_tr[j].childNodes[0].getAttribute('rowspan')){
					tmp_cell=tmp_tr[j].childNodes[0].innerHTML;
					tmp_tr[j].childNodes[0].setAttribute('rowspan','1');
					}
					if(tmp_tr[j].childNodes.length!=3){
					
					var new_td= document.createElement('td');
					new_td.innerHTML=tmp_cell;
					new_td.setAttribute('class','wbwhite');
					tmp_tr[j].insertBefore(new_td, tmp_tr[j].childNodes[0]);				
					}
*/

		//alert('!');		
				tmp_tr[j].childNodes[0].style.width='100px';
				//tmp_tr[j].childNodes[1].style.width='95px';



			
				var hidding=true;
				
				if(hide_ico){
				var all_ico=tmp_tr[j].childNodes[1].getElementsByTagName('img');
					 for(e=all_ico.length-1;e>=0;e--)
						if(all_ico[e].src.match('i_clans'))all_ico[e].parentNode.removeChild(all_ico[e]);
				}
                    	//alert(tmp_tr[j].childNodes[0].innerHTML);
             				var tmp_tr_inner=tmp_tr[j].childNodes[0].innerHTML;
				
				if(tmp_tr_inner.match('>'+klan_id+'<')||tmp_tr_inner==klan_id ||klan_id=='#'){
				if(klan_id!='#'){//alert(klan_id);
					// tmp_tr[j].childNodes[0].innerHTML=tmp_tr[j].childNodes[0].innerHTML.replace(klan_id,'&nbsp;<a href="http://www.heroeswm.ru/clan_info.php?id='+klan_id.replace('#','')+'"><img src="http://dcdn.heroeswm.ru/i_clans/l_'+klan_id.replace('#','')+'.gif?v=132" border=0></a>'+klan_id);
					 }
				hidding=false;
				
				
				} else 
				if(tmp_tr[j].childNodes[1].innerHTML.match(event_desc+'_join')&&show_outklan)
					{
					 tmp_tr[j].childNodes[0].innerHTML=tmp_tr[j].childNodes[0].innerHTML.replace(klan_id,'&nbsp;<a href="http://dcdn.heroeswm.ru/clan_info.php?id='+klan_id.replace('#','')+'"><img src="http://www.heroeswm.ru/i_clans/l_'+klan_id.replace('#','')+'.gif?v=132" border=0></a>'+klan_id);
					 hidding=false;
					} else
				if(tmp_tr[j].childNodes[0].innerHTML.match(event_desc+'_create'))hidding=false;
				
				else 
				if(tmp_tr[j].childNodes[1].innerHTML.match('id='+player_id+'">'))
					hidding=false;
				
				if(hidding)tmp_tr[j].style.display='none'; else tmp_tr[j].style.display='';
				//setColoredKKlan(tmp_tr[j]);
				
				if(tmp_tr_inner.match('#')&&!tmp_tr_inner.match('img')&&!tmp_tr_inner.match('px;"> vs#'))
					{
					var pattern=/(.*\>#)(\d*)\<(.*)/;
					var pattern2=/(#)(\d*)/;

					var img_beg='<img border="0" src="http://www.heroeswm.ru/i_clans/l_';
					var img_end='.gif?v=132" border=0>';
					if(tmp_tr_inner.match('clan_info')){
					
					
					tmp_tr[j].childNodes[0].innerHTML=tmp_tr[j].childNodes[0].innerHTML.replace('#'+pattern.exec(tmp_tr_inner)[2],img_beg+pattern.exec(tmp_tr_inner)[2]+img_end+'#'+pattern.exec(tmp_tr_inner)[2]);
					
					} else {tmp_tr[j].childNodes[0].innerHTML=tmp_tr[j].childNodes[0].innerHTML.replace('#'+pattern2.exec(tmp_tr_inner)[2],img_beg+pattern2.exec(tmp_tr_inner)[2]+img_end+'#'+pattern2.exec(tmp_tr_inner)[2]);}
					

//alert(tmp_tr_inner);
					}
					}
				
				
				}
		}
       // break;

	fake_img='/i_clans/l_.gif?v=132';
	for(var i=0;i<alli.length;i++)
		{
		if(alli[i].src.indexOf(fake_img)>=0){alli[i].parentNode.removeChild(alli[i]);};
		if(alli[i].src.indexOf('i/tj_event.jpg')>=0){
		//alert(klan_id);
			left_td=alli[i].parentNode.parentNode.parentNode;
			top_tbl=left_td.childNodes[3].childNodes[0].childNodes[2].childNodes[0].childNodes;
				for(var y=0;y<top_tbl.length;y++)
					{
					//alert(top_tbl[y].innerHTML);
					
					if(top_tbl[y].childNodes[1].innerHTML.indexOf('>'+klan_id+'<')>=0)
						{//alert('!!!!!!!!!!');
						var new_style='background: none repeat scroll 0% 0% rgb(224, 170, 170);';
						top_tbl[y].childNodes[0].setAttribute('style',new_style);
						top_tbl[y].childNodes[1].setAttribute('style',new_style);
						top_tbl[y].childNodes[2].setAttribute('style',new_style);
						top_tbl[y].childNodes[3].setAttribute('style',new_style);
						}
					}
	
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
     var clan_td = my_tr.childNodes[0];
     var clan_td_str = my_tr.childNodes[0].innerHTML;
     //
     if(clan_td_str.match('#A')){clan_td.style.background = "#FFCCCC";}
     else if(clan_td_str.match('#B')){clan_td.style.background = "#FFFFCC";}
     else if(clan_td_str.match('#C')){clan_td.style.background = "#FFCCFF";}
     else if(clan_td_str.match('#D')){clan_td.style.background = "#ccffcc";}     
     else if(clan_td_str.match('#E')){clan_td.style.background = "#ccccff";}     
     else if(clan_td_str.match('#F')){clan_td.style.background = "#ffffff";}     
     
}