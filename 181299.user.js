// ==UserScript==
// @name       	Quick Jobber.X
// @namespace   Mafiawars
// @version     0.01
// ==/UserScript==

var isRunning = false;
var JobsFailed = 0;
var JobsDone = 0;
var TotalJobsDone = 0;
var JobsToDo = 0;
var JobsRgo;
var JobName;
var thezero = 0;
var totalwheel = 0; 
var totalbag = 0; 
var totalmaster = 0;

if ($('#quick_jobber_holder').length > 0){
	$('#quick_jobber_holder').remove();
}
$('#mw_navigation').parent().append('<span style="position:relative;" id="quick_jobber_holder"></span>   ')

var span_to_go = $('#quick_jobber_holder');

$(span_to_go).append('<span> Job Name: <span class="good" title="Job Name" id="GX_JN">0</span><br>Job in Que: <span class="good" title="Jobs to do total" id="GX_JIQ">0</span><br>Jobs Attempted: <span class="good" title="Jobs Attempted" id="GX_JA">0</span><br>Jobs Completed: <span class="good" title="Jobs Completed" id="GX_JC">0</span><br>Jobs Failed: <span class="good" title="Jobs Failed" id="GX_JF">0</span><br>Status: <span id="quick_jobber_status"></span><span id="topmafia_stats" style="display:none"></span><BR>Quit:');
$('#quick_jobber_status').text(' Stopped...')
$('<img>', {
    id :    'close_quick_jobber',
    title: 'Close Quick Jobber!',
    src :'https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/iced.png',
    click: function () {
        $('#quick_jobber_holder').remove();
    }
}).appendTo(span_to_go);

	function updateStats(stats_div){
		var stat_count = parseInt($('#GX_'+stats_div).text());
		stat_count++;
		$('#GX_'+stats_div).text(stat_count);
	}
		
	function bringupjobinfo(){
		try{
			if($("#dronex_job").length > 0){
				return;
			}
		} catch (err){}
		
		$('.job').each(function(index){
            var job_div = $(this)
            //if we are allready attached to the job skip and check next
            if  ($(job_div,'#dronex_job').find('#dronex_job').length > 0){
				return true
            }
            var our_button = $(job_div).find('.uses.clearfix')
            var job_id_div = $(job_div).attr('id');
            var job_id = /(\d+)/.exec(job_id_div)[0]
            $(our_button).append( '<span id="dronex_job"><a class="sexy_button_new short black dronex_job" href="#" job_id="'+job_id_div+'" title="Burn NRG"><span><span><img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_influence_16x16_01.gif"></span></span></a></span>');
		});
		
		//bind our buttons to process
		$('.dronex_job').click(function(){
			if(isRunning){
				return;
			}
			isRunning = true;
			JobsFailed = 0;
			TotalJobsDone = 0;
			JobsToDo = 0;
			JobsDone = 0;
			$('#GX_JIQ').text(thezero);
			$('#GX_JA').text(thezero);
			$('#GX_JF').text(thezero);
			$('#GX_JC').text(thezero);
			totalwheel = 0; 
			totalbag = 0; 
			totalmaster = 0;
			$('#topmafia_stats').hide();
			var job_id_div = $(this).attr('job_id');
			var repeatme = $(this);
            //extract from the clicked button 
            var name = $.trim($('#'+job_id_div).find('.job_details > h4').text());
			if($('#spockholm_toolbar').length > 0){
				var GetName = parseStuff($('#'+job_id_div).find('h4').text());
				if(GetName){
					name = GetName.name + " ("+GetName.ratio+")";
				}
			}
			//JobName = name;
			
			$('#GX_JN').text(name);
			$('#GX_JN').append(' <span><a href="#" id="Do_Again" title="Do It AGAIN!"><span><span><img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/action_box_icon_refresh.gif"></span></span></a></span>');
			
			$('#Do_Again').click(function(){
				logit('doing it again');
				repeatme.click();
				return;
			});
			
			var job_id = /(\d+)/.exec(job_id_div)[0]
			var energy = $('#'+job_id_div).find('.uses.clearfix').find('.energy').attr('current_value');
			var experience = $('#'+job_id_div).find('.pays.clearfix').find('.experience').attr('current_value');
			var link = $('#'+job_id_div).find('div[class^="job_details clearfix"] a[id^="btn_dojob_"]');
			var linkp2 = $(link).prop('href');
			var CurrentNRG = parseInt(document.getElementById('user_energy').innerHTML);
			JobsToDo = parseInt(Math.floor(CurrentNRG/energy));
			$('#GX_JIQ').text(JobsToDo);
			$('#quick_jobber_status').text(' ...Running...')
			JobsRgo = setInterval(function(){
				if (parseInt($('#GX_JA').text()) == JobsToDo) {
					clearInterval(JobsRgo);
					EndGame();
					isRunning = false;
					return;
				}
				updateStats('JA');
				request(linkp2, function(response){
					if (/index_controller/.test(response)) {
						$('#quick_jobber_status').text('Session timed out, Manual Reload of Page Required...');
					}else if (/It looks like you changed cities in another browser window/.test(response)) {
						$('#quick_jobber_status').text('Travelling detected! Manual Travel Required...');
					}else if (/There was an issue processing your request/.test(response)) {
						$('#quick_jobber_status').text('There was an issue processing your request, Manual Reload of Page Required...');
					}else {
						if (typeof response == 'object') {
							var object = response;
						}else {
							var object = jQuery.parseJSON(response.replace(/^(\s\d\s+)/,''));
						}
						try {
							user_fields_update(object.user_fields);
							user_info_update(object.user_fields, object.user_info);
						}catch (err) {}
						try{
						if (Util.isset(object.questData)) {
							MW.QuestBar.update(object.questData);
						}
						}catch (err) {
							updateStats('JF');
							return;
						}
						//stats_update(object.user_fields);

						//job successfully done
						if (Util.isset(object.jobResult)) {
							jobResult = object.jobResult;
							updateStats('JC');
							if (jobResult.extraData.bonusCash > 0) {
								totalbag++;
							}
							if (jobResult.extraData.bonusExperience > 0) {
								totalmaster++;
							}
							if (jobResult.energy == 0) {
								totalwheel++;
							}
							if (totalmaster > 0 || totalwheel > 0 || totalbag > 0) {
								$('#topmafia_stats').show();
								var jobsdonecurrent = parseInt($('#GX_JA').text());
								var masterratio = ' <span class="more_in">('+parseFloat(totalmaster/jobsdonecurrent*100).toFixed(0)+'%)</span>&nbsp;';
								var wheelratio = ' <span class="more_in">('+parseFloat(totalwheel/jobsdonecurrent*100).toFixed(0)+'%)</span>&nbsp;';
								var bagratio = ' <span class="more_in">('+parseFloat(totalbag/jobsdonecurrent*100).toFixed(0)+'%)</span>&nbsp;';
								document.getElementById('topmafia_stats').innerHTML = '<br>'+(totalmaster>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_experience_16x16_01.gif">x'+totalmaster+masterratio:'')+(totalwheel>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon-energy.gif">x'+totalwheel+wheelratio:'')+(totalbag>0?'<img src="https://zynga1-a.akamaihd.net/mwfb/mwfb/graphics/icon_cash_16x16_01.gif">x'+totalbag+bagratio:'');
							}
						}else if (Util.isset(object.data)) {//job not done, need to buy stuff	
							if (Util.isset(object.data.impulseBuy)) {
								if (object.data.impulseBuy.success == 1) {
									logit($(object.data.impulseBuy.message).text());
								}else {
									updateStats('JF');
									clearInterval(JobsRgo);
									EndGame();
									isRunning = false;
									if (/You need the following items for this job/.test(object.data.impulseBuy.message)) {
										$('#quick_jobber_status').text('Items needed for job, Stopping...');
									}else if (/You do not have enough cash to do this job/.test(object.data.impulseBuy.message)) {
										$('#quick_jobber_status').text('You do not have enough cash to do this job, Stopping...')
									}else if (/These loot drops/.test(object.data.impulseBuy.message)) {
										$('#quick_jobber_status').text('Need consumables, Stopping...')
									}
								}
							}
						}
					}
				},
				function(response){
					updateStats('JF');
				});

			},350);
		})
	}
	bringupjobinfo();
	
	function EndGame(){
		if((parseInt($('#GX_JC').text())+parseInt($('#GX_JF').text())) != JobsToDo){
			$('#quick_jobber_status').text(' Still waiting on reqs to come back...')
			setTimeout(function() {
				EndGame();
			}, 500);
		}else{
			$('#quick_jobber_status').text(' Stopped...')
		}
	}
	
	function parseStuff( str ) { // By Esa
		var re = /^(.*?)(?=x(\d+)\s*\(([0-9.]+)\)).*?(?=Gaining: (\d+)exp).*?(?=Left: (\d+)).*?(?=Cash: (-?[0-9.]+))/
		var matches = str.match( re );
		if( matches && matches.length == 7 ) {
			return {
				name: matches[1].trim(),
				times: parseInt( matches[2], 10 ),
				ratio: parseFloat( matches[3] ),
				gaining: parseInt( matches[4], 10 ),
				left: parseInt( matches[5], 10 ),
				cash: parseFloat( matches[6] )
			}
		}
		return null;
	}
	
	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if(url.indexOf('html_server.php') >= 0){
			url = url.substr(url.indexOf('?')+1);
		}
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var preurl = '//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	} 
	
	function logit(msg) {
		setTimeout(function() {
			throw new Error(msg);
		}, 0);
	}
	
	$("body").ajaxComplete(function (e, xhr, settings) {
		var CJSO = /mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)[1];
		if(CJSO == 10){
			bringupjobinfo();
		}
    });