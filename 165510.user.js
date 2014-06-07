// ==UserScript==
// @name       Zamunda.NET new Top10 elements
// @namespace  http://begg.eu
// @version    0.2
// @description   Zamunda.NET changed top10 By Peter Denev
// @match      http://zamunda.net/browse.php
// @copyright  2012+, Peter Denev
// ==/UserScript==



function createCookie(name,value,h) {
	if (h) {
		var date = new Date();
		date.setTime(date.getTime()+(h*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}


Object.prototype.serialize = function() {
	var response = "{";
	for (var p in this) {
		if (this.hasOwnProperty(p))
			response += "'"+ p + "':'" + this[p].serialize() + "',";
	}
	return response.substr(0, response.length-1) + "}";
}

Array.prototype.serialize = function() {
	var response = "[";
	for (var i = 0; i < this.length; i++) {
		response += this[i].serialize() + ",";
	}
	return response.substr(0, response.length-1) + "]";
}

Number.prototype.serialize = function() {
	return this;
}
String.prototype.serialize = function() {
	return this;
}
Boolean.prototype.serialize = function() {
	return this;
}
Function.prototype.serialize = function() {
	return this.toString();
}


function eraseCookie(name) {
	createCookie(name,"",-1);
}

function serialize(obj)
{
  var returnVal;
  if(obj != undefined){
  switch(obj.constructor)
  {
   case Array:
    var vArr="[";
    for(var i=0;i<obj.length;i++)
    {
     if(i>0) vArr += ",";
     vArr += serialize(obj[i]);
    }
    vArr += "]"
    return vArr;
   case String:
    returnVal = escape("'" + obj + "'");
    return returnVal;
   case Number:
    returnVal = isFinite(obj) ? obj.toString() : null;
    return returnVal;    
   case Date:
    returnVal = "#" + obj + "#";
    return returnVal;  
   default:
    if(typeof obj == "object"){
     var vobj=[];
     for(attr in obj)
     {
      if(typeof obj[attr] != "function")
      {
       vobj.push('"' + attr + '":' + serialize(obj[attr]));
      }
     }
      if(vobj.length >0)
       return "{" + vobj.join(",") + "}";
      else
       return "{}";
    }  
    else
    {
     return obj.toString();
    }
  }
  }
  return null;
}

var Base64 = {

// private property
_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

// public method for encoding
encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {

        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

    }

    return output;
},

// public method for decoding
decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

        enc1 = this._keyStr.indexOf(input.charAt(i++));
        enc2 = this._keyStr.indexOf(input.charAt(i++));
        enc3 = this._keyStr.indexOf(input.charAt(i++));
        enc4 = this._keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output = output + String.fromCharCode(chr1);

        if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
        }

    }

    output = Base64._utf8_decode(output);

    return output;

},

// private method for UTF-8 encoding
_utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {

        var c = string.charCodeAt(n);

        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }

    }

    return utftext;
},

// private method for UTF-8 decoding
_utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;

    while ( i < utftext.length ) {

        c = utftext.charCodeAt(i);

        if (c < 128) {
            string += String.fromCharCode(c);
            i++;
        }
        else if((c > 191) && (c < 224)) {
            c2 = utftext.charCodeAt(i+1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = utftext.charCodeAt(i+1);
            c3 = utftext.charCodeAt(i+2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }

    }

    return string;
}

}


function getFirstNewHref(){
    return document.getElementsByClassName('test')[1]
                .getElementsByTagName('tr')[1]
                .getElementsByTagName('td')[1]
                .getElementsByTagName('a')[0]
                .getAttribute('href');
}

function findRowByHref(a_href){
    var torr_rows = document
                .getElementsByClassName('test')[1]
                .getElementsByTagName('tr');    

    for(i=1;i<=torr_rows.length;i++){
        var temp_td = (torr_rows[i]).getElementsByTagName('td')[1];
        var temp_href = temp_td.getElementsByTagName('a')[0]                                
                               .getAttribute('href');       
        if(temp_href==a_href){
            return temp_td;
        }
    }
    return null;
}


if(window.location.href.substr(0, 29) == "http://zamunda.net/browse.php" )
{

	var loc = window.location.href;	
	var ifrId = 0;
	var battle_code = loc.substring(loc.indexOf('battlefield/')+12);
	var cookie_top10_td = 'zam_netTop10_petd';
	var cookie_last_top_row = 'zam_netLastTopRow_pd';
    var cookie_hours = 48;

	
	function getCookieTop(number){
		var cookieTop = readCookie(cookie_top10_td+'_'+number); //eval('(' + readCookie(cookie_top10_td) + ')');
		if(cookieTop==null) cookieTop = "";
		return cookieTop;
	}
    
    function getTopsFromStorage(number){
		var cookieTop = window.localStorage.getItem(cookie_top10_td+'_'+number);
		if(cookieTop==null) cookieTop = "";
		return cookieTop;
	}
	
	function setCookieTops(newList){		
		for(var i=0;i<10;i++){
			createCookie(cookie_top10_td+'_'+i,newList[i], cookie_hours);	
		}	
	}
    
    function setTopsToStorage(newList){
        for(var i=0;i<10;i++){
			window.localStorage.setItem(cookie_top10_td+'_'+i, newList[i]);	
		}	
    }

    function getStorageLastTopRow(){
        var cookieLastTopRow = window.localStorage.getItem(cookie_last_top_row); //eval('(' + readCookie(cookie_top10_td) + ')');
        if(cookieLastTopRow==null) cookieLastTopRow = "";
        return cookieLastTopRow;
    }
    
    function setStorageLastTopRow(a_href){       
        window.localStorage.setItem(cookie_last_top_row, a_href);              
    } 


	function init(){		
		var top10TRs = document.getElementById('div1').getElementsByTagName('table')[0].getElementsByTagName('tr');
		var curTopsList = new Array();	
        //window.localStorage.setItem('value', 'petd');
			
		for(var i=1;i<top10TRs.length;i++){
			var cur_el = top10TRs[i].getElementsByTagName('td')[1];
			var found = false;		
			for(var j=0;j<10;j++){				
				var cookie_el =  getTopsFromStorage(j); //getCookieTop(j);
				
				if(cookie_el==Base64.encode(cur_el.innerHTML)){					
					found = true;
				}
			}			
			if(!found){				
				cur_el.style.backgroundColor="#C3F3CE";
			}
			
			curTopsList[i-1] = Base64.encode(cur_el.innerHTML);			
		}
        
        
        top10TRs[0].getElementsByTagName('td')[0].style.color="#A30D0D";
		        
        setTopsToStorage(curTopsList);
		//setCookieTops(curTopsList);
               
		
		init2();
	}

     function init2(){
        //mark last top_row
        var old_a_href = getStorageLastTopRow();        
        if(old_a_href!=''){
            //show all new rows
            var torr_rows = document
                .getElementsByClassName('test')[1]
                .getElementsByTagName('tr');    

            for(i=1;i<torr_rows.length;i++){
                var temp_td = (torr_rows[i]).getElementsByTagName('td')[1];
                var temp_href = temp_td.getElementsByTagName('a')[0]                                
                                       .getAttribute('href');       
                if(temp_href==old_a_href){
                    //return temp_td;
                    temp_td.setAttribute('title','Last saw row');
                    break;
                }else{
                    temp_td.style.backgroundColor="#C3F3CE";
                }
            }
            
            /*
            // show only last top row
            var f_el = findRowByHref(old_a_href);
            if(f_el!=null){
                f_el.style.backgroundColor="#044F15";
                f_el.setAttribute('title','Last saw row');
            }
            */
        }
        
        //save current top_row
        setStorageLastTopRow(getFirstNewHref());        
    }
	
	setTimeout(init, 1000);
	
}