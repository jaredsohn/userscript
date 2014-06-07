// ==UserScript==
// @name DEEPNET
// @namespace http://deepnet.us
// @description Add and display deepnet "Shadows" on each and Every Page
// @include *
// @include http://www.deepnet.us/*
// @include http://deepnet.us/*
// ==/UserScript==


//location of paragraph with inserted shadow
var shadow_location = -1;

//src url for shawdow iframe
var shadow_source = '';

//index of existing shadow match for site
var shadow_match_id = -1;

//index of current url stored in deepnet database
var url_id = -1;

//Keep track of custom shadow id, in case link to custom shadow distributed over facebook
var custom_shadow_id = -1;

//encoded url of current page
var url = document.location.href;
url = check_google_search(url);
url = escape(url).replace(/\+/g,'%2B').replace(/%20/g, '+').replace(/\*/g, '%2A').replace(/\//g, '%2F').replace(/@/g, '%40');

//var p = document.getElementsByTagName('p')[0];
//p.innerHTML = 'http://deepnet.us/ShadowControl/get_shadow_2.php?url='+url;

//check for shadow source and index in deepnet database
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://deepnet.us/ShadowControl/get_shadow_2.php?url='+url,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
 	onload: function(responseDetails) {
	
	
	var response = eval('('+responseDetails.responseText+')');

	url_id = response['url_id'];

	//Shadow returned from deepweb
	if(response['shadow_location'] > -1) {

		shadow_location = response['shadow_location'];
		shadow_source = response['shadow_source'];
		shadow_match_id = response['match_id'];
		custom_shadow_id = response['custom_id'];

		//create shadow
		var shadow = document.createElement("div");
		shadow.innerHTML = '<iframe src="' + shadow_source + '" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>';
		shadow.style.styleFloat = "left";

		shadow.style.cssFloat = "left";
  
		shadow.style.display = "inline";
		shadow.style.width = "140px";
		shadow.style.height = "275px";

		//var p = document.getElementsByTagName('p')[shadow_location];
		
		//try{document.getElementsByTagName('p')[shadow_location].insertBefore(shadow,document.getElementsByTagName('p')[shadow_location].firstChild);}
		//catch(err){document.getElementsByTagName('p')[shadow_location].insertBefore(shadow,document.getElementsByTagName('p')[shadow_location].firstChild);}
		//catch(err){setTimeout(document.getElementsByTagName('p')[shadow_location].insertBefore(shadow,document.getElementsByTagName('p')[shadow_location].firstChild),500);}
	}

	
}
});



//create keyword shortcut
function shortcut(shortcut,callback,opt) {
	//Provide a set of default options
	var default_options = {
		'type':'keydown',
		'propagate':false,
		'target':document
	}
	if(!opt) opt = default_options;
	else {
		for(var dfo in default_options) {
			if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
		}
	}

	var ele = opt.target
	if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
	var ths = this;

	//The function to be called at keypress
	var func = function(e) {
		e = e || window.event;

		//Find Which key is pressed
		if (e.keyCode) code = e.keyCode;
		else if (e.which) code = e.which;
		var character = String.fromCharCode(code).toLowerCase();

		var keys = shortcut.toLowerCase().split("+");
		//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
		var kp = 0;
		


			for(var i=0; k=keys[i],i<keys.length; i++) {
			//Modifiers
			if(k == 'ctrl' || k == 'control') {
				if(e.ctrlKey) kp++;

			} else if(k ==  'shift') {
				if(e.shiftKey) kp++;

			} else if(k == 'alt') {
					if(e.altKey) kp++;

			} else if(k.length > 1) { //If it is a special key
				if(special_keys[k] == code) kp++;

			} else { //The special keys did not match
				if(character == k) kp++;
				
			}
		}

		if(kp == keys.length) {
			callback(e);

			if(!opt['propagate']) { //Stop the event
				//e.cancelBubble is supported by IE - this will kill the bubbling process.
				e.cancelBubble = true;
				e.returnValue = false;

				//e.stopPropagation works only in Firefox.
				if (e.stopPropagation) {
					e.stopPropagation();
					e.preventDefault();
				}
				return false;
			}
		}
	}


	//Attach the function with the event	
	if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
	else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
	else ele['on'+opt['type']] = func;
}

var edit_bool = false;

shortcut("Ctrl+Z",function() {
	all_paragraphs = document.getElementsByTagName('p');

	//Edit Mode off. Turn it on
	if(!edit_bool) {

		
		//Shadow Match Present. Add Option To Delete.
		if(shadow_location > -1){
			
			paragraph = all_paragraphs[shadow_location];

			//Custom Shadow Match Present. Add Option To Export to Facebook.
			if(custom_shadow_id > -1)
				paragraph.innerHTML = '<a href ="http://www.deepnet.us/share_on_facebook.php?url=' + url + '&custom_shadow_id=' + custom_shadow_id +'"target="_blank"  style="color: rgb(148,0,211)"> **Share_On_Facebook** </a>'+ paragraph.innerHTML;

			paragraph.innerHTML = '<a href ="http://www.deepnet.us/ShadowControl/view_shadow_stats.php?page_num=1&url=' + url + "&p_index=" + i+'&url_id=' + url_id +'"target="_blank"  style="color: rgb(0,255,0)"> **See_All_Shadows** </a>'+ paragraph.innerHTML;
			paragraph.innerHTML = '<a href ="http://www.deepnet.us/ShadowControl/delete_shadow.php?smi=' + shadow_match_id + "&url=" + url +'"style="color: rgb(255,0,0)"> **DELETE_SHADOW** </a>'+ paragraph.innerHTML;
			
			
			
			
		
		}

		

		//Add Option to Insert Shadow for each paragraph
		for (var i = 0; i < all_paragraphs.length; i++) {

			var link = "http://www.deepnet.us/ShadowSearch.php?url=" + url + "&p_index=" + i+'&url_id=' + url_id;
			paragraph = all_paragraphs[i];

			//Shadow Match Appearing in this paragraph
			//Add Option to Delete Shadow Match
			

			paragraph.innerHTML = '<a href ="' + link + '"target="_blank" style="color: rgb(0,0,255)"> **INSERT_SHADOW** </a>'+ paragraph.innerHTML;
		}

	edit_bool = true;
	}

	//Edit Mode On. Turn it off.
	else {

		//Shadow Match Present. Remove Option To Delete and View Stats.
		if(shadow_location > -1){
			
			paragraph = all_paragraphs[shadow_location];
			paragraph.removeChild(paragraph.firstChild);
			paragraph.removeChild(paragraph.firstChild);
		
			//Custom Shadow Match Present. Remove Option To Export to Facebook.
			if(custom_shadow_id > -1)
				paragraph.removeChild(paragraph.firstChild);

		}

		

		for (var i = 0; i < all_paragraphs.length; i++) {

			paragraph = all_paragraphs[i];
			paragraph.removeChild(paragraph.firstChild);
		}
	
		edit_bool = false;
		
	}
});

function check_google_search(url) {

        
	
	if(url.indexOf('http://www.google.com') == -1)
    		return url;

	//url Google Search result
	else {

		
		

		var array = url.split("q=");
                
		try {

			array = array[1].split("&");
			url = array[0];
			url = escape(url).replace(/ /g,'\+');
                	//url = str_replace(' ','+',$url);
			url = 'http://www.google.com/search?q='+url;
                	return url;
		}
	
		catch(err){return url;}
	}
}


