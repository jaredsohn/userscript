scr_meta=<><![CDATA[
// ==UserScript==
// @name           Google Images - Creative Commons
// @namespace      Chris4
// @description    Adds a Creative Commons licenses filter.
// @version        1.0
// @include        http://images.google.*/images?*
// ==/UserScript==
]]></>;

addFilter("as_rights",["Creative Commons","Public¦cc_publicdomain","Attribution¦cc_attribute","Share-Alike¦cc_sharealike"]);

function addFilter(param,values)
{
	var re=new RegExp("(\\?|&)"+param+"=(\\w*)(&|$)","img");		//regexp to extract the parameter from the search string
	var pv=re.exec(location.search)?RegExp.$2.toLowerCase():"";		//extracting parameter value
	var url=location.pathname+location.search.replace(re,function(){return arguments[3]?arguments[1]:"";});	//search string without parameter
	
	//creating dropdown
	var s=document.createElement("select");
	s.name=param;
	s.setAttribute("onchange","_isr_load(this);");
	
	//adding options
	s.options[0]=new Option(values.shift(),url);
	url+="&"+param+"=";
	values.forEach(function(v){var a,n;if(v.match(/\¦/)){a=v.split("¦");n=a[0];v=a[1];}else{n=v;}
	(s.options[s.options.length]=new  Option(n,url+v.toLowerCase())).selected=v.toLowerCase()==pv;});
	
	//appending dropdown
	s.style.margin='0px 0px 0px 8px'; 
	document.forms[1].appendChild(s);
}

// Another Auto Update Script
// by sizzlemctwizzle (Thanks!)

CheckScriptForUpdate = {
            // Config values, change these to match your script
           id: '51505', // Script id on Userscripts.org
           days: 1, // Days to wait between update checks
          name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
           version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
           time: new Date().getTime() | 0,
           call: function(response) {
              GM_xmlhttpRequest({
                method: 'GET',
          	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
          	  headers: {
          	  'User-agent': window.navigator.userAgent,
          	    'Accept': 'application/atom+xml,application/xml,text/xml',
          	    },
          	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
                });
            },
           compare: function(xpr,response) {
              this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
              this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
              if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
                GM_setValue('updated', this.time);
                GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
              } else if ( (this.xversion) && (this.xversion != this.version) ) {
                if(confirm('Do you want to turn off auto updating for this script?')) {
          	GM_setValue('updated', 'off');
          	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
          	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
                } else {
          	GM_setValue('updated', this.time);
                }
              } else {
                if(response) alert('No updates available for '+this.name);
                GM_setValue('updated', this.time);
              }
            },
           check: function() {
          if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
          if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
                this.call();
              } else if (GM_getValue('updated', 0) == 'off') {
                GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
              } else {
                GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
              }
              }
          };
          if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();