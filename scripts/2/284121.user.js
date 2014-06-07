// ==UserScript==
// @name           Google Translator Tooltip
// @namespace      mefra
// @description    Translates selected text into a tooltip.
// @include        http://*
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @grant 		GM_getValue
// @grant 		GM_setValue
// @grant 		GM_log
// @grant 		GM_xmlhttpRequest 
// ==/UserScript==
const HREF_NO = 'javascript:void(0)';
const MAX_Z = 2147483640;
var imgLookup;
var txtSel; // text selected
var currentURL;
var languagesGoogle;
var timerWindowResize;
var initialized = false;
var COLOR_BG1, COLOR_BG2, COLOR_TEXT, COLOR_LINK;
var	colorschemes = [
	
	{name:'Default', bg1:'#FFFF77', bg2:'#FFFFAA', link:'#0000FF', text:'#333333'},
	{name:'Dark', bg1:'#333', bg2:'#555', link:'#ddd', text:'#eee'},
	
	// http://www.colorschemer.com/schemes/viewscheme.php?id=9456
	{name:'Dark green', bg1:'#284030', bg2:'#5D7350', link:'#FAFCB6', text:'#E2F0A8'},
	
	//http://www.colorschemer.com/schemes/viewscheme.php?id=315
	{name:'Dark blue', bg1:'#2D4358', bg2:'#3A5065', link:'#b5cce3', text:'#b5cce3'},	
	
	//http://www.colorschemer.com/schemes/viewscheme.php?id=9603
	{name:'Dark red', bg1:'#751310', bg2:'#9C1B19', link:'#FAEFE0', text:'#FAEFE0'},//DEB990
	
	//http://www.colorschemer.com/schemes/viewscheme.php?id=158
	{name:'Light green', bg1:'#4F724F', bg2:'#649064', link:'#EDF8ED', text:'#EDF8ED'},	
	
	//http://www.colorschemer.com/schemes/viewscheme.php?id=158
	{name:'Light blue', bg1:'#4D6680', bg2:'#647A90', link:'#EDF2F8', text:'#EDF2F8'}
]

//setup events
document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);
window.addEventListener('resize', windowResizeHandler, false);

function mousedownCleaning(evt){

	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	
	if(divDic)
	{
		if(!clickedInsideID(evt.target,'divDic')){
			divDic.parentNode.removeChild(divDic);
		}
	}	
	
	if(divLookup)
		divLookup.parentNode.removeChild(divLookup);
}


function showLookupIcon(evt){
	
	if(evt.ctrlKey && evt.altKey && (!GM_getValue('ctrl') || !GM_getValue('alt')))
		return;
	//XOR http://www.howtocreate.co.uk/xor.html
	if(evt.ctrlKey ? !GM_getValue('ctrl') : GM_getValue('ctrl'))
		return;
	if(evt.altKey ? !GM_getValue('alt') : GM_getValue('alt'))
		return;		
	

	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	txtSel = getSelection(evt);
	
	//exit if no text is selected
	if(!txtSel || txtSel=="")
	{
		if(divDic)
		{
			if(!clickedInsideID(evt.target,'divDic')){
				divDic.parentNode.removeChild(divDic);
				deselect();
			}
		}
		if(divLookup)
			divLookup.parentNode.removeChild(divLookup);
		
		return;
	}


	//possible cleanup
	if(divDic)
	{
		if(!clickedInsideID(evt.target,'divDic')){
			divDic.parentNode.removeChild(divDic);
			deselect();
		}
		
		return;
	}

	
	//remove div if exists
	if(divLookup)
	{
		divLookup.parentNode.removeChild(divLookup);
	}	
	
	
	if(!initialized){
		initialized = true;
		images();
		if( GM_getValue('opt_youtube') == undefined ){
			GM_setValue('opt_youtube',true)
			GM_setValue('opt_youtube_auto',true)
			GM_setValue('opt_compare',true)
		}
	}
	css(true);	
	
	
	//div container
	divLookup = createElement('div', {id: 'divLookup', style: 'top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX + window.pageXOffset + 10) + 'px;'});
	divLookup.appendChild(imgLookup.cloneNode(false));
	divLookup.addEventListener('mouseover', lookup, false);
	document.body.appendChild(divLookup);	
	if(GM_getValue('opt_shadow')==true)
		$(divLookup).addClass('classShadowww')	
	
	repositionNode($('#divLookup'));
}




function lookup(evt){

	var divResult = null;
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	var top = divLookup.style.top;
	var left = divLookup.style.left;


	//no text selected
	if(!txtSel || txtSel==""){
		if(divDic = getId('divDic'))
			divDic.parentNode.removeChild(divDic);
		return;
	}
	
	
	//cleanup divs
	if(divDic = getId('divDic'))
	{
		divDic.parentNode.removeChild(divDic);
	}	
	divLookup.parentNode.removeChild(divLookup);
	
	
	//div container
	divDic = createElement('div', {id:'divDic'});
	divDic.style.top = top;
	divDic.style.left = left;
	divDic.addEventListener('mousedown', dragHandler, false);
	document.body.appendChild(divDic);
	if(GM_getValue('opt_shadow')==true)
		$(divDic).addClass('classShadowww')

	
	//div result
	divResult = createElement('div', {id:'divResult'}, null, 'Loading...');
	divDic.appendChild(divResult);	
	

	//options link
	divDic.appendChild(createElement('span', {id:'optionsLink', title:'options', href:HREF_NO}, 'click toggleOptions false', '>>'));

	//lookup
	if( txtSel.search(/^\s*https?:\/\//) > -1 ) 
	{
		divResult.innerHTML = '<a class="gootranslink" href="'+txtSel+'" target="_blank" >'+txtSel+'</a>';
		if(GM_getValue('opt_youtube') && isYoutubeLink(txtSel) )
			return;		
	}
	else if( txtSel.search(/^\s*\S+(\.\S+)+/) > -1 ) // site.dom
	{
		divResult.innerHTML = '<a class="gootranslink" href="http://'+txtSel+'" target="_blank" >'+txtSel+'</a>';
		if(GM_getValue('opt_youtube') && isYoutubeLink(txtSel) )
			return;
	}
	else 
	{
		var sl, tl, lang;
		sl = GM_getValue('from') ? GM_getValue('from') : "auto";
		tl = GM_getValue('to') ? GM_getValue('to') : "auto";
		lang = sl + "|" + tl;
		currentURL = "http://www.google.com/translate_t?text=" + txtSel + "&langpair=" + lang;
		GM_xmlhttpRequest({
			method: 'GET',
			url: currentURL,
			onload: function(resp) {
				try{
					extractResultFrames(resp);
				}catch(e){
					GM_log(e);
				}
			}
		});	
	}
	
	repositionNode($('#divDic'));
	
	//store query as attribute
	getId('divDic').setAttribute('query', txtSel);
	
	//other searches
	divDic.appendChild(createElement('span',{id:'spanOtherSearches', title:'search other sites'},'mouseover otherSites false','+'));	
}

function quickLookup(){

	getId('divResult').innerHTML = 'Loading...'
	currentURL = "http://www.google.com/translate_t?text=" + $('#divDic').attr('query') + "&langpair=" + getId('optSelLangFrom').value + "|" + getId('optSelLangTo').value;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: currentURL,
		onload: function(resp) {
			try{
				extractResultFrames(resp);
			}catch(e){
				GM_log(e);
			}
		}
	});	
}


function otherSites(evt){

	var ul, li, query = getId('divDic').getAttribute('query').replace(/\s+$/,'').replace(/^\s+/,'');

	var sites = [
	
		{name:'Google', href:'http://www.google.com/search?q='+query.replace(/\s+/g,'+')},
		
		{name:'Google Images', href:'http://www.google.com/images?q='+query.replace(/\s+/g,'+')},
		
		{name:'The Free Dictionary', href:'http://www.thefreedictionary.com/'+query.replace(/\s+/g,'+')},
		
		{name:'Urban Dictionary', href:'http://www.urbandictionary.com/define.php?term='+query.replace(/\s+/g,'+')},
		
		{name:'Linguee', href:'http://www.linguee.com/search?query='+query.replace(/\s+/g,'+')},
		
		{name:'Wikipedia', href:'http://www.wikipedia.org/w/index.php?title=Special%3ASearch&search='+query.replace(/\s+/g,'+')},
		
		{name:'IMDb', href:'http://www.imdb.com/find?s=all&q='+query.replace(/\s+/g,'+')},
		
		{name:'Youtube', href:'http://www.youtube.com/results?search_query='+query.replace(/\s+/g,'+')}

	];
	
	getId('divDic').appendChild(createElement('br'));
	getId('divDic').appendChild(document.createTextNode('Search "'+(query.match(/^[\s\S]{15}/) ? query.match(/^[\s\S]{15}/)[0]+'...' : query.match(/^[\s\S]+/)[0] )+'" at:'));
	ul = getId('divDic').appendChild(createElement('ul'));
	
	for(var i=0; i<sites.length; i++){
		li = ul.appendChild(createElement('li'));
		li.appendChild(createElement('a', {class:'gootranslink', target:'_blank', href:sites[i].href}, null, sites[i].name));
	}
	
	evt.target.parentNode.removeChild(evt.target);
	
	repositionNode($('#divDic'));
}


function extractResultFrames(resp){	

	//select body and remove some tags
	var html = resp.responseText.match(/\<body[^\>]*\>([\s\S]+)\<\/body\>/)[1];
	html = html.replace(/\<script[^\<]+\<\/script\>/ig, '');
	html = html.replace(/\<iframe[^\<]+\<\/iframe\>/ig, '');
	
	//append requested page as hidden iframe
	var iframe = document.body.appendChild(createElement('iframe', {style:'visibility:hidden;'}));	
	var divExtract = iframe.contentWindow.document.body.appendChild(createElement('div', {id:'divExtract'}, null, html));
	divExtract = document.importNode(divExtract, true);
	iframe.parentNode.removeChild(iframe);
 
	//adjust link(s)
	var arrs = getTag('a',divExtract);
	for(var i=0; i<arrs.length; i++){
		arrs[i].setAttribute('target','_blank');
		arrs[i].setAttribute('class','gootranslink');
	}
	
	//gather info
	var translation = trim( xp('.//span[@id="result_box"]', divExtract)[0].textContent );
	var dict = xp('.//div[@id="gt-res-dict"]', divExtract)[0];
	if(dict){
		try{
			dict.removeChild(getTag('h3',dict)[0]);
			dict = dict.innerHTML;
		}catch(e){
			dict = null;
		}
	}	
	
	//parse info
	getId('divResult').innerHTML = '<a class="gootranslink" href="'+currentURL+'" target="_blank">' 
		+ translation 
		+ '</a>'
		+ '<div id="divCompareee" ' + (GM_getValue('opt_compare')==true ? '' : 'style="display:none;"') + '>' + $('#divDic').attr('query') + '</div>';
	if(dict)
	{
		getId('divResult').innerHTML += '<br><br><div id="dict">'+dict+'</div>';
	}
	
	repositionNode($('#divDic'));
}

function repositionNode(node){
	//reposition div if out of bounds
	var pos = node.offset();
	if(pos==null)
		return;
	var w = node.width();
	var h = node.height();
	if(pos.left + w > window.innerWidth+window.pageXOffset){
		node.css('left', window.innerWidth+window.pageXOffset - w - 25);
	}
	if(pos.top + h > window.innerHeight+window.pageYOffset){
		node.css('top', window.innerHeight+window.pageYOffset - h - 25);
	}
}

function repositionNodeFixed(node,pad){
	//reposition fixed node if out of window
	var pos = node.offset();
	if(pos==null)
		return;
	var w = node.width();
	var h = node.height();
	if(pos.left + w > window.innerWidth+window.pageXOffset){
		node.css('left', window.innerWidth- w - (pad?pad:25));
	}
	if(pos.top + h > window.innerHeight+window.pageYOffset){
		node.css('top', window.innerHeight - h - (pad?pad:25));
	}
}

function trim(str){
	return str.replace(/^\s+/,'').replace(/\s+$/,'');
}


function getSelection(evt){

	var txt = null;
	//get selected text
	if(evt && evt.target.nodeName=='TEXTAREA')
	{
		 //var begin = evt.target.value.substr(0, evt.target.selectionStart); 
		 txt = evt.target.value.substr(evt.target.selectionStart, evt.target.selectionEnd - evt.target.selectionStart); 
		 //var end = evt.target.value.substr(evt.target.selectionEnd); 
		 //myArea.value = begin + text1 + selection + text2 + end; 		
	}
	else if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}
	
	try{
		return txt.toString();
	}catch(e){
		return txt;
	}
}

//http://stackoverflow.com/questions/6186844/clear-a-selection-in-firefox/6187098#6187098
function deselect(){
	try{ 
		window.getSelection().removeAllRanges()
	}catch(e){
		document.selection.empty()
	}
}


function isYoutubeLink(txt){
	var id, time=null;
	if(txt.search(/youtube\.com\/watch\?/) > -1)
		id = txt.match(/[\?\&]v\=([^\&]+)/)[1]
	else if(txt.search(/youtu.be\//) > -1)
		id = txt.match(/youtu.be\/([^\?]+)/)[1]
	else if(txt.search(/youtube\.com\/v\/[^\?]+/) > -1) //embed url
		id = txt.match(/youtube\.com\/v\/([^\?]+)/)[1]
	else
		return false;
	
	//if skip to timestamp
	try{ 
		time = txt.match(/[\?\&\#](t\=[^\&]+)/)[1];
	}catch(e){
		time = null;
	}
	if(time!=null){
		//convert to seconds for parameter "start"
		var h, m, s;
		try{ h = parseInt(time.match(/(\d+)h/)[1]); }catch(e){ h = 0; }
		try{ m = parseInt(time.match(/(\d+)m/)[1]); }catch(e){ m = 0; }
		try{ s = parseInt(time.match(/(\d+)s/)[1]); }catch(e){ s = 0; }
		time = s + (m*60) + (h*60*60);
	}else{
		//if embed url ( http://www.youtube.com/v/vIdEoIddD?fs=1&autoplay=1&start=34 )
		if(txt.search(/[\?\&]start\=\d+/) > -1)
			time = txt.match(/start\=(\d+)/)[1];
	}
		
	//clear selection
	deselect();	
		
	//check if video is already opened
	if( $('.classDivYoutubeeee[ytvid="'+id+'"]').length > 0 ){
		var div = $('.classDivYoutubeeee[ytvid="'+id+'"]:first');
		if(div.hasClass('classYoutubeMinimizeddd')){
			toggleYoutubeSize({target: div.find('.classtoggleSize:first').get(0)})
		}
		div.effect('shake',{times:2})
		//remove lookup icon, div dict
		$('#divDic,#divLookup').remove()
		return true;
	}

	// create video div
	var auto = GM_getValue('opt_youtube')==true && GM_getValue('opt_youtube_auto')==true ? 1 : 0;
	var url = 'http://www.youtube.com/v/' + id + '?fs=1&autoplay=' + auto + ( time!=null ? '&start='+time : '');
	var pos = $('#divDic').offset();
	var div = $('<div>')
		.attr('ytvid',id)
		.addClass('classDivYoutubeeee')
		.css({backgroundColor:COLOR_BG1, position:'fixed', top:Math.abs(window.pageYOffset-pos.top), left:Math.abs(window.pageXOffset-pos.left), zIndex:MAX_Z, padding:'0px 26px', borderRadius:'5px'})
		.appendTo(document.body)
		.append(
			$('<span title="close">').css({float:'right', cursor:'pointer',color:COLOR_LINK, marginLeft:7}).append('\u24E7').click(function(evt){
				$(this).parents('.classDivYoutubeeee:first').remove();
			})
		)
		.append(
			$('<span class="classtoggleSize" title="toggle size">').css({float:'right', cursor:'pointer',color:COLOR_LINK, marginLeft:7}).append('\u21F2').click(toggleYoutubeSize)
		)	
		.append('<br><object><param name="movie" value="'+url+'"</param><param name="allowFullScreen" value="true"></param><embed src="'+url+'"  type="application/x-shockwave-flash"  allowfullscreen="true"  width="425" height="344"></embed></object><br><br>')
		.draggable()
		
	//add shadow
	if(GM_getValue('opt_shadow')==true)
		div.addClass('classShadowww')
		
	//position
	repositionNodeFixed(div);
	
	//remove lookup icon, div dict
	$('#divDic,#divLookup').remove()

	return true;
}


function toggleYoutubeSize(evt){
	
	var div = $(evt.target).parents('.classDivYoutubeeee:first');
	var ytlink = div.find('a[href*="youtube.com"]');
	var pos = div.offset();

	if(!div.hasClass('classYoutubeMinimizeddd')){ // minimize
		
		ytlink.hide();
		div.addClass('classYoutubeMinimizeddd');
		
		//backup div position
		div.attr({prevlefttt: Math.abs(window.pageXOffset - pos.left), prevtoppp: Math.abs(window.pageYOffset - pos.top)})
		
		//resize div
		div.find('embed').attr({width:'212.5', height:'172'})
		
		//position div
		div.css({top:window.innerHeight-div.outerHeight()-7, left:window.innerWidth-div.outerWidth()-13})
		if($('.classYoutubeMinimizeddd').length > 1){//distribute minimized divs
			var len = $('.classYoutubeMinimizeddd').length;
			var top = div.offset().top;
			var left = div.offset().left;
			left -= (div.outerWidth()+7) * (len-1);
			if(left < 0){
				left = div.offset().left;
			}
			div.css({left:left})
		}
		
		//change icon to maximize
		evt.target.innerHTML = '\u21F1';
	
	}else{ // restore
	
		ytlink.show();
		div.removeClass('classYoutubeMinimizeddd');
		
		//restore div position
		div.css({top:div.attr('prevtoppp')+'px', left:div.attr('prevlefttt')+'px'})
		
		//restore div size
		div.find('embed').attr({width:'425', height:'344'})
		
		//set minimize icon
		evt.target.innerHTML = '\u21F2';
	}
}


function windowResizeHandler(evt){
	clearTimeout(timerWindowResize);
	timerWindowResize = setTimeout(windowResized,333);
}

function windowResized(evt){
	if($('#divDic,.classDivYoutubeeee').length==0)
		return;
	
	if($('#divDic').length > 0)
		repositionNodeFixed($('#divDic'));
	
	if($('.classDivYoutubeeee').length > 0){
		var vids = $('.classDivYoutubeeee');
		for(var i=0; i<vids.length; i++)
			repositionNodeFixed(vids.eq(i),35);
	}
}

function toggleOptions(evt){

	if(!languagesGoogle){
		languagesGoogle = '<option value="auto">Detect language</option><option  value="sq">Albanian</option><option  value="ar">Arabic</option><option  value="bg">Bulgarian</option><option  value="ca">Catalan</option><option  value="zh-TW">Chinese_TC</option><option  value="zh-CN">Chinese</option><option  value="hr">Croatian</option><option  value="cs">Czech</option><option  value="da">Danish</option><option  value="nl">Dutch</option><option  value="en">English</option><option  value="et">Estonian</option><option  value="tl">Filipino</option><option  value="fi">Finnish</option><option  value="fr">French</option><option  value="gl">Galician</option><option  value="de">German</option><option  value="el">Greek</option><option  value="iw">Hebrew</option><option  value="hi">Hindi</option><option  value="hu">Hungarian</option><option  value="id">Indonesian</option><option  value="it">Italian</option><option  value="ja">Japanese</option><option  value="ko">Korean</option><option  value="lv">Latvian</option><option  value="lt">Lithuanian</option><option  value="mt">Maltese</option><option  value="no">Norwegian</option><option  value="pl">Polish</option><option  value="pt">Portuguese</option><option  value="ro">Romanian</option><option  value="ru">Russian</option><option  value="sr">Serbian</option><option  value="sk">Slovak</option><option  value="sl">Slovenian</option><option value="es">Spanish</option><option  value="sv">Swedish</option><option  value="th">Thai</option><option  value="tr">Turkish</option><option  value="uk">Ukrainian</option><option  value="vi">Vietnamese</option>';
	}
	var divOptions = getId('divOpt');
	
	if(!divOptions)//show options
	{
		divOptions = createElement('div', {id:'divOpt'});
		getId('divDic').appendChild(divOptions);
		getId('optionsLink').style.visibility = 'hidden';

		
		//from
		divOptions.appendChild(createElement('span', null, null,'From:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
		getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : "auto";
		getId('optSelLangFrom').addEventListener('change', quickLookup, false);
		
		//to
		divOptions.appendChild(createElement('span', null, null,' To:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangTo'}, null, languagesGoogle));
		getId('optSelLangTo').value = GM_getValue('to') ? GM_getValue('to') : "auto";
		getId('optSelLangTo').addEventListener('change', quickLookup, false);
		
		//use ctrl 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkCtrl', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Use Ctrl key'));
		getId('checkCtrl').checked = GM_getValue('ctrl');

		//use alt 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkAlt', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Use Alt key'));
		getId('checkAlt').checked = GM_getValue('alt');

		//Compare 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkCompare', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Compare translation to original'));
		getId('checkCompare').checked = GM_getValue('opt_compare');
		$('#checkCompare').click(function(evt){
			if(this.checked){
				$('#divCompareee').show()
			}else{
				$('#divCompareee').hide()
			}
		})
		
		//box shadow
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkShadowww', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Show box shadow'));
		getId('checkShadowww').checked = GM_getValue('opt_shadow');
		$('#checkShadowww').click(function(evt){
			if(this.checked){
				$('#divDic').addClass('classShadowww')
			}else{
				$('.classShadowww').removeClass('classShadowww')
			}
		})
		
		//youtube
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkYoutubeee', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Preview Youtube links'));
		getId('checkYoutubeee').checked = GM_getValue('opt_youtube');
		$(divOptions).append(
			$('<div id="divOptYoutubeee">')
				.css({display: GM_getValue('opt_youtube')==true?'block':'none'})
				//.append('<br>')
				.append('&nbsp;&nbsp;&nbsp;&nbsp;<input id="checkYoutubeAutoplayyy" type="checkbox">')
				.append('autoplay video')
		)
		getId('checkYoutubeAutoplayyy').checked = GM_getValue('opt_youtube_auto');
		$('#checkYoutubeee').click(function(evt){
			if(this.checked){
				$('#divOptYoutubeee').show()
			}else{
				$('#divOptYoutubeee').hide()
			}
		})		
		
		//colors
		$(divOptions).append(
			'<br>'
			+'<table id="tablecolorrr">'
				+'<tr><td>Color schemes:</td><td colspan=2><select id="selectColorSchemesss"><option value=""></option></select> <a class="gootranslink" id="spanNewColorSchemeee" statusss="hidden" href="'+HREF_NO+'">customize</span> </td></tr>'
				+'<tr style="display:none;"> <td>Background 1:</td> <td><input type="text" size="10" id="inputbgcolor111" value="'+COLOR_BG1+'" /></td> <td><input class="simplecolorrr" id="bgcolor111" value="'+COLOR_BG1+'" /></td> </tr>'
				+'<tr style="display:none;"><td>Background 2:</td> <td><input type="text" size="10" id="inputbgcolor222" value="'+COLOR_BG2+'" /></td> <td><input class="simplecolorrr" id="bgcolor222" value="'+COLOR_BG2+'" /></td> </tr>'
				+'<tr style="display:none;"><td>Text:</td> <td><input type="text" size="10" id="inputtxttt" value="'+COLOR_TEXT+'" /></td> <td><input class="simplecolorrr" id="textcolorrr" value="'+COLOR_TEXT+'" /></td></tr>'
				+'<tr style="display:none;"><td>Link:</td> <td><input type="text" size="10" id="inputlinkkk" value="'+COLOR_LINK+'" /></td> <td><input class="simplecolorrr" id="linkcolorrr" value="'+COLOR_LINK+'" /></td></tr>'
			+'</table>'
		)
		$('.simplecolorrr').simpleColor({boxWidth:'0px', boxHeight:'0px', buttonClass:'classButtonColorrr'});
		$('#bgcolor111, #bgcolor222, #linkcolorrr, #textcolorrr').change(optColorPickerChanged);
		$('#inputbgcolor111, #inputbgcolor222, #inputlinkkk, #inputtxttt').keyup(optColorInputCtphanged);
		for(var i=0; i<colorschemes.length; i++){
			$('#selectColorSchemesss').append('<option value="'+colorschemes[i].name+'">'+colorschemes[i].name+'</option>')
		}
		$('#selectColorSchemesss').change(changeColorScheme)
		$('#spanNewColorSchemeee').click(function(evt){
			if($('#spanNewColorSchemeee').attr('statusss')=='hidden'){
				$('#tablecolorrr tr:not(:first-child)').show();
				$('#spanNewColorSchemeee').attr('statusss','visible');
			}else{
				$('#tablecolorrr tr:not(:first-child)').hide();
				$('#spanNewColorSchemeee').attr('statusss','hidden');
			}
		})
		
		
		//save
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click saveOptions false', 'save'));
		
		//cancel
		divOptions.appendChild(createElement('span', null, null,'&nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, class:"gootranslink"}, 'click toggleOptions false', 'cancel'));
		
		repositionNode($('#divDic'));
		
	}
	else//cancel options
	{
		divOptions.parentNode.removeChild(divOptions);
		getId('optionsLink').style.visibility = 'visible';
		css(true)
	}
}

function changeColorScheme(evt){
	var name = this.value;
	if(name=='')
		return;
	var sch = getColorSchemeByName(name);
	if(sch == null){
		return;
	}
	COLOR_BG1 = sch.bg1;
	COLOR_BG2 = sch.bg2;
	COLOR_TEXT = sch.text;
	COLOR_LINK = sch.link;
	css();
	$('#inputbgcolor111').val(COLOR_BG1)
	$('#inputbgcolor222').val(COLOR_BG2)
	$('#inputtxttt').val(COLOR_TEXT)
	$('#inputlinkkk').val(COLOR_LINK)
}

function getColorSchemeByName(name){
	for(var i=0; i<colorschemes.length; i++){
		if(name == colorschemes[i].name)
			return colorschemes[i];
	}
	return null;
}

function optColorInputChanged(evt){ 
	var id, color = evt.target.value;
	
	// http://networking.mydesigntool.com/viewtopic.php?tid=415&id=31
	if(!isColorValid(color)){
		return;
	}
	if(color.charAt(0)!='#'){
		color = '#'+color;
	}
	
	id = evt.target.getAttribute('id');		
	
	if(id=='inputbgcolor111'){
		COLOR_BG1 = color;
		css();
	}else if(id=='inputbgcolor222'){
		COLOR_BG2 = color;
		css();	
	}else if(id=='inputtxttt'){
		COLOR_TEXT = color;
		css();	
	}else if(id=='inputlinkkk'){
		COLOR_LINK = color;
		css();	
	}	
}

function isColorValid(color){
	return (color.search(/^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/) == 0);
}

function optColorPickerChanged(evt){ 
	var color = evt.target.value;
	var id = evt.target.getAttribute('id');
	if(id=='bgcolor111'){
		COLOR_BG1 = color;
		$('#inputbgcolor111').val(color)
		css();
	}else if(id=='bgcolor222'){
		COLOR_BG2 = color;
		$('#inputbgcolor222').val(color)
		css();	
	}else if(id=='textcolorrr'){
		COLOR_TEXT = color;
		$('#inputtxttt').val(color)
		css();	
	}else if(id=='linkcolorrr'){
		COLOR_LINK = color;
		$('#inputlinkkk').val(color)
		css();	
	}
}

function saveOptions(evt){

	var from = getId('optSelLangFrom').value;
	var to = getId('optSelLangTo').value;
	var ctrl = getId('checkCtrl').checked;
	var alt = getId('checkAlt').checked;
	var compare = getId('checkCompare').checked;
	var shadow = getId('checkShadowww').checked;
	var yt = getId('checkYoutubeee').checked;
	var ytauto = getId('checkYoutubeAutoplayyy').checked;
	
	GM_setValue('from', from);
	GM_setValue('to', to);
	GM_setValue('ctrl', ctrl);
	GM_setValue('alt', alt);
	GM_setValue('opt_compare', compare);
	GM_setValue('opt_shadow', shadow);	
	GM_setValue('opt_youtube', yt);
	GM_setValue('opt_youtube_auto', ytauto);
	
	//colors
	if(!isColorValid($('#inputbgcolor111').val())){
		$('#inputbgcolor111').effect('pulsate');
		return;
	}
	if(!isColorValid($('#inputbgcolor222').val())){
		$('#inputbgcolor222').effect('pulsate');
		return;
	}
	if(!isColorValid($('#inputtxttt').val())){
		$('#inputtxttt').effect('pulsate');
		return;
	}
	if(!isColorValid($('#inputlinkkk').val())){
		$('#inputlinkkk').effect('pulsate');
		return;
	}	
	GM_setValue('opt_color_bg1', $('#inputbgcolor111').val() )
	GM_setValue('opt_color_bg2', $('#inputbgcolor222').val() )
	GM_setValue('opt_color_text', $('#inputtxttt').val() )
	GM_setValue('opt_color_link', $('#inputlinkkk').val() )
	
	css(true)	
	
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').style.visibility = 'visible';
}





function css(init){

	$('#css_googletranslatortooltip').remove();

	if(init==true){
		COLOR_BG1 = GM_getValue('opt_color_bg1') != undefined ? GM_getValue('opt_color_bg1') : '#FFFF77' ;
		COLOR_BG2 = GM_getValue('opt_color_bg2') != undefined ? GM_getValue('opt_color_bg2') : '#FFFFAA';
		COLOR_TEXT = GM_getValue('opt_color_text') != undefined ? GM_getValue('opt_color_text') : '#333333';
		COLOR_LINK = GM_getValue('opt_color_link') != undefined ? GM_getValue('opt_color_link') : '#0000FF';
		if(GM_getValue('opt_shadow')==true)
			$('#divDic,#divLookup').removeClass('classShadowww').addClass('classShadowww')
		else
			$('.classShadowww').removeClass('classShadowww')
	}
	
	var style = createElement('style', {id:'css_googletranslatortooltip', type:"text/css"}, null, ''
	
		+'a.gootranslink:link {color: '+COLOR_LINK+' !important; text-decoration: underline !important;}'    
		+'a.gootranslink:visited {color: '+COLOR_LINK+' !important; text-decoration: underline !important;}'
		+'a.gootranslink:hover {color: '+COLOR_LINK+' !important; text-decoration: underline !important;}'  
		+'a.gootranslink:active {color: '+COLOR_LINK+' !important; text-decoration: underline !important;}' 
		
		+'#divLookup { background:none !important; color:'+COLOR_TEXT+' !important; position:absolute; z-index:'+MAX_Z+'; border:none !important;}'
		+'#divLookup img { border:2px solid '+COLOR_BG1+' !important;}'
		
		+'#divDic { background-color:'+COLOR_BG1+' !important; color:'+COLOR_TEXT+' !important; position:absolute; min-width:250px; min-height:50px; max-width:50%; padding:5px; font-size:small; text-align:left; z-index:'+MAX_Z+'; border-radius:3px; line-height:1 !important; border:none !important; }'
		
		+'#divResult {overflow:auto; padding:3px !important; background-color:'+COLOR_BG1+' !important; color:'+COLOR_TEXT+' !important; border:none !important; margin:0 !important; padding:0 !important; line-height:1 !important;}'
		
		+'#divOpt { background-color:'+COLOR_BG2+' !important; position:relative; padding:5px !important; border:none !important; margin:0 !important; line-height:1 !important;}'
		
		+'#optionsLink {position:absolute; bottom:3px; right:5px; font-size:small; text-decoration:none; cursor:pointer;}'
		
		+'#spanOtherSearches {position:absolute; left:5px; bottom:3px; cursor:pointer; font-size:small;}'
		
		+'#dict { background-color:'+COLOR_BG2+' !important; color:'+COLOR_TEXT+' !important; padding:5px; -moz-border-radius:3px; margin-bottom:10px; max-height:180px; overflow-y:auto; overflow-x:hidden; font-size:small;}'
		
		//translation comparison div
		+'#divCompareee {margin-bottom:7px !important;}'
		
		//lists
		+'#divDic ul {margin: 7px 23px !important; list-style: disc outside none !important; padding:0 !important;}'+
		+'#dict > ol {list-style: none;}'
		+'#dict > ol > li {display:table-cell; }'
		
		//color options
		+'#tablecolorrr .simpleColorDisplay {display: none !important;}'
		+'#tablecolorrr {border:none !important; padding:0 !important; margin:0 !important;}'
		+'#tablecolorrr td {vertical-align: top !important; color:'+COLOR_TEXT+' !important; border:none !important; padding:0 !important; margin:0 !important;}'
		+'#tablecolorrr input, #tablecolorrr select {border:none !important; padding:0 !important; margin:0 !important; width:100% !important;}'
		+'#tablecolorrr td:first-child {text-align:right;}'
		+'#tablecolorrr .classButtonColorrr {vertical-align: top;}'
		
		//shadows
		+'.classShadowww { box-shadow: 3px 3px 10px #333 !important; }' 
	);
	getTag('head')[0].appendChild(style);
}








function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

function xp(p, context, doc) {
  if (!context) 
	context = document;
  if (!doc) 
	doc = document;	
  var i, arr = [], xpr = doc.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}

function debug(str)
{
	
	var d = document.getElementById('debugg');
	if(!d){
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; width:50%; z-index:999999999;');
		
		var closeButton = document.createElement('input');
		closeButton.setAttribute('id','closedebug');
		closeButton.setAttribute('type', 'button');
		closeButton.setAttribute('value', 'close');
		closeButton.setAttribute('onClick', 'this.parentNode.parentNode.removeChild(this.parentNode);');
		
		d = document.createElement('textarea');
		d.setAttribute('id','debugg');
		d.setAttribute('style',"height:150px; width:99%; margin:2px;");
		
		div.appendChild(d);
		div.appendChild(document.createElement('br'));
		div.appendChild(closeButton);
		document.body.appendChild(div);
	}
	d.innerHTML += '\n'+str;
	d.scrollTop = d.scrollHeight;
}

















/*
 * Drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */

var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle

var didDrag=false;								//set to true when we do a drag
	
	
function moveHandler(e){
	if (e == null) return;// { e = window.event } 
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
}

function dragCleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',dragCleanup,false);
	savedTarget.style.cursor=orgCursor;

	dragOK=false; //its been dragged now
	didDrag=true;
	
}

function dragHandler(e){

	var htype='-moz-grabbing';
	if (e == null) return;//{ e = window.event;}  // htype='move';} 
	var target = e.target;// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;

	if(target.nodeName!='DIV')
		return;
	else if(clickedInsideID(target, 'dict'))
		return;

	if (target = clickedInsideID(target, 'divDic')) {
		savedTarget=target;       
		target.style.cursor=htype;
		dragOK=true;
		dragXoffset = e.clientX-target.offsetLeft;
		dragYoffset = e.clientY-target.offsetTop;
		
		//set the left before removing the right
		target.style.left = e.clientX - dragXoffset + 'px';
		target.style.right = null;
		
		
		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',dragCleanup,false);
		return false;
	}
}

function clickedInsideID(target, id) {

	if (target.getAttribute('id')==id)
		return getId(id);
	
	if (target.parentNode) {
		while (target = target.parentNode) {
			try{
				if (target.getAttribute('id')==id)
					return getId(id);
			}catch(e){
			}
		}
	}
	
	return null;
}
//end drag code


/*
 * Images
 */
function images()
{
	imgLookup = createElement('img',{border:0});
	imgLookup.src = 'data:image/gif,GIF89a%12%00%12%00%B3%00%00%FF%FF%FF%F7%F7%EF%CC%CC%CC%BD%BE%BD%99%99%99ZYZRUR%00%00%00%FE%01%02%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%04%14%00%FF%00%2C%00%00%00%00%12%00%12%00%00%04X0%C8I%2B%1D8%EB%3D%E4%00%60(%8A%85%17%0AG*%8C%40%19%7C%00J%08%C4%B1%92%26z%C76%FE%02%07%C2%89v%F0%7Dz%C3b%C8u%14%82V5%23o%A7%13%19L%BCY-%25%7D%A6l%DF%D0%F5%C7%02%85%5B%D82%90%CBT%87%D8i7%88Y%A8%DB%EFx%8B%DE%12%01%00%3B';
}


/*
 * jQuery simple-color plugin
 * @requires jQuery v1.4.2 or later
 *
 * See http://hardi.anaski.net/
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 1.0.1 (201108151520)
 */
(function(c){c.fn.simpleColor=function(b){var o=["990033","ff3366","cc0033","ff0033","ff9999","cc3366","ffccff","cc6699","993366","660033","cc3399","ff99cc","ff66cc","ff99ff","ff6699","cc0066","ff0066","ff3399","ff0099","ff33cc","ff00cc","ff66ff","ff33ff","ff00ff","cc0099","990066","cc66cc","cc33cc","cc99ff","cc66ff","cc33ff","993399","cc00cc","cc00ff","9900cc","990099","cc99cc","996699","663366","660099","9933cc","660066","9900ff","9933ff","9966cc","330033","663399","6633cc","6600cc","9966ff","330066",
"6600ff","6633ff","ccccff","9999ff","9999cc","6666cc","6666ff","666699","333366","333399","330099","3300cc","3300ff","3333ff","3333cc","0066ff","0033ff","3366ff","3366cc","000066","000033","0000ff","000099","0033cc","0000cc","336699","0066cc","99ccff","6699ff","003366","6699cc","006699","3399cc","0099cc","66ccff","3399ff","003399","0099ff","33ccff","00ccff","99ffff","66ffff","33ffff","00ffff","00cccc","009999","669999","99cccc","ccffff","33cccc","66cccc","339999","336666","006666","003333","00ffcc",
"33ffcc","33cc99","00cc99","66ffcc","99ffcc","00ff99","339966","006633","336633","669966","66cc66","99ff99","66ff66","339933","99cc99","66ff99","33ff99","33cc66","00cc66","66cc99","009966","009933","33ff66","00ff66","ccffcc","ccff99","99ff66","99ff33","00ff33","33ff33","00cc33","33cc33","66ff33","00ff00","66cc33","006600","003300","009900","33ff00","66ff00","99ff00","66cc00","00cc00","33cc00","339900","99cc66","669933","99cc33","336600","669900","99cc00","ccff66","ccff33","ccff00","999900","cccc00",
"cccc33","333300","666600","999933","cccc66","666633","999966","cccc99","ffffcc","ffff99","ffff66","ffff33","ffff00","ffcc00","ffcc66","ffcc33","cc9933","996600","cc9900","ff9900","cc6600","993300","cc6633","663300","ff9966","ff6633","ff9933","ff6600","cc3300","996633","330000","663333","996666","cc9999","993333","cc6666","ffcccc","ff3333","cc3333","ff6666","660000","990000","cc0000","ff0000","ff3300","cc9966","ffcc99","ffffff","cccccc","999999","666666","333333","000000","000000","000000","000000",
"000000","000000","000000","000000","000000"];b=c.extend({defaultColor:this.attr("defaultColor")||"#FFF",border:this.attr("border")||"1px solid #000",cellWidth:this.attr("cellWidth")||10,cellHeight:this.attr("cellHeight")||10,cellMargin:this.attr("cellMargin")||1,boxWidth:this.attr("boxWidth")||"115px",boxHeight:this.attr("boxHeight")||"20px",columns:this.attr("columns")||16,insert:this.attr("insert")||"after",buttonClass:this.attr("buttonClass")||"",colors:this.attr("colors")||o,displayColorCode:this.attr("displayColorCode")||
false,colorCodeAlign:this.attr("colorCodeAlign")||"center",colorCodeColor:this.attr("colorCodeColor")||"#FFF"},b||{});this.hide();b.totalWidth=b.columns*(b.cellWidth+2*b.cellMargin);if(c.browser.msie)b.totalWidth+=2;b.totalHeight=Math.ceil(b.colors.length/b.columns)*(b.cellHeight+2*b.cellMargin);c.simpleColorOptions=b;this.each(function(){var a=c.simpleColorOptions,i=c("<div class='simpleColorContainer' />"),l=this.value&&this.value!=""?this.value:a.defaultColor,d=c("<div class='simpleColorDisplay' />");
d.css("backgroundColor",l);d.css("border",a.border);d.css("width",a.boxWidth);d.css("height",a.boxHeight);d.css("cursor","pointer");i.append(d);if(a.displayColorCode){d.text(this.value);d.css("color",a.colorCodeColor);d.css("textAlign",a.colorCodeAlign)}var j=c("<input type='button' value='Select' class='simpleColorSelectButton "+a.buttonClass+"'>");i.append(j);var k=c("<input type='button' value='Cancel' class='simpleColorCancelButton "+a.buttonClass+"'>");i.append(k);k.hide();l=function(e){e.data.select_button.hide();
e.data.cancel_button.show();if(e.data.container.chooser)e.data.container.chooser.show();else{var g=c("<div class='simpleColorChooser'/>");g.css("border",a.border);g.css("margin","0px");g.css("margin-top","3px");g.css("width",a.totalWidth+"px");g.css("height",a.totalHeight+"px");e.data.container.chooser=g;e.data.container.append(g);for(var m=0;m<a.colors.length;m++){var f=c("<div class='simpleColorCell' id='"+a.colors[m]+"'/>");f.css("width",a.cellWidth+"px");f.css("height",a.cellHeight+"px");f.css("margin",
a.cellMargin+"px");f.css("cursor","pointer");f.css("lineHeight",a.cellHeight+"px");f.css("fontSize","1px");f.css("float","left");f.css("backgroundColor","#"+a.colors[m]);g.append(f);f.bind("click",{input:e.data.input,chooser:g,select_button:j,cancel_button:k,display_box:d},function(h){h.data.input.value="#"+this.id;c(h.data.input).change();h.data.display_box.css("backgroundColor","#"+this.id);h.data.chooser.hide();h.data.cancel_button.hide();h.data.display_box.show();h.data.select_button.show();a.displayColorCode&&
h.data.display_box.text("#"+this.id)})}}};var n={container:i,input:this,cancel_button:k,display_box:d,select_button:j};j.bind("click",n,l);d.bind("click",n,l);k.bind("click",{container:i,select_button:j,display_box:d},function(e){c(this).hide();e.data.container.find(".simpleColorChooser").hide();e.data.display_box.show();e.data.select_button.show()});c(this).after(i)});return this};c.fn.closeSelector=function(){this.each(function(){var b=c(this).parent().find("div.simpleColorContainer");b.find(".simpleColorCancelButton").hide();
b.find(".simpleColorChooser").hide();b.find(".simpleColorDisplay").show();b.find(".simpleColorSelectButton").show()});return this}})(jQuery);
