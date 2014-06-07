// ==UserScript==
//
// @name Ikariam Build City Info
// @version 1.0
// @namespace ZoferosScripts
// @author Zoferos (http://userscripts.org/users/347289)
// @description Enables click to view info for a build city on the island view
// @icon http://img155.imageshack.us/img155/6799/buildcityicon.png
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// @require http://userscripts.org/scripts/source/104859.user.js
// @include http://*.ikariam.*/*
// @exclude http://support.ikariam.*/*
// @exclude http://board.*.ikariam.*/*
//
// @history 1.0 Initial release
//
// ==/UserScript==

String.prototype.trim=function(str,chars){return ltrim(rtrim(str,chars),chars);}
String.prototype.ltrim=function(str,chars){chars=chars||"\\s";return str.replace(new RegExp("^["+chars+"]+","g"),"");}
String.prototype.rtrim=function(str,chars){chars=chars||"\\s";return str.replace(new RegExp("["+chars+"]+$","g"),"");}
String.prototype.startsWith=function(str){return this.match("^"+str)==str;}
String.prototype.endsWith=function(str){return this.match(str+"$")==str;}
String.prototype.format=function(){var formatted=this,args=arguments;if(args&&typeof args[0]=='object')
args=args[0];for(arg in args){formatted=formatted.replace(new RegExp('\\{'+arg+'\\}','gi'),args[arg]);}
return formatted;}
$.extend({getUrlVars:function(){var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1];}
return vars;},getUrlVar:function(name,def){def=def||'';var urlVars=$.getUrlVars();if(name in urlVars)
return urlVars[name];else
return def;},urlVarExists:function(name){var urlVars=$.getUrlVars();return name in urlVars;}});$.fn.exists=function(){return this.length>0;}
var IBCI={ID:106749,Name:"Ikariam Build City Info",Version:'1.0',Hostname:window.location.hostname,Update:function(){try{ScriptUpdater.check(IBCI.ID,IBCI.Version);}catch(e){}},Run:function(){$('ul#cities > li').each(function(index){var cities_add=0;if($('div',this).eq(0).attr('class')=='buildCityImg')
{var city_link=$('<a/>',{'id':'ibcic_'+cities_add+'_0','href':'#'});city_link.bind('click',function(){unsafeWindow.selectCity(index,0,0);unsafeWindow.selectGroup.activate(this,'cities');});$('div.selectimg',this).after(city_link);$('ul.cityactions',this).remove();}});}}
IBCI.Update();IBCI.Run();