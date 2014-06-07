// ==UserScript==
// @name           Icedlog ΣɸÐ{ֆ} Ʀმĭղ¹³
// @author         Autor
// @description    Edit
// @credits        Script learner, education term.
// ==/UserScript==

javascript:(function(){
	function create_div() {
		if(document.getElementById('jDiv')) {
			document.getElementById('jDiv').innerHTML = config_html;
		} else {
			var jDiv=document.createElement("div");
			jDiv.id = 'jDiv';
			content.insertBefore(jDiv, content.firstChild);
			document.getElementById('jDiv').innerHTML = config_html;
		}
	}
	
	function log(s){
		if (s){
			$('#log').html(s+'<br />'+$('#log').html());
		}
	}
	
	var version='IceLog reEdit by ΣɸÐ{ֆ} Ʀმĭղ¹³',xmlHTTP;
	var content=document.getElementById('content_row');
	var config_html =
		'<style>.editThis{color:#ffd927;text-decoration:underline;cursor:pointer;}</style><div 

class="messages">'+
			'<div style="text-align:right;vertical-align:top;">'+version+' - <img id="close" 

src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16" /></div>'+
			'<div><a class="sexy_button_new" id="log_btn"><span><span>Hide/Show 

Log</span></span></a> <a class="sexy_button_new" id="clear"><span><span>Clear Log</span></span></a> </div>'+
			'<div id="log"></div>'
		'</div>';
	
	create_div();
	
	$('#close').click(function(){
		$('#jDiv').remove();
	});
	
	$('#log_btn').click(function(){
		if($('#log').is(':hidden')){$('#log').show('slow');}else{$('#log').hide('slow');}
	});		
	
	$('#clear').click(function(){
		$('#log').html('');
	});

	function iceLog(){
		if($('.iced_pop').length>0){
			var playername = $('.fightres_player > .fightres_names > .fightres_name').text();
			var clan = playername.match(/[\{,\[,\(,\<].+[\},\],\),\>]/i);
			var opponentname = $('.fightres_opponent > .fightres_names > .fightres_name').text();
			log('<hr />You: 'ΣɸÐ{ֆ} Ʀმĭղ¹³'<br />Clan: <span class="editThis">'+clan+'</span><br 

/>Action:  Iced your opponent<br />Opponent: '+opponentname+'<br />Proof: 

'+$('.iced_pop_body_count_text').text().replace(':',' ')+$('.iced_pop_body_count_number').text()+'<br 

/>Comment: <span class="editThis">No Comment</span>');
			$('.editThis').click(function(){
				var txt = prompt('Edit Text',$(this).text());
				if(txt != null){
					$(this).text(txt);
				}
			});
			$('.iced_pop').remove();
		}
		setTimeout(function(){iceLog()},2000);
	}
	$('body').ajaxComplete(function(){
		if($('.fightres_hint').length > 0){
			var txt = $('.fight_results').text();
			if(txt.match(/You killed your opponent.+count to \d{1,6}\!/i) != null){
				txt = txt.match(/You killed your opponent.+count to \d{1,6}\!/i);
				$('.fightres_hint').text('');
				var playername = $('.fightres_player > .fightres_names > 

.fightres_name').text();
				var clan = playername.match(/[\{,\[,\(,\<].+[\},\],\),\>]/i);
				var opponentname = $('.fightres_opponent > .fightres_names > 

.fightres_name').text();
				log('<hr />You: '+playername+'<br />Clan: <span 

class="editThis">'+clan+'</span><br />Action: Killed your opponent<br />Opponent: '+opponentname+'<br />Proof: 

'+txt+'<br />Comment: <span class="editThis">No Comment</span>');
			}
		}	
	});
	iceLog();
}())