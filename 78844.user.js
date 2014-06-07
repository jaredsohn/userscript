// ==UserScript==
// @name           Lights out any page
// @namespace      meh
// @description    Adjust background and text to grayscale tones.
// @include        http://*
// ==/UserScript==
var lamp_img, lamp_off_src, lamp_on_src;
var clss, classesApplied=false;
var optdomain;
var nodesTotal, nodesProcessed, percent;


// avoid running on frames
try{
	if(top != self)
		return;
}catch(e){
	return;
}


init_img();

init_css();

get_stored_settings();


//add toggle lamp at top right
lamp_img = document.body.appendChild(createElement('img', {id:'lamp', src:lamp_off_src}, 'click toggleControl false'));


//css holders 
getTag('head')[0].appendChild(createElement('style', {id:'darkcolorscss_bgcolor', type:'text/css'}));
getTag('head')[0].appendChild(createElement('style', {id:'darkcolorscss_bgimg', type:'text/css'}));
getTag('head')[0].appendChild(createElement('style', {id:'darkcolorscss_img', type:'text/css'}));
getTag('head')[0].appendChild(createElement('style', {id:'darkcolorscss_txtcolor', type:'text/css'}));
getTag('head')[0].appendChild(createElement('style', {id:'darkcolorscss_txtsize', type:'text/css'}));


//apply options if necessary
if(isAutorun() && !isDomainIgnored()) {
	setTimeout( function(e){ 
		init(true);
	}, 0);
}


function isAutorun()
{
	//always apply since settings wont save
	return true;
	if(!optdomain.autorun)
		return false;
		
	if(optdomain.autorunStart == null)
		return true;

	
	var h = new Date().getHours();
	var s = optdomain.autorunStart;
	var e = optdomain.autorunEnd;
	if( s<e && h >= optdomain.autorunStart  &&  h <= optdomain.autorunEnd )
		return true;
	else if( s>e && (h >= optdomain.autorunStart || h <= optdomain.autorunEnd) )
		return true;
	else if(s==e && h==e)
		return true;
	else
		return false;
}

function isDomainIgnored()
{
	var rxp = new RegExp(getDomain().replace(/\./,'\.'));
	
	if(GM_getValue('value_opt_ignore_domain') && GM_getValue('value_opt_ignore_domain').search(rxp) > -1)
	{
		return true;
	}else{
		return false;
	}
}


function toggleControl(evt)
{	
	if(!getId('sliderContainer')) //first run
	{
		init();
	}
	else 
	{	
		//toggle off
		getId('sliderContainer').parentNode.removeChild(getId('sliderContainer'));
		
		//restore original css
		optionsClearCSS();	
		
		//lamp color off
		lamp_img.setAttribute('src', lamp_off_src);
		
		//remove mouseover event to show/hide slider
		lamp_img.removeEventListener('mouseover',evtLampMouseover, false);
		document.removeEventListener('mouseover', checkMouseOver, false);
	}
}


function evtLampMouseover(evt)
{
	//get_stored_settings();	
	
	if(getId('sliderContainer').style.visibility == 'hidden')
	{
		getId('sliderContainer').style.visibility = 'visible';			
			
		//restore sliders/displays visibility due to enable checkbox
		getId('slider_bgcolor').style.visibility = getId('opt_checkb_enablebgcolor').checked ? 'visible':'hidden';
		getId('slider_txtcolor').style.visibility = getId('opt_checkb_enabletxtcolor').checked ? 'visible':'hidden';;
		getId('slider_txtsize').style.visibility = getId('opt_checkb_enabletxtsize').checked ? 'visible':'hidden';;
		getId('slider_img').style.visibility = getId('opt_checkb_enableimg').checked ? 'visible':'hidden';;
		getId('display_bgcolor').style.visibility = getId('opt_checkb_enablebgcolor').checked ? 'visible':'hidden';;
		getId('display_txtcolor').style.visibility = getId('opt_checkb_enabletxtcolor').checked ? 'visible':'hidden';;
		getId('display_txtsize').style.visibility = getId('opt_checkb_enabletxtsize').checked ? 'visible':'hidden';;
		getId('display_img').style.visibility = getId('opt_checkb_enableimg').checked ? 'visible':'hidden';;			
	}
}


function checkMouseOver(evt)
{
	// hides slider if mouseout
	if(evt.target==lamp_img || evt.target==getId('sliderContainer')){
		return;
	}
	
	//mouse still dragging
	if(carpemouseover)
		return;
	
	//hides container if mouse out
	if(!isAncestor(evt.target, getId('sliderContainer'))) 
	{
		getId('sliderContainer').style.visibility = 'hidden';
		
		//hide sliders/displays visible due to enable checkbox
		getId('slider_bgcolor').style.visibility = 'hidden';
		getId('slider_txtcolor').style.visibility = 'hidden';
		getId('slider_txtsize').style.visibility = 'hidden';
		getId('slider_img').style.visibility = 'hidden';
		getId('display_bgcolor').style.visibility = 'hidden';
		getId('display_txtcolor').style.visibility = 'hidden';
		getId('display_txtsize').style.visibility = 'hidden';
		getId('display_img').style.visibility = 'hidden';
	}
}


function optionsClearCSS()
{
	getId('darkcolorscss_bgimg').innerHTML = '';
	getId('darkcolorscss_bgcolor').innerHTML = '';
	getId('darkcolorscss_img').innerHTML = '';
	getId('darkcolorscss_txtcolor').innerHTML = '';	
	getId('darkcolorscss_txtsize').innerHTML = '';	
}


function get_stored_settings()
{
	getDomain();
	try{
		optdomain = getValueForId(getDomain(), 'value_opt_domains');
		if(!optdomain)
			optdomain = getValueForId('*', 'value_opt_domains');
		optdomain = eval(optdomain);
	}catch(e){
		optdomain = null;
	}
	
	if(!optdomain)
	{
		optdomain = {
			enablebgcolor: true,
			bgcolor: 176,
			sliderBgcolorLastPos:69,
			enabletxtcolor: true,
			txtcolor: 13,
			sliderTxtcolorLastPos: 5,
			enabletxtsize: false,
			txtsize: 16,
			sliderTxtsizeLastPos: 43,
			enableimg: false,
			imageOpacity: 0.13,
			sliderImgLastPos: 13,
			removebgimg: false,
			linkunderline: true,
			autorun: true,
			autorunStart: null,
			autorunEnd: null,
			domain: '*',
		};
	}
}

var txt = '';
function eventHandlerNodeInserted(evt)
{
	if(evt.target.nodeName=='#text' || evt.target==getId('sliderContainer') || isAncestor(evt.target, getId('sliderContainer'))) // 
		return;
	var html, el = evt.target;
	var tasks = [];
	
	
	//add class to child nodes
	xp('descendant-or-self::node()', el).forEach(function(e){
		if(e.nodeName!='#text')
		{
			tasks.push( function(){ 
				appendClassesToElement(e);
			});
		}
	});
	
	Scheduler.setTimeout(tasks,1);
	
	
	//prevent ajax changes to body and html elements
	html = document.getElementsByTagName('html')[0];
	if(!document.body.getAttribute('class')  ||  document.body.getAttribute('class').search(/darkcolors_bgcolor/) < 0 )
		document.body.setAttribute('class', (document.body.getAttribute('class')?document.body.getAttribute('class'):'')+' darkcolors_txtcolor darkcolors_txtsize darkcolors_bgimg darkcolors_bgcolor');
	if(!html.getAttribute('class')  ||  html.getAttribute('class').search(/darkcolors_bgcolor/) < 0 )
		html.setAttribute('class', (html.getAttribute('class')?html.getAttribute('class'):'')+' darkcolors_txtcolor darkcolors_txtsize darkcolors_bgimg darkcolors_bgcolor');
	if(optdomain.removebgimg){
		html.style.backgroundImage = 'none';
		document.body.style.backgroundImage = 'none';
	}	
}



var perfstart, perfend, combg = 0, comimg=0, combgimg=0, comtxt=0, notxt=0, somethingelse=0, recursion=0;
function appendClassesToElement(el)
{
	//feedback
	if(!classesApplied)//no feedback when ajax
	{
		nodesProcessed++;
		percent = parseInt((nodesProcessed*100)/nodesTotal);
		if(percent%5==0)
			getId('tempMsg').innerHTML = nodesTotal + ' nodes ('+percent+'%)';
	}
	
	
	if(getStyle(el,'background-color')!='transparent')
	{
		try{clss = el.getAttribute('class');}catch(e){}
		if(!clss)
			clss = '';	
		if(clss=='' ||  el.getAttribute('class').search(/darkcolors_bgcolor/) < 0 ){
			el.setAttribute('class', clss+' darkcolors_bgcolor');
			//combg++;
		}
	}
	else if(el.tagName=='IMG' && el!=lamp_img)
	{
		try{clss = el.getAttribute('class');}catch(e){}
		if(!clss)
			clss = '';	
		if(clss=='' ||  el.getAttribute('class').search(/darkcolors_img/) < 0 ){
			el.setAttribute('class', clss+' darkcolors_img');
			//comimg++;
		}
	}
	//else somethingelse++;
	
	
	//add bgimg class?
	if(getStyle(el,'background-image')!='none')
	{
		try{clss = el.getAttribute('class');}catch(e){}
		if(!clss)
			clss = '';	
		if(clss=='' ||  el.getAttribute('class').search(/darkcolors_bgimg/) < 0 )//avoid duplicating classes
		{
			clss += ' darkcolors_bgimg';
			el.setAttribute('class', clss);
			if( clss.search(/darkcolors_bgcolor/) < 0 )
				el.setAttribute('class', clss + ' darkcolors_bgcolor');
			//combg++;
			//combgimg++;
		}
	}	
	
	
	//add txtcolor class?
	if(el.textContent!='' || el.nodeName=='INPUT')
	{
		try{clss = el.getAttribute('class');}catch(e){}
		if(!clss)
			clss = '';	
		if(clss=='' || clss.search(/darkcolors_txtcolor/) < 0 ){
			el.setAttribute('class', clss + ' darkcolors_txtcolor darkcolors_txtsize');
			clss = el.getAttribute('class');
			//comtxt++;
		}
	}
	//else notxt++;
}



// http://webreflection.blogspot.com/2008/12/stressfull-procedure-distribute-your.html
Scheduler = {
    setTimeout:function(Stack, delay)
	{
        var self = this;
		
        if(!delay)
            delay = 1;
			
        if(!(Stack instanceof Array))
            Stack = [Stack];
			
        setTimeout(function(){
            Stack.shift().call(self);
            if(0 < Stack.length)
                setTimeout(arguments.callee, delay);
        }, delay);
    }
};



function initClassesRec(tasks, descendants)
{
	if(descendants.length == 0)
		return;
	
	if(descendants.length < 300 ) 
	{
		// process groups of 300 nodes at once
		// ... adjust so it won't reduce browser's responsiveness
		tasks.push(function(){
			descendants.forEach(function(el){	
				try{ appendClassesToElement(el); }catch(e){}
			});
		});
	}
	else
	{
		//for each direct child
		xp('child::node()',descendants[0].parentNode).forEach(function(c){	
			tasks.push(function(){
				try{ appendClassesToElement(c); }catch(e){}
			});
			initClassesRec(tasks, xp('descendant::node()',c));
			//recursion++;
		});
	}
}


function init(initCalledByAutorun)
{
	var tasks = [];
	var html;
	
	
	//remove ajax listener while initializing
	document.body.removeEventListener('DOMNodeInserted', eventHandlerNodeInserted, false);
	
	
	//append sliders and options interface
	document.body.appendChild(createElement('div', {id:'sliderContainer', class:'sliderContainer'}));
	getId('sliderContainer').innerHTML = optionsHTML();
	
	
	//init options
	optionsInterfaceInit();
	
	
	//init sliders
	carpeInit();	
	
	
	//add css asap
	optionsApply();	
	
	
	//avoid re-applying classes when toggle on/off
	if(classesApplied)
		return;
	
	
	//hide if init was called by by autorun
	if(initCalledByAutorun==true)
		checkMouseOver({target:document.body.firstChild});//causes container to hide
	
	
	//init html and body tags
	html = document.getElementsByTagName('html')[0];
	document.body.setAttribute('class', (document.body.getAttribute('class')?document.body.getAttribute('class'):'')+' darkcolors_txtcolor darkcolors_txtsize darkcolors_bgimg darkcolors_bgcolor ');
	html.setAttribute('class', (html.getAttribute('class')?html.getAttribute('class'):'')+' darkcolors_txtcolor darkcolors_txtsize darkcolors_bgimg darkcolors_bgcolor ');

	
	//measure performance
	perfstart = new Date().getTime();
	
	
	//feedback
	nodesTotal =  xp('descendant::node()',document.body).length;
	nodesProcessed = 0;
	getId('sliderContainer').insertBefore( 
		createElement('span', {id:'tempMsg', style:'display:block; float:right; font-size:9px;'}, null, nodesTotal+' nodes' ) , 
		getId('sliderContainer').firstChild
	);
	
	
	

	//apply classes to nodes 
	//...performance bottleneck
	initClassesRec(tasks, xp('descendant::node()', document.body));


	

	// feedback and performance 
	tasks.push(function(){
		
		//feedback
		getId('tempMsg').parentNode.removeChild(getId('tempMsg'));
	
		//performance
		perfend = new Date().getTime();
		getId('sliderContainer').appendChild( createElement('span', {style:'display:block; font-size:9px; color:#dddddd; cursor:default;'}, null, nodesProcessed+' nodes in '+((perfend - perfstart)/1000) + ' seconds'));
		//debug('combg:'+combg+' comimg:'+comimg+' somethingelse:'+somethingelse+' comtxt:'+comtxt+' notxt:'+notxt );
		//debug('recursion: '+recursion);
	});	
	
	
	
	//cleanup container classes
	tasks.push(function(){
		xp('descendant-or-self::node()', getId('sliderContainer')).forEach(function(node){
			if( node && node.nodeName!='#text' && node.getAttribute('class') && node.getAttribute('class').search(/darkcolors\_\S+/)>-1 )//3==text node
			{
				node.setAttribute('class', node.getAttribute('class').replace(/darkcolors\_\S+/g,''));
			}
		});
		
		classesApplied = true;
		
		//restore ajax listener
		document.body.addEventListener('DOMNodeInserted', eventHandlerNodeInserted, false);
	});	
	
	
	//execute scheduled tasks
	Scheduler.setTimeout(tasks,1);
	
}


function optionsInterfaceInit()
{			
	/*------- option enable slider -------*/
	//bgcolor
	getId('opt_checkb_enablebgcolor').addEventListener('click', optionsEvent, false);
	getId('opt_checkb_enablebgcolor').checked = optdomain.enablebgcolor;
	optionsEvent({target:getId('opt_checkb_enablebgcolor')});
	//text color
	getId('opt_checkb_enabletxtcolor').addEventListener('click', optionsEvent, false);
	getId('opt_checkb_enabletxtcolor').checked = optdomain.enabletxtcolor;
	optionsEvent({target:getId('opt_checkb_enabletxtcolor')});
	//text size
	getId('opt_checkb_enabletxtsize').addEventListener('click', optionsEvent, false);
	getId('opt_checkb_enabletxtsize').checked = optdomain.enabletxtsize;
	optionsEvent({target:getId('opt_checkb_enabletxtsize')});
	//img opacity
	getId('opt_checkb_enableimg').addEventListener('click', optionsEvent, false);
	getId('opt_checkb_enableimg').checked = optdomain.enableimg;
	optionsEvent({target:getId('opt_checkb_enableimg')});
	

	/*------- option autorun -------*/
	getId('opt_checkb_autorun').addEventListener('click', optionsEvent, false);
	if(optdomain.autorun) {
		getId('opt_checkb_autorun').checked = true;
		
		//enable period checkbox
		getId('opt_checkb_autorunOnly').removeAttribute('disabled');
	}else{
		getId('opt_checkb_autorun').checked = false;
		
		//disable period checkbox
		getId('opt_checkb_autorunOnly').setAttribute('disabled','1');
	}

	
	/*------- option autorun period -------*/
	getId('opt_checkb_autorunOnly').addEventListener('click', optionsEvent, false);
	if(optdomain.autorunStart != null) {
		getId('opt_checkb_autorunOnly').checked = true;
		//set combo values
		getId('opt_combob_autorunStart').value =  optdomain.autorunStart;
		getId('opt_combob_autorunEnd').value =  optdomain.autorunEnd;
	}else{
		getId('opt_checkb_autorunOnly').checked = false;
		getId('opt_combob_autorunStart').setAttribute('disabled','1');
		getId('opt_combob_autorunEnd').setAttribute('disabled','1');
	}	
		
		
	/*------- option remove background-image -------*/
	getId('opt_checkb_removebgimg').addEventListener('click', optionsEvent, false);
	if(optdomain.removebgimg) {
		getId('opt_checkb_removebgimg').checked = true;
	}else{
		getId('opt_checkb_removebgimg').checked = false;
	}

	/*------- option link underline -------*/
	getId('opt_checkb_linkunderline').addEventListener('click', optionsEvent, false);
	if(optdomain.linkunderline) {
		getId('opt_checkb_linkunderline').checked = true;
	}else{
		getId('opt_checkb_linkunderline').checked = false;
	}	

	/*------- option save default -------*/
	getId('opt_link_savedefault').addEventListener('click', optionsSave, false);
	
	
	/*------- option save domain  -------*/
	getId('opt_link_savedomain').addEventListener('click', optionsSave, false);
	try{ 
		getId('opt_link_cleardomain').addEventListener('click', optionsClearSettings, false);
	}catch(e){}
	
	
	/*------- option ignore domain  -------*/
	getId('opt_link_ignoreDomain').addEventListener('click', optionsIgnoreDomain, false)
	
}


function optionsHTML()
{
	var s = ''+
	
			//checkbox autorun
			'<input id="opt_checkb_autorun" type="checkbox"> <label for="opt_checkb_autorun">Auto run</label>'+
			
			//autorun period
			'<br> &nbsp;&nbsp;&nbsp;&nbsp;<input id="opt_checkb_autorunOnly" type="checkbox"> <label for="opt_checkb_autorunOnly">Between</label> '+
			'<select id="opt_combob_autorunStart">';
				for(var i=0; i<=23; i++)
					s += '<option>'+i+'</option>';
			s += '</select>h and '+
			'<select id="opt_combob_autorunEnd">';
				for(var i=0; i<=23; i++)
					s += '<option>'+i+'</option>';
			s += '</select>h <br><br><br>';
			
	
			// slider bg color 
			s += '<table><tr><td><input id="opt_checkb_enablebgcolor" type="checkbox">'+
			'<label for="opt_checkb_enablebgcolor"> Background color </label></td><td>'+
			'<div class="carpe_horizontal_slider_track">'+
			'    <div class="carpe_slider_slit">&nbsp;</div>'+
			'    <div class="carpe_slider"'+
			'        id="slider_bgcolor"'+
			'        orientation="horizontal"'+
			'        distance="100"'+
			'        display="display_bgcolor"'+
			'        style="left: 0px;">&nbsp;</div>'+
			'</div>'+						
			'</td><td>'+
			'<div class="carpe_slider_display_holder" >'+
			'    <input class="carpe_slider_display"'+
			'        id="display_bgcolor"'+
			'        name="display_bgcolor"'+
			'        type="text"'+
			'        from="0"'+
			'        to="255"'+
			'        valuecount="256"'+
			'        value="' + optdomain.bgcolor + '"'+
			'        typelock="off" /></div>'+
			'</td></tr>'+

			//slider text color  
			'<tr><td><input id="opt_checkb_enabletxtcolor" type="checkbox">'+
			'<label for="opt_checkb_enabletxtcolor"> Text color </label></td><td>'+  
			'<div class="carpe_horizontal_slider_track">'+
			'    <div class="carpe_slider_slit">&nbsp;</div>'+
			'    <div class="carpe_slider"'+
			'        id="slider_txtcolor"'+
			'        orientation="horizontal"'+
			'        distance="100"'+
			'        display="display_txtcolor"'+
			'        style="left: 0px;">&nbsp;</div>'+
			'</div>'+						
			'</td><td>'+
			'<div class="carpe_slider_display_holder" >'+
			'    <input class="carpe_slider_display"'+
			'        id="display_txtcolor"'+
			'        name="display_txtcolor"'+
			'        type="text"'+
			'        from="0"'+
			'        to="255"'+ 
			'        valuecount="256"'+
			'        value="' + optdomain.txtcolor + '"'+
			'        typelock="off" /></div>'+	
			'</td></tr>'+			
			
			//slider text size
			'<tr><td><input id="opt_checkb_enabletxtsize" type="checkbox">'+
			'<label for="opt_checkb_enabletxtsize"> Text size </label></td><td>'+  
			'<div class="carpe_horizontal_slider_track">'+
			'    <div class="carpe_slider_slit">&nbsp;</div>'+
			'    <div class="carpe_slider"'+
			'        id="slider_txtsize"'+
			'        orientation="horizontal"'+
			'        distance="100"'+
			'        display="display_txtsize"'+
			'        style="left: 0px;">&nbsp;</div>'+
			'</div>'+						
			'</td><td>'+
			'<div class="carpe_slider_display_holder" >'+
			'    <input class="carpe_slider_display"'+
			'        id="display_txtsize"'+
			'        name="display_txtsize"'+
			'        type="text"'+
			'        from="10"'+
			'        to="24"'+ 
			'        valuecount="14"'+
			'        value="' + optdomain.txtsize + '"'+
			'        typelock="off" /></div>'+	
			'</td></tr>'+	
			
			
			//slider fade image  
			'<tr><td><input id="opt_checkb_enableimg" type="checkbox">'+
			'<label for="opt_checkb_enableimg"> Image opacity </label></td><td>'+  
			'<div class="carpe_horizontal_slider_track">'+
			'    <div class="carpe_slider_slit">&nbsp;</div>'+
			'    <div class="carpe_slider"'+
			'        id="slider_img"'+
			'        orientation="horizontal"'+
			'        distance="100"'+
			'        display="display_img"'+
			'        style="left: 0px;">&nbsp;</div>'+
			'</div>'+						
			'</td><td>'+
			'<div class="carpe_slider_display_holder" >'+
			'    <input class="carpe_slider_display"'+
			'        id="display_img"'+
			'        name="display_img"'+
			'        type="text"'+
			'        decimals=2'+
			'        from="0.0"'+
			'        to="1.0"'+
			'        valuecount="100"'+
			'        value="' + optdomain.imageOpacity + '"'+
			'        typelock="off" /></div>'+
			'</td></tr></table>'+

			
					
					
			//checkbox remove bg image
			'<br><br> <input id="opt_checkb_removebgimg" type="checkbox"> <label for="opt_checkb_removebgimg">Remove background-images</label>'+
			
			//checkbox underline links
			'<br> <input id="opt_checkb_linkunderline" type="checkbox"> <label for="opt_checkb_linkunderline">Underline links</label>'+
			
			
			
			//link save default
			'<br><br><br> <a id="opt_link_savedefault" href="javascript:void(0)"> Save as default </a>'+
			
			//link save domain
			'<br> <a id="opt_link_savedomain" href="javascript:void(0)">Save for '+getDomain()+'</a>';

			//link clear domain
			if( getValueForId(getDomain(), 'value_opt_domains') )
			{
				s += '<span id="opt_link_cleardomain_span">&nbsp; <a id="opt_link_cleardomain"  href="javascript:void(0)">[clear]</a> </span>';
			}
						
			//link ignore domain
			s += '<br> <a id="opt_link_ignoreDomain" href="javascript:void(0)">'+(isDomainIgnored()?'Un-ignore':'Ignore')+' domain '+getDomain()+'</a>';
			
			
			
			return s;
}


//unignore when saving settings for domain
function optionsIgnoreDomain(evt)
{	
	var list = GM_getValue('value_opt_ignore_domain');
	
	if(isDomainIgnored(getDomain()))//un-ignore
	{
		var dom = getDomain().replace(/\./g,'\.');
		var rxp = new RegExp(';?'+dom);
		
		GM_setValue('value_opt_ignore_domain', list.replace(rxp,''));
		
		evt.target.innerHTML = 'Ignore domain '+getDomain();
	}
	else //ignore
	{
		if(!list) // empty
		{
			GM_setValue('value_opt_ignore_domain', getDomain());
		}
		else
		{
			list += ';' + getDomain();
			GM_setValue('value_opt_ignore_domain', list);
		}
		
		//feedback: toggle off
		toggleControl(null);
	}	
}


function optionsClearSettings(evt)
{
	if(confirm('Clear settings for '+getDomain()+'?'))
	{
		removeById(getDomain(),'value_opt_domains');
		
		//feedback
		getId('sliderContainer').appendChild(createElement('span', {id:'spanClearedDomain', style:"float:right;"}, null, '... settings cleared'));
		getId('opt_link_cleardomain_span').parentNode.removeChild( getId('opt_link_cleardomain_span'));
		setTimeout(function(e){
			try{
				getId('spanClearedDomain').parentNode.removeChild( getId('spanClearedDomain'));
			}catch(e){}
		}, 2000);		
	}
}


function optionsSave(evt)
{
	if(evt.target.getAttribute('id')=='opt_link_savedefault')
		optionsSaveDomain(evt, true);
	else
		optionsSaveDomain(evt, false);
}


function optionsSaveDomain(evt, genericDomain)
{	

	//autorun
	optdomain.autorun = getId('opt_checkb_autorun').checked;
	

	//autorun period
	if(getId('opt_checkb_autorun').checked && getId('opt_checkb_autorunOnly').checked){
		optdomain.autorunStart = parseInt(getId('opt_combob_autorunStart').value);
		optdomain.autorunEnd = parseInt(getId('opt_combob_autorunEnd').value);
	}else{
		optdomain.autorunStart = null;
		optdomain.autorunEnd = null;
	}	

	
	//slider bgcolor
	optdomain.enablebgcolor = getId('opt_checkb_enablebgcolor').checked;
	if(optdomain.enablebgcolor)
	{
		optdomain.bgcolor = parseInt(getId('display_bgcolor').value); 
		if(getId('slider_bgcolor').getAttribute('orientation') == 'horizontal')
			optdomain.sliderBgcolorLastPos = parseInt(getId('slider_bgcolor').style.left.match(/\d+/)[0]); 
		else
			optdomain.sliderBgcolorLastPos = parseInt(getId('slider_bgcolor').style.top.match(/\d+/)[0]);
	}

		
	//slider txtcolor
	optdomain.enabletxtcolor = getId('opt_checkb_enabletxtcolor').checked;
	if(optdomain.enabletxtcolor)
	{
		optdomain.txtcolor = parseInt(getId('display_txtcolor').value); 
		if(getId('slider_txtcolor').getAttribute('orientation') == 'horizontal')
			optdomain.sliderTxtcolorLastPos = parseInt(getId('slider_txtcolor').style.left.match(/\d+/)[0]);
		else
			optdomain.sliderTxtgcolorLastPos = parseInt(getId('slider_txtcolor').style.top.match(/\d+/)[0]);
	}
	

	//slider txtsize
	optdomain.enabletxtsize = getId('opt_checkb_enabletxtsize').checked;
	if(optdomain.enabletxtsize)
	{	
		optdomain.txtsize = parseInt(getId('display_txtsize').value); 
		if(getId('slider_txtsize').getAttribute('orientation') == 'horizontal')
			optdomain.sliderTxtsizeLastPos = parseInt(getId('slider_txtsize').style.left.match(/\d+/)[0]); 
		else
			optdomain.sliderTxtsizeLastPos = parseInt(getId('slider_txtsize').style.top.match(/\d+/)[0]);	
	}
	
		
	//slider img
	optdomain.enableimg = getId('opt_checkb_enableimg').checked;
	if(optdomain.enableimg)
	{		
		optdomain.imageOpacity = parseFloat(getId('display_img').value); 
		if(getId('slider_img').getAttribute('orientation') == 'horizontal')
			optdomain.sliderImgLastPos = parseInt(getId('slider_img').style.left.match(/\d+/)[0]); 
		else
			optdomain.sliderImgLastPos = parseInt(getId('slider_img').style.top.match(/\d+/)[0]); 	
	}
	

	//remove bg-image
	optdomain.removebgimg = getId('opt_checkb_removebgimg').checked;
	
	
	//underline links
	optdomain.linkunderline = getId('opt_checkb_linkunderline').checked;
	
	
	//domain
	if(genericDomain == true){
		optdomain.domain = '*';
	}else{
		optdomain.domain = getDomain();
	}


	//store settings
	//debug(optdomain.toSource());
	setValueForId( optdomain.domain, optdomain.toSource(), 'value_opt_domains');
	
	
	//remove from ignore list if necessary
	if(!genericDomain)
	{
		var rxp = new RegExp(';?'+getDomain().replace(/\./g,'\.'));
		if(GM_getValue("value_opt_ignore_domain") && GM_getValue('value_opt_ignore_domain').search(rxp) > -1)
		{
			GM_setValue('value_opt_ignore_domain', GM_getValue('value_opt_ignore_domain').replace(rxp,''));
		}
	}
	
	
	//refresh options object
	get_stored_settings();
	
	
	//feedback
	var spanClearSettings = getId('opt_link_cleardomain_span');
	if(!spanClearSettings)
	{
		spanClearSettings = createElement('span', {id:'opt_link_cleardomain_span'}, null, '&nbsp;');
		spanClearSettings.appendChild(createElement('a', {href:'javascript:void(0)', id:'opt_link_cleardomain'}, 'click optionsClearSettings false', '[clear]'));
	}
	getId('sliderContainer').appendChild(createElement('span', {id:'spanSavedDomain', style:'float:right;'}, null, ' ...settings saved'));
	getId('opt_link_savedomain').parentNode.insertBefore( spanClearSettings, getId('opt_link_savedomain').nextSibling);
	setTimeout(function(e){
		try{
			getId('spanSavedDomain').parentNode.removeChild(getId('spanSavedDomain'));
		}catch(e){}
	}, 2000);
}


function getDomain()
{
	return window.location.href.match(/^https?:\/\/(www\.)?([^\/]+)/)[2];
}


function optionsApply()
{
	//toggle on
	lamp_img.setAttribute('src', lamp_on_src);
	
	//set default background color
	if(optdomain.enablebgcolor && optdomain.bgcolor != null){
		sliderMoved(getId('slider_bgcolor'));
	}
	
	//set default text color
	if(optdomain.enabletxtcolor && optdomain.txtcolor != null){
		sliderMoved(getId('slider_txtcolor'));
	}

	//set default text size
	if(optdomain.enabletxtsize && optdomain.txtsize != null){
		sliderMoved(getId('slider_txtsize'));
	}
	
	//set default image opacity
	if(optdomain.enableimg && optdomain.imageOpacity != null){
		sliderMoved(getId('slider_img'));
	}
	
	//set background-image
	if(optdomain.removebgimg){
		getId('darkcolorscss_bgimg').innerHTML = '*.darkcolors_bgimg { background-image:none !important;}';
	}else{
		getId('darkcolorscss_bgimg').innerHTML = '';
	}		
	
	//add mouseover event to show/hide slider
	lamp_img.addEventListener('mouseover', evtLampMouseover, false);
	document.addEventListener('mouseover', checkMouseOver, false);
}


//use to preview only, save() must get values from DOM
function optionsEvent(evt)
{
	var id = evt.target.getAttribute('id');
	
	switch(id)
	{
		case 'opt_checkb_enablebgcolor':
			getId('slider_bgcolor').style.visibility = evt.target.checked ? 'visible':'hidden';
			getId('display_bgcolor').style.visibility = evt.target.checked ? 'visible':'hidden';
			//optdomain.enablebgcolor = evt.target.checked;
			if(evt.target.checked){
				sliderMoved(getId('slider_bgcolor'));//apply preview
			}else{
				getId('darkcolorscss_bgcolor').innerHTML = '';//restore original
			}
			break;
			
		case 'opt_checkb_enabletxtcolor':
			getId('slider_txtcolor').style.visibility = evt.target.checked ? 'visible':'hidden';
			getId('display_txtcolor').style.visibility = evt.target.checked ? 'visible':'hidden';
			//optdomain.enabletxtcolor = evt.target.checked;
			if(evt.target.checked){
				sliderMoved(getId('slider_txtcolor'));//apply preview
			}else{
				getId('darkcolorscss_txtcolor').innerHTML = '';//restore original
			}	
			break;
			
		case 'opt_checkb_enabletxtsize':
			getId('slider_txtsize').style.visibility = evt.target.checked ? 'visible':'hidden';
			getId('display_txtsize').style.visibility = evt.target.checked ? 'visible':'hidden';
			//optdomain.enabletxtsize = evt.target.checked;
			if(evt.target.checked){
				sliderMoved(getId('slider_txtsize'));//apply preview
			}else{
				getId('darkcolorscss_txtsize').innerHTML = '';//restore original
			}				
			break;
			
		case 'opt_checkb_enableimg':
			getId('slider_img').style.visibility = evt.target.checked ? 'visible':'hidden';
			getId('display_img').style.visibility = evt.target.checked ? 'visible':'hidden';
			//optdomain.enableimg = evt.target.checked;
			if(evt.target.checked){
				sliderMoved(getId('slider_img'));//apply preview
			}else{
				getId('darkcolorscss_img').innerHTML = '';//restore original
			}	
			break;
	
	

		case 'opt_checkb_autorun':
			//optdomain.autorun = evt.target.checked;
			if(evt.target.checked){//disable period checkbox
				getId('opt_checkb_autorunOnly').removeAttribute('disabled');
			}else{//enable period checkbox
				getId('opt_checkb_autorunOnly').setAttribute('disabled','1');
			}
			break;

			
		case 'opt_checkb_autorunOnly':
			if(evt.target.checked){
				//disable combo
				getId('opt_combob_autorunStart').removeAttribute('disabled');
				getId('opt_combob_autorunEnd').removeAttribute('disabled');
			}else{
				//enable combo
				getId('opt_combob_autorunStart').setAttribute('disabled','1');
				getId('opt_combob_autorunEnd').setAttribute('disabled','1');	
			}
			break;
			
			
			
		case 'opt_checkb_linkunderline':
			var und, v = parseInt(getId('display_txtcolor').value);
			var hexcolor = rgb_to_hex(null, v, v, v);
			//optdomain.linkunderline = evt.target.checked;
			und = evt.target.checked ? 'text-decoration: underline !important;' : '';
			getId('darkcolorscss_txtcolor').innerHTML = '*.darkcolors_txtcolor { color:#'+hexcolor+'  !important;} '+
					'a.darkcolors_txtcolor:link 	{color: #'+hexcolor+' !important; '+und+' background: none !important;}'  + 
					'a.darkcolors_txtcolor:hover 	{color: #'+hexcolor+' !important; '+und+' background: none !important;}'  + 
					'a.darkcolors_txtcolor:visited 	{color: #'+hexcolor+' !important; '+und+' background: none !important;}'  + 
					'a.darkcolors_txtcolor:active 	{color: #'+hexcolor+' !important; '+und+' background: none !important;}';			
			break;
			
			
		//remove bg image
		case 'opt_checkb_removebgimg':
			//optdomain.removebgimg = evt.target.checked;
			if(evt.target.checked){
				getId('darkcolorscss_bgimg').innerHTML = '*.darkcolors_bgimg { background-image:none !important;}';
			}else{
				getId('darkcolorscss_bgimg').innerHTML = '';
			}
			break;
			
			
		default:
			//debug('id: '+id);
	}
}


function sliderMoved(slider)
{
	var display = getId(slider.getAttribute('display'));
	var v = parseInt(display.value);
	var hexcolor, bordercolor;
	
	
	switch(slider.getAttribute('id'))
	{
	
		case 'slider_bgcolor':
			
			//html color
			hexcolor = rgb_to_hex(null, v, v, v);
				
			//border color matches text color
			v = parseInt(getId('display_txtcolor').value);
			var bordercolor = rgb_to_hex(null, v, v, v);
			
			//show
			getId('darkcolorscss_bgcolor').innerHTML = '*.darkcolors_bgcolor { background-color:#'+hexcolor+' !important; border-color:#'+bordercolor+' !important;}';
			break;

			
		case 'slider_txtcolor':
				
			//underline links
			var und = optdomain.linkunderline ? 'text-decoration: underline !important;' : '';
			
			//html color
			hexcolor = rgb_to_hex(null, v, v, v);
			
			getId('darkcolorscss_txtcolor').innerHTML = '*.darkcolors_txtcolor { color:#'+hexcolor+'  !important;} '+
					'a.darkcolors_txtcolor:link 	{color: #'+hexcolor+' !important; '+und+' background: none !important;}'  + 
					'a.darkcolors_txtcolor:hover 	{color: #'+hexcolor+' !important; '+und+' background: none !important;}'  + 
					'a.darkcolors_txtcolor:visited 	{color: #'+hexcolor+' !important; '+und+' background: none !important;}'  + 
					'a.darkcolors_txtcolor:active 	{color: #'+hexcolor+' !important; '+und+' background: none !important;}';
			break;
			
			
		case 'slider_txtsize':
					
			getId('darkcolorscss_txtsize').innerHTML = '*.darkcolors_txtsize { font-size:'+parseInt(v)+'px  !important;} ';
		
			break;
			
			
		case 'slider_img':
				
			v = parseFloat(display.value);
			getId('darkcolorscss_img').innerHTML = '*.darkcolors_img { opacity:'+v+' !important;}';
			break;
			
			
		default:
			//debug('slider unkown');
	}
}
		

		
function sliderStopped(slider)
{
	//var display = getId(slider.display);
	//GM_setValue('value_bgcolor', parseInt(display.value));
}



// http://blogs.x2line.com/al/articles/280.aspx
function rgb_to_hex(str, red, green, blue)
{
	var aux;
	if(str){
		aux = str.match(/\d+/g);
		if(aux){
			red = parseInt(aux[0]);
			green = parseInt(aux[1]);
			blue = parseInt(aux[2]);
		}
	}
    aux = red + 256 * green + 65536 * blue;
	aux = aux.toString(16);
    if(aux.length==6) 
		return aux;
	if(aux.length==5)
		return '0'+aux;
	if(aux=='0')
		return '000000';
}

function hex_to_rgb(color) 
{
	var rgb = [	parseInt(color.substring(0,2),16), 
				parseInt(color.substring(2,4),16), 
				parseInt(color.substring(4,6),16)	];
	return rgb;
}












function isAncestor(x, anc)
{		
	while(x.nodeName!='HTML' && x.parentNode!=anc){
		x = x.parentNode;
	}
	
	if(x.parentNode==anc)
		return true;
	else
		return false;
}


function getStyle(elem, style)
{
	return window.getComputedStyle(elem,null).getPropertyValue(style);  
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
	//disable DOMNodeInserted
	document.body.removeEventListener('DOMNodeInserted', appendClassesToElement, false);
	
	var d = document.getElementById('debugg');
	if(!d){	
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; width:50%; z-index:9999999999999;');
		
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
	
	//enable DOMNodeInserted
	document.body.addEventListener('DOMNodeInserted', appendClassesToElement, false);	
}

//values stored in format "id=value;..."
function getValueForId(id, gmkey)
{
	var info = GM_getValue(gmkey);
	if(!info || !id)
		return null;
	
	info = info.split(';');
	for(var i=0; i<info.length; i++)
	{
		if(info[i].split('=')[0]==id){
			return info[i].split('=')[1];
		}
	}
	
	return null;
}
function setValueForId(id, value, gmkey)
{
	var info = GM_getValue(gmkey);
	var i;	

	if(!id)
		return null;
	
	if(!info){
		GM_setValue(gmkey, id+"="+value);
		return;
	}
	
	info = info.split(';');
	for(i=0; i<info.length; i++)
	{
		if(info[i].split('=')[0]==id){
			info.splice(i,1,id+"="+value);
			GM_setValue(gmkey, info.join(';'));			
			return;
		}
	}
	
	info.splice(i,0,id+"="+value);
	GM_setValue(gmkey, info.join(';'));
	
}
function removeById(id, gmkey)
{
	if(!id || !gmkey)
		return null;
	var info = GM_getValue(gmkey).split(';');
	for(var i=0; i<info.length; i++)
	{
		if(info[i].split('=')[0]==id){
			info.splice(i,1);
			GM_setValue(gmkey, info.join(';'));
			return;
		}
	}
}













//---------------------------------+
//  CARPE  S l i d e r      1.5.1  |
//  2008 - 07 - 09                 |
//  By Tom Hermansson Snickars     |
//  Copyright CARPE Design         |
//  http://carpe.ambiprospect.com/ |
//---------------------------------+

// Global vars. You don't need to make changes here to change your sliders.
// Changing the attributes in your (X)HTML file is enough.
var carpemouseover                = false;
var carpeDefaultSliderLength      = 100;
var carpeSliderDefaultOrientation = 'horizontal';
var carpeSliderClassName          = 'carpe_slider';
var carpeSliderDisplayClassName   = 'carpe_slider_display';
var carpesliders                  = [];
var carpedisplays                 = [];
var carpeslider                   = {};
var carpedisplay                  = {};

// carpeGetElementsByClass: Cross-browser function that returns
// an array with all elements that have a class attribute that
// contains className
function carpeGetElementsByClass(className)
{
	var classElements = new Array();
	var els = document.getElementsByTagName("*");
	var elsLen = els.length;
	var pattern = new RegExp("\\b" + className + "\\b");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
// carpeLeft: Cross-browser version of "element.style.left"
// Returns or sets the horizontal position of an element.
function carpeLeft(elmnt, pos)
{
	if (!(elmnt = document.getElementById(elmnt))) return 0;
	if (elmnt.style && (typeof(elmnt.style.left) == 'string')) {
		if (typeof(pos) == 'number') 
			elmnt.style.left = pos + 'px';
		else {
			pos = parseInt(elmnt.style.left);
			if (isNaN(pos)) pos = 0;
		}
	}else if (elmnt.style && elmnt.style.pixelLeft) {
		if (typeof(pos) == 'number') 
			elmnt.style.pixelLeft = pos;
		else 
			pos = elmnt.style.pixelLeft;
	}
	return pos;
}
// carpeTop: Cross-browser version of "element.style.top"
// Returns or sets the vertical position of an element.
function carpeTop(elmnt, pos)
{
	if (!(elmnt = document.getElementById(elmnt))) return 0;
	if (elmnt.style && (typeof(elmnt.style.top) == 'string')) {
		if (typeof(pos) == 'number'){
			elmnt.style.top = pos + 'px';
		}else{
			pos = parseInt(elmnt.style.top);
			if (isNaN(pos)) pos = 0;
		}
	}else if (elmnt.style && elmnt.style.pixelTop) {
		if (typeof(pos) == 'number')
			elmnt.style.pixelTop = pos;
		else 
			pos = elmnt.style.pixelTop;
	}
	return pos;
}
// moveSlider: Handles slider and display while dragging
function moveSlider(evnt)
{
	var evnt = (!evnt) ? window.event : evnt; // The mousemove event
	if (carpemouseover) { // Only if slider is dragged
		carpeslider.x = carpeslider.startOffsetX + evnt.screenX; // Horizontal mouse position relative to allowed slider positions
		carpeslider.y = carpeslider.startOffsetY + evnt.screenY; // Horizontal mouse position relative to allowed slider positions
		if (carpeslider.x > carpeslider.xMax) carpeslider.x = carpeslider.xMax; // Limit horizontal movement
		if (carpeslider.x < 0) carpeslider.x = 0; // Limit horizontal movement
		if (carpeslider.y > carpeslider.yMax) carpeslider.y = carpeslider.yMax; // Limit vertical movement
		if (carpeslider.y < 0) carpeslider.y = 0; // Limit vertical movement
		carpeLeft(carpeslider.id, carpeslider.x);  // move slider to new horizontal position
		carpeTop(carpeslider.id, carpeslider.y); // move slider to new vertical position
		var sliderVal = carpeslider.x + carpeslider.y; // pixel value of slider regardless of orientation
		var sliderPos = (carpeslider.distance / carpedisplay.valuecount) * 
			Math.round(carpedisplay.valuecount * sliderVal / carpeslider.distance);
		var v = Math.round((sliderPos * carpeslider.scale + carpeslider.from) * // calculate display value
			Math.pow(10, carpedisplay.decimals)) / Math.pow(10, carpedisplay.decimals);
		carpedisplay.value = v; // put the new value in the slider display element
		
		//mod
		sliderMoved(carpeslider);
		
		return false;
	}
	return
}
// slide: Handles the start of a slider move.
function slide(evnt)
{
	if (!evnt) evnt = window.event; // Get the mouse event causing the slider activation.
	carpeslider = (evnt.target) ? evnt.target : evnt.srcElement; // Get the activated slider element.
	var dist = parseInt(carpeslider.getAttribute('distance')); // The allowed slider movement in pixels.
	carpeslider.distance = dist ? dist : carpeDefaultSliderLength; // Deafault distance from global var.
	var ori = carpeslider.getAttribute('orientation'); // Slider orientation: 'horizontal' or 'vertical'.
	var orientation = ((ori == 'horizontal') || (ori == 'vertical')) ? ori : carpeSliderDefaultOrientation;
		// Default orientation from global variable.
	var displayId = carpeslider.getAttribute('display'); // ID of associated display element.
	carpedisplay = document.getElementById(displayId); // Get the associated display element.
	carpedisplay.sliderId = carpeslider.id; // Associate the display with the correct slider.
	var dec = parseInt(carpedisplay.getAttribute('decimals')); // Number of decimals to be displayed.
	carpedisplay.decimals = dec ? dec : 0; // Default number of decimals: 0.
	var val = parseInt(carpedisplay.getAttribute('valuecount'))  // Allowed number of values in the interval.
	carpedisplay.valuecount = val ? val : carpeslider.distance + 1 // Default number of values: the sliding distance.
	var from = parseFloat(carpedisplay.getAttribute('from')) // Min/start value for the display.
	from = from ? from : 0 // Default min/start value: 0.
	var to = parseFloat(carpedisplay.getAttribute('to')) // Max value for the display.
	to = to ? to : carpeslider.distance // Default number of values: the sliding distance.
	carpeslider.scale = (to - from) / carpeslider.distance // Slider-display scale [value-change per pixel of movement].
	if (orientation == 'vertical') { // Set limits and scale for vertical sliders.
		carpeslider.from = to // Invert for vertical sliders. "Higher is more."
		carpeslider.xMax = 0
		carpeslider.yMax = carpeslider.distance
		carpeslider.scale = -carpeslider.scale // Invert scale for vertical sliders. "Higher is more."
	}
	else { // Set limits for horizontal sliders.
		carpeslider.from = from;
		carpeslider.xMax = carpeslider.distance;
		carpeslider.yMax = 0;
	}
	carpeslider.startOffsetX = carpeLeft(carpeslider.id) - evnt.screenX; // Slider-mouse horizontal offset at start of slide.
	carpeslider.startOffsetY = carpeTop(carpeslider.id) - evnt.screenY; // Slider-mouse vertical offset at start of slide.
	carpemouseover = true;
	document.addEventListener('mousemove', moveSlider, false); // Start the action if the mouse is dragged.
	document.addEventListener('mouseup', sliderMouseUp, false); // Stop sliding.
	return false;
}
// sliderMouseUp: Handles the mouseup event after moving a slider.
// Snaps the slider position to allowed/displayed value. 
function sliderMouseUp()
{
	if (carpemouseover) {
		var v = (carpedisplay.value) ? carpedisplay.value : 0 // Find last display value.
		var pos = (v - carpeslider.from)/(carpeslider.scale) // Calculate slider position (regardless of orientation).
		if (carpeslider.yMax == 0) {
			pos = (pos > carpeslider.xMax) ? carpeslider.xMax : pos;
			pos = (pos < 0) ? 0 : pos;
			carpeLeft(carpeslider.id, pos); // Snap horizontal slider to corresponding display position.
		}
		if (carpeslider.xMax == 0) {
			pos = (pos > carpeslider.yMax) ? carpeslider.yMax : pos;
			pos = (pos < 0) ? 0 : pos;
			carpeTop(carpeslider.id, pos); // Snap vertical slider to corresponding display position.
		}
		
		if (document.removeEventListener) { // Remove event listeners from 'document' (W3C).
			document.removeEventListener('mousemove', moveSlider, false);
			document.removeEventListener('mouseup', sliderMouseUp, false);
		}
		else if (document.detachEvent) { // Remove event listeners from 'document' (IE).
			document.detachEvent('onmousemove', moveSlider);
			document.detachEvent('onmouseup', sliderMouseUp);
			document.releaseCapture();
		}
	}
	carpemouseover = false; // Stop the sliding.

	//mod
	sliderStopped(carpeslider);	
}
function focusDisplay(evnt)
{
	if (!evnt) evnt = window.event; // Get the mouse event causing the display activation.
	var carpedisplay = (evnt.target) ? evnt.target : evnt.srcElement; // Get the activated display element.
	var lock = carpedisplay.getAttribute('typelock'); // Is the user allowed to type into the display?
	if (lock == 'on') {
		carpedisplay.blur();
	}
	return;
}
function carpeInit() // Set up the sliders and the displays.
{
	carpesliders = carpeGetElementsByClass(carpeSliderClassName) // Find the horizontal sliders.
	for (var i = 0; i < carpesliders.length; i++) 
	{
		carpesliders[i].addEventListener('mousedown', slide, false); // Attach event listener.
		
		
		//mod: init sliders position
		var pos;
		switch(carpesliders[i].getAttribute('id'))
		{
			case 'slider_bgcolor':
				pos = optdomain.sliderBgcolorLastPos;
				break;
			case 'slider_img':
				pos = optdomain.sliderImgLastPos;
				break;
			case 'slider_txtcolor':
				pos = optdomain.sliderTxtcolorLastPos;
				break;
			case 'slider_txtsize':
				pos = optdomain.sliderTxtsizeLastPos;
				break;				
		}
		if(pos!=null)
		{
			if(carpesliders[i].getAttribute('orientation') == 'horizontal')
				carpeLeft(carpesliders[i].getAttribute('id'), pos);
			else
				carpeTop(carpesliders[i].getAttribute('id'), pos);
		}
		
		
	}
	carpedisplays = carpeGetElementsByClass(carpeSliderDisplayClassName) // Find the displays.
	for (var i = 0; i < carpedisplays.length; i++) {
		carpedisplays[i].value = carpedisplays[i].defaultValue; // Resets display on page reload.
		carpedisplays[i].addEventListener('focus', focusDisplay, false); // Attach event listener.
	}
}




/*	Default stylesheet for the Carpe Slider
	By Tom Hermansson Snickars                 
	2005-12-17 version 1.5
	Copyright CARPE Design                     
	carpe.ambiprospect.com
*/
GM_addStyle(
	'*.carpe_horizontal_slider_display_combo {'+
	'	clear: left !important;'+
	'	margin: 0 !important;'+
	'}'+
	'*.carpe_vertical_slider_display_combo {'+
	'	float: left !important;'+
	'	margin: 0 !important;'+
	'}'+
	'*.carpe_horizontal_slider_track {'+
	'	background-color: #bbb !important;'+
	'	color: #333 !important;'+
	'	width: 120px !important;'+
	'	float: left !important;'+
	'	margin: 0 !important;'+
	'	line-height: 0px !important;'+
	'	font-size: 0px !important;'+
	'	text-align: left !important;'+
	'	padding: 4px !important;'+
	'	border: 1px solid !important;'+
	'	border-color: #ddd #999 #999 #ddd !important;'+
	'}'+
	'*.carpe_vertical_slider_track {'+
	'	background-color: #bbb !important;'+
	'	color: #333 !important;'+
	'	padding: 3px 6px 15px 6px !important;'+
	'	width: 24px !important;'+
	'	height: 100px !important;'+
	'	border: 1px solid !important;'+
	'	border-color: #ddd #999 #999 #ddd !important;'+
	'}'+
	'*.carpe_horizontal_slider_track *.carpe_slider_slit {'+
	'	background-color: #333 !important;'+
	'	color: #ccc !important;'+
	'	width: 110px !important;'+
	'	height: 2px !important;'+
	'	margin: 4px 4px 2px 4px !important;'+
	'	line-height: 0px !important;'+
	'	position: absolute !important;'+
	'	z-index: 1 !important;'+
	'	border: 1px solid !important;'+
	'	border-color: #999 #ddd #ddd #999 !important;'+
	'}'+
	'*.carpe_vertical_slider_track *.carpe_slider_slit {'+
	'	background-color: #000 !important;'+
	'	color: #333 !important;'+
	'	width: 2px !important;'+
	'	height: 100px !important;'+
	'	position: absolute !important;'+
	'	margin: 4px 10px 4px 10px !important;'+
	'	padding: 4px 0 1px 0 !important;'+
	'	line-height: 0px !important;'+
	'	font-size: 0 !important;'+
	'	border: 1px solid !important;'+
	'	border-color: #666 #ccc #ccc #666 !important;'+
	'}'+
	'*.carpe_horizontal_slider_track *.carpe_slider {'+
	'	width: 16px !important;'+
	'	background-color: #666 !important;'+
	'	color: #333 !important;'+
	'	position: relative !important;'+
	'	margin: 0 !important;'+
	'	height: 8px !important;'+
	'	z-index: 1 !important;'+
	'	line-height: 0px !important;'+
	'	font-size: 0px !important;'+
	'	text-align: left !important;'+
	'	border: 2px solid !important;'+
	'	border-color: #999 #333 #333 #999 !important;'+
	'}'+
	'*.carpe_vertical_slider_track *.carpe_slider {'+
	'	width: 20px !important;'+
	'	background-color: #666 !important;'+
	'	color: #333 !important;'+
	'	position: relative !important;'+
	'	margin: 0 !important;'+
	'	height: 8px !important;'+
	'	z-index: 1 !important;'+
	'	line-height: 0px !important;'+
	'	font-size: 0px !important;'+
	'	text-align: left !important;'+
	'	border: 2px solid !important;'+
	'	border-color: #999 #333 #333 #999 !important;'+
	'}'+
	'*.carpe_slider_display_holder {'+
	'	background-color: #bbb !important;'+
	'	color: #333 !important;'+
	'	width: 34px !important;'+
	'	margin: 0 !important;'+
	'	float: left !important;'+
	'	padding: 0 2px 0 0 !important;'+
	'	height: 20px !important;'+
	'	text-align: right !important;'+
	'	border: 1px solid !important;'+
	'	border-color: #ddd #999 #999 #ddd !important;'+
	'}'+
	'.carpe_slider_display {'+
	'	background-color: #bbb !important;'+
	'	color: #333 !important;'+
	'	padding: 3px 1px 0 0 !important;'+
	'	width: 30px !important;'+
	'	text-align: right !important;'+
	'	font-size: 11px !important;'+
	'	line-height: 10px !important;'+
	'	font-family: verdana, arial, helvetica, sans-serif !important;'+
	'	font-weight: bold !important;'+
	'	border: 0 !important;'+
	'	cursor: default !important;'+
	'	margin: 0 !important;'+
	'}'
);



//image data
function init_img()
{
	lamp_off_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe1JREFUeNpkU02rcVEUXuc4vkOGRAwpZSgxUZShuQm/4vYO3pzzdsd+jCjyF5QiKQMkmSDymc/97meVm3vvqtXe7bOetZ71rHUUIQS9bLPZVNbrtb7f7wl+Pp/p8XiQ2WymYDCoRyIR4xWrvIDj8VhcLhdyOp1ks9nIYrGQoiiEN5mM+v0+x+Xzed3tdhsMHAwGwuFwkNfrpefzSff7nR3V8B2JkLDT6dBwOKRSqaQrk8lEgFIgEKDr9cqVQA0nDBW32y17OBymWq1GHo+H1NlsxheAQE3TNK4CABwM7HY7mUwmGo1GlEwmmba22+2YyvF4JFVVv1HECSCSrlYr7jUUCrFoGqocDgeyWq3U7Xb5BFUkARhBOJfLJbeDQmClgTcopFIpDsAH0Hr1h17lmPgei8Wo3W6THAup0WhUx6NUlhKJxBfodruxwwDOZrM0nU45LpfLVTRJyUin09RoNHQEoVdIz3Skw7AMi8WCWq0Wj8Llcv37WgBsTbPZ1CEAgOgR4qDnXq9HcuhULpd1v99vfNsc2Hw+r9TrdR10oSKqn04nrlatVv9K0OcrVqU3k6oZUBjjgYJyP0kG8xzfQTCNfhhWz+fzUTweJywHhi17ol8Gqu8uaf0pFotCKicymYwoFApC/gAfP+P+CzAAmPhAEzyJ4TsAAAAASUVORK5CYII=";
	lamp_on_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoFJREFUeNpsUltLVFEU/vY5e67OTVMnqSxBKHLK1BBS6gdED+FT89ZLPfVcoNCciaIbBPVeD12g6KWwwgtCFJJBhRReEhlpsshRZ5wZz5mZc/bMbs3IhFmLvdjszfet9a0Lk1KiaunEbKSYWdBUsQJZWIM00xD5HAoCkL6QtqsrHK1iWZlo5rMR/eeE5nYUoToDYA5y7gZjDKW8AZGKQZ9/iUxWR23PgOYPtkaZsAqRdGxQ89YFofp2U6wSHZ1SmJAls/JmNj8FacD65COszAwhePKBxhJzQ9LnErAHOwhogCkuQPFs3GTlP2l+R8mKg3uOYPnVRayaTigsPQ3V00wIg4RzcmclS4VADinAVB/9cYj1Ufg6T0NZfAfOCkkoDi9KYolINuLkIItFugWktKgJJFkxUCzEIK152P09BMmBF/ImRDYBHvDATDwmiW7kPsxRAspMxGJmCTXHuqlJM7D5O2AmlygQh2J5QzAW3pCc7ZTFQubFEzgONcAR8sC+3wZ3716k7l9FqbAKvq0PyYmHsOrboezsCt9Ir/yCPjsMR9MZKrHcFJqtSvXxcncllBov3Hv6kZ2cRHJqBM3H+zWuqvyCv/OskRy/pkEy2LwHNiZcdFF9zkoQXteNzKd5/Bi9hZoT17VAsCXKqpuTXJyOLL+9o/lyC6htscG+T1RmWYoF8H14HCl7C4J9N7UdbUejfzanal8/T0TGnt3VfPWN0PXXWNctJFJt+Db1EZdv39Na2w7/vXKbLdJ/TraGekmqAiOnI2vk8H7sOZ4OjrDNOI4tJmmETcFGtB9sRzwex5epafB/UP8hhsOntEj0iramCwhhwWUHogPnL23F/RZgALZtJ5mXblnLAAAAAElFTkSuQmCC";
}




//add css for slider container
function init_css()
{
	GM_addStyle(
	
		'*.sliderContainer { '+
			'padding: 10px !important; '+
			'position: fixed !important; top: 0px !important; right: 0px !important; '+
			'z-index: 2147483646 !important; '+
			'background-color: #dddddd !important; '+
			'border: 1px solid #aaaaaa !important; '+
			'-moz-border-radius: 3px;'+
			'font-family: verdana,arial,helvetica,sans-serif !important;'+
			'font-size: 12px !important;'+
			'font-weight: normal !important;'+
			'color: #000000 !important;'+
			'text-align: left !important;'+
			'max-width: 45% !important;'+
		'}'+
		
		
		'*.sliderContainer table { '+
			'margin-right: 18px !important;'+
		'}'+
		
		
		'*.sliderContainer table, *.sliderContainer td { '+
			'border-collapse: collapse !important;'+
			'border-style: hidden !important;'+
			'border: none !important;'+
			'margin:0 !important; '+
			'padding:0 !important;'+
			'font-family: verdana,arial,helvetica,sans-serif !important;'+
			'font-size: 12px !important;'+
			'font-weight: normal !important;'+
			'color: #000000 !important;'+
			'background-color: #dddddd !important; '+
			'text-align: left !important;'+		
		'}'+
		
		
		'*.sliderContainer label { '+
			'display:inline !important;'+
		'}'+
		
		
		'#opt_combob_autorunStart, #opt_combob_autorunEnd { '+
			'font-family: verdana,arial,helvetica,sans-serif !important;'+
			'font-size: 10px !important;'+
			'font-weight: normal !important;'+
		'} '+
		
		
		'#lamp { position:fixed !important; top:1px !important; right:1px !important; z-index:2147483647 !important; cursor:pointer !important; display:block !important; visibility:visible !important; }'+
		
		
		'.sliderContainer  a:link { color: black !important; text-decoration: none !important; background: none !important;}'+
		'.sliderContainer  a:hover { color: black !important; text-decoration: underline !important; background: none !important;}'+
		'.sliderContainer  a:active { color: black !important; text-decoration: none !important; background: none !important;}'+
		'.sliderContainer  a:visited { color: black !important; text-decoration: none !important; background: none !important;}'
	);
}


/*
- use canvas to detect if background-image is white pixel?
- user custom sliders?
- options:
	- themes combobox
	- borders? 
- bugs 
	- getStyle() error in new google ajax search
	- NoScript prevent some modifications when toggle on (http://snippets.dzone.com/posts/show/6557)
	- borders (http://www.w3schools.com/css/css_pseudo_classes.asp)
	- atribute change listeners ? (http://news.google.com.br/nwshp?hl=pt-BR&tab=wn)
*/