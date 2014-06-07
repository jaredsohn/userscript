/*
 * Rapportive shows you everything about your contacts right inside your inbox.
 *
 * You can immediately see what people look like, where they're based, and what
 * they do. You can establish rapport by mentioning shared interests. You can
 * grow your network by connecting on LinkedIn, Twitter, Facebook and more.
 * And you can record thoughts for later by leaving notes.
 *
 * Imagine relationship management built into your email. For free.
 *
 * IMPORTANT NOTE when installing in Fluid or other single-site browsers:
 * You must add *rapportive.com* and *google.com/accounts* to the list of
 * sites which can be visited without opening a separate browser window.
 * If you don't do this, you won't be able to log in to Rapportive.
 *
 * In Fluid, go to Preferences -> Whitelist -> click the '+' button ->
 * scroll to the bottom of the list of URL patterns -> double-click on
 * the last line and add "*rapportive.com*" (without the quotation marks).
 * Repeat, adding "*google.com/accounts*" (again without quotation marks).
 *
 * See also the instructions at http://rapportive.com/fluid
 *
 * (c) 2010-2011 Rapportive, Inc. All rights reserved.
 */

// ==UserScript==
// @name        Rapportive
// @namespace   http://rapportive.com
// @description Making email a better place
// @version     1.4.0
// @include     http://mail.google.com/mail*
// @include     https://mail.google.com/mail*
// @include     http://mail.google.com/a/*
// @include     https://mail.google.com/a/*
// @include     http://rapportive.com
// @include     https://rapportive.com
// @author      Rapportive -- http://rapportive.com
// ==/UserScript==


(function(){var rapportive_server="https://rapportive.com";var rapportive_launchpad_url="https://rapportive.com/load/launchpad?client=Userscript+rapportive+1.4.0";var server_log_level="info";function stackTrace(e){function chrome(e){var stack=(e.stack+'\n').replace(/^\S[^\(]+?[\n$]/gm,'').replace(/^\s+at\s+/gm,'').replace(/^([^\(]+?)([\n$])/gm,'{anonymous}()@$1$2').replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm,'{anonymous}()@$1').split('\n');stack.pop();return stack;}
function firefox(e){return e.stack.replace(/(?:\n@:0)?\s+$/m,'').replace(/^\(/gm,'{anonymous}(').split('\n');}
function opera10(e){var stack=e.stacktrace;var lines=stack.split('\n'),ANON='{anonymous}',lineRE=/.*line (\d+), column (\d+) in ((<anonymous function\:?\s*(\S+))|([^\(]+)\([^\)]*\))(?: in )?(.*)\s*$/i,i,j,len;for(i=2,j=0,len=lines.length;i<len-2;i++){if(lineRE.test(lines[i])){var location=RegExp.$6+':'+RegExp.$1+':'+RegExp.$2;var fnName=RegExp.$3;fnName=fnName.replace(/<anonymous function\:?\s?(\S+)?>/g,ANON);lines[j++]=fnName+'@'+location;}}
lines.splice(j,lines.length-j);return lines;}
function opera(e){var lines=e.message.split('\n'),ANON='{anonymous}',lineRE=/Line\s+(\d+).*script\s+(http\S+)(?:.*in\s+function\s+(\S+))?/i,i,j,len;for(i=4,j=0,len=lines.length;i<len;i+=2){if(lineRE.test(lines[i])){lines[j++]=(RegExp.$3?RegExp.$3+'()@'+RegExp.$2+RegExp.$1:ANON+'()@'+RegExp.$2+':'+RegExp.$1)+' -- '+lines[i+1].replace(/^\s+/,'');}}
lines.splice(j,lines.length-j);return lines;}
function stringifyArguments(args){var slice=Array.prototype.slice;for(var i=0;i<args.length;++i){var arg=args[i];if(arg===undefined){args[i]='undefined';}else if(arg===null){args[i]='null';}else if(arg.constructor){if(arg.constructor===Array){if(arg.length<3){args[i]='['+stringifyArguments(arg)+']';}else{args[i]='['+stringifyArguments(slice.call(arg,0,1))+'...'+stringifyArguments(slice.call(arg,-1))+']';}}else if(arg.constructor===Object){args[i]='#object';}else if(arg.constructor===Function){args[i]='#function';}else if(arg.constructor===String){args[i]='"'+arg+'"';}}}
return args.join(',');}
function other(curr){var ANON='{anonymous}',fnRE=/function\s*([\w\-$]+)?\s*\(/i,stack=[],fn,args,maxStackSize=10;while(curr&&stack.length<maxStackSize){fn=fnRE.test(curr.toString())?RegExp.$1||ANON:ANON;args=Array.prototype.slice.call(curr['arguments']||[]);stack[stack.length]=fn+'('+stringifyArguments(args)+')';curr=curr.caller;}
return stack;}
if(e['arguments']&&e.stack){return chrome(e);}else if(e.message&&typeof window!=='undefined'&&window.opera){return e.stacktrace?opera10(e):opera(e);}else if(e.stack){return firefox(e);}
return other(e);}
function loggily(category,continuation){return function loggilyInternal(){try{return continuation.apply(this,arguments);}catch(exception){var e=exception;if(!e||typeof e!=='object'){try{throw new Error(e);}catch(e2){e=e2;}}
if(e.loggedByLoggily){throw e;}
var exception_details={};var trace=stackTrace(e);if(trace){exception_details.backtrace=trace.join("\n");}
exception_details.message=(e&&e.message?e.message:""+e);if(typeof rapportive==='object'&&rapportive&&rapportive.clientCodeTimestamp){exception_details.clientCodeTimestamp=rapportive.clientCodeTimestamp;}
rapportiveLogger.error(category,"Rapportive exception: "+e,exception_details);rapportiveLogger.consoleLog("Rapportive exception: "+category+": "+e);if(exception_details.backtrace){rapportiveLogger.consoleLog(exception_details.backtrace);}
try{e.loggedByLoggily=true;}catch(e3){}
throw e;}};}
function RapportiveLogger(server,minLevel,args){var _public={},_protected={};var max_log_history=10000;var bad_params={user_id:1,type:1,timestamp:1,controller:1,action:1,callback:1,category:1,level:1,path:1,format:1};var levels={all:0,debug:10,info:20,warn:30,warning:30,error:40,fatal:100};var callbackCount=(new Date()).getTime();_public.server=server;_public.minLevel=minLevel;function baseUrl(level,category){return _public.server+"/log/"+encodeURIComponent(category)+"/"+encodeURIComponent(level);}
function garbageCollectionCode(callback){return"function "+callback+" () {\n"+"   try {\n"+"       window."+callback+" = undefined;\n"+"       delete window."+callback+";\n"+"   } catch (e) {}\n"+"   var request = document.getElementById('"+callback+"request');\n"+"   if (request) request.parentNode.removeChild(request);\n"+"   var callback = document.getElementById('"+callback+"callback');\n"+"   if (callback) callback.parentNode.removeChild(callback);\n"+"}\n";}
function makeRequest(url,callback){var head=document.getElementsByTagName("head")[0]||document.documentElement;var garbageCollect=document.createElement("script");garbageCollect.id=callback+'callback';garbageCollect.type='text/javascript';garbageCollect.text=garbageCollectionCode(callback);head.insertBefore(garbageCollect,head.firstChild);var request=document.createElement("script");request.id=callback+'request';request.type='text/javascript';request.src=url;head.insertBefore(request,head.firstChild);}
_public.log=function(level,category,message,params){if(message===undefined&&params===undefined){throw new Error("Please specify level, category and message");}
if(levels[level]<levels[_public.minLevel]){return;}
var callback='logger'+callbackCount;callbackCount+=1;var data='message='+encodeURIComponent(message)+'&callback='+callback;if(params){for(var param in params){if(params.hasOwnProperty(param)){if(bad_params[param]){throw new Error("Parameter '"+param+"' is reserved!");}
data+='&'+encodeURIComponent(param)+'='+encodeURIComponent(params[param]);}}}
makeRequest(baseUrl(level,category)+'?'+data,callback);};_public.debug=function(category,message,params){_public.log("debug",category,message,params);};_public.info=function(category,message,params){_public.log("info",category,message,params);};_public.warning=_public.warn=function(category,message,params){_public.log("warning",category,message,params);};_public.error=function(category,message,params){_public.log("error",category,message,params);};_public.fatal=function(category,message,params){_public.log("fatal",category,message,params);};_public.track=function(message,params,probability){if(undefined!==probability){var params_with_probability={probability:probability};for(var param in params){if(params.hasOwnProperty(param)){params_with_probability[param]=params[param];}}
params=params_with_probability;}
_public.log("info","track",message,params);};_public.consoleLog=function(message,server_category,server_level){var use_top_window=!(args&&args.in_iframe);try{if(use_top_window&&window.top&&window.top.console){window.top.console.log(message);}else if(window.console){window.console.log(message);}}catch(e){}
_public.silentLog(message,server_category,server_level);};_public.silentLog=function(message,server_category,server_level){if(args&&args.log_history){while(args.log_history.length>max_log_history){args.log_history.shift();}
args.log_history.push('['+(new Date()).toGMTString()+'] '+message);}
if(server_category){_public.log(server_level||'debug',server_category,message);}};return _public;}
var rapportiveLogger=RapportiveLogger(rapportive_server,server_log_level),fsLog=rapportiveLogger.consoleLog;function delayedConditionalExecute(options){var default_options={poll_delay:200,max_poll_attempts:100,failure_message:"Ran out of delayedConditionalExecute search attempts -- giving up!",condition:function(){throw"No condition supplied to delayedConditionalExecute!";},continuation:function(){},error_continuation:function(){},log_level_on_failure:"error",log_level_on_error:null};for(var key in options){if(options.hasOwnProperty(key)){default_options[key]=options[key];}}
options=default_options;if(!options.log_category){throw"delayedConditionalExecute needs a log_category";}
var attempts=0;function log(message,additional_message,category,level){if(typeof(message)==="function"){message=message();}
if(message){fsLog(message+" "+(additional_message||""),category,level);}}
function doAttempt(){if(options.condition()){loggily(options.log_category+".success."+options.continuation.name,options.continuation)();}else{if(attempts<options.max_poll_attempts){attempts+=1;log(options.retry_message);window.setTimeout(loggily(options.log_category+".attempt.subsequent",doAttempt),options.poll_delay);}else{loggily(options.log_category+".error."+options.error_continuation.name,options.error_continuation)();log(options.failure_message,null,options.log_category,options.log_level_on_failure);}}}
loggily(options.log_category+".attempt.first",doAttempt)();}
function fireWhenVisible(options){var attempts=500,poll_delay=20;if(options&&options.max_wait){attempts=(1000/poll_delay)*options.max_wait;}
delayedConditionalExecute({poll_delay:poll_delay,max_poll_attempts:attempts,failure_message:"Failed to find visible item",log_category:options.log_category,condition:function(){return options.condition().is(':visible');},continuation:options.continuation||function(){},error_continuation:options.error_continuation||function(){}});}
function scriptTag(options){var attempt=1,doc=options.document||document,script_url=options.script_url,script_id=options.script_id,loaded_indicator=options.loaded_indicator,log_category=options.log_category||'gmail.loader.initialize';function getAttemptUrl(){return script_url.replace(/(\?[^#]*)?(?=#|$)/,function(query){return(query?query+"&attempt=":"?attempt=")+encodeURIComponent(attempt);});}
function createScriptElement(){var head=doc.getElementsByTagName("head")[0];if(head){var script=doc.getElementById(script_id);if(script){attempt=Number(script.getAttribute('data-rapportive-attempt'))+1;}else{fsLog("Loading "+script_id+"... (attempt "+attempt+")");script=doc.createElement("script");script.type="text/javascript";script.src=getAttemptUrl();script.setAttribute("id",script_id);script.setAttribute("data-rapportive-attempt",attempt);script.addEventListener('error',function(){window.setTimeout(function(){head.removeChild(script);},5000*attempt);},false);head.appendChild(script);attempt+=1;}}}
delayedConditionalExecute({poll_delay:1000,max_poll_attempts:200,failure_message:'Rapportive application injected, but failed to initialize',log_category:log_category,condition:function(){var html=doc.getElementsByTagName('html')[0];if(html&&html.getAttribute(loaded_indicator)==='true'){fsLog(loaded_indicator+' ok');return true;}else{if(attempt<=5){createScriptElement();}
return false;}}});}
function injectRapportive(doc){scriptTag({document:doc,script_url:rapportive_launchpad_url,script_id:'rapportiveLaunchpad',loaded_indicator:'data-rapportive-launchpad'});}
if("mail.google.com"===document.location.host){fsLog('Bootstrapping Rapportive on '+document.location.href);try{injectRapportive(document);}catch(e){fsLog("Exception in userscript extension: "+e,"extension.setup","fatal");}}}());