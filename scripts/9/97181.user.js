// ==UserScript==
// @name           ΣφD BM Bundle
// @author         Eyes of Destruction
// @description    Bookmarklet Bundle
// ==/UserScript==

javascript:(function(){
    
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
        document.getElementById('header_top_promo_banner').parentNode.removeChild(document.getElementById('header_top_promo_banner'));
    }
    catch(fberr){}
      
    try{
        document.getElementById('LoadingOverlay').parentNode.removeChild(document.getElementById('LoadingOverlay'));
        document.getElementById('LoadingBackground').parentNode.removeChild(document.getElementById('LoadingBackground'));
    }
    catch(fberr){}

	function create_div() {
		if(document.getElementById('gxDiv')) {
			document.getElementById('gxDiv').innerHTML = config_html;
		} else {
			var gxDiv=document.createElement("div");
			gxDiv.id = 'gxDiv';
			content.insertBefore(gxDiv, content.firstChild);
			document.getElementById('gxDiv').innerHTML = config_html;
		}
	}

	
	var version='ΣφD Bundle',xmlHTTP;
	var content=document.getElementById('content_row');
	var config_html =
		'<style>.editThis{color:#ffd927;text-decoration:underline;cursor:pointer;}</style><div class="messages">'+
			'<B><div style="color: orange;text-align:right;vertical-align:top;">'+version+' - </B><a href="http://alturl.com/pq2rk" target="_blank"><span style="color: white;">EOD Recruitment Centre</a></span> - <img id="close" src="http://t1.gstatic.com/images?q=tbn:ANd9GcSSaOsgict8f0egJOdZ5t5tZ5ADRtNHYlquH88h_LROYZh5_Ql-" title="Close" width="16" height="16" /></a></div>'+'<div><center><BR><a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/unframe-beta.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>Unframe</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://guessx.x10.mx/nukept2.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>EnemyProfile</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/quickheal.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short green"><span><span>AutoHeal</span></span></a>&#32;&#32;&#32;<a href="javascript:var%20o%3Ddocument.createElement%28%22script%22%29%2Ch%3Ddocument.getElementById%28%22mw_city_wrapper%22%29%2Cc%3Ddocument.getElementById%28%22ogpmwsuite%22%29%3B%28function%28%29%7Bif%28%21c%29%7Bc%3Ddocument.createElement%0A%0A%28%22div%22%29%3Bc.setAttribute%28%22id%22%2C%22ogpmwsuite%22%29%3Bc.setAttribute%28%22style%22%2C%22border%3A1px%20solid%20%23ffffff%3B%22%29%3Bh.insertBefore%28c%2Ch.firstChild%29%3B%7DsetTimeout%28function%28%29%7Bif%0A%0A%28%24%28%22loader%22%29%29%7B%24%28%22loader%22%29.innerHTML%3D%27%3Cspan%20class%3D%22bad%22%3EFailed%20to%20load%20script.%20Try%20again.%27%7D%0A%0Ao.src%3D%22%22%7D%2C45000%29%3Bo.type%3D%22text/javascript%22%3Bo.src%3D%22http%3A//www.oneguy.com/mafia/Scriptlets/mwts.js%3F%22+Math.random%0A%0A%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28o%29%3B%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>MWTS</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FBrawler.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>Brawler v4</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/attackX-live.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>Attack X</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://userscripts.org/scripts/source/95664.user.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short red sexy_attack_new"><span><span>EOD Brawler</span></span></a><BR><BR><a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/loose_slots.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>LooseSlots</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/inventory.analyzer.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>ItemAnalyzer</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/free_gift_get_a_nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>GetaNator</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fguessx.x10.mx%2FFightloggergx.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short white"><span><span>Ice Logger</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://joyka.boatpartsrus.net/mafia/heal_ny.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short green"><span><span>Qheal NY</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20i%3Dprompt%28%22EOD%20Link%20Maker%20%28eod-recruitment.blogspot.com%29%5Cn%5CnAdd%20a%20Gift%20ID%22%2C404%29%3Bif%28i%29%7B%24.post%28%22http%3A%2F%2Ffacebook.mafiawars.com%2Fmwfb%2Fremote%2Fhtml_server.php%3Fxw_controller%3Drequests%26xw_action%3Dfriend_selector%26req_controller%3Dfreegifts%26free_gift_cat%3D1%26free_gift_id%3D%22%2Bi%2C%7B%22sf_xw_user_id%22%3A%2Fsf_xw_user_id%3D%28%5Ba-z%5D%5C%7C%5B0-9%5D%2B%29%2F.exec%28document.body.innerHTML%29%5B1%5D%2C%22sf_xw_sig%22%3Alocal_xw_sig%2C%22ajax%22%3A%221%22%2C%22liteload%22%3A%221%22%7D%2Cfunction%28data%29%7Bvar%20t%3D%2Fcontent%3D%22%28.%2B%29%3Cfb%3Areq-choice%20url%3D%22%28http.%2B%29%22%20label%3D%26quot%3B%28.%2B%29%26quot%3B%20.%3E%2F.exec%28data%29%3B%24.getJSON%28%22http%3A%2F%2Fjson-tinyurl.appspot.com%2F%3F%26callback%3D%3F%22%2C%7Burl%3At%5B2%5D%7D%2Cfunction%28data%29%7Bprompt%28t%5B1%5D%2Cdata.tinyurl%29%7D%29%3B%7D%29%3B%7D%7D%29%28%29" class="sexy_button_new short white"><span><span>LinkMaker</span></span></a><BR><BR><a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/crafty_lil_helper_beta.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>Crafter</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/link-a-nator.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>LinkaNator</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.exellerate.com/mafia/mystery_bagger.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>BMungger</span></span></a>&#32;&#32;&#32;<a href="javascript:(function(){var%20a%3Ddocument.createElement(%22script%22)%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http%3A%2F%2Fcodeoutpost.com%2FScripts%2FChuckACrapQueue.js%3F%22%2BMath.random()%3Bdocument.getElementsByTagName(%22head%22)[0].appendChild(a)})()%3B" class="sexy_button_new  short white"><span><span>Chucker</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://codeoutpost.com/Scripts/FeedHelper.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>Job&PartReq</span></span></a>&#32;&#32;&#32;<a href="http://apps.facebook.com/inthemafia/?zy_link=appage" class="sexy_button_new short green"><span><span>Refresh</span></span></a>&#32;&#32;&#32;<a href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22http://www.spockholm.com/mafia/property_collector.js%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new  short white"><span><span>Prop Collector</span></span></a>&#32;&#32;&#32;<a><span><span></a></center></div><BR>'+
			'<div id="log"></div>'
		'</div>';

	create_div();
	$('#close').click(function(){
		$('#gxDiv').remove();
   });
}())