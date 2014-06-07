// ==UserScript==
// @name           Sucker Punch
// ==/UserScript==
javascript:(function(){
    try{
        var punched_user_id = document.evaluate('//div[@class="tab_content"]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        punched_user_id = /&amp;user=p\|([0-9]+)/.exec(punched_user_id.snapshotItem(0).innerHTML)[1];
        var sucker_link = document.evaluate('//a[contains(string(),"Sucker Punch")]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        sucker_link = sucker_link.snapshotItem(0).onclick;
        sucker_link = /('|")(.+?)('|")/.exec(sucker_link)[2].replace(/&amp;/g,'&');
    }
    catch(err){
        alert('Error Encountered - '+err+'\n\nEnsure you are running the BM on the Mafia Wars profile of the person you want to attack');
        return;
    }
    try{
        var receiver_name = document.evaluate( "//div[@class=\"stats_title_text\"]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
        if((/The Hospital/.test(receiver_name.snapshotItem(0).innerHTML)) || (/The Bank/.test(receiver_name.snapshotItem(0).innerHTML))){
            receiver_name = receiver_name.snapshotItem(1).innerHTML;
   	    }
        else{
            receiver_name = receiver_name.snapshotItem(0).innerHTML;
        }
        receiver_name = /"([^"]+)/.exec(receiver_name)[1];
    }
    catch(err){
        alert('Error Encountered - '+err+'\n\nEnsure you are running the BM on the Mafia Wars profile of the person you want to attack');
        return;    
    }

    var styles='<style type="text/css">'+
        '.sexy_table1{font-weight:bold; border:1px solid #666666; padding-left:10px; }'+
        '.sexy_error_table{font-size:17px; background-color:black; color:red; padding-left:10px}'+
    	'.sexy_select{font-weight:bold; color:#D0D0D0; border: 1px solid #666666; background-color:black; width:100%; font-size:15px; }'+
        '.sexy_input{background-color:black; color:#D0D0D0; width:83%; font-size:15px; border: 1px solid #666666; padding-left:0.2em}'+
    	'.sexy_start_gift{background:black; height:25px; border-width:0.5px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}'+
        '.sexy_stop_gift{background:black; height:25px; border-width:1px; width:150px; font-weight:bold; color: rgb(255, 217, 39)}'+
    	'.sexy_destination1{padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 20px; font-weight: bold; background-color:black; color:#FFD927; border: 1px solid #FFD927; overflow: hidden;}'+
        '.sexy_destination2{font-weight: bold; background-color:black; color:#FFD927; width:150px; border: 1px solid #FFD927; overflow: hidden;}'+
        '</style>';

    var table_html='<form id="something">'+
			'<table width="745px" style="border:1px solid #666666; background-color:black;">'+

			'<tr>'+
			'<td width="100%" style="border:1px solid #666666;">'+
            '<table style="background-color:black; height:40px">'+
            '<tr>'+
            '<th width="50%" style="font-size:20px; padding-left:15px;text-align: left">Sneak Attack bETA.&#12324;</th>'+
			'<th width="48%" style="font-size:12px; text-align:right">'+/*'<a id="Website" align="right" href="http://arun.keen-computing.co.uk" target="_blank">Arun\'s Mafia Wars Helpers</a> - <a id="Donate" href="http://arun.keen-computing.co.uk/?page_id=31" target="_blank">Donate</a>'+*/'</th>'+
			'<th width="2%" align=center><a href="#" id="close"><img alt="Exit" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_remove_16x16_01.gif"></a></th>'+
			'</tr>'+
            '</table>'+
            '</td>'+
			'</tr>'+
			
			'<tr>'+
			'<td width="100%">'+
			'<table width=100% style="background-color:black;">'+
			'<tr style="height:10px">'+
            '<td width="10%">Punches</td>'+
            '<td width="1%">:</td>'+
            '<td width="2%" id="fights">0</td>'+
            '<td width="3%">Of</td>'+
            '<td width="75%"><input type=text id="attackcount" value="0" class="sexy_input" style="width:30px" onkeydown="return field_validate(event.keyCode);"> (0 = Unlimited)</td>'+
            '<td width="9%"><a id="pause" href="#" style="display:none"><img align="right" alt="Pause" src="http://arun.keen-computing.co.uk/pause.png"></img></a>'+
            '<a id="begin" href="#" style="display:inline"><img align="right" alt="Start" src="http://arun.keen-computing.co.uk/play.png"></img></a></td>'+
            '</tr></table>'+
			'</tr>'+
			
			'<tr>'+
			'<td width="100%">'+
			'<table width=100% style="background-color:black;">'+
			'<tr style="height:10px">'+
            '<td width="10%">Damage</td>'+
            '<td width="1%">:</td>'+
            '<td width="68%">&nbsp;<span id="damage">0</span></td>'+
            '<td width="8%">Delay</td>'+
            '<td width="1%">:</td>'+
            '<td width="5%"><input type=text id="delay1" value="1" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>'+
            '<td width="2%">to</td>'+
            '<td width="5%"><input type=text id="delay2" value="2" class="sexy_input" style="width:25px" onkeydown="return field_validate(event.keyCode);"></td>'+
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
            '<td width="89%">&nbsp;<span id="status"></span></td>'+
			'</tr>'+
			'</table>'+	
            '</td>'+
			'</tr>'+
			
			'<tr>'+
			'<td width="100%">'+
			'<table width="100%" style="background-color:black; height:40px">'+
            '<tr><td width="10%" valign="top"><a href="#" id="log_show">Log</a> &nbsp;&nbsp;<input type="text" id="log_size" value="10" class="sexy_input" style="width:20px"></input></td>'+
            '<td width="1%" valign="top">:</td>'+
            '<td id="attack_log" colspan="2"></td>'+
            '</tr>'+
			'</table>'+
			'</td>'+
			'</tr>'+
			
			'</table>'+
			'</form>';



    var error_window='<table class="sexy_error_table" width=100% id="errormsg" border=2 rules=none bgcolor="black"></table><br>';

    try{
	   document.getElementById('popup_permanence').removeChild(document.getElementById('punch_div'));
    }
    catch(err){}

    var content=document.getElementById('popup_permanence');
    var punch_div=document.createElement("div");
    punch_div.id='punch_div';

    punch_div.innerHTML = styles+error_window+table_html;

    content.insertBefore(punch_div,content.firstChild);

    document.getElementById("close").onclick=function(){
        run=false;
        try{
            document.getElementById('popup_permanence').removeChild(document.getElementById('punch_div'));
        }
        catch(err){}
    }
	
    var puncher_user_id = /'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
    var user_count=0;
    var count=0;
    var damage = 0;
    var run=false;
    var attack_log=[]
    
    document.getElementById("begin").onclick=function(){
        document.getElementById("begin").style.display = 'none';
        document.getElementById("pause").style.display = 'inline';
        run=true;
        user_count = parseInt(document.forms.something.attackcount.value);
        punch();
        return false;
    }
    
    document.getElementById("pause").onclick=function(){
        run=false;
        document.getElementById("pause").style.display = 'none';
        document.getElementById("begin").style.display = 'inline';
        return false;
    }
    
    function punch(){
        user_count = parseInt(document.forms.something.attackcount.value);
        if(count >= user_count && user_count!=0){
            run = false;
            logmsg('Done punching..','status');
            document.getElementById("pause").style.display = 'none';
            document.getElementById("begin").style.display = 'inline';
            return;
        }
        if(run==false){
            logmsg('Paused..','status');
            return;
        }
        if(parseInt(document.getElementById('user_stamina').innerHTML)==0){
            run = false;
            logmsg('Out of stamina, Stopping..','status');
            document.getElementById("pause").style.display = 'none';
            document.getElementById("begin").style.display = 'inline';
            return;        
        }
        if(parseInt(document.getElementById('user_health').innerHTML)<25){
            run = false;
            logmsg('Health too low to punch, Stopping..','status');
            document.getElementById("pause").style.display = 'none';
            document.getElementById("begin").style.display = 'inline';
            return;        
        }
        
        wait1 = parseInt(document.getElementById('delay1').value);
        wait2 = parseInt(document.getElementById('delay2').value);
        var higher = (wait2 > wait1 ? wait2 : wait1);
        var lower = (wait2 > wait1 ? wait1 : wait2);
        var random_delay = Math.floor((higher-(lower-1))*Math.random()) + lower;
        
        random_delay = (random_delay < 0)? 0 : random_delay;
        
        logmsg('Punching '+receiver_name+'..','status');
        var params = { 'ajax': 1, 
                        'liteload': 1, 
                        'sf_xw_user_id': puncher_user_id,
                        'sf_xw_sig': local_xw_sig
                        };
        var link = "http://facebook.mafiawars.zynga.com/mwfb/"+sucker_link+"&origin=profile&xw_client_id=8";
        $.ajax({type: "POST",url: link, data: params,
            success: function (msg){
                 $('#user_health').html(/user_fields\['user_health'\] = parseInt\("(.+?)"/.exec(msg)[1]);
                 $('#user_stamina').html(/user_fields\['user_stamina'\] = parseInt\("(.+?)"/.exec(msg)[1]);

                if(/session has timed out/.test(msg)){
                    logmsg('Session has timed out. Please refresh page and rerun BM','attack_log');
                    logmsg('Session has timed out. Please refresh page and rerun BM','status');
                    document.getElementById("pause").style.display = 'none';
                    document.getElementById("begin").style.display = 'inline';
                    run=false;
                }
                else if(/iced or too weak/.test(msg)){
                    logmsg('Target Iced or too weak. Stopping..','attack_log');
                    logmsg('Target Iced or too weak. Stopping..','status');
                    document.getElementById("pause").style.display = 'none';
                    document.getElementById("begin").style.display = 'inline';
                    run=false;
                }
                else if(/You punched/i.test(msg)){
                    count++;
                    var temp = /<td class="message_body">You punched (.+?) in the face, dealing <strong>(\d+) damage<\/strong>\./.exec(msg);
                    damage +=parseInt(temp[2]);
                    logmsg('Punched '+temp[1]+' dealing '+temp[2]+' damage.','attack_log');
                }
                setTimeout(punch,random_delay*1000);
            }
        });
	}
    
    function UnixTS(){
        return (Math.round(new Date().getTime() / 1000));
    }    
    
    function logmsg(message,tag){

        var l=0;
        var hr = new Date().getHours();
        var minute = new Date().getMinutes();
		var second = new Date().getSeconds();

        hr= (hr<10?'0'+hr:hr);
        minute = (minute<10?'0'+minute:minute);
		second = (second<10?'0'+second:second);
        var timestamp = '<font color=#666666>['+hr+':'+minute+':'+second+']</font>';
        switch(tag){
            case 'attack_log':
                attack_log.splice(0,0,' ' + timestamp +' '+ message);
            break;
            case 'status':
                document.getElementById('status').innerHTML= message;
            break;
        }
        
        document.getElementById('fights').innerHTML = count;
        document.getElementById('damage').innerHTML = damage;

        l = attack_log.length;
        var user_l_len = parseInt(document.getElementById('log_size').value);
        attack_log.length = (l<user_l_len) ? l:user_l_len;
        document.getElementById('attack_log').innerHTML = '';
        var log_c = '';
        for(l=0; l<attack_log.length; l++){
            log_c += attack_log[l]+'<br>';
        }
        document.getElementById('attack_log').innerHTML += log_c;
    }

})();

function field_validate(key_code){

	if ((key_code>=48 && key_code<=57) || (key_code>=96 && key_code<=105) || key_code==8 || key_code==127 || key_code==37 || key_code==39 || key_code==9 || key_code==46){
		return true;
	}
	else{
		return false;
	}
}