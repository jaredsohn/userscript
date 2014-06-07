// ==UserScript==
// @name         E-Online Voter
// @description  Votes on the E! Polls
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include   http://*.eonline.com/*
// ==/UserScript==

var delay = 2000;
var settings_key = 'eolinepoll-';
var blogpoll = $('.blog_poll');
var blogwrapper, pollid;
var choices_selected = '';
if(blogpoll.length) {
	/* this page has a poll */
	/*setTimeout to give the poll time to load*/
	var loadTimeOut = window.setTimeout(function() {
		clearTimeout(loadTimeOut);
		/* get the ID of the poll */
		var idstr = 'blog_poll_';
		
		blogpoll.each(function() {
			var id = $(this).attr('id');
			if(id && id.indexOf(idstr) == 0 ) {
				pollid = id.substr(idstr.length);
				blogwrapper = $(this);
			}
		});
		
		if(pollid) {
			settings_key += pollid;
			choices_selected = GM_getValue( settings_key, '' );
			
			if(choices_selected == '') {
				/* no choices for this poll, ask for the selections */
				var available_choices = { };
				$('input[type=radio]',blogpoll).each(function() {
						var label_elem = $(this).parent('li');
						if(label_elem.length > 0) {
							var label = label_elem.text();
							label = label.replace(/$[^a-zA-Z]*/m,'');
							label = label.replace(/[^a-zA-Z]*$/m,'');
							var elem_obj= new Object();
							elem_obj.id = $(this).attr('id');
							elem_obj.label = label;
							if(!available_choices[$(this).attr('name')]) {
								 available_choices[$(this).attr('name')] = new Array();																					
							}
							available_choices[$(this).attr('name')].push(elem_obj);
						}
				});
				var option_window = $('<form style="background:#fff;color:#000;border: solid 1px red;padding:10px;"></form>');
				option_window.append($('<p>Before using the voter, you must make your selections.</p>'));
				for( x in available_choices) {
					var group = available_choices[x];
					for (y in group) {
						var choice = group[y];
						var wrap = $('<div class="choice"></div>');
						wrap.append($('<input type="radio" name="' + x + '" value="' + choice.id + '" />') );
						wrap.append($('<label>' + choice.label + '</label>'));
						option_window.append(wrap);
					}
					option_window.append($('<hr/>'));
				}
				
				var button = $('<input type="button" value="Choose" />');
				button.click(function(e) {
						e.preventDefault();
						var form = button.parent('form');
						$('input:checked',form).each( function() {
									choices_selected += $(this).val() + ',';
						});
						//assign choices_selected to GM
						if(choices_selected != '') {
							GM_setValue(settings_key, choices_selected);
						}
						
						option_window.hide();
						loadAndVote();
						
				});
				
				option_window.append(button);
				blogwrapper.prepend(option_window);
			}
			else {
				loadAndVote();
			}

			
		}
		
		
	}, delay);
}

function loadAndVote() {
		var button = $('<input type="button" value="Clear Choices" style="border:1px solid red;" />');
		button.click( function(e) {
												e.preventDefault();
												window.stop();
												
												GM_deleteValue(settings_key);
												window.location.reload();
												
		});
		blogwrapper.prepend(button);
				

	
	  addCaptcha();
		
		var choice_array = choices_selected.split(',');
		for(i=0 ; i < choice_array.length ; i++) {
			vote(choice_array[i]);
		}

		var voteBtn = $('#' + 'voteBtn-' + pollid + ' input[type=button]');
		
		var reloadTime = window.setTimeout(function() { //delay not needed, but added so ppl can see what it's doing better
				voteBtn.click();	
		}, 80);

		 var reloadTime = window.setTimeout(function() {
			clearTimeout(reloadTime);
			window.location.reload();
		}, delay);
			 
}

function vote(choice) {
			var elGame = $('#' + choice);
			elGame.click();
}

function addCaptcha() {
	 		var captchaID = '';
			var captchaDiv = document.getElementById('poll_captcha_' + pollid);
			if(captchaDiv) { // don't try to add if captcha not found
				var img = captchaDiv.getElementsByTagName('img');		
				var imgSrc = img[0].src;
				var subSrc = imgSrc.substr(-7);//get # .jpg //could also include a /
				captchaID = subSrc.replace(/[^0-9]/g,''); 
				var input = document.getElementById('poll_uword');
				input.value = getCaptcha(captchaID);	 
			}
}


function getCaptcha(num) {
var captcha = new Array();
captcha[1] = 'polish';
captcha[2] = 'past';
captcha[3] = 'part';
captcha[4] = 'when';
captcha[5] = 'much';
captcha[6] = 'seed';
captcha[7] = 'soap';
captcha[8] = 'glove';
captcha[9] = 'sticky';
captcha[10] = 'soap';
captcha[11] = 'profit';
captcha[12] = 'bent';
captcha[13] = 'collar';
captcha[14] = 'where';
captcha[15] = 'weight';
captcha[16] = 'again';
captcha[17] = 'weight';
captcha[18] = 'boat';
captcha[19] = 'small';
captcha[20] = 'profit';
captcha[21] = 'sound';
captcha[22] = 'chin';
captcha[23] = 'flag';
captcha[24] = 'body';
captcha[25] = 'salt';
captcha[26] = 'birth';
captcha[27] = 'crime';
captcha[28] = 'false';
captcha[29] = 'sleep';
captcha[30] = 'square';
captcha[31] = 'canvas';
captcha[32] = 'mine';
captcha[33] = 'safe';
captcha[34] = 'mark';
captcha[35] = 'degree';
captcha[36] = 'bell';
captcha[37] = 'color';
captcha[38] = 'expert';
captcha[39] = 'rule';
captcha[40] = 'parcel';
captcha[41] = 'degree';
captcha[42] = 'waste';
captcha[43] = 'after';
captcha[44] = 'army'; 
captcha[45] = 'moon';
captcha[46] = 'brain';
captcha[47] = 'news';
captcha[48] = 'silver';
captcha[49] = 'rain';
captcha[50] = 'stiff';
captcha[51] = 'horse';
captcha[52] = 'smile';
captcha[53] = 'shirt';
captcha[54] = 'this';
captcha[55] = 'grip';
captcha[56] = 'sharp';
captcha[57] = 'knot';
captcha[58] = 'neck';
captcha[59] = 'woman';
captcha[60] = 'smell';
captcha[61] = 'round';
captcha[62] = 'linen';
captcha[63] = 'same';
captcha[64] = 'right';
captcha[65] = 'adjust';
captcha[66] = 'jewel';
captcha[67] = 'bell';
captcha[68] = 'pocket';
captcha[69] = 'green';
captcha[70] = 'mother';
captcha[71] = 'mine';
captcha[72] = 'rice';
captcha[73] = 'loss';
captcha[74] = 'tail';
captcha[75] = 'foot';
captcha[76] = 'porter';
captcha[77] = 'spring';
captcha[78] = 'desire';
captcha[79] = 'screw';
captcha[80] = 'spade';
captcha[81] = 'bent';
captcha[82] = 'letter';
captcha[83] = 'glass';
captcha[84] = 'sugar';
captcha[85] = 'fear';
captcha[86] = 'every';
captcha[87] = 'muscle';
captcha[88] = 'right';
captcha[89] = 'rate';
captcha[90] = 'butter';
captcha[91] = 'sail';
captcha[92] = 'summer';
captcha[93] = 'snake';
captcha[94] = 'wheel';
captcha[95] = 'sheep';
captcha[96] = 'glove';
captcha[97] = 'poison';
captcha[98] = 'tooth';
captcha[99] = 'bucket';
captcha[100] = 'wood';
captcha[101] = 'great';
captcha[102] = 'school';
captcha[103] = 'sudden';
captcha[104] = 'wind';
captcha[105] = 'step';
captcha[106] = 'credit';
captcha[107] = 'pain';
captcha[108] = 'design';
captcha[109] = 'front';
captcha[110] = 'push';
captcha[111] = 'seem'; 
captcha[112] = 'cord';
captcha[113] = 'sound';
captcha[114] = 'scale';
captcha[115] = 'with';
captcha[116] = 'wind';
captcha[117] = 'cloth';
captcha[118] = 'screw';
captcha[119] = 'garden';
captcha[120] = 'west';
captcha[121] = 'judge';
captcha[122] = 'goat';
captcha[123] = 'animal';
captcha[124] = 'warm';
captcha[125] = 'join';
captcha[126] = 'turn';
captcha[127] = 'school';
captcha[128] = 'white';
captcha[129] = 'keep';
captcha[130] = 'basin';
captcha[131] = 'tooth';
captcha[132] = 'face';
captcha[133] = 'range';
captcha[134] = 'tight';
captcha[135] = 'nail';
captcha[136] = 'seem';
captcha[137] = 'female';
captcha[138] = 'public';
captcha[139] = 'potato';
captcha[140] = 'idea';
captcha[141] = 'snake';
captcha[142] = 'flower';
captcha[143] = 'narrow';
captcha[144] = 'still';
captcha[145] = 'hope';
captcha[146] = 'glass';
captcha[147] = 'lock';
captcha[148] = 'hand';
captcha[149] = 'face';
captcha[150] = 'fear';
captcha[151] = 'copper';
captcha[152] = 'debt';
captcha[153] = 'shoe';
captcha[154] = 'paint';
captcha[155] = 'butter';
captcha[156] = 'roll';
captcha[157] = 'blood';
captcha[158] = 'story';
captcha[159] = 'doubt';
captcha[160] = 'meat';
captcha[161] = 'offer';
captcha[162] = 'clean';
captcha[163] = 'memory';
captcha[164] = 'like';
captcha[165] = 'wrong';
captcha[166] = 'jump';
captcha[167] = 'amount';
captcha[168] = 'regret';
captcha[169] = 'free';
captcha[170] = 'crush';
captcha[171] = 'pull';
captcha[172] = 'dress';
captcha[173] = 'door';
captcha[174] = 'male';
captcha[175] = 'black';
captcha[176] = 'please';
captcha[177] = 'flag';
captcha[178] = 'fact';
captcha[179] = 'nose';
captcha[180] = 'taste';
captcha[181] = 'snake';
captcha[182] = 'cold';
captcha[183] = 'attack';
captcha[184] = 'crush';
captcha[185] = 'canvas';
captcha[186] = 'shame';
captcha[187] = 'book';
captcha[188] = 'wound';
captcha[189] = 'nation';
captcha[190] = 'fire';
captcha[191] = 'good';

return captcha[num];
}