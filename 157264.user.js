 // ==UserScript==

// @name          Voina Scan

// @namespace     http://www.webmonkey.com
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description   Voina Scan
// @include       http://voina.ru/

//  @grant       none
// ==/UserScript==



var div=document.createElement('div');
div.id='Main_Div';
div.setAttribute('style',"font-size:0.75em;position:absolute;top:0;width:350px;height:800px;padding:0;background-color:silver;overflow:scroll;");
//div.innerHTML= 'DATA';
document.body.appendChild(div);

var userhash = '';


action_buttons_div =  add_new_div('action_buttons_div','Main_Div');
action_buttons_div.innerHTML = '<br /><hr>';

  
speed_build_btn = add_new_div('speed_build_btn','Main_Div');
speed_build_btn.innerHTML = '<input type="button" name="speed_build_btn" id="speed_build_btn" value="Speed Build">';     
var speed_build_button = document.getElementById("speed_build_btn");
  speed_build_button.addEventListener('click',function(){speedup_buildings(userhash)},true);
  
speed_res_btn = add_new_div('speed_res_btn','Main_Div');
speed_res_btn.innerHTML = '<input type="button" name="speed_res_btn" id="speed_res_btn" value="Speed Research">';     
var speed_res_button = document.getElementById("speed_res_btn");
  speed_res_button.addEventListener('click',function(){speedup_science(userhash)},true);
  
speed_army_btn = add_new_div('speed_army_btn','Main_Div');
speed_army_btn.innerHTML = '<input type="button" name="speed_army_btn" id="speed_army_btn" value="Speed Train">';     
var speed_army_button = document.getElementById("speed_army_btn");
  speed_army_button.addEventListener('click',function(){speedup_army(userhash)},true);
/*
    var attrs={}; 
    var truck = 'Грузовик';
    var medic = 'Медик';
    var militiamen = 'Ополченцы';
    var swat = 'Спецназ';
    var hammerCar = 'Ударный Автомобиль';
    var gun  = 'Зенитка';
    var helicopter = 'Вертолет';
    var lightTank = 'БТР';
    var howitzer = 'Гаубица';
    var tank = 'Танк';
    var fighter = 'Изтребитель';
    var bomber = 'Бомбардировщик';
  */

    
    
    var army_types = ['truck','medic','militiamen','swat','gun','hammerCar','lightTank','helicopter' ,'howitzer','tank','fighter','bomber'];
    var army_count = [0,0,0,0,0,0,0,0,0,0,0,0];

display_march_options();

function display_march_options()
{

    
    send_march_data = '<table border="1">';
    send_march_data = send_march_data + '<tr><td>x</td><td>y</td></tr>';
    send_march_data = send_march_data + '<tr><td><input type="text" size="3" id="xsend" value=0></td><td><input type="text" size="3" id="ysend" value=0></td></tr>';
    send_march_data = send_march_data + '<tr><td>name</td><td>quntity</td></tr>';
    for(var i=0;i<army_types.length;i++)
        {
         
           send_march_data = send_march_data + '<tr><td>'+army_types[i]+'</td><td><input type="text" size=4 name="'+army_types[i]+'_count" id="'+army_types[i]+'_count" value=0></td></tr>';
           
        }
    send_march_data = send_march_data + '</table>';
    send_march_div = add_new_div('send_march_div','Main_Div',send_march_data);
    send_army_button_div = add_new_div('send_army_button','Main_Div','<input type="button" name="send_army_button" id="send_army_button" value="Send">');
    var send_army_button = document.getElementById("send_army_button");
    send_army_button.addEventListener('click',function(){send_march()},true);
}  

function send_march()
{
   
    var xsend = document.getElementById('xsend').value;
    var ysend = document.getElementById('ysend').value;
     var army_send_text = 'x='+xsend+'&y='+ysend+'&action=attack&knight=1';
    for(var i=0;i<army_types.length;i++)
        {
           
         var elem = document.getElementById(army_types[i]+'_count');
         army_count[i] = elem.value;
         // alert(elem.value);
         army_send_text = army_send_text+'&'+army_types[i]+'='+army_count[i];
        }
    army_send_text = army_send_text+'&'+userhash;
    //x=46&howitzer=0&y=744&bomber=71969&lightTank=0&%5FUID%5F=vasssad%40yahoo%2Ecom%2ELNzLuztbkUCuMouNSkQwZIAqqCanNekg&militiamen=0&swat=0&knight=1&helicopter=1247&tank=0&fighter=12795&hammerCar=0&version=2&action=attack&truck=0&gun=0
    //alert(army_send_text);
    
      GM_xmlhttpRequest({ 
  method: "POST",
  url: "http://voina.ru/api/march",
  data: army_send_text,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" ,
     "Host": "voina.ru",
                "Accept-language":"en-US,en;q=0.5" ,
               "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0",
               "Accept": "text/html,application/xhtml+xml,application/xml;q=0.8",
               "Accept-Language": "en-US,en;q=0.5",
               "Referer": "http://voina.ru/flash/loader.swf",
           //    "Cookie": "__utma=54854828.759302663.1358540220.1358875644.1358883245.7; __utmz=54854828.1358540220.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmc=54854828; _UID_=vasssad@yahoo.com.PChAuOMCxeOrjmGGshwDGIBsCbMIzvfV",
               "Connection": "keep-alive"
  },
  onload: function(response) {
}
         });
    
}  

function speedup_march(id)
{
    GM_xmlhttpRequest({ 
  method: "POST",
  url: "http://voina.ru/api/speedup",
  data: 'version=2&type=march'+userhash+''+id,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" ,
     "Host": "voina.ru",
                "Accept-language":"en-US,en;q=0.5" ,
               "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0",
               "Accept": "text/html,application/xhtml+xml,application/xml;q=0.8",
               "Accept-Language": "en-US,en;q=0.5",
               "Referer": "http://voina.ru/flash/loader.swf",
           //    "Cookie": "__utma=54854828.759302663.1358540220.1358875644.1358883245.7; __utmz=54854828.1358540220.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmc=54854828; _UID_=vasssad@yahoo.com.PChAuOMCxeOrjmGGshwDGIBsCbMIzvfV",
               "Connection": "keep-alive"
  },
  onload: function(response) {
}
         });
         
}
  
function speedup_buildings(user_hash)
{
  GM_xmlhttpRequest({ 
  method: "POST",
  url: "http://voina.ru/api/speedup",
  data: 'version=2&type=construct'+user_hash,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" ,
     "Host": "voina.ru",
                "Accept-language":"en-US,en;q=0.5" ,
               "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0",
               "Accept": "text/html,application/xhtml+xml,application/xml;q=0.8",
               "Accept-Language": "en-US,en;q=0.5",
               "Referer": "http://voina.ru/flash/loader.swf",
           //    "Cookie": "__utma=54854828.759302663.1358540220.1358875644.1358883245.7; __utmz=54854828.1358540220.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmc=54854828; _UID_=vasssad@yahoo.com.PChAuOMCxeOrjmGGshwDGIBsCbMIzvfV",
               "Connection": "keep-alive"
  },
  onload: function(response) {
}
         });
         
}

function speedup_science(user_hash)
{
  GM_xmlhttpRequest({ 
  method: "POST",
  url: "http://voina.ru/api/speedup",
  data: 'version=2&type=research'+user_hash,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" ,
     "Host": "voina.ru",
                "Accept-language":"en-US,en;q=0.5" ,
               "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0",
               "Accept": "text/html,application/xhtml+xml,application/xml;q=0.8",
               "Accept-Language": "en-US,en;q=0.5",
               "Referer": "http://voina.ru/flash/loader.swf",
           //    "Cookie": "__utma=54854828.759302663.1358540220.1358875644.1358883245.7; __utmz=54854828.1358540220.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmc=54854828; _UID_=vasssad@yahoo.com.PChAuOMCxeOrjmGGshwDGIBsCbMIzvfV",
               "Connection": "keep-alive"
  },
  onload: function(response) {
}
         });
         
}

function speedup_army(user_hash)
{
  GM_xmlhttpRequest({ 
  method: "POST",
  url: "http://voina.ru/api/speedup",
  data: 'version=2&type=trainWarriors'+user_hash,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" ,
     "Host": "voina.ru",
                "Accept-language":"en-US,en;q=0.5" ,
               "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0",
               "Accept": "text/html,application/xhtml+xml,application/xml;q=0.8",
               "Accept-Language": "en-US,en;q=0.5",
               "Referer": "http://voina.ru/flash/loader.swf",
           //    "Cookie": "__utma=54854828.759302663.1358540220.1358875644.1358883245.7; __utmz=54854828.1358540220.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmc=54854828; _UID_=vasssad@yahoo.com.PChAuOMCxeOrjmGGshwDGIBsCbMIzvfV",
               "Connection": "keep-alive"
  },
  onload: function(response) {
}
         });
         
}




function add_new_div(newdivname,olddivname,inner_html)
{
     var div = document.getElementById(olddivname);
     var newdiv=document.createElement(newdivname);
    newdiv.id=newdivname;
    
    div.appendChild(newdiv);
    newdiv.innerHTML = inner_html;
    return newdiv;
}


function decodeEntity (str){
	var ta=document.createElement('textarea');
	ta.innerHTML = str; 
	return ta.value;
}

function parseQuotedVars(str){
	var obj = {};
	var pattern = /\s*(.*?)\s*=\s*('|")(.*?)\2/gi;
	var match;
	while ((match = pattern.exec(str)) != null){
		obj[match[1]] = match[3];
	}
	return obj;
}

