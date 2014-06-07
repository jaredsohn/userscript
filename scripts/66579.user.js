// ==UserScript==
// @name           Förbättrad SL.se
// @namespace      http://userscripts.org/users/123049
// @description	   Lägger till en rad funktioner på SL.se som gör det enklare att planera din resa
// @include        http://reseplanerare.sl.se/*
// @include        http://www.sl.se/*
// @include        http://sl.se/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js

// ==/UserScript==
// Run 


//script update checker from http://userscripts.org/scripts/show/20145
var SUC_script_num = 66579; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

(function() {
	// Define console to avoid errors when Firebug isn't available
	if(!window.console){ window.console = {log:function(){}}; }

	//check for empty fields in travel planner search. If deafult home station exists in settings, redirect to a search from/to home station
	var m = /^(http:\/\/reseplanerare\.sl\.se\/bin\/query\.exe\/sn\?[^∞]+&S=)([^&]*)(&REQ0JourneyStopsZ0A=255&Z=)([^&]*)(&[^∞]+)$/.exec(window.location.href)
	if(m!=null){
		var new_href='';for(i=1;i<m.length;i++){if(m[i]==''){new_href+=GM_getValue('settings_home_station', '')}else{new_href+=m[i];}}
		if(new_href!=window.location.href){window.location.href=new_href;return;}
	}
	
	//Set some basic variables
	var script_start_time = new Date();
	var instance_delimiter = '||||||';
	var data_delimiter = '+++++++';
	var tb_colors = [['gröna', '#47B22C'], ['röda', '#EE3511'], ['blå', '#152265']];
	var window_activity=0;
	
	function get_data(string){//returns list of values from string, splits by data_delimiter
		var string = ''+string;
		return string.split(data_delimiter)	
	}
	
	function format_data(previous, list){//returns string from list of data, adds data_delimiter in between. If previous is empty string, adds instance_delimiter
		var string='';
		for (i=0;i<list.length;i++){
			if(i>0){string+=data_delimiter};
			string+=list[i];
		}
		if(string!=''&&previous.length>0){return instance_delimiter+string;}
		return string;
	}
	
	function sl_travel_planner_link(start, stop, now){//returns link to travel planner. If now==false, the link takes you to date/time selection before the results appear.
		if (now){
			var url = 'http://reseplanerare.sl.se/bin/query.exe/sn?REQ0JourneyStopsS0A=255&S='+escape(start)+'&REQ0JourneyStopsZ0A=255&Z='+escape(stop)+'&start=yes&REQ0JourneyDate=%2B0&REQ0JourneyTime%3D%2B0%3A05';
		}else{
			var url = 'http://reseplanerare.sl.se/bin/query.exe/sn?REQ0JourneyStopsS0A=255&S='+escape(start)+'&REQ0JourneyStopsZ0A=255&Z='+escape(stop)+'&getstop=1'
		}
		return '<a href="'+url+'" title="'+start+' - '+stop+'">';
	}
	
	function only_stop_name(string, all){//returns stop name without municipality name. If all==true, removes everything in round brackets
		var kommuner = ['Botkyrka', 'Danderyd', 'Ekerö', 'Haninge', 'Huddinge', 'Järfälla', 'Lidingö', 'Nacka', 'Norrtälje', 'Nykvarn', 'Nynäshamn', 'Salem', 'Sigtuna', 'Sollentuna', 'Solna', 'Stockholm', 'Sundbyberg', 'Södertälje', 'Tyresö', 'Täby', 'Upplands-Bro', 'Upplands Väsby', 'Vallentuna', 'Vaxholm', 'Värmdö', 'Österåker'];
		m = /^([a-zA-ZåäöÅÄÖ -]+,) ([^@]+)/.exec(string);
		if(m){for(i=0;i<kommuner.length;i++){if(kommuner[i]+','==m[1]){string = m[2];}}}
		if(all){return string.replace(/ ?\([^\)]+\)/, '').replace(/ ?\([^\)]+\)/, '');}
		return string;
	}
	
	function update_values(compare_data_list, change_data_list, new_item_list, value_name, sort_f, action){//updates GM-values
		/*
		add/update item to list. 
		1 (list) = items that need to be identical [null, 'foo', null, 'bar'] if pos 1 and 3 should match. 
		2 (list) = change on items [['add',1], null, ['subtract', 1], ['append', 'test']] For each changed item, use list where pos-0 explains the action. 'add', 'append', 'replace', 'subtract'
		3 (list) = data to use if new item
		4 (string) = name of variable
		5 (function or false) = sort function if applied, otherwise false
		6 (list) = [add?, update?, delete?, sort_from_1?] true or false on each
		*/
		
		var prev = GM_getValue(value_name, '').split(instance_delimiter)
		var update = false
		var n_list = []
		if(prev[0]!=''){
			for(o=0;o<prev.length;o++){
				var d=get_data(prev[o])
				prev[o]=d;
				var match = true;
				var i = 0;
				for each(val in compare_data_list){
					if(val!=null && val!=d[i]+''){match=false;}
					i++;
				}

				if(match){
					if(action[1]){
					
						
						i = 0;
						for each(var val in change_data_list){
							if(val!=null){
								if(val[0]=='add'){d[i]=d[i]*1+val[1]}
								else if(val[0]=='subtract'){d[i]=d[i]*1-val[1]}
								else if(val[0]=='append'){d[i]=d[i]+''+val[1]}
								else if(val[0]=='replace'){d[i]=val[1]}
							}
							i++;
						}
						//prev[o]=d;	
						update=true
					}
				}
				if(action[2]==false || match==false){
					n_list[n_list.length]=d;
				}else{
					update=true
				}
			}
		}
		
		if((update==false || action[1]==false)&& action[0]){
			if(n_list[0]==''){n_list[0]=new_item_list;}else{n_list[n_list.length]=new_item_list;} // adds new item to list, if empty list adds as index 0
		}
		
		//sort the list. If sort_f is a number, check list with built in functions for it
		if(typeof sort_f =='number'){sort_f=[function(a, b) {return parseFloat(b[0])-parseFloat(a[0]);},  function(a, b) {return parseFloat(a[0])-parseFloat(b[0]);}][sort_f]}
		if(sort_f && typeof sort_f == 'function'){n_list.sort(sort_f);} // sort the list
		
		//start count in first variable from 1
		if(action[3]){
			var new_n_list = []
			var index = 1
			for each(var val in n_list){	
				val[0]=index;
				new_n_list[new_n_list.length] = val;
				index++;
			}
			n_list = new_n_list;
		}
		
		//transform list into string
		var new_string = '';
		for each(var item in n_list){new_string+=format_data(new_string,item);}
		GM_setValue(value_name, new_string);
		
	}
	
	$('#TopMenuArea').css('width', '610px').closest('#TopMenuHolder').css('width', '610px').css('float', 'right').appendTo('#TopHolder');//Moves top menu a little bit higher to save space
	$('#LinesArea').css('height', '0px').css('border-bottom', 'none');//Makes lines area smaller (shows only one line)

	if(location.href.match(/http:\/\/([w]+\.)?sl.se\/?[#?]?/)){ // start page
		
		
		function li_open_tag(s, show_content_ul, id){
			if(show_content_ul){var d_s = 'display:block;';}else{var d_s = 'display:none;';}
			return '<li><h3 class="Good"><a class="TrafficStatusAccordionHandle" href="javascript:void(0);">'+s+'<span class="statusname" title="Fungerar bra">Fungerar bra</span></a></h3><ul style="'+d_s+'" id="gm_ul_'+id+'">';
		}
		
		$('#SecondaryColumnHolder').prepend('<div style="margin:10px 4px;width:250px;" id="jquery_second_column"><ul id="TrafficDeviArea" class="fake_DeviArea"></ul></div>');

		showed_tpa_time = [];
		function tpa_li(cat, val){
			d = get_data(val)
			if(showed_tpa_time[cat]==undefined){showed_tpa_time[cat] = []}
			for(k=0;k<showed_tpa_time[cat].length;k++){if(d[1]+d[2]==showed_tpa_time[cat][k]){return '';}}
			
			showed_tpa_time[cat][showed_tpa_time[cat].length]=d[1]+d[2];
			return '<li class="fake_li"><div style="float:left;"><span class="TrafficEventLink">&nbsp;</span></div>'+'<div style="padding-left:5px;width:175px;float:left;">'+sl_travel_planner_link(d[1], d[2], true)+only_stop_name(d[1], true)+' - '+only_stop_name(d[2], true)+'</a></div>'+'<div style="float:left;padding:0px 3px;border:1px #5BBCE5 solid;">'+sl_travel_planner_link(d[1], d[2], false)+'Senare</div>'+'</a></li>';
				
			
		}
		
		
		function add_tpa_li(title, gm_value, limit){
			$('ul.fake_DeviArea').append(li_open_tag(title, true, gm_value)+'</li>')
			cat = showed_tpa_time.length;
			var count = 0;
			for each(val in GM_getValue(gm_value, '').split(instance_delimiter)){
				if(count<limit && val!=''){
					var str = tpa_li(cat, val);
					if (str!=''){
						$('#gm_ul_'+gm_value).append(str)
						count++;
					}
					
				}
			}
		}
		
		add_tpa_li('Reseplanerare: Senaste', 'search_by_time', 10);
		add_tpa_li('Reseplanerare: Vanligaste', 'search_by_count', 10);
		
		
	
		var places_by_count = GM_getValue('places_by_count', '').split(instance_delimiter)
		var fav_options = ''
		var fav_place_setting = GM_getValue('settings_home_station', '');
		var prepend = '<option value="'+fav_place_setting+'">'+unescape(fav_place_setting)+'</option>';
		if(fav_place_setting==''){prepend='';}
		if(places_by_count!=''){
			for(i=0;i<places_by_count.length;i++){
				var d = get_data(places_by_count[i])
				fav_options+='<option value="'+escape(d[1])+'"';
				if(escape(d[1])==fav_place_setting){
					fav_options+=' selected="selected"';
					prepend = ''
				}
				fav_options+='>'+d[1]+'</option>';
			}
		}
		$('ul.fake_DeviArea').append(li_open_tag('Inställningar', false, '')+'<li class="fake_li fake_li_not_link">\
		Hemstation:<br/><select id="gm_home_station" name="home_station"><option value="">--ingen vald--</option>'+prepend+fav_options+'</select> <br/>\
		Uppdateringsintervall:<br/><input type="text" id="gm_reload_time" size="4" value="'+GM_getValue('settings_realtime_update_interval', '20')+'" /> sekunder<br/>\
		<br/><input type="button" id="settings_home_station" value="Spara" /><br/><br/></li>\
		<li class="fake_li fake_li_not_link"><input type="button" id="delete_all_button" value="Radera all data"/></li><li class="fake_li fake_li_not_link"><b>Information om inställningar</b><br/>\
		<i>Hemstation</i> - Om du valt en hemstation räcker det att fylla i det du ska åka till eller från i reseplaneren, lämnar du ett fält tomt fylls hemstationen i automatiskt.<br/>\
		<i>Uppdateringsintervall</i> - De antal sekunder som går mellan uppdateringen av realtidsinformation. Alltför frekventa uppdateringar belastar SL:s servrar onödigt mycket och kan slöa ner din upplevelse. Om ingen aktivitet sker i fönstret (om det du går från datorn eller fönstret hamnar i bakgrunden) pausas uppdateringarna och återupptas då aktivitet sker.<br/>\
		<i>Radera all data</i> - Det här alternativet raderar all data som sparats av skriptet. Data som lagras är bland annat hur populära vissa sökningar är samt när de senaste sökningarna gjorts.\
		</li>'+'</li>')
		$('#settings_home_station').bind('click', function(e){	
			GM_setValue('settings_home_station', escape($('#gm_home_station').val()));
			var s = $('#gm_reload_time').val().replace(/[^\d]/g, "");
			if(s!=''){GM_setValue('settings_realtime_update_interval', s);}
			$('#gm_reload_time').val(s);

			$(this).after('<div id="gm_save_info">Ändringarna har sparats, du kan behöva ladda om sidan för att förändringarna ska märkas</div>');
			setInterval(function(){$('#gm_save_info').hide('normal', function(){$(this).remove()});}, 5*1000);
		});
		$('#delete_all_button').bind('click', function(e){	
			if(confirm('Vill du radera all data som sparats av scriptet?')){
				for each(var val in GM_listValues()){GM_deleteValue(val);}
			}	
		});
		
		
		//$('#ctl00_FullRegion_QuickPlaner_tbTo').wrap('<nobr></nobr>').parent().before('<br/>').append('<select style="display:inline;position:relative;left:20px;">'+fav_options+'</select>')
		
		
		$('.fake_li').css({'background': 'white', 'padding':'0.3em 0.2em 0.5em 0.2em', 'width':'100%'}).not('.fake_li_not_link').prepend('');
		$('a.TrafficStatusAccordionHandle').click(function(){$(this).closest('h3').next().toggle()});
		
		
		function format_realtime(type, obj){
		
			if(type=='bus'){
				obj.find('br').remove();
			}else{
				obj.find('h2').remove()
				
				if(type=='rb'||type=='pt'){
					obj.find('div.menu_heading').nextAll('div').each(function(){if(/^[0-9]+:[0-9]+/.exec($(this).html())==null){$(this).remove()}else{$(this).html('<div style="float:left;">'+$(this).html().substr(0,5)+'</div><div style="width:165px;float:left;">'+$(this).html().substr(5)+'</div><div style="clear:both;"></div>')}})
				}
				
				obj.find('div.puffinner > div, div.puffinner > div > div').contents().filter(function(){ return this.nodeType != 1; }).wrap("<span/>");
				obj.find('div.puffinner > div').find('span:contains("-----")').remove();
				obj.find('div.puffinner > div:contains("vgångstider")').remove();
				if(type=='tb'||type=='pt'){obj.find('div.puffinner > div:contains("ppdaterat")').remove();}
				obj.find('div.menu_link').remove();
				obj.find('div.puffinner > a:contains("ppdatera")').remove();
				if(type=='tb'){
					obj.find('div.puffinner > br').remove();
					obj.find('div.puffinner > div').css('padding', '5px');
					obj.find('div.puffinner > div').find('span:first').css('font-weight', 'bold');
					obj.find('div.puffinner > div').find('span:last').css('font-weight', 'normal');
				}else{
					obj.css('padding', '5px').find('br').remove();
				}
			}
		}
		
		function add_realtime_area(data){
			var h_style='background:white;border-top:1px #ddd solid;border-bottom:1px #ddd solid;';
			var img_p = '';
			if(data[1]=='tb'){
				h_style='color:white;';
				for each(val in tb_colors){if(data[2]==val[0]){h_style+='background:'+val[1]+';'}}
				img_p = 'http://sl.se/Upload/jpg/icon-tbana.gif';
				
			}else if(data[1]=='pt'){
				img_p = 'http://sl.se/Upload/jpg/icon-commuter.gif';
			}else if(data[1]=='rb'){
				img_p = 'http://sl.se/Upload/jpg/icon-local.gif';
			}else if(data[1]=='bus'){//probably something else
				img_p = 'http://sl.se/Upload/jpg/icon-bus.gif';
			}
			
			if(img_p!=''){img_p = '<img src="'+img_p+'" style="float:left;"/>';}
			var symbol='remove';
			if(data[5]=='none'){symbol='add';}
			$('#gm_realtime').append(
				'<div id="realtid_'+escape(data[1])+'-_-_-'+escape(data[3])+'_outer" class="gm_realtime_outer" style="">\
					<div id="realtid_i_headline" style="'+h_style+'height:20px;padding:3px;">\
						<div class="realtid_remove" style="float:right">\
						 <img src="http://dryicons.com/images/icon_sets/blue_velvet/png/16x16/'+symbol+'.png" title="Minimera" class="gm_realtime_hide gm_realtime_icon"/>\
						 <img src="http://dryicons.com/images/icon_sets/blue_velvet/png/16x16/close.png" title="Ta bort" class="gm_realtime_close gm_realtime_icon"/>\
						</div>\
						<div class="gm_realtime_header" style="">\
							'+img_p+'\
							<div style="padding:2px;">&nbsp;'+data[4]+'</div>\
						</div>\
					</div>\
					<div id="realtid_'+escape(data[1])+'-_-_-'+escape(data[3])+'_inner" class="gm_realtime_inner" style="display:'+escape(data[5])+';">\
						Laddar\
					</div>\
				</div>')
			if(data[5]!='none'){add_realtime_data($('#realtid_'+escape(data[1])+'-_-_-'+escape(data[3])+'_inner'), true)}	
			
			
			
			
			

		}

		var add_realtime_data = function(obj, activity){
			var m = /^realtid_([a-zA-ZåäöÅÄÖ0-9]+)-_-_-([a-zA-ZåäöÅÄÖ0-9]+)_inner$/.exec(obj.attr('id'));
			if(activity){
				var rt_form = function (responseText, textStatus, XMLHttpRequest) {if(textStatus=='success'){format_realtime(m[1], obj);}else{obj.html('Kunde inte ladda realtidsinformation')};}
				if(m[1]=='bus'){var url = 'http://realtid.sl.se/Default.aspx?epslanguage=SV&SrchId=&SiteId='+m[2]+' div.TrafficTypeItem';}else{var url = 'http://mobil.sl.se/templates/Station.aspx?id=10&typ2='+m[1]+'&number='+m[2]+'&Num= div.puffinner'}
				//console.log('Börjar ladda: '+obj.attr('id')+' '+url)
				$('#realtid_'+m[1]+'-_-_-'+m[2]+'_inner').load(url, '', rt_form);
			}else{
				$('#realtid_'+m[1]+'-_-_-'+m[2]+'_inner').html('Har inte uppdaterats då det saknats aktivitet i fönstret. Rör på musen eller tryck en tangent så uppdateras realtidsinfon snart.');
			}
			
			
		}
	
		$('#StartQuickPlanHolder').css('height', '176px').css('width', '200px');
		$('#StartColumn2Holder').insertBefore('#StartColumn1Holder');
		$("#StartColumn1and2Holder").css('width', '230px').after('<div id="gm_realtime_column" style="float:left;width:220px;border-top:solid 1px #d9d9d9;"><div class="ALHeader" style="">Realtidsinformation</div><div id="gm_realtime" style="border:1px solid #ddd;"></div><div id="gm_realtime_settings" style="clear:both;">Lägg till: <a href="/templates/RealTime.aspx?id=9" id="gm_realtime_settings_link">Spårtrafik</a> <a href="http://mobilrt.sl.se/">Buss</a><div id="gm_realtime_settings_inner"></div></div><div>');
	
		function save_realtime_place(realtime_data){ //traffic sort, tb-color, place_id, place_name
			var add_list = [1000]
			var test_list = [null];
			for each(val in realtime_data){
				add_list[add_list.length] = val;
				test_list[test_list.length] = val;
				
			}
			
			
		//	var add_list = [1000, realtime_data[0], realtime_data[1], realtime_data[2], realtime_data[3]]; // sort nr, traffic sort, tb-color, place_id, place_name, visibility
			update_values( test_list, [], add_list, 'realtime2', 1, [true, true, false, true]);
			$("#gm_realtime_settings_inner").html('Realtidsinfo för '+realtime_data[3]+' har lagts till på startsidan.');
			add_realtime_area(add_list);	
		}
		
		function parse_bus_settings(dis){
			if($('#another_form').html()==null){$('body').append('<div id="another_form" style="clear:both;"></div>');}else{$('#another_form').html('');}
			var link = $(dis).find('a[href*="siteNr="]').attr('href');
			if(link!=null){
				var stop_id = /[\?&]siteNr=([0-9]+)/.exec(link)[1];
				save_realtime_place(['bus', '', stop_id, only_stop_name($(dis).find('div.puffinner b:first').text(), false), 'block']);
			}else{
				$(dis).find('form:first').attr('id', 'gm_special_form').after('<div id="gm_bus_submit_form"></div>').appendTo('#another_form').find('input, select, textarea').clone().appendTo('#gm_bus_submit_form').each(function(){
					$(this).attr('name', 'gm_form_'+$(this).attr('name')).attr('id', 'gm_form_'+$(this).attr('id'));
					if($(this).attr('type')=='submit'){
						$(this).replaceWith('<input type="button" value="'+$(this).val()+'" id="gm_form_submit_button" />')
						$('#gm_form_submit_button').click(function(){

							if($("#gm_special_form").find('input[name="sites"]').val()!=undefined){
								$('#gm_realtime_settings_inner').load('http://mobilrt.sl.se/templates/WebSigns.aspx?id=128&siteNr='+$("#gm_special_form").find('input[name="sites"]').val()+' div.puffinner','',function (responseText, textStatus, XMLHttpRequest) {
									parse_bus_settings(this)
								});
							}else{
								var ser = $("#gm_special_form").serialize();
							
								$.post('http://mobilrt.sl.se/'+$("#gm_special_form").attr('action'), $("#gm_special_form").serialize(),
								  function(data){
								    $('#gm_realtime_settings_inner').empty()
									$(data).find('input').closest('form').appendTo('#gm_realtime_settings_inner');
									parse_bus_settings($('#gm_realtime_settings_inner'));
								});
							}
						})
					}
				}).change(function(){
					var m = /gm_form_([^ ]+)/.exec( $(this).attr('name') )
					if(m!=null){
						$('#gm_special_form').find('[name="'+m[1]+'"]').val($(this).val())
					}
				});
				$('#gm_special_form select').each(function(){
					var select_val = $(this).find('option:selected').attr('value');$(this).find('option').each(function(){if (select_val==undefined){select_val=$(this).attr('value')}});
					$(this).after('<input type="text" name="'+$(this).attr('name')+'" value="'+select_val+'" />').remove()
					});
				if($(dis).find(':selected').html()!=undefined){$('#gm_special_form').attr('action', 'templates/'+$('#gm_special_form').attr('action'));}
				
			}
			
		}
		
		$('#gm_realtime_settings a').live("click", function(){
			
			var href = 'http://mobil.sl.se'+$(this).attr('href');
			realtime_re = /\/templates\/Station\.aspx\?id=10&typ2=([a-zA-Z]+)&number=([0-9]+)&Num=/
			var m = realtime_re.exec($(this).attr('href'));
			rt_m = m;
			
			if(m!=null)
			{ 
				$('#gm_realtime_settings_inner').load(href+' div.puffinner'	, '', function (responseText, textStatus, XMLHttpRequest) {
					var realtime_data = [rt_m[1], '', rt_m[2]];
					if(realtime_data[0]=='tb'){
						
						var re = /([a-zåäö]+) linje/
						var m = re.exec($(this).find('h2:first').html());
						for each(val in tb_colors){if(m[1]==val[0]){realtime_data[1] =val[0];}}
					}
					if(rt_m[1]=='rb'){
						var re = /^([^<]+)</					
						var m = re.exec($(this).find('div.puffinner > div:contains("Avgångstider")').next().find('b:first').html());
					}else{
						var re = /^Avgångstider från ([^£]+)$/
						var m = re.exec($(this).find('div.puffinner > div:contains("Avgångstider från")').text());
					}
					
				
					realtime_data[3]=m[1];
					realtime_data[4]='block';
					save_realtime_place(realtime_data)
					rt_m = '';
				});
			}else if(/http:\/\/mobilrt\.sl\.se\//.exec($(this).attr('href'))!=null){
				$('#gm_realtime_settings_inner').load($(this).attr('href')+' form:first','',function (responseText, textStatus, XMLHttpRequest) {
					parse_bus_settings(this)
				});
				
			}else{
				 $('#gm_realtime_settings_inner').load(href+' div.puffinner');
			}
		     
			return false;
		});
		
		
		for each(val in GM_getValue('realtime2', '').split(instance_delimiter)){
			if(val!=''){
				add_realtime_area(get_data(val))
			}
		}
		
		var style = '<style type="text/css">\
						.TrafficTypeItem {margin:5px;}\
						.TrafficTypeItem .Header {width:100%;margin-bottom:6px;font-weight:bold;clear:both;}\
						.TrafficTypeItem .Departure .LineDesignation {clear: both;float: left;width: 34px;}\
						.TrafficTypeItem .Departure .DestinationName {float: left;width: 130px;overflow:hidden;white-space: nowrap;}\
						.TrafficTypeItem .Departure .DisplayTime {text-align: right;}\
					</style>';
		$('head').append(style)
		
		$('.gm_realtime_close').live("click", function(){
			if(confirm('Vill du ta bort realtidsinformationen för '+jQuery.trim($(this).closest('.gm_realtime_outer').find('.gm_realtime_header').text())+' från startsidan?')){
				var m = /^realtid_([a-zA-ZåäöÅÄÖ0-9]+)-_-_-([a-zA-ZåäöÅÄÖ0-9]+)_outer$/.exec($(this).closest('.gm_realtime_outer').attr('id'));
				update_values( [null, m[1], null, m[2]],  [],  null, 'realtime2', false, [false,true,true,false]);
				$(this).closest('div.gm_realtime_outer').remove();
			}
		});
		
		$('.gm_realtime_hide').live("click", function(){
			$(this).closest('.gm_realtime_outer').find('.gm_realtime_inner').toggle('', function(){
				var m = /^realtid_([a-zA-ZåäöÅÄÖ0-9]+)-_-_-([a-zA-ZåäöÅÄÖ0-9]+)_inner$/.exec($(this).attr('id'));
				update_values( [null, m[1], null, m[2]],  [null, null, null, null, null, ['replace', $(this).css('display')]],  null, 'realtime2', false, [false,true,false,false]);

			});
			
			var t = true;
			for each(val in ['http://dryicons.com/images/icon_sets/blue_velvet/png/16x16/remove.png', 'http://dryicons.com/images/icon_sets/blue_velvet/png/16x16/add.png']){
				if(t && $(this).attr('src')!=val){$(this).attr('src', val);t=false;}
				
			}
		});
		var add_all_realtime = function(){
			//console.log('Loopar sen senaste aktivitet: '+window_activity);
			var update=true;
			if(window_activity>3){update=false;}
			$('#gm_realtime div.gm_realtime_inner').each(function(e){
				if($(this).css('display')!='none'){add_realtime_data($(this), update);}
			});
			window_activity++;
		}
		$('body').bind('mousemove keydown scroll focus',function(e){
			if(window_activity>3){
				window_activity=0;
				add_all_realtime();
			}
			window_activity=0;
		});
		setInterval(add_all_realtime, parseInt(GM_getValue('settings_realtime_update_interval', '20'))*1000);
	}
	
	var tpa = $('#TravelPlanerArea h2');

	if (tpa.html()!=null){
		re=/Från ([a-zåäöA-ZÅÖ0-9.:,;\[\]\- \(\)]+) till ([a-zåäöA-ZÅÖ0-9.:,;\[\]\- \(\)]+)/
		m = re.exec(tpa.html())
		if (m!=null){
			
			var table_ajax = function(){
				$.post($(this).closest('form').attr('action'), $(this).closest('form').serialize()+'&'+$(this).attr('name'),
				  function(data){
					$('form[name="tp_results_form"]').attr('action', $(data).find('form[name="tp_results_form"]').attr('action'));
					$(data).find('table.hafasOverviewTable tbody').replaceAll('table.hafasOverviewTable tbody');
				});
				return false;
			}
			
			$('input[name="REQ0HafasScrollDir=1"]').bind('click', table_ajax).trigger('click');
			$('input[name="REQ0HafasScrollDir=2"]').bind('click', table_ajax);
			
		
			var s_time = GM_getValue('search_by_time', '').split(instance_delimiter);
			var new_s_time_list = [ [script_start_time.getTime(), m[1], m[2] ] ];
			var ct_time = script_start_time.getTime();
			var new_search = true
			if(s_time!=''){
				for(i=0;i<s_time.length;i++){
					if(i<50){
						var d=get_data(s_time[i])
						new_s_time_list[new_s_time_list.length]=d
						if(m[1]==d[1]&&m[2]==d[2]&&new_search){
							if((ct_time-d[0])<1000*60*30){new_search=false;}//if difference is smaller than 30 minutes, it's not a new search							
						}
					}
				}
			}
			
			new_s_time_list.sort(function(a, b) {return b[0]-a[0];});
			var new_string = '';for each(item in new_s_time_list){new_string+=format_data(new_string,item);}
			GM_setValue('search_by_time', new_string);
			
			if(new_search){
				//add/update information about popular places
				update_values( [null, m[1]], [['add', 1]],[1, m[1]], 'places_by_count', 0, [true, true, false, false]);
				update_values( [null, m[2]], [['add', 1]],[1, m[2]], 'places_by_count', 0, [true, true, false, false]);
					
				//add/update information about popular travel planner searches
				update_values( [null, m[1], m[2]], [['add', 1]], [1, m[1], m[2]],'search_by_count', 0, [true, true, false, false]);
			}
			
			
			
			
		}
		
	}
	
	
}());
