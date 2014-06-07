// ==UserScript==
// @name           HealNY
// ==/UserScript==

*/
	Yevgen Silant'yev, http://joyka.pp.ua/mafia/
*/
javascript:(function(){

if (navigator.appName == 'Microsoft Internet Explorer') {
	alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
	return;
}

if(document.getElementById('app200642994135_iframe_canvas')){
	if(confirm('Beta? Mmmmm ... cool!\nYou need to unframe the page. Do you want me to do it for you?\nYou still may need to run UnFrameMW or ScrollMW to add scrollability!')){
		window.location.href=document.getElementById('app200642994135_iframe_canvas').src;
	}
}
else if(document.getElementById('app10979261223_iframe_canvas')){
	if(confirm('You need to unframe the page. Do you want me to do it for you?\nYou still may need to run UnFrameMW or ScrollMW to add scrollability!')){
		window.location.href=document.getElementById('app10979261223_iframe_canvas').src;
	}
}
else{

var last_i=0,xmlHTTP;
var app_number='';
function city(){
	if(document.getElementById(app_number+'mw_city_wrapper').className=='mw_city1'){return '1';}
	else if(document.getElementById(app_number+'mw_city_wrapper').className=='mw_city2'){return '2';}
	else return '3';
}

function getMWURL(){
	str = document.location;
	str = str.toString();
	beg = str.substring(0,str.indexOf('?')+1);
	str = str.substring(str.indexOf('?')+1);
	str = str.split('&');
	mid = '';
	for(var i=0;i<str.length;i++){
		if(str[i].indexOf('sf_xw_')==0){mid=mid+str[i]+'&';}
	}
	return beg+mid+'&skip_req_frame=1&';
}

links = [];
if (city()=='1'){
	links.push(getMWURL()+'xw_controller=hospital&xw_action=heal');
} else {
	links.push(getMWURL()+'xw_controller=travel&xw_action=travel&destination=1&from=hospital');
	links.push(getMWURL()+'xw_controller=hospital&xw_action=heal');
	links.push(getMWURL()+'xw_controller=travel&xw_action=travel&from=fight&destination='+city());
}

function check(){
	request(links[last_i]);
	return false;
}

function get_xmlHTTP () {
	if (window.XMLHttpRequest) return new XMLHttpRequest();
	if (window.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
	return null;
}

xmlHTTP = get_xmlHTTP();
if (!xmlHTTP) {
	alert('Your browser does not support XMLHTTP.');
	return;
}

function request(url) {
	xmlHTTP.onreadystatechange=state_change;
	xmlHTTP.open('GET',url,true);
	xmlHTTP.send(null);
	last_i++;
}

function state_change() {
	if (xmlHTTP.readyState == 4) {
		if (xmlHTTP.status == 200) {
			var str = '';
			str = xmlHTTP.responseText;
			delete xmlHTTP['onreadystatechange'];
			if(str.indexOf('<td class="message_body">')>=0){
				str = str.substring(str.indexOf('<td class="message_body">'));
				str = str.substring(25,str.indexOf('</td>'));
				str = str.replace(/(<([^>]+)>)/ig,"");
				alert(str);
			}
			if(last_i<links.length){check();}
		}
	}
}

check();

}

}())