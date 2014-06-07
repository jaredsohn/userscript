// ==UserScript==
// @name          Media Mogul Erepublik Project /CQ
// @description   Media Mogul for Erepublik /CQ
// @homepage      http://userscripts.org/scripts/show/116790
// @include       http://www.erepublik.com/*
// @copyright     2011, CQ (work@x2u.pl)
// @version       1.12
// ==/UserScript==

var c_ver = '1.11';
var c_htmlinsert = '<div id="cqmm_mainbox" class="box" style="width:333px;"><div class="title" style="border:none;margin-bottom:0px;"><h1>Media Mogul Project</h1></div><div id="cqmm_box" style="background-image: url(\'/images/modules/sidebar/background.png\');background-repeat: repeat;border: 2px solid #EBEBEB;border-radius: 5px 5px 5px 5px;float: left;margin-right: 18px;padding: 11px 11px 8px;width: 308px;margin-top:15px;color:#8D8D8D;">Active Members: <b><span id="cqmm_am">?</span></b><br />Balance: <b><span id="cqmm_balance">?</span></b><br />Queue: <b><span id="cqmm_queue">?</span></b><br /><br /> Version 1.11 (auto update every 60 minutes) by cq</div></div>';
var c_errV = new Array('', '', 'Firstly, please create a newspaper.', 'Thank You for taking part in this project. Project is <b>over</b> as eRepublik Team putted captcha to subscribe module, and I don\'t have time to fight with them :).<br /><br />Regards, CQ', 'Are you trying to cheat me?', 'We don\'t supprot multi accounts.', 'Succesfully updated, please refresh the page.');
var c_reg1 = /profile\/(\d*)">/;
var c_reg2 = /\/newspaper\/(.*)-(\d*)\/1" title="/;
var c_reg3 = /"bg-btn-profilemenu">(\d*)<\/span><img/;
var c_reg4 = /goright" href="#">Subscribe<\/a>/;
var c_reg5 = /display:none" href="#">Unsubscribe<\/a>/;
var c_reg6 = /id="_token" value="(.*)" \/>/;
var c_reg7 = /href="\/en\/newspaper\/(.*)-(\d*)\/1">/;
var c_reg8 = /http:\/\/www.erepublik.com\/\D{2}(.*)/;
var v_speed = 500;
var v_usrid, v_paperid, v_acsubs, v_progress, v_countM, v_countS, v_subArray, v_errCount, time, v_box, v_sleep=0;

function CQmain() {
    
    $j.cookie('cqmm_time', null);
    $j.cookie('cqmm_time2', null);
    $j.cookie('cqmm_memory', null);
    $j.cookie('cqmm_progress', null);
    $j.cookie('cqmm_data', null);
    
    if(BoxCheck() && v_sleep==0){$j(c_htmlinsert).insertAfter('#news')};
    
    $j("div.user_info").html().match(c_reg1);
    v_usrid = RegExp.$1;

    var currentTime = new Date();
    time = currentTime.getTime();
    CacheSet('cqmm_time2', time);
    
    v_progress = CacheGet('cqmm_progress');
    if (v_progress == undefined) {v_progress=0;}
    
    
    if (CacheGet('cqmm_progress') == undefined || CacheGet('cqmm_memory') == undefined || CacheGet('cqmm_time') == undefined) {CacheSet('cqmm_time', 0);}
    if(((time-CacheGet('cqmm_time'))/1000)>360000){
        GM_xmlhttpRequest({
          method: "GET",
          url: "http://www.erepublik.com/en/citizen/profile/"+v_usrid,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": "http://www.erepublik.com/en/index"

          },
            onload: function(response) {
                response.responseText.match(c_reg2);
                v_paperid = RegExp.$2;
                if (v_paperid != undefined){
                    GM_xmlhttpRequest({
                      method: "GET",
                      url: "http://www.erepublik.com/en/newspaper/"+v_paperid+"/1",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Referer": "http://www.erepublik.com/en/index"

                      },
                        onload: function(response) {
                            response.responseText.match(c_reg3);
                            v_acsubs = RegExp.$1;
                            window.setTimeout(GetData, 1);
                            
                        }}); 
                 }else{
                     CacheSet('cqmm_data', (v_paperid+';'));
                     
                     ThrowError(2);
                 }
            }});     
        CacheSet('cqmm_time', time);
    }else{
        var CookieData = CacheGet('cqmm_data').split(";");
        v_paperid = CookieData[0];
        
        if(CookieData[4]!=c_ver){
            CacheSet('cqmm_time', 0);
            ThrowError(6);
        }
        
        if (v_paperid != 'undefined'){
            if(ThrowError(CookieData[3])){
                GM_xmlhttpRequest({
                  method: "GET",
                  url: "http://www.erepublik.com/en/newspaper/"+v_paperid+"/1",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "http://www.erepublik.com/en/index"

                  },
                    onload: function(response) {
                        
                        response.responseText.match(c_reg3);
                        v_acsubs = RegExp.$1;
                        
                        if(BoxCheck()){$j("#cqmm_am").html(CookieData[2]);}
                        BalanceSet(CookieData[1], v_acsubs);
                        
                        v_subArray = CacheGet('cqmm_memory').split(";");
                        window.setTimeout(StartSubscribe, 1);
                    }}); 
            }
            
        }else{
            ThrowError(2);
        }
        
    }
}

function GetData() {
    GM_xmlhttpRequest({
      method: "POST",
      url: "http://dev.x2u.pl/mmerep/main.php",
      data: "eid="+v_usrid+"&pid="+v_paperid+"&sub="+v_acsubs+"&ver="+c_ver+"&progress="+v_progress,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      onload: function(response) {
        var Resp = response.responseText.split("|");
        var Resp1 = Resp[0].split(";");
        CacheSet('cqmm_data', (v_paperid+';'+Resp1[1]+';'+Resp1[2]+';'+Resp1[0]+';'+c_ver));
        CacheSet('cqmm_progress', (Resp1[3]));
        v_progress = Resp1[3];
        if(BoxCheck()){$j("#cqmm_am").html(Resp1[2]);}
        BalanceSet(Resp1[1], v_acsubs);
        
        if(ThrowError(Resp1[0])){
            CacheSet('cqmm_memory', (Resp[1]));
            v_subArray = Resp[1].split(";");
            window.setTimeout(StartSubscribe, 1);
        }
      }
    });
}

function ThrowError(a) {
    if(a > 1){
        if(BoxCheck()){$j("#cqmm_box").html('<b>'+c_errV[a]+'</b>');}
        return false;
    }else{
        return true;
    }
}

function BalanceSet(a, b) {
    var res = b-a;
    if(res >0){
        res='+'+res;
    }
    if(BoxCheck()){$j("#cqmm_balance").html(res);}
}

function SubscribeMain() {
    if (CacheGet('cqmm_time2') == time){
        if (v_countS<v_countM){       
            var da = v_subArray[v_countS].split(",");
            da[0]=da[0]*1;
            if (da[0]>v_progress){
                GM_xmlhttpRequest({
                  method: "GET",
                  url: "http://www.erepublik.com/en/newspaper/"+da[1]+"/1",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Referer": "http://www.erepublik.com/en/index"

                  },  
                    onload: function(response) {
                        response.responseText.match(c_reg6);
                        var token = RegExp.$1;
                        
                        if(token.length > 1){
                            if(c_reg4.test(response.responseText) == true && c_reg5.test(response.responseText) == true){
                                
                                response.responseText.match(c_reg7);
                                
                                GM_xmlhttpRequest({
                                  method: "POST",
                                  url: "http://www.erepublik.com/subscribe",
                                  data: "_token="+token+"&n="+da[1]+"&type=subscribe",
                                  headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                    "Referer": "http://www.erepublik.com/en/newspaper/"+RegExp.$1+"-"+RegExp.$2+"/1"
                                    
                                  },                               
                                  onload: function(response) {
                                     if(/\d/.test(response.responseText) == true){
                                        SubscribeContinue(da[0]);
                                     }else{
                                        v_errCount++;
                                        if(v_errCount >2){
                                            SubscribeContinue(da[0]);
                                        }else{
                                            window.setTimeout(SubscribeMain, v_speed);
                                        }
                                     }
                                  }
                                });
                            }else{
                                SubscribeContinue(da[0]);
                            }
                        }else{
                            v_errCount++;
                            if(v_errCount >4){
                                SubscribeContinue(da[0]);
                            }else{
                                window.setTimeout(SubscribeMain, v_speed);
                            }
                        }
                        
                        
                    }}); 
            }else{
                if(BoxCheck()){$j("#cqmm_queue").html(v_countM-v_countS-1);}
                v_countS++;
                window.setTimeout(SubscribeMain, 1);
                if (v_countS>=(v_countM-1) && v_countM>5){
                    CacheSet('cqmm_time', undefined);
                    CacheSet('cqmm_memory', undefined);
                    v_sleep=1;
                    CQmain();
                }
            }
        }
    }else{
        window.setTimeout(SleepScript, 15000);
    }
}

function StartSubscribe() {
    v_countM = v_subArray.length;
    v_countS = 0;
    v_errCount = 0;
    window.setTimeout(SubscribeMain, 1);    
}

function SubscribeContinue(a) {
    v_progress = a;
    CacheSet('cqmm_progress', (a));
    if(BoxCheck()){$j("#cqmm_queue").html(v_countM-v_countS-1);}
    v_countS++;
    v_errCount = 0;   
       
    if (v_countS>=(v_countM-1) && v_countM>5){
        
        CacheSet('cqmm_time', undefined);
        CacheSet('cqmm_memory', undefined);  
        v_sleep=1;
        CQmain();
    }
    
    window.setTimeout(SubscribeMain, v_speed);
    
    
}

function SleepScript(){
    if(v_sleep == CacheGet('cqmm_progress')){
        CQmain();
    }else{
        v_sleep = CacheGet('cqmm_progress');
        window.setTimeout(SleepScript, 10000);
    }
}

function BoxCheck() {
    if(v_box==1){
        return true;
    }else{
        return false;
    }
}

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { $j = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
    if (typeof unsafeWindow == 'undefined') { unsafeWindow = window; }
    
    var title = $j(".user_avatar").attr("title");
    if (title != undefined){       
        $j(location).attr('href').match(c_reg8); 
        if(RegExp.$1.length == 0){
            v_box = 1;
            CQmain();
        }
        
        
    }
}

function CacheSet(name, value){
  value = typeof(value) != 'undefined' ? value : 'undefined';
  if(value == 'undefined'){
      GM_setValue(name, value);
      return 1;
  }  
  if(typeof value == "boolean")
    value = value ? "{b}1" : "{b}0";
  else if(typeof value == "string")
    value = "{s}" + value;
  else if(typeof value == "number")
    value = "{n}" + value;
  else
    value = "{o}" + value.toSource();
  GM_setValue(name, value);
}

function CacheGet(name){
  var value=GM_getValue(name);
  value = typeof(value) != 'undefined' ? value : 'undefined';
  if(value == 'undefined'){
      return undefined;
  }  
  if(!value.indexOf)
    return value;
  if(value.indexOf("{o}")==0){
    try{
      return eval("("+value.substr(3)+")");
    }catch(e){
      GM_log("Error while calling variable "+name+" while translating into an object: \n\n"+e+"\n\ncode:\n"+value.substr(3))
      return false;
    }
  }
  if(value.indexOf("{b}")==0)
    return !!parseInt(value.substr(3));
  if(value.indexOf("{n}")==0)
    return parseFloat(value.substr(3));
  if(value.indexOf("{s}")==0)
    return value.substr(3);
  return value;
}

jQuery.cookie = function(name, value, options) {
    //author Klaus Hartl/klaus.hartl@stilbuero.de
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};