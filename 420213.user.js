// ==UserScript==
// @name       BoltAutoLogin
// @namespace  http://use.i.E.your.homepage/
// @version    0.4

// @description  enter something useful
// @match      http://192.168.1.1/*
// @copyright  2012+, You
// ==/UserScript==

log('Bolt4G AutoLoad Start');

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    location.reload()
}

// Include Dependency JS
appendJs('https://raw.githubusercontent.com/ccampbell/mousetrap/master/mousetrap.min.js', 'shorcutLib');
appendJs('https://raw.githubusercontent.com/dwachss/bililiteRange/master/bililiteRange.js', 'bililiteRange');
appendJs('https://raw.githubusercontent.com/dwachss/bililiteRange/master/jquery.sendkeys.js', 'kbFire');
appendJs('https://raw.githubusercontent.com/carhartl/jquery-cookie/master/jquery.cookie.js', 'CookieLibrary');

var url = 'http://192.168.1.1/goform/goform_get_cmd_process?multi_data=1&isTest=false&cmd=';
var timestamp = new Date().getTime();
var body = $(document).find('body');
var delay = 1;

log('Starting Override Operation in '+delay+' Second')

setTimeout(function(){

	log('Starting Override Operation')
    init()

}, eval(delay + '000'))

function init()
{
 	htmlInit()
	jsInit()   
}

/* HTML GENERATOR */

function htmlInit()
{
    
}

function createHeader()
{
    var header = '<div id="custom-bolt-header" style="height: 90px;z-index: 999;width: 100%;position: absolute;top: 0;background: #000;">'
			header += '<div class="container" style="height:100%;">'
            	header += '<span id="bolt-download" style="margin:15px 15px auto;" class="btn btn-info"></span>'
                header += '<span id="bolt-upload" style="margin:15px 15px auto;" class="btn btn-info"></span>'
                header += '<span class="btn btn-info" style="margin:15px 15px auto;" id="bolt-sinyal"></span>'
                header += '<span class="btn btn-info" style="margin:15px 15px auto;" id="bolt-batere-total"></span>'
				header += '<span class="btn btn-info" style="margin:15px 15px auto;" id="bolt-batere-status"></span>'
            header += '</div>'
		header += '</div>'
    
    body.append(header)
}

function deleteFooter()
{
 	body.find('.bottom-menu').remove()   
}

function showLoginForm()
{
    require(['login', 'jquery'], function(login, $){
            	
 		$.get('http://192.168.1.1/tmpl/login.html', function(data){
            
           	body.find('#container').remove()
            body.append('<div id="container" class="container custom-bolt-container" ></div>')
            
            $(document).find('#container').html(data)
            
            login.init()
            login.gotoLogin()
            
        });                 
            
	});
}

/* JAVASCRIPT CORE v0.4*/

function jsInit()
{
	getStatusLogin()
    createHeader()
    deleteFooter()
    getSpeed()
    getBattere()
    getSinyal()
}

function getStatusLogin()
{
 	var cmdLogin = createUrl('loginfo')
    var loginForm = body.find('#loginForms').length
    
    $.get(cmdLogin, function(data)
    {
    	data = $.parseJSON(data)
    	
        var status = (data.loginfo == 'no') ? false : true;
        
        if(!status)
        {
            showLoginForm()
        }
        
    });
}

function getBattere()
{
    setInterval(function(){
    
    	var cmdBatere = createUrl('battery_pers,battery_charging')
        
        $.get(cmdBatere, function(data){
        
            data = $.parseJSON(data)
            
            var divBatereStatus = body.find('#bolt-batere-total')
            var divBatereCas = body.find('#bolt-batere-status')
            
            divBatereStatus.html('Batre : ' + (data.battery_pers) + ' Batang')
            divBatereCas.html('Charge  : ' + ((data.battery_charging) ? 'ya' : 'ga'))
            
        });
        
    }, 10000)   
}

function getSinyal()
{
    setInterval(function(){
    
    	 var cmdSpeed = createUrl('signalbar');
    
        $.get(cmdSpeed, function(data){
        
            data = $.parseJSON(data)
            
            var divSinyal = body.find('#bolt-sinyal')
            
            divSinyal.html('Sinyal : ' + (data.signalbar) + ' Batang ' + ((data.signalbar <= 3) ? ':(' : ':)'))
            
            if(data.signalbar <= 3)
            {
               	divSinyal.removeClass('btn-info')
                divSinyal.addClass('btn-danger')
                
			} else {
            
                divSinyal.addClass('btn-info')
                divSinyal.removeClass('btn-danger')
			}
        });
        
    },500)
}

function getSpeed()
{
    setInterval(function(){
    
    	 var cmdSpeed = createUrl('realtime_tx_thrpt,realtime_rx_thrpt');
    
        $.get(cmdSpeed, function(data){
        
            data = $.parseJSON(data)
            
            var divUpload = body.find('#bolt-upload')
            var divDownload = body.find('#bolt-download')
            
            divUpload.html('Upload : ' + numberFormat(data.realtime_tx_thrpt, 0, 3) + ' bps')
            divDownload.html('Download : ' + numberFormat(data.realtime_rx_thrpt, 0, 3) + ' bps')
            
        });
        
    },500)
}

// Lib Func 

function createCmd(array)
{
	return array.join(',');
}

function createUrl(cmd)
{
	return url + cmd + '&_=' + timestamp;
}

function appendJs(url, id)
{
	var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url;
    s.id = id;
    document.body.appendChild(s);
    log('[JS] ' + id + ' Added to Queue');
}

function appendCss(url, id)
{
	var fileref=document.createElement("link")
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("type", "text/css")
	fileref.setAttribute("href", url)   
    fileref.setAttribute("id", id)
    log('[CSS] ' + id + ' Added to Queue');
}

function log(message)
{
    var tag = '[BOLT4G]';
    console.log(tag + ' ' + message);
}

function numberFormat(num, n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = parseInt(num).toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

function base64_encode(data) {
  //  discuss at: http://phpjs.org/functions/base64_encode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Rafał Kukawski (http://kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  //   example 1: base64_encode('Kevin van Zonneveld');
  //   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  //   example 2: base64_encode('a');
  //   returns 2: 'YQ=='

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
}

function base64_decode(data) {
  //  discuss at: http://phpjs.org/functions/base64_decode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Aman Gupta
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Onno Marsman
  // bugfixed by: Pellentesque Malesuada
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
  //   returns 1: 'Kevin van Zonneveld'
  //   example 2: base64_decode('YQ===');
  //   returns 2: 'a'

  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    dec = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  data += '';

  do { // unpack four hexets into three octets using index points in b64
    h1 = b64.indexOf(data.charAt(i++));
    h2 = b64.indexOf(data.charAt(i++));
    h3 = b64.indexOf(data.charAt(i++));
    h4 = b64.indexOf(data.charAt(i++));

    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

    o1 = bits >> 16 & 0xff;
    o2 = bits >> 8 & 0xff;
    o3 = bits & 0xff;

    if (h3 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1);
    } else if (h4 == 64) {
      tmp_arr[ac++] = String.fromCharCode(o1, o2);
    } else {
      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
    }
  } while (i < data.length);

  dec = tmp_arr.join('');

  return dec.replace(/\0+$/, '');
}

/*********************************************************
gets the value of a cookie
**********************************************************/
document.getCookie = function(sName)
{
    sName = sName.toLowerCase();
    var oCrumbles = document.cookie.split(';');
    for(var i=0; i<oCrumbles.length;i++)
    {
        var oPair= oCrumbles[i].split('=');
        var sKey = decodeURIComponent(oPair[0].trim().toLowerCase());
        var sValue = oPair.length>1?oPair[1]:'';
        if(sKey == sName)
            return decodeURIComponent(sValue);
    }
    return '';
}
/*********************************************************
sets the value of a cookie
**********************************************************/
document.setCookie = function(sName,sValue)
{
    var oDate = new Date();
    oDate.setYear(oDate.getFullYear()+1);
    var sCookie = encodeURIComponent(sName) + '=' + encodeURIComponent(sValue) + ';expires=' + oDate.toGMTString() + ';path=/';
    document.cookie= sCookie;
}
/*********************************************************
removes the value of a cookie
**********************************************************/
document.clearCookie = function(sName)
{
    setCookie(sName,'');
}