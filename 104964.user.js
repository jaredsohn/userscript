// ==UserScript==
// @name           Tatoeba Random Languages
// @copyright      Jakob V. <jakov@gmx.at>
// @description    Randomly selects language for previous, next or random sentence out of a predifined list.
// @include        http://tatoeba.org/*
// @include        http://tatoeba.fsffrance.org/*
// @require        http://code.jquery.com/jquery-1.5.js
// @require        http://code.jquery.com/ui/1.8.14/jquery-ui.min.js
// @require        http://home.pages.at/k8ag/userscript/jquery-ui-1.8.14.custom/css/custom-theme/css.js
// @require        https://jquery-json.googlecode.com/files/jquery.json-2.2.js
// ==/UserScript==

// @unwrap 

$(document).ready(main);

function main(){
	
	//alert();
	// @require        http://userscripts.org/scripts/source/85398.user.js
	//function got(name, value) {
	//  console.log('got global named', name, 'with value', value);
	//}
	//read_content_global('pathArray', got);
	//read_content_global('rootUrl', got);
	
	lock_src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ/SURBVDjLbVJBaxNBGH2bpEkTmxi1NTRKTZtoQUHEWz0Igj2I4kG9eVNQhEBO7bEHc+yv8JAiHnr2B4gFqVrQRhObljQolBSTJqZJdnZmfbNr2rU68DEz33zfm/fejGHbNrxjaWlpRCk1J6WcYZxkgPGTsWJZ1mIul/vlrTe8AIVC4Qqbl5PJ5GQsFoPP5wP36PV6qNfr2OIg0L35+fm1fwDYPMLDj+l0OmOaJmq1Gjqdjr4dgUAAiUTCqSsWixvMXV5YWOjqvW+AxOSz8fHxjBAC5XJ5s91up7gO6tDrUqn0QwOTXYZSsoO+wGDB5EwkEkGlUgGb7mSz2apHajWfz9+sVqvFVCrl1P4PYExr5m16vYUjQ+c0O11DtmN/ebD95pG9UpnGzl7Y0Xz30ir8toAtLdiWG0JIvFi76piaGG7g9plVTD/5YLgMCPLg/g0YtMTwhznfApRBfsP6kAYJSKuN57Md5oXTsvHy7aEEfZMutHZfIRAahWGMsHAICMeZVsD+HmTrG8zudyhrH+HJLGyz7wEgRSh9k4nm+nvqPIb4xWuovV5k/2lMXJ9F8+s6ARqIpk6QsIQtTC+AcGTYpBqfvgBfcJTuKMi+xKfdMCZgIp6eRK8TYu2+w2oA4PwDm+5qVK218XmNLN7xxILqKfS7pGqTWekLmuVtV65STs8hA73RqJQQP5+CP3KKACamHj7FlGBDawfH00kEW0MuA8o9AmA6qMrSHqwTIAoM08hAkHkN0ES3UYfotBGdiNFu5cr2AmgJobOPET7nhxEMuU/o40soSjO7iHbbVNgnUen6pY0/AOCTbC7PuV44H0f8Cetg5g9zP5aU7loDcfwGcrKyzYdvwUUAAAAASUVORK5CYII=';
	und_src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAIAAAAVyRqTAAAACXBIWXMAAAsSAAALEgHS3X78AAADUklEQVR42rWUzWsTQRiHRb16UfDif6A3Eb14E1Jv4qX14EEQxCZVySIqKgZE60ENCEWksonUZsHa2jYSFGlJq0KL0jSxrTZNrFjxK2p353tmd7PxTbbtoa02Hhwe2N8uy7Oz7zsz6yr/ZxSLxXVlz8tOj73IpIFcPoMRtuoayELETybmJpHVJ5bpP1lQw+WM3nxYDwBn9SAnog4vpqUC/ziIzJ9gJB/SdCZp1fJy9aVE+FSqCbhkhBnmdcwYk9IM/zgAWjo34jxrkt17aPa2RdQKdWf4RLIRgG/UpYYfx8KkFZNV6PtB5/F+1bWLvb6+tpoyzoUEIPxh1gz/nKb5y7TYiktT9M09NhZFv75Yi33yVlVzKguT2ezIMFCYyiG8oquIIPO7TO+TfRvkwHo2cdAi1KSuSR34Ff+VcsWrqb1qrZfUUrjxSIt+vAGIRUKEregqlvjzS9mzWSW3yPRmMbIVlcaQhdlMH5kbgSu84nrl5epIQuPcSbRqqYtNQOJqGFO+rBRQYmR+lcO75dONIr2BZ/YiNC+ybeWenU7XDjr33CLCdp2auryKOnm+EViuhjZ8GlSjR8i3SfRjgk0dpW+P4VLWomU1esF9sN3t3MZmn0AzlWPXpaaccSUAoioqf8vr3sRme2HuFnaqIA7Vx9+mxcvTfKK9tpewtFVV7bl/UxMu8+OT40OjQH58CpqKS+8sa35pdywWilrUri0+BINLsbaaOo4evKIHtCrBK0RwwlxCJCGC0NWXJqiZ4LUzxPmzulUjtjK0m6mma4ARvsmU6umNxuInAQiEME6oqAFhSU0Y9dUeGP+iTmg3ko1XAQjQ/I57Lb0PDwAd8ZBgKtr/8MT9diDa3+XbqxUhuKp27X9Sq8R9LfmoEYAgiWzpuHOgNw6EOu7w2v4Cs4WRry5HDM0/niCA2lhc18ai2i+IrzY6tVT/IQCCIFIz9EMpAwgb+pJ63jIXZn0uFjocCwDnYkEpy/FIKNbcAEBgrhNvaY3tPw1AYMrR7wb19kCVu0HF7WCsLaBHgWa9DSoOXozxL3N+4QyZLOZejA8BEGzbef/2jX+GQFC2PTuRzz1/BUCA20Ihl8kMARBsZeeK+XTmNZAr5JVUQggl5cIKKf638RsGdZydfCSNuQAAAABJRU5ErkJggg==';
	rnd_src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAIAAAAVyRqTAAAACXBIWXMAAAsSAAALEgHS3X78AAAEDElEQVR42rVU+U9UZxSd73v7e99rUTTMsEtla0EBLVYs3ZSyZFi0oWChROgCSKswArVqLaRFsciiw8gMTZvuiY1tlFhTq9IFN8BK7c/8MT13mJkMoEl/cXIyedt37r3nnnsddtzk48Di4qLDdgbsxHN28rhI8YoNZ8XGUSt/QKSeFbmDRuUB85UPRPoofeOctBMm6EuXn5Dks5N9dvwEHopUr0gep7euAIEu/ERtFXyq9u2SvnqaX4lzPGBsRvCpePbHk45/Hbh13JfkcwUiZxBR9YYW9XCFWeoxSw8pp4plf56+r0lrq+PXYqXzaZqnyijpNsu7tNZ6/BM1/8VJLEtE8yqb0+i7zt1seg2fSpB9BWpPpVX0kZU3oHXUSj+kS9+ny5/n4hT7y2b3lNDZaMyr/HosUSPN0KP7Ev85mV2LZTO2eqzUqO6wtvUhWfDqbfUgZTfFQ4hWQfouQ7qQStRar3vZOwS4Eid7t5rPHyWJIWXuICKxWc2BHBckKu7RvOzPJ1Co3rSPqMXmE6QyXvwtIy9+2WXUdIicU9ToeL/IGDF39iqj29gdg03HoCA2rz6S9/cY5eQL+jtv4GDQIXGTRm0r/ymFT8dIX2fLgTyz+IjIHF7yEOyht9exG2vpJDoxI9h8UN8Fzi872S2LzepUzQPGr65TPtth7O4QaWfC5gOFK2BUdKr9O5WhIvRdGXjRLOsKU4+QYgt8paDn02AYZaxQGd4ufZPFbptaj1s9WiYyhmFceDRMDTgDIntIf7tBGXmOX0qA4UgWxE/ymRWdCCZ9m4nzkcL15ibx1BiMaO04prXXwa/KYLH8RY5R9b71bD+ooqgpd79VdFzxbg01cypeO7CHlEEnM4fNVw/Jk5uWqNFka/txmpogrMJ+9eMS1MGvrkfR6pFy1VO9nBrlp3q1tnoYlijuKfJYodg4Fupn1mkoRinfMeSJfKO8S4A3fBBzB33Ajsr4pUS9+c0QNY1pWBZ4mV9MdPzDpQspRpknUhDWgNZVg07KXz6j9rjNlw8jXnRaMAb/bR3N821Tb24MZ42pj8Tf8gm/vpZ497TTxog6bL70ob6/FsrAmoi0Yh8Zr7WrvW6owW+s0d9qWCkIsjNLujHE2BJ2pJQIknzU2EgeECQqcVptGSNwCPU/6/RDqK3CPkSGLEiZnBQl6Eq4AqTkclkIwVpXUwesTSe1/a+r3VVW9hASoVkPKkbLZPMJGAMrxah5T29p1N/da7oPGo0tWk+l5qnGnsETmEpv3QvpiFoe30KYyCeJf9wgXUzkv65Hx2BYw30Q2w5Wg6uwZrEfaNCBWya7a7C7Ok0jFsCcRsAtMBu8mBFEDTOEsLRXgQWJ3bTYnIr1iMWyehT/D4h68bH9/gP5kytfFHO5kgAAAABJRU5ErkJggg==';
	
	facelang = window.location.href.split('/')[3];
	console.log('facelang: '+facelang);
	
	//BEGIN SETTINGS

	my_rand_langs = GM_getValue('my_rand_langs');
	rand_default = {};
	rand_default[facelang] = 100;
	my_rand_langs = my_rand_langs || $.toJSON(rand_default);
	my_rand_langs = $.evalJSON(my_rand_langs);
	console.log('my_rand_langs:'+$.toJSON(my_rand_langs));
	
	patterns = GM_getValue('patterns');
	patterns_default = {0: ''};
	patterns = patterns || $.toJSON(patterns_default);
	patterns = $.evalJSON(patterns);
	console.log('patterns:'+$.toJSON(patterns));
	
	lock_lang = GM_getValue('lock_lang');
	lock_lang = lock_lang || false;
	console.log('lock_lang:'+lock_lang);
	
	
	mode = GM_getValue('mode') || 'dynamic';
	
	checkprev = GM_getValue('checkprev');
	checkprev = !isNaN(checkprev) ? checkprev*1 : 10;
	console.log('checkprev:', checkprev);
	
	checknext = GM_getValue('checknext');
	checknext = !isNaN(checknext) ? checknext*1 : 10;
	console.log('checknext:', checknext);
	
	checkrand = GM_getValue('checkrand');
	checkrand = !isNaN(checkrand) ? checkrand*1 : 10;
	console.log('checkrand:', checkrand);
	
	setup = false;
	if(window.location.href.split('/')[4] == 'user' && window.location.href.split('/')[5] == 'profile' && window.location.href.split('/')[6] == $('#profile .menuSection').attr('href').split('/')[4]){
		setup = true;
		
		//var jqueryUIcss = GM_getResourceText("jqueryUIcss");
		var jqueryUIcss = resourcevar;
		console.log(resourcevar);
		GM_addStyle(jqueryUIcss);
		
		if($('.userscriptSettings').is('*')){
			settings = $('.userscriptSettings');
		}
		else{
			settings = $('<div class="module profileSummary userscriptSettings"><h2>userscripts</h2></div>');
			$('.profileSummary').after(settings);
		}
		
		settings.append('<h3>My Random Languages</h3>');
		contentdiv = $('<form id="myrandomlanguages"></form>');
		settings.append(contentdiv);
		
		//contentdiv.append('<table>');
		//contentdiv.append('<tr><td><label for="my_rand_langs" class="field">my_rand_langs</label></td><td><input id="my_rand_langs" value=""/></td></tr>');
		//contentdiv.append('</table>');
		
		//contentdiv.append('<label for="mode" class="field">mode</label></td><td><select id="mode"><option value="dynamic">dynamic</option><option value="undefine">undefine</option><option value="distribute">distribute</option></select>');
		contentdiv.append('<label for="mode" class="field">mode</label></td><td><div id="mode"><input type="radio" name="mode_radio" value="dynamic" id="dynamic" '+(mode=='dynamic'?'checked="checked"':'')+'><label for="dynamic">dynamic</label><input type="radio" name="mode_radio" value="undefine" id="undefine" '+(mode=='undefine'?'checked="checked"':'')+'><label for="undefine">undefine</label><input type="radio" name="mode_radio" value="distribute" id="distribute" '+(mode=='distribute'?'checked="checked"':'')+'><label for="distribute">distribute</label></div>');
		
		//$('#mode option').each(function(){
		//	this.selected = ($(this).val()==mode);
		//});
		
		droplist = $('#SentenceFrom').clone();
		droplist.attr('id','randlangsdroplist');
		droplist.removeAttr('name');
		//droplist.append($('<option value="unknown">unknown</option>'));
		droplist.append($('<option value="rnd">Random</option>'));
		droplist.prepend($('<option value="select">select</option>'));
		contentdiv.append(droplist);
		
		randlanglist = $('<table></table>');
		contentdiv.append(randlanglist);
		
		droplist.change(function(){
			console.log('droplist change');
			if(droplist.find(':selected:not([disabled])').length!=0 && droplist.find(':selected').val()!='select'){
				droplang = droplist.find(':selected:not([disabled])').val();
				dropname = droplist.find(':selected:not([disabled])').text();
				my_rand_langs[droplang] = my_rand_langs[droplang] || 0;
				console.log(droplang);
				droplang = droplang=='select' ? 'unknown' : droplang;
				item = $('<tr></tr>');
				src = 'http://flags.tatoeba.org/img/flags/'+droplang+'.png';
				if(droplang=='und'){src = und_src;}
				if(droplang=='rnd'){src = rnd_src;}
				item.append('<td><span class="ui-icon ui-icon-arrowthick-2-n-s"></span></td>');
				item.append($("<td></td>").append($('<img src="'+src+'" alt="'+droplang+'" style="float:none;"/> <label for="'+droplang+'_percentage">'+dropname+'</label>')));
				inputer = $('<input type="text" id="'+droplang+'_percentage" style="border:0; color:#f6931f; font-weight:bold; width:3em; background-color:transparent;" value="'+Math.round(my_rand_langs[droplang])+'"/>');
				item.append($("<td></td>").append(inputer));
				slide = $('<div id="'+droplang+'_slider" class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all" style="float: right;display:inline-block;width:300px;margin:3px 15px;"></div>');
				item.append($("<td></td>").append(slide));
				button = $('<a>close</a>').button({
					icons: {
						primary: "ui-icon-close"
					},
					text: false
				}).click(function(){
					if(mode!="undefine"){
						lang = $(this).parent().parent().find('img').attr('alt');
						
						droplist.find('[value='+lang+']').removeAttr('disabled').show();
						
						$(this).parent().parent().find('.ui-slider').slider( "value", 0 );
						$(this).parent().parent().find('.ui-slider').trigger('slide', {'value': 0 });
						
						delete my_rand_langs[lang];
						$(this).parent().parent().remove();
					}
				});
				item.append($("<td></td>").append(button));
				randlanglist.append(item);
				$(slide).slider({
					value: my_rand_langs[droplang],
					orientation: "horizontal",
					range: "min",
					min: 1,
					max: 99,
					animate: true,
				}).bind('slide', function( event, ui ){
					thislang = $(this).attr('id').split('_')[0];
					console.log('thislang:'+thislang);
					
					my_rand_langs[thislang] = my_rand_langs[thislang] || 0;
					my_rand_langs[thislang] = !isNaN(my_rand_langs[thislang]) ? my_rand_langs[thislang] : 0;
					my_rand_langs[thislang] = my_rand_langs[thislang]!=null ? my_rand_langs[thislang] : 0;
					diff = ui.value - my_rand_langs[thislang]*1;
					console.log('diff:'+diff);
					
					others = randlanglist.find('.ui-slider').not(this);
					numberofothersnotzero = others.filter(function (index) {
						return $(this).slider( "value" )>0;
					}).length;
					
					othersvaluebefore = 100 - my_rand_langs[thislang];
					console.log('othersvaluebefore:'+othersvaluebefore);
					console.log('Object.keys(my_rand_langs).length:'+Object.keys(my_rand_langs).length);
					if(Object.keys(my_rand_langs).length==1){
						console.log('Object.keys(my_rand_langs).length==1');
						return false;
					}
					else{
						if(mode=='dynamic'){
								for(item in my_rand_langs){
									if(item!=thislang){
										my_rand_langs[item] = my_rand_langs[item]*1 - diff*my_rand_langs[item]*1/othersvaluebefore;
									}
								}
								my_rand_langs[thislang] = ui.value;
						}
						else if(mode=='undefine'){
							if(!my_rand_langs['und']){
								droplist.val('und').change();
								droplist.val('select');
							}
							
							if(thislang=='und'){
								lowest = 100;
								for(item in my_rand_langs){
									if(item!=thislang && my_rand_langs[item]<lowest){
										lowest = my_rand_langs[item];
									}
								}
								
								console.log('lowest:'+lowest);
								if(diff/others.length<=lowest){
									for(item in my_rand_langs){
										if(item!=thislang){
											my_rand_langs[item] = my_rand_langs[item] - diff/others.length;
										}
									}
									my_rand_langs[thislang] = ui.value;
								}
								else{
									$(this).slider( "value", (my_rand_langs[thislang]+lowest*others.length) );
									$(this).trigger('slide', {'value':(my_rand_langs[thislang]+lowest*others.length)});
									return false;
								}
							}
							else{
								if(diff<=my_rand_langs['und']){
									my_rand_langs['und'] = my_rand_langs['und'] - diff;
									my_rand_langs[thislang] = ui.value;
								}
								else{
									$(this).slider( "value", my_rand_langs[thislang]+my_rand_langs['und'] );
									$(this).trigger('slide', {'value':my_rand_langs[thislang]+my_rand_langs['und']});
									return false;
								}
							}
						}
						else if(mode=='distribute' || true){
							lowest = 100;
							for(item in my_rand_langs){
								if(item!=thislang && my_rand_langs[item]<lowest){
									lowest = my_rand_langs[item];
								}
							}
							
							console.log('lowest:'+lowest);
							
							if(diff/others.length<=lowest){
								for(item in my_rand_langs){
									if(item!=thislang){
										my_rand_langs[item] = my_rand_langs[item] - diff/others.length;
									}
								}
								my_rand_langs[thislang] = ui.value;
							}
							else{
								$(this).slider( "value", (my_rand_langs[thislang]+lowest*others.length) );
								$(this).trigger('slide', {'value':(my_rand_langs[thislang]+lowest*others.length)});
								return false;
							}
						}
					}
					
					$('#'+thislang+'_percentage').val( Math.round(my_rand_langs[thislang]) );
					
					sum = 0;
					for(item in my_rand_langs){
						sum += my_rand_langs[item]*1;
					}
					console.log('sum:'+sum);
					if(Math.round(sum)<98 || Math.round(sum)>102){
						if(confirm('An Error occurded: the sum of these is not 100. It is "'+sum+'". Do you therefore want to reset the values?')){
							my_rand_langs = rand_default;
							GM_setValue('my_rand_langs',$.toJSON(my_rand_langs));
							console.log('my_rand_langs: '+$.toJSON(my_rand_langs));
							randlanglist.html('');
							droplist.find(':disabled, :hidden').show().removeAttr('disabled');
							droplist.val(facelang).change();
							return false;
						}
					}
					
					GM_setValue('my_rand_langs',$.toJSON(my_rand_langs));
					console.log('my_rand_langs: '+$.toJSON(my_rand_langs));
					
					others.each(function(index, item){
						lang = $(item).attr('id').split('_')[0];
						console.log('lang:'+lang);
						console.log('my_rand_langs['+lang+']:'+my_rand_langs[lang]);
						
						$(item).slider( "value", my_rand_langs[lang] );
						$('#'+lang+'_percentage').css({'color':'#F6931F'}).val( Math.round(my_rand_langs[lang]) );
					});
				});
				inputer.keyup(function(e){
					thislang = $(this).attr('id').split('_')[0];
					if(!isNaN($(this).val()*1) && $(this).val()*1>=0 && $(this).val()*1<=$('#'+thislang+'_slider').slider( "option", "max")){
						$(this).css({'color':'#F6931F'});
						$('#'+thislang+'_slider').slider( "value", $(this).val()*1 );
						$('#'+thislang+'_slider').trigger('slide', {'value': $(this).val()*1});
					}
					else{
						$(this).css({'color':'#F62815'});
					}
				});
				droplist.find(':selected').hide().attr('disabled', 'disabled').removeAttr('selected');
				randlanglist.find('.ui-slider').slider( "option", "max", 101-randlanglist.find('.ui-slider').length );
				
				randlanglist.sortable({
					items: "tr"
				});
			}
			else{
				//droplist.val('select');
			}
		});
		
		$('#mode').change(function(){
			mode = $(this).find('input:checked').val();
			GM_setValue('mode',mode);
			console.log('mode: '+mode);
			
			if(mode=="undefine"){
				droplist.val('und').change();
			}
			$(this).buttonset("refresh");
		});
		$('#mode').buttonset();
		$('[name="mode_radio"]:checked').removeAttr('checked');
		$('[name="mode_radio"][value="'+mode+'"]').attr("checked", 'checked').change();
		
		for(key in my_rand_langs){
			//console.log(key + my_rand_langs[key ]);
			droplist.val(key).change();
		}
		
		contentdiv.append('<hr/>');
		
		patternsboxes = $('<table id="patternsboxes"></table>');
		contentdiv.append($('<fieldset><legend>Filter patterns</legend></fieldset>').append(patternsboxes));
		
		$.each(patterns, function(index, value){
			patternsboxes.append('<tr><td><input type="text" value="'+value+'"/></td><td><input type="button" value="Add"/><input type="button" value="Remove"/></td></tr>');
		});
		patternsboxes.find('input[type="button"][value="Add"]').button().click(function(){
			me = $(this).parent().parent().clone();
			me.appendTo(patternsboxes);
			patterns[me.prevAll().length] = me.find('input[type="text"]').val();
			//patterns = $(patterns).map(function(index, val){return val;});
			GM_setValue('patterns',$.toJSON(patterns));
			console.log('patterns: '+$.toJSON(patterns));
		});
		patternsboxes.find('input[type="button"][value="Remove"]').button().click(function(){
			if($(this).parent().parent().siblings().length>0){
				delete patterns[$(this).parent().parent().prevAll().length];
				$(this).parent().parent().remove();
				
				muh = {};
				ind = 0;
				$.each(patterns, function(index, val){if(val){muh[ind] = val;ind++;}});
				patterns = muh;
				
				//patterns = $(patterns).map(function(index, val){return val;});
				GM_setValue('patterns',$.toJSON(patterns));
				console.log('patterns: '+$.toJSON(patterns));
			}
		});
		patternsboxes.find('input').keyup(function(e){
			patterns[$(this).parent().parent().prevAll().length] = $(this).val();
			//patterns = $(patterns).map(function(index, val){return val;});
			GM_setValue('patterns',$.toJSON(patterns));
			console.log('patterns: '+$.toJSON(patterns));
		});
		
		contentdiv.append('<hr/>');
		
		contentdiv.append('<table id="check"> <tr><td><label for="checkprev" class="field">checkprev</label></td><td><input type="text" name="mode_radio" id="checkprev" value="'+checkprev+'" size="1"></td></tr> <tr><td><label for="checknext" class="field">checknext</label></td><td><input type="text" name="mode_radio" id="checknext" value="'+checknext+'" size="1"></td></tr> <tr><td><label for="checkrand" class="field">checkrand</label></td><td><input type="text" name="mode_radio" id="checkrand" value="'+checkrand+'" size="1"></td></tr> </table>');
		
		contentdiv.find('#checkprev, #checknext, #checkrand').each(function(){
			plus = $('<a>+</a>');
			minus = $('<a>-</a>');
			plus.button({
				icons: {
					primary: "ui-icon-circle-plus"
				},
				text: false
			}).click(function(){
				$(this).siblings('input').val($(this).siblings('input').val()*1+1).keyup();
			});
			minus.button({
				icons: {
					primary: "ui-icon-circle-minus"
				},
				text: false
			}).click(function(){
				$(this).siblings('input').val($(this).siblings('input').val()*1-1).keyup();
			});
			$(this).after(plus);
			$(this).after(minus);
		});
		contentdiv.find('#patternsboxes input[type="text"], #check input[type="text"]').css({'border': '1px solid #6E994E', 'color': '#222222', 'padding': '0.4em', 'margin-right': '0.1em', 'border-radius': '4px'});
		contentdiv.find('#patternsboxes input[type="text"]').css({'font-family':'monospace', 'width':'90%'});
		
		
		contentdiv.find('#checkprev, #checknext, #checkrand').keyup(function(){
			thisval = $(this).val();
			id = $(this).attr('id');
			if(id=='checkprev'){
				checkprev = thisval;
				GM_setValue('checkprev',checkprev);
				console.log('checkprev',checkprev);
			}
			else if(id=='checknext'){
				checknext = thisval;
				GM_setValue('checknext',checknext);
				console.log('checknext',checknext);
			}
			else if(id=='checkrand'){
				checkrand = thisval;
				GM_setValue('checkrand',checkrand);
				console.log('checkrand',checkrand);
			}
		});
	}
	else{
		//Memo: get random numbers from min to max: //max = 6;//min = 3;//console.log(Math.floor(Math.random()*(max+1-min)+min));
		
		function pickbalanced(object){
			//examples for "object":
			//biased_dice = {"1":1,"2":1,"3":1,"4":1,"5":1,"6":2};
			//pascal_dice = {"1":1,"2":1,"3":1,"4":1,"5":1,"6":1};
			//biased_coin = {"head":1,"tail":2};
			//pascal_coin = {"head":1,"tail":1};
			var total = 0; //Memo: It's quicker if "var" is used (but cant be used outside)
			for(lang in object){
				total += object[lang];
			}
			var random = Math.random()*total;
			var sum = 0;
			for(lang in object){
				sum += object[lang];
				if(sum>random){
					return lang;
				}
			}
			console.error('This should never happen! Probably the object is not made up of only {"langname":number, etc.}.');
		}
		var usethisone = pickbalanced(my_rand_langs);
		//
		if(lock_lang!=false){
			usethisone = lock_lang;
		}
		console.log('usethisone:'+usethisone);

		all = $('#SentenceFrom option').map(function(){
			return $(this).val();
		});
		
		clone = $("#randomLangChoiceInBrowse").clone();
		$("#randomLangChoiceInBrowse").after(clone);
		$("#randomLangChoiceInBrowse").remove();
		
		clone.change(function(event){
				console.info('clone.change');
				//START from http://tatoeba.org/js/sentences.random.js?1276977943
				//modified from $("#randomLangChoiceInBrowse").change(...
					
				
				var currentId = $('#SentenceSentenceId').val();
				console.log('currentId:'+currentId);
				var lang = $(this).val();
				console.log('lang:'+lang);
				var interfaceLang = window.location.href.split('/')[3];
				console.log('interfaceLang:'+interfaceLang);
				var rootUrl = "http://tatoeba.org/" + interfaceLang;
				console.log('rootUrl:'+rootUrl);
				var baseURL = rootUrl + "/sentences/show/";
				console.log('baseURL:'+baseURL);
				var loading = 3;
				
				function check_sentence(tab_sentence){
					match = false;
					for(value in patterns){
						var flags = patterns[value].replace(/.*\/([gimy]*)$/, '$1');
						var pattern = patterns[value].replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
						var regex = new RegExp(pattern, flags);
						if(pattern!='' && random_sentence.match(regex)){
							match = random_sentence.match(regex);
							console.warn('match in ', [patterns[value]]);
							return match;
						}
					}
				}
				/*
				$.fn.extend({
					animatethrough: function(cssarray, speed, times){
						if(times>0 || times==Infinity){					//pick "times" wisely so it ends at the right css!
							css = cssarray.shift();						//takes the first css
							cssarray.push(css);							//appends it to the end again so it can go through circles
							$(this).animate(css, speed, function(){
								$(this).animatethrough(cssarray, speed, times-1);
							});
						}
					}
				});
				$('#randomLink').animatethrough([{'background-color':'red'}, {'background-color':'blue'}], 'slow', 2);
				*/
				
				// Showing loading animation
				$("#loadingAnimationForNavigation").show();
				
				// Update random link
				//$("#randomLink a").attr("href",baseURL+lang+'#test');
				//http://tatoeba.org/epo/sentences/random/epo/
				
				
				
				prevcount = $('#prevSentence .count')[0] || $('<a class="count">0</a>').css({'background-color': '#E44242', 'border': '1px solid #9E2D2D', 'border-radius': '999px', 'color': 'white', 'font-size': '0.6em', 'font-weight': 'bold', 'margin-top': '-10px', 'padding': '0 0.4em', 'position': 'absolute'});
				nextcount = $('#nextSentence .count')[0] || $('<a class="count">0</a>').css({'background-color': '#E44242', 'border': '1px solid #9E2D2D', 'border-radius': '999px', 'color': 'white', 'font-size': '0.6em', 'font-weight': 'bold', 'margin-top': '-10px', 'padding': '0 0.4em', 'position': 'absolute'});
				randomcount = $('#randomLink .count')[0] || $('<a class="count">0</a>').css({'background-color': '#E44242', 'border': '1px solid #9E2D2D', 'border-radius': '999px', 'color': 'white', 'font-size': '0.6em', 'font-weight': 'bold', 'margin-top': '-10px', 'padding': '0 0.4em', 'position': 'absolute'});
				prevcount = $(prevcount);
				nextcount = $(nextcount);
				randomcount = $(randomcount);
				$('#prevSentence').append(prevcount.fadeTo(0,0));
				$('#nextSentence').append(nextcount.fadeTo(0,0));
				$('#randomLink').append(randomcount.fadeTo(0,0));
				
				
				$("#prevSentence, #nextSentence, #randomLink").css({'outline': 'none'});
				
				if($('#prevSentence a').length==0){
					$('#prevSentence').removeClass("active").addClass("inactive").attr("class", "inactive").wrapInner('<a></a>');
				}
				if($('#nextSentence a').length==0){
					$('#nextSentence').removeClass("active").addClass("inactive").attr("class", "inactive").wrapInner('<a></a>');
				}
				
				function load_random_sentence(){
					match = false;
					get_random = $.get(
						rootUrl+'/sentences/random/'+lang,
						function(data) {
							id = $(data).find('.mainSentence .sentenceContent a').attr('href').split('/').pop();
							username = $(data).find('.belongsTo a');
							username = username.is('*') ? username.attr('href').split('/').pop() : '';
							text = $(data).find('.mainSentence .sentenceContent').text().trim();
							//random_sentence = id + '\t'+ lang + '\t'+ text + '\t'+ username + '\t'+ date_added + '\t'+ date_last_modified;
							random_sentence = id + '\t'+ lang + '\t'+ text + '\t'+ username + '\t';
							console.info(random_sentence);
							match = check_sentence(random_sentence);
							if(match){
								console.warn('match: ',match);
								//$("#randomLink").attr("class", "inactive");
								$("#randomLink a").attr("href", baseURL+id);
								randomcount.fadeTo('slow',0).text(randomcount.text()*1+1).fadeTo('slow',1);
								if(checkrand>randomcount.text()*1){
									load_random_sentence();
								}
								else{
									$('#randomLink').css({'outline': '1px solid #9E2D2D'});
									loading--;
									if(loading<=0){
										$("#loadingAnimationForNavigation").hide();
									}
								}
							}
							else{
								console.info('match: ',match);
								$("#randomLink").attr("class", "active");
								$("#randomLink a").attr("href", baseURL+id);
								$('#randomLink').css({'outline': '1px solid #257D0C'});
								//randomcount.text(randomcount.text()*1+1).fadeTo('slow',1);
								
								//$('#randomLink').animatethrough([{'background-color':'#E44242'}, {'background-color':'#D3F3B9'}], 'quick', 2);
								loading--;
								if(loading<=0){
									$("#loadingAnimationForNavigation").hide();
								}
							}
						}
					);
				}
				if(checkrand){
					get_random=false;
					load_random_sentence();
					$(randomcount).click(function(){
						if(get_random){
							get_random.abort();
						}
					});
				}
				else {
					loading--;
					if(loading<=0){ $("#loadingAnimationForNavigation").hide(); }
					$("#randomLink").attr("class", "active");
				}
				
				function load_prevnext_sentence(startId,lang,prevnext){
					post_prevnext = post_prevnext || [false, false];
					post_prevnext[prevnext] = $.post(
						rootUrl + "/sentences/get_neighbors_for_ajax/"+startId+"/"+ lang,
						{},
						function(response){
							neighbors = response.split(";");
							prevnextId = prevnextId || [false, false];
							prevnextId[prevnext] = neighbors[prevnext]; //[0]:prev, [1]:next
							
							if (prevnextId[prevnext] == ""){
								$("#"+(prevnext==0 ? 'prev':'next')+"Sentence").attr("class", "inactive");
								$("#"+(prevnext==0 ? 'prev':'next')+"Sentence a").attr("href", "");
								loading--;
								if(loading<=0){
									$("#loadingAnimationForNavigation").hide();
								}
							}
							else{
								get_prevnext = get_prevnext || [false, false];
								get_prevnext[prevnext] = $.get(
									rootUrl+'/sentences/show/'+prevnextId[prevnext],
									function(data) {
										id = $(data).find('#SentenceSentenceId').attr('value');
										username = $(data).find('.belongsTo a');
										username = username.is('*') ? username.attr('href').split('/').pop() : '';
										text = $(data).find('.mainSentence .sentenceContent').text().trim();
										//random_sentence = id + '\t'+ lang + '\t'+ text + '\t'+ username + '\t'+ date_added + '\t'+ date_last_modified;
										random_sentence = id + '\t'+ lang + '\t'+ text + '\t'+ username + '\t';
										console.info(random_sentence);
										match = check_sentence(random_sentence);
										if(match){
											console.warn('match: ',match);
											//$("#"+(prevnext==0 ? 'prev':'next')+"Sentence").attr("class", "inactive");
											$("#"+(prevnext==0 ? 'prev':'next')+"Sentence a").attr("href", rootUrl+'/sentences/show/'+prevnextId[prevnext]);
											if(prevnext==0){
												prevcount.text(prevcount.text()*1+1).fadeTo('slow',1);
												if(checkprev>prevcount.text()*1){
													load_prevnext_sentence(prevnextId[prevnext],lang,prevnext);
												}
												else{
													$("#"+(prevnext==0 ? 'prev':'next')+"Sentence").css({'outline': '1px solid #9E2D2D'});
													loading--;
													if(loading<=0){
														$("#loadingAnimationForNavigation").hide();
													}
												}
											}
											else if(prevnext==1){
												nextcount.text(nextcount.text()*1+1).fadeTo('slow',1);
												if(checknext>nextcount.text()*1){
													load_prevnext_sentence(prevnextId[prevnext],lang,prevnext);
												}
												else{
													$("#"+(prevnext==0 ? 'prev':'next')+"Sentence").css({'outline': '1px solid #9E2D2D'});
													loading--;
													if(loading<=0){
														$("#loadingAnimationForNavigation").hide();
													}
												}
											}
											
											
											
										}
										else{
											console.info('match: ',match);
											$("#"+(prevnext==0 ? 'prev':'next')+"Sentence").attr("class", "active");
											$("#"+(prevnext==0 ? 'prev':'next')+"Sentence a").attr("href", rootUrl+'/sentences/show/'+prevnextId[prevnext]);
											$("#"+(prevnext==0 ? 'prev':'next')+"Sentence").css({'outline': '1px solid #257D0C'});
											loading--;
											if(loading<=0){
												$("#loadingAnimationForNavigation").hide();
											}
										}
									}
								);
							}
						}
					);
				}
				if(checkprev){
					var prevnextId = prevnextId || [false, false];
					var get_prevnext = get_prevnext || [false, false];
					var post_prevnext = post_prevnext || [false, false];
					load_prevnext_sentence(currentId, lang, 0); //prev
					$(prevcount).click(function(){
						if(get_prevnext[0]){
							get_prevnext[0].abort();
						}
						if(post_prevnext[0]){
							post_prevnext[0].abort();
						}
					});
				}
				else {
					loading--;
					if(loading<=0){ $("#loadingAnimationForNavigation").hide(); }
					$("#prevSentence").attr("class", "active");
				}
				if(checknext){
					var prevnextId = prevnextId || [false, false];
					var get_prevnext = get_prevnext || [false, false];
					var post_prevnext = post_prevnext || [false, false];
					load_prevnext_sentence(currentId, lang, 1); //next
					$(prevcount).click(function(){
						if(get_prevnext[0]){
							get_prevnext[0].abort();
						}
						if(post_prevnext[0]){
							post_prevnext[0].abort();
						}
					});
				}
				else {
					loading--;
					if(loading<=0){ $("#loadingAnimationForNavigation").hide(); }
					$("#nextSentence").attr("class", "active");
				}
				//END from http://tatoeba.org/js/sentences.random.js?1276977943
		});
		
		function go(){
			if( usethisone=="rnd"){ //this little code is only needed if you want to use "rnd" (=random) as one of your languages. You might want to do so if you dont want to get a random sentence (and therefor most probably an english one) but a random language out of which you want to have a random sentence.
				var allrandom = Math.floor(Math.random()*all.length);
				usethisone = all[allrandom];
				console.log('usethisone was rnd and now is: '+usethisone);
			}
			
			if(clone.val() != usethisone){
				//http://tatoeba.org/*/sentences/show/*
				clone.find('option[selected]').removeAttr('selected');
				clone.val(usethisone);
			}
			clone.change();
			
			//http://tatoeba.org/*/sentences/several_random_sentences
			//http://tatoeba.org/*/activities/translate_sentences
			$('#SentenceInto').val(usethisone);
			
			//http://tatoeba.org/*/activities/adopt_sentences/
			//http://tatoeba.org/*/sentences/show_all_in/
			$('#filterLanguageSelect').val(usethisone);
			button = $('<input type="button" value="OK"/>');
			$('#filterLanguageSelect').after(button);
			button.click(function(){
				target = $('#filterLanguageSelect').val();
				target = (target == 'und' ? '' : target);
				$(location).attr('href','/deu/activities/adopt_sentences/'+target);
			});
		}
		
		$('.smallTip').html('');
		for(item in my_rand_langs){
			src = 'http://flags.tatoeba.org/img/flags/'+item+'.png';
			if(item=='und'){src=und_src;}
			if(item=='rnd'){src=rnd_src;}
			$('.smallTip').css({'vertical-align':'top'}).append($('<a><img title="'+clone.find('[value='+item+']').text()+'" alt="'+item+'" src="'+src+'"/><img class="language_lock" src="'+lock_src+'"/ style="margin-left: -9px; '+(lock_lang==item ? '' : 'display:none;')+'"> </a>').data({'lang':item}).css({'opacity':(usethisone==item?'1.0':'0.3')}).click(function(){
				usethisone = $(this).data('lang');
				$(this).css({'opacity':'1.0'}).siblings().css({'opacity':'0.3'});
				go();
			}).dblclick(function(){
				usethisone = $(this).data('lang');
				if(lock_lang==usethisone){
					lock_lang = false;
				}
				else{
					lock_lang = usethisone;
				}
				GM_setValue('lock_lang',lock_lang);
				console.log('lock_lang:'+lock_lang);
				$(this).css({'opacity':'1.0'}).siblings().css({'opacity':'0.3'});
				$(this).siblings().find('.language_lock').hide();
				if(lock_lang==usethisone){
					$(this).find('.language_lock').show();
				}
				else{
					$(this).find('.language_lock').hide();
				}
				go();
			}));
		}
		go();
	}
}