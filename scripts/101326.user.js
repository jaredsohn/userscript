// ==UserScript==
// @name           Tatoeba Show User Profile Inline
// @copyright      Jakob V. <jakov@gmx.at>
// @license        Creative Commons Attribution 3.0 Unported (CC BY 3.0) http://creativecommons.org/licenses/by/3.0/
// @namespace      http://userscripts.org/scripts/show/101326
// @description    Shows the users profile inline, just below the username using AJAX.
// @include        http://tatoeba.org/*
// @match          http://tatoeba.org/*
// @exlude         http://tatoeba.org/*/wall/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @require        https://jquery-json.googlecode.com/files/jquery.json-2.2.js
// ==/UserScript==

$(document).ready(main);

function main(){

	//This may save you a lot of time, especially with the really big users of more than 10000 sentences (resulting in more than 100 requests)
	default_cache = {"jakov":{"sum":{"all":1932,"epo":541,"deu":958,"fra":58,"eng":373,"lat":2},"1":{"epo":22,"eng":22,"deu":51,"fra":5}}, "sysko":{"sum":{"all":5811,"fra":3160,"cmn":1578,"eng":135,"deu":9,"ces":1,"epo":2,"jpn":3,"tur":1,"wuu":898,"est":1,"zsm":6,"nob":1,"swh":1,"hun":1,"sqi":1,"nld":7,"bre":1,"yue":1,"vie":1,"lat":2,"pes":1}}, "zipangu":{"sum":{"all":27666,"pol":27517,"rus":2,"jpn":46,"eng":60,"ita":3,"fra":1,"lat":33,"yid":1,"spa":1,"afr":1,"eus":1}}, "GrizaLeono":{"sum":{"all":16211,"epo":15864,"nld":327,"vie":1,"fra":15,"eng":2,"spa":1,"rus":1}}, "muzikanta_hipopotamo":{"sum":{"all":533,"epo":515,"deu":18}}, "Leynaf":{"sum":{"all":290,"spa":95,"eus":193,"eng":2}}, "behi":{"sum":{"all":539,"pes":279,"epo":260}}, "JimBreen":{"sum":{"all":12,"eng":7,"jpn":5}}, "simonbr":{"sum":{"all":978,"nld":976,"afr":1,"ces":1}}, "arihato":{"sum":{"all":851,"jpn":551,"jbo":273,"eng":9,"epo":9,"eus":9}}, "Tonari":{"sum":{"all":855,"rus":855}}, "phiz":{"sum":{"all":714,"nld":608,"fra":34,"deu":26,"jpn":15,"eng":24,"ita":2,"swe":2,"fin":3}}, "Romira":{"sum":{"all":843,"fra":843}}, "ondo":{"sum":{"all":1466,"epo":1090,"fin":365,"eng":8,"deu":1,"swe":2}}, "McDutchie":{"sum":{"all":1740,"ina":1679,"nld":51,"eng":8,"ita":1,"glg":1}}, "duran":{"sum":{"all":1887,"tur":1779,"eng":105,"zsm":2,"ind":1}}, "ChickenKiev":{"sum":{"all":1920,"ukr":1901,"eng":7,"rus":12}}, "Maksimo":{"sum":{"all":1706,"rus":622,"epo":1084}}, "rado":{"sum":{"all":2121,"epo":628,"lat":391,"ita":1100,"eng":1,"fra":1}}, "papabear":{"sum":{"all":2913,"eng":2912,"lat":1}}, "riccioberto":{"sum":{"all":2389,"ita":1923,"eng":40,"epo":337,"jpn":48,"por":5,"lat":3,"ell":1,"ces":2,"fra":3,"spa":16,"rus":5,"swh":3,"cmn":1,"ron":1,"deu":1}}, "mahdiye":{"sum":{"all":655,"pes":631,"eng":24}}, "landano":{"sum":{"all":682,"deu":256,"epo":420,"eng":5,"fra":1}}, "ludoviko":{"sum":{"all":758,"epo":621,"eng":23,"deu":102,"ita":1,"spa":1,"fra":10}}, "lukaszpp":{"sum":{"all":5134,"eng":2412,"spa":2471,"pol":251}}, "qahwa":{"sum":{"all":398,"jpn":220,"ara":178}}, "Heracleum":{"sum":{"all":607,"ita":605,"eng":2}}, "kobylkin":{"sum":{"all":594,"rus":591,"bul":3}}, "Alta":{"sum":{"all":547,"vie":500,"epo":46,"fra":1}}, "V_Zmoova":{"sum":{"all":522,"rus":501,"ces":14,"srp":2,"ita":2,"eng":2,"fra":1}}, "sencay":{"sum":{"all":499,"epo":493,"tur":1,"deu":3,"eng":1,"fra":1}}, "hundo":{"sum":{"all":458,"spa":458}}, "arashi_29":{"sum":{"all":424,"spa":424}}, "Bruno":{"sum":{"all":418,"fra":411,"epo":7}}, "helmfer":{"sum":{"all":451,"por":428,"eng":13,"spa":1,"deu":5,"nld":1,"glg":3}}, "Chris":{"sum":{"all":398,"deu":397,"eng":1}}, "anonym":{"sum":{"all":408,"por":358,"epo":50}}, "LugoIlmer":{"sum":{"all":396,"spa":384,"jpn":10,"eng":2}}, "gracefully":{"sum":{"all":461,"tgl":435,"jpn":14,"eng":12}}, "lenon_perez":{"sum":{"all":431,"por":420,"deu":8,"ita":1,"fra":1,"eng":1}}, "shoras":{"sum":{"all":379,"ita":379}}, "japegon":{"sum":{"all":360,"spa":354,"glg":1,"eng":2,"fra":2,"por":1}}, "Silja":{"sum":{"all":371,"fin":368,"eng":2,"jpn":1}}, "yessoos":{"sum":{"all":342,"eng":89,"pol":253}}, "pierrephi":{"sum":{"all":354,"fra":308,"jpn":25,"eng":19,"spa":2}}, "Wadimiy":{"sum":{"all":343,"rus":325,"deu":5,"epo":10,"lat":1,"bul":2}}, "rosa":{"sum":{"all":364,"glg":364}}, "Trank":{"sum":{"all":332,"jpn":57,"bul":272,"eng":3}}, "gall":{"sum":{"all":317,"fra":309,"eng":8}}, "gurobu":{"sum":{"all":353,"nob":353}}, "ivanov":{"sum":{"all":308,"rus":127,"oss":126,"epo":54,"bul":1}}, "gracehero":{"sum":{"all":287,"mon":236,"jpn":9,"eng":42}}, "Sprachprofi":{"sum":{"all":302,"deu":103,"epo":107,"ell":30,"eng":15,"fra":27,"cmn":9,"ita":9,"spa":1,"swh":1}}, "tijlan":{"sum":{"all":232,"jbo":232}}, "aliene":{"sum":{"all":270,"cmn":128,"jpn":47,"eng":95}}, "marco87":{"sum":{"all":265,"eng":61,"ita":179,"swe":25}}, "trotter":{"sum":{"all":255,"fra":251,"eng":2,"jpn":2}}, "koosy":{"sum":{"all":318,"ron":316,"eng":2}}, "opti":{"sum":{"all":141,"deu":76,"epo":65}}, "Quazel":{"sum":{"all":220,"fra":210,"eng":2,"jpn":8}}, "oksigeno":{"sum":{"all":228,"epo":228}}, "witbrock":{"sum":{"all":252,"eng":237,"fra":3,"lat":1,"cycl":11}}, "jorgearestrepo":{"sum":{"all":275,"spa":273,"eng":1,"por":1}}, "iceman":{"sum":{"all":248,"ukr":245,"rus":3}}, "zvaigzne":{"sum":{"all":191,"eng":45,"rus":4,"lvs":62,"por":72,"deu":7,"swh":1}}, "Warnerbroder":{"sum":{"all":179,"spa":178,"eng":1}}, "corani":{"sum":{"all":236,"nld":236}}, "DeSha":{"sum":{"all":182,"jpn":62,"ukr":17,"eng":20,"rus":22,"ita":13,"hun":18,"oss":12,"epo":12,"deu":2,"cmn":2,"srp":1,"vie":1}}, "jmli":{"sum":{"all":159,"eus":150,"spa":9}}, "Quonpi":{"sum":{"all":156,"fra":127,"spa":6,"bre":11,"eng":3,"pol":1,"fin":1,"kor":1,"rus":1,"ita":1,"jpn":1,"epo":1,"deu":1,"ces":1}}, "Kokoo":{"sum":{"all":207,"eng":2,"spa":203,"cat":2}}, "umarsaid":{"sum":{"all":216,"ind":216}}, "gregloby":{"sum":{"all":197,"pol":197}}, "Miyako":{"sum":{"all":200,"deu":200}}, "admor82":{"sum":{"all":196,"bel":1,"ukr":7,"pes":8,"pol":9,"ara":9,"bul":2,"heb":128,"eng":10,"rus":18,"slk":3,"deu":1}}, "peipei":{"sum":{"all":180,"cmn":165,"fra":11,"eng":4}}, "SeeVogel":{"sum":{"all":118,"deu":104,"jpn":9,"kor":2,"eng":3}}, "gasche":{"sum":{"all":205,"fra":202,"eng":3}}, "Mouseneb":{"sum":{"all":180,"eng":171,"cmn":9}}, "calmanani":{"sum":{"all":162,"pol":151,"eng":7,"epo":3,"nob":1}}, "kertoip":{"sum":{"all":195,"pol":195}}, "rtroisgr":{"sum":{"all":163,"fra":114,"por":1,"epo":48}}, "Valodnieks":{"sum":{"all":176,"ido":119,"eng":2,"deu":11,"ile":44}}, "Ronaldonl":{"sum":{"all":166,"epo":65,"nld":74,"eng":25,"deu":1,"fra":1}}, "subbeena":{"sum":{"all":175,"hun":161,"slk":12,"eng":2}}, "nadya":{"sum":{"all":162,"rus":159,"bul":2,"ukr":1}}, "OlgaElwen":{"sum":{"all":156,"rus":156}}, "quarzoliquido":{"sum":{"all":157,"spa":157}}, "Grayster":{"sum":{"all":158,"jpn":77,"eng":81}}, "ynnck":{"sum":{"all":186,"cat":186}}, "aye1995":{"sum":{"all":140,"spa":54,"eus":68,"cmn":15,"eng":3}}, "kriskelvin":{"sum":{"all":160,"deu":160}}, "Vortarulo":{"sum":{"all":2589,"epo":140,"deu":195,"eng":41,"tlh":2099,"cmn":36,"toki":6,"tha":13,"afr":1,"fra":10,"non":1,"vol":1,"vie":1,"urd":1,"ukr":1,"tur":1,"tgl":1,"swe":1,"swh":1,"spa":1,"slv":1,"slk":1,"srp":1,"ron":1,"pol":1,"nob":1,"unknown":1,"lit":1,"lvs":1,"kor":1,"jpn":1,"gle":1,"ina":1,"isl":1,"hun":1,"heb":1,"ell":1,"kat":1,"glg":1,"fin":1,"est":1,"nld":1,"dan":1,"ces":1,"cat":1,"bul":1,"bos":1,"eus":1,"hye":1,"sqi":1,"rus":1,"lat":2,"ara":1,"lzh":1,"por":1,"jbo":1,"hrv":1}}, "Esperantodan":{"sum":{"all":3069,"pes":3006,"epo":59,"urd":2,"eng":1,"ara":1}}, "Alois":{"sum":{"all":2923,"epo":2862,"deu":41,"eng":6,"fra":2,"swh":11,"ces":1}}, "shanghainese":{"sum":{"all":3161,"rus":2416,"lzh":263,"ukr":224,"cmn":69,"eng":177,"heb":4,"deu":6,"san":1,"jpn":1}}, "szaby78":{"sum":{"all":3950,"hun":3803,"eng":84,"jpn":61,"por":1,"nld":1}}, "minshirui":{"sum":{"all":3726,"hin":3463,"cmn":52,"yue":16,"eng":191,"spa":2,"jpn":1,"urd":1}}, "Hans07":{"sum":{"all":3861,"epo":3441,"deu":247,"lat":30,"nds":107,"afr":2,"jpn":4,"eng":7,"spa":1,"ita":2,"cat":1,"por":1,"nld":1,"dan":2,"pol":1,"est":1,"ces":1,"srp":1,"cmn":1,"vie":1,"kor":1,"unknown":2,"tur":1,"lvs":1,"fin":1,"fra":1,"nob":1,"ron":1}}, "Dorenda":{"sum":{"all":4670,"nld":3828,"rus":106,"fra":5,"eng":314,"pol":88,"ukr":38,"deu":24,"nob":1,"bel":2,"fry":94,"afr":4,"ron":162,"hun":2,"epo":1,"jpn":1}}, "danepo":{"sum":{"all":4865,"dan":4659,"epo":180,"swe":1,"eng":21,"deu":3,"unknown":1}}, "Muelisto":{"sum":{"all":5226,"hun":3938,"epo":1258,"nld":1,"eng":27,"lat":2}}, "brauliobezerra":{"sum":{"all":6598,"por":6475,"eng":116,"spa":3,"fra":4}}, "TRANG":{"sum":{"all":2252,"fra":2070,"deu":61,"eng":80,"jpn":3,"spa":22,"ita":1,"rus":1,"vie":2,"nld":1,"kor":1,"hye":10}}, "saeb":{"sum":{"all":6844,"ara":5886,"eng":561,"jpn":37,"fra":2,"arz":356,"unknown":1,"pes":1}}, "xtofu80":{"sum":{"all":7361,"deu":6903,"jpn":331,"eng":125,"cmn":1,"lat":1}}, "blay_paul":{"sum":{"all":2283,"eng":1610,"jpn":664,"fra":5,"ita":1,"epo":1,"deu":2}}, "Swift":{"sum":{"all":10463,"isl":8498,"deu":24,"eng":1908,"jpn":21,"fra":1,"swe":3,"dan":7,"lat":1}}, "CK":{"sum":{"all":58020,"eng":58019,"jpn":1}}, "sacredceltic":{"sum":{"all":25367,"fra":24527,"eng":636,"epo":72,"nld":32,"deu":93,"scn":3,"unknown":2,"spa":1,"ita":1},"1":{"fra":96,"eng":4}}, "scornfulpen":{"sum":{"all":3,"eng":1,"jpn":2}},};
	default_cache = $.toJSON(default_cache);
	
	//BEGIN USER STATS
	cache = GM_getValue('cache');
	cache = cache || default_cache;
	cache = $.evalJSON(cache);
	GM_log('cache: '+$.toJSON(cache));
	
	auto_load = GM_getValue('auto_load');
	auto_load = auto_load || false;
	
	onlyoneatatime = GM_getValue('onlyoneatatime');
	onlyoneatatime = onlyoneatatime || true;

	//Thanks to http://davidwalsh.name/detecting-google-chrome-javascript
	is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if(is_chrome){
		//chrome debug
		$('.sentences_set .menu li.translateLink a').click(function(){$('.sentences_set .menu li.translateLink a').parent().parent().siblings('div').show();});
	}

	//GM_log('main()');
	all_profile_css = {
		'overflow': 'scroll',
		'overflow-x': 'hide',
		'height': '150px',
		'background': 'url("../../img/module_background.png") repeat-x scroll left bottom transparent',
		'margin': '0 0 0 0',
		'padding': '10px 10px 5px',
		'border': '1px solid #CCCCCC',
		'border-radius': '10px 10px 0 0',
		'margin-bottom': '0',
		'border-radius': '0 0 10px 10px',
		'background-image': '-webkit-gradient( linear, left top, left bottom, color-stop(0, rgb(245,245,245)), color-stop(0.7, rgb(255,255,255)) )',
		'background-image': '-moz-linear-gradient( center top, rgb(245,245,245) 0%, rgb(255,255,255) 70% )'
	};
	
	comments_css = {
		
	};
	
	logs_css = {
		
	};
	
	sentences_set_css = {
		
	};
	
	all_summary_css = {
		'background': 'url("../../img/module_background.png") repeat-x scroll left bottom transparent',
		'margin': '0 0 20px',
		'padding': '10px 10px 5px',
		'margin-top': '-10px',
		'margin-right': '-10px',
		'margin-bottom': '5px',
		'margin-left': '10px',
		'float': 'right',
		'width': '40%',
		'border': '1px solid #CCCCCC',
		'border-top': '0',
		'border-right': '0',
		'border-radius': '0 10px 0 10px',
		'background-image': '-webkit-gradient( linear, left bottom, left top, color-stop(0, rgb(245,245,245)), color-stop(0.7, rgb(255,255,255)) )',
		'background-image': '-moz-linear-gradient( center bottom, rgb(245,245,245) 0%, rgb(255,255,255) 70% )'
	};
	
	comments_summary_css = {
		
	};
	
	logs_summary_css = {
		'border': '2px dashed #FFFFFF',
	};
	
	sentences_set_summary_css = {
		
	};
	
	$('ol.wall li.topThread, ol.wall li.thread').each(function(index){
		var author = $(this).find('.author:nth(0) a');
		var id = author.attr('href').split('/')[4];
		$(this).find('.meta:nth(0)').after('<div class="comments_'+id+'_'+index+' showuserprofile body"></div>');
		$('.comments_'+id+'_'+index).hide();
		author.click(function(event){
			if (!event.ctrlKey){
				event.preventDefault();
				//only fill if empty
				if( $('.comments_'+id+'_'+index).is(':empty') ){
					var href = $(this).attr('href');
					//jQuery.get( url, [ data ], [ success(data, textStatus, jqXHR) ], [ dataType ] ) 
					$.get(
						//url 
						href,
						//[ data ] 
						function(data) {
							var summary = $(data).find('div.profileSummary');
							summary.find('img[alt="'+id+'"]').remove();
							summary.removeAttr("id");
							var name = summary.find('div.info div:nth-child(2) span.value').text().replace(/^\s*/, "").replace(/\s*$/, "");
							if( !( name == id || name == '-' ) ){
								author.find('.other_name').remove();
								author.append(' <span class="other_name">('+name+')</span>');
							}
							summary.find('div.username').remove();
							summary.find('div.info div:first-child span.value').wrapInner("<a href='"+href+"'></a>");
							summary.removeClass('module');
							summary.css(all_summary_css).css(sentences_set_summary_css);
							
							summary.find('.field').css({'color': 'grey', 'font-weight': 'bold'});
							summary.find('.status1').css({'color': 'red'});
							summary.find('.status2').css({'color': 'orange'});
							summary.find('.status3').css({'color': '#00B712'});
							summary.find('.status4').css({'color': '#42B0FF'});
							summary.find('.status').css({'font-style': 'italic', 'float': 'right'});
							
							var description = $(data).find('div.profileDescription div.content').html();
							
							
							//put the whole thing into the div
							$('.comments_'+id+'_'+index).html(summary).append(description).addClass('comments_profile').removeClass('module').css(all_profile_css);
							$('.comments_'+id+'_'+index).html(summary).append(description).removeClass('module').css(all_profile_css);
						}
					);
				}
				
				if(onlyoneatatime){
					$('.showuserprofile.notempty:not(.comments_'+id+'_'+index+')').slideUp("slow");
					$('.comments_'+id+'_'+index).addClass('notempty');
				}

				$('.comments_'+id+'_'+index).slideToggle("slow");
			}
		});
	});
	
	$('ol.comments li').each(function(index){
		var author = $(this).find('.author a');
		var id = author.attr('href').split('/')[4];
		$(this).find('.meta').after('<div class="comments_'+id+'_'+index+' showuserprofile"></div>');
		$('.comments_'+id+'_'+index).hide();
		author.click(function(event){
			if (!event.ctrlKey){
				event.preventDefault();
				//only fill if empty
				if( $('.comments_'+id+'_'+index).is(':empty') ){
					href = $(this).attr('href');
					//jQuery.get( url, [ data ], [ success(data, textStatus, jqXHR) ], [ dataType ] ) 
					$.get(
						//url 
						href,
						//[ data ] 
						function(data) {
							var summary = $(data).find('div.profileSummary');
							summary.find('img[alt="'+id+'"]').remove();
							summary.removeAttr("id");
							var name = summary.find('div.info div:nth-child(2) span.value').text().replace(/^\s*/, "").replace(/\s*$/, "");
							if( !( name == id || name == '-' ) ){
								author.find('.other_name').remove();
								author.append(' <span class="other_name">('+name+')</span>');
							}
							summary.find('div.username').remove();
							summary.find('div.info div:first-child span.value').wrapInner("<a href='"+href+"'></a>");
							summary.removeClass('module');
							summary.css(all_summary_css).css(sentences_set_summary_css);
							
							summary.find('.field').css({'color': 'grey', 'font-weight': 'bold'});
							summary.find('.status1').css({'color': 'red'});
							summary.find('.status2').css({'color': 'orange'});
							summary.find('.status3').css({'color': '#00B712'});
							summary.find('.status4').css({'color': '#42B0FF'});
							summary.find('.status').css({'font-style': 'italic', 'float': 'right'});
							
							var description = $(data).find('div.profileDescription div.content').html();
							
							
							//put the whole thing into the div
							$('.comments_'+id+'_'+index).html(summary).append(description).addClass('comments_profile').removeClass('module').css(all_profile_css);
							$('.comments_'+id+'_'+index).html(summary).append(description).removeClass('module').css(all_profile_css);
						}
					);
				}
				
				if(onlyoneatatime){
					$('.showuserprofile.notempty:not(.comments_'+id+'_'+index+')').slideUp("slow");
					$('.comments_'+id+'_'+index).addClass('notempty');
				}

				$('.comments_'+id+'_'+index).slideToggle("slow");
			}
		});
	});
		
	$('#logs tr').each(function(index){
		var background = $(this).css("background-color");
		var author = $(this).find('.username a');
		var id = author.attr('href').split('/')[4];
		$(this).after('<tr class="logs_'+id+'_'+index+' showuserprofile"><td colspan="4"></td></tr>');
		$('.logs_'+id+'_'+index).hide();
		author.click(function(event){
			if (!event.ctrlKey){
				event.preventDefault();
				//only fill if empty
				if( $('.logs_'+id+'_'+index+' td').is(':empty') ){
					//jQuery.get( url, [ data ], [ success(data, textStatus, jqXHR) ], [ dataType ] ) 
					$.get(
						//url 
						'http://tatoeba.org/'+author.attr('href').split('/')[1]+'/user/profile/'+id,
						//[ data ] 
						function(data) {
							var summary = $(data).find('div.profileSummary');
							summary.find('img[alt="'+id+'"]').remove();
							summary.removeAttr("id");
							var name = summary.find('div.info div:nth-child(2) span.value').text().replace(/^\s*/, "").replace(/\s*$/, "");
							if( !( name == id || name == '-' ) ){
								author.find('.other_name').remove();
								author.append(' <span class="other_name">('+name+')</span>');
							}
							summary.find('div.username').remove();
							summary.find('div.info div:first-child span.value').wrapInner("<a href='"+href+"'></a>");
							summary.removeClass('module');
							summary.css(all_summary_css).css(logs_summary_css);
							summary.css({
								'background-image': '-webkit-gradient( linear, left bottom, left top, color-stop(0, '+background+'), color-stop(0.7, rgb(255,255,255)) )',
								'background-image': '-moz-linear-gradient( center bottom, '+background+' 0%, rgb(255,255,255) 70% )' 
							});
							
							summary.find('.field').css({'color': 'grey', 'font-weight': 'bold'});
							summary.find('.status1').css({'color': 'red'});
							summary.find('.status2').css({'color': 'orange'});
							summary.find('.status3').css({'color': '#00B712'});
							summary.find('.status4').css({'color': '#42B0FF'});
							summary.find('.status').css({'font-style': 'italic', 'float': 'right'});
							
							var description = $(data).find('div.profileDescription div.content').html();
							
							//put the whole thing into the div
							//$('.logs_'+id+'_'+index+' td').html(summary).append(description).addClass('logs_profile').removeClass('module').css(all_profile_css).css({
							$('.logs_'+id+'_'+index+' td').html(summary).append(description).removeClass('module').css(all_profile_css).css({
								'background-image': '-webkit-gradient( linear, left top, left bottom, color-stop(0, '+background+'), color-stop(0.7, rgb(255,255,255)) )',
								'background-image': '-moz-linear-gradient( center top, '+background+' 0%, rgb(255,255,255) 70% )',
								'border-radius': '0',
								'border-top': '2px dashed #FFFFFF',
								'border-bottom': '2px dashed #FFFFFF',

							});
						}
					);
				}
				
				if(onlyoneatatime){
					$('.showuserprofile.notempty:not(.comments_'+id+'_'+index+')').slideUp("slow");
					$('.logs_'+id+'_'+index).addClass('notempty');
				}

				$('.logs_'+id+'_'+index).slideToggle("slow");
			}
		});
	});
	
	$('.sentences_set').each(function(index){
		var author = $(this).find('.belongsTo a');
		var id = author.attr('href').split('/')[4];
		//containter = $('<div class="sentences_set_'+id+'_'+index+' showuserprofile"></div>');
		containter = $('<div></div>');
		$(this).find('.menu').after(containter);
		//$('.sentences_set_'+id+'_'+index).hide();
		containter.hide();
		author.click(function(event){
			if (!event.ctrlKey){
				event.preventDefault();
				//only fill if empty
				//if( $('.sentences_set_'+id+'_'+index).is(':empty') ){
				if( containter.is(':empty') ){
					//jQuery.get( url, [ data ], [ success(data, textStatus, jqXHR) ], [ dataType ] ) 
					$.get(
						//url 
						$(this).attr('href'),
						//[ data ] 
						function(data) {
							var summary = $(data).find('div.profileSummary');
							summary.find('img[alt="'+id+'"]').remove();
							summary.removeAttr("id");
							var name = summary.find('div.info div:nth-child(2) span.value').text().replace(/^\s*/, "").replace(/\s*$/, "");
							if( !( name == id || name == '-' ) ){
								author.find('.other_name').remove();
								author.append(' <span class="other_name">('+name+')</span>');
							}
							summary.find('div.username').remove();
							summary.find('div.info div:first-child span.value').wrapInner("<a href='"+href+"'></a>");
							summary.removeClass('module');
							summary.css(all_summary_css).css(sentences_set_summary_css);
							
							summary.find('.field').css({'color': 'grey', 'font-weight': 'bold'});
							summary.find('.status1').css({'color': 'red'});
							summary.find('.status2').css({'color': 'orange'});
							summary.find('.status3').css({'color': '#00B712'});
							summary.find('.status4').css({'color': '#42B0FF'});
							summary.find('.status').css({'font-style': 'italic', 'float': 'right'});
							
							var description = $(data).find('div.profileDescription div.content').html();
							
							
							//put the whole thing into the div
							//$('.sentences_set_'+id+'_'+index).html(summary).append(description).addClass('sentences_set_profile').removeClass('module').css(all_profile_css).css({
							containter.html(summary).append(description).removeClass('module').css(all_profile_css).css({
								'margin-top': '-2px',
								'border-top': '0'
							});
						}
					);
				}
				
				if(onlyoneatatime){
					$('.showuserprofile.notempty:not(.comments_'+id+'_'+index+')').slideUp("slow");
					$('.sentences_set_'+id+'_'+index).addClass('notempty');
				}

				//$('.sentences_set_'+id+'_'+index).slideToggle("slow");
				containter.slideToggle("slow");
			}
		});
	});
	
	// on user profile page
	if(window.location.href.split('/')[4] == 'user' && window.location.href.split('/')[5] == 'profile' ){
		facelang = window.location.href.split('/')[3];
		GM_log('facelang: '+facelang);
		
		//lang = document.URL.substr('http://tatoeba.org/'.length).split('/')[0];
		//username = document.URL.substr('http://tatoeba.org/xxx/user/profile/'.length);
		username = window.location.href.split('/')[6];
		GM_log('cache['+username+']: '+$.toJSON(cache[username]));
		
		setup = false;
		//in your own profile
		if(window.location.href.split('/')[6] == $('.menuSection').attr('href').split('/')[4]){
			setup = true;
			
			if($('.userscriptSettings').is('*')){
				settings = $('.userscriptSettings');
			}
			else{
				settings = $('<div class="module profileSummary userscriptSettings"><h2>userscripts</h2></div>');
				$('.profileSummary').after(settings);
			}
			
			settings.append('<h3>Show User Profile Inline</h3>');
			contentdiv = $('<div id="userprofileinline"></div>');
			settings.append(contentdiv);
			
			contentdiv.append('<table>');
			contentdiv.append('<tr><td><label for="cache" class="field">reset cache</label></td><td><input type="button" id="cache" value="reset cache" '+( cache==default_cache ? 'diabled="disabled"' : '' )+'"></td></tr>');
			contentdiv.append('<tr><td><label for="auto_load" class="field">auto_load</label></td><td><input type="checkbox" id="auto_load"></td></tr>');
			contentdiv.append('<tr><td><label for="onlyoneatatime" class="field">onlyoneatatime</label></td><td><input type="checkbox" id="onlyoneatatime"></td></tr>');
			contentdiv.append('</table>');
			
			$('#auto_load')[0].checked = auto_load;
			$('#onlyoneatatime')[0].checked = onlyoneatatime;
			
			$('#cache').click(function(){
				if(confirm("Really reset? \n\nAfter this some users language stats might take longer. (But deleted sentences will be counted too. Note that this only resets to a default chache, that i have done once.)")){
					cache = $.evalJSON(default_cache);
					GM_setValue('cache',$.toJSON(cache));
					GM_log('cache: '+$.toJSON(cache));
				}
			});
			
			$('#auto_load').change(function(){
				auto_load = this.checked;
				GM_setValue('auto_load',auto_load);
				GM_log('auto_load: '+auto_load);
			});
			
			$('#onlyoneatatime').change(function(){
				onlyoneatatime = this.checked;
				GM_setValue('onlyoneatatime',onlyoneatatime);
				GM_log('onlyoneatatime: '+onlyoneatatime);
			});
		}
		
		text = {'epo':'Frazoj laŭ lingvo', 'eng':'Sentences by language', 'deu':'Sätze nach Sprache', 'fre':'Phrases par langue'};
		load_text = {'epo':'eku', 'eng':'load', 'deu':'laden', 'fre':'afficher'};
		total_text = {'epo':'total', 'eng':'total', 'deu':'Gesamt', 'fre':'total'};
		stop_text = {'epo':'haltu', 'eng':'stop', 'deu':'abbrechen', 'fre':'arrêter'};
		//GM_log(facelang);
		//GM_log(username);
		sentences_url = 'http://tatoeba.org/'+ facelang+ '/sentences/of_user/'+ username;
		
		text[facelang] = text[facelang] || text['eng'];
		load_text[facelang] = load_text[facelang] || load_text['eng'];
		total_text[facelang] = total_text[facelang] || total_text['eng'];
		stop_text[facelang] = stop_text[facelang] || stop_text['eng'];
		
		contributionname = $('<dt>'+ (typeof(text[facelang])=='string' ? text[facelang] : text['eng'])+ ' </dt>');
		loading = $('<span></span>');
		contributionname.append(loading);
		contributionstats = $('<dd id="SentencesByLanguage"></dd>').css({'width': '100%'});
		loadbutton = $('<a>'+ load_text[facelang]+ '</a>');
		stopbutton = $('<a>'+ stop_text[facelang]+ '</a>');

		$('div h2 + dl').append(contributionname).append(contributionstats);
		button = $('<dd class="editOption"></dd>').css({'float': 'none'});
		contributionstats.before(button);
		button.append(loadbutton);
		button.append(stopbutton);
		stopbutton.hide();
		
		total_number_of_sentences = $('div h2 + dl dd:nth(1)').text()*1;
		total_number_of_pages = Math.ceil(total_number_of_sentences/100);
		
		cache[username] = cache[username] || {};
		cache[username]['sum'] = cache[username]['sum'] || {};
		cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;
		
		load_sentences = total_number_of_sentences - cache[username]['sum']['all'];
		load_pages = Math.ceil(load_sentences/100);
		
		function parse(){
			var total = cache[username]['sum']['all'];
			var show = [];
			i=0;
			for(lang in cache[username]['sum']){
				if(lang!='all'){
					langnum = cache[username]['sum'][lang];
					show[i] = langnum/1000000+'_'+lang+'§§§<a href="'+ sentences_url+ '/'+ lang+ '" title="'+Math.round(langnum*10000/total)/100+'%"><img width="30" height="20" alt="'+ lang+ '" src="http://flags.tatoeba.org/img/flags/'+ lang+ '.png"><span class="total" style="margin-left:5px;">'+ langnum+ (langnum*100/total>=1 ? ' ('+ Math.round(langnum*100/total)+'%)' : '')+ '</span></a><br/>';
				}
				else{
					show[i] = '0.000001_aaa§§§<a href="'+ sentences_url+ '/" title="100%">'+total_text[facelang]+ ': '+ total+ '</a><br/>';
				}
				i++;
			}
			show.sort();
			show = show.reverse();
			show = $.map(show, function(value){
				//the '§§§' was added for sorting only
				return value.split('§§§')[1];
			}).join('');
			contributionstats.html(show);
			
			if(total_number_of_sentences!=total){
				$('div h2 + dl dd:nth(1)').css({'color':'red'});
			}
			else{
				$('div h2 + dl dd:nth(1)').css({'color':'green'});
			}
		}
		
		if(load_pages==0 && total_number_of_sentences!=0){
			parse();
		}
		
		loadbutton.click(function(){
			cache[username] = cache[username] || {};
			cache[username]['sum'] = cache[username]['sum'] || {};
			cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;
			
			load_sentences = total_number_of_sentences - cache[username]['sum']['all'];
			load_pages = Math.ceil(load_sentences/100);
			
			now = load_pages;
			still_loading = load_pages;
			
			if(load_pages>0){
				requests = [];
				for (i=load_pages;i>=1;i--){
					requests[i] = $.get(
						//url 
						sentences_url+'/page:'+i,
						//[ data ] 
						function(innerdata) {
							//GM_log('request successful');
							//GM_log(total_number_of_pages);
							//GM_log(i);
							add_user_contribution_langs(innerdata);
						}
					);
				}
				loadbutton.hide();
				stopbutton.show();
				stopbutton.click(function(){
					for (i=load_pages;i>=1;i--){
						requests[i].abort();
					}
					loadbutton.show();
					stopbutton.hide();
				});
			}
			else{
				parse();
			}
		});
		
		loadbutton.dblclick(function(){
			if(total_number_of_sentences < 500 || confirm("Really reload? \n\nThis can take long. \n\nThe User has "+total_number_of_sentences+" sentences.")){
				cache[username] = {};
				cache[username]['sum'] = {};
				cache[username]['sum']['all'] = 0;
				contributionstats.html('');
				loadbutton.click();
			}
		});
		
		function add_user_contribution_langs(obj){
			page = $(obj).find('.current')[0];
			page = (page ? $(page).text()*1 : 1); // for users with only one page of contributions
			//page = $(page).text()*1;
			cache[username] = cache[username] || {};
			cache[username][page] = cache[username][page] || {};
			
			arr = $(obj).find('.module .mainSentence img').map(function(){
				return $(this).attr('alt');
			}).get();
			$(arr).each(function(ind, lang){
				cache[username][page][lang] = cache[username][page][lang] || 0;
				cache[username][page][lang]++;
			});
			
			cache[username]['sum'] = cache[username]['sum'] || {};
			cache[username]['sum']['all'] = cache[username]['sum']['all'] || 0;

			if(total_number_of_sentences!=load_sentences && now==load_pages){
				GM_log('partial_load');
				partial_load = load_sentences%100;
				for (i=0;i<partial_load;i++){
					lang = arr[i];
					cache[username]['sum'][lang] = cache[username]['sum'][lang] || 0;
					cache[username]['sum'][lang]++;
					cache[username]['sum']['all']++;
				}
				now--;
			}
			else{
				GM_log(now);
				while(cache[username][now]){
					for(lang in cache[username][now]){
						cache[username]['sum'][lang] = cache[username]['sum'][lang] || 0;
						cache[username]['sum'][lang] += cache[username][now][lang];
						cache[username]['sum']['all'] += cache[username][now][lang];
					}
					delete cache[username][now];
					now--;
				}
			}
			GM_log(page +'=> cache['+username+']: '+$.toJSON(cache[username]));
			
			parse();
			
			still_loading--;
			loading.text('('+still_loading+')');
			if(still_loading==0){
				loading.hide();
				loadbutton.show();
				stopbutton.hide();
				GM_setValue('cache',$.toJSON(cache));
				GM_log('cache: '+$.toJSON(cache));
			}
		}
		
		if(auto_load){
			loadbutton.click();
		}

	}
}