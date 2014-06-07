// ==UserScript==
// @name           Brawler
// @author         Arun
// @description     Picks targets off the fightlist and auto attacks
// ==/UserScript==

// 09/04/2010 Added loot sorting, replaced 2x exp from fan bonus back to normal
// 15/04/2010 V2.0 Released, Features -
//                  Attack individual or a set of users
//                  Spammers list added to User attack
//                  Minimum cash limit per attack
// 19/04/2010 Fixed calling of loaduserlist instead of loadfightpage in process_attack function
// 20/04/2010 Added logging of the Animal loot
// 01/05/2010 Added 1. Ability to Limit number of attacks per person
//                  2. Banking ability beyond certain amount of cash in hand
//                  3. Cash farming only from same city
// 04/05/2010 Added Faction fighting
// 06/05/2010 Changed retry time to 30 seconds
//            Changed some errors in heal() function calls
// 10/05/2010 Faction balance code added
//            Changed bank code a bit
//            Auto bank added to user attack mode
//            Stop before level up made optional
// 17/05/2010 Cookies added
//            Auto Banking call fixed
// 20/05/2010 Added fetching of the new ids from the profile page
// 26/05/2010 Consolidated the end of fightlist check code into next() function
//            Added a ice check function
// 08/06/2010 Added a city check function in case travel back didn't work
// 16/06/2010 Added double loot logging, Add to loot function includes loot count param
//            Opponent Iced checks changed for new Ice reporting system
//            Dead/Ice checking url changed to new url
// 17/06/2010 Loot logging fixed
//            Special event loot logging added
// 21/06/2010 Heal function fixed to handle json data
//            Ignore characters stored in cookies differently
// 22/06/2010 Mafia Attack, Defense stats added
//            Fixed a bug with the mafia count
// 25/06/2010 Added Power attack functionality
//            Changed loot logging a bit
// 30/06/2010 Added Stash/Ice posting (manual)
//            Total Ice/killed count added
//            'Fights' now track stam used instead of fights
//            Added a Healing option 'disable'
// 02/07/2010 Changed a bit of code around to make loot logging and stash/ice link posting to not hang up the browser
// 09/07/2010 Added user exp to level up field, Heal threshold limit
// 21/07/2010 Fixed cash logging bug after LV was released
// 21/07/2010 Updated for Vegas
// 28/07/2010 Added city check in heal
//            Loot categorising, loot pic mouseover stuff
//            Loot logging and attack log optimised

var trace_enable=false;
var skip_reason;

javascript:(function(){
    var run=false;
    var req;
    var temp_variable;
    var fighttable;
    var fightlist_names=[];
    var fightlist_char_names=[];
    var fightlist_levels=[];
    var fightlist_attack=[];
    var fightlist_mafia=[];
    var fightlist_faction=[];
    var i=0,j=0;
    var user_count=0,actual_count=0;
    var cash_city = 1;
    var ny_cash=0, moscow_cash=0, bk_cash=0, cuba_cash=0, vegas_cash=0;
    var exp_gained=0;
    var heal_travel=false;
    var health_lost=0;
    var user_health;
    var exp_ratio;
    var exp_ratio_reqd;
    var exp_to_levelup;
    var fightlist_loaded=false;
    var fightlist_match=0;
    var win=0, loss=0;
    var loot_item=[],loot_count,loot_log,l_log='';
    var loot_img;
    var total_loot=0,temp_loot;
    var attack_log=[];
    var strong_list=[];
    var kills=0, ices=0;
    var killed=false, iced=false;
    var attack_or_not=false;
    var attack_count=0;
    var Fightsource = "Fightlist";
    var user_list = [];
    var user_names = [];
    var user_urls = [];
    var tmp_key = [];
    var cash=0, cash_limit=0, cash_in_hand=0;
    var firsttime = true;
    var AddMeSpammers = 

"1569115939\n100001286926607\n100001244326208\n1645819657\n100001067598459\n100001047658084\n100000898380439\n10000100

7957685\n100000375495674\n1206819058\n100000848734871\n1793236735\n100000854181941\n100000832602631\n100000848734871\n

639239336\n1830672943\n1027758678\n100000956712356";
    var timeout_timer;
    var fight_city;
    var userid;
    var Triad=0, Yakuza=0;
    var iced = false;
    var mafia_attack,initial_mafia_attack=0;
    var mafia_defense,initial_mafia_defense=0;
    var power_attack = false, user_power_attack = false;
    var iced_count=0,killed_count=0;
    var iced_posts = [];
    var stash_posts = [];
    var vault_tmp_variable='', vault_cb_variable='';
    //cookie stuff
    var wait1=1, wait2=2;
    var heal_city=1, heal_city_text='New York';
    var levelup_halt=true, levelup_text='Stop';
    var ignore_chars='';
    var bank_enable='',user_bank_enable='', bank_limit=10000;
    var attack_limit_enable='', attack_limit_count=3;
    var lower_mafia = 1, upper_mafia = 501;
    var upper_level = 9999, lower_level = 0;
    var min_cash = 0;
    var same_city_cash = 'checked';
    var faction_bal_points = 10;
    var faction_attack = 'checked', triad_fac = '', yakuza_fac = '', faction_bal = 'checked';
    var ice_check_enable = 'checked';
    var power_attack_enable = false,user_power_attack_enable = false;;
    var heal_thres = 30;
    
    var frame=document.getElementsByName('mafiawars');

    try{
	if(frame.length>0 || (!frame)){
		window.location.href=document.getElementsByName('mafiawars')[0].src;
		return;
	}
	else{
        document.body.parentNode.style.overflowY="scroll";
		try{
            if(typeof FB!='undefined'){
                FB.CanvasClient.stopTimerToSizeToContent;
                window.clearInterval(FB.CanvasClient._timer);
                FB.CanvasClient._timer=-1;
            }
		}
        catch(err){}
	}
	}
	catch(err){}	
	
    try{ 
        document.getElementById('setup_progress_bar').parentNode.removeChild(document.getElementById

('setup_progress_bar')); 
    } 
    catch(err){}
    
    try{
        document.getElementById('header_top_promo_banner').parentNode.removeChild(document.getElementById

('header_top_promo_banner'));
    }
    catch(fberr){}
      
    try{
        document.getElementById('buyframe_link_container_anim').parentNode.removeChild(document.getElementById

('buyframe_link_container_anim'));
    }
    catch(fberr){}
    try{
        document.getElementById('buyframe_link_cover_anim').parentNode.removeChild(document.getElementById

('buyframe_link_cover_anim'));
    }
    catch(fberr){}
    
    var userid = /sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
    
    fight_city = current_city();
    
    var temp_key = /&tmp=(.+?)&/.exec(document.body.innerHTML)[1];
    var cb_value = /&cb=(.+?)&/.exec(document.body.innerHTML)[1];
    //Mr redneck cunt and his equally stupid mrs
    if(userid == 'p|47869484' || userid == 'p|78199035'){
        return;
    }
    
    readCookieStuff();
    
    var styles='<style type="text/css">'+
        '.sexy_table1{font-weight:bold; border:1px solid #666666; padding-left:10px; }'+
        '.sexy_error_table{font-size:17px; background-color:black; color:red; padding-left:10px display:none}'+
    	'.sexy_select{font-weight:bold; color:#D0D0D0; border: 1px solid #666666; background-color:black; width:100%; 

font-size:15px; }'+
        '.sexy_input{background-color:black; color:#D0D0D0; font-size:13px; border: 1px solid #666666; padding-

left:0.1em}'+
    	'.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 10px; font-

weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}'+
        '.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid 

#FFD927; overflow: hidden;}'+
        '</style>';
        
    var table_html='<form id="something">'+
			'<table width="745px" style="border:1px solid #666666; background-color:black;">'+

			'<tr>'+
			'<td width="100%" style="border:1px solid #666666;">'+
            '<table style="background-color:black; height:40px">'+
            '<tr>'+
            '<th width="50%" style="font-size:20px; padding-left:15px;text-align: left">Brawler v3.3</th>'+
			'<th width="48%" style="font-size:12px; text-align:right"> <a id="Website" align="right" 

href="http://arun.keen-computing.co.uk" target="_blank">Arun\'s Mafia Wars Helpers</a> - <a id="Donate" 

href="http://arun.keen-computing.co.uk/?page_id=31" target="_blank">Donate</a></th>'+
			'<th width="2%" align=center><a href="#" id="close"><img alt="Exit" 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></th>'+
			'</tr>'+
            '</table>'+
            '</td>'+
			'</tr>'+
			
			'<tr>'+
			'<td width="100%">'+
			'<table width=100% style="background-color:black;">'+
			'<tr style="height:10px">'+
            '<td width="10%">Fights</td>'+
            '<td width="1%">:</td>'+
            '<td width="2%" id="fights">0</td>'+
            '<td width="3%">Of</td>'+
            '<td width="75%"><input type=text id="attackcount" value="0" class="sexy_input" style="width:30px" 

onkeydown="return field_validate(event.keyCode);"> / Exp to Level : <input type=text id="exp_to_level" value="0" 

class="sexy_input" style="width:30px" onkeydown="return field_validate(event.keyCode);"></td>'+
            '<td width="9%"><a id="pause" href="#" style="display:none"><img align="right" alt="Pause" 

src="http://arun.keen-computing.co.uk/pause.png"></img></a>'+
            '<a id="begin" href="#" style="display:inline"><img align="right" alt="Start" src="http://arun.keen-

computing.co.uk/play.png"></img></a></td>'+
            '</tr></table>'+
			'</tr>'+
			
//			'<tr>'+
//			'<td width="100%">'+
//			'<table width=100% style="background-color:black;">'+
//			'<tr style="height:10px">'+
//            '<td width="10%">On stop</td>'+
//            '<td width="1%">:</td>'+
//            '<td width="89%">Restart in <input type=text id="restart_min" value="1" class="sexy_input" 

style="width:25px" onkeydown="return field_validate(event.keyCode);"> minutes, <input type="checkbox" 

id="finish_heal_enable">Heal, Travel to </td>'+
//            '</tr></table>'+
//			'</tr>'+
//			
			'<tr>'+
			'<td width="100%">'+
			'<table width=100% style="background-color:black;">'+
			'<tr style="height:10px">'+
            '<td width="10%">Exp Gain</td>'+
            '<td width="1%">:</td>'+
            '<td width="25%">&nbsp;<span id="exp_gained">0</span> &nbsp;(<span id="exp_ratio">0.00</span> exp/stam)

</td>'+
            '<td width="12%" align="right">Exp Required</td>'+
            '<td width="1%" align="right">:</td>'+
            '<td width="28%" align="right"><span id="exp_reqd">0</span> &nbsp;(<span id="exp_ratio_reqd">0.00</span> 

exp/stam)</td>'+
            '<td width="5%">Wins</td>'+
            '<td width="1%">:</td>'+
            '<td width="5%"><span class="good" id="wins">0</span></td>'+
            '<td width="1%">&nbsp;</td>'+
            '<td width="5%">Losses</td>'+
            '<td width="1%">:</td>'+
            '<td width="5%"><span class="bad" id="losses">0</span></td>'+
			'</tr>'+
			'</table>'+	
            '</td>'+
			'</tr>'+
			
			'<tr>'+
			'<td width="100%">'+	
			'<table width=100% style="background-color:black;">'+
			'<tr style="height:10px">'+
            '<td width="10%">Status</td>'+
            '<td width="1%">:</td>'+
            '<td width="62%"><span id="status">&nbsp;</span></td>'+
            '<td width="13%">Heal City <input type=text id="heal_thres" value="'+heal_thres+'" class="sexy_input" 

style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>'+
            '<td width="1%">:</td>'+
            '<td width="13%">&nbsp;<a id="heal_city_change" href="#"><span id="heal_city">'+heal_city_text

+'</span></a></td>'+
			'</tr>'+
			'</table>'+
			'</td>'+
			'</tr>'+
			
			'<tr>'+
			'<td width="100%">'+	
			'<table width=100% style="background-color:black;">'+
			'<tr style="height:10px">'+
            '<td width="10%">Cash</td>'+
            '<td width="1%">:</td>'+
            '<td width="56%"><span id="cash"><span class="good"><img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img> $0&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cubanpeso_16x11_01.gif"></img>&nbsp;C$0&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_moscow_16x16_01.gif"></img>&nbsp;R$0&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_bangkok_16x16_01.gif"></img>&nbsp;B$0&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png"></img>&nbsp;V$0</span></span></td>'+
            '<td width="1%">&nbsp;</td>'+
            '<td width="10%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/victory_icon.gif"></img><span 

id="Victorycoins">0</span></td>'+
            '<td width="1%">&nbsp;</td>'+
            '<td width="8%">Delay</td>'+
            '<td width="1%">:</td>'+
            '<td width="5%"><input type=text id="delay1" value="'+wait1+'" class="sexy_input" style="width:25px" 

onkeydown="return field_validate(event.keyCode);"></td>'+
            '<td width="2%">to</td>'+
            '<td width="5%"><input type=text id="delay2" value="'+wait2+'" class="sexy_input" style="width:25px" 

onkeydown="return field_validate(event.keyCode);"></td>'+
			'</tr>'+
			'</table>'+
			'</td>'+	
			'</tr>'+
			
			'<tr>'+
			'<td width="100%" >'+	
			'<table width=100% style="background-color:black;">'+
			'<tr style="height:10px">'+
            '<td width="10%">Stats</td>'+
            '<td width="1%">:</td>'+
            '<td width="5%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/bangkok_yakuza_small.gif" 

alt="Yakuza"></img></td>'+
            '<td width="5%" id="Yakuza_points">0</td>'+
            '<td width="1%">&nbsp;</td>'+
            '<td width="5%"><img src="http://mwfb.static.zynga.com/mwfb/graphics/bangkok_triads_small.gif" 

alt="Triad"></img></td>'+
            '<td width="5%" id="Triad_points">0</td>'+
            
            '<td width="3%">&nbsp;</td>'+
            
            '<td width="3%"><img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_mafia_attack_22x16_01.gif"></img></td>'+
            '<td width="17%"> <span id="mafia_attack">0</span> [<span id="attack_diff"><span class="good">

+0</span></span>]</td>'+
            '<td width="3%"><img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_mafia_defense_22x16_01.gif"></img></td>'+
            '<td width="17%"> <span id="mafia_defense">0</span> [<span id="defense_diff"><span class="good">

+0</span></span>]</td>'+
            
            '<td width="3%"><img src="http://arun.keen-computing.co.uk/kill.png" alt="Kills"></img></td>'+
            '<td width="1%">:</td>'+
            '<td width="7%"><span id="kills_log">0</span></td>'+
            '<td width="2%">&nbsp;</td>'+
            '<td width="3%"><img src="http://arun.keen-computing.co.uk/Ice.png" alt="Iced"></img></td>'+
            '<td width="1%">:</td>'+
            '<td width="7%"><span id="iced_log">0</span></td>'+
			'</tr>'+
			'</table>'+
			'</td>'+	
			'</tr>'+
			
			
			'<tr>'+
			'<td width="100%">'+	
			'<table width=100% style="background-color:black;">'+
            '<td width="10%">Fight</td>'+
            '<td width="1%">:</td>'+
            '<td width="25%"><input type="radio" id="Fightlist" name="fight_choice" checked>Fightlist</input></td>'+
            '<td width="25%"><input type="radio" id="Users" name="fight_choice">Specific Users</input></td>'+
//            '<td width="25%"><input type="radio" id="Spammers" name="fight_choice">Add Me Spammers</input></td>'+
            '<td width="10%" style="text-align:right">&nbsp;</td>'+
            '<td width="15%">Before level up</td>'+
            '<td width="1%">:</td>'+
            '<td width="13%"><a id="levelup" href="#">'+levelup_text+'</a></td>'+
			'</table>'+
			'</td>'+
			'</tr>'+
			
			'<tr id="UserChoice" style="display:none">'+
			'<td width="100%">'+
			'<table width=100% id="useroption" style="background-color:black;border:1px solid #666666;">'+
            
			'<tr>'+
            '<td colspan="13"><input type="checkbox" id="user_bank_enable" '+bank_enable+'> Enable bank if cash in 

hand is greater than : <input type="text" id="user_bank_limit" value="'+bank_limit+'" class="sexy_input" 

onkeydown="return field_validate(event.keyCode);">&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" 

id="user_power_attack" '+power_attack_enable+'> Enable Power Attack</td>'+
            '</tr>'+
            
			'<tr style="height:10px">'+
            '<td width="20%">Enter User Id\'s here (one id per line)</td>'+
            '<td width="1%">:</td>'+
            '<td width="30%" colspan=4><textarea id="UserIds" class="sexy_input"></textarea></td>'+
            '<td width="49%" colspan=4><input type="checkbox" id="UserSkip">Stop if all users are 

Iced/Killed</input>'+
            '<br><br><a id="AddSpammers" class="sexy_button_new"><span><span>Load Spammer 

List</span></span></a></td>'+
			'</tr>'+
			
			'</table>'+
			'</td>'+
			'</tr>'+
			
			'<tr id="FightChoice">'+
			'<td width="100%">'+
			'<table width=100% id="fightlistoption" style="background-color:black;border:1px solid 

#666666;">'+
            
			'<tr>'+
            '<td colspan="13"><input type="checkbox" id="cash_city" '+same_city_cash+'>Attack only if Cash from same 

city &nbsp;&nbsp;<input type="checkbox" id="attack_limit_check" '+attack_limit_enable+'>Limit number of attacks per 

person <input type="text" id="attack_limit" value="'+attack_limit_count+'" class="sexy_input" onkeydown="return 

field_validate(event.keyCode);"></td>'+
            '</tr>'+

			'<tr>'+
            '<td colspan="13"><input type="checkbox" id="faction_enable" '+faction_attack+'> Enable Specific Faction 

Attack : '+
            '<input type="radio" id="Triad" name="faction" '+triad_fac+'> Attack Triad Only '+
            '<input type="radio" id="Yakuza" name="faction" '+yakuza_fac+'> Attack Yakuza Only '+
            '<input type="radio" id="Balance_Faction" name="faction" '+faction_bal+'> Balance Factions by <input 

type="text" id="balanceamt" value="'+faction_bal_points+'" class="sexy_input" style="width:25px" onkeydown="return 

field_validate(event.keyCode);"> points</td>'+
            '</tr>'+
			
			'<tr>'+
            '<td colspan="13"><input type="checkbox" id="bank_enable" '+bank_enable+'> Enable bank if cash in hand is 

greater than : <input type="text" id="bank_limit" value="'+bank_limit+'" class="sexy_input" onkeydown="return 

field_validate(event.keyCode);"></td>'+
            '</tr>'+
            
			'<tr>'+
            '<td colspan="13"><input type="checkbox" id="ice_check" '+ice_check_enable+'> Only Attack live 

targets</input> &nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="power_attack" '+power_attack_enable+'> Enable Power 

Attack</input></td>'+
            '</tr>'+
            
			'<tr>'+
            '<td colspan="13">&nbsp;Minimum cash limit per attack : <input type="text" id="cashlimit" 

value="'+min_cash+'" class="sexy_input" onkeydown="return field_validate(event.keyCode);"></td>'+
            '</tr>'+
            
			'<tr style="height:10px">'+
            '<td width="10%">Levels</td>'+
            '<td width="1%">:</td>'+
            '<td width="5%"><input type="text" id="LowerLevel" class="sexy_input" style="width:30px" 

value="'+lower_level+'"></input></td>'+
            '<td width="3%">to</td>'+
            '<td width="5%"><input type="text" id="UpperLevel" class="sexy_input" style="width:30px" 

value="'+upper_level+'"></input></td>'+
            '<td rowspan=2 width="5%">&nbsp;</td>'+
            '<td rowspan=2 width="30%">Ignore Names with Characters</td>'+
            '<td rowspan=2 width="1%">:</td>'+
            '<td rowspan=2 width="35%" colspan=4><textarea id="SpecialChars" class="sexy_input">'+ignore_chars

+'</textarea></td>'+
			'</tr>'+
			
			'<tr style="height:10px">'+
            '<td width="10%">Mafia </td>'+
            '<td width="1%">:</td>'+
            '<td width="5%"><input type="text" id="LowerMafia" style="width:30px" class="sexy_input" 

value="'+lower_mafia+'"></input></td>'+
            '<td width="3%">to</td>'+
            '<td width="5%"><input type="text" id="UpperMafia" style="width:30px" class="sexy_input" 

value="'+upper_mafia+'"></input></td>'+
            '<td width="76%" colspan=4>&nbsp;</td>'+
			'</tr>'+
			
            
			'</table>'+
			'</td>'+
			'</tr>'+
			
			'<tr>'+
			'<td width="100%">'+
			'<table width="100%" style="background-color:black; height:40px">'+
            
            '<tr><td width="10%" valign="top"><a href="#" id="posts_show">Ices/Stashes</a></td>'+
            '<td width="1%" valign="top">:</td>'+
            '<td width="20%" id="ice_posts_log" valign="top" style="display:none">Ice Count - Posts<br></td>'+
            '<td width="69%" id="stash_posts_log" valign="top" style="display:none">Finder - Stash Post<br></td>'+
            '</tr>'+
			
			'<tr><td width="10%" valign="top"><a href="#" id="loot_show">Loot (<span 

id="loot_percent"></span>%)</a></td>'+
            '<td width="1%" valign="top">:</td>'+
            '<td id="loot_log" valign="top" colspan="2"></td>'+
            '</tr>'+
            			
            '<tr><td width="10%" valign="top"><a href="#" id="log_show">Log</a> &nbsp;&nbsp;<input type="text" 

id="log_size" value="10" class="sexy_input" style="width:20px"></input></td>'+
            '<td width="1%" valign="top">:</td>'+
            '<td id="attack_log" colspan="2"></td>'+
            '</tr>'+
			'</table>'+
			'</td>'+
			'</tr>'+
			
			'</table>'+
			'</form>';



    var error_window='<table class="sexy_error_table" width=100% border=2 rules=none bgcolor="black" 

id="errormsg"></table><br>';


    try{
	   document.getElementById('popup_permanence').removeChild(document.getElementById('fight_attack_div'));
    }
    catch(err){}

    var content=document.getElementById('popup_permanence');
    var fight_attack_div=document.createElement("div");
    fight_attack_div.id='fight_attack_div';

    fight_attack_div.innerHTML = styles+error_window+table_html;

    content.insertBefore(fight_attack_div,content.firstChild);

    document.getElementById("AddSpammers").onclick = loadSpammers;
    
    document.getElementById("close").onclick=function(){
        writeCookieStuff();
        run=false;
        try{
            document.getElementById('popup_permanence').removeChild(document.getElementById('fight_attack_div'));
        }
        catch(err){}
    }
    
    document.getElementById("begin").onclick=function(){
        if(fightlist_loaded){
            document.getElementById("begin").style.display = 'none';
            document.getElementById("pause").style.display = 'inline';
            run=true;
            attack_or_not = true;
            user_count = parseInt(document.forms.something.attackcount.value);
            writeCookieStuff();
            start_attack();
        }
        return false;
    }
    
    document.getElementById("pause").onclick=function(){
        run=false;
        document.getElementById("pause").style.display = 'none';
        document.getElementById("begin").style.display = 'inline';
//        user_count = parseInt(document.forms.something.attackcount.value);
//        attack();
        writeCookieStuff();
        return false;
    }
    
    document.getElementById("loot_show").onclick=function(){
        switch(document.getElementById('loot_log').style.display){
            case '':
                document.getElementById('loot_log').style.display = 'none';
            break;
            case 'none':
                document.getElementById('loot_log').style.display = '';
            break;
        }
        return false;
    }
    
    document.getElementById("posts_show").onclick=function(){
        switch(document.getElementById('ice_posts_log').style.display){
            case '':
                document.getElementById('ice_posts_log').style.display = 'none';
                document.getElementById('stash_posts_log').style.display = 'none';
            break;
            case 'none':
                document.getElementById('ice_posts_log').style.display = '';
                document.getElementById('stash_posts_log').style.display = '';
            break;
        }
        return false;
    }
    
    document.getElementById("log_show").onclick=function(){
        switch(document.getElementById('attack_log').style.display){
            case '':
                document.getElementById('attack_log').style.display = 'none';
            break;
            case 'none':
                document.getElementById('attack_log').style.display = '';
            break;
        }
        return false;
    }
    
    document.getElementById("Fightlist").onclick=function(){
        Fightsource = "Fightlist";
        document.getElementById("FightChoice").style.display='';
        document.getElementById("UserChoice").style.display='none';
    }
    
    document.getElementById("Users").onclick=function(){
        Fightsource = "Users";
        document.getElementById("FightChoice").style.display='none';
        document.getElementById("UserChoice").style.display='';
    }
    
    document.getElementById("levelup").onclick=function(){
        if(levelup_halt){
            levelup_halt=false;
            levelup_text = document.getElementById("levelup").innerHTML = "Continue";
        }
        else{
            levelup_halt=true;
            levelup_text = document.getElementById("levelup").innerHTML = "Stop";
        }
        writeCookieStuff();
        return false;
    }

    document.getElementById("bank_enable").onclick=function(){
        writeCookieStuff();
    }
    document.getElementById("user_bank_enable").onclick=function(){
        writeCookieStuff();
    }
    document.getElementById("cash_city").onclick=function(){
        writeCookieStuff();
    }
    document.getElementById("faction_enable").onclick=function(){
        writeCookieStuff();
    }
    document.getElementById("Triad").onclick=function(){
        writeCookieStuff();
    }
    document.getElementById("Yakuza").onclick=function(){
        writeCookieStuff();
    }
    document.getElementById("Balance_Faction").onclick=function(){
        writeCookieStuff();
    }
    
    
    
//    document.getElementById("Spammers").onclick=function(){
//        Fightsource = "Spammers";
//        document.getElementById("FightChoice").style.display='none';
//        document.getElementById("UserChoice").style.display='none';
//    }
    
    document.getElementById("heal_city_change").onclick=function(){
        heal_city++;
        heal_city=(heal_city>5)?0:heal_city;
        
        switch(heal_city){
            case 0:
                heal_city_text = document.getElementById("heal_city").innerHTML="Disabled";
                break;
            case 1:
                heal_city_text = document.getElementById("heal_city").innerHTML="New York";
                break;
            case 2:
                heal_city_text = document.getElementById("heal_city").innerHTML="Cuba";
                break;
            case 3:
                heal_city_text = document.getElementById("heal_city").innerHTML="Moscow";
                break;
            case 4:
                heal_city_text = document.getElementById("heal_city").innerHTML="Bangkok";
                break;
            case 5:
                heal_city_text = document.getElementById("heal_city").innerHTML="Las Vegas";
                break;
        }
        writeCookieStuff();
        return false;
    }
    
    function UnixTS(){
        return (Math.round(new Date().getTime() / 1000));
    }
    
    function loadfightpage(){
        logmsg('Loading fight page...','status');
        cb = userid+UnixTS();
        fightlist_loaded = false;
        
		document.getElementById('inner_page').addEventListener('DOMSubtreeModified', function(){
    		if(pageLoading==0){
                switch(true){
                    case document.forms.something.Fightlist.checked:
                        setTimeout(loadfightlist,1000);
                    break;
                    case document.forms.something.Users.checked:
                        if(attack_or_not){
                            setTimeout(loaduserlist,1000)
                        }
                    break;
                }
                this.removeEventListener('DOMSubtreeModified',arguments.callee,false);
            }
        },false);
            
		do_ajax('inner_page','remote/html_server.php?xw_controller=fight&xw_action=view&cb='+cb,1,1,0);

    }
    
    function loadfightlist(){
        if(fight_city == 5){
            var deposit=document.evaluate( "//span[@class='bank_deposit']//a[@class='bank_deposit']", document, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
            var vault_url = deposit.snapshotItem(0).href;
            vault_url += '&xw_client_id=8';
            var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                        };
            $.ajax({type: "POST",url: vault_url, data: params,
                success: function (msg){
                    msg = unescape(/deposit_url:".+?"/.exec(msg));
                    vault_tmp_variable = /&tmp=(.+?)&/.exec(msg)[1];
                    vault_cb_variable = /&cb=(.+?)&/.exec(msg)[1];
            }});
        }
        
        fightlist_names=[];
        fightlist_char_names=[];
        fightlist_levels=[];
        fightlist_mafia=[];
        fightlist_attack=[];
        fightlist_faction=[];
        
        fighttable = document.evaluate("//table[@class=\"main_table fight_table\"]//tbody//tr", document, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        for(i=1; i<fighttable.snapshotLength; i+=2){
            fightlist_names[fightlist_names.length] = /<a.+\/a>/.exec(fighttable.snapshotItem(i).getElementsByTagName

('td')[0].innerHTML);
            fightlist_char_names[fightlist_char_names.length] = fighttable.snapshotItem(i).getElementsByTagName('td')

[0].getElementsByTagName('a')[0].innerHTML;
            fightlist_levels[fightlist_levels.length] = parseInt(/Level ([0-9]+)/.exec(fighttable.snapshotItem

(i).getElementsByTagName('td')[0].innerHTML)[1]);
            if(fight_city==4){
                fightlist_faction[fightlist_faction.length] = fighttable.snapshotItem(i).getElementsByTagName('td')

[2].getElementsByTagName('img')[0].alt;
//                alert(fightlist_faction[fightlist_faction.length - 1]);
            }
        }
        fighttable = document.evaluate( "//table[@class=\"main_table fight_table\"]//tbody//tr//td", document, null, 

XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        if(fight_city==4){
            for(i=1; i<fighttable.snapshotLength; i+=6){
                fightlist_mafia[fightlist_mafia.length] = parseInt(fighttable.snapshotItem(i).innerHTML.replace(/

\s/g,""));
            }
        }
        else{
            for(i=1; i<fighttable.snapshotLength; i+=5){
                fightlist_mafia[fightlist_mafia.length] = parseInt(fighttable.snapshotItem(i).innerHTML.replace(/

\s/g,""));
            }        
        }
        fighttable = document.evaluate( "//table[@class=\"main_table fight_table\"]//td[@class=\"action\"]", document, 

null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        try{
            for(i=0; i<fighttable.snapshotLength; i++){
                fightlist_attack[fightlist_attack.length] = /'([^']+)/.exec(/reg_fight_view_attack\(([^\)]+)\);/.exec

(fighttable.snapshotItem(i).innerHTML)[0].replace(/&amp;/g,'&'))[1];
            }
        }        
        catch(err){alert(fighttable.snapshotItem(i).innerHTML);}
        i=0;
        
        fightlist_match++;
        fightlist_loaded=true;
        logmsg('Fightlist loaded..','status');

        if(fightlist_match >= 3){
            logmsg('No matches on the fightlist with set criteria, trying again in 5 seconds','status');
            fightlist_match=0;
            setTimeout(function(){attack_or_not=true;loadfightpage();},5000);
            return;
        }
        
        if(fighttable.snapshotLength <= 0){
            logmsg('Blank Fightlist, reloading.','status');
            loadfightpage();
            return;
        }
//        document.getElementById('popup_fodder').innerHTML = fightlist_attack;
//        document.getElementById('popup_fodder').innerHTML = document.getElementById

('popup_fodder').innerHTML.replace(/,/g,'<br>');
        
        if(attack_or_not == true){
            start_attack();
        }
    }
    
    function loaduserlist(){
        user_list = [];
        user_names = [];
        user_urls = [];
        try{
            if(document.getElementById('UserIds').value.length > 0){
                user_list = document.getElementById('UserIds').value.split('\n');
                user_names = document.getElementById('UserIds').value.split('\n');
            }
            else if(document.getElementById('UserIds').value.length == 0){
                logmsg('Userlist is empty, Stopping..','status');
                logmsg('Userlist is empty, Stopping..','attack_log');
                firsttime=true;
                return;
            }
                
        }
        catch(err){alert('Error ! Check entered Ids');}
//        alert(user_list);
//        alert(document.getElementById('UserIds').value.split('\n'));
//        tmp_key = '';
//        tmp_key = /reg_fight_view_attack.*tmp=([^&]+)/.exec(document.body.innerHTML)[1];
//        alert(/reg_fight_view_attack.*tmp=([^&]+)/.exec(document.body.innerHTML));
//        return;
        cb = userid + UnixTS();
        for(m=0; m < user_list.length; m++){
//            user_urls[user_urls.length]= 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=fight&xw_action=attack&xw_city=1&tmp='+tmp_key+'&cb='+cb+'&opponent_id='+user_list

[m]+'&xw_client_id=8&ajax=1&liteload=1&sf_xw_user_id='+userid+'&sf_xw_sig='+local_xw_sig;
            tmp_key[tmp_key.length] = '';
            user_urls[user_urls.length]= 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=fight&xw_action=power_attack&xw_city=1&cb='+cb+'&opponent_id='+user_list

[m]+'&origin=profile&xw_client_id=8';
//            http://facebook.mafiawars.com/mwfb/remote/html_server.php?

sf_xw_user_id=100000540938995&sf_xw_sig=2d32d688c9fe2a40895d5b36068b23d7&xw_controller=fight&xw_action=attack&xw_city=

1&tmp=6b686168b37c1472ce5aad8e4e58d643&opponent_id=73904206&ajax=1&skip_req_frame=1
        }
//        alert(user_urls);
        j=0;
        attack_user();
    }
    
    function publish_ice(){
        var num = this.id;
        num = parseInt(/ice_post([0-9]+)/.exec(num)[1]);
        eval(iced_posts[num][1]);
        postFeedAndSendFightBrag();
        return false;
    }
    
    function publish_stash(){
        var num = this.id;
        num = parseInt(/stash_post([0-9]+)/.exec(num)[1]);
        eval(stash_posts[num]);
        popFightLootFeed_0();
        return false;
    }
    
    function start_attack(){
    
        if(run == false){
            logmsg('Paused...','status');
            return;
        }
        
        user_count = parseInt(document.forms.something.attackcount.value);
        if(actual_count >= user_count && user_count!=0){
            logmsg('Finished Attack run, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if(document.getElementById('user_stamina').innerHTML <= 0){
            logmsg('Ran out of stamina, stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }        
        
        if(power_attack && (parseInt(exp_to_levelup) <= 30) && levelup_halt){
            logmsg('Could level up on next Attack, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if((!power_attack) && (parseInt(exp_to_levelup) <= 6) && levelup_halt){
            logmsg('Could level up on next Attack, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if(parseInt(document.getElementById('exp_to_level').value) != 0){
            if(power_attack){
                var user_exp_level = parseInt(document.getElementById('exp_to_level').value) + 30;
            }
            else{
                var user_exp_level = parseInt(document.getElementById('exp_to_level').value) + 6;
            }
            if(parseInt(exp_to_levelup) < user_exp_level){
                logmsg('Could cross user set level up exp on next attack, Stopping..','status');
                document.getElementById('pause').style.display = 'none';
                document.getElementById('begin').style.display = 'inline';
                return;
            }
        }
        
        Trace('In Start attack function');
        switch(true){
            case document.forms.something.Fightlist.checked:
                pre_check();
            break;
            case document.forms.something.Users.checked:
                if(firsttime){
                    loaduserlist();
                }
                else{
                    attack_user();
                }
            break;
        }
    }
    
    function attack_user(){
        Trace('In attack user function');
        if(run == false){
            logmsg('Paused...','status');
            return;
        }
        
        user_count = parseInt(document.forms.something.attackcount.value);
        
        heal_thres = parseInt(document.getElementById('heal_thres').value);
        if(document.getElementById('user_health').innerHTML < heal_thres){
            heal();
            return;
        }
        
        if(actual_count >= user_count && user_count != 0){
            logmsg('Finished Attack run, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if(document.getElementById('user_stamina').innerHTML <= 0){
            logmsg('Ran out of stamina, stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }        
        
        if(power_attack && (parseInt(exp_to_levelup) <= 30) && levelup_halt){
            logmsg('Could level up on next Attack, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if((!power_attack) && (parseInt(exp_to_levelup) <= 6) && levelup_halt){
            logmsg('Could level up on next Attack, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if(parseInt(document.getElementById('exp_to_level').value) != 0){
            if(power_attack){
                var user_exp_level = parseInt(document.getElementById('exp_to_level').value) + 30;
            }
            else{
                var user_exp_level = parseInt(document.getElementById('exp_to_level').value) + 6;
            }
            if(parseInt(exp_to_levelup) < user_exp_level){
                logmsg('Could cross user set level up exp on next attack, Stopping..','status');
                document.getElementById('pause').style.display = 'none';
                document.getElementById('begin').style.display = 'inline';
                return;
            }
        }
        
        logmsg('Attacking '+user_names[j],'status');
        user_power_attack_enable = document.getElementById('user_power_attack').checked;
        if(user_power_attack){
            user_urls[j] = user_urls[j].replace(/xw_action=attack&/,'xw_action=power_attack&');
            user_urls[j] = user_urls[j].replace(/&origin=fight_page&tab=0/,'');
            var temp_var = /&tmp=(.+?)&/.exec(user_urls[j])[1];
            user_urls[j] = user_urls[j].replace(temp_var,temp_variable);
        }
//        alert(fightlist_attack[i].replace(/&tmp=([^&]+)/.exec(fightlist_attack[i])[0],''));
        var link=user_urls[j];
        var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                    };
        req = $.ajax({type: "POST", url: link, data: params,
            success: function (msg){
                document.getElementById('fights').innerHTML = actual_count;
                process_user_attack(msg);
            }
        });
        
    }
    
    function attack(){
        Trace('In attack function');
//        alert(fightlist_names.length);

        if(run == false){
            logmsg('Paused...','status');
            return;
        }
        
        user_count = parseInt(document.forms.something.attackcount.value);
        
        heal_thres = parseInt(document.getElementById('heal_thres').value);
        if(document.getElementById('user_health').innerHTML < heal_thres){
            heal();
            return;
        }
        
        if(actual_count >= user_count && user_count!=0){
            logmsg('Finished Attack run, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if(document.getElementById('user_stamina').innerHTML <= 0){
            logmsg('Ran out of stamina, stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }        
        
        if(parseInt(document.getElementById('exp_to_level').value) != 0){
            if(power_attack){
                var user_exp_level = parseInt(document.getElementById('exp_to_level').value) + 30;
            }
            else{
                var user_exp_level = parseInt(document.getElementById('exp_to_level').value) + 6;
            }
            if(parseInt(exp_to_levelup) < user_exp_level){
                logmsg('Could cross user set level up exp on next attack, Stopping..','status');
                document.getElementById('pause').style.display = 'none';
                document.getElementById('begin').style.display = 'inline';
                return;
            }
        }
        
        if(power_attack && (parseInt(exp_to_levelup) <= 30) && levelup_halt){
            logmsg('Could level up on next Attack, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if((!power_attack) && (parseInt(exp_to_levelup) <= 6) && levelup_halt){
            logmsg('Could level up on next Attack, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        try{
            logmsg('Attacking '+fightlist_names[i]+' Level - '+fightlist_levels[i],'status');
//        alert(fightlist_attack[i].replace(/&tmp=([^&]+)/.exec(fightlist_attack[i])[0],''));
//            timeout_timer = setTimeout(function(){
//                if(req){
//                    req.abort();
//                }
//                attack();
//            },30000);
            power_attack_enable = document.getElementById('power_attack').checked;
            if(power_attack){
                fightlist_attack[i] = fightlist_attack[i].replace(/xw_action=attack&/,'xw_action=power_attack&');
                fightlist_attack[i] = fightlist_attack[i].replace(/&origin=fight_page&tab=0/,'');
                var temp_var = /&tmp=(.+?)&/.exec(fightlist_attack[i])[1];
                fightlist_attack[i] = fightlist_attack[i].replace(temp_var,temp_variable);
            }

            var link="http://facebook.mafiawars.com/mwfb/"+fightlist_attack[i]+"&xw_client_id=8";
        }
        catch(err){alert(err);}
  
        var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                    };
        req = $.ajax({type: "POST",url: link, timeout: 30000, data: params,
            success: function (msg){
                //clearTimeout(timeout_timer);
                fightlist_match=0;
                process_attack(msg);
            },
            error: function(req,status,err){
                logmsg('Request timed out, Retrying attack..','status');
                setTimeout(attack,2000);
            }
        });
//    }
    
//    catch(err){alert(err);}
    }
    
    function process_attack(attack_results){
        var temp;
        var logtext;
        logtext = '';
        wait1 = parseInt(document.getElementById('delay1').value);
        wait2 = parseInt(document.getElementById('delay2').value);
        var higher = (wait2 > wait1 ? wait2 : wait1);
        var lower = (wait2 > wait1 ? wait1 : wait2);
        var random_delay = Math.floor((higher-(lower-1))*Math.random()) + lower;
        
        random_delay = (random_delay < 0)? 0 : random_delay;
        
        Trace('In process attack function');
        if(!((/You win/.test(attack_results)) || (/You lose/.test(attack_results)))){
            logmsg('Possible session timeout, Reloading..','status');
            attack_or_not = true;
            loadfightpage();
            return;
        }
        
        actual_count++;
        document.getElementById('fights').innerHTML = actual_count;
//        document.getElementById('inner_page').innerHTML = attack_results;

        killed = false;
        iced = false;
//        health_lost = /fightres_health">took ([0-9]+)/.exec(attack_results)[1];
        document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec

(attack_results)[1];
        document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-

9]+)/.exec(attack_results)[1];
        document.getElementById('user_experience').innerHTML = /user_fields\['user_experience'\] = parseInt\("([0-

9]+)/.exec(attack_results)[1];

        exp_to_levelup = parseInt(/user_fields\['exp_for_next_level'\] = parseInt\("([0-9]+)/.exec(attack_results)[1]) 

- parseInt(document.getElementById('user_experience').innerHTML);
        
        exp_ratio_reqd = exp_to_levelup/parseInt(document.getElementById('user_stamina').innerHTML);
        
        document.getElementById('exp_reqd').innerHTML = exp_to_levelup;
        document.getElementById('exp_ratio_reqd').innerHTML = exp_ratio_reqd.toFixed(2);
        
        mafia_attack = parseInt((/title="Mafia Attack Strength".+?> (.+?)<\/div>/.exec(attack_results)[1]).replace

(/,/g,''));
        if(initial_mafia_attack == 0){
            initial_mafia_attack = mafia_attack;
        }
        mafia_defense = parseInt((/title="Mafia Defense Strength".+?> (.+?)<\/div>/.exec(attack_results)[1]).replace

(/,/g,''));
        if(initial_mafia_defense == 0){
            initial_mafia_defense = mafia_defense;
        }
        document.getElementById('mafia_attack').innerHTML = format_cash(mafia_attack);
        document.getElementById('mafia_defense').innerHTML = format_cash(mafia_defense);
        
        document.getElementById('attack_diff').innerHTML = (mafia_attack >= initial_mafia_attack)?'<span 

class="good">+'+(mafia_attack - initial_mafia_attack)+'</span>':'<span class="bad">-'+(initial_mafia_attack - 

mafia_attack)+'</span>';
        document.getElementById('defense_diff').innerHTML = (mafia_defense >= initial_mafia_defense)?'<span 

class="good">+'+(mafia_defense - initial_mafia_defense)+'</span>':'<span class="bad">-'+(initial_mafia_defense - 

mafia_defense)+'</span>';
        
        var vic_pts = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(attack_results)[1];
        document.getElementById('Victorycoins').innerHTML = vic_pts;
        
        try{
            temp='';
            loot_log = [];
            if(/(found|gained|earned) (some|an|a|A) (.+?)(See|while|\.)/.test(attack_results)){
                temp_loot = attack_results.match(/<div class="fightres_bonus_message".+?<img src="(.+?)".+?(found|

gained|earned) (some|an|a|A) (.+?)(See|while|\.)/g);
                for(z=0;z<temp_loot.length;z++){
                    temp = /<div class="fightres_bonus_message".+?<img src="(.+?)".+?(found|gained|earned) (some|an|

a|A) (.+?)(See|while|\.)/.exec(temp_loot[z]);
                    loot_img = temp[1];
                    temp = temp[4].replace(/!/g,'');
                    temp = temp.replace(/<br\/>/g,'');
                    Add_to_loot(temp,1,loot_img);
                    temp = temp.replace(/\(.+?\)/g,'');
                    loot_log[loot_log.length] =  '<img src="'+loot_img+'" style="width: 20px; height: 20px;"></img> 

'+temp;
                }
            }
        }        
        catch(err){alert('Error ! '+err);alert('temp_loot length = '+temp_loot.length);alert('Error occured, temp_loot 

= '+temp_loot);return;}
        
        try{
            if(/secret stash/.test(attack_results)){
                var stash_script = /function continuation_popFightLootFeed(.+?)<\/script>/.exec(attack_results)

[0].replace(/<\/script>/,'');
                stash_script = stash_script.replace(/"/g,'\"');
                stash_posts[stash_posts.length] = stash_script;
                var stash_owner = /<a(.+?)<\/a> found the location of the secret stash/.exec(attack_results)[1];
                document.getElementById('stash_posts_log').innerHTML += '<a'+stash_owner+'<\/a> - <a href="#" 

id="stash_post'+(stash_posts.length-1)+'" onclick="return false;">Stash #'+stash_posts.length+'</a><br>';
//                document.getElementById('stash_post'+(stash_posts.length-1)).onclick = new Function

(this.id,publish_stash);
                for(l=0;l<stash_posts.length;l++){
                    document.getElementById('stash_post'+l).onclick = publish_stash;
                }
            }
        }
        catch(err){alert(err);}
        
        try{
            if(/found (\d) (.+?)See them/.test(attack_results)){
                temp='';
                temp = /found (\d) (.+?)See them/.exec(attack_results);
                temp[2] = temp[2].replace(/!/,'');
                temp[2] = temp[2].replace(/<br\/>/g,'');
                Add_to_loot(temp[2],parseInt(temp[1]),'');
                loot_log[loot_log.length] = temp[1] + ' ' + temp[2];
            }
        }
        catch(err){alert('Error ! '+err);return;}

        try{
            document.getElementById('loot_percent').innerHTML = ((total_loot/(win+loss)) * 100).toFixed(1);
        }
        catch(err){}
        
        if(/killed your opponent/.test(attack_results)){
            killed=true;
            kills++;
            killed_count = /You killed your opponent, bringing your total body count to (\d+?)!/.exec(attack_results)

[1];
            document.getElementById('kills_log').innerHTML = killed_count +'[<span class="good">'+kills+'</span>]';
        }
        

        if(/iced_pop_text/.test(attack_results)){
            iced=true;
            ices++;
            iced_count = /<div class=\\"iced_pop_body_count_number\\">(.+?)<\/div>/.exec(attack_results)[1].replace

(/,/g,'');
            document.getElementById('iced_log').innerHTML = iced_count +'[<span class="good">'+ices+'</span>]';
            var script = /function continuation_postFeedAndSendFightBrag(.+?)<\/script>/.exec(attack_results)

[0].replace(/<\/script>/,'');
            script = script.replace(/"/g,'\"');
            if(iced_posts.length <= 0){
                iced_posts[iced_posts.length] = new Array(iced_count,script);
            }
            else{
                iced_posts[iced_posts.length] = [];
                iced_posts[iced_posts.length-1][1] = script;
                iced_posts[iced_posts.length-1][0] = iced_count;
            }
            document.getElementById('ice_posts_log').innerHTML += iced_posts[iced_posts.length-1][0]+' - <a href="#" 

id="ice_post'+(iced_posts.length-1)+'" onclick="return false;">Post</a><br>';
//            document.getElementById('ice_post'+(iced_posts.length-1)).onclick = new Function(this.id,publish_ice);
            for(l=0;l<iced_posts.length;l++){
                document.getElementById('ice_post'+l).onclick = publish_ice;
            }
        }
            
        var check_city = parseInt(/&xw_city=(\d+)&tmp/.exec(attack_results)[1]);
        
        if(check_city != fight_city){
            logmsg('Invalid city change detected, Travelling to fight city...','status');
            logmsg('Invalid city change detected, Travelling to fight city...','attack_log');
            var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                    };
            $.ajax({type: "POST", data: params,
            url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=travel&xw_action=travel&xw_city="+check_city+"&cb="+cb+"&destination="+fight_city

+"&from=fight&nextParams=&xw_client_id=8",
                success: function (msg){
                    attack_or_not=true;
                    loadfightpage();
                    return;
                }
            });
            return;
        }
            
        try{
            if(fight_city == 4){
                var faction_level = attack_results.match(/zy_progress_bar_faction_text">(.+) \/ 1500/g);
                document.getElementById('Yakuza_points').innerHTML = Yakuza = parseInt

(/zy_progress_bar_faction_text">(.+) \/ 1500/.exec(faction_level[0])[1]);
                document.getElementById('Triad_points').innerHTML = Triad = parseInt(/zy_progress_bar_faction_text">

(.+) \/ 1500/.exec(faction_level[1])[1]);
            }
        }
        catch(err){}
        
        switch(parseInt(fight_city)){
            case 1:
                document.getElementById('user_cash_nyc').innerHTML = /user_fields\['user_cash_nyc'\] = "([^"]+)/.exec

(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_nyc').innerHTML.replace(/,/g,'').replace(/\$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && 

(document.forms.something.bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_nyc').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand,'nyc');
                }
            break;
            case 2:
                document.getElementById('user_cash_cuba').innerHTML = /user_fields\['user_cash_cuba'\] = 

"([^"]+)/.exec(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_cuba').innerHTML.replace(/,/g,'').replace(/C\

$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && 

(document.forms.something.bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_cuba').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand,'cuba');
                }
            break;
            case 3:
                document.getElementById('user_cash_moscow').innerHTML = /user_fields\['user_cash_moscow'\] = 

"([^"]+)/.exec(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_moscow').innerHTML.replace(/,/g,'').replace(/R\

$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && 

(document.forms.something.bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_moscow').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand,'moscow');
                }
            break;
            case 4:
                document.getElementById('user_cash_bangkok').innerHTML = /user_fields\['user_cash_bangkok'\] = 

"([^"]+)/.exec(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_bangkok').innerHTML.replace(/,/g,'').replace(/B\

$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && 

(document.forms.something.bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_bangkok').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand,'bangkok');
                }
            break;
            case 5:
                document.getElementById('user_cash_vegas').innerHTML = /user_fields\['user_cash_vegas'\] = 

"([^"]+)/.exec(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_vegas').innerHTML.replace(/,/g,'').replace(/V\

$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && 

(document.forms.something.bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_vegas').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand,'vegas');
                }
            break;
        }
        
        if(/You win!/.test(attack_results)){
            if(/<span class="good">Win: (\d)<\/span>/.test(attack_results)){
                win += parseInt(/<span class="good">Win: (\d)<\/span>/.exec(attack_results)[1]);
            }
            else{
                win++;
            }
            if(/<span class="bad">Loss: (\d)<\/span>/.test(attack_results)){
                loss += parseInt(/<span class="bad">Loss: (\d)<\/span>/.exec(attack_results)[1]);
            }
            
            exp_ratio = exp_gained/(win+loss);
            document.getElementById('exp_ratio').innerHTML = exp_ratio.toFixed(2);
            
            if(/Attack Again!/.test(attack_results)){
                if(/Attack again 5 times!/.test(attack_results)){
                    if(power_attack_enable){
                        power_attack = true;
                    }
                    else{
                        power_attack = false;
                    }
                    temp_variable = /&xw_action=power_attack&xw_city=.+?&tmp=(.+?)&/.exec(attack_results)[1];
                }
                logtext = '<img src="http://arun.keen-computing.co.uk/attack.png" alt="alive"></img> ';
            }
            document.getElementById('wins').innerHTML = win;
            logtext += '<span class="good">Attacked '+fightlist_names[i]+' and won !</span> ';
            
//            if(/rallied/.test(attack_results)){
//                exp_gained += 2 * parseInt(/fightres_experience good">\n(.*)\+(\d*) Experience/.exec

(attack_results)[2]);
//                logtext += 'Exp gained - <span class="good">' + (2 * parseInt(/fightres_experience good">\n(.*)\

+(\d*) Experience/.exec(attack_results)[2]))+'</span>';
//            }
//            else{
                exp_gained += parseInt(/\+(\d*) Experience/.exec(attack_results)[1]);
                logtext += '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif" 

alt="Exp"> <span class="good">' + parseInt(/\+(\d*) Experience/.exec(attack_results)[1])+'</span>';
//            }
            
            
            if(/Fan Bonus/.test(attack_results)){
                if(/rallied/.test(attack_results)){
                    exp_gained += 2 * parseInt(/(\d*) Fan Bonus/.exec(attack_results)[1]);
                    logtext += ' Fan Bonus - <span class="good">' + (2 * parseInt(/(\d*) Fan Bonus/.exec

(attack_results)[1]))+'</span>';
                }
                else{
                    exp_gained += parseInt(/(\d*) Fan Bonus/.exec(attack_results)[1]);
                    logtext += ' Fan Bonus - <span class="good">' + parseInt(/(\d*) Fan Bonus/.exec(attack_results)

[1])+'</span>';
                }
            }
//            alert(/(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_new_york_cash|sexy_vegas_cash) good"\>

(\n|\f|\r)([^<]+)/.exec(attack_results)[0]);
            
            cash = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_new_york_cash|sexy_vegas_cash) good"\>

(\n|\f|\r)([^<]+)/.exec(attack_results)[3];
//            cash = cash.replace(/\n/g,'');
            logtext += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" 

alt="cash"></img> <span class="good">'+cash+'</span>';            
            
            if(iced == true){
                logtext += ' <img src="http://arun.keen-computing.co.uk/Ice.png" alt="Iced"></img>';
            }
            
            if(killed == true){
                logtext += ' <img src="http://arun.keen-computing.co.uk/kill.png" alt="Kill"></img>';
            }
            
            if(loot_log.length >= 1){
                logtext += ' '+loot_log;
            }
            
            logmsg(logtext,'attack_log');

            document.getElementById('exp_gained').innerHTML = exp_gained;
            
            switch(true){
                case (/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(2,(/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,'')));
                    cash_city = 2;
                break;
                case (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(3,(/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,''))); 
                    cash_city = 3;
                break;
                case (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(4,(/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,'')));
                    cash_city = 4;
                break;
                case (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(5,(/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,'')));
                    cash_city = 5;
                break;
                case (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(1,(/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,'')));
                    cash_city = 1;
                break;
            }
     
            if(parseInt(/(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_new_york_cash) 

good"\>[^\$]+\$([^<]+)/.exec(attack_results)[2].replace(/,/g,'')) < parseInt(cash_limit)){
                logmsg('Below cash limit, Fetching next target in '+random_delay+' seconds..','attack_log');
                next();
                return;
            }
            
            if((cash_city != fight_city) && document.forms.something.cash_city.checked){
                logmsg('Cash not from same city as fight city. Fetching next target in '+random_delay+' 

seconds..','attack_log');
                next();
                return;
            }
            
            attack_count++;
            if((attack_count >= parseInt(document.forms.something.attack_limit.value)) && 

document.forms.something.attack_limit_check.checked){
                logmsg('Done with '+fightlist_names[i]+' Fetching next target in '+random_delay+' 

seconds..','attack_log');
                next();
                return;
            }
            
            if(/Attack Again!/.test(attack_results)){
                setTimeout(attack,random_delay*1000);
            }
            else{
                logmsg('Done with '+fightlist_names[i]+' Fetching next target in '+random_delay+' 

seconds..','attack_log');
                next();
            }
            return;
        }
        else{
            if(/You lose!/.test(attack_results)){
                logtext = '';
                loss++;
                document.getElementById('losses').innerHTML = loss;
                exp_ratio = exp_gained/(win+loss);
                document.getElementById('exp_ratio').innerHTML = exp_ratio.toFixed(2);
//                document.getElementById('logger').innerHTML = 'You Lost ! Cash Lost - '+cash; 
            cash = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_new_york_cash) (bad|

good)"\>(\n|\f|\r)([^<]+)/.exec(attack_results)[4];
//                document.getElementById('popup_fodder').innerHTML = attack_results;
//                return;
                try{
                    switch(true){
                        case (/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                            process_cash(2,-(/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));
                        break;
                        case (/sexy_moscow_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                            process_cash(3,-(/sexy_moscow_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));                
                        break;
                        case (/sexy_bangkok_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                            process_cash(4,-(/sexy_bangkok_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));
                        break;
                        case (/sexy_vegas_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                            process_cash(5,-(/sexy_vegas_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));
                        break;
                        case (/sexy_new_york_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                            process_cash(1,-(/sexy_new_york_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));
    //                        alert(-(/fightres_cash sexy_cash bad">\n(.*)-(.*)\$([^<]+)/.exec(attack_results)

[1].replace(/,/g,'')));
                        break;
                    }
                }
                catch(err){}
                if(/Attack Again!/.test(attack_results)){
                    logtext = '<img src="http://arun.keen-computing.co.uk/attack.png" alt="alive"></img> ';
                }
                
                logtext += '<span class="bad">You Lost !</span> Cash Lost <span class="bad">'+cash+'</span>';
                
                if(iced == true){
                    logtext += ' <img src="http://arun.keen-computing.co.uk/Ice.png" alt="Iced"></img>';
                }
                
                if(killed == true){
                    logtext += ' <img src="http://arun.keen-computing.co.uk/kill.png" alt="Kill"></img>';
                }
                
                logmsg(logtext,'attack_log');
                
            }
            strong_list[strong_list.length] = fightlist_char_names[i];
            logmsg(fightlist_names[i]+' too strong, Fetching next target in '+random_delay+' seconds..','attack_log');
            
            var check_city = parseInt(/&xw_city=(\d+)&tmp/.exec(attack_results)[1]);
            
            if(check_city != fight_city){
                logmsg('Invalid city change detected, Travelling to fight city...','status');
                logmsg('Invalid city change detected, Travelling to fight city...','attack_log');
                var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                    };
                $.ajax({type: "POST", data: params,
                url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=travel&xw_action=travel&xw_city="+check_city+"&cb="+cb+"&destination="+fight_city

+"&from=fight&nextParams=&xw_client_id=8",
                    success: function (msg){
                        attack_or_not=true;
                        loadfightpage();
                        return;
                    }
                });
                return;
            }

            next();
        }
    }
        
    function process_user_attack(attack_results){
    
        var temp;
        var logtext;
        logtext = '';
        
        wait1 = parseInt(document.getElementById('delay1').value);
        wait2 = parseInt(document.getElementById('delay2').value);
        var higher = (wait2 > wait1 ? wait2 : wait1);
        var lower = (wait2 > wait1 ? wait1 : wait2);
        var random_delay = Math.floor((higher-(lower-1))*Math.random()) + lower;
        
        random_delay = (random_delay < 0)? 0 : random_delay;
        
        Trace('In process user attack function');
        if(!((/You win/.test(attack_results)) || (/You lose/.test(attack_results)))){
            logmsg('Fetching Temp key..','status');
            var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                    };
            var profile_link = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=stats&xw_action=view&xw_city=1&cb='+userid+UnixTS()+'&user='+user_list[j]+'&xw_client_id=8';
            
            $.ajax({type: "POST",url: profile_link, data: params,
              success: function (msg){
                if(/was not found/.test(msg)){
                    logmsg(user_list[j] + ' is not a valid mafia member, skipping..','attack_log');
                    j++;
//                document.getElementById('logged').innerHTML = document.getElementById('logger').innerHTML +'<br>'+ 

document.getElementById('logged').innerHTML;
                    if(j >= user_list.length){
                        if(document.forms.something.UserSkip.checked){
                            logmsg('All users Iced/Killed. Stopping..','status');
                            document.getElementById('pause').style.display = 'none';
                            document.getElementById('begin').style.display = 'inline';
                            return;
                        }
//                        logmsg('Reached last member, reloading..','attack_log');
                        logmsg('Reached last member, reloading..','attack_log');
                        j=0;
                    }
                    setTimeout(attack_user,random_delay*1000);
                    return;
                }
                 tmp_key[j] = /tryBuy.*?tmp=([a-f0-9]+)/.exec(msg)[1];
                 user_names[j] = /levels">\((.*?)\)/.exec(msg)[1];
                 user_list[j] = 'p|'+(/user=p\|(\d+)'.+>Profile/.exec(msg)[1]);
//                 user_urls[j]= 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=fight&xw_action=attack&xw_city=1&tmp='+tmp_key+'&cb='+cb+'&opponent_id='+user_list

[j]+'&xw_client_id=8&ajax=1&liteload=1&sf_xw_user_id='+userid+'&sf_xw_sig='+local_xw_sig;
                 user_urls[j]= 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=fight&xw_action=attack&xw_city=1&tmp='+tmp_key[j]+'&cb='+cb+'&opponent_id='+user_list

[j]+'&origin=fight_page&xw_client_id=8&ajax=1&liteload=1&sf_xw_user_id='+userid+'&sf_xw_sig='+local_xw_sig;
                 attack_user();
              }
            });
            return;
        }
        
        actual_count++;
        
        killed = false;
        iced = false;
//        health_lost = /fightres_health">took ([0-9]+)/.exec(attack_results)[1];
        document.getElementById('user_health').innerHTML = /user_fields\['user_health'\] = parseInt\("([0-9]+)/.exec

(attack_results)[1];
        document.getElementById('user_stamina').innerHTML = /user_fields\['user_stamina'\] = parseInt\("([0-

9]+)/.exec(attack_results)[1];
        document.getElementById('user_experience').innerHTML = /user_fields\['user_experience'\] = parseInt\("([0-

9]+)/.exec(attack_results)[1];

        exp_to_levelup = parseInt(/user_fields\['exp_for_next_level'\] = parseInt\("([0-9]+)/.exec(attack_results)[1]) 

- parseInt(document.getElementById('user_experience').innerHTML);
        
        exp_ratio_reqd = exp_to_levelup/parseInt(document.getElementById('user_stamina').innerHTML);
        
        document.getElementById('exp_reqd').innerHTML = exp_to_levelup;
        document.getElementById('exp_ratio_reqd').innerHTML = exp_ratio_reqd.toFixed(2);
        
        mafia_attack = parseInt((/title="Mafia Attack Strength".+?> (.+?)<\/div>/.exec(attack_results)[1]).replace

(/,/g,''));
        if(initial_mafia_attack == 0){
            initial_mafia_attack = mafia_attack;
        }
        mafia_defense = parseInt((/title="Mafia Defense Strength".+?> (.+?)<\/div>/.exec(attack_results)[1]).replace

(/,/g,''));
        if(initial_mafia_defense == 0){
            initial_mafia_defense = mafia_defense;
        }
        document.getElementById('mafia_attack').innerHTML = format_cash(mafia_attack);
        document.getElementById('mafia_defense').innerHTML = format_cash(mafia_defense);
        
        document.getElementById('attack_diff').innerHTML = (mafia_attack >= initial_mafia_attack)?'<span 

class="good">+'+(mafia_attack - initial_mafia_attack)+'</span>':'<span class="bad">-'+(initial_mafia_attack - 

mafia_attack)+'</span>';
        document.getElementById('defense_diff').innerHTML = (mafia_defense >= initial_mafia_defense)?'<span 

class="good">+'+(mafia_defense - initial_mafia_defense)+'</span>':'<span class="bad">-'+(initial_mafia_defense - 

mafia_defense)+'</span>';
        
        var vic_pts = /<div class="fightmastery_tokens">[^\d]+(\d+)/.exec(attack_results)[1];
        document.getElementById('Victorycoins').innerHTML = vic_pts;
        
        try{
            temp='';
            if(/(found|gained|earned) (some|an|a|A) (.+?)(See|while|\.)/.test(attack_results)){
                temp_loot = attack_results.match(/<div class="fightres_bonus_message".+?<img src="(.+?)".+?(found|

gained|earned) (some|an|a|A) (.+?)(See|while|\.)/g);
                for(z=0;z<temp_loot.length;z++){
                    temp = /<div class="fightres_bonus_message".+?<img src="(.+?)".+?(found|gained|earned) (some|an|

a|A) (.+?)(See|while|\.)/.exec(temp_loot[z]);
                    loot_img = temp[1];
                    temp = temp[4].replace(/!/g,'');
                    temp = temp.replace(/<br\/>/g,'');
                    Add_to_loot(temp,1,loot_img);
                }
            }
        }        
        catch(err){alert('Error ! '+err);alert('temp_loot length = '+temp_loot.length);alert('Error occured, temp_loot 

= '+temp_loot);return;}
        
        try{
            if(/secret stash/.test(attack_results)){
                var stash_script = /function continuation_popFightLootFeed(.+?)<\/script>/.exec(attack_results)

[0].replace(/<\/script>/,'');
                var stash_owner = /<a(.+?)<\/a> found the location of the secret stash/.exec(attack_results)[1];
                stash_script = stash_script.replace(/"/g,'\"');
                stash_posts[stash_posts.length] = stash_script;
                document.getElementById('stash_posts_log').innerHTML += '<a'+stash_owner+'<\/a> - <a href="#" 

id="stash_post'+(stash_posts.length-1)+'" onclick="return false;">Stash #'+stash_posts.length+'</a><br>';
//                document.getElementById('stash_post'+(stash_posts.length-1)).onclick = new Function

(this.id,publish_stash);
                for(l=0;l<stash_posts.length;l++){
                    document.getElementById('stash_post'+l).onclick = publish_stash;
                }
            }
        }
        catch(err){}
        
        try{
            if(/found (\d) (.+?)See them/.test(attack_results)){
                temp='';
                temp = /found (\d) (.+?)See them/.exec(attack_results);
                temp[2] = temp[2].replace(/!/,'');
                temp[2] = temp[2].replace(/<br\/>/g,'');
                Add_to_loot(temp[2],parseInt(temp[1]),'');
                temp = temp[1] + ' ' + temp[2];
            }
        }
        catch(err){alert('Error ! '+err);return;}
        
        try{
            document.getElementById('loot_percent').innerHTML = ((total_loot/(win+loss)) * 100).toFixed(1);
        }
        catch(err){}
        
        if(/killed your opponent/.test(attack_results)){
            killed=true;
            kills++;
            killed_count = /You killed your opponent, bringing your total body count to (\d+?)!/.exec(attack_results)

[1];
            document.getElementById('kills_log').innerHTML = killed_count +'[<span class="good">'+kills+'</span>]';
        }
        
        if(/iced_pop_text/.test(attack_results)){
            iced=true;
            ices++;            
            iced_count = /<div class=\\"iced_pop_body_count_number\\">(.+?)<\/div>/.exec(attack_results)[1].replace

(/,/g,'');
            document.getElementById('iced_log').innerHTML = iced_count +'[<span class="good">'+ices+'</span>]';
            var script = /function continuation_postFeedAndSendFightBrag(.+?)<\/script>/.exec(attack_results)

[0].replace(/<\/script>/,'');
            script = script.replace(/"/g,'\"');
            if(iced_posts.length <= 0){
                iced_posts[iced_posts.length] = new Array(iced_count,script);
            }
            else{
                iced_posts[iced_posts.length] = [];
                iced_posts[iced_posts.length-1][1] = script;
                iced_posts[iced_posts.length-1][0] = iced_count;
            }
        }
        
        if(fight_city==4){
            var faction_level = attack_results.match(/zy_progress_bar_faction_text">(.+) \/ 1500/g);
            document.getElementById('Yakuza_points').innerHTML = /zy_progress_bar_faction_text">(.+) \/ 1500/.exec

(faction_level[0])[1];
            document.getElementById('Triad_points').innerHTML = /zy_progress_bar_faction_text">(.+) \/ 1500/.exec

(faction_level[1])[1];
        }
        
        switch(parseInt(fight_city)){
            case 1:
                document.getElementById('user_cash_nyc').innerHTML = /user_fields\['user_cash_nyc'\] = "([^"]+)/.exec

(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_nyc').innerHTML.replace(/,/g,'').replace(/\$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('user_bank_limit').value)) && 

(document.forms.something.user_bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_nyc').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand);
                }
            break;
            case 2:
                document.getElementById('user_cash_cuba').innerHTML = /user_fields\['user_cash_cuba'\] = 

"([^"]+)/.exec(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_cuba').innerHTML.replace(/,/g,'').replace(/C\

$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('user_bank_limit').value)) && 

(document.forms.something.user_bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_cuba').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand);
                }
            break;
            case 3:
                document.getElementById('user_cash_moscow').innerHTML = /user_fields\['user_cash_moscow'\] = 

"([^"]+)/.exec(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_moscow').innerHTML.replace(/,/g,'').replace(/R\

$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('user_bank_limit').value)) && 

(document.forms.something.user_bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_moscow').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand);
                }
            break;
            case 4:
                document.getElementById('user_cash_bangkok').innerHTML = /user_fields\['user_cash_bangkok'\] = 

"([^"]+)/.exec(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_bangkok').innerHTML.replace(/,/g,'').replace(/B\

$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('user_bank_limit').value)) && 

(document.forms.something.user_bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_bangkok').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand);
                }
            break;
            case 5:
                document.getElementById('user_cash_vegas').innerHTML = /user_fields\['user_cash_vegas'\] = 

"([^"]+)/.exec(attack_results)[1];
                cash_in_hand = document.getElementById('user_cash_vegas').innerHTML.replace(/,/g,'').replace(/V\

$/g,'');
                if((parseInt(cash_in_hand) > parseInt(document.getElementById('bank_limit').value)) && 

(document.forms.something.bank_enable.checked)){
                    logmsg('Banking <span class="good">'+document.getElementById('user_cash_vegas').innerHTML

+'</span>','attack_log');
                    bank(cash_in_hand,'vegas');
                }
            break;
        }
        
        if(/You win!/.test(attack_results)){
            if(/<span class="good">Win: (\d)<\/span>/.test(attack_results)){
                win += parseInt(/<span class="good">Win: (\d)<\/span>/.exec(attack_results)[1]);
            }
            else{
                win++;
            }
            if(/<span class="bad">Loss: (\d)<\/span>/.test(attack_results)){
                loss += parseInt(/<span class="bad">Loss: (\d)<\/span>/.exec(attack_results)[1]);
            }
            
            if(/Attack Again!/.test(attack_results)){
                logtext = '<img src="http://arun.keen-computing.co.uk/attack.png" alt="alive"></img> ';
            }
            
            document.getElementById('wins').innerHTML = win;
            logtext += '<span class="good">You won !</span> ';
            
//            if(/rallied/.test(attack_results)){
//                exp_gained += 2 * parseInt(/fightres_experience good">\n(.*)\+(\d*) Experience/.exec

(attack_results)[2]);
//                logtext += 'Exp gained - <span class="good">' + (2 * parseInt(/fightres_experience good">\n(.*)\

+(\d*) Experience/.exec(attack_results)[2]))+'</span>';
//            }
//            else{
            exp_gained += parseInt(/\+(\d*) Experience/.exec(attack_results)[1]);
            logtext += '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif" alt="Exp"> 

<span class="good">' + parseInt(/fightres_experience good.+?\n(.*)\+(\d*) Experience/.exec(attack_results)

[2])+'</span>';
//            }
            
            
            if(/Fan Bonus/.test(attack_results)){
                if(/rallied/.test(attack_results)){
                    exp_gained += 2 * parseInt(/(\d*) Fan Bonus/.exec(attack_results)[1]);
                    logtext += ' Fan Bonus - <span class="good">' + (2 * parseInt(/(\d*) Fan Bonus/.exec

(attack_results)[1]))+'</span>';
                }
                else{
                    exp_gained += parseInt(/(\d*) Fan Bonus/.exec(attack_results)[1]);
                    logtext += ' Fan Bonus - <span class="good">' + parseInt(/(\d*) Fan Bonus/.exec(attack_results)

[1])+'</span>';
                }
            }
//            alert(/fightres_cash sexy_cash good">\n(.*)\+( *)([^<]+)/.exec(attack_results));
            cash = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_new_york_cash|sexy_vegas_cash) good"\>

(\n|\f|\r)([^<]+)/.exec(attack_results)[3];
            
            logtext += ' <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif" 

alt="cash"></img> <span class="good">'+cash+'</span>';            
            
            if(iced == true){
                logtext += ' <img src="http://arun.keen-computing.co.uk/Ice.png" alt="Iced"></img>';
            }
            
            if(killed == true){
                logtext += ' <img src="http://arun.keen-computing.co.uk/kill.png" alt="Kill"></img>';
            }
            
            if(temp != ''){
                temp = temp.replace(/\(.+?\)/g,'');
                logtext += ' <img src="'+loot_img+'" style="width: 20px; height: 20px;"></img>'+temp;
            }
            
            logmsg(logtext,'attack_log');

            document.getElementById('exp_gained').innerHTML = exp_gained;
            exp_ratio = exp_gained/(win+loss);
            document.getElementById('exp_ratio').innerHTML = exp_ratio.toFixed(2);
//            document.getElementById('logger').innerHTML = 'Fought '+ fightlist_names[i] +' and You won ! Total Exp 

gained - '+exp_gained;
//            alert();
//            alert(/fightres_cash sexy_cash good">\n(.*)\+(.*)\$([^<]+)/.exec(attack_results)[3].replace(/,/g,''));
//            return;
            switch(true){
                case (/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(2,(/sexy_cuba_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,'')));
                    cash_city = 2;
                break;
                case (/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(3,(/sexy_moscow_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,''))); 
                    cash_city = 3;
                break;
                case (/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(4,(/sexy_bangkok_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,'')));
                    cash_city = 4;
                break;
                case (/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(5,(/sexy_vegas_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,'')));
                    cash_city = 5;
                break;
                case (/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.test(attack_results)):
                    process_cash(1,(/sexy_new_york_cash good"\>[^\$]+\$([^<]+)/.exec(attack_results)[1].replace

(/,/g,'')));
                    cash_city = 1;
                break;
            }
            
//            setTimeout(attack_user,random_delay*1000);
            
            if(/Attack Again!/.test(attack_results)){
                if(/Attack again 5 times!/.test(attack_results)){
                    if(user_power_attack_enable){
                        user_power_attack = true;
                    }
                    else{
                        user_power_attack = false;
                    }
                    temp_variable = /&xw_action=power_attack&xw_city=.+?&tmp=(.+?)&/.exec(attack_results)[1];
                }
                setTimeout(attack_user,random_delay*1000);
            }
            else{
                if(user_list.length > 1){
                    logmsg('Done with '+user_names[j]+' Fetching next target in '+random_delay+' 

seconds..','attack_log');
                }
//                alert(user_list.length);
                j++;
//                document.getElementById('logged').innerHTML = document.getElementById('logger').innerHTML +'<br>'+ 

document.getElementById('logged').innerHTML;
                if(j >= user_list.length){
                    if(document.forms.something.UserSkip.checked){
                        logmsg('All users Iced/Killed. Stopping..','status');
                        document.getElementById('pause').style.display = 'none';
                        document.getElementById('begin').style.display = 'inline';
                        firsttime = true;
                        return;
                    }
//                    logmsg('Reached last member, reloading..','attack_log');
                    if(user_list.length > 1){
                        logmsg('Reached last member, reloading..','attack_log');
                    }
                    j=0;
                }
                setTimeout(attack_user,random_delay*1000);
            }
            return;
        }
        else{
            if(/You lose!/.test(attack_results)){
                logtext = '';
                loss++;
                document.getElementById('losses').innerHTML = loss;
                cash = /(sexy_cuba_cash|sexy_bangkok_cash|sexy_moscow_cash|sexy_vegas_cash|sexy_new_york_cash) (bad|

good)"\>(\n|\f|\r)([^<]+)/.exec(attack_results)[4];
                switch(true){
                    case (/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                        process_cash(2,-(/sexy_cuba_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));
                    break;
                    case (/sexy_moscow_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                        process_cash(3,-(/sexy_moscow_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));                
                    break;
                    case (/sexy_bangkok_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                        process_cash(4,-(/sexy_bangkok_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));
                    break;
                    case (/sexy_vegas_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                        process_cash(5,-(/sexy_vegas_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));
                    break;
                    case (/sexy_new_york_cash (bad|good)"\>[^\$]+\$([^<]+)/.test(attack_results)):
                        process_cash(1,-(/sexy_new_york_cash (bad|good)"\>[^\$]+\$([^<]+)/.exec(attack_results)

[2].replace(/,/g,'')));
                    break;
                }
                if(/Attack Again!/.test(attack_results)){
                    logtext = '<img src="http://arun.keen-computing.co.uk/attack.png" alt="alive"></img> ';
                }
                
                logtext += '<span class="bad">You Lost !</span> Cash Lost <span class="bad">'+cash+'</span>';
                
                if(iced == true){
                    logtext += ' Iced !';
                }
            
                if(killed == true){
                    logtext += ' Kill !';
                }
                
                logmsg(logtext,'attack_log');
            }
            
            if(user_list.length > 1){
                logmsg(user_names[j]+' too strong, Fetching next target in '+random_delay+' seconds..','attack_log');
            }
            j++;
//            document.getElementById('logged').innerHTML = document.getElementById('logger').innerHTML +'<br>'+ 

document.getElementById('logged').innerHTML;
            if(j >= user_list.length){
                if(document.forms.something.UserSkip.checked){
                    logmsg('All users Iced/Killed. Stopping..','status');
                    document.getElementById('pause').style.display = 'none';
                    document.getElementById('begin').style.display = 'inline';
                    firsttime = true;
                    return;
                }
//                    logmsg('Reached last member, reloading..','attack_log');
                
                if(user_list.length > 1){
                    logmsg('Reached last member, reloading..','status');
                }
                attack_or_not = true;
                j=0;
                attack_user();
                return;
            }
            else{
                setTimeout(attack_user,random_delay*1000);
                return;
            }
        }
    }
    
    function next(){
        attack_count=0;
        i++;
        Trace('In NExt()');
        wait1 = parseInt(document.getElementById('delay1').value);
        wait2 = parseInt(document.getElementById('delay2').value);
        var higher = (wait2 > wait1 ? wait2 : wait1);
        var lower = (wait2 > wait1 ? wait1 : wait2);
        var random_delay = Math.floor((higher-(lower-1))*Math.random()) + lower;
        power_attack = false;
        
        if(i >= fightlist_attack.length){
            logmsg('Reached last member, reloading Fightlist..','status');
            attack_or_not=true;
            loadfightpage();
            return;
        }
        pre_check();
    }
    
    function pre_check(){
    
        var higher = (wait2 > wait1 ? wait2 : wait1);
        var lower = (wait2 > wait1 ? wait1 : wait2);
        var random_delay = Math.floor((higher-(lower-1))*Math.random()) + lower;
        random_delay = (random_delay < 0)? 0 : random_delay;
        
        Trace('In pre check');
        if(fightlist_loaded==false){
            logmsg('Fightlist loading, Please wait..','status');
            return;
        }
        
        if(run == false){
            logmsg('Paused...','status');
            return;
        }
        
        user_count = parseInt(document.forms.something.attackcount.value);

        heal_thres = parseInt(document.getElementById('heal_thres').value);
        if(document.getElementById('user_health').innerHTML < heal_thres){
            heal();
            return;
        }
        
        if(actual_count >= user_count && user_count!=0){
            logmsg('Finished Attack run, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }

        if(document.getElementById('user_stamina').innerHTML <= 0){
            logmsg('Ran out of stamina, stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if(power_attack && (parseInt(exp_to_levelup) <= 30) && levelup_halt){
            logmsg('Could level up on next Attack, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if((!power_attack) && (parseInt(exp_to_levelup) <= 6) && levelup_halt){
            logmsg('Could level up on next Attack, Stopping..','status');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        
        if(parseInt(document.getElementById('exp_to_level').value) != 0){
            if(power_attack){
                var user_exp_level = parseInt(document.getElementById('exp_to_level').value) + 30;
            }
            else{
                var user_exp_level = parseInt(document.getElementById('exp_to_level').value) + 6;
            }
            if(parseInt(exp_to_levelup) < user_exp_level){
                logmsg('Could cross user set level up exp on next attack, Stopping..','status');
                document.getElementById('pause').style.display = 'none';
                document.getElementById('begin').style.display = 'inline';
                return;
            }
        }
        
        cash_limit = parseInt(document.forms.something.cashlimit.value);
        
        if(document.getElementById('SpecialChars').value != ''){
            var avoid_chars = document.getElementById('SpecialChars').value.split('\n');
            for(k=0; k < avoid_chars.length; k++){
                if(fightlist_char_names[i].indexOf(avoid_chars[k]) != -1){
                    logmsg('Skipping '+fightlist_names[i]+' fetching next target','status');
                    skip_reason = 'Ignore char space';
                    next();
                    return;
                }
            }
        }
        
        if(document.forms.something.faction_enable.checked){
            switch(true){
                case document.forms.something.Triad.checked:
                    if(fightlist_faction[i]=='Yakuza'){
                        logmsg(fightlist_names[i]+' belongs to opposite faction, fetching next target','status');
                        skip_reason = 'Yakuza faction, Triad attack checked';
                        next();
                        return;
                    }
                break;
                case document.forms.something.Yakuza.checked:
                    if(fightlist_faction[i]=='Triad'){
                        logmsg(fightlist_names[i]+' belongs to opposite faction, fetching next target','status');
                        skip_reason = 'Triad faction, Yakuza attack checked';
                        next();
                        return;
                    }
                break;
                case document.forms.something.Balance_Faction.checked:
                    var faction_diff = parseInt(document.forms.something.balanceamt.value);
                    if(Triad > Yakuza){
                        Trace('Triad is higher');
                        if((Triad - Yakuza) > faction_diff){
                            if(fightlist_faction[i]=='Yakuza'){
                                skip_reason = 'Yakuza faction, Triad attack needed';
                                next();
                                return;
                            }
                        }
                    }
                    else if(Triad < Yakuza){
                        Trace('Yakuza is higher');
                        if((Yakuza - Triad) > faction_diff){
                            if(fightlist_faction[i]=='Triad'){
                                skip_reason = 'Triad faction, Yakuza attack needed';
                                next();
                                return;
                            }
                        }
                    }
                break;
            }
        
        }
            
        try{
            var lwr_level = parseInt(document.getElementById('LowerLevel').value);
            var uppr_level = parseInt(document.getElementById('UpperLevel').value);
            
            var lwr_mafia = parseInt(document.getElementById('LowerMafia').value);
            var uppr_mafia = parseInt(document.getElementById('UpperMafia').value);
            
            for(k=0; k < strong_list.length; k++){
                if(fightlist_char_names[i] == strong_list[k]){
                    skip_reason = 'Strong list volunteer';
                    next();
                    return;
                }
            }
            
            if(!(fightlist_levels[i]>= lwr_level && fightlist_levels[i]<=uppr_level)){
                skip_reason = 'Character Level limits';
                next();
                return;
            }
            
            if(!(fightlist_mafia[i]>= lwr_mafia && fightlist_mafia[i]<=uppr_mafia)){
                skip_reason = 'Mafia level limits';
                next();
                return;
            }
        }
        catch(err){alert(err);}
        
        if(document.getElementById('ice_check').checked){
            try{
            var target_id = /opponent_id=p%7C(\d+)/.exec(fightlist_attack[i])[1];
            var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                        };
            logmsg('Running Ice Check on '+fightlist_names[i],'status');
            var hitlist_url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=hitlist&xw_action=set&xw_city='+fight_city+'&target_pid='+target_id;
            $.ajax({type: "POST",url: hitlist_url, timeout: 30000, data: params,
                success: function (msg){
                    if (/You can't add/.test(msg)){
                        logmsg(fightlist_names[i]+' is already Iced/Dead, skipping..','status');
                        logmsg(fightlist_names[i]+' is already Iced/Dead, skipping..','attack_log');
                        skip_reason = 'Iced';
                        next();
                        return;
                    }
                    else{
                        setTimeout(attack,random_delay*1000);
                        return;
                    }
                },
                error: function(req,status,err){
                    pre_check();
                    return;
                }
            });
            return;
            }
            catch(err){alert(err);alert(i);alert(fightlist_attack[i]);}
        }
        
        setTimeout(attack,random_delay*1000);
    }
    
    function get_xmlHTTP(){
    	if(window.XMLHttpRequest)
    		return new XMLHttpRequest();
    	if(window.ActiveXObject)
    		return new ActiveXObject('Microsoft.XMLHTTP');
    	return;
    }
    
    function loadSpammers(){
        document.getElementById('UserIds').value = AddMeSpammers;
        
    }
    
    function Add_to_loot(loot,count,img){
        var WeaponsDepot = /Forge|Arc Welder|Buzzsaw|Gunpowder|Gun Drill|Sonic Emitter|Weapon Part|Grapple|Boomerang|

Railgun Barrel|Laser Rangefinder|Explosive Arrow|Portable Fusion Reactor/;
        var Vegas = /Deposit Box|Magnetic Lock|Motion Sensor|Reinforced Steel|Security Camera|Concrete|Construction 

Tool|Steel Girder|Cinder Block|Bellhop|Chef|Poker Table|Slot Machine|Casino Dealer/;
        var MHEL = /Zmeya Carbon Blade|Ubijca Assault Rifle|Konstantin Cargo Carrier|Executive Overcoat|Shturmovik|

Zoloto Sports Car/;
        var FHEL = /12 Gauge|Devastator|Zeus|Bomb Suit|Segmented Body Plate|Skull Cap|Cobra G7|Ruby Red|Turbo Road 

Warrior|Condor|Cougar|Rhinoceros/;
        var ChopShop = /Cement Block|Power Tool|Car Lift|Acetylene Torch|Shipping Container|Car Part|High Tech Car 

Part|Cuban Car Part|Thai Car Part|Russian Car Part|Solar Panel|Bulletproof Glass|Suspension Coil/;
        var BHEL = /Nak Kha Shotgun|Titanium Katar|Ninja|Royal Thai Marine|Raed Armored Sedan|Lamang Motorcycle|Chain 

Viper|Forest Scorpion/;

        total_loot+=count;
        if(/sexy_attack/.test(loot)){
            var a = /sexy_attack">(\d+)<.*?sexy_defense">(\d+)/.exec(loot);
            loot = loot.replace(/\(.+?\)/,'');
            if(a[1] >= a[2]){
                loot = '(<span class="sexy_attack">'+a[1]+'</span> <span class="sexy_defense">'+a[2]+'</span>) '+loot;
            }
            else{
                loot = '(<span class="sexy_defense">'+a[2]+'</span> <span class="sexy_attack">'+a[1]+'</span>) '+loot;
            }
        }
        if(loot.search(WeaponsDepot) > -1){
            loot = '<span class="more_in">[WD]</span> ' + loot;
        }
        if(loot.search(ChopShop) > -1){
            loot = '<span class="more_in">[CS]</span> ' + loot;
        }
        if(loot.search(FHEL) > -1){
            loot = '<span class="more_in">[FHEL]</span> ' + loot;
        }
        if(loot.search(Vegas) > -1){
            loot = '<span class="more_in">[Vegas]</span> ' + loot;
        }
        if(loot.search(BHEL) > -1){
            loot = '<span class="more_in">[BHEL]</span> ' + loot;
        }
        if(loot.search(MHEL) > -1){
            loot = '<span class="more_in">[MHEL]</span> ' + loot;
        }
        
        if(loot_item.length <= 0){
                loot_item[loot_item.length]=new Array(loot,count,img);
            }
        else{
            for(k=0; k<loot_item.length; k++){
                if(loot == loot_item[k][0]){
                    loot_item[k][1]+=count;
                    break;
                }
                else if(k==loot_item.length-1){
                    loot_item[loot_item.length]=new Array(loot,count,img);
                    break;
                }
            }
        }
        loot_item.sort();
        document.getElementById('loot_log').innerHTML = '';
        try{
            l_log = '';
            for(l=(loot_item.length-1); l>=0; l--){
                l_log += '<span class="good">'+loot_item[l][1]+'x</span> <img src="'+loot_item[l][2]+'" 

style="width:20px; height:20px" onmouseout="this.style.width=\'20px\';this.style.height=\'20px\';" 

onmouseover="this.style.width=\'40px\';this.style.height=\'40px\';"></img> '+loot_item[l][0]+'<br>';
            }
            document.getElementById('loot_log').innerHTML = l_log;
        }
        catch(err){alert(err);}
        
    }
    
    function heal(){
        Trace('In heal function');
        //clearTimeout(timeout_timer);
        cb=userid+UnixTS();
        var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                    };
//        document.getElementById('popup_permanence').innerHTML += 'Heal travel value - '+heal_travel+'<br>';
        if(heal_city == 0){
            logmsg('Healing disabled, Stopping..','status');
            logmsg('Healing disabled, Stopping..','attack_log');
            document.getElementById('pause').style.display = 'none';
            document.getElementById('begin').style.display = 'inline';
            return;
        }
        if(fight_city==heal_city){
            heal_travel=false;
            logmsg('Healing...','status');
            $.ajax({type: "POST",data: params, dataType: "json",url: 

"http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb="+cb

+"&xw_client_id=8",
                success: function (msg){
                    if(msg.hospital_message == null){
                        logmsg('Error during healing, retrying in 2 seconds..','status');
                        setTimeout(heal,2000);
                        return;
                    }
                    else if(/healed/.test(msg.hospital_message)){
                        process_cash(heal_city,-(/for (C|B|R|V|)\$([^.]+)/.exec(msg.hospital_message)[2].replace

(/,/g,'')));
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                        logmsg('<img src="http://arun.keen-computing.co.uk/heal.png" alt="heal"></img> Healed <span 

class="bad">'+(/for (C|B|R|V|)\$([^.]+)/.exec(msg.hospital_message)[0])+'</span>, Resuming attacks..','attack_log');
                    }
                    else if(msg.user_fields.user_health == msg.user_fields.user_max_health){
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                    }
                    else if(/cannot heal so fast/.test(msg.hospital_message)){
                        logmsg('Cannot heal too fast, retrying in 10 seconds..','status');
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                        setTimeout(heal,10000);
                        return;
                    }
                    else{
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                    }
                    heal_travel=false;
                    start_attack();
                    return;
                }
            });
            return;
        }
        else if(heal_travel==true){
            logmsg('Retrying Heal...','status');
            $.ajax({type: "POST",data: params, dataType: "json",url: 

"http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb="+cb

+"&xw_client_id=8",
                success: function (msg){
                    if(msg.hospital_message == null){
                        logmsg('Error during healing, retrying in 2 seconds..','status');
                        setTimeout(heal,2000);
                        return;
                    }
                    else if(/healed/.test(msg.hospital_message)){
                        process_cash(heal_city,-(/for (C|B|R|V|)\$([^.]+)/.exec(msg.hospital_message)[2].replace

(/,/g,'')));
                        logmsg('<img src="http://arun.keen-computing.co.uk/heal.png" alt="heal"></img> Healed <span 

class="bad">'+(/for (C|B|R|V|)\$([^.]+)/.exec(msg.hospital_message)[0])+'</span>, Travelling back..','status');
                        logmsg('<img src="http://arun.keen-computing.co.uk/heal.png" alt="heal"></img> Healed <span 

class="bad">'+(/for (C|B|R|V|)\$([^.]+)/.exec(msg.hospital_message)[0])+'</span>, Travelling back..','attack_log');
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                    }
                    else if(msg.user_fields.user_health == msg.user_fields.user_max_health){
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                        logmsg('Travelling back..','status');
                    }
                    else if(/cannot heal so fast/.test(msg.hospital_message)){
                        logmsg('Cannot heal too fast, retrying in 10 seconds..','status');
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                        setTimeout(heal,10000);
                        return;
                    }
                    else{
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                    }
                    $.ajax({type: "POST", data: params, url: 

"http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city="+heal_city

+"&cb="+cb+"&destination="+fight_city+"&from=fight&nextParams=&xw_client_id=8",
                    success: function (msg){
                        logmsg('Travelled Back..','status');
                        heal_travel=false;
                        start_attack();
                        return;
                    }
                    });
                }
            });
            return;
        }
        else{
            logmsg('Travelling to heal city..','status');
            $.ajax({type: "POST", data: params, url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=travel&xw_action=travel&xw_city="+fight_city+"&cb="+cb+"&destination="+heal_city

+"&from=fight&nextParams=&xw_client_id=8",
            success: function (msg){
                heal_travel=true;
          		var t_c = parseInt(/'#mw_city_wrapper'.+?'mw_city(\d+?)'/.exec(msg)[1]);
//          		alert(t_c+'\n'+heal_city+'\n'+(t_c==heal_city));
          		if(t_c != heal_city){
          		    heal_travel = false;
          		    heal();
      		    }
                logmsg('Healing...','status');
                $.ajax({type: "POST", data: params, dataType: "json",url: 

"http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&cb="+cb

+"&xw_client_id=8",
                success: function (msg){
                    if(msg.hospital_message == null){
                        logmsg('Error during healing, retrying in 2 seconds..','status');
                        setTimeout(heal,2000);
                        return;
                    }
                    else if(/healed/.test(msg.hospital_message)){
                        process_cash(heal_city,-(/for (C|B|R|V|)\$([^.]+)/.exec(msg.hospital_message)[2].replace

(/,/g,'')));
                        logmsg('<img src="http://arun.keen-computing.co.uk/heal.png" alt="heal"></img> Healed <span 

class="bad">'+(/for (C|B|R|V|)\$([^.]+)/.exec(msg.hospital_message)[0])+'</span>, Travelling back..','status');
                        logmsg('<img src="http://arun.keen-computing.co.uk/heal.png" alt="heal"></img> Healed <span 

class="bad">'+(/for (C|B|R|V|)\$([^.]+)/.exec(msg.hospital_message)[0])+'</span>, Travelling back..','attack_log');
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                    }
                    else if(msg.user_fields.user_health == msg.user_fields.user_max_health){
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                        logmsg('Travelling back..','status');
                    }
                    else if(/cannot heal so fast/.test(msg.hospital_message)){
                        logmsg('Cannot heal too fast, retrying in 10..','status');
                        setTimeout(heal,10000);
                        return;
                    }
                    else{
                        document.getElementById('user_health').innerHTML = msg.user_fields.user_health;
                    }

                    $.ajax({type: "POST", data: params, url: 

"http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=travel&xw_action=travel&xw_city="+heal_city

+"&cb="+cb+"&destination="+fight_city+"&from=fight&nextParams=&xw_client_id=8",
                    success: function (msg){
                        logmsg('Travelled Back..','status');
                        heal_travel=false;
                        start_attack();
                        return;
                    }
                    });
                }
                });
            }
            });
            return;
        }
    }
    
    function process_cash(city,cash){
//    alert('city - '+city+' Cash - '+parseInt(cash));
    try{
        switch(parseInt(city)){
            case 1:
                ny_cash += parseInt(cash);
            break;
            case 2:
                cuba_cash += parseInt(cash);
            break;
            case 3:
                moscow_cash += parseInt(cash);
            break;
            case 4:
                bk_cash += parseInt(cash);
            break;
            case 5:
                vegas_cash += parseInt(cash);
            break;
        }
        if(ny_cash < 0){
            document.getElementById('cash').innerHTML = '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img>&nbsp;<span class="bad">-$'+format_cash

(ny_cash)+'</span>';
        }
        else{
            document.getElementById('cash').innerHTML = '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif"></img>&nbsp;<span class="good">$'+format_cash

(ny_cash)+'</span>';
        }
        if(cuba_cash < 0){
            document.getElementById('cash').innerHTML += '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cubanpeso_16x11_01.gif"></img>&nbsp;<span class="bad">-C

$'+format_cash(cuba_cash)+'</span>';
        }
        else{
            document.getElementById('cash').innerHTML += '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cubanpeso_16x11_01.gif"></img>&nbsp;<span class="good">C

$'+format_cash(cuba_cash)+'</span>';
        }
        if(moscow_cash < 0){
            document.getElementById('cash').innerHTML += '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_moscow_16x16_01.gif"></img>&nbsp;<span class="bad">-R

$'+format_cash(moscow_cash)+'</span>';
        }
        else{
            document.getElementById('cash').innerHTML += '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_moscow_16x16_01.gif"></img>&nbsp;<span class="good">R

$'+format_cash(moscow_cash)+'</span>';
        }
        if(bk_cash < 0){
            document.getElementById('cash').innerHTML += '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_bangkok_16x16_01.gif"></img>&nbsp;<span class="bad">-B

$'+format_cash(bk_cash)+'</span>';
        }
        else{
            document.getElementById('cash').innerHTML += '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/icon_cash_bangkok_16x16_01.gif"></img>&nbsp;<span class="good">B

$'+format_cash(bk_cash)+'</span>';
        }
        if(vegas_cash < 0){
            document.getElementById('cash').innerHTML += '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png"></img>&nbsp;<span class="bad">-V$'+format_cash

(vegas_cash)+'</span>';
        }
        else{
            document.getElementById('cash').innerHTML += '&nbsp;<img 

src="http://mwfb.static.zynga.com/mwfb/graphics/vegas-chip.png"></img>&nbsp;<span class="good">V$'+format_cash

(vegas_cash)+'</span>';
        }
        
    }
    catch(err){alert(err);}
    }
    
    
//    Taken from AttackX by spockholm
    function format_cash(cash){
        var d;
        while (d=/(\d+)(\d{3}.*)/.exec(cash)) {
            cash = d[1] + ',' + d[2];
        }
        return cash;                
    }
    loadfightpage();

    function logmsg(message,tag){

        var l=0;
        var hr = new Date().getHours();
        var minute = new Date().getMinutes();

        hr= (hr<10?'0'+hr:hr);
        minute = (minute<10?'0'+minute:minute);
        var timestamp = '<font color=#666666>['+hr+':'+minute+']</font>';
        switch(tag){
            case 'attack_log':
                attack_log.splice(0,0,' ' + timestamp +' '+ message);
            break;
            case 'status':
                document.getElementById('status').innerHTML= message;
            break;
        }
        
        actual_count = win+loss;
        document.getElementById('fights').innerHTML = actual_count;

        l = attack_log.length;
        var user_l_len = parseInt(document.getElementById('log_size').value);
        attack_log.length = (l<user_l_len) ? l:user_l_len;
//        while(l>parseInt(document.getElementById('log_size').value)){
//            attack_log.pop();
//            l--;
//        }
        document.getElementById('attack_log').innerHTML = '';
        var log_c = '';
        for(l=0; l<attack_log.length; l++){
//            document.getElementById('attack_log').innerHTML += attack_log[l]+'<br>';
            log_c += attack_log[l]+'<br>';
        }
        document.getElementById('attack_log').innerHTML += log_c;
    }

    function bank(amount,city){
        if(fight_city == 5){
            var params = { 'ajax': 1, 
                        'liteload': 0, 
                        'sf_xw_user_id': userid,
                        'sf_xw_sig': local_xw_sig
                        };
            $.ajax({type: "POST", data: params, 
                    url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?

xw_controller=propertyV2&xw_action=doaction&xw_city=5&doaction=ActionBankDeposit&tmp="+vault_tmp_variable

+"&cb="+vault_cb_variable+"&amount="+amount+"&city=5&building_type=6&xw_client_id=8",
                success: function (msg){},error: function (s1,s2,s3){}
            });
            return;
        }
    	do_ajax('','remote/html_server.php?xw_controller=bank&xw_action=deposit&xw_city='+cash_city+'&cb='+userid

+UnixTS()+'&amount='+amount+'&city='+city,1,0,0,0);
    }
//    
//    function store_user_pref(){
//    	do_ajax('','remote/html_server.php?xw_controller=bank&xw_action=deposit&xw_city='+cash_city+'&cb='+userid

+UnixTS()+'&amount='+amount,1,0,0,0);
//    }
//    
    function writeCookieStuff(){
        wait1 = document.getElementById('delay1').value;
        wait1 = (wait1=='')?2:wait1;
        wait2 = document.getElementById('delay2').value;
        wait2 = (wait2=='')?2:wait2;
        
        ignore_chars = document.getElementById('SpecialChars').value.split('\n');
//        ignore_chars = (document.getElementById('SpecialChars').value=='')?' ':ignore_chars;
        createCookie('Brawler_ignore',escape(ignore_chars));
        
        bank_enable = (document.getElementById('bank_enable').checked)?'checked':' ';
        user_bank_enable = (document.getElementById('user_bank_enable').checked)?'checked':' ';
        bank_limit = document.getElementById('bank_limit').value;
        bank_limit = (bank_limit=='')?10000:bank_limit;
        attack_limit_enable = (document.getElementById('attack_limit_check').checked)?'checked':' ';
        attack_limit_count = document.getElementById('attack_limit').value;
        attack_limit_count = (attack_limit_count=='')?3:attack_limit_count;
        lower_mafia = document.getElementById('LowerMafia').value;
        lower_mafia = (lower_mafia=='')?0:lower_mafia;
        upper_mafia = document.getElementById('UpperMafia').value;
        upper_mafia = (upper_mafia=='')?501:upper_mafia;
        lower_level = document.getElementById('LowerLevel').value;
        lower_level = (lower_level=='')?0:lower_level;
        upper_level = document.getElementById('UpperLevel').value;
        upper_level = (upper_level=='')?9999:upper_level;
        min_cash = document.getElementById('cashlimit').value;
        min_cash = (min_cash=='')?0:min_cash;
        same_city_cash = (document.getElementById('cash_city').checked)?'checked':' ';
        faction_bal_points = document.getElementById('balanceamt').value;
        faction_bal_points = (faction_bal_points=='')?10:faction_bal_points;
        faction_attack = (document.getElementById('faction_enable').checked)?'checked':' ';
        triad_fac = (document.getElementById('Triad').checked)?'checked':' ';
        yakuza_fac = (document.getElementById('Yakuza').checked)?'checked':' ';
        faction_bal = (document.getElementById('Balance_Faction').checked)?'checked':' ';
        ice_check_enable = (document.getElementById('ice_check').checked)?'checked':' ';
        power_attack_enable = (document.getElementById('power_attack').checked)?'checked':' ';
        user_power_attack_enable = (document.getElementById('user_power_attack').checked)?'checked':' ';
        
        var cookieStuff = wait1+'|'+wait2+'|'+heal_city+'|'+heal_city_text+'|'+levelup_halt+'|'+levelup_text+'| |'+
                        bank_enable+'|'+user_bank_enable+'|'+bank_limit+'|'+attack_limit_enable

+'|'+attack_limit_count+'|'+lower_mafia+'|'+upper_mafia+'|'+
                        lower_level+'|'+upper_level+'|'+min_cash+'|'+same_city_cash+'|'+faction_bal_points

+'|'+faction_attack+'|'+
                        triad_fac+'|'+yakuza_fac+'|'+faction_bal+'|'+ice_check_enable+'|'+power_attack_enable

+'|'+user_power_attack_enable;
           
        createCookie('Brawler',cookieStuff);
    }

    function readCookieStuff(){
        try{
            var cookieStuff = readCookie('Brawler');
            if(cookieStuff == null || (/undefined/.test(cookieStuff))){
                return;
            }
            
            cookieStuff = cookieStuff.split('|');
        
            wait1 = cookieStuff[0];
            wait2 = cookieStuff[1];
            heal_city = cookieStuff[2];
            heal_city_text = cookieStuff[3];
            levelup_halt =  (cookieStuff[4] == 'true') ?true:false;
            levelup_text = cookieStuff[5];
            ignore_chars = readCookie('Brawler_ignore');
            if(!(ignore_chars == null || ignore_chars=='')){
                if(ignore_chars==' '){
                    ignore_chars='';
                }
                else{
                    ignore_chars = unescape(ignore_chars).replace(/,/g,'\n');
                }
            }
            else{
                ignore_chars='';
            }
            
            bank_enable = cookieStuff[7];
            user_bank_enable = cookieStuff[8];
            bank_limit = cookieStuff[9];
            attack_limit_enable = cookieStuff[10];
            attack_limit_count = cookieStuff[11];
            lower_mafia = cookieStuff[12];
            upper_mafia = cookieStuff[13];
            lower_level = cookieStuff[14];
            upper_level = cookieStuff[15];
            min_cash = cookieStuff[16];
            same_city_cash = cookieStuff[17];
            faction_bal_points = cookieStuff[18];
            faction_attack = cookieStuff[19];
            triad_fac = cookieStuff[20];
            yakuza_fac = cookieStuff[21];
            faction_bal = cookieStuff[22];
            ice_check_enable = cookieStuff[23];
            power_attack_enable = cookieStuff[24];
            user_power_attack_enable = cookieStuff[25];
        }
        catch(err){}
    }
    
})();

function Trace(trace_message){
    if(!trace_enable){
        return;
    }
    var hr = new Date().getHours();
    var minute = new Date().getMinutes();

    hr= (hr<10?'0'+hr:hr);
    minute = (minute<10?'0'+minute:minute);
    var timestamp = '<font color=#666666>['+hr+':'+minute+']</font>';
    
    document.getElementById('popup_permanence').innerHTML += timestamp + ' ' + skip_reason;
    document.getElementById('popup_permanence').innerHTML += timestamp + ' ' + trace_message;
}

function temp_trace(trace_msg){
    var hr = new Date().getHours();
    var minute = new Date().getMinutes();

    hr= (hr<10?'0'+hr:hr);
    minute = (minute<10?'0'+minute:minute);
    var timestamp = '<font color=#666666>['+hr+':'+minute+']</font>';
    
    document.getElementById('popup_fodder').innerHTML += timestamp + ' ' + trace_msg;
}

function current_city(){
    if($('#mw_city_wrapper').hasClass('mw_city1')){
        return 1;
    }
	else if($('#mw_city_wrapper').hasClass('mw_city2')){
        return 2;
	}
	else if($('#mw_city_wrapper').hasClass('mw_city3')){
        return 3;
	}
	else if($('#mw_city_wrapper').hasClass('mw_city4')){
        return 4;
    }
	else if($('#mw_city_wrapper').hasClass('mw_city5')){
        return 5;
    }
}

function field_validate(key_code){
//    alert(key_code);
	if ((key_code>=48 && key_code<=57) || (key_code>=96 && key_code<=105) || key_code==8 || key_code==127 || 

key_code==37 || key_code==39 || key_code==9 || key_code==46 || key_code==13 || key_code==17 || key_code==86){
		return true;
	}
	else{
		return false;
	}
}

// createCookie from Vern's Toolkit http://vern.com/mwtools/
function createCookie(name,value) {
	// expire one month from now
	var expires = new Date();
	expires.setDate(expires.getDate()+30);
	document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
}

// readCookie from Vern's Toolkit http://vern.com/mwtools/
function readCookie(name) {
	var i,
		cookie,
		nameEQ = name+"=",
		cookieArray = document.cookie.split(";");
	for (i=0; i< cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0)==' ')
			cookie = cookie.substring(1,cookie.length);
		if (cookie.indexOf(nameEQ) == 0)
			return cookie.substring(nameEQ.length,cookie.length);
	}
	return null;
}
Because it's your web

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy