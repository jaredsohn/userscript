// ==UserScript==
// @name          HWM_Log_Collector
// @author        HAPblB
// @description   HWM mod - collects battle logs and sends them to WitchHammer's DB
// @version       0.2
// @include       http://www.heroeswm.ru/pl_warlog.php*
// @namespace HWM
// ==/UserScript==




var battle_id;
var gn_type;
var cssStyle = "";
cssStyle += ".WMcollector {height: 16px;FONT-SIZE: 10px;BORDER-RIGHT:#020202 1px solid ; BORDER-TOP: #020202 1px solid ;  VERTICAL-ALIGN: top; BORDER-LEFT:#020202 1px solid ;  BORDER-BOTTOM:#020202 1px solid ;  }";
cssStyle += ".WMcontaner { TEXT-ALIGN: right;  }";
GM_addStyle(cssStyle);

var main_tbs=document.getElementById('war_log');
	for(var r=0;r<120;r++)
		if(main_tbs.childNodes[0].childNodes[r].childNodes[1])
			{
				var rec1=main_tbs.childNodes[0].childNodes[r].childNodes[0];
				var rec2=main_tbs.childNodes[0].childNodes[r].childNodes[1];
				battle_id=(/(<a.*warlog\.php\?warid=)(\d+)(">)/).exec(rec1.innerHTML)[2] ;

				if(rec2.innerHTML.search(/\u043D\u0430\u0431\u0435\u0433\u0438 \{\d+\}/)!=-1){		//nabegi
				gn_type=0;
				create_button(battle_id,gn_type);
				}
				if(rec2.innerHTML.search(/-\u043C\u043E\u043D\u0441\u0442\u0440 \{\d+\}/)!=-1){		//monster
				gn_type=1;
				create_button(battle_id,gn_type);
				}
				if(rec2.innerHTML.search(/\u0437\u0430\u0433\u043E\u0432\u043E\u0440\u0449\u0438\u043A\u0438 \{\d+\}/)!=-1){		//zagovor
				gn_type=2;
				create_button(battle_id,gn_type);
				}
				if(rec2.innerHTML.search(/-\u0437\u0430\u0445\u0432\u0430\u0442\u0447\u0438\u043A\u0438 /)!=-1){  //zahvatchiki
				gn_type=3;
				create_button(battle_id,gn_type);
				}

				if(rec2.innerHTML.search(/-\u0440\u0430\u0437\u0431\u043E\u0439\u043D\u0438\u043A\u0438 /)!=-1){  //razboiniki  
				gn_type=4;
				create_button(battle_id,gn_type);
				}				
			
			
				if(rec2.innerHTML.search(/\u041E\u0442\u0440\u044F\u0434 /)!=-1){  //otriadi    
				gn_type=5;
				create_button(battle_id,gn_type);
				}
				

			}
	
	
function create_button(battle_id,gn_type){
	var hard=(/(\{)(\d+)(\})/).exec(rec2.innerHTML)[2] ;
	var inp1 = document.createElement('input');
	inp1.type = 'button';
	inp1.value = 'send to WH';
	inp1.id = battle_id+"_"+gn_type+"_"+hard;
	inp1.className='WMcollector';
	var inpdiv=document.createElement('span');
	
	inpdiv.style.cssFloat = 'right';
	rec2.appendChild(inpdiv);
	tmp_log_value='mg_'+battle_id;
	if(GM_getValue(tmp_log_value,'undefined')=='undefined')GM_setValue(tmp_log_value,false);
	if(GM_getValue(tmp_log_value)){var new_span=document.createElement('span');
	new_span.innerHTML='&nbsp;&nbsp;<b> - <font color="#FF0000">sent to WH</font></b>';
	inpdiv.appendChild(new_span);}else{var each_input=inpdiv.appendChild(inp1);each_input.addEventListener('click', function(){parse_mg(this.id);
	this.type='hidden';
	var new_span=document.createElement('span');
	new_span.innerHTML='&nbsp;&nbsp;<b> - <font color="#FF0000">sent to WH</font></b>';
	this.parentNode.appendChild(new_span);}, false);};
}
				



function parse_mg(battle_id)
{
		var log_data=battle_id.split("_");
		var priemnik=new Array(
		'http://www.witchhammer.ru/mg/attacks/attacks_add.php',//nabegi
		'http://www.witchhammer.ru/mg/monster/monster_add.php',//monster
		'http://www.witchhammer.ru/mg/conspirator/conspirator_add.php',//zagovor
		'http://www.witchhammer.ru/mg/agressors/agressors_add.php',//zahvat
		'http://www.witchhammer.ru/mg/robbers/robbers_add.php',//razboi
		'http://www.witchhammer.ru/mg/groups/groups_add.php'//otriad
		)
		var postData = "addbid="+log_data[0]+"&n_hard="+log_data[2] ;
		GM_xmlhttpRequest
	({
		method: "POST",
		url: priemnik[log_data[1]] ,
		data: postData ,
		headers:
		{
			'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.8.1)',
			'Accept': 'text /xml,application/xml,application/xhtml+xml,text/html',
			'Content-type': 'application/x-www-form-urlencoded'
		} ,
		onload:function(res)
		{
			return false;
		}
	});
	GM_setValue('mg_'+log_data[0],true);
}


