// ==UserScript==
// @name            Google Images Full View and AutoPager - by Futuros
// @namespace       http://userscripts.org/
// @description     Displays a list of full images instead of the thumbnails in the search results. With a nice checkbox to quickly turn on or off. The script now also includes an auto pager to automatically fetch more results when near the bottom of the page.
// @copyright	      2010+, Futuros
// @license 	      Creative Commons Attribution-Share Alike 3.0 Netherlands License; http://creativecommons.org/licenses/by-nc-sa/3.0/nl/
// @version         1.7.0
// @date	      2010-08-13
// @include         http://images.google.tld/*
// @include			http://www.google.tld/images*
// @match			http://www.google.com/images*
// ==/UserScript==

var Script = {
	name:    	'Google Images Full View and AutoPager - by Futuros',
	version:	'1.7.0',
	id:		49794
};

var Config = {
	imageOnNewLine: false, // put the images below each other even if there is space to put them next to each other.
	autopager: false, //automatically load new images when almost at the bottom of the page
}
/* Changelog:
1.7.0 (2010.08.13)
	- Made it work again with googles new layout
	  Pagination is currently not working
1.6.0 (2010.05.11)
	- Added Chrome compatibility (only on .com tld; auto update = firefox only)
1.5.0 (2010.05.11)
	- Made it work with the new google layout
1.4.0 (2010.02.03)
	- Added auto pager (requires FF3.5+)
1.3.0 (2010.01.29)
	- Restructured the code
	- Removed html parsing of images
1.2.1 (2010.01.26)
	- Changed the way the images are placed on the page
	- Added config option: imageOnNewLine
1.2.0 (2010.01.20)
	- Changed the script to work with the new Ajax based search
	- Added Auto Updater
1.1.0 (2009.06.11)
	- Image information on hover
1.0.0 (2009.05.21)
	- First public release
*/
/* Todo:
	- Improve menu above image 
		link to referer within google search
		hide image
		link to show single image
		include thumbnail in menu (optional)
	- Add some configuration options
		- max image width eg. 500px
	- Anti hotlink blocker. By checking real size with expected size.
	Got some ideas? Leave a comment!!
*/

l = function(t){console.log(t);}
e = function(d,t){console.log('Error: '+t+' - '+d);}
css = '/* Inserted By Greasemonkey userscript (Google Image search Direct results - by Futuros): */'
	+'.gisdr_bigImage {position: relative;'+(Config.imageOnNewLine?'display:block':'float:left')+';margin-right:2px;}'
	+'.gisdr_bigImage img{left:0; top:0;}'
	+'.gisdr_bigImage .gisdr_menu{position:absolute;left:0; top:0; width:100%; background-color: #fff; opacity:.75; display:none;}'
	+'.gisdr_title {font-weight:bolder;overflow:hidden;margin:3px 3px 0 3px;}'
	+'.gisdr_size {font-size:.8em;overflow:hidden;margin:0 3px 0 3px;}'
	+'.gisdr_links {font-weight:bolder;font-size:.75em;overflow:hidden;margin:0 3px 3px 3px;}'
	+'.gisdr_links a{white-space:nowrap;}'
	+'.gisdr_hide {display:none; height: 0px;}'
	+'#ImgContent:after {content: ".";display: block;height: 0;clear: both;visibility: hidden;}'
	+'.gisdr_option {margin-bottom:5px; padding-bottom:5px; border-bottom: 1px solid rgb(201, 215, 241);}'
;

var FI = {
	opts:[],
	full:false,
	limit:false,
	images: null,
	dynCP: null,
	dyn: false,
	init: function(){
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
		FI.opts.push(new FI.Option('full', 'Full Images', true, 'Enable/Disable the Full Images greasemonkey script'));
		FI.opts.push(new FI.Option('limit', 'Limit width', true, 'Images bigger then the width of the screen will be scaled down.'));
		if(Config.autopager){
			FP.init(FI.autoPaged);
		}
		FI.appendOptions();
		if(!FI.checkVersion())return;
		FI.content = document.getElementById('ImgContent');
		if(!FI.content){e('ImgContent not found on page');return false;}
		FI.newDynResults();
		FI.checkOptions();
		FI.content.addEventListener('DOMNodeInserted', function(ev){if(FI.newDynResults()){setTimeout(function(){if(FI.full){FI.maxImages();}},50);}}, false);
	},
	appendOptions: function(){
		leftnav = document.getElementById('leftnav');
		optDiv = document.createElement('div');
		optDiv.className = 'gisdr_option';
		leftnav.insertBefore(optDiv, leftnav.firstChild);
		FI.opts.forEach(function(option){optDiv.appendChild(option.toHtml());});
	},
	checkVersion: function(){ // check if this is the basic version of the google images. If not store a url or redirect directly
		FI.basicVersion=true;
		if ((/q=/).test(document.location.href)) {
			if (!(/&sout=1/).test(document.location.href)) {
				FI.basicUrl = window.location + "&sout=1";
				FI.basicVersion = false;
				if(FI.get('full')._value){
					FI.redirectToBasicVersion();
				}
			} else {
				FI.fullUrl = document.location.href.replace(/&sout=1/, '');
			}
		}
		return FI.basicVersion;
	},
	redirectToBasicVersion: function(){
		if(!FI.basicVersion && FI.basicUrl)
			window.location = FI.basicUrl;
	},
	redirectToFullVersion: function(){
		if(FI.basicVersion && FI.fullUrl)
			window.location = FI.fullUrl;
	},
	newDynResults: function(){ //returns true if new results
		dynCP = FA.unsafe.dyn.getCommonParams();
		if(dynCP != FI.dynCP){
			FI.dynCP = dynCP;
			FI.images = FA.unsafe.dyn.getResults();
			FP.resetPager(FI.images.length);
			return true;
		}
		return false;
	},
	checkOptions: function(){ 
		if(FI.get('full')._value!=FI.full){ //full checkbox changed
			FI.full=FI.get('full')._value;
			FI.limit=FI.get('limit')._value;
			if(FI.full){ //full = checked
				FI.redirectToBasicVersion();
				FI.maxImages();
				FP.start();
			} else { //full = unchecked
				FI.redirectToFullVersion();
				FI.showThumbs();
				FP.stop();
			}
		} else if(FI.get('limit')._value!=FI.limit){ //limit changed
			FI.limit=FI.get('limit')._value;
			if(FI.full){ // rebuild full images
				FI.maxImages();
			}
		}
	},
	showThumbs: function(){
		FI.content.innerHTML=FI.contentThumbs; 
	},
	maxImages: function(){
		FI.screenWidth = FI.content.offsetWidth;
		FI.contentThumbs = FI.content.innerHTML;
		FI.content.innerHTML = '';
		FI.appendImages(FI.images);
    },
	autoPaged: function(images){
		FI.images = FI.images.concat(images);
		FI.appendImages(images);
	},
	appendImages: function(results){
		for(i=0;i<results.length;i++){
			result = results[i];
			FI.content.appendChild(FI.createImage(result[0], result[6], ''));
		}
	},
	/*
	 * returns a span html element containing a large image and a menu
	 * TODO: more menu options
	 */
	createImage: function(fullurl,desc,similar){	
		url = fullurl.match(/\/imgres\?imgurl\=(.*)\&imgrefurl\=(.*?)\&usg\=.*\&h\=(\d*)\&w\=(\d*)\&sz\=(\d*)\&hl\=/);
		if(!url || url.length!=6){
			url =  fullurl.match(/\/imgres\?imgurl\=(.*)\&imgrefurl/);
			if(url && url.length==2){
				url[2] = url[3] = url[4] = url[5] = '';
			} else {
				e('Failed parsing the thumbnails.', 'Parsing error');
				return false;
			}
		}
		container = document.createElement('span');
		container.className='gisdr_bigImage';
		large = document.createElement('img');
		large.src = decodeURI(url[1]);
		large.title = large.alt = desc;
		menu = document.createElement('div');
		menu.className = 'gisdr_menu';
		menuH = '<p class="gisdr_title">'+desc+'</p>'
		+'<p class="gisdr_size">'+url[4]+' X '+url[3]+' - '+url[5]+'kb</p>'
		+'<p class="gisdr_links"><a href="'+url[2]+'" title="Visit the website">'+url[2]+'</a>';
		menu.innerHTML = menuH+'</p>';
		container.appendChild(large);
		container.appendChild(menu);
		if(FI.limit)large.style.maxWidth = FI.screenWidth+'px';
		large.style.cursor='pointer';
		large.addEventListener('click', FI.switchImageWidth, false);
		large.addEventListener('load', FI.setImageWidth, false);
		large.addEventListener('error', function(ev){n=ev.currentTarget;n.parentNode.parentNode.removeChild(n.parentNode);}, false);
		container.addEventListener('mouseover', function(ev){ev.currentTarget.lastChild.style.display='block';}, false);
		container.addEventListener('mouseout', function(ev){ev.currentTarget.lastChild.style.display='none';}, false);
		return container;
	},
	setImageWidth: function(ev,forced){
		img = ev.currentTarget;
		if(FI.limit || forced){
			var screen = FI.screenWidth;
			if(screen<img.naturalWidth){
				img.style.width=screen+'px';
				img.style.border='3px dashed #d5ddf3';
				img.style.backgroundColor='#ffff99';
				img.style.display='block';
			}
			img.style.maxWidth = screen+'px';
		}
	},
	switchImageWidth: function(ev){
		img=ev.currentTarget;
		if(img.style.maxWidth==''){
			FI.setImageWidth(ev,true);
		} else {
			img.style.width='';
			img.style.maxWidth='';
			img.style.border='';
		}	
		ev.preventDefault();
	},
	get: function(name){
		for(i=0;i<FI.opts.length;i++){
			if(FI.opts[i]._name==name)return FI.opts[i];
		}
		return false;
	},
	Option: function(name, label, defValue, description){
		this._name=name;
		this._label=label;
		this._default=defValue;
		this._description=description;
		this._value;
		this._checkbox;
		this.get = function(){
			this._value = (this._value) ? this._value : FA.getValue(this._name, this._default);
			return this._value;
		};
		this.set = function(ev){
			option = FI.get(ev.currentTarget.name);
			option._value = ev.currentTarget.checked;
			FA.setValue(option._name, option._value);
			FI.checkOptions();
			if(option._name=='full'){
				FI.get('limit')._checkbox.disabled=!option._value;
			}
		};
		this.toHtml = function(){
			span = document.createElement('span');
			span.style.fontSize='.8em';
			this._checkbox = span.appendChild(document.createElement('input'));
			label = span.appendChild(document.createElement('label'));
			label.appendChild(document.createTextNode(this._label));
			label.setAttribute('For', this._name);
			this._checkbox.type='checkbox';
			this._checkbox.name=this._name;
			this._checkbox.id=this._name;
			this._checkbox.checked = this.get();
			span.title = this._description;
			this._checkbox.addEventListener('change', this.set, false);
			if(this._name=='limit'){this._checkbox.disabled= !FI.get('full')._value;}
			return span;
		};
	}
};

FP = { //Auto-Pager function
	activeCall: false,
	url: {},
	callback: null,
	counter: 0,
	active: false,
	init: function(callback){
		if(!JSON.parse){
			e("The AutoPager requires FF3.5+");return false;
		}
		FP.url = FP.getUrl();
		FP.callback = callback;
		FP.active = true;
	},
	start: function(){
		if(FP.active)window.addEventListener('scroll', FP.check, false);	
	},
	stop: function(){
		window.removeEventListener('scroll', FP.check, false);	
	},	
	check: function(ev){
		scrY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
		if(!FP.activeCall && ((window.scrollMaxY - scrY)<=500)){
			FP.requestImages();
		}
	},
	requestImages: function(){
		FP.activeCall = true;
		if(!(url = FP.createUrl())){e('url for auto pager could not be created');return false;}
		FA.xhr({
			method : 'GET',
			url    : url,
			onload : FP.handleRequest,
			onerror: function(){FP.activeCall=false;},
		});
	},
	handleRequest: function(response){
		keys = {'\\x26': '&', '\\x3d': '=', '\\x3c': '<', '\\x3e': '>', '\\x22': '"'};
		resp = response.responseText.replace(/(\\x\w{2})/gi, function(m, key) {
			return keys[key] || key;
		});
		obj = resp.match(/^\/\*\s?(\{\"images\"\:(\[(.*)\])),\"navbar\"\:/i);
		if(!obj)return;
		jsObj = obj[1]+'}';
		imgs = JSON.parse(jsObj).images;
		if(imgs && imgs.length>0){
			FP.callback.call(null, imgs);
		}
		FP.activeCall = false;
		FP.counter += imgs.length;
	},
	resetPager: function(results){
		FP.url = FP.getUrl();
		st = parseInt(FP.url.start) || 0;
		FP.counter = st+results;
	},
	getUrl: function(){
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			if(/^(?:q|safe|sa|tbo|start)$|^img/i.test(key)){
				startCheck = value.match(/^([a-zA-z0-9]+)#start=(\d+)$/i);
				if(startCheck){
					vars['start'] = startCheck[2];
					value = startCheck[1];
				}
				vars[key] = value;
			}
		});
		return vars;
	},
	createUrl: function(){
		if(!FP.url && FP.url.length>0)return false;
		url = 'http://images.google.com/images?';
		for(key in FP.url){
			if(key!='start'){
				url+=key+'='+FP.url[key]+'&ijn=page&';
			}
		}
		return url+='start='+FP.counter;
	},
};

FA = { // Userscript API, needed for chrome compatibility
	unsafe: (typeof unsafeWindow == 'undefined')?window:unsafeWindow,
	addStyle: function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	},
	getValue: function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	},
	setValue: function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	},
	deleteValue: function(name) {
		localStorage.removeItem(name);
	},
	xhr: function(args){
		GM_xmlhttpRequest(args);
	}
}
try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+Script.id+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var remote_version, rt;					
						rt=resp.responseText;
						
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=/@version\s*(.*?)\s*$/m.exec(rt)[1];
						
						if (remote_version > Script.version)
						{
							if(confirm('There is an update available for the Greasemonkey script "'+Script.name+'."\nWould you like to install now?'))
							{
								GM_openInTab('http://userscripts.org/scripts/source/'+Script.id+'.user.js');
							}
						}
						else if (forced)
						{
							alert('No update is available for "'+Script.name+'."');
						}
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(Script.name + ' - Update check', function()
	{
		updateCheck(true);
	});
	// check for chrome compatibility
	if(typeof GM_xmlhttpRequest != 'undefined')updateCheck(false);
}
catch(err)
{}

FI.init();