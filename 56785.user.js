// ==UserScript==
// @name           Userscripts Updater
// @namespace    meh
// @description   Easy way to check for scripts updates. Automatic checking, import installed scripts.
// @include        *
// ==/UserScript==

//place menu at tools->greasemonkey
GM_registerMenuCommand('Updater: search updates', updateScripts);
GM_registerMenuCommand('Updater: show options', options);
GM_registerMenuCommand('Updater: reset positioning', resetPos);

if(GM_getValue('import')){
	try{ 
		importFromDisk(null);
		return;
	}catch(e){
		GM_setValue('import','');
	}
	return;
}else{
	//exit script if not necessary
	//if(location.href.search(/userscripts.org/)<0 && !GM_getValue("optionAutoSearch"))
	//	return;
}

	
//--------------------------------------------------here we go----------------------------------------------------------------//
var div, spanOutdateds, spanUpdateds, li, a, divsource, divoptions, css;
var outdateds=0, spanCount, totalScripts, contScripts=0, notfound=0, zindex = 10000;
var imgCompare, imgUpdate, imgHide, imgRemove, imgZombie;
var fadeNode;

//CSS
getTag('head')[0].appendChild(getCSS());

//images
images();

//place menu at Userscripts.org
if(location.href.search(/^http\:\/\/userscripts.org/) > -1 || location.href.indexOf('http://goallineblitz.com') > -1)
{
	var div = createElement('div', {id:'divMenu', style:"position:absolute; top:3px; right:3px; z-index:1000; background-color:#FFFFAA; padding:2px 5px 2px 5px; -moz-border-radius:3px; font-size:small; cursor:move;"});	
	document.body.appendChild(div);
	div.addEventListener('mousedown', dragHandler, false);
	if(GM_getValue('menuTop') && GM_getValue('menuLeft')){
		div.style.right = null;		
		div.style.left = GM_getValue('menuLeft');
		div.style.top =  GM_getValue('menuTop');
	}	
	
	//add update link.
	a = createElement('a', {class:"USO_outdatedLink", href:"javascript:void(0)", style:'text-decoration:none !important;'}, 'click updateScripts false', 'Update scripts');
	div.appendChild(a);
	div.appendChild(createElement('span',null,null,'&nbsp;'));

	//add options link
	a = imgOptions.cloneNode(false);
	a.addEventListener('click', options, false);
	div.appendChild(a);
	
	//add event register to any install buttons
	var links = getTag('a');
	for(var i=0; i<links.length; i++)
	{
		if(links[i].getAttribute('href') && links[i].getAttribute('href').search(/\/scripts\/source\/\d+\.user\.js/) > -1)
		{
			links[i].addEventListener('click', register, false);	
		}
	}
}


//Auto search time?
if(GM_getValue("optionAutoSearch"))
{
	var lastSearch;
	
	lastSearch = parseInt(GM_getValue("optionAutoSearchLast"));

	if(!lastSearch){
		//first search
		GM_setValue("optionAutoSearchLast", ""+new Date().getTime());
		updateScripts();
	}else{
		//check time elapsed from last search
		var now = parseInt(new Date().getTime());
		var searchFreq = parseInt(GM_getValue("optionAutoSearchFreq"));
		
		//search update
		if(now - lastSearch > searchFreq){
			GM_setValue("optionAutoSearchLast", ""+now);
			updateScripts();
		}
	}
}


function updateScripts(evt)
{
	var id=null, time=null, info;	

	if(getId('divUpdater'))
		return;
	
	/* 
	  * try to import info from previous versions if updater is empty
	  */
	try{
		if(!GM_getValue('info2') || GM_getValue('info2').search(/26062\=\d+/)==0){
			if(GM_getValue('info')){
				var imp = GM_getValue('info').replace(/\=\d+/g,'=0');//set previous timestamps to 0
				GM_setValue('info2', imp);
				GM_setValue('backup', GM_getValue('info'));
				GM_setValue('info','');
			}
		}
	}catch(e){
	}
	
	//if Updater is not registered, do it 
	if( !getValueForId(26062,"info2") ){
		register(null);//event==null will be interpreted as self register...
	}
	
	//in case there's no script registered... "impossible!"?
	if(!GM_getValue('info2')){
		if(evt)
			alert("No scripts added to updater yet. To add a script click install button at the script's page.");
		return;
	}
	
	
	//div result
	div = createElement('div', {id:"divUpdater", style:"background-color:#FFFFAA; position:absolute; top:3px; right:3px; min-width:250px; min-height:50px; max-width:50%; padding:5px; -moz-border-radius:3px; font-size:small; text-align:left; z-index:"+(zindex++)+"; cursor:move;"});
	if(GM_getValue('updaterTop') && GM_getValue('updaterLeft')){
		div.style.right = null;		
		div.style.left = GM_getValue('updaterLeft');
		div.style.top =  GM_getValue('updaterTop');
	}
		
	spanCount = createElement('span',{style:"color:#749EC9; font-weight:bold; cursor:default;"},null,'Searching updates...');
	div.appendChild(spanCount);
	div.appendChild(createElement('span',{id:"spanUpdateProgress", style:"font-size:x-small; color:#aaaaaa; opacity:1;"}));
	div.appendChild(createElement('br'));
	spanOutdateds = createElement('span');
	div.appendChild(spanOutdateds);
	spanUpdateds = createElement('span', {style:"font-size:small; color:#aaaaaa"});
	div.appendChild(spanUpdateds);
	getTag('body')[0].appendChild(div);
	div.addEventListener('mousedown',dragHandler,false);
	

	//close link
	div.appendChild(createElement('a', {href:"javascript:void(0)", style:"position:absolute; right: 3px; top: 3px; font-size:x-small", class:"USO_outdatedLink"}, "click close false", "close"));
	
	//get scripts info
	info = GM_getValue('info2');
	if(!info)
		return;
	info = info.split(';');
	totalScripts = info.length;
	
	//check each script 
	for(var i=0; i<info.length; i++)
	{			
		id = info[i].split('=')[0];
		time = info[i].split('=')[1];	
		request(id);		
	}
	
	//set last update info
	GM_setValue("optionAutoSearchLast", ""+new Date().getTime());
}



function options()
{
	if(getId('divOptions'))
		return;

	var spanAutoCheck = createElement('span', {id:"spanAutoCheck", style:"font-size:small;"});
	
	//div options
	divoptions = createElement('div', {id:"divOptions", style:"text-align:left; background-color:#FFFF77; position:absolute; top:3px; right:3px; min-width:250px; min-height:50px; padding:5px; -moz-border-radius:3px; font-size:small; color:#222222; z-index:"+(zindex++)+"; cursor:move;"});	
	if(GM_getValue('optionsTop') && GM_getValue('optionsLeft')){
		divoptions.style.right = null;
		divoptions.style.left = GM_getValue('optionsLeft');
		divoptions.style.top = GM_getValue('optionsTop');
	}
	getTag('body')[0].appendChild(divoptions);
	divoptions.addEventListener('mousedown',dragHandler,false);
	divoptions.appendChild(spanAutoCheck);
	
	//close link
	divoptions.appendChild(createElement('a', {href:"javascript:void(0)", style:"position:absolute; right: 3px; top: 3px; font-size:x-small", class:"USO_outdatedLink"}, "click closeoptions false", "close"));

	//checkbox auto search updates
	spanAutoCheck.appendChild(createElement('input', {id:"cboptionautosearch", type:"checkbox"}, 'click optionAutosearchEvtCheckbox false'));
	spanAutoCheck.appendChild(createElement('span', {style:'cursor:default;'}, '', 'Automatically search updates'));

	//select auto-check frequency 
	spanAutoCheck.appendChild(createElement('br'));
	spanAutoCheck.appendChild(createElement('span',{style:"margin-left:20px; cursor:default;"},'',' Every:  '));
	spanAutoCheck.appendChild(createElement('select', {id:"comboOptionAutoCheck", style:"font-size:x-small;"}));
	var sel = getId('comboOptionAutoCheck');
	for(var i=10; i<61; i+=10){//value attribute in miliseconds 
		sel.appendChild(createElement('option', {value:(i*60000)}, '', i+' minutes'));
	}	
	for(var i=2; i<25; i++){
		sel.appendChild(createElement('option', {value:(i*3600000)}, '', i+' hours'));
	}
	for(var i=2; i<8; i++){
		sel.appendChild(createElement('option', {value:(i*86400000)}, '', i+' days'));
	}
	
	
	//Option icons
	divoptions.appendChild(createElement('br'));
	divoptions.appendChild(createElement('br'));
	divoptions.appendChild(createElement('input', {type:"checkbox", id:"checkboxIcons"}));
	divoptions.appendChild(createElement('span',{style:'cursor:default;'},'',"Use icons"));
	getId("checkboxIcons").checked = GM_getValue("icons");	
	
	
	
	//set visual state of options
	if(!GM_getValue("optionAutoSearch"))
	{
		spanAutoCheck.style.color = "#aaaaaa";
		getId("comboOptionAutoCheck").setAttribute('disabled','disabled');
	}
	else
	{
		getId("cboptionautosearch").checked = GM_getValue("optionAutoSearch");
		getId("comboOptionAutoCheck").value = GM_getValue("optionAutoSearchFreq");
		
		//time until next auto search
		if(GM_getValue("optionAutoSearchLast"))
		{
			var now, searchFreq, nextSearch, amount, days, hours, mins, secs;
			now = new Date();
			searchFreq = parseInt(GM_getValue("optionAutoSearchFreq"));		
			nextSearch = new Date();
			nextSearch.setTime(parseInt(GM_getValue("optionAutoSearchLast")) + searchFreq);
			
			//From http://www.ricocheting.com/js/countdown.html
			amount = Math.floor((nextSearch - now)/1000);//kill the "milliseconds" so just secs
			days = Math.floor(amount/86400);//days
			amount = amount%86400;
			hours = Math.floor(amount/3600);//hours
			amount = amount%3600;
			mins = Math.floor(amount/60);//minutes
			amount = amount%60;
			secs = Math.floor(amount);//seconds			
			
		
			spanAutoCheck.appendChild(createElement('br'));
			spanAutoCheck.appendChild( createElement('span',{style:"margin-left:20px; font-size:x-small; color:#aaaaaa; cursor:default;"}, '', "(Next search in "+((days>0)?(days+" days, "):"") + ((hours>0)?(hours+" hours, "):"") + ((mins>0)?(mins+" mins, "):"") +secs+" secs)"));
		}
	}
	
	//registered scripts
	var titles = GM_getValue("titles"), id, title, divScripts, a, img;
	if(titles){
		divoptions.appendChild(createElement('span', {style:'cursor:default;'}, '', "<br><br>"+(titles.match(/=/)?titles.match(/=/g).length+" ":"")+"script(s)<br>"));
		
		//scroll box
		divScripts = createElement('div',{id:"divRegisteredScripts", style:"overflow:auto; background-color:#FFFFAA; height:150px; padding:3px; cursor:default;"});
		divoptions.appendChild(divScripts);
		
		titles = titles.split(';');
		titles.sort(function(a,b){ return ((a.split('=')[1] < b.split('=')[1]) ? -1 : 1) });
		for(var i=0; i<titles.length; i++){
			id = titles[i].split('=')[0];
			
			//keep consistency between titles and info2
			if(!getValueForId(id,"info2")){
				removeById(id,"titles");
				continue;
			}
			
			title = unescape(titles[i].split('=')[1]);
			divScripts.appendChild( createElement('a', {class:"USO_outdatedLink", target:"_blank", href:"http://userscripts.org/scripts/show/"+id, style:"font-size:small;"}, null, title));
			

			//remove
			img = imgRemove.cloneNode(false);
			img.setAttribute('id',id);
			a = createElement('a', {id:id, title:"remove from updater"}, 'click unregister false');
			a.appendChild(img);
			divScripts.appendChild(a);
			divScripts.appendChild( createElement('br'));
		}
	}
	else
	{
		divoptions.appendChild( createElement('br'));
	}
	
	//import
	divoptions.appendChild(createElement('br'));
	divoptions.appendChild(createElement('a', {class:'USO_outdatedLink', href:'javascript:void(0)'}, 'click importFromDisk false', 'Import installed scripts'));
	
	// import profile path...  http://kb.mozillazine.org/Profile_folder
	divoptions.appendChild(createElement('br'));
	divoptions.appendChild(createElement('span',{style:'cursor:default;'},'',"&nbsp;&nbsp;from&nbsp;"));
	divoptions.appendChild(createElement('input', {id:"optionImportPath", style:'width:75%; font-size:x-small;'}));
	divoptions.appendChild(createElement('span',null,null,'&nbsp;<a href="javascript:void(0);" onclick=\'alert("Optional field. \\nSpecifies the absolute path to your firefox profile\. \\nSomething like ...\/...\/Firefox\/Profiles\/sycu5n8r\.default");\'>?</a>'));
	//<input value="" title="Pesquisa Google" size="55" name="q" maxlength="2048" autocomplete="off"/>
	getId('optionImportPath').value = ((GM_getValue("optionImportPath"))?GM_getValue("optionImportPath"):"I'm feeling lucky");
	divoptions.appendChild(createElement('br'));
	divoptions.appendChild(createElement('br'));

	
	//Ok 'button'
	//divoptions.appendChild(createElement('br'));
	divoptions.appendChild(createElement('span',{id:"spanOptionsOk"}));
	getId("spanOptionsOk").appendChild(createElement('a', {href:"javascript:void(0)", class:"USO_outdatedLink"}, 'click saveOptions false', 'save'));
	
	
	//close link
	getId('spanOptionsOk').appendChild(createElement('span','','','&nbsp;&nbsp;'));
	getId('spanOptionsOk').appendChild(createElement('a', {href:"javascript:void(0)", class:"USO_outdatedLink"}, "click closeoptions false", "cancel"));		
}

function checkImportBuffer()
{
	if(GM_getValue('import')!='showScriptsFound')
		setTimeout(checkImportBuffer, 1000);
	else
		importFromDisk();
}

function importFromDisk(evt)
{
	var state = GM_getValue('import');
	
	if(!state && !confirm('This will *try* to import scripts from your Firefox profile. \nIt\'s still *experimental*, some scripts may not be imported. \nContinue?'))
		return;
	
	if(!state)
	{
		//block ran by caller tab
		GM_setValue('importData','');
		setTimeout(checkImportBuffer, 1000);
		
		//firefox profile path
		var path = getId('optionImportPath').value;	
		if(path && path.replace(/^\s*|\s*$/,'')!='' && path.search(/I\'m feeling lucky/)<0)	
		{
			//get path defined by user
			path = 'file:///' + path.replace(/\\/g,'/') + '/gm_scripts/config.xml';
			GM_setValue('import','doXML');
			GM_openInTab(path);
		}
		else
		{
			//try to detect path
			GM_setValue('import', 'getDirPath');
			GM_openInTab("about:cache");
		}
	}
	else
	{
		var path = null, conf, rex, aux;
		try{
			switch(state)
			{
				case 'getDirPath': // done in new tab
					if(location.href != 'about:cache')
						throw "e";
					
					//detect path, thanks to sizzlemctwizzle(http://userscripts.org/users/27715)
					try{
						// Get the Cache path no matter what it is
						path = document.body.innerHTML.match(/Cache Directory:\<\/b\>\<\/td\>\n*\<td\>\<tt\>\s*(.*)\s*\<\/tt\>/);
					}catch(e){
					}
					
					if(win_path = path[1].match(/(\D:.*\\)\D*Cache/)) // Windows
					{
						// <tt> X:\Users\<username>\AppData\Local\Mozilla\Firefox\Profiles\<profile>\Cache</tt>
						// also works for X:\Users\<username>\AppData\Local\Mozilla\Firefox\Profiles\<profile>\OfflineCache for Firefox Portable
						// X:\Users\<username>\AppData\Local\Mozilla\Firefox\Profiles\<profile>
						path = 'file:///' + win_path[1].replace(/\\[^\\]+$/,'').replace(/\\/g,'\/').replace(/[^\/]+$/,'') + 'gm_scripts/config.xml';
						var localConfSubdir = new RegExp(path.match(/\D:\/[^\/]+\/[^\/]+\/([^\/]+\/)/)[1]);
						path = path.replace(localConfSubdir,'');
					}
					else if (mac_path = path[1].match(/\/(Users\/.*)\/Cache/)) // Mac
					{
						// Confirmed to work
						// <tt> /Users/<username>/Library/Caches/Firefox/Profiles/<profile>/Cache</tt>
						// Users/<username>/Library/Application Support/Firefox/Profiles/<profile>
						path = 'file:///' + mac_path[1].replace(/Caches/, 'Application Support') + '/gm_scripts/config.xml';
					}
					else if (linux_path = path[1].match(/\/(home\/.*)\/Cache/)) // Linux
					{
						// Confirmed to work(Ubuntu)
						// <tt> /home/<username>/.mozilla/firefox/<profile>/Cache</tt>
						// /home/<username>/.mozilla/firefox/<profile>
						path = 'file:///' + linux_path[1] + '/gm_scripts/config.xml';
					}
                    // If we caught the path then store it
					if (path.match(/file:/)) 
						GM_setValue('importPath', escape(path));
					GM_setValue('import','doXML');
					location.href = path;
					break;
					
				case 'doXML': 	// done in new tab
					var scripts = getTag('Script');
					if(!scripts || scripts.length==0){//profile path not working
						throw "Updater couldn't find path to Firefox profile.";
					}
						
					aux = "";
					for(var i=0; i<scripts.length; i++)//makes tr element
					{
						aux += '<span id="USO_TITLE_'+scripts[i].getAttribute('name')+'">'+
									'<input type="checkbox" id="importCheckOne"></input>'+
									'<input type="hidden" value="'+escape(scripts[i].getAttribute('name'))+'"></input>'+
									'<input type="hidden" value="'+escape(scripts[i].getAttribute('namespace'))+'"></input>'+
									'<input type="hidden" value="'+scripts[i].getAttribute('enabled')+'"></input>'+
									'<input type="hidden" value="'+scripts[i].getAttribute('basedir')+'"></input>'+
									'<input type="hidden" value="'+scripts[i].getAttribute('filename')+'"></input>'+
									'<span>'+scripts[i].getAttribute('name')+'</span>'+
								'<br></span>';
					}
					GM_setValue('importData', escape(aux));
					GM_setValue('import', 'showScriptsFound');//will be read by caller tab
					break;
				
				case 'showScriptsFound': //done by caller tab
					
					GM_setValue('import', '');
					closeoptions();
					
					var scripts = unescape(GM_getValue('importData'));
					getTag('body')[0].appendChild( createElement( 'div', 
						{id:'divImport', style:'text-align:left; background-color:#FFFF77; position:absolute; top:3px; left:3px; min-width:250px; min-height:50px; padding:5px; -moz-border-radius:3px; font-size:small; color:#222222; z-index:'+(zindex++)+';'}, 
						null, 
						'<span id="spanImportSearchCount" style="color:#749EC9; font-weight:bold">Searching userscripts.org...</span><br>'+
						'Select all: <input type="checkbox" title="check all" id="importCheckAll"></input>'+
						'<div id="divImportScroll" style="overflow:auto; background-color:#FFFFAA; height:150px; padding:3px;">'+scripts+'</div><br>'+
						'<input type="button" value="searching..." id="importButton" disabled="yep"></input>'+
						'<input type="button" value="cancel" id="importCancelButton"></input>'
					));
					if(GM_getValue('optionsTop') && GM_getValue('optionsLeft')){
						getId('divImport').style.right = null;
						getId('divImport').style.left = GM_getValue('optionsLeft');
						getId('divImport').style.top = GM_getValue('optionsTop');
					}
					
					//drag handler
					getId('divImport').addEventListener('mousedown',dragHandler,false);
					
					// check all
					getId('importCheckAll').addEventListener('click', importCheck, false);
					
					//import button
					getId('importButton').addEventListener('click', importSelectedScripts, false);
					
					//close button
					getId('importCancelButton').addEventListener('click', closeImport, false);
					
					importSearch();
					break;
			}
		}catch(e){
			alert(e);
			importCleanup();
			return;
		}
	}
	
}

function importCleanup()
{
	if(objImportSearch)
		objImportSearch.done = true;
	GM_setValue('import', '');
	GM_setValue('importData', '');
	GM_setValue('importPath', '');
}


function importSelectedScripts(evt)
{
	getId('importButton').setAttribute('value','importing...');
	getId('importButton').setAttribute('disabled','yep');
	var cb = xpathArray('//input[@type="checkbox"]', getId('divImportScroll'));
	var noneSelected = true;
	
	objImportSearch.importTotal=0;
	objImportSearch.importCount=0;
	
	for(var i=1; i<cb.length; i++)
		if(cb[i].checked)
			objImportSearch.importTotal++;
	
	for(var i=1; i<cb.length; i++){
		if(cb[i].checked){
			noneSelected = false;
			id = getTag('a',cb[i].parentNode)[0].getAttribute('href').match(/\d+/);
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://userscripts.org/scripts/source/'+id+'.meta.js',
				onload: function(resp) {
					var id = resp.responseText.match(/\@uso\:script\s+(\d+)/)[1];
					
					//store current version
					var currentVersion = resp.responseText.match(/\@uso\:version\s+(\d+)/)[1];
					setValueForId(id, currentVersion, "info2");
					
					//set title if not present
					if(!getValueForId(id, "titles")){
						var name = resp.responseText.match(/\@name\s+([^\n\r]+)/)[1].replace(/\s+$/,'');
						setValueForId(id, escape(name), "titles");
					}
					
					objImportSearch.importCount++;
					getId('spanImportSearchCount').innerHTML = 'importing... '+objImportSearch.importCount+'/'+objImportSearch.importTotal;
					if(objImportSearch.importCount==objImportSearch.importTotal){
						alert('Import finished. \n - Updater will assume the scripts are up to date.\n - Theres a new tab containing XML that can be closed now.')
						closeImport();
					}
				}
			});	
		}
	}
	if(noneSelected){
		getId('importButton').removeAttribute('disabled');
		getId('importButton').setAttribute('value','import');
		alert('Select scripts to import...');
	}
}

var objImportSearch;
function importSearch()//search  scripts sequentially
{
	//weird bug requires update div to be closed
	if(getId('divUpdater'))
		close();
	
	//create object for importing
	if(!objImportSearch || objImportSearch.done)
	{
		objImportSearch = new Object();
		objImportSearch.done = false;
		objImportSearch.notfound = 0;
		objImportSearch.divAppend = getId('divImportScroll');
		objImportSearch.arraySpans = xpathArray('//span[contains(@id,"USO_TITLE_")]', objImportSearch.divAppend);
		objImportSearch.indexSpan = 0;
		objImportSearch.scriptSpan = objImportSearch.arraySpans[objImportSearch.indexSpan];
		objImportSearch.scriptSpanContent = getTag('span', objImportSearch.scriptSpan)[0];
		objImportSearch.scriptAttr = xpathArray('.//input[@type="hidden"]', objImportSearch.scriptSpan);
		objImportSearch.name = unescape(objImportSearch.scriptAttr[0].getAttribute('value').replace(/%20$/,'').replace(/^%20/,''));
	}
	
	//notify script being searched
	objImportSearch.scriptSpanContent.innerHTML = 'Searching...';
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/search?q='+objImportSearch.name.replace(/\s+/g,'+'),
		onload: function(resp) {
			//   <a class="title" title="YouTube "Lights Out"" href="/scripts/show/11058">YouTube "Lights Out"</a>
			var rex = new RegExp('<a[^>]+>'+objImportSearch.name.replace(/([@_'".*+?^${}()|[\]\/\\])/g,'\\$1')+'</a>', 'g');//escape
			var links = resp.responseText.match(rex);
			if(!links || links.length!=1){
				objImportSearch.notfound++;
				//disable import checkbox
				xpathArray('.//input[@type="checkbox"]',objImportSearch.scriptSpan)[0].setAttribute('disabled','yep');
				//link to search Userscripts.org
				objImportSearch.scriptSpanContent.innerHTML = objImportSearch.name +' (';
				objImportSearch.scriptSpanContent.appendChild(createElement('a',{target:'_blank', href:'http://userscripts.org/scripts/search?q='+objImportSearch.name.replace(/\s+/g,'+')}, null, 'search link'));
				objImportSearch.scriptSpanContent.innerHTML += ')';
			}else{
				//add link to script page 
				objImportSearch.scriptSpanContent.innerHTML = '';
				objImportSearch.scriptSpanContent.appendChild(createElement('a',{class:'USO_outdatedLink', target:'_blank', href:'http://userscripts.org'+links[0].match(/\/scripts\/show\/\d+/)},null, objImportSearch.name));
			}
			
			//search counter...
			getId('spanImportSearchCount').innerHTML = 'Searching userscripts.org... ' + (parseInt(objImportSearch.indexSpan)+1) +'/'+objImportSearch.arraySpans.length;
			
			//set next search
			objImportSearch.indexSpan++;
			objImportSearch.scriptSpan = objImportSearch.arraySpans[objImportSearch.indexSpan];
			if(!objImportSearch.scriptSpan){//end search
				objImportSearch.done = true;
				getId('importButton').removeAttribute('disabled');
				getId('importButton').setAttribute('value', 'import');
				getId('spanImportSearchCount').innerHTML = 'Select scripts to import.';
				if(objImportSearch.notfound > 0)
					getId('spanImportSearchCount').innerHTML += '<br>'+objImportSearch.notfound+' not found.'
				sortScripts(getId('divImportScroll'));
				return;
			}
			objImportSearch.scriptSpanContent = getTag('span', objImportSearch.scriptSpan)[0];
			objImportSearch.scriptAttr = xpathArray('.//input[@type="hidden"]', objImportSearch.scriptSpan);
			objImportSearch.name = unescape(objImportSearch.scriptAttr[0].getAttribute('value').replace(/%20$/,'').replace(/^%20/,''));
			if(!objImportSearch.done)
				setTimeout(importSearch,300);
		}
	});
}



function importCheck(evt)
{
	var arr = xpathArray('//input[contains(@id,"importCheckOne")]');
	var bol = getId('importCheckAll').checked;
	arr.forEach(function(c){
		if(!c.getAttribute('disabled'))
			c.checked = bol;
	});
}



function closeImport(evt)
{
	zindex--;
	importCleanup();
	getId('divImport').parentNode.removeChild(getId('divImport'));
}


function optionAutosearchEvtCheckbox(evt)
{
	//auto-search
	if(getId("cboptionautosearch").checked){
		getId("spanAutoCheck").style.color = "#222222";
		getId("comboOptionAutoCheck").removeAttribute('disabled');
	}else{
		getId("spanAutoCheck").style.color = "#aaaaaa";
		getId("comboOptionAutoCheck").setAttribute('disabled','disabled');
	}
}


function saveOptions(evt)
{
	//auto-search
	if(getId("cboptionautosearch").checked){
		GM_setValue("optionAutoSearch",true);
		GM_setValue("optionAutoSearchFreq", getId("comboOptionAutoCheck").value);
		
		//set last update info
		if(!GM_getValue("optionAutoSearchLast"))
			GM_setValue("optionAutoSearchLast", ""+new Date().getTime());		
	}else{
		GM_setValue("optionAutoSearch",false);
	}
	
	//icons
	GM_setValue("icons",getId("checkboxIcons").checked);
	
	//import path
	var path = getId('optionImportPath').value;	
	if(path && path.replace(/^\s*/,'').replace(/\s*$/,'')!='' && path.search(/I\'m feeling lucky/)<0)	
		GM_setValue("optionImportPath",path);
	else
		GM_setValue("optionImportPath",'');
	
	closeoptions();
}



//http://userscripts.org/forums/1/topics/193
function Scope(o) {
	var scope = this;
	for (a in o)
		this[a] = o[a];
	
	this.callback = function(r) {scope.func.call(scope, r);};
}



function closeoptions(evt)
{
	zindex--;
	divoptions.parentNode.removeChild(divoptions);
}


function close()
{
	zindex--;
	div.parentNode.removeChild(div);
	outdateds=0;
	contScripts=0;
	notfound=0;
}


function request(id)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+id+'.meta.js',
		onload: function(responseDetails) {
			checkVersion(responseDetails, id);
		}
	});
}

function debug(str)
{
	
	var d = document.getElementById('debugg');
	if(!d){
		var div = document.createElement('div');
		div.setAttribute('id','divdebug');
		div.setAttribute('style', 'background-color:#000000; position:fixed; bottom:3px; left:3px; width:50%; z-index:9999;');
		
		var closeButton = document.createElement('input');
		closeButton.setAttribute('id','closedebug');
		closeButton.setAttribute('type', 'button');
		closeButton.setAttribute('value', 'close');
		closeButton.setAttribute('onClick', 'this.parentNode.parentNode.removeChild(this.parentNode);');
		
		d = document.createElement('textarea');
		d.setAttribute('id','debugg');
		d.setAttribute('style',"height:200px; width:99%; margin:2px;");
		
		div.appendChild(d);
		div.appendChild(document.createElement('br'));
		div.appendChild(closeButton);
		document.body.appendChild(div);
	}
	d.innerHTML += '\n'+str;
	d.scrollTop = d.scrollHeight;
}




function checkVersion(resp, id)
{
	var txt, error404=false, aux, img, a, currentVersion, name;
	title = null;
	try{
		currentVersion = parseInt(resp.responseText.match(/\@uso\:version\s+(\d+)/)[1]);

		//script's name
		title = resp.responseText.match(/\@name\s+([^\n\r]+)/)[1].replace(/\s+$/,'');
		
		//store name if not stored, nor changed
		aux = getValueForId(id,"titles");
		if(!aux || title!=aux){
			setValueForId(id, escape(title), "titles");
		}
	}catch(e){
		error404 = true;
	}

	
	/*
	  * mounting the list
	  */
	
	if(error404){
		notfound++;
		if(!title)
			title = getValueForId(id,"titles");
		var s = createElement('span',{id:'USO_TITLE_'+title});
		spanUpdateds.appendChild(s);
		
		//title
		s.appendChild( createElement('a', {target:"_blank", href:"http://userscripts.org/scripts/show/"+id, class:"USO_updatedLink", title:"home"}, null, 'not found: '+(title?title:'script '+id)));

		//remove
		img = imgRemove.cloneNode(false);
		img.setAttribute('id',id);
		a = createElement('a', {id:id, title:"remove from updater"}, 'click unregister false');
		a.appendChild(img);
		s.appendChild(a);
		s.appendChild(createElement('br'));
	}
	else if(currentVersion > parseInt(getValueForId(id,'info2')))//append outdated scripts
	{	
		var s = createElement('span',{id:'USO_TITLE_'+title});
		spanOutdateds.appendChild(s);
		
		//title
		s.appendChild( createElement('a', {target:"_blank", href:"http://userscripts.org/scripts/show/"+id, class:"USO_outdatedLink", title:"home"}, null, title));
		
		//no icons
		if(!GM_getValue('icons'))
		{
			s.appendChild( createElement('span',null,null," – "));
			
			//compare
			s.appendChild( createElement('a', {href:'http://userscripts.org/scripts/diff/'+id+'/'+currentVersion, title:"compare changes", id:id, class:"USO_outdatedLink", target:'_blank'}, null, 'compare'));
			s.appendChild( createElement('span', null, null, " | "));
			
			//update
			s.appendChild( createElement('a', {href:"http://userscripts.org/scripts/source/"+id+".user.js", class:"USO_outdatedLink"}, 'click register false', 'update'));		
			s.appendChild( createElement('span', null, null, " | "));
			
			//hide
			s.appendChild( createElement('a', {href:"javascript:void(0)", title:"hide until next modification", id:id+'_'+currentVersion, class:"USO_outdatedLink"}, 'click hide false', 'hide'));
			
		}
		else //icons
		{	
			s.appendChild( createElement('span', null, null, " "));
			
			//compare
			img = imgCompare.cloneNode(false);
			img.setAttribute('id',id);
			a = createElement('a', { href:'http://userscripts.org/scripts/diff/'+id+'/'+currentVersion, id:id, title:"compare", target:'_blank'});
			a.appendChild(img);
			s.appendChild(a);
			s.appendChild( createElement('span', null, null, " "));

			
			//update
			img = imgUpdate.cloneNode(false);
			img.setAttribute('id',id);
			a = createElement('a', {href:"http://userscripts.org/scripts/source/"+id+".user.js", id:id, title:"update"}, 'click register false');
			a.appendChild(img);
			s.appendChild(a);
			s.appendChild( createElement('span', null, null, " "));
			
			//hide
			img = imgHide.cloneNode(false);
			img.setAttribute('id',id+'_'+currentVersion);
			a = createElement('a', {href:"javascript:void(0)", id:id, title:"hide until next modification"}, 'click hide false');
			a.appendChild(img);
			s.appendChild(a);
			s.appendChild( createElement('span', null, null, " "));
			
		}
		s.appendChild( createElement('br'));
		
		//count outdated scripts
		outdateds++;
	}
	else//append updated scripts
	{
		if(location.href.search(/userscripts.org/) > -1)
		{
			var s = createElement('span',{id:'USO_TITLE_'+title})
			spanUpdateds.appendChild(s);
			s.appendChild( createElement('a', {target:"_blank", href:"http://userscripts.org/scripts/show/"+id, class:"USO_updatedLink", title:"home", style:"text-decoration:none;"}, null, title));			
			
			s.appendChild( createElement('br'));
		}
	}
	
	
	
	
	contScripts++;
	if(contScripts==totalScripts){//finished search
		
		//sorting
		var updateds = totalScripts - outdateds;
		if(updateds > 0) 
			sortScripts(spanUpdateds);
		if(outdateds > 0) 
			sortScripts(spanOutdateds);
		
		//summary message
		if(outdateds==0)
			spanCount.innerHTML = 'No updates were found.';
		else
			spanCount.innerHTML = outdateds+' update'+(outdateds>1?'s':'')+' found.';
		
		getId("spanUpdateProgress").innerHTML = totalScripts+'/'+totalScripts;
		fadeNode = getId("spanUpdateProgress");
		fade();
		
		if(notfound > 0)
			spanCount.innerHTML += '<br>' + notfound + ' script' + (notfound>1?'s':'') + ' not found.';
	}
	else
	{
		getId("spanUpdateProgress").innerHTML = contScripts+'/'+totalScripts;
	}
}


function fade()
{
	if(!fadeNode)
		return;
	fadeNode.style.opacity -= 0.1;
	if(fadeNode.style.opacity > 0.1){
		setTimeout(fade, 300);
	}else{
		fadeNode.parentNode.removeChild(fadeNode);
		fadeNode = null;
	}	
}

function sortScripts(container)
{
	var spans = new Array(), titles = new Array();
	var allSpans = getTag('span',container);

	for(var i=0; i<allSpans.length; i++){
		if(allSpans[i].getAttribute('id') && allSpans[i].getAttribute('id').search(/USO_TITLE_/) > -1){
			spans[spans.length] = allSpans[i];
			titles[titles.length] = allSpans[i].getAttribute('id');
		}
	}
	
	titles.sort();
	for(var i=0; i<titles.length; i++){
		for(var j=0; j<spans.length; j++){
			if(spans[j].getAttribute('id')==titles[i])
				container.appendChild(spans[j]);
		}
	}

}

//hide update until next modification
function hide(evt)
{
	if(!confirm("Hide until next modification?"))
		return;
		
	var id = evt.target.getAttribute('id').split('_')[0];
	var version = evt.target.getAttribute('id').split('_')[1];

	setValueForId(id, ""+version, "info2");	
}


//removes script from updater
function unregister(evt)
{
	if(!confirm("Remove script from updater?"))
		return;
		
	var id = evt.target.getAttribute('id');
	
	removeById(id,"info2");//remove last update info
	removeById(id,"titles");//remove title
		
	evt.target.parentNode.removeChild(evt.target);
}



// register script for updates: called in Install Button and update link
function register(evt)
{	
	var id, href, ver;

	//get script id
	if(evt==null)//evt null indicates to register the Updater itself
		id = 26062;
	else{
		href = evt.target.getAttribute('href');
		if(!href) 
			href = evt.target.parentNode.getAttribute('href');//evt.target is an icon img, get href from parent 'a' elem
		id = href.match(/\d+/)[0];
	}
	

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+id+'.meta.js',
		onload: function(resp) {
			//store current version
			var currentVersion = resp.responseText.match(/\@uso\:version\s+(\d+)/)[1];
			setValueForId(id, currentVersion, "info2");
			
			//set title if not present
			if(!getValueForId(id, "titles")){
				var name = resp.responseText.match(/\@name\s+([^\n\r]+)/)[1].replace(/\s+$/,'');
				setValueForId(id, escape(name), "titles");
			}
		}
	});	


}


function resetPos()
{
	GM_setValue('optionsTop','');
	GM_setValue('optionsLeft','');
	GM_setValue('updaterTop','');
	GM_setValue('updaterLeft','');
	GM_setValue('menuTop','');
	GM_setValue('menuLeft','');	
}


function getCSS()
{
	css = createElement('style',{type:"text/css"},null,""+	
		'a.USO_outdatedLink:link {color: #0088FF !important; text-decoration: underline !important;}'  +  
		'a.USO_outdatedLink:visited {color: #0088FF !important; text-decoration: underline !important;}'+ 
		'a.USO_outdatedLink:hover {color: #0088FF !important; text-decoration: underline !important;}'  +
		'a.USO_outdatedLink:active {color: #0088FF !important; text-decoration: underline !important;}' +
		
		'a.USO_updatedLink:link {color: #AAAAAA !important; text-decoration: underline !important;}'  +  
		'a.USO_updatedLink:visited {color: #AAAAAA !important; text-decoration: underline !important;}'+ 
		'a.USO_updatedLink:hover {color: #AAAAAA !important; text-decoration: underline !important;}'  +
		'a.USO_updatedLink:active {color: #AAAAAA !important; text-decoration: underline !important;}' +
		
		'span.USO_compareSpan {color: #000000 !important}' +
		'ins.USO_compareIns {color: #000000 !important; background:#8FFF8C !important;}' +
		'del.USO_compareDel {color: #000000 !important; background:#FFE6E6 !important;}' 
	);
	
	return css;
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
			GM_setValue(gmkey,info.join(';'));
			return;
		}
	}
}


function xpathArray(p, context) {
  if (!context) 
	context = document;
  var i, arr = [], xpr = xpath(p, context);
  for (i = 0; item = xpr.snapshotItem(i); i++) 
	arr.push(item);
  return arr;
}

function xpath(p, context) {
  if (!context) 
	context = document;
  return document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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


function images()
{
	//icons thanks to http://www.pinvoke.com
	imgCompare = document.createElement('img');
	imgCompare.style.margin = '0';
	imgCompare.setAttribute('border', 0);
	imgCompare.style.cursor = 'pointer';
	imgCompare.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02dIDATx%DA%8C%93_HSq%14%C7%7F%F7o%DB%EE%EE%EEnr%CB2%EF%D46I%D3U*%AE%07%99k%06%11%D5%0C%A1%C0%87%81%90P%BD%AA%3D%F8%5C%3D%06B%D4%5B%09%BDDa%0F%83%40%82%20%82%12%86%20%0C%CC%D1%2C%04%C9%09%B7%D8fk%7F%EE%EE%EE%BD%9D_(m%EB%0A%1D%F8%F0%FBs%CF%F7%DC%F3%3B%BF%F3%23%22%91%08%B22%8A%A20%22A%10%A7%60y%14%E0%80%02%906M3%A1%EBz%16%404%DA%DF%DA%1DN%E1%DC%E0H%A4%EBL%DF%80%B7E%12%9AUU%CD%C4%E3%F1%CFo_%BF%EA%C8%EFd%DE%81%CF%06%E5%F3%F9%10D%AC%03L%E4%5C%EEKc7f%82%C7%3BO%F4%C8%87%5C%12E%124%CB0%BC%A7%AD%CD%D3%DC%D1%CB'%13%CB%A4Z.n%908%8DF%AA%D5j%DF%608%D2%CD%8BM%1E%91%3B%C0%90%04%22%F6%D2%C2s%F9%D8%11%EF%D0%85%AB%BD%D8%8F%AET*V%E9%B7v%F6%F4%CBx%92%CE%16%D5t%16%A9%8D%0E%DD%FE%81%F6%85%F9%87%AD%B4%A6iV%01%04%9B%DD~P7%FE%1C%07u%B5%B8%5C%0D%DF%CD%ADL%89%01%AD%B0_%06ECS%F3%88b%05%10%F3V%0E%84%5E%C9%83%B6HBe%91%05%DF%92%2BK%DB%14IRZ%D50%1A%C5%86a%12%AB%2BK%5B%D8%8F%14E%11%09%82%80x%9EGN%A7%13q%1C%87X%96%5D%8F%BD%98%DFd%F5_ZE7%EB%FB%03nc'%F3%5Dy%F2x.Y(%14%96%C9%C6%E8p%8D%1E%86aFo%DF%BCu%7Fr%FCJ%FCM%ECe%CA%D4JE%3BK%D9%90%AE%96%16c%0B%C9k%A3%17%3F%AE%7DZ%5D%2C%97%CB%3F%88p8%0C)%19%7Bt%3B%1C%DC%D8%D4%D4%9D%BB%D1%E8%F8%BDl6%FB%1Cb%9E%04%BC%00.%E4O%E0%0B%F0%DE%E1p(n%B7%FBo'%C2%9F%CFJ%D2%E1%C8%F4%F4%ECl4z%FD%01%88%9F%C1%F6%3A%B0fUD%E8%01%A4(%0AB%A1P%08%05%83%C1%CB%13%13%93s%89%C4W%D3%EF%3F%FD%88%A6%E9~%FC%16%E0%1D%20%92%24%FF%A1%CEdYF%81%40%60%26%95R%CC%E1%E1%91%A7%20%3E%8F%85%FFk%D8%D3%26I%D2%10%1C!%94%CB%E5%B6!%B5%0F%B0%A7%E3%2Cw%D1jF%ADf%8D%7Dt%1C%00%D7%A1%09%DF%10.E%0D%C6.z%C3X%C7o%01%06%00%B1%B2%24%CE%AE%EE%7C%99%00%00%00%00IEND%AEB%60%82";
	
	imgUpdate = document.createElement('img');
	imgUpdate.style.margin = '0';
	imgUpdate.setAttribute('border', 0);
	imgUpdate.style.cursor = 'pointer';
	imgUpdate.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%D7IDATx%DA%A4S%5BHTa%10%9Esvu7%09E%F3%0E%9A%C4%B6%EB%8AmG%8DEK%A9%87%02%CB%10%0C%BA%B1v%A1%08)*%05%25%C2%17%13%BA%E0C!*%C6v1%BB%F8%E0%8BR%A0%3E(Y%14%BB%0B%AD%B8%AD%D9%8D%8D2%B5%B4%BD%B4%EA%89%F6r%CE%9Ef%D4%A3%BD%F4%D4%0Fsf%CE%7C%DF%CC%FF%FF3%F33%92%24%C1%FF%2C%25%7D%CA%CA%CA%80eY%88%8A%8A%02%86a%80%92*%14%8A%22%84%0C%CB%3C%A7(%8AV%19%0B%87%C3%10%89DV%13%C8%0B%C1%AD%A86%A3~%82%01%5Cwww%BB%20%08%602%99%CE%A0%EF%2Bb%E5%A8_%A3%B6%C81%EC_%C1%DBt%3A%DD%01%B3%D9%DC%1E%1F%1F%7F%0Cwa%3D%1E7%F8%FD%3FiG%96%7C%84%11%87%B8r%1CCG*--%25%FB%1C%12Z%DC%EE%1F%90%96%96%0E%0E%87%C3%C5q%9C%86%00%B2%F5%FAl%8D%CF%E7%83%A4%A4d%A8%AA%AA%3A%8F%EE%D6%95%13%CC%CF%CFC%20%10%E8%AD%AB%AB%BD%A4R%A9%C0%EB%F5%40N%8E%5E%13%89%88%40B6%CF%F3%40%18q%88K1~%BF%7F)%01%9EbG(%14%3A8%3D%FD%8D%1F%1D%1D%FD%84%05%04%9B%CD%F6%1E%8B%DBNB6%F9%08%23%0Eq)F%BE%3B%E4%E7%E7_%B0%DB_I%C3%C3O%25%AB%D5%229%9DN%C9%600%5C%A3%20%12%B2%C9G%18q%88K1(K%5D%08%06%83%8A%40%20%08%82%20%82(F%B0%95Jl%AB%22%2C%B7%8Al%F2%11F%1C%E2R%CCJ%11%B5Z%EDN%D4%85%E4%A8%AE%AE9Y%5C%BC%3Dkrr%D6%D1%D8X%DFC%BE%86%86%AB%FB22R%B8%5B%E3%10%1A%F3H%1E~%A4%C7%F2%CB%D6eFhH%3E%C1%10%EE%E6JNN9%5BPP%98%E5%F3%F9A%A7%CB%E6%FA%FA%9Es%84%CF%CDyaj%EA3%B8C%A9%D1G%F6k%D2%3B%18u%B6%CAx4%F57%16v1%01V%95%D4%89%B6%B6%BB%B5%D4%C6%84%84%04%18%1C%1C%980%1A%8B%D6w%8E%0B%F0%C1%1B%0E%ADQ%C5F%7Fq9A%15%C7%C2%E1%8A%8D%B9%1D%5Dc5%12%5Eq%F1%0A%14%80kw%5E%DE%16SSS%AB%A9%B2%B2%A2ev%F6%3B%DF%DF%FF%A2%FE%CAT%2C%94%183%E1%E3%02%00%2F%ACNmf%0C%40o%E7%CB%91%C5%044%E3J%A5%92%DE%C2%1E%7C%13%258%BE%B7%F1%FF%94%DD%EE%BAx%E3%D9%24%3C%B6%BD%9Ba%D5q%9E%05%DFLb%EE%DE%5D%A9%E9%9B6%80%F5N%FF%08%C3%B2%CDr%02%BA%CA%3A%94D%145%ED%80%C9r1Y%0E%D9X%9F%B78%CEo%D6%1E%BA%F70%EB%F4q%FD%84%F9%91%93a%15%D7cb%E3%1E%C8%09h%A0b%96E%F9%AF%A7%1B%5D~%F3%B2%C40%05%20%04%9B%C3%7D%D5%F7)%F7%1F%01%06%00f%9A%86%C6%C4d%90%E8%00%00%00%00IEND%AEB%60%82";
	
	imgHide = document.createElement('img');
	imgHide.style.margin = '0';
	imgHide.setAttribute('border', 0);
	imgHide.style.cursor = 'pointer';
	imgHide.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%029IDATx%DA%A4S1%8B%1AQ%10~%BB%1A%E1%82%A5%A7%22%5B%1C%C6%C0%1D%B866%D9%C6%D2X%D8%DA%08%C2vv%166%82%BD%82%FE%03AP%10%FC%05%22%A4%B5%D94%16Q%E1%12%C3%C9%993%1Bc8%041FW%5D3%DF%E6%AD%98*E%1E%8Cov%E6%FB%BE7o%E6)%9CN'%F6%3F%CB%89%9Ff%B3%C9DQdN%A7%93%09%82%60%25%1C%0E%87B%9B%CCq%C3%E3%F1%A8%C1%C1%81%87%C3%81%99%A6%C9TU%FD%23p%B1%14%02%C8d%1D%EC%E9tz%86%60%BB%DDFlJ%E2I%88%91i6A%B4%1D%02(%1E%8F%E7%96H_%5C.W%02%A7%D0%FA%05%83%8F%18r%C0%00%FB%D7%158X%8E%C7%E3%8F%B4%7FO%A5R%E6%7C%3Ew%91o%22Aq%DD%EF%F7%1B%C8%91o%D6%EBu%D9%AE%C2%AA%60%B5Z%B1%EDv%DBi4%1A%12%7D%5E%93%81%F0D%FB%0E%C6%7D%1D9%60%80%05%E7%5C%01J2%0CC%26c%B3%D9%CC)I%12%D34M%A2%BBC%8CQ%E9%3F%14E%99%22%B7%5C.%C1I%12%C7%EA%85%25%B0%DB%ED%E4b%B1%F8%91%DF%19%CB%D5%EDv%AF7%9BM%13%1F%E4%AB%24%F0%8D%84%9F%F3%F9%FC3%85%AE%CA%E5%B2%7C)%80%EDh%DF%19%BE%CF%E7%3B%91%9D%7B%CC%F3%82%9D%E7%1Cf%0B%0C%0B%85%825%F3l6%FB9%18%0C%3E%26%12%09%BD%DF%EF%AB%88E%A3%D1%AFh%D5d2%B9%A9%D5j%AF%11%A3%91%0E%2F%054z%18S%B7%DB%FD%96%C8k%0A%19%A1P%E8%13%D9%13%3Fq%83S%91%A3%C7%B6_%AF%D7%EF%E8%E1%E9%E7)PW%1950Y*%95%3E%D0'H%FE%F1x%7C%C3%F3%22%F7%FD%C8%01%03%2C8g%81%FD~%0F%1BV%AB%D5%3B%00s%B9%5C%A4R%A9%DC%F2%9E%98%F0%11C%0E%18%60%C1%B1%AE%82%B7%8D%F7O%B3f%91HD%F1z%BD%F2h4%EA%84%C3%E1d%AB%D5z%0FP%26%93yc%C7%16%8B%C5p0%18h%F4%D0%AC%FF%85-%80J%5Er%B3%FA%12%8B%C5%EE%02%81%C0%2B%F8%BA%AE%3F%F4z%BD%7B%7B%02d%3F%D1%17%E2%9A%B6%00%C6%F3%82%9B%F8%8F%7F0F%8A%FA%0D%E2%9E~%0B0%00%FF%A5%3E%DC%E4%2F%96%B1%00%00%00%00IEND%AEB%60%82";
	
	imgRemove = document.createElement('img');
	imgRemove.style.margin = '0';
	imgRemove.setAttribute('border', 0);
	imgRemove.style.cursor = 'pointer';
	imgRemove.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%A6IDATx%DA%A4S_HSa%14%3F%F7%EEN%A5%C0%D4%D4e%60Z%88S%89y%D5%10-%A3%1Ez%B0%06A%3D%D4%C3%06A%11BT%06J%84%10f%0F%89o%A9!H%F4%90o%BE%94%04%FA%10%92X%A2%83%16%9B%23%A2%C8%C8%FF%B66%D7%1CK%F7%EF%DB%ED%FC%DC%AEE%2F%3D%F4%C1%D99%F7%FC~%E7%F7%7D%FB%CEw%24M%D3%E8%7F%96%82%1F%AB%D5J%B2%2C%93%D1h%24I%92%08%A2%06%83%A1%91!K%9A%E7%11B%CC%E8X%3C%1E%A7d2%F9%5B%40_%0C%1EeW%CD%FE%05%17%A8%C3%C3%C3%03%89D%82l6%DB5%CE-2v%96%FD%2C%FBi%BDF%FE%A3%F8%98%D9l%BE0888%90%9B%9B%7B%89w%91%FD~%1F%05%83%3F%B0%A3%8C%1C0p%C0%D5%EB%24%1C%A9%B9%B9%19%F1%0D%26%F4%F9%7C%DF%A9%A8h%3F%B9%DD%EE9UU%CB%00%20%AE%AC%AC(%0B%04%02TPPH---79%DD%BFs%82P(D%91H%E4y%7B%7B%DB%BD%CC%CCLZ_%F7SUUeY2)%08%868%1C%0E%130p%C0EM0%18L%09%F0)N%C6b%B1%8B%2B%2B%ABa%97%CB%F5%85%2F%90%1C%0E%C7G%BE%DC%01%18b%E4%80%81%03.j%F4%FFN%B5%B5%B5%B7%9D%CE%B7%DA%C4%C4%2BmffZ%F3x%3C%9A%C5b%E9F%11%0C1r%C0%C0%01%175l%A9.D%A3QC%24%12%A5DB%90%10In%A5%C2m5%C4%F5V!F%0E%188%E0%A2f%E7%12%CB%CB%CBO%B1o%40%A2%B5%F5%D6%95%A6%A6%13%A5KK%5EwWW%C73%E4%3A%3B%1F%9C%2F.6%A9SS%93%F3%BD%BD%0F%9Fl%17J%92%83%DD%B8~%82q%DEm%AE%B0%D0t%BD%AE%AE%A14%10%08%92%D9%5C%A1%8E%8EN%AA%C076%D6iy%F9%2B%01%CB%CE%DE%93%B3%7Be%F9%915%14%9A%2F%D9%DAJ%9D%C0d2%81w%7Fd%E4%E5%5D%B41%2F%2F%8Ffg%5D%0B%F5%F5%8D%25%00%16%3A%DAb%F2%D2bFB%082*%0Ay%3F%7FZ%CB%11b%95%87%E0%DD%B6%00%0Ax%9D%AE%A99b%EB%E9%E9%B7%D9%ED%E7%FA%BC%DE%B5%F0%D8%D8%9B%0E%00%AF%9B%AA%BF%B5%DA%ED%FB%FE%9E%83%A7CC)%01%BCq%85%95y%16%CE%F0L%1C%E7%E7%FB%98%BF%AF%3A%9Dsw%F0%94%BBk%0E%BA%0F%09%A1l%12%E5g%10%85%B34m%23%3D%07%3B%02%B8%8B%BDl%F9lY%00Y%EC0%8BU!%E6%FB%F9%C0%CF%F9%7Dz%E3%18%9B%EF%00%91%FF2QB%17%C0%83%DA%956%E5%1F%13%2C%D8~%B2mB%FB%97%00%03%00%D6%C4wv%97%A7%0D%16%00%00%00%00IEND%AEB%60%82";
	
	imgZombie = document.createElement('img');
	imgZombie.style.margin = '0';
	imgZombie.setAttribute('border', 0);
	imgZombie.src = "data:image/gif,GIF89a%12%00%12%00%B3%00%00%00%00%00%7B%AD%00%84%BD%00%84%C6%FF%94%C6%08%9C%CE!%A5%CE1%C6%00%00%FF%C6%C6%B5%DEJ%BD%DEc%BD%E7k%C6%E7s%EA%F7%A9%FF%FF%FF%80%C0%FF!%F9%04%01%00%00%0F%00%2C%00%00%00%00%12%00%12%00%00%04%7C%F0%C9%09%A6%AC%96%EA%BBm%05%60%F8e%17%90%9C%86A%10%A0%F7%00%CA%22%2BI(%08%E3%AB0%3C%0F8%0E%04%40%10%C0%BC%16%00F%F2%07%0C%02%8A%97%C4B%D9P%02%7FB%E8K%BAT%22%80%88%AC(%B1%EBy%C3C-%C0%40%96-h6%9C%87%7D%0A%A9%088%E3%AB%90%024%FE%00x-%19%00%05%05%22CDz%17%2B%00%07%8Fi%8B%147!%01Z%24%17%96%96%83%98%14!%9D%11%00%00%3B";

	imgOptions = document.createElement('img');
	imgOptions.style.margin = '0';
	imgOptions.style.cursor = 'pointer';
	imgOptions.style.verticalAlign = 'middle';
	imgOptions.setAttribute('border', 0);
	imgOptions.setAttribute('title', 'options');
	imgOptions.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%07tIME%07%D8%08%1B%06%23%3B%8E%FEMJ%00%00%00%09pHYs%00%00%1E%C1%00%00%1E%C1%01%C3iTS%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%01%E6PLTE%FF%00%00cl%7Bls%8D%7F%84%A4%94%95%B1%A7%A1%95wnCyl8%85qN%7BbL%90se%C6%AB%A4%5Dl%8B%8B%91%C5lk%97%5DP.%C9%BBc%CA%B9Q%CC%B4%5C%D5%B9p%AF%8FR%8FrH%E1%CC%BB%5Cli%86%99%BA%99%A3%D6ac%8AbZX%D4%C6%97%EF%DA%7D%E4%CCb%FF%E1%8F%FF%E8%A1%DD%B9o%9D%7DD%A6%8Dwt%83%96Yl%8D%87%9E%C0q%88%A8%AF%BE%DDRXdzv%5D%FE%EE%BD%F2%D6%95%85%60%2B%93hU%A4vf%FF%F1%BD%D4%B0%7C%88mX%CF%BD%BBv%83%96%D1%E1%FF%C2%D6%FB%B7%CB%EC%AC%BD%D7Ybi%CC%CA%B1%F9%EB%BE%F0%D6%9D%7CW*%FF%DB%CD%91fS%FF%E1%A2%D5%B6u%C2%AA%90%9E%8F%8C%90%99%98q%7D%89%7C%8E%A6%80%93%B4%BC%C9%F3qx%95vwr%FF%F9%D4%FE%F0%A9%9A%854za%1E%97%7D0%F0%D9o%C7%B2U%86tL%D0%C3%BD%9A%A9%C6%5Bi%90%C5%CE%ED%5C_f%C0%BE%A7%E5%DD%9F%F6%EB%9B%F2%E5%96%EA%DA%82%E0%D2i%AD%9FG%99%8Cj%92%A2%B2%5Cjw%A5%AE%B5dg%60%FF%FF%E3%F9%F2%C6%FB%F3%C2%FF%FE%C8%F6%E8%AB%87yL%E5%DB%D1%A1%B0%B5_is%9F%A6%AENRQ%5C%5DU%5C%5CPfdW%60ZJ%B3%AC%A4%A1%AD%BB%5Cg%7B%BD%C7%E2%89%94%B0m%7C%9BRa~P%5Cv%5Dh~qx%92%99%A5%BD%5Ci%8C%8B%99%C6%AB%C1%F2%9C%B4%E4%96%AB%D6%83%95%B9p~%9B%7D%88%9C%A1%AC%C8%5El%91%B7%CD%F6%A1%B8%E1_v%98k~%9C%88%98%AFkw%85Zh%85%C1%D5%F6h%7F%9F%D9%EE%FF%A3%B5%CDhx%88cpyfq%87%C8%DC%F5dy%94%AA%BC%D4Zdm%8F%96%A8z%89%9E%9F%B1%C7%5Ck~%83%8C%9Dw%82%94r%7B%8COWd%D4%C4%A1y%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%D1IDATx%DAc%60%80%83y%F3%17%2Cd%40%02%B3f%CF%99%8B%CCg%98%3Am%FA%0C%06%86%99%08%81%BE%FE%09%13'M%9E%02%E7%B7%B5wtvu%F7%F4%C2%F8%B5u%F5%0D%8DM%CD-%ADP~IiYyEeUu%0D%94%9F%9D%93%9B%97_PXT%0C%E5'%24%26%25%A7%A4%A6%A5gdf%81%F9!%A1a%E1%11%91Q%D11%B1q%F1%0C%0C.%AEn%EE%1E%9E%5E%DE%3E%BE~%FE%01%81A%C1%0C%26%A6f%E6%16%96V%D66%B6v%F6%0E%8EN%CE%0C*%AAj%EA%1A%9AZ%DA%3A%BAz%FA%06%86F%C6%0C%E2%0C%0C%12%92R%D22%B2r%F2%0A%8AJ%CA%60Cyx%F9%18%F8%05%04%85%84ED%C5%40%7CF%26f%16%06V6v%0EN.n%06%06%00xT2%F2%18%AEI%5B%00%00%00%00IEND%AEB%60%82";
}


/*
TODO
- fixed alert when auto checking and div is out of view(gmail uses it in conversations)
*/








//drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop

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

function cleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',cleanup,false);
	//document.removeEventListener('mouseup',xRayEvent,false);
	savedTarget.style.cursor=orgCursor;

	if(savedTarget.getAttribute('id')=='divOptions'){
		GM_setValue('optionsLeft', savedTarget.style.left);
		GM_setValue('optionsTop',  savedTarget.style.top);
	}else if(savedTarget.getAttribute('id')=='divUpdater'){
		GM_setValue('updaterLeft', savedTarget.style.left);
		GM_setValue('updaterTop',  savedTarget.style.top);
	}else if(savedTarget.getAttribute('id')=='divMenu'){
		GM_setValue('menuLeft', savedTarget.style.left);
		GM_setValue('menuTop',  savedTarget.style.top);
	}

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

	if (target = insideUpdater(target)) {
		savedTarget=target;       
		target.style.cursor=htype;
		dragOK=true;
		dragXoffset = e.clientX-target.offsetLeft;
		dragYoffset = e.clientY-target.offsetTop;
		
		//set the left before removing the right
		target.style.left = e.clientX - dragXoffset + 'px';
		target.style.right = null;
		
		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',cleanup,false);
		return false;
	}
}

function insideUpdater(obj) {

	if (obj.getAttribute('id')=="divOptions")
		return getId('divOptions');
	if (obj.getAttribute('id')=="divUpdater")
		return getId('divUpdater');
	if (obj.getAttribute('id')=="divImportScroll" || obj.getAttribute('id')=='divRegisteredScripts')
		return null;
	if (obj.getAttribute('id')=="divImport")
		return getId('divImport');
	if (obj.getAttribute('id')=="divMenu")
		return getId('divMenu');
	
	if (obj.parentNode) {
		while (obj = obj.parentNode) {
			try{
				if (obj.getAttribute('id')=="divOptions")
					return getId('divOptions');
				if (obj.getAttribute('id')=="divUpdater")
					return getId('divUpdater');
				if (obj.getAttribute('id')=="divImport")
					return getId('divImport');
				if (obj.getAttribute('id')=="divMenu")
					return getId('divMenu');					
			}catch(e){
			}
		}
	}
	
	return null;
}

//end drag handling



