// ==UserScript== 
// @name Nar.TV - Watch Costless
// @description Watch Costless web TV on Nar.TV aka Yildiz.TV
// @include http://*.nar.tv/*
// @include http://nar.tv/*
// @include http://*.yildiz.tv/*
// @include http://yildiz.tv/*
// @version     1.5
// @licence     GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// ==/UserScript==

if (/ci_c=pay/i.test(window.location)) {
GM_xmlhttpRequest({
	method: "GET",
	url: window.location.protocol+"//"+window.location.host+"/",
	onerror: function(oEvent){ alert("Error " + oEvent.target.status + " occurred while receiving the document."); },
	onload: function(response){
		if (response.readyState !== 4 || response.status !== 200) return;
		//alert('DEBUG MESSAGE:'+"\n\n"+response.responseText); return;
		// we can parse now

		var subject=response.responseText;
		var myregexp   = /<a\s+href=["']\?act=dvr&(?:amp;)?chan=([^"'&]+)["']\s+title=["']([^"']+)["']\s+[^>]+>\s*<img\s+src=["']([^"']+)["']\s+alt=["']([^"']+)["']\s+[^>]+>\s*<\/a>/i;
		var myregexp_g = /<a\s+href=["']\?act=dvr&(?:amp;)?chan=([^"'&]+)["']\s+title=["']([^"']+)["']\s+[^>]+>\s*<img\s+src=["']([^"']+)["']\s+alt=["']([^"']+)["']\s+[^>]+>\s*<\/a>/ig;
		var match = subject.match(myregexp_g);
		//alert(subject); alert(match); // for debug

		var chanlist = null;
		if (match != null) {
			var chanlist = new Array();
			//alert(dump(match)); // for debug
			for (var i = 0; i < match.length; i++) {
				// matched text: match[i]
				//alert(dump(match[i])); //for debug
				chanlist[i] = match[i].match(myregexp);
			}
			// matched text: match[0]
			// match start: match.index
			// capturing group n: match[n]
			//alert(dump(chanlist)); // for debug
			replace_page(chanlist);
			//download_serverlist('http://volkan-k.users.sourceforge.net/nar.tv/serverlist.ini');
			download_serverlist('http://volkan-k.users.sourceforge.net.nyud.net/nar.tv/serverlist.ini'); // use CoralCache don't overload SourceForge
		} else {
			// Match attempt failed
			alert("Sorry, I couldn't find/parse channel list");
		}
	}

});
} else {
	if (/act=dvr/i.test(window.location)) {
		var myregexp = /chan=([^=&?\s]+)/i;
		var match = myregexp.exec(window.location);
		if (match != null) {
			result = match[1];
			setCookie("last_channel_id", result, 365);
		}
	}
	var last_channel_js = 'function setCookie(c_name,value,exdays)' + "\r\n"
+'{' + "\r\n"
+'var exdate=new Date();' + "\r\n"
+'if (exdays==null || exdays==0){ exdays=1; }' + "\r\n"
+'exdate.setDate(exdate.getDate() + exdays);' + "\r\n"
+'var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());' + "\r\n"
+'document.cookie=c_name + "=" + c_value;' + "\r\n"
+'}' + "\r\n"
+'' + "\r\n"
+'function save_last_channel(channel_id){' + "\r\n"
+'	setCookie("last_channel_id", channel_id, 365);' + "\r\n"
+'	return true;' + "\r\n"
+'}' + "\r\n";

	addScript(document.body,last_channel_js);

	/*if (document.getElementById('chans')){
		var chan_links=document.getElementById('chans').getElementsByTagName('a');
	} else if (document.getElementById('all')){
		var chan_links=document.getElementById('all').getElementsByTagName('a');
	} else {*/
		var chan_links=document.getElementsByTagName('a');
	/*}*/
	if ( (chan_links!=null) && (chan_links.length) && (chan_links.length>0) ) {
		for (var i=0;i<chan_links.length;i++){
			var link_class_ok=(chan_links[i].getAttribute('class')=='chan_logo' || chan_links[i].getAttribute('class')=='tv_chan');
			var link_onclick_empty=(chan_links[i].getAttribute('onclick')==null || chan_links[i].getAttribute('onclick')=="");
			if ( link_onclick_empty ) {
				var subject = chan_links[i].getAttribute('href');
				var myregexp = /chan=([^=&?\s]+)/i;
				var match = myregexp.exec(subject);
				if (match != null) {
					result = match[1];
					chan_links[i].setAttribute('onclick', 'save_last_channel("'+result+'")');
				}
			}
		}
	}
}

function download_serverlist(myurl){
	GM_xmlhttpRequest({
		method: "GET",
		url: myurl,
		onerror: function(oEvent){ alert("Error " + oEvent.target.status + " occurred while receiving the document."); },
		onload: function(response){
			if (response.readyState !== 4 || response.status !== 200) return;
			//alert('DEBUG MESSAGE:'+"\n\n"+response.responseText); return;
			// we can parse now
			
			dvr_server_list_data = response.responseText
			dvr_server_list_parsed = parseINIString(dvr_server_list_data);
			//alert(dump(dvr_server_list_parsed)); //for debug

			serverlist_js = '';
			if (dvr_server_list_parsed['servers']){
				list_keys=keys(dvr_server_list_parsed['servers']);
				//alert(dump(list_keys)); // for debug
				for (var i=0;i<list_keys.length;i++){
					serverlist_js += list_keys[i]+'_server=\''+dvr_server_list_parsed['servers'][list_keys[i]]+'\';'+"\r\n";
				}
				addScript(document.body, serverlist_js);
			}
			//alert(dump(serverlist_js)); //for debug
		}
	});
}

function change_head_txt(head_txt){
	//alert("I'm gonna change the head text"); // for debug
	all_div_elem = document.getElementById('all');
	if (all_div_elem) {
		//alert("I've found the div element with element_id = all"); // for debug
		sub_div_elems = all_div_elem.getElementsByTagName('div');
		//alert("sub_div_elems.length="+sub_div_elems.length); //for debug
		for (var i = 0; i < sub_div_elems.length; i++) {
			//alert("I'm searching for the div element with class = head_txt"); // for debug
			if (sub_div_elems[i].getAttribute("class") == 'head_txt'){
				sub_div_elems[i].innerHTML=head_txt;
				return true;
			}
		}
	}
}

function change_div_box(content){
	//alert("I'm gonna change the div box"); // for debug
	all_div_elem = document.getElementById('all');
	if (all_div_elem) {
		//alert("I've found the div element with element_id = all"); // for debug
		sub_div_elems = all_div_elem.getElementsByTagName('div');
		//alert("sub_div_elems.length="+sub_div_elems.length); //for debug
		for (var i = 0; i < sub_div_elems.length; i++) {
			//alert("I'm searching for the div element with class = * loginbox"); // for debug
			if ( /loginbox/i.test(sub_div_elems[i].getAttribute("class")) ){
				sub_div_elems[i].setAttribute("class","round_box loginbox");
				sub_div_elems[i].setAttribute("style","width:1000px;");
				sub_div_elems[i].innerHTML=content;
				return true;
			}
		}
	}
}

function replace_page(chanlist){
	var content = '';

	content += '<div class="tv_logos">' + "\r\n";
	var last_channel_id = getCookie("last_channel_id");
	var last_channel_name = "";
	var last_channel_logo = "";
	for (var i = 0; i < chanlist.length; i++) {
		my_chan_id   = chanlist[i][1];
		my_chan_name = chanlist[i][4];
		my_chan_logo = chanlist[i][3];
		my_chan_text = chanlist[i][2];
		if (last_channel_id == my_chan_id){
			last_channel_name = my_chan_name;
			last_channel_logo = my_chan_logo;
		}
		content += '    	<a class="tv_chan" onclick="javascript:change_current_channel(\''+my_chan_id+'\', \''+my_chan_name+'\', \''+my_chan_logo+'\');" href="javascript:void(0)" title="'+my_chan_text+'" ><img src="'+my_chan_logo+'" alt="'+my_chan_name+'" /></a>'+"\r\n";
	}
	content += '        <div class="clear"> </div>'+"\r\n"+'    <div class="line1px"> </div>'+"\r\n"+'</div>'+"\r\n";

	content += '        <div id="dvrTop">' + "\r\n"+'  <div id="dvrShare">' + "\r\n"+'  		<div>' + "\r\n"+'    	Hemen ana direkt link: <input name="sharelinkfld" onclick="this.select()" id="sharelinkfld" type="text" value="" /> ' + "\r\n"+'        </div>' + "\r\n"+'    	<div class="dvrShareIcons">' + "\r\n"+'        	<div>' + "\r\n"+'			Şu anı paylaş: ' + "\r\n"+'            <a id="fbShareButton" href="#" target="_blank">' + "\r\n"+'            	<img src="/Apps/nartv/cssjs/imgs/logo_FB2.png" width="55" height="20" alt="FaceBook" align="absmiddle">' + "\r\n"+'            </a> ' + "\r\n"+'            </div>' + "\r\n"+'            <a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a>' + "\r\n"+'			<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>' + "\r\n"+'        </div>' + "\r\n"+'        <div class="vert_sep">' + "\r\n"+'        	<img src="/Apps/nartv/cssjs/imgs/vertical_separator.png" width="11" height="26" align="absmiddle" />' + "\r\n"+'        </div>' + "\r\n"+'    </div>' + "\r\n"+'    <div id="chanLogo"> ' + "\r\n"+'        <img id="chanLogo_img" style="display:none;" src="" width="43" alt="" align="absmiddle" />' + "\r\n"+'	</div>' + "\r\n"+'    ' + "\r\n"+'	<div id="chanSwitch">' + "\r\n"+'		Tüm Kanallar    </div>' + "\r\n"+'	' + "\r\n"+'</div>' + "\r\n";

	content += '    <div style="width:987px; margin:auto;" id="dvrCont">' + "\r\n"+'        <div style="width:640px;  float:left">' + "\r\n"+'                <div id="myContent"><div id="flash-update-notice-1">' + "\r\n"+'                  <p>Please update your flash player' + "\r\n"+'                        <br /><br />' + "\r\n"+'    <a href="http://www.adobe.com/go/EN_US-H-GET-FLASH">' + "\r\n"+'    <img width="158" height="39" alt="Get Adobe Flash Player" src="http://www.adobe.com/images/shared/download_buttons/get_adobe_flash_player.png"/>' + "\r\n"+'    </a>  	' + "\r\n"+'    ' + "\r\n"+'                  </p>' + "\r\n"+'                </div></div>' + "\r\n"+'        </div>' + "\r\n"+'        <div style="float:left; width:345px; text-align:left;">' + "\r\n"+'		        ' + "\r\n"+'                </div>' + "\r\n"+'    </div>' + "\r\n"+'	<div class="clear"></div>' + "\r\n"+'    <div class="timeLine" style="margin-left:6px; ">' + "\r\n"+'		<div id="myContent2"><div id="flash-update-notice-2"><p>Please update your flash player<a href="http://www.adobe.com/go/EN_US-H-GET-FLASH"><img width="158" height="39" alt="Get Adobe Flash Player" src="http://www.adobe.com/images/shared/download_buttons/get_adobe_flash_player.png"/></a></p></div></div>' + "\r\n"+'    </div>' + "\r\n"+'    <div class="clear">&nbsp;</div>' + "\r\n"+'' + "\r\n";

//	alert(content);

	change_head_txt('TV izle');

	change_div_box(content);
	
	var js1 = ''+'function chanSwitcher(){' + "\r\n"+"	$('.tv_logos').toggle('fast');	" + "\r\n"+'}' + "\r\n"+'$(function(){' + "\r\n"+"	$('#chanSwitch').click(function(){chanSwitcher()});" + "\r\n"+'})' + "\r\n"+"$('.tv_logos').show('fast');" + "\r\n"+"$('#dvrTop').hide();" + "\r\n"+"$('#dvrCont').hide();" + "\r\n"+"$('.timeLine').hide();" + "\r\n"+'';

	addScript(document.getElementById('all'),js1);

	var js2 = ''+'function change_selected_channel_link(chan_id) {' + "\r\n"+'	tv_logos_div = $("div.tv_logos")[0];' + "\r\n"+'	chan_id_regex = new RegExp(chan_id, "i");' + "\r\n"+'	if (tv_logos_div){' + "\r\n"+'		tv_links = tv_logos_div.getElementsByTagName("a");' + "\r\n"+'		for (var i = 0; i < tv_links.length; i++) {' + "\r\n"+'			tv_link_class = tv_links[i].getAttribute("class");' + "\r\n"+'			if ( /tv_chan/i.test(tv_link_class) ){' + "\r\n"+'				if ( chan_id_regex.test(tv_links[i].getAttribute("onclick")) ) {' + "\r\n"+'					//alert(tv_links[i].getAttribute("onclick")); //for debug' + "\r\n"+'					tv_links[i].setAttribute("class", "tv_chan sel");' + "\r\n"+'				} else {' + "\r\n"+'					tv_links[i].setAttribute("class", "tv_chan");' + "\r\n"+'				}' + "\r\n"+'			}' + "\r\n"+'		}' + "\r\n"+'	}' + "\r\n"+'}' + "\r\n"+'';

	addScript(document.getElementById('all'),js2);

	var js3 = ''+'		function getFlashMovie(movieName) { ' + "\r\n"+'			var isIE = navigator.appName.indexOf("Microsoft") != -1;   ' + "\r\n"+'			return (isIE) ? window[movieName] : document[movieName];  ' + "\r\n"+'		}  ' + "\r\n"+'' + "\r\n"+'		function timeOut()' + "\r\n"+'		{' + "\r\n"+'			//do nothing' + "\r\n"+'		}' + "\r\n"+''    	 + "\r\n"+'		function change_current_channel(chan_id,chan_name,chan_logo)' + "\r\n"+'		{' + "\r\n"+'			window.current_chan_id=chan_id;' + "\r\n"+'			window.current_chan_name=chan_name;' + "\r\n"+'			window.current_chan_logo=chan_logo;' + "\r\n"+'' + "\r\n"+"			$('.tv_logos').hide('fast');" + "\r\n"+"			$('#dvrTop').show();" + "\r\n"+"			$('#dvrCont').show();" + "\r\n"+"			$('.timeLine').show();" + "\r\n"+'' + "\r\n"+'			change_selected_channel_link(chan_id);' + "\r\n"+'' + "\r\n"+"			if ( document.getElementById('dvr_player') ) {" + "\r\n"+'				// remove current player' + "\r\n"+'				swfobject.removeSWF("dvr_player");' + "\r\n"+'			}' + "\r\n"+"			if ( document.getElementById('timeline') ) {" + "\r\n"+'				// remove current timeline' + "\r\n"+'				swfobject.removeSWF("timeline");' + "\r\n"+'			}' + "\r\n"+'			// add targets for embeds' + "\r\n"+"			if ( !document.getElementById('contentWrapper1') ) {" + "\r\n"+"				$('#myContent').prepend('<div id=\"contentWrapper1\"></div>'); " + "\r\n"+'			}' + "\r\n"+"			if ( !document.getElementById('contentWrapper2') ) {" + "\r\n"+"				$('#myContent2').prepend('<div id=\"contentWrapper2\"></div>'); " + "\r\n"+'			}' + "\r\n"+'' + "\r\n"+"			if (eval(\"typeof(\"+chan_id+\"_server) != 'undefined'\") && eval(chan_id+'_server')) {" + "\r\n"+"				dvrServer = eval(chan_id+'_server');" + "\r\n"+'			} else {' + "\r\n"+"				dvrServer = 'rtmp://origin2.nar.tv/dvrh264/'+chan_id;" + "\r\n"+'			}' + "\r\n"+'' + "\r\n"+"			var flashvars = {'chan':chan_id,'dvrServer':dvrServer,'aspect':'','domain':'http://www.yildiz.tv/','lnktime':'Hemen ana direkt link'" + "\r\n"+'											' + "\r\n"+"											,'hideLogo':'true'" + "\r\n"+"							,'mp4Prefix':'mp4:'" + "\r\n"+'				};' + "\r\n"+"			var params = {'allowFullScreen':true,'wmode':'opaque','allowScriptAccess':'always'};" + "\r\n"+'			var attributes = { id: "dvr_player", name: "dvr_player" };' + "\r\n"+'' + "\r\n"+'' + "\r\n"+'			swfobject.embedSWF("dvr/dvrGoogle21.swf?v=1.8b", "contentWrapper1", "640", "510", "10.0.0", false, flashvars, params, attributes);' + "\r\n"+'			//swfobject.embedSWF("dvr/dvrH.swf?v=1.2", "contentWrapper1", "640", "510", "10.0.0", false, flashvars, params, attributes);		' + "\r\n"+'' + "\r\n"+'' + "\r\n"+"			var flashvars = {'chan':chan_id,'lang':'tr','domain':'http://www.yildiz.tv/'" + "\r\n"+'			};' + "\r\n"+'			var params = {};' + "\r\n"+'			var attributes = { id: "timeline", name: "timeline" };' + "\r\n"+'' + "\r\n"+'' + "\r\n"+'			swfobject.embedSWF("dvr/timer/timelineNar.swf?v=0.3", "contentWrapper2", "987", "170", "10.0.0", false, flashvars, params, attributes);' + "\r\n"+'' + "\r\n"+"			if ( document.getElementById('dvr_player') ) {" + "\r\n"+"				$('#flash-update-notice-1').remove();" + "\r\n"+'			}' + "\r\n"+"			if ( document.getElementById('timeline') ) {" + "\r\n"+"				$('#flash-update-notice-2').remove();" + "\r\n"+'			}' + "\r\n"+'' + "\r\n"+"			chanLogo_img_element=document.getElementById('chanLogo_img');" + "\r\n"+'			if (chanLogo_img_element){' + "\r\n"+'				//change chanLogo' + "\r\n"+"				chanLogo_img_element.setAttribute('src', chan_logo);" + "\r\n"+"				chanLogo_img_element.setAttribute('alt', chan_name);" + "\r\n"+"				$('#chanLogo_img').show();" + "\r\n"+'			}' + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'' + "\r\n"+'		function playPause()' + "\r\n"+'		{' + "\r\n"+"			getFlashMovie('dvr_player').playPause();" + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		var dvr_stats 		= {};' + "\r\n"+'		function dvr_isPlaying(playing)' + "\r\n"+'		{' + "\r\n"+'			dvr_stats.playing	= playing;' + "\r\n"+'			//console.info(dvr_stats.playing);' + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		function dvr_NetStatus(status)' + "\r\n"+'		{' + "\r\n"+"			var nt = $('#dvrNote');" + "\r\n"+'			console.log(status);' + "\r\n"+'			switch(status)' + "\r\n"+'			{' + "\r\n"+'				case "NetStream.Buffer.Empty":' + "\r\n"+'					nt.show();' + "\r\n"+'					break;' + "\r\n"+'				case "NetStream.Seek.Notify":' + "\r\n"+'					nt.show();' + "\r\n"+'				  	break;' + "\r\n"+'				default:' + "\r\n"+'				  nt.hide();	 ' + "\r\n"+'			}' + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		function time(time,date,live)' + "\r\n"+'		{' + "\r\n"+"			getFlashMovie('timeline').setTime(time,date);" + "\r\n"+'' + "\r\n"+'			var mins = time.substr(0,5);' + "\r\n"+'' + "\r\n"+'			if(dvr_stats.mins != mins){' + "\r\n"+'				dvr_stats.mins		= mins;' + "\r\n"+'				dvr_stats.date 		= date;' + "\r\n"+'				dvr_stats.live 		= live;' + "\r\n"+'				dvr_stats.time 		= time;' + "\r\n"+'				updateLinks();	' + "\r\n"+'			}' + "\r\n"+'		}' + "\r\n"+''		 + "\r\n"+'		function updateLinks()' + "\r\n"+'		{' + "\r\n"+'			setShareLink(dvr_stats.date,dvr_stats.mins);' + "\r\n"+'			setTimeLink(dvr_stats.date,dvr_stats.mins);' + "\r\n"+'			setCalPlayingLink(dvr_stats.date);' + "\r\n"+'			setActiveProgram(dvr_stats.mins);	' + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		var selected_prog_id = 0;' + "\r\n"+'		function setActiveProgram(time)' + "\r\n"+'		{' + "\r\n"+"			var progDiv = $('#form_prog');" + "\r\n"+'			if (!progDiv)' + "\r\n"+'				return false;' + "\r\n"+'' + "\r\n"+'			var tm = String(time);' + "\r\n"+'			tm = tm.replace(":", "")' + "\r\n"+"			$.each($('.prog_item'), function(key,val){" + "\r\n"+"				$(val).removeClass('prog_selected');" + "\r\n"+"				if (Number($(val).attr('mns')) <= Number(tm) && Number($($('.prog_item')[key+1]).attr('mns')) > Number(tm)){" + "\r\n"+"					$(val).addClass('prog_selected');" + "\r\n"+"					$('#form_prog').scrollTop((key*$(val).height())-($('#form_prog').height()/2));" + "\r\n"+'' + "\r\n"+'					// Program Facebook Comments' + "\r\n"+"					var prog_id = $(this).attr('progid');" + "\r\n"+"					var fbFrame	= $('#fbStream');" + "\r\n"+"					//console.info(prog_id+' '+selected_prog_id);" + "\r\n"+'					if(fbFrame && prog_id && (prog_id != selected_prog_id))' + "\r\n"+'					{						' + "\r\n"+"						$(fbFrame).attr('src','http://www.facebook.com/plugins/live_stream_box.php?app_id=139184372795805&width=1000&height=400&xid='+prog_id+'&locale=tr_TR');" + "\r\n"+'						selected_prog_id = prog_id;' + "\r\n"+"						//console.info('RELOAD:'+prog_id+' '+selected_prog_id);" + "\r\n"+'						$(fbFrame).load(function() {' + "\r\n"+'							$(fbFrame).show();' + "\r\n"+'						})' + "\r\n"+'					}' + "\r\n"+'				}' + "\r\n"+'			})' + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		function setCalPlayingLink(date)' + "\r\n"+'		{' + "\r\n"+"			$('#timelineCal').find('.timelinePlaying').removeClass('timelinePlaying');" + "\r\n"+"			$('.timelineDay[dtfl=\"'+date+'\"]').addClass('timelinePlaying');" + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		function setTimeLink(date,time)' + "\r\n"+'		{' + "\r\n"+"			if($('#sharelinkfld'))" + "\r\n"+'			{' + "\r\n"+"				var url = 'http://www.yildiz.tv/';" + "\r\n"+"				$('#sharelinkfld').val(url+'?act=dvr&chan='+window.current_chan_id+'&seekTime='+date+' '+time);" + "\r\n"+'			}' + "\r\n"+'		}		' + "\r\n"+''		 + "\r\n"+'		function setShareLink(date,time)' + "\r\n"+'		{' + "\r\n"+"			var url = 'http://www.yildiz.tv/';" + "\r\n"+"			var shareLink = url+'%3Fact%3Ddvr%26chan%3D'+window.current_chan_id+'%26seekTime%3D'+date+'%20'+time;" + "\r\n"+"			$('#fbShareButton').attr('href','http://www.facebook.com/sharer.php?u='+shareLink+'&t='+window.current_chan_id);" + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		function reloadDays(date)' + "\r\n"+'		{	' + "\r\n"+"			getFlashMovie('timeline').reloadDays(date);" + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		function realSeek(time)' + "\r\n"+'		{' + "\r\n"+'			//highlightProgTime(time);' + "\r\n"+"			getFlashMovie('dvr_player').realSeek(time);	" + "\r\n"+'		}' + "\r\n"+'' + "\r\n"+'		function fullSeek(time)' + "\r\n"+'		{' + "\r\n"+"			getFlashMovie('dvr_player').fullSeek(time);" + "\r\n"+'		}' + "\r\n"+'';

	addScript(document.getElementById('all'),js3);
	
	if ((last_channel_id != null) && (last_channel_id != "") && (last_channel_name != "")){
		var js4 = 'window.setTimeout("change_current_channel(\''+last_channel_id+'\', \''+last_channel_name+'\', \''+last_channel_logo+'\');",3000);';
		addScript(document.getElementById('all'),js4);
	}

}

/*
################################################
#   INTERNAL USERSCRIPT FUNCTIONS
################################################
*/

// Functions: getCookie and setCookie
// Source : http://www.w3schools.com/js/js_cookies.asp
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
if (exdays==null || exdays==0){ exdays=1; }
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}


// Function : addScript()
// Source: http://userscripts.org/groups/51

function addScript(body, js) {
	if (!body){
		var body = document.body; 
	}
	script = document.createElement('script');
    if (!body) return;
    script.type = 'text/javascript';
    script.textContent = js;
    body.appendChild(script);
}


// Function : keys()
// Source: http://stackoverflow.com/questions/890807/iterate-over-a-javascript-associative-array-in-sorted-order/890829#890829

function keys(obj)
{
    var keys = [];

    for(var key in obj)
    {
        if(obj.hasOwnProperty(key))
        {
            keys.push(key);
        }
    }

    return keys;
}

// Function : parseINIString()
// Source: http://stackoverflow.com/questions/3870019/javascript-parser-for-a-string-which-contains-ini-data/12452845#12452845

function parseINIString(data){
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value = {};
    var lines = data.split(/\r\n|\r|\n/);
    var section = null;
    lines.forEach(function(line){
        if(regex.comment.test(line)){
            return;
        }else if(regex.param.test(line)){
            var match = line.match(regex.param);
            if(section){
                value[section][match[1]] = match[2];
            }else{
                value[match[1]] = match[2];
            }
        }else if(regex.section.test(line)){
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        }else if(line.length == 0 && section){
            section = null;
        };
    });
    return value;
}


/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
