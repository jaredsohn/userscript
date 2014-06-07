// ==UserScript==
// @name           Tatoeba Suggest Tags of Siblings
// @copyright      Jakob V. <jakov@gmx.at>
// @license        Creative Commons Attribution 3.0 Unported (CC BY 3.0) http://creativecommons.org/licenses/by/3.0/
// @description    
// @include        http://tatoeba.org/*/sentences/show/*
// @match          http://tatoeba.org/*/sentences/show/*
// @include        http://tatoeba.org/*/user/profile/*
// @match          http://tatoeba.org/*/user/profile/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$(document).ready(main);

function main(){
	facelang = window.location.href.split('/')[3];
	GM_log('facelang: '+facelang);
	
	thisid = window.location.href.split('/')[6];
	GM_log('thisid: '+thisid);
	
	//BEGIN SETTINGS

	direct_load = GM_getValue('direct_load');
	indirect_load = GM_getValue('indirect_load');
	show_doubles = GM_getValue('show_doubles');
	direct_load = ( direct_load==undefined ? true : direct_load );
	indirect_load = ( indirect_load==undefined ? false : indirect_load );
	show_doubles = ( show_doubles==undefined ? false : show_doubles );
	GM_log('direct_load: '+direct_load);
	GM_log('indirect_load: '+indirect_load);
	GM_log('show_doubles: '+show_doubles);

	setup = false;
	if(window.location.href.split('/')[4] == 'user' && window.location.href.split('/')[5] == 'profile' && window.location.href.split('/')[6] == $('.menuSection').attr('href').split('/')[4]){
		setup = true;
		
		if($('.userscriptSettings').is('*')){
			settings = $('.userscriptSettings');
		}
		else{
			settings = $('<div class="module profileSummary userscriptSettings"><h2>userscripts</h2></div>');
			$('.profileSummary').after(settings);
		}
		
		settings.append('<h3>Suggest Tags of Siblings</h3>');
		contentdiv = $('<div id="suggesttagsofsiblings"></div>');
		settings.append(contentdiv);
		
		contentdiv.append('<table>');
		contentdiv.append('<tr><td><label for="direct_load" class="field">direct_load</label></td><td><input type="checkbox" id="direct_load"></td></tr>');
		contentdiv.append('<tr><td><label for="indirect_load" class="field">indirect_load</label></td><td><input type="checkbox" id="indirect_load"></td></tr>');
		contentdiv.append('<tr><td><label for="show_doubles" class="field">show_doubles</label></td><td><input type="checkbox" id="show_doubles"></td></tr>');
		contentdiv.append('</table>');
		
		$('#direct_load')[0].checked = direct_load;
		$('#indirect_load')[0].checked = indirect_load;
		$('#show_doubles')[0].checked = show_doubles;
		
		
		$('#direct_load').change(function(){
			direct_load = this.checked;
			GM_setValue('direct_load',direct_load);
			GM_log('direct_load: '+direct_load);
		});
		
		$('#indirect_load').change(function(){
			indirect_load = this.checked;
			GM_setValue('indirect_load',indirect_load);
			GM_log('indirect_load: '+indirect_load);
		});
		
		$('#show_doubles').change(function(){
			show_doubles = this.checked;
			GM_setValue('show_doubles',show_doubles);
			GM_log('show_doubles: '+show_doubles);
		});
	}
	
	tags = {};
	arrayoftags = [];
	thistags = $('.tagsListOnSentence .tagName');
	thistags.each(function(index){
		arrayoftags[index] = $(this).text();
		tags[thisid] = tags[thisid] || [];
		tags[thisid][index] = $(this).text();
	});
	GM_log('tags['+thisid+']: '+tags[thisid]);
	
	thistags.hover(
		function(){
			tagname = $(this).text();
			GM_log(tagname);
			$(".sentence[tags*='"+tagname.replace(' ', '_')+"'], .mainSentence").css({'background-color':'#D3F3B9'});
		},
		function(){
			tagname = $(this).text();
			GM_log(tagname);
			$(".sentence[tags*='"+tagname.replace(' ', '_')+"'], .mainSentence").css({'background-color':'transparent'});
		}
	);
	
	thistags.each(function(){
		var targettag = $(this);
		var usernumber = targettag.attr('title').split(',')[0].split(':')[1].replace(/^\s*/, "").replace(/\s*$/, "");
		GM_log('http://tatoeba.org/'+facelang+'/users/show/'+usernumber);
		$.get(
			'http://tatoeba.org/'+facelang+'/users/show/'+usernumber,
			function(data) {
				var username = $(data).find('a').attr('href').substr('/deu/user/profile/'.length);
				GM_log(username);
				targettag.attr('title', targettag.attr('title').replace(usernumber, username));
			}
		);
	});
	
	$('.annexeLogEntry.linkAdded div:last-child a').hover(
		function(){
			sentenceid = $(this).text();
			$('.sentence[id^="translation_'+sentenceid +'"]').css({'background-color':'#D3F3B9'});
		},
		function(){
			sentenceid = $(this).text();
			$('.sentence[id^="translation_'+sentenceid +'"]').css({'background-color':'transparent'});
		}
	);
	
	direct_whohaswhichtag = {};
	indirect_whohaswhichtag = {};
	
	direct_div = $('<div class="directTagSuggestions"></div>');
	direct_div.css({'display': 'inline-block','width': '100%'});
	
	indirect_div = $('<div class="indirectTagSuggestions"></div>');
	indirect_div.css({'display': 'inline-block','width': '100%'});
	
	$('#TagAddTagPostForm').after(indirect_div);
	$('#TagAddTagPostForm').after(direct_div);
	
	direct_start = $('<a>Start loading additional tags of direct translations</a>');
	direct_start.css({'display':'block'});
	direct_start.click(function(){
		direct_buttons = $('.directTranslation a.show.button');
		GM_log(direct_buttons.length);
		if(direct_buttons.length>0){
			direct_suggestions = [];
			d = 0;
			direct_getcount = 0;
			direct_waiting = $('<img src="http://flags.tatoeba.org/img/loading-small.gif">');
			direct_start.html(direct_waiting);
			direct_buttons.each(function(index){
				getsentencetags($(this).attr('href').split('/')[4], 'direct');
			});
		}
		else{
			direct_start.text('Reload additional tags of direct translations');
		}
	});
	direct_div.append(direct_start);
	
	indirect_start = $('<a>Start loading additional tags of indirect translations</a>');
	indirect_start.css({'display':'block', 'clear':'both'});
	indirect_start.click(function(){
		indirect_buttons = $('.indirectTranslation a.show.button');
		GM_log(indirect_buttons.length);
		if(indirect_buttons.length>0){
			indirect_suggestions = [];
			i = 0;
			indirect_getcount = 0;
			indirect_waiting = $('<img src="http://flags.tatoeba.org/img/loading-small.gif">');
			indirect_start.html(indirect_waiting);
			indirect_buttons.each(function(index){
				getsentencetags($(this).attr('href').split('/')[4], 'indirect');
			});
		}
		else{
			indirect_start.text('Reload additional tags of indirect translations');
		}
	});
	indirect_div.append(indirect_start);
	
	if(direct_load){
		direct_start.click();
	}
	if(indirect_load){
		indirect_start.click();
	}
	
	function getsentencetags(sentenceid, getsentencetags_where){
		if(sentenceid){
			GM_log('getsentencetags_where: '+getsentencetags_where);
			getsentencetags_where = getsentencetags_where || 'direct';

			$.get(
				//url 
				'http://tatoeba.org/'+facelang+'/sentences/show/'+sentenceid,
				//[ data ] 
				function(data) {
					if(getsentencetags_where == 'direct'){
						direct_getcount++;
						GM_log(direct_getcount);
						if(direct_getcount>=direct_buttons.length){
							direct_start.text('Reload additional tags of direct translations');
						}
					}
					else if(getsentencetags_where == 'indirect'){
						indirect_getcount++;
						GM_log(indirect_getcount);
						if(indirect_getcount>=indirect_buttons.length){
							indirect_start.text('Reload additional tags of indirect translations');
						}
					}
					
					$(data).find('.tagName').each(function(){
						tagname = $(this).text();
						sentence = $('.sentence[id^="translation_'+sentenceid+'"]');
						previoustags = sentence.attr('tags') || '';
						sentence.attr('tags', previoustags + ' '+tagname.replace(' ', '_'));
						render(tagname, getsentencetags_where, sentenceid);
					});
				}
			);
		}
		else{
			if(getsentencetags_where == 'direct'){
				direct_getcount++;
			}
			else if(getsentencetags_where == 'indirect'){
				indirect_getcount++;
			}
		}
	}
	
	function render(tagname, render_where, sentenceid){
		render_where = render_where || 'direct';
		
		GM_log('tagname: '+tagname);
		GM_log('render_where: '+render_where);
		if(true){
			tags[sentenceid] = tags[sentenceid] || [];
			tags[sentenceid][tags[sentenceid].length] = tagname;
			GM_log('tags['+sentenceid+']: '+tags[sentenceid]);
			if(render_where == 'direct'){
				GM_log($.inArray(tagname, arrayoftags)==-1);
				GM_log(show_doubles);
				if( $.inArray(tagname, direct_suggestions)==-1 && ($.inArray(tagname, arrayoftags)==-1 || show_doubles) ){
					GM_log(tagname + ' not in direct_suggestions');
					direct_suggestions[d] = tagname;
					d++;
					taglink = $('<span class="tag"><a class="tagName" href="/'+facelang+'/tags/show_sentences_with_tag/'+tagname.replace(' ', '_')+'">'+tagname+'</a></span>');
					taglink.click(function(e){
						// Cancel the default action
						e.preventDefault();
						//put the tagname into the form field for submission by the user
						$('input#TagTagName').val(tagname);
					});
					taglink.hover(
						function(){
							tagname = $(this).text();
							GM_log(tagname);
							$(".sentence[tags*='"+tagname.replace(' ', '_')+"']").css({'background-color':'#D3F3B9'});
							if($.inArray(tagname, arrayoftags)>-1){
								$(".mainSentence").css({'background-color':'#D3F3B9'});
							}
						},
						function(){
							tagname = $(this).text();
							GM_log(tagname);
							$(".sentence[tags*='"+tagname.replace(' ', '_')+"'], .mainSentence").css({'background-color':'transparent'});
						}
					);
					taglink.css({'background-color':'#D3F3B9','color':'#257D0C'});
					direct_div.append(taglink);
				}
			}
			else if(render_where == 'indirect'){
				if( $.inArray(tagname, indirect_suggestions)==-1 && ($.inArray(tagname, arrayoftags)==-1 || show_doubles) ){
					GM_log(tagname + ' not in indirect_suggestions');
					indirect_suggestions[i] = tagname;
					i++;
					taglink = $('<span class="tag"><a class="tagName" href="/'+facelang+'/tags/show_sentences_with_tag/'+tagname.replace(' ', '_')+'">'+tagname+'</a></span>');
					taglink.click(function(e){
						// Cancel the default action
						e.preventDefault();
						//put the tagname into the form field for submission by the user
						$('input#TagTagName').val(tagname);
					});
					taglink.hover(
						function(){
							tagname = $(this).text();
							GM_log(tagname);
							$(".sentence[tags*='"+tagname.replace(' ', '_')+"']").css({'background-color':'#D3F3B9'});
							if($.inArray(tagname, arrayoftags)>-1){
								$(".mainSentence").css({'background-color':'#D3F3B9'});
							}
						},
						function(){
							tagname = $(this).text();
							GM_log(tagname);
							$(".sentence[tags*='"+tagname.replace(' ', '_')+"'], .mainSentence").css({'background-color':'transparent'});
						}
					);
					taglink.css({'background-color':'#F1F1F1','color':'#849684'});
					indirect_div.append(taglink);
				}
			}
		}
	}
}