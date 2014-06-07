// ==UserScript==
// @name	WT Enhancer
// @namespace      WT Enhancer
// @description    Simple tweaks to improve Web-Tourist.net
// @version	1.3
// @include        http://*web-tourist.net/*
// ==/UserScript==

	var opts = [];
	opts['forumWidth'] = GM_getValue('forumWidth', 800);
	opts['doRunBoc'] = GM_getValue('runBOC', 1);
	opts['doFixWT'] = GM_getValue('fixWT', 1);
	opts['doFade'] = GM_getValue('fade', 1);
	
	var URI = top.location.href;
	var cookieSupport = false;
	var highlightLang = 'plain';
	
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

	var GM_JQA = document.createElement('script');
	GM_JQA.src = 'http://www.fileden.com/files/2007/1/11/625648/jquery.beautyOfCode.js.txt';
    GM_JQA.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQA);

    function GM_wait() {
        if(typeof(unsafeWindow.jQuery) == 'undefined' || typeof(unsafeWindow.jQuery.beautyOfCode) == 'undefined') {
			
			window.setTimeout(GM_wait,100); 
		}else{
		
			$ = unsafeWindow.jQuery; letsJQuery(); 
		}
    }

	function determinLang(){
	
		var forumName = $('span.nav > a:last').html();
		if(forumName.toLowerCase().search('php') != -1){
		
			highlightLang = 'php';
			
		}else if(forumName.toLowerCase().search('html') != -1){
			
			highlightLang = 'html';
			
		}else{
			
			highlightLang = 'plain';
		}
	}
	
	function determinLangForLessons(){
	
		var a = $('a.seo:first').html();
		a = a.toLowerCase();
		if(a.search('javascript') != -1){
			
			highlightLang = 'javascript';
		}else if(a.search('php') != -1){
		
			highlightLang = 'php';
		}else if(a.search('css') != -1){
		
			highlightLang = 'css';
		}else if(a.search('flash') != -1){
		
			highlightLang = 'as3';
		}
	}
	
	function runBOC(){
	
		$.beautyOfCode.init({
			brushes: ['Xml', 'JScript', 'Plain', 'Php', 'Sql', 'AS3', 'Css'],
			defaults: { 'html-script':true, toolbar:true},
			ready: function() {
				$.beautyOfCode.beautifyAll();
			}
		});
	}
	
	function fixWT(){
				
		if(URI.search('forum/') != -1){
		
			$('table.forumline').each(function(){
				
				$(this).width(parseInt(opts['forumWidth']));
			});
		}
		
		if(URI.search('login/view.php') != -1){
		
			$('table.tb').each(function(){
			
				$(this).width(800);
			}).filter(':has(span),:has(form)').css('text-align', 'center');
		}
		
	}

    function letsJQuery() {
		
		$("tr:has(td.nava):last").before('<tr><td  class="nava"  width="130" height="25" >'
		+'<a href="javascript:WTOptions('+opts['doFixWT']+', '+opts['doRunBoc']+', \''+opts['forumWidth']+'\', \''+cookieSupport+'\');">'
		+'&nbsp;&nbsp;&nbsp;&nbsp;WT '+translate('Opcii')+'</a>'
		+'</td></tr>');
		
		if(opts['doFixWT'] == 'true'){
			
			fixWT();
		}
		
		if( (URI.search('forum/viewtopic') != -1 || URI.search('forum/posting') != -1) && opts['doRunBoc'] == 'true' ){
			
			determinLang();
			var defaultClass = highlightLang+' boc-no-wrap-lines';
			var run = 1;
			$('td.code').each(function(){
				
				
				$(this).attr('id', 'WTCodeBlockContainer'+run);
				var innerHTML = $(this).html();
				$("body").append('<span style="display:none !important;" id="WTCodeBlockStore'+run+'"></span>');
				
				/* FOR dynamicLangChange
					$('#WTCodeBlockStore'+run).html(innerHTML);
				*/
				innerHTML = formatCode(innerHTML);
				$(this).css({'border':'0'});
				$(this).html('<pre class="code" id="WTCodeBlock'+run+'"><code class="'+defaultClass+'">'+innerHTML+'</code></pre>');
				run++;
			});
			
			runBOC();
			
		}else if( URI.search('login/view.php') != -1 && opts['doRunBoc'] == 'true' ){
		
			$('table.table').each(function(){
			
				$(this).css({
					'background-color': 'white',
					'border': 0
				})
			});
			determinLangForLessons();
			var defaultClass = highlightLang+' boc-no-wrap-lines';
			var run = 1;
			$('table.table').each(function(){
				
				
				$(this).attr('id', 'WTCodeBlockContainer'+run);
				var innerHTML = $(this).html();
				$("body").append('<span style="display:none !important;" id="WTCodeBlockStore'+run+'"></span>');
				
				/* FOR dynamicLangChange
					$('#WTCodeBlockStore'+run).html(innerHTML);
				*/
				
				innerHTML = formatCode(innerHTML);
				$(this).css({'border':'0'});
				$(this).html('<pre class="code" id="WTCodeBlock'+run+'"><code class="'+defaultClass+'">'+innerHTML+'</code></pre>');
				run++;
			});
			
			runBOC();
		}
		
		
    }

	function formatCode(code){
	
		return code.replace(/<br>{1,}/g,'\n').replace(/\n{1,}/g,'\n\n');
	}
	
	function WTOptions(doFixWT, doRunBoc, forumWidth, cookieSupport){
		
		var isCheckedFixWT = (doFixWT == true)?'checked="checked"':'';
		var cookies = '';
		var isCheckedRunBoc = (doRunBoc == true)?'checked="checked"':'';
		$('body').append('<div id="WTCodeWooContainer"></div><div id="WTCodeWoo">'
		+'<div style="font-size:25px;margin-left:150px;">'+translate('Opcii')+'</div><br><br>'
		+translate('Razshirjavane na')+' WT: <input type="checkbox" name="fixWT" id="fixWT" '+isCheckedFixWT+'">'+
		'<br>'+translate('Shirina na')+' WT: <input type="text" size="5" name="forumWidth" id="forumWidth" value="'+forumWidth+'" style="background-color:white !important;">'+
		'<br>'+translate('Ocvetjavane na koda')+': <input type="checkbox" name="runBOC" id="runBOC" '+isCheckedRunBoc+'>'+
		'<br><div style="margin-top:55px;"><a href="javascript:void(0)"'
		+' onClick="setOpts('+cookieSupport+');$(\'#WTOptsClose\').triggerHandler(\'click\')">'+translate('Zapazi nastrojkite')+'</a>'
		+'<a style="margin-left:200px;" href="javascript:void(0);" onClick="$(\'#WTCodeWooContainer\').fadeOut(2000);$(\'#WTCodeWoo\').slideUp(1000);" id="WTOptsClose">'+translate('Zatvori')+'</a></div>'+
		'</div>');
		
		$('#WTCodeWoo').css({
			'display':'none',
			'z-index':'1100',
			'position':'absolute',
			'top':'50%',
			'left':'50%',
			'margin': '-100px 0 0 -200px',
			'padding': '20px 20px 20px 20px',
			'border': '2px solid red',
			'background-color': 'white',
			'-moz-border-radius': '10',
			'width':'400px',
			'height':'200px'
		});
		
		$('#WTCodeWooContainer').css({
			'display':'none',
			'z-index': '1000',
			'position': 'fixed',
			'top': 0,
			'left': 0,
			'width': '100%',
			'height': '100%',
			'background-color': 'black',
			'opacity': 0.5
		});
		$('#WTCodeWooContainer').fadeIn(1000);
		$('#WTCodeWoo').slideDown(1000);
	}
	
	function setOpts(cookies){
				
		if(cookies){
			
			var cookie = '';
			$('#WTCodeWoo > input').each(function(){
			
				if(cookie != '') cookie += '@@';
				var name = $(this).attr('name');
				
				if(name == 'forumWidth'){
				
					var value = $(this).val();
					
				}else{
				
					var value = $(this).is(':checked');
				}
				cookie +=name+'::'+value+"";
			});
			createCookie('WTEnhancerOptions', cookie);
			
		}else{
		
			alert('I need cookies!');
		}
	}
	
	function createCookie(name,value,days) {
	
		if (days) {

			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
			
		}else{
		
			var expires = "";
		}
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
	
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			
			var c = ca[i];
			while (c.charAt(0)==' '){
				
				c = c.substring(1,c.length);
			}
			if (c.indexOf(nameEQ) == 0){
				
				return c.substring(nameEQ.length,c.length); 
			}
		}
		return null;
	}
	
	function testCookieSupport(){
	
		createCookie('CookieTest', true);
		
		if(readCookie('CookieTest') != null){
			
			eraseCookie('CookieTest');
			cookieSupport = true;
		}
	}
	
	function eraseCookie(name) {
	
		createCookie(name,"",-1);
	}

	function checkSettingsCookie(){
	
		var cookieSettings = readCookie('WTEnhancerOptions');
		if(cookieSettings != null){
		
			var ca = cookieSettings.split('@@');
			for(var i=0;i < ca.length;i++) {
			
				var options = ca[i].split('::');
				GM_setValue(options[0], options[1]);
				opts[options[0]] = options[1];
			}
			eraseCookie('WTEnhancerOptions');
		}
	}
	
	/* TODO
	
		function dynamicLangChange(){
		
			var codeHTML = $('#WTCodeBlockStore1').html();
			codeHTML = codeHTML.replace(/<br>{1,}/g,'\n').replace(/\n{1,}/g,'\n');
			$("#WTCodeBlockContainer1").html('<pre class="code" id="WTCodeBlock1"><code class="html boc-no-wrap-lines">'+codeHTML+'</code></pre>');
			runBOC();
		}
		
	*/
	
	function translate(string){
	
		var charTable = {
		  'A': '\u0410',                       'a': '\u0430',
		  'B': '\u0411',                       'b': '\u0431',
		  'V': '\u0412',                       'v': '\u0432',
		  'G': '\u0413',                       'g': '\u0433',
		  'D': '\u0414',                       'd': '\u0434',
		  'E': '\u0415',                       'e': '\u0435',
		  'Yo': '\u0401',                      'yo': '\u0451',
		  'Zz': '\u0416',                      'zh': '\u0436',
		  'Z': '\u0417',                       'z': '\u0437',
		  'I': '\u0418',                       'i': '\u0438',
		  'J': '\u0419',                       'j': '\u0439',
		  'K': '\u041A',                       'k': '\u043A',
		  'L': '\u041B',                       'l': '\u043B',
		  'M': '\u041C',                       'm': '\u043C',
		  'N': '\u041D',                       'n': '\u043D',
		  'O': '\u041E',                       'o': '\u043E',
		  'P': '\u041F',                       'p': '\u043F',
		  'R': '\u0420',                       'r': '\u0440',
		  'S': '\u0421',                       's': '\u0441',
		  'T': '\u0422',                       't': '\u0442',
		  'U': '\u0423',                       'u': '\u0443',
		  'F': '\u0424',                       'f': '\u0444',
		  'X': '\u0425', 'H': '\u0425',        'x': '\u0445', 'h': '\u0445',
		  'C': '\u0426', 'Ts': '\u0426',       'c': '\u0446', 'ts': '\u0446',
		  'Ch': '\u0427',                      'ch': '\u0447',
		  'Sh': '\u0428',                      'sh': '\u0448',
		  'w': '\u0429',                       'w': '\u0449',
		  '""': '\u042A',                      "''": '\u044A',
		  'Y': '\u042B',                       'y': '\u044B',
		  '"': '\u042C',                       "'": '\u044C',
		  'Je': '\u042D',                      'je': '\u044D',
		  'Ju': '\u042E', 'Yu': '\u042E',      'ju': '\u044E', 'yu': '\u044E',
		  'Ja': '\u042F', 'Ya': '\u042F',      'ja': '\u044F', 'ya': '\u044F'
		};
		
		var newString = "";
		
		for(var i=0;i<string.length;i++){
			
			
			if(string[i] == " " || string[i] == "" || string[i] == null){
			
				newString += string[i];
			}else{
			
				var nextChar = (i == (string.length-1))?'':string[parseInt(i+1)].toLowerCase();
				var text = charTable[string[i]+nextChar];
				if(text){
				
					newString += text;
					i++;
				}else{
					
					text = charTable[string[i]];
					if(text){
					
						newString += text;
					}
					
				}
			}
		}
		
		return newString;
	}
	
	function embedFunction(s) {
	
		var script = document.createElement('script');
		var functionText = s.toString();
		functionText.replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
		script.innerHTML = functionText;
		document.getElementsByTagName('body')[0].appendChild(script);
	}
	
	function runWTEnhancer(){
		
		checkSettingsCookie();
		GM_wait();
		testCookieSupport();
		//embedFunction(dynamicLangChange);
		embedFunction(setOpts);
		embedFunction(runBOC);
		embedFunction(createCookie);
		embedFunction(WTOptions);
		embedFunction(translate);
		//GM_registerMenuCommand("WT Options", WTOptions);
	}
	
	runWTEnhancer();