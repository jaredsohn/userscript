// ==UserScript==
// @name           kakku man's luck chart
// @description    Adds various charts and stats on luck and roll averages.
// @namespace      kdice
// @include        http://kdice.com/*
// @include        http://www.kdice.com/*
// @version        0.10.1
// ==/UserScript==


(function(){var _1=null;if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){var _2="",_3="",_4="",_5={},_6={};_1=_1||djConfig.scopeMap;for(var i=0;i<_1.length;i++){var _7=_1[i];_2+="var "+_7[0]+" = {}; "+_7[1]+" = "+_7[0]+";"+_7[1]+"._scopeName = '"+_7[1]+"';";_3+=(i==0?"":",")+_7[0];_4+=(i==0?"":",")+_7[1];_5[_7[0]]=_7[1];_6[_7[1]]=_7[0];}eval(_2+"dojo._scopeArgs = ["+_4+"];");dojo._scopePrefixArgs=_3;dojo._scopePrefix="(function("+_3+"){";dojo._scopeSuffix="})("+_4+")";dojo._scopeMap=_5;dojo._scopeMapRev=_6;}(function(){if(typeof this["loadFirebugConsole"]=="function"){this["loadFirebugConsole"]();}else{this.console=this.console||{};var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];var i=0,tn;while((tn=cn[i++])){if(!console[tn]){(function(){var _8=tn+"";console[_8]=("log" in console)?function(){var a=Array.apply({},arguments);a.unshift(_8+":");console["log"](a.join(" "));}:function(){};console[_8]._fake=true;})();}}}if(typeof dojo=="undefined"){dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};}var d=dojo;if(typeof dijit=="undefined"){dijit={_scopeName:"dijit"};}if(typeof dojox=="undefined"){dojox={_scopeName:"dojox"};}if(!d._scopeArgs){d._scopeArgs=[dojo,dijit,dojox];}d.global=this;d.config={isDebug:false,debugAtAllCosts:false};if(typeof djConfig!="undefined"){for(var _9 in djConfig){d.config[_9]=djConfig[_9];}}dojo.locale=d.config.locale;var _a="$Rev: 21629 $".match(/\d+/);dojo.version={major:1,minor:4,patch:3,flag:"",revision:_a?+_a[0]:NaN,toString:function(){with(d.version){return major+"."+minor+"."+patch+flag+" ("+revision+")";}}};if(typeof OpenAjax!="undefined"){OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());}var _b,_c,_d={};for(var i in {toString:1}){_b=[];break;}dojo._extraNames=_b=_b||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];_c=_b.length;dojo._mixin=function(_e,_f){var _10,s,i;for(_10 in _f){s=_f[_10];if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){_e[_10]=s;}}if(_c&&_f){for(i=0;i<_c;++i){_10=_b[i];s=_f[_10];if(!(_10 in _e)||(_e[_10]!==s&&(!(_10 in _d)||_d[_10]!==s))){_e[_10]=s;}}}return _e;};dojo.mixin=function(obj,_11){if(!obj){obj={};}for(var i=1,l=arguments.length;i<l;i++){d._mixin(obj,arguments[i]);}return obj;};dojo._getProp=function(_12,_13,_14){var obj=_14||d.global;for(var i=0,p;obj&&(p=_12[i]);i++){if(i==0&&d._scopeMap[p]){p=d._scopeMap[p];}obj=(p in obj?obj[p]:(_13?obj[p]={}:undefined));}return obj;};dojo.setObject=function(_15,_16,_17){var _18=_15.split("."),p=_18.pop(),obj=d._getProp(_18,true,_17);return obj&&p?(obj[p]=_16):undefined;};dojo.getObject=function(_19,_1a,_1b){return d._getProp(_19.split("."),_1a,_1b);};dojo.exists=function(_1c,obj){return !!d.getObject(_1c,false,obj);};dojo["eval"]=function(_1d){return d.global.eval?d.global.eval(_1d):eval(_1d);};d.deprecated=d.experimental=function(){};})();(function(){var d=dojo;d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_1e){var mp=d._modulePrefixes;return !!(mp[_1e]&&mp[_1e].value);},_getModulePrefix:function(_1f){var mp=d._modulePrefixes;if(d._moduleHasPrefix(_1f)){return mp[_1f].value;}return _1f;},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});dojo._loadUriAndCheck=function(uri,_20,cb){var ok=false;try{ok=d._loadUri(uri,cb);}catch(e){console.error("failed loading "+uri+" with error: "+e);}return !!(ok&&d._loadedModules[_20]);};dojo.loaded=function(){d._loadNotifying=true;d._postLoad=true;var mll=d._loaders;d._loaders=[];for(var x=0;x<mll.length;x++){mll[x]();}d._loadNotifying=false;if(d._postLoad&&d._inFlightCount==0&&mll.length){d._callLoaded();}};dojo.unloaded=function(){var mll=d._unloaders;while(mll.length){(mll.pop())();}};d._onto=function(arr,obj,fn){if(!fn){arr.push(obj);}else{if(fn){var _21=(typeof fn=="string")?obj[fn]:fn;arr.push(function(){_21.call(obj);});}}};dojo.ready=dojo.addOnLoad=function(obj,_22){d._onto(d._loaders,obj,_22);if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){d._callLoaded();}};var dca=d.config.addOnLoad;if(dca){d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);}dojo._modulesLoaded=function(){if(d._postLoad){return;}if(d._inFlightCount>0){console.warn("files still in flight!");return;}d._callLoaded();};dojo._callLoaded=function(){if(typeof setTimeout=="object"||(d.config.useXDomain&&d.isOpera)){setTimeout(d.isAIR?function(){d.loaded();}:d._scopeName+".loaded();",0);}else{d.loaded();}};dojo._getModuleSymbols=function(_23){var _24=_23.split(".");for(var i=_24.length;i>0;i--){var _25=_24.slice(0,i).join(".");if(i==1&&!d._moduleHasPrefix(_25)){_24[0]="../"+_24[0];}else{var _26=d._getModulePrefix(_25);if(_26!=_25){_24.splice(0,i,_26);break;}}}return _24;};dojo._global_omit_module_check=false;dojo.loadInit=function(_27){_27();};dojo._loadModule=dojo.require=function(_28,_29){_29=d._global_omit_module_check||_29;var _2a=d._loadedModules[_28];if(_2a){return _2a;}var _2b=d._getModuleSymbols(_28).join("/")+".js";var _2c=!_29?_28:null;var ok=d._loadPath(_2b,_2c);if(!ok&&!_29){throw new Error("Could not load '"+_28+"'; last tried '"+_2b+"'");}if(!_29&&!d._isXDomain){_2a=d._loadedModules[_28];if(!_2a){throw new Error("symbol '"+_28+"' is not defined after loading '"+_2b+"'");}}return _2a;};dojo.provide=function(_2d){_2d=_2d+"";return (d._loadedModules[_2d]=d.getObject(_2d,true));};dojo.platformRequire=function(_2e){var _2f=_2e.common||[];var _30=_2f.concat(_2e[d._name]||_2e["default"]||[]);for(var x=0;x<_30.length;x++){var _31=_30[x];if(_31.constructor==Array){d._loadModule.apply(d,_31);}else{d._loadModule(_31);}}};dojo.requireIf=function(_32,_33){if(_32===true){var _34=[];for(var i=1;i<arguments.length;i++){_34.push(arguments[i]);}d.require.apply(d,_34);}};dojo.requireAfterIf=d.requireIf;dojo.registerModulePath=function(_35,_36){d._modulePrefixes[_35]={name:_35,value:_36};};if(typeof dojo.config["useXDomain"]=="undefined"){dojo.config.useXDomain=true;}dojo.registerModulePath("dojo","http://o.aolcdn.com/dojo/1.4.3/dojo");dojo.registerModulePath("dijit","http://o.aolcdn.com/dojo/1.4.3/dijit");dojo.registerModulePath("dojox","http://o.aolcdn.com/dojo/1.4.3/dojox");dojo.requireLocalization=function(_37,_38,_39,_3a){d.require("dojo.i18n");d.i18n._requireLocalization.apply(d.hostenv,arguments);};var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");dojo._Url=function(){var n=null,_3b=arguments,uri=[_3b[0]];for(var i=1;i<_3b.length;i++){if(!_3b[i]){continue;}var _3c=new d._Url(_3b[i]+""),_3d=new d._Url(uri[0]+"");if(_3c.path==""&&!_3c.scheme&&!_3c.authority&&!_3c.query){if(_3c.fragment!=n){_3d.fragment=_3c.fragment;}_3c=_3d;}else{if(!_3c.scheme){_3c.scheme=_3d.scheme;if(!_3c.authority){_3c.authority=_3d.authority;if(_3c.path.charAt(0)!="/"){var _3e=_3d.path.substring(0,_3d.path.lastIndexOf("/")+1)+_3c.path;var _3f=_3e.split("/");for(var j=0;j<_3f.length;j++){if(_3f[j]=="."){if(j==_3f.length-1){_3f[j]="";}else{_3f.splice(j,1);j--;}}else{if(j>0&&!(j==1&&_3f[0]=="")&&_3f[j]==".."&&_3f[j-1]!=".."){if(j==(_3f.length-1)){_3f.splice(j,1);_3f[j-1]="";}else{_3f.splice(j-1,2);j-=2;}}}}_3c.path=_3f.join("/");}}}}uri=[];if(_3c.scheme){uri.push(_3c.scheme,":");}if(_3c.authority){uri.push("//",_3c.authority);}uri.push(_3c.path);if(_3c.query){uri.push("?",_3c.query);}if(_3c.fragment){uri.push("#",_3c.fragment);}}this.uri=uri.join("");var r=this.uri.match(ore);this.scheme=r[2]||(r[1]?"":n);this.authority=r[4]||(r[3]?"":n);this.path=r[5];this.query=r[7]||(r[6]?"":n);this.fragment=r[9]||(r[8]?"":n);if(this.authority!=n){r=this.authority.match(ire);this.user=r[3]||n;this.password=r[4]||n;this.host=r[6]||r[7];this.port=r[9]||n;}};dojo._Url.prototype.toString=function(){return this.uri;};dojo.moduleUrl=function(_40,url){var loc=d._getModuleSymbols(_40).join("/");if(!loc){return null;}if(loc.lastIndexOf("/")!=loc.length-1){loc+="/";}var _41=loc.indexOf(":");if(loc.charAt(0)!="/"&&(_41==-1||_41>loc.indexOf("/"))){loc=d.baseUrl+loc;}return new d._Url(loc,url);};})();dojo.provide("dojo._base._loader.loader_xd");dojo._xdReset=function(){dojo._isXDomain=dojo.config.useXDomain||false;dojo._xdClearInterval();dojo._xdInFlight={};dojo._xdOrderedReqs=[];dojo._xdDepMap={};dojo._xdContents=[];dojo._xdDefList=[];};dojo._xdClearInterval=function(){if(dojo._xdTimer){clearInterval(dojo._xdTimer);dojo._xdTimer=0;}};dojo._xdReset();dojo._xdCreateResource=function(_42,_43,_44){var _45=_42.replace(/(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,"");var _46=[];var _47=/dojo.(require|requireIf|provide|requireAfterIf|platformRequire|requireLocalization)\s*\(([\w\W]*?)\)/mg;var _48;while((_48=_47.exec(_45))!=null){if(_48[1]=="requireLocalization"){eval(_48[0]);}else{_46.push("\""+_48[1]+"\", "+_48[2]);}}var _49=[];_49.push(dojo._scopeName+"._xdResourceLoaded(function("+dojo._scopePrefixArgs+"){\n");var _4a=dojo._xdExtractLoadInits(_42);if(_4a){_42=_4a[0];for(var i=1;i<_4a.length;i++){_49.push(_4a[i]+";\n");}}_49.push("return {");if(_46.length>0){_49.push("depends: [");for(i=0;i<_46.length;i++){if(i>0){_49.push(",\n");}_49.push("["+_46[i]+"]");}_49.push("],");}_49.push("\ndefineResource: function("+dojo._scopePrefixArgs+"){");if(!dojo.config["debugAtAllCosts"]||_43=="dojo._base._loader.loader_debug"){_49.push(_42);}_49.push("\n}, resourceName: '"+_43+"', resourcePath: '"+_44+"'};});");return _49.join("");};dojo._xdExtractLoadInits=function(_4b){var _4c=/dojo.loadInit\s*\(/g;_4c.lastIndex=0;var _4d=/[\(\)]/g;_4d.lastIndex=0;var _4e=[];var _4f;while((_4f=_4c.exec(_4b))){_4d.lastIndex=_4c.lastIndex;var _50=1;var _51;while((_51=_4d.exec(_4b))){if(_51[0]==")"){_50-=1;}else{_50+=1;}if(_50==0){break;}}if(_50!=0){throw "unmatched paren around character "+_4d.lastIndex+" in: "+_4b;}var _52=_4c.lastIndex-_4f[0].length;_4e.push(_4b.substring(_52,_4d.lastIndex));var _53=_4d.lastIndex-_52;_4b=_4b.substring(0,_52)+_4b.substring(_4d.lastIndex,_4b.length);_4c.lastIndex=_4d.lastIndex-_53;_4c.lastIndex=_4d.lastIndex;}if(_4e.length>0){_4e.unshift(_4b);}return (_4e.length?_4e:null);};dojo._xdIsXDomainPath=function(_54){var _55=_54.indexOf(":");var _56=_54.indexOf("/");if(_55>0&&_55<_56){return true;}else{var url=dojo.baseUrl;_55=url.indexOf(":");_56=url.indexOf("/");if(_55>0&&_55<_56&&(!location.host||url.indexOf("http://"+location.host)!=0)){return true;}}return false;};dojo._loadPath=function(_57,_58,cb){var _59=dojo._xdIsXDomainPath(_57);dojo._isXDomain|=_59;var uri=((_57.charAt(0)=="/"||_57.match(/^\w+:/))?"":dojo.baseUrl)+_57;try{return ((!_58||dojo._isXDomain)?dojo._loadUri(uri,cb,_59,_58):dojo._loadUriAndCheck(uri,_58,cb));}catch(e){console.error(e);return false;}};dojo._xdCharSet="utf-8";dojo._loadUri=function(uri,cb,_5a,_5b){if(dojo._loadedUrls[uri]){return 1;}if(dojo._isXDomain&&_5b&&_5b!="dojo.i18n"){dojo._xdOrderedReqs.push(_5b);if(_5a||uri.indexOf("/nls/")==-1){dojo._xdInFlight[_5b]=true;dojo._inFlightCount++;}if(!dojo._xdTimer){if(dojo.isAIR){dojo._xdTimer=setInterval(function(){dojo._xdWatchInFlight();},100);}else{dojo._xdTimer=setInterval(dojo._scopeName+"._xdWatchInFlight();",100);}}dojo._xdStartTime=(new Date()).getTime();}if(_5a){var _5c=uri.lastIndexOf(".");if(_5c<=0){_5c=uri.length-1;}var _5d=uri.substring(0,_5c)+".xd";if(_5c!=uri.length-1){_5d+=uri.substring(_5c,uri.length);}if(dojo.isAIR){_5d=_5d.replace("app:/","/");}var _5e=document.createElement("script");_5e.type="text/javascript";if(dojo._xdCharSet){_5e.charset=dojo._xdCharSet;}_5e.src=_5d;if(!dojo.headElement){dojo._headElement=document.getElementsByTagName("head")[0];if(!dojo._headElement){dojo._headElement=document.getElementsByTagName("html")[0];}}dojo._headElement.appendChild(_5e);}else{var _5f=dojo._getText(uri,null,true);if(_5f==null){return 0;}if(dojo._isXDomain&&uri.indexOf("/nls/")==-1&&_5b!="dojo.i18n"){var res=dojo._xdCreateResource(_5f,_5b,uri);dojo.eval(res);}else{if(cb){_5f="("+_5f+")";}else{_5f=dojo._scopePrefix+_5f+dojo._scopeSuffix;}var _60=dojo["eval"](_5f+"\r\n//@ sourceURL="+uri);if(cb){cb(_60);}}}dojo._loadedUrls[uri]=true;dojo._loadedUrls.push(uri);return true;};dojo._xdResourceLoaded=function(res){res=res.apply(dojo.global,dojo._scopeArgs);var _61=res.depends;var _62=null;var _63=null;var _64=[];if(_61&&_61.length>0){var dep=null;var _65=0;var _66=false;for(var i=0;i<_61.length;i++){dep=_61[i];if(dep[0]=="provide"){_64.push(dep[1]);}else{if(!_62){_62=[];}if(!_63){_63=[];}var _67=dojo._xdUnpackDependency(dep);if(_67.requires){_62=_62.concat(_67.requires);}if(_67.requiresAfter){_63=_63.concat(_67.requiresAfter);}}var _68=dep[0];var _69=_68.split(".");if(_69.length==2){dojo[_69[0]][_69[1]].apply(dojo[_69[0]],dep.slice(1));}else{dojo[_68].apply(dojo,dep.slice(1));}}if(_64.length==1&&_64[0]=="dojo._base._loader.loader_debug"){res.defineResource(dojo);}else{var _6a=dojo._xdContents.push({content:res.defineResource,resourceName:res["resourceName"],resourcePath:res["resourcePath"],isDefined:false})-1;for(i=0;i<_64.length;i++){dojo._xdDepMap[_64[i]]={requires:_62,requiresAfter:_63,contentIndex:_6a};}}for(i=0;i<_64.length;i++){dojo._xdInFlight[_64[i]]=false;}}};dojo._xdLoadFlattenedBundle=function(_6b,_6c,_6d,_6e){_6d=_6d||"root";var _6f=dojo.i18n.normalizeLocale(_6d).replace("-","_");var _70=[_6b,"nls",_6c].join(".");var _71=dojo["provide"](_70);_71[_6f]=_6e;var _72=[_6b,_6f,_6c].join(".");var _73=dojo._xdBundleMap[_72];if(_73){for(var _74 in _73){_71[_74]=_6e;}}};dojo._xdInitExtraLocales=function(){var _75=dojo.config.extraLocale;if(_75){if(!_75 instanceof Array){_75=[_75];}dojo._xdReqLoc=dojo.xdRequireLocalization;dojo.xdRequireLocalization=function(m,b,_76,_77){dojo._xdReqLoc(m,b,_76,_77);if(_76){return;}for(var i=0;i<_75.length;i++){dojo._xdReqLoc(m,b,_75[i],_77);}};}};dojo._xdBundleMap={};dojo.xdRequireLocalization=function(_78,_79,_7a,_7b){if(dojo._xdInitExtraLocales){dojo._xdInitExtraLocales();dojo._xdInitExtraLocales=null;dojo.xdRequireLocalization.apply(dojo,arguments);return;}var _7c=_7b.split(",");var _7d=dojo.i18n.normalizeLocale(_7a);var _7e="";for(var i=0;i<_7c.length;i++){if(_7d.indexOf(_7c[i])==0){if(_7c[i].length>_7e.length){_7e=_7c[i];}}}var _7f=_7e.replace("-","_");var _80=dojo.getObject([_78,"nls",_79].join("."));if(!_80||!_80[_7f]){var _81=[_78,(_7f||"root"),_79].join(".");var _82=dojo._xdBundleMap[_81];if(!_82){_82=dojo._xdBundleMap[_81]={};}_82[_7d.replace("-","_")]=true;dojo.require(_78+".nls"+(_7e?"."+_7e:"")+"."+_79);}};dojo._xdRealRequireLocalization=dojo.requireLocalization;dojo.requireLocalization=function(_83,_84,_85,_86){var _87=dojo.moduleUrl(_83).toString();if(dojo._xdIsXDomainPath(_87)){return dojo.xdRequireLocalization.apply(dojo,arguments);}else{return dojo._xdRealRequireLocalization.apply(dojo,arguments);}};dojo._xdUnpackDependency=function(dep){var _88=null;var _89=null;switch(dep[0]){case "requireIf":case "requireAfterIf":if(dep[1]===true){_88=[{name:dep[2],content:null}];}break;case "platformRequire":var _8a=dep[1];var _8b=_8a["common"]||[];_88=(_8a[dojo.hostenv.name_])?_8b.concat(_8a[dojo.hostenv.name_]||[]):_8b.concat(_8a["default"]||[]);if(_88){for(var i=0;i<_88.length;i++){if(_88[i] instanceof Array){_88[i]={name:_88[i][0],content:null};}else{_88[i]={name:_88[i],content:null};}}}break;case "require":_88=[{name:dep[1],content:null}];break;case "i18n._preloadLocalizations":dojo.i18n._preloadLocalizations.apply(dojo.i18n._preloadLocalizations,dep.slice(1));break;}if(dep[0]=="requireAfterIf"||dep[0]=="requireIf"){_89=_88;_88=null;}return {requires:_88,requiresAfter:_89};};dojo._xdWalkReqs=function(){var _8c=null;var req;for(var i=0;i<dojo._xdOrderedReqs.length;i++){req=dojo._xdOrderedReqs[i];if(dojo._xdDepMap[req]){_8c=[req];_8c[req]=true;dojo._xdEvalReqs(_8c);}}};dojo._xdEvalReqs=function(_8d){while(_8d.length>0){var req=_8d[_8d.length-1];var res=dojo._xdDepMap[req];var i,_8e,_8f;if(res){_8e=res.requires;if(_8e&&_8e.length>0){for(i=0;i<_8e.length;i++){_8f=_8e[i].name;if(_8f&&!_8d[_8f]){_8d.push(_8f);_8d[_8f]=true;dojo._xdEvalReqs(_8d);}}}var _90=dojo._xdContents[res.contentIndex];if(!_90.isDefined){var _91=_90.content;_91["resourceName"]=_90["resourceName"];_91["resourcePath"]=_90["resourcePath"];dojo._xdDefList.push(_91);_90.isDefined=true;}dojo._xdDepMap[req]=null;_8e=res.requiresAfter;if(_8e&&_8e.length>0){for(i=0;i<_8e.length;i++){_8f=_8e[i].name;if(_8f&&!_8d[_8f]){_8d.push(_8f);_8d[_8f]=true;dojo._xdEvalReqs(_8d);}}}}_8d.pop();}};dojo._xdWatchInFlight=function(){var _92="";var _93=(dojo.config.xdWaitSeconds||15)*1000;var _94=(dojo._xdStartTime+_93)<(new Date()).getTime();for(var _95 in dojo._xdInFlight){if(dojo._xdInFlight[_95]===true){if(_94){_92+=_95+" ";}else{return;}}}dojo._xdClearInterval();if(_94){throw "Could not load cross-domain resources: "+_92;}dojo._xdWalkReqs();var _96=dojo._xdDefList.length;for(var i=0;i<_96;i++){var _97=dojo._xdDefList[i];if(dojo.config["debugAtAllCosts"]&&_97["resourceName"]){if(!dojo["_xdDebugQueue"]){dojo._xdDebugQueue=[];}dojo._xdDebugQueue.push({resourceName:_97.resourceName,resourcePath:_97.resourcePath});}else{_97.apply(dojo.global,dojo._scopeArgs);}}for(i=0;i<dojo._xdContents.length;i++){var _98=dojo._xdContents[i];if(_98.content&&!_98.isDefined){_98.content.apply(dojo.global,dojo._scopeArgs);}}dojo._xdReset();if(dojo["_xdDebugQueue"]&&dojo._xdDebugQueue.length>0){dojo._xdDebugFileLoaded();}else{dojo._xdNotifyLoaded();}};dojo._xdNotifyLoaded=function(){for(var _99 in dojo._xdInFlight){if(typeof dojo._xdInFlight[_99]=="boolean"){return;}}dojo._inFlightCount=0;if(dojo._initFired&&!dojo._loadNotifying){dojo._callLoaded();}};if(typeof window!="undefined"){dojo.isBrowser=true;dojo._name="browser";(function(){var d=dojo;if(document&&document.getElementsByTagName){var _9a=document.getElementsByTagName("script");var _9b=/dojo(\.xd)?\.js(\W|$)/i;for(var i=0;i<_9a.length;i++){var src=_9a[i].getAttribute("src");if(!src){continue;}var m=src.match(_9b);if(m){if(!d.config.baseUrl){d.config.baseUrl=src.substring(0,m.index);}var cfg=_9a[i].getAttribute("djConfig");if(cfg){var _9c=eval("({ "+cfg+" })");for(var x in _9c){dojo.config[x]=_9c[x];}}break;}}}d.baseUrl=d.config.baseUrl;var n=navigator;var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);if(dua.indexOf("Opera")>=0){d.isOpera=tv;}if(dua.indexOf("AdobeAIR")>=0){d.isAIR=1;}d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;d.isMac=dav.indexOf("Macintosh")>=0;var _9d=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);if(_9d&&!dojo.isChrome){d.isSafari=parseFloat(dav.split("Version/")[1]);if(!d.isSafari||parseFloat(dav.substr(_9d+7))<=419.3){d.isSafari=2;}}if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){d.isMozilla=d.isMoz=tv;}if(d.isMoz){d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined;}if(document.all&&!d.isOpera){d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;var _9e=document.documentMode;if(_9e&&_9e!=5&&Math.floor(d.isIE)!=_9e){d.isIE=_9e;}}if(dojo.isIE&&window.location.protocol==="file:"){dojo.config.ieForceActiveXXhr=true;}d.isQuirks=document.compatMode=="BackCompat";d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];d._xhrObj=function(){var _9f,_a0;if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){try{_9f=new XMLHttpRequest();}catch(e){}}if(!_9f){for(var i=0;i<3;++i){var _a1=d._XMLHTTP_PROGIDS[i];try{_9f=new ActiveXObject(_a1);}catch(e){_a0=e;}if(_9f){d._XMLHTTP_PROGIDS=[_a1];break;}}}if(!_9f){throw new Error("XMLHTTP not available: "+_a0);}return _9f;};d._isDocumentOk=function(_a2){var _a3=_a2.status||0,lp=location.protocol;return (_a3>=200&&_a3<300)||_a3==304||_a3==1223||(!_a3&&(lp=="file:"||lp=="chrome:"||lp=="app:"));};var _a4=window.location+"";var _a5=document.getElementsByTagName("base");var _a6=(_a5&&_a5.length>0);d._getText=function(uri,_a7){var _a8=d._xhrObj();if(!_a6&&dojo._Url){uri=(new dojo._Url(_a4,uri)).toString();}if(d.config.cacheBust){uri+="";uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");}_a8.open("GET",uri,false);try{_a8.send(null);if(!d._isDocumentOk(_a8)){var err=Error("Unable to load "+uri+" status:"+_a8.status);err.status=_a8.status;err.responseText=_a8.responseText;throw err;}}catch(e){if(_a7){return null;}throw e;}return _a8.responseText;};var _a9=window;var _aa=function(_ab,fp){var _ac=_a9.attachEvent||_a9.addEventListener;_ab=_a9.attachEvent?_ab:_ab.substring(2);_ac(_ab,function(){fp.apply(_a9,arguments);},false);};d._windowUnloaders=[];d.windowUnloaded=function(){var mll=d._windowUnloaders;while(mll.length){(mll.pop())();}};var _ad=0;d.addOnWindowUnload=function(obj,_ae){d._onto(d._windowUnloaders,obj,_ae);if(!_ad){_ad=1;_aa("onunload",d.windowUnloaded);}};var _af=0;d.addOnUnload=function(obj,_b0){d._onto(d._unloaders,obj,_b0);if(!_af){_af=1;_aa("onbeforeunload",dojo.unloaded);}};})();dojo._initFired=false;dojo._loadInit=function(e){if(!dojo._initFired){dojo._initFired=true;if(!dojo.config.afterOnLoad&&window.detachEvent){window.detachEvent("onload",dojo._loadInit);}if(dojo._inFlightCount==0){dojo._modulesLoaded();}}};if(!dojo.config.afterOnLoad){if(document.addEventListener){document.addEventListener("DOMContentLoaded",dojo._loadInit,false);window.addEventListener("load",dojo._loadInit,false);}else{if(window.attachEvent){window.attachEvent("onload",dojo._loadInit);}}}if(dojo.isIE){if(!dojo.config.afterOnLoad&&!dojo.config.skipIeDomLoaded){document.write("<scr"+"ipt defer src=\"//:\" "+"onreadystatechange=\"if(this.readyState=='complete'){"+dojo._scopeName+"._loadInit();}\">"+"</scr"+"ipt>");}try{document.namespaces.add("v","urn:schemas-microsoft-com:vml");var _b1=["*","group","roundrect","oval","shape","rect","imagedata"],i=0,l=1,s=document.createStyleSheet();if(dojo.isIE>=8){i=1;l=_b1.length;}for(;i<l;++i){s.addRule("v\\:"+_b1[i],"behavior:url(#default#VML); display:inline-block");}}catch(e){}}}(function(){var mp=dojo.config["modulePaths"];if(mp){for(var _b2 in mp){dojo.registerModulePath(_b2,mp[_b2]);}}})();if(dojo.config.isDebug){dojo.require("dojo._firebug.firebug");}if(dojo.config.debugAtAllCosts){dojo.config.useXDomain=true;dojo.require("dojo._base._loader.loader_xd");dojo.require("dojo._base._loader.loader_debug");}if(!dojo._hasResource["dojo._base.lang"]){dojo._hasResource["dojo._base.lang"]=true;dojo.provide("dojo._base.lang");(function(){var d=dojo,_b3=Object.prototype.toString;dojo.isString=function(it){return (typeof it=="string"||it instanceof String);};dojo.isArray=function(it){return it&&(it instanceof Array||typeof it=="array");};dojo.isFunction=function(it){return _b3.call(it)==="[object Function]";};dojo.isObject=function(it){return it!==undefined&&(it===null||typeof it=="object"||d.isArray(it)||d.isFunction(it));};dojo.isArrayLike=function(it){return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));};dojo.isAlien=function(it){return it&&!d.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));};dojo.extend=function(_b4,_b5){for(var i=1,l=arguments.length;i<l;i++){d._mixin(_b4.prototype,arguments[i]);}return _b4;};dojo._hitchArgs=function(_b6,_b7){var pre=d._toArray(arguments,2);var _b8=d.isString(_b7);return function(){var _b9=d._toArray(arguments);var f=_b8?(_b6||d.global)[_b7]:_b7;return f&&f.apply(_b6||this,pre.concat(_b9));};};dojo.hitch=function(_ba,_bb){if(arguments.length>2){return d._hitchArgs.apply(d,arguments);}if(!_bb){_bb=_ba;_ba=null;}if(d.isString(_bb)){_ba=_ba||d.global;if(!_ba[_bb]){throw (["dojo.hitch: scope[\"",_bb,"\"] is null (scope=\"",_ba,"\")"].join(""));}return function(){return _ba[_bb].apply(_ba,arguments||[]);};}return !_ba?_bb:function(){return _bb.apply(_ba,arguments||[]);};};dojo.delegate=dojo._delegate=(function(){function TMP(){};return function(obj,_bc){TMP.prototype=obj;var tmp=new TMP();TMP.prototype=null;if(_bc){d._mixin(tmp,_bc);}return tmp;};})();var _bd=function(obj,_be,_bf){return (_bf||[]).concat(Array.prototype.slice.call(obj,_be||0));};var _c0=function(obj,_c1,_c2){var arr=_c2||[];for(var x=_c1||0;x<obj.length;x++){arr.push(obj[x]);}return arr;};dojo._toArray=d.isIE?function(obj){return ((obj.item)?_c0:_bd).apply(this,arguments);}:_bd;dojo.partial=function(_c3){var arr=[null];return d.hitch.apply(d,arr.concat(d._toArray(arguments)));};var _c4=d._extraNames,_c5=_c4.length,_c6={};dojo.clone=function(o){if(!o||typeof o!="object"||d.isFunction(o)){return o;}if(o.nodeType&&"cloneNode" in o){return o.cloneNode(true);}if(o instanceof Date){return new Date(o.getTime());}var r,i,l,s,_c7;if(d.isArray(o)){r=[];for(i=0,l=o.length;i<l;++i){if(i in o){r.push(d.clone(o[i]));}}}else{r=o.constructor?new o.constructor():{};}for(_c7 in o){s=o[_c7];if(!(_c7 in r)||(r[_c7]!==s&&(!(_c7 in _c6)||_c6[_c7]!==s))){r[_c7]=d.clone(s);}}if(_c5){for(i=0;i<_c5;++i){_c7=_c4[i];s=o[_c7];if(!(_c7 in r)||(r[_c7]!==s&&(!(_c7 in _c6)||_c6[_c7]!==s))){r[_c7]=s;}}}return r;};dojo.trim=String.prototype.trim?function(str){return str.trim();}:function(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");};var _c8=/\{([^\}]+)\}/g;dojo.replace=function(_c9,map,_ca){return _c9.replace(_ca||_c8,d.isFunction(map)?map:function(_cb,k){return d.getObject(k,false,map);});};})();}if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;dojo.provide("dojo._base.array");(function(){var _cc=function(arr,obj,cb){return [(typeof arr=="string")?arr.split(""):arr,obj||dojo.global,(typeof cb=="string")?new Function("item","index","array",cb):cb];};var _cd=function(_ce,arr,_cf,_d0){var _d1=_cc(arr,_d0,_cf);arr=_d1[0];for(var i=0,l=arr.length;i<l;++i){var _d2=!!_d1[2].call(_d1[1],arr[i],i,arr);if(_ce^_d2){return _d2;}}return _ce;};dojo.mixin(dojo,{indexOf:function(_d3,_d4,_d5,_d6){var _d7=1,end=_d3.length||0,i=0;if(_d6){i=end-1;_d7=end=-1;}if(_d5!=undefined){i=_d5;}if((_d6&&i>end)||i<end){for(;i!=end;i+=_d7){if(_d3[i]==_d4){return i;}}}return -1;},lastIndexOf:function(_d8,_d9,_da){return dojo.indexOf(_d8,_d9,_da,true);},forEach:function(arr,_db,_dc){if(!arr||!arr.length){return;}var _dd=_cc(arr,_dc,_db);arr=_dd[0];for(var i=0,l=arr.length;i<l;++i){_dd[2].call(_dd[1],arr[i],i,arr);}},every:function(arr,_de,_df){return _cd(true,arr,_de,_df);},some:function(arr,_e0,_e1){return _cd(false,arr,_e0,_e1);},map:function(arr,_e2,_e3){var _e4=_cc(arr,_e3,_e2);arr=_e4[0];var _e5=(arguments[3]?(new arguments[3]()):[]);for(var i=0,l=arr.length;i<l;++i){_e5.push(_e4[2].call(_e4[1],arr[i],i,arr));}return _e5;},filter:function(arr,_e6,_e7){var _e8=_cc(arr,_e7,_e6);arr=_e8[0];var _e9=[];for(var i=0,l=arr.length;i<l;++i){if(_e8[2].call(_e8[1],arr[i],i,arr)){_e9.push(arr[i]);}}return _e9;}});})();}if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;dojo.provide("dojo._base.declare");(function(){var d=dojo,mix=d._mixin,op=Object.prototype,_ea=op.toString,_eb=new Function,_ec=0,_ed="constructor";function err(msg){throw new Error("declare: "+msg);};function _ee(_ef){var _f0=[],_f1=[{cls:0,refs:[]}],_f2={},_f3=1,l=_ef.length,i=0,j,lin,_f4,top,_f5,rec,_f6,_f7;for(;i<l;++i){_f4=_ef[i];if(!_f4){err("mixin #"+i+" is null");}lin=_f4._meta?_f4._meta.bases:[_f4];top=0;for(j=lin.length-1;j>=0;--j){_f5=lin[j].prototype;if(!_f5.hasOwnProperty("declaredClass")){_f5.declaredClass="uniqName_"+(_ec++);}_f6=_f5.declaredClass;if(!_f2.hasOwnProperty(_f6)){_f2[_f6]={count:0,refs:[],cls:lin[j]};++_f3;}rec=_f2[_f6];if(top&&top!==rec){rec.refs.push(top);++top.count;}top=rec;}++top.count;_f1[0].refs.push(top);}while(_f1.length){top=_f1.pop();_f0.push(top.cls);--_f3;while(_f7=top.refs,_f7.length==1){top=_f7[0];if(!top||--top.count){top=0;break;}_f0.push(top.cls);--_f3;}if(top){for(i=0,l=_f7.length;i<l;++i){top=_f7[i];if(!--top.count){_f1.push(top);}}}}if(_f3){err("can't build consistent linearization");}_f4=_ef[0];_f0[0]=_f4?_f4._meta&&_f4===_f0[_f0.length-_f4._meta.bases.length]?_f4._meta.bases.length:1:0;return _f0;};function _f8(_f9,a,f){var _fa,_fb,_fc,_fd,_fe,_ff,_100,opf,pos,_101=this._inherited=this._inherited||{};if(typeof _f9=="string"){_fa=_f9;_f9=a;a=f;}f=0;_fd=_f9.callee;_fa=_fa||_fd.nom;if(!_fa){err("can't deduce a name to call inherited()");}_fe=this.constructor._meta;_fc=_fe.bases;pos=_101.p;if(_fa!=_ed){if(_101.c!==_fd){pos=0;_ff=_fc[0];_fe=_ff._meta;if(_fe.hidden[_fa]!==_fd){_fb=_fe.chains;if(_fb&&typeof _fb[_fa]=="string"){err("calling chained method with inherited: "+_fa);}do{_fe=_ff._meta;_100=_ff.prototype;if(_fe&&(_100[_fa]===_fd&&_100.hasOwnProperty(_fa)||_fe.hidden[_fa]===_fd)){break;}}while(_ff=_fc[++pos]);pos=_ff?pos:-1;}}_ff=_fc[++pos];if(_ff){_100=_ff.prototype;if(_ff._meta&&_100.hasOwnProperty(_fa)){f=_100[_fa];}else{opf=op[_fa];do{_100=_ff.prototype;f=_100[_fa];if(f&&(_ff._meta?_100.hasOwnProperty(_fa):f!==opf)){break;}}while(_ff=_fc[++pos]);}}f=_ff&&f||op[_fa];}else{if(_101.c!==_fd){pos=0;_fe=_fc[0]._meta;if(_fe&&_fe.ctor!==_fd){_fb=_fe.chains;if(!_fb||_fb.constructor!=="manual"){err("calling chained constructor with inherited");}while(_ff=_fc[++pos]){_fe=_ff._meta;if(_fe&&_fe.ctor===_fd){break;}}pos=_ff?pos:-1;}}while(_ff=_fc[++pos]){_fe=_ff._meta;f=_fe?_fe.ctor:_ff;if(f){break;}}f=_ff&&f;}_101.c=f;_101.p=pos;if(f){return a===true?f:f.apply(this,a||_f9);}};function _102(name,args){if(typeof name=="string"){return this.inherited(name,args,true);}return this.inherited(name,true);};function _103(cls){var _104=this.constructor._meta.bases;for(var i=0,l=_104.length;i<l;++i){if(_104[i]===cls){return true;}}return this instanceof cls;};function _105(_106,_107){var name,t,i=0,l=d._extraNames.length;for(name in _107){t=_107[name];if((t!==op[name]||!(name in op))&&name!=_ed){if(_ea.call(t)=="[object Function]"){t.nom=name;}_106[name]=t;}}for(;i<l;++i){name=d._extraNames[i];t=_107[name];if((t!==op[name]||!(name in op))&&name!=_ed){if(_ea.call(t)=="[object Function]"){t.nom=name;}_106[name]=t;}}return _106;};function _108(_109){_105(this.prototype,_109);return this;};function _10a(_10b,_10c){return function(){var a=arguments,args=a,a0=a[0],f,i,m,l=_10b.length,_10d;if(_10c&&(a0&&a0.preamble||this.preamble)){_10d=new Array(_10b.length);_10d[0]=a;for(i=0;;){a0=a[0];if(a0){f=a0.preamble;if(f){a=f.apply(this,a)||a;}}f=_10b[i].prototype;f=f.hasOwnProperty("preamble")&&f.preamble;if(f){a=f.apply(this,a)||a;}if(++i==l){break;}_10d[i]=a;}}for(i=l-1;i>=0;--i){f=_10b[i];m=f._meta;f=m?m.ctor:f;if(f){f.apply(this,_10d?_10d[i]:a);}}f=this.postscript;if(f){f.apply(this,args);}};};function _10e(ctor,_10f){return function(){var a=arguments,t=a,a0=a[0],f;if(_10f){if(a0){f=a0.preamble;if(f){t=f.apply(this,t)||t;}}f=this.preamble;if(f){f.apply(this,t);}}if(ctor){ctor.apply(this,a);}f=this.postscript;if(f){f.apply(this,a);}};};function _110(_111){return function(){var a=arguments,i=0,f;for(;f=_111[i];++i){m=f._meta;f=m?m.ctor:f;if(f){f.apply(this,a);break;}}f=this.postscript;if(f){f.apply(this,a);}};};function _112(name,_113,_114){return function(){var b,m,f,i=0,step=1;if(_114){i=_113.length-1;step=-1;}for(;b=_113[i];i+=step){m=b._meta;f=(m?m.hidden:b.prototype)[name];if(f){f.apply(this,arguments);}}};};d.declare=function(_115,_116,_117){var _118,i,t,ctor,name,_119,_11a,_11b=1,_11c=_116;if(typeof _115!="string"){_117=_116;_116=_115;_115="";}_117=_117||{};if(_ea.call(_116)=="[object Array]"){_119=_ee(_116);t=_119[0];_11b=_119.length-t;_116=_119[_11b];}else{_119=[0];if(_116){t=_116._meta;_119=_119.concat(t?t.bases:_116);}}if(_116){for(i=_11b-1;;--i){_eb.prototype=_116.prototype;_118=new _eb;if(!i){break;}t=_119[i];mix(_118,t._meta?t._meta.hidden:t.prototype);ctor=new Function;ctor.superclass=_116;ctor.prototype=_118;_116=_118.constructor=ctor;}}else{_118={};}_105(_118,_117);t=_117.constructor;if(t!==op.constructor){t.nom=_ed;_118.constructor=t;}_eb.prototype=0;for(i=_11b-1;i;--i){t=_119[i]._meta;if(t&&t.chains){_11a=mix(_11a||{},t.chains);}}if(_118["-chains-"]){_11a=mix(_11a||{},_118["-chains-"]);}t=!_11a||!_11a.hasOwnProperty(_ed);_119[0]=ctor=(_11a&&_11a.constructor==="manual")?_110(_119):(_119.length==1?_10e(_117.constructor,t):_10a(_119,t));ctor._meta={bases:_119,hidden:_117,chains:_11a,parents:_11c,ctor:_117.constructor};ctor.superclass=_116&&_116.prototype;ctor.extend=_108;ctor.prototype=_118;_118.constructor=ctor;_118.getInherited=_102;_118.inherited=_f8;_118.isInstanceOf=_103;if(_115){_118.declaredClass=_115;d.setObject(_115,ctor);}if(_11a){for(name in _11a){if(_118[name]&&typeof _11a[name]=="string"&&name!=_ed){t=_118[name]=_112(name,_119,_11a[name]==="after");t.nom=name;}}}return ctor;};d.safeMixin=_105;})();}if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;dojo.provide("dojo._base.connect");dojo._listener={getDispatcher:function(){return function(){var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;var r=t&&t.apply(this,arguments);var lls;lls=[].concat(ls);for(var i in lls){if(!(i in ap)){lls[i].apply(this,arguments);}}return r;};},add:function(_11d,_11e,_11f){_11d=_11d||dojo.global;var f=_11d[_11e];if(!f||!f._listeners){var d=dojo._listener.getDispatcher();d.target=f;d._listeners=[];f=_11d[_11e]=d;}return f._listeners.push(_11f);},remove:function(_120,_121,_122){var f=(_120||dojo.global)[_121];if(f&&f._listeners&&_122--){delete f._listeners[_122];}}};dojo.connect=function(obj,_123,_124,_125,_126){var a=arguments,args=[],i=0;args.push(dojo.isString(a[0])?null:a[i++],a[i++]);var a1=a[i+1];args.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);for(var l=a.length;i<l;i++){args.push(a[i]);}return dojo._connect.apply(this,args);};dojo._connect=function(obj,_127,_128,_129){var l=dojo._listener,h=l.add(obj,_127,dojo.hitch(_128,_129));return [obj,_127,h,l];};dojo.disconnect=function(_12a){if(_12a&&_12a[0]!==undefined){dojo._disconnect.apply(this,_12a);delete _12a[0];}};dojo._disconnect=function(obj,_12b,_12c,_12d){_12d.remove(obj,_12b,_12c);};dojo._topics={};dojo.subscribe=function(_12e,_12f,_130){return [_12e,dojo._listener.add(dojo._topics,_12e,dojo.hitch(_12f,_130))];};dojo.unsubscribe=function(_131){if(_131){dojo._listener.remove(dojo._topics,_131[0],_131[1]);}};dojo.publish=function(_132,args){var f=dojo._topics[_132];if(f){f.apply(this,args||[]);}};dojo.connectPublisher=function(_133,obj,_134){var pf=function(){dojo.publish(_133,arguments);};return (_134)?dojo.connect(obj,_134,pf):dojo.connect(obj,pf);};}if(!dojo._hasResource["dojo._base.Deferred"]){dojo._hasResource["dojo._base.Deferred"]=true;dojo.provide("dojo._base.Deferred");dojo.Deferred=function(_135){this.chain=[];this.id=this._nextId();this.fired=-1;this.paused=0;this.results=[null,null];this.canceller=_135;this.silentlyCancelled=false;this.isFiring=false;};dojo.extend(dojo.Deferred,{_nextId:(function(){var n=1;return function(){return n++;};})(),cancel:function(){var err;if(this.fired==-1){if(this.canceller){err=this.canceller(this);}else{this.silentlyCancelled=true;}if(this.fired==-1){if(!(err instanceof Error)){var res=err;var msg="Deferred Cancelled";if(err&&err.toString){msg+=": "+err.toString();}err=new Error(msg);err.dojoType="cancel";err.cancelResult=res;}this.errback(err);}}else{if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){this.results[0].cancel();}}},_resback:function(res){this.fired=((res instanceof Error)?1:0);this.results[this.fired]=res;this._fire();},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!");}this.silentlyCancelled=false;return;}},callback:function(res){this._check();this._resback(res);},errback:function(res){this._check();if(!(res instanceof Error)){res=new Error(res);}this._resback(res);},addBoth:function(cb,cbfn){var _136=dojo.hitch.apply(dojo,arguments);return this.addCallbacks(_136,_136);},addCallback:function(cb,cbfn){return this.addCallbacks(dojo.hitch.apply(dojo,arguments));},addErrback:function(cb,cbfn){return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));},addCallbacks:function(cb,eb){this.chain.push([cb,eb]);if(this.fired>=0&&!this.isFiring){this._fire();}return this;},_fire:function(){this.isFiring=true;var _137=this.chain;var _138=this.fired;var res=this.results[_138];var self=this;var cb=null;while((_137.length>0)&&(this.paused==0)){var f=_137.shift()[_138];if(!f){continue;}var func=function(){var ret=f(res);if(typeof ret!="undefined"){res=ret;}_138=((res instanceof Error)?1:0);if(res instanceof dojo.Deferred){cb=function(res){self._resback(res);self.paused--;if((self.paused==0)&&(self.fired>=0)){self._fire();}};this.paused++;}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(err){_138=1;res=err;}}}this.fired=_138;this.results[_138]=res;this.isFiring=false;if((cb)&&(this.paused)){res.addBoth(cb);}}});}if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;dojo.provide("dojo._base.json");dojo.fromJson=function(json){return eval("("+json+")");};dojo._escapeString=function(str){return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");};dojo.toJsonIndentStr="\t";dojo.toJson=function(it,_139,_13a){if(it===undefined){return "undefined";}var _13b=typeof it;if(_13b=="number"||_13b=="boolean"){return it+"";}if(it===null){return "null";}if(dojo.isString(it)){return dojo._escapeString(it);}var _13c=arguments.callee;var _13d;_13a=_13a||"";var _13e=_139?_13a+dojo.toJsonIndentStr:"";var tf=it.__json__||it.json;if(dojo.isFunction(tf)){_13d=tf.call(it);if(it!==_13d){return _13c(_13d,_139,_13e);}}if(it.nodeType&&it.cloneNode){throw new Error("Can't serialize DOM nodes");}var sep=_139?" ":"";var _13f=_139?"\n":"";if(dojo.isArray(it)){var res=dojo.map(it,function(obj){var val=_13c(obj,_139,_13e);if(typeof val!="string"){val="undefined";}return _13f+_13e+val;});return "["+res.join(","+sep)+_13f+_13a+"]";}if(_13b=="function"){return null;}var _140=[],key;for(key in it){var _141,val;if(typeof key=="number"){_141="\""+key+"\"";}else{if(typeof key=="string"){_141=dojo._escapeString(key);}else{continue;}}val=_13c(it[key],_139,_13e);if(typeof val!="string"){continue;}_140.push(_13f+_13e+_141+":"+sep+val);}return "{"+_140.join(","+sep)+_13f+_13a+"}";};}if(!dojo._hasResource["dojo._base.Color"]){dojo._hasResource["dojo._base.Color"]=true;dojo.provide("dojo._base.Color");(function(){var d=dojo;dojo.Color=function(_142){if(_142){this.setColor(_142);}};dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:d.config.transparentColor||[255,255,255]};dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){var t=this;t.r=r;t.g=g;t.b=b;t.a=a;},setColor:function(_143){if(d.isString(_143)){d.colorFromString(_143,this);}else{if(d.isArray(_143)){d.colorFromArray(_143,this);}else{this._set(_143.r,_143.g,_143.b,_143.a);if(!(_143 instanceof d.Color)){this.sanitize();}}}return this;},sanitize:function(){return this;},toRgb:function(){var t=this;return [t.r,t.g,t.b];},toRgba:function(){var t=this;return [t.r,t.g,t.b,t.a];},toHex:function(){var arr=d.map(["r","g","b"],function(x){var s=this[x].toString(16);return s.length<2?"0"+s:s;},this);return "#"+arr.join("");},toCss:function(_144){var t=this,rgb=t.r+", "+t.g+", "+t.b;return (_144?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";},toString:function(){return this.toCss(true);}});dojo.blendColors=function(_145,end,_146,obj){var t=obj||new d.Color();d.forEach(["r","g","b","a"],function(x){t[x]=_145[x]+(end[x]-_145[x])*_146;if(x!="a"){t[x]=Math.round(t[x]);}});return t.sanitize();};dojo.colorFromRgb=function(_147,obj){var m=_147.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);};dojo.colorFromHex=function(_148,obj){var t=obj||new d.Color(),bits=(_148.length==4)?4:8,mask=(1<<bits)-1;_148=Number("0x"+_148.substr(1));if(isNaN(_148)){return null;}d.forEach(["b","g","r"],function(x){var c=_148&mask;_148>>=bits;t[x]=bits==4?17*c:c;});t.a=1;return t;};dojo.colorFromArray=function(a,obj){var t=obj||new d.Color();t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));if(isNaN(t.a)){t.a=1;}return t.sanitize();};dojo.colorFromString=function(str,obj){var a=d.Color.named[str];return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);};})();}if(!dojo._hasResource["dojo._base"]){dojo._hasResource["dojo._base"]=true;dojo.provide("dojo._base");}if(!dojo._hasResource["dojo._base.window"]){dojo._hasResource["dojo._base.window"]=true;dojo.provide("dojo._base.window");dojo.doc=window["document"]||null;dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];};dojo.setContext=function(_149,_14a){dojo.global=_149;dojo.doc=_14a;};dojo.withGlobal=function(_14b,_14c,_14d,_14e){var _14f=dojo.global;try{dojo.global=_14b;return dojo.withDoc.call(null,_14b.document,_14c,_14d,_14e);}finally{dojo.global=_14f;}};dojo.withDoc=function(_150,_151,_152,_153){var _154=dojo.doc,_155=dojo._bodyLtr,oldQ=dojo.isQuirks;try{dojo.doc=_150;delete dojo._bodyLtr;dojo.isQuirks=dojo.doc.compatMode=="BackCompat";if(_152&&typeof _151=="string"){_151=_152[_151];}return _151.apply(_152,_153||[]);}finally{dojo.doc=_154;delete dojo._bodyLtr;if(_155!==undefined){dojo._bodyLtr=_155;}dojo.isQuirks=oldQ;}};}if(!dojo._hasResource["dojo._base.event"]){dojo._hasResource["dojo._base.event"]=true;dojo.provide("dojo._base.event");(function(){var del=(dojo._event_listener={add:function(node,name,fp){if(!node){return;}name=del._normalizeEventName(name);fp=del._fixCallback(name,fp);var _156=name;if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){var ofp=fp;name=(name=="mouseenter")?"mouseover":"mouseout";fp=function(e){if(!dojo.isDescendant(e.relatedTarget,node)){return ofp.call(this,e);}};}node.addEventListener(name,fp,false);return fp;},remove:function(node,_157,_158){if(node){_157=del._normalizeEventName(_157);if(!dojo.isIE&&(_157=="mouseenter"||_157=="mouseleave")){_157=(_157=="mouseenter")?"mouseover":"mouseout";}node.removeEventListener(_157,_158,false);}},_normalizeEventName:function(name){return name.slice(0,2)=="on"?name.slice(2):name;},_fixCallback:function(name,fp){return name!="keypress"?fp:function(e){return fp.call(this,del._fixEvent(e,this));};},_fixEvent:function(evt,_159){switch(evt.type){case "keypress":del._setKeyChar(evt);break;}return evt;},_setKeyChar:function(evt){evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";evt.charOrCode=evt.keyChar||evt.keyCode;},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});dojo.fixEvent=function(evt,_15a){return del._fixEvent(evt,_15a);};dojo.stopEvent=function(evt){evt.preventDefault();evt.stopPropagation();};var _15b=dojo._listener;dojo._connect=function(obj,_15c,_15d,_15e,_15f){var _160=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);var lid=_160?(_15f?2:1):0,l=[dojo._listener,del,_15b][lid];var h=l.add(obj,_15c,dojo.hitch(_15d,_15e));return [obj,_15c,h,lid];};dojo._disconnect=function(obj,_161,_162,_163){([dojo._listener,del,_15b][_163]).remove(obj,_161,_162);};dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:dojo.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:dojo.isMac&&!dojo.isAIR?(dojo.isSafari?91:224):17};var _164=dojo.isMac?"metaKey":"ctrlKey";dojo.isCopyKey=function(e){return e[_164];};if(dojo.isIE){dojo.mouseButtons={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,_165){return e.button&_165;},isLeft:function(e){return e.button&1;},isMiddle:function(e){return e.button&4;},isRight:function(e){return e.button&2;}};}else{dojo.mouseButtons={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,_166){return e.button==_166;},isLeft:function(e){return e.button==0;},isMiddle:function(e){return e.button==1;},isRight:function(e){return e.button==2;}};}if(dojo.isIE){var _167=function(e,code){try{return (e.keyCode=code);}catch(e){return 0;}};var iel=dojo._listener;var _168=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");if(!dojo.config._allow_leaks){_15b=iel=dojo._ie_listener={handlers:[],add:function(_169,_16a,_16b){_169=_169||dojo.global;var f=_169[_16a];if(!f||!f[_168]){var d=dojo._getIeDispatcher();d.target=f&&(ieh.push(f)-1);d[_168]=[];f=_169[_16a]=d;}return f[_168].push(ieh.push(_16b)-1);},remove:function(_16c,_16d,_16e){var f=(_16c||dojo.global)[_16d],l=f&&f[_168];if(f&&l&&_16e--){delete ieh[l[_16e]];delete l[_16e];}}};var ieh=iel.handlers;}dojo.mixin(del,{add:function(node,_16f,fp){if(!node){return;}_16f=del._normalizeEventName(_16f);if(_16f=="onkeypress"){var kd=node.onkeydown;if(!kd||!kd[_168]||!kd._stealthKeydownHandle){var h=del.add(node,"onkeydown",del._stealthKeyDown);kd=node.onkeydown;kd._stealthKeydownHandle=h;kd._stealthKeydownRefs=1;}else{kd._stealthKeydownRefs++;}}return iel.add(node,_16f,del._fixCallback(fp));},remove:function(node,_170,_171){_170=del._normalizeEventName(_170);iel.remove(node,_170,_171);if(_170=="onkeypress"){var kd=node.onkeydown;if(--kd._stealthKeydownRefs<=0){iel.remove(node,"onkeydown",kd._stealthKeydownHandle);delete kd._stealthKeydownHandle;}}},_normalizeEventName:function(_172){return _172.slice(0,2)!="on"?"on"+_172:_172;},_nop:function(){},_fixEvent:function(evt,_173){if(!evt){var w=_173&&(_173.ownerDocument||_173.document||_173).parentWindow||window;evt=w.event;}if(!evt){return (evt);}evt.target=evt.srcElement;evt.currentTarget=(_173||evt.srcElement);evt.layerX=evt.offsetX;evt.layerY=evt.offsetY;var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;var _174=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;var _175=dojo._getIeDocumentElementOffset();evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_174.scrollLeft||0)-_175.x;evt.pageY=evt.clientY+(_174.scrollTop||0)-_175.y;if(evt.type=="mouseover"){evt.relatedTarget=evt.fromElement;}if(evt.type=="mouseout"){evt.relatedTarget=evt.toElement;}evt.stopPropagation=del._stopPropagation;evt.preventDefault=del._preventDefault;return del._fixKeys(evt);},_fixKeys:function(evt){switch(evt.type){case "keypress":var c=("charCode" in evt?evt.charCode:evt.keyCode);if(c==10){c=0;evt.keyCode=13;}else{if(c==13||c==27){c=0;}else{if(c==3){c=99;}}}evt.charCode=c;del._setKeyChar(evt);break;}return evt;},_stealthKeyDown:function(evt){var kp=evt.currentTarget.onkeypress;if(!kp||!kp[_168]){return;}var k=evt.keyCode;var _176=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_176||evt.ctrlKey){var c=_176?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if((!evt.shiftKey)&&(c>=65&&c<=90)){c+=32;}else{c=del._punctMap[c]||c;}}}}var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});kp.call(evt.currentTarget,faux);evt.cancelBubble=faux.cancelBubble;evt.returnValue=faux.returnValue;_167(evt,faux.keyCode);}},_stopPropagation:function(){this.cancelBubble=true;},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;if(this.ctrlKey){_167(this,0);}this.returnValue=false;}});dojo.stopEvent=function(evt){evt=evt||window.event;del._stopPropagation.call(evt);del._preventDefault.call(evt);};}del._synthesizeEvent=function(evt,_177){var faux=dojo.mixin({},evt,_177);del._setKeyChar(faux);faux.preventDefault=function(){evt.preventDefault();};faux.stopPropagation=function(){evt.stopPropagation();};return faux;};if(dojo.isOpera){dojo.mixin(del,{_fixEvent:function(evt,_178){switch(evt.type){case "keypress":var c=evt.which;if(c==3){c=99;}c=c<41&&!evt.shiftKey?0:c;if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){c+=32;}return del._synthesizeEvent(evt,{charCode:c});}return evt;}});}if(dojo.isWebKit){del._add=del.add;del._remove=del.remove;dojo.mixin(del,{add:function(node,_179,fp){if(!node){return;}var _17a=del._add(node,_179,fp);if(del._normalizeEventName(_179)=="keypress"){_17a._stealthKeyDownHandle=del._add(node,"keydown",function(evt){var k=evt.keyCode;var _17b=k!=13&&k!=32&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_17b||evt.ctrlKey){var c=_17b?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if(!evt.shiftKey&&c>=65&&c<=90){c+=32;}else{c=del._punctMap[c]||c;}}}}var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});fp.call(evt.currentTarget,faux);}});}return _17a;},remove:function(node,_17c,_17d){if(node){if(_17d._stealthKeyDownHandle){del._remove(node,"keydown",_17d._stealthKeyDownHandle);}del._remove(node,_17c,_17d);}},_fixEvent:function(evt,_17e){switch(evt.type){case "keypress":if(evt.faux){return evt;}var c=evt.charCode;c=c>=32?c:0;return del._synthesizeEvent(evt,{charCode:c,faux:true});}return evt;}});}})();if(dojo.isIE){dojo._ieDispatcher=function(args,_17f){var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];var r=t&&t.apply(_17f,args);var lls=[].concat(ls);for(var i in lls){var f=h[lls[i]];if(!(i in ap)&&f){f.apply(_17f,args);}}return r;};dojo._getIeDispatcher=function(){return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");};dojo._event_listener._fixCallback=function(fp){var f=dojo._event_listener._fixEvent;return function(e){return fp.call(this,f(e,this));};};}}if(!dojo._hasResource["dojo._base.html"]){dojo._hasResource["dojo._base.html"]=true;dojo.provide("dojo._base.html");try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}if(dojo.isIE||dojo.isOpera){dojo.byId=function(id,doc){if(typeof id!="string"){return id;}var _180=doc||dojo.doc,te=_180.getElementById(id);if(te&&(te.attributes.id.value==id||te.id==id)){return te;}else{var eles=_180.all[id];if(!eles||eles.nodeName){eles=[eles];}var i=0;while((te=eles[i++])){if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){return te;}}}};}else{dojo.byId=function(id,doc){return (typeof id=="string")?(doc||dojo.doc).getElementById(id):id;};}(function(){var d=dojo;var byId=d.byId;var _181=null,_182;d.addOnWindowUnload(function(){_181=null;});dojo._destroyElement=dojo.destroy=function(node){node=byId(node);try{var doc=node.ownerDocument;if(!_181||_182!=doc){_181=doc.createElement("div");_182=doc;}_181.appendChild(node.parentNode?node.parentNode.removeChild(node):node);_181.innerHTML="";}catch(e){}};dojo.isDescendant=function(node,_183){try{node=byId(node);_183=byId(_183);while(node){if(node==_183){return true;}node=node.parentNode;}}catch(e){}return false;};dojo.setSelectable=function(node,_184){node=byId(node);if(d.isMozilla){node.style.MozUserSelect=_184?"":"none";}else{if(d.isKhtml||d.isWebKit){node.style.KhtmlUserSelect=_184?"auto":"none";}else{if(d.isIE){var v=(node.unselectable=_184?"":"on");d.query("*",node).forEach("item.unselectable = '"+v+"'");}}}};var _185=function(node,ref){var _186=ref.parentNode;if(_186){_186.insertBefore(node,ref);}};var _187=function(node,ref){var _188=ref.parentNode;if(_188){if(_188.lastChild==ref){_188.appendChild(node);}else{_188.insertBefore(node,ref.nextSibling);}}};dojo.place=function(node,_189,_18a){_189=byId(_189);if(typeof node=="string"){node=node.charAt(0)=="<"?d._toDom(node,_189.ownerDocument):byId(node);}if(typeof _18a=="number"){var cn=_189.childNodes;if(!cn.length||cn.length<=_18a){_189.appendChild(node);}else{_185(node,cn[_18a<0?0:_18a]);}}else{switch(_18a){case "before":_185(node,_189);break;case "after":_187(node,_189);break;case "replace":_189.parentNode.replaceChild(node,_189);break;case "only":d.empty(_189);_189.appendChild(node);break;case "first":if(_189.firstChild){_185(node,_189.firstChild);break;}default:_189.appendChild(node);}}return node;};dojo.boxModel="content-box";if(d.isIE){d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";}var gcs;if(d.isWebKit){gcs=function(node){var s;if(node.nodeType==1){var dv=node.ownerDocument.defaultView;s=dv.getComputedStyle(node,null);if(!s&&node.style){node.style.display="";s=dv.getComputedStyle(node,null);}}return s||{};};}else{if(d.isIE){gcs=function(node){return node.nodeType==1?node.currentStyle:{};};}else{gcs=function(node){return node.nodeType==1?node.ownerDocument.defaultView.getComputedStyle(node,null):{};};}}dojo.getComputedStyle=gcs;if(!d.isIE){d._toPixelValue=function(_18b,_18c){return parseFloat(_18c)||0;};}else{d._toPixelValue=function(_18d,_18e){if(!_18e){return 0;}if(_18e=="medium"){return 4;}if(_18e.slice&&_18e.slice(-2)=="px"){return parseFloat(_18e);}with(_18d){var _18f=style.left;var _190=runtimeStyle.left;runtimeStyle.left=currentStyle.left;try{style.left=_18e;_18e=style.pixelLeft;}catch(e){_18e=0;}style.left=_18f;runtimeStyle.left=_190;}return _18e;};}var px=d._toPixelValue;var astr="DXImageTransform.Microsoft.Alpha";var af=function(n,f){try{return n.filters.item(astr);}catch(e){return f?{}:null;}};dojo._getOpacity=d.isIE?function(node){try{return af(node).Opacity/100;}catch(e){return 1;}}:function(node){return gcs(node).opacity;};dojo._setOpacity=d.isIE?function(node,_191){var ov=_191*100;node.style.zoom=1;af(node,1).Enabled=!(_191==1);if(!af(node)){node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";}else{af(node,1).Opacity=ov;}if(node.nodeName.toLowerCase()=="tr"){d.query("> td",node).forEach(function(i){d._setOpacity(i,_191);});}return _191;}:function(node,_192){return node.style.opacity=_192;};var _193={left:true,top:true};var _194=/margin|padding|width|height|max|min|offset/;var _195=function(node,type,_196){type=type.toLowerCase();if(d.isIE){if(_196=="auto"){if(type=="height"){return node.offsetHeight;}if(type=="width"){return node.offsetWidth;}}if(type=="fontweight"){switch(_196){case 700:return "bold";case 400:default:return "normal";}}}if(!(type in _193)){_193[type]=_194.test(type);}return _193[type]?px(node,_196):_196;};var _197=d.isIE?"styleFloat":"cssFloat",_198={"cssFloat":_197,"styleFloat":_197,"float":_197};dojo.style=function(node,_199,_19a){var n=byId(node),args=arguments.length,op=(_199=="opacity");_199=_198[_199]||_199;if(args==3){return op?d._setOpacity(n,_19a):n.style[_199]=_19a;}if(args==2&&op){return d._getOpacity(n);}var s=gcs(n);if(args==2&&typeof _199!="string"){for(var x in _199){d.style(node,x,_199[x]);}return s;}return (args==1)?s:_195(n,_199,s[_199]||n.style[_199]);};dojo._getPadExtents=function(n,_19b){var s=_19b||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};};dojo._getBorderExtents=function(n,_19c){var ne="none",s=_19c||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};};dojo._getPadBorderExtents=function(n,_19d){var s=_19d||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};};dojo._getMarginExtents=function(n,_19e){var s=_19e||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);if(d.isWebKit&&(s.position!="absolute")){r=l;}return {l:l,t:t,w:l+r,h:t+b};};dojo._getMarginBox=function(node,_19f){var s=_19f||gcs(node),me=d._getMarginExtents(node,s);var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;if(d.isMoz){var sl=parseFloat(s.left),st=parseFloat(s.top);if(!isNaN(sl)&&!isNaN(st)){l=sl,t=st;}else{if(p&&p.style){var pcs=gcs(p);if(pcs.overflow!="visible"){var be=d._getBorderExtents(p,pcs);l+=be.l,t+=be.t;}}}}else{if(d.isOpera||(d.isIE>7&&!d.isQuirks)){if(p){be=d._getBorderExtents(p);l-=be.l;t-=be.t;}}}return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};};dojo._getContentBox=function(node,_1a0){var s=_1a0||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;if(!w){w=node.offsetWidth,h=node.offsetHeight;}else{h=node.clientHeight,be.w=be.h=0;}if(d.isOpera){pe.l+=be.l;pe.t+=be.t;}return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};};dojo._getBorderBox=function(node,_1a1){var s=_1a1||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};};dojo._setBox=function(node,l,t,w,h,u){u=u||"px";var s=node.style;if(!isNaN(l)){s.left=l+u;}if(!isNaN(t)){s.top=t+u;}if(w>=0){s.width=w+u;}if(h>=0){s.height=h+u;}};dojo._isButtonTag=function(node){return node.tagName=="BUTTON"||node.tagName=="INPUT"&&(node.getAttribute("type")||"").toUpperCase()=="BUTTON";};dojo._usesBorderBox=function(node){var n=node.tagName;return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);};dojo._setContentSize=function(node,_1a2,_1a3,_1a4){if(d._usesBorderBox(node)){var pb=d._getPadBorderExtents(node,_1a4);if(_1a2>=0){_1a2+=pb.w;}if(_1a3>=0){_1a3+=pb.h;}}d._setBox(node,NaN,NaN,_1a2,_1a3);};dojo._setMarginBox=function(node,_1a5,_1a6,_1a7,_1a8,_1a9){var s=_1a9||gcs(node),bb=d._usesBorderBox(node),pb=bb?_1aa:d._getPadBorderExtents(node,s);if(d.isWebKit){if(d._isButtonTag(node)){var ns=node.style;if(_1a7>=0&&!ns.width){ns.width="4px";}if(_1a8>=0&&!ns.height){ns.height="4px";}}}var mb=d._getMarginExtents(node,s);if(_1a7>=0){_1a7=Math.max(_1a7-pb.w-mb.w,0);}if(_1a8>=0){_1a8=Math.max(_1a8-pb.h-mb.h,0);}d._setBox(node,_1a5,_1a6,_1a7,_1a8);};var _1aa={l:0,t:0,w:0,h:0};dojo.marginBox=function(node,box){var n=byId(node),s=gcs(n),b=box;return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);};dojo.contentBox=function(node,box){var n=byId(node),s=gcs(n),b=box;return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);};var _1ab=function(node,prop){if(!(node=(node||0).parentNode)){return 0;}var val,_1ac=0,_1ad=d.body();while(node&&node.style){if(gcs(node).position=="fixed"){return 0;}val=node[prop];if(val){_1ac+=val-0;if(node==_1ad){break;}}node=node.parentNode;}return _1ac;};dojo._docScroll=function(){var n=d.global;return "pageXOffset" in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.doc.documentElement,n.clientHeight?{x:d._fixIeBiDiScrollLeft(n.scrollLeft),y:n.scrollTop}:(n=d.body(),{x:n.scrollLeft||0,y:n.scrollTop||0}));};dojo._isBodyLtr=function(){return "_bodyLtr" in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr";};dojo._getIeDocumentElementOffset=function(){var de=d.doc.documentElement;if(d.isIE<8){var r=de.getBoundingClientRect();var l=r.left,t=r.top;if(d.isIE<7){l+=de.clientLeft;t+=de.clientTop;}return {x:l<0?0:l,y:t<0?0:t};}else{return {x:0,y:0};}};dojo._fixIeBiDiScrollLeft=function(_1ae){var dd=d.doc;if(d.isIE<8&&!d._isBodyLtr()){var de=d.isQuirks?dd.body:dd.documentElement;return _1ae+de.clientWidth-de.scrollWidth;}return _1ae;};dojo._abs=dojo.position=function(node,_1af){var db=d.body(),dh=db.parentNode,ret;node=byId(node);if(node["getBoundingClientRect"]){ret=node.getBoundingClientRect();ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};if(d.isIE){var _1b0=d._getIeDocumentElementOffset();ret.x-=_1b0.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);ret.y-=_1b0.y+(d.isQuirks?db.clientTop+db.offsetTop:0);}else{if(d.isFF==3){var cs=gcs(dh);ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);}}}else{ret={x:0,y:0,w:node.offsetWidth,h:node.offsetHeight};if(node["offsetParent"]){ret.x-=_1ab(node,"scrollLeft");ret.y-=_1ab(node,"scrollTop");var _1b1=node;do{var n=_1b1.offsetLeft,t=_1b1.offsetTop;ret.x+=isNaN(n)?0:n;ret.y+=isNaN(t)?0:t;cs=gcs(_1b1);if(_1b1!=node){if(d.isMoz){ret.x+=2*px(_1b1,cs.borderLeftWidth);ret.y+=2*px(_1b1,cs.borderTopWidth);}else{ret.x+=px(_1b1,cs.borderLeftWidth);ret.y+=px(_1b1,cs.borderTopWidth);}}if(d.isMoz&&cs.position=="static"){var _1b2=_1b1.parentNode;while(_1b2!=_1b1.offsetParent){var pcs=gcs(_1b2);if(pcs.position=="static"){ret.x+=px(_1b1,pcs.borderLeftWidth);ret.y+=px(_1b1,pcs.borderTopWidth);}_1b2=_1b2.parentNode;}}_1b1=_1b1.offsetParent;}while((_1b1!=dh)&&_1b1);}else{if(node.x&&node.y){ret.x+=isNaN(node.x)?0:node.x;ret.y+=isNaN(node.y)?0:node.y;}}}if(_1af){var _1b3=d._docScroll();ret.x+=_1b3.x;ret.y+=_1b3.y;}return ret;};dojo.coords=function(node,_1b4){var n=byId(node),s=gcs(n),mb=d._getMarginBox(n,s);var abs=d.position(n,_1b4);mb.x=abs.x;mb.y=abs.y;return mb;};var _1b5={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_1b6={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_1b7={innerHTML:1,className:1,htmlFor:d.isIE,value:1};var _1b8=function(name){return _1b6[name.toLowerCase()]||name;};var _1b9=function(node,name){var attr=node.getAttributeNode&&node.getAttributeNode(name);return attr&&attr.specified;};dojo.hasAttr=function(node,name){var lc=name.toLowerCase();return _1b7[_1b5[lc]||name]||_1b9(byId(node),_1b6[lc]||name);};var _1ba={},_1bb=0,_1bc=dojo._scopeName+"attrid",_1bd={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};dojo.attr=function(node,name,_1be){node=byId(node);var args=arguments.length,prop;if(args==2&&typeof name!="string"){for(var x in name){d.attr(node,x,name[x]);}return node;}var lc=name.toLowerCase(),_1bf=_1b5[lc]||name,_1c0=_1b7[_1bf],_1c1=_1b6[lc]||name;if(args==3){do{if(_1bf=="style"&&typeof _1be!="string"){d.style(node,_1be);break;}if(_1bf=="innerHTML"){if(d.isIE&&node.tagName.toLowerCase() in _1bd){d.empty(node);node.appendChild(d._toDom(_1be,node.ownerDocument));}else{node[_1bf]=_1be;}break;}if(d.isFunction(_1be)){var _1c2=d.attr(node,_1bc);if(!_1c2){_1c2=_1bb++;d.attr(node,_1bc,_1c2);}if(!_1ba[_1c2]){_1ba[_1c2]={};}var h=_1ba[_1c2][_1bf];if(h){d.disconnect(h);}else{try{delete node[_1bf];}catch(e){}}_1ba[_1c2][_1bf]=d.connect(node,_1bf,_1be);break;}if(_1c0||typeof _1be=="boolean"){node[_1bf]=_1be;break;}node.setAttribute(_1c1,_1be);}while(false);return node;}_1be=node[_1bf];if(_1c0&&typeof _1be!="undefined"){return _1be;}if(_1bf!="href"&&(typeof _1be=="boolean"||d.isFunction(_1be))){return _1be;}return _1b9(node,_1c1)?node.getAttribute(_1c1):null;};dojo.removeAttr=function(node,name){byId(node).removeAttribute(_1b8(name));};dojo.getNodeProp=function(node,name){node=byId(node);var lc=name.toLowerCase(),_1c3=_1b5[lc]||name;if((_1c3 in node)&&_1c3!="href"){return node[_1c3];}var _1c4=_1b6[lc]||name;return _1b9(node,_1c4)?node.getAttribute(_1c4):null;};dojo.create=function(tag,_1c5,_1c6,pos){var doc=d.doc;if(_1c6){_1c6=byId(_1c6);doc=_1c6.ownerDocument;}if(typeof tag=="string"){tag=doc.createElement(tag);}if(_1c5){d.attr(tag,_1c5);}if(_1c6){d.place(tag,_1c6,pos);}return tag;};d.empty=d.isIE?function(node){node=byId(node);for(var c;c=node.lastChild;){d.destroy(c);}}:function(node){byId(node).innerHTML="";};var _1c7={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_1c8=/<\s*([\w\:]+)/,_1c9={},_1ca=0,_1cb="__"+d._scopeName+"ToDomId";for(var _1cc in _1c7){var tw=_1c7[_1cc];tw.pre=_1cc=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";tw.post="</"+tw.reverse().join("></")+">";}d._toDom=function(frag,doc){doc=doc||d.doc;var _1cd=doc[_1cb];if(!_1cd){doc[_1cb]=_1cd=++_1ca+"";_1c9[_1cd]=doc.createElement("div");}frag+="";var _1ce=frag.match(_1c8),tag=_1ce?_1ce[1].toLowerCase():"",_1cf=_1c9[_1cd],wrap,i,fc,df;if(_1ce&&_1c7[tag]){wrap=_1c7[tag];_1cf.innerHTML=wrap.pre+frag+wrap.post;for(i=wrap.length;i;--i){_1cf=_1cf.firstChild;}}else{_1cf.innerHTML=frag;}if(_1cf.childNodes.length==1){return _1cf.removeChild(_1cf.firstChild);}df=doc.createDocumentFragment();while(fc=_1cf.firstChild){df.appendChild(fc);}return df;};var _1d0="className";dojo.hasClass=function(node,_1d1){return ((" "+byId(node)[_1d0]+" ").indexOf(" "+_1d1+" ")>=0);};var _1d2=/\s+/,a1=[""],_1d3=function(s){if(typeof s=="string"||s instanceof String){if(s.indexOf(" ")<0){a1[0]=s;return a1;}else{return s.split(_1d2);}}return s;};dojo.addClass=function(node,_1d4){node=byId(node);_1d4=_1d3(_1d4);var cls=" "+node[_1d0]+" ";for(var i=0,len=_1d4.length,c;i<len;++i){c=_1d4[i];if(c&&cls.indexOf(" "+c+" ")<0){cls+=c+" ";}}node[_1d0]=d.trim(cls);};dojo.removeClass=function(node,_1d5){node=byId(node);var cls;if(_1d5!==undefined){_1d5=_1d3(_1d5);cls=" "+node[_1d0]+" ";for(var i=0,len=_1d5.length;i<len;++i){cls=cls.replace(" "+_1d5[i]+" "," ");}cls=d.trim(cls);}else{cls="";}if(node[_1d0]!=cls){node[_1d0]=cls;}};dojo.toggleClass=function(node,_1d6,_1d7){if(_1d7===undefined){_1d7=!d.hasClass(node,_1d6);}d[_1d7?"addClass":"removeClass"](node,_1d6);};})();}if(!dojo._hasResource["dojo._base.NodeList"]){dojo._hasResource["dojo._base.NodeList"]=true;dojo.provide("dojo._base.NodeList");(function(){var d=dojo;var ap=Array.prototype,aps=ap.slice,apc=ap.concat;var tnl=function(a,_1d8,_1d9){if(!a.sort){a=aps.call(a,0);}var ctor=_1d9||this._NodeListCtor||d._NodeListCtor;a.constructor=ctor;dojo._mixin(a,ctor.prototype);a._NodeListCtor=ctor;return _1d8?a._stash(_1d8):a;};var _1da=function(f,a,o){a=[0].concat(aps.call(a,0));o=o||d.global;return function(node){a[0]=node;return f.apply(o,a);};};var _1db=function(f,o){return function(){this.forEach(_1da(f,arguments,o));return this;};};var _1dc=function(f,o){return function(){return this.map(_1da(f,arguments,o));};};var _1dd=function(f,o){return function(){return this.filter(_1da(f,arguments,o));};};var _1de=function(f,g,o){return function(){var a=arguments,body=_1da(f,a,o);if(g.call(o||d.global,a)){return this.map(body);}this.forEach(body);return this;};};var _1df=function(a){return a.length==1&&(typeof a[0]=="string");};var _1e0=function(node){var p=node.parentNode;if(p){p.removeChild(node);}};dojo.NodeList=function(){return tnl(Array.apply(null,arguments));};d._NodeListCtor=d.NodeList;var nl=d.NodeList,nlp=nl.prototype;nl._wrap=nlp._wrap=tnl;nl._adaptAsMap=_1dc;nl._adaptAsForEach=_1db;nl._adaptAsFilter=_1dd;nl._adaptWithCondition=_1de;d.forEach(["slice","splice"],function(name){var f=ap[name];nlp[name]=function(){return this._wrap(f.apply(this,arguments),name=="slice"?this:null);};});d.forEach(["indexOf","lastIndexOf","every","some"],function(name){var f=d[name];nlp[name]=function(){return f.apply(d,[this].concat(aps.call(arguments,0)));};});d.forEach(["attr","style"],function(name){nlp[name]=_1de(d[name],_1df);});d.forEach(["connect","addClass","removeClass","toggleClass","empty","removeAttr"],function(name){nlp[name]=_1db(d[name]);});dojo.extend(dojo.NodeList,{_normalize:function(_1e1,_1e2){var _1e3=_1e1.parse===true?true:false;if(typeof _1e1.template=="string"){var _1e4=_1e1.templateFunc||(dojo.string&&dojo.string.substitute);_1e1=_1e4?_1e4(_1e1.template,_1e1):_1e1;}var type=(typeof _1e1);if(type=="string"||type=="number"){_1e1=dojo._toDom(_1e1,(_1e2&&_1e2.ownerDocument));if(_1e1.nodeType==11){_1e1=dojo._toArray(_1e1.childNodes);}else{_1e1=[_1e1];}}else{if(!dojo.isArrayLike(_1e1)){_1e1=[_1e1];}else{if(!dojo.isArray(_1e1)){_1e1=dojo._toArray(_1e1);}}}if(_1e3){_1e1._runParse=true;}return _1e1;},_cloneNode:function(node){return node.cloneNode(true);},_place:function(ary,_1e5,_1e6,_1e7){if(_1e5.nodeType!=1&&_1e6=="only"){return;}var _1e8=_1e5,_1e9;var _1ea=ary.length;for(var i=_1ea-1;i>=0;i--){var node=(_1e7?this._cloneNode(ary[i]):ary[i]);if(ary._runParse&&dojo.parser&&dojo.parser.parse){if(!_1e9){_1e9=_1e8.ownerDocument.createElement("div");}_1e9.appendChild(node);dojo.parser.parse(_1e9);node=_1e9.firstChild;while(_1e9.firstChild){_1e9.removeChild(_1e9.firstChild);}}if(i==_1ea-1){dojo.place(node,_1e8,_1e6);}else{_1e8.parentNode.insertBefore(node,_1e8);}_1e8=node;}},_stash:function(_1eb){this._parent=_1eb;return this;},end:function(){if(this._parent){return this._parent;}else{return new this._NodeListCtor();}},concat:function(item){var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){return a&&!d.isArray(a)&&(typeof NodeList!="undefined"&&a.constructor===NodeList||a.constructor===this._NodeListCtor)?aps.call(a,0):a;});return this._wrap(apc.apply(t,m),this);},map:function(func,obj){return this._wrap(d.map(this,func,obj),this);},forEach:function(_1ec,_1ed){d.forEach(this,_1ec,_1ed);return this;},coords:_1dc(d.coords),position:_1dc(d.position),place:function(_1ee,_1ef){var item=d.query(_1ee)[0];return this.forEach(function(node){d.place(node,item,_1ef);});},orphan:function(_1f0){return (_1f0?d._filterQueryResult(this,_1f0):this).forEach(_1e0);},adopt:function(_1f1,_1f2){return d.query(_1f1).place(this[0],_1f2)._stash(this);},query:function(_1f3){if(!_1f3){return this;}var ret=this.map(function(node){return d.query(_1f3,node).filter(function(_1f4){return _1f4!==undefined;});});return this._wrap(apc.apply([],ret),this);},filter:function(_1f5){var a=arguments,_1f6=this,_1f7=0;if(typeof _1f5=="string"){_1f6=d._filterQueryResult(this,a[0]);if(a.length==1){return _1f6._stash(this);}_1f7=1;}return this._wrap(d.filter(_1f6,a[_1f7],a[_1f7+1]),this);},addContent:function(_1f8,_1f9){_1f8=this._normalize(_1f8,this[0]);for(var i=0,node;node=this[i];i++){this._place(_1f8,node,_1f9,i>0);}return this;},instantiate:function(_1fa,_1fb){var c=d.isFunction(_1fa)?_1fa:d.getObject(_1fa);_1fb=_1fb||{};return this.forEach(function(node){new c(_1fb,node);});},at:function(){var t=new this._NodeListCtor();d.forEach(arguments,function(i){if(this[i]){t.push(this[i]);}},this);return t._stash(this);}});nl.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];d.forEach(nl.events,function(evt){var _1fc="on"+evt;nlp[_1fc]=function(a,b){return this.connect(_1fc,a,b);};});})();}if(!dojo._hasResource["dojo._base.query"]){dojo._hasResource["dojo._base.query"]=true;if(typeof dojo!="undefined"){dojo.provide("dojo._base.query");}(function(d){var trim=d.trim;var each=d.forEach;var qlc=d._NodeListCtor=d.NodeList;var _1fd=function(){return d.doc;};var _1fe=((d.isWebKit||d.isMozilla)&&((_1fd().compatMode)=="BackCompat"));var _1ff=!!_1fd().firstChild["children"]?"children":"childNodes";var _200=">~+";var _201=false;var _202=function(){return true;};var _203=function(_204){if(_200.indexOf(_204.slice(-1))>=0){_204+=" * ";}else{_204+=" ";}var ts=function(s,e){return trim(_204.slice(s,e));};var _205=[];var _206=-1,_207=-1,_208=-1,_209=-1,_20a=-1,inId=-1,_20b=-1,lc="",cc="",_20c;var x=0,ql=_204.length,_20d=null,_20e=null;var _20f=function(){if(_20b>=0){var tv=(_20b==x)?null:ts(_20b,x);_20d[(_200.indexOf(tv)<0)?"tag":"oper"]=tv;_20b=-1;}};var _210=function(){if(inId>=0){_20d.id=ts(inId,x).replace(/\\/g,"");inId=-1;}};var _211=function(){if(_20a>=0){_20d.classes.push(ts(_20a+1,x).replace(/\\/g,""));_20a=-1;}};var _212=function(){_210();_20f();_211();};var _213=function(){_212();if(_209>=0){_20d.pseudos.push({name:ts(_209+1,x)});}_20d.loops=(_20d.pseudos.length||_20d.attrs.length||_20d.classes.length);_20d.oquery=_20d.query=ts(_20c,x);_20d.otag=_20d.tag=(_20d["oper"])?null:(_20d.tag||"*");if(_20d.tag){_20d.tag=_20d.tag.toUpperCase();}if(_205.length&&(_205[_205.length-1].oper)){_20d.infixOper=_205.pop();_20d.query=_20d.infixOper.query+" "+_20d.query;}_205.push(_20d);_20d=null;};for(;lc=cc,cc=_204.charAt(x),x<ql;x++){if(lc=="\\"){continue;}if(!_20d){_20c=x;_20d={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){return (_201)?this.otag:this.tag;}};_20b=x;}if(_206>=0){if(cc=="]"){if(!_20e.attr){_20e.attr=ts(_206+1,x);}else{_20e.matchFor=ts((_208||_206+1),x);}var cmf=_20e.matchFor;if(cmf){if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){_20e.matchFor=cmf.slice(1,-1);}}_20d.attrs.push(_20e);_20e=null;_206=_208=-1;}else{if(cc=="="){var _214=("|~^$*".indexOf(lc)>=0)?lc:"";_20e.type=_214+cc;_20e.attr=ts(_206+1,x-_214.length);_208=x+1;}}}else{if(_207>=0){if(cc==")"){if(_209>=0){_20e.value=ts(_207+1,x);}_209=_207=-1;}}else{if(cc=="#"){_212();inId=x+1;}else{if(cc=="."){_212();_20a=x;}else{if(cc==":"){_212();_209=x;}else{if(cc=="["){_212();_206=x;_20e={};}else{if(cc=="("){if(_209>=0){_20e={name:ts(_209+1,x),value:null};_20d.pseudos.push(_20e);}_207=x;}else{if((cc==" ")&&(lc!=cc)){_213();}}}}}}}}}return _205;};var _215=function(_216,_217){if(!_216){return _217;}if(!_217){return _216;}return function(){return _216.apply(window,arguments)&&_217.apply(window,arguments);};};var _218=function(i,arr){var r=arr||[];if(i){r.push(i);}return r;};var _219=function(n){return (1==n.nodeType);};var _21a="";var _21b=function(elem,attr){if(!elem){return _21a;}if(attr=="class"){return elem.className||_21a;}if(attr=="for"){return elem.htmlFor||_21a;}if(attr=="style"){return elem.style.cssText||_21a;}return (_201?elem.getAttribute(attr):elem.getAttribute(attr,2))||_21a;};var _21c={"*=":function(attr,_21d){return function(elem){return (_21b(elem,attr).indexOf(_21d)>=0);};},"^=":function(attr,_21e){return function(elem){return (_21b(elem,attr).indexOf(_21e)==0);};},"$=":function(attr,_21f){var tval=" "+_21f;return function(elem){var ea=" "+_21b(elem,attr);return (ea.lastIndexOf(_21f)==(ea.length-_21f.length));};},"~=":function(attr,_220){var tval=" "+_220+" ";return function(elem){var ea=" "+_21b(elem,attr)+" ";return (ea.indexOf(tval)>=0);};},"|=":function(attr,_221){var _222=" "+_221+"-";return function(elem){var ea=" "+_21b(elem,attr);return ((ea==_221)||(ea.indexOf(_222)==0));};},"=":function(attr,_223){return function(elem){return (_21b(elem,attr)==_223);};}};var _224=(typeof _1fd().firstChild.nextElementSibling=="undefined");var _225=!_224?"nextElementSibling":"nextSibling";var _226=!_224?"previousElementSibling":"previousSibling";var _227=(_224?_219:_202);var _228=function(node){while(node=node[_226]){if(_227(node)){return false;}}return true;};var _229=function(node){while(node=node[_225]){if(_227(node)){return false;}}return true;};var _22a=function(node){var root=node.parentNode;var i=0,tret=root[_1ff],ci=(node["_i"]||-1),cl=(root["_l"]||-1);if(!tret){return -1;}var l=tret.length;if(cl==l&&ci>=0&&cl>=0){return ci;}root["_l"]=l;ci=-1;for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_225]){if(_227(te)){te["_i"]=++i;if(node===te){ci=i;}}}return ci;};var _22b=function(elem){return !((_22a(elem))%2);};var _22c=function(elem){return ((_22a(elem))%2);};var _22d={"checked":function(name,_22e){return function(elem){return !!("checked" in elem?elem.checked:elem.selected);};},"first-child":function(){return _228;},"last-child":function(){return _229;},"only-child":function(name,_22f){return function(node){if(!_228(node)){return false;}if(!_229(node)){return false;}return true;};},"empty":function(name,_230){return function(elem){var cn=elem.childNodes;var cnl=elem.childNodes.length;for(var x=cnl-1;x>=0;x--){var nt=cn[x].nodeType;if((nt===1)||(nt==3)){return false;}}return true;};},"contains":function(name,_231){var cz=_231.charAt(0);if(cz=="\""||cz=="'"){_231=_231.slice(1,-1);}return function(elem){return (elem.innerHTML.indexOf(_231)>=0);};},"not":function(name,_232){var p=_203(_232)[0];var _233={el:1};if(p.tag!="*"){_233.tag=1;}if(!p.classes.length){_233.classes=1;}var ntf=_234(p,_233);return function(elem){return (!ntf(elem));};},"nth-child":function(name,_235){var pi=parseInt;if(_235=="odd"){return _22c;}else{if(_235=="even"){return _22b;}}if(_235.indexOf("n")!=-1){var _236=_235.split("n",2);var pred=_236[0]?((_236[0]=="-")?-1:pi(_236[0])):1;var idx=_236[1]?pi(_236[1]):0;var lb=0,ub=-1;if(pred>0){if(idx<0){idx=(idx%pred)&&(pred+(idx%pred));}else{if(idx>0){if(idx>=pred){lb=idx-idx%pred;}idx=idx%pred;}}}else{if(pred<0){pred*=-1;if(idx>0){ub=idx;idx=idx%pred;}}}if(pred>0){return function(elem){var i=_22a(elem);return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);};}else{_235=idx;}}var _237=pi(_235);return function(elem){return (_22a(elem)==_237);};}};var _238=(d.isIE)?function(cond){var clc=cond.toLowerCase();if(clc=="class"){cond="className";}return function(elem){return (_201?elem.getAttribute(cond):elem[cond]||elem[clc]);};}:function(cond){return function(elem){return (elem&&elem.getAttribute&&elem.hasAttribute(cond));};};var _234=function(_239,_23a){if(!_239){return _202;}_23a=_23a||{};var ff=null;if(!("el" in _23a)){ff=_215(ff,_219);}if(!("tag" in _23a)){if(_239.tag!="*"){ff=_215(ff,function(elem){return (elem&&(elem.tagName==_239.getTag()));});}}if(!("classes" in _23a)){each(_239.classes,function(_23b,idx,arr){var re=new RegExp("(?:^|\\s)"+_23b+"(?:\\s|$)");ff=_215(ff,function(elem){return re.test(elem.className);});ff.count=idx;});}if(!("pseudos" in _23a)){each(_239.pseudos,function(_23c){var pn=_23c.name;if(_22d[pn]){ff=_215(ff,_22d[pn](pn,_23c.value));}});}if(!("attrs" in _23a)){each(_239.attrs,function(attr){var _23d;var a=attr.attr;if(attr.type&&_21c[attr.type]){_23d=_21c[attr.type](a,attr.matchFor);}else{if(a.length){_23d=_238(a);}}if(_23d){ff=_215(ff,_23d);}});}if(!("id" in _23a)){if(_239.id){ff=_215(ff,function(elem){return (!!elem&&(elem.id==_239.id));});}}if(!ff){if(!("default" in _23a)){ff=_202;}}return ff;};var _23e=function(_23f){return function(node,ret,bag){while(node=node[_225]){if(_224&&(!_219(node))){continue;}if((!bag||_240(node,bag))&&_23f(node)){ret.push(node);}break;}return ret;};};var _241=function(_242){return function(root,ret,bag){var te=root[_225];while(te){if(_227(te)){if(bag&&!_240(te,bag)){break;}if(_242(te)){ret.push(te);}}te=te[_225];}return ret;};};var _243=function(_244){_244=_244||_202;return function(root,ret,bag){var te,x=0,tret=root[_1ff];while(te=tret[x++]){if(_227(te)&&(!bag||_240(te,bag))&&(_244(te,x))){ret.push(te);}}return ret;};};var _245=function(node,root){var pn=node.parentNode;while(pn){if(pn==root){break;}pn=pn.parentNode;}return !!pn;};var _246={};var _247=function(_248){var _249=_246[_248.query];if(_249){return _249;}var io=_248.infixOper;var oper=(io?io.oper:"");var _24a=_234(_248,{el:1});var qt=_248.tag;var _24b=("*"==qt);var ecs=_1fd()["getElementsByClassName"];if(!oper){if(_248.id){_24a=(!_248.loops&&_24b)?_202:_234(_248,{el:1,id:1});_249=function(root,arr){var te=d.byId(_248.id,(root.ownerDocument||root));if(!te||!_24a(te)){return;}if(9==root.nodeType){return _218(te,arr);}else{if(_245(te,root)){return _218(te,arr);}}};}else{if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_248.classes.length&&!_1fe){_24a=_234(_248,{el:1,classes:1,id:1});var _24c=_248.classes.join(" ");_249=function(root,arr,bag){var ret=_218(0,arr),te,x=0;var tret=root.getElementsByClassName(_24c);while((te=tret[x++])){if(_24a(te,root)&&_240(te,bag)){ret.push(te);}}return ret;};}else{if(!_24b&&!_248.loops){_249=function(root,arr,bag){var ret=_218(0,arr),te,x=0;var tret=root.getElementsByTagName(_248.getTag());while((te=tret[x++])){if(_240(te,bag)){ret.push(te);}}return ret;};}else{_24a=_234(_248,{el:1,tag:1,id:1});_249=function(root,arr,bag){var ret=_218(0,arr),te,x=0;var tret=root.getElementsByTagName(_248.getTag());while((te=tret[x++])){if(_24a(te,root)&&_240(te,bag)){ret.push(te);}}return ret;};}}}}else{var _24d={el:1};if(_24b){_24d.tag=1;}_24a=_234(_248,_24d);if("+"==oper){_249=_23e(_24a);}else{if("~"==oper){_249=_241(_24a);}else{if(">"==oper){_249=_243(_24a);}}}}return _246[_248.query]=_249;};var _24e=function(root,_24f){var _250=_218(root),qp,x,te,qpl=_24f.length,bag,ret;for(var i=0;i<qpl;i++){ret=[];qp=_24f[i];x=_250.length-1;if(x>0){bag={};ret.nozip=true;}var gef=_247(qp);for(var j=0;(te=_250[j]);j++){gef(te,ret,bag);}if(!ret.length){break;}_250=ret;}return ret;};var _251={},_252={};var _253=function(_254){var _255=_203(trim(_254));if(_255.length==1){var tef=_247(_255[0]);return function(root){var r=tef(root,new qlc());if(r){r.nozip=true;}return r;};}return function(root){return _24e(root,_255);};};var nua=navigator.userAgent;var wk="WebKit/";var _256=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));var _257=d.isIE?"commentStrip":"nozip";var qsa="querySelectorAll";var _258=(!!_1fd()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_256));var _259=/n\+\d|([^ ])?([>~+])([^ =])?/g;var _25a=function(_25b,pre,ch,post){return ch?(pre?pre+" ":"")+ch+(post?" "+post:""):_25b;};var _25c=function(_25d,_25e){_25d=_25d.replace(_259,_25a);if(_258){var _25f=_252[_25d];if(_25f&&!_25e){return _25f;}}var _260=_251[_25d];if(_260){return _260;}var qcz=_25d.charAt(0);var _261=(-1==_25d.indexOf(" "));if((_25d.indexOf("#")>=0)&&(_261)){_25e=true;}var _262=(_258&&(!_25e)&&(_200.indexOf(qcz)==-1)&&(!d.isIE||(_25d.indexOf(":")==-1))&&(!(_1fe&&(_25d.indexOf(".")>=0)))&&(_25d.indexOf(":contains")==-1)&&(_25d.indexOf(":checked")==-1)&&(_25d.indexOf("|=")==-1));if(_262){var tq=(_200.indexOf(_25d.charAt(_25d.length-1))>=0)?(_25d+" *"):_25d;return _252[_25d]=function(root){try{if(!((9==root.nodeType)||_261)){throw "";}var r=root[qsa](tq);r[_257]=true;return r;}catch(e){return _25c(_25d,true)(root);}};}else{var _263=_25d.split(/\s*,\s*/);return _251[_25d]=((_263.length<2)?_253(_25d):function(root){var _264=0,ret=[],tp;while((tp=_263[_264++])){ret=ret.concat(_253(tp)(root));}return ret;});}};var _265=0;var _266=d.isIE?function(node){if(_201){return (node.getAttribute("_uid")||node.setAttribute("_uid",++_265)||_265);}else{return node.uniqueID;}}:function(node){return (node._uid||(node._uid=++_265));};var _240=function(node,bag){if(!bag){return 1;}var id=_266(node);if(!bag[id]){return bag[id]=1;}return 0;};var _267="_zipIdx";var _268=function(arr){if(arr&&arr.nozip){return (qlc._wrap)?qlc._wrap(arr):arr;}var ret=new qlc();if(!arr||!arr.length){return ret;}if(arr[0]){ret.push(arr[0]);}if(arr.length<2){return ret;}_265++;if(d.isIE&&_201){var _269=_265+"";arr[0].setAttribute(_267,_269);for(var x=1,te;te=arr[x];x++){if(arr[x].getAttribute(_267)!=_269){ret.push(te);}te.setAttribute(_267,_269);}}else{if(d.isIE&&arr.commentStrip){try{for(var x=1,te;te=arr[x];x++){if(_219(te)){ret.push(te);}}}catch(e){}}else{if(arr[0]){arr[0][_267]=_265;}for(var x=1,te;te=arr[x];x++){if(arr[x][_267]!=_265){ret.push(te);}te[_267]=_265;}}}return ret;};d.query=function(_26a,root){qlc=d._NodeListCtor;if(!_26a){return new qlc();}if(_26a.constructor==qlc){return _26a;}if(typeof _26a!="string"){return new qlc(_26a);}if(typeof root=="string"){root=d.byId(root);if(!root){return new qlc();}}root=root||_1fd();var od=root.ownerDocument||root.documentElement;_201=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));var r=_25c(_26a)(root);if(r&&r.nozip&&!qlc._wrap){return r;}return _268(r);};d.query.pseudos=_22d;d._filterQueryResult=function(_26b,_26c){var _26d=new d._NodeListCtor();var _26e=_234(_203(_26c)[0]);for(var x=0,te;te=_26b[x];x++){if(_26e(te)){_26d.push(te);}}return _26d;};})(this["queryPortability"]||this["acme"]||dojo);}if(!dojo._hasResource["dojo._base.xhr"]){dojo._hasResource["dojo._base.xhr"]=true;dojo.provide("dojo._base.xhr");(function(){var _26f=dojo,cfg=_26f.config;function _270(obj,name,_271){if(_271===null){return;}var val=obj[name];if(typeof val=="string"){obj[name]=[val,_271];}else{if(_26f.isArray(val)){val.push(_271);}else{obj[name]=_271;}}};dojo.fieldToObject=function(_272){var ret=null;var item=_26f.byId(_272);if(item){var _273=item.name;var type=(item.type||"").toLowerCase();if(_273&&type&&!item.disabled){if(type=="radio"||type=="checkbox"){if(item.checked){ret=item.value;}}else{if(item.multiple){ret=[];_26f.query("option",item).forEach(function(opt){if(opt.selected){ret.push(opt.value);}});}else{ret=item.value;}}}}return ret;};dojo.formToObject=function(_274){var ret={};var _275="file|submit|image|reset|button|";_26f.forEach(dojo.byId(_274).elements,function(item){var _276=item.name;var type=(item.type||"").toLowerCase();if(_276&&type&&_275.indexOf(type)==-1&&!item.disabled){_270(ret,_276,_26f.fieldToObject(item));if(type=="image"){ret[_276+".x"]=ret[_276+".y"]=ret[_276].x=ret[_276].y=0;}}});return ret;};dojo.objectToQuery=function(map){var enc=encodeURIComponent;var _277=[];var _278={};for(var name in map){var _279=map[name];if(_279!=_278[name]){var _27a=enc(name)+"=";if(_26f.isArray(_279)){for(var i=0;i<_279.length;i++){_277.push(_27a+enc(_279[i]));}}else{_277.push(_27a+enc(_279));}}}return _277.join("&");};dojo.formToQuery=function(_27b){return _26f.objectToQuery(_26f.formToObject(_27b));};dojo.formToJson=function(_27c,_27d){return _26f.toJson(_26f.formToObject(_27c),_27d);};dojo.queryToObject=function(str){var ret={};var qp=str.split("&");var dec=decodeURIComponent;_26f.forEach(qp,function(item){if(item.length){var _27e=item.split("=");var name=dec(_27e.shift());var val=dec(_27e.join("="));if(typeof ret[name]=="string"){ret[name]=[ret[name]];}if(_26f.isArray(ret[name])){ret[name].push(val);}else{ret[name]=val;}}});return ret;};dojo._blockAsync=false;var _27f=_26f._contentHandlers=dojo.contentHandlers={text:function(xhr){return xhr.responseText;},json:function(xhr){return _26f.fromJson(xhr.responseText||null);},"json-comment-filtered":function(xhr){if(!dojo.config.useCommentedJson){console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");}var _280=xhr.responseText;var _281=_280.indexOf("/*");var _282=_280.lastIndexOf("*/");if(_281==-1||_282==-1){throw new Error("JSON was not comment filtered");}return _26f.fromJson(_280.substring(_281+2,_282));},javascript:function(xhr){return _26f.eval(xhr.responseText);},xml:function(xhr){var _283=xhr.responseXML;if(_26f.isIE&&(!_283||!_283.documentElement)){var ms=function(n){return "MSXML"+n+".DOMDocument";};var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];_26f.some(dp,function(p){try{var dom=new ActiveXObject(p);dom.async=false;dom.loadXML(xhr.responseText);_283=dom;}catch(e){return false;}return true;});}return _283;},"json-comment-optional":function(xhr){if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){return _27f["json-comment-filtered"](xhr);}else{return _27f["json"](xhr);}}};dojo._ioSetArgs=function(args,_284,_285,_286){var _287={args:args,url:args.url};var _288=null;if(args.form){var form=_26f.byId(args.form);var _289=form.getAttributeNode("action");_287.url=_287.url||(_289?_289.value:null);_288=_26f.formToObject(form);}var _28a=[{}];if(_288){_28a.push(_288);}if(args.content){_28a.push(args.content);}if(args.preventCache){_28a.push({"dojo.preventCache":new Date().valueOf()});}_287.query=_26f.objectToQuery(_26f.mixin.apply(null,_28a));_287.handleAs=args.handleAs||"text";var d=new _26f.Deferred(_284);d.addCallbacks(_285,function(_28b){return _286(_28b,d);});var ld=args.load;if(ld&&_26f.isFunction(ld)){d.addCallback(function(_28c){return ld.call(args,_28c,_287);});}var err=args.error;if(err&&_26f.isFunction(err)){d.addErrback(function(_28d){return err.call(args,_28d,_287);});}var _28e=args.handle;if(_28e&&_26f.isFunction(_28e)){d.addBoth(function(_28f){return _28e.call(args,_28f,_287);});}if(cfg.ioPublish&&_26f.publish&&_287.args.ioPublish!==false){d.addCallbacks(function(res){_26f.publish("/dojo/io/load",[d,res]);return res;},function(res){_26f.publish("/dojo/io/error",[d,res]);return res;});d.addBoth(function(res){_26f.publish("/dojo/io/done",[d,res]);return res;});}d.ioArgs=_287;return d;};var _290=function(dfd){dfd.canceled=true;var xhr=dfd.ioArgs.xhr;var _291=typeof xhr.abort;if(_291=="function"||_291=="object"||_291=="unknown"){xhr.abort();}var err=dfd.ioArgs.error;if(!err){err=new Error("xhr cancelled");err.dojoType="cancel";}return err;};var _292=function(dfd){var ret=_27f[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);return ret===undefined?null:ret;};var _293=function(_294,dfd){if(!dfd.ioArgs.args.failOk){console.error(_294);}return _294;};var _295=null;var _296=[];var _297=0;var _298=function(dfd){if(_297<=0){_297=0;if(cfg.ioPublish&&_26f.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){_26f.publish("/dojo/io/stop");}}};var _299=function(){var now=(new Date()).getTime();if(!_26f._blockAsync){for(var i=0,tif;i<_296.length&&(tif=_296[i]);i++){var dfd=tif.dfd;var func=function(){if(!dfd||dfd.canceled||!tif.validCheck(dfd)){_296.splice(i--,1);_297-=1;}else{if(tif.ioCheck(dfd)){_296.splice(i--,1);tif.resHandle(dfd);_297-=1;}else{if(dfd.startTime){if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){_296.splice(i--,1);var err=new Error("timeout exceeded");err.dojoType="timeout";dfd.errback(err);dfd.cancel();_297-=1;}}}}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(e){dfd.errback(e);}}}}_298(dfd);if(!_296.length){clearInterval(_295);_295=null;return;}};dojo._ioCancelAll=function(){try{_26f.forEach(_296,function(i){try{i.dfd.cancel();}catch(e){}});}catch(e){}};if(_26f.isIE){_26f.addOnWindowUnload(_26f._ioCancelAll);}_26f._ioNotifyStart=function(dfd){if(cfg.ioPublish&&_26f.publish&&dfd.ioArgs.args.ioPublish!==false){if(!_297){_26f.publish("/dojo/io/start");}_297+=1;_26f.publish("/dojo/io/send",[dfd]);}};_26f._ioWatch=function(dfd,_29a,_29b,_29c){var args=dfd.ioArgs.args;if(args.timeout){dfd.startTime=(new Date()).getTime();}_296.push({dfd:dfd,validCheck:_29a,ioCheck:_29b,resHandle:_29c});if(!_295){_295=setInterval(_299,50);}if(args.sync){_299();}};var _29d="application/x-www-form-urlencoded";var _29e=function(dfd){return dfd.ioArgs.xhr.readyState;};var _29f=function(dfd){return 4==dfd.ioArgs.xhr.readyState;};var _2a0=function(dfd){var xhr=dfd.ioArgs.xhr;if(_26f._isDocumentOk(xhr)){dfd.callback(dfd);}else{var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);err.status=xhr.status;err.responseText=xhr.responseText;dfd.errback(err);}};dojo._ioAddQueryToUrl=function(_2a1){if(_2a1.query.length){_2a1.url+=(_2a1.url.indexOf("?")==-1?"?":"&")+_2a1.query;_2a1.query=null;}};dojo.xhr=function(_2a2,args,_2a3){var dfd=_26f._ioSetArgs(args,_290,_292,_293);var _2a4=dfd.ioArgs;var xhr=_2a4.xhr=_26f._xhrObj(_2a4.args);if(!xhr){dfd.cancel();return dfd;}if("postData" in args){_2a4.query=args.postData;}else{if("putData" in args){_2a4.query=args.putData;}else{if("rawBody" in args){_2a4.query=args.rawBody;}else{if((arguments.length>2&&!_2a3)||"POST|PUT".indexOf(_2a2.toUpperCase())==-1){_26f._ioAddQueryToUrl(_2a4);}}}}xhr.open(_2a2,_2a4.url,args.sync!==true,args.user||undefined,args.password||undefined);if(args.headers){for(var hdr in args.headers){if(hdr.toLowerCase()==="content-type"&&!args.contentType){args.contentType=args.headers[hdr];}else{if(args.headers[hdr]){xhr.setRequestHeader(hdr,args.headers[hdr]);}}}}xhr.setRequestHeader("Content-Type",args.contentType||_29d);if(!args.headers||!("X-Requested-With" in args.headers)){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");}_26f._ioNotifyStart(dfd);if(dojo.config.debugAtAllCosts){xhr.send(_2a4.query);}else{try{xhr.send(_2a4.query);}catch(e){_2a4.error=e;dfd.cancel();}}_26f._ioWatch(dfd,_29e,_29f,_2a0);xhr=null;return dfd;};dojo.xhrGet=function(args){return _26f.xhr("GET",args);};dojo.rawXhrPost=dojo.xhrPost=function(args){return _26f.xhr("POST",args,true);};dojo.rawXhrPut=dojo.xhrPut=function(args){return _26f.xhr("PUT",args,true);};dojo.xhrDelete=function(args){return _26f.xhr("DELETE",args);};})();}if(!dojo._hasResource["dojo._base.fx"]){dojo._hasResource["dojo._base.fx"]=true;dojo.provide("dojo._base.fx");(function(){var d=dojo;var _2a5=d._mixin;dojo._Line=function(_2a6,end){this.start=_2a6;this.end=end;};dojo._Line.prototype.getValue=function(n){return ((this.end-this.start)*n)+this.start;};dojo.Animation=function(args){_2a5(this,args);if(d.isArray(this.curve)){this.curve=new d._Line(this.curve[0],this.curve[1]);}};d._Animation=d.Animation;d.extend(dojo.Animation,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){var _2a7=this._percent,_2a8=this.easing;return _2a8?_2a8(_2a7):_2a7;},_fire:function(evt,args){var a=args||[];if(this[evt]){if(d.config.debugAtAllCosts){this[evt].apply(this,a);}else{try{this[evt].apply(this,a);}catch(e){console.error("exception in animation handler for:",evt);console.error(e);}}}return this;},play:function(_2a9,_2aa){var _2ab=this;if(_2ab._delayTimer){_2ab._clearTimer();}if(_2aa){_2ab._stopTimer();_2ab._active=_2ab._paused=false;_2ab._percent=0;}else{if(_2ab._active&&!_2ab._paused){return _2ab;}}_2ab._fire("beforeBegin",[_2ab.node]);var de=_2a9||_2ab.delay,_2ac=dojo.hitch(_2ab,"_play",_2aa);if(de>0){_2ab._delayTimer=setTimeout(_2ac,de);return _2ab;}_2ac();return _2ab;},_play:function(_2ad){var _2ae=this;if(_2ae._delayTimer){_2ae._clearTimer();}_2ae._startTime=new Date().valueOf();if(_2ae._paused){_2ae._startTime-=_2ae.duration*_2ae._percent;}_2ae._endTime=_2ae._startTime+_2ae.duration;_2ae._active=true;_2ae._paused=false;var _2af=_2ae.curve.getValue(_2ae._getStep());if(!_2ae._percent){if(!_2ae._startRepeatCount){_2ae._startRepeatCount=_2ae.repeat;}_2ae._fire("onBegin",[_2af]);}_2ae._fire("onPlay",[_2af]);_2ae._cycle();return _2ae;},pause:function(){var _2b0=this;if(_2b0._delayTimer){_2b0._clearTimer();}_2b0._stopTimer();if(!_2b0._active){return _2b0;}_2b0._paused=true;_2b0._fire("onPause",[_2b0.curve.getValue(_2b0._getStep())]);return _2b0;},gotoPercent:function(_2b1,_2b2){var _2b3=this;_2b3._stopTimer();_2b3._active=_2b3._paused=true;_2b3._percent=_2b1;if(_2b2){_2b3.play();}return _2b3;},stop:function(_2b4){var _2b5=this;if(_2b5._delayTimer){_2b5._clearTimer();}if(!_2b5._timer){return _2b5;}_2b5._stopTimer();if(_2b4){_2b5._percent=1;}_2b5._fire("onStop",[_2b5.curve.getValue(_2b5._getStep())]);_2b5._active=_2b5._paused=false;return _2b5;},status:function(){if(this._active){return this._paused?"paused":"playing";}return "stopped";},_cycle:function(){var _2b6=this;if(_2b6._active){var curr=new Date().valueOf();var step=(curr-_2b6._startTime)/(_2b6._endTime-_2b6._startTime);if(step>=1){step=1;}_2b6._percent=step;if(_2b6.easing){step=_2b6.easing(step);}_2b6._fire("onAnimate",[_2b6.curve.getValue(step)]);if(_2b6._percent<1){_2b6._startTimer();}else{_2b6._active=false;if(_2b6.repeat>0){_2b6.repeat--;_2b6.play(null,true);}else{if(_2b6.repeat==-1){_2b6.play(null,true);}else{if(_2b6._startRepeatCount){_2b6.repeat=_2b6._startRepeatCount;_2b6._startRepeatCount=0;}}}_2b6._percent=0;_2b6._fire("onEnd",[_2b6.node]);!_2b6.repeat&&_2b6._stopTimer();}}return _2b6;},_clearTimer:function(){clearTimeout(this._delayTimer);delete this._delayTimer;}});var ctr=0,_2b7=[],_2b8=null,_2b9={run:function(){}};d.extend(d.Animation,{_startTimer:function(){if(!this._timer){this._timer=d.connect(_2b9,"run",this,"_cycle");ctr++;}if(!_2b8){_2b8=setInterval(d.hitch(_2b9,"run"),this.rate);}},_stopTimer:function(){if(this._timer){d.disconnect(this._timer);this._timer=null;ctr--;}if(ctr<=0){clearInterval(_2b8);_2b8=null;ctr=0;}}});var _2ba=d.isIE?function(node){var ns=node.style;if(!ns.width.length&&d.style(node,"width")=="auto"){ns.width="auto";}}:function(){};dojo._fade=function(args){args.node=d.byId(args.node);var _2bb=_2a5({properties:{}},args),_2bc=(_2bb.properties.opacity={});_2bc.start=!("start" in _2bb)?function(){return +d.style(_2bb.node,"opacity")||0;}:_2bb.start;_2bc.end=_2bb.end;var anim=d.animateProperty(_2bb);d.connect(anim,"beforeBegin",d.partial(_2ba,_2bb.node));return anim;};dojo.fadeIn=function(args){return d._fade(_2a5({end:1},args));};dojo.fadeOut=function(args){return d._fade(_2a5({end:0},args));};dojo._defaultEasing=function(n){return 0.5+((Math.sin((n+1.5)*Math.PI))/2);};var _2bd=function(_2be){this._properties=_2be;for(var p in _2be){var prop=_2be[p];if(prop.start instanceof d.Color){prop.tempColor=new d.Color();}}};_2bd.prototype.getValue=function(r){var ret={};for(var p in this._properties){var prop=this._properties[p],_2bf=prop.start;if(_2bf instanceof d.Color){ret[p]=d.blendColors(_2bf,prop.end,r,prop.tempColor).toCss();}else{if(!d.isArray(_2bf)){ret[p]=((prop.end-_2bf)*r)+_2bf+(p!="opacity"?prop.units||"px":0);}}}return ret;};dojo.animateProperty=function(args){var n=args.node=d.byId(args.node);if(!args.easing){args.easing=d._defaultEasing;}var anim=new d.Animation(args);d.connect(anim,"beforeBegin",anim,function(){var pm={};for(var p in this.properties){if(p=="width"||p=="height"){this.node.display="block";}var prop=this.properties[p];if(d.isFunction(prop)){prop=prop(n);}prop=pm[p]=_2a5({},(d.isObject(prop)?prop:{end:prop}));if(d.isFunction(prop.start)){prop.start=prop.start(n);}if(d.isFunction(prop.end)){prop.end=prop.end(n);}var _2c0=(p.toLowerCase().indexOf("color")>=0);function _2c1(node,p){var v={height:node.offsetHeight,width:node.offsetWidth}[p];if(v!==undefined){return v;}v=d.style(node,p);return (p=="opacity")?+v:(_2c0?v:parseFloat(v));};if(!("end" in prop)){prop.end=_2c1(n,p);}else{if(!("start" in prop)){prop.start=_2c1(n,p);}}if(_2c0){prop.start=new d.Color(prop.start);prop.end=new d.Color(prop.end);}else{prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);}}this.curve=new _2bd(pm);});d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));return anim;};dojo.anim=function(node,_2c2,_2c3,_2c4,_2c5,_2c6){return d.animateProperty({node:node,duration:_2c3||d.Animation.prototype.duration,properties:_2c2,easing:_2c4,onEnd:_2c5}).play(_2c6||0);};})();}if(!dojo._hasResource["dojo.i18n"]){dojo._hasResource["dojo.i18n"]=true;dojo.provide("dojo.i18n");dojo.i18n.getLocalization=function(_2c7,_2c8,_2c9){_2c9=dojo.i18n.normalizeLocale(_2c9);var _2ca=_2c9.split("-");var _2cb=[_2c7,"nls",_2c8].join(".");var _2cc=dojo._loadedModules[_2cb];if(_2cc){var _2cd;for(var i=_2ca.length;i>0;i--){var loc=_2ca.slice(0,i).join("_");if(_2cc[loc]){_2cd=_2cc[loc];break;}}if(!_2cd){_2cd=_2cc.ROOT;}if(_2cd){var _2ce=function(){};_2ce.prototype=_2cd;return new _2ce();}}throw new Error("Bundle not found: "+_2c8+" in "+_2c7+" , locale="+_2c9);};dojo.i18n.normalizeLocale=function(_2cf){var _2d0=_2cf?_2cf.toLowerCase():dojo.locale;if(_2d0=="root"){_2d0="ROOT";}return _2d0;};dojo.i18n._requireLocalization=function(_2d1,_2d2,_2d3,_2d4){var _2d5=dojo.i18n.normalizeLocale(_2d3);var _2d6=[_2d1,"nls",_2d2].join(".");var _2d7="";if(_2d4){var _2d8=_2d4.split(",");for(var i=0;i<_2d8.length;i++){if(_2d5["indexOf"](_2d8[i])==0){if(_2d8[i].length>_2d7.length){_2d7=_2d8[i];}}}if(!_2d7){_2d7="ROOT";}}var _2d9=_2d4?_2d7:_2d5;var _2da=dojo._loadedModules[_2d6];var _2db=null;if(_2da){if(dojo.config.localizationComplete&&_2da._built){return;}var _2dc=_2d9.replace(/-/g,"_");var _2dd=_2d6+"."+_2dc;_2db=dojo._loadedModules[_2dd];}if(!_2db){_2da=dojo["provide"](_2d6);var syms=dojo._getModuleSymbols(_2d1);var _2de=syms.concat("nls").join("/");var _2df;dojo.i18n._searchLocalePath(_2d9,_2d4,function(loc){var _2e0=loc.replace(/-/g,"_");var _2e1=_2d6+"."+_2e0;var _2e2=false;if(!dojo._loadedModules[_2e1]){dojo["provide"](_2e1);var _2e3=[_2de];if(loc!="ROOT"){_2e3.push(loc);}_2e3.push(_2d2);var _2e4=_2e3.join("/")+".js";_2e2=dojo._loadPath(_2e4,null,function(hash){var _2e5=function(){};_2e5.prototype=_2df;_2da[_2e0]=new _2e5();for(var j in hash){_2da[_2e0][j]=hash[j];}});}else{_2e2=true;}if(_2e2&&_2da[_2e0]){_2df=_2da[_2e0];}else{_2da[_2e0]=_2df;}if(_2d4){return true;}});}if(_2d4&&_2d5!=_2d7){_2da[_2d5.replace(/-/g,"_")]=_2da[_2d7.replace(/-/g,"_")];}};(function(){var _2e6=dojo.config.extraLocale;if(_2e6){if(!_2e6 instanceof Array){_2e6=[_2e6];}var req=dojo.i18n._requireLocalization;dojo.i18n._requireLocalization=function(m,b,_2e7,_2e8){req(m,b,_2e7,_2e8);if(_2e7){return;}for(var i=0;i<_2e6.length;i++){req(m,b,_2e6[i],_2e8);}};}})();dojo.i18n._searchLocalePath=function(_2e9,down,_2ea){_2e9=dojo.i18n.normalizeLocale(_2e9);var _2eb=_2e9.split("-");var _2ec=[];for(var i=_2eb.length;i>0;i--){_2ec.push(_2eb.slice(0,i).join("-"));}_2ec.push(false);if(down){_2ec.reverse();}for(var j=_2ec.length-1;j>=0;j--){var loc=_2ec[j]||"ROOT";var stop=_2ea(loc);if(stop){break;}}};dojo.i18n._preloadLocalizations=function(_2ed,_2ee){function _2ef(_2f0){_2f0=dojo.i18n.normalizeLocale(_2f0);dojo.i18n._searchLocalePath(_2f0,true,function(loc){for(var i=0;i<_2ee.length;i++){if(_2ee[i]==loc){dojo["require"](_2ed+"_"+loc);return true;}}return false;});};_2ef();var _2f1=dojo.config.extraLocale||[];for(var i=0;i<_2f1.length;i++){_2ef(_2f1[i]);}};}if(!dojo._hasResource["dojo._base.browser"]){dojo._hasResource["dojo._base.browser"]=true;dojo.provide("dojo._base.browser");dojo.forEach(dojo.config.require,function(i){dojo["require"](i);});}if(dojo.config.afterOnLoad&&dojo.isBrowser){window.setTimeout(dojo._loadInit,1000);}})();

/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
 
kmlc = {}		//namespace

///////#######> initiate <##################################################################################################################################################
kmlc.init = function() {
	kmlc.VERSION = "0.10.1";
	
	Object.size = function(obj) { // Get the size of an object	//var size = Object.size(myArray);
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
	
	kmlc.checkOldCookie(); //TODO remove in near future..	
		
	var el = dojo.query(".iogc-LoginPanel-nameHeading");

if(window.location.href.indexOf("profile")!= -1 && window.location.href.indexOf("stats")!=-1 ){		//check if on stat page.
	GM_log("STAT MODE");	
	kmlc.profileNR = window.location.href.split("/")[4];

	var ppm = kmlc.getPPM();
	var ppmtd = dojo.query(".statLine tr")[0].appendChild(document.createElement('td'));
	ppmtd.innerHTML ="PPM	<div class='lrgStat' id='ppmSTAT'>		"+ppm+"	</div>	";
	
	var GHcharts = dojo.query(".section")[2].appendChild(document.createElement('div'));
	GHcharts.setAttribute('id', 'kmlc_GameHistory');
	GHcharts.setAttribute('style','	border-bottom: 1px solid #888888;	padding-bottom: 10px;' );
	GHcharts.innerHTML = "<h3><span>Game History Charts</span><div class='line'>&nbsp;</div></h3>";

	kmlc.addGHchartSection(GHcharts, true);
	kmlc.updateGameHist();

}else if(window.location.href.indexOf("#")== 17 && window.location.href.indexOf("#")== 21 || el[0]) { // check if on a table and if logged in
	GM_log("TABLE MODE");	

	kmlc.user = el[0].innerHTML;
	kmlc.profileNR = dojo.byId("profileLink").innerHTML.split("/")[2].split(" ")[0].replace(/"/,"");
	
	kmlc.rollStats = [		// set prediction percentages:
	/* def/att   2         3         4         5         6         7         8
       1  83.79630  97.29938  99.72994  99.98500  99.99964 100.00000 100.00000
       2  44.36728  77.85494  93.92361  98.79401  99.82169  99.98013  99.99834
       3  15.20062  45.35751  74.28305  90.93471  97.52998  99.46634  99.90692
       4   3.58796  19.17010  45.95282  71.80784  88.39535  96.15359  98.95340
       5   0.61050   6.07127  22.04424  46.36536  69.96164  86.23765  94.77315
       6   0.07662   1.48786   8.34228  24.24491  46.67306  68.51650  84.38738
       7   0.00709   0.28900   2.54497  10.36260  25.99838  46.91392  67.34556
       8   0.00047   0.04519   0.63795   3.67419  12.15070  27.43755  47.10907*/
	   
	[83.79630, 44.36728, 15.20062, 3.58796, 0.61050, 0.07662, 0.00709, 0.00047],
	[97.29938, 77.85494, 45.35751, 19.17010, 6.07127, 1.48786, 0.28900, 0.04519],
	[99.72994, 93.92361, 74.28305, 45.95282, 22.04424, 8.34228, 2.54497, 0.63795],
	[99.98500, 98.79401, 90.93471, 71.80784, 46.36536, 24.24491, 10.36260, 3.67419],
	[99.99964, 99.82169, 97.52998, 88.39535, 69.96164, 46.67306, 25.99838, 12.15070],
	[100.00000, 99.98013, 99.46634, 96.15359, 86.23765, 68.51650, 46.91392, 27.43755],
	[100.00000, 99.99834, 99.90692, 98.95340, 94.77315, 84.38738, 67.34556, 47.10907]];

	kmlc.clearUserStats();	//set up empty arrays to hold data.	

	var box_style = 'border:1px solid #888888; background:#f0f0f0; color:#000; padding:5px; width:200px; height:auto; text-align:center;';
	kmlc.dragObj = new Object();//, x, y;
	kmlc.dragObj.zIndex = 0;
	var divBase = document.body.appendChild(document.createElement('div'));
	divBase.textContent = 'Draggable Area';
	divBase.setAttribute('id', 'kmlc_BasePanel');
	divBase.setAttribute('style', 'z-index:1001; position:fixed; top: 89px; left: 1230px; border:1px solid #888888; background:#f0f0f0; color:#000; padding:5px; width:200px; height:auto; text-align:center;' );
	divBase.addEventListener('mousedown', function(e){kmlc.dragStart(e);}, false);

	var memdiv = dojo.query(".iogc-LoginPanel-playerRow");
	memdiv[2].innerHTML = "<div class='iogc-LoginPanel-bigstat' style='font-size:11px'> <a id='currentVersion' href='http://userscripts.org/scripts/source/91990.user.js' title='Version of this GM script, click to check for a new version.' > v"+kmlc.VERSION+"</a></div>"+
	"<div class='iogc-LoginPanel-heading'>Luck Plugin</div>"+
	"<div class='iogc-LoginPanl-menuitem'>watch:<input type='checkbox' id='luckMode'/>&nbsp; extend:<input type='checkbox' id='extraMode'/></div>"+
	"<button id='kmlc_settings' tabindex='0' type='button' class='gwt-Button  style='font-size:11px; float:left;'>X</button>";
	memdiv[3].innerHTML = "";
	//window.document.body.removeChild(memdiv[3]); // TODO doesn't work..
	dojo.connect(kmlc.extendBox(), "onchange", null, kmlc.moreChartsToggle);
	dojo.connect(dojo.byId("kmlc_settings"), "onclick", null, kmlc.showHideForm);
	kmlc.addSettings();

//// empty charts for startup
	var empty1 = "http://chart.apis.google.com/chart?chxl=1:||||players||||all|grey&chxr=0,0,100|1,1,9&chds=0,100&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=13,0,6&chs=200x120&cht=bvg&chco=BF3069|30BF56|9E30BF|ffdd44|3039BF|BF8630|30B1BF|666666|CCCCCC&chd=t:50,50,50,50,50,50,50,50,50&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=(1)+Luck+Percentage&chts=000000,11";
	var empty2 = "http://chart.apis.google.com/chart?chxl=0:|6|3.5|1|3.5|6&chxr=0,-6,6&chxs=0,333333,9,0,l,333333&chxt=y&chbh=a,1,1&chs=200x150&cht=bvs&chco=333333,888888,333333,888888&chds=-5,5,-5,5,1,8,1,8&chd=t2:2.5|-2.5|1|1&chg=20,0,2,2&chma=0,0,0,30&chm=h,333333,0,0.5:0.5,1|N,000000,2,-1,10,1|N,000000,3,-1,10,1|h,666666,0,0.25:0.25:1,1,-1|h,666666,0,0.75:0.75,1,-1&chtt=(2)+Roll+History&chts=000000,11";
	var empty3 = "http://chart.apis.google.com/chart?chxl=1:||||players|||all|grey&chxr=0,1,6|1,1,9&chxs=0,000000,11,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=8,0,7&chs=200x120&cht=bvg&chco=BF3069|30BF56|9E30BF|E1F038|3039BF|BF8630|30B1BF|333333,BA8496|84BA96|A884BA|BABA84|8484BA|BA9684|84BABA|666666|CCCCCC&chds=1,6,1,6&chd=t:3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5|3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=average+of+att%2Fdef+rolls&chts=000000,12";

	kmlc.chart1R = divBase.appendChild(document.createElement('img'));
	kmlc.chart1R.src = empty1;
	
	kmlc.chart2R = divBase.appendChild(document.createElement('img'));
	kmlc.chart2R.src = empty2;
	var divbox1R = divBase.appendChild(document.createElement('div'));
	divbox1R.setAttribute('id', 'divbox1R');
	divbox1R.innerHTML = "<form id='avgScale1R'> all:<input type='radio' name='scale1' id='allNotUser' value='1' /> user:<input type='radio' name='scale1' id='userNotAll' value='2' /></form>";
	dojo.connect(dojo.byId("avgScale1R"), "onclick", null, kmlc.newScale1);
	dojo.byId("allNotUser").checked = true;
	kmlc.newScale1();
	
	kmlc.chart3R = divBase.appendChild(document.createElement('img'));
	kmlc.chart3R.src = empty3;
	
//// CSS-style
	var kmlcstyle = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
	kmlcstyle.setAttribute('type', 'text/css');
	kmlcstyle.textContent = '\
	#kmlc_LeftExtra {\
		font-size: 9px;\
		position: absolute;\
		top: 89px;\
		left: 10px;\
		width: 200px;\
		height: auto;\
		border-style: solid;\
		border-width: 1px;\
		border-color: #888888;\
		padding: 5px;\
		background-color: #f0f0f0;\
		z-index: 1001;\
		color: #000000;\
	}\
	#kmlc_BasePanel {\
		font-size: 9px;\
		position: absolute;\
		top: 89px;\
		left: 1230px;\
		width: 200px;\
		height: auto;\
		border-style: solid;\
		border-width: 1px;\
		border-color: #888888;\
		padding: 5px;\
		background-color: #f0f0f0;\
		z-index: 1001;\
		color: #000000;\
		padding-right: 4px;\
		margin-right:5px;\
	}\
	#kmlc_LeftExtra img {\
		border-top: 1px solid #888888;\
		padding-bottom: 5px;\
	}\
	#kmlc_BasePanel img {\
		border-top: 1px solid #888888;\
		padding-bottom: 5px;\
	}';
	
//extended:
	if(GM_getValue("extendToggle")){
		kmlc.extendBox().checked = true;
		kmlc.addExtend();
		//kmlc.addGHchartSection(kmlc.luckchartLeft,false);
		//kmlc.updateGameHist();
	}else{
		//kmlc.style.setAttribute('type', 'text/css');
		//kmlc.style.textContent = 'body { position: left; float: left; padding-left: 125px; !important}';
	}
	
	var SPEED = (GM_getValue("kmlc_speed")!=undefined) ? GM_getValue("kmlc_speed") : 1500;
		
	if (dojo.query(".iogc-GameWindow-status")[0].innerHTML.indexOf("running") !=-1 && kmlc.checkSeated() )	{ //refresh when seated and game is running
		kmlc.gameStatus = "corrupt";	// NB even after refresh while playing
		kmlc.luckBox().checked = true;
		kmlc.dataCorrupted = true;
		GM_log("CORRUPT data , refreshed during game: "+kmlc.dataCorrupted+" game="+kmlc.gameStatus+" -> watcher checkbox checked: "+kmlc.luckBox().checked);
	}else{	//not seated or not 
		kmlc.gameStatus = "ibg";
		kmlc.dataCorrupted = false;
	}
	
	GM_log("kmlc initiated succesfull. speed = "+SPEED);
		
///////############> main loop <############################################################################################################################						

//	kmlc.location = window.location.href;
	
	kmlc.loop = window.setInterval(
	function() {
if (kmlc.gameStatus !="ingame" || kmlc.luckBox().checked ){
		var el = dojo.query(".iogc-LoginPanel-nameHeading");	
		if(el.length < 1) { 	//check if user is logged out
			kmlc.gameStatus = "corrupt";
			GM_log("logged out, gameStatus= "+kmlc.gameStatus);		
			return;
		}
		if(dojo.query(".iogc-GameWindow-status").length < 1){
			kmlc.gameStatus = "corrupt";
			GM_log("opened table in another window?, gameStatus= "+kmlc.gameStatus);		
			return;
		}
		
		var tempScore;
		var box = kmlc.luckBox();
		var tableName = dojo.query(".gwt-Hyperlink.iogc-LoginPanl-item")[0].textContent;	//i only use this in one place
		kmlc.userStatus = dojo.query(".gwt-Label.iogc-LoginPanl-item")[0].innerHTML;	//	(watching) / (playing)
		kmlc.tableStatus = dojo.query(".iogc-GameWindow-status")[0].innerHTML.split(" ");	//	// kmlc.tableStatus[7] ==> waiting / running / paused 	
		var sitStatus = kmlc.checkSeated();
		
		if (kmlc.user != el[0].innerHTML){	//check if user is still same user
//			kmlc.gameStatus = "corrupt";
			//GM_log("user is different: "+kmlc.gameStatus);		
			kmlc.clearUserStats();					
			kmlc.user = el[0].innerHTML;	//set new user:
			kmlc.profileNR = dojo.byId("profileLink").innerHTML.split("/")[2].split(" ")[0].replace(/"/,"");
			if (kmlc.userStatus == "(playing)"){	//data could be incomplete so:
				box.checked = true;		//keeps showing stuff anyway
				//kmlc.gameStatus = "corrupt";
				kmlc.dataCorrupted = true;		//but it wont be stored.
				GM_log("different user -> "+kmlc.gameStatus+ " -> data corrupted: "+kmlc.dataCorrupted);	
			}
		
		}else if (kmlc.gameStatus == "ibg"){		//prepare playing:
			if (kmlc.userStatus == "(playing)"){
				if( sitStatus ){
					kmlc.location = window.location.href;
					if( kmlc.tableStatus[9] == "<b>paused</b>" || kmlc.tableStatus[6] == "waiting" ){//tournament or normal didn't start yet
						kmlc.dataCorrupted = false;				
						kmlc.clearUserStats();
						kmlc.tagAllRows();	// dont care about old stuff..
						kmlc.gameStatus = "seated";
						GM_log("waiting for game to start: ibg -> "+kmlc.gameStatus+" ,corrupt= "+kmlc.dataCorrupted);	
					}else if (kmlc.tableStatus[7] == "running" || kmlc.tableStatus[9] == "running" ){	//game started straight away.
						kmlc.gameStatus = "ingame";
						//kmlc.dataCorrupted = false;	
						kmlc.startTime=new Date().getTime(); // set start time
						GM_log("start playing (1) -> "+kmlc.gameStatus+" corrupt: "+kmlc.dataCorrupted);	
						box.checked = false;
					}else{	// this shouldnt happen.
						GM_log("WTF? playing seated and ibg= "+kmlc.gameStatus+"  kmlc.tableStatus= "+ kmlc.tableStatus);	
					}
				}else{ // sitStatus false. // possible seated at tourney, but not there yet.
						GM_log("playing= "+kmlc.userStatus+" during:"+ kmlc.gameStatus+", but not seated? "+ sitStatus);	
				}
			}
		} else if( kmlc.gameStatus=="seated"){
			if (kmlc.tableStatus[7] == "running" ||  kmlc.tableStatus[9] == "running"){		//game starts
				kmlc.gameStatus = "ingame";
				kmlc.startTime=new Date().getTime(); // set start time
				kmlc.dataCorrupted = false;				
				GM_log("start playing (2) seated==> "+kmlc.gameStatus);	
				box.checked = false;
			}else if (!kmlc.userStatus == "(playing)" || !sitStatus ){
				kmlc.dataCorrupted = true;				
				kmlc.gameStatus = "ibg";
				GM_log("you are seated elsewhere.. CORRUPT data, wrong location while playing: "+kmlc.gameStatus+" userStatus= "+kmlc.userStatus +"seated= "+sitStatus);	
			}else{
				//GM_log("status=seated but not running and not playing ?: "+kmlc.gameStatus);		

				kmlc.getCurrentLogs().forEach(function(node) {
					node.className="tagged"
					var content = node.innerHTML;
					if(content.indexOf(kmlc.user+" takes a seat") != -1) {			//// clear userdata when sitting down.
						kmlc.dataCorrupted = false;				
						kmlc.clearUserStats();
					}else if(content.indexOf(kmlc.user+" stands up") != -1) {
						kmlc.gameStatus = "ibg";
						GM_log("user stands up: "+kmlc.gameStatus);		
						kmlc.dataCorrupted = false;				
					}
				})
			}
		}else if (kmlc.gameStatus == "corrupt"){
			if (!sitStatus && !kmlc.userStatus == "(playing)"){
				kmlc.gameStatus = "ibg";	
				GM_log("gameStatus= "+kmlc.gameStatus);
			}
//			box.checked = true;		//keeps showing stuff anyway

		}else{
			GM_log("wtf is happening??? "+window.location.href+" }{ "+ tableName.replace(/ /g,"%20")+" }{ "+ kmlc.location+" }{ "+ kmlc.userStatus+" }{ "+ kmlc.tableStatus+" }{ "+sitStatus);
		
		}
}
 if (kmlc.gameStatus =="ingame" || kmlc.luckBox().checked ){
			if(window.location.href != kmlc.location && kmlc.gameStatus =="ingame"){;//|| (window.location.href.indexOf(tableName.replace(/ /g,"%20"))== -1 && kmlc.tableStatus[9] != "<b>paused</b>")) {		//visiting other tables while playing -> data could be incomplete/corrupted		//this also counts for multitabling..
				kmlc.dataCorrupted = true;	
				kmlc.gameStatus = "corrupt";	
				//GM_log("please refresh or game-data won't be saved. problem with tablename");
				GM_log("data CORRUPTED, wrong location while ingame: "+kmlc.gameStatus+" }{ "+window.location.href+" }{ "+ tableName.replace(/ /g,"%20")+" }{ "+ kmlc.location+" }{ "+ kmlc.userStatus+" }{ "+ kmlc.tableStatus+" }{ "+sitStatus);
		}
	var trigger=false;
		kmlc.getCurrentLogs().forEach(function(node) {
			node.className="tagged"
			var content = node.innerHTML;
			var tekst = node.textContent;

			if(content.indexOf(" takes a seat") != -1 && kmlc.luckBox().checked) {			//// clear userdata when somebody sits down and you are watching.
				kmlc.clearUserStats();
			}else if(content.indexOf(kmlc.user+" takes a seat") != -1) {			//// clear userdata when sitting down.
				kmlc.dataCorrupted = false;				
				kmlc.clearUserStats();
						
			}else if(content.indexOf(kmlc.user+" stands up") != -1) {
				kmlc.gameStatus = "ibg";
				//GM_log("user stands up: "+kmlc.gameStatus);		
				kmlc.dataCorrupted = false;			
							
			}else if(content.indexOf("'s turn") != -1) {		//// new player turn -> get number of attacking player:		
				kmlc.currentPlayer = node.getElementsByTagName("span")[0].innerHTML;	//=string
				kmlc.attPlayerNr = parseFloat(kmlc.getNrPlayer(content));	//=number
				if (kmlc.user == kmlc.currentPlayer){
					kmlc.playerNR = kmlc.attPlayerNr;
					kmlc.userColor1 = kmlc.getColorNR(kmlc.attPlayerNr,true);
					kmlc.userColor2 = kmlc.getColorNR(kmlc.attPlayerNr,false);					
				}
			}else if( (content.indexOf("defeated") != -1 || content.indexOf("defended") != -1)) {		//// new roll	==> get number of defending player >> get data of roll
				var userA = (kmlc.user == kmlc.currentPlayer);
				var userD = false;
				if (content.indexOf("neutral") != -1 ){
					kmlc.defPlayerName = "neutral";		//string	
					kmlc.defPlayerNr = 8;		//number									
				}else{
					kmlc.defPlayerName = node.getElementsByTagName("span")[0].innerHTML;		//string	
					kmlc.defPlayerName = kmlc.defPlayerName.substr(0, kmlc.defPlayerName.length-1);
					kmlc.defPlayerNr = parseFloat(kmlc.getNrPlayer(content));		//number									
					if (kmlc.user == kmlc.defPlayerName){
						kmlc.userColor1 = kmlc.getColorNR(kmlc.defPlayerNr,true);
						kmlc.userColor2 = kmlc.getColorNR(kmlc.defPlayerNr,false);
						kmlc.playerNR = kmlc.defPlayerNr;
						userD = true;
					}
				}
//// collecting data:				
				var resultString;
				var WLD;
				var number;
				var tt2 = tekst.split(" ");
				if (tt2.indexOf("defeated") != -1){
					resultString = "defeated";
					WLD = true;
					number = tt2.indexOf("defeated");
				}else if (tt2.indexOf("defended") != -1){
					resultString = "defended";
					WLD = false;
					if(resultAtt == resultDef)	resultString = "draw";						
					number= tt2.indexOf("defended");
				}		
				var tkst2 = tt2.slice(number+1);
				var versus = tkst2[0].split("");
					
				var versA = parseFloat(versus[0]);	//amount of diced rolls by attacker
				var versD = parseFloat(versus[2]);	//amount of dice rolled by defender
				var resultAtt = parseFloat(tkst2[1]);	
				var resultDef = parseFloat(tkst2[3].replace(",",""));							
			
////		 put that data in array:		0		1			2				3				4			5		6	 7		8
				kmlc.lastRoll= new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);

				kmlc.updateStats();	////	 update all data / charts:
				trigger=true;
					
			}else if(content.indexOf("Score") != -1) {	//save score
				tempScore = parseFloat(tekst.split(" ")[3].replace("+",""));	
			}else if(content.indexOf(kmlc.user +" finishes") != -1) {	//player is out
				var placement = tekst.split(" ")[(tekst.split(" ").indexOf("finishes")+1)];
 				if(kmlc.gameStatus=="ingame" && !kmlc.dataCorrupted){
					//if(	kmlc.tableStatus[2] == "tournament"){
						window.setTimeout(function(){ kmlc.storeMData(kmlc.tableStatus[2], tempScore,placement);} ,600);
					//}else{
						//kmlc.storeMData(kmlc.tableStatus[2], tempScore,placement);	
					//}
				}
				//i could set gamestatus to ibg here ? why didnt i ?
			}				
		})
//		if (kmlc.lastRoll.length >0){		//TODO ?
//			kmlc.updateStats();	//trying something: calculate only once stuff, if more than one attack occurred within .5 sec..
//		}
		if(trigger){
			kmlc.updateBars();
			trigger = false;	
		}
		
		
}
	}, SPEED)//3000)	//setting this to 100 causes major lag ingame.?? at least it did once for me.. 
}
}//end of main loop


///////##########################################################################################################################################> updateStats						
kmlc.updateStats = function(){
// simple mode:
	kmlc.updateLuckStats();	//chart1R data
	kmlc.updateADavgStat();	//chart3R data
	
	kmlc.updateHistData();	//chart2R data
	
	kmlc.updateWLDdata();	//just data for chart4L ,also for game history
//extended mode:						
	if(GM_getValue("extendToggle")){
		//for (a=0;a<kmlc.lasRoll.length;a++){	//TODO
			kmlc.updatePMrollsStat();	//bar1/2L data
			
			if (kmlc.lastRoll[3] == kmlc.playerNR || kmlc.lastRoll[2] == kmlc.playerNR){	
				kmlc.userColor1 = kmlc.getColorNR(kmlc.playerNR,true);
				kmlc.userColor2 = kmlc.getColorNR(kmlc.playerNR,false);
				kmlc.updateAvgRollStat();	//chart4Re
				kmlc.updateAvgADperDiceStat();	//chart5Re
			}
		//}
	}
}//end of updateStats
kmlc.updateBars = function(){
// simple mode:
	kmlc.updateLuckBar();	//chart1R bar
	kmlc.updateADavgBar();	//chart3R bar 
	
	kmlc.updateHistBar();	//chart2R bar
	
//extended mode:						
	if(GM_getValue("extendToggle")){
		//for (a=0;a<kmlc.lasRoll.length;a++){	//TODO
			kmlc.updatePMrollsBar();	//bar1/2L
			kmlc.luckNAD();		//chart3L bar 
			
			if (kmlc.lastRoll[3] == kmlc.playerNR || kmlc.lastRoll[2] == kmlc.playerNR){	
				kmlc.userColor1 = kmlc.getColorNR(kmlc.playerNR,true);
				kmlc.userColor2 = kmlc.getColorNR(kmlc.playerNR,false);
				kmlc.updateAvgRollBar();	//chart4Re
				kmlc.updateAvgADperDiceBar();	//chart5Re
			}
			kmlc.updateWLDbar();	//chart4L bar
		//}
	}
}//end of updateStats
						
///////#################################################################################################################################################################################################################> resetGameStats						
//kmlc.logAllArrays = new function(){
//	GM_log("log all arrays");
//
//	GM_log("<<<<< logAllArrays >>>> kmlc.playerLuck= "+kmlc.playerLuck+" kmlc.AvPeDiU="+	kmlc.AvPeDiU+" kmlc.playerAvgDice="+kmlc.playerAvgDice+" kmlc.pmRollsArray="+kmlc.pmRollsArray+" kmlc.avgPerAttDefArray="+kmlc.avgPerAttDefArray+" kmlc.WLDarray="+kmlc.WLDarray );
//	
//	GM_log("<<<<< logAllArrays 2>>>> kmlc.HistColA="+	kmlc.HistColA+" kmlc.HistColD="+kmlc.HistColD+" kmlc.HattBar="+	kmlc.HattBar+" 	kmlc.HdefBar="+	kmlc.HdefBar+" kmlc.HattDice="+kmlc.HattDice+" kmlc.HdefDice="+kmlc.HdefDice );
//	
//	GM_log("<<<<< logAllArrays 3>>>>  kmlc.HistColAU="+kmlc.HistColAU+" kmlc.HistColDU="+kmlc.HistColDU+" kmlc.HattBarU="+kmlc.HattBarU+"	kmlc.HdefBarU="+kmlc.HdefBarU+"	kmlc.HattDiceU="+kmlc.HattDiceU+" kmlc.HdefDiceU="+	kmlc.HdefDiceU	);
//	
//}
kmlc.clearUserStats = function(){
	//luck all players
	kmlc.playerLuck =[  [ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ]  ];	
	
	//average per dice user
	kmlc.AvPeDiU = [  [ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0] ], [ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0] ]  ];
	
	//average per roll all players
	kmlc.playerAvgDice=[	[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	,[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	];

	// plus/minus rolls:	
	kmlc.pmRollsArray = [ [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ],[ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ] ];
	
	//average for each roll user only
	kmlc.avgPerAttDefArray =	[	[	[1,2,3,4,5,6,7,8], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	], [	[1,2,3,4,5,6,7,8], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	]	];
	
	//history bar
	kmlc.WLDarray = [ [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0], [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0] ];
	kmlc.HistColA = new Array();
	kmlc.HistColD = new Array();
	kmlc.HattBar = new Array();
	kmlc.HdefBar = new Array();
	kmlc.HattDice = new Array();
	kmlc.HdefDice = new Array();
	//history bar user only:
	kmlc.HistColAU = new Array();
	kmlc.HistColDU = new Array();
	kmlc.HattBarU = new Array();
	kmlc.HdefBarU = new Array();
	kmlc.HattDiceU = new Array();
	kmlc.HdefDiceU = new Array();
					
}
kmlc.resetAllData = function(){
	if (confirm("This will delete all your monthly game data on this account. This can't be undone. Are you sure you wanna do this?") ){
		GM_log("all data of this month is deleted");
		kmlc.removeCookie();
		kmlc.clearUserStats();
		
		var d = new Date();
		var year = d.getYear();
		var month = d.getMonth()+1;
		localStorage.removeItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month); //reset localStorage for the month.	
	}
}


///////########################################################################################################################################################################///////> bar/data update functions

///////############> game history <############################################################################################################################
kmlc.getPPM = function(){
	var d=new Date();
		var year = d.getYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
	var MDataObj = kmlc.getMData(year,month);
	var gameAmount = Object.size(MDataObj);
	var totTime=0, totPoints=0, tourneyTime=0;
	for (var g=1; g<=gameAmount; g++){
			//GM_log("test 15 17 == "+MDataObj["G"+g][15]+" <> "+MDataObj["game"+g][17] );
		if (MDataObj["G"+g][17] > 0){
			if(MDataObj["G"+g][0] != 6000){
				totTime += MDataObj["G"+g][17];
				totPoints += MDataObj["G"+g][15];			
			}else if(MDataObj["G"+g][0] == 6000){	//tourney	 wait for payout.. :P
				tourneyTime += MDataObj["G"+g][17];
				if(MDataObj["G"+g][0] != 6000){
					totTime += tourneyTime;
					totPoints += MDataObj["G"+g][15]; // -buyin TODO
				}
			}
		}
	}
			//GM_log("test inside == "+totPoints+" <> "+totTime );
	var PPM = Math.floor(totPoints/(totTime/60));
	return PPM;
}
kmlc.updateGameHist = function(){
	if(window.location.href.indexOf("stats")!= -1){	//check if on stats page
		var chartlen = 800;
		var charthght = 150;
	}else{
		var chartlen = 200;
		var charthght = 100;
	}
	
	var d=new Date();
		var year = d.getYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
	var MDataObj = kmlc.getMData(year,month);
	var gameAmount = Object.size(MDataObj);



//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]	[gametime]	[month, date, game]
//					0												1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16	  17		18		19		20
	var sel1 = dojo.byId('GameHistSelection1').value;	//	1	/	4	/	7
	var sel2 = dojo.byId('GameHistSelection2').value;	//	8000=all	7000=tables		6000=tourneys	 5000 ... 0
	var sel3 = dojo.byId('GameHistSelection3').value;	//	colors/playernr:  0 1 2 3 4 5 6 7	all: 10
	var num = dojo.byId("numberMode").checked;	//on/off

	var colors = new Array();
	var colors2 = new Array();
	var tempArray = new Array();
	var tempArray2 = new Array();
	var tempArray3 = new Array();
	var tempArray4 = new Array();
	var tempArray5 = new Array();
	var tempArray6 = new Array(); var tempArray10= new Array(); var tempArray11= new Array(); var tempArray12 = new Array();
///////############> <#######################################################################################################################						
	if (sel1 == 1){		//luck:
		var maxL= 0;	var minL= 100;
		for (var g=1; g<=gameAmount; g++){
			if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
				if (MDataObj["G"+g][2] > 0){
					if (MDataObj["G"+g][2] > maxL) maxL=MDataObj["G"+g][2];
					if (MDataObj["G"+g][2] < minL) minL=MDataObj["G"+g][2];
				}	
				tempArray.push(MDataObj["G"+g][2]);
				if (MDataObj["G"+g][3] > 0){
					if (MDataObj["G"+g][3] > maxL) maxL=MDataObj["G"+g][3];
					if (MDataObj["G"+g][3] < minL) minL=MDataObj["G"+g][3];
				}	
				tempArray2.push(MDataObj["G"+g][3]);
				if (MDataObj["G"+g][4] > 0){
					if (MDataObj["G"+g][4] > maxL) maxL=MDataObj["G"+g][4];
					if (MDataObj["G"+g][4] < minL) minL=MDataObj["G"+g][4];
				}	
				tempArray3.push(MDataObj["G"+g][4]);
				
				tempArray10.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11] ));
				tempArray11.push( (MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
				tempArray12.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11]+MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
				
				colors.push(kmlc.getColorNR(MDataObj["G"+g][1],true));
				colors2.push(kmlc.getColorNR(MDataObj["G"+g][1],false));
			}
		}

	if (minL > (100-maxL)) {	maxL = Math.ceil(maxL/5)*5;		minL = 100-maxL;
	}else if (minL < (100-maxL)) {	minL = Math.floor(minL/5)*5;	maxL = 100-minL;	}
		
	if (!num){
		var gameHistBar ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+(charthght+20)+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t:"+ tempArray.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=game+history%3A+luck+percentages&chts=000000,11";
		
		var gameHistBar2 ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t:"+ tempArray2.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
		
		var gameHistBar3 ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t:"+ tempArray3.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
	}else if (num){
		var gameHistBar ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+","+0+","+999+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+(charthght+20)+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t1:"+ tempArray.slice(-30)+"|"+ tempArray12.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,666666,0,0.5:0.5,1,-1&chtt=game+history%3A+luck+percentages&chts=000000,11";
		
		var gameHistBar2 ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+","+0+","+999+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t1:"+ tempArray2.slice(-30)+"|"+ tempArray10.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,666666,0,0.5:0.5,1,-1";
		
		var gameHistBar3 ="http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,"+minL+","+maxL+"&chds="+minL+","+maxL+","+0+","+999+"&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chd=t1:"+ tempArray3.slice(-30)+"|"+ tempArray11.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,666666,0,0.5:0.5,1,-1";
	
	}
	

///////############> <#######################################################################################################################						
	}else if (sel1 == 4){		//avg:
	//	if (sel2 > 6000){
			for (var g=1; g<=gameAmount; g++){
				if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
					if (MDataObj["G"+g][7]>0){	tempArray.push(MDataObj["G"+g][5]/MDataObj["G"+g][7]);	}else{ tempArray.push(0);}
					if (MDataObj["G"+g][8]>0){	tempArray2.push(MDataObj["G"+g][6]/MDataObj["G"+g][8]);	}else{ tempArray2.push(0);}
					if (MDataObj["G"+g][7]+MDataObj["G"+g][8]>0){ tempArray3.push( (MDataObj["G"+g][5]+MDataObj["G"+g][6])/(MDataObj["G"+g][7]+MDataObj["G"+g][8]) ); }else{ tempArray3.push(0);}
					colors.push(kmlc.getColorNR(MDataObj["G"+g][1],true));
					colors2.push(kmlc.getColorNR(MDataObj["G"+g][1],false));
					
					tempArray10.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11] ));
					tempArray11.push( (MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
					tempArray12.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11]+MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
				}
			}
		
		//scale:	
		var maxR= 0; var minR= 100;
		for(r=0;r<7;r++){
			if(tempArray[r]>0){
				if (tempArray[r] > maxR) maxR=tempArray[r];
				if (tempArray[r] < minR) minR=tempArray[r];	
			}
			if(tempArray2[r]>0){
				if (tempArray2[r] > maxR) maxR=tempArray2[r];
				if (tempArray2[r] < minR) minR=tempArray2[r];	
			}
			if(tempArray3[r]>0){
				if (tempArray3[r] > maxR) maxR=tempArray3[r];
				if (tempArray3[r] < minR) minR=tempArray3[r];	
			}
		}
		
		if (minR > (7-maxR)) {
			maxR = Math.ceil(maxR*2)/2;
			minR = 7-maxR;
		}else if (minR < (7-maxR)) {
			minR = Math.floor(minR*2)/2;
			maxR = 7-minR;
		}
		if (!num){
			var gameHistBar= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+(chartlen+20)+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+minR+","+maxR+"&chd=t:"+tempArray3.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=game+history%3A+roll+averages&chts=000000,12";
			var gameHistBar2= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+minR+","+maxR+"&chd=t:"+tempArray.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
			var gameHistBar3= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+minR+","+maxR+"&chd=t:"+tempArray2.slice(-30)+"&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
		
		}else if (num){
		
			var gameHistBar= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+(charthght+20)+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+0+","+999+"&chd=t1:"+tempArray3.slice(-30)+"|"+ tempArray12.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,aaaaaa,0,0.5:0.5,1,-1&chtt=game+history%3A+roll+averages&chts=000000,12";
		
			var gameHistBar2= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+0+","+999+"&chd=t1:"+tempArray.slice(-30)+"|"+ tempArray10.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,aaaaaa,0,0.5:0.5,1,-1";
		
			var gameHistBar3= "http://chart.apis.google.com/chart?chxr=0,1,6&chxs=0,000000,10,1,lt,676767&chxt=y&chbh=a,0,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco="+colors.slice(-30).toString().replace(/,/g, "|")+"&chds="+minR+","+maxR+","+0+","+999+"&chd=t1:"+tempArray2.slice(-30)+"|"+ tempArray11.slice(-30)+"&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,0,-1,10|N,000000,1,-1,10,1,s::-10|h,aaaaaa,0,0.5:0.5,1,-1";
		
		}
		
///////############> <#######################################################################################################################						
	}else if (sel1 == 7){		//WLD:
		var tempArray4= new Array(); var tempArray5= new Array(); var tempArray6= new Array(); var tempArray7= new Array(); var tempArray8= new Array(); var tempArray9 = new Array(); var tempArray9D = new Array();
	
		var tota,maxa,totd,maxd,tots,maxs;
//			if (sel2 > 6000){
			for (var g=1; g<=gameAmount; g++){
				if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
					tota =  (MDataObj["G"+g][9] +MDataObj["G"+g][10]+ MDataObj["G"+g][11] > 20) ? (MDataObj["G"+g][9] +MDataObj["G"+g][10]+ MDataObj["G"+g][11]) : 1;
					maxa = (tota==1) ? tota : 20;
					tempArray.push((maxa * MDataObj["G"+g][9])/tota);
					tempArray2.push((maxa * MDataObj["G"+g][10])/tota);
					tempArray3.push((maxa * MDataObj["G"+g][11])/tota);
					
					totd =  (MDataObj["G"+g][12] +MDataObj["G"+g][13]+ MDataObj["G"+g][14] > 20) ? (MDataObj["G"+g][12] +MDataObj["G"+g][13]+ MDataObj["G"+g][14]) : 1;
					maxd = (totd==1) ? totd : 20;
					tempArray4.push((maxd * MDataObj["G"+g][12])/totd);
					tempArray5.push((maxd * MDataObj["G"+g][13])/totd);
					tempArray6.push((maxd * MDataObj["G"+g][14])/totd);

					tots =  (MDataObj["G"+g][9] +MDataObj["G"+g][10]+ MDataObj["G"+g][11] +MDataObj["G"+g][12] +MDataObj["G"+g][13]+ MDataObj["G"+g][14] > 20) ? (MDataObj["G"+g][9] +MDataObj["G"+g][10]+ MDataObj["G"+g][11] +MDataObj["G"+g][12] +MDataObj["G"+g][13]+ MDataObj["G"+g][14]) : 1;
					maxs = (tots==1) ? tots : 20;
					//wins ok
					tempArray7.push((maxs * (MDataObj["G"+g][12]+MDataObj["G"+g][9]))/tots);	
					//losses ok
					tempArray8.push((maxs * (MDataObj["G"+g][13]+MDataObj["G"+g][10]))/tots);
					//draw Att = loss
					tempArray9.push((maxs * (MDataObj["G"+g][11]))/tots);
					//draw Def = win
					tempArray9D.push((maxs * (MDataObj["G"+g][14]))/tots);
					
					colors.push(kmlc.getColorNR(MDataObj["G"+g][1],true));
					colors2.push(kmlc.getColorNR(MDataObj["G"+g][1],false));
					
					tempArray10.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11] ));
					tempArray11.push( (MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
					tempArray12.push( (MDataObj["G"+g][9]+MDataObj["G"+g][10]+MDataObj["G"+g][11]+MDataObj["G"+g][12]+MDataObj["G"+g][13]+MDataObj["G"+g][14] ));
					
				}
			}
	
		if (!num){
			var gameHistBar = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+(charthght+20)+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",333333,888888,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray7.slice(-30)+"|"+tempArray9D.slice(-30)+"|"+tempArray9.slice(-30)+"|"+tempArray8.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12&chtt=game+history%3A+Win+Draw+Loss&chts=000000,12";
			
			var gameHistBar2 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",888888,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray.slice(-30)+"|"+tempArray3.slice(-30)+"|"+tempArray2.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12";
			
			var gameHistBar3 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",333333,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20&chd=t:"+tempArray4.slice(-30)+"|"+tempArray6.slice(-30)+"|"+tempArray5.slice(-30)+"&chdlp=b&chg=20,10,2,2&chma=12";
		}else if (num){
			var gameHistBar = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+(charthght+20)+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",333333,888888,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20,0,20,"+0+","+999+"&chd=t4:"+tempArray7.slice(-30)+"|"+tempArray9D.slice(-30)+"|"+tempArray9.slice(-30)+"|"+tempArray8.slice(-30)+"|"+tempArray12.slice(-30)+"&chdlp=b&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,4,-1,10,1,s::-10&chtt=game+history%3A+Win+Draw+Loss&chts=000000,12";
			
			var gameHistBar2 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",888888,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20,"+0+","+999+"&chd=t3:"+tempArray.slice(-30)+"|"+tempArray3.slice(-30)+"|"+tempArray2.slice(-30)+"|"+tempArray10.slice(-30)+"&chdlp=b&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,3,-1,10,1,s::-10";
			
			var gameHistBar3 = "http://chart.apis.google.com/chart?chxs=0,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco="+colors.slice(-30).toString().replace(/,/g, "|")+",333333,"+colors2.slice(-30).toString().replace(/,/g, "|")+"&chds=0,20,0,20,0,20,"+0+","+999+"&chd=t3:"+tempArray4.slice(-30)+"|"+tempArray6.slice(-30)+"|"+tempArray5.slice(-30)+"|"+tempArray11.slice(-30)+"&chdlp=b&chg=16.7,10,2,2&chma=0,0,0,12&chm=N,000000,3,-1,10,1,s::-10";
		}	
	
///////############> COCO ^^ <#######################################################################################################################						
	}else if (sel1 == 8){
	
//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]
//					0												1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16		
		tempArray = [	[	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0	], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0	], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0	], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0	],
						[	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0], [	0,0,0,0,0,	0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0]		];
		var tota,maxa,totd,maxd,tots,maxs;
		for (var g=1; g<=gameAmount; g++){
			if(	 (  (sel2 == 7000 && MDataObj["G"+g][0] < 6000)  ||	(sel2 == 8000 && MDataObj["G"+g][0] < sel2)  ||  (sel2 <= 6000 && MDataObj["G"+g][0] == sel2) 		)	&&  (MDataObj["G"+g][1] == sel3 || sel3 == 10) ){	
				tempArray[MDataObj["G"+g][1]][0]++;
				//luck:
				if (MDataObj["G"+g][2] > 0){
					tempArray[MDataObj["G"+g][1]][21]++;
					tempArray[MDataObj["G"+g][1]][2] += MDataObj["G"+g][2];
				}
				if (MDataObj["G"+g][2] > 0){
					tempArray[MDataObj["G"+g][1]][22]++;
					tempArray[MDataObj["G"+g][1]][3] += MDataObj["G"+g][3];
				}
				if (MDataObj["G"+g][2] > 0){
					tempArray[MDataObj["G"+g][1]][23]++;
					tempArray[MDataObj["G"+g][1]][4] += MDataObj["G"+g][4];
				}
				//result:
				tempArray[MDataObj["G"+g][1]][5] += MDataObj["G"+g][5];
				tempArray[MDataObj["G"+g][1]][6] += MDataObj["G"+g][6];
				//dice rolled:
				tempArray[MDataObj["G"+g][1]][7] += MDataObj["G"+g][7];
				tempArray[MDataObj["G"+g][1]][8] += MDataObj["G"+g][8];
				//tot win
				tempArray[MDataObj["G"+g][1]][9] += MDataObj["G"+g][9];
				tempArray[MDataObj["G"+g][1]][10] += MDataObj["G"+g][10];
				//tot loose
				tempArray[MDataObj["G"+g][1]][11] += MDataObj["G"+g][11];
				tempArray[MDataObj["G"+g][1]][12] += MDataObj["G"+g][12];
				//tot draw
				tempArray[MDataObj["G"+g][1]][13] += MDataObj["G"+g][13];
				tempArray[MDataObj["G"+g][1]][14] += MDataObj["G"+g][14];
			}
		}
		for (p=0;p<7;p++){		
			//avg luck all/att/def
			tempArray[7][21] += tempArray[p][21];//counters
			tempArray[7][22] += tempArray[p][22];
			tempArray[7][23] += tempArray[p][23];
			
			tempArray[7][2] += tempArray[p][2];//lucks
			tempArray[7][3] += tempArray[p][3];
			tempArray[7][4] += tempArray[p][4];
			//avg roll att/def/all
			tempArray[7][5] += tempArray[p][5];
			tempArray[7][6] += tempArray[p][6];
			tempArray[7][7] += tempArray[p][7];
			tempArray[7][8] += tempArray[p][8];
			
			tempArray[7][9] += tempArray[p][9];
			tempArray[7][10] += tempArray[p][10];
			tempArray[7][11] += tempArray[p][11];
			tempArray[7][12] += tempArray[p][12];
			tempArray[7][13] += tempArray[p][13];
			tempArray[7][14] += tempArray[p][14];
			//total win/loose/draw
			tempArray[7][18] += tempArray[p][9]+tempArray[p][12];
			tempArray[7][19] += tempArray[p][10]+tempArray[p][13];
			tempArray[7][20] += tempArray[p][11]+tempArray[p][14];	
			
			//avg luck all/att/def
			tempArray[p][2] = tempArray[p][2]/tempArray[p][21];
			tempArray[p][3] = tempArray[p][3]/tempArray[p][22];
			tempArray[p][4] = tempArray[p][4]/tempArray[p][23];
			//avg roll att/def/all
			tempArray[p][15] = tempArray[p][5]/tempArray[p][7];	
			tempArray[p][16] = tempArray[p][6]/tempArray[p][8];	
			tempArray[p][17] = (tempArray[p][5]+tempArray[p][6])/(tempArray[p][7]+tempArray[p][8]);
			//total win/loose/draw
			tempArray[p][18] = tempArray[p][9]+tempArray[p][12];
			tempArray[p][19] = tempArray[p][10]+tempArray[p][13];
			tempArray[p][20] = tempArray[p][11]+tempArray[p][14];	
			
			tempArray12.push( (tempArray[p][9]+tempArray[p][10]+tempArray[p][11]+tempArray[p][12]+tempArray[p][13]+tempArray[p][14] ));
			tempArray10.push( (tempArray[p][9]+tempArray[p][10]+tempArray[p][11]+tempArray[p][12]+tempArray[p][13]+tempArray[p][14] ));
			tempArray10.push( (tempArray[p][9]+tempArray[p][10]+tempArray[p][11] ));
			tempArray10.push( (tempArray[p][12]+tempArray[p][13]+tempArray[p][14] ));
		}
		//avg luck all/att/def
		tempArray[7][2] = tempArray[7][2]/tempArray[7][21];
		tempArray[7][3] = tempArray[7][3]/tempArray[7][22];
		tempArray[7][4] = tempArray[7][4]/tempArray[7][23];
		//avg roll att/def/all
		tempArray[7][15] = tempArray[7][5]/tempArray[7][7];	
		tempArray[7][16] = tempArray[7][6]/tempArray[7][8];	
		tempArray[7][17] = (tempArray[7][5]+tempArray[7][6])/(tempArray[7][7]+tempArray[7][8]);
		//total win/loose/draw
		tempArray[7][18] = tempArray[7][9]+tempArray[7][12];
		tempArray[7][19] = tempArray[7][10]+tempArray[7][13];
		tempArray[7][20] = tempArray[7][11]+tempArray[7][14];
				
		tempArray12.push( (tempArray[7][9]+tempArray[7][10]+tempArray[7][11]+tempArray[7][12]+tempArray[7][13]+tempArray[7][14] ));
		tempArray10.push( (tempArray[7][9]+tempArray[7][10]+tempArray[7][11]+tempArray[7][12]+tempArray[7][13]+tempArray[7][14] ));
		tempArray10.push( (tempArray[7][9]+tempArray[7][10]+tempArray[p][11] ));
		tempArray10.push( (tempArray[7][12]+tempArray[7][13]+tempArray[7][14] ));
		
		var luckarray1 = new Array();	var avgarray1 = new Array();
		var wdlarray1 = new Array();	var wdlarray2 = new Array();	var wdlarray4 = new Array();	var wdlarray3=new Array();	var wdlarray3D=new Array();
		var tota,maxa;
		for(y=0;y<8;y++){
			luckarray1.push(tempArray[y][2]);
			luckarray1.push(tempArray[y][3]);
			luckarray1.push(tempArray[y][4]);
			
			avgarray1.push(tempArray[y][15]);
			avgarray1.push(tempArray[y][16]);
			avgarray1.push(tempArray[y][17]);
		
			tots =  (tempArray[y][18] +tempArray[y][19]+ tempArray[y][20] > 20) ? (tempArray[y][18] +tempArray[y][19]+ tempArray[y][20]) : 1;
			maxs = (tota==1) ? tots : 20;
			wdlarray1.push(kmlc.roundDec( (maxs * tempArray[y][18])/tots,2));
			wdlarray2.push(kmlc.roundDec((maxs * tempArray[y][19])/tots,2));
			wdlarray3.push(kmlc.roundDec((maxs * tempArray[y][11])/tots,2));
			wdlarray3D.push(kmlc.roundDec((maxs * tempArray[y][14])/tots,2));
			wdlarray4.push(tots);
					
			tota =  (tempArray[y][9] +tempArray[y][10]+ tempArray[y][11] > 20) ? (tempArray[y][9] +tempArray[y][10]+ tempArray[y][11]) : 1;
			maxa = (tota==1) ? tota : 20;
			wdlarray1.push(kmlc.roundDec((maxa * tempArray[y][9])/tota,2));
			wdlarray2.push(kmlc.roundDec((maxa * tempArray[y][10])/tota,2));
			wdlarray3.push(kmlc.roundDec((maxa * tempArray[y][11])/tota,2));
			wdlarray3D.push(0);
			wdlarray4.push(tota);
					
			totd =  (tempArray[y][12] +tempArray[y][13]+ tempArray[y][14] > 20) ? (tempArray[y][12] +tempArray[y][13]+ tempArray[y][14]) : 1;
			maxd = (tota==1) ? tota : 20;
			wdlarray1.push(kmlc.roundDec((maxd * tempArray[y][12])/totd,2));
			wdlarray2.push(kmlc.roundDec((maxd * tempArray[y][13])/totd,2));
			wdlarray3D.push(kmlc.roundDec((maxd * tempArray[y][14])/totd,2));
			wdlarray3.push(0);
			wdlarray4.push(totd);
		}
			
		if (num==0){
			var gameHistBar ="http://chart.apis.google.com/chart?chxr=0,"+0+","+100+"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y&chbh=a,1,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco=BF3069|BF3069|da94a6|30BF69|30BF69|94cAa6|9E30BF|9E30BF|b894cA|cebf30|cebf30|d0ca94|3069BF|3069BF|94a6cA|9A6654|9A6654|bA9482|30B1BF|30B1BF|a4d0dA|666666|666666|888888&chd=t1:"+ luckarray1+"9&chg=4.17,20,2,2&chds="+0+","+100+"&chtt=all+%2B+att+%2B+def+luck&chts=000000,11&chm=h,888888,0,0.5:0.5,1,-1";

			var gameHistBar2 = "http://chart.apis.google.com/chart?chxr="+0+","+1+","+6+",1&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y&chbh=a,1,1&chs="+chartlen+"x"+charthght+"&cht=bvg&chco=BF3069|BF3069|da94a6|30BF69|30BF69|94cAa6|9E30BF|9E30BF|b894cA|cebf30|cebf30|d0ca94|3069BF|3069BF|94a6cA|9A6654|9A6654|bA9482|30B1BF|30B1BF|a4d0dA|666666|666666|888888|CCCCCC&chd=t:"+avgarray1+"&chg=4.17,20,2,2&chds="+1+","+6+","+1+","+6+"&chtt=all+%2B+att%2Fdef+averages&chts=000000,11&chm=h,888888,0,0.5:0.5,1,-1";
						
			var gameHistBar3 = 	"http://chart.apis.google.com/chart?chxr=0,0,100&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y&chbh=a,1,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco=BF3069|BF3069|BF3069|30BF69|30BF69|30BF69|9E30BF|9E30BF|9E30BF|cebf30|cebf30|cebf30|3069BF|3069BF|3069BF|9A6654|9A6654|9A6654|30B1BF|30B1BF|30B1BF|666666|666666|666666,333333,888888,da94a6|da94a6|da94a6|94cAa6|94cAa6|94cAa6|b894cA|b894cA|b894cA|d0ca94|d0ca94|d0ca94|94a6cA|94a6cA|94a6cA|bA9482|bA9482|bA9482|a4d0dA|a4d0dA|a4d0dA|aaaaaa|aaaaaa|aaaaaa&chds=0,20,0,20,0,20,0,20,"+0+","+99999+"&chd=t4:"+wdlarray1+"|"+wdlarray3D+"|"+wdlarray3+"|"+wdlarray2+"&chdlp=b&chma=12&chtt=win%2Fdraw%2Floss+of+all+%2B+att+%2B+def+rolls&chts=000000,11";
		
		}else if(num==1){
			var gameHistBar ="http://chart.apis.google.com/chart?chxr=0,"+0+","+100+"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y&chbh=a,0,3&chs="+chartlen+"x"+(20+charthght)+"&cht=bvg&chco=BF3069|BF3069|da94a6|30BF69|30BF69|94cAa6|9E30BF|9E30BF|b894cA|cebf30|cebf30|d0ca94|3069BF|3069BF|94a6cA|9A6654|9A6654|bA9482|30B1BF|30B1BF|a4d0dA|666666|666666|888888|CCCCCC&chd=t1:"+ luckarray1+"|"+tempArray10 +"&chg=4.17,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chds="+0+","+100+","+0+","+9999+"&chtt=all+%2B+att+%2B+def+luck&chts=000000,11&chma=0,0,0,12&chm=h,888888,0,0.5:0.5,1,-1|N,000000,0,-1,10,1,::20|N,000000,1,-1,10,1,s::-10";
	
			var gameHistBar2 ="http://chart.apis.google.com/chart?chxr=0,"+1+","+6+"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y&chbh=a,0,3&chs="+chartlen+"x"+(charthght+20)+"&cht=bvg&chco=BF3069|BF3069|da94a6|30BF69|30BF69|94cAa6|9E30BF|9E30BF|b894cA|cebf30|cebf30|d0ca94|3069BF|3069BF|94a6cA|9A6654|9A6654|bA9482|30B1BF|30B1BF|a4d0dA|666666|666666|888888|CCCCCC&chd=t1:"+ avgarray1+"|"+tempArray10 +"&chg=4.17,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chds="+1+","+6+","+0+","+9999+"&chtt=all+%2B+att+%2B+def+averages&chts=000000,11&chma=0,0,0,12&chm=h,888888,0,0.5:0.5,1,-1|N,000000,0,-1,10,1,::20|N,000000,1,-1,10,1,s::-10";

			var gameHistBar3 = 	"http://chart.apis.google.com/chart?chxr=0,0,100&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y&chbh=a,3,0&chs="+chartlen+"x"+charthght+"&cht=bvs&chco=BF3069|BF3069|BF3069|30BF69|30BF69|30BF69|9E30BF|9E30BF|9E30BF|cebf30|cebf30|cebf30|3069BF|3069BF|3069BF|9A6654|9A6654|9A6654|30B1BF|30B1BF|30B1BF|666666|666666|666666,333333,888888,da94a6|da94a6|da94a6|94cAa6|94cAa6|94cAa6|b894cA|b894cA|b894cA|d0ca94|d0ca94|d0ca94|94a6cA|94a6cA|94a6cA|bA9482|bA9482|bA9482|a4d0dA|a4d0dA|a4d0dA|aaaaaa|aaaaaa|aaaaaa&chds=0,20,0,20,0,20,0,20,"+0+","+99999+"&chd=t4:"+wdlarray1+"|"+wdlarray3D+"|"+wdlarray3+"|"+wdlarray2+"|"+wdlarray4 +"&chdlp=b&chg=14.29,25,2,2&chma=12&chtt=win%2Fdraw%2Floss+of+all+%2B+att+%2B+def+rolls&chts=000000,11&chma=0,0,0,12&chm=N,000000,4,-1,11,1,::-10";
		
		}
	}
	kmlc.chart5L.src = gameHistBar;
	kmlc.chart6L.src = gameHistBar2;
	kmlc.chart7L.src = gameHistBar3;
	MDataObj = null;
}

///////############> +-rolls stats <###########################################################################################################################
kmlc.updateAvgRollStat = function(){
//									0		 1		 2					 3				4		 5		  6		7		8
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//		kmlc.avgPerAttDefArray =	[	[	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	], [	[0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0], [0,0,0,0, 0,0,0,0]	]	];
	var DA = (kmlc.lastRoll[7]) ? 0 : 1;
	var sR = kmlc.lastRoll[DA] -1;
	kmlc.avgPerAttDefArray[DA][1][sR]++;
	kmlc.avgPerAttDefArray[DA][2][sR] += kmlc.lastRoll[DA+4];		
	kmlc.avgPerAttDefArray[DA][0][sR] = (kmlc.avgPerAttDefArray[DA][1][sR] >= sR+1 ) ? sR+1 : kmlc.avgPerAttDefArray[DA][2][sR] / kmlc.avgPerAttDefArray[DA][1][sR];		
}
kmlc.updateAvgRollBar = function(){

	var barAvgPerRollUser = "http://chart.apis.google.com/chart?chxp=0,12,24,36,48&chxr=0,0,48|1,1,8&chxs=0,333333,9,0,lt,333333|1,333333,9,0,l,333333&chxt=y,x&chbh=8,0,6&chs=200x120&cht=bvg&chco="+kmlc.userColor1+","+kmlc.userColor2+",000000&chds=0,48,0,48,0,48,0,48&chd=t2:"+kmlc.avgPerAttDefArray[0][0]+"|"+kmlc.avgPerAttDefArray[1][0]+"|3.5,7,10.5,14,17.5,21,24.5,28&chdlp=b&chg=12.5,12.5,2,2&chma=5&chm=H,666666,2,,1:22,-1|H,666666,3,,1:22,-1|H,666666,4,,1:22,&chtt=(4)+Average+per+Att/Def+Roll&chts=000000,10";
	kmlc.chart4Re.src = barAvgPerRollUser;
}

///////############> win/loose/draw bar per player <###########################################################################################################			
kmlc.updateWLDdata = function(){	
//	kmlc.WLDarray = [ [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0], [0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0] ];
//	attker win(0 , loose(1 , draw(2, defender win(3, loose(4, draw(5
	
	if (kmlc.lastRoll[6]){	//attacker wins
		kmlc.WLDarray[0][kmlc.lastRoll[2]]++;	//attacker +1 win
		kmlc.WLDarray[4][kmlc.lastRoll[3]]++;	//defender +1 loss
	}else if (kmlc.lastRoll[4] == kmlc.lastRoll[5]){	//draw
		kmlc.WLDarray[2][kmlc.lastRoll[2]]++;	//draw attacker = loss	//attacker +1 draw
		kmlc.WLDarray[5][kmlc.lastRoll[3]]++;	//draw defender = win	//defender +1 draw
	}else if (!kmlc.lastRoll[6]){	//defender wins
		kmlc.WLDarray[1][kmlc.lastRoll[2]]++;	//attacker +1 loss
		kmlc.WLDarray[3][kmlc.lastRoll[3]]++;	//defender +1 win
	}
}
kmlc.updateWLDbar = function(){	
	var WLDwin = new Array();
	var WLDloose = new Array();
	var WLDdraw = new Array();
	var maxa, tota, maxd, totd;
	for (p=0;p<7;p++){
		tota =  (kmlc.WLDarray[0][p] +kmlc.WLDarray[1][p]+ kmlc.WLDarray[2][p] > 15) ? (kmlc.WLDarray[0][p] +kmlc.WLDarray[1][p]+ kmlc.WLDarray[2][p]) : 1;
		maxa = (tota==1) ? tota : 20;
		WLDwin.push((maxa * kmlc.WLDarray[0][p])/tota);
		WLDloose.push((maxa * kmlc.WLDarray[1][p])/tota);
		WLDdraw.push((maxa * kmlc.WLDarray[2][p])/tota);
		
		totd =  (kmlc.WLDarray[3][p] +kmlc.WLDarray[4][p]+ kmlc.WLDarray[5][p] > 15) ? (kmlc.WLDarray[3][p] +kmlc.WLDarray[4][p]+ kmlc.WLDarray[5][p]) : 1;
		maxd = (totd==1) ? totd : 20;
		WLDwin.push((maxd * kmlc.WLDarray[3][p])/totd);
		WLDloose.push((maxd * kmlc.WLDarray[4][p])/totd);
		WLDdraw.push((maxd * kmlc.WLDarray[5][p])/totd);
	}
	var barWLD = "http://chart.apis.google.com/chart?chxr=0,0,15&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y,r&chbh=a,2,4&chs=200x90&cht=bvs&chco=BF3069|BF3069|30BF69|30BF69|9E30BF|9E30BF|cebf30|cebf30|3069BF|3069BF|9A6654|9A6654|30B1BF|30B1BF,333333,da94a6|da94a6|94cAa6|94cAa6|b894cA|b894cA|d0ca94|d0ca94|94a6cA|94a6cA|bA9482|bA9482|a4d0dA|a4d0dA&chds=0,15,0,30,0,15&chd=t:"+WLDwin+"|"+WLDdraw+"|"+WLDloose +"&chdlp=b&chg=14.29,25,2,2&chma=12&chtt=(9)+win%2Floose%2Fdraw+of+att%2Fdef+rolls&chts=000000,11";
	kmlc.chart4L.src = barWLD;
}

///////############> average per att/def dice per sort of roll user <##########################################################################################		
kmlc.updateAvgADperDiceStat = function(){	
//									0		 1		 2					 3				4		 5		  6		7		8
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);		
		
//		kmlc.AvPeDiU = [	[ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0] ], [ [0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0],[0,0,0,0, 0,0,0,0 ,0]] 	];
//			[att / def]	[current average / counter / total result] [1...8,avg]
		var DA;
		if (kmlc.lastRoll[3] == kmlc.playerNR){	DA = 1;
		}else if (kmlc.lastRoll[2] == kmlc.playerNR){	DA=0;	}
		var dices = kmlc.lastRoll[DA];
				
		kmlc.AvPeDiU[DA][1][dices-1] += dices;	
		kmlc.AvPeDiU[DA][2][dices-1] += kmlc.lastRoll[4+DA];
		kmlc.AvPeDiU[DA][0][dices-1] = (kmlc.AvPeDiU[DA][2][dices-1] > 0) ? (kmlc.AvPeDiU[DA][2][dices-1] / kmlc.AvPeDiU[DA][1][dices-1]) : 0;
		
		//average:
		kmlc.AvPeDiU[DA][1][8] += dices;
		kmlc.AvPeDiU[DA][2][8] += kmlc.lastRoll[4+DA];
		kmlc.AvPeDiU[DA][0][8] = (kmlc.AvPeDiU[DA][2][8] > 0) ?  (kmlc.AvPeDiU[DA][2][8] / kmlc.AvPeDiU[DA][1][8]) : 0;
}
kmlc.updateAvgADperDiceBar = function(){	
	var barAvgPerDiceUser = "http://chart.apis.google.com/chart?chxl=1:|1|2|3|4|5|6|7|8|avg&chxr=0,1,6|1,1,9&chds=0,1,6&chxs=0,000000,9,0,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=8,0,4&chs=200x120&cht=bvg&chco="+kmlc.userColor1+","+kmlc.userColor2+"&chd=t:"+kmlc.AvPeDiU[0][0]+"|"+kmlc.AvPeDiU[1][0]+"&chg=11.11,20,2,2&&chds=1,6&chm=h,666666,0,0.5:0.5,1,-1&chtt=(5)+average+of+att%2Fdef+dice,+user+only&chts=000000,10";
	kmlc.chart5Re.src = barAvgPerDiceUser;	
}

///////############> history rolls DATA<#######################################################################################################################						
kmlc.updateHistData = function(){
//									0		1		2				3				4			5		  6		7		8
//		var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
		
	kmlc.HattDice.push(kmlc.lastRoll[0]);
	kmlc.HdefDice.push(kmlc.lastRoll[1]);
	kmlc.HattBar.push((kmlc.lastRoll[4] / kmlc.lastRoll[0])-1);
	kmlc.HdefBar.push(1-(kmlc.lastRoll[5] / kmlc.lastRoll[1]) );
	kmlc.HistColA.push(kmlc.getColorNR(kmlc.lastRoll[2],kmlc.lastRoll[6]));
	kmlc.HistColD.push(kmlc.getColorNR(kmlc.lastRoll[3],(!kmlc.lastRoll[6])));
	if(kmlc.HattDice.length > 25){
		kmlc.HattDice.shift();
		kmlc.HdefDice.shift();
		kmlc.HattBar.shift();
		kmlc.HdefBar.shift();
		kmlc.HistColA.shift();
		kmlc.HistColD.shift();
	}
	
	if (kmlc.lastRoll[3] == kmlc.playerNR || kmlc.lastRoll[2] == kmlc.playerNR){
		kmlc.HattDiceU.push(kmlc.lastRoll[0]);
		kmlc.HdefDiceU.push(kmlc.lastRoll[1]);
		kmlc.HattBarU.push((kmlc.lastRoll[4] / kmlc.lastRoll[0])-1);
		kmlc.HdefBarU.push(1-(kmlc.lastRoll[5] / kmlc.lastRoll[1]) );
		kmlc.HistColAU.push(kmlc.getColorNR(kmlc.lastRoll[2],kmlc.lastRoll[6]));
		kmlc.HistColDU.push(kmlc.getColorNR(kmlc.lastRoll[3],(!kmlc.lastRoll[6])));
		if(kmlc.HattDiceU.length > 25){
			kmlc.HattDiceU.shift();
			kmlc.HdefDiceU.shift();
			kmlc.HattBarU.shift();
			kmlc.HdefBarU.shift();
			kmlc.HistColAU.shift();
			kmlc.HistColDU.shift();
		}
	}
}
///////############> history rolls BAR<############################################################################################################################			
kmlc.updateHistBar = function(){			
	if (kmlc.histAllOrUser){			
		var fullHistBar = "http://chart.apis.google.com/chart?chxl=0:|6|3.5|1|3.5|6&chxr=0,-6,6&chxs=0,333333,9,0,l,333333&chxt=y&chbh=a,1,1&chs=200x150&cht=bvs&chco="+kmlc.HistColA.slice(-25).toString().replace(/,/g, "|")+","+kmlc.HistColD.slice(-25).toString().replace(/,/g, "|")+"&chds=-5,5,-5,5,1,8,1,8&chd=t2:"+kmlc.HattBar.slice(-25)+"|"+kmlc.HdefBar.slice(-25)+"|"+kmlc.HattDice.slice(-25)+"|"+kmlc.HdefDice.slice(-25)+"&chg=20,0,2,2&chma=0,0,0,30&chm=h,333333,0,0.5:0.5,1|N,000000,2,-1,10,1,s::-58|N,000000,3,-1,10,1,s::-70|h,666666,0,0.25:0.25:1,1,-1|h,666666,0,0.75:0.75,1,-1&chtt=(2)+Roll+History&chts=000000,11";
	}else if(!kmlc.histAllOrUser){
		var fullHistBar = "http://chart.apis.google.com/chart?chxl=0:|6|3.5|1|3.5|6&chxr=0,-6,6&chxs=0,333333,9,0,l,333333&chxt=y&chbh=a,1,1&chs=200x150&cht=bvs&chco="+kmlc.HistColAU.slice(-25).toString().replace(/,/g, "|")+","+kmlc.HistColDU.slice(-25).toString().replace(/,/g, "|")+"&chds=-5,5,-5,5,1,8,1,8&chd=t2:"+kmlc.HattBarU.slice(-25)+"|"+kmlc.HdefBarU.slice(-25)+"|"+kmlc.HattDiceU.slice(-25)+"|"+kmlc.HdefDiceU.slice(-25)+"&chg=20,0,2,2&chma=0,0,0,30&chm=h,333333,0,0.5:0.5,1|N,000000,2,-1,10,1,s::-58|N,000000,3,-1,10,1,s::-70|h,666666,0,0.25:0.25:1,1,-1|h,666666,0,0.75:0.75,1,-1&chtt=(2)+Roll+History&chts=000000,11";		
	}
	kmlc.chart2R.src = fullHistBar;
}

///////############> avg per dice per player <#################################################################################################################	
kmlc.updateADavgStat = function(){	
//										0		1			2				3				4			5		6	 7		8
//			kmlc.lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//			kmlc.playerAvgDice [playerNR] [0)current average Attack, 1)total result att, 2)counter of dice,	  3)total result def, 4)counter of dice, 5)current average Defend ]

//	[att/def] [playernr] [counter/result/

//		kmlc.playerAvgDice=[	[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	,[	[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0],[0,0,0,0,  0,0,0,0, 0]	]	];
		
	var At = kmlc.lastRoll[2];
	var Df = kmlc.lastRoll[3];
	//att
	kmlc.playerAvgDice[0][2][At] += kmlc.lastRoll[0]; //counter dice rolled	//2
	kmlc.playerAvgDice[0][1][At] += kmlc.lastRoll[4];	//result dice	//1
	if(kmlc.playerAvgDice[0][2][At] > 0){
		kmlc.playerAvgDice[0][0][At] = kmlc.playerAvgDice[0][1][At] / kmlc.playerAvgDice[0][2][At];
	}
	//def
	kmlc.playerAvgDice[1][2][Df] += kmlc.lastRoll[1]; //counter dice rolled	//2
	kmlc.playerAvgDice[1][1][Df] += kmlc.lastRoll[5];	//result dice	//1
	if(kmlc.playerAvgDice[1][2][Df] > 0){
		kmlc.playerAvgDice[1][0][Df] = kmlc.playerAvgDice[1][1][Df] / kmlc.playerAvgDice[1][2][Df];
	}
	//avg
	kmlc.playerAvgDice[0][2][7] += kmlc.lastRoll[0];
	kmlc.playerAvgDice[0][1][7] += kmlc.lastRoll[4];
	if (kmlc.playerAvgDice[0][2][7] > 0){
		kmlc.playerAvgDice[0][0][7] = kmlc.playerAvgDice[0][1][7] / kmlc.playerAvgDice[0][2][7];
	}
	kmlc.playerAvgDice[1][2][7] += kmlc.lastRoll[1];
	kmlc.playerAvgDice[1][1][7] += kmlc.lastRoll[5];
	if (kmlc.playerAvgDice[1][2][7] > 0){
		kmlc.playerAvgDice[1][0][7] = kmlc.playerAvgDice[1][1][7] / kmlc.playerAvgDice[1][2][7];
	}
}
kmlc.updateADavgBar = function(){	
	
	//check for min max values to scale barchart:
	var max3= 0;
	var min3 = 100;
	for (ll=0;ll<7;ll++){
		for(r=0;r<2;r++){
			if (kmlc.playerAvgDice[r][0][ll] > 0){	//def
				if (kmlc.playerAvgDice[r][0][ll] > max3) max3=kmlc.playerAvgDice[r][0][ll];
				if (kmlc.playerAvgDice[r][0][ll] < min3) min3=kmlc.playerAvgDice[r][0][ll];
			}
		}
	}
	
	if (min3 > (7-max3)) {
		max3 = Math.ceil(max3*2)/2;
		min3 = 7-max3;
	}else if (min3 < (7-max3)) {
		min3 = Math.floor(min3*2)/2;
		max3 = 7-min3;
	}
	var numOffset1, numOffset2;
	switch (min3){
		case 1.5: numOffset1=16;	numOffset2=6;
		break;
		case 2: numOffset1=38;	numOffset2=28;
		break;
		case 2.5: numOffset1=79;	numOffset2=69;
		break;
		case 3: numOffset1=200;	numOffset2=190;
		break;
		default: numOffset1=4;	numOffset2=-6;
	}
	
//// bar chart for average roll per color
	var barChart1 = "http://chart.apis.google.com/chart?chxr=0,"+min3+","+max3+"&chxs=0,000000,11,1,lt,676767&chxt=y&chbh=a,0,7&chs=200x120&cht=bvg&chco=BF3069|30BF69|9E30BF|CEBF30|3069BF|9A6654|30B1BF|333333,DA94A6|94CAA6|B894CA|D0CA94|94A6CA|BA9482|A4D0DA|666666|CCCCCC&chds="+min3+","+max3+","+min3+","+max3+"&chd=t:"+kmlc.playerAvgDice[0][0]+"|"+kmlc.playerAvgDice[1][0]+"&chg=11.11,20,2,2&chma=0,0,0,24&chm=h,666666,0,0.5:0.5,1,-1|N*2*,000000,0,-1,9,1,s:3:"+numOffset1+"|N*2*,000000,1,-1,9,1,s:-3:"+numOffset2+"&chtt=(3)+average+of+att%2Fdef+dice&chts=000000,12";

	kmlc.chart3R.src = barChart1;	
}

///////############> all luck percentage per player <############################################################################################################################
kmlc.updateLuckStats = function(){
//	[	allluck 	perc[0,0,0,0, 0,0,0, 0,0]	counters[0,0,0,0, 0,0,0, 0,0]	arrays[[],[],[],[], [],[],[], [],[]]	]
//		kmlc.playerLuck =[  [ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ],	[ [0,0,0,0, 0,0,0, 0,0], [0,0,0,0, 0,0,0, 0,0], [[0],[0],[0],[0], [0],[0],[0], [0],[0]] ]  ];	
//		kmlc.playerLuck [all / att / def] [current perc, counter, array] [player nr]

	var vsA = kmlc.lastRoll[0];
	var vsD = kmlc.lastRoll[1];
	var resA = kmlc.lastRoll[4];
	var resD = kmlc.lastRoll[5];
	var WLD = kmlc.lastRoll[6];
	// calculating luck of the Roll:
	var luckRollA = 0;	
	if (WLD){
		luckRollA = 100 - parseFloat(kmlc.rollStats[vsA-2][vsD-1]);	
	}else if(!WLD){
		luckRollA = 0 - parseFloat(kmlc.rollStats[vsA-2][vsD-1]);
	}			
	var luckRollD = 0;	
	if (!WLD){
		luckRollD = parseFloat(kmlc.rollStats[vsA-2][vsD-1]);
	}else if(WLD){
		luckRollD = 0 - (100 - parseFloat(kmlc.rollStats[vsA-2][vsD-1]) );	
	}
	
	//luck players
	kmlc.playerLuck[0][1][kmlc.lastRoll[2]]++;
	kmlc.playerLuck[0][2][kmlc.lastRoll[2]] = ( (kmlc.playerLuck[0][2][kmlc.lastRoll[2]] *(kmlc.playerLuck[0][1][kmlc.lastRoll[2]]-1))+ luckRollA) / kmlc.playerLuck[0][1][kmlc.lastRoll[2]];
	//										(	(							current avg	* counter-1										) + new roll	) / counter				
	kmlc.playerLuck[0][1][kmlc.lastRoll[3]]++;	
	kmlc.playerLuck[0][2][kmlc.lastRoll[3]] = (( kmlc.playerLuck[0][2][kmlc.lastRoll[3]] *(kmlc.playerLuck[0][1][kmlc.lastRoll[3]]-1))+luckRollD ) / kmlc.playerLuck[0][1][kmlc.lastRoll[3]];	
			
	//luck att def:			*experimental*
	kmlc.playerLuck[1][1][kmlc.lastRoll[2]]++;
	kmlc.playerLuck[1][2][kmlc.lastRoll[2]] = (( kmlc.playerLuck[1][2][kmlc.lastRoll[2]] *(kmlc.playerLuck[1][1][kmlc.lastRoll[2]]-1))+luckRollA ) / kmlc.playerLuck[1][1][kmlc.lastRoll[2]];	
			
	kmlc.playerLuck[2][1][kmlc.lastRoll[3]]++;	
	kmlc.playerLuck[2][2][kmlc.lastRoll[3]] = (( kmlc.playerLuck[2][2][kmlc.lastRoll[3]] *(kmlc.playerLuck[2][1][kmlc.lastRoll[3]]-1))+luckRollD ) / kmlc.playerLuck[2][1][kmlc.lastRoll[3]];
				
	//avg att/def
	kmlc.playerLuck[1][1][7]++;
	kmlc.playerLuck[1][2][7] = (( kmlc.playerLuck[1][2][7] *(kmlc.playerLuck[1][1][7]-1))+luckRollA ) / kmlc.playerLuck[1][1][7];
				
	kmlc.playerLuck[2][1][7]++;	
	kmlc.playerLuck[2][2][7] = (( kmlc.playerLuck[2][2][7] *(kmlc.playerLuck[2][1][7]-1))+luckRollD ) / kmlc.playerLuck[2][1][7];
	
	kmlc.playerLuck[0][0][kmlc.lastRoll[2]] = (kmlc.playerLuck[0][1][kmlc.lastRoll[2]] != 0) ? (kmlc.playerLuck[0][0][kmlc.lastRoll[2]] = (100+( kmlc.playerLuck[0][2][kmlc.lastRoll[2]] ) ) /2) : 0;
	kmlc.playerLuck[0][0][kmlc.lastRoll[3]] = (kmlc.playerLuck[0][1][kmlc.lastRoll[3]] != 0) ? (kmlc.playerLuck[0][0][kmlc.lastRoll[3]] = (100+( kmlc.playerLuck[0][2][kmlc.lastRoll[3]] ) ) /2) : 0;

	//att/def luck//		
	kmlc.playerLuck[1][0][kmlc.lastRoll[2]] = (kmlc.playerLuck[1][1][kmlc.lastRoll[2]] != 0) ? (kmlc.playerLuck[1][0][kmlc.lastRoll[2]] = (100+( kmlc.playerLuck[1][2][kmlc.lastRoll[2]] ) ) /2) : 0;
	kmlc.playerLuck[2][0][kmlc.lastRoll[3]] = (kmlc.playerLuck[2][1][kmlc.lastRoll[3]] != 0) ? (kmlc.playerLuck[2][0][kmlc.lastRoll[3]] = (100+( kmlc.playerLuck[2][2][kmlc.lastRoll[3]] ) ) /2) : 0;
	//avg att/def luck:
	kmlc.playerLuck[1][0][7] = (100+( kmlc.playerLuck[1][2][7])) /2;
	kmlc.playerLuck[2][0][7] = (100+( kmlc.playerLuck[2][2][7])) /2;
}
kmlc.updateLuckBar = function(){
	var maxL= 0;
	var minL = 100;
	for (ll=0;ll<7;ll++){
		if (kmlc.playerLuck[0][0][ll] > 0){
			if (kmlc.playerLuck[0][0][ll] > maxL) maxL=kmlc.playerLuck[0][0][ll];
			if (kmlc.playerLuck[0][0][ll] < minL) minL=kmlc.playerLuck[0][0][ll];
		}
	}
	
	if (minL > (100-maxL)) {
		maxL = Math.ceil(maxL/5)*5;
		minL = 100-maxL;
	}else if (minL < (100-maxL)) {
		minL = Math.floor(minL/5)*5;
		maxL = 100-minL;
	}
	
	var barAvgLuckPerUser ="http://chart.apis.google.com/chart?chof=png&chxl=1:||||players||||all|grey&chxr=0,"+minL+","+maxL+"|1,1,9&chds="+minL+","+maxL +	"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=13,0,6&chs=200x120&cht=bvg&chco=BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC&chd=t:"+ kmlc.playerLuck[0][0] +"&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1|N*0*,000000,0,-1,11&chtt=(1)+Luck+Percentage&chts=000000,11";
	kmlc.chart1R.src = barAvgLuckPerUser;	
}

///////############> att/def luck percentage per player <############################################################################################################################
kmlc.luckNAD = function(){	
			
	var maxL= 0;
	var minL = 100;
	for (ll=0;ll<7;ll++){
		if (kmlc.playerLuck[1][0][ll] > 0){
			if (kmlc.playerLuck[1][0][ll] > maxL) maxL=kmlc.playerLuck[1][0][ll];
			if (kmlc.playerLuck[1][0][ll] < minL) minL=kmlc.playerLuck[1][0][ll];
		}
		if (kmlc.playerLuck[2][0][ll] > 0){
			if (kmlc.playerLuck[2][0][ll] > maxL) maxL=kmlc.playerLuck[2][0][ll];
			if (kmlc.playerLuck[2][0][ll] < minL) minL=kmlc.playerLuck[2][0][ll];
		}
	}	
		
	if (minL > (100-maxL)) {
		maxL = Math.ceil(maxL/5)*5;
		minL = 100-maxL;
	}else if (minL < (100-maxL)) {
		minL = Math.floor(minL/5)*5;
		maxL = 100-minL;
	}
		var barAllAttDefluck ="http://chart.apis.google.com/chart?chxl=1:||||players||||all|grey&chxr=0,"+minL+","+maxL+"&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=a,1,4&chs=200x120&cht=bvg&chco=BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC,BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC,da94a6|94cAa6|b894cA|d0ca94|94a6cA|bA9482|a4d0dA|666666|CCCCCC&chds="+minL+","+maxL+"&chd=t:"+ kmlc.playerLuck[0][0]+"|"+kmlc.playerLuck[1][0]+"|"+kmlc.playerLuck[2][0] +"&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=(8)all+%2B+att%2Fdef+luck&chts=000000,11";
		kmlc.chart3L.src = barAllAttDefluck;	
}
	
///////############> +-rolls stats <############################################################################################################################			
kmlc.updatePMrollsStat = function(){		
//			var lastRoll = new Array(versA, versD, kmlc.attPlayerNr, kmlc.defPlayerNr, resultAtt, resultDef, WLD, userA, userD);
//		kmlc.pmRollsArray = [ [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ],[ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ] ];
//			kmlc.pmRollsArray [all/user] [win,loose,draw] [-7 ... 7]

	var wld = (kmlc.lastRoll[6]) ? 0 : ((kmlc.lastRoll[4]==kmlc.lastRoll[5]) ? 2 : 1);	//if win > 0 // if loss > 1 if draw > 2
	
	if( kmlc.lastRoll[2] == kmlc.playerNR || kmlc.lastRoll[3] == kmlc.playerNR ){
		kmlc.pmRollsArray[1][wld][kmlc.lastRoll[0]-kmlc.lastRoll[1]+7]++;
	}else{
		kmlc.pmRollsArray[0][wld][kmlc.lastRoll[0]-kmlc.lastRoll[1]+7]++;
	}
}
kmlc.updatePMrollsBar = function(){		
	var barDataRolla0 = new Array();
	var barDataRolla1 = new Array();
	var barDataRolla2 = new Array();
	var barDataRollu0 = new Array();
	var barDataRollu1 = new Array();
	var barDataRollu2 = new Array();
	var tot;
	barDataRolls1 = kmlc.pmRollsArray[0][0];
	var lim=20;//more than 20 > calc perc
	for (c=0;c<15;c++){		
		//all players
		tot=kmlc.pmRollsArray[0][0][c] + kmlc.pmRollsArray[0][1][c]+kmlc.pmRollsArray[0][2][c];
		if (tot > lim){
			barDataRolla0.push((lim*kmlc.pmRollsArray[0][0][c])/tot);
			barDataRolla1.push((lim*kmlc.pmRollsArray[0][1][c])/tot);
			barDataRolla2.push((lim*kmlc.pmRollsArray[0][2][c])/tot);
		}else{
			barDataRolla0.push(kmlc.pmRollsArray[0][0][c] );
			barDataRolla1.push(kmlc.pmRollsArray[0][1][c] );
			barDataRolla2.push(kmlc.pmRollsArray[0][2][c] );
		}
		// user only
		tot=kmlc.pmRollsArray[1][0][c] + kmlc.pmRollsArray[1][1][c]+kmlc.pmRollsArray[1][2][c];
		if (tot > lim){
			barDataRollu0.push((lim*kmlc.pmRollsArray[1][0][c])/tot);
			barDataRollu1.push((lim*kmlc.pmRollsArray[1][1][c])/tot);
			barDataRollu2.push((lim*kmlc.pmRollsArray[1][2][c])/tot);
		}else{
			barDataRollu0.push(kmlc.pmRollsArray[1][0][c] );
			barDataRollu1.push(kmlc.pmRollsArray[1][1][c] );
			barDataRollu2.push(kmlc.pmRollsArray[1][2][c] );
		}
	}
			
	var barChart2 = "http://chart.apis.google.com/chart?chxr=0,-7,7|2,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,l,676767|2,333333,9,0,l,676767&chxt=x,r,y&chbh=a,2,4&chs=200x120&cht=bvs&chco=55DD55,333333,DD5555&chds=0,20,0,20,0,20&chd=t:"+barDataRolla0+"|"+barDataRolla2+"|"+barDataRolla1 +"&chdl=won|lost|draw&chdlp=b&chma=12&chg=6.667,20,2,2&chtt=(6)+win%2Floss%2Fdraw+of+att+rolls%2C+all+players&chts=000000,11";
	kmlc.chart1L.src = barChart2;
	
	var barChart2U = "http://chart.apis.google.com/chart?chxr=0,-7,7|2,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,l,676767|2,333333,9,0,l,676767&chxt=x,r,y&chbh=a,2,4&chs=200x100&cht=bvs&chco=55DD55,333333,DD5555&chds=0,20,0,20,0,20&chd=t:"+barDataRollu0+"|"+barDataRollu2+"|"+barDataRollu1 +"&chdlp=b&chma=12&chg=6.667,20,2,2&chtt=(7)+win%2Floss%2Fdraw+of+att+rolls%2C+all+players&chts=000000,11";
	kmlc.chart2L.src = barChart2U;
}
	
///////############> other functions+stuff <####################################################################################################################################					
kmlc.moreChartsToggle = function(){		// MOAAARRRRR charts.	
	if (GM_getValue("extendToggle")){
		GM_setValue("extendToggle",false);
		document.body.removeChild(dojo.byId("kmlc_LeftExtra"));
		kmlc.BasePanel().removeChild(dojo.byId("kmlc_RightExtra"));
	}else{
		GM_setValue("extendToggle",true);
		kmlc.addExtend();
		//kmlc.addGHchartSection(kmlc.luckchartLeft,false);
	}	 
}
kmlc.addExtend = function(){
	//Right Extra
	var divREx = kmlc.BasePanel().appendChild(document.createElement('div'));
	divREx.setAttribute('id', 'kmlc_RightExtra');
	
	var empty4 = "http://chart.apis.google.com/chart?chxp=0,12,24,36,48&chxr=0,0,48|1,1,8&chxs=0,333333,9,0,lt,333333|1,333333,9,0,l,333333&chxt=y,x&chbh=8,0,6&chs=200x120&cht=bvg&chco=333333,888888&chds=0,48,0,48,0,48,0,48&chd=t2:1,2,3,4,5,6,7,8|1,2,3,4,5,6,7,8|3.5,7,10.5,14,17.5,21,24.5,28&chdlp=b&chg=12.5,12.5,2,2&chma=5&chm=H,666666,2,,1:22,-1&chtt=(4)+Average+per+Att/Def+Roll&chts=000000,10";
	var empty5 = "http://chart.apis.google.com/chart?chxl=1:|1|2|3|4|5|6|7|8|avg&chxr=0,1,6|1,1,9&chds=0,1,6&chxs=0,000000,9,0,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=8,0,4&chs=200x120&cht=bvg&chco=333333,888888&chd=t:0,3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5|3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5,3.5&chg=11.11,20,2,2&chds=1,6&chm=h,666666,0,0.5:0.5,1,-1&chtt=(5)+average+of+att%2Fdef+dice,+user+only&chts=000000,10";
	
	kmlc.chart4Re = divREx.appendChild(document.createElement('img'));
	kmlc.chart4Re.src = empty4;
	kmlc.chart5Re = divREx.appendChild(document.createElement('img'));
	kmlc.chart5Re.src = empty5;

//// LEFT Panel
	var divLex = document.body.appendChild(document.createElement('div'));
	divLex.textContent = 'Draggable Area';
	divLex.setAttribute('id', 'kmlc_LeftExtra');
	divLex.setAttribute('style', 'z-index:1001; position:fixed; top: 89px; left: 10px; border:1px solid #888888; background:#f0f0f0; color:#000; padding:5px; width:200px; height:auto; text-align:center;');
	divLex.addEventListener('mousedown', function(e){kmlc.dragStart(e);}, false);

	var empty6 = "http://chart.apis.google.com/chart?chxr=0,-7,7|2,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,l,676767|2,333333,9,0,l,676767&chxt=x,r,y&chbh=a,2,4&chs=200x120&cht=bvs&chco=55DD55,333333,DD5555&chds=0,20,0,20,0,20&chd=t:0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0&chdl=won|lost|draw&chdlp=b&chma=12&chg=6.667,20,2,2&chtt=(6)+win%2Floss%2Fdraw+of+att+rolls,+all+players&chts=000000,11";
	var empty7 = "http://chart.apis.google.com/chart?chxr=0,-7,7|2,0,20&chxs=0,333333,9,0,lt,676767|1,333333,9,0,l,676767|2,333333,9,0,l,676767&chxt=x,r,y&chbh=a,2,4&chs=200x100&cht=bvs&chco=55DD55,333333,DD5555&chds=0,20,0,20,0,20&chd=t:0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0|0,0,0,0,0,0,0,0,0,0,0,0,0,0,0&chdlp=b&chma=12&chg=6.667,20,2,2&chtt=(7)+win%2Floss%2Fdraw+of+att+rolls,+all+players&chts=000000,11";
	var empty8 = "http://chart.apis.google.com/chart?chxl=1:||||players||||all|grey&chxr=0,0,100&chxs=0,000000,9,1,lt,676767|1,000000,9,0,lt,676767&chxt=y,x&chbh=a,1,4&chs=200x120&cht=bvg&chco=BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC,BF3069|30BF69|9E30BF|cebf30|3069BF|9A6654|30B1BF|666666|CCCCCC,da94a6|94cAa6|b894cA|d0ca94|94a6cA|bA9482|a4d0dA|666666|CCCCCC&chds=30,70&chd=t:50,50,50,50,50,50,50,50,50|50,50,50,50,50,50,50,50,0|50,50,50,50,50,50,50,50,50&chg=11.11,20,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=(8)all+%2B+att%2Fdef+luck&chts=000000,11";
	var empty9 = "http://chart.apis.google.com/chart?chxr=0,0,15&chxs=0,333333,9,0,lt,676767|1,333333,9,0,lt,676767&chxt=y,r&chbh=a,2,4&chs=200x90&cht=bvs&chco=&chds=0,15,0,30,0,15&chd=t:0|0|0&chdlp=b&chg=14.29,25,2,2&chma=12&chtt=(9)+win%2Floose%2Fdraw+of+att%2Fdef+rolls&chts=000000,11";

	kmlc.chart1L = divLex.appendChild(document.createElement('img'));
	kmlc.chart1L.src = empty6;
	
	kmlc.chart2L = divLex.appendChild(document.createElement('img'));
	kmlc.chart2L.src = empty7;
	
	kmlc.chart3L = divLex.appendChild(document.createElement('img'));
	kmlc.chart3L.src = empty8;
	
	kmlc.chart4L = divLex.appendChild(document.createElement('img'));
	kmlc.chart4L.src = empty9;
}
kmlc.addGHchartSection = function(div,numbersON){
	var empty10 = "http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,0,100&chds=0,100&chxt=y&chbh=a,0,1&chs=200x120&cht=bvg&chco=&chd=t:0&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1&chtt=game+history:+luck+percentages&chts=000000,11";
	var empty11 = "http://chart.apis.google.com/chart?chxs=0,000000,9,1,lt,676767&chxr=0,0,100&chds=0,100&chxt=y&chbh=a,0,1&chs=200x100&cht=bvg&chco=&chd=t:0&chg=20,10,2,2&chm=h,666666,0,0.5:0.5,1,-1";
	
	kmlc.chart5L = div.appendChild(document.createElement('img'));
	kmlc.chart5L.src = empty10;
	
	kmlc.chart6L = div.appendChild(document.createElement('img'));
	kmlc.chart6L.src = empty11;

	kmlc.chart7L = div.appendChild(document.createElement('img'));
	kmlc.chart7L.src = empty11;
	
	var divbox5R = div.appendChild(document.createElement('div'));
	divbox5R.setAttribute('id', 'divbox5R');
if(!numbersON){
	divbox5R.innerHTML = "<form id='gameHistSort1'>"+
	"<select type='select' name='gameHist01' id='GameHistSelection1'/> <option selected value=1>luck</> <option value=4>avg</> <option value=7>WDL</> <option value=8>coco</> </select>"+
	"<select type='select' name='gameHist02' id='GameHistSelection2'/> <option selected value=7000>tables</> <option value=0>0's</> <option value=100>100's</> <option value=500>500's</> <option value=2000>2000's</> <option value=5000>5000's</> <option value=6000>tournies</> <option value=8000>all</> </select>"+
	"<select type='select' name='gameHist03' id='GameHistSelection3'/> <option selected value=10>all</> <option value=0>red</> <option value=1>green</> <option value=2>purple</> <option value=3>yellow</> <option value=4>blue</> <option value=5>brown</> <option value=6>teal</> </select>"+
	"numbers:<input type='checkbox' id='numberMode'/>"+
	"</form>";
	
}else if(numbersON){
	divbox5R.innerHTML = "<form id='gameHistSort1'>"+
	"Show <select type='select' name='gameHist01' id='GameHistSelection1'/> <option selected value=1>luck</> <option value=4>avg</> <option value=7>WDL</> <option value=8>coco</> </select>"+
	"&nbsp; Sorted by table type: <select type='select' name='gameHist02' id='GameHistSelection2'/> <option selected value=7000>tables</> <option value=0>0's</> <option value=100>100's</> <option value=500>500's</> <option value=2000>2000's</> <option value=5000>5000's</> <option value=6000>tournies</> <option value=8000>all</> </select>"+
	" color: <select type='select' name='gameHist03' id='GameHistSelection3'/> <option selected value=10>all</> <option value=0>red</> <option value=1>green</> <option value=2>purple</> <option value=3>yellow</> <option value=4>blue</> <option value=5>brown</> <option value=6>teal</> </select>"+
	"&nbsp; Show numbers: <input type='checkbox' id='numberMode'/>"+
	"</form>";
	dojo.byId("numberMode").checked = true;
}
	dojo.connect(dojo.byId("gameHistSort1"), "onchange", null, kmlc.updateGameHist);
	

}

///////############> data storage functions <######################################################################################################################################				

kmlc.storeMData = function(arg,score,place){
	if (arg=="tournament"){
		kmlc.getCurrentLogs().forEach(function(node) {
			node.className="tagged"
			var tekst = node.textContent;
			GM_log("node test"+tekst);
			if(tekst.indexOf(user+" finishes the tournament") != -1) {
				place = tekst.split(" ")[(tekst.split(" ").indexOf("tournament")+1)];
				if(tekst.indexOf("and wins") != -1) {
					score = tekst.split(" ")[(tekst.split(" ").indexOf("wins")+1)]
					score = score.substring(0,score.length-4).replace(",","");
				}
			}

		})
	}
		
	//time and date stuff:
	var d = new Date();
	var year = d.getYear();
	var month = d.getMonth()+1;
	var day = d.getDate();

	//get localStorage of the month:
	var dataObject = kmlc.getMData(year,month);
	var gameNR = Object.size(dataObject)+1;

	//collect all data in one array:
	var gameTime = gt = (d.getTime() - kmlc.startTime)/1000;
	var S = Math.floor(gt % 60);
	gt /= 60;
	var M = Math.floor(gt % 60);
	gt /= 60;
	var H = Math.floor(gt % 24);
	GM_log("gameTime = "+H+":"+M+":"+S);
	var tableType = (kmlc.tableStatus[2] == "tournament") ? 6000 : kmlc.tableStatus[2];
	var tdr =  (kmlc.AvPeDiU[0][1][8] + kmlc.AvPeDiU[1][1][8]); // ?????
	//GM_log("game over. score="+score +",place="+place);
	var gameResult = new Array(tableType, kmlc.playerNR,  kmlc.roundDec(kmlc.playerLuck[0][0][kmlc.playerNR],1),  kmlc.roundDec(kmlc.playerLuck[1][0][kmlc.playerNR],1),  kmlc.roundDec(kmlc.playerLuck[2][0][kmlc.playerNR],1), 	 kmlc.playerAvgDice[0][1][kmlc.playerNR], kmlc.playerAvgDice[1][1][kmlc.playerNR],	kmlc.playerAvgDice[0][2][kmlc.playerNR], kmlc.playerAvgDice[1][2][kmlc.playerNR] ,kmlc.WLDarray[0][kmlc.playerNR], kmlc.WLDarray[2][kmlc.playerNR], kmlc.WLDarray[1][kmlc.playerNR], kmlc.WLDarray[4][kmlc.playerNR],kmlc.WLDarray[5][kmlc.playerNR],kmlc.WLDarray[3][kmlc.playerNR], score, place, Math.ceil(gameTime), month, day);
	
	//GM_log("GAMERESULT: tt: "+tableType+" player: "+ kmlc.playerNR+" luck: "+ kmlc.roundDec(kmlc.playerLuck[0][0][kmlc.playerNR],1)+" = "+ kmlc.roundDec(kmlc.playerLuck[1][0][kmlc.playerNR],1)+" / "+ kmlc.roundDec(kmlc.playerLuck[2][0][kmlc.playerNR],1)+" avg: "+kmlc.playerAvgDice[0][0][kmlc.playerNR]+" / "+ kmlc.playerAvgDice[1][0][kmlc.playerNR]+" total result: "+	 kmlc.playerAvgDice[0][1][kmlc.playerNR]+" / "+ kmlc.playerAvgDice[1][1][kmlc.playerNR] +" dice rolled: "+	 kmlc.playerAvgDice[0][2][kmlc.playerNR]+" / "+ kmlc.playerAvgDice[1][2][kmlc.playerNR] +"att WLD:"+kmlc.WLDarray[0][kmlc.playerNR]+" / "+ kmlc.WLDarray[2][kmlc.playerNR]+" / "+ kmlc.WLDarray[1][kmlc.playerNR]+" def WLD "+ kmlc.WLDarray[4][kmlc.playerNR]+" / "+ kmlc.WLDarray[5][kmlc.playerNR]+" / "+ kmlc.WLDarray[3][kmlc.playerNR])

//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]	[gametime]	[month, date, game]
//					0												1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16	  17		18		19		20
	
	//add new game data:
	dataObject["G"+gameNR] = gameResult;
	//store it:
	localStorage.setItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month, JSON.stringify(dataObject));
	
	GM_log("test localStorage.getItem test:"+ localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month) );
//	GM_log("test localStorage.getItem 2"+ localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month)[3] );


////how to access localStorage example:
//var jssstest = eval('(' + localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month) +')');
//GM_log("test localStorage.getItem 3"+ jssstest["G"+3][4] );
	kmlc.startTime = null;
	dataObject=null;

}
kmlc.getMData = function(year,month){
	var dataObject;
	if (localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month)){
		var dataString = localStorage.getItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month);
	//	GM_log("kmlc.getMData dataString= "+dataString+" localkey:"+localStorage.key(1));
		dataObject =  eval('(' + dataString +')');
	}else{
		dataObject ={};
	}
	return dataObject;
}
kmlc.checkOldCookie = function(){	//just to get data sofar saved in cookies and put it in localStorage.	//TODO, to be removed after a week or so.
	if (kmlc.getCookie() ){
		var cook = kmlc.getCookie().split(",");//get dataArray from cookie:
		var c = 0;
		var tempArray;

		//time and date stuff:
		var d = new Date();
		var year = d.getYear();
		var month = d.getMonth()+1;
		var day = d.getDate();
	GM_log("old cookie > "+'kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month)
		gameNR = 1;
		dataObject = {};

		for (var a = 0; a < (cook.length/17); a++ ) {
//	gameResult	[tournament / 0 / 100 / 500 / 2000 / 5000]		[color-NR]		[luck: all / att / def]		[result: att / def] 	[dice rolled: att / def]	[attWLD: W / L / D defWLD: W / L / D]		[score]	[place]		TODO[time] [turns]	[turns sat] [longest sit] [+Xrolls avg]	[...to be filled in future]
//					0												1			   		2	3		4				5		6						7	8				9	10	11			12	13	14			15	  16			17 		18 		19			20				21			22 till 30
			tempArray = new Array();
			for (var b = 0; b < 17; b++ ) {
				tempArray.push(parseFloat(cook[ (a*17)+b ]));
			}
			dataObject["G"+a] = tempArray;
		}
		localStorage.setItem('kmlc_'+kmlc.profileNR+"_y"+year+"_m"+month, JSON.stringify(dataObject)); 
	}
}

kmlc.getCookie = function() {	//TODO, to be removed after a week or so.
	var check_name = "kmlc_"+kmlc.profileNR;
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false;
	for ( i = 0; i < a_all_cookies.length; i++ ){
		a_temp_cookie = a_all_cookies[i].split( '=' );// now we'll split apart each name=value pair	
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');// and trim left/right whitespace while we're at it		
		if ( cookie_name == check_name ){// if the extracted name matches passed check_name
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 ){
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			return cookie_value;// note that in cases where cookie is initialized but no value, null is returned
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found ){	return null;	}
}
kmlc.removeCookie = function() {	//TODO, to be removed after a week or so.
	var c_name = "kmlc_"+kmlc.profileNR;
	var exdate=new Date();
	exdate.setDate(exdate.getDate()-1);
	var randomStuff = "blablabla";
	document.cookie = c_name+'='+randomStuff+ ";expires="+exdate.toUTCString()+";domain=" + ".kdice.com" ;
}

///////############> other functions <############################################################################################################################						
kmlc.getNrPlayer = function(con){	return con.slice(con.indexOf("span class=")+1).split("")[12];	}

kmlc.getColorNR = function(numb,AorD,WorL){
var color;
	switch (numb){
		case 0: color = (AorD) ? "BF3069" : "da94a6";
		break;
		case 1: color = (AorD) ? "30BF69" : "94cAa6";
		break;
		case 2: color = (AorD) ? "9E30BF" : "b894cA";
		break;
		case 3: color = (AorD) ? "cebf30" : "d0ca94";
		break;
		case 4: color = (AorD) ? "3069BF" : "94a6cA";
		break;
		case 5: color = (AorD) ? "9A6654" : "bA9482";
		break;
		case 6: color = (AorD) ? "30B1BF" : "a4d0dA";
		break;
		case 8:	color =  "CCCCCC";
		break;
		default: color="000000";
	}	
	return color;
}

//// checkbox functionality:
kmlc.luckBox = function() {return dojo.byId("luckMode")};
kmlc.extendBox = function() {return dojo.byId("extraMode")};

kmlc.BasePanel = function() {return dojo.byId("kmlc_BasePanel")};


kmlc.newScale1 = function(){	//chart2R
	if (dojo.byId('allNotUser').checked == true){
		kmlc.histAllOrUser = true;
	}else if (dojo.byId('userNotAll').checked == true){
		kmlc.histAllOrUser = false;
	}
	kmlc.updateHistBar();
}

kmlc.getCurrentLogs = function() {
	return dojo.query(".iogc-MessagePanel-messages tr:not([class='tagged'])");
}
kmlc.tagAllRows = function() {
	dojo.query(".iogc-MessagePanel-messages tr:not([class='tagged'])").forEach(function(node) {node.className="tagged"})
}

kmlc.checkSeated = function(){	//check if user is seated on table.
	var bool = false;
	var zaz = dojo.query(".iogc-PlayerPanel-name").forEach(function(node) {
		if (node.textContent == kmlc.user){	bool= true;}
	})
	return bool;
}

kmlc.roundDec = function(number, decimalPlaces){
	return Math.round(number*Math.pow(10, decimalPlaces))/Math.pow(10, decimalPlaces);
}
kmlc.extendedEncode = function(arrVals, maxVal) {//// extended encoding for charts:
	var EXTENDED_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
	var EXMAPL = EXTENDED_MAP.length;
	var chartData = '';

	for(i = 0, len = arrVals.length; i < len; i++) {
		// In case the array vals were translated to strings.
		var numericVal = new Number(arrVals[i]);
		// Scale the value to maxVal.
		var scaledVal = Math.floor(EXMAPL * EXMAPL * numericVal / maxVal);
		
		if(scaledVal > (EXMAPL * EXMAPL) - 1) {
			chartData += "..";
		} else if (scaledVal < 0) {
			chartData += '__';
		} else {
		// Calculate first and second digits and add them to the output.
		var quotient = Math.floor(scaledVal / EXMAPL);
		var remainder = scaledVal - EXMAPL * quotient;
		chartData += EXTENDED_MAP.charAt(quotient) + EXTENDED_MAP.charAt(remainder);
		}
	}
	return chartData;
}

/////// settings pop up:
kmlc.addSettings = function(){
	kmlc.formVis = false;
	var formdiv = document.body.appendChild(document.createElement('div'));
	formdiv.setAttribute('id', 'kmlc_formDIV');
	formdiv.setAttribute('style','display:none; z-index:99; position:fixed; top:0px; left:'+((window.innerWidth/2)-200)+'px; width:400px; height:auto; background-color:#f0f0f0; border: 1px solid #888888; text-align:center; font-size:11px;');
	formdiv.innerHTML = "<form id='fff'><hr> Luck Chart & Averages Plugin Settings<hr>"+
	"Enter desired time interval at which the plugin checks+calculates new data. This could be something between 100-9000.(kakku recommends 1000-ish for now) <br/>Feel free to experiment with this. if you have found your favorite setting tell kakku man about it please <br/> You will need to refresh for it to take effect!</br>"+
	"Set TimeInterval:<input type='text' id='kmlcform_speed' value='1499' /><br/>"+
	"<div><button id='kmlc_formCancel' tabindex='0' type='button' class='gwt-Button'>Cancel</button> <button id='kmlc_formOK' tabindex='0' type='button' class='gwt-Button'>OK</button></div><hr>"+
	"Delete this months locally saved data:<button id='form_resetDATA' tabindex='0' type='button' class='gwt-Button iogc-GameWindow-standUpButton'>reset</button></br><hr>"+
	" </form>";
	dojo.connect(dojo.byId("form_resetDATA"), "onclick", null, kmlc.resetAllData);
	dojo.connect(dojo.byId("kmlc_formCancel"), "onclick", null, kmlc.showHideForm);
	dojo.connect(dojo.byId("kmlc_formOK"), "onclick", null, kmlc.changeSettings);

}
kmlc.showHideForm = function() {
    if(!kmlc.formVis) {
        document.getElementById("kmlc_formDIV").style.display = "block";
		var curSpeed = GM_getValue("kmlc_speed") ? GM_getValue("kmlc_speed") : 1500;
		dojo.byId('kmlcform_speed').value = curSpeed;
        kmlc.formVis = true;
    } else {
        document.getElementById("kmlc_formDIV").style.display = "none";
        kmlc.formVis = false;
    }
}	
kmlc.changeSettings = function(form){ 
	var newSpeed = dojo.byId('kmlcform_speed').value;
	GM_log("new timeInterval= "+newSpeed+" , refresh to let it take effect. ");
	kmlc.showHideForm();
	if (newSpeed!=null && newSpeed!=""){
		GM_setValue("kmlc_speed",newSpeed);
	}
}
////////////////////////////////////////////////////////////////////////// draggable functions: by JoeSimmons from userscripts.org
kmlc.dragStart= function(e) {
	kmlc.dragObj.elNode = e.target;
	if (kmlc.dragObj.elNode.nodeType == 3) kmlc.dragObj.elNode = kmlc.dragObj.elNode.parentNode;
	kmlc.dragObj.cursorStartX = e.clientX + window.scrollX;
	kmlc.dragObj.cursorStartY = e.clientY + window.scrollY;
	kmlc.dragObj.elStartLeft  = parseInt(kmlc.dragObj.elNode.style.left, 10);
	kmlc.dragObj.elStartTop   = parseInt(kmlc.dragObj.elNode.style.top,  10);
	kmlc.dragObj.elNode.style.zIndex = ++kmlc.dragObj.zIndex;
	document.addEventListener("mousemove", kmlc.dragGo,   true);
	document.addEventListener("mouseup",   kmlc.dragStop, true);
	e.preventDefault();
}

kmlc.dragGo = function(e) {
	e.preventDefault();
	var x = e.clientX + window.scrollX,
		y = e.clientY + window.scrollY;
	kmlc.dragObj.elNode.style.left = (kmlc.dragObj.elStartLeft + x - kmlc.dragObj.cursorStartX) + "px";
	kmlc.dragObj.elNode.style.top = (kmlc.dragObj.elStartTop  + y - kmlc.dragObj.cursorStartY) + "px";
}

kmlc.dragStop = function(e) {
	document.removeEventListener("mousemove", kmlc.dragGo,   true);
	document.removeEventListener("mouseup",   kmlc.dragStop, true);
}


dojo.connect(window,"onload", function(){window.setTimeout(kmlc.init, 1800)});