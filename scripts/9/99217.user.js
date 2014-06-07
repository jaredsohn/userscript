// ==UserScript==
// @name           Facebook 3
// @namespace      nb_fb
// @include        http://www.facebook.com/ads/create/*
// @include		   https://secure.facebook.com/ads/create/review_ad.php*
// @exclude		   http://www.facebook.com/ads/create/photos/*
// ==/UserScript==

console = unsafeWindow['console'];
//console.log('Facebook 3 init');
// utility classes
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
	return ele;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
	return ele;
}
function lastElementInArray(array){
	var last = array[array.length -1];
	
	return last;
}
// find elements
// getElementById
// getElementsByTagName
// getElementsByClassName

// get attributes
// getAttribute

// create elements
// document.createElement
// on load execute this

// insert
// appendChild


//window.addEventListener('load', function(event) {

function buildInput(obj){
	
	var existing_url = parseUrl();
	var tr_elm_a = document.createElement('tr');
	addClass(tr_elm_a, 'link_url dataRow');
	var th_elm_a = document.createElement('th');
	addClass(th_elm_a, 'label')
	th_elm_a.innerHTML = obj.name + ':';
	var td_elm_a = document.createElement('td');
	addClass(td_elm_a, 'data');
	var div_elm_a = document.createElement('div');
	var div_elm_b = document.createElement('div')
	addClass(div_elm_b, 'uiComboInput form_input');
	var input_elm_a = document.createElement('input')
	addClass(input_elm_a, 'inputtext ' + 'ga_' + obj.name.toLowerCase() + ' ga-added' + ' ga_param_' + obj.param_name);
	input_elm_a.setAttribute('type','text');
	input_elm_a.setAttribute('tabindex', obj.tab_index);
	input_elm_a.setAttribute('name','ga_' + obj.name.toLowerCase());
	
	if(existing_url.params.hasOwnProperty(obj.param_name)){
		input_elm_a.setAttribute('value', existing_url.params[obj.param_name]);
	}else{
		input_elm_a.setAttribute('value', obj.value);		
	}
	
	td_elm_a.appendChild(div_elm_a)
	div_elm_a.appendChild(div_elm_b)
	div_elm_b.appendChild(input_elm_a);

	tr_elm_a.appendChild(th_elm_a);
	tr_elm_a.appendChild(td_elm_a);
	
	return tr_elm_a;
}

function buildInputs(inputs_array){
	var elements_array = [];
	for(var i=0;i<inputs_array.length;i++){
		var input = buildInput(inputs_array[i]);
		elements_array.push(input);
	}
	return elements_array;
}

function insertInputs(target, elements_array){
	var td = document.createElement('td');
	td.setAttribute('colspan', '2');
	var hr = document.createElement('hr');
	var tr = document.createElement('tr');
	addClass(tr, 'spacer');
	td.appendChild(hr)
	tr.appendChild(td);
	for(var i=0;i<elements_array.length;i++){
		var elm = elements_array[i];
		target.appendChild(elm);
		target.appendChild(tr);
	}
}
function buildButton(){
	var label = document.createElement('label');
	addClass(label, 'comboButton uiButton');
	var input = document.createElement('input');
	input.setAttribute('type', 'submit');
	input.setAttribute('value', 'Update Url');
	label.appendChild(input);
	label.addEventListener('click', function(){
		updateUrl();
	}, 'false');
	return label;
	
}
function insertButton(){
	var button = buildButton();
	var added_elms = document.getElementsByClassName('ga-added');
	var target = added_elms[added_elms.length - 1];
	target.parentNode.appendChild(button);
}
function updateUrl(){
	var existing_url = parseUrl();
	var old_params = existing_url.params;
	var new_params = collectValues();
	
	for (attrname in new_params) { old_params[attrname] = new_params[attrname]; }
	
	existing_url.params = old_params;
	var str = urlObjToString(existing_url);
	
	document.getElementsByName('link_url')[0].value = str;
	updatePreview(str);
	
}

function addContentAsFormParam(){
	var form = document.getElementById('create_ad_form');
	
}
function insertPreview(elm){
	var tgt = document.getElementsByClassName('preview')[0];
	// goes at end
	tgt.parentNode.appendChild(elm);
	return elm;
}
function updatePreview(url_string){
	var tgt = document.getElementById('nb_fb_destination_url_preview') || insertPreview(buildPreview());
	tgt.innerHTML = url_string;
	return true;
}
function buildPreview(){

	var tr_elm_a = document.createElement('tr');
	addClass(tr_elm_a, 'preview');
	var th_elm_a = document.createElement('th');
	addClass(th_elm_a, 'label')
	th_elm_a.innerHTML = 'Destination Url:';
	var td_elm_a = document.createElement('td');
	addClass(td_elm_a, 'data');
	var div_elm_a = document.createElement('div');
	var div_elm_b = document.createElement('div')
	addClass(div_elm_b, 'preview');
	div_elm_b.setAttribute('id', 'nb_fb_destination_url_preview');

	td_elm_a.appendChild(div_elm_a)
	div_elm_a.appendChild(div_elm_b)
	tr_elm_a.appendChild(th_elm_a);
	tr_elm_a.appendChild(td_elm_a);
	
	return tr_elm_a;
}

function collectValues(){
	var added_elms = document.getElementsByClassName('ga-added');
	var params_collection = {};
	for(var i=0;i<added_elms.length;i++){
		var elm = added_elms[i];
		var val = elm.value;
		if (val != ""){
			regex = 'ga_param_(.*)'
			var param_name = elm.className.match(regex);
			if(param_name != null){
				if(param_name.length>1){
					param_name = param_name[1].split(' ')[0];
				}else{
					param_name = param_name[0];
				}
				
			}else{
				param_name = new Date().getTime();
				
			}
			//var param_obj = {};
			//param_obj[param_name] = val;
			params_collection[param_name] = val;
		}
		

	}
	
	return params_collection;
}
function parseUrl(){
	var a_entered_url = document.getElementsByName('link_url')[0].value;
	var regex = '^(.*?//)*([\w\.\d]*)(:(\d+))*(/*)(.*)$';
	
	var parts = a_entered_url.match(regex);
	
	var protocol = parts[1] || '';
	var subdomain = parts[2] || '';
	var res = parts[6];
	var test_for_hash = res.split('#');
	var hash = '';
	res = test_for_hash[0];
	if(test_for_hash.length > 1){
	    hash = test_for_hash[1];
	}
	var test_for_params = res.split('?');
	res = test_for_params[0];
	var params_string = '';
	var params_obj = {};
	if(test_for_params.length>1){
	    params_string = test_for_params[1];
		var params_kv_strings = params_string.split('&');
	    for(var i=0;i<params_kv_strings.length;i++){
	        var kv_string = params_kv_strings[i];
	        var kv_split = kv_string.split('=');
	        var k = kv_split[0];
	        var v = kv_split[1];
	        params_obj[k] = v;
	    }
	}
	var return_val = {'protocol':protocol,'hash':hash,'params': params_obj, 'resource':res, 'subdomain':subdomain};
	return return_val;
	
}
function urlObjToString(obj){
	var str = obj.protocol + obj.subdomain + obj.resource;
	var param_str = "";
	var params_count = 0;
	for (k in obj.params) if (obj.params.hasOwnProperty(k)) params_count++;
	var i = 0;
	for (k in obj.params){
		v = obj.params[k];
		if(i==0){
			param_str += "?";
		}
		param_str += encodeURIComponent(k) + "=" + encodeURIComponent(v);
		
		if(i!=(params_count - 1)){
			param_str += "&";
		}
		i++;
	}
	str += param_str;
	
	obj.hash.length > 0 ? str += "#" + obj.hash : false;
	
	return str;
}
function addParamsToUrl(){
	var entered_url_obj = parseUrl();
	
}
function addListenerToReviewButton(){
	var button = document.getElementsByName('ads_create_submit')[0];
	if(button != undefined){
		button.addEventListener('click', function(ev){
			var name_arr = [];
			var name_str = '';
			var url = parseUrl();
			if(url.params.hasOwnProperty('utm_content')){
				if(url.params.utm_content != ''){
					name_arr.push(url.params.utm_content);					
				}
			}
			if(url.params.hasOwnProperty('utm_keyword')){
				if(url.params.utm_keyword != ''){
					name_arr.push(url.params.utm_keyword);
				}
			}
			if(name_arr.length > 0){
				name_str = name_arr.join('_');
				GM_setValue('nb_fb_suggested_ad_name', name_str);
			}
			return true;

		}, 'false');
		
	}
}

function updateSuggestedName(){
	var suggested_name_elm = document.getElementById('suggested_name');
	var stored_suggested_name = GM_getValue('nb_fb_suggested_ad_name', null);
	if(stored_suggested_name != null){

		suggested_name_elm.value = stored_suggested_name;
		GM_setValue('nb_fb_suggested_ad_name', null);
	}	
}


// Wait for Facebook's content element to exist
if (self.location == top.location)
  var checker=setInterval(function(){
    if(document.getElementById('content')) {
      clearInterval(checker);
      //process(); // Start the listener
		controller();
    }
  }, 200);

function initReviewAd(){
	updateSuggestedName();
}

function initCreateOrEditAd(){
	// where to insert new form fields
	var tgt = document.getElementsByClassName('link_url_section')[0];
	var input_a = {'name': 'Source','value':'','param_name':'utm_source', 'tab_index': 6};
	var input_b = {'name': 'Medium','value':'','param_name':'utm_medium', 'tab_index': 6};
	var input_c = {'name': 'Campaign','value':'','param_name':'utm_campaign', 'tab_index': 6};
	var input_d = {'name': 'Content','value':'','param_name':'utm_content', 'tab_index': 6};
	var input_e = {'name': 'Keyword','value':'','param_name':'utm_keyword', 'tab_index': 6};
	var inputs = [];

	inputs.push(input_a);
	inputs.push(input_b);
	inputs.push(input_c);
	inputs.push(input_d);
	inputs.push(input_e);


	var elements_array = buildInputs(inputs);
	insertInputs(tgt, elements_array);	
	insertButton();
	insertPreview(buildPreview());
	updateUrl();
	addListenerToReviewButton();
	
}

function controller(){
	var location = document.location.href;
	if(location.match(/review_ad.php/)){
		initReviewAd();
		return;
	}

	if(location.match(/create/)){
		initCreateOrEditAd();
		return;
	}
}
